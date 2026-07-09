// cheetah.js — Replica of "Cheetah Conservation Fund — Founding Prospectus 2026"
// Run: node cheetah.js  (requires `npm install pptxgenjs`)

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

// ----- Deck setup -----------------------------------------------------------
pres.defineLayout({ name: "CHEETAH", width: 20, height: 11.25 });
pres.layout = "CHEETAH";

// ----- Palette --------------------------------------------------------------
const C = {
  cream:    "F4EFE6", // light bg
  creamSoft:"EBE3D4",
  parchment:"F0D49A", // amber/sand right panel slide 1/8
  parchmentLite:"F4DBA0",
  sand:     "F7E2B6",
  butter:   "FFF0C8", // moon
  ink:      "2A241E", // body dark
  inkDeep:  "14110E", // near-black bg
  inkBrown: "28160A",
  espresso: "3A2E25", // dark slide bg slide 4
  brown:    "5A3A22", // mid brown (mountain)
  brownMid: "8A6A3F",
  amber:    "A8631F", // accent (cheetah orange)
  amberLite:"C8843A",
  amberPale:"E0AE74",
  muted:    "8A8278", // muted gray-brown for small caps
};

const FONT_HEAD = "Georgia";
const FONT_MONO = "Consolas";
const FONT_BODY = "Arial";

// ----- Helpers --------------------------------------------------------------
const W = 20, H = 11.25;

// Tiny corner marks (registration ticks)
function cornerTicks(slide, color = C.muted) {
  const len = 0.18, m = 0.4, t = 0.012;
  // top-left
  slide.addShape("line", { x: m, y: m, w: len, h: 0, line: { color, width: 0.75 } });
  slide.addShape("line", { x: m, y: m, w: 0, h: len, line: { color, width: 0.75 } });
  // top-right
  slide.addShape("line", { x: W - m - len, y: m, w: len, h: 0, line: { color, width: 0.75 } });
  slide.addShape("line", { x: W - m, y: m, w: 0, h: len, line: { color, width: 0.75 } });
  // bottom-left
  slide.addShape("line", { x: m, y: H - m, w: len, h: 0, line: { color, width: 0.75 } });
  slide.addShape("line", { x: m, y: H - m - len, w: 0, h: len, line: { color, width: 0.75 } });
  // bottom-right
  slide.addShape("line", { x: W - m - len, y: H - m, w: len, h: 0, line: { color, width: 0.75 } });
  slide.addShape("line", { x: W - m, y: H - m - len, w: 0, h: len, line: { color, width: 0.75 } });
}

// Mono small-caps text helper
function mono(slide, text, x, y, w, h, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT_MONO,
    fontSize: opts.size || 9,
    color: opts.color || C.muted,
    bold: opts.bold || false,
    italic: opts.italic || false,
    align: opts.align || "left",
    valign: opts.valign || "top",
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 2,
    margin: 0,
  });
}

// Rotated mono label.
// Pass the LOGICAL (un-rotated) box. For 90° clockwise (read top-to-bottom along
// the LEFT edge, with anchor top-left), we want the rendered box to occupy a
// narrow column. We achieve this by giving a wide horizontal box and rotating
// 90° around its center, then translating. For our purposes here, we pass the
// CENTER X/Y as x/y plus a wide w and short h, then rotate=90.
function monoRot(slide, text, cx, cy, len, rot, opts = {}) {
  // Render a long horizontal box centered at (cx, cy), then rotate.
  const w = len, h = 0.3;
  const x = cx - w / 2;
  const y = cy - h / 2;
  slide.addText(text, {
    x, y, w, h,
    fontFace: FONT_MONO,
    fontSize: opts.size || 9,
    color: opts.color || C.muted,
    align: opts.align || "center",
    valign: "middle",
    charSpacing: opts.charSpacing != null ? opts.charSpacing : 2,
    rotate: rot,
    margin: 0,
  });
}

// Page footer: brand + page number
function footer(slide, pageStr, dark = false) {
  const col = dark ? C.creamSoft : C.muted;
  mono(slide, "CHEETAH CONSERVATION FUND", 0.6, H - 0.55, 6, 0.3,
       { size: 9, color: col, charSpacing: 3 });
  mono(slide, pageStr, W - 1.7, H - 0.55, 1.2, 0.3,
       { size: 9, color: col, align: "right", charSpacing: 3 });
}

// ============================================================================
// SLIDE 1 — COVER
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Right amber panel
  s.addShape("rect", { x: W * 0.58, y: 0, w: W * 0.42, h: H, fill: { color: C.parchment }, line: { color: C.parchment } });

  // Corner ticks
  cornerTicks(s);

  // Brand mark — small circle with dots + wordmark
  s.addShape("ellipse", { x: 0.6, y: 0.55, w: 0.36, h: 0.36, fill: { color: C.cream }, line: { color: C.ink, width: 0.75 } });
  // little spots inside the brand circle
  [[0.70,0.66],[0.78,0.70],[0.72,0.78],[0.84,0.74]].forEach(([cx,cy]) =>
    s.addShape("ellipse", { x: cx, y: cy, w: 0.05, h: 0.05, fill: { color: C.ink }, line: { color: C.ink } })
  );
  mono(s, "CHEETAH CONSERVATION FUND", 1.15, 0.62, 4, 0.3, { size: 11, color: C.ink, charSpacing: 4 });

  // Eyebrow
  mono(s, "A FOUNDING PROSPECTUS  ·  2026", 0.95, 2.8, 6, 0.3, { size: 12, color: C.amber, charSpacing: 4 });

  // Headline (mixed roman + amber italic-ish second clause)
  s.addText(
    [
      { text: "The fastest cat on\nearth — ", options: { color: C.ink, italic: true } },
      { text: "the most\nfragile.",          options: { color: C.amber, italic: false } },
    ],
    { x: 0.95, y: 3.4, w: 10.5, h: 5.0, fontFace: FONT_HEAD, fontSize: 70, bold: false, valign: "top", margin: 0 }
  );

  // Sub-paragraph
  s.addText(
    [
      { text: "A new nonprofit dedicated to protecting ", options: {} },
      { text: "Acinonyx jubatus", options: { italic: true } },
      { text: " in the wild, and to keeping the savanna a place where it can still run.", options: {} },
    ],
    { x: 0.95, y: 8.7, w: 8.0, h: 1.3, fontFace: FONT_BODY, fontSize: 15, color: C.ink, valign: "top", margin: 0 }
  );

  // Bottom-left meta
  mono(s, "EST. 2026 / NAIROBI · WINDHOEK · NEW YORK", 0.6, H - 0.55, 7, 0.3,
       { size: 10, color: C.ink, charSpacing: 3 });
  mono(s, "VOL. I", 8.0, H - 0.55, 2, 0.3, { size: 10, color: C.ink, charSpacing: 3 });

  // Right panel — vertical IUCN label on far right
  monoRot(s, "ACINONYX JUBATUS  ·  VULNERABLE  ·  IUCN RED LIST", W - 0.4, 5.0, 7, 90,
          { size: 10, color: C.inkBrown, charSpacing: 3 });

  // Plate caption near bottom-right of amber panel
  s.addShape("rect", { x: 12.0, y: H - 0.85, w: 2.8, h: 0.32,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.inkBrown, width: 0.5 } });
  mono(s, "PLATE I  /  PORTRAIT", 12.15, H - 0.78, 2.6, 0.32,
       { size: 9, color: C.inkBrown, charSpacing: 2 });

  // ----- Cheetah illustration (geometric portrait) ----------------------
  // Right panel center
  const cx = W * 0.79;       // center x (~15.8)
  const cy = H * 0.56;       // center y
  // Sun behind head
  s.addShape("ellipse", { x: cx - 1.7, y: cy - 4.0, w: 3.4, h: 3.4,
    fill: { color: C.parchmentLite }, line: { color: C.parchmentLite } });

  // Body (rounded rect) — wide at bottom
  s.addShape("roundRect", { x: cx - 2.5, y: cy - 0.4, w: 5.0, h: 5.5,
    fill: { color: C.amberLite }, line: { color: C.amberLite }, rectRadius: 0.6 });
  // Belly highlight
  s.addShape("roundRect", { x: cx - 0.85, y: cy + 1.6, w: 1.7, h: 3.5,
    fill: { color: C.parchmentLite }, line: { color: C.parchmentLite }, rectRadius: 0.5 });

  // Neck (smaller rounded rect)
  s.addShape("roundRect", { x: cx - 1.1, y: cy - 0.9, w: 2.2, h: 1.2,
    fill: { color: C.amberLite }, line: { color: C.amberLite }, rectRadius: 0.2 });
  // Neck highlight
  s.addShape("roundRect", { x: cx - 0.5, y: cy - 0.6, w: 1.0, h: 0.9,
    fill: { color: C.parchmentLite }, line: { color: C.parchmentLite }, rectRadius: 0.1 });

  // Head (large circle)
  s.addShape("ellipse", { x: cx - 1.8, y: cy - 3.4, w: 3.6, h: 3.0,
    fill: { color: C.amberLite }, line: { color: C.amberLite } });
  // Face highlight (lighter inner region)
  s.addShape("ellipse", { x: cx - 1.0, y: cy - 2.6, w: 2.0, h: 1.8,
    fill: { color: C.amberPale }, line: { color: C.amberPale } });

  // Ears
  s.addShape("ellipse", { x: cx - 1.9, y: cy - 3.9, w: 0.9, h: 1.0,
    fill: { color: C.amberLite }, line: { color: C.amberLite } });
  s.addShape("ellipse", { x: cx + 1.0, y: cy - 3.9, w: 0.9, h: 1.0,
    fill: { color: C.amberLite }, line: { color: C.amberLite } });
  // Inner ears
  s.addShape("ellipse", { x: cx - 1.7, y: cy - 3.65, w: 0.5, h: 0.55,
    fill: { color: C.amberPale }, line: { color: C.amberPale } });
  s.addShape("ellipse", { x: cx + 1.2, y: cy - 3.65, w: 0.5, h: 0.55,
    fill: { color: C.amberPale }, line: { color: C.amberPale } });

  // Eyes (white surrounds)
  s.addShape("ellipse", { x: cx - 1.0, y: cy - 2.45, w: 0.55, h: 0.45,
    fill: { color: "FAF0D8" }, line: { color: C.ink, width: 0.5 } });
  s.addShape("ellipse", { x: cx + 0.45, y: cy - 2.45, w: 0.55, h: 0.45,
    fill: { color: "FAF0D8" }, line: { color: C.ink, width: 0.5 } });
  // Pupils
  s.addShape("ellipse", { x: cx - 0.85, y: cy - 2.35, w: 0.22, h: 0.25,
    fill: { color: C.ink }, line: { color: C.ink } });
  s.addShape("ellipse", { x: cx + 0.6, y: cy - 2.35, w: 0.22, h: 0.25,
    fill: { color: C.ink }, line: { color: C.ink } });

  // Tear lines (cheetah's signature)
  s.addShape("line", { x: cx - 0.78, y: cy - 2.05, w: -0.15, h: 0.95,
    line: { color: C.ink, width: 3 } });
  s.addShape("line", { x: cx + 0.78, y: cy - 2.05, w: 0.15, h: 0.95,
    line: { color: C.ink, width: 3 } });

  // Nose
  s.addShape("ellipse", { x: cx - 0.18, y: cy - 1.55, w: 0.36, h: 0.28,
    fill: { color: C.ink }, line: { color: C.ink } });
  // Mouth lines (subtle) — small "M" shape via two short curves approximated by lines
  s.addShape("line", { x: cx - 0.25, y: cy - 1.2, w: 0.25, h: 0.18, line: { color: C.ink, width: 1 } });
  s.addShape("line", { x: cx,      y: cy - 1.02, w: 0.25, h: -0.18, line: { color: C.ink, width: 1 } });
  // Whisker dots
  [[-0.55,-1.15],[-0.7,-1.0],[0.45,-1.15],[0.6,-1.0]].forEach(([dx,dy]) =>
    s.addShape("ellipse", { x: cx + dx, y: cy + dy, w: 0.05, h: 0.05, fill: { color: C.ink }, line: { color: C.ink } })
  );

  // Spots — head
  const headSpots = [
    [-1.3,-3.0],[-0.9,-3.05],[-0.4,-3.1],[0.2,-3.1],[0.8,-3.05],[1.2,-3.0],
    [-1.5,-2.6],[1.4,-2.6],[-1.55,-2.1],[1.45,-2.1],
  ];
  headSpots.forEach(([dx,dy]) =>
    s.addShape("ellipse", { x: cx + dx, y: cy + dy, w: 0.15, h: 0.15, fill: { color: C.ink }, line: { color: C.ink } })
  );
  // Spots — body
  const bodySpots = [
    [-2.0, 0.2],[-1.7, 0.7],[-2.2, 1.4],[-1.9, 2.0],[-2.3, 2.7],[-1.8, 3.4],[-2.1, 4.1],
    [ 1.8, 0.2],[ 1.5, 0.7],[ 2.0, 1.4],[ 1.7, 2.0],[ 2.1, 2.7],[ 1.6, 3.4],[ 2.0, 4.1],
    [-1.3, 0.0],[1.3, 0.0],
  ];
  bodySpots.forEach(([dx,dy]) =>
    s.addShape("ellipse", { x: cx + dx, y: cy + dy, w: 0.18, h: 0.18, fill: { color: C.ink }, line: { color: C.ink } })
  );

  // Horizon line across right panel
  s.addShape("line", { x: W * 0.58, y: cy + 1.4, w: W * 0.42, h: 0,
    line: { color: C.amber, width: 0.5 } });
}

// ============================================================================
// SLIDE 2 — A SPECIES IN FREEFALL  (dark)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.inkDeep };
  cornerTicks(s, C.muted);

  // Top eyebrow
  mono(s, "SECTION 01  /  THE SITUATION", 1.2, 0.7, 7, 0.3,
       { size: 11, color: C.amber, charSpacing: 4 });
  mono(s, "02 — A SPECIES IN FREEFALL", W - 7, 0.7, 6, 0.3,
       { size: 11, color: C.creamSoft, align: "right", charSpacing: 4 });

  // Left edge vertical labels
  monoRot(s, "FIG. 02", 0.55, 1.8, 1, 90, { size: 9, color: C.muted });
  monoRot(s, "RANGE 1900–2026", 0.55, 5.6, 2, 90, { size: 9, color: C.muted });
  monoRot(s, "SOURCE  IUCN", 0.55, 9.15, 1.5, 90, { size: 9, color: C.muted });

  // ----- HERO STAT: 7,100 -----
  s.addText("7,100", {
    x: 1.0, y: 1.3, w: 9.5, h: 3.4,
    fontFace: FONT_HEAD, fontSize: 220, color: C.creamSoft, bold: false, italic: true,
    valign: "top", margin: 0,
  });

  // "AS OF / 2026."
  mono(s, "AS OF", 9.6, 1.7, 1.5, 0.3, { size: 10, color: C.muted, charSpacing: 3 });
  s.addText("2026.", {
    x: 9.6, y: 2.0, w: 2.0, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 32, color: C.amber, italic: true, margin: 0,
  });

  // Subtitle
  s.addText("adults left in the wild.", {
    x: 1.0, y: 4.5, w: 8, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 36, color: C.creamSoft, italic: true, margin: 0,
  });

  // Divider
  s.addShape("line", { x: 1.0, y: 5.4, w: 9.5, h: 0, line: { color: C.muted, width: 0.5 } });

  // Three small stats row
  const statY = 5.7;
  // 9%
  s.addText([
      { text: "9", options: { fontSize: 56 } },
      { text: "%", options: { fontSize: 28 } },
    ], { x: 1.0, y: statY, w: 2.5, h: 1.0, fontFace: FONT_HEAD, color: C.creamSoft, italic: false, margin: 0 });
  mono(s, "OF HISTORIC RANGE", 1.0, statY + 1.0, 3, 0.3, { size: 9, color: C.muted, charSpacing: 3 });

  // -93%
  s.addText([
      { text: "−93", options: { fontSize: 56 } },
      { text: "%", options: { fontSize: 28 } },
    ], { x: 4.2, y: statY, w: 3, h: 1.0, fontFace: FONT_HEAD, color: C.creamSoft, italic: false, margin: 0 });
  mono(s, "SINCE 1900", 4.2, statY + 1.0, 3, 0.3, { size: 9, color: C.muted, charSpacing: 3 });

  // 1/3
  s.addText("1/3", {
    x: 7.6, y: statY, w: 2, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 56, color: C.creamSoft, italic: false, margin: 0,
  });
  mono(s, "CUBS REACH ADULTHOOD", 7.6, statY + 1.0, 3.5, 0.3, { size: 9, color: C.muted, charSpacing: 3 });

  // ----- BAR CHART (right) -----
  const cX = 11.4, cY = 1.3, cW = 7.6, cH = 3.6;
  mono(s, "HISTORIC VS. CURRENT RANGE", cX, cY, 5, 0.3, { size: 9, color: C.creamSoft, charSpacing: 3 });

  // Axis labels (top)
  const axisY = cY + 0.5;
  ["0","25K","50K","75K","100K"].forEach((lbl, i) => {
    mono(s, lbl, cX + 0.9 + (cW - 1.8) * (i / 4) - 0.2, axisY, 0.6, 0.25,
         { size: 8, color: C.muted });
  });

  // Bars
  const bars = [
    { y: "1900", v: 100000, lbl: "100,000", color: C.creamSoft },
    { y: "1975", v: 30000,  lbl: "30,000",  color: C.creamSoft },
    { y: "2000", v: 15000,  lbl: "15,000",  color: C.creamSoft },
    { y: "2010", v: 10000,  lbl: "10,000",  color: C.creamSoft },
    { y: "2026", v: 7100,   lbl: "7,100",   color: C.amber },
  ];
  const barAreaX = cX + 0.9, barAreaW = cW - 2.0;
  const barH = 0.35, gap = 0.20;
  bars.forEach((b, i) => {
    const y = axisY + 0.4 + i * (barH + gap);
    // year label
    mono(s, b.y, cX, y + 0.05, 0.8, 0.3, { size: 9, color: C.muted });
    // background track
    s.addShape("rect", { x: barAreaX, y, w: barAreaW, h: barH,
      fill: { color: "2A241E" }, line: { color: "2A241E" } });
    // value bar
    const w = barAreaW * (b.v / 100000);
    s.addShape("rect", { x: barAreaX, y, w, h: barH,
      fill: { color: b.color }, line: { color: b.color } });
    // value label
    s.addText(b.lbl, { x: cX + cW - 1.05, y: y - 0.02, w: 1.05, h: barH + 0.04,
      fontFace: FONT_HEAD, fontSize: 16, color: b.color, italic: true, align: "right", margin: 0 });
  });

  // Bar caption
  mono(s, "◇ INDICATIVE  ·  FIGURES ROUNDED  ·  BARS RELATIVE TO 1900 BASELINE",
       cX, cY + cH + 0.2, 8, 0.3, { size: 8, color: C.muted, charSpacing: 2 });

  // ----- ANNOTATION callout (right) -----
  const aY = cY + cH + 0.7;
  s.addShape("line", { x: cX, y: aY, w: 0, h: 0.95, line: { color: C.amber, width: 2 } });
  s.addShape("rect", { x: cX + 0.05, y: aY, w: cW - 0.05, h: 0.95,
    fill: { color: "1F1812" }, line: { color: "1F1812" } });
  mono(s, "ANNOTATION", cX + 0.25, aY + 0.12, 3, 0.25, { size: 9, color: C.amber, charSpacing: 3 });
  s.addText("A slow, quiet retreat across a single human lifetime.", {
    x: cX + 0.25, y: aY + 0.42, w: cW - 0.4, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 16, color: C.creamSoft, italic: true, margin: 0,
  });

  // ----- BOTTOM Regional breakdown -----
  const rY = 7.45;
  s.addShape("line", { x: 1.0, y: rY, w: W - 2, h: 0, line: { color: C.muted, width: 0.5 } });
  monoRot(s, "REGIONAL BREAKDOWN  2026", 0.55, rY + 1.55, 2.5, 90,
          { size: 9, color: C.muted });

  const regions = [
    { v: "3,500", l: "SOUTHERN AFRICA", c: C.creamSoft, under: C.creamSoft },
    { v: "2,300", l: "EASTERN AFRICA",  c: C.creamSoft, under: C.creamSoft },
    { v: "~440",  l: "IRAN (ASIATIC)",  c: C.creamSoft, under: C.creamSoft },
    { v: "<50",   l: "N & W AFRICA",    c: C.amber,     under: C.amber },
  ];
  const regX = 1.4, regW = (W - 2.8) / 4;
  regions.forEach((r, i) => {
    const x = regX + i * regW;
    s.addText(r.v, { x, y: rY + 0.35, w: regW - 0.4, h: 1.0,
      fontFace: FONT_HEAD, fontSize: 56, color: r.c, italic: false, margin: 0 });
    mono(s, r.l, x, rY + 1.45, regW - 0.4, 0.3, { size: 9, color: C.muted, charSpacing: 3 });
    // Underline
    s.addShape("line", { x, y: rY + 1.4, w: regW - 0.6, h: 0,
      line: { color: r.under, width: r.under === C.amber ? 1.5 : 0.5 } });
  });

  footer(s, "02  08", true);
}

// ============================================================================
// SLIDE 3 — THE THREATS (light)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  cornerTicks(s, C.muted);

  mono(s, "SECTION 02  /  THE PRESSURES", 1.2, 0.7, 7, 0.3,
       { size: 11, color: C.amber, charSpacing: 4 });
  mono(s, "03 — THE THREATS", W - 7, 0.7, 6, 0.3,
       { size: 11, color: C.ink, align: "right", charSpacing: 4 });

  monoRot(s, "FIG. 03", 0.55, 1.8, 1, 90, { size: 9, color: C.muted });
  monoRot(s, "PRESSURES I — III", 0.55, 5.5, 2, 90, { size: 9, color: C.muted });
  monoRot(s, "FIELD 2025", 0.55, 9.15, 1.5, 90, { size: 9, color: C.muted });

  // Headline
  s.addText([
    { text: "Squeezed from ",   options: { italic: false } },
    { text: "three directions", options: { italic: true  } },
    { text: " at once.",        options: { italic: false } },
  ], { x: 1.2, y: 1.2, w: 17, h: 1.8, fontFace: FONT_HEAD, fontSize: 64, color: C.ink, margin: 0 });

  // Sub
  s.addText("Each pressure compounds the others — a population this small has no margin for any of them.", {
    x: 1.2, y: 3.2, w: 14, h: 0.9, fontFace: FONT_HEAD, fontSize: 22, color: "4A3F35", italic: true, margin: 0,
  });

  // Divider
  s.addShape("line", { x: 1.2, y: 4.5, w: W - 2.4, h: 0, line: { color: C.muted, width: 0.5 } });

  // ----- Three pressure cards -----
  const cardY = 4.9, cardH = 4.6, cardW = (W - 2.4) / 3, gx = 1.2;
  const cards = [
    {
      num: "01", tag: "HABITAT ↘", head: "A shrinking ", italicHead: "savanna.",
      body: "Farmland, fences, and roads now cut across corridors that once stretched unbroken.",
      stat: "77%", statSub: "OF CHEETAH RANGE\nLIES OUTSIDE\nPROTECTED AREAS",
      icon: "grid",
    },
    {
      num: "02", tag: "CONFLICT ✕", head: "Livestock losses, ", italicHead: "retaliation.",
      body: "Cheetahs are shot, snared, or poisoned — usually for the loss of a single goat.",
      stat: "~400", statSub: "CHEETAHS KILLED\nIN CONFLICT EACH\nYEAR",
      icon: "target",
    },
    {
      num: "03", tag: "TRADE →", head: "A black-market ", italicHead: "cub trade.",
      body: "Cubs are trafficked from the Horn of Africa each year. Most never reach a buyer.",
      stat: "5/6", statSub: "CUBS DIE IN\nTRANSIT BEFORE\nSALE",
      icon: "arc",
    },
  ];

  cards.forEach((c, i) => {
    const x = gx + i * cardW;
    // Card subtle bg + dividers between
    if (i < 2) {
      s.addShape("line", { x: x + cardW - 0.2, y: cardY + 0.2, w: 0, h: cardH - 0.4,
        line: { color: C.muted, width: 0.5 } });
    }
    // Big number
    s.addText(c.num, { x: x + 0.2, y: cardY + 0.1, w: 2, h: 1.3,
      fontFace: FONT_HEAD, fontSize: 64, color: C.amber, italic: false, margin: 0 });

    // Icon (top-right of card)
    const ix = x + cardW - 1.2, iy = cardY + 0.3, isz = 0.8;
    if (c.icon === "grid") {
      // 3x3 grid of small squares
      for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++)
        s.addShape("rect", { x: ix + q * 0.22, y: iy + r * 0.22, w: 0.16, h: 0.16,
          fill: { color: C.amber, transparency: 0 }, line: { color: C.amber, width: 0.75 } });
    } else if (c.icon === "target") {
      s.addShape("ellipse", { x: ix, y: iy, w: isz, h: isz, fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.amber, width: 0.75 } });
      s.addShape("ellipse", { x: ix + 0.2, y: iy + 0.2, w: isz - 0.4, h: isz - 0.4, fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.amber, width: 0.75 } });
      s.addShape("ellipse", { x: ix + 0.35, y: iy + 0.35, w: 0.1, h: 0.1, fill: { color: C.amber }, line: { color: C.amber } });
      s.addShape("line", { x: ix - 0.15, y: iy + isz / 2, w: 0.15, h: 0, line: { color: C.amber, width: 0.75 } });
      s.addShape("line", { x: ix + isz, y: iy + isz / 2, w: 0.15, h: 0, line: { color: C.amber, width: 0.75 } });
      s.addShape("line", { x: ix + isz / 2, y: iy - 0.15, w: 0, h: 0.15, line: { color: C.amber, width: 0.75 } });
      s.addShape("line", { x: ix + isz / 2, y: iy + isz, w: 0, h: 0.15, line: { color: C.amber, width: 0.75 } });
    } else if (c.icon === "arc") {
      // arc made of small dots
      const pts = [[0,0.7],[0.1,0.5],[0.25,0.32],[0.45,0.18],[0.65,0.08],[0.85,0.03]];
      pts.forEach(([dx,dy]) =>
        s.addShape("ellipse", { x: ix + dx, y: iy + dy, w: 0.08, h: 0.08, fill: { color: C.amber }, line: { color: C.amber } })
      );
    }

    // Tag
    mono(s, c.tag, x + 0.2, cardY + 1.55, cardW - 0.4, 0.3, { size: 11, color: C.amber, charSpacing: 3 });

    // Headline
    s.addText([
      { text: c.head,        options: { italic: false } },
      { text: c.italicHead,  options: { italic: true  } },
    ], { x: x + 0.2, y: cardY + 1.85, w: cardW - 0.4, h: 1.3,
        fontFace: FONT_HEAD, fontSize: 30, color: C.ink, margin: 0 });

    // Body
    s.addText(c.body, { x: x + 0.2, y: cardY + 3.0, w: cardW - 0.5, h: 0.9,
      fontFace: FONT_BODY, fontSize: 14, color: C.ink, margin: 0 });

    // Inner divider
    s.addShape("line", { x: x + 0.2, y: cardY + 3.95, w: cardW - 0.5, h: 0,
      line: { color: C.muted, width: 0.5 } });

    // Stat block
    s.addText(c.stat, { x: x + 0.2, y: cardY + 4.05, w: 1.8, h: 0.8,
      fontFace: FONT_HEAD, fontSize: 38, color: C.ink, margin: 0 });
    mono(s, c.statSub, x + 1.7, cardY + 4.18, cardW - 1.9, 0.7,
         { size: 8, color: C.muted, charSpacing: 2 });
  });

  footer(s, "03  08");
}

// ============================================================================
// SLIDE 4 — OUR MISSION (split: dark scene left, dark text right)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.espresso };

  // Left scene panel
  s.addShape("rect", { x: 0, y: 0, w: W * 0.5, h: H,
    fill: { color: C.inkBrown }, line: { color: C.inkBrown } });

  // Stars (small white dots in upper left)
  const stars = [
    [1.5, 0.8],[2.3, 1.1],[3.1, 0.6],[4.4, 1.0],[2.0, 1.8],[3.6, 1.5],[1.0, 1.6],
    [4.8, 0.5],[2.7, 2.0],[5.2, 1.3],[1.8, 2.4],[4.0, 2.2],[3.2, 2.7],[5.5, 0.9],
  ];
  stars.forEach(([x, y]) =>
    s.addShape("ellipse", { x, y, w: 0.06, h: 0.06,
      fill: { color: C.creamSoft }, line: { color: C.creamSoft } })
  );

  // Moon
  s.addShape("ellipse", { x: 6.4, y: 1.0, w: 1.4, h: 1.4,
    fill: { color: C.parchmentLite }, line: { color: C.parchmentLite } });

  // Mountain layers (kopje/savanna silhouette) using freeform via lots of triangles
  // Mid mountain row using zig-zag triangles
  const midY = 5.8;
  const peaks1 = [
    [-0.5, 7.5, 1.5, 5.8, 3.0, 7.5],
    [2.5, 7.5, 4.0, 5.5, 5.5, 7.5],
    [4.5, 7.5, 6.0, 5.6, 7.5, 7.5],
    [6.5, 7.5, 8.0, 5.8, 9.5, 7.5],
  ];
  // Use triangle shapes
  peaks1.forEach(([x1,y1,x2,y2,x3,y3]) => {
    const minX = Math.min(x1,x2,x3), minY = Math.min(y1,y2,y3);
    const maxX = Math.max(x1,x2,x3), maxY = Math.max(y1,y2,y3);
    s.addShape("triangle", {
      x: minX, y: minY, w: maxX - minX, h: maxY - minY,
      fill: { color: "3A2418" }, line: { color: "3A2418" },
    });
  });

  // Foreground darker mountain
  const peaks2 = [
    [-1, 9.5, 2.0, 7.0, 5.0, 9.5],
    [4.5, 9.5, 6.5, 7.2, 8.5, 9.5],
    [8.0, 9.5, 9.5, 7.5, 11.0, 9.5],
  ];
  peaks2.forEach(([x1,y1,x2,y2,x3,y3]) => {
    const minX = Math.min(x1,x2,x3), minY = Math.min(y1,y2,y3);
    const maxX = Math.max(x1,x2,x3), maxY = Math.max(y1,y2,y3);
    s.addShape("triangle", {
      x: minX, y: minY, w: maxX - minX, h: maxY - minY,
      fill: { color: "1F1208" }, line: { color: "1F1208" },
    });
  });

  // Ground / foreground hill
  s.addShape("rect", { x: 0, y: 9.0, w: W * 0.5, h: H - 9.0,
    fill: { color: "100804" }, line: { color: "100804" } });

  // Cheetah silhouette on a kopje rock (bottom-center-ish of left panel)
  // Kopje (rounded mound)
  s.addShape("ellipse", { x: 3.0, y: 8.6, w: 3.5, h: 1.6,
    fill: { color: "0A0502" }, line: { color: "0A0502" } });
  // Cheetah body silhouette — a horizontal oval + head bump + ears
  s.addShape("ellipse", { x: 3.7, y: 7.95, w: 2.3, h: 1.0,
    fill: { color: "050200" }, line: { color: "050200" } });
  s.addShape("ellipse", { x: 5.2, y: 7.55, w: 0.85, h: 0.7,
    fill: { color: "050200" }, line: { color: "050200" } });
  // Ears (two small triangles)
  s.addShape("triangle", { x: 5.35, y: 7.30, w: 0.18, h: 0.3,
    fill: { color: "050200" }, line: { color: "050200" } });
  s.addShape("triangle", { x: 5.7, y: 7.30, w: 0.18, h: 0.3,
    fill: { color: "050200" }, line: { color: "050200" } });

  // Plate caption bottom-left
  s.addShape("rect", { x: 0.6, y: H - 0.85, w: 3.2, h: 0.32,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.creamSoft, width: 0.5 } });
  mono(s, "PLATE II  /  KOPJE AT DUSK", 0.75, H - 0.78, 3.0, 0.32,
       { size: 9, color: C.creamSoft, charSpacing: 2 });

  // ----- Right side text -----
  const rx = W * 0.5 + 0.8;
  mono(s, "OUR MISSION", rx, 1.0, 5, 0.3, { size: 11, color: C.amber, charSpacing: 4 });

  // Big quote mark
  s.addText("\u201C", {
    x: rx, y: 1.5, w: 1, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 80, color: C.amber, italic: true, margin: 0,
  });

  // Mission text (mixed roman + italic)
  s.addText([
    { text: "To keep the savanna a place where the ", options: { italic: false } },
    { text: "cheetah",  options: { italic: true,  color: C.amberPale } },
    { text: " can still run — wild, wide, and unfenced — ", options: { italic: false } },
    { text: "into the next century.",  options: { italic: true } },
  ], {
    x: rx, y: 2.6, w: W - rx - 1.2, h: 5.5,
    fontFace: FONT_HEAD, fontSize: 50, color: C.creamSoft, valign: "top", margin: 0,
  });

  // Divider + caption
  s.addShape("line", { x: rx, y: 8.6, w: 3, h: 0, line: { color: C.muted, width: 0.5 } });
  mono(s, "FOUNDING STATEMENT  /  2026", rx, 8.75, 5, 0.3,
       { size: 10, color: C.muted, charSpacing: 3 });

  // Bottom-right meta
  mono(s, "CCF  ·  04", rx, H - 0.85, 3, 0.3, { size: 9, color: C.muted, charSpacing: 3 });
  mono(s, "04  08", W - 1.6, H - 0.55, 1.2, 0.3,
       { size: 9, color: C.muted, align: "right", charSpacing: 3 });
}

// ============================================================================
// SLIDE 5 — THREE PILLARS  (light)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  cornerTicks(s, C.muted);

  mono(s, "SECTION 03  /  THE PLAN", 1.2, 0.7, 6, 0.3,
       { size: 11, color: C.amber, charSpacing: 4 });
  mono(s, "05 — THREE PILLARS OF ACTION", W - 7, 0.7, 6, 0.3,
       { size: 11, color: C.ink, align: "right", charSpacing: 4 });

  monoRot(s, "FIG. 05", 0.55, 1.8, 1, 90, { size: 9, color: C.muted });
  monoRot(s, "PILLARS  I — III", 0.55, 5.5, 2, 90, { size: 9, color: C.muted });
  monoRot(s, "10-YR PLAN", 0.55, 9.25, 1.5, 90, { size: 9, color: C.muted });

  // Headline
  s.addText([
    { text: "How we ", options: { italic: false } },
    { text: "work.",   options: { italic: true  } },
  ], { x: 1.2, y: 1.2, w: 9, h: 1.6,
       fontFace: FONT_HEAD, fontSize: 64, color: C.ink, margin: 0 });

  // Right intro
  s.addText("Three programs, run together — because no one of them, alone, is enough.", {
    x: 11.5, y: 1.4, w: 7.5, h: 1.2,
    fontFace: FONT_HEAD, fontSize: 22, color: "4A3F35", italic: true, align: "right", margin: 0,
  });

  // ----- Three pillar cards -----
  const cardY = 3.3, cardH = 5.5, cardW = (W - 2.6) / 3, gap = 0.2, gx = 1.2;
  const pillars = [
    {
      tag: "PILLAR I",  numeral: "I.",
      head: "Land & ", italicHead: "corridors",
      body: "Secure conservancies and stitch fragmented range back into living corridors — Serengeti to Kalahari.",
      stat: "1.4M ha", topBg: "E0AE74", topPattern: "lines", numColor: C.ink,
    },
    {
      tag: "PILLAR II", numeral: "II.",
      head: "People & ", italicHead: "coexistence",
      body: "Livestock-guard dogs, herder training, compensation funds — so a cheetah on the fence is not a cheetah on a snare.",
      stat: "6,000 herders", topBg: "8A6A3F", topPattern: "dogs", numColor: C.creamSoft,
    },
    {
      tag: "PILLAR III", numeral: "III.",
      head: "Science & ", italicHead: "stewardship",
      body: "GPS collars, genetic banking, and a rangers' academy — building data and people who'll run this work past us.",
      stat: "200 rangers / yr", topBg: "1F1812", topPattern: "stars", numColor: C.amber,
    },
  ];

  pillars.forEach((p, i) => {
    const x = gx + i * (cardW + gap);
    // Top half: themed image area
    const topH = 2.3;
    s.addShape("rect", { x, y: cardY, w: cardW, h: topH,
      fill: { color: p.topBg }, line: { color: p.topBg } });

    // Pattern
    if (p.topPattern === "lines") {
      // Horizontal wavy lines (savanna)
      for (let k = 0; k < 6; k++) {
        s.addShape("line", { x: x + 0.2, y: cardY + 0.4 + k * 0.32, w: cardW - 0.4, h: 0,
          line: { color: "C8843A", width: 0.75 } });
      }
    } else if (p.topPattern === "dogs") {
      // small "guard dog" silhouettes (rounded posts as abstract herd protectors)
      for (let k = 0; k < 7; k++) {
        const dx = x + 0.4 + k * 0.55;
        s.addShape("ellipse", { x: dx, y: cardY + 0.7, w: 0.3, h: 0.3,
          fill: { color: "AAA08A" }, line: { color: "AAA08A" } });
        s.addShape("rect", { x: dx + 0.12, y: cardY + 1.0, w: 0.06, h: 0.9,
          fill: { color: "AAA08A" }, line: { color: "AAA08A" } });
      }
    } else if (p.topPattern === "stars") {
      // Constellation: scattered dots connected by lines
      const pts = [
        [0.5, 1.0],[1.2, 0.6],[2.0, 0.9],[2.7, 0.5],[3.5, 0.8],[4.4, 0.5],[5.2, 0.9],[6.0, 0.6],
        [1.5, 1.6],[3.0, 1.7],[4.7, 1.5],
      ].map(([dx, dy]) => [x + dx, cardY + dy]);
      for (let k = 0; k < pts.length - 1; k++) {
        const [ax, ay] = pts[k], [bx, by] = pts[k + 1];
        s.addShape("line", { x: ax, y: ay, w: bx - ax, h: by - ay,
          line: { color: "8A6A3F", width: 0.5 } });
      }
      pts.forEach(([px, py]) =>
        s.addShape("ellipse", { x: px - 0.05, y: py - 0.05, w: 0.1, h: 0.1,
          fill: { color: C.parchmentLite }, line: { color: C.parchmentLite } })
      );
    }

    // Tag in top
    mono(s, p.tag, x + 0.2, cardY + 0.2, 2, 0.25, { size: 9, color: p.numColor, charSpacing: 3 });
    // Big roman numeral
    s.addText(p.numeral, {
      x: x + cardW - 1.6, y: cardY + 0.6, w: 1.5, h: 1.6,
      fontFace: FONT_HEAD, fontSize: 70, color: p.numColor, italic: false, align: "right", margin: 0,
    });

    // Bottom half: light card body
    s.addShape("rect", { x, y: cardY + topH, w: cardW, h: cardH - topH,
      fill: { color: C.creamSoft }, line: { color: C.creamSoft } });

    // Headline
    s.addText([
      { text: p.head,       options: { italic: false } },
      { text: p.italicHead, options: { italic: true  } },
    ], { x: x + 0.25, y: cardY + topH + 0.2, w: cardW - 0.5, h: 0.8,
         fontFace: FONT_HEAD, fontSize: 28, color: C.ink, margin: 0 });

    // Body
    s.addText(p.body, { x: x + 0.25, y: cardY + topH + 1.05, w: cardW - 0.5, h: 1.3,
      fontFace: FONT_BODY, fontSize: 13, color: C.ink, margin: 0 });

    // Inner divider
    s.addShape("line", { x: x + 0.25, y: cardY + cardH - 0.85, w: cardW - 0.5, h: 0,
      line: { color: C.muted, width: 0.5 } });

    // 10-yr target
    mono(s, "10-YR TARGET", x + 0.25, cardY + cardH - 0.7, 2.5, 0.3,
         { size: 9, color: C.muted, charSpacing: 3 });
    s.addText(p.stat, {
      x: x + cardW - 3.0, y: cardY + cardH - 0.85, w: 2.7, h: 0.65,
      fontFace: FONT_HEAD, fontSize: 22, color: C.amber, italic: true, align: "right", margin: 0,
    });
  });

  // ----- Bottom: BY THE NUMBERS row -----
  const bnY = 9.1;
  s.addShape("line", { x: 1.2, y: bnY, w: W - 2.4, h: 0,
    line: { color: C.muted, width: 0.5 } });
  mono(s, "BY THE NUMBERS", 1.4, bnY + 0.15, 2.2, 0.25, { size: 9, color: C.muted, charSpacing: 3 });
  mono(s, "10-YR", 1.4, bnY + 0.42, 2.2, 0.25, { size: 9, color: C.amber, charSpacing: 3 });

  const bn = [
    { v: "$48M",  l: "TOTAL PROGRAM BUDGET",   c: C.ink },
    { v: "14",    l: "FIELD PARTNERS",         c: C.ink },
    { v: "120+",  l: "COLLARED ANIMALS",       c: C.ink },
    { v: "2,900", l: "CHEETAH LIVES PROJECTED", c: C.amber },
  ];
  const colW = (W - 5.2) / 4;
  bn.forEach((b, i) => {
    const x = 4.4 + i * colW;
    s.addText(b.v, { x, y: bnY + 0.15, w: colW - 0.4, h: 0.9,
      fontFace: FONT_HEAD, fontSize: 36, color: b.c, italic: false, margin: 0 });
    mono(s, b.l, x, bnY + 1.0, colW, 0.3, { size: 9, color: C.muted, charSpacing: 3 });
  });

  footer(s, "05  08");
}

// ============================================================================
// SLIDE 6 — WHERE WE WORK (light, with map)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  cornerTicks(s, C.muted);

  mono(s, "SECTION 04  /  GEOGRAPHY", 1.2, 0.7, 6, 0.3,
       { size: 11, color: C.amber, charSpacing: 4 });
  mono(s, "06 — WHERE WE WORK", W - 7, 0.7, 6, 0.3,
       { size: 11, color: C.ink, align: "right", charSpacing: 4 });

  monoRot(s, "FIG. 06", 0.55, 1.8, 1, 90, { size: 9, color: C.muted });
  monoRot(s, "RANGE MAP", 0.55, 5.3, 1.6, 90, { size: 9, color: C.muted });
  monoRot(s, "6 COUNTRIES", 0.55, 9.3, 1.6, 90, { size: 9, color: C.muted });

  // Headline
  s.addText([
    { text: "Six countries. ",  options: { italic: false } },
    { text: "One landscape.",   options: { italic: true  } },
  ], { x: 1.2, y: 1.2, w: 9.5, h: 2.2,
       fontFace: FONT_HEAD, fontSize: 56, color: C.ink, margin: 0 });

  // Sub
  s.addText("Field operations across the cheetah's last strongholds in Southern and Eastern Africa, headquartered in Namibia.", {
    x: 1.2, y: 3.5, w: 8.5, h: 1.2,
    fontFace: FONT_BODY, fontSize: 16, color: C.ink, margin: 0,
  });

  // Country list
  const listY = 5.0;
  s.addShape("line", { x: 1.2, y: listY, w: 7.5, h: 0, line: { color: C.muted, width: 0.5 } });

  const countries = [
    [["Namibia",     "HQ ●",     C.amber],   ["Botswana",     "FIELD ○",   C.muted]],
    [["Kenya",       "FIELD ○",  C.muted],   ["Tanzania",     "FIELD ○",   C.muted]],
    [["South Africa","PARTNER ◇",C.muted],   ["Zimbabwe",     "PARTNER ◇", C.muted]],
  ];
  countries.forEach((row, ri) => {
    row.forEach(([name, role, c], ci) => {
      const x = 1.4 + ci * 3.7, y = listY + 0.25 + ri * 0.55;
      s.addText(name, { x, y, w: 2.2, h: 0.4,
        fontFace: FONT_HEAD, fontSize: 20, color: C.ink, margin: 0 });
      mono(s, role, x + 2.2, y + 0.12, 1.4, 0.3,
           { size: 10, color: c, align: "right", charSpacing: 3 });
    });
  });
  s.addShape("line", { x: 1.2, y: listY + 2.0, w: 7.5, h: 0, line: { color: C.muted, width: 0.5 } });

  // Two stat columns
  const sY = 7.4;
  s.addText("12", { x: 1.4, y: sY, w: 1.5, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 56, color: C.amber, italic: false, margin: 0 });
  mono(s, "FIELD STAFF", 1.4, sY + 0.95, 2, 0.3, { size: 9, color: C.muted, charSpacing: 3 });

  s.addText("3", { x: 3.4, y: sY, w: 1.5, h: 0.9,
    fontFace: FONT_HEAD, fontSize: 56, color: C.amber, italic: false, margin: 0 });
  mono(s, "HUBS BY 2027", 3.4, sY + 0.95, 2.5, 0.3, { size: 9, color: C.muted, charSpacing: 3 });

  // ---------- MAP (right) ----------
  const mX = 10.3, mY = 1.2, mW = 8.7, mH = 9.3;
  s.addShape("rect", { x: mX, y: mY, w: mW, h: mH,
    fill: { color: C.creamSoft }, line: { color: C.creamSoft } });

  mono(s, "AFRICA  ·  CHEETAH OPERATING RANGE", mX + 0.25, mY + 0.25, 5, 0.3,
       { size: 9, color: C.muted, charSpacing: 3 });
  mono(s, "FIG. 01", mX + mW - 1.0, mY + 0.25, 1, 0.3,
       { size: 9, color: C.muted, align: "right", charSpacing: 3 });

  // Subtle grid
  for (let k = 1; k < 4; k++) {
    s.addShape("line", { x: mX + (mW * k) / 4, y: mY + 0.7, w: 0, h: mH - 1.0,
      line: { color: "D9CFB8", width: 0.5 } });
    s.addShape("line", { x: mX + 0.3, y: mY + 0.7 + ((mH - 1.0) * k) / 4, w: mW - 0.6, h: 0,
      line: { color: "D9CFB8", width: 0.5 } });
  }

  // Outer historic range blob — large rounded ellipse
  s.addShape("ellipse", {
    x: mX + 1.4, y: mY + 1.5, w: mW - 3, h: mH - 3,
    fill: { color: C.parchmentLite, transparency: 50 }, line: { color: C.muted, width: 0.75 },
  });
  // Inner current range blob — smaller, dashed-ish
  s.addShape("ellipse", {
    x: mX + 2.6, y: mY + 3.2, w: mW - 5.2, h: mH - 5.0,
    fill: { color: C.parchment, transparency: 35 }, line: { color: C.amber, width: 0.75, dashType: "dash" },
  });

  // Country dots & labels
  const places = [
    { name: "KENYA",    x: mX + 6.5, y: mY + 3.4, role: "field"   },
    { name: "TANZANIA", x: mX + 6.7, y: mY + 4.4, role: "field"   },
    { name: "BOTSWANA", x: mX + 5.4, y: mY + 5.7, role: "field"   },
    { name: "ZIMBABWE", x: mX + 6.5, y: mY + 6.1, role: "partner" },
    { name: "S. AFRICA",x: mX + 6.0, y: mY + 7.0, role: "partner" },
    { name: "NAMIBIA · HQ", x: mX + 4.4, y: mY + 6.6, role: "hq"  },
  ];
  places.forEach(p => {
    if (p.role === "hq") {
      // outer ring + filled center
      s.addShape("ellipse", { x: p.x - 0.18, y: p.y - 0.18, w: 0.36, h: 0.36,
        fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.amber, width: 1.5 } });
      s.addShape("ellipse", { x: p.x - 0.08, y: p.y - 0.08, w: 0.16, h: 0.16,
        fill: { color: C.amber }, line: { color: C.amber } });
      mono(s, p.name, p.x - 1.7, p.y + 0.25, 1.7, 0.3,
           { size: 10, color: C.ink, align: "right", charSpacing: 3 });
    } else {
      s.addShape("ellipse", { x: p.x - 0.1, y: p.y - 0.1, w: 0.2, h: 0.2,
        fill: { color: C.ink }, line: { color: C.ink } });
      mono(s, p.name, p.x + 0.18, p.y - 0.1, 1.8, 0.3,
           { size: 10, color: C.ink, charSpacing: 3 });
    }
  });

  // Compass (bottom right of map)
  const nx = mX + mW - 0.9, ny = mY + mH - 1.1;
  s.addShape("ellipse", { x: nx - 0.5, y: ny - 0.5, w: 1.0, h: 1.0,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.muted, width: 0.5 } });
  s.addShape("line", { x: nx, y: ny - 0.5, w: 0, h: 1.0, line: { color: C.muted, width: 0.5 } });
  s.addShape("line", { x: nx - 0.5, y: ny, w: 1.0, h: 0, line: { color: C.muted, width: 0.5 } });
  mono(s, "N", nx - 0.1, ny - 0.85, 0.3, 0.3, { size: 10, color: C.ink, charSpacing: 1 });

  footer(s, "06  08");
}

// ============================================================================
// SLIDE 7 — ROADMAP (dark)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.inkDeep };
  cornerTicks(s, C.muted);

  mono(s, "SECTION 05  /  ROADMAP", 1.2, 0.7, 6, 0.3,
       { size: 11, color: C.amber, charSpacing: 4 });
  mono(s, "07 — THE DECADE AHEAD", W - 7, 0.7, 6, 0.3,
       { size: 11, color: C.creamSoft, align: "right", charSpacing: 4 });

  monoRot(s, "FIG. 07", 0.55, 1.8, 1, 90, { size: 9, color: C.muted });
  monoRot(s, "ROADMAP 2026–36", 0.55, 5.5, 2, 90, { size: 9, color: C.muted });
  monoRot(s, "POPULATION", 0.55, 9.3, 1.6, 90, { size: 9, color: C.muted });

  // Headline
  s.addText([
    { text: "A ten-year plan, ",   options: { italic: false } },
    { text: "measured in lives.",  options: { italic: true  } },
  ], { x: 1.2, y: 1.2, w: W - 2.4, h: 1.4,
       fontFace: FONT_HEAD, fontSize: 50, color: C.creamSoft, margin: 0 });

  // ---------- POPULATION CURVE ----------
  const cX = 1.2, cY = 2.9, cW = W - 2.4, cH = 2.2;
  // Y-axis labels
  ["10K", "8K", "7K"].forEach((lbl, i) => {
    const ys = [cY + 0.1, cY + 0.7, cY + 1.4][i];
    mono(s, lbl, cX, ys, 0.7, 0.25, { size: 9, color: C.muted });
    s.addShape("line", { x: cX + 0.7, y: ys + 0.08, w: cW - 0.7, h: 0,
      line: { color: "2A1F12", width: 0.5 } });
  });

  // Curve plotted as connected line segments + filled area approximated by bars
  // Data points (x fraction, y fraction within plot)
  const pts = [
    { fx: 0.05, val: 7100,  lbl: "2026", n: "7,100"   },
    { fx: 0.32, val: 7300,  lbl: "2029", n: "7,300"   },
    { fx: 0.65, val: 8000,  lbl: "2032", n: "8,000"   },
    { fx: 0.96, val: 10200, lbl: "2036", n: "10,000+" },
  ];
  // Convert to coords. Y range: 7000..10500
  const yMin = 7000, yMax = 10500;
  const plotX = cX + 0.7, plotY = cY + 0.1, plotW = cW - 0.9, plotH = cH - 0.3;
  const coords = pts.map(p => ({
    x: plotX + plotW * p.fx,
    y: plotY + plotH * (1 - (p.val - yMin) / (yMax - yMin)),
    p,
  }));

  // Filled area under curve (approximated with thin vertical bars)
  const steps = 80;
  for (let k = 0; k < steps; k++) {
    const t = k / steps;
    // simple piecewise linear interpolation across the 4 points
    let val;
    if (t <= pts[1].fx) val = pts[0].val + (pts[1].val - pts[0].val) * (t - pts[0].fx) / (pts[1].fx - pts[0].fx);
    else if (t <= pts[2].fx) val = pts[1].val + (pts[2].val - pts[1].val) * (t - pts[1].fx) / (pts[2].fx - pts[1].fx);
    else val = pts[2].val + (pts[3].val - pts[2].val) * (t - pts[2].fx) / (pts[3].fx - pts[2].fx);
    if (t < pts[0].fx || t > pts[3].fx) continue;
    const xx = plotX + plotW * t;
    const yy = plotY + plotH * (1 - (val - yMin) / (yMax - yMin));
    s.addShape("rect", { x: xx, y: yy, w: plotW / steps + 0.02, h: (plotY + plotH) - yy,
      fill: { color: "3A2418", transparency: 40 }, line: { color: "3A2418", transparency: 40 } });
  }

  // Curve segments
  for (let k = 0; k < coords.length - 1; k++) {
    const a = coords[k], b = coords[k + 1];
    s.addShape("line", { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y,
      line: { color: C.amber, width: 2 } });
  }
  // Points
  coords.forEach((c, i) => {
    const isLast = i === coords.length - 1;
    if (isLast) {
      s.addShape("ellipse", { x: c.x - 0.13, y: c.y - 0.13, w: 0.26, h: 0.26,
        fill: { color: C.amber }, line: { color: C.amber } });
    } else {
      s.addShape("ellipse", { x: c.x - 0.12, y: c.y - 0.12, w: 0.24, h: 0.24,
        fill: { color: C.inkDeep }, line: { color: C.amber, width: 1.5 } });
    }
  });

  // ---------- TABLE ----------
  const tX = 1.2, tY = 5.4, tW = W - 2.4;
  // Header row
  s.addShape("line", { x: tX, y: tY, w: tW, h: 0, line: { color: C.muted, width: 0.5 } });
  const cols = [
    { x: tX + 0.0, w: 2.5, label: "YEAR" },
    { x: tX + 2.5, w: 4.5, label: "PHASE" },
    { x: tX + 7.0, w: 7.5, label: "MILESTONE" },
    { x: tX + 14.5, w: 3.0, label: "POPULATION" },
  ];
  cols.forEach(c =>
    mono(s, c.label, c.x + 0.1, tY + 0.15, c.w, 0.3,
      { size: 9, color: C.muted, charSpacing: 3, align: c.label === "POPULATION" ? "right" : "left" })
  );

  const rows = [
    { y: "2026", phase: "Foundation", text: "Launch HQ in Windhoek. First 200 livestock-guard dogs deployed. Kenya field office opens.", pop: "7,100"  },
    { y: "2029", phase: "Stabilize",  text: "First wildlife corridor secured Namibia–Botswana. Decline arrested in three of six countries.", pop: "7,300"   },
    { y: "2032", phase: "Expand",     text: "Pan-African genetic registry online. 1.4M hectares under active management.", pop: "8,000"    },
    { y: "2036", phase: "Recover",    text: "A measurable, sustained recovery — the first in a generation.", pop: "10,000+", highlight: true },
  ];
  const rowH = 1.1;
  rows.forEach((r, i) => {
    const ry = tY + 0.55 + i * rowH;
    s.addShape("line", { x: tX, y: ry + rowH - 0.1, w: tW, h: 0,
      line: { color: "2A1F12", width: 0.5 } });

    // Year (with little dot accent)
    s.addText(r.y, { x: cols[0].x, y: ry, w: 1.6, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 32, color: r.highlight ? C.amber : C.creamSoft, margin: 0 });
    s.addShape("ellipse", { x: cols[0].x + 1.55, y: ry + 0.45, w: 0.15, h: 0.15,
      fill: { color: C.amber }, line: { color: C.amber } });

    // Phase (italic)
    s.addText(r.phase, { x: cols[1].x + 0.1, y: ry, w: cols[1].w - 0.2, h: 0.7,
      fontFace: FONT_HEAD, fontSize: 26, color: C.amber, italic: true, margin: 0 });

    // Text
    s.addText(r.text, { x: cols[2].x + 0.1, y: ry + 0.05, w: cols[2].w - 0.2, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.creamSoft, margin: 0 });

    // Population
    s.addText(r.pop, { x: cols[3].x, y: ry, w: cols[3].w - 0.1, h: 0.8,
      fontFace: FONT_HEAD, fontSize: 32, color: r.highlight ? C.amber : C.creamSoft,
      align: "right", margin: 0 });
  });

  footer(s, "07  08", true);
}

// ============================================================================
// SLIDE 8 — RUN WITH US (split, mirrors slide 1)
// ============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  cornerTicks(s);

  // Right amber panel
  s.addShape("rect", { x: W * 0.5, y: 0, w: W * 0.5, h: H,
    fill: { color: C.parchment }, line: { color: C.parchment } });

  // Eyebrow
  mono(s, "IN CLOSING", 0.95, 0.95, 5, 0.3, { size: 12, color: C.amber, charSpacing: 4 });

  // Headline
  s.addText([
    { text: "Run ",   options: { italic: false } },
    { text: "with\nus.", options: { italic: true,  color: C.amber } },
  ], { x: 0.95, y: 2.2, w: 8.5, h: 3.5,
       fontFace: FONT_HEAD, fontSize: 110, color: C.ink, valign: "top", margin: 0 });

  // Body
  s.addText("We are looking for founding board members, field partners, and patrons who want their name on the first decade of this work.", {
    x: 0.95, y: 6.0, w: 7.5, h: 1.4,
    fontFace: FONT_BODY, fontSize: 16, color: C.ink, margin: 0,
  });

  // Divider
  s.addShape("line", { x: 0.95, y: 7.6, w: 2.5, h: 0, line: { color: C.muted, width: 0.5 } });

  // Contact rows
  const contacts = [
    ["WRITE", "founders@cheetahconservation.fund"],
    ["VISIT", "cheetahconservation.fund"],
    ["FIELD", "+264 67 306 225  ·  Otjiwarongo, Namibia"],
  ];
  contacts.forEach(([k, v], i) => {
    const y = 7.85 + i * 0.5;
    mono(s, k, 0.95, y, 1, 0.3, { size: 10, color: C.muted, charSpacing: 3 });
    s.addText(v, { x: 1.95, y: y - 0.05, w: 7, h: 0.4,
      fontFace: FONT_BODY, fontSize: 15, color: C.ink, margin: 0 });
  });

  // Bottom-left meta
  mono(s, "FIN. / THANK YOU", 0.6, H - 0.55, 4, 0.3, { size: 10, color: C.amber, charSpacing: 3 });
  mono(s, "08  08", 7, H - 0.55, 2, 0.3, { size: 10, color: C.muted, charSpacing: 3 });

  // Vertical right edge label
  monoRot(s, "CHEETAH CONSERVATION FUND  ·  FOUNDING PROSPECTUS  ·  MMXXVI",
          W - 0.4, 5.5, 8, 90,
          { size: 10, color: C.inkBrown, charSpacing: 3 });

  // Plate caption near bottom-right of amber panel
  s.addShape("rect", { x: W - 3.7, y: H - 0.85, w: 3.0, h: 0.32,
    fill: { color: "FFFFFF", transparency: 100 }, line: { color: C.inkBrown, width: 0.5 } });
  mono(s, "PLATE III  /  AT FULL STRIDE", W - 3.55, H - 0.78, 2.8, 0.32,
       { size: 9, color: C.inkBrown, charSpacing: 3 });

  // ---------- Right-panel illustration: cheetah running at sunset ----------
  // Sun
  s.addShape("ellipse", { x: 13.6, y: 2.6, w: 2.6, h: 2.6,
    fill: { color: "FFF0C8" }, line: { color: "FFF0C8" } });

  // Birds (simple V-shapes via two short line segments each)
  const birds = [[12.5, 1.7],[13.2, 2.1],[14.3, 1.5]];
  birds.forEach(([bx, by]) => {
    s.addShape("line", { x: bx, y: by, w: 0.25, h: -0.12, line: { color: C.inkBrown, width: 1.5 } });
    s.addShape("line", { x: bx + 0.25, y: by - 0.12, w: 0.25, h: 0.12, line: { color: C.inkBrown, width: 1.5 } });
  });

  // Horizon line
  s.addShape("line", { x: W * 0.5, y: 5.7, w: W * 0.5, h: 0,
    line: { color: C.inkBrown, width: 0.5 } });

  // Distant trees / acacia (umbrella tree silhouettes)
  // Tree 1
  s.addShape("rect", { x: 11.5, y: 5.0, w: 0.05, h: 0.7,
    fill: { color: C.brown }, line: { color: C.brown } });
  s.addShape("ellipse", { x: 11.0, y: 4.85, w: 1.1, h: 0.3,
    fill: { color: C.brown }, line: { color: C.brown } });
  // small bush
  s.addShape("ellipse", { x: 17.0, y: 5.5, w: 1.0, h: 0.3,
    fill: { color: C.brown }, line: { color: C.brown } });

  // ---------- Cheetah silhouette running ----------
  // Body — long horizontal ellipse
  const bx = 13.5, by = 7.1, bw = 4.5, bh = 1.4;
  s.addShape("ellipse", { x: bx, y: by, w: bw, h: bh,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" } });

  // Tail (long curve approximated by rotated ellipse + tip)
  s.addShape("ellipse", { x: bx - 1.3, y: by + 0.4, w: 1.6, h: 0.25,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" }, rotate: -10 });

  // Head and neck
  s.addShape("ellipse", { x: bx + bw - 0.5, y: by + 0.2, w: 1.4, h: 0.7,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" } });
  s.addShape("ellipse", { x: bx + bw + 0.5, y: by + 0.3, w: 0.9, h: 0.7,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" } });
  // Ear
  s.addShape("triangle", { x: bx + bw + 0.55, y: by + 0.05, w: 0.3, h: 0.35,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" } });

  // Legs (4 angled rectangles)
  // Front legs (back of cheetah is left, front is right)
  s.addShape("rect", { x: bx + 3.2, y: by + 1.0, w: 0.18, h: 1.6,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" }, rotate: 15 });
  s.addShape("rect", { x: bx + 3.7, y: by + 1.0, w: 0.18, h: 1.6,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" }, rotate: -15 });
  // Back legs
  s.addShape("rect", { x: bx + 0.6, y: by + 1.0, w: 0.18, h: 1.6,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" }, rotate: 20 });
  s.addShape("rect", { x: bx + 1.2, y: by + 1.0, w: 0.18, h: 1.6,
    fill: { color: "1A0E05" }, line: { color: "1A0E05" }, rotate: -20 });

  // Ground shadows (small ellipses below feet)
  [bx + 0.7, bx + 1.5, bx + 3.3, bx + 3.9].forEach(fx =>
    s.addShape("ellipse", { x: fx - 0.25, y: by + 2.6, w: 0.5, h: 0.12,
      fill: { color: C.inkBrown, transparency: 30 }, line: { color: C.inkBrown, transparency: 30 } })
  );

  // Motion grass strokes
  for (let k = 0; k < 12; k++) {
    const gx = 10.5 + k * 0.7;
    const gy = 9.6 + (k % 2) * 0.2;
    s.addShape("line", { x: gx, y: gy, w: -0.15, h: 0.5,
      line: { color: C.inkBrown, width: 1.2 } });
  }
}

// ----- Save ---------------------------------------------------------------
pres.writeFile({ fileName: "cheetah.pptx" })
  .then(fn => console.log("Wrote", fn))
  .catch(e => { console.error(e); process.exit(1); });
