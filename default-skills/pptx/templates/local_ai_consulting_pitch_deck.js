// Agentek — Client Presentation MMXXVI
// Recreated with pptxgenjs to match the original design: dark, minimalist, boutique.
//
// Design tokens:
//   bg          = 0A0A0A (near-black)
//   ink         = ECE8E1 (warm off-white, body titles)
//   muted       = A8A49B (warm grey, body copy)
//   dim         = 6B6760 (dim warm grey, labels / footers)
//   faint       = 2A2A28 (faint divider lines)
//   fainter     = 1D1D1B (even fainter dividers)
//   ghost       = 000000 (dark-on-dark ghost text — barely visible, intentional)
//   accent-g    = C5DD97 (very subtle green wash on PRO package, 5% opacity)
//
// Slide size: 20" x 11.25" (custom widescreen, matches original 18288000 x 10287000 EMU)
// Font: Arial throughout

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "AGENTEK_WIDE", width: 20, height: 11.25 });
pres.layout = "AGENTEK_WIDE";
pres.author = "Agentek";
pres.title = "Agentek — Client Presentation MMXXVI";
pres.company = "Agentek";

// ── Palette ───────────────────────────────────────────────────────────────
const C = {
  bg:      "0A0A0A",
  ink:     "ECE8E1",
  muted:   "A8A49B",
  dim:     "6B6760",
  faint:   "2A2A28",
  fainter: "1D1D1B",
  ghost:   "000000",
  accentG: "C5DD97",
};

const FONT = "Arial";

// charSpacing in pptxgenjs = value * 100 → OOXML spc. Original OOXML uses
// hundredths of a point. To match spc=324 pass charSpacing: 3.24.
const cs = (spc) => spc / 100;

// ── Helpers ───────────────────────────────────────────────────────────────
// Every slide has the same header (AGENTEK wordmark + section label) and
// footer (AGENTEK wordmark + "NN / 10"). Pull those out so every slide can
// call them with one line.
function addHeader(slide, sectionLabel) {
  slide.addText("AGENTEK", {
    x: 1.042, y: 0.583, w: 1.657, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.ink,
    charSpacing: cs(324), margin: 0, valign: "top", align: "left",
  });
  slide.addText(sectionLabel, {
    x: 13.0, y: 0.583, w: 6.0, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: cs(216), margin: 0, valign: "top", align: "right",
  });
}

function addFooter(slide, pageLabel) {
  slide.addText("AGENTEK", {
    x: 1.042, y: 10.317, w: 1.523, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.dim,
    charSpacing: cs(252), margin: 0, valign: "top", align: "left",
  });
  slide.addText(pageLabel, {
    x: 17.949, y: 10.317, w: 1.093, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.dim,
    charSpacing: cs(252), margin: 0, valign: "top", align: "right",
  });
}

// "Ghost" all-caps section title — dark-on-dark, nearly invisible. This is a
// deliberate stylistic choice in the original and is kept faithful here.
function addGhostTitle(slide, text, x, y, w) {
  slide.addText(text, {
    x, y, w, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.ghost,
    charSpacing: cs(288), margin: 0, valign: "top", align: "left",
  });
}

// A thin divider — drawn as a very short RECTANGLE because pptxgenjs LINE
// shapes render with a minimum visual thickness on some clients.
function addHLine(slide, x, y, w, color = C.faint) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.01,
    fill: { color }, line: { type: "none" },
  });
}

function addVLine(slide, x, y, h, color = C.faint) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.01, h,
    fill: { color }, line: { type: "none" },
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Cover
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Header
  s.addText("AGENTEK", {
    x: 1.042, y: 0.583, w: 1.657, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.ink,
    charSpacing: cs(432), margin: 0, valign: "top", align: "left",
  });
  s.addText("CLIENT PRESENTATION MMXXVI", {
    x: 13.5, y: 0.583, w: 5.5, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: cs(216), margin: 0, valign: "top", align: "right",
  });

  // Big headline — "Local intelligence, built on your premises."
  // "built on your premises." is italic.
  s.addText([
    { text: "Local intelligence, ", options: { color: C.ink } },
    { text: "built on your premises.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 4.826, w: 17.15, h: 2.68,
    fontFace: FONT, fontSize: 99,
    charSpacing: cs(-346),
    paraSpaceAfter: 0, lineSpacingMultiple: 0.95,
    margin: 0, valign: "top", align: "left",
  });

  // Separator above tagline block
  addHLine(s, 1.042, 7.697, 17.9, C.faint);

  // Tagline (left) + boutique signature (right)
  s.addText(
    "OFFLINE CODING AGENTS, ON-SITE BACKUPS, AND THE QUIET CONFIDENCE OF OWNING YOUR STACK.",
    {
      x: 1.042, y: 8.047, w: 7.504, h: 1.14,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: cs(216), lineSpacingMultiple: 1.6,
      margin: 0, valign: "top", align: "left",
    }
  );
  s.addText("AGENTEK —— A BOUTIQUE PRACTICE", {
    x: 14.103, y: 8.413, w: 3.232, h: 0.77,
    fontFace: FONT, fontSize: 18, color: C.dim,
    charSpacing: cs(216), lineSpacingMultiple: 1.6,
    margin: 0, valign: "top", align: "right",
  });

  addFooter(s, ""); // Cover has no page number, but keep wordmark spacing clean
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — The Problem (01 / CONTEXT)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "01 / CONTEXT");
  addGhostTitle(s, "THE PROBLEM", 1.042, 1.458, 18.454);

  // Pull quote
  s.addText([
    { text: "Every prompt you send to the cloud is a copy of your business ", options: { color: C.ink } },
    { text: "leaving the building.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 16.094, h: 1.7,
    fontFace: FONT, fontSize: 48, charSpacing: cs(-96),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.05,
    margin: 0, valign: "top", align: "left",
  });

  // Body paragraph
  s.addText(
    "Source code, client records, contracts, financials — routed through third-party APIs, billed by the token, and logged on someone else's machine. For small businesses that depend on discretion, that trade gets expensive in more than one way.",
    {
      x: 1.042, y: 4.055, w: 15.021, h: 1.9,
      fontFace: FONT, fontSize: 25.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Three-column problem grid — divider frame
  addHLine(s, 1.042, 7.414, 17.917, C.faint);
  addVLine(s, 7.007, 7.421, 2.579, C.faint);
  addVLine(s, 12.979, 7.421, 2.579, C.faint);

  // Big ghost numerals + muted body under each
  const problems = [
    { n: "01", x: 1.042,  label: "Your data moves across networks you do not own or audit." },
    { n: "02", x: 7.431,  label: "Monthly token bills scale with the work, not the value." },
    { n: "03", x: 13.403, label: "An API outage stops your team from shipping anything." },
  ];
  for (const p of problems) {
    s.addText(p.n, {
      x: p.x, y: 7.838, w: 5.7, h: 1.17,
      fontFace: FONT, fontSize: 81, italic: true, color: C.ghost,
      charSpacing: cs(-162), margin: 0, valign: "top", align: "left",
    });
    s.addText(p.label, {
      x: p.x, y: 9.213, w: 4.506, h: 0.829,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), margin: 0, valign: "top", align: "left",
    });
  }

  addFooter(s, "01 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — What We Do (02 / PRACTICE)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "02 / PRACTICE");
  addGhostTitle(s, "WHAT WE DO", 1.042, 1.667, 6.652);

  // Left column: headline + body
  s.addText([
    { text: "A small practice with a ", options: { color: C.ink } },
    { text: "narrow focus.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.308, w: 6.652, h: 2.0,
    fontFace: FONT, fontSize: 54, charSpacing: cs(-108),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.05,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    "We visit your office, understand your hardware and your workflow, and leave behind a private AI environment your team can actually use — without a subscription and without the cloud.",
    {
      x: 1.042, y: 4.439, w: 5.579, h: 2.5,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Right column: four stacked rows with hairline dividers between
  const rows = [
    { n: "01", title: "Offline coding agents, on-site",
      body: "Hermes and OpenClaw deployed directly on your developers' machines, tuned to your codebase and your conventions." },
    { n: "02", title: "Local LLMs for everyday work",
      body: "Open-weight models — chosen for your hardware — wired into the tools your team already uses." },
    { n: "03", title: "Local-first data backups",
      body: "Versioned, encrypted, on-premise — with a tested path back when you need it most." },
    { n: "04", title: "Quiet maintenance, on retainer",
      body: "We update the models, rotate the backups, and stay one phone call away." },
  ];
  const dividerYs = [3.221, 5.365, 7.509]; // above rows 1, 2, 3 (not above 4)
  for (const y of dividerYs) addHLine(s, 8.333, y, 10.625, C.fainter);

  const rowYs = [1.458, 3.603, 5.747, 7.891]; // title y for each row
  rows.forEach((r, i) => {
    const yTitle = rowYs[i];
    const yNum = yTitle + 0.132; // number slightly offset
    const yBody = yTitle + 0.629;
    s.addText(r.n, {
      x: 8.333, y: yNum, w: 0.917, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.ghost,
      charSpacing: cs(252), margin: 0, valign: "top", align: "left",
    });
    s.addText(r.title, {
      x: 9.5, y: yTitle, w: 9.742, h: 0.567,
      fontFace: FONT, fontSize: 27, color: C.ink,
      charSpacing: cs(-27), margin: 0, valign: "top", align: "left",
    });
    s.addText(r.body, {
      x: 9.5, y: yBody, w: 8.154, h: 1.6,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    });
  });

  addFooter(s, "02 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Our Stack (03 / STACK)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "03 / STACK");
  addGhostTitle(s, "OUR STACK", 1.042, 1.458, 18.454);

  s.addText([
    { text: "Three pieces we know ", options: { color: C.ink } },
    { text: "inside and out.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 16.094, h: 1.0,
    fontFace: FONT, fontSize: 48, charSpacing: cs(-96),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
    margin: 0, valign: "top", align: "left",
  });

  // Framing lines — top and bottom of stack grid, plus two verticals
  addHLine(s, 1.042, 3.564, 17.917, C.faint);
  addHLine(s, 1.042, 8.462, 17.917, C.faint);
  addVLine(s, 7.007, 3.571, 4.891, C.faint);
  addVLine(s, 12.979, 3.571, 4.891, C.faint);

  const cols = [
    { x: 1.458, label: "AGENT · 01",   name: "Hermes",
      body: "A reasoning agent we configure for long-running tasks: refactors, migrations, pull-request review. Runs entirely on local hardware.",
      tag: "the thinker" },
    { x: 7.431, label: "AGENT · 02",   name: "OpenClaw",
      body: "An open-source coding agent we specialize in tuning for your repo — file-level edits, tests, and shell access without the round trip.",
      tag: "the hands" },
    { x: 13.403, label: "MODELS · 03", name: "Qwen 3.5 & 3.6",
      body: "Open-weight models we favor for the quality-to-footprint ratio. We pick the size that fits your machine, not the other way around.",
      tag: "the engine" },
  ];
  for (const c of cols) {
    s.addText(c.label, {
      x: c.x, y: 4.071, w: 5.293, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.dim,
      charSpacing: cs(288), margin: 0, valign: "top", align: "left",
    });
    s.addText(c.name, {
      x: c.x, y: 4.712, w: 5.293, h: 0.742,
      fontFace: FONT, fontSize: 36, color: C.ink,
      charSpacing: cs(-72), margin: 0, valign: "top", align: "left",
    });
    s.addText(c.body, {
      x: c.x, y: 5.621, w: 5.293, h: 1.7,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.tag, {
      x: c.x, y: 7.47, w: 5.293, h: 0.45,
      fontFace: FONT, fontSize: 21, italic: true, color: C.ghost,
      charSpacing: cs(-13), margin: 0, valign: "top", align: "left",
    });
  }

  addFooter(s, "03 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Hardware Fit (04 / FIT)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "04 / FIT");
  addGhostTitle(s, "HARDWARE FIT", 1.042, 1.458, 6.008);

  s.addText([
    { text: "The right model for the ", options: { color: C.ink } },
    { text: "machine you own.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 6.008, h: 2.5,
    fontFace: FONT, fontSize: 51, charSpacing: cs(-102),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.05,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    "We do not ask you to buy a server rack. We survey your existing hardware, benchmark a short list of candidates, and pick the one that actually runs well on your desk.",
    {
      x: 1.042, y: 4.887, w: 5.15, h: 2.2,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Table — 4 columns, header + 4 rows, with hairline rules under each row.
  const colX      = [7.917, 10.666, 13.043, 16.292];
  const colW      = [2.749, 2.377, 3.249, 2.667];
  const headers   = ["MODEL", "FOOTPRINT", "FITS ON", "BEST FOR"];
  const headerAlign = ["left", "left", "left", "right"];

  // Header row labels + underline
  headers.forEach((h, i) => {
    const tx = headerAlign[i] === "right" ? 16.208 : colX[i];
    const tw = headerAlign[i] === "right" ? 2.75   : colW[i];
    s.addText(h, {
      x: tx, y: 1.75, w: tw, h: 0.388,
      fontFace: FONT, fontSize: 18, color: C.dim,
      charSpacing: cs(252), margin: 0, valign: "top",
      align: headerAlign[i],
    });
    addHLine(s, colX[i], 2.305, colW[i], C.faint);
  });

  // Data rows
  const rows = [
    ["Qwen 3.5 · 7B",  "~8 GB",  "Modern laptop",       "everyday coding"],
    ["Qwen 3.5 · 14B", "~14 GB", "Workstation GPU",     "team-wide agent"],
    ["Qwen 3.6 · 32B", "~24 GB", "Desktop rig",         "reasoning & review"],
    ["Qwen 3.6 · 72B", "~48 GB", "Studio workstation",  "frontier quality"],
  ];
  const rowYs = [2.583, 3.569, 4.555, 5.541];
  const ruleYs = [3.291, 4.277, 5.263]; // rule UNDER rows 1, 2, 3 (not after 4)
  for (const ry of ruleYs) {
    colX.forEach((x, i) => addHLine(s, x, ry, colW[i], C.fainter));
  }
  rows.forEach((row, r) => {
    const y = rowYs[r];
    // col 0: model name (ink)
    s.addText(row[0], {
      x: colX[0], y, w: colW[0], h: 0.479,
      fontFace: FONT, fontSize: 19.5, color: C.ink,
      charSpacing: cs(39), margin: 0, valign: "middle", align: "left",
    });
    // col 1: footprint (muted)
    s.addText(row[1], {
      x: colX[1], y, w: colW[1], h: 0.479,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), margin: 0, valign: "middle", align: "left",
    });
    // col 2: fits on (muted)
    s.addText(row[2], {
      x: colX[2], y, w: colW[2], h: 0.479,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), margin: 0, valign: "middle", align: "left",
    });
    // col 3: best for (italic ghost, right-aligned)
    s.addText(row[3], {
      x: 16.208, y, w: 2.75, h: 0.479,
      fontFace: FONT, fontSize: 22.5, italic: true, color: C.ghost,
      charSpacing: cs(-13), margin: 0, valign: "middle", align: "right",
    });
  });

  addFooter(s, "04 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Your Tools, Kept Local (05 / WORKFLOW)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "05 / WORKFLOW");
  addGhostTitle(s, "YOUR TOOLS, KEPT LOCAL", 1.042, 1.458, 9.227);

  s.addText([
    { text: "Claude Code and Codex, pointed at a model you ", options: { color: C.ink } },
    { text: "actually control.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 9.227, h: 2.5,
    fontFace: FONT, fontSize: 48, charSpacing: cs(-96),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.05,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    "Your developers keep the interfaces they already like. We redirect them to a local endpoint — same commands, same muscle memory, none of the outbound traffic.",
    {
      x: 1.042, y: 4.755, w: 7.725, h: 1.4,
      fontFace: FONT, fontSize: 21, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Three bullet-sentence rows with hairline dividers (under the first two)
  addHLine(s, 1.042, 7.041, 8.958, C.fainter);
  addHLine(s, 1.042, 8.330, 8.958, C.fainter);

  const rows = [
    { y: 6.397, ink: "Same CLI ",         rest: "— nothing changes for the developer at the keyboard." },
    { y: 7.278, ink: "No rate limits ",   rest: "— the machine is the limit, and the machine is yours." },
    { y: 8.566, ink: "Per-project routing ", rest: "— sensitive repos stay local, others can still use cloud." },
  ];
  for (const r of rows) {
    s.addText([
      { text: r.ink,  options: { color: C.ink } },
      { text: r.rest, options: { color: C.muted } },
    ], {
      x: 1.667, y: r.y, w: 8.583, h: 0.5,
      fontFace: FONT, fontSize: 21, charSpacing: cs(-13),
      margin: 0, valign: "top", align: "left",
    });
  }

  // Terminal mock on the right — dark panel with subtle top rule, window dots,
  // and a fake session transcript.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.833, y: 1.458, w: 8.125, h: 8.542,
    fill: { color: "111110" }, line: { type: "none" },
  });
  addHLine(s, 11.257, 2.215, 7.278, C.fainter);
  // Three traffic-light dots (muted, not red/yellow/green — matches original)
  for (let i = 0; i < 3; i++) {
    s.addShape(pres.shapes.OVAL, {
      x: 11.257 + i * 0.209, y: 1.84, w: 0.125, h: 0.125,
      fill: { color: C.faint }, line: { type: "none" },
    });
  }

  // Terminal transcript — each line 0.437" high
  const term = [
    { y: 2.472, parts: [{ text: "# agentek · local endpoint active", color: C.dim }] },
    { y: 2.910, parts: [{ text: "$ ", color: C.ghost }, { text: "export ANTHROPIC_BASE_URL=http://localhost:8787", color: C.ink }] },
    { y: 3.347, parts: [{ text: "$ ", color: C.ghost }, { text: "claude-code .", color: C.ink }] },
    { y: 3.785, parts: [{ text: "routing to qwen-3.6-32b (on-device)", color: C.dim }] },
    { y: 4.222, parts: [{ text: "✓ context indexed · 14,208 files", color: C.ghost }] },
    { y: 4.660, parts: [{ text: "✓ no outbound requests", color: C.ghost }] },
    { y: 5.535, parts: [{ text: "› ", color: C.ghost }, { text: "refactor billing module for multi-currency", color: C.ink }] },
    { y: 5.972, parts: [{ text: "thinking · reading src/billing/** · 3.4s", color: C.dim }] },
    { y: 6.410, parts: [{ text: "✓ 7 files edited · 2 tests added", color: C.ghost }] },
  ];
  for (const line of term) {
    s.addText(
      line.parts.map(p => ({ text: p.text, options: { color: p.color } })),
      {
        x: 11.257, y: line.y, w: 7.496, h: 0.479,
        fontFace: "Consolas", fontSize: 18, charSpacing: cs(-13),
        margin: 0, valign: "top", align: "left",
      }
    );
  }

  addFooter(s, "05 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Backups (06 / RESILIENCE)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "06 / RESILIENCE");
  addGhostTitle(s, "BACKUPS", 1.042, 1.458, 18.454);

  s.addText([
    { text: "Backups that ", options: { color: C.ink } },
    { text: "actually come back.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 16.094, h: 1.0,
    fontFace: FONT, fontSize: 48, charSpacing: cs(-96),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    "Most small businesses have a backup in name only — an external drive in a drawer, a free tier on someone else's cloud, a promise nobody has tested in two years. We build you a system that restores in minutes, not in a panic.",
    {
      x: 1.042, y: 3.355, w: 15.021, h: 1.9,
      fontFace: FONT, fontSize: 25.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Three columns, each with a short top rule + italic label + headline + body
  const cols = [
    { x: 1.042,  label: "i. protect",   head: "On-premise, versioned, encrypted",
      body: "Snapshotted continuously on hardware that lives in your building. You hold the keys." },
    { x: 7.181,  label: "ii. verify",   head: "Restores, on a schedule",
      body: "We don't trust a backup we haven't read back. Quarterly drills, documented and signed off." },
    { x: 13.319, label: "iii. recover", head: "Hour-one playbook",
      body: "A printed runbook and a direct number. When the day comes, you are not searching Reddit." },
  ];
  for (const c of cols) {
    addHLine(s, c.x, 7.068, 5.639, C.faint);
    s.addText(c.label, {
      x: c.x, y: 7.409, w: 5.808, h: 0.45,
      fontFace: FONT, fontSize: 21, italic: true, color: C.ghost,
      charSpacing: cs(-13), margin: 0, valign: "top", align: "left",
    });
    s.addText(c.head, {
      x: c.x, y: 8.025, w: 5.808, h: 1.1,
      fontFace: FONT, fontSize: 27, color: C.ink,
      charSpacing: cs(-27), lineSpacingMultiple: 1.1,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.body, {
      x: c.x, y: 9.242, w: 5.808, h: 0.8,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    });
  }

  addFooter(s, "06 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — How We Work (07 / PROCESS)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "07 / PROCESS");
  addGhostTitle(s, "HOW WE WORK", 1.042, 1.458, 18.454);

  s.addText([
    { text: "A short, predictable ", options: { color: C.ink } },
    { text: "engagement.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.017, w: 16.094, h: 0.9,
    fontFace: FONT, fontSize: 42, charSpacing: cs(-84),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
    margin: 0, valign: "top", align: "left",
  });

  // Top divider above phase table (slightly bolder) + bottom rule under each row
  addHLine(s, 1.042, 3.060, 17.917, C.faint);

  const phases = [
    { label: "PHASE 01", title: "Site survey",
      body: "On-site visit. Inventory of hardware, inventory of data, inventory of the workflows your team actually uses.",
      time: "1 day" },
    { label: "PHASE 02", title: "Model shortlist & bench",
      body: "We benchmark three to five candidate models against your codebase and pick the one that earns its keep.",
      time: "3–5 days" },
    { label: "PHASE 03", title: "Install & integrate",
      body: "Agents deployed, editors wired up, backup system installed, firewall rules reviewed.",
      time: "1 week" },
    { label: "PHASE 04", title: "Handover & training",
      body: "Documented runbook, a live walkthrough for your team, and a restore drill before we leave.",
      time: "2 days" },
    { label: "PHASE 05", title: "Retainer",
      body: "Monthly check-ins, model updates, and backup verification — with a named contact, not a ticket queue.",
      time: "Ongoing" },
  ];

  // Five rows, each ~1.161" tall. Row bottom rules at:
  const rowRuleYs = [4.221, 5.536, 6.384, 7.699, 8.860];
  for (const ry of rowRuleYs) addHLine(s, 1.042, ry, 17.917, C.fainter);

  const titleYs = [3.254, 4.415, 5.730, 6.579, 7.894];
  const labelYs = [3.351, 4.512, 5.827, 6.676, 7.991];
  const bodyYs  = [3.358, 4.519, 5.834, 6.683, 7.998];

  phases.forEach((p, i) => {
    s.addText(p.label, {
      x: 1.042, y: labelYs[i], w: 1.958, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.ghost,
      charSpacing: cs(252), margin: 0, valign: "top", align: "left",
    });
    s.addText(p.title, {
      x: 3.333, y: titleYs[i], w: 3.004, h: 1.0,
      fontFace: FONT, fontSize: 24, color: C.ink,
      charSpacing: cs(-24), lineSpacingMultiple: 1.1,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(p.body, {
      x: 6.667, y: bodyYs[i], w: 10.085, h: 0.9,
      fontFace: FONT, fontSize: 18, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(p.time, {
      x: 16.792, y: labelYs[i], w: 2.167, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.dim,
      charSpacing: cs(90), margin: 0, valign: "top", align: "right",
    });
  });

  addFooter(s, "07 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Packages (08 / PACKAGES)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "08 / PACKAGES");
  addGhostTitle(s, "PACKAGES", 1.042, 1.458, 18.454);

  s.addText([
    { text: "Three ways to ", options: { color: C.ink } },
    { text: "start working together.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 16.094, h: 1.0,
    fontFace: FONT, fontSize: 48, charSpacing: cs(-96),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
    margin: 0, valign: "top", align: "left",
  });

  // PRO column gets a VERY faint green wash (alpha 5000 in original = 5% opacity,
  // i.e., transparency 95 in pptxgenjs terms). Drawn before the border lines.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.014, y: 3.564, w: 5.972, h: 5.832,
    fill: { color: C.accentG, transparency: 95 },
    line: { type: "none" },
  });

  // Top + vertical dividers (top border of each column, dividers between columns)
  addHLine(s, 1.042,  3.564, 5.972, C.faint);
  addHLine(s, 7.014,  3.564, 5.972, C.faint);
  addHLine(s, 12.986, 3.564, 5.972, C.faint);
  addVLine(s, 7.007,  3.564, 5.832, C.faint);
  addVLine(s, 12.979, 3.564, 5.832, C.faint);

  const pkgs = [
    { x: 1.042,  labelX: 1.042,  label: "STARTER",
      pitch: "For a solo practitioner or a two-seat office.",
      bullets: [
        "One workstation, one agent",
        "Qwen 3.5 (7B or 14B)",
        "Local backup, single node",
        "Half-day on-site install",
        "Email support",
      ],
      underlineX: 1.042, underlineW: 5.549, bulletX: 0.852, bulletW: 5.822 },
    { x: 7.014,  labelX: 7.431,  label: "PRO · RECOMMENDED",
      pitch: "For a small team that codes every day.",
      bullets: [
        "Up to eight developer seats",
        "Qwen 3.6 (32B) shared endpoint",
        "Hermes + OpenClaw, both tuned",
        "Versioned backup with quarterly drills",
        "Monthly retainer, named contact",
      ],
      underlineX: 7.431, underlineW: 5.132, bulletX: 7.241, bulletW: 5.405 },
    { x: 12.986, labelX: 13.403, label: "ENTERPRISE",
      pitch: "For a firm with custodial data and auditors.",
      bullets: [
        "Multi-node, high-availability",
        "Qwen 3.6 (72B) or custom fit",
        "Offsite encrypted replica",
        "Documented runbooks, audit trail",
        "Priority on-call, SLA in writing",
      ],
      underlineX: 13.403, underlineW: 5.139, bulletX: 13.213, bulletW: 5.412 },
  ];
  for (const p of pkgs) {
    s.addText(p.label, {
      x: p.labelX, y: 3.904, w: 5.3, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.ghost,
      charSpacing: cs(288), margin: 0, valign: "top", align: "left",
    });
    s.addText(p.pitch, {
      x: p.labelX, y: 4.421, w: 4.721, h: 1.0,
      fontFace: FONT, fontSize: 25.5, italic: true, color: C.ink,
      charSpacing: cs(-25), lineSpacingMultiple: 1.1,
      margin: 0, valign: "top", align: "left",
    });
    addHLine(s, p.underlineX, 5.527, p.underlineW, C.fainter);

    // Bullets — one line each, slightly loose spacing
    s.addText(
      p.bullets.map((b, idx) => ({
        text: b,
        options: idx < p.bullets.length - 1 ? { breakLine: true } : {},
      })),
      {
        x: p.bulletX, y: 5.534, w: p.bulletW, h: 3.571,
        fontFace: FONT, fontSize: 19.5, color: C.muted,
        charSpacing: cs(-13), paraSpaceAfter: 8,
        margin: 0, valign: "top", align: "left",
      }
    );
  }

  // Footnote under the three columns
  s.addText("Scoped per site — we quote once we've seen the room.", {
    x: 1.042, y: 9.646, w: 18.454, h: 0.392,
    fontFace: FONT, fontSize: 18, color: C.dim,
    charSpacing: cs(108), margin: 0, valign: "top", align: "left",
  });

  addFooter(s, "08 / 10");
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Let's Talk (09 / NEXT)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  addHeader(s, "09 / NEXT");
  addGhostTitle(s, "LET'S TALK", 1.042, 1.458, 18.454);

  // Massive closing headline
  s.addText([
    { text: "A half-day survey, ", options: { color: C.ink } },
    { text: "on us.", options: { color: C.ink, italic: true } },
  ], {
    x: 1.042, y: 2.1, w: 16.094, h: 3.8,
    fontFace: FONT, fontSize: 126, charSpacing: cs(-441),
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
    margin: 0, valign: "top", align: "left",
  });

  s.addText(
    "We'll come to your office, look at the hardware, listen to the problem, and leave behind a written recommendation — whether or not you decide to work with us.",
    {
      x: 1.042, y: 5.876, w: 13.948, h: 1.3,
      fontFace: FONT, fontSize: 25.5, color: C.muted,
      charSpacing: cs(-13), lineSpacingMultiple: 1.3,
      margin: 0, valign: "top", align: "left",
    }
  );

  // Contact block — three columns, top rule spans all three, verticals between
  addHLine(s, 1.042, 8.693, 17.917, C.faint);
  addVLine(s, 7.007,  9.075, 0.925, C.faint);
  addVLine(s, 12.979, 9.075, 0.925, C.faint);

  const contacts = [
    { x: 1.042,  label: "WRITE", val: "hello@agentek.co" },
    { x: 7.431,  label: "CALL",  val: "+1 (000) 000 · 0000" },
    { x: 13.403, label: "BOOK",  val: "agentek.co/survey" },
  ];
  for (const c of contacts) {
    s.addText(c.label, {
      x: c.x, y: 9.075, w: 5.722, h: 0.392,
      fontFace: FONT, fontSize: 18, color: C.dim,
      charSpacing: cs(288), margin: 0, valign: "top", align: "left",
    });
    s.addText(c.val, {
      x: c.x, y: 9.592, w: 5.722, h: 0.45,
      fontFace: FONT, fontSize: 21, color: C.ink,
      charSpacing: cs(42), margin: 0, valign: "top", align: "left",
    });
  }

  addFooter(s, "10 / 10");
}

// ── Write out ─────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "Agentek.pptx" })
  .then(fn => console.log(`wrote ${fn}`))
  .catch(err => { console.error(err); process.exit(1); });
