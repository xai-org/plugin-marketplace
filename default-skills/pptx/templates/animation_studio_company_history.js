// Pixar history deck - pptxgenjs replica
const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in

// Palette
const NAVY = "141B34";
const CREAM = "F0E9DC";
const ORANGE = "E89B3C";
const TEAL = "2E8B86";
const RED = "C0533E";
const MUTED_DARK = "8A8FA3";   // muted label on navy
const MUTED_LIGHT = "9A8F7E";  // muted label on cream
const BODY_NAVY = "141B34";
const BODY_ON_DARK = "F0E9DC";

const H_FONT = "Arial";        // bold sans for headers
const B_FONT = "Calibri";

// Helpers for repeated elements
function eyebrow(slide, text, onDark) {
  slide.addText(text, {
    x: 0.55, y: 0.55, w: 6, h: 0.4,
    fontFace: "Consolas", fontSize: 11,
    color: onDark ? MUTED_DARK : MUTED_LIGHT,
    charSpacing: 4, bold: false,
  });
}

function title(slide, text, onDark, opts = {}) {
  slide.addText(text, {
    x: 0.55, y: opts.y ?? 0.9, w: opts.w ?? 12, h: opts.h ?? 1.1,
    fontFace: H_FONT, fontSize: opts.size ?? 44, bold: true,
    color: onDark ? CREAM : NAVY, margin: 0,
  });
}

function subtitle(slide, text, onDark, y = 2.0) {
  slide.addText(text, {
    x: 0.55, y, w: 10, h: 0.5,
    fontFace: B_FONT, fontSize: 18,
    color: onDark ? BODY_ON_DARK : BODY_NAVY, margin: 0,
  });
}

// ==================== SLIDE 1: Title ====================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addText("REEL 01 · 1979 — PRESENT", {
    x: 0.7, y: 1.3, w: 8, h: 0.4,
    fontFace: "Consolas", fontSize: 12, color: ORANGE,
    charSpacing: 6, bold: false,
  });

  // "History of a" line
  s.addText(
    [
      { text: "History of ", options: { bold: true } },
      { text: "a", options: { italic: true, bold: false } },
    ],
    {
      x: 0.7, y: 1.9, w: 12, h: 1.6,
      fontFace: H_FONT, fontSize: 88, color: CREAM, margin: 0,
    }
  );

  // "studio ." line with orange square as the period
  s.addText("studio", {
    x: 0.7, y: 3.4, w: 6, h: 1.6,
    fontFace: H_FONT, fontSize: 88, italic: true, color: CREAM, margin: 0,
  });
  // Orange square period
  s.addShape("rect", {
    x: 4.2, y: 4.55, w: 0.38, h: 0.38, fill: { color: ORANGE }, line: { color: ORANGE },
  });

  s.addText("Pixar Animation Studios — from graphics lab to feature film", {
    x: 0.7, y: 5.3, w: 11, h: 0.5,
    fontFace: B_FONT, fontSize: 18, color: "B8BCCC", margin: 0,
  });
}

// ==================== SLIDE 2: What is Pixar? ====================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "02 / OVERVIEW", false);
  title(s, [
    { text: "What is Pixar", options: { bold: true, color: NAVY } },
    { text: "?", options: { bold: true, color: ORANGE } },
  ], false, { size: 54 });

  // Subtitle / description (italic)
  s.addText("An American computer animation studio that\npioneered the feature-length CG film.", {
    x: 0.55, y: 2.7, w: 6.5, h: 1.0,
    fontFace: B_FONT, fontSize: 18, italic: true, color: "7D7366", margin: 0,
  });

  // Stats grid - 2x2
  const statX = [0.55, 3.3];
  const statY = [4.0, 5.1];
  const stats = [
    ["FOUNDED", "1986"],
    ["HQ", "Emeryville, CA"],
    ["FEATURE FILMS", "28+"],
    ["ACADEMY AWARDS", "23+"],
  ];
  stats.forEach((st, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    // Emeryville,CA is long; use smaller font
    const valSize = st[1] === "Emeryville, CA" ? 22 : 32;
    s.addText(st[0], {
      x: statX[col], y: statY[row], w: 2.7, h: 0.3,
      fontFace: "Consolas", fontSize: 10, color: MUTED_LIGHT, charSpacing: 3, margin: 0,
    });
    s.addText(st[1], {
      x: statX[col], y: statY[row] + 0.33, w: 2.8, h: 0.6,
      fontFace: H_FONT, fontSize: valSize, bold: true, color: NAVY, margin: 0,
    });
  });

  // Three-legged stool diagram on right
  // Circles: TECH top, STORY bottom-left, ART bottom-right
  const cx = 9.4, cy1 = 2.8, cy2 = 4.7;
  const dx = 1.15;
  const R = 0.9; // radius

  // (Old approximate lines removed — see drawDashLine below for correct ones.)
  // TECH center: (cx+R, cy1+R)
  // STORY center: (cx+R - dx, cy2+R)  - to bottom-left
  // ART center: (cx+R + dx, cy2+R)    - to bottom-right
  // clearing previous lines is fine; they'll render anyway. Add correct ones:
  const tC = { x: cx + R, y: cy1 + R };
  const sC = { x: cx + R - dx, y: cy2 + R };
  const aC = { x: cx + R + dx, y: cy2 + R };

  const drawDashLine = (p1, p2) => s.addShape("line", {
    x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y),
    w: Math.max(0.01, Math.abs(p2.x - p1.x)),
    h: Math.max(0.01, Math.abs(p2.y - p1.y)),
    line: { color: NAVY, width: 1, dashType: "dash" },
    flipH: p1.x > p2.x, flipV: p1.y > p2.y,
  });
  drawDashLine(tC, sC);
  drawDashLine(tC, aC);
  drawDashLine(sC, aC);

  // Circles on top of lines
  const circle = (x, y, color, num, label) => {
    s.addShape("ellipse", {
      x, y, w: R*2, h: R*2,
      fill: { color }, line: { color, width: 0 },
    });
    s.addText(num, {
      x, y: y+0.25, w: R*2, h: 0.3,
      fontFace: B_FONT, fontSize: 10, color: CREAM, align: "center", margin: 0,
    });
    s.addText(label, {
      x, y: y+0.6, w: R*2, h: 0.5,
      fontFace: "Georgia", fontSize: 16, bold: true, color: CREAM, align: "center", margin: 0,
    });
  };
  circle(cx, cy1, NAVY, "01", "TECH");
  circle(cx - dx, cy2, ORANGE, "02", "STORY");
  circle(cx + dx, cy2, TEAL, "03", "ART");

  s.addText("The three-legged stool of the studio", {
    x: 7.5, y: 6.7, w: 4.5, h: 0.4,
    fontFace: B_FONT, fontSize: 11, italic: true, color: MUTED_LIGHT, align: "center", margin: 0,
  });
}

// ==================== SLIDE 3: Origins ====================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "03 / ORIGINS", false);
  title(s, "Origins", false);
  subtitle(s, "A graphics group looking for a home.", false);

  // 4-step timeline
  const steps = [
    { year: "1974", head: "NYIT Lab", desc: "Ed Catmull joins computer graphics research", color: NAVY, icon: "▦" },
    { year: "1979", head: "Lucasfilm", desc: "Computer Division formed by G. Lucas", color: ORANGE, icon: "✦" },
    { year: "1984", head: "Lasseter", desc: "Animator John Lasseter joins the group", color: TEAL, icon: "∞" },
    { year: "1986", head: "Spun Out", desc: "Steve Jobs buys the group for $10M; Pixar is born", color: NAVY, icon: "N" },
  ];

  // Horizontal line
  s.addShape("line", {
    x: 0.9, y: 4.55, w: 11.5, h: 0.01,
    line: { color: NAVY, width: 1.5 },
  });

  const colW = 2.85;
  const startX = 0.75;
  steps.forEach((st, i) => {
    const x = startX + i * colW;
    // Year
    s.addText(st.year, {
      x, y: 3.1, w: colW, h: 0.35,
      fontFace: "Consolas", fontSize: 12, color: MUTED_LIGHT, align: "center", margin: 0,
    });
    // Icon circle
    const cxC = x + colW/2 - 0.45;
    s.addShape("ellipse", {
      x: cxC, y: 3.55, w: 0.9, h: 0.9,
      fill: { color: st.color }, line: { color: st.color, width: 0 },
    });
    s.addText(st.icon, {
      x: cxC, y: 3.6, w: 0.9, h: 0.8,
      fontFace: "Arial", fontSize: 24, bold: true, color: CREAM, align: "center", valign: "middle", margin: 0,
    });
    // Head
    s.addText(st.head, {
      x, y: 4.75, w: colW, h: 0.4,
      fontFace: H_FONT, fontSize: 16, bold: true, color: NAVY, align: "center", margin: 0,
    });
    // Desc
    s.addText(st.desc, {
      x: x + 0.2, y: 5.2, w: colW - 0.4, h: 0.8,
      fontFace: B_FONT, fontSize: 12, color: "4A5568", align: "center", margin: 0,
    });
  });
}

// ==================== SLIDE 4: Struggles ====================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  eyebrow(s, "04 / 1986–1991", true);
  title(s, "Struggles", true);
  subtitle(s, "Five years of burning cash to stay alive.", true);

  // Left: chart label + chart
  s.addText("APPROX. CUMULATIVE LOSSES", {
    x: 0.55, y: 3.0, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });

  // Bar chart - ascending. Use pptxgenjs chart
  const chartData = [
    {
      name: "Losses",
      labels: ["'86", "'87", "'88", "'89", "'90", "'91"],
      values: [1.5, 3, 5, 7.5, 10, 12],
    },
  ];
  s.addChart(pres.ChartType.bar, chartData, {
    x: 0.55, y: 3.4, w: 5.8, h: 3.3,
    barDir: "col",
    chartColors: [ORANGE, ORANGE, ORANGE, RED, RED, RED],
    chartColorsOpacity: 100,
    showLegend: false,
    showTitle: false,
    catAxisLabelColor: CREAM,
    catAxisLabelFontFace: B_FONT,
    catAxisLabelFontSize: 11,
    valAxisHidden: true,
    catGridLine: { style: "none" },
    valGridLine: { style: "none" },
    showValue: false,
    barGapWidthPct: 40,
  });

  s.addText("Jobs personally covered the shortfall year after year.", {
    x: 0.55, y: 6.75, w: 7, h: 0.35,
    fontFace: B_FONT, fontSize: 12, color: BODY_ON_DARK, margin: 0,
  });

  // Right: pivots list
  s.addText("PIVOTS, IN ORDER", {
    x: 7.0, y: 3.0, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });

  const pivots = [
    ["01", "Image Computer", "$135K hardware → too few buyers", ORANGE],
    ["02", "RenderMan", "Rendering software, sold to studios", ORANGE],
    ["03", "TV Commercials", "Listerine, Tropicana, Life Savers", ORANGE],
    ["04", "Disney Deal · 1991", "Three-picture feature-film contract", TEAL],
  ];

  let py = 3.4;
  pivots.forEach((p, i) => {
    s.addText(p[0], {
      x: 7.0, y: py, w: 0.8, h: 0.5,
      fontFace: H_FONT, fontSize: 26, color: p[3], margin: 0,
    });
    s.addText(p[1], {
      x: 7.9, y: py, w: 5, h: 0.4,
      fontFace: H_FONT, fontSize: 18, bold: true, color: p[3] === TEAL ? TEAL : CREAM, margin: 0,
    });
    s.addText(p[2], {
      x: 7.9, y: py + 0.42, w: 5, h: 0.35,
      fontFace: B_FONT, fontSize: 12, color: BODY_ON_DARK, margin: 0,
    });
    // Divider line (skip after last)
    if (i < pivots.length - 1) {
      s.addShape("line", {
        x: 7.0, y: py + 0.85, w: 5.8, h: 0.01,
        line: { color: MUTED_DARK, width: 0.5 },
      });
    }
    py += 0.95;
  });
}

// ==================== SLIDE 5: The First Feature ====================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "05 / 1995", false);
  title(s, "Toy Story", false);

  // Date label
  s.addText("NOVEMBER 22, 1995 — RELEASED", {
    x: 0.55, y: 2.5, w: 6, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_LIGHT, charSpacing: 3, margin: 0,
  });

  // Big italic statement - one text block, period colored orange via run
  s.addText(
    [
      { text: "The first", options: { italic: true, color: "D5CFC2", breakLine: true } },
      { text: "feature-length", options: { italic: true, color: "D5CFC2", breakLine: true } },
      { text: "CG film", options: { italic: true, color: "D5CFC2" } },
      { text: ".", options: { italic: true, color: ORANGE } },
    ],
    {
      x: 0.55, y: 2.9, w: 7, h: 3.0,
      fontFace: H_FONT, fontSize: 52, bold: true, margin: 0,
    }
  );

  // Stats row
  const sy = 5.9;
  const statsRow = [
    ["BUDGET", "$30M", CREAM],
    ["BOX OFFICE", "$394M", ORANGE],
    ["PRODUCTION", "4 yrs", CREAM],
  ];
  statsRow.forEach((st, i) => {
    const x = 0.55 + i * 2.4;
    s.addText(st[0], {
      x, y: sy, w: 2.2, h: 0.3,
      fontFace: "Consolas", fontSize: 10, color: MUTED_LIGHT, charSpacing: 3, margin: 0,
    });
    s.addText(st[1], {
      x, y: sy + 0.28, w: 2.2, h: 0.7,
      fontFace: H_FONT, fontSize: 34, bold: true,
      color: st[2] === ORANGE ? ORANGE : "CFC9BD",
      margin: 0,
    });
  });

  // Right: "WHY IT MATTERED" + 4 boxes
  s.addText("WHY IT MATTERED", {
    x: 7.7, y: 2.5, w: 5, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_LIGHT, charSpacing: 3, margin: 0,
  });

  const boxes = [
    { text: "Proved CG at feature length", fill: null, stroke: MUTED_LIGHT, color: "CFC9BD" },
    { text: "Story-first, not tech-first", fill: ORANGE, stroke: null, color: CREAM },
    { text: "Launched a franchise", fill: null, stroke: MUTED_LIGHT, color: "CFC9BD" },
    { text: "Rewrote the animation industry", fill: TEAL, stroke: null, color: CREAM },
  ];

  let by = 2.9;
  boxes.forEach((b) => {
    s.addShape("rect", {
      x: 7.7, y: by, w: 5.1, h: 0.75,
      fill: b.fill ? { color: b.fill } : { type: "none" },
      line: b.stroke ? { color: b.stroke, width: 1 } : { type: "none" },
    });
    s.addText(b.text, {
      x: 7.9, y: by, w: 4.9, h: 0.75,
      fontFace: H_FONT, fontSize: 15, bold: true, color: b.color, valign: "middle", margin: 0,
    });
    by += 0.9;
  });
}

// ==================== SLIDE 6: Golden Age ====================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "06 / 1998–2010", false);
  title(s, "Golden Age", false);
  subtitle(s, "A decade of hit after hit.", false);

  // 5x2 grid of film tiles
  const films = [
    { year: "1998", title: "A Bug's Life",   bg: TEAL,   fg: CREAM },
    { year: "2001", title: "Monsters, Inc.", bg: ORANGE, fg: NAVY },
    { year: "2003", title: "Finding Nemo",   bg: NAVY,   fg: CREAM },
    { year: "2004", title: "The Incredibles",bg: RED,    fg: CREAM },
    { year: "2006", title: "Cars",           bg: "F5EEE0", fg: NAVY, border: true },
    { year: "2007", title: "Ratatouille",    bg: ORANGE, fg: NAVY },
    { year: "2008", title: "WALL·E",         bg: TEAL,   fg: CREAM },
    { year: "2009", title: "Up",             bg: NAVY,   fg: CREAM },
    { year: "2010", title: "Toy Story 3",    bg: RED,    fg: CREAM },
    { year: null,   title: "11 FILMS\n11 YEARS\nZERO FLOPS", bg: null, fg: NAVY, dashed: true },
  ];

  const cellW = 2.3, cellH = 1.9;
  const gapX = 0.15, gapY = 0.2;
  const startGX = 0.55, startGY = 3.15;

  films.forEach((f, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = startGX + col * (cellW + gapX);
    const y = startGY + row * (cellH + gapY);

    if (f.dashed) {
      s.addShape("rect", {
        x, y, w: cellW, h: cellH,
        fill: { type: "none" },
        line: { color: MUTED_LIGHT, width: 1, dashType: "dash" },
      });
    } else {
      s.addShape("rect", {
        x, y, w: cellW, h: cellH,
        fill: { color: f.bg },
        line: f.border ? { color: MUTED_LIGHT, width: 1 } : { type: "none" },
      });
    }

    if (f.year) {
      s.addText(f.year, {
        x: x + 0.15, y: y + 0.12, w: cellW - 0.2, h: 0.3,
        fontFace: B_FONT, fontSize: 11, color: f.fg, margin: 0,
      });
      s.addText(f.title, {
        x: x + 0.15, y: y + cellH - 0.5, w: cellW - 0.2, h: 0.4,
        fontFace: H_FONT, fontSize: 14, bold: true, color: f.fg, margin: 0,
      });
    } else {
      s.addText(f.title, {
        x, y, w: cellW, h: cellH,
        fontFace: B_FONT, fontSize: 14, color: f.fg,
        align: "center", valign: "middle", margin: 0,
      });
    }
  });
}

// ==================== SLIDE 7: Acquisition ====================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  eyebrow(s, "07 / JANUARY 2006", false);
  title(s, "Acquisition", false);
  subtitle(s, "From partner to subsidiary.", false);

  // Two cards + arrow + $7.4B in between
  // Left card (outlined on cream)
  const LcardX = 0.55, LcardY = 3.0, LcardW = 5.3, LcardH = 2.7;
  s.addShape("rect", {
    x: LcardX, y: LcardY, w: LcardW, h: LcardH,
    fill: { color: CREAM }, line: { color: NAVY, width: 1.5 },
  });
  s.addText("ACQUIRER", {
    x: LcardX + 0.25, y: LcardY + 0.2, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED_LIGHT, charSpacing: 3, margin: 0,
  });
  s.addText("The Walt Disney\nCo.", {
    x: LcardX + 0.25, y: LcardY + 0.6, w: LcardW - 0.5, h: 1.5,
    fontFace: H_FONT, fontSize: 32, bold: true, color: "CFC9BD", margin: 0,
  });
  s.addText("NYSE: DIS", {
    x: LcardX + 0.25, y: LcardY + LcardH - 0.5, w: 3, h: 0.3,
    fontFace: B_FONT, fontSize: 12, color: "7D7366", margin: 0,
  });

  // Middle: arrow + $7.4B
  s.addShape("line", {
    x: 6.05, y: 3.9, w: 1.35, h: 0.01,
    line: { color: NAVY, width: 2, endArrowType: "triangle" },
  });
  s.addText("$7.4B", {
    x: 5.85, y: 4.15, w: 1.7, h: 0.5,
    fontFace: H_FONT, fontSize: 24, bold: true, color: ORANGE, align: "center", margin: 0,
  });
  s.addText("ALL-STOCK\nDEAL", {
    x: 5.85, y: 4.65, w: 1.7, h: 0.6,
    fontFace: "Consolas", fontSize: 9, color: MUTED_LIGHT, charSpacing: 2, align: "center", margin: 0,
  });

  // Right card (navy fill)
  const RcardX = 7.55, RcardY = 3.0, RcardW = 5.3, RcardH = 2.7;
  s.addShape("rect", {
    x: RcardX, y: RcardY, w: RcardW, h: RcardH,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 },
  });
  s.addText("ACQUIRED", {
    x: RcardX + 0.25, y: RcardY + 0.2, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 10, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });
  s.addText("Pixar Animation", {
    x: RcardX + 0.25, y: RcardY + 0.6, w: RcardW - 0.5, h: 1.5,
    fontFace: H_FONT, fontSize: 32, bold: true, color: CREAM, margin: 0,
  });
  s.addText("NASDAQ: PIXR (delisted)", {
    x: RcardX + 0.25, y: RcardY + RcardH - 0.5, w: 4, h: 0.3,
    fontFace: B_FONT, fontSize: 12, color: BODY_ON_DARK, margin: 0,
  });

  // Bottom row: 3 items with colored dots
  const bItems = [
    { color: ORANGE, head: "Jobs → largest Disney shareholder", sub: "~7% stake post-merger" },
    { color: TEAL,   head: "Catmull & Lasseter → lead Disney Animation", sub: "Creative leadership across both studios" },
    { color: RED,    head: "Pixar culture preserved", sub: "Emeryville campus, brain trust, independence" },
  ];
  bItems.forEach((b, i) => {
    const x = 0.55 + i * 4.25;
    s.addShape("ellipse", {
      x, y: 6.0, w: 0.3, h: 0.3, fill: { color: b.color }, line: { color: b.color },
    });
    s.addText(b.head, {
      x, y: 6.4, w: 4.0, h: 0.5,
      fontFace: H_FONT, fontSize: 13, bold: true, color: "CFC9BD", margin: 0,
    });
    s.addText(b.sub, {
      x, y: 6.85, w: 4.0, h: 0.4,
      fontFace: B_FONT, fontSize: 11, color: "7D7366", margin: 0,
    });
  });
}

// ==================== SLIDE 8: Today ====================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  eyebrow(s, "08 / 2026", true);
  title(s, "Today", true);
  subtitle(s, "A maturing studio in a shifting industry.", true);

  // Left column: BY THE NUMBERS
  s.addText("BY THE NUMBERS", {
    x: 0.55, y: 2.9, w: 5, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });

  const nums = [
    { big: "$15B+", bigColor: ORANGE, label: "Lifetime global box office" },
    { big: "1,200+", bigColor: TEAL, label: "Employees in Emeryville" },
    { big: "Disney+", bigColor: CREAM, label: "Primary distribution channel" },
  ];
  let ny = 3.3;
  nums.forEach((n, i) => {
    s.addText(n.big, {
      x: 0.55, y: ny, w: 6, h: 0.85,
      fontFace: H_FONT, fontSize: 44, bold: true, color: n.bigColor, margin: 0,
    });
    s.addText(n.label, {
      x: 0.55, y: ny + 0.85, w: 6, h: 0.35,
      fontFace: B_FONT, fontSize: 14, color: BODY_ON_DARK, margin: 0,
    });
    if (i < nums.length - 1) {
      s.addShape("line", {
        x: 0.55, y: ny + 1.3, w: 5.5, h: 0.01,
        line: { color: "3A4057", width: 0.75 },
      });
    }
    ny += 1.4;
  });

  // Right column: WHAT'S CHANGED
  s.addText("WHAT'S CHANGED", {
    x: 7.2, y: 2.9, w: 5, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });

  const changes = [
    ["Theatrical-first", "Streaming-first windows", ORANGE],
    ["Original IP",      "Mix of originals + sequels", TEAL],
    ["Features only",    "Features + series + shorts", null],
    ["In-house tools",   "AI + real-time pipelines", RED],
  ];
  let cy = 3.3;
  changes.forEach(([left, right, fill]) => {
    // Left box (outlined)
    s.addShape("rect", {
      x: 7.2, y: cy, w: 2.7, h: 0.7,
      fill: { type: "none" },
      line: { color: MUTED_DARK, width: 1 },
    });
    s.addText(left, {
      x: 7.3, y: cy, w: 2.5, h: 0.7,
      fontFace: B_FONT, fontSize: 13, color: BODY_ON_DARK, valign: "middle", margin: 0,
    });
    // Arrow
    s.addText("→", {
      x: 9.95, y: cy, w: 0.5, h: 0.7,
      fontFace: B_FONT, fontSize: 16, color: ORANGE, align: "center", valign: "middle", margin: 0,
    });
    // Right box
    s.addShape("rect", {
      x: 10.5, y: cy, w: 2.4, h: 0.7,
      fill: fill ? { color: fill } : { type: "none" },
      line: fill ? { type: "none" } : { color: MUTED_DARK, width: 1 },
    });
    s.addText(right, {
      x: 10.6, y: cy, w: 2.2, h: 0.7,
      fontFace: H_FONT, fontSize: 12, bold: true,
      color: fill ? CREAM : BODY_ON_DARK, valign: "middle", margin: 0,
    });
    cy += 0.85;
  });

  // END REEL footer
  s.addText("— END REEL —", {
    x: 7.2, y: 6.9, w: 4, h: 0.3,
    fontFace: "Consolas", fontSize: 11, color: MUTED_DARK, charSpacing: 3, margin: 0,
  });
}

pres.writeFile({ fileName: "/home/assets/Pixar_replica.pptx" }).then((f) => {
  console.log("Wrote:", f);
});
