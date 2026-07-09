// Gaming.js  —  recreates Gaming.pptx (BASED // Series A investor briefing)
// Run:  node Gaming.js   →  emits Gaming_recreated.pptx
// Requires:  npm install -g pptxgenjs

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

// ---------- LAYOUT (custom 20" x 11.25" widescreen, matches original) ----------
pres.defineLayout({ name: "BASED_WIDE", width: 20, height: 11.25 });
pres.layout = "BASED_WIDE";
pres.author  = "Macroplastics Inc.";
pres.company = "BASED";
pres.title   = "BASED — Series A Investor Briefing";

// ---------- PALETTE (extracted from original) ----------
const C = {
  bgBase:    "120806",  // deepest near-black (cover uses 0A0504, vision uses 0A0504)
  bgBaseAlt: "0A0504",  // slightly darker variant on slide 4 + 15
  bgWarm:    "2A120C",  // warm brown overlay
  panel:     "1A0D0A",  // card / panel fill
  panelDark: "1A0D0A",
  border:    "3A1E16",  // hairline borders, divider lines
  borderHi:  "5A2E20",  // brighter border (panels)
  rust:      "D9482A",  // primary accent — rust orange
  cream:     "F2E3D5",  // primary headline cream
  muted:     "7A5D4E",  // muted brown text (chrome / labels)
  warm:      "C9B5A3",  // warm gray body text
  amber:     "F2C572",  // warning amber
};

const FONT  = "Arial";
const FMONO = "Consolas"; // monospace stand-in (was "monospace" in original)

// canvas
const SW = 20.0, SH = 11.25;

// ---------- HELPERS ----------

// Header + footer chrome that appears on every slide
function chrome(s, sectionLabel, sectionLabelW = 1.85, useDarkBg = false) {
  // base background layers
  s.background = { color: useDarkBg ? C.bgBaseAlt : C.bgBase };
  // warm brown wash on top
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: SW, h: SH,
    fill: { color: C.bgWarm, transparency: 70 },
    line: { type: "none" },
  });

  // top-left corner glyph
  s.addText("◢", {
    x: 0.42, y: 0.44, w: 0.23, h: 0.25,
    fontFace: FONT, fontSize: 12, color: C.rust, margin: 0,
  });
  // top-left brand
  s.addText("BASED//SYS", {
    x: 0.68, y: 0.42, w: 1.53, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.cream, charSpacing: 1.5, margin: 0,
  });
  // top-right section label (give generous width, right-align so it sits next to ◣)
  s.addText(sectionLabel, {
    x: 16.5, y: 0.42, w: 2.9, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.muted, charSpacing: 1.5, margin: 0,
    align: "right",
  });
  // top-right corner glyph
  s.addText("◣", {
    x: 19.44, y: 0.44, w: 0.23, h: 0.25,
    fontFace: FONT, fontSize: 12, color: C.rust, margin: 0,
  });

  // bottom-left tiny rust dot
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 10.66, w: 0.10, h: 0.10,
    fill: { color: C.rust }, line: { type: "none" },
  });
  s.addText("LINK//STABLE", {
    x: 0.62, y: 10.59, w: 1.45, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.muted, margin: 0,
  });
  s.addText("SOL.0427 · 14:32:08 MTC", {
    x: 16.66, y: 10.59, w: 3.01, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.muted, charSpacing: 1.5, margin: 0,
  });
}

// Eyebrow: small uppercase rust label above the headline
function eyebrow(s, text, x, y, w = 18.45, align = "left") {
  s.addText(text, {
    x, y, w, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.rust, charSpacing: 3, margin: 0,
    align,
  });
}

// Big headline with a single-word red accent (rich text array)
function headline(s, runs, opts) {
  // runs: [{text, accent: bool}, ...]
  const arr = runs.map((r) => ({
    text: r.text,
    options: { bold: true, color: r.accent ? C.rust : C.cream, fontFace: FONT, fontSize: opts.size || 63, charSpacing: -0.75 },
  }));
  s.addText(arr, {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    align: opts.align || "left", margin: 0,
  });
}

// Card panel (filled rect with border)
function card(s, x, y, w, h, fill = C.panel, borderC = C.border, lineW = 0.68) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fill },
    line: { color: borderC, width: lineW },
  });
}

// Thin horizontal divider
function divider(s, x, y, w, color = C.border, h = 0.01) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color }, line: { type: "none" },
  });
}

// Panel with header strip (top label row + divider line)
function panel(s, x, y, w, h, leftLabel, rightLabel) {
  card(s, x, y, w, h, C.panel, C.borderHi, 0.68);
  divider(s, x + 0.01, y + 0.48, w - 0.02, C.border, 0.01);
  s.addText(leftLabel, {
    x: x + 0.17, y: y + 0.01, w: w * 0.4, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 1.5, margin: 0,
  });
  if (rightLabel) {
    s.addText(rightLabel, {
      x: x + w - 2.7, y: y + 0.01, w: 2.5, h: 0.31,
      fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 1.5, margin: 0,
      align: "right",
    });
  }
}

// Mono ASCII art block
function ascii(s, x, y, w, h, lines, color = C.rust, sz = 12) {
  const arr = lines.map((ln, i) => ({
    text: ln,
    options: {
      fontFace: FMONO, fontSize: sz, color,
      breakLine: i < lines.length - 1,
    },
  }));
  s.addText(arr, { x, y, w, h, margin: 0, valign: "top" });
}

// Outlined chip (for cover badges, etc.)
function chip(s, x, y, w, h, text, textColor, lineColor) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { type: "none" },
    line: { color: lineColor, width: 0.68 },
  });
  s.addText(text, {
    x: x + 0.18, y: y + 0.07, w: w - 0.27, h: h - 0.10,
    fontFace: FONT, fontSize: 16.5, color: textColor, charSpacing: 1.5, margin: 0,
  });
}

// =====================================================================
// SLIDE 1 — COVER
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "00 // COVER", 1.52);

  // Series A eyebrow
  s.addText("SERIES A · INVESTOR BRIEFING · CONFIDENTIAL", {
    x: 1.04, y: 3.55, w: 9.71, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.rust, charSpacing: 3, margin: 0,
  });

  // Big BASED wordmark with red A
  s.addText([
    { text: "B",   options: { bold: true, color: C.cream, fontFace: FONT, fontSize: 141.27, charSpacing: -3 } },
    { text: "A",   options: { bold: true, color: C.rust,  fontFace: FONT, fontSize: 141.27, charSpacing: -3 } },
    { text: "SED", options: { bold: true, color: C.cream, fontFace: FONT, fontSize: 141.27, charSpacing: -3 } },
  ], { x: 1.04, y: 4.09, w: 9.71, h: 1.77, margin: 0, valign: "top" });

  // Subtitle
  s.addText("BIOLOGICAL · AGENT · SYSTEM FOR · EXTRATERRESTRIAL · DEVELOPMENT", {
    x: 1.04, y: 6.11, w: 9.71, h: 0.92,
    fontFace: FONT, fontSize: 21, color: C.warm, charSpacing: 2.25, margin: 0,
  });

  // Three chips
  chip(s, 1.04, 7.49, 2.91, 0.42, "◉ LIVE SIMULATION", C.rust,  C.rust);
  chip(s, 4.07, 7.49, 2.87, 0.42, "PC · CONSOLE · VR", C.warm,  C.border);
  chip(s, 7.07, 7.49, 2.49, 0.42, "REAL AI AGENTS",    C.warm,  C.border);

  // Right panel: Mars orbital scan
  panel(s, 11.10, 2.94, 7.86, 5.58, "▸ MARS // ORBITAL SCAN", "225.0M KM");

  ascii(s, 11.36, 3.68, 7.58, 4.62, [
    "                    ░░░░░░░░░░░░░",
    "               ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░",
    "            ░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░",
    "          ░▒▓▓▓████████████████████▓▓▒░",
    "         ░▒▓██████████████████████████▓▒░",
    "        ░▓█████████  ▓██████▓  █████████▓░",
    "       ░▓███████████▓▓██████▓▓███████████▓░",
    "       ▒███████████████████████████████████▒",
    "       ▒█████████  ▓████████████▓  ████████▒",
    "       ░▓███████████████████████████████████░",
    "        ░▓███████  ████████████████████████░",
    "         ░▒▓███████████████████████████▓▒░",
    "          ░▒▓▓▓████████████████████▓▓▒░",
    "            ░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░",
    "               ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░",
    "                    ░░░░░░░░░░░░░",
    "   ◉ TARGET: SOL-4 / MARS",
    "   ◉ DELTA-V REQ: 11.2 km/s",
    "   ◉ TRANSIT: 202 SOLS",
    "   ◉ COLONISTS: 04 AGENTS ARMED",
  ]);
}

// =====================================================================
// SLIDE 2 — PROBLEM
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "01 // PROBLEM", 1.84);

  eyebrow(s, "01 · PROBLEM", 1.04, 1.04, 7.48);
  headline(s, [
    { text: "GAMES HAVE RUN OUT OF " },
    { text: "SURPRISE", accent: true },
    { text: "." },
  ], { x: 1.04, y: 1.58, w: 7.48, h: 2.0, size: 63 });

  s.addText("DIAGNOSTIC // GENRE FATIGUE", {
    x: 16.53, y: 2.56, w: 2.43, h: 0.72,
    fontFace: FONT, fontSize: 21, color: C.muted, align: "right", margin: 0,
  });

  const errs = [
    { x: 1.04, n: "ERR_ 01", title: "NPCs run state machines.",
      body: "Dialog trees from 1998. Every playthrough is the same 400 lines in a different order." },
    { x: 7.12, n: "ERR_ 02", title: "Worlds pause when you close them.",
      body: "The galaxy politely waits. Nothing is at stake between sessions." },
    { x: 13.21, n: "ERR_ 03", title: "Physics is vibes.",
      body: "Rockets go up because a designer said so. Simulation ends at the skybox." },
  ];
  for (const e of errs) {
    card(s, e.x, 3.91, 5.75, 3.06);
    s.addText(e.n, {
      x: e.x + 0.34, y: 4.25, w: 5.22, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.rust, charSpacing: 2.25, margin: 0,
    });
    s.addText(e.title, {
      x: e.x + 0.34, y: 4.78, w: 5.22, h: 0.91,
      fontFace: FONT, fontSize: 28.5, bold: true, color: C.cream, margin: 0,
    });
    s.addText(e.body, {
      x: e.x + 0.34, y: 5.84, w: 5.22, h: 1.0,
      fontFace: FONT, fontSize: 21, color: C.warm, margin: 0,
    });
  }

  s.addText("▸ PLAYERS NOTICED", {
    x: 1.04, y: 10.11, w: 2.94, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
  divider(s, 4.15, 10.24, 7.80);
  s.addText('Steam sim-genre reviews: "predictable" up 41% YoY', {
    x: 12.20, y: 10.08, w: 6.96, h: 0.38,
    fontFace: FONT, fontSize: 21, color: C.rust, margin: 0,
  });
}

// =====================================================================
// SLIDE 3 — OPPORTUNITY
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "02 // OPPORTUNITY", 2.40);

  eyebrow(s, "02 · OPPORTUNITY", 1.04, 1.04);
  headline(s, [
    { text: "LLM AGENTS FINALLY WORK. GAMES HAVEN'T NOTICED " },
    { text: "YET", accent: true },
    { text: "." },
  ], { x: 1.04, y: 1.58, w: 10.51, h: 2.84, size: 63 });

  s.addText([
    { text: "Compute is cheap enough to give every colonist a brain — and players want worlds that ", options: { color: C.cream, fontFace: FONT, fontSize: 33 } },
    { text: "remember them ", options: { color: C.rust, fontFace: FONT, fontSize: 33 } },
    { text: ".", options: { color: C.cream, fontFace: FONT, fontSize: 33 } },
  ], { x: 1.04, y: 6.10, w: 5.78, h: 2.91, margin: 0 });

  // Right column stat rows
  const stats = [
    { y: 5.11, lbl: "COST / AGENT-HOUR",        big: "$0.004", small: "-94% since 2023" },
    { y: 6.31, lbl: "SIMULATION-GENRE TAM",     big: "$11.8B", small: "+17% CAGR" },
    { y: 7.69, lbl: "STEAM \"AI\" TAG WISHLISTS", big: "4.2M",   small: "2025 cohort" },
    { y: 9.07, lbl: "VR INSTALL BASE (TARGET)", big: "38M",    small: "Q1 '26" },
  ];
  // top divider
  divider(s, 10.72, 4.66, 8.23);
  for (const r of stats) {
    s.addText(r.lbl, {
      x: 10.93, y: r.y, w: 3.22, h: 0.57,
      fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 1.5, margin: 0,
    });
    s.addText(r.big, {
      x: 14.06, y: r.y - 0.26, w: 2.17, h: 0.65,
      fontFace: FONT, fontSize: 33, bold: true, color: C.cream, margin: 0,
    });
    s.addText(r.small, {
      x: 16.06, y: r.y - 0.06, w: 2.69, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.rust, align: "right", margin: 0,
    });
  }
  divider(s, 10.72, 5.86, 8.23);
  divider(s, 10.72, 7.23, 8.23);
  divider(s, 10.72, 8.61, 8.23);
  divider(s, 10.72, 9.78, 8.23);
}

// =====================================================================
// SLIDE 4 — VISION
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "03 // VISION", 1.50, true);

  s.addText("03 · VISION", {
    x: 9.17, y: 1.18, w: 1.66, h: 0.29,
    fontFace: FONT, fontSize: 15, color: C.rust, charSpacing: 3, align: "center", margin: 0,
  });

  headline(s, [
    { text: "A LIVING MARS, RUNNING WHILE YOU SLEEP." },
  ], { x: 2.0, y: 2.30, w: 16.0, h: 4.4, size: 84, align: "center" });

  s.addText("Close the game. The colony keeps breathing, arguing, failing, surviving. Log back in — your agents have stories you didn't write.", {
    x: 5.0, y: 7.40, w: 10.0, h: 1.9,
    fontFace: FONT, fontSize: 28, color: C.warm, align: "center", margin: 0,
  });

  // bottom row tagline: PERSISTENT · AGENTIC · UNWRITTEN
  s.addText("PERSISTENT", {
    x: 7.11, y: 10.01, w: 1.83, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, align: "center", margin: 0,
  });
  s.addText("·", { x: 9.07, y: 10.01, w: 0.19, h: 0.31, fontFace: FONT, fontSize: 16.5, color: C.rust, align: "center", margin: 0 });
  s.addText("AGENTIC", {
    x: 9.39, y: 10.01, w: 1.32, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, align: "center", margin: 0,
  });
  s.addText("·", { x: 10.83, y: 10.01, w: 0.19, h: 0.31, fontFace: FONT, fontSize: 16.5, color: C.rust, align: "center", margin: 0 });
  s.addText("UNWRITTEN", {
    x: 11.15, y: 10.01, w: 1.74, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, align: "center", margin: 0,
  });
}

// =====================================================================
// SLIDE 5 — PRODUCT (WHAT IS BASED)
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "04 // PRODUCT", 1.85);

  eyebrow(s, "04 · WHAT IS BASED", 1.04, 1.04, 8.93);

  headline(s, [
    { text: "MISSION CONTROL FOR A COLONY THAT TALKS BACK." },
  ], { x: 1.04, y: 1.58, w: 8.18, h: 3.6, size: 54 });

  // Three rows: ▸ LABEL + body
  const rows = [
    { y: 5.51, label: "▸ BLUEPRINT", body: "Draft habitats on Earth. Dome, airlocks, solar, hydroponics — constraints are real." },
    { y: 7.12, label: "▸ LAUNCH",    body: "Strap it to a physically-simulated Starship. Trajectory, delta-v, aero, the works." },
    { y: 8.73, label: "▸ LIVE",      body: "Four AI colonists wake up. They argue, ration, build, and sometimes die." },
  ];
  for (const r of rows) {
    s.addText(r.label, {
      x: 1.04, y: r.y, w: 2.38, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.rust, charSpacing: 2.25, margin: 0,
    });
    s.addText(r.body, {
      x: 3.58, y: r.y - 0.09, w: 6.31, h: 1.42,
      fontFace: FONT, fontSize: 25.5, color: C.warm, margin: 0,
    });
  }

  // Right panel: colony overview ascii
  panel(s, 10.29, 1.04, 8.67, 9.37, "▸ COLONY // OVERVIEW", "SECTOR 07");
  ascii(s, 10.55, 1.78, 8.41, 8.41, [
    "    ┌──────────────────────────────────────┐",
    "    │                                      │",
    "    │    ╭──────╮                          │",
    "    │    │ DOME │━━━━━━╮     ◯ SOLAR       │",
    "    │    │  A1  │      ║     ░░░░░░        │",
    "    │    ╰──┬───╯      ║     ░░░░░░        │",
    "    │       ║          ║                   │",
    "    │    ╔══╩══╗    ╔══╩══╗    ╭───────╮   │",
    "    │    ║ HYD ║════║ LOCK║════│ ROVER │   │",
    "    │    ║ ROP ║    ║ 002 ║    │  //12 │   │",
    "    │    ╚══╦══╝    ╚══╦══╝    ╰───────╯   │",
    "    │       ║          ║                   │",
    "    │    ╭──┴───╮   ╭──┴───╮               │",
    "    │    │ POWR │   │ COMM │               │",
    "    │    │ CORE │   │ RELAY│               │",
    "    │    ╰──────╯   ╰──────╯               │",
    "    │                                      │",
    "    │  ► AGENT-01  KAI     [ mining   ]    │",
    "    │  ► AGENT-02  ROSA    [ repair   ]    │",
    "    │  ► AGENT-03  JIN     [ sleeping ]    │",
    "    │  ► AGENT-04  MILO    [ PANIC !! ]    │",
    "    │                                      │",
    "    └──────────────────────────────────────┘",
    "    O2  93% ▮▮▮▮▮▮▮▮▮░   PWR  71% ▮▮▮▮▮▮▮░░░",
    "    H2O 44% ▮▮▮▮░░░░░░   MOOD 61% ▮▮▮▮▮▮░░░░",
  ]);
}

// =====================================================================
// SLIDE 6 — CORE LOOP
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "05 // GAMEPLAY LOOP", 2.71);

  eyebrow(s, "05 · CORE LOOP", 1.04, 1.04);
  headline(s, [
    { text: "THE LOOP." },
  ], { x: 1.04, y: 1.58, w: 18.45, h: 0.87, size: 63 });

  const loop = [
    { x: 1.04, n: "01", arrow: true,  title: "BLUEPRINT", body: "CAD the habitat. Real mass, power, thermal budgets." },
    { x: 4.06, n: "02", arrow: true,  title: "LAUNCH",    body: "Real-physics Starship. Get it to Mars or don't." },
    { x: 7.08, n: "03", arrow: true,  title: "LAND",      body: "Entry, descent, landing. One chance." },
    { x: 10.09, n: "04", arrow: true, title: "LIVE",      body: "Agents boot. They speak, negotiate, improvise." },
    { x: 13.11, n: "05", arrow: true, title: "TELEMETRY", body: "You watch from Earth with a 14-min light-lag." },
    { x: 16.13, n: "06", arrow: false,title: "INTERVENE", body: "Queue orders. Agents decide if they listen." },
  ];
  for (const c of loop) {
    // square card with rust border
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.15, w: 2.83, h: 2.83,
      fill: { color: C.panel }, line: { color: C.rust, width: 0.68 },
    });
    // Big number
    if (c.arrow) {
      s.addText(c.n, {
        x: c.x + 1.0, y: 5.08, w: 1.05, h: 1.0,
        fontFace: FONT, fontSize: 54, bold: true, color: C.rust, margin: 0,
      });
      s.addText("▶", {
        x: c.x + 2.78, y: 5.36, w: 0.33, h: 0.44,
        fontFace: FONT, fontSize: 21, bold: true, color: C.rust, margin: 0,
      });
    } else {
      // last card centers the number
      s.addText(c.n, {
        x: c.x, y: 4.16, w: 2.83, h: 2.83,
        fontFace: FONT, fontSize: 54, bold: true, color: C.rust, align: "center", valign: "middle", margin: 0,
      });
    }
    // label below
    s.addText(c.title, {
      x: c.x, y: 7.12, w: 2.91, h: 0.38,
      fontFace: FONT, fontSize: 19.5, bold: true, color: C.cream, charSpacing: 0.75, margin: 0,
    });
    s.addText(c.body, {
      x: c.x, y: 7.61, w: 2.91, h: 1.0,
      fontFace: FONT, fontSize: 16.5, color: C.warm, margin: 0,
    });
  }

  // Bottom meta row
  s.addText("▸ SESSION: 45–90 MIN", {
    x: 1.04, y: 10.15, w: 3.17, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
  s.addText("▸ COLONY PERSISTENCE: ∞", {
    x: 7.25, y: 10.15, w: 3.96, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
  s.addText("▸ AGENT MORTALITY: PERMANENT", {
    x: 14.21, y: 10.15, w: 4.89, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
}

// =====================================================================
// SLIDE 7 — BLUEPRINT PHASE
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "06 // BLUEPRINT PHASE", 2.92);

  eyebrow(s, "PHASE 1 / 3 · BLUEPRINT", 1.04, 2.12, 8.30);
  headline(s, [
    { text: "DRAFT IT. BUDGET IT. " },
    { text: "PRAY IT HOLDS.", accent: true },
  ], { x: 1.04, y: 2.66, w: 8.18, h: 2.84, size: 63 });

  s.addText("Every module has real mass, power draw, and thermal profile. The sim doesn't forgive for style points.", {
    x: 1.04, y: 5.53, w: 5.78, h: 3.02,
    fontFace: FONT, fontSize: 33, color: C.warm, margin: 0,
  });

  // Three small chips along the bottom-left
  chip(s, 1.04, 8.93, 2.17, 0.41, "MASS: 142.6 T", C.warm,  C.border);
  chip(s, 3.34, 8.93, 1.99, 0.41, "PWR: 8.4 KW",   C.warm,  C.border);
  chip(s, 5.46, 8.93, 2.74, 0.41, "Δ THERMAL: OVER", C.amber, C.amber);

  // Right panel: HAB-07 ascii
  panel(s, 9.69, 1.04, 9.27, 9.37, "▸ BLUEPRINT // HAB-07", "REV 04 · DRAFT");
  ascii(s, 9.95, 1.78, 9.03, 8.41, [
    " ┌─ GRID ─────────────────────────────────────┐",
    " │ · · · · · · · · · · · · · · · · · · · · · │",
    " │ · · · ╭─────────╮ · · ╭─────╮ · · · · · · │",
    " │ · · · │         │ · · │     │ · · · · · · │",
    " │ · · · │  DOME   │═════│ AIR │ · · · · · · │",
    " │ · · · │   A1    │     │LOCK │ · · · · · · │",
    " │ · · · │  [■]    │ · · │ [▣] │ · · · · · · │",
    " │ · · · ╰────┬────╯ · · ╰──┬──╯ · · · · · · │",
    " │ · · · · · ║ · · · · · · ║ · · · · · · · · │",
    " │ · · · ╔═══╩═══╗ · · · ╔═╩═══╗ · · · · · · │",
    " │ · · · ║ HYDRO ║═══════║ POW ║ · · · · · · │",
    " │ · · · ║ PONIC ║       ║ CORE║ · · · · · · │",
    " │ · · · ╚═══════╝ · · · ╚═════╝ · · · · · · │",
    " │ · · · · · · · · · · · · · · · · · · · · · │",
    " └────────────────────────────────────────────┘",
    " [ MASS ]         142.6 T  ▮▮▮▮▮▮▮░░░  71%",
    " [ POWER ]          8.4 KW ▮▮▮▮▮▮▮▮░░  82%",
    " [ THERMAL ]      +218 °C  ▮▮▮▮▮▮▮▮▮▮  !! ",
    " [ CREW CAP ]     4 / 4    ▮▮▮▮▮▮▮▮▮▮ 100%",
    " ⚠ WARN: radiator surface below spec",
  ]);
}

// =====================================================================
// SLIDE 8 — LAUNCH PHASE
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "07 // LAUNCH PHASE", 2.54);

  // Left panel: Starship ascii
  panel(s, 1.04, 1.04, 9.08, 9.37, "▸ LAUNCH // T-00:04.2", "STARSHIP HE-IX");
  ascii(s, 1.30, 1.78, 8.83, 8.41, [
    "                    ▲",
    "                   ╱ ╲",
    "                  ╱   ╲",
    "                 │  ▣  │",
    "                 │     │",
    "                 │ B   │",
    "                 │ A   │",
    "                 │ S   │",
    "                 │ E   │",
    "                 │ D   │",
    "                 │     │",
    "                 ├─────┤",
    "                 │▓▓▓▓▓│",
    "                 │▓▓▓▓▓│",
    "                 ╞═════╡",
    "                 │ === │",
    "                 │═════│",
    "                 ╞═════╡",
    "                 ║     ║",
    "                 ║ ◉ ◉ ║",
    "                 ║     ║",
    "                 ╚═════╝",
    "                  ▽▽▽▽▽",
    "                 ≈≈≈≈≈≈≈",
    "                ≈≈≈≈≈≈≈≈≈",
    "               ≈≈≈≈≈≈≈≈≈≈≈",
    "   T- 04.2   ALT 00142 M    V 062 m/s",
    "   ▮▮▮▮▮▮░░░░ THRUST 74%",
    "   PITCH +02.4°   YAW  -00.1°",
  ]);

  // Right column
  eyebrow(s, "PHASE 2 / 3 · LAUNCH", 10.70, 1.04, 8.50);
  headline(s, [
    { text: "REAL PHYSICS. REAL " },
    { text: "EXPLOSIONS", accent: true },
    { text: "." },
  ], { x: 10.70, y: 1.58, w: 8.18, h: 2.8, size: 54 });

  s.addText("Orbital mechanics, throttle curves, re-entry heating. Miss your window — wait another 26 months in-sim.", {
    x: 10.70, y: 4.50, w: 5.78, h: 2.5,
    fontFace: FONT, fontSize: 28, color: C.warm, margin: 0,
  });

  // 2x2 spec grid
  const specs = [
    { x: 10.70, y: 7.37, lbl: "N-BODY",   val: "6-DOF" },
    { x: 14.90, y: 7.37, lbl: "AERO",     val: "CFD-LITE" },
    { x: 10.70, y: 8.49, lbl: "FUEL",     val: "CRYO MASS" },
    { x: 14.90, y: 8.49, lbl: "TRANSFER", val: "HOHMANN" },
  ];
  for (const sp of specs) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: sp.x, y: sp.y, w: 4.05, h: 0.98,
      fill: { type: "none" }, line: { color: C.border, width: 0.68 },
    });
    s.addText(sp.lbl, {
      x: sp.x + 0.18, y: sp.y + 0.15, w: 3.81, h: 0.31,
      fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 1.5, margin: 0,
    });
    s.addText(sp.val, {
      x: sp.x + 0.18, y: sp.y + 0.48, w: 3.81, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.rust, margin: 0,
    });
  }
}

// =====================================================================
// SLIDE 9 — COLONY PHASE (4 AGENTS)
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "08 // COLONY PHASE", 2.56);

  eyebrow(s, "PHASE 3 / 3 · COLONY", 1.04, 1.04);
  headline(s, [
    { text: "FOUR AGENTS. " },
    { text: "FOUR BRAINS. ", accent: true },
    { text: "ZERO SCRIPTS." },
  ], { x: 1.04, y: 1.58, w: 11.68, h: 2.0, size: 63 });

  const agents = [
    { x: 1.04, color: C.rust,  name: "KAI",  role: "ENGINEER · FOCUSED", quote: '"Radiator\'s shot. Patching with rover plating."',   id: "01" },
    { x: 5.57, color: C.cream, name: "ROSA", role: "BOTANIST · TIRED",   quote: '"Tomato yield halved. We need sunlight, not opinions."', id: "02" },
    { x: 10.10, color: C.cream,name: "JIN",  role: "MEDIC · CALM",       quote: '"Milo\'s vitals are fine. His vibes are not."',      id: "03" },
    { x: 14.64, color: C.amber,name: "MILO", role: "PILOT · PANIC",      quote: '"I keep hearing the airlock cycle. Nobody is in the airlock."', id: "04" },
  ];
  for (const a of agents) {
    // outer card
    card(s, a.x, 3.78, 4.32, 6.82);
    // inner avatar frame (3.80 x 3.80, color-coded border)
    s.addShape(pres.shapes.RECTANGLE, {
      x: a.x + 0.26, y: 4.04, w: 3.80, h: 3.80,
      fill: { type: "none" }, line: { color: a.color, width: 0.68 },
    });
    // robot ascii
    ascii(s, a.x + 0.27, 4.05, 3.90, 3.83, [
      "    ▄▄▄▄▄",
      "  ▄█████████▄",
      " ██  ◉   ◉  ██",
      " ██    ─    ██",
      "  ██  ╰─╯  ██",
      "   ▀██████▀",
      "   ║ " + a.id + "║",
      "   ╚════╝",
    ], a.color, 10.5);
    // name
    s.addText(a.name, {
      x: a.x + 0.26, y: 8.03, w: 3.92, h: 0.52,
      fontFace: FONT, fontSize: 27, bold: true, color: a.color, margin: 0,
    });
    // role
    s.addText(a.role, {
      x: a.x + 0.26, y: 8.56, w: 3.92, h: 0.31,
      fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 1.5, margin: 0,
    });
    divider(s, a.x + 0.26, 9.01, 3.80);
    // quote
    s.addText(a.quote, {
      x: a.x + 0.26, y: 9.17, w: 3.92, h: a.name === "MILO" ? 1.22 : 0.83,
      fontFace: FONT, fontSize: 21, color: C.warm, margin: 0,
    });
  }
}

// =====================================================================
// SLIDE 10 — TECH MOAT
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "09 // TECH MOAT", 2.07);

  eyebrow(s, "09 · MOAT", 1.04, 1.04);
  headline(s, [
    { text: "WE RUN " },
    { text: "REAL ", accent: true },
    { text: "AGENTS, NOT DIALOG TREES." },
  ], { x: 1.04, y: 1.58, w: 10.51, h: 2.0, size: 63 });

  // Left card — Everyone Else
  card(s, 1.04, 3.78, 8.67, 6.08);
  s.addText("▸ EVERYONE ELSE", {
    x: 1.43, y: 4.17, w: 8.13, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
  s.addText("Scripted NPCs", {
    x: 1.43, y: 4.56, w: 8.13, h: 0.63,
    fontFace: FONT, fontSize: 33, bold: true, color: C.warm, margin: 0,
  });
  s.addText([
    { text: "Finite state machines",  options: { fontFace: FONT, fontSize: 21, color: C.muted, breakLine: true } },
    { text: "Pre-written barks",      options: { fontFace: FONT, fontSize: 21, color: C.muted, breakLine: true } },
    { text: "Resets on reload",       options: { fontFace: FONT, fontSize: 21, color: C.muted, breakLine: true } },
    { text: "Designer bottleneck",    options: { fontFace: FONT, fontSize: 21, color: C.muted } },
  ], { x: 1.43, y: 5.44, w: 7.98, h: 1.91, margin: 0, paraSpaceAfter: 4 });

  // Right card — BASED (highlighted)
  card(s, 10.29, 3.78, 8.67, 6.08, C.panel, C.rust, 1.36);
  s.addText("▸ BASED", {
    x: 10.69, y: 4.18, w: 8.12, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.rust, charSpacing: 2.25, margin: 0,
  });
  s.addText("Resident Agents", {
    x: 10.69, y: 4.57, w: 8.12, h: 0.63,
    fontFace: FONT, fontSize: 33, bold: true, color: C.rust, margin: 0,
  });
  s.addText([
    { text: "Frontier LLM per colonist",     options: { fontFace: FONT, fontSize: 21, color: C.cream, breakLine: true } },
    { text: "Persistent memory & grudges",   options: { fontFace: FONT, fontSize: 21, color: C.cream, breakLine: true } },
    { text: "Keep running while offline",    options: { fontFace: FONT, fontSize: 21, color: C.cream, breakLine: true } },
    { text: "Emergent story is the product", options: { fontFace: FONT, fontSize: 21, color: C.cream } },
  ], { x: 10.69, y: 5.45, w: 7.96, h: 1.91, margin: 0, paraSpaceAfter: 4 });

  s.addText("PATENT PENDING // AGENT ORCHESTRATION + COMPRESSION · 94% COST REDUCTION VS NAIVE LOOP", {
    x: 1.04, y: 10.15, w: 18.45, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
}

// =====================================================================
// SLIDE 11 — COMPETITION TABLE
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "10 // COMPETITION", 2.35);

  eyebrow(s, "10 · LANDSCAPE", 1.04, 1.04);
  headline(s, [
    { text: "NOBODY OWNS THIS SQUARE." },
  ], { x: 1.04, y: 1.58, w: 18.45, h: 2.0, size: 63 });

  // header row
  const cols = [
    { x: 5.62, w: 2.88, label: "REAL PHYSICS" },
    { x: 8.83, w: 2.19, label: "AI AGENTS" },
    { x: 11.34, w: 3.82, label: "PERSISTENT WORLD" },
    { x: 15.45, w: 3.35, label: "MULTI-PLATFORM" },
  ];
  divider(s, 1.04, 4.92, 17.92);
  for (const col of cols) {
    s.addText(col.label, {
      x: col.x, y: 4.31, w: col.w, h: 0.42,
      fontFace: FONT, fontSize: 21, bold: true, color: C.muted, charSpacing: 1.5, align: "center", margin: 0,
    });
  }

  // data rows
  const rows = [
    { name: "KSP 2",            y: 5.16, divY: 5.85, marks: [true, false, false, true] },
    { name: "Surviving Mars",   y: 6.09, divY: 6.78, marks: [false, false, true, true] },
    { name: "Stationeers",      y: 7.02, divY: 7.71, marks: [true, false, false, false] },
    { name: "Space Station 14", y: 7.95, divY: 8.64, marks: [false, false, true, false] },
  ];
  for (const row of rows) {
    s.addText(row.name, {
      x: 1.25, y: row.y, w: 4.14, h: 0.51,
      fontFace: FONT, fontSize: 25.5, bold: true, color: C.muted, margin: 0,
    });
    row.marks.forEach((mark, i) => {
      s.addText(mark ? "◉" : "—", {
        x: cols[i].x, y: row.y, w: cols[i].w, h: 0.51,
        fontFace: FONT, fontSize: 25.5, color: mark ? C.cream : C.muted, align: "center", margin: 0,
      });
    });
    divider(s, 1.04, row.divY, 17.92);
  }

  // Highlighted BASED row
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.04, y: 8.65, w: 17.92, h: 0.93,
    fill: { color: C.rust, transparency: 85 }, line: { type: "none" },
  });
  divider(s, 1.04, 9.58, 17.92);
  s.addText("BASED", {
    x: 1.25, y: 8.88, w: 4.14, h: 0.51,
    fontFace: FONT, fontSize: 25.5, bold: true, color: C.rust, margin: 0,
  });
  cols.forEach((col) => {
    s.addText("◉", {
      x: col.x, y: 8.88, w: col.w, h: 0.51,
      fontFace: FONT, fontSize: 25.5, color: C.rust, align: "center", margin: 0,
    });
  });

  s.addText("◉ = ships feature at parity · — = doesn't ship · feature surveyed Q1 '26", {
    x: 1.04, y: 10.14, w: 18.45, h: 0.32,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
}

// =====================================================================
// SLIDE 12 — MARKET / PLATFORMS
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "11 // MARKET", 1.65);

  eyebrow(s, "11 · MARKET & PLATFORMS", 1.04, 1.04);
  headline(s, [
    { text: "THREE LAUNCH LANES, ONE " },
    { text: "AUDIENCE", accent: true },
    { text: "." },
  ], { x: 1.04, y: 1.58, w: 9.34, h: 2.84, size: 63 });

  const platforms = [
    { x: 1.04, label: "◉ PC · STEAM",  big: "132M MAU",     body: "Sim-genre home. Primary launch Q4 '27." },
    { x: 7.10, label: "◉ CONSOLE",     big: "86M PS5+XSX",  body: "Controller-optimized HUD. Follow-on Q2 '28." },
    { x: 13.15, label: "◉ VR",         big: "38M headsets", body: "Stand inside mission control. Flagship demo." },
  ];
  for (const p of platforms) {
    card(s, p.x, 4.61, 5.81, 5.25);
    s.addText(p.label, {
      x: p.x + 0.39, y: 5.00, w: 5.19, h: 0.40,
      fontFace: FONT, fontSize: 21, color: C.rust, charSpacing: 2.25, margin: 0,
    });
    s.addText(p.big, {
      x: p.x + 0.39, y: 5.61, w: 5.19, h: 1.87,
      fontFace: FONT, fontSize: 66, bold: true, color: C.cream, charSpacing: -1.5, margin: 0,
    });
    s.addText(p.body, {
      x: p.x + 0.39, y: 7.69, w: 5.19, h: 0.80,
      fontFace: FONT, fontSize: 21, color: C.warm, margin: 0,
    });
  }
  // highlight VR card top edge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.15, y: 4.61, w: 5.81, h: 0.04,
    fill: { color: C.rust }, line: { type: "none" },
  });

  s.addText("▸ TAM $11.8B SIM + STRATEGY · SAM $2.1B COLONY-SIM · SOM $180M Y3", {
    x: 1.04, y: 10.15, w: 18.45, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
}

// =====================================================================
// SLIDE 13 — BUSINESS MODEL
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "12 // BUSINESS", 1.89);

  eyebrow(s, "12 · BUSINESS MODEL", 1.04, 1.04);
  headline(s, [
    { text: "PAY ONCE. KEEP THE COLONY " },
    { text: "ALIVE", accent: true },
    { text: "." },
  ], { x: 1.04, y: 1.58, w: 9.34, h: 2.0, size: 63 });

  // Three pricing rows with thin rust left bar
  const prices = [
    { y: 3.78, lbl: "BASE GAME",   priceX: 8.33, price: "$39.99",        body: "Premium purchase. Lifetime access to single-colony mode." },
    { y: 5.27, lbl: "SEASON SIMS", priceX: 6.63, price: "$9.99 / season", body: "New biomes, catastrophes, scenarios every 4 months." },
    { y: 6.76, lbl: "ORBITAL PASS",priceX: 7.52, price: "$4.99 / mo",     body: "Cloud-run colony while you're offline. Opt-in, profitable floor." },
  ];
  for (const p of prices) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.04, y: p.y, w: 0.04, h: 1.26,
      fill: { color: C.rust }, line: { type: "none" },
    });
    s.addText(p.lbl, {
      x: 1.31, y: p.y + 0.30, w: 3.5, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.muted, charSpacing: 2.25, margin: 0,
    });
    s.addText(p.price, {
      x: p.priceX, y: p.y + 0.11, w: 3.34, h: 0.63,
      fontFace: FONT, fontSize: 33, bold: true, color: C.rust, margin: 0,
    });
    s.addText(p.body, {
      x: 1.31, y: p.y + 0.78, w: 8.82, h: 0.42,
      fontFace: FONT, fontSize: 21, color: C.warm, margin: 0,
    });
  }

  // Right panel: Year-3 projections
  card(s, 10.70, 3.78, 8.25, 6.63);
  s.addText("▸ YEAR-3 PROJECTIONS", {
    x: 11.09, y: 4.72, w: 7.71, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });
  const proj = [
    { y: 5.39, lbl: "UNITS SOLD",            val: "3.4 M" },
    { y: 6.29, lbl: "ATTACH RATE · SEASONS", val: "41%" },
    { y: 7.19, lbl: "ORBITAL PASS · ACTIVE", val: "220 K" },
    { y: 8.09, lbl: "BLENDED LTV",           val: "$74" },
    { y: 8.98, lbl: "GROSS MARGIN",          val: "82%" },
  ];
  for (const r of proj) {
    s.addText(r.lbl, {
      x: 11.09, y: r.y, w: 4.5, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.warm, charSpacing: 1.5, margin: 0,
    });
    s.addText(r.val, {
      x: 16.4, y: r.y - 0.11, w: 2.26, h: 0.53,
      fontFace: FONT, fontSize: 27, bold: true, color: C.cream, align: "right", margin: 0,
    });
    divider(s, 11.09, r.y + 0.49, 7.49);
  }
}

// =====================================================================
// SLIDE 14 — ROADMAP
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "13 // ROADMAP", 1.87);

  eyebrow(s, "13 · ROADMAP", 1.04, 1.04);
  headline(s, [
    { text: "TWO YEARS TO " },
    { text: "LANDING", accent: true },
    { text: "." },
  ], { x: 1.04, y: 1.58, w: 18.45, h: 0.87, size: 63 });

  // horizontal timeline line
  divider(s, 1.46, 6.68, 17.08);

  const milestones = [
    { x: 2.23, q: "Q2 '26", title: "Closed Alpha",     desc: "Single agent, single dome.",         tag: "LIVE",  active: true },
    { x: 5.85, q: "Q4 '26", title: "Steam Playtest",   desc: "4-agent colony, physics v1.",        tag: "BUILD", active: false },
    { x: 9.48, q: "Q3 '27", title: "Early Access",     desc: "Persistence + Orbital Pass beta.",   tag: "BUILD", active: false },
    { x: 13.10,q: "Q4 '27", title: "1.0 Launch",       desc: "PC + VR, consoles 6 mo later.",      tag: "PLAN",  active: false },
    { x: 16.73,q: "Q3 '28", title: "Season 02: Europa",desc: "New body, new physics, new agents.", tag: "PLAN",  active: false },
  ];
  for (const m of milestones) {
    s.addText(m.q, {
      x: m.x, y: 5.30, w: 1.13, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.muted, charSpacing: 2.25, margin: 0,
    });
    // diamond marker (rotated square)
    s.addShape(pres.shapes.RECTANGLE, {
      x: m.x + 0.38, y: 5.82, w: 0.27, h: 0.27, rotate: 45,
      fill: { color: m.active ? C.rust : C.bgBase },
      line: { color: m.active ? C.rust : C.warm, width: 1.36 },
    });
    s.addText(m.title, {
      x: m.x - 0.56, y: 6.28, w: 2.4, h: 0.41,
      fontFace: FONT, fontSize: 24, bold: true, color: C.cream, align: "center", margin: 0,
    });
    s.addText(m.desc, {
      x: m.x - 0.67, y: 6.83, w: 2.6, h: 0.68,
      fontFace: FONT, fontSize: 16.5, color: C.warm, align: "center", margin: 0,
    });
    // tag chip
    const tagW = m.tag === "LIVE" ? 0.93 : (m.tag === "BUILD" ? 1.13 : 1.03);
    const tagX = m.x + (1.13 - tagW) / 2 + 0.05;
    chip(s, tagX, 7.66, tagW, 0.41, m.tag, m.active ? C.rust : C.warm, m.active ? C.rust : C.border);
  }
}

// =====================================================================
// SLIDE 15 — THE ASK
// =====================================================================
{
  const s = pres.addSlide();
  chrome(s, "14 // THE ASK", 1.69, true);

  eyebrow(s, "14 · THE ASK", 1.04, 2.92, 8.88);

  // Massive $35M
  s.addText("$35M", {
    x: 1.04, y: 3.66, w: 8.33, h: 2.70,
    fontFace: FONT, fontSize: 225, bold: true, color: C.rust, charSpacing: -6, margin: 0,
  });

  s.addText("SERIES A", {
    x: 1.04, y: 6.44, w: 8.88, h: 0.57,
    fontFace: FONT, fontSize: 33, color: C.cream, charSpacing: 3, margin: 0,
  });
  s.addText("24-month runway to 1.0. Lead + strategic slots open.", {
    x: 1.04, y: 7.35, w: 6.30, h: 1.23,
    fontFace: FONT, fontSize: 33, color: C.warm, margin: 0,
  });

  // Right column: Use of funds with tiny progress bars
  s.addText("▸ USE OF FUNDS", {
    x: 10.33, y: 3.17, w: 8.88, h: 0.31,
    fontFace: FONT, fontSize: 16.5, color: C.muted, charSpacing: 2.25, margin: 0,
  });

  const funds = [
    { y: 3.69, lbl: "Engineering (physics + agents)", pct: 48, fillW: 3.64 },
    { y: 4.45, lbl: "Content & narrative design",     pct: 22, fillW: 1.67 },
    { y: 5.20, lbl: "Infra (cloud agent runtime)",    pct: 16, fillW: 1.21 },
    { y: 5.96, lbl: "Marketing & launch",             pct: 10, fillW: 0.76 },
    { y: 6.72, lbl: "G&A",                            pct: 4,  fillW: 0.30 },
  ];
  for (const f of funds) {
    s.addText(f.lbl, {
      x: 10.33, y: f.y, w: 7.81, h: 0.38,
      fontFace: FONT, fontSize: 21, color: C.cream, charSpacing: 0.75, margin: 0,
    });
    // track
    s.addShape(pres.shapes.RECTANGLE, {
      x: 10.33, y: f.y + 0.44, w: 7.58, h: 0.06,
      fill: { color: C.border }, line: { type: "none" },
    });
    // fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: 10.33, y: f.y + 0.44, w: f.fillW, h: 0.06,
      fill: { color: C.rust }, line: { type: "none" },
    });
    s.addText(`${f.pct} %`, {
      x: 18.04, y: f.y, w: 0.92, h: 0.54,
      fontFace: FONT, fontSize: 28.5, bold: true, color: C.rust, align: "right", margin: 0,
    });
  }

  divider(s, 10.33, 7.73, 8.63);
  s.addText("► contact: founders@based.sys", {
    x: 10.33, y: 7.94, w: 8.88, h: 0.38,
    fontFace: FONT, fontSize: 21, color: C.cream, charSpacing: 1.5, margin: 0,
  });
}

// ---------- WRITE ----------
pres.writeFile({ fileName: "Gaming_recreated.pptx" }).then((fn) => {
  console.log("Wrote:", fn);
});
