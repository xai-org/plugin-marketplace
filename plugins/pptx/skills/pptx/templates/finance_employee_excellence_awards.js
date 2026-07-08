// Recreates "Deliverable_13.pptx" — Afrinvest Excellence Awards 2026 deck
// using pptxgenjs. Run with: node generate.js
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// ---------- Image-aspect-aware sizing ----------
// To avoid any visual stretching or harsh cropping, read each photo's real
// pixel dimensions and fit the rendered frame to the source aspect ratio
// inside a target box (centered). This way the inserted image is its true
// w:h, never stretched, and never cropped.
function readJpegSize(filePath) {
  const buf = fs.readFileSync(filePath);
  // Walk JPEG markers looking for SOF0/SOF2 to read intrinsic dimensions.
  let i = 2; // skip SOI 0xFFD8
  while (i < buf.length) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    // SOF markers (excluding DHT/DAC/etc): 0xC0..0xCF except C4, C8, CC
    if (
      marker >= 0xC0 && marker <= 0xCF &&
      marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC
    ) {
      const h = buf.readUInt16BE(i + 5);
      const w = buf.readUInt16BE(i + 7);
      return { w, h };
    }
    i += 2 + len;
  }
  throw new Error(`Could not parse JPEG size: ${filePath}`);
}

// Fit image inside a target box, preserving aspect, anchored by `anchor`.
// anchor: "center" | "top" | "left" | "right" | "bottom"
function fitInBox(imgW, imgH, boxX, boxY, boxW, boxH, anchor = "center") {
  const imgAR = imgW / imgH;
  const boxAR = boxW / boxH;
  let w, h;
  if (imgAR > boxAR) {
    // image is wider than box -> width-constrained
    w = boxW; h = boxW / imgAR;
  } else {
    h = boxH; w = boxH * imgAR;
  }
  let x, y;
  switch (anchor) {
    case "left":   x = boxX;                          y = boxY + (boxH - h) / 2; break;
    case "right":  x = boxX + (boxW - w);             y = boxY + (boxH - h) / 2; break;
    case "top":    x = boxX + (boxW - w) / 2;         y = boxY; break;
    case "bottom": x = boxX + (boxW - w) / 2;         y = boxY + (boxH - h); break;
    default:       x = boxX + (boxW - w) / 2;         y = boxY + (boxH - h) / 2;
  }
  return { x, y, w, h };
}

// ---------- Palette ----------
const C = {
  plum:    "3D1F2F",   // deep wine / plum (slide 1, slide 9 background, dark accents)
  cream:   "FBF1E3",   // light cream background (slides 2, 6, 9 alt)
  sand:    "EFE4D2",   // sand/beige (slides 3, 5, 7)
  peach:   "F2DEC4",   // warmer peach (slide 8)
  terra:   "C75B3C",   // terracotta orange (accent shape, headlines)
  terraDk: "B14E33",   // deeper terracotta (slide 10 bg)
  gold:    "E1B748",   // mustard / gold yellow
  goldSft: "EBC976",   // softer gold (italic headline accent)
  ink:     "2E1622",   // very dark text on cream
  body:    "3F2A35",   // body text on cream
  muted:   "4A3A45",   // muted body
  quote:   "5B4350",   // italic quote text
};

const FONT_HEAD = "Georgia";   // serif w/ personality for "No. 0X" italics & headlines
const FONT_BODY = "Calibri";   // clean body sans
const FONT_DISP = "Calibri";   // display sans for headlines (matches original look)

// 16:9 — 10" x 5.625"
const SW = 10;
const SH = 5.625;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Afrinvest Securities";
pres.title  = "The Excellence Awards 2026";

// ---------- Helpers ----------
const IMG_DIR = path.join(__dirname, "images");
function imgPath(name) { return path.join(IMG_DIR, name); }

// add a footer ("THE EXCELLENCE AWARDS 2026"  +  "NN / 10")
function addFooter(slide, pageNum, color = C.ink) {
  slide.addText("THE EXCELLENCE AWARDS 2026", {
    x: 0.45, y: 5.25, w: 5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color, charSpacing: 4, bold: false,
  });
  slide.addText(`${String(pageNum).padStart(2,"0")} / 10`, {
    x: 8.5, y: 5.25, w: 1.1, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color, charSpacing: 4, align: "right",
  });
}

// Build an "honoree" slide (slides 3-8). Each gets unique accent shapes.
// opts: { num, category, name, role, quote, stat1Val, stat1Lbl, stat2Val, stat2Lbl,
//         photo, bgColor, decorate(slide) }
function addHonoreeSlide(opts) {
  const slide = pres.addSlide();
  slide.background = { color: opts.bgColor };

  // Decorative accent shapes behind/around the photo (per-slide)
  if (typeof opts.decorate === "function") opts.decorate(slide);

  // Photo — read source image's real aspect ratio and fit inside a target box,
  // preserving aspect (no stretch, no crop). Box is roughly square (matches the
  // square-ish frames in the original deck).
  const photoBox = { x: 0.85, y: 0.7, w: 3.4, h: 3.85 };
  const srcPath = imgPath(opts.photo);
  const srcSize = readJpegSize(srcPath);
  const fit = fitInBox(srcSize.w, srcSize.h, photoBox.x, photoBox.y, photoBox.w, photoBox.h, "center");
  slide.addImage({
    path: srcPath,
    x: fit.x, y: fit.y, w: fit.w, h: fit.h,
  });

  // Right column — text
  const RX = 5.0;        // right column x
  const RW = 4.5;        // right column width

  // "No. 0X" — large gold italic serif
  slide.addText(`No. ${opts.num}`, {
    x: RX, y: 0.55, w: RW, h: 1.3,
    fontFace: FONT_HEAD, fontSize: 60, italic: true, bold: false,
    color: C.gold, align: "left", margin: 0,
  });

  // Category label — small terracotta tracked-out caps
  slide.addText(opts.category, {
    x: RX, y: 1.95, w: RW, h: 0.3,
    fontFace: FONT_BODY, fontSize: 11, color: C.terra,
    charSpacing: 5, bold: false, align: "left", margin: 0,
  });

  // Honoree name — large dark display
  slide.addText(opts.name, {
    x: RX, y: 2.25, w: RW, h: 0.7,
    fontFace: FONT_DISP, fontSize: 32, color: C.ink, bold: false,
    align: "left", margin: 0,
  });

  // Role
  slide.addText(opts.role, {
    x: RX, y: 2.95, w: RW, h: 0.35,
    fontFace: FONT_BODY, fontSize: 13, color: C.body, align: "left", margin: 0,
  });

  // Quote — left vertical bar + italic body
  slide.addShape(pres.shapes.RECTANGLE, {
    x: RX, y: 3.5, w: 0.04, h: 0.85,
    fill: { color: C.terra }, line: { color: C.terra, width: 0 },
  });
  slide.addText(opts.quote, {
    x: RX + 0.18, y: 3.45, w: RW - 0.2, h: 0.95,
    fontFace: FONT_BODY, fontSize: 12, italic: true, color: C.quote,
    align: "left", valign: "top", margin: 0,
  });

  // Stats row — two big terracotta numbers w/ labels
  // Labels can be long ("ASSETS UNDER ADVICE", "AUM UNDER STEWARDSHIP"); give
  // each column ~2.3" so single-line labels fit, with a clear gap between cols.
  const statsY = 4.5;
  const col1X = RX;
  const col2X = RX + 2.4;
  const colW  = 2.3;

  slide.addText(opts.stat1Val, {
    x: col1X, y: statsY, w: colW, h: 0.5,
    fontFace: FONT_DISP, fontSize: 24, color: C.terra, bold: false,
    align: "left", margin: 0,
  });
  slide.addText(opts.stat1Lbl, {
    x: col1X, y: statsY + 0.5, w: colW, h: 0.28,
    fontFace: FONT_BODY, fontSize: 8.5, color: C.ink,
    charSpacing: 2, align: "left", margin: 0,
  });
  slide.addText(opts.stat2Val, {
    x: col2X, y: statsY, w: colW, h: 0.5,
    fontFace: FONT_DISP, fontSize: 24, color: C.terra, bold: false,
    align: "left", margin: 0,
  });
  slide.addText(opts.stat2Lbl, {
    x: col2X, y: statsY + 0.5, w: colW, h: 0.28,
    fontFace: FONT_BODY, fontSize: 8.5, color: C.ink,
    charSpacing: 2, align: "left", margin: 0,
  });

  addFooter(slide, opts.pageNum);
}

// ====================================================================
// SLIDE 1 — Title / Cover (deep plum)
// ====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.plum };

  // Big yellow circle on top-right (partially off-slide top + right)
  // Pushed further right so it doesn't overlap the eyebrow "· 2026" text.
  slide.addShape(pres.shapes.OVAL, {
    x: 7.7, y: -2.2, w: 5.5, h: 5.5,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });

  // Layered terracotta "stadium" / vertical capsule on left
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.55, y: 1.55, w: 2.4, h: 3.6,
    fill: { color: C.terra }, line: { color: C.terra, width: 0 },
    rectRadius: 1.2,
  });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.85, y: 1.95, w: 1.85, h: 2.85,
    fill: { color: C.terraDk }, line: { color: C.terraDk, width: 0 },
    rectRadius: 0.92,
  });
  // Inner gold-outline circle
  slide.addShape(pres.shapes.OVAL, {
    x: 1.1, y: 2.5, w: 1.35, h: 1.7,
    fill: { color: C.terraDk }, line: { color: C.gold, width: 1 },
  });

  // Small dots near top-center
  slide.addShape(pres.shapes.OVAL, {
    x: 3.05, y: 1.25, w: 0.13, h: 0.13,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 3.35, y: 1.45, w: 0.11, h: 0.11,
    fill: { color: "8B6A3A" }, line: { color: "8B6A3A", width: 0 },
  });

  // Eyebrow — gold tracked caps
  slide.addText("AFRINVEST SECURITIES · 2026", {
    x: 3.6, y: 1.65, w: 6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: C.gold,
    charSpacing: 6, bold: false, align: "left", margin: 0,
  });

  // Big two-line headline: "Excellence," (cream)  /  "celebrated." (gold italic)
  slide.addText("Excellence,", {
    x: 3.6, y: 2.0, w: 6.4, h: 1.0,
    fontFace: FONT_DISP, fontSize: 64, color: "F2E6D2", bold: false,
    align: "left", margin: 0,
  });
  slide.addText("celebrated.", {
    x: 3.6, y: 2.85, w: 6.4, h: 1.0,
    fontFace: FONT_HEAD, fontSize: 64, italic: true, color: C.goldSft,
    align: "left", margin: 0,
  });

  // Sub-tag
  slide.addText("THE ANNUAL EXCELLENCE AWARDS · DEC 12, 2026", {
    x: 3.6, y: 3.95, w: 6.4, h: 0.35,
    fontFace: FONT_BODY, fontSize: 11, color: "C9B4A0",
    charSpacing: 5, align: "left", margin: 0,
  });

  // Footer pieces (left + right)
  slide.addText("AFRINVEST SECURITIES LTD.", {
    x: 0.55, y: 5.25, w: 4, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: "9A7E6E",
    charSpacing: 4, align: "left",
  });
  slide.addText("LAGOS · YEAR-END GALA", {
    x: 6, y: 5.25, w: 3.45, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: "9A7E6E",
    charSpacing: 4, align: "right",
  });
}

// ====================================================================
// SLIDE 2 — Note from MD (cream)
// ====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.cream };

  // Big sand circle behind the headline (top-left, partially off-slide)
  slide.addShape(pres.shapes.OVAL, {
    x: -1.4, y: -1.8, w: 5.8, h: 5.8,
    fill: { color: C.sand }, line: { color: C.sand, width: 0 },
  });

  // Eyebrow
  slide.addText("A NOTE FROM THE MANAGING DIRECTOR", {
    x: 0.55, y: 0.85, w: 7, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: C.terra,
    charSpacing: 6, align: "left", margin: 0,
  });

  // Headline (3 lines, mixed weight/italic)
  slide.addText([
    { text: "Six people who ",      options: { color: C.ink,    breakLine: true } },
    { text: "moved markets",        options: { color: C.terra, italic: true,
                                              fontFace: FONT_HEAD } },
    { text: " — ",                  options: { color: C.ink,    breakLine: true } },
    { text: "and moved us.",        options: { color: C.ink } },
  ], {
    x: 0.55, y: 1.25, w: 6.5, h: 2.5,
    fontFace: FONT_DISP, fontSize: 44, bold: false,
    align: "left", valign: "top", margin: 0,
  });

  // Body paragraph
  slide.addText(
    "This year, our honorees turned ambition into outcomes for our clients, " +
    "our colleagues, and our communities. Tonight, we honor the conviction, " +
    "craft, and care that define Afrinvest at its best.",
    {
      x: 0.55, y: 3.85, w: 5.0, h: 1.2,
      fontFace: FONT_BODY, fontSize: 11, color: C.body,
      align: "left", valign: "top", margin: 0, paraSpaceAfter: 4,
    }
  );

  // Right-side composition: plum capsule + gold square + terra square
  // gold rectangle (back / largest)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7.05, y: 3.05, w: 2.3, h: 1.85,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });
  // terra square (overlaps left)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.25, y: 3.55, w: 1.55, h: 1.35,
    fill: { color: C.terra }, line: { color: C.terra, width: 0 },
  });
  // plum capsule on top
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.55, y: 2.55, w: 1.7, h: 0.85,
    fill: { color: C.plum }, line: { color: C.plum, width: 0 },
    rectRadius: 0.42,
  });

  addFooter(slide, 2);
}

// ====================================================================
// SLIDES 3–8 — Honorees
// ====================================================================

// Slide 3 — Adaeze Nwosu — sand bg, terra "stadium" capsule frame
addHonoreeSlide({
  pageNum: 3, num: "01",
  category: "ADVISOR OF THE YEAR",
  name: "Adaeze Nwosu",
  role: "Head of Wealth Advisory",
  quote: '"She built a book of trust before she built a book of business — and the numbers followed."',
  stat1Val: "₦42B", stat1Lbl: "ASSETS UNDER ADVICE",
  stat2Val: "98%",  stat2Lbl: "CLIENT RETENTION",
  photo: "image-3-1.jpeg",
  bgColor: C.sand,
  decorate(slide) {
    // Terra rounded "stadium" behind photo
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.45, y: 0.4, w: 4.0, h: 4.55,
      fill: { color: C.terra }, line: { color: C.terra, width: 0 },
      rectRadius: 1.95,
    });
    // Dot grid bottom-left (decorative)
    const dotColor = C.gold;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 6; c++) {
        slide.addShape(pres.shapes.OVAL, {
          x: 0.5 + c * 0.18, y: 5.05 + r * 0.13, w: 0.07, h: 0.07,
          fill: { color: dotColor }, line: { color: dotColor, width: 0 },
        });
      }
    }
  },
});

// Slide 4 — Tunde Bakare — cream bg, gold square + small terra arc
addHonoreeSlide({
  pageNum: 4, num: "02",
  category: "TRADER OF THE YEAR",
  name: "Tunde Bakare",
  role: "Senior Equities Trader, Markets Desk",
  quote: '"Calm in volatility. Sharp in opportunity. The desk\'s quiet engine."',
  stat1Val: "+34%", stat1Lbl: "DESK P&L VS TARGET",
  stat2Val: "1.2K", stat2Lbl: "TRADES EXECUTED",
  photo: "image-4-1.jpeg",
  bgColor: C.cream,
  decorate(slide) {
    // Gold square behind top-right of photo
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 2.0, y: 0.35, w: 2.0, h: 1.7,
      fill: { color: C.gold }, line: { color: C.gold, width: 0 },
    });
    // Small terra "shoulder" at left of photo
    slide.addShape(pres.shapes.OVAL, {
      x: -0.55, y: 1.85, w: 1.6, h: 2.2,
      fill: { color: C.terra }, line: { color: C.terra, width: 0 },
    });
  },
});

// Slide 5 — Funmi Adeleke — sand bg, terra rounded top + plum L bottom
addHonoreeSlide({
  pageNum: 5, num: "03",
  category: "RESEARCH EXCELLENCE",
  name: "Funmi Adeleke",
  role: "Head of Equity Research",
  quote: '"Her notes don\'t just call the market — they teach it. Required reading on every floor."',
  stat1Val: "87",  stat1Lbl: "RESEARCH NOTES PUBLISHED",
  stat2Val: "#1",  stat2Lbl: "ANALYST, WEST AFRICA",
  photo: "image-5-1.jpeg",
  bgColor: C.sand,
  decorate(slide) {
    // Terra rounded top arch (peeks above the photo)
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.55, y: 0.15, w: 4.05, h: 1.5,
      fill: { color: C.terra }, line: { color: C.terra, width: 0 },
      rectRadius: 0.7,
    });
    // Plum L-shape (vertical bar + bottom shelf), drawn as 2 rectangles
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.05, y: 3.5, w: 0.85, h: 1.85,
      fill: { color: C.plum }, line: { color: C.plum, width: 0 },
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.05, y: 4.55, w: 1.8, h: 0.8,
      fill: { color: C.plum }, line: { color: C.plum, width: 0 },
    });
  },
});

// Slide 6 — Chuka Okonkwo — cream bg, gold ring + gold rounded shoulder
addHonoreeSlide({
  pageNum: 6, num: "04",
  category: "RISING STAR",
  name: "Chuka Okonkwo",
  role: "Associate, Investment Banking",
  quote: '"Two years in, leading mandates senior bankers fight for. The future is already here."',
  stat1Val: "7",     stat1Lbl: "DEALS CLOSED",
  stat2Val: "$180M", stat2Lbl: "CAPITAL RAISED",
  photo: "image-6-1.jpeg",
  bgColor: C.cream,
  decorate(slide) {
    // Gold ring (outline circle) behind upper-left of photo
    slide.addShape(pres.shapes.OVAL, {
      x: 0.3, y: 0.3, w: 2.2, h: 2.2,
      fill: { color: C.cream }, line: { color: C.gold, width: 4 },
    });
    // Gold rounded "shoulder" peeking from far left
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: -0.5, y: 2.3, w: 1.5, h: 2.6,
      fill: { color: C.gold }, line: { color: C.gold, width: 0 },
      rectRadius: 0.7,
    });
  },
});

// Slide 7 — Ngozi Eze — sand bg, plum oval frame + dot row
addHonoreeSlide({
  pageNum: 7, num: "05",
  category: "OPERATIONAL EXCELLENCE",
  name: "Ngozi Eze",
  role: "Head of Compliance & Risk",
  quote: '"The reason we move fast is because she made it safe to. The unseen architecture of trust."',
  stat1Val: "0",   stat1Lbl: "MATERIAL FINDINGS",
  stat2Val: "14",  stat2Lbl: "AUDITS CLEARED",
  photo: "image-7-1.jpeg",
  bgColor: C.sand,
  decorate(slide) {
    // Plum tall oval frame behind photo (vertical capsule)
    slide.addShape(pres.shapes.OVAL, {
      x: 0.45, y: 0.4, w: 4.05, h: 4.6,
      fill: { color: C.plum }, line: { color: C.plum, width: 0 },
    });
    // Dot row (terra) above the photo
    for (let i = 0; i < 5; i++) {
      slide.addShape(pres.shapes.OVAL, {
        x: 1.7 + i * 0.28, y: 0.18, w: 0.13, h: 0.13,
        fill: { color: C.terra }, line: { color: C.terra, width: 0 },
      });
    }
  },
});

// Slide 8 — Oluwaseun Ade — peach bg, big gold half-circle behind photo
addHonoreeSlide({
  pageNum: 8, num: "06",
  category: "CHAIRMAN'S AWARD",
  name: "Oluwaseun Ade",
  role: "Managing Director, Asset Management",
  quote: '"Twenty-two years of building this firm into something worthy of its name. Tonight, we say thank you."',
  stat1Val: "22",    stat1Lbl: "YEARS AT AFRINVEST",
  stat2Val: "₦310B", stat2Lbl: "AUM UNDER STEWARDSHIP",
  photo: "image-8-1.jpeg",
  bgColor: C.peach,
  decorate(slide) {
    // Big gold circle half-hidden bottom-left
    slide.addShape(pres.shapes.OVAL, {
      x: 1.7, y: 3.4, w: 2.7, h: 2.7,
      fill: { color: C.gold }, line: { color: C.gold, width: 0 },
    });
  },
});

// ====================================================================
// SLIDE 9 — The Class of 2026 (plum bg, 6 portraits)
// ====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.plum };

  // Eyebrow
  slide.addText("THE CLASS OF 2026", {
    x: 0.55, y: 0.55, w: 6, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: C.gold,
    charSpacing: 6, align: "left", margin: 0,
  });

  // Headline (mixed: cream + gold-italic)
  slide.addText([
    { text: "Six honorees. One ", options: { color: "F2E6D2" } },
    { text: "extraordinary",      options: { color: C.goldSft, italic: true,
                                            fontFace: FONT_HEAD } },
    { text: " year.",             options: { color: "F2E6D2" } },
  ], {
    x: 0.55, y: 0.95, w: 9.0, h: 1.5,
    fontFace: FONT_DISP, fontSize: 40, bold: false,
    align: "left", valign: "top", margin: 0,
  });

  // 6 portraits in a row
  const honorees = [
    { name: "Adaeze Nwosu",   cat: "ADVISOR OF THE YEAR",     img: "image-9-1.jpeg" },
    { name: "Tunde Bakare",   cat: "TRADER OF THE YEAR",      img: "image-9-2.jpeg" },
    { name: "Funmi Adeleke",  cat: "RESEARCH EXCELLENCE",     img: "image-9-3.jpeg" },
    { name: "Chuka Okonkwo",  cat: "RISING STAR",             img: "image-9-4.jpeg" },
    { name: "Ngozi Eze",      cat: "OPERATIONAL EXCELLENCE",  img: "image-9-5.jpeg" },
    { name: "Oluwaseun Ade",  cat: "CHAIRMAN'S AWARD",        img: "image-9-6.jpeg" },
  ];

  const N = 6;
  const gridLeft = 0.45;
  const gridRight = 9.55;
  const gap = 0.12;
  const cellW = (gridRight - gridLeft - gap * (N - 1)) / N;   // ~1.43
  const cellH = 1.55;
  const photoY = 2.85;

  honorees.forEach((h, i) => {
    const x = gridLeft + i * (cellW + gap);

    // Photo — read source aspect, fit inside the cell preserving ratio.
    // Anchor "bottom" so the photo sits flush with the bottom of its cell;
    // this keeps name labels at a consistent y across the row.
    const sp = imgPath(h.img);
    const sz = readJpegSize(sp);
    const f = fitInBox(sz.w, sz.h, x, photoY, cellW, cellH, "bottom");
    slide.addImage({
      path: sp,
      x: f.x, y: f.y, w: f.w, h: f.h,
    });

    // Name (cream)
    slide.addText(h.name, {
      x, y: photoY + cellH + 0.08, w: cellW + 0.05, h: 0.55,
      fontFace: FONT_DISP, fontSize: 13, color: "F2E6D2", bold: false,
      align: "left", valign: "top", margin: 0,
    });

    // Category (gold tracked)
    slide.addText(h.cat, {
      x, y: photoY + cellH + 0.62, w: cellW + 0.1, h: 0.55,
      fontFace: FONT_BODY, fontSize: 8, color: C.gold,
      charSpacing: 3, align: "left", valign: "top", margin: 0,
    });
  });

  // Footer (plum-tone variants)
  slide.addText("THE EXCELLENCE AWARDS 2026", {
    x: 0.45, y: 5.3, w: 5, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: "8E6F7B",
    charSpacing: 4, align: "left",
  });
  slide.addText("09 / 10", {
    x: 8.5, y: 5.3, w: 1.1, h: 0.3,
    fontFace: FONT_BODY, fontSize: 9, color: "8E6F7B",
    charSpacing: 4, align: "right",
  });
}

// ====================================================================
// SLIDE 10 — Closing (terracotta bg)
// ====================================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.terraDk };

  // Big deeper-terra circle behind headline (top-left)
  slide.addShape(pres.shapes.OVAL, {
    x: -1.5, y: -1.5, w: 7.0, h: 7.0,
    fill: { color: C.terra }, line: { color: C.terra, width: 0 },
  });

  // Plum square top-right
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.6, y: 0.35, w: 1.05, h: 0.95,
    fill: { color: C.plum }, line: { color: C.plum, width: 0 },
  });

  // Gold square bottom-right (peeking)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.4, y: 4.0, w: 2.0, h: 1.85,
    fill: { color: C.gold }, line: { color: C.gold, width: 0 },
  });

  // Gold-outline circle behind body copy
  slide.addShape(pres.shapes.OVAL, {
    x: 1.0, y: 2.5, w: 2.4, h: 2.4,
    fill: { color: C.terraDk, transparency: 100 },
    line: { color: C.gold, width: 1 },
  });

  // Eyebrow (gold)
  slide.addText("AFRINVEST SECURITIES · 2026", {
    x: 0.55, y: 0.85, w: 7, h: 0.35,
    fontFace: FONT_BODY, fontSize: 12, color: C.gold,
    charSpacing: 6, align: "left", margin: 0,
  });

  // Big two-line headline
  slide.addText([
    { text: "Here's to ",       options: { color: "F2E6D2" } },
    { text: "them",             options: { color: C.goldSft, italic: true,
                                          fontFace: FONT_HEAD } },
    { text: ". And to all ",    options: { color: "F2E6D2", breakLine: true } },
    { text: "of ",              options: { color: "F2E6D2" } },
    { text: "us",               options: { color: C.goldSft, italic: true,
                                          fontFace: FONT_HEAD } },
    { text: ".",                options: { color: "F2E6D2" } },
  ], {
    x: 0.55, y: 1.25, w: 9.0, h: 2.1,
    fontFace: FONT_DISP, fontSize: 54, bold: false,
    align: "left", valign: "top", margin: 0,
  });

  // Body
  slide.addText(
    "Thank you for the work, the wins, and the way you carry the firm forward. " +
    "Now, let's celebrate.",
    {
      x: 0.55, y: 3.45, w: 4.7, h: 0.85,
      fontFace: FONT_BODY, fontSize: 12, color: "F2E6D2",
      align: "left", valign: "top", margin: 0,
    }
  );

  // Bottom info bar — translucent darker rectangle behind 3 columns
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 4.55, w: 8.0, h: 0.85,
    fill: { color: C.plum, transparency: 55 },
  });

  // 3 info columns
  const infoY = 4.65;
  const infoCols = [
    { lbl: "HOSTED BY", val: "The Managing Director" },
    { lbl: "TONIGHT",   val: "Eko Hotel, Victoria Island" },
    { lbl: "DATE",      val: "December 12, 2026" },
  ];
  const infoStartX = 0.75;
  const infoW = 2.55;
  infoCols.forEach((c, i) => {
    const x = infoStartX + i * infoW;
    slide.addText(c.lbl, {
      x, y: infoY, w: infoW, h: 0.3,
      fontFace: FONT_BODY, fontSize: 9, color: C.gold,
      charSpacing: 4, align: "left", margin: 0,
    });
    slide.addText(c.val, {
      x, y: infoY + 0.3, w: infoW, h: 0.45,
      fontFace: FONT_BODY, fontSize: 14, color: "F2E6D2",
      align: "left", margin: 0,
    });
  });
}

// ---------- Write file ----------
pres.writeFile({ fileName: "Deliverable_13_recreated.pptx" })
  .then((fname) => {
    console.log(`Wrote: ${fname}`);
  })
  .catch((e) => {
    console.error("Error writing pptx:", e);
    process.exit(1);
  });
