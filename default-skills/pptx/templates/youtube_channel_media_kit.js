// build.js
// Recreates Fun_Bite_Advertising_Deck.html as a .pptx using pptxgenjs.
// Slide canvas in the source HTML is 1920 x 1080 px. We use LAYOUT_WIDE
// (13.333" x 7.5") and convert all pixel coords via PX().

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Fun Bite · Advertising Opportunities 2026";
pres.author = "Fun Bite";

// ---- Conversion helper: 1920 px -> 13.333 in ----
const SCALE = 13.333 / 1920; // ~0.006944
const PX = (v) => +(v * SCALE).toFixed(4);

// ---- Palette (from CSS variables) ----
const C = {
  paper:    "F6F1E6",
  paper2:   "EFE7D3",
  ink:      "141210",
  inkSoft:  "2A2722",
  muted:    "6B6358",
  red:      "EF3B2C",
  redInk:   "B8281C",
  butter:   "F4C430",
  mint:     "8FE3B4",
  sky:      "B8D8F2",
  paperDim: "9A9186", // the #9A9186 muted-on-dark color used in the deck
  paperLt:  "C8C0B2", // #C8C0B2 used on dark tiles
  paperE7:  "E7E0D3",
};

// ---- Font families used in the original deck ----
const F = {
  display: "Boldonse",      // display / headlines
  body:    "Inter",         // body copy
  mono:    "JetBrains Mono",// labels, eyebrows, meta
};

// ===================================================================
// Helper builders shared across slides
// ===================================================================

// Top bar: brand mark + meta text — matches .topbar markup in HTML
// Uses absolute pixel coords from the .frame (inset 70px 90px) rules.
function addTopBar(slide, metaText, opts = {}) {
  const leftPx  = 90;
  const rightPx = 90;
  const topPx   = 70;
  const brandSize = 30; // the .sq square size
  const brandY    = topPx;

  // Red square logo mark
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(leftPx),
    y: PX(brandY),
    w: PX(brandSize),
    h: PX(brandSize),
    fill:   { color: opts.squareFill || C.red },
    line:   { color: opts.squareFill || C.red, width: 0 },
    rectRadius: 0.06,
  });
  // Little triangle cut-out (▶ play arrow) inside the square.
  // We approximate the clip-path polygon(0 0, 100% 50%, 0 100%) by a
  // rotated rectangle is fiddly — instead we add a filled triangle via freeform.
  slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: PX(leftPx + 10),
    y: PX(brandY + 8),
    w: PX(14),
    h: PX(14),
    fill: { color: opts.triFill || C.paper },
    line: { color: opts.triFill || C.paper, width: 0 },
    rotate: 90,
  });

  // Brand wordmark
  slide.addText("Fun Bite", {
    x: PX(leftPx + brandSize + 14),
    y: PX(brandY - 4),
    w: PX(300),
    h: PX(40),
    fontFace: F.display,
    fontSize: 18,
    color: opts.brandColor || C.ink,
    margin: 0,
    valign: "middle",
  });

  // Meta text on the right
  slide.addText(metaText, {
    x: PX(1920 - rightPx - 800),
    y: PX(brandY + 6),
    w: PX(800),
    h: PX(28),
    fontFace: F.mono,
    fontSize: 11,
    color: opts.metaColor || C.muted,
    charSpacing: 1.2,
    align: "right",
    valign: "middle",
    margin: 0,
  });

  // Horizontal divider under the top bar (1.5px solid --ink)
  slide.addShape(pres.shapes.LINE, {
    x: PX(leftPx),
    y: PX(topPx + 54),
    w: PX(1920 - leftPx - rightPx),
    h: 0,
    line: { color: opts.lineColor || C.ink, width: 1.5 },
  });
}

// Footer marks used on content slides (left footmark + right page number)
function addFoot(slide, footText, pageText, opts = {}) {
  slide.addText(footText, {
    x: PX(90),
    y: PX(1080 - 66),
    w: PX(1000),
    h: PX(22),
    fontFace: F.mono,
    fontSize: 10,
    color: opts.color || C.muted,
    charSpacing: 1.2,
    valign: "middle",
    margin: 0,
  });
  slide.addText(pageText, {
    x: PX(1920 - 90 - 200),
    y: PX(1080 - 66),
    w: PX(200),
    h: PX(22),
    fontFace: F.mono,
    fontSize: 10,
    color: opts.color || C.muted,
    charSpacing: 1.2,
    align: "right",
    valign: "middle",
    margin: 0,
  });
}

// "Eyebrow": tiny uppercase mono label
function addEyebrow(slide, x, y, w, text, color = C.muted) {
  slide.addText(text.toUpperCase(), {
    x: PX(x), y: PX(y), w: PX(w), h: PX(24),
    fontFace: F.mono,
    fontSize: 11,
    color,
    charSpacing: 2.5,
    margin: 0,
    valign: "middle",
  });
}

// ===================================================================
// SLIDE 1 — COVER
// ===================================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: C.ink };

  // Radial-gradient hotspots (approximated with big transparent ovals)
  s.addShape(pres.shapes.OVAL, {
    x: PX(1920 * 0.85 - 600), y: PX(1080 * 1.1 - 400),
    w: PX(1200), h: PX(800),
    fill: { color: C.red, transparency: 72 },
    line: { color: C.red, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: PX(1920 * 0.10 - 400), y: PX(-300),
    w: PX(800), h: PX(600),
    fill: { color: C.butter, transparency: 88 },
    line: { color: C.butter, width: 0 },
  });

  // ---- Top bar (cover variant: light text) ----
  // Red square + triangle
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(90), y: PX(70), w: PX(38), h: PX(38),
    fill: { color: C.red }, line: { color: C.red, width: 0 },
    rectRadius: 0.07,
  });
  s.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: PX(90 + 13), y: PX(70 + 10),
    w: PX(17), h: PX(18),
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    rotate: 90,
  });
  s.addText("Fun Bite", {
    x: PX(90 + 38 + 14), y: PX(70 - 2),
    w: PX(400), h: PX(42),
    fontFace: F.display, fontSize: 21, color: C.paper,
    margin: 0, valign: "middle",
  });
  s.addText("Advertising Partnerships · 2026", {
    x: PX(1920 - 90 - 700), y: PX(70 + 4),
    w: PX(700), h: PX(28),
    fontFace: F.mono, fontSize: 14,
    color: C.paperDim,
    charSpacing: 2.2,
    align: "right", valign: "middle", margin: 0,
  });

  // ---- Headline eyebrow (butter) ----
  s.addText("A MEDIA KIT FOR BRANDS WHO WANT TO BE FUNNY ON PURPOSE", {
    x: PX(90), y: PX(180),
    w: PX(1920 - 180), h: PX(30),
    fontFace: F.mono, fontSize: 14,
    color: C.butter,
    charSpacing: 3.5,
    margin: 0, valign: "middle",
  });

  // ---- Huge display headline ----
  // "Put your brand / in the punchline." with 'punchline' in red + yellow dot
  s.addText([
    { text: "Put your brand", options: { color: C.paper, breakLine: true } },
    { text: "in the ",        options: { color: C.paper } },
    { text: "punchline",      options: { color: C.red } },
    { text: ".",              options: { color: C.red } },
  ], {
    x: PX(90), y: PX(230),
    w: PX(1920 - 180), h: PX(420),
    fontFace: F.display, fontSize: 84,
    charSpacing: -1.5,
    margin: 0, valign: "top",
    paraSpaceAfter: 0,
  });
  // (butter dot from source HTML was tucked next to 'punchline' — we skip it
  //  here because its placement depends on precise Boldonse text metrics that
  //  differ at render time.)

  // ---- Stats row (bottom) ----
  // Top divider line
  const statsTop = 1080 - 110 - 190;
  s.addShape(pres.shapes.LINE, {
    x: PX(90), y: PX(statsTop),
    w: PX(1920 - 180), h: 0,
    line: { color: "FFFFFF", width: 0.75, transparency: 80 },
  });

  const stats = [
    { label: "SUBSCRIBERS",   big: "2M", plus: "+", plusColor: C.red },
    { label: "EPISODES / MO", big: "20", plus: "＋", plusColor: C.butter },
    { label: "REACH",         big: "Global" },
    { label: "FORMATS",       big: "11" },
  ];
  const colW = (1920 - 180) / 4;
  stats.forEach((st, i) => {
    const xL = 90 + i * colW;
    // Vertical divider line between cols (not before the first)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: PX(xL), y: PX(statsTop + 36),
        w: 0, h: PX(140),
        line: { color: "FFFFFF", width: 0.75, transparency: 80 },
      });
    }
    const pad = i === 0 ? 0 : 28;
    s.addText(st.label, {
      x: PX(xL + pad), y: PX(statsTop + 36),
      w: PX(colW - pad - 28), h: PX(28),
      fontFace: F.mono, fontSize: 13,
      color: C.paperDim, charSpacing: 2.5,
      margin: 0, valign: "middle",
    });
    // Big number
    const runs = [{ text: st.big, options: { color: C.paper } }];
    if (st.plus) runs.push({ text: st.plus, options: { color: st.plusColor, fontSize: st.plus === "＋" ? 28 : 44 } });
    s.addText(runs, {
      x: PX(xL + pad), y: PX(statsTop + 36 + 36),
      w: PX(colW - pad - 28), h: PX(90),
      fontFace: F.display, fontSize: 44,
      charSpacing: -1, margin: 0, valign: "top",
    });
  });

  // ---- Bottom caption ----
  s.addText("PREPARED FOR: PROSPECTIVE PARTNERS", {
    x: PX(90), y: PX(1080 - 66),
    w: PX(900), h: PX(22),
    fontFace: F.mono, fontSize: 11,
    color: C.paperDim, charSpacing: 2.2,
    margin: 0, valign: "middle",
  });
  s.addText("01 / 10", {
    x: PX(1920 - 90 - 200), y: PX(1080 - 66),
    w: PX(200), h: PX(22),
    fontFace: F.mono, fontSize: 11,
    color: C.paperDim, charSpacing: 2.2,
    align: "right", margin: 0, valign: "middle",
  });
}

// ===================================================================
// SLIDE 2 — MEET FUN BITE
// ===================================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopBar(s, "01 · The Channel");

  // ---- Left column ----
  const leftX = 90;
  const leftW = 900;
  const contentTop = 70 + 54 + 60; // topbar + margin

  addEyebrow(s, leftX, contentTop, leftW, "Meet Fun Bite");

  // Big display headline: "Comedy / on a / [snack schedule.]"
  // Lines are stacked with explicit y to keep fonts-fallback safe.
  s.addText("Comedy", {
    x: PX(leftX), y: PX(contentTop + 30),
    w: PX(leftW), h: PX(120),
    fontFace: F.display, fontSize: 52,
    color: C.ink, charSpacing: -1.5,
    margin: 0, valign: "top",
  });
  s.addText("on a", {
    x: PX(leftX), y: PX(contentTop + 150),
    w: PX(leftW), h: PX(120),
    fontFace: F.display, fontSize: 52,
    color: C.ink, charSpacing: -1.5,
    margin: 0, valign: "top",
  });
  // "snack schedule." on a red block, slightly tilted
  s.addShape(pres.shapes.RECTANGLE, {
    x: PX(leftX), y: PX(contentTop + 270),
    w: PX(780), h: PX(120),
    fill: { color: C.red }, line: { color: C.red, width: 0 },
    rotate: -1.5,
  });
  s.addText("snack schedule.", {
    x: PX(leftX + 16), y: PX(contentTop + 270),
    w: PX(760), h: PX(120),
    fontFace: F.display, fontSize: 52,
    color: C.paper, charSpacing: -1.5,
    margin: 0, valign: "middle",
    rotate: -1.5,
  });

  // Body paragraph
  s.addText(
    "Fun Bite is a global entertainment channel built for the in-between moments — your commute, your lunch break, the 10 minutes before bed. We ship long-form and shorts, multiple times a week, to a worldwide audience that comes back for the laugh.",
    {
      x: PX(leftX), y: PX(contentTop + 430),
      w: PX(720), h: PX(200),
      fontFace: F.body, fontSize: 13,
      color: C.inkSoft, lineSpacingMultiple: 1.45,
      margin: 0, valign: "top",
    }
  );

  // Pills row
  const pills = ["Daily laughs", "Long-form + Shorts", "Globally distributed", "Creator-led"];
  let pillX = leftX;
  const pillY = contentTop + 670;
  pills.forEach((p, i) => {
    const w = 30 + p.length * 11 + (i === 0 ? 26 : 0); // extra space for dot on first pill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(pillX), y: PX(pillY),
      w: PX(w), h: PX(44),
      fill: { color: C.paper },
      line: { color: C.ink, width: 1.25 },
      rectRadius: 0.3,
    });
    if (i === 0) {
      // Red dot
      s.addShape(pres.shapes.OVAL, {
        x: PX(pillX + 16), y: PX(pillY + 18),
        w: PX(8), h: PX(8),
        fill: { color: C.red }, line: { color: C.red, width: 0 },
      });
    }
    s.addText(p, {
      x: PX(pillX + (i === 0 ? 30 : 14)), y: PX(pillY),
      w: PX(w - (i === 0 ? 44 : 28)), h: PX(44),
      fontFace: F.mono, fontSize: 10,
      color: C.ink, margin: 0,
      valign: "middle", align: "center",
    });
    pillX += w + 10;
  });

  // ---- Right column: show tile + tape ----
  const rightX = 1080;
  const tileW = 680;
  const tileH = 920;
  const tileY = contentTop;

  // Tile background (dark gradient-ish) — approximate with dark fill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(rightX), y: PX(tileY),
    w: PX(tileW), h: PX(tileH),
    fill: { color: "232019" },
    line: { color: "232019", width: 0 },
    rectRadius: 0.12,
    shadow: { type: "outer", color: "000000", blur: 30, offset: 18, angle: 90, opacity: 0.35 },
  });

  // Upper "video" area (~62% of tile): a dark panel with a soft tonal stripe.
  // The HTML uses a CSS repeating-linear-gradient, which we can't clip to a
  // rounded shape — so we render a solid dark panel and rely on the
  // "[ SHORTS · CLIP ]" label to signal "video placeholder". Two horizontal
  // tonal bands add a subtle texture without overflowing.
  const stripeH = tileH * 0.62;
  s.addShape(pres.shapes.RECTANGLE, {
    x: PX(rightX), y: PX(tileY),
    w: PX(tileW), h: PX(stripeH),
    fill: { color: "2a2621" },
    line: { color: "2a2621", width: 0 },
  });
  // Subtle horizontal tonal bands
  for (let i = 0; i < 4; i++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: PX(rightX), y: PX(tileY + 40 + i * 140),
      w: PX(tileW), h: PX(60),
      fill: { color: "232019" },
      line: { color: "232019", width: 0 },
    });
  }

  // "[ SHORTS · CLIP ]" label centered on the striped area
  s.addText("[ SHORTS · CLIP ]", {
    x: PX(rightX), y: PX(tileY + stripeH / 2 - 20),
    w: PX(tileW), h: PX(40),
    fontFace: F.mono, fontSize: 11,
    color: C.muted, charSpacing: 3,
    align: "center", valign: "middle", margin: 0,
  });

  // Lower caption area (dark)
  const capY = tileY + stripeH + 22;
  s.addText("NOW PLAYING · 1:02", {
    x: PX(rightX + 24), y: PX(capY),
    w: PX(tileW - 48), h: PX(22),
    fontFace: F.mono, fontSize: 10,
    color: C.paperDim, charSpacing: 2.2,
    margin: 0, valign: "middle",
  });
  s.addText([
    { text: "when the wifi dies", options: { breakLine: true } },
    { text: "mid-zoom 🫠" },
  ], {
    x: PX(rightX + 24), y: PX(capY + 30),
    w: PX(tileW - 48), h: PX(90),
    fontFace: F.display, fontSize: 18,
    color: C.paper, charSpacing: -0.5,
    margin: 0, valign: "top",
  });
  s.addText("♥ 482K     💬 19K     ↗ 86K", {
    x: PX(rightX + 24), y: PX(capY + 130),
    w: PX(tileW - 48), h: PX(22),
    fontFace: F.mono, fontSize: 10,
    color: C.paperLt, margin: 0, valign: "middle",
  });

  // Red burst tag (rotated)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(rightX + 24), y: PX(tileY + 24),
    w: PX(130), h: PX(44),
    fill: { color: C.red }, line: { color: C.red, width: 0 },
    rectRadius: 0.06,
    rotate: -6,
  });
  s.addText("FUN BITE", {
    x: PX(rightX + 24), y: PX(tileY + 24),
    w: PX(130), h: PX(44),
    fontFace: F.display, fontSize: 13,
    color: C.paper, margin: 0,
    align: "center", valign: "middle",
    rotate: -6,
  });

  // Yellow tape
  s.addShape(pres.shapes.RECTANGLE, {
    x: PX(rightX + 60), y: PX(tileY - 14),
    w: PX(140), h: PX(36),
    fill: { color: C.butter, transparency: 10 },
    line: { color: C.butter, width: 0 },
    rotate: -4,
    shadow: { type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.1 },
  });

  addFoot(s, "FUN BITE · 2026", "02 / 10");
}

// ===================================================================
// SLIDE 3 — AUDIENCE
// ===================================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "02 · The Audience");

  const top = 70 + 54 + 30;
  addEyebrow(s, 90, top, 1700, "Who's watching");

  // Headline
  s.addText([
    { text: "A global audience that treats us like a ", options: { color: C.ink } },
    { text: "snack break.",                               options: { color: C.red } },
  ], {
    x: PX(90), y: PX(top + 30),
    w: PX(1700), h: PX(220),
    fontFace: F.display, fontSize: 40,
    charSpacing: -1.5,
    margin: 0, valign: "top",
  });

  // Three cards
  const cardsTop = top + 280;
  const cardsH   = 500;
  const totalW   = 1920 - 180;
  const gap      = 32;
  // grid: 1.2fr 1fr 1fr
  const unit = (totalW - 2 * gap) / 3.2;
  const w1 = unit * 1.2;
  const w2 = unit;
  const w3 = unit;
  const x1 = 90;
  const x2 = x1 + w1 + gap;
  const x3 = x2 + w2 + gap;

  // --- Card 1: Geography (paper2 bg, ink border) ---
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(x1), y: PX(cardsTop), w: PX(w1), h: PX(cardsH),
    fill: { color: C.paper2 },
    line: { color: C.ink, width: 1.25 },
    rectRadius: 0.15,
  });
  addEyebrow(s, x1 + 36, cardsTop + 38, w1 - 72, "Geography");
  s.addText("Global, English-first", {
    x: PX(x1 + 36), y: PX(cardsTop + 70),
    w: PX(w1 - 72), h: PX(80),
    fontFace: F.display, fontSize: 22,
    color: C.ink, charSpacing: -0.5,
    margin: 0, valign: "top",
  });
  // Geo bars
  const geos = [
    { label: "United States",   pct: 34, color: C.red },
    { label: "UK · Canada · AU", pct: 22, color: C.ink },
    { label: "Europe",          pct: 18, color: C.butter },
    { label: "Asia-Pacific",    pct: 17, color: C.mint },
    { label: "LATAM + other",   pct: 9,  color: C.sky },
  ];
  const barStart = cardsTop + 160;
  geos.forEach((g, i) => {
    const y = barStart + i * 64;
    s.addText(g.label, {
      x: PX(x1 + 36), y: PX(y),
      w: PX(w1 - 72 - 80), h: PX(22),
      fontFace: F.mono, fontSize: 9,
      color: C.ink, margin: 0, valign: "middle",
    });
    s.addText(`${g.pct}%`, {
      x: PX(x1 + w1 - 36 - 80), y: PX(y),
      w: PX(80), h: PX(22),
      fontFace: F.mono, fontSize: 9,
      color: C.ink, align: "right",
      margin: 0, valign: "middle",
    });
    // Bar track
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(x1 + 36), y: PX(y + 28),
      w: PX(w1 - 72), h: PX(10),
      fill: { color: "FFFFFF" },
      line: { color: C.ink, width: 0.75 },
      rectRadius: 0.03,
    });
    // Bar fill
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(x1 + 36), y: PX(y + 28),
      w: PX((w1 - 72) * g.pct / 100), h: PX(10),
      fill: { color: g.color }, line: { color: g.color, width: 0 },
      rectRadius: 0.03,
    });
  });

  // --- Card 2: Core age (ink bg) ---
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(x2), y: PX(cardsTop), w: PX(w2), h: PX(cardsH),
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    rectRadius: 0.15,
  });
  addEyebrow(s, x2 + 36, cardsTop + 38, w2 - 72, "Core age", C.paperDim);
  // Big "18–34" with red dash
  s.addText([
    { text: "18", options: { color: C.paper } },
    { text: "–",  options: { color: C.red } },
    { text: "34", options: { color: C.paper } },
  ], {
    x: PX(x2 + 36), y: PX(cardsTop + 70),
    w: PX(w2 - 72), h: PX(140),
    fontFace: F.display, fontSize: 68,
    charSpacing: -2, margin: 0, valign: "top",
  });
  s.addText([
    { text: "accounts for ", options: { color: C.paperLt } },
    { text: "71%",           options: { color: C.butter, bold: true } },
    { text: " of watch time.", options: { color: C.paperLt } },
  ], {
    x: PX(x2 + 36), y: PX(cardsTop + 220),
    w: PX(w2 - 72), h: PX(30),
    fontFace: F.body, fontSize: 11,
    margin: 0, valign: "top",
  });
  // Bar chart (5 bars)
  const bars = [
    { label: "13-17", pct: 32, color: "3a342c", lblColor: C.paperDim },
    { label: "18-24", pct: 78, color: C.red,   lblColor: C.paper },
    { label: "25-34", pct: 92, color: C.butter, lblColor: C.paper },
    { label: "35-44", pct: 46, color: "3a342c", lblColor: C.paperDim },
    { label: "45+",   pct: 20, color: "3a342c", lblColor: C.paperDim },
  ];
  const barAreaX = x2 + 36;
  const barAreaW = w2 - 72;
  const barAreaY = cardsTop + 290;
  const barAreaH = 160;
  const bw = (barAreaW - 4 * 10) / 5;
  bars.forEach((b, i) => {
    const bx = barAreaX + i * (bw + 10);
    const bh = barAreaH * b.pct / 100;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(bx), y: PX(barAreaY + barAreaH - bh),
      w: PX(bw), h: PX(bh),
      fill: { color: b.color }, line: { color: b.color, width: 0 },
      rectRadius: 0.03,
    });
    s.addText(b.label, {
      x: PX(bx), y: PX(barAreaY + barAreaH + 6),
      w: PX(bw), h: PX(20),
      fontFace: F.mono, fontSize: 7,
      color: b.lblColor, align: "center",
      margin: 0, valign: "middle",
    });
  });

  // --- Card 3: Vibe (red bg) ---
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(x3), y: PX(cardsTop), w: PX(w3), h: PX(cardsH),
    fill: { color: C.red }, line: { color: C.red, width: 0 },
    rectRadius: 0.15,
  });
  addEyebrow(s, x3 + 36, cardsTop + 38, w3 - 72, "Why they watch", "B8AFA1");
  s.addText([
    { text: "Daily fun.",           options: { breakLine: true } },
    { text: "Resting-time fun.",    options: { breakLine: true } },
    { text: "Short-form fun." },
  ], {
    x: PX(x3 + 36), y: PX(cardsTop + 70),
    w: PX(w3 - 72), h: PX(230),
    fontFace: F.display, fontSize: 22,
    color: C.paper, charSpacing: -0.5,
    margin: 0, valign: "top",
    lineSpacingMultiple: 1.25,
  });
  // Stat rows
  const vibeRows = [
    ["Gender split", "52 / 48"],
    ["Repeat viewers", "64%"],
    ["Avg session", "14 min"],
  ];
  vibeRows.forEach((r, i) => {
    const y = cardsTop + 330 + i * 40;
    s.addText(r[0], {
      x: PX(x3 + 36), y: PX(y),
      w: PX((w3 - 72) / 2), h: PX(24),
      fontFace: F.mono, fontSize: 10,
      color: C.paper, margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: PX(x3 + 36 + (w3 - 72) / 2), y: PX(y),
      w: PX((w3 - 72) / 2), h: PX(24),
      fontFace: F.mono, fontSize: 10,
      color: C.paper, align: "right",
      margin: 0, valign: "middle",
    });
    if (i < vibeRows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: PX(x3 + 36), y: PX(y + 28),
        w: PX(w3 - 72), h: 0,
        line: { color: "FFFFFF", width: 0.5, dashType: "dash", transparency: 65 },
      });
    }
  });

  addFoot(s, "SOURCE: CHANNEL ANALYTICS · TRAILING 90 DAYS", "03 / 10");
}

// ===================================================================
// SLIDE 4 — REACH & CADENCE
// ===================================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "03 · Reach & Cadence");

  const top = 70 + 54 + 40;
  addEyebrow(s, 90, top, 1700, "How much air you're buying");
  s.addText([
    { text: "We post a lot. ", options: { color: C.ink } },
    { text: "That's a lot of at-bats.", options: { color: C.red } },
  ], {
    x: PX(90), y: PX(top + 30),
    w: PX(1700), h: PX(130),
    fontFace: F.display, fontSize: 48,
    charSpacing: -1.5, margin: 0, valign: "top",
  });

  // 4 stat cards
  const cardsY = top + 190;
  const cardsH = 320;
  const totalW = 1920 - 180;
  const gap = 22;
  const cw = (totalW - 3 * gap) / 4;
  const cards = [
    { eyebrow: "Subscribers",          big: "2M+",   desc: "Opted-in viewers across long-form & shorts.", dark: false },
    { eyebrow: "Episodes / month",     big: "20",  suffix: "+", sufColor: C.red, desc: "Mix of long-form uploads & Shorts.", dark: false },
    { eyebrow: "Monthly impressions",  big: "40M", suffix: "*", sufColor: C.butter, desc: "*Estimated, channel-wide thumbnails + in-feed.", dark: false },
    { eyebrow: "Avg views / video",    big: "850K", desc: "Long-form, 30-day rolling average.", dark: true },
  ];
  cards.forEach((c, i) => {
    const x = 90 + i * (cw + gap);
    if (c.dark) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(x), y: PX(cardsY), w: PX(cw), h: PX(cardsH),
        fill: { color: C.ink }, line: { color: C.ink, width: 0 },
        rectRadius: 0.15,
      });
    } else {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(x), y: PX(cardsY), w: PX(cw), h: PX(cardsH),
        fill: { color: C.paper2 },
        line: { color: C.ink, width: 1.25 },
        rectRadius: 0.15,
      });
    }
    addEyebrow(s, x + 32, cardsY + 32, cw - 64, c.eyebrow, c.dark ? C.paperDim : C.muted);
    const runs = [{ text: c.big, options: { color: c.dark ? C.paper : C.ink } }];
    if (c.suffix) runs.push({ text: c.suffix, options: { color: c.sufColor } });
    s.addText(runs, {
      x: PX(x + 32), y: PX(cardsY + 60),
      w: PX(cw - 64), h: PX(140),
      fontFace: F.display, fontSize: 56,
      charSpacing: -2, margin: 0, valign: "top",
    });
    s.addText(c.desc, {
      x: PX(x + 32), y: PX(cardsY + 220),
      w: PX(cw - 64), h: PX(80),
      fontFace: F.body, fontSize: 10,
      color: c.dark ? C.paperLt : C.muted,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
  });

  // Weekly strip
  const stripY = cardsY + cardsH + 44;
  addEyebrow(s, 90, stripY, 1700, "A typical week on the channel");
  const days = [
    { d: "MON", t: "Short",      type: "short" },
    { d: "TUE", t: "Long-form",  type: "long" },
    { d: "WED", t: "Short",      type: "short" },
    { d: "THU", t: "Community",  type: "community" },
    { d: "FRI", t: "Long-form",  type: "long" },
    { d: "SAT", t: "Short",      type: "short" },
    { d: "SUN", t: "Livestream", type: "livestream" },
  ];
  const dayY = stripY + 34;
  const dayH = 130;
  const gap2 = 14;
  const dw = (totalW - 6 * gap2) / 7;
  days.forEach((d, i) => {
    const dx = 90 + i * (dw + gap2);
    let bg = C.paper2, borderC = C.ink, labelC = C.muted, titleC = C.ink;
    if (d.type === "long")        { bg = C.red;    borderC = C.red;    labelC = "C8C0B2"; titleC = C.paper; }
    else if (d.type === "livestream") { bg = C.ink; borderC = C.ink;   labelC = "B8AFA1"; titleC = C.butter; }
    else if (d.type === "community") { bg = C.butter; borderC = C.ink; labelC = C.muted;    titleC = C.ink; }

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(dx), y: PX(dayY), w: PX(dw), h: PX(dayH),
      fill: { color: bg },
      line: { color: borderC, width: 1.25 },
      rectRadius: 0.1,
    });
    s.addText(d.d, {
      x: PX(dx + 16), y: PX(dayY + 14),
      w: PX(dw - 32), h: PX(20),
      fontFace: F.mono, fontSize: 8,
      color: labelC, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(d.t, {
      x: PX(dx + 16), y: PX(dayY + dayH - 40),
      w: PX(dw - 32), h: PX(28),
      fontFace: F.display, fontSize: 13,
      color: titleC, margin: 0, valign: "middle",
    });
  });

  addFoot(s, "TYPICAL CADENCE — VARIES BY SERIES", "04 / 10");
}

// ===================================================================
// SLIDE 5 — WHY IT WORKS
// ===================================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "04 · Why It Works");

  const top = 70 + 54 + 40;
  // Left col
  const leftX = 90;
  const leftW = 900;
  addEyebrow(s, leftX, top, leftW, "Why comedy sells");
  s.addText([
    { text: "People remember",        options: { color: C.ink, breakLine: true } },
    { text: "what makes them ",       options: { color: C.ink, breakLine: true } },
    { text: "laugh.",                 options: { color: C.red } },
  ], {
    x: PX(leftX), y: PX(top + 30),
    w: PX(leftW), h: PX(480),
    fontFace: F.display, fontSize: 48,
    charSpacing: -1.5, margin: 0, valign: "top",
    lineSpacingMultiple: 1.1,
  });
  s.addText(
    "Entertainment watch-time is high-intent downtime. Viewers aren't skimming — they're laughing, relaxing, and trusting the host's voice. Brand mentions land as jokes, not interruptions.",
    {
      x: PX(leftX), y: PX(top + 540),
      w: PX(leftW - 120), h: PX(200),
      fontFace: F.body, fontSize: 13,
      color: C.inkSoft, lineSpacingMultiple: 1.45,
      margin: 0, valign: "top",
    }
  );

  // Right col: 4 stat boxes
  const rightX = 1060;
  const rightW = 770;
  const boxH   = 150;
  const boxGap = 22;
  const stats = [
    { big: "87%",          desc: "ad-completion rate on integrated reads (vs. 32% industry pre-roll)", border: C.red,    dark: false },
    { big: "3.2×",         desc: "avg click-through vs. standard description links",                   border: C.butter, dark: false },
    { big: "14",           suffix: " days", desc: "median turnaround from brief → published integration", border: C.ink, dark: false },
    { big: "Evergreen",    desc: "every video keeps earning views — your placement doesn't expire.",   dark: true },
  ];
  stats.forEach((st, i) => {
    const y = top + i * (boxH + boxGap);
    if (st.dark) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(rightX), y: PX(y), w: PX(rightW), h: PX(boxH),
        fill: { color: C.ink }, line: { color: C.ink, width: 0 },
        rectRadius: 0.08,
      });
    } else {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(rightX), y: PX(y), w: PX(rightW), h: PX(boxH),
        fill: { color: C.paper2 }, line: { color: C.paper2, width: 0 },
        rectRadius: 0.08,
      });
      // Left accent bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: PX(rightX), y: PX(y), w: PX(8), h: PX(boxH),
        fill: { color: st.border }, line: { color: st.border, width: 0 },
      });
    }
    // Big number
    const runs = [{ text: st.big, options: { color: st.dark ? C.paper : C.ink } }];
    if (st.suffix) runs.push({ text: st.suffix, options: { color: C.muted, fontSize: 18 } });
    s.addText(runs, {
      x: PX(rightX + 32), y: PX(y + 18),
      w: PX(rightW - 64), h: PX(50),
      fontFace: F.display, fontSize: 30,
      charSpacing: -1, margin: 0, valign: "middle",
    });
    s.addText(st.desc, {
      x: PX(rightX + 32), y: PX(y + 72),
      w: PX(rightW - 64), h: PX(50),
      fontFace: F.body, fontSize: 11,
      color: st.dark ? C.paperLt : C.inkSoft,
      margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
  });

  addFoot(s, "INTERNAL BENCHMARK, PAST 12 INTEGRATIONS", "05 / 10");
}

// ===================================================================
// SLIDE 6 — AD FORMATS MENU
// ===================================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "05 · The Menu");

  const top = 70 + 54 + 40;
  addEyebrow(s, 90, top, 1700, "11 ways to show up");
  s.addText([
    { text: "Pick your ", options: { color: C.ink } },
    { text: "flavor.",    options: { color: C.red } },
  ], {
    x: PX(90), y: PX(top + 30),
    w: PX(1700), h: PX(130),
    fontFace: F.display, fontSize: 54,
    charSpacing: -1.5, margin: 0, valign: "top",
  });

  // 4-column grid, row heights ~180. 11 cards where #01 spans 2 rows.
  const gridY = top + 190;
  const cols = 4;
  const gap = 18;
  const totalW = 1920 - 180;
  const cw = (totalW - (cols - 1) * gap) / cols;
  const rh = 200;

  const fmts = [
    { n: "01", t: "Full sponsored episode",    d: "An entire video built around your brand — concept, script, and comedic premise.", span2: true, dark: true, tag: "Signature", tagBg: C.red },
    { n: "02", t: "Dedicated integration",     d: "60–90s host read, custom-written in the Fun Bite voice." },
    { n: "03", t: "Product placement (PPL)",   d: "Natural on-screen appearance inside a sketch." },
    { n: "04", t: "Branded series",            d: "Recurring multi-video format co-built with the brand.", yellow: true, tag: "Multi-video", tagBg: C.ink, tagColor: C.butter },
    { n: "05", t: "Shorts integration",        d: "Vertical-first mention tailored to the Shorts algorithm." },
    { n: "06", t: "Short mention / shoutout",  d: "15–20s callout within a regular episode." },
    { n: "07", t: "Pinned comment + link",     d: "Top-of-comments link with custom copy." },
    { n: "08", t: "Community post",            d: "Poll, image, or teaser post to subscribers." },
    { n: "09", t: "Livestream sponsorship",    d: "Named segment within a weekly livestream." },
    { n: "10", t: "Giveaway collab",           d: "Prize-led campaign with entry mechanic." },
    { n: "11", t: "Affiliate / performance",   d: "CPA or rev-share on tracked links & codes." },
  ];

  // Layout: card #01 occupies col 0, rows 0+1.
  // Remaining cards flow row-by-row in cols 1..3, then fill col 0 row 2 etc.
  // Simpler: build an explicit grid.
  const positions = [
    { r: 0, c: 0, span: 2 }, // 01
    { r: 0, c: 1 },          // 02
    { r: 0, c: 2 },          // 03
    { r: 0, c: 3 },          // 04
    { r: 1, c: 1 },          // 05
    { r: 1, c: 2 },          // 06
    { r: 1, c: 3 },          // 07
    { r: 2, c: 0 },          // 08
    { r: 2, c: 1 },          // 09
    { r: 2, c: 2 },          // 10
    { r: 2, c: 3 },          // 11
  ];

  fmts.forEach((f, i) => {
    const p = positions[i];
    const x = 90 + p.c * (cw + gap);
    const y = gridY + p.r * (rh + gap);
    const h = p.span === 2 ? (rh * 2 + gap) : rh;

    let bg = C.paper2, borderC = C.ink, titleC = C.ink, descC = C.inkSoft, numC = C.muted;
    if (f.dark)       { bg = C.ink;    borderC = C.ink; titleC = C.paper; descC = C.paperLt; numC = C.paperDim; }
    else if (f.yellow){ bg = C.butter; borderC = C.ink; }

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(x), y: PX(y), w: PX(cw), h: PX(h),
      fill: { color: bg },
      line: { color: borderC, width: f.dark ? 0 : 1.25 },
      rectRadius: 0.12,
    });
    // Number
    s.addText(f.n, {
      x: PX(x + 22), y: PX(y + 20),
      w: PX(cw - 44), h: PX(18),
      fontFace: F.mono, fontSize: 8,
      color: numC, charSpacing: 2.5,
      margin: 0, valign: "middle",
    });
    // Title
    s.addText(f.t, {
      x: PX(x + 22), y: PX(y + 46),
      w: PX(cw - 44), h: PX(f.span === 2 ? 140 : 70),
      fontFace: F.display, fontSize: 14,
      color: titleC, charSpacing: -0.5,
      margin: 0, valign: "top",
      lineSpacingMultiple: 1.05,
    });
    // Description
    s.addText(f.d, {
      x: PX(x + 22), y: PX(y + (f.span === 2 ? 200 : 108)),
      w: PX(cw - 44), h: PX(f.span === 2 ? 180 : 80),
      fontFace: F.body, fontSize: 9,
      color: descC, margin: 0, valign: "top", lineSpacingMultiple: 1.4,
    });
    // Tag pill
    if (f.tag) {
      const tagW = Math.max(110, f.tag.length * 10 + 40);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(x + cw - 22 - tagW), y: PX(y + 18),
        w: PX(tagW), h: PX(26),
        fill: { color: f.tagBg }, line: { color: f.tagBg, width: 0 },
        rectRadius: 0.3,
      });
      s.addText(f.tag.toUpperCase(), {
        x: PX(x + cw - 22 - tagW), y: PX(y + 18),
        w: PX(tagW), h: PX(26),
        fontFace: F.mono, fontSize: 7,
        color: f.tagColor || C.paper, charSpacing: 1.5,
        align: "center", valign: "middle", margin: 0,
      });
    }
  });

  addFoot(s, "MIX & MATCH — MOST CAMPAIGNS USE 2–3 FORMATS", "06 / 10");
}

// ===================================================================
// SLIDE 7 — PRICING
// ===================================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "06 · Packages");

  const top = 70 + 54 + 40;
  addEyebrow(s, 90, top, 900, "Starter rates · USD");
  s.addText("Three ways in.", {
    x: PX(90), y: PX(top + 30),
    w: PX(900), h: PX(120),
    fontFace: F.display, fontSize: 52,
    color: C.ink, charSpacing: -1.5,
    margin: 0, valign: "top",
  });
  s.addText("ALL PACKAGES INCLUDE BRIEFING CALL, 1 REVISION ROUND, PERFORMANCE RECAP, AND EXCLUSIVITY WINDOW IN CATEGORY.", {
    x: PX(1920 - 90 - 480), y: PX(top + 90),
    w: PX(480), h: PX(60),
    fontFace: F.mono, fontSize: 8,
    color: C.muted, charSpacing: 2,
    align: "right", margin: 0, valign: "top",
    lineSpacingMultiple: 1.4,
  });

  // Three tier cards
  const cardsY = top + 200;
  const cardsH = 620;
  const totalW = 1920 - 180;
  const gap = 28;
  const cw = (totalW - 2 * gap) / 3;

  const tiers = [
    {
      tier: "Tier 01", name: "Snack",
      subtitle: "Single placement · 1 video",
      price: "$12K",
      dark: false, featured: false,
      features: [
        "✦ 1× short mention OR PPL",
        "✦ Pinned comment w/ link",
        "✦ 1 community post",
        "✦ 30-day performance recap",
      ],
    },
    {
      tier: "Tier 02", name: "Combo",
      subtitle: "Integrated campaign · 2–3 videos",
      price: "$38K",
      dark: false, featured: true,
      features: [
        "✦ 1× dedicated 60–90s integration",
        "✦ 1× Shorts integration",
        "✦ PPL across 1 additional long-form",
        "✦ Pinned comment + description link",
        "✦ 2 community posts",
        "✦ 60-day performance recap",
      ],
    },
    {
      tier: "Tier 03", name: "Feast",
      subtitle: "Branded series · multi-month",
      price: "$95K", priceColor: C.butter,
      dark: true, featured: false,
      features: [
        "✦ Full sponsored episode",
        "✦ Branded series (3+ videos)",
        "✦ Named livestream segment",
        "✦ Giveaway mechanic",
        "✦ Affiliate tracking + codes",
        "✦ Quarterly performance review",
      ],
    },
  ];

  tiers.forEach((t, i) => {
    const x = 90 + i * (cw + gap);
    const y = t.featured ? cardsY - 20 : cardsY;
    let bg = C.paper2, borderC = C.ink, tierC = C.muted, titleC = C.ink, subtitleC = C.muted,
        priceC = C.ink, sepC = C.ink, featC = C.inkSoft;
    if (t.featured) { bg = C.red; borderC = C.red; tierC = "C8C0B2"; titleC = C.paper; subtitleC = "E8DED0"; priceC = C.paper; sepC = "8F8778"; featC = C.paper; }
    else if (t.dark) { bg = C.ink; borderC = C.ink; tierC = C.paperDim; titleC = C.paper; subtitleC = C.paperLt; priceC = t.priceColor || C.paper; sepC = "3A342C"; featC = C.paperE7; }

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(x), y: PX(y), w: PX(cw), h: PX(cardsH),
      fill: { color: bg }, line: { color: borderC, width: t.featured || t.dark ? 0 : 1.25 },
      rectRadius: 0.15,
      shadow: t.featured ? { type: "outer", color: "EF3B2C", blur: 40, offset: 22, angle: 90, opacity: 0.45 } : undefined,
    });

    // "Most Booked" badge on featured
    if (t.featured) {
      const bw = 220;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: PX(x + cw - 28 - bw), y: PX(y - 18),
        w: PX(bw), h: PX(40),
        fill: { color: C.butter }, line: { color: C.butter, width: 0 },
        rectRadius: 0.3,
      });
      s.addText("MOST BOOKED", {
        x: PX(x + cw - 28 - bw), y: PX(y - 18),
        w: PX(bw), h: PX(40),
        fontFace: F.mono, fontSize: 10,
        color: C.ink, bold: true, charSpacing: 2,
        align: "center", valign: "middle", margin: 0,
      });
    }

    addEyebrow(s, x + 32, y + 32, cw - 64, t.tier, tierC);
    s.addText(t.name, {
      x: PX(x + 32), y: PX(y + 60),
      w: PX(cw - 64), h: PX(70),
      fontFace: F.display, fontSize: 32,
      color: titleC, charSpacing: -0.5,
      margin: 0, valign: "top",
    });
    s.addText(t.subtitle, {
      x: PX(x + 32), y: PX(y + 130),
      w: PX(cw - 64), h: PX(24),
      fontFace: F.body, fontSize: 10,
      color: subtitleC, margin: 0, valign: "middle",
    });
    // Price
    s.addText([
      { text: t.price, options: { color: priceC, fontSize: 48 } },
      { text: "  / starting", options: { color: subtitleC, fontFace: F.mono, fontSize: 9 } },
    ], {
      x: PX(x + 32), y: PX(y + 170),
      w: PX(cw - 64), h: PX(70),
      fontFace: F.display, charSpacing: -1.5,
      margin: 0, valign: "middle",
    });
    // Separator
    s.addShape(pres.shapes.LINE, {
      x: PX(x + 32), y: PX(y + 260),
      w: PX(cw - 64), h: 0,
      line: { color: sepC, width: 0.75, transparency: t.featured || t.dark ? 0 : 85 },
    });
    // Features list
    const featRuns = t.features.map((f, idx) => ({
      text: f,
      options: { breakLine: idx < t.features.length - 1 },
    }));
    s.addText(featRuns, {
      x: PX(x + 32), y: PX(y + 280),
      w: PX(cw - 64), h: PX(cardsH - 300),
      fontFace: F.body, fontSize: 11,
      color: featC, margin: 0, valign: "top",
      paraSpaceAfter: 6, lineSpacingMultiple: 1.25,
    });
  });

  addFoot(s, "PRICES ARE STARTING POINTS · CUSTOM BUNDLES ON REQUEST", "07 / 10");
}

// ===================================================================
// SLIDE 8 — FLEXIBILITY
// ===================================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "07 · Flexibility");

  const top = 70 + 54 + 30;
  addEyebrow(s, 90, top, 1500, "Mix & match");
  s.addText([
    { text: "Don't see your fit?", options: { color: C.ink, breakLine: true } },
    { text: "We'll build it.",     options: { color: C.red } },
  ], {
    x: PX(90), y: PX(top + 30),
    w: PX(1500), h: PX(280),
    fontFace: F.display, fontSize: 48,
    charSpacing: -1.5, margin: 0, valign: "top",
    lineSpacingMultiple: 1.1,
  });

  // Left: axis rows
  const rowsY = top + 360;
  const leftX = 90;
  const leftW = 1000;
  const axes = [
    ["Duration",         "Single video → season-long"],
    ["Deal shape",       "Flat fee · Hybrid · CPA"],
    ["Creative control", "Brief → full script collab"],
    ["Exclusivity",      "Category lockouts 30–180d"],
    ["Asset reuse",      "Whitelisting & paid social"],
  ];
  const rowH = 80;
  axes.forEach((r, i) => {
    const y = rowsY + i * rowH;
    s.addText(r[0].toUpperCase(), {
      x: PX(leftX), y: PX(y + 16),
      w: PX(220), h: PX(30),
      fontFace: F.mono, fontSize: 9,
      color: C.muted, charSpacing: 2.5,
      margin: 0, valign: "middle",
    });
    s.addText(r[1], {
      x: PX(leftX + 244), y: PX(y + 10),
      w: PX(leftW - 244), h: PX(40),
      fontFace: F.display, fontSize: 18,
      color: C.ink, charSpacing: -0.5,
      margin: 0, valign: "middle",
    });
    // Bottom border
    if (i < axes.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: PX(leftX), y: PX(y + rowH - 2),
        w: PX(leftW), h: 0,
        line: { color: C.ink, width: 1.25 },
      });
    }
  });

  // Right: sample recipes card
  const rightX = 1120;
  const rightW = 710;
  const rightY = rowsY - 20;
  const rightH = 480;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(rightX), y: PX(rightY), w: PX(rightW), h: PX(rightH),
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    rectRadius: 0.15,
  });
  addEyebrow(s, rightX + 36, rightY + 36, rightW - 72, "Sample recipes", C.paperDim);

  const recipes = [
    { color: C.red,    title: "App Launch, Fast",   desc: "1 sponsored episode + 2 Shorts integrations + affiliate codes. 3-week run." },
    { color: C.butter, title: "Always-On Snack",    desc: "Monthly PPL + pinned comment + quarterly community post. 12-month retainer." },
    { color: C.mint,   title: "Tentpole Moment",    desc: "Full branded series (4 eps) + livestream sponsor + giveaway. 6-week run." },
  ];
  const recStart = rightY + 90;
  const recH = 130;
  recipes.forEach((r, i) => {
    const y = recStart + i * recH;
    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: PX(rightX + 36), y: PX(y + 4),
      w: PX(4), h: PX(100),
      fill: { color: r.color }, line: { color: r.color, width: 0 },
    });
    s.addText(r.title, {
      x: PX(rightX + 36 + 22), y: PX(y),
      w: PX(rightW - 72 - 22), h: PX(40),
      fontFace: F.display, fontSize: 18,
      color: C.paper, charSpacing: -0.5,
      margin: 0, valign: "middle",
    });
    s.addText(r.desc, {
      x: PX(rightX + 36 + 22), y: PX(y + 44),
      w: PX(rightW - 72 - 22), h: PX(70),
      fontFace: F.body, fontSize: 10,
      color: C.paperLt, margin: 0, valign: "top",
      lineSpacingMultiple: 1.5,
    });
  });

  addFoot(s, "IF YOU CAN WRITE IT ON A NAPKIN, WE CAN SHOOT IT.", "08 / 10");
}

// ===================================================================
// SLIDE 9 — PROOF
// ===================================================================
function slide9() {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  addTopBar(s, "08 · Proof");

  const top = 70 + 54 + 50;
  addEyebrow(s, 90, top, 1700, "What happens when brands show up");
  s.addText("Case in point.", {
    x: PX(90), y: PX(top + 30),
    w: PX(1700), h: PX(120),
    fontFace: F.display, fontSize: 56,
    color: C.ink, charSpacing: -1.5,
    margin: 0, valign: "top",
  });

  // Case-study hero block (dark bg, rounded)
  const heroY = top + 180;
  const heroH = 460;
  const heroX = 90;
  const heroW = 1920 - 180;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(heroX), y: PX(heroY), w: PX(heroW), h: PX(heroH),
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    rectRadius: 0.18,
  });
  // Split: left 1.2fr, right 1fr with 48px gap, padding 48
  const pad = 48;
  const innerW = heroW - 2 * pad - 48;
  const leftCw = innerW * (1.2 / 2.2);
  const rightCw = innerW * (1 / 2.2);
  const leftCx = heroX + pad;
  const rightCx = leftCx + leftCw + 48;

  // Left side
  s.addText("CASE STUDY · SNACK BRAND × FUN BITE", {
    x: PX(leftCx), y: PX(heroY + pad),
    w: PX(leftCw), h: PX(24),
    fontFace: F.mono, fontSize: 9,
    color: C.butter, charSpacing: 2.5,
    margin: 0, valign: "middle",
  });
  s.addText([
    { text: "\u201CA 90-second bit",     options: { breakLine: true } },
    { text: "moved more units", options: { breakLine: true } },
    { text: "than our whole",   options: { breakLine: true } },
    { text: "Q3 spend.\u201D" },
  ], {
    x: PX(leftCx), y: PX(heroY + pad + 40),
    w: PX(leftCw), h: PX(280),
    fontFace: F.display, fontSize: 26,
    color: C.paper, charSpacing: -0.5,
    margin: 0, valign: "top",
    lineSpacingMultiple: 1.2,
  });
  // Avatar blob + byline
  s.addShape(pres.shapes.OVAL, {
    x: PX(leftCx), y: PX(heroY + pad + 360),
    w: PX(46), h: PX(46),
    fill: { color: "3a342c" }, line: { color: "3a342c", width: 0 },
  });
  s.addText("Head of Growth", {
    x: PX(leftCx + 60), y: PX(heroY + pad + 358),
    w: PX(leftCw - 60), h: PX(28),
    fontFace: F.display, fontSize: 11,
    color: C.paper, margin: 0, valign: "middle",
  });
  s.addText("DTC SNACK BRAND · 2025 CAMPAIGN", {
    x: PX(leftCx + 60), y: PX(heroY + pad + 384),
    w: PX(leftCw - 60), h: PX(22),
    fontFace: F.mono, fontSize: 8,
    color: C.paperDim, charSpacing: 2.2,
    margin: 0, valign: "middle",
  });

  // Right side: 2x2 metric boxes
  const metrics = [
    { label: "Views, wk 1",      big: "2.4M",   bg: "1f1d18", labelC: C.paperDim, bigC: C.paper },
    { label: "Code redemptions", big: "31K",    bg: C.red,    labelC: "E8DED0", bigC: C.paper },
    { label: "ROAS",             big: "6.8×",   bg: C.butter, labelC: C.inkSoft,  bigC: C.ink },
    { label: "Sentiment",        big: "+94%",   bg: "1f1d18", labelC: C.paperDim, bigC: C.paper },
  ];
  const mGap = 20;
  const mW = (rightCw - mGap) / 2;
  const mH = (heroH - 2 * pad - mGap) / 2;
  metrics.forEach((m, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const mx = rightCx + col * (mW + mGap);
    const my = heroY + pad + row * (mH + mGap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(mx), y: PX(my), w: PX(mW), h: PX(mH),
      fill: { color: m.bg }, line: { color: m.bg, width: 0 },
      rectRadius: 0.1,
    });
    s.addText(m.label.toUpperCase(), {
      x: PX(mx + 28), y: PX(my + 28),
      w: PX(mW - 56), h: PX(24),
      fontFace: F.mono, fontSize: 9,
      color: m.labelC, charSpacing: 2.5,
      margin: 0, valign: "middle",
    });
    s.addText(m.big, {
      x: PX(mx + 28), y: PX(my + 56),
      w: PX(mW - 56), h: PX(mH - 70),
      fontFace: F.display, fontSize: 40,
      color: m.bigC, charSpacing: -1.5,
      margin: 0, valign: "middle",
    });
  });

  // Partner logo strip
  const stripY = heroY + heroH + 30;
  s.addText("PREVIOUSLY WORKED WITH:", {
    x: PX(90), y: PX(stripY),
    w: PX(260), h: PX(30),
    fontFace: F.mono, fontSize: 9,
    color: C.muted, charSpacing: 2.5,
    margin: 0, valign: "middle",
  });
  const chipW = 220, chipH = 38, chipGap = 14;
  for (let i = 0; i < 5; i++) {
    const cx = 90 + 300 + i * (chipW + chipGap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: PX(cx), y: PX(stripY - 4),
      w: PX(chipW), h: PX(chipH),
      fill: { color: C.paper },
      line: { color: C.muted, width: 0.75, dashType: "dash" },
      rectRadius: 0.4,
    });
    s.addText("[ PARTNER LOGO ]", {
      x: PX(cx), y: PX(stripY - 4),
      w: PX(chipW), h: PX(chipH),
      fontFace: F.mono, fontSize: 8,
      color: C.muted, charSpacing: 1.2,
      align: "center", valign: "middle", margin: 0,
    });
  }

  addFoot(s, "EXAMPLE METRICS · SHARE YOUR CAMPAIGN GOALS FOR TAILORED CASE REFERENCES", "09 / 10");
}

// ===================================================================
// SLIDE 10 — LET'S TALK
// ===================================================================
function slide10() {
  const s = pres.addSlide();
  s.background = { color: C.red };

  // Radial hotspots
  s.addShape(pres.shapes.OVAL, {
    x: PX(1920 * 0.9 - 450), y: PX(-300),
    w: PX(900), h: PX(600),
    fill: { color: C.butter, transparency: 65 },
    line: { color: C.butter, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: PX(-400), y: PX(1080 - 300),
    w: PX(800), h: PX(600),
    fill: { color: C.ink, transparency: 45 },
    line: { color: C.ink, width: 0 },
  });

  // Top bar (light mark on red)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: PX(90), y: PX(70), w: PX(38), h: PX(38),
    fill: { color: C.paper }, line: { color: C.paper, width: 0 },
    rectRadius: 0.07,
  });
  s.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: PX(90 + 13), y: PX(70 + 10),
    w: PX(17), h: PX(18),
    fill: { color: C.red }, line: { color: C.red, width: 0 },
    rotate: 90,
  });
  s.addText("Fun Bite", {
    x: PX(90 + 38 + 14), y: PX(70 - 2),
    w: PX(300), h: PX(42),
    fontFace: F.display, fontSize: 21, color: C.paper,
    margin: 0, valign: "middle",
  });
  s.addText("09 · LET'S TALK", {
    x: PX(1920 - 90 - 400), y: PX(70 + 4),
    w: PX(400), h: PX(28),
    fontFace: F.mono, fontSize: 11,
    color: "E8DED0", charSpacing: 2.2,
    align: "right", valign: "middle", margin: 0,
  });

  // Big line
  s.addText("READY WHEN YOU ARE", {
    x: PX(90), y: PX(200),
    w: PX(1920 - 180), h: PX(36),
    fontFace: F.mono, fontSize: 14,
    color: C.butter, charSpacing: 3.5,
    margin: 0, valign: "middle",
  });
  // "Let's make" — line 1 (solid paper)
  s.addText("Let's make", {
    x: PX(90), y: PX(260),
    w: PX(1920 - 180), h: PX(130),
    fontFace: F.display, fontSize: 72,
    color: C.paper, charSpacing: -1.5,
    margin: 0, valign: "top",
  });
  // "something" — line 2 (solid paper)
  s.addText("something", {
    x: PX(90), y: PX(400),
    w: PX(1920 - 180), h: PX(130),
    fontFace: F.display, fontSize: 72,
    color: C.paper, charSpacing: -1.5,
    margin: 0, valign: "top",
  });
  // "funny." — line 3 (outlined / hollow, emulating -webkit-text-stroke)
  s.addText("funny.", {
    x: PX(90), y: PX(540),
    w: PX(1920 - 180), h: PX(130),
    fontFace: F.display, fontSize: 72,
    color: C.red, // same as bg so the fill "disappears"
    outline: { size: 2, color: C.paper },
    charSpacing: -1.5,
    margin: 0, valign: "top",
  });

  // Contact row
  const contactY = 1080 - 140 - 160;
  // Top border
  s.addShape(pres.shapes.LINE, {
    x: PX(90), y: PX(contactY),
    w: PX(1920 - 180), h: 0,
    line: { color: "FFFFFF", width: 0.75, transparency: 65 },
  });
  const contacts = [
    { label: "Partnerships",     big: ["partners@", "funbite.tv"] },
    { label: "Book a call",      big: ["cal.com/",   "funbite"] },
    { label: "Typical response", big: ["within",     "24 hours"] },
  ];
  const colW = (1920 - 180) / 3;
  contacts.forEach((c, i) => {
    const cx = 90 + i * colW;
    s.addText(c.label.toUpperCase(), {
      x: PX(cx), y: PX(contactY + 40),
      w: PX(colW - 40), h: PX(28),
      fontFace: F.mono, fontSize: 9,
      color: "E8DED0", charSpacing: 3,
      margin: 0, valign: "middle",
    });
    s.addText([
      { text: c.big[0], options: { breakLine: true } },
      { text: c.big[1] },
    ], {
      x: PX(cx), y: PX(contactY + 72),
      w: PX(colW - 40), h: PX(110),
      fontFace: F.display, fontSize: 22,
      color: C.paper, charSpacing: -0.5,
      margin: 0, valign: "top",
      lineSpacingMultiple: 1.2,
    });
  });

  // Footer
  s.addText("THANK YOU · FUN BITE 2026 MEDIA KIT", {
    x: PX(90), y: PX(1080 - 66),
    w: PX(1200), h: PX(22),
    fontFace: F.mono, fontSize: 10,
    color: "E8DED0", charSpacing: 2.2,
    margin: 0, valign: "middle",
  });
  s.addText("10 / 10", {
    x: PX(1920 - 90 - 200), y: PX(1080 - 66),
    w: PX(200), h: PX(22),
    fontFace: F.mono, fontSize: 10,
    color: "E8DED0", charSpacing: 2.2,
    align: "right", margin: 0, valign: "middle",
  });
}

// ===================================================================
// Build & write
// ===================================================================
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

pres.writeFile({ fileName: "Fun_Bite_Advertising_Deck.pptx" })
  .then(f => console.log("WROTE:", f));
