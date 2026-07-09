// Snowboarding presentation — pptxgenjs replica
// Color palette pulled from the original deck:
//   Navy (background, dark text):        0F1B2D
//   Light gray (light bg):               F4F6FA
//   Body text on light:                  1F2A3D
//   Muted (footer/caption):              6B7280 / 8B95A6
//   Sky blue (accent / icon detail):     4FA9D6
//   Amber (signature accent):            E8B544
//   Card border on light bg:             E2E6EE
//   Card border on dark bg:              1E2C44

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const NAVY = "0F1B2D";
const NAVY_DARKER = "0A1320";
const LIGHT = "F4F6FA";
const TEXT_DARK = "1F2A3D";
const MUTED_DARK = "6B7280";   // muted text on light background
const MUTED_LIGHT = "8B95A6";  // muted text on dark background
const SKY = "4FA9D6";
const AMBER = "E8B544";
const CARD_BORDER_LIGHT = "E2E6EE";
const CARD_BORDER_DARK = "1E2C44";
const RULE_LIGHT = "D9DEE7";
const RULE_DARK = "26344F";

const HEADER_FONT = "Calibri";
const BODY_FONT = "Calibri";

// ---------- helpers ----------
function pageNum(slide, num, onDark) {
  slide.addText(`0${num} / 08`, {
    x: 0.5, y: 0.3, w: 2, h: 0.3,
    fontFace: BODY_FONT, fontSize: 11,
    color: onDark ? MUTED_LIGHT : MUTED_DARK,
    charSpacing: 4, margin: 0,
  });
}

function eyebrow(slide, text, color, y = 0.65) {
  slide.addText(text, {
    x: 0.5, y, w: 5, h: 0.3,
    fontFace: BODY_FONT, fontSize: 11, bold: true,
    color, charSpacing: 4, margin: 0,
  });
}

function footer(slide, leftText, rightText, onDark) {
  const color = onDark ? MUTED_LIGHT : MUTED_DARK;
  slide.addText(leftText, {
    x: 0.5, y: 5.18, w: 5, h: 0.3,
    fontFace: BODY_FONT, fontSize: 10,
    color, charSpacing: 3, margin: 0,
  });
  slide.addText(rightText, {
    x: 4.5, y: 5.18, w: 5, h: 0.3,
    fontFace: BODY_FONT, fontSize: 10,
    color, charSpacing: 3, align: "right", margin: 0,
  });
}

// ---------- inline SVG illustrations (rasterized to PNG) ----------
async function svgToBase64(svgString) {
  const buffer = await sharp(Buffer.from(svgString)).png().toBuffer();
  return "image/png;base64," + buffer.toString("base64");
}

// Snowboard (top-down) — used on slide 2 (large) and as gear icon on slide 3
function snowboardSvg({ width = 600, height = 220, board = NAVY, edge = SKY, strap = AMBER }) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 600 220">
      <rect x="20" y="60" width="560" height="100" rx="50" ry="50" fill="#${board}" />
      <rect x="36" y="76" width="528" height="68" rx="34" ry="34" fill="none" stroke="#${edge}" stroke-width="3" />
      <rect x="180" y="50" width="80" height="120" rx="6" fill="#${strap}" />
      <rect x="340" y="50" width="80" height="120" rx="6" fill="#${strap}" />
    </svg>`;
}

// Bindings icon
function bindingsSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
      <rect x="20" y="50" width="200" height="80" rx="10" fill="#${NAVY}" />
      <rect x="50" y="65" width="40" height="30" rx="3" fill="#${AMBER}" />
      <rect x="150" y="65" width="40" height="30" rx="3" fill="#${AMBER}" />
      <rect x="20" y="105" width="200" height="25" rx="4" fill="#${SKY}" />
    </svg>`;
}

// Boots icon
function bootsSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" viewBox="0 0 200 180">
      <path d="PLACEHOLDER" fill="#${NAVY}" />
      <rect x="65" y="55" width="70" height="18" rx="3" fill="#${AMBER}" />
      <rect x="40" y="115" width="120" height="20" rx="3" fill="#${SKY}" />
    </svg>`;
}

// Helmet & goggles icon
function helmetSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
      <path d="M40 100 Q40 40 120 40 Q200 40 200 100 L200 110 L40 110 Z" fill="#${NAVY}" />
      <rect x="40" y="105" width="160" height="18" rx="3" fill="#${SKY}" />
    </svg>`;
}

// Snowboard from the side (heel-side / toe-side brake illustrations)
function heelSideSvg() {
  // Looking from the side: deck on top, heel edge dug into snow on the right (down)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160">
      <line x1="20" y1="110" x2="300" y2="110" stroke="#${RULE_DARK}" stroke-width="1.5" />
      <!-- board tilted: heel edge (left) raised -->
      <polygon points="40,82 280,72 280,92 40,92" fill="#FFFFFF" />
      <polygon points="280,72 295,82 295,98 280,92" fill="#1B5775" />
      <polygon points="40,92 280,92 270,108 50,108" fill="#1B5775" />
    </svg>`;
}

function toeSideSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160">
      <line x1="20" y1="110" x2="300" y2="110" stroke="#0E3A52" stroke-width="1.5" />
      <!-- board tilted: toe edge (right side / front) raised -->
      <polygon points="60,72 270,82 270,92 60,92" fill="#0F1B2D" />
      <polygon points="60,72 45,82 45,98 60,92" fill="#0A1320" />
      <polygon points="60,92 270,92 260,108 70,108" fill="#0A1320" />
    </svg>`;
}

// Mountain silhouettes layered for slide 1
function mountainsSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="320" viewBox="0 0 1600 320" preserveAspectRatio="none">
      <!-- back layer -->
      <polygon fill="#16314A" points="0,200 120,140 220,170 340,110 460,160 600,120 720,170 860,130 1000,180 1140,130 1280,170 1400,140 1520,180 1600,150 1600,320 0,320" />
      <!-- mid layer -->
      <polygon fill="#1F4869" points="0,240 100,180 200,210 320,160 440,200 560,170 700,210 820,170 960,220 1080,170 1220,210 1340,180 1460,220 1600,190 1600,320 0,320" />
      <!-- front layer -->
      <polygon fill="#2A5E84" points="0,280 80,240 180,260 280,230 380,260 500,240 620,270 740,240 860,270 980,240 1100,270 1220,240 1340,270 1460,240 1600,270 1600,320 0,320" />
    </svg>`;
}

// Small left/right arrow used on slide 5
function arrowSvg(direction) {
  // direction: "right" or "left"
  const path = direction === "right"
    ? "M5 12 H35 M28 6 L35 12 L28 18"
    : "M35 12 H5 M12 6 L5 12 L12 18";
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24">
      <path d="${path}" stroke="#${SKY}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;
}

// Small horizontal snowboard for slide 5 (regular vs goofy stance)
function smallBoardSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="60" viewBox="0 0 240 60">
      <rect x="6" y="22" width="228" height="20" rx="10" fill="#FFFFFF" />
      <rect x="70" y="14" width="34" height="36" rx="2" fill="#${AMBER}" />
      <rect x="136" y="14" width="34" height="36" rx="2" fill="#${AMBER}" />
    </svg>`;
}

// ---------- main ----------
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.title = "Introduction to Snowboarding";
  pres.author = "A Beginner's Lesson";

  // Pre-render images
  const mountainsImg = await svgToBase64(mountainsSvg());
  const bigBoardImg = await svgToBase64(snowboardSvg({ width: 600, height: 220 }));
  const bindingsImg = await svgToBase64(bindingsSvg());
  const bootsImg = await svgToBase64(bootsSvg());
  const helmetImg = await svgToBase64(helmetSvg());
  const heelImg = await svgToBase64(heelSideSvg());
  const toeImg = await svgToBase64(toeSideSvg());
  const smallBoardImg = await svgToBase64(smallBoardSvg());
  const arrowRightImg = await svgToBase64(arrowSvg("right"));
  const arrowLeftImg = await svgToBase64(arrowSvg("left"));
  const gearBoardImg = await svgToBase64(snowboardSvg({ width: 240, height: 100 }));

  // ===================== SLIDE 1 — TITLE =====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };

    // Decorative mountain band along the bottom
    s.addImage({ data: mountainsImg, x: 0, y: 3.6, w: 10, h: 2.025 });

    // Eyebrow
    s.addText("A BEGINNER'S LESSON", {
      x: 0.5, y: 0.95, w: 6, h: 0.3,
      fontFace: BODY_FONT, fontSize: 12, bold: true,
      color: AMBER, charSpacing: 6, margin: 0,
    });

    // Big title
    s.addText("Introduction to\nSnowboarding", {
      x: 0.5, y: 1.35, w: 9, h: 2.0,
      fontFace: HEADER_FONT, fontSize: 60, bold: true,
      color: "FFFFFF", margin: 0, lineSpacingMultiple: 1.0,
    });

    // Bottom-left lesson tag
    s.addText("LESSON 01 / 08", {
      x: 0.5, y: 5.2, w: 4, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10, bold: true,
      color: "FFFFFF", charSpacing: 5, margin: 0,
    });

    // Bottom-right tagline (fits fully, unlike original)
    s.addText("ALL AGES · FIRST DAY ON SNOW", {
      x: 4.5, y: 5.2, w: 5.0, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10, bold: true,
      color: "FFFFFF", charSpacing: 5, align: "right", margin: 0,
    });
  }

  // ===================== SLIDE 2 — WHAT IS IT =====================
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };

    pageNum(s, 2, false);
    eyebrow(s, "THE SPORT", SKY, 1.35);

    s.addText("What is\nsnowboarding?", {
      x: 0.5, y: 1.7, w: 5.5, h: 1.4,
      fontFace: HEADER_FONT, fontSize: 40, bold: true,
      color: TEXT_DARK, margin: 0, lineSpacingMultiple: 1.05,
    });

    // Body text — colored phrase as rich text
    s.addText([
      { text: "Riding a single board sideways down a snowy slope — ", options: { color: TEXT_DARK } },
      { text: "balance, glide, and turn.", options: { color: SKY } },
    ], {
      x: 0.5, y: 3.3, w: 5.3, h: 1.0,
      fontFace: BODY_FONT, fontSize: 18, margin: 0, lineSpacingMultiple: 1.25,
    });

    // Snowboard illustration on the right
    s.addImage({ data: bigBoardImg, x: 6.0, y: 1.8, w: 3.5, h: 1.5, rotate: 12 });

    // Subtle dotted snow flecks
    const dots = [
      [6.4, 1.5], [7.2, 1.2], [8.1, 1.3], [8.9, 1.6], [9.3, 2.0],
      [6.8, 1.9], [7.6, 2.4], [8.6, 2.2],
    ];
    dots.forEach(([x, y]) => {
      s.addShape(pres.shapes.OVAL, {
        x, y, w: 0.05, h: 0.05, fill: { color: SKY }, line: { color: SKY, width: 0 },
      });
    });

    // Faint ground line
    s.addShape(pres.shapes.LINE, {
      x: 6.0, y: 3.55, w: 3.6, h: 0,
      line: { color: RULE_LIGHT, width: 0.75, dashType: "dash" },
    });

    footer(s, "INTRODUCTION TO SNOWBOARDING", "WHAT IS IT", false);
  }

  // ===================== SLIDE 3 — EQUIPMENT =====================
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };

    pageNum(s, 3, false);
    eyebrow(s, "EQUIPMENT", SKY, 0.55);

    s.addText("Your gear.", {
      x: 0.5, y: 0.9, w: 8, h: 0.8,
      fontFace: HEADER_FONT, fontSize: 40, bold: true,
      color: TEXT_DARK, margin: 0,
    });

    const cards = [
      { num: "01", label: "Snowboard",       img: gearBoardImg, iw: 1.0, ih: 0.42 },
      { num: "02", label: "Bindings",        img: bindingsImg,  iw: 0.7, ih: 0.47 },
      { num: "03", label: "Boots",           img: bootsImg,     iw: 0.55, ih: 0.5 },
      { num: "04", label: "Helmet & goggles",img: helmetImg,    iw: 0.75, ih: 0.5 },
    ];

    const cardW = 2.05, cardH = 2.6, gap = 0.18;
    const totalW = cardW * 4 + gap * 3;
    const startX = (10 - totalW) / 2;
    const cardY = 2.0;

    cards.forEach((c, i) => {
      const x = startX + i * (cardW + gap);
      // Card background
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: "FFFFFF" }, line: { color: CARD_BORDER_LIGHT, width: 0.75 },
      });
      // Number
      s.addText(c.num, {
        x: x + 0.25, y: cardY + 0.2, w: 1.0, h: 0.35,
        fontFace: BODY_FONT, fontSize: 13, bold: true,
        color: SKY, charSpacing: 4, margin: 0,
      });
      // Icon (centered)
      const ix = x + (cardW - c.iw) / 2;
      s.addImage({ data: c.img, x: ix, y: cardY + 0.95, w: c.iw, h: c.ih });
      // Label (bottom)
      s.addText(c.label, {
        x: x + 0.25, y: cardY + 1.95, w: cardW - 0.5, h: 0.4,
        fontFace: HEADER_FONT, fontSize: 14, bold: true,
        color: TEXT_DARK, margin: 0,
      });
    });

    footer(s, "INTRODUCTION TO SNOWBOARDING", "YOUR GEAR", false);
  }

  // ===================== SLIDE 4 — LAYER UP =====================
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };

    pageNum(s, 4, false);

    // LEFT column
    eyebrow(s, "LAYER UP", SKY, 1.5);

    s.addText("Dressing for\nthe mountain.", {
      x: 0.5, y: 1.85, w: 4.5, h: 1.6,
      fontFace: HEADER_FONT, fontSize: 36, bold: true,
      color: TEXT_DARK, margin: 0, lineSpacingMultiple: 1.05,
    });

    s.addText("Three layers keep you warm, dry, and moving.", {
      x: 0.5, y: 3.65, w: 4.0, h: 0.7,
      fontFace: BODY_FONT, fontSize: 13,
      color: MUTED_DARK, margin: 0, lineSpacingMultiple: 1.3,
    });

    // RIGHT column — list of layers
    const rows = [
      { tag: "L1", tagColor: SKY,   title: "Base layer",                desc: "Thermal top & bottom — wicks sweat away." },
      { tag: "L2", tagColor: SKY,   title: "Mid layer",                 desc: "Fleece or sweater — traps your warmth." },
      { tag: "L3", tagColor: SKY,   title: "Outer shell",               desc: "Waterproof jacket & pants — blocks snow and wind." },
      { tag: "+",  tagColor: SKY,   title: "Gloves, socks, neck warmer", desc: "Cover the extremities — they get cold first." },
    ];

    const listX = 5.2, listY = 1.15, rowH = 0.95;
    // Top divider
    s.addShape(pres.shapes.LINE, {
      x: listX, y: listY, w: 4.3, h: 0,
      line: { color: RULE_LIGHT, width: 0.75 },
    });

    rows.forEach((r, i) => {
      const ry = listY + i * rowH;
      // Tag
      s.addText(r.tag, {
        x: listX + 0.05, y: ry + 0.18, w: 0.5, h: 0.3,
        fontFace: BODY_FONT, fontSize: 13, bold: true,
        color: r.tagColor, margin: 0,
      });
      // Title
      s.addText(r.title, {
        x: listX + 0.6, y: ry + 0.12, w: 3.7, h: 0.34,
        fontFace: HEADER_FONT, fontSize: 16, bold: true,
        color: TEXT_DARK, margin: 0,
      });
      // Desc
      s.addText(r.desc, {
        x: listX + 0.6, y: ry + 0.46, w: 3.7, h: 0.32,
        fontFace: BODY_FONT, fontSize: 12,
        color: MUTED_DARK, margin: 0,
      });
      // Divider below
      s.addShape(pres.shapes.LINE, {
        x: listX, y: ry + rowH, w: 4.3, h: 0,
        line: { color: RULE_LIGHT, width: 0.75 },
      });
    });

    footer(s, "INTRODUCTION TO SNOWBOARDING", "DRESSING FOR THE MOUNTAIN", false);
  }

  // ===================== SLIDE 5 — STANCE =====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };

    pageNum(s, 5, true);

    s.addText("LEAD FOOT FORWARD", {
      x: 0.5, y: 0.55, w: 5, h: 0.3,
      fontFace: BODY_FONT, fontSize: 12, bold: true,
      color: AMBER, charSpacing: 5, margin: 0,
    });

    s.addText("Find your stance.", {
      x: 0.5, y: 0.95, w: 9, h: 0.8,
      fontFace: HEADER_FONT, fontSize: 38, bold: true,
      color: "FFFFFF", margin: 0,
    });

    // Two cards
    const cardY = 2.0, cardH = 2.5, cardW = 4.35, gap = 0.3;
    const startX = (10 - (cardW * 2 + gap)) / 2;

    const cards = [
      { x: startX, label: "LEFT FOOT LEADS", title: "Regular",
        body: "Most common stance — left foot points down the slope.", arrow: arrowRightImg },
      { x: startX + cardW + gap, label: "RIGHT FOOT LEADS", title: "Goofy",
        body: "Equally valid — right foot points down the slope.", arrow: arrowLeftImg },
    ];

    cards.forEach((c) => {
      // Card
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.x, y: cardY, w: cardW, h: cardH,
        fill: { color: NAVY_DARKER }, line: { color: CARD_BORDER_DARK, width: 0.75 },
      });

      // Eyebrow
      s.addText(c.label, {
        x: c.x + 0.35, y: cardY + 0.3, w: 2.5, h: 0.3,
        fontFace: BODY_FONT, fontSize: 11, bold: true,
        color: SKY, charSpacing: 4, margin: 0,
      });

      // Title
      s.addText(c.title, {
        x: c.x + 0.35, y: cardY + 0.65, w: 2.5, h: 0.6,
        fontFace: HEADER_FONT, fontSize: 30, bold: true,
        color: "FFFFFF", margin: 0,
      });

      // Body
      s.addText(c.body, {
        x: c.x + 0.35, y: cardY + 1.4, w: 2.6, h: 0.9,
        fontFace: BODY_FONT, fontSize: 13,
        color: MUTED_LIGHT, margin: 0, lineSpacingMultiple: 1.3,
      });

      // Small board + arrow on the right
      s.addImage({ data: smallBoardImg, x: c.x + cardW - 1.6, y: cardY + 0.7, w: 1.3, h: 0.32 });
      s.addImage({ data: c.arrow, x: c.x + cardW - 1.6 + (c.title === "Regular" ? 1.05 : -0.05), y: cardY + 0.36, w: 0.55, h: 0.28 });
    });

    // Tip text
    s.addText("Quick test: imagine someone gently pushes you from behind. Whichever foot steps forward to catch you — that's your lead foot.", {
      x: 0.5, y: 4.65, w: 9, h: 0.5,
      fontFace: BODY_FONT, fontSize: 12,
      color: MUTED_LIGHT, italic: true, margin: 0, lineSpacingMultiple: 1.3,
    });
  }

  // ===================== SLIDE 6 — FIRST MOVES =====================
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };

    pageNum(s, 6, false);
    eyebrow(s, "FIRST MOVES", SKY, 0.55);

    s.addText("Strapping in & standing up.", {
      x: 0.5, y: 0.9, w: 9, h: 0.8,
      fontFace: HEADER_FONT, fontSize: 36, bold: true,
      color: TEXT_DARK, margin: 0,
    });

    const steps = [
      { num: "01", title: "Sit down",
        body: "Sit with the board across the slope, edge dug into the snow." },
      { num: "02", title: "Strap in",
        body: "Lead foot first. Tighten the ankle strap, then the toe strap." },
      { num: "03", title: "Stand up",
        body: "Push from your front hand, rise over the board, and look up the slope." },
    ];

    const colW = 2.9, gap = 0.15;
    const totalW = colW * 3 + gap * 2;
    const startX = (10 - totalW) / 2;
    const colY = 2.15;

    steps.forEach((step, i) => {
      const x = startX + i * (colW + gap);
      // Big number
      s.addText(step.num, {
        x, y: colY, w: colW, h: 1.0,
        fontFace: HEADER_FONT, fontSize: 64,
        color: SKY, margin: 0,
      });
      // Underline
      s.addShape(pres.shapes.LINE, {
        x: x + 0.05, y: colY + 1.05, w: 0.55, h: 0,
        line: { color: SKY, width: 1 },
      });
      // Title
      s.addText(step.title, {
        x, y: colY + 1.25, w: colW, h: 0.4,
        fontFace: HEADER_FONT, fontSize: 18, bold: true,
        color: TEXT_DARK, margin: 0,
      });
      // Body
      s.addText(step.body, {
        x, y: colY + 1.7, w: colW - 0.1, h: 0.9,
        fontFace: BODY_FONT, fontSize: 13,
        color: MUTED_DARK, margin: 0, lineSpacingMultiple: 1.3,
      });
    });

    footer(s, "INTRODUCTION TO SNOWBOARDING", "STRAPPING IN & STANDING UP", false);
  }

  // ===================== SLIDE 7 — STOPPING =====================
  {
    const s = pres.addSlide();
    s.background = { color: LIGHT };

    pageNum(s, 7, false);
    eyebrow(s, "CONTROL BEFORE SPEED", SKY, 0.55);

    s.addText("Slowing down & stopping.", {
      x: 0.5, y: 0.9, w: 9, h: 0.8,
      fontFace: HEADER_FONT, fontSize: 36, bold: true,
      color: TEXT_DARK, margin: 0,
    });

    const cardY = 2.1, cardH = 2.85, cardW = 4.35, gap = 0.3;
    const startX = (10 - (cardW * 2 + gap)) / 2;

    // Card A - Heel-side (dark)
    {
      const x = startX;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: NAVY }, line: { color: NAVY, width: 0 },
      });
      s.addText("A.", {
        x: x + 0.3, y: cardY + 0.25, w: 0.6, h: 0.3,
        fontFace: BODY_FONT, fontSize: 13, bold: true,
        color: MUTED_LIGHT, margin: 0,
      });
      // Label
      s.addText("HEEL EDGE", {
        x: x + 0.5, y: cardY + 0.55, w: 1.7, h: 0.25,
        fontFace: BODY_FONT, fontSize: 9, bold: true,
        color: AMBER, charSpacing: 4, align: "center", margin: 0,
      });
      // Illustration (below label)
      s.addImage({ data: heelImg, x: x + 0.5, y: cardY + 0.85, w: 1.7, h: 0.7 });
      // Title
      s.addText("Heel-side brake.", {
        x: x + 0.3, y: cardY + 1.6, w: cardW - 0.6, h: 0.5,
        fontFace: HEADER_FONT, fontSize: 26, bold: true,
        color: "FFFFFF", margin: 0,
      });
      // Body
      s.addText("Lift your toes, press your heels down. The board's heel edge bites and you slow.", {
        x: x + 0.3, y: cardY + 2.2, w: cardW - 0.6, h: 0.7,
        fontFace: BODY_FONT, fontSize: 13,
        color: MUTED_LIGHT, margin: 0, lineSpacingMultiple: 1.3,
      });
    }

    // Card B - Toe-side (sky blue)
    {
      const x = startX + cardW + gap;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: "57A9D0" }, line: { color: "57A9D0", width: 0 },
      });
      s.addText("B.", {
        x: x + 0.3, y: cardY + 0.25, w: 0.6, h: 0.3,
        fontFace: BODY_FONT, fontSize: 13, bold: true,
        color: "0E3A52", margin: 0,
      });
      // Illustration
      s.addImage({ data: toeImg, x: x + 0.5, y: cardY + 0.55, w: 1.7, h: 0.7 });
      s.addText("TOE EDGE", {
        x: x + 0.5, y: cardY + 1.25, w: 1.7, h: 0.25,
        fontFace: BODY_FONT, fontSize: 9, bold: true,
        color: "0E3A52", charSpacing: 4, align: "center", margin: 0,
      });
      // Title
      s.addText("Toe-side brake.", {
        x: x + 0.3, y: cardY + 1.6, w: cardW - 0.6, h: 0.5,
        fontFace: HEADER_FONT, fontSize: 26, bold: true,
        color: TEXT_DARK, margin: 0,
      });
      // Body
      s.addText("Lift your heels, press the balls of your feet down. The toe edge engages and you slow.", {
        x: x + 0.3, y: cardY + 2.15, w: cardW - 0.6, h: 0.6,
        fontFace: BODY_FONT, fontSize: 13,
        color: "0F2E40", margin: 0, lineSpacingMultiple: 1.3,
      });
    }

    footer(s, "INTRODUCTION TO SNOWBOARDING", "SLOWING DOWN & STOPPING", false);
  }

  // ===================== SLIDE 8 — WRAP UP =====================
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };

    pageNum(s, 8, true);

    s.addText("WRAP UP", {
      x: 0.5, y: 0.55, w: 5, h: 0.3,
      fontFace: BODY_FONT, fontSize: 12, bold: true,
      color: AMBER, charSpacing: 5, margin: 0,
    });

    s.addText("You're ready\nfor the snow.", {
      x: 0.5, y: 0.95, w: 9, h: 1.85,
      fontFace: HEADER_FONT, fontSize: 50, bold: true,
      color: "FFFFFF", margin: 0, lineSpacingMultiple: 1.0,
    });

    const steps = [
      { tag: "NEXT 01", title: "Practice the falling leaf",
        body: "Slide side-to-side on one edge to build comfort and control." },
      { tag: "NEXT 02", title: "Link your first turns",
        body: "Connect heel-side and toe-side edges into a smooth S-shape." },
      { tag: "NEXT 03", title: "Ride often, fall well",
        body: "Falling is part of learning — bend the knees and enjoy it." },
    ];

    const colW = 2.9, gap = 0.15;
    const totalW = colW * 3 + gap * 2;
    const startX = (10 - totalW) / 2;
    const colY = 3.4;

    steps.forEach((step, i) => {
      const x = startX + i * (colW + gap);
      // Top divider
      s.addShape(pres.shapes.LINE, {
        x, y: colY, w: colW - 0.1, h: 0,
        line: { color: AMBER, width: 0.75 },
      });
      // Tag
      s.addText(step.tag, {
        x, y: colY + 0.1, w: colW, h: 0.3,
        fontFace: BODY_FONT, fontSize: 11, bold: true,
        color: AMBER, charSpacing: 4, margin: 0,
      });
      // Title
      s.addText(step.title, {
        x, y: colY + 0.45, w: colW - 0.05, h: 0.4,
        fontFace: HEADER_FONT, fontSize: 17, bold: true,
        color: "FFFFFF", margin: 0,
      });
      // Body
      s.addText(step.body, {
        x, y: colY + 0.9, w: colW - 0.1, h: 0.9,
        fontFace: BODY_FONT, fontSize: 12,
        color: MUTED_LIGHT, margin: 0, lineSpacingMultiple: 1.3,
      });
    });

    // Footer-style outro
    s.addText("SEE YOU ON THE MOUNTAIN.", {
      x: 0.5, y: 5.18, w: 5, h: 0.3,
      fontFace: BODY_FONT, fontSize: 11, bold: true,
      color: AMBER, charSpacing: 5, margin: 0,
    });
    s.addText("INTRODUCTION TO SNOWBOARDING", {
      x: 4.5, y: 5.18, w: 5, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10,
      color: MUTED_LIGHT, charSpacing: 4, align: "right", margin: 0,
    });
  }

  await pres.writeFile({ fileName: "/home/assets/Snowboarding.pptx" });
  console.log("Wrote /home/assets/Snowboarding.pptx");
}

build().catch((e) => { console.error(e); process.exit(1); });
