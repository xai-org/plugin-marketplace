// Recreates the "Venture Capital — A Primer" deck using pptxgenjs
// Palette: cream #F1EBE0, burnt orange #C84B1F, ink #1A1A1A, muted #6B6356, dark #0E0E0E

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";          // 13.333" × 7.5"
pres.author = "Venture Capital Primer";
pres.title  = "Venture Capital — A Primer";

// --- Color tokens ------------------------------------------------------------
const CREAM   = "F1EBE0";
const CREAM_DK= "E8E0D1";
const ORANGE  = "C84B1F";
const ORANGE_L= "E0987A";
const TAN     = "D6C9B3";
const INK     = "1A1A1A";
const MUTED   = "6B6356";
const DARK_BG = "1A1512";
const DARK_BG_TXT = "F1EBE0";
const DARK_MUTED  = "9A9184";
const HAIRLINE    = "CFC5B3";
const HAIRLINE_DK = "3A332D";

const HF = "Helvetica";                // header / body (clean sans)

// --- Helpers -----------------------------------------------------------------
const SW = 13.333;    // slide width
const SH = 7.5;       // slide height

// Top "eyebrow" strip: orange dot + SECTION + index
function addEyebrow(slide, section, index, dark = false) {
  const dotColor = ORANGE;
  const txtColor = ORANGE;
  const idxColor = dark ? DARK_MUTED : MUTED;

  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.63, w: 0.1, h: 0.1,
    fill: { color: dotColor }, line: { type: "none" },
  });
  slide.addText(section, {
    x: 0.72, y: 0.52, w: 3.5, h: 0.32,
    fontFace: HF, fontSize: 11, bold: true, color: txtColor,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  slide.addText(index, {
    x: 4.3, y: 0.52, w: 1.5, h: 0.32,
    fontFace: HF, fontSize: 11, color: idxColor,
    charSpacing: 4, margin: 0, valign: "middle",
  });
}

// Bottom footer row
function addFooter(slide, rightText, dark = false) {
  const color = dark ? DARK_MUTED : MUTED;
  slide.addText(
    [{ text: "VENTURE CAPITAL — A PRIMER", options: { italic: true } }],
    {
      x: 0.55, y: 7.05, w: 5, h: 0.3,
      fontFace: HF, fontSize: 10, color, charSpacing: 2, margin: 0,
    }
  );
  slide.addText(rightText, {
    x: 8.3, y: 7.05, w: 4.5, h: 0.3,
    fontFace: HF, fontSize: 10, color, charSpacing: 4,
    align: "right", margin: 0,
  });
}

// ============================================================================
// SLIDE 1 — Cover
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "A PRIMER", "01 / 09");

  // Title: "Venture" (ink) / "Capital" (orange italic) stacked
  s.addText("Venture", {
    x: 0.55, y: 1.45, w: 7.5, h: 1.5,
    fontFace: HF, fontSize: 110, bold: true, color: INK,
    margin: 0, valign: "middle",
  });
  s.addText("Capital", {
    x: 0.55, y: 2.85, w: 7.5, h: 1.5,
    fontFace: HF, fontSize: 110, bold: true, italic: true, color: ORANGE,
    margin: 0, valign: "middle",
  });

  // Tagline
  s.addText(
    "How a small corner of finance quietly funds the future — and how to participate in it.",
    {
      x: 0.55, y: 4.6, w: 6.3, h: 1.2,
      fontFace: HF, fontSize: 20, italic: true, color: INK,
      margin: 0, valign: "top",
    }
  );

  // Hairline divider above meta row
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 6.45, w: 6.5, h: 0,
    line: { color: HAIRLINE, width: 0.75 },
  });

  // Meta row
  s.addText("2026 EDITION", {
    x: 0.55, y: 6.65, w: 2.2, h: 0.35,
    fontFace: HF, fontSize: 10, bold: true, color: MUTED,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("GLOBAL · RETAIL PRIMER", {
    x: 2.85, y: 6.65, w: 3.8, h: 0.35,
    fontFace: HF, fontSize: 10, bold: true, color: MUTED,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("09 SLIDES", {
    x: 6.75, y: 6.65, w: 2.0, h: 0.35,
    fontFace: HF, fontSize: 10, bold: true, color: MUTED,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // --- Right-side radial "VC" diagram -------------------------------------
  // Slide is 13.333" wide. Keep the entire diagram within bounds with ~0.3"
  // margin on the right, or it gets clipped in presentation mode.
  const cx = 10.3, cy = 3.9;
  const radii = [2.7, 1.98, 1.26, 0.63]; // outer → inner rings (diameter)
  radii.forEach((d) => {
    s.addShape(pres.shapes.OVAL, {
      x: cx - d, y: cy - d, w: d * 2, h: d * 2,
      fill: { type: "none" }, line: { color: INK, width: 0.5 },
    });
  });

  // Cross + diagonals
  // PowerPoint rejects shapes with negative cy, so we flip the upward diagonal
  // with flipV instead of using a negative height.
  const R = 2.7;
  s.addShape(pres.shapes.LINE, {
    x: cx - R, y: cy, w: R * 2, h: 0,
    line: { color: INK, width: 0.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: cx, y: cy - R, w: 0, h: R * 2,
    line: { color: INK, width: 0.5 },
  });
  // \ diagonal (top-left to bottom-right)
  s.addShape(pres.shapes.LINE, {
    x: cx - R * 0.707, y: cy - R * 0.707, w: R * 1.414, h: R * 1.414,
    line: { color: INK, width: 0.5 },
  });
  // / diagonal (bottom-left to top-right) — positive bounds, flipV to reverse
  s.addShape(pres.shapes.LINE, {
    x: cx - R * 0.707, y: cy - R * 0.707, w: R * 1.414, h: R * 1.414,
    flipV: true,
    line: { color: INK, width: 0.5 },
  });

  // Endpoint dots on outer ring (cardinal)
  [[cx, cy - R], [cx, cy + R], [cx - R, cy], [cx + R, cy]].forEach(([x, y]) => {
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14,
      fill: { color: INK }, line: { type: "none" },
    });
  });

  // Small orange dots where mid-ring meets the axes (second ring)
  const r2 = 1.98;
  [[cx, cy - r2], [cx, cy + r2], [cx - r2, cy], [cx + r2, cy]].forEach(([x, y]) => {
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.06, y: y - 0.06, w: 0.12, h: 0.12,
      fill: { color: ORANGE }, line: { type: "none" },
    });
  });

  // Central orange disc with "VC"
  s.addShape(pres.shapes.OVAL, {
    x: cx - 0.5, y: cy - 0.5, w: 1.0, h: 1.0,
    fill: { color: ORANGE }, line: { type: "none" },
  });
  s.addText("VC", {
    x: cx - 0.5, y: cy - 0.5, w: 1.0, h: 1.0,
    fontFace: HF, fontSize: 13, color: CREAM, bold: false,
    align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
}

// ============================================================================
// SLIDE 2 — Definition
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "DEFINITION", "02 / 09");

  // Left column: entry number + phonetic
  s.addText("ENTRY 01", {
    x: 0.55, y: 1.5, w: 2.5, h: 0.35,
    fontFace: HF, fontSize: 11, bold: true, color: ORANGE,
    charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("/ˈventʃər\nˈkapɪt(ə)l/", {
    x: 0.55, y: 1.95, w: 2.5, h: 1.0,
    fontFace: HF, fontSize: 22, italic: true, color: INK,
    margin: 0, valign: "top",
  });

  // Word + part of speech
  s.addText([
    { text: "venture capital", options: { color: INK } },
    { text: ".",                options: { color: ORANGE } },
  ], {
    x: 3.3, y: 1.35, w: 9.6, h: 1.5,
    fontFace: HF, fontSize: 80, bold: true,
    margin: 0, valign: "middle",
  });
  s.addText("noun · finance", {
    x: 3.3, y: 2.75, w: 6, h: 0.4,
    fontFace: HF, fontSize: 18, italic: true, color: MUTED,
    margin: 0, valign: "top",
  });

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: 3.3, y: 3.4, w: 9.5, h: 0,
    line: { color: HAIRLINE, width: 0.75 },
  });

  // Definition body with orange phrase
  s.addText([
    { text: "Money invested in ",    options: { color: INK } },
    { text: "young, private companies", options: { color: ORANGE, italic: true } },
    { text: " with high growth potential — in exchange for equity, and with the expectation that most will fail so that a few can return the entire fund.",
      options: { color: INK } },
  ], {
    x: 3.3, y: 3.6, w: 9.3, h: 2.0,
    fontFace: HF, fontSize: 26,
    margin: 0, valign: "top",
  });

  // Secondary divider
  s.addShape(pres.shapes.LINE, {
    x: 3.3, y: 5.8, w: 9.5, h: 0,
    line: { color: HAIRLINE, width: 0.75 },
  });

  // Etymology / footnote
  s.addText([
    { text: "From ",                options: { color: INK, bold: true } },
    { text: "venture",              options: { color: INK, italic: true, bold: true } },
    { text: " — a risky undertaking. Modern VC emerged in Boston in 1946 with American Research and Development Corporation.",
      options: { color: MUTED } },
  ], {
    x: 3.3, y: 5.95, w: 9.3, h: 0.7,
    fontFace: HF, fontSize: 12,
    margin: 0, valign: "top",
  });

  addFooter(s, "02 — WHAT IT IS");
}

// ============================================================================
// SLIDE 3 — The Mechanism
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "THE MECHANISM", "03 / 09");

  // Big 2-line headline — split into two text boxes for tight line-height
  s.addText([
    { text: "Capital flows in ", options: { color: INK } },
    { text: "one direction",     options: { color: ORANGE, italic: true } },
    { text: " ,",                options: { color: INK } },
  ], {
    x: 0.55, y: 1.15, w: 12.3, h: 0.95,
    fontFace: HF, fontSize: 44, bold: true,
    margin: 0, valign: "top",
  });
  s.addText([
    { text: "returns flow back over ", options: { color: INK } },
    { text: "ten years",         options: { color: ORANGE, italic: true } },
    { text: ".",                 options: { color: INK } },
  ], {
    x: 0.55, y: 2.05, w: 12.3, h: 0.95,
    fontFace: HF, fontSize: 44, bold: true,
    margin: 0, valign: "top",
  });

  // Four cards, aligned
  const cards = [
    {
      num: "01", title: "Limited\nPartners",
      body: "Pensions, endowments, sovereign wealth, wealthy individuals. They supply the money.",
      tag:  "→ CALPERS · YALE · FAMILY OFFICES",
    },
    {
      num: "02", title: "General\nPartners",
      body: "The VC firm. They raise the fund, pick the companies, take 2% fees + 20% of profits.",
      tag:  "→ “2 AND 20”",
    },
    {
      num: "03", title: "Portfolio\nCompanies",
      body: "20–40 startups per fund. They receive capital, give up equity, grow fast or die.",
      tag:  "→ 10 YR HORIZON",
    },
    {
      num: "04", title: "Exits",
      body: "IPO or acquisition. Proceeds flow back to LPs after GPs take carry.",
      tag:  "→ IPO · M&A · SECONDARY",
    },
  ];

  const cardW = 2.85, cardH = 2.75, gap = 0.2;
  const startX = 0.55;
  const cardY  = 4.05;
  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    // Frame
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { type: "none" },
      line: { color: HAIRLINE, width: 0.75 },
    });
    // Number
    s.addText(c.num, {
      x: x + 0.25, y: cardY + 0.2, w: 1, h: 0.3,
      fontFace: HF, fontSize: 12, bold: true, color: ORANGE,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    // Title (2-line)
    s.addText(c.title, {
      x: x + 0.25, y: cardY + 0.55, w: cardW - 0.5, h: 0.95,
      fontFace: HF, fontSize: 24, bold: true, color: INK,
      margin: 0, valign: "top",
    });
    // Body
    s.addText(c.body, {
      x: x + 0.25, y: cardY + 1.55, w: cardW - 0.5, h: 0.85,
      fontFace: HF, fontSize: 11, color: INK,
      margin: 0, valign: "top",
    });
    // Tag
    s.addText(c.tag, {
      x: x + 0.25, y: cardY + cardH - 0.5, w: cardW - 0.5, h: 0.3,
      fontFace: HF, fontSize: 9, bold: true, color: ORANGE,
      charSpacing: 2, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "03 — HOW IT WORKS");
}

// ============================================================================
// SLIDE 4 — Capital Stack / Funding Stages
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "CAPITAL STACK", "04 / 09");

  // Headline: "The funding stages."
  s.addText([
    { text: "The ",                    options: { color: INK } },
    { text: "funding stages",          options: { color: ORANGE, italic: true } },
    { text: ".",                       options: { color: INK } },
  ], {
    x: 0.55, y: 1.1, w: 11, h: 1.2,
    fontFace: HF, fontSize: 56, bold: true,
    margin: 0, valign: "middle",
  });

  // Subtitle
  s.addText(
    "Every startup climbs the same ladder. Each rung raises more money, values the company higher, and lets earlier investors ring the bell.",
    {
      x: 0.55, y: 2.45, w: 12.2, h: 0.8,
      fontFace: HF, fontSize: 16, color: INK,
      margin: 0, valign: "top",
    }
  );

  // Top divider across 5 columns
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 3.55, w: 12.3, h: 0,
    line: { color: HAIRLINE, width: 0.75 },
  });

  // 5 stage columns
  const stages = [
    { eyebrow: "01 — PRE-SEED",   title: "Pre-Seed",    range: "$250K – $2M",   body: "Founder, friends & family, angels. An idea and a deck.",    barW: 0.4, barC: "E8C8B5" },
    { eyebrow: "02 — SEED",       title: "Seed",        range: "$2M – $5M",     body: "Seed funds, micro-VCs. Product-market fit hunt begins.",    barW: 0.8, barC: "E0987A" },
    { eyebrow: "03 — SERIES A",   title: "Series A",    range: "$10M – $20M",   body: "First institutional round. Revenue exists, team scales.",   barW: 1.2, barC: "D17048" },
    { eyebrow: "04 — SERIES B/C", title: "Series B/C",  range: "$30M – $100M+", body: "Growth mode. Expansion, hiring, new markets.",              barW: 1.7, barC: "C65930" },
    { eyebrow: "05 — LATE STAGE", title: "Late /\nPre-IPO", range: "$100M – $1B+", body: "Crossover funds, sovereign wealth. Prepping for exit.",  barW: 2.2, barC: ORANGE },
  ];

  const colW = 2.4, colGap = 0.1;
  const colStartX = 0.55;
  const colTopY = 3.75;
  const colH = 3.1;

  stages.forEach((st, i) => {
    const x = colStartX + i * (colW + colGap);

    // Vertical divider to the right of columns 1–4
    if (i < stages.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x + colW + colGap / 2, y: colTopY - 0.1, w: 0, h: colH + 0.2,
        line: { color: HAIRLINE, width: 0.5 },
      });
    }

    // Eyebrow
    s.addText(st.eyebrow, {
      x: x + 0.15, y: colTopY, w: colW - 0.2, h: 0.3,
      fontFace: HF, fontSize: 10, bold: true, color: MUTED,
      charSpacing: 3, margin: 0, valign: "middle",
    });

    // Title
    s.addText(st.title, {
      x: x + 0.15, y: colTopY + 0.35, w: colW - 0.2, h: 1.0,
      fontFace: HF, fontSize: 28, bold: true, color: INK,
      margin: 0, valign: "top",
    });

    // Range
    s.addText(st.range, {
      x: x + 0.15, y: colTopY + 1.35, w: colW - 0.2, h: 0.35,
      fontFace: HF, fontSize: 14, bold: true, color: ORANGE,
      margin: 0, valign: "middle",
    });

    // Body
    s.addText(st.body, {
      x: x + 0.15, y: colTopY + 1.8, w: colW - 0.2, h: 1.0,
      fontFace: HF, fontSize: 11, color: INK,
      margin: 0, valign: "top",
    });

    // Bottom bar — widens + darkens across the columns
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: colTopY + colH - 0.3, w: st.barW, h: 0.04,
      fill: { color: st.barC }, line: { type: "none" },
    });
  });

  addFooter(s, "04 — FUNDING STAGES");
}

// ============================================================================
// SLIDE 5 — The Global Market
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "THE GLOBAL MARKET", "05 / 09");

  // Giant stat on left: ~$3 (ink) + T (orange italic, smaller superscript-style)
  // Split into two side-by-side text boxes to avoid oversized font + nested fontSize quirks
  s.addText("~$3", {
    x: 0.4, y: 1.1, w: 4.5, h: 2.8,
    fontFace: HF, fontSize: 160, bold: true, color: INK,
    margin: 0, valign: "middle",
  });
  s.addText("T", {
    x: 4.2, y: 1.4, w: 1.5, h: 2.0,
    fontFace: HF, fontSize: 90, bold: true, italic: true, color: ORANGE,
    margin: 0, valign: "middle",
  });

  // Caption below the big stat
  s.addText(
    "Global venture capital assets under management (2025) — roughly the GDP of France.",
    {
      x: 0.55, y: 3.95, w: 5.8, h: 1.0,
      fontFace: HF, fontSize: 17, color: INK,
      margin: 0, valign: "top",
    }
  );

  // Thin divider above source line
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 5.05, w: 5.5, h: 0,
    line: { color: HAIRLINE, width: 0.5 },
  });

  s.addText(
    "Source: Preqin / PitchBook estimates. Illustrative, not investment advice.",
    {
      x: 0.55, y: 5.15, w: 5.8, h: 0.7,
      fontFace: HF, fontSize: 11, color: MUTED,
      margin: 0, valign: "top",
    }
  );

  // ---- Right: 5-row ledger of secondary stats ----
  const rows = [
    { label: "Annual global VC deployment", value: "~$350B",   valueItalic: true },
    { label: "Active VC firms worldwide",   value: "~5,900",   valueItalic: false },
    { label: "Share deployed in the U.S.",  value: "~50%",     valueItalic: true },
    { label: "Unicorns globally",           value: "~1,300",   valueItalic: false },
    { label: "Startups funded per year",    value: "~30,000",  valueItalic: true },
  ];

  const ledgerX = 6.9;
  const ledgerW = 6.0;
  const ledgerTop = 1.4;
  const rowH = 1.05;

  rows.forEach((r, i) => {
    const y = ledgerTop + i * rowH;
    // Row divider (top of each row)
    s.addShape(pres.shapes.LINE, {
      x: ledgerX, y, w: ledgerW, h: 0,
      line: { color: HAIRLINE, width: 0.5 },
    });
    // Label (left)
    s.addText(r.label, {
      x: ledgerX + 0.1, y: y + 0.2, w: 3.3, h: rowH - 0.2,
      fontFace: HF, fontSize: 15, color: INK,
      margin: 0, valign: "middle",
    });
    // Value (right)
    s.addText(r.value, {
      x: ledgerX + 3.5, y: y + 0.1, w: ledgerW - 3.5 - 0.05, h: rowH - 0.2,
      fontFace: HF, fontSize: 40, bold: true,
      italic: r.valueItalic,
      color: r.valueItalic ? ORANGE : INK,
      align: "right", valign: "middle", margin: 0,
    });
  });
  // Bottom divider
  s.addShape(pres.shapes.LINE, {
    x: ledgerX, y: ledgerTop + rows.length * rowH, w: ledgerW, h: 0,
    line: { color: HAIRLINE, width: 0.5 },
  });

  addFooter(s, "05 — THE GLOBAL MARKET");
}

// ============================================================================
// SLIDE 6 — The Major Players (dark slide)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: DARK_BG };

  addEyebrow(s, "THE MAJOR PLAYERS", "06 / 09", true);

  // Headline: "A concentrated industry."
  s.addText([
    { text: "A ",               options: { color: DARK_BG_TXT } },
    { text: "concentrated",     options: { color: ORANGE, italic: true } },
    { text: " industry.",       options: { color: DARK_BG_TXT } },
  ], {
    x: 0.55, y: 1.1, w: 12.3, h: 1.1,
    fontFace: HF, fontSize: 56, bold: true,
    margin: 0, valign: "middle",
  });

  // Subtitle
  s.addText(
    "The top 50 firms manage the majority of global VC capital. A handful of names appear on nearly every unicorn cap table.",
    {
      x: 0.55, y: 2.3, w: 10.5, h: 0.8,
      fontFace: HF, fontSize: 16, color: DARK_MUTED,
      margin: 0, valign: "top",
    }
  );

  // Top divider
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 3.3, w: 12.3, h: 0,
    line: { color: HAIRLINE_DK, width: 0.5 },
  });

  // 2×4 grid of firms
  const firms = [
    { tier: "TIER 1 · US",      name: "Sequoia Capital",      aum: "Est. AUM · $85B" },
    { tier: "TIER 1 · US",      name: "Andreessen\nHorowitz", aum: "Est. AUM · $43B" },
    { tier: "TIER 1 · US",      name: "Accel",                aum: "Est. AUM · $30B" },
    { tier: "TIER 1 · US",      name: "Benchmark",            aum: "Est. AUM · $3B · concentrated" },
    { tier: "GROWTH · US",      name: "Tiger Global",         aum: "Est. AUM · $60B" },
    { tier: "CORPORATE · JAPAN",name: "SoftBank Vision\nFund",aum: "Est. AUM · $100B+" },
    { tier: "TIER 1 · EUROPE",  name: "Index Ventures",       aum: "Est. AUM · $16B" },
    { tier: "TIER 1 · ASIA",    name: "Hillhouse",            aum: "Est. AUM · $100B+" },
  ];

  const gridLeft = 0.55;
  const gridTop  = 3.4;
  const cellW    = 3.075;
  const cellH    = 1.65;

  firms.forEach((f, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = gridLeft + col * cellW;
    const y = gridTop + row * cellH + 0.1;

    // Vertical divider between columns (not at far right)
    if (col > 0) {
      s.addShape(pres.shapes.LINE, {
        x, y: y - 0.05, w: 0, h: cellH - 0.05,
        line: { color: HAIRLINE_DK, width: 0.5 },
      });
    }

    // Tier
    s.addText(f.tier, {
      x: x + 0.25, y: y + 0.1, w: cellW - 0.3, h: 0.3,
      fontFace: HF, fontSize: 10, bold: true, color: ORANGE_L,
      charSpacing: 3, margin: 0, valign: "middle",
    });
    // Name
    s.addText(f.name, {
      x: x + 0.25, y: y + 0.42, w: cellW - 0.3, h: 0.85,
      fontFace: HF, fontSize: 22, bold: true, color: DARK_BG_TXT,
      margin: 0, valign: "top",
    });
    // AUM
    s.addText(f.aum, {
      x: x + 0.25, y: y + 1.32, w: cellW - 0.3, h: 0.3,
      fontFace: HF, fontSize: 11, color: DARK_MUTED,
      margin: 0, valign: "middle",
    });
  });

  // Middle horizontal divider between rows
  s.addShape(pres.shapes.LINE, {
    x: gridLeft, y: gridTop + cellH + 0.05, w: cellW * 4, h: 0,
    line: { color: HAIRLINE_DK, width: 0.5 },
  });

  addFooter(s, "06 — THE MAJOR PLAYERS", true);
}

// ============================================================================
// SLIDE 7 — The Risk Profile / Power Law
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "THE RISK PROFILE", "07 / 09");

  // Headline
  s.addText([
    { text: "The ",            options: { color: INK } },
    { text: "power law",       options: { color: ORANGE, italic: true } },
    { text: ".",               options: { color: INK } },
  ], {
    x: 0.55, y: 1.15, w: 8, h: 1.3,
    fontFace: HF, fontSize: 60, bold: true,
    margin: 0, valign: "middle",
  });

  // Left-side explanatory text (two paragraphs with divider)
  s.addText([
    { text: "In a VC portfolio, returns are not spread evenly. One or two companies typically return ", options: { color: INK } },
    { text: "more than all the others combined",                                                        options: { color: INK, bold: true } },
    { text: " .",                                                                                       options: { color: INK } },
  ], {
    x: 0.55, y: 3.1, w: 5.8, h: 1.4,
    fontFace: HF, fontSize: 15, margin: 0, valign: "top",
  });

  // Divider between the paragraphs
  s.addShape(pres.shapes.LINE, {
    x: 0.55, y: 4.55, w: 5.8, h: 0,
    line: { color: HAIRLINE, width: 0.5 },
  });

  s.addText([
    { text: "A fund with thirty investments may have twenty-eight write-downs and still post a strong vintage — if the ", options: { color: INK } },
    { text: "top two returners", options: { color: INK, bold: true } },
    { text: " break out.",       options: { color: INK } },
  ], {
    x: 0.55, y: 4.7, w: 5.8, h: 1.4,
    fontFace: HF, fontSize: 15, margin: 0, valign: "top",
  });

  // --- Right: horizontal bar chart with percent labels and right-side notes ---
  const bars = [
    { pct: "~65%",  w: 2.6, color: TAN,     noteBold: "Return < invested", noteTail: "partial\nloss or zero",       italic: true },
    { pct: "~25%",  w: 1.1, color: "E8BFA9",noteBold: "1× – 3×",          noteTail: "modest winners",               italic: false },
    { pct: "~8%",   w: 0.4, color: "CF8866",noteBold: "3× – 10×",         noteTail: "solid winners",                italic: false },
    { pct: "~2%",   w: 0.1, color: ORANGE,  noteBold: "10×+",             noteTail: "the fund makers",              italic: true },
  ];

  const chartLeft = 6.5;
  const barX      = 7.9;    // bars start here
  const chartTopY = 2.55;
  const rowGap    = 0.85;
  const barH      = 0.55;

  bars.forEach((b, i) => {
    const y = chartTopY + i * rowGap;

    // Percent label (left of bar, right-aligned)
    s.addText(b.pct, {
      x: chartLeft, y: y - 0.12, w: 1.3, h: barH + 0.25,
      fontFace: HF, fontSize: 32, italic: b.italic,
      color: b.italic ? ORANGE : INK,
      align: "right", valign: "middle", margin: 0,
    });

    // Bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y, w: b.w, h: barH,
      fill: { color: b.color }, line: { type: "none" },
    });

    // Right-side note
    s.addText([
      { text: b.noteBold,        options: { bold: true, color: INK } },
      { text: " " + b.noteTail.replace("\n", " "), options: { color: INK } },
    ], {
      x: 10.7, y: y - 0.05, w: 2.5, h: barH + 0.1,
      fontFace: HF, fontSize: 13, margin: 0, valign: "middle",
    });
  });

  // Axis hairline under bars
  const axisY = chartTopY + bars.length * rowGap - 0.1;
  s.addShape(pres.shapes.LINE, {
    x: barX, y: axisY, w: 2.7, h: 0,
    line: { color: HAIRLINE, width: 0.5 },
  });

  // Axis label
  s.addText("SHARE OF PORTFOLIO", {
    x: barX, y: axisY + 0.1, w: 2.3, h: 0.3,
    fontFace: HF, fontSize: 10, bold: true, color: MUTED,
    charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("→", {
    x: barX + 2.4, y: axisY + 0.1, w: 0.35, h: 0.3,
    fontFace: HF, fontSize: 12, color: MUTED,
    align: "right", valign: "middle", margin: 0,
  });

  addFooter(s, "07 — THE RISK PROFILE");
}

// ============================================================================
// SLIDE 8 — Retail Access
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addEyebrow(s, "RETAIL ACCESS", "08 / 09");

  // Headline across two lines — split into two text boxes
  s.addText([
    { text: "Ways for ",           options: { color: INK } },
    { text: "everyday investors",  options: { color: ORANGE, italic: true } },
    { text: " to",                 options: { color: INK } },
  ], {
    x: 0.55, y: 1.1, w: 12.3, h: 0.95,
    fontFace: HF, fontSize: 44, bold: true,
    margin: 0, valign: "top",
  });
  s.addText("participate.", {
    x: 0.55, y: 2.0, w: 12.3, h: 0.95,
    fontFace: HF, fontSize: 44, bold: true, color: INK,
    margin: 0, valign: "top",
  });

  // Subtitle
  s.addText(
    "Direct VC funds require accreditation and $250K+ minimums. These four paths open the asset class to most retail investors.",
    {
      x: 0.55, y: 3.0, w: 12.2, h: 0.8,
      fontFace: HF, fontSize: 15, color: INK,
      margin: 0, valign: "top",
    }
  );

  // 3 cards (tan panels)
  const cards = [
    {
      num: "01", title: "Publicly Listed VC\nStocks",
      body: "Buy shares of firms like Hercules Capital (HTGC) or publicly traded BDCs that make venture-style loans and equity investments.",
      min:  "MINIMUM · ONE SHARE",
    },
    {
      num: "02", title: "Equity Crowdfunding",
      body: "Platforms such as Republic, StartEngine and Wefunder let non-accredited investors back early-stage startups from $100.",
      min:  "MINIMUM · ~$100",
    },
    {
      num: "03", title: "Interval & Tender\nFunds",
      body: "Newer registered funds (e.g. Fundrise Innovation, ARK Venture) hold private-company stakes and accept retail dollars.",
      min:  "MINIMUM · $10 – $1,000",
    },
  ];

  const cardW = 4.05, cardH = 3.1, gap = 0.1;
  const startX = 0.55, startY = 3.9;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: CREAM_DK }, line: { type: "none" },
    });
    // Big italic number
    s.addText(c.num, {
      x: x + 0.3, y: startY + 0.2, w: 2.5, h: 0.7,
      fontFace: HF, fontSize: 40, italic: true, color: ORANGE,
      margin: 0, valign: "middle",
    });
    // Title
    s.addText(c.title, {
      x: x + 0.3, y: startY + 0.95, w: cardW - 0.6, h: 0.9,
      fontFace: HF, fontSize: 22, bold: true, color: INK,
      margin: 0, valign: "top",
    });
    // Body
    s.addText(c.body, {
      x: x + 0.3, y: startY + 1.85, w: cardW - 0.6, h: 0.95,
      fontFace: HF, fontSize: 11, color: INK,
      margin: 0, valign: "top",
    });
    // Minimum
    s.addText(c.min, {
      x: x + 0.3, y: startY + cardH - 0.45, w: cardW - 0.6, h: 0.3,
      fontFace: HF, fontSize: 10, bold: true, color: MUTED,
      charSpacing: 3, margin: 0, valign: "middle",
    });
  });

  addFooter(s, "08 — RETAIL ACCESS");
}

// ============================================================================
// SLIDE 9 — Key Takeaways (dark slide)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: DARK_BG };

  addEyebrow(s, "KEY TAKEAWAYS", "09 / 09", true);

  // Headline (left column) — split into two text boxes for tight line-height
  s.addText("Four things to", {
    x: 0.55, y: 1.1, w: 6, h: 1.0,
    fontFace: HF, fontSize: 44, bold: true, color: DARK_BG_TXT,
    margin: 0, valign: "top",
  });
  s.addText([
    { text: "remember",         options: { color: ORANGE, italic: true } },
    { text: ".",                options: { color: DARK_BG_TXT } },
  ], {
    x: 0.55, y: 2.0, w: 6, h: 1.0,
    fontFace: HF, fontSize: 44, bold: true,
    margin: 0, valign: "top",
  });

  // Left column supporting copy
  s.addText(
    "Venture capital is long-duration, illiquid, and driven by outliers. Size your exposure accordingly.",
    {
      x: 0.55, y: 3.6, w: 5.3, h: 1.3,
      fontFace: HF, fontSize: 15, color: DARK_MUTED,
      margin: 0, valign: "top",
    }
  );

  // Right column: 4 numbered rows separated by hairlines
  const rows = [
    { num: "01", parts: [
      { text: "VC funds the ",        options: { color: DARK_BG_TXT } },
      { text: "future",               options: { color: ORANGE_L, italic: true } },
      { text: " — but most bets fail.", options: { color: DARK_BG_TXT } },
    ]},
    { num: "02", parts: [
      { text: "Returns follow a ",    options: { color: DARK_BG_TXT } },
      { text: "power law",            options: { color: ORANGE_L, italic: true } },
      { text: " , not a bell curve.", options: { color: DARK_BG_TXT } },
    ]},
    { num: "03", parts: [
      { text: "Horizons are ",        options: { color: DARK_BG_TXT } },
      { text: "ten years",            options: { color: ORANGE_L, italic: true } },
      { text: " ; liquidity is the exception.", options: { color: DARK_BG_TXT } },
    ]},
    { num: "04", parts: [
      { text: "Retail paths exist — ",options: { color: DARK_BG_TXT } },
      { text: "sized modestly",       options: { color: ORANGE_L, italic: true } },
      { text: " within a portfolio.", options: { color: DARK_BG_TXT } },
    ]},
  ];

  const rightX   = 6.7;
  const rightW   = 6.2;
  const startY   = 1.4;
  const rowHt    = 1.3;

  rows.forEach((r, i) => {
    const y = startY + i * rowHt;
    // Top divider
    s.addShape(pres.shapes.LINE, {
      x: rightX, y, w: rightW, h: 0,
      line: { color: HAIRLINE_DK, width: 0.5 },
    });
    // Number
    s.addText(r.num, {
      x: rightX + 0.1, y: y + 0.3, w: 0.7, h: 0.5,
      fontFace: HF, fontSize: 11, color: ORANGE_L, charSpacing: 3,
      margin: 0, valign: "top",
    });
    // Sentence
    s.addText(r.parts, {
      x: rightX + 0.9, y: y + 0.2, w: rightW - 1, h: rowHt - 0.25,
      fontFace: HF, fontSize: 22, margin: 0, valign: "top",
    });
  });
  // Bottom divider
  s.addShape(pres.shapes.LINE, {
    x: rightX, y: startY + rows.length * rowHt, w: rightW, h: 0,
    line: { color: HAIRLINE_DK, width: 0.5 },
  });

  addFooter(s, "09 — KEY TAKEAWAYS", true);
}

// ----------------------------------------------------------------------------
pres.writeFile({ fileName: "Venture_Capital.pptx" }).then((fn) => {
  console.log("Wrote", fn);
});
