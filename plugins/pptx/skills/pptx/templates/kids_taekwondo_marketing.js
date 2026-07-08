// build_taekwondo.js
// Recreates "Kim's Taekwondo" presentation using pptxgenjs
// Run: node build_taekwondo.js  ->  produces Taekwondo.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

// Slide size: 20" x 11.25" (custom widescreen)
pres.defineLayout({ name: "TKD", width: 20, height: 11.25 });
pres.layout = "TKD";
pres.title = "Kim's Taekwondo";

// ======== Color Palette ========
const NAVY_DARK   = "06132A"; // deep navy bg
const NAVY        = "0A1F3D"; // navy text/bg variant
const CREAM       = "F7EFD9"; // primary cream
const CREAM_2     = "FBF6E8"; // light cream bg
const GOLD        = "E5A93A"; // accent gold
const RED         = "D7392F"; // accent red
const BLUE        = "2A5DB0"; // accent blue (slide 2 third card)

// ======== Fonts ========
const F_HEAD = "Newsreader";        // serif headlines
const F_BODY = "Plus Jakarta Sans"; // sans-serif body

// ======== Image map (base64 data URIs) ========
const IMG = {
  image_1_1: "data:image/png;base64,PLACEHOLDER",
  image_10_1: "data:image/png;base64,PLACEHOLDER",
  image_10_2: "data:image/png;base64,PLACEHOLDER",
  image_10_3: "data:image/png;base64,PLACEHOLDER",
  image_10_4: "data:image/png;base64,PLACEHOLDER",
  image_2_1: "data:image/png;base64,PLACEHOLDER",
  image_2_2: "data:image/png;base64,PLACEHOLDER",
  image_2_3: "data:image/png;base64,PLACEHOLDER",
  image_3_1: "data:image/png;base64,PLACEHOLDER",
  image_4_1: "data:image/png;base64,PLACEHOLDER",
  image_4_2: "data:image/png;base64,PLACEHOLDER",
  image_5_1: "data:image/png;base64,PLACEHOLDER",
  image_5_2: "data:image/png;base64,PLACEHOLDER",
  image_5_3: "data:image/png;base64,PLACEHOLDER",
  image_5_4: "data:image/png;base64,PLACEHOLDER",
  image_5_5: "data:image/png;base64,PLACEHOLDER",
  image_5_6: "data:image/png;base64,PLACEHOLDER",
  image_5_7: "data:image/png;base64,PLACEHOLDER",
  image_6_1: "data:image/png;base64,PLACEHOLDER",
  image_6_2: "data:image/png;base64,PLACEHOLDER",
  image_6_3: "data:image/png;base64,PLACEHOLDER",
  image_6_4: "data:image/png;base64,PLACEHOLDER",
  image_7_1: "data:image/png;base64,PLACEHOLDER",
  image_8_1: "data:image/png;base64,PLACEHOLDER",
  image_8_2: "data:image/png;base64,PLACEHOLDER",
  image_8_3: "data:image/png;base64,PLACEHOLDER",
  image_8_4: "data:image/png;base64,PLACEHOLDER",
  image_9_1: "data:image/png;base64,PLACEHOLDER",
};

// =================================================================
// SLIDE 1 — Cover: Kick. Bow. Begin.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY_DARK };

  // Korean trigram artwork (right side, partially off-canvas)
  s.addImage({ data: IMG.image_1_1, x: 8.33, y: -1.15, w: 13.54, h: 13.54 });

  // Logo block: gold square with "K" overlapping rotated
  s.addShape("rect", { x: 1.04, y: 0.94, w: 0.56, h: 0.56, fill: { color: GOLD }, line: { type: "none" }, rotate: 354 });
  s.addText([{ text: "K", options: { bold: true, italic: true, fontFace: F_HEAD, fontSize: 30, color: NAVY_DARK } }],
    { x: 1.04, y: 0.94, w: 0.65, h: 0.60, align: "center", valign: "middle", margin: 0 });

  // Brand wordmark — widened to fit on one line
  s.addText("KIM'S TAEKWONDO",
    { x: 1.79, y: 1.04, w: 5.00, h: 0.50, fontFace: F_BODY, fontSize: 19.5, bold: true, color: CREAM, valign: "middle", charSpacing: 4, margin: 0 });

  // Top-right meta — widened and pulled left
  s.addText("EST. 2026 · CHILDREN AGES 4–13",
    { x: 11.00, y: 1.06, w: 8.12, h: 0.45, fontFace: F_BODY, fontSize: 18, bold: true, color: GOLD, align: "right", valign: "middle", charSpacing: 3, margin: 0 });

  // Big serif headline stack
  s.addText("Kick.",  { x: 1.04, y: 2.75, w: 11.80, h: 2.01, fontFace: F_HEAD, fontSize: 165, bold: true,           color: CREAM, valign: "middle", margin: 0 });
  s.addText("Bow.",   { x: 1.04, y: 4.72, w: 11.80, h: 2.01, fontFace: F_HEAD, fontSize: 165, bold: true, italic:true, color: GOLD,  valign: "middle", margin: 0 });
  s.addText("Begin.", { x: 1.04, y: 6.69, w: 11.80, h: 2.01, fontFace: F_HEAD, fontSize: 165, bold: true,           color: CREAM, valign: "middle", margin: 0 });

  // Bottom CTA tag — widened
  s.addShape("rect", { x: 1.04, y: 9.70, w: 4.47, h: 0.93, fill: { color: GOLD }, line: { type: "none" } });
  s.addText("FIRST CLASS FREE",
    { x: 1.21, y: 9.93, w: 4.13, h: 0.51, fontFace: F_BODY, fontSize: 22, bold: true, color: NAVY_DARK, align: "center", valign: "middle", charSpacing: 4, margin: 0 });
  s.addText("Stop by — try a class this week.",
    { x: 5.78, y: 9.84, w: 7.00, h: 0.65, fontFace: F_BODY, fontSize: 21, color: CREAM, valign: "middle", margin: 0 });
}

// =================================================================
// SLIDE 2 — Three good reasons.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM_2 };

  // Title
  s.addText([
    { text: "Three good ", options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } },
    { text: "reasons",     options: { fontFace: F_HEAD, fontSize: 90, color: RED, italic: true } },
    { text: ".",           options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } }
  ], { x: 1.04, y: 0.80, w: 18.45, h: 1.70, valign: "middle", margin: 0 });

  // Three colored cards
  const cards = [
    { x: 1.04,  fill: GOLD, img: IMG.image_2_1, label: "Energy",     sub: "Move it. Burn it. Sleep well." },
    { x: 7.22,  fill: RED,  img: IMG.image_2_2, label: "Focus",      sub: "Eyes up. Listen. Try again." },
    { x: 13.40, fill: BLUE, img: IMG.image_2_3, label: "Confidence", sub: "Stand tall. Bow proud." }
  ];
  cards.forEach((c) => {
    s.addShape("rect", { x: c.x, y: 3.06, w: 5.56, h: 5.56, fill: { color: c.fill }, line: { type: "none" } });
    s.addImage({ data: c.img, x: c.x + 1.14, y: 4.20, w: 3.27, h: 3.27 });
    const tx0 = c.x - 0.08;
    s.addText(c.label, { x: tx0, y: 8.99, w: 5.72, h: 0.82, fontFace: F_HEAD, fontSize: 54, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
    s.addText(c.sub,   { x: tx0, y: 9.85, w: 5.72, h: 0.50, fontFace: F_BODY, fontSize: 21,             color: NAVY, align: "center", valign: "middle", margin: 0 });
  });
}

// =================================================================
// SLIDE 3 — The five tenets.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // Title — widened to fit on one line
  s.addText([
    { text: "The five ", options: { fontFace: F_HEAD, fontSize: 90, color: CREAM } },
    { text: "tenets",    options: { fontFace: F_HEAD, fontSize: 90, color: GOLD, italic: true } },
    { text: ".",         options: { fontFace: F_HEAD, fontSize: 90, color: CREAM } }
  ], { x: 1.04, y: 1.10, w: 14.00, h: 1.80, valign: "middle", margin: 0 });

  // Top-right circular badge image
  s.addImage({ data: IMG.image_3_1, x: 17.29, y: 0.94, w: 1.67, h: 1.67 });

  // Two-column tenets list (rows 1 & 2)
  const tenets = [
    { num: "i.",   name: "Courtesy",     col: "L", row: 0 },
    { num: "ii.",  name: "Integrity",    col: "R", row: 0 },
    { num: "iii.", name: "Perseverance", col: "L", row: 1 },
    { num: "iv.",  name: "Self-Control", col: "R", row: 1 }
  ];
  tenets.forEach(t => {
    const xNum  = t.col === "L" ? 1.04  : 10.25;
    const xName = t.col === "L" ? 2.37  : 11.58;
    const y     = 3.30 + t.row * 1.30;
    const yName = 3.10 + t.row * 1.30;
    s.addText(t.num,
      { x: xNum, y: y, w: 1.10, h: 0.80, fontFace: F_HEAD, fontSize: 54, italic: true, color: GOLD,  valign: "middle", margin: 0 });
    s.addText(t.name,
      { x: xName, y: yName, w: 7.60, h: 1.20, fontFace: F_HEAD, fontSize: 72,            color: CREAM, valign: "middle", margin: 0 });
  });

  // Divider line
  s.addShape("line", { x: 1.04, y: 6.20, w: 17.92, h: 0, line: { color: GOLD, width: 1 } });

  // Final tenet (full width) — taller box, wider for "Indomitable Spirit."
  s.addText("v.",
    { x: 1.04, y: 6.85, w: 0.90, h: 1.30, fontFace: F_HEAD, fontSize: 54, italic: true, color: GOLD, valign: "middle", margin: 0 });
  s.addText("Indomitable Spirit.",
    { x: 2.05, y: 6.55, w: 16.90, h: 1.80, fontFace: F_HEAD, fontSize: 90, italic: true, bold: true, color: CREAM, valign: "middle", margin: 0 });
}

// =================================================================
// SLIDE 4 — Two classes.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM_2 };

  // Title
  s.addText([
    { text: "Two ",    options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } },
    { text: "classes", options: { fontFace: F_HEAD, fontSize: 90, color: RED, italic: true } },
    { text: ".",       options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } }
  ], { x: 1.04, y: 0.70, w: 18.45, h: 1.70, valign: "middle", margin: 0 });

  // ----- Card 1: Little Tigers (gold bg, navy text)
  s.addShape("rect", { x: 1.04, y: 2.79, w: 8.67, h: 6.15, fill: { color: GOLD }, line: { type: "none" } });
  s.addImage({ data: IMG.image_4_1, x: 7.05, y: 2.53, w: 2.92, h: 2.92 });
  s.addText("PROGRAM 01",       { x: 1.68, y: 3.43, w: 7.62, h: 0.45, fontFace: F_BODY, fontSize: 18,  bold: true, color: NAVY_DARK, charSpacing: 4, valign: "middle", margin: 0 });
  s.addText("Little",           { x: 1.68, y: 3.99, w: 7.62, h: 1.10, fontFace: F_HEAD, fontSize: 72,  bold: true, color: NAVY_DARK, valign: "middle", margin: 0 });
  s.addText("Tigers",           { x: 1.68, y: 5.10, w: 7.62, h: 1.10, fontFace: F_HEAD, fontSize: 72,  bold: true, italic: true, color: NAVY_DARK, valign: "middle", margin: 0 });
  s.addText("4–6",              { x: 1.68, y: 6.51, w: 4.20, h: 1.60, fontFace: F_HEAD, fontSize: 105, bold: true, color: NAVY_DARK, valign: "middle", margin: 0 });
  s.addText("YEARS OLD",        { x: 1.68, y: 8.25, w: 4.20, h: 0.40, fontFace: F_BODY, fontSize: 18,  bold: true, color: NAVY_DARK, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("MON · WED · FRI",  { x: 5.50, y: 7.40, w: 4.00, h: 0.40, fontFace: F_BODY, fontSize: 18,  bold: true, color: NAVY_DARK, align: "right", charSpacing: 2, valign: "middle", margin: 0 });
  s.addText("4:30 pm",          { x: 5.50, y: 7.85, w: 4.00, h: 0.60, fontFace: F_HEAD, fontSize: 33,  bold: true, color: NAVY_DARK, align: "right", valign: "middle", margin: 0 });

  // ----- Card 2: Youth Warriors (red bg, cream text)
  s.addShape("rect", { x: 10.29, y: 2.79, w: 8.67, h: 6.15, fill: { color: RED }, line: { type: "none" } });
  s.addImage({ data: IMG.image_4_2, x: 16.30, y: 2.53, w: 2.92, h: 2.92 });
  s.addText("PROGRAM 02",       { x: 10.93, y: 3.43, w: 7.62, h: 0.45, fontFace: F_BODY, fontSize: 18,  bold: true, color: CREAM, charSpacing: 4, valign: "middle", margin: 0 });
  s.addText("Youth",            { x: 10.93, y: 3.99, w: 7.62, h: 1.10, fontFace: F_HEAD, fontSize: 72,  bold: true, color: CREAM, valign: "middle", margin: 0 });
  s.addText("Warriors",         { x: 10.93, y: 5.10, w: 7.62, h: 1.10, fontFace: F_HEAD, fontSize: 72,  bold: true, italic: true, color: CREAM, valign: "middle", margin: 0 });
  s.addText("7–13",             { x: 10.93, y: 6.51, w: 4.50, h: 1.60, fontFace: F_HEAD, fontSize: 105, bold: true, color: CREAM, valign: "middle", margin: 0 });
  s.addText("YEARS OLD",        { x: 10.93, y: 8.25, w: 4.50, h: 0.40, fontFace: F_BODY, fontSize: 18,  bold: true, color: CREAM, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("TUE · THU · SAT",  { x: 14.50, y: 7.40, w: 4.30, h: 0.40, fontFace: F_BODY, fontSize: 18,  bold: true, color: CREAM, align: "right", charSpacing: 2, valign: "middle", margin: 0 });
  s.addText("5:30 pm",          { x: 14.50, y: 7.85, w: 4.30, h: 0.60, fontFace: F_HEAD, fontSize: 33,  bold: true, color: CREAM, align: "right", valign: "middle", margin: 0 });
}

// =================================================================
// SLIDE 5 — From white belt to black belt.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Title — taller box, wider, two stacked text boxes (cleaner than breakLine)
  s.addText("From white belt",
    { x: 1.04, y: 0.80, w: 12.00, h: 1.55, fontFace: F_HEAD, fontSize: 90, color: NAVY, valign: "middle", margin: 0 });
  s.addText("to black belt.",
    { x: 1.04, y: 2.20, w: 12.00, h: 1.55, fontFace: F_HEAD, fontSize: 90, color: RED, italic: true, valign: "middle", margin: 0 });

  // Right tagline — widened
  s.addText("Every belt is a chapter. We help your child write it.",
    { x: 14.00, y: 2.40, w: 5.00, h: 1.20, fontFace: F_BODY, fontSize: 21, color: NAVY, valign: "middle", margin: 0 });

  // Belt row
  const belts = [
    { img: IMG.image_5_1, label: "White",   x: 1.04, lx: 1.00, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_2, label: "Yellow",  x: 3.63, lx: 3.59, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_3, label: "Orange",  x: 6.21, lx: 6.17, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_4, label: "Green",   x: 8.80, lx: 8.76, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_5, label: "Blue",    x: 11.39, lx: 11.35, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_6, label: "Red",     x: 13.97, lx: 13.93, w: 2.40, lw: 2.48 },
    { img: IMG.image_5_7, label: "Black ★", x: 16.46, lx: 16.42, w: 2.59, lw: 2.67, special: true }
  ];
  belts.forEach(b => {
    s.addImage({ data: b.img, x: b.x, y: b.special ? 4.18 : 4.30, w: b.w, h: b.special ? 1.04 : 0.96 });
    s.addText(b.label,
      { x: b.lx, y: 5.45, w: b.lw, h: 0.45, fontFace: F_BODY, fontSize: 18, bold: true, color: NAVY, align: "center", charSpacing: 2, valign: "middle", margin: 0 });
  });

  // Divider line
  s.addShape("line", { x: 1.04, y: 6.58, w: 17.92, h: 0, line: { color: NAVY, width: 1 } });

  // Quote — wider
  s.addText("“Black belt isn't the end. It's the moment a student is finally ready to begin.”",
    { x: 1.04, y: 6.90, w: 14.00, h: 0.55, fontFace: F_HEAD, fontSize: 22, italic: true, color: NAVY, valign: "middle", margin: 0 });
  s.addText("— A KOREAN SAYING",
    { x: 15.20, y: 6.95, w: 3.85, h: 0.45, fontFace: F_BODY, fontSize: 18, bold: true, color: NAVY, align: "right", charSpacing: 3, valign: "middle", margin: 0 });
}

// =================================================================
// SLIDE 6 — A class, in four moves.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM_2 };

  // Title
  s.addText([
    { text: "A class, in ", options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } },
    { text: "four moves",  options: { fontFace: F_HEAD, fontSize: 90, color: RED, italic: true } },
    { text: ".",           options: { fontFace: F_HEAD, fontSize: 90, color: NAVY } }
  ], { x: 1.04, y: 0.70, w: 18.45, h: 1.70, valign: "middle", margin: 0 });

  const steps = [
    { ix: 1.80, iy: 3.13, iw: 2.72, ih: 2.72, label: "Bow in.",  num: "01", img: IMG.image_6_1 },
    { ix: 6.36, iy: 3.13, iw: 2.72, ih: 2.72, label: "Stretch.", num: "02", img: IMG.image_6_2 },
    { ix: 10.83, iy: 3.04, iw: 2.90, ih: 2.90, label: "Kick.",   num: "03", img: IMG.image_6_3 },
    { ix: 15.39, iy: 3.04, iw: 2.90, ih: 2.90, label: "Break!",  num: "04", img: IMG.image_6_4 }
  ];
  const cardX = [1.04, 5.60, 10.17, 14.73];
  cardX.forEach((cx, i) => {
    const st = steps[i];
    s.addShape("rect", { x: cx, y: 2.71, w: 4.23, h: 4.44, fill: { color: CREAM }, line: { type: "none" } });
    s.addImage({ data: st.img, x: st.ix, y: st.iy, w: st.iw, h: st.ih });
    s.addShape("rect", { x: cx + 0.05, y: 6.22, w: 4.13, h: 0.87, fill: { color: NAVY_DARK }, line: { type: "none" } });
    // Label given more horizontal room
    s.addText(st.label, { x: cx + 0.30, y: 6.43, w: 3.20, h: 0.55, fontFace: F_HEAD, fontSize: 30, bold: true, color: CREAM, valign: "middle", margin: 0 });
    s.addText(st.num,   { x: cx + 3.50, y: 6.51, w: 0.65, h: 0.45, fontFace: F_BODY, fontSize: 18, bold: true, color: GOLD, align: "right", valign: "middle", charSpacing: 2, margin: 0 });
  });
}

// =================================================================
// SLIDE 7 — Master Kim (instructor)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY_DARK };

  // Master Kim portrait
  s.addImage({ data: IMG.image_7_1, x: 1.04, y: 2.27, w: 6.67, h: 6.67 });

  // "YOUR INSTRUCTOR" badge under portrait — widened
  s.addShape("rect", { x: 1.35, y: 8.48, w: 4.00, h: 0.65, fill: { color: GOLD }, line: { type: "none" } });
  s.addText("YOUR INSTRUCTOR",
    { x: 1.35, y: 8.55, w: 4.00, h: 0.50, fontFace: F_BODY, fontSize: 18, bold: true, color: NAVY_DARK, align: "center", charSpacing: 4, valign: "middle", margin: 0 });

  // Big name — taller box (allows two-line wrap as in original)
  s.addText([
    { text: "Master ", options: { fontFace: F_HEAD, fontSize: 120, bold: true, color: CREAM } },
    { text: "Kim.",    options: { fontFace: F_HEAD, fontSize: 120, bold: true, italic: true, color: GOLD } }
  ], { x: 9.64, y: 2.10, w: 9.60, h: 3.50, valign: "middle", margin: 0, fit: "shrink" });

  // Bio — taller
  s.addText("A teacher first. A martial artist always. Patient with kids — and the parents who love them.",
    { x: 9.64, y: 5.70, w: 8.50, h: 1.00, fontFace: F_BODY, fontSize: 22, color: CREAM, valign: "middle", margin: 0 });

  // Three credential columns — widened, label boxes given more height
  const creds = [
    { x: 9.64,  big: [{ text: "5", sz: 72 }, { text: "th", sz: 36 }], label: "DAN BLACK BELT", w: 2.95 },
    { x: 12.85, big: [{ text: "18", sz: 72 }, { text: "y", sz: 36 }], label: "TEACHING KIDS",  w: 2.95 },
    { x: 16.05, big: null, kuk: "Kukkiwon", label: "WORLD HQ CERTIFIED", w: 3.20 }
  ];
  creds.forEach(c => {
    s.addShape("line", { x: c.x, y: 7.10, w: c.w - 0.10, h: 0, line: { color: GOLD, width: 1.5 } });
    if (c.big) {
      const runs = c.big.map(r => ({ text: r.text, options: { fontFace: F_HEAD, fontSize: r.sz, bold: true, color: GOLD, baseline: r.sz === 36 ? 30 : 0 } }));
      s.addText(runs, { x: c.x, y: 7.30, w: c.w, h: 1.10, valign: "bottom", margin: 0 });
    } else {
      s.addText(c.kuk, { x: c.x, y: 7.65, w: c.w, h: 0.75, fontFace: F_HEAD, fontSize: 36, bold: true, color: GOLD, valign: "middle", margin: 0 });
    }
    s.addText(c.label,
      { x: c.x, y: 8.50, w: c.w, h: 0.50, fontFace: F_BODY, fontSize: 16, bold: true, color: CREAM, charSpacing: 3, valign: "middle", margin: 0 });
  });
}

// =================================================================
// SLIDE 8 — What kids actually take home.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Title — taller and a touch smaller fontSize so it fits one line
  s.addText([
    { text: "What kids actually ", options: { fontFace: F_HEAD, fontSize: 80, color: NAVY } },
    { text: "take home",           options: { fontFace: F_HEAD, fontSize: 80, color: RED, italic: true } },
    { text: ".",                   options: { fontFace: F_HEAD, fontSize: 80, color: NAVY } }
  ], { x: 1.04, y: 0.80, w: 18.45, h: 1.50, valign: "middle", margin: 0 });

  const items = [
    { x: 1.04,  img: IMG.image_8_1, ix: 1.99,  iy: 3.70, iw: 2.20, ih: 2.20, label: "Listening." },
    { x: 5.65,  img: IMG.image_8_2, ix: 6.50,  iy: 3.60, iw: 2.40, ih: 2.40, label: "Respect."  },
    { x: 10.25, img: IMG.image_8_3, ix: 11.20, iy: 3.70, iw: 2.20, ih: 2.20, label: "Patience." },
    { x: 14.85, img: IMG.image_8_4, ix: 15.71, iy: 3.60, iw: 2.40, ih: 2.40, label: "Strength." }
  ];
  items.forEach(it => {
    s.addShape("rect", { x: it.x, y: 2.85, w: 4.10, h: 4.10, fill: { color: CREAM_2 }, line: { type: "none" } });
    s.addImage({ data: it.img, x: it.ix, y: it.iy, w: it.iw, h: it.ih });
    s.addText(it.label,
      { x: it.x, y: 7.20, w: 4.23, h: 0.65, fontFace: F_HEAD, fontSize: 33, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
  });
}

// =================================================================
// SLIDE 9 — Your first class is FREE.
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: GOLD };

  // Decorative starburst (right side, partly off-canvas)
  s.addImage({ data: IMG.image_9_1, x: -2.08, y: -0.62, w: 12.50, h: 12.50 });

  // Top tag — widened to fit "FLEA MARKET WEEKEND ONLY" on one line
  s.addShape("rect", { x: 1.04, y: 1.05, w: 7.20, h: 0.70, fill: { color: NAVY_DARK }, line: { type: "none" }, rotate: 358 });
  s.addText("FLEA MARKET WEEKEND ONLY",
    { x: 1.10, y: 1.10, w: 7.10, h: 0.60, fontFace: F_BODY, fontSize: 19, bold: true, color: GOLD, align: "center", charSpacing: 4, valign: "middle", margin: 0, rotate: 358 });

  // Headline stack — bigger boxes to fit 135pt / 165pt text without overflow
  s.addText("Your first",
    { x: 1.04, y: 2.10, w: 11.00, h: 2.00, fontFace: F_HEAD, fontSize: 130, bold: true, color: NAVY_DARK, valign: "middle", margin: 0 });
  s.addText("class",
    { x: 1.04, y: 4.20, w: 11.00, h: 2.50, fontFace: F_HEAD, fontSize: 165, bold: true, italic: true, color: NAVY_DARK, valign: "middle", margin: 0 });
  s.addText("is FREE.",
    { x: 1.04, y: 6.85, w: 11.00, h: 2.80, fontFace: F_HEAD, fontSize: 165, bold: true, color: RED, valign: "middle", margin: 0 });

  // Right side "ticket"
  s.addShape("rect", { x: 11.20, y: 2.89, w: 7.76, h: 5.47, fill: { color: CREAM }, line: { color: NAVY_DARK, width: 1, dashType: "dash" } });
  // Punch holes
  s.addShape("ellipse", { x: 11.01, y: 5.41, w: 0.43, h: 0.43, fill: { color: GOLD }, line: { type: "none" } });
  s.addShape("ellipse", { x: 18.71, y: 5.41, w: 0.43, h: 0.43, fill: { color: GOLD }, line: { type: "none" } });

  // ADMIT ONE header
  s.addText("— ADMIT ONE —",
    { x: 11.81, y: 3.20, w: 6.87, h: 0.55, fontFace: F_BODY, fontSize: 18, bold: true, color: RED, align: "center", charSpacing: 4, valign: "middle", margin: 0 });

  // Main offer
  s.addText("One free Taekwondo class",
    { x: 11.45, y: 3.85, w: 7.30, h: 1.50, fontFace: F_HEAD, fontSize: 42, bold: true, color: NAVY_DARK, align: "center", valign: "middle", margin: 0 });

  // Dashed divider inside ticket
  s.addShape("line", { x: 11.75, y: 5.62, w: 6.66, h: 0, line: { color: NAVY_DARK, width: 1, dashType: "dash" } });

  // Three checks
  const checks = [
    { y: 5.95, text: "Free uniform to keep" },
    { y: 6.65, text: "No registration fee" },
    { y: 7.35, text: "Two free weeks of class" }
  ];
  checks.forEach(c => {
    s.addText("✓", { x: 11.65, y: c.y, w: 0.50, h: 0.55, fontFace: F_BODY, fontSize: 24, bold: true, color: RED, valign: "middle", margin: 0 });
    s.addText(c.text, { x: 12.20, y: c.y, w: 6.20, h: 0.55, fontFace: F_BODY, fontSize: 21, color: NAVY_DARK, valign: "middle", margin: 0 });
  });
}

// =================================================================
// SLIDE 10 — See you on the mat. (closing)
// =================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY_DARK };

  // Top tag
  s.addText("— COME TRAIN WITH US —",
    { x: 1.04, y: 0.94, w: 9.48, h: 0.50, fontFace: F_BODY, fontSize: 21, bold: true, color: GOLD, charSpacing: 4, valign: "middle", margin: 0 });

  // Big closing headline — top-aligned in a tall box, with shrink-fit so font
  // adjusts down rather than overflowing onto the tag above
  s.addText("See you on",
    { x: 1.04, y: 1.70, w: 11.00, h: 3.50, fontFace: F_HEAD, fontSize: 130, bold: true, color: CREAM, valign: "top", margin: 0, fit: "shrink" });
  s.addText("the mat.",
    { x: 1.04, y: 5.30, w: 11.00, h: 2.20, fontFace: F_HEAD, fontSize: 130, bold: true, italic: true, color: GOLD, valign: "top", margin: 0, fit: "shrink" });

  // Contact rows with icons
  s.addImage({ data: IMG.image_10_1, x: 1.04, y: 7.97, w: 0.62, h: 0.62 });
  s.addText("[ Studio address — edit ]",
    { x: 1.85, y: 8.00, w: 8.65, h: 0.55, fontFace: F_HEAD, fontSize: 26, color: CREAM, valign: "middle", margin: 0 });

  s.addImage({ data: IMG.image_10_2, x: 1.04, y: 8.84, w: 0.62, h: 0.62 });
  s.addText("[ Phone number ]",
    { x: 1.85, y: 8.87, w: 8.65, h: 0.55, fontFace: F_HEAD, fontSize: 26, color: CREAM, valign: "middle", margin: 0 });

  s.addImage({ data: IMG.image_10_3, x: 1.04, y: 9.72, w: 0.62, h: 0.62 });
  s.addText("kimstaekwondo.com",
    { x: 1.85, y: 9.75, w: 8.65, h: 0.55, fontFace: F_HEAD, fontSize: 26, color: CREAM, valign: "middle", margin: 0 });

  // QR code panel
  s.addShape("rect", { x: 12.51, y: 2.51, w: 5.23, h: 5.27, fill: { color: CREAM }, line: { type: "none" } });
  s.addImage({ data: IMG.image_10_4, x: 12.94, y: 2.94, w: 4.38, h: 4.38 });
  s.addShape("rect", { x: 11.95, y: 8.11, w: 6.35, h: 0.70, fill: { color: GOLD }, line: { type: "none" } });
  s.addText("SCAN TO CLAIM FREE CLASS",
    { x: 11.95, y: 8.20, w: 6.35, h: 0.55, fontFace: F_BODY, fontSize: 19, bold: true, color: NAVY_DARK, align: "center", charSpacing: 4, valign: "middle", margin: 0 });
}

// ======== Write file ========
pres.writeFile({ fileName: "Taekwondo.pptx" })
  .then(name => console.log("Wrote " + name))
  .catch(err => { console.error(err); process.exit(1); });
