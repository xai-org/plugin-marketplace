// ====================================================================
// picasso-greatest-hits.pptx — generated from source PPTX
// Run: node build.js   → produces picasso-greatest-hits.pptx
// Requires: npm install pptxgenjs  (JSZip is a transitive dep)
// Image assets expected in ./assets/ (same filenames as source media)
// ====================================================================

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.author = "Upstream Gallery";
pres.title = "Picasso — A Life in Colors";

// Custom layout: 20" × 11.25" (matches source exactly)
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";

let slide;

// ════════════════════ Slide 1 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Shape 1  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.5833, h: 1.6071, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 2  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.6071, w: 0.5833, h: 1.6073, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 3  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.2144, w: 0.5833, h: 1.6071, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 4  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.8215, w: 0.5833, h: 1.6073, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 5  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 6.4287, w: 0.5833, h: 1.6071, fill: { color: "3D5C3A" }, line: { type: "none" } });
  // Shape 6  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 8.0358, w: 0.5833, h: 1.6071, fill: { color: "0F0F0F" }, line: { type: "none" } });
  // Shape 7  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 9.6429, w: 0.5833, h: 1.6071, fill: { color: "0F2340" }, line: { type: "none" } });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "COVER", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.3368, y: 0.4792, w: 1.1974, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "01", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 11  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY — WEEKEND EXHIBIT", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 7.2 } }
  ], { x: 1.4583, y: 3.2928, w: 17.9177, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "Picasso", options: { bold: true, italic: true, fontSize: 180, color: "0F0F0F", fontFace: "Georgia", charSpacing: -7.2 } }
  ], { x: 1.4583, y: 3.9178, w: 17.9177, h: 2.2415, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "A Life in Colors, a Century in Motion.", options: { fontSize: 42, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 1.4583, y: 6.4093, w: 17.9177, h: 0.6833, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 15  (text_or_shape)
  slide.addText([
    { text: "1881 — 1973", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 1.56 } }
  ], { x: 1.4583, y: 7.6343, w: 1.9481, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 16  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6564, y: 7.7905, w: 0.8333, h: 0.0104, fill: { color: "C9BFA8" }, line: { type: "none" } });
  // Text 17  (text_or_shape)
  slide.addText([
    { text: "Málaga · Barcelona · Paris · Cannes", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 1.56 } }
  ], { x: 4.8231, y: 7.6343, w: 5.293, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 18  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 10.2952, y: 7.7905, w: 0.8333, h: 0.0104, fill: { color: "C9BFA8" }, line: { type: "none" } });
  // Text 19  (text_or_shape)
  slide.addText([
    { text: "Oil, ink, collage, bronze", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 1.56 } }
  ], { x: 11.4619, y: 7.6343, w: 3.4575, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 20  (text_or_shape)
  slide.addText([
    { text: "greatest hits!", options: { fontSize: 51, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 14.6869, y: 1.4583, w: 4.1844, h: 0.75, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 352 });
  // Text 21  (text_or_shape)
  slide.addText([
    { text: "THIS WEEKEND ONLY · CURATED BY UPSTREAM", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 3.12 } }
  ], { x: 10.5363, y: 10.3438, w: 8.5674, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 2 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "BIOGRAPHY", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 15.5592, y: 0.4792, w: 1.9749, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "02", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-2-1.png", x: 1.1458, y: 1.6667, w: 8.3333, h: 7.5 });
  // Shape 5  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.8958, y: 9.8958, w: 5.7147, h: 0.6042, fill: { color: "F2ECE0" }, line: { color: "C9BFA8", width: 0.75 } });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PABLO RUIZ PICASSO · C. 1962", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 1.1354, y: 10.0521, w: 5.407, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "the man himself", options: { fontSize: 42, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 5.6225, y: 2.0833, w: 4.2917, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 8 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "02 — THE LIFE", options: { fontSize: 18, color: "A23E2C", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 10.5208, y: 1.875, w: 8.5833, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "A boy from Málaga.", options: { bold: true, italic: true, fontSize: 63, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.26 } }
  ], { x: 10.5208, y: 2.4896, w: 8.5833, h: 1.7041, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 10.5208, y: 4.5687, w: 1.6667, h: 0.0208, fill: { color: "0F0F0F" }, line: { type: "none" } });
  // Text 11  (text_or_shape)
  slide.addText([
    { text: "Born in Andalusia in ", options: { fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } },
    { text: "1881 ", options: { bold: true, fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } },
    { text: ". Could draw before he could speak. Moved to Paris at 23 and spent the next ", options: { fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } },
    { text: "70 years ", options: { bold: true, fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } },
    { text: "reinventing what a painting could be — roughly once a decade, whether the world was ready or not.", options: { fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 10.5208, y: 5.0062, w: 7.2958, h: 2.4735, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "20,000+", options: { bold: true, italic: true, fontSize: 54, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 10.5208, y: 8.0213, w: 3.145, h: 0.7917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "WORKS, LIFETIME", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 10.5208, y: 8.8755, w: 3.145, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "7", options: { bold: true, italic: true, fontSize: 54, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 14.0742, y: 8.0213, w: 2.3063, h: 0.7917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 15  (text_or_shape)
  slide.addText([
    { text: "DISTINCT PERIODS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.0742, y: 8.8755, w: 2.3063, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 16  (text_or_shape)
  slide.addText([
    { text: "91", options: { bold: true, italic: true, fontSize: 54, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 16.7972, y: 8.0213, w: 2.1403, h: 0.7917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 17  (text_or_shape)
  slide.addText([
    { text: "YEARS ON EARTH", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.7972, y: 8.8755, w: 2.1403, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 3 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "IN HIS OWN WORDS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.2865, y: 0.4792, w: 3.2593, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "03", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "\"", options: { bold: true, italic: true, fontSize: 255, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 2.7407, w: 18.2396, h: 1.5, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "I am always doing that which I cannot do, in order that I may learn how to do it.", options: { italic: true, fontSize: 72, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.08 } }
  ], { x: 1.1458, y: 4.3032, w: 16.0938, h: 3.3415, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 7  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 8.3374, w: 0.8333, h: 0.0208, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "PABLO PICASSO", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 2.2292, y: 8.1864, w: 3.0977, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "·", options: { fontSize: 19.5, color: "6A6255", transparency: 40, fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.4867, y: 8.1864, w: 0.2386, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "ON WORKING", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.8919, y: 8.1864, w: 2.5389, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 4 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "THE PERIODS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 15.2611, y: 0.4792, w: 2.2731, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "04", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "03 — THE WORK", options: { fontSize: 18, color: "A23E2C", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 1.4583, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "Seven periods, one restless hand.", options: { bold: true, italic: true, fontSize: 57, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.14 } }
  ], { x: 1.1458, y: 1.9896, w: 18.2396, h: 0.7936, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "Picasso never stayed still. Every few years he burned the style down and built a new one — sometimes quietly, sometimes with a grenade.", options: { fontSize: 25.5, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 3.0332, w: 12.875, h: 0.9977, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 8  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 6.9167, w: 2.4046, h: 1.875, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "I", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.3333, y: 7.1042, w: 0.2459, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "Blue", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 8.9792, w: 2.488, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 11  (text_or_shape)
  slide.addText([
    { text: "1901–04", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 9.5, w: 2.488, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6963, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "C9735E" }, line: { type: "none" } });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "II", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 3.8838, y: 7.1042, w: 0.4084, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "Rose", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 3.6963, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 15  (text_or_shape)
  slide.addText([
    { text: "1904–06", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 3.6963, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 16  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.2469, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Text 17  (text_or_shape)
  slide.addText([
    { text: "III", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 6.4344, y: 7.1042, w: 0.571, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 18  (text_or_shape)
  slide.addText([
    { text: "African", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 6.2469, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 19  (text_or_shape)
  slide.addText([
    { text: "1907–09", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 6.2469, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 20  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.7975, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "C9A063" }, line: { type: "none" } });
  // Text 21  (text_or_shape)
  slide.addText([
    { text: "IV", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 8.985, y: 7.1042, w: 0.5213, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 22  (text_or_shape)
  slide.addText([
    { text: "Cubism", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 8.7975, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 23  (text_or_shape)
  slide.addText([
    { text: "1909–19", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 8.7975, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 24  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 11.3481, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "7A6A52" }, line: { type: "none" } });
  // Text 25  (text_or_shape)
  slide.addText([
    { text: "V", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 11.5356, y: 7.1042, w: 0.3589, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 26  (text_or_shape)
  slide.addText([
    { text: "Neoclassical", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 11.3481, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 27  (text_or_shape)
  slide.addText([
    { text: "1920–30", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 11.3481, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 28  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 13.8988, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "3D5C3A" }, line: { type: "none" } });
  // Text 29  (text_or_shape)
  slide.addText([
    { text: "VI", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 14.0863, y: 7.1042, w: 0.5213, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 30  (text_or_shape)
  slide.addText([
    { text: "Surrealist", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 13.8988, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 31  (text_or_shape)
  slide.addText([
    { text: "1925–38", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 13.8988, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 32  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16.4494, y: 6.9167, w: 2.4048, h: 1.875, fill: { color: "0F2340" }, line: { type: "none" } });
  // Text 33  (text_or_shape)
  slide.addText([
    { text: "VII", options: { bold: true, italic: true, fontSize: 30, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 16.6369, y: 7.1042, w: 0.6838, h: 0.5938, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 34  (text_or_shape)
  slide.addText([
    { text: "Late Work", options: { bold: true, italic: true, fontSize: 30, color: "0F0F0F", fontFace: "Georgia" } }
  ], { x: 16.4494, y: 8.9792, w: 2.4881, h: 0.4583, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 35  (text_or_shape)
  slide.addText([
    { text: "1945–73", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 16.4494, y: 9.5, w: 2.4881, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 36  (text_or_shape)
  slide.addText([
    { text: "never twice the same!", options: { fontSize: 42, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 12.7688, y: 3.125, w: 5.7294, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 354 });

// ════════════════════ Slide 5 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.2223, y: 0.4792, w: 1.3118, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "05", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "I", options: { bold: true, italic: true, fontSize: 285, color: "FFFFFF", transparency: 90, fontFace: "Georgia", charSpacing: -17.1 } }
  ], { x: 1.1458, y: 1.6667, w: 1.5163, h: 3.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PERIOD I · 1901 — 1904", options: { fontSize: 19.5, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 2.4219, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "The Blue Period.", options: { bold: true, italic: true, fontSize: 165, color: "FFFFFF", fontFace: "Georgia", charSpacing: -4.95 } }
  ], { x: 1.1458, y: 3.0365, w: 18.2396, h: 4.1667, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "Paris is cold, a friend is dead, and Picasso paints only in blue. Grief as palette.", options: { italic: true, fontSize: 36, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.5781, w: 15.0208, h: 1.2917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 9  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.1458, w: 4, h: 0.1042, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.1458, w: 4, h: 0.1042, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 13  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.1458, w: 4, h: 0.1042, fill: { color: "3D5C3A" }, line: { type: "none" } });

// ════════════════════ Slide 6 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "BLUE PERIOD", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 15.2747, y: 0.4792, w: 2.2594, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "06", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 5  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083, fill: { color: "0A1422" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-6-1.png", x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083 });
  // Shape 6  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12.4564, y: 10.1667, w: 6.6042, h: 0.7083, fill: { color: "F2ECE0" }, line: { type: "none" }, rotate: 357 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "painted over a woman.", options: { fontSize: 45, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 12.623, y: 10.2083, w: 6.469, h: 0.6667, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 357 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "CAT. NO. 06 · BLUE PERIOD", options: { fontSize: 18, color: "1E3A5F", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 1.3542, w: 8.3688, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "The Old Guitarist.", options: { bold: true, italic: true, fontSize: 63, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.26 } }
  ], { x: 1.1458, y: 1.8854, w: 8.3688, h: 1.6514, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "1903 — 04", options: { italic: true, fontSize: 31.5, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 3.641, w: 8.3688, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 7.1105, w: 8.125, h: 0.0104, fill: { color: "C9BFA8" }, line: { type: "none" } });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "Painted in Madrid after his close friend Casagemas took his own life. An elongated body bent around a brown guitar — the one splash of warmth in a sea of blue. X-rays later found two hidden paintings underneath.", options: { fontSize: 21, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.3293, w: 6.6521, h: 2.0249, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "MEDIUM ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "OIL ON PANEL", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 9.5417, w: 3.4164, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "HOME ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "ART INSTITUTE OF CHICAGO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 10.2396, w: 5.213, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 7 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "C9735E" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.2223, y: 0.4792, w: 1.3118, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "07", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "II", options: { bold: true, italic: true, fontSize: 285, color: "FFFFFF", transparency: 90, fontFace: "Georgia", charSpacing: -17.1 } }
  ], { x: 1.1458, y: 1.6667, w: 2.9519, h: 3.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PERIOD II · 1904 — 1906", options: { fontSize: 19.5, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 2.4219, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "The Rose Period.", options: { bold: true, italic: true, fontSize: 165, color: "FFFFFF", fontFace: "Georgia", charSpacing: -4.95 } }
  ], { x: 1.1458, y: 3.0365, w: 18.2396, h: 4.1667, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "Love arrives, and so do harlequins, acrobats, circus families. The sadness warms into pink.", options: { italic: true, fontSize: 36, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.5781, w: 15.0208, h: 1.2917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 9  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.1458, w: 4, h: 0.1042, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.1458, w: 4, h: 0.1042, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 13  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.1458, w: 4, h: 0.1042, fill: { color: "3D5C3A" }, line: { type: "none" } });

// ════════════════════ Slide 8 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "ROSE PERIOD", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 15.2192, y: 0.4792, w: 2.3149, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "08", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 5  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083, fill: { color: "E8DFC9" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-8-1.png", x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083 });
  // Shape 6  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12.5328, y: 10.1667, w: 6.5312, h: 0.7083, fill: { color: "F2ECE0" }, line: { type: "none" }, rotate: 3 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "the harlequin is Pablo.", options: { fontSize: 45, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 12.6995, y: 10.2083, w: 6.3939, h: 0.6667, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 3 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "CAT. NO. 08 · ROSE PERIOD", options: { fontSize: 18, color: "A23E2C", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 1.3542, w: 8.3688, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Family of Saltimbanques.", options: { bold: true, italic: true, fontSize: 63, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.26 } }
  ], { x: 1.1458, y: 1.8854, w: 8.3688, h: 1.6514, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "1905", options: { italic: true, fontSize: 31.5, color: "A23E2C", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 3.641, w: 8.3688, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 7.1105, w: 8.125, h: 0.0104, fill: { color: "C9BFA8" }, line: { type: "none" } });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "A band of traveling circus performers standing at the edge of nowhere. The harlequin at left is a stand-in for the painter himself. Picasso called this \"the great Saltimbanque\" and it would hang in his own studio for years.", options: { fontSize: 21, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.3293, w: 6.6521, h: 2.0249, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "MEDIUM ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "OIL ON CANVAS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 9.5417, w: 3.6566, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "HOME ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "NATIONAL GALLERY, WASHINGTON", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 10.2396, w: 6.1037, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 9 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.2223, y: 0.4792, w: 1.3118, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "09", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "III", options: { bold: true, italic: true, fontSize: 285, color: "FFFFFF", transparency: 90, fontFace: "Georgia", charSpacing: -17.1 } }
  ], { x: 1.1458, y: 1.6667, w: 4.4278, h: 3.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PERIOD III · 1907 — 1909", options: { fontSize: 19.5, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 2.4219, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "The African Period.", options: { bold: true, italic: true, fontSize: 165, color: "FFFFFF", fontFace: "Georgia", charSpacing: -4.95 } }
  ], { x: 1.1458, y: 3.0365, w: 18.2396, h: 4.1667, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "Masks from the Trocadéro, sculpture from Iberia, a canvas the size of a door. Everything changes.", options: { italic: true, fontSize: 36, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.5781, w: 15.0208, h: 1.2917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 9  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.1458, w: 4, h: 0.1042, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.1458, w: 4, h: 0.1042, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 13  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.1458, w: 4, h: 0.1042, fill: { color: "3D5C3A" }, line: { type: "none" } });

// ════════════════════ Slide 10 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "0B0B0C" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-10-1.png", x: 0, y: 0, w: 20, h: 11.25 });
  // Shape 1  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "000000", transparency: 15 }, line: { type: "none" } });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "AFRICAN PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.6955, y: 0.4792, w: 2.8387, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "10", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 68, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "CAT. NO. 10", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 2.8587, w: 7.725, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "Les Demoiselles d'Avignon.", options: { bold: true, italic: true, fontSize: 90, color: "FFFFFF", fontFace: "Georgia", charSpacing: -1.8 } }
  ], { x: 1.1458, y: 3.4316, w: 7.725, h: 3.4167, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "1907", options: { italic: true, fontSize: 42, color: "C9A063", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.015, w: 7.725, h: 0.8229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Five figures, no perspective, two mask-faces. The painting that broke the Renaissance and set modern art in motion. Picasso kept it in his studio for nine years before showing it.", options: { fontSize: 25.5, color: "FFFFFF", transparency: 8, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 8.0879, w: 7.725, h: 1.9538, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 11 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "0B0B0C" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "IN HIS OWN WORDS", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.2865, y: 0.4792, w: 3.2593, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "11", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "\"", options: { bold: true, italic: true, fontSize: 255, color: "C9A063", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 3.2907, w: 18.2396, h: 1.5, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "Every act of creation is, first of all, an act of destruction.", options: { italic: true, fontSize: 72, color: "FFFFFF", fontFace: "Georgia", charSpacing: -1.08 } }
  ], { x: 1.1458, y: 4.8532, w: 16.0938, h: 2.2415, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 7  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 7.7874, w: 0.8333, h: 0.0208, fill: { color: "C9A063" }, line: { type: "none" } });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "PABLO PICASSO", options: { fontSize: 19.5, color: "FFFFFF", transparency: 40, fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 2.2292, y: 7.6364, w: 3.0977, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "·", options: { fontSize: 19.5, color: "FFFFFF", transparency: 64, fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.4867, y: 7.6364, w: 0.2386, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "ON MAKING WORK", options: { fontSize: 19.5, color: "FFFFFF", transparency: 40, fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.8919, y: 7.6364, w: 3.4791, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 12 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "C9A063" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.2223, y: 0.4792, w: 1.3118, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "12", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "IV", options: { bold: true, italic: true, fontSize: 285, color: "FFFFFF", transparency: 90, fontFace: "Georgia", charSpacing: -17.1 } }
  ], { x: 1.1458, y: 1.6667, w: 4.0038, h: 3.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PERIOD IV · 1909 — 1919", options: { fontSize: 19.5, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 2.4219, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "The Cubism Period.", options: { bold: true, italic: true, fontSize: 165, color: "0F0F0F", fontFace: "Georgia", charSpacing: -4.95 } }
  ], { x: 1.1458, y: 3.0365, w: 18.2396, h: 4.1667, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "With Braque, Picasso shatters a chair, a guitar, a bottle of wine — then reassembles them from every angle at once.", options: { italic: true, fontSize: 36, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.5781, w: 15.0208, h: 1.2917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 9  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.1458, w: 4, h: 0.1042, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.1458, w: 4, h: 0.1042, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 13  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.1458, w: 4, h: 0.1042, fill: { color: "3D5C3A" }, line: { type: "none" } });

// ════════════════════ Slide 13 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "3D5C3A" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "PERIOD", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.2223, y: 0.4792, w: 1.3118, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "13", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "VI", options: { bold: true, italic: true, fontSize: 285, color: "FFFFFF", transparency: 90, fontFace: "Georgia", charSpacing: -17.1 } }
  ], { x: 1.1458, y: 1.6667, w: 4.0038, h: 3.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "PERIOD VI · 1925 — 1938", options: { fontSize: 19.5, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 2.4219, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "The Surrealist Period.", options: { bold: true, italic: true, fontSize: 165, color: "FFFFFF", fontFace: "Georgia", charSpacing: -4.95 } }
  ], { x: 1.1458, y: 3.0365, w: 18.2396, h: 4.1667, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "Dreams, distortions, and Marie-Thérèse asleep in a red armchair. The interior world seeps onto the canvas.", options: { italic: true, fontSize: 36, color: "FFFFFF", transparency: 15, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 7.5781, w: 15.0208, h: 1.2917, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 9  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.1458, w: 4, h: 0.1042, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 10  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.1458, w: 4, h: 0.1042, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.1458, w: 4, h: 0.1042, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 13  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.1458, w: 4, h: 0.1042, fill: { color: "3D5C3A" }, line: { type: "none" } });

// ════════════════════ Slide 14 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "SURREALIST YEARS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.2529, y: 0.4792, w: 3.2939, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "14", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 5  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083, fill: { color: "1A0F1A" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-14-1.jpeg", x: 9.4792, y: 1.3542, w: 9.375, h: 9.2083 });
  // Shape 6  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 14.5093, y: 10.1667, w: 4.5521, h: 0.7083, fill: { color: "F2ECE0" }, line: { type: "none" }, rotate: 356 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "Marie-Thérèse.", options: { fontSize: 45, color: "C9735E", fontFace: "Georgia" } }
  ], { x: 14.6759, y: 10.2083, w: 4.3553, h: 0.6667, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 356 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "CAT. NO. 14 · SURREALIST YEARS", options: { fontSize: 18, color: "C9735E", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 1.3542, w: 8.3688, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Girl Before a Mirror.", options: { bold: true, italic: true, fontSize: 63, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.26 } }
  ], { x: 1.1458, y: 1.8854, w: 8.3688, h: 1.6514, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "1932", options: { italic: true, fontSize: 31.5, color: "C9735E", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 3.641, w: 8.3688, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 11  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 8.2051, w: 8.125, h: 0.0104, fill: { color: "C9BFA8" }, line: { type: "none" } });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "A woman meets her reflection and finds another self — darker, unknown, her future looking back. Picasso once said: \"I'd rather own this one than all of them.\"", options: { fontSize: 21, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 8.4238, w: 6.6521, h: 1.6283, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "MEDIUM ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "OIL ON CANVAS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 1.1458, y: 10.2396, w: 3.6566, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "HOME ", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "MOMA, NEW YORK", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 5.071, y: 10.2396, w: 3.7012, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 15 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "0B0B0C" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-15-1.jpeg", x: 0, y: 0, w: 20, h: 11.25 });
  // Shape 1  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "000000", transparency: 15 }, line: { type: "none" } });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "1937", options: { fontSize: 18, color: "FFFFFF", transparency: 35, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.7147, y: 0.4792, w: 0.8195, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "15", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 68, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "CAT. NO. 15", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 11.1292, y: 4.1527, w: 7.725, h: 0.3646, valign: "top", align: "right", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "Guernica.", options: { bold: true, italic: true, fontSize: 90, color: "FFFFFF", fontFace: "Georgia", charSpacing: -1.8 } }
  ], { x: 11.1292, y: 4.7256, w: 7.725, h: 1.1667, valign: "top", align: "right", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "1937", options: { italic: true, fontSize: 42, color: "C9A063", fontFace: "Georgia" } }
  ], { x: 11.1292, y: 6.0589, w: 7.725, h: 0.8229, valign: "top", align: "right", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Painted in thirty-six days after the Nazi bombing of a Basque town. Eleven feet tall, twenty-five feet wide, black and white and grey. Picasso refused to let it return to Spain until the country was free. It didn't come home until 1981.", options: { fontSize: 25.5, color: "FFFFFF", transparency: 8, fontFace: "Georgia" } }
  ], { x: 11.1292, y: 7.1318, w: 7.725, h: 2.9098, valign: "top", align: "right", isTextBox: true, margin: 2 });

// ════════════════════ Slide 16 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "THE MUSES", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 15.5872, y: 0.4792, w: 1.9469, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "16", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "THE MUSES", options: { fontSize: 18, color: "A23E2C", fontFace: "Arial", charSpacing: 5.76 } }
  ], { x: 1.1458, y: 1.4583, w: 18.2396, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "The women he painted, the decades they shaped.", options: { bold: true, italic: true, fontSize: 57, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.14 } }
  ], { x: 1.1458, y: 1.9896, w: 18.2396, h: 0.7936, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 7  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 6.1458, w: 2.9167, h: 3.9583, fill: { color: "111111" }, line: { type: "none" } });
  // Image 0  (image)
  slide.addImage({ path: "assets/image-16-1.jpeg", x: 1.1458, y: 6.1458, w: 2.9167, h: 3.9583 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "1927 — 1935", options: { bold: true, fontSize: 18, color: "1E3A5F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 4.4375, y: 6.1458, w: 5.3539, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Marie-Thérèse Walter", options: { bold: true, italic: true, fontSize: 42, color: "0F0F0F", fontFace: "Georgia", charSpacing: -0.42 } }
  ], { x: 4.4375, y: 6.6146, w: 5.3539, h: 1.2083, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "The sleep, the soft curve, the blonde. Picasso's secret for years — and his quietest muse.", options: { fontSize: 22.5, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 4.4375, y: 8.0104, w: 5.3539, h: 1.3073, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 11  (text_or_shape)
  slide.addText([
    { text: "FEATURED: ", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "LE RÊVE (1932)", options: { fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 4.4375, y: 9.5052, w: 5.3539, h: 0.3333, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 12  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 10.3646, y: 6.1458, w: 2.9167, h: 3.9583, fill: { color: "111111" }, line: { type: "none" } });
  // Image 1  (image)
  slide.addImage({ path: "assets/image-16-2.jpeg", x: 10.3646, y: 6.1458, w: 2.9167, h: 3.9583 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "1936 — 1944", options: { bold: true, fontSize: 18, color: "1E3A5F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 13.6562, y: 6.1458, w: 5.3539, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "Dora Maar", options: { bold: true, italic: true, fontSize: 42, color: "0F0F0F", fontFace: "Georgia", charSpacing: -0.42 } }
  ], { x: 13.6562, y: 6.6146, w: 5.3539, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 15  (text_or_shape)
  slide.addText([
    { text: "The photographer who documented Guernica. The sharp edges, the green jaw, the weeping woman.", options: { fontSize: 22.5, color: "2A2723", fontFace: "Georgia" } }
  ], { x: 13.6562, y: 7.4271, w: 5.3539, h: 1.3073, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 16  (text_or_shape)
  slide.addText([
    { text: "FEATURED: ", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 1.8 } },
    { text: "PORTRAIT OF DORA MAAR (1937)", options: { fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 1.8 } }
  ], { x: 13.6562, y: 8.9219, w: 5.3539, h: 0.625, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 17 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "F2ECE0" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "IN HIS OWN WORDS", options: { fontSize: 18, color: "6A6255", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 14.2865, y: 0.4792, w: 3.2593, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "17", options: { bold: true, fontSize: 18, color: "0F0F0F", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "6A6255", transparency: 50, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "\"", options: { bold: true, italic: true, fontSize: 255, color: "1E3A5F", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 2.7407, w: 18.2396, h: 1.5, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "It took me four years to paint like Raphael, but a lifetime to paint like a child.", options: { italic: true, fontSize: 72, color: "0F0F0F", fontFace: "Georgia", charSpacing: -1.08 } }
  ], { x: 1.1458, y: 4.3032, w: 16.0938, h: 3.3415, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Shape 7  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.1458, y: 8.3374, w: 0.8333, h: 0.0208, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "PABLO PICASSO", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 2.2292, y: 8.1864, w: 3.0977, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "·", options: { fontSize: 19.5, color: "6A6255", transparency: 40, fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.4867, y: 8.1864, w: 0.2386, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "NEAR THE END", options: { fontSize: 19.5, color: "6A6255", fontFace: "Arial", charSpacing: 4.68 } }
  ], { x: 5.8919, y: 8.1864, w: 2.8754, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });

// ════════════════════ Slide 18 ════════════════════
slide = pres.addSlide();
slide.background = { color: "0A0A0A" };
  // Shape 0  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 20, h: 11.25, fill: { color: "0F0F0F" }, line: { type: "none" } });
  // Text 1  (text_or_shape)
  slide.addText([
    { text: "UPSTREAM GALLERY · PICASSO", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 0.4583, w: 5.3958, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 2  (text_or_shape)
  slide.addText([
    { text: "VISIT", options: { fontSize: 18, color: "FFFFFF", transparency: 45, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 16.6006, y: 0.4792, w: 0.9336, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 3  (text_or_shape)
  slide.addText([
    { text: "18", options: { bold: true, fontSize: 18, color: "FFFFFF", fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 17.7425, y: 0.4583, w: 0.4834, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 4  (text_or_shape)
  slide.addText([
    { text: "/ 18", options: { fontSize: 18, color: "FFFFFF", transparency: 73, fontFace: "Arial", charSpacing: 3.24 } }
  ], { x: 18.1426, y: 0.4792, w: 0.7949, h: 0.3229, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 5  (text_or_shape)
  slide.addText([
    { text: "THIS WEEKEND · UPSTREAM GALLERY", options: { fontSize: 19.5, color: "C9A063", fontFace: "Arial", charSpacing: 7.8 } }
  ], { x: 1.1458, y: 1.6667, w: 18.2396, h: 0.3958, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 6  (text_or_shape)
  slide.addText([
    { text: "Come meet ", options: { bold: true, italic: true, fontSize: 135, color: "FFFFFF", fontFace: "Georgia", charSpacing: -4.05 } },
    { text: "Picasso.", options: { bold: true, italic: true, fontSize: 135, color: "C9A063", fontFace: "Georgia", charSpacing: -4.05 } }
  ], { x: 1.1458, y: 2.3125, w: 18.2396, h: 3.3415, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 7  (text_or_shape)
  slide.addText([
    { text: "DATES", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 1.1458, y: 8.1335, w: 4.238, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 8  (text_or_shape)
  slide.addText([
    { text: "Sat 25 April", options: { italic: true, fontSize: 33, color: "FFFFFF", fontFace: "Georgia" } }
  ], { x: 1.1458, y: 8.6439, w: 4.238, h: 0.5687, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 9  (text_or_shape)
  slide.addText([
    { text: "Sun 26 April", options: { fontSize: 21, color: "FFFFFF", transparency: 35, fontFace: "Georgia" } }
  ], { x: 1.1458, y: 9.2334, w: 4.238, h: 0.3916, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 10  (text_or_shape)
  slide.addText([
    { text: "HOURS", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 5.6771, y: 8.1335, w: 4.238, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 11  (text_or_shape)
  slide.addText([
    { text: "10:00 — 20:00", options: { italic: true, fontSize: 33, color: "FFFFFF", fontFace: "Georgia" } }
  ], { x: 5.6771, y: 8.6439, w: 4.238, h: 0.5687, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 12  (text_or_shape)
  slide.addText([
    { text: "Last entry 19:15", options: { fontSize: 21, color: "FFFFFF", transparency: 35, fontFace: "Georgia" } }
  ], { x: 5.6771, y: 9.2334, w: 4.238, h: 0.3916, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 13  (text_or_shape)
  slide.addText([
    { text: "GALLERY", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 10.2083, y: 8.1335, w: 4.238, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 14  (text_or_shape)
  slide.addText([
    { text: "Upstream Gallery", options: { italic: true, fontSize: 33, color: "FFFFFF", fontFace: "Georgia" } }
  ], { x: 10.2083, y: 8.6439, w: 4.238, h: 0.5687, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 15  (text_or_shape)
  slide.addText([
    { text: "17 Waterline Row", options: { fontSize: 21, color: "FFFFFF", transparency: 35, fontFace: "Georgia" } }
  ], { x: 10.2083, y: 9.2334, w: 4.238, h: 0.3916, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 16  (text_or_shape)
  slide.addText([
    { text: "TICKETS", options: { fontSize: 18, color: "C9A063", fontFace: "Arial", charSpacing: 3.96 } }
  ], { x: 14.7396, y: 8.1335, w: 4.238, h: 0.3646, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 17  (text_or_shape)
  slide.addText([
    { text: "£18 general", options: { italic: true, fontSize: 33, color: "FFFFFF", fontFace: "Georgia" } }
  ], { x: 14.7396, y: 8.6439, w: 4.238, h: 0.5687, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 18  (text_or_shape)
  slide.addText([
    { text: "£12 members & students", options: { fontSize: 21, color: "FFFFFF", transparency: 35, fontFace: "Georgia" } }
  ], { x: 14.7396, y: 9.2334, w: 4.238, h: 0.3916, valign: "top", align: "left", isTextBox: true, margin: 2 });
  // Text 19  (text_or_shape)
  slide.addText([
    { text: "bring a friend —", options: { fontSize: 54, color: "C9735E", fontFace: "Georgia" } }
  ], { x: 13.5109, y: 2.2917, w: 5.5041, h: 0.7917, valign: "top", align: "left", isTextBox: true, margin: 2, rotate: 355 });
  // Shape 20  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 11.125, w: 4, h: 0.125, fill: { color: "1E3A5F" }, line: { type: "none" } });
  // Shape 21  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 4, y: 11.125, w: 4, h: 0.125, fill: { color: "C9735E" }, line: { type: "none" } });
  // Shape 22  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 8, y: 11.125, w: 4, h: 0.125, fill: { color: "C9A063" }, line: { type: "none" } });
  // Shape 23  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 12, y: 11.125, w: 4, h: 0.125, fill: { color: "A23E2C" }, line: { type: "none" } });
  // Shape 24  (text_or_shape)
  slide.addShape(pres.shapes.RECTANGLE, { x: 16, y: 11.125, w: 4, h: 0.125, fill: { color: "3D5C3A" }, line: { type: "none" } });


// ─── Source shapes that used <a:normAutofit/> (shrink-text-to-fit) ──
const AUTOFIT_TEXTS = {
  1: ["UPSTREAM GALLERY · PICASSO", "COVER", "01", "/ 18", "UPSTREAM GALLERY — WEEKEND EXHIBIT", "Picasso", "A Life in Colors, a Century in Motion.", "1881 — 1973", "Málaga · Barcelona · Paris · Cannes", "Oil, ink, collage, bronze", "greatest hits!", "THIS WEEKEND ONLY · CURATED BY UPSTREAM"],
  2: ["UPSTREAM GALLERY · PICASSO", "BIOGRAPHY", "02", "/ 18", "PABLO RUIZ PICASSO · C. 1962", "the man himself", "02 — THE LIFE", "A boy from Málaga.", "Born in Andalusia in 1881 . Could draw before he could speak. Moved to Paris at 23 and spent the next 70 years reinventing what a painting could be — roughly once a decade, whether the world was ready or not.", "20,000+", "WORKS, LIFETIME", "7", "DISTINCT PERIODS", "91", "YEARS ON EARTH"],
  3: ["UPSTREAM GALLERY · PICASSO", "IN HIS OWN WORDS", "03", "/ 18", "\"", "I am always doing that which I cannot do, in order that I may learn how to do it.", "PABLO PICASSO", "·", "ON WORKING"],
  4: ["UPSTREAM GALLERY · PICASSO", "THE PERIODS", "04", "/ 18", "03 — THE WORK", "Seven periods, one restless hand.", "Picasso never stayed still. Every few years he burned the style down and built a new one — sometimes quietly, sometimes with a grenade.", "I", "Blue", "1901–04", "II", "Rose", "1904–06", "III", "African", "1907–09", "IV", "Cubism", "1909–19", "V", "Neoclassical", "1920–30", "VI", "Surrealist", "1925–38", "VII", "Late Work", "1945–73", "never twice the same!"],
  5: ["UPSTREAM GALLERY · PICASSO", "PERIOD", "05", "/ 18", "I", "PERIOD I · 1901 — 1904", "The Blue Period.", "Paris is cold, a friend is dead, and Picasso paints only in blue. Grief as palette."],
  6: ["UPSTREAM GALLERY · PICASSO", "BLUE PERIOD", "06", "/ 18", "painted over a woman.", "CAT. NO. 06 · BLUE PERIOD", "The Old Guitarist.", "1903 — 04", "Painted in Madrid after his close friend Casagemas took his own life. An elongated body bent around a brown guitar — the one splash of warmth in a sea of blue. X-rays later found two hidden paintings underneath.", "MEDIUM OIL ON PANEL", "HOME ART INSTITUTE OF CHICAGO"],
  7: ["UPSTREAM GALLERY · PICASSO", "PERIOD", "07", "/ 18", "II", "PERIOD II · 1904 — 1906", "The Rose Period.", "Love arrives, and so do harlequins, acrobats, circus families. The sadness warms into pink."],
  8: ["UPSTREAM GALLERY · PICASSO", "ROSE PERIOD", "08", "/ 18", "the harlequin is Pablo.", "CAT. NO. 08 · ROSE PERIOD", "Family of Saltimbanques.", "1905", "A band of traveling circus performers standing at the edge of nowhere. The harlequin at left is a stand-in for the painter himself. Picasso called this \"the great Saltimbanque\" and it would hang in his own studio for years.", "MEDIUM OIL ON CANVAS", "HOME NATIONAL GALLERY, WASHINGTON"],
  9: ["UPSTREAM GALLERY · PICASSO", "PERIOD", "09", "/ 18", "III", "PERIOD III · 1907 — 1909", "The African Period.", "Masks from the Trocadéro, sculpture from Iberia, a canvas the size of a door. Everything changes."],
  10: ["UPSTREAM GALLERY · PICASSO", "AFRICAN PERIOD", "10", "/ 18", "CAT. NO. 10", "Les Demoiselles d'Avignon.", "1907", "Five figures, no perspective, two mask-faces. The painting that broke the Renaissance and set modern art in motion. Picasso kept it in his studio for nine years before showing it."],
  11: ["UPSTREAM GALLERY · PICASSO", "IN HIS OWN WORDS", "11", "/ 18", "\"", "Every act of creation is, first of all, an act of destruction.", "PABLO PICASSO", "·", "ON MAKING WORK"],
  12: ["UPSTREAM GALLERY · PICASSO", "PERIOD", "12", "/ 18", "IV", "PERIOD IV · 1909 — 1919", "The Cubism Period.", "With Braque, Picasso shatters a chair, a guitar, a bottle of wine — then reassembles them from every angle at once."],
  13: ["UPSTREAM GALLERY · PICASSO", "PERIOD", "13", "/ 18", "VI", "PERIOD VI · 1925 — 1938", "The Surrealist Period.", "Dreams, distortions, and Marie-Thérèse asleep in a red armchair. The interior world seeps onto the canvas."],
  14: ["UPSTREAM GALLERY · PICASSO", "SURREALIST YEARS", "14", "/ 18", "Marie-Thérèse.", "CAT. NO. 14 · SURREALIST YEARS", "Girl Before a Mirror.", "1932", "A woman meets her reflection and finds another self — darker, unknown, her future looking back. Picasso once said: \"I'd rather own this one than all of them.\"", "MEDIUM OIL ON CANVAS", "HOME MOMA, NEW YORK"],
  15: ["UPSTREAM GALLERY · PICASSO", "1937", "15", "/ 18", "CAT. NO. 15", "Guernica.", "1937", "Painted in thirty-six days after the Nazi bombing of a Basque town. Eleven feet tall, twenty-five feet wide, black and white and grey. Picasso refused to let it return to Spain until the country was free. It didn't come home until 1981."],
  16: ["UPSTREAM GALLERY · PICASSO", "THE MUSES", "16", "/ 18", "THE MUSES", "The women he painted, the decades they shaped.", "1927 — 1935", "Marie-Thérèse Walter", "The sleep, the soft curve, the blonde. Picasso's secret for years — and his quietest muse.", "FEATURED: LE RÊVE (1932)", "1936 — 1944", "Dora Maar", "The photographer who documented Guernica. The sharp edges, the green jaw, the weeping woman.", "FEATURED: PORTRAIT OF DORA MAAR (1937)"],
  17: ["UPSTREAM GALLERY · PICASSO", "IN HIS OWN WORDS", "17", "/ 18", "\"", "It took me four years to paint like Raphael, but a lifetime to paint like a child.", "PABLO PICASSO", "·", "NEAR THE END"],
  18: ["UPSTREAM GALLERY · PICASSO", "VISIT", "18", "/ 18", "THIS WEEKEND · UPSTREAM GALLERY", "Come meet Picasso.", "DATES", "Sat 25 April", "Sun 26 April", "HOURS", "10:00 — 20:00", "Last entry 19:15", "GALLERY", "Upstream Gallery", "17 Waterline Row", "TICKETS", "£18 general", "£12 members & students", "bring a friend —"],
};

// ─── Source shapes with non-100% line spacing ──
const LINESPACING_MAP = {
  1: [{ text: "Picasso", val: 88000 }, { text: "A Life in Colors, a Century in Motion.", val: 110000 }],
  2: [{ text: "A boy from Málaga.", val: 95000 }, { text: "Born in Andalusia in 1881 . Could draw before he could speak. Moved to Paris at 23 and spent the next 70 years reinventing what a painting could be — roughly once a decade, whether the world was ready or not.", val: 135000 }],
  3: [{ text: "\"", val: 70000 }, { text: "I am always doing that which I cannot do, in order that I may learn how to do it.", val: 110000 }],
  4: [{ text: "Seven periods, one restless hand.", val: 95000 }, { text: "Picasso never stayed still. Every few years he burned the style down and built a new one — sometimes quietly, sometimes with a grenade.", val: 135000 }],
  5: [{ text: "I", val: 80000 }, { text: "The Blue Period.", val: 90000 }, { text: "Paris is cold, a friend is dead, and Picasso paints only in blue. Grief as palette.", val: 125000 }],
  6: [{ text: "The Old Guitarist.", val: 92000 }, { text: "Painted in Madrid after his close friend Casagemas took his own life. An elongated body bent around a brown guitar — the one splash of warmth in a sea of blue. X-rays later found two hidden paintings underneath.", val: 136000 }],
  7: [{ text: "II", val: 80000 }, { text: "The Rose Period.", val: 90000 }, { text: "Love arrives, and so do harlequins, acrobats, circus families. The sadness warms into pink.", val: 125000 }],
  8: [{ text: "Family of Saltimbanques.", val: 92000 }, { text: "A band of traveling circus performers standing at the edge of nowhere. The harlequin at left is a stand-in for the painter himself. Picasso called this \"the great Saltimbanque\" and it would hang in his own studio for years.", val: 136000 }],
  9: [{ text: "III", val: 80000 }, { text: "The African Period.", val: 90000 }, { text: "Masks from the Trocadéro, sculpture from Iberia, a canvas the size of a door. Everything changes.", val: 125000 }],
  10: [{ text: "Les Demoiselles d'Avignon.", val: 90000 }, { text: "Five figures, no perspective, two mask-faces. The painting that broke the Renaissance and set modern art in motion. Picasso kept it in his studio for nine years before showing it.", val: 135000 }],
  11: [{ text: "\"", val: 70000 }, { text: "Every act of creation is, first of all, an act of destruction.", val: 110000 }],
  12: [{ text: "IV", val: 80000 }, { text: "The Cubism Period.", val: 90000 }, { text: "With Braque, Picasso shatters a chair, a guitar, a bottle of wine — then reassembles them from every angle at once.", val: 125000 }],
  13: [{ text: "VI", val: 80000 }, { text: "The Surrealist Period.", val: 90000 }, { text: "Dreams, distortions, and Marie-Thérèse asleep in a red armchair. The interior world seeps onto the canvas.", val: 125000 }],
  14: [{ text: "Girl Before a Mirror.", val: 92000 }, { text: "A woman meets her reflection and finds another self — darker, unknown, her future looking back. Picasso once said: \"I'd rather own this one than all of them.\"", val: 136000 }],
  15: [{ text: "Guernica.", val: 90000 }, { text: "Painted in thirty-six days after the Nazi bombing of a Basque town. Eleven feet tall, twenty-five feet wide, black and white and grey. Picasso refused to let it return to Spain until the country was free. It didn't come home until 1981.", val: 135000 }],
  16: [{ text: "The women he painted, the decades they shaped.", val: 95000 }, { text: "The sleep, the soft curve, the blonde. Picasso's secret for years — and his quietest muse.", val: 135000 }, { text: "The photographer who documented Guernica. The sharp edges, the green jaw, the weeping woman.", val: 135000 }],
  17: [{ text: "\"", val: 70000 }, { text: "It took me four years to paint like Raphael, but a lifetime to paint like a child.", val: 110000 }],
  18: [{ text: "Come meet Picasso.", val: 88000 }, { text: "Sat 25 April", val: 115000 }, { text: "Sun 26 April", val: 120000 }, { text: "10:00 — 20:00", val: 115000 }, { text: "Last entry 19:15", val: 120000 }, { text: "Upstream Gallery", val: 115000 }, { text: "17 Waterline Row", val: 120000 }, { text: "£18 general", val: 115000 }, { text: "£12 members & students", val: 120000 }],
};

// ─── Post-processing: restore source-fidelity features that pptxgenjs does
// not expose. We use JSZip (a pptxgenjs transitive dep) to patch the XML
// directly after write.
//
//   1. <a:normAutofit/> on shapes where the source had it (pptxgenjs only
//      exposes the wrong-semantic autoFit/<a:spAutoFit/>).
//   2. <a:lnSpc>...</a:lnSpc> line-spacing on paragraphs where the source
//      had non-100% line spacing. pptxgenjs has no per-paragraph line spacing.
//   3. Strip txBox="1" from <p:cNvSpPr> (pptxgenjs adds it; source doesn't).
async function applyPostProcessing(filename) {
  const fs = require("fs");
  const JSZip = require("jszip");
  const buf = fs.readFileSync(filename);
  const zip = await JSZip.loadAsync(buf);
  let autofitCount = 0, lnSpcCount = 0, txBoxCount = 0;
  const slideFiles = Object.keys(zip.files)
    .filter(n => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => {
      const na = parseInt(a.match(/slide(\d+)\.xml$/)[1], 10);
      const nb = parseInt(b.match(/slide(\d+)\.xml$/)[1], 10);
      return na - nb;
    });

  // pptxgenjs XML-escapes text content. Decode before comparing.
  const xmlDecode = (s) => s
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  for (const name of slideFiles) {
    const idx = parseInt(name.match(/slide(\d+)\.xml$/)[1], 10);
    let xml = await zip.file(name).async("string");

    // (3) Strip txBox="1" everywhere.
    const beforeLen = xml.length;
    xml = xml.replace(/<p:cNvSpPr txBox="1"\/>/g, "<p:cNvSpPr/>");
    if (xml.length !== beforeLen) txBoxCount++;

    // Build target lookups
    const autofitTargets = new Set(AUTOFIT_TEXTS[idx] || []);
    const lnSpcTargets = new Map();
    for (const entry of (LINESPACING_MAP[idx] || [])) {
      lnSpcTargets.set(entry.text, entry.val);
    }

    if (autofitTargets.size === 0 && lnSpcTargets.size === 0) {
      zip.file(name, xml);
      continue;
    }

    xml = xml.replace(/<p:sp>[\s\S]*?<\/p:sp>/g, (block) => {
      const textMatches = [...block.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)];
      const combined = xmlDecode(textMatches.map(m => m[1]).join("")).trim();
      if (!combined) return block;

      let out = block;

      // (1) normAutofit injection
      if (autofitTargets.has(combined)) {
        const selfClose = /<a:bodyPr\b([^>]*?)\/>/;
        if (selfClose.test(out)) {
          autofitCount++;
          out = out.replace(selfClose,
            "<a:bodyPr$1><a:normAutofit/></a:bodyPr>");
        } else {
          const opened = /<a:bodyPr\b([^>]*)>([\s\S]*?)<\/a:bodyPr>/;
          if (opened.test(out)) {
            autofitCount++;
            out = out.replace(opened, (m, attrs, inner) => {
              if (inner.includes("<a:normAutofit")) return m;
              const cleaned = inner.replace(/<a:spAutoFit\s*\/>/g, "");
              return `<a:bodyPr${attrs}>${cleaned}<a:normAutofit/></a:bodyPr>`;
            });
          }
        }
      }

      // (2) Line spacing injection on FIRST <a:pPr/> in this shape
      if (lnSpcTargets.has(combined)) {
        const pct = lnSpcTargets.get(combined);
        // Match the first <a:pPr ...>...</a:pPr> and add <a:lnSpc> inside, or
        // replace self-closing <a:pPr .../> with expanded version.
        const pPrSelfClose = /<a:pPr\b([^>]*?)\/>/;
        const pPrOpened = /<a:pPr\b([^>]*)>([\s\S]*?)<\/a:pPr>/;
        if (pPrSelfClose.test(out) &&
            !pPrOpened.test(out.substring(0, out.indexOf("/>") + 2))) {
          // Only patch if the FIRST pPr is self-closing and comes before any opened one
          out = out.replace(pPrSelfClose,
            `<a:pPr$1><a:lnSpc><a:spcPct val="${pct}"/></a:lnSpc></a:pPr>`);
          lnSpcCount++;
        } else if (pPrOpened.test(out)) {
          let replaced = false;
          out = out.replace(pPrOpened, (m, attrs, inner) => {
            if (replaced) return m;  // only first
            replaced = true;
            if (inner.includes("<a:lnSpc")) return m;
            return `<a:pPr${attrs}><a:lnSpc><a:spcPct val="${pct}"/></a:lnSpc>${inner}</a:pPr>`;
          });
          if (replaced) lnSpcCount++;
        }
      }

      return out;
    });

    zip.file(name, xml);
  }

  const outBuf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  fs.writeFileSync(filename, outBuf);
  console.log(`Post-processing: ${autofitCount} normAutofit, ${lnSpcCount} lnSpc, ${txBoxCount} txBox-stripped slides.`);
}

pres.writeFile({ fileName: "picasso-greatest-hits.pptx" })
  .then(async (fn) => {
    await applyPostProcessing(fn);
    console.log("Wrote " + fn);
  })
  .catch(err => { console.error(err); process.exit(1); });
