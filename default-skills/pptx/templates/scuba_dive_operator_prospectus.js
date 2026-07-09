// Abyssal — dive operation prospectus
// Recreates scuba.pptx using pptxgenjs

const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG = (n) => path.join(__dirname, "images", n);

// Palette
const NAVY       = "0E2544";   // deep navy (dark backgrounds)
const NAVY_DK    = "091A30";   // darker navy for cards
const ICE        = "E6ECF2";   // light background
const ICE_LT     = "DEE6EE";   // slightly darker light bg
const INK        = "0B1E3A";   // heading ink
const INK_SOFT   = "1C2F4D";   // body ink
const SKY        = "7FA6C8";   // accent sky
const SKY_LT     = "9CBDD8";   // lighter sky
const SKY_DK     = "4A78A2";   // darker sky
const MUTED      = "6F89A6";   // muted text
const MUTED_ICE  = "A9BED2";   // muted on ice
const WHITE      = "FFFFFF";
const BAR_DK     = "0E2744";
const BAR_MD     = "2F5E8A";
const BAR_LT     = "8AB0D4";
const BAR_XLT    = "B5CDE2";

// Fonts
const SERIF = "Georgia";
const SANS  = "Calibri";
const MONO  = "Consolas";

// Slide dims (custom 20 x 11.25)
const W = 20;
const H = 11.25;

const pres = new pptxgen();
pres.defineLayout({ name: "ABYSSAL", width: W, height: H });
pres.layout = "ABYSSAL";
pres.title  = "Abyssal — Prospectus MMXXVI";
pres.author = "Abyssal";

// ---------- helpers ----------
function addHeader(slide, section, onDark) {
  const fg = onDark ? WHITE : INK_SOFT;
  const muted = onDark ? MUTED_ICE : MUTED;
  // Diamond glyph
  slide.addText("◆", {
    x: 1.1, y: 0.55, w: 0.35, h: 0.35,
    fontFace: SANS, fontSize: 14, color: fg, align: "center", valign: "middle", margin: 0,
  });
  // Brand
  slide.addText("ABYSSAL", {
    x: 1.5, y: 0.55, w: 3.5, h: 0.35,
    fontFace: SANS, fontSize: 12, color: fg, charSpacing: 6, valign: "middle", margin: 0, bold: false,
  });
  // Section (right)
  if (section) {
    slide.addText(section, {
      x: W - 5.5, y: 0.55, w: 4.4, h: 0.35,
      fontFace: SANS, fontSize: 12, color: fg, charSpacing: 6, align: "right", valign: "middle", margin: 0,
    });
  }
}

function addFooter(slide, sectionShort, page, onDark) {
  const fg = onDark ? WHITE : INK_SOFT;
  slide.addText("ABYSSAL — PROSPECTUS MMXXVI", {
    x: 1.1, y: H - 0.55, w: 6, h: 0.3,
    fontFace: SANS, fontSize: 9.5, color: fg, charSpacing: 4, valign: "middle", margin: 0,
  });
  slide.addText(sectionShort, {
    x: W / 2 - 3, y: H - 0.55, w: 6, h: 0.3,
    fontFace: SANS, fontSize: 9.5, color: fg, charSpacing: 4, align: "center", valign: "middle", margin: 0,
  });
  slide.addText(page, {
    x: W - 3.1, y: H - 0.55, w: 2, h: 0.3,
    fontFace: SANS, fontSize: 9.5, color: fg, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

// A simple monochrome "stamp" — concentric circle with text-in-center
function addStamp(slide, x, y, size, letter, color) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { type: "solid", color: "FFFFFF", transparency: 100 },
    line: { color, width: 0.75, transparency: 40 },
  });
  slide.addShape(pres.shapes.OVAL, {
    x: x + size * 0.18, y: y + size * 0.18, w: size * 0.64, h: size * 0.64,
    fill: { type: "solid", color: "FFFFFF", transparency: 100 },
    line: { color, width: 0.5, transparency: 40 },
  });
  slide.addText(letter, {
    x, y, w: size, h: size,
    fontFace: SERIF, italic: true, fontSize: Math.round(size * 22),
    color, align: "center", valign: "middle", margin: 0, transparency: 40,
  });
}

// ============================================================
// SLIDE 1 — Title / cover
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  // Hero photo (right ~55%)
  s.addImage({ path: IMG("image-1-1.jpeg"), x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  // Dark overlay on left for text legibility
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W * 0.55, h: H,
    fill: { color: "000000", transparency: 45 }, line: { type: "none" },
  });

  addHeader(s, null, true);
  // Header right cluster: A DIVE OPERATION | MMXXVI · NO. 01
  s.addText("A DIVE OPERATION", {
    x: W - 8.5, y: 0.55, w: 3.8, h: 0.35,
    fontFace: SANS, fontSize: 12, color: WHITE, charSpacing: 6, align: "right", valign: "middle", margin: 0,
  });
  s.addText("|", {
    x: W - 4.5, y: 0.55, w: 0.4, h: 0.35,
    fontFace: SANS, fontSize: 12, color: WHITE, align: "center", valign: "middle", margin: 0, transparency: 40,
  });
  s.addText("MMXXVI · NO. 01", {
    x: W - 4.0, y: 0.55, w: 2.9, h: 0.35,
    fontFace: SANS, fontSize: 12, color: WHITE, charSpacing: 6, align: "right", valign: "middle", margin: 0,
  });

  // Eyebrow
  s.addText("SÃO MIGUEL · AZORES · MID-ATLANTIC RIDGE", {
    x: 1.1, y: 4.9, w: 10, h: 0.4,
    fontFace: SANS, fontSize: 12, color: SKY_LT, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Huge serif title "Abyssal."
  s.addText([
    { text: "Abyssal", options: { color: WHITE } },
    { text: ".",       options: { color: SKY_LT } },
  ], {
    x: 1.0, y: 5.4, w: 12, h: 2.6,
    fontFace: SERIF, fontSize: 170, bold: false, valign: "middle", margin: 0,
  });

  // Tagline
  s.addText([
    { text: "The Atlantic, ", options: { color: WHITE, italic: true } },
    { text: "at depth.",      options: { color: SKY_LT, italic: true } },
  ], {
    x: 1.1, y: 8.2, w: 10, h: 0.7,
    fontFace: SERIF, fontSize: 34, italic: true, valign: "middle", margin: 0,
  });

  // Right-column coordinates block
  s.addText("◆  COORDINATES", {
    x: W - 4.3, y: 6.4, w: 3.1, h: 0.3,
    fontFace: SANS, fontSize: 11, color: WHITE, charSpacing: 5, align: "right", valign: "middle", margin: 0,
  });
  s.addText("37°44′N", {
    x: W - 4.3, y: 6.8, w: 3.1, h: 0.35,
    fontFace: MONO, fontSize: 15, color: WHITE, align: "right", valign: "middle", margin: 0,
  });
  s.addText("25°40′W", {
    x: W - 4.3, y: 7.15, w: 3.1, h: 0.35,
    fontFace: MONO, fontSize: 15, color: WHITE, align: "right", valign: "middle", margin: 0,
  });
  s.addText("— 40 m", {
    x: W - 4.3, y: 7.55, w: 3.1, h: 0.35,
    fontFace: MONO, fontSize: 15, color: SKY_LT, align: "right", valign: "middle", margin: 0,
  });

  // Footer bar
  addFooter(s, "PROSPECTUS · CONFIDENTIAL", "01 / 08", true);
}

// ============================================================
// SLIDE 2 — Thesis / manifesto
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: ICE };
  addHeader(s, "I  ·  THESIS");

  // Thin outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.45, w: W - 0.9, h: H - 0.9,
    fill: { type: "solid", color: ICE, transparency: 100 },
    line: { color: SKY_LT, width: 0.5 },
  });

  // Chapter rule — left line + diamond + label
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 1.6, w: 1.6, h: 0,
    line: { color: SKY_DK, width: 0.75 },
  });
  s.addText("◆", {
    x: 2.72, y: 1.44, w: 0.3, h: 0.3,
    fontFace: SANS, fontSize: 13, color: SKY_DK, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 3.05, y: 1.6, w: 1.2, h: 0,
    line: { color: SKY_DK, width: 0.75 },
  });
  s.addText("CHAPTER ONE  ·  POSITION", {
    x: 4.3, y: 1.42, w: 4.5, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SKY_DK, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Right rule
  s.addShape(pres.shapes.LINE, {
    x: W - 5.5, y: 1.6, w: 1.5, h: 0,
    line: { color: SKY_DK, width: 0.75 },
  });
  s.addText("◆", {
    x: W - 4.0, y: 1.44, w: 0.3, h: 0.3,
    fontFace: SANS, fontSize: 13, color: SKY_DK, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: W - 3.65, y: 1.6, w: 1.4, h: 0,
    line: { color: SKY_DK, width: 0.75 },
  });

  // Big roman numeral behind
  s.addText("I", {
    x: 1.1, y: 2.2, w: 1.5, h: 3,
    fontFace: SERIF, fontSize: 180, color: SKY_LT, transparency: 55, valign: "top", margin: 0,
  });

  // Oversized pull quote
  s.addText("“", {
    x: 3.0, y: 2.05, w: 0.8, h: 1.2,
    fontFace: SERIF, fontSize: 110, color: INK_SOFT, valign: "top", margin: 0,
  });
  s.addText([
    { text: "Diving,",         options: { color: INK,    italic: false, breakLine: true } },
    { text: "reconsidered ",   options: { color: SKY_DK, italic: true                    } },
    { text: "as",              options: { color: INK,    italic: false, breakLine: true } },
    { text: "patience.",       options: { color: SKY_LT, italic: true                    } },
  ], {
    x: 3.5, y: 2.1, w: 8.6, h: 4.8,
    fontFace: SERIF, fontSize: 68, bold: false, valign: "top", margin: 0,
    paraSpaceAfter: 0, lineSpacingMultiple: 1.0,
  });

  // Attribution — short line + label
  s.addShape(pres.shapes.LINE, {
    x: 3.6, y: 7.1, w: 0.7, h: 0,
    line: { color: SKY_DK, width: 0.75 },
  });
  s.addText("ABYSSAL  ·  MANIFESTO, CLAUSE ONE", {
    x: 4.4, y: 6.95, w: 6, h: 0.35,
    fontFace: SANS, fontSize: 11, color: SKY_DK, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Vertical section label left edge
  s.addText("§ 01 — POSITION STATEMENT", {
    x: 0.35, y: 4.5, w: 2.5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2,
    rotate: 270, valign: "middle", margin: 0,
  });

  // Right column — photo
  s.addImage({ path: IMG("image-2-8.jpeg"), x: 12.7, y: 2.1, w: 6.1, h: 3.1, sizing: { type: "cover", w: 6.1, h: 3.1 } });
  // Plate labels under photo
  s.addText("PLATE I", {
    x: 12.7, y: 5.25, w: 3, h: 0.3,
    fontFace: SANS, fontSize: 10, color: SKY_DK, charSpacing: 5, valign: "middle", margin: 0,
  });
  s.addText("— 32 M  ·  CALOURA", {
    x: 14.7, y: 5.25, w: 4.1, h: 0.3,
    fontFace: SANS, fontSize: 10, color: SKY_DK, charSpacing: 5, align: "right", valign: "middle", margin: 0,
  });

  // Stamp (circular) overlaid on photo top-right
  addStamp(s, 17.4, 1.85, 1.3, "I", SKY_DK);

  // Body paragraph with left rule
  s.addShape(pres.shapes.LINE, {
    x: 12.7, y: 5.75, w: 0, h: 1.6,
    line: { color: SKY_DK, width: 1.5 },
  });
  s.addText([
    { text: "Most operators sell adrenaline by the tankful. We don't. The Atlantic beneath the Azores rewards ", options: { color: INK_SOFT } },
    { text: "stillness", options: { color: SKY_DK, italic: true } },
    { text: " — neutral buoyancy, long exposures, the willingness to hang at forty metres and watch the kelp move.", options: { color: INK_SOFT } },
  ], {
    x: 12.85, y: 5.7, w: 6.0, h: 1.8,
    fontFace: SERIF, fontSize: 15, valign: "top", margin: 0,
    paraSpaceAfter: 4,
  });

  // Rule above log
  s.addShape(pres.shapes.LINE, {
    x: 12.7, y: 7.85, w: 6.1, h: 0,
    line: { color: SKY_DK, width: 0.5 },
  });

  // Dive log
  s.addText("●  DIVE LOG  ·  EXCERPTS", {
    x: 12.7, y: 8.0, w: 6, h: 0.3,
    fontFace: MONO, fontSize: 10, color: SKY_DK, charSpacing: 2, valign: "middle", margin: 0,
  });
  const logLines = [
    "14.05  ·  38m  ·  vis 28m  ·  mobula×3",
    "14.07  ·  42m  ·  vis 30m  ·  kelp drift",
    "14.09  ·  31m  ·  vis 25m  ·  wall silent",
  ];
  logLines.forEach((line, i) => {
    s.addText(line, {
      x: 12.7, y: 8.35 + i * 0.28, w: 6, h: 0.28,
      fontFace: MONO, fontSize: 11, color: INK_SOFT, valign: "middle", margin: 0,
    });
  });

  addFooter(s, "I  ·  THESIS", "02 / 08");
}

// ============================================================
// SLIDE 3 — Place / São Miguel
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  // Left dark half stays navy; right half is the sunset photo
  s.addImage({ path: IMG("image-3-1.jpeg"), x: W * 0.5, y: 0, w: W * 0.5, h: H, sizing: { type: "cover", w: W * 0.5, h: H } });

  addHeader(s, "II  ·  PLACE", true);

  // Coordinate label
  s.addText("38°N  ·  MID-ATLANTIC RIDGE", {
    x: 1.1, y: 1.8, w: 8, h: 0.4,
    fontFace: SANS, fontSize: 13, color: SKY_LT, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Huge serif headline
  s.addText([
    { text: "São ",    options: { color: WHITE,  italic: false } },
    { text: "Miguel",  options: { color: SKY_LT, italic: true  } },
    { text: ".",       options: { color: SKY_LT } },
  ], {
    x: 1.0, y: 2.2, w: 10, h: 2.0,
    fontFace: SERIF, fontSize: 96, valign: "middle", margin: 0,
  });

  // Thin horizontal rule with diamond
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 4.7, w: 1.7, h: 0,
    line: { color: SKY_LT, width: 0.5 },
  });
  s.addText("◆", {
    x: 2.85, y: 4.55, w: 0.3, h: 0.3,
    fontFace: SANS, fontSize: 12, color: SKY_LT, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 3.17, y: 4.7, w: 1.6, h: 0,
    line: { color: SKY_LT, width: 0.5 },
  });

  // Body
  s.addText(
    "A volcanic shelf in the middle of an ocean. Twenty-two named sites, nine thermal vents, and the clearest Atlantic water north of the tropics.", {
      x: 1.1, y: 5.0, w: 7.3, h: 1.7,
      fontFace: SERIF, fontSize: 18, color: WHITE, valign: "top", margin: 0,
      paraSpaceAfter: 2,
    }
  );

  // Thin rule above stats
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 6.9, w: 7.3, h: 0,
    line: { color: SKY_LT, width: 0.5, transparency: 40 },
  });

  // Stats row: 22 / 30 m / 21° / 09
  const stats = [
    { big: "22",   label: "DIVE SITES" },
    { big: "30 m", label: "VISIBILITY" },
    { big: "21°",  label: "SUMMER TEMP" },
    { big: "09",   label: "THERMAL VENTS" },
  ];
  stats.forEach((st, i) => {
    const x = 1.1 + i * 1.85;
    s.addText(st.big, {
      x, y: 7.1, w: 1.8, h: 0.8,
      fontFace: SERIF, fontSize: 44, color: SKY_LT, valign: "top", margin: 0,
    });
    s.addText(st.label, {
      x, y: 7.95, w: 1.8, h: 0.3,
      fontFace: SANS, fontSize: 9, color: MUTED_ICE, charSpacing: 4, valign: "top", margin: 0,
    });
  });

  // Active site callout overlay on photo
  const cx = W - 4.8, cy = 5.35, cw = 3.6, ch = 1.3;
  s.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: cy, w: cw, h: ch,
    fill: { color: NAVY, transparency: 10 }, line: { color: SKY_LT, width: 0.5, transparency: 40 },
  });
  s.addText([
    { text: "●  ", options: { color: SKY_LT } },
    { text: "ACTIVE SITE", options: { color: SKY_LT, charSpacing: 4 } },
  ], {
    x: cx + 0.2, y: cy + 0.1, w: cw - 0.4, h: 0.3,
    fontFace: SANS, fontSize: 10, valign: "middle", margin: 0,
  });
  s.addText("PONTA DA FERRARIA", {
    x: cx + 0.2, y: cy + 0.4, w: cw - 0.4, h: 0.35,
    fontFace: SANS, fontSize: 14, color: WHITE, bold: true, charSpacing: 2, valign: "middle", margin: 0,
  });
  s.addText("37.8604°  ·  −25.8478°", {
    x: cx + 0.2, y: cy + 0.75, w: cw - 0.4, h: 0.28,
    fontFace: MONO, fontSize: 10, color: MUTED_ICE, valign: "middle", margin: 0,
  });
  s.addText([
    { text: "— 18 M", options: { color: SKY_LT } },
    { text: "    |    ", options: { color: MUTED_ICE } },
    { text: "19°",     options: { color: SKY_LT } },
  ], {
    x: cx + 0.2, y: cy + 1.0, w: cw - 0.4, h: 0.28,
    fontFace: MONO, fontSize: 10, valign: "middle", margin: 0,
  });

  // Vertical label on right (over photo)
  s.addText("ISLAND OF SETE CIDADES", {
    x: W - 0.95, y: 4.5, w: 2.5, h: 0.3,
    fontFace: SANS, fontSize: 9, color: WHITE, charSpacing: 3,
    rotate: 270, valign: "middle", margin: 0, transparency: 40,
  });

  addFooter(s, "II  ·  PLACE", "03 / 08", true);
}

// ============================================================
// SLIDE 4 — The Water / cross-section
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: ICE_LT };
  addHeader(s, null);

  // Eyebrow
  s.addText("CROSS-SECTION  ·  MORNING DIVE", {
    x: 1.1, y: 1.8, w: 7, h: 0.4,
    fontFace: SANS, fontSize: 13, color: SKY_DK, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Headline
  s.addText([
    { text: "Six strata,\n",  options: { color: INK,    italic: false } },
    { text: "one descent.",   options: { color: SKY_LT, italic: true  } },
  ], {
    x: 1.0, y: 2.2, w: 10, h: 2.2,
    fontFace: SERIF, fontSize: 72, valign: "top", margin: 0,
  });

  // Cousteau quote bottom-left
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 8.2, w: 0.6, h: 0,
    line: { color: SKY_DK, width: 1 },
  });
  s.addText("\"The Azores drop off sharply. Within thirty metres of the shore you are over two thousand.\"", {
    x: 1.1, y: 8.35, w: 7.2, h: 1.1,
    fontFace: SERIF, italic: true, fontSize: 15, color: INK_SOFT, valign: "top", margin: 0,
  });
  s.addText("— J. COUSTEAU  ·  1958", {
    x: 1.1, y: 9.45, w: 5, h: 0.3,
    fontFace: SANS, fontSize: 10, color: SKY_DK, charSpacing: 5, valign: "middle", margin: 0,
  });

  // Strata rows on right
  const strata = [
    { d: "— 00 m", glyph: "◯", name: "Surface",      sub: "Briefing & checks",   col: MUTED },
    { d: "— 10 m", glyph: "◔", name: "Open Water",   sub: "Certification dives", col: SKY_LT },
    { d: "— 18 m", glyph: "◑", name: "Caldera rim",  sub: "Lava-tube arches",    col: SKY },
    { d: "— 28 m", glyph: "◕", name: "Cleaning stn.",sub: "Mobula, devil rays",  col: SKY_DK },
    { d: "— 40 m", glyph: "●", name: "Drop-off",     sub: "Pelagic passage",     col: SKY_DK },
    { d: "— 60 m", glyph: "◆", name: "Technical",    sub: "Trimix, deco",        col: SKY_DK },
  ];
  const rowX = 10.5, rowY0 = 2.1, rowH = 1.25;
  strata.forEach((st, i) => {
    const y = rowY0 + i * rowH;
    // depth
    s.addText(st.d, {
      x: rowX, y: y + 0.1, w: 1.4, h: 0.35,
      fontFace: MONO, fontSize: 12, color: SKY_DK, charSpacing: 2, valign: "middle", margin: 0,
    });
    // Small connector dash
    s.addShape(pres.shapes.LINE, {
      x: rowX + 1.45, y: y + 0.28, w: 0.25, h: 0,
      line: { color: SKY_DK, width: 0.75 },
    });
    // Glyph
    s.addText(st.glyph, {
      x: rowX + 1.75, y: y + 0.05, w: 0.5, h: 0.5,
      fontFace: SANS, fontSize: 20, color: st.col, align: "center", valign: "middle", margin: 0,
    });
    // Name
    s.addText(st.name, {
      x: rowX + 2.3, y: y, w: 5, h: 0.6,
      fontFace: SERIF, fontSize: 28, color: INK, valign: "middle", margin: 0,
    });
    // Sub
    s.addText(st.sub, {
      x: rowX + 2.3, y: y + 0.6, w: 5, h: 0.35,
      fontFace: SANS, fontSize: 11, color: MUTED, charSpacing: 2, valign: "middle", margin: 0,
    });
    // row rule
    if (i < strata.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rowX, y: y + rowH - 0.1, w: 8.0, h: 0,
        line: { color: SKY_LT, width: 0.4, transparency: 50 },
      });
    }
  });

  // Scattered dots (bubbles) for atmosphere — small circles
  const bubbles = [
    [0.7, 1.8, 0.06], [1.5, 2.6, 0.05], [0.6, 4.0, 0.07],
    [2.0, 4.8, 0.05], [3.0, 5.6, 0.06], [1.0, 6.5, 0.05],
    [2.5, 7.0, 0.04], [3.8, 7.8, 0.06], [5.0, 7.3, 0.05],
    [6.2, 8.9, 0.05], [7.4, 9.3, 0.04], [8.3, 8.5, 0.05],
    [9.0, 9.7, 0.06], [4.5, 9.0, 0.05], [5.8, 9.7, 0.05],
    [2.5, 2.2, 0.04], [3.7, 3.2, 0.05], [4.8, 2.9, 0.04],
  ];
  bubbles.forEach(([bx, by, bs]) => {
    s.addShape(pres.shapes.OVAL, {
      x: bx, y: by, w: bs, h: bs,
      fill: { color: WHITE, transparency: 40 }, line: { type: "none" },
    });
  });

  addFooter(s, "III  ·  WATER", "04 / 08");
}

// ============================================================
// SLIDE 5 — Programs (three cards)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: ICE };
  addHeader(s, "IV  ·  PROGRAMS");

  // Outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.45, w: W - 0.9, h: H - 0.9,
    fill: { type: "solid", color: ICE, transparency: 100 },
    line: { color: SKY_LT, width: 0.5 },
  });

  // Big headline
  s.addText([
    { text: "Three ways ", options: { color: INK, italic: false } },
    { text: "down.",       options: { color: SKY_LT, italic: true } },
  ], {
    x: 1.0, y: 1.5, w: 13, h: 1.6,
    fontFace: SERIF, fontSize: 80, valign: "middle", margin: 0,
  });

  // Right-aligned chapter label
  s.addText("§ 04 — PROGRAMS & TIERS", {
    x: W - 6.5, y: 2.0, w: 5.4, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SKY_DK, charSpacing: 6, align: "right", valign: "middle", margin: 0,
  });

  // Full-width divider with center diamond
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 3.4, w: W / 2 - 1.35, h: 0,
    line: { color: SKY_LT, width: 0.5 },
  });
  s.addText("◆", {
    x: W / 2 - 0.2, y: 3.25, w: 0.4, h: 0.3,
    fontFace: SANS, fontSize: 12, color: SKY, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: W / 2 + 0.25, y: 3.4, w: W / 2 - 1.35, h: 0,
    line: { color: SKY_LT, width: 0.5 },
  });

  // Three cards
  const cards = [
    {
      no: "No. 01", depth: "— 18 m",
      plate: "PLATE 01", code: "ABYSSAL · THRESHOLD",
      title: "Threshold", sub: "OPEN-WATER CERTIFICATION",
      body: "Your first breath at depth. Four dives, two lagoon, two open ocean. Small groups, never more than three.",
      days: "4 DAYS", price: "€ 680",
      img: "image-5-7.jpeg",
      dark: false,
    },
    {
      no: "No. 02", depth: "— 40 m",
      plate: "PLATE 02", code: "ABYSSAL · PASSAGE",
      title: "Passage", sub: "ADVANCED GUIDED WEEK",
      body: "The full São Miguel circuit. Caldera rim, cleaning stations, a pelagic drift at Dollabarat Bank.",
      days: "7 DAYS", price: "€ 2,450",
      img: "image-5-8.jpeg",
      dark: true,
    },
    {
      no: "No. 03", depth: "— 80 m",
      plate: "PLATE 03", code: "ABYSSAL · ABYSSAL",
      title: "Abyssal", sub: "TECHNICAL EXPEDITION",
      body: "Trimix, stage bottles, accelerated deco. Wrecks and walls reserved for our certified technical clients.",
      days: "10 DAYS", price: "on request",
      img: "image-5-9.jpeg",
      dark: false,
    },
  ];

  const cardW = 5.8, cardH = 6.6, gap = 0.35;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (W - totalW) / 2;
  const cardY  = 3.8;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    const bg = c.dark ? NAVY_DK : WHITE;
    const txt = c.dark ? WHITE : INK;
    const muted = c.dark ? MUTED_ICE : MUTED;
    const accent = c.dark ? SKY_LT : SKY_DK;

    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: bg }, line: { color: c.dark ? NAVY_DK : SKY_LT, width: 0.5 },
    });

    // No. and depth row
    s.addText(c.no, {
      x: x + 0.3, y: cardY + 0.3, w: 2, h: 0.3,
      fontFace: SANS, fontSize: 11, color: accent, charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(c.depth, {
      x: x + cardW - 2.3, y: cardY + 0.3, w: 2, h: 0.3,
      fontFace: MONO, fontSize: 11, color: accent, charSpacing: 2, align: "right", valign: "middle", margin: 0,
    });

    // Image
    s.addImage({
      path: IMG(c.img),
      x: x + 0.3, y: cardY + 0.75, w: cardW - 0.6, h: 1.9,
      sizing: { type: "cover", w: cardW - 0.6, h: 1.9 },
    });

    // Plate / code
    s.addText("PLATE " + c.plate.split(" ")[1], {
      x: x + 0.3, y: cardY + 2.75, w: 2, h: 0.28,
      fontFace: SANS, fontSize: 9, color: muted, charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(c.code, {
      x: x + cardW - 3.3, y: cardY + 2.75, w: 3.0, h: 0.28,
      fontFace: SANS, fontSize: 9, color: muted, charSpacing: 4, align: "right", valign: "middle", margin: 0,
    });

    // Title
    s.addText(c.title, {
      x: x + 0.3, y: cardY + 3.1, w: cardW - 0.6, h: 0.8,
      fontFace: SERIF, fontSize: 40, italic: true, color: accent, valign: "middle", margin: 0,
    });
    // Subtitle
    s.addText(c.sub, {
      x: x + 0.3, y: cardY + 3.95, w: cardW - 0.6, h: 0.3,
      fontFace: SANS, fontSize: 11, color: txt, charSpacing: 5, valign: "middle", margin: 0,
    });

    // Body
    s.addText(c.body, {
      x: x + 0.3, y: cardY + 4.4, w: cardW - 0.6, h: 1.4,
      fontFace: SERIF, fontSize: 13, color: txt, valign: "top", margin: 0,
      paraSpaceAfter: 2,
    });

    // Divider above price
    s.addShape(pres.shapes.LINE, {
      x: x + 0.3, y: cardY + cardH - 1.0, w: cardW - 0.6, h: 0,
      line: { color: muted, width: 0.4, transparency: 50 },
    });

    // Days / price
    s.addText(c.days, {
      x: x + 0.3, y: cardY + cardH - 0.75, w: 2, h: 0.35,
      fontFace: SANS, fontSize: 11, color: muted, charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(c.price, {
      x: x + cardW - 3.0, y: cardY + cardH - 0.8, w: 2.7, h: 0.5,
      fontFace: SERIF, fontSize: 24, color: txt, align: "right", valign: "middle", margin: 0,
    });
  });

  addFooter(s, "IV  ·  PROGRAMS", "05 / 08");
}

// ============================================================
// SLIDE 6 — Instruction / ratio
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  // Left half is the underwater photo
  s.addImage({
    path: IMG("image-6-1.jpeg"),
    x: 0, y: 0, w: W * 0.5, h: H,
    sizing: { type: "cover", w: W * 0.5, h: H },
  });
  // Slight dark overlay on photo
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W * 0.5, h: H,
    fill: { color: NAVY, transparency: 55 }, line: { type: "none" },
  });

  addHeader(s, "V  ·  INSTRUCTION", true);

  // Giant "3"
  s.addText("3", {
    x: 0.9, y: 2.1, w: 4, h: 3,
    fontFace: SERIF, fontSize: 260, color: SKY_LT, valign: "top", margin: 0,
  });

  // Instructors label block
  s.addText([
    { text: "instructors.\n", options: { color: WHITE,  italic: true } },
    { text: "Six students.\n", options: { color: WHITE,  italic: true } },
    { text: "Always.",        options: { color: SKY_LT, italic: true } },
  ], {
    x: 1.1, y: 5.4, w: 7, h: 2.4,
    fontFace: SERIF, fontSize: 36, valign: "top", margin: 0,
    paraSpaceAfter: 2,
  });

  // Ratio caption
  s.addText("RATIO  ·  1 : 2  ·  NEVER EXCEEDED", {
    x: 1.1, y: 7.9, w: 7, h: 0.3,
    fontFace: SANS, fontSize: 11, color: MUTED_ICE, charSpacing: 5, valign: "middle", margin: 0,
  });

  // Right panel header / labels
  s.addText("OUR RATIO  ·  OUR LEDGER", {
    x: 10.8, y: 1.9, w: 8, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SKY_LT, charSpacing: 6, valign: "middle", margin: 0,
  });

  // Right-panel headline
  s.addText([
    { text: "Taught by the ", options: { color: WHITE, italic: false } },
    { text: "people",         options: { color: SKY_LT, italic: true } },
    { text: " who\ndive there ", options: { color: WHITE, italic: false } },
    { text: "every day.",     options: { color: SKY_LT, italic: true } },
  ], {
    x: 10.8, y: 2.4, w: 8.5, h: 2.0,
    fontFace: SERIF, fontSize: 44, valign: "top", margin: 0,
  });

  // Stamp V
  addStamp(s, 17.6, 1.7, 1.3, "V", SKY_LT);

  // Table header rule + columns
  const tblX = 10.8, tblW = 8.2;
  s.addShape(pres.shapes.LINE, {
    x: tblX, y: 5.1, w: tblW, h: 0,
    line: { color: SKY_LT, width: 0.4, transparency: 40 },
  });

  const colHeaders = [
    { text: "INSTRUCTOR",  x: tblX,        w: 3.3, align: "left"  },
    { text: "CREDENTIAL",  x: tblX + 3.4,  w: 2.3, align: "left"  },
    { text: "LOGGED",      x: tblX + 5.5,  w: 1.4, align: "right" },
    { text: "TENURE",      x: tblX + 7.0,  w: 1.2, align: "right" },
  ];
  colHeaders.forEach((c) => {
    s.addText(c.text, {
      x: c.x, y: 5.2, w: c.w, h: 0.3,
      fontFace: SANS, fontSize: 10, color: MUTED_ICE, charSpacing: 4,
      align: c.align, valign: "middle", margin: 0,
    });
  });

  // Header underline
  s.addShape(pres.shapes.LINE, {
    x: tblX, y: 5.55, w: tblW, h: 0,
    line: { color: SKY_LT, width: 0.4, transparency: 40 },
  });

  const rows = [
    { no: "0 1", name: "Inês Carvalho",    cred: "Founder, IANTD Instructor Trainer", logged: "4,820", tenure: "22 yrs" },
    { no: "0 2", name: "Tomás Medeiros",   cred: "Head Guide, Trimix",                 logged: "3,110", tenure: "14 yrs" },
    { no: "0 3", name: "Dr. Helena Sousa", cred: "Hyperbaric Physician",               logged: "1,640", tenure: "11 yrs" },
  ];
  const rowH6 = 1.15;
  rows.forEach((r, i) => {
    const y = 5.75 + i * rowH6;
    // row number
    s.addText(r.no, {
      x: tblX, y: y + 0.1, w: 0.45, h: 0.35,
      fontFace: SANS, fontSize: 10, color: MUTED_ICE, charSpacing: 3, valign: "middle", margin: 0,
    });
    // name
    s.addText(r.name, {
      x: tblX + 0.5, y: y, w: 2.9, h: 0.55,
      fontFace: SERIF, fontSize: 22, color: WHITE, valign: "middle", margin: 0,
    });
    // credential
    s.addText(r.cred, {
      x: tblX + 3.4, y: y, w: 2.3, h: 0.55,
      fontFace: SANS, fontSize: 11, color: MUTED_ICE, valign: "middle", margin: 0,
    });
    // logged dives
    s.addText([
      { text: r.logged,  options: { color: SKY_LT } },
      { text: "  DIVES", options: { color: MUTED_ICE, charSpacing: 2 } },
    ], {
      x: tblX + 5.5, y: y, w: 1.4, h: 0.55,
      fontFace: SANS, fontSize: 12, align: "right", valign: "middle", margin: 0,
    });
    // tenure
    s.addText(r.tenure, {
      x: tblX + 7.0, y: y, w: 1.2, h: 0.55,
      fontFace: SANS, fontSize: 12, color: SKY_LT, align: "right", valign: "middle", margin: 0,
    });
    // row divider
    s.addShape(pres.shapes.LINE, {
      x: tblX, y: y + rowH6 - 0.15, w: tblW, h: 0,
      line: { color: SKY_LT, width: 0.3, transparency: 60 },
    });
  });

  addFooter(s, "V  ·  INSTRUCTION", "06 / 08", true);
}

// ============================================================
// SLIDE 7 — Season & Rates (chart + rate table)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: ICE };
  addHeader(s, "VI  ·  SEASON & RATES");

  // Outer frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.45, w: W - 0.9, h: H - 0.9,
    fill: { type: "solid", color: ICE, transparency: 100 },
    line: { color: SKY_LT, width: 0.5 },
  });

  // Left column: chart heading
  s.addText("§ 06  ·  THE DIVING CALENDAR", {
    x: 1.1, y: 1.5, w: 7, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SKY_DK, charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText([
    { text: "The season ", options: { color: INK, italic: false } },
    { text: "breathes.",   options: { color: SKY_LT, italic: true } },
  ], {
    x: 1.0, y: 1.85, w: 10, h: 1.4,
    fontFace: SERIF, fontSize: 64, valign: "middle", margin: 0,
  });

  // Small photo top right
  s.addImage({
    path: IMG("image-7-6.jpeg"),
    x: 16.4, y: 1.45, w: 2.4, h: 1.6,
    sizing: { type: "cover", w: 2.4, h: 1.6 },
  });
  s.addText("PLATE VI", {
    x: 16.4, y: 3.1, w: 1.2, h: 0.25,
    fontFace: SANS, fontSize: 9, color: SKY_DK, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("SEPT  ·  PEAK", {
    x: 17.4, y: 3.1, w: 1.4, h: 0.25,
    fontFace: SANS, fontSize: 9, color: SKY_DK, charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });

  // Chart intro text
  s.addText(
    "Mobula rays arrive in July. Blue sharks pass through in September. The water is always cold enough for a 5 mm, always warm enough to stay.", {
      x: 1.1, y: 4.0, w: 8, h: 0.9,
      fontFace: SERIF, fontSize: 14, color: INK_SOFT, valign: "top", margin: 0,
    }
  );

  // --- Bar chart (monthly temperature) ---
  const months   = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const temps    = [16, 16, 17, 18, 19, 21, 23, 24, 23, 22, 20, 18];
  // Per-month colors: cold Jan–Mar light, Apr–Jun mid, Jul–Sep dark, Oct–Dec mid→light
  const colorMap = [BAR_XLT, BAR_XLT, BAR_XLT, BAR_LT, BAR_LT, BAR_MD, BAR_DK, BAR_DK, BAR_DK, BAR_MD, BAR_LT, BAR_XLT];

  s.addChart(pres.charts.BAR, [
    { name: "Temperature", labels: months, values: temps },
  ], {
    x: 1.1, y: 5.0, w: 9.0, h: 4.3,
    barDir: "col",
    barGrouping: "clustered",
    chartColors: colorMap,
    chartColorsOpacity: 100,
    chartArea: { fill: { color: ICE } },
    plotArea: { fill: { color: ICE } },
    showLegend: false,
    catAxisLabelFontFace: SANS,
    catAxisLabelFontSize: 9,
    catAxisLabelColor: SKY_DK,
    catAxisLabelCharSpacing: 4,
    valAxisLabelFontFace: SANS,
    valAxisLabelFontSize: 9,
    valAxisLabelColor: SKY_DK,
    valAxisMinVal: 14,
    valAxisMaxVal: 26,
    valAxisMajorUnit: 4,
    valGridLine: { style: "none" },
    catGridLine: { style: "none" },
    valAxisLineColor: ICE,
    catAxisLineColor: SKY_LT,
    showValue: true,
    dataLabelFormatCode: "0°",
    dataLabelFontFace: SANS,
    dataLabelFontSize: 9,
    dataLabelColor: SKY_DK,
    dataLabelPosition: "outEnd",
    barGapWidthPct: 40,
  });

  // Season bands under chart
  const bands = [
    { x: 1.1,  label1: "JAN–APR", label2: "COLD  ·  QUIET"     },
    { x: 3.3,  label1: "MAY–JUN", label2: "AWAKENING"          },
    { x: 5.5,  label1: "JUL–SEP", label2: "PEAK  ·  MOBULA"    },
    { x: 7.7,  label1: "OCT–DEC", label2: "PELAGIC RETURNS"    },
  ];
  bands.forEach((b) => {
    s.addShape(pres.shapes.LINE, {
      x: b.x, y: 9.4, w: 2.0, h: 0,
      line: { color: SKY, width: 0.5 },
    });
    s.addText(b.label1, {
      x: b.x, y: 9.5, w: 2.0, h: 0.3,
      fontFace: SANS, fontSize: 10, color: SKY_DK, charSpacing: 4, valign: "middle", margin: 0,
    });
    s.addText(b.label2, {
      x: b.x, y: 9.8, w: 2.0, h: 0.3,
      fontFace: SANS, fontSize: 9, color: MUTED, charSpacing: 4, valign: "middle", margin: 0,
    });
  });

  // --- Rates panel (right) ---
  const rX = 11.0;
  s.addText("§ 06.2  ·  RATES PER DIVER", {
    x: rX, y: 4.0, w: 8, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SKY_DK, charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addText("The ledger.", {
    x: rX, y: 4.35, w: 8, h: 0.9,
    fontFace: SERIF, italic: true, fontSize: 40, color: INK, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: rX, y: 5.3, w: 7.8, h: 0,
    line: { color: SKY, width: 0.5 },
  });

  const rates = [
    ["Single guided dive",  "€ 110"],
    ["Ten-dive package",    "€ 940"],
    ["Nitrox fill",         "€ 18"],
    ["Private boat / day",  "€ 1,200"],
    ["Photography pkg.",    "€ 220"],
    ["Liveaboard (3 nt.)",  "€ 2,980"],
  ];
  const rateRowH = 0.55;
  rates.forEach((r, i) => {
    const y = 5.5 + i * rateRowH;
    s.addText("◆", {
      x: rX, y: y, w: 0.3, h: 0.4,
      fontFace: SANS, fontSize: 10, color: SKY, valign: "middle", margin: 0,
    });
    s.addText(r[0], {
      x: rX + 0.35, y: y, w: 5.2, h: 0.4,
      fontFace: SERIF, fontSize: 14, color: INK_SOFT, valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: rX + 5.5, y: y, w: 2.3, h: 0.4,
      fontFace: SERIF, fontSize: 14, color: SKY_DK, align: "right", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: rX, y: y + rateRowH - 0.05, w: 7.8, h: 0,
      line: { color: SKY_LT, width: 0.3, transparency: 60 },
    });
  });

  s.addText("All prices inclusive of tanks, weights, and Azorean VAT. Packages honoured throughout the calendar year.", {
    x: rX, y: 8.95, w: 7.8, h: 0.6,
    fontFace: SERIF, italic: true, fontSize: 11, color: MUTED, valign: "top", margin: 0,
  });

  // Small certified stamp
  addStamp(s, rX + 0.3, 9.55, 0.85, "€", SKY_DK);
  s.addText("CERTIFIED  ·  VALID", {
    x: rX + 1.3, y: 9.65, w: 4, h: 0.3,
    fontFace: SANS, fontSize: 9, color: SKY_DK, charSpacing: 4, valign: "middle", margin: 0,
  });
  s.addText("JAN — DEC MMXXVI", {
    x: rX + 1.3, y: 9.95, w: 4, h: 0.3,
    fontFace: SANS, fontSize: 9, color: SKY_DK, charSpacing: 4, valign: "middle", margin: 0,
  });

  addFooter(s, "VI  ·  SEASON", "07 / 08");
}

// ============================================================
// SLIDE 8 — Contact / close
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  // Full-bleed background photo
  s.addImage({
    path: IMG("image-8-1.jpeg"),
    x: 0, y: 0, w: W, h: H,
    sizing: { type: "cover", w: W, h: H },
  });
  // Slight dark overlay for text
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: H,
    fill: { color: NAVY, transparency: 55 }, line: { type: "none" },
  });

  addHeader(s, "VII  ·  TO DIVE", true);

  // Stamp AZ top right
  addStamp(s, 17.6, 1.5, 1.3, "AZ", WHITE);

  // Eyebrow with flanking rule
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 2.45, w: 1.3, h: 0,
    line: { color: WHITE, width: 0.4, transparency: 30 },
  });
  s.addText("◆", {
    x: 2.45, y: 2.3, w: 0.3, h: 0.3,
    fontFace: SANS, fontSize: 12, color: WHITE, align: "center", valign: "middle", margin: 0,
  });
  s.addText("TAKE THE FIRST BREATH", {
    x: 2.8, y: 2.3, w: 6, h: 0.3,
    fontFace: SANS, fontSize: 13, color: WHITE, charSpacing: 6, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.2, y: 2.45, w: 2.0, h: 0,
    line: { color: WHITE, width: 0.4, transparency: 30 },
  });

  // Massive serif headline
  s.addText([
    { text: "Meet us ", options: { color: WHITE,  italic: false } },
    { text: "at the\nwater.", options: { color: SKY_LT, italic: true } },
  ], {
    x: 1.0, y: 3.0, w: W - 2, h: 4.5,
    fontFace: SERIF, fontSize: 150, align: "center", valign: "middle", margin: 0,
  });

  // Bottom contact rail
  s.addShape(pres.shapes.LINE, {
    x: 1.1, y: 8.9, w: W - 2.2, h: 0,
    line: { color: WHITE, width: 0.4, transparency: 40 },
  });

  const contacts = [
    { label: "BOOK",  value: "abyssal.pt / reserve",       accent: SKY_LT },
    { label: "VISIT", value: "Rua do Cais 4, Ponta Delgada", accent: WHITE },
    { label: "WRITE", value: "dive@abyssal.pt",            accent: WHITE },
    { label: "CALL",  value: "+351 296 044 220",           accent: WHITE },
  ];
  const colW = (W - 2.2) / 4;
  contacts.forEach((c, i) => {
    const cx = 1.1 + i * colW;
    s.addText([
      { text: "◆  ", options: { color: SKY_LT } },
      { text: c.label, options: { color: WHITE, charSpacing: 4 } },
    ], {
      x: cx, y: 9.1, w: colW - 0.3, h: 0.35,
      fontFace: SANS, fontSize: 11, valign: "middle", margin: 0,
    });
    s.addText(c.value, {
      x: cx, y: 9.5, w: colW - 0.3, h: 0.45,
      fontFace: SERIF, fontSize: 17, color: c.accent, italic: i === 0 ? false : false, valign: "middle", margin: 0,
    });
  });

  addFooter(s, "FIN.", "08 / 08", true);
}

// ------------------------------------------------------------
const outPath = path.join(__dirname, "..", "scuba.pptx");
pres.writeFile({ fileName: outPath }).then((f) => {
  console.log("Wrote:", f);
});
