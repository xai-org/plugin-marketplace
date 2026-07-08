// Nightingale - generated pptxgenjs replica
// Run: npm install pptxgenjs && node nightingale.js
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'CUSTOM', width: 20.0, height: 11.25 });
pptx.layout = 'CUSTOM';

// ---- Embedded image data (base64) ----
const IMG_image_1_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_2_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_3_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_3_2_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_4_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_5_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_5_2_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_5_3_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_5_4_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_7_1_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_7_2_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_7_3_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_7_4_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_7_5_png = 'data:image/png;base64,PLACEHOLDER';
const IMG_image_8_1_png = 'data:image/png;base64,PLACEHOLDER';

// ============ Slide 1 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addImage({
    x: 2.1875, y: -2.1875, w: 15.625, h: 15.625,
    data: IMG_image_1_1_png,
    transparency: 30.0,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.0,
    y: 0.0,
    w: 20.0,
    h: 11.25,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.6719,
    y: 3.3385,
    w: 0.8333,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addText([
    { text: '✦', options: {
        fontSize: 19.5,
        fontFace: 'Georgia',
        color: 'B21F24',
        charSpacing: 6.75,
        align: 'left'
      } }
  ], {
    x: 6.7552,
    y: 3.1901,
    w: 0.3918,
    h: 0.349,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'AN ORIGINAL MOTION PICTURE', options: {
        fontSize: 13.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 6.75,
        align: 'left'
      } }
  ], {
    x: 7.3137,
    y: 3.237,
    w: 5.5337,
    h: 0.2552,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '✦', options: {
        fontSize: 19.5,
        fontFace: 'Georgia',
        color: 'B21F24',
        charSpacing: 6.75,
        align: 'left'
      } }
  ], {
    x: 12.9363,
    y: 3.1901,
    w: 0.3918,
    h: 0.349,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4948,
    y: 3.3385,
    w: 0.8333,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 2.5385,
    y: 4.1224,
    w: 14.9229,
    h: 2.625,
    fill: {
        color: 'F6EFDE'
      },
  });
  slide.addText([
    { text: 'Nightingale', options: {
        fontSize: 210.0,
        fontFace: 'Georgia',
        color: '000000',
        italic: true,
        charSpacing: -4.2,
        align: 'left',
        lineSpacingMultiple: 0.9
      } }
  ], {
    x: 2.5385,
    y: 4.1224,
    w: 15.3706,
    h: 2.6667,
    shadow: {
        type: 'outer',
        color: 'B21F24',
        blur: 60.0,
        offset: 4.0,
        angle: 270,
        opacity: 0.15
      },
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.1146,
    y: 7.2422,
    w: 1.25,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.5729,
    y: 7.1641,
    w: 0.1667,
    h: 0.1667,
    line: {
        color: 'B6AD9B',
        width: 0.75
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.9479,
    y: 7.1953,
    w: 0.1042,
    h: 0.1042,
    rotate: 45.0,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.2604,
    y: 7.1641,
    w: 0.1667,
    h: 0.1667,
    line: {
        color: 'B6AD9B',
        width: 0.75
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 10.6354,
    y: 7.2422,
    w: 1.25,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addText([
    { text: 'Some songs are heard only once.', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        charSpacing: 1.13,
        align: 'left'
      } }
  ], {
    x: 7.4671,
    y: 7.7057,
    w: 5.2176,
    h: 0.3958,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'FEATURE TREATMENT · VOL. I', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 10.1562,
    w: 3.2713,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'DRAFT 04 · 2026', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 9.3892,
    y: 10.1562,
    w: 1.9157,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'EYES ONLY · 047 / 220', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 16.3931,
    y: 10.1562,
    w: 2.6486,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 0.6667,
    y: 0.5391,
    w: 0.0833,
    h: 0.0833,
    fill: {
        color: 'B21F24'
      },
    shadow: {
        type: 'outer',
        color: 'B21F24',
        blur: 9.0,
        offset: 4.0,
        angle: 270,
        opacity: 1.0
      },
  });
  slide.addText([
    { text: 'REC · 24.000 FPS', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.9375,
    y: 0.5,
    w: 1.9036,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'CLASSIFIED // EYES ONLY', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'right'
      } }
  ], {
    x: 16.6334,
    y: 0.5,
    w: 2.7,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 2 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 1.3255,
    w: 0.5208,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'THE LOGLINE', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 3.15,
        align: 'left'
      } }
  ], {
    x: 1.7083,
    y: 1.25,
    w: 1.5304,
    h: 0.2135,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'A premise in one breath.', options: {
        fontSize: 18.0,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 1.5677,
    w: 8.5127,
    h: 0.3281,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'A disgraced operative is recalled from exile to chase a stolen ', options: {
        fontSize: 45.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.12
      } },
    { text: 'cipher ', options: {
        fontSize: 45.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true
      } },
    { text: 'across three continents — only to find the woman who buried her career is the only person alive who can save it.', options: {
        fontSize: 45.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true
      } }
  ], {
    x: 1.0417,
    y: 2.874,
    w: 8.5127,
    h: 4.9413,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 8.1685,
    w: 8.2647,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 82.0
      },
  });
  slide.addText([
    { text: 'GENRE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 8.5956,
    w: 2.5605,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Espionage Thriller', options: {
        fontSize: 18.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 8.8456,
    w: 2.5605,
    h: 0.3281,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'TONE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 3.9355,
    y: 8.5956,
    w: 2.5605,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Cold · Romantic · Lethal', options: {
        fontSize: 18.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left'
      } }
  ], {
    x: 3.9355,
    y: 8.8456,
    w: 2.5605,
    h: 0.6146,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'COMPARABLE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 6.8293,
    y: 8.5956,
    w: 2.5605,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Tinker Tailor × Heat', options: {
        fontSize: 18.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left'
      } }
  ], {
    x: 6.8293,
    y: 8.8456,
    w: 2.5605,
    h: 0.3281,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 10.2439,
    y: 0.0,
    w: 9.7561,
    h: 10.4602,
    fill: {
        color: '1A1612'
      },
  });
  slide.addImage({
    x: 10.2439, y: 0.0, w: 9.7561, h: 10.4602,
    data: IMG_image_2_1_png,
  });
  slide.addText([
    { text: 'Venice, after rain.', options: {
        fontSize: 27.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 10.6606,
    y: 9.4185,
    w: 3.5104,
    h: 0.4167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PLATE 01 · F2.0 · 1/48 · ISO 800', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 10.6606,
    y: 9.8977,
    w: 3.5104,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◉ ESTABLISHING', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 2.25,
        align: 'right'
      } }
  ], {
    x: 18.0089,
    y: 9.6894,
    w: 1.5745,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'EXT. NIGHT', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.25,
        align: 'right'
      } }
  ], {
    x: 18.0089,
    y: 9.8977,
    w: 1.5745,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 10.6606,
    y: 0.4193,
    w: 0.125,
    h: 0.125,
    line: {
        color: 'B21F24',
        width: 0.75
      },
  });
  slide.addText([
    { text: 'FRAME 047 / 220', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.47,
        align: 'left'
      } }
  ], {
    x: 10.8897,
    y: 0.4167,
    w: 1.6338,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: '02 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 3 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 2.527,
    w: 17.9167,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 80.0
      },
  });
  slide.addText([
    { text: 'The Protagonist', options: {
        fontSize: 78.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        charSpacing: -1.56,
        align: 'left',
        lineSpacingMultiple: 0.9
      } }
  ], {
    x: 1.0417,
    y: 0.9375,
    w: 7.6968,
    h: 1.0166,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '// DOSSIER 04A · SUBJECT PROFILE · SECTION 9 (REV.)', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 2.0374,
    w: 7.6968,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 16.9983,
    y: 1.0687,
    w: 1.9583,
    h: 0.4896,
    rotate: -3.0,
    line: {
        color: 'B21F24',
        width: 1.5
      },
  });
  slide.addText([
    { text: 'CLASSIFIED', options: {
        fontSize: 12.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        bold: true,
        charSpacing: 3.6,
        align: 'left'
      } }
  ], {
    x: 17.2275,
    y: 1.2145,
    w: 1.5833,
    h: 0.2396,
    rotate: -3.0,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 15.19,
    y: 1.7041,
    w: 3.7708,
    h: 0.4896,
    rotate: 2.0,
    line: {
        color: 'B6AD9B',
        width: 1.5
      },
  });
  slide.addText([
    { text: 'FILE OPENED 17.03.2026', options: {
        fontSize: 12.0,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        bold: true,
        charSpacing: 3.6,
        align: 'left'
      } }
  ], {
    x: 15.4191,
    y: 1.8499,
    w: 3.4256,
    h: 0.2396,
    rotate: 2.0,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 3.0583,
    w: 3.9583,
    h: 5.6458,
    fill: {
        color: '0B0A08'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 82.0
      },
  });
  slide.addImage({
    x: 1.5625, y: 4.7354, w: 2.9167, h: 3.9583,
    data: IMG_image_3_1_png,
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 2.5417,
    y: 4.952,
    w: 0.9583,
    h: 0.9583,
    line: {
        color: 'B21F24',
        width: 0.75,
        transparency: 15.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0521,
    y: 3.0687,
    w: 3.9375,
    h: 5.625,
    fill: {
        color: 'F1E9D8',
        transparency: 96.0
      },
  });
  slide.addText([
    { text: 'SUBJECT 047', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 1.1979,
    y: 8.4176,
    w: 1.1573,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◉ REC', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 4.3556,
    y: 8.4176,
    w: 0.5715,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addImage({
    x: 3.2188, y: 6.9229, w: 2.0833, h: 2.0833,
    data: IMG_image_3_2_png,
    transparency: 50.0,
  });
  slide.addText([
    { text: 'VALE, IRIS M.', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 8.8499,
    w: 1.3525,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'HEIGHT 5\'7" · BLOOD A−', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 2.8521,
    y: 8.8499,
    w: 2.2313,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'CODENAME', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 5.7292,
    y: 3.0583,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Nightingale', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 5.7292,
    y: 3.2874,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'GIVEN NAME', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 12.6562,
    y: 3.0583,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Iris M. Vale', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 12.6562,
    y: 3.2874,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ORIGIN', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 5.7292,
    y: 3.9645,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Edinburgh, UK', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 5.7292,
    y: 4.1937,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'SERVICE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 12.6562,
    y: 3.9645,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'SIS · Section 9 (rev.)', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 12.6562,
    y: 4.1937,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'STATUS', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 5.7292,
    y: 4.8708,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Inactive — Recalled', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 5.7292,
    y: 5.0999,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'LANGUAGES', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 12.6562,
    y: 4.8708,
    w: 6.4911,
    h: 0.1875,
    valign: 'middle',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'EN · RU · MN · FR', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.1
      } }
  ], {
    x: 12.6562,
    y: 5.0999,
    w: 6.4911,
    h: 0.3854,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.7292,
    y: 5.7979,
    w: 0.0208,
    h: 1.3561,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'Forty-one. A linguist before she was a killer. Burned out of Moscow Station after a job that was never supposed to leave a body. She has spent six years pouring whisky in a hotel bar in Reykjavík, waiting for the phone that was never going to ring — until it did.', options: {
        fontSize: 15.75,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        align: 'left',
        lineSpacingMultiple: 1.55
      } }
  ], {
    x: 6.0,
    y: 5.7979,
    w: 7.304,
    h: 1.3978,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'MARKSMANSHIP', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 5.7292,
    y: 7.5081,
    w: 1.255,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '09 / 10', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 11.3999,
    y: 7.5081,
    w: 0.7668,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.7292,
    y: 7.7008,
    w: 6.3542,
    h: 0.0312,
    fill: {
        color: 'F1E9D8',
        transparency: 88.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.7292,
    y: 7.7008,
    w: 5.7188,
    h: 0.0312,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'LINGUISTICS', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6042,
    y: 7.5081,
    w: 1.1573,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '10 / 10', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 18.2749,
    y: 7.5081,
    w: 0.7668,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.6042,
    y: 7.7008,
    w: 6.3542,
    h: 0.0312,
    fill: {
        color: 'F1E9D8',
        transparency: 88.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.6042,
    y: 7.7008,
    w: 6.3542,
    h: 0.0312,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'HAND-TO-HAND', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 5.7292,
    y: 7.9613,
    w: 1.255,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '07 / 10', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 11.3999,
    y: 7.9613,
    w: 0.7668,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.7292,
    y: 8.154,
    w: 6.3542,
    h: 0.0312,
    fill: {
        color: 'F1E9D8',
        transparency: 88.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.7292,
    y: 8.154,
    w: 4.4479,
    h: 0.0312,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'TRUST', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6042,
    y: 7.9613,
    w: 0.5715,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '02 / 10', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 18.2749,
    y: 7.9613,
    w: 0.7668,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.6042,
    y: 8.154,
    w: 6.3542,
    h: 0.0312,
    fill: {
        color: 'F1E9D8',
        transparency: 88.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.6042,
    y: 8.154,
    w: 1.2708,
    h: 0.0312,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: '03 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PG. 03 OF 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'right'
      } }
  ], {
    x: 17.8848,
    y: 10.5885,
    w: 1.4486,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 4 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 2.2166,
    w: 17.9167,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: 'Four cities. One ledger.', options: {
        fontSize: 63.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 0.95
      } }
  ], {
    x: 1.0417,
    y: 0.8333,
    w: 9.3404,
    h: 0.8729,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '// CHAPTER II · PRINCIPAL LOCATIONS · ROUTE 047', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 1.8104,
    w: 9.3404,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 13.9492,
    y: 1.8416,
    w: 0.1042,
    h: 0.1042,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'PLOT POINT', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.8,
        align: 'left'
      } }
  ], {
    x: 14.1576,
    y: 1.8208,
    w: 1.0859,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 15.4935,
    y: 1.8833,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'TRAVEL VECTOR', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.8,
        align: 'left'
      } }
  ], {
    x: 15.806,
    y: 1.8208,
    w: 1.3867,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 17.4427,
    y: 1.8885,
    w: 0.2083,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addText([
    { text: 'SURVEILLANCE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.8,
        align: 'left'
      } }
  ], {
    x: 17.7552,
    y: 1.8208,
    w: 1.2865,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addImage({
    x: 1.0417, y: 2.6437, w: 9.7735, h: 7.7729,
    data: IMG_image_4_1_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.4402,
    y: 2.6437,
    w: 0.0208,
    h: 1.8338,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'I', options: {
        fontSize: 36.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 11.711,
    y: 3.3106,
    w: 0.8125,
    h: 0.5417,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Reykjavík', options: {
        fontSize: 27.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 12.6902,
    y: 3.1257,
    w: 4.7901,
    h: 0.4167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ICELAND · N° 01', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6902,
    y: 3.5632,
    w: 4.7901,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'A bar. The phone call that pulls her back into the world.', options: {
        fontSize: 11.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.4
      } }
  ], {
    x: 12.6902,
    y: 3.7768,
    w: 4.0771,
    h: 0.2604,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '64.1466° N', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 3.3341,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '21.9426° W', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 3.4643,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '00:00 · COLD OPEN', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 17.5074,
    y: 3.657,
    w: 1.4509,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.4402,
    y: 4.6234,
    w: 0.0208,
    h: 1.8339,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: 'II', options: {
        fontSize: 36.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 11.711,
    y: 5.2903,
    w: 0.8125,
    h: 0.5417,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Tangier', options: {
        fontSize: 27.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 12.6902,
    y: 5.1054,
    w: 4.873,
    h: 0.4167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'MOROCCO · N° 02', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6902,
    y: 5.5429,
    w: 4.873,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Rooftop chase at dawn. The first body on her hands.', options: {
        fontSize: 11.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.4
      } }
  ], {
    x: 12.6902,
    y: 5.7564,
    w: 4.0771,
    h: 0.2604,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '35.7595° N', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 5.3137,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '5.8340° W', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.2343,
    y: 5.4439,
    w: 0.8074,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '00:24 · INCITING', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 17.5879,
    y: 5.6366,
    w: 1.3704,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.4402,
    y: 6.6031,
    w: 0.0208,
    h: 1.8338,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: 'III', options: {
        fontSize: 36.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 11.711,
    y: 7.27,
    w: 0.8125,
    h: 0.5417,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Ulaanbaatar', options: {
        fontSize: 27.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 12.6902,
    y: 7.0851,
    w: 4.873,
    h: 0.4167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'MONGOLIA · N° 03', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6902,
    y: 7.5226,
    w: 4.873,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'A train across the steppe. A handler with two faces.', options: {
        fontSize: 11.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.4
      } }
  ], {
    x: 12.6902,
    y: 7.7362,
    w: 4.0771,
    h: 0.2604,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '47.8864° N', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 7.2935,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '106.9057° E', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.0734,
    y: 7.4237,
    w: 0.9683,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '01:18 · REVERSAL', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 17.5879,
    y: 7.6164,
    w: 1.3704,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.4402,
    y: 8.5828,
    w: 0.0208,
    h: 1.8339,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: 'IV', options: {
        fontSize: 36.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 11.711,
    y: 9.2497,
    w: 0.8125,
    h: 0.5417,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Venice', options: {
        fontSize: 27.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 12.6902,
    y: 9.0648,
    w: 5.0387,
    h: 0.4167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ITALY · N° 04', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.6902,
    y: 9.5023,
    w: 5.0387,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Carnival. A ballroom. The choice.', options: {
        fontSize: 11.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.4
      } }
  ], {
    x: 12.6902,
    y: 9.7158,
    w: 4.0771,
    h: 0.2604,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '45.4408° N', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 9.2731,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '12.3155° E', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 18.1539,
    y: 9.4033,
    w: 0.8878,
    h: 0.1719,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '01:48 · CLIMAX', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 0.83,
        align: 'right'
      } }
  ], {
    x: 17.7488,
    y: 9.596,
    w: 1.2096,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: '04 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 5 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.0,
    y: 0.0,
    w: 20.0,
    h: 11.25,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addImage({
    x: 0.8333, y: 3.5417, w: 1.25, h: 4.1667,
    data: IMG_image_5_1_png,
  });
  slide.addImage({
    x: 17.9167, y: 3.5417, w: 1.25, h: 4.1667,
    data: IMG_image_5_2_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 2.1875,
    y: 1.7207,
    w: 0.625,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'FRAGMENT · ACT II · PG. 64', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 4.2,
        align: 'left'
      } }
  ], {
    x: 3.0,
    y: 1.6452,
    w: 3.9135,
    h: 0.2135,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '“', options: {
        fontSize: 210.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        align: 'left',
        lineSpacingMultiple: 0.5
      } }
  ], {
    x: 2.1875,
    y: 2.2337,
    w: 1.2796,
    h: 1.5,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'You taught me that a clean exit is the only kind worth taking. ', options: {
        fontSize: 66.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        charSpacing: -0.79,
        align: 'left',
        lineSpacingMultiple: 1.08
      } },
    { text: 'I am here to teach you that you were wrong.', options: {
        fontSize: 66.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        charSpacing: -0.79
      } }
  ], {
    x: 2.1875,
    y: 4.9316,
    w: 16.0938,
    h: 3.0116,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 2.1875,
    y: 9.2063,
    w: 0.8333,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addText([
    { text: '— Iris Vale', options: {
        fontSize: 31.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left'
      } }
  ], {
    x: 3.2708,
    y: 8.8183,
    w: 3.368,
    h: 0.5365,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'INT. TRAIN · NIGHT · SCENE 47', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        italic: true,
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 3.2708,
    y: 9.4589,
    w: 3.368,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addImage({
    x: 0.8333, y: 0.8333, w: 2.0833, h: 2.0833,
    data: IMG_image_5_3_png,
  });
  slide.addImage({
    x: 17.0833, y: 8.3333, w: 2.0833, h: 2.0833,
    data: IMG_image_5_4_png,
    rotate: 180.0,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'FRAGMENT · ACT II', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 0.5,
    w: 2.0173,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PG. 64', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'right'
      } }
  ], {
    x: 18.5674,
    y: 0.5,
    w: 0.766,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '05 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'SCENE 47', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'right'
      } }
  ], {
    x: 18.3398,
    y: 10.5885,
    w: 0.9935,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 6 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addText([
    { text: 'Three acts. Three cities. Three lies.', options: {
        fontSize: 63.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 0.95
      } }
  ], {
    x: 1.0417,
    y: 0.8333,
    w: 13.844,
    h: 0.8729,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '// STRUCTURE · RUNTIME 128 MIN · PACING MAP', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 1.8104,
    w: 13.844,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'TOTAL RUNTIME', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.44,
        align: 'right'
      } }
  ], {
    x: 16.9769,
    y: 1.0604,
    w: 1.9814,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '02:08', options: {
        fontSize: 45.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        charSpacing: 2.44,
        align: 'right'
      } }
  ], {
    x: 16.9769,
    y: 1.2583,
    w: 1.9814,
    h: 0.75,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 2.3833,
    w: 17.9167,
    h: 0.1042,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0521,
    y: 2.3937,
    w: 5.3687,
    h: 0.0833,
    fill: {
        color: 'B21F24',
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.4208,
    y: 2.3937,
    w: 8.9479,
    h: 0.0833,
    fill: {
        color: 'B21F24',
        transparency: 50.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.4208,
    y: 2.3937,
    w: 0.0104,
    h: 0.0833,
    fill: {
        color: 'F1E9D8',
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 15.3687,
    y: 2.3937,
    w: 3.5791,
    h: 0.0833,
    fill: {
        color: 'B21F24',
        transparency: 15.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 15.3687,
    y: 2.3937,
    w: 0.0104,
    h: 0.0833,
    fill: {
        color: 'F1E9D8',
        transparency: 80.0
      },
  });
  slide.addText([
    { text: '00:00', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '00:38', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 5.8738,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '00:38', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 6.4167,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '01:42', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 14.8321,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '01:42', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 15.375,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '02:08', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.65,
        align: 'left'
      } }
  ], {
    x: 18.4154,
    y: 2.5708,
    w: 0.5429,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.0034,
    y: 3.076,
    w: 0.0104,
    h: 7.3407,
    fill: {
        color: 'F1E9D8',
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 1.0417,
    y: 3.451,
    w: 1.2917,
    h: 1.2917,
    line: {
        color: 'B21F24',
        width: 1.5
      },
  });
  slide.addText([
    { text: 'I', options: {
        fontSize: 54.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 1.5413,
    y: 3.7218,
    w: 0.3756,
    h: 0.7917,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ACT I — SETUP · 38 MIN', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 4.9927,
    w: 5.7114,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'The Recall', options: {
        fontSize: 34.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.05
      } }
  ], {
    x: 1.0417,
    y: 5.2427,
    w: 5.7114,
    h: 0.5448,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'A bartender in exile is offered a name. The name leads to a vault. The vault leads to a corpse — one that is supposed to be hers.', options: {
        fontSize: 14.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        align: 'left',
        lineSpacingMultiple: 1.55
      } }
  ], {
    x: 1.0417,
    y: 5.9333,
    w: 5.7114,
    h: 0.9618,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 7.0409,
    w: 5.5451,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'COLD OPEN · REYKJAVÍK BAR', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 1.0417,
    y: 7.2389,
    w: 5.7114,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'THE PHONE CALL', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 1.0417,
    y: 7.4763,
    w: 5.7114,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'THE VAULT, THE BODY', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 1.0417,
    y: 7.7138,
    w: 5.7114,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'FIRST FLIGHT EAST', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 1.0417,
    y: 7.9513,
    w: 5.7114,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'REYKJAVÍK → TANGIER', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 9.9375,
    w: 2.107,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '30%', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 6.2672,
    y: 9.9375,
    w: 0.4029,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.9757,
    y: 3.076,
    w: 0.0104,
    h: 7.3407,
    fill: {
        color: 'F1E9D8',
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 7.5138,
    y: 3.451,
    w: 1.2917,
    h: 1.2917,
    line: {
        color: 'B21F24',
        width: 1.5
      },
  });
  slide.addText([
    { text: 'II', options: {
        fontSize: 54.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 7.8674,
    y: 3.7218,
    w: 0.6678,
    h: 0.7917,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ACT II — CONFRONTATION · 64 MIN', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 7.5138,
    y: 4.9927,
    w: 5.1965,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'The Long Road East', options: {
        fontSize: 34.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.05
      } }
  ], {
    x: 7.5138,
    y: 5.2427,
    w: 5.1965,
    h: 0.5448,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'She follows the cipher across a continent and a marriage of convenience. The handler reveals himself. So does she.', options: {
        fontSize: 14.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        align: 'left',
        lineSpacingMultiple: 1.55
      } }
  ], {
    x: 7.5138,
    y: 5.9333,
    w: 5.1965,
    h: 0.6551,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.5138,
    y: 6.7342,
    w: 5.0452,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'TANGIER ROOFTOPS AT DAWN', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 7.5138,
    y: 6.9321,
    w: 5.1965,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'THE HANDLER\'S CONFESSION', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 7.5138,
    y: 7.1696,
    w: 5.1965,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'TRAIN · STEPPE · BETRAYAL', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 7.5138,
    y: 7.4071,
    w: 5.1965,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'MIDPOINT REVERSAL', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 7.5138,
    y: 7.6445,
    w: 5.1965,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'TANGIER → ULAANBAATAR', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 7.5138,
    y: 9.9375,
    w: 2.32,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '50%', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 12.2394,
    y: 9.9375,
    w: 0.4029,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 13.4861,
    y: 3.451,
    w: 1.2917,
    h: 1.2917,
    line: {
        color: 'B21F24',
        width: 1.5
      },
  });
  slide.addText([
    { text: 'III', options: {
        fontSize: 54.0,
        fontFace: 'Georgia',
        color: 'B21F24',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 13.6935,
    y: 3.7218,
    w: 0.96,
    h: 0.7917,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ACT III — RESOLUTION · 26 MIN', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.7,
        align: 'left'
      } }
  ], {
    x: 13.4861,
    y: 4.9927,
    w: 5.6363,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'The Carnival', options: {
        fontSize: 34.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.05
      } }
  ], {
    x: 13.4861,
    y: 5.2427,
    w: 5.6363,
    h: 0.5448,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Venice in February. A masked ball. A choice between the asset, the woman, and the version of herself she came back to bury.', options: {
        fontSize: 14.25,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        align: 'left',
        lineSpacingMultiple: 1.55
      } }
  ], {
    x: 13.4861,
    y: 5.9333,
    w: 5.6363,
    h: 0.6551,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4861,
    y: 6.7342,
    w: 5.4722,
    h: 0.0104,
    fill: {
        color: 'F1E9D8',
        transparency: 85.0
      },
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'THE BALLROOM, THE MASK', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 13.4861,
    y: 6.9321,
    w: 5.6363,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'THE CIPHER EXCHANGED', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 13.4861,
    y: 7.1696,
    w: 5.6363,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'A CLEAN EXIT REFUSED', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 13.4861,
    y: 7.4071,
    w: 5.6363,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '◆ ', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 1.62,
        align: 'left',
        lineSpacingMultiple: 1.9
      } },
    { text: 'FINAL IMAGE · CANAL', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.62
      } }
  ], {
    x: 13.4861,
    y: 7.6445,
    w: 5.6363,
    h: 0.2791,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'VENICE', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 13.4861,
    y: 9.9375,
    w: 0.7224,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '20%', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: 'F1E9D8',
        charSpacing: 2.25,
        align: 'left'
      } }
  ], {
    x: 18.6387,
    y: 9.9375,
    w: 0.4029,
    h: 0.1875,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: '06 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 7 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addText([
    { text: 'Brass, smoke, and rain on glass.', options: {
        fontSize: 63.0,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 0.95
      } }
  ], {
    x: 1.0417,
    y: 0.8333,
    w: 13.0602,
    h: 0.8729,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '// VISUAL LANGUAGE · CINEMATOGRAPHY · PRODUCTION DESIGN', options: {
        fontSize: 9.75,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.93,
        align: 'left'
      } }
  ], {
    x: 1.0417,
    y: 1.8104,
    w: 13.0602,
    h: 0.1979,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PALETTE', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 16.0874,
    y: 1.714,
    w: 0.7668,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 16.8333,
    y: 1.5916,
    w: 0.375,
    h: 0.375,
    fill: {
        color: '0B0A08'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 17.2708,
    y: 1.5916,
    w: 0.375,
    h: 0.375,
    fill: {
        color: '1C1813'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 17.7083,
    y: 1.5916,
    w: 0.375,
    h: 0.375,
    fill: {
        color: 'B21F24'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.1458,
    y: 1.5916,
    w: 0.375,
    h: 0.375,
    fill: {
        color: 'C9A35A'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.5833,
    y: 1.5916,
    w: 0.375,
    h: 0.375,
    fill: {
        color: 'F1E9D8'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 80.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0417,
    y: 2.2791,
    w: 6.6094,
    h: 8.1375,
    fill: {
        color: '14110D'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addImage({
    x: 1.0521, y: 2.2896, w: 6.5885, h: 8.1167,
    data: IMG_image_7_1_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0521,
    y: 2.2896,
    w: 6.5885,
    h: 8.1167,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.1979,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.1979,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.2865,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.474,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'REF · 01', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B21F24',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 1.4271,
    y: 2.4771,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '35.75° N', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 6.7137,
    y: 2.4771,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Tangier, dawn', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 1.2396,
    y: 9.9062,
    w: 2.1632,
    h: 0.3542,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'F1.8 · 1/96 · 800 ISO', options: {
        fontSize: 7.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 5.5345,
    y: 10.0938,
    w: 2.002,
    h: 0.1667,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.7969,
    y: 2.2791,
    w: 5.5078,
    h: 3.9958,
    fill: {
        color: '14110D'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addImage({
    x: 7.8073, y: 2.2896, w: 5.487, h: 3.975,
    data: IMG_image_7_2_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.8073,
    y: 2.2896,
    w: 5.487,
    h: 3.975,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.9531,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.9531,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.9401,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.1276,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'REF · 02', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.3674,
    y: 2.4771,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Train, blue hour', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 7.9948,
    y: 5.7646,
    w: 2.369,
    h: 0.3542,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'ANAMORPHIC · 2.39:1', options: {
        fontSize: 7.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 11.3709,
    y: 5.9521,
    w: 1.8192,
    h: 0.1667,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4505,
    y: 2.2791,
    w: 5.5078,
    h: 3.9958,
    fill: {
        color: '14110D'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addImage({
    x: 13.4609, y: 2.2896, w: 5.487, h: 3.975,
    data: IMG_image_7_3_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4609,
    y: 2.2896,
    w: 5.487,
    h: 3.975,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.6068,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.6068,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.5938,
    y: 2.4354,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.7812,
    y: 2.4354,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'REF · 03', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 18.021,
    y: 2.4771,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'The cipher', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 13.6484,
    y: 5.7646,
    w: 1.5579,
    h: 0.3542,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PROP · BRASS · 1962', options: {
        fontSize: 7.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 17.0246,
    y: 5.9521,
    w: 1.8192,
    h: 0.1667,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.7969,
    y: 6.4208,
    w: 5.5078,
    h: 3.9958,
    fill: {
        color: '14110D'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addImage({
    x: 7.8073, y: 6.4312, w: 5.487, h: 3.975,
    data: IMG_image_7_4_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.8073,
    y: 6.4312,
    w: 5.487,
    h: 3.975,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.9531,
    y: 6.5771,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.9531,
    y: 6.5771,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 12.9401,
    y: 6.5771,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.1276,
    y: 6.5771,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'REF · 04', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 12.3674,
    y: 6.6187,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Hotel, 4 a.m.', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 7.9948,
    y: 9.9062,
    w: 1.8847,
    h: 0.3542,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PRACTICAL · TUNGSTEN', options: {
        fontSize: 7.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 11.2795,
    y: 10.0938,
    w: 1.9106,
    h: 0.1667,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4505,
    y: 6.4208,
    w: 5.5078,
    h: 3.9958,
    fill: {
        color: '14110D'
      },
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addImage({
    x: 13.4609, y: 6.4312, w: 5.487, h: 3.975,
    data: IMG_image_7_5_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.4609,
    y: 6.4312,
    w: 5.487,
    h: 3.975,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.6068,
    y: 6.5771,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 13.6068,
    y: 6.5771,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.5938,
    y: 6.5771,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 18.7812,
    y: 6.5771,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: 'REF · 05', options: {
        fontSize: 8.25,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 18.021,
    y: 6.6187,
    w: 0.8644,
    h: 0.1719,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Carnival mask', options: {
        fontSize: 22.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        italic: true,
        align: 'left',
        lineSpacingMultiple: 1.0
      } }
  ], {
    x: 13.6484,
    y: 9.9062,
    w: 2.1496,
    h: 0.3542,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'VENICE · ACT III', options: {
        fontSize: 7.5,
        fontFace: 'Consolas',
        color: 'B6AD9B',
        charSpacing: 2.06,
        align: 'left'
      } }
  ], {
    x: 17.2987,
    y: 10.0938,
    w: 1.5451,
    h: 0.1667,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addText([
    { text: '07 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

// ============ Slide 8 ============
{
  const slide = pptx.addSlide();
  slide.background = { color: '0B0A08' };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.0,
    y: 0.0,
    w: 20.0,
    h: 11.25,
    fill: {
        color: 'F1E9D8',
        transparency: 98.0
      },
  });
  slide.addImage({
    x: 8.7499, y: 2.612, w: 2.5, h: 2.5,
    data: IMG_image_8_1_png,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.6703,
    y: 5.6328,
    w: 10.6593,
    h: 1.875,
    fill: {
        color: 'F6EFDE'
      },
  });
  slide.addText([
    { text: 'Nightingale', options: {
        fontSize: 150.0,
        fontFace: 'Georgia',
        color: '000000',
        italic: true,
        charSpacing: -3.0,
        align: 'center',
        lineSpacingMultiple: 0.9
      } }
  ], {
    x: 4.5104,
    y: 5.6328,
    w: 10.979,
    h: 1.9167,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.5103,
    y: 7.8672,
    w: 1.25,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.9478,
    y: 7.8203,
    w: 0.1042,
    h: 0.1042,
    rotate: 45.0,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 10.2395,
    y: 7.8672,
    w: 1.25,
    h: 0.0104,
    fill: {
        color: 'B6AD9B'
      },
  });
  slide.addText([
    { text: 'Coming · Winter MMXXVII', options: {
        fontSize: 25.5,
        fontFace: 'Georgia',
        color: 'B6AD9B',
        italic: true,
        align: 'center'
      } }
  ], {
    x: 4.5104,
    y: 8.237,
    w: 10.979,
    h: 0.4427,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'PRODUCTION', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'center'
      } }
  ], {
    x: 3.3563,
    y: 9.974,
    w: 1.1484,
    h: 0.1875,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'An Original Feature', options: {
        fontSize: 13.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        bold: true,
        italic: true,
        charSpacing: 0.68,
        align: 'center'
      } }
  ], {
    x: 0.9563,
    y: 10.2031,
    w: 5.8652,
    h: 0.2552,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'CREDIT', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'center'
      } }
  ], {
    x: 9.6804,
    y: 9.974,
    w: 0.7224,
    h: 0.1875,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'Written · Directed · Produced', options: {
        fontSize: 13.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        bold: true,
        italic: true,
        charSpacing: 0.68,
        align: 'center'
      } }
  ], {
    x: 7.0673,
    y: 10.2031,
    w: 5.8652,
    h: 0.2552,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'YEAR', options: {
        fontSize: 9.0,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 2.25,
        align: 'center'
      } }
  ], {
    x: 15.898,
    y: 9.974,
    w: 0.5094,
    h: 0.1875,
    valign: 'top',
    marginLeft: 0.0,
    marginTop: 0.0,
    marginRight: 0.0,
    marginBottom: 0.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '© 2026 — All Rights Reserved', options: {
        fontSize: 13.5,
        fontFace: 'Georgia',
        color: 'F1E9D8',
        bold: true,
        italic: true,
        charSpacing: 0.68,
        align: 'center'
      } }
  ], {
    x: 13.1784,
    y: 10.2031,
    w: 5.8653,
    h: 0.2552,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3333,
    y: 0.3333,
    w: 19.3333,
    h: 10.5833,
    line: {
        color: 'F1E9D8',
        width: 0.75,
        transparency: 90.0
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 0.25,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 0.25,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.25,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.5417,
    y: 10.9792,
    w: 0.2083,
    h: 0.0208,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 19.7292,
    y: 10.7917,
    w: 0.0208,
    h: 0.2083,
    fill: {
        color: 'B21F24'
      },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 0.6667,
    y: 0.5391,
    w: 0.0833,
    h: 0.0833,
    fill: {
        color: 'B21F24'
      },
    shadow: {
        type: 'outer',
        color: 'B21F24',
        blur: 9.0,
        offset: 4.0,
        angle: 270,
        opacity: 1.0
      },
  });
  slide.addText([
    { text: 'END · TRANSMISSION', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.9375,
    y: 0.5,
    w: 2.1311,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: 'FADE TO BLACK', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'right'
      } }
  ], {
    x: 17.771,
    y: 0.5,
    w: 1.5623,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
  slide.addText([
    { text: '08 / 08', options: {
        fontSize: 10.5,
        fontFace: 'Consolas',
        color: '6F6757',
        charSpacing: 1.89,
        align: 'left'
      } }
  ], {
    x: 0.6667,
    y: 10.5885,
    w: 0.8797,
    h: 0.2031,
    valign: 'top',
    marginLeft: 2.0,
    marginTop: 2.0,
    marginRight: 2.0,
    marginBottom: 2.0,
    wrap: true,
    fit: 'shrink',
    shape: pptx.ShapeType.rect,
  });
}

pptx.writeFile({ fileName: 'nightingale.pptx' }).then(fn => console.log('Wrote: ' + fn));