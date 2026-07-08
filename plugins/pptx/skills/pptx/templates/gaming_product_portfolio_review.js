/**
 * build_pptx.js
 *
 * Recreates "Deliverable_1.pptx" — EA PC Titles Portfolio Review (9 slides)
 * using pptxgenjs.
 *
 * Layout: 13.333" x 7.5" (LAYOUT_WIDE, 16:9)
 * Typography:
 *   - Headline: Helvetica Neue / Arial (regular + italic mix)
 *   - Body:     Helvetica Neue / Arial
 *   - Micro/labels: uppercase, letter-spaced
 * Palette (monochrome editorial):
 *   ink       = "111111"
 *   muted     = "6B6B6B"
 *   faint     = "9A9A9A"
 *   paper     = "FFFFFF"
 *   soft      = "ECECEC"
 */

const pptxgen = require("pptxgenjs");

// ---------- constants ----------
const INK = "111111";
const MUTED = "6B6B6B";
const FAINT = "9A9A9A";
const SOFT = "ECECEC";
const FONT = "Helvetica Neue";
const FONT_FALLBACK = "Arial";

// slide dimensions (inches) for LAYOUT_WIDE
const SW = 13.333;
const SH = 7.5;
const MARGIN = 0.5;

// ---------- helpers ----------
function micro(slide, text, x, y, w, opts = {}) {
  // Small uppercase label text, letter-spaced
  slide.addText(text, {
    x, y, w, h: 0.25,
    fontFace: FONT,
    fontSize: opts.fontSize || 8,
    color: opts.color || INK,
    bold: false,
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 2,
    align: opts.align || "left",
    valign: "top",
    margin: 0,
  });
}

function body(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT,
    fontSize: opts.fontSize || 11,
    color: opts.color || INK,
    align: opts.align || "left",
    valign: opts.valign || "top",
    paraSpaceAfter: opts.paraSpaceAfter || 0,
    margin: 0,
  });
}

function statBig(slide, value, label, x, y, w, opts = {}) {
  slide.addText(value, {
    x, y, w, h: 0.55,
    fontFace: FONT,
    fontSize: opts.valueSize || 32,
    color: INK,
    bold: false,
    align: opts.align || "left",
    valign: "top",
    margin: 0,
  });
  slide.addText(label, {
    x, y: y + 0.55, w, h: 0.25,
    fontFace: FONT,
    fontSize: 8,
    color: INK,
    charSpacing: 2,
    align: opts.align || "left",
    valign: "top",
    margin: 0,
  });
}

function fieldRow(slide, label, value, x, y, w) {
  // Fixed label column; value right-aligned in remaining width.
  // Values get no charSpacing so they render narrower and don't collide with labels.
  const labelW = 1.3;
  const gap = 0.15;
  slide.addText(label, {
    x, y, w: labelW, h: 0.22,
    fontFace: FONT, fontSize: 8, color: INK, charSpacing: 2,
    align: "left", valign: "top", margin: 0, wrap: false,
  });
  slide.addText(value, {
    x: x + labelW + gap, y, w: w - labelW - gap, h: 0.22,
    fontFace: FONT, fontSize: 8, color: INK, charSpacing: 1,
    align: "right", valign: "top", margin: 0, wrap: false,
  });
}

function headerBar(slide, left, right) {
  // Top thin header with left tag and right slide counter
  if (left) micro(slide, left, MARGIN, 0.35, 6, { fontSize: 8 });
  if (right) micro(slide, right, SW - MARGIN - 1.5, 0.35, 1.5, { fontSize: 8, align: "right" });
}

function footerBar(slide, left, center, right) {
  const y = SH - 0.45;
  if (left) micro(slide, left, MARGIN, y, 4, { fontSize: 8 });
  if (center) micro(slide, center, SW / 2 - 3, y, 6, { fontSize: 8, align: "center" });
  if (right) micro(slide, right, SW - MARGIN - 4, y, 4, { fontSize: 8, align: "right" });
}

// ---------- illustrations ----------
// Slide 2 "Life & Home Sim" — isometric home on triangle-grid
function drawGridTile(slide, gx, gy, gw, gh, cols, rows) {
  // Dense triangle-grid pattern (alternating filled/white triangles approximated with black rectangles + white diagonals).
  // We simulate a woven look using many small black rectangles with thin white lines through.
  slide.addShape("rect", {
    x: gx, y: gy, w: gw, h: gh,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  const cellW = gw / cols;
  const cellH = gh / rows;
  // Draw white diagonals in each cell to create triangle pattern
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = gx + c * cellW;
      const y0 = gy + r * cellH;
      // diagonal from top-left to bottom-right (white line)
      slide.addShape("line", {
        x: x0, y: y0, w: cellW, h: cellH,
        line: { color: "FFFFFF", width: 0.75 },
      });
    }
  }
  // Outer white hairlines (horizontal grid) for lattice
  for (let r = 0; r <= rows; r++) {
    slide.addShape("line", {
      x: gx, y: gy + r * cellH, w: gw, h: 0,
      line: { color: "FFFFFF", width: 0.5 },
    });
  }
  for (let c = 0; c <= cols; c++) {
    slide.addShape("line", {
      x: gx + c * cellW, y: gy, w: 0, h: gh,
      line: { color: "FFFFFF", width: 0.5 },
    });
  }
}

function drawIsoHouse(slide, cx, cy, size) {
  // Simple black isometric house silhouette built from shapes
  // "Home" rendered as a stacked pair of rounded blocks
  slide.addShape("rect", {
    x: cx - size * 0.5, y: cy - size * 0.25, w: size, h: size * 0.55,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  slide.addShape("rect", {
    x: cx - size * 0.35, y: cy - size * 0.45, w: size * 0.7, h: size * 0.3,
    fill: { color: INK }, line: { color: INK, width: 0 },
  });
  // small window notch (white)
  slide.addShape("rect", {
    x: cx - size * 0.08, y: cy + size * 0.02, w: size * 0.16, h: size * 0.12,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF", width: 0 },
  });
}

function drawCircle(slide, cx, cy, r, color = INK) {
  slide.addShape("ellipse", {
    x: cx - r, y: cy - r, w: 2 * r, h: 2 * r,
    fill: { color }, line: { color, width: 0 },
  });
}

// Slide 5 — topographic crosshair (concentric rings + crosshair)
function drawTopoCrosshair(slide, cx, cy, rMax) {
  const rings = 7;
  for (let i = 1; i <= rings; i++) {
    const r = (rMax * i) / rings;
    slide.addShape("ellipse", {
      x: cx - r, y: cy - r, w: 2 * r, h: 2 * r,
      fill: { color: "FFFFFF", transparency: 100 },
      line: { color: INK, width: 0.5 },
    });
  }
  // crosshair
  slide.addShape("line", {
    x: cx - rMax - 0.3, y: cy, w: 2 * rMax + 0.6, h: 0,
    line: { color: INK, width: 0.6 },
  });
  slide.addShape("line", {
    x: cx, y: cy - rMax - 0.3, w: 0, h: 2 * rMax + 0.6,
    line: { color: INK, width: 0.6 },
  });
  // center dot
  drawCircle(slide, cx, cy, 0.05, INK);
}

// Slide 6 — stadium radial
function drawStadiumRadial(slide, cx, cy, rMax) {
  // concentric ovals (stadium feel) + radial spokes
  const rings = 5;
  for (let i = 1; i <= rings; i++) {
    const r = (rMax * i) / rings;
    slide.addShape("ellipse", {
      x: cx - r * 1.2, y: cy - r * 0.75, w: 2 * r * 1.2, h: 2 * r * 0.75,
      fill: { color: "FFFFFF", transparency: 100 },
      line: { color: INK, width: 0.5 },
    });
  }
  // spokes (12 radial lines)
  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const ang = (Math.PI * 2 * i) / spokes;
    const x2 = cx + Math.cos(ang) * rMax * 1.2;
    const y2 = cy + Math.sin(ang) * rMax * 0.75;
    slide.addShape("line", {
      x: Math.min(cx, x2), y: Math.min(cy, y2),
      w: Math.abs(x2 - cx), h: Math.abs(y2 - cy),
      line: { color: INK, width: 0.4, flipH: x2 < cx, flipV: y2 < cy },
    });
  }
}

// Slide 7 — sigil & ridgeline: soft gray mountain peaks
function drawRidgeline(slide, x, y, w, h) {
  // Stylized mountain silhouette — series of triangles
  const peaks = [
    { cx: 0.15, cy: 0.45, ch: 0.55 },
    { cx: 0.35, cy: 0.55, ch: 0.45 },
    { cx: 0.55, cy: 0.35, ch: 0.65 },
    { cx: 0.78, cy: 0.50, ch: 0.50 },
  ];
  for (const p of peaks) {
    const px = x + p.cx * w;
    const pTop = y + (1 - p.ch) * h;
    const pBase = y + h;
    const halfW = p.ch * w * 0.28;
    // Triangle approximated via isoscelesTriangle shape
    slide.addShape("triangle", {
      x: px - halfW, y: pTop, w: halfW * 2, h: pBase - pTop,
      fill: { color: SOFT }, line: { color: SOFT, width: 0 },
    });
  }
}

// Slide 2 — small mountain illustration in the Fantasy RPG tile
function drawMiniRidgeline(slide, x, y, w, h) {
  const peaks = [
    { cx: 0.2, ch: 0.55 },
    { cx: 0.5, ch: 0.75 },
    { cx: 0.8, ch: 0.55 },
  ];
  for (const p of peaks) {
    const px = x + p.cx * w;
    const pTop = y + (1 - p.ch) * h;
    const pBase = y + h;
    const halfW = p.ch * w * 0.25;
    slide.addShape("triangle", {
      x: px - halfW, y: pTop, w: halfW * 2, h: pBase - pTop,
      fill: { color: SOFT }, line: { color: SOFT, width: 0 },
    });
  }
}

// =============================================================
// Build presentation
// =============================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "PC Titles, a portfolio review";
pres.author = "Product Design";

// -------------------- SLIDE 1: Cover --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Top header
  micro(s, "ELECTRONIC ARTS · PRODUCT DESIGN", MARGIN, 0.4, 6, { fontSize: 8 });
  micro(s, "Q2 2026 · EXECUTIVE REVIEW", SW - MARGIN - 5, 0.4, 5, { fontSize: 8, align: "right" });

  // Big headline — "PC Titles, a portfolio review." with "portfolio" italic
  s.addText(
    [
      { text: "PC Titles, a ", options: {} },
      { text: "portfolio", options: { italic: true } },
      { text: " review.", options: {} },
    ],
    {
      x: MARGIN, y: 2.1, w: SW - 2 * MARGIN - 2.5, h: 3.2,
      fontFace: FONT, fontSize: 78, color: INK, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Right-side meta block (PREPARED BY / FOR / DOCUMENT)
  const rx = SW - MARGIN - 2.2;
  const rw = 2.2;
  const rvBaseY = 4.8;
  const rowH = 0.55;
  const fieldsRight = [
    ["PREPARED BY", "PRODUCT DESIGN"],
    ["FOR", "EXECUTIVE LEADERSHIP"],
    ["DOCUMENT", "DLV · 001 / 2026"],
  ];
  fieldsRight.forEach((f, i) => {
    micro(s, f[0], rx, rvBaseY + i * rowH, rw, { fontSize: 7, align: "right", charSpacing: 2 });
    micro(s, f[1], rx, rvBaseY + i * rowH + 0.22, rw, { fontSize: 7, align: "right", charSpacing: 2, color: INK });
  });

  // Footer
  micro(s, "09 SLIDES · ~12 MINUTES", MARGIN, SH - 0.45, 4, { fontSize: 8 });
  micro(s, "5 FLAGSHIP TITLES · 4 STUDIOS · 1 PORTFOLIO", SW / 2 - 3, SH - 0.45, 6, { fontSize: 8, align: "center" });
  micro(s, "CONFIDENTIAL — INTERNAL", SW - MARGIN - 4, SH - 0.45, 4, { fontSize: 8, align: "right" });
}

// -------------------- SLIDE 2: At a glance — 5 titles grid --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  headerBar(s, "SECTION I · AT A GLANCE", "02 / 09");

  // LEFT column: headline + blurb + 3 stats
  s.addText(
    [
      { text: "Five\nflagship\n", options: {} },
      { text: "titles.", options: { italic: true } },
    ],
    {
      x: MARGIN, y: 0.85, w: 2.8, h: 2.3,
      fontFace: FONT, fontSize: 34, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  body(s,
    "A snapshot of the PC portfolio under active design. Each title owns a distinct surface area — from live service to single-player — and a distinct design language.",
    MARGIN, 3.2, 2.8, 1.3, { fontSize: 10 }
  );

  // 3 stats stacked — tighter to avoid colliding with footer
  const statY = 4.5;
  statBig(s, "5", "FLAGSHIP PC TITLES", MARGIN, statY, 2.8, { valueSize: 26 });
  statBig(s, "4", "INTERNAL STUDIOS", MARGIN, statY + 0.75, 2.8, { valueSize: 26 });
  statBig(s, "3", "LIVE-SERVICE & SEASONAL", MARGIN, statY + 1.5, 2.8, { valueSize: 26 });

  // RIGHT side — 2x3 grid of title tiles (3 top, 3 bottom with the last being "Unannounced")
  // Grid region
  const gridX = 3.75;
  const gridY = 0.85;
  const gridW = SW - MARGIN - gridX;
  const gridH = 6.0; // tighter to avoid footer collision
  const cols = 3;
  const rows = 2;
  const cellW = gridW / cols;
  const cellH = gridH / rows;

  const titles = [
    { tag: "LIFE & HOME SIM", idx: "01 / 05", name: "Life & Home Sim", sub: "LIFE SIMULATION · SANDBOX", liveLabel: "LIVE SERVICE", liveVal: "YES", illus: "grid-home" },
    { tag: "HERO SHOOTER", idx: "02 / 05", name: "Hero Shooter", sub: "TEAM SHOOTER · FREE-TO-PLAY", liveLabel: "LIVE SERVICE", liveVal: "YES", illus: "big-circle" },
    { tag: "MODERN WARFARE FPS", idx: "03 / 05", name: "Modern Warfare FPS", sub: "FIRST-PERSON SHOOTER · MULTIPLAYER", liveLabel: "LIVE SERVICE", liveVal: "SEASONAL", illus: "small-circle" },
    { tag: "FOOTBALL SIM", idx: "04 / 05", name: "Football Sim", sub: "SPORTS · ANNUAL RELEASE", liveLabel: "LIVE SERVICE", liveVal: "ULTIMATE MODE", illus: "none" },
    { tag: "FANTASY RPG", idx: "05 / 05", name: "Fantasy RPG", sub: "ACTION RPG · SINGLE-PLAYER", liveLabel: "LIVE SERVICE", liveVal: "NO", illus: "ridge-mini" },
    { tag: "RESERVE SLOT", idx: "", name: "Unannounced", sub: "PIPELINE · FY27", liveLabel: "STATUS", liveVal: "CONCEPT", illus: "none", italic: true },
  ];

  for (let i = 0; i < titles.length; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const cx = gridX + c * cellW;
    const cy = gridY + r * cellH;
    const t = titles[i];

    // Illustration area (top portion of cell) — ~1.5" tall
    const illusH = 1.45;
    const illusW = cellW - 0.3;
    const illusX = cx;
    const illusY = cy;

    if (t.illus === "grid-home") {
      drawGridTile(s, illusX, illusY, illusW, illusH, 10, 5);
      drawIsoHouse(s, illusX + illusW * 0.5, illusY + illusH * 0.55, 0.7);
    } else if (t.illus === "big-circle") {
      drawCircle(s, illusX + illusW * 0.5, illusY + illusH * 0.55, Math.min(illusW, illusH) * 0.42, INK);
    } else if (t.illus === "small-circle") {
      drawCircle(s, illusX + illusW * 0.5, illusY + illusH * 0.55, Math.min(illusW, illusH) * 0.18, INK);
    } else if (t.illus === "ridge-mini") {
      drawMiniRidgeline(s, illusX, illusY + illusH * 0.35, illusW, illusH * 0.65);
    }

    // Tag + index (top row over illustration area's top, small)
    micro(s, t.tag, cx, cy + illusH + 0.02, cellW * 0.7, { fontSize: 7, charSpacing: 2 });
    // Index sits just above the illustration (outside dark regions)
    if (t.idx) micro(s, t.idx, cx + cellW - 1.0, cy - 0.22, 0.9, { fontSize: 7, charSpacing: 2, align: "right" });

    // Title name
    s.addText(t.name, {
      x: cx, y: cy + illusH + 0.22, w: cellW - 0.2, h: 0.5,
      fontFace: FONT, fontSize: 18, color: INK,
      italic: !!t.italic,
      align: "left", valign: "top", margin: 0,
    });

    // Subtitle — single-line forced (wrap:false to avoid two-line wrap)
    micro(s, t.sub, cx, cy + illusH + 0.72, cellW - 0.1, { fontSize: 7, charSpacing: 1.5, color: INK });

    // Live service field
    fieldRow(s, t.liveLabel, t.liveVal, cx, cy + illusH + 1.05, cellW - 0.3);
  }

  // Footer
  micro(s, "EA · PC PORTFOLIO · 2026", MARGIN, SH - 0.45, 4, { fontSize: 8 });
  micro(s, "SOURCE: INTERNAL DESIGN REVIEW", SW - MARGIN - 4, SH - 0.45, 4, { fontSize: 8, align: "right" });
}

// -------------------- SLIDE 3: Life Sim deep-dive --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Header (title dives have header on right side)
  headerBar(s, "", "");
  // Full-bleed illustration panel on the LEFT (~45% width)
  const panelW = SW * 0.45;
  const panelH = SH;
  drawGridTile(s, 0, 0, panelW, panelH, 16, 18);

  // Left footer labels (on top of dark panel)
  s.addText("TITLE 01 / 05", {
    x: 0.35, y: SH - 1.4, w: 3, h: 0.25,
    fontFace: FONT, fontSize: 8, color: "FFFFFF", charSpacing: 2,
    align: "left", valign: "top", margin: 0,
  });
  s.addText("Life Sim.", {
    x: 0.35, y: SH - 1.15, w: 5, h: 0.85,
    fontFace: FONT, fontSize: 36, color: "FFFFFF", italic: true,
    align: "left", valign: "top", margin: 0,
  });

  // Right side content
  const rx = panelW + 0.4;
  const rw = SW - rx - MARGIN;

  micro(s, "SECTION II · TITLE DEEP-DIVES", rx, 0.35, rw * 0.6, { fontSize: 8 });
  micro(s, "03 / 09", SW - MARGIN - 1.5, 0.35, 1.5, { fontSize: 8, align: "right" });
  micro(s, "TITLE I · LIFE & HOME SIM", rx, 0.62, rw, { fontSize: 8 });

  // Headline: "The long-tail sandbox." with sandbox italic
  s.addText(
    [
      { text: "The long-tail\n", options: {} },
      { text: "sandbox.", options: { italic: true } },
    ],
    {
      x: rx, y: 1.0, w: rw, h: 1.8,
      fontFace: FONT, fontSize: 44, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Body paragraph
  body(s,
    "The portfolio's enduring creative platform. Fifteen years of player-authored stories, expansions, and modding — now the design challenge is modernizing a decade-old UI without alienating a devoted core.",
    rx, 3.1, rw * 0.85, 1.3, { fontSize: 12 }
  );

  // 3 stats row
  const sy = 5.15;
  const sw3 = rw / 3;
  statBig(s, "~85M", "LIFETIME PLAYERS", rx, sy, sw3, { valueSize: 28 });
  statBig(s, "14", "ACTIVE EXPANSIONS", rx + sw3, sy, sw3, { valueSize: 28 });
  statBig(s, "A+", "COMMUNITY NPS", rx + 2 * sw3, sy, sw3, { valueSize: 28 });

  // Field rows (2 rows of 2 fields each)
  const fy = 6.3;
  const halfW = rw / 2 - 0.15;
  fieldRow(s, "STUDIO", "REDWOOD SHORES", rx, fy, halfW);
  fieldRow(s, "GENRE", "LIFE SIMULATION", rx + halfW + 0.3, fy, halfW);
  fieldRow(s, "RELEASED", "2014 · ONGOING", rx, fy + 0.32, halfW);
  fieldRow(s, "DESIGN FOCUS", "INFORMATION DENSITY", rx + halfW + 0.3, fy + 0.32, halfW);

  // Footer — move footer center text so it sits on white (not on dark panel)
  micro(s, "EA · PC PORTFOLIO · 2026", rx, SH - 0.35, 3, { fontSize: 8 });
  micro(s, "LIVE SERVICE", SW - MARGIN - 2, SH - 0.35, 2, { fontSize: 8, align: "right" });
}

// -------------------- Helper for right-aligned deep-dive (slides 4, 6) --------------------
function deepDiveRightIllus({
  sectionTag, page, titleTag, headline1, headlineItalic, body: bodyText,
  stats, fields, footerRight, subtitle, jumboText, jumboTag, drawIllus
}) {
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Content is on LEFT; illustration zone is on RIGHT (top) and jumbo name (bottom-right)
  headerBar(s, sectionTag, page);
  micro(s, titleTag, MARGIN, 0.62, 6, { fontSize: 8 });

  // Headline
  s.addText(
    [
      { text: headline1 + "\n", options: {} },
      { text: headlineItalic, options: { italic: true } },
    ],
    {
      x: MARGIN, y: 1.0, w: 6, h: 1.8,
      fontFace: FONT, fontSize: 44, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Body
  body(s, bodyText, MARGIN, 3.1, 5.0, 1.5, { fontSize: 12 });

  // stats row (bottom left) — widened so labels don't wrap
  const sy = 5.15;
  const sWidth = 6.0;
  const sw3 = sWidth / 3;
  statBig(s, stats[0].v, stats[0].l, MARGIN, sy, sw3, { valueSize: 28 });
  statBig(s, stats[1].v, stats[1].l, MARGIN + sw3, sy, sw3, { valueSize: 28 });
  statBig(s, stats[2].v, stats[2].l, MARGIN + 2 * sw3, sy, sw3, { valueSize: 28 });

  // fields — use wider columns to prevent wrap/collision with long value text
  const fy = 6.3;
  const fw = 3.3;
  fieldRow(s, fields[0].l, fields[0].v, MARGIN, fy, fw);
  fieldRow(s, fields[1].l, fields[1].v, MARGIN + fw + 0.4, fy, fw);
  fieldRow(s, fields[2].l, fields[2].v, MARGIN, fy + 0.32, fw);
  fieldRow(s, fields[3].l, fields[3].v, MARGIN + fw + 0.4, fy + 0.32, fw);

  // Jumbo name in the bottom-right
  micro(s, jumboTag, SW - MARGIN - 3, 4.8, 3, { fontSize: 8, align: "right", charSpacing: 2 });
  s.addText(jumboText, {
    x: SW - MARGIN - 6, y: 5.0, w: 6, h: 1.2,
    fontFace: FONT, fontSize: 54, italic: true, color: INK,
    align: "right", valign: "top", margin: 0,
  });

  // Illustration area top-right — caller draws
  if (drawIllus) drawIllus(s);

  // subtitle (ORIGINAL ILLUSTRATION tag) — place on its own row below the page counter
  if (subtitle) micro(s, subtitle, SW - MARGIN - 5, 0.62, 5, { fontSize: 8, align: "right" });

  // footer — move center text to avoid overlap with jumbo
  micro(s, "EA · PC PORTFOLIO · 2026", MARGIN, SH - 0.35, 4, { fontSize: 8 });
  micro(s, footerRight, SW - MARGIN - 2, SH - 0.35, 2, { fontSize: 8, align: "right" });

  return s;
}

// -------------------- SLIDE 4: Hero Shooter --------------------
// Layout: header at TOP, headline upper-LEFT, stats bottom-LEFT, "Hero Shooter." italic bottom-RIGHT
deepDiveRightIllus({
  sectionTag: "SECTION II · TITLE DEEP-DIVES",
  page: "04 / 09",
  titleTag: "TITLE II · HERO SHOOTER",
  headline1: "Live service at",
  headlineItalic: "scale.",
  body: "Seasonal free-to-play with the portfolio's most sophisticated live ops cadence. Design priorities sit squarely on retention, onboarding, and new-hero legibility in a roster that now exceeds twenty-five characters.",
  stats: [
    { v: "22", l: "SEASONS SHIPPED" },
    { v: "27", l: "PLAYABLE LEGENDS" },
    { v: "~11M", l: "WEEKLY ACTIVES" },
  ],
  fields: [
    { l: "STUDIO", v: "NORTHERN LIGHTS" },
    { l: "GENRE", v: "HERO SHOOTER · F2P" },
    { l: "RELEASED", v: "2019 · LIVE" },
    { l: "DESIGN FOCUS", v: "ONBOARDING & RETENTION" },
  ],
  footerRight: "LIVE SERVICE",
  subtitle: "SQUAD SILHOUETTES · ORIGINAL ILLUSTRATION",
  jumboText: "Hero Shooter.",
  jumboTag: "TITLE 02 / 05",
  drawIllus: null, // subtle - no heavy illustration, as in source
});

// -------------------- SLIDE 5: Modern FPS — LEFT illustration, RIGHT content --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Left side: topographic crosshair
  micro(s, "TOPOGRAPHIC CROSSHAIR · ORIGINAL ILLUSTRATION", MARGIN, 0.42, 6, { fontSize: 8 });
  drawTopoCrosshair(s, 3.0, 3.3, 2.2);

  // Jumbo "Modern FPS." bottom-left
  micro(s, "TITLE 03 / 05", MARGIN, 5.0, 3, { fontSize: 8, charSpacing: 2 });
  s.addText("Modern FPS.", {
    x: MARGIN, y: 5.2, w: 6, h: 1.2,
    fontFace: FONT, fontSize: 54, italic: true, color: INK,
    align: "left", valign: "top", margin: 0,
  });
  // bearing readout bottom-left
  s.addText(
    [
      { text: "TARGET  ·  482M", options: { breakLine: true } },
      { text: "BEARING  113°", options: {} },
    ],
    {
      x: MARGIN, y: 6.65, w: 3, h: 0.6,
      fontFace: "Courier New", fontSize: 8, color: INK,
      align: "left", valign: "top", margin: 0, charSpacing: 2,
    }
  );

  // Right column header
  micro(s, "SECTION II · TITLE DEEP-DIVES", SW / 2 + 0.2, 0.35, 4, { fontSize: 8 });
  micro(s, "05 / 09", SW - MARGIN - 1.5, 0.35, 1.5, { fontSize: 8, align: "right" });
  micro(s, "TITLE III · MODERN WARFARE FPS", SW / 2 + 0.2, 0.62, 5, { fontSize: 8 });

  // Right headline
  s.addText(
    [
      { text: "Scale warfare,\n", options: {} },
      { text: "rebuilt.", options: { italic: true } },
    ],
    {
      x: SW / 2 + 0.2, y: 1.0, w: 6, h: 1.8,
      fontFace: FONT, fontSize: 44, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Right body
  body(s,
    "The portfolio's large-scale combat entry. Coming out of a rebuild year, the design org is focused on lobby-to-match flow, squad UX, and a modernized HUD language that finally matches the fidelity of the sim itself.",
    SW / 2 + 0.2, 3.1, 5.5, 1.5, { fontSize: 12 }
  );

  // Right stats (bottom-right area)
  const rxs = SW / 2 + 0.2;
  const rws = SW - MARGIN - rxs;
  const sw3 = rws / 3;
  statBig(s, "128", "PLAYERS PER MATCH", rxs, 5.15, sw3, { valueSize: 28 });
  statBig(s, "7", "LIVE MAPS", rxs + sw3, 5.15, sw3, { valueSize: 28 });
  statBig(s, "+38%", "D30 VS PRIOR TITLE", rxs + 2 * sw3, 5.15, sw3, { valueSize: 28 });

  // Right fields
  const fy = 6.3;
  const fw = rws / 2 - 0.25;
  fieldRow(s, "STUDIO", "DICE · RIDGEBACK", rxs, fy, fw);
  fieldRow(s, "GENRE", "FPS · MULTIPLAYER", rxs + fw + 0.5, fy, fw);
  fieldRow(s, "RELEASED", "2021 · SEASONAL", rxs, fy + 0.32, fw);
  fieldRow(s, "DESIGN FOCUS", "HUD & SQUAD FLOW", rxs + fw + 0.5, fy + 0.32, fw);

  // Footer
  micro(s, "EA · PC PORTFOLIO · 2026", SW / 2 - 2, SH - 0.35, 4, { fontSize: 8, align: "center" });
  micro(s, "SEASONAL", SW - MARGIN - 2, SH - 0.35, 2, { fontSize: 8, align: "right" });
}

// -------------------- SLIDE 6: Football Sim — LEFT content, RIGHT jumbo --------------------
deepDiveRightIllus({
  sectionTag: "SECTION II · TITLE DEEP-DIVES",
  page: "06 / 09",
  titleTag: "TITLE IV · FOOTBALL SIM",
  headline1: "Annual release",
  headlineItalic: "cadence.",
  body: "The portfolio's highest-volume PC title and its sharpest design constraint: every screen is reviewed, rebuilt, and shipped on a twelve-month cycle. Ultimate mode remains the dominant live-service surface.",
  stats: [
    { v: "12 mo", l: "RELEASE CYCLE" },
    { v: "#1", l: "PC SPORTS SKU" },
    { v: "~9.2M", l: "PC MAUS" },
  ],
  fields: [
    { l: "STUDIO", v: "VANCOUVER" },
    { l: "GENRE", v: "SPORTS SIMULATION" },
    { l: "RELEASED", v: "ANNUAL · FY26" },
    { l: "DESIGN FOCUS", v: "ULTIMATE-MODE ECONOMY" },
  ],
  footerRight: "ANNUAL",
  subtitle: "STADIUM RADIAL · ORIGINAL ILLUSTRATION",
  jumboText: "Football Sim.",
  jumboTag: "TITLE 04 / 05",
  drawIllus: null,
});

// -------------------- SLIDE 7: Fantasy RPG — LEFT illustration + jumbo, RIGHT content --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Left illustration tag
  micro(s, "SIGIL & RIDGELINE · ORIGINAL ILLUSTRATION", MARGIN, 0.42, 6, { fontSize: 8 });

  // Soft ridgeline illustration on left
  drawRidgeline(s, 0, 3.6, SW / 2, 2.9);

  // Bottom-left jumbo
  micro(s, "TITLE 05 / 05", MARGIN, 5.0, 3, { fontSize: 8, charSpacing: 2 });
  s.addText("Fantasy RPG.", {
    x: MARGIN, y: 5.2, w: 6, h: 1.2,
    fontFace: FONT, fontSize: 54, italic: true, color: INK,
    align: "left", valign: "top", margin: 0,
  });

  // Bottom-left readout
  micro(s, "ACT III  ·  THE LONG NIGHT", MARGIN, SH - 0.45, 4, { fontSize: 8, charSpacing: 2 });

  // Right column header
  micro(s, "SECTION II · TITLE DEEP-DIVES", SW / 2 + 0.2, 0.35, 4, { fontSize: 8 });
  micro(s, "07 / 09", SW - MARGIN - 1.5, 0.35, 1.5, { fontSize: 8, align: "right" });
  micro(s, "TITLE V · FANTASY RPG", SW / 2 + 0.2, 0.62, 5, { fontSize: 8 });

  // Right headline
  s.addText(
    [
      { text: "A single-player\n", options: {} },
      { text: "return.", options: { italic: true } },
    ],
    {
      x: SW / 2 + 0.2, y: 1.0, w: 6, h: 1.8,
      fontFace: FONT, fontSize: 44, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Right body
  body(s,
    "The portfolio's most story-driven release and our clearest statement that premium single-player design still has a home on PC. Deep companion systems, bespoke menus, and a tightly-authored narrative UX.",
    SW / 2 + 0.2, 3.1, 5.5, 1.5, { fontSize: 12 }
  );

  // Right stats
  const rxs = SW / 2 + 0.2;
  const rws = SW - MARGIN - rxs;
  const sw3 = rws / 3;
  statBig(s, "80+ h", "CRITICAL PATH", rxs, 5.15, sw3, { valueSize: 28 });
  statBig(s, "7", "COMPANION ARCS", rxs + sw3, 5.15, sw3, { valueSize: 28 });
  statBig(s, "86", "METACRITIC · PC", rxs + 2 * sw3, 5.15, sw3, { valueSize: 28 });

  // Right fields — asymmetric: col1 narrower so col2 has more room for long values
  const fy = 6.3;
  const fw1 = 2.0;
  const fw2 = rws - fw1 - 0.4;
  fieldRow(s, "STUDIO", "BIOWARE", rxs, fy, fw1);
  fieldRow(s, "GENRE", "ACTION RPG", rxs + fw1 + 0.4, fy, fw2);
  fieldRow(s, "RELEASED", "2024", rxs, fy + 0.32, fw1);
  fieldRow(s, "DESIGN FOCUS", "NARRATIVE & MENU CRAFT", rxs + fw1 + 0.4, fy + 0.32, fw2);

  // Footer
  micro(s, "EA · PC PORTFOLIO · 2026", SW / 2 - 2, SH - 0.35, 4, { fontSize: 8, align: "center" });
  micro(s, "SINGLE-PLAYER", SW - MARGIN - 2, SH - 0.35, 2, { fontSize: 8, align: "right" });
}

// -------------------- SLIDE 8: Portfolio shape — 3 tables --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  headerBar(s, "SECTION III · PORTFOLIO SHAPE", "08 / 09");

  // Big headline left
  s.addText(
    [
      { text: "How the portfolio ", options: {} },
      { text: "is\nbuilt.", options: { italic: true } },
    ],
    {
      x: MARGIN, y: 0.95, w: 6, h: 1.8,
      fontFace: FONT, fontSize: 44, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Description top-right
  body(s,
    "A quick read on where design effort sits today — by genre, by studio, and by reach. Useful for spotting concentration risk and investment gaps.",
    SW / 2 + 0.4, 1.2, 5.0, 1.2, { fontSize: 11 }
  );

  // Three column tables
  const tableY = 3.1;
  const tableColW = (SW - 2 * MARGIN) / 3;

  // Column 1: BY GENRE
  const c1x = MARGIN;
  micro(s, "BY GENRE", c1x, tableY, tableColW * 0.5, { fontSize: 8 });
  micro(s, "SHARE OF DESIGN HC", c1x + tableColW * 0.5, tableY, tableColW * 0.45, { fontSize: 8, align: "right" });
  // hairline under header
  s.addShape("line", { x: c1x, y: tableY + 0.28, w: tableColW - 0.3, h: 0, line: { color: SOFT, width: 0.75 } });
  const genres = [
    ["Shooter", "34%"], ["Sports", "24%"], ["Sim / Sandbox", "18%"], ["RPG", "14%"], ["R&D / unannounced", "10%"],
  ];
  genres.forEach(([name, pct], i) => {
    const ry = tableY + 0.45 + i * 0.38;
    s.addText(name, {
      x: c1x, y: ry, w: tableColW * 0.6, h: 0.3,
      fontFace: FONT, fontSize: 12, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(pct, {
      x: c1x + tableColW * 0.4, y: ry, w: tableColW * 0.5, h: 0.3,
      fontFace: FONT, fontSize: 10, color: INK, charSpacing: 1, align: "right", valign: "top", margin: 0,
    });
  });

  // Column 2: BY STUDIO
  const c2x = MARGIN + tableColW;
  micro(s, "BY STUDIO", c2x, tableY, tableColW * 0.5, { fontSize: 8 });
  micro(s, "5 TITLES · 4 STUDIOS", c2x + tableColW * 0.4, tableY, tableColW * 0.55, { fontSize: 8, align: "right" });
  s.addShape("line", { x: c2x, y: tableY + 0.28, w: tableColW - 0.3, h: 0, line: { color: SOFT, width: 0.75 } });
  const studios = [
    ["Redwood Shores", "1 title"], ["Northern Lights", "1 title"], ["DICE · Ridgeback", "1 title"], ["Vancouver", "1 title"], ["BioWare", "1 title"],
  ];
  studios.forEach(([name, val], i) => {
    const ry = tableY + 0.45 + i * 0.38;
    s.addText(name, {
      x: c2x, y: ry, w: tableColW * 0.6, h: 0.3,
      fontFace: FONT, fontSize: 12, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(val, {
      x: c2x + tableColW * 0.4, y: ry, w: tableColW * 0.5, h: 0.3,
      fontFace: FONT, fontSize: 10, color: INK, align: "right", valign: "top", margin: 0,
    });
  });

  // Column 3: BY REACH
  const c3x = MARGIN + 2 * tableColW;
  micro(s, "BY REACH", c3x, tableY, tableColW * 0.5, { fontSize: 8 });
  micro(s, "PC, FY25", c3x + tableColW * 0.5, tableY, tableColW * 0.45, { fontSize: 8, align: "right" });
  s.addShape("line", { x: c3x, y: tableY + 0.28, w: tableColW - 0.3, h: 0, line: { color: SOFT, width: 0.75 } });
  const reach = [
    ["COMBINED MAU", "32.4M"],
    ["LIFETIME PLAYERS", "210M+"],
    ["AVG SESSION", "47m"],
    ["D30 RETENTION", "41%"],
  ];
  reach.forEach(([label, val], i) => {
    const ry = tableY + 0.5 + i * 0.55;
    micro(s, label, c3x, ry + 0.15, tableColW * 0.5, { fontSize: 8 });
    s.addText(val, {
      x: c3x + tableColW * 0.3, y: ry, w: tableColW * 0.6 - 0.3, h: 0.45,
      fontFace: FONT, fontSize: 26, color: INK, align: "right", valign: "top", margin: 0,
    });
  });
}

// -------------------- SLIDE 9: Three design bets --------------------
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };

  // Header (top)
  micro(s, "END · THANK YOU", MARGIN + 0.3, 0.35, 3, { fontSize: 8 });
  micro(s, "09 / 09", SW - MARGIN - 1.5, 0.35, 1.5, { fontSize: 8, align: "right" });
  micro(s, "SECTION IV · WHAT'S NEXT", MARGIN + 0.3, 0.62, 4, { fontSize: 8 });

  // Big headline left
  s.addText(
    [
      { text: "Three design\nbets for ", options: {} },
      { text: "FY27.", options: { italic: true } },
    ],
    {
      x: MARGIN, y: 1.1, w: 6, h: 2.8,
      fontFace: FONT, fontSize: 54, color: INK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Right: 3 bets (number + header + body)
  const rx = SW / 2 + 0.5;
  const rw = SW - MARGIN - rx;
  const betY = 0.85;
  const betGap = 1.75;

  const bets = [
    {
      num: "01",
      head: "A shared UI language for live service.",
      body: "Shooter, Sports, and Sim all run parallel live-service surfaces with divergent patterns. A shared component layer would cut design time per season and lift quality across the portfolio.",
    },
    {
      num: "02",
      head: "Onboarding as a portfolio-wide investment.",
      body: "First-session UX is the single highest-leverage surface in four of our five titles. Treat it as a dedicated craft competency rather than a per-title effort.",
    },
    {
      num: "03",
      head: "Protect room for premium single-player.",
      body: "The Fantasy RPG showed there is still appetite for authored, menu-rich PC experiences. Keep a deliberate lane for bespoke design work outside the live-service pattern.",
    },
  ];

  bets.forEach((b, i) => {
    const y = betY + i * betGap;
    // Italic number
    s.addText(b.num, {
      x: rx, y: y, w: 0.7, h: 0.5,
      fontFace: FONT, fontSize: 22, italic: true, color: INK,
      align: "left", valign: "top", margin: 0,
    });
    // Header — allow 2 lines height to avoid collision
    s.addText(b.head, {
      x: rx + 0.85, y: y, w: rw - 0.85, h: 0.7,
      fontFace: FONT, fontSize: 16, color: INK,
      align: "left", valign: "top", margin: 0,
    });
    // Body — start below header with enough gap
    body(s, b.body, rx + 0.85, y + 0.75, rw - 0.85, 0.9, { fontSize: 10 });
  });

  // Footer (bottom-left "PREPARED BY" / "REVIEW DATE")
  const fy = SH - 1.0;
  micro(s, "PREPARED BY", MARGIN + 0.3, fy, 2, { fontSize: 8 });
  s.addText("Product Design", {
    x: MARGIN + 0.3, y: fy + 0.25, w: 3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: INK, align: "left", valign: "top", margin: 0,
  });
  micro(s, "REVIEW DATE", MARGIN + 3.3, fy, 2, { fontSize: 8 });
  s.addText("April 2026", {
    x: MARGIN + 3.3, y: fy + 0.25, w: 3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: INK, align: "left", valign: "top", margin: 0,
  });
}

// ---------- write ----------
const outPath = process.argv[2] || "Deliverable_1_recreated.pptx";
pres.writeFile({ fileName: outPath }).then((f) => {
  console.log("Wrote:", f);
});
