const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

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
  const { FaGolfBall } = require("react-icons/fa");
  const iconGolfBall = await iconToBase64Png(FaGolfBall, "#FFFFFF", 256);
  const iconGolfBallGold = await iconToBase64Png(FaGolfBall, "#C9A84C", 256);

  const DG = "0C3823";
  const MG = "006747";
  const GOLD = "C9A84C";
  const CREAM = "F5F0E8";
  const OW = "FDFBF7";
  const CH = "1A1A1A";
  const LG = "D4CFC4"; // light gold/tan for hairlines

  // Helpers — fresh object factories to avoid pptxgenjs mutation bug
  const hairline = (x, y, w) => ({ x, y, w, h: 0, line: { color: GOLD, width: 0.75 } });
  const thinRule = (x, y, w) => ({ x, y, w, h: 0, line: { color: LG, width: 0.5 } });

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Augusta National Golf Club";
  pres.title = "Pro Shop Partnership Opportunities: Inaugural Pilot Program";

  // ─── SLIDE 1 — TITLE ───
  let s1 = pres.addSlide();
  s1.background = { color: DG };
  s1.addShape(pres.shapes.LINE, hairline(0, 0.03, 10));
  s1.addImage({ data: iconGolfBall, x: 4.6, y: 0.55, w: 0.8, h: 0.8 });
  s1.addText("NOW ON THE TEE:\nYOUR BRAND AT\nAUGUSTA NATIONAL", {
    x: 0.8, y: 1.5, w: 8.4, h: 2.4,
    fontSize: 38, fontFace: "Trebuchet MS", color: "FFFFFF",
    bold: true, align: "center", lineSpacingMultiple: 1.15, charSpacing: 2
  });
  s1.addShape(pres.shapes.LINE, { x: 3.8, y: 4.1, w: 2.4, h: 0, line: { color: GOLD, width: 0.75 } });
  s1.addText("Inaugural Pilot Program  •  Augusta National Golf Club", {
    x: 1, y: 4.25, w: 8, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: GOLD, align: "center", charSpacing: 1.5
  });
  s1.addText("CONFIDENTIAL: FOR PROSPECTIVE PARTNERS ONLY", {
    x: 1, y: 5.05, w: 8, h: 0.3,
    fontSize: 8, fontFace: "Calibri", color: "5A7F6A", align: "center", charSpacing: 3
  });
  s1.addShape(pres.shapes.LINE, { x: 0, y: 5.595, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });


  // ─── SLIDE 2 — GOLF'S MOST PRESTIGIOUS EVENT ───
  let s2 = pres.addSlide();
  s2.background = { color: OW };
  // Eyebrow
  s2.addText("THE MASTERS TOURNAMENT", {
    x: 0.8, y: 0.45, w: 8, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 4, bold: true, margin: 0
  });
  s2.addText("Golf's Most Prestigious Event Reaches 19.5 Million Viewers", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
  });
  s2.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });
  // Body
  s2.addText("The Masters Tournament is the first of golf's four major championships, held annually at Augusta National Golf Club in Augusta, Georgia. Founded in 1934 by Bobby Jones and Clifford Roberts, it has grown into one of the most prestigious and exclusive sporting events in the world, and the most coveted retail destination in professional sports.", {
    x: 0.8, y: 1.65, w: 8.4, h: 1.0,
    fontSize: 12, fontFace: "Calibri", color: "444444", lineSpacingMultiple: 1.6, margin: 0
  });
  // Three stats — just big numbers, no boxes
  const s2stats = [
    { num: "90 Yrs", unit: "", label: "of tradition" },
    { num: "19.5M", unit: "", label: "peak TV viewers, 2025 final round" },
    { num: "~$70M", unit: "", label: "estimated merchandise revenue per week" },
  ];
  s2stats.forEach((s, i) => {
    const x = 0.8 + (i * 3.0);
    s2.addText(s.num, {
      x, y: 3.55, w: 2.6, h: 0.6,
      fontSize: 32, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
    });
    s2.addText(s.label, {
      x, y: 4.15, w: 2.6, h: 0.4,
      fontSize: 10, fontFace: "Calibri", color: "888888", margin: 0
    });
  });
  // Light rule above stats
  s2.addShape(pres.shapes.LINE, { x: 0.8, y: 3.4, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });
  // Bottom info row
  s2.addShape(pres.shapes.LINE, { x: 0.8, y: 4.7, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });
  s2.addText("Broadcast: CBS, Paramount+, 200+ countries     |     Sponsors: IBM, AT&T, Rolex, Mercedes-Benz, Delta     |     2025 Purse: $21M", {
    x: 0.8, y: 4.85, w: 8.4, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: "999999", margin: 0
  });


  // ─── SLIDE 3 — MERCH HISTORY 1/3 ───
  let s3 = pres.addSlide();
  s3.background = { color: OW };
  s3.addText("THE HISTORY OF MASTERS MERCHANDISE   01 / 03", {
    x: 0.8, y: 0.45, w: 8.4, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 3, bold: true, margin: 0
  });
  s3.addText("Augusta Built a Brand by Saying No to Everyone", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
  });
  s3.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  const t3 = [
    { yr: "1934", title: "The First Invitational", desc: "Bobby Jones and Clifford Roberts inaugurate the Augusta National Invitation Tournament. Merchandise is limited to basic scorecards and small printed mementos sold near the clubhouse." },
    { yr: "1940s to 50s", title: "Post-War Growth", desc: "As television begins broadcasting the tournament, patron interest grows. A modest golf shop emerges, offering logo items like hat pins, pennants, and simple branded apparel. Roberts insists on understated, quality goods." },
    { yr: "1960s to 70s", title: "The Green Jacket Mystique Builds", desc: "Arnold Palmer and Jack Nicklaus fuel mainstream interest. The pro shop expands to include polo shirts, glassware, and art prints. Augusta establishes strict control over its trademark: no outside brands, no third-party retail." },
  ];
  t3.forEach((item, i) => {
    const y = 1.7 + (i * 1.15);
    s3.addText(item.yr, {
      x: 0.8, y, w: 1.2, h: 0.25,
      fontSize: 11, fontFace: "Trebuchet MS", color: GOLD, bold: true, margin: 0
    });
    s3.addText(item.title, {
      x: 2.2, y, w: 7, h: 0.25,
      fontSize: 12, fontFace: "Trebuchet MS", color: CH, bold: true, margin: 0
    });
    s3.addText(item.desc, {
      x: 2.2, y: y + 0.28, w: 7, h: 0.65,
      fontSize: 10, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.45, margin: 0
    });
  });
  // Bottom takeaway
  s3.addShape(pres.shapes.LINE, { x: 0.8, y: 5.0, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });
  s3.addText("Key Principle: Augusta National controls every aspect of its brand. No outside retail. No third-party licensing. No exceptions.", {
    x: 0.8, y: 5.1, w: 8.4, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: MG, italic: true, margin: 0
  });


  // ─── SLIDE 4 — MERCH HISTORY 2/3 ───
  let s4 = pres.addSlide();
  s4.background = { color: OW };
  s4.addText("THE HISTORY OF MASTERS MERCHANDISE   02 / 03", {
    x: 0.8, y: 0.45, w: 8.4, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 3, bold: true, margin: 0
  });
  s4.addText("Scarcity and Star Power Built a $70M Retail Machine", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
  });
  s4.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  const t4 = [
    { yr: "1980s", title: "The Collector Culture Emerges", desc: "Limited-edition pins, commemorative flags, and crystal glassware become coveted collectibles. Secondary markets spring up as patrons realize these goods can't be found anywhere else. The scarcity model is born." },
    { yr: "1990s", title: "Tiger Effect & Mass Demand", desc: "Tiger Woods' 1997 victory transforms the Masters into a global cultural event. Merchandise lines stretch for hours. The club responds with expanded retail space, more checkout stations, and a wider array of premium goods." },
    { yr: "2000s", title: "The North Shop Transformation", desc: "Augusta invests in a 30,000+ sq. ft. retail facility rivaling a luxury department store. Dozens of POS stations, curated sections, and controlled patron flow create an elevated shopping experience unlike any in sports." },
  ];
  t4.forEach((item, i) => {
    const y = 1.7 + (i * 1.15);
    s4.addText(item.yr, {
      x: 0.8, y, w: 1.2, h: 0.25,
      fontSize: 11, fontFace: "Trebuchet MS", color: GOLD, bold: true, margin: 0
    });
    s4.addText(item.title, {
      x: 2.2, y, w: 7, h: 0.25,
      fontSize: 12, fontFace: "Trebuchet MS", color: CH, bold: true, margin: 0
    });
    s4.addText(item.desc, {
      x: 2.2, y: y + 0.28, w: 7, h: 0.65,
      fontSize: 10, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.45, margin: 0
    });
  });
  s4.addShape(pres.shapes.LINE, { x: 0.8, y: 5.0, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });
  s4.addText("The Tiger Effect proved the right narrative supercharges merchandise demand, a lesson that informs our partnership strategy today.", {
    x: 0.8, y: 5.1, w: 8.4, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: MG, italic: true, margin: 0
  });


  // ─── SLIDE 5 — MERCH HISTORY 3/3 ───
  let s5 = pres.addSlide();
  s5.background = { color: OW };
  s5.addText("THE HISTORY OF MASTERS MERCHANDISE   03 / 03", {
    x: 0.8, y: 0.45, w: 8.4, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 3, bold: true, margin: 0
  });
  s5.addText("Brands Already Thrive Inside This Pro Shop", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
  });
  s5.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  // Two narrative blocks
  s5.addText("The Gnome Phenomenon", {
    x: 0.8, y: 1.7, w: 4.2, h: 0.3,
    fontSize: 14, fontFace: "Trebuchet MS", color: CH, bold: true, margin: 0
  });
  s5.addText("Introduced in 2016, the Masters Gnome became an instant cultural sensation. Limited to roughly 1,000 per day (one per patron), the gnomes sell out within the first hour each morning. Now in their 10th year, they command resale prices of 3 to 5× face value and have their own collector community.", {
    x: 0.8, y: 2.05, w: 4.2, h: 1.2,
    fontSize: 10, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.5, margin: 0
  });

  s5.addText("Smathers & Branson: The Template", {
    x: 0.8, y: 3.4, w: 4.2, h: 0.3,
    fontSize: 14, fontFace: "Trebuchet MS", color: CH, bold: true, margin: 0
  });
  s5.addText("The needlepoint accessories brand has achieved a prominent in-shop presence with wallets, belts, and keychains featuring Amen Corner motifs. This represents the closest existing model to what a brand partnership inside the pro shop could look like: subtle, premium, and deeply integrated.", {
    x: 0.8, y: 3.75, w: 4.2, h: 1.2,
    fontSize: 10, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.5, margin: 0
  });

  // Right side — stat column, just numbers separated by hairlines
  s5.addShape(pres.shapes.LINE, { x: 5.6, y: 1.7, w: 0, h: 3.5, line: { color: LG, width: 0.5 } });
  const s5stats = [
    { num: "30,000+", label: "Square feet of retail space" },
    { num: "~$70M", label: "Estimated weekly merch revenue" },
    { num: "90 min", label: "Peak wait time to enter the shop" },
    { num: "1,000+", label: "Unique SKUs available each year" },
    { num: "$59.50", label: "Price of a single Masters Gnome" },
  ];
  s5stats.forEach((s, i) => {
    const y = 1.7 + (i * 0.7);
    s5.addText(s.num, {
      x: 6.0, y, w: 1.6, h: 0.3,
      fontSize: 16, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
    });
    s5.addText(s.label, {
      x: 7.7, y, w: 2.0, h: 0.3,
      fontSize: 9.5, fontFace: "Calibri", color: "888888", valign: "middle", margin: 0
    });
    if (i < 4) {
      s5.addShape(pres.shapes.LINE, { x: 6.0, y: y + 0.42, w: 3.5, h: 0, line: { color: LG, width: 0.35 } });
    }
  });


  // ─── SLIDE 5B — TIMELINE (McKinsey Wolf style) ───
  let s5b = pres.addSlide();
  s5b.background = { color: OW };
  s5b.addText("THE HISTORY OF MASTERS MERCHANDISE", {
    x: 0.8, y: 0.45, w: 8.4, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 3, bold: true, margin: 0
  });
  s5b.addText("90 Years Building Golf's Most Exclusive Brand", {
    x: 0.8, y: 0.85, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
  });
  s5b.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  // CONSULTING-STYLE TIMELINE
  // Horizontal spine centered on the slide
  const spineY = 3.15;
  const spineL = 0.5;
  const spineR = 9.5;
  s5b.addShape(pres.shapes.LINE, {
    x: spineL, y: spineY, w: spineR - spineL, h: 0,
    line: { color: GOLD, width: 2 }
  });

  const events = [
    { year: "1934", desc: "Tournament founded.\nMerch limited to\nscorecards.", above: true },
    { year: "1950s", desc: "First pro shop opens.\nPins, pennants, and\nbranded apparel.", above: false },
    { year: "1970s", desc: "Trademark lockdown.\nNo outside brands.\nExclusivity model set.", above: true },
    { year: "1986", desc: "Nicklaus wins at 46.\nCollector culture and\nsecondary markets.", above: false },
    { year: "1997", desc: "Tiger Effect. Merch\nbecomes a global\nphenomenon.", above: true },
    { year: "2005", desc: "North Shop expands\nto 30,000+ sq. ft.\nLuxury retail scale.", above: false },
    { year: "2016", desc: "Masters Gnome sells\nout in one hour.\n1,000/day limit.", above: true },
    { year: "2025", desc: "McIlroy Grand Slam.\n19.5M viewers.\n$70M merch revenue.", above: false },
  ];

  const spineW = spineR - spineL;
  events.forEach((e, i) => {
    const cx = spineL + ((i + 0.5) / events.length) * spineW;

    // Dot on the spine
    s5b.addShape(pres.shapes.OVAL, {
      x: cx - 0.05, y: spineY - 0.05, w: 0.1, h: 0.1,
      fill: { color: GOLD }
    });

    if (e.above) {
      // Vertical drop line going UP from spine (shorter)
      s5b.addShape(pres.shapes.LINE, {
        x: cx, y: spineY - 0.4, w: 0, h: 0.35,
        line: { color: LG, width: 0.75 }
      });
      // Year label tight above drop line
      s5b.addText(e.year, {
        x: cx - 0.45, y: spineY - 0.68, w: 0.9, h: 0.25,
        fontSize: 10, fontFace: "Trebuchet MS", color: DG, bold: true, align: "center", margin: 0
      });
      // Description above year
      s5b.addText(e.desc, {
        x: cx - 0.5, y: spineY - 1.38, w: 1.0, h: 0.65,
        fontSize: 8, fontFace: "Calibri", color: "666666", align: "center", lineSpacingMultiple: 1.3, margin: 0
      });
    } else {
      // Vertical drop line going DOWN from spine (shorter)
      s5b.addShape(pres.shapes.LINE, {
        x: cx, y: spineY + 0.05, w: 0, h: 0.35,
        line: { color: LG, width: 0.75 }
      });
      // Year label tight below drop line
      s5b.addText(e.year, {
        x: cx - 0.45, y: spineY + 0.42, w: 0.9, h: 0.25,
        fontSize: 10, fontFace: "Trebuchet MS", color: DG, bold: true, align: "center", margin: 0
      });
      // Description below year
      s5b.addText(e.desc, {
        x: cx - 0.5, y: spineY + 0.7, w: 1.0, h: 0.65,
        fontSize: 8, fontFace: "Calibri", color: "666666", align: "center", lineSpacingMultiple: 1.3, margin: 0
      });
    }
  });

  // Bottom callout
  s5b.addShape(pres.shapes.LINE, { x: 0.8, y: 5.05, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });
  s5b.addText("Each decade compounded the exclusivity. What was once a scorecard stand is now the single greatest untapped partnership opportunity in professional sports.", {
    x: 0.8, y: 5.15, w: 8.4, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: MG, italic: true, margin: 0
  });


  // ─── SLIDE 6 — THE OPPORTUNITY ───
  let s6 = pres.addSlide();
  s6.background = { color: DG };
  s6.addShape(pres.shapes.LINE, { x: 0, y: 0.03, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });
  s6.addText("THE OPPORTUNITY", {
    x: 0.8, y: 0.4, w: 8, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 4, bold: true, margin: 0
  });
  s6.addText("Four Categories, One Unprecedented Opportunity", {
    x: 0.8, y: 0.8, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: "FFFFFF", bold: true, margin: 0
  });
  s6.addShape(pres.shapes.LINE, { x: 0.8, y: 1.4, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });
  s6.addText("For the first time in 90 years, Augusta National is exploring selective, brand-aligned partnerships within the pro shop. This inaugural pilot will admit 3 to 5 premium brands across four activation categories, each designed to enhance the patron experience while preserving tradition.", {
    x: 0.8, y: 1.6, w: 8.4, h: 0.9,
    fontSize: 12, fontFace: "Calibri", color: "B0CCBB", lineSpacingMultiple: 1.6, margin: 0
  });

  // Four categories — just gold text labels in a clean row, no boxes
  const cats = ["Merchandise\nPartnerships", "Point-of-Sale\nIntegration", "In-Shop\nSignage", "Player\nActivations"];
  cats.forEach((c, i) => {
    const x = 0.8 + (i * 2.3);
    s6.addText(String(i + 1).padStart(2, "0"), {
      x, y: 2.7, w: 1.8, h: 0.35,
      fontSize: 20, fontFace: "Trebuchet MS", color: GOLD, bold: true, margin: 0
    });
    s6.addShape(pres.shapes.LINE, { x, y: 3.1, w: 0.8, h: 0, line: { color: "1A5E3E", width: 0.5 } });
    s6.addText(c, {
      x, y: 3.25, w: 2.0, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: "FFFFFF", bold: true, margin: 0
    });
  });

  // Bottom stat row
  s6.addShape(pres.shapes.LINE, { x: 0.8, y: 4.1, w: 8.4, h: 0, line: { color: "1A5E3E", width: 0.5 } });
  const s6stats = [
    { n: "3 to 5", l: "Partner brands per pilot year" },
    { n: "1 Week", l: "Annual activation window" },
    { n: "200K+", l: "On-site patrons" },
    { n: "12.7M", l: "Avg. final round TV viewers" },
  ];
  s6stats.forEach((s, i) => {
    const x = 0.8 + (i * 2.3);
    s6.addText(s.n, {
      x, y: 4.2, w: 2, h: 0.3,
      fontSize: 14, fontFace: "Trebuchet MS", color: GOLD, bold: true, margin: 0
    });
    s6.addText(s.l, {
      x, y: 4.5, w: 2, h: 0.25,
      fontSize: 8, fontFace: "Calibri", color: "7A9F8A", margin: 0
    });
  });
  s6.addShape(pres.shapes.LINE, { x: 0, y: 5.595, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });


  // ─── HELPER: Partnership Category Slide ───
  function makePartnerSlide(eyebrow, title, intro, items) {
    let sl = pres.addSlide();
    sl.background = { color: OW };
    sl.addText(eyebrow, {
      x: 0.8, y: 0.45, w: 8, h: 0.3,
      fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 3, bold: true, margin: 0
    });
    sl.addText(title, {
      x: 0.8, y: 0.85, w: 8.4, h: 0.5,
      fontSize: 18, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
    });
    sl.addShape(pres.shapes.LINE, { x: 0.8, y: 1.45, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });
    sl.addText(intro, {
      x: 0.8, y: 1.6, w: 8.4, h: 0.5,
      fontSize: 11, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.5, margin: 0
    });
    sl.addShape(pres.shapes.LINE, { x: 0.8, y: 2.25, w: 8.4, h: 0, line: { color: LG, width: 0.5 } });

    items.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + (col * 4.6);
      const y = 2.5 + (row * 1.4);

      sl.addText(item.title, {
        x, y, w: 4.2, h: 0.28,
        fontSize: 13, fontFace: "Trebuchet MS", color: DG, bold: true, margin: 0
      });
      sl.addText(item.desc, {
        x, y: y + 0.32, w: 4.2, h: 0.85,
        fontSize: 9.5, fontFace: "Calibri", color: "555555", lineSpacingMultiple: 1.45, margin: 0
      });
      if (item.note) {
        sl.addText(item.note, {
          x, y: y + 1.1, w: 4.2, h: 0.2,
          fontSize: 8.5, fontFace: "Calibri", color: MG, italic: true, margin: 0
        });
      }
    });
    return sl;
  }

  // ─── SLIDE 7 — MERCHANDISE ───
  makePartnerSlide(
    "PARTNERSHIP CATEGORY  •  MERCHANDISE",
    "Your Name on the Most Coveted Goods in Golf",
    "Approved brands co-create limited-edition products bearing both the Masters mark and the partner's discreet branding, curated to meet Augusta National's quality and aesthetic standards.",
    [
      { title: "Premium Apparel", desc: "Co-branded polos, quarter-zips, and outerwear with subtle partner logo placement. Materials and design must meet Augusta's exacting standards. Logo size capped at 0.5\".", note: "e.g. Limited Masters rain jacket with interior label co-branding" },
      { title: "Accessories & Collectibles", desc: "Needlepoint goods, leather accessories, headwear, and specialty items featuring partner craftsmanship woven together with Masters iconography.", note: "e.g. Amen Corner embossed wallet collection by a heritage maker" },
      { title: "Lifestyle & Home", desc: "Glassware, drinkware, home décor, and commemorative pieces that extend the Masters brand into patrons' everyday life beyond tournament week.", note: "e.g. Limited-run etched commemorative tumblers by a crystal maker" },
      { title: "Food & Beverage Tie-ins", desc: "Co-branded packaging for the shop's famous food merchandise, including pimento cheese items, peach ice cream branding, and partner-sponsored commemorative food gift sets.", note: "e.g. Limited Masters pimento cheese gift box by a premium brand" },
    ]
  );

  // ─── SLIDE 8 — POS ───
  makePartnerSlide(
    "PARTNERSHIP CATEGORY  •  POINT OF SALE",
    "50,000+ Patrons at Checkout. Your Brand Meets Every One",
    "The pro shop processes tens of thousands of transactions during tournament week. POS partners gain visibility at the most intimate moment of the patron experience: the point of purchase.",
    [
      { title: "Branded Checkout Experience", desc: "Partner-branded receipt paper, shopping bags, and tissue paper. Every patron leaves the shop carrying your brand. Estimated 50,000+ branded bags distributed per tournament week." },
      { title: "Digital Receipt Program", desc: "Partner-sponsored digital receipt option offering patrons an eco-friendly alternative with embedded partner messaging, purchase history, and exclusive post-tournament offers." },
      { title: "Payment Terminal Branding", desc: "Subtle co-branding on POS terminals and card reader screens. A tasteful \"Powered by [Partner]\" or \"Checkout experience provided by [Partner]\" at each of 40+ stations." },
      { title: "VIP Checkout Lounge", desc: "A partner-sponsored premium checkout area for high-spend patrons ($500+), featuring branded seating, refreshments, and a dedicated personal shopping experience." },
    ]
  );

  // ─── SLIDE 9 — SIGNAGE ───
  makePartnerSlide(
    "PARTNERSHIP CATEGORY  •  IN-SHOP SIGNAGE",
    "Tasteful Signage Embeds Your Brand Into the Experience",
    "All signage must adhere to Augusta National's aesthetic guidelines: muted tones, serif typography, and materials consistent with the clubhouse environment. No neon. No digital screens. No oversized logos.",
    [
      { title: "Section Wayfinding Plaques", desc: "Brass or wood-engraved plaques at department entrances: \"Outerwear, Presented by [Partner].\" Consistent with existing clubhouse signage standards.", note: "Placement: above section entrances, eye level" },
      { title: "Product Display Cards", desc: "Tasteful tabletop cards within product displays featuring partner heritage story and subtle branding. Must complement, never overwhelm, the merchandise.", note: "Placement: product tables and shelving units" },
      { title: "Heritage Story Panels", desc: "Framed panels (max 18\" × 24\") telling the brand partnership story: the collaboration, the craftsmanship, shared values with Augusta National.", note: "Placement: featured walls near partner product zones" },
      { title: "Entry Welcome Acknowledgment", desc: "A single, elegant recognition at the main shop entrance listing all pilot program partners. \"This year's pro shop experience is enhanced by...\"", note: "Placement: main shop entrance, single placement" },
    ]
  );

  // ─── SLIDE 10 — PLAYER ACTIVATIONS ───
  makePartnerSlide(
    "PARTNERSHIP CATEGORY  •  PLAYER ACTIVATIONS",
    "Player Star Power Drives Foot Traffic to Your Products",
    "Leverage the star power of Masters competitors through carefully orchestrated activations that connect partner brands to the athletes patrons admire most, all within the pro shop environment.",
    [
      { title: "Player-Curated Collections", desc: "A top-tier competitor selects or co-designs a capsule product line carried exclusively in the pro shop. \"[Player]'s Picks,\" a curated selection of merchandise the player personally endorses.", note: "High Impact: drives patron engagement and media coverage" },
      { title: "Practice Round Signing Sessions", desc: "During Monday through Wednesday practice rounds, partner-affiliated players host brief signing sessions adjacent to the pro shop, drawing foot traffic and creating memorable moments.", note: "Experiential: creates patron stories that amplify the brand" },
      { title: "Champions' Choice Endorsement", desc: "Past champions lend their signature to a limited-edition partner product such as a signed print, commemorative accessory, or co-branded item only available during tournament week.", note: "Premium: past champion association elevates brand prestige" },
      { title: "Player Locker Room Integration", desc: "Partner products placed in competitor gift bags or locker room amenities, creating organic player and brand relationships that may translate into social media content post-tournament.", note: "Subtle: seeds long-term player relationships" },
    ]
  );


  // ─── SLIDE 11 — GUIDELINES ───
  let s11 = pres.addSlide();
  s11.background = { color: DG };
  s11.addShape(pres.shapes.LINE, { x: 0, y: 0.03, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });
  s11.addText("PARTNERSHIP GUIDELINES", {
    x: 0.8, y: 0.4, w: 8, h: 0.3,
    fontSize: 9, fontFace: "Calibri", color: GOLD, charSpacing: 4, bold: true, margin: 0
  });
  s11.addText("Protecting the Masters Brand Protects Your Investment", {
    x: 0.8, y: 0.75, w: 8.4, h: 0.5,
    fontSize: 18, fontFace: "Trebuchet MS", color: "FFFFFF", bold: true, margin: 0
  });
  s11.addShape(pres.shapes.LINE, { x: 0.8, y: 1.35, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  const guidelines = [
    { t: "Subtlety First", d: "Partner branding must never compete with the Masters mark. Logo size capped at 0.5\" on merchandise, 2\" on signage. Always secondary placement." },
    { t: "Quality Mandate", d: "All co-branded products must meet or exceed Augusta's existing quality threshold. Materials, stitching, and finishing are subject to club approval." },
    { t: "No Digital Disruption", d: "No digital displays, QR codes on patron-facing materials, or electronic signage within the pro shop. The experience must remain tactile and traditional." },
    { t: "Exclusivity Clause", d: "Partners may not reference the partnership in external advertising without written approval. Social media posts require 48-hour pre-approval." },
    { t: "Annual Renewal", d: "Pilot partnerships are one-year terms with mutual option to renew. Performance measured on patron satisfaction, not revenue." },
    { t: "Category Exclusivity", d: "One partner per product category. No competing brands within the same merchandise segment during the pilot year." },
  ];
  guidelines.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + (col * 4.6);
    const y = 1.65 + (row * 1.1);

    s11.addText(g.t, {
      x, y, w: 4.2, h: 0.25,
      fontSize: 12, fontFace: "Trebuchet MS", color: GOLD, bold: true, margin: 0
    });
    s11.addText(g.d, {
      x, y: y + 0.32, w: 4.2, h: 0.6,
      fontSize: 9.5, fontFace: "Calibri", color: "B0CCBB", lineSpacingMultiple: 1.4, margin: 0
    });
  });
  s11.addShape(pres.shapes.LINE, { x: 0, y: 5.595, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });


  // ─── SLIDE 12 — NEXT STEPS ───
  let s12 = pres.addSlide();
  s12.background = { color: DG };
  s12.addShape(pres.shapes.LINE, { x: 0, y: 0.03, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });
  s12.addImage({ data: iconGolfBall, x: 4.6, y: 0.5, w: 0.8, h: 0.8 });
  s12.addText("NEXT STEPS", {
    x: 1, y: 1.45, w: 8, h: 0.35,
    fontSize: 9, fontFace: "Calibri", color: GOLD, align: "center", charSpacing: 4, bold: true
  });
  s12.addText("Four Steps to Becoming\na Founding Partner", {
    x: 1, y: 1.65, w: 8, h: 1.0,
    fontSize: 28, fontFace: "Trebuchet MS", color: "FFFFFF", bold: true, align: "center", lineSpacingMultiple: 1.15
  });
  s12.addShape(pres.shapes.LINE, { x: 4, y: 2.75, w: 2, h: 0, line: { color: GOLD, width: 0.75 } });

  const steps = [
    { n: "01", t: "PLACEHOLDER" },
    { n: "02", t: "PLACEHOLDER" },
    { n: "03", t: "Creative brief and co-design process with Augusta National's team (6-month lead time)" },
    { n: "04", t: "Final approval by the Augusta National Merchandise Committee" },
  ];
  steps.forEach((s, i) => {
    const x = 0.8 + (i * 2.25);
    s12.addText(s.n, {
      x, y: 3.05, w: 2, h: 0.4,
      fontSize: 22, fontFace: "Trebuchet MS", color: GOLD, bold: true, align: "center", margin: 0
    });
    s12.addShape(pres.shapes.LINE, { x: x + 0.6, y: 3.5, w: 0.8, h: 0, line: { color: "1A5E3E", width: 0.5 } });
    s12.addText(s.t, {
      x, y: 3.65, w: 2, h: 1.0,
      fontSize: 11, fontFace: "Calibri", color: "B0CCBB", align: "center", lineSpacingMultiple: 1.4, margin: 0
    });
  });

  s12.addShape(pres.shapes.LINE, { x: 3.8, y: 4.95, w: 2.4, h: 0, line: { color: GOLD, width: 0.75 } });
  s12.addText("AUGUSTA NATIONAL GOLF CLUB  •  PARTNERSHIPS OFFICE", {
    x: 1, y: 5.05, w: 8, h: 0.25,
    fontSize: 9, fontFace: "Calibri", color: GOLD, align: "center", charSpacing: 2
  });
  s12.addText("CONFIDENTIAL  •  DO NOT DISTRIBUTE", {
    x: 1, y: 5.3, w: 8, h: 0.2,
    fontSize: 8, fontFace: "Calibri", color: "4A7A5E", align: "center", charSpacing: 2
  });
  s12.addShape(pres.shapes.LINE, { x: 0, y: 5.595, w: 10, h: 0, line: { color: GOLD, width: 0.75 } });


  await pres.writeFile({ fileName: "/home/assets/ProShop_Partnership_Opportunities.pptx" });
  console.log("Done");
}
main().catch(err => { console.error(err); process.exit(1); });
