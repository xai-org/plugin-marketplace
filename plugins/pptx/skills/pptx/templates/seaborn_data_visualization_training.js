// Seaborn training deck
const pptxgen = require("pptxgenjs");

const P = "/home/assets/plots";
const DIMS = {"annotated_bars":[9940,7285],"ctx_notebook":[8744,5896],"ctx_talk":[9109,6191],"despine_after":[8778,6250],"despine_before":[8778,6250],"heatmap":[9924,6951],"kdeplot":[10205,6564],"mpl_bar":[9815,6666],"mpl_scatter":[9808,6673],"regplot":[9808,6564],"relplot":[12273,6040],"sns_bar":[9815,6666],"sns_scatter":[9808,6673],"title_bg":[3990,2250],"violin":[9815,6557]};
const dim = (name) => {
  const [w, h] = DIMS[name];
  return { w, h, ratio: w / h };
};

// Palette (3 colors + ink)
const TEAL = "1F4E5F";
const CORAL = "E07856";
const CREAM = "F4EAD5";
const INK = "2B2B2B";
const MUTED = "8A8378";

const FH = "Georgia";       // header font
const FB = "Calibri";       // body font

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title = "Seaborn: A Case for Switching";
pres.author = "Senior DS";

const SW = 13.3, SH = 7.5;

// Helpers
function bg(slide, color = CREAM) {
  slide.background = { color };
}

function pageFurniture(slide, pageNum, totalPages, section = "") {
  const sectionMap = {
    "motivation": "basics",
    "basics":     "basics",
    "simplifies": "simplifies",
    "tips":       "tips",
  };
  const currentKey = sectionMap[section.toLowerCase()] || "";

  const run = (label, key) => {
    const isCurrent = key === currentKey;
    return {
      text: label,
      options: {
        color: isCurrent ? CORAL : MUTED,
        bold: isCurrent,
        charSpacing: 3,
      },
    };
  };
  const sep = { text: "     ", options: { color: MUTED, charSpacing: 0 } };
  const pageStr = `${String(pageNum).padStart(2,"0")} / ${String(totalPages).padStart(2,"0")}`;

  // Header upper-right: breadcrumb + page number, single rich-text box, right-aligned
  slide.addText([
    run("BASICS", "basics"),
    sep,
    run("SIMPLIFIES", "simplifies"),
    sep,
    run("TIPS", "tips"),
    { text: "     ·     ", options: { color: MUTED } },
    { text: pageStr, options: { color: MUTED } },
  ], {
    x: SW - 7.5 - 0.6, y: 0.4, w: 7.5, h: 0.3,
    fontFace: FB, fontSize: 10,
    margin: 0, align: "right", valign: "middle",
  });
}

// --- Typographic system ---
// Every content slide uses the same horizontal bands:
//   header:       y=0.35–0.55  (breadcrumb + page num, right-aligned)
//   title:        y=0.75–1.40  (Georgia bold 32pt)
//   subtitle:     y=1.45–1.80  (Calibri italic 14pt)
//   rule:         y=1.95       (coral hairline, spans content width)
//   content:      y=2.20–6.70  (never extends past 6.70)

function title(slide, text, { y = 0.75, color = TEAL } = {}) {
  slide.addText(text, {
    x: 0.6, y, w: SW - 1.2, h: 0.65,
    fontFace: FH, fontSize: 32, bold: true, color, margin: 0, align: "left",
    valign: "middle",
  });
}

function subtitle(slide, text, { y = 1.45 } = {}) {
  slide.addText(text, {
    x: 0.6, y, w: SW - 1.2, h: 0.35,
    fontFace: FB, fontSize: 14, italic: true, color: MUTED, margin: 0, align: "left",
  });
}

// Hairline coral rule — visual anchor for the top of the content area.
function rule(slide, { y = 1.95, x = 0.6, w = SW - 1.2, color = CORAL, thickness = 0.012 } = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: thickness,
    fill: { color }, line: { color, width: 0 },
  });
}

// Section eyebrow: small charSpaced coral label.
function eyebrow(slide, text, { x = 0.6, y = 0.75, color = CORAL } = {}) {
  slide.addText(text, {
    x, y, w: 8, h: 0.3,
    fontFace: FB, fontSize: 10, color, charSpacing: 3, bold: true, margin: 0, align: "left",
  });
}

// Fit an image within (maxW x maxH), returning placement.
function fit(name, x, y, maxW, maxH) {
  const d = dim(name);
  let w = maxW, h = maxW / d.ratio;
  if (h > maxH) { h = maxH; w = maxH * d.ratio; }
  return { path: `${P}/${name}.svg`, x: x + (maxW - w)/2, y: y + (maxH - h)/2, w, h };
}

// Place an image using its natural aspect ratio. Specify target height; width is derived.
function plotByH(name, x, y, h) {
  const d = dim(name);
  return { path: `${P}/${name}.svg`, x, y, w: h * d.ratio, h };
}

// Place an image using its natural aspect ratio. Specify target width; height is derived.
function plotByW(name, x, y, w) {
  const d = dim(name);
  return { path: `${P}/${name}.svg`, x, y, w, h: w / d.ratio };
}

// Place a padded image in a fixed box. For padded images we don't need centering —
// the cream padding IS the frame, so we fill the box exactly.
function box(name, x, y, w, h) {
  return { path: `${P}/${name}_padded.png`, x, y, w, h };
}

// --- Code snippet library (rendered natively with syntax highlighting) ---
const SNIPPETS = {
  install: `# install
pip install seaborn

# typical imports
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid")`,

  mpl_bar: `m = tips.groupby("day").total_bill.mean()
fig, ax = plt.subplots()
ax.bar(m.index, m.values)
ax.set_ylabel("total_bill")`,

  sns_bar: `sns.barplot(
    data=tips, x="day", y="total_bill",
    errorbar=("ci", 95),
)`,

  mpl_scatter: `fig, ax = plt.subplots()
for k, g in tips.groupby("smoker"):
    ax.scatter(g["total_bill"], g["tip"],
               label=k, alpha=0.7)
ax.legend(title="smoker")`,

  sns_scatter: `sns.scatterplot(
    data=tips, x="total_bill", y="tip",
    hue="smoker",
)`,

  regplot: `# scatter + OLS + CI band
sns.regplot(
    data=tips,
    x="total_bill", y="tip",
    ci=95,
    order=1,
    scatter_kws={"alpha": 0.5},
)
# Tip: lmplot() to facet`,

  kde: `# smoothed density per group
sns.kdeplot(
    data=tips,
    x="total_bill",
    hue="time",
    fill=True,
    bw_adjust=1.0,
    common_norm=False,
)
# Same grammar: histplot, ecdfplot`,

  heatmap: `# pivot first, then plot
pivot = flights.pivot(
    index="month",
    columns="year",
    values="passengers",
)
sns.heatmap(
    pivot,
    annot=False,
    cmap="rocket",
)`,

  relplot: `# col= facets into a grid
sns.relplot(
    data=tips,
    x="total_bill", y="tip",
    col="time",
    hue="smoker",
    kind="scatter",
    height=3, aspect=1.2,
)
# Tip: add row= for a 2D grid`,

  violin: `# split=True mirrors the halves
sns.violinplot(
    data=tips,
    x="day", y="total_bill",
    hue="sex",
    split=True,
    inner="quart",
    cut=0,
)
# Great for A/B shape compare`,

  theme: `# set once, affects every plot
sns.set_theme(
    style="whitegrid", context="talk",
)`,

  despine: `# editorial look in one call
sns.barplot(data=tips, x="day", y="tip")
sns.despine()   # drop top + right`,

  drop_to_mpl: `# sns draws, mpl annotates
ax = sns.barplot(
    data=tips, x="day", y="tip",
)
ax.annotate(
    "peak: $3.26",
    xy=(3, 3.26), xytext=(1.6, 3.7),
    arrowprops={"arrowstyle": "->"},
)
ax.axhline(3.26, ls="--")`,
};

// --- codeBlock: native text-run python syntax highlighting ---
// Renders python code as sharp, vector text with keyword/string/comment colors.
// Takes the slide, code string, and position options (x, y, w, h, fontSize).
const PY_KEYWORDS = new Set([
  "import","from","as","for","in","if","else","elif","def","return","True","False",
  "None","and","or","not","is","with","while","try","except","raise","class","lambda",
  "pass","break","continue","yield","global","nonlocal","assert",
]);
const KW_COLOR   = CORAL;
const STR_COLOR  = TEAL;
const NUM_COLOR  = CORAL;
const CMNT_COLOR = MUTED;
const FN_COLOR   = TEAL;
const DEF_COLOR  = INK;

function tokenizeLine(line) {
  // Returns an array of {text, color, italic} for a single python line.
  // Tokenizes left-to-right. Handles:
  //   - comments (# to end-of-line) → muted italic
  //   - strings ("..." and '...') → teal
  //   - numbers → coral
  //   - keywords → coral bold
  //   - identifiers followed by "(" → teal (function call)
  //   - everything else → ink
  const tokens = [];
  let i = 0;
  const n = line.length;

  // Preserve leading whitespace as one token
  let ws = "";
  while (i < n && (line[i] === " " || line[i] === "\t")) {
    ws += line[i];
    i++;
  }
  if (ws) tokens.push({ text: ws, color: DEF_COLOR });

  while (i < n) {
    const ch = line[i];

    // Comment
    if (ch === "#") {
      tokens.push({ text: line.slice(i), color: CMNT_COLOR, italic: true });
      i = n;
      break;
    }

    // String
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n && line[j] !== quote) j++;
      const end = Math.min(j + 1, n);
      tokens.push({ text: line.slice(i, end), color: STR_COLOR });
      i = end;
      continue;
    }

    // Number (digit or .digit)
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < n && /[0-9.]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), color: NUM_COLOR });
      i = j;
      continue;
    }

    // Identifier or keyword
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (PY_KEYWORDS.has(word)) {
        tokens.push({ text: word, color: KW_COLOR, bold: true });
      } else if (line[j] === "(") {
        tokens.push({ text: word, color: FN_COLOR });
      } else {
        tokens.push({ text: word, color: DEF_COLOR });
      }
      i = j;
      continue;
    }

    // Anything else: single char
    tokens.push({ text: ch, color: DEF_COLOR });
    i++;
  }

  return tokens;
}

function codeBlock(slide, code, opts) {
  // opts: { x, y, w, h, fontSize }
  const fontSize = opts.fontSize || 14;
  const lines = code.replace(/\t/g, "    ").split("\n");
  // Build a flat run array with breakLine on each line.
  const runs = [];
  lines.forEach((line, idx) => {
    const lineTokens = tokenizeLine(line);
    if (lineTokens.length === 0) {
      // Empty line — push a single space run so pptxgenjs gives it height
      runs.push({ text: " ", options: { breakLine: true, color: DEF_COLOR } });
      return;
    }
    lineTokens.forEach((t, tIdx) => {
      const isLast = tIdx === lineTokens.length - 1;
      const options = {
        color: t.color,
        bold: !!t.bold,
        italic: !!t.italic,
      };
      if (isLast && idx < lines.length - 1) options.breakLine = true;
      runs.push({ text: t.text, options });
    });
  });

  slide.addText(runs, {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    fontFace: "Consolas", fontSize,
    margin: 0, align: "left", valign: "top",
    paraSpaceAfter: 0,
  });
}

// ============ SLIDE 1 — TITLE ============
const TOTAL = 17;
{
  const s = pres.addSlide();
  s.background = { path: `${P}/title_bg.png` };

  // Eyebrow
  s.addText("A TECHNICAL TRAINING", {
    x: 0.9, y: 1.79, w: 7, h: 0.4,
    fontFace: FB, fontSize: 13, color: CORAL, charSpacing: 4, margin: 0,
  });

  // Title
  s.addText("Seaborn,", {
    x: 0.9, y: 2.29, w: 7.5, h: 1.5,
    fontFace: FH, fontSize: 80, bold: true, color: CREAM, margin: 0,
  });
  s.addText([
    { text: "not just ", options: { color: CREAM } },
    { text: "matplotlib", options: { color: CORAL, italic: true } },
    { text: ".", options: { color: CREAM } },
  ], {
    x: 0.9, y: 3.39, w: 8.45, h: 1.5,
    fontFace: FH, fontSize: 58, bold: true, margin: 0,
  });

  // Subtitle
  s.addText("Why our plotting code should look a lot more like English.", {
    x: 0.9, y: 4.99, w: 7.5, h: 0.5,
    fontFace: FB, fontSize: 18, italic: true, color: CREAM, margin: 0,
  });

  // Byline bottom
  s.addText("Data Science Guild  ·  Internal Training", {
    x: 0.9, y: 6.85, w: 10, h: 0.35,
    fontFace: FB, fontSize: 12, color: MUTED, charSpacing: 2, margin: 0,
  });
}

// ============ SLIDE 2 — WHY THIS TALK ============
{
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, 2, TOTAL, "Motivation");
  title(s, "Why this talk");
  subtitle(s, "Matplotlib is powerful. It is also slow to write.");
  rule(s);

  // Three rows: eyebrow label on the left, heading + body on the right.
  // Consistent vertical rhythm, no large decorative numerals.
  const rows = [
    ["SHORTER",    "You already know pandas.",   "Most of the plots we make are boilerplate wrapped around a groupby."],
    ["PRETTIER",   "Our charts look dated.",     "Default matplotlib screams 2008. Readers notice."],
    ["COMPATIBLE", "Seaborn is a thin layer.",   "Same matplotlib under the hood, so you lose nothing and just type less."],
  ];
  const labelX = 0.6,  labelW = 2.3;
  const textX  = 3.1,  textW  = SW - 3.1 - 0.6;
  let y = 2.35;
  rows.forEach(([lbl, h, b]) => {
    // Eyebrow label, top-aligned with heading's cap-height
    s.addText(lbl, {
      x: labelX, y: y + 0.12, w: labelW, h: 0.3,
      fontFace: FB, fontSize: 12, color: CORAL, charSpacing: 3, bold: true,
      margin: 0, align: "left",
    });
    s.addText(h, {
      x: textX, y, w: textW, h: 0.5,
      fontFace: FH, fontSize: 24, bold: true, color: TEAL,
      valign: "top", margin: 0,
    });
    s.addText(b, {
      x: textX, y: y + 0.58, w: textW, h: 0.45,
      fontFace: FB, fontSize: 16, color: INK,
      valign: "top", margin: 0,
    });
    y += 1.55;
  });
}

// ============ SLIDE 3 — WHAT IS SEABORN ============
{
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, 3, TOTAL, "Basics");
  title(s, "What is seaborn?");
  subtitle(s, "A statistical plotting library built on top of matplotlib.");
  rule(s);

  // Left column: four points. Small coral square as list marker, then text.
  const bullets = [
    ["Tidy-first API",         "Pass DataFrame columns by name, not values."],
    ["Statistical defaults",   "Confidence intervals, KDEs, and regressions are all built in."],
    ["Opinionated themes",     "Fonts, palettes, and grids that work out of the box."],
    ["Always matplotlib",      "Every seaborn chart returns a plain Axes. Zero lock-in."],
  ];
  let y = 2.30;
  bullets.forEach(([h, b]) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: y + 0.14, w: 0.13, h: 0.13,
      fill: { color: CORAL }, line: { color: CORAL, width: 0 },
    });
    s.addText(h, {
      x: 0.95, y, w: 6.5, h: 0.42,
      fontFace: FH, fontSize: 19, bold: true, color: TEAL, margin: 0,
    });
    s.addText(b, {
      x: 0.95, y: y + 0.44, w: 6.5, h: 0.38,
      fontFace: FB, fontSize: 15, color: INK, margin: 0,
    });
    y += 1.15;
  });

  // Right column: the stack card — teal block, horizontal rules between rows.
  const cardX = 8.2, cardY = 2.3, cardW = 4.5, cardH = 4.3;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: TEAL }, line: { color: TEAL, width: 0 },
  });
  s.addText("THE STACK", {
    x: cardX + 0.25, y: cardY + 0.25, w: cardW - 0.5, h: 0.3,
    fontFace: FB, fontSize: 11, color: CORAL, charSpacing: 3, bold: true, margin: 0,
  });
  const stack = [
    ["seaborn",       "high-level, statistical"],
    ["matplotlib",    "low-level, imperative"],
    ["numpy / pandas","the data itself"],
  ];
  let sy = cardY + 0.75;
  const rowH = 1.15;
  stack.forEach(([k, v], i) => {
    s.addText(k, {
      x: cardX + 0.25, y: sy, w: cardW - 0.5, h: 0.45,
      fontFace: FH, fontSize: 22, bold: true, color: CREAM, margin: 0,
    });
    s.addText(v, {
      x: cardX + 0.25, y: sy + 0.48, w: cardW - 0.5, h: 0.3,
      fontFace: FB, fontSize: 13, italic: true, color: CREAM, margin: 0,
    });
    if (i < stack.length - 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cardX + 0.25, y: sy + rowH - 0.1, w: cardW - 0.5, h: 0.008,
        fill: { color: CORAL }, line: { color: CORAL, width: 0 },
      });
    }
    sy += rowH;
  });
}

// ============ SLIDE 4 — INSTALL / IMPORTS ============
{
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, 4, TOTAL, "Basics");
  title(s, "Getting started");
  subtitle(s, "One install, two imports, one line to set a theme.");
  rule(s);

  // Left column: three steps stacked vertically
  const steps = [
    ["STEP 01", "Install",     "pip install seaborn pulls in matplotlib. No other dependencies."],
    ["STEP 02", "Import",      "Alias as sns. Import pyplot alongside for escape-hatch work."],
    ["STEP 03", "Set a theme", "One call controls fonts, colors, grids, and context."],
  ];
  const stepX = 0.9;
  const stepW = 5.0;
  let stepY = 2.4;
  const stepRowH = 1.3;
  steps.forEach(([lbl, h, b]) => {
    s.addText(lbl, {
      x: stepX, y: stepY, w: stepW, h: 0.3,
      fontFace: FB, fontSize: 10, color: CORAL, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText(h, {
      x: stepX, y: stepY + 0.32, w: stepW, h: 0.4,
      fontFace: FH, fontSize: 20, bold: true, color: TEAL, margin: 0,
    });
    s.addText(b, {
      x: stepX, y: stepY + 0.82, w: stepW, h: 0.4,
      fontFace: FB, fontSize: 13, color: INK, margin: 0, valign: "top",
    });
    stepY += stepRowH;
  });

  // Right column: code block — top aligned with left col STEP 01 eyebrow.
  codeBlock(s, SNIPPETS.install, {
    x: 7.3, y: 2.47, w: 5.4, h: 1.85, fontSize: 15,
  });

  // Tips block — bottom-aligned with last step body.
  s.addText("TIPS", {
    x: 7.3, y: 4.57, w: 5.4, h: 0.3,
    fontFace: FB, fontSize: 10, color: CORAL, charSpacing: 3, bold: true, margin: 0,
  });

  const tips = [
    [["Use ", INK], ["uv pip install seaborn", TEAL, true], [" for 10-100× faster installs.", INK]],
    [["The ", INK], ["sns", TEAL, true], [" alias is community convention: short and memorable.", INK]],
    [["Call ", INK], ["sns.set_theme()", TEAL, true], [" once at the top. Never touch rcParams again.", INK]],
  ];
  const tipRowH = 0.475;
  let tipY = 4.87;
  tips.forEach((segments) => {
    s.addText(
      segments.map(([text, color, bold]) => ({
        text, options: { color, bold: !!bold },
      })),
      {
        x: 7.3, y: tipY, w: 5.4, h: 0.45,
        fontFace: FB, fontSize: 13, margin: 0, valign: "top",
      }
    );
    tipY += tipRowH;
  });
}

// ============ SLIDE 5 — SECTION DIVIDER ============
{
  const s = pres.addSlide(); bg(s, TEAL);
  // Coral hairline on the left as anchor
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.9, y: 3.1, w: 0.8, h: 0.03,
    fill: { color: CORAL }, line: { color: CORAL, width: 0 },
  });
  s.addText("PART TWO", {
    x: 0.9, y: 3.2, w: 12, h: 0.35,
    fontFace: FB, fontSize: 11, color: CORAL, charSpacing: 4, bold: true, margin: 0,
  });
  s.addText("Less code, more plot.", {
    x: 0.9, y: 3.75, w: 12.1, h: 1.3,
    fontFace: FH, fontSize: 60, bold: true, color: CREAM, margin: 0,
  });
  s.addText("Four things seaborn turns into a one-liner.", {
    x: 0.9, y: 5.0, w: 12.1, h: 0.5,
    fontFace: FB, fontSize: 18, italic: true, color: CREAM, margin: 0,
  });
  s.addText("05 / 17", {
    x: 0.9, y: 7.05, w: 2, h: 0.3,
    fontFace: FB, fontSize: 10, color: MUTED, margin: 0,
  });
}

// ============ Side-by-side comparison helper ============
function comparisonSlide({
  pageNum, section, headline, sub,
  leftLabel, leftCodeKey, leftPlot,
  rightLabel, rightCodeKey, rightPlot,
}) {
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, pageNum, TOTAL, section);
  title(s, headline);
  if (sub) subtitle(s, sub);
  rule(s);

  // Plots shrunk ~15% for less visual weight; code lowered slightly
  const PLOT_RATIO = 1.472;
  const colW = 4.5;
  const plotH = colW / PLOT_RATIO;   // ≈ 3.06
  const gap = 0.7;
  const totalW = colW * 2 + gap;
  const leftX = (SW - totalW) / 2;
  const rightX = leftX + colW + gap;

  const headY = 2.4;
  const codeY = 2.85;
  const codeH = 1.35;
  const leftIsMpl = leftLabel.toLowerCase().includes("matplotlib");

  // Plot y-axis line sits at ~10.9% of image width. Shift plots LEFT so the
  // y-axis line aligns with the code's left edge above.
  const yAxisFrac = 0.109;
  const plotShift = colW * yAxisFrac;  // ≈ 0.45
  const leftPlotX = leftX - plotShift;
  const rightPlotX = rightX - plotShift;

  // Column headers — centered above each column for visual balance
  s.addText(leftLabel, {
    x: leftX, y: headY, w: colW, h: 0.35,
    fontFace: FH, fontSize: 16, bold: true, color: leftIsMpl ? MUTED : TEAL, margin: 0, align: "center",
  });
  s.addText(rightLabel, {
    x: rightX, y: headY, w: colW, h: 0.35,
    fontFace: FH, fontSize: 16, bold: true, color: leftIsMpl ? TEAL : MUTED, margin: 0, align: "center",
  });

  // fontSize 13 matches showcase slides. Code stays at leftX/rightX (column base).
  codeBlock(s, SNIPPETS[leftCodeKey],  { x: leftX,  y: codeY, w: colW, h: codeH, fontSize: 13 });
  codeBlock(s, SNIPPETS[rightCodeKey], { x: rightX, y: codeY, w: colW, h: codeH, fontSize: 13 });

  const plotY = 4.35;
  s.addImage({ path: `${P}/${leftPlot}.svg`,  x: leftPlotX,  y: plotY, w: colW, h: plotH });
  s.addImage({ path: `${P}/${rightPlot}.svg`, x: rightPlotX, y: plotY, w: colW, h: plotH });
}

// ============ SLIDE 6 — BARPLOT COMPARISON ============
comparisonSlide({
  pageNum: 6, section: "Simplifies",
  headline: "A grouped bar plot",
  sub: "Nine lines of pandas + matplotlib, or three lines of seaborn.",
  leftLabel: "pandas + matplotlib",
  leftCodeKey: "mpl_bar", leftPlot: "mpl_bar",
  rightLabel: "seaborn",
  rightCodeKey: "sns_bar", rightPlot: "sns_bar",
});

// ============ SLIDE 7 — SCATTER COMPARISON ============
comparisonSlide({
  pageNum: 7, section: "Simplifies",
  headline: "A coloured scatter plot",
  sub: "No more for-loops over groupby just to colour points.",
  leftLabel: "pandas + matplotlib",
  leftCodeKey: "mpl_scatter", leftPlot: "mpl_scatter",
  rightLabel: "seaborn",
  rightCodeKey: "sns_scatter", rightPlot: "sns_scatter",
});

// ============ Single-chart showcase helper ============
// Fixed left-column geometry across ALL showcase slides for consistency:
//   codeX=1.0, codeW=4.0, codeY=2.4, codeH=2.3
//   paramsX=1.0, paramsW=4.0, paramsY=4.85
// Plot is right-anchored at x=SW-0.6 with natural aspect ratio (max 7.5×4.6).
function showcaseSlide({ pageNum, section, headline, sub, codeKey, plot, params, plotYOffset = 0 }) {
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, pageNum, TOTAL, section);
  title(s, headline);
  if (sub) subtitle(s, sub);
  rule(s);

  // Right column: plot at natural ratio, flush against right margin
  const plotMaxW = 7.0, plotMaxH = 4.6;
  const d = dim(plot);
  let plotW = plotMaxW, plotH = plotW / d.ratio;
  if (plotH > plotMaxH) { plotH = plotMaxH; plotW = plotH * d.ratio; }
  const plotX = SW - 0.6 - plotW;
  const plotY = 2.3 + (plotMaxH - plotH) / 2 + plotYOffset;
  s.addImage({ path: `${P}/${plot}.svg`, x: plotX, y: plotY, w: plotW, h: plotH });

  // Left column: hard-coded fixed geometry — identical across every showcase slide
  // Shifted right from x=1.0 → 1.5 so content sits more toward slide center
  const codeX = 1.5;
  const codeW = 4.0;
  const codeY = 2.4;
  const codeH = 2.3;
  codeBlock(s, SNIPPETS[codeKey], { x: codeX, y: codeY, w: codeW, h: codeH, fontSize: 13 });

  // KEY PARAMETERS block — fixed position
  if (params) {
    const paramsY = 4.85;
    s.addText("KEY PARAMETERS", {
      x: codeX, y: paramsY, w: codeW, h: 0.3,
      fontFace: FB, fontSize: 10, color: CORAL, charSpacing: 3, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: codeX, y: paramsY + 0.32, w: codeW, h: 0.01,
      fill: { color: MUTED }, line: { color: MUTED, width: 0 },
    });
    const keyW = 1.85;
    let ry = paramsY + 0.45;
    params.forEach(([key, type, desc]) => {
      s.addText([
        { text: key, options: { color: TEAL, bold: true } },
        { text: `: ${type}`, options: { color: MUTED } },
      ], {
        x: codeX, y: ry, w: keyW, h: 0.32,
        fontFace: "Consolas", fontSize: 11, margin: 0,
      });
      s.addText(desc, {
        x: codeX + keyW, y: ry, w: codeW - keyW, h: 0.32,
        fontFace: FB, fontSize: 12, color: INK, margin: 0,
      });
      ry += 0.35;
    });
  }
}

// ============ SLIDE 8 — REGPLOT ============
showcaseSlide({
  pageNum: 8, section: "Simplifies",
  headline: "Scatter + fit, one call",
  sub: "regplot gives you a scatter, an OLS line, and a confidence band.",
  codeKey: "regplot", plot: "regplot",
  params: [
    ["x, y",   "str",   "column names to plot"],
    ["order",  "int",   "polynomial degree (default 1)"],
    ["ci",     "int",   "confidence band width"],
    ["lowess", "bool",  "use a local regression"],
  ],
});

// ============ SLIDE 9 — KDE ============
showcaseSlide({
  pageNum: 9, section: "Simplifies",
  headline: "Distributions, grouped",
  sub: "kdeplot handles the smoothing, the filling, and the legend.",
  codeKey: "kde", plot: "kdeplot",
  params: [
    ["hue",         "str",   "split into multiple densities"],
    ["fill",        "bool",  "fill under the curve"],
    ["bw_adjust",   "float", "smoothness scale factor"],
    ["common_norm", "bool",  "normalize per-group"],
  ],
});

// ============ SLIDE 10 — HEATMAP ============
showcaseSlide({
  pageNum: 10, section: "Simplifies",
  headline: "Heatmaps without the hassle",
  sub: "Pass a pivoted DataFrame. You get labelled axes for free.",
  codeKey: "heatmap", plot: "heatmap",
  params: [
    ["annot",    "bool", "show cell values as text"],
    ["cmap",     "str",  "matplotlib or seaborn colormap"],
    ["center",   "float","anchor the colormap here"],
    ["cbar_kws", "dict", "customize the colorbar"],
  ],
});

// ============ SLIDE 11 — RELPLOT / FACETING ============
showcaseSlide({
  pageNum: 11, section: "Simplifies",
  headline: "Small multiples, for free",
  sub: "col= spins off a panel per group. No GridSpec, no loops.",
  codeKey: "relplot", plot: "relplot",
  plotYOffset: -0.06,  // lift plot so x-axis aligns with KEY PARAMETERS hairline on left
  params: [
    ["col, row", "str", "facet into a grid"],
    ["hue",      "str", "color by category"],
    ["size",     "str", "scale points by column"],
    ["kind",     "str", "\"scatter\" or \"line\""],
  ],
});

// ============ SLIDE 12 — VIOLIN ============
showcaseSlide({
  pageNum: 12, section: "Simplifies",
  headline: "One plot, two distributions",
  sub: "split violins compare groups where boxplots would obscure them.",
  codeKey: "violin", plot: "violin",
  params: [
    ["hue",   "str",   "split by category"],
    ["split", "bool",  "mirror two distributions"],
    ["inner", "str",   "\"box\", \"quart\", \"stick\", None"],
    ["cut",   "float", "how far past data to draw"],
  ],
});

// ============ SLIDE 13 — TIPS DIVIDER ============
{
  const s = pres.addSlide(); bg(s, TEAL);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.9, y: 3.1, w: 0.8, h: 0.03,
    fill: { color: CORAL }, line: { color: CORAL, width: 0 },
  });
  s.addText("PART THREE", {
    x: 0.9, y: 3.2, w: 12, h: 0.35,
    fontFace: FB, fontSize: 11, color: CORAL, charSpacing: 4, bold: true, margin: 0,
  });
  s.addText("Three tips for polished plots.", {
    x: 0.9, y: 3.75, w: 12.1, h: 1.3,
    fontFace: FH, fontSize: 48, bold: true, color: CREAM, margin: 0,
  });
  s.addText("Small touches, big polish.", {
    x: 0.9, y: 5.05, w: 12.1, h: 0.5,
    fontFace: FB, fontSize: 18, italic: true, color: CREAM, margin: 0,
  });
  s.addText("13 / 17", {
    x: 0.9, y: 7.05, w: 2, h: 0.3,
    fontFace: FB, fontSize: 10, color: MUTED, margin: 0,
  });
}

// ============ SLIDE 14 — TIP 1: set_theme ============
{
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, 14, TOTAL, "Tips");
  title(s, "Set a theme once, globally.");
  subtitle(s, "Set it at the top of the notebook. Never touch rcParams again.");
  rule(s);

  codeBlock(s, SNIPPETS.theme, { x: 4.8, y: 2.4, w: 5.0, h: 1.05, fontSize: 14 });

  const plotW = 4.2;
  const gap = 0.6;
  const totalW = plotW * 2 + gap;
  const leftX = (SW - totalW) / 2;
  const rightX = leftX + plotW + gap;
  const eyebrowY = 3.55;
  const labelY = 3.83;
  const plotY = 4.20;

  s.addText("NOTEBOOK", {
    x: leftX, y: eyebrowY, w: plotW, h: 0.25,
    fontFace: FB, fontSize: 10, color: MUTED, charSpacing: 3, bold: true, margin: 0, align: "center",
  });
  s.addText("default scaling", {
    x: leftX, y: labelY, w: plotW, h: 0.28,
    fontFace: FB, fontSize: 13, italic: true, color: INK, margin: 0, align: "center",
  });
  s.addText("TALK", {
    x: rightX, y: eyebrowY, w: plotW, h: 0.25,
    fontFace: FB, fontSize: 10, color: CORAL, charSpacing: 3, bold: true, margin: 0, align: "center",
  });
  s.addText("larger fonts, thicker lines", {
    x: rightX, y: labelY, w: plotW, h: 0.28,
    fontFace: FB, fontSize: 13, italic: true, color: INK, margin: 0, align: "center",
  });
  s.addImage(plotByW("ctx_notebook", leftX,  plotY, plotW));
  s.addImage(plotByW("ctx_talk",     rightX, plotY, plotW));
}

// ============ SLIDE 15 — TIP 2: despine ============
{
  const s = pres.addSlide(); bg(s);
  pageFurniture(s, 15, TOTAL, "Tips");
  title(s, "Despine.");
  subtitle(s, "One call separates an editorial plot from a generic one.");
  rule(s);

  codeBlock(s, SNIPPETS.despine, { x: 4.8, y: 2.4, w: 5.0, h: 1.05, fontSize: 14 });

  const plotW = 4.2;
  const gap = 0.6;
  const totalW = plotW * 2 + gap;
  const leftX = (SW - totalW) / 2;
  const rightX = leftX + plotW + gap;
  const eyebrowY = 3.55;
  const labelY = 3.83;
  const plotY = 4.20;

  s.addText("BEFORE", {
    x: leftX, y: eyebrowY, w: plotW, h: 0.25,
    fontFace: FB, fontSize: 10, color: MUTED, charSpacing: 3, bold: true, margin: 0, align: "center",
  });
  s.addText("default matplotlib box", {
    x: leftX, y: labelY, w: plotW, h: 0.28,
    fontFace: FB, fontSize: 13, italic: true, color: INK, margin: 0, align: "center",
  });
  s.addText("AFTER", {
    x: rightX, y: eyebrowY, w: plotW, h: 0.25,
    fontFace: FB, fontSize: 10, color: CORAL, charSpacing: 3, bold: true, margin: 0, align: "center",
  });
  s.addText("sns.despine() applied", {
    x: rightX, y: labelY, w: plotW, h: 0.28,
    fontFace: FB, fontSize: 13, italic: true, color: INK, margin: 0, align: "center",
  });
  s.addImage(plotByW("despine_before", leftX,  plotY, plotW));
  s.addImage(plotByW("despine_after",  rightX, plotY, plotW));
}

// ============ SLIDE 16 — TIP 3: drop to matplotlib ============
showcaseSlide({
  pageNum: 16, section: "Tips",
  headline: "Drop down to matplotlib.",
  sub: "Seaborn returns a plain Axes. The full matplotlib API is yours.",
  codeKey: "drop_to_mpl", plot: "annotated_bars",
  params: [
    ["ax",       "Axes",  "every sns function returns one"],
    ["annotate", "method","arrows, labels, callouts"],
    ["axhline",  "method","reference lines, thresholds"],
    ["twinx",    "method","overlay a second y-axis"],
  ],
});

// ============ SLIDE 17 — CLOSING ============
{
  const s = pres.addSlide();
  bg(s, TEAL);

  // Coral hairline anchor — centered
  s.addShape(pres.shapes.RECTANGLE, {
    x: SW/2 - 0.4, y: 1.5, w: 0.8, h: 0.03,
    fill: { color: CORAL }, line: { color: CORAL, width: 0 },
  });
  s.addText("IN SUMMARY", {
    x: 0, y: 1.6, w: SW, h: 0.35,
    fontFace: FB, fontSize: 11, color: CORAL, charSpacing: 4, bold: true, margin: 0, align: "center",
  });
  s.addText("Write less.", {
    x: 0, y: 2.15, w: SW, h: 1.2,
    fontFace: FH, fontSize: 64, bold: true, color: CREAM, margin: 0, align: "center",
  });
  s.addText([
    { text: "See ", options: { color: CREAM } },
    { text: "more", options: { color: CORAL, italic: true } },
    { text: ".", options: { color: CREAM } },
  ], {
    x: 0, y: 3.25, w: SW, h: 1.2,
    fontFace: FH, fontSize: 64, bold: true, margin: 0, align: "center",
  });

  // Three labels — centered as a block
  s.addText([
    { text: "SHORTER", options: { color: CORAL, bold: true, charSpacing: 4 } },
    { text: "          ", options: { color: CREAM } },
    { text: "PRETTIER", options: { color: CORAL, bold: true, charSpacing: 4 } },
    { text: "          ", options: { color: CREAM } },
    { text: "STILL MATPLOTLIB", options: { color: CORAL, bold: true, charSpacing: 4 } },
  ], {
    x: 0, y: 5.15, w: SW, h: 0.4,
    fontFace: FB, fontSize: 14, margin: 0, align: "center",
  });

  s.addText("Questions?  ·  Try it on your next notebook.", {
    x: 0, y: 6.35, w: SW, h: 0.4,
    fontFace: FH, fontSize: 15, italic: true, color: CREAM, margin: 0, align: "center",
  });
}

pres.writeFile({ fileName: "/home/assets/seaborn_training.pptx" })
  .then((f) => console.log("wrote", f));
