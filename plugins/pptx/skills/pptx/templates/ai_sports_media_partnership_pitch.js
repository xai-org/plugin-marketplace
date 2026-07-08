const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaRocket, FaBullseye, FaShieldAlt, FaCogs, FaChartLine,
  FaHandshake, FaNewspaper, FaCheckCircle, FaEnvelope, FaArrowRight,
  FaBolt, FaUsers, FaTrophy, FaLock, FaPlayCircle, FaGlobe,
  FaImage, FaStar, FaFlag, FaCrown
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

// Generate an abstract network/data graphic as PNG
async function generateAbstractGraphic() {
  const width = 500;
  const height = 600;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E8611A;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#F4935B;stop-opacity:0.3"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#1A2E4F;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#E8611A;stop-opacity:0.4"/>
      </linearGradient>
    </defs>
    <!-- Connection lines -->
    <line x1="150" y1="120" x2="350" y2="200" stroke="#E8611A" stroke-width="2" opacity="0.3"/>
    <line x1="350" y1="200" x2="250" y2="350" stroke="#E8611A" stroke-width="2" opacity="0.3"/>
    <line x1="250" y1="350" x2="100" y2="300" stroke="#E8611A" stroke-width="2" opacity="0.25"/>
    <line x1="100" y1="300" x2="150" y2="120" stroke="#F4935B" stroke-width="1.5" opacity="0.2"/>
    <line x1="350" y1="200" x2="400" y2="400" stroke="#F4935B" stroke-width="1.5" opacity="0.2"/>
    <line x1="250" y1="350" x2="400" y2="400" stroke="#E8611A" stroke-width="2" opacity="0.3"/>
    <line x1="150" y1="120" x2="300" y2="80" stroke="#F4935B" stroke-width="1.5" opacity="0.2"/>
    <line x1="300" y1="80" x2="350" y2="200" stroke="#E8611A" stroke-width="1.5" opacity="0.25"/>
    <line x1="100" y1="300" x2="80" y2="450" stroke="#F4935B" stroke-width="1.5" opacity="0.15"/>
    <line x1="250" y1="350" x2="200" y2="500" stroke="#E8611A" stroke-width="1.5" opacity="0.2"/>
    <line x1="400" y1="400" x2="350" y2="520" stroke="#F4935B" stroke-width="1.5" opacity="0.15"/>
    <!-- Large ring -->
    <circle cx="250" cy="280" r="120" fill="none" stroke="url(#g1)" stroke-width="3" opacity="0.25"/>
    <circle cx="250" cy="280" r="80" fill="none" stroke="#E8611A" stroke-width="1.5" opacity="0.15" stroke-dasharray="8 6"/>
    <!-- Nodes -->
    <circle cx="150" cy="120" r="22" fill="#E8611A" opacity="0.85"/>
    <circle cx="300" cy="80" r="14" fill="#F4935B" opacity="0.6"/>
    <circle cx="350" cy="200" r="28" fill="url(#g1)" opacity="0.9"/>
    <circle cx="250" cy="350" r="24" fill="#E8611A" opacity="0.75"/>
    <circle cx="100" cy="300" r="16" fill="#F4935B" opacity="0.5"/>
    <circle cx="400" cy="400" r="20" fill="#E8611A" opacity="0.7"/>
    <circle cx="80" cy="450" r="10" fill="#F4935B" opacity="0.35"/>
    <circle cx="200" cy="500" r="12" fill="#E8611A" opacity="0.4"/>
    <circle cx="350" cy="520" r="8" fill="#F4935B" opacity="0.3"/>
    <!-- Center highlight -->
    <circle cx="250" cy="280" r="35" fill="#E8611A" opacity="0.15"/>
    <circle cx="250" cy="280" r="12" fill="#E8611A" opacity="0.6"/>
    <!-- Small dot accents -->
    <circle cx="420" cy="130" r="6" fill="#F4935B" opacity="0.3"/>
    <circle cx="60" cy="180" r="5" fill="#E8611A" opacity="0.25"/>
    <circle cx="440" cy="300" r="7" fill="#F4935B" opacity="0.2"/>
    <circle cx="180" cy="420" r="5" fill="#E8611A" opacity="0.3"/>
  </svg>`;
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function main() {
  const C = {
    navy:      "0C1B33",
    darkNavy:  "08122A",
    midNavy:   "1A2E4F",
    accent:    "E8611A",
    accentLt:  "F4935B",
    white:     "FFFFFF",
    offWhite:  "F5F6FA",
    lightGray: "DDE1EA",
    medGray:   "8892A6",
    darkText:  "1E2337",
    bodyText:  "3B4055",
    green:     "2D8B55",
  };

  const icons = {
    rocket:     await iconToBase64Png(FaRocket, `#${C.accent}`, 256),
    bullseye:   await iconToBase64Png(FaBullseye, `#${C.accent}`, 256),
    shield:     await iconToBase64Png(FaShieldAlt, `#${C.accent}`, 256),
    cogs:       await iconToBase64Png(FaCogs, `#${C.accent}`, 256),
    chart:      await iconToBase64Png(FaChartLine, `#${C.accent}`, 256),
    check:      await iconToBase64Png(FaCheckCircle, `#${C.white}`, 256),
    arrow:      await iconToBase64Png(FaArrowRight, `#${C.accent}`, 256),
    arrowW:     await iconToBase64Png(FaArrowRight, `#${C.white}`, 256),
    bolt:       await iconToBase64Png(FaBolt, `#${C.white}`, 256),
    users:      await iconToBase64Png(FaUsers, `#${C.white}`, 256),
    trophy:     await iconToBase64Png(FaTrophy, `#${C.white}`, 256),
    lock:       await iconToBase64Png(FaLock, `#${C.white}`, 256),
    cogsW:      await iconToBase64Png(FaCogs, `#${C.white}`, 256),
    shieldW:    await iconToBase64Png(FaShieldAlt, `#${C.white}`, 256),
    playW:      await iconToBase64Png(FaPlayCircle, `#${C.white}`, 256),
    rocketW:    await iconToBase64Png(FaRocket, `#${C.white}`, 256),
    chartW:     await iconToBase64Png(FaChartLine, `#${C.white}`, 256),
    imageW:     await iconToBase64Png(FaImage, `#${C.medGray}`, 256),
    globeAlt:   await iconToBase64Png(FaGlobe, `#${C.accentLt}`, 256),
    chartAlt:   await iconToBase64Png(FaChartLine, `#${C.accentLt}`, 256),
    bullseyeAlt:await iconToBase64Png(FaBullseye, `#${C.accentLt}`, 256),
    star:       await iconToBase64Png(FaStar, `#${C.accent}`, 256),
    flag:       await iconToBase64Png(FaFlag, `#${C.accent}`, 256),
    crown:      await iconToBase64Png(FaCrown, `#${C.accent}`, 256),
    checkDark:  await iconToBase64Png(FaCheckCircle, `#${C.accent}`, 256),
    // Slide 3 right-column check icons in accent color (orange circles)
    checkAccent: await iconToBase64Png(FaCheckCircle, `#${C.accent}`, 256),
  };

  const abstractGraphic = await generateAbstractGraphic();

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Big League News";
  pres.title = "Big League News x NBA: Strategic Partnership Proposal";

  const F = "Trebuchet MS";
  const TOTAL_SLIDES = 10;
  const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12 });

  function addFooter(slide, slideNum) {
    slide.addText(`${slideNum} / ${TOTAL_SLIDES}`, {
      x: 8.8, y: 5.25, w: 0.8, h: 0.3,
      fontFace: F, fontSize: 8, color: C.medGray, align: "right", margin: 0
    });
    slide.addText("CONFIDENTIAL", {
      x: 0.5, y: 5.25, w: 1.5, h: 0.3,
      fontFace: F, fontSize: 8, color: C.medGray, margin: 0
    });
  }

  // Action title bar — bold white text, wraps over 2 lines at top
  function addActionTitle(slide, titleText) {
    slide.addText(titleText, {
      x: 0.5, y: 0.2, w: 9, h: 0.75,
      fontFace: F, fontSize: 16, color: C.white, bold: true, margin: 0,
      lineSpacingMultiple: 1.2
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 1 — TITLE (unchanged from original)
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.2, w: 0.08, h: 2.6, fill: { color: C.accent } });

    s.addText("BIG LEAGUE NEWS", {
      x: 1.0, y: 1.2, w: 5.5, h: 0.6,
      fontFace: F, fontSize: 16, color: C.accent,
      charSpacing: 8, bold: true, margin: 0
    });
    s.addText("AI-Powered Clips\n& News Stories", {
      x: 1.0, y: 1.85, w: 5.5, h: 1.6,
      fontFace: F, fontSize: 42, color: C.white,
      bold: true, lineSpacingMultiple: 1.05, margin: 0
    });
    s.addText("Strategic Partnership Proposal for the NBA", {
      x: 1.0, y: 3.55, w: 5.5, h: 0.5,
      fontFace: F, fontSize: 18, color: C.accentLt, margin: 0
    });
    s.addShape(pres.shapes.LINE, { x: 1.0, y: 4.35, w: 2.5, h: 0, line: { color: C.accent, width: 1.5 } });
    s.addText("CONFIDENTIAL  |  April 2026", {
      x: 1.0, y: 4.6, w: 4, h: 0.4,
      fontFace: F, fontSize: 11, color: C.medGray, margin: 0
    });

    // Abstract network graphic on the right
    s.addImage({ data: abstractGraphic, x: 6.5, y: 0.5, w: 3.3, h: 4.5 });
  }

  // ═══════════════════════════════════════════
  // SLIDE 2 — EXEC SUMMARY
  // Revised: full-width cards spanning top-to-near-bottom, larger bullets, header bar full-width
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "A 3-month pilot with one NBA franchise can prove 12x content scale-up and $4.2M per-franchise revenue at zero editorial risk");
    addFooter(s, 2);

    s.addText("EXECUTIVE SUMMARY", {
      x: 0.5, y: 1.05, w: 9, h: 0.3,
      fontFace: F, fontSize: 12, color: C.accent, bold: true, charSpacing: 4, margin: 0
    });

    const recBlue = "1C7293";

    const cols = [
      { label: "SITUATION", color: C.lightGray, bullets: [
        "1,230+ games/season across 30 franchises",
        "Only a fraction covered in real time",
        "Fan demand growing 4.5x faster than supply",
      ]},
      { label: "COMPLICATION", color: C.accent, bullets: [
        "Can't scale editorial to every platform",
        "Leagues now pursuing AI content",
        "First-mover urgency in a $2.6B market",
      ]},
      { label: "RECOMMENDATION", color: recBlue, bullets: [
        "Deploy BLN AI-powered clips and stories",
        "12x volume, +38% engagement, sub-2 min",
        "Three-month pilot to drive $4.2M per franchise in revenue",
      ]},
    ];

    // Full-width 3 columns spanning nearly full slide height
    const colW = 2.85;
    const colInnerGap = (9.0 - 3 * colW) / 2;
    const cardTop = 1.45;
    const cardH = 3.65;

    cols.forEach((col, i) => {
      const x = 0.5 + i * (colW + colInnerGap);
      // Card background
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardTop, w: colW, h: cardH,
        fill: { color: C.midNavy }, shadow: makeShadow()
      });
      // Full-width top accent bar
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: cardTop, w: colW, h: 0.55, fill: { color: col.color }
      });
      // Label centered in header bar
      s.addText(col.label, {
        x, y: cardTop + 0.08, w: colW, h: 0.4,
        fontFace: F, fontSize: 14, color: C.white, bold: true, align: "center", margin: 0
      });
      // Bullets — larger font
      const bulletItems = col.bullets.map((b, j) => ({
        text: b,
        options: { bullet: true, ...(j < col.bullets.length - 1 ? { breakLine: true } : {}) }
      }));
      s.addText(bulletItems, {
        x: x + 0.2, y: cardTop + 0.7, w: colW - 0.4, h: cardH - 0.8,
        fontFace: F, fontSize: 14, color: C.lightGray, paraSpaceAfter: 18, margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 3 — TECHNOLOGY
  // Revised: larger icons (no circle bg on left), right column uses orange check circles
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "BLN's proprietary AI platform generates editorial-quality clips and stories at scale, purpose-built for sports media");
    addFooter(s, 3);

    // 2-line intro
    s.addText(
      "Three core engines power every piece of content — from raw data to published story in under 90 seconds.",
      {
        x: 0.5, y: 1.0, w: 5.2, h: 0.55,
        fontFace: F, fontSize: 13, color: C.accentLt, lineSpacingMultiple: 1.35, margin: 0
      }
    );

    // Three tech items — large icons, no circle backgrounds
    const techItems = [
      { icon: icons.cogsW, label: "Proprietary Language Models", desc: "Tuned for sports narratives and engagement" },
      { icon: icons.playW, label: "AI Clip Engine", desc: "Automated highlight extraction and commentary" },
      { icon: icons.shieldW, label: "Content Guardrails", desc: "Real-time filters for accuracy, tone, brand safety" },
    ];
    const blockH = 1.1;
    const topBound = 1.6;
    const botBound = 5.0;
    const gapT = (botBound - topBound - 3 * blockH) / 4;
    techItems.forEach((item, i) => {
      const y = topBound + gapT + i * (blockH + gapT);
      // Large icon ~0.55" square
      s.addImage({ data: item.icon, x: 0.5, y: y + 0.1, w: 0.55, h: 0.55 });
      s.addText(item.label, {
        x: 1.25, y: y, w: 4.5, h: 0.42,
        fontFace: F, fontSize: 17, color: C.accent, bold: true, margin: 0
      });
      s.addText(item.desc, {
        x: 1.25, y: y + 0.45, w: 4.5, h: 0.5,
        fontFace: F, fontSize: 13, color: C.lightGray, margin: 0
      });
    });

    // Right column - capabilities card
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: 1.0, w: 3.3, h: 4.1,
      fill: { color: C.midNavy }, shadow: makeShadow()
    });
    s.addText("PLATFORM\nCAPABILITIES", {
      x: 6.2, y: 1.15, w: 3.3, h: 0.75,
      fontFace: F, fontSize: 18, color: C.accent, bold: true, align: "center", margin: 0
    });
    const capabilities = [
      "Real-time game recaps",
      "Player-centric storylines",
      "Automated highlight clip editing",
      "Multi-format content output",
      "Editorial tone calibration",
      "Brand-safe content filtering",
    ];
    capabilities.forEach((cap, i) => {
      const y = 2.1 + i * 0.48;
      // Orange check circle icon
      s.addImage({ data: icons.checkAccent, x: 6.45, y: y + 0.06, w: 0.28, h: 0.28 });
      s.addText(cap, {
        x: 6.85, y: y, w: 2.5, h: 0.38,
        fontFace: F, fontSize: 12, color: C.white, valign: "middle", margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 4 — MARKET
  // Revised: stats boxes taller/fuller width, "Why Now?" in accent color,
  // icons larger (no circles), text larger
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "The AI sports content market will reach $2.6B by 2030, with 73% of fans demanding personalized content — creating first-mover urgency");
    addFooter(s, 4);

    const stats = [
      { num: "$2.6B+", label: "Global sports AI\nmarket by 2030", bg: C.midNavy },
      { num: "73%",    label: "of fans want more\npersonalized content", bg: C.accent },
      { num: "4.5x",  label: "higher engagement\nwith AI-curated clips", bg: C.midNavy },
    ];

    // Larger stat boxes — full width 3 columns
    const statW = 2.9;
    const statGap = (9.0 - 3 * statW) / 2;
    stats.forEach((st, i) => {
      const x = 0.5 + i * (statW + statGap);
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.0, w: statW, h: 1.8,
        fill: { color: st.bg }, shadow: makeShadow()
      });
      s.addText(st.num, {
        x, y: 1.1, w: statW, h: 0.85,
        fontFace: F, fontSize: 44, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText(st.label, {
        x, y: 1.95, w: statW, h: 0.65,
        fontFace: F, fontSize: 12, color: C.lightGray, align: "center", margin: 0
      });
    });

    // "Why Now?" header in accent color
    s.addText("Why Now?", {
      x: 0.5, y: 3.0, w: 9, h: 0.45,
      fontFace: F, fontSize: 20, color: C.accent, bold: true, margin: 0
    });

    // Why Now items — large icons, large text, generous spacing
    const whyItems = [
      { icon: icons.globeAlt,    text: "Fan attention fragmenting across platforms — AI fills every channel simultaneously" },
      { icon: icons.chartAlt,    text: "Personalized sports content demand outpacing editorial capacity by 4.5x" },
      { icon: icons.bullseyeAlt, text: "First-mover leagues capture outsized market share — delay means losing ground" },
    ];
    const whyItemH = 0.5;
    const whyTop = 3.5;
    const whyBot = 5.05;
    const whyGap = (whyBot - whyTop - 3 * whyItemH) / 4;
    whyItems.forEach((item, i) => {
      const y = whyTop + whyGap + i * (whyItemH + whyGap);
      s.addImage({ data: item.icon, x: 0.5, y: y + 0.05, w: 0.38, h: 0.38 });
      s.addText(item.text, {
        x: 1.1, y: y, w: 8.3, h: whyItemH,
        fontFace: F, fontSize: 15, color: C.lightGray, valign: "middle", margin: 0
      });
    });

    s.addText("Sources: Grand View Research (2025); Deloitte Digital Fan Survey (2024); BLN internal pilot data (2025)", {
      x: 0.5, y: 5.05, w: 9, h: 0.2,
      fontFace: F, fontSize: 7.5, color: C.medGray, italic: true, margin: 0
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 5 — FOUR PILLARS
  // Revised: large orange circle + icon centered at top of each card,
  // title centered below icon, body text centered, full-height cards
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    s.addText("BLN's four-pillar content model — Engaging, Truthful, Pro-Player, Guard-railed — directly addresses the NBA's brand-safety and quality requirements", {
      x: 0.5, y: 0.2, w: 9, h: 0.75,
      fontFace: F, fontSize: 16, color: C.white, bold: true, margin: 0, lineSpacingMultiple: 1.2
    });
    addFooter(s, 5);

    const diffs = [
      { icon: icons.bolt,   title: "ENGAGING",   desc: "Stories and clips engineered to maximize fan retention and shareability across every social platform." },
      { icon: icons.check,  title: "TRUTHFUL",   desc: "Fact-verified outputs grounded in live box scores, verified stats, and official league data sources." },
      { icon: icons.trophy, title: "PRO-PLAYER", desc: "Models trained to frame athletes positively, celebrating performance while avoiding sensationalism." },
      { icon: icons.lock,   title: "GUARDRAILS", desc: "Multi-layer content safety system that prevents reputation-harming, inappropriate, or off-brand outputs." },
    ];

    const cardW = 2.1;
    const cardGap = (9.0 - 4 * cardW) / 3;
    const cardTop = 1.1;
    const cardH = 4.0;
    const circleR = 0.55; // radius in inches for the circle display size

    diffs.forEach((d, i) => {
      const x = 0.5 + i * (cardW + cardGap);

      // Card background — full height with top accent line
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardTop, w: cardW, h: cardH, fill: { color: C.midNavy }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardTop, w: cardW, h: 0.06, fill: { color: C.accent } });

      // Large orange circle centered in top portion of card
      const circleSize = circleR * 2;
      const circleX = x + (cardW - circleSize) / 2;
      const circleY = cardTop + 0.35;
      s.addShape(pres.shapes.OVAL, { x: circleX, y: circleY, w: circleSize, h: circleSize, fill: { color: C.accent } });

      // Icon centered inside circle
      const iconSize = 0.55;
      const iconX = circleX + (circleSize - iconSize) / 2;
      const iconY = circleY + (circleSize - iconSize) / 2;
      s.addImage({ data: d.icon, x: iconX, y: iconY, w: iconSize, h: iconSize });

      // Title centered below circle
      const titleY = circleY + circleSize + 0.25;
      s.addText(d.title, {
        x, y: titleY, w: cardW, h: 0.38,
        fontFace: F, fontSize: 14, color: C.accent, bold: true, align: "center", margin: 0
      });

      // Body text centered
      const bodyY = titleY + 0.45;
      s.addText(d.desc, {
        x: x + 0.12, y: bodyY, w: cardW - 0.24, h: cardH - (bodyY - cardTop) - 0.15,
        fontFace: F, fontSize: 11, color: C.lightGray, align: "center", lineSpacingMultiple: 1.35, margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 6 — TECH INTEGRATION
  // Revised: step boxes taller with bolder step labels, Integration Highlights
  // boxes larger with icon+title inline (side by side, no top accent bar),
  // body text larger and wraps naturally
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "BLN integrates via a 4-stage pipeline — from NBA data feeds to multi-platform distribution — deployable in 8 weeks");
    addFooter(s, 6);

    const steps = [
      { label: "NBA Data\nFeeds",          desc: "Live stats, play-by-play,\nplayer databases" },
      { label: "BLN AI\nPipeline",         desc: "NLP models, clip engine,\ncontent assembly" },
      { label: "Guardrail\nLayer",         desc: "Fact-check, tone filter,\nbrand compliance" },
      { label: "Multi-Platform\nDistribution", desc: "App, web, social,\nbroadcast-ready" },
    ];

    const stepW = 2.1;
    const stepGap = (9.0 - 4 * stepW) / 3;

    steps.forEach((step, i) => {
      const x = 0.5 + i * (stepW + stepGap);
      // Taller step box
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: stepW, h: 1.85, fill: { color: C.midNavy }, shadow: makeShadow(), line: { color: "2A3F62", width: 0.5 } });
      // Circle number badge above box
      s.addShape(pres.shapes.OVAL, { x: x + 0.73, y: 0.88, w: 0.62, h: 0.62, fill: { color: C.accent } });
      s.addText(`${i + 1}`, { x: x + 0.73, y: 0.88, w: 0.62, h: 0.62, fontFace: F, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      // Step label bold, larger
      s.addText(step.label, { x: x + 0.1, y: 1.6, w: 1.9, h: 0.65, fontFace: F, fontSize: 13, color: C.white, bold: true, align: "center", margin: 0 });
      // Step desc
      s.addText(step.desc, { x: x + 0.1, y: 2.25, w: 1.9, h: 0.5, fontFace: F, fontSize: 9.5, color: C.lightGray, align: "center", margin: 0 });
      if (i < 3) s.addImage({ data: icons.arrowW, x: x + stepW + (stepGap / 2) - 0.13, y: 1.82, w: 0.26, h: 0.26 });
    });

    // "Integration Highlights" in white bold
    s.addText("Integration Highlights", {
      x: 0.5, y: 3.15, w: 9, h: 0.4,
      fontFace: F, fontSize: 18, color: C.white, bold: true, margin: 0
    });

    // Integration detail boxes — larger, icon+title inline on same row, body text below
    const integDetails = [
      { icon: icons.cogsW,   title: "Sub-200ms Latency",  text: "RESTful API for real-time content generation during live games" },
      { icon: icons.shieldW, title: "SOC 2 Type II",       text: "End-to-end encryption of all NBA data assets" },
      { icon: icons.rocketW, title: "8-Week Deployment",   text: "Turnkey — fully operational within 8 weeks of kickoff" },
    ];

    const intW = 2.8;
    const intGap = (9.0 - 3 * intW) / 2;

    integDetails.forEach((item, i) => {
      const x = 0.5 + i * (intW + intGap);
      const boxTop = 3.65;
      const boxH = 1.65;
      s.addShape(pres.shapes.RECTANGLE, { x, y: boxTop, w: intW, h: boxH, fill: { color: C.midNavy }, shadow: makeShadow() });
      // Icon inline with title (left side, vertically centered with title)
      s.addImage({ data: item.icon, x: x + 0.2, y: boxTop + 0.25, w: 0.32, h: 0.32 });
      // Title in accent color next to icon
      s.addText(item.title, {
        x: x + 0.62, y: boxTop + 0.2, w: intW - 0.72, h: 0.42,
        fontFace: F, fontSize: 14, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      // Body text below
      s.addText(item.text, {
        x: x + 0.2, y: boxTop + 0.72, w: intW - 0.35, h: 0.8,
        fontFace: F, fontSize: 12, color: C.lightGray, lineSpacingMultiple: 1.3, margin: 0
      });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 7 — MUTUAL BENEFITS
  // Revised: full-width header bars (accent / accentLt), larger metric badges,
  // larger body text, cleaner layout
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "The partnership creates mutual value: the NBA gains scalable content + new sponsor revenue; BLN gains data access + league credibility");
    addFooter(s, 7);

    const boxTop = 1.1;
    const boxH = 3.95;
    const colW = 4.3;

    // NBA column
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: boxTop, w: colW, h: boxH, fill: { color: C.midNavy }, shadow: makeShadow() });
    // Full-width accent header bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: boxTop, w: colW, h: 0.55, fill: { color: C.accent } });
    s.addText("FOR THE NBA", {
      x: 0.5, y: boxTop + 0.07, w: colW, h: 0.42,
      fontFace: F, fontSize: 16, color: C.white, bold: true, align: "center", margin: 0
    });

    const nbaB = [
      { metric: "12x",   text: "Scale content across 30 teams, zero added headcount" },
      { metric: "+38%",  text: "Deeper fan engagement via personalized real-time stories" },
      { metric: "$4.2M", text: "New sponsor revenue through AI-curated branded content" },
      { metric: "2B+",   text: "Amplified digital reach across social and emerging platforms" },
    ];
    nbaB.forEach((b, i) => {
      const y = boxTop + 0.72 + i * 0.8;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y, w: 0.9, h: 0.6, fill: { color: C.accent } });
      s.addText(b.metric, { x: 0.7, y, w: 0.9, h: 0.6, fontFace: F, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(b.text, { x: 1.75, y, w: 2.85, h: 0.6, fontFace: F, fontSize: 12, color: C.lightGray, valign: "middle", margin: 0 });
    });

    // BLN column
    const blnBg = "243B5E";
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: boxTop, w: colW, h: boxH, fill: { color: blnBg }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: boxTop, w: colW, h: 0.55, fill: { color: C.accentLt } });
    s.addText("FOR BIG LEAGUE NEWS", {
      x: 5.2, y: boxTop + 0.07, w: colW, h: 0.42,
      fontFace: F, fontSize: 16, color: C.white, bold: true, align: "center", margin: 0
    });

    const blnB = [
      { metric: "30",   text: "Official NBA franchise data, logos, and endorsement" },
      { metric: "3x",   text: "Revenue share on sponsored content and syndication" },
      { metric: "5+",   text: "Pipeline to attract additional major league deals" },
      { metric: "2B+",  text: "Co-branded distribution to NBA's global fan base" },
    ];
    blnB.forEach((b, i) => {
      const y = boxTop + 0.72 + i * 0.8;
      s.addShape(pres.shapes.RECTANGLE, { x: 5.4, y, w: 0.9, h: 0.6, fill: { color: C.accentLt } });
      s.addText(b.metric, { x: 5.4, y, w: 0.9, h: 0.6, fontFace: F, fontSize: 13, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(b.text, { x: 6.45, y, w: 2.85, h: 0.6, fontFace: F, fontSize: 12, color: C.lightGray, valign: "middle", margin: 0 });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 8 — EXAMPLE OUTPUTS
  // Revised: taller image area, larger headline/body text, no card background rect
  // (image fills full card width top-to-bottom-third, text below)
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "BLN generates three content types — game recaps, player spotlights, and highlight clips — all within 90 seconds of the final buzzer");
    addFooter(s, 8);

    const cardTop = 1.0;
    const cardH = 4.2;
    const cardW = 2.9;
    const cardGap = (9.0 - 3 * cardW) / 2;

    const examples = [
      { type: "GAME RECAP",        headline: "Celtics Hold Off Bucks\nin Overtime Thriller",  body: "AI recap delivered in 90 sec — key plays, stat leaders, and storylines for instant reader consumption.", img: "pexels1.jpg" },
      { type: "PLAYER SPOTLIGHT",  headline: "Rising Star Watch:\nEdwards MVP Push",          body: "Pro-player storytelling with auto-detected performance trends and full season arcs.", img: "pexels2.jpg" },
      { type: "AI HIGHLIGHT CLIP", headline: "Top 5 Plays of\nthe Night",                     body: "Auto-selected, ranked, and edited with AI commentary — ready for social media in under 2 min.", img: "pexels3.jpg" },
    ];

    examples.forEach((ex, i) => {
      const x = 0.5 + i * (cardW + cardGap);
      // Card background
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardTop, w: cardW, h: cardH, fill: { color: C.midNavy }, shadow: makeShadow() });
      // Photo — taller image area
      const imgH = 2.0;
      s.addImage({ path: ex.img, x, y: cardTop, w: cardW, h: imgH, sizing: { type: "cover", w: cardW, h: imgH } });
      // Type badge overlaid on image bottom-left
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: cardTop + imgH - 0.35, w: 1.35, h: 0.3, fill: { color: C.accent } });
      s.addText(ex.type, { x: x + 0.15, y: cardTop + imgH - 0.35, w: 1.35, h: 0.3, fontFace: F, fontSize: 8, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
      // Headline — larger, bold
      s.addText(ex.headline, { x: x + 0.15, y: cardTop + imgH + 0.15, w: cardW - 0.3, h: 0.85, fontFace: F, fontSize: 16, color: C.white, bold: true, margin: 0, lineSpacingMultiple: 1.1 });
      // Body text — larger
      s.addText(ex.body, { x: x + 0.15, y: cardTop + imgH + 1.05, w: cardW - 0.3, h: 1.0, fontFace: F, fontSize: 11, color: C.lightGray, lineSpacingMultiple: 1.35, margin: 0 });
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 9 — KPIs
  // Revised: 2x2 KPI boxes span full right column height, chart on left unchanged
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "Pilot data projects 12x content scale-up, 38% engagement lift, and $4.2M per-franchise annual revenue opportunity");
    addFooter(s, 9);

    // Chart on left
    const chartTop = 0.95;
    const chartH = 4.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: chartTop, w: 4.5, h: chartH, fill: { color: C.midNavy }, shadow: makeShadow() });
    s.addText("Content Volume: Before vs. After BLN", { x: 0.5, y: chartTop + 0.1, w: 4.5, h: 0.3, fontFace: F, fontSize: 12, color: C.accent, bold: true, align: "center", margin: 0 });
    s.addChart(pres.charts.BAR, [{
      name: "Before", labels: ["Game Recaps", "Player Stories", "Highlight Clips", "Social Posts"], values: [5, 2, 3, 8]
    }, {
      name: "With BLN", labels: ["Game Recaps", "Player Stories", "Highlight Clips", "Social Posts"], values: [60, 25, 40, 100]
    }], {
      x: 0.6, y: chartTop + 0.45, w: 4.3, h: chartH - 0.55,
      barDir: "col", chartColors: [C.medGray, C.accent],
      showValue: true, dataLabelColor: C.white, dataLabelFontSize: 10,
      catAxisLabelColor: C.lightGray, catAxisLabelFontSize: 10,
      valAxisLabelColor: C.lightGray, valAxisLabelFontSize: 10,
      valGridLine: { color: "2A3F62", size: 0.5 }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendColor: C.lightGray, legendFontSize: 10,
    });

    // 2x2 KPI boxes — fill full right column height
    const bW = 2.15;
    const bH = 2.0;
    const gap = 0.1;
    const sX = 5.15;
    const sY = chartTop;

    const kpis = [
      { num: "12x",   label: "Content Volume", desc: "60+ stories per day" },
      { num: "38%",   label: "Engagement Lift", desc: "Page time + shares" },
      { num: "<2\nmin", label: "Post-Game\nDelivery", desc: "Before press conferences" },
      { num: "$4.2M", label: "Revenue /\nFranchise", desc: "Ads + syndication" },
    ];
    kpis.forEach((k, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = sX + col * (bW + gap);
      const y = sY + row * (bH + gap);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: bW, h: bH, fill: { color: C.midNavy }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: bH, fill: { color: C.accent } });
      s.addText(k.num, { x: x + 0.2, y: y + 0.2, w: 1.75, h: 0.75, fontFace: F, fontSize: 38, color: C.accent, bold: true, margin: 0 });
      s.addText(k.label, { x: x + 0.2, y: y + 0.98, w: 1.75, h: 0.38, fontFace: F, fontSize: 13, color: C.white, bold: true, margin: 0 });
      s.addText(k.desc, { x: x + 0.2, y: y + 1.4, w: 1.75, h: 0.48, fontFace: F, fontSize: 11, color: C.lightGray, lineSpacingMultiple: 1.2, margin: 0 });
    });

    s.addText("Source: BLN internal pilot data (Q4 2025); revenue projections based on comparable AI media partnerships", {
      x: 0.5, y: 5.1, w: 9, h: 0.2, fontFace: F, fontSize: 7.5, color: C.medGray, italic: true, margin: 0
    });
  }

  // ═══════════════════════════════════════════
  // SLIDE 10 — SUMMARY & ASK
  // Revised: "Why This Partnership Wins" in accent color, larger check icons,
  // Partnership Tiers box taller, OUR ASK box taller with bigger text,
  // NEXT STEPS bar taller
  // ═══════════════════════════════════════════
  {
    let s = pres.addSlide();
    s.background = { color: C.darkNavy };
    addActionTitle(s, "We recommend a 3-month, single-franchise pilot at zero editorial risk — with three tiers available as the partnership scales");
    addFooter(s, 10);

    // "Why This Partnership Wins" in accent color (orange), larger
    s.addText("Why This Partnership Wins", {
      x: 0.5, y: 1.05, w: 5.5, h: 0.42,
      fontFace: F, fontSize: 18, color: C.accent, bold: true, margin: 0
    });

    // Partnership tiers box
    const tiersBoxTop = 1.0;
    const tiersBoxH = 2.5;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: tiersBoxTop, w: 3.3, h: tiersBoxH,
      fill: { color: C.midNavy }, shadow: makeShadow()
    });
    s.addText("PARTNERSHIP TIERS", {
      x: 6.2, y: tiersBoxTop + 0.12, w: 3.3, h: 0.38,
      fontFace: F, fontSize: 14, color: C.accent, bold: true, align: "center", margin: 0
    });

    const tiers = [
      { icon: icons.star,  name: "Pilot",        desc: "1 franchise · 3 months · Zero risk" },
      { icon: icons.flag,  name: "League Select", desc: "5-10 franchises · 12 months" },
      { icon: icons.crown, name: "Enterprise",    desc: "All 30 · Multi-year · Rev share" },
    ];
    const tierBlockH = 0.52;
    const tierTitleBot = tiersBoxTop + 0.5;
    const tierBoxBot = tiersBoxTop + tiersBoxH;
    const tierGap = (tierBoxBot - tierTitleBot - 3 * tierBlockH) / 4;
    tiers.forEach((t, i) => {
      const y = tierTitleBot + tierGap + i * (tierBlockH + tierGap);
      s.addImage({ data: t.icon, x: 6.4, y: y + 0.03, w: 0.24, h: 0.24 });
      s.addText(t.name, {
        x: 6.75, y, w: 2.55, h: 0.26,
        fontFace: F, fontSize: 13, color: C.white, bold: true, valign: "middle", margin: 0
      });
      s.addText(t.desc, {
        x: 6.75, y: y + 0.26, w: 2.55, h: 0.26,
        fontFace: F, fontSize: 11, color: C.lightGray, margin: 0
      });
    });

    // Summary points with large check icons, generous spacing
    const summaryPts = [
      "Untapped $2.6B market — first movers win",
      "12x volume, +38% engagement, <2 min to post",
      "NBA-native: engaging, truthful, pro-player, brand-safe",
    ];
    const ptFirst = 1.55;
    const ptLast = 3.0;
    const ptStep = (ptLast - ptFirst) / 2;
    summaryPts.forEach((pt, i) => {
      const y = ptFirst + i * ptStep;
      s.addImage({ data: icons.checkDark, x: 0.5, y: y + 0.08, w: 0.3, h: 0.3 });
      s.addText(pt, {
        x: 0.95, y, w: 5.0, h: 0.45,
        fontFace: F, fontSize: 14, color: C.lightGray, valign: "middle", margin: 0
      });
    });

    // OUR ASK box — taller, bigger text
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 3.6, w: 9, h: 1.1,
      fill: { color: C.midNavy }, shadow: makeShadow()
    });
    s.addText("OUR ASK", {
      x: 0.8, y: 3.67, w: 8.4, h: 0.3,
      fontFace: F, fontSize: 15, color: C.accent, bold: true, margin: 0
    });
    s.addText("Approve a 3-month pilot with one franchise to demonstrate measurable impact. Full performance report with KPIs within 90 days — zero risk to your editorial workflow.", {
      x: 0.8, y: 3.98, w: 8.4, h: 0.6,
      fontFace: F, fontSize: 13, color: C.white, lineSpacingMultiple: 1.25, margin: 0
    });

    // NEXT STEPS bar — taller
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.85, w: 9, h: 0.6,
      fill: { color: C.accentLt }
    });
    s.addText("NEXT STEPS:", {
      x: 0.65, y: 4.85, w: 1.6, h: 0.6,
      fontFace: F, fontSize: 13, color: C.white, bold: true, valign: "middle", margin: 0
    });
    const nsItems = ["1. Select franchise", "2. Sign MOU", "3. 8-week integration", "4. 90-day review"];
    const nsItemW = 1.5;
    const nsStart = 2.25;
    const nsEnd = 9.5;
    const nsGap = (nsEnd - nsStart - 4 * nsItemW) / 5;
    nsItems.forEach((item, i) => {
      const x = nsStart + nsGap + i * (nsItemW + nsGap);
      s.addText(item, {
        x, y: 4.85, w: nsItemW, h: 0.6,
        fontFace: F, fontSize: 11, color: C.white, valign: "middle", align: "center", margin: 0
      });
    });
  }

  await pres.writeFile({ fileName: "/home/assets/Big_League_News_Revised.pptx" });
  console.log("Revised deck created.");
}

main().catch(console.error);
