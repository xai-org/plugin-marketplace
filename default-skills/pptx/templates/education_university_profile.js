/**
 * lse.js — Recreates the LSE "A Brief Portrait" deck using pptxgenjs.
 *
 * Run:
 *   npm install pptxgenjs   (or: npm install -g pptxgenjs)
 *   node lse.js
 *
 * Output: lse.pptx
 *
 * Slide canvas: custom 20" × 11.25" (matches the source file).
 * Two-tone editorial system:
 *   - DARK slides (1, 3, 6, 9): #101418 background, cream text
 *   - LIGHT slides (2, 4, 5, 7, 8, 10): #EDE8DD background, ink text
 * Accent colors: burgundy #7A1C2A (light slides), coral #D97A4A (dark slides).
 * Header pattern: thin top rule + dot, section number/name (left), tagline (right),
 * chapter line in accent color, large display title with one italic accent word.
 */

const pptxgen = require("pptxgenjs");

// ─────────────────────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────────────────────
const W = 20;            // slide width
const H = 11.25;         // slide height
const M = 0.75;          // outer margin

const C = {
  // Light theme
  cream:      "EDE8DD",
  ink:        "1A1A1A",
  inkSoft:    "3D3D3D",
  muted:      "8A8578",
  rule:       "C9C3B5",
  burgundy:   "7A1C2A",
  // Dark theme
  navy:       "101418",
  cream2:     "E8E2D5",
  navyMuted:  "7A776F",
  navyRule:   "2A2E33",
  coral:      "D97A4A",
};

const FONT_SERIF = "Georgia";
const FONT_SANS  = "Calibri";

// ─────────────────────────────────────────────────────────────────────────────
// Boilerplate
// ─────────────────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.title  = "L · S · E / A Brief Portrait";
pres.author = "LSE";
pres.defineLayout({ name: "LSE_CUSTOM", width: W, height: H });
pres.layout = "LSE_CUSTOM";

// ─────────────────────────────────────────────────────────────────────────────
// Header / Footer helpers
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Draws the standard chrome on every slide:
 *   - thin horizontal rule near top
 *   - small filled dot at the right end of the rule
 *   - top-left section number + name (e.g. "02 · ORIGINS")
 *   - top-right tagline (e.g. "1895 — PRESENT")
 *   - chapter line in accent color (e.g. "CHAPTER I · 1895–1910")
 */
function drawHeader(slide, opts) {
  const dark   = opts.dark === true;
  const bgText = dark ? C.cream2 : C.ink;
  const muted  = dark ? C.navyMuted : C.muted;
  const rule   = dark ? C.navyRule : C.rule;
  const accent = dark ? C.coral : C.burgundy;

  // Top rule
  slide.addShape(pres.shapes.LINE, {
    x: M, y: 0.55, w: W - 2 * M, h: 0,
    line: { color: rule, width: 0.75 },
  });
  // Right-end dot
  slide.addShape(pres.shapes.OVAL, {
    x: W - M - 0.07, y: 0.485, w: 0.14, h: 0.14,
    fill: { color: accent }, line: { color: accent, width: 0 },
  });

  // Section number + name (top-left)
  slide.addText(opts.section, {
    x: M, y: 0.7, w: 8, h: 0.4,
    fontFace: FONT_SANS, fontSize: 12, color: muted,
    charSpacing: 6, bold: false, margin: 0,
  });

  // Tagline (top-right)
  slide.addText(opts.tag, {
    x: W - M - 8, y: 0.7, w: 8, h: 0.4,
    fontFace: FONT_SANS, fontSize: 12, color: muted,
    charSpacing: 6, align: "right", margin: 0,
  });

  // Chapter line (accent color)
  slide.addText(opts.chapter, {
    x: M, y: 1.15, w: W - 2 * M, h: 0.4,
    fontFace: FONT_SANS, fontSize: 13, color: accent,
    charSpacing: 6, bold: false, margin: 0,
  });
}

/**
 * Footer: page indicator (left), section name in caps (right).
 */
function drawFooter(slide, opts) {
  const dark  = opts.dark === true;
  const muted = dark ? C.navyMuted : C.muted;

  slide.addText(opts.page, {
    x: M, y: H - 0.7, w: 4, h: 0.35,
    fontFace: FONT_SANS, fontSize: 11, color: muted,
    charSpacing: 4, margin: 0,
  });

  if (opts.label) {
    slide.addText(opts.label, {
      x: W - M - 6, y: H - 0.7, w: 6, h: 0.35,
      fontFace: FONT_SANS, fontSize: 11, color: muted,
      charSpacing: 4, align: "right", margin: 0,
    });
  }
}

/**
 * Display title: a giant serif headline with ONE italicised accent word.
 * Renders as rich text so the italic word inherits accent color + italic style.
 */
function drawTitle(slide, parts, opts) {
  const dark   = opts.dark === true;
  const ink    = dark ? C.cream2 : C.ink;
  const accent = dark ? C.coral : C.burgundy;
  const size   = opts.size || 56;
  const y      = opts.y    ?? 1.7;
  const h      = opts.h    || 1.8;
  const w      = opts.w    || (W - 2 * M);

  const runs = parts.map((p) => ({
    text: p.text,
    options: {
      fontFace: FONT_SERIF,
      fontSize: size,
      color: p.italic ? accent : ink,
      italic: !!p.italic,
      bold: false,
    },
  }));

  slide.addText(runs, {
    x: M, y, w, h, valign: "top", margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 1 — COVER (dark)
// ─────────────────────────────────────────────────────────────────────────────
function slide1() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Top rule + dot
  s.addShape(pres.shapes.LINE, {
    x: M, y: 0.55, w: W - 2 * M, h: 0,
    line: { color: C.navyRule, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: W - M - 0.07, y: 0.485, w: 0.14, h: 0.14,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 },
  });

  // Top-left brand
  s.addText("L · S · E  /  A BRIEF PORTRAIT", {
    x: M, y: 0.7, w: 10, h: 0.4,
    fontFace: FONT_SANS, fontSize: 12, color: C.navyMuted,
    charSpacing: 8, margin: 0,
  });

  // Top-right year
  s.addText("MMXXVI", {
    x: W - M - 5, y: 0.7, w: 5, h: 0.4,
    fontFace: FONT_SANS, fontSize: 12, color: C.cream2,
    charSpacing: 8, align: "right", margin: 0,
  });

  // Eyebrow
  s.addText("ESTABLISHED 1895 · HOUGHTON STREET, LONDON WC2", {
    x: M, y: 2.0, w: W - 2 * M, h: 0.45,
    fontFace: FONT_SANS, fontSize: 14, color: C.coral,
    charSpacing: 6, margin: 0,
  });

  // Hero title — runs as one serif headline with "Economics" in italic coral
  s.addText([
    { text: "The London School of\n", options: {
        fontFace: FONT_SERIF, fontSize: 88, color: C.cream2 } },
    { text: "Economics", options: {
        fontFace: FONT_SERIF, fontSize: 88, color: C.coral, italic: true } },
    { text: " and Political\nScience.", options: {
        fontFace: FONT_SERIF, fontSize: 88, color: C.cream2 } },
  ], {
    x: M, y: 2.55, w: W - 2 * M, h: 4.2, valign: "top", margin: 0,
  });

  // ── Orbital diagram ──
  // Concentric ellipses with a baseline rule and a coral pin at the centre.
  const cx = W / 2;
  const cy = 8.7;
  const baseY = cy + 0.05;

  // baseline rule
  s.addShape(pres.shapes.LINE, {
    x: M, y: baseY, w: W - 2 * M, h: 0,
    line: { color: C.navyRule, width: 0.5 },
  });

  // ellipses (largest -> smallest)
  const rings = [
    { rx: 8.6, ry: 1.55 },
    { rx: 6.6, ry: 1.20 },
    { rx: 4.6, ry: 0.85 },
    { rx: 2.7, ry: 0.50 },
    { rx: 1.2, ry: 0.22 },
  ];
  for (const r of rings) {
    s.addShape(pres.shapes.OVAL, {
      x: cx - r.rx, y: cy - r.ry, w: 2 * r.rx, h: 2 * r.ry,
      fill: { type: "none" },
      line: { color: C.navyRule, width: 0.5 },
    });
  }
  // coral pin
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.06, y: cy - 0.06, w: 0.12, h: 0.12,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 },
  });
  // small star dots
  const stars = [
    [M + 0.4, cy - 0.9], [W - M - 0.4, cy - 0.7],
    [M + 1.6, cy - 1.4], [W - M - 1.8, cy - 1.2],
    [cx - 5.8, cy - 1.4], [cx + 6.0, cy - 1.0],
  ];
  for (const [x, y] of stars) {
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.025, y: y - 0.025, w: 0.05, h: 0.05,
      fill: { color: C.cream2 }, line: { color: C.cream2, width: 0 },
    });
  }

  // Footer (cover-style)
  s.addText("COVER · 01", {
    x: M, y: H - 0.7, w: 6, h: 0.35,
    fontFace: FONT_SANS, fontSize: 12, color: C.navyMuted,
    charSpacing: 6, margin: 0,
  });
  s.addText("A STUDY IN SOCIAL SCIENCE", {
    x: W - M - 8, y: H - 0.7, w: 8, h: 0.35,
    fontFace: FONT_SANS, fontSize: 12, color: C.navyMuted,
    charSpacing: 6, align: "right", margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 2 — ORIGINS (light)
// ─────────────────────────────────────────────────────────────────────────────
function slide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "02 · ORIGINS",
    tag: "1895 — PRESENT",
    chapter: "CHAPTER I · 1895–1910",
  });

  drawTitle(s, [
    { text: "Founded in " },
    { text: "1895", italic: true },
    { text: "." },
  ], { dark: false, size: 60, y: 1.65, h: 1.5 });

  // Body paragraphs (left column)
  s.addText([
    { text: "The school was established by four members of the Fabian Society — Sidney and Beatrice Webb, Graham Wallas, and George Bernard Shaw — to advance the betterment of society through the study of poverty and inequality.",
      options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "It opened with about three hundred students above a solicitor's office on John Street, Adelphi. Within a decade, it had moved to Houghton Street, where it remains." },
  ], {
    x: M, y: 3.7, w: 8.6, h: 4.5,
    fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
    paraSpaceAfter: 8, valign: "top", margin: 0,
  });

  // ── Strata-of-time diagram (right side) ──
  const cx = 14.6;
  const cy = 6.7;

  // Concentric ellipses (some solid, some dotted)
  const rings = [
    { rx: 4.4, ry: 2.6, dash: "solid" },
    { rx: 3.3, ry: 1.95, dash: "dash"  },
    { rx: 2.2, ry: 1.30, dash: "solid" },
    { rx: 1.1, ry: 0.65, dash: "dash"  },
  ];
  for (const r of rings) {
    s.addShape(pres.shapes.OVAL, {
      x: cx - r.rx, y: cy - r.ry, w: 2 * r.rx, h: 2 * r.ry,
      fill: { type: "none" },
      line: { color: C.muted, width: 0.5, dashType: r.dash },
    });
  }
  // Centre burgundy dot
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.08, y: cy - 0.08, w: 0.16, h: 0.16,
    fill: { color: C.burgundy }, line: { color: C.burgundy, width: 0 },
  });

  // Year markers + tick marks at N/S/E/W
  // Top — 1895
  s.addShape(pres.shapes.LINE, {
    x: cx, y: cy - 2.6, w: 0, h: 0.18, line: { color: C.inkSoft, width: 0.5 },
  });
  s.addText("1895", {
    x: cx - 0.6, y: cy - 3.0, w: 1.2, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 14, color: C.inkSoft,
    italic: true, align: "center", margin: 0,
  });
  // Bottom — 2026
  s.addShape(pres.shapes.LINE, {
    x: cx, y: cy + 2.6 - 0.18, w: 0, h: 0.18, line: { color: C.inkSoft, width: 0.5 },
  });
  s.addText("2026", {
    x: cx - 0.6, y: cy + 2.65, w: 1.2, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 14, color: C.inkSoft,
    italic: true, align: "center", margin: 0,
  });
  // Left — 1925
  s.addText("1925", {
    x: cx - 4.4 - 0.95, y: cy - 0.16, w: 0.9, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 14, color: C.inkSoft,
    italic: true, align: "right", margin: 0,
  });
  // Right — 1970
  s.addText("1970", {
    x: cx + 4.4 + 0.05, y: cy - 0.16, w: 0.9, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 14, color: C.inkSoft,
    italic: true, align: "left", margin: 0,
  });

  // Small burgundy tick marks on rings
  const ticks = [
    [cx - 2.0, cy - 1.0], [cx + 2.2, cy - 0.9],
    [cx - 2.4, cy + 1.0], [cx + 2.0, cy + 0.95],
  ];
  for (const [x, y] of ticks) {
    s.addShape(pres.shapes.LINE, {
      x, y, w: 0, h: 0.18,
      line: { color: C.burgundy, width: 0.9 },
    });
  }

  // Figure caption
  s.addText("FIG. 01 · STRATA OF TIME, 131 YEARS", {
    x: 11.3, y: 9.6, w: 6.5, h: 0.35,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 6, align: "center", margin: 0,
  });

  drawFooter(s, { dark: false, page: "02 / 10", label: "ORIGINS" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 3 — MISSION (dark)
// ─────────────────────────────────────────────────────────────────────────────
function slide3() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  drawHeader(s, {
    dark: true,
    section: "03 · MISSION",
    tag: "RERUM COGNOSCERE CAUSAS",
    chapter: "CHAPTER II · A WORKING CREED",
  });

  drawTitle(s, [
    { text: "To " },
    { text: "know", italic: true },
    { text: " the causes of things." },
  ], { dark: true, size: 60, y: 1.65, h: 1.5 });

  // Lead paragraph
  s.addText(
    "From its founding, the school has been organised around the empirical study of society — the conviction that the social world can be measured, modelled, and improved.",
    {
      x: M, y: 3.7, w: 8.4, h: 1.8,
      fontFace: FONT_SERIF, fontSize: 18, color: C.cream2,
      paraSpaceAfter: 8, valign: "top", margin: 0,
    }
  );

  // 2x2 creed grid
  const cell = (label, body, x, y) => {
    s.addText(label, {
      x, y, w: 3.6, h: 0.4,
      fontFace: FONT_SANS, fontSize: 12, color: C.coral,
      charSpacing: 6, margin: 0,
    });
    s.addText(body, {
      x, y: y + 0.45, w: 3.6, h: 1.2,
      fontFace: FONT_SERIF, fontSize: 16, color: C.cream2,
      margin: 0,
    });
  };

  cell("METHOD", "Empirical, quantitative, comparative.", M,        6.0);
  cell("SCOPE",  "Economics, politics, sociology, law.", M + 4.0,    6.0);
  cell("STANCE", "Plural, debated, non-doctrinal.",      M,         7.85);
  cell("END",    "Understanding for public benefit.",    M + 4.0,    7.85);

  // ── Scatter with regression curve (right) ──
  const px = 11.0, py = 3.7;
  const pw = 8.0,  ph = 5.4;

  // Plot frame (no fill, thin border)
  s.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { type: "none" }, line: { color: C.navyRule, width: 0.5 },
  });
  // Faint gridlines
  for (let i = 1; i < 5; i++) {
    s.addShape(pres.shapes.LINE, {
      x: px, y: py + (ph * i) / 5, w: pw, h: 0,
      line: { color: C.navyRule, width: 0.4 },
    });
    s.addShape(pres.shapes.LINE, {
      x: px + (pw * i) / 5, y: py, w: 0, h: ph,
      line: { color: C.navyRule, width: 0.4 },
    });
  }

  // Scatter points
  const pts = [
    [0.18, 0.55], [0.28, 0.72], [0.32, 0.50], [0.40, 0.65],
    [0.46, 0.42], [0.55, 0.55], [0.62, 0.40], [0.70, 0.30],
    [0.76, 0.55], [0.85, 0.35], [0.92, 0.20],
  ];
  for (const [fx, fy] of pts) {
    const x = px + fx * pw, y = py + fy * ph;
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.05, y: y - 0.05, w: 0.10, h: 0.10,
      fill: { color: C.cream2 }, line: { color: C.cream2, width: 0 },
    });
  }

  // Use a real spline (combo line+scatter) for the cream wave & coral fit
  s.addChart(
    [
      {
        type: pres.charts.LINE,
        data: [{
          name: "wave",
          labels: ["a","b","c","d","e","f","g","h","i","j","k","l","m"],
          values: [0.55,0.45,0.40,0.45,0.55,0.62,0.58,0.50,0.48,0.55,0.60,0.55,0.48],
        }],
        options: {
          chartColors: [C.cream2], lineSize: 2, lineSmooth: true,
          showLegend: false, showValue: false,
          lineDataSymbol: "none",
        },
      },
      {
        type: pres.charts.LINE,
        data: [{
          name: "fit",
          // Ascending (inverted from before so coral line rises to upper-right)
          labels: ["a","b","c","d","e","f","g","h","i","j","k","l","m"],
          values: [0.08,0.12,0.18,0.25,0.32,0.40,0.48,0.55,0.62,0.70,0.78,0.85,0.92],
        }],
        options: {
          chartColors: [C.coral], lineSize: 2.5, lineSmooth: true,
          showLegend: false, showValue: false,
          lineDataSymbol: "none",
        },
      },
    ],
    {
      x: px, y: py, w: pw, h: ph,
      catAxisHidden: true, valAxisHidden: true,
      valGridLine: { style: "none" }, catGridLine: { style: "none" },
      chartArea: { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
      plotArea:  { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
      showLegend: false,
      // values must align with axis bottom — flip valAxis to make 0 at bottom
      valAxisMinVal: 0, valAxisMaxVal: 1,
    }
  );

  // Highlight the top-right end-of-fit point in coral
  s.addShape(pres.shapes.OVAL, {
    x: px + 0.92 * pw - 0.10, y: py + (1 - 0.92) * ph - 0.10, w: 0.20, h: 0.20,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 },
  });

  // Axis labels
  s.addText("y — explained", {
    x: px - 0.05, y: py - 0.5, w: 3, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 13, color: C.navyMuted,
    italic: true, margin: 0,
  });
  s.addText("x — observed", {
    x: px - 0.05, y: py + ph + 0.15, w: 3, h: 0.3,
    fontFace: FONT_SERIF, fontSize: 13, color: C.navyMuted,
    italic: true, margin: 0,
  });

  drawFooter(s, { dark: true, page: "03 / 10", label: "MISSION" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 4 — PLACE (light)
// ─────────────────────────────────────────────────────────────────────────────
function slide4() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "04 · PLACE",
    tag: "51.5144°N · 0.1166°W",
    chapter: "CHAPTER III · THE CITY AS CAMPUS",
  });

  drawTitle(s, [
    { text: "A " },
    { text: "vertical", italic: true },
    { text: " campus on Houghton Street." },
  ], { dark: false, size: 56, y: 1.65, h: 1.5 });

  // ── Vertical-bars "skyline" diagram (left half) ──
  // Each tower is a tall rectangle subdivided into floor lines, with one
  // floor of one tower filled in burgundy (the "vertical campus" beat).
  const baseY  = 9.2;
  const towers = [
    { x: 2.2, w: 1.2, h: 4.7, floors: 7,  highlight: -1 },
    { x: 4.2, w: 1.4, h: 6.0, floors: 9,  highlight: 8  }, // top floor burgundy
    { x: 6.6, w: 1.2, h: 3.6, floors: 5,  highlight: -1 },
    { x: 8.4, w: 1.2, h: 5.3, floors: 8,  highlight: -1 },
  ];
  // Ground line
  s.addShape(pres.shapes.LINE, {
    x: M, y: baseY, w: 9.0, h: 0,
    line: { color: C.muted, width: 0.6 },
  });
  for (const t of towers) {
    // Tower outline
    s.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: baseY - t.h, w: t.w, h: t.h,
      fill: { type: "none" }, line: { color: C.inkSoft, width: 0.6 },
    });
    // Floor divisions
    const floorH = t.h / t.floors;
    for (let i = 0; i < t.floors; i++) {
      const y = baseY - t.h + i * floorH;
      // Highlighted floor — fill burgundy
      if (i === t.floors - 1 - t.highlight && t.highlight >= 0) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: t.x, y, w: t.w, h: floorH,
          fill: { color: C.burgundy }, line: { color: C.burgundy, width: 0 },
        });
      }
      // Floor line
      if (i > 0) {
        s.addShape(pres.shapes.LINE, {
          x: t.x, y, w: t.w, h: 0,
          line: { color: C.inkSoft, width: 0.4 },
        });
      }
    }
  }
  // Tiny ground-tick marks under each tower
  for (const t of towers) {
    s.addShape(pres.shapes.LINE, {
      x: t.x + t.w / 2, y: baseY, w: 0, h: 0.12,
      line: { color: C.muted, width: 0.5 },
    });
  }

  // ── Right column — paragraph + 2x2 stat grid ──
  const rx = 10.7;
  const rw = 8.6;

  s.addText(
    "The campus is a tight cluster of buildings arranged around a single pedestrianised street between Aldwych and the Royal Courts of Justice. There is no quadrangle and no playing field — the city is the campus.",
    {
      x: rx, y: 3.6, w: rw, h: 2.0,
      fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: rx, y: 5.95, w: rw, h: 0,
    line: { color: C.rule, width: 0.6 },
  });

  // 2x2 stats
  const stat = (num, label, x, y, accent) => {
    s.addText(num, {
      x, y, w: 4.0, h: 0.85,
      fontFace: FONT_SERIF, fontSize: 48,
      color: accent ? C.burgundy : C.ink,
      italic: !!accent, margin: 0,
    });
    s.addText(label, {
      x, y: y + 0.95, w: 4.0, h: 0.6,
      fontFace: FONT_SANS, fontSize: 12, color: C.muted,
      charSpacing: 5, margin: 0,
    });
  };
  stat("25",  "BUILDINGS ON OR NEAR\nCAMPUS",   rx,         6.2);
  stat("0",   "LAWNS, COURTS, OR\nQUADS",       rx + 4.4,   6.2, true);
  stat("2",   "TUBE STATIONS WITHIN\n5 MIN",    rx,         8.2);
  stat("131", "YEARS ON THIS SITE",             rx + 4.4,   8.2);

  drawFooter(s, { dark: false, page: "04 / 10", label: "PLACE" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 5 — STRUCTURE (light, big table)
// ─────────────────────────────────────────────────────────────────────────────
function slide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "05 · STRUCTURE",
    tag: "FACULTY & DEPARTMENTS",
    chapter: "CHAPTER IV · THE DISCIPLINES",
  });

  drawTitle(s, [
    { text: "A " },
    { text: "federation", italic: true },
    { text: " of social sciences." },
  ], { dark: false, size: 56, y: 1.65, h: 1.5 });

  // Lead paragraph
  s.addText(
    "The school is organised into roughly two dozen academic departments and institutes, all within a single faculty of the social sciences. There is no medical school, no engineering, no humanities faculty — the discipline is the territory.",
    {
      x: M, y: 3.5, w: W - 2 * M, h: 1.5,
      fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  // ── Departments table (4 rows × 6 columns) ──
  // Some cells are "founded" cells: they show a date sub-line and are shaded
  // (burgundy or navy depending on the era).
  const dept = (name, year, shade) => {
    const cell = {
      text: [
        { text: name + (year ? "\n" : ""), options: {
            fontFace: FONT_SERIF, fontSize: 16,
            color: shade ? C.cream : C.ink,
        }},
        ...(year ? [{ text: `DEPT — ${year}`, options: {
            fontFace: FONT_SANS, fontSize: 11,
            color: shade ? C.cream : C.muted,
            charSpacing: 4,
        }}] : []),
      ],
      options: {
        valign: "top",
        margin: 0.12,
      },
    };
    if (shade === "burgundy") {
      cell.options.fill = { color: C.burgundy };
    } else if (shade === "navy") {
      cell.options.fill = { color: C.navy };
    } else {
      cell.options.fill = { color: C.cream };
    }
    return cell;
  };

  // Row layout faithful to the source slide
  const rows = [
    [
      dept("Economics", "1895", "burgundy"),
      dept("Government"),
      dept("Law"),
      dept("Sociology"),
      dept("Anthropology"),
      dept("Geography"),
    ],
    [
      dept("Finance"),
      dept("Int'l Relations", "1927", "navy"),
      dept("Statistics"),
      dept("Methodology", "1946", "navy"),
      dept("History"),
      dept("Philosophy"),
    ],
    [
      dept("Management"),
      dept("Accounting"),
      dept("Social Policy", "1912", "burgundy"),
      dept("Psychology"),
      dept("Demography"),
      dept("Media & Comm.", "2003", "navy"),
    ],
    [
      dept("Gender Studies"),
      dept("Health Policy"),
      dept("Economic History"),
      dept("Mathematics"),
      dept("Public Affairs", "2018", "navy"),
      dept("Environment"),
    ],
  ];

  s.addTable(rows, {
    x: M, y: 5.3, w: W - 2 * M,
    colW: Array(6).fill((W - 2 * M) / 6),
    rowH: 0.95,
    border: { type: "solid", color: C.muted, pt: 0.5 },
    fontFace: FONT_SERIF, fontSize: 16, color: C.ink,
  });

  // Caption row beneath the table
  s.addText("FIG. 02 · 24 DEPARTMENTS, 1 FACULTY", {
    x: M, y: H - 1.25, w: 9, h: 0.35,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 6, margin: 0,
  });
  s.addText("SHADED — FOUNDED IN THIS DECADE", {
    x: W - M - 9, y: H - 1.25, w: 9, h: 0.35,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 6, align: "right", margin: 0,
  });

  drawFooter(s, { dark: false, page: "05 / 10", label: "STRUCTURE" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 6 — RESEARCH (dark)
// ─────────────────────────────────────────────────────────────────────────────
function slide6() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  drawHeader(s, {
    dark: true,
    section: "06 · RESEARCH",
    tag: "OUTPUT & INFLUENCE",
    chapter: "CHAPTER V · OUTPUT · CITATION · REACH",
  });

  drawTitle(s, [
    { text: "Disproportionate to its " },
    { text: "size", italic: true },
    { text: "." },
  ], { dark: true, size: 56, y: 1.65, h: 1.5 });

  // Lead
  s.addText(
    "The school is small by global standards — fewer students than a single American state university — yet its output of cited research, public commentary, and policy work is a recurring feature of any league table that measures social-science influence.",
    {
      x: M, y: 3.5, w: W - 2 * M, h: 1.6,
      fontFace: FONT_SERIF, fontSize: 18, color: C.cream2,
      margin: 0, valign: "top",
    }
  );

  // ── 4 stat columns separated by vertical rules ──
  const stats = [
    { num: "#2",  label: "QS SOCIAL SCIENCES,\n2025",   accent: true  },
    { num: "19",  label: "NOBEL LAUREATES\nAFFILIATED" },
    { num: "25",  label: "RESEARCH CENTRES &\nINSTITUTES" },
    { num: "137", label: "PUBLIC LECTURES PER\nYEAR" },
  ];
  const colW = (W - 2 * M) / 4;
  const top  = 5.7;
  for (let i = 0; i < stats.length; i++) {
    const sx = M + i * colW;
    // Vertical rule between columns
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: sx, y: top, w: 0, h: 1.6,
        line: { color: C.navyRule, width: 0.6 },
      });
    }
    s.addText(stats[i].num, {
      x: sx + 0.3, y: top, w: colW - 0.4, h: 0.95,
      fontFace: FONT_SERIF, fontSize: 56,
      color: stats[i].accent ? C.coral : C.cream2,
      italic: !!stats[i].accent, margin: 0,
    });
    s.addText(stats[i].label, {
      x: sx + 0.3, y: top + 1.05, w: colW - 0.4, h: 0.6,
      fontFace: FONT_SANS, fontSize: 12, color: C.navyMuted,
      charSpacing: 5, margin: 0,
    });
  }

  // ── Bar-spike pattern at bottom (citation rhythm) ──
  const barY  = 8.6;
  const barH  = 1.8;
  const total = 60;
  const left  = M;
  const usableW = W - 2 * M;
  const step    = usableW / total;
  // Deterministic-feeling pattern
  const accentCols = new Set([3, 18, 31, 47]);
  for (let i = 0; i < total; i++) {
    const isAccent = accentCols.has(i);
    // Pseudo-random heights
    const h = 0.25 + ((i * 37) % 100) / 100 * (isAccent ? barH * 0.95 : barH * 0.55);
    s.addShape(pres.shapes.LINE, {
      x: left + i * step + step / 2, y: barY + (barH - h), w: 0, h,
      line: {
        color: isAccent ? C.coral : C.navyMuted,
        width: isAccent ? 1.5 : 0.7,
      },
    });
  }

  drawFooter(s, { dark: true, page: "06 / 10", label: "RESEARCH" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 7 — DEMOGRAPHY (light)
// ─────────────────────────────────────────────────────────────────────────────
function slide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "07 · DEMOGRAPHY",
    tag: "STUDENTS & ORIGINS",
    chapter: "CHAPTER VI · WHO STUDIES HERE",
  });

  drawTitle(s, [
    { text: "A " },
    { text: "global", italic: true },
    { text: " student body." },
  ], { dark: false, size: 56, y: 1.65, h: 1.5 });

  // Body paragraph
  s.addText(
    "Roughly two-thirds of the school's students arrive from outside the United Kingdom. More than 150 nationalities are typically represented in any given year — one of the highest international shares of any major university in the world.",
    {
      x: M, y: 3.7, w: 8.8, h: 2.4,
      fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  // Divider rule
  s.addShape(pres.shapes.LINE, {
    x: M, y: 6.2, w: 8.8, h: 0,
    line: { color: C.rule, width: 0.6 },
  });

  // 2x2 stats
  const stat = (num, suffix, label, x, y, accent) => {
    const runs = [
      { text: num, options: {
          fontFace: FONT_SERIF, fontSize: 48,
          color: accent ? C.burgundy : C.ink,
          italic: !!accent } },
    ];
    if (suffix) {
      runs.push({ text: suffix, options: {
          fontFace: FONT_SERIF, fontSize: 28,
          color: accent ? C.burgundy : C.ink } });
    }
    s.addText(runs, {
      x, y, w: 4.0, h: 0.95, valign: "bottom", margin: 0,
    });
    s.addText(label, {
      x, y: y + 1.0, w: 4.0, h: 0.6,
      fontFace: FONT_SANS, fontSize: 12, color: C.muted,
      charSpacing: 5, margin: 0,
    });
  };
  stat("~13k", "",  "TOTAL STUDENTS",            M,         6.5, true);
  stat("155",  "",  "NATIONALITIES ON\nCAMPUS",  M + 4.4,   6.5);
  stat("66",   "%", "NON-UK STUDENTS",           M,         8.5);
  stat("52",   "%", "POSTGRADUATE",              M + 4.4,   8.5);

  // ── Globe-of-students dot diagram (right half) ──
  const cx = 14.8;
  const cy = 7.0;

  // Outer dotted rings
  const rings = [
    { rx: 4.4, ry: 3.0, dash: "dash" },
    { rx: 3.2, ry: 2.2, dash: "dash" },
    { rx: 1.5, ry: 1.05, dash: "solid", color: C.burgundy },
  ];
  for (const r of rings) {
    s.addShape(pres.shapes.OVAL, {
      x: cx - r.rx, y: cy - r.ry, w: 2 * r.rx, h: 2 * r.ry,
      fill: { type: "none" },
      line: { color: r.color || C.muted, width: 0.5, dashType: r.dash },
    });
  }

  // Centre cluster of dots (UK students)
  const innerDots = [];
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * 2 * Math.PI;
    const r = 0.25 + ((i * 13) % 100) / 100 * 0.7;
    innerDots.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.7]);
  }
  for (const [x, y] of innerDots) {
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.05, y: y - 0.05, w: 0.10, h: 0.10,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
  }
  // Centre red point
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.06, y: cy - 0.06, w: 0.12, h: 0.12,
    fill: { color: C.burgundy }, line: { color: C.burgundy, width: 0 },
  });

  // Outer scattered dots (international)
  const seedDots = [
    [-4.0, -2.0], [-3.0, -2.6], [-2.0, -2.7], [0.5, -2.8], [2.5, -2.5],
    [3.7, -1.8], [4.3, -0.5], [4.0,  0.8], [3.4,  1.9], [2.0,  2.7],
    [0.0,  2.8], [-1.7, 2.6],  [-3.2, 1.8], [-4.0, 0.6], [-4.1,-0.7],
    [-2.4, 1.6], [-2.6,-1.3],  [ 2.4, 1.5], [ 2.5,-1.2],
    [-1.2,-2.0], [ 1.2,-2.0],  [-0.6, 2.0], [ 0.7, 1.9],
  ];
  for (const [dx, dy] of seedDots) {
    s.addShape(pres.shapes.OVAL, {
      x: cx + dx - 0.04, y: cy + dy - 0.04, w: 0.08, h: 0.08,
      fill: { color: C.inkSoft }, line: { color: C.inkSoft, width: 0 },
    });
  }

  // Figure caption
  s.addText("FIG. 03", {
    x: 13.6, y: 10.35, w: 2.5, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 6, align: "center", margin: 0,
  });

  drawFooter(s, { dark: false, page: "07 / 10", label: "DEMOGRAPHY" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 8 — ALUMNI (light, 3-column taxonomy)
// ─────────────────────────────────────────────────────────────────────────────
function slide8() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "08 · ALUMNI",
    tag: "HEADS OF STATE · LAUREATES · AUTHORS",
    chapter: "CHAPTER VII · A PARTIAL TAXONOMY",
  });

  drawTitle(s, [
    { text: "Heads of state, central " },
    { text: "bankers", italic: true },
    { text: ", novelists." },
  ], { dark: false, size: 56, y: 1.65, h: 1.5 });

  // Lead
  s.addText(
    "By one count, the school has produced more than fifty heads of state or government, dozens of central-bank governors, and a long line of writers, philosophers, and reformers. The categories below are illustrative, not comprehensive.",
    {
      x: M, y: 3.5, w: W - 2 * M, h: 1.4,
      fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  // Three-column taxonomy
  const cols = [
    {
      head: "GOVERNANCE",
      items: [
        ["i.",   "Heads of state & gov't",        "~55"],
        ["ii.",  "Cabinet ministers",             "200+"],
        ["iii.", "Central-bank governors",        "~30"],
        ["iv.",  "Supreme-court justices",        "DOZENS"],
      ],
    },
    {
      head: "SCHOLARSHIP",
      items: [
        ["i.",   "Nobel in Economics",            "13"],
        ["ii.",  "Nobel in Peace / Literature",   "6"],
        ["iii.", "Fellows of the British Academy","100+"],
        ["iv.",  "Fields-medal-adjacent",         "A FEW"],
      ],
    },
    {
      head: "CULTURE",
      items: [
        ["i.",   "Novelists & essayists",         "MANY"],
        ["ii.",  "Journalists & editors",         "MANY"],
        ["iii.", "Founders, NGO & tech",          "GROWING"],
        ["iv.",  "A philosopher of liberty",      "ONE"],
      ],
    },
  ];

  const colWidth = (W - 2 * M - 0.8) / 3;
  const rowHeight = 0.85;
  const headY = 5.5;
  const firstRowY = headY + 0.8;

  cols.forEach((col, ci) => {
    const cx = M + ci * (colWidth + 0.4);

    // Section header (burgundy caps)
    s.addText(col.head, {
      x: cx, y: headY, w: colWidth, h: 0.3,
      fontFace: FONT_SANS, fontSize: 12, color: C.burgundy,
      charSpacing: 6, margin: 0,
    });
    // Underline
    s.addShape(pres.shapes.LINE, {
      x: cx, y: headY + 0.45, w: colWidth, h: 0,
      line: { color: C.rule, width: 0.6 },
    });

    col.items.forEach((row, ri) => {
      const ry = firstRowY + ri * rowHeight;
      // Roman numeral
      s.addText(row[0], {
        x: cx, y: ry, w: 0.7, h: 0.5,
        fontFace: FONT_SANS, fontSize: 12, color: C.muted,
        charSpacing: 4, margin: 0,
      });
      // Item
      s.addText(row[1], {
        x: cx + 0.7, y: ry, w: colWidth - 1.9, h: 0.6,
        fontFace: FONT_SERIF, fontSize: 16, color: C.ink,
        margin: 0,
      });
      // Count (right aligned)
      s.addText(row[2], {
        x: cx + colWidth - 1.2, y: ry, w: 1.2, h: 0.5,
        fontFace: FONT_SANS, fontSize: 12, color: C.muted,
        charSpacing: 4, align: "right", margin: 0,
      });
      // Hairline divider under each row
      s.addShape(pres.shapes.LINE, {
        x: cx, y: ry + rowHeight - 0.05, w: colWidth, h: 0,
        line: { color: C.rule, width: 0.4 },
      });
    });
  });

  drawFooter(s, { dark: false, page: "08 / 10", label: "ALUMNI" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 9 — LIBRARY (dark, vertical-bars Lionel Robbins motif)
// ─────────────────────────────────────────────────────────────────────────────
function slide9() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  drawHeader(s, {
    dark: true,
    section: "09 · THE LIBRARY",
    tag: "B.L.P.E.S. · FOUNDED 1896",
    chapter: "CHAPTER VIII · FOUR MILLION VOLUMES",
  });

  drawTitle(s, [
    { text: "The world's largest library of " },
    { text: "social science", italic: true },
    { text: "." },
  ], { dark: true, size: 56, y: 1.65, h: 1.5 });

  // ── Bookshelf-as-bar-chart (left) ──
  // Each "book" is a thin vertical rectangle. A few are coral or burgundy.
  const lx = M;
  const ly = 4.4;
  const lw = 9.0;
  const lh = 4.6;

  // Outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx, y: ly, w: lw, h: lh,
    fill: { type: "none" }, line: { color: C.navyRule, width: 0.5 },
  });
  // Horizontal "shelf" lines (4 shelves)
  for (let i = 1; i < 4; i++) {
    s.addShape(pres.shapes.LINE, {
      x: lx, y: ly + (lh * i) / 4, w: lw, h: 0,
      line: { color: C.navyRule, width: 0.4 },
    });
  }

  // Book palette
  const palette = [
    C.cream2, C.navyMuted, C.cream2, C.navyMuted, C.coral,
    C.cream2, C.navyMuted, C.cream2, C.cream2, C.navyMuted,
    C.cream2, C.burgundy, C.cream2, C.cream2, C.navyMuted,
    C.cream2, C.cream2, C.navyMuted, C.cream2, C.cream2,
    C.navyMuted, C.cream2, C.cream2, C.navyMuted, C.cream2,
    C.cream2, C.navyMuted, C.cream2,
  ];
  const nBooks = palette.length;
  const slotW  = lw / nBooks;
  for (let i = 0; i < nBooks; i++) {
    const baseX  = lx + i * slotW + slotW * 0.2;
    const bookW  = slotW * 0.6;
    // vary height slightly so they look like books not pixels
    const top    = ly + 0.05 + ((i * 17) % 7) * 0.02;
    const bottom = ly + lh - 0.05 - ((i * 11) % 6) * 0.02;
    s.addShape(pres.shapes.RECTANGLE, {
      x: baseX, y: top, w: bookW, h: bottom - top,
      fill: { color: palette[i] }, line: { color: C.navy, width: 0.3 },
    });
  }

  // Caption beneath
  s.addText("FIG. 04 · LIONEL ROBBINS", {
    x: lx, y: ly + lh + 0.15, w: 5, h: 0.35,
    fontFace: FONT_SERIF, fontSize: 12, color: C.navyMuted,
    italic: true, margin: 0,
  });

  // ── Right column ──
  const rx = 11.0;
  const rw = 8.3;

  s.addText(
    "The British Library of Political and Economic Science was founded in 1896, a year after the school itself. It holds more than four million printed volumes, journals, and pamphlets — among the largest social-science collections in the world.",
    {
      x: rx, y: 4.4, w: rw, h: 2.4,
      fontFace: FONT_SERIF, fontSize: 18, color: C.cream2,
      margin: 0, valign: "top",
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: rx, y: 7.0, w: rw, h: 0,
    line: { color: C.navyRule, width: 0.6 },
  });

  // 2x2 stats (dark theme)
  const dstat = (num, label, x, y, accent) => {
    s.addText(num, {
      x, y, w: 3.8, h: 0.85,
      fontFace: FONT_SERIF, fontSize: 44,
      color: accent ? C.coral : C.cream2,
      italic: !!accent, margin: 0,
    });
    s.addText(label, {
      x, y: y + 0.95, w: 3.8, h: 0.5,
      fontFace: FONT_SANS, fontSize: 12, color: C.navyMuted,
      charSpacing: 5, margin: 0,
    });
  };
  dstat("4.7M", "VOLUMES & PAMPHLETS",  rx,        7.25, true);
  dstat("3km",  "OF OPEN SHELVING",     rx + 4.0,  7.25);
  dstat("24/7", "DURING TERM",          rx,        8.95);
  dstat("1896", "FOUNDING YEAR",        rx + 4.0,  8.95);

  drawFooter(s, { dark: true, page: "09 / 10", label: "LIBRARY" });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — FORWARD (light, 3-panel agenda)
// ─────────────────────────────────────────────────────────────────────────────
function slide10() {
  const s = pres.addSlide();
  s.background = { color: C.cream };

  drawHeader(s, {
    dark: false,
    section: "10 · FORWARD",
    tag: "2026 — BEYOND",
    chapter: "CHAPTER IX · THE AGENDA AHEAD",
  });

  drawTitle(s, [
    { text: "The next " },
    { text: "century", italic: true },
    { text: "." },
  ], { dark: false, size: 56, y: 1.65, h: 1.5 });

  // Lead
  s.addText(
    "Three currents are reshaping the school's research agenda: the political economy of climate, the governance of AI and data, and the long aftershocks of the post-2008 settlement. Each cuts across departments rather than belonging to any one.",
    {
      x: M, y: 3.5, w: W - 2 * M, h: 1.4,
      fontFace: FONT_SERIF, fontSize: 18, color: C.inkSoft,
      margin: 0, valign: "top",
    }
  );

  // ── Three coloured panels ──
  const panY = 5.3;
  const panH = 4.2;
  const gap  = 0.0;          // panels touch
  const totalW = W - 2 * M;
  const panW = (totalW - 2 * gap) / 3;

  const panels = [
    { fill: C.navy,     fg: C.cream2, label: "Climate & political economy",  num: "I." },
    { fill: C.burgundy, fg: C.cream2, label: "AI, data, and governance",     num: "II." },
    { fill: C.navy,     fg: C.cream2, label: "After 2008 — long aftershocks",num: "III." },
  ];

  panels.forEach((p, i) => {
    const px = M + i * (panW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: panY, w: panW, h: panH,
      fill: { color: p.fill }, line: { color: p.fill, width: 0 },
    });
    // Roman numeral (top-left)
    s.addText(p.num, {
      x: px + 0.4, y: panY + 0.3, w: 1, h: 0.5,
      fontFace: FONT_SERIF, fontSize: 14, color: p.fg,
      italic: true, margin: 0,
    });
    // Label (bottom-left)
    s.addText(p.label, {
      x: px + 0.4, y: panY + panH - 0.9, w: panW - 0.8, h: 0.6,
      fontFace: FONT_SERIF, fontSize: 18, color: p.fg,
      margin: 0, valign: "bottom",
    });
  });

  // Panel I — sine waves
  {
    const px = M;
    const cy = panY + 2.3;
    // 3 stacked sines with different amplitudes & phases (use LINE chart)
    const xs = Array.from({ length: 50 }, (_, i) => i);
    const make = (amp, phase, freq) =>
      xs.map((i) => Math.sin((i / 50) * Math.PI * freq + phase) * amp);
    s.addChart(
      [
        { type: pres.charts.LINE, data: [{ name: "w1",
            labels: xs.map(String), values: make(0.6, 0.0, 4) }],
          options: { chartColors: [C.cream2], lineSize: 1.2, lineSmooth: true,
            lineDataSymbol: "none" } },
        { type: pres.charts.LINE, data: [{ name: "w2",
            labels: xs.map(String), values: make(0.4, 0.6, 4.2) }],
          options: { chartColors: ["A39E92"], lineSize: 1.0, lineSmooth: true,
            lineDataSymbol: "none" } },
        { type: pres.charts.LINE, data: [{ name: "w3",
            labels: xs.map(String), values: make(0.25, 1.2, 4.5) }],
          options: { chartColors: ["6A6760"], lineSize: 0.9, lineSmooth: true,
            lineDataSymbol: "none" } },
      ],
      {
        x: px + 0.5, y: cy - 0.9, w: panW - 1.0, h: 1.8,
        catAxisHidden: true, valAxisHidden: true,
        valGridLine: { style: "none" }, catGridLine: { style: "none" },
        chartArea: { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
        plotArea:  { fill: { type: "none" }, border: { pt: 0, color: "FFFFFF" } },
        showLegend: false,
      }
    );
  }

  // Panel II — branching tree
  {
    const px = M + panW;
    const cx = px + panW / 2;
    const topY = panY + 0.7;
    const midY = panY + 2.3;
    const botY = panY + 3.5;

    // upper branches
    const upper = [
      [cx, midY, cx - 1.4, topY],
      [cx, midY, cx - 0.5, topY],
      [cx, midY, cx + 0.6, topY],
      [cx, midY, cx + 1.5, topY],
    ];
    // lower branches
    const lower = [
      [cx, midY, cx - 1.0, botY],
      [cx, midY, cx + 1.1, botY],
    ];
    [...upper, ...lower].forEach(([x1, y1, x2, y2]) => {
      s.addShape(pres.shapes.LINE, {
        x: Math.min(x1, x2), y: Math.min(y1, y2),
        w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
        line: { color: C.cream2, width: 1, beginArrowType: "none", endArrowType: "none" },
        flipH: x2 < x1, flipV: y2 < y1,
      });
      // node at outer end
      s.addShape(pres.shapes.OVAL, {
        x: x2 - 0.06, y: y2 - 0.06, w: 0.12, h: 0.12,
        fill: { color: C.cream2 }, line: { color: C.cream2, width: 0 },
      });
    });
    // central node
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.07, y: midY - 0.07, w: 0.14, h: 0.14,
      fill: { color: C.cream2 }, line: { color: C.cream2, width: 0 },
    });
  }

  // Panel III — step / aftershock chart
  {
    const px = M + 2 * panW;
    const innerX = px + 0.5;
    const innerW = panW - 1.0;
    // 5 baseline rules (alternating solid/dotted)
    const baselines = [
      { y: panY + 0.9,  dash: "solid" },
      { y: panY + 1.4,  dash: "dash"  },
      { y: panY + 1.9,  dash: "solid" },
      { y: panY + 2.4,  dash: "dash"  }, // coral step trace will live here
      { y: panY + 2.9,  dash: "dash"  },
    ];
    baselines.forEach((b, i) => {
      if (i === 3) return; // coral step trace lives at this position
      s.addShape(pres.shapes.LINE, {
        x: innerX, y: b.y, w: innerW, h: 0,
        line: {
          color: C.navyRule,
          width: 0.6,
          dashType: b.dash,
        },
      });
    });
    // Coral step line: flat low → step up → flat higher
    const cb = panY + 2.4;
    const stepX = innerX + innerW * 0.55;
    s.addShape(pres.shapes.LINE, {
      x: innerX, y: cb, w: innerW * 0.55, h: 0,
      line: { color: C.coral, width: 1.4 },
    });
    s.addShape(pres.shapes.LINE, {
      x: stepX, y: cb - 0.25, w: 0, h: 0.25,
      line: { color: C.coral, width: 1.4 },
    });
    s.addShape(pres.shapes.LINE, {
      x: stepX, y: cb - 0.25, w: innerW * 0.45, h: 0,
      line: { color: C.coral, width: 1.4 },
    });
  }

  // Caption directly under panels
  s.addText("FIG. 05", {
    x: 0, y: panY + panH + 0.1, w: W, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 6, align: "center", margin: 0,
  });

  // Footer
  s.addText("10 / 10", {
    x: M, y: H - 0.55, w: 3, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0, bold: false,
  });
  s.addText("END", {
    x: W - M - 3, y: H - 0.55, w: 3, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: C.muted,
    charSpacing: 4, align: "right", margin: 0,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Build & write
// ─────────────────────────────────────────────────────────────────────────────
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

pres.writeFile({ fileName: "lse.pptx" })
  .then((f) => console.log(`Wrote ${f}`))
  .catch((err) => { console.error(err); process.exit(1); });
