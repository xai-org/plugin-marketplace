const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ── Color palette (re-skinned) ─────────────────────────────────
const C = {
  bg:       "0A1628",   // dark navy slide background
  accent:   "00B4D8",   // unified teal/cyan accent
  accent2:  "2E6B8A",   // darker muted blue (chart shade)
  muted:    "5B9BBF",   // blue-gray (chart / slide-11 number 3)
  coral:    "FF7B7B",   // coral / salmon for contrast stats
  white:    "FFFFFF",
  gray:     "888888",
  lineGray: "1E2D45",   // divider lines
  offWhite: "F9F9F9",   // near-white (chart labels)
};

// ── Fonts ──────────────────────────────────────────────────────
const TITLE_FONT  = "Segoe UI Light (Headings)";
const BODY_FONT   = "Segoe UI";

// ── Helpers ────────────────────────────────────────────────────
const TOTAL_SLIDES = 12;

function addTopAccentLine(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: C.accent }, line: { type: "none" },
  });
}

function addPageNumber(slide, num) {
  slide.addText(`${num} / ${TOTAL_SLIDES}`, {
    x: 8.858, y: 5.25, w: 0.442, h: 0.25,
    fontSize: 8, fontFace: BODY_FONT, color: C.white, align: "right", margin: 0,
  });
}

function addBottomDivider(slide) {
  slide.addShape("line", {
    x: 0.7, y: 5.25, w: 8.6, h: 0,
    line: { color: C.lineGray, width: 0.5 },
  });
}

function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.7, y: 0.4, w: 8.6, h: 0.5,
    fontSize: 24, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: 0.95, w: 8.6, h: 0.28,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
    });
  }
}

function addSectionHeader(slide, text, x, y, w) {
  slide.addText(text, {
    x, y, w, h: 0.22,
    fontSize: 15, fontFace: BODY_FONT, color: C.accent, bold: true,
    charSpacing: 2, margin: 0,
  });
}

function makeBgSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  return slide;
}

// ── Main ───────────────────────────────────────────────────────
async function buildPresentation() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Community Health Access Initiative";
  pres.title  = "Patient Accessibility Survey";

  // ════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.65, y: 1.207, w: 0.06, h: 2.2,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addText([
      { text: "Patient", options: { breakLine: true } },
      { text: "Accessibility Survey" },
    ], {
      x: 0.9, y: 1.207, w: 4.779, h: 2.2,
      fontSize: 48, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("Understanding Barriers to Care in the Community", {
      x: 0.9, y: 3.975, w: 7.0, h: 0.35,
      fontSize: 20, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addShape("line", {
      x: 0.9, y: 4.45, w: 8.2, h: 0,
      line: { color: C.lineGray, width: 0.5 },
    });
    s.addText("Community Health Access Initiative, Oregon", {
      x: 0.9, y: 4.6, w: 5.0, h: 0.25,
      fontSize: 11, fontFace: BODY_FONT, color: C.white, margin: 0,
    });
    s.addText("April 2026", {
      x: 0.9, y: 4.85, w: 3.0, h: 0.25,
      fontSize: 11, fontFace: BODY_FONT, color: C.white, margin: 0,
    });
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 2 — Executive Summary
  //   EDITS: subtitle text updated (removed "compounding" and trailing period);
  //          64% → 63% (Uninsured); dividers between stat cells removed.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Executive Summary",
      "35 patients reveal barriers to care, underscoring the critical need for community clinic funding");

    const stats = [
      { pct: "91%", label: "Positive on Free Clinics",    color: C.accent, x: 1.21,  w: 1.82,  lx: 1.21 },
      { pct: "79%", label: "30 Min Commute or Less",      color: C.accent, x: 4.258, w: 1.743, lx: 4.28 },
      { pct: "58%", label: "Unaware of Services",         color: C.accent, x: 7.2,   w: 1.743, lx: 7.2  },
      { pct: "63%", label: "Uninsured",                   color: C.coral,  x: 1.21,  w: 2.8,   lx: 1.21 },
      { pct: "82%", label: "No Primary Care",             color: C.coral,  x: 4.26,  w: 2.8,   lx: 4.28 },
      { pct: "48%", label: "Cannot Distinguish TB Types", color: C.coral,  x: 7.2,   w: 2.8,   lx: 7.2  },
    ];
    stats.forEach((st, i) => {
      const row = Math.floor(i / 3);
      const y = row === 0 ? 1.6 : 3.25;
      const labelY = row === 0 ? 2.35 : 4.007;
      s.addText(st.pct, {
        x: st.x, y, w: st.w, h: 0.7,
        fontSize: 60, fontFace: TITLE_FONT, color: st.color, bold: true, margin: 0,
      });
      s.addText(st.label, {
        x: st.lx, y: labelY, w: 2.8, h: 0.25,
        fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
    });
    addBottomDivider(s);
    addPageNumber(s, 1);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 3 — Demographics
  //   EDITS: GENDER header centered over donut; donut legend shown
  //          (Women/Men/Non-Binary); AVERAGE AGE header and "29 ± 9 years"
  //          re-centered under donut.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Young, Diverse, and Predominantly Women",
      "Demographic characteristics (n=35)");

    addSectionHeader(s, "GENDER", 1.4, 1.49, 2.5);
    s.addChart(pres.charts.DOUGHNUT, [{
      name: "Gender",
      labels: ["Women", "Men", "Non-Binary"],
      values: [54, 40, 6],
    }], {
      x: 0.93, y: 1.645, w: 3.391, h: 2.466,
      chartColors: [C.coral, C.muted, C.accent],
      showPercent: true,
      showTitle: false,
      showLegend: true,
      legendPos: "b",
      legendFontSize: 10,
      legendColor: C.offWhite,
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 12,
    });

    addSectionHeader(s, "AVERAGE AGE", 1.4, 4.35, 2.5);
    s.addText("29 ± 9 years", {
      x: 1.4, y: 4.6, w: 2.5, h: 0.4,
      fontSize: 18, fontFace: TITLE_FONT, color: C.white, bold: true,
      align: "center", margin: 0,
    });

    addSectionHeader(s, "RACE AND ETHNICITY", 5.07, 1.49, 4.0);
    s.addChart(pres.charts.BAR, [{
      name: "Race",
      labels: ["Latino/a/x / Hispanic", "Black / African American", "Asian / Asian American", "White / Caucasian", "MENA / SW Asian", "Multiracial"],
      values: [11, 8, 7, 5, 2, 2],
    }], {
      x: 4.9, y: 1.706, w: 4.5, h: 3.0,
      barDir: "bar",
      chartColors: [C.muted],
      showValue: true,
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 10,
      dataLabelPosition: "outEnd",
      catAxisLabelColor: C.offWhite,
      catAxisLabelFontSize: 10,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    addBottomDivider(s);
    addPageNumber(s, 2);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 4 — Geography / Metro Area
  //   EDITS: map image added to the left side manually in PowerPoint.
  //          Code does not recreate the image (external asset) — layout
  //          for right-side stats and city list unchanged.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Patients Come From Across the Metro Area");

    // NOTE: A Portland metro map image was added manually in PowerPoint
    // on the left side (approx. x:0.5, y:1.2, w:5.5, h:3.5). To recreate,
    // call s.addImage({ path: "./metro_map.png", ... }) here.

    // Cluster legend at bottom-left (coral dots, white labels)
    const clusters = [
      { dotX: 0.685, dotY: 4.825, dotW: 0.13, dotH: 0.13, labelX: 0.9,   labelText: "Large cluster (10+)"  },
      { dotX: 2.652, dotY: 4.845, dotW: 0.09, dotH: 0.09, labelX: 2.847, labelText: "Medium cluster (4-9)" },
      { dotX: 4.725, dotY: 4.865, dotW: 0.05, dotH: 0.05, labelX: 4.9,   labelText: "Small cluster (1-3)"  },
    ];
    clusters.forEach(c => {
      s.addShape(pres.shapes.OVAL, {
        x: c.dotX, y: c.dotY, w: c.dotW, h: c.dotH,
        fill: { color: C.coral }, line: { type: "none" },
      });
      s.addText(c.labelText, {
        x: c.labelX, y: 4.8, w: 1.8, h: 0.18,
        fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
    });

    // 29 stat
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.35, y: 1.275, w: 0.04, h: 0.6,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addText("29", {
      x: 6.49, y: 1.225, w: 0.95, h: 0.5,
      fontSize: 34, fontFace: TITLE_FONT, color: C.accent, bold: true, margin: 0,
    });
    s.addText("of 35 patients", {
      x: 7.084, y: 1.262, w: 2.0, h: 0.3,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("from 3 metro counties", {
      x: 6.49, y: 1.695, w: 2.5, h: 0.2,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // 83% stat
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.35, y: 2.122, w: 0.04, h: 0.6,
      fill: { color: C.coral }, line: { type: "none" },
    });
    s.addText("83%", {
      x: 6.49, y: 2.072, w: 1.4, h: 0.5,
      fontSize: 34, fontFace: TITLE_FONT, color: C.coral, bold: true, margin: 0,
    });
    s.addText("concentration", {
      x: 7.829, y: 2.237, w: 1.511, h: 0.2,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("in Portland metro area", {
      x: 6.49, y: 2.545, w: 2.5, h: 0.2,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // PATIENTS BY CITY (coral header)
    s.addText("PATIENTS BY CITY", {
      x: 6.4, y: 2.995, w: 2.5, h: 0.18,
      fontSize: 12, fontFace: BODY_FONT, color: C.coral, bold: true, charSpacing: 3, margin: 0,
    });
    const cities = [
      ["Portland", "12"], ["Gresham", "6"], ["Beaverton", "4"],
      ["Hillsboro", "3"], ["Lake Oswego", "2"], ["Milwaukie", "2"],
    ];
    cities.forEach((c, i) => {
      s.addText([
        { text: c[0] + "\t", options: { color: C.white, fontSize: 12 } },
        { text: c[1],        options: { color: C.coral, fontSize: 13, bold: true } },
      ], {
        x: 6.45, y: 3.225 + i * 0.24, w: 2.394, h: 0.2,
        fontFace: BODY_FONT, margin: 0,
      });
    });

    addBottomDivider(s);
    addPageNumber(s, 3);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 5 — Transportation / Travel Time
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "79% Reach the Clinic Within 30 Minutes",
      "Ease of transportation and travel time (n=35)");

    // LEFT: Ease of Transportation
    addSectionHeader(s, "EASE OF TRANSPORTATION", 0.95, 1.58, 4.0);
    const easeTotal = 18 + 10 + 4 + 3;
    const easeData = [
      { val: 18, color: C.accent,  label: "18" },
      { val: 10, color: C.accent2, label: "10" },
      { val: 4,  color: C.muted,   label: "4"  },
      { val: 3,  color: C.coral,   label: "3"  },
    ];
    let easeX = 0.796;
    const barW = 4.2, barY = 1.95, barH = 0.5;
    easeData.forEach(d => {
      const w = (d.val / easeTotal) * barW;
      s.addShape(pres.shapes.RECTANGLE, {
        x: easeX, y: barY, w, h: barH,
        fill: { color: d.color }, line: { type: "none" },
      });
      s.addText(d.label, {
        x: easeX, y: barY, w, h: barH,
        fontSize: 12, fontFace: BODY_FONT, color: C.white,
        align: "center", valign: "middle", margin: 0,
      });
      easeX += w;
    });
    s.addText([
      { text: "■ Strongly Agree  ",    options: { color: C.accent,  fontSize: 9 } },
      { text: "■ Agree  ",             options: { color: C.accent2, fontSize: 9 } },
      { text: "■ Neither  ",           options: { color: C.muted,   fontSize: 9 } },
      { text: "■ Strongly Disagree",   options: { color: C.coral,   fontSize: 9 } },
    ], { x: 0.796, y: 2.55, w: 4.2, h: 0.3, fontFace: BODY_FONT, margin: 0 });

    // RIGHT: Travel Time
    addSectionHeader(s, "TRAVEL TIME", 5.569, 1.58, 4.0);
    const travelTotal = 12 + 16 + 7;
    const travelData = [
      { val: 12, color: C.accent, label: "12" },
      { val: 16, color: C.muted,  label: "16" },
      { val: 7,  color: C.coral,  label: "7"  },
    ];
    let travelX = 5.45;
    const tBarW = 4.2;
    travelData.forEach(d => {
      const w = (d.val / travelTotal) * tBarW;
      s.addShape(pres.shapes.RECTANGLE, {
        x: travelX, y: barY, w, h: barH,
        fill: { color: d.color }, line: { type: "none" },
      });
      s.addText(d.label, {
        x: travelX, y: barY, w, h: barH,
        fontSize: 12, fontFace: BODY_FONT, color: C.white,
        align: "center", valign: "middle", margin: 0,
      });
      travelX += w;
    });
    s.addText([
      { text: "■ 15 min or less  ", options: { color: C.accent, fontSize: 9 } },
      { text: "■ 15 to 30 min  ",   options: { color: C.muted,  fontSize: 9 } },
      { text: "■ Over 30 min",      options: { color: C.coral,  fontSize: 9 } },
    ], { x: 5.45, y: 2.55, w: 4.2, h: 0.3, fontFace: BODY_FONT, margin: 0 });

    // Big stat callouts
    s.addText("80%", {
      x: 0.95, y: 3.45, w: 1.8, h: 0.7,
      fontSize: 52, fontFace: TITLE_FONT, color: C.accent, bold: true, margin: 0,
    });
    s.addText("agree or strongly agree", {
      x: 2.508, y: 3.625, w: 3.0, h: 0.35,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
    });
    s.addText("79%", {
      x: 5.569, y: 3.45, w: 1.8, h: 0.7,
      fontSize: 52, fontFace: TITLE_FONT, color: C.accent, bold: true, margin: 0,
    });
    s.addText("travel 30 minutes or less", {
      x: 7.092, y: 3.625, w: 3.0, h: 0.35,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addBottomDivider(s);
    addPageNumber(s, 4);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 6 — Staff Communication / Website
  //   EDITS: STAFF COMMUNICATION and WEBSITE INTERACTION now stack
  //          vertically on the left column; the left-side "Preferred
  //          Languages" (staff) chart was removed; a single simplified
  //          Preferred Languages chart remains on the right, with 5 bars
  //          shown as percentages (English 85%, Spanish 6%, Vietnamese 3%,
  //          Somali 3%, Other 3%).
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Staff Communication Is Strong, Website Needs Languages",
      "Language preferences and proficiency (n=35)");

    // LEFT COLUMN — Staff Communication (top)
    addSectionHeader(s, "STAFF COMMUNICATION", 1.0, 1.492, 4.0);
    s.addText("91%", {
      x: 1.0, y: 1.705, w: 1.671, h: 0.8,
      fontSize: 52, fontFace: TITLE_FONT, color: C.accent, bold: true, margin: 0,
    });
    s.addText("agree it is easy to communicate with staff", {
      x: 2.7, y: 1.85, w: 2.6, h: 0.6,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // LEFT COLUMN — Website Interaction (bottom, stacked below staff)
    addSectionHeader(s, "WEBSITE INTERACTION", 1.0, 3.05, 4.0);
    s.addText("89%", {
      x: 1.0, y: 3.26, w: 1.671, h: 0.8,
      fontSize: 52, fontFace: TITLE_FONT, color: C.accent, bold: true, margin: 0,
    });
    s.addText("say the website meets their needs", {
      x: 2.7, y: 3.41, w: 2.6, h: 0.6,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // RIGHT COLUMN — Single Preferred Languages chart (percentages, 5 bars)
    addSectionHeader(s, "PREFERRED LANGUAGES", 5.714, 1.492, 4.0);
    s.addChart(pres.charts.BAR, [{
      name: "Preferred Languages",
      labels: ["English", "Spanish", "Vietnamese", "Somali", "Other"],
      values: [85, 6, 3, 3, 3],
    }], {
      x: 5.329, y: 1.7, w: 3.848, h: 3.4,
      barDir: "bar",
      chartColors: [C.muted],
      showValue: true,
      dataLabelFormatCode: '0"%"',
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 10,
      dataLabelPosition: "outEnd",
      catAxisLabelColor: C.offWhite,
      catAxisLabelFontSize: 10,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    addBottomDivider(s);
    addPageNumber(s, 5);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 7 — Insurance / Primary Care
  //   EDITS: Title "64%" → "63%"; "36% Insured" → "37% Insured";
  //          "64% Uninsured" → "63% Uninsured". Bar split updated
  //          to 37/63.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    s.addText("63% Uninsured, 82% Lack a Primary Care Provider", {
      x: 0.7, y: 0.4, w: 8.6, h: 0.5,
      fontSize: 24, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("This clinic is their only safety net", {
      x: 0.7, y: 0.95, w: 3.186, h: 0.28,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addSectionHeader(s, "INSURANCE STATUS",      0.951, 1.679, 4.0);
    addSectionHeader(s, "PRIMARY CARE PROVIDER", 5.3,   1.679, 4.0);

    // 37% block (upper-left)
    s.addText("37%", {
      x: 0.951, y: 2.111, w: 1.8, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.accent, margin: 0,
    });
    s.addText("Insured", {
      x: 2.307, y: 2.248, w: 1.358, h: 0.3,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("13 of 35 patients", {
      x: 2.307, y: 2.503, w: 1.358, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // Teal + coral stacked mini-bars (37/63 split over total width 3.386)
    const barTotal = 1.26 + 2.126; // 3.386
    const insuredW = barTotal * 0.37;  // ~1.253
    const uninsuredW = barTotal * 0.63; // ~2.133
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.951, y: 2.969, w: insuredW, h: 0.286,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.951 + insuredW, y: 2.969, w: uninsuredW, h: 0.286,
      fill: { color: C.coral }, line: { type: "none" },
    });

    // 63% block (lower)
    s.addText("63%", {
      x: 2.986, y: 3.364, w: 1.351, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.coral, margin: 0,
    });
    s.addText("Uninsured", {
      x: 1.574, y: 3.478, w: 1.26, h: 0.3,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true,
      align: "right", margin: 0,
    });
    s.addText("22 of 35 patients", {
      x: 1.581, y: 3.763, w: 1.253, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, align: "right", margin: 0,
    });

    // RIGHT column — 82% PCP
    s.addText("82%", {
      x: 5.3, y: 2.189, w: 3.0, h: 0.72,
      fontSize: 48, fontFace: TITLE_FONT, color: C.coral, margin: 0,
    });
    s.addText("have NO current primary care provider", {
      x: 5.3, y: 2.839, w: 4.55, h: 0.5,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("Only 6 of 35 patients reported having a PCP", {
      x: 5.3, y: 3.239, w: 4.0, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // Bottom callout
    s.addText("This population relies entirely on free clinic infrastructure. Any funding disruption pushes patients toward ER utilization.", {
      x: 0.7, y: 4.83, w: 8.729, h: 0.45,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addBottomDivider(s);
    addPageNumber(s, 6);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 8 — Free Clinics Adequate / Awareness
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "91% See Free Clinics as Adequate",
      "Perception of care quality and service awareness (n=35)");

    addSectionHeader(s, "ARE FREE CLINICS ADEQUATE?", 1.0, 1.5, 4.0);
    s.addChart(pres.charts.BAR, [{
      name: "Adequate",
      labels: ["Strongly\nAgree", "Agree", "Neither", "Disagree"],
      values: [22, 10, 2, 1],
    }], {
      x: 0.7, y: 1.739, w: 4.2, h: 2.4,
      barDir: "col",
      chartColors: [C.accent, C.accent2, C.muted, C.coral],
      showValue: true,
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 10,
      dataLabelPosition: "outEnd",
      catAxisLabelColor: C.offWhite,
      catAxisLabelFontSize: 9,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    // Large 91% under left chart
    s.addText("91%", {
      x: 1.853, y: 4.071, w: 1.5, h: 0.5,
      fontSize: 36, fontFace: TITLE_FONT, color: C.accent, margin: 0,
    });
    s.addText("agree or strongly agree", {
      x: 2.955, y: 4.196, w: 3.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // RIGHT: Awareness
    addSectionHeader(s, "AWARENESS OF OTHER SERVICES", 5.3, 1.5, 4.3);
    // 58% Not Aware
    s.addText("58%", {
      x: 5.3, y: 1.9, w: 1.8, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.coral, margin: 0,
    });
    s.addText("Not Aware", {
      x: 7.15, y: 1.99, w: 2.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("20 of 35 respondents", {
      x: 7.15, y: 2.26, w: 2.5, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });
    s.addShape("line", {
      x: 5.3, y: 2.65, w: 4.3, h: 0,
      line: { color: C.lineGray, width: 0.5 },
    });
    // 42% Aware
    s.addText("42%", {
      x: 5.3, y: 2.8, w: 1.8, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.accent, margin: 0,
    });
    s.addText("Aware", {
      x: 7.15, y: 2.89, w: 2.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("15 of 35 respondents", {
      x: 7.15, y: 3.16, w: 2.5, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // Bottom callout
    s.addText("Patients trust the care model but don't know what's available. Targeted outreach could convert awareness into utilization.", {
      x: 0.7, y: 4.825, w: 8.6, h: 0.45,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addBottomDivider(s);
    addPageNumber(s, 7);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 9 — TB Literacy
  //   EDITS: Right-side text simplified to three plain-weight paragraphs
  //          (bold mixed-run formatting removed) with proper vertical
  //          spacing so paragraphs no longer overlap.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "TB Literacy Is Critically Low",
      '"I am familiar with tuberculosis," patient self-assessment (n=35)');

    s.addChart(pres.charts.BAR, [{
      name: "TB Familiarity",
      labels: ["Strongly\nAgree", "Agree", "Neither", "Disagree", "Strongly\nDisagree"],
      values: [5, 6, 7, 11, 6],
    }], {
      x: 0.615, y: 1.475, w: 4.756, h: 3.3,
      barDir: "col",
      chartColors: [C.accent, C.muted, C.accent2, C.coral, C.coral],
      showValue: true,
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 10,
      dataLabelPosition: "outEnd",
      catAxisLabelColor: C.offWhite,
      catAxisLabelFontSize: 9,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    addSectionHeader(s, "TB LITERACY GAP", 5.8, 1.7, 3.5);

    s.addText("Only 31% express confidence in their TB knowledge.", {
      x: 5.8, y: 2.15, w: 2.9, h: 0.6,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    s.addText("This clinic serves a population at elevated risk for latent TB infection.", {
      x: 5.8, y: 2.95, w: 2.9, h: 0.7,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    s.addText("Education investment will directly reduce diagnostic delays and transmission.", {
      x: 5.8, y: 3.85, w: 2.9, h: 0.8,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addBottomDivider(s);
    addPageNumber(s, 8);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 10 — TB Types Knowledge
  //   EDITS: Right-side doughnut chart replaced with column chart
  //          (Strongly Agree=4, Agree=3, Neither=5, Disagree=12,
  //          Strongly Disagree=11), styled to match slide 9's chart.
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Most Cannot Distinguish TB Types",
      "TB knowledge deep-dive (n=35)");

    addSectionHeader(s, "ACTIVE VS. LATENT TB",             1.0,   1.5, 4.0);
    addSectionHeader(s, "TREATMENT REGIMEN FAMILIARITY",    4.883, 1.5, 4.417);

    // LEFT — 51% Familiar / 49% Not Familiar callouts
    s.addText("51%", {
      x: 1.0, y: 2.026, w: 1.8, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.accent, margin: 0,
    });
    s.addText("Familiar", {
      x: 2.64, y: 2.125, w: 2.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText([
      { text: "18 of 35 ",   options: { fontSize: 11 } },
      { text: "respondents", options: { fontSize: 12 } },
    ], {
      x: 2.64, y: 2.395, w: 2.5, h: 0.25,
      fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    s.addShape("line", {
      x: 0.867, y: 2.82, w: 3.512, h: 0,
      line: { color: C.lineGray, width: 0.5 },
    });

    s.addText("49%", {
      x: 1.0, y: 2.899, w: 1.8, h: 0.7,
      fontSize: 48, fontFace: TITLE_FONT, color: C.coral, margin: 0,
    });
    s.addText("Not Familiar", {
      x: 2.64, y: 2.975, w: 2.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
    });
    s.addText("17 of 35 respondents", {
      x: 2.64, y: 3.245, w: 2.5, h: 0.25,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    // RIGHT — column chart (replaces former doughnut)
    s.addChart(pres.charts.BAR, [{
      name: "Treatment Familiarity",
      labels: ["Strongly\nAgree", "Agree", "Neither", "Disagree", "Strongly\nDisagree"],
      values: [4, 3, 5, 12, 11],
    }], {
      x: 4.883, y: 1.815, w: 4.5, h: 2.8,
      barDir: "col",
      chartColors: [C.accent, C.muted, C.accent2, C.coral, C.coral],
      showValue: true,
      dataLabelColor: C.offWhite,
      dataLabelFontSize: 10,
      dataLabelPosition: "outEnd",
      catAxisLabelColor: C.offWhite,
      catAxisLabelFontSize: 9,
      valAxisHidden: true,
      valGridLine: { style: "none" },
      catGridLine: { style: "none" },
      showLegend: false,
    });

    s.addText("48% cannot distinguish TB types and 66% are unfamiliar with treatment. This dual knowledge gap amplifies non-adherence risk.", {
      x: 0.7, y: 4.68, w: 8.689, h: 0.45,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
    });

    addBottomDivider(s);
    addPageNumber(s, 9);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 11 — Three Priority Investments
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    addSlideTitle(s, "Three Priority Investments to Close Critical Barriers");

    addSectionHeader(s, "PRIORITY",   0.942, 1.23,  1.2);
    addSectionHeader(s, "INITIATIVE", 2.268, 1.238, 3.0);
    addSectionHeader(s, "IMPACT",     6.002, 1.245, 2.6);

    s.addShape("line", {
      x: 0.942, y: 1.51, w: 8.0, h: 0,
      line: { color: C.lineGray, width: 1 },
    });

    const rows = [
      { num: "1", color: C.accent, title: "Expand Insurance Navigation",
        desc: "Benefits counselor to enroll uninsured patients in Medi-Cal and Covered CA.",
        impact: ["Stabilizes revenue,", "reduces uncompensated care"],
        y: 1.68, dividerY: 2.68 },
      { num: "2", color: C.coral,  title: "Launch TB Literacy Program",
        desc: "Multilingual workshops and CHW outreach for TB education and LTBI screening.",
        impact: ["Earlier detection,", "better treatment adherence"],
        y: 2.83, dividerY: 3.83 },
      { num: "3", color: C.muted,  title: "Multilingual Digital Outreach",
        desc: "Website in top 5 languages plus SMS reminders for service awareness.",
        impact: ["Higher utilization,", "fewer ER visits"],
        y: 3.98, dividerY: null },
    ];

    rows.forEach(r => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.942, y: r.y, w: 0.04, h: 0.9,
        fill: { color: r.color }, line: { type: "none" },
      });
      s.addText(r.num, {
        x: 1.092, y: r.y, w: 0.6, h: 0.5,
        fontSize: 28, fontFace: TITLE_FONT, color: r.color, bold: true, margin: 0,
      });
      s.addText(r.title, {
        x: 2.268, y: r.y, w: 3.14, h: 0.35,
        fontSize: 14, fontFace: BODY_FONT, color: C.white, bold: true, margin: 0,
      });
      s.addText(r.desc, {
        x: 2.268, y: r.y + 0.38, w: 3.387, h: 0.4,
        fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
      s.addText([
        { text: r.impact[0], options: { bold: true, breakLine: true } },
        { text: r.impact[1], options: { bold: true } },
      ], {
        x: 6.021, y: r.y + 0.02, w: 2.888, h: 0.5,
        fontSize: 14, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
      if (r.dividerY !== null) {
        s.addShape("line", {
          x: 0.942, y: r.dividerY, w: 8.0, h: 0,
          line: { color: C.lineGray, width: 0.5 },
        });
      }
    });

    addBottomDivider(s);
    addPageNumber(s, 10);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 12 — The Ask
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);
    s.addText("The Ask", {
      x: 0.7, y: 0.4, w: 8.6, h: 0.5,
      fontSize: 24, fontFace: TITLE_FONT, color: C.white, bold: true, margin: 0,
    });

    s.addText("Total Annual Investment", {
      x: 1.0, y: 1.3, w: 8.0, h: 0.3,
      fontSize: 15, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", margin: 0,
    });
    s.addText("$175K  to  $235K", {
      x: 1.0, y: 1.65, w: 8.0, h: 0.8,
      fontSize: 52, fontFace: TITLE_FONT, color: C.accent, bold: true, align: "center", margin: 0,
    });

    const costs = [
      { title: ["Insurance Navigation", "and Benefits Counselor"], amount: "$85K to $110K", tx: 0.7,   ax: 0.7,   nx: 1.246 },
      { title: ["TB Literacy Program",  "and CHW Staffing"],       amount: "$60K to $80K",  tx: 4.046, ax: 4.05,  nx: 4.662 },
      { title: ["Multilingual Digital", "and Outreach Campaign"],  amount: "$30K to $45K",  tx: 7.117, ax: 7.114, nx: 7.726 },
    ];
    costs.forEach(c => {
      s.addText([
        { text: c.title[0], options: { bold: true, breakLine: true } },
        { text: c.title[1], options: { bold: true } },
      ], {
        x: c.tx, y: 2.9, w: 2.8, h: 0.55,
        fontSize: 15, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
      s.addText(c.amount, {
        x: c.ax, y: 3.55, w: 2.8, h: 0.5,
        fontSize: 24, fontFace: TITLE_FONT, color: C.coral, bold: true, margin: 0,
      });
      s.addText("per year", {
        x: c.nx, y: 4.025, w: 2.8, h: 0.25,
        fontSize: 12, fontFace: BODY_FONT, color: C.white, margin: 0,
      });
    });

    addBottomDivider(s);
    addPageNumber(s, 11);
  }

  // ════════════════════════════════════════════════════════════
  // SLIDE 13 — Thank You
  // ════════════════════════════════════════════════════════════
  {
    const s = makeBgSlide(pres);
    addTopAccentLine(s, pres);

    s.addText("Thank You", {
      x: 2.542, y: 0.7, w: 4.917, h: 1.2,
      fontSize: 60, fontFace: TITLE_FONT, color: C.white, bold: true, align: "center", margin: 0,
    });

    s.addShape("line", {
      x: 4.0, y: 2.1, w: 2.0, h: 0,
      line: { color: C.accent, width: 2 },
    });

    s.addText([
      { text: "Every data point represents a person navigating", options: { breakLine: true } },
      { text: "the healthcare system without a safety net.",      options: { breakLine: true } },
      { text: "Your investment changes that." },
    ], {
      x: 2.542, y: 2.4, w: 4.917, h: 1.0,
      fontSize: 14, fontFace: BODY_FONT, color: C.white, align: "center", margin: 0,
    });

    s.addShape("line", {
      x: 1.0, y: 3.7, w: 8.0, h: 0,
      line: { color: C.lineGray, width: 0.5 },
    });

    s.addText("Community Health Access Initiative", {
      x: 2.642, y: 3.95, w: 4.717, h: 0.35,
      fontSize: 16, fontFace: BODY_FONT, color: C.white, bold: true, align: "center", margin: 0,
    });
    s.addText("Dr. Maya Richardson, Director of Community Health Programs", {
      x: 2.542, y: 4.35, w: 4.917, h: 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, align: "center", margin: 0,
    });
    s.addText("m.richardson@chaccess.org  |  (503) 555-0147", {
      x: 2.242, y: 4.65, w: 5.517, h: 0.3,
      fontSize: 12, fontFace: BODY_FONT, color: C.white, align: "center", margin: 0,
    });

    addPageNumber(s, 12);
  }

  // ── Write file ─────────────────────────────────────────────
  const outPath = "/home/assets/Patient_Accessibility_Survey_Revised.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("Presentation saved to:", outPath);
}

buildPresentation().catch(console.error);
