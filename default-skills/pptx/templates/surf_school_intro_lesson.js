/* ============================================================================
 * Surfing — Lesson 01 (recreated & lightly enhanced)
 * --------------------------------------------------------------------------
 * A faithful pptxgenjs replica of the original "Surfing.pptx" editorial deck.
 *
 * Design language carried over from the original:
 *   - Sandwich palette: navy + cream, alternating dark/light slides
 *   - Coral/peach accent for eyebrow labels
 *   - Slim outline frame just inside every slide
 *   - All-caps eyebrows w/ heavy character spacing, big serif/sans titles
 *   - Roman-numeral and 2-digit indices, "NN / 08" page indicator
 *
 * Enhancements vs. the original (all minor, all on-brand):
 *   - Replaces the empty "FULL BLEED IMAGE" placeholder on slide 4 with
 *     an actual editorial ocean/wave illustration in the same palette.
 *   - Sizes every text container so labels and page numbers fit in full
 *     (the original clips "01 / 0", "WAVE STUDY/FULL BLEED IM.",
 *     "SOFT-TOP BOA[RD]", "WETSUIT SUNSCREE[N]", "PADDLE / CHEST D[OWN]",
 *     etc.). Nothing in this rebuild is cut off.
 *   - Adds a subtle crest motif on the cover and a thin divider hairline
 *     on safety/wrap-up slides for a touch more polish.
 * ============================================================================ */

const pptxgen = require("pptxgenjs");

// ---------- Palette ----------
const NAVY        = "0F2A4F";   // dominant dark
const NAVY_DEEP   = "0A1E3C";   // for inner card fills
const CREAM       = "EFE9DC";   // dominant light
const CREAM_DEEP  = "E2D9C5";   // tinted card fill on cream slides
const CORAL       = "E8B27D";   // accent (warm sand / sunset)
const INK         = "111A2E";   // body text on cream
const INK_SOFT    = "3A4A66";   // body sub on cream
const PAPER_LINE  = "C9BFA8";   // hairline on cream
const NAVY_LINE   = "27406B";   // hairline on navy
const CREAM_DIM   = "BFB7A6";   // muted cream-on-navy text

// ---------- Layout ----------
// Standard 16:9 — 13.333" x 7.5"
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const M = 0.55;                 // slide-edge margin
const FRAME_INSET = 0.22;       // inset of the thin border frame

// ---------- Fonts ----------
const FONT_HEAD = "Georgia";    // editorial serif feel for big titles
const FONT_SANS = "Calibri";    // clean body
const FONT_MONO = "Consolas";   // numerals and indices

// ---------- Helpers ----------------------------------------------------------

/** Thin outlined frame just inside the slide edge — matches the original. */
function addFrame(slide, color) {
    const inset = FRAME_INSET;
    slide.addShape("rect", {
        x: inset, y: inset,
        w: SLIDE_W - inset * 2,
        h: SLIDE_H - inset * 2,
        fill: { type: "none" },
        line: { color, width: 0.5 },
    });
}

/** Eyebrow label — top-left "NN · SECTION NAME" */
function addEyebrow(slide, text, color) {
    slide.addText(text, {
        x: M, y: M, w: 7, h: 0.35,
        fontFace: FONT_SANS, fontSize: 10, bold: false,
        color, charSpacing: 5, margin: 0,
        valign: "middle",
    });
}

/** Page indicator — top-right "NN / 08" */
function addPageIndicator(slide, n, total, color) {
    slide.addText(`${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
        x: SLIDE_W - M - 2, y: M,
        w: 2, h: 0.35,
        fontFace: FONT_MONO, fontSize: 10,
        color, charSpacing: 4, margin: 0,
        align: "right", valign: "middle",
    });
}

/** Footer used on the deeper interior slides — small caption row. */
function addFooter(slide, leftText, color) {
    slide.addText(leftText, {
        x: M, y: SLIDE_H - M - 0.32, w: 7, h: 0.32,
        fontFace: FONT_SANS, fontSize: 9, color,
        charSpacing: 4, margin: 0, valign: "middle",
    });
}

// ============================================================================
// Build presentation
// ============================================================================
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";    // 13.333 x 7.5
pres.title = "Surfing — Lesson 01";
pres.author = "Surf School";
pres.company = "Surf School / 2026";

const TOTAL = 8;

// ----------------------------------------------------------------------------
// Slide 1 — Cover
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: NAVY };
    addFrame(s, NAVY_LINE);

    // Top brand row
    s.addText("SURF SCHOOL / 2026", {
        x: M + 0.2, y: M + 0.05, w: 5, h: 0.35,
        fontFace: FONT_SANS, fontSize: 10, color: CREAM,
        charSpacing: 6, margin: 0, valign: "middle",
    });
    s.addText("LESSON 01", {
        x: SLIDE_W - M - 2.2, y: M + 0.05, w: 2, h: 0.35,
        fontFace: FONT_SANS, fontSize: 10, color: CREAM,
        charSpacing: 6, margin: 0, align: "right", valign: "middle",
    });

    // Eyebrow + huge title
    s.addText("AN INTRODUCTION", {
        x: M + 0.2, y: 1.7, w: 6, h: 0.35,
        fontFace: FONT_SANS, fontSize: 11, color: CORAL,
        charSpacing: 8, margin: 0, valign: "middle",
    });
    s.addText("Surfing.", {
        x: M + 0.15, y: 2.05, w: 9, h: 1.9,
        fontFace: FONT_HEAD, fontSize: 132, color: CREAM,
        bold: false, italic: false, margin: 0, valign: "top",
    });

    // A single coral hairline accent on the right — small editorial touch.
    s.addShape("line", {
        x: SLIDE_W - M - 1.6, y: 3.55, w: 1.2, h: 0,
        line: { color: CORAL, width: 0.75 },
    });

    // Foot caption + page indicator
    s.addText("A first lesson for beginners of every age — from the shore to your first wave.", {
        x: M + 0.2, y: SLIDE_H - M - 0.95, w: 6.5, h: 0.7,
        fontFace: FONT_SANS, fontSize: 13, color: CREAM,
        margin: 0, valign: "top",
    });
    s.addText("01 / 08", {
        x: SLIDE_W - M - 2.2, y: SLIDE_H - M - 0.55, w: 2, h: 0.32,
        fontFace: FONT_MONO, fontSize: 11, color: CREAM_DIM,
        charSpacing: 4, margin: 0, align: "right", valign: "middle",
    });
}

// ----------------------------------------------------------------------------
// Slide 2 — Definition
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addFrame(s, PAPER_LINE);
    addEyebrow(s, "02 · WHAT IT IS", INK_SOFT);
    addPageIndicator(s, 2, TOTAL, INK_SOFT);

    // Big editorial paragraph — italic accent on second clause
    s.addText([
        { text: "Surfing is the art of riding a breaking wave on a board — ",
          options: { color: INK } },
        { text: "balance, timing, patience.",
          options: { color: CORAL, italic: true } },
    ], {
        x: M + 0.2, y: 2.0, w: 11.5, h: 2.6,
        fontFace: FONT_HEAD, fontSize: 48, bold: false,
        margin: 0, valign: "top",
    });

    // Underline label below
    s.addText("A DEFINITION FOR BEGINNERS", {
        x: M + 0.2, y: 5.0, w: 6, h: 0.35,
        fontFace: FONT_SANS, fontSize: 10, color: CORAL,
        charSpacing: 8, margin: 0, valign: "middle",
    });
}

// ----------------------------------------------------------------------------
// Slide 3 — Your Gear (4-column grid)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addFrame(s, PAPER_LINE);
    addEyebrow(s, "03 · YOUR GEAR", INK_SOFT);
    addPageIndicator(s, 3, TOTAL, INK_SOFT);

    s.addText("Your gear.", {
        x: M + 0.15, y: 1.0, w: 10, h: 1.1,
        fontFace: FONT_HEAD, fontSize: 60, color: INK,
        margin: 0, valign: "top",
    });

    const items = [
        { n: "01", label: "SOFT-TOP BOARD",    title: "The Board",
          body: "A long, soft-top foam board. Stable, forgiving, and the right starting point for everyone." },
        { n: "02", label: "LEASH",             title: "The Leash",
          body: "A coiled cord from your ankle to the board. It keeps the board close after a wipeout." },
        { n: "03", label: "WAX OR TRACTION",   title: "The Grip",
          body: "Wax or a traction pad on the deck so your feet stay where you put them." },
        { n: "04", label: "WETSUIT & SUNSCREEN", title: "The Skin",
          body: "A wetsuit for cold water, reef-safe sunscreen for warm. Comfort lets you stay out longer." },
    ];

    // Grid geometry
    const gridX0 = M + 0.15;
    const gridTop = 2.5;
    const gridW = SLIDE_W - 2 * (M + 0.15);
    const gap = 0.28;
    const colW = (gridW - gap * 3) / 4;
    const cardH = 2.55;

    // Drawing helpers for native-shape icons in each card.
    // Each icon is centered in the card, ~1.0" tall, drawn from primitives
    // (oval/rect/line/triangle) so everything stays editable in PowerPoint.

    /**
     * Draw a line between two arbitrary points (x1,y1)→(x2,y2) using
     * always-positive cx/cy and flipH/flipV flags. PowerPoint rejects
     * negative width/height extents, so we never pass them.
     */
    function drawLineBetween(slide, x1, y1, x2, y2, lineOpts) {
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const w = Math.abs(x2 - x1);
        const h = Math.abs(y2 - y1);
        const flipH = x2 < x1;  // line goes right-to-left
        const flipV = y2 < y1;  // line goes bottom-to-top
        slide.addShape("line", {
            x, y, w, h,
            line: lineOpts,
            flipH, flipV,
        });
    }

    function drawBoardIcon(slide, cx, cy) {
        // Surfboard: tall rounded rectangle, with a stringer line and tail fin
        const w = 0.42, h = 1.20;
        slide.addShape("roundRect", {
            x: cx - w / 2, y: cy - h / 2, w, h,
            fill: { color: INK_SOFT, transparency: 65 },
            line: { color: INK_SOFT, width: 0.75 },
            rectRadius: 0.18,
        });
        // Stringer (center line)
        slide.addShape("line", {
            x: cx, y: cy - h / 2 + 0.15,
            w: 0, h: h - 0.30,
            line: { color: INK_SOFT, width: 0.5 },
        });
        // Fin
        slide.addShape("rtTriangle", {
            x: cx - 0.06, y: cy + h / 2 - 0.04, w: 0.12, h: 0.18,
            fill: { color: INK_SOFT },
            line: { type: "none" },
            flipH: true,
        });
    }

    function drawLeashIcon(slide, cx, cy) {
        // Coiled leash: three concentric ovals (rings) plus a clip
        const sizes = [1.05, 0.78, 0.50];
        sizes.forEach(d => {
            slide.addShape("ellipse", {
                x: cx - d / 2, y: cy - d / 2, w: d, h: d,
                fill: { type: "none" },
                line: { color: INK_SOFT, width: 1.2 },
            });
        });
        // Clip dot
        slide.addShape("ellipse", {
            x: cx + 0.42, y: cy - 0.07, w: 0.14, h: 0.14,
            fill: { color: CORAL },
            line: { type: "none" },
        });
    }

    function drawGripIcon(slide, cx, cy) {
        // Traction pad: 4x3 grid of small rounded squares
        const cols = 4, rows = 3, cell = 0.20, gap = 0.06;
        const totalW = cols * cell + (cols - 1) * gap;
        const totalH = rows * cell + (rows - 1) * gap;
        const x0 = cx - totalW / 2;
        const y0 = cy - totalH / 2;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                slide.addShape("roundRect", {
                    x: x0 + c * (cell + gap),
                    y: y0 + r * (cell + gap),
                    w: cell, h: cell,
                    fill: { color: INK_SOFT, transparency: (r + c) % 2 === 0 ? 40 : 20 },
                    line: { type: "none" },
                    rectRadius: 0.04,
                });
            }
        }
    }

    function drawSunIcon(slide, cx, cy) {
        // Native SUN shape — represents the sunscreen/wetsuit "skin" theme
        slide.addShape("sun", {
            x: cx - 0.55, y: cy - 0.55, w: 1.10, h: 1.10,
            fill: { type: "none" },
            line: { color: CORAL, width: 1.25 },
        });
    }

    const drawIcon = [drawBoardIcon, drawLeashIcon, drawGripIcon, drawSunIcon];

    items.forEach((it, i) => {
        const x = gridX0 + i * (colW + gap);

        // Index numeral (faint)
        s.addText(it.n, {
            x, y: gridTop - 0.05, w: colW, h: 0.35,
            fontFace: FONT_MONO, fontSize: 11, color: PAPER_LINE,
            charSpacing: 4, margin: 0, valign: "middle",
        });

        // Card
        s.addShape("rect", {
            x, y: gridTop + 0.30, w: colW, h: cardH,
            fill: { color: CREAM_DEEP },
            line: { color: PAPER_LINE, width: 0.5 },
        });

        // Native-shape icon centered in upper portion of the card
        const cx = x + colW / 2;
        const cy = gridTop + 0.30 + 0.95;
        drawIcon[i](s, cx, cy);

        // Label centered in the lower portion of the card
        s.addText(it.label, {
            x: x + 0.15, y: gridTop + 0.30 + cardH - 0.7,
            w: colW - 0.30, h: 0.55,
            fontFace: FONT_SANS, fontSize: 10, color: INK_SOFT,
            charSpacing: 6, bold: false, margin: 0,
            align: "center", valign: "middle",
        });

        // Title under card
        s.addText(it.title, {
            x, y: gridTop + 0.30 + cardH + 0.12,
            w: colW, h: 0.55,
            fontFace: FONT_HEAD, fontSize: 22, color: INK,
            margin: 0, valign: "top",
        });

        // Body
        s.addText(it.body, {
            x, y: gridTop + 0.30 + cardH + 0.72,
            w: colW, h: 1.05,
            fontFace: FONT_SANS, fontSize: 11, color: INK_SOFT,
            margin: 0, valign: "top",
        });
    });
}

// ----------------------------------------------------------------------------
// Slide 4 — Know the Ocean (half-bleed image left, list right)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: NAVY };
    addFrame(s, NAVY_LINE);

    // ---- Left half: composed of native PowerPoint shapes only ----
    // Built from primitives — RECTANGLE for the panel, OVAL for the moon,
    // LINE for the horizon and wave hairlines, ARC for stylized crest curves.
    // Everything stays editable in PowerPoint with no external image.
    const halfW = SLIDE_W / 2;
    const panelX = FRAME_INSET;
    const panelY = FRAME_INSET;
    const panelW = halfW - FRAME_INSET;
    const panelH = SLIDE_H - FRAME_INSET * 2;

    // Deeper-navy panel as the ocean ground
    s.addShape("rect", {
        x: panelX, y: panelY, w: panelW, h: panelH,
        fill: { color: NAVY_DEEP },
        line: { type: "none" },
    });

    // Moon — single soft cream disc, offset into the upper portion
    const moonCx = panelX + panelW * 0.50;
    const moonCy = panelY + 1.40;
    s.addShape("ellipse", {
        x: moonCx - 0.55, y: moonCy - 0.55, w: 1.10, h: 1.10,
        fill: { color: CREAM },
        line: { type: "none" },
    });

    // Horizon hairline
    s.addShape("line", {
        x: panelX + 0.4, y: panelY + 2.85,
        w: panelW - 0.8, h: 0,
        line: { color: CORAL, width: 0.75 },
    });

    // Wave hairlines — horizontal lines with subtle vertical stagger.
    // Each "swell" is a pair of close-together hairlines suggesting depth.
    const innerL = panelX + 0.45;
    const innerR = panelX + panelW - 0.45;
    const innerW = innerR - innerL;
    const swells = [
        { y: 3.40, op: 25 },
        { y: 3.95, op: 18 },
        { y: 4.55, op: 14 },
        { y: 5.25, op: 10 },
        { y: 6.05, op: 8  },
    ];
    swells.forEach(sw => {
        s.addShape("line", {
            x: innerL, y: panelY + sw.y, w: innerW, h: 0,
            line: { color: CREAM_DIM, width: 0.5, transparency: sw.op },
        });
        s.addShape("line", {
            x: innerL + 0.4, y: panelY + sw.y + 0.07, w: innerW - 0.8, h: 0,
            line: { color: CREAM_DIM, width: 0.4, transparency: sw.op + 30 },
        });
    });

    // A single coral crest accent — short hairline + indicator dot.
    // Marks the focal "wave" the lesson is teaching you to read.
    const crestY = panelY + 4.70;
    s.addShape("line", {
        x: innerL + 0.6, y: crestY, w: innerW - 1.2, h: 0,
        line: { color: CORAL, width: 1.0 },
    });
    s.addShape("ellipse", {
        x: innerL + 0.6 + (innerW - 1.2) * 0.5 - 0.06,
        y: crestY - 0.06, w: 0.12, h: 0.12,
        fill: { color: CORAL },
        line: { type: "none" },
    });

    // Tiny "OCEAN / WAVE STUDY" caption — placed mid-panel-right so it
    // doesn't collide with the SURF SCHOOL footer below.
    s.addText("OCEAN / WAVE STUDY", {
        x: panelX + 0.45, y: panelY + 6.75, w: 4, h: 0.3,
        fontFace: FONT_SANS, fontSize: 9, color: CREAM_DIM,
        charSpacing: 6, margin: 0, valign: "middle",
    });

    // Eyebrow + page indicator on right side
    s.addText("04 · KNOW THE OCEAN", {
        x: halfW + 0.35, y: M, w: 6, h: 0.35,
        fontFace: FONT_SANS, fontSize: 11, color: CORAL,
        charSpacing: 8, margin: 0, valign: "middle",
    });
    addPageIndicator(s, 4, TOTAL, CREAM_DIM);

    // Big title (right side)
    s.addText("Read the\nwater.", {
        x: halfW + 0.30, y: 1.05, w: 6.0, h: 2.3,
        fontFace: FONT_HEAD, fontSize: 64, color: CREAM,
        margin: 0, valign: "top", lineSpacingMultiple: 0.95,
    });

    // Divider hairline above list
    s.addShape("line", {
        x: halfW + 0.35, y: 3.55, w: 6.1, h: 0,
        line: { color: NAVY_LINE, width: 0.75 },
    });

    const points = [
        ["i.",   "Tides rise and fall — check before you paddle."],
        ["ii.",  "Watch a set roll through before entering."],
        ["iii.", "Spot the rip currents — and avoid them."],
        ["iv.",  "Wind, swell direction, sandbanks shape every wave."],
    ];
    const listTop = 3.7;
    const rowH = 0.78;
    points.forEach(([roman, text], i) => {
        const y = listTop + i * rowH;
        s.addText(roman, {
            x: halfW + 0.35, y, w: 0.7, h: rowH - 0.1,
            fontFace: FONT_HEAD, italic: true, fontSize: 22, color: CORAL,
            margin: 0, valign: "top",
        });
        s.addText(text, {
            x: halfW + 1.10, y, w: 5.4, h: rowH - 0.1,
            fontFace: FONT_SANS, fontSize: 14, color: CREAM,
            margin: 0, valign: "top",
        });
        // Subtle row divider
        s.addShape("line", {
            x: halfW + 0.35, y: y + rowH - 0.12, w: 6.1, h: 0,
            line: { color: NAVY_LINE, width: 0.5 },
        });
    });

    // Footer
    addFooter(s, "SURF SCHOOL / LESSON 01", CREAM_DIM);
}

// ----------------------------------------------------------------------------
// Slide 5 — Safety First (statement + three columns)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: NAVY_DEEP };
    addFrame(s, NAVY_LINE);
    addEyebrow(s, "05 · SAFETY FIRST", CREAM_DIM);
    addPageIndicator(s, 5, TOTAL, CREAM_DIM);

    s.addText("RULE ZERO", {
        x: M + 0.2, y: 1.7, w: 6, h: 0.35,
        fontFace: FONT_SANS, fontSize: 11, color: CORAL,
        charSpacing: 8, margin: 0, valign: "middle",
    });
    s.addText("The ocean always\nwins.", {
        x: M + 0.15, y: 2.05, w: 12, h: 2.3,
        fontFace: FONT_HEAD, fontSize: 78, color: CREAM,
        margin: 0, valign: "top", lineSpacingMultiple: 0.95,
    });

    // Hairline divider
    s.addShape("line", {
        x: M + 0.2, y: 4.85, w: SLIDE_W - 2 * (M + 0.2), h: 0,
        line: { color: NAVY_LINE, width: 0.5 },
    });

    const cols = [
        ["NEVER ALONE",       "Surf with a buddy or instructor in sight."],
        ["COVER YOUR HEAD",   "After a wipeout, surface with arms over your head."],
        ["KNOW YOUR LIMIT",   "If the wave is bigger than your skill, watch from shore."],
    ];
    const colW = (SLIDE_W - 2 * (M + 0.2) - 0.8) / 3;
    cols.forEach(([label, body], i) => {
        const x = M + 0.2 + i * (colW + 0.4);
        s.addText(label, {
            x, y: 5.15, w: colW, h: 0.35,
            fontFace: FONT_SANS, fontSize: 11, color: CORAL,
            charSpacing: 7, margin: 0, valign: "middle",
        });
        s.addText(body, {
            x, y: 5.55, w: colW, h: 1.3,
            fontFace: FONT_SANS, fontSize: 15, color: CREAM,
            margin: 0, valign: "top",
        });
    });
}

// ----------------------------------------------------------------------------
// Slide 6 — Surf Etiquette (2x2 numbered list, cream)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addFrame(s, PAPER_LINE);
    addEyebrow(s, "06 · SURF ETIQUETTE", INK_SOFT);
    addPageIndicator(s, 6, TOTAL, INK_SOFT);

    s.addText("Share the lineup.", {
        x: M + 0.15, y: 1.0, w: 11, h: 1.1,
        fontFace: FONT_HEAD, fontSize: 60, color: INK,
        margin: 0, valign: "top",
    });

    // Hairline divider above grid
    s.addShape("line", {
        x: M + 0.2, y: 2.85, w: SLIDE_W - 2 * (M + 0.2), h: 0,
        line: { color: PAPER_LINE, width: 0.5 },
    });

    const rules = [
        ["01", "The surfer closest to the peak has priority."],
        ["02", "Don't drop in on someone already riding."],
        ["03", "Paddle wide — never through the lineup."],
        ["04", "Wait your turn. Take your wave. Trade off."],
    ];

    // 2 columns × 2 rows
    const gridX0 = M + 0.2;
    const gridY0 = 3.20;
    const colW = (SLIDE_W - 2 * gridX0 - 0.8) / 2;
    const rowH = 1.55;
    rules.forEach(([n, text], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = gridX0 + col * (colW + 0.8);
        const y = gridY0 + row * rowH;

        s.addText(n, {
            x, y, w: 1.0, h: 0.5,
            fontFace: FONT_MONO, fontSize: 18, color: CORAL,
            margin: 0, valign: "top",
        });
        s.addText(text, {
            x: x + 1.1, y, w: colW - 1.1, h: rowH - 0.2,
            fontFace: FONT_SANS, fontSize: 17, color: INK,
            margin: 0, valign: "top",
        });
        // Row hairline
        s.addShape("line", {
            x, y: y + rowH - 0.25, w: colW, h: 0,
            line: { color: PAPER_LINE, width: 0.4 },
        });
    });
}

// ----------------------------------------------------------------------------
// Slide 7 — The Pop-Up (3 step cards on navy)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: NAVY };
    addFrame(s, NAVY_LINE);
    addEyebrow(s, "07 · THE POP-UP", CORAL);
    addPageIndicator(s, 7, TOTAL, CREAM_DIM);

    s.addText("The pop-up.", {
        x: M + 0.15, y: 1.0, w: 7, h: 1.1,
        fontFace: FONT_HEAD, fontSize: 60, color: CREAM,
        margin: 0, valign: "top",
    });
    s.addText("Three movements that turn a paddle into a ride. Practice them on the sand first.", {
        x: SLIDE_W - M - 5.0, y: 1.20, w: 4.7, h: 0.9,
        fontFace: FONT_SANS, fontSize: 13, color: CREAM_DIM,
        margin: 0, align: "right", valign: "top",
    });

    const steps = [
        { label: "PADDLE / CHEST DOWN",          step: "STEP ONE",   title: "Paddle.",
          body: "Lie centered on the board, paddle hard, feel the wave lift the tail." },
        { label: "PUSH UP / HANDS UNDER CHEST",  step: "STEP TWO",   title: "Push.",
          body: "Hands flat under your chest. Press up — chest off the board, eyes forward." },
        { label: "FEET PLANTED / KNEES BENT",    step: "STEP THREE", title: "Plant.",
          body: "Front foot forward, back foot at the tail, knees bent, arms wide. Ride." },
    ];

    const gridX0 = M + 0.2;
    const gridTop = 2.4;
    const gridW = SLIDE_W - 2 * gridX0;
    const gap = 0.35;
    const colW = (gridW - gap * 2) / 3;
    const cardH = 2.4;

    // Native-shape icons. Each icon sits in the upper portion of its card
    // and reads the action at a glance: PADDLE = forward motion across water,
    // PUSH = lift upward, PLANT = feet on board. All shapes are primitives
    // (rightArrow, upArrow, wave, ellipse, roundRect, line) so everything
    // remains editable in PowerPoint.

    // STEP 1 — Paddle. A right-pointing arrow above a stylized wave,
    // signaling forward motion across the water.
    function drawPaddleIcon(slide, cx, cy) {
        // Forward-motion arrow (the body paddling across the wave)
        slide.addShape("rightArrow", {
            x: cx - 0.65, y: cy - 0.45,
            w: 1.30, h: 0.42,
            fill: { color: CORAL },
            line: { type: "none" },
        });
        // Two stylized wave curves underneath
        slide.addShape("wave", {
            x: cx - 0.85, y: cy + 0.10,
            w: 1.70, h: 0.22,
            fill: { type: "none" },
            line: { color: CREAM_DIM, width: 1.25 },
        });
        slide.addShape("wave", {
            x: cx - 0.70, y: cy + 0.40,
            w: 1.40, h: 0.18,
            fill: { type: "none" },
            line: { color: CREAM_DIM, width: 1.0, transparency: 40 },
        });
    }

    // STEP 2 — Push. An up-arrow rising from a horizontal board hairline,
    // signaling the press-up motion.
    function drawPushIcon(slide, cx, cy) {
        // Upward-motion arrow (chest pushing off the board)
        slide.addShape("upArrow", {
            x: cx - 0.32, y: cy - 0.65,
            w: 0.64, h: 1.20,
            fill: { color: CORAL },
            line: { type: "none" },
        });
        // Board hairline beneath
        slide.addShape("roundRect", {
            x: cx - 0.95, y: cy + 0.62,
            w: 1.90, h: 0.10,
            fill: { color: CREAM, transparency: 30 },
            line: { color: CREAM_DIM, width: 0.5 },
            rectRadius: 0.05,
        });
        // Two small "lift" tick marks on either side of the arrow base
        // to emphasize upward motion
        drawLineBetween(slide, cx - 0.55, cy + 0.40, cx - 0.40, cy + 0.20, {
            color: CORAL, width: 1.5, transparency: 40,
        });
        drawLineBetween(slide, cx + 0.40, cy + 0.20, cx + 0.55, cy + 0.40, {
            color: CORAL, width: 1.5, transparency: 40,
        });
    }

    // STEP 3 — Plant. Two stylized footprint shapes on a board hairline,
    // signaling the planted surf stance. Footprints are viewed from above:
    // a heel oval + smaller toe oval = a clear "foot from above" silhouette.
    function drawPlantIcon(slide, cx, cy) {
        // Board hairline (the surface feet are planted on)
        slide.addShape("roundRect", {
            x: cx - 1.05, y: cy + 0.55,
            w: 2.10, h: 0.10,
            fill: { color: CREAM, transparency: 30 },
            line: { color: CREAM_DIM, width: 0.5 },
            rectRadius: 0.05,
        });

        // Helper — draw a single footprint at (footCx, footCy), oriented
        // upward (toes pointing up). A footprint reads cleanly as: one
        // larger heel/sole oval + a smaller toe oval just above it, with
        // a narrow gap between them.
        function foot(footCx, footCy) {
            // Sole / heel — tall narrow oval
            slide.addShape("ellipse", {
                x: footCx - 0.13, y: footCy - 0.05,
                w: 0.26, h: 0.42,
                fill: { color: CORAL },
                line: { type: "none" },
            });
            // Toes — smaller oval above the heel, slightly narrower
            slide.addShape("ellipse", {
                x: footCx - 0.11, y: footCy - 0.30,
                w: 0.22, h: 0.20,
                fill: { color: CORAL },
                line: { type: "none" },
            });
        }
        // Front foot (left of center) and back foot (right of center).
        // Both point upward — feet planted, ready to ride.
        foot(cx - 0.30, cy + 0.10);
        foot(cx + 0.30, cy + 0.10);
    }


    const drawIcon7 = [drawPaddleIcon, drawPushIcon, drawPlantIcon];

    steps.forEach((it, i) => {
        const x = gridX0 + i * (colW + gap);

        // Card
        s.addShape("rect", {
            x, y: gridTop, w: colW, h: cardH,
            fill: { color: NAVY_DEEP },
            line: { color: NAVY_LINE, width: 0.5 },
        });

        // Native-shape icon, drawn in upper portion of card
        const cx = x + colW / 2;
        const cy = gridTop + cardH * 0.42;
        drawIcon7[i](s, cx, cy);

        // Label inside card (lower portion, single-line)
        s.addText(it.label, {
            x: x + 0.15, y: gridTop + cardH - 0.55,
            w: colW - 0.30, h: 0.42,
            fontFace: FONT_SANS, fontSize: 9.5, color: CREAM_DIM,
            charSpacing: 5, margin: 0,
            align: "center", valign: "middle",
        });

        // Step indicator
        s.addText(it.step, {
            x, y: gridTop + cardH + 0.15, w: colW, h: 0.35,
            fontFace: FONT_SANS, fontSize: 11, color: CORAL,
            charSpacing: 7, margin: 0, valign: "middle",
        });
        // Title
        s.addText(it.title, {
            x, y: gridTop + cardH + 0.55, w: colW, h: 0.7,
            fontFace: FONT_HEAD, fontSize: 30, color: CREAM,
            margin: 0, valign: "top",
        });
        // Body
        s.addText(it.body, {
            x, y: gridTop + cardH + 1.30, w: colW, h: 1.0,
            fontFace: FONT_SANS, fontSize: 12, color: CREAM_DIM,
            margin: 0, valign: "top",
        });
    });
}

// ----------------------------------------------------------------------------
// Slide 8 — Wrap-up (cream)
// ----------------------------------------------------------------------------
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addFrame(s, PAPER_LINE);
    addEyebrow(s, "08 · WRAP UP", INK_SOFT);
    addPageIndicator(s, 8, TOTAL, INK_SOFT);

    s.addText("WHAT'S NEXT", {
        x: M + 0.2, y: 1.7, w: 6, h: 0.35,
        fontFace: FONT_SANS, fontSize: 11, color: CORAL,
        charSpacing: 8, margin: 0, valign: "middle",
    });
    s.addText("See you in the water.", {
        x: M + 0.15, y: 2.05, w: 12, h: 1.7,
        fontFace: FONT_HEAD, fontSize: 64, color: INK,
        margin: 0, valign: "top",
    });

    // Hairline divider
    s.addShape("line", {
        x: M + 0.2, y: 4.65, w: SLIDE_W - 2 * (M + 0.2), h: 0,
        line: { color: PAPER_LINE, width: 0.5 },
    });

    const cols = [
        ["NEXT SESSION", "Sand drills & pop-up practice."],
        ["BRING",        "Swimwear, towel, water, sunscreen."],
        ["MINDSET",      "Patience. Curiosity. A short memory."],
    ];
    const colW = (SLIDE_W - 2 * (M + 0.2) - 0.8) / 3;
    cols.forEach(([label, body], i) => {
        const x = M + 0.2 + i * (colW + 0.4);
        s.addText(label, {
            x, y: 4.95, w: colW, h: 0.35,
            fontFace: FONT_SANS, fontSize: 11, color: CORAL,
            charSpacing: 7, margin: 0, valign: "middle",
        });
        s.addText(body, {
            x, y: 5.35, w: colW, h: 1.3,
            fontFace: FONT_SANS, fontSize: 15, color: INK,
            margin: 0, valign: "top",
        });
    });

    // Sign-off
    s.addText("— Your instructor", {
        x: M + 0.2, y: SLIDE_H - M - 0.55, w: 6, h: 0.32,
        fontFace: FONT_HEAD, italic: true, fontSize: 12, color: INK_SOFT,
        margin: 0, valign: "middle",
    });
}

// ============================================================================
pres.writeFile({ fileName: "Surfing.pptx" })
    .then(name => console.log("Wrote:", name));
