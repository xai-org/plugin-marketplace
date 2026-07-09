// Rosen & Roses - reverse-engineered pptxgenjs source
// Run: npm install pptxgenjs && node generate.js
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';  // overridden below to exact dimensions
pptx.defineLayout({ name: 'CUSTOM', width: 20, height: 11.25 });
pptx.layout = 'CUSTOM';

// ===== Slide 1 =====
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0.0, y: 0.0, w: 20.0, h: 11.25, fill: { color: "FFF5DE" }, line: { type: "none" } });
  slide.addShape(pptx.ShapeType.rect, { x: 0.4167, y: 0.4167, w: 19.1667, h: 10.4167, fill: { type: "none" }, line: { color: "1F1914", width: 0.75, transparency: 80.0 } });
  slide.addImage({ path: "./image-1-1.png", x: 0.6458, y: 0.6458, w: 0.7292, h: 0.7292 });
  slide.addImage({ path: "./image-1-2.png", x: 18.625, y: 0.6458, w: 0.7292, h: 0.7292, rotate: 180.0 });
  slide.addImage({ path: "./image-1-3.png", x: 0.6458, y: 9.875, w: 0.7292, h: 0.7292 });
  slide.addImage({ path: "./image-1-4.png", x: 18.625, y: 9.875, w: 0.7292, h: 0.7292, rotate: 180.0 });
  slide.addImage({ path: "./image-1-5.png", x: -0.8333, y: -0.4167, w: 7.5, h: 8.5417 });
  slide.addImage({ path: "./image-1-6.png", x: 12.7083, y: 3.3333, w: 8.125, h: 8.75 });
  slide.addText([
    { text: "VOLUME NO. I", options: { fontSize: 10.5, color: "8A2838", fontFace: "DM Mono", charSpacing: 5.25, align: "center" } },
  ], { x: 5.9837, y: 1.0, w: 2.0085, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦", options: { fontSize: 10.5, color: "8A2838", transparency: 50.0, fontFace: "DM Mono", charSpacing: 5.25, align: "center" } },
  ], { x: 8.236, y: 0.9896, w: 0.2754, h: 0.2396, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "SPRING MMXXVI", options: { fontSize: 10.5, color: "8A2838", fontFace: "DM Mono", charSpacing: 5.25, align: "center" } },
  ], { x: 8.7552, y: 1.0, w: 2.1688, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦", options: { fontSize: 10.5, color: "8A2838", transparency: 50.0, fontFace: "DM Mono", charSpacing: 5.25, align: "center" } },
  ], { x: 11.1678, y: 0.9896, w: 0.2754, h: 0.2396, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "NO. 123 MARKET", options: { fontSize: 10.5, color: "8A2838", fontFace: "DM Mono", charSpacing: 5.25, align: "center" } },
  ], { x: 11.687, y: 1.0, w: 2.3293, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Rosen", options: { fontSize: 225.0, italic: true, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: -5.62, align: "center", lineSpacingMultiple: 0.86 } },
  ], { x: 5.1075, y: 1.6042, w: 9.785, h: 2.7292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "&", options: { fontSize: 135.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", charSpacing: -5.62, align: "center", lineSpacingMultiple: 0.9 } },
  ], { x: 5.1075, y: 4.4167, w: 9.785, h: 1.7292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "ROSES", options: { fontSize: 225.0, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: 4.5, align: "center", lineSpacingMultiple: 0.86 } },
  ], { x: 5.1075, y: 6.2292, w: 9.785, h: 2.7292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 8.2396, y: 9.3802, w: 1.4583, h: 0.0104, fill: { color: "8A2838", transparency: 50.0 }, line: { type: "none" } });
  slide.addImage({ path: "./image-1-7.png", x: 9.9062, y: 9.2917, w: 0.1875, h: 0.1875 });
  slide.addShape(pptx.ShapeType.rect, { x: 10.3021, y: 9.3802, w: 1.4583, h: 0.0104, fill: { color: "8A2838", transparency: 50.0 }, line: { type: "none" } });
  slide.addText([
    { text: "a little flower shop, newly opened on the corner.", options: { fontSize: 27.0, italic: true, color: "554535", fontFace: "Cormorant Garamond", charSpacing: 0.54, align: "center" } },
  ], { x: 6.5724, y: 9.8125, w: 6.8553, h: 0.4896, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "FRESH CUT · GROWN NEARBY", options: { fontSize: 9.75, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.4583, y: 10.3438, w: 3.0129, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "TUES — SUN · CLOSED MON", options: { fontSize: 9.75, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 15.7384, y: 10.3438, w: 2.8873, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 2 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "F3EAD8" };
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 1.4948, w: 1.25, h: 0.0104, fill: { color: "8A2838", transparency: 50.0 }, line: { type: "none" } });
  slide.addText([
    { text: "A LETTER TO THE NEIGHBORHOOD", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.12, align: "left" } },
  ], { x: 2.9167, y: 1.4115, w: 3.5931, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Hello, ", options: { fontSize: 112.5, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: -1.69, align: "left", lineSpacingMultiple: 0.92 } },
    { text: "neighbor.", options: { fontSize: 112.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", charSpacing: -1.69, align: "left", lineSpacingMultiple: 0.92 } },
  ], { x: 1.4583, y: 2.0885, w: 8.4435, h: 2.9167, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "We're so glad you stopped by. After years of arranging flowers out of a little home studio — out of buckets in the kitchen, out of the back of a station wagon — we finally have a proper shop. And we couldn't imagine opening it anywhere else but here, right on our own block.", options: { fontSize: 19.5, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.5 } },
  ], { x: 1.4583, y: 5.4635, w: 6.0083, h: 2.4792, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Come in. Stay a while. The kettle is always on, and there will usually be a dog underfoot.", options: { fontSize: 19.5, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 1.4583, y: 8.151, w: 6.0083, h: 0.6875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 9.6823, w: 0.5208, h: 0.0104, fill: { color: "8A2838" }, line: { type: "none" } });
  slide.addText([
    { text: "with love, Rosa & Henri", options: { fontSize: 42.0, bold: true, color: "5C1823", fontFace: "Caveat", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 2.1875, y: 9.2135, w: 4.802, h: 0.625, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 10.6976, y: 0.0, w: 9.3022, h: 11.25, fill: { color: "F3D9D1" }, line: { type: "none" } });
  slide.addImage({ path: "./image-2-1.png", x: 10.6976, y: 0.0, w: 9.3022, h: 11.25 });
  slide.addShape(pptx.ShapeType.ellipse, { x: 17.2498, y: 0.8333, w: 1.9167, h: 1.9167, fill: { type: "none" }, line: { color: "8A2838", width: 1.5 }, rotate: -14.0 });
  slide.addText([
    { text: "ROSEN & ROSES", options: { fontSize: 8.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 1.82, align: "center", lineSpacingMultiple: 1.8 } },
  ], { x: 17.4483, y: 1.1406, w: 1.3185, h: 0.5373, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Now Open", options: { fontSize: 33.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.0 } },
  ], { x: 17.276, y: 1.3611, w: 1.8643, h: 0.9028, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "EST. 2026", options: { fontSize: 8.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 1.82, align: "center", lineSpacingMultiple: 1.8 } },
  ], { x: 17.8318, y: 1.9926, w: 0.9538, h: 0.4464, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦ CHAPTER I · A GREETING", options: { fontSize: 9.75, color: "554535", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.75, w: 3.0429, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE II", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.1468, y: 10.7604, w: 0.9365, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 3 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "F3EAD8" };
  slide.addShape(pptx.ShapeType.rect, { x: 0.0, y: 3.8874, w: 20.0, h: 0.0104, fill: { color: "1F1914", transparency: 80.0 }, line: { type: "none" } });
  slide.addText([
    { text: "I", options: { fontSize: 195.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 0.82 } },
    { text: ".", options: { fontSize: 54.0, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 0.82 } },
  ], { x: 1.4583, y: 1.25, w: 4.7567, h: 2.2624, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "CHAPTER ONE", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.9, align: "center" } },
  ], { x: 7.0317, y: 1.7311, w: 5.9366, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "How we ", options: { fontSize: 75.0, color: "1F1914", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.0 } },
    { text: "began", options: { fontSize: 75.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.0 } },
  ], { x: 7.0317, y: 2.1165, w: 5.9366, h: 1.0833, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "from a kitchen table — 2019", options: { fontSize: 28.5, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "right", lineSpacingMultiple: 1.1 } },
  ], { x: 13.785, y: 2.4103, w: 4.7567, h: 0.4771, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— TO A SHOP ON MARKET ST.", options: { fontSize: 9.0, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.7, align: "right" } },
  ], { x: 13.785, y: 2.9915, w: 4.7567, h: 0.2083, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "It started with a few garden roses from my grandmother's yard and a length of brown twine. I tied my first bouquet for a friend's backyard wedding, and I haven't really stopped since.", options: { fontSize: 20.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 1.4583, y: 4.7311, w: 5.4585, h: 2.221, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "For a long time the flowers came out of a cramped home studio — buckets in the kitchen, foliage on the porch, a delivery van that smelled forever of eucalyptus.", options: { fontSize: 20.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 1.4583, y: 7.1188, w: 5.4585, h: 1.7852, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "❝", options: { fontSize: 90.0, italic: true, color: "8A2838", transparency: 60.0, fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 0.6 } },
  ], { x: 7.6047, y: 4.7311, w: 4.7906, h: 0.7917, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Flowers are how we tell each other the bigger things — congratulations, I'm sorry, I'm thinking of you, welcome home.", options: { fontSize: 28.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.3 } },
  ], { x: 7.7996, y: 5.6999, w: 4.5326, h: 2.0643, margin: [0.0, 0.0, 0.0, 0.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— ROSA, OUR FLORIST", options: { fontSize: 9.0, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.7, align: "center", lineSpacingMultiple: 1.3 } },
  ], { x: 7.6047, y: 8.0391, w: 4.7906, h: 0.2041, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "This spring, the corner shop on Market Street opened up, and it felt like it had been waiting for us. Tall windows. A little back room for cold storage. Room for a workbench and a kettle.", options: { fontSize: 20.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 13.2422, y: 4.7311, w: 5.4585, h: 1.7852, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "We moved in with ten pairs of scissors, a rolled-up rug, and every flower we could fit in the station wagon.", options: { fontSize: 20.25, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 13.2422, y: 6.6829, w: 5.4585, h: 1.3493, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-3-1.png", x: 1.4583, y: 10.1042, w: 17.0833, h: 0.625 });
  slide.addText([
    { text: "✦ CHAPTER I · HOW WE BEGAN", options: { fontSize: 9.75, color: "554535", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.75, w: 3.294, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE III", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.0249, y: 10.7604, w: 1.0584, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 4 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "F3EAD8" };
  slide.addText([
    { text: "CHAPTER TWO · THE MENU", options: { fontSize: 11.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.6, align: "left" } },
  ], { x: 1.4583, y: 1.1458, w: 8.2732, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "A little of ", options: { fontSize: 72.0, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
    { text: "everything", options: { fontSize: 72.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
    { text: ".", options: { fontSize: 72.0, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 1.4583, y: 1.6042, w: 8.2732, h: 1.0417, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "From a single stem in brown paper, to something unforgettable.", options: { fontSize: 18.0, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "right", lineSpacingMultiple: 1.35 } },
  ], { x: 15.3596, y: 1.8044, w: 3.182, h: 0.7165, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 3.2292, w: 4.0521, h: 7.2448, fill: { color: "FAF2DD" }, line: { type: "none" } });
  slide.addText([
    { text: "N°01", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.06, align: "left" } },
  ], { x: 4.7874, y: 3.5208, w: 0.473, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-4-1.png", x: 2.1302, y: 3.8958, w: 2.7083, h: 3.0208 });
  slide.addText([
    { text: "The Everyday Posy", options: { fontSize: 30.0, italic: true, color: "5C1823", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
  ], { x: 1.8333, y: 7.2083, w: 3.4011, h: 0.9583, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— bouquetus quotidianus —", options: { fontSize: 12.0, italic: true, color: "8A7660", fontFace: "Cormorant Garamond", charSpacing: 0.24, align: "left" } },
  ], { x: 1.8333, y: 8.1875, w: 3.4011, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Hand-tied in kraft & twine, wrapped while you wait. A week's worth of cheer from the cooler.", options: { fontSize: 14.25, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.5 } },
  ], { x: 1.8333, y: 8.5833, w: 3.4011, h: 0.9323, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.8333, y: 9.474, w: 3.3021, h: 0.0104, fill: { color: "1F1914", transparency: 70.0 }, line: { type: "none" } });
  slide.addText([
    { text: "FROM", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.31, align: "left" } },
  ], { x: 1.8333, y: 9.8906, w: 0.4868, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "$ 28", options: { fontSize: 22.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 4.6903, y: 9.7135, w: 0.5285, h: 0.4271, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 5.8021, y: 3.2292, w: 4.0521, h: 7.2448, fill: { color: "FAF2DD" }, line: { type: "none" } });
  slide.addText([
    { text: "N°02", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.06, align: "left" } },
  ], { x: 9.1312, y: 3.5208, w: 0.473, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-4-2.png", x: 6.474, y: 3.8958, w: 2.7083, h: 3.0208 });
  slide.addText([
    { text: "Signature Arrangements", options: { fontSize: 30.0, italic: true, color: "5C1823", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
  ], { x: 6.1771, y: 7.2083, w: 3.4011, h: 0.9583, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— in vaso, seasonalis —", options: { fontSize: 12.0, italic: true, color: "8A7660", fontFace: "Cormorant Garamond", charSpacing: 0.24, align: "left" } },
  ], { x: 6.1771, y: 8.1875, w: 3.4011, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Designed by hand in seasonal palettes, vased and ready. A centerpiece that lasts all week long.", options: { fontSize: 14.25, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.5 } },
  ], { x: 6.1771, y: 8.5833, w: 3.4011, h: 0.9323, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 6.1771, y: 9.474, w: 3.3021, h: 0.0104, fill: { color: "1F1914", transparency: 70.0 }, line: { type: "none" } });
  slide.addText([
    { text: "FROM", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.31, align: "left" } },
  ], { x: 6.1771, y: 9.8906, w: 0.4868, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "$ 65", options: { fontSize: 22.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 9.0373, y: 9.7135, w: 0.5252, h: 0.4271, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 10.1458, y: 3.2292, w: 4.0521, h: 7.2448, fill: { color: "FAF2DD" }, line: { type: "none" } });
  slide.addText([
    { text: "N°03", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.06, align: "left" } },
  ], { x: 13.4749, y: 3.5208, w: 0.473, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-4-3.png", x: 10.8177, y: 3.8958, w: 2.7083, h: 3.0208 });
  slide.addText([
    { text: "Weddings & Ceremonies", options: { fontSize: 30.0, italic: true, color: "5C1823", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
  ], { x: 10.5208, y: 7.2083, w: 3.4011, h: 0.9583, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— floralia nuptialis —", options: { fontSize: 12.0, italic: true, color: "8A7660", fontFace: "Cormorant Garamond", charSpacing: 0.24, align: "left" } },
  ], { x: 10.5208, y: 8.1875, w: 3.4011, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Bouquets, boutonnières, arches, reception florals. Consultations at the shop by appointment.", options: { fontSize: 14.25, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.5 } },
  ], { x: 10.5208, y: 8.5833, w: 3.4011, h: 0.9323, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 10.5208, y: 9.474, w: 3.3021, h: 0.0104, fill: { color: "1F1914", transparency: 70.0 }, line: { type: "none" } });
  slide.addText([
    { text: "BY", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.31, align: "left" } },
  ], { x: 10.5208, y: 9.8906, w: 0.2852, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "the quote", options: { fontSize: 22.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 12.8034, y: 9.7135, w: 1.1029, h: 0.4271, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 14.4896, y: 3.2292, w: 4.0521, h: 7.2448, fill: { color: "FAF2DD" }, line: { type: "none" } });
  slide.addText([
    { text: "N°04", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.06, align: "left" } },
  ], { x: 17.8187, y: 3.5208, w: 0.473, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-4-4.png", x: 15.1615, y: 3.8958, w: 2.7083, h: 3.0208 });
  slide.addText([
    { text: "Plants & Little Gifts", options: { fontSize: 30.0, italic: true, color: "5C1823", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
  ], { x: 14.8646, y: 7.2083, w: 3.4011, h: 0.9583, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— plantae et parva dona —", options: { fontSize: 12.0, italic: true, color: "8A7660", fontFace: "Cormorant Garamond", charSpacing: 0.24, align: "left" } },
  ], { x: 14.8646, y: 8.1875, w: 3.4011, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Potted greens, tapers, cards and the tiny things that turn a stop-in into a present.", options: { fontSize: 14.25, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.5 } },
  ], { x: 14.8646, y: 8.5833, w: 3.4011, h: 0.6354, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 14.8646, y: 9.474, w: 3.3021, h: 0.0104, fill: { color: "1F1914", transparency: 70.0 }, line: { type: "none" } });
  slide.addText([
    { text: "FROM", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.31, align: "left" } },
  ], { x: 14.8646, y: 9.8906, w: 0.4868, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "$ 12", options: { fontSize: 22.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 17.7682, y: 9.7135, w: 0.4818, h: 0.4271, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦ CHAPTER II · THE MENU", options: { fontSize: 9.75, color: "554535", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.4375, w: 2.9175, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE IV", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.1468, y: 10.4479, w: 0.9365, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 5 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "2D331F" };
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 1.4531, w: 0.8333, h: 0.0104, fill: { color: "E9C2BB", transparency: 40.0 }, line: { type: "none" } });
  slide.addText([
    { text: "CHAPTER THREE · OUR PROMISE", options: { fontSize: 11.25, color: "E9C2BB", fontFace: "DM Mono", charSpacing: 3.6, align: "left" } },
  ], { x: 2.4583, y: 1.3542, w: 3.9978, h: 0.25, margin: [0.0, 0.0, 0.0, 0.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Cut this ", options: { fontSize: 112.5, color: "F3EAD8", fontFace: "Cormorant Garamond", charSpacing: -1.12, align: "left", lineSpacingMultiple: 0.92 } },
    { text: "morning.", options: { fontSize: 112.5, italic: true, color: "E9C2BB", fontFace: "Cormorant Garamond", charSpacing: -1.12, align: "left", lineSpacingMultiple: 0.92 } },
  ], { x: 1.4583, y: 1.9792, w: 7.9396, h: 2.9167, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Every bloom in the shop was picked, sorted, and conditioned in the last twenty-four hours — most of it from small farms within a hundred miles of the front door.", options: { fontSize: 21.0, italic: true, color: "F3EAD8", transparency: 20.0, fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 1.4583, y: 5.4375, w: 6.8667, h: 1.3976, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 7.9896, w: 7.7083, h: 0.0104, fill: { color: "F3EAD8", transparency: 80.0 }, line: { type: "none" } });
  slide.addText([
    { text: "24", options: { fontSize: 72.0, italic: true, color: "E9C2BB", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
    { text: "h", options: { fontSize: 39.0, italic: true, color: "E9C2BB", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 1.4583, y: 8.4167, w: 2.1533, h: 1.0417, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "FARM TO SHOP", options: { fontSize: 9.0, color: "F3EAD8", transparency: 30.0, fontFace: "DM Mono", charSpacing: 2.52, align: "left" } },
  ], { x: 1.4583, y: 9.5625, w: 1.5417, h: 0.2083, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "12", options: { fontSize: 72.0, italic: true, color: "E9C2BB", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 4.1533, y: 8.4167, w: 2.2633, h: 1.0417, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "LOCAL GROWERS", options: { fontSize: 9.0, color: "F3EAD8", transparency: 30.0, fontFace: "DM Mono", charSpacing: 2.52, align: "left" } },
  ], { x: 4.1533, y: 9.5625, w: 1.5417, h: 0.2083, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "0", options: { fontSize: 72.0, italic: true, color: "E9C2BB", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 6.9583, y: 8.4167, w: 2.2917, h: 1.0417, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "FLORAL FOAM, EVER", options: { fontSize: 9.0, color: "F3EAD8", transparency: 30.0, fontFace: "DM Mono", charSpacing: 2.52, align: "left" } },
  ], { x: 6.9583, y: 9.5625, w: 1.5417, h: 0.375, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-5-1.png", x: 10.0, y: 0.0, w: 10.0, h: 11.25 });
  slide.addText([
    { text: "✦ CHAPTER III · OUR PROMISE", options: { fontSize: 9.75, color: "F3EAD8", transparency: 50.0, fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.5417, w: 3.4196, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE V", options: { fontSize: 9.75, color: "E9C2BB", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.2687, y: 10.5521, w: 0.8146, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 6 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "F3EAD8" };
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 1.1406, w: 0.8333, h: 0.0104, fill: { color: "8A2838", transparency: 40.0 }, line: { type: "none" } });
  slide.addText([
    { text: "CHAPTER FOUR · COME ON IN", options: { fontSize: 11.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.6, align: "left" } },
  ], { x: 2.4583, y: 1.0417, w: 3.7016, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Come say ", options: { fontSize: 120.0, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: -1.8, align: "left", lineSpacingMultiple: 0.92 } },
    { text: "hello", options: { fontSize: 120.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", charSpacing: -1.8, align: "left", lineSpacingMultiple: 0.92 } },
    { text: ".", options: { fontSize: 120.0, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: -1.8, align: "left", lineSpacingMultiple: 0.92 } },
  ], { x: 1.4583, y: 1.5417, w: 9.1295, h: 3.1081, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Corner of Market & 2nd, right next to the bakery — you'll know us by the striped awning and the row of tin buckets out front.", options: { fontSize: 21.0, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.45 } },
  ], { x: 11.1553, y: 3.554, w: 7.608, h: 0.8874, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.4583, y: 5.2331, w: 7.481, h: 4.9753, fill: { color: "FDF6E2" }, line: { color: "1F1914", width: 0.75, transparency: 80.0 } });
  slide.addShape(pptx.ShapeType.ellipse, { x: 7.5122, y: 5.431, w: 1.1875, h: 1.1875, fill: { color: "FDF6E2", transparency: 10.0 }, line: { color: "8A2838", width: 1.5 }, rotate: -8.0 });
  slide.addText([
    { text: "ROSEN & ROSES", options: { fontSize: 6.0, color: "8A2838", fontFace: "DM Mono", charSpacing: 1.32, align: "center", lineSpacingMultiple: 1.6 } },
  ], { x: 7.5775, y: 5.6288, w: 0.9816, h: 0.2973, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "No. 123", options: { fontSize: 16.5, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.6 } },
  ], { x: 7.7588, y: 5.8039, w: 0.6943, h: 0.4833, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "MARKET STREET", options: { fontSize: 6.0, color: "8A2838", fontFace: "DM Mono", charSpacing: 1.32, align: "center", lineSpacingMultiple: 1.6 } },
  ], { x: 7.6528, y: 6.165, w: 0.9816, h: 0.2973, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "— COME FIND US AT —", options: { fontSize: 8.25, bold: true, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.64, align: "left" } },
  ], { x: 1.9271, y: 5.6602, w: 6.7398, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "One Two Three ", options: { fontSize: 30.0, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
    { text: "Market Street", options: { fontSize: 30.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.05 } },
  ], { x: 1.9271, y: 6.0143, w: 6.7398, h: 0.9167, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "on the corner of second", options: { fontSize: 16.5, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "left" } },
  ], { x: 1.9271, y: 6.931, w: 6.7398, h: 0.3125, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.9271, y: 7.431, w: 6.5435, h: 0.0104, fill: { color: "1F1914", transparency: 85.0 }, line: { type: "none" } });
  slide.addText([
    { text: "SHOP HOURS", options: { fontSize: 7.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.25, align: "left" } },
  ], { x: 1.9271, y: 7.6602, w: 1.4167, h: 0.1771, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Tues–Fri · 9 to 6 Sat · 8 to 5 Sun · 10 to 3 ", options: { fontSize: 14.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.35 } },
    { text: "— closed Mondays —", options: { fontSize: 14.25, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.35 } },
  ], { x: 3.4271, y: 7.5664, w: 5.1948, h: 0.5758, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.9271, y: 8.2256, w: 6.5435, h: 0.0104, fill: { color: "1F1914", transparency: 85.0 }, line: { type: "none" } });
  slide.addText([
    { text: "CALL OR TEXT", options: { fontSize: 7.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.25, align: "left" } },
  ], { x: 1.9271, y: 8.4548, w: 1.4167, h: 0.1771, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "(555) 207 · 7683", options: { fontSize: 14.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.35 } },
  ], { x: 3.4271, y: 8.361, w: 5.1948, h: 0.3088, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 1.9271, y: 9.2806, w: 6.5435, h: 0.0104, fill: { color: "1F1914", transparency: 85.0 }, line: { type: "none" } });
  slide.addShape(pptx.ShapeType.rect, { x: 1.9271, y: 8.7531, w: 6.5435, h: 0.0104, fill: { color: "1F1914", transparency: 85.0 }, line: { type: "none" } });
  slide.addText([
    { text: "ON THE WEB", options: { fontSize: 7.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.25, align: "left" } },
  ], { x: 1.9271, y: 8.9823, w: 1.4167, h: 0.1771, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "rosenandroses.shop · ", options: { fontSize: 14.25, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.35 } },
    { text: "@rosenandroses", options: { fontSize: 14.25, italic: true, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.35 } },
  ], { x: 3.4271, y: 8.8885, w: 5.1948, h: 0.3088, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 9.5643, y: 5.2331, w: 8.9774, h: 4.9753, fill: { color: "F3D9D1" }, line: { color: "1F1914", width: 0.75, transparency: 80.0 } });
  slide.addImage({ path: "./image-6-1.png", x: 9.5747, y: 5.2435, w: 8.9565, h: 4.9544 });
  slide.addText([
    { text: "✦ CHAPTER IV · COME ON IN", options: { fontSize: 9.75, color: "554535", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.5417, w: 3.1685, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE VI", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.1468, y: 10.5521, w: 0.9365, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 7 =====
{
  const slide = pptx.addSlide();
  slide.background = { color: "8A2838" };
  slide.addImage({ path: "./image-7-1.png", x: 0.8333, y: 0.625, w: 3.125, h: 3.125 });
  slide.addImage({ path: "./image-7-2.png", x: 15.8333, y: 7.5, w: 3.3333, h: 3.3333 });
  slide.addImage({ path: "./image-7-3.png", x: 15.625, y: 1.875, w: 0.8333, h: 0.8333 });
  slide.addImage({ path: "./image-7-4.png", x: 3.125, y: 7.8125, w: 0.7292, h: 0.7292 });
  slide.addImage({ path: "./image-7-5.png", x: 1.875, y: 4.1667, w: 0.625, h: 0.625 });
  slide.addImage({ path: "./image-7-6.png", x: 17.6042, y: 2.7083, w: 0.5208, h: 0.5208 });
  slide.addShape(pptx.ShapeType.rect, { x: 3.0208, y: 1.875, w: 13.9583, h: 7.5, fill: { color: "F3EAD8" }, line: { type: "none" } });
  slide.addShape(pptx.ShapeType.rect, { x: 3.8542, y: 3.2492, w: 0.625, h: 0.0104, fill: { color: "8A2838", transparency: 50.0 }, line: { type: "none" } });
  slide.addText([
    { text: "A GIFT FROM US", options: { fontSize: 11.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.6, align: "left" } },
  ], { x: 4.625, y: 3.1502, w: 2.0959, h: 0.25, margin: [0.0, 0.0, 0.0, 0.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "Opening Week — ", options: { fontSize: 66.0, italic: true, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
    { text: "on us", options: { fontSize: 66.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
    { text: ".", options: { fontSize: 66.0, italic: true, color: "1F1914", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.0 } },
  ], { x: 3.8542, y: 3.6919, w: 6.1253, h: 1.875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "To say thank you for coming by: take twenty percent off any bouquet, arrangement, or potted thing during our first week on Market Street.", options: { fontSize: 18.0, color: "554535", fontFace: "Cormorant Garamond", align: "left", lineSpacingMultiple: 1.55 } },
  ], { x: 3.8542, y: 6.1086, w: 5.5792, h: 1.2038, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "VALID MAY 5 — 12 · IN-SHOP ONLY ONE PER NEIGHBOR · NO FINE PRINT", options: { fontSize: 8.25, color: "8A7660", fontFace: "DM Mono", charSpacing: 2.06, align: "left", lineSpacingMultiple: 1.8 } },
  ], { x: 3.8542, y: 7.6873, w: 6.1253, h: 0.4541, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 10.6344, y: 1.875, w: 6.3446, h: 7.5, fill: { color: "FAF3DE" }, line: { type: "none" } });
  slide.addText([
    { text: "GOOD THRU · MAY 12TH", options: { fontSize: 8.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.47, align: "center" } },
  ], { x: 12.7337, y: 3.1562, w: 2.1458, h: 0.1875, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "20", options: { fontSize: 225.0, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 0.9 } },
  ], { x: 11.959, y: 3.4271, w: 2.8302, h: 2.8542, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "%", options: { fontSize: 120.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 0.9 } },
  ], { x: 14.7059, y: 3.5938, w: 0.9484, h: 1.5417, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "off", options: { fontSize: 36.0, italic: true, color: "1F1914", fontFace: "Cormorant Garamond", align: "center" } },
  ], { x: 13.5382, y: 6.2604, w: 0.5369, h: 0.6458, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "any bouquet.", options: { fontSize: 18.0, color: "554535", fontFace: "Cormorant Garamond", align: "center" } },
  ], { x: 13.1387, y: 6.9271, w: 1.3361, h: 0.3438, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 12.2129, y: 7.5625, w: 3.1875, h: 0.5312, fill: { type: "none" }, line: { color: "8A2838", width: 0.75 } });
  slide.addText([
    { text: "CODE · NEIGHBOR", options: { fontSize: 12.0, color: "8A2838", fontFace: "DM Mono", charSpacing: 4.8, align: "center" } },
  ], { x: 12.5088, y: 7.7188, w: 2.5956, h: 0.2604, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦ CHAPTER V · A LITTLE GIFT", options: { fontSize: 9.75, color: "F3EAD8", transparency: 50.0, fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.5417, w: 3.4196, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE VII", options: { fontSize: 9.75, color: "E9C2BB", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 18.0249, y: 10.5521, w: 1.0584, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

// ===== Slide 8 =====
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.ShapeType.rect, { x: 0.0, y: 0.0, w: 20.0, h: 11.25, fill: { color: "FFF5DE" }, line: { type: "none" } });
  slide.addShape(pptx.ShapeType.rect, { x: 0.4167, y: 0.4167, w: 19.1667, h: 10.4167, fill: { type: "none" }, line: { color: "1F1914", width: 0.75, transparency: 80.0 } });
  slide.addImage({ path: "./image-8-1.png", x: 0.0, y: 0.625, w: 20.0, h: 2.9167 });
  slide.addShape(pptx.ShapeType.rect, { x: 7.0801, y: 2.7485, w: 0.8333, h: 0.0104, fill: { color: "8A2838", transparency: 40.0 }, line: { type: "none" } });
  slide.addText([
    { text: "AND, BEFORE WE LET YOU GO —", options: { fontSize: 11.25, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.6, align: "center" } },
  ], { x: 8.001, y: 2.6496, w: 3.9978, h: 0.25, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addShape(pptx.ShapeType.rect, { x: 12.0864, y: 2.7485, w: 0.8333, h: 0.0104, fill: { color: "8A2838", transparency: 40.0 }, line: { type: "none" } });
  slide.addText([
    { text: "Thank ", options: { fontSize: 225.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", charSpacing: -4.5, align: "center", lineSpacingMultiple: 0.95 } },
    { text: "you", options: { fontSize: 225.0, color: "1F1914", fontFace: "Cormorant Garamond", charSpacing: -4.5, align: "center", lineSpacingMultiple: 0.95 } },
    { text: ".", options: { fontSize: 225.0, italic: true, color: "8A2838", fontFace: "Cormorant Garamond", charSpacing: -4.5, align: "center", lineSpacingMultiple: 0.95 } },
  ], { x: 2.4896, y: 3.2746, w: 15.0208, h: 3.0104, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "for being the kind of neighborhood we wanted to open a shop in.", options: { fontSize: 27.0, italic: true, color: "1F1914", fontFace: "Cormorant Garamond", align: "center", lineSpacingMultiple: 1.4 } },
  ], { x: 2.4896, y: 7.0767, w: 15.0208, h: 1.0915, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "ROSEN & ROSES", options: { fontSize: 10.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 3.78, align: "center" } },
  ], { x: 6.1916, y: 8.8608, w: 1.9035, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦", options: { fontSize: 10.5, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.78, align: "center" } },
  ], { x: 8.1992, y: 8.8556, w: 0.2549, h: 0.2396, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "123 MARKET ST.", options: { fontSize: 10.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 3.78, align: "center" } },
  ], { x: 8.5583, y: 8.8608, w: 2.0435, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "✦", options: { fontSize: 10.5, color: "8A2838", fontFace: "DM Mono", charSpacing: 3.78, align: "center" } },
  ], { x: 10.7059, y: 8.8556, w: 0.2549, h: 0.2396, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "OPENING THIS SPRING", options: { fontSize: 10.5, color: "8A7660", fontFace: "DM Mono", charSpacing: 3.78, align: "center" } },
  ], { x: 11.0649, y: 8.8608, w: 2.7435, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addImage({ path: "./image-8-2.png", x: 7.9167, y: 10.0, w: 4.1667, h: 0.4167 });
  slide.addText([
    { text: "✦ FIN · WITH LOVE", options: { fontSize: 9.75, color: "554535", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 1.0, y: 10.75, w: 2.1846, h: 0.2292, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
  slide.addText([
    { text: "PAGE VIII", options: { fontSize: 9.75, color: "8A2838", fontFace: "DM Mono", charSpacing: 2.93, align: "left" } },
  ], { x: 17.903, y: 10.7604, w: 1.1803, h: 0.2188, margin: [2.0, 2.0, 2.0, 2.0], valign: "top", fit: "shrink" });
}

pptx.writeFile({ fileName: 'Rosen-and-Roses.pptx' }).then(() => console.log('Done'));