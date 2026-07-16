/*
 * Skateboarding 101 — pptxgenjs replica
 * Editorial-style 8-slide deck on a black/cream/orange palette.
 *
 * Run:  node skateboarding_101.js
 * Outputs: Skateboarding_101.pptx in the current directory.
 */

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaHelmetSafety,
  FaShield,
  FaHandFist,
  FaShoePrints,
} = require("react-icons/fa6");
const { GiKneeCap } = require("react-icons/gi");

// ---------- Palette ----------
const COLOR = {
  ink:    "1A1A1A", // near-black background / heavy text
  cream:  "EFEAE0", // light page background
  paper:  "E5DFD2", // slightly darker cream for cards on cream
  orange: "F25C1E", // accent
  mute:   "8A8A8A", // muted grey for labels
  line:   "B8B0A0", // hairline rules on cream
  lineDk: "3A3A3A", // hairline rules on dark
  textDk: "1A1A1A", // body text on cream
  textLt: "EFEAE0", // body text on dark
};

const FONT_HEAD = "Arial Black";
const FONT_BODY = "Arial";

// ---------- Icon helpers ----------
function renderIconSvg(IconComponent, color = "#1A1A1A", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ---------- Build deck ----------
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";       // 13.333 x 7.5 inches
  pres.author = "Skateboarding 101";
  pres.title  = "Skateboarding 101 — Intro to Skate";

  const W = 13.333, H = 7.5;

  // Pre-rasterize gear icons for slide 4
  const iconHelmet = await iconToBase64Png(FaHelmetSafety, "#1A1A1A", 256);
  const iconKnee   = await iconToBase64Png(GiKneeCap,      "#1A1A1A", 256);
  const iconElbow  = await iconToBase64Png(FaShield,       "#1A1A1A", 256);
  const iconWrist  = await iconToBase64Png(FaHandFist,     "#1A1A1A", 256);
  const iconShoe   = await iconToBase64Png(FaShoePrints,   "#1A1A1A", 256);

  // ---------- Reusable bits ----------
  const addEyebrow = (slide, num, label, onDark = false) => {
    slide.addText(
      [
        { text: num + "  ", options: { color: onDark ? COLOR.mute : COLOR.mute, bold: true } },
        { text: label,     options: { color: COLOR.orange, bold: true } },
      ],
      {
        x: 0.6, y: 0.45, w: 10, h: 0.4,
        fontSize: 12, fontFace: FONT_BODY,
        charSpacing: 6, margin: 0,
      }
    );
  };

  const addFooter = (slide, page, onDark = false) => {
    const y = H - 0.55;
    const lineColor = onDark ? COLOR.lineDk : COLOR.line;
    const textColor = onDark ? COLOR.mute : COLOR.mute;
    // hairline rule
    slide.addShape(pres.shapes.LINE, {
      x: 0.6, y: y - 0.12, w: W - 1.2, h: 0,
      line: { color: lineColor, width: 0.75 },
    });
    slide.addText("SKATEBOARDING 101", {
      x: 0.6, y: y, w: 5, h: 0.35,
      fontSize: 10, fontFace: FONT_BODY,
      color: textColor, charSpacing: 4, margin: 0,
    });
    slide.addText(`${page} / 08`, {
      x: W - 5.6, y: y, w: 5, h: 0.35,
      fontSize: 10, fontFace: FONT_BODY,
      color: textColor, charSpacing: 4, align: "right", margin: 0,
    });
  };

  // =========================================================
  // SLIDE 1 — Title (dark)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.ink };

    // Top meta strip
    s.addText("SKATEBOARDING 101 / BEGINNERS", {
      x: 0.6, y: 0.55, w: 8, h: 0.4,
      fontSize: 12, fontFace: FONT_BODY,
      color: COLOR.cream, charSpacing: 6, margin: 0,
    });
    s.addText("LESSON 01 OF 08", {
      x: W - 5.6, y: 0.55, w: 5, h: 0.4,
      fontSize: 12, fontFace: FONT_BODY,
      color: COLOR.cream, charSpacing: 6, align: "right", margin: 0,
    });

    // Big display headline — period rendered as orange text run for clean alignment
    s.addText(
      [
        { text: "INTRO TO", options: { color: COLOR.cream, breakLine: true } },
        { text: "SKATE",    options: { color: COLOR.cream } },
        { text: ".",        options: { color: COLOR.orange } },
      ],
      {
        x: 0.6, y: 1.5, w: W - 1.2, h: 4.0,
        fontSize: 130, fontFace: FONT_HEAD, bold: true,
        valign: "top", margin: 0,
        lineSpacingMultiple: 0.95,
      }
    );

    // Bottom three-up meta block
    const metaY = 6.15;
    const metaCols = [
      ["COURSE",  "SKATEBOARDING 101"],
      ["FORMAT",  "8 LESSONS · ALL AGES"],
      ["BRING",   "BOARD · HELMET · PADS"],
    ];
    const colXs = [0.6, 4.0, 8.0];
    metaCols.forEach(([k, v], i) => {
      s.addText(k, {
        x: colXs[i], y: metaY, w: 4, h: 0.32,
        fontSize: 11, fontFace: FONT_BODY,
        color: COLOR.mute, charSpacing: 6, margin: 0,
      });
      s.addText(v, {
        x: colXs[i], y: metaY + 0.38, w: 4, h: 0.36,
        fontSize: 13, fontFace: FONT_BODY, bold: true,
        color: COLOR.cream, charSpacing: 4, margin: 0,
      });
    });
  }

  // =========================================================
  // SLIDE 2 — Why skateboard (light, 4-up)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };

    addEyebrow(s, "02", "WHY SKATEBOARD");

    s.addText("Four good reasons to step on a board.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.7,
      fontSize: 52, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
      lineSpacingMultiple: 1.0,
    });

    s.addText(
      "Skateboarding builds balance, confidence, and community — and you can practice almost anywhere.",
      {
        x: 0.6, y: 2.85, w: 9.0, h: 0.9,
        fontSize: 18, fontFace: FONT_BODY,
        color: COLOR.textDk, valign: "top", margin: 0,
        lineSpacingMultiple: 1.25,
      }
    );

    // 4-up grid
    const reasons = [
      ["01", "Balance",    "Trains your core, ankles, and reflexes in ways few other sports do."],
      ["02", "Confidence", "Every small win — pushing, turning, stopping — compounds into real self-trust."],
      ["03", "Creativity", "There is no single \"right\" way to skate. The street is your canvas."],
      ["04", "Community",  "Skaters help skaters. Parks are some of the friendliest places you'll find."],
    ];
    const colW = 2.85, gutter = 0.18;
    const startX = 0.6;
    const colY = 4.55;
    reasons.forEach(([num, head, body], i) => {
      const x = startX + i * (colW + gutter);
      // Top hairline
      s.addShape(pres.shapes.LINE, {
        x, y: colY, w: colW - 0.6, h: 0,
        line: { color: COLOR.textDk, width: 0.75 },
      });
      // Big number
      s.addText(num, {
        x, y: colY + 0.1, w: colW, h: 0.85,
        fontSize: 44, fontFace: FONT_HEAD, bold: true,
        color: COLOR.orange, valign: "top", margin: 0,
      });
      // Heading
      s.addText(head, {
        x, y: colY + 0.95, w: colW, h: 0.45,
        fontSize: 18, fontFace: FONT_HEAD, bold: true,
        color: COLOR.textDk, valign: "top", margin: 0,
      });
      // Body
      s.addText(body, {
        x, y: colY + 1.45, w: colW - 0.15, h: 1.3,
        fontSize: 12, fontFace: FONT_BODY,
        color: COLOR.textDk, valign: "top", margin: 0,
        lineSpacingMultiple: 1.3,
      });
    });

    addFooter(s, "02");
  }

  // =========================================================
  // SLIDE 3 — Anatomy of a skateboard (light)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };
    addEyebrow(s, "03", "ANATOMY");

    s.addText("Parts of a skateboard.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.4,
      fontSize: 52, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
    });

    // Skateboard schematic (centered)
    const deckX = 3.2, deckY = 4.05, deckW = 6.9, deckH = 0.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: deckX, y: deckY, w: deckW, h: deckH,
      fill: { color: COLOR.ink }, line: { color: COLOR.ink, width: 0 },
      rectRadius: 0.27,
    });

    // Truck assemblies — left and right
    const truckAxleY = deckY + deckH + 0.45;
    const wheelD = 0.45;
    const trucks = [
      { cx: 4.35 }, // left truck center x (between two wheels)
      { cx: 8.95 }, // right truck center x
    ];
    trucks.forEach(({ cx }) => {
      // vertical truck post
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx - 0.05, y: deckY + deckH, w: 0.10, h: 0.45,
        fill: { color: COLOR.mute }, line: { color: COLOR.mute, width: 0 },
      });
      // horizontal axle
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx - 0.85, y: truckAxleY - 0.05, w: 1.7, h: 0.10,
        fill: { color: COLOR.mute }, line: { color: COLOR.mute, width: 0 },
      });
      // wheels (rings)
      [-0.85, 0.85].forEach((dx) => {
        s.addShape(pres.shapes.OVAL, {
          x: cx + dx - wheelD/2, y: truckAxleY - wheelD/2 + 0.45, w: wheelD, h: wheelD,
          fill: { color: COLOR.cream }, line: { color: COLOR.ink, width: 2.5 },
        });
      });
    });

    // Labels — A · TOP (deck), B · MID (trucks), C · BOTTOM (bearings/wheels left), D · ROLL (wheels right)
    const labels = [
      { tag: "A · TOP",    name: "Deck + Grip", x: 7.1,  y: 3.05, align: "left"  }, // above deck right
      { tag: "B · MID",    name: "Trucks",      x: 3.4,  y: 3.05, align: "left"  }, // above deck left
      { tag: "C · BOTTOM", name: "Bearings",    x: 3.4,  y: 6.0,  align: "left"  }, // below left truck
      { tag: "D · ROLL",   name: "Wheels",      x: 8.0,  y: 6.0,  align: "left"  }, // below right truck
    ];
    labels.forEach(({ tag, name, x, y, align }) => {
      s.addText(tag, {
        x, y, w: 2.5, h: 0.32,
        fontSize: 12, fontFace: FONT_BODY, bold: true,
        color: COLOR.orange, charSpacing: 4, align, margin: 0,
      });
      s.addText(name, {
        x, y: y + 0.36, w: 2.5, h: 0.4,
        fontSize: 18, fontFace: FONT_BODY,
        color: COLOR.textDk, align, margin: 0,
      });
    });

    addFooter(s, "03");
  }

  // =========================================================
  // SLIDE 4 — Gear & Safety (light, 5-card row + orange rule banner)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };
    addEyebrow(s, "04", "GEAR AND SAFETY");

    s.addText("Wear the gear. Every time.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.2,
      fontSize: 50, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
    });

    // 5 cards
    const items = [
      { num: "01", name: "Helmet",      icon: iconHelmet, body: "Non-negotiable. Snug, level, strapped." },
      { num: "02", name: "Knee pads",   icon: iconKnee,   body: "Let you slide out of falls instead of catching them." },
      { num: "03", name: "Elbow pads",  icon: iconElbow,  body: "Save the joints that take the brunt of side falls." },
      { num: "04", name: "Wrist guards",icon: iconWrist,  body: "The most-broken bone in skating. Protect them." },
      { num: "05", name: "Flat shoes",  icon: iconShoe,   body: "Flat soles grip the board. No running shoes." },
    ];
    const cardY = 2.55, cardH = 3.3;
    const cardCount = items.length;
    const totalW = W - 1.2;
    const gap = 0.18;
    const cardW = (totalW - gap * (cardCount - 1)) / cardCount;
    items.forEach((it, i) => {
      const x = 0.6 + i * (cardW + gap);
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardY, w: cardW, h: cardH,
        fill: { color: COLOR.paper }, line: { color: COLOR.line, width: 0.75 },
      });
      // number top-left
      s.addText(it.num, {
        x: x + 0.25, y: cardY + 0.2, w: 1.2, h: 0.35,
        fontSize: 13, fontFace: FONT_HEAD, bold: true,
        color: COLOR.orange, charSpacing: 3, margin: 0,
      });
      // icon
      const iconSize = 1.0;
      s.addImage({
        data: it.icon,
        x: x + (cardW - iconSize) / 2, y: cardY + 0.7, w: iconSize, h: iconSize,
      });
      // name
      s.addText(it.name, {
        x: x + 0.25, y: cardY + 1.95, w: cardW - 0.5, h: 0.4,
        fontSize: 16, fontFace: FONT_HEAD, bold: true,
        color: COLOR.textDk, margin: 0,
      });
      // body
      s.addText(it.body, {
        x: x + 0.25, y: cardY + 2.4, w: cardW - 0.4, h: 0.7,
        fontSize: 11, fontFace: FONT_BODY,
        color: COLOR.textDk, margin: 0, lineSpacingMultiple: 1.25,
      });
    });

    // Orange rule banner
    const bannerY = cardY + cardH + 0.25;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y: bannerY, w: W - 1.2, h: 0.55,
      fill: { color: COLOR.orange }, line: { color: COLOR.orange, width: 0 },
    });
    s.addText("Rule one — if you wouldn't fall on it, don't skate on it.", {
      x: 0.85, y: bannerY, w: W - 1.7, h: 0.55,
      fontSize: 15, fontFace: FONT_BODY,
      color: COLOR.cream, valign: "middle", margin: 0,
    });

    addFooter(s, "04");
  }

  // =========================================================
  // SLIDE 5 — Finding your stance (split light/dark cards)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };
    addEyebrow(s, "05", "FINDING YOUR STANCE");

    s.addText("Which foot leads?", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.4,
      fontSize: 60, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
    });

    const cardY = 2.55, cardH = 3.4;
    const cardW = (W - 1.2 - 0.25) / 2;
    const leftX = 0.6, rightX = leftX + cardW + 0.25;

    // OPTION A — Regular (light card)
    s.addShape(pres.shapes.RECTANGLE, {
      x: leftX, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR.paper }, line: { color: COLOR.line, width: 0.75 },
    });
    s.addText("OPTION A", {
      x: leftX + 0.4, y: cardY + 0.3, w: 3, h: 0.32,
      fontSize: 12, fontFace: FONT_BODY, bold: true,
      color: COLOR.orange, charSpacing: 6, margin: 0,
    });
    s.addText("Regular.", {
      x: leftX + 0.4, y: cardY + 0.65, w: cardW - 0.8, h: 0.7,
      fontSize: 36, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, margin: 0,
    });
    s.addText("Left foot forward, right foot pushes. Most common — about two-thirds of skaters.", {
      x: leftX + 0.4, y: cardY + 1.4, w: cardW - 0.8, h: 0.85,
      fontSize: 14, fontFace: FONT_BODY,
      color: COLOR.textDk, margin: 0, lineSpacingMultiple: 1.3,
    });
    // Foot ovals (left, right) — dark on light
    const footOvalW = 0.7, footOvalH = 0.85;
    const footY = cardY + 2.25;
    const ovalGap = 0.7;
    const ovalsStartX = leftX + 0.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ovalsStartX, y: footY, w: footOvalW, h: footOvalH,
      fill: { color: COLOR.ink }, line: { color: COLOR.ink, width: 0 }, rectRadius: 0.35,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ovalsStartX + footOvalW + ovalGap, y: footY, w: footOvalW, h: footOvalH,
      fill: { color: COLOR.ink }, line: { color: COLOR.ink, width: 0 }, rectRadius: 0.35,
    });
    // Each label gets a 1.4"-wide box centered on its oval, with no overlap (since ovalGap = 0.7)
    const labelW = 1.4;
    const label1X = ovalsStartX + footOvalW/2 - labelW/2;
    const label2X = ovalsStartX + footOvalW + ovalGap + footOvalW/2 - labelW/2;
    s.addText("LEFT · FRONT", {
      x: label1X, y: footY + footOvalH + 0.12, w: labelW, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY,
      color: COLOR.mute, charSpacing: 2, align: "center", margin: 0,
    });
    s.addText("RIGHT · PUSH", {
      x: label2X, y: footY + footOvalH + 0.12, w: labelW, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY,
      color: COLOR.mute, charSpacing: 2, align: "center", margin: 0,
    });

    // OPTION B — Goofy (dark card)
    s.addShape(pres.shapes.RECTANGLE, {
      x: rightX, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR.ink }, line: { color: COLOR.ink, width: 0 },
    });
    s.addText("OPTION B", {
      x: rightX + 0.4, y: cardY + 0.3, w: 3, h: 0.32,
      fontSize: 12, fontFace: FONT_BODY, bold: true,
      color: COLOR.orange, charSpacing: 6, margin: 0,
    });
    s.addText("Goofy.", {
      x: rightX + 0.4, y: cardY + 0.65, w: cardW - 0.8, h: 0.7,
      fontSize: 36, fontFace: FONT_HEAD, bold: true,
      color: COLOR.cream, margin: 0,
    });
    s.addText("Right foot forward, left foot pushes. Just as valid — go with whatever feels natural.", {
      x: rightX + 0.4, y: cardY + 1.4, w: cardW - 0.8, h: 0.85,
      fontSize: 14, fontFace: FONT_BODY,
      color: COLOR.cream, margin: 0, lineSpacingMultiple: 1.3,
    });
    const ovalsStartX2 = rightX + 0.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ovalsStartX2, y: footY, w: footOvalW, h: footOvalH,
      fill: { color: COLOR.cream }, line: { color: COLOR.cream, width: 0 }, rectRadius: 0.35,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: ovalsStartX2 + footOvalW + ovalGap, y: footY, w: footOvalW, h: footOvalH,
      fill: { color: COLOR.cream }, line: { color: COLOR.cream, width: 0 }, rectRadius: 0.35,
    });
    const label1X2 = ovalsStartX2 + footOvalW/2 - labelW/2;
    const label2X2 = ovalsStartX2 + footOvalW + ovalGap + footOvalW/2 - labelW/2;
    s.addText("RIGHT · FRONT", {
      x: label1X2, y: footY + footOvalH + 0.12, w: labelW, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY,
      color: COLOR.mute, charSpacing: 2, align: "center", margin: 0,
    });
    s.addText("LEFT · PUSH", {
      x: label2X2, y: footY + footOvalH + 0.12, w: labelW, h: 0.3,
      fontSize: 9, fontFace: FONT_BODY,
      color: COLOR.mute, charSpacing: 2, align: "center", margin: 0,
    });

    // Quick test bar above footer
    const qtY = cardY + cardH + 0.25;
    s.addShape(pres.shapes.LINE, {
      x: 0.6, y: qtY, w: W - 1.2, h: 0,
      line: { color: COLOR.textDk, width: 1 },
    });
    s.addText(
      [
        { text: "Quick test — ", options: { bold: true, color: COLOR.textDk } },
        { text: "have a friend gently push you from behind. The foot you step forward with to catch yourself is your front foot.", options: { color: COLOR.textDk } },
      ],
      {
        x: 0.6, y: qtY + 0.1, w: W - 1.2, h: 0.4,
        fontSize: 13, fontFace: FONT_BODY, margin: 0,
      }
    );

    addFooter(s, "05");
  }

  // =========================================================
  // SLIDE 6 — First moves (light, 3 columns)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };
    addEyebrow(s, "06", "FIRST MOVES");

    s.addText("Stand. Push. Stop.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.3,
      fontSize: 60, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
    });

    const colTopY = 2.6;
    const colBotY = H - 0.85;
    const colH = colBotY - colTopY;
    const totalW = W - 1.2;
    const colW = totalW / 3;
    // Top divider
    s.addShape(pres.shapes.LINE, {
      x: 0.6, y: colTopY, w: totalW, h: 0,
      line: { color: COLOR.textDk, width: 1.25 },
    });
    // Vertical separators
    [1, 2].forEach((i) => {
      s.addShape(pres.shapes.LINE, {
        x: 0.6 + i * colW, y: colTopY, w: 0, h: colH,
        line: { color: COLOR.textDk, width: 1.25 },
      });
    });

    const moves = [
      ["01", "Stand", "Front foot over the front bolts, knees soft, eyes up — not down at the board.", "TIP / on grass first"],
      ["02", "Push",  "Drop your back foot to the ground, push the pavement, then return it onto the tail.", "TIP / small pushes, not kicks"],
      ["03", "Stop",  "Step off with your back foot and walk it out. Master this before going faster.", "TIP / always have an exit"],
    ];
    moves.forEach(([num, head, body, tip], i) => {
      const x = 0.6 + i * colW + 0.4;
      const innerW = colW - 0.6;
      s.addText(num, {
        x, y: colTopY + 0.3, w: innerW, h: 1.2,
        fontSize: 80, fontFace: FONT_HEAD, bold: true,
        color: COLOR.orange, valign: "top", margin: 0,
      });
      s.addText(head, {
        x, y: colTopY + 1.7, w: innerW, h: 0.5,
        fontSize: 22, fontFace: FONT_HEAD, bold: true,
        color: COLOR.textDk, margin: 0,
      });
      s.addText(body, {
        x, y: colTopY + 2.25, w: innerW, h: 1.4,
        fontSize: 13, fontFace: FONT_BODY,
        color: COLOR.textDk, margin: 0, lineSpacingMultiple: 1.3,
      });
      // tip rule + tip text near bottom of column
      s.addShape(pres.shapes.LINE, {
        x, y: colBotY - 0.65, w: innerW, h: 0,
        line: { color: COLOR.line, width: 0.75 },
      });
      s.addText(
        [
          { text: "TIP / ", options: { color: COLOR.orange, bold: true } },
          { text: tip.replace("TIP / ", ""), options: { color: COLOR.textDk } },
        ],
        {
          x, y: colBotY - 0.5, w: innerW, h: 0.35,
          fontSize: 12, fontFace: FONT_BODY, margin: 0,
        }
      );
    });

    addFooter(s, "06");
  }

  // =========================================================
  // SLIDE 7 — Falling safely (dark, DO / DON'T)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.ink };

    // eyebrow on dark
    s.addText(
      [
        { text: "07  ", options: { color: COLOR.mute, bold: true } },
        { text: "FALLING SAFELY", options: { color: COLOR.orange, bold: true } },
      ],
      {
        x: 0.6, y: 0.45, w: 10, h: 0.4,
        fontSize: 12, fontFace: FONT_BODY,
        charSpacing: 6, margin: 0,
      }
    );

    s.addText("You will fall. Fall well.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.5,
      fontSize: 64, fontFace: FONT_HEAD, bold: true,
      color: COLOR.cream, valign: "top", margin: 0,
    });

    const dos = [
      "Crouch low before you lose balance — less distance to the ground.",
      "Roll out of it. Shoulder, back, hip — spread the impact.",
      "Slide on your pads. That's literally what they're for.",
      "Tuck your chin and keep your hands loose.",
    ];
    const donts = [
      "Don't catch yourself with stiff, straight arms.",
      "Don't fight the fall once it's started — commit to the bail.",
      "Don't chase a runaway board into traffic. Let it go.",
      "Don't skate tired. Bad falls follow tired legs.",
    ];

    const colY = 3.05;
    const colW = (W - 1.2 - 0.6) / 2;
    const leftX = 0.6, rightX = leftX + colW + 0.6;

    const drawList = (x, headDo, headRest, items) => {
      // Header
      s.addText(
        [
          { text: headDo,    options: { color: COLOR.orange, bold: true } },
          { text: headRest,  options: { color: COLOR.cream,  bold: true } },
        ],
        {
          x, y: colY, w: colW, h: 0.65,
          fontSize: 28, fontFace: FONT_HEAD, margin: 0,
        }
      );
      // top rule
      s.addShape(pres.shapes.LINE, {
        x, y: colY + 0.85, w: colW, h: 0,
        line: { color: COLOR.lineDk, width: 0.75 },
      });
      const rowH = 0.7;
      items.forEach((txt, i) => {
        const ry = colY + 1.0 + i * rowH;
        s.addText(`0${i+1}`, {
          x, y: ry, w: 0.45, h: 0.4,
          fontSize: 12, fontFace: FONT_HEAD, bold: true,
          color: COLOR.orange, margin: 0, valign: "top",
        });
        s.addText(txt, {
          x: x + 0.55, y: ry, w: colW - 0.55, h: rowH,
          fontSize: 13, fontFace: FONT_BODY,
          color: COLOR.cream, margin: 0, valign: "top",
          lineSpacingMultiple: 1.3,
        });
        // hairline below each row
        s.addShape(pres.shapes.LINE, {
          x, y: ry + rowH - 0.05, w: colW, h: 0,
          line: { color: COLOR.lineDk, width: 0.5 },
        });
      });
    };

    drawList(leftX,  "DO",    " — these things", dos);
    drawList(rightX, "DON'T", " — avoid these",  donts);

    addFooter(s, "07", true);
  }

  // =========================================================
  // SLIDE 8 — Wrap up & next steps (light, checklist + KEEP ROLL.)
  // =========================================================
  {
    const s = pres.addSlide();
    s.background = { color: COLOR.cream };
    addEyebrow(s, "08", "WRAP UP & NEXT STEPS");

    s.addText("You're ready to roll.", {
      x: 0.6, y: 0.95, w: W - 1.2, h: 1.4,
      fontSize: 60, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, valign: "top", margin: 0,
    });

    // LEFT: checklist
    const checks = [
      "Know why we skate",
      "Know the parts of the board",
      "Geared up and protected",
      "Found your stance",
      "Stand · push · stop",
      "Falling without fear",
    ];
    const listX = 0.6, listTopY = 3.3;
    const rowH = 0.55;
    const listW = 6.7;
    checks.forEach((label, i) => {
      const ry = listTopY + i * rowH;
      // orange square checkbox
      s.addShape(pres.shapes.RECTANGLE, {
        x: listX, y: ry + 0.07, w: 0.28, h: 0.28,
        fill: { color: COLOR.orange }, line: { color: COLOR.orange, width: 0 },
      });
      s.addText(label, {
        x: listX + 0.55, y: ry, w: listW - 0.6, h: 0.45,
        fontSize: 16, fontFace: FONT_BODY,
        color: COLOR.textDk, valign: "top", margin: 0,
      });
      // hairline below
      s.addShape(pres.shapes.LINE, {
        x: listX, y: ry + rowH - 0.05, w: listW, h: 0,
        line: { color: COLOR.line, width: 0.75 },
      });
    });

    // Vertical divider between left & right
    const dividerX = 7.7;
    const dividerYTop = 3.05;
    const dividerYBot = H - 0.7;
    s.addShape(pres.shapes.LINE, {
      x: dividerX, y: dividerYTop, w: 0, h: dividerYBot - dividerYTop,
      line: { color: COLOR.textDk, width: 1.0 },
    });

    // RIGHT: Next session block
    const rX = 8.0;
    s.addText("Next session", {
      x: rX, y: 3.05, w: 4.8, h: 0.5,
      fontSize: 22, fontFace: FONT_HEAD, bold: true,
      color: COLOR.textDk, margin: 0,
    });
    s.addText("Turning, carving, and your first kick-turn on a flat surface. Bring everything you brought today.", {
      x: rX, y: 3.6, w: 4.8, h: 1.0,
      fontSize: 13, fontFace: FONT_BODY,
      color: COLOR.textDk, margin: 0, lineSpacingMultiple: 1.3,
    });

    // Orange CTA pill
    s.addShape(pres.shapes.RECTANGLE, {
      x: rX, y: 4.7, w: 4.0, h: 0.6,
      fill: { color: COLOR.orange }, line: { color: COLOR.orange, width: 0 },
    });
    s.addText("See you at the park →", {
      x: rX, y: 4.7, w: 4.0, h: 0.6,
      fontSize: 16, fontFace: FONT_BODY,
      color: COLOR.cream, align: "center", valign: "middle", margin: 0,
    });

    // KEEP ROLL. — orange period as text run so it aligns with the actual character
    s.addText(
      [
        { text: "KEEP", options: { color: COLOR.textDk, breakLine: true } },
        { text: "ROLL", options: { color: COLOR.textDk } },
        { text: ".",    options: { color: COLOR.orange } },
      ],
      {
        x: rX, y: 5.25, w: 4.8, h: 1.55,
        fontSize: 44, fontFace: FONT_HEAD, bold: true,
        valign: "top", margin: 0,
        lineSpacingMultiple: 0.95,
      }
    );

    addFooter(s, "08");
  }

  // ---------- Save ----------
  const outFile = "Skateboarding_101.pptx";
  await pres.writeFile({ fileName: outFile });
  console.log("Wrote", outFile);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
