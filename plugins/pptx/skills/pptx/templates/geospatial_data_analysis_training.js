// Geospatial Data Analysis — minimal rebuild (11 slides)
const pptxgen = require("pptxgenjs");
const PA_DATA = require("./pa_export.json");
const US_PROJ = require("./us_projections.json");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title = "Geospatial Data Analysis";
pres.author = "Data Science Team";

// ─────────────────────────────────────────────
// PALETTE — slate + blue
// ─────────────────────────────────────────────
const C = {
  white:      "FFFFFF",
  ink:        "0F172A",
  inkSoft:    "1E293B",
  muted:      "64748B",
  rule:       "E2E8F0",
  mist:       "F1F5F9",
  brand:      "2563EB",
  brandLite:  "93C5FD",
  brandPale:  "DBEAFE",
  warn:       "F59E0B",
  warnPale:   "FEF3C7",
  bad:        "DC2626",
  good:       "059669",
};

// ── Typography ──
// Poppins is a geometric sans-serif from Google Fonts — circular
// counters, uniform stroke width, confident display proportions.
// Much more refined than Calibri at large display sizes.
//
// Font embedding on deployment: if the target machine doesn't have
// Poppins installed, PowerPoint will fall back to the closest
// available geometric sans. Common fallbacks: Century Gothic (Office
// bundle), Futura (macOS), Avenir (macOS), then Calibri.
const FONT_H = "Poppins";
const FONT_B = "Poppins";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  return s;
}

function addTitle(s, title, opts) {
  const w = (opts && opts.w) || 12;
  const fontSize = (opts && opts.fontSize) || 38;   // bigger title
  const ruleW = (opts && opts.ruleW) || 6.50;        // shorter rule (doesn't run over content)
  s.addText(title, {
    x: 0.75, y: 0.45, w: w, h: 1.0,
    fontFace: FONT_H, fontSize: fontSize, color: C.ink, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: 1.45, w: ruleW, h: 0,
    line: { color: C.rule, width: 0.75 },
  });
}

// Compact takeaway-title helper used on slides 2–15.
// Reserves a ~1.15" band at the top of every slide. Content on each
// slide is expected to start at y ≥ 1.25 to clear the rule.
function slideTitle(s, text) {
  s.addText(text, {
    x: 0.60, y: 0.32, w: 12.10, h: 0.78,
    fontFace: FONT_H, fontSize: 28, color: C.ink, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 0.60, y: 1.15, w: 12.10, h: 0,
    line: { color: C.brand, width: 1.5 },
  });
}

// ═════════════════════════════════════════════
// SLIDE 1 — TITLE
// Editorial split layout: three stacked words on the left
// (GEOSPATIAL / DATA / ANALYSIS, all-caps, left-aligned), with the
// 3D continental US (with city pins) as the hero visual on the right.
// All-caps + tight tracking gives each word a monolithic rectangular
// footprint, which packs more cleanly in a constrained left column
// and leaves plenty of room for the map hero on the right.
// ═════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  // Three words stacked vertically, left-aligned, ALL CAPS
  const WORDS = ["GEOSPATIAL", "DATA", "ANALYSIS"];
  const TITLE_SIZE = 64;
  const LINE_H     = 1.05;            // height of each text box
  const TOTAL_H    = WORDS.length * LINE_H;
  const Y_START    = (7.50 - TOTAL_H) / 2;    // vertically centered

  WORDS.forEach((word, i) => {
    s.addText(word, {
      x: 0.75, y: Y_START + i * LINE_H, w: 6.30, h: LINE_H,
      fontFace: FONT_H, fontSize: TITLE_SIZE, color: C.ink, bold: true,
      align: "left", valign: "middle", margin: 0,
      charSpacing: 2,
    });
  });

  // Hero visual: 3D continental US with city pins (8 major US cities)
  // Image is ~1328×937, aspect ≈ 1.417 (landscape with headroom for pins)
  const HERO_ASPECT = 1.417;
  const HERO_W      = 5.80;
  const HERO_H      = HERO_W / HERO_ASPECT;    // ≈ 4.09
  const HERO_X      = 13.30 - HERO_W - 0.60;   // right margin 0.60
  const HERO_Y      = (7.50 - HERO_H) / 2;     // vertically centered

  s.addImage({
    path: "/home/assets/us_3d_pins.png",
    x: HERO_X, y: HERO_Y, w: HERO_W, h: HERO_H,
  });
}

// ═════════════════════════════════════════════
// SLIDE 2 — VECTOR vs RASTER
// Subtitle sits just above the two columns, everything packed
// tighter so there's no white gap at the top. Content block is
// roughly vertically centered on the slide.
// ═════════════════════════════════════════════
{
  const s = newSlide();

  slideTitle(s, "Vector stores shapes. Raster stores pixels.");

  // Divider — shifted and lengthened to match the new content block
  s.addShape(pres.shapes.LINE, {
    x: 6.65, y: 1.80, w: 0, h: 5.10,
    line: { color: C.rule, width: 0.75 },
  });

  // ── VECTOR ──
  s.addText("VECTOR", {
    x: 0.75, y: 1.80, w: 5.5, h: 0.35,
    fontFace: FONT_B, fontSize: 12, color: C.brand, bold: true, charSpacing: 5, margin: 0,
  });
  s.addText("Points, lines, polygons", {
    x: 0.75, y: 2.12, w: 5.5, h: 0.5,
    fontFace: FONT_H, fontSize: 22, color: C.ink, bold: true, margin: 0,
  });
  s.addText([
    { text: "Geometric primitives stored as ",                    options: { color: C.inkSoft } },
    { text: "coordinates",                                          options: { color: C.ink, bold: true } },
    { text: ". Zoom in and the edges stay sharp. Use for ",         options: { color: C.inkSoft } },
    { text: "boundaries, points, and networks",                     options: { color: C.ink, bold: true } },
    { text: ".",                                                    options: { color: C.inkSoft } },
  ], {
    x: 0.75, y: 2.72, w: 5.6, h: 1.30,
    fontFace: FONT_B, fontSize: 16, margin: 0,
  });
  s.addImage({ path: "/home/assets/vector_demo.png", x: 0.75, y: 4.25, w: 2.7, h: 2.15 });
  s.addText("FORMATS", {
    x: 3.7, y: 4.35, w: 2.7, h: 0.3,
    fontFace: FONT_B, fontSize: 10, color: C.muted, bold: true, charSpacing: 3, margin: 0,
  });
  // Two-column "invisible table" — names left-aligned, extensions
  // left-aligned at a fixed x offset so they line up vertically
  const VEC_NAME_X = 3.70;
  const VEC_EXT_X  = 5.40;
  [
    ["Shapefile",    ".shp"],
    ["GeoJSON",      ".geojson"],
    ["GeoPackage",   ".gpkg"],
    ["Parquet (geo)", ".parquet"],
  ].forEach(([name, ext], i) => {
    const y = 4.70 + i * 0.36;
    s.addText(name, {
      x: VEC_NAME_X, y: y, w: 1.65, h: 0.32,
      fontFace: "Consolas", fontSize: 13, color: C.ink, margin: 0,
    });
    s.addText(ext, {
      x: VEC_EXT_X, y: y, w: 1.50, h: 0.32,
      fontFace: "Consolas", fontSize: 13, color: C.muted, margin: 0,
    });
  });

  // ── RASTER ──
  s.addText("RASTER", {
    x: 6.95, y: 1.80, w: 5.5, h: 0.35,
    fontFace: FONT_B, fontSize: 12, color: C.warn, bold: true, charSpacing: 5, margin: 0,
  });
  s.addText("Pixel grids", {
    x: 6.95, y: 2.12, w: 5.5, h: 0.5,
    fontFace: FONT_H, fontSize: 22, color: C.ink, bold: true, margin: 0,
  });
  s.addText([
    { text: "A ",                                                    options: { color: C.inkSoft } },
    { text: "regular grid of cells",                                  options: { color: C.ink, bold: true } },
    { text: ", each holding one value. Use for ",                     options: { color: C.inkSoft } },
    { text: "continuous fields",                                      options: { color: C.ink, bold: true } },
    { text: " like elevation, temperature, satellite imagery, and land cover.", options: { color: C.inkSoft } },
  ], {
    x: 6.95, y: 2.72, w: 5.7, h: 1.30,
    fontFace: FONT_B, fontSize: 16, margin: 0,
  });
  s.addImage({ path: "/home/assets/raster_demo.png", x: 6.95, y: 4.25, w: 2.7, h: 2.15 });
  s.addText("FORMATS", {
    x: 9.85, y: 4.35, w: 2.7, h: 0.3,
    fontFace: FONT_B, fontSize: 10, color: C.muted, bold: true, charSpacing: 3, margin: 0,
  });
  const RAS_NAME_X = 9.85;
  const RAS_EXT_X  = 11.30;
  [
    ["GeoTIFF",    ".tif"],
    ["NetCDF",     ".nc"],
    ["HDF5",       ".h5"],
    ["PNG / JPEG", ".png"],
  ].forEach(([name, ext], i) => {
    const y = 4.70 + i * 0.36;
    s.addText(name, {
      x: RAS_NAME_X, y: y, w: 1.40, h: 0.32,
      fontFace: "Consolas", fontSize: 13, color: C.ink, margin: 0,
    });
    s.addText(ext, {
      x: RAS_EXT_X, y: y, w: 1.50, h: 0.32,
      fontFace: "Consolas", fontSize: 13, color: C.muted, margin: 0,
    });
  });
}

// ═════════════════════════════════════════════
// SLIDES — PRIMITIVES PRIMER (Point → LineString → Polygon)
// Three constructive teaching slides:
//   4: a lone point at the center of the right half
//   5: same point moves down-right, a second point appears diagonal,
//      they connect into a LineString
//   6: both existing points drift slightly up, three new points fade in,
//      forming a distorted pentagon centered around (9.975, 3.75)
// Morph transitions carry pt_1/pt_2 across slides by objectName.
// Apple-clean: huge whitespace, 88pt typography, minimal chrome.
// ═════════════════════════════════════════════

// ── Vertex coordinates (slide inches) ──
// All vertices are centered around y = 4.335 — the midpoint of the
// content region [1.17, 7.50] below the title band — so each shape
// has equal white space above and below.
//
// Slide 4: pt_1 at the right-half center.
const PT1_S4 = { x:  9.975, y: 4.335 };

// Slide 5: pt_1 moves down-right, pt_2 appears diagonally upper-left.
const PT1_S5 = { x: 12.325, y: 5.835 };
const PT2_S5 = { x:  8.325, y: 2.835 };

// Slide 6: both existing points shift ~0.40" up, three new vertices fade in.
// The polygon is centered so that its bbox center is at (9.975, 4.335).
const PT1_S6 = { x: 12.325, y: 5.185 };   // right
const PT2_S6 = { x:  8.325, y: 2.185 };   // upper-left
const PT3_S6 = { x:  7.625, y: 4.485 };   // left        (new)
const PT5_S6 = { x:  9.925, y: 6.485 };   // bottom      (new)
const PT6_S6 = { x: 11.825, y: 2.585 };   // upper-right (new)

// Polygon bbox — matches primer_poly_fill.png exactly
const POLY_FILL_BBOX = { x: 7.625, y: 2.185, w: 4.70, h: 4.30 };

const PRIMER_DOT_D = 0.42;
const PRIMER_DOT_R = PRIMER_DOT_D / 2;

function primerAddDot(s, pt, name) {
  s.addShape(pres.shapes.OVAL, {
    x: pt.x - PRIMER_DOT_R, y: pt.y - PRIMER_DOT_R,
    w: PRIMER_DOT_D, h: PRIMER_DOT_D,
    fill: { color: C.brand },
    line: { color: C.white, width: 1.5 },
    objectName: name,
  });
}

function primerAddEdge(s, p1, p2, name) {
  const x = Math.min(p1.x, p2.x);
  const y = Math.min(p1.y, p2.y);
  const w = Math.abs(p2.x - p1.x);
  const h = Math.abs(p2.y - p1.y);
  const flipV = (p1.x < p2.x) !== (p1.y < p2.y);
  s.addShape(pres.shapes.LINE, {
    x: x, y: y, w: w, h: h,
    line: { color: C.brand, width: 4.5 },
    flipV: flipV,
    objectName: name,
  });
}

function primerAddWord(s, text) {
  s.addText(text, {
    x: 0.40, y: 1.17, w: 5.90, h: 6.33,
    fontFace: FONT_H, fontSize: 64, color: C.ink, bold: true, margin: 0,
    align: "center", valign: "middle",
  });
}

// ── Slide 4 — Point ──
{
  const s = newSlide();
  slideTitle(s, "Every geometry starts with a single point.");
  primerAddWord(s, "Point");
  primerAddDot(s, PT1_S4, "pt_1");
}

// ── Slide 5 — LineString ──
{
  const s = newSlide();
  slideTitle(s, "Two points and an edge make a line.");
  primerAddWord(s, "LineString");
  primerAddEdge(s, PT1_S5, PT2_S5, "edge_12");
  primerAddDot(s, PT1_S5, "pt_1");
  primerAddDot(s, PT2_S5, "pt_2");
}

// ── Slide 6 — Polygon (distorted pentagon) ──
{
  const s = newSlide();
  slideTitle(s, "Close the ring and you get a polygon.");
  primerAddWord(s, "Polygon");

  // Fill image — behind all the edges and dots
  s.addImage({
    path: "/home/assets/primer_poly_fill.png",
    x: POLY_FILL_BBOX.x, y: POLY_FILL_BBOX.y,
    w: POLY_FILL_BBOX.w, h: POLY_FILL_BBOX.h,
    objectName: "poly_fill",
  });

  // Edges in clockwise order around the pentagon
  primerAddEdge(s, PT2_S6, PT6_S6, "edge_26");
  primerAddEdge(s, PT6_S6, PT1_S6, "edge_61");
  primerAddEdge(s, PT1_S6, PT5_S6, "edge_15");
  primerAddEdge(s, PT5_S6, PT3_S6, "edge_53");
  primerAddEdge(s, PT3_S6, PT2_S6, "edge_32");

  // Dots on top
  primerAddDot(s, PT1_S6, "pt_1");
  primerAddDot(s, PT2_S6, "pt_2");
  primerAddDot(s, PT3_S6, "pt_3");
  primerAddDot(s, PT5_S6, "pt_5");
  primerAddDot(s, PT6_S6, "pt_6");
}


// ═════════════════════════════════════════════
// SLIDES 4a / 4b / 4c — GEOMETRIES IN THE WILD (real Manhattan, progressive)
// 4a: polygons only
// 4b: polygons + lines (street network)
// 4c: polygons + lines + points (labeled landmarks)
// All three slides use identical layout so the morph/fade transition
// between them looks like layers progressively appearing.
// ═════════════════════════════════════════════
const MANHATTAN_FRAMES = [
  { file: "/home/assets/manhattan_polys.png",       title: "In the wild, neighborhoods are polygons." },
  { file: "/home/assets/manhattan_polys_lines.png", title: "Streets layer on top as LineStrings." },
  { file: "/home/assets/manhattan_full.png",        title: "Each landmark is a single Point." },
];

MANHATTAN_FRAMES.forEach((frame) => {
  const s = newSlide();
  slideTitle(s, frame.title);

  // Map shrunk from 7.20 → 6.00 tall to clear the title band at y≈1.15.
  // Image aspect ≈ 1.410. Centered horizontally, pushed below the rule.
  const mapH = 6.00;
  const mapW = mapH * 1.410;                // ≈ 8.46
  const mapX = (13.30 - mapW) / 2;          // ≈ 2.42
  const mapY = 1.30;                         // below the rule at 1.15
  s.addImage({ path: frame.file, x: mapX, y: mapY, w: mapW, h: mapH });
});

// ═════════════════════════════════════════════
// SLIDES — THE SPATIAL JOIN (before / after, with morph + flash)
// Two slides with identical titles and identical PA backdrop.
// Dots are pptxgenjs OVAL shapes overlaid on the polygon image.
// Each dot has a stable objectName so PowerPoint Morph matches them
// across slides — surviving dots stay in place, others fade out.
// ═════════════════════════════════════════════

// PA backdrop layout (shared by both slides) — shrunk from 9.60→8.80
// so the top and bottom gaps from the title rule grow to ~0.62" each.
const PA_EMBED_W = 8.80;
const PA_IMG_ASPECT = PA_DATA.image_w_in / PA_DATA.image_h_in;
const PA_EMBED_H = PA_EMBED_W / PA_IMG_ASPECT;           // ≈ 5.10
const PA_EMBED_X = (13.30 - PA_EMBED_W) / 2;             // ≈ 2.25
const PA_EMBED_Y = 1.17 + (7.50 - 1.17 - PA_EMBED_H) / 2; // centered in [1.17, 7.50]

function paLonToX(lon) {
  const frac = (lon - PA_DATA.lon_min) / (PA_DATA.lon_max - PA_DATA.lon_min);
  return PA_EMBED_X + frac * PA_EMBED_W;
}
function paLatToY(lat) {
  const frac = (lat - PA_DATA.lat_min) / (PA_DATA.lat_max - PA_DATA.lat_min);
  return PA_EMBED_Y + (1 - frac) * PA_EMBED_H;
}

const DOT_R = 0.08; // dot half-size in inches

// ── Slide: Spatial Join (all dots, gray) ──
{
  const s = newSlide();
  slideTitle(s, "A spatial join asks: which points fall in which polygons?");

  s.addImage({
    path: "/home/assets/pa_polygon_only.png",
    x: PA_EMBED_X, y: PA_EMBED_Y, w: PA_EMBED_W, h: PA_EMBED_H,
  });

  // All dots — gray, same objectName as the matching dot on the next slide
  PA_DATA.dots.forEach((dot) => {
    s.addShape(pres.shapes.OVAL, {
      x: paLonToX(dot.lon) - DOT_R,
      y: paLatToY(dot.lat) - DOT_R,
      w: DOT_R * 2, h: DOT_R * 2,
      fill: { color: C.muted },
      line: { color: C.white, width: 0.5 },
      objectName: dot.id,
    });
  });
}

// ── Slide: Spatial Join (only target-county dots, brand color) ──
{
  const s = newSlide();
  slideTitle(s, "Keep only the points inside your target shapes.");

  s.addImage({
    path: "/home/assets/pa_polygon_only.png",
    x: PA_EMBED_X, y: PA_EMBED_Y, w: PA_EMBED_W, h: PA_EMBED_H,
  });

  // Only the surviving dots — brand color
  PA_DATA.dots.filter((d) => d.in_target).forEach((dot) => {
    s.addShape(pres.shapes.OVAL, {
      x: paLonToX(dot.lon) - DOT_R,
      y: paLatToY(dot.lat) - DOT_R,
      w: DOT_R * 2, h: DOT_R * 2,
      fill: { color: C.brand },
      line: { color: C.white, width: 0.5 },
      objectName: dot.id,
    });
  });
}

// ═════════════════════════════════════════════
// SLIDE — COORDINATE REFERENCE SYSTEMS (the concept)
// Simplified composition: bigger images, bigger distance numbers,
// single tagline underneath tying the two halves together.
// ═════════════════════════════════════════════
{
  const s = newSlide();

  slideTitle(s, "Distance has no meaning without a CRS.");

  // Two minimal column headers (shifted down under the title band)
  s.addText("ON THE GLOBE", {
    x: 0.75, y: 1.28, w: 5.90, h: 0.40,
    fontFace: FONT_B, fontSize: 13, color: C.brand, bold: true,
    charSpacing: 4, align: "center", margin: 0,
  });
  s.addText("ON THE MAP", {
    x: 6.65, y: 1.28, w: 5.90, h: 0.40,
    fontFace: FONT_B, fontSize: 13, color: C.brand, bold: true,
    charSpacing: 4, align: "center", margin: 0,
  });

  // The two visuals — sphere on the left, flat map on the right.
  // The flat map is sized to feel proportional to the 3.40"-wide sphere
  // (native image aspect 1075/751 ≈ 1.431, preserved exactly — no stretch).
  s.addImage({
    path: "/home/assets/curved_surface.png",
    x: 2.00, y: 1.75, w: 3.40, h: 3.40,
  });
  s.addImage({
    path: "/home/assets/flat_surface.png",
    x: 7.75, y: 2.12, w: 3.80, h: 2.655,
  });

  // Big distance numbers
  s.addText("5,800 km", {
    x: 0.75, y: 5.40, w: 5.90, h: 0.85,
    fontFace: FONT_H, fontSize: 50, color: C.ink, bold: true,
    align: "center", margin: 0,
  });
  s.addText("6,400 km", {
    x: 6.65, y: 5.40, w: 5.90, h: 0.85,
    fontFace: FONT_H, fontSize: 50, color: C.ink, bold: true,
    align: "center", margin: 0,
  });

  // Tiny labels under the numbers
  s.addText("great-circle distance", {
    x: 0.75, y: 6.25, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 13, color: C.muted, italic: true,
    align: "center", margin: 0,
  });
  s.addText("straight-line distance", {
    x: 6.65, y: 6.25, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 13, color: C.muted, italic: true,
    align: "center", margin: 0,
  });

  // Single tagline centered at the bottom
  s.addText("Same two points.  Different answer.", {
    x: 0.75, y: 6.78, w: 11.80, h: 0.42,
    fontFace: FONT_H, fontSize: 18, color: C.ink, bold: true,
    align: "center", margin: 0,
  });
}


// ═════════════════════════════════════════════
// SLIDE — CRS × SPATIAL JOIN (the consequence)
// Same PA spatial join, run twice. Left: right CRS, 7 matches.
// Right: wrong CRS, dots shift off their target counties, 0 matches.
// Drives home that CRS mismatches silently corrupt spatial operations.
// ═════════════════════════════════════════════
{
  const s = newSlide();

  slideTitle(s, "A mismatched CRS silently kills your join.");

  // Two column headers — pushed down to breathe below the title rule
  s.addText("RIGHT CRS", {
    x: 0.75, y: 1.55, w: 5.90, h: 0.50,
    fontFace: FONT_B, fontSize: 18, color: C.brand, bold: true,
    charSpacing: 4, align: "center", margin: 0,
  });
  s.addText("WRONG CRS", {
    x: 6.65, y: 1.55, w: 5.90, h: 0.50,
    fontFace: FONT_B, fontSize: 18, color: C.bad, bold: true,
    charSpacing: 4, align: "center", margin: 0,
  });

  // PA backdrop size for each small map
  const SMALL_W = 5.20;
  const SMALL_H = SMALL_W / PA_IMG_ASPECT;   // aspect 1.725 → ≈ 3.01
  const LEFT_X  = 1.10;
  const RIGHT_X = 7.00;
  const SMALL_Y = 2.15;
  const SMALL_DOT_R = 0.062;

  function smallLonToX(lon, mapX) {
    const frac = (lon - PA_DATA.lon_min) / (PA_DATA.lon_max - PA_DATA.lon_min);
    return mapX + frac * SMALL_W;
  }
  function smallLatToY(lat) {
    const frac = (lat - PA_DATA.lat_min) / (PA_DATA.lat_max - PA_DATA.lat_min);
    return SMALL_Y + (1 - frac) * SMALL_H;
  }

  // Left map — correct CRS, 7 brand-blue hits in the target counties
  s.addImage({
    path: "/home/assets/pa_polygon_only.png",
    x: LEFT_X, y: SMALL_Y, w: SMALL_W, h: SMALL_H,
  });
  PA_DATA.dots.filter(d => d.in_target).forEach(dot => {
    s.addShape(pres.shapes.OVAL, {
      x: smallLonToX(dot.lon, LEFT_X) - SMALL_DOT_R,
      y: smallLatToY(dot.lat) - SMALL_DOT_R,
      w: SMALL_DOT_R * 2, h: SMALL_DOT_R * 2,
      fill: { color: C.brand },
      line: { color: C.white, width: 0.5 },
    });
  });

  // Right map — wrong CRS, same 7 dots but shifted east and north,
  // so they miss the target counties entirely.
  s.addImage({
    path: "/home/assets/pa_polygon_only.png",
    x: RIGHT_X, y: SMALL_Y, w: SMALL_W, h: SMALL_H,
  });
  const WRONG_DLON = 0.55;
  const WRONG_DLAT = 0.25;
  PA_DATA.dots.filter(d => d.in_target).forEach(dot => {
    s.addShape(pres.shapes.OVAL, {
      x: smallLonToX(dot.lon + WRONG_DLON, RIGHT_X) - SMALL_DOT_R,
      y: smallLatToY(dot.lat + WRONG_DLAT) - SMALL_DOT_R,
      w: SMALL_DOT_R * 2, h: SMALL_DOT_R * 2,
      fill: { color: C.muted },
      line: { color: C.white, width: 0.5 },
    });
  });

  // Big match-count numbers
  s.addText("7 matches", {
    x: 0.75, y: 5.40, w: 5.90, h: 0.75,
    fontFace: FONT_H, fontSize: 44, color: C.ink, bold: true,
    align: "center", margin: 0,
  });
  s.addText("0 matches", {
    x: 6.65, y: 5.40, w: 5.90, h: 0.75,
    fontFace: FONT_H, fontSize: 44, color: C.ink, bold: true,
    align: "center", margin: 0,
  });

  // Technical CRS info under each big number — two lines:
  // first line: which CRS both layers were in,
  // second line: what it means in plain English.
  s.addText([
    { text: "points + counties → ",
      options: { color: C.muted } },
    { text: "EPSG:26918",
      options: { color: C.ink, fontFace: "Consolas", bold: true } },
  ], {
    x: 0.75, y: 6.25, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 13, align: "center", margin: 0,
  });
  s.addText("NAD83 / UTM zone 18N   ·   meters", {
    x: 0.75, y: 6.57, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 12, color: C.muted, italic: true,
    align: "center", margin: 0,
  });

  s.addText([
    { text: "points ",
      options: { color: C.muted } },
    { text: "EPSG:4326",
      options: { color: C.ink, fontFace: "Consolas", bold: true } },
    { text: "  ≠  counties ",
      options: { color: C.muted } },
    { text: "EPSG:26918",
      options: { color: C.ink, fontFace: "Consolas", bold: true } },
  ], {
    x: 6.65, y: 6.25, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 13, align: "center", margin: 0,
  });
  s.addText("WGS84 degrees  vs  UTM meters", {
    x: 6.65, y: 6.57, w: 5.90, h: 0.32,
    fontFace: FONT_B, fontSize: 12, color: C.muted, italic: true,
    align: "center", margin: 0,
  });
}


// ═════════════════════════════════════════════
// SLIDE — TWO PROJECTIONS IN THE SAME X/Y
// Mercator and Albers Equal Area, both centered at origin and plotted
// on a single shared set of axes. Mercator's coordinate extent balloons
// because 1 Mercator meter ≠ 1 ground meter at US latitudes.
// Pale blue fill = Mercator (sprawls further on all sides).
// Dark blue outline = Albers (the true shape, inside).
// ═════════════════════════════════════════════
const US_OVERLAY = require("./us_overlay.json");
{
  const s = newSlide();

  slideTitle(s, "Two projections, two shapes, one country.");

  // The overlay image — wide, centered, shrunk slightly to fit under title
  const IMG_ASPECT = US_OVERLAY.fig_aspect;       // ≈ 1.83
  const IMG_W = 8.90;
  const IMG_H = IMG_W / IMG_ASPECT;               // ≈ 4.86
  const IMG_X = (13.30 - IMG_W) / 2;              // ≈ 2.20
  const IMG_Y = 1.32;

  s.addImage({
    path: "/home/assets/us_projections_overlay.png",
    x: IMG_X, y: IMG_Y, w: IMG_W, h: IMG_H,
  });

  // ── Legend with color indicators and EPSG codes ──
  const LEGEND_Y = IMG_Y + IMG_H + 0.18;
  const SW = 0.24;

  // Left: Mercator (pale blue fill indicator)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.60, y: LEGEND_Y + 0.03, w: SW, h: SW,
    fill: { color: C.brandPale },
    line: { color: C.brandLite, width: 0.75 },
  });
  s.addText([
    { text: "MERCATOR", options: { bold: true, color: C.ink, charSpacing: 2 } },
    { text: "   ",      options: { color: C.muted } },
    { text: "EPSG:3857", options: { color: C.ink, fontFace: "Consolas", bold: true } },
  ], {
    x: 1.95, y: LEGEND_Y, w: 5.50, h: 0.34,
    fontFace: FONT_B, fontSize: 13, margin: 0,
  });

  // Right: Albers (dark blue outline indicator)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.40, y: LEGEND_Y + 0.03, w: SW, h: SW,
    fill: { color: C.white },
    line: { color: C.brand, width: 2.0 },
  });
  s.addText([
    { text: "ALBERS EQUAL AREA", options: { bold: true, color: C.ink, charSpacing: 2 } },
    { text: "   ",      options: { color: C.muted } },
    { text: "EPSG:5070", options: { color: C.ink, fontFace: "Consolas", bold: true } },
  ], {
    x: 7.75, y: LEGEND_Y, w: 5.50, h: 0.34,
    fontFace: FONT_B, fontSize: 13, margin: 0,
  });

  // Technical tagline under the legend
  s.addText([
    { text: ".to_crs(\"EPSG:3857\")", options: { fontFace: "Consolas", bold: true, color: C.ink } },
    { text: "  and  ", options: { color: C.muted } },
    { text: ".to_crs(\"EPSG:5070\")", options: { fontFace: "Consolas", bold: true, color: C.ink } },
    { text: "  on the same data  →  different ", options: { color: C.muted } },
    { text: "(x, y)", options: { fontFace: "Consolas", bold: true, color: C.ink } },
  ], {
    x: 0.75, y: LEGEND_Y + 0.48, w: 11.80, h: 0.38,
    fontFace: FONT_B, fontSize: 14,
    align: "center", margin: 0,
  });
}


// ═════════════════════════════════════════════
// SLIDE — THE TUTORIAL WORKFLOW (snake diagram)
// Six-step geopandas workflow in a 3×2 snake: READ → INSPECT →
// REPROJECT → FILTER → JOIN → PLOT.
// ═════════════════════════════════════════════
{
  const s = newSlide();

  slideTitle(s, "Every geopandas analysis follows the same six steps.");

  const STEPS = [
    { num: "1", name: "READ",      code: "gpd.read_file()" },
    { num: "2", name: "INSPECT",   code: ".head()   .crs" },
    { num: "3", name: "REPROJECT", code: ".to_crs()" },
    { num: "4", name: "FILTER",    code: "gdf[mask]" },
    { num: "5", name: "JOIN",      code: ".sjoin()" },
    { num: "6", name: "PLOT",      code: ".plot()   .explore()" },
  ];

  const BOX_W  = 3.40;
  const BOX_H  = 2.00;
  const H_GAP  = 1.05;
  const V_GAP  = 0.85;
  const MARG_X = (13.30 - 3 * BOX_W - 2 * H_GAP) / 2;
  // Center the 2-row grid vertically inside [1.30, 7.50]
  const GRID_TOP = 1.30;
  const GRID_BOT = 7.50;
  const Y1     = GRID_TOP + (GRID_BOT - GRID_TOP - 2 * BOX_H - V_GAP) / 2;
  const Y2     = Y1 + BOX_H + V_GAP;

  const COL_X = [MARG_X, MARG_X + BOX_W + H_GAP, MARG_X + 2*(BOX_W + H_GAP)];
  const BOX_POS = [
    { x: COL_X[0], y: Y1 },
    { x: COL_X[1], y: Y1 },
    { x: COL_X[2], y: Y1 },
    { x: COL_X[2], y: Y2 },
    { x: COL_X[1], y: Y2 },
    { x: COL_X[0], y: Y2 },
  ];

  const BADGE_D = 0.78;  // circular step badge diameter

  // Draw boxes, numbered badges, and text
  STEPS.forEach((step, i) => {
    const p = BOX_POS[i];

    // Card background — brand-pale with a subtle outer shadow
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: p.y, w: BOX_W, h: BOX_H,
      fill: { color: C.brandPale },
      line: { type: "none" },
      rectRadius: 0.14,
      shadow: {
        type: "outer",
        color: "0F172A",
        blur: 8,
        offset: 3,
        angle: 90,
        opacity: 0.10,
      },
    });

    // Circular number badge at top-center, overlapping the card top edge
    const badgeX = p.x + BOX_W / 2 - BADGE_D / 2;
    const badgeY = p.y - BADGE_D / 2;

    // White "halo" ring behind the badge so it clearly detaches from
    // the card edge when overlapping
    s.addShape(pres.shapes.OVAL, {
      x: badgeX - 0.06, y: badgeY - 0.06,
      w: BADGE_D + 0.12, h: BADGE_D + 0.12,
      fill: { color: C.white },
      line: { type: "none" },
    });

    // The badge itself
    s.addShape(pres.shapes.OVAL, {
      x: badgeX, y: badgeY, w: BADGE_D, h: BADGE_D,
      fill: { color: C.brand },
      line: { type: "none" },
      shadow: {
        type: "outer",
        color: "0F172A",
        blur: 6,
        offset: 2,
        angle: 90,
        opacity: 0.18,
      },
    });

    // Number inside the badge — white, bold, vertically centered
    s.addText(step.num, {
      x: badgeX, y: badgeY, w: BADGE_D, h: BADGE_D,
      fontFace: FONT_H, fontSize: 32, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });

    // Step name — large bold, centered in the card body
    s.addText(step.name, {
      x: p.x, y: p.y + 0.75, w: BOX_W, h: 0.65,
      fontFace: FONT_H, fontSize: 26, color: C.ink, bold: true,
      align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });

    // Thin brand accent rule under the name
    s.addShape(pres.shapes.LINE, {
      x: p.x + BOX_W / 2 - 0.30, y: p.y + 1.42, w: 0.60, h: 0,
      line: { color: C.brand, width: 1.2 },
    });

    // Code snippet
    s.addText(step.code, {
      x: p.x, y: p.y + 1.52, w: BOX_W, h: 0.42,
      fontFace: "Consolas", fontSize: 14, color: C.muted,
      align: "center", valign: "middle", margin: 0,
    });
  });

  // ── Refined arrows ──
  // Thinner than before, brand color instead of slate to tie the whole
  // composition together visually.
  const ARROW_COLOR = "2563EB";  // brand
  const HA_W = 0.82, HA_H = 0.18;

  // Row 1 horizontal arrows (→)
  [0, 1].forEach((i) => {
    s.addShape(pres.shapes.RIGHT_ARROW, {
      x: BOX_POS[i].x + BOX_W + (H_GAP - HA_W) / 2,
      y: Y1 + BOX_H / 2 - HA_H / 2,
      w: HA_W, h: HA_H,
      fill: { color: ARROW_COLOR },
      line: { type: "none" },
    });
  });

  // Turn-down arrow from box 3 to box 4 (right column).
  // Shortened so its head stops above badge 4's halo at the top of box 4.
  const DOWN_ARROW_BOTTOM_PAD = BADGE_D / 2 + 0.12;  // leave room for badge+halo
  s.addShape(pres.shapes.DOWN_ARROW, {
    x: COL_X[2] + BOX_W / 2 - HA_H / 2,
    y: Y1 + BOX_H + 0.08,
    w: HA_H,
    h: V_GAP - 0.08 - DOWN_ARROW_BOTTOM_PAD,
    fill: { color: ARROW_COLOR },
    line: { type: "none" },
  });

  // Row 2 horizontal arrows (←)
  [4, 5].forEach((i) => {
    s.addShape(pres.shapes.LEFT_ARROW, {
      x: BOX_POS[i].x + BOX_W + (H_GAP - HA_W) / 2,
      y: Y2 + BOX_H / 2 - HA_H / 2,
      w: HA_W, h: HA_H,
      fill: { color: ARROW_COLOR },
      line: { type: "none" },
    });
  });
}


// ═════════════════════════════════════════════
// SLIDE — Q&A CLOSING
// ═════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.ink };

  s.addText("Questions?", {
    x: 0.75, y: 2.80, w: 12, h: 1.4,
    fontFace: FONT_H, fontSize: 80, color: C.white, bold: true, align: "center", margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 5.90, y: 4.45, w: 1.5, h: 0,
    line: { color: C.brand, width: 3 },
  });

  s.addText([
    { text: "geopandas.org",          options: { color: "CBD5E1", fontSize: 14 } },
    { text: "   ·   ",                 options: { color: "64748B", fontSize: 14 } },
    { text: "shapely.readthedocs.io", options: { color: "CBD5E1", fontSize: 14 } },
    { text: "   ·   ",                 options: { color: "64748B", fontSize: 14 } },
    { text: "pyproj.github.io",       options: { color: "CBD5E1", fontSize: 14 } },
  ], {
    x: 0.75, y: 4.85, w: 12, h: 0.4,
    fontFace: FONT_B, align: "center", margin: 0,
  });
}

// ─────────────────────────────────────────────
pres.writeFile({ fileName: "Geospatial_Analysis_Training.pptx" })
  .then((fn) => console.log("WROTE:", fn))
  .catch((e) => { console.error(e); process.exit(1); });
