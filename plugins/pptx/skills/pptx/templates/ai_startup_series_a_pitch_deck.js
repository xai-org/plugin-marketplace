// recreate.js
// Recreates pitch_deck.pptx using pptxgenjs.
//
// Requires: npm install pptxgenjs
// Decorative PNGs (the visual on each slide) live in ./images/
// and are referenced by file path. They were extracted from the
// original .pptx (ppt/media/image-N-1.png) and shipped alongside
// this script so the output is byte-for-byte visually faithful.
//
// Run:  node recreate.js   →  produces pitch_deck.pptx

const path = require("path");
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// ---------- Slide canvas: custom 20" × 11.25" (matches source deck) ----------
pres.defineLayout({ name: "MIRRORLINE", width: 20, height: 11.25 });
pres.layout = "MIRRORLINE";
pres.author = "Mirrorline";
pres.title = "Mirrorline — Series A Pitch Deck";

const SLIDE_W = 20;
const SLIDE_H = 11.25;

// ---------- Design tokens ----------
const FONT = "Arial";
const INK = "000000";

const IMG = (name) => path.join(__dirname, "images", name);

// Caps-style label settings used for the small header / footer / eyebrow rows.
const CAPS = {
  fontFace: FONT,
  fontSize: 18,
  color: INK,
  charSpacing: 4, // approximates the tracked-out caps look
  margin: 0,
};

// ---------- Reusable chrome: top-left logo, top-right section tag, ----------
// bottom-left footer caption, bottom-right page number.
function addChrome(slide, sectionTag, footerLeft, pageNumber) {
  // Top-left logo wordmark
  slide.addText("MIRRORLINE", {
    x: 1.333, y: 0.583, w: 2.5, h: 0.328,
    ...CAPS, align: "left",
  });

  // Top-right section tag (e.g. "02 / 10 · THE PROBLEM")
  if (sectionTag) {
    slide.addText(sectionTag, {
      x: 13.5, y: 0.583, w: 5.55, h: 0.328,
      ...CAPS, align: "right",
    });
  }

  // Bottom-left footer caption
  if (footerLeft) {
    slide.addText(footerLeft, {
      x: 1.042, y: 10.38, w: 12, h: 0.328,
      ...CAPS, align: "left",
    });
  }

  // Bottom-right page number
  if (pageNumber) {
    slide.addText(pageNumber, {
      x: 17.5, y: 10.38, w: 1.55, h: 0.328,
      ...CAPS, align: "right",
    });
  }
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  // Full-bleed decorative artwork (gradient sphere) sits behind everything
  s.addImage({ path: IMG("image-1-1.png"), x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });

  // Top chrome (no section tag here — uses "SERIES A · 2026" instead)
  s.addText("MIRRORLINE", {
    x: 1.333, y: 0.583, w: 2.5, h: 0.328, ...CAPS, align: "left",
  });
  s.addText("SERIES A · 2026", {
    x: 13.5, y: 0.583, w: 5.55, h: 0.328, ...CAPS, align: "right",
  });

  // Eyebrow
  s.addText("PITCH DECK — CONFIDENTIAL", {
    x: 2.062, y: 5.877, w: 6, h: 0.318, ...CAPS, align: "left",
  });

  // Hero wordmark
  s.addText("Mirrorline", {
    x: 1.042, y: 6.534, w: 11.802, h: 2.287,
    fontFace: FONT, fontSize: 165, color: INK, bold: false,
    align: "left", valign: "top", margin: 0,
  });

  // Sub-headline
  s.addText("Ambient computing infrastructure for teams that build with AI.", {
    x: 1.042, y: 9.154, w: 10.729, h: 1.096,
    fontFace: FONT, fontSize: 33, color: INK, align: "left", valign: "top",
    margin: 0,
  });

  // Bottom row
  s.addText("APRIL 2026", {
    x: 1.042, y: 10.38, w: 3, h: 0.328, ...CAPS, align: "left",
  });
  s.addText("MAREN ALDÍS · FOUNDER & CEO", {
    x: 13.5, y: 10.38, w: 5.55, h: 0.328,
    ...CAPS, align: "right",
  });
}

// ============================================================
// SLIDE 2 — The Problem
// ============================================================
{
  const s = pres.addSlide();
  // Right-side scattered shapes artwork
  s.addImage({ path: IMG("image-2-1.png"), x: 9.375, y: 0, w: 11.458, h: 11.25 });

  addChrome(s, "02 / 10 · THE PROBLEM", "SOURCE · MIRRORLINE CUSTOMER INTERVIEWS, N=42", "02");

  // Eyebrow
  s.addText("THE PROBLEM", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  // Big headline. Slightly smaller and wider than the source spec so the
  // four-line render fits cleanly above the stats row at y=7.411 (LibreOffice's
  // line metrics are a hair taller than the source app's).
  s.addText(
    "Teams building with AI are stitching together a dozen tools that were never meant to talk.",
    {
      x: 1.042, y: 3.057, w: 13.5, h: 4.242,
      fontFace: FONT, fontSize: 64, color: INK, align: "left", valign: "top",
      margin: 0,
    }
  );

  // Three stat columns: number + caption
  const stats = [
    { num: "14",    cap: "average tools in an AI workflow before something ships", x: 1.042 },
    { num: "38%",   cap: "of engineering time spent on plumbing, not product",     x: 5.443 },
    { num: "6 wks", cap: "median time-to-prototype for a new internal agent",      x: 9.844 },
  ];
  for (const st of stats) {
    s.addText(st.num, {
      x: st.x, y: 7.411, w: 4.667, h: 1.031,
      fontFace: FONT, fontSize: 54, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(st.cap, {
      x: st.x, y: 8.692, w: 3.95, h: 1.4,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 3 — Market
// ============================================================
{
  const s = pres.addSlide();
  // Concentric-circles artwork, intentionally positioned past the left edge
  s.addImage({ path: IMG("image-3-1.png"), x: -2.083, y: -1.25, w: 14.583, h: 14.583 });

  addChrome(s, "03 / 10 · MARKET", "SOURCES · IDC 2025, GARTNER Q1’26, INTERNAL MODEL", "03");

  s.addText("MARKET CONTEXT", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("A market that is reshaping itself faster than its tooling can keep up.", {
    x: 1.042, y: 3.057, w: 10.515, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // TAM / SAM / SOM rows on the right side. Values are right-aligned
  // against the slide's right margin so the larger figures don't overflow.
  const rows = [
    { label: "TAM",       value: "$184B", lblY: 6.141, valY: 5.625, valSize: 69 },
    { label: "SAM",       value: "$42B",  lblY: 7.486, valY: 7.116, valSize: 57 },
    { label: "SOM (5yr)", value: "$3.1B", lblY: 8.676, valY: 8.446, valSize: 45 },
  ];
  const VALUE_RIGHT_X = 13.5;
  const VALUE_BOX_W = 5.5;
  for (const r of rows) {
    s.addText(r.label, {
      x: 11.042, y: r.lblY, w: 2.5, h: 0.45,
      ...CAPS, align: "left",
    });
    s.addText(r.value, {
      x: VALUE_RIGHT_X, y: r.valY, w: VALUE_BOX_W, h: r.valSize / 50,
      fontFace: FONT, fontSize: r.valSize, color: INK,
      align: "right", valign: "top", margin: 0,
    });
  }

  // Closing caption under the figures
  s.addText(
    "Compounding 41% YoY through 2030 as AI workflows graduate from experimentation to infrastructure.",
    {
      x: 11.042, y: 9.782, w: 7.725, h: 1.0,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    }
  );
}

// ============================================================
// SLIDE 4 — Approach
// ============================================================
{
  const s = pres.addSlide();
  // Full-bleed wave-lines artwork
  s.addImage({ path: IMG("image-4-1.png"), x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });

  addChrome(s, "04 / 10 · APPROACH", "ARCHITECTURE · MIRRORLINE RUNTIME", "04");

  s.addText("OUR APPROACH", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("A single substrate that unifies models, memory, and tools — under one runtime.", {
    x: 1.042, y: 3.057, w: 12.875, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Three-column pillar list
  const cols = [
    { x: 1.042,  head: "01 — RUNTIME", body: "A fabric for model calls, retrieval, and tools — observable end-to-end." },
    { x: 7.222,  head: "02 — MEMORY",  body: "Durable, queryable context shared across agents and surfaces." },
    { x: 13.403, head: "03 — SURFACE", body: "SDKs and adapters that meet teams where they already work." },
  ];
  for (const c of cols) {
    s.addText(c.head, {
      x: c.x, y: 7.824, w: 5.722, h: 0.45,
      ...CAPS, align: "left",
    });
    s.addText(c.body, {
      x: c.x, y: 8.42, w: 5.722, h: 1.6,
      fontFace: FONT, fontSize: 25.5, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 5 — Product
// ============================================================
{
  const s = pres.addSlide();
  // Right-side adoption-curve chart artwork
  s.addImage({ path: IMG("image-5-1.png"), x: 9.792, y: 2.5, w: 9.167, h: 7.292 });

  addChrome(s, "05 / 10 · PRODUCT", "ADOPTION CURVE · PILOT COHORT, WEEKS 1–12", "05");

  s.addText("PRODUCT", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("One workspace. Every model. Every tool. Every artifact a team produces.", {
    x: 1.042, y: 3.057, w: 8.583, h: 2.4,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Arrow + bullet rows
  const items = [
    { y: 6.34, text: "Drop-in SDKs for Python, TypeScript, and Go" },
    { y: 7.588, text: "Live evals, replays, and observability across every run" },
    { y: 8.835, text: "Pluggable providers — bring your own model and policy" },
  ];
  for (const it of items) {
    s.addText("→", {
      x: 1.042, y: it.y + 0.057, w: 0.708, h: 0.45,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(it.text, {
      x: 1.917, y: it.y, w: 7.253, h: 1.0,
      fontFace: FONT, fontSize: 25.5, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 6 — Traction
// ============================================================
{
  const s = pres.addSlide();
  // Bottom growth-bars artwork strip
  s.addImage({ path: IMG("image-6-1.png"), x: 0, y: 7.708, w: SLIDE_W, h: 3.542 });

  addChrome(s, "06 / 10 · TRACTION", "AS OF Q1 2026 · UNAUDITED", "06");

  s.addText("TRACTION", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("Twelve months of compounding usage, revenue, and team count.", {
    x: 1.042, y: 3.057, w: 11.802, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Four KPI columns: label / big value / sub
  const kpis = [
    { x: 1.042,  lbl: "ARR",       val: "$4.2M", sub: "+38% MoM (last 6 mo)" },
    { x: 5.677,  lbl: "Customers", val: "147",   sub: "14 enterprise design partners" },
    { x: 10.312, lbl: "NDR",       val: "168%",  sub: "Cohort, T12" },
    { x: 14.948, lbl: "Runs / mo", val: "2.1B",  sub: "9× YoY" },
  ];
  for (const k of kpis) {
    s.addText(k.lbl, {
      x: k.x, y: 5.332, w: 4.131, h: 0.45,
      ...CAPS, align: "left",
    });
    s.addText(k.val, {
      x: k.x, y: 5.824, w: 4.131, h: 0.95,
      fontFace: FONT, fontSize: 72, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(k.sub, {
      x: k.x, y: 7.0, w: 4.131, h: 0.45,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 7 — Business Model
// ============================================================
{
  const s = pres.addSlide();
  // Top-right concentric-diamonds artwork
  s.addImage({ path: IMG("image-7-1.png"), x: 9.792, y: -1.25, w: 11.458, h: 11.458 });

  addChrome(s, "07 / 10 · BUSINESS MODEL", "UNIT ECONOMICS · Q1’26 COHORT", "07");

  s.addText("BUSINESS MODEL", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("Usage-based pricing on the runtime, with seat licenses for the workspace.", {
    x: 1.042, y: 3.057, w: 11.802, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Three pricing tiers — big number + small unit suffix as rich-text run pair
  const tiers = [
    { x: 1.042,  lbl: "RUNTIME",   big: "$0.0008", suf: "/ call",       sub: "Volume-tiered, no minimums",       w: 5.711 },
    { x: 7.431,  lbl: "WORKSPACE", big: "$45",     suf: "/ seat / mo",  sub: "Standard tier; Enterprise from $90", w: 5.282 },
    { x: 13.403, lbl: "PLATFORM",  big: "$120k+",  suf: "/ yr",         sub: "Dedicated, VPC, SLAs",             w: 5.722 },
  ];
  for (const t of tiers) {
    s.addText(t.lbl, {
      x: t.x, y: 6.554, w: t.w, h: 0.45,
      ...CAPS, align: "left",
    });
    s.addText(
      [
        { text: t.big, options: { fontSize: 48 } },
        { text: t.suf, options: { fontSize: 21 } },
      ],
      {
        x: t.x, y: 7.108, w: t.w, h: 0.95,
        fontFace: FONT, color: INK, align: "left", valign: "top", margin: 0,
      }
    );
    s.addText(t.sub, {
      x: t.x, y: 7.887, w: t.w, h: 0.6,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
  }

  // Three small economics call-outs
  const econ = [
    { x: 1.042,  text: "Gross margin · 78% at scale" },
    { x: 9.134,  text: "CAC payback · 9 months" },
    { x: 16.84,  text: "LTV/CAC · 6.4×" },
  ];
  for (const e of econ) {
    s.addText(e.text, {
      x: e.x, y: 9.378, w: 4, h: 0.5,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 8 — Competition
// ============================================================
{
  const s = pres.addSlide();
  // Right-side competitor bubble plot artwork
  s.addImage({ path: IMG("image-8-1.png"), x: 10.625, y: 2.5, w: 8.542, h: 7.5 });

  addChrome(s, "08 / 10 · COMPETITION", "COMPETITIVE LANDSCAPE · APRIL 2026", "08");

  s.addText("COMPETITION", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("Point tools cover slices. We cover the whole stack — without flattening it.", {
    x: 1.042, y: 3.057, w: 8.583, h: 2.4,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "Most competitors specialize in observability, orchestration, or memory. " +
    "Mirrorline integrates the three around a single runtime — the only category " +
    "where depth and breadth compound rather than compete.",
    {
      x: 1.042, y: 7.047, w: 7.94, h: 2.5,
      fontFace: FONT, fontSize: 25.5, color: INK, align: "left", valign: "top", margin: 0,
    }
  );
}

// ============================================================
// SLIDE 9 — Team
// ============================================================
{
  const s = pres.addSlide();
  // Right-side overlapping-circles artwork
  s.addImage({ path: IMG("image-9-1.png"), x: 11.667, y: 2.917, w: 9.375, h: 9.375 });

  addChrome(s, "09 / 10 · TEAM", "+ 22 ENGINEERS, DESIGNERS, AND RESEARCHERS ACROSS 6 CITIES", "09");

  s.addText("THE TEAM", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("A founding team that has shipped infrastructure used by millions.", {
    x: 1.042, y: 3.057, w: 11.802, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Three founder cards
  const team = [
    { x: 1.042,  name: "Maren Aldís", role: "Founder & CEO",            prev: "Prev. Staff Eng, Helio · MIT" },
    { x: 6.472,  name: "Jonas Behr",  role: "Cofounder & CTO",          prev: "Prev. Principal, Lumen Labs · ETH" },
    { x: 11.903, name: "Priya Ravan", role: "Cofounder & Head of Product", prev: "Prev. PM Lead, Northpath · Stanford" },
  ];
  for (const m of team) {
    s.addText(m.name, {
      x: m.x, y: 8.041, w: 4.907, h: 0.6,
      fontFace: FONT, fontSize: 33, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(m.role, {
      x: m.x, y: 8.605, w: 4.907, h: 0.45,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
    s.addText(m.prev, {
      x: m.x, y: 9.055, w: 4.907, h: 0.45,
      fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
    });
  }
}

// ============================================================
// SLIDE 10 — The Ask
// ============================================================
{
  const s = pres.addSlide();
  // Full-bleed faint concentric-arcs artwork
  s.addImage({ path: IMG("image-10-1.png"), x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });

  addChrome(s, "10 / 10 · THE ASK", null, null);

  s.addText("THE ASK", {
    x: 2.062, y: 2.401, w: 5, h: 0.318, ...CAPS, align: "left",
  });

  s.addText("Raising $32M Series A to scale the runtime and meet enterprise demand.", {
    x: 1.042, y: 3.057, w: 13.948, h: 1.5,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Bottom 4-column summary: USE OF FUNDS / RUNWAY / HIRES / CONTACT
  // First column has caption text underneath, others have a big stat.
  s.addText("USE OF FUNDS", { x: 1.042,  y: 7.921, w: 4.721, h: 0.45, ...CAPS, align: "left" });
  s.addText("50% Engineering · 25% GTM · 15% Research · 10% Ops", {
    x: 1.042, y: 8.975, w: 4.721, h: 1.2,
    fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
  });

  s.addText("RUNWAY", { x: 6.25, y: 7.921, w: 3.934, h: 0.45, ...CAPS, align: "left" });
  s.addText("28 mo", {
    x: 6.25, y: 8.475, w: 3.934, h: 0.85,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  s.addText("HIRES (Y1)", { x: 10.694, y: 7.921, w: 3.934, h: 0.45, ...CAPS, align: "left" });
  s.addText("+34", {
    x: 10.694, y: 8.475, w: 3.934, h: 0.85,
    fontFace: FONT, fontSize: 48, color: INK, align: "left", valign: "top", margin: 0,
  });

  s.addText("CONTACT", { x: 15.139, y: 7.921, w: 3.934, h: 0.45, ...CAPS, align: "left" });
  s.addText("maren@mirrorline.co  +1 415 555 0142", {
    x: 15.139, y: 8.475, w: 3.934, h: 1.0,
    fontFace: FONT, fontSize: 21, color: INK, align: "left", valign: "top", margin: 0,
  });

  // Closing line + custom page number ("10 / 10" instead of plain "10")
  s.addText("THANK YOU.", {
    x: 1.042, y: 10.38, w: 5, h: 0.328, ...CAPS, align: "left",
  });
  s.addText("10 / 10", {
    x: 13.5, y: 10.38, w: 5.55, h: 0.328, ...CAPS, align: "right",
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "pitch_deck.pptx" }).then((name) => {
  console.log("Wrote", name);
});
