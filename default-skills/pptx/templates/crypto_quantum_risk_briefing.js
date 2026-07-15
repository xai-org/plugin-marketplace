// Quantum x Bitcoin — Investor Briefing
// Rebuilds Quantum_Computing.pptx using pptxgenjs
// Layout: 13.33" x 7.5" (LAYOUT_WIDE)

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_WIDE";
pres.title = "Quantum x Bitcoin — An Investor Briefing";
pres.author = "Point Break Partners";

// ============================================================
// PALETTE
// ============================================================
const C = {
  cream:     "F4EFE6",   // light bg
  creamAlt:  "EBE5D8",   // darker cream
  ink:       "14110D",   // primary dark text
  inkSoft:   "3A342B",   // secondary dark
  muted:     "6B6357",   // tertiary / labels
  dark:      "0A0907",   // deep dark bg
  darkAlt:   "0E0C09",
  orange:    "C46E00",   // brand accent 1
  btcOrange: "F7931A",   // brand accent 2 (bitcoin)
  red:       "B31C1C",
  redDark:   "8A0E0E",
  green:     "2E6B3C",
  greenDark: "1E4A2A",
};

const W = 13.33;  // slide width
const H = 7.5;    // slide height

// ============================================================
// HEADER & FOOTER (applied per-slide because colors vary)
// ============================================================
function addFrame(slide, opts) {
  const bg       = opts.bg       || C.cream;
  const ink      = opts.ink      || C.ink;
  const muted    = opts.muted    || C.muted;
  const section  = opts.section  || "§ 00 · SECTION";
  const pageNum  = opts.pageNum  || "01";
  const tag      = opts.tag      || "TAG";
  const totalPages = "15";

  slide.background = { color: bg };

  // top rule
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 0.56, w: W - 1.0, h: 0,
    line: { color: muted, width: 0.5 },
  });

  // top-left: section
  slide.addText(section, {
    x: 0.5, y: 0.3, w: 6, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: muted,
    bold: false, charSpacing: 4, margin: 0, valign: "middle",
  });

  // top-right: QUANTUM × BITCOIN
  slide.addText("QUANTUM × BITCOIN", {
    x: W - 6.5, y: 0.3, w: 6, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: muted,
    bold: false, charSpacing: 4, margin: 0, valign: "middle", align: "right",
  });

  // bottom rule
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: H - 0.55, w: W - 1.0, h: 0,
    line: { color: muted, width: 0.5 },
  });

  // bottom-left: № XX / 15
  slide.addText(`№ ${pageNum} / ${totalPages}`, {
    x: 0.5, y: H - 0.45, w: 4, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: muted,
    charSpacing: 4, margin: 0, valign: "middle",
  });

  // bottom-right: tag
  slide.addText(tag, {
    x: W - 6.5, y: H - 0.45, w: 6, h: 0.3,
    fontFace: "Arial", fontSize: 10, color: muted,
    charSpacing: 4, margin: 0, valign: "middle", align: "right",
  });
}

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, ink: C.ink, muted: C.muted,
    section: "BRIEFING  № 01",
    pageNum: "01", tag: "COVER",
  });

  // eyebrow
  s.addText("AN INVESTOR BRIEFING  ·  APRIL 2026", {
    x: 0.5, y: 1.1, w: 10, h: 0.4,
    fontFace: "Arial", fontSize: 12, color: C.muted,
    bold: false, charSpacing: 4, margin: 0,
  });

  // Big headline: "Q-Day. Quantum computing's collision course with Bitcoin."
  s.addText([
    { text: "Q-Day. ", options: { color: C.ink, bold: false } },
    { text: "Quantum computing's", options: { color: C.ink, italic: true } },
    { text: " collision course with ", options: { color: C.ink } },
    { text: "Bitcoin.", options: { color: C.orange, bold: false } },
  ], {
    x: 0.5, y: 1.8, w: 10.8, h: 2.8,
    fontFace: "Arial", fontSize: 58, color: C.ink,
    bold: false, margin: 0, valign: "top",
  });

  // small rule above "for crypto & finance investors"
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 6.25, w: 1.2, h: 0,
    line: { color: C.muted, width: 0.5 },
  });

  s.addText("FOR CRYPTO & FINANCE INVESTORS", {
    x: 0.5, y: 6.35, w: 6, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  // Bitcoin ₿ symbol bottom-right
  s.addText("₿", {
    x: W - 2.0, y: 4.6, w: 1.5, h: 1.9,
    fontFace: "Arial", fontSize: 160, color: C.orange,
    bold: true, align: "center", valign: "middle", margin: 0,
  });
}

// ============================================================
// SLIDE 2 — THESIS
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 00  ·  THESIS",
    pageNum: "02", tag: "THESIS",
  });

  s.addText("THE ARGUMENT, IN ONE PARAGRAPH", {
    x: 0.5, y: 0.9, w: 10, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  // Big paragraph
  s.addText([
    { text: "Bitcoin's security rests on two cryptographic assumptions. A sufficiently large quantum computer breaks ", options: { color: C.ink } },
    { text: "one", options: { color: C.ink, italic: true } },
    { text: " of them — and the coins most exposed are the ones nobody can move.", options: { color: C.ink } },
  ], {
    x: 0.5, y: 1.45, w: 11.5, h: 2.6,
    fontFace: "Arial", fontSize: 36, color: C.ink,
    margin: 0, valign: "top",
  });

  // Bottom 3-column: divider line above columns
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 5.55, w: W - 1.0, h: 0,
    line: { color: C.muted, width: 0.5 },
  });

  const colY = 5.7;
  const colLabelY = colY;
  const colTextY = colY + 0.4;
  const colW = (W - 1.0) / 3 - 0.2;
  const colXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];

  const cols = [
    { label: "THE ASSET",    body: "~$1.9T Bitcoin network secured by 1990s-era crypto" },
    { label: "THE THREAT",   body: "Cryptographically-relevant quantum computer (CRQC)" },
    { label: "THE EXPOSURE", body: "~4M BTC in address types with no feasible migration" },
  ];
  cols.forEach((c, i) => {
    s.addText(c.label, {
      x: colXs[i], y: colLabelY, w: colW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted,
      charSpacing: 4, margin: 0,
    });
    s.addText(c.body, {
      x: colXs[i], y: colTextY, w: colW, h: 1.0,
      fontFace: "Arial", fontSize: 14, color: C.ink,
      margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 3 — PRIMER · QUBITS (dark orange bg)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.orange, ink: C.cream, muted: C.cream,
    section: "§ 01  ·  PRIMER",
    pageNum: "03", tag: "PRIMER  ·  QUBITS",
  });

  s.addText("FIG. 01 — WHAT IS A QUANTUM COMPUTER?", {
    x: 0.5, y: 0.9, w: 10, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.cream,
    charSpacing: 4, margin: 0,
  });

  // Headline
  s.addText([
    { text: "A computer that stores information in ", options: { color: C.cream } },
    { text: "superposition", options: { color: C.btcOrange, italic: true } },
    { text: ", not just zeros and ones.", options: { color: C.cream } },
  ], {
    x: 0.5, y: 1.4, w: 12, h: 2.0,
    fontFace: "Arial", fontSize: 40, color: C.cream,
    margin: 0, valign: "top",
  });

  // Three columns
  const cy = 4.2;
  const cW = (W - 1.0) / 3 - 0.25;
  const cXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];

  // top rules per column
  cXs.forEach(x => {
    s.addShape(pres.shapes.LINE, {
      x: x, y: cy, w: cW, h: 0,
      line: { color: C.cream, width: 0.5 },
    });
  });

  // Labels
  const labels = ["CLASSICAL BIT", "QUBIT", "IMPLICATION"];
  labels.forEach((lbl, i) => {
    s.addText(lbl, {
      x: cXs[i], y: cy + 0.1, w: cW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.cream,
      charSpacing: 4, margin: 0,
    });
  });

  // Big values
  s.addText("0 | 1", {
    x: cXs[0], y: cy + 0.5, w: cW, h: 1.1,
    fontFace: "Arial", fontSize: 54, color: C.cream,
    margin: 0, valign: "top",
  });

  s.addText([
    { text: "α|0⟩+β|1⟩", options: { color: C.btcOrange } },
  ], {
    x: cXs[1], y: cy + 0.5, w: cW, h: 1.1,
    fontFace: "Arial", fontSize: 48, color: C.btcOrange,
    margin: 0, valign: "top",
  });

  s.addText("Exponential speedup", {
    x: cXs[2], y: cy + 0.5, w: cW, h: 1.3,
    fontFace: "Arial", fontSize: 30, color: C.cream,
    margin: 0, valign: "top",
  });

  // Descriptions
  const descs = [
    "One value at a time. N bits = N states explored per step.",
    "Both at once, probabilistically. N qubits = 2ᴺ states in superposition.",
    "For specific problems — not all. Factoring and discrete logs are on the list.",
  ];
  descs.forEach((d, i) => {
    s.addText(d, {
      x: cXs[i], y: cy + 1.9, w: cW, h: 0.9,
      fontFace: "Arial", fontSize: 12, color: C.cream,
      margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 4 — PRIMER · ALGORITHMS (table)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 01  ·  PRIMER",
    pageNum: "04", tag: "PRIMER  ·  ALGORITHMS",
  });

  s.addText("FIG. 02 — PROBLEMS THAT FALL, AND PROBLEMS THAT DON'T", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("Not every hard problem becomes easy. Two algorithms are what matter here.", {
    x: 0.5, y: 1.4, w: 12, h: 1.5,
    fontFace: "Arial", fontSize: 32, color: C.ink,
    margin: 0, valign: "top",
  });

  // Table
  const tableData = [
    [
      { text: "ALGORITHM",      options: { color: C.muted, fontSize: 11, bold: false, fontFace: "Arial", charSpacing: 4 } },
      { text: "ATTACKS",         options: { color: C.muted, fontSize: 11, bold: false, fontFace: "Arial", charSpacing: 4 } },
      { text: "CLASSICAL COST",  options: { color: C.muted, fontSize: 11, bold: false, fontFace: "Arial", charSpacing: 4 } },
      { text: "QUANTUM COST",    options: { color: C.muted, fontSize: 11, bold: false, fontFace: "Arial", charSpacing: 4 } },
    ],
    [
      { text: "Shor, 1994", options: { color: C.ink, fontSize: 18, fontFace: "Arial" } },
      { text: [
          { text: "Integer factoring, discrete log — the math behind ", options: { color: C.ink } },
          { text: "ECDSA", options: { color: C.ink, bold: true } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
      { text: [
          { text: "Exponential (2", options: { color: C.ink } },
          { text: "128", options: { color: C.ink, superscript: true } },
          { text: ")", options: { color: C.ink } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
      { text: [
          { text: "Polynomial — ", options: { color: C.red, bold: true } },
          { text: "broken", options: { color: C.red, bold: true, italic: true } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
    ],
    [
      { text: "Grover, 1996", options: { color: C.ink, fontSize: 18, fontFace: "Arial" } },
      { text: [
          { text: "Brute-force search — including ", options: { color: C.ink } },
          { text: "SHA-256", options: { color: C.ink, bold: true } },
          { text: " hashing", options: { color: C.ink } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
      { text: [
          { text: "2", options: { color: C.ink } },
          { text: "256", options: { color: C.ink, superscript: true } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
      { text: [
          { text: "2", options: { color: C.green, bold: true } },
          { text: "128", options: { color: C.green, bold: true, superscript: true } },
          { text: " — still infeasible", options: { color: C.green, bold: true } },
        ], options: { fontSize: 14, fontFace: "Arial" } },
    ],
  ];

  s.addTable(tableData, {
    x: 0.5, y: 3.3, w: W - 1.0,
    colW: [2.2, 4.5, 2.7, 2.93],
    rowH: [0.45, 0.9, 0.9],
    border: [
      { type: "solid", pt: 0.5, color: C.muted },
      { type: "none" },
      { type: "solid", pt: 0.5, color: C.muted },
      { type: "none" },
    ],
    fill: { color: C.cream },
    valign: "middle",
  });

  // takeaway footnote
  s.addText([
    { text: "The takeaway: quantum doesn't end cryptography — it ends ", options: { color: C.muted, italic: true } },
    { text: "one particular kind", options: { color: C.ink, italic: true, bold: true } },
    { text: " of cryptography. Unfortunately, it's the kind Bitcoin uses to prove ownership.", options: { color: C.muted, italic: true } },
  ], {
    x: 0.5, y: 6.2, w: W - 1.0, h: 0.6,
    fontFace: "Arial", fontSize: 12, margin: 0, valign: "top",
  });
}

// ============================================================
// SLIDE 5 — TWO PILLARS
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 02  ·  BITCOIN CRYPTO",
    pageNum: "05", tag: "TWO PILLARS",
  });

  s.addText("FIG. 03 — BITCOIN'S TWO CRYPTOGRAPHIC PILLARS", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("One proves you own a coin. The other proves the ledger is sound.", {
    x: 0.5, y: 1.4, w: 12, h: 1.5,
    fontFace: "Arial", fontSize: 32, color: C.ink,
    margin: 0, valign: "top",
  });

  // Two cards
  const cardY = 3.3;
  const cardH = 3.3;
  const cardW = 5.7;
  const cardXs = [0.5, W - 0.5 - cardW];

  [0, 1].forEach(i => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardXs[i], y: cardY, w: cardW, h: cardH,
      fill: { color: C.creamAlt },
      line: { color: C.muted, width: 0.75 },
    });
  });

  // Pillar I
  s.addText("PILLAR I  ·  SIGNATURES", {
    x: cardXs[0] + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText([
    { text: "ECDSA ", options: { fontSize: 36, color: C.ink } },
    { text: "secp256k1", options: { fontSize: 14, color: C.muted } },
  ], {
    x: cardXs[0] + 0.3, y: cardY + 0.7, w: cardW - 0.6, h: 0.9,
    fontFace: "Arial", margin: 0, valign: "middle",
  });
  s.addText("Proves the spender owns the private key behind a Bitcoin address. Every transaction is signed with it.", {
    x: cardXs[0] + 0.3, y: cardY + 1.65, w: cardW - 0.6, h: 0.8,
    fontFace: "Arial", fontSize: 14, color: C.ink,
    margin: 0, valign: "top",
  });
  s.addShape(pres.shapes.LINE, {
    x: cardXs[0] + 0.3, y: cardY + 2.45, w: cardW - 0.6, h: 0,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText("SHOR BREAKS THIS.", {
    x: cardXs[0] + 0.3, y: cardY + 2.55, w: cardW - 0.6, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText("Vulnerable to a CRQC.", {
    x: cardXs[0] + 0.3, y: cardY + 2.85, w: cardW - 0.6, h: 0.35,
    fontFace: "Arial", fontSize: 16, color: C.red,
    margin: 0,
  });

  // Pillar II
  s.addText("PILLAR II  ·  HASHING", {
    x: cardXs[1] + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText([
    { text: "SHA-256 ", options: { fontSize: 36, color: C.ink } },
    { text: "+ RIPEMD-160", options: { fontSize: 14, color: C.muted } },
  ], {
    x: cardXs[1] + 0.3, y: cardY + 0.7, w: cardW - 0.6, h: 0.9,
    fontFace: "Arial", margin: 0, valign: "middle",
  });
  s.addText("Secures mining, block linkage, and wraps public keys inside addresses — hiding them until spend.", {
    x: cardXs[1] + 0.3, y: cardY + 1.65, w: cardW - 0.6, h: 0.8,
    fontFace: "Arial", fontSize: 14, color: C.ink,
    margin: 0, valign: "top",
  });
  s.addShape(pres.shapes.LINE, {
    x: cardXs[1] + 0.3, y: cardY + 2.45, w: cardW - 0.6, h: 0,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText("GROVER ONLY HALVES IT.", {
    x: cardXs[1] + 0.3, y: cardY + 2.55, w: cardW - 0.6, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });
  s.addText("Resilient. Double the bits, done.", {
    x: cardXs[1] + 0.3, y: cardY + 2.85, w: cardW - 0.6, h: 0.35,
    fontFace: "Arial", fontSize: 16, color: C.green,
    margin: 0,
  });
}

// ============================================================
// SLIDE 6 — ASYMMETRY (btcOrange bg)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.btcOrange, ink: C.ink, muted: C.ink,
    section: "§ 02  ·  BITCOIN CRYPTO",
    pageNum: "06", tag: "ASYMMETRY",
  });

  s.addText("THE KEY ASYMMETRY", {
    x: 0.5, y: 2.0, w: 10, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.ink,
    charSpacing: 4, margin: 0,
  });

  // Big headline
  s.addText([
    { text: "Signatures ", options: { color: C.ink } },
    { text: "break", options: { color: C.redDark } },
    { text: ". Hashes ", options: { color: C.ink } },
    { text: "bend", options: { color: C.greenDark } },
    { text: ".", options: { color: C.ink } },
  ], {
    x: 0.5, y: 2.5, w: 12, h: 2.2,
    fontFace: "Arial", fontSize: 68, color: C.ink,
    margin: 0, valign: "top",
  });

  // Sub paragraph
  s.addText([
    { text: "Quantum does not kill Bitcoin in a single stroke. It attacks the spending layer — and only for coins whose public key has been revealed. ", options: { color: C.ink } },
    { text: "Whose coins those are is the whole story.", options: { color: C.ink, italic: true } },
  ], {
    x: 0.5, y: 5.0, w: 12, h: 1.6,
    fontFace: "Arial", fontSize: 18, color: C.ink,
    margin: 0, valign: "top",
  });
}

// ============================================================
// SLIDE 7 — SHOR VS ECDSA (workflow cards)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 02  ·  BITCOIN CRYPTO",
    pageNum: "07", tag: "SHOR VS ECDSA",
  });

  s.addText("FIG. 04 — THE ATTACK, AS A WORKFLOW", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("Three steps from public key to stolen coin.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  // Four workflow cards + arrows
  const cardY = 2.6;
  const cardH = 2.1;
  const cardW = 2.4;
  const gap = 0.55;
  const startX = 0.5;
  const cards = [
    { label: "STEP  ·  01", title: "Observe", body: "Attacker spots a public key in a P2PK output or a broadcast spend.", bg: C.creamAlt, line: C.muted, tc: C.ink, labelColor: C.muted, bodyColor: C.ink },
    { label: "STEP  ·  02", title: "Solve",   body: "Shor's algorithm on a CRQC recovers the private key — ECDLP becomes tractable.", bg: C.orange, line: C.orange, tc: C.cream, labelColor: C.cream, bodyColor: C.cream },
    { label: "STEP  ·  03", title: "Spend",   body: "Sign a transaction, move the coins. Settles in one ~10-minute block.", bg: C.dark, line: C.dark, tc: C.cream, labelColor: C.cream, bodyColor: C.cream },
    { label: "OUTCOME",     title: "Stolen.", body: "Irreversible. No rollback on Bitcoin.", bg: C.cream, line: C.red, tc: C.red, labelColor: C.muted, bodyColor: C.ink },
  ];

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: c.bg },
      line: { color: c.line, width: 0.75 },
    });
    s.addText(c.label, {
      x: x + 0.2, y: cardY + 0.15, w: cardW - 0.4, h: 0.3,
      fontFace: "Arial", fontSize: 10, color: c.labelColor,
      charSpacing: 4, margin: 0,
    });
    // icon (small glyph)
    const glyph = ["👁", "⚛", "↪", ""][i];
    if (glyph) {
      s.addText(glyph, {
        x: x + 0.2, y: cardY + 0.45, w: 0.6, h: 0.4,
        fontFace: "Arial", fontSize: 18, color: c.tc, margin: 0,
      });
    }
    s.addText(c.title, {
      x: x + 0.2, y: cardY + 0.9, w: cardW - 0.4, h: 0.5,
      fontFace: "Georgia", fontSize: 24, color: c.tc,
      margin: 0, valign: "top",
    });
    s.addText(c.body, {
      x: x + 0.2, y: cardY + 1.4, w: cardW - 0.4, h: 0.7,
      fontFace: "Arial", fontSize: 11, color: c.bodyColor,
      margin: 0, valign: "top",
    });

    // arrow between cards (not after last)
    if (i < cards.length - 1) {
      const ax = x + cardW + 0.05;
      const ay = cardY + cardH / 2;
      const aw = gap - 0.1;
      s.addShape(pres.shapes.LINE, {
        x: ax, y: ay, w: aw, h: 0,
        line: { color: i === 2 ? C.red : C.ink, width: 1, endArrowType: "triangle" },
      });
    }
  });

  // Bottom rule + three stat columns
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 5.4, w: W - 1.0, h: 0,
    line: { color: C.muted, width: 0.5 },
  });

  const stats = [
    { label: "RESOURCES NEEDED",  big: "20M / 2,500",  bigColor: C.orange, body: "Physical / logical qubits (Gidney & Ekerå, 2021)" },
    { label: "BEST TODAY (2026)", big: "1,121 / <10",  bigColor: C.ink,    body: "IBM Condor noisy qubits / logical qubits" },
    { label: "TIME TO DRAIN A WALLET", big: "~10 min", bigColor: C.red,    body: "One block confirmation, post-attack" },
  ];
  const scolW = (W - 1.0) / 3 - 0.2;
  const scolXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];
  stats.forEach((st, i) => {
    s.addText(st.label, {
      x: scolXs[i], y: 5.55, w: scolW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0,
    });
    s.addText(st.big, {
      x: scolXs[i], y: 5.9, w: scolW, h: 0.55,
      fontFace: "Arial", fontSize: 28, color: st.bigColor, margin: 0,
    });
    s.addText(st.body, {
      x: scolXs[i], y: 6.5, w: scolW, h: 0.5,
      fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 8 — VULNERABLE SURFACE (stacked bar)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 03  ·  EXPOSURE",
    pageNum: "08", tag: "VULNERABLE SURFACE",
  });

  s.addText("FIG. 05 — BITCOIN SUPPLY, RE-SORTED BY QUANTUM EXPOSURE", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("Not all coins are equal on Q-Day.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  // Stacked bar label
  s.addText("STANDING TARGET  ·  ~5M BTC", {
    x: 0.5, y: 2.7, w: 4, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.red, charSpacing: 4, bold: true, margin: 0,
  });
  s.addText("~19.7M BTC  ·  SCALED TO WIDTH", {
    x: W - 4.5, y: 2.7, w: 4, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0, align: "right",
  });

  // Stacked bar — total 19.7M, widths proportional
  const barX = 0.5, barY = 3.1, barH = 0.9, barW = W - 1.0;
  // widths: 1.7 red / 2.5 orange / 0.8 btc-orange / 14.7 dark
  const parts = [
    { v: 1.7,  color: C.red },
    { v: 2.5,  color: C.orange },
    { v: 0.8,  color: C.btcOrange },
    { v: 14.7, color: C.inkSoft },
  ];
  const total = 19.7;
  let cx = barX;
  parts.forEach(p => {
    const w = barW * (p.v / total);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: barY, w, h: barH,
      fill: { color: p.color }, line: { color: p.color, width: 0 },
    });
    cx += w;
  });

  // Standing-target bracket (over first 3 segments)
  const tgtW = barW * ((1.7 + 2.5 + 0.8) / total);
  // top bracket line (above label) — drawn already in label; add small bracket under label
  s.addShape(pres.shapes.LINE, {
    x: barX, y: 3.0, w: tgtW, h: 0,
    line: { color: C.red, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: barX, y: 3.0, w: 0, h: 0.1,
    line: { color: C.red, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: barX + tgtW, y: 3.0, w: 0, h: 0.1,
    line: { color: C.red, width: 0.75 },
  });

  // segment labels (below bar)
  // P2PK ~1.7M at segment 1
  let segStart = barX;
  const segWidths = parts.map(p => barW * (p.v / total));
  const segCenters = segWidths.map((w, i) => {
    const c = segStart + w / 2;
    segStart += w;
    return c;
  });

  // P2PK label (under seg 0) — upper tier, tick short
  s.addShape(pres.shapes.LINE, {
    x: segCenters[0], y: barY + barH, w: 0, h: 0.2,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "P2PK  ·  ~1.7M", options: { color: C.red, bold: true } },
  ], {
    x: barX, y: barY + barH + 0.25, w: 1.8, h: 0.3,
    fontFace: "Arial", fontSize: 11, charSpacing: 4, margin: 0,
  });
  s.addText("pubkey always visible", {
    x: barX, y: barY + barH + 0.55, w: 2.4, h: 0.3,
    fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0,
  });

  // REUSED ~2.5M (seg 1) — lower tier (tick longer)
  s.addShape(pres.shapes.LINE, {
    x: segCenters[1], y: barY + barH, w: 0, h: 0.95,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "REUSED  ·  ~2.5M", options: { color: C.orange, bold: true } },
  ], {
    x: segCenters[1] - 0.1, y: barY + barH + 1.0, w: 2.5, h: 0.3,
    fontFace: "Arial", fontSize: 11, charSpacing: 4, margin: 0,
  });
  s.addText("pubkey revealed on spend", {
    x: segCenters[1] - 0.1, y: barY + barH + 1.3, w: 2.8, h: 0.3,
    fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0,
  });

  // TAPROOT ~0.8M (seg 2) — upper tier, shifted so it doesn't collide with UNUSED
  s.addShape(pres.shapes.LINE, {
    x: segCenters[2], y: barY + barH, w: 0, h: 0.2,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "TAPROOT · ~0.8M", options: { color: C.btcOrange, bold: true } },
  ], {
    x: segCenters[2] - 0.4, y: barY + barH + 0.25, w: 2.3, h: 0.3,
    fontFace: "Arial", fontSize: 10, charSpacing: 2, margin: 0,
  });
  s.addText("Schnorr key on chain", {
    x: segCenters[2] - 0.4, y: barY + barH + 0.55, w: 2.3, h: 0.3,
    fontFace: "Arial", fontSize: 11, color: C.ink, margin: 0,
  });

  // UNUSED ~14.7M (seg 3) — tick & label well right of TAPROOT block
  const seg3Start = barX + segWidths[0] + segWidths[1] + segWidths[2];
  s.addShape(pres.shapes.LINE, {
    x: seg3Start + 1.8, y: barY + barH, w: 0, h: 0.2,
    line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "P2PKH / P2WPKH  ·  UNUSED  ·  ~14.7M", options: { color: C.inkSoft, bold: true } },
  ], {
    x: seg3Start + 1.9, y: barY + barH + 0.25, w: 5, h: 0.3,
    fontFace: "Arial", fontSize: 11, charSpacing: 4, margin: 0,
  });
  s.addText("pubkey hashed — hidden until spend", {
    x: seg3Start + 1.9, y: barY + barH + 0.55, w: 5, h: 0.3,
    fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0,
  });

  // Bottom rule + risk legend
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 5.9, w: W - 1.0, h: 0,
    line: { color: C.muted, width: 0.5 },
  });

  const risks = [
    { sw: C.red,     title: "CRITICAL RISK", body: "Public key already on chain. Break ECDLP → take the coin." },
    { sw: C.orange,  title: "HIGH RISK",     body: "Pubkey exposed on first spend or via Schnorr — reusers are sitting ducks." },
    { sw: C.inkSoft, title: "MODERATE RISK", body: "Hidden until spend. Vulnerable only in the mempool window." },
  ];
  const rW = (W - 1.0) / 3 - 0.2;
  const rXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];
  risks.forEach((r, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: rXs[i], y: 6.12, w: 0.2, h: 0.2,
      fill: { color: r.sw }, line: { color: r.sw, width: 0 },
    });
    s.addText(r.title, {
      x: rXs[i] + 0.35, y: 6.05, w: rW - 0.4, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: r.sw, charSpacing: 4, bold: false, margin: 0,
    });
    s.addText(r.body, {
      x: rXs[i] + 0.35, y: 6.35, w: rW - 0.4, h: 0.6,
      fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 9 — THE UNREACHABLE (dark bg)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.dark, ink: C.cream, muted: C.cream,
    section: "§ 03  ·  EXPOSURE",
    pageNum: "09", tag: "THE UNREACHABLE",
  });

  s.addText("FIG. 06 — THE COINS NOBODY CAN MOVE", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  // Big headline with faded "unreachable"
  s.addText([
    { text: "About ", options: { color: C.cream } },
    { text: "four million", options: { color: C.btcOrange } },
    { text: " BTC sit in addresses whose public keys are already public — and whose owners are, in many cases, ", options: { color: C.cream } },
    { text: "unreachable.", options: { color: "6B6357", italic: true } },
  ], {
    x: 0.5, y: 1.4, w: 12.3, h: 2.2,
    fontFace: "Arial", fontSize: 36, color: C.cream,
    margin: 0, valign: "top",
  });

  // Three columns
  const cy = 4.0;
  const cW = (W - 1.0) / 3 - 0.25;
  const cXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];

  // top rules
  cXs.forEach(x => {
    s.addShape(pres.shapes.LINE, {
      x, y: cy, w: cW, h: 0, line: { color: C.muted, width: 0.5 },
    });
  });

  const cards = [
    { stat: "~1.1M BTC", title: "Satoshi",   body: "Early 2009–2010 mining in P2PK format. Public keys on chain since block 1. Never moved." },
    { stat: "~0.6M BTC", title: "Other P2PK", body: "Early miners and enthusiasts. Presumed lost keys, cold wallets, forgotten drives." },
    { stat: "~2.5M BTC", title: "Reused addrs.", body: "Addresses that have been spent from — exposing the pubkey — but still hold residual balance." },
  ];
  cards.forEach((c, i) => {
    s.addText(c.stat, {
      x: cXs[i], y: cy + 0.1, w: cW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0,
    });
    s.addText(c.title, {
      x: cXs[i], y: cy + 0.45, w: cW, h: 1.3,
      fontFace: "Arial", fontSize: 38, color: C.cream, margin: 0, valign: "top",
    });
    s.addText(c.body, {
      x: cXs[i], y: cy + 1.85, w: cW, h: 0.9,
      fontFace: "Arial", fontSize: 12, color: C.cream, margin: 0, valign: "top",
    });
  });

  // Bottom footnote
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 6.55, w: W - 1.0, h: 0, line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "These coins cannot be migrated by their owners. On Q-Day, they are the first to go — ", options: { color: C.cream } },
    { text: "and the market will price that in before a single coin moves.", options: { color: "6B6357", italic: true } },
  ], {
    x: 0.5, y: 6.7, w: W - 1.0, h: 0.5,
    fontFace: "Arial", fontSize: 13, margin: 0, valign: "top",
  });
}

// ============================================================
// SLIDE 10 — Q-DAY TIMELINE (4-col sources)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 04  ·  TIMELINE",
    pageNum: "10", tag: "Q-DAY TIMELINE",
  });

  s.addText("FIG. 07 — WHEN IS Q-DAY? A RANGE OF EXPERT ESTIMATES", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("No consensus. A distribution.", {
    x: 0.5, y: 1.4, w: 12, h: 0.7,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  // 4 columns
  const cy = 2.6;
  const cW = (W - 1.0) / 4 - 0.15;
  const cXs = [0, 1, 2, 3].map(i => 0.5 + i * (W - 1.0) / 4);

  // top rule across all
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: cy, w: W - 1.0, h: 0, line: { color: C.muted, width: 0.5 },
  });
  // vertical separators between cols
  [1, 2, 3].forEach(i => {
    const vx = 0.5 + i * (W - 1.0) / 4 - 0.075;
    s.addShape(pres.shapes.LINE, {
      x: vx, y: cy + 0.1, w: 0, h: 2.7,
      line: { color: C.muted, width: 0.5 },
    });
  });
  // bottom rule
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: cy + 2.85, w: W - 1.0, h: 0, line: { color: C.muted, width: 0.5 },
  });

  const sources = [
    { src: "SOURCE  ·  01", big: "2030",    bigColor: C.red,       sub: "NIST DEPRECATION",      body: "SP 800-131A retires RSA-2048. The signal that every dependent protocol is on the clock." },
    { src: "SOURCE  ·  02", big: "17–34%",  bigColor: C.orange,    sub: "GLOBAL RISK INSTITUTE", body: "2024 expert survey: probability of a CRQC by 2034. Up sharply year on year." },
    { src: "SOURCE  ·  03", big: "10–20 yr", bigColor: C.ink,      sub: "ANALYST CONSENSUS",     body: "Deloitte & industry median for Bitcoin-breaking CRQC. Puts Q-Day in the 2032–2045 window." },
    { src: "SOURCE  ·  04", big: "never?",  bigColor: C.muted,     sub: "SKEPTIC FLOOR",         body: "Aaronson, Kalai and others: scalable QC may be decades off, or fundamentally blocked." },
  ];
  sources.forEach((sc, i) => {
    const x = cXs[i] + 0.1;
    s.addText(sc.src, {
      x, y: cy + 0.15, w: cW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0,
    });
    s.addText(sc.big, {
      x, y: cy + 0.5, w: cW, h: 0.65,
      fontFace: "Arial", fontSize: 34, color: sc.bigColor, margin: 0, valign: "top",
    });
    s.addText(sc.sub, {
      x, y: cy + 1.2, w: cW + 0.05, h: 0.3,
      fontFace: "Arial", fontSize: 10.5, color: C.ink, charSpacing: 3, margin: 0,
    });
    s.addText(sc.body, {
      x, y: cy + 1.55, w: cW, h: 1.2,
      fontFace: "Arial", fontSize: 12, color: C.ink, margin: 0, valign: "top",
    });
  });

  // Bottom: 3 summary columns
  const summaries = [
    { label: "NEAR-TERM",              body: "Unlikely before 2030. Hardware gap is real.", color: C.ink },
    { label: "BASE CASE",              body: [
        { text: "2032–2040 window. Enough time to migrate — ", options: { color: C.ink } },
        { text: "if we start now.", options: { color: C.ink, italic: true } },
      ], color: C.ink, isRich: true },
    { label: "HARVEST-NOW, DECRYPT-LATER", body: "Already happening for long-lived secrets.", color: C.red },
  ];
  const sumY = 5.75;
  const sumW = (W - 1.0) / 3 - 0.2;
  const sumXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];
  summaries.forEach((sm, i) => {
    s.addText(sm.label, {
      x: sumXs[i], y: sumY, w: sumW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0,
    });
    if (sm.isRich) {
      s.addText(sm.body, {
        x: sumXs[i], y: sumY + 0.35, w: sumW, h: 0.7,
        fontFace: "Arial", fontSize: 14, margin: 0, valign: "top",
      });
    } else {
      s.addText(sm.body, {
        x: sumXs[i], y: sumY + 0.35, w: sumW, h: 0.7,
        fontFace: "Arial", fontSize: 14, color: sm.color, margin: 0, valign: "top",
      });
    }
  });
}

// ============================================================
// SLIDE 11 — HARDWARE GAP
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 04  ·  TIMELINE",
    pageNum: "11", tag: "HARDWARE GAP",
  });

  s.addText("FIG. 08 — THE GAP BETWEEN TODAY AND Q-DAY", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("Three orders of magnitude to go.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  // Three big stat columns
  const cy = 2.9;
  const cW = (W - 1.0) / 3 - 0.25;
  const cXs = [0.5, 0.5 + (W - 1.0) / 3, 0.5 + 2 * (W - 1.0) / 3];

  const statBlocks = [
    {
      label: "2026  ·  STATE OF THE ART",
      big: [
        { text: "1.1", options: { color: C.ink, fontSize: 88 } },
        { text: "K",   options: { color: C.ink, fontSize: 48 } },
      ],
      body: [
        { text: "Physical qubits, noisy. IBM Condor, 2023. Error rates ~10", options: { color: C.ink } },
        { text: "⁻³", options: { color: C.ink, superscript: true } },
        { text: ".", options: { color: C.ink } },
      ],
    },
    {
      label: "NEEDED  ·  TO BREAK SECP256K1",
      big: [
        { text: "20", options: { color: C.orange, fontSize: 88 } },
        { text: "M",  options: { color: C.orange, fontSize: 48 } },
      ],
      body: "Physical qubits, error-corrected into ~2,500 logical qubits. Gidney & Ekerå, 2021.",
    },
    {
      label: "CURRENT DOUBLING CADENCE",
      big: [
        { text: "~2",  options: { color: C.ink, fontSize: 88 } },
        { text: "×/yr", options: { color: C.ink, fontSize: 48 } },
      ],
      body: "At that pace: ~14 doublings to close the gap. Hardware only — error correction is the harder problem.",
    },
  ];

  statBlocks.forEach((b, i) => {
    s.addText(b.label, {
      x: cXs[i], y: cy, w: cW + 0.1, h: 0.3,
      fontFace: "Arial", fontSize: 10.5, color: C.muted, charSpacing: 3, margin: 0,
    });
    s.addText(b.big, {
      x: cXs[i], y: cy + 0.4, w: cW, h: 1.3,
      fontFace: "Arial", margin: 0, valign: "top",
    });
    if (Array.isArray(b.body)) {
      s.addText(b.body, {
        x: cXs[i], y: cy + 1.95, w: cW, h: 0.8,
        fontFace: "Arial", fontSize: 13, margin: 0, valign: "top",
      });
    } else {
      s.addText(b.body, {
        x: cXs[i], y: cy + 1.95, w: cW, h: 0.8,
        fontFace: "Arial", fontSize: 13, color: C.ink, margin: 0, valign: "top",
      });
    }
  });

  // divider + bottom footnote
  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 6.05, w: W - 1.0, h: 0, line: { color: C.muted, width: 0.5 },
  });
  s.addText([
    { text: "The worry isn't today's machines. It's that the industry has gone from ", options: { color: C.ink } },
    { text: "53 qubits in 2019", options: { color: C.ink, italic: true } },
    { text: " to ", options: { color: C.ink } },
    { text: "1,121 in 2023", options: { color: C.ink, italic: true } },
    { text: " — and nobody credible thinks the ceiling is near.", options: { color: C.ink } },
  ], {
    x: 0.5, y: 6.25, w: W - 1.0, h: 0.6,
    fontFace: "Arial", fontSize: 13, margin: 0, valign: "top",
  });
}

// ============================================================
// SLIDE 12 — MIGRATION (table)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 05  ·  RESPONSE",
    pageNum: "12", tag: "MIGRATION",
  });

  s.addText("FIG. 09 — WHAT A MIGRATION ACTUALLY LOOKS LIKE", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("The plans exist. None are easy.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  const tbl = [
    [
      { text: "PROPOSAL",       options: { color: C.muted, fontSize: 11, fontFace: "Arial", charSpacing: 4 } },
      { text: "MECHANISM",      options: { color: C.muted, fontSize: 11, fontFace: "Arial", charSpacing: 4 } },
      { text: "WHAT IT CHANGES", options: { color: C.muted, fontSize: 11, fontFace: "Arial", charSpacing: 4 } },
      { text: "THE HARD QUESTION", options: { color: C.muted, fontSize: 11, fontFace: "Arial", charSpacing: 4 } },
    ],
    [
      { text: [
          { text: "BIP-360 ", options: { color: C.ink, fontSize: 16 } },
          { text: "(P2QRH)",  options: { color: C.muted, fontSize: 13 } },
        ], options: { fontFace: "Arial" } },
      { text: "Soft fork adding post-quantum address type", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "New addresses secured by SLH-DSA / ML-DSA (NIST PQC standards)", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: [
          { text: "Users must ", options: { color: C.ink } },
          { text: "voluntarily", options: { color: C.ink, italic: true } },
          { text: " migrate. Lost coins can't.", options: { color: C.ink } },
        ], options: { fontSize: 13, fontFace: "Arial" } },
    ],
    [
      { text: "QRAMP", options: { color: C.ink, fontSize: 16, fontFace: "Arial" } },
      { text: "Hard deadline — quantum-resistant address migration protocol", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "Freezes legacy outputs after block height N", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "Who decides? And does this violate Bitcoin's social contract?", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
    ],
    [
      { text: "Commit-reveal schemes", options: { color: C.ink, fontSize: 16, fontFace: "Arial" } },
      { text: "Two-phase spend that hides pubkey until block confirms", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "Protects active wallets without new signature scheme", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "Doesn't help P2PK or exposed pubkeys. Fee overhead.", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
    ],
    [
      { text: "Do nothing", options: { color: C.ink, fontSize: 16, fontFace: "Arial" } },
      { text: "—", options: { color: C.ink, fontSize: 16, fontFace: "Arial" } },
      { text: "Reuse existing SHA-256 for address hashing; hope for the best", options: { color: C.ink, fontSize: 13, fontFace: "Arial" } },
      { text: "Not a plan. Leaves ~4M BTC on the table.", options: { color: C.red, fontSize: 13, fontFace: "Arial", bold: true } },
    ],
  ];

  s.addTable(tbl, {
    x: 0.5, y: 2.5, w: W - 1.0,
    colW: [2.4, 3.2, 3.4, 3.33],
    rowH: [0.4, 0.75, 0.75, 0.75, 0.75],
    border: [
      { type: "solid", pt: 0.5, color: C.muted },
      { type: "none" },
      { type: "solid", pt: 0.5, color: C.muted },
      { type: "none" },
    ],
    fill: { color: C.cream },
    valign: "top",
  });

  // Footnote
  s.addText("Bitcoin has soft-forked before — SegWit (2017), Taproot (2021). Neither required coordinated action from every holder under time pressure. A PQ migration would.", {
    x: 0.5, y: 6.3, w: W - 1.0, h: 0.7,
    fontFace: "Arial", fontSize: 12, color: C.muted, italic: true,
    margin: 0, valign: "top",
  });
}

// ============================================================
// SLIDE 13 — MARKET IMPLICATIONS (4 cols w/ colored top rules)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 06  ·  MARKET",
    pageNum: "13", tag: "MARKET IMPLICATIONS",
  });

  s.addText("FIG. 10 — FOUR WAYS THIS SHOWS UP IN PRICE", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("The market re-prices well before Q-Day.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 32, color: C.ink,
    margin: 0, valign: "top",
  });

  // 4 columns with colored top rules
  const cy = 3.6;
  const cW = (W - 1.0) / 4 - 0.25;
  const cXs = [0, 1, 2, 3].map(i => 0.5 + i * (W - 1.0) / 4);

  const items = [
    { ruleColor: C.ink,     label: "I  ·  OVERHANG",      title: "Probability discount",   body: "As CRQC probability rises, a quantum-risk premium prices into spot. Volatility widens on every hardware milestone." },
    { ruleColor: C.orange,  label: "II  ·  SUPPLY SHOCK", title: "~4M BTC unfreezes",       body: "Dormant-coin risk. If vulnerable coins can be stolen, \"lost\" becomes \"liquid.\" Effective supply rises ~20%." },
    { ruleColor: C.red,     label: "III  ·  FORK RISK",   title: "Social contract test",    body: "Burn Satoshi's coins or let them be stolen? Either answer fractures consensus and likely splits the chain." },
    { ruleColor: C.green,   label: "IV  ·  THE HEDGE",    title: "PQ crypto equities",      body: "QCI, IonQ, Rigetti, PQShield on the upside. Custody providers that ship PQ signing first capture flows." },
  ];

  items.forEach((it, i) => {
    const x = cXs[i];
    s.addShape(pres.shapes.LINE, {
      x, y: cy, w: cW, h: 0,
      line: { color: it.ruleColor, width: 1.5 },
    });
    s.addText(it.label, {
      x, y: cy + 0.1, w: cW, h: 0.3,
      fontFace: "Arial", fontSize: 11, color: C.muted, charSpacing: 4, margin: 0,
    });
    s.addText(it.title, {
      x, y: cy + 0.5, w: cW, h: 0.9,
      fontFace: "Arial", fontSize: 22, color: C.ink, margin: 0, valign: "top",
    });
    s.addText(it.body, {
      x, y: cy + 1.55, w: cW, h: 1.6,
      fontFace: "Arial", fontSize: 13, color: C.ink, margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 14 — WATCHLIST
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.cream, section: "§ 06  ·  MARKET",
    pageNum: "14", tag: "WATCHLIST",
  });

  s.addText("FIG. 11 — SIGNALS TO TRACK BETWEEN HERE AND Q-DAY", {
    x: 0.5, y: 0.9, w: 11, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.muted,
    charSpacing: 4, margin: 0,
  });

  s.addText("What an investor should actually watch.", {
    x: 0.5, y: 1.4, w: 12, h: 0.8,
    fontFace: "Arial", fontSize: 28, color: C.ink,
    margin: 0, valign: "top",
  });

  // Numbered list
  const items = [
    { n: "01", bold: "Logical qubit count.", body: " The headline number is physical; the meaningful one is error-corrected. Track Google, IBM, Quantinuum announcements." },
    { n: "02", bold: "NIST PQC adoption.",   body: " Treasury, TLS, SSH migrations. Bitcoin follows where broader crypto goes." },
    { n: "03", bold: "BIP activity.",         body: " BIP-360 signalling, review traffic, miner readiness. Social-layer indicators." },
    { n: "04", bold: "Exchange disclosures.", body: " Coinbase, Kraken, Fidelity on quantum risk in 10-Ks is the tell." },
    { n: "05", bold: "Dormant-address movement.", body: " Any spend from a pre-2012 P2PK address is a five-alarm signal." },
  ];
  const startY = 3.7;
  const rowH = 0.55;
  items.forEach((it, i) => {
    const y = startY + i * rowH;
    s.addText(it.n, {
      x: 0.5, y, w: 0.6, h: 0.45,
      fontFace: "Arial", fontSize: 12, color: C.muted, charSpacing: 4, margin: 0, valign: "top",
    });
    s.addText([
      { text: it.bold, options: { color: C.ink, bold: true } },
      { text: it.body, options: { color: C.ink } },
    ], {
      x: 1.15, y, w: W - 1.65, h: 0.55,
      fontFace: "Arial", fontSize: 14, margin: 0, valign: "top",
    });
  });
}

// ============================================================
// SLIDE 15 — CLOSE (btcOrange bg)
// ============================================================
{
  const s = pres.addSlide();
  addFrame(s, {
    bg: C.btcOrange, ink: C.ink, muted: C.ink,
    section: "§ 07  ·  CLOSE",
    pageNum: "15", tag: "—  END  —",
  });

  s.addText("THE TAKEAWAY", {
    x: 0.5, y: 1.3, w: 10, h: 0.35,
    fontFace: "Arial", fontSize: 11, color: C.ink,
    charSpacing: 4, margin: 0,
  });

  // Big final statement
  s.addText([
    { text: "Quantum doesn't end Bitcoin. It ends the assumption that ", options: { color: C.ink } },
    { text: "lost coins stay lost.", options: { color: C.ink, italic: true } },
  ], {
    x: 0.5, y: 1.9, w: 12.3, h: 3.2,
    fontFace: "Arial", fontSize: 52, color: C.ink,
    margin: 0, valign: "top",
  });

  // Outro paragraph
  s.addText("The protocol has time to migrate. Active holders have time to move. Satoshi, the early miners, and the forgotten cold wallets — they do not. The overhang starts getting priced the day a logical qubit count looks serious. That day is closer than it was last year.", {
    x: 0.5, y: 5.4, w: W - 1.0, h: 1.6,
    fontFace: "Arial", fontSize: 15, color: C.ink,
    margin: 0, valign: "top",
  });
}

// ============================================================
// SAVE
// ============================================================
pres.writeFile({ fileName: "Quantum_Computing.pptx" })
  .then(fn => console.log("Wrote:", fn));
