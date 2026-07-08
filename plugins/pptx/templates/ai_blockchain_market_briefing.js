// AI_Agents_Blockchain.pptx replica using pptxgenjs
// Custom layout: 20" x 11.25"

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM_20x11_25", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11_25";
pres.author = "Market Briefing";
pres.title = "AI Agents on Blockchain — Market Briefing";

// =========================================================
// PALETTE
// =========================================================
const C = {
  bg: "F3EFE7",           // cream background
  ink: "0E0E0E",          // near-black
  ink2: "1A1A1A",
  mute: "8A857A",         // muted gray-brown (eyebrow / footer text)
  muteDk: "6E6A60",       // slightly darker muted
  rule: "C9C2B2",         // hairline rule
  ruleLt: "DCD6C7",       // lighter hairline (separators in lists)
  orange: "FF4A1C",       // primary accent
  orangeSoft: "FFE4DA",   // soft accent bg
  white: "FFFFFF",
  black: "000000",
};

const FONT_H = "Helvetica Neue";       // falls back to Arial on most systems
const FONT_B = "Helvetica Neue";
const FONT_MONO = "Courier New";

// =========================================================
// HELPERS — shared chrome (eyebrow, page num, footer)
// =========================================================
function addChrome(slide, opts) {
  const {
    topLeft = "",
    topRight = "",           // e.g. "02 / 12"
    bottomLeft = "",
    bottomRight = "Market Briefing",
    chromeColor = C.mute,
    showRule = true,
    ruleColor = C.rule,
  } = opts || {};

  // Top-left eyebrow
  if (topLeft) {
    slide.addText(topLeft, {
      x: 0.6, y: 0.38, w: 10, h: 0.35,
      fontFace: FONT_H, fontSize: 11, color: chromeColor,
      charSpacing: 2, bold: false, margin: 0,
    });
  }
  // Top-right page indicator
  if (topRight) {
    slide.addText(topRight, {
      x: 17.5, y: 0.38, w: 1.9, h: 0.35,
      fontFace: FONT_H, fontSize: 11, color: chromeColor,
      align: "right", charSpacing: 2, margin: 0,
    });
  }
  // Bottom rule
  if (showRule) {
    slide.addShape(pres.shapes.LINE, {
      x: 0.6, y: 10.45, w: 18.8, h: 0,
      line: { color: ruleColor, width: 0.5 },
    });
  }
  // Bottom-left
  if (bottomLeft) {
    slide.addText(bottomLeft, {
      x: 0.6, y: 10.6, w: 10, h: 0.3,
      fontFace: FONT_B, fontSize: 11, color: chromeColor, margin: 0,
    });
  }
  // Bottom-right
  if (bottomRight) {
    slide.addText(bottomRight, {
      x: 9.4, y: 10.6, w: 10, h: 0.3,
      fontFace: FONT_B, fontSize: 11, color: chromeColor,
      align: "right", margin: 0,
    });
  }
}

// Section tag like "§ 02 — THE THESIS"
function addSectionTag(slide, text, x, y, color = C.muteDk) {
  slide.addText(text, {
    x, y, w: 8, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color, charSpacing: 2, margin: 0,
  });
}

// Build the nested hexagon target SVG (used on slide 1)
function buildHexTargetSVG() {
  const cx = 300, cy = 300;  // SVG center
  const radii = [280, 220, 160, 105, 55];
  const point = (r, deg) => {
    const a = (Math.PI / 180) * deg;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const hexPath = (r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const [x, y] = point(r, -90 + 60 * i);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">`;
  // Nested hexagon outlines
  radii.forEach((r) => {
    svg += `<polygon points="${hexPath(r)}" fill="none" stroke="#6E6A60" stroke-width="0.8"/>`;
  });
  // Vertex dots on outermost hex — alternate orange/black
  for (let i = 0; i < 6; i++) {
    const [px, py] = point(radii[0], -90 + 60 * i);
    const color = i % 2 === 0 ? "#FF4A1C" : "#0E0E0E";
    svg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="9" fill="${color}"/>`;
  }
  // Concentric rings at center + solid orange core
  svg += `<circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="#FF4A1C" stroke-width="1"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="none" stroke="#FF4A1C" stroke-width="1.2"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="12" fill="#FF4A1C"/>`;
  svg += `</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// Build the agent loop diagram SVG (used on slide 6)
function buildAgentLoopSVG() {
  const W = 780, H = 650;
  const cx = W / 2, cy = H / 2 + 10;
  const r = 200;
  // 4 nodes at compass positions
  const nodes = [
    { deg: -90, lines: ["01", "OBSERVE"] },
    { deg:   0, lines: ["02", "DECIDE"]  },
    { deg:  90, lines: ["03", "SIGN TX"] },
    { deg: 180, lines: ["04", "SETTLE"]  },
  ];
  const pt = (deg, rad = r) => {
    const a = (Math.PI / 180) * deg;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const nodeR = 50;
  // Build arcs between consecutive nodes with a small gap for node radius + arrowhead
  const gap = 12; // degrees to subtract on each side for the node
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">`;
  // Define arrowhead marker
  svg += `<defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#0E0E0E"/>
    </marker>
  </defs>`;
  // 4 arcs connecting the nodes clockwise (Observe → Decide → Sign → Settle → Observe)
  const order = [-90, 0, 90, 180, -90 + 360];
  for (let i = 0; i < 4; i++) {
    const startDeg = order[i] + gap;
    const endDeg   = order[i + 1] - gap;
    const [x1, y1] = pt(startDeg);
    const [x2, y2] = pt(endDeg);
    svg += `<path d="M ${x1.toFixed(1)},${y1.toFixed(1)} A ${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="#0E0E0E" stroke-width="1.2" marker-end="url(#arr)"/>`;
  }
  // Node circles + labels
  nodes.forEach((n) => {
    const [nx, ny] = pt(n.deg);
    svg += `<circle cx="${nx}" cy="${ny}" r="${nodeR}" fill="#F3EFE7" stroke="#0E0E0E" stroke-width="1.2"/>`;
    svg += `<text x="${nx}" y="${ny - 6}" text-anchor="middle" font-family="Courier New, monospace" font-size="15" fill="#0E0E0E">${n.lines[0]}</text>`;
    svg += `<text x="${nx}" y="${ny + 14}" text-anchor="middle" font-family="Courier New, monospace" font-size="15" fill="#0E0E0E">${n.lines[1]}</text>`;
  });
  // Center orange "agent LOOP" ellipse
  svg += `<ellipse cx="${cx}" cy="${cy}" rx="78" ry="48" fill="#FF4A1C"/>`;
  svg += `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#FFFFFF">agent</text>`;
  svg += `<text x="${cx}" y="${cy + 22}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="12" letter-spacing="3" fill="#FFFFFF">LOOP</text>`;
  // Corner annotations
  svg += `<text x="30"       y="40"       font-family="Courier New, monospace" font-size="13" fill="#6E6A60">CHAIN STATE · PRICES · NEWS</text>`;
  svg += `<text x="${W - 30}" y="40"       font-family="Courier New, monospace" font-size="13" fill="#6E6A60" text-anchor="end">LLM + POLICY</text>`;
  svg += `<text x="30"       y="${H - 20}" font-family="Courier New, monospace" font-size="13" fill="#6E6A60">FINALITY · PNL · LOGS</text>`;
  svg += `<text x="${W - 30}" y="${H - 20}" font-family="Courier New, monospace" font-size="13" fill="#6E6A60" text-anchor="end">SIGNED &amp; BROADCAST</text>`;
  svg += `</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// Small eyebrow label (uppercase)
function addEyebrow(slide, text, x, y, w, color = C.muteDk, size = 11) {
  slide.addText(text, {
    x, y, w, h: 0.3,
    fontFace: FONT_H, fontSize: size, color, bold: true,
    charSpacing: 2, margin: 0,
  });
}

// =========================================================
// SLIDE 1 — Title
// =========================================================
function buildSlide1() {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Top chrome
  s.addText("A MARKET BRIEFING · APRIL 2026", {
    x: 0.6, y: 0.38, w: 10, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color: C.muteDk,
    charSpacing: 2, margin: 0,
  });
  s.addText("VOL. 01", {
    x: 17.5, y: 0.38, w: 1.9, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color: C.muteDk,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Small circle + "THE AUTONOMOUS ECONOMY"
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 1.55, w: 0.42, h: 0.42,
    fill: { type: "none" }, line: { color: C.muteDk, width: 0.75 },
  });
  s.addText("THE AUTONOMOUS ECONOMY", {
    x: 1.2, y: 1.58, w: 8, h: 0.36,
    fontFace: FONT_H, fontSize: 13, color: C.ink, charSpacing: 3, margin: 0,
  });

  // Headline: "AI Agents on" + "Blockchain." (orange italic)
  s.addText("AI Agents on", {
    x: 0.55, y: 2.35, w: 13, h: 1.9,
    fontFace: FONT_H, fontSize: 115, bold: true, color: C.ink,
    margin: 0, valign: "top",
  });
  s.addText([
    { text: "Blockchain", options: { italic: true, color: C.orange } },
    { text: ".", options: { color: C.ink } },
  ], {
    x: 0.55, y: 3.95, w: 13, h: 1.9,
    fontFace: FONT_H, fontSize: 115, bold: true,
    margin: 0, valign: "top",
  });

  // Subtitle
  s.addText(
    "How software that thinks, decides, and transacts on its own is finding its settlement\nlayer on-chain — and why executives should care now.",
    {
      x: 0.6, y: 5.9, w: 11.5, h: 1.2,
      fontFace: FONT_B, fontSize: 18, color: C.ink2, margin: 0,
    }
  );

  // Right side hexagonal target graphic — rendered as inline SVG image
  s.addImage({
    data: buildHexTargetSVG(),
    x: 12.7, y: 1.3, w: 6.5, h: 6.5,
  });

  // Footer hairline + 4-column meta
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 8.45, w: 18.8, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const meta = [
    { label: "TOPIC",   value: "MARKET LANDSCAPE" },
    { label: "HORIZON", value: "2026 — 2030" },
    { label: "LENGTH",  value: "10 MINUTES" },
    { label: "FORMAT",  value: "EXECUTIVE BRIEFING" },
  ];
  const colW = 4.5, colX0 = 0.6;
  meta.forEach((m, i) => {
    const x = colX0 + i * colW;
    s.addText(m.label, {
      x, y: 8.7, w: colW, h: 0.35,
      fontFace: FONT_H, fontSize: 11, color: C.muteDk,
      charSpacing: 2, margin: 0,
    });
    s.addText(m.value, {
      x, y: 9.05, w: colW, h: 0.4,
      fontFace: FONT_H, fontSize: 14, color: C.ink, bold: true,
      charSpacing: 1, margin: 0,
    });
  });

  // Bottom row
  s.addText("Prepared for Executive Audiences", {
    x: 0.6, y: 10.6, w: 10, h: 0.3,
    fontFace: FONT_B, fontSize: 11, color: C.muteDk, margin: 0,
  });
  s.addText("01 / 12", {
    x: 17.5, y: 10.6, w: 1.9, h: 0.3,
    fontFace: FONT_H, fontSize: 11, color: C.muteDk,
    align: "right", charSpacing: 2, margin: 0,
  });
}

// =========================================================
// SLIDE 2 — The Thesis
// =========================================================
function buildSlide2() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "THE THESIS", topRight: "02 / 12",
    bottomLeft: "AI Agents on Blockchain",
  });
  addSectionTag(s, "§ 02 — THE THESIS", 0.6, 1.25);

  // LEFT — dark quote card
  const cardX = 0.6, cardY = 1.95, cardW = 10.4, cardH = 7.85;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  // Big orange opening quote
  s.addText("“", {
    x: cardX + 0.4, y: cardY + 0.25, w: 2, h: 1.5,
    fontFace: FONT_H, fontSize: 96, bold: true, color: C.orange, margin: 0,
  });
  // Quote body
  s.addText(
    [
      { text: "The next generation of software does not ask for permission. It ", options: { color: C.white } },
      { text: "holds a wallet,", options: { italic: true, color: C.orange } },
      { text: " earns revenue, pays for resources, and settles with other agents — and it needs a ledger built for machines, not humans.", options: { color: C.white } },
    ],
    {
      x: cardX + 0.55, y: cardY + 1.85, w: cardW - 1.1, h: 4.9,
      fontFace: FONT_H, fontSize: 33, bold: false, margin: 0, valign: "top",
    }
  );
  // Bottom rule inside card + footer labels
  s.addShape(pres.shapes.LINE, {
    x: cardX + 0.55, y: cardY + cardH - 0.95, w: cardW - 1.1, h: 0,
    line: { color: "3A3A3A", width: 0.5 },
  });
  s.addText("EXECUTIVE BRIEF · 2026", {
    x: cardX + 0.55, y: cardY + cardH - 0.75, w: 5, h: 0.35,
    fontFace: FONT_H, fontSize: 11, color: C.mute, charSpacing: 2, margin: 0,
  });
  s.addText("THESIS 01 / 01", {
    x: cardX + cardW - 5.55, y: cardY + cardH - 0.75, w: 5, h: 0.35,
    fontFace: FONT_H, fontSize: 11, color: C.mute, charSpacing: 2, align: "right", margin: 0,
  });

  // RIGHT — "THE THREE SHIFTS BEHIND IT"
  const rx = 11.8;
  addEyebrow(s, "THE THREE SHIFTS BEHIND IT", rx, 1.95, 7.5, C.muteDk, 11);
  s.addShape(pres.shapes.LINE, {
    x: rx, y: 2.35, w: 7.5, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  const shifts = [
    { n: "01 · AUTONOMY",   body: "Agents act without a human in the loop.", sw: C.orange, filled: true },
    { n: "02 · SETTLEMENT", body: "Stablecoins become the agent's unit of account.", sw: C.ink, filled: true },
    { n: "03 · IDENTITY",   body: "", bodyRich: [
        { text: "A wallet address ", options: { color: C.ink } },
        { text: "is", options: { italic: true, color: C.orange } },
        { text: " the agent — auditable, reputable, portable.", options: { color: C.ink } },
      ], sw: C.ink, filled: false },
  ];
  shifts.forEach((sh, i) => {
    const y = 2.7 + i * 1.6;
    // swatch
    if (sh.filled) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: rx, y: y + 0.02, w: 0.32, h: 0.32,
        fill: { color: sh.sw }, line: { color: sh.sw, width: 0 },
      });
    } else {
      s.addShape(pres.shapes.RECTANGLE, {
        x: rx, y: y + 0.02, w: 0.32, h: 0.32,
        fill: { type: "none" }, line: { color: C.ink, width: 1 },
      });
    }
    // index/label
    s.addText(sh.n, {
      x: rx + 0.55, y: y, w: 6, h: 0.32,
      fontFace: FONT_H, fontSize: 11, color: C.muteDk, charSpacing: 2, margin: 0,
    });
    // body
    if (sh.bodyRich) {
      s.addText(sh.bodyRich, {
        x: rx + 0.55, y: y + 0.36, w: 6.8, h: 0.8,
        fontFace: FONT_H, fontSize: 18, margin: 0, valign: "top",
      });
    } else {
      s.addText(sh.body, {
        x: rx + 0.55, y: y + 0.36, w: 6.8, h: 0.8,
        fontFace: FONT_H, fontSize: 18, color: C.ink, margin: 0, valign: "top",
      });
    }
    // separator under each
    s.addShape(pres.shapes.LINE, {
      x: rx, y: y + 1.3, w: 7.5, h: 0,
      line: { color: C.ruleLt, width: 0.5 },
    });
  });

  // Bottom caption
  s.addText("ORANGE MARKS AGENT ACTION THROUGHOUT THIS DECK.", {
    x: rx, y: 9.7, w: 7.5, h: 0.35,
    fontFace: FONT_H, fontSize: 11, color: C.muteDk, charSpacing: 2, margin: 0,
  });
}

// =========================================================
// SLIDE 3 — Why the two converge
// =========================================================
function buildSlide3() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "WHY THE TWO CONVERGE", topRight: "03 / 12",
    bottomLeft: "AI Agents on Blockchain",
  });
  addSectionTag(s, "§ 03 — WHY AI + BLOCKCHAIN", 0.6, 1.25);

  // Headline
  s.addText("Two technologies, one missing piece each solves for the other.", {
    x: 0.55, y: 1.75, w: 18.9, h: 2.2,
    fontFace: FONT_H, fontSize: 54, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  // Two columns
  const colY = 4.3;
  const leftX = 0.6, leftW = 8.2;
  const rightX = 11.2, rightW = 8.2;

  // LEFT column
  addEyebrow(s, "AI AGENTS NEED →", leftX, colY, leftW, C.muteDk, 13);
  s.addText("A substrate built for autonomous machines.", {
    x: leftX, y: colY + 0.45, w: leftW, h: 1.3,
    fontFace: FONT_H, fontSize: 30, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  const leftItems = [
    "Payments that don't require a human to swipe a card",
    "Verifiable identity & provenance of actions",
    "Access to compute, data and services on demand",
    "An auditable record of every decision made",
  ];
  leftItems.forEach((item, i) => {
    const y = colY + 1.85 + i * 0.75;
    s.addShape(pres.shapes.LINE, {
      x: leftX, y: y - 0.05, w: leftW, h: 0,
      line: { color: C.ruleLt, width: 0.5 },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: leftX, y: y + 0.1, w: 0.5, h: 0.5,
      fontFace: FONT_H, fontSize: 11, color: C.orange, margin: 0,
    });
    s.addText(item, {
      x: leftX + 0.65, y: y + 0.08, w: leftW - 0.7, h: 0.5,
      fontFace: FONT_H, fontSize: 17, color: C.ink, margin: 0,
    });
  });
  // closing line
  s.addShape(pres.shapes.LINE, {
    x: leftX, y: colY + 1.85 + 4 * 0.75 - 0.05, w: leftW, h: 0,
    line: { color: C.ruleLt, width: 0.5 },
  });

  // CENTER plus-circle
  const plusCx = 10, plusCy = colY + 1.4;
  // soft glow
  s.addShape(pres.shapes.OVAL, {
    x: plusCx - 0.9, y: plusCy - 0.9, w: 1.8, h: 1.8,
    fill: { color: C.orangeSoft }, line: { color: C.orangeSoft, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: plusCx - 0.6, y: plusCy - 0.6, w: 1.2, h: 1.2,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("+", {
    x: plusCx - 0.6, y: plusCy - 0.68, w: 1.2, h: 1.2,
    fontFace: FONT_H, fontSize: 46, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  // RIGHT column
  addEyebrow(s, "BLOCKCHAINS NEED →", rightX, colY, rightW, C.muteDk, 13);
  s.addText("Users that scale beyond humans.", {
    x: rightX, y: colY + 0.45, w: rightW, h: 1.3,
    fontFace: FONT_H, fontSize: 30, bold: true, color: C.ink, margin: 0, valign: "top",
  });
  const rightItems = [
    "Economic activity 24/7, not just when humans trade",
    "Smart contracts that adapt to real-world context",
    "Demand for blockspace, storage and settlement",
    "A killer-app narrative post-speculation",
  ];
  rightItems.forEach((item, i) => {
    const y = colY + 1.85 + i * 0.75;
    s.addShape(pres.shapes.LINE, {
      x: rightX, y: y - 0.05, w: rightW, h: 0,
      line: { color: C.ruleLt, width: 0.5 },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: rightX, y: y + 0.1, w: 0.5, h: 0.5,
      fontFace: FONT_H, fontSize: 11, color: C.orange, margin: 0,
    });
    s.addText(item, {
      x: rightX + 0.65, y: y + 0.08, w: rightW - 0.7, h: 0.5,
      fontFace: FONT_H, fontSize: 17, color: C.ink, margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: rightX, y: colY + 1.85 + 4 * 0.75 - 0.05, w: rightW, h: 0,
    line: { color: C.ruleLt, width: 0.5 },
  });
}

// =========================================================
// SLIDE 4 — Market size
// =========================================================
function buildSlide4() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "MARKET SIZE & TRAJECTORY", topRight: "04 / 12",
    bottomLeft: "Sources: Gartner, Grand View, Messari · Analyst estimates",
  });
  addSectionTag(s, "§ 04 — MARKET", 0.6, 1.25);

  // Giant $47B stat — split runs for orange italic "47"
  s.addText(
    [
      { text: "$",  options: { color: C.ink, bold: true } },
      { text: "47", options: { color: C.orange, italic: true, bold: true } },
      { text: "B",  options: { color: C.ink, bold: true } },
    ],
    {
      x: 0.5, y: 1.9, w: 10, h: 3.5,
      fontFace: FONT_H, fontSize: 220, margin: 0, valign: "top",
    }
  );
  s.addText("PROJECTED ON-CHAIN AGENT ECONOMY · 2030", {
    x: 0.6, y: 5.35, w: 10, h: 0.4,
    fontFace: FONT_H, fontSize: 13, color: C.muteDk, charSpacing: 2, margin: 0,
  });

  // Bar chart — simple native column chart
  const years = ["'24", "'25", "'26", "'27", "'28", "'29", "'30"];
  const values = [3, 6, 11, 19, 29, 40, 47];
  // Build colors per point — last two orange
  const pointColors = ["0E0E0E","0E0E0E","0E0E0E","0E0E0E","0E0E0E","FF4A1C","FF4A1C"];
  s.addChart(pres.charts.BAR, [
    { name: "Projection", labels: years, values, },
  ], {
    x: 0.55, y: 6.0, w: 9.2, h: 3.6,
    barDir: "col",
    chartColors: pointColors,
    chartColorsOpacity: 100,
    chartArea: { fill: { color: C.bg } },
    plotArea: { fill: { color: C.bg } },
    catAxisLabelColor: C.muteDk, catAxisLabelFontFace: FONT_H, catAxisLabelFontSize: 11,
    valAxisHidden: true,
    valGridLine: { color: C.ruleLt, style: "dash", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: false, showValue: false,
    barGapWidthPct: 45,
  });

  // RIGHT — 4 stat rows
  const rx = 10.9, rw = 8.55;
  const rows = [
    { big: "68%",  body: "Enterprises piloting autonomous\nagent workflows by end of 2026", source: "GARTNER, EST." },
    { big: "3.4×", body: "CAGR of on-chain agent transaction\nvolume, 2024 — 2027",             source: "ANALYST COMPOSITE" },
    { big: "$12B", body: "VC capital deployed into agent +\ncrypto infra since 2023",           source: "MESSARI / PITCHBOOK" },
    { big: "1.2M", body: "Autonomous wallets observed\nacross major L1/L2 networks, Q1 2026",    source: "DUNE / NANSEN" },
  ];
  const rowH = 1.85;
  const topY = 1.95;
  rows.forEach((r, i) => {
    const y = topY + i * rowH;
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: rx, y, w: rw, h: 0, line: { color: C.ruleLt, width: 0.5 },
    });
    // big number (italic orange)
    s.addText(r.big, {
      x: rx + 0.1, y: y + 0.3, w: 2.4, h: 1.2,
      fontFace: FONT_H, fontSize: 54, italic: true, bold: true, color: C.orange,
      margin: 0, valign: "top",
    });
    // body
    s.addText(r.body, {
      x: rx + 2.75, y: y + 0.4, w: 4.2, h: 1.3,
      fontFace: FONT_H, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    });
    // source tag
    s.addText(r.source, {
      x: rx + rw - 2.1, y: y + 0.45, w: 2.0, h: 0.35,
      fontFace: FONT_H, fontSize: 10, color: C.muteDk, charSpacing: 2,
      align: "right", margin: 0,
    });
  });
  // closing rule
  s.addShape(pres.shapes.LINE, {
    x: rx, y: topY + rows.length * rowH, w: rw, h: 0,
    line: { color: C.ruleLt, width: 0.5 },
  });
}

// =========================================================
// SLIDE 5 — Section II (full-bleed orange divider)
// =========================================================
function buildSlide5() {
  const s = pres.addSlide();
  s.background = { color: C.orange };

  // Chrome on orange — use cream text
  s.addText("SECTION II", {
    x: 0.6, y: 0.38, w: 10, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color: C.bg, charSpacing: 2, margin: 0,
  });
  s.addText("05 / 12", {
    x: 17.5, y: 0.38, w: 1.9, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color: C.bg,
    align: "right", charSpacing: 2, margin: 0,
  });

  // Overline
  s.addText("PART II · USE CASES", {
    x: 0.6, y: 1.9, w: 12, h: 0.4,
    fontFace: FONT_H, fontSize: 14, color: C.bg, charSpacing: 3, margin: 0,
  });

  // Giant headline
  s.addText(
    "Three beachheads where autonomous agents are already live on-chain.",
    {
      x: 0.55, y: 2.5, w: 18.9, h: 5.5,
      fontFace: FONT_H, fontSize: 76, bold: true, color: C.bg,
      margin: 0, valign: "top",
    }
  );

  // Subtitle
  s.addText(
    "DeFi, machine-to-machine payments, and decentralized compute — the verticals with\nenough liquidity, standardization and settlement demand to support agent-native\nproducts today.",
    {
      x: 0.6, y: 8.1, w: 13, h: 2,
      fontFace: FONT_B, fontSize: 18, color: C.bg, margin: 0,
    }
  );

  // Footer
  s.addText("Where Agents Meet Chains", {
    x: 0.6, y: 10.6, w: 10, h: 0.3,
    fontFace: FONT_B, fontSize: 11, color: C.bg, margin: 0,
  });
  s.addText("Market Briefing", {
    x: 9.4, y: 10.6, w: 10, h: 0.3,
    fontFace: FONT_B, fontSize: 11, color: C.bg, align: "right", margin: 0,
  });
}

// =========================================================
// SLIDE 6 — Autonomous DeFi Agents
// =========================================================
function buildSlide6() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "AUTONOMOUS DEFI AGENTS", topRight: "06 / 12",
    bottomLeft: "Beachhead 01 of 03",
  });
  addSectionTag(s, "§ 06 — BEACHHEAD I", 0.6, 1.25);

  // Headline — reduce size to prevent wrapping to 3 lines, leave room for diagram
  s.addText("Agents are now the dominant counterparty in DeFi.", {
    x: 0.55, y: 1.7, w: 10.2, h: 2.4,
    fontFace: FONT_H, fontSize: 42, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  // Body paragraphs (left)
  const bodyX = 0.6, bodyW = 8.8;
  s.addText(
    "Trading bots, yield optimizers and liquidation agents already execute the majority of orderflow on major DEXs. The new generation is model-driven — LLMs reasoning over market state, news feeds and on-chain data before signing a transaction.",
    {
      x: bodyX, y: 4.4, w: bodyW, h: 2.2,
      fontFace: FONT_B, fontSize: 17, color: C.ink, margin: 0, valign: "top",
      paraSpaceAfter: 14,
    }
  );
  s.addText(
    "For executives: this is the first trillion-dollar market where software agents are the primary customer, not humans.",
    {
      x: bodyX, y: 6.7, w: bodyW, h: 1.4,
      fontFace: FONT_B, fontSize: 17, color: C.ink, margin: 0, valign: "top",
    }
  );

  // Tag chips — two rows (4 on top, 1 on bottom). Fixed width so they align.
  const chips = ["MEV searchers", "Yield routers", "Liquidation keepers", "LP managers", "Treasury agents"];
  const chipW = 2.0, chipH = 0.45, chipGap = 0.18;
  const chipY1 = 8.35, chipY2 = chipY1 + chipH + 0.18;
  chips.forEach((label, i) => {
    const row = i < 4 ? 0 : 1;
    const col = i < 4 ? i : 0;
    const cx = bodyX + col * (chipW + chipGap);
    const cy = row === 0 ? chipY1 : chipY2;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: chipW, h: chipH,
      fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
    });
    s.addText(label, {
      x: cx, y: cy, w: chipW, h: chipH,
      fontFace: FONT_H, fontSize: 11, color: C.ink,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // RIGHT — agent loop diagram (rendered as SVG for correct curves/arrows)
  s.addImage({
    data: buildAgentLoopSVG(),
    x: 11.5, y: 3.4, w: 7.8, h: 6.5,
  });
}

// =========================================================
// SLIDE 7 — On-chain Agent Identity
// =========================================================
function buildSlide7() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "ON-CHAIN AGENT IDENTITY", topRight: "07 / 12",
    bottomLeft: "Beachhead 02 of 03",
  });
  addSectionTag(s, "§ 07 — BEACHHEAD II", 0.6, 1.25);

  s.addText("Every agent needs a wallet, a reputation, and a rulebook.", {
    x: 0.55, y: 1.7, w: 18.9, h: 2.2,
    fontFace: FONT_H, fontSize: 50, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  // Two bordered cards
  const cardY = 4.3, cardH = 5.6;
  const c1X = 0.6,  c1W = 9.0;
  const c2X = 10.4, c2W = 9.0;

  // CARD 1 — Wallet as primary identity
  s.addShape(pres.shapes.RECTANGLE, {
    x: c1X, y: cardY, w: c1W, h: cardH,
    fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
  });
  addEyebrow(s, "01 · WALLET AS PRIMARY IDENTITY", c1X + 0.5, cardY + 0.5, c1W - 1, C.muteDk, 11);
  s.addText(
    [
      { text: "The address ", options: { color: C.ink } },
      { text: "is", options: { italic: true, color: C.orange } },
      { text: " the agent.", options: { color: C.ink } },
    ],
    {
      x: c1X + 0.5, y: cardY + 0.9, w: c1W - 1, h: 0.9,
      fontFace: FONT_H, fontSize: 30, bold: true, margin: 0, valign: "top",
    }
  );
  s.addText(
    "Smart accounts (ERC-4337, EIP-7702) let an agent custody assets, sign intents, and enforce spending policy in contract code — not config files.",
    {
      x: c1X + 0.5, y: cardY + 2.0, w: c1W - 1, h: 1.1,
      fontFace: FONT_B, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    }
  );
  // Dark code block
  const codeX = c1X + 0.5, codeY = cardY + 3.3, codeW = c1W - 1, codeH = 2.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: codeX, y: codeY, w: codeW, h: codeH,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  s.addText(
    [
      { text: "{",                                            options: { color: "AAAAAA",  breakLine: true } },
      { text: "  \"agent\": \"planner-v3\",",                 options: { color: C.orange,  breakLine: true } },
      { text: "  \"address\": \"0x7Fa2…9e21\",",              options: { color: "E0E0E0",  breakLine: true } },
      { text: "  \"daily_cap\": \"1200 USDC\",",              options: { color: "E0E0E0",  breakLine: true } },
      { text: "  \"allowed_tools\": [\"dex\", \"data\"]",     options: { color: "E0E0E0",  breakLine: true } },
      { text: "}",                                            options: { color: "AAAAAA" } },
    ],
    {
      x: codeX + 0.3, y: codeY + 0.2, w: codeW - 0.4, h: codeH - 0.3,
      fontFace: FONT_MONO, fontSize: 12, margin: 0, valign: "top",
    }
  );

  // CARD 2 — On-chain reputation
  s.addShape(pres.shapes.RECTANGLE, {
    x: c2X, y: cardY, w: c2W, h: cardH,
    fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
  });
  addEyebrow(s, "02 · ON-CHAIN REPUTATION", c2X + 0.5, cardY + 0.5, c2W - 1, C.muteDk, 11);
  s.addText("Trust becomes a public record.", {
    x: c2X + 0.5, y: cardY + 0.9, w: c2W - 1, h: 0.9,
    fontFace: FONT_H, fontSize: 30, bold: true, color: C.ink, margin: 0, valign: "top",
  });
  s.addText(
    "Every signed action is auditable. Attestation frameworks (EAS, verifiable credentials) let counterparties price risk on an agent's track record — not on a vendor's promise.",
    {
      x: c2X + 0.5, y: cardY + 2.0, w: c2W - 1, h: 1.2,
      fontFace: FONT_B, fontSize: 15, color: C.ink, margin: 0, valign: "top",
    }
  );

  // Reputation stat rows
  const stats = [
    { k: "Tx count",     v: "14,832" },
    { k: "Dispute rate", v: "0.02%" },
    { k: "Attestations", v: "47 issuers" },
    { k: "Days active",  v: "312" },
  ];
  const statTop = cardY + 3.4;
  stats.forEach((st, i) => {
    const y = statTop + i * 0.52;
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: c2X + 0.5, y, w: c2W - 1, h: 0, line: { color: C.ruleLt, width: 0.5 },
    });
    s.addText(st.k, {
      x: c2X + 0.5, y: y + 0.08, w: 4, h: 0.4,
      fontFace: FONT_B, fontSize: 15, color: C.ink, margin: 0,
    });
    s.addText(st.v, {
      x: c2X + c2W - 4.5, y: y + 0.08, w: 4, h: 0.4,
      fontFace: FONT_H, fontSize: 15, color: C.orange, align: "right", margin: 0,
    });
  });
  // final rule
  s.addShape(pres.shapes.LINE, {
    x: c2X + 0.5, y: statTop + stats.length * 0.52, w: c2W - 1, h: 0,
    line: { color: C.ruleLt, width: 0.5 },
  });
}

// =========================================================
// SLIDE 8 — Agent-to-agent payments (x402)
// =========================================================
function buildSlide8() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "AGENT-TO-AGENT PAYMENTS", topRight: "08 / 12",
    bottomLeft: "Beachhead 03 of 03",
  });
  addSectionTag(s, "§ 08 — BEACHHEAD III", 0.6, 1.25);

  // Two-tone headline
  s.addText(
    [
      { text: "HTTP 402, revived. ", options: { color: C.ink } },
      { text: "A payment handshake for machines.", options: { color: C.muteDk } },
    ],
    {
      x: 0.55, y: 1.7, w: 18.9, h: 2.4,
      fontFace: FONT_H, fontSize: 52, bold: true, margin: 0, valign: "top",
    }
  );

  // LEFT — sequence diagram card
  const dX = 0.6, dY = 4.4, dW = 9.0, dH = 5.5;
  s.addShape(pres.shapes.RECTANGLE, {
    x: dX, y: dY, w: dW, h: dH,
    fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
  });
  // Column headers
  const colAX = dX + 1.8, colBX = dX + dW - 1.8;
  s.addText("AGENT A", {
    x: colAX - 1, y: dY + 0.35, w: 2, h: 0.4,
    fontFace: FONT_MONO, fontSize: 13, color: C.ink, bold: true,
    align: "center", margin: 0,
  });
  s.addText("SERVICE", {
    x: colBX - 1, y: dY + 0.35, w: 2, h: 0.4,
    fontFace: FONT_MONO, fontSize: 13, color: C.ink, bold: true,
    align: "center", margin: 0,
  });
  // Vertical dashed lifelines
  s.addShape(pres.shapes.LINE, {
    x: colAX, y: dY + 0.9, w: 0, h: dH - 1.3,
    line: { color: C.muteDk, width: 0.5, dashType: "dash" },
  });
  s.addShape(pres.shapes.LINE, {
    x: colBX, y: dY + 0.9, w: 0, h: dH - 1.3,
    line: { color: C.muteDk, width: 0.5, dashType: "dash" },
  });

  // Sequence arrows (4 messages)
  const msgs = [
    { label: "GET /inference",                  dir: "right", color: C.ink,    dashed: false },
    { label: "402 Payment Required · 0.003 USDC", dir: "left",  color: C.orange, dashed: false },
    { label: "signed micropayment (x402)",       dir: "right", color: C.ink,    dashed: false },
    { label: "200 OK · payload + receipt",       dir: "left",  color: C.ink,    dashed: false },
    { label: "settlement batched on-chain",      dir: "right", color: C.muteDk, dashed: true  },
  ];
  const msgTop = dY + 1.25;
  const msgStep = 0.75;
  msgs.forEach((m, i) => {
    const y = msgTop + i * msgStep;
    // Arrow line
    s.addShape(pres.shapes.LINE, {
      x: colAX, y, w: colBX - colAX, h: 0,
      line: { color: m.color, width: m.dashed ? 0.5 : 1, dashType: m.dashed ? "dash" : "solid" },
    });
    // Arrowhead triangle (simple using small line segments)
    const headX = m.dir === "right" ? colBX : colAX;
    const headSign = m.dir === "right" ? -1 : 1;
    s.addShape(pres.shapes.LINE, {
      x: headX + headSign * 0.15, y: y - 0.08,
      w: -headSign * 0.15, h: 0.08,
      line: { color: m.color, width: 1 },
    });
    s.addShape(pres.shapes.LINE, {
      x: headX + headSign * 0.15, y: y,
      w: -headSign * 0.15, h: 0.08,
      line: { color: m.color, width: 1 },
      flipV: true,
    });
    // Label above line
    s.addText(m.label, {
      x: colAX, y: y - 0.45, w: colBX - colAX, h: 0.35,
      fontFace: FONT_MONO, fontSize: 11, color: m.color,
      align: "center", margin: 0,
    });
  });

  // RIGHT — explainer
  const rX = 10.4, rW = 9.0;
  addEyebrow(s, "WHAT X402 ACTUALLY IS", rX, 4.4, rW, C.muteDk, 12);
  s.addText("Stablecoins turn HTTP into a billable protocol.", {
    x: rX, y: 4.75, w: rW, h: 1.5,
    fontFace: FONT_H, fontSize: 30, bold: true, color: C.ink, margin: 0, valign: "top",
  });
  s.addText(
    "An agent hits an endpoint. The server replies with 402 Payment Required and a quote. The agent signs a stablecoin payment, retries, and gets the response — in under a second, for fractions of a cent.",
    {
      x: rX, y: 6.2, w: rW, h: 1.5,
      fontFace: FONT_B, fontSize: 16, color: C.ink, margin: 0, valign: "top",
    }
  );

  // Four numbered lines
  const items = [
    "No accounts, no API keys, no invoices",
    "Per-call pricing — pay only for what's used",
    "Works across providers, networks, and models",
    "Settlement batched — no per-call gas overhead",
  ];
  const itTop = 7.85;
  items.forEach((it, i) => {
    const y = itTop + i * 0.55;
    s.addShape(pres.shapes.LINE, {
      x: rX, y: y - 0.05, w: rW, h: 0, line: { color: C.ruleLt, width: 0.5 },
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: rX, y: y + 0.05, w: 0.5, h: 0.4,
      fontFace: FONT_H, fontSize: 11, color: C.orange, margin: 0,
    });
    s.addText(it, {
      x: rX + 0.65, y: y + 0.04, w: rW - 0.7, h: 0.4,
      fontFace: FONT_H, fontSize: 14, color: C.ink, margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: rX, y: itTop + items.length * 0.55 - 0.05, w: rW, h: 0,
    line: { color: C.ruleLt, width: 0.5 },
  });
}

// =========================================================
// SLIDE 9 — Decentralized Compute
// =========================================================
function buildSlide9() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "DECENTRALIZED COMPUTE", topRight: "09 / 12",
    bottomLeft: "Infrastructure Layer",
  });
  addSectionTag(s, "§ 09 — INFRASTRUCTURE", 0.6, 1.25);

  s.addText("A spot market for GPUs, inference, and training.", {
    x: 0.55, y: 1.7, w: 18.9, h: 1.4,
    fontFace: FONT_H, fontSize: 50, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  // LEFT — paragraph + 3 stats
  const lX = 0.6, lW = 8.6;
  s.addText(
    "Agents need inference at the edge of latency and cost. Decentralized compute networks let them bid for GPU time, verify outputs cryptographically, and fail over across providers — without procurement cycles.",
    {
      x: lX, y: 3.9, w: lW, h: 2.1,
      fontFace: FONT_B, fontSize: 18, color: C.ink, margin: 0, valign: "top",
    }
  );

  // 3-stat row framed by horizontal rules
  const sTop = 6.4, sBot = 8.4;
  s.addShape(pres.shapes.LINE, {
    x: lX, y: sTop, w: lW, h: 0, line: { color: C.ink, width: 0.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: lX, y: sBot, w: lW, h: 0, line: { color: C.ink, width: 0.5 },
  });
  const miniStats = [
    { big: "~40%", label: "COST SAVINGS VS.\nHYPERSCALER ON-DEMAND\nPRICING" },
    { big: "11",   label: "NETWORKS WITH LIVE GPU OR\nINFERENCE MARKETPLACES" },
    { big: "2.4M", label: "GPUS PLEDGED ACROSS DEPIN\nNETWORKS, Q1 2026" },
  ];
  const mW = lW / 3;
  miniStats.forEach((m, i) => {
    const x = lX + i * mW;
    // vertical separators between
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x, y: sTop + 0.1, w: 0, h: sBot - sTop - 0.2,
        line: { color: C.ruleLt, width: 0.5 },
      });
    }
    s.addText(m.big, {
      x: x + 0.15, y: sTop + 0.2, w: mW - 0.2, h: 0.9,
      fontFace: FONT_H, fontSize: 40, italic: true, bold: true, color: C.orange,
      margin: 0, valign: "top",
    });
    s.addText(m.label, {
      x: x + 0.15, y: sTop + 1.15, w: mW - 0.2, h: 1.0,
      fontFace: FONT_H, fontSize: 10, color: C.muteDk, charSpacing: 1.5, margin: 0, valign: "top",
    });
  });

  // RIGHT — 3 layer cards
  const rX = 10.4, rW = 9.0;
  const cardY0 = 3.9, cardH = 1.95, cardGap = 0.15;
  const layers = [
    { tag: "Layer 01 · Compute",      title: "Raw GPU & inference",
      body: "Render, Akash, io.net, Aethir — GPU capacity auctioned to the highest-bidding agent job." },
    { tag: "Layer 02 · Data",         title: "Models & datasets",
      body: "Ocean, Bittensor subnets, Filecoin — tokenized access to models and training data priced per query." },
    { tag: "Layer 03 · Verification", title: "Proof of inference",
      body: "zkML and TEE attestations let an agent verify a model really ran — before paying for the answer." },
  ];
  layers.forEach((l, i) => {
    const y = cardY0 + i * (cardH + cardGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: rX, y, w: rW, h: cardH,
      fill: { color: C.bg }, line: { color: C.rule, width: 0.75 },
    });
    s.addText(l.tag, {
      x: rX + 0.45, y: y + 0.25, w: rW - 0.9, h: 0.35,
      fontFace: FONT_H, fontSize: 11, color: C.muteDk, charSpacing: 2, margin: 0,
    });
    s.addText(l.title, {
      x: rX + 0.45, y: y + 0.6, w: rW - 0.9, h: 0.55,
      fontFace: FONT_H, fontSize: 22, bold: true, color: C.ink, margin: 0,
    });
    s.addText(l.body, {
      x: rX + 0.45, y: y + 1.2, w: rW - 0.9, h: 0.7,
      fontFace: FONT_B, fontSize: 14, color: C.ink, margin: 0, valign: "top",
    });
  });
}

// =========================================================
// SLIDE 10 — Risk table
// =========================================================
function buildSlide10() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "THE TRUST & SECURITY STACK", topRight: "10 / 12",
    bottomLeft: "Executive Risk Review",
  });
  addSectionTag(s, "§ 10 — RISK", 0.6, 1.25);

  // Two-tone headline
  s.addText(
    [
      { text: "Autonomy cuts both ways. ",             options: { color: C.ink } },
      { text: "The four risks that matter at the board level.", options: { color: C.muteDk } },
    ],
    {
      x: 0.55, y: 1.7, w: 18.9, h: 2.3,
      fontFace: FONT_H, fontSize: 46, bold: true, margin: 0, valign: "top",
    }
  );

  // Table: RISK | SEVERITY | WHAT GOES WRONG | MITIGATION
  const tX = 0.55, tW = 18.9;
  const colW = [4.4, 2.4, 8.0, 4.1];   // sums to 18.9
  const cx = [
    tX,
    tX + colW[0],
    tX + colW[0] + colW[1],
    tX + colW[0] + colW[1] + colW[2],
  ];
  const hdrY = 4.4;
  const headers = ["RISK", "SEVERITY", "WHAT ACTUALLY GOES WRONG", "MITIGATION STACK"];
  headers.forEach((h, i) => {
    s.addText(h, {
      x: cx[i] + 0.1, y: hdrY, w: colW[i] - 0.2, h: 0.4,
      fontFace: FONT_H, fontSize: 11, color: C.muteDk, charSpacing: 2, margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: tX, y: hdrY + 0.5, w: tW, h: 0, line: { color: C.ink, width: 0.5 },
  });

  const rows = [
    { risk: "Prompt & Tool\nInjection",   sev: "HIGH",   sevColor: C.orange,
      wrong: "Adversarial content in a webpage or contract tricks the agent into signing a malicious transaction.",
      mit: "Signed-intent policies,\ncapability-scoped wallets, tool\nallow-lists" },
    { risk: "Key Management",              sev: "HIGH",   sevColor: C.orange,
      wrong: "An agent's private key is exfiltrated — the wallet (and balance) is game over.",
      mit: "MPC, TEEs, session keys with\nshort TTL, hardware enclaves" },
    { risk: "Runaway Spend",               sev: "MEDIUM", sevColor: C.ink,
      wrong: "A buggy loop or bad market signal drains treasury before a human notices.",
      mit: "On-chain rate limits, circuit\nbreakers, multi-agent quorum" },
    { risk: "Regulatory Ambiguity",        sev: "MEDIUM", sevColor: C.ink,
      wrong: "Who is liable when an agent breaks a rule? KYC, accredited status, sanctions.",
      mit: "KYC'd smart accounts,\njurisdictional routing, audit trails" },
  ];
  const rowTop = hdrY + 0.75, rowH = 1.25;
  rows.forEach((r, i) => {
    const y = rowTop + i * rowH;
    // Risk label
    s.addText(r.risk, {
      x: cx[0] + 0.1, y: y + 0.1, w: colW[0] - 0.2, h: 1.0,
      fontFace: FONT_H, fontSize: 22, bold: true, color: C.ink, margin: 0, valign: "top",
    });
    // Severity pill
    const pillX = cx[1] + 0.1, pillY = y + 0.22, pillW = 1.3, pillH = 0.42;
    s.addShape(pres.shapes.RECTANGLE, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fill: { color: r.sevColor }, line: { color: r.sevColor, width: 0 },
    });
    s.addText(r.sev, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fontFace: FONT_H, fontSize: 10, color: C.white, bold: true,
      align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    // What goes wrong
    s.addText(r.wrong, {
      x: cx[2] + 0.1, y: y + 0.15, w: colW[2] - 0.2, h: 1.0,
      fontFace: FONT_B, fontSize: 14, color: C.ink, margin: 0, valign: "top",
    });
    // Mitigation
    s.addText(r.mit, {
      x: cx[3] + 0.1, y: y + 0.15, w: colW[3] - 0.2, h: 1.0,
      fontFace: FONT_B, fontSize: 13, color: C.ink, margin: 0, valign: "top",
    });
    // bottom rule
    s.addShape(pres.shapes.LINE, {
      x: tX, y: y + rowH, w: tW, h: 0, line: { color: C.ruleLt, width: 0.5 },
    });
  });
}

// =========================================================
// SLIDE 11 — What to watch
// =========================================================
function buildSlide11() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "WHAT TO WATCH", topRight: "11 / 12",
    bottomLeft: "Signals for the Next 18 Months",
  });
  addSectionTag(s, "§ 11 — OUTLOOK", 0.6, 1.25);

  s.addText("Six signals that tell you the market is maturing.", {
    x: 0.55, y: 1.7, w: 18.9, h: 1.4,
    fontFace: FONT_H, fontSize: 50, bold: true, color: C.ink, margin: 0, valign: "top",
  });

  // Two columns of signals
  const colY = 4.0;
  const lX = 0.6, lW = 9.0;
  const rX = 10.4, rW = 9.0;

  addEyebrow(s, "INFRASTRUCTURE", lX, colY, lW, C.orange, 13);
  addEyebrow(s, "MARKET & POLICY", rX, colY, rW, C.orange, 13);

  // Rule under heading
  s.addShape(pres.shapes.LINE, {
    x: lX, y: colY + 0.45, w: lW, h: 0, line: { color: C.rule, width: 0.5 },
  });
  s.addShape(pres.shapes.LINE, {
    x: rX, y: colY + 0.45, w: rW, h: 0, line: { color: C.rule, width: 0.5 },
  });

  const left = [
    { n: "01", title: "x402 adoption by major API providers",
      body: "Once Stripe-tier vendors ship a pay-per-call endpoint, agent commerce leaves the lab." },
    { n: "02", title: "Smart-account defaults on consumer wallets",
      body: "When EIP-7702 is table stakes, agents inherit full programmable policy on day one." },
    { n: "03", title: "zkML & TEE attestations in production",
      body: "Verifiable inference moves compute from \"trust me\" to \"prove it\" — unlocking regulated use cases." },
  ];
  const right = [
    { n: "04", title: "The first billion-dollar agent-native product",
      body: "A SaaS where the customer is a software agent, not a person. Watch DeFi and data markets first." },
    { n: "05", title: "Agent liability frameworks",
      body: "Clear regulatory guidance on who owns, insures, and is liable for an autonomous wallet." },
    { n: "06", title: "Enterprise treasury pilots go public",
      body: "A Fortune 500 treasury function announcing agent-driven on-chain operations is the tipping-point signal." },
  ];

  function drawSignalBlock(items, x, w) {
    const blockTop = colY + 0.8;
    const itemH = 1.75;
    items.forEach((it, i) => {
      const y = blockTop + i * itemH;
      s.addText(it.n, {
        x, y: y + 0.05, w: 1.2, h: 0.8,
        fontFace: FONT_H, fontSize: 32, italic: true, bold: true, color: C.orange, margin: 0,
      });
      s.addText(it.title, {
        x: x + 1.3, y: y + 0.1, w: w - 1.3, h: 0.55,
        fontFace: FONT_H, fontSize: 18, color: C.ink, margin: 0, valign: "top",
      });
      s.addText(it.body, {
        x: x + 1.3, y: y + 0.7, w: w - 1.3, h: 0.9,
        fontFace: FONT_B, fontSize: 12, color: C.ink, margin: 0, valign: "top",
      });
      // separator below
      s.addShape(pres.shapes.LINE, {
        x, y: y + itemH - 0.08, w, h: 0, line: { color: C.ruleLt, width: 0.5 },
      });
    });
  }
  drawSignalBlock(left, lX, lW);
  drawSignalBlock(right, rX, rW);
}

// =========================================================
// SLIDE 12 — Closing
// =========================================================
function buildSlide12() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addChrome(s, {
    topLeft: "CLOSING", topRight: "12 / 12",
    bottomLeft: "END OF BRIEFING · THANK YOU",
    bottomRight: "DISCUSSION →",
  });
  // Section tag in orange
  s.addText("§ 12 — TAKEAWAY", {
    x: 0.6, y: 1.25, w: 8, h: 0.35,
    fontFace: FONT_H, fontSize: 12, color: C.orange, charSpacing: 2, margin: 0,
  });

  // Huge takeaway — with orange italic "doesn't sleep,"
  s.addText(
    [
      { text: "The customer of the next decade ", options: { color: C.ink } },
      { text: "doesn't sleep,", options: { italic: true, color: C.orange } },
      { text: " and pays in stablecoins.", options: { color: C.ink } },
    ],
    {
      x: 0.55, y: 1.85, w: 18.9, h: 5,
      fontFace: FONT_H, fontSize: 92, bold: true, margin: 0, valign: "top",
    }
  );

  // Closing paragraph
  s.addText(
    "The question isn't whether AI agents will transact on-chain. It's which parts of your\nbusiness are ready to sell to them, buy from them, and be operated by them.",
    {
      x: 0.6, y: 6.95, w: 13, h: 1.5,
      fontFace: FONT_B, fontSize: 18, color: C.ink, margin: 0,
    }
  );

  // "Thank you" with small orange dot
  s.addShape(pres.shapes.OVAL, {
    x: 0.6, y: 9.85, w: 0.35, h: 0.35,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("Thank you", {
    x: 1.05, y: 9.8, w: 4, h: 0.4,
    fontFace: FONT_B, fontSize: 16, color: C.ink, margin: 0,
  });
  s.addText("Market Briefing · 2026", {
    x: 14.4, y: 9.8, w: 5, h: 0.4,
    fontFace: FONT_B, fontSize: 13, color: C.muteDk, align: "right", margin: 0,
  });
}

// =========================================================
// BUILD ALL
// =========================================================
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
buildSlide12();

pres.writeFile({ fileName: "AI_Agents_Blockchain_replica.pptx" })
  .then((fn) => console.log("Wrote:", fn))
  .catch((e) => { console.error(e); process.exit(1); });
