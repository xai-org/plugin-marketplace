const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fs = require("fs");
const {
  FaClipboardList, FaHeart, FaBrain, FaUsers, FaBed, FaHandHoldingHeart,
  FaCheckCircle, FaCalendarAlt, FaQuestionCircle, FaLock, FaLightbulb,
  FaArrowRight, FaThumbsUp, FaComments, FaShieldAlt, FaInfoCircle,
  FaRegSmile, FaRegFrown, FaStar, FaBolt
} = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Lifcheck Allergy & Immunology Clinic";
  pres.title = "PROMIS-57 Questionnaire – Patient Guide";

  // Color palette from template: purple/violet theme
  const C = {
    deepPurple: "5B2D8E",
    purple: "7B3FA0",
    medPurple: "9B59B6",
    lightPurple: "C39BD3",
    palePurple: "E8D5F5",
    veryPale: "F4ECF9",
    white: "FFFFFF",
    dark: "2D1B4E",
    text: "3A2060",
    bodyText: "4A3570",
    muted: "7D6A9B",
    accent: "A855F7",
  };

  const logoPath = "/home/assets/logo_transparent.png";
  const logoPathWhiteBg = "/home/assets/logo.png";
  const fontHead = "Questrial";
  const fontBody = "Questrial";

  // Helper: factory functions for shadows (avoid reuse mutation)
  const cardShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08 });
  const softShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.10 });

  // Pre-render icons
  const icons = {};
  const iconMap = {
    clipboard: [FaClipboardList, "#" + C.white],
    heart: [FaHeart, "#" + C.white],
    brain: [FaBrain, "#" + C.white],
    users: [FaUsers, "#" + C.white],
    bed: [FaBed, "#" + C.white],
    handHeart: [FaHandHoldingHeart, "#" + C.white],
    check: [FaCheckCircle, "#" + C.white],
    calendar: [FaCalendarAlt, "#" + C.white],
    question: [FaQuestionCircle, "#" + C.white],
    lock: [FaLock, "#" + C.white],
    lightbulb: [FaLightbulb, "#" + C.white],
    arrow: [FaArrowRight, "#" + C.white],
    thumbsUp: [FaThumbsUp, "#" + C.white],
    comments: [FaComments, "#" + C.white],
    shield: [FaShieldAlt, "#" + C.white],
    info: [FaInfoCircle, "#" + C.white],
    smile: [FaRegSmile, "#" + C.white],
    frown: [FaRegFrown, "#" + C.white],
    smilePurple: [FaRegSmile, "#" + C.purple],
    frownPurple: [FaRegFrown, "#" + C.purple],
    star: [FaStar, "#" + C.white],
    bolt: [FaBolt, "#" + C.white],
    // Purple-on-white variants
    checkPurple: [FaCheckCircle, "#" + C.purple],
    starPurple: [FaStar, "#" + C.purple],
    heartPurple: [FaHeart, "#" + C.purple],
    arrowPurple: [FaArrowRight, "#" + C.purple],
  };

  for (const [key, [Comp, color]] of Object.entries(iconMap)) {
    icons[key] = await iconToBase64Png(Comp, color, 256);
  }

  // ===========================
  // HELPER: Add logo to bottom-right of light slides
  // ===========================
  // Logo removed from bottom-right per request

  // HELPER: icon in colored circle
  function addIconCircle(slide, iconData, x, y, size = 0.55, bgColor = C.purple) {
    slide.addShape(pres.shapes.OVAL, {
      x: x, y: y, w: size, h: size,
      fill: { color: bgColor },
      shadow: cardShadow(),
    });
    const pad = size * 0.2;
    slide.addImage({ data: iconData, x: x + pad, y: y + pad, w: size - pad * 2, h: size - pad * 2 });
  }

  // ===========================
  // SLIDE 1: TITLE SLIDE
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.deepPurple };
    // Decorative shape - large translucent circle
    s.addShape(pres.shapes.OVAL, { x: 6.5, y: -1.5, w: 5.5, h: 5.5, fill: { color: C.purple, transparency: 60 } });
    s.addShape(pres.shapes.OVAL, { x: 7.5, y: 2.5, w: 4, h: 4, fill: { color: C.medPurple, transparency: 70 } });
    // Logo with white circle background - left edge aligned with content at x=0.7
    s.addShape(pres.shapes.OVAL, { x: 0.7, y: 0.3, w: 1.3, h: 1.3, fill: { color: C.white } });
    s.addImage({ path: logoPath, x: 0.85, y: 0.4, w: 1.0, h: 1.0 * (1854 / 2027) });
    // Institution name
    s.addText("LIFCHECK ALLERGY & IMMUNOLOGY CLINIC", {
      x: 0.7, y: 1.7, w: 7, h: 0.4, fontSize: 11, fontFace: fontBody,
      color: C.lightPurple, charSpacing: 3, bold: true, margin: 0,
    });
    // Title
    s.addText("Understanding Your\nPROMIS-57 Questionnaire", {
      x: 0.7, y: 2.2, w: 7.5, h: 1.6, fontSize: 36, fontFace: fontHead,
      color: C.white, bold: true, lineSpacingMultiple: 1.1, margin: 0,
    });
    // Subtitle
    s.addText("A brief guide to help you complete the questionnaire\nwith comfort and confidence", {
      x: 0.7, y: 3.9, w: 6, h: 0.8, fontSize: 15, fontFace: fontBody,
      color: C.palePurple, lineSpacingMultiple: 1.3, margin: 0,
    });
  }

  // ===========================
  // SLIDE 2: WHY YOU'RE SEEING THIS
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    // Top bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Why You're Seeing This?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.51, w: 8.6, h: 3.5, fill: { color: C.veryPale },
      shadow: cardShadow(),
    });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.51, w: 0.06, h: 3.5, fill: { color: C.purple } });

    addIconCircle(s, icons.comments, 1.1, 1.81);

    s.addText("As part of our research study, we would like you to complete a short questionnaire called the PROMIS-57.", {
      x: 1.9, y: 1.71, w: 7, h: 0.7, fontSize: 13.5, fontFace: fontBody, color: C.text, lineSpacingMultiple: 1.4, margin: 0,
    });

    s.addText("This presentation will take just a few minutes. It explains what the questionnaire is about, why your answers matter, and how to fill it out. By the end, you'll feel prepared and confident.", {
      x: 1.9, y: 2.51, w: 7, h: 1.0, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });

    s.addText("There are no right or wrong answers - we simply want to understand your experience in your own words.", {
      x: 1.9, y: 3.71, w: 7, h: 0.7, fontSize: 13.5, fontFace: fontBody, color: C.purple, bold: true, lineSpacingMultiple: 1.4, margin: 0,
    });
  }

  // ===========================
  // SLIDE 3: WHAT IS PROMIS-57?
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("What Is the PROMIS-57?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("PROMIS stands for Patient-Reported Outcomes Measurement Information System. It was developed by the National Institutes of Health (NIH) to measure what matters most - how you feel and how well you can do the things that are important to you.", {
      x: 0.7, y: 1.2, w: 8.6, h: 1.0, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Key point card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.5, w: 8.6, h: 2.4, fill: { color: C.veryPale },
      shadow: cardShadow(),
    });

    addIconCircle(s, icons.clipboard, 1.1, 2.7);

    s.addText("The questionnaire contains 57 questions.", {
      x: 1.9, y: 2.7, w: 7, h: 0.55, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });

    s.addText("Each question asks you to choose from a set of response options that best describes your experience. Most people finish in about 10 to 15 minutes. You do not need to study or prepare - just answer honestly based on how things have been for you recently.", {
      x: 1.9, y: 3.2, w: 7, h: 1.3, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });
  }

  // ===========================
  // SLIDE 4: WHAT DOES IT MEASURE? (overview)
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("What Does It Measure?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("The PROMIS-57 covers seven areas of your health and well-being. These help us see the full picture of how you are doing - not just physically, but emotionally and socially as well.", {
      x: 0.7, y: 1.15, w: 8.6, h: 0.8, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // 7 domain cards in a grid: 4 top row, 3 bottom row
    const domains = [
      { icon: "heart", label: "Physical\nFunction", color: C.deepPurple },
      { icon: "brain", label: "Anxiety", color: C.purple },
      { icon: "bolt", label: "Depression", color: C.medPurple },
      { icon: "bed", label: "Fatigue", color: C.deepPurple },
      { icon: "star", label: "Sleep\nDisturbance", color: C.purple },
      { icon: "users", label: "Social\nRoles", color: C.medPurple },
      { icon: "handHeart", label: "Pain\nInterference", color: C.deepPurple },
    ];

    const startY = 2.1;
    const cardW = 1.8;
    const cardH = 1.35;
    const gapX = 0.25;
    // Top row: 4 cards
    const topStartX = (10 - (4 * cardW + 3 * gapX)) / 2;
    for (let i = 0; i < 4; i++) {
      const d = domains[i];
      const cx = topStartX + i * (cardW + gapX);
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: startY, w: cardW, h: cardH, fill: { color: C.veryPale }, shadow: cardShadow(),
      });
      addIconCircle(s, icons[d.icon], cx + (cardW - 0.45) / 2, startY + 0.2, 0.45, d.color);
      s.addText(d.label, {
        x: cx, y: startY + 0.72, w: cardW, h: 0.5, fontSize: 11, fontFace: fontBody,
        color: C.text, align: "center", valign: "top", lineSpacingMultiple: 1.2, margin: 0,
      });
    }
    // Bottom row: 3 cards centered
    const botStartX = (10 - (3 * cardW + 2 * gapX)) / 2;
    const botY = startY + cardH + 0.25;
    for (let i = 0; i < 3; i++) {
      const d = domains[4 + i];
      const cx = botStartX + i * (cardW + gapX);
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: botY, w: cardW, h: cardH, fill: { color: C.veryPale }, shadow: cardShadow(),
      });
      addIconCircle(s, icons[d.icon], cx + (cardW - 0.45) / 2, botY + 0.2, 0.45, d.color);
      s.addText(d.label, {
        x: cx, y: botY + 0.72, w: cardW, h: 0.5, fontSize: 11, fontFace: fontBody,
        color: C.text, align: "center", valign: "top", lineSpacingMultiple: 1.2, margin: 0,
      });
    }
  }

  // ===========================
  // SLIDE 5: WHY THIS MATTERS
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Why Your Answers Matter?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    const reasons = [
      { icon: "info", title: "PLACEHOLDER", desc: "Your responses provide valuable insight into the real experiences of patients - something that clinical tests alone cannot capture." },
      { icon: "shield", title: "They contribute to better care for future patients", desc: "By sharing your experience, you help build knowledge that may improve treatments and support for others facing similar challenges." },
      { icon: "smile", title: "They give you a voice in the research process", desc: "This questionnaire is your opportunity to share how you truly feel. Your perspective is an essential part of this study." },
    ];

    let yPos = 1.5;
    for (const r of reasons) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: yPos, w: 8.6, h: 1.1, fill: { color: C.veryPale }, shadow: cardShadow(),
      });
      addIconCircle(s, icons[r.icon], 1.0, yPos + 0.3, 0.5);
      s.addText(r.title, {
        x: 1.75, y: yPos + 0.12, w: 7.2, h: 0.35, fontSize: 14, fontFace: fontBody, color: C.deepPurple, bold: true, margin: 0,
      });
      s.addText(r.desc, {
        x: 1.75, y: yPos + 0.5, w: 7.2, h: 0.5, fontSize: 12, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
      });
      yPos += 1.25;
    }
  }

  // ===========================
  // SLIDE 7: USING THE RESPONSE OPTIONS
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Using the Response Options", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Each question gives you a set of options to choose from, typically on a five-point scale. Here is an example of what that might look like:", {
      x: 0.7, y: 1.15, w: 8.6, h: 0.7, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Example scale visual
    const scaleLabels = ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"];
    const scaleStartX = 0.9;
    const scaleW = 1.6;
    const scaleY = 2.1;
    for (let i = 0; i < 5; i++) {
      const isHighlight = i === 2;
      s.addShape(pres.shapes.OVAL, {
        x: scaleStartX + i * scaleW + 0.55, y: scaleY, w: 0.4, h: 0.4,
        fill: { color: isHighlight ? C.purple : C.palePurple },
        line: { color: C.purple, width: 1.5 },
      });
      s.addText(scaleLabels[i], {
        x: scaleStartX + i * scaleW, y: scaleY + 0.5, w: 1.5, h: 0.5, fontSize: 11, fontFace: fontBody,
        color: isHighlight ? C.deepPurple : C.muted, align: "center", bold: isHighlight, margin: 0,
      });
    }

    // Tips below
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.2, w: 8.6, h: 1.85, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    addIconCircle(s, icons.lightbulb, 1.0, 3.45, 0.5);
    s.addText("Tips for Choosing Your Answer", {
      x: 1.75, y: 3.5, w: 7, h: 0.4, fontSize: 14, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText([
      { text: "Read all the options before selecting one.", options: { bullet: { indent: 14 }, indentLevel: 0, breakLine: true, fontSize: 12.5, color: C.bodyText } },
      { text: "Pick the option that feels closest to your experience - it doesn't have to be perfect.", options: { bullet: { indent: 14 }, indentLevel: 0, breakLine: true, fontSize: 12.5, color: C.bodyText } },
      { text: "Don't overthink it - your first impression is usually the best answer.", options: { bullet: { indent: 14 }, indentLevel: 0, fontSize: 12.5, color: C.bodyText } },
    ], {
      x: 1.75, y: 3.85, w: 7.2, h: 1.2, fontFace: fontBody, paraSpaceAfter: 6, margin: 0,
    });
  }

  // ===========================
  // SLIDE 8: EXAMPLE QUESTIONS – Part 1
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Example Questions from the PROMIS-57", {
      x: 0.7, y: 0.4, w: 8.6, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Here are a few real questions from the questionnaire, so you know what to expect.", {
      x: 0.7, y: 1.05, w: 8.6, h: 0.4, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, margin: 0,
    });

    // Example 1: Physical Function
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.55, w: 8.6, h: 1.65, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    // Domain label
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.55, w: 0.06, h: 1.65, fill: { color: C.deepPurple } });
    s.addText("Physical Function", {
      x: 1.05, y: 1.62, w: 2.5, h: 0.3, fontSize: 11, fontFace: fontBody, color: C.purple, bold: true, charSpacing: 1.5, margin: 0,
    });
    s.addText("\"Are you able to go for a walk of at least 15 minutes?\"", {
      x: 1.05, y: 1.95, w: 8, h: 0.35, fontSize: 14, fontFace: fontBody, color: C.text, italic: true, margin: 0,
    });
    // Response scale
    const pf_labels = ["Without any\ndifficulty", "With a little\ndifficulty", "With some\ndifficulty", "With much\ndifficulty", "Unable\nto do"];
    for (let i = 0; i < 5; i++) {
      const cx = 1.2 + i * 1.6;
      const isSelected = i === 1;
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: 2.4, w: 0.3, h: 0.3,
        fill: { color: isSelected ? C.purple : C.white },
        line: { color: C.purple, width: 1 },
      });
      s.addText(pf_labels[i], {
        x: cx - 0.1, y: 2.73, w: 1.2, h: 0.42, fontSize: 9, fontFace: fontBody,
        color: isSelected ? C.deepPurple : C.muted, align: "center", bold: isSelected, lineSpacingMultiple: 1.1, margin: 0,
      });
    }

    // Example 2: Anxiety
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.4, w: 8.6, h: 1.55, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.4, w: 0.06, h: 1.55, fill: { color: C.medPurple } });
    s.addText("Anxiety", {
      x: 1.05, y: 3.47, w: 2.5, h: 0.3, fontSize: 11, fontFace: fontBody, color: C.purple, bold: true, charSpacing: 1.5, margin: 0,
    });
    s.addText("\"In the past 7 days... I felt anxious.\"", {
      x: 1.05, y: 3.8, w: 8, h: 0.35, fontSize: 14, fontFace: fontBody, color: C.text, italic: true, margin: 0,
    });
    const anx_labels = ["Never", "Rarely", "Sometimes", "Often", "Always"];
    for (let i = 0; i < 5; i++) {
      const cx = 1.2 + i * 1.6;
      const isSelected = i === 2;
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: 4.2, w: 0.3, h: 0.3,
        fill: { color: isSelected ? C.purple : C.white },
        line: { color: C.purple, width: 1 },
      });
      s.addText(anx_labels[i], {
        x: cx - 0.1, y: 4.53, w: 1.2, h: 0.3, fontSize: 10, fontFace: fontBody,
        color: isSelected ? C.deepPurple : C.muted, align: "center", bold: isSelected, margin: 0,
      });
    }
  }

  // ===========================
  // SLIDE 9: EXAMPLE QUESTIONS – Part 2
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("More Example Questions", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Notice how different domains use different response scales. Just read each question carefully.", {
      x: 0.7, y: 1.05, w: 8.6, h: 0.4, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, margin: 0,
    });

    // Example 3: Fatigue
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.55, w: 8.6, h: 1.55, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.55, w: 0.06, h: 1.55, fill: { color: C.deepPurple } });
    s.addText("Fatigue", {
      x: 1.05, y: 1.62, w: 2.5, h: 0.3, fontSize: 11, fontFace: fontBody, color: C.purple, bold: true, charSpacing: 1.5, margin: 0,
    });
    s.addText("\"In the past 7 days... How fatigued were you on average?\"", {
      x: 1.05, y: 1.95, w: 8, h: 0.35, fontSize: 14, fontFace: fontBody, color: C.text, italic: true, margin: 0,
    });
    const fat_labels = ["Not at all", "A little bit", "Somewhat", "Quite a bit", "Very much"];
    for (let i = 0; i < 5; i++) {
      const cx = 1.2 + i * 1.6;
      const isSelected = i === 3;
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: 2.4, w: 0.3, h: 0.3,
        fill: { color: isSelected ? C.purple : C.white },
        line: { color: C.purple, width: 1 },
      });
      s.addText(fat_labels[i], {
        x: cx - 0.1, y: 2.73, w: 1.2, h: 0.3, fontSize: 10, fontFace: fontBody,
        color: isSelected ? C.deepPurple : C.muted, align: "center", bold: isSelected, margin: 0,
      });
    }

    // Example 4: Sleep Disturbance
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.3, w: 8.6, h: 1.55, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.3, w: 0.06, h: 1.55, fill: { color: C.medPurple } });
    s.addText("Sleep Disturbance", {
      x: 1.05, y: 3.37, w: 2.5, h: 0.3, fontSize: 11, fontFace: fontBody, color: C.purple, bold: true, charSpacing: 1.5, margin: 0,
    });
    s.addText("\"In the past 7 days... My sleep quality was...\"", {
      x: 1.05, y: 3.7, w: 8, h: 0.35, fontSize: 14, fontFace: fontBody, color: C.text, italic: true, margin: 0,
    });
    const sleep_labels = ["Very poor", "Poor", "Fair", "Good", "Very good"];
    for (let i = 0; i < 5; i++) {
      const cx = 1.2 + i * 1.6;
      const isSelected = i === 2;
      s.addShape(pres.shapes.OVAL, {
        x: cx + 0.35, y: 4.15, w: 0.3, h: 0.3,
        fill: { color: isSelected ? C.purple : C.white },
        line: { color: C.purple, width: 1 },
      });
      s.addText(sleep_labels[i], {
        x: cx - 0.1, y: 4.48, w: 1.2, h: 0.3, fontSize: 10, fontFace: fontBody,
        color: isSelected ? C.deepPurple : C.muted, align: "center", bold: isSelected, margin: 0,
      });
    }
  }

  // ===========================
  // SLIDE 10: THE RECALL PERIOD / TIMEFRAME
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });

    s.addText("Thinking About the Timeframe", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Many questions ask about the past 7 days. Some may ask about a different period. Always check the timeframe stated in the question.", {
      x: 0.7, y: 1.41, w: 8.6, h: 0.8, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Left card: "In the past 7 days..."
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.46, w: 4, h: 2.5, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    addIconCircle(s, icons.calendar, 1.4, 2.69, 0.5);
    s.addText("\"In the past 7 days...\"", {
      x: 2.1, y: 2.69, w: 2.6, h: 0.5, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, italic: true, valign: "middle", margin: 0,
    });
    s.addText("Think about the last week as a whole. Try to consider your overall experience across those days, not just a single good or bad day.", {
      x: 1.0, y: 3.21, w: 3.4, h: 1.5, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, align: "center", margin: 0,
    });

    // Right card: Helpful Reminder
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y: 2.46, w: 4.2, h: 2.5, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    addIconCircle(s, icons.lightbulb, 6.0, 2.69, 0.5);
    s.addText("Helpful Reminder", {
      x: 6.7, y: 2.69, w: 2.6, h: 0.5, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText("If the question asks about \"today,\" answer based on how you are feeling right now. If it says \"in general,\" think about your typical experience over a longer period.", {
      x: 5.4, y: 3.21, w: 3.6, h: 1.5, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, align: "center", margin: 0,
    });
  }

  // ===========================
  // SLIDE 9: WHEN SYMPTOMS VARY
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("When Symptoms Vary Day to Day", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("It's very common for symptoms like pain, fatigue, or mood to change from one day to the next. That's completely normal, and the questionnaire is designed with this in mind.", {
      x: 0.7, y: 1.15, w: 8.6, h: 0.8, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Big card with advice
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.2, w: 8.6, h: 2.9, fill: { color: C.veryPale }, shadow: cardShadow(),
    });

    s.addText("What should you do?", {
      x: 1.1, y: 2.4, w: 4, h: 0.4, fontSize: 16, fontFace: fontBody, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Think about your average or overall experience during the timeframe the question refers to. You don't need to recall every single day in detail.", {
      x: 1.1, y: 2.9, w: 8, h: 0.6, fontSize: 13, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });

    // Two mini columns
    // Left: Good days
    s.addShape(pres.shapes.RECTANGLE, { x: 1.1, y: 3.7, w: 3.7, h: 1.1, fill: { color: C.white }, shadow: cardShadow() });
    addIconCircle(s, icons.smile, 1.3, 4.07, 0.35, C.purple);
    s.addText("If you had mostly good days, lean toward a response that reflects that.", {
      x: 1.8, y: 3.7, w: 2.8, h: 1.1, fontSize: 12, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, valign: "middle", margin: 0,
    });

    // Right: Bad days
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.7, w: 3.7, h: 1.1, fill: { color: C.white }, shadow: cardShadow() });
    addIconCircle(s, icons.frown, 5.4, 4.07, 0.35, C.medPurple);
    s.addText("If difficult days were more common, choose an option that captures that overall pattern.", {
      x: 5.9, y: 3.7, w: 2.8, h: 1.1, fontSize: 12, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, valign: "middle", margin: 0,
    });
  }

  // ===========================
  // SLIDE 10: UNSURE BETWEEN TWO CHOICES
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });

    s.addText("Unsure Between Two Choices?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Sometimes two response options might seem equally fitting. This happens to many people, and it's perfectly okay.", {
      x: 0.7, y: 1.43, w: 8.6, h: 0.6, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Card with guidance
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.44, w: 8.6, h: 2.51, fill: { color: C.veryPale }, shadow: cardShadow(),
    });

    addIconCircle(s, icons.question, 1.1, 2.71, 0.5);
    s.addText("Here's what to do:", {
      x: 1.85, y: 2.71, w: 5, h: 0.5, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });

    const tips = [
      "Go with the option that feels most true overall - trust your first instinct.",
      "You don't need to analyze or justify your choice. Either option in a close call is a good answer.",
      "There is no penalty for picking one over the other. What matters is that your answer reflects your honest sense of how things have been.",
    ];

    s.addImage({ data: icons.checkPurple, x: 1.85, y: 3.28, w: 0.18, h: 0.18 });
    s.addText(tips[0], {
      x: 2.15, y: 3.08, w: 6.75, h: 0.55, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });

    s.addImage({ data: icons.checkPurple, x: 1.85, y: 3.57, w: 0.18, h: 0.18 });
    s.addText(tips[1], {
      x: 2.15, y: 3.51, w: 6.75, h: 0.55, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });

    s.addImage({ data: icons.checkPurple, x: 1.85, y: 4.18, w: 0.18, h: 0.18 });
    s.addText(tips[2], {
      x: 2.15, y: 4.11, w: 6.75, h: 0.55, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });
  }

  // ===========================
  // SLIDE 11: PERSONAL OR SENSITIVE QUESTIONS
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Questions That Feel Personal", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addText("Some questions may touch on topics like mood, sleep, or how your health affects your relationships. It's natural if certain questions feel personal or uncomfortable.", {
      x: 0.7, y: 1.15, w: 8.6, h: 0.7, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    // Two side-by-side cards
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 2.15, w: 4.1, h: 2.6, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    // Left box center = 0.7 + 4.1/2 = 2.75
    addIconCircle(s, icons.lock, 1.2, 2.35, 0.5);
    s.addText("Your Privacy Is Protected", {
      x: 1.9, y: 2.35, w: 2.6, h: 0.5, fontSize: 14, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText("Your responses are confidential and used only for research purposes. They are not shared with anyone outside the research team, and they will not affect your medical care in any way.", {
      x: 1.05, y: 2.9, w: 3.4, h: 1.6, fontSize: 12, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, align: "center", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: 2.15, w: 4.1, h: 2.6, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    // Right box center = 5.2 + 4.1/2 = 7.25
    addIconCircle(s, icons.handHeart, 5.7, 2.35, 0.5);
    s.addText("Why These Questions Help", {
      x: 6.4, y: 2.35, w: 2.6, h: 0.5, fontSize: 14, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText("These questions are included because emotional and social well-being are important parts of overall health. Answering them honestly helps the research team understand the full picture of your experience.", {
      x: 5.55, y: 2.9, w: 3.4, h: 1.6, fontSize: 12, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, align: "center", margin: 0,
    });
  }

  // ===========================
  // SLIDE 12: NO RIGHT OR WRONG ANSWERS
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.deepPurple };
    s.addShape(pres.shapes.OVAL, { x: 7, y: -1, w: 5, h: 5, fill: { color: C.purple, transparency: 65 } });

    addIconCircle(s, icons.check, 0.7, 1.0, 0.7, C.medPurple);

    s.addText("There Are No Right\nor Wrong Answers", {
      x: 0.7, y: 1.9, w: 8, h: 1.0, fontSize: 32, fontFace: fontHead, color: C.white, bold: true, lineSpacingMultiple: 1.1, margin: 0,
    });

    s.addText("Every person's experience is different. The questionnaire is designed to capture your unique perspective. Whatever you feel is the right answer for you is the correct one.", {
      x: 0.7, y: 3.1, w: 7, h: 1.0, fontSize: 15, fontFace: fontBody, color: C.palePurple, lineSpacingMultiple: 1.4, margin: 0,
    });
  }

  // ===========================
  // SLIDE 13: HONESTY IS THE MOST HELPFUL RESPONSE
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Honesty Is the Most Helpful Response", {
      x: 0.7, y: 0.4, w: 8.6, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.25, w: 8.6, h: 3.8, fill: { color: C.veryPale }, shadow: cardShadow(),
    });

    addIconCircle(s, icons.heart, 1.1, 1.45, 0.55);

    s.addText("We want to hear about your real experience.", {
      x: 1.9, y: 1.45, w: 7, h: 0.55, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });

    const honesty_points = [
      "You don't need to give the answers you think we're looking for - the most useful answer is the one that's true for you.",
      "If you're having a good week, it's okay to say so. If things have been difficult, that's important to share too.",
      "Don't worry about being consistent with past visits. Your answers should reflect how you feel now, not how you felt before.",
      "Try not to let what others might think influence your response. This is about your own experience.",
    ];

    let py = 2.15;
    for (const pt of honesty_points) {
      s.addImage({ data: icons.checkPurple, x: 1.9, y: py + 0.08, w: 0.21, h: 0.21 });
      s.addText(pt, {
        x: 2.25, y: py, w: 6.65, h: 0.6, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
      });
      py += 0.7;
    }
  }

  // ===========================
  // SLIDE 14: DON'T OVERTHINK IT
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Don't Overthink It", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.2, w: 8.6, h: 1.8, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    addIconCircle(s, icons.lightbulb, 1.1, 1.38, 0.55);

    s.addText("Your first response is usually the best one.", {
      x: 1.9, y: 1.38, w: 7, h: 0.55, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText("You don't need to spend a long time on any single question. Read it once, consider the options, and go with whatever feels right. If you catch yourself going back and forth, just pick the answer that seems closest and move on.", {
      x: 1.9, y: 1.93, w: 7, h: 0.9, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });

    // Bottom card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 3.3, w: 8.6, h: 1.8, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    addIconCircle(s, icons.thumbsUp, 1.1, 3.48, 0.55);

    s.addText("Please answer every question.", {
      x: 1.9, y: 3.48, w: 7, h: 0.55, fontSize: 15, fontFace: fontBody, color: C.deepPurple, bold: true, valign: "middle", margin: 0,
    });
    s.addText("Try not to skip any items, even if a question doesn't seem to apply perfectly. Choose the option that comes closest to your situation. Every answer - even an approximate one - is more useful than a blank response.", {
      x: 1.9, y: 4.03, w: 7, h: 0.9, fontSize: 12.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, margin: 0,
    });
  }

  // ===========================
  // SLIDE 17: QUICK REFERENCE – DO's & DON'Ts
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Quick Reference: Do's & Don'ts", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    // Left column: Do's
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.35, w: 4.4, h: 3.2, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    s.addText("Do", {
      x: 0.8, y: 1.5, w: 3, h: 0.35, fontSize: 16, fontFace: fontBody, color: C.deepPurple, bold: true, margin: 0,
    });

    const dos = [
      "Answer based on your own experience",
      "Think about the timeframe in each question",
      "Go with your first instinct",
      "Answer every question, even if unsure",
      "Be honest - no right or wrong answers",
      "Ask for help if a question is unclear",
    ];

    let dy = 1.95;
    for (const d of dos) {
      s.addImage({ data: icons.checkPurple, x: 0.8, y: dy + 0.07, w: 0.22, h: 0.22 });
      s.addText(d, {
        x: 1.15, y: dy, w: 3.5, h: 0.35, fontSize: 12, fontFace: fontBody, color: C.text, valign: "middle", margin: 0,
      });
      dy += 0.4;
    }

    // Right column: Don'ts
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y: 1.35, w: 4.4, h: 3.2, fill: { color: C.veryPale }, shadow: cardShadow(),
    });
    s.addText("Avoid", {
      x: 5.4, y: 1.5, w: 3, h: 0.35, fontSize: 16, fontFace: fontBody, color: "C0392B", bold: true, margin: 0,
    });

    const avoids = [
      "Trying to give the \"correct\" answer",
      "Spending too long on one question",
      "Skipping questions",
      "Answering based on how you should feel",
      "Worrying what the team might think",
    ];

    let ay = 1.95;
    for (const a of avoids) {
      s.addText("✕", {
        x: 5.3, y: ay, w: 0.35, h: 0.35, fontSize: 14, fontFace: fontBody, color: "C0392B", align: "center", valign: "middle", margin: 0,
      });
      s.addText(a, {
        x: 5.75, y: ay, w: 3.5, h: 0.35, fontSize: 12, fontFace: fontBody, color: C.text, valign: "middle", margin: 0,
      });
      ay += 0.4;
    }
  }

  // ===========================
  // SLIDE 17: NEED HELP?
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Need Help While Filling It Out?", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.41, w: 8.6, h: 3.6, fill: { color: C.veryPale }, shadow: cardShadow(),
    });

    s.addText("If at any point you feel confused about a question or are not sure what it's asking, please don't hesitate to let a member of the research team know. We are here to help.", {
      x: 1.1, y: 1.61, w: 7.8, h: 0.8, fontSize: 13.5, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.5, margin: 0,
    });

    const helps = [
      { icon: "question", text: "A team member can read a question aloud or clarify the wording if needed." },
      { icon: "shield", text: "We cannot suggest a specific answer, but we can make sure you understand what the question is asking." },
      { icon: "smile", text: "Take your time. There is no rush. Complete the questionnaire at a pace that feels comfortable for you." },
    ];

    let hy = 2.56;
    for (const h of helps) {
      addIconCircle(s, icons[h.icon], 1.1, hy, 0.45);
      s.addText(h.text, {
        x: 1.75, y: hy - 0.07, w: 7.2, h: 0.55, fontSize: 13, fontFace: fontBody, color: C.bodyText, lineSpacingMultiple: 1.4, valign: "middle", margin: 0,
      });
      hy += 0.8;
    }
  }

  // ===========================
  // SLIDE 18: SUMMARY – WHAT TO REMEMBER
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.white };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.purple } });
    // logo removed

    s.addText("Before You Begin - Remember:", {
      x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, fontFace: fontHead, color: C.deepPurple, bold: true, margin: 0,
    });

    const summaryItems = [
      "There are no right or wrong answers.",
      "Your honest experience is what matters most.",
      "Think about the timeframe each question mentions.",
      "When symptoms vary, reflect on the overall pattern.",
      "If unsure between two choices, go with your gut.",
      "Answer every question - don't skip items.",
      "Your responses are confidential and will not affect your care.",
    ];

    let sy = 1.2;
    for (let i = 0; i < summaryItems.length; i++) {
      // Alternating subtle background
      const bgCol = i % 2 === 0 ? C.veryPale : C.white;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.7, y: sy, w: 8.6, h: 0.5, fill: { color: bgCol },
      });
      // Number text only
      s.addText(String(i + 1) + ".", {
        x: 0.9, y: sy + 0.02, w: 0.35, h: 0.45, fontSize: 15, fontFace: fontBody, color: C.purple, bold: true, valign: "middle", margin: 0,
      });
      s.addText(summaryItems[i], {
        x: 1.25, y: sy + 0.02, w: 7.75, h: 0.45, fontSize: 13.5, fontFace: fontBody, color: C.text, valign: "middle", margin: 0,
      });
      sy += 0.55;
    }
  }

  // ===========================
  // SLIDE 19: TRANSITION – READY TO BEGIN
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.deepPurple };
    s.addShape(pres.shapes.OVAL, { x: -1, y: 2, w: 5, h: 5, fill: { color: C.purple, transparency: 70 } });
    s.addShape(pres.shapes.OVAL, { x: 7.5, y: -1.5, w: 4.5, h: 4.5, fill: { color: C.medPurple, transparency: 75 } });

    addIconCircle(s, icons.arrow, 4.4, 1.4, 0.8, C.medPurple);

    s.addText("You're Ready to Begin", {
      x: 0.7, y: 2.4, w: 8.6, h: 0.7, fontSize: 34, fontFace: fontHead, color: C.white, bold: true, align: "center", margin: 0,
    });

    s.addText("Take your time, answer honestly, and remember - your experience matters. Thank you for being part of this study.", {
      x: 1.5, y: 3.3, w: 7, h: 0.8, fontSize: 15, fontFace: fontBody, color: C.palePurple, align: "center", lineSpacingMultiple: 1.4, margin: 0,
    });
  }

  // ===========================
  // SLIDE 20: CLOSING / THANK YOU
  // ===========================
  {
    let s = pres.addSlide();
    s.background = { color: C.deepPurple };
    s.addShape(pres.shapes.OVAL, { x: 6.5, y: -1.5, w: 5.5, h: 5.5, fill: { color: C.purple, transparency: 60 } });

    s.addShape(pres.shapes.OVAL, { x: 0.7, y: 0.35, w: 1.5, h: 1.5, fill: { color: C.white } });
    s.addImage({ path: logoPath, x: 0.85, y: 0.45, w: 1.2, h: 1.2 * (1854 / 2027) });

    s.addText("LIFCHECK ALLERGY & IMMUNOLOGY CLINIC", {
      x: 0.7, y: 1.9, w: 7, h: 0.4, fontSize: 11, fontFace: fontBody, color: C.lightPurple, charSpacing: 3, bold: true, margin: 0,
    });

    s.addText("Thank You for\nYour Participation", {
      x: 0.7, y: 2.4, w: 7, h: 1.2, fontSize: 34, fontFace: fontHead, color: C.white, bold: true, lineSpacingMultiple: 1.1, margin: 0,
    });

    s.addText("Your contributions help advance research that improves\npatient care for everyone.", {
      x: 0.7, y: 3.7, w: 7, h: 0.7, fontSize: 14, fontFace: fontBody, color: C.palePurple, lineSpacingMultiple: 1.3, margin: 0,
    });

    // Contact info
    s.addText("340 Wellness Boulevard, Suite 200, Austin, TX 78701  |  (512) 555-0147", {
      x: 0.7, y: 4.7, w: 8, h: 0.3, fontSize: 10, fontFace: fontBody, color: C.muted, margin: 0,
    });
  }

  await pres.writeFile({ fileName: "/home/assets/PROMIS57_Patient_Guide.pptx" });
  console.log("Presentation created successfully!");
}

main().catch(console.error);
