// AI-Driven Execution in Fixed Income — pptxgenjs replica
// Layout: 13.333" x 7.5" (LAYOUT_WIDE)
//
// Palette (from original):
//   Cream background    : F4F1EB
//   Near-black surface  : 14110F
//   Deepest black       : 0E0C0B
//   Primary ink         : 000000
//   White               : FFFFFF
//
// Typography: Helvetica (the source deck uses a Helvetica-family sans + italic
// Helvetica for display italics). Calibri is a safe fallback everywhere.

const pptxgen = require("pptxgenjs");

// ---------- palette & type ----------
const CREAM     = "F4F1EB";
const INK       = "14110F";
const INK_DEEP  = "0E0C0B";
const BLACK     = "000000";
const WHITE     = "FFFFFF";

// muted ink shades (for captions / rule lines on cream)
const MUTED     = "6E665A"; // body copy / secondary
const MUTED_2   = "8A8273"; // even lighter (eyebrows, footers)
const RULE      = "CFC6B5"; // thin rule lines on cream
const CARD_LINE = "D9D1BE"; // card border on cream

// on dark
const MUTED_D   = "8E887E";
const MUTED_D2  = "5A544C";
const RULE_D    = "3A332D";

const FONT_H = "Helvetica";
const FONT_B = "Helvetica";

const pres = new pptxgen();
pres.layout  = "LAYOUT_WIDE";        // 13.333 x 7.5
pres.author  = "Internal Briefing";
pres.title   = "AI-Driven Execution in Fixed Income";

const SW = 13.333, SH = 7.5;

// ---------- reusable helpers ----------

// Small diamond-in-diamond brand mark (like the ◈ glyph in the header)
function drawBrandmark(slide, x, y, size, color) {
    // Outer diamond outline
    slide.addShape(pres.shapes.DIAMOND, {
        x, y, w: size, h: size,
        fill: { type: "none" },
        line: { color, width: 0.75 },
    });
    // Inner filled diamond
    const inset = size * 0.34;
    slide.addShape(pres.shapes.DIAMOND, {
        x: x + inset / 2, y: y + inset / 2, w: size - inset, h: size - inset,
        fill: { color },
        line: { type: "none" },
    });
}

// Header bar used on slides 2–10.
// `theme` = "light" (cream) or "dark"
function addHeader(slide, { eyebrow, pageNum, theme = "light" }) {
    const ink    = theme === "dark" ? WHITE : INK;
    const muted  = theme === "dark" ? MUTED_D : MUTED_2;
    const rule   = theme === "dark" ? RULE_D : RULE;

    // Brand mark
    drawBrandmark(slide, 0.62, 0.54, 0.24, ink);

    // "AI × FIXED INCOME"
    slide.addText("AI × FIXED INCOME", {
        x: 0.98, y: 0.48, w: 3.2, h: 0.36,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: ink, charSpacing: 4, margin: 0,
        valign: "middle",
    });

    // short rule between brand and section eyebrow
    slide.addShape(pres.shapes.LINE, {
        x: 3.85, y: 0.66, w: 0.45, h: 0,
        line: { color: rule, width: 0.75 },
    });

    // Section eyebrow (e.g. "— CONTEXT")
    slide.addText(`— ${eyebrow}`, {
        x: 4.42, y: 0.48, w: 3.2, h: 0.36,
        fontFace: FONT_H, fontSize: 10.5,
        color: muted, charSpacing: 4, margin: 0,
        valign: "middle",
    });

    // Page counter at right
    slide.addText(`${pageNum} / 10`, {
        x: SW - 1.6, y: 0.48, w: 1.0, h: 0.36,
        fontFace: FONT_H, fontSize: 10.5,
        color: muted, align: "right", charSpacing: 3, margin: 0,
        valign: "middle",
    });
}

// Shared "eyebrow + big headline + deck copy" block used by most content slides.
function addSectionIntro(slide, { eyebrow, headline, body, theme = "light" }) {
    const ink   = theme === "dark" ? WHITE : INK;
    const muted = theme === "dark" ? MUTED_D : MUTED;

    slide.addText(eyebrow, {
        x: 0.62, y: 1.22, w: 8, h: 0.32,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: ink, charSpacing: 4, margin: 0,
    });

    slide.addText(headline, {
        x: 0.62, y: 1.55, w: 11.5, h: 1.5,
        fontFace: FONT_H, fontSize: 34, bold: false,
        color: ink, margin: 0, valign: "top",
    });

    if (body) {
        slide.addText(body, {
            x: 0.62, y: 3.05, w: 10, h: 0.9,
            fontFace: FONT_B, fontSize: 13,
            color: muted, margin: 0, valign: "top",
        });
    }
}

// chip / pill label (thin rounded rect with text inside)
function addChip(slide, x, y, w, h, text, { color = INK, border = CARD_LINE, tiny = false } = {}) {
    slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w, h,
        fill: { color: CREAM },
        line: { color: border, width: 0.5 },
    });
    slide.addText(text, {
        x, y, w, h,
        fontFace: FONT_B, fontSize: tiny ? 8.5 : 10.5,
        color, align: "center", valign: "middle",
        charSpacing: tiny ? 2 : 0.5, margin: 0,
    });
}

// ================================================================
// SLIDE 1 — Cover (split layout: cream left, black right panel)
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: CREAM };

    // Right dark panel (covers right ~38% of slide)
    const panelX = 8.30;
    s.addShape(pres.shapes.RECTANGLE, {
        x: panelX, y: 0, w: SW - panelX, h: SH,
        fill: { color: INK_DEEP }, line: { type: "none" },
    });

    // -------- LEFT SIDE (cream) --------
    // Brand mark + "INTERNAL BRIEFING · APR 2026"
    drawBrandmark(s, 0.7, 0.72, 0.26, INK);
    s.addText("INTERNAL BRIEFING · APR 2026", {
        x: 1.08, y: 0.66, w: 5, h: 0.38,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: INK, charSpacing: 4, margin: 0, valign: "middle",
    });

    // Tiny eyebrow
    s.addText("STATE OF THE MARKET", {
        x: 0.7, y: 1.78, w: 6, h: 0.32,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: INK, charSpacing: 4, margin: 0,
    });

    // Title — "AI-Driven Execution in *Fixed Income*"
    // pptxgenjs ignores literal \n inside text runs — must use breakLine between runs.
    s.addText(
        [
            { text: "AI-Driven",     options: { italic: false, breakLine: true } },
            { text: "Execution in ", options: { italic: false } },
            { text: "Fixed",         options: { italic: true,  breakLine: true } },
            { text: "Income",        options: { italic: true } },
        ],
        {
            x: 0.7, y: 2.15, w: 7.4, h: 2.7,
            fontFace: FONT_H, fontSize: 52,
            color: INK, margin: 0, valign: "top",
            paraSpaceBefore: 0, paraSpaceAfter: 0,
        }
    );

    // Deck copy
    s.addText(
        "A map of where machine learning has already changed how bonds are priced, traded, settled, and held — and where the white space still sits.",
        {
            x: 0.7, y: 4.95, w: 6.8, h: 1.0,
            fontFace: FONT_B, fontSize: 14,
            color: MUTED, margin: 0, valign: "top",
        }
    );

    // Footer row on cream side
    s.addText("PREPARED FOR LEADERSHIP", {
        x: 0.7, y: 6.85, w: 3.4, h: 0.3,
        fontFace: FONT_H, fontSize: 9.5, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0,
    });
    s.addText("10 SLIDES · ~20 MIN", {
        x: 4.7, y: 6.85, w: 3.0, h: 0.3,
        fontFace: FONT_H, fontSize: 9.5, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0,
    });

    // -------- RIGHT PANEL (dark) --------
    // Panel eyebrow
    s.addText("LIFECYCLE COVER", {
        x: panelX + 0.55, y: 0.66, w: 4, h: 0.38,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_D, charSpacing: 4, margin: 0, valign: "middle",
    });

    // Four lifecycle rows
    const rows = [
        ["01", "Pre-Trade",  "Pricing · Analytics · Axes"],
        ["02", "Execution",  "RFQ · Algos · Routing"],
        ["03", "Post-Trade", "Settlement · Recon"],
        ["04", "Portfolio",  "Construction · PM"],
    ];
    const rowX = panelX + 0.55;
    const rowW = SW - panelX - 1.1;
    const rowH = 0.95;
    const rowStart = 2.25;

    rows.forEach((r, i) => {
        const y = rowStart + i * rowH;
        // Top rule (all 4 + one below last)
        s.addShape(pres.shapes.LINE, {
            x: rowX, y, w: rowW, h: 0,
            line: { color: RULE_D, width: 0.5 },
        });
        // number
        s.addText(r[0], {
            x: rowX, y: y + 0.18, w: 0.5, h: 0.3,
            fontFace: FONT_H, fontSize: 10.5,
            color: MUTED_D, margin: 0, valign: "top",
        });
        // title
        s.addText(r[1], {
            x: rowX + 0.6, y: y + 0.1, w: 3.2, h: 0.42,
            fontFace: FONT_H, fontSize: 18,
            color: WHITE, margin: 0, valign: "top",
        });
        // sub
        s.addText(r[2], {
            x: rowX + 0.6, y: y + 0.52, w: 3.8, h: 0.3,
            fontFace: FONT_B, fontSize: 10.5,
            color: MUTED_D, margin: 0, valign: "top",
        });
    });
    // closing rule below last row
    s.addShape(pres.shapes.LINE, {
        x: rowX, y: rowStart + 4 * rowH, w: rowW, h: 0,
        line: { color: RULE_D, width: 0.5 },
    });

    // Panel footer
    s.addText("FIG. 01 · APPLICATION MAP", {
        x: panelX + 0.55, y: 6.85, w: 5, h: 0.3,
        fontFace: FONT_H, fontSize: 9.5, bold: true,
        color: MUTED_D2, charSpacing: 3, margin: 0,
    });
}

// ================================================================
// SLIDE 2 — Context: three big stats
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addHeader(s, { eyebrow: "CONTEXT", pageNum: "02" });
    addSectionIntro(s, {
        eyebrow: "WHY FIXED INCOME, WHY NOW",
        headline: "Three structural shifts created the opening for AI.",
        body: "Fixed income stayed voice-and-chat longer than any other asset class. It's catching up fast — and the data problem is uniquely suited to ML.",
    });

    // horizontal rule above the three stats
    s.addShape(pres.shapes.LINE, {
        x: 0.62, y: 4.25, w: SW - 1.24, h: 0,
        line: { color: RULE, width: 0.5 },
    });

    const stats = [
        { n: "01", big: "~70%", label: "of IG credit volume now traded electronically",  sub: "vs. <20% a decade ago" },
        { n: "02", big: "12M+", label: "CUSIPs across the global bond universe",          sub: "vs. ~45K listed equities" },
        { n: "03", big: "<3%",  label: "of bonds trade on any given day",                 sub: "pricing must be inferred, not observed" },
    ];

    const colW = (SW - 1.24) / 3;
    stats.forEach((st, i) => {
        const x = 0.62 + i * colW;
        // vertical divider between columns
        if (i > 0) {
            s.addShape(pres.shapes.LINE, {
                x, y: 4.45, w: 0, h: 2.3,
                line: { color: RULE, width: 0.5 },
            });
        }
        const pad = 0.35;
        s.addText(st.n, {
            x: x + pad, y: 4.5, w: 1, h: 0.32,
            fontFace: FONT_H, fontSize: 11,
            color: MUTED_2, charSpacing: 4, margin: 0,
        });
        s.addText(st.big, {
            x: x + pad, y: 4.85, w: colW - pad, h: 1.0,
            fontFace: FONT_H, fontSize: 60, bold: false,
            color: INK, margin: 0, valign: "top",
        });
        s.addText(st.label, {
            x: x + pad, y: 5.95, w: colW - pad - 0.4, h: 0.6,
            fontFace: FONT_B, fontSize: 13,
            color: INK, margin: 0, valign: "top",
        });
        s.addText(st.sub, {
            x: x + pad, y: 6.55, w: colW - pad - 0.4, h: 0.3,
            fontFace: FONT_B, fontSize: 11,
            color: MUTED_2, margin: 0, valign: "top",
        });
    });
}

// ================================================================
// SLIDE 3 — Framework: four cards with maturity dots
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addHeader(s, { eyebrow: "FRAMEWORK", pageNum: "03" });
    addSectionIntro(s, {
        eyebrow: "THE FRAMEWORK",
        headline: "Four application zones across the trade lifecycle.",
        body: "We use this map for the rest of the deck — each zone gets one slide covering what AI actually does there today, and who is doing it.",
    });

    const cards = [
        { n: "01", title: "Pre-Trade",  sub: "Pricing · Analytics · Axes",       maturity: 4 },
        { n: "02", title: "Execution",  sub: "RFQ · Algos · Smart Routing",      maturity: 3 },
        { n: "03", title: "Post-Trade", sub: "Settlement · Reconciliation",      maturity: 2 },
        { n: "04", title: "Portfolio",  sub: "Construction · PM · Research",     maturity: 3 },
    ];

    const cardY = 4.4;
    const cardH = 1.75;
    const gap   = 0.2;
    const totalW = SW - 1.24;
    const cardW = (totalW - gap * 3) / 4;

    cards.forEach((c, i) => {
        const x = 0.62 + i * (cardW + gap);
        s.addShape(pres.shapes.RECTANGLE, {
            x, y: cardY, w: cardW, h: cardH,
            fill: { color: WHITE },
            line: { color: CARD_LINE, width: 0.75 },
        });
        // "01"
        s.addText(c.n, {
            x: x + 0.25, y: cardY + 0.15, w: 0.7, h: 0.3,
            fontFace: FONT_H, fontSize: 11,
            color: MUTED_2, charSpacing: 3, margin: 0,
        });
        // Maturity dots — 5 dots, filled for "maturity" count
        const dotY = cardY + 0.27;
        const dotR = 0.09;
        const dotGap = 0.03;
        const dotsTotalW = 5 * dotR + 4 * dotGap;
        const dotsStartX = x + cardW - 0.25 - dotsTotalW;
        for (let d = 0; d < 5; d++) {
            const dx = dotsStartX + d * (dotR + dotGap);
            s.addShape(pres.shapes.OVAL, {
                x: dx, y: dotY, w: dotR, h: dotR,
                fill: { color: d < c.maturity ? INK : CREAM },
                line: { color: d < c.maturity ? INK : MUTED_2, width: 0.5 },
            });
        }
        // Title
        s.addText(c.title, {
            x: x + 0.25, y: cardY + 0.52, w: cardW - 0.5, h: 0.45,
            fontFace: FONT_H, fontSize: 20,
            color: INK, margin: 0, valign: "top",
        });
        // Subtitle
        s.addText(c.sub, {
            x: x + 0.25, y: cardY + 1.00, w: cardW - 0.5, h: 0.32,
            fontFace: FONT_B, fontSize: 11,
            color: MUTED, margin: 0, valign: "top",
        });
        // "MATURITY · N /5"
        s.addText(`MATURITY · ${c.maturity} /5`, {
            x: x + 0.25, y: cardY + 1.32, w: cardW - 0.5, h: 0.3,
            fontFace: FONT_H, fontSize: 10,
            color: MUTED_2, charSpacing: 3, margin: 0,
        });
    });

    // Footer caption
    s.addText(
        "Maturity reflects breadth of production deployment across buy- & sell-side, not sophistication of any single model.",
        {
            x: 0.62, y: cardY + cardH + 0.25, w: SW - 1.24, h: 0.4,
            fontFace: FONT_B, fontSize: 11,
            color: MUTED_2, margin: 0, italic: false,
        }
    );
}

// ================================================================
// Zone slides 4-7: helper
// ================================================================
function zoneSlide(pageNum, zoneEyebrow, zoneLabel, headline, activeChips, items) {
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addHeader(s, { eyebrow: zoneEyebrow, pageNum });

    // eyebrow + big headline (left column only)
    s.addText(zoneLabel, {
        x: 0.62, y: 1.22, w: 5.5, h: 0.32,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: INK, charSpacing: 4, margin: 0,
    });
    s.addText(headline, {
        x: 0.62, y: 1.55, w: 5.7, h: 1.9,
        fontFace: FONT_H, fontSize: 30,
        color: INK, margin: 0, valign: "top",
    });

    // thin rule above "ACTIVE IN THE MARKET"
    s.addShape(pres.shapes.LINE, {
        x: 0.62, y: 3.55, w: 5.7, h: 0,
        line: { color: RULE, width: 0.5 },
    });
    s.addText("ACTIVE IN THE MARKET", {
        x: 0.62, y: 3.7, w: 5.5, h: 0.32,
        fontFace: FONT_H, fontSize: 10.5,
        color: MUTED_2, charSpacing: 3, margin: 0,
    });

    // Chips (wrap automatically into rows)
    const chipH = 0.36;
    const chipGap = 0.12;
    const chipPaddingX = 0.22; // horizontal padding inside chip
    const charW = 0.082;        // rough width-per-character estimate @ 10.5pt
    let cx = 0.62, cy = 4.15;
    const chipAreaMaxX = 0.62 + 5.7;
    activeChips.forEach((t) => {
        const w = Math.max(1.35, t.length * charW + chipPaddingX * 2);
        if (cx + w > chipAreaMaxX) {
            cx = 0.62;
            cy += chipH + chipGap;
        }
        addChip(s, cx, cy, w, chipH, t, { color: INK, border: CARD_LINE });
        cx += w + chipGap;
    });

    // Right side: 2x2 grid of cards
    const gridX = 6.62;
    const gridY = 1.1;
    const gridW = SW - gridX - 0.62;
    const gridH = SH - gridY - 0.7;
    const gapX = 0.18, gapY = 0.18;
    const cardW = (gridW - gapX) / 2;
    const cardH = (gridH - gapY) / 2;

    items.forEach((it, i) => {
        const row = Math.floor(i / 2), col = i % 2;
        const x = gridX + col * (cardW + gapX);
        const y = gridY + row * (cardH + gapY);
        s.addShape(pres.shapes.RECTANGLE, {
            x, y, w: cardW, h: cardH,
            fill: { color: WHITE },
            line: { color: CARD_LINE, width: 0.75 },
        });
        // number
        s.addText(it.n, {
            x: x + 0.28, y: y + 0.18, w: 0.7, h: 0.3,
            fontFace: FONT_H, fontSize: 11,
            color: MUTED_2, charSpacing: 3, margin: 0,
        });
        // dash icon (right)
        s.addShape(pres.shapes.LINE, {
            x: x + cardW - 0.55, y: y + 0.33, w: 0.25, h: 0,
            line: { color: MUTED_2, width: 1 },
        });
        // title — tall enough for 2-line titles like "ETF creation / redemption"
        s.addText(it.title, {
            x: x + 0.28, y: y + 0.48, w: cardW - 0.56, h: 0.7,
            fontFace: FONT_H, fontSize: 14.5,
            color: INK, margin: 0, valign: "top",
        });
        // body — 10pt with tight leading so 4-line bodies fit cleanly
        s.addText(it.body, {
            x: x + 0.28, y: y + 1.15, w: cardW - 0.56, h: 1.25,
            fontFace: FONT_B, fontSize: 10,
            color: MUTED, margin: 0, valign: "top",
            paraSpaceAfter: 0,
        });
        // chip tags anchored to bottom of card
        const tagH = 0.32;
        const tagW = Math.min(cardW - 0.56, 2.4);
        const tag2Y = y + cardH - 0.25 - tagH;
        const tag1Y = tag2Y - tagH - 0.08;
        addChip(s, x + 0.28, tag1Y, tagW, tagH, it.tags[0], { color: INK, border: CARD_LINE, tiny: true });
        addChip(s, x + 0.28, tag2Y, tagW, tagH, it.tags[1], { color: INK, border: CARD_LINE, tiny: true });
    });
}

// ---- SLIDE 4 — Zone 01 Pre-Trade ----
zoneSlide(
    "04", "ZONE 01",
    "ZONE 01 · PRE-TRADE",
    "Inferring a price for bonds that rarely trade.",
    ["Bloomberg BVAL", "ICE Continuous", "MarketAxess CP+", "Tradeweb AiPrice", "Overbond", "BondCliQ"],
    [
        {
            n: "01", title: "Evaluated pricing",
            body: "Models ingest TRACE prints, dealer runs and curve moves to produce continuous quotes for thinly-traded CUSIPs.",
            tags: ["GRADIENT BOOSTING", "COMPOSITE FEEDS"],
        },
        {
            n: "02", title: "Liquidity scoring",
            body: "Probability a bond can execute at a given size and spread over a given horizon — sets axes and target lists.",
            tags: ["TRADE-RATE MODELS", "QUOTE-TO-TRADE"],
        },
        {
            n: "03", title: "Axe & inventory matching",
            body: "Ranking dealer axes against client holdings to find natural crosses before either side sends an RFQ.",
            tags: ["HOLDINGS INFERENCE", "HEAT MAPS"],
        },
        {
            n: "04", title: "News & event signals",
            body: "LLMs parse filings, rating actions and earnings to flag spread-moving events and downgrade risk in minutes.",
            tags: ["LLM EXTRACTION", "SENTIMENT"],
        },
    ]
);

// ---- SLIDE 5 — Zone 02 Execution ----
zoneSlide(
    "05", "ZONE 02",
    "ZONE 02 · EXECUTION",
    "Routing the trade to the venue, dealer and protocol most likely to fill it.",
    ["Tradeweb AiEX", "MarketAxess Adaptive Auto-X", "Bloomberg RFQe", "TransFICC", "LTX (Broadridge)", "Trumid"],
    [
        {
            n: "01", title: "Dealer selection",
            body: "Models pick the 3–5 dealers most likely to respond competitively on a given line — cutting information leakage on RFQs.",
            tags: ["WIN-RATE MODELS", "COVER ANALYSIS"],
        },
        {
            n: "02", title: "Protocol routing",
            body: "Deciding between RFQ, portfolio trading, all-to-all and streaming — dynamically, per order and per market state.",
            tags: ["PT VS. LINE-ITEM", "ALL-TO-ALL"],
        },
        {
            n: "03", title: "Execution algos",
            body: "Rates and liquid credit now have TWAP/VWAP-style algos that slice parent orders against CLOB and streaming liquidity.",
            tags: ["RATES ALGOS", "CREDIT SLICERS"],
        },
        {
            n: "04", title: "Auto-execution",
            body: "Sell-side auto-quoters and buy-side auto-ex thresholds execute standard tickets without a human in the loop.",
            tags: ["AUTO-QUOTE", "LOW-TOUCH FLOW"],
        },
    ]
);

// ---- SLIDE 6 — Zone 03 Post-Trade ----
zoneSlide(
    "06", "ZONE 03",
    "ZONE 03 · POST-TRADE",
    "Where AI is quietly removing the most cost — one exception at a time.",
    ["Duco", "Gresham", "Broadridge", "Pirum", "Baton Systems", "Digital Reasoning / Smarsh"],
    [
        {
            n: "01", title: "Fail prediction",
            body: "Classifiers score every trade for settlement-fail risk at booking so ops teams pre-empt rather than chase on T+1.",
            tags: ["CSDR AVOIDANCE", "PRE-STAGING"],
        },
        {
            n: "02", title: "Reconciliation & breaks",
            body: "LLM-assisted matching of confirms, SSIs and allocations reduces the long tail of manual breaks.",
            tags: ["CONFIRMS MATCHING", "BREAK TRIAGE"],
        },
        {
            n: "03", title: "Trade surveillance",
            body: "Voice-to-text plus pattern detection across chat, email and orders flags spoofing, front-running and mis-marking.",
            tags: ["COMMS SURVEILLANCE", "SPOOF DETECTION"],
        },
        {
            n: "04", title: "Collateral optimisation",
            body: "Optimisers pick the cheapest eligible collateral across CCPs and bilateral books under LCR / NSFR constraints.",
            tags: ["CHEAPEST-TO-DELIVER", "LIQUIDITY FORECAST"],
        },
    ]
);

// ---- SLIDE 7 — Zone 04 Portfolio ----
zoneSlide(
    "07", "ZONE 04",
    "ZONE 04 · PORTFOLIO",
    "AI moves upstream from the trader's blotter into the PM's investment process.",
    ["BlackRock Aladdin", "Bloomberg PORT", "MSCI", "MSCI Beon", "Arabesque", "Kensho"],
    [
        {
            n: "01", title: "Portfolio construction",
            body: "Optimisers solve for yield, duration and factor targets while respecting tradability — blending index replication with line-item picks.",
            tags: ["FACTOR TILTS", "TRADABLE OPTIMISERS"],
        },
        {
            n: "02", title: "Relative-value signals",
            body: "Cross-sectional models surface mispriced bonds versus issuer curve, sector peers and synthetic CDS basis.",
            tags: ["CURVE RV", "CASH-CDS BASIS"],
        },
        {
            n: "03", title: "ETF creation / redemption",
            body: "ML picks the basket of bonds most likely to be available and cheapest to source for a given ETF flow.",
            tags: ["CU OPTIMIZATION", "LIQUIDITY BASKETS"],
        },
        {
            n: "04", title: "Research & document AI",
            body: "LLMs compress earnings, rating reports and indenture docs into structured signals the PM can filter on.",
            tags: ["INDENTURE PARSING", "CREDIT SUMMARIES"],
        },
    ]
);

// ================================================================
// SLIDE 8 — Cross-Asset Snapshot heatmap table
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addHeader(s, { eyebrow: "SNAPSHOT", pageNum: "08" });
    addSectionIntro(s, {
        eyebrow: "CROSS-ASSET SNAPSHOT",
        headline: "Maturity is uneven — rates & IG lead, securitized & munis lag.",
        body: "Reading the heatmap tells you where to deploy off-the-shelf, where to build, and where the data simply doesn't exist yet.",
    });

    // Heatmap table
    const headerStyle = {
        bold: false, color: MUTED_2, fontFace: FONT_H,
        fontSize: 10.5, valign: "middle", align: "center",
        charSpacing: 3, fill: { color: CREAM },
        border: [
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
        ],
    };
    const rowLabelStyle = {
        bold: false, color: INK, fontFace: FONT_B,
        fontSize: 13, valign: "middle", align: "center",
        fill: { color: CREAM },
        border: [
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
            { pt: 0.75, color: CARD_LINE },
        ],
    };

    // Cell style as a function of value (1..5) - text only, no heat fill
    // (original renders numbers in black on cream, so we keep it minimalist)
    function cellStyle(v) {
        return {
            bold: false, color: INK, fontFace: FONT_H,
            fontSize: 22, valign: "middle", align: "center",
            fill: { color: CREAM },
            border: [
                { pt: 0.75, color: CARD_LINE },
                { pt: 0.75, color: CARD_LINE },
                { pt: 0.75, color: CARD_LINE },
                { pt: 0.75, color: CARD_LINE },
            ],
        };
    }

    const rows = [
        ["Pre-Trade (Pricing)", 5, 5, 3, 2, 2],
        ["Execution (Algos/RFQ)", 5, 4, 2, 1, 1],
        ["Post-Trade (Ops)", 4, 4, 3, 3, 3],
        ["Portfolio (RV / PM)", 4, 4, 3, 2, 2],
    ];

    const tableRows = [
        [
            { text: "LIFECYCLE\nZONE",   options: headerStyle },
            { text: "RATES / GOVVIES",   options: headerStyle },
            { text: "IG CREDIT",         options: headerStyle },
            { text: "HY / EM",           options: headerStyle },
            { text: "MUNIS",             options: headerStyle },
            { text: "SECURITIZED",       options: headerStyle },
        ],
        ...rows.map(r => [
            { text: r[0], options: rowLabelStyle },
            ...r.slice(1).map(v => ({ text: String(v), options: cellStyle(v) })),
        ]),
    ];

    s.addTable(tableRows, {
        x: 0.62, y: 4.15, w: SW - 1.24,
        colW: [2.5, 2.0, 1.8, 1.8, 1.8, 2.2],
        rowH: [0.55, 0.52, 0.52, 0.52, 0.52],
    });

    // Footer caption + heat scale
    s.addText("1 = experimental · 5 = broadly productionized", {
        x: 0.62, y: 7.0, w: 6, h: 0.3,
        fontFace: FONT_B, fontSize: 10.5,
        color: MUTED_2, margin: 0,
    });

    // LOW .... HIGH indicator at right
    s.addText("LOW", {
        x: SW - 3.6, y: 7.0, w: 0.6, h: 0.3,
        fontFace: FONT_H, fontSize: 10, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle",
    });
    // 5 graduated bars from light to dark
    const barX0 = SW - 2.85;
    const barW = 0.35, barH = 0.14, barGap = 0.06;
    const barColors = ["E8E0CE", "DCD0B5", "B5A888", "857A58", "3C362A"];
    for (let i = 0; i < 5; i++) {
        s.addShape(pres.shapes.RECTANGLE, {
            x: barX0 + i * (barW + barGap), y: 7.08, w: barW, h: barH,
            fill: { color: barColors[i] },
            line: { color: CARD_LINE, width: 0.4 },
        });
    }
    s.addText("HIGH", {
        x: barX0 + 5 * (barW + barGap) + 0.1, y: 7.0, w: 0.7, h: 0.3,
        fontFace: FONT_H, fontSize: 10, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle",
    });
}

// ================================================================
// SLIDE 9 — Where the white space lives (2x3 grid, no borders)
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addHeader(s, { eyebrow: "OPPORTUNITY", pageNum: "09" });
    addSectionIntro(s, {
        eyebrow: "WHERE THE WHITE SPACE LIVES",
        headline: "Six gaps that are still open, ranked by how contested they are.",
        body: "'Open' = few credible incumbents. 'Emerging' = early products, not yet a standard. 'Under-served' = a real need with thin tooling.",
    });

    const items = [
        ["UNDER-SERVED", "Illiquid credit liquidity scoring",       "High-yield, EM and loans still rely on dealer axes and chat; few robust, sell-side-independent liquidity signals exist."],
        ["UNDER-SERVED", "Securitized pre-trade data",              "MBS/ABS/CLO still suffer sparse, heterogeneous data; pricing and pre-trade tooling lag rates by a decade."],
        ["EMERGING",     "Cross-venue smart routing for credit",    "Equities-style SOR for credit across all-to-all, PT and streaming remains nascent — most flow still picks one protocol."],
        ["EMERGING",     "LLM copilots for the trader / PM",        "Natural-language query over holdings, runs and research is moving from demo to desk, but few integrations are production-grade."],
        ["OPEN",         "Post-trade autonomous ops",               "Fail prediction exists; truly autonomous remediation (auto-amend, auto-allocate, auto-repair) is still rare."],
        ["OPEN",         "Explainability for regulated flow",       "Model explainability good enough to survive MiFID/SEC best-ex review is a gating requirement and a moat."],
    ];

    const gridX = 0.62;
    const gridY = 4.2;
    const gridW = SW - 1.24;
    const colGap = 0.4, rowGap = 0.6;
    const cols = 3, rowsN = 2;
    const colW = (gridW - colGap * (cols - 1)) / cols;
    const rowH = (SH - gridY - 0.3 - rowGap) / rowsN;

    // top rule
    s.addShape(pres.shapes.LINE, {
        x: gridX, y: gridY - 0.12, w: gridW, h: 0,
        line: { color: RULE, width: 0.5 },
    });

    items.forEach((it, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const x = gridX + col * (colW + colGap);
        const y = gridY + row * (rowH + rowGap);
        // label eyebrow
        s.addText(it[0], {
            x, y, w: colW, h: 0.3,
            fontFace: FONT_H, fontSize: 10.5, bold: true,
            color: MUTED_2, charSpacing: 3, margin: 0,
        });
        // title
        s.addText(it[1], {
            x, y: y + 0.33, w: colW, h: 0.42,
            fontFace: FONT_H, fontSize: 15,
            color: INK, margin: 0, valign: "top",
        });
        // body — clamp with a smaller font so it never crosses into the row gap
        s.addText(it[2], {
            x, y: y + 0.82, w: colW, h: rowH - 0.82,
            fontFace: FONT_B, fontSize: 11.5,
            color: MUTED, margin: 0, valign: "top",
        });
        // horizontal rule between the two rows, per column
        if (row === 1) {
            s.addShape(pres.shapes.LINE, {
                x, y: y - rowGap / 2, w: colW, h: 0,
                line: { color: RULE, width: 0.5 },
            });
        }
    });
}

// ================================================================
// SLIDE 10 — Takeaway (dark, 2x2)
// ================================================================
{
    const s = pres.addSlide();
    s.background = { color: INK_DEEP };
    addHeader(s, { eyebrow: "TAKEAWAY", pageNum: "10", theme: "dark" });

    s.addText("IMPLICATIONS FOR OUR BUILD", {
        x: 0.62, y: 1.22, w: 8, h: 0.32,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_D2, charSpacing: 4, margin: 0,
    });
    s.addText("Four calls to make before we cut scope.", {
        x: 0.62, y: 1.55, w: 11.5, h: 1.2,
        fontFace: FONT_H, fontSize: 34,
        color: WHITE, margin: 0, valign: "top",
    });

    // 2x2 grid
    const items = [
        {
            label: "BUILD",
            title: "Focus execution on credit RFQ + smart protocol routing.",
            body: "Rates algos are a commodity; credit routing is still a real problem with few credible standalone players.",
        },
        {
            label: "PARTNER",
            title: "Rent evaluated pricing, don't rebuild it.",
            body: "BVAL, ICE and CP+ are mature and expensive to catch. Wire them in as features, differentiate above the curve.",
        },
        {
            label: "BET",
            title: "LLM copilot as the surface, not a sidebar.",
            body: "Natural-language over positions, axes and research is the most plausible new interaction model for traders and PMs.",
        },
        {
            label: "GUARDRAIL",
            title: "Explainability and audit from day one.",
            body: "Best-ex, MiFID and SEC reviews will gate any model touching client flow. Design logs, reason codes and overrides in, not bolted on.",
        },
    ];

    const gridX = 0.62;
    const gridY = 3.05;
    const gridW = SW - 1.24;
    const gridH = SH - gridY - 0.35;
    const cardW = gridW / 2;
    const cardH = gridH / 2;

    // outer frame (thin line box)
    s.addShape(pres.shapes.RECTANGLE, {
        x: gridX, y: gridY, w: gridW, h: gridH,
        fill: { type: "none" },
        line: { color: RULE_D, width: 0.5 },
    });
    // vertical divider
    s.addShape(pres.shapes.LINE, {
        x: gridX + cardW, y: gridY, w: 0, h: gridH,
        line: { color: RULE_D, width: 0.5 },
    });
    // horizontal divider
    s.addShape(pres.shapes.LINE, {
        x: gridX, y: gridY + cardH, w: gridW, h: 0,
        line: { color: RULE_D, width: 0.5 },
    });

    items.forEach((it, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = gridX + col * cardW;
        const y = gridY + row * cardH;
        const pad = 0.42;

        // eyebrow label (centered-ish)
        s.addText(it.label, {
            x: x + pad, y: y + 0.22, w: 1.4, h: 0.3,
            fontFace: FONT_H, fontSize: 10.5, bold: true,
            color: MUTED_D, charSpacing: 4, margin: 0, align: "center",
        });
        // decorative thin rule to the right of label
        s.addShape(pres.shapes.LINE, {
            x: x + pad + 1.5, y: y + 0.37, w: cardW - pad * 2 - 1.5, h: 0,
            line: { color: RULE_D, width: 0.5 },
        });
        // title
        s.addText(it.title, {
            x: x + pad, y: y + 0.6, w: cardW - pad * 2, h: 0.85,
            fontFace: FONT_H, fontSize: 17,
            color: WHITE, margin: 0, valign: "top",
        });
        // body — starts below title, bounded by card bottom
        const bodyY = y + 1.45;
        const bodyH = cardH - 1.55;
        s.addText(it.body, {
            x: x + pad, y: bodyY, w: cardW - pad * 2, h: bodyH,
            fontFace: FONT_B, fontSize: 12,
            color: MUTED_D, margin: 0, valign: "top",
        });
    });
}

// ---------- write ----------
pres.writeFile({ fileName: "/home/assets/AI_Driven_Trading_in_Fixed_Income.pptx" })
    .then(f => console.log("Wrote:", f));
