/**
 * SoccerX Pitch Deck - pptxgenjs recreation
 * A 12-slide pitch deck for a fictional next-gen football video game.
 *
 * Usage: node build_soccerx.js
 * Output: SoccerX_Pitch_Deck.pptx
 */

const pptxgen = require("pptxgenjs");

// ---- Palette ----------------------------------------------------------------
const INK       = "0A0D14"; // dark navy/ink background
const INK_SOFT  = "11151E"; // subtle card background
const INK_CARD  = "0F131C"; // card fill
const CHALK     = "F4F1E8"; // near-white text
const MUTE      = "8A93A6"; // muted secondary text
const MUTE_2    = "5A6478"; // even more muted
const LINE      = "2A3040"; // divider lines
const KICKOFF   = "FF3D2E"; // red accent (primary)
const FLOODLIGHT= "FFB020"; // amber accent
const PITCH     = "1E5A2E"; // green accent
const GOLD      = "FFC857"; // gold/yellow star

// ---- Layout -----------------------------------------------------------------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN_X = 0.55;

// ---- Helpers ----------------------------------------------------------------
// Helpers
// Draw a line from (x1,y1) to (x2,y2), handling negative dw/dh by flipping
function drawLine(slide, x1, y1, x2, y2, opts) {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const w = Math.abs(x2 - x1);
  const h = Math.abs(y2 - y1);
  const goingDown = (x2 - x1) * (y2 - y1) >= 0; // both deltas same sign (or one zero)
  slide.addShape("line", {
    x, y, w, h,
    flipV: !goingDown,
    line: opts,
  });
}

function addBackground(slide) {
  slide.background = { color: INK };
}

// Subtle grid background for title slide
function addGrid(slide) {
  const gridColor = "1A1F2B";
  const cols = 12, rows = 7;
  const cellW = SLIDE_W / cols;
  const cellH = SLIDE_H / rows;
  for (let i = 1; i < cols; i++) {
    slide.addShape("line", {
      x: i * cellW, y: 0, w: 0, h: SLIDE_H,
      line: { color: gridColor, width: 0.5 }
    });
  }
  for (let i = 1; i < rows; i++) {
    slide.addShape("line", {
      x: 0, y: i * cellH, w: SLIDE_W, h: 0,
      line: { color: gridColor, width: 0.5 }
    });
  }
}

// Top-left logo "• SOCCERX"
function addLogo(slide) {
  // red dot
  slide.addShape("ellipse", {
    x: 0.55, y: 0.38, w: 0.11, h: 0.11,
    fill: { color: KICKOFF }, line: { color: KICKOFF }
  });
  // wordmark
  slide.addText("SOCCERX", {
    x: 0.55, y: 0.5, w: 1.6, h: 0.28,
    fontSize: 10, fontFace: "Arial", bold: true,
    color: CHALK, charSpacing: 2, margin: 0
  });
}

// Top-right page indicator like "02 / 12 · VISION"
function addPageNum(slide, n, section) {
  const label = section
    ? `${String(n).padStart(2, "0")} / 12 · ${section}`
    : `${String(n).padStart(2, "0")} / 12`;
  slide.addText(label, {
    x: SLIDE_W - 3.3, y: 0.42, w: 2.7, h: 0.3,
    fontSize: 9, fontFace: "Consolas", color: CHALK,
    charSpacing: 3, align: "right", margin: 0
  });
}

// Bottom-left caption text
function addFootL(slide, text) {
  slide.addText(text, {
    x: 0.55, y: SLIDE_H - 0.42, w: 6, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE,
    charSpacing: 3, margin: 0
  });
}

// Bottom-right page marker like "§03"
function addFootR(slide, text) {
  slide.addText(text, {
    x: SLIDE_W - 2.5, y: SLIDE_H - 0.42, w: 1.95, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE,
    charSpacing: 3, align: "right", margin: 0
  });
}

// Standard frame: background + logo + page num + footers
function addFrame(slide, n, section, footL, footR) {
  addBackground(slide);
  addLogo(slide);
  addPageNum(slide, n, section);
  if (footL) addFootL(slide, footL);
  if (footR) addFootR(slide, footR);
}

// Small red accent tick (e.g. before "THE ONE-LINER")
function addEyebrow(slide, x, y, label) {
  slide.addShape("line", {
    x: x, y: y + 0.12, w: 0.25, h: 0,
    line: { color: KICKOFF, width: 1.5 }
  });
  slide.addText(label, {
    x: x + 0.35, y: y, w: 4, h: 0.28,
    fontSize: 10, fontFace: "Consolas", color: CHALK,
    charSpacing: 3, margin: 0
  });
}

// ============================================================================
// Build presentation
// ============================================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "SoccerX Pitch Deck";
pres.author = "SoccerX";

// ============================================================================
// SLIDE 1 — Title
// ============================================================================
{
  const s = pres.addSlide();
  addBackground(s);
  addGrid(s);
  addLogo(s);
  addPageNum(s, 1);

  // "—— PITCH DOCUMENT · VOL. 01"
  s.addShape("line", {
    x: 0.9, y: 1.62, w: 0.35, h: 0,
    line: { color: KICKOFF, width: 1.5 }
  });
  s.addText("PITCH DOCUMENT · VOL. 01", {
    x: 1.35, y: 1.5, w: 4, h: 0.3,
    fontSize: 11, fontFace: "Consolas", color: CHALK,
    charSpacing: 4, margin: 0
  });

  // Top-right tagline
  s.addText([
    { text: "A new challenger enters", options: { breakLine: true, color: CHALK } },
    { text: "the ", options: { color: CHALK } },
    { text: "beautiful game", options: { color: FLOODLIGHT, italic: true } },
    { text: ".", options: { color: CHALK } },
  ], {
    x: 7.6, y: 1.45, w: 5.2, h: 1.0,
    fontSize: 22, fontFace: "Calibri", align: "right", valign: "top", margin: 0,
  });

  // Giant "SOCCERX" wordmark — sized to fit, centered, with amber overlay on X
  s.addText([
    { text: "SOCCER", options: { color: CHALK } },
    { text: "X",       options: { color: KICKOFF } },
  ], {
    x: 0.4, y: 2.7, w: 12.55, h: 2.8,
    fontSize: 140, fontFace: "Arial Black", bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Meta strip at bottom
  const metaY = 6.5;
  const metaItems = [
    { label: "GENRE",     value: "SPORTS / SIMULATION",  x: 0.55, w: 3.6 },
    { label: "PLATFORMS", value: "PS5 · XBOX · PC",      x: 4.3,  w: 3.2 },
    { label: "TARGET",    value: "HOLIDAY 2027",          x: 7.85, w: 3.5 },
  ];
  metaItems.forEach(m => {
    s.addText([
      { text: m.label, options: { bold: true, color: CHALK } },
      { text: "  ·  " + m.value, options: { color: MUTE } },
    ], {
      x: m.x, y: metaY, w: m.w, h: 0.28,
      fontSize: 10, fontFace: "Consolas", charSpacing: 2, margin: 0,
    });
  });

  s.addText("PITCH · CONFIDENTIAL", {
    x: 0.55, y: SLIDE_H - 0.42, w: 4, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
  });
  s.addText("Q2 2026", {
    x: SLIDE_W - 2.5, y: SLIDE_H - 0.42, w: 1.95, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3,
    align: "right", margin: 0,
  });
}

// ============================================================================
// SLIDE 2 — The one-liner
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 2, "VISION", "ONE-LINER", "§02");

  addEyebrow(s, 0.9, 1.25, "THE ONE-LINER");

  // Big quote with accent "every match"
  s.addText([
    { text: "The first soccer sim that", options: { breakLine: true, color: CHALK } },
    { text: "treats ", options: { color: CHALK } },
    { text: "every match", options: { color: KICKOFF, italic: true } },
    { text: " like", options: { breakLine: true, color: CHALK } },
    { text: "a story worth telling.", options: { color: CHALK } },
  ], {
    x: 0.9, y: 1.7, w: 11.5, h: 3.2,
    fontSize: 56, fontFace: "Arial Black", bold: true,
    valign: "top", margin: 0,
  });

  // Body paragraph (bottom-left)
  s.addText(
    "SoccerX is a next-generation football game built around narrative momentum — where rivalries, weather, crowd energy, and career arcs shape every kick. Broadcast-grade presentation. Physics-first gameplay. A living league that evolves whether you're playing or not.",
    {
      x: 0.9, y: 5.35, w: 7.4, h: 1.4,
      fontSize: 13, fontFace: "Calibri", color: MUTE,
      valign: "top", margin: 0, paraSpaceAfter: 4,
    }
  );

  // Faint "X" on right
  s.addText("X", {
    x: 9.2, y: 3.2, w: 4.0, h: 4.2,
    fontSize: 340, fontFace: "Arial Black", bold: true,
    color: LINE, align: "center", valign: "middle", margin: 0,
    transparency: 40,
  });
}

// ============================================================================
// SLIDE 3 — Market ($9B genre)
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 3, "MARKET", "OPPORTUNITY · ILLUSTRATIVE MARKET MODEL", "§03");
  s.addText("TOTAL ADDRESSABLE MARKET · GLOBAL", {
    x: 6.5, y: SLIDE_H - 0.42, w: 4.3, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3,
    align: "right", margin: 0,
  });

  // Title with red "$9B"
  s.addText([
    { text: "A ", options: { color: CHALK } },
    { text: "$9B", options: { color: KICKOFF, italic: true } },
    { text: " genre", options: { breakLine: true, color: CHALK } },
    { text: "with one voice.", options: { color: CHALK } },
  ], {
    x: 0.9, y: 1.3, w: 8.5, h: 2.2,
    fontSize: 50, fontFace: "Arial Black", bold: true,
    valign: "top", margin: 0,
  });

  // "Illustrative figures" pill top-right
  s.addShape("rect", {
    x: 9.15, y: 2.5, w: 3.6, h: 0.35,
    fill: { color: INK_CARD }, line: { color: LINE, width: 0.75 },
  });
  s.addText("ILLUSTRATIVE FIGURES · TO BE VALIDATED", {
    x: 9.15, y: 2.5, w: 3.6, h: 0.35,
    fontSize: 8, fontFace: "Consolas", color: MUTE, charSpacing: 2,
    align: "center", valign: "middle", margin: 0,
  });

  // Top and bottom horizontal lines for the stats row
  s.addShape("line", { x: 0.9, y: 3.85, w: 11.6, h: 0, line: { color: LINE, width: 0.75 }});
  s.addShape("line", { x: 0.9, y: 5.55, w: 11.6, h: 0, line: { color: LINE, width: 0.75 }});

  // 4 stats
  const stats = [
    { label: "GLOBAL FOOTBALL GAMING", big: "9.2", unit: "B",  prefix: "$", blurb: "Annual revenue across the football video-game category, 2025.", color: KICKOFF },
    { label: "ACTIVE PLAYERS",         big: "180", unit: "M",  prefix: "",  blurb: "Monthly active users across comparable titles worldwide.",       color: CHALK },
    { label: "MARKET SHARE, #1",       big: "84",  unit: "%",  prefix: "",  blurb: "Category concentration held by the current incumbent.",          color: CHALK },
    { label: "CAGR · 2025–2030",       big: "6.4", unit: "%",  prefix: "",  blurb: "Steady growth projected as new regions & platforms enter.",    color: CHALK },
  ];
  const colW = 11.6 / 4;
  stats.forEach((st, i) => {
    const x = 0.9 + i * colW;
    // label
    s.addText(st.label, {
      x: x + 0.15, y: 4.0, w: colW - 0.3, h: 0.3,
      fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    // big number with unit
    s.addText([
      { text: (st.prefix || "") + st.big, options: { fontSize: 56, color: st.color, bold: true } },
      { text: st.unit, options: { fontSize: 24, color: st.color, bold: true } },
    ], {
      x: x + 0.15, y: 4.35, w: colW - 0.3, h: 0.9,
      fontFace: "Georgia", valign: "top", margin: 0,
    });
    // blurb
    s.addText(st.blurb, {
      x: x + 0.15, y: 5.08, w: colW - 0.3, h: 0.5,
      fontSize: 10, fontFace: "Calibri", color: MUTE, margin: 0,
    });

    // vertical dividers
    if (i > 0) {
      s.addShape("line", {
        x: x, y: 3.95, w: 0, h: 1.55,
        line: { color: LINE, width: 0.5 },
      });
    }
  });

  // Timeline row
  const years = [
    { year: "2022", val: "$7.1B" },
    { year: "2023", val: "$7.7B" },
    { year: "2024", val: "$8.4B" },
    { year: "2025", val: "$9.2B" },
    { year: "2027", val: "$10.4B" },
    { year: "2030", val: "$12.6B" },
  ];
  const tlColW = 11.6 / 6;
  years.forEach((y, i) => {
    const x = 0.9 + i * tlColW;
    // top rule
    s.addShape("line", {
      x: x + 0.15, y: 6.15, w: tlColW - 0.3, h: 0,
      line: { color: LINE, width: 0.5 },
    });
    s.addText(y.year, {
      x: x + 0.15, y: 6.22, w: tlColW - 0.3, h: 0.25,
      fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    s.addText(y.val, {
      x: x + 0.15, y: 6.5, w: tlColW - 0.3, h: 0.35,
      fontSize: 14, fontFace: "Calibri", color: CHALK, bold: true, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 4 — Landscape / Positioning quadrant
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 4, "LANDSCAPE", "POSITIONING", "§04");

  s.addText("Where we play.", {
    x: 0.9, y: 1.1, w: 9, h: 1.1,
    fontSize: 48, fontFace: "Arial Black", bold: true,
    color: CHALK, margin: 0,
  });
  s.addText(
    "A decade of consolidation left a genre that is technically deep but emotionally flat. SoccerX occupies the open quadrant: simulation-grade physics paired with cinematic drama.",
    {
      x: 0.9, y: 2.25, w: 6.2, h: 1.2,
      fontSize: 12, fontFace: "Calibri", color: MUTE, margin: 0,
    }
  );

  // Quadrant chart box
  const qx = 1.2, qy = 3.75, qw = 11.1, qh = 2.8;
  // outer bounding
  s.addShape("line", { x: qx, y: qy,       w: qw, h: 0,  line: { color: LINE, width: 0.75 } });
  s.addShape("line", { x: qx, y: qy + qh,  w: qw, h: 0,  line: { color: LINE, width: 0.75 } });
  s.addShape("line", { x: qx, y: qy,       w: 0,  h: qh, line: { color: LINE, width: 0.75 } });
  s.addShape("line", { x: qx + qw, y: qy,  w: 0,  h: qh, line: { color: LINE, width: 0.75 } });
  // crosshairs
  s.addShape("line", {
    x: qx, y: qy + qh / 2, w: qw, h: 0,
    line: { color: LINE, width: 0.5 },
  });
  s.addShape("line", {
    x: qx + qw / 2, y: qy, w: 0, h: qh,
    line: { color: LINE, width: 0.5 },
  });

  // axis labels — stacked letters (matches original stacked design)
  s.addText("↑", {
    x: qx - 0.55, y: qy - 0.05, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Consolas", color: MUTE, margin: 0,
  });
  s.addText([
    { text: "N", options: { breakLine: true } },
    { text: "A", options: { breakLine: true } },
    { text: "R", options: { breakLine: true } },
    { text: "R", options: { breakLine: true } },
    { text: "A", options: { breakLine: true } },
    { text: "T", options: { breakLine: true } },
    { text: "I", options: { breakLine: true } },
    { text: "V", options: { breakLine: true } },
    { text: "E" },
  ], {
    x: qx - 0.55, y: qy + 0.25, w: 0.3, h: 1.1,
    fontSize: 8, fontFace: "Consolas", color: MUTE,
    charSpacing: 0, align: "center", margin: 0,
  });
  s.addText([
    { text: "S", options: { breakLine: true } },
    { text: "Y", options: { breakLine: true } },
    { text: "S", options: { breakLine: true } },
    { text: "T", options: { breakLine: true } },
    { text: "E", options: { breakLine: true } },
    { text: "M", options: { breakLine: true } },
    { text: "S" },
  ], {
    x: qx - 0.55, y: qy + qh - 1.0, w: 0.3, h: 0.95,
    fontSize: 8, fontFace: "Consolas", color: MUTE,
    charSpacing: 0, align: "center", margin: 0,
  });
  s.addText("↓", {
    x: qx - 0.55, y: qy + qh - 0.05, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Consolas", color: MUTE, margin: 0,
  });

  // x-axis labels below
  s.addText("← ARCADE", {
    x: qx, y: qy + qh + 0.1, w: 2, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
  });
  s.addText("SIMULATION →", {
    x: qx + qw - 2, y: qy + qh + 0.1, w: 2, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, align: "right", margin: 0,
  });

  // Competitor dots
  const dots = [
    { name: "STREET LEGENDS", cx: 0.28, cy: 0.35, hi: false },
    { name: "ARCADE KICK '24", cx: 0.18, cy: 0.72, hi: false },
    { name: "MANAGER SIM",     cx: 0.42, cy: 0.83, hi: false },
    { name: "INCUMBENT B",     cx: 0.74, cy: 0.60, hi: false },
    { name: "INCUMBENT A",     cx: 0.81, cy: 0.75, hi: false },
    { name: "SoccerX",         cx: 0.76, cy: 0.30, hi: true  },
  ];
  dots.forEach(d => {
    const cx = qx + d.cx * qw;
    const cy = qy + d.cy * qh;
    const r  = d.hi ? 0.16 : 0.11;
    if (d.hi) {
      // red glow — larger, transparent
      s.addShape("ellipse", {
        x: cx - 0.35, y: cy - 0.35, w: 0.7, h: 0.7,
        fill: { color: KICKOFF, transparency: 70 },
        line: { color: KICKOFF, width: 0, transparency: 100 },
      });
    }
    s.addShape("ellipse", {
      x: cx - r / 2, y: cy - r / 2, w: r, h: r,
      fill: { color: d.hi ? KICKOFF : "3A4256" },
      line: { color: d.hi ? KICKOFF : "5A6478", width: 0.5 },
    });
    // label to the right
    s.addText(d.name, {
      x: cx + 0.18, y: cy - 0.13, w: 2.2, h: 0.3,
      fontSize: 10, fontFace: d.hi ? "Calibri" : "Consolas",
      color: d.hi ? CHALK : MUTE,
      charSpacing: d.hi ? 0 : 3,
      bold: d.hi, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 5 — Four pillars
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 5, "PILLARS", "WHAT MAKES IT OURS", "§05");

  s.addText([
    { text: "Four pillars.", options: { breakLine: true } },
    { text: "One game." },
  ], {
    x: 0.9, y: 1.1, w: 8, h: 2.0,
    fontSize: 48, fontFace: "Arial Black", bold: true,
    color: CHALK, margin: 0,
  });

  const pillars = [
    {
      num: "P.01", title: "BROADCAST FEEL",
      desc: "Every match renders like a live TV production — camera cuts, replays, commentary that reacts to the moment, not a script.",
    },
    {
      num: "P.02", title: "PHYSICAL TRUTH",
      desc: "Ball physics, turf friction, and player momentum modeled from real sensor data. No canned animations deciding outcomes.",
    },
    {
      num: "P.03", title: "LIVING LEAGUE",
      desc: "Seasons, transfers, rivalries, and stories unfold with or without you. Your career exists inside a world that moves.",
    },
    {
      num: "P.04", title: "CROSSPLAY FIRST",
      desc: "One player base across Xbox, PlayStation and PC — day one. No tiered rollouts, no split communities.",
    },
  ];

  const cardY = 3.6, cardH = 3.3, gap = 0.2;
  const totalW = 11.6;
  const cardW = (totalW - 3 * gap) / 4;

  pillars.forEach((p, i) => {
    const x = 0.9 + i * (cardW + gap);
    // Card background
    s.addShape("rect", {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: INK_CARD }, line: { type: "none" },
    });
    // Top accent gradient bar (faked with 2 rectangles)
    s.addShape("rect", {
      x: x, y: cardY, w: cardW * 0.55, h: 0.04,
      fill: { color: KICKOFF }, line: { type: "none" },
    });
    s.addShape("rect", {
      x: x + cardW * 0.55, y: cardY, w: cardW * 0.45, h: 0.04,
      fill: { color: FLOODLIGHT }, line: { type: "none" },
    });

    // P.01 label
    s.addText(p.num, {
      x: x + 0.25, y: cardY + 0.2, w: 1.5, h: 0.25,
      fontSize: 10, fontFace: "Consolas", color: KICKOFF, charSpacing: 3, margin: 0,
    });

    // Icon area — abstract SVG-ish shapes (circle w/ radius line, curve, pitch, two circles)
    const iconCx = x + cardW / 2;
    const iconCy = cardY + 1.2;
    if (i === 0) {
      // circle + radius line + dot (broadcast target)
      s.addShape("ellipse", {
        x: iconCx - 0.45, y: iconCy - 0.45, w: 0.9, h: 0.9,
        fill: { type: "none" },
        line: { color: CHALK, width: 1.2 },
      });
      // radius
      drawLine(s, iconCx, iconCy, iconCx + 0.32, iconCy - 0.32,
        { color: KICKOFF, width: 1.5 });
      s.addShape("ellipse", {
        x: iconCx + 0.26, y: iconCy - 0.38, w: 0.14, h: 0.14,
        fill: { color: FLOODLIGHT }, line: { color: FLOODLIGHT, width: 0 },
      });
      // center dot
      s.addShape("ellipse", {
        x: iconCx - 0.06, y: iconCy - 0.06, w: 0.12, h: 0.12,
        fill: { color: KICKOFF }, line: { color: KICKOFF, width: 0 },
      });
    } else if (i === 1) {
      // S-curve approximated with several small line segments
      const pts = [
        [-0.5, 0.1], [-0.3, -0.1], [-0.1, -0.15],
        [0.1, -0.05], [0.3, 0.05], [0.45, -0.1],
      ];
      for (let k = 0; k < pts.length - 1; k++) {
        const [ax, ay] = pts[k], [bx, by] = pts[k + 1];
        drawLine(s, iconCx + ax, iconCy + ay, iconCx + bx, iconCy + by,
          { color: CHALK, width: 1.2 });
      }
      // dot on end
      s.addShape("ellipse", {
        x: iconCx + 0.4, y: iconCy - 0.17, w: 0.14, h: 0.14,
        fill: { color: FLOODLIGHT }, line: { color: FLOODLIGHT, width: 0 },
      });
      // dot on start
      s.addShape("ellipse", {
        x: iconCx - 0.55, y: iconCy + 0.05, w: 0.12, h: 0.12,
        fill: { color: CHALK }, line: { color: CHALK, width: 0 },
      });
    } else if (i === 2) {
      // football pitch rectangle with center circle
      s.addShape("rect", {
        x: iconCx - 0.6, y: iconCy - 0.4, w: 1.2, h: 0.8,
        fill: { type: "none" },
        line: { color: CHALK, width: 1.2 },
      });
      // center line
      s.addShape("line", {
        x: iconCx, y: iconCy - 0.4, w: 0, h: 0.8,
        line: { color: CHALK, width: 0.75 },
      });
      // center circle
      s.addShape("ellipse", {
        x: iconCx - 0.18, y: iconCy - 0.18, w: 0.36, h: 0.36,
        fill: { type: "none" },
        line: { color: CHALK, width: 1 },
      });
      // center dot
      s.addShape("ellipse", {
        x: iconCx - 0.05, y: iconCy - 0.05, w: 0.1, h: 0.1,
        fill: { color: KICKOFF }, line: { color: KICKOFF, width: 0 },
      });
    } else {
      // two linked circles
      s.addShape("ellipse", {
        x: iconCx - 0.52, y: iconCy - 0.25, w: 0.5, h: 0.5,
        fill: { type: "none" },
        line: { color: CHALK, width: 1.2 },
      });
      s.addShape("ellipse", {
        x: iconCx + 0.02, y: iconCy - 0.25, w: 0.5, h: 0.5,
        fill: { type: "none" },
        line: { color: CHALK, width: 1.2 },
      });
      // dots in centers
      s.addShape("ellipse", {
        x: iconCx - 0.33, y: iconCy - 0.06, w: 0.12, h: 0.12,
        fill: { color: FLOODLIGHT }, line: { color: FLOODLIGHT, width: 0 },
      });
      s.addShape("ellipse", {
        x: iconCx + 0.21, y: iconCy - 0.06, w: 0.12, h: 0.12,
        fill: { color: FLOODLIGHT }, line: { color: FLOODLIGHT, width: 0 },
      });
    }

    // Title
    s.addText(p.title, {
      x: x + 0.25, y: cardY + 2.0, w: cardW - 0.5, h: 0.4,
      fontSize: 17, fontFace: "Arial Black", bold: true,
      color: CHALK, margin: 0,
    });
    // Description
    s.addText(p.desc, {
      x: x + 0.25, y: cardY + 2.5, w: cardW - 0.5, h: 1.0,
      fontSize: 10.5, fontFace: "Calibri", color: MUTE, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 6 — Modes (Five ways)
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 6, "MODES", "HOW YOU PLAY", "§06");

  s.addText([
    { text: "Five ways", options: { breakLine: true } },
    { text: "to take the pitch." },
  ], {
    x: 0.9, y: 1.1, w: 9, h: 2.0,
    fontSize: 48, fontFace: "Arial Black", bold: true,
    color: CHALK, margin: 0,
  });

  // Layout: Left big card (Legacy), right 2x2 grid
  const cardsTop = 3.5;
  const cardsBottomH = 3.5;
  const totalW = 11.6;
  const gap = 0.18;
  const bigW = (totalW - gap) * 0.35;
  const rightW = totalW - bigW - gap;
  const smallW = (rightW - gap) / 2;
  const smallH = (cardsBottomH - gap) / 2;

  // LEGACY — big card
  s.addShape("rect", {
    x: 0.9, y: cardsTop, w: bigW, h: cardsBottomH,
    fill: { color: INK_CARD }, line: { color: LINE, width: 0.5 },
  });
  // gold star + FLAGSHIP MODE
  s.addText("★", {
    x: 1.05, y: cardsTop + 0.2, w: 0.25, h: 0.3,
    fontSize: 12, color: GOLD, margin: 0,
  });
  s.addText("FLAGSHIP MODE", {
    x: 1.3, y: cardsTop + 0.22, w: 3, h: 0.28,
    fontSize: 10, fontFace: "Consolas", color: GOLD, charSpacing: 3, margin: 0,
  });
  s.addText("LEGACY", {
    x: 1.05, y: cardsTop + 0.75, w: bigW - 0.3, h: 0.9,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });
  s.addText(
    "A decade-spanning career that follows a single player from academy trials to international glory. Decisions off the pitch matter as much as on it.",
    {
      x: 1.05, y: cardsTop + 1.75, w: bigW - 0.3, h: 1.15,
      fontSize: 11.5, fontFace: "Calibri", color: MUTE, margin: 0,
    }
  );
  // (No glow — kept clean to match reference more closely)
  // footer meta
  s.addText("SINGLE-PLAYER", {
    x: 1.05, y: cardsTop + cardsBottomH - 0.45, w: 3, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
  });
  s.addText("30–80 HRS", {
    x: 0.9 + bigW - 1.8, y: cardsTop + cardsBottomH - 0.45, w: 1.5, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, align: "right", margin: 0,
  });

  // Small cards
  const smallCards = [
    {
      row: 0, col: 0, num: "02", tag: "ONLINE", title: "RIVALS",
      desc: "Weekly ranked ladders with city-based rivalries.",
      footL: "1V1 · 2V2", footR: "CROSSPLAY",
    },
    {
      row: 0, col: 1, num: "03", tag: "COOPERATIVE", title: "CLUB",
      desc: "Build and run a 15-player club with friends. Training, tactics, transfers.",
      footL: "CO-OP", footR: "PERSISTENT",
    },
    {
      row: 1, col: 0, num: "04", tag: "QUICKPLAY", title: "KICKOFF",
      desc: "Pick up, play a match. The 8-minute mode for lunch breaks.",
      footL: "SOLO · LOCAL", footR: "8 MIN AVG",
    },
    {
      row: 1, col: 1, num: "05", tag: "LIVE OPS", title: "THE SEASON",
      desc: "A yearlong narrative following the real-world football calendar.",
      footL: "SEASONAL", footR: "FREE",
    },
  ];

  const rightX = 0.9 + bigW + gap;
  smallCards.forEach(c => {
    const x = rightX + c.col * (smallW + gap);
    const y = cardsTop + c.row * (smallH + gap);
    s.addShape("rect", {
      x: x, y: y, w: smallW, h: smallH,
      fill: { color: INK_CARD }, line: { color: LINE, width: 0.5 },
    });
    // Tag at top
    s.addText(c.tag, {
      x: x + 0.2, y: y + 0.15, w: smallW - 0.5, h: 0.22,
      fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    // big number on right — full height behind title
    s.addText(c.num, {
      x: x + smallW - 1.2, y: y + 0.1, w: 1.0, h: 0.85,
      fontSize: 52, fontFace: "Georgia", color: LINE,
      align: "right", valign: "top", margin: 0,
    });
    // Title (single or wrap to two lines)
    s.addText(c.title, {
      x: x + 0.2, y: y + 0.42, w: smallW - 1.25, h: 0.85,
      fontSize: 22, fontFace: "Arial Black", bold: true, color: CHALK,
      valign: "top", margin: 0,
    });
    // Description
    s.addText(c.desc, {
      x: x + 0.2, y: y + smallH - 0.95, w: smallW - 0.4, h: 0.5,
      fontSize: 9.5, fontFace: "Calibri", color: MUTE, margin: 0,
    });
    // footer
    s.addText(c.footL, {
      x: x + 0.2, y: y + smallH - 0.33, w: 2, h: 0.22,
      fontSize: 8.5, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    s.addText(c.footR, {
      x: x + smallW - 2.2, y: y + smallH - 0.33, w: 2, h: 0.22,
      fontSize: 8.5, fontFace: "Consolas", color: MUTE, charSpacing: 3, align: "right", margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 7 — Art direction
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 7, "ART", "VISUAL DIRECTION", "§07");
  s.addText("MOOD · FLOODLIGHT / NIGHT FIXTURE", {
    x: 6.5, y: SLIDE_H - 0.42, w: 4.3, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3,
    align: "right", margin: 0,
  });

  // Left side content
  addEyebrow(s, 0.9, 1.25, "ART DIRECTION");
  s.addText([
    { text: "Floodlight", options: { color: CHALK, breakLine: true } },
    { text: "realism.", options: { color: KICKOFF, italic: true } },
  ], {
    x: 0.9, y: 1.65, w: 5.5, h: 2.2,
    fontSize: 52, fontFace: "Arial Black", bold: true, margin: 0, valign: "top",
  });

  s.addText(
    "The visual language of a midnight European fixture: deep shadows, hot stadium lights, breath in the cold air. We reject plastic lighting and pageantry. Every frame should feel like it belongs on the 10 o'clock sportscast.",
    {
      x: 0.9, y: 3.95, w: 5.3, h: 1.4,
      fontSize: 13, fontFace: "Calibri", color: MUTE, margin: 0,
    }
  );

  // CORE PALETTE swatches
  s.addText("CORE PALETTE", {
    x: 0.9, y: 5.35, w: 3, h: 0.25,
    fontSize: 10, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
  });

  const swatches = [
    { name: "INK",        hex: "#0A0D14", fill: INK,       textColor: CHALK },
    { name: "CHALK",      hex: "#F4F1E8", fill: CHALK,     textColor: INK   },
    { name: "KICKOFF",    hex: "#FF3D2E", fill: KICKOFF,   textColor: CHALK },
    { name: "FLOODLIGHT", hex: "#FFB020", fill: FLOODLIGHT,textColor: INK   },
    { name: "PITCH",      hex: "#1E5A2E", fill: PITCH,     textColor: CHALK },
  ];
  const swTop = 5.7, swH = 1.25, swGap = 0.08;
  const swW = (6.6 - swGap * 4) / 5;
  swatches.forEach((sw, i) => {
    const x = 0.9 + i * (swW + swGap);
    s.addShape("rect", {
      x: x, y: swTop, w: swW, h: swH,
      fill: { color: sw.fill }, line: { color: LINE, width: 0.5 },
    });
    s.addText(sw.name, {
      x: x + 0.1, y: swTop + 0.1, w: swW - 0.15, h: 0.25,
      fontSize: 8, fontFace: "Consolas", color: sw.textColor, charSpacing: 2,
      bold: true, margin: 0,
    });
    s.addText(sw.hex, {
      x: x + 0.1, y: swTop + swH - 0.32, w: swW - 0.15, h: 0.22,
      fontSize: 8, fontFace: "Consolas", color: sw.textColor, margin: 0,
    });
  });

  // Right side — mood plate with glowing X
  const rx = 7.1, ry = 0.9, rw = SLIDE_W - rx - 0.4, rh = SLIDE_H - ry - 0.9;
  s.addShape("rect", {
    x: rx, y: ry, w: rw, h: rh,
    fill: { color: "0D1119" }, line: { type: "none" },
  });
  // glow
  const gcx = rx + rw / 2, gcy = ry + rh / 2;
  for (let k = 3; k >= 1; k--) {
    const size = 0.8 * k + 1.4;
    s.addShape("ellipse", {
      x: gcx - size / 2, y: gcy - size / 2, w: size, h: size,
      fill: { color: KICKOFF, transparency: 85 + k },
      line: { type: "none" },
    });
  }
  // X
  s.addText("X", {
    x: rx, y: ry, w: rw, h: rh,
    fontSize: 260, fontFace: "Arial Black", bold: true,
    color: KICKOFF, align: "center", valign: "middle", margin: 0,
    transparency: 35,
  });
}

// ============================================================================
// SLIDE 8 — Tech
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 8, "TECH", "ENGINE & SYSTEMS", "§08");

  s.addText([
    { text: "Built for sixty", options: { breakLine: true } },
    { text: "frames, forever." },
  ], {
    x: 0.9, y: 1.1, w: 9, h: 2.0,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });

  // LEFT — CORE SPECIFICATIONS
  addEyebrow(s, 0.9, 3.4, "CORE SPECIFICATIONS");
  s.addShape("line", {
    x: 0.9, y: 3.75, w: 5.6, h: 0, line: { color: LINE, width: 0.5 },
  });

  const specs = [
    { key: "ENGINE",      val: "Unreal Engine 5",  desc: "Nanite + Lumen for stadium-scale geometry and dynamic floodlights." },
    { key: "FRAME TARGET",val: "60 FPS · 4K",      desc: "Performance mode on consoles, 120Hz cap on PC; no sub-60 states during play." },
    { key: "PHYSICS",     val: "Custom · \"Boot\"",desc: "Proprietary ball + cleat contact solver trained on motion-capture data." },
    { key: "NETCODE",     val: "Rollback + GGPO",  desc: "Sub-60ms average latency in ranked matches, verified crossplay parity." },
    { key: "LIVE OPS",    val: "Managed cloud",    desc: "Realtime roster + competition data pipeline; weekly content drops." },
  ];
  let sy = 3.95;
  const rowH = 0.66;
  specs.forEach(sp => {
    s.addText(sp.key, {
      x: 0.9, y: sy, w: 1.4, h: 0.3,
      fontSize: 9.5, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    s.addText(sp.val, {
      x: 2.35, y: sy - 0.04, w: 4.2, h: 0.32,
      fontSize: 15, fontFace: "Calibri", color: CHALK, bold: true, margin: 0,
    });
    s.addText(sp.desc, {
      x: 2.35, y: sy + 0.25, w: 4.2, h: 0.32,
      fontSize: 10, fontFace: "Calibri", color: MUTE, margin: 0,
    });
    sy += rowH;
    s.addShape("line", {
      x: 0.9, y: sy - 0.04, w: 5.6, h: 0, line: { color: LINE, width: 0.5 },
    });
  });

  // RIGHT — KEY R&D BETS
  const rx = 6.9;
  addEyebrow(s, rx, 3.4, "KEY R&D BETS");
  s.addShape("rect", {
    x: rx, y: 3.75, w: SLIDE_W - rx - 0.55, h: 3.4,
    fill: { color: INK_CARD }, line: { color: LINE, width: 0.5 },
  });

  // header row
  s.addText("SYSTEM", {
    x: rx + 0.3, y: 3.9, w: 2.5, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
  });
  s.addText("STATUS", {
    x: SLIDE_W - 2.4, y: 3.9, w: 1.8, h: 0.25,
    fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, align: "right", margin: 0,
  });
  s.addShape("line", {
    x: rx + 0.3, y: 4.2, w: SLIDE_W - rx - 1.15, h: 0,
    line: { color: LINE, width: 0.5 },
  });

  const rnd = [
    { sys: "Crowd Sim",       stat: "PROTOTYPE · 40K AGENTS" },
    { sys: "Turf Deformation",stat: "R&D · Q3 2026" },
    { sys: "Commentary AI",   stat: "RESEARCH · PARTNER" },
    { sys: "Broadcast Cam",   stat: "SHIPPING · V0.4" },
    { sys: "Physics Solver",  stat: "SHIPPING · V1.0" },
    { sys: "Career Engine",   stat: "IN PRODUCTION" },
    { sys: "Crossplay Layer", stat: "IN PRODUCTION" },
  ];
  let rsy = 4.35;
  const rRowH = 0.39;
  rnd.forEach((r, i) => {
    s.addText(r.sys, {
      x: rx + 0.3, y: rsy, w: 3, h: 0.3,
      fontSize: 13, fontFace: "Calibri", color: CHALK, margin: 0,
    });
    s.addText(r.stat, {
      x: SLIDE_W - 3.3, y: rsy + 0.02, w: 2.7, h: 0.28,
      fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, align: "right", margin: 0,
    });
    rsy += rRowH;
    if (i < rnd.length - 1) {
      s.addShape("line", {
        x: rx + 0.3, y: rsy - 0.05, w: SLIDE_W - rx - 1.15, h: 0,
        line: { color: "1C2130", width: 0.5 },
      });
    }
  });
}

// ============================================================================
// SLIDE 9 — Revenue model
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 9, "REVENUE", "MONETIZATION MODEL", "§09");

  s.addText([
    { text: "Pay for content.", options: { breakLine: true } },
    { text: "Never for wins." },
  ], {
    x: 0.9, y: 1.1, w: 9, h: 2.0,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });
  s.addText(
    "A three-stream model anchored in premium sales — cosmetic-only live ops, no gameplay power gating, no loot boxes.",
    {
      x: 0.9, y: 3.1, w: 7.5, h: 0.8,
      fontSize: 13, fontFace: "Calibri", color: MUTE, margin: 0,
    }
  );

  // 3 cards
  const cardTop = 4.1, cardH = 2.35, gap = 0.25;
  const totalW = 11.6;
  const cardW = (totalW - 2 * gap) / 3;
  const streams = [
    {
      pct: "62%", color: KICKOFF, label: "STREAM 01 · YEAR 1", title: "PREMIUM SALE",
      desc: "Full-price title at $69.99 across all platforms. Complete game, no gated modes at launch.",
    },
    {
      pct: "28%", color: KICKOFF, label: "STREAM 02 · YEAR 1", title: "SEASONAL PASS",
      desc: "Cosmetic-only pass tied to the real football calendar. Kits, celebrations, stadium dressing.",
    },
    {
      pct: "10%", color: FLOODLIGHT, label: "STREAM 03 · YEAR 1", title: "PARTNERSHIPS",
      desc: "League, club, and brand integrations. Never behind a paywall for core players.",
    },
  ];
  streams.forEach((st, i) => {
    const x = 0.9 + i * (cardW + gap);
    s.addShape("rect", {
      x: x, y: cardTop, w: cardW, h: cardH,
      fill: { color: INK_CARD }, line: { color: LINE, width: 0.5 },
    });
    s.addText(st.label, {
      x: x + 0.3, y: cardTop + 0.22, w: cardW - 0.5, h: 0.25,
      fontSize: 9, fontFace: "Consolas", color: MUTE, charSpacing: 3, margin: 0,
    });
    s.addText(st.pct, {
      x: x + 0.3, y: cardTop + 0.55, w: cardW - 0.5, h: 0.9,
      fontSize: 64, fontFace: "Georgia", color: st.color, bold: true, margin: 0,
    });
    s.addText(st.title, {
      x: x + 0.3, y: cardTop + 1.4, w: cardW - 0.5, h: 0.4,
      fontSize: 18, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
    });
    s.addText(st.desc, {
      x: x + 0.3, y: cardTop + 1.85, w: cardW - 0.5, h: 0.55,
      fontSize: 10.5, fontFace: "Calibri", color: MUTE, margin: 0,
    });
  });

  // Principles row
  s.addShape("line", {
    x: 0.9, y: 6.65, w: 11.6, h: 0, line: { color: LINE, width: 0.5 },
  });
  const principles = ["NO PAY-TO-WIN", "NO LOOT BOXES", "NO ENERGY SYSTEMS", "TRANSPARENT ODDS"];
  const pW = 11.6 / 4;
  principles.forEach((p, i) => {
    s.addText([
      { text: "✓ ", options: { color: KICKOFF } },
      { text: p, options: { color: CHALK } },
    ], {
      x: 0.9 + i * pW, y: 6.75, w: pW, h: 0.25,
      fontSize: 9.5, fontFace: "Consolas", charSpacing: 3, bold: true, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 10 — Roadmap
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 10, "ROADMAP", "MILESTONES", "§10");

  s.addText([
    { text: "From kickoff", options: { breakLine: true } },
    { text: "to launch." },
  ], {
    x: 0.9, y: 1.1, w: 9, h: 2.0,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });

  const milestones = [
    { q: "Q1 2026",        title: "VERTICAL SLICE",      desc: "Single-match prototype with core ball physics and one playable stadium.", state: "done" },
    { q: "Q2 2026 · NOW",  title: "ALPHA — CORE LOOP",   desc: "Legacy mode skeleton, three modes playable, first playtest cohort.",     state: "now" },
    { q: "Q4 2026",        title: "CLOSED BETA",         desc: "Crossplay online stress test. 50k invited players across regions.",      state: "future" },
    { q: "Q3 2027",        title: "OPEN BETA",           desc: "Free weekend + creator preview. Marketing flywheel begins.",              state: "future" },
    { q: "Q4 2027",        title: "LAUNCH · V1.0",       desc: "Holiday 2027 release. Day-one crossplay, all five modes live.",           state: "future" },
  ];
  const lineY = 4.15;
  const colCount = 5;
  const colW = 11.6 / colCount;

  milestones.forEach((m, i) => {
    const x = 0.9 + i * colW;
    // Quarter
    s.addText(m.q, {
      x: x, y: 3.65, w: colW - 0.2, h: 0.28,
      fontSize: 9.5, fontFace: "Consolas",
      color: m.state === "now" ? KICKOFF : MUTE,
      charSpacing: 3, margin: 0,
    });
    // Marker on line
    const mx = x + 0.15;
    const my = lineY;
    if (m.state === "done") {
      s.addShape("ellipse", {
        x: mx - 0.13, y: my - 0.13, w: 0.26, h: 0.26,
        fill: { color: KICKOFF }, line: { color: KICKOFF, width: 0 },
      });
    } else if (m.state === "now") {
      // ring with inner fill
      s.addShape("ellipse", {
        x: mx - 0.17, y: my - 0.17, w: 0.34, h: 0.34,
        fill: { type: "none" },
        line: { color: KICKOFF, width: 1.5 },
      });
      s.addShape("ellipse", {
        x: mx - 0.1, y: my - 0.1, w: 0.2, h: 0.2,
        fill: { color: KICKOFF }, line: { color: KICKOFF, width: 0 },
      });
    } else {
      s.addShape("ellipse", {
        x: mx - 0.13, y: my - 0.13, w: 0.26, h: 0.26,
        fill: { type: "none" },
        line: { color: MUTE, width: 1.2 },
      });
    }
    // Title
    s.addText(m.title, {
      x: x, y: 4.45, w: colW - 0.2, h: 0.65,
      fontSize: 16, fontFace: "Arial Black", bold: true,
      color: m.state === "now" ? KICKOFF : CHALK, margin: 0,
    });
    // Description
    s.addText(m.desc, {
      x: x, y: 5.15, w: colW - 0.2, h: 0.9,
      fontSize: 10.5, fontFace: "Calibri", color: MUTE, margin: 0,
    });
  });

  // Horizontal timeline line — grey full + red progress to end of "NOW" column
  s.addShape("line", {
    x: 0.9, y: lineY + 2.1, w: 11.6, h: 0, line: { color: LINE, width: 0.5 },
  });
  // Progress: from start to end of 2nd column (index 1), i.e. 2*colW
  s.addShape("line", {
    x: 0.9, y: lineY + 2.1, w: colW * 1.65, h: 0,
    line: { color: KICKOFF, width: 1.5 },
  });
}

// ============================================================================
// SLIDE 11 — Team ("The starting eleven")
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 11, "TEAM", "THE SQUAD · 42 CORE · 18 CONTRACT · 3 COUNTRIES", "§11");

  s.addText("The starting eleven.", {
    x: 0.9, y: 1.1, w: 11, h: 1.1,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });
  s.addText(
    "A 42-person core studio. Placeholders below — swap in real names, photos, and credits.",
    {
      x: 0.9, y: 2.25, w: 7.5, h: 0.6,
      fontSize: 12, fontFace: "Calibri", color: MUTE, margin: 0,
    }
  );

  const people = [
    { initials: "AR", role: "GAME DIRECTOR",     bio: "15+ years across AAA sports titles. Shipped three top-10 launches." },
    { initials: "KM", role: "TECHNICAL DIRECTOR",bio: "Former engine architect. Specializes in physics + netcode at 60fps scale." },
    { initials: "LT", role: "ART DIRECTOR",      bio: "Previously led visual language for two breakout indie titles." },
    { initials: "SN", role: "LIVE OPS LEAD",     bio: "Built seasonal economies for games with 10M+ MAU." },
  ];
  const cardTop = 3.1, cardH = 3.6, gap = 0.18;
  const totalW = 11.6;
  const cardW = (totalW - 3 * gap) / 4;

  people.forEach((p, i) => {
    const x = 0.9 + i * (cardW + gap);
    // Photo frame (placeholder) — darker card with diagonal hatching feel (we fake with subtle lines)
    s.addShape("rect", {
      x: x, y: cardTop, w: cardW, h: cardH * 0.75,
      fill: { color: "161B26" }, line: { color: LINE, width: 0.5 },
    });
    // hatch lines
    const hatchH = cardH * 0.75;
    for (let k = 0; k < 8; k++) {
      s.addShape("line", {
        x: x + k * 0.4, y: cardTop, w: hatchH, h: hatchH,
        line: { color: "1C2130", width: 0.5 },
      });
    }
    // [ PHOTO ] marker at top right
    s.addShape("rect", {
      x: x + cardW - 1.0, y: cardTop + 0.15, w: 0.85, h: 0.28,
      fill: { type: "none" },
      line: { color: LINE, width: 0.5 },
    });
    s.addText("[ PHOTO ]", {
      x: x + cardW - 1.0, y: cardTop + 0.15, w: 0.85, h: 0.28,
      fontSize: 7.5, fontFace: "Consolas", color: MUTE, charSpacing: 2,
      align: "center", valign: "middle", margin: 0,
    });
    // Big initials
    s.addText(p.initials, {
      x: x + 0.2, y: cardTop + cardH * 0.75 - 0.9, w: cardW - 0.4, h: 0.85,
      fontSize: 48, fontFace: "Georgia", color: CHALK, margin: 0,
    });
    // Info below frame
    s.addText("[ NAME ]", {
      x: x + 0.02, y: cardTop + cardH * 0.75 + 0.08, w: cardW, h: 0.32,
      fontSize: 14, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
    });
    s.addText(p.role, {
      x: x + 0.02, y: cardTop + cardH * 0.75 + 0.42, w: cardW, h: 0.25,
      fontSize: 9, fontFace: "Consolas", color: KICKOFF, charSpacing: 3, margin: 0,
    });
    s.addText(p.bio, {
      x: x + 0.02, y: cardTop + cardH * 0.75 + 0.68, w: cardW, h: 0.55,
      fontSize: 10, fontFace: "Calibri", color: MUTE, margin: 0,
    });
  });
}

// ============================================================================
// SLIDE 12 — Risks
// ============================================================================
{
  const s = pres.addSlide();
  addFrame(s, 12, "RISK", "RISKS & MITIGATIONS", "§12");

  s.addText("What could go wrong.", {
    x: 0.9, y: 1.1, w: 12, h: 1.1,
    fontSize: 48, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
  });

  const risks = [
    { id: "R.01", name: "INCUMBENT LOCK-IN",     sev: "HIGH",   sevColor: KICKOFF,   mit: "Differentiate hard on narrative + crossplay.", tail: "Don't fight on licensed rosters; lead with story modes and crossplay parity day one." },
    { id: "R.02", name: "LICENSING GAPS",        sev: "HIGH",   sevColor: KICKOFF,   mit: "Pursue mid-tier leagues + player unions.",   tail: "Fictional alternatives at launch, real licensing layered in Year 2 via partnerships." },
    { id: "R.03", name: "NETCODE AT SCALE",      sev: "MEDIUM", sevColor: FLOODLIGHT,mit: "Closed beta of 50k in Q4 2026.",             tail: "Early regional stress tests; sub-60ms target validated before open beta." },
    { id: "R.04", name: "SCOPE CREEP",           sev: "MEDIUM", sevColor: FLOODLIGHT,mit: "Ship five modes, not fifteen.",              tail: "Locked feature set post-alpha; anything new lands in seasons." },
    { id: "R.05", name: "MONETIZATION BACKLASH", sev: "LOW",    sevColor: "7BC47F",  mit: "Cosmetic-only, no loot boxes, transparent odds.", tail: "Publicly published monetization charter at launch." },
  ];

  const tableTop = 2.65;
  const rowH = 0.72;
  s.addShape("line", {
    x: 0.9, y: tableTop, w: 11.6, h: 0, line: { color: LINE, width: 0.5 },
  });
  risks.forEach((r, i) => {
    const y = tableTop + i * rowH + 0.1;
    s.addText(r.id, {
      x: 0.9, y: y + 0.1, w: 0.8, h: 0.3,
      fontSize: 9.5, fontFace: "Consolas", color: MUTE_2, charSpacing: 3, margin: 0,
    });
    s.addText(r.name, {
      x: 1.9, y: y + 0.05, w: 3.8, h: 0.45,
      fontSize: 16, fontFace: "Arial Black", bold: true, color: CHALK, margin: 0,
    });
    // severity pill
    s.addShape("rect", {
      x: 6.0, y: y + 0.1, w: 0.95, h: 0.35,
      fill: { type: "none" },
      line: { color: r.sevColor, width: 0.75 },
    });
    s.addText(r.sev, {
      x: 6.0, y: y + 0.1, w: 0.95, h: 0.35,
      fontSize: 9, fontFace: "Consolas", color: r.sevColor, charSpacing: 3,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
    // mitigation
    s.addText([
      { text: r.mit + " ", options: { color: CHALK, bold: true } },
      { text: r.tail, options: { color: MUTE } },
    ], {
      x: 7.3, y: y + 0.05, w: 5.2, h: 0.6,
      fontSize: 10.5, fontFace: "Calibri", margin: 0,
    });

    // divider after row
    s.addShape("line", {
      x: 0.9, y: tableTop + (i + 1) * rowH, w: 11.6, h: 0,
      line: { color: LINE, width: 0.5 },
    });
  });
}

// ---- Write ------------------------------------------------------------------
pres.writeFile({ fileName: "SoccerX_Pitch_Deck.pptx" })
  .then(fileName => console.log(`Wrote ${fileName}`))
  .catch(err => { console.error(err); process.exit(1); });
