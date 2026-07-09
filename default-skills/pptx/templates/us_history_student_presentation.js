// Rebuild "Forging a Nation" presentation with pptxgenjs
// Faithful reproduction of Deliverable_7.pptx

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Original slide size: 20" x 11.25" (custom, 16:9 extra-wide)
pres.defineLayout({ name: "CUSTOM_20x11", width: 20, height: 11.25 });
pres.layout = "CUSTOM_20x11";
pres.title = "Forging a Nation";
pres.author = "The Student";

// ============================================================
// Design tokens — palette, fonts, helpers
// ============================================================

const C = {
  bg: "F2EAD8",        // cream paper
  panel: "EBE0C7",     // darker cream (plate panels)
  tan: "A89778",       // tan (plate borders, accents)
  ink: "1C1A15",       // near-black (titles)
  text: "3A332A",      // body text
  muted: "6B6253",     // secondary/label text
  red: "8A2A1F",       // oxblood accent
  gold: "8A6D2E",      // muted gold (rare)
  white: "FFFFFF",
};

const F = {
  sans: "Inter",              // body / headings (fallback: system sans)
  serif: "Cormorant Garamond", // italic display accents
  serifBody: "EB Garamond",
  mono: "IBM Plex Mono",       // (declared in original, not heavily used)
};

const SLIDE_W = 20;
const SLIDE_H = 11.25;

// -----------------------------------------------------------------
// Reusable chrome: outer frame + footer + page number
// -----------------------------------------------------------------
function addFrame(slide) {
  // outer thin rectangular border (inset from edges)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.6, w: SLIDE_W - 1.2, h: SLIDE_H - 1.2,
    fill: { type: "solid", color: C.bg },
    line: { color: C.tan, width: 0.5 },
  });
}

function addFooter(slide, { brand = "FORGING A NATION", section = "", page = "" } = {}) {
  // Footer text row — three non-overlapping regions across slide width
  slide.addText(brand, {
    x: 1.2, y: SLIDE_H - 0.45, w: 5, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, bold: false, align: "left", valign: "middle",
    margin: 0,
  });
  slide.addText(section, {
    x: 6.4, y: SLIDE_H - 0.45, w: 7.2, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, align: "center", valign: "middle",
    margin: 0,
  });
  slide.addText(page, {
    x: 13.8, y: SLIDE_H - 0.45, w: 5, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, align: "right", valign: "middle",
    margin: 0,
  });
}

// Small decorative divider: thin line – diamond – thin line
function addDivider(slide, x, y, width = 2.2) {
  const half = (width - 0.2) / 2;
  slide.addShape(pres.shapes.LINE, {
    x: x, y: y, w: half, h: 0,
    line: { color: C.tan, width: 0.75 },
  });
  // diamond (rotated small square)
  slide.addShape(pres.shapes.DIAMOND, {
    x: x + half + 0.03, y: y - 0.07, w: 0.14, h: 0.14,
    fill: { color: C.tan }, line: { color: C.tan, width: 0 },
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + half + 0.2, y: y, w: half, h: 0,
    line: { color: C.tan, width: 0.75 },
  });
}

// "Plate" panel (beige filled rectangle with muted label top-left / bottom-left)
function addPlate(slide, { x, y, w, h, label = "PLATE", caption = "" }) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.panel },
    line: { color: C.tan, width: 0.75 },
  });
  slide.addText(label, {
    x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, margin: 0, valign: "top",
  });
  if (caption) {
    slide.addText(caption, {
      x: x + 0.25, y: y + h - 0.7, w: w - 0.5, h: 0.5,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      charSpacing: 6, margin: 0, valign: "bottom",
    });
  }
}

// ================================================================
// SLIDE 1 — Cover
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  // Left vertical accent line (thin tan line)
  s.addShape(pres.shapes.LINE, {
    x: 1.9, y: 1.5, w: 0, h: SLIDE_H - 3,
    line: { color: C.tan, width: 0.75 },
  });

  // Eyebrow: AN UNDERGRADUATE LECTURE · MMXXVI
  s.addText("AN UNDERGRADUATE LECTURE  ·  MMXXVI", {
    x: 2.4, y: 1.85, w: 11, h: 0.5,
    fontFace: F.sans, fontSize: 20, color: C.red,
    charSpacing: 10, bold: false, margin: 0,
  });

  // Big title — Forging a Nation (with italic "a" in red)
  s.addText(
    [
      { text: "Forging ", options: { color: C.ink, bold: false } },
      { text: "a", options: { color: C.red, italic: true } },
      { text: "\nNation", options: { color: C.ink, bold: false, breakLine: false } },
    ],
    {
      x: 2.4, y: 2.4, w: 10, h: 3.2,
      fontFace: F.sans, fontSize: 120, bold: false, margin: 0,
      paraSpaceAfter: 0, lineSpacingMultiple: 0.95,
    }
  );

  // Divider
  addDivider(s, 2.4, 6.1, 2.8);

  // Subtitle — italic
  s.addText("The Creation of the United States, from colony to constitution.", {
    x: 2.4, y: 6.35, w: 10.5, h: 1.2,
    fontFace: F.sans, fontSize: 30, italic: true, color: C.text, margin: 0,
    valign: "top",
  });

  // Right-side plate: engraved eagle / great seal
  addPlate(s, {
    x: 13.6, y: 2.0, w: 4.6, h: 6.2,
    label: "PLATE   I",
    caption: "INSERT: ENGRAVED EAGLE /\nGREAT SEAL",
  });

  // Footer for title slide is different
  s.addText("THE FOUNDING ERA  ·  1607 — 1791", {
    x: 1.2, y: SLIDE_H - 0.45, w: 6.5, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, margin: 0, valign: "middle",
  });
  s.addText("PRESENTED BY THE STUDENT", {
    x: 8.0, y: SLIDE_H - 0.45, w: 6, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, align: "center", margin: 0, valign: "middle",
  });
  s.addText("I", {
    x: SLIDE_W - 2.2, y: SLIDE_H - 0.45, w: 1, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted,
    charSpacing: 6, align: "right", margin: 0, valign: "middle",
  });
}

// ================================================================
// SLIDE 2 — Chapter 01: Colonial roots & tensions
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 01", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Big headline
  s.addText(
    [
      { text: "Thirteen", options: { breakLine: true } },
      { text: "colonies. " },
      { text: "One", options: { color: C.red, italic: true, breakLine: true } },
      { text: "restless Atlantic", options: { breakLine: true } },
      { text: "world." },
    ],
    {
      x: 1.2, y: 1.85, w: 10, h: 5.2,
      fontFace: F.sans, fontSize: 80, color: C.ink, bold: false,
      lineSpacingMultiple: 1.0, margin: 0,
    }
  );

  addDivider(s, 1.2, 7.45, 2.4);

  s.addText(
    [
      { text: "By 1750, more than a million British subjects lived along the eastern seaboard — farmers, merchants, enslaved Africans, and Indigenous peoples whose lands had been taken. They were loosely governed, deeply self-reliant, and beginning to think of themselves as " },
      { text: "Americans", options: { italic: true } },
      { text: "." },
    ],
    {
      x: 1.2, y: 7.8, w: 8.5, h: 2.2,
      fontFace: F.sans, fontSize: 20, color: C.text,
      lineSpacingMultiple: 1.4, margin: 0, valign: "top",
    }
  );

  // Right column: 3 Plates
  // big left plate (MAP)
  addPlate(s, {
    x: 10.4, y: 1.4, w: 4.3, h: 7.3,
    label: "PLATE II · A",
    caption: "MAP: 13 COLONIES, C.\n1750",
  });
  // top right (TOBACCO)
  addPlate(s, {
    x: 15.0, y: 1.4, w: 3.8, h: 3.5,
    label: "PLATE II · B",
    caption: "TOBACCO / PORT",
  });
  // bottom right (TOWN MEETING)
  addPlate(s, {
    x: 15.0, y: 5.2, w: 3.8, h: 3.5,
    label: "PLATE II · C",
    caption: "TOWN MEETING",
  });

  addFooter(s, { section: "COLONIAL ROOTS  &  TENSIONS", page: "02 / 10" });
}

// ================================================================
// SLIDE 3 — Chapter 02: Ideas & influences (3 portraits)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 02", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Headline — Ideas in red italic, rest black
  s.addText(
    [
      { text: "Ideas", options: { color: C.red, italic: true } },
      { text: " that lit the fuse.", options: { color: C.ink } },
    ],
    {
      x: 1.2, y: 1.85, w: 17, h: 1.3,
      fontFace: F.sans, fontSize: 70, bold: false, margin: 0,
    }
  );

  // Horizontal divider across the whole page under title
  const dividerY = 3.5;
  const leftLineW = (SLIDE_W - 2.4 - 0.2) / 2;
  s.addShape(pres.shapes.LINE, {
    x: 1.2, y: dividerY, w: leftLineW, h: 0,
    line: { color: C.tan, width: 0.5 },
  });
  s.addShape(pres.shapes.DIAMOND, {
    x: 1.2 + leftLineW + 0.03, y: dividerY - 0.07, w: 0.14, h: 0.14,
    fill: { color: C.tan }, line: { color: C.tan, width: 0 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 1.2 + leftLineW + 0.2, y: dividerY, w: leftLineW, h: 0,
    line: { color: C.tan, width: 0.5 },
  });

  // Three figures
  const figures = [
    { n: "FIG.  I",   dates: "1632 — 1704",  name: "John Locke",   desc: "Natural rights · consent of the governed",
      quote: "“ Life, liberty, and property. ”" },
    { n: "FIG.  II",  dates: "1689 — 1755",  name: "Montesquieu",  desc: "Separation of powers",
      quote: "“ Power should be a check to power. ”" },
    { n: "FIG.  III", dates: "1737 — 1809",  name: "Thomas Paine", desc: "Popular revolution",
      quote: "“ We have it in our power to begin the world over again. ”" },
  ];

  const colW = 5.7;
  const gap = 0.3;
  const startX = 1.2;
  figures.forEach((fig, i) => {
    const x = startX + i * (colW + gap);

    // Portrait plate
    const plateY = 4.0;
    const plateH = 2.8;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: plateY, w: colW, h: plateH,
      fill: { color: C.panel },
      line: { color: C.tan, width: 0.75 },
    });
    s.addText(fig.n, {
      x: x + 0.25, y: plateY + 0.2, w: colW - 0.5, h: 0.35,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      charSpacing: 6, margin: 0,
    });
    s.addText("PORTRAIT", {
      x: x + 0.25, y: plateY + plateH - 0.6, w: colW - 0.5, h: 0.4,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      charSpacing: 6, margin: 0, valign: "bottom",
    });

    // Dates
    s.addText(fig.dates, {
      x, y: plateY + plateH + 0.2, w: colW, h: 0.4,
      fontFace: F.sans, fontSize: 15, color: C.muted,
      charSpacing: 6, margin: 0,
    });
    // Name
    s.addText(fig.name, {
      x, y: plateY + plateH + 0.55, w: colW, h: 0.6,
      fontFace: F.sans, fontSize: 34, color: C.ink, bold: false, margin: 0,
    });
    // Description
    s.addText(fig.desc, {
      x, y: plateY + plateH + 1.2, w: colW, h: 0.4,
      fontFace: F.sans, fontSize: 18, color: C.text, margin: 0,
    });
    // Quote with small left red bar
    const quoteY = plateY + plateH + 1.75;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: quoteY, w: 0.04, h: 0.9,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(fig.quote, {
      x: x + 0.15, y: quoteY, w: colW - 0.15, h: 0.9,
      fontFace: F.sans, fontSize: 16, italic: true, color: C.text, margin: 0,
      valign: "middle",
    });
  });

  addFooter(s, { section: "IDEAS  &  INFLUENCES", page: "03 / 10" });
}

// ================================================================
// SLIDE 4 — Chapter 03: Road to Revolution (6 events)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 03", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Big quote headline
  s.addText(
    [
      { text: "“" },
      { text: "No taxation", options: { italic: true } },
      { text: " without\nrepresentation.”" },
    ],
    {
      x: 1.2, y: 1.85, w: 17, h: 2.6,
      fontFace: F.sans, fontSize: 80, color: C.ink, bold: false, margin: 0,
      lineSpacingMultiple: 1.0,
    }
  );

  // Attribution
  s.addText("— a grievance, 1765  ·  a rallying cry, 1775", {
    x: 1.2, y: 4.5, w: 12, h: 0.5,
    fontFace: F.sans, fontSize: 22, italic: true, color: C.muted, margin: 0,
  });

  // Six events in a row
  const events = [
    { year: "1764", title: "Sugar Act",             desc: "Revenue, not regulation." },
    { year: "1765", title: "Stamp Act",             desc: "A tax on every printed page." },
    { year: "1770", title: "Boston Massacre",       desc: "Five dead on King Street." },
    { year: "1773", title: "Tea Act / Boston Tea Party", desc: "340 chests into the harbor." },
    { year: "1774", title: "Intolerable Acts",      desc: "Port closed. Self-rule suspended." },
    { year: "1775", title: "Lexington & Concord",   desc: "“The shot heard round the world.”" },
  ];

  const availW = SLIDE_W - 2.4;
  const cellGap = 0.15;
  const cellW = (availW - cellGap * 5) / 6;
  const rowY = 6.5;

  events.forEach((ev, i) => {
    const x = 1.2 + i * (cellW + cellGap);
    // Top thin line
    s.addShape(pres.shapes.LINE, {
      x, y: rowY, w: cellW - 0.2, h: 0,
      line: { color: C.tan, width: 0.5 },
    });
    // Year in red
    s.addText(ev.year, {
      x, y: rowY + 0.2, w: cellW, h: 0.6,
      fontFace: F.sans, fontSize: 30, color: C.red, margin: 0,
    });
    // Title bold
    s.addText(ev.title, {
      x, y: rowY + 0.85, w: cellW - 0.1, h: 0.95,
      fontFace: F.sans, fontSize: 20, bold: true, color: C.ink, margin: 0,
      valign: "top",
    });
    // Description italic muted
    s.addText(ev.desc, {
      x, y: rowY + 1.95, w: cellW - 0.1, h: 0.9,
      fontFace: F.sans, fontSize: 15, italic: true, color: C.muted, margin: 0,
      valign: "top",
    });
  });

  addFooter(s, { section: "ROAD TO REVOLUTION", page: "04 / 10" });
}

// ================================================================
// SLIDE 5 — Chapter 04: Declaration of Independence
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 04", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Left: date headline
  s.addText(
    [
      { text: "July 4, " },
      { text: "1776.", options: { color: C.red, italic: true } },
    ],
    {
      x: 1.2, y: 1.85, w: 7.5, h: 1.3,
      fontFace: F.sans, fontSize: 68, color: C.ink, bold: false, margin: 0,
    }
  );

  addDivider(s, 1.2, 3.5, 2.4);

  // subtitle italic
  s.addText("Drafted in eighteen days by Jefferson, edited in Congress,\nadopted in Philadelphia.", {
    x: 1.2, y: 3.75, w: 7.5, h: 1.0,
    fontFace: F.sans, fontSize: 18, italic: true, color: C.text, margin: 0,
    lineSpacingMultiple: 1.3,
  });

  // Stats stack
  const statY = 5.2;
  const stats = [
    { big: "56",    lbl: "SIGNERS" },
    { big: "13",    lbl: "UNITED COLONIES" },
    { big: "1,337", lbl: "WORDS" },
  ];
  stats.forEach((st, i) => {
    s.addText(st.big, {
      x: 1.2, y: statY + i * 1.1, w: 2.5, h: 1.0,
      fontFace: F.sans, fontSize: 46, color: C.red, bold: false, margin: 0,
      valign: "middle",
    });
    s.addText(st.lbl, {
      x: 3.8, y: statY + i * 1.1, w: 4, h: 1.0,
      fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
      valign: "middle",
    });
  });

  // Right: the big preamble quote
  s.addText(
    [
      { text: "“  We hold these " },
      { text: "truths", options: { italic: true } },
      { text: " to be self-evident, that all men are created equal, that they are endowed by their Creator with certain " },
      { text: "unalienable Rights", options: { color: C.red, italic: true } },
      { text: " , that among these are Life, Liberty and the pursuit of Happiness." },
    ],
    {
      x: 9.0, y: 1.85, w: 9.6, h: 7.0,
      fontFace: F.sans, fontSize: 46, color: C.ink, margin: 0,
      lineSpacingMultiple: 1.15, valign: "top",
    }
  );

  // Attribution
  s.addText("— THE DECLARATION OF INDEPENDENCE, PREAMBLE", {
    x: 9.0, y: 8.95, w: 9.6, h: 0.5,
    fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
  });

  addFooter(s, { section: "DECLARATION OF INDEPENDENCE", page: "05 / 10" });
}

// ================================================================
// SLIDE 6 — Chapter 05: Revolutionary War (ledger of battles)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 05", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Headline
  s.addText(
    [
      { text: "Eight years. " },
      { text: "A", options: { color: C.red, italic: true, breakLine: true } },
      { text: "continent", options: { color: C.red, italic: true } },
      { text: " at", options: { color: C.ink, breakLine: true } },
      { text: "war.", options: { color: C.ink } },
    ],
    {
      x: 1.2, y: 2.0, w: 9, h: 3.5,
      fontFace: F.sans, fontSize: 64, color: C.ink, bold: false, margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  addDivider(s, 1.2, 5.8, 2.4);

  s.addText(
    [
      { text: "An untrained Continental Army, commanded by Washington and bankrolled by an upstart Congress, out-endured the greatest empire on earth — with decisive help from France after " },
      { text: "Saratoga", options: { italic: true } },
      { text: "." },
    ],
    {
      x: 1.2, y: 6.1, w: 8.5, h: 1.8,
      fontFace: F.sans, fontSize: 18, color: C.text, margin: 0,
      lineSpacingMultiple: 1.4, valign: "top",
    }
  );

  // Right: ledger
  const ledgerX = 10.4;
  const ledgerW = SLIDE_W - ledgerX - 1.2; // to right margin
  s.addText("LEDGER OF ARMS", {
    x: ledgerX, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
  });
  // Top line
  s.addShape(pres.shapes.LINE, {
    x: ledgerX, y: 1.85, w: ledgerW, h: 0,
    line: { color: C.tan, width: 0.5 },
  });

  const battles = [
    { yr: "1775", name: "Bunker Hill",   note: "Costly British victory.",         num: "01" },
    { yr: "1776", name: "Trenton",       note: "Washington crosses the Delaware.", num: "02" },
    { yr: "1777", name: "Saratoga",      note: "The turning point; France enters.", num: "03" },
    { yr: "1778", name: "Valley Forge",  note: "A winter that forged an army.",   num: "04" },
    { yr: "1781", name: "Yorktown",      note: "Cornwallis surrenders.",          num: "05" },
    { yr: "1783", name: "Treaty of Paris", note: "Independence recognized.",      num: "06" },
  ];
  const rowH = 1.1;
  battles.forEach((b, i) => {
    const ry = 2.0 + i * rowH;
    s.addText(b.yr, {
      x: ledgerX + 0.1, y: ry, w: 1.0, h: rowH,
      fontFace: F.sans, fontSize: 22, color: C.red, margin: 0, valign: "middle",
    });
    s.addText(b.name, {
      x: ledgerX + 1.3, y: ry, w: 2.7, h: rowH,
      fontFace: F.sans, fontSize: 26, color: C.ink, bold: false, margin: 0, valign: "middle",
    });
    s.addText(b.note, {
      x: ledgerX + 4.1, y: ry, w: 4.2, h: rowH,
      fontFace: F.sans, fontSize: 16, italic: true, color: C.text, margin: 0, valign: "middle",
    });
    s.addText(b.num, {
      x: ledgerX + ledgerW - 0.6, y: ry, w: 0.5, h: rowH,
      fontFace: F.sans, fontSize: 13, color: C.muted, charSpacing: 4, margin: 0,
      align: "right", valign: "middle",
    });
    // bottom line
    s.addShape(pres.shapes.LINE, {
      x: ledgerX, y: ry + rowH, w: ledgerW, h: 0,
      line: { color: C.tan, width: 0.4 },
    });
  });

  addFooter(s, { section: "REVOLUTIONARY WAR", page: "06 / 10" });
}

// ================================================================
// SLIDE 7 — Chapter 06: Continuous timeline
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 06", {
    x: 1.2, y: 1.25, w: 3, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });
  s.addText("CHRONOLOGICUM · 1607 — 1791", {
    x: 4.3, y: 1.25, w: 9, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });
  s.addText(
    [
      { text: "A " },
      { text: "continuous", options: { color: C.red, italic: true } },
      { text: " timeline." },
    ],
    {
      x: 1.2, y: 1.65, w: 12, h: 1.2,
      fontFace: F.sans, fontSize: 62, color: C.ink, bold: false, margin: 0,
    }
  );

  // Timeline axis — placed lower to free up top area for title + era labels
  const axisY = 6.3;
  const axisStart = 1.5;
  const axisEnd = SLIDE_W - 1.8;  // leave extra room on right for dense labels
  const axisW = axisEnd - axisStart;
  s.addShape(pres.shapes.LINE, {
    x: axisStart, y: axisY, w: axisW, h: 0,
    line: { color: C.ink, width: 1.25 },
  });

  // Era → axis-fraction mapping. Non-linear: compress the empty colonial
  // stretch, give dense 1763-1791 region more horizontal room.
  // Piecewise-linear: map year ranges to fractions of axis.
  const stops = [
    { y: 1607, f: 0.00 },
    { y: 1754, f: 0.32 },
    { y: 1763, f: 0.40 },
    { y: 1770, f: 0.50 },
    { y: 1775, f: 0.60 },
    { y: 1783, f: 0.78 },
    { y: 1787, f: 0.88 },
    { y: 1791, f: 1.00 },
  ];
  const yearMin = 1607, yearMax = 1791;
  const yr = (y) => {
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i], b = stops[i + 1];
      if (y >= a.y && y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        const frac = a.f + t * (b.f - a.f);
        return axisStart + frac * axisW;
      }
    }
    return axisStart + axisW * (y - yearMin) / (yearMax - yearMin);
  };

  // Era segmentation — just subtle vertical tick marks at boundaries
  // (labels omitted: at larger type they collide with event labels)
  const eras = [
    { x1: 1607, x2: 1763 },
    { x1: 1763, x2: 1775 },
    { x1: 1775, x2: 1783 },
    { x1: 1783, x2: 1791 },
  ];
  eras.forEach((e) => {
    s.addShape(pres.shapes.LINE, {
      x: yr(e.x1), y: axisY - 0.2, w: 0, h: 0.15,
      line: { color: C.tan, width: 0.6 },
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: yr(yearMax), y: axisY - 0.2, w: 0, h: 0.15,
    line: { color: C.tan, width: 0.6 },
  });

  // Small tick marks along axis — only in the sparse colonial era for texture
  for (let y = yearMin; y <= 1763; y += 4) {
    s.addShape(pres.shapes.LINE, {
      x: yr(y), y: axisY - 0.05, w: 0, h: 0.1,
      line: { color: C.muted, width: 0.4 },
    });
  }

  // Events on timeline. Use `level` (1, 2, ...) to stagger label heights
  // preventing overlaps in dense regions. Higher level = farther from axis.
  const events = [
    { y: 1607, label: "Jamestown founded",         side: "above", level: 1, founding: false },
    { y: 1620, label: "Mayflower Compact",          side: "below", level: 1, founding: false },
    { y: 1754, label: "French & Indian\nWar begins", side: "above", level: 1, founding: false },
    { y: 1763, label: "Proclamation of 1763",       side: "below", level: 1, founding: false },
    { y: 1765, label: "Stamp Act",                  side: "above", level: 2, founding: false },
    { y: 1770, label: "Boston Massacre",            side: "below", level: 2, founding: false },
    { y: 1773, label: "Boston Tea Party",           side: "above", level: 3, founding: false },
    { y: 1774, label: "First Continental\nCongress", side: "below", level: 3, founding: false },
    { y: 1775, label: "Lexington & Concord",        side: "above", level: 4, founding: false },
    { y: 1776, label: "Declaration\nof Independence", side: "below", level: 4, founding: true },
    { y: 1777, label: "Saratoga",                   side: "above", level: 5, founding: false },
    { y: 1781, label: "Yorktown",                   side: "below", level: 2, founding: false },
    { y: 1783, label: "Treaty of Paris",            side: "above", level: 6, founding: false },
    { y: 1787, label: "Constitutional\nConvention",  side: "below", level: 5, founding: true },
    { y: 1788, label: "Constitution ratified",      side: "above", level: 5, founding: false },
    { y: 1789, label: "Washington\ninaugurated",    side: "below", level: 2, founding: false },
    { y: 1791, label: "Bill of Rights",             side: "above", level: 7, founding: true },
  ];

  // Level spacing
  const levelStep = 0.62;    // per-level vertical offset (room for 2-line 13pt labels)
  const baseOffset = 0.45;   // gap from axis to first year label
  const labelW = 2.2;        // label width accommodating 13pt single-line text

  events.forEach((e) => {
    const x = yr(e.y);
    // marker
    if (e.founding) {
      s.addShape(pres.shapes.DIAMOND, {
        x: x - 0.11, y: axisY - 0.11, w: 0.22, h: 0.22,
        fill: { color: C.red }, line: { color: C.red, width: 0 },
      });
    } else {
      s.addShape(pres.shapes.OVAL, {
        x: x - 0.08, y: axisY - 0.08, w: 0.16, h: 0.16,
        fill: { color: C.bg }, line: { color: C.ink, width: 0.75 },
      });
    }

    if (e.side === "above") {
      const yearY = axisY - baseOffset - e.level * levelStep;
      // connector line going up from the axis
      const lineTop = yearY + 0.3;
      s.addShape(pres.shapes.LINE, {
        x, y: lineTop, w: 0, h: (axisY - 0.1) - lineTop,
        line: { color: C.tan, width: 0.4 },
      });
      // year sits between axis and label
      s.addText(String(e.y), {
        x: x - labelW / 2, y: yearY + 0.02, w: labelW, h: 0.3,
        fontFace: F.sans, fontSize: 13, color: e.founding ? C.red : C.muted,
        align: "center", margin: 0, bold: e.founding, valign: "top",
      });
      // label above the year — tight height, bottom-anchored
      s.addText(e.label, {
        x: x - labelW / 2, y: yearY - 0.6, w: labelW, h: 0.6,
        fontFace: F.sans, fontSize: 13, italic: true,
        color: e.founding ? C.ink : C.text, bold: e.founding,
        align: "center", margin: 0, valign: "bottom",
      });
    } else {
      const yearY = axisY + baseOffset + (e.level - 1) * levelStep;
      // connector line down from axis
      s.addShape(pres.shapes.LINE, {
        x, y: axisY + 0.1, w: 0, h: yearY - (axisY + 0.1),
        line: { color: C.tan, width: 0.4 },
      });
      // year closer to axis
      s.addText(String(e.y), {
        x: x - labelW / 2, y: yearY, w: labelW, h: 0.3,
        fontFace: F.sans, fontSize: 13, color: e.founding ? C.red : C.muted,
        align: "center", margin: 0, bold: e.founding, valign: "top",
      });
      // label below the year — tight
      s.addText(e.label, {
        x: x - labelW / 2, y: yearY + 0.3, w: labelW, h: 0.65,
        fontFace: F.sans, fontSize: 13, italic: true,
        color: e.founding ? C.ink : C.text, bold: e.founding,
        align: "center", margin: 0, valign: "top",
      });
    }
  });

  // Legend — placed on the left side where there are no deep-below labels
  const legendY = SLIDE_H - 1.1;
  s.addText("KEY EVENTS", {
    x: 1.2, y: legendY, w: 2.4, h: 0.3,
    fontFace: F.sans, fontSize: 14, color: C.muted, charSpacing: 5, margin: 0,
  });
  s.addShape(pres.shapes.DIAMOND, {
    x: 3.7, y: legendY + 0.04, w: 0.18, h: 0.18,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("founding moment", {
    x: 4.0, y: legendY - 0.02, w: 2.5, h: 0.3,
    fontFace: F.sans, fontSize: 14, italic: true, color: C.text, margin: 0,
  });
  s.addShape(pres.shapes.OVAL, {
    x: 6.6, y: legendY + 0.03, w: 0.18, h: 0.18,
    fill: { color: C.bg }, line: { color: C.ink, width: 0.75 },
  });
  s.addText("other events", {
    x: 6.9, y: legendY - 0.02, w: 2.5, h: 0.3,
    fontFace: F.sans, fontSize: 14, italic: true, color: C.text, margin: 0,
  });

  addFooter(s, { section: "A CONTINUOUS TIMELINE", page: "07 / 10" });
}

// ================================================================
// SLIDE 8 — Chapter 07: Articles of Confederation (six flaws)
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 07", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Headline
  s.addText(
    [
      { text: "A league of\nfriendship that\n" },
      { text: "would not hold.", options: { color: C.red, italic: true } },
    ],
    {
      x: 1.2, y: 1.85, w: 9, h: 4.0,
      fontFace: F.sans, fontSize: 68, color: C.ink, bold: false, margin: 0,
      lineSpacingMultiple: 1.05,
    }
  );

  addDivider(s, 1.2, 6.0, 2.4);

  s.addText(
    [
      { text: "Ratified in 1781, the " },
      { text: "Articles of Confederation", options: { italic: true } },
      { text: " gave America its first national government — and revealed, within six years, that a union without teeth could not survive." },
    ],
    {
      x: 1.2, y: 6.3, w: 8.0, h: 1.8,
      fontFace: F.sans, fontSize: 18, color: C.text, margin: 0,
      lineSpacingMultiple: 1.4, valign: "top",
    }
  );

  // Right side: 2x3 grid of flaws
  const flaws = [
    { n: "§ 01", t: "No power to tax",       d: "Congress could only ask — states rarely paid." },
    { n: "§ 02", t: "No executive",          d: "No one to enforce the laws." },
    { n: "§ 03", t: "No national courts",    d: "Disputes between states festered." },
    { n: "§ 04", t: "No regulation of trade", d: "Thirteen tariffs, thirteen currencies." },
    { n: "§ 05", t: "A supermajority to act", d: "Nine of thirteen states, every time." },
    { n: "§ 06", t: "Unanimous to amend",    d: "Which meant: never." },
  ];
  const gridX = 10.4;
  const gridW = SLIDE_W - gridX - 1.2;
  const gridTop = 1.9;

  s.addText("WHAT THE ARTICLES LACKED", {
    x: gridX, y: 1.4, w: gridW, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
  });

  const colWFl = (gridW - 0.4) / 2;
  const rowHFl = 1.75;

  flaws.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = gridX + col * (colWFl + 0.4);
    const y = gridTop + row * rowHFl;
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.1, w: 0.04, h: rowHFl - 0.35,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    // Section number
    s.addText(f.n, {
      x: x + 0.2, y: y, w: colWFl, h: 0.4,
      fontFace: F.sans, fontSize: 14, color: C.red, charSpacing: 5, margin: 0,
    });
    s.addText(f.t, {
      x: x + 0.2, y: y + 0.4, w: colWFl - 0.2, h: 0.85,
      fontFace: F.sans, fontSize: 24, bold: true, color: C.ink, margin: 0,
    });
    s.addText(f.d, {
      x: x + 0.2, y: y + 1.25, w: colWFl - 0.2, h: 0.45,
      fontFace: F.sans, fontSize: 15, italic: true, color: C.muted, margin: 0,
    });
  });

  // Separator line
  const sepY = gridTop + 3 * rowHFl + 0.2;
  s.addShape(pres.shapes.LINE, {
    x: gridX, y: sepY, w: gridW, h: 0,
    line: { color: C.tan, width: 0.5 },
  });

  // Breaking point
  s.addText("THE BREAKING POINT", {
    x: gridX, y: sepY + 0.25, w: 4, h: 0.45,
    fontFace: F.sans, fontSize: 14, color: C.muted, charSpacing: 5, margin: 0,
  });
  s.addText(
    [
      { text: "Shays' Rebellion, " },
      { text: "1786", options: { color: C.red, italic: true } },
    ],
    {
      x: gridX, y: sepY + 0.75, w: 4.5, h: 0.6,
      fontFace: F.sans, fontSize: 28, color: C.ink, bold: false, margin: 0,
    }
  );
  s.addText(
    "Massachusetts farmers revolt. The states cannot raise an army. The Founders take the hint.",
    {
      x: gridX + 4.8, y: sepY + 0.3, w: gridW - 4.8, h: 1.2,
      fontFace: F.sans, fontSize: 16, italic: true, color: C.text, margin: 0,
      lineSpacingMultiple: 1.3, valign: "top",
    }
  );

  addFooter(s, { section: "ARTICLES OF CONFEDERATION", page: "08 / 10" });
}

// ================================================================
// SLIDE 9 — Chapter 08: Convention & Bill of Rights
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  s.addText("CHAPTER 08", {
    x: 1.2, y: 1.4, w: 4, h: 0.4,
    fontFace: F.sans, fontSize: 16, color: C.muted,
    charSpacing: 6, margin: 0,
  });

  // Headline across
  s.addText(
    [
      { text: "Philadelphia, " },
      { text: "summer 1787.", options: { color: C.red, italic: true } },
    ],
    {
      x: 1.2, y: 1.85, w: 17, h: 1.3,
      fontFace: F.sans, fontSize: 70, color: C.ink, bold: false, margin: 0,
    }
  );

  // Left: THE CONVENTION
  s.addText("THE CONVENTION", {
    x: 1.2, y: 4.0, w: 7, h: 0.35,
    fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
  });
  s.addText(
    "Fifty-five delegates. Windows nailed shut for secrecy. Four months of argument. One document.",
    {
      x: 1.2, y: 4.4, w: 7, h: 0.8,
      fontFace: F.sans, fontSize: 18, italic: true, color: C.text, margin: 0,
      lineSpacingMultiple: 1.3,
    }
  );
  // horizontal rule
  s.addShape(pres.shapes.LINE, {
    x: 1.2, y: 5.4, w: 7.2, h: 0,
    line: { color: C.tan, width: 0.5 },
  });

  // 2x2 grid of convention pillars
  const pillars = [
    { t: "The Great Compromise",  d: "Two houses: one by population, one by state." },
    { t: "Three-Fifths Clause",   d: "A moral failure preserved for political union." },
    { t: "Separation of Powers",  d: "Legislative, executive, judicial." },
    { t: "Checks & Balances",     d: "Ambition, made to counteract ambition." },
  ];
  const pColW = 3.7;
  const pRowH = 1.7;
  pillars.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 1.2 + col * (pColW + 0.3);
    const y = 5.65 + row * pRowH;
    s.addText(p.t, {
      x, y, w: pColW, h: 0.9,
      fontFace: F.sans, fontSize: 22, bold: true, color: C.ink, margin: 0,
    });
    s.addText(p.d, {
      x, y: y + 0.9, w: pColW, h: 0.6,
      fontFace: F.sans, fontSize: 15, italic: true, color: C.muted, margin: 0,
    });
    // thin divider above each top-row
    if (row === 1) {
      s.addShape(pres.shapes.LINE, {
        x, y: y - 0.15, w: pColW - 0.1, h: 0,
        line: { color: C.tan, width: 0.4 },
      });
    }
  });

  // Right: THE PRICE OF RATIFICATION
  const rx = 10.0;
  const rw = SLIDE_W - rx - 1.2;
  s.addText("THE PRICE OF RATIFICATION · 1791", {
    x: rx, y: 4.0, w: rw, h: 0.4,
    fontFace: F.sans, fontSize: 15, color: C.muted, charSpacing: 6, margin: 0,
  });
  s.addText(
    [
      { text: "Ten amendments, " },
      { text: "ten promises", options: { color: C.red, italic: true } },
      { text: " to the people." },
    ],
    {
      x: rx, y: 4.5, w: rw, h: 1.8,
      fontFace: F.sans, fontSize: 38, color: C.ink, bold: false, margin: 0,
      lineSpacingMultiple: 1.1,
    }
  );

  // 5x2 grid of amendments
  const amends = [
    { r: "I",    t: "Speech · Press · Religion" },
    { r: "II",   t: "Arms" },
    { r: "III",  t: "Quartering" },
    { r: "IV",   t: "Search & Seizure" },
    { r: "V",    t: "Due Process" },
    { r: "VI",   t: "Speedy Trial" },
    { r: "VII",  t: "Civil Jury" },
    { r: "VIII", t: "Cruel Punishment" },
    { r: "IX",   t: "Unenumerated Rights" },
    { r: "X",    t: "Powers Reserved" },
  ];
  const aColW = (rw - 0.1 * 4) / 5;
  const aRowH = 1.5;
  const aStartY = 7.0;
  amends.forEach((a, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = rx + col * (aColW + 0.1);
    const y = aStartY + row * (aRowH + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: aColW, h: aRowH,
      fill: { color: C.panel },
      line: { color: C.tan, width: 0.5 },
    });
    s.addText(a.r, {
      x, y: y + 0.1, w: aColW, h: 0.7,
      fontFace: F.sans, fontSize: 30, bold: true, color: C.red,
      align: "center", margin: 0, valign: "middle",
    });
    s.addText(a.t, {
      x: x + 0.05, y: y + 0.85, w: aColW - 0.1, h: 0.6,
      fontFace: F.sans, fontSize: 13, color: C.text,
      align: "center", margin: 0, valign: "top",
    });
  });

  addFooter(s, { section: "CONVENTION  &  BILL OF RIGHTS", page: "09 / 10" });
}

// ================================================================
// SLIDE 10 — Coda: Franklin quote
// ================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addFrame(s);

  // CODA
  s.addText("CODA", {
    x: 0, y: 2.2, w: SLIDE_W, h: 0.5,
    fontFace: F.sans, fontSize: 18, color: C.red, charSpacing: 10,
    align: "center", margin: 0,
  });

  // Divider centered
  const divCx = SLIDE_W / 2;
  addDivider(s, divCx - 1.4, 3.0, 2.8);

  // Franklin headline
  s.addText(
    [
      { text: "A republic, " },
      { text: "if\nyou can keep it.", options: { color: C.red, italic: true } },
    ],
    {
      x: 0, y: 3.5, w: SLIDE_W, h: 2.6,
      fontFace: F.sans, fontSize: 84, color: C.ink, bold: false,
      align: "center", margin: 0, lineSpacingMultiple: 1.0,
    }
  );

  // Attribution
  s.addText("—  BENJAMIN FRANKLIN, ON LEAVING INDEPENDENCE HALL, 1787", {
    x: 0, y: 6.3, w: SLIDE_W, h: 0.4,
    fontFace: F.sans, fontSize: 18, color: C.muted, charSpacing: 6,
    align: "center", margin: 0,
  });

  // Four-point timeline "1776 an idea" etc, centered row
  const pts = [
    { y: "1776", d: "an idea" },
    { y: "1787", d: "a framework" },
    { y: "1791", d: "a promise" },
    { y: "today", d: "an argument, still" },
  ];
  const rowTotalW = 10;
  const rowStart = (SLIDE_W - rowTotalW) / 2;
  const ptW = rowTotalW / pts.length;
  pts.forEach((p, i) => {
    const x = rowStart + i * ptW;
    s.addText(p.y, {
      x, y: 7.4, w: ptW, h: 0.7,
      fontFace: F.sans, fontSize: 40,
      color: p.y === "today" ? C.ink : C.red,
      italic: p.y === "today", bold: false,
      align: "center", margin: 0,
    });
    s.addText(p.d, {
      x, y: 8.1, w: ptW, h: 0.4,
      fontFace: F.sans, fontSize: 18, italic: true, color: C.text,
      align: "center", margin: 0,
    });
  });

  addFooter(s, { section: "THANK YOU  ·  QUESTIONS?", page: "X / X" });
}

// ================================================================
// Write the file
// ================================================================
pres.writeFile({ fileName: "Deliverable_7.pptx" })
  .then((fn) => console.log(`Wrote ${fn}`));
