/**
 * Forliver Deck — PPTX replica of Forliver_Deck.html
 * Uses pptxgenjs. Matches the HTML deck's 1920×1080 design canvas.
 *
 * Fonts are kept exactly as in the HTML (Newsreader, Geist, Geist Mono).
 * The user has the fonts installed locally, so no substitution is done.
 *
 * Unit conversion:
 *   Slide is 13.333 × 7.5 inches (LAYOUT_WIDE). That matches 1920×1080 @ 144 DPI.
 *   → 1 CSS px = 13.333/1920 in = 0.006944 in
 *   → 1 CSS px = 0.5 PPTX points (since 1 in = 72 pt)
 *   So:  font-size-pt = css-px × 0.5.
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

// ---------- geometry helpers ----------
const PX_TO_IN = 13.333 / 1920;            // inches per css pixel
const PX_TO_PT = 0.5;                      // pt per css pixel
const px  = (v) => +(v * PX_TO_IN).toFixed(4);
const fpt = (cssPx) => +(cssPx * PX_TO_PT).toFixed(2);

// ---------- palette (matches :root CSS vars) ----------
const C = {
  bg:        'F4F1EB',
  bg2:       'EBE6DC',
  ink:       '0B1B2E',
  ink2:      '1F2D42',
  muted:     '6B7280',
  rule:      'D9D2C2',
  accent:    '123E6E',
  accent2:   '2F6BB0',
  paper:     'FBF9F5',
  sand:      'E3DCCC',
  inkInv:    'F4F1EB',
  // dark-slide helpers
  lightBlue: '9DC0EC',
  paleBlue:  'C9DAF0',
  deepBlue:  '0A3258',
  midBorder: '1F4B7D',
  darkRule:  '6A8CB8',
  darkMuted: '8CA6C7',
  darkSub:   'D7E4F4',
  phaseMuted:'B8CEE8',
};

// ---------- fonts (match HTML exactly) ----------
const F = {
  serif: 'Newsreader',
  sans:  'Geist',
  mono:  'Geist Mono',
};

// ---------- pptx init ----------
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inches — matches 1920×1080 16:9
pptx.title = 'Forliver — Introducing a breakthrough';
pptx.company = 'Aevena Therapeutics';

// ---------- low-level helpers ----------
function bg(slide, color) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.333, h: 7.5,
    fill: { color },
    line: { type: 'none' },
  });
}

function rule(slide, x, y, w, color = C.rule, thickness = 0.75) {
  // Horizontal line: use a 1-px tall strip so PowerPoint always gets positive cy.
  slide.addShape(pptx.ShapeType.line, {
    x: px(x), y: px(y), w: px(w), h: px(1),
    line: { color, width: thickness },
    flipV: false,
  });
}

/** Line from point (x1,y1) to (x2,y2) in CSS px. Handles any direction with
 *  positive cx/cy + flip flags so PowerPoint (strict schema) doesn't reject it. */
function segment(slide, x1, y1, x2, y2, lineOpts) {
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 1);   // never zero
  const h = Math.max(Math.abs(y2 - y1), 1);
  // The default line goes from (x, y) top-left to (x+w, y+h) bottom-right.
  // We need flipV if the real direction is bottom-left → top-right.
  const goesRight = x2 >= x1;
  const goesDown  = y2 >= y1;
  const flipV = goesRight !== goesDown;  // XOR
  slide.addShape(pptx.ShapeType.line, {
    x: px(minX), y: px(minY), w: px(w), h: px(h),
    line: lineOpts,
    flipV,
  });
}

/** Text block positioned in CSS px. */
function text(slide, content, x, y, w, h, opts = {}) {
  slide.addText(content, {
    x: px(x), y: px(y), w: px(w), h: px(h),
    margin: 0,
    isTextBox: true,
    valign: 'top',
    wrap: true,
    ...opts,
  });
}

function rect(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.rect, {
    x: px(x), y: px(y), w: px(w), h: px(h),
    fill: opts.fill || { color: C.paper },
    line: opts.line || { color: C.rule, width: 0.75 },
  });
}

function pill(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: px(x), y: px(y), w: px(w), h: px(h),
    fill: opts.fill || { type: 'none' },
    line: opts.line || { color: C.ink, width: 0.75 },
    rectRadius: opts.rectRadius ?? Math.min(px(w), px(h)) / 2,
  });
}

function dot(slide, cx, cy, d, color, trans) {
  const fill = trans !== undefined ? { color, transparency: trans } : { color };
  slide.addShape(pptx.ShapeType.ellipse, {
    x: px(cx - d / 2), y: px(cy - d / 2),
    w: px(d), h: px(d),
    fill,
    line: { type: 'none' },
  });
}

/** Placeholder with a diagonal hatch and a corner label chip. */
function placeholder(slide, x, y, w, h, label, opts = {}) {
  const fillColor = opts.fill || C.sand;
  const lineColor = opts.line || C.rule;
  const labelBg = opts.labelBg || C.bg;
  const labelInk = opts.labelInk || C.ink;

  rect(slide, x, y, w, h, {
    fill: { color: fillColor },
    line: { color: lineColor, width: 0.75 },
  });

  const spacing = 24;
  const hatchHex = opts.hatchColor || C.ink;
  const hatchTrans = opts.hatchTrans ?? 92;
  for (let i = -h; i < w; i += spacing) {
    const x1 = i, y1 = 0;
    const x2 = i + h, y2 = h;
    const cx1 = Math.max(0, x1);
    const cy1 = Math.max(0, y1 + (cx1 - x1));
    const cx2 = Math.min(w, x2);
    const cy2 = Math.min(h, y2 - (x2 - cx2));
    if (cx2 > cx1 && cy2 > cy1) {
      slide.addShape(pptx.ShapeType.line, {
        x: px(x + cx1), y: px(y + cy1),
        w: px(cx2 - cx1), h: px(cy2 - cy1),
        line: { color: hatchHex, width: 0.5, transparency: hatchTrans },
      });
    }
  }

  if (label) {
    const lblH = 28;
    const lblW = Math.min(w - 32, 10 * label.length + 24);
    rect(slide, x + 16, y + h - lblH - 14, lblW, lblH, {
      fill: { color: labelBg },
      line: { color: lineColor, width: 0.5 },
    });
    text(slide, label, x + 16 + 10, y + h - lblH - 14, lblW - 20, lblH, {
      fontFace: F.mono,
      fontSize: fpt(12),
      color: labelInk,
      charSpacing: 1,
      valign: 'middle',
      align: 'left',
    });
  }
}

function footer(slide, leftLabel, brandColor = C.muted) {
  text(slide, leftLabel, 120, 1020, 900, 30, {
    fontFace: F.mono,
    fontSize: fpt(14),
    color: C.muted,
    charSpacing: 2,
  });
  text(slide, 'Forliver', 1920 - 120 - 200, 1016, 200, 34, {
    fontFace: F.serif,
    fontSize: fpt(20),
    italic: true,
    color: brandColor,
    align: 'right',
  });
}

function eyebrow(slide, content, x, y, w, color = C.accent) {
  text(slide, content, x, y, w, 28, {
    fontFace: F.mono,
    fontSize: fpt(18),
    color,
    bold: true,
    charSpacing: 2.2,
  });
}

// ==============================================================
// SLIDE 1 — COVER
// ==============================================================
function slide1() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  // Top-right brand mark — layered dot logo + italic serif wordmark
  const markY = 48;
  const markRightEdge = 1920 - 120;
  const wmX = markRightEdge - 220;
  const logoCx = wmX - 22;
  dot(s, logoCx, markY + 14, 28, C.accent2);
  dot(s, logoCx - 4, markY + 10, 12, C.lightBlue);
  dot(s, logoCx + 4, markY + 18, 16, C.accent);
  text(s, 'Aevena Therapeutics', wmX, markY, 220, 34, {
    fontFace: F.serif,
    fontSize: fpt(22),
    italic: true,
    color: C.ink,
    valign: 'middle',
  });

  // Confidential signature — top-right under the brand mark
  text(s, 'Confidential · For Hospital Partners',
    1920 - 120 - 400, 96, 400, 24, {
    fontFace: F.mono,
    fontSize: fpt(13),
    color: C.muted,
    charSpacing: 2,
    align: 'right',
  });

  // Small lead paragraph placed above the eyebrow (so it doesn't clash with the huge title)
  text(s,
    'Introducing Forliver — the first oral small-molecule therapy approved to slow\nthe cellular mechanisms of biological aging in adults.',
    120, 260, 1100, 80, {
    fontFace: F.sans,
    fontSize: fpt(22),
    color: C.ink2,
    lineSpacingMultiple: 1.4,
  });

  // Eyebrow above the big title
  eyebrow(s, 'Forliver  ·  NDA 217-034  ·  FDA Approved', 120, 380, 1000);

  // Huge editorial title — fits within left column, above the meta strip
  s.addText(
    [
      { text: 'A quieter', options: { breakLine: true } },
      { text: 'kind of',   options: { breakLine: true } },
      { text: 'ageing.',   options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(430), w: px(1100), h: px(480),
      fontFace: F.serif,
      fontSize: 82,
      color: C.ink,
      charSpacing: -2,
      lineSpacingMultiple: 0.92,
      valign: 'top',
      margin: 0,
      isTextBox: true,
      wrap: true,
    }
  );

  // Hero placeholder (right column)
  placeholder(s, 1920 - 120 - 560, 160, 560, 780, 'Editorial portrait · warm daylight · 4:5');

  // Meta strip (bottom-left, three groups)
  const metaY = 972;
  const metaGroups = [
    { k: 'Prepared for', v: 'Hospital Systems Partnership' },
    { k: 'Document',     v: '10 of 10 · April 2026' },
    { k: 'Presenter',    v: 'Office of the VP, Commercial' },
  ];
  let mx = 120;
  for (const g of metaGroups) {
    text(s, g.k, mx, metaY, 340, 20, {
      fontFace: F.mono, fontSize: fpt(13), color: C.muted, charSpacing: 2,
    });
    text(s, g.v, mx, metaY + 24, 340, 24, {
      fontFace: F.mono, fontSize: fpt(14), color: C.ink, bold: true, charSpacing: 1.5,
    });
    mx += 360;
  }
}

// ==============================================================
// SLIDE 2 — PROBLEM
// ==============================================================
function slide2() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  eyebrow(s, 'The Context', 120, 160, 700);

  s.addText(
    [
      { text: 'Aging is the',     options: { breakLine: true } },
      { text: 'largest untreated',options: { breakLine: true } },
      { text: 'risk factor',      options: { italic: true, color: C.accent } },
      { text: ' in',              options: { breakLine: true } },
      { text: 'modern medicine.'},
    ],
    {
      x: px(120), y: px(210), w: px(820), h: px(510),
      fontFace: F.serif,
      fontSize: 44,
      color: C.ink,
      charSpacing: -1,
      lineSpacingMultiple: 1.02,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Age is the single greatest predictor of cardiovascular, metabolic, oncologic and neurodegenerative disease. Yet until now, no approved therapy has targeted the biology of aging itself — only its downstream consequences.',
    120, 750, 720, 200, {
      fontFace: F.sans, fontSize: fpt(22), color: C.ink2,
      lineSpacingMultiple: 1.55,
    });

  const stats = [
    { n: '83',  sup: '%',    k: 'Chronic disease burden',           d: 'of U.S. hospital admissions over 55 are attributable to age-associated conditions.' },
    { n: '9',   sup: '/10',  k: 'Top causes of death',              d: 'nine of the ten leading causes of mortality have biological aging as their primary driver.' },
    { n: '0',   sup: '',     k: 'Approved therapies — until now',   d: 'no prior molecule has received FDA approval for the underlying process of aging.' },
  ];

  const colX = 1040;
  const colW = 760;
  const blockH = 240;
  const gap = 22;
  const bottomY = 930;
  const totalH = stats.length * blockH + (stats.length - 1) * gap;
  let y = bottomY - totalH;
  for (const st of stats) {
    rule(s, colX, y, colW, C.rule, 0.75);
    const numText = [{ text: st.n, options: { color: C.ink } }];
    if (st.sup) numText.push({ text: st.sup, options: { superscript: true, color: C.accent } });
    s.addText(numText, {
      x: px(colX), y: px(y + 20), w: px(colW), h: px(130),
      fontFace: F.serif,
      fontSize: 56,
      color: C.ink,
      charSpacing: -2,
      lineSpacingMultiple: 0.9,
      margin: 0, isTextBox: true,
      valign: 'top',
    });
    text(s, st.k, colX, y + 156, colW, 20, {
      fontFace: F.mono, fontSize: fpt(13), color: C.muted, charSpacing: 2,
    });
    text(s, st.d, colX, y + 180, 440, 70, {
      fontFace: F.sans, fontSize: fpt(18), color: C.ink2, lineSpacingMultiple: 1.4,
    });
    y += blockH + gap;
  }

  footer(s, '02 / 10 · The Context');
}

// ==============================================================
// SLIDE 3 — INTRODUCING (dark)
// ==============================================================
function slide3() {
  const s = pptx.addSlide();
  bg(s, C.accent);

  eyebrow(s, 'Introducing', 120, 180, 600, C.lightBlue);

  s.addText(
    [
      { text: 'For',   options: { italic: false } },
      { text: 'liver', options: { italic: true } },
      { text: '™',     options: { superscript: true } },
    ],
    {
      x: px(120), y: px(220), w: px(1400), h: px(340),
      fontFace: F.serif,
      fontSize: 110,
      color: C.inkInv,
      charSpacing: -3,
      lineSpacingMultiple: 0.9,
      margin: 0, isTextBox: true, wrap: false,
    }
  );

  text(s,
    'A once-daily oral small-molecule therapy. Cleared by the FDA for the reduction of cellular senescence burden in adults aged 45–80.',
    120, 640, 900, 180, {
      fontFace: F.sans, fontSize: fpt(24), color: C.paleBlue,
      lineSpacingMultiple: 1.45,
    });

  placeholder(s, 1920 - 120 - 380, 96, 380, 540, 'Product still life · vial + tablet', {
    fill: C.deepBlue,
    line: C.midBorder,
    labelBg: C.deepBlue,
    labelInk: C.lightBlue,
    hatchColor: 'FFFFFF',
    hatchTrans: 95,
  });

  const pills = [
    'FDA Approved — NDA 217-034',
    'Oral · Once Daily · 25 mg',
    'Adults 45–80',
  ];
  const pillH = 50;
  const pillGap = 14;
  const padR = 120;
  // Generous widths tuned for mono 15px with charSpacing 1.5 to avoid wrapping in LibreOffice
  const widths = pills.map(l => Math.max(380, 60 + l.length * 11 + 30));
  const totalPillH = pills.length * pillH + (pills.length - 1) * pillGap;
  let py = 970 - totalPillH;
  for (let i = 0; i < pills.length; i++) {
    const pw = widths[i];
    const pxLeft = 1920 - padR - pw;
    pill(s, pxLeft, py, pw, pillH, {
      fill: { type: 'none' },
      line: { color: C.darkRule, width: 0.75 },
    });
    dot(s, pxLeft + 22, py + pillH / 2, 10, C.lightBlue);
    text(s, pills[i], pxLeft + 40, py, pw - 56, pillH, {
      fontFace: F.mono, fontSize: fpt(15), color: C.darkSub,
      valign: 'middle', charSpacing: 1.5,
    });
    py += pillH + pillGap;
  }

  text(s, '03 / 10 · Product', 120, 1020, 900, 30, {
    fontFace: F.mono, fontSize: fpt(14), color: C.darkMuted, charSpacing: 2,
  });
  text(s, 'Forliver', 1920 - 120 - 200, 1016, 200, 34, {
    fontFace: F.serif, fontSize: fpt(20), italic: true, color: C.paleBlue, align: 'right',
  });
}

// ==============================================================
// SLIDE 4 — MECHANISM
// ==============================================================
function slide4() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  eyebrow(s, 'Mechanism of Action', 120, 96, 700);

  s.addText(
    [
      { text: 'Three coordinated', options: { breakLine: true } },
      { text: 'effects, ', options: {} },
      { text: 'one molecule.', options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(140), w: px(1200), h: px(200),
      fontFace: F.serif,
      fontSize: 38,
      color: C.ink,
      charSpacing: -1,
      lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Small molecule · MW 428.5 · Oral bioavailability 71%',
    1400, 180, 420, 40, {
      fontFace: F.mono, fontSize: fpt(13), color: C.muted,
      charSpacing: 2, align: 'right',
    });

  const colTop = 400;
  const colH = 520;
  const gap = 48;
  const colW = (1920 - 240 - gap * 2) / 3;
  const cols = [
    { step: '01 — Clearance',   titleA: 'Selectively clears ', titleB: 'senescent cells',
      d: 'Induces apoptosis in damaged, non-dividing cells that accumulate with age and drive chronic inflammation, while sparing healthy tissue.' },
    { step: '02 — Restoration', titleA: 'Restores ', titleB: 'mitochondrial', titleC: ' capacity',
      d: 'Upregulates NAD+ biosynthesis pathways and rebalances mitochondrial dynamics, improving tissue-level energetics across organs.' },
    { step: '03 — Protection',  titleA: 'Preserves ', titleB: 'epigenetic', titleC: ' integrity',
      d: 'Stabilises DNA methylation clocks and reduces inflammatory signalling, measurably slowing the rate of biological aging on validated assays.' },
  ];

  for (let i = 0; i < cols.length; i++) {
    const cx = 120 + i * (colW + gap);
    rule(s, cx, colTop, colW, C.ink, 1.0);
    text(s, cols[i].step, cx, colTop + 16, colW, 24, {
      fontFace: F.mono, fontSize: fpt(13), color: C.accent, charSpacing: 2,
    });
    const runs = [
      { text: cols[i].titleA, options: {} },
      { text: cols[i].titleB, options: { italic: true, color: C.accent } },
    ];
    if (cols[i].titleC) runs.push({ text: cols[i].titleC, options: {} });
    s.addText(runs, {
      x: px(cx), y: px(colTop + 48), w: px(colW), h: px(140),
      fontFace: F.serif,
      fontSize: 22,
      color: C.ink,
      charSpacing: -0.5,
      lineSpacingMultiple: 1.05,
      margin: 0, isTextBox: true, wrap: true,
    });
    text(s, cols[i].d, cx, colTop + 200, colW, 140, {
      fontFace: F.sans, fontSize: fpt(18), color: C.ink2, lineSpacingMultiple: 1.5,
    });

    const diagH = 160;
    const diagY = colTop + colH - diagH;
    rect(s, cx, diagY, colW, diagH, {
      fill: { color: C.bg2 }, line: { color: C.rule, width: 0.5 },
    });
    const svgW = 400;
    const sx = colW / svgW;

    if (i === 0) {
      // Scattered circles — "clearance"
      const centers = [
        { cx: 60,  cy: 80,  r: 14, a: 100 },
        { cx: 120, cy: 50,  r: 10, a: 30  },
        { cx: 140, cy: 110, r: 12, a: 20  },
        { cx: 210, cy: 70,  r: 16, a: 100 },
        { cx: 260, cy: 120, r: 9,  a: 20  },
        { cx: 320, cy: 60,  r: 13, a: 100 },
        { cx: 360, cy: 100, r: 8,  a: 25  },
      ];
      for (const c of centers) {
        const d = c.r * 2 * sx;
        const cxAbs = cx + c.cx * sx;
        const cyAbs = diagY + c.cy;
        s.addShape(pptx.ShapeType.ellipse, {
          x: px(cxAbs - d / 2), y: px(cyAbs - d / 2),
          w: px(d), h: px(d),
          fill: c.a === 100
            ? { color: C.accent }
            : { color: C.accent, transparency: 100 - c.a },
          line: { type: 'none' },
        });
      }
      rule(s, cx, diagY + 150, colW, C.rule, 0.5);
    } else if (i === 1) {
      // Two curvy paths — "restoration"
      const pts1 = [[10,120],[40,90],[80,70],[120,90],[160,100],[200,90],[240,75],[280,65],[320,55],[360,45],[390,30]];
      for (let k = 0; k < pts1.length - 1; k++) {
        const [x1,y1] = pts1[k], [x2,y2] = pts1[k+1];
        segment(s,
          cx + x1 * sx, diagY + y1,
          cx + x2 * sx, diagY + y2,
          { color: C.accent, width: 1.75 });
      }
      const pts2 = [[10,140],[40,120],[80,100],[120,120],[160,130],[200,120],[240,110],[280,105],[320,100],[360,95],[390,90]];
      for (let k = 0; k < pts2.length - 1; k++) {
        const [x1,y1] = pts2[k], [x2,y2] = pts2[k+1];
        segment(s,
          cx + x1 * sx, diagY + y1,
          cx + x2 * sx, diagY + y2,
          { color: C.accent2, width: 1.25, dashType: 'dash' });
      }
      rule(s, cx, diagY + 150, colW, C.rule, 0.5);
    } else {
      // DNA helix-ish — "protection"
      const xs = [40, 140, 240, 340];
      for (const baseX of xs) {
        const wavePts1 = [
          [baseX, 20],[baseX + 12, 40],[baseX + 22, 60],[baseX + 28, 80],
          [baseX + 22, 100],[baseX + 12, 120],[baseX, 140],
        ];
        for (let k = 0; k < wavePts1.length - 1; k++) {
          const [x1,y1] = wavePts1[k], [x2,y2] = wavePts1[k+1];
          segment(s,
            cx + x1 * sx, diagY + y1,
            cx + x2 * sx, diagY + y2,
            { color: C.accent, width: 1.2 });
        }
        const wavePts2 = [
          [baseX + 40, 20],[baseX + 28, 40],[baseX + 18, 60],[baseX + 12, 80],
          [baseX + 18, 100],[baseX + 28, 120],[baseX + 40, 140],
        ];
        for (let k = 0; k < wavePts2.length - 1; k++) {
          const [x1,y1] = wavePts2[k], [x2,y2] = wavePts2[k+1];
          segment(s,
            cx + x1 * sx, diagY + y1,
            cx + x2 * sx, diagY + y2,
            { color: C.accent, width: 1.2 });
        }
        for (const ry of [40, 80, 120]) {
          segment(s,
            cx + baseX * sx,        diagY + ry,
            cx + (baseX + 40) * sx, diagY + ry,
            { color: C.rule, width: 0.75 });
        }
      }
      rule(s, cx, diagY + 150, colW, C.rule, 0.5);
    }
  }

  footer(s, '04 / 10 · Mechanism');
}

// ==============================================================
// SLIDE 5 — CLINICAL PROGRAM
// ==============================================================
function slide5() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  const totalW = 1920 - 240;
  const gap = 80;
  const lW = (totalW - gap) * (1.1 / 2.1);
  const rW = (totalW - gap) * (1.0 / 2.1);

  eyebrow(s, 'Clinical Program', 120, 96, 600);

  s.addText(
    [
      { text: 'Every phase', options: { breakLine: true } },
      { text: 'cleared.',    options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(140), w: px(lW), h: px(260),
      fontFace: F.serif,
      fontSize: 50,
      color: C.ink,
      charSpacing: -1,
      lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Forliver completed a three-phase development program enrolling 4,182 participants across 37 sites, culminating in FDA approval in Q1 2026.',
    120, 430, lW - 40, 140, {
      fontFace: F.sans, fontSize: fpt(22), color: C.ink2, lineSpacingMultiple: 1.5,
    });

  const phases = [
    { k: 'Phase I',    t: 'Safety',     chk: '✓ Cleared',   done: true },
    { k: 'Phase II',   t: 'Dose',       chk: '✓ Cleared',   done: true },
    { k: 'Phase III',  t: 'Efficacy',   chk: '✓ Cleared',   done: true },
    { k: 'FDA',        t: 'NDA 217-034',chk: '✓ Approved',  done: true },
  ];
  const phaseGap = 8;
  const phaseW = (lW - phaseGap * 3) / 4;
  const phaseH = 200;
  const phaseY = 680;
  for (let i = 0; i < phases.length; i++) {
    const p = phases[i];
    const fx = 120 + i * (phaseW + phaseGap);
    rect(s, fx, phaseY, phaseW, phaseH, {
      fill: { color: p.done ? C.accent : C.paper },
      line: { color: p.done ? C.accent : C.rule, width: 0.75 },
    });
    const fg = p.done ? C.inkInv : C.ink;
    const fgMono = p.done ? C.phaseMuted : C.muted;
    text(s, p.k, fx + 16, phaseY + 16, phaseW - 32, 20, {
      fontFace: F.mono, fontSize: fpt(12), color: fgMono, charSpacing: 2,
    });
    text(s, p.t, fx + 16, phaseY + 44, phaseW - 32, 110, {
      fontFace: F.serif, fontSize: fpt(26), color: fg, charSpacing: -0.5,
      lineSpacingMultiple: 1.05,
    });
    text(s, p.chk, fx + 16, phaseY + phaseH - 32, phaseW - 32, 22, {
      fontFace: F.mono, fontSize: fpt(12), color: fgMono, charSpacing: 1.5,
    });
  }

  placeholder(s, 120 + lW + gap, 96, rW, 824, 'Editorial · clinician + patient · hospital light');

  footer(s, '05 / 10 · Clinical Program');
}

// ==============================================================
// SLIDE 6 — EFFICACY
// ==============================================================
function slide6() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  eyebrow(s, 'Pivotal Trial — HORIZON-3', 120, 96, 700);

  s.addText(
    [
      { text: 'A measurable reduction in', options: { breakLine: true } },
      { text: 'biological age.',           options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(140), w: px(1500), h: px(220),
      fontFace: F.serif, fontSize: 40, color: C.ink,
      charSpacing: -1, lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Randomized, double-blind, placebo-controlled · 2,104 participants · 24-month primary endpoint · ITT population.',
    120, 350, 1500, 50, {
      fontFace: F.sans, fontSize: fpt(20), color: C.muted,
    });

  const panelsY = 440;
  const panelsH = 480;
  const pGap = 64;
  const totalW = 1920 - 240;
  const chartW = (totalW - pGap) * (1.2 / 2.2);
  const metW = (totalW - pGap) * (1.0 / 2.2);

  rect(s, 120, panelsY, chartW, panelsH, {
    fill: { color: C.paper }, line: { color: C.rule, width: 0.5 },
  });
  text(s, 'Mean epigenetic age Δ vs. chronological', 120 + 32, panelsY + 32, chartW - 64, 22, {
    fontFace: F.mono, fontSize: fpt(13), color: C.muted, charSpacing: 2,
  });
  text(s, 'Forliver vs. placebo, months 0 – 24', 120 + 32, panelsY + 60, chartW - 64, 36, {
    fontFace: F.serif, fontSize: fpt(28), color: C.ink, charSpacing: -0.5,
  });

  const cbX = 120 + 32;
  const cbY = panelsY + 115;
  const cbW = chartW - 64;
  const cbH = panelsH - 115 - 50;
  const svgW = 700;
  const scaleX = cbW / svgW, scaleY = cbH / 320;
  const toX = (vx) => cbX + vx * scaleX;
  const toY = (vy) => cbY + vy * scaleY;

  // Axes — use segment() so PowerPoint gets positive cx/cy always.
  segment(s, toX(60), toY(20),  toX(60), toY(280), { color: C.ink, width: 0.75 });
  segment(s, toX(60), toY(280), toX(680), toY(280), { color: C.ink, width: 0.75 });
  // Grid lines
  for (const gy of [40, 100, 160, 220]) {
    segment(s, toX(60), toY(gy), toX(680), toY(gy),
      { color: C.rule, width: 0.5, dashType: 'dash' });
  }

  // Placebo (dashed, muted)
  const placebo = [[60,160],[185,150],[310,140],[435,128],[560,118],[680,106]];
  for (let k = 0; k < placebo.length - 1; k++) {
    const [x1,y1] = placebo[k], [x2,y2] = placebo[k+1];
    segment(s, toX(x1), toY(y1), toX(x2), toY(y2),
      { color: C.muted, width: 1.25, dashType: 'dash' });
  }
  // Forliver (solid accent)
  const forliver = [[60,160],[185,184],[310,208],[435,228],[560,244],[680,254]];
  for (let k = 0; k < forliver.length - 1; k++) {
    const [x1,y1] = forliver[k], [x2,y2] = forliver[k+1];
    segment(s, toX(x1), toY(y1), toX(x2), toY(y2),
      { color: C.accent, width: 2 });
  }
  // Markers
  for (const [mxV, myV] of forliver) {
    const r = 5;
    const cxP = toX(mxV), cyP = toY(myV);
    s.addShape(pptx.ShapeType.ellipse, {
      x: px(cxP - r), y: px(cyP - r),
      w: px(2 * r), h: px(2 * r),
      fill: { color: C.accent }, line: { type: 'none' },
    });
  }

  // X-axis labels (CSS-px coords)
  const xLabels = [['M0',60],['M6',175],['M12',300],['M18',425],['M24',550],['EOS',652]];
  for (const [lbl, vx] of xLabels) {
    text(s, lbl, toX(vx) - 12, toY(290), 50, 20, {
      fontFace: F.mono, fontSize: fpt(14), color: C.muted, charSpacing: 1.5,
    });
  }
  // Y-axis labels
  const yLabels = [['+3',44],['+1',104],['0',164],['-2',224]];
  for (const [lbl, vy] of yLabels) {
    text(s, lbl, toX(5), toY(vy) - 10, 40, 18, {
      fontFace: F.mono, fontSize: fpt(13), color: C.muted, charSpacing: 1.5, align: 'right',
    });
  }

  // Series labels
  text(s, 'Placebo', toX(555), toY(96) - 14, 120, 28, {
    fontFace: F.serif, italic: true, fontSize: fpt(20), color: C.muted,
  });
  text(s, 'Forliver', toX(555), toY(246) - 14, 120, 30, {
    fontFace: F.serif, italic: true, fontSize: fpt(22), color: C.accent,
  });

  // Right metrics 2×2
  const mBoxes = [
    { n: '-2.4', sup: 'yr', k: 'Biological age (ΔDunedinPACE)', d: 'vs. +0.9 yr in placebo over 24 months. p < 0.001.' },
    { n: '38',   sup: '%',  k: 'Senescent cell burden',          d: 'reduction in p16-INK4a+ cells, measured by tissue biopsy subset.' },
    { n: '27',   sup: '%',  k: 'All-cause hospitalisation',      d: 'relative reduction over 24 months · HR 0.73 (95% CI 0.61–0.86).' },
    { n: '92',   sup: '%',  k: 'Adherence at 24 months',         d: 'on a once-daily oral regimen. Placebo: 88%.' },
  ];
  const mx0 = 120 + chartW + pGap;
  const mColGap = 24;
  const mColW = (metW - mColGap) / 2;
  const mRowH = panelsH / 2;
  for (let i = 0; i < mBoxes.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const bx = mx0 + col * (mColW + mColGap);
    const by = panelsY + row * mRowH;
    rule(s, bx, by, mColW, C.ink, 0.9);
    const b = mBoxes[i];
    s.addText(
      [
        { text: b.n,   options: { color: C.ink } },
        { text: b.sup, options: { superscript: true, color: C.accent } },
      ],
      {
        x: px(bx), y: px(by + 22), w: px(mColW), h: px(110),
        fontFace: F.serif, fontSize: 42,
        color: C.ink,
        charSpacing: -2, lineSpacingMultiple: 0.95,
        margin: 0, isTextBox: true,
      }
    );
    text(s, b.k, bx, by + 140, mColW, 20, {
      fontFace: F.mono, fontSize: fpt(12), color: C.muted, charSpacing: 2,
    });
    text(s, b.d, bx, by + 168, mColW, 80, {
      fontFace: F.sans, fontSize: fpt(17), color: C.ink2, lineSpacingMultiple: 1.4,
    });
  }

  footer(s, '06 / 10 · Efficacy');
}

// ==============================================================
// SLIDE 7 — SAFETY
// ==============================================================
function slide7() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  eyebrow(s, 'Safety & Tolerability', 120, 96, 700);

  s.addText(
    [
      { text: 'A safety',         options: { breakLine: true } },
      { text: 'profile suited',   options: { breakLine: true } },
      { text: 'to ',              options: {} },
      { text: 'broad use.',       options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(140), w: px(860), h: px(400),
      fontFace: F.serif, fontSize: 44, color: C.ink,
      charSpacing: -1, lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Across 4,182 participants, Forliver demonstrated a favorable tolerability profile consistent with a long-term, chronic therapy. No dose adjustments required for renal or hepatic impairment stages 1–2.',
    120, 580, 860, 140, {
      fontFace: F.sans, fontSize: fpt(20), color: C.ink2, lineSpacingMultiple: 1.55,
    });

  const coY = 760;
  const coH = 170;
  rect(s, 120, coY, 820, coH, {
    fill: { color: C.paper }, line: { color: C.ink, width: 0.75 },
  });
  text(s, 'Serious Adverse Events (Grade ≥3)', 120 + 32, coY + 24, 760, 22, {
    fontFace: F.mono, fontSize: fpt(12), color: C.accent, charSpacing: 2,
  });
  text(s, '2.1% Forliver · 2.4% placebo', 120 + 32, coY + 58, 760, 80, {
    fontFace: F.serif, fontSize: fpt(38), color: C.ink, charSpacing: -0.5,
  });

  // Table
  const tX = 1040;
  const tW = 760;
  let ty = 120;
  rule(s, tX, ty, tW, C.ink, 1.0);
  ty += 14;
  const grid = tW;
  const col1W = grid * (1.6 / 3.6) - 24;
  const col2W = grid * (1.0 / 3.6) - 24;
  const col3W = grid * (1.0 / 3.6);
  const cx1 = tX;
  const cx2 = tX + grid * (1.6 / 3.6);
  const cx3 = tX + grid * (2.6 / 3.6);

  text(s, 'Adverse Event', cx1, ty, col1W, 20, { fontFace: F.mono, fontSize: fpt(12), color: C.muted, charSpacing: 2 });
  text(s, 'Incidence',     cx2, ty, col2W, 20, { fontFace: F.mono, fontSize: fpt(12), color: C.muted, charSpacing: 2 });
  text(s, 'vs. Placebo',   cx3, ty, col3W, 20, { fontFace: F.mono, fontSize: fpt(12), color: C.muted, charSpacing: 2 });
  ty += 28;
  rule(s, tX, ty, tW, C.ink, 0.9);

  const rows = [
    { n: 'Mild nausea',              pct: 4.7, barPct: 0.38, delta: '+1.2 pp' },
    { n: 'Transient fatigue',        pct: 3.8, barPct: 0.30, delta: '+0.6 pp' },
    { n: 'Mild headache',            pct: 3.0, barPct: 0.24, delta: '−0.2 pp' },
    { n: 'Elevated ALT (<2× ULN)',   pct: 1.8, barPct: 0.14, delta: '+0.4 pp' },
    { n: 'Discontinuation due to AE',pct: 2.3, barPct: 0.18, delta: '+0.3 pp' },
  ];
  const rowH = 110;
  for (const r of rows) {
    text(s, r.n, cx1, ty + 20, col1W, 44, {
      fontFace: F.serif, fontSize: fpt(22), color: C.ink, charSpacing: -0.3,
    });
    const barY = ty + 42;
    const barFullW = col2W;
    rect(s, cx2, barY, barFullW, 6, { fill: { color: C.bg2 }, line: { type: 'none' } });
    rect(s, cx2, barY, barFullW * r.barPct, 6, { fill: { color: C.accent }, line: { type: 'none' } });
    text(s, r.pct.toFixed(1) + '%', cx2, ty + 60, col2W, 26, {
      fontFace: F.mono, fontSize: fpt(15), color: C.ink2, charSpacing: 1.5,
    });
    text(s, r.delta, cx3, ty + 38, col3W, 26, {
      fontFace: F.mono, fontSize: fpt(15), color: C.ink2, charSpacing: 1.5,
    });
    ty += rowH;
    rule(s, tX, ty, tW, C.rule, 0.5);
  }

  footer(s, '07 / 10 · Safety');
}

// ==============================================================
// SLIDE 8 — CANDIDATE
// ==============================================================
function slide8() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  const gap = 80;
  const totalW = 1920 - 240;
  const colW = (totalW - gap) / 2;

  placeholder(s, 120, 96, colW, 824, 'Editorial · mid-60s patient · natural light');

  const rx = 120 + colW + gap;
  eyebrow(s, 'The Candidate Patient', rx, 96, colW);

  s.addText(
    [
      { text: 'Who benefits', options: { breakLine: true } },
      { text: 'most.',        options: { italic: true, color: C.accent } },
    ],
    {
      x: px(rx), y: px(140), w: px(colW), h: px(240),
      fontFace: F.serif, fontSize: 46, color: C.ink,
      charSpacing: -1, lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'Forliver is indicated for adults aged 45–80 with elevated biological aging markers and at least one qualifying age-associated risk factor.',
    rx, 400, colW - 40, 140, {
      fontFace: F.sans, fontSize: fpt(21), color: C.ink2, lineSpacingMultiple: 1.5,
    });

  const items = [
    'Adults 45–80 with elevated p16-INK4a or Horvath clock acceleration.',
    'Pre-clinical cardiometabolic risk, frailty markers, or early cognitive decline.',
    'Stable on existing comorbidity management — Forliver is complementary, not replacing.',
    'Patients seeking an evidence-based preventative intervention rather than cosmetic treatment.',
  ];
  let ly = 570;
  const itemH = 90;
  rule(s, rx, ly, colW, C.rule, 0.75);
  for (let i = 0; i < items.length; i++) {
    const key = String(i + 1).padStart(2, '0');
    text(s, key, rx, ly + 22, 36, 24, {
      fontFace: F.mono, fontSize: fpt(13), color: C.accent, charSpacing: 1.5,
    });
    text(s, items[i], rx + 52, ly + 20, colW - 52, 70, {
      fontFace: F.sans, fontSize: fpt(20), color: C.ink, lineSpacingMultiple: 1.4,
    });
    ly += itemH;
    rule(s, rx, ly, colW, C.rule, 0.5);
  }

  footer(s, '08 / 10 · Candidate');
}

// ==============================================================
// SLIDE 9 — PARTNERSHIP
// ==============================================================
function slide9() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  eyebrow(s, 'Hospital Partnership Model', 120, 96, 700);

  s.addText(
    [
      { text: 'Three ways to',     options: { breakLine: true } },
      { text: 'bring Forliver to ',options: {} },
      { text: 'your system.',      options: { italic: true, color: C.accent } },
    ],
    {
      x: px(120), y: px(140), w: px(1600), h: px(220),
      fontFace: F.serif, fontSize: 42, color: C.ink,
      charSpacing: -1, lineSpacingMultiple: 1.0,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    'We build the pathway around your formulary, your providers, and your patient population — not the other way around.',
    120, 370, 1500, 60, {
      fontFace: F.sans, fontSize: fpt(20), color: C.muted,
    });

  const cardsY = 470;
  const cardsH = 460;
  const cGap = 24;
  const cardW = (1920 - 240 - cGap * 2) / 3;
  const cards = [
    { num: 'TIER 01 — Integrated',    tA: 'Formulary', tB: 'inclusion',
      d: 'Standard P&T adoption with clinical in-servicing, E-prescribing templates and patient support program integration. Forliver becomes a line item alongside existing chronic therapies.',
      f: [['Onboarding', '6–8 weeks'], ['Volume', 'Open']],
      dark: false },
    { num: 'TIER 02 — Clinical Center', tA: 'Center of', tB: 'Excellence',
      d: 'Co-branded longevity clinic within your system. Dedicated protocols, DunedinPACE screening, and shared outcomes registry. Preferred pricing and marketing co-investment.',
      f: [['Onboarding', '12 weeks'], ['Volume', '2,000+ / yr']],
      dark: true },
    { num: 'TIER 03 — Research',      tA: 'Real-world', tB: 'evidence',
      d: 'Post-marketing evidence collaboration. Your institution contributes de-identified outcomes data; we contribute research funding, first publication rights and indication-expansion co-authorship.',
      f: [['Term', '24 months'], ['Funding', 'Grant-backed']],
      dark: false },
  ];
  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const cx = 120 + i * (cardW + cGap);
    const fg  = c.dark ? C.inkInv : C.ink;
    const fgD = c.dark ? C.paleBlue : C.ink2;
    const fgK = c.dark ? C.lightBlue : C.accent;
    const fgT = c.dark ? C.lightBlue : C.muted;
    rect(s, cx, cardsY, cardW, cardsH, {
      fill: { color: c.dark ? C.accent : C.paper },
      line: { color: c.dark ? C.accent : C.rule, width: 0.75 },
    });
    text(s, c.num, cx + 32, cardsY + 32, cardW - 64, 22, {
      fontFace: F.mono, fontSize: fpt(13), color: fgK, charSpacing: 2,
    });
    s.addText(
      [
        { text: c.tA, options: { breakLine: true } },
        { text: c.tB, options: { italic: true } },
      ],
      {
        x: px(cx + 32), y: px(cardsY + 72), w: px(cardW - 64), h: px(150),
        fontFace: F.serif, fontSize: fpt(36), color: fg,
        charSpacing: -0.5, lineSpacingMultiple: 1.05,
        margin: 0, isTextBox: true, wrap: true,
      }
    );
    text(s, c.d, cx + 32, cardsY + 230, cardW - 64, 160, {
      fontFace: F.sans, fontSize: fpt(17), color: fgD, lineSpacingMultiple: 1.5,
    });
    const fy = cardsY + cardsH - 72;
    const halfW = (cardW - 64) / 2;
    for (let k = 0; k < c.f.length; k++) {
      const [tag, val] = c.f[k];
      const fx = cx + 32 + k * halfW;
      text(s, tag, fx, fy, halfW - 8, 18, {
        fontFace: F.mono, fontSize: fpt(11), color: fgT, charSpacing: 1.5,
      });
      text(s, val, fx, fy + 22, halfW - 8, 40, {
        fontFace: F.serif, fontSize: fpt(24), color: fg, charSpacing: -0.3,
      });
    }
  }

  footer(s, '09 / 10 · Partnership');
}

// ==============================================================
// SLIDE 10 — NEXT STEPS
// ==============================================================
function slide10() {
  const s = pptx.addSlide();
  bg(s, C.bg);

  const gap = 96;
  const totalW = 1920 - 240;
  const lW = (totalW - gap) * (1.2 / 2.2);
  const rW = (totalW - gap) * (1.0 / 2.2);
  const rX = 120 + lW + gap;

  eyebrow(s, 'Next Steps', 120, 180, 600);

  s.addText(
    [
      { text: "Let's find",  options: { breakLine: true } },
      { text: 'the ',        options: {} },
      { text: 'right fit',   options: { italic: true, color: C.accent } },
      { text: '',            options: { breakLine: true } },
      { text: 'together.',   options: {} },
    ],
    {
      x: px(120), y: px(220), w: px(lW), h: px(440),
      fontFace: F.serif, fontSize: 70,
      color: C.ink,
      charSpacing: -2, lineSpacingMultiple: 0.92,
      margin: 0, isTextBox: true, wrap: true,
    }
  );

  text(s,
    "We'd like to continue the conversation with your Pharmacy, Medical Affairs and Service Line leadership — a 60-minute working session to review your population data and identify the partnership tier that makes sense.",
    120, 700, lW - 20, 180, {
      fontFace: F.sans, fontSize: fpt(22), color: C.ink2, lineSpacingMultiple: 1.5,
    });

  const ctaY = 910;
  const ctaW = 300;
  const ctaH = 56;
  rect(s, 120, ctaY, ctaW, ctaH, {
    fill: { color: C.accent }, line: { type: 'none' },
  });
  text(s, 'Book a follow-up  →', 120 + 24, ctaY, ctaW - 48, ctaH, {
    fontFace: F.mono, fontSize: fpt(14), color: C.inkInv, charSpacing: 2,
    valign: 'middle',
  });
  text(s, 'Or reply to this briefing directly', 120 + ctaW + 20, ctaY + 8, 500, 40, {
    fontFace: F.mono, fontSize: fpt(13), color: C.muted, charSpacing: 2,
    valign: 'middle',
  });

  // Right: contact card
  const cardY = 180;
  const cardH = 720;
  rect(s, rX, cardY, rW, cardH, {
    fill: { color: C.paper }, line: { color: C.rule, width: 0.75 },
  });
  const lines = [
    ['Lead Contact', 'Dr. E. Hallowell',                     'serif-lg'],
    ['Role',         'VP, Commercial · Aevena Therapeutics', 'serif-sm'],
    ['Email',        'e.hallowell@aevena-tx.com',            'mono-sm'],
    ['Direct',       '+1 (617) 555-0134',                    'mono-sm'],
    ['Office',       'One Kendall Square · Cambridge, MA',   'serif-sm'],
  ];
  const lx = rX + 40;
  const lw = rW - 80;
  let ly = cardY + 40;
  const lineH = 128;
  rule(s, lx, ly, lw, C.rule, 0.75);
  for (const [k, v, variant] of lines) {
    text(s, k, lx, ly + 22, 140, 24, {
      fontFace: F.mono, fontSize: fpt(12), color: C.muted, charSpacing: 2,
    });
    const isMono = variant.startsWith('mono');
    const isLg = variant.endsWith('lg');
    text(s, v, lx + 150, ly + 14, lw - 150, 100, {
      fontFace: isMono ? F.mono : F.serif,
      fontSize: isLg ? fpt(28) : (isMono ? fpt(22) : fpt(22)),
      color: C.ink,
      charSpacing: isMono ? 0 : -0.3,
      lineSpacingMultiple: 1.2,
    });
    ly += lineH;
    rule(s, lx, ly, lw, C.rule, 0.5);
  }

  footer(s, '10 / 10 · Next Steps');
}

// ==============================================================
// BUILD
// ==============================================================
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

const outPath = path.resolve(process.argv[2] || 'Forliver_Deck.pptx');

/**
 * pptxgenjs (v3.x) emits `<a:pPr>` before EVERY run inside a paragraph when
 * any paragraph-level option (align / lineSpacingMultiple / indentLevel / …)
 * is set on the shape. OOXML says `<a:pPr>` must appear at most ONCE per
 * paragraph, at the very start. LibreOffice is lenient; PowerPoint for Mac
 * strictly rejects the file with "PowerPoint found a problem with content".
 *
 * The fix: after writing the pptx, re-open each slide XML, scan every
 * `<a:p>...</a:p>` paragraph, keep the FIRST `<a:pPr .../>` and drop the
 * rest. This produces a schema-valid deck that opens cleanly on Mac.
 */
function stripDuplicatePPr(xml) {
  return xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (full, body) => {
    let seen = false;
    // Match <a:pPr ...>...</a:pPr>  OR  self-closing <a:pPr ... />
    const stripped = body.replace(
      /<a:pPr\b(?:[^>]*?\/>|[^>]*?>[\s\S]*?<\/a:pPr>)/g,
      (m) => {
        if (!seen) { seen = true; return m; }
        return '';
      }
    );
    return `<a:p>${stripped}</a:p>`;
  });
}

(async () => {
  // Generate the in-memory PPTX buffer via pptxgenjs.
  const buf = await pptx.write({ outputType: 'nodebuffer' });

  // Unzip, patch slide XMLs, re-zip using the same jszip that pptxgenjs uses.
  const JSZip = require('jszip');
  const zip = await JSZip.loadAsync(buf);

  const slidePaths = Object.keys(zip.files).filter(p =>
    /^ppt\/slides\/slide\d+\.xml$/.test(p));

  for (const p of slidePaths) {
    const xml = await zip.file(p).async('string');
    const patched = stripDuplicatePPr(xml);
    zip.file(p, patched);
  }

  const fixed = await zip.generateAsync({ type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  });
  require('fs').writeFileSync(outPath, fixed);
  console.log('Wrote:', outPath);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
