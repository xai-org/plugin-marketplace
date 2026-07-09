// generate_clothes.js
// Replicates Clothes.pptx using pptxgenjs.
// Slide size: 20" x 11.25" (custom). Run: node generate_clothes.js

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Custom 20" × 11.25" layout (matches the original 18288000 × 10287000 EMU)
pres.defineLayout({ name: "CUSTOM_20x11", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11";
pres.title = "Clothes Lookbook";

// ----- Palette -----
const C_BG = "F2EFE8";          // cream paper
const C_INK = "0E0E10";         // near-black ink
const C_RED = "E63946";         // siren red accent
const C_BROWN = "7A5C3A";       // field brown
const C_BLUE = "1F3A8A";        // cobalt
const C_ACID = "C8FF3E";        // acid yellow-green
const C_BONE = "F2EFE8";        // bone (= bg)
const C_BAND = "EDE7D4";        // table alt-row

// ----- Fonts -----
const F_MONO = "Courier New";
const F_DISP = "Impact";
const F_SERIF = "Georgia";

// Convenience: footer for content slides
function addContentFooter(slide, pageNum) {
  // top horizontal rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 1.2865, w: 17.9167, h: 0.0312,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });
  // bottom horizontal rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 10.4688, w: 17.9167, h: 0.0208,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });
  slide.addText("CUT & SEW · S/S 26", {
    x: 1.0417, y: 10.5938, w: 2.7838, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left",
    margin: 0, valign: "top",
  });
  slide.addText(`${pageNum} / 10`, {
    x: 17.9081, y: 10.5938, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left",
    margin: 0, valign: "top",
  });
}

function addSlideHeader(slide, leftLabel, rightLabel) {
  slide.addText(leftLabel, {
    x: 1.0417, y: 0.8333, w: 8, h: 0.349,
    fontFace: F_MONO, fontSize: 19.5, color: C_INK, align: "left",
    margin: 0, valign: "top",
  });
  slide.addText(rightLabel, {
    x: 11.04, y: 0.8333, w: 7.92, h: 0.349,
    fontFace: F_MONO, fontSize: 19.5, color: C_INK, align: "right",
    margin: 0, valign: "top",
  });
}

// ===========================================================================
// SLIDE 1 — Cover
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };

  // Dark backdrop covering full slide (ink with cream 30% overlay = warm dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 20, h: 11.25,
    fill: { color: C_BG, transparency: 70 }, line: { color: C_INK, width: 0 },
  });

  // Top-left strapline
  s.addText("CUT & SEW STUDIO · EST. 2021 · BROOKLYN NY", {
    x: 1.0417, y: 0.6875, w: 6.7064, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });

  // Top-right boxed lockup
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.1075, y: 0.625, w: 5.8508, h: 0.4062,
    fill: { type: "none" }, line: { color: C_INK, width: 1.5 },
  });
  s.addText("LOOKBOOK · VOL. 06 · SPRING 2026", {
    x: 13.2325, y: 0.6875, w: 5.7764, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 9,
    align: "left", margin: 0, valign: "top",
  });

  // Massive title — "CUT &" / "SEW."
  s.addText("CUT &", {
    x: 1.0417, y: 1.5, w: 13.7333, h: 3.4,
    fontFace: F_DISP, fontSize: 200, color: C_INK, charSpacing: 10,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("SEW.", {
    x: 1.0417, y: 4.65, w: 13.7333, h: 3.4,
    fontFace: F_DISP, fontSize: 200, color: C_RED, charSpacing: 10,
    align: "left", margin: 0, valign: "top",
  });

  // Red badge (rotated -12°) — "6 NEW HOODIES" — single line each, wider boxes
  s.addShape(pres.shapes.OVAL, {
    x: 17.0833, y: 2.7083, w: 1.875, h: 1.875,
    fill: { color: C_RED }, line: { color: C_RED, width: 0 },
    rotate: -12,
  });
  s.addText("6", {
    x: 17.1, y: 2.85, w: 1.85, h: 0.55,
    fontFace: F_DISP, fontSize: 28, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });
  s.addText("NEW", {
    x: 17.1, y: 3.32, w: 1.85, h: 0.5,
    fontFace: F_DISP, fontSize: 22, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });
  s.addText("HOODIES", {
    x: 17.1, y: 3.78, w: 1.85, h: 0.55,
    fontFace: F_DISP, fontSize: 22, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });

  // Tagline (italic)
  s.addText(
    "A small-batch hoodie label printing zine-grade graphics on heavyweight fleece — six drops, one season, no restocks.",
    {
      x: 1.0417, y: 8.5, w: 9.0125, h: 1.15,
      fontFace: F_SERIF, fontSize: 22, italic: true, color: C_INK,
      align: "left", margin: 0, valign: "top",
    }
  );

  // Right-side credits
  s.addText("PRESENTED BY", {
    x: 14.5, y: 8.5, w: 4.5, h: 0.32,
    fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
    align: "right", margin: 0, valign: "top",
  });
  s.addText("MAYA OKAFOR", {
    x: 14.5, y: 8.78, w: 4.5, h: 0.65,
    fontFace: F_DISP, fontSize: 28, color: C_INK, charSpacing: 1.4,
    align: "right", margin: 0, valign: "top",
  });
  s.addText("FOUNDER & PRINT DIRECTOR", {
    x: 14.5, y: 9.4, w: 4.5, h: 0.32,
    fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
    align: "right", margin: 0, valign: "top",
  });

  // Bottom dark ticker band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 9.85, w: 20, h: 1.4,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });

  // Marquee text — alternating cream and red bullets (single line)
  const drops = ["STATIC BLOOM", "NIGHT CHANNEL", "CARTOGRAPH", "OFF-REGISTER", "SOFT MACHINE", "LONG STORY"];
  const marqueeRuns = [];
  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < drops.length; i++) {
      marqueeRuns.push({ text: drops[i] + " ", options: { color: C_BG, fontFace: F_DISP, fontSize: 32 } });
      marqueeRuns.push({ text: "● ", options: { color: C_RED, fontFace: F_DISP, fontSize: 32 } });
    }
  }
  s.addText(marqueeRuns, {
    x: 0.3, y: 10.0, w: 30, h: 1.1,
    align: "left", margin: 0, valign: "middle",
  });
}

// ===========================================================================
// SLIDE 2 — The House Style
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "02 / THE HOUSE STYLE", "S/S 2026 · LOOKBOOK");
  addContentFooter(s, "02");

  // Big two-line title
  s.addText(
    [
      { text: "LOUD GRAPHICS. QUIET ", options: { color: C_INK, fontFace: F_DISP, fontSize: 68, charSpacing: 3.4 } },
      { text: "CONSTRUCTION.", options: { color: C_RED, fontFace: F_DISP, fontSize: 68, charSpacing: 3.4 } },
    ],
    { x: 1.0417, y: 1.85, w: 9.5, h: 5.2, align: "left", margin: 0, valign: "top" }
  );

  // Body paragraph
  s.addText(
    "Every hoodie starts as a 16-page risograph zine. We pull what works, blow it up to 14 inches, and hand-screen it onto 480 gsm cotton fleece. The result reads loud at thirty feet and rewards a closer look.",
    {
      x: 1.0417, y: 5.5, w: 9.2, h: 1.7,
      fontFace: F_SERIF, fontSize: 18, color: C_INK,
      align: "left", margin: 0, valign: "top", paraSpaceAfter: 4,
    }
  );

  // 2x2 stat grid
  const stats = [
    { x: 10.8234, y: 1.9427, num: "480", label: "GSM FLEECE", body: "Heavyweight loop-back cotton, milled in Portugal. Garment-dyed." },
    { x: 15.0159, y: 1.9427, num: "6 COL.", label: "WATER-BASE INK", body: "Plastisol-free. Hand-mixed Pantone, pulled wet-on-wet on a manual press." },
    { x: 10.8234, y: 4.5, num: "YKK", label: "HARDWARE", body: "Brass eyelets, waxed flat drawcord, double-needle topstitch." },
    { x: 15.0159, y: 4.5, num: "405", label: "TOTAL PIECES", body: "Six numbered editions. No restocks. Ships from Brooklyn." },
  ];
  for (const it of stats) {
    s.addText(it.num, {
      x: it.x, y: it.y, w: 4.0607, h: 1.0,
      fontFace: F_DISP, fontSize: 56, color: C_INK, charSpacing: 2.8,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(it.label, {
      x: it.x, y: it.y + 1.05, w: 4.0607, h: 0.32,
      fontFace: F_MONO, fontSize: 16, color: C_INK, charSpacing: 1.6,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(it.body, {
      x: it.x, y: it.y + 1.42, w: 4.0607, h: 1.2,
      fontFace: F_SERIF, fontSize: 16, color: C_INK,
      align: "left", margin: 0, valign: "top",
    });
  }

  // Color swatches row
  const swatches = [
    { fill: C_INK,   label: "INK",    text: C_INK },
    { fill: C_BONE,  label: "BONE",   text: C_INK },
    { fill: C_RED,   label: "SIREN",  text: C_INK },
    { fill: C_BLUE,  label: "COBALT", text: C_INK },
    { fill: C_ACID,  label: "ACID",   text: C_INK },
    { fill: C_BROWN, label: "FIELD",  text: C_INK },
  ];
  swatches.forEach((sw, i) => {
    const sx = 1.0417 + i * 3.0173;
    s.addShape(pres.shapes.RECTANGLE, {
      x: sx, y: 7.4201, w: 2.8923, h: 2.8923,
      fill: { color: sw.fill }, line: { color: C_INK, width: 2.25 },
    });
    // small label tag
    s.addShape(pres.shapes.RECTANGLE, {
      x: sx + 0.115, y: 9.8333, w: 1.15, h: 0.3646,
      fill: { color: C_BG }, line: { color: C_INK, width: 1.5 },
    });
    s.addText(sw.label, {
      x: sx + 0.22, y: 9.8749, w: 1.05, h: 0.32,
      fontFace: F_MONO, fontSize: 18, color: sw.text,
      align: "left", margin: 0, valign: "top",
    });
  });
}

// ===========================================================================
// SLIDE 3 — Drops 01–03 (graphic half)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "03 / DROPS 01 — 03", "THE GRAPHIC HALF");
  addContentFooter(s, "03");

  // ---- Card 1: STATIC BLOOM (cream-on-cream) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: "E8E3D6" }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("STATIC BLOOM", {
    x: 1.2188, y: 1.9948, w: 4, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 001", {
    x: 5.4394, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  s.addText("BLOOM", {
    x: 1.276, y: 3.6328, w: 5.1564, h: 1.4,
    fontFace: F_DISP, fontSize: 88, color: C_RED, charSpacing: 4.4,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("/ / STATIC / /", {
    x: 1.276, y: 5.0911, w: 5.1564, h: 0.474,
    fontFace: F_DISP, fontSize: 25.5, color: C_INK, charSpacing: 1.3,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("01", {
    x: 5.4, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_INK, align: "right", margin: 0, valign: "bottom",
  });

  // ---- Card 2: NIGHT CHANNEL (dark) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.1875, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: C_INK }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("NIGHT CHANNEL", {
    x: 7.3646, y: 1.9948, w: 4.2, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 002", {
    x: 11.5852, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  // Test pattern frame (cream w/ ~55% transparency = subtle)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5938, y: 2.4948, w: 4.8125, h: 3.4375,
    fill: { color: C_BG, transparency: 45 }, line: { color: C_INK, width: 0 },
  });
  s.addText("02", {
    x: 7.1353, y: 3.4271, w: 5.7294, h: 1.9167,
    fontFace: F_DISP, fontSize: 150, color: C_RED, charSpacing: 7.5,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("— TEST PATTERN —", {
    x: 7.1353, y: 5.4479, w: 5.7294, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, charSpacing: 1.8,
    align: "center", margin: 0, valign: "top",
  });
  s.addText("02", {
    x: 11.62, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_BG, align: "right", margin: 0, valign: "bottom",
  });

  // ---- Card 3: CARTOGRAPH (brown) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.3333, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: C_BROWN }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("CARTOGRAPH", {
    x: 13.5104, y: 1.9948, w: 4.2, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 003", {
    x: 17.731, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  s.addText("CARTOGRAPH", {
    x: 13.2811, y: 4.0302, w: 5.7294, h: 0.85,
    fontFace: F_DISP, fontSize: 48, color: C_BG, charSpacing: 2.4,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("N 40°41′ · W 73°59′", {
    x: 13.2811, y: 4.95, w: 5.7294, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, charSpacing: 1.8,
    align: "center", margin: 0, valign: "top",
  });
  s.addText("03", {
    x: 17.7, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_BG, align: "right", margin: 0, valign: "bottom",
  });

  // ---- Captions under all three cards ----
  const captions = [
    { x: 1.0417, name: "STATIC BLOOM", desc: "Halftone flower in CRT noise. Six-color front, single-color sleeve hit.", body: "Bone fleece", edition: "80 pieces · USD 168" },
    { x: 7.1875, name: "NIGHT CHANNEL", desc: "Test-pattern grid that glows under streetlight. Reflective ink.", body: "Ink fleece · midnight cotton", edition: "60 pieces · USD 184" },
    { x: 13.3333, name: "CARTOGRAPH", desc: "USGS topographic contours over field-brown fleece. Brooklyn coords.", body: "Field brown", edition: "100 pieces · USD 158" },
  ];
  for (const c of captions) {
    s.addText(c.name, {
      x: c.x, y: 7.55, w: 5.7938, h: 0.55,
      fontFace: F_DISP, fontSize: 32, color: C_INK, charSpacing: 1.6,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.desc, {
      x: c.x, y: 8.18, w: 5.7938, h: 0.7,
      fontFace: F_SERIF, fontSize: 16, italic: true, color: C_INK,
      align: "left", margin: 0, valign: "top",
    });
    s.addText("BODY", {
      x: c.x, y: 9.18, w: 5.7938, h: 0.3229,
      fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.body, {
      x: c.x, y: 9.46, w: 5.7938, h: 0.3666,
      fontFace: F_SERIF, fontSize: 16, color: C_INK, align: "left", margin: 0, valign: "top",
    });
    s.addText("EDITION", {
      x: c.x, y: 9.85, w: 5.7938, h: 0.3229,
      fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.edition, {
      x: c.x, y: 10.13, w: 5.7938, h: 0.3666,
      fontFace: F_SERIF, fontSize: 16, color: C_INK, align: "left", margin: 0, valign: "top",
    });
  }
}

// ===========================================================================
// SLIDE 4 — Drops 04–06 (editorial half)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "04 / DROPS 04 — 06", "THE EDITORIAL HALF");
  addContentFooter(s, "04");

  // ---- Card 4: OFF-REGISTER (cream) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: C_BG }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("OFF-REGISTER", {
    x: 1.2188, y: 1.9948, w: 4, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 004", {
    x: 5.4394, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  // misregistered RIOT — three offset layers
  s.addText("RIOT", {
    x: 1.6, y: 3.1146, w: 4.5, h: 1.4,
    fontFace: F_DISP, fontSize: 90, color: "00B7C2", charSpacing: 4.5,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("RIOT", {
    x: 1.8, y: 2.9688, w: 4.5, h: 1.4,
    fontFace: F_DISP, fontSize: 90, color: C_RED, charSpacing: 4.5,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("RIOT", {
    x: 1.7, y: 3.0312, w: 4.5, h: 1.4,
    fontFace: F_DISP, fontSize: 90, color: C_INK, charSpacing: 4.5,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText("CMY · NO TWO ALIKE", {
    x: 0.9895, y: 5.8438, w: 5.7294, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "center", margin: 0, valign: "top",
  });
  s.addText("04", {
    x: 5.45, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_INK, align: "right", margin: 0, valign: "bottom",
  });
  // tilted MISPRINT stamp
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.7188, y: 2.4948, w: 1.7292, h: 0.6354,
    fill: { color: C_BG }, line: { color: C_RED, width: 3 },
    rotate: -9,
  });
  s.addText("MISPRINT", {
    x: 4.9, y: 2.62, w: 1.45, h: 0.42,
    fontFace: F_DISP, fontSize: 22.5, color: C_RED, charSpacing: 6.75,
    align: "left", margin: 0, valign: "middle",
    rotate: -9,
  });

  // ---- Card 5: SOFT MACHINE (acid) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.1875, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: C_ACID }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("SOFT MACHINE", {
    x: 7.3646, y: 1.9948, w: 4.2, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 005", {
    x: 11.5852, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, align: "left", margin: 0, valign: "top",
  });
  // Decorative "exploded view" diagram — line + small circles centered in card
  const dgX = 9.0, dgY = 3.4, dgW = 1.9, dgH = 2.0;
  // central body
  s.addShape(pres.shapes.OVAL, { x: dgX + 0.65, y: dgY + 0.85, w: 0.6, h: 0.6, fill: { type: "none" }, line: { color: C_INK, width: 2 } });
  // four spokes
  s.addShape(pres.shapes.LINE, { x: dgX + 0.95, y: dgY + 0.05, w: 0, h: 0.85, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.LINE, { x: dgX + 0.95, y: dgY + 1.45, w: 0, h: 0.5, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.LINE, { x: dgX + 0.05, y: dgY + 1.15, w: 0.65, h: 0, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.LINE, { x: dgX + 1.25, y: dgY + 1.15, w: 0.65, h: 0, line: { color: C_INK, width: 2 } });
  // satellite circles
  s.addShape(pres.shapes.OVAL, { x: dgX + 0.85, y: -0.1 + dgY, w: 0.2, h: 0.2, fill: { type: "none" }, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.OVAL, { x: dgX + 0.85, y: dgY + 1.95, w: 0.2, h: 0.2, fill: { type: "none" }, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.OVAL, { x: dgX - 0.05, y: dgY + 1.05, w: 0.2, h: 0.2, fill: { type: "none" }, line: { color: C_INK, width: 2 } });
  s.addShape(pres.shapes.OVAL, { x: dgX + 1.85, y: dgY + 1.05, w: 0.2, h: 0.2, fill: { type: "none" }, line: { color: C_INK, width: 2 } });
  s.addText("05", {
    x: 11.55, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_INK, align: "right", margin: 0, valign: "bottom",
  });

  // ---- Card 6: LONG STORY (cobalt with essay) ----
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.3333, y: 1.8385, w: 5.625, h: 5.4792,
    fill: { color: C_BLUE }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("LONG STORY", {
    x: 13.5104, y: 1.9948, w: 4.2, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  s.addText("SKU 006", {
    x: 17.731, y: 1.9948, w: 1.1335, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_BG, align: "left", margin: 0, valign: "top",
  });
  s.addText(
    "The first hoodie I owned was my brother's. It was too big and it smelled like the back of a car. Hands learn the shape of a thing before the brain does. The cuff is where the hand decides if it trusts a fabric. The hood is where the head decides if it trusts the weather. The pocket is where the hand decides if it has somewhere to be. Everything else is editorial. We made forty of these because forty is a number we can sign without shaking. We made them blue because blue is the color of a long story being told slowly. We printed the words on the back so that when someone asks what it says, you have to take it off. The hoodie is not the story. The hoodie is the room the story sits in. Hello from there. Hello from here.",
    {
      x: 13.6146, y: 2.4948, w: 5.2144, h: 3.8958,
      fontFace: F_MONO, fontSize: 8.25, color: C_BG, charSpacing: 0.85,
      align: "justify", margin: 0, valign: "top",
    }
  );
  s.addText("06", {
    x: 17.7, y: 6.25, w: 1.2, h: 1.0,
    fontFace: F_DISP, fontSize: 60, color: C_BG, align: "right", margin: 0, valign: "bottom",
  });

  // Captions under all three cards
  const captions = [
    { x: 1.0417, name: "OFF-REGISTER", desc: "Intentionally misregistered CMY. The misprint is the print.", body: "Bone fleece", edition: "50 unique pieces · USD 220" },
    { x: 7.1875, name: "SOFT MACHINE", desc: "Exploded-view diagram of \"the maker,\" single-line ink on acid fleece.", body: "Acid yellow-green", edition: "75 pieces · USD 174" },
    { x: 13.3333, name: "LONG STORY", desc: "A 600-word essay about hands, printed across the entire back.", body: "Cobalt", edition: "40 pieces · USD 198" },
  ];
  for (const c of captions) {
    s.addText(c.name, {
      x: c.x, y: 7.55, w: 5.7938, h: 0.55,
      fontFace: F_DISP, fontSize: 32, color: C_INK, charSpacing: 1.6,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.desc, {
      x: c.x, y: 8.18, w: 5.7938, h: 0.7,
      fontFace: F_SERIF, fontSize: 16, italic: true, color: C_INK,
      align: "left", margin: 0, valign: "top",
    });
    s.addText("BODY", {
      x: c.x, y: 9.18, w: 5.7938, h: 0.3229,
      fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.body, {
      x: c.x, y: 9.46, w: 5.7938, h: 0.3666,
      fontFace: F_SERIF, fontSize: 16, color: C_INK, align: "left", margin: 0, valign: "top",
    });
    s.addText("EDITION", {
      x: c.x, y: 9.85, w: 5.7938, h: 0.3229,
      fontFace: F_MONO, fontSize: 14, color: C_INK, charSpacing: 1.4,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.edition, {
      x: c.x, y: 10.13, w: 5.7938, h: 0.3666,
      fontFace: F_SERIF, fontSize: 16, color: C_INK, align: "left", margin: 0, valign: "top",
    });
  }
}

// ===========================================================================
// SLIDE 5 — Size & Fit
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "05 / SIZE & FIT", "ALL BODIES, ONE BLOCK");
  addContentFooter(s, "05");

  s.addText(
    [
      { text: "BOXY. CROPPED. ", options: { color: C_INK, fontFace: F_DISP, fontSize: 72, charSpacing: 3.6 } },
      { text: "HONEST.", options: { color: C_RED, fontFace: F_DISP, fontSize: 72, charSpacing: 3.6 } },
    ],
    { x: 1.0417, y: 1.9427, w: 9.5, h: 2.7416, align: "left", margin: 0, valign: "top" }
  );
  s.addText(
    "One unisex block, six sizes. Cut a touch shorter in the body and a touch wider in the shoulder than a stock hoodie — designed to layer, not to swallow.",
    {
      x: 1.0417, y: 4.9552, w: 6.8667, h: 1.2665,
      fontFace: F_SERIF, fontSize: 21, color: C_INK,
      align: "left", margin: 0, valign: "top",
    }
  );
  s.addText("MEASUREMENTS TAKEN FLAT, IN INCHES.", {
    x: 1.0417, y: 6.555, w: 9.2169, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });

  // ---- Size table (manual cells to mirror original) ----
  const colX = [10.8338, 12.5046, 14.4616, 16.7047];
  const colW = [1.6708, 1.9569, 2.2431, 2.2432];

  // Header row (dark)
  const headers = ["SIZE", "CHEST", "LENGTH", "SLEEVE"];
  for (let c = 0; c < 4; c++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[c], y: 1.9531, w: colW[c], h: 0.5104,
      fill: { color: C_INK }, line: { color: C_INK, width: 1.5 },
    });
    s.addText(headers[c], {
      x: colX[c] + 0.15, y: 2.0781, w: colW[c] - 0.2, h: 0.3021,
      fontFace: F_MONO, fontSize: 18, bold: true, color: C_BG, charSpacing: 7.2,
      align: "left", margin: 0, valign: "top",
    });
  }

  // Data rows
  const rows = [
    ["XS", "22", "25", "24"],
    ["S",  "23", "26", "25"],
    ["M",  "25", "27", "26"],
    ["L",  "27", "28", "26.5"],
    ["XL", "29", "29", "27"],
    ["2XL","31", "30", "27.5"],
  ];
  rows.forEach((row, r) => {
    const ry = 2.4635 + r * 0.5365;
    const altFill = (r % 2 === 0) ? C_BAND : null; // alternate rows
    for (let c = 0; c < 4; c++) {
      const shapeOpts = {
        x: colX[c], y: ry, w: colW[c], h: 0.5365,
        line: { color: C_INK, width: 1.5 },
      };
      if (altFill) shapeOpts.fill = { color: altFill };
      else shapeOpts.fill = { type: "none" };
      s.addShape(pres.shapes.RECTANGLE, shapeOpts);
      s.addText(row[c], {
        x: colX[c] + 0.15, y: ry + 0.125, w: colW[c] - 0.2, h: 0.33,
        fontFace: F_SERIF, fontSize: 19.5, color: C_INK,
        align: "left", margin: 0, valign: "top",
      });
    }
  });
}

// ===========================================================================
// SLIDE 6 — Pricing & Editions
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "06 / PRICING & EDITIONS", "SIX DROPS · 405 TOTAL PIECES");
  addContentFooter(s, "06");

  const cards = [
    { x: 1.0417,  fill: C_BG,    text: C_INK, sku: "SKU 001", name: "STATIC BLOOM",   price: "$168", ed: "EDITION OF 80" },
    { x: 4.0694,  fill: C_INK,   text: C_BG,  sku: "SKU 002", name: "NIGHT CHANNEL",  price: "$184", ed: "EDITION OF 60" },
    { x: 7.0972,  fill: C_BROWN, text: C_BG,  sku: "SKU 003", name: "CARTO- GRAPH",   price: "$158", ed: "EDITION OF 100" },
    { x: 10.1249, fill: C_RED,   text: C_BG,  sku: "SKU 004", name: "OFF- REGISTER",  price: "$220", ed: "EDITION OF 50" },
    { x: 13.1528, fill: C_ACID,  text: C_INK, sku: "SKU 005", name: "SOFT MACHINE",   price: "$174", ed: "EDITION OF 75" },
    { x: 16.1805, fill: C_BLUE,  text: C_BG,  sku: "SKU 006", name: "LONG STORY",     price: "$198", ed: "EDITION OF 40" },
  ];

  for (const c of cards) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.9427, w: 2.7778, h: 3.0343,
      fill: { color: c.fill }, line: { color: C_INK, width: 2.25 },
    });
    s.addText(c.sku, {
      x: c.x + 0.2812, y: 2.15, w: 2.2986, h: 0.3,
      fontFace: F_MONO, fontSize: 14, color: c.text, charSpacing: 1.4,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.name, {
      x: c.x + 0.2812, y: 2.5, w: 2.2986, h: 1.0,
      fontFace: F_DISP, fontSize: 22, color: c.text, charSpacing: 1.1,
      align: "left", margin: 0, valign: "top",
    });
    // small divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x + 0.2812, y: 3.65, w: 2.2153, h: 0.0208,
      fill: { color: c.text }, line: { color: c.text, width: 0 },
    });
    s.addText(c.price, {
      x: c.x + 0.2812, y: 3.78, w: 2.2986, h: 0.7,
      fontFace: F_DISP, fontSize: 32, color: c.text, charSpacing: 1.6,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(c.ed, {
      x: c.x + 0.2812, y: 4.55, w: 2.2986, h: 0.32,
      fontFace: F_MONO, fontSize: 12, color: c.text, charSpacing: 1.2,
      align: "left", margin: 0, valign: "top",
    });
  }

  // Mid divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 5.8104, w: 17.9167, h: 0.0417,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });

  // Big stat triplet
  const totals = [
    { x: 1.0417,  num: "405",  label: "TOTAL PIECES THIS SEASON" },
    { x: 7.1528,  num: "$181", label: "AVERAGE TICKET" },
    { x: 13.2638, num: "0",    label: "RESTOCKS. EVER." },
  ];
  for (const t of totals) {
    s.addText(t.num, {
      x: t.x, y: 6.27, w: 5.8652, h: 1.0,
      fontFace: F_DISP, fontSize: 56, color: C_INK, charSpacing: 2.8,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(t.label, {
      x: t.x, y: 7.32, w: 5.8652, h: 0.32,
      fontFace: F_MONO, fontSize: 16, color: C_INK, charSpacing: 1.6,
      align: "left", margin: 0, valign: "top",
    });
  }
}

// ===========================================================================
// SLIDE 7 — How to Order
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "07 / HOW TO ORDER", "CUTANDSEW.STUDIO");
  addContentFooter(s, "07");

  const steps = [
    { x: 1.0417,  num: "1", title: "PICK A DROP",   body: "All six drops live at cutandsew.studio · /shop. Each SKU has a 360° spin and a print close-up." },
    { x: 5.6146,  num: "2", title: "PICK A SIZE",   body: "Six sizes, XS–2XL. Free exchanges within 14 days, prepaid label in the box." },
    { x: 10.1875, num: "3", title: "CHECK OUT",     body: "Card, Apple Pay, or Shop Pay. Sales tax handled at checkout. Ships worldwide from Brooklyn." },
    { x: 14.7604, num: "4", title: "GET A NUMBER",  body: "Your hoodie ships in 3–5 days, signed and numbered inside the hood, wrapped in tissue with a zine." },
  ];
  for (const st of steps) {
    s.addText(st.num, {
      x: st.x, y: 2.0, w: 4.3239, h: 2.2,
      fontFace: F_DISP, fontSize: 130, color: C_RED, charSpacing: 6.5,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(st.title, {
      x: st.x, y: 4.35, w: 4.3239, h: 0.5,
      fontFace: F_DISP, fontSize: 26, color: C_INK, charSpacing: 1.3,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(st.body, {
      x: st.x, y: 4.95, w: 4.3239, h: 1.5,
      fontFace: F_SERIF, fontSize: 18, color: C_INK,
      align: "left", margin: 0, valign: "top",
    });
  }

  // Acid CTA bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 8.6042, w: 17.9167, h: 1.3958,
    fill: { color: C_ACID }, line: { color: C_INK, width: 3 },
  });
  s.addText("CUTANDSEW.STUDIO", {
    x: 1.5, y: 8.9583, w: 8, h: 0.7292,
    fontFace: F_DISP, fontSize: 40.5, color: C_INK, charSpacing: 2,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("FREE SHIPPING OVER USD 200 · USA & CA", {
    x: 11.5, y: 9.1615, w: 7, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "right", margin: 0, valign: "top",
  });
}

// ===========================================================================
// SLIDE 8 — Care
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "08 / CARE", "READ THE LABEL");
  addContentFooter(s, "08");

  s.addText(
    [
      { text: "WASH COLD. HANG ", options: { color: C_INK, fontFace: F_DISP, fontSize: 75, charSpacing: 3.75 } },
      { text: "TO DRY.", options: { color: C_RED, fontFace: F_DISP, fontSize: 75, charSpacing: 3.75 } },
    ],
    { x: 1.0417, y: 1.8385, w: 9.5, h: 3.7917, align: "left", margin: 0, valign: "top" }
  );
  s.addText(
    "Water-base inks live longer when you treat the hoodie like a printed shirt, not a sweatshirt. Inside-out, cold cycle, no fabric softener, line dry. The print will outlive the seams.",
    {
      x: 1.0417, y: 5.901, w: 6.6521, h: 1.6748,
      fontFace: F_SERIF, fontSize: 21, color: C_INK,
      align: "left", margin: 0, valign: "top",
    }
  );

  // DO box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.8234, y: 1.8385, w: 3.9425, h: 2.4362,
    fill: { type: "none" }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("DO", {
    x: 11.0838, y: 2.099, w: 3.5243, h: 0.474,
    fontFace: F_DISP, fontSize: 25.5, color: C_INK, charSpacing: 1.3,
    align: "left", margin: 0, valign: "top",
  });
  s.addText(
    [
      { text: "Wash inside-out, cold", options: { breakLine: true } },
      { text: "Hang dry in shade", options: { breakLine: true } },
      { text: "Iron reverse, low heat", options: { breakLine: true } },
      { text: "Spot clean print area", options: {} },
    ],
    {
      x: 11.138, y: 2.6146, w: 3.4508, h: 1.5,
      fontFace: F_SERIF, fontSize: 18, color: C_INK,
      align: "left", margin: 0, valign: "top", paraSpaceAfter: 2,
    }
  );

  // DON'T box (dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 15.0159, y: 1.8385, w: 3.9425, h: 2.4362,
    fill: { color: C_INK }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("DON'T", {
    x: 15.2763, y: 2.099, w: 3.5243, h: 0.474,
    fontFace: F_DISP, fontSize: 25.5, color: C_BG, charSpacing: 1.3,
    align: "left", margin: 0, valign: "top",
  });
  s.addText(
    [
      { text: "Tumble dry on high", options: { breakLine: true } },
      { text: "Bleach or pre-soak", options: { breakLine: true } },
      { text: "Iron the print itself", options: { breakLine: true } },
      { text: "Dry-clean (chems eat ink)", options: {} },
    ],
    {
      x: 15.3305, y: 2.6146, w: 3.4508, h: 1.5,
      fontFace: F_SERIF, fontSize: 18, color: C_BG,
      align: "left", margin: 0, valign: "top", paraSpaceAfter: 2,
    }
  );

  // Lifetime warranty (acid)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.8234, y: 4.5247, w: 8.1349, h: 1.5645,
    fill: { color: C_ACID }, line: { color: C_INK, width: 2.25 },
  });
  s.addText("LIFETIME PRINT WARRANTY", {
    x: 11.0838, y: 4.7852, w: 7.8425, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });
  s.addText(
    "If the print cracks before the fabric does, send it back. We'll re-pull it for the cost of shipping.",
    {
      x: 11.0838, y: 5.1289, w: 7.8425, h: 0.85,
      fontFace: F_SERIF, fontSize: 18, color: C_INK,
      align: "left", margin: 0, valign: "top",
    }
  );
}

// ===========================================================================
// SLIDE 9 — Coming Next
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_INK };

  // Header (light on dark)
  s.addText("09 / COMING NEXT", {
    x: 1.0417, y: 0.8333, w: 8, h: 0.349,
    fontFace: F_MONO, fontSize: 19.5, color: C_BG,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("F/W 2026 · DROP 07", {
    x: 11.04, y: 0.8333, w: 7.92, h: 0.349,
    fontFace: F_MONO, fontSize: 19.5, color: C_BG,
    align: "right", margin: 0, valign: "top",
  });
  // top rule (cream)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 1.2865, w: 17.9167, h: 0.0312,
    fill: { color: C_BG }, line: { color: C_BG, width: 0 },
  });

  // — PREVIEW —
  s.addText("— PREVIEW —", {
    x: 1.0417, y: 2.2917, w: 18.4542, h: 0.349,
    fontFace: F_MONO, fontSize: 19.5, color: C_BG, charSpacing: 1.95,
    align: "left", margin: 0, valign: "top",
  });
  // Massive QUIET / RIOT.
  s.addText("QUIET", {
    x: 1.0417, y: 2.6, w: 18.4542, h: 3.0,
    fontFace: F_DISP, fontSize: 180, color: C_BG, charSpacing: 9,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("RIOT.", {
    x: 1.0417, y: 5.5, w: 18.4542, h: 3.0,
    fontFace: F_DISP, fontSize: 180, color: C_RED, charSpacing: 9,
    align: "left", margin: 0, valign: "top",
  });

  // Right-aligned italic body
  s.addText(
    "A heavyweight zip-hood. Embroidered, not printed. Six colors. Drops November 2026 — sign up for the waitlist on the home page.",
    {
      x: 12.0917, y: 7.9731, w: 6.8667, h: 1.3915,
      fontFace: F_SERIF, fontSize: 22, italic: true, color: C_BG,
      align: "right", margin: 0, valign: "top",
    }
  );
  s.addText("CUTANDSEW.STUDIO/WAITLIST", {
    x: 12.0917, y: 9.55, w: 6.8667, h: 0.3229,
    fontFace: F_MONO, fontSize: 16, color: C_BG, charSpacing: 1.6,
    align: "right", margin: 0, valign: "top",
  });

  // Red badge bottom-left — "DROP 07 NOV.26"
  s.addShape(pres.shapes.OVAL, {
    x: 1.0417, y: 7.9167, w: 1.875, h: 1.875,
    fill: { color: C_RED }, line: { color: C_RED, width: 0 },
    rotate: -12,
  });
  s.addText("DROP", {
    x: 1.1, y: 8.05, w: 1.75, h: 0.5,
    fontFace: F_DISP, fontSize: 22, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });
  s.addText("07", {
    x: 1.1, y: 8.5, w: 1.75, h: 0.55,
    fontFace: F_DISP, fontSize: 22, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });
  s.addText("NOV.26", {
    x: 1.1, y: 9.0, w: 1.75, h: 0.55,
    fontFace: F_DISP, fontSize: 22, color: C_BG, align: "center", margin: 0,
    rotate: -12,
  });
}

// ===========================================================================
// SLIDE 10 — Stockists & Contact
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C_BG };
  addSlideHeader(s, "10 / STOCKISTS & CONTACT", "FIND US IN PERSON");

  // Top rule + bottom thicker rule (custom footer for this slide)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 1.2865, w: 17.9167, h: 0.0312,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 9.8385, w: 17.9167, h: 0.0417,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });

  // Big title
  s.addText(
    [
      { text: "EIGHT STORES. FOUR CITIES. ", options: { color: C_INK, fontFace: F_DISP, fontSize: 52, charSpacing: 2.6 } },
      { text: "ONE STUDIO.", options: { color: C_RED, fontFace: F_DISP, fontSize: 52, charSpacing: 2.6 } },
    ],
    { x: 1.0417, y: 1.85, w: 9.95, h: 2.7, align: "left", margin: 0, valign: "top" }
  );

  // Stockist columns
  const stockists = [
    { x: 1.0417,  y: 4.853, label: "NEW YORK",    body: "Public Access · Greenpoint End of Century · LES Common Practice · Bed-Stuy" },
    { x: 6.0258,  y: 4.853, label: "LOS ANGELES", body: "Mohawk General · Silverlake Stronghold · Venice" },
    { x: 1.0417,  y: 6.5435, label: "TOKYO",      body: "Beams T · Harajuku Roundabout · Daikanyama" },
    { x: 6.0258,  y: 6.5435, label: "BERLIN",     body: "Voo Store · Kreuzberg" },
  ];
  for (const st of stockists) {
    s.addText(st.label, {
      x: st.x, y: st.y, w: 4.8118, h: 0.3229,
      fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(st.body, {
      x: st.x, y: st.y + 0.2813, w: 4.8118, h: 1.2,
      fontFace: F_SERIF, fontSize: 19.5, color: C_INK,
      align: "left", margin: 0, valign: "top",
    });
  }

  // Studio panel (red-bordered card)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.5308, y: 1.8385, w: 7.4276, h: 5.43,
    fill: { color: C_BG }, line: { color: C_RED, width: 3 },
  });
  s.addText("THE STUDIO", {
    x: 11.9474, y: 2.2552, w: 6.7921, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("CUT & SEW", {
    x: 11.9474, y: 2.6198, w: 6.7921, h: 0.5208,
    fontFace: F_DISP, fontSize: 34.5, color: C_INK, charSpacing: 1.7,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("128 Bogart St., Studio 4B Brooklyn, NY 11206 Open Sat 12–6, by appointment otherwise", {
    x: 11.9474, y: 3.2865, w: 6.7921, h: 1.0915,
    fontFace: F_SERIF, fontSize: 18, color: C_INK,
    align: "left", margin: 0, valign: "top",
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.9474, y: 4.5863, w: 6.5942, h: 0.0208,
    fill: { color: C_INK }, line: { color: C_INK, width: 0 },
  });
  s.addText("WHOLESALE", {
    x: 11.9474, y: 4.8571, w: 6.7921, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("hello@cutandsew.studio", {
    x: 11.9474, y: 5.1383, w: 6.7921, h: 0.3281,
    fontFace: F_SERIF, fontSize: 18, color: C_INK,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("PRESS", {
    x: 11.9474, y: 5.5706, w: 6.7921, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("press@cutandsew.studio", {
    x: 11.9474, y: 5.8519, w: 6.7921, h: 0.3281,
    fontFace: F_SERIF, fontSize: 18, color: C_INK,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("INSTAGRAM", {
    x: 11.9474, y: 6.2842, w: 6.7921, h: 0.3229,
    fontFace: F_MONO, fontSize: 18, color: C_INK, charSpacing: 1.8,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("@cutandsew.studio", {
    x: 11.9474, y: 6.5654, w: 6.7921, h: 0.3281,
    fontFace: F_SERIF, fontSize: 18, color: C_INK,
    align: "left", margin: 0, valign: "top",
  });

  // Bottom THANK YOU + URL
  s.addText("THANK YOU.", {
    x: 1.0417, y: 10.0885, w: 4, h: 0.5781,
    fontFace: F_DISP, fontSize: 31.5, color: C_INK, charSpacing: 1.6,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("CUTANDSEW.STUDIO · S/S 2026", {
    x: 12.5, y: 10.22, w: 6.5, h: 0.32,
    fontFace: F_MONO, fontSize: 16, color: C_INK, charSpacing: 1.6,
    align: "right", margin: 0, valign: "top",
  });
}

// ----- Write -----
const outPath = "/mnt/user-data/outputs/Clothes.pptx";
pres.writeFile({ fileName: outPath }).then((f) => {
  console.log("Wrote:", f);
});
