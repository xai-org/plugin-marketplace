// Hoboken Real Estate Projection - Mile Square Partners Fund IV LP Briefing
// Faithful recreation using pptxgenjs
//
// Usage:  node generate.js
// Outputs: Hoboken_Real_Este_Projection.pptx
//
// Requires the ./assets directory with the three embedded chart PNGs:
//   assets/image-5-1.png  (dotted cumulative-units overlay for slide 5)
//   assets/image-6-1.png  (slide 6 line chart)
//   assets/image-9-1.png  (slide 9 scenario-fan chart)
// These are extracted verbatim from the original deck.

const pptxgen = require("pptxgenjs");
const path    = require("path");

// --- Palette (pulled directly from the source slides) -----------------------
const C = {
  bg:       "F6F3EE", // warm cream background
  bgAlt:    "EDE8DF", // slightly darker cream (shaded cards)
  rule:     "D9D2C4", // hairline / divider tan
  ink:      "1C1A17", // near-black primary text
  body:     "4A453E", // warm dark grey body text
  mute:     "8A8378", // muted tan for eyebrows, captions, metadata
  dark:     "000000", // pure black (used sparingly)
  coral:    "C9572C", // orange/coral accent (from embedded chart art)
  coralTint:"F5E4D8", // tint used inside the scenario-fan band
};

const FONT_HEADING = "Helvetica Neue";
const FONT_BODY    = "Helvetica Neue";
const FONT_SERIF   = "Georgia"; // used for italic accents in giant titles

// --- Presentation setup -----------------------------------------------------
const pres = new pptxgen();
pres.author  = "Mile Square Partners";
pres.company = "Mile Square Partners";
pres.title   = "Hoboken Real Estate Projection - Fund IV LP Briefing";

// Custom slide size: 20" x 11.25" (matches original)
pres.defineLayout({ name: "MSP_CUSTOM", width: 20, height: 11.25 });
pres.layout = "MSP_CUSTOM";

const W = 20;    // slide width
const H = 11.25; // slide height

// --- Helpers ----------------------------------------------------------------
function bg(slide) {
  slide.background = { color: C.bg };
}

// Top header rule used on slides 2-9: small eyebrow left, meta right, thin rule
function addHeader(slide, leftEyebrow, rightEyebrow) {
  slide.addText(leftEyebrow, {
    x: 1.05, y: 0.78, w: 10, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body,
    charSpacing: 6, bold: false, margin: 0,
  });
  slide.addText(rightEyebrow, {
    x: 9, y: 0.78, w: 9.95, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body,
    charSpacing: 6, align: "right", margin: 0,
  });
  // Hairline rule under header
  slide.addShape(pres.shapes.LINE, {
    x: 1.05, y: 1.25, w: W - 2.1, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
}

// Source/footer caption (slides 3,4,5,6,9,10)
function addFootnote(slide, text, y = 10.7) {
  slide.addText(text, {
    x: 1.05, y: y, w: W - 2.1, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: C.mute, margin: 0,
  });
}

// ============================================================================
// SLIDE 1 — Cover
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);

  // Top-left: "Mile Square Partners" + tagline
  s.addText("Mile Square Partners", {
    x: 1.05, y: 1.1, w: 12, h: 0.55,
    fontFace: FONT_HEADING, fontSize: 20, bold: true, color: C.ink, margin: 0,
  });
  s.addText("REAL ESTATE CAPITAL \u00B7 EST. 2019", {
    x: 1.05, y: 1.6, w: 12, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
  });

  // Top-right: FUND IV LP BRIEFING
  s.addText("FUND IV LP", {
    x: 14, y: 1.1, w: 4.95, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, charSpacing: 6,
    align: "right", margin: 0,
  });
  s.addText("BRIEFING", {
    x: 14, y: 1.48, w: 4.95, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, charSpacing: 6,
    align: "right", margin: 0,
  });

  // Category line
  s.addText("HOBOKEN, NJ \u00B7 CONDO MARKET", {
    x: 1.05, y: 2.05, w: 12, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, charSpacing: 6, margin: 0,
  });

  // Giant headline (mixed weight: bold + italic serif for emphasis)
  s.addText([
    { text: "Five Years ", options: { bold: true, fontFace: FONT_HEADING, color: C.ink } },
    { text: "in a Mile ",  options: { italic: true, bold: true, fontFace: FONT_SERIF, color: C.ink } },
    { text: "Square.",     options: { italic: true, bold: true, fontFace: FONT_SERIF, color: C.ink } },
  ], {
    x: 0.95, y: 2.6, w: W - 1.6, h: 3.6,
    fontSize: 120, valign: "top", margin: 0,
  });

  // Subhead paragraph
  s.addText(
    "A 2026\u20132031 investment projection for Hoboken's for-sale condominium market \u2014 " +
    "where fundamentals, supply, and rates pull in three different directions.",
    {
      x: 1.05, y: 8.15, w: 8.5, h: 1.2,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  // Four-column metadata strip
  const metaY = 9.9;
  const cols = [
    { label: "PREPARED",    value: "April 2026",            x: 1.05,  w: 3.2 },
    { label: "HORIZON",     value: "FY2026 \u2013 FY2031",  x: 4.25,  w: 3.2 },
    { label: "AUDIENCE",    value: "Limited Partners",      x: 7.45,  w: 3.2 },
    { label: "CONFIDENTIAL",value: "Draft \u00B7 Not for distribution", x: 14.0, w: 4.95 },
  ];
  for (const col of cols) {
    s.addText(col.label, {
      x: col.x, y: metaY, w: col.w, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: C.mute, charSpacing: 6,
      align: col.label === "CONFIDENTIAL" ? "right" : "left", margin: 0,
    });
    s.addText(col.value, {
      x: col.x, y: metaY + 0.35, w: col.w, h: 0.4,
      fontFace: FONT_BODY, fontSize: 14, color: C.ink,
      align: col.label === "CONFIDENTIAL" ? "right" : "left", margin: 0,
    });
  }
}

// ============================================================================
// SLIDE 2 — Investment Thesis
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "02 \u00B7 INVESTMENT THESIS", "HOBOKEN 2026\u20132031");

  // Giant headline with mixed roman + italic
  s.addText([
    { text: "Scarcity of ",  options: { bold: false, fontFace: FONT_HEADING, color: C.ink } },
    { text: "land",          options: { italic: true, fontFace: FONT_SERIF, color: C.ink } },
    { text: " , not of ",    options: { fontFace: FONT_HEADING, color: C.ink } },
    { text: "demand.",       options: { italic: true, fontFace: FONT_SERIF, color: C.ink } },
  ], {
    x: 1.05, y: 1.8, w: W - 2.1, h: 1.6,
    fontSize: 64, valign: "top", margin: 0,
  });

  // Lead paragraph
  s.addText(
    "Hoboken remains the most supply-constrained PATH-connected submarket in the tri-state. " +
    "Over the next five years, we expect steady appreciation in well-located vintage product " +
    "and selective dislocation in new-construction inventory \u2014 a stockpickers' market.",
    {
      x: 1.05, y: 4.2, w: 12, h: 1.5,
      fontFace: FONT_BODY, fontSize: 16, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Three-column callouts
  const colY = 6.3;
  const colW = 5.6;
  const gap  = 0.4;
  const startX = 1.05;
  const cards = [
    {
      num: "01",
      h:   "A bounded geography with unbounded demand.",
      p:   "1.3 sq mi, built-out waterfront, and a 9-minute PATH to 33rd. Unit supply grows < 1.5% annually; NYC-adjacent labor force does not.",
    },
    {
      num: "02",
      h:   "A rate-cycle entry point, not a top.",
      p:   "Prices corrected 6\u20138% from 2022 peaks while inventory built. As the 30-yr normalizes toward 5.5%, pent-up owner-occupant demand re-enters the market.",
    },
    {
      num: "03",
      h:   "Vintage product trades at a discount it shouldn't.",
      p:   "Pre-2010 brownstone conversions trade 18% below comparable new-construction PSF despite superior floorplans and lower carry. The spread compresses.",
    },
  ];

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const x = startX + i * (colW + gap);

    // Vertical divider between columns (not before first)
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: x - gap / 2, y: colY, w: 0, h: 2.8,
        line: { color: C.rule, width: 0.5 },
      });
    }

    s.addText(c.num, {
      x: x, y: colY, w: colW, h: 0.85,
      fontFace: FONT_HEADING, fontSize: 52, color: C.ink, margin: 0,
    });
    s.addText(c.h, {
      x: x, y: colY + 0.95, w: colW, h: 1.0,
      fontFace: FONT_HEADING, fontSize: 18, color: C.ink,
      lineSpacingMultiple: 1.2, margin: 0,
    });
    s.addText(c.p, {
      x: x, y: colY + 1.9, w: colW, h: 1.3,
      fontFace: FONT_BODY, fontSize: 11, color: C.body,
      lineSpacingMultiple: 1.35, margin: 0,
    });
  }
}

// ============================================================================
// SLIDE 3 — Market Snapshot
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "03 \u00B7 MARKET SNAPSHOT", "YE 2025 \u00B7 CONDO SEGMENT");

  // Title
  s.addText("Where the market sits today.", {
    x: 1.05, y: 1.7, w: 16, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, bold: false, margin: 0,
  });

  // Subhead
  s.addText(
    "Prices off peak, inventory elevated but normalizing, DOM stretched, and the rental market tightening \u2014 a late-cycle setup for a for-sale entry.",
    {
      x: 1.05, y: 2.95, w: 12, h: 0.9,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // ---- Left column: five stat rows ----
  const leftX = 1.05, leftW = 9.6;
  const rows = [
    { label: "Median condo price",     sub: "2-bedroom, all vintages", val: "$875K",  delta: "\u22126.4% YoY" },
    { label: "Median price per sq ft", sub: "Blended",                 val: "$825",   delta: "\u22124.1% YoY" },
    { label: "Active listings",        sub: "Condo \u00B7 MLS",        val: "312",    delta: "+22% YoY"    },
    { label: "Days on market",         sub: "Median, closed deals",    val: "61",     delta: "+14 days"    },
    { label: "Median rent \u00B7 2BR", sub: "Stabilized buildings",    val: "$4,650", delta: "+5.8% YoY" },
  ];
  const rowY0 = 4.3;
  const rowH  = 1.15;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const y = rowY0 + i * rowH;

    // Label
    s.addText(r.label, {
      x: leftX, y: y, w: 5.5, h: 0.45,
      fontFace: FONT_HEADING, fontSize: 18, color: C.ink, margin: 0,
    });
    s.addText(r.sub, {
      x: leftX, y: y + 0.42, w: 5.5, h: 0.35,
      fontFace: FONT_BODY, fontSize: 11, color: C.mute, margin: 0,
    });

    // Value + delta (right-aligned block)
    s.addText([
      { text: r.val,         options: { fontSize: 36, color: C.ink, fontFace: FONT_HEADING } },
      { text: "  " + r.delta, options: { fontSize: 13, color: C.mute, fontFace: FONT_BODY } },
    ], {
      x: leftX + 5.0, y: y, w: leftW - 5.0, h: 0.9,
      align: "right", valign: "top", margin: 0,
    });

    // Hairline between rows (skip after last)
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: leftX, y: y + rowH - 0.05, w: leftW, h: 0,
        line: { color: C.rule, width: 0.5 },
      });
    }
  }

  // ---- Right panel: PSF by submarket ----
  const panelX = 11.3, panelY = 4.05, panelW = 7.65, panelH = 5.6;

  // Panel frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: panelX, y: panelY, w: panelW, h: panelH,
    fill: { color: C.bgAlt },
    line: { color: C.rule, width: 0.5 },
  });

  s.addText("FIG. 3.1 \u00B7 PSF BY SUBMARKET \u00B7 YE 2025", {
    x: panelX + 0.4, y: panelY + 0.3, w: panelW - 0.8, h: 0.35,
    fontFace: FONT_BODY, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
  });

  const subs = [
    { name: "Waterfront",     psf: 945, val: "$945" },
    { name: "Northwest",      psf: 890, val: "$890" },
    { name: "Downtown core",  psf: 830, val: "$830" },
    { name: "Midtown",        psf: 780, val: "$780" },
    { name: "Uptown interior",psf: 755, val: "$755" },
  ];
  const maxPsf = 1000; // scale
  const barY0  = panelY + 1.1;
  const barH   = 0.28;
  const barGap = 0.7;
  const labelW = 1.7;
  const trackX = panelX + 0.4 + labelW + 0.15;
  const trackW = panelW - 0.8 - labelW - 0.15 - 0.8; // leave room for value
  const valueX = panelX + panelW - 0.8;

  for (let i = 0; i < subs.length; i++) {
    const r = subs[i];
    const y = barY0 + i * barGap + 0.1;

    // Label (right-align, text-box left of track)
    s.addText(r.name, {
      x: panelX + 0.4, y: y - 0.04, w: labelW, h: barH + 0.1,
      fontFace: FONT_BODY, fontSize: 12, color: C.ink, margin: 0,
    });

    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: y, w: trackW, h: barH,
      fill: { color: C.rule }, line: { color: C.rule, width: 0 },
    });
    // Filled bar (top two are lighter cream, rest are ink - matches original)
    const fillColor = (i < 2) ? C.bg : C.ink;
    const fillW = trackW * (r.psf / maxPsf);
    s.addShape(pres.shapes.RECTANGLE, {
      x: trackX, y: y, w: fillW, h: barH,
      fill: { color: fillColor }, line: { color: fillColor, width: 0 },
    });

    // Value right
    s.addText(r.val, {
      x: valueX, y: y - 0.08, w: 0.8, h: barH + 0.2,
      fontFace: FONT_HEADING, fontSize: 16, color: C.ink,
      align: "right", margin: 0,
    });
  }

  // Panel caption
  s.addText(
    "Waterfront & NW quadrant command a 14\u201322% PSF premium over the uptown / interior core.",
    {
      x: panelX + 0.4, y: panelY + panelH - 1.1, w: panelW - 0.8, h: 0.8,
      fontFace: FONT_BODY, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  addFootnote(s,
    "Source: Hudson County MLS, illustrative aggregation. All figures shown are synthetic benchmarks for modeling purposes and should not be used as investment advice.",
    10.55
  );
}


// ============================================================================
// SLIDE 4 — Demand Fundamentals (four stat columns)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "04 \u00B7 DEMAND FUNDAMENTALS", "STRUCTURAL DRIVERS");

  s.addText("Four reasons demand doesn't leave.", {
    x: 1.05, y: 1.7, w: W - 2.1, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, margin: 0,
  });

  s.addText(
    "The buyer pool for a Hoboken condo is narrower and stickier than any comparable NJ submarket. " +
    "Each driver below operates on a multi-decade timeline and is insulated from national housing cycles.",
    {
      x: 1.05, y: 3.7, w: 13, h: 0.9,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  const items = [
    {
      num: "9",   unit: "min",
      head: "PATH to 33rd St \u00B7 Midtown",
      body: "Hoboken Terminal moves 47k daily riders. No other NJ town offers sub-15-minute access to both Midtown and the WTC from a single station.",
    },
    {
      num: "34",  unit: "yrs",
      head: "Median age \u00B7 head of household",
      body: "Hoboken skews younger than Jersey City (36) and NYC (38). Peak household-formation demographic, now aging into for-sale demand.",
    },
    {
      num: "$168K", unit: "",
      head: "Median household income",
      body: "2.3\u00D7 the NJ state median and rising 4.1% annually. Skew toward finance, tech, and professional services \u2014 income-durable cohorts.",
    },
    {
      num: "1.3", unit: "sq mi",
      head: "Total buildable area",
      body: "Functionally built-out. Net new unit additions capped at ~0.9% of stock per year; remaining pipeline is waterfront infill and brownfield conversion.",
    },
  ];

  const cardY = 5.25;
  const cardH = 4.2;
  const colsX = [1.05, 5.85, 10.65, 15.45];
  const colW  = 3.6;

  for (let i = 0; i < items.length; i++) {
    const x = colsX[i];
    const it = items[i];
    // Top rule above each column
    s.addShape(pres.shapes.LINE, {
      x: x, y: cardY, w: colW, h: 0,
      line: { color: C.ink, width: 1 },
    });

    // Big number with small unit
    s.addText([
      { text: it.num, options: { fontSize: 58, color: C.ink, fontFace: FONT_HEADING, bold: false } },
      { text: it.unit ? "  " + it.unit : "", options: { fontSize: 13, color: C.mute, fontFace: FONT_BODY } },
    ], {
      x: x, y: cardY + 0.25, w: colW, h: 1.3,
      valign: "bottom", margin: 0,
    });

    // Heading
    s.addText(it.head, {
      x: x, y: cardY + 1.7, w: colW, h: 0.45,
      fontFace: FONT_HEADING, fontSize: 14, color: C.ink, bold: false, margin: 0,
    });

    // Body
    s.addText(it.body, {
      x: x, y: cardY + 2.2, w: colW, h: cardH - 2.2,
      fontFace: FONT_BODY, fontSize: 11, color: C.body, lineSpacingMultiple: 1.35, margin: 0,
    });
  }

  addFootnote(s,
    "Source: U.S. Census ACS 5-yr, PATH ridership reports, City of Hoboken planning filings. Illustrative synthesis.",
    10.55
  );
}

// ============================================================================
// SLIDE 5 — Supply Pipeline (bar chart + side panel)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "05 \u00B7 SUPPLY PIPELINE", "NEW CONDO DELIVERIES");

  s.addText("Pipeline is front-loaded through 2027.", {
    x: 1.05, y: 1.7, w: 16, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, margin: 0,
  });

  // Left-side chart area
  const chartX = 1.05, chartY = 3.7, chartW = 11, chartH = 6.3;

  // Left eyebrow label
  s.addText("UNITS DELIVERED \u00B7 CONDO ONLY", {
    x: chartX, y: chartY, w: 5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
  });

  // "3,490 CUM. UNITS" right-aligned callout at top
  s.addText("3,490", {
    x: chartX + 6.9, y: chartY - 0.05, w: 1.8, h: 0.5,
    fontFace: FONT_HEADING, fontSize: 24, color: C.ink, align: "center", margin: 0,
  });
  s.addText("CUM. UNITS", {
    x: chartX + 6.9, y: chartY + 0.5, w: 1.8, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: C.mute, align: "center", charSpacing: 4, margin: 0,
  });

  // Bar chart: 8 years
  const years = [
    { label: "2023",     val: 380, fc: false },
    { label: "2024",     val: 510, fc: false },
    { label: "2025",     val: 640, fc: false },
    { label: "2026 \u1D07", val: 720, fc: true },
    { label: "2027 \u1D07", val: 560, fc: true },
    { label: "2028 \u1D07", val: 290, fc: true },
    { label: "2029 \u1D07", val: 210, fc: true },
    { label: "2030 \u1D07", val: 180, fc: true },
  ];

  const axisY    = chartY + 5.1; // bottom axis line
  const chartTop = chartY + 0.9; // top of bar area
  const barAreaH = axisY - chartTop;
  const maxVal   = 800;
  const nBars    = years.length;
  const barW     = 0.85;
  const slotW    = (chartW - 0.3) / nBars;

  for (let i = 0; i < nBars; i++) {
    const y = years[i];
    const barH = barAreaH * (y.val / maxVal);
    const cx = chartX + 0.2 + i * slotW + slotW / 2;
    const bx = cx - barW / 2;
    const by = axisY - barH;

    // Solid bar (delivered) vs. hollow outline (forecast)
    if (!y.fc) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx, y: by, w: barW, h: barH,
        fill: { color: C.ink }, line: { color: C.ink, width: 0 },
      });
    } else {
      // Forecast: faint outline only
      s.addShape(pres.shapes.RECTANGLE, {
        x: bx, y: by, w: barW, h: barH,
        fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
      });
    }

    // Value label above bar
    s.addText(String(y.val), {
      x: cx - 0.6, y: by - 0.45, w: 1.2, h: 0.4,
      fontFace: FONT_HEADING, fontSize: 15, color: C.ink,
      align: "center", margin: 0,
    });

    // X-axis label
    s.addText(y.label, {
      x: cx - 0.6, y: axisY + 0.1, w: 1.2, h: 0.35,
      fontFace: FONT_BODY, fontSize: 10, color: C.body,
      align: "center", margin: 0,
    });
  }

  // X-axis line
  s.addShape(pres.shapes.LINE, {
    x: chartX + 0.1, y: axisY, w: chartW - 0.2, h: 0,
    line: { color: C.mute, width: 0.75 },
  });

  // Cumulative units overlay (embedded PNG with the dotted trail)
  try {
    s.addImage({
      path: path.join(__dirname, "assets", "image-5-1.png"),
      x: chartX, y: chartY + 0.45, w: 9.965, h: 5.854,
    });
  } catch (e) { /* image optional */ }

  // Legend below chart
  const legY = axisY + 0.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 0.2, y: legY + 0.08, w: 0.2, h: 0.2,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  s.addText("Delivered", {
    x: chartX + 0.5, y: legY, w: 1.6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: chartX + 2.3, y: legY + 0.08, w: 0.2, h: 0.2,
    fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
  });
  s.addText("Forecast (permitted & underway)", {
    x: chartX + 2.6, y: legY, w: 4, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });
  s.addText("\u25CB  Cumulative new stock (right axis)", {
    x: chartX + 6.6, y: legY, w: 4.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });

  // ---- Right side panel: commentary + three stats ----
  const rX = 13.2, rY = 3.7, rW = 5.75;

  s.addText([
    { text: "Absorb the wave, then scarcity ", options: { fontFace: FONT_HEADING, color: C.ink } },
    { text: "returns.",                        options: { italic: true, fontFace: FONT_SERIF, color: C.ink } },
  ], {
    x: rX, y: rY, w: rW, h: 1.5,
    fontSize: 28, valign: "top", margin: 0,
  });

  s.addText(
    "Of the 2,760 condo units scheduled through 2030, ~63% deliver in the next 24 months. Post-2027 the pipeline falls off sharply \u2014 only three waterfront parcels have active entitlements.",
    {
      x: rX, y: rY + 1.7, w: rW, h: 1.5,
      fontFace: FONT_BODY, fontSize: 12, color: C.body, lineSpacingMultiple: 1.35, margin: 0,
    }
  );

  const stats = [
    { num: "63%",   cap: "of 5-yr pipeline delivers by YE 2027" },
    { num: "3",     cap: "remaining waterfront entitled parcels post-2028" },
    { num: "0.9%",  cap: "annualized net stock growth, 2028\u20132031" },
  ];
  for (let i = 0; i < stats.length; i++) {
    const y = rY + 3.5 + i * 0.85;
    s.addText(stats[i].num, {
      x: rX, y: y, w: 1.4, h: 0.55,
      fontFace: FONT_HEADING, fontSize: 24, color: C.ink, margin: 0,
    });
    s.addText(stats[i].cap, {
      x: rX + 1.5, y: y + 0.08, w: rW - 1.5, h: 0.6,
      fontFace: FONT_BODY, fontSize: 11, color: C.body, lineSpacingMultiple: 1.25, margin: 0,
    });
    if (i < stats.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rX, y: y + 0.75, w: rW, h: 0,
        line: { color: C.rule, width: 0.5 },
      });
    }
  }

  addFootnote(s, "Source: City of Hoboken permits, developer filings, internal synthesis. Figures illustrative.", 10.75);
}


// ============================================================================
// SLIDE 6 — Price Trajectory (uses embedded chart PNG)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "06 \u00B7 PRICE TRAJECTORY", "5-YEAR BASE CASE");

  s.addText([
    { text: "Base case: ",                                 options: { bold: false, fontFace: FONT_HEADING, color: C.ink } },
    { text: "+22%",                                        options: { italic: true, bold: false, fontFace: FONT_SERIF, color: C.ink } },
    { text: " price appreciation by 2031.",                options: { fontFace: FONT_HEADING, color: C.ink } },
  ], {
    x: 1.05, y: 1.7, w: W - 2.1, h: 1.1,
    fontSize: 52, valign: "top", margin: 0,
  });

  // Left: headline stat + breakdown
  const lX = 1.05;

  s.addText("MEDIAN 2BR \u00B7 YE 2031 \u1D07", {
    x: lX, y: 4.9, w: 6, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6, margin: 0,
  });

  s.addText([
    { text: "$1.07", options: { fontSize: 110, color: C.ink, fontFace: FONT_HEADING } },
    { text: "M",     options: { fontSize: 48,  color: C.mute, fontFace: FONT_HEADING } },
  ], {
    x: lX, y: 5.2, w: 6.5, h: 2.0,
    valign: "top", margin: 0,
  });

  // Breakdown rows
  const breakdown = [
    { label: "Supply absorption drag",       val: "\u22121.8%" },
    { label: "Rate-normalization lift",      val: "+7.4%" },
    { label: "Income growth pass-through",   val: "+11.2%" },
    { label: "Rent-to-own parity shift",     val: "+5.1%" },
  ];
  const bY0 = 8.2;
  const bRH = 0.55;
  for (let i = 0; i < breakdown.length; i++) {
    const y = bY0 + i * bRH;
    // Top rule
    s.addShape(pres.shapes.LINE, {
      x: lX, y: y, w: 7.5, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
    s.addText(breakdown[i].label, {
      x: lX, y: y + 0.1, w: 5, h: 0.4,
      fontFace: FONT_BODY, fontSize: 12, color: C.body, margin: 0,
    });
    s.addText(breakdown[i].val, {
      x: lX + 5, y: y + 0.1, w: 2.5, h: 0.4,
      fontFace: FONT_HEADING, fontSize: 14, color: C.ink,
      align: "right", margin: 0,
    });
  }

  // Right: Embedded chart image (verbatim)
  try {
    s.addImage({
      path: path.join(__dirname, "assets", "image-6-1.png"),
      x: 9.64, y: 5.19, w: 9.318, h: 6.212,
    });
  } catch (e) { /* optional */ }

  // Legend at bottom-left of chart area
  s.addText([
    { text: "\u2014  Historical median  ", options: { fontSize: 11, color: C.body } },
    { text: "\u00A0\u00A0\u00A0\u00A0\u00A0",                 options: { fontSize: 11, color: C.body } },
    { text: "\u2013 \u2013  Base-case projection",          options: { fontSize: 11, color: C.coral } },
  ], {
    x: 9.64, y: 10.1, w: 9.318, h: 0.35,
    fontFace: FONT_BODY, align: "left", margin: 0,
  });

  addFootnote(s,
    "Base case assumes 30-yr fixed rate decline to 5.5% by YE 2027; Hoboken household income growth of 4.0% CAGR; no recessionary shock. Illustrative.",
    10.55
  );
}

// ============================================================================
// SLIDE 7 — Risk Factors (2x2 grid)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "07 \u00B7 RISK FACTORS", "WHAT COULD BREAK THE THESIS");

  s.addText("Four risks, ranked by conviction.", {
    x: 1.05, y: 1.7, w: W - 2.1, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, margin: 0,
  });

  s.addText(
    "We underwrite each scenario with an explicit probability and a defined mitigant. " +
    "Climate and rate risk dominate; macro-political risk is real but well-compensated.",
    {
      x: 1.05, y: 3.6, w: 12.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Risk cards — 2 rows × 2 cols.
  // Severity indicator in original uses COUNT of hollow dots:
  // 1 dot = HIGH conviction, 2 = MEDIUM, 3 = MEDIUM-LOW. All dots hollow.
  const risks = [
    { tag: "R-1 \u00B7 MARKET",
      title: "Prolonged rate environment",
      body:  "30-yr stays above 6.5% through 2028. Delays owner-occupant re-entry; extends pipeline absorption by 12\u201318 months. Mitigant: longer hold, rent pivot on slow-moving inventory.",
      level: "HIGH", dots: 1 },
    { tag: "R-2 \u00B7 PHYSICAL",
      title: "Flood & climate repricing",
      body:  "FEMA flood-zone revisions and insurance premiums (+180% since 2020 in AE zones) compress values in garden-level and waterfront ground-floor units. Mitigant: avoid sub-BFE inventory; focus on 2nd floor+.",
      level: "HIGH", dots: 1 },
    { tag: "R-3 \u00B7 SUPPLY",
      title: "Pipeline overshoot, 2026\u201327",
      body:  "If 100% of permitted units deliver on schedule, 12-month absorption rises 34%. Prices flat longer. Mitigant: base case already assumes 85% delivery; stress case models 100%.",
      level: "MEDIUM", dots: 2 },
    { tag: "R-4 \u00B7 POLICY",
      title: "NJ property tax & mansion tax",
      body:  "Hoboken effective rate already 1.58%. Statewide millage pressure and a potential mansion-tax threshold drop would weigh on $1M+ trades. Mitigant: concentrate below $1.1M median.",
      level: "MEDIUM-LOW", dots: 3 },
  ];

  const cardW = 8.85, cardH = 2.4;
  const cardGapX = 0.2, cardGapY = 0.5;
  const startX = 1.05, startY = 5.0;

  for (let i = 0; i < risks.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cardW + cardGapX);
    const y = startY + row * (cardH + cardGapY);
    const r = risks[i];

    // Top rule
    s.addShape(pres.shapes.LINE, {
      x: x, y: y, w: cardW, h: 0,
      line: { color: C.rule, width: 0.75 },
    });

    // Tag (left small eyebrow)
    s.addText(r.tag, {
      x: x, y: y + 0.3, w: 1.9, h: 0.35,
      fontFace: FONT_BODY, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
    });

    // Title
    s.addText(r.title, {
      x: x + 2.1, y: y + 0.25, w: cardW - 3.8, h: 0.5,
      fontFace: FONT_HEADING, fontSize: 18, color: C.ink, margin: 0,
    });

    // Body — placed immediately below title
    s.addText(r.body, {
      x: x + 2.1, y: y + 0.7, w: cardW - 3.8, h: cardH - 0.8,
      fontFace: FONT_BODY, fontSize: 11, color: C.body, lineSpacingMultiple: 1.4, margin: 0,
    });

    // Severity meter: render `r.dots` hollow circles (1=HIGH, 2=MED, 3=MED-LOW).
    // All circles are hollow; it's the count that communicates tier.
    const dotsX = x + cardW - 1.85;
    const dotY  = y + 0.3;
    for (let d = 0; d < r.dots; d++) {
      const dx = dotsX + d * 0.26;
      s.addShape(pres.shapes.OVAL, {
        x: dx, y: dotY, w: 0.18, h: 0.18,
        fill: { color: C.bg },
        line: { color: C.ink, width: 0.75 },
      });
    }
    // Severity label
    s.addText(r.level, {
      x: dotsX - 0.3, y: dotY + 0.3, w: 2.1, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: C.mute, charSpacing: 6, margin: 0,
    });
  }
}


// ============================================================================
// SLIDE 8 — Segment Opportunity (scatter plot + target-segment panel)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "08 \u00B7 SEGMENT OPPORTUNITY", "WHERE WE BUY");

  s.addText("Vintage 2BR, 2nd floor+, NW quadrant.", {
    x: 1.05, y: 1.7, w: W - 2.1, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, margin: 0,
  });

  s.addText(
    "Mapping expected 5-yr IRR against competitive intensity isolates a single underpriced pocket \u2014 " +
    "pre-2010 brownstone conversions in the uptown northwest. Everyone else is chasing waterfront glass.",
    {
      x: 1.05, y: 3.5, w: 12.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // ---- Scatter plot (left) ----
  const spX = 1.05, spY = 5.1, spW = 10.8, spH = 4.9;

  // Left & bottom axes
  s.addShape(pres.shapes.LINE, {
    x: spX + 0.2, y: spY, w: 0, h: spH,
    line: { color: C.ink, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: spX + 0.2, y: spY + spH, w: spW - 0.2, h: 0,
    line: { color: C.ink, width: 0.75 },
  });

  // Axis labels. Vertical Y-axis label: build letter-by-letter so it
  // actually stacks vertically (pptxgenjs rotate on a text box doesn't
  // play well with LibreOffice rendering at build time).
  const yLabel = "PROJECTED  5-YR  IRR  \u2191".split("");
  s.addText(yLabel.map(ch => ({ text: ch, options: { breakLine: true } })), {
    x: spX - 0.35, y: spY + 0.4, w: 0.4, h: spH - 0.8,
    fontFace: FONT_BODY, fontSize: 9, color: C.mute, charSpacing: 2,
    align: "center", valign: "top", margin: 0,
  });
  s.addText("COMPETITIVE INTENSITY \u2192", {
    x: spX + spW / 2 - 2, y: spY + spH + 0.3, w: 4, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: C.mute, charSpacing: 5,
    align: "center", margin: 0,
  });

  // Scatter data points (x% on intensity, y% on IRR)
  // Positioned to match original layout (relative coords 0-1 mapped to plot area)
  const pts = [
    { label: "Vintage brownstone 2BR", sub: "12\u201314% IRR \u00B7 low competition",  relX: 0.07, relY: 0.22 },
    { label: "Waterfront new-build 1BR", sub: "9% IRR \u00B7 high comp",                relX: 0.47, relY: 0.10 },
    { label: "Midtown vintage 1BR",     sub: "10% IRR \u00B7 medium comp",              relX: 0.30, relY: 0.32 },
    { label: "Uptown new-build studio", sub: "7% IRR \u00B7 thin buyer pool",           relX: 0.18, relY: 0.55 },
    { label: "Luxury tower 3BR+",       sub: "6% IRR \u00B7 saturated",                 relX: 0.58, relY: 0.62 },
  ];

  const plotX = spX + 0.2;
  const plotW_ = spW - 0.2;
  const plotY = spY;
  const plotH_ = spH;

  for (const p of pts) {
    const cx = plotX + p.relX * plotW_;
    const cy = plotY + p.relY * plotH_;
    // Dot
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.09, y: cy - 0.09, w: 0.18, h: 0.18,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
    // Label (positioned to right/below the dot)
    s.addText(p.label, {
      x: cx + 0.15, y: cy - 0.05, w: 3.2, h: 0.35,
      fontFace: FONT_HEADING, fontSize: 13, color: C.ink, margin: 0,
    });
    s.addText(p.sub, {
      x: cx + 0.15, y: cy + 0.3, w: 3.2, h: 0.3,
      fontFace: FONT_BODY, fontSize: 10, color: C.mute, margin: 0,
    });
  }

  // ---- Right panel: target segment ----
  const pX = 12.3, pY = 5.1, pW = 6.7;

  s.addText("TARGET SEGMENT", {
    x: pX, y: pY, w: pW, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6, margin: 0,
  });

  s.addText([
    { text: "The ",                options: { fontFace: FONT_HEADING, color: C.ink } },
    { text: "vintage",             options: { italic: true, fontFace: FONT_SERIF, color: C.ink } },
    { text: " northwest trade.",   options: { fontFace: FONT_HEADING, color: C.ink } },
  ], {
    x: pX, y: pY + 0.4, w: pW, h: 1.1,
    fontSize: 32, valign: "top", margin: 0,
  });

  s.addText(
    "Pre-2010 brownstone conversions, 2BR/2BA, 1,000\u20131,400 sq ft, 2nd floor or higher, NW of Washington & 9th. " +
    "Trades 18% below new-build PSF at acquisition; expected to compress spread by 2029.",
    {
      x: pX, y: pY + 1.7, w: pW, h: 1.4,
      fontFace: FONT_BODY, fontSize: 12, color: C.body, lineSpacingMultiple: 1.4, margin: 0,
    }
  );

  // Divider
  s.addShape(pres.shapes.LINE, {
    x: pX, y: pY + 3.1, w: pW, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  // 2x2 stat grid
  const stats = [
    { v: "$685K", c: "TARGET ENTRY \u00B7 BLENDED" },
    { v: "12.4%", c: "BASE-CASE NET IRR" },
    { v: "5.2\u00D7", c: "AVG. QUALIFIED BUYERS / UNIT" },
    { v: "42",   c: "TARGET UNITS \u00B7 24 MO DEPLOYMENT" },
  ];
  const cellW = pW / 2;
  for (let i = 0; i < stats.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = pX + col * cellW;
    const y = pY + 3.3 + row * 0.95;
    s.addText(stats[i].v, {
      x: x, y: y, w: cellW - 0.2, h: 0.55,
      fontFace: FONT_HEADING, fontSize: 26, color: C.ink, margin: 0,
    });
    // Caption — constrain width so left/right cell captions never bleed
    s.addText(stats[i].c, {
      x: x, y: y + 0.55, w: cellW - 0.2, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: C.mute, charSpacing: 5, margin: 0,
    });
  }
}

// ============================================================================
// SLIDE 9 — 5-Year Projection (scenario fan, embedded chart PNG)
// ============================================================================
{
  const s = pres.addSlide();
  bg(s);
  addHeader(s, "09 \u00B7 5-YEAR PROJECTION", "SCENARIO FAN \u00B7 2026\u20132031");

  s.addText("Three paths, one conclusion.", {
    x: 1.05, y: 1.7, w: W - 2.1, h: 1.1,
    fontFace: FONT_HEADING, fontSize: 54, color: C.ink, margin: 0,
  });

  s.addText(
    "Across bear, base, and bull cases, Hoboken condo returns outperform the tri-state index. " +
    "The bear case is flat, not negative. Asymmetric upside justifies the position.",
    {
      x: 1.05, y: 3.6, w: 12.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 15, color: C.body, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Embedded fan chart (covers most of the lower half)
  try {
    s.addImage({
      path: path.join(__dirname, "assets", "image-9-1.png"),
      x: 1.05, y: 5.32, w: 17.9, h: 5.49,
    });
  } catch (e) { /* optional */ }

  // Legend below
  const legY = 10.35;
  // Bull
  s.addShape(pres.shapes.LINE, {
    x: 9.0, y: legY + 0.18, w: 0.55, h: 0,
    line: { color: C.coral, width: 2 },
  });
  s.addText("Bull \u00B7 rate drop to 5.0%, income +5%", {
    x: 9.65, y: legY, w: 3.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });
  // Base
  s.addShape(pres.shapes.LINE, {
    x: 12.5, y: legY + 0.18, w: 0.55, h: 0,
    line: { color: C.ink, width: 2.5 },
  });
  s.addText("Base \u00B7 rate to 5.5%, income +4%", {
    x: 13.15, y: legY, w: 3.2, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });
  // Bear
  s.addShape(pres.shapes.LINE, {
    x: 15.9, y: legY + 0.18, w: 0.55, h: 0,
    line: { color: C.mute, width: 1.5, dashType: "dash" },
  });
  s.addText("Bear \u00B7 rate sticky 6.5%, income +2.5%", {
    x: 16.55, y: legY, w: 3.5, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.body, margin: 0,
  });

  addFootnote(s,
    "Cumulative % change in median 2BR condo price vs. YE 2025. Illustrative modeling; not a forecast of actual market performance.",
    10.9
  );
}

// ============================================================================
// SLIDE 10 — The Ask (dark background)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  // Header (inverted colors)
  s.addText("10 \u00B7 THE ASK", {
    x: 1.05, y: 0.78, w: 10, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6, margin: 0,
  });
  s.addText("MILE SQUARE PARTNERS \u00B7 FUND IV", {
    x: 9, y: 0.78, w: 9.95, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6,
    align: "right", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 1.05, y: 1.25, w: W - 2.1, h: 0,
    line: { color: "4A453E", width: 0.5 },
  });

  // Left column
  s.addText("CLOSING \u00B7 Q3 2026", {
    x: 1.05, y: 1.85, w: 10, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6, margin: 0,
  });

  s.addText([
    { text: "$40M in the ",    options: { bold: false, fontFace: FONT_HEADING, color: C.bg } },
    { text: "mile ",           options: { italic: true, fontFace: FONT_SERIF, color: C.mute } },
    { text: "square.",         options: { italic: true, fontFace: FONT_SERIF, color: C.mute } },
  ], {
    x: 1.05, y: 2.3, w: 10, h: 3.5,
    fontSize: 84, valign: "top", margin: 0,
  });

  s.addText(
    "A concentrated, 24-month deployment into Hoboken's most mispriced condo segment. " +
    "First close targeted for June; final close September 2026.",
    {
      x: 1.05, y: 5.9, w: 8, h: 1.3,
      fontFace: FONT_BODY, fontSize: 15, color: C.bg, lineSpacingMultiple: 1.35, margin: 0,
    }
  );

  // Contact info at bottom-left
  s.addText(
    "Sasha Reyes \u00B7 Managing Partner \u00B7 sasha@milesq.capital   Data room \u00B7 milesq.capital/dataroom",
    {
      x: 1.05, y: 10.15, w: 13, h: 0.4,
      fontFace: FONT_BODY, fontSize: 12, color: C.bg, margin: 0,
    }
  );

  // Right column: fund terms table (8 rows)
  const terms = [
    { l: "FUND SIZE",          v: "$40M", u: "target" },
    { l: "HOLD PERIOD",        v: "5 yrs", u: "+ 2 \u00D7 1-yr ext." },
    { l: "TARGET NET IRR",     v: "12\u201314%", u: "" },
    { l: "TARGET MOIC",        v: "1.7\u00D7", u: "" },
    { l: "PREFERRED RETURN",   v: "8%", u: "pref." },
    { l: "MINIMUM COMMITMENT", v: "$500K", u: "" },
    { l: "MANAGEMENT FEE",     v: "1.5%", u: "/ committed" },
    { l: "CARRY",              v: "20%", u: "over pref." },
  ];
  const tX = 11.1, tY0 = 1.85, tRH = 0.95;
  const tW = W - tX - 1.05;

  for (let i = 0; i < terms.length; i++) {
    const y = tY0 + i * tRH;
    // Top rule
    s.addShape(pres.shapes.LINE, {
      x: tX, y: y, w: tW, h: 0,
      line: { color: "4A453E", width: 0.5 },
    });
    // Label
    s.addText(terms[i].l, {
      x: tX, y: y + 0.22, w: 3.5, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11, color: C.mute, charSpacing: 6, margin: 0,
    });
    // Value + unit (right side)
    s.addText([
      { text: terms[i].v, options: { fontSize: 22, color: C.bg, fontFace: FONT_HEADING } },
      { text: terms[i].u ? "  " + terms[i].u : "", options: { fontSize: 11, color: C.mute, fontFace: FONT_BODY } },
    ], {
      x: tX + 3.5, y: y + 0.12, w: tW - 3.5, h: 0.65,
      align: "left", valign: "top", margin: 0,
    });
  }
  // Bottom rule under final row
  s.addShape(pres.shapes.LINE, {
    x: tX, y: tY0 + terms.length * tRH, w: tW, h: 0,
    line: { color: "4A453E", width: 0.5 },
  });

  // Bottom disclaimer
  s.addText(
    "Confidential. For discussion purposes only. Not an offer to sell or solicitation to buy securities. All figures illustrative.",
    {
      x: 1.05, y: 10.75, w: W - 2.1, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: C.mute, margin: 0,
    }
  );
}

// --- Write the deck ---------------------------------------------------------
pres.writeFile({ fileName: "Hoboken_Real_Este_Projection.pptx" })
  .then(fn => console.log("Wrote:", fn))
  .catch(err => { console.error("ERROR:", err); process.exit(1); });
