const pptxgen = require("pptxgenjs");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "The Racial Unemployment Gap in the United States";

  const C = {
    navy: "1B2A4A", dk: "0F1B33", slate: "2D3E50", teal: "0E7C86",
    gold: "D4A843", off: "FAFAF7", wg: "E8E4DD", tx: "2C2C2C",
    mu: "6B7280", wh: "FFFFFF", lt: "E6F4F5", red: "B03A2E",
    grn: "1D7A4E", dkgold: "A07D2E"
  };
  const H = "Century Gothic";
  const B = "Calibri";
  const TS = 20;
  const LSP = 1.5;

  // ── S1: TITLE ──
  let s = pres.addSlide(); s.background = { color: C.dk };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.6, w: 10, h: 1.025, fill: { color: C.navy } });
  s.addText("THE RACIAL\nUNEMPLOYMENT GAP", {
    x: 0.8, y: 1.0, w: 8.4, h: 2.2, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, lineSpacingMultiple: 1.1
  });
  s.addText("What We Know, What We Don't, and Why It Matters", {
    x: 0.8, y: 3.2, w: 8, h: 0.5, fontFace: B, fontSize: 18,
    color: C.gold, italic: true
  });
  s.addText("Author | Institution | April, 2026", {
    x: 0.8, y: 4.85, w: 8, h: 0.4, fontFace: B, fontSize: 12, color: C.wg
  });

  // ── S2: WHAT IS THE GAP ──
  s = pres.addSlide(); s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addText("A PERSISTENT 2:1 RATIO WITH MURKY HISTORICAL MEASUREMENT FOR NEARLY 100 YEARS", {
    x: 0.5, y: 0.18, w: 9.2, h: 0.65, fontFace: H, fontSize: TS,
    color: C.gold, bold: true, margin: 0
  });

  s.addText("2:1", {
    x: 0.3, y: 0.95, w: 3.2, h: 1.5, fontFace: H, fontSize: 68,
    color: C.wh, bold: true, align: "center", valign: "middle"
  });

  s.addText([
    { text: "The ratio of Black to white unemployment in the U.S.", options: { bold: true, fontSize: 16, color: C.wh } },
    { text: "\nIt has never again fallen below 1.5:1.", options: { fontSize: 13, color: C.wg } },
  ], {
    x: 3.7, y: 0.95, w: 5.8, h: 1.3, fontFace: B,
    valign: "middle", lineSpacingMultiple: LSP
  });

  s.addText("1940", {
    x: 4.1, y: 3.5, w: 1.8, h: 0.7, fontFace: H, fontSize: 34,
    color: C.gold, bold: true, align: "center", valign: "middle"
  });
  s.addText("PRE-1940", {
    x: 0.5, y: 2.9, w: 3.5, h: 0.35, fontFace: H, fontSize: 14,
    color: C.gold, bold: true, align: "right", margin: 0, valign: "middle"
  });
  s.addText("POST-1940", {
    x: 6.0, y: 2.9, w: 3.5, h: 0.35, fontFace: H, fontSize: 14,
    color: C.gold, bold: true, align: "left", margin: 0, valign: "middle"
  });

  s.addShape(pres.shapes.LINE, { x: 0.5, y: 3.35, w: 3.5, h: 0, line: { color: C.gold, width: 1.5 } });
  s.addShape(pres.shapes.LINE, { x: 6.0, y: 3.35, w: 3.5, h: 0, line: { color: C.gold, width: 1.5 } });

  s.addText([
    { text: "\"Gainful worker\" concept — anyone with an occupation counted as workforce", options: { bullet: true, breakLine: true, fontSize: 11, color: C.wg } },
    { text: "Only decennial snapshots; no monthly survey", options: { bullet: true, breakLine: true, fontSize: 11, color: C.wg } },
    { text: "Enumeration methods varied across decades", options: { bullet: true, fontSize: 11, color: C.wg } },
  ], { x: 0.5, y: 3.45, w: 3.5, h: 1.3, fontFace: B, valign: "top", paraSpaceAfter: 3 });

  s.addText([
    { text: "Modern \"labor force\" framework (employed / unemployed / not in labor force)", options: { bullet: true, breakLine: true, fontSize: 11, color: C.wg } },
    { text: "Monthly Current Population Survey begins", options: { bullet: true, breakLine: true, fontSize: 11, color: C.wg } },
    { text: "Consistent methodology across years", options: { bullet: true, fontSize: 11, color: C.wg } },
  ], { x: 6.0, y: 3.45, w: 3.5, h: 1.3, fontFace: B, valign: "top", paraSpaceAfter: 3 });

  s.addShape(pres.shapes.LINE, { x: 0.5, y: 4.85, w: 9.0, h: 0, line: { color: C.gold, width: 0.75, dashType: "dash" } });
  s.addText([
    { text: "These issues matter most because ", options: { fontSize: 11, color: C.wg } },
    { text: "the definitional shift itself makes pre/post-1940 comparisons significantly harder", options: { fontSize: 11, color: C.gold, bold: true } },
    { text: " — precisely when the gap appears to have emerged.", options: { fontSize: 11, color: C.wg } },
  ], { x: 0.5, y: 4.95, w: 9.0, h: 0.35, fontFace: B, valign: "middle", align: "center", margin: 0 });

  s.addText("Sources: BLS Handbook of Methods; Fairlie & Sundstrom (1999); U.S. Census Bureau", {
    x: 0.5, y: 5.35, w: 9, h: 0.2, fontFace: B, fontSize: 8, color: C.mu
  });

  // ── S3: TIMELINE ──
  s = pres.addSlide(); s.background = { color: C.off };
  s.addText("ACADEMIC CONSENSUS: THE GAP EMERGED BETWEEN THE 1930s AND EARLY 1940s", {
    x: 0.5, y: 0.2, w: 9.2, h: 0.55, fontFace: H, fontSize: TS,
    color: C.navy, bold: true, margin: 0
  });

  const tlX0 = 0.8, tlW = 8.4, tlY = 3.05;
  const yr = (y) => tlX0 + (y - 1880) / 140 * tlW;

  s.addShape(pres.shapes.RECTANGLE, { x: tlX0, y: tlY, w: tlW, h: 0.04, fill: { color: C.navy } });
  for (let y = 1880; y <= 2020; y += 20) {
    const x = yr(y);
    s.addShape(pres.shapes.RECTANGLE, { x, y: tlY - 0.1, w: 0.02, h: 0.24, fill: { color: C.navy } });
    s.addText(String(y), {
      x: x - 0.3, y: tlY + 0.2, w: 0.6, h: 0.25,
      fontFace: B, fontSize: 8, color: C.mu, align: "center", margin: 0
    });
  }

  s.addShape(pres.shapes.RECTANGLE, {
    x: yr(1880), y: tlY - 0.35, w: yr(1930) - yr(1880), h: 0.3,
    fill: { color: C.teal, transparency: 80 }
  });
  s.addText("Near parity (~0.92)", {
    x: yr(1880), y: tlY - 0.7, w: yr(1930) - yr(1880), h: 0.25,
    fontFace: B, fontSize: 8, color: C.teal, align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: yr(1930), y: tlY - 0.5, w: yr(1942) - yr(1930), h: 0.55,
    fill: { color: C.red, transparency: 85 }
  });
  s.addText("Emergence\nwindow", {
    x: yr(1930), y: tlY - 0.5, w: yr(1942) - yr(1930), h: 0.55,
    fontFace: B, fontSize: 8, color: C.red, bold: true,
    align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: yr(1950), y: tlY - 0.35, w: yr(2020) - yr(1950), h: 0.3,
    fill: { color: C.gold, transparency: 80 }
  });
  s.addText("2:1 ratio persistent", {
    x: yr(1950), y: tlY - 0.7, w: yr(2020) - yr(1950), h: 0.25,
    fontFace: B, fontSize: 9, color: C.dkgold, bold: true, align: "center", margin: 0
  });

  function addEv(year, label, yTop) {
    const x = yr(year);
    s.addShape(pres.shapes.OVAL, {
      x: x - 0.08, y: tlY - 0.08, w: 0.2, h: 0.2, fill: { color: C.teal }
    });
    s.addText(label, {
      x: x - 0.6, y: yTop, w: 1.2, h: 0.25,
      fontFace: B, fontSize: 7.5, color: C.teal, align: "center", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x, y: yTop + 0.28, w: 0, h: tlY - yTop - 0.38,
      line: { color: C.teal, width: 1, dashType: "dash" }
    });
  }
  addEv(1933, "New Deal (1933)", 1.05);
  addEv(1964, "Civil Rights Act", 1.05);
  addEv(1996, "Welfare Reform", 1.05);

  function addAc(year, label, yBot) {
    const x = yr(year);
    s.addShape(pres.shapes.LINE, {
      x, y: tlY + 0.08, w: 0, h: yBot - tlY - 0.08,
      line: { color: C.red, width: 1, dashType: "dot" }
    });
    s.addText(label, {
      x: x - 1.0, y: yBot, w: 2.0, h: 0.5,
      fontFace: B, fontSize: 7.5, color: C.red, align: "center", italic: true, margin: 0
    });
  }
  addAc(1890, "Vedder & Gallaway (1992):\n\"small or nonexistent\n1890-1940\"", 3.7);
  addAc(1933, "Sundstrom (1992):\ngap in urban areas\nduring Depression", 4.35);

  const s97x = yr(1942);
  s.addShape(pres.shapes.LINE, {
    x: s97x, y: tlY + 0.08, w: 0, h: 3.7 - tlY - 0.08,
    line: { color: C.red, width: 1, dashType: "dot" }
  });
  s.addText("Sundstrom (1997):\ngap in urban North\nbefore 1940", {
    x: s97x - 0.1, y: 3.7, w: 1.8, h: 0.5,
    fontFace: B, fontSize: 7.5, color: C.red, align: "left", italic: true, margin: 0
  });

  const fs99x = yr(1948);
  s.addText("Fairlie & Sundstrom (1999):\n\"widened dramatically\nduring the 1940s\"", {
    x: fs99x - 1.0, y: 1.55, w: 2.0, h: 0.5,
    fontFace: B, fontSize: 7.5, color: C.red, align: "center", italic: true, margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: fs99x, y: 2.05, w: 0, h: tlY - 2.15,
    line: { color: C.red, width: 1, dashType: "dot" }
  });
  s.addShape(pres.shapes.OVAL, {
    x: fs99x - 0.06, y: tlY - 0.06, w: 0.16, h: 0.16, fill: { color: C.red }
  });

  // ── S4: CHART ──
  s = pres.addSlide(); s.background = { color: C.off };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.gold } });
  s.addText("70 YEARS HAVE NOT CLOSED THE 2:1 GAP. THE CIVIL RIGHTS ACT, RECESSIONS, AND WELFARE REFORM, HAVE CHANGED NOTHING", {
    x: 0.5, y: 0.15, w: 9.2, h: 0.7, fontFace: H, fontSize: TS,
    color: C.navy, bold: true, margin: 0
  });

  const labels = ["1954","1958","1962","1966","1970","1974","1978","1982","1986","1990","1994","1998","2002","2006","2010","2014","2018","2022"];
  const whiteUE = [5.0,6.1,4.9,3.3,4.5,5.6,5.2,8.6,6.0,4.8,5.3,3.9,5.1,4.0,8.7,5.3,3.5,3.2];
  const blackUE = [9.9,12.6,10.9,7.3,8.2,10.5,11.9,18.9,14.5,11.4,11.5,8.9,10.2,8.9,16.0,11.3,6.5,6.1];

  s.addChart(pres.charts.LINE, [
    { name: "White", labels, values: whiteUE },
    { name: "Black", labels, values: blackUE },
  ], {
    x: 0.4, y: 1.3, w: 9.2, h: 3.6,
    chartColors: [C.teal, C.gold], lineSize: 2.5, lineSmooth: false,
    showLegend: true, legendPos: "b", legendFontSize: 9,
    catAxisLabelColor: C.mu, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.mu, valAxisLabelFontSize: 9, valAxisMaxVal: 22,
    valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
    showTitle: false,
  });

  const pX0 = 1.0, pW = 8.3, y0 = 1954, y1 = 2022;
  const xY = (y) => pX0 + (y - y0) / (y1 - y0) * pW;
  [[1964, "Civil Rights\nAct"], [1980, "Deindust.\nBegins"], [1996, "Welfare\nReform"], [2009, "Great\nRecession"]].forEach(([year, lbl]) => {
    const x = xY(year);
    s.addText(lbl, {
      x: x - 0.4, y: 0.9, w: 0.8, h: 0.42,
      fontFace: B, fontSize: 7, color: C.red,
      align: "center", valign: "bottom", margin: 0
    });
    s.addShape(pres.shapes.LINE, {
      x, y: 1.3, w: 0, h: 3.1,
      line: { color: C.red, width: 1.2, dashType: "dash" }
    });
  });
  s.addText("Data: BLS CPS (annual averages, approximate). Dashed lines mark events.", {
    x: 0.4, y: 5.25, w: 9, h: 0.2, fontFace: B, fontSize: 8, color: C.mu
  });

  // ── S5: CAUSES ──
  s = pres.addSlide(); s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addText("PLACEHOLDER", {
    x: 0.5, y: 0.25, w: 9.2, h: 0.65, fontFace: H, fontSize: TS,
    color: C.gold, bold: true, margin: 0
  });

  const causeRows = [
    { n: 1, name: "Discrimination", desc: "Employers prefer white candidates at the hiring gate" },
    { n: 2, name: "Human Capital", desc: "Black workers bring less education, skills, or credentials" },
    { n: 3, name: "Spatial Mismatch", desc: "Inner-city workers separated from suburban jobs" },
    { n: 4, name: "Skill Mismatch", desc: "Worker skills don't match what employers demand" },
    { n: 5, name: "Government Intervention", desc: "Policy design shapes who works and who doesn't" },
  ];
  causeRows.forEach((cr, i) => {
    const y = 1.5 + i * 0.72;
    s.addShape(pres.shapes.OVAL, {
      x: 0.9, y: y + 0.06, w: 0.38, h: 0.38, fill: { color: C.gold }
    });
    s.addText(String(cr.n), {
      x: 0.9, y: y + 0.06, w: 0.38, h: 0.38,
      fontFace: H, fontSize: 16, color: C.dk, bold: true,
      align: "center", valign: "middle"
    });
    s.addText(cr.name, {
      x: 1.5, y, w: 3.6, h: 0.5,
      fontFace: H, fontSize: 18, color: C.wh, bold: true,
      margin: 0, valign: "middle"
    });
    s.addText(cr.desc, {
      x: 5.2, y, w: 4.6, h: 0.5,
      fontFace: B, fontSize: 13, color: C.wg, italic: true,
      margin: 0, valign: "middle"
    });
  });

  // ── CAUSE SLIDE HELPER ──
  function causeSlide(num, title, logic, evid, lims, likelihood, accent) {
    const sl = pres.addSlide(); sl.background = { color: C.off };
    sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: accent } });
    sl.addText(`${num}. ${title.toUpperCase()}`, {
      x: 0.5, y: 0.15, w: 9.2, h: 0.8, fontFace: H, fontSize: TS,
      color: C.navy, bold: true, margin: 0
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.01, w: 9.0, h: 0.77, fill: { color: C.lt }
    });
    sl.addText(logic, {
      x: 0.7, y: 1.01, w: 8.6, h: 0.77,
      fontFace: B, fontSize: 11, color: C.tx, italic: true,
      margin: 0, valign: "middle", lineSpacingMultiple: LSP
    });

    sl.addText("Evidence", {
      x: 0.5, y: 2.0, w: 2, h: 0.28,
      fontFace: H, fontSize: 13, color: C.grn, bold: true, margin: 0
    });
    sl.addText(evid, {
      x: 0.5, y: 2.44, w: 4.3, h: 2.3,
      fontFace: B, fontSize: 10.5, color: C.tx,
      margin: 0, valign: "top", paraSpaceAfter: 4
    });

    sl.addText("Limitations", {
      x: 5.2, y: 2.0, w: 2, h: 0.28,
      fontFace: H, fontSize: 13, color: C.red, bold: true, margin: 0
    });
    sl.addText(lims, {
      x: 5.2, y: 2.44, w: 4.3, h: 2.3,
      fontFace: B, fontSize: 10.5, color: C.tx,
      margin: 0, valign: "top", paraSpaceAfter: 4
    });

    const lColor = likelihood === "High" ? C.grn : likelihood === "Mid" ? C.gold : C.red;
    sl.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.9, w: 9.0, h: 0.4, fill: { color: C.lt }
    });
    sl.addText([
      { text: "Likelihood as a key cause: ", options: { fontSize: 12, color: C.tx, bold: true } },
      { text: likelihood, options: { fontSize: 14, color: lColor, bold: true } },
    ], { x: 0.7, y: 4.92, w: 8.6, h: 0.36, fontFace: B, valign: "middle" });
  }

  // ── S6: DISCRIMINATION ──
  causeSlide(1,
    "PLACEHOLDER",
    "Discrimination would have had to drastically increase during the 1930s.\nIts mere existence is not sufficient to explain the change in conditions.",
    [
      { text: "Bertrand & Mullainathan (2004): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "White names got 50% more callbacks.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Quillian et al. (2017): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "36% callback advantage.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "no improvement in 25 years.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Pager et al. (2009): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Blacks w/records v. whites w/o.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Black applicants did not fare better.", options: { fontSize: 10.5, color: C.tx } },
    ],
    [
      { text: "Why wasn't there a gap before?", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Audit studies start in the 1990s.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Sundstrom (1992) finds nothing on discrimination.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Cannot explain ratio stability across States.", options: { fontSize: 10.5, color: C.tx } },
    ],
    "Low", C.teal
  );

  // ── S7: HUMAN CAPITAL ──
  causeSlide(2,
    "PLACEHOLDER",
    "The gap should narrow as education converges, but it hasn't.\nEducational gaps were stable during the emergence window, not worsening.",
    [
      { text: "Shift to industry raised returns to education.", options: { fontSize: 10.5, color: C.tx, italic: true, breakLine: true } },
      { text: "Cajner et al. (2017):", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "~4 ppt of the EPOP gap from education.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Rauh & Valladares-Esteban (2023): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Test scores explain 84% of the gap.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Holzer (1986): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "40% of youth gap linked to reservation w.", options: { fontSize: 10.5, color: C.tx } },
    ],
    [
      { text: "The 2:1 ratio persists at every education level", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Decades of educational convergence had no effect.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Rauh's finding is not about unemployment.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Educational gaps did not change in the 1930s-40s.", options: { fontSize: 10.5, color: C.tx } },
    ],
    "Low", C.gold
  );

  // ── S8: SPATIAL MISMATCH ──
  // Custom: "Disadvantage in city and suburban." is at a separate position
  {
    const sl = pres.addSlide(); sl.background = { color: C.off };
    sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.teal } });
    sl.addText("3. SPATIAL MISMATCH MAY EXPLAIN WIDENING BUT CAME IN AFTER THE 1950s, TOO LATE TO EXPLAIN ITS ORIGIN", {
      x: 0.5, y: 0.16, w: 9.2, h: 0.8, fontFace: H, fontSize: TS,
      color: C.navy, bold: true, margin: 0
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.01, w: 9.0, h: 0.77, fill: { color: C.lt }
    });
    sl.addText("The Great Migration concentrated Black workers in northern cities.\nSearch costs were raised by geographic separation decades too late.", {
      x: 0.7, y: 0.97, w: 8.66, h: 0.85,
      fontFace: B, fontSize: 11, color: C.tx, italic: true,
      margin: 0, valign: "middle", lineSpacingMultiple: LSP
    });

    sl.addText("Evidence", {
      x: 0.5, y: 2.0, w: 2, h: 0.28,
      fontFace: H, fontSize: 13, color: C.grn, bold: true, margin: 0
    });
    sl.addText([
      { text: "Kain (1968): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "~70% of entry-level jobs are suburban.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Ihlanfeldt & Sjoquist (1990):", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Accessibility on Black employment.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Johnson (2006): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Car access betters job search for blacks.", options: { fontSize: 10.5, color: C.tx } },
    ], {
      x: 0.5, y: 2.44, w: 4.3, h: 2.3,
      fontFace: B, fontSize: 10.5, color: C.tx,
      margin: 0, valign: "top", paraSpaceAfter: 4
    });

    sl.addText("Limitations", {
      x: 5.2, y: 2.0, w: 2, h: 0.28,
      fontFace: H, fontSize: 13, color: C.red, bold: true, margin: 0
    });
    sl.addText([
      { text: "Black workers migrated twice again.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Suburbanization came after the gap emerged.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Gap exists across very different metros.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Bauder & Perle (1999): ", options: { bold: true, fontSize: 10.5, color: C.tx } },
    ], {
      x: 5.2, y: 2.19, w: 4.3, h: 2.3,
      fontFace: B, fontSize: 10.5, color: C.tx,
      margin: 0, valign: "top", paraSpaceAfter: 4
    });

    // Separately positioned final line
    sl.addText("Disadvantage in city and suburban.", {
      x: 5.66, y: 4.37, w: 3.70, h: 0.34,
      fontFace: B, fontSize: 10.5, color: C.tx, margin: 0, valign: "middle"
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.9, w: 9.0, h: 0.4, fill: { color: C.lt }
    });
    sl.addText([
      { text: "Likelihood as a key cause: ", options: { fontSize: 12, color: C.tx, bold: true } },
      { text: "Mid", options: { fontSize: 14, color: C.gold, bold: true } },
    ], { x: 0.7, y: 4.92, w: 8.6, h: 0.36, fontFace: B, valign: "middle" });
  }

  // ── S9: SKILL MISMATCH ──
  causeSlide(4,
    "Skill Mismatch Is Real, But It Came Many Decades Too Late to Explain Emergence",
    "Agricultural skills may not transfer effectively to factory work.\nThis would only have been a problem after the 1940s.",
    [
      { text: "Bauder & Perle (1999):", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Skill mismatch predicts employment.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Widest gap (~2.8x):", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "During peak deindustrialization (1980s).", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Bound & Freeman (1992): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Declining demand for less-educ. workers.", options: { fontSize: 10.5, color: C.tx } },
    ],
    [
      { text: "White immigrants from Europe show no gap.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "The gap persists even with matching skill profiles.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Gap for equally-skilled black and white workers.", options: { fontSize: 10.5, color: C.tx } },
    ],
    "Low", C.gold
  );

  // ── S10: GOVERNMENT INTERVENTION ──
  causeSlide(5,
    "PLACEHOLDER",
    "The Social Security Act and the Wagner Act allowed discrimination.\nThe FLSA may have priced out some Black workers.",
    [
      { text: "Timing is striking:", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "New Deal overlaps with the emergence.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Quadagno (1994): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Exclusions were intentionally racial.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Myrdal (1944): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Relief was more likely in the North.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Moffitt (NBER): ", options: { bold: true, fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Some programs reduce labor supply.", options: { fontSize: 10.5, color: C.tx } },
    ],
    [
      { text: "New Deal exclusions denied blacks benefits.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Unions protected some Black workers.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "The gap persisted long after removal of exclusions.", options: { fontSize: 10.5, color: C.tx, breakLine: true } },
      { text: "Gap exists among people with low participation.", options: { fontSize: 10.5, color: C.tx } },
    ],
    "High", C.teal
  );

  // ── S11: IMPLICATIONS ──
  s = pres.addSlide(); s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addText("PLACEHOLDER", {
    x: 0.5, y: 0.19, w: 9.2, h: 0.75, fontFace: H, fontSize: TS,
    color: C.gold, bold: true, margin: 0
  });

  s.addText([
    { text: "Dependency", options: { bold: true, fontSize: 14, color: C.gold } },
    { text: " is critical if government intervention is a key cause", options: { fontSize: 14, color: C.wg } },
  ], {
    x: 0.7, y: 1.44, w: 9.0, h: 0.6,
    fontFace: B, valign: "middle", lineSpacingMultiple: LSP
  });

  s.addText("WHAT HAPPENS IF WE MISIDENTIFY THE CAUSE?", {
    x: 0.5, y: 2.36, w: 9, h: 0.4,
    fontFace: H, fontSize: 17, color: C.gold, bold: true, margin: 0
  });

  const arrowX = 3.05;

  s.addText("Discrimination as primary", {
    x: 0.5, y: 2.95, w: 3.1, h: 0.35,
    fontFace: B, fontSize: 13, color: C.gold, bold: true, margin: 0, valign: "middle"
  });
  s.addText("HC / Skill Mismatch as primary", {
    x: 0.5, y: 3.81, w: 3.1, h: 0.35,
    fontFace: B, fontSize: 13, color: C.gold, bold: true, margin: 0, valign: "middle"
  });
  s.addText("Spatial Mismatch as primary", {
    x: 0.5, y: 4.65, w: 3.1, h: 0.35,
    fontFace: B, fontSize: 13, color: C.gold, bold: true, margin: 0, valign: "middle"
  });

  s.addText([
    { text: "→  increase gov. regulation  → increase dependency  →  ", options: { fontSize: 13, color: C.wg } },
    { text: "makes matters worse", options: { fontSize: 13, color: C.wh, bold: true } },
  ], { x: arrowX, y: 2.96, w: 5.9, h: 0.35, fontFace: B, margin: 0, valign: "middle" });

  s.addText([
    { text: "→ increase gov. programs  → ", options: { fontSize: 13, color: C.wg } },
    { text: "makes matters worse", options: { fontSize: 13, color: C.wh, bold: true } },
  ], { x: arrowX, y: 3.56, w: 5.9, h: 0.35, fontFace: B, margin: 0, valign: "middle" });

  s.addText([
    { text: "→ increase education/training spending  →  ", options: { fontSize: 13, color: C.wg } },
    { text: "not harmful, won't fix dependency", options: { fontSize: 13, color: C.wh, bold: true } },
  ], { x: arrowX, y: 4.06, w: 5.9, h: 0.35, fontFace: B, margin: 0, valign: "middle" });

  s.addText([
    { text: "→  encourage migration  →  ", options: { fontSize: 13, color: C.wg } },
    { text: "no improvement; possible negative effects", options: { fontSize: 13, color: C.wh, bold: true } },
  ], { x: arrowX, y: 4.66, w: 5.9, h: 0.35, fontFace: B, margin: 0, valign: "middle" });

  // ── S12: THANK YOU ──
  s = pres.addSlide(); s.background = { color: C.dk };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold } });
  s.addText("Thank you", {
    x: 0, y: 0, w: 10, h: 5.625,
    fontFace: H, fontSize: 52, color: C.wh, bold: true,
    align: "center", valign: "middle"
  });

  // ── S13: REFERENCES ──
  s = pres.addSlide(); s.background = { color: C.off };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.teal } });
  s.addText("KEY REFERENCES", {
    x: 0.5, y: 0.15, w: 9, h: 0.4, fontFace: H, fontSize: TS,
    color: C.navy, bold: true, margin: 0
  });
  const refs = [
    "Fairlie & Sundstrom (1999). ILR Review 52(2), 252-270.",
    "Sundstrom (1997). ILR Review 50(3), 460-477.",
    "Sundstrom (1992). J. Economic History 52(2), 415-429.",
    "Vedder & Gallaway (1992). J. Economic History 52(3), 696-702.",
    "Bertrand & Mullainathan (2004). AER 94(4), 991-1013.",
    "Quillian, Pager, Hexel & Midtboen (2017). PNAS 114(41), 10870-75.",
    "Pager, Western & Bonikowski (2009). AJS 114(4), 777-799.",
    "Wilson & Darity (2017). EPI Report.",
    "Cajner et al. (2017). Federal Reserve.",
    "Rauh & Valladares-Esteban (2023). RED 51, 424-449.",
    "Kain (1968). QJE 82(2), 175-197.",
    "Hellerstein, Neumark & McInerney (2008). J. Urban Econ 64(2).",
    "Bauder & Perle (1999). Env. & Planning A, 31(6).",
    "Bound & Freeman (1992). QJE 107(1).",
    "Quadagno (1994). The Color of Welfare. Oxford Univ. Press.",
    "Myrdal (1944). An American Dilemma. Harper & Bros.",
    "Moffitt (2002). NBER WP 9168.",
    "Massenkoff et al. (2022). NBER WP 30252.",
    "Rodems & Shaefer (2016). Policy diffusion & exclusion of Black workers from UI.",
    "Burtless (2014). Brookings.",
    "Demos (2016). The Racial Wealth Gap: Why Policy Matters.",
  ];
  s.addText(
    refs.map((r, i) => ({
      text: `${i + 1}. ${r}`,
      options: { breakLine: true, fontSize: 11, color: C.tx, paraSpaceAfter: 2 }
    })),
    { x: 0.5, y: 0.6, w: 9, h: 4.8, fontFace: B, valign: "top", lineSpacingMultiple: 1.0 }
  );

  await pres.writeFile({ fileName: "racial_unemployment_gap.pptx" });
  console.log("Done.");
}
main().catch(console.error);
