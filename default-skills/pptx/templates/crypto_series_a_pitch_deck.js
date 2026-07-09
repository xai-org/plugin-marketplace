/*
 * NEONGRID — Tron-themed Series A pitch deck
 * Complete rewrite faithful to the reference. Standalone pptxgenjs script.
 * Run: `node build-tron.js`  → produces Tron.pptx
 *
 * Reference canvas: 20.0" × 11.25" (custom 16:9 wide, NOT pptxgenjs LAYOUT_WIDE)
 */

const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// PALETTE (extracted from reference deck XML)
// ---------------------------------------------------------------------------
const C = {
  bg:        "05070D",   // deep navy near-black
  bgPanel:   "0A111A",   // slightly lighter (cards on slide 5/8)
  cyan:      "00F0FF",   // neon cyan (primary accent)
  cyanGlow:  "00F0FF",   // for glow color
  cyanDim:   "1A8A8E",   // dim cyan for radar lines
  cyanDeep:  "0A2A30",   // very dark teal (grid empty cells)
  cyanFill:  "0E7C84",   // mid teal (active grid cells)
  magenta:   "FF2BD6",   // neon magenta accent
  magentaDim:"7A2050",
  white:     "E8F6FF",   // soft white
  pureWhite: "FFFFFF",
  fgDim:     "6B7A92",   // muted slate (chrome / footers)
  fgFaint:   "3A4555",   // very muted
  fgMid:     "9AAAB8",
};

const FONT = "Arial";
// Subheading font — Cascadia Code (regular weight). Quirkier monospace look
// than Arial Bold for tags/eyebrows/section labels. PowerPoint and modern
// Windows ship this; falls back gracefully on systems without it.
const SUBFONT = "Cascadia Code";

// 20.0" × 11.25" canvas
const SLIDE_W = 20.0;
const SLIDE_H = 11.25;

// ---------------------------------------------------------------------------
// NEON SHADOW FACTORIES
// The reference deck uses tightly-blurred outerShdw on virtually every shape:
//   blurRad=57150 EMU = 4.5 pt, dist=50800 EMU = 4 pt, dir=270° (upward),
//   alpha 100% — color = the shape's own color.
// pptxgenjs mutates option objects in place, so each shape needs a fresh one.
// ---------------------------------------------------------------------------
const shadowSpec = (color, opts) => {
  opts = opts || {};
  return {
    type: "outer",
    color: color,
    blur: opts.blur != null ? opts.blur : 4.5,   // pt
    offset: opts.offset != null ? opts.offset : 4, // pt (must be non-negative)
    angle: 270,                                   // shadow falls upward
    opacity: opts.opacity != null ? opts.opacity : 1.0,
  };
};
const cyanShadow    = (opts) => shadowSpec(C.cyan,    opts);
const magentaShadow = (opts) => shadowSpec(C.magenta, opts);
const whiteShadow   = (opts) => shadowSpec(C.cyan,    opts); // white text glows cyan in this deck

const pres = new pptxgen();
pres.defineLayout({ name: "TRON", width: SLIDE_W, height: SLIDE_H });
pres.layout = "TRON";
pres.title = "NeonGrid — Series A";
pres.author = "Gridline Ventures";

// ---------------------------------------------------------------------------
// CHROME — top/bottom L-brackets, top tags, footer, page number.
// Reference: brackets are drawn as two short LINEs in the top/bottom corners
// at exact 0.4" inset.
// ---------------------------------------------------------------------------
function addChrome(slide, opts) {
  opts = opts || {};
  slide.background = { color: C.bg };

  const inset = 0.45;
  const armLen = 0.30;

  // Top-left
  slide.addShape(pres.shapes.LINE, {
    x: inset, y: inset, w: armLen, h: 0,
    line: { color: C.fgDim, width: 1.0 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: inset, y: inset, w: 0, h: armLen,
    line: { color: C.fgDim, width: 1.0 },
  });
  // Top-right
  slide.addShape(pres.shapes.LINE, {
    x: SLIDE_W - inset - armLen, y: inset, w: armLen, h: 0,
    line: { color: C.fgDim, width: 1.0 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: SLIDE_W - inset, y: inset, w: 0, h: armLen,
    line: { color: C.fgDim, width: 1.0 },
  });
  // Bottom-left
  slide.addShape(pres.shapes.LINE, {
    x: inset, y: SLIDE_H - inset, w: armLen, h: 0,
    line: { color: C.fgDim, width: 1.0 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: inset, y: SLIDE_H - inset - armLen, w: 0, h: armLen,
    line: { color: C.fgDim, width: 1.0 },
  });
  // Bottom-right
  slide.addShape(pres.shapes.LINE, {
    x: SLIDE_W - inset - armLen, y: SLIDE_H - inset, w: armLen, h: 0,
    line: { color: C.fgDim, width: 1.0 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: SLIDE_W - inset, y: SLIDE_H - inset - armLen, w: 0, h: armLen,
    line: { color: C.fgDim, width: 1.0 },
  });

  // Top-left tag
  if (opts.tagL) {
    slide.addText(opts.tagL, {
      x: 0.95, y: 0.32, w: 9, h: 0.4,
      fontFace: FONT, fontSize: 11, color: C.fgDim,
      charSpacing: 6, align: "left", valign: "middle", margin: 0,
    });
  }
  // Top-right tag
  if (opts.tagR) {
    slide.addText(opts.tagR, {
      x: SLIDE_W - 9.95, y: 0.32, w: 9, h: 0.4,
      fontFace: FONT, fontSize: 11, color: C.fgDim,
      charSpacing: 6, align: "right", valign: "middle", margin: 0,
    });
  }
  // Bottom-left footer
  if (opts.footL) {
    slide.addText(opts.footL, {
      x: 0.95, y: SLIDE_H - 0.62, w: 9, h: 0.32,
      fontFace: FONT, fontSize: 10, color: C.fgDim,
      charSpacing: 5, align: "left", valign: "middle", margin: 0,
    });
  }
  // Bottom-right page number
  if (opts.pageN) {
    const parts = opts.pageN.split("/");
    slide.addText(
      [
        { text: parts[0].trim(), options: { color: C.fgMid, bold: true } },
        { text: "  /  " + parts[1].trim(), options: { color: C.fgFaint } },
      ],
      {
        x: SLIDE_W - 1.95, y: SLIDE_H - 0.62, w: 1.4, h: 0.32,
        fontFace: FONT, fontSize: 13, charSpacing: 2,
        align: "right", valign: "middle", margin: 0,
      }
    );
  }
}

// Section eyebrow ("PROBLEM", "RAILS", etc.) below the top chrome
function addEyebrow(slide, text, color) {
  slide.addText(text, {
    x: 1.4, y: 1.05, w: 6, h: 0.4,
    fontFace: SUBFONT, fontSize: 18, bold: true,
    color: color || C.cyan,
    align: "left", valign: "middle", margin: 0,
  });
}

// Scattered "stars" — small dots all over the slide.
// Reference uses tiny opaque rects with a tight neon drop shadow,
// which is what gives the dots a luminous halo rather than flat dot look.
// Use a tiny offset so the halo is symmetrical (not a streak).
function addStars(slide, seed, density) {
  density = density || 60;
  let s = seed || 1;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < density; i++) {
    const x = 0.6 + rand() * (SLIDE_W - 1.2);
    const y = 0.6 + rand() * (SLIDE_H - 1.2);
    const r = 0.020 + rand() * 0.040;
    const isMag = rand() < 0.18;
    const color = isMag ? C.magenta : C.cyan;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: r, h: r,
      fill: { color: color, transparency: 30 + rand() * 30 },
      line: { type: "none" },
      shadow: shadowSpec(color, { blur: 3, offset: 0.5, opacity: 0.7 }),
    });
  }
}

// Dashed concentric radar circles (decorative)
function addRadar(slide, cx, cy, baseR, opts) {
  opts = opts || {};
  const radii = opts.radii || [baseR * 0.30, baseR * 0.55, baseR * 0.78, baseR];
  for (const r of radii) {
    slide.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2,
      fill: { type: "none" },
      line: { color: C.cyanDim, width: 0.75, dashType: "dash", transparency: 35 },
    });
  }
  if (opts.crosshair !== false) {
    slide.addShape(pres.shapes.LINE, {
      x: cx - baseR, y: cy, w: baseR * 2, h: 0,
      line: { color: C.cyanDim, width: 0.5, transparency: 65 },
    });
    slide.addShape(pres.shapes.LINE, {
      x: cx, y: cy - baseR, w: 0, h: baseR * 2,
      line: { color: C.cyanDim, width: 0.5, transparency: 65 },
    });
  }
}

// =========================================================================
// SLIDE 1 — TITLE
// =========================================================================
function slide01() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "NEONGRID // MARKETS — SERIES A",
    tagR: "CONFIDENTIAL · GRIDLINE VENTURES · 04 / 27 / 2026",
    footL: "LAT 00.00MS · UPLINK STABLE",
    pageN: "01 / 10",
  });

  // Massive radar centered, slightly above center
  addRadar(s, SLIDE_W / 2, 6.0, 4.0, { radii: [1.2, 2.2, 3.2, 4.0] });
  addStars(s, 7, 90);

  // SYS::ONLINE strip (above the title)
  s.addText("SYS::ONLINE  ·  GRID-AUTH OK  ·  USER 0X7F2C", {
    x: 0, y: 4.2, w: SLIDE_W, h: 0.5,
    fontFace: FONT, fontSize: 18, color: C.cyan, bold: true,
    charSpacing: 8, align: "center", valign: "middle", margin: 0,
  });

  // NEONGRID — soft cyan halo (matches reference: blur 18pt, alpha 55%)
  s.addText(
    [
      { text: "NEON", options: { color: C.white,
        shadow: cyanShadow({ blur: 18, opacity: 0.55 }) } },
      { text: "GRID", options: { color: C.cyan,
        shadow: cyanShadow({ blur: 18, opacity: 0.55 }) } },
    ],
    {
      x: 0, y: 4.7, w: SLIDE_W, h: 1.8,
      fontFace: FONT, fontSize: 130, bold: false,
      charSpacing: 1, align: "center", valign: "middle", margin: 0,
    }
  );

  // Tagline
  s.addText(
    "A gamified trading and settlement layer for the next\ngeneration of digital assets.",
    {
      x: 2.5, y: 6.7, w: SLIDE_W - 5.0, h: 1.4,
      fontFace: FONT, fontSize: 30, color: C.white,
      align: "center", valign: "middle", margin: 0,
    }
  );

  // SERIES A · $12M · 2026
  s.addText(
    [
      { text: "SERIES A",        options: { color: C.fgMid } },
      { text: "      ·      ",   options: { color: C.cyanDim } },
      { text: "$12M",            options: { color: C.fgMid } },
      { text: "      ·      ",   options: { color: C.cyanDim } },
      { text: "2026",            options: { color: C.fgMid } },
    ],
    {
      x: 0, y: 8.4, w: SLIDE_W, h: 0.5,
      fontFace: FONT, fontSize: 16, bold: true, charSpacing: 12,
      align: "center", valign: "middle", margin: 0,
    }
  );
}

// =========================================================================
// SLIDE 2 — THESIS
// =========================================================================
function slide02() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "02 // THESIS",
    tagR: "WHY NOW",
    footL: "NEONGRID.MARKETS",
    pageN: "02 / 10",
  });
  addEyebrow(s, "THESIS", C.cyan);
  addStars(s, 13, 70);

  // Headline (about 65% of slide width, large)
  s.addText(
    [
      { text: "The next 100M retail investors will not arrive through a ",
        options: { color: C.white } },
      { text: "spreadsheet.", options: { color: C.fgDim } },
      { text: " They will arrive through a ", options: { color: C.white } },
      { text: "grid.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.7, w: SLIDE_W - 2.8, h: 4.0,
      fontFace: FONT, fontSize: 60, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Divider line above the 3 columns
  s.addShape(pres.shapes.LINE, {
    x: 1.4, y: 8.4, w: SLIDE_W - 2.8, h: 0,
    line: { color: C.cyanDim, width: 0.75, transparency: 40 },
  });

  // Three columns
  const colW = (SLIDE_W - 2.8 - 0.6) / 3;
  const colY = 8.7;
  const cols = [
    { tag: "01 / RAILS",     body: "Tokenized equities, FX and yield are no longer a thesis — they are settling on-chain today." },
    { tag: "02 / INTERFACE", body: "A generation that grew up inside game UIs will not tolerate the chartbook of 2009." },
    { tag: "03 / TRUST",     body: "Post-FTX, the winning venue is the one that makes settlement legible — not the one that hides it." },
  ];
  cols.forEach((c, i) => {
    const cx = 1.4 + i * (colW + 0.3);
    s.addText(c.tag, {
      x: cx, y: colY, w: colW, h: 0.4,
      fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(c.body, {
      x: cx, y: colY + 0.55, w: colW, h: 1.5,
      fontFace: FONT, fontSize: 16, color: C.white,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 3 — PROBLEM
// =========================================================================
function slide03() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "03 // PROBLEM",
    tagR: "MARKET STRUCTURE — DEGRADED",
    footL: "NEONGRID.MARKETS",
    pageN: "03 / 10",
  });
  addEyebrow(s, "PROBLEM", C.magenta);
  addStars(s, 19, 75);

  // Headline (left half)
  s.addText(
    [
      { text: "Retail trades a\n", options: { color: C.white } },
      { text: "simulation",
        options: { color: C.magenta,
                   shadow: magentaShadow() } },
      { text: " of a\nmarket.",  options: { color: C.white } },
    ],
    {
      x: 1.4, y: 1.8, w: 9.5, h: 4.5,
      fontFace: FONT, fontSize: 78, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Sub-text (lower-left)
  s.addText(
    "Order routing, latency, settlement, and inventory are\nabstracted away — and so is investor trust.",
    {
      x: 1.4, y: 9.0, w: 9, h: 1.2,
      fontFace: FONT, fontSize: 18, color: C.fgMid,
      align: "left", valign: "top", margin: 0,
    }
  );

  // ----- Right: failure stack -----
  const rX = 10.2, rW = SLIDE_W - 11.6;
  s.addText("FAILURE STACK / RETAIL VENUES 2024–26", {
    x: rX, y: 2.05, w: rW, h: 0.4,
    fontFace: SUBFONT, fontSize: 18, color: C.fgMid, bold: true,
    align: "left", valign: "middle", margin: 0,
  });

  const items = [
    { tag: "L01", title: "Opaque order flow",                  body: "Retail price worse than displayed quote ~63% of trades.", metric: "▲ 0.42%" },
    { tag: "L02", title: "T+1 settlement on T+0 expectations", body: "Funds frozen for hours; inventory invisible to the buyer.", metric: "+22h" },
    { tag: "L03", title: "Custody — black box",                body: "User cannot prove what is held on their behalf.",          metric: "∅ proof" },
    { tag: "L04", title: "Interface — designed for 2010",      body: "Watchlist + candle chart. No spatial reasoning, no market texture.", metric: "UX • F" },
  ];
  const cardH = 1.45, cardGap = 0.25;
  items.forEach((it, i) => {
    const y = 2.7 + i * (cardH + cardGap);
    // Subtle card outline (no fill)
    s.addShape(pres.shapes.RECTANGLE, {
      x: rX, y: y, w: rW, h: cardH,
      fill: { type: "none" },
      line: { color: C.cyanDim, width: 0.75, transparency: 40 },
    });
    // Tag (magenta)
    s.addText(it.tag, {
      x: rX + 0.3, y: y, w: 1.0, h: cardH,
      fontFace: SUBFONT, fontSize: 18, color: C.magenta, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    // Title
    s.addText(it.title, {
      x: rX + 1.4, y: y + 0.18, w: rW - 3.6, h: 0.55,
      fontFace: FONT, fontSize: 21, color: C.white, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    // Body
    s.addText(it.body, {
      x: rX + 1.4, y: y + 0.78, w: rW - 3.6, h: 0.55,
      fontFace: FONT, fontSize: 14, color: C.fgMid,
      align: "left", valign: "middle", margin: 0,
    });
    // Metric (magenta, right)
    s.addText(it.metric, {
      x: rX + rW - 2.2, y: y, w: 2.0, h: cardH,
      fontFace: FONT, fontSize: 18, color: C.magenta, bold: true,
      align: "right", valign: "middle", margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 4 — PRODUCT (terrain)
// Reference: terrain panel ~60% width, top half of content area; cells have
// gaps between them; bottom half of slide is empty space with stars
// =========================================================================
function slide04() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "04 // PRODUCT",
    tagR: "THE GRID — MARKET AS TERRAIN",
    footL: "NEONGRID.MARKETS",
    pageN: "04 / 10",
  });
  addEyebrow(s, "PRODUCT", C.cyan);
  addStars(s, 23, 95);

  // Headline (full-width)
  s.addText(
    [
      { text: "Every asset is a ", options: { color: C.white } },
      { text: "cell.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
      { text: " Every trade is a ", options: { color: C.white } },
      { text: "vector.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.7, w: SLIDE_W - 2.8, h: 1.4,
      fontFace: FONT, fontSize: 60, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // ---- Terrain panel (left ~60%) ----
  const tx = 1.4, ty = 3.5, tw = 10.4, th = 4.7;

  // Header row of the panel: NEONGRID // LIVE TERRAIN  ........  SECTORS · 64 · TICK 12ms
  s.addText(
    [
      { text: "▸  ",                  options: { color: C.cyan } },
      { text: "NEONGRID",             options: { color: C.cyan, bold: true } },
      { text: " // LIVE TERRAIN",     options: { color: C.white, bold: true } },
    ],
    {
      x: tx, y: ty, w: 6, h: 0.4,
      fontFace: SUBFONT, fontSize: 18,
      align: "left", valign: "middle", margin: 0,
    }
  );
  s.addText("SECTORS · 64 · TICK 12ms", {
    x: tx + tw - 4.5, y: ty, w: 4.5, h: 0.4,
    fontFace: SUBFONT, fontSize: 16, color: C.fgMid, bold: true,
    align: "right", valign: "middle", margin: 0,
  });

  // Grid: 12 cols × 6 rows of taller-than-wide cells, with visible gaps
  const gx = tx, gy = ty + 0.6, gw = tw, gh = th - 1.0;
  const cols = 12, rows = 6;
  const gap = 0.05;
  const cw = (gw - (cols - 1) * gap) / cols;
  const ch = (gh - (rows - 1) * gap) / rows;

  // Cell pattern: 0=empty(very dim), 1=teal-dim, 2=teal-bright, 3=magenta
  const pattern = [
    [0,0,0,3,1,2,2,1,0,0,3,0],
    [0,0,1,1,0,2,1,2,0,0,0,0],
    [0,0,3,1,0,0,1,0,0,0,1,2],
    [2,3,3,1,2,1,0,3,1,0,1,2],
    [0,0,1,2,3,3,2,3,1,0,1,0],
    [3,1,2,3,2,0,0,1,2,0,0,2],
  ];
  const labels = {
    "0,3":  "NVD",
    "1,7":  "SOL",
    "3,1":  "ETH",
    "4,6":  "BTC",
    "5,11": "OIL",
  };
  // Which labeled cells get a brighter "active" highlight
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = pattern[r][c];
      let fill;
      if (v === 0)      fill = C.cyanDeep;
      else if (v === 1) fill = C.cyanFill;
      else if (v === 2) fill = C.cyanFill;
      else              fill = C.magentaDim;
      const cellX = gx + c * (cw + gap);
      const cellY = gy + r * (ch + gap);
      s.addShape(pres.shapes.RECTANGLE, {
        x: cellX, y: cellY, w: cw, h: ch,
        fill: { color: fill, transparency: v === 0 ? 0 : (v === 2 ? 0 : 25) },
        line: { type: "none" },
      });
      const key = r + "," + c;
      if (labels[key]) {
        s.addText(labels[key], {
          x: cellX, y: cellY, w: cw, h: ch,
          fontFace: FONT, fontSize: 11, color: C.white, bold: true,
          charSpacing: 1, align: "center", valign: "middle", margin: 0,
        });
      }
    }
  }

  // Bottom strip: small orange marker + DEPTH, then VOL +18.2% / VOL -3.4%
  const bsy = gy + gh + 0.2;
  // Orange chip for depth (with matching orange halo)
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: bsy + 0.06, w: 0.18, h: 0.18,
    fill: { color: "FF8A1F" }, line: { type: "none" },
    shadow: shadowSpec("FF8A1F"),
  });
  s.addText("DEPTH", {
    x: tx + 0.3, y: bsy, w: 1.5, h: 0.32,
    fontFace: SUBFONT, fontSize: 16, color: C.cyan, bold: true,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("VOL +18.2% ▲", {
    x: tx + 4.0, y: bsy, w: 2.6, h: 0.32,
    fontFace: SUBFONT, fontSize: 16, color: C.cyan, bold: true,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("VOL -3.4% ▼", {
    x: tx + tw - 2.8, y: bsy, w: 2.7, h: 0.32,
    fontFace: SUBFONT, fontSize: 16, color: C.magenta, bold: true,
    align: "right", valign: "middle", margin: 0,
  });

  // ---- Right column: 4 features ----
  const fx = 13.2, fW = SLIDE_W - 14.6;
  const features = [
    { t: "TERRAIN",  b: "A spatial map of the entire market — flow, volatility and depth as a single picture." },
    { t: "MISSIONS", b: "Quests teach hedging, basis, options — earned, not lectured." },
    { t: "LEDGER",   b: "Every position is a verifiable on-chain claim — visible inside the same UI." },
    { t: "GUILD",    b: "Strategies and order books shared across player-run cohorts." },
  ];
  // Distribute features vertically across the right column
  const fStart = 3.5, fEnd = SLIDE_H - 1.3;
  const fSpace = (fEnd - fStart) / features.length;
  features.forEach((f, i) => {
    const fy = fStart + i * fSpace;
    s.addText("▸  " + f.t, {
      x: fx, y: fy, w: fW, h: 0.4,
      fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(f.b, {
      x: fx, y: fy + 0.55, w: fW, h: 1.1,
      fontFace: FONT, fontSize: 16, color: C.white,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 5 — EXPERIENCE
// Reference: 4 tall step cards (very tall, mostly empty), captions BELOW the cards
// =========================================================================
function slide05() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "05 // EXPERIENCE",
    tagR: "USER FLOW — A 90-SECOND TRADE",
    footL: "NEONGRID.MARKETS",
    pageN: "05 / 10",
  });
  addEyebrow(s, "EXPERIENCE", C.cyan);

  // Headline
  s.addText(
    [
      { text: "From login to settled position — ", options: { color: C.white } },
      { text: "in one screen.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.7, w: SLIDE_W - 2.8, h: 1.3,
      fontFace: FONT, fontSize: 54, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // 4 tall step cards
  const steps = [
    { label: "STEP / 01", header: "AUTH · KEY 0x7F2C",       kind: "auth",
      caption: "Onboard with passkey + ZK-proof of accreditation." },
    { label: "STEP / 02", header: "TERRAIN · 64 SECTORS",    kind: "terrain",
      caption: "Read the terrain — see flow, depth, volatility." },
    { label: "STEP / 03", header: "ORDER · NVD-X",           kind: "order",
      caption: "Aim a vector — size, slippage, edge made visible." },
    { label: "STEP / 04", header: "SETTLED · BLOCK 18204901",kind: "settled",
      caption: "Settled on-chain — proof and XP, in the same view." },
  ];

  const cardW = (SLIDE_W - 2.8 - 0.6 * 3) / 4;
  const cardX0 = 1.4;
  const cardY  = 4.0;
  const cardH  = 5.6;

  // Stars only inside the card area (each card gets some)
  steps.forEach((step, i) => {
    const cx = cardX0 + i * (cardW + 0.6);

    // STEP / 0X label (above card)
    s.addText(step.label, {
      x: cx, y: cardY - 0.45, w: cardW, h: 0.4,
      fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
      align: "left", valign: "middle", margin: 0,
    });

    // The card — very subtle bgPanel fill, hairline border
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.bgPanel, transparency: 30 },
      line: { color: C.cyanDim, width: 0.75, transparency: 60 },
    });

    // Hexagon icon (using a small rotated rectangle as a simple glyph)
    // Using OVAL outline for the icon to keep it simple
    s.addShape(pres.shapes.OVAL, {
      x: cx + 0.25, y: cardY + 0.27, w: 0.32, h: 0.32,
      fill: { type: "none" }, line: { color: C.cyan, width: 1 },
    });
    // Header text inside card
    s.addText(step.header, {
      x: cx + 0.75, y: cardY + 0.22, w: cardW - 0.9, h: 0.4,
      fontFace: SUBFONT, fontSize: 14, color: C.cyan, bold: true,
      align: "left", valign: "middle", margin: 0,
    });

    // Some scattered stars inside this card
    addCardStars(s, cx + 0.2, cardY + 1.2, cardW - 0.4, cardH - 1.6, 100 + i);

    // ---- Uniform zones across all 4 cards ----
    // visualY: top of main visual (~1.0)
    // labelY:  top of secondary label (~4.0)
    // bottomY: top of final element (button/badge) (~4.6)
    const visualY = cardY + 1.0;
    const labelY  = cardY + 4.0;
    const bottomY = cardY + 4.7;

    if (step.kind === "auth") {
      // Bigger key glyph: 1.8" x 1.8" outlined square, centered in visual zone,
      // with a glowing center pip
      const glyphSize = 1.8;
      const kcx = cx + cardW / 2;
      const kcy = visualY + 1.4; // center of visual zone
      s.addShape(pres.shapes.RECTANGLE, {
        x: kcx - glyphSize/2, y: kcy - glyphSize/2,
        w: glyphSize, h: glyphSize,
        fill: { type: "none" }, line: { color: C.cyanDim, width: 1.25 },
      });
      // Inner outline (decorative — gives more "scanning frame" feel)
      s.addShape(pres.shapes.RECTANGLE, {
        x: kcx - glyphSize/2 + 0.18, y: kcy - glyphSize/2 + 0.18,
        w: glyphSize - 0.36, h: glyphSize - 0.36,
        fill: { type: "none" },
        line: { color: C.cyanDim, width: 0.5, dashType: "dash", transparency: 50 },
      });
      // Center pip (the "key" being scanned)
      s.addShape(pres.shapes.RECTANGLE, {
        x: kcx - 0.16, y: kcy - 0.16, w: 0.32, h: 0.32,
        fill: { color: C.cyan },
        line: { type: "none" },
        shadow: cyanShadow(),
      });
      // Bottom label
      s.addText("SCANNING IDENTITY", {
        x: cx, y: labelY, w: cardW, h: 0.4,
        fontFace: SUBFONT, fontSize: 14, color: C.fgMid, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      s.addText("·  ·  ·  ·  ·  ·  ·  ·  ·", {
        x: cx, y: labelY + 0.4, w: cardW, h: 0.3,
        fontFace: FONT, fontSize: 14, color: C.cyanDim,
        align: "center", valign: "middle", margin: 0,
      });
    }

    if (step.kind === "terrain") {
      // mini 6×3 grid sized to fill the visual zone
      const gxm = cx + 0.4, gym = visualY + 0.4;
      const gwm = cardW - 0.8, ghm = 2.1;
      const mc = 6, mr = 3, mgap = 0.06;
      const mcw = (gwm - (mc - 1) * mgap) / mc;
      const mch = (ghm - (mr - 1) * mgap) / mr;
      const mpat = [
        [1,1,3,0,1,0],
        [0,3,1,2,0,1],
        [0,1,2,3,0,1],
      ];
      for (let r = 0; r < mr; r++) {
        for (let c = 0; c < mc; c++) {
          const v = mpat[r][c];
          let fc;
          if (v === 0) fc = C.cyanDeep;
          else if (v === 1) fc = C.cyanFill;
          else if (v === 2) fc = C.cyanFill;
          else fc = C.magentaDim;
          s.addShape(pres.shapes.RECTANGLE, {
            x: gxm + c * (mcw + mgap), y: gym + r * (mch + mgap),
            w: mcw, h: mch,
            fill: { color: fc, transparency: v === 2 ? 0 : (v === 0 ? 0 : 25) },
            line: { type: "none" },
          });
        }
      }
      // Bottom label zone
      s.addText("SCANNING FLOW…", {
        x: cx + 0.3, y: labelY, w: cardW - 0.6, h: 0.35,
        fontFace: SUBFONT, fontSize: 14, color: C.fgMid, bold: true,
        align: "left", valign: "middle", margin: 0,
      });
      s.addText("▸  HOT: TECH-SC · NRG-OIL", {
        x: cx + 0.3, y: labelY + 0.4, w: cardW - 0.6, h: 0.35,
        fontFace: SUBFONT, fontSize: 13, color: C.cyan, bold: true,
        align: "left", valign: "middle", margin: 0,
      });
    }

    if (step.kind === "order") {
      s.addText("VECTOR", {
        x: cx + 0.3, y: visualY, w: cardW - 0.6, h: 0.35,
        fontFace: SUBFONT, fontSize: 14, color: C.fgMid, bold: true,
        align: "left", valign: "middle", margin: 0,
      });
      // Vector arrow (positive line, slope upward via flipV)
      s.addShape(pres.shapes.LINE, {
        x: cx + 0.3, y: visualY + 0.4, w: cardW - 0.6, h: 0.6,
        flipV: true,
        line: { color: C.cyan, width: 2.5, endArrowType: "triangle" },
        shadow: cyanShadow(),
      });
      // Stats row
      const sy = visualY + 1.4;
      const sw = (cardW - 0.6) / 3;
      [
        { l: "SIZE", v: "12.40", c: C.white },
        { l: "SLIP", v: "0.03%", c: C.white },
        { l: "EDGE", v: "+18b",  c: C.cyan  },
      ].forEach((st, j) => {
        const sx = cx + 0.3 + j * sw;
        s.addText(st.l, {
          x: sx, y: sy, w: sw, h: 0.3,
          fontFace: SUBFONT, fontSize: 12, color: C.fgMid, bold: true,
          align: "left", valign: "middle", margin: 0,
        });
        s.addText(st.v, {
          x: sx, y: sy + 0.32, w: sw, h: 0.4,
          fontFace: FONT, fontSize: 17, color: st.c, bold: true,
          align: "left", valign: "middle", margin: 0,
        });
      });
      // FIRE VECTOR button — bumped up ~13pt (0.18") for better visual alignment
      const buttonY = bottomY - 0.18;
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + 0.3, y: buttonY, w: cardW - 0.6, h: 0.6,
        fill: { color: C.cyanDeep }, line: { color: C.cyan, width: 1 },
        shadow: cyanShadow(),
      });
      s.addText("▸  FIRE VECTOR", {
        x: cx + 0.3, y: buttonY, w: cardW - 0.6, h: 0.6,
        fontFace: SUBFONT, fontSize: 16, color: C.cyan, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    if (step.kind === "settled") {
      // +12.40 — top of visual zone
      s.addText("+12.40", {
        x: cx, y: visualY, w: cardW, h: 1.0,
        fontFace: FONT, fontSize: 56, color: C.cyan, bold: false,
        shadow: cyanShadow(),
        align: "center", valign: "middle", margin: 0,
      });
      s.addText("NVD-X · CUSTODY 0x91A…", {
        x: cx, y: visualY + 1.0, w: cardW, h: 0.3,
        fontFace: SUBFONT, fontSize: 13, color: C.fgMid, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      // PROOF box — middle of card
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx + 0.4, y: visualY + 1.5, w: cardW - 0.8, h: 0.95,
        fill: { type: "none" }, line: { color: C.cyanDim, width: 1 },
      });
      s.addText(
        [
          { text: "PROOF\n", options: { color: C.fgMid, fontSize: 11 } },
          { text: "0x9c4a…f8b2 ✓", options: { color: C.cyan, fontSize: 14 } },
        ],
        {
          x: cx + 0.4, y: visualY + 1.5, w: cardW - 0.8, h: 0.95,
          fontFace: FONT, bold: true, charSpacing: 3,
          align: "center", valign: "middle", margin: 0,
        }
      );
      // XP badge — at label zone
      s.addText("XP +28  ·  GUILD RANK ↑", {
        x: cx, y: labelY, w: cardW, h: 0.4,
        fontFace: SUBFONT, fontSize: 14, color: C.fgMid, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // Caption beneath card
    s.addText(step.caption, {
      x: cx, y: cardY + cardH + 0.2, w: cardW, h: 0.9,
      fontFace: FONT, fontSize: 16, color: C.white,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// Card-internal stars (random scatter inside a region)
function addCardStars(slide, x, y, w, h, seed) {
  let s = seed || 1;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 14; i++) {
    const px = x + rand() * w;
    const py = y + rand() * h;
    const r = 0.018 + rand() * 0.035;
    const isMag = rand() < 0.18;
    const color = isMag ? C.magenta : C.cyan;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: r, h: r,
      fill: { color: color, transparency: 30 + rand() * 30 },
      line: { type: "none" },
      shadow: shadowSpec(color, { blur: 3, offset: 0.5, opacity: 0.7 }),
    });
  }
}

// =========================================================================
// SLIDE 6 — RAILS
// =========================================================================
function slide06() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "06 // RAILS",
    tagR: "TOKENIZED ASSET LAYER",
    footL: "NEONGRID.MARKETS",
    pageN: "06 / 10",
  });
  addEyebrow(s, "RAILS", C.cyan);
  addStars(s, 41, 80);

  s.addText(
    [
      { text: "One settlement layer. ", options: { color: C.white } },
      { text: "Every asset class.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.7, w: SLIDE_W - 2.8, h: 1.3,
      fontFace: FONT, fontSize: 60, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // 4 stack rows
  const rowX = 1.4, rowW = SLIDE_W - 2.8;
  const tagW = 2.6;
  const rightW = 2.4;
  const layers = [
    { tag: "L4 / APP",       title: "NeonGrid Markets — terminal, missions, guild",
      right: "▸ PLAYER-FACING", h: 1.15, isFeature: true },
    { tag: "L3 / ROUTE",     title: "Smart-order router — venue-agnostic, tx-private, MEV-shielded",
      right: "PRIVATE BUNDLE",  h: 1.15 },
    { tag: "L2 / CUSTODY",   title: "Self-custody by default · qualified-custodian fallback · proof-of-reserves on every tick",
      right: "ZK-PoR",          h: 1.15 },
    { tag: "L1 / RAILS",     title: "Tokenized claims across asset classes — unified ledger",
      right: "",                h: 2.2, isCells: true },
  ];

  let curY = 4.0;
  layers.forEach((L, i) => {
    // Subtle outline (highlight L4 with brighter cyan)
    s.addShape(pres.shapes.RECTANGLE, {
      x: rowX, y: curY, w: rowW, h: L.h,
      fill: { type: "none" },
      line: { color: i === 0 ? C.cyan : C.cyanDim, width: i === 0 ? 1.25 : 0.75,
              transparency: i === 0 ? 0 : 30 },
    });
    // For L1/RAILS (isCells), keep tag aligned to the same Y as the title row
    // (top portion of the row), not vertically centered in the whole cell row.
    const tagY = L.isCells ? curY + 0.2 : curY;
    const tagH = L.isCells ? 0.6 : L.h;
    s.addText(L.tag, {
      x: rowX + 0.4, y: tagY, w: tagW, h: tagH,
      fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    if (!L.isCells) {
      s.addText(L.title, {
        x: rowX + tagW + 0.3, y: curY, w: rowW - tagW - rightW - 0.5, h: L.h,
        fontFace: FONT, fontSize: 22, color: C.white, bold: true,
        align: "left", valign: "middle", margin: 0,
      });
    } else {
      s.addText(L.title, {
        x: rowX + tagW + 0.3, y: curY + 0.2, w: rowW - tagW - 0.5, h: 0.6,
        fontFace: FONT, fontSize: 22, color: C.white, bold: true,
        align: "left", valign: "middle", margin: 0,
      });
      // 5 cells beneath
      const cells = [
        { code: "EQ-X",  desc: "Tokenized equities",   color: C.cyan },
        { code: "FX-X",  desc: "Tokenized FX pairs",   color: C.cyan },
        { code: "YLD-X", desc: "Treasury yield notes", color: C.cyan },
        { code: "DGT-X", desc: "Native digital assets",color: C.cyan },
        { code: "RWA-X", desc: "Real-world assets",    color: C.magenta },
      ];
      const subX = rowX + tagW + 0.3;
      const subW = rowW - tagW - 0.5;
      const subY = curY + 1.0, subH = 1.0;
      const cellGap = 0.18;
      const cellW = (subW - 4 * cellGap) / 5;
      cells.forEach((cell, k) => {
        const ccx = subX + k * (cellW + cellGap);
        s.addShape(pres.shapes.RECTANGLE, {
          x: ccx, y: subY, w: cellW, h: subH,
          fill: { type: "none" },
          line: { color: C.cyanDim, width: 0.75, transparency: 40 },
        });
        s.addText(cell.code, {
          x: ccx + 0.2, y: subY + 0.1, w: cellW - 0.4, h: 0.4,
          fontFace: SUBFONT, fontSize: 18, color: cell.color, bold: true,
          align: "left", valign: "middle", margin: 0,
        });
        s.addText(cell.desc, {
          x: ccx + 0.2, y: subY + 0.5, w: cellW - 0.4, h: 0.4,
          fontFace: FONT, fontSize: 13, color: C.fgMid,
          align: "left", valign: "middle", margin: 0,
        });
      });
    }
    if (L.right) {
      const rTagY = L.isCells ? curY + 0.2 : curY;
      const rTagH = L.isCells ? 0.6 : L.h;
      s.addText(L.right, {
        x: rowX + rowW - rightW - 0.3, y: rTagY, w: rightW, h: rTagH,
        fontFace: SUBFONT, fontSize: 14, color: i === 0 ? C.cyan : C.fgDim,
        bold: true,
        align: "right", valign: "middle", margin: 0,
      });
    }
    curY += L.h + 0.25;
  });
}

// =========================================================================
// SLIDE 7 — MARKET (TAM/SAM/SOM rings)
// =========================================================================
function slide07() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "07 // MARKET",
    tagR: "RETAIL CRYPTO + EQUITIES — GLOBAL",
    footL: "SOURCE: BIS 2025 · CB INSIGHTS · INTERNAL MODEL",
    pageN: "07 / 10",
  });
  addEyebrow(s, "MARKET", C.cyan);
  addStars(s, 31, 95);

  // Headline (left)
  s.addText(
    [
      { text: "A ", options: { color: C.white } },
      { text: "$4.2T",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
      { text: " retail liquidity pool — ", options: { color: C.white } },
      { text: "colliding.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.7, w: 11.0, h: 4.2,
      fontFace: FONT, fontSize: 70, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Sub-text bottom-left
  s.addText(
    "Global retail equities and crypto are merging into a single\nasset surface. Whoever owns the interface owns the routing.",
    {
      x: 1.4, y: 9.0, w: 9, h: 1.2,
      fontFace: FONT, fontSize: 18, color: C.fgMid,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Rings (right side, large)
  const cx = 14.6, cy = 5.8;
  const rTAM = 3.8, rSAM = 2.6, rSOM = 1.4;
  // Outer dashed
  s.addShape(pres.shapes.OVAL, {
    x: cx - rTAM, y: cy - rTAM, w: rTAM * 2, h: rTAM * 2,
    fill: { color: C.cyanDeep, transparency: 75 },
    line: { color: C.cyanDim, width: 1, dashType: "dash" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: cx - rSAM, y: cy - rSAM, w: rSAM * 2, h: rSAM * 2,
    fill: { color: C.cyanDeep, transparency: 60 },
    line: { color: C.cyanDim, width: 1, dashType: "dash" },
  });
  // Inner SOM bright cyan with neon halo (matches reference's medium variant)
  s.addShape(pres.shapes.OVAL, {
    x: cx - rSOM, y: cy - rSOM, w: rSOM * 2, h: rSOM * 2,
    fill: { color: C.cyanFill, transparency: 40 },
    line: { color: C.cyan, width: 2 },
    shadow: cyanShadow({ blur: 12, opacity: 0.4 }),
  });
  // Crosshair
  s.addShape(pres.shapes.LINE, {
    x: cx - rTAM, y: cy, w: rTAM * 2, h: 0,
    line: { color: C.cyanDim, width: 0.5, transparency: 65 },
  });
  s.addShape(pres.shapes.LINE, {
    x: cx, y: cy - rTAM, w: 0, h: rTAM * 2,
    line: { color: C.cyanDim, width: 0.5, transparency: 65 },
  });

  // Labels at top of each ring
  s.addText("TAM  ·  $4.2T", {
    x: cx - 2.2, y: cy - rTAM + 0.15, w: 4.4, h: 0.4,
    fontFace: FONT, fontSize: 14, color: C.fgMid, italic: true,
    charSpacing: 5, align: "center", valign: "middle", margin: 0,
  });
  s.addText("SAM  ·  $620B", {
    x: cx - 2.2, y: cy - rSAM + 0.12, w: 4.4, h: 0.4,
    fontFace: FONT, fontSize: 14, color: C.fgMid, italic: true,
    charSpacing: 5, align: "center", valign: "middle", margin: 0,
  });
  s.addText("SOM  ·  $14B", {
    x: cx - 2.2, y: cy - rSOM + 0.10, w: 4.4, h: 0.36,
    fontFace: FONT, fontSize: 13, color: C.fgMid, italic: true,
    charSpacing: 5, align: "center", valign: "middle", margin: 0,
  });

  // Center stat
  s.addText("$1.4B", {
    x: cx - 2.0, y: cy - 0.35, w: 4.0, h: 0.8,
    fontFace: FONT, fontSize: 48, color: C.white, italic: true,
    shadow: cyanShadow(),
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("YR-3 REVENUE TARGET", {
    x: cx - 2.0, y: cy + 0.45, w: 4.0, h: 0.4,
    fontFace: FONT, fontSize: 13, color: C.cyan, italic: true,
    charSpacing: 5, align: "center", valign: "middle", margin: 0,
  });
}

// =========================================================================
// SLIDE 8 — MODEL (4 stat cards, very tall)
// =========================================================================
function slide08() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "08 // MODEL",
    tagR: "REVENUE STREAMS — FOUR LAYERS",
    footL: "NEONGRID.MARKETS",
    pageN: "08 / 10",
  });
  addEyebrow(s, "MODEL", C.cyan);
  addStars(s, 53, 90);

  s.addText("Four revenue layers stacked on one ledger.", {
    x: 1.4, y: 1.7, w: SLIDE_W - 2.8, h: 1.3,
    fontFace: FONT, fontSize: 56, color: C.white, bold: false,
    align: "left", valign: "top", margin: 0,
  });

  const cards = [
    { tag: "01 / SPREAD",     val: "2–6", unit: "bps", desc: "Routing spread on every tokenized trade.",
      color: C.cyan, accent: false },
    { tag: "02 / MEMBERSHIP", val: "$24", unit: "/mo", desc: "Pro tier: missions, depth, guild access.",
      color: C.cyan, accent: false },
    { tag: "03 / FLOAT",      val: "~4%", unit: "apy", desc: "Treasury yield on user balances.",
      color: C.cyan, accent: false },
    { tag: "04 / PROTOCOL",   val: "B2B", unit: "",    desc: "License the grid SDK to other venues.",
      color: C.magenta, accent: true },
  ];

  const cardY = 4.0;
  const cardH = 6.2;
  const cardW = (SLIDE_W - 2.8 - 0.4 * 3) / 4;

  cards.forEach((c, i) => {
    const cx = 1.4 + i * (cardW + 0.4);
    // Hairline outline
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardY, w: cardW, h: cardH,
      fill: { color: C.bgPanel, transparency: 40 },
      line: { color: c.accent ? C.magenta : C.cyanDim, width: c.accent ? 1.25 : 0.75,
              transparency: c.accent ? 0 : 50 },
    });
    s.addText(c.tag, {
      x: cx + 0.4, y: cardY + 0.4, w: cardW - 0.8, h: 0.45,
      fontFace: SUBFONT, fontSize: 18, color: c.color, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    // Big value with small unit
    s.addText(
      [
        { text: c.val, options: { color: c.color, fontSize: 88,
            shadow: shadowSpec(c.color) } },
        { text: c.unit ? c.unit : "", options: { color: C.fgDim, fontSize: 24 } },
      ],
      {
        x: cx + 0.4, y: cardY + 1.0, w: cardW - 0.8, h: 1.8,
        fontFace: FONT, bold: false,
        align: "left", valign: "middle", margin: 0,
      }
    );
    // Stars inside the empty middle
    addCardStars(s, cx + 0.3, cardY + 3.0, cardW - 0.6, cardH - 4.5, 200 + i);
    // Description at bottom
    s.addText(c.desc, {
      x: cx + 0.4, y: cardY + cardH - 1.4, w: cardW - 0.8, h: 1.0,
      fontFace: FONT, fontSize: 18, color: C.white,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// =========================================================================
// SLIDE 9 — RISK
// =========================================================================
function slide09() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "09 // RISK",
    tagR: "REGULATORY POSTURE",
    footL: "NEONGRID.MARKETS",
    pageN: "09 / 10",
  });
  addEyebrow(s, "RISK", C.magenta);
  addStars(s, 67, 90);

  s.addText(
    [
      { text: "We treat regulation as a\n", options: { color: C.white } },
      { text: "design surface.",
        options: { color: C.cyan,
                   shadow: cyanShadow() } },
    ],
    {
      x: 1.4, y: 1.8, w: 11.5, h: 4.0,
      fontFace: FONT, fontSize: 60, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  s.addText(
    "Three known vectors. Each mapped to a concrete posture and\na working partner today.",
    {
      x: 1.4, y: 9.0, w: 9, h: 1.2,
      fontFace: FONT, fontSize: 17, color: C.fgMid,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Right: 3 vector cards
  const cards = [
    { tag: "VEC / 01", title: "SEC", sub: "U.S. EQUITIES",
      claim: "Tokenized U.S. equities classified as securities.",
      posture: "ATS partnership in pipeline; geo-fenced retail launch outside U.S. first." },
    { tag: "VEC / 02", title: "MiCA", sub: "EUROPEAN UNION",
      claim: "CASP licensing required for crypto rails.",
      posture: "Passporting via EU design partner; capital reserve modeled into Series A use of funds." },
    { tag: "VEC / 03", title: "GAME", sub: "GAMIFICATION SCRUTINY",
      claim: "\"Trading as a game\" treated as suitability risk by FCA / FINRA.",
      posture: "Missions reward learning, not volume. Leverage gated behind certified knowledge tiers." },
  ];

  const rX = 10.6, rW = SLIDE_W - 12.0;
  const rY = 2.05, rH = 2.2;
  cards.forEach((c, i) => {
    const y = rY + i * (rH + 0.35);
    s.addShape(pres.shapes.RECTANGLE, {
      x: rX, y: y, w: rW, h: rH,
      fill: { type: "none" },
      line: { color: C.cyanDim, width: 0.75, transparency: 35 },
    });
    s.addText(c.tag, {
      x: rX + 0.35, y: y + 0.25, w: 2.5, h: 0.3,
      fontFace: SUBFONT, fontSize: 14, color: C.fgMid, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(c.title, {
      x: rX + 0.35, y: y + 0.55, w: 2.8, h: 0.7,
      fontFace: FONT, fontSize: 32, color: C.white, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(c.sub, {
      x: rX + 0.35, y: y + 1.3, w: 2.8, h: 0.5,
      fontFace: SUBFONT, fontSize: 13, color: C.fgMid, bold: true,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(c.claim, {
      x: rX + 3.4, y: y + 0.25, w: rW - 3.7, h: 0.55,
      fontFace: FONT, fontSize: 18, color: C.white, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(
      [
        { text: "▸ POSTURE  ", options: { color: C.cyan, bold: true, fontFace: SUBFONT, fontSize: 14 } },
        { text: c.posture,     options: { color: C.fgMid, fontFace: FONT, fontSize: 15 } },
      ],
      {
        x: rX + 3.4, y: y + 0.85, w: rW - 3.7, h: rH - 1.0,
        align: "left", valign: "top", margin: 0,
      }
    );
  });
}

// =========================================================================
// SLIDE 10 — ASK
// =========================================================================
function slide10() {
  const s = pres.addSlide();
  addChrome(s, {
    tagL: "10 // ASK",
    tagR: "SERIES A — USE OF FUNDS",
    pageN: "10 / 10",
  });
  addEyebrow(s, "ASK", C.cyan);

  // Big radar ring (decorative behind content)
  addRadar(s, SLIDE_W / 2 - 1, 4.5, 3.2, { radii: [0.9, 1.9, 2.6, 3.2] });

  // $12M huge with strong glow
  s.addText("$12M", {
    x: 1.4, y: 1.7, w: 8, h: 2.0,
    fontFace: FONT, fontSize: 120, color: C.cyan, bold: false,
    shadow: cyanShadow(),
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("Series A — to bring the grid online.", {
    x: 1.4, y: 3.7, w: SLIDE_W - 2.8, h: 1.0,
    fontFace: FONT, fontSize: 42, color: C.white, bold: false,
    align: "left", valign: "middle", margin: 0,
  });

  // Divider — moved up to give bottom block more breathing room
  s.addShape(pres.shapes.LINE, {
    x: 1.4, y: 5.95, w: SLIDE_W - 2.8, h: 0,
    line: { color: C.cyanDim, width: 0.75, transparency: 35 },
  });

  // ----- Founding team (left) -----
  s.addText("▸  FOUNDING TEAM", {
    x: 1.4, y: 6.20, w: 8, h: 0.4,
    fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
    align: "left", valign: "middle", margin: 0,
  });
  const team = [
    { name: "CEO — ex-HFT desk lead, top-3 prop firm",         blurb: "12 yr in equities market microstructure" },
    { name: "CTO — ex-Coinbase staff eng, custody & clearing", blurb: "Designed PoR system for Tier-1 exchange" },
    { name: "CDO — ex-AAA-game UI lead, F2P economy",          blurb: "Shipped two 10M+ DAU consumer surfaces" },
  ];
  team.forEach((t, i) => {
    const ty = 6.85 + i * 0.9;
    // Icon: outlined square + small filled square inside
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.4, y: ty + 0.05, w: 0.55, h: 0.55,
      fill: { type: "none" }, line: { color: C.cyanDim, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.4 + 0.20, y: ty + 0.25, w: 0.15, h: 0.15,
      fill: { color: C.cyan }, line: { type: "none" },
      shadow: cyanShadow({ blur: 3, offset: 1, opacity: 0.85 }),
    });
    s.addText(t.name, {
      x: 2.15, y: ty, w: 7.0, h: 0.4,
      fontFace: FONT, fontSize: 17, color: C.white, bold: true,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(t.blurb, {
      x: 2.15, y: ty + 0.4, w: 7.0, h: 0.35,
      fontFace: FONT, fontSize: 14, color: C.fgMid,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // ----- Use of funds (right) -----
  const fX = 10.6, fW = SLIDE_W - 12.0;
  s.addText("▸  18-MONTH USE OF FUNDS", {
    x: fX, y: 6.20, w: fW, h: 0.4,
    fontFace: SUBFONT, fontSize: 18, color: C.cyan, bold: true,
    align: "left", valign: "middle", margin: 0,
  });
  const funds = [
    { lbl: "Engineering & protocol",            pct: 42, color: C.cyan },
    { lbl: "Licensing & capital reserve",         pct: 28, color: C.cyan },
    { lbl: "Liquidity / market-maker incentives", pct: 18, color: C.cyan },
    { lbl: "Brand, design partners, growth",      pct: 12, color: C.magenta },
  ];
  funds.forEach((f, i) => {
    const fy = 6.95 + i * 0.72;
    s.addText(f.lbl, {
      x: fX, y: fy, w: fW - 1.0, h: 0.35,
      fontFace: FONT, fontSize: 16, color: C.white,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(f.pct + "%", {
      x: fX + fW - 1.2, y: fy, w: 1.2, h: 0.35,
      fontFace: FONT, fontSize: 18, color: f.color, bold: true,
      align: "right", valign: "middle", margin: 0,
    });
    // Bar fill — slightly thicker, tighter shadow proportional to bar height
    s.addShape(pres.shapes.RECTANGLE, {
      x: fX, y: fy + 0.42, w: fW * (f.pct / 100), h: 0.07,
      fill: { color: f.color }, line: { type: "none" },
      shadow: shadowSpec(f.color, { blur: 2, offset: 1, opacity: 0.85 }),
    });
    // Faint gray track for the rest
    s.addShape(pres.shapes.LINE, {
      x: fX + fW * (f.pct / 100), y: fy + 0.455,
      w: fW * (1 - f.pct / 100), h: 0,
      line: { color: C.fgFaint, width: 0.75, transparency: 30 },
    });
  });

  // NEXT GATE row (sits below the funds list, above the ticker)
  s.addText(
    [
      { text: "▸  NEXT GATE   ", options: { color: C.cyan, bold: true, fontFace: SUBFONT, fontSize: 16 } },
      { text: "Closed beta · Q3 2026 · 25 design-partner desks",
        options: { color: C.white, fontFace: FONT, fontSize: 15 } },
    ],
    {
      x: 10.6, y: 9.85, w: SLIDE_W - 12.0, h: 0.4,
      align: "left", valign: "middle", margin: 0,
    }
  );

  // Contact (left side, same row as NEXT GATE)
  s.addText("CONTACT  ·  FOUNDERS@NEONGRID.MARKETS", {
    x: 1.4, y: 9.85, w: 8, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.fgDim, bold: true,
    charSpacing: 5, align: "left", valign: "middle", margin: 0,
  });

  // ===== Ticker tape — between content and the chrome footer =====
  const tickerY = 10.45;
  const ticker = [
    { code: "RWA-CRE",   pct: "0.31%", up: false },
    { code: "SOL-X",     pct: "1.62%", up: true  },
    { code: "FX-EURUSD", pct: "0.07%", up: false },
    { code: "BTC-X",     pct: "0.42%", up: true  },
    { code: "DGT-INDEX", pct: "1.04%", up: true  },
    { code: "NEONGRID",  pct: "SERIES A", up: true, special: true },
    { code: "NVD-X",     pct: "2.14%", up: true  },
    { code: "ETH-X",     pct: "0.88%", up: true  },
    { code: "YLD-3M",    pct: "0.04%", up: true  },
  ];
  // Build ticker into one rich-text run
  const tickerRuns = [];
  ticker.forEach((t, i) => {
    if (i > 0) tickerRuns.push({ text: "    ", options: { color: C.fgFaint } });
    if (t.special) {
      tickerRuns.push({ text: t.code, options: { color: C.fgMid, bold: true, charSpacing: 3 } });
      tickerRuns.push({ text: "  ▲ " + t.pct, options: { color: C.cyan, bold: true, charSpacing: 2 } });
    } else {
      tickerRuns.push({ text: t.code, options: { color: C.fgMid, charSpacing: 2 } });
      tickerRuns.push({
        text: " " + (t.up ? "▲ " : "▼ ") + t.pct,
        options: { color: t.up ? C.cyan : C.magenta, bold: true },
      });
    }
  });
  s.addText(tickerRuns, {
    x: 0.5, y: tickerY, w: SLIDE_W - 2.5, h: 0.4,
    fontFace: FONT, fontSize: 10,
    align: "left", valign: "middle", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// BUILD
// ---------------------------------------------------------------------------
slide01();
slide02();
slide03();
slide04();
slide05();
slide06();
slide07();
slide08();
slide09();
slide10();

pres.writeFile({ fileName: "Tron.pptx" })
  .then((fn) => console.log("Wrote: " + fn))
  .catch((err) => { console.error(err); process.exit(1); });
