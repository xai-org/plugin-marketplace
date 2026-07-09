// Recreates History_of_Durham.pptx using pptxgenjs
// Generated from parsed slide XML — preserves original positions, colors, fonts.
// Usage: node history_of_durham.js  (requires `npm install pptxgenjs` and the media/ folder)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Original deck is 20" × 11.25" — define a custom layout that matches exactly.
pres.defineLayout({ name: "DURHAM", width: 20, height: 11.25 });
pres.layout = "DURHAM";
pres.title = "The History of Durham, North Carolina";

// ---------- helpers ----------

// Add a filled/outlined rectangle.
function addRect(slide, opts) {
  const shapeOpts = { x: opts.x, y: opts.y, w: opts.w, h: opts.h };
  if (opts.fill) {
    shapeOpts.fill = { color: opts.fill };
    if (opts.transparency != null) shapeOpts.fill.transparency = opts.transparency;
  } else {
    shapeOpts.fill = { type: 'none' };
  }
  if (opts.line) {
    shapeOpts.line = { color: opts.line.color, width: opts.line.width };
  } else {
    shapeOpts.line = { type: 'none' };
  }
  slide.addShape(pres.shapes.RECTANGLE, shapeOpts);
}

// Add a text box. `paragraphs` is an array of { align, lineSpacingPct, runs:[{text,options}] }
function addTextBox(slide, x, y, w, h, paragraphs, anchor) {
  const textArr = [];
  paragraphs.forEach((para, pIdx) => {
    para.runs.forEach((run, rIdx) => {
      const isLastRunOfPara = rIdx === para.runs.length - 1;
      const isLastPara = pIdx === paragraphs.length - 1;
      const options = Object.assign({}, run.options || {});
      if (para.align) options.align = para.align;
      if (para.lineSpacingPct) options.lineSpacingMultiple = para.lineSpacingPct / 100;
      // breakLine at end of paragraph (except the final paragraph)
      if (isLastRunOfPara && !isLastPara) options.breakLine = true;
      textArr.push({ text: run.text, options });
    });
  });
  const boxOpts = { x, y, w, h, margin: 0.028 };  // ~25400 EMU internal padding
  if (anchor === 'ctr') boxOpts.valign = 'middle';
  else if (anchor === 'b') boxOpts.valign = 'bottom';
  else boxOpts.valign = 'top';
  slide.addText(textArr, boxOpts);
}


// ============================== SLIDE 1 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addRect(slide, { x: 0, y: 0, w: 10.4761, h: 11.25, fill: "3A2416" });
  addTextBox(slide, 1.0417, 1.0417, 8.6445, 0.3333, [{"runs": [{"text": "A STORY IN TEN CHAPTERS", "options": {"fontSize": 18.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 1.625, 8.6445, 3.2262, [{"runs": [{"text": "The History of ", "options": {"fontSize": 78.0, "bold": true, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": -0.78}}, {"text": "Durham ", "options": {"fontSize": 78.0, "italic": true, "color": "D8B677", "fontFace": "Arial", "charSpacing": -0.78}}, {"text": ", North Carolina", "options": {"fontSize": 78.0, "bold": true, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": -0.78}}], "align": "left", "lineSpacingPct": 98.0}], "t");
  addTextBox(slide, 1.0417, 9.875, 8.6445, 0.375, [{"runs": [{"text": "EST. 1853 · BULL CITY · PIEDMONT, N.C.", "options": {"fontSize": 21.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 2.1}}], "align": "left"}], "t");
  slide.addImage({ path: "media/image-1-1.jpeg", x: 10.4761, y: 0, w: 9.5239, h: 11.25 });
  addRect(slide, { x: 14.7355, y: 10, w: 4.6395, h: 0.625, fill: "1E0F08", transparency: 65.0, line: { color: "F3EAD8", width: 1.5 } });
  addTextBox(slide, 14.9855, 10.1667, 4.2787, 0.3333, [{"runs": [{"text": "CHAPTER ONE BEGINS →", "options": {"fontSize": 18.0, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": 3.6}}], "align": "left"}], "t");
}

// ============================== SLIDE 2 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  slide.addImage({ path: "media/image-2-1.jpeg", x: 0, y: 0, w: 10, h: 11.25 });
  addRect(slide, { x: 10, y: 0, w: 10, h: 11.25, fill: "F7F0DE" });
  addTextBox(slide, 11.0417, 2.6037, 8.1542, 0.3333, [{"runs": [{"text": "CHAPTER 01 / BEFORE 1700", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 11.0417, 3.187, 8.1542, 2.1213, [{"runs": [{"text": "Before the City: Eno and Occaneechi Lands", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 11.0417, y: 5.2666, w: 1.25, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 11.0417, 5.7145, 8.1542, 2.9733, [{"runs": [{"text": "Long before Durham was a city, the rolling Piedmont forests along the Eno and Neuse rivers were home to the ", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Eno", "options": {"fontSize": 21.68, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": ", ", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Occaneechi", "options": {"fontSize": 21.68, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": ", and ", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Shakori ", "options": {"fontSize": 21.68, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "peoples. They fished the rivers, farmed corn and beans, and traded along ancient footpaths that would later become our roads.", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addTextBox(slide, 1.0417, 10.3333, 3.1737, 0.3333, [{"runs": [{"text": "DURHAM / ORIGINS", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "02 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 3 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addTextBox(slide, 1.0417, 1.0417, 18.4542, 0.3333, [{"runs": [{"text": "CHAPTER 02 / 1849 – 1869", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 1.625, 18.4542, 0.7349, [{"runs": [{"text": "A Town Born on the Railroad", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 1.0417, y: 2.6515, w: 1.25, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 1.0417, 3.0994, 15.0208, 1.5075, [{"runs": [{"text": "In 1849, a country doctor named ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Bartlett Durham ", "options": {"fontSize": 25.5, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "donated four acres of land for a new stop on the North Carolina Railroad. Trains rumbled through, a tiny depot grew into a village, and — almost by accident — the town took his name.", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addRect(slide, { x: 1.0417, y: 5.1486, w: 17.9167, h: 0.0208, fill: "3A2416" });
  addTextBox(slide, 1.0417, 5.4194, 4.399, 0.5208, [{"runs": [{"text": "1849", "options": {"fontSize": 34.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 1.0417, 6.0028, 4.399, 0.7165, [{"runs": [{"text": "Dr. Bartlett Durham donates land for the railroad depot", "options": {"fontSize": 18.0, "color": "4A3224", "fontFace": "Arial", "charSpacing": 0.36}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addTextBox(slide, 5.5208, 5.4194, 4.399, 0.5208, [{"runs": [{"text": "1853", "options": {"fontSize": 34.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 5.5208, 6.0028, 4.399, 0.7165, [{"runs": [{"text": "\"Durham Station\" becomes the town's official name", "options": {"fontSize": 18.0, "color": "4A3224", "fontFace": "Arial", "charSpacing": 0.36}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addTextBox(slide, 10, 5.4194, 4.399, 0.5208, [{"runs": [{"text": "1865", "options": {"fontSize": 34.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 10, 6.0028, 4.399, 0.7165, [{"runs": [{"text": "Civil War ends nearby at Bennett Place", "options": {"fontSize": 18.0, "color": "4A3224", "fontFace": "Arial", "charSpacing": 0.36}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addTextBox(slide, 14.4792, 5.4194, 4.399, 0.5208, [{"runs": [{"text": "1869", "options": {"fontSize": 34.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 14.4792, 6.0028, 4.399, 0.7165, [{"runs": [{"text": "Durham is officially incorporated as a town", "options": {"fontSize": 18.0, "color": "4A3224", "fontFace": "Arial", "charSpacing": 0.36}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addTextBox(slide, 1.0417, 10.3333, 3.5059, 0.3333, [{"runs": [{"text": "DURHAM / FOUNDING", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "03 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 4 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  slide.addImage({ path: "media/image-4-1.jpeg", x: 0, y: 0, w: 20, h: 11.25 });
  addRect(slide, { x: 0, y: 0, w: 20, h: 11.25, fill: "1A0F0A", transparency: 12.0 });
  addTextBox(slide, 1.0417, 2.5669, 11.33, 0.3333, [{"runs": [{"text": "CHAPTER 03 / 1870 – 1900", "options": {"fontSize": 18.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 3.1502, 11.33, 1.8617, [{"runs": [{"text": "King Tobacco and the Bull", "options": {"fontSize": 63.0, "bold": true, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": -0.63}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 1.0417, y: 5.3035, w: 1.25, h: 0.0312, fill: "C89B4A" });
  addTextBox(slide, 1.0417, 5.7515, 8.1542, 2.9733, [{"runs": [{"text": "After the Civil War, soldiers carried home a taste for the bright-leaf tobacco grown around Durham. Factories roared to life. ", "options": {"fontSize": 21.68, "color": "E8DCC2", "fontFace": "Arial"}}, {"text": "Bull Durham Smoking Tobacco ", "options": {"fontSize": 21.68, "bold": true, "color": "D8B677", "fontFace": "Arial"}}, {"text": "became so famous its snorting bull logo shipped worldwide — giving Durham its forever nickname: ", "options": {"fontSize": 21.68, "color": "E8DCC2", "fontFace": "Arial"}}, {"text": "the Bull City", "options": {"fontSize": 21.68, "bold": true, "color": "D8B677", "fontFace": "Arial"}}, {"text": ".", "options": {"fontSize": 21.68, "color": "E8DCC2", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addTextBox(slide, 1.0417, 10.3333, 3.4442, 0.3333, [{"runs": [{"text": "DURHAM / INDUSTRY", "options": {"fontSize": 18.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "04 / 10", "options": {"fontSize": 18.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 5 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addTextBox(slide, 1.0417, 1.6326, 8.1542, 0.3333, [{"runs": [{"text": "CHAPTER 04 / 1902 – TODAY", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 2.216, 8.1542, 1.4281, [{"runs": [{"text": "Durham Bulls & America's Pastime", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 1.0417, y: 3.9357, w: 1.25, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 1.0417, 4.3836, 8.1542, 2.9733, [{"runs": [{"text": "Named for the same bull on the tobacco tins, the ", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Durham Bulls ", "options": {"fontSize": 21.68, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "baseball team took the field in 1902 and never left. A 1988 Hollywood movie made them legendary, and today the team plays at the Durham Bulls Athletic Park — with a giant snorting bull in left field.", "options": {"fontSize": 21.68, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addRect(slide, { x: 1.0417, y: 7.8153, w: 2.3055, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 1.0417, 8.0549, 2.3888, 0.9167, [{"runs": [{"text": "1902", "options": {"fontSize": 63.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 1.0417, 9.034, 2.3888, 0.3333, [{"runs": [{"text": "FIRST SEASON", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
  addRect(slide, { x: 3.8472, y: 7.8153, w: 2.3055, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 3.8472, 8.0549, 2.3888, 0.9167, [{"runs": [{"text": "1988", "options": {"fontSize": 63.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 3.8472, 9.034, 2.3888, 0.625, [{"runs": [{"text": "\"BULL DURHAM\" FILM", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
  addRect(slide, { x: 6.6527, y: 7.8153, w: 2.3055, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 6.6527, 8.0549, 2.3888, 0.9167, [{"runs": [{"text": "10k+", "options": {"fontSize": 63.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 6.6527, 9.034, 2.3888, 0.625, [{"runs": [{"text": "BALLPARK SEATS", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
  slide.addImage({ path: "media/image-5-1.jpeg", x: 10, y: 0, w: 10, h: 11.25 });
  addRect(slide, { x: 10.4167, y: 10.25, w: 4.8115, h: 0.5833, fill: "3A2416" });
  addTextBox(slide, 10.6458, 10.3958, 4.4975, 0.3333, [{"runs": [{"text": "BASEBALL IN THE BULL CITY", "options": {"fontSize": 18.0, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": 2.52}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "05 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 6 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  slide.addImage({ path: "media/image-6-1.jpeg", x: 0, y: 0, w: 10, h: 11.25 });
  addRect(slide, { x: 0.4167, y: 0.4167, w: 6.0583, h: 0.5833, fill: "3A2416" });
  addTextBox(slide, 0.6458, 0.5625, 5.7817, 0.3333, [{"runs": [{"text": "PARRISH STREET · HAYTI DISTRICT", "options": {"fontSize": 18.0, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": 2.52}}], "align": "left"}], "t");
  addRect(slide, { x: 10, y: 0, w: 10, h: 11.25, fill: "F7F0DE" });
  addTextBox(slide, 11.0417, 1.3197, 8.1542, 0.3333, [{"runs": [{"text": "CHAPTER 05 / EARLY 1900S", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 11.0417, 1.903, 8.1542, 1.2549, [{"runs": [{"text": "Black Wall Street: Hayti & Parrish Street", "options": {"fontSize": 42.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.42}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addTextBox(slide, 11.0417, 3.4079, 8.1542, 3.1395, [{"runs": [{"text": "The greatest development of Negro business in one community in America.", "options": {"fontSize": 39.0, "italic": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 115.0}], "t");
  addTextBox(slide, 11.0417, 6.964, 8.1542, 0.7083, [{"runs": [{"text": "— Booker T. Washington, describing Durham in 1911", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial", "charSpacing": 1.68}}], "align": "left"}], "t");
  addTextBox(slide, 11.0417, 8.0057, 8.1542, 1.6745, [{"runs": [{"text": "On Parrish Street and in the Hayti neighborhood, Black Durhamites built banks, insurance companies, barbershops, and theaters. ", "options": {"fontSize": 16.8, "color": "4A3224", "fontFace": "Arial"}}, {"text": "North Carolina Mutual Life Insurance ", "options": {"fontSize": 16.8, "bold": true, "color": "3A2416", "fontFace": "Arial"}}, {"text": "grew into the largest Black-owned business in America.", "options": {"fontSize": 16.8, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 140.0}], "t");
  addTextBox(slide, 1.0417, 10.3333, 2.7367, 0.3333, [{"runs": [{"text": "DURHAM / HAYTI", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "06 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 7 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addTextBox(slide, 1.0417, 1.0417, 18.4542, 0.3333, [{"runs": [{"text": "CHAPTER 06 / JUNE 23, 1957", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 1.625, 18.4542, 1.4281, [{"runs": [{"text": "The Fight for a Seat: Royal Ice Cream Sit-In", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addTextBox(slide, 1.0417, 4.6226, 9.1044, 2.0527, [{"runs": [{"text": "On a hot summer Sunday, seven young people led by ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Rev. Douglas Moore ", "options": {"fontSize": 25.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}, {"text": "walked into the Royal Ice Cream Parlor in Durham and sat down — in the ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "whites-only ", "options": {"fontSize": 25.5, "italic": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "section.", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 142.0}], "t");
  addTextBox(slide, 1.0417, 6.8836, 9.1044, 2.0527, [{"runs": [{"text": "They were arrested. But their protest came ", "options": {"fontSize": 20.4, "color": "4A3224", "fontFace": "Arial"}}, {"text": "nearly three years before ", "options": {"fontSize": 20.4, "bold": true, "color": "3A2416", "fontFace": "Arial"}}, {"text": "the famous Greensboro lunch-counter sit-ins, and it helped spark a movement that would roll across the American South.", "options": {"fontSize": 20.4, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 142.0}], "t");
  addTextBox(slide, 1.0417, 9.1447, 9.1044, 1.0472, [{"runs": [{"text": "Today a historical marker stands at the corner where that small, brave act helped change a country.", "options": {"fontSize": 17.85, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 142.0}], "t");
  slide.addImage({ path: "media/image-7-1.jpeg", x: 10.9225, y: 3.7614, w: 8.0358, h: 7.5 });
  addRect(slide, { x: 11.3392, y: 10.2614, w: 3.8467, h: 0.5833, fill: "3A2416" });
  addTextBox(slide, 11.5684, 10.4072, 3.5037, 0.3333, [{"runs": [{"text": "1957 · DURHAM, N.C.", "options": {"fontSize": 18.0, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": 2.52}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 10.3333, 3.9969, 0.3333, [{"runs": [{"text": "DURHAM / CIVIL RIGHTS", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "07 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 8 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  slide.addImage({ path: "media/image-8-1.jpeg", x: 0, y: 0, w: 10, h: 11.25 });
  addRect(slide, { x: 0.4167, y: 10.25, w: 5.5545, h: 0.5833, fill: "3A2416" });
  addTextBox(slide, 0.6458, 10.3958, 5.2628, 0.3333, [{"runs": [{"text": "GOTHIC STONE · WEST CAMPUS", "options": {"fontSize": 18.0, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": 2.52}}], "align": "left"}], "t");
  addTextBox(slide, 11.0417, 2.1493, 8.1542, 0.3333, [{"runs": [{"text": "CHAPTER 07 / 1838 – 1924", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 11.0417, 2.7326, 8.1542, 1.4281, [{"runs": [{"text": "Trinity Becomes Duke University", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 11.0417, y: 4.4523, w: 1.25, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 11.0417, 4.9002, 8.1542, 2.4847, [{"runs": [{"text": "A small Methodist school called ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Trinity College ", "options": {"fontSize": 25.5, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "moved to Durham in 1892. In 1924, the ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Duke ", "options": {"fontSize": 25.5, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "family — who made their fortune in tobacco — gave the school a gift so large it was renamed in their honor.", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addTextBox(slide, 11.0417, 7.6349, 8.1542, 1.5075, [{"runs": [{"text": "Today, ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Duke University ", "options": {"fontSize": 25.5, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "is one of the most famous universities in the world — and yes, its basketball team is kind of a big deal.", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "08 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 9 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addTextBox(slide, 1.0417, 1.0417, 18.4542, 0.3333, [{"runs": [{"text": "CHAPTER 08 / 1959 – TODAY", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 1.625, 18.4542, 0.7349, [{"runs": [{"text": "From Smokestacks to the Research Triangle", "options": {"fontSize": 48.0, "bold": true, "color": "3A2416", "fontFace": "Arial", "charSpacing": -0.48}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addRect(slide, { x: 1.0417, y: 2.6515, w: 1.25, h: 0.0312, fill: "8A3A2A" });
  addTextBox(slide, 1.0417, 3.3078, 16.0938, 1.5075, [{"runs": [{"text": "By the 1950s, tobacco was fading. Leaders of three universities dreamed up a new kind of industry: a science and technology park in the pine woods between them. In 1959, ", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}, {"text": "Research Triangle Park ", "options": {"fontSize": 25.5, "bold": true, "color": "4A3224", "fontFace": "Arial"}}, {"text": "was born — and Durham's story turned a new page.", "options": {"fontSize": 25.5, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addRect(slide, { x: 1.0417, y: 5.3569, w: 5.6943, h: 3.0703, fill: "F7F0DE", line: { color: "C7B48E", width: 0.75 } });
  addTextBox(slide, 1.4271, 5.7424, 5.0712, 0.3333, [{"runs": [{"text": "POINT 01", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 2.88}}], "align": "left"}], "t");
  addTextBox(slide, 1.4271, 6.2007, 5.0712, 0.4915, [{"runs": [{"text": "Duke University", "options": {"fontSize": 30.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 108.0}], "t");
  addTextBox(slide, 1.4271, 6.8172, 5.0712, 1.2663, [{"runs": [{"text": "Durham's gothic campus — medicine, research, and a very competitive basketball team.", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 140.0}], "t");
  addRect(slide, { x: 7.1527, y: 5.3569, w: 5.6945, h: 3.0703, fill: "F7F0DE", line: { color: "C7B48E", width: 0.75 } });
  addTextBox(slide, 7.5381, 5.7424, 5.0714, 0.3333, [{"runs": [{"text": "POINT 02", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 2.88}}], "align": "left"}], "t");
  addTextBox(slide, 7.5381, 6.2007, 5.0714, 0.4915, [{"runs": [{"text": "UNC Chapel Hill", "options": {"fontSize": 30.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 108.0}], "t");
  addTextBox(slide, 7.5381, 6.8172, 5.0714, 1.2663, [{"runs": [{"text": "The nation's first public university, sitting on the second corner of the triangle.", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 140.0}], "t");
  addRect(slide, { x: 13.2638, y: 5.3569, w: 5.6945, h: 3.0703, fill: "F7F0DE", line: { color: "C7B48E", width: 0.75 } });
  addTextBox(slide, 13.6493, 5.7424, 5.0714, 0.3333, [{"runs": [{"text": "POINT 03", "options": {"fontSize": 18.0, "color": "8A3A2A", "fontFace": "Arial", "charSpacing": 2.88}}], "align": "left"}], "t");
  addTextBox(slide, 13.6493, 6.2007, 5.0714, 0.4915, [{"runs": [{"text": "NC State", "options": {"fontSize": 30.0, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 108.0}], "t");
  addTextBox(slide, 13.6493, 6.8172, 5.0714, 1.2663, [{"runs": [{"text": "Raleigh's engineering powerhouse — and the third point that completes the Triangle.", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 140.0}], "t");
  addTextBox(slide, 1.0417, 10.3333, 4.0315, 0.3333, [{"runs": [{"text": "DURHAM / REINVENTION", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 3.24}}], "align": "left"}], "t");
  addTextBox(slide, 17.8298, 10.3333, 1.2119, 0.3333, [{"runs": [{"text": "09 / 10", "options": {"fontSize": 18.0, "color": "8A7354", "fontFace": "Arial", "charSpacing": 1.8}}], "align": "left"}], "t");
}

// ============================== SLIDE 10 ==============================
{
  const slide = pres.addSlide();
  slide.background = { color: "F3EAD8" };

  addRect(slide, { x: 0, y: 0, w: 20, h: 5.625, fill: "3A2416" });
  addTextBox(slide, 1.0417, 1.4076, 18.4542, 0.3333, [{"runs": [{"text": "CHAPTER 09 / RIGHT NOW", "options": {"fontSize": 18.0, "color": "D8B677", "fontFace": "Arial", "charSpacing": 3.96}}], "align": "left"}], "t");
  addTextBox(slide, 1.0417, 1.9909, 18.4542, 0.8649, [{"runs": [{"text": "Durham Today", "options": {"fontSize": 57.0, "bold": true, "color": "F3EAD8", "fontFace": "Arial", "charSpacing": -0.57}}], "align": "left", "lineSpacingPct": 104.0}], "t");
  addTextBox(slide, 1.0417, 3.0641, 15.0208, 1.5075, [{"runs": [{"text": "The old tobacco warehouses are now restaurants, museums, and concert halls. A city built on leaves and rails has become one of America's most creative and diverse mid-sized cities — still the Bull City, still writing new chapters.", "options": {"fontSize": 25.5, "color": "E8DCC2", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 138.0}], "t");
  addRect(slide, { x: 0, y: 5.625, w: 6.6667, h: 5.625, fill: "F7F0DE" });
  addRect(slide, { x: 6.6562, y: 5.625, w: 0.0104, h: 5.625, fill: "C7B48E" });
  addTextBox(slide, 0.5208, 6.25, 5.783, 0.625, [{"runs": [{"text": "285k", "options": {"fontSize": 42.0, "bold": true, "color": "8A3A2A", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 0.5208, 7.0208, 5.783, 0.5208, [{"runs": [{"text": "Residents", "options": {"fontSize": 25.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left"}], "t");
  addTextBox(slide, 0.5208, 7.6875, 5.783, 0.8291, [{"runs": [{"text": "A growing, remarkably diverse population calls Durham home.", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addRect(slide, { x: 6.6667, y: 5.625, w: 6.6667, h: 5.625, fill: "F7F0DE" });
  addRect(slide, { x: 13.3229, y: 5.625, w: 0.0104, h: 5.625, fill: "C7B48E" });
  addTextBox(slide, 7.1875, 6.25, 5.783, 0.625, [{"runs": [{"text": "1 of", "options": {"fontSize": 42.0, "bold": true, "color": "8A3A2A", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 7.1875, 7.0208, 5.783, 0.5208, [{"runs": [{"text": "America's Food Cities", "options": {"fontSize": 25.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left"}], "t");
  addTextBox(slide, 7.1875, 7.6875, 5.783, 0.8291, [{"runs": [{"text": "From food trucks to world-renowned restaurants on once-empty streets.", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 135.0}], "t");
  addRect(slide, { x: 13.3333, y: 5.625, w: 6.6667, h: 5.625, fill: "F7F0DE" });
  addTextBox(slide, 13.8542, 6.25, 5.7938, 0.625, [{"runs": [{"text": "Next", "options": {"fontSize": 42.0, "bold": true, "color": "8A3A2A", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 100.0}], "t");
  addTextBox(slide, 13.8542, 7.0208, 5.7938, 0.5208, [{"runs": [{"text": "Chapter: You", "options": {"fontSize": 25.5, "bold": true, "color": "3A2416", "fontFace": "Arial"}}], "align": "left"}], "t");
  addTextBox(slide, 13.8542, 7.6875, 5.7938, 0.8291, [{"runs": [{"text": "Every generation of Durhamites adds a page. What will yours say?", "options": {"fontSize": 21.0, "color": "4A3224", "fontFace": "Arial"}}], "align": "left", "lineSpacingPct": 135.0}], "t");
}

pres.writeFile({ fileName: "History_of_Durham.pptx" }).then((name) => {
  console.log("Wrote: " + name);
});
