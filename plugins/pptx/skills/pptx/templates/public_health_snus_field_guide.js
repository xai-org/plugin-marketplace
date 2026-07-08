// snus-field-guide.js
// Recreates "Snus — A Field Guide" using pptxgenjs.
// Run: node snus-field-guide.js
//
// Output: ./snus-field-guide.pptx

const pptxgen = require("pptxgenjs");

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bgLight:   "EFEAE0", // cream/sand main background
  bgPanel:   "E7E0D2", // slightly darker panel for left-side illustrations
  bgDark:    "1E2820", // dark green/charcoal (slides 4 & 10)
  ink:       "1E2820", // primary text (also used for dark BGs ↔ inverted)
  inkSoft:   "5C5C50", // body/secondary
  muted:     "9A9A82", // small caps / monospace metadata
  rule:      "C9C2B2", // hairline rules
  accent:    "B26B3A", // burnt orange / copper
  accentSoft:"D4A77A", // softer copper for shapes
  paperOnDark: "EFEAE0", // light text on dark
  mutedOnDark: "6B7268",
};

// ─── Fonts ──────────────────────────────────────────────────────────────────
const F = {
  serif:  "Georgia",            // big titles + italic accents
  sans:   "Calibri",            // body
  mono:   "Consolas",           // metadata / labels
};

// ─── Layout ─────────────────────────────────────────────────────────────────
const W = 13.333;
const H = 7.5;
const M = 0.6; // margin

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Snus — A Field Guide";
pres.author = "Field Guide";

// ─── Helpers ────────────────────────────────────────────────────────────────
function addHeader(slide, num, sectionLabel, dark = false) {
  const col = dark ? C.mutedOnDark : C.muted;
  // Top-left: page indicator
  slide.addText(
    [
      { text: String(num).padStart(2, "0"), options: { color: col } },
      { text: " / ", options: { color: col } },
      { text: "10", options: { color: col } },
    ],
    {
      x: M, y: 0.35, w: 3, h: 0.3,
      fontFace: F.mono, fontSize: 9, charSpacing: 2, margin: 0,
    }
  );
  // Top-right: section label
  slide.addText(sectionLabel, {
    x: W - M - 5, y: 0.35, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: col,
    align: "right", charSpacing: 4, margin: 0,
  });
}

function addFooter(slide, num, dark = false) {
  const col = dark ? C.mutedOnDark : C.muted;
  slide.addText("SNUS  ·  A FIELD GUIDE", {
    x: M, y: H - 0.55, w: 4, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: col,
    charSpacing: 4, margin: 0,
  });
  slide.addText(String(num).padStart(2, "0"), {
    x: W - M - 1, y: H - 0.55, w: 1, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: col,
    align: "right", charSpacing: 2, margin: 0,
  });
}

// Hairline rule
function rule(slide, x, y, w, color = C.rule) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width: 0.5 },
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — COVER
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };

  // Right-side panel with concentric rings (a tin of snus, abstracted)
  const panelX = W * 0.52;
  s.addShape(pres.shapes.RECTANGLE, {
    x: panelX, y: 0, w: W - panelX, h: H,
    fill: { color: C.bgPanel }, line: { color: C.bgPanel, width: 0 },
  });

  // Concentric rings centered in the panel
  const cx = panelX + (W - panelX) / 2;
  const cy = H / 2;
  const ringColor = "B8B5A0";
  for (let i = 7; i >= 1; i--) {
    const r = 0.5 + i * 0.55;
    s.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2,
      fill: { type: "none" },
      line: { color: ringColor, width: 0.4 },
    });
  }
  // Horizontal dotted axis
  s.addShape(pres.shapes.LINE, {
    x: panelX + 0.5, y: cy, w: W - panelX - 1, h: 0,
    line: { color: ringColor, width: 0.5, dashType: "dash" },
  });
  // Inner ellipse pair (the pouch silhouette)
  s.addShape(pres.shapes.OVAL, {
    x: cx - 1.7, y: cy - 0.85, w: 3.4, h: 1.7,
    fill: { type: "none" },
    line: { color: C.ink, width: 1.25 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: cx - 1.15, y: cy - 0.55, w: 2.3, h: 1.1,
    fill: { type: "none" },
    line: { color: ringColor, width: 0.6 },
  });

  // Top-left mono label
  s.addText("A FIELD GUIDE  ·  2026", {
    x: M, y: 0.7, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Big title "Snus." with italic middle
  s.addText(
    [
      { text: "Sn", options: { fontFace: F.serif, italic: false } },
      { text: "u", options: { fontFace: F.serif, italic: true } },
      { text: "s.", options: { fontFace: F.serif, italic: false } },
    ],
    {
      x: M, y: 2.5, w: 7, h: 1.7,
      fontSize: 130, color: C.ink, bold: false, margin: 0,
    }
  );

  // Subtitle
  s.addText(
    "A four-hundred-year-old Swedish habit, quietly reshaping the global nicotine market — one tucked pouch at a time.",
    {
      x: M, y: 4.4, w: 5.6, h: 1.1,
      fontFace: F.sans, fontSize: 16, color: C.inkSoft,
      lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  // Footer-style bottom labels
  s.addText("VOL. 01 — ORIGINS TO OUTLOOK", {
    x: M, y: H - 0.55, w: 5, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText("10 SLIDES", {
    x: panelX - 2.2, y: H - 0.55, w: 2, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.muted,
    align: "right", charSpacing: 4, margin: 0,
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — ORIGINS (timeline)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 2, "ORIGINS");
  addFooter(s, 2);

  s.addText("SECTION ONE", {
    x: M, y: 1.3, w: 3, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.muted,
    charSpacing: 5, margin: 0,
  });

  s.addText("Origins.", {
    x: M, y: 1.6, w: 7, h: 1.3,
    fontFace: F.serif, fontSize: 64, color: C.ink, margin: 0,
  });

  s.addText(
    "From a French diplomat's gift to a Swedish national habit — a four-century arc compressed into seven inflection points.",
    {
      x: 8.0, y: 1.7, w: 4.7, h: 1.4,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Timeline
  const tlY = 4.3;
  const tlLeft = M + 0.4;
  const tlRight = W - M - 0.4;
  const tlW = tlRight - tlLeft;

  // Main horizontal line
  s.addShape(pres.shapes.LINE, {
    x: tlLeft, y: tlY, w: tlW, h: 0,
    line: { color: C.rule, width: 0.6 },
  });

  // 7 inflection points alternating above/below
  const events = [
    { year: "1561", text: "Tobacco arrives at the French court", above: true,  filled: true  },
    { year: "1637", text: "First Swedish tobacco cultivation",   above: false, filled: false },
    { year: "1822", text: "Ljunglöfs founds first snus factory", above: true,  filled: true  },
    { year: "1915", text: "Swedish state tobacco monopoly",      above: false, filled: false },
    { year: "1992", text: "Portion-pouch invention",             above: true,  filled: true  },
    { year: "1995", text: "EU-wide ban; Sweden exempt",          above: false, filled: false },
    { year: "2019", text: "Tobacco-free pouches go global",      above: true,  filled: true  },
  ];

  const n = events.length;
  events.forEach((e, i) => {
    const x = tlLeft + (tlW * (i + 0.5)) / n;
    const dotR = 0.09;

    // Vertical tick
    s.addShape(pres.shapes.LINE, {
      x, y: tlY - 1.0, w: 0, h: 2.0,
      line: { color: C.rule, width: 0.4 },
    });

    // Dot on the line
    s.addShape(pres.shapes.OVAL, {
      x: x - dotR, y: tlY - dotR, w: dotR * 2, h: dotR * 2,
      fill: { color: e.filled ? C.ink : C.bgLight },
      line: { color: C.ink, width: 1 },
    });

    // Year + label
    const labelW = 1.8;
    const yYear = e.above ? tlY - 1.05 : tlY + 0.35;
    const yText = e.above ? tlY - 0.7  : tlY + 0.7;
    s.addText(e.year, {
      x: x - labelW / 2, y: yYear, w: labelW, h: 0.3,
      fontFace: F.mono, fontSize: 12, color: C.ink,
      align: "center", margin: 0,
    });
    s.addText(e.text, {
      x: x - labelW / 2, y: yText, w: labelW, h: 0.7,
      fontFace: F.sans, fontSize: 11, color: C.inkSoft,
      align: "center", lineSpacingMultiple: 1.2, margin: 0,
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — ANATOMY OF A POUCH
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 3, "ANATOMY");
  addFooter(s, 3);

  s.addText("Anatomy of a pouch.", {
    x: M, y: 1.9, w: 7, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "A small object engineered for slow, sub-lingual release — five components doing one quiet job.",
    {
      x: 7.6, y: 1.4, w: 5.1, h: 1.3,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Left illustration panel
  const panel = { x: M, y: 3.1, w: 6.4, h: 3.7 };
  s.addShape(pres.shapes.RECTANGLE, {
    x: panel.x, y: panel.y, w: panel.w, h: panel.h,
    fill: { color: C.bgPanel }, line: { color: C.bgPanel, width: 0 },
  });

  // Pouch silhouette (rounded rect) center of panel
  const pouchW = 2.6, pouchH = 1.2;
  const pouchX = panel.x + (panel.w - pouchW) / 2 - 0.3;
  const pouchY = panel.y + (panel.h - pouchH) / 2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: pouchX, y: pouchY, w: pouchW, h: pouchH,
    fill: { color: "EBE4D2" },
    line: { color: C.ink, width: 1.2 },
    rectRadius: 0.55,
  });
  // Tiny dots inside (texture)
  for (let i = 0; i < 6; i++) {
    s.addShape(pres.shapes.OVAL, {
      x: pouchX + 0.4 + (i % 4) * 0.55,
      y: pouchY + 0.35 + Math.floor(i / 4) * 0.45,
      w: 0.05, h: 0.05,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
  }

  // Numbered callouts around pouch — each: small dot + leader line + number label
  const callouts = [
    // [num, dotX, dotY, labelX, labelY, lineFromX, lineFromY]
    { num: "01", dotX: panel.x + panel.w - 0.5, dotY: panel.y + 0.55,
      lineToX: pouchX + pouchW - 0.4, lineToY: pouchY + 0.1 },
    { num: "02", dotX: panel.x + 0.45, dotY: pouchY + 0.4,
      lineToX: pouchX + 0.2, lineToY: pouchY + pouchH * 0.5 },
    { num: "03", dotX: panel.x + panel.w - 0.5, dotY: panel.y + panel.h * 0.6,
      lineToX: pouchX + pouchW - 0.2, lineToY: pouchY + pouchH * 0.7 },
    { num: "04", dotX: panel.x + 0.45, dotY: panel.y + panel.h - 0.65,
      lineToX: pouchX + 0.4, lineToY: pouchY + pouchH - 0.1 },
    { num: "05", dotX: panel.x + panel.w - 0.5, dotY: panel.y + panel.h - 0.5,
      lineToX: pouchX + pouchW - 0.5, lineToY: pouchY + pouchH - 0.05 },
  ];

  callouts.forEach(c => {
    // Leader line
    s.addShape(pres.shapes.LINE, {
      x: c.dotX, y: c.dotY,
      w: c.lineToX - c.dotX, h: c.lineToY - c.dotY,
      line: { color: "A8A48E", width: 0.5 },
    });
    // Copper dot
    s.addShape(pres.shapes.OVAL, {
      x: c.dotX - 0.06, y: c.dotY - 0.06, w: 0.12, h: 0.12,
      fill: { color: C.accent }, line: { color: C.accent, width: 0 },
    });
    // Number label, slightly offset
    const onLeft = c.dotX < panel.x + panel.w / 2;
    s.addText(c.num, {
      x: onLeft ? c.dotX - 0.55 : c.dotX + 0.1,
      y: c.dotY - 0.11, w: 0.5, h: 0.2,
      fontFace: F.mono, fontSize: 8, color: C.ink,
      align: onLeft ? "right" : "left", margin: 0,
    });
  });

  // Right column: 5 components list
  const components = [
    { num: "01", title: "Cellulose fleece",
      desc: "A teabag-like pouch, white or beige, calibrated for moisture release." },
    { num: "02", title: "Ground tobacco or fibre",
      desc: "Air-cured leaf — or, increasingly, a tobacco-free plant fibre carrier." },
    { num: "03", title: "Nicotine salt",
      desc: "Either leaf-derived or synthesised; the active payload, 2–22 mg per pouch." },
    { num: "04", title: "Humectants & salts",
      desc: "Water, propylene glycol and sodium carbonate balance the pH for absorption." },
    { num: "05", title: "Flavour system",
      desc: "Mint, bergamot, juniper, liquorice — the cultural surface of the object." },
  ];

  const colX = 7.6;
  const colW = W - M - colX;
  const startY = 2.95;
  const rowH = 0.78;
  components.forEach((c, i) => {
    const y = startY + i * rowH;
    s.addText(c.num, {
      x: colX, y: y + 0.08, w: 0.5, h: 0.3,
      fontFace: F.mono, fontSize: 10, color: C.muted, margin: 0,
    });
    s.addText(c.title, {
      x: colX + 0.6, y: y, w: colW - 0.6, h: 0.34,
      fontFace: F.sans, fontSize: 15, color: C.ink, bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: colX + 0.6, y: y + 0.34, w: colW - 0.6, h: 0.36,
      fontFace: F.sans, fontSize: 10, color: C.inkSoft,
      lineSpacingMultiple: 1.25, margin: 0,
    });
    if (i < components.length - 1) {
      rule(s, colX, y + rowH - 0.02, colW);
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — THE SWEDISH EXCEPTION (dark)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };
  addHeader(s, 4, "THE SWEDISH EXCEPTION", true);
  addFooter(s, 4, true);

  s.addText("SECTION TWO", {
    x: M, y: 1.1, w: 3, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.mutedOnDark,
    charSpacing: 5, margin: 0,
  });

  s.addText("The Swedish exception.", {
    x: M, y: 1.45, w: 11, h: 1.3,
    fontFace: F.serif, fontSize: 60, color: C.paperOnDark, margin: 0,
  });

  // Italic pull-quote
  s.addText(
    "\u201CA national habit so embedded that EU accession in 1995 came with a single, unprecedented carve-out — for a small tin of moist tobacco.\u201D",
    {
      x: M, y: 3.0, w: 8.5, h: 1.7,
      fontFace: F.serif, fontSize: 28, italic: true,
      color: C.paperOnDark, lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  // Faint concentric rings on right
  const cx = W - 2.6, cy = 3.4;
  for (let i = 6; i >= 1; i--) {
    const r = 0.4 + i * 0.4;
    s.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: r * 2, h: r * 2,
      fill: { type: "none" },
      line: { color: "2E3A30", width: 0.5 },
    });
  }

  // Bottom rule
  rule(s, M, 5.25, W - M * 2, "3A4640");

  // Three big stats
  const stats = [
    { big: "1/5", small: null,
      desc: "Of Swedish men use snus daily — the highest per-capita rate on earth." },
    { big: "410", small: "M",
      desc: "Cans sold annually inside Sweden — roughly forty per resident." },
    { big: "5%",  small: null,
      desc: "Swedish male smoking rate — the lowest in the EU, by a wide margin." },
  ];
  const colW = (W - M * 2) / 3;
  stats.forEach((st, i) => {
    const x = M + i * colW;
    if (st.small) {
      s.addText(
        [
          { text: st.big, options: { fontFace: F.serif, fontSize: 56, color: C.paperOnDark } },
          { text: st.small, options: { fontFace: F.serif, fontSize: 28, color: C.paperOnDark, valign: "top" } },
        ],
        { x, y: 5.45, w: colW - 0.4, h: 1.0, margin: 0 }
      );
    } else {
      s.addText(st.big, {
        x, y: 5.45, w: colW - 0.4, h: 1.0,
        fontFace: F.serif, fontSize: 56, color: C.paperOnDark, margin: 0,
      });
    }
    s.addText(st.desc, {
      x, y: 6.35, w: colW - 0.4, h: 0.55,
      fontFace: F.sans, fontSize: 10, color: C.mutedOnDark,
      lineSpacingMultiple: 1.3, margin: 0,
    });
    // vertical separators between columns
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x, y: 5.45, w: 0, h: 1.5,
        line: { color: "3A4640", width: 0.5 },
      });
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — COMPOSITION
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 5, "COMPOSITION");
  addFooter(s, 5);

  s.addText("Composition.", {
    x: M, y: 1.9, w: 6, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "By mass, a typical portion is mostly water — the active chemistry sits in the final few percent.",
    {
      x: 7.6, y: 1.4, w: 5.1, h: 1.3,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Left: stacked layered visualisation (vertical proportions of the pouch)
  const stack = { x: M, y: 3.1, w: 6.4, h: 3.7 };
  s.addShape(pres.shapes.RECTANGLE, {
    x: stack.x, y: stack.y, w: stack.w, h: stack.h,
    fill: { color: "F0EBE0" }, line: { color: C.rule, width: 0.4 },
  });
  // Layered fills representing 48 / 30 / 14 / 6 / 1.5 / 0.8 (%)
  const proportions = [
    { pct: 48,  color: "D8D2BD" }, // water-ish
    { pct: 30,  color: "DCD3B6" }, // tobacco/fibre
    { pct: 14,  color: "C6BDA0" }, // salt
    { pct: 6,   color: "9F9579" }, // humectants
    { pct: 1.5, color: C.accent }, // sodium carbonate
    { pct: 0.8, color: C.ink   },  // nicotine
  ];
  let yCursor = stack.y;
  proportions.forEach(p => {
    const h = stack.h * (p.pct / 100);
    s.addShape(pres.shapes.RECTANGLE, {
      x: stack.x, y: yCursor, w: stack.w, h,
      fill: { color: p.color }, line: { color: p.color, width: 0 },
    });
    yCursor += h;
  });

  // Right: bar list
  const list = [
    { name: "Water",            pct: 48,   label: "48%"  },
    { name: "Tobacco / fibre",  pct: 30,   label: "30%"  },
    { name: "Salt (NaCl)",      pct: 14,   label: "14%"  },
    { name: "Humectants",       pct: 6,    label: "6%"   },
    { name: "Sodium carbonate", pct: 1.5,  label: "1.5%" },
    { name: "Nicotine",         pct: 0.8,  label: "0.8%" },
  ];

  const listX = 7.6;
  const listW = W - M - listX;
  const labelColW = 1.7;
  const valColW = 0.8;
  const barX = listX + labelColW;
  const barTrackW = listW - labelColW - valColW - 0.1;
  const startY = 3.1;
  const rowGap = 0.42;

  list.forEach((row, i) => {
    const y = startY + i * rowGap;
    // Name
    s.addText(row.name, {
      x: listX, y, w: labelColW, h: 0.3,
      fontFace: F.sans, fontSize: 14, color: C.ink, margin: 0,
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: y + 0.13, w: barTrackW, h: 0.07,
      fill: { color: "DDD6C5" }, line: { color: "DDD6C5", width: 0 },
    });
    // Filled portion
    const fillW = Math.max(0.05, (row.pct / 50) * barTrackW); // scale: 50% = full
    s.addShape(pres.shapes.RECTANGLE, {
      x: barX, y: y + 0.13, w: Math.min(fillW, barTrackW), h: 0.07,
      fill: { color: C.ink }, line: { color: C.ink, width: 0 },
    });
    // Value
    s.addText(row.label, {
      x: listX + listW - valColW, y, w: valColW, h: 0.3,
      fontFace: F.sans, fontSize: 12, color: C.inkSoft,
      align: "right", margin: 0,
    });
  });

  // Divider rule
  rule(s, listX, 5.85, listW);

  // pH window block
  s.addText("PH WINDOW", {
    x: listX, y: 6.0, w: 2, h: 0.25,
    fontFace: F.mono, fontSize: 10, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText(
    [
      { text: "8.5", options: { color: C.ink, fontSize: 44 } },
      { text: "–9.0", options: { color: C.muted, fontSize: 22, valign: "top" } },
    ],
    {
      x: listX, y: 6.25, w: 2.6, h: 0.9,
      fontFace: F.serif, margin: 0,
    }
  );
  s.addText(
    "Alkaline enough to free nicotine into the buccal mucosa.",
    {
      x: listX + 2.7, y: 6.4, w: listW - 2.7, h: 0.6,
      fontFace: F.sans, fontSize: 11, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — THE RITUAL (4 columns)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 6, "THE RITUAL");
  addFooter(s, 6);

  s.addText("The ritual.", {
    x: M, y: 1.9, w: 6, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "A four-beat sequence, mostly invisible, spread across roughly forty minutes.",
    {
      x: 7.6, y: 1.55, w: 5.1, h: 1.0,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  const steps = [
    { roman: "i.",   title: "Open",
      desc: "Twist the cap. Most cans hold 20–24 portions in a foil-lined inner." },
    { roman: "ii.",  title: "Pinch",
      desc: "Take one portion between thumb and index. Loose snus is hand-rolled into a prilla." },
    { roman: "iii.", title: "Tuck",
      desc: "Place beneath the upper lip, against the gum. The portion settles in seconds." },
    { roman: "iv.",  title: "Wait",
      desc: "Nicotine peaks at ten minutes; the pouch is spent at thirty to forty." },
  ];

  const colCount = 4;
  const totalW = W - M * 2;
  const colW = totalW / colCount;
  const colY = 3.2;

  steps.forEach((st, i) => {
    const x = M + i * colW;

    // Roman numeral (large, italic serif)
    s.addText(st.roman, {
      x: x + 0.1, y: colY, w: colW - 0.2, h: 0.9,
      fontFace: F.serif, fontSize: 48, italic: true, color: C.ink, margin: 0,
    });

    // Small icon area (placeholder geometric shape)
    const ix = x + colW / 2 - 0.7;
    const iy = colY + 1.05;
    if (i === 0) {
      // Tin (open) — flat ellipse with a top ring
      s.addShape(pres.shapes.OVAL, {
        x: ix, y: iy + 0.55, w: 1.4, h: 0.45,
        fill: { type: "none" }, line: { color: C.ink, width: 0.8 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.05, y: iy + 0.4, w: 1.3, h: 0.35,
        fill: { type: "none" }, line: { color: C.ink, width: 0.8 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.35, y: iy + 0.85, w: 0.7, h: 0.18,
        fill: { color: C.accentSoft }, line: { color: C.accentSoft, width: 0 },
      });
    } else if (i === 1) {
      // Pinch — small pouch with crosshair
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.45, y: iy + 0.55, w: 0.55, h: 0.22,
        fill: { color: C.accentSoft }, line: { color: C.ink, width: 0.6 },
      });
      [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([dx, dy]) => {
        s.addShape(pres.shapes.LINE, {
          x: ix + 0.7, y: iy + 0.66,
          w: dx * 0.45, h: dy * 0.35,
          line: { color: C.ink, width: 0.5 },
        });
        s.addShape(pres.shapes.OVAL, {
          x: ix + 0.7 + dx * 0.45 - 0.04,
          y: iy + 0.66 + dy * 0.35 - 0.04,
          w: 0.08, h: 0.08,
          fill: { color: C.ink }, line: { color: C.ink, width: 0 },
        });
      });
    } else if (i === 2) {
      // Tuck — wide flat shape (lip) with pouch on top
      s.addShape(pres.shapes.OVAL, {
        x: ix - 0.1, y: iy + 0.55, w: 1.6, h: 0.4,
        fill: { type: "none" }, line: { color: C.ink, width: 0.7 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.45, y: iy + 0.45, w: 0.55, h: 0.22,
        fill: { color: C.accentSoft }, line: { color: C.ink, width: 0.6 },
      });
    } else {
      // Wait — clock face
      s.addShape(pres.shapes.OVAL, {
        x: ix + 0.25, y: iy + 0.3, w: 0.9, h: 0.9,
        fill: { type: "none" }, line: { color: C.ink, width: 0.7 },
      });
      // Hour hand (vertical)
      s.addShape(pres.shapes.LINE, {
        x: ix + 0.7, y: iy + 0.75,
        w: 0, h: -0.25,
        line: { color: C.ink, width: 0.7 },
      });
      // Minute hand (orange, pointing right)
      s.addShape(pres.shapes.LINE, {
        x: ix + 0.7, y: iy + 0.75,
        w: 0.3, h: 0,
        line: { color: C.accent, width: 0.9 },
      });
      s.addText("~ 30 MIN", {
        x: ix, y: iy + 1.35, w: 1.4, h: 0.22,
        fontFace: F.mono, fontSize: 8, color: C.inkSoft,
        align: "center", charSpacing: 2, margin: 0,
      });
    }

    // Title
    s.addText(st.title, {
      x: x + 0.1, y: 5.85, w: colW - 0.2, h: 0.4,
      fontFace: F.sans, fontSize: 18, color: C.ink, margin: 0,
    });
    // Description
    s.addText(st.desc, {
      x: x + 0.1, y: 6.3, w: colW - 0.3, h: 0.7,
      fontFace: F.sans, fontSize: 11, color: C.inkSoft,
      lineSpacingMultiple: 1.35, margin: 0,
    });

    // Vertical separator between columns
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x, y: 3.05, w: 0, h: 3.85,
        line: { color: C.rule, width: 0.4 },
      });
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — MARKET LANDSCAPE
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 7, "MARKET LANDSCAPE");
  addFooter(s, 7);

  s.addText("Market landscape.", {
    x: M, y: 1.9, w: 7, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "Tobacco-free pouches have, in five years, redrawn what was a Nordic-only category.",
    {
      x: 7.6, y: 1.55, w: 5.1, h: 1.0,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Left: bubble chart of brand groups
  const panel = { x: M, y: 3.05, w: 5.7, h: 3.85 };
  s.addShape(pres.shapes.RECTANGLE, {
    x: panel.x, y: panel.y, w: panel.w, h: panel.h,
    fill: { color: C.bgPanel }, line: { color: C.bgPanel, width: 0 },
  });

  const bubbles = [
    { label: "Swedish\nMatch", cx: 1.85, cy: 1.85, rW: 1.65, rH: 1.30, fill: "DCD8C0", line: C.ink, font: 16 },
    { label: "Altria /\nHelix",  cx: 3.7,  cy: 1.55, rW: 1.05, rH: 0.85, fill: "E6DEC7", line: C.ink, font: 13 },
    { label: "BAT\nVelo",        cx: 3.95, cy: 2.85, rW: 0.85, rH: 0.75, fill: "EAE3CD", line: C.ink, font: 12 },
    { label: "Haypp\nGroup",     cx: 2.45, cy: 3.10, rW: 0.6,  rH: 0.45, fill: C.accentSoft, line: C.accent, font: 10 },
    { label: "Others",           cx: 0.95, cy: 3.10, rW: 0.45, rH: 0.30, fill: "EFEAE0", line: C.ink, font: 9 },
  ];

  bubbles.forEach(b => {
    s.addShape(pres.shapes.OVAL, {
      x: panel.x + b.cx - b.rW, y: panel.y + b.cy - b.rH,
      w: b.rW * 2, h: b.rH * 2,
      fill: { color: b.fill }, line: { color: b.line, width: 0.8 },
    });
    s.addText(b.label, {
      x: panel.x + b.cx - b.rW, y: panel.y + b.cy - 0.3,
      w: b.rW * 2, h: 0.6,
      fontFace: F.serif, fontSize: b.font, color: C.ink,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Tiny dashed circle (placeholder/competitor)
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 4.95, y: panel.y + 0.35,
    w: 0.4, h: 0.25,
    fill: { type: "none" },
    line: { color: C.muted, width: 0.5, dashType: "dash" },
  });

  // Right: ranked table
  const tx = 7.6;
  const tw = W - M - tx;
  const headerY = 3.05;
  const rowH = 0.55;

  // Table header
  s.addText("#",     { x: tx,        y: headerY, w: 0.5, h: 0.3, fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 2, margin: 0 });
  s.addText("BRAND", { x: tx + 0.6,  y: headerY, w: 3,   h: 0.3, fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 4, margin: 0 });
  s.addText("SHARE", { x: tx + 3.6,  y: headerY, w: 1,   h: 0.3, fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 4, margin: 0 });
  s.addText("YOY",   { x: tx + tw - 0.8, y: headerY, w: 0.8, h: 0.3, fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 4, align: "right", margin: 0 });
  rule(s, tx, headerY + 0.35, tw, C.muted);

  const brands = [
    { n: "01", name: "General · Göteborgs Rapé", share: "31%", yoy: "−2.1"  },
    { n: "02", name: "ZYN",                       share: "22%", yoy: "+18.4" },
    { n: "03", name: "Velo",                      share: "14%", yoy: "+6.7"  },
    { n: "04", name: "Lyft / Epok",               share: "9%",  yoy: "+3.2"  },
    { n: "05", name: "Skruf",                     share: "7%",  yoy: "−0.4"  },
    { n: "06", name: "Independent & private label", share: "17%", yoy: "+4.1" },
  ];

  brands.forEach((b, i) => {
    const y = headerY + 0.5 + i * rowH;
    s.addText(b.n,    { x: tx,             y, w: 0.5,  h: 0.4, fontFace: F.mono, fontSize: 11, color: C.muted, valign: "middle", margin: 0 });
    s.addText(b.name, { x: tx + 0.6,       y, w: 3,    h: 0.4, fontFace: F.sans, fontSize: 14, color: C.ink, valign: "middle", margin: 0 });
    s.addText(b.share,{ x: tx + 3.6,       y, w: 1,    h: 0.4, fontFace: F.sans, fontSize: 13, color: C.inkSoft, valign: "middle", margin: 0 });
    s.addText(b.yoy,  { x: tx + tw - 0.85, y, w: 0.85, h: 0.4, fontFace: F.mono, fontSize: 11, color: C.inkSoft, align: "right", valign: "middle", margin: 0 });
    if (i < brands.length - 1) {
      rule(s, tx, y + rowH - 0.05, tw);
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — HEALTH DISCOURSE (two columns)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 8, "HEALTH DISCOURSE");
  addFooter(s, 8);

  s.addText("Health discourse.", {
    x: M, y: 1.9, w: 7, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "A genuinely contested question — the harm-reduction case sits next to a still-incomplete long-term record.",
    {
      x: 7.6, y: 1.4, w: 5.1, h: 1.3,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Subtle horizontal dotted separator with two faint motifs
  s.addShape(pres.shapes.LINE, {
    x: M, y: 3.45, w: W - M * 2, h: 0,
    line: { color: C.rule, width: 0.4, dashType: "dash" },
  });
  // Left motif - small concentric rings
  for (let i = 3; i >= 1; i--) {
    const r = 0.15 * i;
    s.addShape(pres.shapes.OVAL, {
      x: 3.2 - r, y: 3.45 - r * 0.5, w: r * 2, h: r,
      fill: { type: "none" }, line: { color: "C8C2AE", width: 0.4 },
    });
  }
  // Right motif
  for (let i = 3; i >= 1; i--) {
    const r = 0.15 * i;
    s.addShape(pres.shapes.OVAL, {
      x: 9.7 - r, y: 3.45 - r * 0.5, w: r * 2, h: r,
      fill: { type: "none" }, line: { color: "C8C2AE", width: 0.4 },
    });
  }
  // Center dot
  s.addShape(pres.shapes.OVAL, {
    x: W / 2 - 0.05, y: 3.4, w: 0.1, h: 0.1,
    fill: { color: C.muted }, line: { color: C.muted, width: 0 },
  });

  // Section headers
  const colW = (W - M * 2 - 0.5) / 2;
  const leftX = M;
  const rightX = M + colW + 0.5;

  s.addText("THE CASE FOR", {
    x: leftX, y: 3.85, w: colW, h: 0.3,
    fontFace: F.mono, fontSize: 11, color: C.muted, charSpacing: 5, margin: 0,
  });
  rule(s, leftX, 4.18, colW);

  s.addText("THE CASE AGAINST", {
    x: rightX, y: 3.85, w: colW, h: 0.3,
    fontFace: F.mono, fontSize: 11, color: C.muted, charSpacing: 5, margin: 0,
  });
  rule(s, rightX, 4.18, colW);

  const pros = [
    { rich: [
      { text: "Roughly ", options: { color: C.ink } },
      { text: "95% lower", options: { color: C.ink, bold: true } },
      { text: " cancer-incidence risk vs. cigarette smoking, per a Karolinska review.", options: { color: C.ink } },
    ]},
    { plain: "No combustion: tar, CO and most nitrosamine pathways are absent." },
    { plain: "Strong correlation with Sweden's EU-low male smoking rate." },
    { plain: "Effective documented role as a smoking-cessation tool among adult users." },
  ];
  const cons = [
    { plain: "Highly addictive — nicotine dependence is the central, persistent harm." },
    { plain: "Elevated risk of gum recession, oral lesions and pancreatic disease." },
    { plain: "Cardiovascular effects under continued investigation; data still incomplete." },
    { plain: "High-strength pouches risk pulling new, non-smoking users — including minors." },
  ];

  function addItem(slide, x, y, w, sym, content) {
    // Symbol column (top-aligned with first text line)
    slide.addText(sym, {
      x, y, w: 0.35, h: 0.3,
      fontFace: F.sans, fontSize: 14, color: C.ink,
      valign: "top", margin: 0,
    });
    if (content.rich) {
      slide.addText(content.rich, {
        x: x + 0.4, y, w: w - 0.45, h: 0.85,
        fontFace: F.sans, fontSize: 12, valign: "top",
        lineSpacingMultiple: 1.3, margin: 0,
      });
    } else {
      slide.addText(content.plain, {
        x: x + 0.4, y, w: w - 0.45, h: 0.85,
        fontFace: F.sans, fontSize: 12, color: C.ink,
        valign: "top", lineSpacingMultiple: 1.3, margin: 0,
      });
    }
  }

  const itemH = 0.65;
  pros.forEach((p, i) => addItem(s, leftX, 4.4 + i * itemH, colW, "+", p));
  cons.forEach((p, i) => addItem(s, rightX, 4.4 + i * itemH, colW, "−", p));
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — REGULATORY MAP
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgLight };
  addHeader(s, 9, "REGULATORY MAP");
  addFooter(s, 9);

  s.addText("Regulatory map.", {
    x: M, y: 1.9, w: 7, h: 1.0,
    fontFace: F.serif, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "Four broad postures. The category sits in regulatory limbo on most of the planet.",
    {
      x: 7.6, y: 1.4, w: 5.1, h: 1.3,
      fontFace: F.sans, fontSize: 15, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Left: stylised dotted "map" panel with markers
  const panel = { x: M, y: 3.05, w: 5.7, h: 3.85 };
  s.addShape(pres.shapes.RECTANGLE, {
    x: panel.x, y: panel.y, w: panel.w, h: panel.h,
    fill: { color: C.bgPanel }, line: { color: C.bgPanel, width: 0 },
  });
  // Dot grid
  const dotColor = "B8B19E";
  const cols = 22, rows = 14;
  const stepX = panel.w / cols;
  const stepY = panel.h / rows;
  for (let i = 1; i < cols; i++) {
    for (let j = 1; j < rows; j++) {
      s.addShape(pres.shapes.OVAL, {
        x: panel.x + i * stepX - 0.025, y: panel.y + j * stepY - 0.025,
        w: 0.05, h: 0.05,
        fill: { color: dotColor }, line: { color: dotColor, width: 0 },
      });
    }
  }
  // Markers
  // SE
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 2.7, y: panel.y + 0.95, w: 1.05, h: 0.7,
    fill: { color: C.accentSoft }, line: { color: C.accent, width: 0.7 },
  });
  s.addText("SE", { x: panel.x + 2.7, y: panel.y + 1.18, w: 1.05, h: 0.25,
    fontFace: F.serif, fontSize: 10, color: C.ink, align: "center", margin: 0 });
  // NO
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 2.85, y: panel.y + 0.4, w: 0.7, h: 0.5,
    fill: { color: C.accentSoft }, line: { color: C.accent, width: 0.7 },
  });
  s.addText("NO", { x: panel.x + 2.85, y: panel.y + 0.55, w: 0.7, h: 0.2,
    fontFace: F.serif, fontSize: 8, color: C.ink, align: "center", margin: 0 });
  // EU-27 dashed circle with X
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 1.5, y: panel.y + 1.3, w: 2.5, h: 1.7,
    fill: { type: "none" }, line: { color: C.muted, width: 0.6, dashType: "dash" },
  });
  s.addShape(pres.shapes.LINE, {
    x: panel.x + 1.7, y: panel.y + 1.5, w: 2.1, h: 1.3,
    line: { color: C.muted, width: 0.4 },
  });
  s.addShape(pres.shapes.LINE, {
    x: panel.x + 1.7, y: panel.y + 2.8, w: 2.1, h: -1.3,
    line: { color: C.muted, width: 0.4 },
  });
  s.addText("EU-27", { x: panel.x + 1.5, y: panel.y + 2.0, w: 2.5, h: 0.25,
    fontFace: F.serif, fontSize: 10, color: C.ink, align: "center", margin: 0 });
  // UK small dashed
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 4.4, y: panel.y + 1.6, w: 0.55, h: 0.4,
    fill: { type: "none" }, line: { color: C.ink, width: 0.5, dashType: "dash" },
  });
  s.addText("UK", { x: panel.x + 4.4, y: panel.y + 1.7, w: 0.55, h: 0.2,
    fontFace: F.serif, fontSize: 8, color: C.ink, align: "center", margin: 0 });
  // US — concentric ring
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 0.7, y: panel.y + 2.45, w: 1.1, h: 0.85,
    fill: { type: "none" }, line: { color: C.ink, width: 0.7 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 0.95, y: panel.y + 2.65, w: 0.6, h: 0.45,
    fill: { type: "none" }, line: { color: C.ink, width: 0.5 },
  });
  s.addText("US", { x: panel.x + 0.7, y: panel.y + 2.78, w: 1.1, h: 0.25,
    fontFace: F.serif, fontSize: 9, color: C.ink, align: "center", margin: 0 });
  // ROW (rest of world)
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 4.0, y: panel.y + 2.7, w: 0.95, h: 0.7,
    fill: { color: C.accentSoft }, line: { color: C.accent, width: 0.6 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 4.15, y: panel.y + 2.83, w: 0.65, h: 0.45,
    fill: { type: "none" }, line: { color: C.ink, width: 0.4 },
  });
  s.addText("ROW", { x: panel.x + 4.0, y: panel.y + 2.92, w: 0.95, h: 0.25,
    fontFace: F.serif, fontSize: 9, color: C.ink, align: "center", margin: 0 });

  // Legend along the bottom of the panel (offset to avoid overlapping grid dots)
  const legY = panel.y + panel.h - 0.32;
  // Background strip behind legend to mask the dot grid
  s.addShape(pres.shapes.RECTANGLE, {
    x: panel.x + 0.15, y: legY - 0.05, w: panel.w - 0.3, h: 0.3,
    fill: { color: C.bgPanel }, line: { color: C.bgPanel, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 0.25, y: legY, w: 0.18, h: 0.13,
    fill: { color: C.accentSoft }, line: { color: C.accent, width: 0.5 },
  });
  s.addText("Open market", {
    x: panel.x + 0.5, y: legY - 0.04, w: 1.5, h: 0.25,
    fontFace: F.serif, fontSize: 9, color: C.ink, margin: 0,
  });
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 1.95, y: legY, w: 0.18, h: 0.13,
    fill: { type: "none" }, line: { color: C.ink, width: 0.5 },
  });
  s.addText("Restricted", {
    x: panel.x + 2.2, y: legY - 0.04, w: 1.2, h: 0.25,
    fontFace: F.serif, fontSize: 9, color: C.ink, margin: 0,
  });
  s.addShape(pres.shapes.OVAL, {
    x: panel.x + 3.35, y: legY, w: 0.18, h: 0.13,
    fill: { type: "none" }, line: { color: C.muted, width: 0.5, dashType: "dash" },
  });
  s.addText("Tobacco snus banned", {
    x: panel.x + 3.6, y: legY - 0.04, w: 2.1, h: 0.25,
    fontFace: F.serif, fontSize: 9, color: C.ink, margin: 0,
  });

  // Right: 4 categories
  const rx = 7.6;
  const rw = W - M - rx;
  const rowGap = 1.0;
  const baseY = 3.0;

  const regions = [
    { tag: "OPEN",            place: "Sweden & Norway",
      desc: "Long-standing legal market with mature category controls and warning labels." },
    { tag: "BANNED · TOBACCO",place: "EU-27",
      desc: "Tobacco snus illegal since 1992; tobacco-free nicotine pouches sit in a Member-State patchwork." },
    { tag: "RESTRICTED",      place: "United States",
      desc: "FDA \"modified-risk\" authorisation granted to General Snus in 2019; ZYN sold without it." },
    { tag: "EMERGING",        place: "UK · CA · ANZ · GCC",
      desc: "Tobacco-free pouches expanding faster than rule-making, driving most current category growth." },
  ];

  regions.forEach((r, i) => {
    const y = baseY + i * rowGap;
    s.addText(r.tag, {
      x: rx, y, w: rw, h: 0.22,
      fontFace: F.mono, fontSize: 9, color: C.muted, charSpacing: 4, margin: 0,
    });
    s.addText(r.place, {
      x: rx, y: y + 0.2, w: rw, h: 0.34,
      fontFace: F.serif, fontSize: 18, color: C.ink, margin: 0,
    });
    s.addText(r.desc, {
      x: rx, y: y + 0.55, w: rw, h: 0.42,
      fontFace: F.sans, fontSize: 10, color: C.inkSoft,
      lineSpacingMultiple: 1.3, margin: 0,
    });
    if (i < regions.length - 1) {
      rule(s, rx, y + rowGap - 0.05, rw);
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — OUTLOOK (dark)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };
  addHeader(s, 10, "OUTLOOK", true);

  s.addText("SECTION THREE", {
    x: M, y: 1.55, w: 3, h: 0.3,
    fontFace: F.mono, fontSize: 10, color: C.mutedOnDark,
    charSpacing: 5, margin: 0,
  });

  // Big headline with italic accent on "quietly"
  s.addText(
    [
      { text: "A four-century habit, still ", options: { fontFace: F.serif, italic: false, color: C.paperOnDark } },
      { text: "quietly", options: { fontFace: F.serif, italic: true, color: "3A4640" } },
      { text: " finding new ground.", options: { fontFace: F.serif, italic: false, color: C.paperOnDark } },
    ],
    {
      x: M, y: 2.0, w: W - M * 2, h: 2.4,
      fontSize: 60, lineSpacingMultiple: 1.05, margin: 0,
    }
  );

  // Faint motif on top right
  for (let i = 4; i >= 1; i--) {
    const r = 0.1 + i * 0.18;
    s.addShape(pres.shapes.OVAL, {
      x: 5.5 - r, y: 1.6 - r * 0.45, w: r * 2, h: r,
      fill: { type: "none" }, line: { color: "2E3A30", width: 0.4 },
    });
  }

  // Divider rule
  rule(s, M, 4.55, W - M * 2, "3A4640");

  // Three columns
  const items = [
    { tag: "01 — Product",  title: "Tobacco fades; the pouch persists",
      desc: "Tobacco-free formats grow ~25% YoY while traditional snus is flat to declining outside Sweden." },
    { tag: "02 — Policy",   title: "The EU dam will leak",
      desc: "Member-State pressure on nicotine-pouch rules is rising; expect a harmonised framework before 2030." },
    { tag: "03 — Posture",  title: "From vice to category",
      desc: "Branding moves toward design-led, lifestyle-adjacent — closer to coffee than to cigarettes." },
  ];
  const colCount = 3;
  const totalW = W - M * 2;
  const gutter = 0.4;
  const colW = (totalW - gutter * (colCount - 1)) / colCount;
  items.forEach((it, i) => {
    const x = M + i * (colW + gutter);
    s.addText(it.tag, {
      x, y: 4.75, w: colW, h: 0.25,
      fontFace: F.mono, fontSize: 10, color: C.mutedOnDark, charSpacing: 3, margin: 0,
    });
    s.addText(it.title, {
      x, y: 5.0, w: colW, h: 0.45,
      fontFace: F.sans, fontSize: 18, color: C.paperOnDark, bold: true, margin: 0,
    });
    s.addText(it.desc, {
      x, y: 5.5, w: colW, h: 1.2,
      fontFace: F.sans, fontSize: 12, color: C.mutedOnDark,
      lineSpacingMultiple: 1.35, margin: 0,
    });
  });

  // Footer (last slide uses "END" instead of page #)
  s.addText("SNUS  ·  A FIELD GUIDE", {
    x: M, y: H - 0.55, w: 4, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: C.mutedOnDark,
    charSpacing: 4, margin: 0,
  });
  s.addText("END", {
    x: W - M - 1, y: H - 0.55, w: 1, h: 0.3,
    fontFace: F.mono, fontSize: 9, color: C.mutedOnDark,
    align: "right", charSpacing: 2, margin: 0,
  });
}

// ─── Save ───────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "snus-field-guide.pptx" })
  .then(name => console.log("Saved:", name));
