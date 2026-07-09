const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const {
  FaFlask,
  FaUserMd,
  FaUsers,
  FaNewspaper,
  FaCannabis,
  FaBrain,
  FaPills,
} = require("react-icons/fa");

// ── Helpers ──────────────────────────────────────────────────────────
function renderIconSvg(IconComponent, color = "#FFFFFF", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Color Palette (WWU Brand) ────────────────────────────────────────
const C = {
  navy:       "002147",   // Primary dark navy
  darkNavy:   "0A2D4A",   // Darker shade for cards/sections
  midNavy:    "1A3A5C",   // Mid-tone navy for panels
  panelNavy:  "1E4570",   // Lighter navy for content panels
  blue:       "0077CC",   // Accent blue
  lightBlue:  "4DA6E0",   // Lighter accent blue
  paleBlue:   "B8D4EC",   // Pale blue for muted elements
  steelBlue:  "7A9EBE",   // Steel blue for secondary text
  lime:       "BAD80A",   // Lime green accent (Make Waves)
  darkLime:   "8AB000",   // Darker lime for hover states
  white:      "FFFFFF",
  black:      "000000",
};

const FONT = "Calibri";
const IMG_DIR = path.join(__dirname, "images");

// ── Reusable footer ─────────────────────────────────────────────────
function addFooter(slide, pres) {
  // Thin line above footer
  slide.addShape(pres.shapes.LINE, {
    x: 0.4, y: 5.15, w: 9.2, h: 0,
    line: { color: C.steelBlue, width: 0.5 },
  });
  slide.addText([
    { text: "WESTERN WASHINGTON UNIVERSITY", options: { bold: true, color: C.white, fontSize: 8, charSpacing: 2 } },
    { text: "   |   ", options: { color: C.steelBlue, fontSize: 8 } },
    { text: "MAKE WAVES.", options: { bold: true, color: C.lime, fontSize: 8 } },
  ], { x: 0.4, y: 5.2, w: 6, h: 0.35, fontFace: FONT, margin: 0 });
}

// ── Reusable top accent bar ─────────────────────────────────────────
function addTopBar(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.07,
    fill: { color: C.lime },
  });
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  // Pre-render icons
  const icons = {
    flask:     await iconToBase64Png(FaFlask,   "#FFFFFF"),
    userMd:    await iconToBase64Png(FaUserMd,  "#FFFFFF"),
    users:     await iconToBase64Png(FaUsers,   "#FFFFFF"),
    newspaper: await iconToBase64Png(FaNewspaper, "#FFFFFF"),
    cannabis:  await iconToBase64Png(FaCannabis, "#4DA6E0"),
    brain:     await iconToBase64Png(FaBrain,    "#4DA6E0"),
    pills:     await iconToBase64Png(FaPills,    "#4DA6E0"),
  };

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "BNS Program";
  pres.title = "BNS WWU Give Day 2026";

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ═════════════════════════════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.navy };

  // WWU Logo
  s1.addImage({
    path: path.join(IMG_DIR, "image1.jpg"),
    x: 3.2, y: 0.4, w: 3.6, h: 2.0,
    sizing: { type: "contain", w: 3.6, h: 2.0 },
  });

  // Divider line
  s1.addShape(pres.shapes.LINE, {
    x: 3.0, y: 2.5, w: 4.0, h: 0,
    line: { color: C.lime, width: 2 },
  });

  // Title
  s1.addText("Behavioral Neuroscience Program", {
    x: 0.5, y: 2.8, w: 9, h: 0.8,
    fontFace: FONT, fontSize: 36, color: C.white, bold: true,
    align: "center", margin: 0,
  });

  // Give Day subtitle
  s1.addText([
    { text: "WWU GIVE DAY", options: { bold: true, breakLine: true } },
    { text: "2026" },
  ], {
    x: 0.5, y: 3.7, w: 9, h: 0.8,
    fontFace: FONT, fontSize: 18, color: C.lime,
    align: "center", margin: 0, lineSpacingMultiple: 1.3,
  });

  // Make Waves tagline
  s1.addText("MAKE WAVES.", {
    x: 0.5, y: 4.7, w: 9, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.steelBlue,
    align: "center", charSpacing: 4, margin: 0,
  });

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 2 — Support BNS on WWU Give Day
  // ═════════════════════════════════════════════════════════════════
  let s2 = pres.addSlide();
  // Mountain background image
  s2.background = { path: path.join(IMG_DIR, "image2.jpg") };

  // Dark overlay
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.navy, transparency: 40 },
  });

  s2.addText("Support BNS on WWU Give Day", {
    x: 1.0, y: 1.5, w: 8, h: 0.8,
    fontFace: FONT, fontSize: 32, color: C.white, bold: true,
    align: "center", margin: 0,
  });

  s2.addText([
    { text: 'Behavioral Neuroscience at Western ("BNS") is where students become scientists.', options: { breakLine: true, fontSize: 16 } },
    { text: "One day of giving fuels a year of discovery.", options: { fontSize: 16, italic: true } },
  ], {
    x: 1.5, y: 2.6, w: 7, h: 1.2,
    fontFace: FONT, color: C.white, align: "center", margin: 0,
    lineSpacingMultiple: 1.5,
  });

  addFooter(s2, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 3 — One Day to Fund Their Future
  // ═════════════════════════════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.navy };
  addTopBar(s3, pres);

  s3.addText("One Day to Fund Their Future.", {
    x: 0.5, y: 0.3, w: 5.5, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.white, bold: true, margin: 0,
  });

  // Three numbered steps
  const steps = [
    { num: "1", title: "Choose a program", desc: "Select where your gift goes" },
    { num: "2", title: "Gifts are matched", desc: "Maximize your impact" },
    { num: "3", title: "Every gift counts", desc: "No gift too small" },
  ];

  steps.forEach((step, i) => {
    const y = 1.2 + i * 1.2;

    // Number circle
    s3.addShape(pres.shapes.OVAL, {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fill: { color: C.lime },
    });
    s3.addText(step.num, {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fontFace: FONT, fontSize: 16, color: C.navy, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    // Title + description
    s3.addText(step.title, {
      x: 1.2, y: y, w: 4, h: 0.3,
      fontFace: FONT, fontSize: 16, color: C.white, bold: true, margin: 0,
    });
    s3.addText(step.desc, {
      x: 1.2, y: y + 0.3, w: 4, h: 0.25,
      fontFace: FONT, fontSize: 12, color: C.steelBlue, margin: 0,
    });
  });

  // Give Day image on right
  s3.addImage({
    path: path.join(IMG_DIR, "image3.jpg"),
    x: 5.8, y: 0.6, w: 3.8, h: 4.5,
    sizing: { type: "contain", w: 3.8, h: 4.5 },
  });

  addFooter(s3, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 4 — Small Program. Big Impact.
  // ═════════════════════════════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.navy };
  addTopBar(s4, pres);

  s4.addText("BNS: Small Program. Big Impact.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.white, bold: true, margin: 0,
  });

  // Big stat: 10:1
  s4.addText("10:1", {
    x: 0.5, y: 1.1, w: 4, h: 0.9,
    fontFace: FONT, fontSize: 64, color: C.white, bold: true, italic: true, margin: 0,
  });
  s4.addText("student-to-faculty ratio", {
    x: 0.5, y: 2.0, w: 4, h: 0.3,
    fontFace: FONT, fontSize: 12, color: C.steelBlue, margin: 0,
  });
  s4.addText("Every student gets hands-on mentorship.", {
    x: 0.5, y: 2.4, w: 4.5, h: 0.3,
    fontFace: FONT, fontSize: 14, color: C.lime, bold: true, margin: 0,
  });

  // Divider line
  s4.addShape(pres.shapes.LINE, {
    x: 0.5, y: 2.9, w: 4.2, h: 0,
    line: { color: C.steelBlue, width: 0.5 },
  });

  // OUR STUDENTS label
  s4.addText("OUR STUDENTS", {
    x: 0.5, y: 3.05, w: 4, h: 0.3,
    fontFace: FONT, fontSize: 11, color: C.steelBlue, bold: true,
    charSpacing: 3, margin: 0,
  });

  // Student stats
  const studentStats = [
    { pct: "75%", label: "female students" },
    { pct: "25%", label: "students of color" },
    { pct: "11%", label: "first-generation students" },
  ];

  studentStats.forEach((stat, i) => {
    const y = 3.45 + i * 0.5;
    s4.addText(stat.pct, {
      x: 0.5, y: y, w: 1.0, h: 0.35,
      fontFace: FONT, fontSize: 20, color: C.lime, bold: true, italic: true, margin: 0,
    });
    s4.addText(stat.label, {
      x: 1.6, y: y, w: 3, h: 0.35,
      fontFace: FONT, fontSize: 13, color: C.white, margin: 0, valign: "middle",
    });
    // Divider
    if (i < 2) {
      s4.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + 0.4, w: 4.2, h: 0,
        line: { color: C.midNavy, width: 0.5 },
      });
    }
  });

  // Photo on right
  s4.addImage({
    path: path.join(IMG_DIR, "image4.jpg"),
    x: 5.2, y: 0.7, w: 4.4, h: 4.3,
    sizing: { type: "cover", w: 4.4, h: 4.3 },
  });

  addFooter(s4, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 5 — Graduates Pursue Top Programs
  // ═════════════════════════════════════════════════════════════════
  let s5 = pres.addSlide();
  s5.background = { color: C.navy };
  addTopBar(s5, pres);

  s5.addText("BNS Graduates Pursue Top Programs and Careers.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 24, color: C.white, bold: true, margin: 0,
  });

  // Big center stat
  s5.addText("90%", {
    x: 0.5, y: 1.2, w: 4, h: 1.0,
    fontFace: FONT, fontSize: 72, color: C.lime, bold: true, margin: 0,
  });
  s5.addText([
    { text: "of BNS graduates pursue", options: { breakLine: true } },
    { text: "advanced degrees and research careers" },
  ], {
    x: 0.5, y: 2.2, w: 4, h: 0.7,
    fontFace: FONT, fontSize: 12, color: C.steelBlue, margin: 0,
    lineSpacingMultiple: 1.3,
  });

  // Right side: pathway bars
  const pathways = [
    { label: "Graduate Programs", pct: "40%", pctNum: 40, schools: "Johns Hopkins, Arizona State, OHSU, UT Southwestern, UBC" },
    { label: "Healthcare & Clinical", pct: "35%", pctNum: 35, schools: "UW Medicine, UW Dental, WSU Pharmacy, Seattle Neuropsychiatric" },
    { label: "Research & Industry", pct: "15%", pctNum: 15, schools: "Allen Institute, Fred Hutch, NIH, Gilead Sciences" },
  ];

  pathways.forEach((p, i) => {
    const y = 1.2 + i * 1.3;
    const barW = (p.pctNum / 50) * 4.0;

    s5.addText(p.label, {
      x: 5.2, y: y, w: 4.5, h: 0.3,
      fontFace: FONT, fontSize: 14, color: C.white, bold: true, margin: 0,
    });

    // Progress bar background
    s5.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: y + 0.35, w: 4.3, h: 0.35,
      fill: { color: C.midNavy },
    });
    // Progress bar fill
    s5.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: y + 0.35, w: barW, h: 0.35,
      fill: { color: C.blue },
    });
    // Percentage label
    s5.addText(p.pct, {
      x: 5.3, y: y + 0.35, w: 1, h: 0.35,
      fontFace: FONT, fontSize: 11, color: C.white, bold: true,
      valign: "middle", margin: 0,
    });

    // Schools
    s5.addText(p.schools, {
      x: 5.2, y: y + 0.75, w: 4.5, h: 0.3,
      fontFace: FONT, fontSize: 9, color: C.steelBlue, italic: true, margin: 0,
    });
  });

  addFooter(s5, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 6 — NIH-Funded Research
  // ═════════════════════════════════════════════════════════════════
  let s6 = pres.addSlide();
  s6.background = { color: C.navy };
  addTopBar(s6, pres);

  s6.addText("NIH-Funded, Cutting-Edge Research.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.white, bold: true, margin: 0,
  });

  // Photo on left
  s6.addImage({
    path: path.join(IMG_DIR, "image5.jpg"),
    x: 0.5, y: 1.1, w: 4.0, h: 3.8,
    sizing: { type: "cover", w: 4.0, h: 3.8 },
  });

  // Research labs on right
  const labs = [
    {
      icon: icons.cannabis,
      title: "Kaplan Lab: Cannabis Neuropharmacology",
      desc: "CBD and terpene treatments for autism and epilepsy.",
    },
    {
      icon: icons.brain,
      title: "Rose Lab: Neuroplasticity & Memory",
      desc: "Neuronal self-modification in Alzheimer's disease.",
    },
    {
      icon: icons.pills,
      title: "Grimm Lab: Neurobiology of Relapse",
      desc: "Neurobiological basis of drug relapse and sugar addiction.",
    },
  ];

  labs.forEach((lab, i) => {
    const y = 1.2 + i * 1.35;

    // Icon
    s6.addImage({
      data: lab.icon,
      x: 5.0, y: y + 0.05, w: 0.35, h: 0.35,
    });

    // Title
    s6.addText(lab.title, {
      x: 5.5, y: y, w: 4.2, h: 0.4,
      fontFace: FONT, fontSize: 14, color: C.white, bold: true, margin: 0,
    });

    // Description
    s6.addText(lab.desc, {
      x: 5.5, y: y + 0.45, w: 4.2, h: 0.4,
      fontFace: FONT, fontSize: 11, color: C.steelBlue, margin: 0,
      lineSpacingMultiple: 1.3,
    });
  });

  addFooter(s6, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 7 — Hands-On Experience
  // ═════════════════════════════════════════════════════════════════
  let s7 = pres.addSlide();
  s7.background = { color: C.navy };
  addTopBar(s7, pres);

  s7.addText("Hands-On Experience Sets Students Up for Success.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 24, color: C.white, bold: true, margin: 0,
  });

  // Experience cards on left
  const experiences = [
    { icon: icons.flask, title: "Faculty Research Labs", desc: "Co-author publications and present at national conferences" },
    { icon: icons.userMd, title: "Medical Internships", desc: "Neurosurgery shadowing and TMS technician training" },
    { icon: icons.users, title: "NeRDS Student Club", desc: "Conference travel, K-12 outreach, and community engagement" },
    { icon: icons.newspaper, title: "brainSTEM Magazine", desc: "Student-led science communication publication" },
  ];

  experiences.forEach((exp, i) => {
    const y = 1.1 + i * 1.0;

    // Icon in circle
    s7.addShape(pres.shapes.OVAL, {
      x: 0.5, y: y, w: 0.45, h: 0.45,
      fill: { color: C.blue },
    });
    s7.addImage({
      data: exp.icon,
      x: 0.58, y: y + 0.08, w: 0.3, h: 0.3,
    });

    // Title
    s7.addText(exp.title, {
      x: 1.15, y: y, w: 4, h: 0.3,
      fontFace: FONT, fontSize: 14, color: C.white, bold: true, margin: 0,
    });
    // Description
    s7.addText(exp.desc, {
      x: 1.15, y: y + 0.3, w: 4.5, h: 0.3,
      fontFace: FONT, fontSize: 11, color: C.steelBlue, margin: 0,
    });
  });

  // Photo on right
  s7.addImage({
    path: path.join(IMG_DIR, "image6.jpg"),
    x: 5.8, y: 1.0, w: 3.8, h: 3.9,
    sizing: { type: "cover", w: 3.8, h: 3.9 },
  });

  addFooter(s7, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 8 — Your Gift Gets Us Across the Finish Line
  // ═════════════════════════════════════════════════════════════════
  let s8 = pres.addSlide();
  s8.background = { color: C.navy };
  addTopBar(s8, pres);

  s8.addText("Your Gift Gets Us Across the Finish Line.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.white, bold: true, italic: true, margin: 0,
  });

  // Progress bars for funding goals
  const fundingGoals = [
    { name: "Student Scholarships", goal: 600, funded: 350, toGo: 250 },
    { name: "SfN Conference Travel", goal: 500, funded: 200, toGo: 300 },
    { name: "Paid Research Positions", goal: 400, funded: 100, toGo: 300 },
  ];

  fundingGoals.forEach((g, i) => {
    const y = 1.2 + i * 1.3;
    const barW = 8.2;
    const fundedW = (g.funded / g.goal) * barW;
    const toGoW = barW - fundedW;

    // Label + goal
    s8.addText(g.name, {
      x: 0.5, y: y, w: 5, h: 0.35,
      fontFace: FONT, fontSize: 18, color: C.white, bold: true, margin: 0,
    });
    s8.addText(`Goal: $${g.goal}`, {
      x: 5.5, y: y, w: 3.5, h: 0.35,
      fontFace: FONT, fontSize: 16, color: C.lime, bold: true,
      align: "right", margin: 0,
    });

    // Background bar (to go)
    s8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y + 0.45, w: barW, h: 0.5,
      fill: { color: C.midNavy },
    });

    // Funded bar
    s8.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y + 0.45, w: fundedW, h: 0.5,
      fill: { color: C.blue },
    });

    // Funded label
    s8.addText(`$${g.funded} funded`, {
      x: 0.6, y: y + 0.45, w: fundedW - 0.2, h: 0.5,
      fontFace: FONT, fontSize: 13, color: C.white, bold: true,
      valign: "middle", margin: 0,
    });

    // To go label
    s8.addText(`$${g.toGo} to go`, {
      x: 0.5 + fundedW + 0.2, y: y + 0.45, w: toGoW - 0.3, h: 0.5,
      fontFace: FONT, fontSize: 12, color: C.steelBlue,
      valign: "middle", margin: 0,
    });
  });

  // Bottom tagline
  s8.addText("Every dollar you give goes directly to closing these gaps.", {
    x: 0.5, y: 4.85, w: 9, h: 0.3,
    fontFace: FONT, fontSize: 11, color: C.steelBlue, italic: true,
    align: "center", margin: 0,
  });

  addFooter(s8, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 9 — Help BNS Reach New Heights (Line Chart)
  // ═════════════════════════════════════════════════════════════════
  let s9 = pres.addSlide();
  s9.background = { color: C.navy };
  addTopBar(s9, pres);

  s9.addText("Help BNS Reach New Heights.", {
    x: 0.5, y: 0.3, w: 6, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.white, bold: true, margin: 0,
  });

  // 2026 Goal callout
  s9.addText("2026 Goal", {
    x: 7.5, y: 0.35, w: 2, h: 0.3,
    fontFace: FONT, fontSize: 14, color: C.steelBlue, italic: true,
    align: "right", margin: 0,
  });
  s9.addText("$1,500", {
    x: 7.5, y: 0.6, w: 2, h: 0.5,
    fontFace: FONT, fontSize: 36, color: C.lime, bold: true,
    align: "right", margin: 0,
  });

  // Line chart: Give Day funds over time
  s9.addChart(pres.charts.LINE, [
    {
      name: "Give Day Funds",
      labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
      values: [675, 650, 870, 900, 1360, 1500],
    },
  ], {
    x: 0.5, y: 1.2, w: 9, h: 3.5,
    showTitle: false,
    lineSize: 2,
    lineDataSymbolSize: 8,
    chartColors: [C.blue],
    showValue: true,
    dataLabelColor: C.lightBlue,
    dataLabelFontSize: 10,
    catAxisLabelColor: C.steelBlue,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: C.steelBlue,
    valAxisLabelFontSize: 9,
    valGridLine: { color: C.midNavy, size: 0.5 },
    catGridLine: { style: "none" },
    chartArea: { fill: { color: C.navy } },
    plotArea: { fill: { color: C.navy } },
    showLegend: true,
    legendPos: "b",
    legendColor: C.steelBlue,
    legendFontSize: 10,
    valAxisMinVal: 0,
    valAxisMaxVal: 1600,
    valAxisNumFmt: "$#,##0",
  });

  // Sub-caption
  s9.addText("BNS Give Day funds raised per year", {
    x: 0.5, y: 4.75, w: 9, h: 0.25,
    fontFace: FONT, fontSize: 10, color: C.steelBlue, italic: true,
    align: "center", margin: 0,
  });

  addFooter(s9, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 10 — Testimonials
  // ═════════════════════════════════════════════════════════════════
  let s10 = pres.addSlide();
  s10.background = { color: C.navy };

  // Red/coral top accent for this special slide
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.07,
    fill: { color: C.lime },
  });

  s10.addText("Your Donation Makes Waves That Change Lives.", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 24, color: C.white, bold: true, margin: 0,
  });

  // Testimonial quotes stacked on left
  const testimonials = [
    { from: "From Our Students", quote: "Your stipend funding kept me in the lab and launched my PhD." },
    { from: "From Our Faculty", quote: "Give Day sends students to present at SfN, building careers." },
    { from: "From the BNS Program", quote: "Every dollar funds scholarships, research, and travel." },
    { from: "From Our Community", quote: "Donations bring neuroscience to K-12 classrooms via NeRDS." },
  ];

  testimonials.forEach((t, i) => {
    const y = 1.1 + i * 0.95;
    s10.addText(t.from, {
      x: 0.5, y: y, w: 5, h: 0.3,
      fontFace: FONT, fontSize: 14, color: C.white, bold: true, margin: 0,
    });
    s10.addText(t.quote, {
      x: 0.5, y: y + 0.3, w: 5, h: 0.35,
      fontFace: FONT, fontSize: 11, color: C.steelBlue, italic: true, margin: 0,
    });
  });

  // Donors photo on right
  s10.addImage({
    path: path.join(IMG_DIR, "image7.jpg"),
    x: 5.8, y: 1.0, w: 3.8, h: 3.8,
    sizing: { type: "cover", w: 3.8, h: 3.8 },
  });

  addFooter(s10, pres);

  // ═════════════════════════════════════════════════════════════════
  // SLIDE 11 — Thank You
  // ═════════════════════════════════════════════════════════════════
  let s11 = pres.addSlide();
  s11.background = { color: C.navy };

  s11.addText("Thank You for Supporting BNS on WWU Give Day", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontFace: FONT, fontSize: 24, color: C.white, bold: true,
    align: "center", margin: 0,
  });

  // Group photo centered
  s11.addImage({
    path: path.join(IMG_DIR, "image8.jpg"),
    x: 1.5, y: 1.2, w: 7, h: 3.8,
    sizing: { type: "contain", w: 7, h: 3.8 },
  });

  addFooter(s11, pres);

  // ═════════════════════════════════════════════════════════════════
  // Write to file
  // ═════════════════════════════════════════════════════════════════
  const outputPath = path.join(__dirname, "BNS_Give_Day_2026.pptx");
  await pres.writeFile({ fileName: outputPath });
  console.log("Presentation saved to: " + outputPath);
}

main().catch(console.error);
