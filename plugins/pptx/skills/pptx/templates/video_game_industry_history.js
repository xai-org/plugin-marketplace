/**
 * Recreates "The History of the Video Game Industry" deck using pptxgenjs.
 *
 * Slide size: 20" x 11.25" (16:9 widescreen, custom)
 * Palette:
 *   BG_CREAM   = F2ECE0  (light/cream background)
 *   INK_DARK   = 141210  (body / primary text)
 *   INK_MUTED  = 3A342C  (secondary / labels)
 *   INK_BLACK  = 0A0908  (near-black, dark slide bg)
 *   ACCENT     = C7591A  (orange accent)
 *   ON_DARK    = BFB7A8  (body text on dark bg)
 *   ON_DARK_MUTED = A8A195 (muted text on dark bg)
 *
 * Fonts: Arial throughout (matches source)
 */

const pptxgen = require("pptxgenjs");

// -------- constants --------
const W = 20;           // slide width (inches)
const H = 11.25;        // slide height (inches)
const MARGIN = 1.05;    // left/right margin used across slides
const BG_CREAM = "F2ECE0";
const INK_DARK = "141210";
const INK_MUTED = "3A342C";
const INK_BLACK = "0A0908";
const ACCENT = "C7591A";
const ON_DARK = "BFB7A8";
const ON_DARK_MUTED = "A8A195";
const FONT = "Arial";

// -------- helpers --------
// Adds the header eyebrow (top-left label + top-right page number) common to most slides.
function addHeader(slide, eyebrow, pageText, opts = {}) {
    const onDark = opts.onDark === true;
    const labelColor = onDark ? ON_DARK_MUTED : INK_MUTED;
    slide.addText(eyebrow, {
        x: MARGIN, y: 0.55, w: 10, h: 0.4,
        fontFace: FONT, fontSize: 12, color: labelColor,
        charSpacing: 4, bold: false, margin: 0,
    });
    slide.addText(pageText, {
        x: W - MARGIN - 2, y: 0.55, w: 2, h: 0.4,
        fontFace: FONT, fontSize: 12, color: labelColor,
        charSpacing: 4, align: "right", margin: 0,
    });
}

// Adds the footer (bottom-left tagline + bottom-right page number).
function addFooter(slide, tagline, pageText, opts = {}) {
    const onDark = opts.onDark === true;
    const labelColor = onDark ? ON_DARK_MUTED : INK_MUTED;
    slide.addText(tagline, {
        x: MARGIN, y: H - 0.85, w: 10, h: 0.4,
        fontFace: FONT, fontSize: 12, color: labelColor,
        charSpacing: 4, margin: 0,
    });
    slide.addText(pageText, {
        x: W - MARGIN - 2, y: H - 0.85, w: 2, h: 0.4,
        fontFace: FONT, fontSize: 12, color: labelColor,
        charSpacing: 4, align: "right", margin: 0,
    });
}

// Builds the reusable "Chapter" content layout shared by slides 4–8.
// title parts: [regularWord, italicAccentWord, regularWord] rendered as one line.
function addChapterLayout(slide, cfg) {
    const onDark = cfg.onDark === true;
    const bg = onDark ? INK_BLACK : BG_CREAM;
    const ink = onDark ? "F2ECE0" : INK_DARK;
    const body = onDark ? ON_DARK : INK_DARK;
    const subtle = onDark ? ON_DARK_MUTED : INK_MUTED;
    const rule = onDark ? "3A342C" : "BFB7A8";

    slide.background = { color: bg };
    addHeader(slide, cfg.eyebrow, cfg.page, { onDark });
    addFooter(slide, cfg.tagline, cfg.page, { onDark });

    // CHAPTER N label
    slide.addText(cfg.chapterLabel, {
        x: MARGIN, y: 1.55, w: 6, h: 0.45,
        fontFace: FONT, fontSize: 14, color: ACCENT,
        charSpacing: 4, margin: 0,
    });

    // Chapter title: "The [Accent] Rest"
    slide.addText([
        { text: "The ", options: { color: ink } },
        { text: cfg.titleAccent, options: { color: ACCENT, italic: true } },
        { text: " " + cfg.titleTail, options: { color: ink } },
    ], {
        x: MARGIN, y: 2.05, w: 11, h: 1.3,
        fontFace: FONT, fontSize: 54, bold: false, margin: 0,
    });

    // Intro paragraph (top-left) + date range (top-right) with horizontal rule beneath
    slide.addText(cfg.intro, {
        x: MARGIN, y: 4.35, w: 9.0, h: 1.1,
        fontFace: FONT, fontSize: 17, color: body, margin: 0,
    });
    slide.addText(cfg.dateRange, {
        x: W - MARGIN - 6, y: 4.55, w: 6, h: 0.9,
        fontFace: FONT, fontSize: 30, color: ACCENT,
        align: "right", margin: 0,
    });
    // Rule under the intro row
    slide.addShape("line", {
        x: MARGIN, y: 5.65, w: W - MARGIN * 2, h: 0,
        line: { color: rule, width: 0.75 },
    });

    // Pull-quote with italic accent phrase
    slide.addText([
        { text: cfg.pullLead + " ", options: { color: body } },
        { text: cfg.pullAccent, options: { color: ACCENT, italic: true } },
        { text: " " + cfg.pullTail, options: { color: body } },
    ], {
        x: MARGIN, y: 6.05, w: 10.2, h: 1.4,
        fontFace: FONT, fontSize: 22, margin: 0,
    });

    // Supporting bullet body (fine print)
    const bulletItems = cfg.bullets.map((t, i) => ({
        text: t,
        options: {
            breakLine: i < cfg.bullets.length - 1,
            paraSpaceAfter: 8,
        },
    }));
    slide.addText(bulletItems, {
        x: MARGIN + 0.1, y: 7.6, w: 10.1, h: 2.6,
        fontFace: FONT, fontSize: 13, color: body, margin: 0,
    });

    // Right-side stat pair (two stacked fields separated by rules)
    const rightX = 13.5;
    const rightW = W - rightX - MARGIN;
    slide.addShape("line", {
        x: rightX, y: 6.05, w: rightW, h: 0,
        line: { color: rule, width: 0.75 },
    });
    slide.addText(cfg.stat1Label, {
        x: rightX, y: 6.15, w: rightW, h: 0.4,
        fontFace: FONT, fontSize: 13, color: ACCENT,
        charSpacing: 4, margin: 0,
    });
    // stat1 value: optional italic accent segment at start
    if (cfg.stat1Accent) {
        slide.addText([
            { text: cfg.stat1Accent, options: { color: ACCENT, italic: true } },
            { text: " " + cfg.stat1Tail, options: { color: body } },
        ], {
            x: rightX, y: 6.55, w: rightW, h: 0.6,
            fontFace: FONT, fontSize: 24, margin: 0,
        });
    } else {
        slide.addText(cfg.stat1Tail, {
            x: rightX, y: 6.55, w: rightW, h: 0.6,
            fontFace: FONT, fontSize: 24, color: body, margin: 0,
        });
    }
    slide.addShape("line", {
        x: rightX, y: 7.25, w: rightW, h: 0,
        line: { color: rule, width: 0.75 },
    });
    slide.addText(cfg.stat2Label, {
        x: rightX, y: 7.35, w: rightW, h: 0.4,
        fontFace: FONT, fontSize: 13, color: ACCENT,
        charSpacing: 4, margin: 0,
    });
    slide.addText(cfg.stat2Value, {
        x: rightX, y: 7.75, w: rightW, h: 0.6,
        fontFace: FONT, fontSize: 24, color: body, margin: 0,
    });
}

// =====================================================================
// Build the deck
// =====================================================================
async function build() {
    const pres = new pptxgen();
    // Define a custom 20"x11.25" widescreen layout to match the source exactly.
    pres.defineLayout({ name: "CUSTOM_WIDE", width: W, height: H });
    pres.layout = "CUSTOM_WIDE";
    pres.title = "The History of the Video Game Industry";
    pres.author = "Pixel Press";

    // ============ SLIDE 1 — Title ============
    {
        const s = pres.addSlide();
        s.background = { color: BG_CREAM };

        // Header labels
        s.addText("A BRIEF HISTORY", {
            x: MARGIN, y: 0.55, w: 6, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, margin: 0,
        });
        s.addText("1972 — 2026", {
            x: W - MARGIN - 4, y: 0.55, w: 4, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, align: "right", margin: 0,
        });

        // Pixel diamond motif (top-right). 9x9 grid of ~0.32" squares.
        // Black squares and orange center per the reference.
        // Grid pattern (1=black, 2=orange, 0=empty):
        const grid = [
            [0,0,0,0,1,1,0,0,0],
            [0,0,0,1,0,0,1,0,0],
            [0,0,1,0,0,0,0,1,0],
            [0,1,0,0,2,2,0,0,1],
            [1,0,0,2,2,2,2,0,0],
            [1,0,0,2,2,2,2,0,0],
            [0,1,0,0,2,2,0,0,1],
            [0,0,1,0,0,0,0,1,0],
            [0,0,0,1,0,0,1,0,0],
        ];
        // A diamond (rotated square) made of pixel cells
        const cell = 0.30;
        const pxW = 9 * cell;
        const pxStartX = W - MARGIN - pxW - 0.2;
        const pxStartY = 0.9;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const v = grid[r][c];
                if (v === 0) continue;
                s.addShape("rect", {
                    x: pxStartX + c * cell, y: pxStartY + r * cell,
                    w: cell - 0.03, h: cell - 0.03,
                    fill: { color: v === 2 ? ACCENT : INK_BLACK },
                    line: { type: "none" },
                });
            }
        }

        // Eyebrow accent
        s.addText("AN INDUSTRY RETROSPECTIVE", {
            x: MARGIN, y: 3.3, w: 10, h: 0.5,
            fontFace: FONT, fontSize: 15, color: ACCENT,
            charSpacing: 6, bold: false, margin: 0,
        });

        // Main title (two lines, with italic orange "Video Game")
        s.addText([
            { text: "The History of the", options: { color: INK_DARK, breakLine: true } },
            { text: "Video Game", options: { color: ACCENT, italic: true } },
            { text: " Industry", options: { color: INK_DARK } },
        ], {
            x: MARGIN, y: 3.95, w: 17, h: 3.6,
            fontFace: FONT, fontSize: 88, bold: true, margin: 0,
        });

        // Horizontal rule above footer row
        s.addShape("line", {
            x: MARGIN, y: 8.9, w: W - MARGIN * 2, h: 0,
            line: { color: INK_MUTED, width: 0.75 },
        });

        // Footer row: three labels + page
        s.addText("PONG → PS5", {
            x: MARGIN, y: 9.15, w: 6, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, margin: 0,
        });
        s.addText("TEN CHAPTERS", {
            x: (W - 4) / 2, y: 9.15, w: 4, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, align: "center", margin: 0,
        });
        s.addText("54 YEARS", {
            x: W - MARGIN - 4, y: 9.15, w: 4, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, align: "right", margin: 0,
        });
        s.addText("01 / 10", {
            x: W - MARGIN - 2, y: 9.85, w: 2, h: 0.4,
            fontFace: FONT, fontSize: 12, color: INK_MUTED,
            charSpacing: 4, align: "right", margin: 0,
        });
    }

    // ============ SLIDE 2 — Executive Summary ============
    {
        const s = pres.addSlide();
        s.background = { color: BG_CREAM };
        addHeader(s, "EXECUTIVE SUMMARY", "02 / 10");
        addFooter(s, "FIVE DISTINCT ERAS", "02 / 10");

        // Title
        s.addText([
            { text: "Executive ", options: { color: INK_DARK } },
            { text: "Summary", options: { color: ACCENT, italic: true } },
        ], {
            x: MARGIN, y: 1.2, w: 14, h: 1.6,
            fontFace: FONT, fontSize: 64, margin: 0,
        });

        // Left paragraph (with italic accent phrase)
        s.addText([
            { text: "Gaming grew from a single arcade curiosity into the ", options: { color: INK_DARK } },
            { text: "largest entertainment category", options: { color: ACCENT, italic: true } },
            { text: " on earth — surpassing film and music combined.", options: { color: INK_DARK } },
        ], {
            x: MARGIN, y: 4.3, w: 7, h: 4,
            fontFace: FONT, fontSize: 28, margin: 0,
        });

        // Right: 5-row era table with roman numerals, titles, descriptions
        const rows = [
            ["I.",   "Arcade Era",         "Coin-operated cabinets seed a mass market; gaming becomes public entertainment."],
            ["II.",  "Console Wars",       "The home becomes the battleground; hardware platforms define identity and ecosystem."],
            ["III.", "Online Revolution",  "Broadband turns games into persistent worlds; multiplayer becomes the default."],
            ["IV.",  "Mobile Explosion",   "Smartphones put a console in every pocket; free-to-play reshapes economics."],
            ["V.",   "Modern Platforms",   "Cross-play, streaming, and live services blur the lines between device, game, and service."],
        ];
        const tableX = 9.5;
        const tableW = W - MARGIN - tableX;
        const rowTop = 4.1;
        const rowH = 1.2;
        const rule = "BFB7A8";

        // Top rule of the table
        s.addShape("line", {
            x: tableX, y: rowTop, w: tableW, h: 0,
            line: { color: rule, width: 0.75 },
        });

        rows.forEach((row, i) => {
            const y = rowTop + i * rowH;
            // Roman numeral
            s.addText(row[0], {
                x: tableX + 0.1, y: y + 0.25, w: 1.0, h: 0.5,
                fontFace: FONT, fontSize: 14, color: ACCENT, margin: 0,
            });
            // Era name (wraps to 2 lines for longer entries)
            s.addText(row[1], {
                x: tableX + 1.1, y: y + 0.15, w: 3.0, h: 1.0,
                fontFace: FONT, fontSize: 22, color: INK_DARK, margin: 0,
            });
            // Description
            s.addText(row[2], {
                x: tableX + 4.3, y: y + 0.2, w: tableW - 4.3 - 0.1, h: 1.0,
                fontFace: FONT, fontSize: 13, color: INK_DARK, margin: 0,
            });
            // Bottom rule for this row
            s.addShape("line", {
                x: tableX, y: y + rowH, w: tableW, h: 0,
                line: { color: rule, width: 0.75 },
            });
        });
    }

    // ============ SLIDE 3 — Timeline ============
    {
        const s = pres.addSlide();
        s.background = { color: BG_CREAM };
        addHeader(s, "TIMELINE OF ERAS", "03 / 10");
        addFooter(s, "OVERLAPPING, NOT REPLACING", "03 / 10");

        s.addText([
            { text: "Five Decades, ", options: { color: INK_DARK } },
            { text: "Five Eras", options: { color: ACCENT, italic: true } },
        ], {
            x: MARGIN, y: 1.2, w: 14, h: 1.5,
            fontFace: FONT, fontSize: 60, margin: 0,
        });

        s.addText(
            "Each wave of technology unlocked a new audience. The industry did not replace old forms so much as layer new ones on top.",
            {
                x: MARGIN, y: 2.9, w: 13, h: 1.0,
                fontFace: FONT, fontSize: 16, color: INK_DARK, margin: 0,
            }
        );

        // Timeline horizontal axis
        const axisY = 6.4;
        const axisLeft = MARGIN;
        const axisRight = W - MARGIN;
        s.addShape("line", {
            x: axisLeft, y: axisY, w: axisRight - axisLeft, h: 0,
            line: { color: INK_MUTED, width: 0.75 },
        });

        // 5 era markers: relative positions along timeline
        // Match reference: Arcade (far left), Console Wars (~20%), Online (~45%), Mobile (~70%), Modern (far right)
        const eras = [
            { x: 0.05, date: "1972 — 1983", name: "Arcade",             filled: true,  above: true },
            { x: 0.23, date: "1985 — 2000", name: "Console Wars",       filled: false, above: false },
            { x: 0.45, date: "1999 — 2010", name: "Online",             filled: true,  above: true },
            { x: 0.67, date: "2008 — 2015", name: "Mobile",             filled: false, above: false },
            { x: 0.90, date: "2020 — Today", name: "Modern Platforms",  filled: true,  above: true, multiline: true },
        ];
        const axisSpan = axisRight - axisLeft;
        const dotD = 0.22;

        eras.forEach(era => {
            const cx = axisLeft + era.x * axisSpan;
            // Dot
            s.addShape("ellipse", {
                x: cx - dotD / 2, y: axisY - dotD / 2,
                w: dotD, h: dotD,
                fill: era.filled ? { color: ACCENT } : { color: BG_CREAM },
                line: { color: era.filled ? ACCENT : INK_DARK, width: 1.25 },
            });

            // Labels: either above or below the axis
            const isAbove = era.above;
            const dateY = isAbove ? axisY - 1.2 : axisY + 0.4;
            const nameY = isAbove ? axisY - 0.75 : axisY + 0.8;

            s.addText(era.date, {
                x: cx - 1.5, y: dateY, w: 3.0, h: 0.4,
                fontFace: FONT, fontSize: 14, color: ACCENT,
                align: "center", margin: 0,
            });
            s.addText(era.name, {
                x: cx - 1.5, y: nameY, w: 3.0, h: era.multiline ? 0.9 : 0.45,
                fontFace: FONT, fontSize: 18, color: INK_DARK,
                align: "center", margin: 0,
            });
        });

        // Decade labels at bottom
        const decades = ["1970S", "1980S", "1990S", "2000S", "2010S", "2020S"];
        const decYW = 3.0;
        const decStep = (axisRight - axisLeft) / 5;
        decades.forEach((d, i) => {
            s.addText(d, {
                x: axisLeft + i * decStep - decYW / 2, y: 8.7, w: decYW, h: 0.45,
                fontFace: FONT, fontSize: 13, color: INK_MUTED,
                charSpacing: 4, align: "center", margin: 0,
            });
        });
    }

    // ============ SLIDES 4–8 — Chapter slides via helper ============
    addChapterLayout(pres.addSlide(), {
        eyebrow: "CHAPTER I — THE ARCADE ERA", page: "04 / 10",
        tagline: "PUBLIC, SOCIAL, PAY-PER-PLAY",
        chapterLabel: "CHAPTER I",
        titleAccent: "Arcade", titleTail: "Era",
        intro: "Coin-operated cabinets crowded into bars, pizzerias, and dedicated arcades turned gaming into a social spectacle.",
        dateRange: "1972 — 1983",
        pullLead: "A",
        pullAccent: "quarter at a time",
        pullTail: ", gaming became a public ritual — and the world's first interactive mass medium.",
        bullets: [
            "Ball-and-paddle titles proved digital entertainment could be a commercial category.",
            "Vector and raster graphics defined a new visual vocabulary under tight hardware budgets.",
            "A 1983 oversupply crash in North America wiped out most US publishers and shifted momentum to Japan.",
        ],
        stat1Label: "PEAK US ARCADE REVENUE",
        stat1Accent: "$8B",
        stat1Tail: "/ 1982",
        stat2Label: "LOCATIONS AT PEAK",
        stat2Value: "~10,000 arcades",
    });

    // decorative motif for slide 4: scattered pixel blocks (top-right)
    {
        const slide = pres.slides[pres.slides.length - 1];
        // Draw a rough "pixel glyph" cluster at top-right
        const cx0 = W - 5.2, cy0 = 0.85;
        const cell = 0.38;
        const pat = [
            [1,1,0,0,0,0,1,1,0],
            [1,0,0,0,0,0,0,1,1],
            [0,0,0,1,1,0,0,0,0],
            [0,0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [1,1,0,0,0,0,1,1,0],
            [1,1,0,0,0,0,1,1,0],
        ];
        for (let r = 0; r < pat.length; r++) {
            for (let c = 0; c < pat[r].length; c++) {
                if (pat[r][c]) {
                    slide.addShape("rect", {
                        x: cx0 + c * cell, y: cy0 + r * cell,
                        w: cell - 0.03, h: cell - 0.03,
                        fill: { color: INK_BLACK }, line: { type: "none" },
                    });
                }
            }
        }
    }

    // SLIDE 5 — Console Wars
    addChapterLayout(pres.addSlide(), {
        eyebrow: "CHAPTER II — THE CONSOLE WARS", page: "05 / 10",
        tagline: "PLATFORMS AS IDENTITY",
        chapterLabel: "CHAPTER II",
        titleAccent: "Console", titleTail: "Wars",
        intro: "Dedicated home hardware from competing manufacturers turned the living room into the industry's center of gravity.",
        dateRange: "1985 — 2000",
        pullLead: "Rival platforms competed on",
        pullAccent: "exclusive franchises",
        pullTail: ", generational leaps, and escalating bit-counts — each a marketing totem.",
        bullets: [
            "8-bit home systems restored consumer confidence after the arcade crash.",
            "The 16-bit generation introduced head-to-head marketing and lifestyle branding.",
        ],
        stat1Label: "CONSOLE GENERATIONS",
        stat1Accent: "3rd → 6th",
        stat1Tail: "",
        stat2Label: "SIGNATURE LEAP",
        stat2Value: "2D → 3D graphics",
    });
    // decorative motif: outlined circle (top-right)
    {
        const slide = pres.slides[pres.slides.length - 1];
        slide.addShape("ellipse", {
            x: W - 4.5, y: 1.0, w: 2.7, h: 2.7,
            fill: { type: "none" },
            line: { color: INK_DARK, width: 1 },
        });
    }

    // SLIDE 6 — Online Revolution
    addChapterLayout(pres.addSlide(), {
        eyebrow: "CHAPTER III — THE ONLINE REVOLUTION", page: "06 / 10",
        tagline: "GAMES AS SERVICES",
        chapterLabel: "CHAPTER III",
        titleAccent: "Online", titleTail: "Revolution",
        intro: "Broadband, matchmaking services, and persistent servers reinvented what a game could be and how long it could last.",
        dateRange: "1999 — 2010",
        pullLead: "Games became",
        pullAccent: "places, not products",
        pullTail: "— subscriptions, guilds, and ranked ladders replaced the end credits.",
        bullets: [
            "Massively multiplayer worlds proved players would pay monthly fees for persistent social spaces.",
            "Console online services standardized matchmaking, voice chat, and downloadable content.",
            "PC storefronts normalized digital distribution and eroded the primacy of boxed retail.",
        ],
        stat1Label: "SUBSCRIPTION CEILING",
        stat1Accent: "12M+",
        stat1Tail: "peak MMO subs",
        stat2Label: "NEW REVENUE SHAPE",
        stat2Value: "Recurring, not one-time",
    });
    // decorative motif: horizontal lines (like a network graph) with an orange dot
    {
        const slide = pres.slides[pres.slides.length - 1];
        const lx = W - 4.5, ly = 1.0, lw = 2.7;
        const lineCount = 8;
        for (let i = 0; i < lineCount; i++) {
            slide.addShape("line", {
                x: lx, y: ly + i * 0.32, w: lw, h: 0,
                line: { color: INK_DARK, width: 0.5 },
            });
        }
        // orange dot on one line
        slide.addShape("ellipse", {
            x: lx + lw * 0.7 - 0.09, y: ly + 3 * 0.32 - 0.09,
            w: 0.18, h: 0.18,
            fill: { color: ACCENT }, line: { type: "none" },
        });
    }

    // SLIDE 7 — Mobile Explosion
    addChapterLayout(pres.addSlide(), {
        eyebrow: "CHAPTER IV — THE MOBILE EXPLOSION", page: "07 / 10",
        tagline: "A CONSOLE IN EVERY POCKET",
        chapterLabel: "CHAPTER IV",
        titleAccent: "Mobile", titleTail: "Explosion",
        intro: "App stores and multitouch screens widened the audience beyond the historical gaming demographic — by an order of magnitude.",
        dateRange: "2008 — 2015",
        pullLead: "Free-to-play and in-app purchases redefined the",
        pullAccent: "price of a game",
        pullTail: "— from sixty dollars up-front to zero, with a long tail.",
        bullets: [
            "App stores removed publisher gatekeeping and let small studios reach a global audience directly.",
            "Casual and hyper-casual design principles recruited players who had never held a controller.",
            "Live-ops, LTV, and retention became core competencies — borrowed later by every other platform.",
        ],
        stat1Label: "MOBILE PLAYERS WORLDWIDE",
        stat1Accent: "~2.8B",
        stat1Tail: "",
        stat2Label: "DOMINANT BUSINESS MODEL",
        stat2Value: "Free-to-play + IAP",
    });
    // decorative motif: pixel grid with scattered orange cells (top-right)
    {
        const slide = pres.slides[pres.slides.length - 1];
        const gx = W - 5.0, gy = 0.85;
        const cell = 0.32;
        const cols = 13, rows = 7;
        // seeded pseudo-random pattern
        const orange = new Set([
            "1-2","1-6","1-8","2-3","2-10","3-0","3-5","3-9","4-4","4-11","5-8","5-12","6-2","6-7"
        ]);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const key = r + "-" + c;
                slide.addShape("rect", {
                    x: gx + c * cell, y: gy + r * cell,
                    w: cell - 0.04, h: cell - 0.04,
                    fill: { color: orange.has(key) ? ACCENT : "D9D1BE" },
                    line: { type: "none" },
                });
            }
        }
    }

    // SLIDE 8 — Modern Platform Era (dark variant)
    addChapterLayout(pres.addSlide(), {
        onDark: true,
        eyebrow: "CHAPTER V — THE MODERN PLATFORM ERA", page: "08 / 10",
        tagline: "ECOSYSTEM VS. ECOSYSTEM",
        chapterLabel: "CHAPTER V",
        titleAccent: "Modern", titleTail: "Platform Era",
        intro: "Current-generation home consoles, handhelds, high-end PCs, and cloud streaming form a single overlapping ecosystem rather than competing silos.",
        dateRange: "2020 — Today",
        pullLead: "The fight is no longer",
        pullAccent: "box against box",
        pullTail: "— it is ecosystem against ecosystem, service against service.",
        bullets: [
            "Flagship consoles ship with SSD storage, ray-tracing GPUs, and first-party subscriptions.",
            "Hybrid handhelds have moved from niche to mainstream across multiple manufacturers.",
        ],
        stat1Label: "ACTIVE PLATFORMS",
        stat1Accent: "Console · PC · Mobile · Cloud",
        stat1Tail: "",
        stat2Label: "GENERATION",
        stat2Value: "9th, well underway",
    });
    // decorative motif: ascending bar chart (top-right)
    {
        const slide = pres.slides[pres.slides.length - 1];
        const bx = W - 5.0, by = 3.3; // baseline
        const barW = 0.35, gap = 0.2;
        const heights = [0.6, 0.9, 1.3, 1.1, 1.7, 2.0, 1.5, 2.2];
        const orangeIdx = new Set([2, 5, 7]);
        heights.forEach((h, i) => {
            slide.addShape("rect", {
                x: bx + i * (barW + gap), y: by - h,
                w: barW, h: h,
                fill: { color: orangeIdx.has(i) ? ACCENT : "F2ECE0" },
                line: { type: "none" },
            });
        });
    }

    // ============ SLIDE 9 — Market Trends ============
    {
        const s = pres.addSlide();
        s.background = { color: BG_CREAM };
        addHeader(s, "MARKET TRENDS", "09 / 10");
        addFooter(s, "SCALE, AUDIENCE, MODEL, OWNERSHIP", "09 / 10");

        s.addText([
            { text: "Market ", options: { color: INK_DARK } },
            { text: "Trends", options: { color: ACCENT, italic: true } },
        ], {
            x: MARGIN, y: 1.1, w: 14, h: 1.6,
            fontFace: FONT, fontSize: 64, margin: 0,
        });

        s.addText(
            "Where the industry stands today — by the numbers and by the structural shifts shaping the next decade.",
            {
                x: MARGIN, y: 2.8, w: 17, h: 1.0,
                fontFace: FONT, fontSize: 16, color: INK_DARK, margin: 0,
            }
        );

        // 4 columns
        const cols = [
            ["GLOBAL REVENUE", "$210B", "Larger than film and recorded music combined.",
                "Gaming is the dominant entertainment category worldwide, with mobile contributing roughly half."],
            ["ACTIVE PLAYERS", "3.3B", "Roughly two of every five people on earth.",
                "Audience growth has shifted from the West to Asia, Latin America, and emerging markets."],
            ["REVENUE MIX", "F2P", "Dominant model; premium resilient at the top.",
                "Live-service and microtransactions lead; single-purchase titles persist in prestige categories."],
            ["CONSOLIDATION", "M&A", "Platform holders are buying studios, not just games.",
                "Strategic acquisitions in the tens of billions are reshaping first-party lineups and exclusives."],
        ];
        const colTop = 4.6;
        const colsAvail = W - MARGIN * 2;
        const colW = colsAvail / 4;
        const innerW = colW - 0.4;

        cols.forEach((col, i) => {
            const cx = MARGIN + i * colW;
            // Top rule
            s.addShape("line", {
                x: cx, y: colTop, w: innerW + 0.4 - 0.2, h: 0,
                line: { color: INK_MUTED, width: 1 },
            });
            // Label
            s.addText(col[0], {
                x: cx, y: colTop + 0.2, w: innerW, h: 0.4,
                fontFace: FONT, fontSize: 14, color: ACCENT,
                charSpacing: 4, margin: 0,
            });
            // Big value
            s.addText(col[1], {
                x: cx, y: colTop + 0.7, w: innerW, h: 1.0,
                fontFace: FONT, fontSize: 44, color: INK_DARK, margin: 0,
            });
            // Short lead
            s.addText(col[2], {
                x: cx, y: colTop + 1.95, w: innerW, h: 1.0,
                fontFace: FONT, fontSize: 16, color: INK_DARK, margin: 0,
            });
            // Long description
            s.addText(col[3], {
                x: cx, y: colTop + 3.5, w: innerW, h: 1.5,
                fontFace: FONT, fontSize: 13, color: INK_DARK, margin: 0,
            });
        });
    }

    // ============ SLIDE 10 — Future Outlook (dark) ============
    {
        const s = pres.addSlide();
        s.background = { color: INK_BLACK };
        addHeader(s, "FUTURE OUTLOOK", "10 / 10", { onDark: true });
        addFooter(s, "END OF PRESENTATION", "10 / 10", { onDark: true });

        s.addText([
            { text: "Future ", options: { color: "F2ECE0" } },
            { text: "Outlook", options: { color: ACCENT, italic: true } },
        ], {
            x: MARGIN, y: 1.1, w: 14, h: 1.6,
            fontFace: FONT, fontSize: 64, margin: 0,
        });

        s.addText("Four forces likely to define the next chapter — each an extension of trends already in motion.", {
            x: MARGIN, y: 2.8, w: 17, h: 0.8,
            fontFace: FONT, fontSize: 16, color: ON_DARK, margin: 0,
        });

        // 2x2 grid
        const cards = [
            { h: "HORIZON · NEAR", t: "Cloud & streaming maturity",
              b: "Latency and codec improvements make a console-grade experience playable on any screen, eroding the importance of dedicated hardware in key markets." },
            { h: "HORIZON · MID", t: "Spatial & wearable computing",
              b: "Mixed-reality headsets move from enthusiast to mainstream as weight, resolution, and battery improve — gaming is a primary use case, not a side feature." },
            { h: "HORIZON · NEAR", t: "Generative tooling in production",
              b: "AI-assisted art, dialogue, and QA compress development timelines and lower the cost of mid-budget titles — with open questions on originality and labor." },
            { h: "HORIZON · LONG", t: "Regulation & player rights",
              b: "Monetization, loot mechanics, and platform fees face tightening scrutiny, reshaping business models for live-service and mobile in particular." },
        ];
        const gridTop = 4.3;
        const cellW = (W - MARGIN * 2 - 0.6) / 2;
        const cellH = 2.5;
        const positions = [
            [MARGIN, gridTop],
            [MARGIN + cellW + 0.6, gridTop],
            [MARGIN, gridTop + cellH],
            [MARGIN + cellW + 0.6, gridTop + cellH],
        ];
        cards.forEach((c, i) => {
            const [x, y] = positions[i];
            // Top rule for card
            s.addShape("line", {
                x, y, w: cellW, h: 0,
                line: { color: "3A342C", width: 0.75 },
            });
            s.addText(c.h, {
                x, y: y + 0.15, w: cellW, h: 0.4,
                fontFace: FONT, fontSize: 13, color: ACCENT,
                charSpacing: 4, margin: 0,
            });
            s.addText(c.t, {
                x, y: y + 0.55, w: cellW, h: 0.55,
                fontFace: FONT, fontSize: 22, color: "F2ECE0", margin: 0,
            });
            s.addText(c.b, {
                x, y: y + 1.2, w: cellW, h: 1.2,
                fontFace: FONT, fontSize: 13, color: ON_DARK, margin: 0,
            });
        });

        // Final tagline
        s.addText([
            { text: "The constant across every era: ", options: { color: "F2ECE0" } },
            { text: "hardware changes, the player does not", options: { color: ACCENT, italic: true } },
            { text: ".", options: { color: "F2ECE0" } },
        ], {
            x: MARGIN, y: 9.5, w: 17, h: 0.6,
            fontFace: FONT, fontSize: 22, margin: 0,
        });
    }

    // Write
    await pres.writeFile({ fileName: "output.pptx" });
    console.log("Wrote output.pptx");
}

build().catch(e => { console.error(e); process.exit(1); });
