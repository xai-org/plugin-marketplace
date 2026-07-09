// build_deck.js
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.author = "ARTH 204";
pres.title = "Music Icons of America";
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";

const C = { cream:"F1E7D0", creamLt:"E8DBBC", brown:"3A2F26", black:"1A1512", red:"C8412B", gold:"D6A24A", pink:"E78A7A", green:"5C6E3A", blue:"2E4A7B" };
const FONT_DISPLAY="Bebas Neue", FONT_SERIF="DM Serif Display", FONT_MONO="JetBrains Mono";
const W=20.0, H=11.25;

function addHeader(slide, leftTag, rightTag, opts={}) {
  const color = opts.color || C.brown;
  slide.addText(leftTag, { x:0.7, y:0.4, w:10, h:0.55, fontFace:FONT_MONO, fontSize:16, color, charSpacing:4, valign:"middle", margin:0 });
  slide.addText(rightTag, { x:W-10.7, y:0.4, w:10, h:0.55, fontFace:FONT_MONO, fontSize:16, color, charSpacing:4, align:"right", valign:"middle", margin:0 });
}
function addFooter(slide, page, opts={}) {
  const color = opts.color || C.brown;
  slide.addText("MUSIC ICONS OF AMERICA", { x:0.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color, charSpacing:4, valign:"middle", margin:0 });
  slide.addText(String(page).padStart(2,"0")+" / 10", { x:W-10.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color, charSpacing:4, align:"right", valign:"middle", margin:0 });
}
function drawLineSeg(slide, x1, y1, x2, y2, color, widthPt) {
  const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
  if (len < 0.001) return;
  const angle = Math.atan2(dy,dx)*180/Math.PI;
  const thickness = widthPt/72;
  const cx=(x1+x2)/2, cy=(y1+y2)/2;
  slide.addShape(pres.shapes.RECTANGLE, {
    x:cx-len/2, y:cy-thickness/2, w:len, h:thickness,
    fill:{color}, line:{color,width:0}, rotate:angle,
  });
}

// SLIDE 1 — TITLE
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "ARTH 204 \u00b7 SPRING 2026", "A VISUAL ESSAY");
  s.addShape(pres.shapes.OVAL, { x:0.7, y:1.85, w:0.24, h:0.24, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addText("A CENTURY OF SOUND", { x:1.10, y:1.62, w:5.6, h:0.7, fontFace:FONT_MONO, fontSize:18, color:C.red, charSpacing:6, bold:true, valign:"middle", margin:0 });
  s.addShape(pres.shapes.OVAL, { x:5.85, y:1.85, w:0.24, h:0.24, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addText("MUSIC", { x:0.7, y:2.45, w:10, h:1.95, fontFace:FONT_DISPLAY, fontSize:150, color:C.black, bold:true, valign:"top", margin:0 });
  s.addText("ICONS", { x:0.7, y:4.40, w:10, h:1.95, fontFace:FONT_DISPLAY, fontSize:150, color:C.red, bold:true, valign:"top", margin:0 });
  s.addText("of america", { x:0.7, y:6.40, w:12, h:2.4, fontFace:FONT_SERIF, fontSize:100, color:C.brown, italic:true, valign:"top", margin:0 });
  s.addText("PRESENTED BY", { x:0.7, y:9.10, w:4, h:0.45, fontFace:FONT_MONO, fontSize:16, color:C.brown, charSpacing:4, margin:0 });
  s.addText("Your Name Here", { x:0.7, y:9.55, w:4, h:0.55, fontFace:FONT_MONO, fontSize:20, color:C.black, margin:0 });
  s.addShape(pres.shapes.LINE, { x:5.0, y:9.10, w:0.001, h:1.05, line:{color:C.brown, width:0.75} });
  s.addText("RUNTIME", { x:5.3, y:9.10, w:4, h:0.45, fontFace:FONT_MONO, fontSize:16, color:C.brown, charSpacing:4, margin:0 });
  s.addText("10 tracks \u00b7 ~12 min", { x:5.3, y:9.55, w:6, h:0.55, fontFace:FONT_MONO, fontSize:20, color:C.black, margin:0 });
  const vR=6.2, vx=W-0.9-vR, vy=2.2;
  s.addShape(pres.shapes.OVAL, { x:vx, y:vy, w:vR, h:vR, fill:{color:C.black}, line:{color:C.black,width:0} });
  for (const r of [0.30, 0.65, 1.00, 1.35]) {
    s.addShape(pres.shapes.OVAL, { x:vx+r, y:vy+r, w:vR-2*r, h:vR-2*r, fill:{color:C.black}, line:{color:"2A211C",width:1} });
  }
  const lblD=2.6, lblX=vx+(vR-lblD)/2, lblY=vy+(vR-lblD)/2;
  s.addShape(pres.shapes.OVAL, { x:lblX, y:lblY, w:lblD, h:lblD, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addText("SIDE A \u00b7 33\u2153 RPM", { x:lblX, y:lblY+0.40, w:lblD, h:0.45, fontFace:FONT_MONO, fontSize:13, color:C.cream, charSpacing:3, align:"center", valign:"middle", margin:0 });
  s.addText("Influence", { x:lblX, y:lblY+0.95, w:lblD, h:0.7, fontFace:FONT_SERIF, fontSize:32, color:C.cream, italic:true, align:"center", valign:"middle", margin:0 });
  s.addText("A LONG PLAYING RECORD", { x:lblX, y:lblY+1.70, w:lblD, h:0.4, fontFace:FONT_MONO, fontSize:11, color:C.cream, charSpacing:3, align:"center", valign:"middle", margin:0 });
  s.addShape(pres.shapes.OVAL, { x:vx+vR/2-0.07, y:vy+vR/2-0.07, w:0.14, h:0.14, fill:{color:C.black}, line:{color:C.black,width:0} });
  addFooter(s, 1);
}

// SLIDE 2 — THE THESIS
{
  const s = pres.addSlide();
  s.background = { color: C.black };
  s.addShape(pres.shapes.PARALLELOGRAM, { x:1.4, y:1.0, w:0.65, h:1.7, fill:{color:C.red}, line:{color:C.red,width:0}, flipH:true });
  s.addShape(pres.shapes.PARALLELOGRAM, { x:2.35, y:1.0, w:0.65, h:1.7, fill:{color:C.red}, line:{color:C.red,width:0}, flipH:true });
  s.addText("THE THESIS", { x:2.0, y:3.05, w:6, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.gold, charSpacing:6, valign:"middle", margin:0 });
  s.addText([
    { text:"Celebrities don\u2019t just ", options:{color:C.cream} },
    { text:"make", options:{color:C.gold, italic:true} },
    { text:" music. They ", options:{color:C.cream} },
    { text:"redraw", options:{color:C.red, italic:true} },
    { text:" the country that listens to it.", options:{color:C.cream} },
  ], { x:2.0, y:3.85, w:16, h:4.7, fontFace:FONT_DISPLAY, fontSize:64, valign:"top", margin:0 });
  const eqY=8.7;
  let cx=2.0, i=0;
  while (cx < W-2.0) {
    const segW = 0.20 + ((i*7)%5)*0.05;
    const segH = 0.06 + ((i*11)%9)*0.025;
    s.addShape(pres.shapes.RECTANGLE, { x:cx, y:eqY+(0.30-segH), w:segW, h:segH, fill:{color:C.gold}, line:{color:C.gold,width:0} });
    cx += segW+0.13; i++;
  }
  s.addText("MUSIC ICONS OF AMERICA", { x:0.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, valign:"middle", margin:0 });
  s.addText("02 / 10", { x:W-10.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, align:"right", valign:"middle", margin:0 });
}

// SLIDE 3 — THE MAP
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "03 \u00b7 THE MAP", "1920 \u2192 TODAY");
  s.addText("A CENTURY IN EIGHT MOVEMENTS", { x:0.7, y:1.5, w:14, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.red, charSpacing:6, margin:0 });
  s.addText([
    { text:"SOUND ", options:{fontFace:FONT_DISPLAY, bold:true, color:C.black} },
    { text:"moves\n", options:{fontFace:FONT_SERIF, italic:true, color:C.brown} },
    { text:"the country", options:{fontFace:FONT_SERIF, italic:true, color:C.brown} },
  ], { x:0.7, y:2.15, w:14, h:4.4, fontSize:120, valign:"top", margin:0 });
  const vx=14.6, vy=2.7, vR=4.0;
  s.addShape(pres.shapes.OVAL, { x:vx, y:vy, w:vR, h:vR, fill:{color:C.black}, line:{color:C.black,width:0} });
  for (const r of [0.22, 0.5, 0.78]) {
    s.addShape(pres.shapes.OVAL, { x:vx+r, y:vy+r, w:vR-2*r, h:vR-2*r, fill:{color:C.black}, line:{color:"2A211C",width:0.75} });
  }
  const ld=2.0, lx=vx+(vR-ld)/2, ly=vy+(vR-ld)/2;
  s.addShape(pres.shapes.OVAL, { x:lx, y:ly, w:ld, h:ld, fill:{color:C.gold}, line:{color:C.gold,width:0} });
  s.addShape(pres.shapes.OVAL, { x:lx+ld/2-0.07, y:ly+ld/2-0.07, w:0.14, h:0.14, fill:{color:C.black}, line:{color:C.black,width:0} });
  const tlY=7.6, tlX0=1.0, tlX1=W-1.0;
  s.addShape(pres.shapes.LINE, { x:tlX0, y:tlY, w:tlX1-tlX0, h:0.001, line:{color:C.brown, width:1.25} });
  const stops = [
    {decade:"1920s", label:"Jazz", color:C.red},
    {decade:"1950s", label:"Rock", color:C.gold},
    {decade:"1960s", label:"Soul", color:C.pink},
    {decade:"1970s", label:"Folk", color:C.green},
    {decade:"1980s", label:"Pop", color:C.blue},
    {decade:"1990s", label:"Hip-Hop", color:C.black},
    {decade:"2000s+", label:"Streaming", color:C.red},
  ];
  const span = (tlX1-tlX0)-2.0;
  stops.forEach((stop, idx) => {
    const dx = tlX0+1.0 + (span*idx)/(stops.length-1);
    s.addShape(pres.shapes.OVAL, { x:dx-0.22, y:tlY-0.22, w:0.44, h:0.44, fill:{color:stop.color}, line:{color:stop.color,width:0} });
    s.addText(stop.decade, { x:dx-1.5, y:tlY-1.05, w:3, h:0.5, fontFace:FONT_MONO, fontSize:16, color:C.brown, align:"center", valign:"middle", margin:0 });
    s.addText(stop.label, { x:dx-1.5, y:tlY+0.32, w:3, h:0.6, fontFace:FONT_SERIF, fontSize:26, color:C.brown, italic:true, align:"center", valign:"middle", margin:0 });
  });
  addFooter(s, 3);
}

// SLIDE 4 — JAZZ AGE
{
  const s = pres.addSlide();
  s.background = { color: C.creamLt };
  addHeader(s, "04 \u00b7 THE JAZZ AGE", "1920 \u2014 1939");
  s.addText("20s", { x:0.7, y:1.4, w:7, h:3.6, fontFace:FONT_SERIF, fontSize:240, color:C.red, valign:"top", margin:0 });
  s.addText("The Cornet and\nthe Crowd.", { x:0.7, y:5.5, w:12, h:2.6, fontFace:FONT_SERIF, fontSize:72, color:C.black, italic:true, valign:"top", margin:0 });
  s.addText("WHAT CHANGED", { x:0.7, y:8.10, w:6, h:0.45, fontFace:FONT_MONO, fontSize:15, color:C.brown, charSpacing:5, margin:0 });
  s.addText([
    { text:"Black artists became ", options:{color:C.black} },
    { text:"America\u2019s first national pop stars", options:{color:C.black, italic:true} },
    { text:" \u2014on records that crossed every state line.", options:{color:C.black} },
  ], { x:0.7, y:8.55, w:11, h:1.9, fontFace:FONT_SERIF, fontSize:24, valign:"top", margin:0 });
  const gx=15.5, gy=2.2;
  s.addShape(pres.shapes.OVAL, { x:gx-0.2, y:gy-0.2, w:2.8, h:2.8, fill:{color:C.creamLt}, line:{color:C.brown,width:1.5} });
  s.addShape(pres.shapes.OVAL, { x:gx, y:gy, w:2.4, h:2.4, fill:{color:C.black}, line:{color:C.black,width:0} });
  s.addText("|", { x:gx+1.15, y:gy+0.15, w:0.3, h:0.4, fontFace:FONT_MONO, fontSize:18, color:C.gold, align:"center", margin:0 });
  s.addText("\u2014", { x:gx+2.05, y:gy+1.05, w:0.3, h:0.4, fontFace:FONT_MONO, fontSize:18, color:C.gold, align:"center", margin:0 });
  drawLineSeg(s, gx+1.2, gy+1.2, gx+1.85, gy+0.55, C.red, 3);
  s.addShape(pres.shapes.OVAL, { x:gx+1.08, y:gy+1.08, w:0.24, h:0.24, fill:{color:C.gold}, line:{color:C.gold,width:0} });
  s.addShape(pres.shapes.LINE, { x:17.4, y:8.6, w:1.4, h:0.001, line:{color:C.black, width:3} });
  s.addShape(pres.shapes.OVAL, { x:17.3, y:8.55, w:0.22, h:0.22, fill:{color:C.red}, line:{color:C.red,width:0} });
  addFooter(s, 4);
}

// SLIDE 5 — ROCK & ROLL
{
  const s = pres.addSlide();
  s.background = { color: C.creamLt };
  addHeader(s, "05 \u00b7 ROCK & ROLL", "1950 \u2014 1965");
  s.addText("THE ELECTRIC AWAKENING", { x:0.7, y:1.4, w:12, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.red, charSpacing:6, margin:0 });
  s.addText("AMPS", { x:0.7, y:2.05, w:10, h:1.7, fontFace:FONT_DISPLAY, fontSize:124, color:C.black, bold:true, valign:"top", margin:0 });
  s.addText("PLUGGED", { x:0.7, y:3.75, w:12, h:1.7, fontFace:FONT_DISPLAY, fontSize:124, color:C.red, bold:true, valign:"top", margin:0 });
  s.addText("into a", { x:0.7, y:5.45, w:10, h:1.5, fontFace:FONT_SERIF, fontSize:84, color:C.black, italic:true, valign:"top", margin:0 });
  s.addText("nation", { x:0.7, y:6.95, w:10, h:1.5, fontFace:FONT_SERIF, fontSize:84, color:C.black, italic:true, valign:"top", margin:0 });
  s.addText([
    { text:"\u201cThe first generation that ", options:{color:C.black} },
    { text:"heard the same song at the same time", options:{color:C.red} },
    { text:" \u2014and bought the same haircut.\u201d", options:{color:C.black} },
  ], { x:0.7, y:8.85, w:12, h:1.5, fontFace:FONT_SERIF, fontSize:24, italic:true, valign:"top", margin:0 });
  s.addShape(pres.shapes.LIGHTNING_BOLT, { x:12.4, y:4.0, w:1.5, h:2.4, fill:{color:C.gold}, line:{color:C.black, width:1.5} });
  const gx=14.8;
  s.addShape(pres.shapes.RECTANGLE, { x:gx+1.4, y:1.7, w:1.7, h:0.85, fill:{color:C.black}, line:{color:C.black,width:0} });
  for (const ox of [0.18, 1.25]) for (const oy of [0.12, 0.50]) {
    s.addShape(pres.shapes.OVAL, { x:gx+1.4+ox, y:1.7+oy, w:0.22, h:0.22, fill:{color:C.gold}, line:{color:C.black,width:0.75} });
  }
  s.addShape(pres.shapes.RECTANGLE, { x:gx+1.95, y:2.55, w:0.65, h:4.5, fill:{color:"5C3A1F"}, line:{color:C.black,width:1} });
  for (let f=1; f<=9; f++) {
    s.addShape(pres.shapes.LINE, { x:gx+1.95, y:2.95+f*0.45, w:0.65, h:0.001, line:{color:C.gold, width:0.75} });
  }
  s.addShape(pres.shapes.OVAL, { x:gx+0.6, y:6.6, w:3.4, h:3.6, fill:{color:C.red}, line:{color:C.black, width:1.5} });
  s.addShape(pres.shapes.RECTANGLE, { x:gx+1.45, y:7.1, w:1.6, h:1.85, fill:{color:C.black}, line:{color:C.black,width:1} });
  for (const yo of [0.22, 0.78, 1.34]) {
    s.addShape(pres.shapes.RECTANGLE, { x:gx+1.6, y:7.1+yo, w:1.3, h:0.20, fill:{color:C.gold}, line:{color:C.gold,width:0} });
  }
  s.addShape(pres.shapes.RECTANGLE, { x:gx+1.6, y:9.25, w:1.3, h:0.20, fill:{color:C.black}, line:{color:C.black,width:0} });
  for (const oy of [9.0, 9.45]) {
    s.addShape(pres.shapes.OVAL, { x:gx+3.30, y:oy, w:0.22, h:0.22, fill:{color:C.gold}, line:{color:C.black,width:0.5} });
  }
  addFooter(s, 5);
}

// SLIDE 6 — SOUL & MOTOWN — sine waves moved to lower-right to avoid headline overlap
{
  const s = pres.addSlide();
  s.background = { color: C.blue };
  addHeader(s, "06 \u00b7 SOUL & MOTOWN", "1960 \u2014 1975", { color: C.cream });
  s.addText("A SOUND OF ITS OWN", { x:5.5, y:1.7, w:12, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.gold, charSpacing:6, margin:0 });
  s.addText("DETROIT", { x:5.5, y:2.4, w:14, h:1.8, fontFace:FONT_DISPLAY, fontSize:160, color:C.cream, bold:true, valign:"top", margin:0 });
  s.addText([
    { text:"BUILT A ", options:{color:C.gold, fontFace:FONT_DISPLAY, bold:true} },
    { text:"hit", options:{color:C.cream, fontFace:FONT_SERIF, italic:true} },
  ], { x:5.5, y:4.20, w:14, h:1.8, fontSize:160, valign:"top", margin:0 });
  s.addText("factory.", { x:5.5, y:6.0, w:14, h:1.6, fontFace:FONT_SERIF, fontSize:120, color:C.cream, italic:true, valign:"top", margin:0 });
  s.addText("Soul stars set the soundtrack of the Civil Rights movement\u2014\nproof that a hook could carry a politics.", { x:5.5, y:8.4, w:13, h:1.6, fontFace:FONT_SERIF, fontSize:24, color:C.cream, italic:true, valign:"top", margin:0 });
  const mx=1.2;
  s.addShape(pres.shapes.OVAL, { x:mx, y:2.8, w:2.7, h:3.6, fill:{color:C.gold}, line:{color:C.black,width:1.5} });
  for (const yo of [0.6, 1.2, 1.8, 2.4, 3.0]) {
    s.addShape(pres.shapes.LINE, { x:mx+0.18, y:2.8+yo, w:2.34, h:0.001, line:{color:C.brown, width:0.5} });
  }
  for (const xo of [0.65, 1.35, 2.05]) {
    s.addShape(pres.shapes.LINE, { x:mx+xo, y:2.95, w:0.001, h:3.3, line:{color:C.brown, width:0.5} });
  }
  s.addShape(pres.shapes.OVAL, { x:mx+0.30, y:3.15, w:0.6, h:1.1, fill:{color:"F1E7D0", transparency:60}, line:{color:"F1E7D0",width:0} });
  s.addShape(pres.shapes.RECTANGLE, { x:mx+1.0, y:6.3, w:0.7, h:1.7, fill:{color:C.black}, line:{color:C.gold,width:1} });
  s.addShape(pres.shapes.LINE, { x:mx+1.35, y:8.0, w:0.001, h:2.2, line:{color:C.black, width:3} });
  function drawWave(yc, color, weight, amp, phase) {
    const x0=10.5, x1=18.5, steps=28;
    for (let k=0; k<steps; k++) {
      const t0=k/steps, t1=(k+1)/steps;
      const xa=x0+(x1-x0)*t0, xb=x0+(x1-x0)*t1;
      const ya=yc + Math.sin(t0*Math.PI*4 + phase)*amp;
      const yb=yc + Math.sin(t1*Math.PI*4 + phase)*amp;
      drawLineSeg(s, xa, ya, xb, yb, color, weight);
    }
  }
  drawWave(7.55, C.cream, 1.6, 0.45, 0);
  drawWave(7.55, C.gold,  1.0, 0.32, Math.PI*0.4);
  drawWave(7.55, C.pink,  0.75, 0.22, Math.PI*0.8);
  s.addText("MUSIC ICONS OF AMERICA", { x:0.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, valign:"middle", margin:0 });
  s.addText("06 / 10", { x:W-10.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, align:"right", valign:"middle", margin:0 });
}

// SLIDE 7 — FOLK & PROTEST
{
  const s = pres.addSlide();
  s.background = { color: C.creamLt };
  addHeader(s, "07 \u00b7 FOLK & PROTEST", "1965 \u2014 1979");
  s.addText("ONE VOICE \u00b7 ONE GUITAR", { x:0.7, y:1.4, w:12, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.green, charSpacing:6, margin:0 });
  s.addText("SONGS", { x:0.7, y:2.05, w:10, h:1.6, fontFace:FONT_DISPLAY, fontSize:122, color:C.black, bold:true, valign:"top", margin:0 });
  s.addText("that argued", { x:0.7, y:3.65, w:11, h:1.5, fontFace:FONT_SERIF, fontSize:88, color:C.black, italic:true, valign:"top", margin:0 });
  s.addText("WITH", { x:0.7, y:5.10, w:10, h:1.6, fontFace:FONT_DISPLAY, fontSize:122, color:C.green, bold:true, valign:"top", margin:0 });
  s.addText("AMERICA", { x:0.7, y:6.70, w:12, h:1.6, fontFace:FONT_DISPLAY, fontSize:122, color:C.green, bold:true, valign:"top", margin:0 });
  s.addText("Songwriters became journalists with a melody\u2014Vietnam,\ncivil rights, women\u2019s lib, all on six strings.", { x:0.7, y:8.85, w:12, h:1.6, fontFace:FONT_SERIF, fontSize:24, italic:true, color:C.black, valign:"top", margin:0 });
  const gx=14.7;
  s.addShape(pres.shapes.RECTANGLE, { x:gx+0.85, y:1.5, w:1.2, h:0.6, fill:{color:C.black}, line:{color:C.black,width:0} });
  for (const ox of [0.12, 0.83]) for (const oy of [0.1, 0.38]) {
    s.addShape(pres.shapes.OVAL, { x:gx+0.85+ox, y:1.5+oy, w:0.16, h:0.16, fill:{color:C.gold}, line:{color:C.black,width:0.5} });
  }
  s.addShape(pres.shapes.RECTANGLE, { x:gx+1.20, y:2.10, w:0.5, h:4.5, fill:{color:"8B5A2B"}, line:{color:C.black,width:1} });
  for (let f=1; f<=9; f++) {
    s.addShape(pres.shapes.LINE, { x:gx+1.20, y:2.55+f*0.43, w:0.5, h:0.001, line:{color:C.gold, width:0.5} });
  }
  s.addShape(pres.shapes.OVAL, { x:gx, y:6.2, w:2.9, h:3.8, fill:{color:C.gold}, line:{color:C.black, width:1.5} });
  s.addShape(pres.shapes.OVAL, { x:gx+1.05, y:7.6, w:0.8, h:0.8, fill:{color:C.black}, line:{color:C.red, width:1.5} });
  s.addShape(pres.shapes.RECTANGLE, { x:gx+0.85, y:8.7, w:1.2, h:0.2, fill:{color:C.black}, line:{color:C.black,width:0} });
  addFooter(s, 7);
}

// SLIDE 8 — POP REVOLUTION
{
  const s = pres.addSlide();
  s.background = { color: C.black };
  addHeader(s, "08 \u00b7 THE POP REVOLUTION", "1980 \u2014 1995", { color: C.cream });
  s.addText("THE IMAGE BECAME THE SONG", { x:0.7, y:1.4, w:12, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.gold, charSpacing:6, margin:0 });
  s.addText("POP HIT", { x:0.7, y:2.10, w:8, h:1.4, fontFace:FONT_DISPLAY, fontSize:105, color:C.cream, bold:true, valign:"top", margin:0 });
  s.addText("THE", { x:0.7, y:3.50, w:8, h:1.4, fontFace:FONT_DISPLAY, fontSize:105, color:C.pink, bold:true, valign:"top", margin:0 });
  s.addText("SCREEN", { x:0.7, y:4.85, w:9, h:1.4, fontFace:FONT_DISPLAY, fontSize:105, color:C.pink, bold:true, valign:"top", margin:0 });
  s.addText([
    { text:"24-hour music television invented the ", options:{color:C.cream} },
    { text:"global pop star", options:{color:C.gold, italic:true} },
    { text:"\u2014\na person you watched as much as listened to.", options:{color:C.cream} },
  ], { x:0.7, y:7.4, w:8.3, h:1.6, fontFace:FONT_SERIF, fontSize:22, italic:true, valign:"top", margin:0 });
  s.addText("\u21b3 \u201981", { x:0.7, y:9.20, w:4, h:0.85, fontFace:FONT_SERIF, fontSize:48, color:C.pink, italic:true, margin:0 });
  const tx=9.3, ty=3.6;
  drawLineSeg(s, tx+1.5, ty, tx+0.9, ty-0.8, C.gold, 3);
  drawLineSeg(s, tx+3.0, ty, tx+3.6, ty-0.8, C.gold, 3);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:tx, y:ty, w:10, h:5.4, fill:{color:"2A211C"}, line:{color:C.gold, width:2}, rectRadius:0.25 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:tx+0.5, y:ty+0.4, w:8.0, h:4.5, fill:{color:C.red}, line:{color:C.black,width:0}, rectRadius:0.15 });
  s.addText("M\u00b7\nTV\u00b7", { x:tx+0.9, y:ty+0.85, w:2.5, h:2.7, fontFace:FONT_SERIF, fontSize:64, color:C.cream, valign:"top", margin:0 });
  s.addShape(pres.shapes.RIGHT_TRIANGLE, { x:tx+4.7, y:ty+1.6, w:2.2, h:2.0, fill:{color:C.cream}, line:{color:C.cream,width:0}, rotate:90 });
  for (let k=0; k<3; k++) {
    s.addShape(pres.shapes.RECTANGLE, { x:tx+0.7+k*0.50, y:ty+4.30, w:0.36, h:0.46, fill:{color:C.cream}, line:{color:C.cream,width:0} });
  }
  s.addShape(pres.shapes.OVAL, { x:tx+9.05, y:ty+1.1, w:0.45, h:0.45, fill:{color:C.gold}, line:{color:C.gold,width:0} });
  s.addShape(pres.shapes.OVAL, { x:tx+9.05, y:ty+1.85, w:0.45, h:0.45, fill:{color:C.gold}, line:{color:C.gold,width:0} });
  s.addText("MUSIC ICONS OF AMERICA", { x:0.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, valign:"middle", margin:0 });
  s.addText("08 / 10", { x:W-10.7, y:H-0.7, w:10, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:4, align:"right", valign:"middle", margin:0 });
}

// SLIDE 9 — HIP-HOP
{
  const s = pres.addSlide();
  s.background = { color: C.creamLt };
  addHeader(s, "09 \u00b7 HIP-HOP\u2019S RISE", "1979 \u2014 TODAY");
  s.addText("FROM THE BLOCK \u00b7 TO THE BILLBOARD", { x:0.7, y:1.4, w:16, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.red, charSpacing:6, margin:0 });
  s.addText([
    { text:"HIP-HOP ", options:{fontFace:FONT_DISPLAY, color:C.black, bold:true} },
    { text:"REWROTE ", options:{fontFace:FONT_DISPLAY, color:C.red, bold:true} },
    { text:"the rules of fame.", options:{fontFace:FONT_SERIF, color:C.brown, italic:true} },
  ], { x:0.7, y:2.05, w:18.6, h:2.2, fontSize:78, valign:"top", margin:0 });
  const bx=2.5, by=4.85, bw=15, bh=5.2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x:bx, y:by, w:bw, h:bh, fill:{color:C.black}, line:{color:C.gold, width:1.5}, rectRadius:0.25 });
  s.addShape(pres.shapes.RECTANGLE, { x:bx+bw/2-0.95, y:by-0.30, w:1.9, h:0.35, fill:{color:C.black}, line:{color:C.black,width:0} });
  const ls=bx+1.0, ly=by+0.75;
  s.addShape(pres.shapes.OVAL, { x:ls, y:ly, w:3.7, h:3.7, fill:{color:"2A1F1A"}, line:{color:C.gold, width:1.5} });
  s.addShape(pres.shapes.OVAL, { x:ls+0.55, y:ly+0.55, w:2.6, h:2.6, fill:{color:C.black}, line:{color:"2A1F1A",width:0} });
  s.addShape(pres.shapes.OVAL, { x:ls+1.15, y:ly+1.15, w:1.4, h:1.4, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addShape(pres.shapes.OVAL, { x:ls+1.75, y:ly+1.75, w:0.2, h:0.2, fill:{color:C.black}, line:{color:C.black,width:0} });
  const rs=bx+bw-1.0-3.7, ry=by+0.75;
  s.addShape(pres.shapes.OVAL, { x:rs, y:ry, w:3.7, h:3.7, fill:{color:"2A1F1A"}, line:{color:C.gold, width:1.5} });
  s.addShape(pres.shapes.OVAL, { x:rs+0.55, y:ry+0.55, w:2.6, h:2.6, fill:{color:C.black}, line:{color:"2A1F1A",width:0} });
  s.addShape(pres.shapes.OVAL, { x:rs+1.15, y:ry+1.15, w:1.4, h:1.4, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addShape(pres.shapes.OVAL, { x:rs+1.75, y:ry+1.75, w:0.2, h:0.2, fill:{color:C.black}, line:{color:C.black,width:0} });
  const cpx=bx+5.5, cpy=by+0.6, cpw=4.0, cph=1.95;
  s.addShape(pres.shapes.RECTANGLE, { x:cpx, y:cpy, w:cpw, h:cph, fill:{color:"2A1F1A"}, line:{color:C.gold,width:1} });
  s.addText("\u25b7 MIXTAPE \u00b7 SIDE A", { x:cpx, y:cpy+0.10, w:cpw, h:0.45, fontFace:FONT_MONO, fontSize:14, color:C.gold, charSpacing:3, align:"center", valign:"middle", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:cpx+0.35, y:cpy+0.75, w:cpw-0.7, h:1.05, fill:{color:C.cream}, line:{color:C.gold, width:0.75} });
  s.addShape(pres.shapes.OVAL, { x:cpx+0.6, y:cpy+1.10, w:0.36, h:0.36, fill:{color:C.black}, line:{color:C.black,width:0} });
  s.addShape(pres.shapes.OVAL, { x:cpx+cpw-0.96, y:cpy+1.10, w:0.36, h:0.36, fill:{color:C.black}, line:{color:C.black,width:0} });
  s.addShape(pres.shapes.LINE, { x:cpx+0.78, y:cpy+1.28, w:cpw-1.56, h:0.001, line:{color:C.black, width:0.75} });
  const btY = cpy+cph+0.25;
  for (let k=0; k<6; k++) {
    s.addShape(pres.shapes.RECTANGLE, { x:cpx+0.10+k*0.63, y:btY, w:0.50, h:0.55, fill:{color:C.gold}, line:{color:C.black,width:0.5} });
  }
  const eqY2 = btY+0.70;
  const heights = [0.30, 0.55, 0.40, 0.75, 0.50, 0.62, 0.35, 0.80, 0.55, 0.42, 0.72, 0.38, 0.58, 0.45];
  for (let k=0; k<heights.length; k++) {
    const bh2 = heights[k];
    s.addShape(pres.shapes.RECTANGLE, { x:cpx+0.10+k*0.27, y:eqY2+(1.05-bh2), w:0.18, h:bh2, fill:{color:C.red}, line:{color:C.red,width:0} });
  }
  addFooter(s, 9);
}

// SLIDE 10 — LONG ECHO
{
  const s = pres.addSlide();
  s.background = { color: C.creamLt };
  addHeader(s, "10 \u00b7 THE LONG ECHO", "END \u00b7 SIDE B");
  s.addText("CLOSING TRACK", { x:0.7, y:1.4, w:12, h:0.55, fontFace:FONT_MONO, fontSize:18, color:C.red, charSpacing:6, margin:0 });
  s.addText([
    { text:"THE SONG ", options:{fontFace:FONT_DISPLAY, color:C.black, bold:true} },
    { text:"never", options:{fontFace:FONT_SERIF, color:C.brown, italic:true} },
  ], { x:0.7, y:2.10, w:18, h:2.0, fontSize:130, valign:"top", margin:0 });
  s.addText([
    { text:"really ", options:{fontFace:FONT_SERIF, color:C.brown, italic:true} },
    { text:"FADES OUT.", options:{fontFace:FONT_DISPLAY, color:C.red, bold:true} },
  ], { x:0.7, y:4.0, w:18, h:2.0, fontSize:130, valign:"top", margin:0 });
  s.addText("Every era\u2019s icons handed the next one a microphone\u2014and a country\nstill listening.", { x:0.7, y:6.3, w:14, h:1.6, fontFace:FONT_SERIF, fontSize:26, color:C.brown, italic:true, valign:"top", margin:0 });
  s.addShape(pres.shapes.OVAL, { x:0.7, y:8.5, w:1.1, h:1.1, fill:{color:C.red}, line:{color:C.red,width:0} });
  s.addText("?", { x:0.7, y:8.5, w:1.1, h:1.1, fontFace:FONT_SERIF, fontSize:48, color:C.cream, bold:true, align:"center", valign:"middle", margin:0 });
  s.addText("NOW PLAYING", { x:2.0, y:8.55, w:6, h:0.45, fontFace:FONT_MONO, fontSize:15, color:C.brown, charSpacing:4, margin:0 });
  s.addText("Questions & Discussion", { x:2.0, y:9.0, w:10, h:0.7, fontFace:FONT_SERIF, fontSize:32, color:C.black, margin:0 });
  s.addShape(pres.shapes.RIGHT_TRIANGLE, { x:W-0.9, y:H-0.9, w:0.9, h:0.9, fill:{color:C.brown}, line:{color:C.brown,width:0}, flipH:true });
  addFooter(s, 10);
}

pres.writeFile({ fileName: "Deliverable_9.pptx" }).then(fn => console.log("Wrote:", fn));
