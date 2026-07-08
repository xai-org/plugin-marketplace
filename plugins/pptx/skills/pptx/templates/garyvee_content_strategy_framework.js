const pptxgen = require("pptxgenjs");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Gary Vaynerchuk's Content Model";

  const C = {
    charcoal: "2D3436",
    slate: "636E72",
    teal: "0984E3",
    lightTeal: "74B9FF",
    paleBlue: "DFE6E9",
    white: "FFFFFF",
    offWhite: "F5F6FA",
    lightGray: "B2BEC3",
  };
  const H = "Arial Black";
  const B = "Arial";
  const ms = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 });

  // ===================== SLIDE 1: TITLE =====================
  let s1 = pres.addSlide();
  s1.background = { color: C.charcoal };
  s1.addText("GARYVEE'S\nCONTENT\nMODEL", {
    x: 0.8, y: 0.4, w: 5.5, h: 3.8, fontFace: H, fontSize: 52, color: C.white, bold: true, lineSpacingMultiple: 0.85, margin: 0,
  });
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.3, w: 1.5, h: 0.04, fill: { color: C.teal } });
  s1.addText("The Reverse Pyramid", {
    x: 0.8, y: 4.5, w: 5, h: 0.4, fontFace: B, fontSize: 14, color: C.lightTeal, margin: 0,
  });
  s1.addText("A MECE Framework for Creators", {
    x: 0.8, y: 4.95, w: 5, h: 0.35, fontFace: B, fontSize: 11, color: C.lightGray, margin: 0,
  });
  // Right side large "01" watermark
  s1.addText("GV", {
    x: 6.5, y: 0.5, w: 3.5, h: 4.5, fontFace: H, fontSize: 160, color: C.teal, bold: true, align: "right", valign: "middle", margin: 0,
    transparency: 85,
  });

  // ===================== SECTION 01 =====================
  let sec1 = pres.addSlide();
  sec1.background = { color: C.offWhite };
  sec1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.teal } });
  sec1.addText("01", { x: 0.7, y: 0.5, w: 2, h: 1.0, fontFace: H, fontSize: 64, color: C.teal, bold: true, margin: 0 });
  sec1.addText("THE MODEL\nOVERVIEW", { x: 0.7, y: 1.7, w: 9, h: 2.4, fontFace: H, fontSize: 48, color: C.charcoal, bold: true, margin: 0, lineSpacingMultiple: 0.95 });
  sec1.addText("How the GaryVee Content Model works and why creators use it", { x: 0.7, y: 4.2, w: 8, h: 0.6, fontFace: B, fontSize: 14, color: C.slate, margin: 0 });

  // ===================== CONTENT 1: REVERSE PYRAMID =====================
  let c1 = pres.addSlide();
  c1.background = { color: C.white };
  c1.addText("One pillar piece becomes a range of distributed assets", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 20, color: C.charcoal, bold: true, margin: 0 });

  // LEFT HALF: Pyramid + Y-axis
  // Pyramid centered at x=3.0, compact sizing
  const pxC = 3.1;
  const pW1 = 4.0, pH = 0.85, gap = 0.18;
  const pY1 = 1.35;

  // Level 1: PILLAR (widest)
  c1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: pxC - pW1/2, y: pY1, w: pW1, h: pH, fill: { color: C.charcoal }, rectRadius: 0.06, shadow: ms() });
  c1.addText("PILLAR CONTENT", { x: pxC - pW1/2, y: pY1, w: pW1, h: pH, fontFace: H, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // Level 2: MICRO (medium)
  const pW2 = 2.8;
  const pY2 = pY1 + pH + gap;
  c1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: pxC - pW2/2, y: pY2, w: pW2, h: pH, fill: { color: C.teal }, rectRadius: 0.06, shadow: ms() });
  c1.addText("MICRO CONTENT", { x: pxC - pW2/2, y: pY2, w: pW2, h: pH, fontFace: H, fontSize: 12, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // Level 3: DISTRIBUTE (narrowest)
  const pW3 = 1.6;
  const pY3 = pY2 + pH + gap;
  c1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: pxC - pW3/2, y: pY3, w: pW3, h: pH, fill: { color: C.paleBlue }, rectRadius: 0.06, shadow: ms() });
  c1.addText("DISTRIBUTE", { x: pxC - pW3/2, y: pY3, w: pW3, h: pH, fontFace: H, fontSize: 11, color: C.charcoal, bold: true, align: "center", valign: "middle", margin: 0 });

  // RIGHT HALF: Explanation text
  const rX = 5.5;
  const rW = 4.2;

  // "1 to 100+" concept header
  c1.addText("1", { x: rX, y: 1.25, w: 0.35, h: 0.4, fontFace: H, fontSize: 24, color: C.teal, bold: true, margin: 0 });
  c1.addShape(pres.shapes.RECTANGLE, { x: rX + 0.4, y: 1.42, w: 0.4, h: 0.03, fill: { color: C.lightTeal } });
  c1.addText("100+", { x: rX + 0.85, y: 1.25, w: 1.0, h: 0.4, fontFace: H, fontSize: 24, color: C.teal, bold: true, margin: 0 });
  c1.addText("PIECES OF CONTENT", { x: rX + 2.0, y: 1.28, w: 2.2, h: 0.35, fontFace: H, fontSize: 8, color: C.slate, bold: true, margin: 0, charSpacing: 2 });

  // Explanation blocks — dot aligned to center of bold title
  c1.addShape(pres.shapes.OVAL, { x: rX, y: 1.98, w: 0.1, h: 0.1, fill: { color: C.teal } });
  c1.addText("Record one keynote, podcast, or vlog", {
    x: rX + 0.3, y: 1.88, w: rW - 0.3, h: 0.3, fontFace: H, fontSize: 12, color: C.charcoal, bold: true, margin: 0,
  });
  c1.addText("That single recording is your pillar. Everything else comes from it.", {
    x: rX + 0.3, y: 2.2, w: rW - 0.3, h: 0.4, fontFace: B, fontSize: 11, color: C.slate, margin: 0,
  });

  c1.addShape(pres.shapes.OVAL, { x: rX, y: 2.83, w: 0.1, h: 0.1, fill: { color: C.teal } });
  c1.addText("Chop it into 30+ micro pieces", {
    x: rX + 0.3, y: 2.73, w: rW - 0.3, h: 0.3, fontFace: H, fontSize: 12, color: C.charcoal, bold: true, margin: 0,
  });
  c1.addText("Short clips, quote cards, audiograms, threads, stories, memes. Each one is a standalone post.", {
    x: rX + 0.3, y: 3.05, w: rW - 0.3, h: 0.5, fontFace: B, fontSize: 11, color: C.slate, margin: 0,
  });

  c1.addShape(pres.shapes.OVAL, { x: rX, y: 3.78, w: 0.1, h: 0.1, fill: { color: C.teal } });
  c1.addText("Distribute natively across 6+ platforms", {
    x: rX + 0.3, y: 3.68, w: rW - 0.3, h: 0.3, fontFace: H, fontSize: 12, color: C.charcoal, bold: true, margin: 0,
  });
  c1.addText("Reformat for each platform's culture. A LinkedIn post looks nothing like a TikTok, even if the idea is the same.", {
    x: rX + 0.3, y: 4.0, w: rW - 0.3, h: 0.55, fontFace: B, fontSize: 11, color: C.slate, margin: 0,
  });

  // Bottom insight callout
  c1.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.85, w: 1.2, h: 0.03, fill: { color: C.teal } });
  c1.addText("Gary says most creators fail here because they post the same file everywhere. The work is in the reformatting.", {
    x: 0.7, y: 5.0, w: 9, h: 0.35, fontFace: B, fontSize: 11, color: C.teal, italic: true, margin: 0,
  });

  // ===================== CONTENT 2: WHY THIS WORKS =====================
  let c2 = pres.addSlide();
  c2.background = { color: C.white };
  c2.addText("Four reasons this model beats everything else", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 22, color: C.charcoal, bold: true, margin: 0 });

  const whyItems = [
    { title: "Volume wins", desc: "More content means more shots on goal. Algorithms reward people who show up every day." },
    { title: "Compound returns", desc: "Every piece works for you 24/7 across platforms. A post from six months ago still brings in new people." },
    { title: "Lower creative lift", desc: "You already said it once. Now you just repackage it for different audiences." },
    { title: "Platform arbitrage", desc: "Show up early on new platforms and you get massive reach before ad costs catch up." },
  ];
  whyItems.forEach((item, i) => {
    const yPos = 1.15 + i * 0.82;
    c2.addShape(pres.shapes.OVAL, { x: 0.7, y: yPos + 0.1, w: 0.12, h: 0.12, fill: { color: C.teal } });
    c2.addText(item.title, { x: 1.1, y: yPos, w: 8.2, h: 0.3, fontFace: H, fontSize: 15, color: C.charcoal, bold: true, margin: 0 });
    c2.addText(item.desc, { x: 1.1, y: yPos + 0.33, w: 8.2, h: 0.38, fontFace: B, fontSize: 12, color: C.slate, margin: 0 });
  });

  // Bottom insight
  c2.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.55, w: 1.2, h: 0.03, fill: { color: C.teal } });
  c2.addText("The model works because it removes the biggest bottleneck in content: coming up with new ideas every day.", {
    x: 0.7, y: 4.7, w: 9, h: 0.4, fontFace: B, fontSize: 11, color: C.teal, italic: true, margin: 0,
  });

  // ===================== SECTION 02 =====================
  let sec2 = pres.addSlide();
  sec2.background = { color: C.offWhite };
  sec2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.teal } });
  sec2.addText("02", { x: 0.7, y: 0.5, w: 2, h: 1.0, fontFace: H, fontSize: 64, color: C.teal, bold: true, margin: 0 });
  sec2.addText("PILLAR\nCONTENT", { x: 0.7, y: 1.7, w: 9, h: 2.4, fontFace: H, fontSize: 48, color: C.charcoal, bold: true, margin: 0, lineSpacingMultiple: 0.95 });
  sec2.addText("Your long-form content is the raw material for everything else", { x: 0.7, y: 4.2, w: 8, h: 0.6, fontFace: B, fontSize: 14, color: C.slate, margin: 0 });

  // ===================== CONTENT 3: CREATE THE PILLAR =====================
  let c3 = pres.addSlide();
  c3.background = { color: C.white };
  c3.addText("Film your real life every day instead of scripting it", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 22, color: C.charcoal, bold: true, margin: 0 });

  const pillarItems = [
    { title: "Document, don't create", desc: "Point the camera at your actual day. Meetings, calls, travel, the grind. Real beats polished." },
    { title: "Long-form first", desc: "Keynotes, podcasts, vlogs, live shows. Anything that runs 15 to 60+ minutes and captures real conversation." },
    { title: "One pillar per day", desc: "Ship at least one long-form piece daily. That's your raw material for everything downstream." },
  ];
  pillarItems.forEach((item, i) => {
    const yPos = 1.3 + i * 1.3;
    c3.addText(`0${i + 1}`, { x: 0.7, y: yPos, w: 0.8, h: 0.8, fontFace: H, fontSize: 32, color: C.teal, bold: true, margin: 0 });
    c3.addText(item.title, { x: 1.6, y: yPos, w: 7.7, h: 0.4, fontFace: H, fontSize: 16, color: C.charcoal, bold: true, margin: 0 });
    c3.addText(item.desc, { x: 1.6, y: yPos + 0.45, w: 7.7, h: 0.5, fontFace: B, fontSize: 13, color: C.slate, margin: 0 });
    if (i < 2) {
      c3.addShape(pres.shapes.RECTANGLE, { x: 1.6, y: yPos + 1.1, w: 7.7, h: 0.01, fill: { color: C.paleBlue } });
    }
  });

  // ===================== CONTENT 4: PILLAR FORMATS =====================
  let c4 = pres.addSlide();
  c4.background = { color: C.white };
  c4.addText("PLACEHOLDER", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 19, color: C.charcoal, bold: true, margin: 0 });

  const formats = [
    { format: "Vlog / Day-in-life", length: "10 to 30 min", platform: "YouTube, Facebook", effort: "Medium" },
    { format: "Keynote / Talk", length: "20 to 60 min", platform: "YouTube, LinkedIn", effort: "High" },
    { format: "Podcast episode", length: "30 to 90 min", platform: "Spotify, Apple, YouTube", effort: "Medium" },
    { format: "Live stream / Q&A", length: "15 to 60 min", platform: "IG Live, YouTube, TikTok", effort: "Low" },
    { format: "Long-form article", length: "1500+ words", platform: "Blog, LinkedIn, Medium", effort: "High" },
  ];

  // Column headers
  c4.addText("FORMAT", { x: 0.7, y: 1.1, w: 2.8, h: 0.35, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c4.addText("LENGTH", { x: 3.5, y: 1.1, w: 1.5, h: 0.35, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c4.addText("BEST PLATFORM", { x: 5.0, y: 1.1, w: 3.0, h: 0.35, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c4.addText("EFFORT", { x: 8.0, y: 1.1, w: 1.5, h: 0.35, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  // Divider under header
  c4.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.45, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });

  formats.forEach((f, i) => {
    const yPos = 1.6 + i * 0.7;
    c4.addText(f.format, { x: 0.7, y: yPos, w: 2.8, h: 0.35, fontFace: H, fontSize: 13, color: C.teal, bold: true, valign: "middle", margin: 0 });
    c4.addText(f.length, { x: 3.5, y: yPos, w: 1.5, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, valign: "middle", margin: 0 });
    c4.addText(f.platform, { x: 5.0, y: yPos, w: 3.0, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, valign: "middle", margin: 0 });
    c4.addText(f.effort, { x: 8.0, y: yPos, w: 1.5, h: 0.35, fontFace: B, fontSize: 12, color: C.slate, valign: "middle", margin: 0 });
    c4.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: yPos + 0.48, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });
  });

  // ===================== SECTION 03 =====================
  let sec3 = pres.addSlide();
  sec3.background = { color: C.offWhite };
  sec3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.teal } });
  sec3.addText("03", { x: 0.7, y: 0.5, w: 2, h: 1.0, fontFace: H, fontSize: 64, color: C.teal, bold: true, margin: 0 });
  sec3.addText("MICRO\nCONTENT", { x: 0.7, y: 1.7, w: 9, h: 2.4, fontFace: H, fontSize: 48, color: C.charcoal, bold: true, margin: 0, lineSpacingMultiple: 0.95 });
  sec3.addText("Break one long piece into dozens of smaller ones", { x: 0.7, y: 4.2, w: 8, h: 0.6, fontFace: B, fontSize: 14, color: C.slate, margin: 0 });

  // ===================== CONTENT 5: CHOPPING PROCESS =====================
  let c5 = pres.addSlide();
  c5.background = { color: C.white };
  c5.addText("Every pillar gets chopped into six micro content formats", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 20, color: C.charcoal, bold: true, margin: 0 });

  // Two-column layout, no boxes — just large type + description
  const microTypes = [
    { stat: "15-60s", label: "Short clips", desc: "Pull the best 60 seconds" },
    { stat: "Static", label: "Quote images", desc: "Turn sharp lines into graphics" },
    { stat: "24hr", label: "Stories", desc: "Behind the scenes and polls" },
    { stat: "Text", label: "Threads", desc: "Rewrite key points as threads" },
    { stat: "Audio", label: "Audiograms", desc: "Visualize podcast highlights" },
    { stat: "Viral", label: "Memes / GIFs", desc: "Clip the funniest moments" },
  ];
  microTypes.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = col === 0 ? 0.7 : 5.3;
    const yPos = 1.2 + row * 1.35;

    c5.addText(item.stat, { x: xPos, y: yPos, w: 1.2, h: 0.5, fontFace: H, fontSize: 22, color: C.teal, bold: true, margin: 0 });
    c5.addText(item.label, { x: xPos + 1.3, y: yPos, w: 3.0, h: 0.3, fontFace: H, fontSize: 14, color: C.charcoal, bold: true, margin: 0 });
    c5.addText(item.desc, { x: xPos + 1.3, y: yPos + 0.32, w: 3.0, h: 0.3, fontFace: B, fontSize: 11, color: C.slate, margin: 0 });
    // Subtle divider
    if (row < 2) {
      c5.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos + 1.1, w: 4.2, h: 0.01, fill: { color: C.paleBlue } });
    }
  });

  // ===================== CONTENT 6: THE TEAM =====================
  let c6 = pres.addSlide();
  c6.background = { color: C.white };
  c6.addText("Four key roles turn one creator into a content machine", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 20, color: C.charcoal, bold: true, margin: 0 });

  const roles = [
    { title: "Videographer / Documentarian", desc: "Follows you everywhere. Shoots the pillar and grabs B-roll throughout the day." },
    { title: "Editor / Content chopper", desc: "Cuts the long stuff into short stuff. Knows what works on each platform." },
    { title: "Copywriter / Strategist", desc: "Writes the captions, hooks, and headlines. Adjusts the voice for each channel." },
    { title: "Community manager", desc: "Answers every comment and DM. Reports back on what people are actually saying." },
  ];
  roles.forEach((item, i) => {
    const yPos = 1.2 + i * 1.05;
    c6.addShape(pres.shapes.OVAL, { x: 0.7, y: yPos + 0.08, w: 0.12, h: 0.12, fill: { color: C.teal } });
    c6.addText(item.title, { x: 1.1, y: yPos, w: 8.2, h: 0.35, fontFace: H, fontSize: 15, color: C.charcoal, bold: true, margin: 0 });
    c6.addText(item.desc, { x: 1.1, y: yPos + 0.38, w: 8.2, h: 0.4, fontFace: B, fontSize: 12, color: C.slate, margin: 0 });
  });

  // ===================== SECTION 04 =====================
  let sec4 = pres.addSlide();
  sec4.background = { color: C.offWhite };
  sec4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.teal } });
  sec4.addText("04", { x: 0.7, y: 0.5, w: 2, h: 1.0, fontFace: H, fontSize: 64, color: C.teal, bold: true, margin: 0 });
  sec4.addText("DISTRIBUTE\n& CONTEXTUALIZE", { x: 0.7, y: 1.7, w: 9, h: 2.4, fontFace: H, fontSize: 44, color: C.charcoal, bold: true, margin: 0, lineSpacingMultiple: 0.95 });
  sec4.addText("Tailor content to each platform instead of copying and pasting", { x: 0.7, y: 4.2, w: 8, h: 0.6, fontFace: B, fontSize: 14, color: C.slate, margin: 0 });

  // ===================== CONTENT 7: PLATFORM MATRIX =====================
  let c7 = pres.addSlide();
  c7.background = { color: C.white };
  c7.addText("Each platform demands its own format, tone, and context", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 20, color: C.charcoal, bold: true, margin: 0 });

  const platforms = [
    { name: "YouTube", format: "Long-form video, vlogs, keynotes", tone: "Educational / deep-dive" },
    { name: "Instagram", format: "Reels, carousels, stories", tone: "Visual-first / aspirational" },
    { name: "TikTok", format: "Short vertical clips, trends", tone: "Raw, fast, entertaining" },
    { name: "LinkedIn", format: "Text posts, articles, clips", tone: "Professional / thought leadership" },
    { name: "X / Twitter", format: "Threads, quotes, hot takes", tone: "Conversational / punchy" },
    { name: "Podcast", format: "Full audio, clip highlights", tone: "Intimate / long-form" },
  ];

  // Column labels
  c7.addText("PLATFORM", { x: 0.7, y: 1.05, w: 2.2, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c7.addText("FORMAT", { x: 2.9, y: 1.05, w: 3.4, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c7.addText("TONE / CONTEXT", { x: 6.3, y: 1.05, w: 3, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c7.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.35, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });

  platforms.forEach((p, i) => {
    const yPos = 1.5 + i * 0.55;
    c7.addText(p.name, { x: 0.7, y: yPos, w: 2.2, h: 0.35, fontFace: H, fontSize: 13, color: C.teal, bold: true, valign: "middle", margin: 0 });
    c7.addText(p.format, { x: 2.9, y: yPos, w: 3.4, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, valign: "middle", margin: 0 });
    c7.addText(p.tone, { x: 6.3, y: yPos, w: 3, h: 0.35, fontFace: B, fontSize: 12, color: C.slate, valign: "middle", margin: 0 });
    c7.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: yPos + 0.43, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });
  });

  // Bottom insight — just text, no box
  c7.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.85, w: 1.2, h: 0.03, fill: { color: C.teal } });
  c7.addText("Same story, different language for each platform's culture.", {
    x: 0.7, y: 5.0, w: 8.6, h: 0.35, fontFace: B, fontSize: 12, color: C.teal, italic: true, margin: 0,
  });

  // ===================== CONTENT 8: WEEKLY CADENCE =====================
  let c8 = pres.addSlide();
  c8.background = { color: C.white };
  c8.addText("A structured weekly cadence produces 50+ pieces of content", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 20, color: C.charcoal, bold: true, margin: 0 });

  const days = [
    { day: "MON", pillar: "Podcast record", micro: "5 clips, 3 quotes, 2 stories" },
    { day: "TUE", pillar: "Vlog / day-in-life", micro: "4 reels, 2 threads, 3 stories" },
    { day: "WED", pillar: "LinkedIn article", micro: "3 carousels, 2 audiograms" },
    { day: "THU", pillar: "Live stream Q&A", micro: "5 clips, 2 memes, 3 stories" },
    { day: "FRI", pillar: "Keynote / talk", micro: "6 clips, 4 quotes, 2 threads" },
    { day: "SAT", pillar: "Off", micro: "Repurpose the week's best performers" },
    { day: "SUN", pillar: "Off", micro: "Schedule and plan the next week" },
  ];

  c8.addText("DAY", { x: 0.7, y: 1.05, w: 1.0, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c8.addText("PILLAR", { x: 1.7, y: 1.05, w: 3.2, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c8.addText("MICRO OUTPUT", { x: 4.9, y: 1.05, w: 4.4, h: 0.3, fontFace: H, fontSize: 9, color: C.lightGray, bold: true, margin: 0 });
  c8.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.35, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });

  days.forEach((d, i) => {
    const yPos = 1.48 + i * 0.55;
    c8.addText(d.day, { x: 0.7, y: yPos, w: 1.0, h: 0.35, fontFace: H, fontSize: 12, color: C.teal, bold: true, valign: "middle", margin: 0 });
    c8.addText(d.pillar, { x: 1.7, y: yPos, w: 3.2, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, valign: "middle", margin: 0 });
    c8.addText(d.micro, { x: 4.9, y: yPos, w: 4.4, h: 0.35, fontFace: B, fontSize: 12, color: C.slate, valign: "middle", margin: 0 });
    c8.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: yPos + 0.43, w: 8.6, h: 0.01, fill: { color: C.paleBlue } });
  });

  // ===================== SECTION 05 =====================
  let sec5 = pres.addSlide();
  sec5.background = { color: C.offWhite };
  sec5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: 5.625, fill: { color: C.teal } });
  sec5.addText("05", { x: 0.7, y: 0.5, w: 2, h: 1.0, fontFace: H, fontSize: 64, color: C.teal, bold: true, margin: 0 });
  sec5.addText("LISTEN\n& ITERATE", { x: 0.7, y: 1.7, w: 9, h: 2.4, fontFace: H, fontSize: 48, color: C.charcoal, bold: true, margin: 0, lineSpacingMultiple: 0.95 });
  sec5.addText("Pay attention to what's working and do more of it", { x: 0.7, y: 4.2, w: 8, h: 0.6, fontFace: B, fontSize: 14, color: C.slate, margin: 0 });

  // ===================== CONTENT 9: FEEDBACK LOOP =====================
  let c9 = pres.addSlide();
  c9.background = { color: C.white };
  c9.addText("Your comments section is a free focus group", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 22, color: C.charcoal, bold: true, margin: 0 });

  // Horizontal process — circles are the one shape element that makes sense here
  const steps = [
    { num: "1", label: "POST", desc: "Ship it to every platform" },
    { num: "2", label: "LISTEN", desc: "Read every comment, DM, and reply" },
    { num: "3", label: "LEARN", desc: "Figure out what hit and what flopped" },
    { num: "4", label: "ADJUST", desc: "Do more of what worked, cut what didn't" },
  ];
  steps.forEach((step, i) => {
    const xPos = 0.5 + i * 2.4;
    c9.addShape(pres.shapes.OVAL, { x: xPos + 0.5, y: 1.2, w: 1.0, h: 1.0, fill: { color: C.teal } });
    c9.addText(step.num, { x: xPos + 0.5, y: 1.2, w: 1.0, h: 1.0, fontFace: H, fontSize: 28, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    c9.addText(step.label, { x: xPos, y: 2.4, w: 2.0, h: 0.45, fontFace: H, fontSize: 17, color: C.charcoal, bold: true, align: "center", margin: 0 });
    c9.addText(step.desc, { x: xPos, y: 2.85, w: 2.0, h: 0.65, fontFace: B, fontSize: 11, color: C.slate, align: "center", margin: 0 });
    if (i < 3) {
      // Arrow connector
      c9.addShape(pres.shapes.RECTANGLE, { x: xPos + 1.9, y: 1.65, w: 0.5, h: 0.03, fill: { color: C.lightTeal } });
    }
  });

  // Quote at bottom — clean, no box
  c9.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.3, w: 1.2, h: 0.03, fill: { color: C.teal } });
  c9.addText('"Day trading attention." The market tells you what it wants. Your job is to listen.', {
    x: 0.7, y: 4.45, w: 8.6, h: 0.5, fontFace: B, fontSize: 13, color: C.teal, italic: true, margin: 0,
  });

  // ===================== CONTENT 10: METRICS =====================
  let c10 = pres.addSlide();
  c10.background = { color: C.white };
  c10.addText("Track engagement depth, not vanity numbers", { x: 0.7, y: 0.35, w: 9, h: 0.6, fontFace: H, fontSize: 22, color: C.charcoal, bold: true, margin: 0 });

  // Left column — Track
  c10.addText("TRACK THESE", { x: 0.7, y: 1.1, w: 4, h: 0.4, fontFace: H, fontSize: 14, color: C.teal, bold: true, margin: 0 });
  c10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.5, w: 3.5, h: 0.01, fill: { color: C.teal } });
  const trackItems = [
    "Engagement rate per platform",
    "Comments quality & sentiment",
    "Saves, shares, and DMs",
    "Click-through to offers / links",
    "Audience growth velocity",
    "Content-to-conversation ratio",
  ];
  trackItems.forEach((t, i) => {
    c10.addShape(pres.shapes.OVAL, { x: 0.7, y: 1.78 + i * 0.5, w: 0.1, h: 0.1, fill: { color: C.teal } });
    c10.addText(t, { x: 1.05, y: 1.65 + i * 0.5, w: 3.7, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, margin: 0 });
  });

  // Right column — Ignore
  c10.addText("IGNORE THESE", { x: 5.3, y: 1.1, w: 4, h: 0.4, fontFace: H, fontSize: 14, color: C.slate, bold: true, margin: 0 });
  c10.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.5, w: 3.5, h: 0.01, fill: { color: C.lightGray } });
  const ignoreItems = [
    "Vanity follower counts",
    "Likes without engagement",
    "Competitor comparison traps",
    "Short-term viral spikes",
    "Perfection over speed",
  ];
  ignoreItems.forEach((t, i) => {
    c10.addShape(pres.shapes.OVAL, { x: 5.3, y: 1.78 + i * 0.5, w: 0.1, h: 0.1, fill: { color: C.lightGray } });
    c10.addText(t, { x: 5.65, y: 1.65 + i * 0.5, w: 3.7, h: 0.35, fontFace: B, fontSize: 12, color: C.charcoal, margin: 0 });
  });

  // ===================== CLOSING =====================
  let sClose = pres.addSlide();
  sClose.background = { color: C.charcoal };
  sClose.addText("THE FORMULA", { x: 0.8, y: 0.7, w: 8.4, h: 0.5, fontFace: H, fontSize: 14, color: C.teal, bold: true, margin: 0, charSpacing: 6 });
  sClose.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 1.5, h: 0.04, fill: { color: C.teal } });
  sClose.addText("DOCUMENT.\nCHOP.\nDISTRIBUTE.\nLISTEN.\nREPEAT.", {
    x: 0.8, y: 1.4, w: 8.4, h: 3.2, fontFace: H, fontSize: 40, color: C.white, bold: true, margin: 0, lineSpacingMultiple: 1.1,
  });
  sClose.addText("Volume  ×  Authenticity  ×  Platform Context  =  Attention", {
    x: 0.8, y: 4.8, w: 8.4, h: 0.45, fontFace: B, fontSize: 13, color: C.lightTeal, margin: 0,
  });

  await pres.writeFile({ fileName: "/home/assets/garyvee-content-model.pptx" });
  console.log("Done!");
}

main().catch(console.error);
