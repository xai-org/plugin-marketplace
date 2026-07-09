/**
 * build.js
 *
 * Recreates "Imagine Studios — Photography Portfolio · Volume IV" using pptxgenjs.
 *
 * Color scheme:
 *   - Slides 1, 5, 8: BLACK background with LIGHT BROWN text
 *   - Slides 2, 3, 4, 6, 7: LIGHT BROWN background with BLACK text
 *
 * Image strategy:
 *   - Each placement registers a sharp pre-crop to the EXACT target aspect
 *     ratio (centered cover crop), saved to ./tmp_cropped/.
 *   - The pre-cropped image is then placed at the target frame at full size,
 *     so pptxgenjs cannot stretch or distort it.
 *   - This avoids the stretching that came from forcing arbitrary w/h on
 *     addImage(), and is more reliable than pptxgenjs's `sizing: { type:'cover' }`
 *     which doesn't actually crop when used with `path:` images.
 *
 * Run:
 *   npm install pptxgenjs sharp
 *   node build.js
 */

const pptxgen = require("pptxgenjs");
const sharp   = require("sharp");
const fs      = require("fs");
const path    = require("path");

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------
const BLACK    = "0E0E0E";
const BROWN    = "D9C2A7";
const BROWN_DK = "8C6F4F";
const BROWN_LT = "EBD9C2";
const DARK_SLIDES = new Set([1, 5, 8]);

function palette(slideNum) {
  if (DARK_SLIDES.has(slideNum)) {
    return { bg: BLACK, fg: BROWN, accent: BROWN_DK, deco: BROWN_LT };
  }
  return { bg: BROWN, fg: BLACK, accent: BROWN_DK, deco: BROWN_DK };
}

// ---------------------------------------------------------------------------
// Image pre-cropping
// ---------------------------------------------------------------------------
const IMG_DIR     = path.join(__dirname, "images");
const CROPPED_DIR = path.join(__dirname, "tmp_cropped");
if (!fs.existsSync(CROPPED_DIR)) fs.mkdirSync(CROPPED_DIR, { recursive: true });

const cropQueue = [];

function registerCrop(filename, targetRatio) {
  const stem = filename.replace(/\.[^.]+$/, "");
  const tag = "r" + Math.round(targetRatio * 1000);
  const out = path.join(CROPPED_DIR, `${stem}__${tag}.jpeg`);
  cropQueue.push({ src: path.join(IMG_DIR, filename), out, targetRatio });
  return out;
}

async function processCropQueue() {
  const seen = new Set();
  for (const job of cropQueue) {
    if (seen.has(job.out)) continue;
    seen.add(job.out);
    const meta = await sharp(job.src).metadata();
    const srcRatio = meta.width / meta.height;
    let cropW = meta.width;
    let cropH = meta.height;
    if (srcRatio > job.targetRatio) {
      cropW = Math.round(meta.height * job.targetRatio);
    } else if (srcRatio < job.targetRatio) {
      cropH = Math.round(meta.width / job.targetRatio);
    }
    const left = Math.round((meta.width  - cropW) / 2);
    const top  = Math.round((meta.height - cropH) / 2);
    await sharp(job.src)
      .extract({ left, top, width: cropW, height: cropH })
      .jpeg({ quality: 92 })
      .toFile(job.out);
  }
}

// ---------------------------------------------------------------------------
// Build the presentation
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.defineLayout({ name: "PORTFOLIO_20x1125", width: 20, height: 11.25 });
pres.layout = "PORTFOLIO_20x1125";
pres.author = "Imagine Studios";
pres.title  = "Photography Portfolio · Volume IV";

const SERIF = "Cormorant Garamond";
const SANS  = "Inter";

function placeImage(slide, filename, x, y, w, h) {
  const ratio = w / h;
  const croppedPath = registerCrop(filename, ratio);
  slide.addImage({ path: croppedPath, x, y, w, h });
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------
function rule(slide, x, y, w, color, weight = 1.5) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color, width: weight },
  });
}

function header(slide, leftLabel, rightLabel, fg, accent) {
  slide.addText(leftLabel, {
    x: 1, y: 0.55, w: 5, h: 0.4,
    fontFace: SANS, fontSize: 14, charSpacing: 4, bold: true, color: fg,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(rightLabel, {
    x: 6, y: 0.55, w: 13, h: 0.4,
    fontFace: SANS, fontSize: 14, charSpacing: 4, color: fg,
    align: "left", valign: "middle", margin: 0,
  });
  rule(slide, 1, 1.05, 18, accent, 0.75);
}

function footer(slide, pageNum, label, fg, accent) {
  rule(slide, 1, 10.55, 18, accent, 0.75);
  slide.addText(pageNum, {
    x: 1, y: 10.65, w: 1, h: 0.4,
    fontFace: SANS, fontSize: 12, charSpacing: 3, color: fg,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(label, {
    x: 17, y: 10.65, w: 2, h: 0.4,
    fontFace: SERIF, fontSize: 16, italic: true, color: fg,
    align: "right", valign: "middle", margin: 0,
  });
}

function chapterMark(slide, numeral, color) {
  slide.addText(numeral, {
    x: 6.0, y: 1.4, w: 3.5, h: 1.3,
    fontFace: SERIF, fontSize: 96, italic: true, color,
    align: "right", valign: "top", margin: 0,
    charSpacing: 4,
  });
}

function sectionLabel(slide, text, x, y, fg, accent) {
  slide.addText(text, {
    x, y, w: 6, h: 0.4,
    fontFace: SANS, fontSize: 14, charSpacing: 5, bold: true, color: fg,
    align: "left", valign: "middle", margin: 0,
  });
  rule(slide, x, y + 0.45, 0.6, accent, 1.5);
}

function headline(slide, line1, line2, x, y, w, fg) {
  slide.addText(line1, {
    x, y, w, h: 1.6,
    fontFace: SERIF, fontSize: 100, color: fg, charSpacing: -2,
    align: "left", valign: "top", margin: 0,
  });
  slide.addText(line2, {
    x, y: y + 1.5, w, h: 1.6,
    fontFace: SERIF, fontSize: 100, italic: true, color: fg, charSpacing: -2,
    align: "left", valign: "top", margin: 0,
  });
}

function body(slide, text, x, y, w, h, fg, fontSize = 18) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: SERIF, fontSize, italic: true, color: fg,
    align: "left", valign: "top", margin: 0,
    lineSpacingMultiple: 1.4,
  });
}

function tagGrid(slide, tags, x, y, fg, accent) {
  const colW = 2.4, rowH = 0.55;
  tags.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const tx = x + col * colW;
    const ty = y + row * rowH;
    slide.addText(t, {
      x: tx, y: ty, w: colW, h: 0.35,
      fontFace: SANS, fontSize: 13, charSpacing: 4, bold: true, color: fg,
      align: "left", valign: "middle", margin: 0,
    });
    rule(slide, tx, ty + 0.32, 0.4, accent, 1);
  });
}

// =============================================================================
// SLIDE 1 — Cover (DARK)
// =============================================================================
{
  const p = palette(1);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  placeImage(slide, "image-1-1.jpeg", 11, 0, 9, 11.25);

  slide.addText("IMAGINE STUDIOS", {
    x: 1, y: 0.7, w: 6, h: 0.4,
    fontFace: SANS, fontSize: 14, charSpacing: 5, bold: true, color: p.fg,
    align: "left", valign: "middle", margin: 0,
  });
  rule(slide, 1, 1.2, 1.2, p.accent, 1.5);

  slide.addText("PHOTOGRAPHY PORTFOLIO  ·  VOLUME IV", {
    x: 1, y: 1.55, w: 9, h: 0.45,
    fontFace: SANS, fontSize: 14, charSpacing: 6, color: p.fg,
    align: "left", valign: "middle", margin: 0,
  });

  slide.addText("Light,", {
    x: 1, y: 2.7, w: 9.5, h: 1.7,
    fontFace: SERIF, fontSize: 130, color: p.fg, charSpacing: -2,
    align: "left", valign: "top", margin: 0,
  });
  slide.addText("held still.", {
    x: 1, y: 4.5, w: 9.5, h: 1.7,
    fontFace: SERIF, fontSize: 130, italic: true, color: p.fg, charSpacing: -2,
    align: "left", valign: "top", margin: 0,
  });

  rule(slide, 1, 6.85, 0.6, p.accent, 1.5);
  slide.addText(
    "A selection of work in weddings, travel, editorial & product — 2021–2026.",
    {
      x: 1, y: 7.1, w: 8.5, h: 1.4,
      fontFace: SERIF, fontSize: 22, italic: true, color: p.fg,
      align: "left", valign: "top", margin: 0,
      lineSpacingMultiple: 1.35,
    }
  );

  rule(slide, 1, 9.5, 9, p.accent, 0.75);
  slide.addText("PREPARED FOR", {
    x: 1, y: 9.7, w: 4, h: 0.4,
    fontFace: SANS, fontSize: 12, charSpacing: 5, color: p.fg, bold: true,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText("Prospective Clients", {
    x: 1, y: 10.1, w: 5, h: 0.5,
    fontFace: SERIF, fontSize: 22, italic: true, color: p.fg,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText("MMXXVI", {
    x: 7, y: 9.95, w: 3, h: 0.55,
    fontFace: SERIF, fontSize: 32, italic: true, color: p.fg,
    align: "left", valign: "middle", margin: 0,
  });
}

// =============================================================================
// SLIDE 2 — About (LIGHT)
// =============================================================================
{
  const p = palette(2);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "ABOUT THE STUDIO", p.fg, p.accent);
  chapterMark(slide, "01", p.deco);
  sectionLabel(slide, "CHAPTER ONE  ·  THE STUDIO", 1, 1.7, p.fg, p.accent);
  headline(slide, "Pictures that", "remember.", 1, 2.7, 9, p.fg);

  body(
    slide,
    "An independent studio working between cities, coastlines and quiet rooms. We make photographs that hold up — on a wall, in a magazine, or twenty years from now.",
    1, 6.2, 4.2, 2.6, p.fg, 18
  );

  const stats = [
    { num: "12y",  label: "YEARS WORKING" },
    { num: "38",   label: "COUNTRIES" },
    { num: "240+", label: "CLIENTS" },
  ];
  stats.forEach((s, i) => {
    const sx = 1 + i * 2.4;
    slide.addText(s.num, {
      x: sx, y: 9.0, w: 2.2, h: 0.7,
      fontFace: SERIF, fontSize: 40, color: p.fg,
      align: "left", valign: "middle", margin: 0,
    });
    slide.addText(s.label, {
      x: sx, y: 9.7, w: 2.2, h: 0.35,
      fontFace: SANS, fontSize: 11, charSpacing: 3, bold: true, color: p.fg,
      align: "left", valign: "middle", margin: 0,
    });
  });

  placeImage(slide, "image-2-1.jpeg", 10, 1.5, 9, 8.5);

  footer(slide, "02", "About", p.fg, p.accent);
}

// =============================================================================
// SLIDE 3 — Weddings (LIGHT)
// =============================================================================
{
  const p = palette(3);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "CATEGORY I  ·  WEDDINGS", p.fg, p.accent);
  chapterMark(slide, "I", p.deco);
  sectionLabel(slide, "CATEGORY ONE", 1, 1.7, p.fg, p.accent);
  headline(slide, "The", "wedding day.", 1, 2.7, 9, p.fg);

  body(
    slide,
    "Documentary at heart, romantic in spirit. We follow the day as it actually unfolds — vows, light, hands, and the small moments in between.",
    1, 6.2, 4.2, 2.4, p.fg, 18
  );

  tagGrid(slide, ["CEREMONIES", "PORTRAITS", "RECEPTION", "DESTINATION"],
          1, 8.9, p.fg, p.accent);

  placeImage(slide, "image-3-1.jpeg", 10,   1.5,  5,   8.5);
  placeImage(slide, "image-3-2.jpeg", 15.2, 1.5,  3.8, 4.15);
  placeImage(slide, "image-3-3.jpeg", 15.2, 5.85, 3.8, 4.15);

  footer(slide, "03", "Weddings", p.fg, p.accent);
}

// =============================================================================
// SLIDE 4 — Travel (LIGHT)
// =============================================================================
{
  const p = palette(4);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "CATEGORY II  ·  TRAVEL", p.fg, p.accent);
  chapterMark(slide, "II", p.deco);
  sectionLabel(slide, "CATEGORY TWO", 1, 1.7, p.fg, p.accent);
  headline(slide, "Roads,", "elsewhere.", 1, 2.7, 9, p.fg);

  body(
    slide,
    "Field work from thirty-eight countries — landscapes, hotels, and the people we meet along the way. Made for editorial features, brand stories, and tourism boards.",
    1, 6.2, 4.2, 2.4, p.fg, 18
  );

  tagGrid(slide, ["LANDSCAPE", "HOSPITALITY", "CULTURE", "REPORTAGE"],
          1, 8.9, p.fg, p.accent);

  placeImage(slide, "image-4-1.jpeg", 10,   1.5, 9,   5.4);
  placeImage(slide, "image-4-2.jpeg", 10,   7.1, 4.4, 2.9);
  placeImage(slide, "image-4-3.jpeg", 14.6, 7.1, 4.4, 2.9);

  footer(slide, "04", "Travel", p.fg, p.accent);
}

// =============================================================================
// SLIDE 5 — Editorial (DARK)
// =============================================================================
{
  const p = palette(5);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "CATEGORY III  ·  EDITORIAL", p.fg, p.accent);
  chapterMark(slide, "III", p.deco);
  sectionLabel(slide, "CATEGORY THREE", 1, 1.7, p.fg, p.accent);
  headline(slide, "Fashion,", "on the page.", 1, 2.7, 9, p.fg);

  body(
    slide,
    "Studio and on-location editorial for magazines, lookbooks and seasonal campaigns. Shaped light, considered styling, and a fluency with talent.",
    1, 6.2, 4.2, 2.4, p.fg, 18
  );

  tagGrid(slide, ["EDITORIAL", "LOOKBOOK", "CAMPAIGN", "BEAUTY"],
          1, 8.9, p.fg, p.accent);

  placeImage(slide, "image-5-1.jpeg", 10,   1.5,  4.4, 8.5);
  placeImage(slide, "image-5-2.jpeg", 14.6, 1.5,  4.4, 4.15);
  placeImage(slide, "image-5-3.jpeg", 14.6, 5.85, 4.4, 4.15);

  footer(slide, "05", "Editorial", p.fg, p.accent);
}

// =============================================================================
// SLIDE 6 — Product (LIGHT)
// =============================================================================
{
  const p = palette(6);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "CATEGORY IV  ·  PRODUCT", p.fg, p.accent);
  chapterMark(slide, "IV", p.deco);
  sectionLabel(slide, "CATEGORY FOUR", 1, 1.7, p.fg, p.accent);
  headline(slide, "Objects,", "in good light.", 1, 2.7, 9, p.fg);

  body(
    slide,
    "Studio still life and product photography for direct-to-consumer brands, perfumers, jewellers and cookbook publishers. Built to sell — quietly.",
    1, 6.2, 4.2, 2.4, p.fg, 18
  );

  tagGrid(slide, ["STILL LIFE", "E-COMMERCE", "BEAUTY", "FOOD"],
          1, 8.9, p.fg, p.accent);

  placeImage(slide, "image-6-1.jpeg", 10,   1.5,  4.4, 4.15);
  placeImage(slide, "image-6-2.jpeg", 14.6, 1.5,  4.4, 4.15);
  placeImage(slide, "image-6-3.jpeg", 10,   5.85, 4.4, 4.15);
  placeImage(slide, "image-6-4.jpeg", 14.6, 5.85, 4.4, 4.15);

  footer(slide, "06", "Product", p.fg, p.accent);
}

// =============================================================================
// SLIDE 7 — Selected work (LIGHT, image grid)
// =============================================================================
{
  const p = palette(7);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  slide.addText("SELECTED WORK  ·  2021–2026", {
    x: 1, y: 0.9, w: 9, h: 0.45,
    fontFace: SANS, fontSize: 14, charSpacing: 6, bold: true, color: p.fg,
    align: "left", valign: "middle", margin: 0,
  });
  rule(slide, 1, 1.45, 1.2, p.accent, 1.5);

  slide.addText([
    { text: "A short", options: { fontFace: SERIF, fontSize: 96, color: p.fg } },
    { text: "reel.",    options: { fontFace: SERIF, fontSize: 96, italic: true, color: p.fg } },
  ], {
    x: 1, y: 1.7, w: 13, h: 1.4, valign: "top", margin: 0, charSpacing: -1,
  });

  slide.addText("FRAMES SHOWN", {
    x: 14, y: 1.6, w: 5, h: 0.4,
    fontFace: SANS, fontSize: 12, charSpacing: 4, bold: true, color: p.fg,
    align: "right", valign: "middle", margin: 0,
  });
  slide.addText("Seven of two-forty", {
    x: 14, y: 2.05, w: 5, h: 0.5,
    fontFace: SERIF, fontSize: 22, italic: true, color: p.fg,
    align: "right", valign: "middle", margin: 0,
  });

  placeImage(slide, "image-7-1.jpeg", 1,     3.4,  5.6,  6.6);
  placeImage(slide, "image-7-2.jpeg", 6.75,  3.4,  5.6,  3.2);
  placeImage(slide, "image-7-3.jpeg", 12.5,  3.4,  2.7,  3.2);
  placeImage(slide, "image-7-4.jpeg", 15.35, 3.4,  3.65, 3.2);
  placeImage(slide, "image-7-5.jpeg", 6.75,  6.75, 2.7,  3.25);
  placeImage(slide, "image-7-6.jpeg", 9.6,   6.75, 5.6,  3.25);
  placeImage(slide, "image-7-7.jpeg", 15.35, 6.75, 3.65, 3.25);

  footer(slide, "07", "Selected", p.fg, p.accent);
}

// =============================================================================
// SLIDE 8 — Get in touch (DARK)
// =============================================================================
{
  const p = palette(8);
  const slide = pres.addSlide();
  slide.background = { color: p.bg };

  header(slide, "IMAGINE STUDIOS", "GET IN TOUCH", p.fg, p.accent);
  chapterMark(slide, "VIII", p.deco);
  sectionLabel(slide, "CLOSING  ·  LET'S WORK", 1, 1.7, p.fg, p.accent);
  headline(slide, "Bring us", "your story.", 1, 2.7, 9, p.fg);

  rule(slide, 1, 6.0, 0.6, p.accent, 1.5);
  body(
    slide,
    "Commissions for 2026 & 2027 are open. Weddings, editorial, travel features and brand work — worldwide.",
    1, 6.2, 8.5, 1.4, p.fg, 22
  );

  const contacts = [
    { label: "EMAIL",      value: "studio@imagine.photo", col: 0, row: 0 },
    { label: "TELEPHONE",  value: "+1 (415) 555 — 0114",  col: 1, row: 0 },
    { label: "INSTAGRAM",  value: "@imagine.studios",     col: 0, row: 1 },
    { label: "ON THE WEB", value: "imagine.photo",        col: 1, row: 1 },
  ];
  const cx = 1, cy = 7.9, cw = 4.0, ch = 1.0;
  contacts.forEach(c => {
    const x = cx + c.col * (cw + 0.5);
    const y = cy + c.row * ch;
    slide.addText(c.label, {
      x, y, w: cw, h: 0.35,
      fontFace: SANS, fontSize: 12, charSpacing: 4, bold: true, color: p.fg,
      align: "left", valign: "middle", margin: 0,
    });
    rule(slide, x, y + 0.32, 0.4, p.accent, 1);
    slide.addText(c.value, {
      x, y: y + 0.4, w: cw, h: 0.5,
      fontFace: SERIF, fontSize: 20, italic: true, color: p.fg,
      align: "left", valign: "middle", margin: 0,
    });
  });

  placeImage(slide, "image-8-1.jpeg", 11, 1.5, 8, 8.5);

  footer(slide, "08", "Contact", p.fg, p.accent);
}

// ---------------------------------------------------------------------------
const outName = "Deliverable_11_recreated.pptx";
const outPath = path.join(__dirname, outName);

(async () => {
  console.log(`Pre-cropping ${cropQueue.length} image placements (${new Set(cropQueue.map(j => j.out)).size} unique outputs)...`);
  await processCropQueue();
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote " + outPath);
})().catch(err => { console.error(err); process.exit(1); });
