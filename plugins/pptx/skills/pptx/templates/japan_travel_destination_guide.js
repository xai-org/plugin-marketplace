/**
 * build-japan.js
 *
 * Recreates "japan.pptx" — an 8-slide editorial travel deck — using pptxgenjs.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node build-japan.js            -> writes ./japan.pptx
 *
 * Notes on the reconstruction:
 *   - Canvas: custom 20" x 11.25" (matches the source 18288000 x 10287000 EMU).
 *   - Palette: cream F2ECE0, warm cream E7DFCF, red B83A2B, ink 1A1A1A, taupe 6B6358,
 *     dark brown 2A1F1A (urban slide), light ink 8A8378 / B4AA97 (on dark).
 *   - Fonts: Garamond (display serif), Consolas (mono labels), Yu Mincho (Japanese).
 *   - Rotation in the source is -240000 (1/60000 deg) = -4°.
 *   - OOXML `spc` -> pptxgenjs `charSpacing` at 1/100 pt scale (divided by 100).
 *   - The 4 images in the source are near-transparent placeholder PNGs; in this
 *     replica we approximate them with styled frames in the same positions.
 */

const pptxgen = require("pptxgenjs");

// ---------- palette & fonts ----------
const C = {
  cream:       "F2ECE0",
  creamWarm:   "E7DFCF",
  creamPanel:  "E8DFCC",
  creamAlt:    "F4EFE6",
  creamBlush:  "FFE6DC",
  red:         "B83A2B",
  ink:         "1A1A1A",
  taupe:       "6B6358",
  taupeLight:  "8A8378",
  taupeMuted:  "B4AA97",
  darkBg:      "2A1F1A",   // approximated from B83A2B @12% alpha over 1A1A1A
  darkDeep:    "16130F",
};
const F = {
  serif:  "Garamond",
  mono:   "Consolas",
  jp:     "Yu Mincho",
};

// ---------- helpers ----------
// Shared text-box defaults: keep internal padding minimal so positions stay faithful to the source.
const TX = { margin: 0.03 };

// Pre-made option helpers so we never reuse mutable objects (pptxgenjs mutates shadow objs in place).
const redShadow  = () => ({ type: "outer", color: "B83A2B", blur: 8, offset: 4, angle: 270, opacity: 0.18 });
const softShadow = () => ({ type: "outer", color: "000000", blur: 30, offset: 15, angle: 90,  opacity: 0.30 });

// Corner bracket marks (thin right-angle tick at a given corner) — used on the title slide.
function corner(slide, cx, cy, corner) {
  // corner: "tl" | "tr" | "bl" | "br"
  const len = 0.302, thk = 0.01, c = C.ink;
  // horizontal arm
  let hx = cx, hy = cy;
  if (corner === "tr" || corner === "br") hx = cx - len;
  if (corner === "bl" || corner === "br") hy = cy;
  slide.addShape("rect", { x: hx, y: hy, w: len, h: thk, fill: { color: c }, line: { type: "none" } });
  // vertical arm
  let vx = cx, vy = cy;
  if (corner === "tr" || corner === "br") vx = cx;
  if (corner === "bl" || corner === "br") vy = cy - len;
  slide.addShape("rect", { x: vx, y: vy, w: thk, h: len, fill: { color: c }, line: { type: "none" } });
}

// Header: "NN · CHAPTER" top-left, "p. NN / 08" top-right. Colors vary per slide (dark bg vs. light).
function pageHeader(slide, leftText, rightText, color = C.taupe) {
  slide.addText(leftText, {
    x: 0.833, y: 0.583, w: 3.3, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.51, color, ...TX,
  });
  slide.addText(rightText, {
    x: 17.779, y: 0.583, w: 1.471, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 1.89, color, align: "left", ...TX,
  });
}

// "CH. N · TITLE" boxed tag + trailing short rule. Used on slides 2, 4, 5, 6, 7.
function chapterTag(slide, x, y, text, color = C.ink) {
  // Box dimensions depend on text length — caller passes width via 'w' by deriving from text.
  const pad = 0.198;
  // Consolas 13.5pt w/ charSpacing 3.24 ≈ 0.17"/char; add safety so it never wraps.
  const textW = text.length * 0.17;
  const boxW = textW + pad * 2;
  slide.addShape("rect", {
    x, y, w: boxW, h: 0.401,
    fill: { type: "none" }, line: { color, width: 0.75 },
  });
  slide.addText(text, {
    x: x + pad, y: y + 0.094, w: textW + 0.05, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.24, color, ...TX,
  });
  // trailing short rule
  slide.addShape("rect", {
    x: x + boxW + 0.24, y: y + 0.2, w: 0.542, h: 0.01,
    fill: { color }, line: { type: "none" },
  });
}

// Red rounded badge with a white kanji, rotated -4°.
function kanjiBadge(slide, x, y, kanji, size = 1.0, fontSize = 33, bgColor = C.red, fgColor = C.cream) {
  const rot = -4;
  slide.addShape("roundRect", {
    x, y, w: size, h: size, rotate: rot,
    fill: { color: bgColor }, line: { type: "none" }, rectRadius: 0.08,
  });
  slide.addText(kanji, {
    x: x - 0.042, y: y, w: size + 0.083, h: size + 0.042, rotate: rot,
    fontFace: F.jp, fontSize, bold: true, color: fgColor,
    align: "center", valign: "middle", ...TX,
  });
}

// Small red numbered tab (like "01", "02") used on slide 2.
function numberTab(slide, x, y, num) {
  slide.addShape("rect", {
    x, y, w: 0.426, h: 0.24,
    fill: { color: C.red }, line: { type: "none" },
  });
  slide.addText(num, {
    x: x + 0.104, y: y + 0.042, w: 0.301, h: 0.198,
    fontFace: F.mono, fontSize: 9.75, charSpacing: 1.95, color: C.cream, ...TX,
  });
}

// Page-number style tab used on slide 5/7 (white box with dark text).
function figTab(slide, x, y, text, w = 0.825, h = 0.229) {
  slide.addShape("rect", { x, y, w, h, fill: { color: C.cream }, line: { type: "none" } });
  slide.addText(text, {
    x: x + 0.104, y: y + 0.042, w: w - 0.125, h: h - 0.042,
    fontFace: F.mono, fontSize: 9, charSpacing: 1.98, color: C.ink, ...TX,
  });
}

// ---------- presentation setup ----------
const pres = new pptxgen();
pres.author = "Wander & Co.";
pres.title  = "Japan — A Traveler's Invitation";
pres.defineLayout({ name: "JAPAN20x11_25", width: 20, height: 11.25 });
pres.layout = "JAPAN20x11_25";

// ============================================================
// SLIDE 1 — Title
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Corner bracket marks
  corner(s, 0.292, 0.292, "tl");
  corner(s, 19.708, 0.292, "tr");
  corner(s, 0.292, 10.958, "bl");
  corner(s, 19.708, 10.958, "br");

  // Top labels
  s.addText("A TRAVELER'S INVITATION", {
    x: 1.042, y: 0.833, w: 3.909, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.78, color: C.taupe, ...TX,
  });
  s.addText("MMXXVI · VOL. 01", {
    x: 6.77, y: 0.833, w: 2.724, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.78, color: C.taupe, ...TX,
  });

  // 日本 in red
  s.addText("日本", {
    x: 1.042, y: 2.505, w: 2.25, h: 1.125,
    fontFace: F.jp, fontSize: 78, color: C.red, ...TX,
  });

  // Horizontal rule after 日本
  s.addShape("rect", {
    x: 3.5, y: 3.328, w: 4.869, h: 0.01,
    fill: { color: C.ink }, line: { type: "none" },
  });

  // Red 旅 badge, tilted
  kanjiBadge(s, 8.661, 2.839, "旅", 0.75, 24, C.red, C.cream);

  // Giant "Japan" title
  s.addText("Japan", {
    x: 1.042, y: 3.6, w: 8.62, h: 3.2,
    fontFace: F.serif, fontSize: 210, charSpacing: -7.5, color: C.ink,
    paraSpaceBefore: 0, paraSpaceAfter: 0, valign: "top", ...TX,
  });

  // "— A GUIDE" + rule + "EIGHT CHAPTERS"
  s.addText("— A GUIDE", {
    x: 1.042, y: 7.1, w: 1.569, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, bold: true, charSpacing: 3.78, color: C.red, ...TX,
  });
  s.addShape("rect", {
    x: 2.735, y: 7.2, w: 4.157, h: 0.01,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addText("EIGHT CHAPTERS", {
    x: 7.1, y: 7.1, w: 2.394, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.78, color: C.taupe, ...TX,
  });

  // Italic tagline
  s.addText("Eight images, one country, a thousand reasons to go.", {
    x: 1.042, y: 7.6, w: 8.369, h: 1.5,
    fontFace: F.serif, fontSize: 31.5, italic: true, color: C.ink,
    lineSpacingMultiple: 1.25, ...TX,
  });

  // Footer row
  s.addText("TOKYO · KYOTO · OSAKA · HOKKAIDO · OKINAWA", {
    x: 1.042, y: 10.391, w: 6.201, h: 0.234,
    fontFace: F.mono, fontSize: 12, charSpacing: 3.12, color: C.taupe, ...TX,
  });
  s.addText("EST.\n2026", {
    x: 8.909, y: 10.117, w: 0.585, h: 0.4,
    fontFace: F.mono, fontSize: 10.5, charSpacing: 2.73, color: C.taupe,
    lineSpacingMultiple: 1.0, ...TX,
  });

  // Right side: warm cream panel
  s.addShape("rect", {
    x: 10.244, y: 0, w: 9.756, h: 11.25,
    fill: { color: C.creamWarm }, line: { type: "none" },
  });
  // Soft blush tint on top (approximated via low-alpha — pptxgenjs uses transparency 0-100)
  s.addShape("rect", {
    x: 10.244, y: 0, w: 9.756, h: 11.25,
    fill: { color: C.creamBlush, transparency: 92 }, line: { type: "none" },
  });

  // Big red rising sun (off-canvas right)
  s.addShape("ellipse", {
    x: 16.042, y: 1.875, w: 5.417, h: 5.417,
    fill: { color: C.red }, line: { type: "none" },
  });

  // Motif panel placeholder (asanoha-patterned area in source)
  s.addShape("rect", {
    x: 10.233, y: 0.625, w: 3.5, h: 4.542,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addShape("rect", {
    x: 10.525, y: 0.917, w: 2.938, h: 3.979,
    fill: { type: "none" }, line: { color: C.red, width: 0.75 },
  });
  s.addText("MOTIF · ASANOHA", {
    x: 10.525, y: 4.922, w: 1.75, h: 0.22,
    fontFace: F.mono, fontSize: 9, charSpacing: 1.8, color: C.taupe, ...TX,
  });

  // Coordinates tab (dark strip with cream text)
  s.addShape("rect", {
    x: 16.533, y: 0.417, w: 3.05, h: 0.328,
    fill: { color: "000000", transparency: 60 }, line: { type: "none" },
  });
  s.addText("35.3606° N · 138.7274° E", {
    x: 16.658, y: 0.5, w: 2.892, h: 0.203,
    fontFace: F.mono, fontSize: 10.5, charSpacing: 2.1, color: C.cream, ...TX,
  });

  // Vertical Japanese phrase
  s.addText(
    [{ text: "美", options: { breakLine: true } },
     { text: "し", options: { breakLine: true } },
     { text: "い", options: { breakLine: true } },
     { text: "国", options: { breakLine: true } },
     { text: "へ", options: { breakLine: true } },
     { text: "の", options: { breakLine: true } },
     { text: "誘", options: { breakLine: true } },
     { text: "い" }],
    {
      x: 10.661, y: 5.417, w: 0.406, h: 5.25,
      fontFace: F.jp, fontSize: 16.5, color: C.taupe, align: "center",
      lineSpacingMultiple: 1.0, ...TX,
    }
  );

  // Bottom-right empty framed card (decorative element from source)
  s.addShape("rect", {
    x: 15.875, y: 8.167, w: 3.5, h: 2.458,
    fill: { type: "none" }, line: { color: C.cream, width: 6 },
  });
  s.addShape("rect", {
    x: 15.958, y: 8.25, w: 3.333, h: 2.292,
    fill: { color: C.darkDeep, transparency: 95 }, line: { type: "none" },
  });
}

// ============================================================
// SLIDE 2 — Overview: "A country of contrasts."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  pageHeader(s, "02 · OVERVIEW", "p. 02 / 08", C.taupe);
  chapterTag(s, 1.042, 1.458, "CH. I · OVERVIEW", C.ink);

  // Long top rule
  s.addShape("rect", {
    x: 4.166, y: 1.654, w: 12.329, h: 0.01,
    fill: { color: C.ink, transparency: 70 }, line: { type: "none" },
  });

  // Headline: "A country of contrasts." (italic "contrasts.")
  s.addText(
    [
      { text: "A country of ", options: { italic: false, color: C.ink } },
      { text: "contrasts.",   options: { italic: true,  color: C.red } },
    ],
    {
      x: 1.042, y: 2.151, w: 15.918, h: 2.342,
      fontFace: F.serif, fontSize: 90, charSpacing: -1.8, color: C.ink, ...TX,
    }
  );

  // Red 対 badge top-right
  kanjiBadge(s, 17.958, 3.123, "対", 1.0, 33, C.red, C.cream);
  s.addText("TAI · OPPOSITES", {
    x: 17.037, y: 4.29, w: 1.921, h: 0.23,
    fontFace: F.mono, fontSize: 10.5, charSpacing: 2.52, color: C.taupe, ...TX,
  });

  // Four column cards
  const cards = [
    { x: 1.042,  tint: { color: C.creamAlt,   t: 93 }, num: "01", jp: "都市 · TOSHI",    en: "The city that ",     emph: "hums."     },
    { x: 5.615,  tint: { color: C.creamAlt,   t: 92 }, num: "02", jp: "静寂 · SEIJAKU",  en: "The forest that ",   emph: "listens."  },
    { x: 10.188, tint: { color: C.darkDeep,   t: 94 }, num: "03", jp: "伝統 · DENTŌ",    en: "The past, still ",   emph: "standing." },
    { x: 14.76,  tint: { color: C.creamBlush, t: 92 }, num: "04", jp: "未来 · MIRAI",    en: "The future, already ", emph: "arrived." },
  ];
  for (const card of cards) {
    // tinted card body
    s.addShape("rect", {
      x: card.x, y: 4.868, w: 4.198, h: 3.75,
      fill: { color: card.tint.color, transparency: card.tint.t }, line: { type: "none" },
    });
    numberTab(s, card.x + 0.166, 5.034, card.num);

    // small red rule above label
    s.addShape("rect", {
      x: card.x, y: 8.764, w: 0.542, h: 0.021,
      fill: { color: C.red }, line: { type: "none" },
    });
    // Japanese · romaji label
    s.addText(card.jp, {
      x: card.x, y: 8.93, w: 4.324, h: 0.573,
      fontFace: F.jp, fontSize: 25.5, color: C.red, ...TX,
    });
    // English phrase with emphasis
    s.addText(
      [
        { text: card.en,   options: { italic: false } },
        { text: card.emph, options: { italic: true  } },
      ],
      {
        x: card.x, y: 9.524, w: 4.324, h: 1.0,
        fontFace: F.serif, fontSize: 28.5, charSpacing: -0.14, color: C.ink, ...TX,
      }
    );
  }
}

// ============================================================
// SLIDE 3 — Urban: "Cities that never sleep." (dark)
// ============================================================
{
  const s = pres.addSlide();
  // Dark background = ink + red @12% overlay (we precomputed it into C.darkBg)
  s.background = { color: C.darkBg };

  pageHeader(s, "03 · URBAN", "p. 03 / 08", C.taupeLight);

  // Vertical Japanese phrase 眠らない街 on far left
  s.addText(
    [{ text: "眠", options: { breakLine: true } },
     { text: "ら", options: { breakLine: true } },
     { text: "な", options: { breakLine: true } },
     { text: "い", options: { breakLine: true } },
     { text: "街" }],
    {
      x: 0.375, y: 1.042, w: 0.375, h: 9.587,
      fontFace: F.jp, fontSize: 15, charSpacing: 4.5, color: C.taupeLight,
      align: "center", lineSpacingMultiple: 1.0, ...TX,
    }
  );

  // Big image placeholder (top-left rectangle)
  s.addShape("rect", {
    x: 1.042, y: 1.042, w: 7.431, h: 7.254,
    fill: { color: C.creamAlt, transparency: 93 }, line: { type: "none" },
  });
  // Two smaller placeholder rectangles at the bottom
  s.addShape("rect", {
    x: 1.042, y: 8.379, w: 5.139, h: 2.208,
    fill: { color: C.creamBlush, transparency: 92 },
    line: { color: C.ink, width: 4.5 },
  });
  s.addShape("rect", {
    x: 6.264, y: 8.379, w: 2.208, h: 2.208,
    fill: { color: C.darkDeep, transparency: 94 },
    line: { color: C.ink, width: 4.5 },
  });

  // Chapter tag (light on dark)
  s.addShape("rect", {
    x: 9.514, y: 1.667, w: 2.606, h: 0.401,
    fill: { type: "none" }, line: { color: C.cream, width: 0.75 },
  });
  s.addText("CH. II · URBAN", {
    x: 9.712, y: 1.76, w: 2.294, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.24, color: C.cream, ...TX,
  });
  s.addShape("rect", {
    x: 12.308, y: 1.862, w: 0.542, h: 0.01,
    fill: { color: C.cream, transparency: 50 }, line: { type: "none" },
  });

  // Red kanji phrase
  s.addText("眠らない街", {
    x: 9.514, y: 2.359, w: 9.728, h: 0.885,
    fontFace: F.jp, fontSize: 40.5, color: C.red, ...TX,
  });
  // Big cream headline
  s.addText(
    [
      { text: "Cities that ", options: { italic: false } },
      { text: "never ",       options: { italic: true  } },
      { text: "sleep.",        options: { italic: true  } },
    ],
    {
      x: 9.514, y: 3.349, w: 9.728, h: 2.4,
      fontFace: F.serif, fontSize: 78, charSpacing: -1.56, color: C.cream,
      lineSpacingMultiple: 1.02, ...TX,
    }
  );

  // "BY THE NUMBERS" divider
  s.addShape("rect", {
    x: 13.087, y: 6.066, w: 2.299, h: 0.193,
    fill: { color: C.ink }, line: { type: "none" },
  });
  s.addText("BY THE NUMBERS", {
    x: 13.233, y: 6.066, w: 2.09, h: 0.234,
    fontFace: F.mono, fontSize: 12, charSpacing: 3.12, color: C.taupeMuted, ...TX,
  });

  // 4 big red stats
  const stats = [
    { x: 9.514,  y: 6.633, big: "37.4M",  mini: "", caption: "GREATER TOKYO — THE WORLD'S LARGEST METROPOLITAN AREA" },
    { x: 14.569, y: 6.633, big: "2,500",  mini: "", caption: "IZAKAYAS IN SHINJUKU ALONE — ONE FOR EVERY MOOD" },
    { x: 9.514,  y: 8.86,  big: "320",    mini: "km/h", caption: "THE SHINKANSEN, PUNCTUAL TO THE SECOND" },
    { x: 14.569, y: 8.86,  big: "24/7",   mini: "", caption: "RAMEN, VENDING MACHINES, KARAOKE, CONVENIENCE" },
  ];
  for (const st of stats) {
    if (st.mini) {
      s.addText(
        [
          { text: st.big,  options: { fontSize: 69 } },
          { text: st.mini, options: { fontSize: 24 } },
        ],
        {
          x: st.x, y: st.y, w: 4.521, h: 1.0,
          fontFace: F.serif, charSpacing: -0.34, color: C.red, valign: "bottom", ...TX,
        }
      );
    } else {
      s.addText(st.big, {
        x: st.x, y: st.y, w: 4.521, h: 1.0,
        fontFace: F.serif, fontSize: 69, charSpacing: -0.34, color: C.red, ...TX,
      });
    }
    s.addShape("rect", {
      x: st.x, y: st.y + 1.104, w: 4.389, h: 0.01,
      fill: { color: "3A342A" }, line: { type: "none" },
    });
    s.addText(st.caption, {
      x: st.x, y: st.y + 1.261, w: 4.521, h: 0.508,
      fontFace: F.mono, fontSize: 12, charSpacing: 1.92, color: C.taupeMuted, ...TX,
    });
  }
}

// ============================================================
// SLIDE 4 — Heritage: "Temples & tradition."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  pageHeader(s, "04 · HERITAGE", "p. 04 / 08", C.taupe);
  chapterTag(s, 1.042, 1.667, "CH. III · HERITAGE", C.ink);

  // 寺と伝統 (red kanji)
  s.addText("寺と伝統", {
    x: 1.042, y: 2.359, w: 7.858, h: 0.885,
    fontFace: F.jp, fontSize: 40.5, color: C.red, ...TX,
  });

  // Big headline
  s.addText(
    [
      { text: "Temples & ", options: { italic: false } },
      { text: "tradition.",  options: { italic: true  } },
    ],
    {
      x: 1.042, y: 3.328, w: 7.858, h: 2.7,
      fontFace: F.serif, fontSize: 90, charSpacing: -1.8, color: C.ink, ...TX,
    }
  );

  // Italic paragraph (pushed down slightly to clear headline descenders)
  s.addText(
    "In Kyoto alone, sixteen sites are inscribed on the UNESCO register — centuries of lacquered wood, raked gravel, and gold.",
    {
      x: 1.042, y: 6.25, w: 6.867, h: 1.9,
      fontFace: F.serif, fontSize: 24, italic: true, color: C.ink,
      lineSpacingMultiple: 1.2, ...TX,
    }
  );

  // "REGISTRY" label with background band
  s.addShape("rect", {
    x: 4.137, y: 8.42, w: 1.438, h: 0.193,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("REGISTRY", {
    x: 4.283, y: 8.42, w: 1.23, h: 0.234,
    fontFace: F.mono, fontSize: 12, charSpacing: 3.12, color: C.taupe, ...TX,
  });

  // 3 big numbers
  const bigNums = [
    { x: 1.042, big: "1,600",  cap: "TEMPLES IN KYOTO" },
    { x: 3.71,  big: "794",    cap: "YEAR KYOTO WAS FOUNDED" },
    { x: 6.378, big: "10,000", cap: "TORII AT FUSHIMI INARI" },
  ];
  for (const n of bigNums) {
    s.addText(n.big, {
      x: n.x, y: 8.904, w: 2.6, h: 0.833,
      fontFace: F.serif, fontSize: 46, charSpacing: -0.23, color: C.red, ...TX,
    });
    s.addText(n.cap, {
      x: n.x, y: 9.8, w: 2.376, h: 0.6,
      fontFace: F.mono, fontSize: 10.5, charSpacing: 2.1, color: C.taupe, ...TX,
    });
  }

  // Right side: 4 figure panels
  // FIG. I (tall left)
  s.addShape("rect", {
    x: 9.421, y: 1.667, w: 3.609, h: 8.542,
    fill: { color: C.darkDeep, transparency: 94 }, line: { type: "none" },
  });
  figTab(s, 9.63, 1.875, "FIG. I", 0.918, 0.281);

  // 社 badge bottom of FIG. I
  kanjiBadge(s, 12.072, 9.25, "社", 0.75, 24, C.red, C.cream);

  // FIG. II (big top-right)
  s.addShape("rect", {
    x: 13.218, y: 1.667, w: 5.74, h: 4.722,
    fill: { color: C.creamBlush, transparency: 92 }, line: { type: "none" },
  });
  figTab(s, 13.426, 1.875, "FIG. II", 1.029, 0.281);

  // FIG. III
  s.addShape("rect", {
    x: 13.218, y: 6.576, w: 2.776, h: 3.632,
    fill: { color: C.darkDeep, transparency: 95 }, line: { type: "none" },
  });
  figTab(s, 13.426, 6.784, "FIG. III", 1.141, 0.281);

  // FIG. IV
  s.addShape("rect", {
    x: 16.182, y: 6.576, w: 2.776, h: 3.632,
    fill: { color: C.creamAlt, transparency: 92 }, line: { type: "none" },
  });
  figTab(s, 16.39, 6.784, "FIG. IV", 1.029, 0.281);
}

// ============================================================
// SLIDE 5 — Nature: "Mountains, forests, coastlines."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.creamPanel };

  pageHeader(s, "05 · NATURE", "p. 05 / 08", C.taupe);
  chapterTag(s, 1.042, 1.458, "CH. IV · NATURE", C.ink);

  // Big headline
  s.addText(
    [
      { text: "Mountains, forests, ", options: { italic: false, breakLine: true } },
      { text: "coastlines.",          options: { italic: true, color: C.red } },
    ],
    {
      x: 1.042, y: 2.109, w: 13.519, h: 2.7,
      fontFace: F.serif, fontSize: 87, charSpacing: -1.74, color: C.ink,
      lineSpacingMultiple: 1.0, ...TX,
    }
  );

  // Right italic caption
  s.addText(
    "From subtropical reef to boreal snowfield — four climate zones, one archipelago.",
    {
      x: 14.452, y: 3.152, w: 4.506, h: 1.5,
      fontFace: F.serif, fontSize: 21, italic: true, color: C.taupe,
      align: "right", lineSpacingMultiple: 1.2, ...TX,
    }
  );

  // NO. 01 — Mt. Fuji (big tinted panel w/ red circle)
  s.addShape("rect", {
    x: 1.042, y: 4.833, w: 7.464, h: 5.48,
    fill: { color: C.creamBlush, transparency: 92 }, line: { type: "none" },
  });
  s.addShape("ellipse", {
    x: 6.423, y: 5.458, w: 2.917, h: 2.917,
    fill: { color: C.red, transparency: 15 }, line: { type: "none" },
  });
  figTab(s, 1.333, 5.083, "NO. 01 · ICON", 1.85, 0.297);
  s.addText("富士山", {
    x: 1.375, y: 8.453, w: 2.5, h: 0.8,
    fontFace: F.jp, fontSize: 34.5, color: C.cream, ...TX,
  });
  s.addText("Mt. Fuji", {
    x: 1.375, y: 9.172, w: 2.5, h: 0.7,
    fontFace: F.serif, fontSize: 39, italic: true, color: C.cream, ...TX,
  });
  s.addText("3,776 M · HONSHŪ", {
    x: 1.375, y: 9.818, w: 2.5, h: 0.3,
    fontFace: F.mono, fontSize: 10.5, charSpacing: 2.31, color: C.taupe, ...TX,
  });

  // NO. 02 — Arashiyama
  const small = [
    { x: 8.756,  y: 4.833, tint: { color: C.creamAlt,   t: 92 }, num: "NO. 02", jp: "嵐山",    romaji: "Arashiyama", dark: false },
    { x: 8.756,  y: 7.698, tint: { color: C.creamAlt,   t: 92 }, num: "NO. 03", jp: "屋久島",  romaji: "Yakushima",  dark: false },
    { x: 13.982, y: 4.833, tint: { color: C.creamAlt,   t: 92 }, num: "NO. 04", jp: "沖縄",    romaji: "Okinawa",    dark: false },
    { x: 13.982, y: 7.698, tint: { color: C.darkDeep,   t: 96 }, num: "NO. 05", jp: "北海道",  romaji: "Hokkaidō",   dark: true  },
  ];
  for (const c of small) {
    s.addShape("rect", {
      x: c.x, y: c.y, w: 4.976, h: 2.615,
      fill: { color: c.tint.color, transparency: c.tint.t }, line: { type: "none" },
    });
    figTab(s, c.x + 0.187, c.y + 0.187, c.num, 0.825, 0.229);
    const textColor = c.dark ? C.ink : C.cream;
    s.addText(c.jp, {
      x: c.x + 0.208, y: c.y + 1.563, w: 2.0, h: 0.52,
      fontFace: F.jp, fontSize: 21, color: textColor, ...TX,
    });
    s.addText(c.romaji, {
      x: c.x + 0.208, y: c.y + 2.0, w: 2.5, h: 0.46,
      fontFace: F.serif, fontSize: 24, italic: true, color: textColor, ...TX,
    });
  }
}

// ============================================================
// SLIDE 6 — Cuisine: "The table."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  pageHeader(s, "06 · CUISINE", "p. 06 / 08", C.taupe);
  chapterTag(s, 1.042, 1.354, "CH. V · CUISINE", C.ink);

  // 食卓 red (moved slightly up so it doesn't kiss the headline cap-height)
  s.addText("食卓", {
    x: 1.042, y: 1.9, w: 9.074, h: 0.885,
    fontFace: F.jp, fontSize: 40.5, color: C.red, ...TX,
  });

  // "The table." headline — sized so it fits on one line within the left column.
  s.addText("The table.", {
    x: 1.042, y: 3.016, w: 8.0, h: 1.5,
    fontFace: F.serif, fontSize: 78, charSpacing: -1.56, color: C.ink, ...TX,
  });

  // 味 badge — positioned to the right of "The table." on the same baseline.
  kanjiBadge(s, 6.3, 3.185, "味", 1.0, 33, C.red, C.cream);

  // Body paragraph (clears the headline descender)
  s.addText(
    "From three-Michelin kaiseki to a midnight bowl of ramen under a paper lantern — a national obsession with doing one thing perfectly.",
    {
      x: 1.042, y: 4.7, w: 7.725, h: 1.8,
      fontFace: F.serif, fontSize: 22, italic: true, color: C.ink,
      lineSpacingMultiple: 1.2, ...TX,
    }
  );

  // Menu section header
  s.addShape("rect", {
    x: 3.08, y: 6.771, w: 4.732, h: 0.234,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("A TRAVELER'S TASTING MENU · 五品", {
    x: 3.226, y: 6.771, w: 4.582, h: 0.3,
    fontFace: F.mono, fontSize: 12, charSpacing: 3.12, color: C.taupe,
    align: "center", ...TX,
  });

  // Menu rows — fixed 4-column layout: [numeral | EN name | JP kana | right-aligned location]
  const menu = [
    { y: 7.255, sep: 7.75,  rn: "i.",   en: "Sushi",            jp: "寿司",         loc: "TSUKIJI · DAWN"      },
    { y: 7.927, sep: 8.422, rn: "ii.",  en: "Ramen",            jp: "ラーメン",     loc: "FUKUOKA · TONKOTSU"  },
    { y: 8.599, sep: 9.094, rn: "iii.", en: "Kaiseki",          jp: "懐石",         loc: "KYOTO · SEASONAL"    },
    { y: 9.271, sep: 9.766, rn: "iv.",  en: "Okonomiyaki",      jp: "お好み焼き",   loc: "OSAKA · STREET"      },
    { y: 9.943, sep: null,  rn: "v.",   en: "Matcha & wagashi", jp: "抹茶と和菓子", loc: "UJI · AFTERNOON"     },
  ];
  // top rule above first row
  s.addShape("rect", {
    x: 1.042, y: 7.2, w: 8.809, h: 0.01,
    fill: { color: C.ink, transparency: 72 }, line: { type: "none" },
  });
  for (const row of menu) {
    // column 1: roman numeral
    s.addText(row.rn, {
      x: 1.042, y: row.y, w: 0.8, h: 0.44,
      fontFace: F.serif, fontSize: 22.5, italic: true, color: C.red, ...TX,
    });
    // column 2: English (fixed width, so JP in col 3 never overlaps)
    s.addText(row.en, {
      x: 1.917, y: row.y - 0.036, w: 2.9, h: 0.48,
      fontFace: F.serif, fontSize: 25.5, charSpacing: -0.13, color: C.ink, ...TX,
    });
    // column 3: JP kana, starting at fixed x past the EN column
    s.addText(row.jp, {
      x: 4.85, y: row.y + 0.078, w: 2.2, h: 0.32,
      fontFace: F.jp, fontSize: 16.5, color: C.taupe, ...TX,
    });
    // column 4: right-aligned location
    s.addText(row.loc, {
      x: 7.25, y: row.y + 0.16, w: 2.6, h: 0.25,
      fontFace: F.mono, fontSize: 10.5, charSpacing: 2.1, color: C.taupe,
      align: "right", ...TX,
    });
    if (row.sep) {
      s.addShape("rect", {
        x: 1.042, y: row.sep, w: 8.809, h: 0.01,
        fill: { color: C.ink, transparency: 72 }, line: { type: "none" },
      });
    }
  }

  // Right panel
  s.addShape("rect", {
    x: 10.476, y: 0, w: 9.524, h: 11.25,
    fill: { color: C.creamPanel }, line: { type: "none" },
  });
  // Dark-tinted image placeholder
  s.addShape("rect", {
    x: 10.893, y: 0.938, w: 8.066, h: 6.875,
    fill: { color: C.darkDeep, transparency: 94 }, line: { type: "none" },
  });
  // 旬 badge top-right
  kanjiBadge(s, 18.208, 1.271, "旬", 1.0, 33, C.red, C.cream);

  // Reservation card bottom-right (layered)
  s.addShape("rect", {
    x: 10.893, y: 7.896, w: 4.48, h: 2.417,
    fill: { color: C.creamAlt, transparency: 93 },
    line: { color: C.creamPanel, width: 4.5 },
  });
  s.addShape("rect", {
    x: 15.071, y: 7.562, w: 3.887, h: 2.75,
    fill: { color: C.cream }, line: { type: "none" },
    shadow: softShadow(),
  });
  s.addText("COUNTER · 8 SEATS", {
    x: 15.321, y: 7.792, w: 3.489, h: 0.22,
    fontFace: F.mono, fontSize: 9, charSpacing: 2.52, color: C.taupe, ...TX,
  });
  s.addText("Reserved for two.", {
    x: 15.321, y: 8.016, w: 3.489, h: 0.867,
    fontFace: F.serif, fontSize: 27, italic: true, color: C.ink, ...TX,
  });
  s.addText("予約済", {
    x: 15.321, y: 9.646, w: 1.5, h: 0.48,
    fontFace: F.jp, fontSize: 21, color: C.red, ...TX,
  });
  s.addText("19:30\nROW B", {
    x: 18.155, y: 9.723, w: 0.75, h: 0.5,
    fontFace: F.mono, fontSize: 8.25, charSpacing: 1.82, color: C.taupe,
    align: "right", lineSpacingMultiple: 1.1, ...TX,
  });
}

// ============================================================
// SLIDE 7 — Calendar: "Seasons in motion."
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  pageHeader(s, "07 · CALENDAR", "p. 07 / 08", C.taupe);
  chapterTag(s, 1.042, 1.458, "CH. VI · CALENDAR", C.ink);

  // Headline
  s.addText(
    [
      { text: "Seasons ",   options: { italic: false } },
      { text: "in motion.", options: { italic: true, color: C.red } },
    ],
    {
      x: 1.042, y: 2.109, w: 13.898, h: 1.4,
      fontFace: F.serif, fontSize: 87, charSpacing: -1.74, color: C.ink, ...TX,
    }
  );

  // Top-right italic caption
  s.addText(
    "There is no wrong time to visit — only a different country each time.",
    {
      x: 14.952, y: 2.288, w: 4.127, h: 1.0,
      fontFace: F.serif, fontSize: 21, italic: true, color: C.ink,
      align: "right", lineSpacingMultiple: 1.2, ...TX,
    }
  );

  // Four season columns
  const seasons = [
    { x: 1.042,  tint: { c: C.darkDeep, t: 95 }, kanji: "春", rn: "I OF IV",   en: "Spring", romaji: "HARU · 春", range: "MAR–MAY", tag: "Cherry blossom, sake under the trees." },
    { x: 5.594,  tint: { c: C.creamAlt, t: 92 }, kanji: "夏", rn: "II OF IV",  en: "Summer", romaji: "NATSU · 夏", range: "JUN–AUG", tag: "Firework festivals, cicadas, mountain air." },
    { x: 10.146, tint: { c: C.darkDeep, t: 95 }, kanji: "秋", rn: "III OF IV", en: "Autumn", romaji: "AKI · 秋",   range: "SEP–NOV", tag: "Maple fire on every mountainside." },
    { x: 14.698, tint: { c: C.darkDeep, t: 96 }, kanji: "冬", rn: "IV OF IV",  en: "Winter", romaji: "FUYU · 冬",  range: "DEC–FEB", tag: "Onsen in snowfall, powder in Niseko." },
  ];
  for (const sn of seasons) {
    // card body
    s.addShape("rect", {
      x: sn.x, y: 3.679, w: 4.26, h: 4.792,
      fill: { color: sn.tint.c, transparency: sn.tint.t }, line: { type: "none" },
    });
    // kanji circle top-left
    s.addShape("ellipse", {
      x: sn.x + 0.187, y: 3.867, w: 0.542, h: 0.542,
      fill: { color: C.red }, line: { type: "none" },
    });
    s.addText(sn.kanji, {
      x: sn.x + 0.146, y: 3.867, w: 0.625, h: 0.583,
      fontFace: F.jp, fontSize: 19.5, bold: true, color: C.cream,
      align: "center", valign: "middle", ...TX,
    });
    // roman numeral tab top-right
    figTab(s, sn.x + 3.145, 3.867, sn.rn, 1.03, 0.229);

    // Name + romaji + range
    s.addText(sn.en, {
      x: sn.x, y: 8.659, w: 3.2, h: 0.521,
      fontFace: F.serif, fontSize: 34.5, charSpacing: -0.17, color: C.ink, ...TX,
    });
    s.addText(sn.romaji, {
      x: sn.x, y: 9.179, w: 3.2, h: 0.323,
      fontFace: F.jp, fontSize: 13.5, charSpacing: 1.35, color: C.taupe, ...TX,
    });
    s.addText(sn.range, {
      x: sn.x + 3.2, y: 8.94, w: 1.06, h: 0.25,
      fontFace: F.mono, fontSize: 10.5, charSpacing: 2.31, color: C.taupe,
      align: "right", ...TX,
    });
    // tiny red rule
    s.addShape("rect", {
      x: sn.x, y: 9.606, w: 0.417, h: 0.021,
      fill: { color: C.red }, line: { type: "none" },
    });
    // Tagline
    s.addText(sn.tag, {
      x: sn.x, y: 9.752, w: 4.388, h: 0.6,
      fontFace: F.serif, fontSize: 18, italic: true, color: C.ink, ...TX,
    });
  }
}

// ============================================================
// SLIDE 8 — Invitation: "Your journey begins." (red)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.red };

  // Soft off-canvas cream circles (decorative)
  s.addShape("ellipse", {
    x: -3.125, y: 4.375, w: 10.0, h: 10.0,
    fill: { color: C.cream, transparency: 92 }, line: { type: "none" },
  });
  s.addShape("ellipse", {
    x: -2.292, y: 5.208, w: 8.333, h: 8.333,
    fill: { color: C.cream, transparency: 92 }, line: { type: "none" },
  });
  // Darker circle top-right
  s.addShape("ellipse", {
    x: 16.042, y: -1.875, w: 5.833, h: 5.833,
    fill: { color: C.ink, transparency: 90 }, line: { type: "none" },
  });

  // Header (cream). Muted tones are pre-computed (cream over red bg, ~75% opacity ≈ D9A799).
  s.addText("08 · INVITATION", {
    x: 0.833, y: 0.583, w: 4.0, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 3.51,
    color: "D9A799", ...TX,
  });
  s.addText("p. 08 / 08", {
    x: 17.5, y: 0.583, w: 2.0, h: 0.255,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 1.89,
    color: "D9A799", align: "right", ...TX,
  });

  // Japanese kicker
  s.addText("さあ、出かけよう。", {
    x: 1.042, y: 1.375, w: 6.0, h: 0.8,
    fontFace: F.jp, fontSize: 36, color: C.cream, ...TX,
  });

  // Inverted 旅 badge (cream bg, red kanji)
  kanjiBadge(s, 16.015, 1.25, "旅", 1.0, 33, C.cream, C.red);
  s.addText("CHAPTER · END FIN — PART ONE", {
    x: 17.1, y: 1.56, w: 2.8, h: 0.5,
    fontFace: F.mono, fontSize: 9, charSpacing: 2.34,
    color: "E4C2B9", lineSpacingMultiple: 1.15, ...TX,
  });

  // Small "— AND SO —"
  s.addText("— AND SO —", {
    x: 1.042, y: 2.9, w: 5.0, h: 0.3,
    fontFace: F.mono, fontSize: 13.5, charSpacing: 4.05,
    color: "E4C2B9", ...TX,
  });

  // GIANT headline
  s.addText(
    [
      { text: "Your journey ", options: { italic: false, breakLine: true } },
      { text: "begins.",        options: { italic: true  } },
    ],
    {
      x: 1.042, y: 3.364, w: 18.454, h: 4.5,
      fontFace: F.serif, fontSize: 165, charSpacing: -4.12, color: C.cream,
      lineSpacingMultiple: 1.0, ...TX,
    }
  );

  // Horizontal rule
  s.addShape("rect", {
    x: 1.042, y: 7.855, w: 14.583, h: 0.01,
    fill: { color: C.cream, transparency: 50 }, line: { type: "none" },
  });

  // Subtitle
  s.addText(
    "Eight slides, one invitation. The rest is a plane ticket.",
    {
      x: 1.042, y: 8.199, w: 12.875, h: 0.6,
      fontFace: F.serif, fontSize: 30, italic: true, color: C.cream, ...TX,
    }
  );

  // Bottom rows: FLIGHT / STAY / CURRENCY — spaced wider so "¥ Japanese yen" fits on one line.
  const bottom = [
    { x: 1.042,  label: "— FLIGHT —",   value: "SFO → HND",      caption: "11h 20m · direct" },
    { x: 4.5,    label: "— STAY —",     value: "10–14 days",     caption: "Tokyo · Kyoto · Osaka" },
    { x: 8.0,    label: "— CURRENCY —", value: "¥ Japanese yen", caption: "Visa-free, 90 days" },
  ];
  for (const b of bottom) {
    s.addText(b.label, {
      x: b.x, y: 9.391, w: 3.4, h: 0.25,
      fontFace: F.mono, fontSize: 10.5, charSpacing: 2.73,
      color: "D9A799", ...TX,
    });
    s.addText(b.value, {
      x: b.x, y: 9.656, w: 3.4, h: 0.55,
      fontFace: F.serif, fontSize: 27, charSpacing: -0.13, color: C.cream, ...TX,
    });
    s.addText(b.caption, {
      x: b.x, y: 10.23, w: 3.4, h: 0.25,
      fontFace: F.mono, fontSize: 10.5, charSpacing: 1.26,
      color: "E4C2B9", ...TX,
    });
  }

  // Bottom-right "ありがとう / THANK YOU"
  s.addText("ありがとう", {
    x: 17.208, y: 9.609, w: 2.3, h: 0.542,
    fontFace: F.jp, fontSize: 24, color: C.cream, align: "right", ...TX,
  });
  s.addText("THANK YOU", {
    x: 17.208, y: 10.151, w: 2.3, h: 0.25,
    fontFace: F.mono, fontSize: 10.5, charSpacing: 2.94,
    color: "D9A799", align: "right", ...TX,
  });
}

// ---------- write file ----------
pres.writeFile({ fileName: "japan.pptx" }).then((fn) => {
  console.log("Wrote " + fn);
});
