// Pizza.pptx replica — pptxgenjs recreation
// Run: node pizza.js   (requires `npm install pptxgenjs`)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 default — we override below
pres.defineLayout({ name: "PIZZA_20x11_25", width: 20, height: 11.25 });
pres.layout = "PIZZA_20x11_25";
pres.title = "American Regional Pizza";
pres.author = "A Field Guide";

// ---------- Palette ----------
const BG_CREAM   = "F2EADF";
const BG_TAN     = "EADFD0"; // Chicago slide
const BG_DARK    = "1A1714"; // New Haven slide
const INK        = "171412"; // main heading ink
const SUBINK     = "3A342E"; // eyebrow/footer ink
const MUTED      = "8A8077"; // tertiary labels / monospace numerals
const ACCENT     = "C8422A"; // red/terracotta accent (italics)
const RULE_DARK  = "171412";
const RULE_LIGHT = "D9CEBE"; // for dark slide
const CREAM_ON_DARK_TEXT = "F2EADF";
const CREAM_ON_DARK_SUB  = "A9A096";

// ---------- Fonts ----------
const HEAD = "Georgia";   // editorial serif for display/body
const SANS = "Arial";     // eyebrows, footers, captions
const MONO = "Consolas";  // index numerals (01, 02, …)

// ---------- Helpers ----------
// Build SVG -> data URI for pptxgenjs addImage({ data: ... })
function svgData(svg) {
  return "image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// Horizontal rule
function hrule(slide, x, y, w, color = RULE_DARK) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.012,
    fill: { color }, line: { type: "none" }
  });
}

// Eyebrow (top-bar small caps) — Slide 1–8 share this header structure
function topBar(slide, leftText, rightText, inkColor = SUBINK) {
  slide.addText(leftText, {
    x: 1.04, y: 0.83, w: 10, h: 0.35,
    fontFace: SANS, fontSize: 12, color: inkColor,
    charSpacing: 3.2, bold: false, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(rightText, {
    x: 9.04, y: 0.83, w: 10, h: 0.35,
    fontFace: SANS, fontSize: 12, color: inkColor,
    charSpacing: 3.2, align: "right", valign: "middle", margin: 0,
  });
}

// Bottom footer (brand left / page right)
function footer(slide, page, inkColor = SUBINK) {
  slide.addText("AMERICAN REGIONAL PIZZA" + (page === 8 ? " — FIN." : ""), {
    x: 1.04, y: 10.53, w: 10, h: 0.35,
    fontFace: SANS, fontSize: 12, color: inkColor,
    charSpacing: 3.96, align: "left", valign: "middle", margin: 0,
  });
  slide.addText(`0${page} / 08`, {
    x: 9.04, y: 10.53, w: 10, h: 0.35,
    fontFace: SANS, fontSize: 12, color: inkColor,
    charSpacing: 3.96, align: "right", valign: "middle", margin: 0,
  });
}

// City detail-row factory (CRUST / CHEESE / SIGNATURE block)
function cityFacts(slide, y, facts, labelColor = MUTED, valColor = INK) {
  const xs = [1.04, 4.24, 7.43];
  facts.forEach(([label, value], i) => {
    slide.addText(label, {
      x: xs[i], y, w: 2.95, h: 0.35,
      fontFace: SANS, fontSize: 12, color: labelColor,
      charSpacing: 3.6, align: "left", valign: "middle", margin: 0,
    });
    slide.addText(value, {
      x: xs[i], y: y + 0.41, w: 2.95, h: 0.7,
      fontFace: HEAD, fontSize: 14, color: valColor,
      align: "left", valign: "top", margin: 0,
    });
  });
}

// =========================================================
// PIZZA ILLUSTRATIONS — each returned as an SVG string
// =========================================================

// 1) Title-page "hero" pepperoni pie (slice removed, classic)
function svgHeroPizza() {
  // 1240×1240 viewBox
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 1240">
  <g transform="translate(620,620)">
    <!-- crust rim -->
    <circle r="560" fill="#C8894A"/>
    <!-- cheese base -->
    <circle r="510" fill="#F2C96B"/>
    <!-- sauce peek / subtle overlay -->
    <circle r="510" fill="#E8A84A" opacity="0.15"/>
    <!-- missing slice: cut from 285° to 345° (top-right wedge) -->
    <path d="M0,0 L${Math.cos(Math.PI*1.583)*570},${Math.sin(Math.PI*1.583)*570}
             A570,570 0 0,1 ${Math.cos(Math.PI*1.916)*570},${Math.sin(Math.PI*1.916)*570} Z"
          fill="#F2EADF"/>
    <!-- pepperoni -->
    ${[
      [-220,-180,70],[-40,-280,65],[180,-200,68],[320,-40,60],
      [250,180,70],[60,280,66],[-180,260,60],[-320,100,68],
      [-330,-60,62],[-90,-60,58],[120,40,60],[-150,120,55]
    ].map(([cx,cy,r])=>`
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#B83A2C"/>
      <circle cx="${cx-r*0.15}" cy="${cy-r*0.15}" r="${r*0.82}" fill="#C8422A"/>
    `).join("")}
  </g>
</svg>`;
}

// 3) NY — wide thin round, sparse pepperoni, slice cut
function svgNYPizza() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1440">
  <g transform="translate(720,720)">
    <circle r="660" fill="#D89A5A"/>
    <circle r="610" fill="#F2C96B"/>
    <!-- light sauce zones -->
    <circle r="560" fill="#E56A3A" opacity="0.18"/>
    <!-- slice cut lines (pizza wheel) -->
    ${[0,45,90,135].map(a=>{
      const rad = a*Math.PI/180;
      const x = Math.cos(rad)*620, y = Math.sin(rad)*620;
      return `<line x1="${-x}" y1="${-y}" x2="${x}" y2="${y}" stroke="#C8894A" stroke-width="4" opacity="0.55"/>`;
    }).join("")}
    <!-- pepperoni scattered -->
    ${[[-260,-180,58],[80,-260,60],[280,-120,56],[320,140,60],
       [140,260,58],[-120,280,56],[-300,120,60],[-200,-20,54],
       [60,40,52],[220,-20,52]]
      .map(([cx,cy,r])=>`
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#AE2F22"/>
        <circle cx="${cx-r*0.2}" cy="${cy-r*0.2}" r="${r*0.78}" fill="#C8422A"/>`).join("")}
  </g>
</svg>`;
}

// 4) Chicago — cross-section (deep dish showing layers)
function svgChicagoPizza() {
  // A tall oval showing chunked tomato on top, cheese, fill, crust
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1720 1440">
  <!-- top-down plan view (small) -->
  <g transform="translate(860,360)">
    <ellipse cx="0" cy="0" rx="620" ry="170" fill="#C8894A"/>
    <ellipse cx="0" cy="-12" rx="560" ry="140" fill="#C8422A"/>
    <!-- tomato chunks -->
    ${[[-380,-40,55],[-160,-70,50],[80,-60,52],[300,-40,55],[420,0,48],
       [-260,30,45],[-40,40,48],[180,30,50],[360,40,46]]
      .map(([cx,cy,r])=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#D94E34"/>
        <circle cx="${cx-r*0.25}" cy="${cy-r*0.25}" r="${r*0.6}" fill="#E8604A"/>`).join("")}
  </g>
  <!-- cross section (larger, below) -->
  <g transform="translate(860,980)">
    <!-- crust outer walls + base -->
    <path d="M-620,-240 Q-620,-280 -560,-280 L560,-280 Q620,-280 620,-240
             L620,180 Q620,240 560,240 L-560,240 Q-620,240 -620,180 Z"
          fill="#C8894A"/>
    <!-- interior layers (from bottom up) -->
    <!-- crust inner -->
    <path d="M-540,-200 L540,-200 L540,180 L-540,180 Z" fill="#F2D39A"/>
    <!-- cheese layer (yellow) -->
    <rect x="-540" y="-120" width="1080" height="90" fill="#F2C96B"/>
    <!-- sauce layer (red, chunks visible) -->
    <rect x="-540" y="-30" width="1080" height="110" fill="#C8422A"/>
    ${[-440,-300,-160,-20,120,260,400].map(x=>`
      <circle cx="${x}" cy="25" r="34" fill="#D94E34"/>
      <circle cx="${x-8}" cy="15" r="22" fill="#E8604A"/>`).join("")}
    <!-- top rim highlight -->
    <path d="M-620,-240 Q-620,-280 -560,-280 L560,-280 Q620,-280 620,-240"
          fill="none" stroke="#B07538" stroke-width="6"/>
    <!-- layer labels (unlabeled visually, but tonal bands) -->
  </g>
</svg>`;
}

// 5) Detroit — square pan, cheese pushed to edge, pepperoni in rows
function svgDetroitPizza() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1440">
  <g transform="translate(720,720)">
    <!-- blue-steel pan (dark frame) -->
    <rect x="-620" y="-620" width="1240" height="1240" rx="30" fill="#3A2E24"/>
    <!-- caramelized cheese edge (lacquered frame) -->
    <rect x="-560" y="-560" width="1120" height="1120" rx="16" fill="#C87A2C"/>
    <!-- cheese inner -->
    <rect x="-480" y="-480" width="960" height="960" fill="#F2C96B"/>
    <!-- sauce stripes (Detroit-style racing stripes) -->
    <rect x="-480" y="-240" width="960" height="90" fill="#C8422A"/>
    <rect x="-480" y="-40"  width="960" height="90" fill="#C8422A"/>
    <rect x="-480" y="160"  width="960" height="90" fill="#C8422A"/>
    <!-- pepperoni arranged in a grid -->
    ${[[-300,-380],[0,-380],[300,-380],
       [-300,380],[0,380],[300,380],
       [-380,-100],[380,-100],[-380,100],[380,100]]
      .map(([cx,cy])=>`
        <circle cx="${cx}" cy="${cy}" r="60" fill="#AE2F22"/>
        <circle cx="${cx-12}" cy="${cy-12}" r="48" fill="#C8422A"/>`).join("")}
  </g>
</svg>`;
}

// 6) New Haven — irregular oblong, charred, tomato pie (on dark bg)
function svgNewHavenPizza() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1440">
  <g transform="translate(720,720)">
    <!-- charred irregular outline -->
    <path d="M-560,-40
             C-580,-260 -360,-440 -100,-480
             C200,-520 480,-360 540,-120
             C580,80 520,300 320,440
             C120,560 -180,540 -380,420
             C-560,320 -540,160 -560,-40 Z"
          fill="#2A1812"/>
    <!-- tomato fill, slightly smaller -->
    <path d="M-480,-40
             C-500,-220 -310,-380 -80,-420
             C180,-460 430,-320 480,-110
             C520,80 460,280 280,400
             C100,500 -160,480 -340,380
             C-490,290 -480,150 -480,-40 Z"
          fill="#A83422"/>
    <!-- char spots / blisters -->
    ${[[-420,-180,28],[-260,-340,34],[60,-400,30],[340,-280,32],
       [460,-40,26],[420,200,30],[240,380,28],[-40,420,32],
       [-300,340,30],[-460,140,26],[120,-220,18],[-140,-280,20],
       [200,40,22],[-200,80,20],[360,120,20]]
      .map(([cx,cy,r])=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1A0A06" opacity="0.85"/>`).join("")}
    <!-- oregano / specks -->
    ${[[-300,-80],[-100,-180],[160,-120],[300,20],[180,180],[-60,220],[-240,100],[40,-40]]
      .map(([cx,cy])=>`<circle cx="${cx}" cy="${cy}" r="6" fill="#3A2810"/>`).join("")}
  </g>
</svg>`;
}

// 7) St. Louis — round, square-cut (party cut) with provel; red tomato
function svgStLouisPizza() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1440">
  <g transform="translate(720,720)">
    <!-- thin cracker edge -->
    <circle r="620" fill="#C8894A"/>
    <!-- tomato sauce face -->
    <circle r="580" fill="#C8422A"/>
    <!-- provel cheese blob (irregular, pale) -->
    <path d="M-440,-380
             C-280,-480 120,-460 360,-360
             C520,-280 560,-80 480,140
             C400,340 180,460 -40,440
             C-260,420 -440,320 -500,140
             C-540,-20 -520,-260 -440,-380 Z"
          fill="#F2D98A"/>
    <!-- small cheese highlights -->
    ${[[-280,-260,60],[120,-300,50],[300,-120,55],[240,180,50],[-100,260,55],[-340,60,50],[-80,-80,40],[140,20,38]]
      .map(([cx,cy,r])=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#EBC560" opacity="0.55"/>`).join("")}
    <!-- party-cut grid (square cuts across round pie) -->
    ${[-400,-200,0,200,400].map(x=>`<line x1="${x}" y1="-600" x2="${x}" y2="600" stroke="#8A2A1E" stroke-width="4" opacity="0.55"/>`).join("")}
    ${[-400,-200,0,200,400].map(y=>`<line x1="-600" y1="${y}" x2="600" y2="${y}" stroke="#8A2A1E" stroke-width="4" opacity="0.55"/>`).join("")}
    <!-- a few visible pepperoni -->
    ${[[-260,-140,42],[120,-220,44],[260,100,42],[-80,180,40],[-300,260,38],[80,-40,36]]
      .map(([cx,cy,r])=>`
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#8A2A1E"/>
        <circle cx="${cx-8}" cy="${cy-8}" r="${r*0.72}" fill="#B13A28"/>`).join("")}
  </g>
</svg>`;
}

// 8) Summary-row tiny icons (each city, 88×88)
function svgIconNY()      { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><circle cx="44" cy="44" r="40" fill="#C8894A"/><circle cx="44" cy="44" r="34" fill="#F2C96B"/><circle cx="32" cy="36" r="6" fill="#C8422A"/><circle cx="54" cy="38" r="6" fill="#C8422A"/><circle cx="42" cy="54" r="6" fill="#C8422A"/></svg>`; }
function svgIconChicago() { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect x="6" y="22" width="76" height="44" rx="6" fill="#C8894A"/><rect x="10" y="28" width="68" height="10" fill="#F2C96B"/><rect x="10" y="40" width="68" height="22" fill="#C8422A"/></svg>`; }
function svgIconDetroit() { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect x="6" y="6" width="76" height="76" rx="4" fill="#3A2E24"/><rect x="12" y="12" width="64" height="64" fill="#C87A2C"/><rect x="18" y="18" width="52" height="52" fill="#F2C96B"/><rect x="18" y="36" width="52" height="6" fill="#C8422A"/><rect x="18" y="48" width="52" height="6" fill="#C8422A"/></svg>`; }
function svgIconNewHaven(){ return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><path d="M10,44 C10,22 30,10 50,12 C70,14 80,30 78,50 C76,70 58,80 38,76 C18,72 10,62 10,44Z" fill="#2A1812"/><path d="M16,44 C16,26 32,16 50,18 C66,20 74,34 72,48 C70,64 56,72 40,70 C22,66 16,58 16,44Z" fill="#A83422"/></svg>`; }
function svgIconStLouis() { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><circle cx="44" cy="44" r="40" fill="#C8422A"/><path d="M24,28 C34,22 54,22 64,30 C72,38 70,54 60,62 C48,68 30,64 22,54 C18,46 18,34 24,28Z" fill="#F2D98A"/><line x1="22" y1="22" x2="22" y2="66" stroke="#8A2A1E" stroke-width="1.5"/><line x1="66" y1="22" x2="66" y2="66" stroke="#8A2A1E" stroke-width="1.5"/></svg>`; }

// =========================================================
// SLIDE 1 — Title
// =========================================================
{
  const slide = pres.addSlide();
  slide.background = { color: BG_CREAM };

  topBar(slide, "A FIELD GUIDE", "VOL. 01 — 2026");

  // Big display title — two lines: "American Regional" / "Pizza" (italic, red)
  slide.addText(
    [
      { text: "American Regional", options: { color: INK, breakLine: true } },
      { text: "Pizza",              options: { color: ACCENT, italic: true } },
    ],
    {
      x: 1.04, y: 2.24, w: 9.71, h: 6.25,
      fontFace: HEAD, fontSize: 132, charSpacing: -4.9, bold: false,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Bottom-left lockup
  slide.addText("EIGHT-SLIDE OVERVIEW", {
    x: 1.04, y: 9.55, w: 7.07, h: 0.35,
    fontFace: SANS, fontSize: 12, color: SUBINK, charSpacing: 3.96,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText("Five cities. Five crusts. One obsession.", {
    x: 1.04, y: 9.96, w: 10, h: 0.55,
    fontFace: HEAD, fontSize: 19, color: INK, italic: true,
    align: "left", valign: "top", margin: 0,
  });

  // Hero pizza (right side)
  slide.addImage({
    data: svgData(svgHeroPizza()),
    x: 11.80, y: 2.11, w: 6.46, h: 6.46,
  });

  footer(slide, 1);
}

// =========================================================
// SLIDE 2 — Contents
// =========================================================
{
  const slide = pres.addSlide();
  slide.background = { color: BG_CREAM };

  topBar(slide, "CONTENTS", "A NATION OF STYLES");

  // Left editorial column
  slide.addText(
    [
      { text: "Five regions, ", options: { color: INK, breakLine: true } },
      { text: "one craft.",     options: { color: ACCENT, italic: true } },
    ],
    {
      x: 1.04, y: 4.03, w: 8.69, h: 2.42,
      fontFace: HEAD, fontSize: 72, charSpacing: -2.7,
      align: "left", valign: "top", margin: 0,
    }
  );
  slide.addText(
    "Each city answered the same question — flour, fire, cheese — with a different geometry.",
    {
      x: 1.04, y: 7.03, w: 6.01, h: 1.17,
      fontFace: HEAD, fontSize: 16, color: SUBINK,
      align: "left", valign: "top", margin: 0, italic: false,
    }
  );

  // Right TOC list — 5 rows with hairline rules + numeral / city / subtitle
  const rows = [
    ["01", "New York",   "THIN & FOLDABLE"],
    ["02", "Chicago",    "DEEP DISH"],
    ["03", "Detroit",    "SQUARE, CRISPY EDGE"],
    ["04", "New Haven",  "COAL-FIRED CHAR"],
    ["05", "St. Louis",  "CRACKER THIN"],
  ];
  const rowTopY = 2.63;
  const rowH = 1.385; // distance between rules
  // Top rule
  hrule(slide, 10.52, rowTopY, 8.44);
  rows.forEach((r, i) => {
    const yRule = rowTopY + rowH * (i + 1);
    const yNum  = rowTopY + rowH * i + 0.67;   // ~baseline of numeral
    const yCity = rowTopY + rowH * i + 0.36;
    const ySub  = rowTopY + rowH * i + 0.70;
    // numeral (mono)
    slide.addText(r[0], {
      x: 10.52, y: yNum, w: 1.02, h: 0.36,
      fontFace: MONO, fontSize: 13, color: MUTED,
      align: "left", valign: "middle", margin: 0,
    });
    // city (serif, big)
    slide.addText(r[1], {
      x: 11.67, y: yCity, w: 4.6, h: 0.71,
      fontFace: HEAD, fontSize: 32, color: INK,
      align: "left", valign: "middle", margin: 0,
    });
    // subtitle (right)
    slide.addText(r[2], {
      x: 15.3, y: ySub, w: 3.75, h: 0.33,
      fontFace: SANS, fontSize: 12, color: SUBINK,
      charSpacing: 2.88, align: "right", valign: "middle", margin: 0,
    });
    hrule(slide, 10.52, yRule, 8.44);
  });

  footer(slide, 2);
}

// =========================================================
// SLIDES 3-7 — City spreads (one factory)
// =========================================================
function citySlide({ page, bg, isDark, no, city, subtitle, est, body, facts, pizzaSvg, picY, picH }) {
  const slide = pres.addSlide();
  slide.background = { color: bg };

  const ink       = isDark ? CREAM_ON_DARK_TEXT : INK;
  const subInk    = isDark ? CREAM_ON_DARK_SUB  : SUBINK;
  const mutedInk  = isDark ? CREAM_ON_DARK_SUB  : MUTED;

  topBar(slide, `NO. ${no} · ${city.toUpperCase()}`, subtitle, subInk);

  // Established line (accent red on both light & dark)
  slide.addText(est, {
    x: 1.04, y: 1.19, w: 9.53, h: 0.38,
    fontFace: SANS, fontSize: 13, color: ACCENT,
    charSpacing: 3.9, align: "left", valign: "middle", margin: 0,
  });

  // Display city name (with period)
  slide.addText(`${city}.`, {
    x: 1.04, y: 1.71, w: 9.53, h: 1.45,
    fontFace: HEAD, fontSize: 90, charSpacing: -3.37,
    color: ink, align: "left", valign: "top", margin: 0,
  });

  // Body paragraph
  slide.addText(body, {
    x: 1.04, y: 5.29, w: 7.51, h: 2.0,
    fontFace: HEAD, fontSize: 20, color: ink,
    align: "left", valign: "top", margin: 0,
  });

  // Facts row
  cityFacts(slide, 9.29, facts, mutedInk, ink);

  // Pizza illustration (right)
  slide.addImage({
    data: svgData(pizzaSvg),
    x: 10.92, y: picY, w: 8.04, h: picH,
  });

  footer(slide, page, subInk);
}

// Slide 3 — New York
citySlide({
  page: 3, bg: BG_CREAM, isDark: false,
  no: "01", city: "New York", subtitle: "THIN & FOLDABLE",
  est: "EST. 1905 · LOMBARDI'S",
  body: "A wide, thin hand-tossed round — crisp at the rim, pliant at the tip. Sold by the slice, eaten on the fold.",
  facts: [["CRUST", "Thin, hand-tossed"], ["CHEESE", "Low-moisture mozzarella"], ["SIGNATURE", "The fold"]],
  pizzaSvg: svgNYPizza(),
  picY: 1.97, picH: 8.04,
});

// Slide 4 — Chicago
citySlide({
  page: 4, bg: BG_TAN, isDark: false,
  no: "02", city: "Chicago", subtitle: "DEEP DISH",
  est: "EST. 1943 · PIZZERIA UNO",
  body: "Buttery high-walled crust, mozzarella below, chunked tomato above. A pie you eat with a knife and a fork.",
  facts: [["CRUST", "Deep pan, buttery"], ["BUILD", "Cheese under sauce"], ["SIGNATURE", "The wall"]],
  pizzaSvg: svgChicagoPizza(),
  picY: 2.62, picH: 6.73,
});

// Slide 5 — Detroit
citySlide({
  page: 5, bg: BG_CREAM, isDark: false,
  no: "03", city: "Detroit", subtitle: "SQUARE, CRISPY EDGE",
  est: "EST. 1946 · BUDDY'S",
  body: "Baked in a blue-steel auto pan. Cheese pushed to the rim, caramelized into a lacquered frame around the slice.",
  facts: [["CRUST", "Airy, square"], ["CHEESE", "Wisconsin brick"], ["SIGNATURE", "Frico edge"]],
  pizzaSvg: svgDetroitPizza(),
  picY: 1.97, picH: 8.04,
});

// Slide 6 — New Haven (dark)
citySlide({
  page: 6, bg: BG_DARK, isDark: true,
  no: "04", city: "New Haven", subtitle: "COAL-FIRED APIZZA",
  est: "EST. 1925 · FRANK PEPE",
  body: "Pulled irregular from an 800° coal oven. Charred, oblong, and famously cheeseless — the plain \u201Ctomato pie.\u201D",
  facts: [["CRUST", "Charred, oblong"], ["CHEESE", "None, by default"], ["SIGNATURE", "White clam"]],
  pizzaSvg: svgNewHavenPizza(),
  picY: 1.97, picH: 8.04,
});

// Slide 7 — St. Louis
citySlide({
  page: 7, bg: BG_CREAM, isDark: false,
  no: "05", city: "St. Louis", subtitle: "CRACKER THIN",
  est: "EST. 1945 · IMO'S",
  body: "Unleavened, wafer-thin, cut into squares. Topped with Provel — a proprietary melt of cheddar, Swiss, and provolone.",
  facts: [["CRUST", "Cracker, yeastless"], ["CHEESE", "Provel"], ["SIGNATURE", "Party cut"]],
  pizzaSvg: svgStLouisPizza(),
  picY: 1.97, picH: 8.04,
});

// =========================================================
// SLIDE 8 — Summary "at a glance" table
// =========================================================
{
  const slide = pres.addSlide();
  slide.background = { color: BG_CREAM };

  topBar(slide, "SUMMARY", "AT A GLANCE");

  // Left editorial lockup
  slide.addText(
    [
      { text: "Five specimens, ", options: { color: INK, breakLine: true } },
      { text: "side by side.",    options: { color: ACCENT, italic: true } },
    ],
    {
      x: 1.04, y: 4.24, w: 7.04, h: 1.95,
      fontFace: HEAD, fontSize: 58, charSpacing: -2.16,
      align: "left", valign: "top", margin: 0,
    }
  );
  slide.addText(
    "Shape, crust, cheese, and the one thing each city refuses to compromise on.",
    {
      x: 1.04, y: 6.56, w: 5.58, h: 1.12,
      fontFace: HEAD, fontSize: 15, color: SUBINK,
      align: "left", valign: "top", margin: 0,
    }
  );

  // Table — 5 columns × (header + 5 rows). Layout mirrors source coordinates.
  const colX = [8.71, 11.58, 13.42, 15.68, 17.52];
  const colW = [2.87,  1.84,  2.25,  1.84,  1.43];
  const headers = ["STYLE", "SHAPE", "CRUST", "CHEESE", "SIGNATURE"];
  const rowY = [4.13, 5.12, 6.11, 7.11, 8.10];   // data row tops
  const ruleY = [3.91, 4.91, 5.90, 6.89, 7.88, 8.87];

  // Header labels
  headers.forEach((h, i) => {
    slide.addText(h, {
      x: colX[i] + 0.14, y: 3.40, w: colW[i] - 0.14, h: 0.35,
      fontFace: SANS, fontSize: 12, color: MUTED,
      charSpacing: 3.6, align: "left", valign: "middle", margin: 0,
    });
  });
  // Horizontal rules
  ruleY.forEach(y => {
    for (let i = 0; i < 5; i++) hrule(slide, colX[i], y, colW[i]);
  });

  // Data rows
  const rows = [
    { name: "New York",   icon: svgIconNY(),       cells: ["Round, wide",       "Thin, hand-tossed",    "Low-moist. mozz",    "The fold"   ] },
    { name: "Chicago",    icon: svgIconChicago(),  cells: ["Round, deep",       "Buttery pan",          "Mozz under sauce",   "The wall"   ] },
    { name: "Detroit",    icon: svgIconDetroit(),  cells: ["Square, pan",       "Airy, focaccia-like",  "Wisconsin brick",    "Frico edge" ] },
    { name: "New Haven",  icon: svgIconNewHaven(), cells: ["Irregular oval",    "Coal-fired, charred",  "None (tomato pie)",  "White clam" ] },
    { name: "St. Louis",  icon: svgIconStLouis(),  cells: ["Round, square-cut", "Cracker thin",         "Provel",             "Party cut"  ] },
  ];

  rows.forEach((r, i) => {
    const y = rowY[i];
    // Icon in first column
    slide.addImage({
      data: svgData(r.icon),
      x: 8.85, y: y + 0.06, w: 0.46, h: 0.46,
    });
    // City name
    slide.addText(r.name, {
      x: 9.48, y, w: colW[0] - 0.77, h: 0.47,
      fontFace: HEAD, fontSize: 18, color: INK,
      align: "left", valign: "middle", margin: 0,
    });
    // Remaining four cells
    r.cells.forEach((v, ci) => {
      slide.addText(v, {
        x: colX[ci + 1] + 0.14, y, w: colW[ci + 1] - 0.14, h: 0.61,
        fontFace: HEAD, fontSize: 12, color: INK,
        align: "left", valign: "middle", margin: 0,
      });
    });
  });

  footer(slide, 8);
}

// ---------- Write ----------
pres.writeFile({ fileName: "Pizza.pptx" }).then(f => console.log("Wrote:", f));
