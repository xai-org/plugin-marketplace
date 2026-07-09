const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

// ── DESIGN TOKENS ──────────────────────────────────────────────
const C = {
  bg:      'FFFFFF',
  panel:   'F4F7FA',
  navy:    '1B2B4B',   // titles, headers
  teal:    '00A878',   // primary accent
  blue:    '3B82F6',
  gold:    'F0A500',
  red:     'EF4444',
  purple:  '7C3AED',
  body:    '334155',
  muted:   '94A3B8',
  border:  'CBD5E1',
  divider: 'E2E8F0',
};
const F = 'Calibri';

// ── SLIDE TEMPLATE ────────────────────────────────────────────
function addSlide(eyebrow, title, subtitle) {
  const s = pptx.addSlide();
  s.background = { color: C.bg };

  // Top accent bar
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:13.33, h:0.055, fill:{ color:C.teal }, line:{type:'none'} });

  // Footer
  s.addShape(pptx.ShapeType.rect, { x:0, y:7.22, w:13.33, h:0.28, fill:{ color:C.navy }, line:{type:'none'} });
  s.addText('DOXYCYCLINE FOR BACTERIAL STD PROPHYLAXIS  ·  GRAND ROUNDS, DERMATOLOGY  ·  NOVEMBER 2020', {
    x:0.4, y:7.24, w:12, h:0.22,
    fontSize:7, color:'FFFFFF', fontFace:F, bold:false, charSpacing:1.5
  });

  if (eyebrow) {
    s.addText(eyebrow.toUpperCase(), {
      x:0.4, y:0.2, w:12.5, h:0.22,
      fontSize:10, bold:true, color:C.teal, fontFace:F, charSpacing:2.5
    });
  }
  if (title) {
    s.addText(title, {
      x:0.4, y:0.38, w:12.5, h:0.62,
      fontSize:26, bold:true, color:C.navy, fontFace:F
    });
    s.addShape(pptx.ShapeType.rect, {
      x:0.4, y:1.0, w:12.5, h:0.025,
      fill:{ color:C.divider }, line:{type:'none'}
    });
  }
  if (subtitle) {
    // ONE LINE — keep concise
    s.addText(subtitle, {
      x:0.4, y:1.03, w:12.5, h:0.32,
      fontSize:13.5, color:C.body, fontFace:F
    });
  }
  return s;
}

// ── UTILS ──────────────────────────────────────────────────────
function hLine(s, x, y, w, col) {
  s.addShape(pptx.ShapeType.rect, { x, y, w, h:0.02, fill:{ color:col||C.divider }, line:{type:'none'} });
}
function vLine(s, x, y, h, col) {
  s.addShape(pptx.ShapeType.rect, { x, y, w:0.02, h, fill:{ color:col||C.divider }, line:{type:'none'} });
}
function bigStat(s, x, y, val, label, sub, col) {
  s.addText(val, { x, y, w:3.0, h:0.6, fontSize:40, bold:true, color:col||C.teal, fontFace:F, align:'left' });
  s.addText(label, { x, y:y+0.58, w:3.0, h:0.22, fontSize:10, bold:true, color:C.navy, fontFace:F, charSpacing:1.5, align:'left' });
  if (sub) s.addText(sub, { x, y:y+0.78, w:3.0, h:0.2, fontSize:9, color:C.muted, fontFace:F, align:'left' });
}
function legendItem(s, x, y, color, label) {
  s.addShape(pptx.ShapeType.rect, { x, y:y+0.04, w:0.22, h:0.12, fill:{ color }, line:{type:'none'} });
  s.addText(label, { x:x+0.28, y, w:2.5, h:0.22, fontSize:10, color:C.body, fontFace:F });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg };

  // Left strong teal bar
  s.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:7.5, fill:{ color:C.teal }, line:{type:'none'} });

  // Right panel — navy REMOVED per feedback
  // Title expands full width
  s.addText('Doxycycline for\nBacterial STD\nProphylaxis', {
    x:0.45, y:1.6, w:12.5, h:4.0,
    fontSize:64, bold:true, color:C.navy, fontFace:F,
    lineSpacingMultiple:1.02
  });

  s.addText('GRAND ROUNDS  ·  DERMATOLOGY', {
    x:0.45, y:1.2, w:12, h:0.28,
    fontSize:11, bold:true, color:C.teal, fontFace:F, charSpacing:3
  });

  s.addText('Andy Nguyen, MD\nRonald O. Perelman Department of Dermatology\nNovember 13, 2020', {
    x:0.45, y:5.8, w:12, h:0.95,
    fontSize:12, color:C.muted, fontFace:F
  });

  // Footer
  s.addShape(pptx.ShapeType.rect, { x:0, y:7.22, w:13.33, h:0.28, fill:{ color:C.navy }, line:{type:'none'} });
  s.addText('DOXYCYCLINE FOR BACTERIAL STD PROPHYLAXIS  ·  GRAND ROUNDS, DERMATOLOGY  ·  NOVEMBER 2020', {
    x:0.4, y:7.24, w:12, h:0.22, fontSize:7, color:'FFFFFF', fontFace:F, charSpacing:1.5
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — HISTORY TIMELINE
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Historical Context',
    'A history of preventing the unintended consequences of sex',
    'Six decades of sexual health pharmacology set the blueprint for bacterial STD prophylaxis.'
  );

  // Spine
  const TY = 4.6;
  // Gradient spine: thin line fading to accent at end
  s.addShape(pptx.ShapeType.rect, { x:0.35, y:TY, w:12.5, h:0.06, fill:{ color:C.divider }, line:{type:'none'} });
  // Highlight ???  segment in teal
  s.addShape(pptx.ShapeType.rect, { x:10.8, y:TY, w:2.05, h:0.06, fill:{ color:C.teal }, line:{type:'none'} });

  const events = [
    { yr:'1957', x:0.92, above:true,  label:'Enovid approved\nfor menstrual\nirregularities' },
    { yr:'1960', x:2.3,  above:false, label:'Enovid approved\nfor oral\ncontraception' },
    { yr:'1972', x:4.1,  above:true,  label:'Eisenstadt v. Baird\nenables OCPs for\nunmarried women' },
    { yr:'1998', x:5.95, above:false, label:'Preven & Plan B\napproved for\nemergency contraception' },
    { yr:'2012', x:7.8,  above:true,  label:'Truvada approved\nfor HIV PrEP\n(tenofovir/emtricitabine)' },
    { yr:'2019', x:9.65, above:false, label:'Descovy approved\nfor HIV PrEP\n(newer formulation)' },
    { yr:'???',  x:11.5, above:true,  label:'Doxycycline\nfor bacterial\nSTD prophylaxis?', accent:true },
  ];

  events.forEach(ev => {
    const dotSz = ev.accent ? 0.34 : 0.24;
    const dotCol = ev.accent ? C.teal : C.navy;
    s.addShape(pptx.ShapeType.ellipse, {
      x:ev.x-dotSz/2, y:TY-dotSz/2, w:dotSz, h:dotSz,
      fill:{ color: ev.accent ? C.teal : C.bg },
      line:{ color: dotCol, pt: ev.accent ? 3 : 2 }
    });

    const labelX = ev.x - 0.86;

    if (ev.above) {
      // Stem starts at label area, ends exactly at circle top edge
      const stemH = 1.35 - dotSz/2;
      s.addShape(pptx.ShapeType.rect, { x:ev.x, y:TY-1.35, w:0.02, h:stemH, fill:{ color: ev.accent ? C.teal : C.border }, line:{type:'none'} });
      if (ev.accent) {
        s.addShape(pptx.ShapeType.rect, { x:labelX-0.1, y:TY-2.6, w:1.92, h:0.5, fill:{ color:'E8FBF4' }, line:{type:'none'} });
      }
      s.addText(ev.yr, { x:labelX, y:TY-2.55, w:1.72, h:0.42, align:'center', fontSize: ev.accent ? 28 : 22, bold:true, color: ev.accent ? C.teal : C.navy, fontFace:F });
      s.addText(ev.label, { x:labelX, y:TY-2.18, w:1.72, h:0.76, align:'center', fontSize:10.5, color: ev.accent ? C.teal : C.body, fontFace:F, bold: ev.accent });
    } else {
      // Stem starts at circle bottom edge
      s.addShape(pptx.ShapeType.rect, { x:ev.x, y:TY+dotSz/2, w:0.02, h:0.82, fill:{ color:C.border }, line:{type:'none'} });
      s.addText(ev.yr, { x:ev.x-0.86, y:TY+dotSz/2+0.85, w:1.72, h:0.38, align:'center', fontSize:22, bold:true, color:C.navy, fontFace:F });
      s.addText(ev.label, { x:ev.x-0.86, y:TY+dotSz/2+1.23, w:1.72, h:0.68, align:'center', fontSize:10.5, color:C.body, fontFace:F });
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — STD RATES: LINE CHART with legend
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Epidemiological Context',
    'Bacterial STDs have risen for five consecutive years to modern-era peaks',
    'All three major bacterial STIs increased from 2014–2018; chlamydia alone accounts for 1.76 million annual cases.'
  );

  // Inline stat callouts (no boxes — just numbers + labels)
  const stats = [
    { v:'1.76M', l:'Chlamydia cases (2018)', c:C.teal },
    { v:'583K',  l:'Gonorrhea cases (2018)',  c:C.blue },
    { v:'115K',  l:'Syphilis cases (2018)',    c:C.gold },
    { v:'+82%',  l:'Gonorrhea increase since 2009 low', c:C.red },
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i*3.12;
    s.addText(st.v, { x, y:1.4, w:2.9, h:0.55, fontSize:34, bold:true, color:st.c, fontFace:F, align:'left' });
    s.addText(st.l, { x, y:1.93, w:2.9, h:0.3, fontSize:10.5, color:C.body, fontFace:F, align:'left' });
    hLine(s, x, 2.22, 2.7, C.divider);
  });

  // 5-year trend line chart
  const chartData = [
    { name:'Chlamydia',
      labels:['2014','2015','2016','2017','2018'],
      values:[1442, 1527, 1598, 1709, 1759] },
    { name:'Gonorrhea',
      labels:['2014','2015','2016','2017','2018'],
      values:[350, 395, 469, 556, 583] },
    { name:'Syphilis (all stages)',
      labels:['2014','2015','2016','2017','2018'],
      values:[63, 75, 88, 102, 115] },
  ];
  s.addChart(pptx.ChartType.line, chartData, {
    x:0.4, y:2.42, w:12.5, h:4.5,
    chartColors: [C.teal, C.blue, C.gold],
    lineDataSymbol: 'circle',
    lineDataSymbolSize: 7,
    lineSmooth: false,
    showLegend: true,
    legendPos: 'b',
    legendFontSize: 11,
    valAxisTitle: 'Reported cases (thousands)',
    catAxisTitle: '',
    valAxisTitleFontSize: 11,
    valAxisLabelFontSize: 11,
    catAxisLabelFontSize: 12,
    dataLabelFontSize: 10,
    showValue: true,
    dataLabelFormatCode: '#,##0',
    dataLabelPosition: 't',
    valAxisMinVal: 0,
    plotAreaBorderColor: C.divider,
    showValAxisTitle: true,
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — PREVENTION LANDSCAPE: lollipop chart
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Prevention Landscape',
    'Current STD prevention strategies leave a pharmacological gap',
    'Behavioral and reactive tools dominate STD prevention — no prophylactic medication exists for bacterial STDs.'
  );

  // Section header
  s.addText('POPULATION-LEVEL EFFICACY IN HIGH-RISK MSM (RELATIVE SCALE)', {
    x:3.6, y:1.44, w:9.3, h:0.25,
    fontSize:9.5, bold:true, color:C.muted, fontFace:F, charSpacing:1.5
  });

  // Legend inline
  legendItem(s, 8.6, 1.44, C.blue, 'Behavioral / reactive');
  legendItem(s, 10.5, 1.44, C.teal, 'Pharmacological (doxycycline)');

  // Chart area: narrow label col 0.4–1.55, chart area 1.6–12.8
  const AX_X0 = 1.6, AX_W = 11.1;

  // Vertical grid lines with % labels at top
  [0, 25, 50, 75, 100].forEach(pct => {
    const gx = AX_X0 + (pct / 100) * AX_W;
    vLine(s, gx, 1.72, 4.82, C.divider);
    s.addText(pct+'%', { x:gx-0.28, y:1.72, w:0.56, h:0.24, align:'center', fontSize:9.5, color:C.muted, fontFace:F });
  });
  s.addText('← Less effective', { x:AX_X0, y:6.7, w:3.0, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true });
  s.addText('More effective →', { x:AX_X0+AX_W-3.0, y:6.7, w:3.0, h:0.22, fontSize:9, color:C.muted, fontFace:F, align:'right', italic:true });

  const strategies = [
    { label:'STI Screening\n& Treatment', pct:0, note:'Reactive: treats existing infections but does not prevent new acquisition', col:C.blue, sub:'Standard of care' },
    { label:'Counseling\n& Education', pct:18, note:'Behavioral risk reduction counseling; moderate impact in motivated populations only', col:C.blue, sub:'Brookmeyer et al., Sex Transm Dis 2016' },
    { label:'Condom\nPromotion', pct:45, note:'85% effective with consistent perfect use — but condom use is declining among MSM and youth', col:C.blue, sub:'CDC Prevention Research' },
    { label:'Doxycycline\nPrEP / PEP  ✦', pct:73, note:'73% STD reduction (PrEP, Bolan) and 47% reduction (PEP, IPERGAY) in early clinical trials', col:C.teal, sub:'Bolan 2015; Molina 2018' },
  ];

  const ROW_START = 2.05, ROW_H = 1.22;

  strategies.forEach((st, i) => {
    const ry = ROW_START + i * ROW_H;
    const barW = (st.pct / 100) * AX_W;
    const dotX = AX_X0 + barW;
    const isTeal = st.col === C.teal;

    // Strategy label — narrow column on left
    s.addText(st.label, {
      x:0.4, y:ry, w:1.1, h:0.5,
      fontSize:11, bold:true, color: isTeal ? C.teal : C.navy,
      fontFace:F, align:'right', valign:'middle'
    });

    // Background track
    s.addShape(pptx.ShapeType.rect, { x:AX_X0, y:ry+0.14, w:AX_W, h:0.22, fill:{ color:C.divider }, line:{type:'none'} });

    // Filled bar
    if (st.pct > 0) {
      s.addShape(pptx.ShapeType.rect, { x:AX_X0, y:ry+0.14, w:barW, h:0.22, fill:{ color:st.col }, line:{type:'none'} });
    }

    // End dot
    s.addShape(pptx.ShapeType.ellipse, {
      x:dotX - 0.16, y:ry+0.09, w:0.32, h:0.32,
      fill:{ color:st.col }, line:{ color:'FFFFFF', pt:1.5 }
    });

    // Value label — RIGHT of dot (only for non-zero)
    if (st.pct > 0) {
      s.addText(st.pct+'%', {
        x:dotX + 0.22, y:ry+0.09, w:0.65, h:0.32,
        fontSize:12.5, bold:true, color:st.col, fontFace:F
      });
    }

    // Note + ref below bar
    s.addText(st.note, { x:AX_X0, y:ry+0.44, w:AX_W, h:0.26, fontSize:11, color:C.body, fontFace:F });
    s.addText(st.sub, { x:AX_X0, y:ry+0.68, w:AX_W, h:0.2, fontSize:9, color:C.muted, fontFace:F, italic:true });

    hLine(s, 0.4, ry + ROW_H - 0.05, 12.5, C.divider);
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — DOXYCYCLINE PHARMACOLOGY & MECHANISM
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Mechanism & Pharmacology',
    'Doxycycline: prophylaxis, treatment, and anti-inflammation across six decades',
    'Doxycycline inhibits bacterial 30S ribosomal protein synthesis — the same mechanism underlies both treatment and prophylaxis.'
  );

  // Three columns without boxes — just vertical dividers
  const cols = [
    { title:'PROPHYLAXIS USES', color:C.blue, items:[
      'Malaria prophylaxis', 'Leptospirosis prevention',
      'Lyme disease prevention', 'Scrub typhus prevention',
      'STD prophylaxis (emerging)'] },
    { title:'TREATMENT SPECTRUM', color:C.teal, items:[
      'Gram-positive bacteria', 'Gram-negative bacteria',
      'Atypical organisms', 'Broad-spectrum coverage',
      'Community-acquired pneumonia'] },
    { title:'ANTI-INFLAMMATORY', color:C.gold, items:[
      'Acne vulgaris', 'Rosacea',
      'Bullous pemphigoid', 'Lichen planopilaris',
      'Sub-antimicrobial dosing (20–40mg)'] },
  ];

  cols.forEach((col, i) => {
    const x = 0.4 + i * 3.25;
    s.addShape(pptx.ShapeType.rect, { x, y:1.45, w:0.04, h:5.52, fill:{ color:col.color }, line:{type:'none'} });
    s.addText(col.title, { x:x+0.18, y:1.48, w:2.9, h:0.28, fontSize:11, bold:true, color:col.color, fontFace:F, charSpacing:1.5 });
    col.items.forEach((item, j) => {
      s.addText(item, { x:x+0.18, y:1.88+j*0.98, w:2.9, h:0.52, fontSize:14.5, color: j===4 ? col.color : C.body, fontFace:F, italic:j===4, valign:'middle' });
      if (j < col.items.length - 1) hLine(s, x+0.18, 2.36+j*0.98, 2.75, C.divider);
    });
  });

  // Right panel: target organisms + dosing
  const RX = 10.15;
  vLine(s, RX-0.1, 1.45, 5.35, C.divider);

  s.addText('STD PROPHYLAXIS TARGETS', { x:RX, y:1.48, w:3.0, h:0.26, fontSize:10.5, bold:true, color:C.teal, fontFace:F, charSpacing:1.5 });

  const orgs = [
    { name:'Chlamydia trachomatis', status:'✓  No resistance documented', col:C.teal },
    { name:'Treponema pallidum', status:'✓  No resistance documented', col:C.teal },
    { name:'N. gonorrhoeae', status:'⚠  23–45% resistance (excluded)', col:C.gold },
  ];
  orgs.forEach((o, i) => {
    s.addText(o.name, { x:RX, y:1.92+i*0.82, w:3.0, h:0.28, fontSize:12.5, bold:true, color:C.navy, fontFace:F });
    s.addText(o.status, { x:RX, y:2.18+i*0.82, w:3.0, h:0.25, fontSize:11, color:o.col, fontFace:F });
    hLine(s, RX, 2.46+i*0.82, 3.0, C.divider);
  });

  s.addText('DOSING REGIMENS', { x:RX, y:4.42, w:3.0, h:0.26, fontSize:10.5, bold:true, color:C.navy, fontFace:F, charSpacing:1.5 });
  s.addText('PEP:  200mg orally, within 72h of sex', { x:RX, y:4.72, w:3.0, h:0.28, fontSize:11, color:C.body, fontFace:F });
  s.addText('PrEP:  100mg oral, once daily', { x:RX, y:5.02, w:3.0, h:0.28, fontSize:11, color:C.body, fontFace:F });
  s.addText('Median 7 pills/month in IPERGAY extension', { x:RX, y:5.32, w:3.0, h:0.28, fontSize:10, color:C.muted, fontFace:F, italic:true });
  hLine(s, RX, 5.66, 3.0, C.divider);
  // Mechanism note at bottom
  s.addText('MECHANISM', { x:RX, y:5.72, w:3.0, h:0.24, fontSize:10, bold:true, color:C.navy, fontFace:F, charSpacing:1.5 });
  s.addText('Inhibits 30S ribosomal subunit → blocks bacterial protein synthesis → bacteriostatic effect', { x:RX, y:5.98, w:3.0, h:0.55, fontSize:10, color:C.body, fontFace:F });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — DOXY PEP: KM CURVE with proper LEGEND
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Clinical Evidence — Post-Exposure Prophylaxis',
    'IPERGAY open-label extension: doxycycline PEP reduced bacterial STIs by 47%',
    'RCT nested within IPERGAY (n=232 MSM on event-driven HIV PrEP): doxycycline 200mg within 72h vs standard of care.'
  );

  // Left: Study parameters — clean text, no box
  s.addText('STUDY PARAMETERS', { x:0.4, y:1.44, w:4.0, h:0.26, fontSize:10.5, bold:true, color:C.teal, fontFace:F, charSpacing:1.5 });

  const params = [
    ['Design',           'Open-label RCT, nested within IPERGAY'],
    ['Population',       'MSM on event-driven HIV PrEP, France'],
    ['N',                '232 participants'],
    ['Intervention',     'Doxy 200mg orally within 72h of sex'],
    ['Control',          'Standard of care (no prophylaxis)'],
    ['Testing',          'Bi-monthly STI screening'],
    ['Target organisms', 'Chlamydia, syphilis (GC excluded)'],
    ['Adherence',        'Median 7 pills per month'],
    ['Outcome',          '47% decrease in STIs (42% → 22%)'],
  ];
  params.forEach(([k, v], i) => {
    s.addText(k, { x:0.4, y:1.78+i*0.5, w:1.55, h:0.28, fontSize:11, bold:true, color:C.navy, fontFace:F });
    s.addText(v, { x:1.9, y:1.78+i*0.5, w:2.7, h:0.28, fontSize:11, color:C.body, fontFace:F });
    hLine(s, 0.4, 2.04+i*0.5, 4.25, C.divider);
  });
  s.addText('Molina JM et al. Lancet Infect Dis. 2018;18(3):308-317.', { x:0.4, y:6.72, w:4.2, h:0.25, fontSize:9, color:C.muted, fontFace:F, italic:true });

  // Divider
  vLine(s, 4.75, 1.44, 5.55, C.divider);

  // Right: KM-style curve — shrunk to fit within slide
  const CX = 5.1, CY_TOP = 1.44, CW = 7.6;
  s.addText('CUMULATIVE STI-FREE PROBABILITY BY FOLLOW-UP MONTH', {
    x:CX, y:CY_TOP, w:CW, h:0.26, fontSize:10.5, bold:true, color:C.navy, fontFace:F, charSpacing:1
  });

  const PLOT_X = CX+0.62, PLOT_Y = CY_TOP+0.5, PLOT_W = CW-1.0, PLOT_H = 4.0;
  vLine(s, PLOT_X, PLOT_Y, PLOT_H, C.body);
  hLine(s, PLOT_X, PLOT_Y+PLOT_H, PLOT_W, C.body);

  [100, 90, 80, 70, 60, 50].forEach((v, i) => {
    const yy = PLOT_Y + i*(PLOT_H/5);
    s.addText(v+'%', { x:CX, y:yy-0.12, w:0.55, h:0.26, align:'right', fontSize:10, color:C.muted, fontFace:F });
    hLine(s, PLOT_X, yy, PLOT_W, C.divider);
  });
  [0, 6, 12, 18, 24].forEach((m, i) => {
    const xx = PLOT_X + i*(PLOT_W/4);
    s.addText(m+'', { x:xx-0.2, y:PLOT_Y+PLOT_H+0.06, w:0.4, h:0.22, align:'center', fontSize:10, color:C.muted, fontFace:F });
  });
  s.addText('Months of follow-up', { x:PLOT_X+PLOT_W/2-1, y:PLOT_Y+PLOT_H+0.3, w:2, h:0.22, align:'center', fontSize:10, color:C.muted, fontFace:F });
  s.addText('%', { x:CX-0.15, y:PLOT_Y+PLOT_H/2-0.15, w:0.45, h:0.32, fontSize:11, color:C.muted, fontFace:F, align:'center' });

  const doxyPts = [[0,100],[6,97],[12,93],[18,89],[24,84]];
  const ctrlPts = [[0,100],[6,93],[12,85],[18,75],[24,68]];

  function toXY(m, pct) {
    return [PLOT_X + (m/24)*PLOT_W, PLOT_Y + ((100-pct)/50)*PLOT_H];
  }

  // Use proper line shapes for clean connected segments (no rotation gaps)
  function drawSurvLine(pts, col) {
    for (let i=0; i<pts.length-1; i++) {
      const [x1,y1] = toXY(pts[i][0], pts[i][1]);
      const [x2,y2] = toXY(pts[i+1][0], pts[i+1][1]);
      // Clip to plot area
      const cx1 = Math.max(x1, PLOT_X);
      const cx2 = Math.min(x2, PLOT_X+PLOT_W);
      if (cx1 >= cx2) continue;
      const frac1 = (cx1-x1)/(x2-x1||1);
      const frac2 = (cx2-x1)/(x2-x1||1);
      const cy1 = y1 + frac1*(y2-y1);
      const cy2 = y1 + frac2*(y2-y1);
      s.addShape(pptx.ShapeType.line, {
        x:cx1, y:cy1, w:Math.max(cx2-cx1, 0.01), h:Math.max(cy2-cy1, 0.001),
        line:{ color:col, width:2.5 }
      });
    }
    pts.forEach(([m, pct]) => {
      const [dx, dy] = toXY(m, pct);
      if (dx >= PLOT_X-0.05 && dx <= PLOT_X+PLOT_W+0.05)
        s.addShape(pptx.ShapeType.ellipse, { x:dx-0.08, y:dy-0.08, w:0.16, h:0.16, fill:{ color:col }, line:{type:'none'} });
    });
  }
  drawSurvLine(ctrlPts, C.red);
  drawSurvLine(doxyPts, C.teal);

  // Endpoint labels — inside chart, away from edge
  const [dx24, dy24] = toXY(24, 84);
  const [cx24, cy24] = toXY(24, 68);
  s.addText('84%', { x:dx24-0.72, y:dy24-0.58, w:0.6, h:0.26, fontSize:12, bold:true, color:C.teal, fontFace:F, align:'right' });
  s.addText('68%', { x:cx24-0.72, y:cy24+0.06, w:0.6, h:0.26, fontSize:12, bold:true, color:C.red, fontFace:F, align:'right' });

  // LEGEND — top right, no box
  s.addShape(pptx.ShapeType.rect, { x:PLOT_X+PLOT_W-3.4, y:PLOT_Y+0.15, w:0.28, h:0.06, fill:{ color:C.teal }, line:{type:'none'} });
  s.addText('Doxycycline PEP (22% STI rate)', { x:PLOT_X+PLOT_W-3.05, y:PLOT_Y+0.08, w:3.0, h:0.22, fontSize:10.5, color:C.body, fontFace:F });
  s.addShape(pptx.ShapeType.rect, { x:PLOT_X+PLOT_W-3.4, y:PLOT_Y+0.38, w:0.28, h:0.06, fill:{ color:C.red }, line:{type:'none'} });
  s.addText('Standard of care (42% STI rate)', { x:PLOT_X+PLOT_W-3.05, y:PLOT_Y+0.31, w:3.0, h:0.22, fontSize:10.5, color:C.body, fontFace:F });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — DOXY PrEP: FLOWCHART + FOREST PLOT
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Clinical Evidence — Pre-Exposure Prophylaxis',
    'Doxycycline PrEP: 73% reduction in STD prevalence — Bolan et al. pilot RCT (n=30)',
    'Los Angeles pilot RCT (n=30): daily doxycycline 100mg vs contingency management over 48 months.'
  );

  // LEFT: Clean flowchart
  const FCX = 0.4;

  // Eligibility header
  s.addShape(pptx.ShapeType.rect, { x:FCX, y:1.44, w:6.4, h:0.06, fill:{ color:C.teal }, line:{type:'none'} });
  s.addText('Eligible: HIV+ MSM with prior syphilis, Los Angeles  (N=30)', {
    x:FCX, y:1.55, w:6.4, h:0.38,
    align:'center', fontSize:12, bold:true, color:C.navy, fontFace:F
  });

  // RANDOMIZED fork — clean single vertical + T-branch
  const FORK_X = FCX + 3.2;  // center of fork
  const FORK_TOP = 1.93;
  const FORK_MID = 2.55;
  // Vertical down from header
  s.addShape(pptx.ShapeType.line, { x:FORK_X, y:FORK_TOP, w:0, h:FORK_MID-FORK_TOP, line:{ color:C.navy, width:1.5 } });
  // Horizontal T
  s.addShape(pptx.ShapeType.line, { x:FCX+1.4, y:FORK_MID, w:FORK_X-0.02-(FCX+1.4), h:0, line:{ color:C.navy, width:1.5 } });
  s.addShape(pptx.ShapeType.line, { x:FORK_X+0.02, y:FORK_MID, w:FCX+5.0-FORK_X-0.02, h:0, line:{ color:C.navy, width:1.5 } });
  // Down to arms
  s.addShape(pptx.ShapeType.line, { x:FCX+1.4, y:FORK_MID, w:0, h:0.22, line:{ color:C.navy, width:1.5 } });
  s.addShape(pptx.ShapeType.line, { x:FCX+5.0, y:FORK_MID, w:0, h:0.22, line:{ color:C.navy, width:1.5 } });
  // RANDOMIZED badge — centered on fork, not overlapping the line
  s.addShape(pptx.ShapeType.roundRect, { x:FORK_X-0.75, y:2.2, w:1.52, h:0.28, fill:{ color:C.teal }, line:{type:'none'}, rectRadius:0.06 });
  s.addText('RANDOMIZED', { x:FORK_X-0.75, y:2.21, w:1.52, h:0.26, align:'center', fontSize:10, bold:true, color:'FFFFFF', fontFace:F });

  // Two arm boxes
  const armY = 2.8;
  s.addShape(pptx.ShapeType.rect, { x:FCX, y:armY, w:2.85, h:0.8,
    fill:{ color:'E8FBF4' }, line:{ color:C.teal, pt:1.5 } });
  s.addText('Doxycycline PrEP\n(n=15)', { x:FCX, y:armY+0.06, w:2.85, h:0.4, align:'center', fontSize:13, bold:true, color:C.teal, fontFace:F });
  s.addText('100mg oral, daily', { x:FCX, y:armY+0.52, w:2.85, h:0.24, align:'center', fontSize:11, color:C.body, fontFace:F });

  s.addShape(pptx.ShapeType.rect, { x:FCX+3.55, y:armY, w:2.85, h:0.8,
    fill:{ color:C.panel }, line:{ color:C.border, pt:1.5 } });
  s.addText('Contingency Management\n(n=15)', { x:FCX+3.55, y:armY+0.06, w:2.85, h:0.4, align:'center', fontSize:13, bold:true, color:C.navy, fontFace:F });
  s.addText('Cash incentives', { x:FCX+3.55, y:armY+0.52, w:2.85, h:0.24, align:'center', fontSize:11, color:C.body, fontFace:F });

  // Connecting lines down to outcomes
  s.addShape(pptx.ShapeType.rect, { x:FCX+1.4, y:armY+0.8, w:0.03, h:0.4, fill:{ color:C.teal }, line:{type:'none'} });
  s.addShape(pptx.ShapeType.rect, { x:FCX+4.95, y:armY+0.8, w:0.03, h:0.4, fill:{ color:C.border }, line:{type:'none'} });

  // Outcome boxes
  const outY = armY+1.22;
  s.addShape(pptx.ShapeType.rect, { x:FCX, y:outY, w:2.85, h:1.05,
    fill:{ color:C.panel }, line:{ color:C.teal, pt:1 } });
  s.addText('11%', { x:FCX, y:outY+0.06, w:2.85, h:0.5, align:'center', fontSize:36, bold:true, color:C.teal, fontFace:F });
  s.addText('visits with positive\nSTD screening', { x:FCX, y:outY+0.56, w:2.85, h:0.42, align:'center', fontSize:11, color:C.body, fontFace:F });

  s.addShape(pptx.ShapeType.rect, { x:FCX+3.55, y:outY, w:2.85, h:1.05,
    fill:{ color:C.panel }, line:{ color:C.red, pt:1 } });
  s.addText('31%', { x:FCX+3.55, y:outY+0.06, w:2.85, h:0.5, align:'center', fontSize:36, bold:true, color:C.red, fontFace:F });
  s.addText('visits with positive\nSTD screening', { x:FCX+3.55, y:outY+0.56, w:2.85, h:0.42, align:'center', fontSize:11, color:C.body, fontFace:F });

  // Combined result
  s.addShape(pptx.ShapeType.rect, { x:FCX, y:outY+1.18, w:6.4, h:0.52,
    fill:{ color:C.navy }, line:{type:'none'} });
  s.addText('OR = 0.27  [95% CI: 0.09–0.83]  ·  p < 0.05  ·  73% reduction in STDs',
    { x:FCX, y:outY+1.21, w:6.4, h:0.46, align:'center', fontSize:12.5, bold:true, color:'FFFFFF', fontFace:F });

  // Study ref
  s.addText('Bolan RK et al. Sex Transm Dis. 2015 Feb;42(2):98-103.', { x:FCX, y:6.72, w:6.4, h:0.25, fontSize:9, color:C.muted, fontFace:F, italic:true });

  // RIGHT: Forest plot–style visualization
  vLine(s, 7.15, 1.44, 5.5, C.divider);
  const FX = 7.4;

  s.addText('ODDS RATIO — FOREST PLOT (ILLUSTRATIVE)', {
    x:FX, y:1.44, w:5.7, h:0.26, fontSize:10.5, bold:true, color:C.navy, fontFace:F, charSpacing:1
  });

  // Forest plot axis
  const FPX = FX+0.2, FPY = 2.1, FPW = 5.4, FPH = 0.5;
  const nullX = FPX + (1/3)*FPW; // null line at OR=1

  // X axis
  hLine(s, FPX, FPY+FPH+0.1, FPW, C.body);
  [0.1, 0.25, 0.5, 1.0, 2.0].forEach(v => {
    const px = FPX + (Math.log(v)/Math.log(10) + 1.3) / 2.6 * FPW;
    s.addText(v+'', { x:px-0.22, y:FPY+FPH+0.22, w:0.44, h:0.22, align:'center', fontSize:9, color:C.muted, fontFace:F });
    s.addShape(pptx.ShapeType.rect, { x:px, y:FPY+FPH+0.1, w:0.02, h:0.12, fill:{ color:C.muted }, line:{type:'none'} });
  });
  s.addText('← Favors doxycycline', { x:FPX, y:FPY+FPH+0.46, w:2.5, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true });
  s.addText('Favors control →', { x:FPX+FPW-2, y:FPY+FPH+0.46, w:2.0, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true, align:'right' });

  // Null line
  const nullPx = FPX + (Math.log(1)/Math.log(10) + 1.3) / 2.6 * FPW;
  s.addShape(pptx.ShapeType.rect, { x:nullPx, y:FPY-0.1, w:0.02, h:FPH+0.3, fill:{ color:C.red }, line:{type:'none'} });
  s.addText('Null (OR=1)', { x:nullPx+0.06, y:FPY-0.26, w:1.2, h:0.2, fontSize:9, color:C.red, fontFace:F, italic:true });

  // The CI line for Bolan et al.
  const orVal = 0.27, ciLo = 0.09, ciHi = 0.83;
  const xOR  = FPX + (Math.log(orVal)/Math.log(10) + 1.3) / 2.6 * FPW;
  const xLo  = FPX + (Math.log(ciLo)/Math.log(10) + 1.3) / 2.6 * FPW;
  const xHi  = FPX + (Math.log(ciHi)/Math.log(10) + 1.3) / 2.6 * FPW;
  const fpMidY = FPY + FPH/2;

  hLine(s, xLo, fpMidY, xHi-xLo, C.teal);
  // CI whiskers
  s.addShape(pptx.ShapeType.rect, { x:xLo, y:fpMidY-0.1, w:0.02, h:0.2, fill:{ color:C.teal }, line:{type:'none'} });
  s.addShape(pptx.ShapeType.rect, { x:xHi, y:fpMidY-0.1, w:0.02, h:0.2, fill:{ color:C.teal }, line:{type:'none'} });
  // Center square
  s.addShape(pptx.ShapeType.rect, { x:xOR-0.1, y:fpMidY-0.1, w:0.2, h:0.2, fill:{ color:C.teal }, line:{type:'none'} });
  s.addText('Bolan et al. 2015', { x:FPX, y:fpMidY-0.58, w:2.5, h:0.22, fontSize:11, bold:true, color:C.navy, fontFace:F });
  // OR label moved ABOVE the line, not overlapping it
  s.addText('OR = 0.27', { x:xOR-0.55, y:fpMidY-0.48, w:1.3, h:0.24, fontSize:11, bold:true, color:C.teal, fontFace:F, align:'center' });

  // Summary stats right side
  s.addText('KEY RESULTS', { x:FX, y:3.2, w:5.7, h:0.26, fontSize:10.5, bold:true, color:C.teal, fontFace:F, charSpacing:1.5 });
  const kr = [
    ['73%', 'Decrease in STDs', 'Primary outcome'],
    ['OR 0.27', '95% CI 0.09–0.83', 'Statistically significant'],
    ['48 months', 'Follow-up duration', 'Tested every 12 months'],
    ['n=30', 'Pilot study', 'HIV+ MSM, Los Angeles'],
  ];
  kr.forEach(([big, lbl, sub], i) => {
    const rx = FX + (i%2)*2.9, ry = 3.55 + Math.floor(i/2)*1.5;
    s.addText(big, { x:rx, y:ry, w:2.7, h:0.55, fontSize:26, bold:true, color: i===0?C.teal:C.navy, fontFace:F });
    s.addText(lbl, { x:rx, y:ry+0.52, w:2.7, h:0.26, fontSize:11.5, bold:true, color:C.navy, fontFace:F });
    s.addText(sub, { x:rx, y:ry+0.76, w:2.7, h:0.22, fontSize:10, color:C.muted, fontFace:F });
    hLine(s, rx, ry+1.0, 2.5, C.divider);
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — PATIENT ATTITUDES: horizontal bar chart
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Knowledge, Attitudes & Perceptions',
    'Patient interest in doxy PEP: 85–90% across clinical and community settings',
    'Survey data from three populations show 85–90% interest in doxy PEP, with 8% already self-medicating.'
  );

  // Bar chart data
  const barData = [
    {
      name:'Would use doxycycline for PEP',
      labels:['PrEP Clinic, Seattle (n=35)','Grindr Sample (n=1,240)'],
      values:[90, 85]
    },
    {
      name:'Already taking antibiotics for STD prevention',
      labels:['PrEP Clinic, Seattle (n=35)','Grindr Sample (n=1,240)'],
      values:[0, 0]
    }
  ];

  // Use pptxgenjs bar chart
  const chartData2 = [
    {
      name:'Would use doxycycline for PEP',
      labels:['PrEP Clinic\nSeattle (n=35)','Grindr Sample\n(n=1,240)','London Sexual\nHealth Clinic (n=103)'],
      values:[90, 85, 8]
    }
  ];
  // Two separate series for cleaner comparison
  const chartDataAttitudes = [
    {
      name:'Willing to use doxy for PEP',
      labels:['PrEP Clinic, Seattle\n(n=35)','Grindr Convenience\nSample (n=1,240)','London Sexual Health\nClinic (n=103)'],
      values:[90, 85, null]
    },
    {
      name:'Already using antibiotics for STD prevention',
      labels:['PrEP Clinic, Seattle\n(n=35)','Grindr Convenience\nSample (n=1,240)','London Sexual Health\nClinic (n=103)'],
      values:[null, null, 8]
    }
  ];

  s.addChart(pptx.ChartType.bar, chartDataAttitudes, {
    x:0.4, y:1.44, w:9.0, h:4.8,
    barDir: 'bar',
    barGrouping: 'clustered',
    chartColors: [C.teal, C.gold],
    showLegend: true,
    legendPos: 'b',
    legendFontSize: 11,
    dataLabelFontSize: 12,
    dataLabelColor: 'FFFFFF',
    showValue: true,
    dataLabelFormatCode: '0"%"',
    valAxisMinVal: 0,
    valAxisMaxVal: 100,
    valAxisTitle: 'Percentage (%)',
    valAxisTitleFontSize: 11,
    valAxisLabelFontSize: 11,
    catAxisLabelFontSize: 12,
    plotAreaBorderColor: C.divider,
    showValAxisTitle: true,
  });

  // Sources — now below the chart with clear space
  s.addText('Sources: Spinelli MA et al. Sex Transm Dis. 2019; Carveth-Johnson T et al. Lancet HIV. 2018.', {
    x:0.4, y:6.5, w:9.0, h:0.25, fontSize:9, color:C.muted, fontFace:F, italic:true
  });

  // Right: key insights
  vLine(s, 9.7, 1.44, 5.5, C.divider);
  const RX = 10.0;

  s.addText('KEY IMPLICATIONS', { x:RX, y:1.44, w:3.1, h:0.26, fontSize:10.5, bold:true, color:C.teal, fontFace:F, charSpacing:1.5 });

  const insights = [
    { icon:'90%', label:'Interested in doxy PEP,\nPrEP clinic (Seattle)' },
    { icon:'85%', label:'Interested in doxy PEP,\nGrindr sample' },
    { icon:'8%',  label:'Already self-medicating\nfor STD prevention' },
    { icon:'0',   label:'Current guideline\nrecommendations' },
  ];
  insights.forEach((ins, i) => {
    // Align the big number right-edge at same position for visual consistency
    s.addText(ins.icon, { x:RX, y:1.88+i*1.25, w:1.05, h:0.55, fontSize:30, bold:true, color: i===3 ? C.red : C.teal, fontFace:F, align:'right' });
    s.addText(ins.label, { x:RX+1.12, y:1.92+i*1.25, w:2.0, h:0.55, fontSize:11.5, color:C.body, fontFace:F, valign:'middle' });
    if (i < 3) hLine(s, RX, 2.44+i*1.25, 3.1, C.divider);
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — AMR: 2×2 QUADRANT MATRIX
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Risk Analysis — Antimicrobial Resistance',
    'Chlamydia and syphilis: no tetracycline resistance; gonorrhea at 20–50%',
    'The resistance risk profile varies substantially by organism — doxycycline PEP/PrEP targets organisms with no resistance.'
  );

  // 2x2 Matrix
  const MX = 1.1, MY = 1.48, MW = 8.8, MH = 4.9;
  const MID_X = MX + MW/2, MID_Y = MY + MH/2;

  // Background quadrants
  s.addShape(pptx.ShapeType.rect, { x:MX, y:MY, w:MW/2, h:MH/2, fill:{ color:'E8FBF4' }, line:{type:'none'} }); // TL: high eff, low res = GREEN
  s.addShape(pptx.ShapeType.rect, { x:MX+MW/2, y:MY, w:MW/2, h:MH/2, fill:{ color:'FEF9EC' }, line:{type:'none'} }); // TR: high eff, high res = YELLOW
  s.addShape(pptx.ShapeType.rect, { x:MX, y:MY+MH/2, w:MW/2, h:MH/2, fill:{ color:'F4F7FA' }, line:{type:'none'} }); // BL: low eff, low res = GRAY
  s.addShape(pptx.ShapeType.rect, { x:MX+MW/2, y:MY+MH/2, w:MW/2, h:MH/2, fill:{ color:'FEF2F2' }, line:{type:'none'} }); // BR: low eff, high res = RED

  // Axes
  hLine(s, MX, MID_Y, MW, C.border);
  vLine(s, MID_X, MY, MH, C.border);
  // Outer border
  s.addShape(pptx.ShapeType.rect, { x:MX, y:MY, w:MW, h:MH, fill:{ type:'none' }, line:{ color:C.border, pt:1 } });

  // Y-axis ticks + labels (doxy efficacy: 0% bottom, 100% top)
  const Y_TICKS = [0, 25, 50, 75, 100];
  Y_TICKS.forEach(val => {
    const ty = MY + MH - (val / 100) * MH;
    s.addShape(pptx.ShapeType.rect, { x:MX-0.14, y:ty-0.01, w:0.14, h:0.02, fill:{ color:C.body }, line:{type:'none'} });
    s.addText(val+'%', { x:MX-0.72, y:ty-0.15, w:0.55, h:0.28, align:'right', fontSize:11, bold:true, color:C.body, fontFace:F });
  });
  // Y-axis label — one line, rotated, positioned left of ticks
  s.addText('Doxycycline Efficacy', { x:MX-1.2, y:MY+MH*0.25, w:1.0, h:2.5, fontSize:11, bold:true, color:C.navy, fontFace:F, rotate:270, align:'center' });

  // X-axis ticks + labels (resistance: 0% left, 100% right)
  const X_TICKS = [0, 25, 50, 75, 100];
  X_TICKS.forEach(val => {
    const tx = MX + (val / 100) * MW;
    s.addShape(pptx.ShapeType.rect, { x:tx-0.01, y:MY+MH, w:0.02, h:0.12, fill:{ color:C.body }, line:{type:'none'} });
    s.addText(val+'%', { x:tx-0.25, y:MY+MH+0.14, w:0.5, h:0.22, align:'center', fontSize:11, bold:true, color:C.body, fontFace:F });
  });
  // X-axis label — one line, below ticks
  s.addText('Tetracycline Resistance Risk', { x:MX+MW*0.2, y:MY+MH+0.4, w:MW*0.6, h:0.28, align:'center', fontSize:11, bold:true, color:C.navy, fontFace:F });

  // Draw actual X and Y axis lines (solid)
  s.addShape(pptx.ShapeType.line, { x:MX, y:MY, w:0, h:MH, line:{ color:C.body, width:1.5 } });
  s.addShape(pptx.ShapeType.line, { x:MX, y:MY+MH, w:MW, h:0, line:{ color:C.body, width:1.5 } });

  // Directional labels at axis ends
  s.addText('← Low', { x:MX+0.1, y:MY+MH+0.14, w:1.2, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true });
  s.addText('High →', { x:MX+MW-1.2, y:MY+MH+0.14, w:1.2, h:0.22, align:'right', fontSize:9, color:C.muted, fontFace:F, italic:true });

  // Quadrant labels
  s.addText('IDEAL\nHigh efficacy · Low resistance', { x:MX+0.2, y:MY+0.15, w:MW/2-0.4, h:0.55, fontSize:9, bold:true, color:C.teal, fontFace:F });
  s.addText('CAUTION\nHigh efficacy · High resistance', { x:MX+MW/2+0.2, y:MY+0.15, w:MW/2-0.4, h:0.55, fontSize:9, bold:true, color:C.gold, fontFace:F });
  s.addText('UNCLEAR\nLow efficacy · Low resistance', { x:MX+0.2, y:MID_Y+0.15, w:MW/2-0.4, h:0.55, fontSize:9, bold:true, color:C.muted, fontFace:F });
  s.addText('EXCLUDED\nLow efficacy · High resistance', { x:MX+MW/2+0.2, y:MID_Y+0.15, w:MW/2-0.4, h:0.55, fontSize:9, bold:true, color:C.red, fontFace:F });

  // Small dots + text labels (no large circles overlapping text)
  const organisms = [
    { name:'Chlamydia trachomatis', note:'Zero documented tetracycline resistance — primary target', x:MX+MW*0.08, y:MY+MH*0.2, col:C.teal },
    { name:'Treponema pallidum (Syphilis)', note:'No acquired resistance — well-established susceptibility', x:MX+MW*0.08, y:MY+MH*0.48, col:C.teal },
    { name:'Non-STI Commensals', note:'Conflicting resistance data from malaria prophylaxis studies', x:MX+MW*0.06, y:MID_Y+MH*0.22, col:'7C8FA8' },
    { name:'Neisseria gonorrhoeae', note:'20–50% resistance (US 23%, Europe >45%) — excluded', x:MX+MW*0.55, y:MID_Y+MH*0.25, col:C.red },
  ];
  organisms.forEach(org => {
    s.addShape(pptx.ShapeType.ellipse, { x:org.x-0.12, y:org.y-0.12, w:0.24, h:0.24, fill:{ color:org.col }, line:{ color:'FFFFFF', pt:1.5 } });
    const maxW = (org.col === C.red ? MX+MW : MID_X) - org.x - 0.25;
    s.addText(org.name, { x:org.x+0.18, y:org.y-0.22, w:Math.min(maxW, 3.8), h:0.26, fontSize:11.5, bold:true, color:org.col, fontFace:F });
    s.addText(org.note, { x:org.x+0.18, y:org.y+0.06, w:Math.min(maxW, 3.8), h:0.32, fontSize:9.5, color:C.body, fontFace:F });
  });

  // Legend — richer descriptions, no line after last
  const LX = 10.15, LY = 1.48;
  s.addText('LEGEND', { x:LX, y:LY, w:3.0, h:0.28, fontSize:12, bold:true, color:C.navy, fontFace:F, charSpacing:1.5 });
  const legItems = [
    { col:C.teal,   title:'Target organisms', desc:'No tetracycline resistance in chlamydia or syphilis; doxy PEP/PrEP effective' },
    { col:C.gold,   title:'Caution zone', desc:'High doxy efficacy but potential resistance risk; monitor in population use' },
    { col:C.red,    title:'Excluded organisms', desc:'Gonorrhea 20–50% resistant; doxy does not reliably protect against GC' },
    { col:'7C8FA8', title:'Uncertain / commensal', desc:'Non-STI bacteria: conflicting evidence from malaria prophylaxis data' },
  ];
  legItems.forEach((li, i) => {
    const ly = LY + 0.46 + i * 1.42;
    s.addShape(pptx.ShapeType.ellipse, { x:LX, y:ly, w:0.26, h:0.26, fill:{ color:li.col }, line:{type:'none'} });
    s.addText(li.title, { x:LX+0.36, y:ly-0.02, w:2.64, h:0.28, fontSize:12, bold:true, color:C.navy, fontFace:F });
    s.addText(li.desc,  { x:LX+0.36, y:ly+0.28, w:2.64, h:0.7, fontSize:10.5, color:C.body, fontFace:F });
    if (i < 3) hLine(s, LX, ly+1.06, 3.0, C.divider);
  });
  s.addText('Source: Grant JS et al. Clin Infect Dis. 2020;70(6):1247-1253.', { x:0.4, y:6.9, w:9.5, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — SAFETY: RISK GRADIENT SPECTRUM
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Risk Analysis — Adverse Effects',
    'Well-characterized safety profile with one absolute contraindication: pregnancy',
    'Decades of clinical use establish predictable, manageable adverse effects; teratogenicity precludes use in pregnancy.'
  );

  // Horizontal gradient severity bar
  const GX = 0.4, GY = 1.55, GW = 12.5, GH = 0.28;
  // Draw gradient as 5 steps
  const gradCols = ['4ADE80','A3E635','FACC15','FB923C','EF4444'];
  gradCols.forEach((col, i) => {
    s.addShape(pptx.ShapeType.rect, { x:GX+i*(GW/5), y:GY, w:GW/5, h:GH, fill:{ color:col }, line:{type:'none'} });
  });
  s.addText('← MILD / MANAGEABLE', { x:GX, y:GY+GH+0.06, w:4, h:0.22, fontSize:9.5, color:C.muted, fontFace:F, italic:true });
  s.addText('SEVERE / CONTRAINDICATED →', { x:GX+GW-4, y:GY+GH+0.06, w:4, h:0.22, fontSize:9.5, color:C.muted, fontFace:F, align:'right', italic:true });

  // AE entries with richer text, vertically centered to colored bar
  const aes = [
    { name:'GI Upset & Esophagitis',       col:'4ADE80',
      detail:'Most common adverse effect. Take with food and a full glass of water; remain upright for 30 min post-dose. Usually mild and reversible. Esophagitis risk reduced with proper administration technique.' },
    { name:'Photosensitivity',             col:'A3E635',
      detail:'Phototoxic erythema and exaggerated sunburn reactions. Advise patients to apply sunscreen SPF 30+ and wear protective clothing. Reactions resolve with drug discontinuation; generally manageable.' },
    { name:'Severe Skin Eruptions\n(DRESS, SJS/TEN)', col:'FACC15',
      detail:'Rare but potentially life-threatening immunologically-mediated reactions including DRESS and Stevens-Johnson syndrome. Incidence low; discontinue immediately if suspected. Monitor high-risk patients.' },
    { name:'Intracranial Hypertension',    col:'FB923C',
      detail:'Theoretically associated with tetracyclines (pseudotumor cerebri). However, a review of 191 PTCS cases in n=728,811 found no significant association with doxy (p=0.06) or minocycline (p=0.08).' },
    { name:'Musculoskeletal &\nDental Birth Defects', col:'EF4444',
      detail:'ABSOLUTE CONTRAINDICATION: pregnancy and children under 8 years. Inhibits fetal bone and cartilage development; causes permanent dental discoloration and enamel hypoplasia. No safe dose in pregnancy.' },
  ];

  aes.forEach((ae, i) => {
    const ry = 2.35 + i*0.88;
    const barH = 0.78;
    // Left colored bar
    s.addShape(pptx.ShapeType.rect, { x:0.4, y:ry, w:0.06, h:barH, fill:{ color:ae.col }, line:{type:'none'} });
    // AE name vertically centered to bar
    s.addText(ae.name, { x:0.58, y:ry, w:3.0, h:barH, fontSize:12.5, bold:true, color:C.navy, fontFace:F, valign:'middle' });
    // Detail text
    s.addText(ae.detail, { x:3.68, y:ry+0.02, w:9.0, h:barH-0.04, fontSize:11, color:C.body, fontFace:F, valign:'middle' });
    if (i < aes.length - 1) hLine(s, 0.4, ry+barH, 12.5, C.divider);
  });

  // References — split into two lines for readability, no bottom divider
  s.addText('Eldweik L et al. J Am Acad Dermatol. 2019;81(2):456-462.', {
    x:0.4, y:6.6, w:12.5, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true
  });
  s.addText('Grant JS et al. Clin Infect Dis. 2020;70(6):1247-1253.', {
    x:0.4, y:6.82, w:12.5, h:0.22, fontSize:9, color:C.muted, fontFace:F, italic:true
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 11 — EVIDENCE COMPARISON TABLE (replaces timeline)
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Active Research',
    'Phase III trials are enrolling — results will determine guideline eligibility',
    'DoxyPEP and IPERGAY-2 are designed to answer the efficacy, resistance, and risk-compensation questions.'
  );

  // Column headers
  const cols = [
    { label:'STUDY',          x:0.4,  w:1.8  },
    { label:'POPULATION',     x:2.3,  w:2.0  },
    { label:'INTERVENTION',   x:4.4,  w:2.0  },
    { label:'PRIMARY OUTCOME',x:6.5,  w:2.2  },
    { label:'FINDING / STATUS', x:8.8, w:2.3 },
    { label:'STATUS',         x:11.2, w:1.9  },
  ];

  // Header row background
  s.addShape(pptx.ShapeType.rect, { x:0.4, y:1.44, w:12.7, h:0.34, fill:{ color:C.navy }, line:{type:'none'} });
  cols.forEach(c => {
    s.addText(c.label, { x:c.x+0.12, y:1.47, w:c.w-0.12, h:0.28,
      fontSize:9, bold:true, color:'FFFFFF', fontFace:F, charSpacing:1.5 });
  });

  const studies = [
    {
      name:'Bolan et al.\n2015',
      pop:'HIV+ MSM\nw/ prior syphilis\nLA (n=30)',
      int:'Doxy 100mg daily\nvs contingency\nmanagement',
      outcome:'STD prevalence\n(chlamydia, GC,\nsyphilis)',
      finding:'73% reduction\nOR=0.27\n[95% CI: 0.09–0.83]',
      status:'COMPLETE', scol:C.teal
    },
    {
      name:'Molina et al.\n2018\n(IPERGAY)',
      pop:'MSM on HIV\nPrEP, France\n(n=232)',
      int:'Doxy 200mg\nwithin 72h\nvs standard care',
      outcome:'Incident STI\n(chlamydia,\nsyphilis)',
      finding:'47% decrease\n42% → 22%\nSTI rate',
      status:'COMPLETE', scol:C.teal
    },
    {
      name:'DoxyPEP\n(UW/UCSF)',
      pop:'MSM + TGW\non HIV PrEP\nor with HIV',
      int:'Doxy 200mg\nwithin 72h\nvs no prophylaxis',
      outcome:'STI incidence\n+ AMR + risk\ncompensation',
      finding:'Powered for\n≥40% reduction\nEnrolling 2020',
      status:'ACTIVE', scol:C.blue
    },
    {
      name:'IPERGAY-2\n(Europe)',
      pop:'MSM on HIV\nPrEP, expanded\nEU population',
      int:'Doxy PEP\nevent-driven\nvs standard care',
      outcome:'STI incidence\nresistance\nprofile',
      finding:'Expanded to\nresistance\noutcomes',
      status:'ACTIVE', scol:C.blue
    },
    {
      name:'Future\nGuidelines',
      pop:'CDC / IDSA\nreview based\non Phase III',
      int:'PEP for MSM\nand TGW on\nHIV PrEP',
      outcome:'Guideline\nrecommendation\nfor doxy PEP',
      finding:'Results expected\n2022–23 → guideline\nupdates 2024+',
      status:'UPCOMING', scol:C.gold
    },
  ];

  studies.forEach((st, i) => {
    const ry = 1.78 + i * 1.02;
    const rowBg = i % 2 === 0 ? C.bg : C.panel;
    s.addShape(pptx.ShapeType.rect, { x:0.4, y:ry, w:12.7, h:1.0, fill:{ color:rowBg }, line:{ color:C.divider, pt:0.5 } });

    // Status accent bar on left
    s.addShape(pptx.ShapeType.rect, { x:0.4, y:ry, w:0.06, h:1.0, fill:{ color:st.scol }, line:{type:'none'} });

    const cells = [st.name, st.pop, st.int, st.outcome, st.finding];
    cols.slice(0,5).forEach((c, ci) => {
      s.addText(cells[ci], {
        x:c.x+0.12, y:ry+0.06, w:c.w-0.2, h:0.88,
        fontSize: ci===0 ? 11 : 10.5,
        bold: ci===0,
        color: ci===0 ? C.navy : C.body,
        fontFace:F, valign:'top'
      });
    });

    // Status badge
    const badgeBg = st.scol;
    s.addShape(pptx.ShapeType.roundRect, { x:11.25, y:ry+0.35, w:1.6, h:0.26,
      fill:{ color:badgeBg }, line:{type:'none'}, rectRadius:0.06 });
    s.addText(st.status, { x:11.25, y:ry+0.36, w:1.6, h:0.24,
      align:'center', fontSize:9, bold:true, color:'FFFFFF', fontFace:F });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 12 — CONCLUSIONS
// ═══════════════════════════════════════════════════════════════
{
  const s = addSlide(
    'Summary',
    'Conclusions',
    'Early data supports doxycycline as a viable STD prophylaxis agent, pending powered trial confirmation.'
  );

  const conclusions = [
    { n:'1', head:'STD rates are at a modern-era peak', body:'All three major bacterial STIs have risen for five consecutive years. Chlamydia alone exceeded 1.76 million cases in 2018.', col:C.teal },
    { n:'2', head:'Pharmacological prevention precedent is established', body:'Oral contraception and HIV PrEP demonstrate that medications can safely prevent sexual health consequences at population scale.', col:C.blue },
    { n:'3', head:'Early doxycycline efficacy data is compelling', body:'47% reduction in STIs (PEP, IPERGAY, n=232) and 73% reduction (PrEP, Bolan, n=30) represent clinically meaningful effects.', col:C.gold },
    { n:'4', head:'Safety profile is well-characterized and manageable', body:'Decades of use establish predictable AEs. Teratogenicity is the absolute contraindication; photosensitivity is manageable with sunscreen.', col:'7C3AED' },
    { n:'5', head:'Antimicrobial resistance is the key unresolved concern', body:'No resistance in chlamydia or syphilis. Gonorrhea is already resistant. Commensal microbiome impact remains conflicting.', col:C.red },
    { n:'6', head:'Phase III trials will determine guideline eligibility', body:'DoxyPEP and IPERGAY-2 are powered to answer efficacy, resistance, and risk-compensation questions for CDC/IDSA consideration.', col:C.navy },
  ];

  // Left col: 1,2,3 stacked. Right col: 4,5,6 stacked. Row spacing fills slide.
  conclusions.forEach((c, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = 0.4 + col * 6.35;
    const ry = 1.44 + row * 1.95;

    // Left accent bar
    s.addShape(pptx.ShapeType.rect, { x, y:ry, w:0.06, h:1.75, fill:{ color:c.col }, line:{type:'none'} });

    // Large plain number
    s.addText(c.n, { x:x+0.18, y:ry+0.05, w:0.6, h:0.7,
      fontSize:42, bold:true, color:c.col, fontFace:F });

    // Headline
    s.addText(c.head, { x:x+0.88, y:ry+0.08, w:5.28, h:0.44,
      fontSize:16, bold:true, color:C.navy, fontFace:F });

    // Body
    s.addText(c.body, { x:x+0.88, y:ry+0.54, w:5.28, h:1.0,
      fontSize:12.5, color:C.body, fontFace:F, valign:'top' });

    // Horizontal divider between rows (within each column)
    if (row < 2) {
      hLine(s, x, ry + 1.86, 6.1, C.divider);
    }
  });

  // Vertical center divider
  vLine(s, 6.65, 1.44, 5.85, C.divider);
}

// ── WRITE ─────────────────────────────────────────────────────
pptx.writeFile({ fileName: '/home/assets/doxy_v2.pptx' })
  .then(() => console.log('Done: doxy_v2.pptx'))
  .catch(e => { console.error(e); process.exit(1); });
