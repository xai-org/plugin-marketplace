const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title = "EO Briefing — College Sports";

// Palette: Charcoal Minimal + oxblood accent
const BG = "F7F5F0";       // warm off-white
const INK = "1A1A1A";      // primary text
const MUTED = "7A7A7A";    // secondary text
const ACCENT = "7B2D26";   // oxblood
const HAIR = "D9D5CC";     // hairline

const HEAD = "Georgia";
const BODY = "Calibri";

const W = 13.3;
const H = 7.5;
const ML = 0.8;  // left margin
const MR = 0.8;  // right margin
const MT = 0.6;  // top margin

// --- helpers ---
function addBase(slide, { pageNum, footer } = {}) {
  slide.background = { color: BG };
  // small accent square top-left as motif
  slide.addShape(pres.shapes.RECTANGLE, {
    x: ML, y: MT, w: 0.18, h: 0.18,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 }
  });
  // page number
  if (pageNum) {
    slide.addText(String(pageNum).padStart(2, "0"), {
      x: W - 1.0, y: H - 0.5, w: 0.6, h: 0.3,
      fontFace: BODY, fontSize: 10, color: MUTED, align: "right", margin: 0
    });
  }
  // footer (right of page number area, left-aligned at bottom)
  if (footer) {
    slide.addText(footer, {
      x: ML, y: H - 0.5, w: 8, h: 0.3,
      fontFace: BODY, fontSize: 10, color: MUTED, italic: true, margin: 0
    });
  }
}

function addEyebrow(slide, text) {
  slide.addText(text.toUpperCase(), {
    x: ML + 0.35, y: MT - 0.06, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, charSpacing: 3, valign: "middle", margin: 0
  });
}

function addTitle(slide, text, y = 1.1) {
  slide.addText(text, {
    x: ML, y, w: W - ML - MR, h: 0.9,
    fontFace: HEAD, fontSize: 36, color: INK, bold: false, margin: 0
  });
}

// =====================================================
// SLIDE 0 — Title Slide
// =====================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // accent square top-left
  s.addShape(pres.shapes.RECTANGLE, {
    x: ML, y: MT, w: 0.18, h: 0.18,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 }
  });

  // eyebrow
  s.addText("EXECUTIVE BRIEFING", {
    x: ML + 0.35, y: MT - 0.06, w: 8, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, charSpacing: 3, valign: "middle", margin: 0
  });

  // main title
  s.addText("Executive Order on College Sports", {
    x: ML, y: 2.5, w: W - ML - MR, h: 0.95,
    fontFace: HEAD, fontSize: 42, color: INK, align: "center", margin: 0
  });
  s.addText("& Its Implications", {
    x: ML, y: 3.3, w: W - ML - MR, h: 0.95,
    fontFace: HEAD, fontSize: 42, color: ACCENT, align: "center", margin: 0
  });

  // bottom meta
  s.addText("April 2026", {
    x: ML, y: H - 0.8, w: W - ML - MR, h: 0.45,
    fontFace: BODY, fontSize: 18, color: MUTED, italic: true, align: "center", margin: 0
  });
}

// =====================================================
// SLIDE 1 — Title / Bottom Line
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 1 });
  addEyebrow(s, "Overview");

  s.addText("Core Issue", {
    x: ML, y: 1.4, w: W - ML - MR, h: 0.9,
    fontFace: HEAD, fontSize: 40, color: INK, margin: 0
  });

  s.addText([
    { text: "The executive order uses ", options: { color: INK } },
    { text: "federal research funding", options: { color: ACCENT, bold: true } },
    { text: " as leverage to regulate college sports.", options: { color: INK } }
  ], {
    x: ML + 0.5, y: 2.7, w: W - ML - MR, h: 1.0,
    fontFace: HEAD, fontSize: 24, margin: 0
  });

  s.addText("KEY POINTS", {
    x: ML + 0.5, y: 4.3, w: 8, h: 0.5,
    fontFace: HEAD, fontSize: 22, color: MUTED, bold: true, margin: 0
  });

  s.addText([
    { text: "NCAA violations trigger federal \"present responsibility\" review", options: { bullet: true, breakLine: true } },
    { text: "DoD, HHS, and NSF dollars become the enforcement mechanism", options: { bullet: true, breakLine: true } },
    { text: "Effective August 1, 2026 — enforceability uncertain", options: { bullet: true } }
  ], {
    x: ML + 0.6, y: 4.85, w: W - ML - MR - 1.1, h: 2.4,
    fontFace: HEAD, fontSize: 19, color: INK, paraSpaceAfter: 14, margin: 0, valign: "top"
  });

  s.addText("April 2026", {
    x: W - 2.5, y: H - 0.5, w: 1.7, h: 0.3,
    fontFace: BODY, fontSize: 10, color: MUTED, align: "right", margin: 0
  });
}

// =====================================================
// SLIDE 2 — The Mechanism (icon diagram)
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 2 });
  addEyebrow(s, "How it works");
  addTitle(s, "Mechanism");

  // Layout — first circle's left edge at ML+0.5, last circle's right edge symmetric
  const circleD = 1.1;
  const circleR = circleD / 2;
  const cellW = (W - ML - MR) / 4;
  const firstCX = ML + 0.5 + circleR;
  const lastCX = W - MR - 0.5 - circleR;
  const step = (lastCX - firstCX) / 3;
  const centers = [0, 1, 2, 3].map(i => firstCX + step * i);
  const cy = 4.05;

  // Arrows between each pair of circles — native PowerPoint arrow shape
  const arrowGap = 0.18;
  const arrowH = 0.32;
  for (let i = 0; i < centers.length - 1; i++) {
    const x1 = centers[i] + circleR + arrowGap;
    const x2 = centers[i + 1] - circleR - arrowGap;
    s.addShape(pres.shapes.NOTCHED_RIGHT_ARROW, {
      x: x1, y: cy - arrowH / 2, w: x2 - x1, h: arrowH,
      fill: { color: HAIR }, line: { color: HAIR, width: 0 }
    });
  }

  const stations = [
    {
      icon: "/home/assets/deck/icon-violation.png",
      label: [
        { text: "NCAA rule", options: { breakLine: true } },
        { text: "violation" }
      ]
    },
    {
      icon: "/home/assets/deck/icon-review.png",
      label: [
        { text: "\"present responsibility\"", options: { breakLine: true } },
        { text: "review" }
      ]
    },
    {
      icon: "/home/assets/deck/icon-gavel.png",
      label: [
        { text: "Suspension /", options: { breakLine: true } },
        { text: "debarment review" }
      ]
    },
    {
      icon: "/home/assets/deck/icon-dollar.png",
      label: [
        { text: "Research funding", options: { breakLine: true } },
        { text: "at risk" }
      ]
    }
  ];

  const iconSize = 0.7;
  stations.forEach((st, i) => {
    const cx = centers[i];
    // Filled circle
    s.addShape(pres.shapes.OVAL, {
      x: cx - circleR, y: cy - circleR, w: circleD, h: circleD,
      fill: { color: ACCENT }, line: { color: ACCENT, width: 0 }
    });
    // Icon centered in circle
    s.addImage({
      path: st.icon,
      x: cx - iconSize / 2, y: cy - iconSize / 2, w: iconSize, h: iconSize
    });
    // Label below circle
    s.addText(st.label, {
      x: cx - cellW / 2 + 0.15, y: cy + circleR + 0.35, w: cellW - 0.3, h: 1.4,
      fontFace: HEAD, fontSize: 17, color: INK, align: "center", valign: "top", margin: 0, paraSpaceAfter: 2
    });
  });
}

// =====================================================
// SLIDE 3 — Research Funding at Risk
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 3 });
  addEyebrow(s, "Exposure");
  addTitle(s, "Research Funding at Risk");

  // Column geometry
  const colGap = 0.5;
  const colW = (W - ML - MR - 0.5 - colGap) / 2;
  const leftX = ML + 0.5;
  const rightX = ML + 0.5 + colW + colGap;

  // ============ LEFT: Federal share of total research ============
  s.addText("FEDERAL SHARE", {
    x: leftX, y: 2.6, w: colW, h: 0.4,
    fontFace: HEAD, fontSize: 20, color: MUTED, bold: true, margin: 0
  });

  // Big % number
  s.addText("60%", {
    x: leftX, y: 3.0, w: colW, h: 1.4,
    fontFace: HEAD, fontSize: 72, color: ACCENT, margin: 0
  });

  // Horizontal share bar
  const barY = 4.55;
  const barH = 0.3;
  const barW = colW - 0.4;
  // Background (full width, muted)
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: barY, w: barW, h: barH,
    fill: { color: MUTED, transparency: 75 }, line: { color: BG, width: 0 }
  });
  // Filled portion (60%)
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: barY, w: barW * 0.6, h: barH,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 }
  });

  // Total amount under right end of bar
  s.addText("$225M total", {
    x: leftX + barW - 1.5, y: barY + barH + 0.05, w: 1.5, h: 0.35,
    fontFace: HEAD, fontSize: 14, color: MUTED, italic: true, align: "right", margin: 0
  });

  // Agencies list
  s.addText("HHS / NIH  ·  NSF  ·  DoD  ·  Other Federal", {
    x: leftX, y: 5.4, w: colW, h: 0.4,
    fontFace: HEAD, fontSize: 16, color: MUTED, margin: 0
  });

  // ============ RIGHT: Who it supports ============
  s.addText("WHO IT SUPPORTS", {
    x: rightX, y: 2.6, w: colW, h: 0.4,
    fontFace: HEAD, fontSize: 20, color: MUTED, bold: true, margin: 0
  });
  // People icon next to header
  s.addImage({
    path: "/home/assets/deck/icon-people.png",
    x: rightX + 3.15, y: 2.55, w: 0.5, h: 0.5
  });

  const people = [
    { num: "~350",   label: "Faculty principal investigators" },
    { num: "~1,200", label: "Graduate students" },
    { num: "~150",   label: "Postdoctoral researchers" }
  ];

  const peopleStartY = 3.05;
  const peopleRowH = 1.05;
  const iconSize = 0.55;

  people.forEach((p, i) => {
    const y = peopleStartY + i * peopleRowH;
    // Big number
    s.addText(p.num, {
      x: rightX, y: y, w: 2.1, h: 0.85,
      fontFace: HEAD, fontSize: 36, color: INK, margin: 0
    });
    // Label
    s.addText(p.label, {
      x: rightX + 1.9, y: y + 0.18, w: colW - 1.9, h: 0.5,
      fontFace: HEAD, fontSize: 16, color: MUTED, margin: 0
    });
  });
}

// =====================================================
// SLIDE 4 — What Counts as a Violation
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 4 });
  addEyebrow(s, "The four rule categories");
  addTitle(s, "New NCAA Standards");

  const items = [
    { label: "Eligibility",       desc: "Five-year window, no pro returns" },
    { label: "Transfers",         desc: "One immediate, second after degree" },
    { label: "Revenue sharing",   desc: "Women's & Olympic sports protected" },
    { label: "NIL & collectives", desc: "FMV deals only, no pay-for-play" }
  ];

  const startY = 2.7;
  const rowH = 1.0;
  const labelW = 4.0;
  items.forEach((it, i) => {
    const y = startY + i * rowH;
    s.addText(it.label, {
      x: ML + 0.5, y, w: labelW, h: 0.7,
      fontFace: HEAD, fontSize: 24, color: INK, margin: 0
    });
    s.addText(it.desc, {
      x: ML + 0.5 + labelW, y, w: W - ML - MR - 0.5 - labelW, h: 0.7,
      fontFace: HEAD, fontSize: 24, color: MUTED, margin: 0
    });
  });
}

// =====================================================
// SLIDE 5 — The NIL Constraint
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 5 });
  addEyebrow(s, "NIL framework");
  addTitle(s, "NIL Constraint");

  // Column geometry
  const colGap = 0.3;
  const colW = (W - ML - MR - colGap) / 2;
  const leftX = ML + 0.5;
  const rightX = ML + 0.5 + colW + colGap;

  // Protected
  s.addText("Protected", {
    x: leftX, y: 2.5, w: 4.0, h: 0.55,
    fontFace: HEAD, fontSize: 28, color: MUTED, align: "center", margin: 0
  });

  const protectedItems = [
    "Third-party deals at FMV",
    "Endorsements and appearances",
    "Revenue sharing (~$20.5M)"
  ];

  protectedItems.forEach((text, i) => {
    s.addText(text, {
      x: leftX, y: 3.4 + i * 0.8, w: colW, h: 0.55,
      fontFace: HEAD, fontSize: 24, color: INK, margin: 0
    });
  });

  // Prohibited
  s.addText("Prohibited", {
    x: rightX, y: 2.5, w: 4.0, h: 0.55,
    fontFace: HEAD, fontSize: 28, color: ACCENT, align: "center", margin: 0
  });

  const prohibitedItems = [
    "Pay-for-play through collectives",
    "Above-FMV payments for playing",
    "Federal funds to NIL or coaching"
  ];

  prohibitedItems.forEach((text, i) => {
    s.addText(text, {
      x: rightX, y: 3.4 + i * 0.8, w: colW, h: 0.55,
      fontFace: HEAD, fontSize: 24, color: INK, margin: 0
    });
  });
}

// =====================================================
// SLIDE 7 — Legally Vulnerable
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 6 });
  addEyebrow(s, "Legal assessment");
  addTitle(s, "EO Is Legally Vulnerable");

  s.addText([
    { text: "In September 2025, a court blocked the administration from pulling Harvard's funds under a different EO using similar leverage", options: { bullet: true, breakLine: true } },
    { text: "PLACEHOLDER", options: { bullet: true, breakLine: true } },
    { text: "\"Present responsibility\" has never been applied to athletics — courts will scrutinize the stretch", options: { bullet: true } }
  ], {
    x: ML + 0.5, y: 2.7, w: W - ML - MR - 1.0, h: 4.0,
    fontFace: HEAD, fontSize: 22, color: INK, paraSpaceAfter: 32, lineSpacingMultiple: 1.2, margin: 0, valign: "top"
  });
}

// =====================================================
// SLIDE 8 — Where This Is Headed
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 7 });
  addEyebrow(s, "Looking ahead");
  addTitle(s, "EO Pressures Congress to Act");

  // Two bill blocks side by side
  const colGap = 0.4;
  const colW = (W - ML - MR - colGap) / 2;
  const leftX = ML + 0.5;
  const rightX = ML + 0.5 + colW + colGap;
  const blockY = 2.7;

  // SCORE Act
  s.addText("SCORE Act", {
    x: leftX, y: blockY, w: colW, h: 0.6,
    fontFace: HEAD, fontSize: 30, color: INK, margin: 0
  });
  s.addText("House", {
    x: leftX, y: blockY + 0.6, w: colW, h: 0.4,
    fontFace: HEAD, fontSize: 18, color: MUTED, margin: 0
  });
  s.addText([
    { text: "Antitrust protection for the NCAA", options: { bullet: true, breakLine: true } },
    { text: "Athletes classified as non-employees", options: { bullet: true, breakLine: true } },
    { text: "Preempts state NIL laws", options: { bullet: true, breakLine: true } },
    { text: "Passed committee, pulled from floor vote", options: { bullet: true } }
  ], {
    x: leftX + 0.1, y: blockY + 1.2, w: colW - 0.1, h: 2.8,
    fontFace: HEAD, fontSize: 18, color: MUTED, paraSpaceAfter: 8, margin: 0, valign: "top"
  });

  // Cantwell-Schmitt
  s.addText("Cantwell-Schmitt", {
    x: rightX, y: blockY, w: colW, h: 0.6,
    fontFace: HEAD, fontSize: 30, color: INK, margin: 0
  });
  s.addText("Senate", {
    x: rightX, y: blockY + 0.6, w: colW, h: 0.4,
    fontFace: HEAD, fontSize: 18, color: MUTED, margin: 0
  });
  s.addText([
    { text: "Pool media rights to grow revenue", options: { bullet: true, breakLine: true } },
    { text: "Protect women's & Olympic sports", options: { bullet: true, breakLine: true } },
    { text: "Bipartisan (D-Wash., R-Mo.)", options: { bullet: true, breakLine: true } },
    { text: "Discussion draft released March 2026", options: { bullet: true } }
  ], {
    x: rightX + 0.1, y: blockY + 1.2, w: colW - 0.1, h: 2.8,
    fontFace: HEAD, fontSize: 18, color: MUTED, paraSpaceAfter: 8, margin: 0, valign: "top"
  });
}

// =====================================================
// SLIDE 10 — Our Approach
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 8 });
  addEyebrow(s, "For discussion");

  // Title with colored "Approach" prefix + posture statement
  s.addText([
    { text: "Approach: ", options: { color: ACCENT } },
    { text: "Act as if the EO will be enforced.", options: { color: INK } }
  ], {
    x: ML, y: 1.1, w: W - ML - MR, h: 0.9,
    fontFace: HEAD, fontSize: 36, margin: 0
  });

  const items = [
    { num: "01", label: "Brief athletes\n& coaches", desc: "Transfer limits raise the stakes" },
    { num: "02", label: "Develop revenue-\nsharing committee", desc: "Allocate ~$20.5M across sports" },
    { num: "03", label: "Build FMV\nNIL channels", desc: "Compliant deals with alumni" }
  ];

  const colGap = 0.4;
  const totalW = W - ML - MR;
  const colW = (totalW - colGap * (items.length - 1)) / items.length;
  const startY = 2.8;

  items.forEach((it, i) => {
    const x = ML + i * (colW + colGap);

    // Number
    s.addText(it.num, {
      x, y: startY, w: colW, h: 0.7,
      fontFace: HEAD, fontSize: 36, color: ACCENT, align: "center", margin: 0
    });

    // Thin separator (centered)
    s.addShape(pres.shapes.LINE, {
      x: x + colW/2 - 0.3, y: startY + 0.85, w: 0.6, h: 0,
      line: { color: MUTED, width: 0.75 }
    });

    // Label
    s.addText(it.label, {
      x, y: startY + 1.1, w: colW, h: 1.4,
      fontFace: HEAD, fontSize: 26, color: INK, align: "center", margin: 0
    });

    // Description
    s.addText(it.desc, {
      x, y: startY + 2.6, w: colW, h: 0.7,
      fontFace: BODY, fontSize: 16, color: MUTED, italic: true, align: "center", margin: 0
    });
  });
}

// =====================================================
// SLIDE 11 — The Long View (closing)
// =====================================================
{
  const s = pres.addSlide();
  addBase(s, { pageNum: 9 });
  addEyebrow(s, "Long term");

  // Title: colored "Long View:" + "Positive"
  s.addText([
    { text: "Long View: ", options: { color: ACCENT } },
    { text: "Positive", options: { color: INK } }
  ], {
    x: ML, y: 1.1, w: W - ML - MR, h: 0.9,
    fontFace: HEAD, fontSize: 36, margin: 0
  });

  const items = [
    { label: "Stability",         desc: "Fewer transfers, longer development arcs" },
    { label: "Mission alignment", desc: "Olympic sports central to who we are" },
    { label: "Planning horizon",  desc: "Stable rules invite long-term thinking" }
  ];

  const startY = 2.7;
  const rowH = 1.0;
  const labelW = 4.0;
  items.forEach((it, i) => {
    const y = startY + i * rowH;
    s.addText(it.label, {
      x: ML + 0.5, y, w: labelW, h: 0.7,
      fontFace: HEAD, fontSize: 24, color: INK, margin: 0
    });
    s.addText(it.desc, {
      x: ML + 0.5 + labelW, y, w: W - ML - MR - 0.5 - labelW, h: 0.7,
      fontFace: HEAD, fontSize: 24, color: MUTED, margin: 0
    });
  });
}

pres.writeFile({ fileName: "/home/assets/deck/EO_College_Sports_Briefing.pptx" })
  .then(fn => console.log("WROTE:", fn));
