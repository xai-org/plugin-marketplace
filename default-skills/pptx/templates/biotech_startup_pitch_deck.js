const pptxgen = require("pptxgenjs");

// All pre-cropped images live here
const CROPPED = "/home/assets/cropped";
// Raw images that were manually replaced by the user in V5
const UPLOADS = "/mnt/user-data/uploads";

async function buildDeck() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
  pres.author = "Bactobio";
  pres.title = "Bactobio - Unlocking Microbial Dark Matter";

  const FONT = "Poppins";

  // Color palette: blue + pink
  const C = {
    bgBlue: "E4EDF5",
    bgPink: "F5E8EE",
    bgPinkMid: "E8D0DA",
    deepNavy: "1A2B5C",
    richNavy: "1A1F3A",
    softBlue: "8CB4E0",
    accentBlue: "3A5A8C",
    deepMagenta: "7A1F5C",
    softPink: "C4A0B8",
    darkText: "1A1A2E",
    medText: "3A3A4E",
    lightText: "FFFFFF",
    mutedLight: "B8C4C8",
    offWhite: "F7F5F2",
    darkGreen: "142E1E",
  };

  // ====================================================================
  // SLIDE 1: TITLE
  // Left half: dark navy. Right half: bactobio petri dish image (flush).
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.richNavy };

    // Right half: petri dish image flush right, full height
    slide.addImage({ path: `${CROPPED}/s2_bactobio.jpg`, x: 5.0, y: 0, w: 5.0, h: 5.625 });

    slide.addText("BACTOBIO", {
      x: 0.7, y: 0.9, w: 4.2, h: 0.8,
      fontFace: FONT, fontSize: 42, bold: true, color: C.lightText,
      charSpacing: 8, margin: 0
    });

    slide.addText([
      { text: "We unlock microbes for", options: { breakLine: true } },
      { text: "a safer and greener world" }
    ], {
      x: 0.7, y: 2.6, w: 4.2, h: 0.85,
      fontFace: FONT, fontSize: 22, bold: true, color: C.softBlue, margin: 0
    });

    slide.addText("London, UK  \u2022  Founded 2020  \u2022  bactobio.com", {
      x: 0.7, y: 4.8, w: 4.2, h: 0.4,
      fontFace: FONT, fontSize: 9, color: C.mutedLight, margin: 0
    });
  }

  // ====================================================================
  // SLIDE 2: THE CRISIS
  // Left: pink bg with text/stats. Right: bacteria microscopy image.
  // User replaced the image with a new bacteria visual (Picture10).
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgPink };

    slide.addText("The Crisis", {
      x: 0.7, y: 0.5, w: 4.5, h: 0.7,
      fontFace: FONT, fontSize: 40, bold: true, color: C.deepMagenta, margin: 0
    });

    slide.addText([
      { text: "Antimicrobial resistance is a ", options: {} },
      { text: "global emergency.", options: { bold: true } },
      { text: " The UN and WHO have declared AMR a critical systemic risk that threatens modern medicine.", options: {} },
    ], {
      x: 0.7, y: 1.4, w: 4.3, h: 1.0,
      fontFace: FONT, fontSize: 11.5, color: "5C2A42", lineSpacingMultiple: 1.4, margin: 0
    });

    slide.addText("1.27M", {
      x: 0.7, y: 2.7, w: 2, h: 0.6,
      fontFace: FONT, fontSize: 36, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText("deaths per year attributed to\ndrug resistant infections", {
      x: 0.7, y: 3.25, w: 2.2, h: 0.5,
      fontFace: FONT, fontSize: 10, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.2
    });

    slide.addText("10M", {
      x: 3.2, y: 2.7, w: 2, h: 0.6,
      fontFace: FONT, fontSize: 36, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText("projected annual deaths\nby 2050 if unchecked", {
      x: 3.2, y: 3.25, w: 2.2, h: 0.5,
      fontFace: FONT, fontSize: 10, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.2
    });

    slide.addText([
      { text: "<3%", options: { bold: true, fontSize: 18, color: C.deepMagenta } },
      { text: "  of nature's potential natural products have been identified to date.", options: { fontSize: 11, color: "5C2A42" } }
    ], {
      x: 0.7, y: 4.1, w: 4.5, h: 0.5, fontFace: FONT, margin: 0, valign: "middle"
    });

    // Right: bacteria image (user replaced with Picture10 — a blue/orange microscopy)
    // The user's image is embedded. Reference the uploaded version or the cropped original.
    // Using the image from the unpacked V5 media folder.
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image2.png", x: 5.5, y: 0, w: 4.5, h: 5.625 });
  }

  // ====================================================================
  // SLIDE 3: AMR CHART
  // Headline enlarged. Subtitle italic. Chart with axis labels. Pink stat panel.
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.offWhite };

    slide.addText("The Pipeline Is Running Dry", {
      x: 0.5, y: 0.2, w: 9.2, h: 0.7,
      fontFace: FONT, fontSize: 36, bold: true, color: C.deepNavy, margin: 0
    });

    slide.addText("As resistance accelerates, new antibiotic discovery has stalled. We are in a closing window.", {
      x: 0.5, y: 0.95, w: 8, h: 0.35,
      fontFace: FONT, fontSize: 11, italic: true, color: C.medText, margin: 0
    });

    slide.addChart(pres.charts.LINE, [{
      name: "Projected AMR Deaths (Millions)",
      labels: ["2020", "2025", "2030", "2035", "2040", "2045", "2050"],
      values: [1.27, 2.0, 3.2, 4.8, 6.5, 8.2, 10.0]
    }], {
      x: 0.7, y: 1.4, w: 5.3, h: 4.0,
      lineSize: 3, lineSmooth: true,
      chartColors: [C.deepMagenta],
      chartArea: { fill: { color: "FFFFFF" }, roundedCorners: true },
      catAxisLabelColor: "64748B", valAxisLabelColor: "64748B",
      catAxisLabelFontSize: 9, valAxisLabelFontSize: 9,
      catAxisLabelFontFace: FONT, valAxisLabelFontFace: FONT,
      valGridLine: { color: "E8E0E0", size: 0.5 },
      catGridLine: { style: "none" },
      showValue: false, showLegend: false, showMarker: true, markerSize: 6,
      catAxisTitle: "Year", showCatAxisTitle: true,
      catAxisTitleColor: C.deepMagenta, catAxisTitleFontSize: 10, catAxisTitleFontFace: FONT,
      valAxisTitle: "Projected AMR deaths (millions)", showValAxisTitle: true,
      valAxisTitleColor: "64748B", valAxisTitleFontSize: 9, valAxisTitleFontFace: FONT,
    });

    // Right stat panel — evenly distributed
    const panelTop = 1.4;
    const panelH = 4.0;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 6.5, y: panelTop, w: 3.2, h: panelH, fill: { color: C.bgPink }
    });
    slide.addText("By the Numbers", {
      x: 6.8, y: panelTop + 0.2, w: 2.8, h: 0.35,
      fontFace: FONT, fontSize: 15, bold: true, color: C.deepMagenta, margin: 0
    });
    const stats = [
      { num: "$100B+", label: "estimated global economic\nburden per year" },
      { num: "43", label: "antibiotics in clinical trials\nvs. 4,500+ cancer drugs" },
      { num: "0", label: "new antibiotic classes in the\nlast 30 years for gram negative" },
    ];
    const sTop = panelTop + 0.7;
    const sBot = panelTop + panelH - 0.3;
    const sBlock = (sBot - sTop) / 3;
    for (let i = 0; i < stats.length; i++) {
      const y = sTop + i * sBlock;
      slide.addText(stats[i].num, {
        x: 6.8, y: y, w: 2.8, h: 0.4,
        fontFace: FONT, fontSize: 24, bold: true, color: C.deepMagenta, margin: 0
      });
      slide.addText(stats[i].label, {
        x: 6.8, y: y + 0.42, w: 2.8, h: 0.45,
        fontFace: FONT, fontSize: 9, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.2
      });
    }
  }

  // ====================================================================
  // SLIDE 4: OUR MISSION
  // Top: forest floor hero (user replaced with mushroom/fungi image).
  // Bottom: dark green panel with text + single petri dish inset right.
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.darkGreen };

    // Hero image (user's mushroom forest floor — Picture10 from slide4)
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image3.jpg", x: 0, y: 0, w: 10, h: 3.2 });

    slide.addText("Our Mission", {
      x: 0.7, y: 3.35, w: 5, h: 0.5,
      fontFace: FONT, fontSize: 30, bold: true, color: "7CC49E", margin: 0
    });

    slide.addText([
      { text: "Create a safer and greener world", options: { bold: true, color: C.lightText } },
      { text: " by harvesting valuable metabolites from microbial dark matter, the ", options: { color: C.mutedLight } },
      { text: "99% of soil bacteria", options: { bold: true, color: C.lightText } },
      { text: " that have never been cultured in a laboratory.", options: { color: C.mutedLight } },
    ], {
      x: 0.7, y: 3.95, w: 5.5, h: 0.9,
      fontFace: FONT, fontSize: 12, lineSpacingMultiple: 1.5, margin: 0
    });

    // Single petri dish inset (user removed scientist hands, kept only petri)
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image4.png", x: 7.0, y: 3.2, w: 2.8, h: 2.4 });

    slide.addText("Formerly Baccuico  \u2022  Founded 2020, London", {
      x: 0.7, y: 5.15, w: 5, h: 0.3,
      fontFace: FONT, fontSize: 9, color: "5A8A6A", margin: 0
    });
  }

  // ====================================================================
  // SLIDE 5: MICROBIAL DARK MATTER
  // Left: blue bg, headline, body, 3 stat boxes. Right: soil cross section.
  // User changed headline to single line "Microbial Dark Matter".
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgBlue };

    slide.addText("Microbial Dark Matter", {
      x: 0.7, y: 0.5, w: 6.5, h: 0.7,
      fontFace: FONT, fontSize: 38, bold: true, color: C.deepNavy, margin: 0
    });

    slide.addText([
      { text: "Science has only scratched the surface.", options: { bold: true, breakLine: true } },
      { text: "The vast majority of soil microorganisms cannot", options: { breakLine: true } },
      { text: "be grown using traditional lab methods. This unexplored", options: { breakLine: true } },
      { text: "biological diversity is a treasure trove of novel chemistry,", options: { breakLine: true } },
      { text: "including compounds with entirely new modes of action." }
    ], {
      x: 0.7, y: 1.5, w: 5.2, h: 1.5,
      fontFace: FONT, fontSize: 11, color: "2A3A5C", lineSpacingMultiple: 1.5, margin: 0
    });

    const statData = [
      { pct: "99%", label: "of soil bacteria\nRemain uncultured\nand unexplored" },
      { pct: "<3%", label: "of natural products\nhave been identified" },
      { pct: "\u221E", label: "novel compounds waiting to\nbe discovered" },
    ];
    let sx = 0.7;
    for (const s of statData) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: sx, y: 3.6, w: 1.9, h: 1.5, fill: { color: "FFFFFF", transparency: 50 }
      });
      slide.addText(s.pct, {
        x: sx + 0.2, y: 3.75, w: 1.5, h: 0.5,
        fontFace: FONT, fontSize: 28, bold: true, color: C.deepNavy, margin: 0
      });
      slide.addText(s.label, {
        x: sx + 0.2, y: 4.3, w: 1.5, h: 0.6,
        fontFace: FONT, fontSize: 9, color: "2A3A5C", margin: 0, lineSpacingMultiple: 1.2
      });
      sx += 2.05;
    }

    slide.addImage({ path: `${CROPPED}/s5_soil.jpg`, x: 7.0, y: 0, w: 3, h: 5.625 });
  }

  // ====================================================================
  // SLIDE 6: DISCOVERY DRIVEN BY BIOACTIVITY
  // Left: scientist pipetting. Right: pink bg, headline, body, focus callout.
  // User changed headline to "Discovery Driven / By Bioactivity".
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgPink };

    slide.addImage({ path: `${CROPPED}/s7_pipetting.jpg`, x: 0, y: 0, w: 4.5, h: 5.625 });

    slide.addText([
      { text: "Discovery Driven", options: { breakLine: true } },
      { text: "By Bioactivity" }
    ], {
      x: 5.0, y: 0.5, w: 4.5, h: 0.9,
      fontFace: FONT, fontSize: 30, bold: true, color: C.deepMagenta, margin: 0
    });

    slide.addText([
      { text: "Our approach is target agnostic.", options: { bold: true, breakLine: true } },
      { text: "Rather than searching for compounds that hit", options: { breakLine: true } },
      { text: "predetermined targets, we let nature guide us", options: { breakLine: true } },
      { text: "toward molecules with genuinely novel", options: { breakLine: true } },
      { text: "mechanisms of action." }
    ], {
      x: 5.0, y: 1.6, w: 4.5, h: 1.4,
      fontFace: FONT, fontSize: 11, color: "5C2A42", lineSpacingMultiple: 1.5, margin: 0
    });

    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.0, y: 3.4, w: 4.7, h: 1.6, fill: { color: C.bgPinkMid }
    });
    slide.addText("Current Focus", {
      x: 5.25, y: 3.6, w: 3.5, h: 0.35,
      fontFace: FONT, fontSize: 14, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText([
      { text: "P. aeruginosa", options: { bold: true, italic: true } },
      { text: ", a WHO top priority critical pathogen", options: { breakLine: true } },
      { text: "and a leading cause of hospital acquired", options: { breakLine: true } },
      { text: "infections with limited treatment options." }
    ], {
      x: 5.25, y: 4.0, w: 4.0, h: 0.85,
      fontFace: FONT, fontSize: 10, color: "5C2A42", lineSpacingMultiple: 1.4, margin: 0
    });
  }

  // ====================================================================
  // SLIDE 7: TRACTION AND MARKET
  // Two sections with equal title weight. Bottom: two lab images.
  // User reworked layout with stacked value/description in market cards.
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgBlue };

    // Traction section
    slide.addText("Traction", {
      x: 0.7, y: 0.3, w: 4, h: 0.5,
      fontFace: FONT, fontSize: 22, bold: true, color: C.deepNavy, margin: 0
    });

    const metrics = [
      { val: "\u00A310M+", label: "raised from\nprivate investors" },
      { val: "\u00A34M", label: "in grant funding including\nInnovate UK Biomedical Catalyst" },
      { val: "40+", label: "employees across\n3 laboratories" },
    ];
    let mx = 0.5;
    for (const m of metrics) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: mx, y: 0.95, w: 2.85, h: 1.15, fill: { color: "FFFFFF", transparency: 50 }
      });
      slide.addText(m.val, {
        x: mx + 0.3, y: 1.0, w: 2.3, h: 0.45,
        fontFace: FONT, fontSize: 24, bold: true, color: C.deepNavy, margin: 0
      });
      slide.addText(m.label, {
        x: mx + 0.3, y: 1.47, w: 2.3, h: 0.5,
        fontFace: FONT, fontSize: 9, color: C.medText, margin: 0, lineSpacingMultiple: 1.3
      });
      mx += 3.05;
    }

    // Market Opportunity section
    slide.addText("Market Opportunity", {
      x: 0.7, y: 2.35, w: 5, h: 0.5,
      fontFace: FONT, fontSize: 22, bold: true, color: C.deepNavy, margin: 0
    });

    const markets = [
      { title: "Antibiotics", val: "$58B+", note: "by 2028, 4%+ CAGR" },
      { title: "Ag Biologicals", val: "$20B+", note: "by 2028, fastest growing segment" },
      { title: "Environmental Biotech", val: "15B+", note: "by 2030, regulatory driven" },
    ];
    let mmx = 0.5;
    for (const m of markets) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: mmx, y: 3.0, w: 2.85, h: 1.15, fill: { color: C.deepNavy, transparency: 85 }
      });
      slide.addText(m.title, {
        x: mmx + 0.3, y: 3.05, w: 2.3, h: 0.22,
        fontFace: FONT, fontSize: 9, bold: true, color: C.accentBlue, margin: 0
      });
      slide.addText(m.val, {
        x: mmx + 0.3, y: 3.28, w: 2.3, h: 0.45,
        fontFace: FONT, fontSize: 22, bold: true, color: C.deepNavy, margin: 0
      });
      slide.addText(m.note, {
        x: mmx + 0.3, y: 3.75, w: 2.3, h: 0.3,
        fontFace: FONT, fontSize: 8.5, color: "4A5A7A", margin: 0
      });
      mmx += 3.05;
    }

    // Bottom images (v2 versions)
    slide.addImage({ path: `${CROPPED}/s7_collab_v2.jpg`, x: 0.5, y: 4.35, w: 4.3, h: 1.15 });
    slide.addImage({ path: `${CROPPED}/s7_liquid_v2.jpg`, x: 5.0, y: 4.35, w: 4.5, h: 1.15 });
  }

  // ====================================================================
  // SLIDE 8: LEADERSHIP
  // Co-founders top. Divider. Team photo left, Advisory Network right.
  // User rearranged: team photo beside advisory text.
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgPink };

    slide.addText("Leadership", {
      x: 0.7, y: 0.25, w: 5, h: 0.55,
      fontFace: FONT, fontSize: 32, bold: true, color: C.deepMagenta, margin: 0
    });

    // Daniel Hansen
    slide.addImage({ path: `${CROPPED}/s9_daniel.jpg`, x: 0.7, y: 0.95, w: 1.2, h: 1.2 });
    slide.addText("Dr. Daniel Hansen", {
      x: 2.05, y: 0.95, w: 2.5, h: 0.3,
      fontFace: FONT, fontSize: 13, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText("Co Founder and CEO", {
      x: 2.05, y: 1.25, w: 2.5, h: 0.22,
      fontFace: FONT, fontSize: 9, color: "5C2A42", margin: 0
    });
    slide.addText("Drives company vision, investor\nrelations, and commercial strategy.", {
      x: 2.05, y: 1.52, w: 2.8, h: 0.45,
      fontFace: FONT, fontSize: 9, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.3
    });

    // Mark Wilkinson
    slide.addImage({ path: `${CROPPED}/s9_mark.jpg`, x: 5.2, y: 0.95, w: 1.2, h: 1.2 });
    slide.addText("Dr. Mark Wilkinson", {
      x: 6.55, y: 0.95, w: 2.8, h: 0.3,
      fontFace: FONT, fontSize: 13, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText("Co Founder and CSO", {
      x: 6.55, y: 1.25, w: 2.8, h: 0.22,
      fontFace: FONT, fontSize: 9, color: "5C2A42", margin: 0
    });
    slide.addText("Leads scientific direction, R&D pipeline,\nand laboratory operations.", {
      x: 6.55, y: 1.52, w: 3.0, h: 0.45,
      fontFace: FONT, fontSize: 9, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.3
    });

    // Divider
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 2.35, w: 9.0, h: 0.03, fill: { color: C.softPink }
    });

    // Team photo on left, Advisory Network on right
    // Team photo: use the image from V5 (image11.png) — the AVIF converted version
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image11.png", x: 0.5, y: 2.7, w: 5.5, h: 2.7 });

    slide.addText("Advisory Network", {
      x: 6.3, y: 2.85, w: 3.2, h: 0.35,
      fontFace: FONT, fontSize: 14, bold: true, color: C.deepMagenta, margin: 0
    });
    slide.addText([
      { text: "Former leaders from ", options: {} },
      { text: "Novozymes, Monsanto, Abcam, Goldman Sachs,", options: { bold: true } },
      { text: " and ", options: {} },
      { text: "JP Morgan", options: { bold: true } },
      { text: " bring deep expertise across biotech, agriculture, and capital markets.", options: {} },
    ], {
      x: 6.3, y: 3.35, w: 3.3, h: 1.5,
      fontFace: FONT, fontSize: 11, color: "5C2A42", margin: 0, lineSpacingMultiple: 1.4
    });
  }

  // ====================================================================
  // SLIDE 9: PARTNERSHIPS AND BEYOND ANTIBIOTICS
  // Title enlarged to single line. Two panels + two bottom images.
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.bgBlue };

    slide.addText("Partnerships and Beyond Antibiotics", {
      x: 0.7, y: 0.35, w: 9, h: 0.7,
      fontFace: FONT, fontSize: 30, bold: true, color: C.deepNavy, margin: 0
    });

    // Key Partnerships box
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.3, w: 4.2, h: 2.5, fill: { color: "FFFFFF", transparency: 50 }
    });
    slide.addText("Key Partnerships", {
      x: 0.75, y: 1.45, w: 3.5, h: 0.3,
      fontFace: FONT, fontSize: 13, bold: true, color: C.deepNavy, margin: 0
    });
    const partners = [
      "Innovate UK, Biomedical Catalyst Grant",
      "Microbiology Society, Collaboration Partner",
      "UKRI CYBER Mission,\nEnvironmental Restoration",
    ];
    let py = 1.95;
    for (const p of partners) {
      slide.addText(p, {
        x: 0.85, y: py, w: 3.6, h: 0.45,
        fontFace: FONT, fontSize: 10, color: "2A3A5C", margin: 0, valign: "middle"
      });
      py += 0.55;
    }

    // Platform Expansion box
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.0, y: 1.3, w: 4.5, h: 2.5, fill: { color: "D0DCE8" }
    });
    slide.addText("Platform Expansion", {
      x: 5.25, y: 1.45, w: 4, h: 0.3,
      fontFace: FONT, fontSize: 13, bold: true, color: C.deepNavy, margin: 0
    });
    slide.addText("Agricultural Biofungicides", {
      x: 5.35, y: 1.9, w: 3.5, h: 0.25,
      fontFace: FONT, fontSize: 11, bold: true, color: C.accentBlue, margin: 0
    });
    slide.addText("Targeting crop pathogens like potato late blight\nwith natural alternatives to chemical treatments.", {
      x: 5.35, y: 2.15, w: 3.8, h: 0.5,
      fontFace: FONT, fontSize: 9.5, color: "2A3A5C", margin: 0, lineSpacingMultiple: 1.3
    });
    slide.addText("Environmental Restoration", {
      x: 5.35, y: 2.8, w: 3.5, h: 0.25,
      fontFace: FONT, fontSize: 11, bold: true, color: C.accentBlue, margin: 0
    });
    slide.addText("UKRI funded CYBER mission partner for soil\nand ecosystem recovery.", {
      x: 5.35, y: 3.05, w: 3.8, h: 0.45,
      fontFace: FONT, fontSize: 9.5, color: "2A3A5C", margin: 0, lineSpacingMultiple: 1.3
    });

    // Bottom images (user replaced with different crops — using V5 media)
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image13.jpg", x: 0.5, y: 4.05, w: 4.4, h: 1.4 });
    slide.addImage({ path: "/home/assets/unpacked_v5/ppt/media/image12.jpg", x: 5.1, y: 4.05, w: 4.4, h: 1.4 });
  }

  // ====================================================================
  // SLIDE 10: CLOSING
  // Top: meadow hero. Bottom: dark navy panel. Right accent bar.
  // User changed headline to "Unlock Nature's Potential" (single line, on image).
  // ====================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.richNavy };

    // Meadow hero with title overlay
    slide.addImage({ path: `${CROPPED}/s11_meadow.jpg`, x: 0, y: 0, w: 10, h: 3.2 });

    // Dark overlay for text readability
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0.8, w: 10, h: 1.5, fill: { color: C.richNavy, transparency: 50 }
    });

    slide.addText("Unlock Nature's Potential", {
      x: 0.5, y: 1.0, w: 9, h: 0.8,
      fontFace: FONT, fontSize: 40, bold: true, color: C.softBlue, margin: 0
    });

    slide.addText([
      { text: "Bactobio is building the platform to discover and develop", options: { breakLine: true } },
      { text: "nature's next generation of life saving and planet protecting", options: { breakLine: true } },
      { text: "compounds. We invite partners and investors to help us", options: { breakLine: true } },
      { text: "scale our mission for global impact." }
    ], {
      x: 0.7, y: 3.6, w: 6.5, h: 1.1,
      fontFace: FONT, fontSize: 13, color: C.mutedLight, margin: 0, lineSpacingMultiple: 1.45
    });

    slide.addText("info@bactobio.com  \u2022  bactobio.com  \u2022  London, UK", {
      x: 0.7, y: 4.9, w: 5, h: 0.3,
      fontFace: FONT, fontSize: 10, color: C.softBlue, margin: 0
    });

    // Right accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 7.8, y: 3.2, w: 2.2, h: 2.425, fill: { color: "1A2B4A" }
    });
    slide.addText("BACTOBIO", {
      x: 7.9, y: 3.8, w: 2.0, h: 0.45,
      fontFace: FONT, fontSize: 18, bold: true, color: C.softBlue, charSpacing: 5, margin: 0
    });
    slide.addText("A Safer and\nGreener World", {
      x: 7.9, y: 4.3, w: 2.0, h: 0.5,
      fontFace: FONT, fontSize: 10.5, color: C.mutedLight, margin: 0, lineSpacingMultiple: 1.3
    });
  }

  const outPath = "/home/assets/Bactobio_Pitch_Deck_from_js.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("Deck saved:", outPath);
}

buildDeck().catch(err => { console.error(err); process.exit(1); });
