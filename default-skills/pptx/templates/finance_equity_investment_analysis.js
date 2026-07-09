// Auto-generated PptxGenJS code from: SahasraVellanki - xAI Deck (1).pptx
// Generated: 2026-04-20T08:27:10.839Z
// Run: node SahasraVellanki - xAI Deck.cjs

const PptxGenJS = require('pptxgenjs');

async function main() {
  const pptx = new PptxGenJS();
  pptx.author = 'pptx2code';
  pptx.title = 'SahasraVellanki - xAI Deck (1)';
  pptx.defineLayout({ name: 'CUSTOM', width: 10, height: 5.625 });
  pptx.layout = 'CUSTOM';

  pptx.defineSlideMaster({
    title: 'slideLayout7',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout10',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout11',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout12',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout1',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout2',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout3',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout4',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout5',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout6',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout9',
  });

  pptx.defineSlideMaster({
    title: 'slideLayout8',
  });

  // ── Slide 1 (slideLayout2) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout2' });
    slide.background = { color: '141414' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image1.png',
      x: 0,
      y: 0,
      w: 10,
      h: 5.625
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image2.png',
      x: 1.1743,
      y: 1.5424,
      w: 2.5516,
      h: 2.5403
    });
    slide.addShape('line', {
      x: 4.015,
      y: 3.0353,
      w: 3.9187,
      h: 0,
      line: { color: 'C00000', width: 2.25, type: 'solid' }
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image3.png',
      x: 3.9668,
      y: 0.6741,
      w: 3.8313,
      h: 3.8313
    });
  }

  // ── Slide 2 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addShape('arc', {
      x: -3.3883,
      y: 2.7139,
      w: 18.7677,
      h: 21.2523,
      rotate: 322.92715,
      line: { color: 'FAFAFA', width: 3, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Tesla Investment Analysis', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s valuation is driven by electric vehicle scale, margin pressure, AI, & energy expansion', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 12.1958,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.7441,
      y: 2.3633,
      w: 5.4141,
      h: 1.5
    });
    slide.addShape('ellipse', {
      x: 0.8257,
      y: 3.2411,
      w: 1.3129,
      h: 1.31,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 3.1783,
      y: 2.5629,
      w: 1.31,
      h: 1.31,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 5.5095,
      y: 2.5629,
      w: 1.31,
      h: 1.31,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 7.8642,
      y: 3.2411,
      w: 1.31,
      h: 1.31,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image6.png',
      x: 1.021,
      y: 3.4292,
      w: 0.9388,
      h: 0.9388
    });
    slide.addShape('rect', {
      x: -0.3333,
      y: 2.1339,
      w: 0.202,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      shrinkText: false,
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image7.png',
      x: 3.4219,
      y: 2.8414,
      w: 0.7993,
      h: 0.7993
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image8.png',
      x: 5.685,
      y: 2.7542,
      w: 0.9273,
      h: 0.9273
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image9.png',
      x: 8.1215,
      y: 3.4893,
      w: 0.8239,
      h: 0.8239
    });
    slide.addText([{ text: 'Sales Growth ', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: 'is slowing', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.3515,
      y: 2.4997,
      w: 2.1454,
      h: 0.6425,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Self-driving & AI', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: 'is future growth', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.0759,
      y: 1.8126,
      w: 2.1454,
      h: 0.6425,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Price cuts ', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: 'reducing margins', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 2.7607,
      y: 1.8126,
      w: 2.1454,
      h: 0.6425,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Battery storage & energy expanding', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 7.3903,
      y: 2.4997,
      w: 2.1454,
      h: 0.6425,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 3 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Investment Thesis', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s valuation reflects long-term growth bets despite weakening near-term fundamentals', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.633,
      y: 2.3898,
      w: 5.4141,
      h: 1.5
    });
    slide.addShape('roundRect', {
      x: 0.465,
      y: 1.3573,
      w: 2.0244,
      h: 0.8099,
      fill: { type: 'gradient', stops: [{ position: 6, color: '0B466C' }, { position: 92, color: '031E40' }], direction: 180 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0.415,
      y: 1.3096,
      w: 2.0244,
      h: 0.8099,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '358K', options: { bold: true, color: '031E40', fontFace: 'Avenir Black' } }], {
      x: 0.415,
      y: 1.3106,
      w: 0.855,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 2.8581,
      y: 1.3573,
      w: 2.0244,
      h: 0.8099,
      fill: { type: 'gradient', stops: [{ position: 6, color: '0B466C' }, { position: 92, color: '031E40' }], direction: 180 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 2.8081,
      y: 1.3096,
      w: 2.0244,
      h: 0.8099,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 5.2512,
      y: 1.3573,
      w: 2.0244,
      h: 0.8099,
      fill: { type: 'gradient', stops: [{ position: 6, color: '0B466C' }, { position: 92, color: '031E40' }], direction: 180 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 5.2012,
      y: 1.3096,
      w: 2.0244,
      h: 0.8099,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 7.6443,
      y: 1.3573,
      w: 2.0244,
      h: 0.8099,
      fill: { type: 'gradient', stops: [{ position: 6, color: '0B466C' }, { position: 92, color: '031E40' }], direction: 180 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 7.5943,
      y: 1.3096,
      w: 2.0244,
      h: 0.8099,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '8.8 GWh', options: { bold: true, color: '031E40', fontFace: 'Avenir Black' } }], {
      x: 2.7932,
      y: 1.3106,
      w: 1.3813,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '60-70x P/E', options: { bold: true, color: '031E40', fontFace: 'Avenir Black' } }], {
      x: 5.2012,
      y: 1.3106,
      w: 1.545,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '$1.1T', options: { bold: true, color: '031E40', fontFace: 'Avenir Black' } }], {
      x: 7.5943,
      y: 1.3074,
      w: 1.545,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Q1 2026 deliveries (missed consensus) ', options: { fontSize: 13, color: '000000', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.4011,
      y: 1.3074,
      w: 2.0234,
      h: 1.1107,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy storage ', options: { fontSize: 13, color: '000000', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '(down QoQ)', options: { fontSize: 13, color: '000000', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 2.824,
      y: 1.3074,
      w: 2.0234,
      h: 1.1107,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Elevated vs competitors', options: { fontSize: 13, color: '000000', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 5.1942,
      y: 1.3074,
      w: 2.0234,
      h: 1.1107,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Market cap reflects future expectations', options: { fontSize: 13, color: '000000', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 7.5943,
      y: 1.3078,
      w: 2.0234,
      h: 1.1107,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4293,
      y: 2.7605,
      w: 5.1633,
      h: 0.6781,
      fill: { type: 'none' },
      line: { color: '031E40', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Core business weakening', options: { bold: true, fontSize: 14, fontFace: 'Avenir Medium', align: 'center', paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 1.627,
      y: 2.5366,
      w: 2.5187,
      h: 0.4504,
      fill: { color: '0F0F0F' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s automotive segment is showing signs of strain, with deliveries missing expectations and growth slowing', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.3098,
      y: 2.8696,
      w: 5.4141,
      h: 0.5385,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4293,
      y: 3.7179,
      w: 5.1633,
      h: 0.6781,
      fill: { type: 'none' },
      line: { color: '031E40', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Energy growth remains uneven', options: { bold: true, fontSize: 14, fontFace: 'Avenir Medium', align: 'center', paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 1.4464,
      y: 3.4939,
      w: 3.1291,
      h: 0.4504,
      fill: { color: '0F0F0F' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy storage is a key long-term opportunity, but recent deployments declined sequentially, highlighting volatility', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.3098,
      y: 3.827,
      w: 5.4141,
      h: 0.7573,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4293,
      y: 4.6985,
      w: 5.1633,
      h: 0.6781,
      fill: { type: 'none' },
      line: { color: '031E40', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Future tied to AI & robotics', options: { bold: true, fontSize: 14, fontFace: 'Avenir Medium', align: 'center', paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 1.55,
      y: 4.4746,
      w: 2.6725,
      h: 0.4504,
      fill: { color: '0F0F0F' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Progress in FSD, robotaxi, & Optimus supports long-term potential, but timelines remain uncertain', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.3098,
      y: 4.8076,
      w: 5.4141,
      h: 0.5385,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Industry Trends', options: { bold: true, fontSize: 15, color: '000000', fontFace: 'Avenir Heavy', align: 'center' } }], {
      x: 0.4253,
      y: 2.2666,
      w: 5.1633,
      h: 0.3137,
      fill: { color: '031E40', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Investment Implications', options: { bold: true, fontSize: 15, color: '000000', fontFace: 'Avenir Heavy', align: 'center' } }], {
      x: 5.8824,
      y: 2.2648,
      w: 3.695,
      h: 0.3107,
      fill: { color: '0B466C', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('line', {
      x: 5.9798,
      y: 2.6412,
      w: 0,
      h: 2.7354,
      line: { color: '000000', width: 1, type: 'solid', dashType: 'sysDot' }
    });
    slide.addText([{ text: '1', options: { bold: true, color: '0B466C', fontFace: 'Avenir Black' } }], {
      x: 5.8044,
      y: 2.8401,
      w: 0.351,
      h: 0.4039,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '2', options: { bold: true, color: '0B466C', fontFace: 'Avenir Black' } }], {
      x: 5.8044,
      y: 3.4859,
      w: 0.351,
      h: 0.4039,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '3', options: { bold: true, color: '0B466C', fontFace: 'Avenir Black' } }], {
      x: 5.8044,
      y: 4.1372,
      w: 0.351,
      h: 0.4039,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Near-term performance driven by weakness in core automotive business', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 6.0795,
      y: 2.7693,
      w: 3.485,
      h: 0.5385,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Current valuation depends on successful execution in AI, energy, and robotics', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 6.0795,
      y: 3.4054,
      w: 3.695,
      h: 0.7573,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Execution risk remains high with uncertain timelines & regulatory dependence', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 6.0568,
      y: 4,
      w: 3.695,
      h: 0.5385,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '4', options: { bold: true, color: '0B466C', fontFace: 'Avenir Black' } }], {
      x: 5.8044,
      y: 4.782,
      w: 0.351,
      h: 0.4039,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s premium valuation increases downside risk if expectations are unmet', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 6.0795,
      y: 4.6985,
      w: 3.5688,
      h: 0.5385,
      fill: { type: 'none' },
      shadow: { type: 'outer', blur: 8, offset: 2.83, angle: 45, color: '000000', opacity: 0.75 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Source: Tesla Q1 2026 production, deliveries, and deployments release (April 2026); company filings; consensus estimates; public market data; internal analysis', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3961,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 4 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addShape('rtTriangle', {
      x: 6.1838,
      y: 2.9337,
      w: 0.3474,
      h: 0.5894,
      rotate: 218.77065,
      flipH: true,
      flipV: true,
      fill: { color: '031E40' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    try {
      slide.addChart(pptx.charts.LINE, [
        { name: 'Series', labels: ['44927', '45017', '45108', '45200', '45292', '45383', '45474', '45566', '45627', '45717', '45809', '45901', '46023', '46113'], values: [100, 133.33333333333331, 217.07317073170734, 162.60162601626016, 152.03252032520325, 139.02439024390242, 188.6178861788618, 211.3821138211382, 390.2439024390244, 349.59349593495938, 317.07317073170731, 333.33333333333337, 365.85365853658539, 278.86178861788619] },
      ], { x: 0.2747, y: 1.6632, w: 6.6103, h: 3.8912, showLegend: false, fill: 'FFFFFF', plotArea: { fill: { color: 'FFFFFF' }, border: { color: 'FFFFFF', pt: 0 } }, chartColors: ['0B466C'] });
    } catch(e) { console.error('Chart error:', e.message); }
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.633,
      y: 2.3898,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Tesla’s share price has experienced sharp swings, reflecting sensitivity to market conditions', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla Share Price Performance', options: { fontSize: 36, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rtTriangle', {
      x: 4.263,
      y: 1.4479,
      w: 0.3474,
      h: 0.5894,
      rotate: 47.971066666666665,
      flipH: true,
      flipV: true,
      fill: { color: '031E40' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Pullback in 2026 from delivery misses', options: { fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Book', align: 'center' } }], {
      x: 5.3431,
      y: 3.2283,
      w: 1.3343,
      h: 0.4039,
      fill: { color: '031E40' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'AI / Automation driven rally', options: { fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Book', align: 'center' } }], {
      x: 4.1515,
      y: 1.3462,
      w: 1.2285,
      h: 0.4039,
      fill: { color: '031E40' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.885,
      y: 1.3462,
      w: 2.8404,
      h: 1.2048,
      fill: { color: '0B466C', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Performance is Volatile', options: { fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.885,
      y: 1.2877,
      w: 2.8404,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s share price has experienced sharp swings since 2023, reflecting sensitivity to both company-specific developments & market conditions', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 6.885,
      y: 1.6793,
      w: 2.8404,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.885,
      y: 2.6985,
      w: 2.8404,
      h: 1.2048,
      fill: { color: '0B466C', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Weak Momentum', options: { fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.885,
      y: 2.64,
      w: 2.8404,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Despite prior gains, the stock declined in early 2026 following delivery misses, highlighting inconsistent short-term momentum', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 6.885,
      y: 3.0316,
      w: 2.8404,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.885,
      y: 4.0496,
      w: 2.8404,
      h: 1.2048,
      fill: { color: '0B466C', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Valuation Bias', options: { fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.885,
      y: 4.0108,
      w: 2.8404,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Current pricing reflects long-term expectations for AI, autonomy, and energy expansion, with limited support from near-term fundamentals', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 6.885,
      y: 4.4023,
      w: 2.8404,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Source: Yahoo Finance, Tesla historical stock price data (2023–2026)', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 5 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.5586,
      y: 2.4135,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'After reaching a peak in 2023, Tesla has entered a period of declining deliveries & demand', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Vehicle Delivery Volatility', options: { fontSize: 38, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '-8.6%', options: { bold: true, fontSize: 48, color: 'CC0000', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 0.4551,
      y: 2.3522,
      w: 1.4833,
      h: 0.9088,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.9581,
      y: 2.4406,
      w: 0.05,
      h: 0.6276,
      flipH: true,
      fill: { color: 'CC0000' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_5_93'
    });
    slide.addText([{ text: 'Deliveries declined YoY in 2025, marking first annual drop', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 2.0648,
      y: 2.4683,
      w: 3.0471,
      h: 0.5722,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '1.81M', options: { bold: true, fontSize: 48, color: 'CC0000', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 0.4051,
      y: 1.4213,
      w: 1.5333,
      h: 0.9088,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.9577,
      y: 1.5098,
      w: 0.05,
      h: 0.6276,
      flipH: true,
      fill: { color: 'CC0000' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_5_96'
    });
    slide.addText([{ text: 'Peak deliveries reached in 2023 before growth reversed', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 2.0648,
      y: 1.5375,
      w: 3.0471,
      h: 0.5722,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '+50K', options: { bold: true, fontSize: 48, color: 'CC0000', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 0.4651,
      y: 4.2258,
      w: 1.4833,
      h: 0.9088,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.9577,
      y: 4.3143,
      w: 0.05,
      h: 0.6276,
      flipH: true,
      fill: { color: 'CC0000' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_5_99'
    });
    slide.addText([{ text: 'Production exceeded deliveries, indicating inventory pressure', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 2.0748,
      y: 4.342,
      w: 3.0471,
      h: 0.5722,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '358K', options: { bold: true, fontSize: 48, color: 'CC0000', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 0.4076,
      y: 3.2949,
      w: 1.5333,
      h: 0.9088,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.9577,
      y: 3.3834,
      w: 0.05,
      h: 0.6276,
      flipH: true,
      fill: { color: 'CC0000' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_5_102'
    });
    slide.addText([{ text: 'Q1 2026 deliveries missed expectations, weak demand', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 2.0673,
      y: 3.4111,
      w: 3.0471,
      h: 0.5722,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 5.4566,
      y: 1.3383,
      w: 4.2687,
      h: 3.9218,
      fill: { color: 'FAFAFA', transparency: 50 },
      shadow: { type: 'outer', blur: 9, offset: 3, angle: 90, color: '000000', opacity: 0.19 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6922,
      y: 2.2473,
      w: 3.7392,
      h: 0.0643,
      fill: { color: '0B466C', transparency: 22 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6158,
      y: 1.4637,
      w: 3.9407,
      h: 0.7834,
      fill: { color: '0B466C', transparency: 45 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla is no longer in a hyper-growth phase, with deliveries declining after a 2023 peak', options: { fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.6227,
      y: 1.7175,
      w: 3.9407,
      h: 0.5049,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 5.6992,
      y: 3.1875,
      w: 3.7392,
      h: 0.0643,
      fill: { color: '031E40', transparency: 22 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6227,
      y: 2.4039,
      w: 3.9407,
      h: 0.7834,
      fill: { color: '031E40', transparency: 45 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6922,
      y: 4.1278,
      w: 3.7392,
      h: 0.0643,
      fill: { color: '0B466C', transparency: 22 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6158,
      y: 3.3441,
      w: 3.9407,
      h: 0.7834,
      fill: { color: '0B466C', transparency: 45 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6992,
      y: 5.068,
      w: 3.7392,
      h: 0.0643,
      fill: { color: '031E40', transparency: 22 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 5.6227,
      y: 4.2844,
      w: 3.9407,
      h: 0.7834,
      fill: { color: '031E40', transparency: 45 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Growth has structurally slowed', options: { bold: true, fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 5.6088,
      y: 1.4614,
      w: 3.9616,
      h: 0.3198,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Near-term outlook remains weak', options: { bold: true, fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 5.6227,
      y: 2.4128,
      w: 3.9407,
      h: 0.3198,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.6297,
      y: 2.6729,
      w: 3.9407,
      h: 0.5049,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Higher bar for future growth', options: { bold: true, fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 5.5933,
      y: 3.3459,
      w: 3.9616,
      h: 0.3198,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla must rely on new drivers (AI, autonomy, energy) to offset slowing core auto growth', options: { fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.6088,
      y: 3.5975,
      w: 3.9407,
      h: 0.5049,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Price and margins at risk', options: { bold: true, fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 5.6297,
      y: 4.2973,
      w: 3.9407,
      h: 0.3198,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Rising inventory levels may require price cuts, putting additional pressure on margins', options: { fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.6384,
      y: 4.5309,
      w: 3.9407,
      h: 0.5049,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Source: Tesla Investor Relations; Reuters; Visible Alpha consensus', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 6 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.5586,
      y: 2.4135,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Automotive decline outweighs growth in energy and services, driving revenue contraction', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla Revenue Decline', options: { fontSize: 38, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.7893,
      y: 1.3485,
      w: 0.6008,
      h: 0.6008,
      fill: { color: 'FFFFFF' },
      line: { color: 'FFFFFF', width: 1.5, type: 'solid' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_129'
    });
    slide.addText([{ text: 'AUTOMOTIVE', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 1.1176,
      y: 3.3249,
      w: 2.0881,
      h: 0.3366,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 1.1493,
      y: 3.1474,
      w: 2.0712,
      h: 0.05,
      fill: { color: '031E40' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_131'
    });
    slide.addShape('rect', {
      x: 1.0013,
      y: 2.1457,
      w: 2.3574,
      h: 1.0017,
      fill: { color: '031E40', transparency: 86 },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_132'
    });
    slide.addText([{ text: '↓ -10% YoY', options: { bold: true, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 0.6953,
      y: 2.1634,
      w: 2.0881,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '$69.5B revenue | 73% of total', options: { fontSize: 11, color: '818181', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }], {
      x: 0.9299,
      y: 2.532,
      w: 2.5105,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Primary driver of overall decline', options: { italic: true, fontSize: 11, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 1.0013,
      y: 2.8062,
      w: 2.5834,
      h: 0.2861,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 4.6913,
      y: 1.3663,
      w: 0.6008,
      h: 0.6008,
      fill: { color: 'FFFFFF' },
      line: { color: 'FFFFFF', width: 1.5, type: 'solid' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_136'
    });
    slide.addText([{ text: 'ENERGY', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 4.1062,
      y: 3.3379,
      w: 2.0881,
      h: 0.3366,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 7.7312,
      y: 1.3663,
      w: 0.6008,
      h: 0.6008,
      fill: { color: 'FFFFFF' },
      line: { color: 'FFFFFF', width: 1.5, type: 'solid' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_138'
    });
    slide.addText([{ text: 'SERVICES', options: { fontSize: 14, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.998,
      y: 3.3249,
      w: 2.0881,
      h: 0.3366,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 4.0472,
      y: 3.1474,
      w: 2.0712,
      h: 0.05,
      fill: { color: '0B466C' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_140'
    });
    slide.addShape('rect', {
      x: 3.8992,
      y: 2.1457,
      w: 2.3574,
      h: 1.0017,
      fill: { color: '0B466C', transparency: 86 },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_141'
    });
    slide.addText([{ text: '$12.8B revenue | 13% of total', options: { fontSize: 11, color: '818181', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }], {
      x: 3.8278,
      y: 2.5321,
      w: 2.5105,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Fastest-growing segment', options: { italic: true, fontSize: 11, color: '818181', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 3.7955,
      y: 2.8199,
      w: 2.5834,
      h: 0.2861,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '↑ +27% YoY', options: { bold: true, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 3.6018,
      y: 2.1457,
      w: 2.0881,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 6.9548,
      y: 3.1474,
      w: 2.0712,
      h: 0.05,
      fill: { color: '818181' },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_145'
    });
    slide.addShape('rect', {
      x: 6.8068,
      y: 2.1457,
      w: 2.3574,
      h: 1.0017,
      fill: { color: '818181', transparency: 86 },
      valign: 'top',
      margin: [0, 0, 0, 0],
      objectName: 'cg_6_146'
    });
    slide.addText([{ text: '$12.5B revenue | 13% of total', options: { fontSize: 11, color: '818181', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }], {
      x: 6.7354,
      y: 2.5321,
      w: 2.5105,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Steady secondary growth', options: { italic: true, fontSize: 11, color: '818181', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 6.7199,
      y: 2.8063,
      w: 2.5834,
      h: 0.2861,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '↑ +19% YoY', options: { bold: true, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.5246,
      y: 2.1457,
      w: 2.0881,
      h: 0.4039,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image10.png',
      x: 1.8651,
      y: 1.4216,
      w: 0.4529,
      h: 0.4529
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image11.png',
      x: 4.7872,
      y: 1.4648,
      w: 0.4039,
      h: 0.4039
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image12.png',
      x: 7.8369,
      y: 1.4625,
      w: 0.4061,
      h: 0.4061
    });
    slide.addShape('line', {
      x: 0.5462,
      y: 3.853,
      w: 8.9193,
      h: 0,
      flipH: true,
      line: { color: 'FFFFFF', width: 1, type: 'solid' }
    });
    slide.addText([{ text: 'Implications', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 4.3634,
      y: 3.6944,
      w: 1.5737,
      h: 0.3871,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 2.2274,
      y: 4.5573,
      w: 1.0464,
      h: 0.7783,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0.1964,
      y: 4.1679,
      w: 1.0464,
      h: 0.9218,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0.2556,
      y: 4.2304,
      w: 2.9633,
      h: 1.0485,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Core business is weak', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black' } }], {
      x: 0.2481,
      y: 4.2403,
      w: 3.238,
      h: 0.3871,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.2785,
      y: 4.5373,
      w: 2.9247,
      h: 1.0098,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 5.5054,
      y: 4.5573,
      w: 1.0464,
      h: 0.7783,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 3.4744,
      y: 4.1679,
      w: 1.0464,
      h: 0.9218,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 3.5336,
      y: 4.2304,
      w: 2.9633,
      h: 1.0485,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 8.7833,
      y: 4.5573,
      w: 1.0464,
      h: 0.7783,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7523,
      y: 4.1679,
      w: 1.0464,
      h: 0.9218,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.8115,
      y: 4.2304,
      w: 2.9633,
      h: 1.0485,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Growth is shifting', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black' } }], {
      x: 3.5313,
      y: 4.257,
      w: 3.238,
      h: 0.3871,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy and services are scaling quickly, but remain too small to offset core weakness', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 3.5458,
      y: 4.5373,
      w: 2.9247,
      h: 1.0098,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Transition takes time', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black' } }], {
      x: 6.802,
      y: 4.2575,
      w: 3.238,
      h: 0.3871,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Meaningful diversification requires sustained growth in non-auto segments over years', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 6.8262,
      y: 4.5547,
      w: 2.9247,
      h: 1.0098,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Source: Tesla Investor Relations; Company filings (10-K, 10-Q)', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 7 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.5586,
      y: 2.4135,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Margins declined through 2024 before rebounding in 2025, but remain below 2022 peak', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Gross Margin Trends', options: { fontSize: 38, color: 'FFFFFF', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    try {
      slide.addChart(pptx.charts.LINE, [
        { name: 'Margin', labels: ['Q1’23', 'Q2’23', 'Q3’23', 'Q4’23', 'Q1’24', 'Q2’24', 'Q3’24', 'Q4’24', 'Q1’25', 'Q2’25', 'Q3’25', 'Q4’25'], values: [0.193, 0.182, 0.17899999999999999, 0.17599999999999999, 0.17399999999999999, 0.18, 0.19800000000000001, 0.16300000000000001, 0.16300000000000001, 0.17199999999999999, 0.18, 0.20100000000000001] },
      ], { x: 0.4051, y: 1.3653, w: 5.6574, h: 3.8912, showLegend: false, fill: 'FFFFFF', plotArea: { fill: { color: 'FFFFFF' }, border: { color: 'FFFFFF', pt: 0 } }, chartColors: ['031E40'] });
    } catch(e) { console.error('Chart error:', e.message); }
    slide.addShape('rtTriangle', {
      x: 3.9277,
      y: 2.8238,
      w: 0.2863,
      h: 0.528,
      rotate: 218.77065,
      flipH: true,
      flipV: true,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '16.3% ', options: { bold: true, fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }, { text: '- margin trough', options: { fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Book', align: 'center' } }], {
      x: 2.8974,
      y: 3.1308,
      w: 1.4979,
      h: 0.2524,
      fill: { color: '0B466C' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rtTriangle', {
      x: 5.35,
      y: 1.6119,
      w: 0.2863,
      h: 0.528,
      flipH: true,
      flipV: true,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '20.1% ', options: { bold: true, fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }, { text: '- recovery Q4’25', options: { fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Book', align: 'center' } }], {
      x: 4.2222,
      y: 1.5473,
      w: 1.5893,
      h: 0.2524,
      fill: { color: '818181' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rtTriangle', {
      x: 3.4859,
      y: 1.6119,
      w: 0.2863,
      h: 0.528,
      flipH: true,
      flipV: true,
      fill: { color: '031E40' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '25.6% ', options: { bold: true, fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }, { text: '- 2022 Peak', options: { fontSize: 9, color: 'FFFFFF', fontFace: 'Avenir Book', align: 'center' } }], {
      x: 2.641,
      y: 1.5538,
      w: 1.3064,
      h: 0.2524,
      fill: { color: '031E40' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.0766,
      y: 1.5486,
      w: 3.5184,
      h: 1.0536,
      fill: { type: 'none' },
      line: { color: 'CC0000', width: 1, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 1.3783,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'FFFFFF' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 1.3783,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'CC0000', transparency: 35 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Following a 2022 peak, margins declined steadily through 2024 as Tesla implemented price cuts to support demand, alongside normalization in input costs and mix', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 6.0922,
      y: 1.7408,
      w: 3.4782,
      h: 1.0603,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.0766,
      y: 2.9092,
      w: 3.5184,
      h: 1.0536,
      fill: { type: 'none' },
      line: { color: 'CC0000', width: 1, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 2.7278,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'FFFFFF' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 2.7278,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'CC0000', transparency: 35 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Margins reached a trough around ~16% in late 2024 / early 2025, indicating a reset in pricing dynamics and a new baseline for profitability, meaning lower total profits', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 6.2376,
      y: 3.0858,
      w: 3.2069,
      h: 1.0603,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 6.0766,
      y: 4.2532,
      w: 3.5184,
      h: 1.0536,
      fill: { type: 'none' },
      line: { color: 'CC0000', width: 1, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 4.0719,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'FFFFFF' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.7634,
      y: 4.0719,
      w: 2.1878,
      h: 0.3602,
      fill: { color: 'C00000', transparency: 35 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Margins have rebounded to ~20% in recent quarters, reflecting early improvement, but remain meaningfully below prior peak levels, suggesting incomplete recovery', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 6.2068,
      y: 4.4555,
      w: 3.2891,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Margins Compressed', options: { bold: true, fontSize: 15, color: 'FAFAFA', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.6549,
      y: 1.395,
      w: 2.4045,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Stabilization', options: { bold: true, fontSize: 15, color: 'FAFAFA', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.6705,
      y: 2.7323,
      w: 2.3617,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Recovery Emerging', options: { bold: true, fontSize: 15, color: 'FAFAFA', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 6.6915,
      y: 4.0764,
      w: 2.3617,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla, Q4 2024 Shareholder Deck (and other quarterly updates)', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 8 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.5586,
      y: 2.4135,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Rapid deployment, strong margins, & expanding capacity position energy as Tesla’s growth', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Energy Storage as ', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }, { text: 'Growt', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium' } }, { text: 'h Engine', options: { fontSize: 38, fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '1', options: { bold: true, fontSize: 70, color: 'CC0000', fontFace: 'Garamond', align: 'center' } }], {
      x: -0.0214,
      y: 1.2732,
      w: 1.5333,
      h: 1.279,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '2', options: { bold: true, fontSize: 70, color: 'CC0000', fontFace: 'Garamond', align: 'center' } }], {
      x: -0.0214,
      y: 2.5734,
      w: 1.5333,
      h: 1.279,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '3', options: { bold: true, fontSize: 70, color: 'CC0000', fontFace: 'Garamond', align: 'center' } }], {
      x: -0.0214,
      y: 3.9324,
      w: 1.5333,
      h: 1.279,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy storage is scaling at a rapid pace, with deployments accelerating meaningfully as Tesla expands capacity and benefits from strong utility and grid-level demand tailwinds', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 0.8972,
      y: 1.6076,
      w: 3.461,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy revenue is growing significantly faster than automotive, indicating a structural shift in Tesla’s growth mix as non-vehicle segments begin to contribute more to top-line expansion', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 0.942,
      y: 2.9642,
      w: 3.461,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Energy economics are improving with scale, as higher margins and operating leverage position the segment as a key driver of long-term profitability and diversification', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 0.942,
      y: 4.3148,
      w: 3.461,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '46.7 GWh', options: { bold: true, fontSize: 30, color: 'CC0000', fontFace: 'Garamond' } }], {
      x: 5,
      y: 1.7783,
      w: 1.9519,
      h: 0.6059,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '$12.8B', options: { bold: true, fontSize: 30, color: 'CC0000', fontFace: 'Garamond' } }], {
      x: 5,
      y: 2.7705,
      w: 1.6845,
      h: 0.6059,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '30%', options: { bold: true, fontSize: 30, color: 'CC0000', fontFace: 'Garamond' } }], {
      x: 5,
      y: 3.9234,
      w: 1.9239,
      h: 0.6059,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'FY2025 deployments, up 49% YoY', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 5.028,
      y: 2.2349,
      w: 1.9959,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'FY2025 energy revenue, up 27% YoY outpacing total company growth', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 5.028,
      y: 3.2293,
      w: 1.9239,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Q4’25 gross margin, indicating stronger unit economics vs.  automotives', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 5.028,
      y: 4.3862,
      w: 2.2959,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '90GWh', options: { bold: true, fontSize: 20, color: 'CC0000', fontFace: 'Garamond' } }], {
      x: 7.4498,
      y: 2.3265,
      w: 1.9959,
      h: 0.4376,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'target manufacturing capacity by 2026', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 7.4778,
      y: 2.6673,
      w: 1.8958,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '8.8 GWh', options: { bold: true, fontSize: 20, color: 'CC0000', fontFace: 'Garamond' } }], {
      x: 7.4498,
      y: 3.4878,
      w: 1.9239,
      h: 0.4376,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Q1 2026 deployments, reflecting short-term seasonality', options: { fontSize: 11, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 7.4778,
      y: 3.8224,
      w: 2.0977,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Key performance trends and drivers….', options: { fontSize: 12, color: 'FAFAFA', fontFace: 'Avenir Medium' } }], {
      x: 5,
      y: 1.5386,
      w: 3.461,
      h: 0.3029,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Source: Tesla Q4’25 Shareholder Deck; Q1’26 Delivery Report; Form 10-K', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 9 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -6.4337,
      y: 2.4507,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.8589,
      y: -1.3383,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Tesla’s advantage is grounded in deployment, manufacturing process, & proprietary data', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium', paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla’s Next-Generation Portfolio', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('ellipse', {
      x: 1.2276,
      y: 3.2347,
      w: 0.6697,
      h: 0.6697,
      fill: { color: '0B466C' },
      line: { color: '0B466C', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('line', {
      x: 0.6062,
      y: 3.5643,
      w: 1.9239,
      h: 0,
      line: { color: '0B466C', width: 1, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 0.5948,
      y: 1.9453,
      w: 1.9353,
      h: 3.3348,
      fill: { type: 'none' },
      line: { color: '0B466C', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Early deployment underway, but not yet scaled', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.5564,
      y: 2.3394,
      w: 1.9894,
      h: 0.8372,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Testing has begun in Austin with limited removal of in-car safety monitoring, signaling early operational validation rather than fully scaled autonomy', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.5908,
      y: 3.9506,
      w: 1.9353,
      h: 1.128,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('ellipse', {
      x: 3.5403,
      y: 3.2347,
      w: 0.6697,
      h: 0.6697,
      fill: { color: '031E40' },
      line: { color: '031E40', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('line', {
      x: 2.9189,
      y: 3.5643,
      w: 1.9239,
      h: 0.0483,
      line: { color: '031E40', width: 1, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 2.9075,
      y: 1.9453,
      w: 1.9353,
      h: 3.3348,
      fill: { type: 'none' },
      line: { color: '031E40', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Transitioning from prototype to manufacturable system', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 2.8535,
      y: 2.1519,
      w: 1.9894,
      h: 1.2356,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Gen 3 is the first design intended for mass production, with initial production infrastructure being installed & SOP targeted before the end of 2026 fiscal year', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 2.9035,
      y: 3.9506,
      w: 1.9353,
      h: 1.128,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('ellipse', {
      x: 5.853,
      y: 3.2347,
      w: 0.6697,
      h: 0.6697,
      fill: { color: 'CC0000' },
      line: { color: 'CC0000', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('line', {
      x: 5.2316,
      y: 3.5643,
      w: 1.9239,
      h: 0,
      line: { color: 'CC0000', width: 1, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 5.2202,
      y: 1.9453,
      w: 1.9353,
      h: 3.3348,
      fill: { type: 'none' },
      line: { color: 'CC0000', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Entering production with focus on commercial use cases', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 5.2316,
      y: 2.1519,
      w: 1.9199,
      h: 1.2356,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Production is planned  for 2026, focused on commercial fleet applications where electrification and operating efficiency  drive adoption', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 5.2162,
      y: 3.9506,
      w: 1.9353,
      h: 1.128,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('ellipse', {
      x: 8.1657,
      y: 3.2347,
      w: 0.6697,
      h: 0.6697,
      fill: { color: '818181' },
      line: { color: '818181', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('line', {
      x: 7.5443,
      y: 3.5643,
      w: 1.9239,
      h: 0,
      line: { color: '818181', width: 1, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 7.5329,
      y: 1.9453,
      w: 1.9353,
      h: 3.3348,
      fill: { type: 'none' },
      line: { color: '818181', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Scaling as Tesla’s core long-term advantage', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Avenir Medium', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 7.5443,
      y: 2.1519,
      w: 1.8609,
      h: 1.2356,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'FSD Supervised continues to scale through software rollout and massive real-world data accumulation, supported by Tesla’s in-house AI chip roadmap', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 7.5289,
      y: 3.9506,
      w: 1.9353,
      h: 1.128,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Robotaxi', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 0.7813,
      y: 1.3757,
      w: 1.5737,
      h: 0.3871,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'FSD / AI', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 7.7195,
      y: 1.3757,
      w: 1.5737,
      h: 0.3871,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla Semi', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 5.4067,
      y: 1.3757,
      w: 1.5737,
      h: 0.3871,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Optimus', options: { bold: true, fontSize: 17, color: 'FFFFFF', fontFace: 'Avenir Black', align: 'center' } }], {
      x: 3.094,
      y: 1.3757,
      w: 1.5737,
      h: 0.3871,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image13.png',
      x: 1.3303,
      y: 3.3025,
      w: 0.4757,
      h: 0.4757
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image14.png',
      x: 3.6692,
      y: 3.3326,
      w: 0.4167,
      h: 0.4167
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image15.png',
      x: 5.9125,
      y: 3.3025,
      w: 0.5239,
      h: 0.5239
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image16.png',
      x: 8.2492,
      y: 3.317,
      w: 0.4948,
      h: 0.4948
    });
    slide.addText([{ text: 'Source: Tesla Investor Day; AI Day; Earnings Calls', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 10 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -6.0661,
      y: 2.4242,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.9089,
      y: -0.9757,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Tesla trades at a significantly higher premium, compared to its peers in the industry', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium', paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla Valuation Comparison', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    try {
      slide.addChart(pptx.charts.BAR, [
        { name: ' PE ', labels: ['Tesla', 'Toyota', 'BYD', 'GM', 'Ford', 'Nvidia'], values: [170, 10, 18, 5, 6, 55] },
      ], { x: 0.1648, y: 1.3651, w: 4.6199, h: 2.9591, showLegend: false, fill: 'FFFFFF', plotArea: { fill: { color: 'FFFFFF' }, border: { color: 'FFFFFF', pt: 0 } }, chartColors: ['0B466C'] });
    } catch(e) { console.error('Chart error:', e.message); }
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image17.png',
      x: 4.7847,
      y: 1.5232,
      w: 5.0516,
      h: 2.801
    });
    slide.addShape('roundRect', {
      x: 0.2808,
      y: 4.5904,
      w: 9.5376,
      h: 0.7957,
      fill: { type: 'none' },
      line: { color: 'CACACA', width: 2.5, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0.1613,
      y: 4.5764,
      w: 9.6515,
      h: 0.8542,
      fill: { type: 'none' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Key Takeaways', options: { bold: true, fontSize: 15, color: '000000', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.8778,
      y: 4.4423,
      w: 1.7111,
      h: 0.2855,
      fill: { color: '0F0F0F' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      shape: 'roundRect',
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s valuation implies that investors are underwriting sustained high growth and successful commercialization of autonomy, AI, and new business lines over the long term. However, with near-term revenue declining and automotive performance under pressure, this premium creates meaningful downside risk if execution timelines slip or demand does not meet certain output expectations', options: { bold: true, fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Book', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.4051,
      y: 4.6899,
      w: 9.2915,
      h: 0.8415,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 11 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.8996,
      y: 2.3771,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.9089,
      y: -0.9757,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Tesla’s valuation & growth remain highly sensitive to demand, execution, & regulations', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.8174,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Key Risks & Investment Debate', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4051,
      y: 1.456,
      w: 5.1923,
      h: 0.5527,
      fill: { type: 'none' },
      line: { color: '0B466C', width: 2.25, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 5.0307,
      y: 1.3197,
      w: 0.7643,
      h: 0.7633,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Demand', options: { fontSize: 13, color: '0B466C', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.5886,
      y: 1.2961,
      w: 0.9516,
      h: 0.3198,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.437,
      y: 1.515,
      w: 4.7651,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.5886,
      y: 2.2653,
      w: 5.1923,
      h: 0.55,
      flipH: true,
      fill: { type: 'none' },
      line: { color: '818181', width: 2.25, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 0.4051,
      y: 2.1628,
      w: 0.76,
      h: 0.76,
      flipH: true,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Regulation', options: { fontSize: 13, color: '818181', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 4.3882,
      y: 2.0917,
      w: 1.2276,
      h: 0.3198,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4265,
      y: 3.1421,
      w: 5.1923,
      h: 0.5527,
      fill: { type: 'none' },
      line: { color: '0B466C', width: 2.25, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 5.038,
      y: 3.0369,
      w: 0.7643,
      h: 0.7633,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Valuation', options: { fontSize: 13, color: '0B466C', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.5298,
      y: 2.9673,
      w: 1.0104,
      h: 0.3198,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Premium multiples leave little room for execution missteps', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.5408,
      y: 3.2835,
      w: 4.7651,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.5084,
      y: 3.9862,
      w: 5.1923,
      h: 0.55,
      flipH: true,
      fill: { type: 'none' },
      line: { color: '818181', width: 2.25, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 0.3249,
      y: 3.8837,
      w: 0.76,
      h: 0.76,
      flipH: true,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Execution', options: { fontSize: 13, color: '818181', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 4.3882,
      y: 3.8361,
      w: 1.1475,
      h: 0.3198,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.4265,
      y: 4.7936,
      w: 5.1923,
      h: 0.5527,
      fill: { type: 'none' },
      line: { color: '0B466C', width: 2.25, type: 'solid' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 5.038,
      y: 4.6883,
      w: 0.7643,
      h: 0.7633,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Macro', options: { fontSize: 13, color: '0B466C', fontFace: 'Avenir Medium', align: 'center' } }], {
      x: 0.5298,
      y: 4.6658,
      w: 0.76,
      h: 0.3198,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'EV incentives and interest rates remain headwinds to demand', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.5408,
      y: 4.935,
      w: 4.7651,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'FSD approval timelines remain uncertain, limiting robotaxi commercialization', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 1.1509,
      y: 2.3297,
      w: 4.465,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('triangle', {
      x: 9.3927,
      y: 1.8068,
      w: 0.2331,
      h: 0.286,
      rotate: 180,
      flipH: true,
      fill: { color: 'AB132D' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 6.1749,
      y: 1.6302,
      w: 3.2167,
      h: 1.8292,
      fill: { color: 'AB132D', transparency: 65 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Tesla is increasingly viewed as a long-duration technology platform, with valuation driven by expectations around autonomy, AI, and energy rather than current automotive performance', options: { bold: true, fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 6.2317,
      y: 2.044,
      w: 3.1245,
      h: 1.2178,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 6.1749,
      y: 3.636,
      w: 3.2167,
      h: 1.7103,
      fill: { type: 'none' },
      line: { color: 'AB132D', width: 1, type: 'solid', dashType: 'dash' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 6.2303,
      y: 3.7835,
      w: 2.9764,
      h: 2.0256,
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('triangle', {
      x: 5.9479,
      y: 1.8068,
      w: 0.2331,
      h: 0.286,
      rotate: 180,
      fill: { color: 'AB132D' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Market View', options: { bold: true, fontSize: 15, color: '000000', fontFace: 'Avenir Next Medium', align: 'center' } }], {
      x: 5.9479,
      y: 1.3462,
      w: 3.679,
      h: 0.4626,
      fill: { color: 'AB132D' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Implications', options: { bold: true, fontSize: 15, color: 'AB132D', fontFace: 'Avenir Next Medium', align: 'center' } }], {
      x: 7.0209,
      y: 3.497,
      w: 1.5247,
      h: 0.3534,
      fill: { color: '0F0F0F' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'This creates an asymmetric setup where near-term softness in demand or margins can drive outsized downside, while sustained progress in autonomy, energy, and software is required to justify current valuation levels. Execution consistency, particularly across multiple new product lines, will be critical to investor confidence', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 6.2464,
      y: 3.7476,
      w: 3.1097,
      h: 1.582,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image18.png',
      x: 5.1533,
      y: 1.4511,
      w: 0.4989,
      h: 0.4989
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image19.png',
      x: 0.5829,
      y: 2.3248,
      w: 0.4322,
      h: 0.4322
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image20.png',
      x: 5.1308,
      y: 3.1257,
      w: 0.5855,
      h: 0.5855
    });
    slide.addText([{ text: 'Simultaneous ramp of Robotaxi, Semi, and Optimus creates operational strain', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 1.1413,
      y: 4.0461,
      w: 4.2311,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image21.png',
      x: 0.4322,
      y: 3.9894,
      w: 0.5442,
      h: 0.5442
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image22.png',
      x: 5.1458,
      y: 4.7986,
      w: 0.5434,
      h: 0.5434
    });
    slide.addText([{ text: 'Source: Tesla Investor Relations; Reuters; Bloomberg', options: { fontSize: 7, color: '818181' } }], {
      x: 0.3316,
      y: 5.3717,
      w: 9.2458,
      h: 0.2188,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
  }

  // ── Slide 12 (slideLayout1) ──
  {
    const slide = pptx.addSlide({ masterName: 'slideLayout1' });
    slide.background = { color: '0F0F0F' };
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image5.png',
      x: -5.8236,
      y: 2.454,
      w: 5.4141,
      h: 1.5
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image4.png',
      x: -4.9089,
      y: -0.9757,
      w: 4.0148,
      h: 2.6765
    });
    slide.addText([{ text: 'Weakening auto demand, rapid energy growth, & unproven autonomy determine outcome', options: { fontSize: 16, color: '818181', fontFace: 'Avenir Medium' } }], {
      x: 0.5408,
      y: 0.7846,
      w: 9.4592,
      h: 0.5208,
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4051,
      y: 0.3956,
      w: 0.05,
      h: 0.8437,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('roundRect', {
      x: 0,
      y: 0,
      w: 10,
      h: 0.1117,
      fill: { color: 'CC0000' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: '3 Forces Driving Tesla’s Valuation', options: { bold: true, fontSize: 38, fontFace: 'Avenir Medium', lineSpacingMultiple: 0.9, paraSpaceBefore: 0, paraSpaceAfter: 0 } }], {
      x: 0.5408,
      y: 0.0237,
      w: 11.5,
      h: 0.9757,
      valign: 'bottom',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addShape('rect', {
      x: 0.6891,
      y: 1.9098,
      w: 2.4555,
      h: 1.3478,
      fill: { color: 'AB132D', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 0.3739,
      y: 1.4241,
      w: 0.6072,
      h: 0.6072,
      fill: { color: 'AB132D' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 0.7028,
      y: 1.5373,
      w: 2.1507,
      h: 0.3894,
      fill: { color: 'AB132D' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Demand & Auto', options: { bold: true, fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Book' } }], {
      x: 1.0375,
      y: 1.5617,
      w: 1.8296,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.6481,
      y: 2.0396,
      w: 2.5707,
      h: 0.8919,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'Inventory build signals imbalance between production & deliveries', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 0.6318,
      y: 2.7729,
      w: 2.5707,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'Q1 2026 inventory build (production > deliveries)', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 1.3388,
      y: 3.4046,
      w: 2.3951,
      h: 0.7068,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '50K+', options: { fontSize: 32, color: 'AB132D', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 0.4926,
      y: 3.3436,
      w: 0.9831,
      h: 0.6395,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addShape('line', {
      x: 3.3439,
      y: 1.4241,
      w: 0,
      h: 1.8698,
      line: { color: 'AFABAB', width: 2.25, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('line', {
      x: 0.422,
      y: 4.1956,
      w: 9.1607,
      h: 0,
      flipH: true,
      line: { color: 'AFABAB', width: 2.25, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 3.9097,
      y: 1.9098,
      w: 2.4555,
      h: 1.3478,
      fill: { color: '0B466C', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 3.5945,
      y: 1.4241,
      w: 0.6072,
      h: 0.6072,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 3.9234,
      y: 1.5373,
      w: 2.1507,
      h: 0.3894,
      fill: { color: '0B466C' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Energy Growth', options: { bold: true, fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Book' } }], {
      x: 4.3272,
      y: 1.5617,
      w: 1.7604,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'Energy is scaling rapidly and becoming Tesla’s fastest', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center', breakLine: true } }, { text: 'growing segment', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 3.8687,
      y: 2.0396,
      w: 2.5707,
      h: 0.6563,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 3.8524,
      y: 2.7662,
      w: 2.5707,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'FY2025 energy ', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: 'revenue growth', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 4.6569,
      y: 3.4046,
      w: 2.3951,
      h: 0.7068,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '+27%', options: { fontSize: 32, color: '0B466C', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 3.7132,
      y: 3.3436,
      w: 1.0234,
      h: 0.6395,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addShape('line', {
      x: 6.5645,
      y: 1.4241,
      w: 0,
      h: 1.8698,
      line: { color: 'AFABAB', width: 2.25, type: 'solid', dashType: 'dash' }
    });
    slide.addShape('rect', {
      x: 7.1303,
      y: 1.9098,
      w: 2.4555,
      h: 1.3478,
      fill: { color: '031E40', transparency: 50 },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('ellipse', {
      x: 6.8151,
      y: 1.4241,
      w: 0.6072,
      h: 0.6072,
      fill: { color: '031E40' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addShape('rect', {
      x: 7.144,
      y: 1.5373,
      w: 2.1506,
      h: 0.3894,
      fill: { color: '031E40' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Autonomy & AI', options: { bold: true, fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Book' } }], {
      x: 7.4915,
      y: 1.5758,
      w: 1.7603,
      h: 0.3534,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 7.0893,
      y: 2.0396,
      w: 2.5707,
      h: 0.8919,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'PLACEHOLDER', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', align: 'center' } }], {
      x: 7.073,
      y: 2.7662,
      w: 2.5707,
      h: 0.4712,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla P/E reflects AI', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '& autonomy expectations', options: { fontSize: 11, color: 'FFFFFF', fontFace: 'Avenir Light', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 7.7952,
      y: 3.4215,
      w: 2.3951,
      h: 0.7068,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: '170x', options: { fontSize: 32, color: '031E40', fontFace: 'Bebas Neue', align: 'center' } }], {
      x: 6.9338,
      y: 3.3605,
      w: 0.9831,
      h: 0.6395,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      fit: 'shrink',
      isTextBox: true
    });
    slide.addShape('roundRect', {
      x: 0.4115,
      y: 4.4404,
      w: 9.185,
      h: 0.9912,
      fill: { color: '818181' },
      valign: 'middle',
      margin: [3.6, 7.2, 3.6, 7.2]
    });
    slide.addText([{ text: 'Key Takeaways', options: { bold: true, fontSize: 15, color: 'FFFFFF', fontFace: 'Avenir Black', breakLine: true } }, { text: '', options: { breakLine: true } }], {
      x: 0.5234,
      y: 4.4814,
      w: 9.0594,
      h: 0.5385,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addText([{ text: 'Tesla’s valuation remains highly narrative-driven, with upside dependent on autonomy and energy scaling, while downside risk is driven by sustained weakness in core automotive demand', options: { fontSize: 12, color: 'FFFFFF', fontFace: 'Avenir Light' } }], {
      x: 0.5234,
      y: 4.7783,
      w: 9.0594,
      h: 0.5049,
      fill: { type: 'none' },
      valign: 'top',
      margin: [3.6, 7.2, 3.6, 7.2],
      isTextBox: true
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image23.png',
      x: 0.4652,
      y: 1.4997,
      w: 0.4017,
      h: 0.4017
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image24.png',
      x: 3.6982,
      y: 1.5331,
      w: 0.3878,
      h: 0.3878
    });
    slide.addImage({
      path: __dirname + '/assets/ppt/media/image25.png',
      x: 6.9184,
      y: 1.5339,
      w: 0.4006,
      h: 0.4006
    });
  }

  const outName = 'SahasraVellanki - xAI Deck (1)-generated.pptx';
  await pptx.writeFile({ fileName: outName });

  // Self-repair: fix known PptxGenJS bugs in the output zip
  const fs = require('fs');
  const JSZip = require('jszip');
  const raw = fs.readFileSync(outName);
  const z = await JSZip.loadAsync(raw);
  let changed = false;
  // Remove phantom slideMaster entries
  let ct = await z.file('[Content_Types].xml').async('string');
  const before = ct.length;
  ct = ct.replace(/<Override PartName="\/ppt\/slideMasters\/slideMaster(?:[2-9]|\d{2,3})\.xml" ContentType="[^"]*"\/>/g, '');
  if (ct.length !== before) { z.file('[Content_Types].xml', ct); changed = true; }
  // Fix absolute chart paths
  for (const name of Object.keys(z.files)) {
    if (name.match(/ppt\/slides\/_rels\/slide\d+\.xml\.rels$/)) {
      let rels = await z.file(name).async('string');
      const orig = rels;
      rels = rels.replace(/Target="\/ppt\/charts\//g, 'Target="../charts/');
      rels = rels.replace(/Target="\/ppt\/embeddings\//g, 'Target="../embeddings/');
      if (rels !== orig) { z.file(name, rels); changed = true; }
    }
  }
  // Remove orphan axId references
  for (const name of Object.keys(z.files)) {
    if (!name.match(/^ppt\/charts\/chart\d+\.xml$/)) continue;
    let xml = await z.file(name).async('string');
    const orig = xml;
    const definedAxIds = new Set();
    const axDefs = xml.match(/<c:(?:catAx|valAx|serAx|dateAx)>[\s\S]*?<c:axId val="(\d+)"/g) || [];
    for (const ad of axDefs) { const m = ad.match(/val="(\d+)"/); if (m) definedAxIds.add(m[1]); }
    xml = xml.replace(/<c:axId val="(\d+)"\/>/g, (match, id) => definedAxIds.has(id) ? match : '');
    if (xml !== orig) { z.file(name, xml); changed = true; }
  }
  // Fix image srcRect (OOXML crop)
  const srcRectData = {"1":{"0":{"l":0,"t":5000,"r":0,"b":5000}},"10":{"2":{"l":843,"t":0,"r":0,"b":0}}};
  for (const [slideNum, images] of Object.entries(srcRectData)) {
    const slidePath = 'ppt/slides/slide' + slideNum + '.xml';
    const slideFile = z.file(slidePath);
    if (!slideFile) continue;
    let slideXml = await slideFile.async('string');
    let imgIdx = 0;
    slideXml = slideXml.replace(/<p:blipFill[^>]*>[\s\S]*?<\/p:blipFill>/g, (match) => {
      const crop = images[imgIdx];
      imgIdx++;
      if (!crop) return match;
      if (match.includes('<a:srcRect')) {
        return match.replace(/<a:srcRect[^/]*\/?>/, '<a:srcRect l="' + crop.l + '" t="' + crop.t + '" r="' + crop.r + '" b="' + crop.b + '"/>');
      }
      return match.replace('<a:stretch>', '<a:srcRect l="' + crop.l + '" t="' + crop.t + '" r="' + crop.r + '" b="' + crop.b + '"/><a:stretch>');
    });
    z.file(slidePath, slideXml);
    changed = true;
  }
  // Fix custom geometry and connector shapes
  const geomFixData = [
    { name: 'cg_5_93', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="10448925" h="647700"><a:moveTo><a:pt x="10448925" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_5_96', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="10448925" h="647700"><a:moveTo><a:pt x="10448925" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_5_99', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="10448925" h="647700"><a:moveTo><a:pt x="10448925" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_5_102', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="10448925" h="647700"><a:moveTo><a:pt x="10448925" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="647700"/></a:lnTo><a:lnTo><a:pt x="10448925" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_129', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="714375" h="714375"><a:moveTo><a:pt x="357250" y="0"/></a:moveTo><a:lnTo><a:pt x="308762" y="3260"/></a:lnTo><a:lnTo><a:pt x="262260" y="12757"/></a:lnTo><a:lnTo><a:pt x="218170" y="28065"/></a:lnTo><a:lnTo><a:pt x="176915" y="48758"/></a:lnTo><a:lnTo><a:pt x="138922" y="74412"/></a:lnTo><a:lnTo><a:pt x="104616" y="104600"/></a:lnTo><a:lnTo><a:pt x="74421" y="138897"/></a:lnTo><a:lnTo><a:pt x="48763" y="176878"/></a:lnTo><a:lnTo><a:pt x="28066" y="218116"/></a:lnTo><a:lnTo><a:pt x="12757" y="262187"/></a:lnTo><a:lnTo><a:pt x="3260" y="308665"/></a:lnTo><a:lnTo><a:pt x="0" y="357124"/></a:lnTo><a:lnTo><a:pt x="3260" y="405612"/></a:lnTo><a:lnTo><a:pt x="12757" y="452114"/></a:lnTo><a:lnTo><a:pt x="28067" y="496204"/></a:lnTo><a:lnTo><a:pt x="48763" y="537459"/></a:lnTo><a:lnTo><a:pt x="74421" y="575452"/></a:lnTo><a:lnTo><a:pt x="104616" y="609758"/></a:lnTo><a:lnTo><a:pt x="138922" y="639953"/></a:lnTo><a:lnTo><a:pt x="176915" y="665611"/></a:lnTo><a:lnTo><a:pt x="218170" y="686308"/></a:lnTo><a:lnTo><a:pt x="262260" y="701617"/></a:lnTo><a:lnTo><a:pt x="308762" y="711114"/></a:lnTo><a:lnTo><a:pt x="357250" y="714375"/></a:lnTo><a:lnTo><a:pt x="405709" y="711114"/></a:lnTo><a:lnTo><a:pt x="452187" y="701617"/></a:lnTo><a:lnTo><a:pt x="496258" y="686308"/></a:lnTo><a:lnTo><a:pt x="537496" y="665611"/></a:lnTo><a:lnTo><a:pt x="575477" y="639953"/></a:lnTo><a:lnTo><a:pt x="609774" y="609758"/></a:lnTo><a:lnTo><a:pt x="639962" y="575452"/></a:lnTo><a:lnTo><a:pt x="665616" y="537459"/></a:lnTo><a:lnTo><a:pt x="686309" y="496204"/></a:lnTo><a:lnTo><a:pt x="701617" y="452114"/></a:lnTo><a:lnTo><a:pt x="711114" y="405612"/></a:lnTo><a:lnTo><a:pt x="714375" y="357124"/></a:lnTo><a:lnTo><a:pt x="711114" y="308665"/></a:lnTo><a:lnTo><a:pt x="701617" y="262187"/></a:lnTo><a:lnTo><a:pt x="686309" y="218116"/></a:lnTo><a:lnTo><a:pt x="665616" y="176878"/></a:lnTo><a:lnTo><a:pt x="639962" y="138897"/></a:lnTo><a:lnTo><a:pt x="609774" y="104600"/></a:lnTo><a:lnTo><a:pt x="575477" y="74412"/></a:lnTo><a:lnTo><a:pt x="537496" y="48758"/></a:lnTo><a:lnTo><a:pt x="496258" y="28065"/></a:lnTo><a:lnTo><a:pt x="452187" y="12757"/></a:lnTo><a:lnTo><a:pt x="405709" y="3260"/></a:lnTo><a:lnTo><a:pt x="357250" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_131', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2381250" h="104775"><a:moveTo><a:pt x="0" y="104775"/></a:moveTo><a:lnTo><a:pt x="2381250" y="104775"/></a:lnTo><a:lnTo><a:pt x="2381250" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="104775"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_132', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2695575" h="2695575"><a:moveTo><a:pt x="2695575" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_136', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="714375" h="714375"><a:moveTo><a:pt x="357250" y="0"/></a:moveTo><a:lnTo><a:pt x="308762" y="3260"/></a:lnTo><a:lnTo><a:pt x="262260" y="12757"/></a:lnTo><a:lnTo><a:pt x="218170" y="28065"/></a:lnTo><a:lnTo><a:pt x="176915" y="48758"/></a:lnTo><a:lnTo><a:pt x="138922" y="74412"/></a:lnTo><a:lnTo><a:pt x="104616" y="104600"/></a:lnTo><a:lnTo><a:pt x="74421" y="138897"/></a:lnTo><a:lnTo><a:pt x="48763" y="176878"/></a:lnTo><a:lnTo><a:pt x="28066" y="218116"/></a:lnTo><a:lnTo><a:pt x="12757" y="262187"/></a:lnTo><a:lnTo><a:pt x="3260" y="308665"/></a:lnTo><a:lnTo><a:pt x="0" y="357124"/></a:lnTo><a:lnTo><a:pt x="3260" y="405612"/></a:lnTo><a:lnTo><a:pt x="12757" y="452114"/></a:lnTo><a:lnTo><a:pt x="28067" y="496204"/></a:lnTo><a:lnTo><a:pt x="48763" y="537459"/></a:lnTo><a:lnTo><a:pt x="74421" y="575452"/></a:lnTo><a:lnTo><a:pt x="104616" y="609758"/></a:lnTo><a:lnTo><a:pt x="138922" y="639953"/></a:lnTo><a:lnTo><a:pt x="176915" y="665611"/></a:lnTo><a:lnTo><a:pt x="218170" y="686308"/></a:lnTo><a:lnTo><a:pt x="262260" y="701617"/></a:lnTo><a:lnTo><a:pt x="308762" y="711114"/></a:lnTo><a:lnTo><a:pt x="357250" y="714375"/></a:lnTo><a:lnTo><a:pt x="405709" y="711114"/></a:lnTo><a:lnTo><a:pt x="452187" y="701617"/></a:lnTo><a:lnTo><a:pt x="496258" y="686308"/></a:lnTo><a:lnTo><a:pt x="537496" y="665611"/></a:lnTo><a:lnTo><a:pt x="575477" y="639953"/></a:lnTo><a:lnTo><a:pt x="609774" y="609758"/></a:lnTo><a:lnTo><a:pt x="639962" y="575452"/></a:lnTo><a:lnTo><a:pt x="665616" y="537459"/></a:lnTo><a:lnTo><a:pt x="686309" y="496204"/></a:lnTo><a:lnTo><a:pt x="701617" y="452114"/></a:lnTo><a:lnTo><a:pt x="711114" y="405612"/></a:lnTo><a:lnTo><a:pt x="714375" y="357124"/></a:lnTo><a:lnTo><a:pt x="711114" y="308665"/></a:lnTo><a:lnTo><a:pt x="701617" y="262187"/></a:lnTo><a:lnTo><a:pt x="686309" y="218116"/></a:lnTo><a:lnTo><a:pt x="665616" y="176878"/></a:lnTo><a:lnTo><a:pt x="639962" y="138897"/></a:lnTo><a:lnTo><a:pt x="609774" y="104600"/></a:lnTo><a:lnTo><a:pt x="575477" y="74412"/></a:lnTo><a:lnTo><a:pt x="537496" y="48758"/></a:lnTo><a:lnTo><a:pt x="496258" y="28065"/></a:lnTo><a:lnTo><a:pt x="452187" y="12757"/></a:lnTo><a:lnTo><a:pt x="405709" y="3260"/></a:lnTo><a:lnTo><a:pt x="357250" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_138', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="714375" h="714375"><a:moveTo><a:pt x="357250" y="0"/></a:moveTo><a:lnTo><a:pt x="308762" y="3260"/></a:lnTo><a:lnTo><a:pt x="262260" y="12757"/></a:lnTo><a:lnTo><a:pt x="218170" y="28065"/></a:lnTo><a:lnTo><a:pt x="176915" y="48758"/></a:lnTo><a:lnTo><a:pt x="138922" y="74412"/></a:lnTo><a:lnTo><a:pt x="104616" y="104600"/></a:lnTo><a:lnTo><a:pt x="74421" y="138897"/></a:lnTo><a:lnTo><a:pt x="48763" y="176878"/></a:lnTo><a:lnTo><a:pt x="28066" y="218116"/></a:lnTo><a:lnTo><a:pt x="12757" y="262187"/></a:lnTo><a:lnTo><a:pt x="3260" y="308665"/></a:lnTo><a:lnTo><a:pt x="0" y="357124"/></a:lnTo><a:lnTo><a:pt x="3260" y="405612"/></a:lnTo><a:lnTo><a:pt x="12757" y="452114"/></a:lnTo><a:lnTo><a:pt x="28067" y="496204"/></a:lnTo><a:lnTo><a:pt x="48763" y="537459"/></a:lnTo><a:lnTo><a:pt x="74421" y="575452"/></a:lnTo><a:lnTo><a:pt x="104616" y="609758"/></a:lnTo><a:lnTo><a:pt x="138922" y="639953"/></a:lnTo><a:lnTo><a:pt x="176915" y="665611"/></a:lnTo><a:lnTo><a:pt x="218170" y="686308"/></a:lnTo><a:lnTo><a:pt x="262260" y="701617"/></a:lnTo><a:lnTo><a:pt x="308762" y="711114"/></a:lnTo><a:lnTo><a:pt x="357250" y="714375"/></a:lnTo><a:lnTo><a:pt x="405709" y="711114"/></a:lnTo><a:lnTo><a:pt x="452187" y="701617"/></a:lnTo><a:lnTo><a:pt x="496258" y="686308"/></a:lnTo><a:lnTo><a:pt x="537496" y="665611"/></a:lnTo><a:lnTo><a:pt x="575477" y="639953"/></a:lnTo><a:lnTo><a:pt x="609774" y="609758"/></a:lnTo><a:lnTo><a:pt x="639962" y="575452"/></a:lnTo><a:lnTo><a:pt x="665616" y="537459"/></a:lnTo><a:lnTo><a:pt x="686309" y="496204"/></a:lnTo><a:lnTo><a:pt x="701617" y="452114"/></a:lnTo><a:lnTo><a:pt x="711114" y="405612"/></a:lnTo><a:lnTo><a:pt x="714375" y="357124"/></a:lnTo><a:lnTo><a:pt x="711114" y="308665"/></a:lnTo><a:lnTo><a:pt x="701617" y="262187"/></a:lnTo><a:lnTo><a:pt x="686309" y="218116"/></a:lnTo><a:lnTo><a:pt x="665616" y="176878"/></a:lnTo><a:lnTo><a:pt x="639962" y="138897"/></a:lnTo><a:lnTo><a:pt x="609774" y="104600"/></a:lnTo><a:lnTo><a:pt x="575477" y="74412"/></a:lnTo><a:lnTo><a:pt x="537496" y="48758"/></a:lnTo><a:lnTo><a:pt x="496258" y="28065"/></a:lnTo><a:lnTo><a:pt x="452187" y="12757"/></a:lnTo><a:lnTo><a:pt x="405709" y="3260"/></a:lnTo><a:lnTo><a:pt x="357250" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_140', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2381250" h="104775"><a:moveTo><a:pt x="0" y="104775"/></a:moveTo><a:lnTo><a:pt x="2381250" y="104775"/></a:lnTo><a:lnTo><a:pt x="2381250" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="104775"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_141', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2695575" h="2695575"><a:moveTo><a:pt x="2695575" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_145', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2381250" h="104775"><a:moveTo><a:pt x="0" y="104775"/></a:moveTo><a:lnTo><a:pt x="2381250" y="104775"/></a:lnTo><a:lnTo><a:pt x="2381250" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="104775"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
    { name: 'cg_6_146', xml: '<a:custGeom><a:avLst/><a:gdLst/><a:ahLst/><a:cxnLst/><a:rect l="l" t="t" r="r" b="b"/><a:pathLst><a:path w="2695575" h="2695575"><a:moveTo><a:pt x="2695575" y="0"/></a:moveTo><a:lnTo><a:pt x="0" y="0"/></a:lnTo><a:lnTo><a:pt x="0" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="2695575"/></a:lnTo><a:lnTo><a:pt x="2695575" y="0"/></a:lnTo><a:close/></a:path></a:pathLst></a:custGeom>' },
  ];
  for (const gfd of geomFixData) {
    for (const fn of Object.keys(z.files)) {
      if (!fn.match(/^ppt\/slides\/slide\d+\.xml$/)) continue;
      let sXml = await z.file(fn).async('string');
      const ni = sXml.indexOf('name="' + gfd.name + '"');
      if (ni === -1) continue;
      const ss = sXml.lastIndexOf('<p:sp>', ni);
      const se = sXml.indexOf('</p:sp>', ni);
      if (ss === -1 || se === -1) continue;
      const blk = sXml.substring(ss, se + 7);
      const fix = blk.replace(/<a:prstGeom[^>]*(?:>[\s\S]*?<\/a:prstGeom>|\/>)/, gfd.xml);
      if (fix !== blk) { sXml = sXml.substring(0, ss) + fix + sXml.substring(se + 7); z.file(fn, sXml); changed = true; }
      break;
    }
  }
  if (changed) {
    const fixed = await z.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    fs.writeFileSync(outName, fixed);
  }
  console.log('✅ Generated: ' + outName);
  console.log('   Slides: 12 | Shapes: 346 | Connectors: 10 | Groups: 41 | Images: 45');
}
main().catch(err => { console.error(err); process.exit(1); });