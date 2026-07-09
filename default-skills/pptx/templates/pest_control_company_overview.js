/**
 * District Pest Control — replica deck built with pptxgenjs
 *
 * Slide size: 20" × 11.25" (custom)
 * Palette:
 *   - Dark green bg:  1F2622   (slides 1, 10)
 *   - Cream bg:       F4F1EA   (slides 2-9)
 *   - Forest accent:  2F4A3A
 *   - Terracotta:     B85C3E
 *   - Gold italic:    C8A26B
 *   - Body dark:      1A1A1A
 *   - Muted gray:     8A8680
 *   - Soft body:      4A4744
 * Fonts: Georgia (display/serif), Consolas (mono labels), Arial (body lists)
 */

const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG = (name) => path.join(__dirname, "images", name);

// ---- Palette ----
const C = {
  darkBg:    "1F2622",
  cream:     "F4F1EA",
  forest:    "2F4A3A",
  terracotta:"B85C3E",
  gold:      "C8A26B",
  ink:       "1A1A1A",
  muted:     "8A8680",
  softBody:  "4A4744",
};

// ---- Helper builders ----

function buildPres() {
  const pres = new pptxgen();
  pres.defineLayout({ name: "DPC_20x11_25", width: 20, height: 11.25 });
  pres.layout = "DPC_20x11_25";
  pres.author = "District Pest Control";
  pres.title  = "District Pest Control";
  return pres;
}

// Top header: dot + brand label on left, section label on right
function header(slide, opts) {
  const { dotColor, leftText, rightText, labelColor } = opts;
  // bullet dot
  slide.addShape("ellipse", {
    x: 1.25, y: 0.802, w: 0.146, h: 0.146,
    fill: { color: dotColor }, line: { type: "none" },
  });
  slide.addText(leftText, {
    x: 1.562, y: 0.712, w: 5.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: labelColor,
    margin: 0, valign: "top", align: "left",
  });
  slide.addText(rightText, {
    x: 13.6, y: 0.729, w: 5.2, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: labelColor,
    margin: 0, valign: "top", align: "right",
  });
}

// Bottom footer: thin rule + section name + page count
function footer(slide, opts) {
  const { ruleColor, sectionLabel, pageNum, labelColor } = opts;
  slide.addShape("rect", {
    x: 1.25, y: 9.99, w: 17.5, h: 0.012,
    fill: { color: ruleColor }, line: { type: "none" },
  });
  slide.addText(sectionLabel, {
    x: 1.25, y: 10.229, w: 8, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: labelColor,
    margin: 0, valign: "top", align: "left",
  });
  slide.addText(`${pageNum} / 10`, {
    x: 16.5, y: 10.229, w: 2.3, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: labelColor,
    margin: 0, valign: "top", align: "right",
  });
}

// ----------------------------------------------------------------------------
// SLIDE 1 — Cover
// ----------------------------------------------------------------------------
function slide1(pres) {
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Right-side hero photo (architectural night shot)
  s.addImage({
    path: IMG("image1.jpeg"),
    x: 10.8, y: 0, w: 9.2, h: 11.25,
    sizing: { type: "cover", w: 9.2, h: 11.25 },
  });

  // Header (terracotta dot, cream-60% labels)
  const labelDim = "F4F1EAA0"; // not used — alpha in colors not allowed
  s.addShape("ellipse", {
    x: 1.25, y: 0.802, w: 0.146, h: 0.146,
    fill: { color: C.terracotta }, line: { type: "none" },
  });
  s.addText("DISTRICT PEST CONTROL", {
    x: 1.562, y: 0.712, w: 5.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "left",
  });
  s.addText("HELLO, NEIGHBOR.", {
    x: 6.7, y: 0.729, w: 4.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "left",
  });

  // Big serif headline (cream + gold italic)
  s.addText(
    [
      { text: "A bug-free", options: { color: C.cream, breakLine: true } },
      { text: "home,", options: { italic: true, color: C.gold } },
      { text: " on the", options: { color: C.cream, breakLine: true } },
      { text: "house.", options: { color: C.cream } },
    ],
    {
      x: 1.25, y: 2.55, w: 9.55, h: 4.6,
      fontFace: "Georgia", fontSize: 80, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
      paraSpaceAfter: 0, lineSpacingMultiple: 0.95,
    }
  );

  // Italic body
  s.addText(
    "Friendly, neighborhood pest control for DC families — safe for your kids, safe for your dog, and tough on whatever just scurried across the kitchen floor.",
    {
      x: 1.25, y: 7.52, w: 7.73, h: 1.92,
      fontFace: "Georgia", fontSize: 27, italic: true,
      color: C.cream, transparency: 18,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Footer rule + labels
  s.addShape("rect", {
    x: 1.25, y: 9.99, w: 9.4, h: 0.012,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("DISTRICTPEST.CO · (202) 555-0144", {
    x: 1.25, y: 10.229, w: 7.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "left",
  });
  s.addText("01 / 10", {
    x: 8.2, y: 10.229, w: 2.5, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "right",
  });
}

// ----------------------------------------------------------------------------
// SLIDE 2 — The Promise (manifesto)
// ----------------------------------------------------------------------------
function slide2(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "02 · THE PROMISE", labelColor: C.muted });

  // Subhead label
  s.addText("A STATEMENT OF INTENT", {
    x: 1.25, y: 2.76, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });

  // Big italic pull quote
  s.addText(
    [
      { text: "“ ", options: { color: C.terracotta, italic: false, charSpacing: -2 } },
      { text: "Quiet houses, clean kitchens, and yards ", options: { color: C.ink } },
      { text: "that belong to your family ", options: { italic: true, color: C.forest } },
      { text: "— not to whatever crawled in last night.”", options: { color: C.ink } },
    ],
    {
      x: 1.25, y: 3.4, w: 17.5, h: 3.6,
      fontFace: "Georgia", fontSize: 44, charSpacing: -1,
      valign: "top", align: "left", margin: 0,
      lineSpacingMultiple: 1.1,
    }
  );

  // Supporting paragraph
  s.addText(
    "Full-service preventative care and targeted remediation, delivered by trained agents using methods that are responsible to the household and to the city around it.",
    {
      x: 1.25, y: 7.6, w: 12.0, h: 1.5,
      fontFace: "Georgia", fontSize: 20, italic: true, color: C.softBody,
      valign: "top", align: "left", margin: 0,
    }
  );

  footer(s, { ruleColor: C.ink, sectionLabel: "THE PROMISE",
              pageNum: "02", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 3 — Scope of Service (3 columns)
// ----------------------------------------------------------------------------
function slide3(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "03 · WHAT WE TREAT", labelColor: C.muted });

  s.addText("SCOPE OF SERVICE", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });

  s.addText(
    [
      { text: "What we ", options: { color: C.ink } },
      { text: "treat.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Three columns
  const cols = [
    {
      x: 1.25, num: "01", title: "Insects", italic: "Six legs, one quiet home.",
      img: "image2.jpeg",
      list: [
        "Ants, roaches, silverfish",
        "Spiders & centipedes",
        "Wasps, hornets, yellow jackets",
        "Mosquito yard programs",
        "Bed bug detection & treatment",
        "Termite inspection & remediation",
      ],
    },
    {
      x: 7.5, num: "02", title: "Rodents", italic: "Out of the walls, off the property.",
      img: "image3.jpeg",
      list: [
        "Mice & rats — interior & exterior",
        "Burrow mapping & baiting",
        "Entry-point sealing",
        "Attic & basement exclusion",
        "Sanitation & droppings cleanup",
        "Ongoing monitoring stations",
      ],
    },
    {
      x: 13.75, num: "03", title: "Wildlife", italic: "Wild animals, handled humanely.",
      img: "image4.jpeg",
      list: [
        "Squirrels, raccoons, opossums",
        "Groundhogs & chipmunks",
        "Bat & bird exclusion",
        "Chimney & soffit sealing",
        "Live trapping & relocation",
        "Damage repair coordination",
      ],
    },
  ];

  cols.forEach((c) => {
    // Number + title
    s.addText(`${c.num} — ${c.title}`, {
      x: c.x, y: 3.3, w: 5.5, h: 0.333,
      fontFace: "Consolas", fontSize: 18, color: C.terracotta,
      margin: 0, valign: "top", align: "left",
    });
    // Italic tag
    s.addText(c.italic, {
      x: c.x, y: 3.78, w: 5.5, h: 0.55,
      fontFace: "Georgia", fontSize: 21, italic: true, color: C.ink,
      valign: "top", align: "left", margin: 0,
    });
    // List with em-dash separators (now above the photo)
    let yL = 4.45;
    c.list.forEach((item, idx) => {
      s.addText("—", {
        x: c.x, y: yL, w: 0.4, h: 0.32,
        fontFace: "Consolas", fontSize: 16, color: C.muted,
        margin: 0, valign: "middle", align: "left",
      });
      s.addText(item, {
        x: c.x + 0.45, y: yL, w: 5.0, h: 0.32,
        fontFace: "Arial", fontSize: 16, color: C.ink,
        margin: 0, valign: "middle", align: "left",
      });
      yL += 0.45;
    });
    // Photo strip (wide aspect) — placed below the bullet list
    s.addImage({
      path: IMG(c.img),
      x: c.x, y: 7.55, w: 5.0, h: 1.6,
      sizing: { type: "cover", w: 5.0, h: 1.6 },
    });
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "SCOPE OF SERVICE",
              pageNum: "03", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 4 — Method (4 numbered steps + image)
// ----------------------------------------------------------------------------
function slide4(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "04 · OUR APPROACH", labelColor: C.muted });

  s.addText("METHOD", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });

  s.addText(
    [
      { text: "Our ", options: { color: C.ink } },
      { text: "approach.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Right-side photo
  s.addImage({
    path: IMG("image5.jpeg"),
    x: 11.0, y: 3.1, w: 7.8, h: 6.0,
    sizing: { type: "cover", w: 7.8, h: 6.0 },
  });
  s.addText("FIG. 04 · FIELD METHOD, SINGLE-FAMILY ROWHOUSE", {
    x: 11.0, y: 9.18, w: 7.8, h: 0.32,
    fontFace: "Consolas", fontSize: 14, color: C.muted,
    margin: 0, valign: "top", align: "left",
  });

  // Four steps with roman numerals
  const steps = [
    { rn: "i",   t: "Inspect, then diagnose.",
      d: "Every engagement starts with a top-to-bottom walkthrough — interior, exterior, attic, crawl space — to identify species, pressure points, and conditions that invite return visits." },
    { rn: "ii",  t: "Treat the smallest necessary surface.",
      d: "We apply targeted, low-impact products to the precise zones where they're warranted — never the whole house when the whole house isn't the problem." },
    { rn: "iii", t: "Seal the way back in.",
      d: "Treatment without exclusion is temporary. We close gaps, screen vents, and harden entry points so the next colony doesn't get the same invitation." },
    { rn: "iv",  t: "Monitor, document, return.",
      d: "Each visit is logged with photos, products used, and conditions noted — so any agent who walks in next month knows exactly what happened last month." },
  ];
  let y = 3.3;
  steps.forEach((st) => {
    // Roman numeral in a circle
    s.addShape("ellipse", {
      x: 1.25, y: y + 0.05, w: 0.55, h: 0.55,
      fill: { color: C.cream }, line: { color: C.forest, width: 1 },
    });
    s.addText(st.rn, {
      x: 1.25, y: y + 0.05, w: 0.55, h: 0.55,
      fontFace: "Georgia", fontSize: 18, italic: true, color: C.forest,
      align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(st.t, {
      x: 2.0, y: y, w: 8.5, h: 0.5,
      fontFace: "Georgia", fontSize: 24, color: C.ink, charSpacing: -1,
      valign: "top", align: "left", margin: 0,
    });
    // Description
    s.addText(st.d, {
      x: 2.0, y: y + 0.6, w: 8.5, h: 0.9,
      fontFace: "Georgia", fontSize: 15, color: C.softBody,
      valign: "top", align: "left", margin: 0,
    });
    y += 1.55;
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "METHOD",
              pageNum: "04", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 5 — Safety (right photo + 4 row labels)
// ----------------------------------------------------------------------------
function slide5(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "05 · SAFETY", labelColor: C.muted });

  s.addText("KIDS · PETS · PLANTS", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });

  s.addText(
    [
      { text: "Safe ", options: { color: C.ink } },
      { text: "for who lives there.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Sub paragraph
  s.addText(
    "We pick products and methods that are tough on pests but easy on your family — the dog, the toddler, the bees in the garden.",
    {
      x: 1.25, y: 3.2, w: 9.0, h: 1.3,
      fontFace: "Georgia", fontSize: 22, italic: true, color: C.softBody,
      valign: "top", align: "left", margin: 0,
    }
  );

  // 4 label-rows. Manual layout: text rows at uniform 1.15" stride starting at
  // y=5.025; hairlines balanced visually around the (top-anchored) text labels.
  const rows = [
    { label: "PRODUCTS", text: "EPA-registered, low-toxicity, used at the smallest effective dose." },
    { label: "INDOORS",  text: "Targeted gels and baits — never fogging your living room." },
    { label: "OUTDOORS", text: "Pollinator-aware timing, away from blooms and water features." },
    { label: "RE-ENTRY", text: "Most interior treatments are dry within an hour." },
  ];
  const textYs = [5.025, 6.175, 7.325, 8.475];
  const lineYs = [4.8, 5.73, 6.863, 8.097, 9.18];
  lineYs.forEach((ly) => {
    s.addShape("rect", {
      x: 1.25, y: ly, w: 9.0, h: 0.008,
      fill: { color: C.ink }, line: { type: "none" },
    });
  });
  rows.forEach((r, i) => {
    s.addText(r.label, {
      x: 1.25, y: textYs[i], w: 2.2, h: 0.45,
      fontFace: "Consolas", fontSize: 16, color: C.muted,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(r.text, {
      x: 3.55, y: textYs[i], w: 6.7, h: 0.7,
      fontFace: "Georgia", fontSize: 17, color: C.ink,
      margin: 0, valign: "top", align: "left",
    });
  });

  // Right-side photo
  s.addImage({
    path: IMG("image6.jpeg"),
    x: 11.5, y: 3.1, w: 7.3, h: 6.0,
    sizing: { type: "cover", w: 7.3, h: 6.0 },
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "SAFETY",
              pageNum: "05", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 6 — Pricing (3 plan cards, middle is featured/dark)
// ----------------------------------------------------------------------------
function slide6(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "06 · PRICING", labelColor: C.muted });

  s.addText("PICK A PLAN", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    [
      { text: "Subscribe and ", options: { color: C.ink } },
      { text: "relax.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  const plans = [
    {
      x: 1.25, dark: false, label: "ONE-TIME", title1: "The ", title2: "Visit.",
      tag: "Got a problem right now? We'll come solve it.",
      price: "$249", priceUnit: "STARTING / VISIT",
      bullets: [
        "Single inspection & treatment",
        "Targeted to one pest issue",
        "30-day satisfaction window",
        "Detailed report & photos",
      ],
      footer: "NO COMMITMENT", featured: false,
    },
    {
      x: 7.42, dark: true, label: "SUBSCRIPTION", title1: "The ", title2: "Resident.",
      tag: "Year-round protection. The plan most DC families pick.",
      price: "$59", priceUnit: "/ MONTH",
      bullets: [
        "4 seasonal visits per year",
        "Unlimited free callbacks",
        "Insects + rodents covered",
        "Same agent every visit",
        "Priority same-day response",
        "Cancel anytime",
      ],
      footer: "SAVE ~25% VS. ONE-TIME VISITS", featured: true,
    },
    {
      x: 13.59, dark: false, label: "SUBSCRIPTION+", title1: "The ", title2: "Estate.",
      tag: "For larger homes, yards, and full-property coverage.",
      price: "$99", priceUnit: "/ MONTH",
      bullets: [
        "Everything in The Resident",
        "Mosquito & tick yard program",
        "Wildlife & termite monitoring",
        "Annual exclusion audit",
        "Dedicated account manager",
      ],
      footer: "BEST VALUE FOR >3,000 SQ FT", featured: false,
    },
  ];

  const cardW = 5.61, cardH = 6.61, cardY = 3.08;

  plans.forEach((p) => {
    const cardFill   = p.dark ? C.forest : C.cream;
    const txtMain    = p.dark ? C.cream  : C.ink;
    const txtAccent  = p.dark ? C.gold   : C.forest;
    const txtMuted   = p.dark ? "C0BDB6" : C.muted;
    const txtSoft    = p.dark ? "D8D5CE" : C.softBody;
    const checkColor = p.dark ? C.gold   : C.forest;
    const ruleColor  = p.dark ? "5A6F62" : C.ink;
    const borderClr  = p.dark ? C.forest : C.ink;

    // Card outline / fill
    s.addShape("rect", {
      x: p.x, y: cardY, w: cardW, h: cardH,
      fill: { color: cardFill }, line: { color: borderClr, width: 0.75 },
    });

    // "MOST POPULAR" pin on featured card (top-right)
    if (p.featured) {
      s.addShape("rect", {
        x: p.x + cardW - 1.95, y: cardY - 0.18, w: 1.95, h: 0.36,
        fill: { color: C.terracotta }, line: { type: "none" },
      });
      s.addText("MOST POPULAR", {
        x: p.x + cardW - 1.95, y: cardY - 0.18, w: 1.95, h: 0.36,
        fontFace: "Consolas", fontSize: 12, color: C.cream, bold: true,
        align: "center", valign: "middle", margin: 0,
      });
    }

    // Plan label
    s.addText(p.label, {
      x: p.x + 0.34, y: cardY + 0.39, w: cardW - 0.68, h: 0.333,
      fontFace: "Consolas", fontSize: 15, color: C.terracotta,
      margin: 0, valign: "top", align: "left",
    });

    // Title
    s.addText(
      [
        { text: p.title1, options: { color: txtMain } },
        { text: p.title2, options: { italic: true, color: txtAccent } },
      ],
      {
        x: p.x + 0.34, y: cardY + 0.86, w: cardW - 0.68, h: 0.7,
        fontFace: "Georgia", fontSize: 38, charSpacing: -1,
        valign: "top", align: "left", margin: 0,
      }
    );

    // Tagline
    s.addText(p.tag, {
      x: p.x + 0.34, y: cardY + 1.63, w: cardW - 0.68, h: 0.85,
      fontFace: "Georgia", fontSize: 16, italic: true, color: txtSoft,
      valign: "top", align: "left", margin: 0,
    });

    // Divider
    s.addShape("rect", {
      x: p.x + 0.34, y: cardY + 2.5, w: cardW - 0.68, h: 0.008,
      fill: { color: ruleColor }, line: { type: "none" },
    });

    // Price
    s.addText(p.price, {
      x: p.x + 0.34, y: cardY + 2.7, w: 2.2, h: 0.85,
      fontFace: "Georgia", fontSize: 48, color: txtMain, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    });
    s.addText(p.priceUnit, {
      x: p.x + 0.34, y: cardY + 3.45, w: 4.0, h: 0.36,
      fontFace: "Consolas", fontSize: 13, color: txtMuted,
      margin: 0, valign: "top", align: "left",
    });

    // Bullets with check marks
    let by = cardY + 3.95;
    p.bullets.forEach((b) => {
      s.addText("✓", {
        x: p.x + 0.34, y: by, w: 0.32, h: 0.32,
        fontFace: "Arial", fontSize: 13, bold: true, color: checkColor,
        margin: 0, valign: "middle", align: "left",
      });
      s.addText(b, {
        x: p.x + 0.7, y: by, w: cardW - 1.0, h: 0.32,
        fontFace: "Arial", fontSize: 13, color: txtMain,
        margin: 0, valign: "middle", align: "left",
      });
      by += 0.34;
    });

    // Card footer label
    s.addText(p.footer, {
      x: p.x + 0.34, y: cardY + cardH - 0.55, w: cardW - 0.68, h: 0.333,
      fontFace: "Consolas", fontSize: 11, color: txtMuted,
      margin: 0, valign: "top", align: "left",
    });
  });

  // Bottom note
  s.addText(
    "ALL PLANS INCLUDE LICENSED AGENTS, KID & PET SAFE PRODUCTS, AND OUR 100% GUARANTEE.",
    {
      x: 1.25, y: 9.85, w: 18.0, h: 0.34,
      fontFace: "Consolas", fontSize: 13, color: C.muted,
      align: "left", valign: "top", margin: 0,
    }
  );
  // (footer rule is overridden above by note line — restore standard footer below note)
  s.addText("06 / 10", {
    x: 16.5, y: 10.229, w: 2.3, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.muted,
    margin: 0, valign: "top", align: "right",
  });
}

// ----------------------------------------------------------------------------
// SLIDE 7 — Coverage (DC map)
// ----------------------------------------------------------------------------
function slide7(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "07 · COVERAGE", labelColor: C.muted });

  s.addText("SERVICE AREA", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    [
      { text: "Inside the ", options: { color: C.ink } },
      { text: "Beltway.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Big "I-495" callout (left column)
  s.addText("I-495", {
    x: 1.25, y: 3.2, w: 6.0, h: 1.5,
    fontFace: "Georgia", fontSize: 84, color: C.forest, charSpacing: -2,
    valign: "top", align: "left", margin: 0,
  });
  s.addText("OUR PERIMETER, BY DESIGN.", {
    x: 1.25, y: 4.75, w: 7.0, h: 0.34,
    fontFace: "Consolas", fontSize: 14, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    "We stay tight to the District and the inner ring — fast response, agents who know the housing stock.",
    {
      x: 1.25, y: 5.2, w: 7.0, h: 1.2,
      fontFace: "Georgia", fontSize: 18, italic: true, color: C.softBody,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Coverage neighborhoods in two columns
  const hoods = [
    "Capitol Hill", "Georgetown", "Dupont", "Logan Circle", "Petworth",
    "Cleveland Park", "Chevy Chase", "Bethesda", "Arlington", "Old Town",
  ];
  const colA = hoods.slice(0, 5), colB = hoods.slice(5);
  let yL = 6.45;
  for (let i = 0; i < 5; i++) {
    s.addText(colA[i], {
      x: 1.25, y: yL, w: 3.0, h: 0.34,
      fontFace: "Consolas", fontSize: 14, color: C.ink,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(colB[i], {
      x: 4.5, y: yL, w: 3.5, h: 0.34,
      fontFace: "Consolas", fontSize: 14, color: C.ink,
      margin: 0, valign: "top", align: "left",
    });
    yL += 0.42;
  }

  // The map (manually narrowed)
  s.addImage({
    path: IMG("image7.png"),
    x: 9.5, y: 2.9, w: 8.788, h: 6.3,
    sizing: { type: "contain", w: 8.788, h: 6.3 },
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "COVERAGE",
              pageNum: "07", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 8 — Credentials (4 numbered tiles)
// ----------------------------------------------------------------------------
function slide8(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "08 · CREDENTIALS", labelColor: C.muted });

  s.addText("WHY WE CAN SIGN FOR THE WORK", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    [
      { text: "Credentials.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  const items = [
    { n: "01", t: "Licensed.",
      d: "Pesticide-applicator licensure across DC, MD, and VA — agents and supervisors current on continuing-education hours." },
    { n: "02", t: "Bonded & insured.",
      d: "General liability and surety bonding sized to commercial work — certificates available on request before first visit." },
    { n: "03", t: "Trained agents.",
      d: "Every technician completes structured field training under a senior agent before solo work — not learning on your house." },
    { n: "04", t: "Documented work.",
      d: "Photo logs, product records, and service notes per visit — useful at closing, useful for HOAs, useful for you." },
  ];

  // Top hairline
  s.addShape("rect", {
    x: 1.25, y: 3.7, w: 17.5, h: 0.008,
    fill: { color: C.ink }, line: { type: "none" },
  });

  const zoneL = 1.25, zoneR = 18.75;
  const colW = (zoneR - zoneL) / items.length; // 4.375 per column
  items.forEach((it, idx) => {
    const x = zoneL + colW * idx;
    s.addText(it.n, {
      x: x, y: 3.95, w: colW - 0.5, h: 0.55,
      fontFace: "Consolas", fontSize: 32, color: C.terracotta, charSpacing: 0,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(it.t, {
      x: x, y: 4.85, w: colW - 0.5, h: 0.55,
      fontFace: "Georgia", fontSize: 28, color: C.ink, charSpacing: -1,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(it.d, {
      x: x, y: 5.6, w: colW - 0.5, h: 2.2,
      fontFace: "Georgia", fontSize: 15, color: C.softBody,
      margin: 0, valign: "top", align: "left",
    });
  });
  // Vertical separators sit between adjacent column contents (manually positioned)
  const dividerXs = [5.333, 9.674, 14.083];
  dividerXs.forEach((xDiv) => {
    s.addShape("rect", {
      x: xDiv, y: 3.95, w: 0.008, h: 4.0,
      fill: { color: "D6D2C8" }, line: { type: "none" },
    });
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "CREDENTIALS",
              pageNum: "08", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 9 — Getting Started (timeline of 4 steps)
// ----------------------------------------------------------------------------
function slide9(pres) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  header(s, { dotColor: C.forest, leftText: "DISTRICT PEST CONTROL",
              rightText: "09 · GETTING STARTED", labelColor: C.muted });

  s.addText("FROM PHONE CALL TO FIRST VISIT", {
    x: 1.25, y: 1.354, w: 18.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });
  s.addText(
    [
      { text: "Getting ", options: { color: C.ink } },
      { text: "started.", options: { italic: true, color: C.forest } },
    ],
    {
      x: 1.25, y: 1.9, w: 18.0, h: 0.81,
      fontFace: "Georgia", fontSize: 54, charSpacing: -2,
      valign: "top", align: "left", margin: 0,
    }
  );

  const steps = [
    { tag: "DAY 0", t: "Call or write.",
      d: "Tell us what you're seeing, where, and how long. We'll triage it on the call." },
    { tag: "WITHIN 48 HRS", t: "On-site inspection.",
      d: "A senior agent walks the property, identifies species, scopes the work, and quotes flat." },
    { tag: "FIRST VISIT", t: "Initial treatment.",
      d: "Targeted remediation plus exclusion of the obvious entry points — the heaviest visit of the year." },
    { tag: "ONGOING", t: "Quarterly cadence.",
      d: "Four scheduled visits, unlimited callbacks between them, one agent who knows your house." },
  ];

  // Timeline horizontal rule
  const lineY = 4.55;
  s.addShape("rect", {
    x: 1.55, y: lineY, w: 16.9, h: 0.008,
    fill: { color: C.ink }, line: { type: "none" },
  });

  const colW = 4.4;
  steps.forEach((st, idx) => {
    const x = 1.25 + colW * idx;
    // Circle node on the line
    s.addShape("ellipse", {
      x: x + 0.05, y: lineY - 0.13, w: 0.27, h: 0.27,
      fill: { color: C.cream }, line: { color: C.forest, width: 1.25 },
    });
    s.addText(st.tag, {
      x: x, y: 4.0, w: colW - 0.4, h: 0.34,
      fontFace: "Consolas", fontSize: 14, color: C.terracotta,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(st.t, {
      x: x, y: 4.95, w: colW - 0.4, h: 0.55,
      fontFace: "Georgia", fontSize: 26, color: C.ink, charSpacing: -1,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(st.d, {
      x: x, y: 5.7, w: colW - 0.5, h: 2.2,
      fontFace: "Georgia", fontSize: 15, color: C.softBody,
      margin: 0, valign: "top", align: "left",
    });
  });

  footer(s, { ruleColor: C.ink, sectionLabel: "ONBOARDING",
              pageNum: "09", labelColor: C.muted });
}

// ----------------------------------------------------------------------------
// SLIDE 10 — Contact (dark closing slide)
// ----------------------------------------------------------------------------
function slide10(pres) {
  const s = pres.addSlide();
  s.background = { color: C.darkBg };

  // Header (terracotta dot, cream-60% labels)
  s.addShape("ellipse", {
    x: 1.25, y: 0.802, w: 0.146, h: 0.146,
    fill: { color: C.terracotta }, line: { type: "none" },
  });
  s.addText("DISTRICT PEST CONTROL", {
    x: 1.562, y: 0.712, w: 5.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "left",
  });
  s.addText("10 · CONTACT", {
    x: 13.6, y: 0.729, w: 5.2, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "right",
  });

  // Eyebrow
  s.addText("SCHEDULE AN INSPECTION", {
    x: 1.25, y: 3.0, w: 10.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.terracotta,
    margin: 0, valign: "top", align: "left",
  });

  // Big serif headline
  s.addText(
    [
      { text: "Let us ", options: { color: C.cream } },
      { text: "walk\nthe house.", options: { italic: true, color: C.gold } },
    ],
    {
      x: 1.25, y: 3.6, w: 9.5, h: 4.5,
      fontFace: "Georgia", fontSize: 108, charSpacing: -3,
      valign: "top", align: "left", margin: 0,
    }
  );

  // Contact rows on right. Manual layout: text rows at uniform 1.1" stride
  // starting at y=3.725; hairlines balanced visually around the labels.
  const contacts = [
    { label: "PHONE",     value: "(202) 555 — 0144" },
    { label: "EMAIL",     value: "hello@districtpest.co" },
    { label: "WEB",       value: "districtpest.co" },
    { label: "HOURS",     value: "Mon – Sat · 7a – 7p" },
    { label: "EMERGENCY", value: "Same-day, inside the Beltway" },
  ];
  const cTextYs = [3.725, 4.825, 5.925, 7.025, 8.125];
  const cLineYs = [3.45, 4.414, 5.531, 6.631, 7.748, 8.814];
  cLineYs.forEach((ly) => {
    s.addShape("rect", {
      x: 11.5, y: ly, w: 7.3, h: 0.006,
      fill: { color: C.cream }, line: { type: "none" }, transparency: 70,
    });
  });
  contacts.forEach((c, i) => {
    s.addText(c.label, {
      x: 11.5, y: cTextYs[i], w: 2.0, h: 0.45,
      fontFace: "Consolas", fontSize: 14, color: C.cream, transparency: 50,
      margin: 0, valign: "top", align: "left",
    });
    s.addText(c.value, {
      x: 13.7, y: cTextYs[i], w: 5.1, h: 0.55,
      fontFace: "Georgia", fontSize: 24, color: C.cream,
      margin: 0, valign: "top", align: "left",
    });
  });

  // Bottom rule + labels
  s.addShape("rect", {
    x: 1.25, y: 9.99, w: 17.5, h: 0.012,
    fill: { color: C.cream }, line: { type: "none" },
  });
  s.addText("LICENSED · BONDED · INSURED", {
    x: 1.25, y: 10.229, w: 8.0, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "left",
  });
  s.addText("10 / 10", {
    x: 16.5, y: 10.229, w: 2.3, h: 0.333,
    fontFace: "Consolas", fontSize: 18, color: C.cream, transparency: 40,
    margin: 0, valign: "top", align: "right",
  });
}

// ---- main ----
async function main() {
  const pres = buildPres();
  slide1(pres);
  slide2(pres);
  slide3(pres);
  slide4(pres);
  slide5(pres);
  slide6(pres);
  slide7(pres);
  slide8(pres);
  slide9(pres);
  slide10(pres);
  const outFile = path.join(__dirname, "district-pest-control_replica.pptx");
  await pres.writeFile({ fileName: outFile });
  console.log("Wrote", outFile);
}

main().catch((e) => { console.error(e); process.exit(1); });
