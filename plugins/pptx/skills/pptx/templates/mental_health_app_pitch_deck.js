// Recreates Plan_9.pptx — "Boost" seed-round pitch deck (9 slides) using pptxgenjs.
// Run:  node build_plan9.js   →  produces Plan_9.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Original deck is 20" x 11.25" (16:9). Define a custom layout to match exactly.
pres.defineLayout({ name: "BOOST_WIDE", width: 20, height: 11.25 });
pres.layout = "BOOST_WIDE";
pres.author = "Boost";
pres.title = "Boost — Seed Round 2026";
pres.company = "Boost";

// ---------- Color palette ----------
const C = {
  bg:        "FDF5EB", // cream background
  orange:    "E85D2C", // primary brand orange
  orangeDk:  "C84A1F", // deeper orange
  peach:     "F5C77C", // big decorative circle
  peachLt:   "FCE4BD", // pale peach
  peachVLt:  "FCEFD9", // very pale peach for SOM/TAM rings
  ivory:     "FFF8EC", // phone mockup bg light
  inkDark:   "2A1F12", // headline / dark text
  ink:       "3A2E20", // body dark
  body:      "4A3F2E", // body
  muted:     "9C8770", // muted, footer, sources
  divider:   "D8C8B0", // divider lines
  pink:      "F4A3A3", // logo pink dot
  sage:      "A6BFA8", // friendly sage green
  sageDk:    "6F8F71",
  phoneDark: "1F1410", // dark phone background
  cardBg:    "FFFFFF", // privacy card background
  shadow:    "000000",
};

// ---------- Helpers ----------
function addBackground(slide) {
  slide.background = { color: C.bg };
}

function addLogoTopLeft(slide, x = 0.7, y = 0.6) {
  slide.addShape(pres.shapes.OVAL, {
    x: x, y: y, w: 0.32, h: 0.32,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: x + 0.2, y: y, w: 0.32, h: 0.32,
    fill: { color: C.pink }, line: { color: C.pink, width: 0 },
  });
  slide.addText("boost", {
    x: x + 0.65, y: y - 0.04, w: 1.5, h: 0.42,
    fontSize: 20, fontFace: "Calibri", color: C.inkDark, valign: "middle", margin: 0,
  });
}

function addFooter(slide, num) {
  // mini logo bottom-left
  slide.addShape(pres.shapes.OVAL, {
    x: 0.7, y: 10.78, w: 0.18, h: 0.18,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 0.82, y: 10.78, w: 0.18, h: 0.18,
    fill: { color: C.pink }, line: { color: C.pink, width: 0 },
  });
  slide.addText("boost", {
    x: 1.05, y: 10.74, w: 1.5, h: 0.28,
    fontSize: 13, fontFace: "Calibri", color: C.inkDark, valign: "middle", margin: 0,
  });
  // center confidential text
  slide.addText("Boost  ·  Seed Round 2026  ·  Confidential", {
    x: 7, y: 10.74, w: 6, h: 0.28,
    fontSize: 13, fontFace: "Calibri", color: C.muted,
    align: "center", valign: "middle", margin: 0,
  });
  // page number
  const padded = num.toString().padStart(2, "0");
  slide.addText(`${padded} / 09`, {
    x: 17.6, y: 10.74, w: 1.7, h: 0.28,
    fontSize: 13, fontFace: "Calibri", color: C.muted,
    align: "right", valign: "middle", charSpacing: 1.5, margin: 0,
  });
}

function addSectionLabel(slide, text, x = 0.85, y = 1.05) {
  slide.addText(text, {
    x: x, y: y, w: 8, h: 0.45,
    fontSize: 16, fontFace: "Calibri", bold: true,
    color: C.orange, charSpacing: 4, margin: 0, valign: "middle",
  });
}

// ============================================================================
// SLIDE 1 — Title
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  // Big peach decorative circle, bottom-left, extends off slide
  s.addShape(pres.shapes.OVAL, {
    x: -3.5, y: 2.5, w: 14.5, h: 14.5,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  // Top-left logo
  addLogoTopLeft(s, 0.85, 0.85);

  // Section label
  s.addText("A MENTAL WELLNESS COMPANION", {
    x: 0.85, y: 2.85, w: 10, h: 0.5,
    fontSize: 17, fontFace: "Calibri", bold: true,
    color: C.orange, charSpacing: 5, margin: 0, valign: "middle",
  });

  // Big headline (mixed colors / italic) - explicit break after "you"
  s.addText([
    { text: "When the ", options: { color: C.inkDark } },
    { text: "scroll", options: { color: C.orange, italic: true } },
    { text: " gets heavy, we lift you", options: { color: C.inkDark, breakLine: true } },
    { text: "up.", options: { color: C.inkDark } },
  ], {
    x: 0.85, y: 3.6, w: 18.5, h: 3.2,
    fontSize: 84, fontFace: "Calibri", bold: false,
    valign: "top", margin: 0,
  });

  // Italic body subtitle
  s.addText(
    "Boost listens for the moments your feed turns dark — and answers with\nwarmth, from people who love you.",
    {
      x: 0.85, y: 7.0, w: 11, h: 1.2,
      fontSize: 22, fontFace: "Calibri", italic: true,
      color: C.body, valign: "top", margin: 0,
    }
  );

  // Bottom-right ask block
  s.addText("SEED ROUND  ·  APRIL 2026", {
    x: 13.5, y: 9.0, w: 6, h: 0.4,
    fontSize: 16, fontFace: "Calibri", bold: true, color: C.muted,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
  s.addText("Raising $3.5M  ·  Pre-seed completed Q4 2025", {
    x: 12, y: 9.5, w: 7.5, h: 0.4,
    fontSize: 17, fontFace: "Calibri", color: C.body,
    align: "right", valign: "middle", margin: 0,
  });

  addFooter(s, 1);
}

// ============================================================================
// SLIDE 2 — The Problem
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  addSectionLabel(s, "THE PROBLEM", 0.85, 1.05);

  // Big headline w/ italic orange ending - 2 lines via breakLine
  s.addText([
    { text: "The feed knows when you're", options: { color: C.inkDark, breakLine: true } },
    { text: "spiraling. ", options: { color: C.inkDark } },
    { text: "It just keeps feeding.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 1.7, w: 18.5, h: 2.8,
    fontSize: 72, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Three stat columns. Col widths and positions.
  const colW = 5.6;
  const cols = [
    {
      x: 0.85,
      stat: "4.7h",
      desc: "Average daily time spent on social media,\nages 16–24",
      src: "TBD — DataReportal 2025",
    },
    {
      x: 7.2,
      stat: "64%",
      desc: "Of Gen Z report a social-media session left\nthem feeling worse",
      src: "TBD — APA Stress in America",
    },
    {
      x: 13.55,
      stat: "3×",
      desc: "Higher rate of anxiety symptoms in heavy\nsocial users vs. light users",
      src: "TBD — JAMA Pediatrics meta-analysis",
    },
  ];

  for (const col of cols) {
    // top divider line
    s.addShape(pres.shapes.LINE, {
      x: col.x, y: 6.5, w: colW, h: 0,
      line: { color: C.divider, width: 0.75 },
    });
    // big orange stat
    s.addText(col.stat, {
      x: col.x, y: 6.7, w: colW, h: 1.5,
      fontSize: 92, fontFace: "Calibri", color: C.orange,
      valign: "top", margin: 0,
    });
    // description
    s.addText(col.desc, {
      x: col.x, y: 8.4, w: colW, h: 0.9,
      fontSize: 18, fontFace: "Calibri", color: C.ink,
      valign: "top", margin: 0,
    });
    // TBD source
    s.addText(col.src, {
      x: col.x, y: 9.4, w: colW, h: 0.4,
      fontSize: 17, fontFace: "Calibri", color: C.muted,
      valign: "top", margin: 0,
    });
  }

  addFooter(s, 2);
}

// ============================================================================
// SLIDE 3 — The Insight
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  // Right peach decorative circle (top-right)
  s.addShape(pres.shapes.OVAL, {
    x: 11.5, y: -2.5, w: 13.5, h: 13.5,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  addSectionLabel(s, "THE INSIGHT", 0.85, 1.05);

  // Two-part headline (block 1)
  s.addText([
    { text: "The antidote to a cruel", options: { color: C.inkDark, breakLine: true } },
    { text: "feed isn't ", options: { color: C.inkDark } },
    { text: "another app.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 2.5, w: 11, h: 2.2,
    fontSize: 60, fontFace: "Calibri", valign: "top", margin: 0,
  });

  s.addText([
    { text: "It's the people who", options: { color: C.inkDark, breakLine: true } },
    { text: "already love you, ", options: { color: C.inkDark } },
    { text: "arriving", options: { color: C.orange, italic: true, breakLine: true } },
    { text: "on time.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 5.4, w: 11, h: 3.5,
    fontSize: 60, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Right side timeline. Bullet circles at x=11.4 with vertical line connecting.
  // Vertical connecting line behind bullets (between first and last bullet)
  s.addShape(pres.shapes.LINE, {
    x: 11.5, y: 2.4, w: 0, h: 6.7,
    line: { color: C.divider, width: 1.25 },
  });

  // Highlight segment (orange) for the "Boost detects" item (index 3)
  // Items at y = 2.3 + i*1.15. Item 3 bullet at y = 5.75, center y ≈ 5.9
  // Span from item 2 bottom (~5.0) through item 4 top (~6.85)
  s.addShape(pres.shapes.LINE, {
    x: 11.5, y: 5.0, w: 0, h: 1.8,
    line: { color: C.orange, width: 1.5 },
  });

  const tlItems = [
    { time: "2:14 PM", text: "Doomscrolling about climate news",                 dot: C.muted, color: C.body, italic: false },
    { time: "2:18 PM", text: "Reads three angry comments on a post",             dot: C.muted, color: C.body, italic: false },
    { time: "2:22 PM", text: "Heart rate elevates  ·  screen time +47%",         dot: C.muted, color: C.body, italic: false },
    { time: "2:23 PM", text: "Boost detects sustained negativity",                dot: C.orange, color: C.orange, italic: true,  highlight: true },
    { time: "2:24 PM", text: "\u201CHey — your sister Maya wants you to know\u2026\u201D", dot: C.sage, color: C.body, italic: false },
    { time: "2:26 PM", text: "Maya gets a quiet ping: \u201CSam could use a boost\u201D", dot: C.sage, color: C.body, italic: false },
  ];

  let ty = 2.3;
  const stepY = 1.15;
  for (const it of tlItems) {
    // bullet circle
    s.addShape(pres.shapes.OVAL, {
      x: 11.36, y: ty + 0.05, w: 0.28, h: 0.28,
      fill: { color: it.dot }, line: { color: it.dot, width: 0 },
    });
    // time label
    s.addText(it.time, {
      x: 11.95, y: ty - 0.05, w: 2, h: 0.4,
      fontSize: 18, fontFace: "Calibri", bold: true,
      color: it.highlight ? C.orange : C.muted, valign: "middle", margin: 0,
    });
    // detail text
    s.addText(it.text, {
      x: 11.95, y: ty + 0.3, w: 7.5, h: 0.5,
      fontSize: 18, fontFace: "Calibri", italic: it.italic,
      color: it.color, valign: "top", margin: 0,
    });
    ty += stepY;
  }

  addFooter(s, 3);
}

// ============================================================================
// SLIDE 4 — The Solution
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  // Right side big peach circle behind phone
  s.addShape(pres.shapes.OVAL, {
    x: 12.5, y: 0.4, w: 8.0, h: 8.0,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  addSectionLabel(s, "THE SOLUTION", 0.85, 1.05);

  // Headline
  s.addText([
    { text: "Meet ", options: { color: C.inkDark } },
    { text: "Boost.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 1.7, w: 12, h: 1.6,
    fontSize: 80, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Italic subtitle
  s.addText("A quiet companion that turns the loneliest part of the internet into the\nmoment your people show up.", {
    x: 0.85, y: 3.4, w: 12, h: 1.2,
    fontSize: 22, fontFace: "Calibri", italic: true,
    color: C.body, valign: "top", margin: 0,
  });

  // Three numbered items
  const items = [
    { num: "01", h: "Listens, never lectures",
      d: "On-device sentiment AI watches what you read — not what you write — and\nnotices when the spiral starts." },
    { num: "02", h: "A reply, not a reminder",
      d: "When the feed turns heavy, Boost surfaces a personal message about the\nexact thing that's weighing on you." },
    { num: "03", h: "Your circle, on call",
      d: "A trusted few get a quiet \u201CSam could use a boost\u201D — no diagnosis, no drama.\nJust an open door." },
  ];

  let iy = 5.0;
  for (const it of items) {
    // number (italic orange)
    s.addText(it.num, {
      x: 0.85, y: iy, w: 1.0, h: 0.55,
      fontSize: 22, fontFace: "Calibri", italic: true, color: C.orange,
      valign: "top", margin: 0,
    });
    // header
    s.addText(it.h, {
      x: 1.85, y: iy - 0.05, w: 9, h: 0.6,
      fontSize: 26, fontFace: "Calibri", color: C.inkDark,
      valign: "top", margin: 0,
    });
    // description
    s.addText(it.d, {
      x: 1.85, y: iy + 0.55, w: 10.5, h: 1.0,
      fontSize: 17, fontFace: "Calibri", color: C.body,
      valign: "top", margin: 0,
    });
    iy += 1.6;
  }

  // ---- Phone mockup on right ----
  const px = 13.5, py = 1.5, pw = 4.25, ph = 7.7;

  // phone body (rounded)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.ivory }, line: { color: C.peachLt, width: 1 },
    rectRadius: 0.35,
  });

  // notification card 1 (BOOST note from Maya)
  const n1y = py + 0.45;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + 0.25, y: n1y, w: pw - 0.5, h: 1.85,
    fill: { color: C.cardBg }, line: { color: "F0E0C8", width: 0.5 },
    rectRadius: 0.1,
  });
  // BOOST app icon
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + 0.42, y: n1y + 0.18, w: 0.32, h: 0.32,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    rectRadius: 0.06,
  });
  s.addText("BOOST", {
    x: px + 0.82, y: n1y + 0.12, w: 1.4, h: 0.35,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.inkDark,
    charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addText("now", {
    x: px + pw - 0.95, y: n1y + 0.12, w: 0.6, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.muted,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText("A note from your sister Maya", {
    x: px + 0.42, y: n1y + 0.55, w: pw - 0.85, h: 0.35,
    fontSize: 14, fontFace: "Calibri", bold: true, color: C.inkDark,
    valign: "top", margin: 0,
  });
  s.addText(
    "\u201CHey. The world's a lot right now — but the way you keep showing up for everyone is the most you thing about you. I'm proud of you.  \u2600\uFE0F\u201D",
    {
      x: px + 0.42, y: n1y + 0.92, w: pw - 0.85, h: 0.85,
      fontSize: 10.5, fontFace: "Calibri", color: C.body,
      valign: "top", margin: 0,
    }
  );

  // notification card 2 (Your circle)
  const n2y = n1y + 2.05;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + 0.25, y: n2y, w: pw - 0.5, h: 1.1,
    fill: { color: C.cardBg }, line: { color: "F0E0C8", width: 0.5 },
    rectRadius: 0.1,
  });
  s.addText("Your circle", {
    x: px + 0.42, y: n2y + 0.15, w: 2, h: 0.35,
    fontSize: 12, fontFace: "Calibri", bold: true, color: C.inkDark,
    valign: "middle", margin: 0,
  });
  s.addText("2m ago", {
    x: px + pw - 1.05, y: n2y + 0.15, w: 0.7, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: C.muted,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText(
    "Maya, Dad, and 2 others were quietly notified you could use a boost today.",
    {
      x: px + 0.42, y: n2y + 0.5, w: pw - 0.85, h: 0.55,
      fontSize: 10.5, fontFace: "Calibri", color: C.body,
      valign: "top", margin: 0,
    }
  );

  // mood ring (steady) at bottom of phone
  const moodCx = px + pw / 2;
  const moodCy = py + ph - 1.75;
  const moodR = 0.85;
  s.addShape(pres.shapes.OVAL, {
    x: moodCx - moodR, y: moodCy - moodR, w: moodR * 2, h: moodR * 2,
    fill: { color: C.ivory }, line: { color: C.orangeDk, width: 5 },
  });
  s.addText("steady", {
    x: moodCx - 0.85, y: moodCy - 0.35, w: 1.7, h: 0.45,
    fontSize: 22, fontFace: "Calibri", italic: true, color: C.inkDark,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("TODAY'S MOOD", {
    x: moodCx - 0.9, y: moodCy + 0.15, w: 1.8, h: 0.3,
    fontSize: 9, fontFace: "Calibri", bold: true, color: C.muted,
    charSpacing: 2.5, align: "center", valign: "middle", margin: 0,
  });

  // bottom indicator (home bar)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + pw / 2 - 0.6, y: py + ph - 0.25, w: 1.2, h: 0.07,
    fill: { color: C.muted }, line: { color: C.muted, width: 0 },
    rectRadius: 0.03,
  });

  addFooter(s, 4);
}

// ============================================================================
// SLIDE 5 — How it works
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  addSectionLabel(s, "HOW IT WORKS", 0.85, 1.05);

  s.addText([
    { text: "Three steps. ", options: { color: C.inkDark } },
    { text: "One human moment.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 1.7, w: 18.5, h: 1.4,
    fontSize: 72, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Three columns, each with phone mockup, number, title, description
  const phw = 3.65, phh = 5.1;
  const cols = [
    { x: 2.0,  num: "01", title: "Listen",
      desc: "Boost analyzes the sentiment of what you read — on\ndevice, never uploaded.",
      mode: "feed" },
    { x: 8.2,  num: "02", title: "Compose",
      desc: "When the spiral persists, our model writes a personalized\nnote about the exact theme bringing you down.",
      mode: "compose" },
    { x: 14.4, num: "03", title: "Connect",
      desc: "A few people you pre-approved get a gentle, low-stakes\nping. They reach out, in their own words.",
      mode: "ping" },
  ];

  for (const col of cols) {
    const px = col.x, py = 3.3;
    const dark = col.mode !== "ping";

    // phone body
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: py, w: phw, h: phh,
      fill: { color: dark ? C.phoneDark : C.ivory },
      line: { color: dark ? C.phoneDark : C.peachLt, width: 1 },
      rectRadius: 0.3,
    });

    if (col.mode === "feed") {
      // 3 dim feed-post bars near top
      const posts = [
        { handle: "@worldnews",  text: "\u201CWorst quarter on record, experts warn\u2026\u201D" },
        { handle: "@hothotter",  text: "Climate scientists \u201Cspeechless\u201D at new data" },
        { handle: "@ragepost",   text: "Why no one cares and it's only getting worse" },
      ];
      let yy = py + 0.7;
      for (const p of posts) {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x: px + 0.3, y: yy, w: phw - 0.6, h: 0.65,
          fill: { color: "2A1E18" }, line: { color: "2A1E18", width: 0 },
          rectRadius: 0.05,
        });
        s.addText(p.handle, {
          x: px + 0.42, y: yy + 0.04, w: phw - 0.8, h: 0.25,
          fontSize: 9, fontFace: "Calibri", color: "8A7B6B",
          valign: "top", margin: 0,
        });
        s.addText(p.text, {
          x: px + 0.42, y: yy + 0.27, w: phw - 0.8, h: 0.32,
          fontSize: 9, fontFace: "Calibri", color: "C9B8A4",
          valign: "top", margin: 0,
        });
        yy += 0.78;
      }
      // BOOST · SENTIMENT alert at bottom
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3, y: py + phh - 1.0, w: phw - 0.6, h: 0.65,
        fill: { color: C.orange }, line: { color: C.orange, width: 0 },
        rectRadius: 0.05,
      });
      s.addText("BOOST · SENTIMENT", {
        x: px + 0.42, y: py + phh - 0.93, w: phw - 0.8, h: 0.25,
        fontSize: 8, fontFace: "Calibri", bold: true, color: "FFFFFF",
        charSpacing: 2, valign: "top", margin: 0,
      });
      s.addText("Heavy theme detected: climate dread", {
        x: px + 0.42, y: py + phh - 0.65, w: phw - 0.8, h: 0.3,
        fontSize: 9, fontFace: "Calibri", color: "FFFFFF",
        valign: "top", margin: 0,
      });
    } else if (col.mode === "compose") {
      // COMPOSING label
      s.addText("COMPOSING", {
        x: px + 0.3, y: py + 0.55, w: phw - 0.6, h: 0.3,
        fontSize: 10, fontFace: "Calibri", bold: true, color: C.orange,
        charSpacing: 2, valign: "top", margin: 0,
      });
      // Note about climate dread
      s.addText([
        { text: "A note about ", options: { color: "F2EAD8", italic: true } },
        { text: "climate\ndread", options: { color: C.orange, italic: true } },
        { text: ", written for you", options: { color: "F2EAD8", italic: true } },
      ], {
        x: px + 0.3, y: py + 0.95, w: phw - 0.6, h: 1.4,
        fontSize: 17, fontFace: "Calibri", italic: true,
        valign: "top", margin: 0,
      });
      // four faux input lines
      const lines = ["Trusted contacts match", "Tone calibrated · gentle", "Topic relevance", "Privacy on-device"];
      let ly = py + 2.7;
      for (const tx of lines) {
        s.addText(tx, {
          x: px + 0.3, y: ly, w: phw - 0.6, h: 0.3,
          fontSize: 9, fontFace: "Calibri", color: C.orange,
          valign: "top", margin: 0,
        });
        s.addShape(pres.shapes.LINE, {
          x: px + 0.3, y: ly + 0.32, w: phw - 0.6, h: 0,
          line: { color: C.orange, width: 0.5 },
        });
        ly += 0.45;
      }
    } else {
      // ping mode - light phone
      s.addText("MAYA'S PHONE", {
        x: px + 0.3, y: py + 0.55, w: phw - 0.6, h: 0.3,
        fontSize: 10, fontFace: "Calibri", bold: true, color: C.muted,
        charSpacing: 2, valign: "top", margin: 0,
      });
      s.addText("A quiet ping", {
        x: px + 0.3, y: py + 0.9, w: phw - 0.6, h: 0.4,
        fontSize: 16, fontFace: "Calibri", italic: true, color: C.inkDark,
        valign: "top", margin: 0,
      });
      // notification card
      const ncy = py + 1.65;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3, y: ncy, w: phw - 0.6, h: 1.85,
        fill: { color: C.cardBg }, line: { color: "F0E0C8", width: 0.5 },
        rectRadius: 0.1,
      });
      // BOOST badge
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.45, y: ncy + 0.15, w: 0.25, h: 0.25,
        fill: { color: C.orange }, line: { color: C.orange, width: 0 },
        rectRadius: 0.04,
      });
      s.addText("BOOST", {
        x: px + 0.78, y: ncy + 0.13, w: 1.5, h: 0.3,
        fontSize: 9, fontFace: "Calibri", bold: true, color: C.inkDark,
        charSpacing: 2, valign: "middle", margin: 0,
      });
      s.addText("Sam could use a boost.", {
        x: px + 0.45, y: ncy + 0.5, w: phw - 0.9, h: 0.32,
        fontSize: 12, fontFace: "Calibri", bold: true, color: C.inkDark,
        valign: "top", margin: 0,
      });
      s.addText(
        "No emergency. They're reading hard news today. A short note from you might land just right.",
        {
          x: px + 0.45, y: ncy + 0.85, w: phw - 0.9, h: 0.95,
          fontSize: 9, fontFace: "Calibri", color: C.body,
          valign: "top", margin: 0,
        }
      );
      // CTA buttons
      const btny = ncy + 1.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3, y: btny, w: phw * 0.55, h: 0.35,
        fill: { color: C.orange }, line: { color: C.orange, width: 0 },
        rectRadius: 0.06,
      });
      s.addText("Send a note", {
        x: px + 0.3, y: btny, w: phw * 0.55, h: 0.35,
        fontSize: 10, fontFace: "Calibri", bold: true, color: "FFFFFF",
        align: "center", valign: "middle", margin: 0,
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: px + 0.3 + phw * 0.58, y: btny, w: phw * 0.32, h: 0.35,
        fill: { color: C.peachLt }, line: { color: C.peachLt, width: 0 },
        rectRadius: 0.06,
      });
      s.addText("Later", {
        x: px + 0.3 + phw * 0.58, y: btny, w: phw * 0.32, h: 0.35,
        fontSize: 10, fontFace: "Calibri", color: C.inkDark,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // home bar at bottom
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px + phw / 2 - 0.45, y: py + phh - 0.18, w: 0.9, h: 0.06,
      fill: { color: dark ? "5A4A3E" : C.muted },
      line: { color: dark ? "5A4A3E" : C.muted, width: 0 },
      rectRadius: 0.03,
    });

    // status bar at top of phone
    s.addText("9:41", {
      x: px + 0.3, y: py + 0.15, w: 1, h: 0.3,
      fontSize: 11, fontFace: "Calibri", bold: true,
      color: dark ? "F2EAD8" : C.inkDark, valign: "middle", margin: 0,
    });

    // Below the phone: number, title, description
    s.addText(col.num, {
      x: col.x, y: py + phh + 0.15, w: phw, h: 0.4,
      fontSize: 18, fontFace: "Calibri", italic: true, color: C.orange,
      align: "center", valign: "top", margin: 0,
    });
    s.addText(col.title, {
      x: col.x, y: py + phh + 0.55, w: phw, h: 0.5,
      fontSize: 26, fontFace: "Calibri", color: C.inkDark,
      align: "center", valign: "top", margin: 0,
    });
    s.addText(col.desc, {
      x: col.x - 0.4, y: py + phh + 1.15, w: phw + 0.8, h: 0.95,
      fontSize: 12, fontFace: "Calibri", color: C.body,
      align: "center", valign: "top", margin: 0,
    });
  }

  addFooter(s, 5);
}

// ============================================================================
// SLIDE 6 — The Technology
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  // Right peach circle behind diagram
  s.addShape(pres.shapes.OVAL, {
    x: 11.0, y: 3.2, w: 9.5, h: 9.5,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  addSectionLabel(s, "THE TECHNOLOGY", 0.85, 1.05);

  // Headline
  s.addText([
    { text: "Sentiment that's ", options: { color: C.inkDark } },
    { text: "kind", options: { color: C.orange, italic: true } },
    { text: ", and never leaves", options: { color: C.inkDark, breakLine: true } },
    { text: "your phone.", options: { color: C.inkDark } },
  ], {
    x: 0.85, y: 1.7, w: 18.5, h: 2.5,
    fontSize: 60, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Left side: 4 sections with horizontal dividers
  const sections = [
    { h: "On-device sentiment model",
      d: "A 60M-parameter transformer fine-tuned on 2.4M annotated social posts. Runs in < 80ms on Apple Neural Engine. Nothing leaves the\nphone." },
    { h: "Theme extraction, not surveillance",
      d: "We extract abstract themes (\u201Cclimate dread,\u201D \u201Crejection\u201D) — not posts, not authors, not screenshots. The cloud never sees what\nyou read." },
    { h: "Generative warmth, hand-tuned",
      d: "A specialized 3B-parameter LLM trained on therapist-reviewed tonal data writes notes that feel human — never clinical, never\npreachy." },
    { h: "Circle-permissioned, by design",
      d: "Friends and family must explicitly opt in. They see \u201Cneeds a boost\u201D — never your data, content, or mood metrics." },
  ];

  let sy = 4.4;
  const sx = 0.85, sw = 9.2;
  // top divider above first
  s.addShape(pres.shapes.LINE, {
    x: sx, y: sy, w: sw, h: 0,
    line: { color: C.divider, width: 0.75 },
  });
  for (const sec of sections) {
    s.addText(sec.h, {
      x: sx, y: sy + 0.15, w: sw, h: 0.5,
      fontSize: 22, fontFace: "Calibri", color: C.inkDark,
      valign: "top", margin: 0,
    });
    s.addText(sec.d, {
      x: sx, y: sy + 0.7, w: sw, h: 0.85,
      fontSize: 13, fontFace: "Calibri", color: C.body,
      valign: "top", margin: 0,
    });
    sy += 1.55;
    s.addShape(pres.shapes.LINE, {
      x: sx, y: sy, w: sw, h: 0,
      line: { color: C.divider, width: 0.75 },
    });
  }

  // Right diagram: ON-DEVICE box with 5 internal cards, then CLOUD box with 2 cards
  // ON-DEVICE container
  const odx = 11.5, ody = 4.0, odw = 5.4, odh = 6.2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: odx, y: ody, w: odw, h: odh,
    fill: { type: "none" }, line: { color: C.orange, width: 1.5 },
    rectRadius: 0.12,
  });
  s.addText("ON-DEVICE", {
    x: odx + 0.25, y: ody + 0.2, w: 2, h: 0.35,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.orange,
    charSpacing: 2.5, valign: "middle", margin: 0,
  });

  const cards = [
    { t: "Social feed (read-only signal)", st: "iOS Screen Time API + accessibility", hi: false },
    { t: "Sentiment transformer (60M)",     st: "themes · valence · cadence",          hi: false },
    { t: "Theme abstraction",                st: "\u201Cclimate dread\u201D — not posts",          hi: true  },
    { t: "Local trigger logic",              st: "only when threshold + duration",      hi: false },
    { t: "Notification to user",             st: "",                                    hi: false },
  ];
  const cardW = odw - 0.6, cardH = 0.8;
  let cy = ody + 0.7;
  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: odx + 0.3, y: cy, w: cardW, h: cardH,
      fill: { color: c.hi ? C.orange : C.cardBg },
      line: { color: c.hi ? C.orange : "EAD9BD", width: 0.75 },
      rectRadius: 0.08,
    });
    s.addText(c.t, {
      x: odx + 0.45, y: cy + 0.08, w: cardW - 0.3, h: 0.32,
      fontSize: 12, fontFace: "Calibri", bold: true,
      color: c.hi ? "FFFFFF" : C.inkDark, valign: "top", margin: 0,
    });
    if (c.st) {
      s.addText(c.st, {
        x: odx + 0.45, y: cy + 0.42, w: cardW - 0.3, h: 0.3,
        fontSize: 10, fontFace: "Calibri",
        color: c.hi ? "FFE4D5" : C.muted, valign: "top", margin: 0,
      });
    }
    // arrow / connector to next
    if (i < cards.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: odx + odw / 2, y: cy + cardH, w: 0, h: 0.3,
        line: { color: C.body, width: 0.75, endArrowType: "triangle" },
      });
    }
    cy += cardH + 0.3;
  }

  // CLOUD container (right of ON-DEVICE)
  const cdx = 17.2, cdy = 4.2, cdw = 2.5, cdh = 4.0;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cdx, y: cdy, w: cdw, h: cdh,
    fill: { type: "none" }, line: { color: C.muted, width: 1, dashType: "dash" },
    rectRadius: 0.12,
  });
  s.addText("CLOUD", {
    x: cdx + 0.2, y: cdy + 0.2, w: 1.5, h: 0.3,
    fontSize: 10, fontFace: "Calibri", bold: true, color: C.muted,
    charSpacing: 2, valign: "middle", margin: 0,
  });

  // CLOUD card 1
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cdx + 0.2, y: cdy + 0.65, w: cdw - 0.4, h: 1.4,
    fill: { color: C.cardBg }, line: { color: "EAD9BD", width: 0.6 },
    rectRadius: 0.08,
  });
  s.addText("Boost LLM (3B)", {
    x: cdx + 0.32, y: cdy + 0.75, w: cdw - 0.5, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.inkDark,
    valign: "top", margin: 0,
  });
  s.addText("receives:\n· theme (anonymous)", {
    x: cdx + 0.32, y: cdy + 1.1, w: cdw - 0.5, h: 0.85,
    fontSize: 9, fontFace: "Calibri", color: C.muted,
    valign: "top", margin: 0,
  });

  // CLOUD card 2
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cdx + 0.2, y: cdy + 2.25, w: cdw - 0.4, h: 1.2,
    fill: { color: C.cardBg }, line: { color: "EAD9BD", width: 0.6 },
    rectRadius: 0.08,
  });
  s.addText("Circle ping service", {
    x: cdx + 0.32, y: cdy + 2.4, w: cdw - 0.5, h: 0.3,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.inkDark,
    valign: "top", margin: 0,
  });
  s.addText("\u201Cneeds a boost\u201D only", {
    x: cdx + 0.32, y: cdy + 2.7, w: cdw - 0.5, h: 0.4,
    fontSize: 9, fontFace: "Calibri", color: C.muted,
    valign: "top", margin: 0,
  });

  // dashed arrow between ON-DEVICE and CLOUD
  s.addShape(pres.shapes.LINE, {
    x: odx + odw, y: cy - 1.85, w: cdx - (odx + odw), h: 0,
    line: { color: C.body, width: 0.75, dashType: "dash", endArrowType: "triangle" },
  });

  addFooter(s, 6);
}

// ============================================================================
// SLIDE 7 — Privacy & Care
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  addSectionLabel(s, "PRIVACY & CARE", 0.85, 1.05);

  // Headline
  s.addText([
    { text: "The wrong version of Boost would be ", options: { color: C.inkDark } },
    { text: "dystopian.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 1.65, w: 19, h: 1.4,
    fontSize: 56, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Subtitle
  s.addText("We've designed against that, line by line. Six commitments that make this app worthy of a hard moment.", {
    x: 0.85, y: 3.0, w: 18, h: 0.6,
    fontSize: 22, fontFace: "Calibri", italic: true, color: C.body,
    valign: "top", margin: 0,
  });

  // 3x2 grid of privacy commitments
  const cards = [
    { n: "1", h: "You are not the product",     d: "We're a paid app. No ads. No data sales. Ever — written into our investor docs." },
    { n: "2", h: "On-device by default",        d: "Sentiment analysis runs locally. We never see what you scroll, type, or react to." },
    { n: "3", h: "Consent is the feature",      d: "Friends opt in to your circle, see only \u201Cneeds a boost,\u201D and can pause or leave anytime." },
    { n: "4", h: "No diagnoses, no escalation", d: "Boost is not a clinical tool. We surface warmth — and route to crisis services when warranted." },
    { n: "5", h: "You can always look away",    d: "One tap turns Boost off for an hour, a day, or forever. No streaks. No guilt. No dark patterns." },
    { n: "6", h: "Audited & open",              d: "Our model card, threat model, and on-device boundary are public. Independently audited annually." },
  ];

  const gridX0 = 0.85, gridY0 = 4.3;
  const cw = 6.0, ch = 2.8;
  const gapX = 0.25, gapY = 0.3;

  for (let i = 0; i < cards.length; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = gridX0 + col * (cw + gapX);
    const cyy = gridY0 + row * (ch + gapY);
    const c = cards[i];

    // Card with subtle shadow
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cyy, w: cw, h: ch,
      fill: { color: C.cardBg }, line: { color: "F0E0C8", width: 0.5 },
      rectRadius: 0.12,
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.06 },
    });
    // Number badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.3, y: cyy + 0.3, w: 0.45, h: 0.45,
      fill: { color: C.peachLt }, line: { color: C.peachLt, width: 0 },
      rectRadius: 0.06,
    });
    s.addText(c.n, {
      x: cx + 0.3, y: cyy + 0.3, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: "Calibri", italic: true, color: C.muted,
      align: "center", valign: "middle", margin: 0,
    });
    // Header
    s.addText(c.h, {
      x: cx + 0.3, y: cyy + 1.0, w: cw - 0.6, h: 0.5,
      fontSize: 22, fontFace: "Calibri", color: C.inkDark,
      valign: "top", margin: 0,
    });
    // Description
    s.addText(c.d, {
      x: cx + 0.3, y: cyy + 1.65, w: cw - 0.6, h: 1.0,
      fontSize: 14, fontFace: "Calibri", color: C.body,
      valign: "top", margin: 0,
    });
  }

  addFooter(s, 7);
}

// ============================================================================
// SLIDE 8 — The Market
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  addSectionLabel(s, "THE MARKET", 0.85, 1.05);

  s.addText([
    { text: "A category nobody wins by being ", options: { color: C.inkDark } },
    { text: "cold.", options: { color: C.orange, italic: true } },
  ], {
    x: 0.85, y: 1.65, w: 19, h: 1.4,
    fontSize: 64, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // ---- Left: nested circles TAM/SAM/SOM ----
  // Center the circles around (5.0, 7.0). SAM/SOM offset down so top crescents stay exposed.
  const ccx = 5.0, ccy = 7.0;

  // TAM (largest, palest) — radius 3
  const tamR = 3.0;
  s.addShape(pres.shapes.OVAL, {
    x: ccx - tamR, y: ccy - tamR, w: tamR * 2, h: tamR * 2,
    fill: { color: C.peachVLt }, line: { color: C.peachVLt, width: 0 },
  });

  // SAM (medium) — radius 1.85, offset down 0.6 → top edge at ccy-1.85+0.6 = 5.75
  const samR = 1.85;
  const samOffY = 0.6;
  s.addShape(pres.shapes.OVAL, {
    x: ccx - samR, y: ccy - samR + samOffY, w: samR * 2, h: samR * 2,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  // SOM (smallest, deep orange) — radius 1.05, offset 1.0 → top edge at ccy-1.05+1.0 = 6.95
  const somR = 1.05;
  const somOffY = 1.0;
  s.addShape(pres.shapes.OVAL, {
    x: ccx - somR, y: ccy - somR + somOffY, w: somR * 2, h: somR * 2,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  // TAM labels (in the visible top crescent, y from 4.0 to 5.75)
  s.addText("TAM", {
    x: ccx - 1, y: 4.15, w: 2, h: 0.3,
    fontSize: 13, fontFace: "Calibri", bold: true, color: C.inkDark,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  s.addText("$58B", {
    x: ccx - 1.4, y: 4.45, w: 2.8, h: 0.6,
    fontSize: 32, fontFace: "Calibri", color: C.inkDark,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("Global digital wellness, 2026  ·  TBD CB Insights", {
    x: ccx - 2.6, y: 5.1, w: 5.2, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.muted,
    align: "center", valign: "middle", margin: 0,
  });

  // SAM labels (in the visible band y=5.75 to 6.95, height ~1.2)
  s.addText("SAM", {
    x: ccx - 1, y: 5.85, w: 2, h: 0.28,
    fontSize: 11, fontFace: "Calibri", bold: true, color: C.inkDark,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });
  s.addText("$9.2B", {
    x: ccx - 1.4, y: 6.13, w: 2.8, h: 0.5,
    fontSize: 26, fontFace: "Calibri", color: C.inkDark,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("EN-language sentiment-aware wellness apps", {
    x: ccx - 2.2, y: 6.65, w: 4.4, h: 0.28,
    fontSize: 9, fontFace: "Calibri", color: C.body,
    align: "center", valign: "middle", margin: 0,
  });

  // SOM labels (centered in the SOM circle, center at ccy + somOffY = 8.0)
  s.addText("SOM (Y3)", {
    x: ccx - 1, y: 7.15, w: 2, h: 0.28,
    fontSize: 10, fontFace: "Calibri", bold: true, color: "FFFFFF",
    charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });
  s.addText("$420M", {
    x: ccx - 1.5, y: 7.45, w: 3, h: 0.55,
    fontSize: 26, fontFace: "Calibri", color: "FFFFFF",
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("2.1M paying users  ·  $16.99/mo", {
    x: ccx - 1.5, y: 8.05, w: 3, h: 0.28,
    fontSize: 9, fontFace: "Calibri", color: "FFE6D6",
    align: "center", valign: "middle", margin: 0,
  });

  // ---- Right: 3 stat callouts with thin dividers ----
  const rx = 11.5, rw = 7.5;
  const rStats = [
    { stat: "$5.6B",
      desc: "Global mental wellness app spend in 2025, up 26% YoY.",
      src: "TBD — Sensor Tower 2025 Wellness Report" },
    { stat: "71%",
      desc: "Of US adults 18–34 say they'd pay for a tool that improved their relationship with social\nmedia.",
      src: "TBD — Pew Research, Q1 2026 panel" },
    { stat: "0",
      desc: "Direct competitors combining real-time sentiment with a personal-circle response loop. Calm,\nHeadspace, BeReal — none address the moment of harm.",
      src: "" },
  ];

  let ry = 3.85;
  for (const r of rStats) {
    s.addShape(pres.shapes.LINE, {
      x: rx, y: ry, w: rw, h: 0,
      line: { color: C.divider, width: 0.6 },
    });
    s.addText(r.stat, {
      x: rx, y: ry + 0.15, w: rw, h: 1.0,
      fontSize: 64, fontFace: "Calibri", color: C.orange,
      valign: "top", margin: 0,
    });
    s.addText([
      { text: r.desc, options: { color: C.ink } },
      ...(r.src ? [{ text: " " + r.src, options: { color: C.muted, fontSize: 12 } }] : []),
    ], {
      x: rx, y: ry + 1.4, w: rw, h: 0.9,
      fontSize: 16, fontFace: "Calibri", valign: "top", margin: 0,
    });
    ry += 2.4;
  }

  addFooter(s, 8);
}

// ============================================================================
// SLIDE 9 — The Vision / Ask
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);

  // Two large peach decorative circles
  s.addShape(pres.shapes.OVAL, {
    x: 4.5, y: -3.5, w: 11.5, h: 11.5,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 13.0, y: 4.5, w: 9.0, h: 9.0,
    fill: { color: C.peach }, line: { color: C.peach, width: 0 },
  });

  addSectionLabel(s, "THE VISION", 0.85, 1.05);

  // Big headline — break after "warm" so "warm layer" stays italic across two lines
  s.addText([
    { text: "We're building the ", options: { color: C.inkDark } },
    { text: "warm", options: { color: C.orange, italic: true, breakLine: true } },
    { text: "layer", options: { color: C.orange, italic: true } },
    { text: " of the internet.", options: { color: C.inkDark } },
  ], {
    x: 0.85, y: 2.4, w: 18, h: 3.5,
    fontSize: 80, fontFace: "Calibri", valign: "top", margin: 0,
  });

  // Italic body
  s.addText("Phase 1: catch the spiral. Phase 2: a graph of who shows up for whom. Phase 3: a quieter, kinder\ndefault for being online.", {
    x: 0.85, y: 6.6, w: 16, h: 1.0,
    fontSize: 22, fontFace: "Calibri", italic: true, color: C.body,
    valign: "top", margin: 0,
  });

  // Divider above bottom row
  s.addShape(pres.shapes.LINE, {
    x: 0.85, y: 8.2, w: 18.3, h: 0,
    line: { color: C.divider, width: 0.75 },
  });

  // Bottom row: 4 columns
  const bottom = [
    {
      label: "THE ASK",
      bigStyle: "stat",
      big: "$3.5M seed",
      sub: "18-month runway  ·  iOS launch + Android beta",
    },
    {
      label: "USE OF FUNDS",
      bigStyle: "text",
      big: "55% engineering 30% clinical & trust\n15% growth",
      sub: "",
    },
    {
      label: "MILESTONES",
      bigStyle: "text",
      big: "Q3 '26 public iOS Q1 '27 100K MAU Q4\n'27 Series A",
      sub: "",
    },
    {
      label: "GET IN TOUCH",
      bigStyle: "contact",
      big: "founders@boost.app",
      sub: "boost.app/investors",
    },
  ];

  const bx0 = 0.85, by = 8.45;
  const bw = 4.55, bgap = 0.05;
  for (let i = 0; i < bottom.length; i++) {
    const b = bottom[i];
    const bx = bx0 + i * (bw + bgap);
    s.addText(b.label, {
      x: bx, y: by, w: bw, h: 0.35,
      fontSize: 11, fontFace: "Calibri", bold: true, color: C.muted,
      charSpacing: 3, valign: "middle", margin: 0,
    });

    if (b.bigStyle === "stat") {
      s.addText(b.big, {
        x: bx, y: by + 0.4, w: bw, h: 0.85,
        fontSize: 36, fontFace: "Calibri", color: C.orange,
        valign: "top", margin: 0,
      });
      s.addText(b.sub, {
        x: bx, y: by + 1.3, w: bw, h: 0.4,
        fontSize: 11, fontFace: "Calibri", color: C.muted,
        valign: "top", margin: 0,
      });
    } else if (b.bigStyle === "contact") {
      s.addText([
        { text: b.big, options: { italic: true, color: C.orange } },
        { text: "  " + b.sub, options: { color: C.muted, fontSize: 13 } },
      ], {
        x: bx, y: by + 0.5, w: bw, h: 0.6,
        fontSize: 17, fontFace: "Calibri", valign: "top", margin: 0,
      });
    } else {
      s.addText(b.big, {
        x: bx, y: by + 0.5, w: bw, h: 1.2,
        fontSize: 17, fontFace: "Calibri", color: C.ink,
        valign: "top", margin: 0,
      });
    }
  }

  addFooter(s, 9);
}

// ---------- Output ----------
pres.writeFile({ fileName: "Plan_9.pptx" }).then(fn => {
  console.log("Written:", fn);
});
