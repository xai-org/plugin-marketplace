// Terracoat Seed Round Pitch Deck - pptxgenjs replica
// Custom dimensions: 20" x 11.25" (matches source deck)
//
// Usage:
//   npm install pptxgenjs
//   node generate.js
// Produces: terracoat.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "TERRACOAT", width: 20, height: 11.25 });
pres.layout = "TERRACOAT";
pres.title = "Terracoat - Seed Round 2026";
pres.author = "Terracoat";

// ----- Palette -----
const C = {
  green:    "15301F",  // dark forest (dark-slide bg)
  greenAlt: "1A3A26",  // slightly lighter for inset banner
  cream:    "F2ECDD",  // cream (light-slide bg)
  creamCard:"F8F3E6",  // lighter cream for cards
  orange:   "C85A2E",  // terracotta accent
  orangeAlt:"B85027",  // deeper terracotta
  peach:    "F0A57E",  // peach/soft pink (italic accents on dark bg)
  dark:     "1A1A1A",  // near-black body text on cream
  muted:    "6B6B6B",  // muted gray
  mutedLt:  "8B8B8B",  // lighter muted
  sage:     "7A8B5C",  // sage green
  rule:     "D4CEBF",  // thin rule on cream
  ruleDk:   "2A4A33",  // thin rule on dark
  tan:      "D9B88C",  // tan placeholder circles
  outerRing:"E8DFC8",  // outermost TAM circle on slide 7
};

const FONT = "Arial";

// Recurring header: orange dot + "TERRACOAT · NN" left, section title right, divider below
function addHeader(slide, slideNum, sectionTitle, isDark = false) {
  const textColor = isDark ? C.cream : C.dark;
  const mutedColor = isDark ? C.mutedLt : C.muted;
  const ruleColor = isDark ? C.ruleDk : C.rule;

  slide.addShape(pres.shapes.OVAL, {
    x: 1.0, y: 0.85, w: 0.22, h: 0.22,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  slide.addText(`TERRACOAT · ${String(slideNum).padStart(2, "0")}`, {
    x: 1.35, y: 0.72, w: 6, h: 0.5,
    fontFace: FONT, fontSize: 14, bold: true, color: textColor,
    charSpacing: 4, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(sectionTitle, {
    x: 12, y: 0.72, w: 7, h: 0.5,
    fontFace: FONT, fontSize: 14, color: mutedColor,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: 1.0, y: 1.45, w: 18.0, h: 0,
    line: { color: ruleColor, width: 0.75 },
  });
}

// ===============================================================
// SLIDE 1 - Title
// ===============================================================
function slide1() {
  const s = pres.addSlide();
  s.background = { color: C.green };

  // Concentric circles bottom-right motif
  s.addShape(pres.shapes.OVAL, {
    x: 11.5, y: 3.0, w: 10.2, h: 10.2,
    fill: { color: C.peach, transparency: 88 },
    line: { color: C.peach, transparency: 75, width: 0.75 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 12.6, y: 4.1, w: 8.0, h: 8.0,
    fill: { color: C.orange, transparency: 80 },
    line: { color: "000000", width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 13.8, y: 5.3, w: 5.6, h: 5.6,
    fill: { color: C.orangeAlt, transparency: 30 },
    line: { color: "000000", width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 14.9, y: 6.4, w: 3.4, h: 3.4,
    fill: { color: C.orange }, line: { color: "000000", width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 15.8, y: 7.3, w: 1.6, h: 1.6,
    fill: { color: C.peach }, line: { color: "000000", width: 0 },
  });

  // Top-left brand
  s.addShape(pres.shapes.OVAL, {
    x: 1.2, y: 0.95, w: 0.3, h: 0.3,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("Terracoat", {
    x: 1.65, y: 0.8, w: 4, h: 0.6,
    fontFace: FONT, fontSize: 20, color: C.cream,
    align: "left", valign: "middle", margin: 0,
  });

  // Top-right
  s.addText("SEED ROUND · 2026", {
    x: 13, y: 0.8, w: 6, h: 0.6,
    fontFace: FONT, fontSize: 15, color: C.mutedLt, charSpacing: 6,
    align: "right", valign: "middle", margin: 0,
  });

  // Headline "Seeds that know their soil."
  s.addText([
    { text: "Seeds that\nknow their ", options: { color: C.cream } },
    { text: "soil.", options: { color: C.peach, italic: true } },
  ], {
    x: 1.1, y: 1.8, w: 14, h: 5.4,
    fontFace: FONT, fontSize: 108,
    align: "left", valign: "top", margin: 0,
  });

  // Subhead
  s.addText(
    "Custom microbial coatings, matched to every field's biology — engineered strain-by-strain, delivered seed-by-seed.",
    {
      x: 1.1, y: 8.2, w: 9.2, h: 1.5,
      fontFace: FONT, fontSize: 16, color: C.cream,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Bottom-left
  s.addText("CONFIDENTIAL / INVESTOR PREVIEW", {
    x: 1.1, y: 10.3, w: 8, h: 0.4,
    fontFace: FONT, fontSize: 11, color: C.mutedLt, charSpacing: 6,
    align: "left", valign: "middle", margin: 0,
  });

  // Bottom-right RAISING / $2,000,000
  s.addText("RAISING", {
    x: 14, y: 9.9, w: 5, h: 0.4,
    fontFace: FONT, fontSize: 11, color: C.mutedLt, charSpacing: 6,
    align: "right", valign: "middle", margin: 0,
  });
  s.addText("$2,000,000", {
    x: 14, y: 10.3, w: 5, h: 0.55,
    fontFace: FONT, fontSize: 22, bold: true, color: C.peach,
    align: "right", valign: "middle", margin: 0,
  });
}

// ===============================================================
// SLIDE 2 - The Problem
// ===============================================================
function slide2() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 2, "THE PROBLEM");

  s.addText([
    { text: "The yield ceiling is ", options: { color: C.dark } },
    { text: "a biology problem", options: { color: C.orange, italic: true } },
    { text: " — and we've been solving it with chemistry.", options: { color: C.dark } },
  ], {
    x: 1.0, y: 2.0, w: 13.5, h: 2.2,
    fontFace: FONT, fontSize: 36, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  s.addText(
    "For 70 years, US corn and soy gains came from better genetics and more fertilizer.",
    { x: 1.0, y: 4.5, w: 8.5, h: 1.0,
      fontFace: FONT, fontSize: 15, color: C.dark,
      align: "left", valign: "top", margin: 0 }
  );
  s.addText(
    "Both engines are stalling. Nitrogen runs off before the plant can use it, phosphorus locks up in soil, and every extra pound of input costs more than the last.",
    { x: 1.0, y: 5.7, w: 8.5, h: 1.6,
      fontFace: FONT, fontSize: 15, color: C.dark,
      align: "left", valign: "top", margin: 0 }
  );
  s.addText(
    "The next decade of productivity has to come from the living system around the root.",
    { x: 1.0, y: 7.5, w: 8.5, h: 1.2,
      fontFace: FONT, fontSize: 15, color: C.dark,
      align: "left", valign: "top", margin: 0 }
  );

  const stats = [
    { num: "50%",  desc: "of applied nitrogen is lost to air or water before the crop uses it.", src: "USDA ARS · 2023" },
    { num: "$36B", desc: "spent annually on synthetic N fertilizer in the US alone.",            src: "USDA ERS · 2024" },
    { num: "0.4%", desc: "annual yield gain in corn since 2015 — down from 1.8% in the 1980s.",  src: "NASS · 2015–2024" },
  ];
  const statStartY = 4.2, statH = 2.15;

  stats.forEach((stat, i) => {
    const y = statStartY + i * statH;
    s.addShape(pres.shapes.LINE, {
      x: 10.5, y: y, w: 8.5, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
    s.addText(stat.num, {
      x: 10.5, y: y + 0.15, w: 3.0, h: 1.1,
      fontFace: FONT, fontSize: 56, color: C.orange,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(stat.desc, {
      x: 13.7, y: y + 0.2, w: 5.3, h: 1.0,
      fontFace: FONT, fontSize: 14, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(stat.src, {
      x: 13.7, y: y + 1.3, w: 5.3, h: 0.4,
      fontFace: FONT, fontSize: 11, color: C.muted, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ===============================================================
// SLIDE 3 - Why Current Biologicals Underperform
// ===============================================================
function slide3() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 3, "WHY CURRENT BIOLOGICALS UNDERPERFORM");

  s.addText([
    { text: "One-size-fits-all microbes don't survive ", options: { color: C.dark } },
    { text: "real fields.", options: { color: C.green } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  const cards = [
    { label: "01 / Selection", title: "Strains picked in petri dishes.",
      body: "Today's biologicals are screened on a handful of traits in a handful of conditions. They rarely carry the ecological toolkit to persist once they hit real soil." },
    { label: "02 / Place", title: "Blind to the ecotype they're shipped into.",
      body: "A strain tuned to Iowa loam flops in Nebraska sand. Products ship nationally; biology is local." },
    { label: "03 / Community", title: "Sold solo. Microbes don't work alone.",
      body: "Single-strain inoculants ignore the fact that plant-beneficial functions emerge from microbial communities — strains chosen for compatibility, not just individual merit." },
  ];

  const cardW = 5.7, cardH = 5.2, cardY = 4.3, cardGap = 0.3, cardStartX = 1.0;

  cards.forEach((card, i) => {
    const x = cardStartX + i * (cardW + cardGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.creamCard }, line: { color: C.rule, width: 0.5 },
    });
    s.addText(card.label, {
      x: x + 0.35, y: cardY + 0.35, w: cardW - 0.7, h: 0.5,
      fontFace: FONT, fontSize: 13, bold: true, color: C.orange, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(card.title, {
      x: x + 0.35, y: cardY + 1.05, w: cardW - 0.7, h: 1.5,
      fontFace: FONT, fontSize: 22, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(card.body, {
      x: x + 0.35, y: cardY + 2.8, w: cardW - 0.7, h: 2.2,
      fontFace: FONT, fontSize: 13, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 9.9, w: 18, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  s.addText(
    "Result: field-trial results that rarely replicate, and farmers who've been burned enough to stop trying.",
    { x: 1.0, y: 10.1, w: 18, h: 0.6,
      fontFace: FONT, fontSize: 16, italic: true, color: C.green,
      align: "left", valign: "middle", margin: 0 }
  );
}

// ===============================================================
// SLIDE 4 - The Solution
// ===============================================================
function slide4() {
  const s = pres.addSlide();
  s.background = { color: C.green };
  addHeader(s, 4, "THE SOLUTION", true);

  s.addText([
    { text: "Seeds coated with microbes ", options: { color: C.cream } },
    { text: "tuned to your field.", options: { color: C.peach, italic: true } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  s.addText([
    { text: "Terracoat delivers a ", options: { color: C.cream } },
    { text: "bespoke microbial consortium", options: { color: C.cream, bold: true } },
    { text: " on every seed, matched to the soil type, climate, and rotation history of the field it's going into.", options: { color: C.cream } },
  ], {
    x: 1.0, y: 4.4, w: 8.5, h: 1.7,
    fontFace: FONT, fontSize: 15,
    align: "left", valign: "top", margin: 0,
  });
  s.addText(
    "No separate application. No equipment changes. The farmer plants as they always have — and a living, place-matched community goes into the ground with every kernel.",
    { x: 1.0, y: 6.3, w: 8.5, h: 2.0,
      fontFace: FONT, fontSize: 15, color: C.cream,
      align: "left", valign: "top", margin: 0 }
  );
  s.addText("Right strains. Right place. Right together.", {
    x: 1.0, y: 8.5, w: 8.5, h: 0.6,
    fontFace: FONT, fontSize: 16, color: C.orange,
    align: "left", valign: "top", margin: 0,
  });

  // Orbital diagram right side
  const cx = 14.0, cy = 7.2;
  [{ w: 8.8, h: 7.2 }, { w: 7.0, h: 5.7 }, { w: 5.4, h: 4.4 }].forEach(r => {
    s.addShape(pres.shapes.OVAL, {
      x: cx - r.w / 2, y: cy - r.h / 2, w: r.w, h: r.h,
      fill: { type: "solid", color: C.green, transparency: 100 },
      line: { color: C.sage, width: 0.75, dashType: "dash" },
    });
  });
  s.addShape(pres.shapes.OVAL, {
    x: cx - 1.3, y: cy - 1.3, w: 2.6, h: 2.6,
    fill: { color: C.tan }, line: { color: C.tan, width: 0 },
  });

  const dots = [
    { x: 14.4, y: 3.4 },
    { x: 15.0, y: 5.2 },
    { x: 11.8, y: 7.1 },
    { x: 12.3, y: 9.2 },
    { x: 14.5, y: 10.0 },
  ];
  dots.forEach(d => {
    s.addShape(pres.shapes.OVAL, {
      x: d.x - 0.08, y: d.y - 0.08, w: 0.16, h: 0.16,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    });
  });

  const labels = [
    { text: "N-FIXERS",             x: 10.3, y: 6.95, w: 3.2, align: "right" },
    { text: "P-SOLUBILIZERS",       x: 15.2, y: 5.0,  w: 3.8, align: "left"  },
    { text: "DROUGHT PRIMERS",      x: 10.3, y: 9.0,  w: 3.2, align: "right" },
    { text: "PATHOGEN SUPPRESSORS", x: 14.8, y: 9.8,  w: 4.2, align: "left"  },
  ];
  labels.forEach(lbl => {
    s.addText(lbl.text, {
      x: lbl.align === "right" ? lbl.x - lbl.w : lbl.x,
      y: lbl.y - 0.2, w: lbl.w, h: 0.4,
      fontFace: FONT, fontSize: 12, color: C.orange, charSpacing: 4, bold: true,
      align: lbl.align, valign: "middle", margin: 0,
    });
  });
}

// ===============================================================
// SLIDE 5 - The Platform
// ===============================================================
function slide5() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 5, "THE PLATFORM");

  s.addText([
    { text: "Three proprietary engines, one ", options: { color: C.dark } },
    { text: "compounding moat.", options: { color: C.orange, italic: true } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  const engines = [
    { num: "01", numColor: C.green, ruleColor: C.green,
      label: "TRAIT DISCOVERY",
      title: "High-throughput PGP screen.",
      bodyRuns: [
        { text: "A novel selection process that tests isolates against ", options: { color: C.dark } },
        { text: "dozens of plant-growth-promoting traits", options: { color: C.dark, bold: true } },
        { text: " in parallel — not the handful competitors rely on. Every new soil sample deepens the strain library.", options: { color: C.dark } },
      ],
      tag: "→ Library: growing" },
    { num: "02", numColor: C.orange, ruleColor: C.orange,
      label: "GENOME MINING",
      title: "Secondary-metabolite pipeline.",
      bodyRuns: [
        { text: "PLACEHOLDER", options: { color: C.dark } },
        { text: "compatible secondary metabolites", options: { color: C.dark, bold: true } },
        { text: " — finding hidden functions that petri-dish assays miss.", options: { color: C.dark } },
      ],
      tag: "→ In silico → in planta" },
    { num: "03", numColor: C.green, ruleColor: C.sage,
      label: "CONSORTIUM DESIGN",
      title: "Predicting who works with whom.",
      bodyRuns: [
        { text: "A pioneering model that predicts ", options: { color: C.dark } },
        { text: "which strains perform best together", options: { color: C.dark, bold: true } },
        { text: " in a given ecotype — turning a combinatorial explosion into a shortlist of field-ready consortia.", options: { color: C.dark } },
      ],
      tag: "→ Our defensible edge" },
  ];

  const engineW = 5.7, engineY = 3.8, engineGap = 0.3, engineStartX = 1.0;

  engines.forEach((eng, i) => {
    const x = engineStartX + i * (engineW + engineGap);
    s.addShape(pres.shapes.LINE, {
      x: x, y: engineY, w: engineW, h: 0,
      line: { color: eng.ruleColor, width: 2.5 },
    });
    s.addText(eng.num, {
      x: x, y: engineY + 0.3, w: engineW, h: 1.2,
      fontFace: FONT, fontSize: 48, color: eng.numColor,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(eng.label, {
      x: x, y: engineY + 1.7, w: engineW, h: 0.4,
      fontFace: FONT, fontSize: 13, color: C.muted, charSpacing: 5,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(eng.title, {
      x: x, y: engineY + 2.2, w: engineW, h: 1.4,
      fontFace: FONT, fontSize: 22, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(eng.bodyRuns, {
      x: x, y: engineY + 3.7, w: engineW - 0.2, h: 2.6,
      fontFace: FONT, fontSize: 14,
      align: "left", valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x, y: engineY + 6.55, w: engineW - 0.2, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
    s.addText(eng.tag, {
      x: x, y: engineY + 6.7, w: engineW, h: 0.5,
      fontFace: FONT, fontSize: 14, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ===============================================================
// SLIDE 6 - How It Works
// ===============================================================
function slide6() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 6, "HOW IT WORKS");

  s.addText([
    { text: "From soil sample to seed coat in ", options: { color: C.dark } },
    { text: "90 days.", options: { color: C.orange, italic: true } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 4.2, w: 18, h: 0,
    line: { color: C.dark, width: 1.0 },
  });

  const steps = [
    { label: "Step 01", days: "10", title: "Sample the field.",    body: "Grower ships a soil core. We profile its microbiome, texture, chemistry, and cropping history." },
    { label: "Step 02", days: "25", title: "Match the ecotype.",   body: "Our model selects a shortlist of candidate strains and predicts the optimal consortium for that soil." },
    { label: "Step 03", days: "35", title: "Culture & formulate.", body: "Strains are scaled, stabilized, and blended into a shelf-stable coating compatible with commercial treaters." },
    { label: "Step 04", days: "20", title: "Coat & ship.",         body: "Seed is coated at partner facility and returned to the grower ahead of planting — no field-side equipment required." },
  ];

  const stepW = 4.3, stepY = 4.5, stepGap = 0.2, stepStartX = 1.0;

  steps.forEach((step, i) => {
    const x = stepStartX + i * (stepW + stepGap);
    s.addText(step.label, {
      x: x, y: stepY, w: stepW, h: 0.5,
      fontFace: FONT, fontSize: 14, bold: true, color: C.orange, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
    s.addText([
      { text: step.days, options: { fontSize: 60, color: C.dark } },
      { text: "  days",  options: { fontSize: 14, color: C.muted } },
    ], {
      x: x, y: stepY + 0.7, w: stepW, h: 1.4,
      fontFace: FONT,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(step.title, {
      x: x, y: stepY + 2.2, w: stepW, h: 0.5,
      fontFace: FONT, fontSize: 16, bold: true, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(step.body, {
      x: x, y: stepY + 2.8, w: stepW, h: 2.0,
      fontFace: FONT, fontSize: 13, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
  });

  // Green footer bar
  const footerY = 9.3, footerH = 1.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: footerY, w: 18, h: footerH,
    fill: { color: C.green }, line: { color: C.green, width: 0 },
  });
  s.addText([
    { text: "~ 90 days · ", options: { color: C.cream } },
    { text: "one growing season ahead", options: { color: C.peach } },
  ], {
    x: 1.4, y: footerY, w: 10, h: footerH,
    fontFace: FONT, fontSize: 22,
    align: "left", valign: "middle", margin: 0,
  });
  // Smaller size + wider box so infrastructure text fits on one line
  s.addText("PLUG-IN TO EXISTING SEED-TREATMENT INFRASTRUCTURE", {
    x: 9.2, y: footerY, w: 9.6, h: footerH,
    fontFace: FONT, fontSize: 11, color: C.mutedLt, charSpacing: 2,
    align: "right", valign: "middle", margin: 0,
  });
}

// ===============================================================
// SLIDE 7 - Market
// ===============================================================
function slide7() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 7, "MARKET");

  s.addText([
    { text: "A ", options: { color: C.dark } },
    { text: "$12B", options: { color: C.orange, italic: true } },
    { text: " seed-treatment market, Midwest corn + soy first.", options: { color: C.dark } },
  ], {
    x: 1.0, y: 2.0, w: 14, h: 1.8,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  const rows = [
    { label: "TAM · GLOBAL SEED TREATMENT",    labelColor: C.muted,  desc: "All treated row-crop seed worldwide, 2030.",                                    amount: "$12B",  amountColor: C.green },
    { label: "SAM · US CORN + SOY BIOLOGICALS", labelColor: C.muted,  desc: "Addressable with a microbial coating at an inoculant price point.",            amount: "$3.4B", amountColor: C.green },
    { label: "SOM · MIDWEST BEACHHEAD (5 YRS)", labelColor: C.orange, desc: "180M planted acres across IA, IL, IN, NE, MN — our first-in, highest-margin wedge.", amount: "$420M", amountColor: C.orange },
  ];

  const rowStartY = 4.6, rowH = 2.0;

  rows.forEach((row, i) => {
    const y = rowStartY + i * rowH;
    s.addShape(pres.shapes.LINE, {
      x: 1.0, y: y, w: 9.5, h: 0,
      line: { color: C.rule, width: 0.5 },
    });
    s.addText(row.label, {
      x: 1.0, y: y + 0.2, w: 6.5, h: 0.5,
      fontFace: FONT, fontSize: 13, color: row.labelColor, charSpacing: 5,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(row.desc, {
      x: 1.0, y: y + 0.75, w: 6.5, h: 1.1,
      fontFace: FONT, fontSize: 13, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(row.amount, {
      x: 7.5, y: y + 0.2, w: 3.0, h: 1.6,
      fontFace: FONT, fontSize: 48, color: row.amountColor,
      align: "center", valign: "middle", margin: 0,
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: rowStartY + 3 * rowH, w: 9.5, h: 0,
    line: { color: C.rule, width: 0.5 },
  });

  // Nested circles diagram
  const rcx = 15.0, rcy = 7.0;
  s.addShape(pres.shapes.OVAL, {
    x: rcx - 3.5, y: rcy - 3.5, w: 7.0, h: 7.0,
    fill: { color: C.outerRing }, line: { color: C.outerRing, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: rcx - 2.5, y: rcy - 2.5, w: 5.0, h: 5.0,
    fill: { color: C.sage }, line: { color: C.sage, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: rcx - 1.5, y: rcy - 1.5, w: 3.0, h: 3.0,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  s.addText("TAM · $12B", {
    x: rcx - 2.2, y: rcy - 3.15, w: 4.4, h: 0.45,
    fontFace: FONT, fontSize: 13, color: C.muted, charSpacing: 4,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("SAM · $3.4B", {
    x: rcx - 2.2, y: rcy - 2.15, w: 4.4, h: 0.45,
    fontFace: FONT, fontSize: 13, color: C.cream, charSpacing: 4,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("$420M", {
    x: rcx - 1.5, y: rcy - 0.4, w: 3.0, h: 0.7,
    fontFace: FONT, fontSize: 26, color: C.cream,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("SOM", {
    x: rcx - 1.5, y: rcy + 0.3, w: 3.0, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.cream, charSpacing: 4,
    align: "center", valign: "middle", margin: 0,
  });
}

// ===============================================================
// SLIDE 8 - Traction & Roadmap
// ===============================================================
function slide8() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 8, "TRACTION & ROADMAP");

  s.addText([
    { text: "Validated on a ", options: { color: C.dark } },
    { text: "2-acre", options: { color: C.orange, italic: true } },
    { text: " academic trial. Scaling through 2027.", options: { color: C.dark } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.8,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  // LEFT: green card with 2x2 split-plot
  const leftX = 1.0, leftY = 4.3, leftW = 8.4, leftH = 4.8;
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: leftY, w: leftW, h: leftH,
    fill: { color: C.green }, line: { color: C.green, width: 0 },
  });
  // Wider banner so "2025 · ACADEMIC PARTNER FARM" stays on one line
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX + 0.35, y: leftY + 0.35, w: 5.3, h: 0.6,
    fill: { color: C.greenAlt }, line: { color: C.greenAlt, width: 0 },
  });
  s.addText("2025 · ACADEMIC PARTNER FARM", {
    x: leftX + 0.35, y: leftY + 0.35, w: 5.3, h: 0.6,
    fontFace: FONT, fontSize: 12, bold: true, color: C.cream, charSpacing: 3,
    align: "center", valign: "middle", margin: 0,
  });

  const plotStartX = leftX + 0.55;
  const plotStartY = leftY + 1.3;
  const plotW = 3.55, plotH = 1.2, plotGap = 0.15;

  const plots = [
    { col: 0, row: 0, label: "CONTROL",   fill: C.green,  outline: C.cream },
    { col: 1, row: 0, label: "TERRACOAT", fill: C.orange, outline: C.cream },
    { col: 0, row: 1, label: "CONTROL",   fill: C.green,  outline: C.cream },
    { col: 1, row: 1, label: "TERRACOAT", fill: C.orange, outline: C.cream },
  ];
  plots.forEach(p => {
    const px = plotStartX + p.col * (plotW + plotGap);
    const py = plotStartY + p.row * (plotH + plotGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: plotW, h: plotH,
      fill: { color: p.fill }, line: { color: p.outline, width: 1.5 },
    });
    s.addText(p.label, {
      x: px + 0.2, y: py, w: plotW - 0.4, h: plotH,
      fontFace: FONT, fontSize: 13, bold: true, color: C.cream, charSpacing: 4,
      align: "left", valign: "middle", margin: 0,
    });
  });

  s.addText("2 ACRES · CORN · SPLIT-PLOT", {
    x: leftX + 0.35, y: leftY + leftH - 0.55, w: 4.5, h: 0.4,
    fontFace: FONT, fontSize: 11, color: C.mutedLt, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("N = 4 REPLICATES", {
    x: leftX + leftW - 3.3, y: leftY + leftH - 0.55, w: 3.0, h: 0.4,
    fontFace: FONT, fontSize: 11, color: C.mutedLt, charSpacing: 4,
    align: "right", valign: "middle", margin: 0,
  });

  // Small stat cards under the split-plot
  const statCardY = 9.3, statCardH = 1.6, statCardW = 4.0, statCardGap = 0.4;
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: statCardY, w: statCardW, h: statCardH,
    fill: { color: C.creamCard }, line: { color: C.rule, width: 0.5 },
  });
  s.addText("1st", {
    x: leftX + 0.3, y: statCardY + 0.1, w: 2, h: 0.8,
    fontFace: FONT, fontSize: 36, color: C.orange,
    align: "left", valign: "top", margin: 0,
  });
  s.addText("in-field trial completed with a custom consortium.", {
    x: leftX + 0.3, y: statCardY + 0.95, w: statCardW - 0.6, h: 0.6,
    fontFace: FONT, fontSize: 12, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: leftX + statCardW + statCardGap, y: statCardY, w: statCardW, h: statCardH,
    fill: { color: C.creamCard }, line: { color: C.rule, width: 0.5 },
  });
  s.addText("4x", {
    x: leftX + statCardW + statCardGap + 0.3, y: statCardY + 0.1, w: 2, h: 0.8,
    fontFace: FONT, fontSize: 36, color: C.orange,
    align: "left", valign: "top", margin: 0,
  });
  s.addText("replicated plots, split-block, blinded analysis.", {
    x: leftX + statCardW + statCardGap + 0.3, y: statCardY + 0.95, w: statCardW - 0.6, h: 0.6,
    fontFace: FONT, fontSize: 12, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });

  // RIGHT: timeline
  const rX = 10.5;
  s.addText("WHAT COMES NEXT", {
    x: rX, y: 4.3, w: 8.5, h: 0.5,
    fontFace: FONT, fontSize: 13, color: C.green, charSpacing: 5,
    align: "left", valign: "top", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: rX, y: 4.85, w: 8.5, h: 0,
    line: { color: C.dark, width: 0.75 },
  });

  const timeline = [
    { date: "2026 · Q2",          title: "Close $2M seed.",                         sub: "Stand up BSL-1 lab & hire 3 scientists." },
    { date: "2026 · Q3",          title: "Expand strain library to 500+ isolates.", sub: "Across 4 Midwest soil types." },
    { date: "2026 · GROWING SZN", title: "Multi-site field trials: 40–60 acres.",   sub: "3 ecotypes · 2 academic + 1 commercial partner." },
    { date: "2027 · Q4",          title: "Paid pilot with a regional seed brand.",  sub: "Pathway to Series A." },
  ];

  const tlStartY = 5.05, tlH = 1.45;
  // Wider date column (3.4") with smaller font so "2026 · GROWING SZN" fits
  timeline.forEach((t, i) => {
    const y = tlStartY + i * tlH;
    s.addText(t.date, {
      x: rX, y: y + 0.1, w: 3.4, h: 0.8,
      fontFace: FONT, fontSize: 12, bold: true, color: C.orange, charSpacing: 2,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(t.title, {
      x: rX + 3.5, y: y + 0.05, w: 5.0, h: 0.5,
      fontFace: FONT, fontSize: 14, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(t.sub, {
      x: rX + 3.5, y: y + 0.55, w: 5.0, h: 0.5,
      fontFace: FONT, fontSize: 12, color: C.mutedLt,
      align: "left", valign: "top", margin: 0,
    });
    if (i < timeline.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rX, y: y + tlH - 0.05, w: 8.5, h: 0,
        line: { color: C.rule, width: 0.4 },
      });
    }
  });
}

// ===============================================================
// SLIDE 9 - Team
// ===============================================================
function slide9() {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, 9, "TEAM");

  s.addText([
    { text: "Built by a ", options: { color: C.dark } },
    { text: "soil microbiologist", options: { color: C.orange, italic: true } },
    { text: ", for the field.", options: { color: C.dark } },
  ], {
    x: 1.0, y: 2.0, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 38, bold: true,
    align: "left", valign: "top", margin: 0,
  });

  const photoX = 1.0, photoY = 4.1, photoW = 4.5, photoH = 5.8;
  s.addShape(pres.shapes.RECTANGLE, {
    x: photoX, y: photoY, w: photoW, h: photoH,
    fill: { color: C.sage }, line: { color: C.sage, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: photoX + 1.3, y: photoY + 0.8, w: 1.9, h: 2.2,
    fill: { color: C.tan }, line: { color: C.tan, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: photoX + 0.9, y: photoY + 2.8, w: 2.7, h: 2.7,
    fill: { color: C.tan }, line: { color: C.tan, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: photoX, y: photoY + photoH - 0.9, w: photoW, h: 0.9,
    fill: { color: C.green, transparency: 25 }, line: { color: "000000", width: 0 },
  });
  s.addText("FOUNDER HEADSHOT · PLACEHOLDER", {
    x: photoX + 0.25, y: photoY + photoH - 0.9, w: photoW - 0.5, h: 0.9,
    fontFace: FONT, fontSize: 12, color: C.cream, charSpacing: 4,
    align: "left", valign: "middle", margin: 0,
  });

  const rX = 6.0;
  s.addText("Founder & CEO", {
    x: rX, y: 4.1, w: 13, h: 0.9,
    fontFace: FONT, fontSize: 34, color: C.dark,
    align: "left", valign: "top", margin: 0,
  });
  s.addText("PHD · SOIL MICROBIOLOGY", {
    x: rX, y: 5.0, w: 13, h: 0.5,
    fontFace: FONT, fontSize: 14, color: C.orange, charSpacing: 5,
    align: "left", valign: "top", margin: 0,
  });
  s.addText([
    { text: "A decade inside the rhizosphere — ", options: { color: C.dark } },
    { text: "isolating, sequencing, and characterizing plant-associated microbes", options: { color: C.dark, bold: true } },
    { text: " from production fields across the Corn Belt. The three engines behind Terracoat came out of that work.", options: { color: C.dark } },
  ], {
    x: rX, y: 5.7, w: 13, h: 1.5,
    fontFace: FONT, fontSize: 14,
    align: "left", valign: "top", margin: 0,
  });

  const credStartX = rX, credStartY = 7.4;
  const credW = 6.2, credH = 1.25, credGap = 0.4;
  const credentials = [
    "PhD, Soil Microbiology. Dissertation on PGP trait discovery at scale.",
    "Author on peer-reviewed work in microbial community assembly.",
    "Network of academic collaborators across 3 land-grant universities.",
    "Hands-on experience with grower field trials in IA, IL, MN.",
  ];
  s.addShape(pres.shapes.LINE, {
    x: credStartX, y: credStartY - 0.15, w: credW * 2 + credGap, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  credentials.forEach((txt, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = credStartX + col * (credW + credGap);
    const cy = credStartY + row * credH;
    s.addShape(pres.shapes.LINE, {
      x: cx, y: cy + 0.15, w: 0.25, h: 0,
      line: { color: C.orange, width: 1.8 },
    });
    s.addText(txt, {
      x: cx + 0.4, y: cy, w: credW - 0.4, h: credH - 0.1,
      fontFace: FONT, fontSize: 13, color: C.dark,
      align: "left", valign: "top", margin: 0,
    });
    if (row === 0 && col === 0) {
      s.addShape(pres.shapes.LINE, {
        x: credStartX, y: credStartY + credH - 0.05, w: credW * 2 + credGap, h: 0,
        line: { color: C.rule, width: 0.4 },
      });
    }
  });
  s.addShape(pres.shapes.LINE, {
    x: credStartX, y: credStartY + 2 * credH, w: credW * 2 + credGap, h: 0,
    line: { color: C.dark, width: 0.75 },
  });

  s.addText([
    { text: "HIRING WITH SEED: ", options: { color: C.muted, charSpacing: 3 } },
    { text: "LEAD BIOINFORMATICIAN · FERMENTATION SCIENTIST · FIELD AGRONOMIST",
      options: { color: C.dark, bold: true, charSpacing: 3 } },
  ], {
    x: rX, y: credStartY + 2 * credH + 0.1, w: 13, h: 0.5,
    fontFace: FONT, fontSize: 12,
    align: "left", valign: "top", margin: 0,
  });
}

// ===============================================================
// SLIDE 10 - The Ask
// ===============================================================
function slide10() {
  const s = pres.addSlide();
  s.background = { color: C.green };
  addHeader(s, 10, "THE ASK", true);

  s.addText([
    { text: "$2M to prove it\n", options: { color: C.cream } },
    { text: "at scale.",          options: { color: C.peach, italic: true } },
  ], {
    x: 1.0, y: 1.9, w: 11, h: 3.2,
    fontFace: FONT, fontSize: 72,
    align: "left", valign: "top", margin: 0,
  });

  s.addText([
    { text: "A ", options: { color: C.cream } },
    { text: "24-month runway", options: { color: C.cream, bold: true } },
    { text: " to expand our strain library, run multi-site field trials across three Midwest ecotypes, and land our first paid commercial pilot.", options: { color: C.cream } },
  ], {
    x: 12.0, y: 2.6, w: 7.0, h: 2.6,
    fontFace: FONT, fontSize: 16,
    align: "left", valign: "top", margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 5.9, w: 18, h: 0,
    line: { color: C.ruleDk, width: 0.75 },
  });

  const allocs = [
    { pct: "45", dollar: "$900K", title: "R&D and field trials", body: "Multi-site, multi-ecotype trials in 2026 and 2027 — the data that unlocks Series A." },
    { pct: "35", dollar: "$700K", title: "Team of four",          body: "Bioinformatician, fermentation scientist, field agronomist, and lab tech." },
    { pct: "20", dollar: "$400K", title: "Lab & pilot ops",       body: "BSL-1 lab buildout, fermentation equipment, and partnership with a contract seed treater." },
  ];

  const allocW = 5.6, allocY = 6.3, allocStartX = 1.0, allocGap = 0.4;

  allocs.forEach((a, i) => {
    const x = allocStartX + i * (allocW + allocGap);
    s.addText([
      { text: a.pct, options: { fontSize: 60, color: C.peach } },
      { text: "  %",  options: { fontSize: 22, color: C.peach } },
    ], {
      x: x, y: allocY, w: allocW, h: 1.2,
      fontFace: FONT,
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(a.dollar, {
      x: x, y: allocY + 1.3, w: allocW, h: 0.5,
      fontFace: FONT, fontSize: 14, color: C.mutedLt, charSpacing: 4,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(a.title, {
      x: x, y: allocY + 1.85, w: allocW, h: 0.6,
      fontFace: FONT, fontSize: 18, color: C.cream,
      align: "left", valign: "top", margin: 0,
    });
    s.addText(a.body, {
      x: x, y: allocY + 2.55, w: allocW - 0.2, h: 1.6,
      fontFace: FONT, fontSize: 13, color: C.cream,
      align: "left", valign: "top", margin: 0,
    });
    if (i < allocs.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: x + allocW + allocGap / 2, y: allocY, w: 0, h: 4.0,
        line: { color: C.ruleDk, width: 0.5 },
      });
    }
  });

  s.addShape(pres.shapes.LINE, {
    x: 1.0, y: 10.4, w: 18, h: 0,
    line: { color: C.ruleDk, width: 0.75 },
  });
  s.addText("TERRACOAT · SEED ROUND 2026", {
    x: 1.0, y: 10.55, w: 9, h: 0.5,
    fontFace: FONT, fontSize: 13, color: C.mutedLt, charSpacing: 5,
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("hello@terracoat.bio", {
    x: 12, y: 10.55, w: 7, h: 0.5,
    fontFace: FONT, fontSize: 16, color: C.cream,
    align: "right", valign: "middle", margin: 0,
  });
}

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

pres.writeFile({ fileName: "terracoat.pptx" }).then(fn => console.log("Wrote:", fn));
