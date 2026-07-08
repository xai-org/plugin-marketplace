// Curio Exchange — Buterin Fund investor memo (12 slides, 20" x 11.25")
// Run: npm install pptxgenjs && node generate.js

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.author = "Buterin Fund";
pres.title = "Curio Exchange — Buterin Fund";

// Custom 20" x 11.25" layout (matches source 18288000 x 10287000 EMU)
pres.defineLayout({ name: "CURIO", width: 20, height: 11.25 });
pres.layout = "CURIO";

// -------- Palette --------
const C = {
  bg: "0A0907",        // near-black page background
  panel: "14110D",     // slightly lighter panel fill
  card: "2C2620",      // card background
  border: "4A3F33",    // subtle border
  mute: "85796A",      // muted tan (labels, metadata)
  text: "C7BDA9",      // secondary body text
  gold: "C9A961",      // gold accent
  cream: "F4EBDC",     // primary body / title text
};

// Fonts
const F_HEAD = "Georgia";
const F_BODY = "Segoe UI";
const F_MONO = "Consolas";

// Slide dimensions shorthand
const SW = 20;
const SH = 11.25;
const M = 1.04;                // left/right page margin (~1.04")
const TOP_LABEL_Y = 0.7;        // y for section eyebrow
const BOTTOM_Y = 10.6;          // y for footer row
const RULE_Y = 0.85;            // horizontal rule under eyebrow

// -------- Helpers --------
function addPageFrame(slide, num, sectionLabel) {
  slide.background = { color: C.bg };
  // section eyebrow: "NN  SECTION NAME"  + thin rule to right edge
  slide.addText(
    [
      { text: String(num).padStart(2, "0") + "  ", options: { color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3 } },
      { text: sectionLabel, options: { color: C.gold, fontFace: F_MONO, fontSize: 11, charSpacing: 3, bold: true } },
    ],
    { x: M, y: TOP_LABEL_Y, w: 6, h: 0.3, margin: 0, valign: "middle" }
  );
  // rule: starts just after label text, runs to page right margin
  slide.addShape(pres.shapes.LINE, {
    x: M + 3.5, y: RULE_Y, w: SW - M - (M + 3.5), h: 0,
    line: { color: C.border, width: 0.75 },
  });

  // footer
  slide.addText("CURIO EXCHANGE · BUTERIN FUND", {
    x: M, y: BOTTOM_Y, w: 6, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 3,
  });
  slide.addText(sectionLabel, {
    x: SW / 2 - 2, y: BOTTOM_Y, w: 4, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 3, align: "center",
  });
  slide.addText(String(num).padStart(2, "0") + " / 12", {
    x: SW - M - 3, y: BOTTOM_Y, w: 3, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 3, align: "right",
  });
}

// Decorative corner-bracket frame around an area (4 L-shaped brackets)
function addCornerBrackets(slide, x, y, w, h, color = C.border, size = 0.22, stroke = 1) {
  const s = size;
  // top-left
  slide.addShape(pres.shapes.LINE, { x, y, w: s, h: 0, line: { color, width: stroke } });
  slide.addShape(pres.shapes.LINE, { x, y, w: 0, h: s, line: { color, width: stroke } });
  // top-right
  slide.addShape(pres.shapes.LINE, { x: x + w - s, y, w: s, h: 0, line: { color, width: stroke } });
  slide.addShape(pres.shapes.LINE, { x: x + w, y, w: 0, h: s, line: { color, width: stroke } });
  // bottom-left
  slide.addShape(pres.shapes.LINE, { x, y: y + h - s, w: 0, h: s, line: { color, width: stroke } });
  slide.addShape(pres.shapes.LINE, { x, y: y + h, w: s, h: 0, line: { color, width: stroke } });
  // bottom-right
  slide.addShape(pres.shapes.LINE, { x: x + w, y: y + h - s, w: 0, h: s, line: { color, width: stroke } });
  slide.addShape(pres.shapes.LINE, { x: x + w - s, y: y + h, w: s, h: 0, line: { color, width: stroke } });
}

// =====================================================================
// SLIDE 1 — COVER
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: "2C2620" };  // warmer dark cover

  // Top meta row
  s.addText("BUTERIN FUND — DIGITAL ASSETS", {
    x: M, y: 0.6, w: 5.5, h: 0.35, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3,
  });
  s.addText("CONFIDENTIAL · FAMILY OFFICE BRIEFING", {
    x: SW / 2 - 3, y: 0.6, w: 6, h: 0.35, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3, align: "center",
  });
  s.addText("APRIL 2026", {
    x: SW - M - 4, y: 0.6, w: 4, h: 0.35, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3, align: "right",
  });

  // Eyebrow gold
  s.addText("INVESTMENT MEMORANDUM / LOT NO. 001", {
    x: M, y: 1.95, w: 10, h: 0.4, margin: 0,
    color: C.gold, fontFace: F_MONO, fontSize: 15, charSpacing: 4, bold: true,
  });

  // Big serif title — "Curio Exchange" with italic gold "Exchange"
  s.addText(
    [
      { text: "Curio ", options: { color: C.cream, italic: false } },
      { text: "Exchange", options: { color: C.gold, italic: true } },
    ],
    {
      x: M, y: 2.4, w: 17, h: 2.2, margin: 0,
      fontFace: F_HEAD, fontSize: 130,
    }
  );

  // Rule under title block
  s.addShape(pres.shapes.LINE, {
    x: M, y: 6.3, w: 6.2, h: 0, line: { color: C.border, width: 0.75 },
  });

  // Italic body
  s.addText(
    "A themed marketplace for culturally significant internet artefacts — and the case for digital memory as a curated luxury asset class.",
    {
      x: M, y: 6.6, w: 8.5, h: 2.0, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 22,
      paraSpaceAfter: 6,
    }
  );

  // Bottom meta
  s.addText("PREPARED FOR — [FAMILY OFFICE]", {
    x: M, y: BOTTOM_Y, w: 6, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  s.addText("ASSOCIATE · BUTERIN FUND", {
    x: SW - M - 5, y: BOTTOM_Y, w: 5, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3, align: "right",
  });
}

// =====================================================================
// SLIDE 2 — THESIS
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 2, "THESIS");

  // Large serif statement with italic gold "artefacts"
  s.addText(
    [
      { text: "The first three decades of the internet produced ", options: { color: C.cream } },
      { text: "artefacts", options: { color: C.gold, italic: true } },
      { text: " — and no reliable market to own them.", options: { color: C.cream } },
    ],
    {
      x: M, y: 2.3, w: 14, h: 3.4, margin: 0,
      fontFace: F_HEAD, fontSize: 46, paraSpaceAfter: 0,
    }
  );

  // Left gold accent rule
  s.addShape(pres.shapes.LINE, {
    x: M, y: 6.5, w: 0, h: 1.7, line: { color: C.gold, width: 1.75 },
  });

  // Supporting italic block
  s.addText(
    "Curio Exchange curates, authenticates and auctions the memes, posts, GIFs and forum threads that shaped mainstream culture — treating internet memory the way auction houses treat rare books.",
    {
      x: M + 0.35, y: 6.5, w: 11, h: 1.9, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 22,
    }
  );
}

// =====================================================================
// SLIDE 3 — THE CATEGORY (stats row)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 3, "CATEGORY");

  s.addText(
    [
      { text: "The speculative cycle is over. The ", options: { color: C.cream } },
      { text: "curatorial", options: { color: C.gold, italic: true } },
      { text: " one is beginning.", options: { color: C.cream } },
    ],
    {
      x: M, y: 1.55, w: 17, h: 1.4, margin: 0,
      fontFace: F_HEAD, fontSize: 42,
    }
  );

  // 4 stat columns
  const stats = [
    { big: "$17B", label: "NFT secondary volume, 2021 peak", sub: "Speculative cycle, un-curated" },
    { big: "94%",  label: "Price decline from peak to 2024 trough", sub: "Supply glut; no curatorial filter" },
    { big: "$2.4T", label: "Global luxury collectibles market", sub: "Watches, wine, art, cars — the comp set" },
    { big: "32 yrs", label: "Since Mosaic 1.0 shipped", sub: "The 'vintage' window has opened" },
  ];

  const colW = (SW - 2 * M) / 4;
  const statY = 4.1;
  stats.forEach((st, i) => {
    const cx = M + i * colW;
    // top rule
    s.addShape(pres.shapes.LINE, {
      x: cx, y: statY, w: colW - 0.4, h: 0, line: { color: C.border, width: 0.75 },
    });
    s.addText(st.big, {
      x: cx, y: statY + 0.25, w: colW - 0.4, h: 1.1, margin: 0,
      color: C.gold, fontFace: F_HEAD, fontSize: 60,
    });
    s.addText(st.label, {
      x: cx, y: statY + 1.55, w: colW - 0.4, h: 0.8, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 14,
    });
    s.addText(st.sub, {
      x: cx, y: statY + 2.35, w: colW - 0.4, h: 0.35, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 2,
    });
  });

  // Source line
  s.addText("SOURCE — Illustrative; industry estimates and internal analysis", {
    x: M, y: 7.35, w: 14, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 2,
  });
}

// =====================================================================
// SLIDE 4 — THE ARTEFACT (4 lot cards)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 4, "ARTEFACT");

  // Left title
  s.addText("Four categories. One provenance standard.", {
    x: M, y: 1.55, w: 12, h: 1.8, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 38,
  });

  // Right-aligned subcopy
  s.addText(
    "Every lot on Curio is source-verified, cryptographically signed by its author or estate, and assigned a cultural-weight grade.",
    {
      x: SW - M - 6.4, y: 1.55, w: 6.4, h: 1.6, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 15, align: "right",
    }
  );

  // 4 lot cards
  const lots = [
    { num: "LOT 014", name: "All your base",            meta: "GIF / 2001 / edition of 3",    tag: "MEME (source file)" },
    { num: "LOT 027", name: "just setting up my twttr", meta: "Post / 2006 / 1 of 1",          tag: "FIRST POST / TWEET" },
    { num: "LOT 033", name: "Something Awful: the goon log", meta: "Forum thread / 1999 / 1 of 1", tag: "FORUM THREAD" },
    { num: "LOT 041", name: "Success Kid (source)",     meta: "Meme / 2007 / edition of 7",   tag: "ICONIC GIF" },
  ];

  const cardsY = 4.5;
  const cardW = 4.3;
  const cardH = 4.4;
  const gap = (SW - 2 * M - 4 * cardW) / 3;

  lots.forEach((lot, i) => {
    const cx = M + i * (cardW + gap);
    // card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardsY, w: cardW, h: cardH,
      fill: { color: C.panel }, line: { color: "1F1B15", width: 0.5 },
    });
    // corner brackets
    addCornerBrackets(s, cx + 0.12, cardsY + 0.12, cardW - 0.24, cardH - 0.24, C.border, 0.2, 0.75);

    // LOT number (top)
    s.addText(lot.num, {
      x: cx + 0.4, y: cardsY + 0.35, w: cardW - 0.8, h: 0.35, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3,
    });
    // Name (bottom, italic serif)
    s.addText(lot.name, {
      x: cx + 0.4, y: cardsY + cardH - 1.45, w: cardW - 0.8, h: 0.65, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 22,
    });
    // Meta
    s.addText(lot.meta, {
      x: cx + 0.4, y: cardsY + cardH - 0.75, w: cardW - 0.8, h: 0.3, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 2,
    });
    // Tag beneath card
    s.addText(lot.tag, {
      x: cx, y: cardsY + cardH + 0.15, w: cardW, h: 0.3, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
    });
  });
}

// =====================================================================
// SLIDE 5 — THE MARKETPLACE (product mockup)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 5, "PRODUCT");

  // Title
  s.addText("Curio, in product.", {
    x: M, y: 1.45, w: 12, h: 1.2, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 38,
  });

  // Top-right label
  s.addText("CURIO.EXCHANGE — LIVE", {
    x: SW - M - 5, y: 1.7, w: 5, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3, align: "right",
  });

  // --- Browser header bar ---
  const headerY = 2.75;
  s.addShape(pres.shapes.LINE, {
    x: M, y: headerY, w: SW - 2 * M, h: 0,
    line: { color: C.border, width: 0.5 },
  });
  // 3 dots (traffic lights)
  [0, 0.18, 0.36].forEach((dx) => {
    s.addShape(pres.shapes.OVAL, {
      x: M + 0.1 + dx, y: headerY + 0.18, w: 0.1, h: 0.1,
      fill: { color: C.mute }, line: { color: C.mute, width: 0 },
    });
  });
  // Brand + nav
  s.addText("CURIO", {
    x: M + 0.85, y: headerY + 0.1, w: 1.3, h: 0.3, margin: 0,
    color: C.cream, fontFace: F_MONO, fontSize: 12, charSpacing: 3, bold: true,
  });
  s.addText("/ BROWSE    / AUCTIONS    / ARCHIVE    / JOURNAL", {
    x: M + 2.2, y: headerY + 0.1, w: 7.5, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 2,
  });
  // Right: live indicator + sign in
  s.addText(
    [
      { text: "✧ ", options: { color: C.gold } },
      { text: "14 LIVE", options: { color: C.gold, bold: true } },
      { text: "    SIGN IN", options: { color: C.mute } },
    ],
    {
      x: SW - M - 4, y: headerY + 0.1, w: 4, h: 0.3, margin: 0,
      fontFace: F_MONO, fontSize: 11, charSpacing: 2, align: "right",
    }
  );
  s.addShape(pres.shapes.LINE, {
    x: M, y: headerY + 0.55, w: SW - 2 * M, h: 0,
    line: { color: C.border, width: 0.5 },
  });

  // --- Left filter sidebar ---
  const sbX = M + 0.15, sbY = headerY + 0.8, sbW = 2.4;
  s.addText("FILTER", {
    x: sbX, y: sbY, w: sbW, h: 0.3, margin: 0,
    color: C.cream, fontFace: F_MONO, fontSize: 12, charSpacing: 3, bold: true,
  });
  const groups = [
    { title: "Category", items: [["Meme", true], ["Post", false], ["GIF", false], ["Thread", false]] },
    { title: "Era", items: [["1995-2000", true], ["2001-2005", false], ["2006-2010", false], ["2011-2015", false]] },
    { title: "Grade", items: [["A+ Canonical", true], ["A Influential", false], ["B Notable", false]] },
  ];
  let gy = sbY + 0.5;
  groups.forEach((g) => {
    s.addText(g.title, {
      x: sbX, y: gy, w: sbW, h: 0.3, margin: 0,
      color: C.gold, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2,
    });
    gy += 0.33;
    g.items.forEach(([label, checked]) => {
      // checkbox
      s.addShape(pres.shapes.RECTANGLE, {
        x: sbX, y: gy + 0.08, w: 0.15, h: 0.15,
        fill: { color: checked ? C.gold : C.panel },
        line: { color: checked ? C.gold : C.border, width: 0.5 },
      });
      s.addText(label, {
        x: sbX + 0.28, y: gy, w: sbW - 0.3, h: 0.3, margin: 0,
        color: checked ? C.cream : C.mute, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2,
      });
      gy += 0.32;
    });
    gy += 0.18;
  });

  // --- Grid of lot thumbnails (2 rows x 3 cols) ---
  const tiles = [
    { badge: "LIVE",     num: "LOT 014", name: "All your base",        cat: "GIF · 2001",    price: "0.84 ETH" },
    { badge: "LIVE",     num: "LOT 027", name: "just setting up my twttr", cat: "Post · 2006",   price: "12.0 ETH" },
    { badge: null,       num: "LOT 033", name: "the goon log",         cat: "Thread · 1999", price: "0.22 ETH" },
    { badge: "LIVE",     num: "LOT 041", name: "Success Kid (src)",    cat: "Meme · 2007",   price: "4.1 ETH" },
    { badge: null,       num: "LOT 046", name: "Dancing Baby",         cat: "GIF · 1996",    price: "3.3 ETH" },
    { badge: "RESERVED", num: "LOT 052", name: "Rickroll (master)",    cat: "Video · 2007",  price: "—" },
  ];
  const gridX = M + 3.0;
  const gridY = headerY + 0.8;
  const tileW = 3.35;
  const tileH = 2.85;
  const tileGapX = 0.18;
  const tileGapY = 0.2;

  tiles.forEach((t, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const tx = gridX + col * (tileW + tileGapX);
    const ty = gridY + row * (tileH + tileGapY);

    // thumbnail area (image placeholder)
    s.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: ty, w: tileW, h: 1.75,
      fill: { color: "1F1B15" }, line: { color: C.border, width: 0.5 },
    });
    // badge
    if (t.badge) {
      const isReserved = t.badge === "RESERVED";
      s.addShape(pres.shapes.RECTANGLE, {
        x: tx + 0.15, y: ty + 0.15, w: isReserved ? 0.85 : 0.55, h: 0.25,
        fill: { color: isReserved ? C.cream : C.gold },
        line: { color: isReserved ? C.cream : C.gold, width: 0 },
      });
      s.addText(t.badge, {
        x: tx + 0.15, y: ty + 0.15, w: isReserved ? 0.85 : 0.55, h: 0.25, margin: 0,
        color: C.bg, fontFace: F_MONO, fontSize: 8, bold: true, charSpacing: 2,
        align: "center", valign: "middle",
      });
    }
    // text below thumbnail
    s.addText(t.num, {
      x: tx, y: ty + 1.85, w: tileW, h: 0.22, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 9.5, charSpacing: 2,
    });
    s.addText(t.name, {
      x: tx, y: ty + 2.08, w: tileW, h: 0.3, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 14,
    });
    s.addText(t.cat, {
      x: tx, y: ty + 2.38, w: tileW, h: 0.22, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 9.5, charSpacing: 2,
    });
    s.addText(t.price, {
      x: tx, y: ty + 2.6, w: tileW, h: 0.22, margin: 0,
      color: C.gold, fontFace: F_MONO, fontSize: 10, bold: true, charSpacing: 1,
    });
  });

  // --- Right detail panel ---
  const dpX = gridX + 3 * tileW + 3 * tileGapX + 0.15;
  const dpY = headerY + 0.8;
  const dpW = SW - M - dpX - 0.1;

  s.addText("SELECTED — LOT 027", {
    x: dpX, y: dpY, w: dpW, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2,
  });
  s.addText("just setting up my twttr", {
    x: dpX, y: dpY + 0.35, w: dpW, h: 0.9, margin: 0,
    color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 22,
  });
  s.addText("JACK DORSEY · 21 MAR 2006", {
    x: dpX, y: dpY + 1.28, w: dpW, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 2,
  });
  // rule
  s.addShape(pres.shapes.LINE, {
    x: dpX, y: dpY + 1.65, w: dpW, h: 0, line: { color: C.border, width: 0.5 },
  });
  // attribute rows
  const attrs = [
    ["GRADE",       "A+ CANONICAL"],
    ["EDITION",     "1 of 1"],
    ["PROVENANCE",  "Author-signed"],
    ["RESERVE",     "8.0 ETH"],
    ["CURRENT BID", "12.0 ETH"],
    ["CLOSES",      "04:17:22"],
  ];
  attrs.forEach((row, i) => {
    const ry = dpY + 1.78 + i * 0.32;
    s.addText(row[0], {
      x: dpX, y: ry, w: dpW * 0.55, h: 0.28, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 2,
    });
    s.addText(row[1], {
      x: dpX + dpW * 0.45, y: ry, w: dpW * 0.55, h: 0.28, margin: 0,
      color: C.cream, fontFace: F_MONO, fontSize: 10, charSpacing: 1, align: "right",
    });
  });
  // Place bid button
  const btnY = dpY + 3.95;
  s.addShape(pres.shapes.RECTANGLE, {
    x: dpX, y: btnY, w: dpW, h: 0.5,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });
  s.addText("PLACE BID — 12.25 ETH", {
    x: dpX, y: btnY, w: dpW, h: 0.5, margin: 0,
    color: C.bg, fontFace: F_MONO, fontSize: 11, bold: true, charSpacing: 2,
    align: "center", valign: "middle",
  });
  // Watchlist button
  s.addShape(pres.shapes.RECTANGLE, {
    x: dpX, y: btnY + 0.6, w: dpW, h: 0.5,
    fill: { color: C.panel }, line: { color: C.border, width: 0.5 },
  });
  s.addText("WATCHLIST +", {
    x: dpX, y: btnY + 0.6, w: dpW, h: 0.5, margin: 0,
    color: C.cream, fontFace: F_MONO, fontSize: 11, bold: true, charSpacing: 2,
    align: "center", valign: "middle",
  });
}

// =====================================================================
// SLIDE 6 — COLLECTORS (3 persona cards)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 6, "COLLECTORS");

  s.addText("Three archetypes — one thick-middle demand curve.", {
    x: M, y: 1.55, w: 17, h: 1.4, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 40,
  });

  const personas = [
    {
      n: "0 1",
      name: "The Archivist",
      demo: "32–45 · $2k–$25k / year",
      quote: "I remember when this meme broke. I want the source file, signed.",
      desc: "Nostalgia-led. Buys one or two canonical lots per quarter.",
      stat: "~55% OF ACTIVE BIDDERS",
    },
    {
      n: "0 2",
      name: "The Patron",
      demo: "38–60 · $50k–$500k / year",
      quote: "If this is the rare books market of the 2040s, I'd rather own early.",
      desc: "Treats Curio like a small art allocation. A+ grades only.",
      stat: "~12% OF BIDDERS · 61% OF GMV",
    },
    {
      n: "0 3",
      name: "The Creator-Collector",
      demo: "24–38 · $500–$8k / year",
      quote: "I want the receipt. I grew up inside this culture.",
      desc: "High frequency, lower AOV. Community-driven. Referral engine.",
      stat: "~33% OF BIDDERS",
    },
  ];

  const pY = 4.2;
  const pH = 5.9;
  const pW = (SW - 2 * M - 0.5) / 3;

  personas.forEach((p, i) => {
    const px = M + i * (pW + 0.25);
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: pY, w: pW, h: pH,
      fill: { color: C.panel }, line: { color: C.border, width: 0.5 },
    });
    // number
    s.addText(p.n, {
      x: px + 0.35, y: pY + 0.3, w: 1.5, h: 0.3, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
    });
    // "PERSONA · PORTRAIT" meta near middle
    s.addText("PERSONA · PORTRAIT", {
      x: px + 0.35, y: pY + 1.7, w: pW - 0.7, h: 0.3, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 3,
    });
    // divider rule
    s.addShape(pres.shapes.LINE, {
      x: px + 0.35, y: pY + 2.1, w: pW - 0.7, h: 0,
      line: { color: C.border, width: 0.5 },
    });
    // name serif italic
    s.addText(p.name, {
      x: px + 0.35, y: pY + 2.2, w: pW - 0.7, h: 0.6, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 26,
    });
    // demo
    s.addText(p.demo, {
      x: px + 0.35, y: pY + 2.85, w: pW - 0.7, h: 0.3, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2,
    });
    // quote with a small gold left rule
    s.addShape(pres.shapes.LINE, {
      x: px + 0.38, y: pY + 3.3, w: 0, h: 0.9,
      line: { color: C.gold, width: 1.5 },
    });
    s.addText("\u201C " + p.quote + " \u201D", {
      x: px + 0.55, y: pY + 3.25, w: pW - 0.9, h: 1.0, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 14,
    });
    // desc
    s.addText(p.desc, {
      x: px + 0.35, y: pY + 4.3, w: pW - 0.7, h: 0.9, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 13,
    });
    // thin rule
    s.addShape(pres.shapes.LINE, {
      x: px + 0.35, y: pY + pH - 0.75, w: pW - 0.7, h: 0,
      line: { color: C.border, width: 0.5 },
    });
    // stat
    s.addText(p.stat, {
      x: px + 0.35, y: pY + pH - 0.55, w: pW - 0.7, h: 0.3, margin: 0,
      color: C.gold, fontFace: F_MONO, fontSize: 11, charSpacing: 3, bold: true,
    });
  });
}

// =====================================================================
// SLIDE 7 — RARITY MECHANICS (table + certificate)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 7, "RARITY");

  s.addText("Five axes. One grade.", {
    x: M, y: 1.55, w: 12, h: 1.4, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 44,
  });

  // --- Table (left 60%) ---
  const tblX = M;
  const tblY = 3.5;
  const tblW = 10.4;
  // header rule + column headers
  s.addText("AXIS", {
    x: tblX, y: tblY, w: 3.0, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3,
  });
  s.addText("DEFINITION", {
    x: tblX + 3.4, y: tblY, w: 4.0, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3,
  });
  s.addText("VALUES", {
    x: tblX + 7.6, y: tblY, w: 3.0, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 12, charSpacing: 3,
  });
  s.addShape(pres.shapes.LINE, {
    x: tblX, y: tblY + 0.38, w: tblW, h: 0, line: { color: C.border, width: 0.5 },
  });

  const rows = [
    ["Cultural weight", "Editorial + expert panel grade", "A+ · A · B · C"],
    ["Provenance",      "Who signed, who held, who minted", "Author / Estate / Archive"],
    ["Edition size",    "1 of 1, or capped editions", "1 / 3 / 7 / 21"],
    ["Source fidelity", "Original file vs. re-capture", "Master · Mirror · Derived"],
    ["Era",             "When the artefact entered culture", "1995 — 2015"],
  ];
  rows.forEach((r, i) => {
    const ry = tblY + 0.65 + i * 0.85;
    s.addText(r[0], {
      x: tblX, y: ry, w: 3.0, h: 0.6, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 18,
    });
    s.addText(r[1], {
      x: tblX + 3.4, y: ry + 0.05, w: 4.0, h: 0.8, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 13,
    });
    s.addText(r[2], {
      x: tblX + 7.6, y: ry + 0.05, w: 3.0, h: 0.8, margin: 0,
      color: C.cream, fontFace: F_MONO, fontSize: 11, charSpacing: 2,
    });
    // row divider
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: tblX, y: ry + 0.75, w: tblW, h: 0, line: { color: "1F1B15", width: 0.5 },
      });
    }
  });

  // --- Certificate card (right 40%) ---
  const cX = 11.9;
  const cY = 3.15;
  const cW = SW - M - cX;
  const cH = 6.8;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cX, y: cY, w: cW, h: cH,
    fill: { color: C.panel }, line: { color: "1F1B15", width: 0.5 },
  });
  addCornerBrackets(s, cX + 0.15, cY + 0.15, cW - 0.3, cH - 0.3, C.gold, 0.24, 1);

  s.addText("CERTIFICATE OF AUTHENTICITY — LOT 041", {
    x: cX + 0.5, y: cY + 0.5, w: cW - 1, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  // big A+
  s.addText("A+", {
    x: cX + 0.5, y: cY + 1.15, w: 2.3, h: 1.6, margin: 0,
    color: C.gold, fontFace: F_HEAD, fontSize: 90, valign: "top",
  });
  // Canonical
  s.addText("Canonical", {
    x: cX + 2.6, y: cY + 1.65, w: cW - 3, h: 0.6, margin: 0,
    color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 26,
  });
  s.addText("TOP 2% OF LISTED LOTS", {
    x: cX + 2.6, y: cY + 2.2, w: cW - 3, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 3,
  });
  // rule
  s.addShape(pres.shapes.LINE, {
    x: cX + 0.5, y: cY + 3.1, w: cW - 1, h: 0, line: { color: C.border, width: 0.5 },
  });
  // attr table
  const certAttrs = [
    ["Cultural weight", "9.4 / 10"],
    ["Provenance",      "Author-signed"],
    ["Edition",         "1 of 7"],
    ["Source fidelity", "Master"],
    ["Era",             "2007"],
  ];
  certAttrs.forEach((a, i) => {
    const ry = cY + 3.3 + i * 0.35;
    s.addText(a[0], {
      x: cX + 0.5, y: ry, w: (cW - 1) * 0.6, h: 0.3, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 13,
    });
    s.addText(a[1], {
      x: cX + 0.5 + (cW - 1) * 0.4, y: ry, w: (cW - 1) * 0.6, h: 0.3, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 13, align: "right",
    });
  });
  // bottom monospace
  s.addText("SIGNED — 0x8A…C471   ISSUED — CURIO EXCHANGE ARCHIVE   MINT — BASE · BLOCK 18,220,104", {
    x: cX + 0.5, y: cY + cH - 0.8, w: cW - 1, h: 0.6, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 9.5, charSpacing: 2,
  });
}

// =====================================================================
// SLIDE 8 — TRANSACTION FLOW (6 steps)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 8, "FLOW");

  s.addText("Consign to resell — six steps, one rail.", {
    x: M, y: 1.55, w: 17, h: 1.4, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 40,
  });

  const steps = [
    ["01", "Consign", "Author or archive submits artefact. Curio verifies provenance and signs."],
    ["02", "Grade",   "Expert panel + editorial assign cultural weight and edition size."],
    ["03", "List",    "Lot is published to catalog with reserve, closing time and COA."],
    ["04", "Bid",     "Buyers bid in ETH or USDC. Curio escrows funds; anti-snipe extends close."],
    ["05", "Settle",  "On close, Curio mints, transfers, and releases funds net of fees."],
    ["06", "Resell",  "Every subsequent resale routes a royalty back to creator and archive."],
  ];

  const sy = 4.15;
  const colCount = 6;
  const colW = (SW - 2 * M) / colCount;

  steps.forEach((st, i) => {
    const cx = M + i * colW;
    // circle for number
    s.addShape(pres.shapes.OVAL, {
      x: cx, y: sy, w: 0.5, h: 0.5,
      fill: { color: C.panel }, line: { color: C.border, width: 0.6 },
    });
    s.addText(st[0], {
      x: cx, y: sy, w: 0.5, h: 0.5, margin: 0,
      color: C.gold, fontFace: F_MONO, fontSize: 10, charSpacing: 1, bold: true,
      align: "center", valign: "middle",
    });
    // horizontal connector line
    if (i < colCount - 1) {
      s.addShape(pres.shapes.LINE, {
        x: cx + 0.55, y: sy + 0.25, w: colW - 0.9, h: 0,
        line: { color: C.border, width: 0.5 },
      });
      // arrow character
      s.addText("→", {
        x: cx + colW - 0.35, y: sy + 0.05, w: 0.35, h: 0.35, margin: 0,
        color: C.mute, fontFace: F_BODY, fontSize: 14, align: "center", valign: "middle",
      });
    }
    // title
    s.addText(st[1], {
      x: cx, y: sy + 0.75, w: colW - 0.3, h: 0.55, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 24,
    });
    // description
    s.addText(st[2], {
      x: cx, y: sy + 1.4, w: colW - 0.3, h: 2.0, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 13,
    });
    // vertical column divider
    if (i > 0) {
      s.addShape(pres.shapes.LINE, {
        x: cx - 0.15, y: sy + 0.75, w: 0, h: 4.0,
        line: { color: C.border, width: 0.4 },
      });
    }
  });

  // --- Cash flow bar at bottom ---
  const cfY = 9.35;
  s.addShape(pres.shapes.RECTANGLE, {
    x: M, y: cfY, w: SW - 2 * M, h: 0.65,
    fill: { color: C.panel }, line: { color: C.border, width: 0.5 },
  });
  s.addText(
    [
      { text: "CASH → ",    options: { color: C.gold,  bold: true } },
      { text: "BUYER   →   CURIO ESCROW   →   ", options: { color: C.cream } },
      { text: "12.5% FEE ", options: { color: C.gold, bold: true } },
      { text: "+   CONSIGNOR   →   ", options: { color: C.cream } },
      { text: "5% ROYALTY ", options: { color: C.gold, bold: true } },
      { text: "+   ARCHIVE GRANT", options: { color: C.cream } },
    ],
    {
      x: M + 0.4, y: cfY, w: SW - 2 * M - 0.8, h: 0.65, margin: 0,
      fontFace: F_MONO, fontSize: 11.5, charSpacing: 2, valign: "middle",
    }
  );
}

// =====================================================================
// SLIDE 9 — FEE MODEL
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 9, "FEES");

  s.addText(
    [
      { text: "Blended ", options: { color: C.cream } },
      { text: "take rate of 28.1%", options: { color: C.gold, italic: true } },
      { text: " on primary — 2.0% perpetual on resale.", options: { color: C.cream } },
    ],
    {
      x: M, y: 1.5, w: 17, h: 1.8, margin: 0,
      fontFace: F_HEAD, fontSize: 42,
    }
  );

  // --- Left fee table ---
  const ftX = M;
  const ftY = 3.95;
  const ftW = 10.0;
  // headers
  s.addText("FEE", {
    x: ftX, y: ftY, w: 3.5, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  s.addText("RATE", {
    x: ftX + 4.0, y: ftY, w: 1.5, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  s.addText("NOTE", {
    x: ftX + 5.8, y: ftY, w: 3, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  s.addShape(pres.shapes.LINE, {
    x: ftX, y: ftY + 0.35, w: ftW, h: 0, line: { color: C.border, width: 0.5 },
  });

  const fees = [
    ["Buyer's premium",         "15.0%", "Paid on hammer by buyer"],
    ["Seller's commission",     "12.5%", "Paid on hammer by seller (tiered down to 10% above $50k)"],
    ["Minting / settlement",    "0.3%",  "Flat pass-through, capped at $40"],
    ["Royalty (Curio share)",   "2.0%",  "Of 5% total creator royalty, on every resale"],
    ["Listing / authentication","$250",  "One-time, refunded if lot fails to clear"],
  ];
  fees.forEach((f, i) => {
    const ry = ftY + 0.55 + i * 0.95;
    s.addText(f[0], {
      x: ftX, y: ry + 0.1, w: 3.5, h: 0.7, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 20,
    });
    s.addText(f[1], {
      x: ftX + 3.7, y: ry, w: 2.0, h: 0.8, margin: 0,
      color: C.gold, fontFace: F_HEAD, fontSize: 32,
    });
    s.addText(f[2], {
      x: ftX + 5.8, y: ry + 0.2, w: 4.2, h: 0.7, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 12,
    });
    if (i < fees.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: ftX, y: ry + 0.88, w: ftW, h: 0, line: { color: "1F1B15", width: 0.5 },
      });
    }
  });

  // --- Right illustrative panel ---
  const ilX = 12.2;
  const ilY = 3.85;
  const ilW = SW - M - ilX;
  const ilH = 5.8;
  s.addShape(pres.shapes.RECTANGLE, {
    x: ilX, y: ilY, w: ilW, h: ilH,
    fill: { color: C.panel }, line: { color: "1F1B15", width: 0.5 },
  });
  s.addText("ILLUSTRATIVE — LOT 027", {
    x: ilX + 0.5, y: ilY + 0.4, w: ilW - 1, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });
  s.addText("$100,000 hammer", {
    x: ilX + 0.5, y: ilY + 0.8, w: ilW - 1, h: 0.6, margin: 0,
    color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 24,
  });

  const fLines = [
    ["Hammer price",         "$100,000",  false],
    ["Buyer's premium (15%)","+ $15,000",  false],
    ["Total paid by buyer",  "$115,000",   true],
    ["Seller commission (12.5%)","− $12,500", false],
    ["Settlement fee",       "− $40",      false],
    ["Net to seller",        "$87,460",    false],
    ["Curio gross revenue",  "$27,540",    true],
  ];
  fLines.forEach((ln, i) => {
    const ly = ilY + 1.75 + i * 0.5;
    s.addShape(pres.shapes.LINE, {
      x: ilX + 0.5, y: ly - 0.05, w: ilW - 1, h: 0,
      line: { color: "1F1B15", width: 0.5 },
    });
    s.addText(ln[0], {
      x: ilX + 0.5, y: ly + 0.05, w: (ilW - 1) * 0.65, h: 0.4, margin: 0,
      color: ln[2] ? C.gold : C.cream,
      fontFace: ln[2] ? F_HEAD : F_BODY,
      italic: !!ln[2],
      fontSize: ln[2] ? 14 : 13,
      bold: ln[2],
    });
    s.addText(ln[1], {
      x: ilX + (ilW - 1) * 0.5, y: ly + 0.05, w: (ilW - 1) * 0.5, h: 0.4, margin: 0,
      color: ln[2] ? C.gold : C.cream,
      fontFace: ln[2] ? F_HEAD : F_BODY,
      italic: !!ln[2],
      fontSize: ln[2] ? 14 : 13,
      bold: ln[2],
      align: "right",
    });
  });
}

// =====================================================================
// SLIDE 10 — UNIT ECONOMICS (sensitivity table + scenario cards)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 10, "UNIT ECON");

  s.addText("Net revenue — GMV × contribution margin.", {
    x: M, y: 1.5, w: 12.5, h: 1.8, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 40,
  });

  // Right-side meta
  s.addText("TAKE RATE — 27.0% CURRENT\nRUN-RATE GMV — $28M   VALUES IN\n$M NET REVENUE", {
    x: SW - M - 5, y: 1.9, w: 5, h: 1.1, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2, align: "right",
  });

  // --- Sensitivity table (left) ---
  const mtX = M;
  const mtY = 4.15;
  const mtW = 10.6;
  // header "CONTRIBUTION MARGIN"
  s.addText("CONTRIBUTION MARGIN", {
    x: mtX + 1.1, y: mtY, w: mtW - 1.1, h: 0.3, margin: 0,
    color: C.gold, fontFace: F_MONO, fontSize: 11, charSpacing: 3, align: "center",
  });
  s.addShape(pres.shapes.LINE, {
    x: mtX, y: mtY + 0.35, w: mtW, h: 0, line: { color: C.border, width: 0.5 },
  });

  // column headers
  const colHeaders = ["GMV", "55 %", "60 %", "65 %", "70 %", "75 %"];
  const colGMVW = 1.4;
  const colDataW = (mtW - colGMVW) / 5;
  colHeaders.forEach((h, i) => {
    const cx = mtX + (i === 0 ? 0 : colGMVW + (i - 1) * colDataW);
    const cw = i === 0 ? colGMVW : colDataW;
    s.addText(h, {
      x: cx, y: mtY + 0.4, w: cw, h: 0.35, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 2,
      align: i === 0 ? "left" : "center",
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: mtX, y: mtY + 0.8, w: mtW, h: 0, line: { color: C.border, width: 0.5 },
  });

  const rowsData = [
    ["$ 25 M",  "$ 3.7",  "$ 4.0",  "$ 4.4",  "$ 4.7",  "$ 5.1"],
    ["$ 50 M",  "$ 7.4",  "$ 8.1",  "$ 8.8",  "$ 9.4",  "$ 10.1"],
    ["$ 100 M", "$ 14.9", "$ 16.2", "$ 17.6", "$ 18.9", "$ 20.3"],
    ["$ 200 M", "$ 29.7", "$ 32.4", "$ 35.1", "$ 37.8", "$ 40.5"],
    ["$ 400 M", "$ 59.4", "$ 64.8", "$ 70.2", "$ 75.6", "$ 81.0"],
  ];
  const rowH = 0.85;
  rowsData.forEach((r, ri) => {
    const ry = mtY + 0.9 + ri * rowH;
    // highlight the Y2 base case cell: GMV=100M (row 2), 65% CM (column 3 of data => index 3 overall)
    if (ri === 2) {
      const hx = mtX + colGMVW + 2 * colDataW;
      s.addShape(pres.shapes.RECTANGLE, {
        x: hx + 0.15, y: ry + 0.08, w: colDataW - 0.3, h: rowH - 0.18,
        fill: { color: C.gold }, line: { color: C.gold, width: 0 },
      });
    }
    r.forEach((cell, ci) => {
      const cx = mtX + (ci === 0 ? 0 : colGMVW + (ci - 1) * colDataW);
      const cw = ci === 0 ? colGMVW : colDataW;
      const isHighlighted = ri === 2 && ci === 3;
      s.addText(cell, {
        x: cx, y: ry, w: cw, h: rowH, margin: 0,
        color: isHighlighted ? C.bg : C.cream,
        fontFace: F_BODY, fontSize: 15,
        bold: isHighlighted,
        align: ci === 0 ? "left" : "center",
        valign: "middle",
      });
    });
    // row divider
    if (ri < rowsData.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: mtX, y: ry + rowH, w: mtW, h: 0, line: { color: "1F1B15", width: 0.5 },
      });
    }
  });

  // caption under table
  s.addText(
    "HIGHLIGHTED — Y2 BASE CASE ($100M GMV · 65% CM · $17.6M NET)   EXCL. PRIMARY ROYALTY STREAM ON SECONDARY VOLUME",
    {
      x: mtX, y: mtY + 0.9 + 5 * rowH + 0.25, w: mtW, h: 0.4, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10, charSpacing: 2,
    }
  );

  // --- Scenario cards (right) ---
  const scX = 12.3;
  const scY = 4.15;
  const scW = SW - M - scX;
  const scH = 1.4;
  const scenarios = [
    { name: "Bear", gmv: "$60M",  rev: "$9.7M",  op: "$4.5M net burn", highlight: false, italic: false },
    { name: "Base", gmv: "$100M", rev: "$17.6M", op: "Break-even",     highlight: true,  italic: false },
    { name: "Bull", gmv: "$240M", rev: "$45.4M", op: "$22M FCF",       highlight: false, italic: true  },
  ];
  scenarios.forEach((sc, i) => {
    const sy = scY + i * (scH + 0.22);
    s.addShape(pres.shapes.RECTANGLE, {
      x: scX, y: sy, w: scW, h: scH,
      fill: { color: C.panel },
      line: { color: sc.highlight ? C.gold : C.border, width: sc.highlight ? 1.5 : 0.5 },
    });
    // name (italic serif)
    s.addText(sc.name, {
      x: scX + 0.3, y: sy + 0.3, w: 1.4, h: 0.9, margin: 0,
      color: sc.name === "Bull" ? C.gold : (sc.name === "Bear" ? C.mute : C.cream),
      fontFace: F_HEAD, italic: true, fontSize: 28,
    });
    // 3 stats
    const cellW = (scW - 1.9) / 3;
    const cols = [
      ["GMV Y2",    sc.gmv],
      ["NET REV",   sc.rev],
      ["OPERATING", sc.op],
    ];
    cols.forEach((c, ci) => {
      const cx = scX + 1.7 + ci * cellW;
      s.addText(c[0], {
        x: cx, y: sy + 0.2, w: cellW, h: 0.28, margin: 0,
        color: C.mute, fontFace: F_MONO, fontSize: 9, charSpacing: 2,
      });
      s.addText(c[1], {
        x: cx, y: sy + 0.55, w: cellW - 0.2, h: 0.8, margin: 0,
        color: C.cream, fontFace: F_HEAD, italic: true, fontSize: ci === 2 ? 16 : 20,
      });
    });
  });
}

// =====================================================================
// SLIDE 11 — RISKS (2x2 grid)
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 11, "RISKS");

  s.addText("Four risks we underwrite — candidly.", {
    x: M, y: 1.55, w: 17, h: 1.4, margin: 0,
    color: C.cream, fontFace: F_HEAD, fontSize: 46,
  });

  const risks = [
    {
      n: "0 1", title: "Regulatory",
      body: "NFTs remain loosely governed. Curio's consignment structure and KYC'd flows are designed for precedent under securities and auction law.",
      mit: "Mitigant — Legal opinions on hand; auction-house analog.",
    },
    {
      n: "0 2", title: "Category fatigue",
      body: "2021 oversupply scarred the casual buyer. Curation is the product; the brand must stand apart from open marketplaces.",
      mit: "Mitigant — Invitation-only consignment; ≤ 40 lots/month.",
    },
    {
      n: "0 3", title: "IP / provenance",
      body: "Memes are often orphaned. Misattribution risk is real and reputationally expensive.",
      mit: "Mitigant — Editorial panel + estate partnerships + insurance.",
    },
    {
      n: "0 4", title: "Liquidity",
      body: "Thin secondary markets for collectibles. Floor-price exposure in bear cycles.",
      mit: "Mitigant — Curio as market-maker of last resort at 60% of last trade.",
    },
  ];

  const grid = { x: M, y: 4.0, colW: (SW - 2 * M) / 2 - 0.3, rowH: 3.0, colGap: 0.6, rowGap: 0.5 };

  risks.forEach((r, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const rx = grid.x + col * (grid.colW + grid.colGap);
    const ry = grid.y + row * (grid.rowH + grid.rowGap);

    // top rule
    s.addShape(pres.shapes.LINE, {
      x: rx, y: ry, w: grid.colW, h: 0, line: { color: C.border, width: 0.75 },
    });
    // number
    s.addText(r.n, {
      x: rx, y: ry + 0.35, w: 0.6, h: 0.35, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
    });
    // title
    s.addText(r.title, {
      x: rx + 0.7, y: ry + 0.22, w: grid.colW - 0.7, h: 0.7, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 30,
    });
    // body
    s.addText(r.body, {
      x: rx, y: ry + 1.1, w: grid.colW, h: 1.2, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 15,
    });
    // mitigant
    s.addText(r.mit, {
      x: rx, y: ry + 2.35, w: grid.colW, h: 0.4, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 2,
    });
  });
}

// =====================================================================
// SLIDE 12 — THE ASK
// =====================================================================
{
  const s = pres.addSlide();
  addPageFrame(s, 12, "CLOSE");

  // Left title with italic gold portion
  s.addText(
    [
      { text: "$2.0M at $25M pre — ", options: { color: C.cream, breakLine: true } },
      { text: "an early position in the category's curatorial winner.", options: { color: C.gold, italic: true } },
    ],
    {
      x: M, y: 2.55, w: 10.5, h: 4.2, margin: 0,
      fontFace: F_HEAD, fontSize: 44,
    }
  );

  // Supporting paragraph with gold left rule
  s.addShape(pres.shapes.LINE, {
    x: M, y: 7.2, w: 0, h: 1.3, line: { color: C.gold, width: 1.5 },
  });
  s.addText(
    "Downside is sized like a venture position. Upside, in our view, is the next Sotheby's — for a generation whose culture lives in text files, PNGs and first posts.",
    {
      x: M + 0.25, y: 7.15, w: 9.5, h: 1.5, margin: 0,
      color: C.cream, fontFace: F_BODY, fontSize: 16,
    }
  );

  // --- Terms card (right) ---
  const tX = 11.4;
  const tY = 2.6;
  const tW = SW - M - tX;
  const tH = 6.4;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tX, y: tY, w: tW, h: tH,
    fill: { color: C.panel }, line: { color: "1F1B15", width: 0.5 },
  });
  addCornerBrackets(s, tX + 0.18, tY + 0.18, tW - 0.36, tH - 0.36, C.border, 0.24, 1);

  s.addText("TERMS — INDICATIVE", {
    x: tX + 0.5, y: tY + 0.5, w: tW - 1, h: 0.3, margin: 0,
    color: C.mute, fontFace: F_MONO, fontSize: 11, charSpacing: 3,
  });

  const terms = [
    ["ROUND",                "Seed (priced)"],
    ["PRE-MONEY",            "$25.0M"],
    ["OUR ALLOCATION",       "$2.0M"],
    ["INSTRUMENT",           "Preferred equity"],
    ["LIQUIDITY PREFERENCE", "1.0× non-participating"],
    ["BOARD",                "Observer seat"],
    ["USE OF FUNDS",         "Curation team, estate partnerships, 24-mo runway"],
    ["CURRENT GMV (RUN-RATE)", "$28M"],
    ["CLOSE TARGET",         "Q3 2026"],
  ];
  const trStart = tY + 1.0;
  const trH = 0.55;
  terms.forEach((t, i) => {
    const ry = trStart + i * trH;
    s.addText(t[0], {
      x: tX + 0.5, y: ry, w: tW * 0.42, h: trH, margin: 0,
      color: C.mute, fontFace: F_MONO, fontSize: 10.5, charSpacing: 2, valign: "middle",
    });
    s.addText(t[1], {
      x: tX + tW * 0.38, y: ry, w: tW * 0.58, h: trH, margin: 0,
      color: C.cream, fontFace: F_HEAD, italic: true, fontSize: 14,
      align: "right", valign: "middle",
    });
    if (i < terms.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: tX + 0.5, y: ry + trH - 0.02, w: tW - 1, h: 0,
        line: { color: "1F1B15", width: 0.5 },
      });
    }
  });
}

// ---------- write ----------
pres.writeFile({ fileName: "NFTs.pptx" }).then((name) => {
  console.log("Wrote " + name);
});
