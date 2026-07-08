// pawmart.js
// Recreates "Pawmart" presentation using pptxgenjs.
// Run:  npm i pptxgenjs  &&  node pawmart.js
// Output: Pawmart.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.333" x 7.5"
pres.title = "Pawmart";
pres.author = "Pawmart";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────
const BG     = "1F2A24"; // deep forest green
const CREAM  = "E8D9B8"; // primary text
const GOLD   = "D4A24B"; // accent / italic
const SAGE   = "9A8F75"; // muted label color
const WARM   = "D8C8A4"; // body paragraph color
const DIVIDE = "3A4640"; // subtle divider line

const MONO   = "Roboto Mono";
const SERIF  = "Lora";
const SANS   = "Poppins";

// Source layout is authored at 20" x 11.25"; render target is 13.333" x 7.5".
// Scale every coordinate and size by 2/3 (13.333 / 20 = 0.6667).
const K = 13.333 / 20;
const s = (v) => +(v * K).toFixed(3);

// Convenience wrappers that apply the scale.
const addBgRect = (slide) =>
  slide.addShape("rect", { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: BG }, line: { type: "none" } });

const addText = (slide, text, opts) => {
  const { x, y, w, h, ...rest } = opts;
  slide.addText(text, {
    x: s(x), y: s(y), w: s(w), h: s(h),
    margin: 0,
    isTextBox: true,
    ...rest,
  });
};

const addLine = (slide, x1, y1, x2, y2, color = DIVIDE, thickness = 0.75) => {
  // pptxgenjs: draw a line as a shape with line style
  slide.addShape("line", {
    x: s(x1), y: s(y1), w: s(x2 - x1), h: s(y2 - y1),
    line: { color, width: thickness },
  });
};

const addRect = (slide, x, y, w, h, fill, lineColor) => {
  slide.addShape("rect", {
    x: s(x), y: s(y), w: s(w), h: s(h),
    fill: fill ? { color: fill } : { type: "none" },
    line: lineColor ? { color: lineColor, width: 0.75 } : { type: "none" },
  });
};

// Header/footer bar that appears on every non-title slide.
// Content slides share: top-left page number, top-right section name,
// bottom-left "— PAWMART", bottom-right § chapter mark.
function addChrome(slide, page, sectionRight, chapterRight) {
  addText(slide, page, {
    x: 0.625, y: 0.458, w: 2.5, h: 0.375,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.5,
    align: "left", valign: "top",
  });
  addText(slide, sectionRight, {
    x: 13.0, y: 0.458, w: 6.4, h: 0.375,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.5,
    align: "right", valign: "top",
  });
  addText(slide, "— PAWMART", {
    x: 0.625, y: 10.458, w: 3.0, h: 0.375,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.5,
    align: "left", valign: "top",
  });
  addText(slide, chapterRight, {
    x: 13.0, y: 10.458, w: 6.4, h: 0.375,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.5,
    align: "right", valign: "top",
  });
}

// ─── SLIDE 1 — COVER ──────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);

  // corner labels
  addText(slide, "PAWMART · EST. 2023", {
    x: 0.625, y: 0.458, w: 5.5, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.2, align: "left",
  });
  addText(slide, "CLARKSVILLE, ATX", {
    x: 13.5, y: 0.458, w: 5.9, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.2, align: "right",
  });
  addText(slide, "A TALK IN TEN SLIDES", {
    x: 0.625, y: 10.6, w: 5.5, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.2, align: "left",
  });
  addText(slide, "30.2747° N · 97.7560° W", {
    x: 13.5, y: 10.6, w: 5.9, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.2, align: "right",
  });

  // Logo mark — small gold circle with a paw dot, in lieu of an embedded image
  slide.addShape("ellipse", {
    x: s(0.95), y: s(0.95), w: s(0.75), h: s(0.75),
    fill: { color: BG }, line: { color: GOLD, width: 1.5 },
  });
  // A tiny centered dot inside the circle
  slide.addShape("ellipse", {
    x: s(1.23), y: s(1.23), w: s(0.2), h: s(0.2),
    fill: { color: GOLD }, line: { type: "none" },
  });

  addText(slide, "PAWMART / AUSTIN, TX", {
    x: 1.95, y: 1.15, w: 6.0, h: 0.4,
    fontSize: 11, fontFace: MONO, color: CREAM, charSpacing: 3.0, valign: "middle",
  });

  // Tagline (gold italic)
  addText(slide, "natural pet goods for the dogs who raised us.", {
    x: 0.95, y: 4.4, w: 18.4, h: 0.6,
    fontSize: 19, fontFace: SERIF, italic: true, color: GOLD, align: "left",
  });

  // The big wordmark "pawmart" + gold italic period
  addText(
    slide,
    [
      { text: "pawmart", options: { color: CREAM } },
      { text: ".", options: { color: GOLD, italic: true } },
    ],
    {
      x: 0.95, y: 5.2, w: 18.4, h: 3.8,
      fontSize: 155, fontFace: SERIF, charSpacing: -6,
      align: "left", valign: "top",
    }
  );

  addText(slide, "a neighborhood shop for senior dogs · community mixer 2026", {
    x: 2.0, y: 9.5, w: 16.0, h: 0.4,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 1.2, align: "center",
  });
}

// ─── SLIDE 2 — HELLO, NEIGHBOR ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "02 / 10", "HELLO, NEIGHBOR", "CHAPTER ONE");

  addText(slide, "CHAPTER ONE", {
    x: 1.042, y: 3.233, w: 10.0, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  // Headline "howdy." — cream word, gold period
  addText(
    slide,
    [
      { text: "howdy", options: { color: CREAM } },
      { text: ".", options: { color: GOLD } },
    ],
    {
      x: 1.042, y: 3.7, w: 18.454, h: 3.6,
      fontSize: 125, fontFace: SERIF, charSpacing: -4,
      align: "left", valign: "top",
    }
  );

  addText(
    slide,
    "i'm the owner of pawmart — and i'd like to tell you about a small shop in clarksville that's quietly obsessed with old dogs.",
    {
      x: 1.042, y: 7.8, w: 13.948, h: 2.2,
      fontSize: 21, fontFace: SERIF, italic: true, color: GOLD,
      align: "left", valign: "top", lineSpacingMultiple: 1.3,
    }
  );
}

// ─── SLIDE 3 — ELEVATOR PITCH ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "03 / 10", "ELEVATOR PITCH", "§ 01");

  addText(slide, "THE SHORT VERSION", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  // Big statement with gold highlights
  addText(
    slide,
    [
      { text: "pawmart is a ", options: { color: CREAM } },
      { text: "small-batch", options: { color: GOLD, italic: true } },
      { text: " pet store in clarksville, stocking farm-made food, supplements, and mobility gear for dogs in their ", options: { color: CREAM } },
      { text: "golden years", options: { color: GOLD, italic: true } },
      { text: ".", options: { color: CREAM } },
    ],
    {
      x: 1.042, y: 2.0, w: 17.381, h: 8.0,
      fontSize: 44, fontFace: SERIF, charSpacing: -0.5,
      align: "left", valign: "top", lineSpacingMultiple: 1.1,
    }
  );

  // Divider line above footer stats
  addLine(slide, 1.042, 9.0, 18.959, 9.0, DIVIDE, 0.75);

  // Four stat columns
  const stats = [
    { x: 1.042, label: "founded",   value: "2023" },
    { x: 3.276, label: "focus",     value: "senior dogs" },
    { x: 7.190, label: "sourcing",  value: "texas farms" },
    { x: 11.107, label: "shop size", value: "one room" },
  ];
  for (const st of stats) {
    addText(slide, st.label, {
      x: st.x, y: 9.25, w: 4.0, h: 0.3,
      fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0,
    });
    addText(slide, st.value, {
      x: st.x, y: 9.65, w: 4.0, h: 0.55,
      fontSize: 24, fontFace: SERIF, color: CREAM,
    });
  }
}

// ─── SLIDE 4 — WHY SENIOR DOGS ────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "04 / 10", "THE NICHE", "§ 02");

  addText(slide, "WHY SENIOR DOGS", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  // Giant 7+ stat on the left
  addText(slide, "7+", {
    x: 1.042, y: 4.0, w: 8.691, h: 3.5,
    fontSize: 170, fontFace: SERIF, color: GOLD, italic: true,
    align: "left", valign: "top", charSpacing: -4,
  });
  addText(slide, "the age a dog is considered a senior", {
    x: 1.042, y: 7.776, w: 8.691, h: 0.4,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0,
  });

  // Right side — headline with gold highlight, then two body paragraphs
  addText(
    slide,
    [
      { text: "aging dogs deserve the ",   options: { color: CREAM } },
      { text: "highest quality ",           options: { color: GOLD, italic: true } },
      { text: "products.",                  options: { color: CREAM } },
    ],
    {
      x: 10.521, y: 3.945, w: 8.691, h: 3.2,
      fontSize: 32, fontFace: SERIF,
      align: "left", valign: "top", lineSpacingMultiple: 1.15,
    }
  );
  addText(
    slide,
    "the big-box aisle treats every dog the same. but a fourteen-year-old lab doesn't need the same food — or the same bed — as a puppy.",
    {
      x: 10.521, y: 7.3, w: 8.691, h: 1.5,
      fontSize: 14, fontFace: SANS, color: WARM,
      align: "left", valign: "top", lineSpacingMultiple: 1.4,
    }
  );
  addText(slide, "we stock for the second half of the story.", {
    x: 10.521, y: 8.85, w: 8.691, h: 0.6,
    fontSize: 14, fontFace: SANS, color: WARM, italic: true,
  });
}

// ─── SLIDE 5 — FARM TO BOWL ───────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "05 / 10", "SOURCING", "§ 03");

  addText(slide, "FARM TO BOWL", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  addText(
    slide,
    "farm-made pet products, delivered to a bustling city.",
    {
      x: 1.042, y: 1.708, w: 15.021, h: 2.0,
      fontSize: 48, fontFace: SERIF, color: CREAM,
      align: "left", valign: "top", charSpacing: -1,
    }
  );

  // Horizontal rule above the 4-column grid
  addLine(slide, 1.042, 4.357, 18.959, 4.357, DIVIDE, 0.75);

  const cols = [
    { x: 1.458, n: "01", tag: "THE FARM",     head: "texas-grown, hill-country raised.",
      body: "We partner with small family farms within a day's drive — pasture-raised proteins, cold-pressed oils, dried herbs." },
    { x: 5.938, n: "02", tag: "THE KITCHEN",  head: "small batches, short ingredient lists.",
      body: "Everything that comes through the door can be read aloud on one breath. No filler, no preservatives pretending to be food." },
    { x: 10.417, n: "03", tag: "THE SHELF",   head: "we vet it before your dog does.",
      body: "If a product doesn't earn a place, it doesn't get one. Our shelves are curated, not stocked." },
    { x: 14.896, n: "04", tag: "THE BOWL",    head: "home in time for supper.",
      body: "A five-minute walk for most of Clarksville. Same-day delivery across Austin proper — because old dogs don't wait well." },
  ];

  // Vertical dividers between columns
  [5.514, 9.993, 14.472].forEach((x) => addLine(slide, x, 4.364, x, 10.281, DIVIDE, 0.75));

  for (const c of cols) {
    addText(slide, c.n, {
      x: c.x, y: 4.864, w: 3.748, h: 0.8,
      fontSize: 36, fontFace: SERIF, color: GOLD, italic: true,
    });
    addText(slide, c.tag, {
      x: c.x, y: 5.864, w: 3.748, h: 0.375,
      fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0,
    });
    addText(slide, c.head, {
      x: c.x, y: 6.344, w: 3.748, h: 1.0,
      fontSize: 20, fontFace: SERIF, color: CREAM,
      lineSpacingMultiple: 1.1,
    });
    addText(slide, c.body, {
      x: c.x, y: 7.6, w: 3.748, h: 2.3,
      fontSize: 12, fontFace: SANS, color: WARM,
      lineSpacingMultiple: 1.4,
    });
  }
}

// ─── SLIDE 6 — THE CATALOG ────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "06 / 10", "THE CATALOG", "§ 04");

  addText(slide, "WHAT'S ON THE SHELVES", {
    x: 1.042, y: 1.042, w: 10.0, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });
  addText(slide, "aisle no. 01 — 05", {
    x: 13.0, y: 1.042, w: 6.4, h: 0.375,
    fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0, align: "right",
  });

  addText(slide, "five aisles, one room.", {
    x: 1.042, y: 1.625, w: 18.454, h: 0.9,
    fontSize: 34, fontFace: SERIF, color: CREAM,
  });

  const aisles = [
    { x: 1.042, n: "01", name: "farm-made food",   body: "Gently-cooked and raw. Short recipes built around texas pasture proteins." },
    { x: 4.683, n: "02", name: "supplements",      body: "Joint, gut, and cognitive support — single-origin, third-party tested." },
    { x: 8.325, n: "03", name: "orthopedic beds",  body: "Memory foam and bolster styles for creaky hips and long afternoon naps." },
    { x: 11.967, n: "04", name: "mobility gear",   body: "Lift harnesses, stair ramps, and rear-support slings for tough mornings." },
    { x: 15.608, n: "05", name: "accessories",     body: "Leather collars, slow feeders, soft leads — the quiet everyday things." },
  ];

  for (const a of aisles) {
    // Card outline (subtle)
    addRect(slide, a.x, 2.888, 3.350, 4.306, null, DIVIDE);
    addText(slide, a.n, {
      x: a.x + 0.257, y: 3.187, w: 2.921, h: 0.375,
      fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0,
    });
    addText(slide, a.name, {
      x: a.x + 0.257, y: 4.437, w: 2.921, h: 0.9,
      fontSize: 19, fontFace: SERIF, color: CREAM,
    });
    addText(slide, a.body, {
      x: a.x + 0.257, y: 5.537, w: 2.921, h: 1.6,
      fontSize: 12, fontFace: SANS, color: SAGE, lineSpacingMultiple: 1.4,
    });
  }
}

// ─── SLIDE 7 — THE SHOP FLOOR ─────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "07 / 10", "THE SHOP FLOOR", "§ 05");

  addText(slide, "A DAY IN THE STORE", {
    x: 1.042, y: 0.833, w: 10.0, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  addText(slide, "quiet mornings, busy fridays.", {
    x: 1.042, y: 1.417, w: 12.446, h: 2.0,
    fontSize: 48, fontFace: SERIF, color: CREAM,
  });

  addText(
    slide,
    "The shop is one room and a back patio. Water bowls stay full, the kettle stays on, and most dogs leave with a biscuit whether they buy anything or not.",
    {
      x: 13.125, y: 1.820, w: 6.008, h: 1.8,
      fontSize: 13, fontFace: SANS, color: WARM, lineSpacingMultiple: 1.4,
    }
  );

  // Photo placeholder panels — darker-than-bg rectangles with labels
  const PANEL = "2A3630";

  // Big left panel: storefront (spans two rows)
  addRect(slide, 1.042, 3.753, 6.531, 6.663, PANEL, null);
  addText(slide, "img 01", {
    x: 6.0, y: 3.969, w: 1.4, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0, align: "right",
  });
  addText(slide, "STOREFRONT · MORNING LIGHT", {
    x: 1.299, y: 9.868, w: 6.0, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0,
  });

  // 2x2 grid on right
  const grid = [
    { x: 7.823,  y: 3.753, img: "img 02", lx: 12.109, label: "THE BISCUIT JAR",       labelX: 8.080, labelY: 6.411 },
    { x: 13.516, y: 3.753, img: "img 03", lx: 17.801, label: "REGULARS · TUESDAY",    labelX: 13.773, labelY: 6.411 },
    { x: 7.823,  y: 7.210, img: "img 04", lx: 12.109, label: "SUPPLEMENTS AISLE",     labelX: 8.080, labelY: 9.868 },
    { x: 13.516, y: 7.210, img: "img 05", lx: 17.801, label: "BACK PATIO · NAPPING",  labelX: 13.773, labelY: 9.868 },
  ];
  for (const g of grid) {
    addRect(slide, g.x, g.y, 5.443, 3.207, PANEL, null);
    addText(slide, g.img, {
      x: g.lx - 0.4, y: g.y + 0.216, w: 1.6, h: 0.375,
      fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0, align: "right",
    });
    addText(slide, g.label, {
      x: g.labelX, y: g.labelY, w: 5.0, h: 0.375,
      fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0,
    });
  }
}

// ─── SLIDE 8 — VISIT US ───────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "08 / 10", "VISIT US", "§ 06");

  addText(slide, "OUR CLARKSVILLE CORNER", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  addText(slide, "a shop you can walk to.", {
    x: 1.042, y: 2.332, w: 8.691, h: 1.92,
    fontSize: 46, fontFace: SERIF, color: CREAM,
  });

  addText(
    slide,
    "Tucked into Clarksville between the coffee shop and the florist. Come by on your morning loop, or bring the dog — we prefer it.",
    {
      x: 1.042, y: 4.627, w: 6.652, h: 1.792,
      fontSize: 15, fontFace: SANS, color: WARM, lineSpacingMultiple: 1.4,
    }
  );

  // Hours table
  const hours = [
    { day: "MON",      val: "closed · resting",     y: 6.897, valColor: SAGE },
    { day: "TUE — FRI", val: "11:00 am — 7:00 pm",   y: 7.686, valColor: CREAM },
    { day: "SAT",      val: "11:00 am — 7:00 pm",   y: 8.477, valColor: CREAM },
    { day: "SUN",      val: "closed · farm run",    y: 9.269, valColor: SAGE },
  ];
  for (const h of hours) {
    addText(slide, h.day, {
      x: 1.042, y: h.y, w: 3.8, h: 0.45,
      fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0, valign: "middle",
    });
    addText(slide, h.val, {
      x: 4.839, y: h.y, w: 4.78, h: 0.45,
      fontSize: 13, fontFace: SANS, color: h.valColor, valign: "middle",
    });
    // Underline
    addLine(slide, 1.042, h.y + 0.6, 9.48, h.y + 0.6, DIVIDE, 0.5);
  }

  // Map area — outlined rectangle with a single pin
  addRect(slide, 10.521, 2.347, 8.438, 7.514, null, DIVIDE);
  addText(slide, "map", {
    x: 18.251, y: 2.562, w: 0.6, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0, align: "right",
  });
  addText(slide, "CLARKSVILLE, 78703", {
    x: 10.778, y: 9.312, w: 5.0, h: 0.375,
    fontSize: 11, fontFace: MONO, color: SAGE, charSpacing: 2.0,
  });
  // Pin dot
  slide.addShape("ellipse", {
    x: s(14.43), y: s(5.954), w: s(0.229), h: s(0.229),
    fill: { color: GOLD }, line: { type: "none" },
  });
  addText(slide, "PAWMART", {
    x: 13.897, y: 6.287, w: 1.5, h: 0.375,
    fontSize: 11, fontFace: MONO, color: GOLD, charSpacing: 2.0,
  });
}

// ─── SLIDE 9 — GOOD NEIGHBORS (2x3 grid) ─────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "09 / 10", "COMMUNITY", "§ 07");

  addText(slide, "GOOD NEIGHBORS", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  addText(slide, "we do better with the block behind us.", {
    x: 1.042, y: 1.667, w: 16.094, h: 2.0,
    fontSize: 48, fontFace: SERIF, color: CREAM,
  });

  const items = [
    { x: 1.042,  y: 4.628, tag: "01 / FARMS",    head: "texas hill country partners",   body: "Six small farms supply our food and treats. We visit every one, at least once a season." },
    { x: 7.236,  y: 4.628, tag: "02 / RESCUE",   head: "austin pets alive! seniors",    body: "A portion of every bed and supplement we sell funds senior-dog foster care in the city." },
    { x: 13.431, y: 4.628, tag: "03 / VET CARE", head: "clarksville vets, quietly",     body: "We don't diagnose. We defer to the three neighborhood clinics that know your dog by name." },
    { x: 1.042,  y: 7.537, tag: "04 / EVENTS",   head: "the slow-walk club",            body: "First saturday of the month. A half-mile loop at senior pace, coffee and biscuits after." },
    { x: 7.236,  y: 7.537, tag: "05 / GROOMERS", head: "referrals, not resales",        body: "We send grooming and training business to four neighbors who do it better than we ever would." },
    { x: 13.431, y: 7.537, tag: "06 / THE BLOCK", head: "clarksville small biz alliance", body: "Proud dues-paying member. We show up for the street, and the street shows up for us." },
  ];

  for (const it of items) {
    // Top accent line above each card
    addLine(slide, it.x, it.y, it.x + 5.528, it.y, GOLD, 0.75);
    addText(slide, it.tag, {
      x: it.x, y: it.y + 0.3, w: 5.694, h: 0.4,
      fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 2.0,
    });
    addText(slide, it.head, {
      x: it.x, y: it.y + 0.78, w: 5.694, h: 0.6,
      fontSize: 21, fontFace: SERIF, color: CREAM,
    });
    addText(slide, it.body, {
      x: it.x, y: it.y + 1.4, w: 5.694, h: 1.6,
      fontSize: 12, fontFace: SANS, color: WARM, lineSpacingMultiple: 1.4,
    });
  }
}

// ─── SLIDE 10 — COME SAY HI ──────────────────────────────────────────────
{
  const slide = pres.addSlide();
  addBgRect(slide);
  addChrome(slide, "10 / 10", "THANK YOU", "FIN.");

  addText(slide, "CHAPTER TEN · THE ONLY ASK", {
    x: 1.042, y: 1.042, w: 18.454, h: 0.375,
    fontSize: 12, fontFace: MONO, color: GOLD, charSpacing: 3.0,
  });

  addText(
    slide,
    [
      { text: "come ",   options: { color: CREAM } },
      { text: "say hi",  options: { color: GOLD, italic: true } },
      { text: ".",       options: { color: CREAM } },
    ],
    {
      x: 1.042, y: 1.793, w: 18.454, h: 5.25,
      fontSize: 150, fontFace: SERIF, charSpacing: -4,
      align: "left", valign: "top",
    }
  );

  addText(
    slide,
    "bring the dog, bring a friend, or bring nothing at all. the kettle's on, the biscuit jar is full, and we'd love to meet a few more neighbors.",
    {
      x: 1.042, y: 7.543, w: 13.948, h: 1.2,
      fontSize: 19, fontFace: SERIF, italic: true, color: WARM,
      lineSpacingMultiple: 1.3,
    }
  );

  addLine(slide, 1.042, 8.951, 18.959, 8.951, DIVIDE, 0.75);

  const info = [
    { x: 1.042,  label: "find us",   value: "clarksville, atx" },
    { x: 7.222,  label: "open",      value: "tue — sat · 11–7" },
    { x: 13.403, label: "say hello", value: "pawmart.shop" },
  ];
  for (const i of info) {
    addText(slide, i.label, {
      x: i.x, y: 9.458, w: 5.722, h: 0.375,
      fontSize: 12, fontFace: MONO, color: SAGE, charSpacing: 2.0,
    });
    addText(slide, i.value, {
      x: i.x, y: 9.917, w: 5.722, h: 0.55,
      fontSize: 24, fontFace: SERIF, color: CREAM,
    });
  }
}

// ─── SAVE ─────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "Pawmart.pptx" }).then((name) => {
  console.log("Saved:", name);
});
