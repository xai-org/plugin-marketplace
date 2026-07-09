/**
 * Calculus.pptx — Replica via pptxgenjs
 * Replicates the original 8-slide "Introduction to Calculus" deck.
 * Layout: 13.33" x 7.5" (LAYOUT_WIDE)
 *
 * Run: node calculus.js
 */

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRegClock,
  FaChartBar,
  FaChartLine,
  FaChartArea,
  FaBook,
} = require("react-icons/fa");

// ---------------------------------------------------------------------------
// Color palette (sampled from the original)
// ---------------------------------------------------------------------------
const COLORS = {
  navy:        "0F1B2D", // dark slide background
  cream:       "F4EFE6", // light slide background
  ink:         "16263D", // primary dark text on cream
  bone:        "F4EFE6", // primary light text on navy
  coral:       "E8624D", // accent (orange/red)
  sage:        "8AAE8E", // accent (green)
  mutedDark:   "5C6470", // muted text on cream
  mutedLight:  "8590A0", // muted text on navy
  rule:        "C9C0B2", // hairline rule on cream
  ruleDark:    "2A3548", // hairline rule on navy
  gold:        "D9A441",
};

// ---------------------------------------------------------------------------
// Slide dimensions
// ---------------------------------------------------------------------------
const W = 13.333;
const H = 7.5;

// ---------------------------------------------------------------------------
// Icon helper — react-icons → SVG → PNG (base64)
// ---------------------------------------------------------------------------
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// Custom inline-SVG icons (rasterised) for unique vignettes.
async function svgToBase64Png(svgString, width = 512) {
  const png = await sharp(Buffer.from(svgString), { density: 300 })
    .resize({ width })
    .png()
    .toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// ---------------------------------------------------------------------------
// Header / footer chrome shared by content slides
// ---------------------------------------------------------------------------
function addContentChrome(slide, opts) {
  const isDark = !!opts.dark;
  const muted = isDark ? COLORS.mutedLight : COLORS.mutedDark;
  const rule  = isDark ? COLORS.ruleDark   : COLORS.rule;

  // Top-left eyebrow (e.g., "02 · WHAT IT IS")
  slide.addText(opts.eyebrow, {
    x: 0.6, y: 0.45, w: 8, h: 0.4,
    fontFace: "Calibri", fontSize: 11, color: muted,
    charSpacing: 6, bold: false, margin: 0,
  });

  // Top-right pagination (e.g., "02 / 08")
  slide.addText(opts.page, {
    x: W - 2.0, y: 0.45, w: 1.4, h: 0.4,
    fontFace: "Calibri", fontSize: 11, color: muted,
    charSpacing: 6, align: "right", margin: 0,
  });

  // Bottom hairline rule
  slide.addShape("line", {
    x: 0.6, y: H - 0.85, w: W - 1.2, h: 0,
    line: { color: rule, width: 0.75 },
  });

  // Bottom-left footer
  slide.addText(opts.footerLeft, {
    x: 0.6, y: H - 0.6, w: 6, h: 0.35,
    fontFace: "Calibri", fontSize: 10, color: muted,
    charSpacing: 6, margin: 0,
  });

  // Bottom-right footer
  slide.addText(opts.footerRight, {
    x: W - 6.6, y: H - 0.6, w: 6, h: 0.35,
    fontFace: "Calibri", fontSize: 10, color: muted,
    charSpacing: 6, align: "right", margin: 0,
  });
}

// ---------------------------------------------------------------------------
// Build the deck
// ---------------------------------------------------------------------------
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = "Introduction to Calculus";
  pres.author = "Mr. Avery";

  // Pre-render icons we'll reuse
  const iconClock     = await iconToBase64Png(FaRegClock,  "#" + COLORS.ink, 256);
  const iconClockNavy = await iconToBase64Png(FaRegClock,  "#" + COLORS.ink, 256);
  const iconBars      = await iconToBase64Png(FaChartBar,  "#" + COLORS.ink, 256);
  const iconLine      = await iconToBase64Png(FaChartLine, "#" + COLORS.ink, 256);
  const iconArea      = await iconToBase64Png(FaChartArea, "#" + COLORS.sage, 256);
  const iconBook      = await iconToBase64Png(FaBook,      "#" + COLORS.sage, 256);
  const iconBars2     = await iconToBase64Png(FaChartBar,  "#" + COLORS.sage, 256);

  // -------------------------------------------------------------------------
  // SLIDE 1 — Title
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.navy };

    // Eyebrows
    s.addText("UNIT 01 · LECTURE 01", {
      x: 0.6, y: 0.55, w: 5, h: 0.4,
      fontFace: "Calibri", fontSize: 11, color: COLORS.mutedLight,
      charSpacing: 6, margin: 0,
    });
    s.addText("MR. AVERY · PERIOD 4", {
      x: W - 5.6, y: 0.55, w: 5, h: 0.4,
      fontFace: "Calibri", fontSize: 11, color: COLORS.mutedLight,
      charSpacing: 6, align: "right", margin: 0,
    });

    // Decorative orbit system on the right (concentric rings + planets)
    const orbitSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <g fill="none" stroke="#3A4459" stroke-width="1">
    <circle cx="300" cy="300" r="90"/>
    <circle cx="300" cy="300" r="160"/>
    <circle cx="300" cy="300" r="230"/>
    <circle cx="300" cy="300" r="290"/>
  </g>
  <!-- coral planet -->
  <circle cx="360" cy="300" r="55" fill="#E8624D"/>
  <!-- white moon top -->
  <circle cx="300" cy="140" r="14" fill="#F4EFE6"/>
  <!-- gold dot -->
  <circle cx="200" cy="345" r="9" fill="#D9A441"/>
  <!-- sage dot far right -->
  <circle cx="585" cy="430" r="10" fill="#8AAE8E"/>
</svg>`.trim();
    const orbitData = await svgToBase64Png(orbitSvg, 1200);
    s.addImage({
      data: orbitData,
      x: W - 5.6, y: 0.6, w: 5.4, h: 5.4,
    });

    // "A FIRST COURSE" — coral eyebrow
    s.addText("A FIRST COURSE", {
      x: 0.6, y: 2.55, w: 6, h: 0.4,
      fontFace: "Calibri", fontSize: 13, color: COLORS.coral,
      bold: true, charSpacing: 8, margin: 0,
    });

    // Big title — "Introduction to Calculus" (Calculus in italic on its own line)
    s.addText([
      { text: "Introduction to ", options: { bold: true, fontFace: "Calibri" } },
    ], {
      x: 0.55, y: 2.95, w: 9.5, h: 1.5,
      fontFace: "Calibri", fontSize: 88, color: COLORS.bone, bold: true,
      margin: 0,
    });
    s.addText("Calculus", {
      x: 0.55, y: 4.3, w: 9, h: 1.4,
      fontFace: "Calibri", fontSize: 88, color: COLORS.bone,
      italic: true, bold: false, margin: 0,
    });

    // Tagline
    s.addText(
      "The mathematics of change, motion, and the infinitely small — written down at last.",
      {
        x: 0.6, y: 5.85, w: 8, h: 0.7,
        fontFace: "Calibri", fontSize: 14, color: COLORS.bone,
        margin: 0,
      }
    );

    // Bottom hairline + footer
    s.addShape("line", {
      x: 0.6, y: H - 0.85, w: W - 1.2, h: 0,
      line: { color: COLORS.ruleDark, width: 0.75 },
    });
    s.addText("CALCULUS I", {
      x: 0.6, y: H - 0.6, w: 4, h: 0.35,
      fontFace: "Calibri", fontSize: 10, color: COLORS.mutedLight,
      charSpacing: 6, margin: 0,
    });
    s.addText("SPRING SEMESTER · 2026", {
      x: W - 5.6, y: H - 0.6, w: 5, h: 0.35,
      fontFace: "Calibri", fontSize: 10, color: COLORS.mutedLight,
      charSpacing: 6, align: "right", margin: 0,
    });
  }

  // -------------------------------------------------------------------------
  // SLIDE 2 — What it is (cream, two-column with three icon rows)
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.cream };
    addContentChrome(s, {
      eyebrow: "02 · WHAT IT IS",
      page: "02 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "WHAT IT IS",
      dark: false,
    });

    // LEFT column — In one sentence + big claim
    s.addText("In one sentence —", {
      x: 0.6, y: 1.5, w: 6, h: 0.55,
      fontFace: "Calibri", fontSize: 24, color: COLORS.coral,
      italic: true, margin: 0,
    });

    // Large statement with mixed styling — three deliberate lines
    s.addText(
      [
        { text: "Calculus is the", options: { bold: true, breakLine: true } },
        { text: "mathematics", options: { bold: false, italic: true, color: COLORS.coral } },
        { text: " of things", options: { bold: true, breakLine: true } },
        { text: "that ", options: { bold: true } },
        { text: "change", options: { bold: false, italic: true, color: COLORS.coral } },
        { text: ".", options: { bold: true } },
      ],
      {
        x: 0.6, y: 2.15, w: 6.4, h: 2.7,
        fontFace: "Calibri", fontSize: 40, color: COLORS.ink,
        margin: 0,
      }
    );

    // Vertical divider between columns
    s.addShape("line", {
      x: 7.0, y: 1.4, w: 0, h: 5.2,
      line: { color: COLORS.rule, width: 0.75 },
    });

    // RIGHT column — three icon rows
    const rows = [
      {
        y: 2.05,
        icon: iconLine,
        title: "Algebra describes shapes.",
        sub: "Lines, parabolas, equations at rest.",
      },
      {
        y: 3.25,
        icon: iconLine, // we'll use the line icon variant; visually similar to original
        title: "Calculus describes motion.",
        sub: "How a quantity moves, grows, accumulates.",
      },
      {
        y: 4.45,
        icon: iconClock,
        title: "Two questions, two tools.",
        sub: "Derivatives and integrals — that's it.",
      },
    ];

    rows.forEach(r => {
      s.addImage({ data: r.icon, x: 7.45, y: r.y, w: 0.6, h: 0.6 });
      s.addText(r.title, {
        x: 8.2, y: r.y - 0.05, w: 4.6, h: 0.45,
        fontFace: "Calibri", fontSize: 18, color: COLORS.ink, bold: true,
        margin: 0,
      });
      s.addText(r.sub, {
        x: 8.2, y: r.y + 0.35, w: 4.6, h: 0.4,
        fontFace: "Calibri", fontSize: 13, color: COLORS.mutedDark,
        margin: 0,
      });
    });
  }

  // -------------------------------------------------------------------------
  // SLIDE 3 — The Foundation (Limits) — left visual, right text
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.cream };
    addContentChrome(s, {
      eyebrow: "03 · THE FOUNDATION",
      page: "03 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "THE FOUNDATION · LIMITS",
      dark: false,
    });

    // LEFT — limit visualisation (number line approaching L)
    const limitSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 500">
  <!-- L label -->
  <text x="380" y="100" font-family="Georgia, serif" font-style="italic"
        font-size="38" fill="#E8624D">L</text>
  <!-- dashed vertical line at L -->
  <line x1="395" y1="115" x2="395" y2="365" stroke="#E8624D"
        stroke-width="2" stroke-dasharray="6,6"/>
  <!-- horizontal axis -->
  <line x1="60" y1="365" x2="500" y2="365" stroke="#5C6470" stroke-width="1.2"/>
  <!-- x label -->
  <text x="50" y="402" font-family="Georgia, serif" font-style="italic"
        font-size="34" fill="#16263D">x</text>
  <!-- approaching dots -->
  ${[
    { cx: 100, r: 12 },
    { cx: 170, r: 12 },
    { cx: 235, r: 12 },
    { cx: 295, r: 11 },
    { cx: 335, r: 10 },
    { cx: 365, r: 9 },
    { cx: 380, r: 8 },
    { cx: 388, r: 7 },
  ].map(d => `<circle cx="${d.cx}" cy="365" r="${d.r}" fill="#0F1B2D"/>`).join("\n")}
  <!-- arrow under axis -->
  <line x1="80" y1="420" x2="475" y2="420" stroke="#5C6470" stroke-width="2"/>
  <polygon points="475,412 495,420 475,428" fill="#5C6470"/>
  <!-- caption -->
  <text x="280" y="465" text-anchor="middle" font-family="Calibri, sans-serif"
        font-size="22" fill="#5C6470" letter-spacing="2">AS X APPROACHES THE TARGET</text>
  <text x="280" y="495" text-anchor="middle" font-family="Calibri, sans-serif"
        font-size="22" fill="#E8624D" letter-spacing="2" font-weight="700">F(X) APPROACHES L</text>
</svg>`.trim();
    const limitData = await svgToBase64Png(limitSvg, 1400);
    s.addImage({ data: limitData, x: 0.5, y: 1.4, w: 6.4, h: 4.6 });

    // RIGHT — text block
    s.addText("The foundation —", {
      x: 7.2, y: 1.85, w: 5.5, h: 0.55,
      fontFace: "Calibri", fontSize: 24, color: COLORS.coral,
      italic: true, margin: 0,
    });
    s.addText("Limits.", {
      x: 7.2, y: 2.45, w: 5.5, h: 0.95,
      fontFace: "Calibri", fontSize: 54, color: COLORS.ink, bold: true,
      margin: 0,
    });

    // Equation row — lim x→a f(x) = L  (mixed sizes)
    s.addText(
      [
        { text: "lim ",  options: { fontFace: "Calibri", fontSize: 36, color: COLORS.ink } },
        { text: "x → a ", options: { fontFace: "Calibri", fontSize: 22, color: COLORS.coral, italic: true } },
        { text: "f(x) = ", options: { fontFace: "Georgia",  fontSize: 36, color: COLORS.ink, italic: true } },
        { text: "L",     options: { fontFace: "Calibri", fontSize: 36, color: COLORS.coral, bold: true } },
      ],
      {
        x: 7.2, y: 3.55, w: 5.5, h: 0.9,
        margin: 0, valign: "middle",
      }
    );

    s.addText(
      [
        { text: "Get " },
        { text: "arbitrarily close", options: { bold: true, color: COLORS.coral } },
        { text: " to a value without ever quite touching it. Every idea in calculus is built on this one move." },
      ],
      {
        x: 7.2, y: 4.65, w: 5.5, h: 1.4,
        fontFace: "Calibri", fontSize: 15, color: COLORS.ink,
        margin: 0,
      }
    );
  }

  // -------------------------------------------------------------------------
  // SLIDE 4 — Derivatives (dark) — text left, tangent-line graphic right
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.navy };
    addContentChrome(s, {
      eyebrow: "04 · DERIVATIVES",
      page: "04 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "DERIVATIVES",
      dark: true,
    });

    // LEFT — text
    s.addText("Tool one —", {
      x: 0.6, y: 1.55, w: 6, h: 0.55,
      fontFace: "Calibri", fontSize: 24, color: COLORS.coral,
      italic: true, margin: 0,
    });

    s.addText(
      [
        { text: "Rate ",   options: { bold: true } },
        { text: "of",      options: { italic: true, bold: false, color: COLORS.coral } },
        { text: " change.", options: { bold: true } },
      ],
      {
        x: 0.6, y: 2.15, w: 7, h: 1.0,
        fontFace: "Calibri", fontSize: 56, color: COLORS.bone,
        margin: 0,
      }
    );

    s.addText(
      "A derivative measures how fast something is changing at a single instant. It is the slope of the curve at one point.",
      {
        x: 0.6, y: 3.7, w: 6, h: 1.1,
        fontFace: "Calibri", fontSize: 16, color: COLORS.bone,
        margin: 0,
      }
    );

    // Equation: f'(x) = dy/dx
    s.addText(
      [
        { text: "f", options: { fontFace: "Georgia", italic: true } },
        { text: "'(", options: { fontFace: "Georgia", italic: true } },
        { text: "x", options: { fontFace: "Georgia", italic: true } },
        { text: ") = ", options: { fontFace: "Georgia", italic: true } },
        { text: "dy", options: { fontFace: "Georgia", italic: true, color: COLORS.bone } },
        { text: " / ", options: { fontFace: "Georgia" } },
        { text: "dx", options: { fontFace: "Georgia", italic: true, color: COLORS.bone } },
      ],
      {
        x: 0.6, y: 4.95, w: 6, h: 0.9,
        fontFace: "Georgia", fontSize: 36, color: COLORS.bone,
        margin: 0,
      }
    );

    // RIGHT — curve with tangent line
    const tangentSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 600">
  <!-- y axis -->
  <line x1="40" y1="40" x2="40" y2="540" stroke="#8590A0" stroke-width="1.2"/>
  <text x="20" y="35" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#8590A0">y</text>
  <!-- x axis -->
  <line x1="40" y1="540" x2="680" y2="540" stroke="#8590A0" stroke-width="1.2"/>
  <text x="685" y="555" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#8590A0">x</text>
  <!-- curve (parabolic-ish) -->
  <path d="M 70 530 Q 230 510 380 380 T 660 90"
        fill="none" stroke="#F4EFE6" stroke-width="4"/>
  <!-- tangent line -->
  <line x1="270" y1="540" x2="640" y2="180" stroke="#E8624D" stroke-width="4"/>
  <!-- tangent point -->
  <circle cx="455" cy="360" r="14" fill="#E8624D"/>
  <circle cx="455" cy="360" r="8" fill="#F4EFE6"/>
  <!-- slope label -->
  <text x="495" y="345" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#E8624D">slope = f'(x)</text>
</svg>`.trim();
    const tangentData = await svgToBase64Png(tangentSvg, 1400);
    s.addImage({ data: tangentData, x: 7.2, y: 1.4, w: 5.6, h: 4.8 });
  }

  // -------------------------------------------------------------------------
  // SLIDE 5 — Derivatives in Practice (3-column)
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.cream };
    addContentChrome(s, {
      eyebrow: "05 · DERIVATIVES IN PRACTICE",
      page: "05 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "DERIVATIVES · APPLICATIONS",
      dark: false,
    });

    // Headline
    s.addText(
      [
        { text: "Where rates ", options: { bold: true } },
        { text: "of",            options: { italic: true, bold: false, color: COLORS.ink } },
        { text: " change",       options: { bold: true, breakLine: true } },
        { text: "show up.",      options: { bold: true } },
      ],
      {
        x: 0.6, y: 1.0, w: 11, h: 1.8,
        fontFace: "Calibri", fontSize: 48, color: COLORS.ink,
        margin: 0,
      }
    );

    // Three columns
    const cols = [
      {
        x: 0.6,
        icon: iconClock,
        kicker: "MOTION",
        title: "Speedometer.",
        body: [
          { text: "A car's speed is the " },
          { text: "derivative", options: { bold: true } },
          { text: " of its position. Press the gas — the slope steepens." },
        ],
      },
      {
        x: 4.7,
        icon: iconBars,
        kicker: "ECONOMICS",
        title: "Marginal cost.",
        body: [
          { text: "How much does the " },
          { text: "next", options: { bold: true } },
          { text: " unit cost to make? That's a derivative in disguise." },
        ],
      },
      {
        x: 8.85,
        icon: iconLine,
        kicker: "BIOLOGY",
        title: "Growth rate.",
        body: [
          { text: "A population doesn't add people evenly — it grows " },
          { text: "faster", options: { bold: true } },
          { text: " when bigger." },
        ],
      },
    ];

    const colW = 3.85;
    cols.forEach(c => {
      // Top hairline
      s.addShape("line", {
        x: c.x, y: 3.35, w: colW, h: 0,
        line: { color: COLORS.ink, width: 0.9 },
      });
      // Icon
      s.addImage({ data: c.icon, x: c.x, y: 3.6, w: 0.8, h: 0.8 });
      // Kicker
      s.addText(c.kicker, {
        x: c.x, y: 4.7, w: colW, h: 0.35,
        fontFace: "Calibri", fontSize: 12, color: COLORS.coral,
        bold: true, charSpacing: 6, margin: 0,
      });
      // Title
      s.addText(c.title, {
        x: c.x, y: 5.05, w: colW, h: 0.55,
        fontFace: "Calibri", fontSize: 26, color: COLORS.ink,
        bold: true, margin: 0,
      });
      // Body
      s.addText(c.body, {
        x: c.x, y: 5.7, w: colW, h: 1.1,
        fontFace: "Calibri", fontSize: 13, color: COLORS.mutedDark,
        margin: 0,
      });
    });
  }

  // -------------------------------------------------------------------------
  // SLIDE 6 — Integrals (cream) — area-under-curve graphic left, text right
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.cream };
    addContentChrome(s, {
      eyebrow: "06 · INTEGRALS",
      page: "06 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "INTEGRALS",
      dark: false,
    });

    // LEFT — bar chart approximation of area under a line
    const areaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 540">
  <!-- y axis -->
  <line x1="60" y1="30" x2="60" y2="480" stroke="#16263D" stroke-width="1.5"/>
  <text x="40" y="25" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#16263D">y</text>
  <!-- x axis -->
  <line x1="60" y1="480" x2="660" y2="480" stroke="#16263D" stroke-width="1.5"/>
  <text x="675" y="500" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#16263D">x</text>
  <!-- bars (11 bars increasing height, narrower so x label has room) -->
  ${(() => {
    const bars = [];
    const baseY = 478;
    const x0 = 80;
    const bw = 44;
    const gap = 6;
    const heights = [70, 95, 130, 165, 200, 235, 270, 305, 340, 375, 405];
    const opacities = [0.25, 0.32, 0.4, 0.48, 0.55, 0.62, 0.7, 0.78, 0.85, 0.92, 1.0];
    for (let i = 0; i < heights.length; i++) {
      const x = x0 + i * (bw + gap);
      const h = heights[i];
      bars.push(
        `<rect x="${x}" y="${baseY - h}" width="${bw}" height="${h}"
               fill="#8AAE8E" fill-opacity="${opacities[i]}"/>`
      );
    }
    return bars.join("\n");
  })()}
  <!-- diagonal line -->
  <line x1="80" y1="430" x2="630" y2="80" stroke="#0F1B2D" stroke-width="3.5"/>
  <!-- caption -->
  <text x="370" y="525" text-anchor="middle" font-family="Calibri, sans-serif"
        font-size="22" fill="#5C6470" letter-spacing="3" font-weight="700">AREA UNDER THE CURVE</text>
</svg>`.trim();
    const areaData = await svgToBase64Png(areaSvg, 1400);
    s.addImage({ data: areaData, x: 0.5, y: 1.3, w: 6.4, h: 4.9 });

    // RIGHT — text
    s.addText("Tool two —", {
      x: 7.4, y: 1.4, w: 5.5, h: 0.55,
      fontFace: "Calibri", fontSize: 24, color: COLORS.coral,
      italic: true, margin: 0,
    });

    // Big integral symbol
    s.addText("∫", {
      x: 7.4, y: 1.95, w: 1.5, h: 1.6,
      fontFace: "Georgia", fontSize: 110, color: COLORS.sage,
      italic: true, margin: 0,
    });

    s.addText(
      [
        { text: "Adding ",   options: { bold: true } },
        { text: "up",        options: { italic: true, bold: false, color: COLORS.ink } },
        { text: " the",      options: { bold: true, breakLine: true } },
        { text: "pieces.",   options: { bold: true } },
      ],
      {
        x: 7.4, y: 3.65, w: 5.5, h: 1.7,
        fontFace: "Calibri", fontSize: 44, color: COLORS.ink,
        margin: 0,
      }
    );

    s.addText(
      [
        { text: "An integral slices a quantity into infinitely thin strips and " },
        { text: "sums them", options: { bold: true, color: COLORS.sage } },
        { text: " — giving you a total from a rate." },
      ],
      {
        x: 7.4, y: 5.35, w: 5.4, h: 1.1,
        fontFace: "Calibri", fontSize: 14, color: COLORS.ink,
        margin: 0,
      }
    );
  }

  // -------------------------------------------------------------------------
  // SLIDE 7 — Integrals in Practice (3-column)
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.cream };
    addContentChrome(s, {
      eyebrow: "07 · INTEGRALS IN PRACTICE",
      page: "07 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "INTEGRALS · APPLICATIONS",
      dark: false,
    });

    // Headline
    s.addText(
      [
        { text: "Where totals get ", options: { bold: true } },
        { text: "accumulated",        options: { italic: true, bold: false } },
        { text: ".",                  options: { bold: true } },
      ],
      {
        x: 0.6, y: 1.0, w: 12.2, h: 1.3,
        fontFace: "Calibri", fontSize: 52, color: COLORS.ink,
        margin: 0,
      }
    );

    const cols = [
      {
        x: 0.6,
        icon: iconArea,
        kicker: "PHYSICS",
        title: "Distance traveled.",
        body: [
          { text: "Knowing speed at every moment, integrate to find " },
          { text: "total distance", options: { bold: true } },
          { text: " covered." },
        ],
      },
      {
        x: 4.7,
        icon: iconBook,
        kicker: "ENGINEERING",
        title: "Volume of a tank.",
        body: [
          { text: "Stack thin " },
          { text: "cross-sections", options: { bold: true } },
          { text: " from bottom to top — the integral gives total capacity." },
        ],
      },
      {
        x: 8.85,
        icon: iconBars2,
        kicker: "FINANCE",
        title: "Total earnings.",
        body: [
          { text: "A varying income stream becomes a " },
          { text: "cumulative total", options: { bold: true } },
          { text: " when summed across time." },
        ],
      },
    ];

    const colW = 3.85;
    cols.forEach(c => {
      s.addShape("line", {
        x: c.x, y: 2.95, w: colW, h: 0,
        line: { color: COLORS.ink, width: 0.9 },
      });
      s.addImage({ data: c.icon, x: c.x, y: 3.2, w: 0.8, h: 0.8 });
      s.addText(c.kicker, {
        x: c.x, y: 4.3, w: colW, h: 0.35,
        fontFace: "Calibri", fontSize: 12, color: COLORS.sage,
        bold: true, charSpacing: 6, margin: 0,
      });
      s.addText(c.title, {
        x: c.x, y: 4.65, w: colW, h: 0.55,
        fontFace: "Calibri", fontSize: 26, color: COLORS.ink,
        bold: true, margin: 0,
      });
      s.addText(c.body, {
        x: c.x, y: 5.3, w: colW, h: 1.2,
        fontFace: "Calibri", fontSize: 13, color: COLORS.mutedDark,
        margin: 0,
      });
    });
  }

  // -------------------------------------------------------------------------
  // SLIDE 8 — Recap & Next Steps (dark)
  // -------------------------------------------------------------------------
  {
    const s = pres.addSlide();
    s.background = { color: COLORS.navy };
    addContentChrome(s, {
      eyebrow: "08 · RECAP & NEXT STEPS",
      page: "08 / 08",
      footerLeft: "INTRODUCTION TO CALCULUS",
      footerRight: "RECAP & PRACTICE",
      dark: true,
    });

    // Headline
    s.addText(
      [
        { text: "Two ideas. One ", options: { bold: true } },
        { text: "subject",          options: { italic: true, bold: false, color: COLORS.coral } },
        { text: ".",                options: { bold: true } },
      ],
      {
        x: 0.6, y: 1.0, w: 12, h: 1.1,
        fontFace: "Calibri", fontSize: 48, color: COLORS.bone,
        margin: 0,
      }
    );

    // LEFT — TODAY WE COVERED list
    s.addText("TODAY WE COVERED", {
      x: 0.6, y: 2.7, w: 6, h: 0.4,
      fontFace: "Calibri", fontSize: 12, color: COLORS.coral,
      bold: true, charSpacing: 6, margin: 0,
    });

    // Top hairline of left list
    s.addShape("line", {
      x: 0.6, y: 3.2, w: 5.8, h: 0,
      line: { color: COLORS.ruleDark, width: 0.75 },
    });

    const items = [
      { num: "01", title: "Limits",      sub: "Approaching a value without arriving." },
      { num: "02", title: "Derivatives", sub: "The instantaneous rate of change." },
      { num: "03", title: "Integrals",   sub: "The total accumulated from a rate." },
    ];

    items.forEach((it, i) => {
      const y = 3.45 + i * 1.05;
      s.addText(it.num, {
        x: 0.6, y: y, w: 0.9, h: 0.55,
        fontFace: "Calibri", fontSize: 22, color: COLORS.coral,
        italic: true, margin: 0,
      });
      s.addText(it.title, {
        x: 1.5, y: y, w: 4.7, h: 0.45,
        fontFace: "Calibri", fontSize: 20, color: COLORS.bone,
        bold: true, margin: 0,
      });
      s.addText(it.sub, {
        x: 1.5, y: y + 0.45, w: 4.7, h: 0.4,
        fontFace: "Calibri", fontSize: 12, color: COLORS.mutedLight,
        margin: 0,
      });
      // Hairline between rows
      if (i < items.length - 1) {
        s.addShape("line", {
          x: 0.6, y: y + 0.95, w: 5.8, h: 0,
          line: { color: COLORS.ruleDark, width: 0.5 },
        });
      }
    });

    // RIGHT — Practice section
    s.addText("PRACTICE FOR NEXT CLASS", {
      x: 7.0, y: 2.7, w: 6, h: 0.4,
      fontFace: "Calibri", fontSize: 12, color: COLORS.sage,
      bold: true, charSpacing: 6, margin: 0,
    });

    s.addText(
      [
        { text: "Read ", options: { bold: true } },
        { text: "§1.1 – §1.3", options: { italic: true, color: COLORS.sage, breakLine: true } },
        { text: "Problem set: ", options: { bold: true } },
        { text: "odd 1 – 19", options: { italic: true, color: COLORS.sage, breakLine: true } },
        { text: "One real-world rate ", options: { bold: true } },
        { text: "you noticed today.", options: { italic: true, color: COLORS.sage } },
      ],
      {
        x: 7.0, y: 3.25, w: 5.8, h: 2.4,
        fontFace: "Calibri", fontSize: 20, color: COLORS.bone,
        margin: 0, paraSpaceAfter: 6,
      }
    );

    // "DUE NEXT CLASS  ·  BRING QUESTIONS" eyebrow row above the bottom rule
    s.addShape("line", {
      x: 7.0, y: 5.85, w: 5.8, h: 0,
      line: { color: COLORS.ruleDark, width: 0.5 },
    });
    s.addText("DUE NEXT CLASS", {
      x: 7.0, y: 6.0, w: 3, h: 0.35,
      fontFace: "Calibri", fontSize: 11, color: COLORS.mutedLight,
      charSpacing: 6, margin: 0,
    });
    s.addText("BRING QUESTIONS", {
      x: 10.0, y: 6.0, w: 2.8, h: 0.35,
      fontFace: "Calibri", fontSize: 11, color: COLORS.bone,
      bold: true, charSpacing: 6, align: "right", margin: 0,
    });
  }

  // -------------------------------------------------------------------------
  // Write
  // -------------------------------------------------------------------------
  await pres.writeFile({ fileName: "Calculus.pptx" });
  console.log("Wrote Calculus.pptx");
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
