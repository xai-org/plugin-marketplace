// Recreates "Hope Valley Dreamery" pitch deck using pptxgenjs
// Run: node hope_valley_dreamery.js
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.title = "Hope Valley Dreamery";
pres.author = "Hope Valley Dreamery";

// --- Palette (extracted from original) ---
const C = {
  cream:     "FBF6EE", // main background
  pinkBg:    "FADDDD", // slide 1 bg, card
  pinkCard:  "F5C6C6", // pink card fill
  mint:      "D9EFE5", // slide 6 left panel, mint card
  mintDeep:  "BEE3D4", // mint card
  yellow:    "FBECC2", // yellow card
  yellowAcc: "F5DFA1", // bright accent circle
  blue:      "C9DDEB", // blue card
  sand:      "F3EADB", // sand card
  brownDark: "3D2E26", // main dark text
  brownMid:  "6B5849", // body text muted
  red:       "B85C5C", // accent red
  white:     "FFFFFF",
};

const FONT_HEAD = "Arial";
const FONT_BODY = "Arial";

// Slide dims
const W = 13.333;
const H = 7.5;

// ----- Header / Footer helpers -----
function addHeader(slide, sectionLabel) {
  slide.addText("HOPE VALLEY DREAMERY", {
    x: 0.6, y: 0.3, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 10, bold: true,
    color: C.brownMid, charSpacing: 4, margin: 0,
  });
  slide.addText(sectionLabel, {
    x: W - 6 - 0.6, y: 0.3, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 10, bold: true,
    color: C.brownMid, charSpacing: 4, align: "right", margin: 0,
  });
}

// =================================================================
// SLIDE 1 — Title
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.pinkBg };

  // Three small dots + brand name
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.57, w: 0.13, h: 0.13, fill: { color: C.pinkCard }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 0.78, y: 0.57, w: 0.13, h: 0.13, fill: { color: C.mintDeep }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 0.96, y: 0.57, w: 0.13, h: 0.13, fill: { color: C.yellowAcc }, line: { type: "none" } });
  s.addText("Hope Valley Dreamery", {
    x: 1.2, y: 0.45, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.brownDark, margin: 0,
  });

  // Eyebrow
  s.addText("A NEIGHBORHOOD ICE CREAM SHOP", {
    x: 0.6, y: 1.45, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 6, margin: 0,
  });

  // Big title
  s.addText("Hope Valley\nDreamery.", {
    x: 0.6, y: 1.9, w: 6.5, h: 2.5,
    fontFace: FONT_HEAD, fontSize: 64, bold: true, color: C.brownDark, margin: 0,
  });

  // Subtitle
  s.addText("A small, warm place for our corner of Durham — built by neighbors, for neighbors.", {
    x: 0.6, y: 4.65, w: 4.2, h: 1.3,
    fontFace: FONT_BODY, fontSize: 15, color: C.brownMid, margin: 0,
  });

  // Footer line
  s.addText("Friends & family preview · Spring 2026", {
    x: 0.6, y: 6.85, w: 6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
  });

  // Hero photo placeholder (right side, mint rounded rect)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.1, y: 0.55, w: 5.6, h: 6.4,
    fill: { color: C.mint }, line: { color: C.mintDeep, width: 1 }, rectRadius: 0.1,
  });
  s.addText("HERO PHOTO", {
    x: 7.1, y: 3.5, w: 5.6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.brownMid, align: "center", charSpacing: 4, margin: 0,
  });
  s.addText("waffle cone, kids on the sidewalk, golden-hour light", {
    x: 7.1, y: 3.9, w: 5.6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, align: "center", margin: 0,
  });

  // Yellow "opening on Garrett Rd" circle (top-right of photo)
  s.addShape(pres.shapes.OVAL, {
    x: 11.5, y: 0.15, w: 1.7, h: 1.7,
    fill: { color: C.yellowAcc }, line: { type: "none" },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.12 },
  });
  s.addText("opening\non Garrett Rd", {
    x: 11.5, y: 0.55, w: 1.7, h: 0.95,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownDark, align: "center", valign: "middle", margin: 0,
  });
}

// =================================================================
// SLIDE 2 — The Idea
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "02 · THE CONCEPT");

  s.addText("THE IDEA", {
    x: 0.6, y: 1.35, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 6, margin: 0,
  });
  s.addText("A neighborhood ice cream shop — and not much more than that.", {
    x: 0.6, y: 1.8, w: 6.5, h: 2.9,
    fontFace: FONT_HEAD, fontSize: 42, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("A small counter, a short menu done really well, a few tables inside, benches out front. The kind of place a ten-year-old can walk to on a Friday night.", {
    x: 0.6, y: 4.75, w: 5.5, h: 1.7,
    fontFace: FONT_BODY, fontSize: 16, color: C.brownMid, margin: 0,
  });

  // Big mint circle (right)
  s.addShape(pres.shapes.OVAL, {
    x: 7.3, y: 1.4, w: 5.2, h: 5.2,
    fill: { color: C.mint }, line: { type: "none" },
  });
  // Inner pink circle
  s.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 2.6, w: 2.8, h: 2.8,
    fill: { color: C.pinkBg }, line: { type: "none" },
  });
  s.addText("one scoop,\none street,\none shop.", {
    x: 8.5, y: 2.6, w: 2.8, h: 2.8,
    fontFace: FONT_HEAD, fontSize: 18, color: C.brownDark, align: "center", valign: "middle", margin: 0,
  });

  // Yellow small circle top-right
  s.addShape(pres.shapes.OVAL, {
    x: 11.9, y: 1.2, w: 1.25, h: 1.25,
    fill: { color: C.yellowAcc }, line: { type: "none" },
  });
  s.addText("hand-\ndipped\ndaily", {
    x: 11.9, y: 1.35, w: 1.25, h: 0.95,
    fontFace: FONT_BODY, fontSize: 10, bold: true, color: C.brownDark, align: "center", valign: "middle", margin: 0,
  });

  // Pink small circle bottom-left of big circle
  s.addShape(pres.shapes.OVAL, {
    x: 6.9, y: 5.6, w: 1.4, h: 1.4,
    fill: { color: C.pinkCard }, line: { type: "none" },
  });
  s.addText("open late\non game\nnights", {
    x: 6.9, y: 5.75, w: 1.4, h: 1.1,
    fontFace: FONT_BODY, fontSize: 10, bold: true, color: C.brownDark, align: "center", valign: "middle", margin: 0,
  });
}

// =================================================================
// SLIDE 3 — Why Hope Valley (3 cards)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "03 · WHY HOPE VALLEY");

  s.addText("WHY HOPE VALLEY", {
    x: 0.6, y: 1.05, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 6, margin: 0,
  });
  s.addText("The pocket of Durham that doesn't have one yet.", {
    x: 0.6, y: 1.5, w: 10, h: 1.5,
    fontFace: FONT_HEAD, fontSize: 38, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("Three reasons this corner of Southwest\nDurham is ready for us.", {
    x: 9.5, y: 2.1, w: 3.3, h: 0.9,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, align: "right", margin: 0,
  });

  const cards = [
    { num: "01", title: "Dense, walkable, young",
      body: "Families with elementary & middle school kids line the streets off Garrett and Pickett — exactly our customer, a short bike ride from the door.",
      color: C.pinkBg, line: C.pinkCard },
    { num: "02", title: "A high school next door",
      body: "Jordan High sits a two-minute walk away. After-school, after-practice, after-the-game — that's a customer three times over.",
      color: C.mint, line: C.mintDeep },
    { num: "03", title: "No sweet spot nearby",
      body: "The closest scoop shop is a car ride away. Hope Valley families are driving past us to get dessert somewhere else.",
      color: C.yellow, line: C.yellowAcc },
  ];
  const cardW = 3.95, cardH = 3.4, gap = 0.15, startX = 0.6, startY = 3.3;
  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cardW, h: cardH,
      fill: { color: c.color }, line: { color: c.line, width: 0.75 },
    });
    s.addText(c.num, {
      x: x + 0.3, y: startY + 0.25, w: 2, h: 0.9,
      fontFace: FONT_HEAD, fontSize: 40, color: C.red, margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.3, y: startY + 1.55, w: cardW - 0.6, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 17, color: C.brownDark, margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.3, y: startY + 2.1, w: cardW - 0.6, h: 1.2,
      fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 4 — Who We Are
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "04 · WHO WE ARE");

  // Left portrait placeholder (blue)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 1.1, w: 4.9, h: 5.8,
    fill: { color: C.blue }, line: { color: C.blue, width: 1 }, rectRadius: 0.08,
  });
  s.addText("FOUNDERS PORTRAIT", {
    x: 0.6, y: 3.5, w: 4.9, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.brownMid, align: "center", charSpacing: 4, margin: 0,
  });
  s.addText("husband & wife on the future storefront's stoop", {
    x: 0.6, y: 3.9, w: 4.9, h: 0.35,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, align: "center", margin: 0,
  });

  // Right content
  const rx = 5.9;
  s.addText("WHO WE ARE", {
    x: rx, y: 1.3, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 6, margin: 0,
  });
  s.addText("A husband & wife, deeply rooted here.", {
    x: rx, y: 1.75, w: 7, h: 0.7,
    fontFace: FONT_HEAD, fontSize: 24, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("We've raised our kids in this neighborhood. Between the two of us, that's a decade each of showing up — on sidelines, at meetings, in church halls, on camping trips.", {
    x: rx, y: 2.5, w: 3.3, h: 2,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownDark, margin: 0,
  });

  // Stats grid (2x2)
  const stats = [
    { num: "10 yrs", body: "coaching & managing youth sports teams across Durham" },
    { num: "10 yrs", body: "as a Girl Scout troop leader & service unit volunteer" },
    { num: "2",      body: "kids of our own who grew up walking these same sidewalks" },
    { num: "1",      body: "shop we've always wanted our neighborhood to have" },
  ];
  const colW = 3.3, rowH = 1.35;
  stats.forEach((st, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = rx + col * (colW + 0.3);
    const y = 4.7 + row * rowH;
    // Top border line
    s.addShape(pres.shapes.LINE, {
      x, y, w: colW, h: 0,
      line: { color: C.brownDark, width: 0.5 },
    });
    s.addText(st.num, {
      x, y: y + 0.05, w: colW, h: 0.5,
      fontFace: FONT_HEAD, fontSize: 22, color: C.red, margin: 0,
    });
    s.addText(st.body, {
      x, y: y + 0.62, w: colW, h: 0.65,
      fontFace: FONT_BODY, fontSize: 11, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 5 — Community
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "05 · COMMUNITY");

  // Left column text
  s.addText("OUR COMMUNITY, ALREADY", {
    x: 0.6, y: 2.3, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });
  s.addText("We're not building an audience. We already know them.", {
    x: 0.6, y: 2.75, w: 5.5, h: 1.8,
    fontFace: FONT_HEAD, fontSize: 26, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("A decade of volunteer hours is a decade of first names, team chats, and \"hey, you should meet ___.\" That network opens the door on day one.", {
    x: 0.6, y: 4.6, w: 4.5, h: 1.5,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, margin: 0,
  });

  // Right: big pink card + 4 smaller cards
  const bigX = 6.4, bigY = 1.75, bigW = 3.3, bigH = 4.6;
  s.addShape(pres.shapes.RECTANGLE, {
    x: bigX, y: bigY, w: bigW, h: bigH,
    fill: { color: C.pinkBg }, line: { color: C.pinkCard, width: 0.75 },
  });
  s.addText("PEOPLE WE KNOW BY NAME", {
    x: bigX + 0.25, y: bigY + 2.2, w: bigW - 0.5, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.brownMid, charSpacing: 3, margin: 0,
  });
  s.addText("hundreds", {
    x: bigX + 0.25, y: bigY + 2.55, w: bigW - 0.5, h: 0.8,
    fontFace: FONT_HEAD, fontSize: 40, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("of families across youth sports, Girl Scouts, schools, and church — a warm contact list, not a cold one.", {
    x: bigX + 0.25, y: bigY + 3.35, w: bigW - 0.5, h: 1.1,
    fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
  });

  // Four smaller cards (2x2)
  const smallX = 9.95, smallY = 1.75, smallW = 1.45, smallH = 2.25, smallGap = 0.12;
  const small = [
    { label: "TEAMS\nCOACHED",       num: "15+",  body: "soccer,\nbasketball,\nsoftball",  fill: C.mint,   line: C.mintDeep },
    { label: "GIRL SCOUT\nTROOPS LED", num: "4",    body: "Daisies through Cadettes",        fill: C.yellow, line: C.yellowAcc },
    { label: "SCHOOLS\nIN OUR CIRCLE", num: "6",    body: "elementary, middle & high",       fill: C.white,  line: "DDD3C4" },
    { label: "GROUP CHATS\nWE'RE IN",  num: "many", body: "the real marketing channel",      fill: C.sand,   line: "DDD3C4" },
  ];
  small.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = smallX + col * (smallW + smallGap);
    const y = smallY + row * (smallH + smallGap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: smallW, h: smallH,
      fill: { color: c.fill }, line: { color: c.line, width: 0.75 },
    });
    s.addText(c.label, {
      x: x + 0.17, y: y + 0.15, w: smallW - 0.3, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 9, bold: true, color: C.brownMid, charSpacing: 2, margin: 0,
    });
    s.addText(c.num, {
      x: x + 0.17, y: y + 0.8, w: smallW - 0.3, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 22, color: C.brownDark, margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.17, y: y + 1.45, w: smallW - 0.3, h: 0.75,
      fontFace: FONT_BODY, fontSize: 9, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 6 — The Location (split layout with map)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  // Left panel — mint "map"
  const lp = { x: 0, y: 0, w: 6.1, h: H };
  s.addShape(pres.shapes.RECTANGLE, {
    ...lp, fill: { color: C.mint }, line: { type: "none" },
  });

  // Header inside left panel
  s.addText("HOPE VALLEY DREAMERY", {
    x: 0.6, y: 0.3, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.brownMid, charSpacing: 4, margin: 0,
  });

  // Map pins as rounded rect labels
  const pins = [
    { txt: "Hope Valley Farms", x: 0.5, y: 1.15, w: 1.85, h: 0.45 },
    { txt: "Southpoint",        x: 4.1, y: 0.65, w: 1.45, h: 0.45 },
    { txt: "Jordan High School",x: 3.0, y: 2.3,  w: 2.0,  h: 0.45 },
    { txt: "Woodcroft",         x: 1.15, y: 5.55, w: 1.3, h: 0.45 },
    { txt: "I-40",              x: 4.95, y: 6.1,  w: 0.75, h: 0.4 },
  ];
  pins.forEach(p => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: p.y, w: p.w, h: p.h,
      fill: { color: C.white }, line: { color: "E5DCC9", width: 0.5 }, rectRadius: 0.08,
    });
    s.addText(p.txt, {
      x: p.x, y: p.y, w: p.w, h: p.h,
      fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.brownDark, align: "center", valign: "middle", margin: 0,
    });
  });

  // The Dreamery pin (dark brown rounded) with red dot
  s.addShape(pres.shapes.OVAL, {
    x: 2.75, y: 3.68, w: 0.32, h: 0.32,
    fill: { color: C.red }, line: { color: C.white, width: 2 },
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.15, y: 3.65, w: 1.65, h: 0.45,
    fill: { color: C.brownDark }, line: { type: "none" }, rectRadius: 0.06,
  });
  s.addText("The Dreamery", {
    x: 3.15, y: 3.65, w: 1.65, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.white, align: "center", valign: "middle", margin: 0,
  });

  // Bottom label
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.25, y: 6.85, w: 2.35, h: 0.45,
    fill: { color: C.white }, line: { color: "E5DCC9", width: 0.5 }, rectRadius: 0.08,
  });
  s.addText("GARRETT RD CORRIDOR", {
    x: 0.25, y: 6.85, w: 2.35, h: 0.45,
    fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.brownDark, align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });

  // Right side content
  const rx = 6.6;
  s.addText("06 · THE LOCATION", {
    x: W - 5 - 0.6, y: 0.3, w: 5, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 10, bold: true, color: C.brownMid, charSpacing: 4, align: "right", margin: 0,
  });
  s.addText("THE LOCATION", {
    x: rx, y: 0.95, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });
  s.addText("A strip-mall endcap — two minutes from Jordan High.", {
    x: rx, y: 1.45, w: 6.3, h: 2.1,
    fontFace: FONT_HEAD, fontSize: 26, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("Garrett Road · Hope Valley · Durham, NC", {
    x: rx, y: 3.55, w: 6.3, h: 0.7,
    fontFace: FONT_BODY, fontSize: 14, color: C.brownMid, margin: 0,
  });

  // Four detail rows
  const rows = [
    { label: "FORMAT", body: "Strip-mall storefront, endcap preferred — easy in-and-out, visible from the road" },
    { label: "WALK TO\nJORDAN HIGH", body: "Under five minutes on foot" },
    { label: "PARKING", body: "Shared lot, no meters, room for families and team vans" },
    { label: "NEIGHBORS", body: "Daily-trip retail — grocery, pharmacy, pizza. People are already here." },
  ];
  let ry = 4.35;
  rows.forEach((r, i) => {
    // Top line
    s.addShape(pres.shapes.LINE, {
      x: rx, y: ry, w: 6.3, h: 0,
      line: { color: "DDD3C4", width: 0.5 },
    });
    s.addText(r.label, {
      x: rx, y: ry + 0.1, w: 1.8, h: 0.6,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.red, charSpacing: 3, margin: 0,
    });
    s.addText(r.body, {
      x: rx + 1.95, y: ry + 0.1, w: 4.35, h: 0.6,
      fontFace: FONT_BODY, fontSize: 12, color: C.brownDark, margin: 0,
    });
    ry += 0.72;
  });
}

// =================================================================
// SLIDE 7 — Foot Traffic (4 cards + left intro)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "07 · FOOT TRAFFIC");

  // Left intro column
  s.addText("WHO'S WALKING BY", {
    x: 0.6, y: 2.4, w: 3.3, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });
  s.addText("Four waves of foot traffic, every week.", {
    x: 0.6, y: 2.85, w: 3.3, h: 1.4,
    fontFace: FONT_HEAD, fontSize: 22, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("The strip mall isn't a destination — it's a thousand small, repeatable trips. We just need to catch the ones headed home.", {
    x: 0.6, y: 4.3, w: 3.3, h: 1.5,
    fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
  });

  // 2x2 grid of traffic cards
  const cards = [
    { label: "WEEKDAY · 3–5PM", headline: "Jordan High, out for the day.",
      body: "The after-school flood — walkers, bikers, the kid-with-a-five-dollar-bill crowd.",
      fill: C.pinkBg, line: C.pinkCard },
    { label: "WEEKDAY · 5–7PM", headline: "Parents & little kids, post-practice.",
      body: "The reward-for-making-it-through-Tuesday stop. Cleats optional.",
      fill: C.mint, line: C.mintDeep },
    { label: "FRIDAY & SATURDAY NIGHTS", headline: "Families, teens, date-night walkers.",
      body: "Game nights at Jordan, school dances, birthday outings — we stay open late.",
      fill: C.yellow, line: C.yellowAcc },
    { label: "WEEKEND AFTERNOONS", headline: "The neighborhood stroll.",
      body: "Grandparents, dogs, strollers. The loop from the grocery store home, with a stop.",
      fill: C.sand, line: "DDD3C4" },
  ];
  const startX = 4.25, startY = 1.0, cardW = 4.3, cardH = 2.85, gap = 0.15;
  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: c.fill }, line: { color: c.line, width: 0.75 },
    });
    s.addText(c.label, {
      x: x + 0.3, y: y + 0.25, w: cardW - 0.6, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 11, bold: true, color: C.brownMid, charSpacing: 3, margin: 0,
    });
    s.addText(c.headline, {
      x: x + 0.3, y: y + 0.6, w: cardW - 0.6, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 16, color: C.brownDark, margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.3, y: y + 2.0, w: cardW - 0.6, h: 0.75,
      fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 8 — The Shop (4 cards with image placeholders + captions)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "08 · THE SHOP");

  s.addText("WHAT WE'RE BUILDING", {
    x: 0.6, y: 0.95, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });
  s.addText("Short menu. Warm room. Real neighbors behind the counter.", {
    x: 0.6, y: 1.4, w: 7, h: 2.1,
    fontFace: FONT_HEAD, fontSize: 30, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("We're not trying to out-fancy anyone. We're trying to be the shop every kid in the neighborhood remembers when they grow up.", {
    x: 7.75, y: 1.75, w: 5.1, h: 1.7,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, margin: 0,
  });

  // 4 cards — image placeholder on top, white text area below
  const items = [
    { imgLabel: "COUNTER SHOT", imgSub: "flavor board, chalk, handmade",
      title: "A menu you can read in ten seconds",
      body: "A dozen classics done well, two rotating specials, cones & cups. Nothing you have to explain.",
      fill: C.pinkBg, line: C.pinkCard },
    { imgLabel: "INTERIOR SHOT", imgSub: "wood, pastel tile, kid-height counter",
      title: "A room built for small people",
      body: "Kid-height window, chalkboard wall, a corner for strollers and backpacks. The grown-ups will be fine.",
      fill: C.mint, line: C.mintDeep },
    { imgLabel: "TEAM PHOTO", imgSub: "high schoolers in aprons, smiling",
      title: "We hire the kids we coached",
      body: "First-job-friendly. The staff is literally our network — and they bring their friends.",
      fill: C.yellow, line: C.yellowAcc },
    { imgLabel: "EVENT SHOT", imgSub: "team night, custom cups, team jerseys",
      title: "Team nights & troop nights",
      body: "A standing calendar of \"wear your jersey, ten percent back to the team.\" Built-in traffic, built-in goodwill.",
      fill: C.blue, line: "A8C5DD" },
  ];
  const sx = 0.6, sy = 3.75, cardW = 3.0, cardH = 3.5, gap = 0.15;
  items.forEach((c, i) => {
    const x = sx + i * (cardW + gap);
    // Top image area (colored)
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: sy, w: cardW, h: 1.5,
      fill: { color: c.fill }, line: { color: c.line, width: 0.75 },
    });
    s.addText(c.imgLabel, {
      x: x + 0.15, y: sy + 0.4, w: cardW - 0.3, h: 0.35,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.brownMid, align: "center", charSpacing: 3, margin: 0,
    });
    s.addText(c.imgSub, {
      x: x + 0.15, y: sy + 0.75, w: cardW - 0.3, h: 0.55,
      fontFace: FONT_BODY, fontSize: 11, color: C.brownMid, align: "center", margin: 0,
    });
    // Bottom white text area
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: sy + 1.5, w: cardW, h: cardH - 1.5,
      fill: { color: C.white }, line: { color: "E5DCC9", width: 0.5 },
    });
    s.addText(c.title, {
      x: x + 0.2, y: sy + 1.65, w: cardW - 0.4, h: 0.75,
      fontFace: FONT_HEAD, fontSize: 14, color: C.brownDark, margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.2, y: sy + 2.45, w: cardW - 0.4, h: 1.0,
      fontFace: FONT_BODY, fontSize: 11, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 9 — The Opening Plan (timeline, 4 steps)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "09 · THE PLAN");

  s.addText("THE OPENING PLAN", {
    x: 0.6, y: 1.05, w: 6, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 13, bold: true, color: C.red, charSpacing: 4, margin: 0,
  });
  s.addText("From lease to first scoop.", {
    x: 0.6, y: 1.5, w: 10, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 38, bold: true, color: C.brownDark, margin: 0,
  });
  s.addText("A simple, seasonal rollout — so we open in time to catch summer, and the first Jordan High football game of the fall.", {
    x: 0.6, y: 2.55, w: 5.5, h: 1.2,
    fontFace: FONT_BODY, fontSize: 13, color: C.brownMid, margin: 0,
  });

  // 4 columns, each: colored dot, label, headline, body
  const steps = [
    { dot: C.red,      label: "NOW → SUMMER",       head: "Lease & build-out.", body: "Endcap signed, counter, equipment, permits. Friends-and-family tasting nights all along the way." },
    { dot: C.pinkCard, label: "LATE SUMMER",        head: "Soft open.",         body: "Free-scoop weekend for the network — teams, troops, families, neighbors. The people who already know us." },
    { dot: C.mintDeep, label: "LABOR DAY WEEKEND",  head: "Grand opening.",     body: "Ribbon cutting, back-to-school kickoff, the first Jordan football Friday." },
    { dot: C.yellowAcc,label: "FALL & BEYOND",      head: "Settle in, stay open.", body: "Team-night calendar, seasonal flavors, birthday parties on Sundays. The shop becomes part of the routine." },
  ];
  const sx = 0.6, sy = 4.15, colW = 3.0, gap = 0.18;
  steps.forEach((st, i) => {
    const x = sx + i * (colW + gap);
    s.addShape(pres.shapes.OVAL, {
      x, y: sy, w: 0.4, h: 0.4,
      fill: { color: st.dot }, line: { type: "none" },
    });
    s.addText(st.label, {
      x, y: sy + 0.55, w: colW, h: 0.4,
      fontFace: FONT_HEAD, fontSize: 12, bold: true, color: C.brownMid, charSpacing: 3, margin: 0,
    });
    s.addText(st.head, {
      x, y: sy + 1.0, w: colW, h: 0.55,
      fontFace: FONT_HEAD, fontSize: 18, bold: true, color: C.brownDark, margin: 0,
    });
    s.addText(st.body, {
      x, y: sy + 1.7, w: colW, h: 1.5,
      fontFace: FONT_BODY, fontSize: 12, color: C.brownMid, margin: 0,
    });
  });
}

// =================================================================
// SLIDE 10 — Thank You (mint background)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.mint };

  s.addText("THANK YOU", {
    x: 0.6, y: 1.1, w: W - 1.2, h: 0.5,
    fontFace: FONT_HEAD, fontSize: 14, bold: true, color: C.red, align: "center", charSpacing: 6, margin: 0,
  });

  s.addText("A shop the\nneighborhood already\nhas keys to.", {
    x: 0.6, y: 2.2, w: W - 1.2, h: 3.0,
    fontFace: FONT_HEAD, fontSize: 54, bold: true, color: C.brownDark, align: "center", margin: 0,
  });

  s.addText("— with love, from Garrett Road", {
    x: 0.6, y: 5.5, w: W - 1.2, h: 0.45,
    fontFace: FONT_BODY, fontSize: 18, color: C.brownDark, align: "center", margin: 0,
  });

  // Footer with three dot-separated items
  s.addText([
    { text: "●  ", options: { color: C.red, bold: true } },
    { text: "HOPE VALLEY DREAMERY", options: { color: C.red, bold: true, charSpacing: 4 } },
    { text: "       ●  ", options: { color: C.red, bold: true } },
    { text: "DURHAM, NC", options: { color: C.red, bold: true, charSpacing: 4 } },
    { text: "       ●  ", options: { color: C.red, bold: true } },
    { text: "SPRING 2026", options: { color: C.red, bold: true, charSpacing: 4 } },
  ], {
    x: 0.6, y: 6.2, w: W - 1.2, h: 0.4,
    fontFace: FONT_HEAD, fontSize: 12, align: "center", margin: 0,
  });
}

// --- Save ---
pres.writeFile({ fileName: "Hope_Valley_Dreamery.pptx" })
  .then(fn => console.log("Wrote:", fn));
