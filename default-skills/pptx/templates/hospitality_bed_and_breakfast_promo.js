// Replica of Deliverable_8.pptx — "Courtyard House · Match Day Stay"
// Built with pptxgenjs

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBed,
  FaStar,
  FaShuttleVan,
  FaBullseye,
  FaConciergeBell,
  FaEnvelope,
  FaPhone,
  FaGlobe,
} = require("react-icons/fa");

// ---------- Palette ----------
const C = {
  cream: "F5EFE3",      // background
  creamLight: "FBF7EE", // slightly brighter cream (for room cards on dark)
  navy: "162032",       // primary dark
  navyAlt: "1A2438",    // a touch lighter for on-card accents
  slate: "3A4458",      // muted navy text
  forest: "1F4D2B",     // primary green
  forestDark: "163920", // darker green for grid bg
  coral: "D4623A",      // accent orange/red
  white: "FFFFFF",
  black: "000000",
};

// ---------- Setup ----------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5" (16:9)
pres.title = "Courtyard House — Match Day Stay";
pres.author = "Courtyard House";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

// ---------- Icon helpers ----------
function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToPngB64(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- Reused chrome (header + footer) ----------
function addChrome(slide, opts) {
  const {
    pageNum,           // e.g. "01"
    sectionTag,        // e.g. "COVER"
    headerRight,       // e.g. "MATCH DAY STAY · BED & BREAKFAST"
    bg = C.cream,      // slide background
    textColor = C.navy,
    mutedColor = C.slate,
    rightHalfBg = null,   // for slide 1 split bg, optional override of header right color region
  } = opts;

  // Brand mark: small coral dot + "COURTYARD HOUSE"
  slide.addShape(pres.shapes.OVAL, {
    x: 0.55, y: 0.43, w: 0.13, h: 0.13,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 },
  });
  slide.addText("COURTYARD HOUSE", {
    x: 0.74, y: 0.32, w: 3, h: 0.4,
    fontFace: "Calibri", fontSize: 11, bold: true,
    color: textColor, charSpacing: 4, valign: "middle", margin: 0,
  });

  // Top-right header text
  slide.addText(headerRight, {
    x: SLIDE_W - 5.2, y: 0.32, w: 4.7, h: 0.4,
    fontFace: "Calibri", fontSize: 11,
    color: mutedColor, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });

  // Bottom rule
  slide.addShape(pres.shapes.LINE, {
    x: 1.2, y: 7.13, w: SLIDE_W - 2.6, h: 0,
    line: { color: mutedColor, width: 0.5, transparency: 60 },
  });

  // Page number
  slide.addText(`${pageNum} / 08`, {
    x: 0.55, y: 6.95, w: 1.5, h: 0.35,
    fontFace: "Calibri", fontSize: 10,
    color: mutedColor, charSpacing: 4, valign: "middle", margin: 0,
  });

  // Section tag (right)
  slide.addText(sectionTag, {
    x: SLIDE_W - 2.05, y: 6.95, w: 1.5, h: 0.35,
    fontFace: "Calibri", fontSize: 10,
    color: mutedColor, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// ===================================================================
// MAIN
// ===================================================================
async function build() {
  // Pre-render icons (needed in slides 7 & 8)
  const iconBed       = await iconToPngB64(FaBed, "#1F4D2B", 256);
  const iconStar      = await iconToPngB64(FaStar, "#FBF7EE", 256);   // white star on coral disc
  const iconVan       = await iconToPngB64(FaShuttleVan, "#162032", 256);
  const iconBullseye  = await iconToPngB64(FaBullseye, "#1F4D2B", 256);
  const iconBell      = await iconToPngB64(FaConciergeBell, "#162032", 256);
  const iconEnv       = await iconToPngB64(FaEnvelope, "#F5EFE3", 256);
  const iconPhone     = await iconToPngB64(FaPhone, "#F5EFE3", 256);
  const iconGlobe     = await iconToPngB64(FaGlobe, "#F5EFE3", 256);

  // ============================================================
  // SLIDE 1 — COVER
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };

    // Right half forest panel
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.7, y: 0, w: SLIDE_W - 7.7, h: SLIDE_H,
      fill: { color: C.forest }, line: { color: C.forest, width: 0 },
    });

    addChrome(s, {
      pageNum: "01",
      sectionTag: "COVER",
      headerRight: "MATCH DAY STAY · BED & BREAKFAST",
    });

    // Eyebrow
    s.addText("MATCH DAY STAY · FINAL WEEKEND", {
      x: 0.55, y: 1.4, w: 7, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.slate,
      charSpacing: 4, valign: "middle", margin: 0,
    });

    // Big headline (rich text — "final" in coral, italic-y serif feel via Georgia)
    s.addText(
      [
        { text: "Sleep where the\n", options: { color: C.navy, bold: true, fontFace: "Georgia" } },
        { text: "final", options: { color: C.coral, bold: true, italic: true, fontFace: "Georgia" } },
        { text: " happens.", options: { color: C.navy, bold: true, fontFace: "Georgia" } },
      ],
      {
        x: 0.55, y: 1.75, w: 7, h: 2.0,
        fontSize: 52, valign: "top", margin: 0,
      }
    );

    // Body copy
    s.addText(
      "A 10-bedroom boutique B&B a short walk from Met Stadium. Beds, breakfast, parking and a quiet courtyard — all on the same block as the biggest match of the year.",
      {
        x: 0.55, y: 3.85, w: 6.4, h: 1.05,
        fontFace: "Calibri", fontSize: 13, color: C.slate,
        valign: "top", margin: 0, paraSpaceAfter: 4,
      }
    );

    // Pill: 10 BEDROOMS (filled navy)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.55, y: 5.05, w: 1.55, h: 0.4,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 }, rectRadius: 0.2,
    });
    s.addText("10 BEDROOMS", {
      x: 0.55, y: 5.05, w: 1.55, h: 0.4,
      fontFace: "Calibri", fontSize: 9.5, bold: true,
      color: C.cream, charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });

    // Pill: 7 MIN WALK TO GATE (outline)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 2.25, y: 5.05, w: 2.0, h: 0.4,
      fill: { color: C.cream }, line: { color: C.navy, width: 1 }, rectRadius: 0.2,
    });
    s.addText("7 MIN WALK TO GATE", {
      x: 2.25, y: 5.05, w: 2.0, h: 0.4,
      fontFace: "Calibri", fontSize: 9.5, bold: true,
      color: C.navy, charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });

    // Pill: ON-SITE PARKING (outline)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.55, y: 5.55, w: 1.7, h: 0.4,
      fill: { color: C.cream }, line: { color: C.navy, width: 1 }, rectRadius: 0.2,
    });
    s.addText("ON-SITE PARKING", {
      x: 0.55, y: 5.55, w: 1.7, h: 0.4,
      fontFace: "Calibri", fontSize: 9.5, bold: true,
      color: C.navy, charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });

    // Footer line "3 NIGHTS · 10 ROOMS · BREAKFAST"
    s.addText("3 NIGHTS · 10 ROOMS · BREAKFAST", {
      x: 0.55, y: 6.4, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.navy,
      charSpacing: 4, valign: "middle", margin: 0,
    });

    // Right side — large cream circle "ball"
    const ballCx = 10.5, ballCy = 3.75, ballR = 1.85;
    s.addShape(pres.shapes.OVAL, {
      x: ballCx - ballR, y: ballCy - ballR, w: ballR * 2, h: ballR * 2,
      fill: { color: C.creamLight }, line: { color: C.navy, width: 1.5 },
    });
    // Stylized soccer pentagons
    s.addShape(pres.shapes.PENTAGON, {
      x: ballCx - 0.5, y: ballCy - 0.85, w: 1.0, h: 0.95,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addShape(pres.shapes.PENTAGON, {
      x: ballCx - 1.45, y: ballCy - 0.05, w: 0.7, h: 0.65,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 }, rotate: -50,
    });
    s.addShape(pres.shapes.PENTAGON, {
      x: ballCx + 0.75, y: ballCy - 0.05, w: 0.7, h: 0.65,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 }, rotate: 50,
    });
    s.addShape(pres.shapes.PENTAGON, {
      x: ballCx - 0.4, y: ballCy + 0.85, w: 0.8, h: 0.75,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 }, rotate: 180,
    });

    // Coral "Final Weekend / LIMITED 2026" badge top-right
    s.addShape(pres.shapes.OVAL, {
      x: 11.55, y: 0.85, w: 1.4, h: 1.4,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addText(
      [
        { text: "Final\nWeekend\n", options: { fontSize: 14, bold: true, color: C.cream, fontFace: "Georgia" } },
        { text: "LIMITED 2026", options: { fontSize: 7.5, bold: true, color: C.cream, charSpacing: 2 } },
      ],
      {
        x: 11.55, y: 0.85, w: 1.4, h: 1.4,
        align: "center", valign: "middle", margin: 0,
      }
    );
  }

  // ============================================================
  // SLIDE 2 — WHY US (3 stat columns)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    addChrome(s, {
      pageNum: "02",
      sectionTag: "WHY US",
      headerRight: "THE OFFER · IN NUMBERS",
    });

    s.addText("WHY COURTYARD HOUSE", {
      x: 0.55, y: 1.05, w: 8, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.slate,
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText("Closer than any hotel.", {
      x: 0.55, y: 1.4, w: 12, h: 1.6,
      fontFace: "Georgia", fontSize: 60, bold: true,
      color: C.navy, valign: "top", margin: 0,
    });

    s.addText(
      "A short, walkable distance from Met Stadium — close enough to hear the\ncrowd, far enough to actually sleep.",
      {
        x: 0.55, y: 3.2, w: 8, h: 0.8,
        fontFace: "Calibri", fontSize: 13, color: C.slate,
        valign: "top", margin: 0,
      }
    );

    // Three stat columns — each col gets a top rule
    const cols = [
      { x: 0.55, num: "10", numColor: C.navy, suffix: "", label: "PRIVATE BEDROOMS",
        body: "En-suite, individually styled, sleeps up\nto 22 guests." },
      { x: 4.85, num: "7", numColor: C.forest, suffix: "min", label: "WALK TO STADIUM",
        body: "Door to gate on foot, no traffic, no\ntransfers." },
      { x: 9.15, num: "12", numColor: C.coral, suffix: "", label: "COURTYARD SPACES",
        body: "On-site parking, plus a private park\nout back." },
    ];

    cols.forEach((c) => {
      // top rule
      s.addShape(pres.shapes.LINE, {
        x: c.x, y: 4.4, w: 3.65, h: 0,
        line: { color: C.navy, width: 0.5, transparency: 50 },
      });
      // number + optional suffix
      s.addText(
        [
          { text: c.num, options: { fontSize: 70, bold: true, color: c.numColor, fontFace: "Georgia" } },
          { text: c.suffix, options: { fontSize: 22, color: c.numColor, fontFace: "Calibri" } },
        ],
        {
          x: c.x, y: 4.5, w: 3.65, h: 1.3,
          valign: "top", margin: 0,
        }
      );
      s.addText(c.label, {
        x: c.x, y: 5.85, w: 3.65, h: 0.35,
        fontFace: "Calibri", fontSize: 11, bold: true, color: C.navy,
        charSpacing: 3, valign: "middle", margin: 0,
      });
      s.addText(c.body, {
        x: c.x, y: 6.2, w: 3.65, h: 0.7,
        fontFace: "Calibri", fontSize: 11, color: C.slate,
        valign: "top", margin: 0,
      });
    });
  }

  // ============================================================
  // SLIDE 3 — LOCATION (stylized map)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    addChrome(s, {
      pageNum: "03",
      sectionTag: "LOCATION",
      headerRight: "NEIGHBORHOOD · WALKING DISTANCE",
    });

    // Eyebrow + title (left), body (right)
    s.addText("THE LOCATION", {
      x: 0.55, y: 0.95, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.slate,
      charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText("A short walk to the gate.", {
      x: 0.55, y: 1.3, w: 9, h: 1.0,
      fontFace: "Georgia", fontSize: 44, bold: true,
      color: C.navy, valign: "top", margin: 0,
    });
    s.addText(
      "Park your car once and stay parked. The pitch is\njust down the street — leave the keys, walk the\nblock.",
      {
        x: 9.0, y: 1.3, w: 3.8, h: 1.2,
        fontFace: "Calibri", fontSize: 11, color: C.slate,
        align: "right", valign: "top", margin: 0,
      }
    );

    // Map background
    const mapX = 0.55, mapY = 2.85, mapW = 12.25, mapH = 3.95;
    s.addShape(pres.shapes.RECTANGLE, {
      x: mapX, y: mapY, w: mapW, h: mapH,
      fill: { color: "E8E0CC" }, line: { color: C.navy, width: 0.5, transparency: 70 },
    });

    // Map blocks — a 4x3 grid of slightly lighter rectangles
    const cols = 6, rows = 3;
    const gap = 0.18;
    const blockW = (mapW - gap * (cols + 1)) / cols;
    const blockH = (mapH - gap * (rows + 1)) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: mapX + gap + c * (blockW + gap),
          y: mapY + gap + r * (blockH + gap),
          w: blockW, h: blockH,
          fill: { color: "EFE6CF" }, line: { color: "EFE6CF", width: 0 },
        });
      }
    }

    // Compass (top-left of map)
    s.addShape(pres.shapes.OVAL, {
      x: mapX + 0.45, y: mapY + 0.35, w: 0.36, h: 0.36,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.75 },
    });
    s.addText("N", {
      x: mapX + 0.45, y: mapY + 0.13, w: 0.36, h: 0.25,
      fontFace: "Calibri", fontSize: 7, bold: true, color: C.navy,
      align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
      x: mapX + 0.58, y: mapY + 0.42, w: 0.1, h: 0.18,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });

    // Public park (green rounded rect)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mapX + 0.45, y: mapY + 1.85, w: 2.6, h: 1.25,
      fill: { color: "C6D6B5", transparency: 30 },
      line: { color: "C6D6B5", width: 0 }, rectRadius: 0.06,
    });
    // Trees
    [[0.95, 2.05], [1.85, 2.45], [2.55, 2.15], [1.35, 2.6]].forEach(([dx, dy]) => {
      s.addShape(pres.shapes.OVAL, {
        x: mapX + dx, y: mapY + dy, w: 0.4, h: 0.4,
        fill: { color: "6C8C5A" }, line: { color: "6C8C5A", width: 0 },
      });
    });

    // Courtyard House marker (coral pin in middle-left)
    const pinX = mapX + 5.0, pinY = mapY + 1.55;
    s.addShape(pres.shapes.OVAL, {
      x: pinX, y: pinY, w: 0.55, h: 0.55,
      fill: { color: C.coral }, line: { color: C.navy, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: pinX + 0.18, y: pinY + 0.13, w: 0.2, h: 0.22,
      fill: { color: C.cream }, line: { color: C.cream, width: 0 },
    });
    s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
      x: pinX + 0.15, y: pinY + 0.5, w: 0.25, h: 0.22,
      fill: { color: C.coral }, line: { color: C.navy, width: 1 },
      rotate: 180,
    });

    // Met Stadium (forest green disc, right side)
    const stadiumCx = mapX + 11.0, stadiumCy = mapY + 3.0;
    s.addShape(pres.shapes.OVAL, {
      x: stadiumCx - 0.85, y: stadiumCy - 0.7, w: 1.7, h: 1.4,
      fill: { color: C.forest }, line: { color: C.forest, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: stadiumCx - 0.55, y: stadiumCy - 0.45, w: 1.1, h: 0.9,
      fill: { color: "2A6939" }, line: { color: "2A6939", width: 0 },
    });
    // Pitch outline
    s.addShape(pres.shapes.OVAL, {
      x: stadiumCx - 0.3, y: stadiumCy - 0.25, w: 0.6, h: 0.5,
      fill: { color: "2A6939" }, line: { color: C.cream, width: 1 },
    });
    s.addShape(pres.shapes.LINE, {
      x: stadiumCx, y: stadiumCy - 0.25, w: 0, h: 0.5,
      line: { color: C.cream, width: 1 },
    });

    // Dotted route from pin to stadium (a line with dash)
    s.addShape(pres.shapes.LINE, {
      x: pinX + 0.55, y: pinY + 0.4, w: stadiumCx - (pinX + 0.55) - 0.45, h: stadiumCy - (pinY + 0.4),
      line: { color: C.navy, width: 1.5, dashType: "sysDot" },
    });

    // "7 MIN WALK" pill on the route
    const pillX = pinX + 2.6, pillY = pinY + 0.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: pillX, y: pillY, w: 1.4, h: 0.4,
      fill: { color: C.cream }, line: { color: C.navy, width: 1 }, rectRadius: 0.2,
    });
    s.addText("7 MIN WALK", {
      x: pillX, y: pillY, w: 1.4, h: 0.4,
      fontFace: "Calibri", fontSize: 10, bold: true, color: C.navy,
      charSpacing: 2, align: "center", valign: "middle", margin: 0,
    });

    // Legend along bottom of map
    const legY = mapY + mapH - 0.55;
    const legends = [
      { label: "COURTYARD HOUSE", color: C.coral, x: mapX + 0.45, w: 2.05 },
      { label: "MET STADIUM",     color: C.forest, x: mapX + 2.7,  w: 1.6 },
      { label: "PUBLIC PARK",     color: "C6D6B5", x: mapX + 4.5,  w: 1.55 },
    ];
    legends.forEach((l) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: l.x, y: legY, w: l.w, h: 0.4,
        fill: { color: C.cream }, line: { color: C.navy, width: 0.75 }, rectRadius: 0.2,
      });
      s.addShape(pres.shapes.OVAL, {
        x: l.x + 0.13, y: legY + 0.12, w: 0.16, h: 0.16,
        fill: { color: l.color }, line: { color: l.color, width: 0 },
      });
      s.addText(l.label, {
        x: l.x + 0.32, y: legY, w: l.w - 0.4, h: 0.4,
        fontFace: "Calibri", fontSize: 9, bold: true, color: C.navy,
        charSpacing: 2, valign: "middle", margin: 0,
      });
    });
  }

  // ============================================================
  // SLIDE 4 — ROOMS (10 cards on dark green)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.forest };
    addChrome(s, {
      pageNum: "04",
      sectionTag: "ROOMS",
      headerRight: "BEDROOMS · 10 EN-SUITE",
      textColor: C.cream,
      mutedColor: C.cream,
    });

    s.addText("THE ROOMS", {
      x: 0.55, y: 1.05, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: "8AA095",
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText(
      [
        { text: "Ten beds. Zero\n", options: { color: C.cream, bold: true, fontFace: "Georgia" } },
        { text: "strangers", options: { color: C.coral, bold: true, italic: true, fontFace: "Georgia" } },
        { text: ".", options: { color: C.cream, bold: true, fontFace: "Georgia" } },
      ],
      {
        x: 0.55, y: 1.4, w: 8, h: 2.0,
        fontSize: 50, valign: "top", margin: 0,
      }
    );

    s.addText(
      "Book single rooms, take a floor, or claim the whole\nhouse. Each en-suite is private, quiet, and big enough\nfor two — perfect for a travel party, family, or\nsupporters group.",
      {
        x: 8.55, y: 1.6, w: 4.3, h: 1.6,
        fontFace: "Calibri", fontSize: 12, color: "C8D5C9",
        valign: "top", margin: 0,
      }
    );

    // Room cards — 5 cols x 2 rows, suites #03 and #08 use coral
    const startX = 0.55, startY = 3.85;
    const cardW = 2.4, cardH = 1.5, gapX = 0.13, gapY = 0.18;
    for (let i = 0; i < 10; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);
      const num = String(i + 1).padStart(2, "0");
      const isSuite = num === "03" || num === "08";
      const cardFill = isSuite ? C.coral : C.forestDark;
      const labelText = isSuite ? "SUITE" : "ROOM";

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cardW, h: cardH,
        fill: { color: cardFill },
        line: { color: cardFill, width: 0 },
        rectRadius: 0.08,
      });
      s.addText(labelText, {
        x: x + 0.2, y: y + 0.18, w: cardW - 0.25, h: 0.3,
        fontFace: "Calibri", fontSize: 10, color: isSuite ? "F2D2C2" : "8AA095",
        charSpacing: 3, valign: "middle", margin: 0,
      });
      s.addText(num, {
        x: x + 0.2, y: y + 0.42, w: cardW - 0.3, h: 0.7,
        fontFace: "Georgia", fontSize: 36, bold: true, color: C.cream,
        valign: "top", margin: 0,
      });

      // Tiny stylized "bed" graphic in lower-right of card
      const bedX = x + cardW - 0.85, bedY = y + cardH - 0.45;
      // mattress
      s.addShape(pres.shapes.RECTANGLE, {
        x: bedX, y: bedY, w: 0.6, h: 0.18,
        fill: { color: C.cream }, line: { color: C.cream, width: 0 },
      });
      // base accent
      s.addShape(pres.shapes.RECTANGLE, {
        x: bedX, y: bedY + 0.18, w: 0.6, h: 0.08,
        fill: { color: C.coral }, line: { color: C.coral, width: 0 },
      });
      // pillow / accent on top — for suite cards add 2 small navy "pillows"
      if (isSuite) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: bedX + 0.05, y: bedY - 0.08, w: 0.2, h: 0.1,
          fill: { color: C.navy }, line: { color: C.navy, width: 0 },
        });
        s.addShape(pres.shapes.RECTANGLE, {
          x: bedX + 0.35, y: bedY - 0.08, w: 0.2, h: 0.1,
          fill: { color: C.navy }, line: { color: C.navy, width: 0 },
        });
      } else {
        s.addShape(pres.shapes.RECTANGLE, {
          x: bedX + 0.1, y: bedY - 0.08, w: 0.4, h: 0.1,
          fill: { color: C.cream }, line: { color: C.cream, width: 0 },
        });
      }
    }
  }

  // ============================================================
  // SLIDE 5 — COURTYARD (illustrated scene)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    addChrome(s, {
      pageNum: "05",
      sectionTag: "COURTYARD",
      headerRight: "OUTDOOR · COURTYARD & PARKING",
    });

    s.addText("THE COURTYARD", {
      x: 0.55, y: 1.05, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.slate,
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText("Park, breathe, walk to kickoff.", {
      x: 0.55, y: 1.4, w: 12, h: 1.0,
      fontFace: "Georgia", fontSize: 40, bold: true,
      color: C.navy, valign: "top", margin: 0,
    });

    // Scene background panel
    const sX = 0.55, sY = 2.85, sW = 12.25, sH = 3.95;
    s.addShape(pres.shapes.RECTANGLE, {
      x: sX, y: sY, w: sW, h: sH,
      fill: { color: "E8DFC8" }, line: { color: C.navy, width: 0.4, transparency: 70 },
    });

    // String of lights (a curve approximated by a line with slight rotation)
    s.addShape(pres.shapes.LINE, {
      x: sX + 0.3, y: sY + 0.6, w: sW - 0.6, h: 0,
      line: { color: C.navy, width: 0.75 },
    });
    // Light bulbs along the string
    for (let i = 0; i < 12; i++) {
      const bx = sX + 0.5 + i * ((sW - 1) / 11);
      const by = sY + 0.55 + (i % 2 === 0 ? 0.05 : -0.02);
      s.addShape(pres.shapes.OVAL, {
        x: bx, y: by, w: 0.1, h: 0.1,
        fill: { color: "E8B450" }, line: { color: "E8B450", width: 0 },
      });
    }

    // Ground line — slightly darker band along bottom
    s.addShape(pres.shapes.RECTANGLE, {
      x: sX, y: sY + sH - 1.2, w: sW, h: 1.2,
      fill: { color: "DCD0B5" }, line: { color: "DCD0B5", width: 0 },
    });

    // House (right side, coral)
    const hX = sX + 7.4, hY = sY + 0.85;
    // roof
    s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
      x: hX - 0.1, y: hY, w: 4.4, h: 1.0,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    // body
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX, y: hY + 0.95, w: 4.2, h: 1.95,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    // windows (5 cols x 2 rows of cream rects)
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 5; c++) {
        if (r === 1 && c === 4) continue; // door spot
        s.addShape(pres.shapes.RECTANGLE, {
          x: hX + 0.2 + c * 0.8, y: hY + 1.1 + r * 0.85, w: 0.5, h: 0.65,
          fill: { color: C.cream }, line: { color: C.cream, width: 0 },
        });
      }
    }
    // door
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX + 3.4, y: hY + 1.95, w: 0.5, h: 0.95,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: hX + 3.78, y: hY + 2.4, w: 0.06, h: 0.06,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });

    // Tree (left of scene)
    s.addShape(pres.shapes.OVAL, {
      x: sX + 0.3, y: sY + 1.85, w: 1.3, h: 1.1,
      fill: { color: "8FAA75" }, line: { color: "8FAA75", width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: sX + 0.85, y: sY + 2.85, w: 0.15, h: 0.5,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });

    // Parking spot stripes (white verticals across ground)
    for (let i = 0; i < 5; i++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: sX + 2.4 + i * 1.05, y: sY + sH - 1.0, w: 0.05, h: 0.95,
        fill: { color: C.cream }, line: { color: C.cream, width: 0 },
      });
    }

    // Coral car
    const carX = sX + 2.9, carY = sY + 2.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: carX, y: carY, w: 0.9, h: 0.5,
      fill: { color: C.coral }, line: { color: C.navy, width: 0.75 }, rectRadius: 0.08,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: carX + 0.15, y: carY + 0.07, w: 0.6, h: 0.22,
      fill: { color: "BFD3DD" }, line: { color: "BFD3DD", width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: carX + 0.08, y: carY + 0.4, w: 0.22, h: 0.22,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: carX + 0.6, y: carY + 0.4, w: 0.22, h: 0.22,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });

    // Cream van/car
    const vanX = sX + 4.6, vanY = carY + 0.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: vanX, y: vanY, w: 0.9, h: 0.45,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.75 }, rectRadius: 0.08,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: vanX + 0.15, y: vanY + 0.07, w: 0.6, h: 0.18,
      fill: { color: "BFD3DD" }, line: { color: "BFD3DD", width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: vanX + 0.08, y: vanY + 0.35, w: 0.22, h: 0.22,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: vanX + 0.6, y: vanY + 0.35, w: 0.22, h: 0.22,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });

    // Parking sign (P) right-of-center
    const signX = sX + 6.7, signY = sY + 2.45;
    s.addShape(pres.shapes.RECTANGLE, {
      x: signX, y: signY, w: 0.5, h: 0.5,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    s.addText("P", {
      x: signX, y: signY, w: 0.5, h: 0.5,
      fontFace: "Calibri", fontSize: 22, bold: true, color: C.cream,
      align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: signX + 0.22, y: signY + 0.5, w: 0.06, h: 0.55,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });

    // Tag pills (left side, stacked over the tree base)
    const tags = [
      { text: "12 PARKING SPOTS", fill: C.navy, fg: C.cream },
      { text: "POCKET PARK",      fill: C.forest, fg: C.cream },
      { text: "OUTDOOR LOUNGE",   fill: C.coral, fg: C.cream },
    ];
    tags.forEach((t, i) => {
      const ty = sY + 2.25 + i * 0.5;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: sX + 0.4, y: ty, w: 1.95, h: 0.4,
        fill: { color: t.fill }, line: { color: t.fill, width: 0 }, rectRadius: 0.2,
      });
      s.addText(t.text, {
        x: sX + 0.4, y: ty, w: 1.95, h: 0.4,
        fontFace: "Calibri", fontSize: 10, bold: true, color: t.fg,
        charSpacing: 2, align: "center", valign: "middle", margin: 0,
      });
    });
  }

  // ============================================================
  // SLIDE 6 — BREAKFAST (coral background, illustrated plate)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.coral };
    addChrome(s, {
      pageNum: "06",
      sectionTag: "BREAKFAST",
      headerRight: "MORNINGS · INCLUDED DAILY",
      textColor: C.cream,
      mutedColor: C.cream,
    });

    s.addText("THE BREAKFAST", {
      x: 0.55, y: 1.05, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: "F2C9B6",
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText("Big match.\nBigger\nbreakfast.", {
      x: 0.55, y: 1.4, w: 6.8, h: 2.9,
      fontFace: "Georgia", fontSize: 50, bold: true,
      color: C.cream, valign: "top", margin: 0,
    });

    s.addText(
      "A proper morning spread is included with every night\n— fresh bread, fruit, eggs your way, and coffee strong\nenough for stoppage time.",
      {
        x: 0.55, y: 4.4, w: 6.0, h: 1.0,
        fontFace: "Calibri", fontSize: 12, color: "F2D5C2",
        valign: "top", margin: 0,
      }
    );

    // Menu rows on left (each with thin rule above, label left, meta right)
    const menu = [
      ["Eggs, your way",          "07:00 — 11:00"],
      ["Pastries & bread",        "DAILY BAKE"],
      ["Seasonal fruit",          "LOCAL MARKET"],
      ["Espresso bar",            "SELF-SERVE"],
      ["Match-day kickoff plate", "FINAL SUNDAY"],
    ];
    const menuStartY = 5.3;
    menu.forEach(([label, meta], i) => {
      const yy = menuStartY + i * 0.3;
      s.addShape(pres.shapes.LINE, {
        x: 0.55, y: yy, w: 5.7, h: 0,
        line: { color: C.cream, width: 0.4, transparency: 50 },
      });
      s.addText(label, {
        x: 0.55, y: yy, w: 3.0, h: 0.3,
        fontFace: "Calibri", fontSize: 11, color: C.cream,
        valign: "middle", margin: 0,
      });
      s.addText(meta, {
        x: 3.55, y: yy, w: 2.7, h: 0.3,
        fontFace: "Calibri", fontSize: 9, color: "F2C9B6",
        charSpacing: 2, align: "right", valign: "middle", margin: 0,
      });
    });

    // Right — illustrated plate scene
    // Plate (large white oval)
    s.addShape(pres.shapes.OVAL, {
      x: 7.6, y: 3.6, w: 5.0, h: 1.55,
      fill: { color: C.cream }, line: { color: C.cream, width: 0 },
    });
    // Coffee cup
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.4, y: 2.85, w: 1.0, h: 1.2,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.75 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.5, y: 2.95, w: 0.8, h: 0.35,
      fill: { color: "4A2E1F" }, line: { color: "4A2E1F", width: 0 },
    });
    // Eggs on plate
    s.addShape(pres.shapes.OVAL, {
      x: 9.9, y: 3.95, w: 0.55, h: 0.55,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.6 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 10.05, y: 4.1, w: 0.22, h: 0.22,
      fill: { color: "F2C13C" }, line: { color: "F2C13C", width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 10.55, y: 4.1, w: 0.45, h: 0.45,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.6 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 10.66, y: 4.22, w: 0.2, h: 0.2,
      fill: { color: "F2C13C" }, line: { color: "F2C13C", width: 0 },
    });
    // Butter
    s.addShape(pres.shapes.RECTANGLE, {
      x: 9.55, y: 4.05, w: 0.3, h: 0.25,
      fill: { color: "F2C13C" }, line: { color: "F2C13C", width: 0 },
    });
    // Bread roll (right of eggs)
    s.addShape(pres.shapes.OVAL, {
      x: 11.3, y: 3.95, w: 0.95, h: 0.55,
      fill: { color: "C28D55" }, line: { color: C.navy, width: 0.6 },
    });
    s.addShape(pres.shapes.LINE, {
      x: 11.45, y: 4.22, w: 0.65, h: 0,
      line: { color: C.navy, width: 0.5 },
    });
    // Fruit bowl (above plate, left)
    s.addShape(pres.shapes.OVAL, {
      x: 8.75, y: 2.65, w: 0.18, h: 0.18,
      fill: { color: "8FAA75" }, line: { color: "8FAA75", width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 8.95, y: 2.55, w: 0.2, h: 0.2,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 9.18, y: 2.7, w: 0.18, h: 0.18,
      fill: { color: "F2C13C" }, line: { color: "F2C13C", width: 0 },
    });
    // OJ glass
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.5, y: 2.55, w: 0.55, h: 1.3,
      fill: { color: C.cream }, line: { color: C.navy, width: 0.75 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 11.55, y: 2.85, w: 0.45, h: 0.95,
      fill: { color: "F2A93C" }, line: { color: "F2A93C", width: 0 },
    });
  }

  // ============================================================
  // SLIDE 7 — PACKAGE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    addChrome(s, {
      pageNum: "07",
      sectionTag: "PACKAGE",
      headerRight: "FINAL WEEKEND PACKAGE · 3 NIGHTS",
    });

    s.addText("THE FINAL WEEKEND PACKAGE", {
      x: 0.55, y: 1.05, w: 8, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: C.slate,
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText("Three nights. One whole house.", {
      x: 0.55, y: 1.4, w: 12.2, h: 1.0,
      fontFace: "Georgia", fontSize: 44, bold: true,
      color: C.navy, valign: "top", margin: 0,
    });

    // Left column — "What's included"
    s.addText("What's included", {
      x: 0.55, y: 3.0, w: 6, h: 0.5,
      fontFace: "Georgia", fontSize: 22, bold: true, color: C.navy,
      valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 0.55, y: 3.55, w: 5.8, h: 0,
      line: { color: C.navy, width: 0.4, transparency: 60 },
    });

    const items = [
      { icon: iconBed,      iconBg: "E5DFD0", iconC: "1F4D2B", title: "10 en-suite bedrooms",          meta: "SLEEPS UP TO 22" },
      { icon: iconStar,     iconBg: C.coral,  iconC: C.cream,  title: "Daily breakfast for all guests", meta: "07:00 — 11:00" },
      { icon: iconVan,      iconBg: "E5DFD0", iconC: C.navy,   title: "12 on-site parking spots",       meta: "STAY PARKED ALL WEEKEND" },
      { icon: iconBullseye, iconBg: "E5DFD0", iconC: C.forest, title: "7-minute walk to the stadium",   meta: "DOOR TO GATE, NO TRANSFERS" },
      { icon: iconBell,     iconBg: "F2D04A", iconC: C.navy,   title: "Concierge & match-day support",  meta: "TICKETS, TAXIS, SUPPLIES" },
    ];

    const rowStartY = 3.7;
    const rowH = 0.62;
    items.forEach((it, i) => {
      const ry = rowStartY + i * rowH;
      // icon disc
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.55, y: ry, w: 0.5, h: 0.5,
        fill: { color: it.iconBg }, line: { color: it.iconBg, width: 0 }, rectRadius: 0.08,
      });
      s.addImage({
        data: it.icon, x: 0.66, y: ry + 0.11, w: 0.28, h: 0.28,
      });
      s.addText(it.title, {
        x: 1.2, y: ry - 0.02, w: 4.8, h: 0.3,
        fontFace: "Calibri", fontSize: 12, bold: true, color: C.navy,
        valign: "middle", margin: 0,
      });
      s.addText(it.meta, {
        x: 1.2, y: ry + 0.25, w: 4.8, h: 0.25,
        fontFace: "Calibri", fontSize: 9, color: C.slate,
        charSpacing: 2, valign: "middle", margin: 0,
      });
      // separator under (except last)
      if (i < items.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x: 0.55, y: ry + rowH - 0.04, w: 5.8, h: 0,
          line: { color: C.navy, width: 0.4, transparency: 75 },
        });
      }
    });

    // Right — dark price card
    const cardX = 7.0, cardY = 3.0, cardW = 6.0, cardH = 3.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cardX, y: cardY, w: cardW, h: cardH,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 }, rectRadius: 0.12,
    });

    s.addText("FINAL WEEKEND · 3 NIGHTS", {
      x: cardX + 0.4, y: cardY + 0.35, w: 4.0, h: 0.35,
      fontFace: "Calibri", fontSize: 11, color: "8C99B0",
      charSpacing: 3, valign: "middle", margin: 0,
    });

    // Big price
    s.addText("$8,400", {
      x: cardX + 0.4, y: cardY + 0.7, w: cardW - 0.8, h: 1.55,
      fontFace: "Georgia", fontSize: 84, bold: true, color: C.cream,
      valign: "top", margin: 0,
    });
    s.addText("/ house", {
      x: cardX + 0.4, y: cardY + 2.05, w: cardW - 0.8, h: 0.4,
      fontFace: "Calibri", fontSize: 16, color: "8C99B0",
      valign: "middle", margin: 0,
    });

    // Fine print
    s.addText(
      "All 10 bedrooms, breakfast for the whole party, parking, and the courtyard. Single rooms from $310/night when available.",
      {
        x: cardX + 0.4, y: cardY + 2.65, w: cardW - 0.8, h: 1.1,
        fontFace: "Calibri", fontSize: 10, color: "A6B0C2",
        valign: "top", margin: 0,
      }
    );

    // Coral "Save 15% / Book by Aug" badge top-right of card
    s.addShape(pres.shapes.OVAL, {
      x: cardX + cardW - 1.15, y: cardY - 0.35, w: 1.3, h: 1.3,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addText(
      [
        { text: "Save\n", options: { fontSize: 12, color: C.cream } },
        { text: "15%\n", options: { fontSize: 22, bold: true, color: C.cream, fontFace: "Georgia" } },
        { text: "Book by Aug", options: { fontSize: 7.5, color: C.cream, charSpacing: 1 } },
      ],
      {
        x: cardX + cardW - 1.15, y: cardY - 0.35, w: 1.3, h: 1.3,
        align: "center", valign: "middle", margin: 0, fontFace: "Calibri",
      }
    );

    // FRI — MON / SLEEPS 22 little chips, bottom-left of card
    // (kept tucked into the title area - omitted for cleaner look)
  }

  // ============================================================
  // SLIDE 8 — RESERVE / CONTACT
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    addChrome(s, {
      pageNum: "08",
      sectionTag: "BOOK",
      headerRight: "RESERVE · FINAL WEEKEND",
      textColor: C.cream,
      mutedColor: C.cream,
    });

    s.addText("RESERVE THE HOUSE", {
      x: 0.55, y: 1.05, w: 6, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: "5A6478",
      charSpacing: 4, valign: "middle", margin: 0,
    });

    s.addText(
      [
        { text: "Don't watch\nthe ", options: { color: C.cream, bold: true, fontFace: "Georgia" } },
        { text: "final", options: { color: C.coral, bold: true, italic: true, fontFace: "Georgia" } },
        { text: " from\nafar.", options: { color: C.cream, bold: true, fontFace: "Georgia" } },
      ],
      {
        x: 0.55, y: 1.4, w: 6.5, h: 2.7,
        fontSize: 44, valign: "top", margin: 0,
      }
    );

    s.addText(
      "Final-weekend dates fill quickly. Hold the house with a deposit today; balance due 30 days out, fully transferable.",
      {
        x: 0.55, y: 4.3, w: 5.8, h: 0.85,
        fontFace: "Calibri", fontSize: 12, color: "C2C7D0",
        valign: "top", margin: 0,
      }
    );

    // Contact rows (3 rows, dark cards)
    const contacts = [
      { icon: iconEnv,   label: "EMAIL", value: "stay@courtyardhouse.co" },
      { icon: iconPhone, label: "PHONE", value: "+1 (612) 555-0123" },
      { icon: iconGlobe, label: "WEB",   value: "courtyardhouse.co/final" },
    ];
    contacts.forEach((c, i) => {
      const ry = 5.3 + i * 0.52;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.55, y: ry, w: 6.2, h: 0.48,
        fill: { color: "1F2C44" }, line: { color: "2A3A55", width: 0.75 }, rectRadius: 0.1,
      });
      s.addImage({ data: c.icon, x: 0.75, y: ry + 0.13, w: 0.22, h: 0.22 });
      s.addText(c.label, {
        x: 1.15, y: ry, w: 2.0, h: 0.22,
        fontFace: "Calibri", fontSize: 8, color: "8A92A0",
        charSpacing: 2, valign: "bottom", margin: 0,
      });
      s.addText(c.value, {
        x: 1.15, y: ry + 0.21, w: 4.8, h: 0.27,
        fontFace: "Calibri", fontSize: 11, bold: true, color: C.cream,
        valign: "middle", margin: 0,
      });
      // arrow
      s.addText("→", {
        x: 6.25, y: ry, w: 0.4, h: 0.48,
        fontFace: "Calibri", fontSize: 13, color: C.coral,
        align: "center", valign: "middle", margin: 0,
      });
    });

    // Right — concentric ring decoration
    const cx = 10.3, cy = 4.1;
    s.addShape(pres.shapes.OVAL, {
      x: cx - 2.4, y: cy - 2.4, w: 4.8, h: 4.8,
      fill: { color: C.navy }, line: { color: C.cream, width: 0.5, transparency: 85 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: cx - 1.6, y: cy - 1.6, w: 3.2, h: 3.2,
      fill: { color: "1A2438" }, line: { color: C.cream, width: 0.5, transparency: 80 },
    });

    // Stylized key + house composition
    // Key handle (large coral ring)
    s.addShape(pres.shapes.OVAL, {
      x: cx - 1.4, y: cy - 0.55, w: 1.4, h: 1.4,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: cx - 1.05, y: cy - 0.2, w: 0.7, h: 0.7,
      fill: { color: C.navy }, line: { color: C.navy, width: 0 },
    });
    // Key shaft
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx - 0.05, y: cy - 0.05, w: 1.7, h: 0.25,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    // Key teeth
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 1.45, y: cy + 0.2, w: 0.18, h: 0.25,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 1.15, y: cy + 0.2, w: 0.18, h: 0.18,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });

    // Small house in front of key
    const hX = cx + 0.8, hY = cy + 0.6;
    s.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
      x: hX, y: hY, w: 1.3, h: 0.55,
      fill: { color: C.coral }, line: { color: C.coral, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX + 0.12, y: hY + 0.5, w: 1.05, h: 1.0,
      fill: { color: C.cream }, line: { color: C.cream, width: 0 },
    });
    // Window squares (forest green)
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX + 0.2, y: hY + 0.6, w: 0.3, h: 0.4,
      fill: { color: C.forest }, line: { color: C.forest, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX + 0.78, y: hY + 0.6, w: 0.3, h: 0.4,
      fill: { color: C.forest }, line: { color: C.forest, width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: hX + 0.49, y: hY + 1.1, w: 0.3, h: 0.4,
      fill: { color: C.forest }, line: { color: C.forest, width: 0 },
    });
  }

  // ---------- Save ----------
  await pres.writeFile({ fileName: "/home/assets/Deliverable_8_replica.pptx" });
  console.log("Wrote Deliverable_8_replica.pptx");
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
