// build_deck.js
// Recreates "District Student Transit — Company Overview" deck using pptxgenjs.
// Run:  node build_deck.js
// Output: District_Transportation_1.pptx

const pptxgen = require("pptxgenjs");

// ---------- Palette ----------
const COLOR_CREAM      = "F4EFE6"; // page background
const COLOR_NAVY       = "162B44"; // dark panels / dark slides
const COLOR_RUST       = "B4502E"; // accent (rust / terracotta)
const COLOR_RUST_SOFT  = "D98E6E"; // lighter rust (on dark bg)
const COLOR_INK        = "1E1D1B"; // near-black for body on cream
const COLOR_INK_SOFT   = "5C554F"; // muted body text on cream
const COLOR_HAIRLINE   = "C9BEA8"; // hairline dividers on cream
const COLOR_HAIRLINE_D = "2E4057"; // hairline dividers on navy
const COLOR_MUTED_DARK = "8A97A8"; // muted text on navy
const COLOR_CREAM_DIM  = "E5DECF"; // placeholder image tiles
const COLOR_CREAM_2    = "EBE2D0"; // slightly warmer cream (photo tile fill)

// ---------- Fonts ----------
const FONT_SERIF = "Georgia";            // headlines, big numbers, body display
const FONT_MONO  = "Consolas";           // eyebrow labels, footers, small caps feel
const FONT_SANS  = "Calibri";            // secondary body text

// ---------- Layout (matches original 20 x 11.25) ----------
const SW = 20;       // slide width in inches
const SH = 11.25;    // slide height in inches

// ---------- Instance ----------
const pres = new pptxgen();
pres.defineLayout({ name: "CUSTOM_20x11_25", width: SW, height: SH });
pres.layout = "CUSTOM_20x11_25";
pres.title = "District Student Transit — Company Overview";
pres.author = "District Student Transit";

// ---------- Shared helpers ----------

// Header/wordmark (top-left), variant for cream or navy backgrounds
function addWordmark(slide, onDark = false) {
    const titleColor = onDark ? "FFFFFF" : COLOR_INK;
    // Small rust square
    slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.95, y: 0.55, w: 0.22, h: 0.22,
        fill: { color: COLOR_RUST }, line: { color: COLOR_RUST, width: 0 }
    });
    // Wordmark
    slide.addText("DISTRICT STUDENT TRANSIT", {
        x: 1.3, y: 0.45, w: 6, h: 0.4,
        fontFace: FONT_MONO, fontSize: 14, bold: true,
        color: titleColor, charSpacing: 3, valign: "middle", margin: 0
    });
}

// Top-right eyebrow breadcrumb, e.g. "02 · AT A GLANCE"
function addBreadcrumb(slide, text, onDark = false) {
    slide.addText(text, {
        x: SW - 8.0 - 0.95, y: 0.45, w: 8.0, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: onDark ? COLOR_MUTED_DARK : COLOR_INK_SOFT,
        charSpacing: 3, align: "right", valign: "middle", margin: 0
    });
}

// Bottom-left tagline + bottom-right "NN / 11" pager
function addFooter(slide, leftText, pageNum, onDark = false) {
    const footerY = SH - 0.75;
    slide.addText(leftText, {
        x: 0.95, y: footerY, w: 10, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: onDark ? COLOR_MUTED_DARK : COLOR_INK_SOFT,
        charSpacing: 1, valign: "middle", margin: 0
    });
    slide.addText(`${String(pageNum).padStart(2, "0")} / 11`, {
        x: SW - 3.0 - 0.95, y: footerY, w: 3.0, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: onDark ? COLOR_MUTED_DARK : COLOR_INK_SOFT,
        charSpacing: 1, align: "right", valign: "middle", margin: 0
    });
}

// A full-width thin hairline
function addHairline(slide, x, y, w, color = COLOR_HAIRLINE) {
    slide.addShape(pres.shapes.LINE, {
        x: x, y: y, w: w, h: 0,
        line: { color: color, width: 0.75 }
    });
}

// Eyebrow label (rust, tracked, uppercase-style)
function addEyebrow(slide, text, x, y, w) {
    slide.addText(text, {
        x: x, y: y, w: w, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13, bold: false,
        color: COLOR_RUST, charSpacing: 3, valign: "middle", margin: 0
    });
}

// Large stat "100" + small unit "%" (like 10yr, 100%, 50+)
// `onDark` switches colors for navy slides.
function addStat(slide, big, unit, x, y, big_size = 96, unit_size = 36, onDark = false) {
    const numColor = onDark ? "FFFFFF" : COLOR_INK;
    const unitColor = onDark ? COLOR_RUST_SOFT : COLOR_RUST;
    // Big number
    slide.addText(big, {
        x: x, y: y, w: 3.2, h: big_size / 72 + 0.3,
        fontFace: FONT_SERIF, fontSize: big_size, bold: false,
        color: numColor, valign: "top", margin: 0
    });
    // Approx width of the big number so the unit sits right next to it
    // Georgia digits roughly 0.55x font-size wide at given pt; tuned by eye.
    const digitWidth = (big_size / 72) * 0.55;
    const numWidth = digitWidth * big.length;
    slide.addText(unit, {
        x: x + numWidth + 0.05,
        y: y + (big_size - unit_size) / 72 + 0.15, // sit on same baseline-ish
        w: 1.6, h: unit_size / 72 + 0.3,
        fontFace: FONT_SERIF, fontSize: unit_size, italic: false,
        color: unitColor, valign: "top", margin: 0
    });
}

// =====================================================================
// SLIDE 1 — Cover
// =====================================================================
function slide1() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    // Right navy panel (40% width)
    const panelX = SW * 0.58;
    const panelW = SW - panelX;
    s.addShape(pres.shapes.RECTANGLE, {
        x: panelX, y: 0, w: panelW, h: SH,
        fill: { color: COLOR_NAVY }, line: { color: COLOR_NAVY, width: 0 }
    });

    // Header (left side - on cream)
    s.addShape(pres.shapes.RECTANGLE, {
        x: 0.95, y: 0.55, w: 0.22, h: 0.22,
        fill: { color: COLOR_RUST }, line: { color: COLOR_RUST, width: 0 }
    });
    s.addText("DISTRICT STUDENT TRANSIT", {
        x: 1.3, y: 0.45, w: 6, h: 0.4,
        fontFace: FONT_MONO, fontSize: 14, bold: true,
        color: COLOR_INK, charSpacing: 3, valign: "middle", margin: 0
    });

    // Header right (on navy)
    s.addText("THE COMPANY, IN BRIEF", {
        x: panelX + 0.9, y: 0.45, w: 8, h: 0.4,
        fontFace: FONT_MONO, fontSize: 14,
        color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });

    // Left - eyebrow
    s.addText("WASHINGTON, D.C.  ·  EST. 2016", {
        x: 0.95, y: 2.1, w: 10, h: 0.45,
        fontFace: FONT_MONO, fontSize: 15,
        color: COLOR_RUST, charSpacing: 3, valign: "middle", margin: 0
    });

    // Big headline with italic "every"
    s.addText([
        { text: "Safe passage to ", options: { color: COLOR_INK } },
        { text: "every", options: { color: COLOR_RUST, italic: true } },
        { text: " classroom ", options: { color: COLOR_INK, breakLine: true } },
        { text: "in the District.", options: { color: COLOR_INK } }
    ], {
        x: 0.95, y: 2.75, w: panelX - 1.5, h: 4.4,
        fontFace: FONT_SERIF, fontSize: 76, bold: false,
        valign: "top", margin: 0, paraSpaceAfter: 4
    });

    // Body paragraph
    s.addText(
        "Dedicated van and shuttle service for D.C. students — DOT-cleared drivers, fully licensed, bonded, and insured, and ten years on the road.",
        {
            x: 0.95, y: 7.55, w: panelX - 2.3, h: 2.0,
            fontFace: FONT_SANS, fontSize: 18,
            color: COLOR_INK_SOFT, valign: "top", margin: 0,
            paraSpaceAfter: 6
        }
    );

    // Bottom-left footer
    s.addText("COMPANY OVERVIEW  ·  2026", {
        x: 0.95, y: SH - 0.75, w: 7, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });
    s.addText("VOL. 01", {
        x: panelX - 3.5, y: SH - 0.75, w: 2.2, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 3, align: "right", valign: "middle", margin: 0
    });

    // ---------- Right panel content ----------
    const rx = panelX + 0.9;          // left padding inside panel
    const rw = panelW - 1.8;          // panel content width

    // Thin rule under header
    addHairline(s, rx, 1.65, rw, COLOR_HAIRLINE_D);

    // Three stat blocks - use smaller sizes and wider block spacing
    const statsTopY = 2.25;
    const statBlockH = 2.7;

    // Stat 1: 10 yr
    addStat(s, "10", "yr", rx, statsTopY, 88, 34, true);
    s.addText("Operating in the District since 2016.", {
        x: rx, y: statsTopY + 1.55, w: rw, h: 0.5,
        fontFace: FONT_SANS, fontSize: 17,
        color: "D9DEE6", valign: "top", margin: 0
    });
    addHairline(s, rx, statsTopY + statBlockH - 0.1, rw, COLOR_HAIRLINE_D);

    // Stat 2: 100 %
    const s2y = statsTopY + statBlockH;
    addStat(s, "100", "%", rx, s2y, 88, 34, true);
    s.addText("DOT-cleared, career drivers.", {
        x: rx, y: s2y + 1.55, w: rw, h: 0.5,
        fontFace: FONT_SANS, fontSize: 17,
        color: "D9DEE6", valign: "top", margin: 0
    });
    addHairline(s, rx, s2y + statBlockH - 0.1, rw, COLOR_HAIRLINE_D);

    // Stat 3: L/B/I  (rendered inline as one text run at a size that fits)
    const s3y = s2y + statBlockH;
    s.addText([
        { text: "L", options: { color: "FFFFFF" } },
        { text: "/", options: { color: COLOR_RUST_SOFT } },
        { text: "B", options: { color: "FFFFFF" } },
        { text: "/", options: { color: COLOR_RUST_SOFT } },
        { text: "I", options: { color: "FFFFFF" } }
    ], {
        x: rx, y: s3y, w: rw, h: 1.4,
        fontFace: FONT_SERIF, fontSize: 80, bold: false,
        valign: "top", margin: 0
    });
    s.addText("Licensed, bonded, and insured.", {
        x: rx, y: s3y + 1.55, w: rw, h: 0.5,
        fontFace: FONT_SANS, fontSize: 17,
        color: "D9DEE6", valign: "top", margin: 0
    });

    // Panel footer
    s.addText("WASHINGTON", {
        x: rx, y: SH - 0.75, w: 4, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_MUTED_DARK, charSpacing: 3, valign: "middle", margin: 0
    });
    s.addText("DISTRICT OF COLUMBIA", {
        x: panelX + panelW - 7 - 0.9, y: SH - 0.75, w: 7, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_MUTED_DARK, charSpacing: 3, align: "right", valign: "middle", margin: 0
    });
}

// =====================================================================
// SLIDE 2 — At a Glance (4 stat columns on cream)
// =====================================================================
function slide2() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "02  ·  AT A GLANCE");

    // Eyebrow + headline
    addEyebrow(s, "AT A GLANCE", 0.95, 2.2, 6);
    s.addText("Ten years moving D.C.'s students — safely.", {
        x: 0.95, y: 2.7, w: SW - 2.0, h: 1.8,
        fontFace: FONT_SERIF, fontSize: 58, bold: false,
        color: COLOR_INK, valign: "top", margin: 0
    });

    // Divider
    addHairline(s, 0.95, 5.2, SW - 1.9, COLOR_HAIRLINE);

    // 4 stat columns
    const colW = (SW - 1.9) / 4;
    const colY = 5.6;

    const statData = [
        { big: "10",  unit: "yr",  label: "ESTABLISHED 2016",     copy: "In continuous operation\nacross the District." },
        { big: "100", unit: "%",   label: "DOT-CLEARED DRIVERS",  copy: "Every driver holds current\nfederal medical certification." },
        { big: "0",   unit: "",    label: "AT-FAULT INCIDENTS*",  copy: "Over the past three school years." },
        { big: "50",  unit: "+",   label: "D.C. SCHOOLS SERVED",  copy: "Public, charter, parochial, and\nindependent." }
    ];

    for (let i = 0; i < statData.length; i++) {
        const d = statData[i];
        const cx = 0.95 + colW * i;

        // Big number + unit
        addStat(s, d.big, d.unit, cx, colY, 108, 38, false);

        // Eyebrow label (rust)
        addEyebrow(s, d.label, cx, colY + 1.85, colW - 0.3);

        // Body copy (multi-line)
        const lines = d.copy.split("\n");
        const richText = lines.map((line, idx) => ({
            text: line,
            options: idx < lines.length - 1 ? { breakLine: true } : {}
        }));
        s.addText(richText, {
            x: cx, y: colY + 2.35, w: colW - 0.3, h: 1.6,
            fontFace: FONT_SANS, fontSize: 17,
            color: COLOR_INK_SOFT, valign: "top", margin: 0
        });
    }

    // Footnote
    s.addText("*Figures are illustrative placeholders — confirm before use.", {
        x: 0.95, y: SH - 0.75, w: 10, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, valign: "middle", margin: 0
    });
    s.addText("02 / 11", {
        x: SW - 3.0 - 0.95, y: SH - 0.75, w: 3.0, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 1, align: "right", valign: "middle", margin: 0
    });
}

// =====================================================================
// SLIDE 3 — The Need (two-column: left headline+body / right numbered list)
// =====================================================================
function slide3() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "03  ·  THE NEED");

    // LEFT side
    addEyebrow(s, "THE NEED", 0.95, 2.2, 6);
    s.addText("Getting a child to school shouldn't be the hardest part of the day.", {
        x: 0.95, y: 2.7, w: 9.5, h: 3.0,
        fontFace: FONT_SERIF, fontSize: 46, bold: false,
        color: COLOR_INK, valign: "top", margin: 0,
        paraSpaceAfter: 4
    });

    s.addText(
        "Across the District, families and schools navigate split custody arrangements, early-morning therapies, after-school programs, and cross-ward commutes — often without a yellow bus in sight.",
        {
            x: 0.95, y: 6.1, w: 9.0, h: 3.0,
            fontFace: FONT_SANS, fontSize: 19,
            color: COLOR_INK_SOFT, valign: "top", margin: 0,
            paraSpaceAfter: 6
        }
    );

    // RIGHT side: numbered list of three
    const rx = 11.5;
    const numberX = rx;
    const titleX = rx + 1.2;
    const descX = rx + 5.6;
    const titleW = 4.2;
    const descW = SW - descX - 0.95;

    const items = [
        {
            n: "01",
            title: "Gaps in yellow-bus\ncoverage",
            desc: "Charter and out-of-boundary placements often fall outside district routing."
        },
        {
            n: "02",
            title: "Specialized schedules",
            desc: "IEP transport, tutoring, and early-release days require flexibility rideshare can't offer."
        },
        {
            n: "03",
            title: "Safety expectations",
            desc: "Parents want a named, vetted driver — not a rotating stranger."
        }
    ];

    let y = 2.6;
    const rowGap = 0.4;
    const rowHeights = [2.2, 1.9, 1.6];

    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const rh = rowHeights[i];

        // Number
        s.addText(it.n, {
            x: numberX, y: y, w: 0.9, h: 0.5,
            fontFace: FONT_MONO, fontSize: 15,
            color: COLOR_RUST, charSpacing: 2, valign: "top", margin: 0
        });

        // Title (serif)
        const titleLines = it.title.split("\n");
        const titleRich = titleLines.map((line, idx) => ({
            text: line,
            options: idx < titleLines.length - 1 ? { breakLine: true } : {}
        }));
        s.addText(titleRich, {
            x: titleX, y: y - 0.15, w: titleW, h: 1.4,
            fontFace: FONT_SERIF, fontSize: 26,
            color: COLOR_INK, valign: "top", margin: 0
        });

        // Description
        s.addText(it.desc, {
            x: descX, y: y - 0.1, w: descW, h: 1.8,
            fontFace: FONT_SANS, fontSize: 17,
            color: COLOR_INK_SOFT, valign: "top", margin: 0
        });

        // Divider (except after last)
        if (i < items.length - 1) {
            addHairline(s, rx, y + rh - 0.1, SW - rx - 0.95, COLOR_HAIRLINE);
        }

        y += rh + rowGap;
    }

    addFooter(s, "Student Transportation  ·  The Need", 3);
}

// =====================================================================
// SLIDE 4 — Our Service (navy top half, cream bottom with 3 columns)
// =====================================================================
function slide4() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    // Navy top half
    const navyH = 4.3;
    s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: SW, h: navyH,
        fill: { color: COLOR_NAVY }, line: { color: COLOR_NAVY, width: 0 }
    });

    addWordmark(s, true);
    addBreadcrumb(s, "04  ·  OUR SERVICE", true);

    // Eyebrow (rust-soft on navy)
    s.addText("OUR SERVICE", {
        x: 0.95, y: 1.7, w: 6, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });

    // Headline (white serif)
    s.addText("Door-to-door student transit,\nbuilt around the school day.", {
        x: 0.95, y: 2.15, w: SW - 2.0, h: 2.2,
        fontFace: FONT_SERIF, fontSize: 50, bold: false,
        color: "FFFFFF", valign: "top", margin: 0
    });

    // Three columns
    const cols = [
        {
            label: "01  ·  DAILY ROUTES",
            title: "Recurring morning & dismissal runs.",
            body: "Fixed pickup windows, the same driver each week, and real-time arrival notifications for parents and school offices."
        },
        {
            label: "02  ·  ACTIVITY SHUTTLES",
            title: "After-school, athletics, field trips.",
            body: "Chartered shuttles for sports, arts programs, and class trips — scheduled by the week or the season."
        },
        {
            label: "03  ·  SPECIALIZED TRANSPORT",
            title: "IEP & accommodations routes.",
            body: "Smaller vans, trained monitors on request, and coordination with school support staff."
        }
    ];

    const gutter = 0.4;
    const colW = (SW - 1.9 - gutter * 2) / 3;
    const colY = navyH + 0.7;

    for (let i = 0; i < cols.length; i++) {
        const cx = 0.95 + i * (colW + gutter);
        // Top rule above each column
        addHairline(s, cx, colY, colW, COLOR_INK);

        // Eyebrow label
        s.addText(cols[i].label, {
            x: cx, y: colY + 0.25, w: colW, h: 0.4,
            fontFace: FONT_MONO, fontSize: 13,
            color: COLOR_RUST, charSpacing: 3, valign: "middle", margin: 0
        });

        // Title (serif)
        s.addText(cols[i].title, {
            x: cx, y: colY + 0.75, w: colW, h: 1.6,
            fontFace: FONT_SERIF, fontSize: 28, bold: false,
            color: COLOR_INK, valign: "top", margin: 0
        });

        // Body
        s.addText(cols[i].body, {
            x: cx, y: colY + 2.4, w: colW, h: 2.5,
            fontFace: FONT_SANS, fontSize: 17,
            color: COLOR_INK_SOFT, valign: "top", margin: 0
        });
    }

    addFooter(s, "Vans  ·  Shuttle Buses  ·  Door-to-Door", 4);
}

// =====================================================================
// SLIDE 5 — Fleet & Routes (two-column: table left, photo placeholders right)
// =====================================================================
function slide5() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "05  ·  FLEET & ROUTES");

    // LEFT: eyebrow + headline + table
    addEyebrow(s, "FLEET & ROUTES", 0.95, 2.2, 6);
    s.addText("A right-sized vehicle for every run.", {
        x: 0.95, y: 2.75, w: 9.0, h: 1.8,
        fontFace: FONT_SERIF, fontSize: 44, bold: false,
        color: COLOR_INK, valign: "top", margin: 0
    });

    // Table header (no fill, thin underline)
    const tbx = 0.95;
    const tby = 5.5;
    const col1 = 3.5, col2 = 1.9, col3 = 4.5;

    const headerStyle = {
        fontFace: FONT_MONO, fontSize: 13, color: COLOR_INK_SOFT,
        charSpacing: 3, valign: "middle", margin: 0, bold: false
    };
    s.addText("VEHICLE",  { x: tbx,                         y: tby, w: col1, h: 0.45, ...headerStyle });
    s.addText("SEATS",    { x: tbx + col1,                  y: tby, w: col2, h: 0.45, ...headerStyle });
    s.addText("BEST FOR", { x: tbx + col1 + col2,           y: tby, w: col3, h: 0.45, ...headerStyle });

    // Underline under headers
    addHairline(s, tbx, tby + 0.5, col1 + col2 + col3, COLOR_HAIRLINE);

    // Rows
    const rows = [
        ["Passenger Van",   "Up to 7",   "Door-to-door daily routes"],
        ["Mid-Size Shuttle","Up to 14",  "Small-group routing & activities"],
        ["Shuttle Bus",     "Up to 24",  "Field trips & athletics"],
        ["Accessible Van",  "2 + chair", "Mobility & IEP transport"]
    ];
    const rowH = 0.7;
    const rowStyle = {
        fontFace: FONT_SERIF, fontSize: 20,
        valign: "middle", margin: 0
    };
    for (let i = 0; i < rows.length; i++) {
        const ry = tby + 0.6 + i * rowH;
        s.addText(rows[i][0], { x: tbx,                y: ry, w: col1, h: rowH, ...rowStyle, color: COLOR_INK });
        s.addText(rows[i][1], { x: tbx + col1,         y: ry, w: col2, h: rowH, ...rowStyle, color: COLOR_INK });
        s.addText(rows[i][2], { x: tbx + col1 + col2,  y: ry, w: col3, h: rowH, ...rowStyle, color: COLOR_INK_SOFT });
        // Thin rule under each row except last
        if (i < rows.length - 1) {
            addHairline(s, tbx, ry + rowH - 0.05, col1 + col2 + col3, COLOR_HAIRLINE);
        }
    }

    // RIGHT: photo placeholders (big on top, two smaller below)
    const px = 11.2;
    const pw = SW - px - 0.95;
    const bigH = 2.9;
    const bigY = 2.2;
    // Big photo tile
    s.addShape(pres.shapes.RECTANGLE, {
        x: px, y: bigY, w: pw, h: bigH,
        fill: { color: COLOR_CREAM_2 }, line: { color: COLOR_HAIRLINE, width: 1 }
    });
    s.addText("PHOTO  ·  SHUTTLE AT CURB", {
        x: px + 0.4, y: bigY + bigH - 0.7, w: pw - 0.8, h: 0.5,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });

    // Two smaller tiles
    const smY = bigY + bigH + 0.25;
    const smH = 2.4;
    const smGap = 0.2;
    const smW = (pw - smGap) / 2;
    s.addShape(pres.shapes.RECTANGLE, {
        x: px, y: smY, w: smW, h: smH,
        fill: { color: COLOR_CREAM_2 }, line: { color: COLOR_HAIRLINE, width: 1 }
    });
    s.addText("INTERIOR", {
        x: px + 0.4, y: smY + smH - 0.7, w: smW - 0.8, h: 0.5,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
        x: px + smW + smGap, y: smY, w: smW, h: smH,
        fill: { color: COLOR_CREAM_2 }, line: { color: COLOR_HAIRLINE, width: 1 }
    });
    s.addText("FLEET ROW", {
        x: px + smW + smGap + 0.4, y: smY + smH - 0.7, w: smW - 0.8, h: 0.5,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_INK_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });

    addFooter(s, "Fleet composition  ·  Updated 2026", 5);
}

// =====================================================================
// SLIDE 6 — Safety Record (navy full, 3 stats + 4 inline features)
// =====================================================================
function slide6() {
    const s = pres.addSlide();
    s.background = { color: COLOR_NAVY };

    addWordmark(s, true);
    addBreadcrumb(s, "06  ·  SAFETY RECORD", true);

    // Eyebrow (rust-soft)
    s.addText("SAFETY RECORD", {
        x: 0.95, y: 2.2, w: 6, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });
    // Headline
    s.addText("The numbers we work hardest to keep.", {
        x: 0.95, y: 2.75, w: SW - 2.0, h: 1.8,
        fontFace: FONT_SERIF, fontSize: 52, bold: false,
        color: "FFFFFF", valign: "top", margin: 0
    });

    // Divider
    addHairline(s, 0.95, 5.2, SW - 1.9, COLOR_HAIRLINE_D);

    // Three stat columns
    const stats = [
        { big: "0",   unit: "",   label: "PREVENTABLE INCIDENTS",  desc: "Across the last three school years of operation." },
        { big: "100", unit: "%",  label: "PRE-TRIP INSPECTION RATE", desc: "Every vehicle, every route, logged daily." },
        { big: "24",  unit: "hr", label: "INCIDENT REPORTING",     desc: "Parents and schools notified the same day, every time." }
    ];

    const colW = (SW - 1.9) / 3;
    const colY = 5.6;
    for (let i = 0; i < stats.length; i++) {
        const d = stats[i];
        const cx = 0.95 + colW * i;
        addStat(s, d.big, d.unit, cx, colY, 108, 38, true);
        // Label (rust-soft)
        s.addText(d.label, {
            x: cx, y: colY + 1.85, w: colW - 0.4, h: 0.45,
            fontFace: FONT_MONO, fontSize: 13,
            color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
        });
        // Desc
        s.addText(d.desc, {
            x: cx, y: colY + 2.35, w: colW - 0.4, h: 1.2,
            fontFace: FONT_SANS, fontSize: 17,
            color: "D9DEE6", valign: "top", margin: 0
        });
    }

    // Four inline feature chips with dotted separators
    const chipY = 9.0;
    const chipLabels = [
        "RANDOM DRUG & ALCOHOL TESTING",
        "GPS-LOGGED ROUTES",
        "DASH & CABIN CAMERAS",
        "QUARTERLY DRIVER REVIEWS"
    ];
    const chipColW = (SW - 1.9) / 4;
    for (let i = 0; i < chipLabels.length; i++) {
        const cx = 0.95 + chipColW * i;
        s.addText(chipLabels[i], {
            x: cx + 0.7, y: chipY, w: chipColW - 0.7, h: 0.6,
            fontFace: FONT_MONO, fontSize: 11,
            color: "D9DEE6", charSpacing: 2, valign: "top", margin: 0
        });
        // Dotted separator before each (except the first)
        if (i > 0) {
            s.addText("· · ·", {
                x: cx - 0.05, y: chipY, w: 0.75, h: 0.5,
                fontFace: FONT_MONO, fontSize: 12,
                color: COLOR_MUTED_DARK, charSpacing: 2, valign: "top", margin: 0
            });
        }
    }

    addFooter(s, "Safety is the product.", 6, true);
}

// =====================================================================
// SLIDE 7 — Drivers & Training (left headline/body, right 5-item list)
// =====================================================================
function slide7() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "07  ·  DRIVERS & TRAINING");

    // LEFT
    addEyebrow(s, "DRIVERS & TRAINING", 0.95, 2.2, 6);
    s.addText("Every driver, fully cleared and trained.", {
        x: 0.95, y: 2.75, w: 9.5, h: 2.4,
        fontFace: FONT_SERIF, fontSize: 42, bold: false,
        color: COLOR_INK, valign: "top", margin: 0,
        paraSpaceAfter: 4
    });
    s.addText(
        "Our drivers are career professionals — not gig workers. Each is DOT-medically certified, background-screened, and trained specifically for transporting children.",
        {
            x: 0.95, y: 5.3, w: 9.0, h: 3.5,
            fontFace: FONT_SANS, fontSize: 19,
            color: COLOR_INK_SOFT, valign: "top", margin: 0,
            paraSpaceAfter: 6
        }
    );

    // RIGHT: 5 rows (number | title | description)
    const rx = 11.1;
    const numberX = rx;
    const titleX = rx + 1.1;
    const descX = rx + 5.9;
    const titleW = 4.6;
    const descW = SW - descX - 0.95;

    const items = [
        { n: "01", title: "DOT medical clearance",     desc: "Current federal medical certification, renewed on schedule." },
        { n: "02", title: "FBI & CJIS background checks", desc: "Fingerprint-based clearance required of every driver and monitor." },
        { n: "03", title: "Commercial driving record", desc: "Minimum three years clean, verified through state registries." },
        { n: "04", title: "Child-passenger training",  desc: "Boarding protocol, restraint use, de-escalation, and emergency response." },
        { n: "05", title: "Random drug & alcohol panel", desc: "FMCSA-compliant testing program, year-round." }
    ];

    const topY = 2.2;
    const rowH = 1.35;

    for (let i = 0; i < items.length; i++) {
        const y = topY + i * rowH;
        // Number
        s.addText(items[i].n, {
            x: numberX, y: y + 0.1, w: 0.9, h: 0.45,
            fontFace: FONT_MONO, fontSize: 14,
            color: COLOR_RUST, charSpacing: 2, valign: "top", margin: 0
        });
        // Title (serif)
        s.addText(items[i].title, {
            x: titleX, y: y, w: titleW, h: 0.9,
            fontFace: FONT_SERIF, fontSize: 22,
            color: COLOR_INK, valign: "top", margin: 0
        });
        // Description
        s.addText(items[i].desc, {
            x: descX, y: y + 0.05, w: descW, h: 1.2,
            fontFace: FONT_SANS, fontSize: 16,
            color: COLOR_INK_SOFT, valign: "top", margin: 0
        });
        // Divider under (except last)
        if (i < items.length - 1) {
            addHairline(s, rx, y + rowH - 0.05, SW - rx - 0.95, COLOR_HAIRLINE);
        }
    }

    addFooter(s, "Career drivers  ·  DOT cleared  ·  Continuously trained", 7);
}

// =====================================================================
// SLIDE 8 — Licensed, Bonded & Insured (3 outlined cards + 4 credentials row)
// =====================================================================
function slide8() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "08  ·  LICENSED, BONDED & INSURED");

    addEyebrow(s, "LICENSED, BONDED & INSURED", 0.95, 2.2, 10);
    s.addText("The paperwork, in order.", {
        x: 0.95, y: 2.75, w: SW - 2.0, h: 1.4,
        fontFace: FONT_SERIF, fontSize: 50, bold: false,
        color: COLOR_INK, valign: "top", margin: 0
    });

    // Three outlined cards
    const cards = [
        {
            label: "01  ·  LICENSED",
            title: "D.C. Commercial Operating\nAuthority",
            body: "Current District of Columbia operating license for passenger-for-hire service, renewed annually."
        },
        {
            label: "02  ·  BONDED",
            title: "Surety Bond on File",
            body: "Financial guarantee maintained to cover contracted obligations to schools and families."
        },
        {
            label: "03  ·  INSURED",
            title: "Commercial Auto & Liability",
            body: "Policy limits that exceed the District's minimums; certificates issued on request to any contracting school."
        }
    ];

    const gap = 0.35;
    const cardW = (SW - 1.9 - gap * 2) / 3;
    const cardY = 5.0;
    const cardH = 3.0;

    for (let i = 0; i < cards.length; i++) {
        const cx = 0.95 + i * (cardW + gap);
        // Outlined card
        s.addShape(pres.shapes.RECTANGLE, {
            x: cx, y: cardY, w: cardW, h: cardH,
            fill: { color: COLOR_CREAM }, line: { color: COLOR_HAIRLINE, width: 1 }
        });
        // Label
        s.addText(cards[i].label, {
            x: cx + 0.4, y: cardY + 0.3, w: cardW - 0.8, h: 0.4,
            fontFace: FONT_MONO, fontSize: 13,
            color: COLOR_RUST, charSpacing: 3, valign: "middle", margin: 0
        });
        // Title
        const tLines = cards[i].title.split("\n");
        const tRich = tLines.map((l, idx) => ({
            text: l, options: idx < tLines.length - 1 ? { breakLine: true } : {}
        }));
        s.addText(tRich, {
            x: cx + 0.4, y: cardY + 0.8, w: cardW - 0.8, h: 1.2,
            fontFace: FONT_SERIF, fontSize: 22,
            color: COLOR_INK, valign: "top", margin: 0
        });
        // Body
        s.addText(cards[i].body, {
            x: cx + 0.4, y: cardY + 1.85, w: cardW - 0.8, h: 1.5,
            fontFace: FONT_SANS, fontSize: 15,
            color: COLOR_INK_SOFT, valign: "top", margin: 0
        });
    }

    // Credentials row: 4 columns (label + value), with top + bottom hairlines
    const credsY = 8.5;
    const credsRowH = 1.0;
    addHairline(s, 0.95, credsY, SW - 1.9, COLOR_HAIRLINE);
    addHairline(s, 0.95, credsY + credsRowH + 0.1, SW - 1.9, COLOR_HAIRLINE);

    const creds = [
        { label: "USDOT", value: "Registered carrier" },
        { label: "FMCSA", value: "Compliant operator" },
        { label: "DCRA / DLCP", value: "Business license" },
        { label: "COI", value: "Available on request" }
    ];
    const credW = (SW - 1.9) / 4;
    for (let i = 0; i < creds.length; i++) {
        const cx = 0.95 + i * credW;
        // Label
        s.addText(creds[i].label, {
            x: cx, y: credsY + 0.15, w: credW - 0.3, h: 0.35,
            fontFace: FONT_MONO, fontSize: 12,
            color: COLOR_INK_SOFT, charSpacing: 3, valign: "middle", margin: 0
        });
        // Value (serif)
        s.addText(creds[i].value, {
            x: cx, y: credsY + 0.55, w: credW - 0.3, h: 0.55,
            fontFace: FONT_SERIF, fontSize: 20,
            color: COLOR_INK, valign: "middle", margin: 0
        });
    }

    addFooter(s, "Credentials  ·  Current for 2026", 8);
}

// =====================================================================
// SLIDE 9 — Ten Years in Business (left body, right timeline)
// =====================================================================
function slide9() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "09  ·  TEN YEARS IN BUSINESS");

    // LEFT
    addEyebrow(s, "TEN YEARS IN BUSINESS", 0.95, 2.2, 8);
    s.addText("A decade on District streets.", {
        x: 0.95, y: 2.75, w: 9.0, h: 1.8,
        fontFace: FONT_SERIF, fontSize: 46, bold: false,
        color: COLOR_INK, valign: "top", margin: 0,
        paraSpaceAfter: 4
    });
    s.addText(
        "Most student-transportation start-ups don't see a fifth school year. We're about to open our eleventh — with the same phone number, the same leadership, and many of the same driving families as when we began.",
        {
            x: 0.95, y: 5.0, w: 8.6, h: 4.0,
            fontFace: FONT_SANS, fontSize: 19,
            color: COLOR_INK_SOFT, valign: "top", margin: 0,
            paraSpaceAfter: 6
        }
    );

    // RIGHT: timeline
    const tlX = 11.0;
    const tlTop = 2.3;
    const items = [
        { year: "2016", desc: "First route from Ward 4 to three charter schools.",               highlight: true  },
        { year: "2018", desc: "Added shuttle-bus fleet; first independent-school contracts.",    highlight: false },
        { year: "2020", desc: "Maintained service through the pandemic for essential-worker families.", highlight: false },
        { year: "2023", desc: "Launched IEP & accessible-van program.",                          highlight: false },
        { year: "2026", desc: "Serving 50+ D.C. schools, entering our tenth school year.",       highlight: true  }
    ];

    const lineX = tlX + 0.4;
    const stepH = 1.45; // fixed height per item - enough room for 2-line descriptions
    const totalH = stepH * items.length;

    // Vertical line spanning all items
    s.addShape(pres.shapes.LINE, {
        x: lineX, y: tlTop + 0.2, w: 0, h: totalH - 0.3,
        line: { color: COLOR_HAIRLINE, width: 1 }
    });

    for (let i = 0; i < items.length; i++) {
        const y = tlTop + i * stepH;
        // Dot
        const dotSize = 0.22;
        const dotColor = items[i].highlight ? COLOR_RUST : COLOR_INK;
        s.addShape(pres.shapes.OVAL, {
            x: lineX - dotSize/2, y: y + 0.22, w: dotSize, h: dotSize,
            fill: { color: dotColor }, line: { color: dotColor, width: 0 }
        });
        // Year
        s.addText(items[i].year, {
            x: lineX + 0.35, y: y, w: 2, h: 0.5,
            fontFace: FONT_MONO, fontSize: 16,
            color: items[i].highlight ? COLOR_RUST : COLOR_INK_SOFT,
            charSpacing: 3, valign: "middle", margin: 0
        });
        // Description (allow 2 lines of wrap room)
        s.addText(items[i].desc, {
            x: lineX + 0.35, y: y + 0.5, w: SW - (lineX + 0.35) - 0.95, h: 0.95,
            fontFace: FONT_SERIF, fontSize: 20,
            color: COLOR_INK, valign: "top", margin: 0
        });
    }

    addFooter(s, "Est. 2016  ·  Washington, D.C.", 9);
}

// =====================================================================
// SLIDE 10 — Who We Serve (two big columns: Schools & Programs / Families)
// =====================================================================
function slide10() {
    const s = pres.addSlide();
    s.background = { color: COLOR_CREAM };

    addWordmark(s);
    addBreadcrumb(s, "10  ·  WHO WE SERVE");

    addEyebrow(s, "WHO WE SERVE", 0.95, 2.2, 6);
    s.addText("Schools and families, across every ward.", {
        x: 0.95, y: 2.75, w: SW - 2.0, h: 1.8,
        fontFace: FONT_SERIF, fontSize: 50, bold: false,
        color: COLOR_INK, valign: "top", margin: 0
    });

    // Two big columns
    const colStartY = 5.2;
    const colGap = 0.8;
    const colW = (SW - 1.9 - colGap) / 2;
    const colXs = [0.95, 0.95 + colW + colGap];

    const sections = [
        {
            header: "SCHOOLS & PROGRAMS",
            items: [
                { title: "Public charter schools",          desc: "Daily AM/PM routing for students outside yellow-bus coverage." },
                { title: "Independent & parochial schools", desc: "Contracted shuttles, athletics, and field-trip service." },
                { title: "Tutoring & enrichment programs",  desc: "After-school pickups from campus to program sites." }
            ]
        },
        {
            header: "FAMILIES",
            items: [
                { title: "Dual-commute households",      desc: "Reliable door-to-door service for families with conflicting schedules." },
                { title: "Shared-custody arrangements",  desc: "Consistent routing across two home addresses." },
                { title: "Specialized-transport students", desc: "Accessible vehicles and trained monitors, coordinated with the school." }
            ]
        }
    ];

    for (let c = 0; c < sections.length; c++) {
        const cx = colXs[c];
        // Section header
        addEyebrow(s, sections[c].header, cx, colStartY, colW);

        // Items within this column
        const titleW = colW * 0.55;
        const descW = colW * 0.42;
        const descX = cx + colW * 0.58;

        let y = colStartY + 0.7;
        const rowH = 1.5;

        for (let i = 0; i < sections[c].items.length; i++) {
            const it = sections[c].items[i];
            // Title
            s.addText(it.title, {
                x: cx, y: y, w: titleW, h: 0.9,
                fontFace: FONT_SERIF, fontSize: 22,
                color: COLOR_INK, valign: "top", margin: 0
            });
            // Desc
            s.addText(it.desc, {
                x: descX, y: y, w: descW, h: 1.4,
                fontFace: FONT_SANS, fontSize: 16,
                color: COLOR_INK_SOFT, valign: "top", margin: 0
            });
            // Divider
            if (i < sections[c].items.length - 1) {
                addHairline(s, cx, y + rowH - 0.15, colW - 0.2, COLOR_HAIRLINE);
            }
            y += rowH;
        }
    }

    addFooter(s, "All eight wards  ·  Public, charter, independent", 10);
}

// =====================================================================
// SLIDE 11 — Next Steps / Contact (navy full)
// =====================================================================
function slide11() {
    const s = pres.addSlide();
    s.background = { color: COLOR_NAVY };

    addWordmark(s, true);
    addBreadcrumb(s, "11  ·  NEXT STEPS", true);

    // Eyebrow
    s.addText("NEXT STEPS", {
        x: 0.95, y: 4.7, w: 6, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
    });

    // Headline with italic "route"
    s.addText([
        { text: "Let's plan your ",  options: { color: "F4EFE6" } },
        { text: "route",             options: { color: COLOR_RUST_SOFT, italic: true } },
        { text: ".",                 options: { color: "F4EFE6" } }
    ], {
        x: 0.95, y: 5.3, w: SW - 2.0, h: 2.3,
        fontFace: FONT_SERIF, fontSize: 76, bold: false,
        valign: "top", margin: 0
    });

    // Divider
    addHairline(s, 0.95, 8.3, SW - 1.9, COLOR_HAIRLINE_D);

    // Three contact columns
    const contacts = [
        { label: "CALL",  value: "(202) 555-0134",        desc: "Weekdays, 6a–7p" },
        { label: "EMAIL", value: "dispatch@dstransit.dc", desc: "For school-contract inquiries." },
        { label: "VISIT", value: "Northeast, D.C.",       desc: "Garage & dispatch by appointment." }
    ];
    const colW = (SW - 1.9) / 3;
    const colY = 8.55;
    for (let i = 0; i < contacts.length; i++) {
        const cx = 0.95 + colW * i;
        // Label
        s.addText(contacts[i].label, {
            x: cx, y: colY, w: colW - 0.4, h: 0.4,
            fontFace: FONT_MONO, fontSize: 13,
            color: COLOR_RUST_SOFT, charSpacing: 3, valign: "middle", margin: 0
        });
        // Value (serif)
        s.addText(contacts[i].value, {
            x: cx, y: colY + 0.5, w: colW - 0.4, h: 0.7,
            fontFace: FONT_SERIF, fontSize: 28,
            color: "F4EFE6", valign: "middle", margin: 0
        });
        // Desc
        s.addText(contacts[i].desc, {
            x: cx, y: colY + 1.25, w: colW - 0.4, h: 0.5,
            fontFace: FONT_SANS, fontSize: 16,
            color: "D9DEE6", valign: "middle", margin: 0
        });
    }

    // Bottom footer row
    s.addText("District Student Transit  ·  Est. 2016", {
        x: 0.95, y: SH - 0.75, w: 10, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_MUTED_DARK, charSpacing: 1, valign: "middle", margin: 0
    });
    s.addText("Thank you", {
        x: SW - 4 - 0.95, y: SH - 0.75, w: 4, h: 0.4,
        fontFace: FONT_MONO, fontSize: 13,
        color: COLOR_MUTED_DARK, charSpacing: 1, align: "right", valign: "middle", margin: 0
    });
}

// ---------- Build ----------
slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();
slide11();

pres.writeFile({ fileName: "District_Transportation_1.pptx" })
    .then(fn => console.log("Wrote:", fn));
