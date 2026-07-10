// Reconstruct the 'Activating America' McKinsey/Chelsea FC deck using pptxgenjs.
//
// Requirements:  npm install pptxgenjs
// Run with:       node activating-america.js
//
// Slide size matches the source: 13.333" x 7.5" (widescreen).
// Each slide is wrapped in its own block scope so const declarations don't collide.

const pptxgen = require('pptxgenjs');

const pres = new pptxgen();
pres.defineLayout({ name: 'ACTIVATING_AMERICA', width: 13.3333, height: 7.5 });
pres.layout = 'ACTIVATING_AMERICA';
pres.title = 'Activating America';
pres.author = 'McKinsey & Company';


// ---------- Slide 1 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: '021F47' };
  slide.addText([{ text: 'McKINSEY & COMPANY', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 6.0 } }], { x: 0.6, y: 1.9, w: 8, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Activating America', options: { fontSize: 62, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.35, w: 12, h: 1.1, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Fan Expansion and Engagement on the East Coast Tour', options: { fontSize: 28, italic: true, color: '9CA3AF', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.45, w: 12, h: 0.6, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Prepared for the Chelsea Football Club Commercial Office', options: { fontSize: 14, color: '9CA3AF', fontFace: 'Calibri' } }], { x: 0.6, y: 4.8474, w: 10, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Strategic review of East Coast tour markets: Atlanta, Charlotte, Philadelphia, and New York/New Jersey', options: { fontSize: 14, color: '9CA3AF', fontFace: 'Calibri' } }], { x: 0.6, y: 4.4273, w: 11.5, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'APRIL 2026', options: { fontSize: 11, bold: true, color: '9CA3AF', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 6.75, w: 4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CONFIDENTIAL  |  FOR CLIENT USE ONLY', options: { fontSize: 11, bold: true, color: '9CA3AF', fontFace: 'Calibri', charSpacing: 4.0, align: 'right' } }], { x: 7.7521, y: 6.75, w: 5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.2545, w: 8.0951, h: 0, line: { color: 'DBA111', width: 1.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.5972, y: 0.6037, w: 1.1528, h: 0, line: { color: 'DBA111', width: 1.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6076, y: 0.5967, w: 0, h: 1.0248, line: { color: 'DBA111', width: 1.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 6.61, w: 12.1014, h: 0, line: { color: 'DBA111', width: 1.75 } });
}

// ---------- Slide 2 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addText([{ text: 'EXECUTIVE SUMMARY', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A rare window to convert US exposure into lasting fandom', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.62, w: 12.1, h: 0.95, fill: { color: 'F5F3EC' } });
  slide.addText([{ text: 'The Situation:  ', options: { fontSize: 16, bold: true, color: '034694', fontFace: 'Calibri' } }, { text: 'Chelsea\'s 2025 FIFA Club World Cup campaign delivered seven matches across four East Coast metros, ending with a 3-0 final victory over PSG at MetLife Stadium. The Blues now hold strong live-audience equity in the US, but no committed return tour until the 2026 window which is a missed opportunity for the team and leaves fans wanting more.', options: { fontSize: 16, color: '111827', fontFace: 'Calibri' } }], { x: 0.85, y: 1.7, w: 11.6, h: 0.82, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.8, w: 3.9, h: 3.85, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.8, w: 3.9, h: 0.08, fill: { color: 'DBA111' } });
  slide.addText([{ text: '01', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 3.05, w: 1.2, h: 0.8, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Concentrated demand, not diffuse', options: { fontSize: 21, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 3.95, w: 3.3, h: 0.95, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The four East Coast metros (NY/NJ, Philadelphia, Atlanta, Charlotte) account for roughly 42% of Chelsea\'s US supporter club membership and indexed 3.1x over average on matchday social engagement during the 2025 CWC.', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 0.9, y: 4.95, w: 3.3, h: 1.6, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.7008, y: 2.8, w: 3.9, h: 3.85, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.7008, y: 2.8, w: 3.9, h: 0.08, fill: { color: 'DBA111' } });
  slide.addText([{ text: '02', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 5.0008, y: 3.05, w: 1.2, h: 0.8, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'US fans are younger and more diverse', options: { fontSize: 21, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 5.0008, y: 3.95, w: 3.3, h: 0.95, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The US Premier League audience skews 58% male with a median age of 34, and over-indexes on Hispanic 21% and Black 15% viewers relative to the UK base. Gen Z is by far the fastest-growing segment at 18% year over year.', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 5.0008, y: 4.95, w: 3.3, h: 1.6, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.8017, y: 2.8, w: 3.9, h: 3.85, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 8.8017, y: 2.8, w: 3.9, h: 0.08, fill: { color: 'DBA111' } });
  slide.addText([{ text: '03', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 9.1017, y: 3.05, w: 1.2, h: 0.8, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Engagement power over broadcasting', options: { fontSize: 21, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 9.1017, y: 3.95, w: 3.3, h: 0.95, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A four-city activation program, each tailored to local demographics and cultural assets, can convert an estimated 280K casual followers into loyalty-tier fans within 12 months at a projected 4.2x ROI on program spend.', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 9.1017, y: 4.95, w: 3.3, h: 1.6, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Executive Summary', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '02', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
}

// ---------- Slide 3 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 3.735, w: 5.15, h: 0, line: { color: 'E5E7EB', width: 0.5 } });
  slide.addText([{ text: 'MARKET CONTEXT', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'US soccer is booming, and Chelsea captures a rising share', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.84, w: 3.05, h: 2.1, fill: { color: 'F5F3EC' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.84, w: 0.08, h: 2.1, fill: { color: '034694' } });
  slide.addText([{ text: '31M', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 2.04, w: 2.7, h: 0.9, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Average weekly Premier League viewers in the US during the 2024/2025 season (+24% YoY)', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 0.9, y: 2.99, w: 2.65, h: 0.85, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.85, y: 1.84, w: 3.05, h: 2.1, fill: { color: 'F5F3EC' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.85, y: 1.84, w: 0.08, h: 2.1, fill: { color: '034694' } });
  slide.addText([{ text: '52%', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 4.15, y: 2.04, w: 2.7, h: 0.9, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Of US fans aged 18 to 34 say soccer is among their top three sports, up 67% from 2018', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 4.15, y: 2.99, w: 2.65, h: 0.85, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.14, w: 3.05, h: 2.1, fill: { color: 'F5F3EC' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.14, w: 0.08, h: 2.1, fill: { color: '034694' } });
  slide.addText([{ text: '#2', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 4.34, w: 2.7, h: 0.9, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea\'s rank in US social following among Premier League clubs (trailing only Man. Utd.)', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 0.9, y: 5.29, w: 2.65, h: 0.85, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.85, y: 4.14, w: 3.05, h: 2.1, fill: { color: 'F5F3EC' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.85, y: 4.14, w: 0.08, h: 2.1, fill: { color: '034694' } });
  slide.addText([{ text: '$3.2B', options: { fontSize: 48, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 4.15, y: 4.34, w: 2.7, h: 0.9, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Projected US soccer media', options: { fontSize: 14, color: '111827', fontFace: 'Calibri', breakLine: true } }, { text: 'rights value by 2028, up 3.5x from 2020 and accelerating', options: { fontSize: 14, color: '111827', fontFace: 'Calibri' } }], { x: 4.15, y: 5.29, w: 2.65, h: 0.85, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA IS RIDING THE WAVE', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 7.1968, y: 1.787, w: 5.4, h: 0.3, margin: 0, valign: 'top' });
  slide.addText([{ text: 'US Instagram following, 2020 to 2025', options: { fontSize: 20, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 7.1794, y: 2.087, w: 5.4, h: 0.35, margin: 0, valign: 'top' });
  slide.addText([{ text: '0M', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 6.95, y: 5.0992, w: 0.5, h: 0.1819, margin: 0, valign: 'middle' });
  slide.addText([{ text: '4M', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 6.95, y: 4.3716, w: 0.5, h: 0.1819, margin: 0, valign: 'middle' });
  slide.addText([{ text: '8M', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 6.95, y: 3.6441, w: 0.5, h: 0.1819, margin: 0, valign: 'middle' });
  slide.addText([{ text: '12M', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 6.95, y: 2.9165, w: 0.5, h: 0.1819, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 3.253, w: 4.95, h: 1.1732, flipV: true, line: { color: 'DBA111', width: 2.0, dashType: 'dash' } });
  slide.addShape(pres.shapes.LINE, { x: 10.03, y: 2.9528, w: 2.62, h: 0, line: { color: '034694', width: 1.0, dashType: 'dash' } });
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 5.1902, w: 5.15, h: 0, line: { color: 'E5E7EB', width: 0.5 } });
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 4.4626, w: 5.15, h: 0, line: { color: 'E5E7EB', width: 0.5 } });
  slide.addShape(pres.shapes.LINE, { x: 7.5, y: 3.0074, w: 5, h: 0, line: { color: 'E5E7EB', width: 0.5 } });
  slide.addText([{ text: '2020', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 7.3315, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2021', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 8.23, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2022', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 9.26, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2023', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 10.29, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2024', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 11.32, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2025', options: { fontSize: 10, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 12.2686, y: 5.2357, w: 0.6, h: 0.2274, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Trend', options: { fontSize: 9, bold: true, italic: true, color: 'DBA111', fontFace: 'Calibri' } }], { x: 12.3873, y: 3.1366, w: 0.35, h: 0.1515, rotate: -15, margin: 0, valign: 'top' });
  slide.addShape(pres.shapes.OVAL, { x: 7.4608, y: 4.3475, w: 0.16, h: 0.1455, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addShape(pres.shapes.OVAL, { x: 8.412, y: 4.1229, w: 0.16, h: 0.1455, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addShape(pres.shapes.OVAL, { x: 9.5372, y: 3.855, w: 0.16, h: 0.1455, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addShape(pres.shapes.OVAL, { x: 10.51, y: 3.6137, w: 0.16, h: 0.1455, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addShape(pres.shapes.OVAL, { x: 11.6309, y: 3.3687, w: 0.16, h: 0.1455, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addShape(pres.shapes.OVAL, { x: 12.3007, y: 2.7709, w: 0.4, h: 0.3638, fill: { color: '034694' } });
  slide.addShape(pres.shapes.OVAL, { x: 12.3907, y: 2.8528, w: 0.22, h: 0.2001, fill: { color: '034694' }, line: { color: 'FFFFFF', width: 1.5 } });
  slide.addText([{ text: '4.1M', options: { fontSize: 8, bold: true, color: '034694', fontFace: 'Calibri' } }], { x: 7.4143, y: 4.2143, w: 0.3357, h: 0.1346, margin: 0, valign: 'top' });
  slide.addText([{ text: '12.3M', options: { fontSize: 13, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 11.4118, y: 2.68, w: 0.9, h: 0.2547, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.75, y: 2.7346, w: 2.5, h: 0.864, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.75, y: 2.7346, w: 0.08, h: 0.864, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'CLUB WORLD CUP 2025', options: { fontSize: 9, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 7.9717, y: 2.8073, w: 2.2, h: 0.2001, margin: 0, valign: 'middle' });
  slide.addText([{ text: '+2.5M', options: { fontSize: 16, bold: true, fontFace: 'Century Gothic' } }, { text: ' ', options: { fontSize: 12, bold: true, fontFace: 'Century Gothic' } }, { text: 'new followers', options: { fontSize: 12, fontFace: 'Century Gothic' } }], { x: 7.9717, y: 3.0244, w: 2.2, h: 0.2728, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'gained during the US tournament', options: { fontSize: 9, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 8, y: 3.3656, w: 2.2, h: 0.1378, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 5.5947, w: 5.5014, h: 0.6446, fill: { color: '034694' } });
  slide.addText([{ text: '2.9x', options: { fontSize: 24, bold: true, color: 'DBA111', fontFace: 'Calibri' } }], { x: 7.4, y: 5.5951, w: 0.6, h: 0.6442, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Market Context', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '03', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'growth over 5 years, outpacing PL average of 2.1x', options: { fontSize: 14, fontFace: 'Calibri' } }], { x: 8.1691, y: 5.5947, w: 4.375, h: 0.6442, margin: 0, valign: 'middle' });
  slide.addText([{ text: '5.3M', options: { fontSize: 8, bold: true, color: '034694', fontFace: 'Calibri' } }], { x: 8.371, y: 3.975, w: 0.3357, h: 0.1346, margin: 0, valign: 'top' });
  slide.addText([{ text: '7.5M', options: { fontSize: 8, bold: true, color: '034694', fontFace: 'Calibri' } }], { x: 9.5011, y: 3.7307, w: 0.3357, h: 0.1346, margin: 0, valign: 'top' });
  slide.addText([{ text: '8.1M', options: { fontSize: 8, bold: true, color: '034694', fontFace: 'Calibri' } }], { x: 10.4712, y: 3.4782, w: 0.3357, h: 0.1346, margin: 0, valign: 'top' });
  slide.addText([{ text: '9.8M', options: { fontSize: 8, bold: true, color: '034694', fontFace: 'Calibri' } }], { x: 11.5843, y: 3.2166, w: 0.3357, h: 0.1346, margin: 0, valign: 'top' });
}

// ---------- Slide 4 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addText([{ text: 'THE US CHELSEA FAN', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'More digitally native, diverse, and younger than UK base', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHO THEY ARE', options: { fontSize: 24, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 1.65, w: 6, h: 0.32, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Age Distribution', options: { fontSize: 16, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.5972, y: 2.1965, w: 5, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'HOW THEY ENGAGE', options: { fontSize: 24, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 7, y: 1.65, w: 6, h: 0.32, margin: 0, valign: 'top' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.0014, y: 2.2735, w: 5.7, h: 0.82, fill: { color: 'F5F3EC' } });
  slide.addText([{ text: '73%', options: { fontSize: 28, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 7.1514, y: 2.3235, w: 1.3, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Watch matches via mobile or streaming, instead of watching traditional cable tv', options: { fontSize: 16, color: '111827', fontFace: 'Calibri' } }], { x: 8.3625, y: 2.3235, w: 4.15, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.0014, y: 3.2435, w: 5.7, h: 0.82, fill: { color: 'F5F3EC' } });
  slide.addText([{ text: '2.4x', options: { fontSize: 28, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 7.1514, y: 3.2935, w: 1.3, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'More likely than any other US sports fans to follow a club’s page on social media', options: { fontSize: 16, color: '111827', fontFace: 'Calibri' } }], { x: 8.3625, y: 3.2935, w: 4.15, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.0014, y: 4.2135, w: 5.7, h: 0.82, fill: { color: 'F5F3EC' } });
  slide.addText([{ text: '$98', options: { fontSize: 28, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 7.1514, y: 4.2635, w: 1.3, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Average yearly spend on merchandise, tickets, concessions, and subscriptions', options: { fontSize: 16, color: '111827', fontFace: 'Calibri' } }], { x: 8.3625, y: 4.2635, w: 4.15, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 7.0014, y: 5.1835, w: 5.7, h: 0.82, fill: { color: 'F5F3EC' } });
  slide.addText([{ text: '67%', options: { fontSize: 28, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 7.1514, y: 5.2335, w: 1.3, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Speak two or more languages, with Spanish, Portuguese, and French most common', options: { fontSize: 16, color: '111827', fontFace: 'Calibri' } }], { x: 8.3625, y: 5.2335, w: 4.15, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 6.15, w: 12.1, h: 0.6, fill: { color: '034694' } });
  slide.addText([{ text: 'IMPLICATION:  ', options: { fontSize: 16, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 2.0 } }, { text: 'Programs must be mobile-first, culturally fluent, and community-driven rather than broadcast-focused.', options: { fontSize: 16, color: 'FFFFFF', fontFace: 'Calibri' } }], { x: 0.85, y: 6.15, w: 11.6, h: 0.6, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Fan Profile', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '04', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addText([{ text: '22%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 3.0993, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '24%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 3.6101, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '19%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 4.1209, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '11%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 4.6316, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '8%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 5.1424, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '7%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 5.6491, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addText([{ text: '18-24', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 3.0993, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 3.1845, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 3.1845, w: 3.4403, h: 0.2675, fill: { color: '034694' } });
  slide.addText([{ text: '25-34', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 3.6101, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 3.6952, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 3.6952, w: 3.8857, h: 0.2675, fill: { color: '034694' } });
  slide.addText([{ text: '35-44', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 4.1209, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 4.206, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 4.206, w: 3.0084, h: 0.2675, fill: { color: '4B7BBE' } });
  slide.addText([{ text: '45-54', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 4.6316, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 4.7167, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 4.7167, w: 1.4857, h: 0.2675, fill: { color: '8BA8D6' } });
  slide.addText([{ text: '55-65', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 5.1424, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 5.2275, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 5.2275, w: 1.0306, h: 0.2675, fill: { color: 'C5D2EA' } });
  slide.addText([{ text: '65+', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 5.6491, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 5.7342, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 5.7342, w: 0.9143, h: 0.2675, fill: { color: 'D1DFF8' } });
  slide.addText([{ text: '0-18', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.5972, y: 2.5965, w: 0.8, h: 0.4256, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 2.6817, w: 4, h: 0.2675, fill: { color: 'E5E7EB' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.4972, y: 2.6817, w: 1.3042, h: 0.2675, fill: { color: '034694' } });
  slide.addText([{ text: '9%', options: { fontSize: 13, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 5.6598, y: 2.5965, w: 0.7, h: 0.4256, margin: 0, valign: 'middle' });
}

// ---------- Slide 5 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addText([{ text: 'TOUR MARKETS', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Four East Coast metros anchor Chelsea\'s 2025 US footprint', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea\'s seven World Cup 2025 matches were concentrated across four East Coast metros. Each brings distinct demographic, commercial, and cultural opportunities for follow-on engagement, fan meetup events, and future match locations.', options: { fontSize: 16, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.6, y: 1.62, w: 12.1, h: 0.6, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.4, w: 2.9142, h: 4.25, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.4, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '01', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 0.7976, y: 2.5, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'ATLANTA, GA', options: { fontSize: 17, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 0.7976, y: 2.84, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'VENUE', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 3.55, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Mercedes-Benz Stadium', options: { fontSize: 14, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 3.8, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MATCH', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 4.3, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea 2-0 LAFC', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 4.55, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'POPULATION', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 5.1, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: '6.3M metro', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 5.35, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET HOOK', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 5.8, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Top-ranked MLS', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri', breakLine: true } }, { text: 'attendance market', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 6.05, w: 2.5191, h: 0.55, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6624, y: 2.4, w: 2.9142, h: 4.25, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6624, y: 2.4, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '02', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 3.86, y: 2.5, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHARLOTTE, NC', options: { fontSize: 17, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 3.86, y: 2.84, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'VENUE', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 3.55, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Bank of America Stadium', options: { fontSize: 14, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 3.8, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MATCH', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 4.3, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea 4-1 Benfica', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 4.55, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'POPULATION', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 5.1, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2.8M metro', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 5.35, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET HOOK', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 5.8, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Fastest-growing soccer', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri', breakLine: true } }, { text: 'market in the Southeast', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 6.05, w: 2.5191, h: 0.55, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.7248, y: 2.4, w: 2.9142, h: 4.25, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.7248, y: 2.4, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '03', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 6.9224, y: 2.5, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'PHILADELPHIA, PA', options: { fontSize: 17, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 6.9224, y: 2.84, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'VENUE', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 3.55, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Lincoln Financial Field', options: { fontSize: 14, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 3.8, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MATCH', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 4.3, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea 2-1 Palmeiras', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 4.55, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'POPULATION', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 5.1, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: '6.2M metro', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 5.35, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET HOOK', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 5.8, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Dense diaspora and', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri', breakLine: true } }, { text: 'long-standing culture', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 6.05, w: 2.5191, h: 0.55, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.7872, y: 2.4, w: 2.9142, h: 4.25, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.7872, y: 2.4, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '04', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 9.9848, y: 2.5, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'NEW YORK / NJ', options: { fontSize: 17, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 9.9848, y: 2.84, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'VENUE', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 3.55, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MetLife Stadium', options: { fontSize: 14, bold: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 3.8, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MATCH', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 4.3, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea 3-0 PSG', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 4.55, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'POPULATION', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 5.1, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: '20.1M metro', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 5.35, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET HOOK', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 5.8, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Media capital and flagship commercial market', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 6.05, w: 2.5191, h: 0.55, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Tour Markets', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '05', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
}

// ---------- Slide 6 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 3.3833, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'Median age', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.72, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 2.7133, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'MARKET 01  //  ATLANTA, GA', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The South\'s soccer capital and Chelsea\'s Sun Belt foothold', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET SNAPSHOT', options: { bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.5919, y: 1.62, w: 3.4, h: 0.32, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Metro population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.05, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '6.7M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.3567, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: '37.1', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.0266, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Hispanic population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 3.3899, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '11.6%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.6966, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'African-American population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.0599, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '33.6%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 4.3665, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Median HH income', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.7299, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$85,300', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.0365, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Match attendance', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 5.3998, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '+67,000', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.7065, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'PL viewership index', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 6.0698, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '127', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 6.3834, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.72, w: 8.5514, h: 4.9293, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.6971, w: 8.5514, h: 0.1, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'PROPOSED ENGAGEMENT EVENT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 1.9, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The Blues Block Party', options: { fontSize: 34, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 4.45, y: 2.24, w: 7.95, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The Battery ATL  |  Matchday weekend festival', options: { fontSize: 14, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 4.45, y: 2.95, w: 7.95, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Atlanta', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '06', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.0532, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6035, y: 4.7232, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 5.3932, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.5965, y: 6.0631, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'FORMAT:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 3.5932, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A free, open-to-the-public two-day festival staged in The Battery at Truist Park, timed with a CWC match viewing, and a partnership with Atlanta United, local food vendors, and Spelman and Morehouse college soccer programs.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 3.8978, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'ANCHOR EXPERIENCES:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 4.4891, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Youth clinic led by the Chelsea Foundation where children and teenagers can meet and greet the legends, live DJ sets from ATL hip-hop talent, a jersey customization tent, and a ticketed VIP lounge with expedited entrance and buffet.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 4.7937, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'PROJECTED REACH:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 5.3849, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Over 25,000 on-site attendees are expected, approximately 4M social impressions, 18,000 new supporter sign-ups are estimated via on-site QR activation alone, and 6.7M fans streaming the events live at home.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 5.6895, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
}

// ---------- Slide 7 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 3.3833, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'Median age', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.72, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 2.7133, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'MARKET 02  //  CHARLOTTE, NC', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The Southeast\'s emerging soccer market: building the base', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET SNAPSHOT', options: { bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.5919, y: 1.62, w: 3.4, h: 0.32, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Metro population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.05, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '2.8M', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.3567, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: '35.1', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.0266, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Hispanic population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 3.3899, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '11.2%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.6966, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'African-American population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.0599, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '22.4', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 4.3665, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Median HH income', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.7299, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '56', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: ',300', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.0365, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Match attendance', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 5.3998, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '+', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '35', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: ',000', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.7065, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'PL viewership index', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 6.0698, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '112', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 6.3834, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.72, w: 8.5514, h: 4.9293, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.6971, w: 8.5514, h: 0.1, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'PROPOSED ENGAGEMENT EVENT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 1.9, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Carolina Blues Academy', options: { fontSize: 34, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 4.45, y: 2.24, w: 7.95, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Multi-site youth clinic tour  |  4 cities, 5 days', options: { fontSize: 14, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 4.45, y: 2.95, w: 7.95, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Charlotte', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '07', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.0532, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6035, y: 4.7232, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 5.3932, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.5965, y: 6.0631, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'FORMAT:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 3.5932, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A traveling youth academy tour across Charlotte, Raleigh, Greensboro, and Columbia. Chelsea Foundation coaches will bring free clinics to underserved communities for U-8 to U-16 players to help inspire the youth in the area.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 3.8978, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'ANCHOR EXPERIENCES:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 4.4891, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Daily skills sessions, Pathway-To-Cobham talent ID program in partnership with Charlotte FC, parents\' networking lounge with supporter club leaders, academy jersey giveaway, and food trucks supporting local favorites.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 4.7937, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'PROJECTED REACH:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 5.3849, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: '1,200 participating youth plus 3,500 parents on-site and an estimated 12,000 social follows captured via family sign-ups. Long term benefits also include: US scouting pipeline expansion and local market promotional campaigns. ', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 5.6895, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
}

// ---------- Slide 8 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 3.3833, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'Median age', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.72, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 2.7133, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'MARKET 03  //  PHILADELPHIA, PA', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Supporters remain deeply linked to their cultural roots', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET SNAPSHOT', options: { bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.5919, y: 1.62, w: 3.4, h: 0.32, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Metro population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.05, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '6.2M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.3567, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: '39.6', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.0266, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Hispanic population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 3.3899, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '10.4%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.6966, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'African-American population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.0599, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '20.9', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 4.3665, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Median HH income', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.7299, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$83,100', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.0365, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Match attendance', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 5.3998, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '+', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '45', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: ',000', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.7065, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'PL viewership index', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 6.0698, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '105', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 6.3834, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.72, w: 8.5514, h: 4.9293, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.6971, w: 8.5514, h: 0.1, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'PROPOSED ENGAGEMENT EVENT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 1.9, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Bridge to the Bridge', options: { fontSize: 34, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 4.45, y: 2.24, w: 7.95, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Supporter club summit | 5K charity run', options: { fontSize: 14, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 4.45, y: 2.95, w: 7.95, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Philadelphia', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '08', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.0532, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6035, y: 4.7232, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 5.3932, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.5965, y: 6.0631, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'FORMAT:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 3.5932, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Weekend summit for North American club leaders hosted at a city center venue, paired with a 5K fun run along Benjamin Franklin Parkway benefiting the Chelsea Foundation, which is a partner charity that helps the homeless.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 3.8978, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'ANCHOR EXPERIENCES:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 4.4891, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'First-team legend Q&A, exclusive merchandise drop, Spanish, Portuguese, and French language fan panels reflecting the diverse base, and a discount card for a pub crawl, which includes a route to 20+ certified CFC watch-party venues.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 4.7937, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'PROJECTED REACH:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 5.3849, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: '600 supporter leaders, estimated 3,500 5K run participants, and over 8,000 summit attendees registered so far. This strengthens the highest-value segment: repeat travelers to Stamford Bridge because of the high foot traffic.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 5.6895, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
}

// ---------- Slide 9 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 3.3833, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'Median age', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.72, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 2.7133, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'MARKET 04  //  NEW YORK & NEW JERSEY', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'The flagship market where global brands earn US credibility', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'MARKET SNAPSHOT', options: { bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.5919, y: 1.62, w: 3.4, h: 0.32, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Metro population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 2.05, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '20.1', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: 'M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.3567, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: '38.9', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.0266, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Hispanic population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 3.3899, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '24.5', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.6966, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'African-American population', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.0599, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '28.6', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '%', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 4.3665, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Median HH income', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 4.7299, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$82,700', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.0365, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Match attendance', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 5.3998, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '+', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: '75', options: { bold: true, color: '034694', fontFace: 'Century Gothic' } }, { text: ',000', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.7065, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'PL viewership index', options: { fontSize: 14, color: '475569', fontFace: 'Calibri' } }], { x: 0.6, y: 6.0698, w: 3.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '131', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 6.3834, w: 3.4, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.72, w: 8.5514, h: 4.9293, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 4.15, y: 1.6971, w: 8.5514, h: 0.1, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'PROPOSED ENGAGEMENT EVENT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 1.9, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea Takes Manhattan', options: { fontSize: 34, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 4.45, y: 2.24, w: 7.95, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Week-long flagship brand residency  |  SoHo and Times Square', options: { fontSize: 14, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 4.45, y: 2.95, w: 7.95, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'New York / New Jersey', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '09', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 4.0532, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6035, y: 4.7232, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 5.3932, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addShape(pres.shapes.LINE, { x: 0.5965, y: 6.0631, w: 2.8514, h: 0, line: { color: 'E5E7EB', width: 0.75 } });
  slide.addText([{ text: 'FORMAT:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 3.5932, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A pop-up experiential flagship event anchored by a 7-day Chelsea House in SoHo, paired with a Times Square trophy activation, media day with the players and local news outlets, and a champions\' parade reprise closing CWC week.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 3.8978, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'ANCHOR EXPERIENCES:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 4.4891, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'A members-only dinner at a Michelin Star restaurant, live podcast streaming, a TikTok influencer creator house, limited-edition collaborations with NY streetwear brands like Supreme, and a trophy photo station in Times Square.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 4.7937, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'PROJECTED REACH:', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 4.45, y: 5.3849, w: 7.95, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Estimated 120K walk-through visitors, 180M social media impressions projected, $8M in estimated retail sales, $2M in experiential revenue at the pop-up event. This is a key market to win for US commercial partnership activation.', options: { fontSize: 12, fontFace: 'Calibri' } }], { x: 4.4602, y: 5.6895, w: 7.9398, h: 0.4039, margin: 0, valign: 'top' });
}

// ---------- Slide 10 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addText([{ text: 'CROSS-MARKET COMPARISON', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Each market plays a distinct role in the activation portfolio', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'ADDRESSABLE OPPORTUNITY BY MARKET', options: { fontSize: 16, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 1.66, w: 6.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Soccer-interested adults, millions', options: { fontSize: 15, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 1.9635, w: 6.5, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 1.5174, y: 2.4935, w: 0, h: 1.8486, line: { color: 'E5E7EB', width: 0.5 } });
  slide.addText([{ text: 'Atlanta', options: { fontSize: 12, color: '111827', fontFace: 'Calibri', align: 'right' } }], { x: 0.0174, y: 2.5635, w: 1.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5174, y: 2.5435, w: 0.78, h: 0.32, fill: { color: '034694' } });
  slide.addText([{ text: '1.3M', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 2.3774, y: 2.5635, w: 0.75, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Charlotte', options: { fontSize: 12, color: '111827', fontFace: 'Calibri', align: 'right' } }], { x: 0.0174, y: 3.0635, w: 1.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5174, y: 3.0435, w: 0.36, h: 0.32, fill: { color: '034694' } });
  slide.addText([{ text: '0.6M', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 1.9574, y: 3.0635, w: 0.75, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Philadelphia', options: { fontSize: 12, color: '111827', fontFace: 'Calibri', align: 'right' } }], { x: 0.0174, y: 3.5635, w: 1.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5174, y: 3.5435, w: 0.84, h: 0.32, fill: { color: '034694' } });
  slide.addText([{ text: 'NY / NJ', options: { fontSize: 12, bold: true, color: '111827', fontFace: 'Calibri', align: 'right' } }], { x: 0.0174, y: 4.0635, w: 1.4, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '4.8M', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 4.4774, y: 4.0635, w: 0.75, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.5674, y: 2.5935, w: 2.6653, h: 1.25, fill: { color: '034694' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.5674, y: 2.5935, w: 0.08, h: 1.25, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'FLAGSHIP MARKET', options: { fontSize: 9, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 3.7674, y: 2.6935, w: 2.65, h: 0.22, margin: 0, valign: 'middle' });
  slide.addText([{ text: '59% ', options: { fontSize: 22, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }, { text: 'of tam', options: { fontSize: 13, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 3.7674, y: 2.8935, w: 2.65, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'More than half of the total market is in NY/NJ alone', options: { fontSize: 14, italic: true, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 3.7674, y: 3.3235, w: 2.65, h: 0.42, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 3.9674, y: 3.8435, w: 0, h: 0.36, line: { color: '034694', width: 1.0, dashType: 'dash' } });
  slide.addTable([
    [{ text: [{ text: 'MARKET', options: { fontSize: 14, bold: true, color: 'FFFFFF', fontFace: 'Calibri' } }], options: { fill: { color: '034694' }, valign: 'middle' } }, { text: [{ text: 'STRATEGIC ROLE', options: { fontSize: 14, bold: true, color: 'FFFFFF', fontFace: 'Calibri' } }], options: { fill: { color: '034694' }, valign: 'middle' } }, { text: [{ text: 'PRIORITY', options: { fontSize: 14, bold: true, color: 'FFFFFF', fontFace: 'Calibri', align: 'center' } }], options: { fill: { color: '034694' }, valign: 'middle', align: 'center' } }],
    [{ text: [{ text: 'Atlanta', options: { fontSize: 13, bold: true, color: '034694', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'Cultural base-builder', options: { fontSize: 13, color: '111827', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'HIGH', options: { fontSize: 13, bold: true, color: 'C9302C', fontFace: 'Calibri', align: 'center' } }], options: { valign: 'middle', align: 'center' } }],
    [{ text: [{ text: 'Charlotte', options: { fontSize: 13, bold: true, color: '034694', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'Youth pipeline and growth bet', options: { fontSize: 13, color: '111827', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'MED', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', align: 'center' } }], options: { valign: 'middle', align: 'center' } }],
    [{ text: [{ text: 'Philadelphia', options: { fontSize: 13, bold: true, color: '034694', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'Loyalty deepening', options: { fontSize: 13, color: '111827', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'MED', options: { fontSize: 13, bold: true, color: 'DBA111', fontFace: 'Calibri', align: 'center' } }], options: { valign: 'middle', align: 'center' } }],
    [{ text: [{ text: 'NY / NJ', options: { fontSize: 13, bold: true, color: '034694', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'Flagship and commercial hub', options: { fontSize: 13, color: '111827', fontFace: 'Calibri' } }], options: { valign: 'middle' } }, { text: [{ text: 'HIGH', options: { fontSize: 13, bold: true, color: 'C9302C', fontFace: 'Calibri', align: 'center' } }], options: { valign: 'middle', align: 'center' } }]
  ], { x: 7.1042, y: 1.7435, w: 5.5958, colW: [1.4781, 2.8507, 1.267], border: { type: 'none' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.95, w: 12.1, h: 1.85, fill: { color: 'F5F3EC' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.95, w: 0.1, h: 1.85, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'RECOMMENDED INVESTMENT MIX', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.9, y: 5.05, w: 12, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$14M total program budget allocated across the four markets by opportunity', options: { fontSize: 20, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 5.3, w: 12, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Atlanta', options: { fontSize: 11, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 0.9, y: 5.85, w: 2.8, h: 0.28, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$3.1M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.9, y: 6.13, w: 2.8, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: '22% of program budget', options: { fontSize: 11, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.9, y: 6.5, w: 2.8, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Charlotte', options: { fontSize: 11, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 3.92, y: 5.85, w: 2.8, h: 0.28, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$2.0M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 3.92, y: 6.13, w: 2.8, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: '14% of program budget', options: { fontSize: 11, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.92, y: 6.5, w: 2.8, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Philadelphia', options: { fontSize: 11, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 6.94, y: 5.85, w: 2.8, h: 0.28, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$2.6M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 6.94, y: 6.13, w: 2.8, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: '19% of program budget', options: { fontSize: 11, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.94, y: 6.5, w: 2.8, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'NY / NJ', options: { fontSize: 11, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 9.96, y: 5.85, w: 2.8, h: 0.28, margin: 0, valign: 'middle' });
  slide.addText([{ text: '$6.3M', options: { fontSize: 18, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 9.96, y: 6.13, w: 2.8, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: '45% of program budget', options: { fontSize: 11, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.96, y: 6.5, w: 2.8, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Cross-Market Comparison', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '10', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '1.4M', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 2.4374, y: 3.5635, w: 0.75, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 1.5174, y: 4.0435, w: 2.88, h: 0.2986, fill: { color: 'DBA111' } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
}

// ---------- Slide 11 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: 'FFFFFF' };
  slide.addText([{ text: 'PROGRAM ROADMAP', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Phases of the 12-month market activation plan', options: { fontSize: 30, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.0252, w: 12.1014, h: 0.05, fill: { color: '034694' } });
  slide.addShape(pres.shapes.OVAL, { x: 1.9071, y: 2.9052, w: 0.3, h: 0.3, fill: { color: 'DBA111' }, line: { color: '034694', width: 2.0 } });
  slide.addText([{ text: 'PHASE 1', options: { fontSize: 12, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0, align: 'center' } }], { x: 0.6, y: 2.3908, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Apr to Jun 2026', options: { fontSize: 12, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 0.6, y: 2.6116, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.OVAL, { x: 4.9384, y: 2.9052, w: 0.3, h: 0.3, fill: { color: 'DBA111' }, line: { color: '034694', width: 2.0 } });
  slide.addText([{ text: 'PHASE 2', options: { fontSize: 12, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0, align: 'center' } }], { x: 3.6624, y: 2.3908, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Jul to Sep 2026', options: { fontSize: 12, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 3.6624, y: 2.6116, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.OVAL, { x: 8.025, y: 2.9052, w: 0.3, h: 0.3, fill: { color: 'DBA111' }, line: { color: '034694', width: 2.0 } });
  slide.addText([{ text: 'PHASE 3', options: { fontSize: 12, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0, align: 'center' } }], { x: 6.7248, y: 2.3908, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Oct to Dec 2026', options: { fontSize: 12, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 6.7248, y: 2.6116, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.OVAL, { x: 11.0943, y: 2.9052, w: 0.3, h: 0.3, fill: { color: 'DBA111' }, line: { color: '034694', width: 2.0 } });
  slide.addText([{ text: 'PHASE 4', options: { fontSize: 12, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0, align: 'center' } }], { x: 9.7872, y: 2.3908, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Jan to Mar 2027', options: { fontSize: 12, color: '475569', fontFace: 'Calibri', align: 'center' } }], { x: 9.7872, y: 2.6116, w: 2.9142, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CHELSEA FC  |  US FAN EXPANSION STRATEGY', options: { fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri', charSpacing: 2.0 } }], { x: 1.05, y: 6.98, w: 7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Program Roadmap', options: { fontSize: 10, italic: true, color: '475569', fontFace: 'Calibri', align: 'right' } }], { x: 8.3, y: 6.98, w: 3.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '11', options: { fontSize: 12, bold: true, color: '034694', fontFace: 'Century Gothic', align: 'right' } }], { x: 12, y: 6.98, w: 0.7, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 7.1113, w: 0.35, h: 0.04, fill: { color: 'DBA111' } });
  slide.addText([{ text: 'LEADING INTO THE 2026 WORLD CUP', options: { fontSize: 16, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 1.5735, w: 6.5, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: '4 phases that build momentum and culture', options: { fontSize: 15, bold: true, color: '034694', fontFace: 'Century Gothic' } }], { x: 0.6, y: 1.877, w: 6.5, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.332, w: 2.9142, h: 3.4232, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.332, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '1', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 0.7976, y: 3.432, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'REIGNITE', options: { fontSize: 24, bold: true, fontFace: 'Century Gothic' } }], { x: 0.7976, y: 3.772, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHO', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 4.482, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Retargeting of attendees', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 4.732, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHAT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 5.232, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Supporter club reactivation', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 5.482, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'HOW', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.7976, y: 6.032, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Advertisements on the bridge', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 0.7976, y: 6.282, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6624, y: 3.332, w: 2.9142, h: 3.4232, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 3.6624, y: 3.332, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '2', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 3.86, y: 3.432, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'BUILD', options: { fontSize: 24, bold: true, fontFace: 'Century Gothic' } }], { x: 3.86, y: 3.772, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHO', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 4.482, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Atlanta based supporters', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 4.732, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHAT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 5.232, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Blues Block Party ATL', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 5.482, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'HOW', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 3.86, y: 6.032, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Influencer creator residency', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 3.86, y: 6.282, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.7248, y: 3.332, w: 2.9142, h: 3.4232, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 6.7248, y: 3.332, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '3', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 6.9224, y: 3.432, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'AMPLIFY', options: { fontSize: 24, bold: true, fontFace: 'Century Gothic' } }], { x: 6.9224, y: 3.772, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHO', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 4.482, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Season ticket holders', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 4.732, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHAT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 5.232, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'US brand partnerships', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 5.482, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'HOW', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 6.9224, y: 6.032, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Chelsea Takes Manhattan ', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 6.9224, y: 6.282, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.7872, y: 3.332, w: 2.9142, h: 3.4232, fill: { color: 'FFFFFF' }, line: { color: 'E5E7EB', width: 1.0 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 9.7872, y: 3.332, w: 2.9142, h: 1, fill: { color: '034694' } });
  slide.addText([{ text: '4', options: { fontSize: 32, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 9.9848, y: 3.432, w: 0.8891, h: 0.35, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'CONVERT', options: { fontSize: 24, bold: true, fontFace: 'Century Gothic' } }], { x: 9.9848, y: 3.772, w: 2.5191, h: 0.5, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHO', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 4.482, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Local retail shoppers', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 4.732, w: 2.5191, h: 0.4, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'WHAT', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 5.232, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'US paid membership launch', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 5.482, w: 2.5191, h: 0.45, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'HOW', options: { fontSize: 14, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 9.9848, y: 6.032, w: 2.5191, h: 0.25, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Select 2027/2028 tour venues', options: { fontSize: 14, italic: true, color: '111827', fontFace: 'Calibri' } }], { x: 9.9848, y: 6.282, w: 2.5191, h: 0.35, margin: 0, valign: 'middle' });
}

// ---------- Slide 12 ----------
{
  const slide = pres.addSlide();
  slide.background = { color: '021F47' };
  slide.addText([{ text: '01', options: { fontSize: 64, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 0.6, y: 2.1576, w: 1.3, h: 1.2, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Stand up to the US Fan Ops nucleus', options: { fontSize: 24, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 2.1014, y: 2.338, w: 10.6, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Hire a US-based Head of Fan Engagement plus a four-person field team, one activation lead per East Coast market.', options: { fontSize: 15, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 2.1, y: 2.8818, w: 10.6, h: 0.2524, margin: 0, valign: 'top' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 2.1, y: 3.4457, w: 10.6, h: 0.01, fill: { color: '2A3F67' } });
  slide.addText([{ text: '02', options: { fontSize: 64, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 0.6, y: 3.6417, w: 1.3, h: 1.2, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Commit to the NY / NJ flagship', options: { fontSize: 24, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 2.1, y: 3.8261, w: 10.6, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Lock the SoHo venue, secure creative partners, and announce \'Chelsea Takes Manhattan\' by September 2026. ', options: { fontSize: 15, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 2.1, y: 4.3672, w: 10.6, h: 0.2524, margin: 0, valign: 'top' });
  slide.addShape(pres.shapes.RECTANGLE, { x: 2.1, y: 5.0278, w: 10.6, h: 0.01, fill: { color: '2A3F67' } });
  slide.addText([{ text: '03', options: { fontSize: 64, bold: true, color: 'DBA111', fontFace: 'Century Gothic' } }], { x: 0.6, y: 5.1259, w: 1.3, h: 1.2, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Instrument every touchpoint', options: { fontSize: 24, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 2.1, y: 5.2967, w: 10.6, h: 0.4039, margin: 0, valign: 'top' });
  slide.addText([{ text: 'Deploy a unified CRM that captures every on-site interaction, QR scan, ticket buy, and supporter club sign-up. ', options: { fontSize: 15, color: 'CADCFC', fontFace: 'Calibri' } }], { x: 2.1, y: 5.8585, w: 10.6, h: 0.2524, margin: 0, valign: 'top' });
  slide.addText([{ text: 'McKinsey & Company  |  Confidential', options: { fontSize: 10, color: '9CA3AF', fontFace: 'Calibri' } }], { x: 0.6, y: 6.9, w: 12.1, h: 0.3, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'RECOMMENDATIONS', options: { fontSize: 11, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 4.0 } }], { x: 0.6, y: 0.42, w: 12, h: 0.32, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'Three moves to make in the next 90 days', options: { fontSize: 32, bold: true, color: 'FFFFFF', fontFace: 'Century Gothic' } }], { x: 0.6, y: 0.78, w: 12, h: 0.7, margin: 0, valign: 'middle' });
  slide.addText([{ text: 'KEEP THE BLUE FLAG FLYING HIGH IN AMERICA.', options: { fontSize: 16, bold: true, color: 'DBA111', fontFace: 'Calibri', charSpacing: 3.0 } }], { x: 0.6, y: 1.5735, w: 8.3933, h: 0.3, margin: 0, valign: 'middle' });
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 6.61, w: 12.1014, h: 0, line: { color: 'DBA111', width: 1.75 } });
}

pres.writeFile({ fileName: 'output.pptx' }).then(f => console.log('Wrote', f));