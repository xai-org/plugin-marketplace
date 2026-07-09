// build_gelatomax.js
//
// Recreates the GelatoMax investor deck (8 slides, 20" x 11.25") using pptxgenjs.
//
// Usage:
//   node build_gelatomax.js
//
// Required assets (must sit next to this file in an "assets/" folder):
//   assets/gelato_cup.png   -> illustration on slide 1
//   assets/founder.png      -> portrait on slide 3

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.author = "Giorgio Di Gelati";
pres.company = "GelatoMax";
pres.title = "GelatoMax — Friends & Family Round";

// ---------------------------------------------------------------------------
// Custom layout: the source deck is 20" x 11.25" (a wide 16:9)
// ---------------------------------------------------------------------------
pres.defineLayout({ name: "GELATOMAX_20x11_25", width: 20, height: 11.25 });
pres.layout = "GELATOMAX_20x11_25";

// ---------------------------------------------------------------------------
// Palette (extracted from the source .pptx)
// ---------------------------------------------------------------------------
const COLORS = {
  // neutrals / cream
  cream:      "F5EDE0",
  creamLight: "FAF5EA",
  creamWarm:  "EDE2CF",
  sand:       "D9C9B0",
  // ink / text
  darkInk:    "2A1F17",
  mediumInk:  "4A3A2E",
  mutedInk:   "7A6A5A",
  // brand accents
  wine:       "7F2F3F",
  olive:      "637043",
  // bar-chart extras
  sage:       "8FA264",
  raspberry:  "B24A5E",
  mustard:    "C08A3C",
  // dark-slide palette
  darkBg:     "2A1F17",
  darkRule:   "4A3A2E",
  gold:       "D7B26A",
  warmBrown:  "8F7A60",
  sandLight:  "C9B191",
  sandPale:   "E8D6B9",
  coral:      "E9B8A8",
  // ask-slide (maroon) palette
  maroonBg:   "7F2F3F",
  peach:      "F0CAA8",
  peachLight: "F3DCC5",
  peachMuted: "D8A389",
};

const FONT = "Arial";

// ---------------------------------------------------------------------------
// Helper: every slide has the same footer (page number + brand lock-up)
// ---------------------------------------------------------------------------
function addFooter(slide, pageNum, opts = {}) {
  const { color = COLORS.mutedInk, brandColor = COLORS.mutedInk } = opts;
  slide.addText(`${String(pageNum).padStart(2, "0")} / 08`, {
    x: 1.04, y: 10.65, w: 0.99, h: 0.33,
    fontFace: FONT, fontSize: 18, color, charSpacing: 2, margin: 0,
  });
  slide.addText("GelatoMax", {
    x: 17.80, y: 10.62, w: 1.25, h: 0.38,
    fontFace: FONT, fontSize: 18, italic: true, color: brandColor, margin: 0,
  });
}

// Small helper: section eyebrow in the top-left
function addEyebrow(slide, text, color) {
  slide.addText(text, {
    x: 1.04, y: 0.94, w: 18.45, h: 0.35,
    fontFace: FONT, fontSize: 18, color, charSpacing: 4, margin: 0,
  });
}

// Thin horizontal divider line (implemented as a 0.01"-tall rectangle to match source)
function addRule(slide, x, y, w, color = COLORS.sand) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.01,
    fill: { color }, line: { type: "none" },
  });
}

// ===========================================================================
// SLIDE 1 — Cover
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addEyebrow(s, "AN INVITATION — SPRING 2026", COLORS.wine);

  // "GelatoMax" wordmark - mixed run (regular + italic)
  s.addText([
    { text: "Gelato", options: { bold: true, color: COLORS.darkInk } },
    { text: "Max",    options: { bold: true, italic: true, color: COLORS.wine } },
  ], {
    x: 1.04, y: 2.52, w: 12.0, h: 1.65,
    fontFace: FONT, fontSize: 126, margin: 0,
  });

  // Tagline
  s.addText(
    "A Florida gelateria in the old Italian tradition — built by someone who has spent forty years learning how.",
    {
      x: 1.04, y: 5.30, w: 9.5, h: 1.8,
      fontFace: FONT, fontSize: 30, italic: true, color: COLORS.mediumInk,
      margin: 0,
    }
  );

  // Presented-by block
  s.addText([
    { text: "Presented by ", options: { color: COLORS.darkInk } },
    { text: "Giorgio Di Gelati", options: { color: COLORS.mutedInk } },
  ], { x: 1.04, y: 8.96, w: 9.41, h: 0.38, fontFace: FONT, fontSize: 18, margin: 0 });

  s.addText([
    { text: "For ", options: { color: COLORS.darkInk } },
    { text: "Family & friends", options: { color: COLORS.mutedInk } },
  ], { x: 1.04, y: 9.42, w: 9.41, h: 0.38, fontFace: FONT, fontSize: 18, margin: 0 });

  s.addText([
    { text: "Raising ", options: { color: COLORS.darkInk } },
    { text: "$100,000 · Seed round", options: { color: COLORS.mutedInk } },
  ], { x: 1.04, y: 9.88, w: 9.41, h: 0.38, fontFace: FONT, fontSize: 18, margin: 0 });

  // Gelato-cup illustration
  s.addImage({
    path: path.join(__dirname, "assets", "gelato_cup.png"),
    x: 11.96, y: 1.56, w: 6.04, h: 8.12,
  });

  addFooter(s, 1);
}

// ===========================================================================
// SLIDE 2 — The Opportunity
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addEyebrow(s, "THE OPPORTUNITY", COLORS.wine);

  // Big headline
  s.addText([
    { text: "Florida wants ", options: { bold: true, color: COLORS.darkInk } },
    { text: "real gelato ", options: { bold: true, italic: true, color: COLORS.wine } },
    { text: "— and no one is serving it.", options: { bold: true, color: COLORS.darkInk } },
  ], {
    x: 1.04, y: 1.49, w: 15.02, h: 1.95,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  // Supporting paragraph (left column)
  s.addText(
    "The American frozen-dessert market is enormous and growing. But what people crave when they travel to Rome or Bologna, they cannot find at home. That is the gap we fill.",
    {
      x: 1.04, y: 3.85, w: 8.69, h: 2.1,
      fontFace: FONT, fontSize: 25.5, italic: true, color: COLORS.mediumInk, margin: 0,
    }
  );

  // Three stats on the right, each separated by a thin rule
  const stats = [
    { big: "$13B", headline: "U.S. artisanal ice-cream & gelato category",
      sub: "Annual retail — growing ~5% year over year",
      ruleY: 3.49, bigY: 3.79 },
    { big: "22M",  headline: "Tourists visit our launch region annually",
      sub: "Florida Gulf Coast — a built-in audience",
      ruleY: 5.66, bigY: 5.96 },
    { big: "0",    headline: "Authentic Italian gelaterie within 15 miles",
      sub: "We map the competitive set — it is thin",
      ruleY: 7.48, bigY: 7.78 },
  ];
  stats.forEach(({ big, headline, sub, ruleY, bigY }) => {
    addRule(s, 10.52, ruleY, 8.44);
    s.addText(big, {
      x: 10.52, y: bigY, w: 2.79, h: 0.75,
      fontFace: FONT, fontSize: 45, bold: true, color: COLORS.olive, margin: 0,
    });
    s.addText(headline, {
      x: 13.73, y: bigY + 0.33, w: 5.39, h: 0.4,
      fontFace: FONT, fontSize: 19.5, color: COLORS.mediumInk, margin: 0,
    });
    s.addText(sub, {
      x: 13.73, y: bigY + 0.76, w: 5.39, h: 0.4,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, margin: 0,
    });
  });
  // Final rule under the third stat
  addRule(s, 10.52, 9.18, 8.44);

  addFooter(s, 2);
}

// ===========================================================================
// SLIDE 3 — The Founder
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addEyebrow(s, "THE FOUNDER", COLORS.wine);

  s.addText([
    { text: "Forty years in the ", options: { bold: true, color: COLORS.darkInk } },
    { text: "laboratorio",      options: { bold: true, italic: true, color: COLORS.wine } },
    { text: ".",                  options: { bold: true, color: COLORS.darkInk } },
  ], {
    x: 1.04, y: 1.45, w: 18.0, h: 1.1,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  // Portrait framing rectangle
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.04, y: 2.95, w: 6.46, h: 7.26,
    fill: { color: COLORS.creamWarm },
    line: { color: COLORS.sand, width: 0.5 },
  });
  // Portrait image
  s.addImage({
    path: path.join(__dirname, "assets", "founder.png"),
    x: 1.05, y: 2.96, w: 6.44, h: 7.24,
  });

  // Pull quote
  s.addText(
    "I have been making gelato for longer than most of my competitors have been alive.",
    {
      x: 8.54, y: 3.22, w: 10.73, h: 2.2,
      fontFace: FONT, fontSize: 40.5, italic: true, color: COLORS.darkInk, margin: 0,
    }
  );

  // Bio paragraph
  s.addText(
    "Giorgio Di Gelati has spent four decades perfecting the craft — apprenticing in family shops, running production kitchens, and developing the flavor library that will anchor GelatoMax. He has poured, stirred, frozen, and served more gelato than he can count. GelatoMax is the shop he has been preparing his whole life to open.",
    {
      x: 8.54, y: 5.92, w: 10.0, h: 2.8,
      fontFace: FONT, fontSize: 19.5, color: COLORS.mediumInk, margin: 0,
    }
  );

  // Attribution
  s.addText("— Giorgio Di Gelati", {
    x: 8.54, y: 9.12, w: 5.0, h: 0.5,
    fontFace: FONT, fontSize: 24, italic: true, color: COLORS.darkInk, margin: 0,
  });
  s.addText("FOUNDER & MAESTRO GELATIERE", {
    x: 8.54, y: 9.65, w: 10.73, h: 0.38,
    fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, charSpacing: 4, margin: 0,
  });

  addFooter(s, 3);
}

// ===========================================================================
// SLIDE 4 — What Makes It Different / Menu
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.creamLight };

  addEyebrow(s, "WHAT MAKES IT DIFFERENT", COLORS.wine);

  s.addText([
    { text: "An Italian ", options: { bold: true, color: COLORS.darkInk } },
    { text: "laboratorio ", options: { bold: true, italic: true, color: COLORS.wine } },
    { text: ", with flavors you cannot find elsewhere.", options: { bold: true, color: COLORS.darkInk } },
  ], {
    x: 1.04, y: 1.49, w: 15.02, h: 2.0,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  // --- Left column: three numbered points ---
  const points = [
    { num: "i.",   title: "Made in-house, daily",
      body: "Produced every morning in small batches on a traditional mantecatore. No industrial mixes, no shortcuts.",
      y: 3.58 },
    { num: "ii.",  title: "Florida ingredients, Italian technique",
      body: "Local citrus, stone-fruit, and dairy transformed using methods Giorgio learned in Emilia-Romagna.",
      y: 5.32 },
    { num: "iii.", title: "A rotating flavor library",
      body: "Eight staples, eight seasonal — pulled from a catalogue of 140+ developed over a career.",
      y: 7.06 },
  ];
  points.forEach(({ num, title, body, y }) => {
    s.addText(num, {
      x: 1.04, y, w: 0.75, h: 0.55,
      fontFace: FONT, fontSize: 33, italic: true, color: COLORS.wine, margin: 0,
    });
    s.addText(title, {
      x: 1.92, y: y + 0.01, w: 7.79, h: 0.55,
      fontFace: FONT, fontSize: 27, bold: true, color: COLORS.darkInk, margin: 0,
    });
    s.addText(body, {
      x: 1.92, y: y + 0.61, w: 7.79, h: 0.85,
      fontFace: FONT, fontSize: 18, color: COLORS.mediumInk, margin: 0,
    });
  });

  // --- Right column: the menu card ---
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.52, y: 3.58, w: 8.44, h: 6.63,
    fill: { color: COLORS.cream }, line: { color: COLORS.sand, width: 0.75 },
  });

  s.addText("Opening Menu", {
    x: 10.99, y: 3.96, w: 7.73, h: 0.55,
    fontFace: FONT, fontSize: 27, bold: true, color: COLORS.darkInk, margin: 0,
  });
  s.addText("a small selection, hand-picked", {
    x: 10.99, y: 4.52, w: 7.73, h: 0.4,
    fontFace: FONT, fontSize: 18, italic: true, color: COLORS.mutedInk, margin: 0,
  });

  const menu = [
    { name: "Pistacchio di Bronte",     desc: "Sicilian pistachio, nothing else",         price: "$6.50", y: 5.06 },
    { name: "Stracciatella",            desc: "Fior di latte, shaved dark chocolate",     price: "$6.00", y: 5.96 },
    { name: "Key Lime & Basil",         desc: "Florida key lime, fresh basil oil",        price: "$6.50", y: 6.87 },
    { name: "Espresso & Amaretto",      desc: "Triple-shot, folded with crushed amaretti",price: "$6.50", y: 7.77 },
    { name: "Ricotta & Honey",          desc: "Sheep-milk ricotta, honey",                price: "$7.00", y: 8.67 },
  ];
  menu.forEach(({ name, desc, price, y }, idx) => {
    s.addText(name, {
      x: 10.99, y, w: 6.87, h: 0.4,
      fontFace: FONT, fontSize: 19.5, color: COLORS.darkInk, margin: 0,
    });
    s.addText(desc, {
      x: 10.99, y: y + 0.41, w: 6.87, h: 0.37,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, margin: 0,
    });
    s.addText(price, {
      x: 17.87, y: y + 0.06, w: 0.8, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.mediumInk, align: "right", margin: 0,
    });
    // Divider after each row except the last
    if (idx < menu.length - 1) {
      addRule(s, 10.99, y + 0.81, 7.51);
    }
  });

  addFooter(s, 4);
}

// ===========================================================================
// SLIDE 5 — The Florida Launch (dark)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.darkBg };

  addEyebrow(s, "THE FLORIDA LAUNCH", COLORS.coral);

  s.addText([
    { text: "A three-phase rollout — ",   options: { bold: true, color: COLORS.cream } },
    { text: "small, proven, then scaled.", options: { bold: true, italic: true, color: COLORS.gold } },
  ], {
    x: 1.04, y: 1.49, w: 17.0, h: 2.0,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  const phases = [
    {
      x: 1.04,
      label: "PHASE 01",
      title: "Pop-ups & farmers markets",
      months: "Months 1 — 4",
      body:  "Build the brand, test flavors, collect a mailing list of locals and seasonal residents.",
      bullets: ["Two weekly market stalls", "Three curated pop-up nights", "500 early supporters on the list"],
    },
    {
      x: 7.18,
      label: "PHASE 02",
      title: "The scoop shop opens",
      months: "Months 5 — 9",
      body:  "A small, well-located Florida storefront — production in back, counter in front, a few café tables.",
      bullets: ["900 sq ft, walkable district", "16 flavors on the counter", "Grand opening for friends & family"],
    },
    {
      x: 13.32,
      label: "PHASE 03",
      title: "Wholesale & catering",
      months: "Months 10 — 24",
      body:  "Layer on B2B revenue — restaurants, hotels, and private events — to smooth seasonality.",
      bullets: ["Five restaurant accounts", "Weekly hotel delivery route", "Private-event catering menu"],
    },
  ];

  phases.forEach(({ x, label, title, months, body, bullets }) => {
    // Top divider above each column
    addRule(s, x, 4.08, 5.64, COLORS.darkRule);

    s.addText(label, {
      x, y: 4.46, w: 5.81, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.gold, charSpacing: 4, margin: 0,
    });
    s.addText(title, {
      x, y: 4.96, w: 5.81, h: 1.15,
      fontFace: FONT, fontSize: 33, color: COLORS.cream, margin: 0,
    });
    s.addText(months, {
      x, y: 6.17, w: 5.81, h: 0.4,
      fontFace: FONT, fontSize: 18, italic: true, color: COLORS.sandLight, margin: 0,
    });
    s.addText(body, {
      x, y: 6.72, w: 5.81, h: 1.0,
      fontFace: FONT, fontSize: 18, color: COLORS.sandLight, margin: 0,
    });

    // Three-line list (rendered as breakLine'd rich text to preserve line breaks)
    s.addText(
      bullets.map((t, i) => ({
        text: t,
        options: { breakLine: i < bullets.length - 1 },
      })),
      {
        x: x - 0.17, y: 7.76, w: 5.9, h: 1.4,
        fontFace: FONT, fontSize: 18, color: COLORS.sandPale,
        paraSpaceAfter: 4, margin: 0,
      }
    );
  });

  addFooter(s, 5, { color: COLORS.warmBrown, brandColor: COLORS.warmBrown });
}

// ===========================================================================
// SLIDE 6 — The Ask (maroon)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.maroonBg };

  addEyebrow(s, "THE ASK", COLORS.peach);

  // Giant "$ 100K" — left-hand hero
  s.addText([
    { text: "$ ",   options: { italic: true, color: COLORS.peach, fontSize: 150 } },
    { text: "100K", options: { bold: true,  color: COLORS.cream, fontSize: 240 } },
  ], {
    x: 1.04, y: 4.33, w: 10.0, h: 3.2,
    fontFace: FONT, margin: 0,
  });

  // Right-hand column
  s.addText("FRIENDS & FAMILY ROUND", {
    x: 11.29, y: 2.63, w: 7.9, h: 0.33,
    fontFace: FONT, fontSize: 18, color: COLORS.peach, charSpacing: 4, margin: 0,
  });
  s.addText([
    { text: "Enough to open the shop, ", options: { color: COLORS.cream } },
    { text: "and room to breathe ",       options: { italic: true, color: COLORS.cream } },
    { text: "in year one.",                options: { color: COLORS.cream } },
  ], {
    x: 11.29, y: 2.92, w: 8.0, h: 2.25,
    fontFace: FONT, fontSize: 42, margin: 0,
  });

  s.addText(
    "A modest, honest raise. Structured so you are never guessing — quarterly updates, an open kitchen, and a clear path to return.",
    {
      x: 11.29, y: 5.31, w: 7.9, h: 1.4,
      fontFace: FONT, fontSize: 19.5, color: COLORS.peachLight, margin: 0,
    }
  );

  // Divider above the structure block
  addRule(s, 11.29, 7.07, 7.67, COLORS.peach);

  // 2x2 terms grid
  const terms = [
    { label: "STRUCTURE",     value: "SAFE note",     x: 11.29, y: 7.36 },
    { label: "VALUATION CAP", value: "$750,000",      x: 15.37, y: 7.36 },
    { label: "MINIMUM CHECK", value: "$5,000",        x: 11.29, y: 8.34 },
    { label: "CLOSE",         value: "June 30, 2026", x: 15.37, y: 8.34 },
  ];
  terms.forEach(({ label, value, x, y }) => {
    s.addText(label, {
      x, y, w: 3.69, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.peach, charSpacing: 4, margin: 0,
    });
    s.addText(value, {
      x, y: y + 0.36, w: 3.69, h: 0.4,
      fontFace: FONT, fontSize: 21, color: COLORS.cream, margin: 0,
    });
  });

  addFooter(s, 6, { color: COLORS.peachMuted, brandColor: COLORS.peachMuted });
}

// ===========================================================================
// SLIDE 7 — Use of Funds
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };

  addEyebrow(s, "USE OF FUNDS", COLORS.wine);

  s.addText([
    { text: "Every dollar ",   options: { bold: true, color: COLORS.darkInk } },
    { text: "earmarked, ",     options: { bold: true, italic: true, color: COLORS.wine } },
    { text: "before we take it.", options: { bold: true, color: COLORS.darkInk } },
  ], {
    x: 1.04, y: 1.49, w: 15.02, h: 2.0,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  // --- Left column: itemised bars ---
  // Width of the full bar is 8.44". The filled portion scales with the percentage.
  const items = [
    { name: "Equipment & build-out",          amount: "$42,000 · 42%", pct: 0.42, color: COLORS.sage,      detail: "Mantecatore, pozzetti display, refrigeration, counter build, signage.", y: 3.55 },
    { name: "Lease & deposits",               amount: "$22,000 · 22%", pct: 0.22, color: COLORS.raspberry, detail: "Six months of base rent, security deposit, utility deposits.",       y: 4.90 },
    { name: "Ingredients & opening inventory",amount: "$15,000 · 15%", pct: 0.15, color: COLORS.mustard,   detail: "Italian pistachio, dairy contracts, Florida citrus, packaging.",     y: 6.25 },
    { name: "Marketing & launch",             amount: "$11,000 · 11%", pct: 0.11, color: COLORS.darkInk,   detail: "Brand identity, photography, launch event, local press.",            y: 7.60 },
    { name: "Operating reserve",              amount: "$10,000 · 10%", pct: 0.10, color: COLORS.olive,     detail: "Cushion for the slow first months — so we never panic-scoop.",      y: 8.95 },
  ];
  const BAR_W = 8.44;
  items.forEach(({ name, amount, pct, color, detail, y }) => {
    s.addText(name, {
      x: 1.04, y, w: 6.76, h: 0.46,
      fontFace: FONT, fontSize: 22.5, color: COLORS.darkInk, margin: 0,
    });
    s.addText(amount, {
      x: 7.85, y: y + 0.11, w: 1.71, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.mediumInk, align: "right", margin: 0,
    });
    // Track
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.04, y: y + 0.54, w: BAR_W, h: 0.19,
      fill: { color: COLORS.creamWarm }, line: { type: "none" },
    });
    // Filled portion
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.04, y: y + 0.54, w: BAR_W * pct, h: 0.19,
      fill: { color }, line: { type: "none" },
    });
    s.addText(detail, {
      x: 1.04, y: y + 0.85, w: 8.69, h: 0.42,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, margin: 0,
    });
  });

  // --- Right column: pull quote + runway card ---
  s.addText(
    "\u201CThe worst gelato is made by a shop that is worried about rent.\u201D",
    {
      x: 10.52, y: 4.80, w: 8.69, h: 1.25,
      fontFace: FONT, fontSize: 33, italic: true, color: COLORS.darkInk, margin: 0,
    }
  );

  // Runway card background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.52, y: 6.28, w: 8.44, h: 2.42,
    fill: { color: COLORS.creamLight },
    line: { color: COLORS.sand, width: 0.75 },
  });

  // "9mo" compound number
  s.addText([
    { text: "9",  options: { bold: true, color: COLORS.olive, fontSize: 72 } },
    { text: "mo", options: { bold: true, color: COLORS.olive, fontSize: 36 } },
  ], {
    x: 10.94, y: 6.99, w: 1.55, h: 1.1,
    fontFace: FONT, margin: 0, valign: "bottom",
  });

  s.addText("Of runway", {
    x: 12.54, y: 6.66, w: 6.17, h: 0.55,
    fontFace: FONT, fontSize: 22.5, color: COLORS.darkInk, margin: 0,
  });
  s.addText(
    "Covers the opening, the first slow summer, and the ramp into our first full peak season without outside pressure.",
    {
      x: 12.54, y: 7.23, w: 6.0, h: 1.15,
      fontFace: FONT, fontSize: 18, color: COLORS.mediumInk, margin: 0,
    }
  );

  addFooter(s, 7);
}

// ===========================================================================
// SLIDE 8 — The Next Three Years (custom bar chart + table)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.creamWarm };

  addEyebrow(s, "THE NEXT THREE YEARS", COLORS.wine);

  s.addText([
    { text: "Conservative revenue, ", options: { bold: true, color: COLORS.darkInk } },
    { text: "believable growth.",      options: { bold: true, italic: true, color: COLORS.wine } },
  ], {
    x: 1.04, y: 1.49, w: 18.0, h: 1.1,
    fontFace: FONT, fontSize: 60, margin: 0,
  });

  // --- Chart canvas ---
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.04, y: 2.70, w: 9.97, h: 7.51,
    fill: { color: COLORS.creamLight }, line: { color: COLORS.sand, width: 0.75 },
  });

  s.addText("Projected annual revenue ($K)", {
    x: 1.80, y: 3.21, w: 8.88, h: 0.43,
    fontFace: FONT, fontSize: 21, italic: true, color: COLORS.mediumInk, margin: 0,
  });

  // Y-axis gridlines + labels.
  // Baseline is 9.45" — each $200K step = 1.88".
  const gridRows = [
    { label: "$600K", y: 3.62, ruleY: 3.76 },
    { label: "$400K", y: 5.50, ruleY: 5.64 },
    { label: "$200K", y: 7.38, ruleY: 7.52 },
    { label: "$0",    y: 9.31, ruleY: 9.45 },
  ];
  gridRows.forEach(({ label, y, ruleY }) => {
    addRule(s, 1.80, ruleY, 8.62);
    s.addText(label, {
      x: 1.05, y, w: 0.81, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, margin: 0,
    });
  });

  // Bars ($K -> inches: 1.88" per $200K => ratio of 1.88/200 = 0.0094")
  const PX_PER_K = 1.88 / 200;
  const BASE_Y  = 9.45;
  const bars = [
    { x: 2.83, val: 180, label: "$180K", color: COLORS.sage,      cap: COLORS.olive,     labelX: 2.99 },
    { x: 5.42, val: 340, label: "$340K", color: COLORS.sage,      cap: COLORS.olive,     labelX: 5.57 },
    { x: 8.00, val: 520, label: "$520K", color: COLORS.raspberry, cap: COLORS.wine,      labelX: 8.16 },
  ];
  bars.forEach(({ x, val, label, color, cap, labelX }) => {
    const h = val * PX_PER_K;
    const y = BASE_Y - h;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 1.25, h,
      fill: { color }, line: { type: "none" },
    });
    // Darker cap stripe on top
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 1.25, h: 0.03,
      fill: { color: cap }, line: { type: "none" },
    });
    // Value label above bar
    s.addText(label, {
      x: labelX, y: y - 0.55, w: 1.05, h: 0.5,
      fontFace: FONT, fontSize: 24, bold: true, color: COLORS.darkInk, margin: 0, align: "center",
    });
  });

  // X-axis labels — widen boxes so tracked-out "YEAR 1" doesn't wrap
  [
    { x: 2.63, label: "YEAR 1" },
    { x: 5.28, label: "YEAR 2" },
    { x: 7.92, label: "YEAR 3" },
  ].forEach(({ x, label }) => {
    s.addText(label, {
      x, y: 9.66, w: 1.72, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, charSpacing: 4, margin: 0, align: "center",
    });
  });

  // --- Right-hand data table (drawn manually to match the source exactly) ---
  // Column x-positions
  const COL = { label: 11.84, y1: 13.62, y2: 15.40, y3: 17.18 };

  // Header rules
  addRule(s, 11.84, 3.33, 7.12);
  // Header labels
  ["YEAR 1", "YEAR 2", "YEAR 3"].forEach((h, i) => {
    const x = [COL.y1, COL.y2, COL.y3][i];
    s.addText(h, {
      x, y: 2.89, w: 1.86, h: 0.33,
      fontFace: FONT, fontSize: 18, color: COLORS.mutedInk, charSpacing: 4, margin: 0,
    });
  });

  const rows = [
    { label: "Revenue",           vals: ["$180K", "$340K", "$520K"], rowY: 3.52, ruleY: 4.04 },
    { label: "Gross margin",      vals: ["62%",   "66%",   "68%"   ], rowY: 4.24, ruleY: 4.76 },
    { label: "Scoops / day",      vals: ["~110",  "~190",  "~270"  ], rowY: 4.95, ruleY: 5.47 },
    { label: "Wholesale accounts",vals: ["0",     "5",     "12"    ], rowY: 5.67, ruleY: 6.52, labelH: 0.71 },
    { label: "Net to founders",  vals: ["($14K)", "$42K",  "$98K"  ], rowY: 6.72, ruleY: 7.24 },
  ];
  rows.forEach(({ label, vals, rowY, ruleY, labelH = 0.38 }) => {
    s.addText(label, {
      x: COL.label, y: rowY, w: 1.86, h: labelH,
      fontFace: FONT, fontSize: 18, color: COLORS.darkInk, margin: 0,
    });
    vals.forEach((v, i) => {
      const x = [COL.y1, COL.y2, COL.y3][i];
      s.addText(v, {
        x, y: rowY + 0.04, w: 1.86, h: 0.33,
        fontFace: FONT, fontSize: 18, color: COLORS.darkInk, margin: 0,
      });
    });
    addRule(s, 11.84, ruleY, 7.12);
  });

  // Footnote under the table
  s.addText(
    "Projections assume one Florida storefront, seasonal market presence, and modest wholesale beginning in Year 2. Intentionally below category benchmarks.",
    {
      x: 11.84, y: 7.45, w: 6.08, h: 1.2,
      fontFace: FONT, fontSize: 18, italic: true, color: COLORS.mutedInk, margin: 0,
    }
  );

  addFooter(s, 8);
}

// ---------------------------------------------------------------------------
// Write the file
// ---------------------------------------------------------------------------
pres.writeFile({ fileName: "GelatoMax.pptx" })
    .then(fn => console.log("Wrote " + fn));
