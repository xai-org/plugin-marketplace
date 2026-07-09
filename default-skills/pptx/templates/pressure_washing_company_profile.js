// Squeaky Clean Pressure Washing — Services & Pricing 2026
// Recreates the source PPTX using pptxgenjs
//
// Run:
//   npm install pptxgenjs      (or -g)
//   node squeaky_clean.js
//
// Output: Squeaky_Clean_Pressure_Washing.pptx

const pptxgen = require("pptxgenjs");

// ---------- palette & type ----------
const C = {
  navyDeep:  "0B2540", // primary dark navy (titles, dark slide bg)
  navyAlt:   "0B3B66", // secondary navy (dark card bg)
  blue:      "1D6FB8", // accent blue (eyebrows, numerals, logo square)
  teal:      "2EA3A0", // accent teal (italic accents, "most popular" pill)
  slate:     "3B5676", // body text / muted headings
  gray:      "7B8FA8", // captions, footers
  border:    "DCE5EF", // card borders, divider lines
  tintBlue:  "E6F0FA", // icon circle tint
  bg:        "F4F7FA", // light slide background
  white:     "FFFFFF",
  gold:      "E8A33B", // review stars
};

const FONT = "Arial";

// ---------- presentation (20" x 11.25") ----------
const pres = new pptxgen();
pres.defineLayout({ name: "SQ_WIDE", width: 20, height: 11.25 });
pres.layout = "SQ_WIDE";
pres.title  = "Squeaky Clean — Services & Pricing 2026";
pres.author = "Squeaky Clean Pressure Washing";

// ---------- shared helpers ----------
const SW = 20, SH = 11.25;

function makeShadow() {
  return { type: "outer", color: "000000", opacity: 0.08, blur: 10, offset: 2, angle: 90 };
}

// Top header: logo square + brand lockup on the left, eyebrow pill on the right
function addHeader(slide, eyebrowText) {
  // logo square
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: 0.75, w: 0.65, h: 0.65,
    fill: { color: C.blue }, line: { color: C.blue }, rectRadius: 0.08,
  });
  // brand name
  slide.addText("Squeaky Clean", {
    x: 1.7, y: 0.72, w: 4.2, h: 0.38,
    fontFace: FONT, fontSize: 15, bold: true, color: C.navyDeep, margin: 0, valign: "middle",
  });
  // brand tagline
  slide.addText("PRESSURE WASHING · ATLANTA, GA", {
    x: 1.7, y: 1.07, w: 4.2, h: 0.32,
    fontFace: FONT, fontSize: 9, color: C.gray, charSpacing: 3, margin: 0, valign: "middle",
  });

  // eyebrow pill (top-right)
  if (eyebrowText) {
    const pillW = 3.4, pillH = 0.52, pillX = SW - 0.9 - pillW, pillY = 0.82;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.26,
    });
    slide.addText(eyebrowText, {
      x: pillX, y: pillY, w: pillW, h: pillH,
      fontFace: FONT, fontSize: 9.5, bold: true, color: C.blue,
      charSpacing: 3, align: "center", valign: "middle", margin: 0,
    });
  }
}

// Top divider line under header
function addTopDivider(slide) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.9, y: 1.55, w: SW - 1.8, h: 0,
    line: { color: C.border, width: 0.75 },
  });
}

// Bottom footer: left tagline + page counter on the right
function addFooter(slide, leftText, pageN, total = 10) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.9, y: SH - 0.95, w: SW - 1.8, h: 0,
    line: { color: C.border, width: 0.75 },
  });
  if (leftText) {
    slide.addText(leftText, {
      x: 0.9, y: SH - 0.7, w: 14, h: 0.4,
      fontFace: FONT, fontSize: 10, color: C.gray, charSpacing: 3, margin: 0, valign: "middle",
    });
  }
  // page counter (right aligned)
  slide.addText(
    [
      { text: String(pageN).padStart(2, "0"), options: { color: C.slate, bold: true } },
      { text: " / " + total, options: { color: C.gray } },
    ],
    {
      x: SW - 3.0, y: SH - 0.7, w: 2.1, h: 0.4,
      fontFace: FONT, fontSize: 10, charSpacing: 2, align: "right", valign: "middle", margin: 0,
    }
  );
}

// Section eyebrow (small uppercase blue label above a big title)
function addEyebrow(slide, text, x, y, w = 10) {
  slide.addText(text, {
    x, y, w, h: 0.38,
    fontFace: FONT, fontSize: 11, bold: true, color: C.blue,
    charSpacing: 4, margin: 0, valign: "middle",
  });
}

// ============================================================
// SLIDE 1 — Cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // right dark panel
  const panelX = 11.8, panelW = SW - panelX;
  s.addShape(pres.shapes.RECTANGLE, {
    x: panelX, y: 0, w: panelW, h: SH,
    fill: { color: C.navyDeep }, line: { color: C.navyDeep },
  });

  // big soft circle on the dark panel
  const circleD = 6.2, circleX = panelX + (panelW - circleD) / 2, circleY = 2.4;
  s.addShape(pres.shapes.OVAL, {
    x: circleX, y: circleY, w: circleD, h: circleD,
    fill: { color: C.blue, transparency: 70 }, line: { color: C.blue, transparency: 50, width: 0.75 },
  });
  // tiny moon/dot bottom-right of the circle
  s.addShape(pres.shapes.OVAL, {
    x: circleX + circleD - 1.25, y: circleY + circleD - 1.05, w: 0.55, h: 0.55,
    fill: { color: C.white, transparency: 70 }, line: { color: C.white, transparency: 50, width: 0.75 },
  });

  // HEADER (logo + brand + pill)
  addHeader(s, "● SERVICES & PRICING · 2026");

  // Eyebrow
  addEyebrow(s, "ECO-SAFE EXTERIOR CLEANING", 0.9, 2.55, 10);

  // Big hero title with italic accent word
  s.addText(
    [
      { text: "A cleaner home, done", options: { breakLine: true } },
      { text: "the " },
      { text: "right", options: { italic: true, color: C.blue } },
      { text: " way." },
    ],
    {
      x: 0.9, y: 3.0, w: 13.0, h: 2.8,
      fontFace: FONT, fontSize: 56, bold: true, color: C.navyDeep,
      valign: "top", margin: 0,
    }
  );

  // Divider above bottom stat row
  s.addShape(pres.shapes.LINE, {
    x: 0.9, y: 8.75, w: 10.3, h: 0,
    line: { color: C.border, width: 0.75 },
  });

  // Bottom stat row (4 items on the left panel)
  const stats = [
    { label: "SINCE",      value: "2016 · 10 yrs" },
    { label: "CERTIFIED",  value: "PWNA Trained" },
    { label: "OWNERSHIP", value: "Minority & Family Owned" },
    { label: "SERVING",    value: "Metro Atlanta" },
  ];
  const statX = 0.9, statY = 9.0, statW = 2.55, gap = 0.05;
  stats.forEach((st, i) => {
    const x = statX + i * (statW + gap);
    s.addText(st.label, {
      x, y: statY, w: statW, h: 0.32,
      fontFace: FONT, fontSize: 9, bold: true, color: C.gray, charSpacing: 3, margin: 0,
    });
    s.addText(st.value, {
      x, y: statY + 0.34, w: statW, h: 0.42,
      fontFace: FONT, fontSize: 13.5, bold: true, color: C.navyDeep, margin: 0,
    });
  });

  // Footer tags — split across the two panels
  s.addText("LOW-PRESSURE · SOFT WASH", {
    x: 12.2, y: SH - 0.7, w: 5.2, h: 0.4,
    fontFace: FONT, fontSize: 9.5, color: C.white, charSpacing: 3,
    transparency: 30, margin: 0, valign: "middle",
  });
  s.addText(
    [
      { text: "01", options: { color: C.white, bold: true } },
      { text: " / 10", options: { color: C.white } },
    ],
    {
      x: SW - 2.3, y: SH - 0.7, w: 1.6, h: 0.4,
      fontFace: FONT, fontSize: 10, charSpacing: 2, align: "right", valign: "middle",
      margin: 0, transparency: 30,
    }
  );
}

// ============================================================
// SLIDE 2 — Who We Are
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "01 · WHO WE ARE");
  addTopDivider(s);

  // Eyebrow
  addEyebrow(s, "A DECADE OF CURB APPEAL", 0.9, 1.85, 10);

  // Big title
  s.addText("Atlanta's trusted exterior\ncleaning crew.", {
    x: 0.9, y: 2.25, w: 10.5, h: 2.3,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });

  // Body copy
  s.addText(
    "We're a family-owned, minority-owned pressure washing company serving metro Atlanta for ten years. " +
    "Every service we offer is built around low-pressure, eco-safe methods that protect your property, " +
    "your plants, and the people who live near it.",
    {
      x: 0.9, y: 4.75, w: 8.5, h: 2.0,
      fontFace: FONT, fontSize: 16, color: C.slate, lineSpacingMultiple: 1.25, margin: 0,
    }
  );

  // 2x2 stat cards (bottom left)
  const cards = [
    { big: "10",     sub: "Years serving metro Atlanta" },
    { big: "2,400+", sub: "Homes & businesses cleaned" },
    { big: "PWNA",   sub: "Certified & continuously trained" },
    { big: "100%",   sub: "Satisfaction guarantee" },
  ];
  const cardW = 3.75, cardH = 1.5, cardGap = 0.2;
  const cardX0 = 0.9, cardY0 = 6.7;
  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = cardX0 + col * (cardW + cardGap);
    const y = cardY0 + row * (cardH + cardGap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.12,
      shadow: makeShadow(),
    });
    s.addText(c.big, {
      x: x + 0.3, y: y + 0.2, w: cardW - 0.6, h: 0.8,
      fontFace: FONT, fontSize: 32, bold: true, color: C.blue, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.3, y: y + 1.0, w: cardW - 0.6, h: 0.4,
      fontFace: FONT, fontSize: 11.5, color: C.slate, margin: 0,
    });
  });

  // Right-side image placeholder panel
  const rightX = 9.7, rightY = 1.85, rightW = 9.4, rightH = 7.05;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rightX, y: rightY, w: rightW, h: rightH,
    fill: { color: C.tintBlue }, line: { color: C.border, width: 1 }, rectRadius: 0.14,
  });
  // centered "photo placeholder" pill
  const pillW = 2.5, pillH = 0.48;
  const pillX = rightX + (rightW - pillW) / 2, pillY = rightY + (rightH - pillH) / 2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: pillX, y: pillY, w: pillW, h: pillH,
    fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.24,
  });
  s.addText("CREW · ON-SITE PHOTO", {
    x: pillX, y: pillY, w: pillW, h: pillH,
    fontFace: FONT, fontSize: 10, bold: true, color: C.slate,
    charSpacing: 3, align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, "SQUEAKY CLEAN · EST. 2016", 2);
}

// ============================================================
// SLIDE 3 — Why Squeaky Clean (4 commitments)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "02 · WHY SQUEAKY CLEAN");
  addTopDivider(s);

  addEyebrow(s, "WHAT SETS US APART", 0.9, 1.85, 10);

  s.addText("Safer chemistry. Gentler\npressure. Better results.", {
    x: 0.9, y: 2.25, w: 13.5, h: 2.4,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });

  // Right-aligned tagline
  s.addText("Four commitments we make on every job —\nresidential or commercial.", {
    x: 14.5, y: 3.25, w: 4.6, h: 1.5,
    fontFace: FONT, fontSize: 13, color: C.slate, align: "right", valign: "top", margin: 0,
    lineSpacingMultiple: 1.3,
  });

  // 4 commitment cards
  const items = [
    { num: "01 · ECO-SAFE",    title: "Plant & pet safe solutions",  body: "Biodegradable surfactants that break down grime without poisoning your lawn, koi pond, or the kid that plays on the patio tomorrow." },
    { num: "02 · SOFT WASH",   title: "Low-pressure technique",       body: "We use chemistry — not brute force. Less than 500 PSI on delicate surfaces like roofs, stucco, and painted siding. No etching. No blown mortar." },
    { num: "03 · CERTIFIED",   title: "PWNA trained crews",           body: "Every technician completes Power Washers of North America safety & technique training. Fully insured, background checked, uniformed." },
    { num: "04 · GUARANTEED",  title: "100% satisfaction",            body: "Family owned, minority owned, and personally accountable. If you're not thrilled, we come back until you are — or you don't pay." },
  ];
  const cardW = 4.4, cardH = 3.6, gap = 0.25;
  const startX = 0.9, startY = 5.35;
  items.forEach((it, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.14,
      shadow: makeShadow(),
    });
    s.addText(it.num, {
      x: x + 0.35, y: startY + 0.35, w: cardW - 0.7, h: 0.32,
      fontFace: FONT, fontSize: 10.5, bold: true, color: C.blue, charSpacing: 3, margin: 0,
    });
    s.addText(it.title, {
      x: x + 0.35, y: startY + 0.7, w: cardW - 0.7, h: 0.55,
      fontFace: FONT, fontSize: 18, bold: true, color: C.navyDeep, margin: 0,
    });
    s.addText(it.body, {
      x: x + 0.35, y: startY + 1.4, w: cardW - 0.7, h: 2.0,
      fontFace: FONT, fontSize: 12, color: C.slate, lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  addFooter(s, "LOW PRESSURE · ECO-SAFE · CERTIFIED", 3);
}

// ============================================================
// SLIDE 4 — Services (9 surfaces grid)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "03 · SERVICES");
  addTopDivider(s);

  addEyebrow(s, "NINE SURFACES, ONE CREW", 0.9, 1.85, 10);
  s.addText("Everything on the outside\nof your property.", {
    x: 0.9, y: 2.25, w: 13, h: 2.4,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });
  s.addText("Residential and commercial. Bundle any three into\na package for a discount.", {
    x: 14.5, y: 3.25, w: 4.6, h: 1.5,
    fontFace: FONT, fontSize: 13, color: C.slate, align: "right", valign: "top", margin: 0,
    lineSpacingMultiple: 1.3,
  });

  // 3x3 grid of service cards
  const services = [
    { abbr: "Pa", name: "Patios",    body: "Ground-in grime, algae, and grease lifted from concrete, pavers, and stone." },
    { abbr: "Sw", name: "Sidewalks", body: "Gum, oil, and black streaking removed without damaging surrounding lawn." },
    { abbr: "Wa", name: "Walls",     body: "Exterior walls brought back to bright — stucco, block, and painted surfaces." },
    { abbr: "Fe", name: "Fences",    body: "Wood, vinyl, and metal fencing cleaned and brightened, ready for stain or sealant." },
    { abbr: "Dr", name: "Driveways", body: "Oil stains, tire marks, and years of traffic lifted from concrete and asphalt." },
    { abbr: "Br", name: "Brick",     body: "Low-pressure soft wash that cleans deeply without blowing out mortar joints." },
    { abbr: "Si", name: "Siding",    body: "Vinyl, HardiePlank, and wood siding washed with surface-safe chemistry." },
    { abbr: "Wi", name: "Windows",   body: "Streak-free exterior window cleaning, frames and sills included." },
    { abbr: "Ro", name: "Roofs",     body: "Soft-wash roof treatment kills algae and black streaks without walking shingles." },
  ];

  const cols = 3, cardW = 5.9, cardH = 1.55, gap = 0.25;
  const startX = 0.9, startY = 5.25;
  services.forEach((sv, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = startX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.12,
      shadow: makeShadow(),
    });
    // icon tile (abbreviation in a tinted square)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.3, y: y + 0.3, w: 0.8, h: 0.8,
      fill: { color: C.tintBlue }, line: { color: C.tintBlue }, rectRadius: 0.12,
    });
    s.addText(sv.abbr, {
      x: x + 0.3, y: y + 0.3, w: 0.8, h: 0.8,
      fontFace: FONT, fontSize: 16, bold: true, color: C.blue,
      align: "center", valign: "middle", margin: 0,
    });
    // name
    s.addText(sv.name, {
      x: x + 1.3, y: y + 0.3, w: cardW - 1.55, h: 0.4,
      fontFace: FONT, fontSize: 16, bold: true, color: C.navyDeep, margin: 0, valign: "middle",
    });
    // body
    s.addText(sv.body, {
      x: x + 1.3, y: y + 0.72, w: cardW - 1.55, h: 0.75,
      fontFace: FONT, fontSize: 11, color: C.slate, lineSpacingMultiple: 1.25, margin: 0,
    });
  });

  addFooter(s, "RESIDENTIAL & COMMERCIAL · METRO ATLANTA", 4);
}

// ============================================================
// SLIDE 5 — Process (4 steps)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "04 · OUR PROCESS");
  addTopDivider(s);

  addEyebrow(s, "HOW A SQUEAKY CLEAN JOB WORKS", 0.9, 1.85, 12);
  s.addText("Four steps, no surprises.", {
    x: 0.9, y: 2.25, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, margin: 0,
  });

  const steps = [
    { num: "01", title: "Quote",       body: "Free on-site or photo-based estimate within 24 hours. Fixed pricing — no creep, no upsells." },
    { num: "02", title: "Prep",        body: "We cover plants, pre-rinse landscaping, and protect outlets and light fixtures before any chemistry touches the building." },
    { num: "03", title: "Clean",       body: "Soft wash application, dwell time, low-pressure rinse. Adjusted per surface — roof to driveway." },
    { num: "04", title: "Walk-Through",body: "We walk the property with you. If any square foot isn't right, we redo it on the spot. That's the guarantee." },
  ];
  const cardW = 4.4, cardH = 3.4, gap = 0.25;
  const startX = 0.9, startY = 4.6;
  steps.forEach((st, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.14,
      shadow: makeShadow(),
    });
    s.addText(st.num, {
      x: x + 0.35, y: startY + 0.35, w: cardW - 0.7, h: 0.9,
      fontFace: FONT, fontSize: 44, bold: true, color: C.blue, margin: 0,
    });
    s.addText(st.title, {
      x: x + 0.35, y: startY + 1.3, w: cardW - 0.7, h: 0.5,
      fontFace: FONT, fontSize: 18, bold: true, color: C.navyDeep, margin: 0,
    });
    s.addText(st.body, {
      x: x + 0.35, y: startY + 1.9, w: cardW - 0.7, h: 1.3,
      fontFace: FONT, fontSize: 12, color: C.slate, lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  addFooter(s, "TYPICAL SINGLE-SERVICE VISIT: 2–4 HOURS", 5);
}

// ============================================================
// SLIDE 6 — Packages (3 pricing cards, middle one dark)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "05 · PACKAGES");
  addTopDivider(s);

  addEyebrow(s, "BUNDLED PRICING · RESIDENTIAL", 0.9, 1.85, 10);
  s.addText("Pick a package.\nSave the math.", {
    x: 0.9, y: 2.25, w: 12, h: 2.3,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });
  s.addText(
    "Prices shown are starting rates for a typical 2,000 sq ft single-family home in metro Atlanta. " +
    "Final quote confirmed after a free walk-through.",
    {
      x: 13.0, y: 3.2, w: 6.1, h: 1.6,
      fontFace: FONT, fontSize: 12.5, color: C.slate, align: "right", valign: "top",
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  const packs = [
    {
      eyebrow: "REFRESH",
      name: "The Essentials",
      tagline: "Driveway, sidewalk, and front walkway — the curb-appeal basics.",
      price: "249",
      items: [
        "Driveway (up to 600 sq ft)",
        "Front walkway & sidewalk",
        "Soft-wash pre-treatment",
        "Spot treatment for oil stains",
        "Post-clean walk-through",
      ],
      dark: false,
      popular: false,
    },
    {
      eyebrow: "WHOLE HOME",
      name: "The Squeaky",
      tagline: "Our signature package — covers everything most homeowners call us about.",
      price: "549",
      items: [
        "Full siding soft wash",
        "Driveway, sidewalks & walkways",
        "Back patio or deck",
        "Exterior windows & frames",
        "Gutter face brightening",
        "Priority scheduling",
      ],
      dark: true,
      popular: true,
    },
    {
      eyebrow: "TOP TO BOTTOM",
      name: "The Full Rinse",
      tagline: "Whole Home plus a soft-wash roof treatment and fencing.",
      price: "849",
      items: [
        "Everything in The Squeaky",
        "Soft-wash roof treatment",
        "Full perimeter fencing",
        "Brick & stone detail work",
        "Annual maintenance reminder",
      ],
      dark: false,
      popular: false,
    },
  ];

  const cardW = 5.9, cardH = 5.2, gap = 0.3;
  const startX = 0.9, startY = 4.85;

  packs.forEach((p, i) => {
    const x = startX + i * (cardW + gap);

    // "MOST POPULAR" teal pill on the middle card (above the card)
    if (p.popular) {
      const pillW = 2.0, pillH = 0.42;
      const pillX = x + (cardW - pillW) / 2, pillY = startY - pillH + 0.05;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: pillX, y: pillY, w: pillW, h: pillH,
        fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.21,
      });
      s.addText("MOST POPULAR", {
        x: pillX, y: pillY, w: pillW, h: pillH,
        fontFace: FONT, fontSize: 9, bold: true, color: C.white,
        charSpacing: 3, align: "center", valign: "middle", margin: 0,
      });
    }

    // Card
    const cardFill = p.dark ? C.navyAlt : C.white;
    const textMain = p.dark ? C.white : C.navyDeep;
    const textMuted = p.dark ? "B8CCE4" : C.slate;
    const dividerColor = p.dark ? "2B567D" : C.border;

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: cardFill },
      line: { color: p.dark ? C.navyAlt : C.border, width: 1 },
      rectRadius: 0.16,
      shadow: makeShadow(),
    });

    s.addText(p.eyebrow, {
      x: x + 0.45, y: startY + 0.35, w: cardW - 0.9, h: 0.32,
      fontFace: FONT, fontSize: 10.5, bold: true,
      color: p.dark ? C.teal : C.blue,
      charSpacing: 3, margin: 0,
    });
    s.addText(p.name, {
      x: x + 0.45, y: startY + 0.7, w: cardW - 0.9, h: 0.55,
      fontFace: FONT, fontSize: 24, bold: true, color: textMain, margin: 0,
    });
    s.addText(p.tagline, {
      x: x + 0.45, y: startY + 1.3, w: cardW - 0.9, h: 0.85,
      fontFace: FONT, fontSize: 11.5, color: textMuted, lineSpacingMultiple: 1.3, margin: 0,
    });

    // price: $ + big number + "starting"
    const priceY = startY + 2.3;
    s.addText("$", {
      x: x + 0.45, y: priceY + 0.45, w: 0.5, h: 0.6,
      fontFace: FONT, fontSize: 22, bold: true, color: textMuted, margin: 0, valign: "top",
    });
    s.addText(p.price, {
      x: x + 0.9, y: priceY, w: 2.5, h: 1.05,
      fontFace: FONT, fontSize: 56, bold: true, color: textMain, margin: 0, valign: "top",
    });
    s.addText("starting", {
      x: x + 3.15, y: priceY + 0.7, w: 1.5, h: 0.35,
      fontFace: FONT, fontSize: 11, color: textMuted, margin: 0, valign: "top",
    });

    // divider under price
    s.addShape(pres.shapes.LINE, {
      x: x + 0.45, y: startY + 3.5, w: cardW - 0.9, h: 0,
      line: { color: dividerColor, width: 0.75 },
    });

    // bullet items (plain lines, no bullet character — matches original)
    const items = p.items.map((it, idx) => ({
      text: it,
      options: { breakLine: idx < p.items.length - 1 },
    }));
    s.addText(items, {
      x: x + 0.45, y: startY + 3.65, w: cardW - 0.9, h: 1.45,
      fontFace: FONT, fontSize: 11, color: textMain, lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  addFooter(s, "COMMERCIAL QUOTED SEPARATELY · CONTACT FOR MULTI-PROPERTY RATES", 6);
}

// ============================================================
// SLIDE 7 — À la carte rates (2-column price list)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "06 · À LA CARTE RATES");
  addTopDivider(s);

  addEyebrow(s, "SINGLE-SERVICE PRICING", 0.9, 1.85, 10);
  s.addText("Just one thing?\nNo problem.", {
    x: 0.9, y: 2.25, w: 12, h: 2.3,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });
  s.addText(
    "Starting prices for individual services. Bundling any three earns\n" +
    "an automatic 15% discount — which is how our packages are priced.",
    {
      x: 12.5, y: 3.25, w: 6.6, h: 1.6,
      fontFace: FONT, fontSize: 13, color: C.slate, align: "right", valign: "top",
      lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Two columns
  const flat = [
    { name: "Driveway",          sub: "Concrete or asphalt, up to 600 sq ft",       price: "$129", unit: "starting" },
    { name: "Sidewalk & walkways", sub: "Per linear foot — front & back included",   price: "$0.85", unit: "/ ft" },
    { name: "Patio or deck",     sub: "Concrete, paver, stone, or wood",             price: "$149", unit: "starting" },
    { name: "Brick & stone",     sub: "Low-pressure soft wash, mortar-safe",         price: "$0.45", unit: "/ sq ft" },
  ];
  const vert = [
    { name: "House siding",       sub: "Vinyl, Hardie, wood — full exterior",        price: "$299", unit: "starting" },
    { name: "Fencing",            sub: "Wood, vinyl, or metal — per linear foot",    price: "$2.25", unit: "/ ft" },
    { name: "Exterior windows",   sub: "Streak-free, frames & sills included",       price: "$8",   unit: "/ pane" },
    { name: "Soft-wash roof",     sub: "Algae & streak treatment, no walk",          price: "$0.35", unit: "/ sq ft" },
  ];

  function renderColumn(heading, rows, colX, colW) {
    // Heading
    s.addText(heading, {
      x: colX, y: 5.05, w: colW, h: 0.5,
      fontFace: FONT, fontSize: 20, bold: true, color: C.navyDeep, margin: 0,
    });
    // top border under heading
    s.addShape(pres.shapes.LINE, {
      x: colX, y: 5.7, w: colW, h: 0,
      line: { color: C.border, width: 0.75 },
    });

    const rowH = 1.05;
    const topY = 5.85;
    rows.forEach((r, i) => {
      const y = topY + i * rowH;
      // name (left)
      s.addText(r.name, {
        x: colX, y: y, w: colW * 0.65, h: 0.38,
        fontFace: FONT, fontSize: 16, bold: true, color: C.navyDeep, margin: 0,
      });
      // sub (left)
      s.addText(r.sub, {
        x: colX, y: y + 0.38, w: colW * 0.65, h: 0.32,
        fontFace: FONT, fontSize: 11, color: C.gray, margin: 0,
      });
      // price + unit (right, inline-styled)
      s.addText(
        [
          { text: r.price, options: { bold: true, color: C.navyDeep, fontSize: 20 } },
          { text: " " + r.unit, options: { color: C.gray, fontSize: 11 } },
        ],
        {
          x: colX + colW * 0.5, y: y + 0.05, w: colW * 0.5, h: 0.5,
          fontFace: FONT, align: "right", valign: "top", margin: 0,
        }
      );
      // divider under each row except last
      if (i < rows.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x: colX, y: y + rowH - 0.05, w: colW, h: 0,
          line: { color: C.border, width: 0.5 },
        });
      }
    });
  }

  renderColumn("Flat surfaces",       flat, 0.9,  8.7);
  renderColumn("Vertical & delicate", vert, 10.4, 8.7);

  addFooter(s, "MINIMUM SERVICE CHARGE $99 · METRO ATLANTA SERVICE AREA", 7);
}

// ============================================================
// SLIDE 8 — Testimonials
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "07 · WHAT CLIENTS SAY");
  addTopDivider(s);

  addEyebrow(s, "4.9 AVERAGE · 380+ REVIEWS ACROSS GOOGLE & NEXTDOOR", 0.9, 1.85, 14);
  s.addText("People talk about us like a good neighbor.", {
    x: 0.9, y: 2.25, w: 18, h: 1.4,
    fontFace: FONT, fontSize: 52, bold: true, color: C.navyDeep, margin: 0,
  });

  const reviews = [
    {
      source: "GOOGLE",
      quote: "\"Our brick looked twenty years newer the day they finished. I asked the owner about the soft-wash and he spent a full ten minutes explaining it to me. That's rare.\"",
      initials: "MR", name: "Monica R.", meta: "Inman Park · Residential",
    },
    {
      source: "NEXTDOOR",
      quote: "\"We manage six townhome buildings and Squeaky Clean does them all on an annual rotation. On time, on budget, and residents barely notice they're there.\"",
      initials: "DT", name: "Derrick T.", meta: "HOA Manager · Decatur",
    },
    {
      source: "GOOGLE",
      quote: "\"I have a dog, a garden, and a koi pond. I asked three companies about chemicals — Squeaky was the only one who could actually answer. Hired them on the spot.\"",
      initials: "AP", name: "Aisha P.", meta: "Brookhaven · Residential",
    },
  ];

  const cardW = 5.95, cardH = 5.3, gap = 0.3;
  const startX = 0.9, startY = 4.7;
  reviews.forEach((r, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 1 }, rectRadius: 0.14,
      shadow: makeShadow(),
    });
    // Stars + source
    s.addText(
      [
        { text: "★★★★★", options: { color: C.gold, bold: true } },
        { text: "   " + r.source, options: { color: C.blue, bold: true, charSpacing: 3 } },
      ],
      {
        x: x + 0.4, y: startY + 0.4, w: cardW - 0.8, h: 0.38,
        fontFace: FONT, fontSize: 12, margin: 0,
      }
    );
    // Quote
    s.addText(r.quote, {
      x: x + 0.4, y: startY + 0.95, w: cardW - 0.8, h: 2.6,
      fontFace: FONT, fontSize: 14, color: C.navyDeep, lineSpacingMultiple: 1.35, margin: 0,
    });
    // Divider
    s.addShape(pres.shapes.LINE, {
      x: x + 0.4, y: startY + 3.95, w: cardW - 0.8, h: 0,
      line: { color: C.border, width: 0.5 },
    });
    // Initials circle
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.4, y: startY + 4.25, w: 0.65, h: 0.65,
      fill: { color: C.tintBlue }, line: { color: C.tintBlue },
    });
    s.addText(r.initials, {
      x: x + 0.4, y: startY + 4.25, w: 0.65, h: 0.65,
      fontFace: FONT, fontSize: 11, bold: true, color: C.blue,
      align: "center", valign: "middle", margin: 0,
    });
    // Name + meta
    s.addText(r.name, {
      x: x + 1.2, y: startY + 4.2, w: cardW - 1.6, h: 0.35,
      fontFace: FONT, fontSize: 13, bold: true, color: C.navyDeep, margin: 0,
    });
    s.addText(r.meta, {
      x: x + 1.2, y: startY + 4.55, w: cardW - 1.6, h: 0.32,
      fontFace: FONT, fontSize: 10.5, color: C.gray, margin: 0,
    });
  });

  addFooter(s, "VERIFIED REVIEWS · GOOGLE, NEXTDOOR, THUMBTACK, BBB A+", 8);
}

// ============================================================
// SLIDE 9 — Guarantee
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addHeader(s, "08 · OUR GUARANTEE");
  addTopDivider(s);

  addEyebrow(s, "THE SQUEAKY PROMISE", 0.9, 2.85, 10);
  s.addText("If it's not right, we're not\ndone.", {
    x: 0.9, y: 3.25, w: 11, h: 2.5,
    fontFace: FONT, fontSize: 56, bold: true, color: C.navyDeep, valign: "top", margin: 0,
  });
  s.addText(
    "Every job ends with a walk-through. If you spot anything — a missed corner, a streak, " +
    "a stain we couldn't lift — we stay, or we come back the next morning. No invoice gets " +
    "sent until you sign off.",
    {
      x: 0.9, y: 5.95, w: 9.5, h: 1.8,
      fontFace: FONT, fontSize: 15, color: C.slate, lineSpacingMultiple: 1.3, margin: 0,
    }
  );

  // Three mini stat blocks
  const certs = [
    { eb: "FULLY INSURED", val: "$2M liability" },
    { eb: "CERTIFIED",     val: "PWNA member" },
    { eb: "ACCREDITED",    val: "BBB A+" },
  ];
  const blkY = 8.0, blkW = 2.5, blkGap = 0.2;
  certs.forEach((cf, i) => {
    const x = 0.9 + i * (blkW + blkGap);
    s.addText(cf.eb, {
      x, y: blkY, w: blkW, h: 0.3,
      fontFace: FONT, fontSize: 9.5, bold: true, color: C.blue, charSpacing: 3, margin: 0,
    });
    s.addText(cf.val, {
      x, y: blkY + 0.3, w: blkW, h: 0.5,
      fontFace: FONT, fontSize: 18, bold: true, color: C.navyDeep, margin: 0,
    });
    if (i < certs.length - 1) {
      // vertical divider
      s.addShape(pres.shapes.LINE, {
        x: x + blkW + blkGap / 2 - 0.01, y: blkY, w: 0, h: 0.8,
        line: { color: C.border, width: 0.75 },
      });
    }
  });

  // Big dark "100% Clean or free" circle on the right
  const cD = 5.6, cX = 12.9, cY = 3.0;
  s.addShape(pres.shapes.OVAL, {
    x: cX, y: cY, w: cD, h: cD,
    fill: { color: C.navyDeep }, line: { color: C.navyDeep },
    shadow: { type: "outer", color: "000000", opacity: 0.25, blur: 18, offset: 4, angle: 90 },
  });
  s.addText("100%", {
    x: cX, y: cY + 0.95, w: cD, h: 0.7,
    fontFace: FONT, fontSize: 28, bold: true, color: C.teal,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("Clean\nor free", {
    x: cX, y: cY + 1.7, w: cD, h: 2.4,
    fontFace: FONT, fontSize: 56, bold: true, color: C.white,
    align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.0,
  });
  s.addText("THE SQUEAKY PROMISE", {
    x: cX, y: cY + cD - 0.9, w: cD, h: 0.4,
    fontFace: FONT, fontSize: 10, bold: true, color: C.white,
    charSpacing: 4, align: "center", valign: "middle", margin: 0, transparency: 30,
  });

  addFooter(s, "LICENSED · BONDED · INSURED · MINORITY & FAMILY OWNED", 9);
}

// ============================================================
// SLIDE 10 — Contact / Closing
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Left dark panel
  const panelW = 11.5;
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: panelW, h: SH,
    fill: { color: C.navyDeep }, line: { color: C.navyDeep },
  });

  // HEADER (custom: white text on dark panel)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: 0.85, w: 0.65, h: 0.65,
    fill: { color: C.blue }, line: { color: C.blue }, rectRadius: 0.08,
  });
  s.addText("Squeaky Clean", {
    x: 1.7, y: 0.82, w: 4.2, h: 0.38,
    fontFace: FONT, fontSize: 15, bold: true, color: C.white, margin: 0, valign: "middle",
  });
  s.addText("PRESSURE WASHING · ATLANTA, GA", {
    x: 1.7, y: 1.17, w: 4.8, h: 0.32,
    fontFace: FONT, fontSize: 9, color: "B8CCE4", charSpacing: 3, margin: 0, valign: "middle",
  });

  // Big title (on dark panel)
  addEyebrow(s, "READY WHEN YOU ARE", 0.9, 5.1, 10);
  s.addText(
    [
      { text: "Let's make it\n" },
      { text: "squeaky.", options: { italic: true, color: C.teal } },
    ],
    {
      x: 0.9, y: 5.5, w: 10, h: 2.8,
      fontFace: FONT, fontSize: 64, bold: true, color: C.white, valign: "top", margin: 0,
    }
  );

  // Supporting copy
  s.addText(
    "Free quote in 24 hours. Soonest availability next week. Flat pricing — the number you see is the number you pay.",
    {
      x: 0.9, y: 8.6, w: 9.8, h: 1.2,
      fontFace: FONT, fontSize: 15, color: C.white, lineSpacingMultiple: 1.3, margin: 0,
      transparency: 15,
    }
  );

  // Bottom tags on dark panel
  s.addShape(pres.shapes.LINE, {
    x: 0.9, y: SH - 0.95, w: panelW - 1.8, h: 0,
    line: { color: "2B4668", width: 0.75 },
  });
  s.addText(
    [
      { text: "10", options: { color: C.white, bold: true } },
      { text: " / 10 — THANK YOU.", options: { color: "B8CCE4" } },
    ],
    {
      x: 0.9, y: SH - 0.7, w: 4, h: 0.4,
      fontFace: FONT, fontSize: 10, charSpacing: 2, margin: 0, valign: "middle",
    }
  );
  s.addText("EST. 2016 · ATLANTA, GA", {
    x: 6.5, y: SH - 0.7, w: 4, h: 0.4,
    fontFace: FONT, fontSize: 10, color: "B8CCE4", charSpacing: 3, margin: 0, valign: "middle",
  });

  // Right side — contact panel (on light bg)
  const rx = panelW + 0.7, rw = SW - rx - 0.7;
  const contact = [
    { eb: "BOOK ONLINE",    val: "squeakycleanatl.com/quote", big: true },
    { eb: "CALL OR TEXT",   val: "(404) 555-7298",            big: true },
    { eb: "EMAIL",          val: "hello@squeakycleanatl.com", big: true },
    { eb: "SERVICE AREA",   val: "Metro Atlanta · 30 mi radius of Midtown", big: false },
    { eb: "HOURS",          val: "Mon–Sat · 7am – 6pm",        big: false },
  ];
  let cy = 0.9;
  contact.forEach((ct, i) => {
    s.addText(ct.eb, {
      x: rx, y: cy, w: rw, h: 0.3,
      fontFace: FONT, fontSize: 10, bold: true, color: C.gray, charSpacing: 3, margin: 0,
    });
    s.addText(ct.val, {
      x: rx, y: cy + 0.32, w: rw, h: ct.big ? 0.55 : 0.45,
      fontFace: FONT, fontSize: ct.big ? 20 : 16, bold: true, color: C.navyDeep, margin: 0,
    });
    // Divider
    s.addShape(pres.shapes.LINE, {
      x: rx, y: cy + (ct.big ? 1.05 : 0.95), w: rw, h: 0,
      line: { color: C.border, width: 0.75 },
    });
    cy += ct.big ? 1.3 : 1.15;
  });

  // CTA button bottom right
  const btnH = 0.85, btnY = SH - btnH - 0.6;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: btnY, w: rw, h: btnH,
    fill: { color: C.blue }, line: { color: C.blue }, rectRadius: 0.1,
    shadow: makeShadow(),
  });
  s.addText("Book a free quote", {
    x: rx + 0.4, y: btnY, w: rw - 1.0, h: btnH,
    fontFace: FONT, fontSize: 16, bold: true, color: C.white, valign: "middle", margin: 0,
  });
  s.addText("→", {
    x: rx + rw - 0.9, y: btnY, w: 0.6, h: btnH,
    fontFace: FONT, fontSize: 20, bold: true, color: C.white,
    align: "right", valign: "middle", margin: 0,
  });
}

// ---------- write ----------
pres.writeFile({ fileName: "Squeaky_Clean_Pressure_Washing.pptx" })
  .then((fn) => console.log("Wrote:", fn))
  .catch((e) => { console.error(e); process.exit(1); });
