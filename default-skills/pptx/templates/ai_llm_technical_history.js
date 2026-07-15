/**
 * class2-replica.js
 *
 * Recreates "class2.pptx" — A Short History of LLMs — using pptxgenjs.
 *
 * The deck is 11 slides, 20" x 11.25" (a custom widescreen layout).
 * Design: warm paper background (#EFE9DD), Georgia serif headlines,
 * Helvetica Neue body, Courier New for monospaced captions, with a
 * gold accent (#C6A46A / #A8864A) and dark brown (#3A2C1A).
 *
 * Four slides (1, 3, 5, 10) use illustration images that live alongside
 * this script in ./assets/. If those files are missing the script will
 * still run; those illustrations will simply be skipped.
 *
 * Run:  node class2-replica.js
 * Out:  ./class2-replica.pptx
 */

const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");

// ─────────────────────────────────────────────────────────────────────────────
// Theme tokens (pulled directly from the source .pptx XML)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg:      "EFE9DD",  // paper
  ink:     "3A2C1A",  // near-black brown (headlines)
  body:    "6B5A44",  // muted brown (body copy)
  meta:    "9A8A72",  // light taupe (captions / chapter labels)
  gold:    "A8864A",  // deep gold (stat numbers, accents)
  goldHi:  "C6A46A",  // lighter gold (rule lines)
  rule:    "C9BDA4",  // pale rule line
  panel:   "E6DFCE",  // soft panel fill
  panelHi: "FCFAF4",  // white-ish chat panel
};

const F = {
  serif:  "Georgia",
  sans:   "Helvetica Neue",
  mono:   "Courier New",
};

// Asset directory (for the 4 illustration PNGs from the source deck)
const ASSETS = path.join(__dirname, "assets");
const hasAsset = (name) => fs.existsSync(path.join(ASSETS, name));
const asset = (name) => path.join(ASSETS, name);

// ─────────────────────────────────────────────────────────────────────────────
// Presentation setup — custom 20" x 11.25" layout
// ─────────────────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.title  = "A Short History of LLMs";
pres.author = "class2 replica";
pres.defineLayout({ name: "CLASS2", width: 20, height: 11.25 });
pres.layout = "CLASS2";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Convert XML `spc` (hundredths of a point) to pptxgenjs `charSpacing` (points). */
const spc = (v) => (v ? v / 100 : 0);

/** Convert XML `sz` (hundredths of a point) to pptxgenjs `fontSize` (points). */
const sz = (v) => v / 100;

/** Add a thin solid bar (rectangle). */
function bar(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color },
    line: { type: "none" },
  });
}

/** Add a simple left-aligned single-line text box with zero internal padding. */
function label(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.face || F.sans,
    fontSize: opts.size || 12,
    color: opts.color || C.body,
    bold: opts.bold || false,
    italic: opts.italic || false,
    align: opts.align || "left",
    valign: opts.valign || "top",
    charSpacing: opts.charSpacing || 0,
    margin: opts.margin != null ? opts.margin : 0.03,
  });
}

/** Chapter label (top left) + page counter (top right) + gold rule under it. */
function addHeader(slide, chapter, counter) {
  label(slide, chapter, 1.25, 0.5, 6.5, 0.3056, {
    face: F.sans, size: 16.5, color: C.meta, charSpacing: 2.97,
  });
  label(slide, counter, 17.7604, 0.5, 1.0729, 0.3056, {
    face: F.sans, size: 16.5, color: C.meta, charSpacing: 2.97,
  });
  // Gold rule that sits above the slide's headline
  bar(slide, 1.25, 1.875, 1.25, 0.0312, C.goldHi);
}

/** Headline (the big Georgia serif sentence).
 *  Source XML: 54 pt with normAutofit. We drop to 46 pt to fit the 0.85" box. */
function addHeadline(slide, text) {
  slide.addText(text, {
    x: 1.25, y: 2.2396, w: 18.025, h: 0.8516,
    fontFace: F.serif, fontSize: 46, color: C.ink,
    charSpacing: -0.81, margin: 0.03,
    paraSpaceBefore: 0, paraSpaceAfter: 0,
    valign: "top",
  });
}

/** Plain paragraph of body copy.
 *  Note: the source XML specifies 25.5 pt with `normAutofit`, which PowerPoint
 *  renders smaller to fit the box. pptxgenjs has no equivalent, so we emit
 *  the text at ~20 pt with a tighter line-height so the box height from the
 *  original file still holds. */
function addBody(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: F.sans,
    fontSize: opts.size || 20,
    color: opts.color || C.body,
    lineSpacingMultiple: opts.lineSpacing || 1.35,
    margin: 0.03,
    valign: "top",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 1 — Title: "A short history of large language models."
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top label "A SHORT HISTORY OF LLMS"
  label(s, "A SHORT HISTORY OF LLMS", 1.25, 0.5, 4.1824, 0.3056, {
    face: F.sans, size: 16.5, color: C.meta, charSpacing: 2.97,
  });

  // "── A TECHNICAL HISTORY ──"
  label(s, "── A TECHNICAL HISTORY ──", 1.25, 1.3229, 9.4417, 0.375, {
    face: F.mono, size: 21, color: C.meta, charSpacing: 0.84,
  });

  // Main title with mixed Georgia / italic gold runs.
  // Source: 105 pt in a 9.44 × 7.19 box. At ~88 pt it still wraps to four
  // lines but stops short of the date footer at y=9.8".
  s.addText(
    [
      { text: "A short history of ",      options: { color: C.ink,  italic: false } },
      { text: "large language models.",   options: { color: C.gold, italic: true  } },
    ],
    {
      x: 1.25, y: 2.0729, w: 9.4417, h: 7.1,
      fontFace: F.serif, fontSize: 88,
      charSpacing: -2, lineSpacingMultiple: 1.0,
      margin: 0.03, valign: "top",
    }
  );

  // Gold rule + date tagline
  bar(s, 1.25, 9.953, 0.8333, 0.0312, C.goldHi);
  label(s, "1948 — 2026", 2.4167, 9.802, 2.137, 0.375, {
    face: F.mono, size: 21, color: C.meta, charSpacing: 0.84,
  });

  // Illustration (concentric-timeline circle)
  if (hasAsset("image-1-1.png")) {
    s.addImage({ path: asset("image-1-1.png"), x: 11.25, y: 1.6667, w: 7.5, h: 8.125 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 2 — Statistics: histogram of P(word | "the cat sat on the")
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER I · STATISTICS", "02 / 11");
  addHeadline(s, "Language modeling began with counting words.");

  // Left column: two body paragraphs
  addBody(s,
    "For half a century, a language model was a table of conditional " +
    "probabilities — P(word | previous n-1 words) — estimated by counting " +
    "occurrences in a corpus.",
    1.25, 4.5332, 8.0724, 2.0955
  );
  addBody(s,
    "Shannon proposed the formulation in 1948. It powered autocomplete, " +
    "speech recognition, and machine translation until deep learning arrived.",
    1.25, 6.9204, 8.0724, 1.582
  );

  // Three stat pairs at bottom-left: (1948 / Shannon), (n≤5 / practical limit), (O(Vⁿ) / memory)
  const stats = [
    { x: 1.25,   big: "1948",  lbl: "Shannon",        bigW: 1.3086, lblW: 1.3086 },
    { x: 2.9753, big: "n≤5",   lbl: "practical limit", bigW: 2.7088, lblW: 2.7088 },
    { x: 6.1007, big: "O(Vⁿ)", lbl: "memory",          bigW: 1.3335, lblW: 1.1336 },
  ];
  for (const st of stats) {
    label(s, st.big, st.x, 8.9607, st.bigW, 0.5139, {
      face: F.mono, size: 30, color: C.gold,
    });
    label(s, st.lbl, st.x, 9.4329, st.lblW, 0.375, {
      face: F.mono, size: 21, color: C.meta,
    });
  }

  // Right panel — the probability histogram
  const panelX = 10.1289, panelY = 5.1949, panelW = 8.6211, panelH = 3.9097;
  bar(s, panelX, panelY, panelW, panelH, C.panel);
  bar(s, panelX, panelY, 0.0417, panelH, C.goldHi); // gold left rule

  // Header row: P( ___ | "the cat sat on the" )
  label(s, 'P( ___ | "the cat sat on the" )', panelX + 0.5, panelY + 0.4583, 7.8926, 0.3472, {
    face: F.mono, size: 17, color: C.ink,
  });

  // 5 histogram rows: [word, barValue(0-1), prob]
  const rows = [
    { word: "mat",   val: 0.31, p: "0.31" },
    { word: "floor", val: 0.18, p: "0.18" },
    { word: "chair", val: 0.11, p: "0.11" },
    { word: "roof",  val: 0.05, p: "0.05" },
    { word: "…",     val: 0.35, p: "0.35" },
  ];
  const rowStartY = 6.2088;
  const rowStep   = 0.5208;
  const barMaxW   = 4.0169;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const y = rowStartY + i * rowStep;
    // word label (left)
    label(s, r.word, panelX + 0.5, y, 2.375, 0.3958, {
      face: F.mono, size: 19.5, color: C.ink,
    });
    // bar track (full width)
    bar(s, 13.1289, y + 0.0625, barMaxW, 0.2292, C.panel);
    // filled bar
    bar(s, 13.1289, y + 0.0625, barMaxW * r.val / 0.35 * 0.35 /* keep clean */, 0.2292, C.gold);
    // probability value (right)
    label(s, r.p, 17.2708, y, 1.0208, 0.3958, {
      face: F.mono, size: 19.5, color: C.gold, align: "right",
    });
  }
}

// Override bar fills for slide 2 with exact widths from XML
function buildSlide2Corrected() { /* kept for reference - using the values above */ }

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 3 — Geometry: king - man + woman ≈ queen
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER II · GEOMETRY", "03 / 11");
  addHeadline(s, "Word2vec turned meaning into geometry.");

  addBody(s,
    "In 2013, Mikolov showed that dense vectors, trained to predict " +
    "neighboring words, captured analogies as simple arithmetic.",
    1.25, 4.3617, 7.725, 1.582
  );

  // Accent callout box: "king − man + woman ≈ queen"
  bar(s, 1.25, 6.3604, 7.5,    1.8665, C.panel);
  bar(s, 1.25, 6.3604, 0.0417, 1.8665, C.goldHi);
  s.addText(
    [
      { text: "king − man + woman ",   options: { color: C.ink,  italic: true } },
      { text: "≈ queen",               options: { color: C.gold, italic: true } },
    ],
    {
      x: 1.7083, y: 6.6937, w: 6.85, h: 1.2415,
      fontFace: F.serif, fontSize: 42,
      valign: "middle", margin: 0.03,
    }
  );

  addBody(s,
    "Embeddings — learned, low-dimensional representations — became the " +
    "lingua franca of NLP for the decade that followed.",
    1.25, 8.6852, 7.725, 1.3102
  );

  // Right illustration (king / queen / Paris / France / Rome / Italy scatter)
  if (hasAsset("image-3-1.png")) {
    s.addImage({ path: asset("image-3-1.png"), x: 9.5833, y: 3.6745, w: 9.1667, h: 6.9666 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 4 — Architecture: 4-stat row + 6x6 self-attention heatmap
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER III · ARCHITECTURE", "04 / 11");
  addHeadline(s, "Attention replaced recurrence.");

  addBody(s,
    '"Attention Is All You Need" (Vaswani et al., 2017) replaced sequential ' +
    "RNNs with a fully parallel architecture built on self-attention.",
    1.25, 3.9774, 8.476, 1.582
  );
  addBody(s,
    "The transformer trained faster on more data, scaled almost linearly " +
    "with compute, and became the substrate beneath every modern LLM.",
    1.25, 5.8511, 8.476, 1.582
  );

  // Four-stat block (lower-left, 2x2): each item has a rule line, a label, and a note.
  const quads = [
    { x: 1.25,   y: 7.9748, color: C.rule, label: "RNNS",            note: "sequential, hard to parallelize" },
    { x: 5.5312, y: 7.9748, color: C.rule, label: "CNNS",            note: "local receptive fields" },
    { x: 1.25,   y: 9.1068, color: C.gold, label: "SELF-ATTENTION",  note: "global, parallel" },
    { x: 5.5312, y: 9.1068, color: C.gold, label: "CONSEQUENCE",     note: "scale unlocked" },
  ];
  for (const q of quads) {
    bar(s, q.x, q.y, 3.9479, 0.0208, q.color);
    label(s, q.label, q.x, q.y + 0.1667, 4.0664, 0.2778, {
      face: F.sans, size: 14.25, color: C.ink, bold: true, charSpacing: 1.5,
    });
    label(s, q.note, q.x, q.y + 0.4653, 4.0664, 0.375, {
      face: F.sans, size: 16.5, color: C.body,
    });
  }

  // ── Right side: self-attention matrix ──
  label(s, "SELF-ATTENTION · WEIGHTS", 11.2879, 3.9414, 6.695, 0.2986, {
    face: F.sans, size: 14.25, color: C.meta, charSpacing: 2.25, bold: true,
  });

  const tokens = ["the", "cat", "sat", "on", "the", "mat"];
  const headerY = 4.4067;
  const rowHs   = 0.875;
  const colX    = [12.6354, 13.5104, 14.3854, 15.2604, 16.1354, 17.0104]; // top-row label x positions
  const cellX   = [12.6771, 13.5521, 14.4271, 15.3021, 16.1771, 17.0521]; // cell rectangle x positions
  const rowStartY = 4.7331;

  // Column headers (top row)
  for (let c = 0; c < 6; c++) {
    label(s, tokens[c], colX[c], headerY, 0.9167, 0.3264, {
      face: F.mono, size: 16.5, color: C.meta, align: "center",
    });
  }

  // Row labels + heatmap values (attention weights per row)
  const weights = [
    [0.60, 0.10, 0.10, 0.05, 0.10, 0.05],
    [0.10, 0.50, 0.25, 0.05, 0.05, 0.05],
    [0.05, 0.30, 0.40, 0.10, 0.05, 0.10],
    [0.05, 0.10, 0.25, 0.40, 0.10, 0.10],
    [0.10, 0.05, 0.05, 0.15, 0.50, 0.15],
    [0.05, 0.35, 0.10, 0.05, 0.10, 0.35],
  ];
  for (let r = 0; r < 6; r++) {
    const y = rowStartY + r * 0.875;
    // row label at left
    label(s, tokens[r], 11.3021, y + 0.2743, 1.2083, 0.3264, {
      face: F.mono, size: 16.5, color: C.meta, align: "right",
    });
    // cells
    for (let c = 0; c < 6; c++) {
      const w = weights[r][c];
      // cell background (opacity proxies the heatmap — more opaque = larger weight)
      s.addShape(pres.shapes.RECTANGLE, {
        x: cellX[c], y: y, w: 0.8333, h: 0.8333,
        fill: { color: C.gold, transparency: Math.round((1 - w) * 100) },
        line: { type: "none" },
      });
      // cell number centred
      label(s, w.toFixed(2), cellX[c] - 0.0347, y + 0.0069, 0.9028, 0.8611, {
        face: F.mono, size: 14, color: C.ink, align: "center", valign: "middle",
      });
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 5 — Scale: 1,000× parameter growth
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER IV · SCALE", "05 / 11");
  addHeadline(s, "Scale unlocked emergent abilities.");

  addBody(s,
    "GPT-3 (2020) scaled the transformer to 175B parameters and demonstrated " +
    "in-context learning — solving tasks from a handful of examples, with no " +
    "gradient updates.",
    1.25, 3.9776, 7.725, 2.0955
  );
  addBody(s,
    "Kaplan's scaling laws made the bet explicit: loss falls as a power law " +
    "in parameters, data, and compute.",
    1.25, 6.3648, 7.725, 1.582
  );

  // Tagline: "1,000×  parameter growth, 2018 → 2023"
  s.addText(
    [
      { text: "1,000× ",                        options: { color: C.ink,  italic: true, fontFace: F.serif, fontSize: 48 } },
      { text: "parameter growth, 2018 → 2023",  options: { color: C.meta, italic: false, fontFace: F.sans,  fontSize: 16 } },
    ],
    { x: 1.25, y: 8.4052, w: 7.725, h: 1.5417, margin: 0.03, valign: "middle" }
  );

  // Right illustration: log-scale growth curve
  if (hasAsset("image-5-1.png")) {
    s.addImage({ path: asset("image-5-1.png"), x: 9.5833, y: 3.7122, w: 9.1667, h: 6.4583 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 6 — Product: ChatGPT + timeline + mock chat UI
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER V · PRODUCT", "06 / 11");
  addHeadline(s, "ChatGPT made LLMs a consumer product.");

  addBody(s,
    "InstructGPT (2022) added a second training phase — RLHF — that taught " +
    "base models to follow instructions and refuse. ChatGPT wrapped it in a chat UI.",
    1.25, 4.4703, 9.3236, 1.582
  );
  addBody(s,
    "The shift from completion engine to assistant was, for most of the " +
    "world, the moment LLMs arrived.",
    1.25, 6.344, 9.3236, 1.0686
  );

  // Three-stat launch-timeline row
  const items = [
    { x: 1.25,   top: "NOV 30",   big: "2022",   note: "ChatGPT launch" },
    { x: 4.3507, top: "5 DAYS",   big: "→ 1M",   note: "users" },
    { x: 7.4514, top: "2 MONTHS", big: "→ 100M", note: "users — fastest ever" },
  ];
  for (const it of items) {
    bar(s, it.x, 7.9542, 2.8507, 0.0208, C.gold);
    label(s, it.top,  it.x, 8.1417, 2.9362, 0.2778, {
      face: F.mono, size: 15, color: C.meta, charSpacing: 1.5,
    });
    label(s, it.big, it.x, 8.4612, 2.9362, 0.625, {
      face: F.serif, size: 42, color: C.ink,
    });
    label(s, it.note, it.x, 9.1487, 2.9362, 0.3056, {
      face: F.sans, size: 16.5, color: C.body,
    });
  }

  // ── Chat UI panel (right) ──
  bar(s, 11.3438, 4.6549, 7.4062, 4.5729, C.panelHi);

  // Traffic-light dots
  const dots = [
    { x: 11.7674, color: "D06B5B" },
    { x: 11.9965, color: "D9B961" },
    { x: 12.2257, color: "7FA86E" },
  ];
  for (const d of dots) {
    s.addShape(pres.shapes.OVAL, {
      x: d.x, y: 5.1306, w: 0.1042, h: 0.1042,
      fill: { color: d.color }, line: { type: "none" },
    });
  }
  label(s, "CHAT · 2022", 12.6215, 5.0786, 1.5273, 0.25, {
    face: F.mono, size: 13.5, color: C.meta, charSpacing: 1.5,
  });

  // User message line
  s.addText(
    [
      { text: "User ",                 options: { bold: true, color: C.ink  } },
      { text: "Explain RLHF simply.",  options: { color: C.body } },
    ],
    {
      x: 11.7674, y: 5.5786, w: 6.7558, h: 0.375,
      fontFace: F.sans, fontSize: 21, margin: 0.03, valign: "top",
    }
  );

  // Assistant message
  s.addText(
    [
      { text: "Assistant ",                                                          options: { bold: true, color: C.ink,                     fontFace: F.sans  } },
      { text: "A base model predicts the next token. RLHF teaches it ",              options: { color: C.body,                                 fontFace: F.sans  } },
      { text: "which ",                                                              options: { italic: true, color: C.gold,                   fontFace: F.serif } },
      { text: "next tokens humans actually prefer — turning a completion engine into an assistant.", options: { color: C.body,                fontFace: F.sans  } },
    ],
    {
      x: 11.7674, y: 6.1202, w: 6.7558, h: 1.7917,
      fontSize: 21, lineSpacingMultiple: 1.35, margin: 0.03, valign: "top",
    }
  );

  // Divider + cursor
  bar(s, 11.7674, 8.2036, 6.559, 0.0104, C.rule);
  label(s, "▍", 11.7674, 8.4223, 6.7558, 0.4236, {
    face: F.mono, size: 18, color: C.meta,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 7 — Distribution: open-weights timeline table
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER VI · DISTRIBUTION", "07 / 11");
  addHeadline(s, "Open weights reshaped the field.");

  addBody(s,
    "After GPT-3, frontier models were API-only. Meta's LLaMA series — " +
    "followed by Mistral and DeepSeek — put competitive weights in the hands " +
    "of every researcher.",
    1.25, 5.0683, 6.4375, 2.6089
  );
  addBody(s,
    "The gap between closed and open frontiers has narrowed from years to months.",
    1.25, 7.9689, 6.4375, 0.8874
  );

  // ── Table (right side) ──
  // Header row
  const colX = { model: 8.3333, org: 10.8883, rel: 12.6572, sig: 14.426 };
  const colW = { model: 2.6383, org: 1.8522,  rel: 1.8521,  sig: 4.4536 };
  const headerY = 4.4227;

  // Top border (darker)
  bar(s, 8.3333, 4.7769, 10.4167, 0.0208, C.ink);

  const headerOpts = {
    face: F.sans, size: 14.25, color: C.meta, charSpacing: 1.5, bold: true,
  };
  label(s, "MODEL",        colX.model, headerY, colW.model, 0.25, headerOpts);
  label(s, "ORG",          colX.org,   headerY, colW.org,   0.25, headerOpts);
  label(s, "RELEASED",     colX.rel,   headerY, colW.rel,   0.25, headerOpts);
  label(s, "SIGNIFICANCE", colX.sig,   headerY, colW.sig,   0.25, headerOpts);

  // Five rows: [ model, org, released, significance, rowY ]
  const rows = [
    ["LLaMA",              "Meta",     "Feb 2023", "leaked in days; kicked off the open era", 5.0269, 5.6491],
    ["LLaMA 2",            "Meta",     "Jul 2023", "released commercially-usable weights",    5.8852, 6.5074],
    ["Mistral 7B",         "Mistral",  "Sep 2023", "matched 13B baselines",                    6.7435, 7.3657],
    ["LLaMA 3",            "Meta",     "Apr 2024", "open frontier-class weights",              7.6018, 8.224 ],
    ["DeepSeek-V3 / R1",   "DeepSeek", "2024–25",  "open reasoning, low training cost",        8.4601, 9.4531],
  ];
  for (const [model, org, rel, sig, y, ruleY] of rows) {
    // Model — bold, brown
    label(s, model, colX.model, y, colW.model, 0.42, {
      face: F.sans, size: 19.5, color: C.ink, bold: true,
    });
    // Org — serif italic gold? No, XML shows just Helvetica
    label(s, org, colX.org, y + 0.0764, colW.org, 0.3333, {
      face: F.sans, size: 17, color: C.body,
    });
    // Released — mono meta
    label(s, rel, colX.rel, y + 0.118, colW.rel, 0.2986, {
      face: F.mono, size: 15, color: C.meta,
    });
    // Significance — body
    label(s, sig, colX.sig, y + 0.0556, colW.sig, 0.3791, {
      face: F.sans, size: 17, color: C.body,
    });
    // Thin rule below the row
    bar(s, 8.3333, ruleY, 10.4167, 0.0104, C.rule);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 8 — Modalities: 5-column grid (Text / Image / Audio / Video / Action)
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER VII · MODALITIES", "08 / 11");
  addHeadline(s, "Models learned to see, hear, and speak.");

  addBody(s,
    "By 2024, the input stream widened: the same transformer backbone " +
    "accepts tokens from text, images, audio, and video — and emits " +
    "actions, not just words.",
    1.25, 3.9212, 11.8021, 1.582
  );

  // 5 cards, only the first has a panel fill
  const cards = [
    { x: 1.25,    filled: true,  glyph: "Aa", title: "Text",   caption: "the original modality" },
    { x: 4.8083,  filled: false, glyph: "◨",  title: "Image",  caption: "GPT-4V · Gemini · Claude 3" },
    { x: 8.3666,  filled: false, glyph: "≋",  title: "Audio",  caption: "Whisper · voice-native models" },
    { x: 11.9249, filled: false, glyph: "▶",  title: "Video",  caption: "Sora, Veo — generation & understanding" },
    { x: 15.4833, filled: false, glyph: "⇢",  title: "Action", caption: "tool use, code, UI control" },
  ];
  for (const c of cards) {
    if (c.filled) {
      bar(s, c.x, 6.2116, 3.2666, 3.5417, C.panel);
    }
    // Giant glyph
    label(s, c.glyph, c.x + 0.3056, 6.6838, 2.7388, 1.5, {
      face: F.serif, size: 96, color: C.ink, align: "center", italic: true,
    });
    // Title
    label(s, c.title, c.x + 0.3056, 8.4693, 2.7388, 0.4514, {
      face: F.serif, size: 27, color: C.ink, align: "center",
    });
    // Caption
    label(s, c.caption, c.x + 0.3056, 9.004, 2.7388, 0.5957, {
      face: F.mono, size: 13.5, color: C.meta, align: "center",
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 9 — Reasoning: "thinking" panel with worked chain-of-thought
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide9() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER VIII · REASONING", "09 / 11");
  addHeadline(s, "Reasoning became a training objective.");

  addBody(s,
    "Chain-of-thought prompting (2022) showed that models think better " +
    "when allowed to write out intermediate steps.",
    1.25, 4.561, 8.476, 1.582
  );
  addBody(s,
    "OpenAI's o1 (2024) and DeepSeek-R1 (2025) made this a first-class " +
    "training objective: reinforcement learning on long internal reasoning " +
    "traces, with test-time compute traded for accuracy.",
    1.25, 6.4347, 8.476, 2.0955
  );

  label(s, "TRAIN-TIME SCALE → TEST-TIME SCALE", 1.25, 8.9885, 8.476, 0.375, {
    face: F.mono, size: 18, color: C.gold, charSpacing: 2.25,
  });

  // Right "THINKING" panel
  bar(s, 10.5208, 4.7339, 8.2292, 4.4149, C.panel);
  bar(s, 10.5208, 4.7339, 0.0417, 4.4149, C.goldHi);

  label(s, "── THINKING ──", 11.0208, 5.1923, 7.489, 0.2778, {
    face: F.mono, size: 16.5, color: C.meta, charSpacing: 1.5,
  });

  // Long chain-of-thought body (serif italic, slightly lighter)
  s.addText(
    "The user wants the second-largest prime factor. First, factor 2,024. " +
    "It's even, so 2 × 1,012. Again, 2 × 506. Again, 2 × 253. 253 = 11 × 23. " +
    "So primes are {2, 11, 23}. Second-largest is 11.",
    {
      x: 11.0208, y: 5.6784, w: 7.489, h: 2.4635,
      fontFace: F.serif, italic: true, fontSize: 22, color: C.ink,
      lineSpacingMultiple: 1.4, margin: 0.03, valign: "top",
    }
  );

  // → answer: 11 (gold 11)
  s.addText(
    [
      { text: "→ answer: ",   options: { color: C.meta, fontFace: F.mono, fontSize: 17 } },
      { text: "11",           options: { color: C.gold, fontFace: F.serif, fontSize: 22, italic: true, bold: true } },
    ],
    { x: 11.0208, y: 8.4336, w: 7.489, h: 0.2986, margin: 0.03, valign: "middle" }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — Agency: the agent loop (illustration-driven)
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide10() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CHAPTER IX · AGENCY", "10 / 11");
  addHeadline(s, "Agents turn language models into actors.");

  addBody(s,
    "A model that can call tools, observe results, and iterate is an agent. " +
    "Tool use (2023), function calling, and browser / computer control " +
    "(2024–25) extend the output alphabet from words to actions.",
    1.25, 4.7209, 7.725, 2.6089
  );
  addBody(s,
    'The research frontier is no longer "what can a model answer?" but ' +
    '"what can a model accomplish, unsupervised, over long horizons?"',
    1.25, 7.6215, 7.725, 1.582
  );

  // Illustration
  if (hasAsset("image-10-1.png")) {
    s.addImage({ path: asset("image-10-1.png"), x: 9.5833, y: 3.4661, w: 9.1667, h: 6.9505 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11 — Coda: 2x2 grid of open questions
// ─────────────────────────────────────────────────────────────────────────────
function buildSlide11() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "CODA", "11 / 11");
  addHeadline(s, "Four open questions for the next decade.");

  const items = [
    { x: 1.25,    y: 4.7839, labelX: 1.25,    textX: 2.375,   roman: "i .",   q: "How far does pre-training scale?",          a: "data is finite; frontier runs cost $100M+", qW: 6.0153, aW: 6.0153 },
    { x: 10.3125, y: 4.7839, labelX: 10.3125, textX: 11.4375, roman: "ii .",  q: "What's the right test-time compute curve?", a: "o-series suggests reasoning is elastic",    qW: 7.5319, aW: 7.5319 },
    { x: 1.25,    y: 7.2296, labelX: 1.25,    textX: 2.375,   roman: "iii .", q: "Do agents reliably generalize?",            a: "long horizons remain the bottleneck",       qW: 5.5176, aW: 5.5176 },
    { x: 10.3125, y: 7.2296, labelX: 10.3125, textX: 11.4375, roman: "iv .",  q: "Where do the weights live?",                a: "open vs closed, nation-state vs lab",       qW: 4.971,  aW: 4.971  },
  ];

  for (const it of items) {
    // Thin top rule
    bar(s, it.x, it.y, 8.4375, 0.0208, C.ink);
    // Roman numeral (serif italic gold)
    label(s, it.roman, it.labelX, it.y + 0.3125, 0.9167, 1.05, {
      face: F.serif, size: 27, color: C.gold, italic: true,
    });
    // Question (serif, brown). Drop from 25.5 pt to 22 pt so the longer
    // questions (ii.) stay on a single line.
    label(s, it.q, it.textX, it.y + 0.3125, it.qW, 0.75, {
      face: F.serif, size: 22, color: C.ink,
    });
    // Answer (sans, muted). Nudge down so there's a clean gap below the question.
    label(s, it.a, it.textX, it.y + 1.05, it.aW, 0.4041, {
      face: F.sans, size: 14, color: C.body,
    });
  }

  // Footer rule + "Thank you · Questions?"
  bar(s, 1.25, 9.6597, 17.5, 0.0104, C.rule);
  bar(s, 1.25, 10.2344, 0.625, 0.0312, C.goldHi);
  label(s, "Thank you · Questions?", 2.1667, 10.0833, 4.2305, 0.375, {
    face: F.mono, size: 18, color: C.meta, charSpacing: 1.5,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Build everything
// ─────────────────────────────────────────────────────────────────────────────
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();
buildSlide9();
buildSlide10();
buildSlide11();

// ─────────────────────────────────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "class2-replica.pptx" }).then((f) => {
  console.log("Wrote:", f);
});
