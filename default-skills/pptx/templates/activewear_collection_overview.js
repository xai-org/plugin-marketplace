// crave_active.js
// Recreates the "Crave Active SS26 / Collection Overview" deck with pptxgenjs.
// Usage: node crave_active.js   →   writes Crave_Active.pptx

const pptxgen = require("pptxgenjs");

// ---------- Design system ----------
const BG        = "0A0A0A";  // slide background (near-black)
const CARD      = "141414";  // card fill
const BORDER    = "2A2A2A";  // hairline border
const RULE      = "2A2A2A";  // thin separator rules
const ACCENT    = "FF4A2E";  // coral / orange-red
const MUTED     = "6B6B6B";  // label / footer gray
const MUTED_2   = "9A9A9A";  // lighter muted
const BODY      = "E8E8E8";  // body text
const WHITE     = "FFFFFF";

const FONT_H    = "Helvetica";
const FONT_B    = "Helvetica";

// Slide size = LAYOUT_WIDE: 13.333" × 7.5"
const SW = 13.333;
const SH = 7.5;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Crave Active — SS26 Collection Overview";
pres.author = "Crave Active";

// ---------- Shared helpers ----------
function addBackground(slide) {
    slide.background = { color: BG };
}

// Top header bar: brand (left) · section (center) · page N / 10 (right)
function addHeader(slide, section, pageNum) {
    // Circled X mark (approximated with a ring + an X made of two thin lines)
    const cx = 0.65, cy = 0.78, r = 0.12;
    slide.addShape(pres.shapes.OVAL, {
        x: cx - r, y: cy - r, w: r * 2, h: r * 2,
        fill: { type: "none" },
        line: { color: MUTED, width: 0.75 }
    });
    // X inside the circle (two diagonal lines)
    const d = r * 0.55;
    slide.addShape(pres.shapes.LINE, {
        x: cx - d, y: cy - d, w: d * 2, h: d * 2,
        line: { color: MUTED, width: 0.75 }
    });
    slide.addShape(pres.shapes.LINE, {
        x: cx - d, y: cy + d, w: d * 2, h: -d * 2,
        line: { color: MUTED, width: 0.75 }
    });

    // Brand wordmark
    slide.addText("CRAVE ACTIVE", {
        x: 0.95, y: 0.55, w: 3.5, h: 0.45,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });

    // Section label (centered)
    slide.addText(section, {
        x: SW / 2 - 3, y: 0.55, w: 6, h: 0.45,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, align: "center", margin: 0, valign: "middle"
    });

    // Page indicator
    slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
        x: SW - 2.1, y: 0.55, w: 1.8, h: 0.45,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, align: "right", margin: 0, valign: "middle"
    });
}

// Small filled orange square used as a bullet/marker
function addSquareMarker(slide, x, y, size = 0.09) {
    slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w: size, h: size,
        fill: { color: ACCENT }, line: { type: "none" }
    });
}

// ===================================================================
// SLIDE 1 — Cover
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "SS26 / COLLECTION OVERVIEW", 1);

    // Big wordmark: "CRAVE ACTIVE." with ACTIVE. in coral
    s.addText(
        [
            { text: "CRAVE ",   options: { color: WHITE,  bold: true } },
            { text: "ACTIVE.",  options: { color: ACCENT, bold: true } },
        ],
        {
            x: 0.85, y: 2.1, w: 12, h: 1.8,
            fontFace: FONT_H, fontSize: 110, margin: 0, valign: "top"
        }
    );

    // Tagline
    s.addText("Activewear engineered for\nappetite.", {
        x: 0.85, y: 4.55, w: 6, h: 1.1,
        fontFace: FONT_B, fontSize: 22, color: BODY, margin: 0, valign: "top"
    });

    // Footer row
    s.addText("MEN'S + WOMEN'S / APRIL 2026", {
        x: 0.85, y: 6.75, w: 6, h: 0.4,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });
    s.addText("01 / 10", {
        x: SW - 2.1, y: 6.75, w: 1.8, h: 0.4,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, align: "right", margin: 0, valign: "middle"
    });
}

// ===================================================================
// SLIDE 2 — The Brand / Manifesto
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "THE BRAND", 2);

    // Section tag
    s.addText(
        [
            { text: "01 — ", options: { color: ACCENT } },
            { text: "MANIFESTO", options: { color: ACCENT } },
        ],
        {
            x: 0.85, y: 1.8, w: 6, h: 0.4,
            fontFace: FONT_H, fontSize: 12, bold: true, charSpacing: 3,
            margin: 0, valign: "middle"
        }
    );

    // Headline: Movement, with appetite.
    s.addText(
        [
            { text: "Movement, ", options: { color: WHITE,   bold: true } },
            { text: "with\n",      options: { color: MUTED_2, bold: true } },
            { text: "appetite.",   options: { color: ACCENT,  bold: true } },
        ],
        {
            x: 0.85, y: 2.35, w: 6.5, h: 2.6,
            fontFace: FONT_H, fontSize: 56, margin: 0, valign: "top"
        }
    );

    // Body paragraph
    s.addText(
        "Crave Active makes training kit for people who show up hungry — for the next rep, the next mile, the next morning.",
        {
            x: 0.85, y: 5.45, w: 5.6, h: 1.4,
            fontFace: FONT_B, fontSize: 14, color: MUTED_2, margin: 0, valign: "top"
        }
    );

    // Info grid on right — 5 rows: FOUNDED / CATEGORIES / GENDER / PRICE POINT / CHANNELS
    const rows = [
        ["FOUNDED",     "2024 / Portland, OR"],
        ["CATEGORIES",  "Run. Train. Lift. Yoga."],
        ["GENDER",      "Men's + Women's, parallel lines"],
        ["PRICE POINT", "Premium performance"],
        ["CHANNELS",    "DTC, wholesale, flagship"],
    ];
    const gx = 7.2, gw = 5.4, gy0 = 2.35, rowH = 0.78;
    // Top rule
    s.addShape(pres.shapes.LINE, {
        x: gx, y: gy0, w: gw, h: 0,
        line: { color: RULE, width: 0.75 }
    });
    rows.forEach(([label, value], i) => {
        const y = gy0 + i * rowH;
        s.addText(label, {
            x: gx, y: y + 0.05, w: 1.75, h: rowH - 0.1,
            fontFace: FONT_H, fontSize: 10, bold: true,
            color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
        });
        s.addText(value, {
            x: gx + 1.8, y: y + 0.05, w: gw - 1.8, h: rowH - 0.1,
            fontFace: FONT_B, fontSize: 15, color: BODY, margin: 0, valign: "middle"
        });
        // Bottom rule for each row
        s.addShape(pres.shapes.LINE, {
            x: gx, y: y + rowH, w: gw, h: 0,
            line: { color: RULE, width: 0.75 }
        });
    });
}

// ===================================================================
// SLIDE 3 — Built for both
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "BUILT FOR BOTH", 3);

    // Headline
    s.addText(
        [
            { text: "Built for both. ", options: { color: WHITE,   bold: true } },
            { text: "Equally.",         options: { color: MUTED_2, bold: true } },
        ],
        {
            x: 0.85, y: 1.35, w: 12, h: 0.9,
            fontFace: FONT_H, fontSize: 44, margin: 0, valign: "top"
        }
    );

    // Subhead
    s.addText(
        "Every style ships in parallel men's and women's constructions —\nsame fabrics, same drop dates, same shelf space.",
        {
            x: 0.85, y: 2.35, w: 10, h: 1.0,
            fontFace: FONT_B, fontSize: 15, color: MUTED_2, margin: 0, valign: "top"
        }
    );

    // Two editorial hero placeholders
    const cardY = 3.55, cardH = 2.9;
    const cardW = 5.85;
    const leftX = 0.85, rightX = SW - 0.85 - cardW;

    // Left card (women's)
    s.addShape(pres.shapes.RECTANGLE, {
        x: leftX, y: cardY, w: cardW, h: cardH,
        fill: { color: CARD }, line: { color: BORDER, width: 0.75 }
    });
    // Marker + label on left card
    addSquareMarker(s, leftX + 0.3, cardY + cardH - 0.45, 0.1);
    s.addText("WOMEN'S EDITORIAL — HERO", {
        x: leftX + 0.5, y: cardY + cardH - 0.65, w: cardW - 0.6, h: 0.4,
        fontFace: FONT_H, fontSize: 10, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });

    // Right card (men's)
    s.addShape(pres.shapes.RECTANGLE, {
        x: rightX, y: cardY, w: cardW, h: cardH,
        fill: { color: CARD }, line: { color: BORDER, width: 0.75 }
    });
    addSquareMarker(s, rightX + 0.3, cardY + cardH - 0.45, 0.1);
    s.addText("MEN'S EDITORIAL — HERO", {
        x: rightX + 0.5, y: cardY + cardH - 0.65, w: cardW - 0.6, h: 0.4,
        fontFace: FONT_H, fontSize: 10, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });

    // Labels beneath cards
    const labY = cardY + cardH + 0.15;
    s.addText("WOMEN'S", {
        x: leftX, y: labY, w: 2.5, h: 0.35,
        fontFace: FONT_H, fontSize: 13, bold: true,
        color: WHITE, charSpacing: 2, margin: 0, valign: "middle"
    });
    s.addText("42 styles · XXS–XXL", {
        x: leftX + cardW - 2.6, y: labY, w: 2.5, h: 0.35,
        fontFace: FONT_B, fontSize: 13, color: MUTED_2,
        align: "right", margin: 0, valign: "middle"
    });
    s.addText("MEN'S", {
        x: rightX, y: labY, w: 2.5, h: 0.35,
        fontFace: FONT_H, fontSize: 13, bold: true,
        color: WHITE, charSpacing: 2, margin: 0, valign: "middle"
    });
    s.addText("38 styles · XS–XXXL", {
        x: rightX + cardW - 2.6, y: labY, w: 2.5, h: 0.35,
        fontFace: FONT_B, fontSize: 13, color: MUTED_2,
        align: "right", margin: 0, valign: "middle"
    });
}

// ===================================================================
// Product-grid slide builder (used for slides 4 + 5)
// ===================================================================
function productGridSlide(opts) {
    const { section, pageNum, headTitle, headCount, dropLabel, items, footerLeft, footerRight } = opts;
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, section, pageNum);

    // Big headline: "Women's / 42 styles" (count in coral)
    s.addText(
        [
            { text: `${headTitle} / `, options: { color: WHITE,  bold: true } },
            { text: headCount,          options: { color: ACCENT, bold: true } },
        ],
        {
            x: 0.85, y: 1.25, w: 8, h: 1.1,
            fontFace: FONT_H, fontSize: 48, margin: 0, valign: "top"
        }
    );
    // Drop label next to headline (small caps)
    s.addText(dropLabel, {
        x: 7.4, y: 1.55, w: 3.5, h: 0.5,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });

    // Four product cards
    const cardY = 2.5, cardH = 3.3;
    const gap = 0.18;
    const leftMargin = 0.85, rightMargin = 0.85;
    const totalW = SW - leftMargin - rightMargin;
    const cardW = (totalW - gap * 3) / 4;

    items.forEach((it, i) => {
        const cx = leftMargin + i * (cardW + gap);
        // Card
        s.addShape(pres.shapes.RECTANGLE, {
            x: cx, y: cardY, w: cardW, h: cardH,
            fill: { color: CARD }, line: { color: BORDER, width: 0.75 }
        });
        // Code marker + code
        addSquareMarker(s, cx + 0.25, cardY + cardH - 0.5, 0.1);
        s.addText(it.code, {
            x: cx + 0.45, y: cardY + cardH - 0.7, w: cardW - 0.5, h: 0.4,
            fontFace: FONT_H, fontSize: 11, bold: true,
            color: MUTED_2, charSpacing: 2, margin: 0, valign: "middle"
        });

        // Below card: title / desc / price
        const textY = cardY + cardH + 0.22;
        s.addText(it.title, {
            x: cx, y: textY, w: cardW, h: 0.38,
            fontFace: FONT_H, fontSize: 15, bold: true,
            color: WHITE, margin: 0, valign: "top"
        });
        s.addText(it.desc, {
            x: cx, y: textY + 0.4, w: cardW, h: 0.35,
            fontFace: FONT_B, fontSize: 12, color: MUTED_2, margin: 0, valign: "top"
        });
        s.addText(it.price, {
            x: cx, y: textY + 0.75, w: cardW, h: 0.4,
            fontFace: FONT_H, fontSize: 15, bold: true,
            color: ACCENT, margin: 0, valign: "top"
        });
    });

    // Bottom rule + footer row
    const footerY = cardY + cardH + 1.7;
    s.addShape(pres.shapes.LINE, {
        x: leftMargin, y: footerY, w: totalW, h: 0,
        line: { color: RULE, width: 0.75 }
    });
    s.addText(footerLeft, {
        x: leftMargin, y: footerY + 0.1, w: 7, h: 0.35,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });
    s.addText(footerRight, {
        x: SW - rightMargin - 5, y: footerY + 0.1, w: 5, h: 0.35,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, align: "right", margin: 0, valign: "middle"
    });
}

// ===================================================================
// SLIDE 4 — Women's line
// ===================================================================
productGridSlide({
    section: "WOMEN'S LINE",
    pageNum: 4,
    headTitle: "Women's",
    headCount: "42 styles",
    dropLabel: "SS26 — DROP 01",
    items: [
        { code: "W-01", title: "Crave Crop",     desc: "Light support bra", price: "$58" },
        { code: "W-02", title: "Ascent Legging", desc: "7/8 high-rise",     price: "$98" },
        { code: "W-03", title: "Sprint Short",   desc: "3\" lined",         price: "$62" },
        { code: "W-04", title: "Rally Tank",     desc: "Longline vented",   price: "$52" },
    ],
    footerLeft: "CORE — BRAS / BOTTOMS / TOPS / OUTER",
    footerRight: "+ 38 MORE IN LINE SHEET",
});

// ===================================================================
// SLIDE 5 — Men's line
// ===================================================================
productGridSlide({
    section: "MEN'S LINE",
    pageNum: 5,
    headTitle: "Men's",
    headCount: "38 styles",
    dropLabel: "SS26 — DROP 01",
    items: [
        { code: "M-01", title: "Mile Tee",    desc: "Vented short-sleeve", price: "$48"  },
        { code: "M-02", title: "Base Tight",  desc: "9\" compression",     price: "$72"  },
        { code: "M-03", title: "Pace Short",  desc: "5\" lined",           price: "$64"  },
        { code: "M-04", title: "Block Hoodie",desc: "Light training",      price: "$118" },
    ],
    footerLeft: "CORE — TOPS / SHORTS / TIGHTS / OUTER",
    footerRight: "+ 34 MORE IN LINE SHEET",
});

// ===================================================================
// SLIDE 6 — Fabric & Construction
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "FABRIC & CONSTRUCTION", 6);

    // Headline
    s.addText(
        [
            { text: "Four fabrics. ", options: { color: WHITE,   bold: true } },
            { text: "One system.",    options: { color: MUTED_2, bold: true } },
        ],
        {
            x: 0.85, y: 1.3, w: 12, h: 1.0,
            fontFace: FONT_H, fontSize: 44, margin: 0, valign: "top"
        }
    );

    // Column layout x-positions & widths
    const col = {
        code:    { x: 0.85, w: 0.9  },
        fabric:  { x: 1.8,  w: 2.6  },
        comp:    { x: 4.4,  w: 3.3  },
        blend:   { x: 7.75, w: 1.6  },
        char:    { x: 9.45, w: 3.3  },
    };

    // Table boundaries
    const tableLeft  = 0.85;
    const tableRight = SW - 0.6;
    const tableW     = tableRight - tableLeft;

    // Header row
    const headY = 2.7;
    const headH = 0.4;
    s.addText("CODE",        { x: col.code.x,   y: headY, w: col.code.w,   h: headH, fontFace: FONT_H, fontSize: 10, bold: true, color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle" });
    s.addText("FABRIC",      { x: col.fabric.x, y: headY, w: col.fabric.w, h: headH, fontFace: FONT_H, fontSize: 10, bold: true, color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle" });
    s.addText("COMPOSITION", { x: col.comp.x,   y: headY, w: col.comp.w,   h: headH, fontFace: FONT_H, fontSize: 10, bold: true, color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle" });
    s.addText("BLEND",       { x: col.blend.x,  y: headY, w: col.blend.w,  h: headH, fontFace: FONT_H, fontSize: 10, bold: true, color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle" });
    s.addText("CHARACTER",   { x: col.char.x,   y: headY, w: col.char.w,   h: headH, fontFace: FONT_H, fontSize: 10, bold: true, color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle" });

    // Rule below header
    s.addShape(pres.shapes.LINE, {
        x: tableLeft, y: headY + headH + 0.08, w: tableW, h: 0,
        line: { color: RULE, width: 0.75 }
    });

    // Rows
    const rows = [
        ["F-01", "CRAVEKNIT™", "Recycled nylon / elastane",   "78/22",  "4-way stretch"],
        ["F-02", "RUNWEAVE",   "Recycled polyester mesh",     "100%",   "Vented, anti-cling"],
        ["F-03", "CORESOFT",   "Modal / cotton / elastane",   "60/35/5","Everyday, brushed hand"],
        ["F-04", "STORMSHELL", "Recycled nylon ripstop",      "100%",   "DWR, wind-resistant"],
    ];
    const rowY0 = 3.3;
    const rowH  = 0.82;

    rows.forEach((r, i) => {
        const y = rowY0 + i * rowH;
        // Code (coral)
        s.addText(r[0], {
            x: col.code.x, y, w: col.code.w, h: rowH - 0.1,
            fontFace: FONT_H, fontSize: 11, bold: true,
            color: ACCENT, charSpacing: 2, margin: 0, valign: "middle"
        });
        // Fabric (big white)
        s.addText(r[1], {
            x: col.fabric.x, y, w: col.fabric.w, h: rowH - 0.1,
            fontFace: FONT_H, fontSize: 22, bold: true,
            color: WHITE, margin: 0, valign: "middle"
        });
        // Composition (muted)
        s.addText(r[2], {
            x: col.comp.x, y, w: col.comp.w, h: rowH - 0.1,
            fontFace: FONT_B, fontSize: 13, color: MUTED_2, margin: 0, valign: "middle"
        });
        // Blend (white)
        s.addText(r[3], {
            x: col.blend.x, y, w: col.blend.w, h: rowH - 0.1,
            fontFace: FONT_H, fontSize: 13, bold: true,
            color: BODY, margin: 0, valign: "middle"
        });
        // Character (muted)
        s.addText(r[4], {
            x: col.char.x, y, w: col.char.w, h: rowH - 0.1,
            fontFace: FONT_B, fontSize: 13, color: MUTED_2, margin: 0, valign: "middle"
        });

        // Separator rule below each row
        s.addShape(pres.shapes.LINE, {
            x: tableLeft, y: y + rowH, w: tableW, h: 0,
            line: { color: RULE, width: 0.75 }
        });
    });
}

// ===================================================================
// SLIDE 7 — Fit system
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "FIT SYSTEM", 7);

    // Headline
    s.addText(
        [
            { text: "Three fits, ",           options: { color: WHITE,   bold: true } },
            { text: "shared across genders.", options: { color: MUTED_2, bold: true } },
        ],
        {
            x: 0.85, y: 1.25, w: 12, h: 1.0,
            fontFace: FONT_H, fontSize: 40, margin: 0, valign: "top"
        }
    );

    // Sub-paragraph
    s.addText(
        "A customer learns the fit once and can shop the entire line — men's and women's\n— with the same expectation.",
        {
            x: 0.85, y: 2.3, w: 10, h: 1.0,
            fontFace: FONT_B, fontSize: 14, color: MUTED_2, margin: 0, valign: "top"
        }
    );

    // Three cards
    const fits = [
        { tag: "FIT / 01", n: "01 /03", name: "COMPRESSION", desc: "Second-skin",    built: "Lift, Run, HIIT" },
        { tag: "FIT / 02", n: "02 /03", name: "PERFORMANCE", desc: "Athletic fit",   built: "Train, Yoga" },
        { tag: "FIT / 03", n: "03 /03", name: "RELAXED",     desc: "Straight through", built: "Recover, Everyday" },
    ];
    const cardY = 3.55, cardH = 3.4;
    const gap = 0.22;
    const leftMargin = 0.85, rightMargin = 0.85;
    const totalW = SW - leftMargin - rightMargin;
    const cardW = (totalW - gap * 2) / 3;

    fits.forEach((f, i) => {
        const cx = leftMargin + i * (cardW + gap);
        // Card
        s.addShape(pres.shapes.RECTANGLE, {
            x: cx, y: cardY, w: cardW, h: cardH,
            fill: { color: CARD }, line: { color: BORDER, width: 0.75 }
        });
        // Top row: tag (left) / nn of 03 (right)
        s.addText(f.tag, {
            x: cx + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.4,
            fontFace: FONT_H, fontSize: 12, bold: true,
            color: ACCENT, charSpacing: 2, margin: 0, valign: "middle"
        });
        s.addText(f.n, {
            x: cx + 0.3, y: cardY + 0.3, w: cardW - 0.6, h: 0.4,
            fontFace: FONT_H, fontSize: 11, color: MUTED_2,
            align: "right", margin: 0, valign: "middle"
        });

        // Name + descriptor
        s.addText(f.name, {
            x: cx + 0.3, y: cardY + 0.95, w: cardW - 0.6, h: 0.55,
            fontFace: FONT_H, fontSize: 22, bold: true,
            color: WHITE, charSpacing: 1, margin: 0, valign: "top"
        });
        s.addText(f.desc, {
            x: cx + 0.3, y: cardY + 1.6, w: cardW - 0.6, h: 0.4,
            fontFace: FONT_B, fontSize: 15, color: BODY, margin: 0, valign: "top"
        });

        // Thin divider near lower section
        s.addShape(pres.shapes.LINE, {
            x: cx + 0.3, y: cardY + cardH - 1.0, w: cardW - 0.6, h: 0,
            line: { color: RULE, width: 0.75 }
        });

        // BUILT FOR label + value
        s.addText("BUILT FOR", {
            x: cx + 0.3, y: cardY + cardH - 0.85, w: cardW - 0.6, h: 0.3,
            fontFace: FONT_H, fontSize: 10, bold: true,
            color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
        });
        s.addText(f.built, {
            x: cx + 0.3, y: cardY + cardH - 0.5, w: cardW - 0.6, h: 0.35,
            fontFace: FONT_B, fontSize: 14, color: WHITE, margin: 0, valign: "middle"
        });
    });
}

// ===================================================================
// SLIDE 8 — Collection pricing
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "COLLECTION PRICING", 8);

    // Headline
    s.addText(
        [
            { text: "Premium, ",    options: { color: WHITE,   bold: true } },
            { text: "not precious.", options: { color: MUTED_2, bold: true } },
        ],
        {
            x: 0.85, y: 1.2, w: 7.0, h: 1.0,
            fontFace: FONT_H, fontSize: 40, margin: 0, valign: "top"
        }
    );

    // Subhead (right side, below title band)
    s.addText(
        "Priced to sit above mass performance brands and below\nluxury athleisure.",
        {
            x: 8.1, y: 1.55, w: 4.7, h: 1.0,
            fontFace: FONT_B, fontSize: 13, color: MUTED_2, margin: 0, valign: "top"
        }
    );

    // Table columns
    const tableLeft  = 0.85;
    const tableRight = SW - 0.6;
    const tableW     = tableRight - tableLeft;

    const col = {
        cat:   { x: 0.85, w: 4.8, align: "left"  },
        low:   { x: 5.5,  w: 1.8, align: "right" },
        high:  { x: 7.4,  w: 1.8, align: "right" },
        avg:   { x: 9.3,  w: 1.8, align: "right" },
        skus:  { x: 11.2, w: 1.55, align: "right" },
    };

    // Header row
    const headY = 2.85, headH = 0.4;
    const headers = [
        ["CATEGORY", col.cat],
        ["LOW",      col.low],
        ["HIGH",     col.high],
        ["AVG",      col.avg],
        ["SKUS",     col.skus],
    ];
    headers.forEach(([t, c]) => {
        s.addText(t, {
            x: c.x, y: headY, w: c.w, h: headH,
            fontFace: FONT_H, fontSize: 10, bold: true,
            color: MUTED_2, charSpacing: 3,
            align: c.align, margin: 0, valign: "middle"
        });
    });
    // Rule under header
    s.addShape(pres.shapes.LINE, {
        x: tableLeft, y: headY + headH + 0.05, w: tableW, h: 0,
        line: { color: RULE, width: 0.75 }
    });

    // Data rows
    const rows = [
        ["Tops",        "$38", "$72",  "$52",  "80"],
        ["Bottoms",     "$58", "$118", "$88",  "64"],
        ["Outer",       "$98", "$188", "$148", "22"],
        ["Bras",        "$48", "$78",  "$62",  "18"],
        ["Accessories", "$18", "$48",  "$32",  "12"],
    ];
    const rowY0 = 3.45, rowH = 0.72;

    rows.forEach((r, i) => {
        const y = rowY0 + i * rowH;
        // Category (white, larger)
        s.addText(r[0], {
            x: col.cat.x, y, w: col.cat.w, h: rowH - 0.05,
            fontFace: FONT_B, fontSize: 18, color: WHITE, margin: 0, valign: "middle"
        });
        // LOW (white bold)
        s.addText(r[1], {
            x: col.low.x, y, w: col.low.w, h: rowH - 0.05,
            fontFace: FONT_H, fontSize: 18, bold: true,
            color: WHITE, align: "right", margin: 0, valign: "middle"
        });
        // HIGH (white bold)
        s.addText(r[2], {
            x: col.high.x, y, w: col.high.w, h: rowH - 0.05,
            fontFace: FONT_H, fontSize: 18, bold: true,
            color: WHITE, align: "right", margin: 0, valign: "middle"
        });
        // AVG (coral bold)
        s.addText(r[3], {
            x: col.avg.x, y, w: col.avg.w, h: rowH - 0.05,
            fontFace: FONT_H, fontSize: 18, bold: true,
            color: ACCENT, align: "right", margin: 0, valign: "middle"
        });
        // SKUS (muted)
        s.addText(r[4], {
            x: col.skus.x, y, w: col.skus.w, h: rowH - 0.05,
            fontFace: FONT_B, fontSize: 18, color: MUTED_2,
            align: "right", margin: 0, valign: "middle"
        });

        // Separator rule after each row
        s.addShape(pres.shapes.LINE, {
            x: tableLeft, y: y + rowH, w: tableW, h: 0,
            line: { color: RULE, width: 0.75 }
        });
    });
}

// ===================================================================
// SLIDE 9 — Drop calendar
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "DROP CALENDAR", 9);

    // Headline
    s.addText(
        [
            { text: "Four drops, ", options: { color: WHITE,   bold: true } },
            { text: "one rhythm.",  options: { color: MUTED_2, bold: true } },
        ],
        {
            x: 0.85, y: 1.3, w: 12, h: 1.0,
            fontFace: FONT_H, fontSize: 44, margin: 0, valign: "top"
        }
    );

    // Four drop cards
    const drops = [
        { code: "D-01", t1: "Core",    t2: "Spring",     desc: "Foundation in both lines",             date: "APR 2026", status: "LIVE",    isLive: true  },
        { code: "D-02", t1: "Summer",  t2: "Vents",      desc: "Warm-weather running &\ntraining",     date: "JUN 2026", status: "QUEUED",  isLive: false },
        { code: "D-03", t1: "Fall",    t2: "Transition", desc: "Layers, mid-weight fleece",            date: "SEP 2026", status: "DESIGN",  isLive: false },
        { code: "D-04", t1: "Holiday", t2: "Edition",    desc: "Limited colorway, collab TBA",         date: "NOV 2026", status: "CONCEPT", isLive: false },
    ];

    const cardY = 2.75, cardH = 4.2;
    const gap = 0.2;
    const leftMargin = 0.85, rightMargin = 0.85;
    const totalW = SW - leftMargin - rightMargin;
    const cardW = (totalW - gap * 3) / 4;

    drops.forEach((d, i) => {
        const cx = leftMargin + i * (cardW + gap);
        // Card
        s.addShape(pres.shapes.RECTANGLE, {
            x: cx, y: cardY, w: cardW, h: cardH,
            fill: { color: CARD }, line: { color: BORDER, width: 0.75 }
        });
        // Top accent line: coral for LIVE (first card), gray for the others
        const topLineColor = d.isLive ? ACCENT : MUTED;
        const topLineW = d.isLive ? 1.5 : 0.75;
        s.addShape(pres.shapes.LINE, {
            x: cx, y: cardY, w: cardW, h: 0,
            line: { color: topLineColor, width: topLineW }
        });

        // Code
        s.addText(d.code, {
            x: cx + 0.3, y: cardY + 0.28, w: cardW - 0.6, h: 0.35,
            fontFace: FONT_H, fontSize: 12, bold: true,
            color: ACCENT, charSpacing: 2, margin: 0, valign: "middle"
        });
        // Two-line title
        s.addText(`${d.t1}\n${d.t2}`, {
            x: cx + 0.3, y: cardY + 0.75, w: cardW - 0.6, h: 1.3,
            fontFace: FONT_H, fontSize: 26, bold: true,
            color: WHITE, margin: 0, valign: "top"
        });
        // Description
        s.addText(d.desc, {
            x: cx + 0.3, y: cardY + 2.15, w: cardW - 0.6, h: 1.0,
            fontFace: FONT_B, fontSize: 13, color: MUTED_2, margin: 0, valign: "top"
        });

        // Bottom divider
        s.addShape(pres.shapes.LINE, {
            x: cx + 0.3, y: cardY + cardH - 0.75, w: cardW - 0.6, h: 0,
            line: { color: RULE, width: 0.75 }
        });
        // Footer row: date left / status right
        s.addText(d.date, {
            x: cx + 0.3, y: cardY + cardH - 0.6, w: (cardW - 0.6) / 2, h: 0.4,
            fontFace: FONT_H, fontSize: 11, bold: true,
            color: MUTED_2, charSpacing: 2, margin: 0, valign: "middle"
        });
        s.addText(d.status, {
            x: cx + 0.3 + (cardW - 0.6) / 2, y: cardY + cardH - 0.6,
            w: (cardW - 0.6) / 2, h: 0.4,
            fontFace: FONT_H, fontSize: 11, bold: true,
            color: d.isLive ? ACCENT : MUTED_2, charSpacing: 2,
            align: "right", margin: 0, valign: "middle"
        });
    });
}

// ===================================================================
// SLIDE 10 — Closing / Next steps
// ===================================================================
{
    const s = pres.addSlide();
    addBackground(s);
    addHeader(s, "NEXT STEPS", 10);

    // Tag
    s.addText("— CLOSE", {
        x: 0.85, y: 1.8, w: 4, h: 0.4,
        fontFace: FONT_H, fontSize: 12, bold: true,
        color: ACCENT, charSpacing: 3, margin: 0, valign: "middle"
    });

    // Big close line
    s.addText(
        [
            { text: "Stock the ", options: { color: WHITE,  bold: true } },
            { text: "line.",      options: { color: ACCENT, bold: true } },
        ],
        {
            x: 0.85, y: 2.3, w: 12, h: 1.5,
            fontFace: FONT_H, fontSize: 90, margin: 0, valign: "top"
        }
    );

    // Horizontal rule before contact grid
    s.addShape(pres.shapes.LINE, {
        x: 0.85, y: 5.35, w: SW - 1.7, h: 0,
        line: { color: RULE, width: 0.75 }
    });

    // Contact grid: three columns
    const contacts = [
        { label: "LINE SHEET", value: "sales@craveactive.co" },
        { label: "SHOWROOM",   value: "Portland / New York"  },
        { label: "WEB",        value: "craveactive.co"       },
    ];
    const colX = [0.85, 5.3, 9.75];
    contacts.forEach((c, i) => {
        s.addText(c.label, {
            x: colX[i], y: 5.55, w: 4, h: 0.35,
            fontFace: FONT_H, fontSize: 11, bold: true,
            color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
        });
        s.addText(c.value, {
            x: colX[i], y: 5.95, w: 4, h: 0.45,
            fontFace: FONT_B, fontSize: 17, color: WHITE, margin: 0, valign: "middle"
        });
    });

    // Bottom footer
    s.addText("CRAVE ACTIVE / SS26", {
        x: 0.85, y: 6.85, w: 6, h: 0.4,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, margin: 0, valign: "middle"
    });
    s.addText("END OF DECK", {
        x: SW - 4, y: 6.85, w: 3.35, h: 0.4,
        fontFace: FONT_H, fontSize: 11, bold: true,
        color: MUTED_2, charSpacing: 3, align: "right", margin: 0, valign: "middle"
    });
}

// Write the file
pres.writeFile({ fileName: "Crave_Active.pptx" })
    .then((fn) => console.log("Wrote:", fn));
