// recreate_comedy.js
// Recreates comedy.pptx using pptxgenjs.
// Slide size: 20" x 11.25"
// Palette:
//   Cream BG     F4E9D8
//   Dark BG      1A1714
//   Card cream   EFE0C7
//   Orange       C2410C (accent)
//   Orange (2)   D97757 (on dark BG)
//   Orange (3)   B2462B (subdued)
//   Muted        6B6258
//   Muted (dark) BBA98F (on dark BG)
//   White        FFFFFF

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.title = "The Craft of Writing Jokes";
pres.author = "A Talk on Comedy";

// Custom layout to match original: 20" x 11.25"
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";

// Palette
const C = {
  cream: "F4E9D8",
  dark: "1A1714",
  cardCream: "EFE0C7",
  orange: "C2410C",
  orange2: "D97757",
  orange3: "B2462B",
  muted: "6B6258",
  mutedDark: "BBA98F",
  white: "FFFFFF",
};

const FONT = "Arial";

// Helpers ---------------------------------------------------------------

// Eyebrow (top-left chapter label) & page counter (top-right)
function addHeader(slide, chapter, pageLabel, onDark = false) {
  const col = onDark ? C.mutedDark : C.muted;
  slide.addText(chapter, {
    x: 1.0417, y: 1.0417, w: 8, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: col,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  slide.addText(pageLabel, {
    x: 17.9487, y: 1.0417, w: 1.1, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: col,
    charSpacing: 2.5, align: "left", margin: 0,
  });
}

// Footer (page number bottom-left, chapter name bottom-right)
function addFooter(slide, pageNum, chapterName, rightX, rightW) {
  slide.addText(pageNum, {
    x: 1.0417, y: 10.4219, w: 0.5, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 2.2, align: "left", margin: 0,
  });
  slide.addText(chapterName, {
    x: rightX, y: 10.4219, w: rightW, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 3.2, align: "left", margin: 0,
  });
}

// Short black rule + uppercase eyebrow (section label below main heading)
function addRuleAndLabel(slide, label, y = 3.1031) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 3.2359, w: 1.0, h: 0.0208,
    fill: { color: C.dark }, line: { type: "none" },
  });
  slide.addText(label, {
    x: 2.2292, y, w: 10, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 2.9, align: "left", margin: 0,
  });
}

// Big H1 heading with italic orange highlighted runs
function addHeading(slide, runs) {
  const arr = runs.map((r, i) => ({
    text: r.text,
    options: {
      fontFace: FONT, fontSize: 58.5,
      color: r.color || C.dark,
      italic: !!r.italic,
      charSpacing: -0.9,
      breakLine: i === runs.length - 1 ? false : false,
    },
  }));
  slide.addText(arr, {
    x: 1.0417, y: 1.9115, w: 18.4542, h: 1.2,
    align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0,
  });
}

// ======================================================================
// SLIDE 1 — Title
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };

  s.addText("A TALK ON COMEDY · NO. 01", {
    x: 1.0417, y: 1.0417, w: 6, h: 0.3646,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("TEN MINUTES FOR WRITERS READ ALOUD", {
    x: 13.5, y: 1.0417, w: 5.458, h: 0.36,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 2.5, align: "right", margin: 0,
  });

  // Small black rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 6.7129, w: 1.0, h: 0.0208,
    fill: { color: C.dark }, line: { type: "none" },
  });
  s.addText("VOLUME I · THE JOKE", {
    x: 2.2292, y: 6.5801, w: 4.5, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 3.2, align: "left", margin: 0,
  });

  // Huge main title
  s.addText([
    { text: "The Craft of Writing ", options: { color: C.dark, charSpacing: -1.8 } },
    { text: "Jokes", options: { color: C.orange, italic: true, charSpacing: -1.8 } },
    { text: ".", options: { color: C.dark, charSpacing: -1.8 } },
  ], {
    x: 1.0417, y: 7.0, w: 18.4542, h: 2.8,
    fontFace: FONT, fontSize: 81,
    align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0,
  });

  s.addText("— a short field guide for people still learning the trade.", {
    x: 1.0417, y: 10.0833, w: 12, h: 0.4,
    fontFace: FONT, fontSize: 24, color: C.dark, italic: true,
    align: "left", margin: 0,
  });
  s.addText("001 / 010", {
    x: 17.6895, y: 10.0781, w: 1.5, h: 0.38,
    fontFace: FONT, fontSize: 21, color: C.muted,
    charSpacing: 0.4, align: "left", margin: 0,
  });
}

// ======================================================================
// SLIDE 2 — Definitions: Two halves, one trick
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 01 · DEFINITIONS", "02 / 10");

  addHeading(s, [
    { text: "What a joke " },
    { text: "actually ", color: C.orange, italic: true },
    { text: "is." },
  ]);
  addRuleAndLabel(s, "TWO HALVES, ONE TRICK");

  // Column 1
  s.addText("HALF ONE", {
    x: 1.0417, y: 3.9312, w: 8.7979, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("A joke builds a small, ordinary world and convinces you the rules are steady.", {
    x: 1.0417, y: 4.426, w: 8.7979, h: 1.3,
    fontFace: FONT, fontSize: 30, color: C.dark,
    align: "left", margin: 0, valign: "top",
  });

  // Column 2
  s.addText("HALF TWO", {
    x: 10.4167, y: 3.9312, w: 8.7979, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("Then, on the last beat, it swaps a rule for one you didn't see coming — and your brain rewards the swap with a laugh.", {
    x: 10.4167, y: 4.426, w: 8.7979, h: 2.0,
    fontFace: FONT, fontSize: 30, color: C.dark,
    align: "left", margin: 0, valign: "top",
  });

  addFooter(s, "02", "DEFINITIONS", 16.8799, 2.3);
}

// ======================================================================
// SLIDE 3 — Structure: Setup / Turn (two cards)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 02 · STRUCTURE", "03 / 10");

  addHeading(s, [
    { text: "Every joke has two moves: " },
    { text: "setup ", color: C.orange, italic: true },
    { text: "and " },
    { text: "turn", color: C.orange, italic: true },
    { text: "." },
  ]);
  addRuleAndLabel(s, "THE WHOLE MACHINE, SIMPLIFIED");

  // LEFT card — cream
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 3.9312, w: 8.3333, h: 6.4854,
    fill: { color: C.cardCream }, line: { type: "none" },
  });
  s.addText("01 · SETUP", {
    x: 1.5, y: 4.3896, w: 7.64, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.9, align: "left", margin: 0,
  });
  s.addText("Build the world.", {
    x: 1.5, y: 4.85, w: 7.64, h: 0.9,
    fontFace: FONT, fontSize: 48, color: C.dark,
    charSpacing: -0.5, align: "left", margin: 0, valign: "top",
  });
  s.addText("Plant an expectation. Use the fewest words you can. Every line is rent you pay before the laugh.", {
    x: 1.5, y: 9.05, w: 7.64, h: 1.1,
    fontFace: FONT, fontSize: 21, color: C.muted,
    align: "left", margin: 0, valign: "top",
  });

  // "then —" between cards
  s.addText("then —", {
    x: 9.3333, y: 3.9312, w: 1.3333, h: 6.5271,
    fontFace: FONT, fontSize: 30, color: C.orange, italic: true,
    align: "center", valign: "middle", margin: 0,
  });

  // RIGHT card — dark
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.625, y: 3.9312, w: 8.3333, h: 6.4854,
    fill: { color: C.dark }, line: { type: "none" },
  });
  s.addText("02 · TURN", {
    x: 11.0833, y: 4.3896, w: 7.64, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange2,
    charSpacing: 2.9, align: "left", margin: 0,
  });
  s.addText("Break the world.", {
    x: 11.0833, y: 4.85, w: 7.64, h: 0.9,
    fontFace: FONT, fontSize: 48, color: C.cream,
    charSpacing: -0.5, align: "left", margin: 0, valign: "top",
  });
  s.addText("Replace the expected thing with a second, truer thing. The surprise is the mechanism; the recognition is the reward.", {
    x: 11.0833, y: 8.65, w: 7.64, h: 1.5,
    fontFace: FONT, fontSize: 21, color: C.mutedDark,
    align: "left", margin: 0, valign: "top",
  });

  addFooter(s, "03", "STRUCTURE", 17.0116, 2.3);
}

// ======================================================================
// SLIDE 4 — Pull Quote (Pryor)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Header (darker palette)
  s.addText("CH. 02 · STRUCTURE", {
    x: 1.0417, y: 1.0417, w: 6, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.mutedDark,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("04 / 10", {
    x: 17.9487, y: 1.0417, w: 1.1, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.mutedDark,
    charSpacing: 2.5, align: "left", margin: 0,
  });

  // Big quote — oversized opening curly quote + body
  s.addText([
    { text: "\u201C ", options: { color: C.orange2, italic: true, fontSize: 105 } },
    { text: "There's a thin line between to laugh with and to laugh at.", options: { color: C.cream, fontSize: 72 } },
  ], {
    x: 1.0417, y: 4.3, w: 17.0, h: 3.5,
    fontFace: FONT, align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0,
  });

  s.addText("— RICHARD PRYOR", {
    x: 1.0417, y: 10.1042, w: 18.4542, h: 0.4,
    fontFace: FONT, fontSize: 19.5, color: C.orange2,
    charSpacing: 2.5, align: "left", margin: 0,
  });
}

// ======================================================================
// SLIDE 5 — Techniques: Specificity (vague vs specific)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 03 · TECHNIQUES", "05 / 10");

  addHeading(s, [
    { text: "Specificity is almost always " },
    { text: "funnier", color: C.orange, italic: true },
    { text: "." },
  ]);
  addRuleAndLabel(s, "NOUNS DO THE WORK");

  // LEFT column: × VAGUE
  s.addText("× VAGUE", {
    x: 1.0417, y: 3.9312, w: 9.0125, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.muted,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 4.4677, w: 8.75, h: 1.3125,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText("\u201CMy uncle drives a bad car.\u201D", {
    x: 1.4688, y: 4.55, w: 8.16, h: 1.15,
    fontFace: FONT, fontSize: 30, color: C.dark,
    align: "left", margin: 0, valign: "middle",
  });
  s.addText("Generic nouns and adjectives. The listener has to do the imagining, and they won't bother.", {
    x: 1.0417, y: 6.0302, w: 9.0125, h: 0.9,
    fontFace: FONT, fontSize: 19.5, color: C.muted,
    align: "left", margin: 0, valign: "top",
  });

  // RIGHT column: → SPECIFIC
  s.addText("\u2192 SPECIFIC", {
    x: 10.2083, y: 3.9312, w: 9.0125, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.2083, y: 4.4677, w: 8.75, h: 2.4792,
    fill: { color: C.white }, line: { type: "none" },
  });
  s.addText([
    { text: "\u201CMy uncle drives a 1997 Chevy Astro with a bumper sticker that says ", options: { color: C.dark } },
    { text: "Honk if you love Jesus, text if you want to meet Him.", options: { color: C.dark, italic: true } },
    { text: "\u201D", options: { color: C.dark } },
  ], {
    x: 10.6354, y: 4.75, w: 8.16, h: 2.1,
    fontFace: FONT, fontSize: 30,
    align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0,
  });
  s.addText("Proper nouns, numbers, and a visible detail. You can see it — and seeing is laughing.", {
    x: 10.2083, y: 7.1969, w: 9.0125, h: 0.9,
    fontFace: FONT, fontSize: 19.5, color: C.muted,
    align: "left", margin: 0, valign: "top",
  });

  addFooter(s, "05", "TECHNIQUES", 16.8692, 2.3);
}

// ======================================================================
// SLIDE 6 — Techniques: Rule of three (big "3")
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 03 · TECHNIQUES", "06 / 10");

  addHeading(s, [
    { text: "The rule of " },
    { text: "three", color: C.orange, italic: true },
    { text: "." },
  ]);
  addRuleAndLabel(s, "TWO TO ESTABLISH, ONE TO BREAK");

  // Giant "3"
  s.addText("3", {
    x: 1.0417, y: 4.2, w: 5.58, h: 5.0,
    fontFace: FONT, fontSize: 360, color: C.orange, italic: true,
    align: "left", margin: 0, valign: "top",
  });

  // Right-side paragraph
  s.addText("The first two items in a list teach the audience the pattern. The third one betrays it. Two is not enough to set a rhythm; four is one beat too long.", {
    x: 7.2917, y: 5.0658, w: 12.0167, h: 1.7,
    fontFace: FONT, fontSize: 27, color: C.dark,
    align: "left", margin: 0, valign: "top",
  });

  // Left orange rule for the quote block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.2917, y: 6.9176, w: 0.0312, h: 1.4,
    fill: { color: C.orange }, line: { type: "none" },
  });
  s.addText("I want three things in a partner: kindness,", {
    x: 7.5729, y: 6.9176, w: 11.727, h: 0.5083,
    fontFace: FONT, fontSize: 24, color: C.dark, italic: true,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("curiosity,", {
    x: 7.5729, y: 7.3843, w: 11.727, h: 0.5083,
    fontFace: FONT, fontSize: 24, color: C.dark, italic: true,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("and a laminated copy of their credit report.", {
    x: 7.5729, y: 7.8509, w: 11.727, h: 0.5083,
    fontFace: FONT, fontSize: 24, color: C.orange,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("Beats 1 and 2 feel earnest. Beat 3 turns the frame inside out. That's the whole trick.", {
    x: 7.2917, y: 8.6509, w: 12.0167, h: 0.5,
    fontFace: FONT, fontSize: 21, color: C.muted,
    align: "left", margin: 0, valign: "top",
  });

  addFooter(s, "06", "TECHNIQUES", 16.8692, 2.3);
}

// ======================================================================
// SLIDE 7 — Techniques: Economy (before/after)
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 03 · TECHNIQUES", "07 / 10");

  addHeading(s, [
    { text: "Cut every word that isn't " },
    { text: "load-bearing", color: C.orange, italic: true },
    { text: "." },
  ]);
  addRuleAndLabel(s, "ECONOMY · THE RUTHLESS PASS");

  // LEFT — BEFORE (cream card)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0417, y: 3.9312, w: 8.75, h: 6.4854,
    fill: { color: C.cardCream }, line: { type: "none" },
  });
  s.addText("BEFORE · 29 WORDS", {
    x: 1.5, y: 4.3479, w: 8.0683, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText([
    { text: "So, the other day, I was actually walking into my kitchen, you know, and I basically realized that I have been ", options: { color: C.dark } },
    { text: "slowly ", options: { color: C.orange3 } },
    { text: "turning into my father, which is ", options: { color: C.dark } },
    { text: "honestly ", options: { color: C.orange3 } },
    { text: "terrifying.", options: { color: C.dark } },
  ], {
    x: 1.5, y: 4.8844, w: 8.0683, h: 4.3,
    fontFace: FONT, fontSize: 25.5,
    align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0,
  });
  s.addText("Throat-clearing. Hedging. Stage directions the ear can't see.", {
    x: 1.5, y: 9.4271, w: 8.0683, h: 0.7,
    fontFace: FONT, fontSize: 18, color: C.muted,
    align: "left", margin: 0, valign: "top",
  });

  // RIGHT — AFTER (dark card)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.2083, y: 3.9312, w: 8.75, h: 6.4854,
    fill: { color: C.dark }, line: { type: "none" },
  });
  s.addText("AFTER · 11 WORDS", {
    x: 10.6667, y: 4.3479, w: 8.0683, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.orange2,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("I walked into my kitchen and realized I'm turning into my father.", {
    x: 10.6667, y: 4.8844, w: 8.0683, h: 2.5,
    fontFace: FONT, fontSize: 25.5, color: C.cream,
    align: "left", margin: 0, valign: "top",
  });
  s.addText("Same premise. Faster trigger. 62% shorter path to the laugh.", {
    x: 10.6667, y: 9.4271, w: 8.0683, h: 0.7,
    fontFace: FONT, fontSize: 18, color: C.mutedDark,
    align: "left", margin: 0, valign: "top",
  });

  addFooter(s, "07", "TECHNIQUES", 16.8692, 2.3);
}

// ======================================================================
// SLIDE 8 — Voice: Three questions
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 04 · VOICE", "08 / 10");

  addHeading(s, [
    { text: "Voice is what's left after you stop " },
    { text: "imitating", color: C.orange, italic: true },
    { text: "." },
  ]);
  addRuleAndLabel(s, "ASK YOURSELF, IN PRIVATE");

  const colInfo = [
    { x: 1.0417, num: "01", q: "What makes me laugh when nobody's watching?", a: "Not what's hip. Not what's safe. The thing you text your funniest friend at 1 a.m." },
    { x: 7.1528, num: "02", q: "What do I notice that other people don't?", a: "Voice lives in observations only you would think to write down. Collect them in a notebook, seriously." },
    { x: 13.2638, num: "03", q: "What am I quietly embarrassed about?", a: "The stuff you think disqualifies you is usually the material. It's also where the audience recognizes themselves." },
  ];
  for (const col of colInfo) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 3.9312, w: 5.6944, h: 0.0208,
      fill: { color: C.dark }, line: { type: "none" },
    });
    s.addText(col.num, {
      x: col.x + 0.375, y: 4.3271, w: 5.0, h: 0.36,
      fontFace: FONT, fontSize: 18, color: C.orange,
      charSpacing: 2.5, align: "left", margin: 0,
    });
    s.addText(col.q, {
      x: col.x + 0.375, y: 4.8375, w: 5.09, h: 3.9,
      fontFace: FONT, fontSize: 30, color: C.dark, italic: true,
      align: "left", margin: 0, valign: "top",
    });
    s.addText(col.a, {
      x: col.x + 0.375, y: 8.8625, w: 5.09, h: 1.5,
      fontFace: FONT, fontSize: 19.5, color: C.muted,
      align: "left", margin: 0, valign: "top",
    });
  }

  addFooter(s, "08", "VOICE", 17.9553, 1.5);
}

// ======================================================================
// SLIDE 9 — The Real Work: 17× and rewrite list
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  addHeader(s, "CH. 05 · THE REAL WORK", "09 / 10");

  addHeading(s, [
    { text: "Rewriting is where the " },
    { text: "joke ", color: C.orange, italic: true },
    { text: "is actually written." },
  ]);
  addRuleAndLabel(s, "FIRST DRAFTS ARE DIAGNOSTIC, NOT FINAL");

  // Huge "17×"
  s.addText("17\u00D7", {
    x: 1.0417, y: 3.8896, w: 8.91, h: 2.0,
    fontFace: FONT, fontSize: 120, color: C.orange,
    align: "left", margin: 0, valign: "top",
  });

  s.addText("A reasonable number of times to rewrite a premise you believe in before you retire it. Most of yours haven't failed — they've been drafted once.", {
    x: 1.0417, y: 6.2, w: 5.8, h: 3.0,
    fontFace: FONT, fontSize: 22.5, color: C.dark,
    align: "left", margin: 0, valign: "top",
  });

  // Right-side list (5 paragraphs, NOT bullets)
  s.addText([
    { text: "Read the joke aloud. If you stumble, the sentence is wrong, not you.", options: { breakLine: true } },
    { text: "Move the punchword to the end. Always.", options: { breakLine: true } },
    { text: "Replace any word you could find in a press release.", options: { breakLine: true } },
    { text: "Try the joke's opposite; sometimes the premise is inside out.", options: { breakLine: true } },
    { text: "If it still doesn't land after five tries, change who is talking — not what they're saying." },
  ], {
    x: 10.0792, y: 3.8896, w: 8.9625, h: 5.5,
    fontFace: FONT, fontSize: 24, color: C.dark,
    align: "left", margin: 0, valign: "top",
    paraSpaceAfter: 8,
  });

  addFooter(s, "09", "PRACTICE", 17.3342, 2.0);
}

// ======================================================================
// SLIDE 10 — CODA: "Go write a bad joke."
// ======================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addText("CODA", {
    x: 1.0417, y: 1.0417, w: 2, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.mutedDark,
    charSpacing: 2.5, align: "left", margin: 0,
  });
  s.addText("10 / 10", {
    x: 17.9487, y: 1.0417, w: 1.1, h: 0.3281,
    fontFace: FONT, fontSize: 18, color: C.mutedDark,
    charSpacing: 2.5, align: "left", margin: 0,
  });

  // Oversized title — sized so it fits on one line inside 18.45"
  s.addText([
    { text: "Go write a ", options: { color: C.cream } },
    { text: "bad joke.", options: { color: C.orange, italic: true } },
  ], {
    x: 1.0417, y: 3.3798, w: 18.4542, h: 4.2,
    fontFace: FONT, fontSize: 115,
    align: "left", margin: 0, valign: "top",
    paraSpaceBefore: 0, paraSpaceAfter: 0, charSpacing: -2,
  });

  s.addText("Then write a better one. Then a worse one. The only way out of being unfunny on the page is through a very long stack of pages. Start today. Start badly. Start.", {
    x: 1.0417, y: 9.0356, w: 11, h: 1.8,
    fontFace: FONT, fontSize: 25.5, color: C.muted, italic: true,
    align: "left", margin: 0, valign: "top",
  });

  s.addText("— END OF TALK", {
    x: 15.9, y: 9.6406, w: 3.1, h: 0.4,
    fontFace: FONT, fontSize: 19.5, color: C.orange2,
    charSpacing: 2.5, align: "right", margin: 0,
  });
  s.addText("010 / 010", {
    x: 15.9, y: 10.0781, w: 3.1, h: 0.4,
    fontFace: FONT, fontSize: 21, color: C.mutedDark,
    charSpacing: 0.4, align: "right", margin: 0,
  });
}

// ======================================================================
pres.writeFile({ fileName: "comedy_recreated.pptx" })
  .then(fn => console.log("Wrote:", fn));
