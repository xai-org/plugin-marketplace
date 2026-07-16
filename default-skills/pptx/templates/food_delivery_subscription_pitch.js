/**
 * K-Bops Deck → PPTX (pptxgenjs)
 *
 * Recreates the 10-slide K-Bops kimbap subscription deck from K-Bops_Deck.html
 * as a native .pptx file. Canvas is 1920×1080 (design) mapped to a 19.20 × 10.80
 * inch custom PowerPoint layout — 1" = 100px. Every px/pt value in the HTML is
 * divided by 100 to get inches, and font-sizes are scaled px → pt via × 0.75.
 *
 * Fonts preserved exactly as authored: "Bricolage Grotesque", "DM Mono",
 * "Fraunces". The user confirmed they have these installed locally.
 *
 * Usage:  node kbops-deck.js  → writes K-Bops_Deck.pptx in cwd.
 */

const pptxgen = require("pptxgenjs");

// ── Palette ──────────────────────────────────────────────────────────────
// OKLCH values in the source resolved to sRGB hex:
const C = {
  paper:   "F5EFE4",
  ink:     "151413",
  inkSoft: "2A2724",
  kimchi:  "E24A3F",   // oklch(0.62 0.19 28)
  nori:    "137D41",   // oklch(0.52 0.13 152)
  dan:     "ECBF00",   // oklch(0.82 0.17 92)
  sky:     "43B2E1",   // oklch(0.72 0.12 230)
  // muted/tint backgrounds used by the photo placeholders
  photoBg: "E8DFCE",
  photoHot:   "F2D8C4",
  photoFresh: "D9E4CF",
  photoMild:  "F2E8C4",
  photoCool:  "D0DEE4",
  photoPink:  "E8D5DD",
  step2Bg:    "E8DFCE",
};

// ── Fonts (DO NOT CHANGE — user has these installed) ─────────────────────
const F = {
  sans:  "Bricolage Grotesque",
  mono:  "DM Mono",
  serif: "Fraunces",
};

// ── Geometry helpers: px → inches (1" = 96px, the CSS default) ──────────
// At 96 DPI: px → inches = px/96, and px → points = px × 0.75.
const px  = (v) => v / 96;
const pt  = (v) => v * 0.75;          // px → pt for font sizes

// Slide size
const W = 1920, H = 1080;
const SW = px(W), SH = px(H);

// Outer "frame" inset — most slides use inset:50px 60px 40px (top, R/L, bottom)
// except s-cover which uses inset:50px (all sides)
const FRAME = { top: px(50), side: px(60), bottom: px(40) };
const COVER_FRAME = { top: px(50), side: px(50), bottom: px(50) };

// ── Init ─────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.title  = "K-Bops — Lunch Subscription";
pres.author = "K-Bops";
pres.defineLayout({ name: "KBOPS_1920", width: SW, height: SH });
pres.layout = "KBOPS_1920";

// ── Tiny helpers for the repeated chrome ─────────────────────────────────

// Logo mark: rotated-ish circle with "K". We render a circle + letter.
// Author rotation is -6deg; pptxgen supports rotate on shapes via `rotate`.
function addLogoMark(slide, { x, y, d = 0.36, bg = C.kimchi, fg = C.paper }) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: d, h: d,
    fill: { color: bg }, line: { color: bg, width: 0 },
    rotate: -6,
  });
  slide.addText("K", {
    x, y, w: d, h: d,
    fontFace: F.sans, fontSize: pt(18), bold: true,
    color: fg, align: "center", valign: "middle",
    margin: 0, rotate: -6,
  });
}

// Horizontal divider line (1.5px weight in HTML → ~1pt)
function addHRule(slide, { x, y, w, color = C.ink }) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width: 1.1 },
  });
}

// Vertical divider line
function addVRule(slide, { x, y, h, color = C.ink }) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w: 0, h,
    line: { color, width: 1.1 },
  });
}

// Thin rectangular border (1.5px) that contains nothing — used for cards.
function addBorderedRect(slide, opts) {
  const { x, y, w, h, fill = C.paper, stroke = C.ink } = opts;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill },
    line: { color: stroke, width: 1.1 },
  });
}

// Diagonal-hatch photo placeholder: solid tinted fill + a bottom-left caption
// label + an optional top-right dark corner tag.
function addPhoto(slide, { x, y, w, h, bg = C.photoBg, label, corner, hasBorder = true, darkCaption = false }) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: bg },
    line: hasBorder ? { color: C.ink, width: 1.1 } : { type: "none" },
  });
  // Subtle diagonal "shot" texture, evoked by a thin diagonal line.
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h,
    line: { color: C.ink, width: 0.5, transparency: 90 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + w * 0.35, y, w: w * 0.65, h,
    line: { color: C.ink, width: 0.5, transparency: 92 },
  });
  if (label) {
    slide.addText(label, {
      x: x + 0.14, y: y + h - 0.34, w: w - 0.28, h: 0.28,
      fontFace: F.mono, fontSize: pt(13),
      color: darkCaption ? C.ink : C.ink, transparency: 30,
      charSpacing: 1.3,
      align: "left", valign: "middle", margin: 0,
    });
  }
  if (corner) {
    const cw = 0.28, ch = 0.22;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + w - cw - 0.14, y: y + 0.14, w: cw, h: ch,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
    slide.addText(corner, {
      x: x + w - cw - 0.14, y: y + 0.14, w: cw, h: ch,
      fontFace: F.mono, fontSize: pt(12), color: C.paper,
      align: "center", valign: "middle", margin: 0, charSpacing: 1,
    });
  }
}

// Topbar: brand on left, section on right, with 1.5px underline.
function addTopbar(slide, {
  sectionText,
  brandText = "K-Bops",
  dark = false,                // dark = on kimchi/nori/dan cover; invert colors
  logoBg = null,
  logoFg = null,
  frame = FRAME,
}) {
  const color = dark ? C.paper : C.ink;
  const lineColor = dark ? C.paper : C.ink;
  const y = frame.top;
  const left = frame.side;
  const right = SW - frame.side;
  // Logo mark
  const lbg = logoBg || (dark ? C.paper : C.kimchi);
  const lfg = logoFg || (dark ? C.kimchi : C.paper);
  addLogoMark(slide, { x: left, y: y - 0.02, d: 0.36, bg: lbg, fg: lfg });
  // Brand text
  slide.addText(brandText, {
    x: left + 0.52, y, w: 4.0, h: 0.36,
    fontFace: F.mono, fontSize: pt(16), bold: true,
    color, charSpacing: 2,
    align: "left", valign: "middle", margin: 0,
  });
  // Section / issue on right
  slide.addText(sectionText, {
    x: right - 5.5, y, w: 5.5, h: 0.36,
    fontFace: F.mono, fontSize: pt(16),
    color, charSpacing: 2,
    align: "right", valign: "middle", margin: 0,
  });
  // Underline — 22px below the bar in the HTML (padding-bottom:22px)
  addHRule(slide, {
    x: left, y: y + 0.58, w: right - left, color: lineColor,
  });
}

// Footbar
function addFootbar(slide, { left, middle, right, dark = false, frame = FRAME }) {
  const color = dark ? C.paper : C.ink;
  const y = SH - frame.bottom - 0.34;
  const x1 = frame.side, x2 = SW - frame.side;
  addHRule(slide, { x: x1, y: y - 0.2, w: x2 - x1, color });
  const boxOpts = (align) => ({
    fontFace: F.mono, fontSize: pt(14), color, charSpacing: 2,
    align, valign: "top", margin: 0,
  });
  slide.addText(left,   { x: x1,                y, w: (x2 - x1) / 3,       h: 0.34, ...boxOpts("left") });
  slide.addText(middle, { x: x1 + (x2-x1)/3,    y, w: (x2 - x1) / 3,       h: 0.34, ...boxOpts("center") });
  slide.addText(right,  { x: x1 + 2*(x2-x1)/3,  y, w: (x2 - x1) / 3,       h: 0.34, ...boxOpts("right") });
}

// "chip" — small pill with uppercase mono label inside a rounded rectangle
function addChip(slide, { x, y, w, h, text, fg = C.ink, bg = C.paper, stroke = C.ink }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: h / 2,
    fill: { color: bg }, line: { color: stroke, width: 1.1 },
  });
  slide.addText(text, {
    x, y, w, h,
    fontFace: F.mono, fontSize: pt(13), color: fg,
    align: "center", valign: "middle", margin: 0, charSpacing: 1.5,
  });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 1 — COVER (background: kimchi red-orange)
// ═════════════════════════════════════════════════════════════════════════
function buildCover() {
  const s = pres.addSlide();
  s.background = { color: C.kimchi };

  addTopbar(s, {
    sectionText: "ISSUE № 01 · SPRING 2026 · SAN FRANCISCO",
    brandText:   "K-BOPS — KIMBAP CO.",
    dark: true,
    logoBg: C.paper, logoFg: C.kimchi,
    frame: COVER_FRAME,
  });

  // ── Left: giant title ────────────────────────────────────────────────
  // "Lunch, / delivered." — "delivered." is Fraunces italic in dan (yellow).
  // HTML: font-size: 320px (240pt), line-height: 0.82, so line box ≈ 262px
  // (2.73 inches). Make title boxes nice and tall to prevent clipping.
  const titleX = COVER_FRAME.side;
  const titleY = COVER_FRAME.top + px(180);   // leaves room for topbar + gap

  const titleSize = pt(260);  // 320px is visually too big on PPT; dial down a hair
  const lineStepIn = px(245); // line-height ~0.82 → ~262px; use 245 for tight stack

  s.addText("Lunch,", {
    x: titleX, y: titleY, w: px(1200), h: lineStepIn + px(40),
    fontFace: F.sans, fontSize: titleSize, bold: true,
    color: C.paper, align: "left", valign: "top",
    margin: 0, charSpacing: -6,
  });
  s.addText("delivered.", {
    x: titleX, y: titleY + lineStepIn, w: px(1250), h: lineStepIn + px(80),
    fontFace: F.serif, italic: true, fontSize: titleSize,
    color: C.dan, align: "left", valign: "top",
    margin: 0, charSpacing: -6,
  });

  // ── Subtitle mono
  s.addText(
    "A DAILY KIMBAP SUBSCRIPTION FOR\nANYWHERE IN SAN FRANCISCO.\nFREE LUNCHTIME DELIVERY — EVERY WEEKDAY.",
    {
      x: titleX, y: titleY + lineStepIn * 2 + px(30),
      w: px(800), h: px(150),
      fontFace: F.mono, fontSize: pt(22),
      color: C.paper, align: "left", valign: "top",
      paraSpaceAfter: 2, margin: 0, charSpacing: 1.5,
    }
  );

  // ── Right column ─────────────────────────────────────────────────────
  // "New → Monthly Subscription" tag (rotated -3deg), paper bg, ink text
  const tagW = 3.2, tagH = 0.82;
  const tagX = SW - COVER_FRAME.side - tagW;
  const tagY = COVER_FRAME.top + 1.2;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tagX, y: tagY, w: tagW, h: tagH,
    fill: { color: C.paper }, line: { color: C.paper, width: 0 },
    rotate: -3,
  });
  s.addText("NEW → MONTHLY\nSUBSCRIPTION", {
    x: tagX, y: tagY, w: tagW, h: tagH,
    fontFace: F.mono, fontSize: pt(15), color: C.ink,
    align: "right", valign: "middle", margin: 0.16,
    charSpacing: 1.5, rotate: -3,
  });

  // ── Hero circular photo placeholder (560×560, rotate 6°) ────────────
  const circleD = 5.6;
  const circleX = SW - COVER_FRAME.side - circleD - 0.2;
  const circleY = SH - COVER_FRAME.bottom - circleD - 0.9;

  s.addShape(pres.shapes.OVAL, {
    x: circleX, y: circleY, w: circleD, h: circleD,
    fill: { color: C.photoBg },
    line: { color: C.paper, width: 1.3 },
    rotate: 6,
  });
  // photo label bottom-left (keep unrotated for readability)
  s.addText("HERO KIMBAP — TOP DOWN", {
    x: circleX + 0.6, y: circleY + circleD - 0.9, w: circleD - 1.2, h: 0.3,
    fontFace: F.mono, fontSize: pt(12), color: C.ink, transparency: 25,
    align: "center", valign: "middle", margin: 0, charSpacing: 1, inset: 0,
  });
  // corner badge "01"
  const cbW = 0.36, cbH = 0.26;
  s.addShape(pres.shapes.RECTANGLE, {
    x: circleX + circleD - 1.05, y: circleY + 0.75, w: cbW, h: cbH,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    rotate: 6,
  });
  s.addText("01", {
    x: circleX + circleD - 1.05, y: circleY + 0.75, w: cbW, h: cbH,
    fontFace: F.mono, fontSize: pt(12), color: C.paper,
    align: "center", valign: "middle", margin: 0, charSpacing: 1,
    rotate: 6,
  });

  addFootbar(s, {
    left: "KBOPS.COM",
    middle: "→ SWIPE FOR THE GOODS",
    right: "EST. 2023",
    dark: true,
    frame: COVER_FRAME,
  });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 2 — THE PITCH
// ═════════════════════════════════════════════════════════════════════════
function buildPitch() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 02 · THE PITCH" });

  const left = FRAME.side;
  const right = SW - FRAME.side;

  // Eyebrow
  s.addText("// PROBLEM, MEET SOLUTION", {
    x: left, y: px(130), w: 10, h: 0.5,
    fontFace: F.mono, fontSize: pt(20), color: C.kimchi,
    charSpacing: 3, align: "left", valign: "middle", margin: 0,
  });

  // Big head — 170px / 127.5pt, weight 700, spans three lines (third wraps to 2)
  // HTML line-height 0.9 → line box ≈ 153px → 1.59 inches
  const headY = px(130);  // just below eyebrow
  const lineH = px(155);  // 0.9 line-height of 170px
  const bigOpts = {
    fontFace: F.sans, fontSize: pt(170), bold: true,
    color: C.ink, align: "left", valign: "top", margin: 0,
    charSpacing: -3,
  };
  s.addText("Skip the line.",     { x: left, y: headY + 0*lineH, w: right-left, h: lineH + px(40), ...bigOpts });
  s.addText("Skip the app fees.", { x: left, y: headY + 1*lineH, w: right-left, h: lineH + px(40), ...bigOpts });

  // Third line: "Skip the " + serif-italic "sad desk salad." in nori green
  // This line is long enough to wrap to TWO visual lines, so allocate 2× height.
  s.addText([
    { text: "Skip the ", options: {
        fontFace: F.sans, fontSize: pt(170), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "sad desk salad.", options: {
        fontFace: F.sans, fontSize: pt(170), bold: true,
        color: C.ink, charSpacing: -3,
        italic: true, fontFace: F.serif, color: C.nori,
    }},
  ], {
    x: left, y: headY + 2*lineH, w: right-left, h: lineH * 2 + px(40),
    align: "left", valign: "top", margin: 0,
  });

  // Subhead (left) + arrow indicator (right) — now pushed down by 2 lines of head
  const metaY = headY + 4*lineH + px(140);
  s.addText(
    "One subscription. One hand-rolled kimbap, on your desk by noon. " +
    "Every weekday you want it — from the Presidio to Potrero.",
    {
      x: left, y: metaY, w: px(720), h: px(140),
      fontFace: F.sans, fontSize: pt(26), color: C.inkSoft,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );
  // Arrow — "KEEP SCROLLING" followed by a dash
  s.addText("KEEP SCROLLING", {
    x: right - px(360), y: metaY + px(60), w: px(280), h: px(36),
    fontFace: F.mono, fontSize: pt(18), color: C.ink,
    charSpacing: 2, align: "right", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: right - px(80), y: metaY + px(78), w: px(80), h: 0,
    line: { color: C.ink, width: 1.1 },
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "02 / 10", right: "KBOPS.COM" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 3 — WHAT YOU GET
// ═════════════════════════════════════════════════════════════════════════
function buildWhat() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 03 · WHAT'S INCLUDED" });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const topY = FRAME.top + 1.1;
  const colGap = 0.4;
  const colW = (right - left - colGap) / 2;

  // ── Left column: big head + body copy
  // "The whole [roll.]"  — roll. is serif-italic in kimchi
  // 140px × line-height 0.88 = 123px per line → 2 lines = 256px + descender
  s.addText([
    { text: "The whole ", options: {
        fontFace: F.sans, fontSize: pt(140), bold: true,
        color: C.ink, charSpacing: -3, breakLine: true,
    }},
    { text: "roll.", options: {
        fontFace: F.serif, italic: true, fontSize: pt(140),
        color: C.kimchi, charSpacing: -3,
    }},
  ], {
    x: left, y: topY, w: colW, h: px(330),
    align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "Every K-Bops subscription comes with the stuff that makes lunch actually " +
    "worth looking forward to. No hidden fees, no surge pricing, no sad bowls.",
    {
      x: left, y: topY + px(350), w: colW - 0.4, h: px(160),
      fontFace: F.sans, fontSize: pt(24), color: C.inkSoft,
      align: "left", valign: "top", margin: 0,
    }
  );

  // ── Right column: 5-item list with dividers, number code, icon badge
  const items = [
    { code: "A1", title: "Free weekday delivery",
      body: "Anywhere in San Francisco, 11:00 AM – 1:30 PM. No minimum.",
      badgeBg: C.kimchi, badgeFg: C.paper, badgeMark: "✓" },
    { code: "A2", title: "Rotating daily menu",
      body: "Eight signature rolls. A new pick every day, or set it and forget it.",
      badgeBg: C.nori, badgeFg: C.paper, badgeMark: "✓" },
    { code: "A3", title: "Rolled the morning-of",
      body: "Always under 3 hours old when it hits your desk. That's it. That's the rule.",
      badgeBg: C.dan, badgeFg: C.ink, badgeMark: "✓" },
    { code: "A4", title: "Pause anytime",
      body: "Vacation? Out of office? Skip a day or a whole week in two taps.",
      badgeBg: C.sky, badgeFg: C.ink, badgeMark: "✓" },
    { code: "A5", title: "Members-only drops",
      body: "First dibs on seasonal rolls, collabs, and the occasional free banchan.",
      badgeBg: C.ink, badgeFg: C.dan, badgeMark: "★" },
  ];

  const listX = left + colW + colGap;
  const listY = topY;
  const listH = SH - FRAME.bottom - 0.8 - listY;   // room for footbar
  const rowH = listH / items.length;
  const numW = 0.72, badgeD = 0.5;

  // top border of list
  addHRule(s, { x: listX, y: listY, w: colW });
  items.forEach((it, i) => {
    const y = listY + i * rowH;
    // code (left)
    s.addText(it.code, {
      x: listX + 0.05, y: y + 0.1, w: numW, h: rowH - 0.2,
      fontFace: F.mono, fontSize: pt(18), color: C.ink,
      align: "left", valign: "middle", margin: 0, charSpacing: 1.2,
    });
    // title
    s.addText(it.title, {
      x: listX + numW + 0.1, y: y + 0.15, w: colW - numW - badgeD - 0.4, h: 0.6,
      fontFace: F.sans, fontSize: pt(34), bold: true, color: C.ink,
      align: "left", valign: "top", margin: 0, charSpacing: -0.5,
    });
    // body
    s.addText(it.body, {
      x: listX + numW + 0.1, y: y + 0.7, w: colW - numW - badgeD - 0.4, h: rowH - 0.85,
      fontFace: F.sans, fontSize: pt(18), color: C.inkSoft,
      align: "left", valign: "top", margin: 0,
    });
    // badge — colored circle with mark
    const bx = listX + colW - badgeD - 0.05;
    const by = y + rowH / 2 - badgeD / 2;
    s.addShape(pres.shapes.OVAL, {
      x: bx, y: by, w: badgeD, h: badgeD,
      fill: { color: it.badgeBg }, line: { color: it.badgeBg, width: 0 },
    });
    s.addText(it.badgeMark, {
      x: bx, y: by, w: badgeD, h: badgeD,
      fontFace: F.mono, fontSize: pt(16), color: it.badgeFg,
      align: "center", valign: "middle", margin: 0, bold: it.badgeMark === "★",
    });
    // bottom rule for each row except the last
    if (i < items.length - 1) {
      addHRule(s, { x: listX, y: y + rowH, w: colW });
    }
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "03 / 10", right: "KBOPS.COM" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 4 — MENU (8 cards, 4×2 grid; 1 of them can be "featured" dan)
// The HTML has 8 photo cards in plain grid — no .feat card is actually
// used in the DOM. Render 8 photo cards as authored.
// ═════════════════════════════════════════════════════════════════════════
function buildMenu() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 04 · THE MENU" });

  const left = FRAME.side;
  const right = SW - FRAME.side;

  // ── Head row ─────────────────────────────────────────────────────────
  // "Eight [rolls.] / Zero dull days." (rolls is serif-italic nori)
  // 160px × line-height 0.85 = 136px/line → 2 lines ≈ 272px
  const headY = FRAME.top + px(120);

  s.addText([
    { text: "Eight ", options: {
        fontFace: F.sans, fontSize: pt(140), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "rolls.", options: {
        fontFace: F.serif, italic: true, fontSize: pt(140),
        color: C.nori, charSpacing: -3, breakLine: true,
    }},
    { text: "Zero dull days.", options: {
        fontFace: F.sans, fontSize: pt(140), bold: true,
        color: C.ink, charSpacing: -3,
    }},
  ], {
    x: left, y: headY, w: px(1200), h: px(340),
    align: "left", valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Right-side note — position independently so it doesn't wrap
  s.addText(
    "ALL ROLLED FRESH. GLUTEN-FREE\nRICE ON REQUEST. VEGAN PICK\nALWAYS AVAILABLE.",
    {
      x: right - px(460), y: headY + px(220), w: px(460), h: px(90),
      fontFace: F.mono, fontSize: pt(16), color: C.ink,
      charSpacing: 2, align: "right", valign: "bottom", margin: 0,
    }
  );

  // ── Grid: 4 columns × 2 rows ─────────────────────────────────────────
  // Labels kept short so they don't truncate in the narrow card width.
  const cards = [
    { name: "Original", num: "№ 01", tag: "CLASSIC",    label: "ORIGINAL",  bg: C.photoHot },
    { name: "Tuna",     num: "№ 02", tag: "SPICY",      label: "TUNA",      bg: C.photoCool },
    { name: "Bulgogi",  num: "№ 03", tag: "SIGNATURE",  label: "BULGOGI",   bg: C.photoHot },
    { name: "Cheese",   num: "№ 04", tag: "COMFORT",    label: "CHEESE",    bg: C.photoMild },
    { name: "Vegan",    num: "№ 05", tag: "PLANT",      label: "VEGAN",     bg: C.photoFresh },
    { name: "Taco",     num: "№ 06", tag: "SF MASHUP",  label: "TACO",      bg: C.photoHot },
    { name: "Steak",    num: "№ 07", tag: "PREMIUM",    label: "STEAK",     bg: C.photoMild },
    { name: "Avocado",  num: "№ 08", tag: "FRESH",      label: "AVOCADO",   bg: C.photoFresh },
  ];

  const gridTop = headY + px(420);
  const gridBot = SH - FRAME.bottom - px(80);
  const gridGap = px(20);
  const gridW = right - left;
  const gridH = gridBot - gridTop;
  const cols = 4, rows = 2;
  const cardW = (gridW - gridGap * (cols - 1)) / cols;
  const cardH = (gridH - gridGap * (rows - 1)) / rows;
  const metaH = px(64);
  const photoH = cardH - metaH;

  cards.forEach((c, i) => {
    const cx = left + (i % cols) * (cardW + gridGap);
    const cy = gridTop + Math.floor(i / cols) * (cardH + gridGap);

    // Outer card border
    addBorderedRect(s, { x: cx, y: cy, w: cardW, h: cardH, fill: C.paper });
    // Photo area (no own border — parent handles) with bottom divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: photoH,
      fill: { color: c.bg }, line: { color: C.ink, width: 0 },
    });
    addHRule(s, { x: cx, y: cy + photoH, w: cardW });
    // Tag pill at top-left
    const tagW = Math.max(px(90), c.tag.length * px(14));
    const tagH = px(30);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + px(14), y: cy + px(14), w: tagW, h: tagH,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
    s.addText(c.tag, {
      x: cx + px(14), y: cy + px(14), w: tagW, h: tagH,
      fontFace: F.mono, fontSize: pt(11), color: C.paper,
      align: "center", valign: "middle", margin: 0, charSpacing: 1, inset: 0,
    });
    // Photo label bottom-left — smaller font so it fits in card width
    s.addText(c.label, {
      x: cx + px(14), y: cy + photoH - px(32), w: cardW - px(20), h: px(28),
      fontFace: F.mono, fontSize: pt(11), color: C.ink, transparency: 30,
      align: "left", valign: "middle", margin: 0, charSpacing: 0, inset: 0,
    });
    // Meta row: name left, num right
    s.addText(c.name, {
      x: cx + px(16), y: cy + photoH + px(4), w: cardW - px(100), h: metaH - px(8),
      fontFace: F.sans, fontSize: pt(24), bold: true, color: C.ink,
      align: "left", valign: "middle", margin: 0, charSpacing: -0.3, inset: 0,
    });
    s.addText(c.num, {
      x: cx + cardW - px(95), y: cy + photoH + px(4), w: px(80), h: metaH - px(8),
      fontFace: F.mono, fontSize: pt(12), color: C.ink, transparency: 40,
      align: "right", valign: "middle", margin: 0, charSpacing: 0.8, inset: 0,
    });
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "04 / 10", right: "+ SEASONAL ROTATIONS" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 5 — HOW IT WORKS  (3 steps with big italic numerals)
// ═════════════════════════════════════════════════════════════════════════
function buildHow() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 05 · HOW IT WORKS" });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const headY = FRAME.top + px(110);

  // Headline: "Three steps. [That's it.]" (That's it. is serif-italic kimchi)
  // 160px × 0.85 = 136px per line. Single line + descender ~ 180px
  s.addText([
    { text: "Three steps. ", options: {
        fontFace: F.sans, fontSize: pt(160), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "That's it.", options: {
        fontFace: F.serif, italic: true, fontSize: pt(160),
        color: C.kimchi, charSpacing: -3,
    }},
  ], {
    x: left, y: headY, w: right - left, h: px(200),
    align: "left", valign: "top", margin: 0,
  });

  // Sub
  s.addText("From sign-up to first bite in less than two minutes.", {
    x: left, y: headY + px(210), w: 12, h: px(60),
    fontFace: F.sans, fontSize: pt(24), color: C.inkSoft,
    align: "left", valign: "top", margin: 0,
  });

  // Three step cards
  const steps = [
    { n: "1", tag: "SIGN UP",    h: "Subscribe online or in-app.",
      body: "Pick a plan. Set your delivery address and a default favorite — or leave it on surprise me.",
      bg: C.paper, fg: C.ink, numColor: C.kimchi, tagBg: C.ink, tagFg: C.paper },
    { n: "2", tag: "CUSTOMIZE",  h: "Tell us the day's pick by 10 AM.",
      body: "Swap tomorrow's roll, add banchan, or pause the week — all from the K-Bops app.",
      bg: C.step2Bg, fg: C.ink, numColor: C.kimchi, tagBg: C.ink, tagFg: C.paper },
    { n: "3", tag: "EAT",        h: "Lunch at your desk by noon.",
      body: "Rolled fresh that morning. Delivered free in a 15-minute window you pick.",
      bg: C.ink, fg: C.paper, numColor: C.dan, tagBg: C.dan, tagFg: C.ink },
  ];

  const stepsY = headY + px(330);
  const stepsBot = SH - FRAME.bottom - px(80);
  const gap = px(24);
  const cardW = (right - left - gap * 2) / 3;
  const cardH = stepsBot - stepsY;
  const pad = px(32);

  steps.forEach((st, i) => {
    const cx = left + i * (cardW + gap);
    const cy = stepsY;
    // card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: st.bg }, line: { color: C.ink, width: 1.1 },
    });
    // tag (top-right)
    const tw = Math.max(px(90), st.tag.length * px(14));
    const th = px(32);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + cardW - tw - pad, y: cy + pad, w: tw, h: th,
      fill: { color: st.tagBg }, line: { color: st.tagBg, width: 0 },
    });
    s.addText(st.tag, {
      x: cx + cardW - tw - pad, y: cy + pad, w: tw, h: th,
      fontFace: F.mono, fontSize: pt(13), color: st.tagFg,
      align: "center", valign: "middle", margin: 0, charSpacing: 1.2,
    });
    // Big italic numeral — 200px/150pt; line-height 1 → 200px = 2.08"
    s.addText(st.n, {
      x: cx + pad, y: cy + pad + px(20), w: cardW - 2 * pad, h: px(230),
      fontFace: F.serif, italic: true, fontSize: pt(200),
      color: st.numColor, align: "left", valign: "top", margin: 0,
      charSpacing: -6,
    });
    // Step title — 40px/30pt, up to 2 lines
    s.addText(st.h, {
      x: cx + pad, y: cy + pad + px(280), w: cardW - 2 * pad, h: px(120),
      fontFace: F.sans, fontSize: pt(40), bold: true, color: st.fg,
      align: "left", valign: "top", margin: 0, charSpacing: -0.5,
    });
    // Body — clamp to a positive height to avoid negative cy in XML
    const bodyY = cy + pad + px(420);
    const bodyH = Math.max(px(80), cy + cardH - pad - bodyY);
    s.addText(st.body, {
      x: cx + pad, y: bodyY, w: cardW - 2 * pad, h: bodyH,
      fontFace: F.sans, fontSize: pt(18), color: st.fg, transparency: 15,
      align: "left", valign: "top", margin: 0,
    });
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "05 / 10", right: "KBOPS.COM" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 6 — DELIVERY AREA
// ═════════════════════════════════════════════════════════════════════════
function buildArea() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 06 · DELIVERY AREA" });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const topY = FRAME.top + px(110);
  const colGap = px(60);
  const colW = (right - left - colGap) / 2;

  // ── Left: head + body + big stat + neighborhoods
  // 100pt chosen so "Every weekday." fits within colW without wrapping
  s.addText([
    { text: "All of ", options: {
        fontFace: F.sans, fontSize: pt(100), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "SF.", options: {
        fontFace: F.serif, italic: true, fontSize: pt(100),
        color: C.sky, charSpacing: -3, breakLine: true,
    }},
    { text: "Every weekday.", options: {
        fontFace: F.sans, fontSize: pt(100), bold: true,
        color: C.ink, charSpacing: -3,
    }},
  ], {
    x: left, y: topY, w: colW, h: px(240),
    align: "left", valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  s.addText(
    "From the Sunset to SoMa, Marina to Mission Bay — if it's in the 7×7, " +
    "we roll to it. No zone fees, no minimums, no exceptions.",
    {
      x: left, y: topY + px(250), w: colW - px(20), h: px(120),
      fontFace: F.sans, fontSize: pt(22), color: C.inkSoft,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Big stat "7 × 7 mi²" — 120px serif italic, line-height 1
  s.addText("7 × 7 mi²", {
    x: left, y: topY + px(390), w: colW, h: px(150),
    fontFace: F.serif, italic: true, fontSize: pt(120),
    color: C.kimchi, align: "left", valign: "top",
    margin: 0, charSpacing: -3,
  });
  s.addText("Covered, end to end.", {
    x: left, y: topY + px(540), w: colW, h: px(45),
    fontFace: F.sans, fontSize: pt(22), color: C.inkSoft,
    align: "left", valign: "top", margin: 0,
  });

  // Neighborhood chips — confined to left column
  const hoods = [
    "SOMA","FIDI","MISSION","HAYES VALLEY","MARINA","PRESIDIO",
    "RICHMOND","SUNSET","CASTRO","NOE","POTRERO","DOGPATCH",
    "NORTH BEACH","BAYVIEW","+ MORE",
  ];
  let hx = left, hy = topY + px(605);
  const hoodH = px(32), hoodGap = px(8), rowGap = px(10);
  const maxHoodX = left + colW;
  hoods.forEach((h) => {
    // Width roughly: 16px horizontal padding + text width (char * 7.5pt × 0.55")
    const w = px(24) + h.length * px(9);
    if (hx + w > maxHoodX) {
      hx = left;
      hy += hoodH + rowGap;
    }
    addChip(s, {
      x: hx, y: hy, w, h: hoodH, text: h,
    });
    hx += w + hoodGap;
  });

  // ── Right: map placeholder
  const mapX = left + colW + colGap;
  const mapY = topY;
  const mapW = colW;
  const mapH = (SH - FRAME.bottom - px(80)) - mapY;
  addPhoto(s, {
    x: mapX, y: mapY, w: mapW, h: mapH,
    bg: C.photoBg,
    label: "SF MAP / DELIVERY ZONES — DROP REAL MAP HERE",
    corner: "MAP",
  });

  // Small decorative pins & K-Bops HQ marker, loosely placed
  const pin = (x, y) => s.addShape(pres.shapes.OVAL, {
    x: mapX + x - px(9), y: mapY + y - px(9), w: px(18), h: px(18),
    fill: { color: C.kimchi }, line: { color: C.paper, width: 1.5 },
  });
  pin(mapW * 0.25, mapH * 0.35);
  pin(mapW * 0.55, mapH * 0.5);
  pin(mapW * 0.72, mapH * 0.42);
  pin(mapW * 0.4, mapH * 0.68);
  pin(mapW * 0.68, mapH * 0.72);
  // K-Bops HQ (bigger dark)
  const hqX = mapX + mapW * 0.5 - px(28);
  const hqY = mapY + mapH * 0.55 - px(28);
  s.addShape(pres.shapes.OVAL, {
    x: hqX, y: hqY, w: px(56), h: px(56),
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  s.addText("K-BOPS", {
    x: hqX, y: hqY, w: px(56), h: px(56),
    fontFace: F.sans, fontSize: pt(14), bold: true,
    color: C.dan, align: "center", valign: "middle", margin: 0, charSpacing: 0.5,
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "06 / 10", right: "BAY AREA COVERAGE ROLLING OUT Q3" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 7 — SAMPLE WEEK (5 day cards; Wed is "hilite" nori)
// ═════════════════════════════════════════════════════════════════════════
function buildWeek() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 07 · A WEEK ON K-BOPS" });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const headY = FRAME.top + px(110);

  // Head row — 150px × ~1.0 line-height ≈ 150px/line → 2 lines ≈ 300px + descender
  s.addText([
    { text: "Monday to ", options: {
        fontFace: F.sans, fontSize: pt(130), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "Friday,", options: {
        fontFace: F.serif, italic: true, fontSize: pt(130),
        color: C.dan, charSpacing: -3, breakLine: true,
    }},
    { text: "handled.", options: {
        fontFace: F.sans, fontSize: pt(130), bold: true,
        color: C.ink, charSpacing: -3,
    }},
  ], {
    x: left, y: headY, w: px(1200), h: px(310),
    align: "left", valign: "top", margin: 0, paraSpaceAfter: 0,
  });

  // Note on right (bottom-aligned with head)
  s.addText(
    "A SAMPLE WEEK.\nSWAP ANY DAY BEFORE 10 AM.",
    {
      x: right - px(400), y: headY + px(200), w: px(400), h: px(80),
      fontFace: F.mono, fontSize: pt(16), color: C.ink,
      charSpacing: 2, align: "right", valign: "bottom", margin: 0,
    }
  );

  // 5 day cards
  const days = [
    { d: "Mon", n: "04.27", name: "Bulgogi", side: "+ DANMUJI",    photoBg: C.photoHot,   hilite: false, label: "BULGOGI" },
    { d: "Tue", n: "04.28", name: "Vegan",   side: "+ MISO SOUP",  photoBg: C.photoFresh, hilite: false, label: "VEGAN" },
    { d: "Wed", n: "04.29", name: "Taco",    side: "+ SALSA",      photoBg: C.photoMild,  hilite: true,  label: "TACO", drop: true },
    { d: "Thu", n: "04.30", name: "Cheese",  side: "+ CHIPS",      photoBg: C.photoCool,  hilite: false, label: "CHEESE" },
    { d: "Fri", n: "05.01", name: "Steak",   side: "+ AIOLI",      photoBg: C.photoPink,  hilite: false, label: "STEAK" },
  ];

  const rowY = headY + px(370);
  const rowBot = SH - FRAME.bottom - px(80);
  const rowH = rowBot - rowY;
  const gap = px(18);
  const dayW = (right - left - gap * 4) / 5;
  const topH = px(120), infoH = px(110);
  const photoH = rowH - topH - infoH;

  days.forEach((dy, i) => {
    const cx = left + i * (dayW + gap);
    const cy = rowY;

    // Border card
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: dayW, h: rowH,
      fill: { color: dy.hilite ? C.nori : C.paper },
      line: { color: C.ink, width: 1.1 },
    });

    // top (day + date)
    const textColor = dy.hilite ? C.paper : C.ink;
    s.addText(dy.d, {
      x: cx + px(20), y: cy + px(14), w: dayW - px(100), h: px(90),
      fontFace: F.serif, italic: true, fontSize: pt(68),
      color: dy.hilite ? C.dan : C.ink,
      align: "left", valign: "top", margin: 0, charSpacing: -2,
    });
    s.addText(dy.n, {
      x: cx + dayW - px(100), y: cy + px(22), w: px(90), h: px(30),
      fontFace: F.mono, fontSize: pt(13), color: textColor,
      align: "right", valign: "top", margin: 0, charSpacing: 1.2,
    });
    // divider under top
    addHRule(s, {
      x: cx, y: cy + topH, w: dayW,
      color: dy.hilite ? C.paper : C.ink,
    });

    // photo
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy + topH, w: dayW, h: photoH,
      fill: { color: dy.photoBg }, line: { color: dy.photoBg, width: 0 },
    });
    s.addText(dy.label, {
      x: cx + px(14), y: cy + topH + photoH - px(34), w: dayW - px(20), h: px(28),
      fontFace: F.mono, fontSize: pt(11), color: C.ink, transparency: 30,
      align: "left", valign: "middle", margin: 0, charSpacing: 0, inset: 0,
    });

    // info (name + side)
    const infoY = cy + topH + photoH;
    // divider above info
    addHRule(s, {
      x: cx, y: infoY, w: dayW,
      color: dy.hilite ? C.paper : C.ink,
    });
    if (dy.drop) {
      s.addText([
        { text: dy.name + " ", options: {
            fontFace: F.sans, fontSize: pt(22), bold: true,
            color: textColor, charSpacing: -0.3,
        }},
        { text: "★ NEW DROP", options: {
            fontFace: F.mono, fontSize: pt(10),
            color: C.dan, charSpacing: 0.8,
        }},
      ], {
        x: cx + px(14), y: infoY + px(10), w: dayW - px(20), h: px(50),
        align: "left", valign: "top", margin: 0, inset: 0,
      });
    } else {
      s.addText(dy.name, {
        x: cx + px(14), y: infoY + px(10), w: dayW - px(20), h: px(40),
        fontFace: F.sans, fontSize: pt(24), bold: true, color: textColor,
        align: "left", valign: "top", margin: 0, charSpacing: -0.3, inset: 0,
      });
    }
    s.addText(dy.side, {
      x: cx + px(14), y: infoY + px(55), w: dayW - px(20), h: px(35),
      fontFace: F.mono, fontSize: pt(11), color: textColor, transparency: 30,
      align: "left", valign: "top", margin: 0, charSpacing: 0, inset: 0,
    });
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "07 / 10", right: "CUSTOMIZE UP TO 10:00 AM DAY-OF" });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 8 — PRICING
// ═════════════════════════════════════════════════════════════════════════
function buildPrice() {
  const s = pres.addSlide();
  s.background = { color: C.paper };

  addTopbar(s, { sectionText: "§ 08 · PLANS" });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const headY = FRAME.top + px(110);

  s.addText([
    { text: "Pick your ", options: {
        fontFace: F.sans, fontSize: pt(160), bold: true,
        color: C.ink, charSpacing: -3,
    }},
    { text: "pace.", options: {
        fontFace: F.serif, italic: true, fontSize: pt(160),
        color: C.kimchi, charSpacing: -3,
    }},
  ], {
    x: left, y: headY, w: right - left, h: px(200),
    align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "All plans include free weekday delivery anywhere in SF. " +
    "Pause or cancel anytime.",
    {
      x: left, y: headY + px(215), w: 12, h: px(60),
      fontFace: F.sans, fontSize: pt(24), color: C.inkSoft,
      align: "left", valign: "top", margin: 0,
    }
  );

  // 3 plans
  const plans = [
    {
      name: "3-Day", blurb: "MON / WED / FRI",
      price: "$39", unit: "/ WEEK · BILLED MONTHLY",
      items: [
        "12 rolls per month",
        "Free SF delivery",
        "Menu swaps until 10 AM",
        "Skip any week",
      ],
      cta: "→ DIP YOUR TOE IN",
      feat: false, ribbon: null,
    },
    {
      name: "Daily", blurb: "EVERY WEEKDAY",
      price: "$59", unit: "/ WEEK · BILLED MONTHLY",
      items: [
        "20 rolls per month",
        "Free SF delivery, always",
        "Member-only drops + banchan",
        "Priority delivery window",
        "Pause or swap any day",
      ],
      cta: "★ OFFICE FAVORITE",
      feat: true, ribbon: "MOST POPULAR",
    },
    {
      name: "Team", blurb: "5+ DESKS, ONE INVOICE",
      price: "Custom", unit: "FROM $49 / SEAT / WEEK",
      items: [
        "Bulk weekday delivery",
        "Dedicated account lead",
        "Per-person menu control",
        "Monthly invoicing",
      ],
      cta: "→ TALK TO SALES",
      feat: false, ribbon: null,
    },
  ];

  const cardY = headY + px(300);
  const cardBot = SH - FRAME.bottom - px(80);
  const gap = px(20);
  const cardW = (right - left - gap * 2) / 3;
  const cardH = cardBot - cardY;
  const pad = px(36);

  plans.forEach((p, i) => {
    const cx = left + i * (cardW + gap);
    const cy = cardY;

    const fill = p.feat ? C.ink : C.paper;
    const fg = p.feat ? C.paper : C.ink;
    const fgSoft = p.feat ? C.paper : C.inkSoft;
    const priceColor = p.feat ? C.dan : C.ink;
    // "Custom" text doesn't fit at 100pt — render it smaller so it fits the card
    const priceSize = p.price === "Custom" ? pt(64) : pt(100);

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: fill }, line: { color: C.ink, width: 1.1 },
    });

    // Ribbon overlay on featured
    if (p.ribbon) {
      const rw = px(180), rh = px(34);
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + cardW - rw - px(24), y: cy - px(17), w: rw, h: rh,
        fill: { color: C.kimchi }, line: { color: C.kimchi, width: 0 },
      });
      s.addText(p.ribbon, {
        x: cx + cardW - rw - px(24), y: cy - px(17), w: rw, h: rh,
        fontFace: F.mono, fontSize: pt(13), color: C.paper,
        align: "center", valign: "middle", margin: 0, charSpacing: 1.5, inset: 0,
      });
    }

    // Name
    s.addText(p.name, {
      x: cx + pad, y: cy + pad, w: cardW - 2 * pad, h: px(45),
      fontFace: F.sans, fontSize: pt(30), bold: true, color: fg,
      align: "left", valign: "top", margin: 0, charSpacing: -0.4, inset: 0,
    });
    // Blurb
    s.addText(p.blurb, {
      x: cx + pad, y: cy + pad + px(50), w: cardW - 2 * pad, h: px(30),
      fontFace: F.mono, fontSize: pt(12), color: fgSoft, transparency: 30,
      align: "left", valign: "top", margin: 0, charSpacing: 1, inset: 0,
    });

    // Price — 100pt; line-height ~0.9 → ~110px tall
    s.addText(p.price, {
      x: cx + pad, y: cy + pad + px(90), w: cardW - 2 * pad, h: px(110),
      fontFace: F.sans, fontSize: priceSize, bold: true, color: priceColor,
      align: "left", valign: "top", margin: 0, charSpacing: -3, inset: 0,
    });
    // Price unit — positioned well below price bottom
    s.addText(p.unit, {
      x: cx + pad, y: cy + pad + px(200), w: cardW - 2 * pad, h: px(28),
      fontFace: F.mono, fontSize: pt(11), color: fg, transparency: 25,
      align: "left", valign: "top", margin: 0, charSpacing: 1, inset: 0,
    });

    // Feature list — each line divided by top border
    const listY = cy + pad + px(235);
    const lineH = px(32);
    p.items.forEach((item, j) => {
      // top divider for each row
      addHRule(s, { x: cx + pad, y: listY + j * lineH, w: cardW - 2 * pad, color: fg });
      s.addText([
        { text: "+  ", options: {
            fontFace: F.mono, fontSize: pt(14), color: fg, transparency: 40,
        }},
        { text: item, options: {
            fontFace: F.sans, fontSize: pt(14), color: fg,
        }},
      ], {
        x: cx + pad, y: listY + j * lineH, w: cardW - 2 * pad, h: lineH,
        align: "left", valign: "middle", margin: 0, inset: 0,
      });
    });
    // closing divider under last item
    addHRule(s, { x: cx + pad, y: listY + p.items.length * lineH, w: cardW - 2 * pad, color: fg });

    // CTA at bottom
    const ctaColor = (p.feat && p.cta.startsWith("★")) ? C.dan : fg;
    s.addText(p.cta, {
      x: cx + pad, y: cy + cardH - pad - px(28), w: cardW - 2 * pad, h: px(28),
      fontFace: F.mono, fontSize: pt(12), color: ctaColor,
      align: "left", valign: "middle", margin: 0, charSpacing: 1.2, inset: 0,
    });
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "08 / 10", right: "PRICES IN USD · TAX & TIP INCL." });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 9 — TESTIMONIAL  (nori green bg)
// ═════════════════════════════════════════════════════════════════════════
function buildQuote() {
  const s = pres.addSlide();
  s.background = { color: C.nori };

  addTopbar(s, {
    sectionText: "§ 09 · WHY SUBSCRIBE",
    dark: true,
    logoBg: C.paper, logoFg: C.nori,
  });

  const left = FRAME.side;
  const right = SW - FRAME.side;
  const bodyY = FRAME.top + px(120);
  const colGap = px(60);
  const leftW = (right - left - colGap) * 0.65;
  const rightW = (right - left - colGap) * 0.35;

  // ── Giant quote mark (Fraunces) — dan colored
  // 380px font, line-height 0.7 → ~266px for a single glyph
  s.addText("“", {
    x: left, y: bodyY - px(80), w: px(400), h: px(320),
    fontFace: F.serif, fontSize: pt(380), color: C.dan,
    align: "left", valign: "top", margin: 0, charSpacing: -10, inset: 0,
  });

  // Quote text — 60pt serif italic (down from 82pt so it fits)
  // ~68px/line × 5 lines = 340px
  s.addText(
    "It's the only subscription I actually look forward to. " +
    "Lunch shows up, I don't think about it, and it's somehow " +
    "better than anything on the block.",
    {
      x: left, y: bodyY + px(260), w: leftW, h: px(420),
      fontFace: F.serif, italic: true, fontSize: pt(60),
      color: C.paper, charSpacing: -1,
      align: "left", valign: "top", margin: 0, inset: 0,
    }
  );

  // Attribution: avatar + text — positioned near the bottom
  const attrY = SH - FRAME.bottom - px(140);
  const avD = px(56);
  s.addShape(pres.shapes.OVAL, {
    x: left, y: attrY, w: avD, h: avD,
    fill: { color: C.paper }, line: { color: C.paper, width: 0 },
  });
  s.addText("JK", {
    x: left, y: attrY, w: avD, h: avD,
    fontFace: F.sans, fontSize: pt(22), bold: true, color: C.nori,
    align: "center", valign: "middle", margin: 0, inset: 0,
  });
  s.addText("JORDAN K. · DESIGNER · SOMA MEMBER SINCE 2024", {
    x: left + avD + px(18), y: attrY, w: leftW - avD - px(30), h: avD,
    fontFace: F.mono, fontSize: pt(16), color: C.paper,
    charSpacing: 1.5, align: "left", valign: "middle", margin: 0, inset: 0,
  });

  // ── Right: 3 stat cards stacked
  const stats = [
    { n: "4.9★",   l: "AVERAGE SUBSCRIBER RATING" },
    { n: "2,400+", l: "ROLLS DELIVERED WEEKLY" },
    { n: "93%",    l: "RENEW AFTER MONTH ONE" },
  ];
  const statX = left + leftW + colGap;
  const statYTop = bodyY;
  const statBot = SH - FRAME.bottom - px(80);
  const totalH = statBot - statYTop;
  const sGap = px(20);
  const sH = (totalH - sGap * 2) / 3;

  stats.forEach((st, i) => {
    const sy = statYTop + i * (sH + sGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: statX, y: sy, w: rightW, h: sH,
      fill: { color: C.nori }, line: { color: C.paper, width: 1.1 },
    });
    // big number — 96px/72pt, line-height ~0.9 → 86px
    s.addText(st.n, {
      x: statX + px(30), y: sy + px(30), w: rightW - px(60), h: px(130),
      fontFace: F.sans, fontSize: pt(96), bold: true, color: C.dan,
      align: "left", valign: "top", margin: 0, charSpacing: -3,
    });
    // label — anchored to bottom
    s.addText(st.l, {
      x: statX + px(30), y: sy + sH - px(60), w: rightW - px(60), h: px(40),
      fontFace: F.mono, fontSize: pt(15), color: C.paper,
      charSpacing: 1.8, align: "left", valign: "middle", margin: 0,
    });
  });

  addFootbar(s, { left: "K-BOPS · KIMBAP CO.", middle: "09 / 10", right: "REAL MEMBERS, REAL DESKS", dark: true });
}

// ═════════════════════════════════════════════════════════════════════════
// SLIDE 10 — CTA  (dan yellow background)
// ═════════════════════════════════════════════════════════════════════════
function buildCta() {
  const s = pres.addSlide();
  s.background = { color: C.dan };

  // Topbar renders on dan background — keep light (default ink colors)
  addTopbar(s, {
    sectionText: "§ 10 · SUBSCRIBE NOW",
    logoBg: C.kimchi, logoFg: C.paper,
  });

  const left = FRAME.side;
  const right = SW - FRAME.side;

  // Eyebrow
  s.addText(
    "// LAUNCH OFFER — FIRST MONTH, FREE DELIVERY LOCKED IN FOR LIFE",
    {
      x: left, y: FRAME.top + px(130), w: right - left, h: px(45),
      fontFace: F.mono, fontSize: pt(20), color: C.kimchi,
      charSpacing: 3, align: "left", valign: "middle", margin: 0, inset: 0,
    }
  );

  // Big head: "Start [Monday.]" — 200pt so it fits on one line with room for period
  const ctaHeadSize = pt(200);
  s.addText([
    { text: "Start ", options: {
        fontFace: F.sans, fontSize: ctaHeadSize, bold: true,
        color: C.ink, charSpacing: -5,
    }},
    { text: "Monday.", options: {
        fontFace: F.serif, italic: true, fontSize: ctaHeadSize,
        color: C.kimchi, charSpacing: -5,
    }},
  ], {
    x: left, y: FRAME.top + px(190), w: right - left, h: px(230),
    align: "left", valign: "top", margin: 0, inset: 0,
  });

  // 3 CTA cards
  const cards = [
    {
      label: "01 · WEB",
      val: "kbops.com",
      meta: "SUBSCRIBE IN 2 MINUTES",
      extra: { type: "qr" },
    },
    {
      label: "02 · APP",
      val: "K-Bops",
      meta: "iOS · ANDROID",
      extra: { type: "chips", chips: ["↓ APP STORE", "↓ GOOGLE PLAY"] },
    },
    {
      label: "03 · PHONE",
      val: "555-1234",
      meta: "WE'LL SORT YOU OUT",
      extra: { type: "small", text: "MON–FRI · 8A–5P PT" },
    },
  ];

  const gy = FRAME.top + px(470);
  const gBot = SH - FRAME.bottom - px(80);
  const gap = px(20);
  const cardW = (right - left - gap * 2) / 3;
  const cardH = gBot - gy;
  const pad = px(32);

  cards.forEach((c, i) => {
    const cx = left + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: gy, w: cardW, h: cardH,
      fill: { color: C.paper }, line: { color: C.ink, width: 1.1 },
    });
    // label
    s.addText(c.label, {
      x: cx + pad - px(6), y: gy + pad, w: cardW - 2 * pad + px(12), h: px(35),
      fontFace: F.mono, fontSize: pt(13), color: C.ink, transparency: 30,
      charSpacing: 1, align: "left", valign: "middle", margin: 0, inset: 0,
    });
    // big value
    s.addText(c.val, {
      x: cx + pad, y: gy + pad + px(45), w: cardW - 2 * pad, h: px(80),
      fontFace: F.sans, fontSize: pt(40), bold: true, color: C.ink,
      align: "left", valign: "top", margin: 0, charSpacing: -0.5, inset: 0,
    });
    // meta
    s.addText(c.meta, {
      x: cx + pad - px(6), y: gy + pad + px(130), w: cardW - 2 * pad + px(12), h: px(35),
      fontFace: F.mono, fontSize: pt(13), color: C.ink, transparency: 35,
      charSpacing: 0.8, align: "left", valign: "middle", margin: 0, inset: 0,
    });
    // extras
    if (c.extra.type === "qr") {
      // 130×130 placeholder
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + pad, y: gy + pad + px(190), w: px(130), h: px(130),
        fill: { color: C.paper }, line: { color: C.ink, width: 1.1 },
      });
      s.addText("QR", {
        x: cx + pad, y: gy + pad + px(190), w: px(130), h: px(130),
        fontFace: F.mono, fontSize: pt(22), color: C.ink,
        align: "center", valign: "middle", margin: 0, charSpacing: 2,
      });
    } else if (c.extra.type === "chips") {
      const chipY = gy + pad + px(190);
      const chipW = px(155), chipH = px(35), chipGap = px(10);
      c.extra.chips.forEach((ct, j) => {
        addChip(s, {
          x: cx + pad + j * (chipW + chipGap), y: chipY,
          w: chipW, h: chipH, text: ct,
        });
      });
    } else if (c.extra.type === "small") {
      s.addText(c.extra.text, {
        x: cx + pad, y: gy + cardH - pad - px(50), w: cardW - 2 * pad, h: px(45),
        fontFace: F.sans, fontSize: pt(34), bold: true, color: C.kimchi,
        align: "left", valign: "middle", margin: 0, charSpacing: -0.3,
      });
    }
  });

  addFootbar(s, {
    left: "K-BOPS · KIMBAP CO. · SAN FRANCISCO",
    middle: "10 / 10 · FIN.",
    right: "SEE YOU AT LUNCH →",
  });
}

// ═════════════════════════════════════════════════════════════════════════
// BUILD & SAVE
// ═════════════════════════════════════════════════════════════════════════
buildCover();
buildPitch();
buildWhat();
buildMenu();
buildHow();
buildArea();
buildWeek();
buildPrice();
buildQuote();
buildCta();

// ═════════════════════════════════════════════════════════════════════════
// BUILD, SAVE, POST-PROCESS
// ═════════════════════════════════════════════════════════════════════════
// pptxgenjs 4.0.1 has a bug where mixed-font rich-text arrays emit a stray
// <a:pPr> tag mid-paragraph between runs, e.g.:
//   <a:p>...<a:r>Skip the </a:r><a:pPr .../><a:r>sad desk salad.</a:r></a:p>
// That's malformed OOXML and triggers PowerPoint's repair dialog. We fix it
// by parsing the generated .pptx after writeFile and stripping any <a:pPr>
// element that appears AFTER the first <a:r> inside a single <a:p> block.

const AdmZip = (() => {
  try { return require("adm-zip"); } catch { return null; }
})();

async function repairDeck(fileName) {
  // Fallback implementation that doesn't require adm-zip: use Node's built-in
  // zlib + a hand-rolled zip reader would be overkill. Instead we shell out
  // to /usr/bin/zip which is always available in the sandbox.
  const { execSync } = require("child_process");
  const fs = require("fs");
  const path = require("path");
  const os = require("os");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "kbops-repair-"));
  execSync(`unzip -q -o "${fileName}" -d "${tmpDir}"`);

  const slidesDir = path.join(tmpDir, "ppt", "slides");
  const slideFiles = fs.readdirSync(slidesDir).filter(f => /^slide\d+\.xml$/.test(f));

  for (const f of slideFiles) {
    const fp = path.join(slidesDir, f);
    let xml = fs.readFileSync(fp, "utf8");

    // Strip any <a:pPr .../> that appears mid-paragraph (i.e. after <a:r> and
    // before </a:p>). We walk each <a:p>...</a:p> block and remove every
    // <a:pPr ...> EXCEPT the one directly at the start of the paragraph.
    xml = xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (match, inner) => {
      // Keep the first <a:pPr>...</a:pPr> or <a:pPr .../> that appears before
      // any <a:r>; remove all subsequent <a:pPr> blocks inside this paragraph.
      let sawRun = false;
      let out = "";
      let i = 0;
      while (i < inner.length) {
        if (inner.startsWith("<a:r>", i) || inner.startsWith("<a:r ", i)) {
          sawRun = true;
          // emit this <a:r>...</a:r>
          const end = inner.indexOf("</a:r>", i) + "</a:r>".length;
          out += inner.slice(i, end);
          i = end;
          continue;
        }
        if (inner.startsWith("<a:pPr", i)) {
          // find the end of this pPr element (either self-closing or with body)
          const selfClose = inner.indexOf("/>", i);
          const openEnd = inner.indexOf(">", i);
          let elemEnd;
          if (selfClose !== -1 && selfClose < inner.indexOf("</a:pPr>", i) || inner.indexOf("</a:pPr>", i) === -1) {
            // self-closing: <a:pPr .../>
            elemEnd = selfClose + 2;
          } else {
            elemEnd = inner.indexOf("</a:pPr>", i) + "</a:pPr>".length;
          }
          // pPr with nested children: need to find matching close
          const closeTag = "</a:pPr>";
          const close = inner.indexOf(closeTag, i);
          // Determine if this pPr is self-closing by checking if "/>" comes
          // before the next "<" after the opening "<a:pPr"
          const openTagEnd = inner.indexOf(">", i);
          const isSelfClose = inner[openTagEnd - 1] === "/";
          if (isSelfClose) {
            elemEnd = openTagEnd + 1;
          } else {
            elemEnd = close + closeTag.length;
          }
          if (sawRun) {
            // skip this pPr (drop it)
            i = elemEnd;
            continue;
          } else {
            // keep first pPr
            out += inner.slice(i, elemEnd);
            i = elemEnd;
            continue;
          }
        }
        // any other character — just emit
        out += inner[i];
        i++;
      }
      return `<a:p>${out}</a:p>`;
    });

    fs.writeFileSync(fp, xml, "utf8");
  }

  // Re-zip. PowerPoint requires `[Content_Types].xml` to be the FIRST entry
  // in the archive. `zip -r` adds files in directory-traversal order, which
  // puts it last. We work around this by adding it explicitly first, then
  // adding everything else.
  fs.unlinkSync(fileName);
  const outPath = path.resolve(fileName);
  execSync(
    `cd "${tmpDir}" && zip -q -X "${outPath}" "[Content_Types].xml" && ` +
    `zip -q -X -r "${outPath}" . -x "[Content_Types].xml"`
  );

  // cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

(async () => {
  try {
    const f = await pres.writeFile({ fileName: "K-Bops_Deck.pptx" });
    console.log("Wrote:", f);
    await repairDeck("K-Bops_Deck.pptx");
    console.log("Repaired rich-text paragraphs");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
