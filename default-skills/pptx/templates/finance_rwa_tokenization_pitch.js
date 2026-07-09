/**
 * build.js — Recreates "Real World Asset Tokenization.pptx"
 * Point Break Partners · Private Briefing · April 2026
 *
 * Usage:
 *   npm install pptxgenjs
 *   node build.js
 *
 * The ./media/ folder (containing image-*.png files) must sit next to this script.
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.author = "Point Break Partners";
pres.title = "Real World Asset Tokenization";
pres.subject = "Private Briefing · April 2026";
pres.company = "Point Break Partners";

// Custom 20" × 11.25" (16:9) layout — matches original file
pres.defineLayout({ name: "PBP_20x1125", width: 20, height: 11.25 });
pres.layout = "PBP_20x1125";

// ---------------------------------------------------------------------------
// Brand palette (pulled from original file)
// ---------------------------------------------------------------------------
const C = {
  navy:        "0A1F44",
  inkBlack:    "0B1220",
  gold:        "B08D3A",
  goldLight:   "D7B46A",
  goldDark:    "7A5F1F",
  cream:       "F5F1EA",
  creamAlt:    "F1F1E8",
  paperWhite:  "FFFFFF",
  slate:       "5B6B85",
  slateDeep:   "1E3A6B",
  rule:        "C9D2E3",
  ruleLight:   "D7DFEF",
  muted:       "8A96AE",
  navySoft:    "8FA4CC",
  iceBlue:     "B8C6E0",
  iceBlue2:    "C8D3EA",
};

const F = { header: "Georgia", body: "Arial", mono: "Courier New" };

const MEDIA = (name) => path.join(__dirname, "media", name);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const text = (slide, str, opts) =>
  slide.addText(str, Object.assign({ margin: 0, fontFace: F.body }, opts));

const rect = (slide, opts) =>
  slide.addShape(pres.shapes.RECTANGLE, opts);

/** Header strip: left "POINT BREAK PARTNERS", gold square dot, right section name, hairline rule under */
function drawHeader(slide, { sectionRoman, sectionName, onDark = false }) {
  const labelColor = onDark ? C.navySoft : C.slate;
  const ruleColor = onDark ? C.paperWhite : C.rule;
  rect(slide, { x: 1.04, y: 0.66, w: 0.10, h: 0.10, fill: { color: C.gold }, line: { type: "none" } });
  text(slide, "POINT BREAK PARTNERS", {
    x: 1.29, y: 0.58, w: 4.5, h: 0.29,
    fontSize: 15, color: labelColor, charSpacing: 3, bold: false, fontFace: F.body,
  });
  const sectionText = `${sectionRoman} · ${sectionName}`;
  text(slide, sectionText, {
    x: 11.5, y: 0.58, w: 7.54, h: 0.29,
    fontSize: 15, color: labelColor, charSpacing: 3, align: "right", fontFace: F.body,
  });
  rect(slide, { x: 1.04, y: 1.06, w: 17.92, h: 0.01, fill: { color: ruleColor }, line: { type: "none" } });
}

/** Eyebrow + editorial pull-quote title block used on slides 2–8.
 *  `headlineRuns` is an array of { text, italic?, accent? } where accent = gold color. */
function drawEyebrowAndHeadline(slide, { eyebrow, headlineRuns, onDark = false, size = 57, height = 1.69 }) {
  text(slide, eyebrow, {
    x: 1.04, y: 1.67, w: 18.45, h: 0.31,
    fontSize: 16.5, bold: true, color: C.gold, charSpacing: 4, fontFace: F.body,
  });
  const baseColor = onDark ? C.paperWhite : C.inkBlack;
  const accentColor = onDark ? C.goldLight : C.gold;
  const runs = headlineRuns.map((r) => ({
    text: r.text,
    options: {
      fontSize: size,
      italic: !!r.italic,
      color: r.accent ? accentColor : baseColor,
      fontFace: F.header,
    },
  }));
  slide.addText(runs, {
    x: 1.04, y: 2.15, w: 16.09, h: height,
    valign: "top", margin: 0,
  });
}

/** Footer: "POINT BREAK PARTNERS · PRIVATE BRIEFING" left, "NN / 08" right */
function drawFooter(slide, pageNum, { onDark = false } = {}) {
  const color = onDark ? C.navySoft : C.slate;
  text(slide, "POINT BREAK PARTNERS · PRIVATE BRIEFING", {
    x: 1.04, y: 10.53, w: 10, h: 0.26,
    fontSize: 13.5, color, charSpacing: 2, fontFace: F.body,
  });
  const pageStr = String(pageNum).padStart(2, "0") + " / 08";
  text(slide, pageStr, {
    x: 15.04, y: 10.53, w: 4, h: 0.26,
    fontSize: 13.5, color, charSpacing: 2, align: "right", fontFace: F.body,
  });
}

// ===========================================================================
// SLIDE 1 — TITLE
// ===========================================================================
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Atmospheric horizon/hex graphic spanning the top band
  s.addImage({ path: MEDIA("image-1-1.png"), x: 1.04, y: 0.83, w: 17.92, h: 2.46 });

  // Small white square + eyebrow "POINT BREAK PARTNERS"
  rect(s, { x: 1.04, y: 3.29, w: 0.48, h: 0.48, fill: { color: C.paperWhite }, line: { type: "none" } });
  text(s, "POINT BREAK PARTNERS", {
    x: 1.69, y: 3.39, w: 6, h: 0.31,
    fontSize: 16.5, bold: true, color: C.paperWhite, charSpacing: 4, fontFace: F.body,
  });

  // Dateline
  text(s, "PRIVATE BRIEFING · APRIL 2026", {
    x: 1.04, y: 3.77, w: 18.45, h: 0.34,
    fontSize: 18, bold: true, color: C.goldLight, charSpacing: 6, fontFace: F.body,
  });

  // Main title — large italic Georgia, two lines (line-break after "Asset")
  s.addText(
    [
      { text: "Real World Asset", options: { breakLine: true } },
      { text: "Tokenization" },
    ],
    {
      x: 1.04, y: 4.40, w: 18.45, h: 3.46,
      fontSize: 114, italic: true, color: C.goldLight,
      fontFace: F.header, valign: "top", margin: 0,
    }
  );

  // Sub-headline
  text(s,
    "Unlocking UK pension capital for the next generation of private-markets infrastructure.",
    {
      x: 1.04, y: 8.51, w: 14, h: 0.97,
      fontSize: 24, italic: true, color: C.ruleLight,
      fontFace: F.header, valign: "top",
    }
  );

  // Divider rule above metadata row
  rect(s, { x: 1.04, y: 9.45, w: 17.92, h: 0.01, fill: { color: C.paperWhite }, line: { type: "none" } });

  // Metadata triplet
  const metaRow = [
    { label: "PREPARED FOR",  value: "UK Pension Trustees",  x: 1.04 },
    { label: "PRESENTED BY",  value: "Point Break Partners", x: 4.55 },
    { label: "DURATION",      value: "8 minutes",            x: 8.03 },
  ];
  metaRow.forEach(({ label, value, x }) => {
    text(s, label, {
      x, y: 9.79, w: 3, h: 0.27,
      fontSize: 15, color: C.iceBlue, charSpacing: 4, fontFace: F.body,
    });
    text(s, value, {
      x, y: 10.11, w: 3.5, h: 0.34,
      fontSize: 18, color: C.paperWhite, fontFace: F.body,
    });
  });
}

// ===========================================================================
// SLIDE 2 — THE OPPORTUNITY
// ===========================================================================
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: C.paperWhite };
  drawHeader(s, { sectionRoman: "I", sectionName: "THE OPPORTUNITY" });
  drawEyebrowAndHeadline(s, {
    eyebrow: "THE OPPORTUNITY",
    headlineRuns: [
      { text: "A market forming at " },
      { text: "50× scale", italic: true, accent: true },
      { text: " on rails the UK cannot afford to miss." },
    ],
  });

  // Chart image on the left half
  s.addImage({ path: MEDIA("image-2-1.png"), x: 1.04, y: 4.42, w: 8.33, h: 5.42 });

  // Vertical separator rule between chart and stats column
  rect(s, { x: 10.21, y: 4.25, w: 0.01, h: 5.75, fill: { color: C.rule }, line: { type: "none" } });

  // Big stat — "$18.9 T" with "2033 PROJECTION" label
  text(s, "2033 PROJECTION", {
    x: 10.97, y: 4.42, w: 8.23, h: 0.24,
    fontSize: 11.25, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body,
  });
  // Two-size: "$18.9" big navy + "T" smaller gold
  s.addText(
    [
      { text: "$18.9 ", options: { fontSize: 110, color: C.navy,  fontFace: F.header } },
      { text: "T",      options: { fontSize: 72,  color: C.gold,  fontFace: F.header } },
    ],
    { x: 10.97, y: 4.61, w: 8.23, h: 2.10, valign: "top", margin: 0 }
  );

  // Supporting paragraph
  text(s,
    "The UK's £3T pension system is chronically under-allocated to productive private assets. Tokenization reconciles fiduciary constraints with access.",
    {
      x: 10.97, y: 6.89, w: 6.22, h: 1.4,
      fontSize: 16.5, bold: true, color: C.inkBlack, fontFace: F.body, valign: "top",
    }
  );

  // Horizontal rule before the two sub-stats
  rect(s, { x: 10.97, y: 8.29, w: 7.99, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  // Vertical rule between the two sub-stats
  rect(s, { x: 14.95, y: 8.30, w: 0.01, h: 1.53, fill: { color: C.rule }, line: { type: "none" } });

  // Sub-stat left: ON-CHAIN TODAY $24B
  text(s, "ON-CHAIN TODAY", {
    x: 10.97, y: 8.55, w: 3.80, h: 0.24,
    fontSize: 11.25, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body,
  });
  s.addText(
    [
      { text: "$24 ", options: { fontSize: 34.5, color: C.navy, fontFace: F.header } },
      { text: "B",    options: { fontSize: 18,   color: C.gold, fontFace: F.header } },
    ],
    { x: 10.97, y: 8.83, w: 3.80, h: 0.58, valign: "middle", margin: 0 }
  );
  text(s, "RWA.xyz · April 2026", {
    x: 10.97, y: 9.42, w: 3.80, h: 0.21,
    fontSize: 10.5, italic: true, color: C.muted, fontFace: F.body,
  });

  // Sub-stat right: UK DC PENSION AUM £800B
  text(s, "UK DC PENSION AUM", {
    x: 15.26, y: 8.55, w: 3.51, h: 0.24,
    fontSize: 11.25, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body,
  });
  s.addText(
    [
      { text: "£800 ", options: { fontSize: 34.5, color: C.navy, fontFace: F.header } },
      { text: "B",     options: { fontSize: 18,   color: C.gold, fontFace: F.header } },
    ],
    { x: 15.26, y: 8.83, w: 3.51, h: 0.58, valign: "middle", margin: 0 }
  );
  text(s, "The Pensions Regulator · 2025", {
    x: 15.26, y: 9.42, w: 3.51, h: 0.21,
    fontSize: 10.5, italic: true, color: C.muted, fontFace: F.body,
  });

  drawFooter(s, 2);
}

// ===========================================================================
// SLIDE 3 — DEFINITION (three-column "The wrapper / rail / unlock")
// ===========================================================================
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  drawHeader(s, { sectionRoman: "II", sectionName: "DEFINITION" });
  drawEyebrowAndHeadline(s, {
    eyebrow: "WHAT TOKENIZATION IS",
    headlineRuns: [
      { text: "A " },
      { text: "legal wrapper", italic: true, accent: true },
      { text: " on programmable rails — not a new asset class." },
    ],
  });

  // White content panel
  rect(s, { x: 1.04, y: 4.38, w: 17.92, h: 4.54, fill: { color: C.paperWhite }, line: { type: "none" } });
  // Top and bottom rules on the panel
  rect(s, { x: 1.04, y: 4.38, w: 17.92, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 1.04, y: 8.91, w: 17.92, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  // Vertical column dividers
  rect(s, { x: 7.00, y: 4.39, w: 0.01, h: 4.52, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 12.98, y: 4.39, w: 0.01, h: 4.52, fill: { color: C.rule }, line: { type: "none" } });

  const cols = [
    {
      num: "01", x: 1.50, xNum: 6.30, icon: "image-3-1.png",
      title: "The wrapper",
      body: "A digital security, issued under UK and EU law, representing beneficial ownership of a real asset — a loan, a property, a fund unit, a tonne of gold.",
      bodyH: 1.07,
    },
    {
      num: "02", x: 7.47, xNum: 12.27, icon: "image-3-2.png",
      title: "The rail",
      body: "A permissioned or public blockchain that records ownership, transfers, and lifecycle events — replacing the reconciliation layer between custodian, TA, and registrar.",
      bodyH: 1.42,
    },
    {
      num: "03", x: 13.44, xNum: 18.25, icon: "image-3-3.png",
      title: "The unlock",
      body: "Fractional units, atomic settlement, and programmable compliance — enabling a £500 allocation where a £5M minimum stood before.",
      bodyH: 1.07,
    },
  ];

  cols.forEach(({ num, x, xNum, icon, title, body, bodyH }) => {
    s.addImage({ path: MEDIA(icon), x: x, y: 4.84, w: 0.92, h: 0.92 });
    text(s, num, {
      x: xNum, y: 4.84, w: 0.33, h: 0.23,
      fontSize: 12, color: C.gold, fontFace: F.mono, charSpacing: 2,
    });
    text(s, title, {
      x, y: 5.97, w: 5.21, h: 0.55,
      fontSize: 27, color: C.navy, fontFace: F.header,
    });
    text(s, body, {
      x, y: 6.69, w: 5.21, h: bodyH,
      fontSize: 16.5, color: C.inkBlack, fontFace: F.body, valign: "top",
    });
  });

  // "NOT:" row at bottom
  text(s, "NOT:", {
    x: 1.04, y: 9.54, w: 0.63, h: 0.26,
    fontSize: 13.5, bold: true, color: C.navy, charSpacing: 3, fontFace: F.body,
  });
  const nots = [
    { t: "✕ CRYPTOCURRENCY",         x: 2.05,  w: 3.10 },
    { t: "✕ SPECULATION",            x: 5.30,  w: 2.40 },
    { t: "✕ A REGULATORY WORKAROUND",x: 7.80,  w: 4.40 },
    { t: "✕ A NEW ASSET CLASS",      x: 12.30, w: 3.30 },
  ];
  nots.forEach(({ t, x, w }) => {
    text(s, t, {
      x, y: 9.52, w, h: 0.29,
      fontSize: 13.5, color: C.slate, charSpacing: 3, fontFace: F.body,
    });
  });

  drawFooter(s, 3);
}

// ===========================================================================
// SLIDE 4 — END-TO-END PROCESS (5-stage stages row + timeline)
// ===========================================================================
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: C.paperWhite };
  drawHeader(s, { sectionRoman: "III", sectionName: "END-TO-END PROCESS" });
  drawEyebrowAndHeadline(s, {
    eyebrow: "END-TO-END PROCESS",
    headlineRuns: [
      { text: "Five stages from asset to investor — each newly " },
      { text: "programmable", italic: true, accent: true },
      { text: "." },
    ],
  });

  const stages = [
    {
      x: 1.04, stage: "STAGE 01", title: "Origination",
      body: "Asset sourced, underwritten, held in regulated SPV or bankruptcy-remote vehicle.",
      actors: "Originator · Counsel · Trustee",
      unlock: "Pre-structured pipeline; lower legal cost per issuance.",
      timeline: "WEEKS 0 – 6", accent: false, bodyH: 0.81, actorY: 6.71,
    },
    {
      x: 4.67, stage: "STAGE 02", title: "Issuance",
      body: "Security structured; smart contract deployed; KYC and transfer rules hard-coded.",
      actors: "Issuer · Paying Agent · Platform",
      unlock: "Days, not months; reduced registrar fees.",
      timeline: "WEEKS 6 – 8", accent: false, bodyH: 0.81, actorY: 6.71,
    },
    {
      x: 8.31, stage: "STAGE 03", title: "Distribution",
      body: "Placement to pension funds via FCA-regulated platform and qualified custodians.",
      actors: "Distributor · Custodian · TA",
      unlock: "Fractional minimums; embedded eligibility.",
      timeline: "ONGOING", accent: false, bodyH: 0.81, actorY: 6.71,
    },
    {
      x: 11.94, stage: "STAGE 04", title: "Servicing",
      body: "Automated NAV, coupon, corporate action and reporting via oracle feeds.",
      actors: "Servicer · Oracle · Auditor",
      unlock: "Real-time transparency; no reconciliation breaks.",
      timeline: "LIFECYCLE", accent: false, bodyH: 0.56, actorY: 6.45,
    },
    {
      x: 15.57, stage: "STAGE 05", title: "Secondary",
      body: "24/7 peer-to-peer or matched-book liquidity with atomic T+0 settlement.",
      actors: "Venue · Market Maker · Clearing",
      unlock: "Price discovery in illiquid markets; NAV exits.",
      timeline: "T + 0, 24/7", accent: true, bodyH: 0.56, actorY: 6.45,
    },
  ];

  stages.forEach((st) => {
    const bandColor = st.accent ? C.gold : C.navy;
    const fgOnBand = st.accent ? C.navy : C.paperWhite;
    const stageColor = st.accent ? C.navy : C.goldLight;

    // Header band
    rect(s, { x: st.x, y: 4.29, w: 3.38, h: 1.10, fill: { color: bandColor }, line: { type: "none" } });
    text(s, st.stage, {
      x: st.x + 0.25, y: 4.52, w: 2.97, h: 0.26,
      fontSize: 12, color: stageColor, fontFace: F.mono, charSpacing: 3,
    });
    text(s, st.title, {
      x: st.x + 0.25, y: 4.80, w: 2.97, h: 0.39,
      fontSize: 22.5, color: fgOnBand, fontFace: F.header,
    });

    // Body
    text(s, st.body, {
      x: st.x + 0.04, y: 5.79, w: 3.40, h: st.bodyH,
      fontSize: 12.75, color: C.inkBlack, fontFace: F.body, valign: "top",
    });
    // Actors line
    text(s, st.actors, {
      x: st.x + 0.04, y: st.actorY, w: 3.40, h: 0.22,
      fontSize: 11.25, italic: true, color: C.slate, fontFace: F.body,
    });
    // UNLOCK label + text
    text(s, "UNLOCK", {
      x: st.x + 0.04, y: st.actorY + 0.32, w: 3.40, h: 0.21,
      fontSize: 9.75, bold: true, color: C.slate, charSpacing: 3, fontFace: F.body,
    });
    text(s, st.unlock, {
      x: st.x + 0.04, y: st.actorY + 0.63, w: 3.40, h: 0.52,
      fontSize: 12, color: C.navy, fontFace: F.body, valign: "top",
    });
  });

  // Bottom rule + timeline labels
  rect(s, { x: 1.04, y: 8.33, w: 17.92, h: 0.02, fill: { color: C.navy }, line: { type: "none" } });
  stages.forEach((st) => {
    text(s, st.timeline, {
      x: st.x, y: 8.53, w: 3.48, h: 0.26,
      fontSize: 12, color: C.navy, fontFace: F.mono, charSpacing: 3,
    });
  });

  drawFooter(s, 4);
}

// ===========================================================================
// SLIDE 5 — CASE STUDY (BlackRock BUIDL)
// ===========================================================================
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  drawHeader(s, { sectionRoman: "IV", sectionName: "CASE STUDY" });
  // Headline (using 36pt per original) with italic gold "BUIDL" accent
  text(s, "CASE STUDY", {
    x: 1.04, y: 1.67, w: 18.45, h: 0.31,
    fontSize: 16.5, bold: true, color: C.gold, charSpacing: 4, fontFace: F.body,
  });
  s.addText(
    [
      { text: "BlackRock ",                          options: { fontSize: 36, color: C.navy, fontFace: F.header } },
      { text: "BUIDL",                                options: { fontSize: 36, color: C.gold, italic: true, fontFace: F.header } },
      { text: " — the institutional proof point.",    options: { fontSize: 36, color: C.navy, fontFace: F.header } },
    ],
    { x: 1.04, y: 2.15, w: 18, h: 0.70, valign: "top", margin: 0 }
  );

  // Eyebrow + headline for BUIDL section
  text(s, "NYSE · BUIDL · LAUNCHED MARCH 2024", {
    x: 1.04, y: 4.46, w: 8.38, h: 0.23,
    fontSize: 12, color: C.gold, fontFace: F.mono, charSpacing: 3,
  });
  text(s, "$0 to $2.9B AUM in 25 months.", {
    x: 1.04, y: 4.84, w: 8.38, h: 1.12,
    fontSize: 36, color: C.navy, fontFace: F.header, valign: "top",
  });
  text(s,
    "BlackRock's USD Institutional Digital Liquidity Fund, issued on public blockchain via Securitize, demonstrated that regulated fund structures can operate natively on tokenized rails — same-day subscriptions, 24/7 transfers, daily-accrued yield paid in-kind.",
    {
      x: 1.04, y: 6.40, w: 8.38, h: 1.80,
      fontSize: 16.5, color: C.inkBlack, fontFace: F.body, valign: "top",
    }
  );

  // READ-ACROSS callout (white panel with gold left accent)
  rect(s, { x: 1.04, y: 8.29, w: 8.13, h: 1.34, fill: { color: C.paperWhite }, line: { type: "none" } });
  rect(s, { x: 1.04, y: 8.29, w: 0.04, h: 1.34, fill: { color: C.gold }, line: { type: "none" } });
  text(s, "READ-ACROSS", {
    x: 1.35, y: 8.52, w: 7.78, h: 0.22,
    fontSize: 10.5, bold: true, color: C.gold, charSpacing: 4, fontFace: F.body,
  });
  text(s,
    "The mechanism is proven. What remains is the domestic wrapper — a UK equivalent built for trustee governance and sterling liabilities.",
    {
      x: 1.35, y: 8.78, w: 7.78, h: 0.85,
      fontSize: 15, bold: true, color: C.inkBlack, fontFace: F.body, valign: "top",
    }
  );

  // BUIDL chart (right half)
  s.addImage({ path: MEDIA("image-5-1.png"), x: 10.01, y: 3.44, w: 8.95, h: 5.42 });

  // Two sub-stats below chart: SETTLEMENT T+0 | TRANSFER WINDOW 24/7
  rect(s, { x: 10.01, y: 9.10, w: 8.95, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 10.01, y: 9.10, w: 0.01, h: 1.56, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 14.48, y: 9.11, w: 0.01, h: 1.55, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 18.95, y: 9.11, w: 0.01, h: 1.55, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 10.02, y: 10.65, w: 4.47, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  rect(s, { x: 14.49, y: 10.65, w: 4.47, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });

  text(s, "SETTLEMENT", {
    x: 10.31, y: 9.36, w: 3.99, h: 0.22,
    fontSize: 10.5, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body,
  });
  text(s, "T + 0", {
    x: 10.31, y: 9.64, w: 3.99, h: 0.50,
    fontSize: 33, color: C.navy, fontFace: F.header,
  });
  text(s, "vs. T+1 for traditional MMFs", {
    x: 10.31, y: 10.19, w: 3.99, h: 0.26,
    fontSize: 11.25, color: C.slate, fontFace: F.body,
  });

  text(s, "TRANSFER WINDOW", {
    x: 14.78, y: 9.36, w: 3.99, h: 0.22,
    fontSize: 10.5, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body,
  });
  text(s, "24 / 7", {
    x: 14.78, y: 9.64, w: 3.99, h: 0.50,
    fontSize: 33, color: C.navy, fontFace: F.header,
  });
  text(s, "Incl. weekends & holidays. RWA.xyz, Apr '26.", {
    x: 14.78, y: 10.19, w: 3.99, h: 0.26,
    fontSize: 11.25, color: C.slate, fontFace: F.body,
  });

  drawFooter(s, 5);
}

// ===========================================================================
// SLIDE 6 — SECTOR IMPACT (2 rows × 4 columns grid of sector cards)
// ===========================================================================
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  drawHeader(s, { sectionRoman: "V", sectionName: "SECTOR IMPACT", onDark: true });
  drawEyebrowAndHeadline(s, {
    eyebrow: "IMPACT BY SECTOR",
    headlineRuns: [
      { text: "Seven asset classes — " },
      { text: "$15T", italic: true, accent: true },
      { text: " of tokenized opportunity by 2030." },
    ],
    onDark: true,
  });

  // Card layout — 4 per row, gap ≈ 0.21"
  const card = { w: 4.32, h: 2.65 };
  const sectors = [
    { num: "§1", title: "Private credit",    body: "Fractional access to senior direct-lending pools; automated waterfall payments.", aum: "$2.8 T", score: "STRUCTURAL", filled: 5, total: 5, icon: "image-6-1.png" },
    { num: "§2", title: "Private equity & VC",body: "Secondary liquidity on LP interests; shorter lock-ups for DC schemes.",        aum: "$1.5 T", score: "HIGH",       filled: 4, total: 5, icon: "image-6-2.png" },
    { num: "§3", title: "Real estate",       body: "Fractionalisation of commercial stock; composable REIT-equivalents.",            aum: "$2.4 T", score: "HIGH",       filled: 3, total: 5, icon: "image-6-3.png" },
    { num: "§4", title: "Commodities",       body: "Warehouse-receipt-on-chain; gold, carbon, native ESG integration.",              aum: "$0.9 T", score: "HIGH",       filled: 3, total: 5, icon: "image-6-4.png" },
    { num: "§5", title: "Treasuries & MMFs", body: "24/7 cash management; intraday collateral mobility for LDI.",                    aum: "$4.0 T", score: "STRUCTURAL", filled: 5, total: 5, icon: "image-6-5.png", accent: true },
    { num: "§6", title: "Infrastructure",    body: "Project-level tokens aligned to UK growth mandate — energy, housing, transport.",aum: "$1.1 T", score: "HIGH",       filled: 4, total: 5, icon: "image-6-6.png", accent: true },
    { num: "§7", title: "Trade finance",     body: "Short-duration, yield-accretive exposure to SME supply chains.",                 aum: "$2.3 T", score: "MEDIUM",     filled: 3, total: 5, icon: "image-6-7.png" },
  ];

  // Positions from original
  const positions = [
    { x: 1.04,  y: 4.17 }, { x: 5.57,  y: 4.17 }, { x: 10.10, y: 4.17 }, { x: 14.64, y: 4.17 },
    { x: 1.04,  y: 7.03 }, { x: 5.57,  y: 7.03 }, { x: 10.10, y: 7.03 },
  ];

  positions.forEach((pos, i) => {
    const sec = sectors[i];
    const isGold = !!sec.accent;

    // Card background — accent cards are gold; non-accent have no fill (same as navy bg)
    if (isGold) {
      rect(s, { x: pos.x, y: pos.y, w: card.w, h: card.h, fill: { color: C.gold }, line: { type: "none" } });
    }
    // Subtle outline on every card so they are visually delineated
    rect(s, { x: pos.x, y: pos.y, w: card.w, h: card.h,
      fill: { type: "none" }, line: { color: isGold ? C.gold : C.slateDeep, width: 0.5 } });

    const titleColor = isGold ? C.navy : C.paperWhite;
    const bodyColor  = isGold ? C.navy : C.iceBlue2;
    const aumColor   = isGold ? C.navy : C.gold;
    const hairlineColor = isGold ? C.navy : C.slateDeep;

    // Icon (top-left)
    s.addImage({ path: MEDIA(sec.icon), x: pos.x + 0.28, y: pos.y + 0.28, w: 0.56, h: 0.35 });

    // Section marker (top-right, gold on navy card, navy on gold card)
    text(s, sec.num, {
      x: pos.x + card.w - 0.60, y: pos.y + 0.22, w: 0.50, h: 0.21,
      fontSize: 10.5, color: isGold ? C.navy : C.gold, fontFace: F.mono, charSpacing: 2, align: "right",
    });

    // Title
    text(s, sec.title, {
      x: pos.x + 0.28, y: pos.y + 0.81, w: 3.87, h: 0.45,
      fontSize: 19.5, color: titleColor, fontFace: F.header,
    });
    // Body
    text(s, sec.body, {
      x: pos.x + 0.28, y: pos.y + 1.30, w: 3.87, h: 0.70,
      fontSize: 12, color: bodyColor, fontFace: F.body, valign: "top",
    });

    // Hairline between body and AUM
    rect(s, { x: pos.x + 0.28, y: pos.y + 2.05, w: 3.76, h: 0.01, fill: { color: hairlineColor }, line: { type: "none" } });

    // AUM figure (bottom-left)
    text(s, sec.aum, {
      x: pos.x + 0.28, y: pos.y + 2.15, w: 1.8, h: 0.44,
      fontSize: 18, color: aumColor, fontFace: F.header,
    });

    // Dot rating pips + score label (bottom-right)
    // Label sits to the LEFT of the pips, right-aligned
    const dotY = pos.y + 2.33;
    const dotW = 0.07, dotH = 0.14, dotGap = 0.11;
    const totalDotsW = sec.total * dotGap - (dotGap - dotW);
    const labelRightEdge = pos.x + card.w - 0.28;
    const dotsStartX = labelRightEdge - totalDotsW;
    // Draw pips
    for (let k = 0; k < sec.total; k++) {
      rect(s, {
        x: dotsStartX + k * dotGap, y: dotY, w: dotW, h: dotH,
        fill: { color: k < sec.filled ? (isGold ? C.navy : C.gold) : (isGold ? C.creamAlt : C.rule) },
        line: { type: "none" },
      });
    }
    // Score label — placed BEFORE pips (to the left), right-aligned so it never overlaps
    text(s, sec.score, {
      x: pos.x + 0.28, y: pos.y + 2.28, w: (dotsStartX - pos.x - 0.28 - 0.12), h: 0.22,
      fontSize: 9, color: isGold ? C.navy : C.iceBlue, fontFace: F.mono, charSpacing: 3, align: "right",
    });
  });

  // 8th card — TOTAL ADDRESSABLE (no icon, Σ symbol)
  const tx = 14.64, ty = 7.03;
  rect(s, { x: tx, y: ty, w: card.w, h: card.h, fill: { color: C.gold }, line: { type: "none" } });
  text(s, "Σ", {
    x: tx + card.w - 0.45, y: ty + 0.22, w: 0.30, h: 0.25,
    fontSize: 14, color: C.navy, fontFace: F.mono, align: "right",
  });
  text(s, "TOTAL ADDRESSABLE", {
    x: tx + 0.28, y: ty + 0.36, w: 3.87, h: 0.24,
    fontSize: 11.25, bold: true, color: C.navy, charSpacing: 4, fontFace: F.body,
  });
  s.addText(
    [
      { text: "$15 ", options: { fontSize: 66, color: C.navy,     fontFace: F.header } },
      { text: "T",    options: { fontSize: 30, color: C.goldDark, fontFace: F.header } },
    ],
    { x: tx + 0.28, y: ty + 0.70, w: 3.87, h: 1.05, valign: "middle", margin: 0 }
  );
  rect(s, { x: tx + 0.28, y: ty + 1.77, w: 3.76, h: 0.01, fill: { color: C.navy }, line: { type: "none" } });
  text(s, "Across seven asset classes, UK pension-eligible, by 2030 base case.", {
    x: tx + 0.28, y: ty + 1.95, w: 3.87, h: 0.60,
    fontSize: 11.25, color: C.navy, fontFace: F.body, valign: "top",
  });

  // Sources note
  text(s,
    "Sources: BCG × Ripple 2024, McKinsey Tokenization Report 2024, Citi GPS. 2030 estimates, base-case.",
    {
      x: 1.04, y: 9.82, w: 18.45, h: 0.22,
      fontSize: 11.25, italic: true, color: C.navySoft, fontFace: F.body,
    }
  );

  drawFooter(s, 6, { onDark: true });
}

// ===========================================================================
// SLIDE 7 — COMMERCIAL MODEL (fee table + right-hand £100M example panel)
// ===========================================================================
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  drawHeader(s, { sectionRoman: "VI", sectionName: "COMMERCIAL MODEL" });
  drawEyebrowAndHeadline(s, {
    eyebrow: "COMMERCIAL MODEL",
    headlineRuns: [
      { text: "A " },
      { text: "three-line", italic: true, accent: true },
      { text: " fee stack — aligned to issuer, investor, and lifecycle." },
    ],
  });

  // --- Fee table (left) ---
  // Top & bottom bold rules
  rect(s, { x: 1.04, y: 4.69, w: 9.04, h: 0.01, fill: { color: C.slateDeep }, line: { type: "none" } });
  rect(s, { x: 1.04, y: 4.25, w: 9.04, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });

  // Header row
  text(s, "STREAM", { x: 1.04, y: 4.39, w: 1.96, h: 0.22, fontSize: 10.5, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body });
  text(s, "RATE (BPS SHOWN AS % OF SCALE)", { x: 3.21, y: 4.39, w: 4.20, h: 0.22, fontSize: 10.5, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body });
  text(s, "BASIS", { x: 7.58, y: 4.39, w: 2.58, h: 0.22, fontSize: 10.5, bold: true, color: C.slate, charSpacing: 4, fontFace: F.body });

  // Row builder
  const drawFeeRow = (y, name, barBgFill, barColor, barFrac, barText, barTextColor, basis) => {
    text(s, name, { x: 1.04, y: y + 0.07, w: 1.96, h: 0.42, fontSize: 19.5, color: C.navy, fontFace: F.header });

    // Bar background
    rect(s, { x: 3.21, y, w: 4.08, h: 0.46, fill: { color: barBgFill }, line: { type: "none" } });
    // Filled portion
    if (barFrac > 0) {
      rect(s, { x: 3.21, y, w: 4.08 * barFrac, h: 0.46, fill: { color: barColor }, line: { type: "none" } });
    }
    // Text on bar — if narrow bar, shrink font and wrap
    const narrowBar = barFrac < 0.35;
    text(s, barText, {
      x: 3.35, y: y, w: narrowBar ? (4.08 * barFrac - 0.10) : 3.80, h: 0.46,
      fontSize: narrowBar ? 13 : 16.5, color: barTextColor, fontFace: F.header, valign: "middle",
    });
    // Basis
    text(s, basis, {
      x: 7.58, y: y - 0.01, w: 2.58, h: 0.51,
      fontSize: 12, color: C.slate, fontFace: F.body, valign: "middle",
    });
  };

  drawFeeRow(5.08, "Structuring", C.creamAlt, C.navy,  0.645, "40–60 bps",         C.paperWhite, "One-time, on issuance value. SPV, counsel, deployment.");
  rect(s, { x: 1.04, y: 5.75, w: 9.04, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });

  drawFeeRow(6.14, "Platform",    C.creamAlt, C.gold,  0.297, "15–25 bps",         C.navy,        "Annual, on AUA. Custody, TA, compliance, reporting.");
  rect(s, { x: 1.04, y: 6.81, w: 9.04, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });

  drawFeeRow(7.20, "Secondary",   C.creamAlt, C.navy,  0.245, "5–10 bps",          C.paperWhite, "Per-side on matched-book trades. Shared with LPs.");
  rect(s, { x: 1.04, y: 7.87, w: 9.04, h: 0.01, fill: { color: C.rule }, line: { type: "none" } });
  // Performance row — no bar, just "Nil — pension-aligned" outlined box (matches original)
  text(s, "Performance", { x: 1.04, y: 8.30, w: 1.96, h: 0.42, fontSize: 19.5, color: C.navy, fontFace: F.header });
  rect(s, { x: 3.21, y: 8.26, w: 3.80, h: 0.46, fill: { type: "none" }, line: { color: C.navy, width: 0.75 } });
  text(s, "Nil — pension-aligned", {
    x: 3.35, y: 8.27, w: 3.60, h: 0.46,
    fontSize: 14, color: C.navy, fontFace: F.header, valign: "middle",
  });
  text(s, "Point Break does not participate in asset returns.", {
    x: 7.58, y: 8.25, w: 2.58, h: 0.51,
    fontSize: 12, color: C.slate, fontFace: F.body, valign: "middle",
  });
  rect(s, { x: 1.04, y: 8.93, w: 9.04, h: 0.01, fill: { color: C.slateDeep }, line: { type: "none" } });

  // Callout under fee table
  rect(s, { x: 1.04, y: 9.34, w: 9.04, h: 1.06, fill: { color: C.paperWhite }, line: { type: "none" } });
  s.addImage({ path: MEDIA("image-7-1.png"), x: 1.32, y: 9.62, w: 0.38, h: 0.50 });
  text(s,
    "30–50% lower total cost to pension vs. legacy fund admin (20–40 bps) and private placement (200–300 bps).",
    {
      x: 1.91, y: 9.57, w: 8.12, h: 0.78,
      fontSize: 15, bold: true, color: C.inkBlack, fontFace: F.body, valign: "middle",
    }
  );

  // --- Right panel: £100M mandate illustrative ---
  const px = 10.74, py = 4.25, pw = 8.21, ph = 6.15;
  rect(s, { x: px, y: py, w: pw, h: ph, fill: { color: C.navy }, line: { type: "none" } });
  // Decorative concentric circles in top-right
  s.addImage({ path: MEDIA("image-7-2.png"), x: 15.21, y: 4.25, w: 3.75, h: 3.75 });

  text(s, "ILLUSTRATIVE · £100M MANDATE", {
    x: 11.20, y: 4.71, w: 7.52, h: 0.22,
    fontSize: 10.5, bold: true, color: C.goldLight, charSpacing: 4, fontFace: F.body,
  });
  text(s, "Year-one economics", {
    x: 11.20, y: 4.99, w: 7.52, h: 0.50,
    fontSize: 24, color: C.paperWhite, fontFace: F.header,
  });

  // Three line items
  const items = [
    { y: 5.91, label: "Structuring · 50 bps one-off",   value: "£500,000", valueX: 17.62, valueW: 0.97 },
    { y: 6.52, label: "Platform · 20 bps on £100M AUA", value: "£200,000", valueX: 17.62, valueW: 0.97 },
    { y: 7.14, label: "Secondary · 7 bps · 0.4× turnover", value: "£28,000", valueX: 17.73, valueW: 0.85 },
  ];
  items.forEach((it, i) => {
    text(s, it.label, {
      x: 11.20, y: it.y, w: 4.5, h: 0.27,
      fontSize: 14.25, color: C.ruleLight, fontFace: F.body,
    });
    text(s, it.value, {
      x: it.valueX - 1.0, y: it.y - 0.07, w: 1.97, h: 0.35,
      fontSize: 16.5, color: C.paperWhite, fontFace: F.header, align: "right",
    });
    // Rule under item
    if (i === 0) rect(s, { x: 11.20, y: 6.30, w: 7.30, h: 0.01, fill: { color: C.paperWhite }, line: { type: "none" } });
    if (i === 1) rect(s, { x: 11.20, y: 6.92, w: 7.30, h: 0.01, fill: { color: C.paperWhite }, line: { type: "none" } });
    if (i === 2) rect(s, { x: 11.20, y: 7.53, w: 7.30, h: 0.01, fill: { color: C.paperWhite }, line: { type: "none" } });
  });

  // Gold rule above YEAR-ONE REVENUE
  rect(s, { x: 11.20, y: 7.77, w: 7.30, h: 0.02, fill: { color: C.gold }, line: { type: "none" } });

  text(s, "YEAR-ONE REVENUE", {
    x: 11.20, y: 8.28, w: 4.5, h: 0.25,
    fontSize: 12, bold: true, color: C.goldLight, charSpacing: 4, fontFace: F.body,
  });
  // £728 with smaller "K" trailing — two separate runs, right-aligned as a group
  s.addText(
    [
      { text: "£728", options: { fontSize: 28, bold: true, color: C.goldLight, fontFace: F.header } },
      { text: " K",    options: { fontSize: 14, bold: true, color: C.goldLight, fontFace: F.header } },
    ],
    {
      x: 15.50, y: 8.00, w: 3.20, h: 0.80,
      align: "right", valign: "middle", margin: 0,
    }
  );

  text(s,
    "Steady-state from year two: £228K / yr recurring per £100M, before secondary.",
    {
      x: 11.20, y: 8.97, w: 7.52, h: 0.35,
      fontSize: 12, bold: true, color: C.navySoft, fontFace: F.body,
    }
  );

  drawFooter(s, 7);
}

// ===========================================================================
// SLIDE 8 — NEXT STEPS (3 phase cards + contact/registered footer row)
// ===========================================================================
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  drawHeader(s, { sectionRoman: "VII", sectionName: "NEXT STEPS", onDark: true });

  // Eyebrow
  text(s, "NEXT STEPS", {
    x: 1.04, y: 1.67, w: 18.45, h: 0.31,
    fontSize: 16.5, bold: true, color: C.gold, charSpacing: 4, fontFace: F.body,
  });
  // Headline — smaller (42pt) so it fits on one line above the cards with italic gold accent
  s.addText(
    [
      { text: "From diligence to ",          options: { italic: true, color: C.paperWhite, fontFace: F.header, fontSize: 42 } },
      { text: "first issuance",              options: { italic: true, color: C.goldLight,  fontFace: F.header, fontSize: 42 } },
      { text: " in 90 days.",                options: { italic: true, color: C.paperWhite, fontFace: F.header, fontSize: 42 } },
    ],
    {
      x: 1.04, y: 2.15, w: 18.45, h: 1.10,
      margin: 0, valign: "top",
    }
  );

  // Decorative hexagon graphic top-right (bleeds off top edge)
  s.addImage({ path: MEDIA("image-8-1.png"), x: 12.71, y: 0.00, w: 7.29, h: 7.29 });

  // Three phase cards — cards 1 & 3 are dark (navy with subtle outline); card 2 is gold
  const phases = [
    { x: 1.04,  icon: "image-8-2.png", stage: "01 · Weeks 1–3", title: "Trustee diligence pack",
      body: "Full regulatory, custody and operational risk review, tailored to scheme governance and investment beliefs.",
      tag: "DILIGENCE", accent: false },
    { x: 7.12,  icon: "image-8-3.png", stage: "02 · Weeks 4–8", title: "Pilot mandate",
      body: "£25–50M allocation into a ring-fenced tokenized sleeve: UK infrastructure credit or tokenized gilts.",
      tag: "LAUNCH", accent: true },
    { x: 13.21, icon: "image-8-4.png", stage: "03 · Weeks 9+",  title: "Scale & integrate",
      body: "Roll into LDI and private-markets sleeves; quarterly trustee reporting; expansion across asset classes.",
      tag: "SCALE", accent: false },
  ];

  phases.forEach((p) => {
    if (p.accent) {
      // Gold card
      rect(s, { x: p.x, y: 3.55, w: 5.75, h: 5.02, fill: { color: C.gold }, line: { type: "none" } });
    } else {
      // Dark card — subtle outline to separate from background
      rect(s, { x: p.x, y: 3.55, w: 5.75, h: 5.02, fill: { type: "none" }, line: { color: C.slateDeep, width: 0.75 } });
    }

    const titleColor = p.accent ? C.navy : C.paperWhite;
    const bodyColor  = p.accent ? C.navy : C.iceBlue2;
    const stageColor = p.accent ? C.navy : C.goldLight;
    const tagColor   = p.accent ? C.navy : C.navySoft;
    const ruleColor  = p.accent ? C.navy : C.paperWhite;

    s.addImage({ path: MEDIA(p.icon), x: p.x + 0.43, y: 4.02, w: 0.58, h: 0.58 });

    text(s, p.stage, {
      x: p.x + 0.43, y: 4.77, w: 5.04, h: 0.23,
      fontSize: 12, color: stageColor, fontFace: F.mono, charSpacing: 3,
    });
    text(s, p.title, {
      x: p.x + 0.43, y: 5.13, w: 5.04, h: 0.50,
      fontSize: 25.5, color: titleColor, fontFace: F.header,
    });
    text(s, p.body, {
      x: p.x + 0.43, y: 5.75, w: 5.04, h: 1.60,
      fontSize: 14.25, color: bodyColor, fontFace: F.body, valign: "top",
    });
    // Rule near bottom of card
    rect(s, { x: p.x + 0.43, y: 7.77, w: 4.90, h: 0.01, fill: { color: ruleColor }, line: { type: "none" } });
    text(s, p.tag, {
      x: p.x + 0.43, y: 7.99, w: 5.04, h: 0.24,
      fontSize: 11.25, bold: true, color: tagColor, charSpacing: 4, fontFace: F.body,
    });
  });

  // Full-width rule below cards
  rect(s, { x: 1.04, y: 9.07, w: 17.92, h: 0.01, fill: { color: C.paperWhite }, line: { type: "none" } });

  // Contact row
  text(s, "POINT OF CONTACT", {
    x: 1.04, y: 9.42, w: 4.54, h: 0.22,
    fontSize: 10.5, bold: true, color: C.navySoft, charSpacing: 4, fontFace: F.body,
  });
  text(s, "Investor Relations · Point Break Partners", {
    x: 1.04, y: 9.66, w: 10, h: 0.39,
    fontSize: 18, color: C.paperWhite, fontFace: F.header,
  });

  text(s, "REGISTERED", {
    x: 13.5, y: 9.42, w: 5.46, h: 0.22,
    fontSize: 10.5, bold: true, color: C.navySoft, charSpacing: 4, align: "right", fontFace: F.body,
  });
  text(s, "London · FCA authorised", {
    x: 13.5, y: 9.66, w: 5.46, h: 0.39,
    fontSize: 18, color: C.paperWhite, fontFace: F.header, align: "right",
  });

  drawFooter(s, 8, { onDark: true });
}

// ---------------------------------------------------------------------------
// Build all slides & write file
// ---------------------------------------------------------------------------
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();

pres.writeFile({ fileName: "Real_World_Asset_Tokenization.pptx" })
  .then((name) => console.log(`Wrote ${name}`))
  .catch((e) => { console.error(e); process.exit(1); });
