// build_deck.js
// Recreates "Inverted_Yield_Curve.pptx" using pptxgenjs.
// Run:  node build_deck.js
// Output: Inverted_Yield_Curve.pptx in the working directory.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// --- Custom slide size: 20" x 11.25" (matches source) ---
pres.defineLayout({ name: "CUSTOM", width: 20, height: 11.25 });
pres.layout = "CUSTOM";
pres.title = "The Inverted Yield Curve";
pres.author = "Macro Research";

// --- Palette ---
const C = {
    cream:      "F5F1EA",   // light background
    navy:       "0A1628",   // dark text on cream / dark bg variant
    navyDark:   "06101F",   // darker bg used on slides 4 & 9
    navyMid:    "1F2D40",   // body text on cream
    slate:      "5A6577",   // muted text on cream
    slateLite:  "8C97A8",   // muted text on dark
    iceBlue:    "C8D2E0",   // body text on dark
    iceBlue2:   "A8B3C4",
    iceBlue3:   "6B7689",
    orange:     "C8531A",   // accent
    peach:      "E89B6A",   // peach accent (dark slides)
    sand:       "C9BFAE",   // recession/shading on cream
    white:      "FFFFFF",
};

const FONT_H = "Arial";
const FONT_B = "Arial";

// ---------- Helpers ----------
function header(slide, num, section, rightText, opts = {}) {
    const onDark = !!opts.dark;
    const sectionColor = onDark ? C.iceBlue : C.navy;
    const numColor     = onDark ? C.slateLite : C.slate;
    const orangeColor  = C.orange;
    const ruleColor    = onDark ? C.iceBlue3 : C.slate;
    const rightColor   = onDark ? C.iceBlue : C.slate;

    // Top eyebrow: "NN  SECTION"
    slide.addText(
        [
            { text: num + "  ", options: { color: numColor, charSpacing: 4 } },
            { text: section,    options: { color: orangeColor, charSpacing: 4, bold: true } },
        ],
        { x: 1.0, y: 0.55, w: 12, h: 0.45,
          fontFace: FONT_H, fontSize: 13, margin: 0 }
    );

    // Right header text
    slide.addText(rightText, {
        x: 13, y: 0.55, w: 6, h: 0.45,
        fontFace: FONT_H, fontSize: 14, color: rightColor,
        align: "right", margin: 0,
    });

    // Thin divider line
    slide.addShape(pres.shapes.LINE, {
        x: 1.0, y: 1.15, w: 18.0, h: 0,
        line: { color: ruleColor, width: 0.5 },
    });
}

function footer(slide, leftText, rightText, opts = {}) {
    const onDark = !!opts.dark;
    const color = onDark ? C.slateLite : C.slate;
    slide.addText(leftText, {
        x: 1.0, y: 10.55, w: 8, h: 0.4,
        fontFace: FONT_B, fontSize: 12, color, align: "left", margin: 0,
    });
    slide.addText(rightText, {
        x: 11, y: 10.55, w: 8, h: 0.4,
        fontFace: FONT_B, fontSize: 12, color, align: "right", margin: 0,
    });
}

function bg(slide, dark = false) {
    slide.background = { color: dark ? C.navyDark : C.cream };
}

// =========================================================
// SLIDE 1 — Title
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);

    // Top row
    s.addText("MACRO RESEARCH  ·  VOL. XII", {
        x: 1.0, y: 0.7, w: 12, h: 0.5,
        fontFace: FONT_H, fontSize: 16, color: C.navy,
        bold: true, charSpacing: 6, margin: 0,
    });
    s.addText("April 2026", {
        x: 14, y: 0.7, w: 5, h: 0.5,
        fontFace: FONT_H, fontSize: 16, color: C.slate,
        align: "right", margin: 0,
    });

    // "A SPECIAL REPORT" eyebrow
    s.addText("A SPECIAL REPORT", {
        x: 1.0, y: 2.6, w: 8, h: 0.45,
        fontFace: FONT_H, fontSize: 16, color: C.orange,
        bold: true, charSpacing: 6, margin: 0,
    });

    // Big title — two lines, mixed roman/italic, mixed colors
    s.addText(
        [
            { text: "The Inverted ", options: { color: C.navy,   bold: false } },
            { text: "Yield",          options: { color: C.orange, italic: true } },
            { text: " ",              options: { color: C.navy } },
            { text: "Curve.",         options: { color: C.orange, italic: true, breakLine: false } },
        ],
        { x: 1.0, y: 3.15, w: 17, h: 3.4,
          fontFace: FONT_H, fontSize: 110, bold: true,
          margin: 0, valign: "top" }
    );

    // Subtitle (italic)
    s.addText("A history of the most reliable recession signal in modern finance — and what it is telling us today.", {
        x: 1.0, y: 6.95, w: 13, h: 1.2,
        fontFace: FONT_B, fontSize: 22, color: C.navyMid, italic: true,
        margin: 0, valign: "top",
    });

    // Bottom row
    s.addText("10Y 4.31  ·  2Y 3.81  ·  30Y 4.91  ·  10Y–2Y +0.50", {
        x: 1.0, y: 10.0, w: 12, h: 0.45,
        fontFace: FONT_H, fontSize: 14, color: C.slate, margin: 0,
    });
    s.addText("10 / Slides", {
        x: 14, y: 10.0, w: 5, h: 0.45,
        fontFace: FONT_H, fontSize: 14, color: C.slate, align: "right", margin: 0,
    });
}

// =========================================================
// SLIDE 2 — Definition / Primer
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "02", "PRIMER", "Definition");

    // Title
    s.addText(
        [
            { text: "What an inversion ", options: { color: C.navy } },
            { text: "means.",              options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 16, h: 1.3,
          fontFace: FONT_H, fontSize: 56, bold: true, margin: 0 }
    );

    // Left body block
    s.addText(
        [
            { text: "The yield curve plots Treasury yields against maturity. ", options: {} },
            { text: "Normally it slopes up", options: { bold: true } },
            { text: " — longer bonds pay more to compensate for time and uncertainty.", options: { breakLine: true } },
            { text: " ", options: { breakLine: true } },
            { text: "An ", options: {} },
            { text: "inversion", options: { bold: true, color: C.orange } },
            { text: " occurs when short rates exceed long rates. The bond market is signalling that it expects the Fed to cut — which it would do only if the economy slows.", options: {} },
        ],
        { x: 1.0, y: 3.5, w: 8.5, h: 4.0,
          fontFace: FONT_B, fontSize: 20, color: C.navyMid,
          paraSpaceAfter: 6, margin: 0, valign: "top" }
    );

    // Footnote under left body
    s.addText(
        [
            { text: "Benchmark spread used throughout this deck: ", options: { color: C.slate } },
            { text: "10-Year minus 2-Year", options: { color: C.navyMid, bold: true } },
            { text: " (FRED T10Y2Y).", options: { color: C.slate } },
        ],
        { x: 1.0, y: 7.6, w: 8.5, h: 0.6,
          fontFace: FONT_B, fontSize: 14, margin: 0 }
    );

    // ---- Middle column: schematic curves ----
    // NORMAL — a slight upward curve drawn with a series of small line segments
    s.addText("NORMAL", {
        x: 10.4, y: 3.1, w: 3.0, h: 0.4,
        fontFace: FONT_H, fontSize: 14, color: C.navy, bold: true, margin: 0, charSpacing: 2,
    });
    s.addText("long > short", {
        x: 10.4, y: 3.45, w: 3.0, h: 0.4,
        fontFace: FONT_B, fontSize: 13, color: C.slate, italic: false, margin: 0,
    });
    // Approx upward arc as poly-line segments (inches; LINE shape: w=dx, h=dy)
    {
        const pts = [
            [10.4, 4.85], [10.85, 4.6], [11.4, 4.42],
            [12.0, 4.28], [12.6, 4.18], [13.2, 4.12], [13.7, 4.10]
        ];
        for (let i = 0; i < pts.length - 1; i++) {
            s.addShape(pres.shapes.LINE, {
                x: pts[i][0], y: pts[i][1],
                w: pts[i+1][0] - pts[i][0],
                h: pts[i+1][1] - pts[i][1],
                line: { color: C.navy, width: 1.75 },
            });
        }
        // end dot
        s.addShape(pres.shapes.OVAL, {
            x: 13.62, y: 4.02, w: 0.16, h: 0.16, fill: { color: C.navy }, line: { color: C.navy, width: 0 },
        });
    }
    // axis labels
    s.addText("3M",  { x: 10.3, y: 4.95, w: 0.6, h: 0.35, fontFace: FONT_H, fontSize: 11, color: C.navyMid, margin: 0 });
    s.addText("30Y", { x: 13.45, y: 4.95, w: 0.7, h: 0.35, fontFace: FONT_H, fontSize: 11, color: C.navyMid, margin: 0 });

    // INVERTED — downward arc
    s.addText("INVERTED", {
        x: 10.4, y: 5.7, w: 3.0, h: 0.4,
        fontFace: FONT_H, fontSize: 14, color: C.orange, bold: true, margin: 0, charSpacing: 2,
    });
    s.addText("short > long", {
        x: 10.4, y: 6.05, w: 3.0, h: 0.4,
        fontFace: FONT_B, fontSize: 13, color: C.slate, margin: 0,
    });
    {
        const pts = [
            [10.4, 6.55], [10.9, 6.7], [11.5, 6.9],
            [12.1, 7.15], [12.7, 7.42], [13.3, 7.68], [13.7, 7.85]
        ];
        for (let i = 0; i < pts.length - 1; i++) {
            s.addShape(pres.shapes.LINE, {
                x: pts[i][0], y: pts[i][1],
                w: pts[i+1][0] - pts[i][0],
                h: pts[i+1][1] - pts[i][1],
                line: { color: C.orange, width: 1.75 },
            });
        }
        s.addShape(pres.shapes.OVAL, {
            x: 13.62, y: 7.78, w: 0.16, h: 0.16, fill: { color: C.orange }, line: { color: C.orange, width: 0 },
        });
        // start dot
        s.addShape(pres.shapes.OVAL, {
            x: 10.32, y: 6.47, w: 0.16, h: 0.16, fill: { color: C.orange }, line: { color: C.orange, width: 0 },
        });
    }

    // ---- Right column: SIGNAL / LAG / FALSE+ ----
    const RX = 14.7, RW = 4.4;
    function rightItem(label, body, y, accent = false) {
        // hairline rule
        s.addShape(pres.shapes.LINE, {
            x: RX, y: y, w: RW, h: 0,
            line: { color: C.slate, width: 0.5 },
        });
        s.addText(label, {
            x: RX, y: y + 0.06, w: RW, h: 0.35,
            fontFace: FONT_H, fontSize: 12, color: C.slate, charSpacing: 4, margin: 0, bold: true,
        });
        if (Array.isArray(body)) {
            s.addText(body, {
                x: RX, y: y + 0.45, w: RW, h: 1.4,
                fontFace: FONT_B, fontSize: 16, color: C.navyMid, margin: 0, valign: "top",
            });
        } else {
            s.addText(body, {
                x: RX, y: y + 0.45, w: RW, h: 1.4,
                fontFace: FONT_B, fontSize: 16, color: C.navyMid, margin: 0, valign: "top",
            });
        }
    }
    rightItem("SIGNAL", "Since 1978, the 10Y–2Y has\ninverted before every\nU.S. recession.", 3.2);
    rightItem("LAG",    "Avg lead time from first\ninversion to recession:", 5.05);
    s.addText("~12 months", {
        x: RX, y: 5.95, w: RW, h: 0.7,
        fontFace: FONT_H, fontSize: 32, color: C.orange, italic: true, margin: 0, bold: false,
    });
    rightItem("FALSE+", "One debated mis-fire:\nbrief 1998 inversion (LTCM).", 6.95);

    footer(s, "02 / Definition", "Source: FRED, U.S. Treasury");
}

// =========================================================
// SLIDE 3 — History line chart 1978 → 2026
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "03", "HISTORY", "10Y–2Y  ·  1978 → 2026");

    s.addText(
        [
            { text: "Seven inversions, six recessions, ", options: { color: C.navy } },
            { text: "and one debate.", options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 18, h: 1.0,
          fontFace: FONT_H, fontSize: 44, bold: true, margin: 0 }
    );

    // Chart area
    const cx = 1.5, cy = 3.2, cw = 17, ch = 6.3;

    // Recession bands (NBER) - approximate horizontal positions across 1978..2026
    // x-axis: 1978 -> 0, 2026 -> 1
    const yearToFrac = (y) => (y - 1978) / (2026 - 1978);
    const recessions = [
        [1980.0, 1980.55],   // Jan-Jul 1980
        [1981.5, 1982.9],    // Jul 1981 - Nov 1982
        [1990.5, 1991.2],    // Jul 1990 - Mar 1991
        [2001.2, 2001.85],   // Mar - Nov 2001
        [2007.95, 2009.4],   // Dec 2007 - Jun 2009
        [2020.1, 2020.4],    // Feb - Apr 2020
    ];
    recessions.forEach(([y1, y2]) => {
        const x = cx + yearToFrac(y1) * cw;
        const w = (yearToFrac(y2) - yearToFrac(y1)) * cw;
        s.addShape(pres.shapes.RECTANGLE, {
            x, y: cy + 0.4, w, h: ch - 0.8,
            fill: { color: C.sand, transparency: 35 },
            line: { color: C.sand, width: 0 },
        });
    });

    // Y-axis labels
    const yMin = -2.5, yMax = 3.2;
    const yToInch = (v) => cy + 0.4 + (1 - (v - yMin) / (yMax - yMin)) * (ch - 0.8);
    const yTicks = [3.0, 1.5, 0.0, -1.5, -2.4];
    yTicks.forEach((v) => {
        const yPos = yToInch(v);
        s.addText((v >= 0 ? "+" : "") + v.toFixed(1), {
            x: cx - 0.55, y: yPos - 0.18, w: 0.8, h: 0.35,
            fontFace: FONT_H, fontSize: 12, color: C.slate, align: "right", margin: 0,
        });
    });

    // Zero baseline (very subtle)
    s.addShape(pres.shapes.LINE, {
        x: cx, y: yToInch(0), w: cw, h: 0,
        line: { color: C.slate, width: 0.25, transparency: 60 },
    });

    // Build the spread line (schematic). Pairs of [year, spread%] cover 1978-2026.
    // Negative regions correspond to inversions; we'll color those segments orange.
    const spread = [
        [1978.0,  0.6], [1978.7,  2.5], [1979.0,  1.2], [1979.4, -0.3],
        [1980.0, -2.1], [1980.5, -1.0], [1981.0,  1.0], [1981.4, -0.6],
        [1982.0, -1.0], [1982.8,  0.5], [1984.0,  1.2], [1986.0,  1.4],
        [1988.0,  1.3], [1988.8,  0.4], [1989.2, -0.2], [1989.8, -0.1],
        [1990.5,  0.5], [1992.0,  2.0], [1994.0,  1.0], [1996.0,  0.7],
        [1998.0,  0.4], [1999.5,  0.2], [2000.2, -0.4], [2000.8, -0.4],
        [2001.5,  1.4], [2003.0,  2.5], [2005.0,  0.5], [2006.0, -0.1],
        [2006.6, -0.2], [2007.4,  0.0], [2008.0,  0.8], [2009.0,  2.6],
        [2011.0,  2.4], [2013.0,  2.1], [2015.0,  1.4], [2017.0,  1.0],
        [2019.0,  0.2], [2019.5, -0.05],[2019.9,  0.3], [2021.0,  1.2],
        [2022.0,  0.9], [2022.5, -0.2], [2023.5, -1.05],[2024.6, -0.05],
        [2025.0,  0.3], [2025.7, -0.1], [2026.0,  0.5],
    ];

    // Draw line segments — orange where both endpoints are negative (inverted)
    for (let i = 0; i < spread.length - 1; i++) {
        const [y1, v1] = spread[i];
        const [y2, v2] = spread[i + 1];
        const x1 = cx + yearToFrac(y1) * cw;
        const x2 = cx + yearToFrac(y2) * cw;
        const yy1 = yToInch(v1);
        const yy2 = yToInch(v2);
        const inverted = (v1 < 0 && v2 < 0);
        s.addShape(pres.shapes.LINE, {
            x: x1, y: yy1, w: x2 - x1, h: yy2 - yy1,
            line: { color: inverted ? C.orange : C.navy, width: inverted ? 2 : 1.4 },
        });
    }

    // X-axis labels
    s.addText("1978", { x: cx - 0.4, y: cy + ch + 0.05, w: 1, h: 0.35, fontFace: FONT_H, fontSize: 12, color: C.slate, margin: 0 });
    [1985, 1992, 2000, 2008, 2016].forEach((yr) => {
        const x = cx + yearToFrac(yr) * cw - 0.4;
        s.addText(String(yr), {
            x, y: cy + ch + 0.05, w: 0.9, h: 0.35,
            fontFace: FONT_H, fontSize: 12, color: C.slate, margin: 0, align: "left",
        });
    });
    s.addText("2026", {
        x: cx + cw - 0.6, y: cy + ch + 0.05, w: 0.9, h: 0.35,
        fontFace: FONT_H, fontSize: 12, color: C.slate, margin: 0, align: "right",
    });

    // Inversion period labels — sit just below the year-axis labels
    function periodLabel(year, txt, color = C.slate, w = 1.2) {
        const x = cx + yearToFrac(year) * cw - w/2;
        s.addText(txt, {
            x, y: cy + ch + 0.42, w, h: 0.32,
            fontFace: FONT_H, fontSize: 11, color, align: "center", margin: 0, bold: true,
        });
    }
    periodLabel(1980,  "'78–'80", C.slate);
    periodLabel(1989,  "'88–'89", C.slate);
    periodLabel(2000.5, "'00",    C.slate, 0.8);
    periodLabel(2006.8, "'06–'07", C.slate);
    periodLabel(2019.5, "'19",    C.slate, 0.8);
    periodLabel(2023.5, "'22–'24 (record)", C.orange, 2.2);

    // Legend (top)
    const lx = 1.7, ly = 3.25;
    s.addShape(pres.shapes.RECTANGLE, {
        x: lx, y: ly + 0.06, w: 0.25, h: 0.18,
        fill: { color: C.sand, transparency: 35 }, line: { color: C.sand, width: 0 },
    });
    s.addText("NBER recession", { x: lx + 0.32, y: ly, w: 1.8, h: 0.32, fontFace: FONT_H, fontSize: 11, color: C.navyMid, margin: 0 });
    s.addShape(pres.shapes.LINE, { x: lx + 2.2, y: ly + 0.16, w: 0.45, h: 0, line: { color: C.navy, width: 1.5 } });
    s.addText("10Y–2Y spread", { x: lx + 2.7, y: ly, w: 1.8, h: 0.32, fontFace: FONT_H, fontSize: 11, color: C.navyMid, margin: 0 });
    s.addShape(pres.shapes.LINE, { x: lx + 4.6, y: ly + 0.16, w: 0.45, h: 0, line: { color: C.orange, width: 2 } });
    s.addText("Inverted period", { x: lx + 5.1, y: ly, w: 1.8, h: 0.32, fontFace: FONT_H, fontSize: 11, color: C.navyMid, margin: 0 });

    footer(s, "03 / History", "Source: FRED T10Y2Y; NBER. Schematic.");
}

// =========================================================
// SLIDE 4 — The Record (dark) — 2-col, right table
// =========================================================
{
    const s = pres.addSlide();
    bg(s, true);
    header(s, "04", "THE RECORD", "2022 — 2024", { dark: true });

    // Big title
    s.addText(
        [
            { text: "A 26-month inversion ",       options: { color: C.white } },
            { text: "shattered the prior record",  options: { color: C.orange, italic: true } },
            { text: " — and no recession arrived.", options: { color: C.white, breakLine: false } },
        ],
        { x: 1.0, y: 3.2, w: 9.5, h: 3.5,
          fontFace: FONT_H, fontSize: 42, bold: true, margin: 0, valign: "top" }
    );

    // Body
    s.addText(
        [
            { text: "The 10Y–2Y spread went negative in ", options: { color: C.iceBlue } },
            { text: "July 2022", options: { color: C.white, bold: true } },
            { text: " and stayed negative through ", options: { color: C.iceBlue } },
            { text: "August 2024", options: { color: C.white, bold: true } },
            { text: " . The previous Volcker-era record was 624 days.", options: { color: C.iceBlue } },
        ],
        { x: 1.0, y: 6.9, w: 9.0, h: 2.0,
          fontFace: FONT_B, fontSize: 22, margin: 0, valign: "top" }
    );

    // Right side rows
    const rx = 11.2, rw = 7.7;
    const rows = [
        ["'78–'80", "~624 days inverted · recession Jan 1980", false],
        ["'88–'89", "~14 months · recession Jul 1990",        false],
        ["'00",     "~10 months · recession Mar 2001",        false],
        ["'06–'07", "~22 months · recession Dec 2007",        false],
        ["'19",     "~5 months · recession Feb 2020",         false],
        ["'22–'24", "~792 days · no recession during inversion", true],
    ];
    let y0 = 3.0;
    const rowH = 1.0;

    // top divider
    s.addShape(pres.shapes.LINE, {
        x: rx, y: y0, w: rw, h: 0, line: { color: C.iceBlue3, width: 0.75 },
    });

    rows.forEach(([lhs, rhs, highlight], i) => {
        const yy = y0 + i * rowH;
        // year tag
        s.addText(lhs, {
            x: rx, y: yy + 0.18, w: 1.5, h: 0.6,
            fontFace: FONT_H, fontSize: 18, color: highlight ? C.orange : C.peach, bold: true, margin: 0,
        });
        // text
        if (highlight) {
            s.addText(
                [
                    { text: "~792 days · ", options: { color: C.white, bold: true } },
                    { text: "no recession during inversion", options: { color: C.orange, bold: true } },
                ],
                { x: rx + 1.6, y: yy + 0.2, w: rw - 1.6, h: 0.6,
                  fontFace: FONT_B, fontSize: 18, margin: 0 }
            );
        } else {
            s.addText(rhs, {
                x: rx + 1.6, y: yy + 0.2, w: rw - 1.6, h: 0.6,
                fontFace: FONT_B, fontSize: 18, color: C.iceBlue, margin: 0,
            });
        }
        // bottom divider
        s.addShape(pres.shapes.LINE, {
            x: rx, y: yy + rowH, w: rw, h: 0,
            line: { color: C.iceBlue3, width: 0.5, transparency: 50 },
        });
    });

    footer(s, "04 / The Record", "Source: FRED T10Y2Y; NBER. Days approximate.", { dark: true });
}

// =========================================================
// SLIDE 5 — Today (yield curve + 4 stat callouts)
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "05", "TODAY", "As of Apr 24, 2026");

    // Title
    s.addText(
        [
            { text: "The curve has ", options: { color: C.navy } },
            { text: "re-steepened.", options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 16, h: 1.2,
          fontFace: FONT_H, fontSize: 48, bold: true, margin: 0 }
    );

    // ----- Left: U.S. Treasury Par Yield Curve (schematic line through 6 points) -----
    s.addText("U.S. TREASURY PAR YIELD CURVE", {
        x: 1.4, y: 3.5, w: 8, h: 0.4,
        fontFace: FONT_H, fontSize: 13, color: C.navy, bold: true, charSpacing: 2, margin: 0,
    });

    // axes
    const ax = 1.6, ay = 4.1, aw = 7.0, ah = 4.6;
    // y-axis tick labels: 5.0, 4.5, 4.0, 3.5
    const yTicks5 = [5.0, 4.5, 4.0, 3.5];
    const yMin5 = 3.4, yMax5 = 5.05;
    const y5ToInch = (v) => ay + (1 - (v - yMin5) / (yMax5 - yMin5)) * ah;
    yTicks5.forEach((v) => {
        const yp = y5ToInch(v);
        s.addText(v.toFixed(1) + "%", {
            x: ax - 0.85, y: yp - 0.18, w: 0.85, h: 0.35,
            fontFace: FONT_H, fontSize: 12, color: C.slate, align: "right", margin: 0,
        });
    });

    // Maturity points
    const maturities = ["3M", "1Y", "2Y", "5Y", "10Y", "30Y"];
    const yields = [4.30, 4.05, 3.81, 3.95, 4.31, 4.91];
    // x positions
    const xPositions = [0.05, 0.22, 0.39, 0.56, 0.75, 0.94].map(f => ax + f * aw);
    const xyPoints = xPositions.map((x, i) => [x, y5ToInch(yields[i])]);

    // Draw connecting line
    for (let i = 0; i < xyPoints.length - 1; i++) {
        s.addShape(pres.shapes.LINE, {
            x: xyPoints[i][0], y: xyPoints[i][1],
            w: xyPoints[i+1][0] - xyPoints[i][0],
            h: xyPoints[i+1][1] - xyPoints[i][1],
            line: { color: C.navy, width: 1.75 },
        });
    }
    // Dots & value labels
    xyPoints.forEach(([x, y], i) => {
        s.addShape(pres.shapes.OVAL, {
            x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14,
            fill: { color: C.navy }, line: { color: C.navy, width: 0 },
        });
        // value above
        s.addText(yields[i].toFixed(2), {
            x: x - 0.55, y: y - 0.55, w: 1.1, h: 0.35,
            fontFace: FONT_H, fontSize: 13, color: C.navy, align: "center", margin: 0,
        });
        // maturity label below
        s.addText(maturities[i], {
            x: x - 0.45, y: ay + ah + 0.1, w: 0.9, h: 0.35,
            fontFace: FONT_H, fontSize: 12, color: C.navyMid, align: "center", margin: 0,
        });
    });

    // dotted reference at 2Y
    {
        const x2y = xPositions[2];
        const yTop = y5ToInch(yields[2]);
        s.addShape(pres.shapes.LINE, {
            x: x2y, y: yTop + 0.1, w: 0, h: ay + ah - yTop - 0.1,
            line: { color: C.orange, width: 0.75, dashType: "dash" },
        });
    }
    s.addText("belly: short–end still elevated", {
        x: 2.7, y: ay + ah + 0.55, w: 4.5, h: 0.35,
        fontFace: FONT_B, fontSize: 12, color: C.orange, italic: true, align: "center", margin: 0,
    });

    // ----- Right: 4 stat callouts in a 2x2 grid -----
    const gx = 10.0, gy = 3.2, gw = 4.5, gh = 3.5;
    const cells = [
        // [bigText, isOrange, bigSuffix, label, body]
        ["+0.50",  false, "",  "10Y – 2Y SPREAD", "Re-steepened from a record −1.08\ntrough in July 2023."],
        ["−0.01",  true,  "",  "10Y – 3M SPREAD", "Flipping back and forth around zero\nsince February."],
        ["4.31",   false, "%", "10-YEAR YIELD",   "Anchored near 4.30 amid Mid-East\ntensions."],
        ["3.81",   false, "%", "2-YEAR YIELD",    "Pricing one cut by year-end 2026\n(≈26% odds)."],
    ];
    cells.forEach((c, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const cxPos = gx + col * gw;
        const cyPos = gy + row * gh;
        // Big number
        if (c[2]) {
            s.addText(
                [
                    { text: c[0], options: { color: c[1] ? C.orange : C.navy, bold: false, fontSize: 80 } },
                    { text: c[2], options: { color: c[1] ? C.orange : C.navy, bold: false, fontSize: 36 } },
                ],
                { x: cxPos, y: cyPos, w: gw - 0.2, h: 1.6,
                  fontFace: FONT_H, margin: 0, valign: "top" }
            );
        } else {
            s.addText(c[0], {
                x: cxPos, y: cyPos, w: gw - 0.2, h: 1.6,
                fontFace: FONT_H, fontSize: 80, color: c[1] ? C.orange : C.navy, margin: 0, valign: "top",
            });
        }
        // Label
        s.addText(c[3], {
            x: cxPos, y: cyPos + 1.5, w: gw - 0.2, h: 0.4,
            fontFace: FONT_H, fontSize: 13, color: C.slate, charSpacing: 4, bold: true, margin: 0,
        });
        // Body
        s.addText(c[4], {
            x: cxPos, y: cyPos + 1.95, w: gw - 0.2, h: 1.1,
            fontFace: FONT_B, fontSize: 16, color: C.navyMid, margin: 0, valign: "top",
        });
    });

    footer(s, "05 / Today", "Source: U.S. Treasury, FRED · Apr 24, 2026");
}

// =========================================================
// SLIDE 6 — Lead Times (table)
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "06", "LEAD TIMES", "Inversion → Recession");

    s.addText(
        [
            { text: "The signal works ", options: { color: C.navy } },
            { text: "on a lag.",         options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 16, h: 1.2,
          fontFace: FONT_H, fontSize: 48, bold: true, margin: 0 }
    );

    // Table
    const headerOpts = { fontFace: FONT_H, fontSize: 13, color: C.slate, bold: true, valign: "middle", charSpacing: 2 };
    const cellOpts   = { fontFace: FONT_B, fontSize: 16, color: C.navyMid, valign: "middle" };
    const lastRowFill = { color: "EFE5D7" }; // soft cream highlight

    const head = [
        { text: "FIRST INVERSION", options: { ...headerOpts, align: "left" } },
        { text: "RECESSION START", options: { ...headerOpts, align: "left" } },
        { text: "MONTHS LAG",      options: { ...headerOpts, align: "right" } },
        { text: "DAYS INVERTED",   options: { ...headerOpts, align: "right" } },
        { text: "TRIGGER / CONTEXT", options: { ...headerOpts, align: "left" } },
    ];

    const dataRows = [
        ["Aug 1978", "Jan 1980", "17", "624",  "Volcker tightening; 2nd oil shock"],
        ["Sep 1980", "Jul 1981", "10", "~330", "Volcker round two; double-dip"],
        ["Dec 1988", "Jul 1990", "19", "~430", "S&L crisis; Gulf War oil spike"],
        ["Feb 2000", "Mar 2001", "13", "~310", "Dot-com bust"],
        ["Jan 2006", "Dec 2007", "22", "~235", "Housing/sub-prime"],
        ["Aug 2019", "Feb 2020", "6",  "~141", "COVID exogenous shock"],
    ];

    function rowCells(r, isHL = false) {
        const c1 = { text: r[0], options: { ...cellOpts, align: "left",  color: isHL ? C.orange : C.navyMid } };
        const c2 = { text: r[1], options: { ...cellOpts, align: "left" } };
        const c3 = { text: r[2], options: { ...cellOpts, align: "right" } };
        const c4 = { text: r[3], options: { ...cellOpts, align: "right" } };
        const c5 = { text: r[4], options: { ...cellOpts, align: "left" } };
        if (isHL) {
            c2.options = { ...c2.options, fill: lastRowFill };
            c3.options = { ...c3.options, fill: lastRowFill, color: C.orange };
            c4.options = { ...c4.options, fill: lastRowFill, color: C.orange };
            c1.options = { ...c1.options, fill: lastRowFill };
            c5.options = { ...c5.options, fill: lastRowFill, color: C.orange, bold: true };
        }
        return [c1, c2, c3, c4, c5];
    }

    const lastRow = [
        { text: "Jul 2022", options: { ...cellOpts, align: "left",  color: C.orange, fill: lastRowFill, bold: true } },
        { text: "—",        options: { ...cellOpts, align: "left",  color: C.orange, fill: lastRowFill } },
        { text: "—",        options: { ...cellOpts, align: "right", color: C.orange, fill: lastRowFill } },
        { text: "~792",     options: { ...cellOpts, align: "right", color: C.orange, fill: lastRowFill } },
        { text: "Curve re-steepened Aug 2024 without recession",
          options: { ...cellOpts, align: "left", color: C.orange, fill: lastRowFill, bold: true } },
    ];

    const avgRow = [
        { text: "Average (1978–2019)", options: { ...cellOpts, align: "left", bold: true } },
        { text: "", options: { ...cellOpts } },
        { text: "~14 mo", options: { ...cellOpts, align: "right", bold: true } },
        { text: "~345",   options: { ...cellOpts, align: "right", bold: true } },
        { text: "",       options: { ...cellOpts } },
    ];

    const tableRows = [head, ...dataRows.map(r => rowCells(r)), lastRow, avgRow];

    s.addTable(tableRows, {
        x: 1.0, y: 3.1, w: 18.0,
        colW: [3.0, 3.0, 2.6, 2.8, 6.6],
        rowH: 0.65,
        border: { type: "solid", pt: 0.5, color: "DDD3C2" },
        fontFace: FONT_B, valign: "middle",
    });

    footer(s, "06 / Lead Times", "Source: NBER, FRED, Statista · 10Y–2Y unless noted");
}

// =========================================================
// SLIDE 7 — U.S. Bond Market: 3 cards + 4 footer stats
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "07", "U.S. BOND MARKET", "Implications");

    s.addText(
        [
            { text: "For Treasuries, the steepening ", options: { color: C.navy } },
            { text: "is the story.",                    options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 18, h: 1.2,
          fontFace: FONT_H, fontSize: 44, bold: true, margin: 0 }
    );

    // Three columns of content
    const cols = [
        {
            tag: "TERM PREMIUM",
            body: [
                { text: "A positively-sloped curve restores the term premium that vanished in 2022. " },
                { text: "Long duration is back to being compensated.", bold: true },
            ],
            note: "10Y term premium estimate: ≈ +35 bps, the highest since 2014.",
        },
        {
            tag: "FUNDING COST",
            body: [
                { text: "Treasury is now refinancing the post-COVID stack at " },
                { text: "3.8–4.9%", bold: true },
                { text: " . Net interest is on track to " },
                { text: "exceed defense", bold: true, color: C.orange },
                { text: " spending." },
            ],
            note: "Average coupon on outstanding marketable debt: ~3.4% and rising.",
        },
        {
            tag: "CURVE TRADES",
            body: [
                { text: "The 2s10s steepener — the consensus 2024 trade — has paid out. " },
                { text: "Bull-steepening is the next regime", bold: true },
                { text: " if the Fed cuts." },
            ],
            note: "Watch: 5s30s as the lead indicator of cut pricing.",
        },
    ];

    const startX = 1.0, startY = 3.2, colW = 5.9, colGap = 0.3;
    cols.forEach((col, i) => {
        const x = startX + i * (colW + colGap);
        // Tag pill (bordered rectangle)
        s.addShape(pres.shapes.RECTANGLE, {
            x, y: startY, w: 2.2, h: 0.5,
            fill: { color: C.cream },
            line: { color: C.orange, width: 0.75 },
        });
        s.addText(col.tag, {
            x, y: startY, w: 2.2, h: 0.5,
            fontFace: FONT_H, fontSize: 12, color: C.orange,
            charSpacing: 4, bold: true, align: "center", valign: "middle", margin: 0,
        });
        // Body
        const bodyRich = col.body.map((b) => ({
            text: b.text,
            options: { color: b.color || C.navyMid, bold: !!b.bold },
        }));
        s.addText(bodyRich, {
            x, y: startY + 0.85, w: colW, h: 2.5,
            fontFace: FONT_B, fontSize: 19, color: C.navyMid, margin: 0, valign: "top",
        });
        // Footnote
        s.addText(col.note, {
            x, y: startY + 3.4, w: colW, h: 0.7,
            fontFace: FONT_B, fontSize: 13, color: C.slate, margin: 0, valign: "top",
        });
    });

    // Divider above footer stats
    s.addShape(pres.shapes.LINE, {
        x: 1.0, y: 8.65, w: 18.0, h: 0,
        line: { color: C.slate, width: 0.5 },
    });

    // Bottom 4 stat strip
    const stats = [
        ["30Y MORTGAGE",        "6.37%"],
        ["FED FUNDS (TARGET)",  "4.25–4.50"],
        ["IG CREDIT OAS",       "88 bps"],
        ["HY CREDIT OAS",       "312 bps"],
    ];
    const sw = 4.5;
    stats.forEach(([lbl, val], i) => {
        const sx = 1.0 + i * sw;
        s.addText(lbl, {
            x: sx, y: 8.85, w: sw - 0.2, h: 0.4,
            fontFace: FONT_H, fontSize: 13, color: C.slate, charSpacing: 4, bold: true, margin: 0,
        });
        s.addText(val, {
            x: sx, y: 9.3, w: sw - 0.2, h: 0.85,
            fontFace: FONT_H, fontSize: 32, color: C.navy, margin: 0,
        });
    });

    footer(s, "07 / U.S. Bond Market", "Source: U.S. Treasury, Freddie Mac PMMS, ICE BofA OAS");
}

// =========================================================
// SLIDE 8 — Global Markets (left table + 3 right cards)
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "08", "GLOBAL MARKETS", "Spillovers");

    s.addText(
        [
            { text: "The U.S. curve is ", options: { color: C.navy } },
            { text: "everyone's",         options: { color: C.orange, italic: true } },
            { text: " anchor.",           options: { color: C.navy } },
        ],
        { x: 1.0, y: 1.7, w: 18, h: 1.2,
          fontFace: FONT_H, fontSize: 48, bold: true, margin: 0 }
    );

    // ---- Left table ----
    const tx = 1.0, ty = 3.2, twv = 9.0;
    // header
    s.addText("MARKET",  { x: tx,         y: ty, w: 3.5, h: 0.4, fontFace: FONT_H, fontSize: 12, color: C.slate, charSpacing: 4, bold: true, margin: 0 });
    s.addText("10Y–2Y",  { x: tx + 3.5,   y: ty, w: 2.0, h: 0.4, fontFace: FONT_H, fontSize: 12, color: C.slate, charSpacing: 4, bold: true, margin: 0, align: "right" });
    s.addText("STATUS",  { x: tx + 5.7,   y: ty, w: 3.0, h: 0.4, fontFace: FONT_H, fontSize: 12, color: C.slate, charSpacing: 4, bold: true, margin: 0 });

    // top divider
    s.addShape(pres.shapes.LINE, { x: tx, y: ty + 0.45, w: twv, h: 0, line: { color: C.slate, width: 0.5 } });

    const grows = [
        ["United States",   "+50 bps",  "Re-steepened"],
        ["Germany (Bunds)", "+72 bps",  "Re-steepened"],
        ["United Kingdom",  "+44 bps",  "Re-steepened"],
        ["Japan",           "+118 bps", "Bear-steepening"],
        ["Canada",          "+38 bps",  "Re-steepened"],
        ["Australia",       "+62 bps",  "Re-steepened"],
    ];
    const rh = 0.6;
    grows.forEach((r, i) => {
        const yy = ty + 0.55 + i * rh;
        s.addText(r[0], { x: tx,       y: yy, w: 3.5, h: rh, fontFace: FONT_B, fontSize: 17, color: C.navyMid, valign: "middle", margin: 0 });
        s.addText(r[1], { x: tx + 3.5, y: yy, w: 2.0, h: rh, fontFace: FONT_B, fontSize: 17, color: C.navyMid, valign: "middle", align: "right", margin: 0 });
        s.addText(r[2], { x: tx + 5.7, y: yy, w: 3.0, h: rh, fontFace: FONT_B, fontSize: 17, color: C.navyMid, valign: "middle", margin: 0 });
        // hairline below each row
        s.addShape(pres.shapes.LINE, {
            x: tx, y: yy + rh, w: twv, h: 0,
            line: { color: C.slate, width: 0.25, transparency: 60 },
        });
    });

    // table footnote
    s.addText("Indicative levels, April 2026. Most G10 curves inverted alongside the U.S. in 2022–23 and have re-steepened in lockstep.", {
        x: tx, y: ty + 0.55 + 6 * rh + 0.3, w: 8.5, h: 1.0,
        fontFace: FONT_B, fontSize: 13, color: C.slate, margin: 0, valign: "top",
    });

    // ---- Right cards: 3 stacked items ----
    const rx = 11.0, rwc = 8.0;
    const cards = [
        {
            tag: "DOLLAR",
            body: [
                { text: "Front-end repricing of cuts is a " },
                { text: "dollar-bearish", bold: true },
                { text: " impulse — partially offset by safe-haven flows from Mid-East risk." },
            ],
        },
        {
            tag: "EM DEBT",
            body: [
                { text: "A normalizing U.S. long-end " },
                { text: "re-opens the EM hard-currency window", bold: true },
                { text: " . Issuance pipeline is the heaviest since 2021." },
            ],
        },
        {
            tag: "JAPAN",
            body: [
                { text: "The outlier. " },
                { text: "JGB yields rising", bold: true },
                { text: " off historic lows is exporting duration risk back into U.S. and EU long bonds." },
            ],
        },
    ];

    const cardH = 2.1;
    cards.forEach((c, i) => {
        const cy = 3.2 + i * cardH;
        // Pill tag
        s.addShape(pres.shapes.RECTANGLE, {
            x: rx, y: cy, w: 1.4, h: 0.45,
            fill: { color: C.cream },
            line: { color: C.slate, width: 0.5 },
        });
        s.addText(c.tag, {
            x: rx, y: cy, w: 1.4, h: 0.45,
            fontFace: FONT_H, fontSize: 11, color: C.navyMid,
            charSpacing: 4, bold: true, align: "center", valign: "middle", margin: 0,
        });
        // Body rich text
        const bodyRich = c.body.map((b) => ({
            text: b.text, options: { color: C.navyMid, bold: !!b.bold },
        }));
        s.addText(bodyRich, {
            x: rx, y: cy + 0.7, w: rwc, h: cardH - 0.7,
            fontFace: FONT_B, fontSize: 19, color: C.navyMid, margin: 0, valign: "top",
        });
    });

    footer(s, "08 / Global Markets", "Source: Bloomberg, national debt agencies · Apr 2026");
}

// =========================================================
// SLIDE 9 — The Debate (dark, big quote)
// =========================================================
{
    const s = pres.addSlide();
    bg(s, true);
    header(s, "09", "THE DEBATE", "False Positive?", { dark: true });

    // Big italic pull quote with colored words
    s.addText(
        [
            { text: "“The curve was right about the ", options: { color: C.white, italic: true } },
            { text: "signal",                          options: { color: C.peach, italic: true } },
            { text: " — but wrong about the ",         options: { color: C.white, italic: true } },
            { text: "magnitude",                       options: { color: C.peach, italic: true } },
            { text: " of damage.”",                    options: { color: C.white, italic: true } },
        ],
        { x: 1.0, y: 3.3, w: 18, h: 2.5,
          fontFace: FONT_H, fontSize: 56, bold: true, margin: 0, valign: "top" }
    );

    s.addText("— THE 2022–2024 INVERSION DEBATE, IN ONE LINE", {
        x: 1.0, y: 6.0, w: 18, h: 0.5,
        fontFace: FONT_H, fontSize: 14, color: C.iceBlue2, charSpacing: 4, bold: true, margin: 0,
    });

    // Three forces
    const forces = [
        ["FORCE 01", "Fiscal stimulus offset tight money", "CHIPS, IRA and deficits ran ~6% of GDP through the inversion."],
        ["FORCE 02", "Labor healed without breaking",      "Slack reabsorbed via job-opening declines, not job losses."],
        ["FORCE 03", "AI productivity tailwind",           "Real growth surprised to the upside even as money was tight."],
    ];
    const fx0 = 1.0, fy = 7.7, fw = 5.9, fgap = 0.4;
    forces.forEach((f, i) => {
        const x = fx0 + i * (fw + fgap);
        s.addText(f[0], {
            x, y: fy, w: fw, h: 0.4,
            fontFace: FONT_H, fontSize: 13, color: C.peach, charSpacing: 4, bold: true, margin: 0,
        });
        s.addText(f[1], {
            x, y: fy + 0.45, w: fw, h: 0.9,
            fontFace: FONT_H, fontSize: 22, color: C.white, bold: true, margin: 0, valign: "top",
        });
        s.addText(f[2], {
            x, y: fy + 1.5, w: fw, h: 1.2,
            fontFace: FONT_B, fontSize: 15, color: C.iceBlue, margin: 0, valign: "top",
        });
    });

    footer(s, "09 / The Debate", "Editorial framing", { dark: true });
}

// =========================================================
// SLIDE 10 — Outlook (3 numbered columns)
// =========================================================
{
    const s = pres.addSlide();
    bg(s, false);
    header(s, "10", "OUTLOOK", "What to watch");

    s.addText(
        [
            { text: "Three signals ", options: { color: C.navy } },
            { text: "worth watching.", options: { color: C.orange, italic: true } },
        ],
        { x: 1.0, y: 1.7, w: 18, h: 1.2,
          fontFace: FONT_H, fontSize: 48, bold: true, margin: 0 }
    );

    const items = [
        ["01", "Does the 10-2 re-invert?",
            "The 10Y–3M has already flipped negative twice in 2026. A second 10-2 inversion would reset the recession clock — this time without the offsetting fiscal cushion.",
            "TRIGGER: 10Y–2Y < 0"],
        ["02", "Do credit spreads widen?",
            "High-yield OAS at 312 bps is below the 25-year median. Credit, not rates, is the cleaner late-cycle tell — a move above 450 bps historically confirms what the curve only suggests.",
            "TRIGGER: HY OAS > 450 BPS"],
        ["03", "Does unemployment trend?",
            "The Sahm rule has wobbled in and out of trigger since mid-2024. A sustained move past 4.5% would convert the curve's old warning into a confirmed cycle turn.",
            "TRIGGER: U-3 > 4.5% SUSTAINED"],
    ];
    const ix0 = 1.0, iy = 3.4, iw = 5.9, igap = 0.4;
    items.forEach((it, i) => {
        const x = ix0 + i * (iw + igap);
        // top hairline above number
        s.addShape(pres.shapes.LINE, {
            x, y: iy, w: iw - 0.3, h: 0,
            line: { color: C.navy, width: 0.75 },
        });
        // big number
        s.addText(it[0], {
            x, y: iy + 0.2, w: iw, h: 1.2,
            fontFace: FONT_H, fontSize: 64, color: C.orange, margin: 0, valign: "top",
        });
        // headline
        s.addText(it[1], {
            x, y: iy + 1.55, w: iw - 0.3, h: 0.6,
            fontFace: FONT_H, fontSize: 24, color: C.navy, bold: false, margin: 0, valign: "top",
        });
        // body
        s.addText(it[2], {
            x, y: iy + 2.25, w: iw - 0.3, h: 2.7,
            fontFace: FONT_B, fontSize: 18, color: C.navyMid, margin: 0, valign: "top",
        });
        // trigger
        s.addText(it[3], {
            x, y: iy + 5.0, w: iw - 0.3, h: 0.4,
            fontFace: FONT_H, fontSize: 13, color: C.orange, charSpacing: 4, bold: true, margin: 0,
        });
    });

    footer(s, "10 / Outlook · End", "Macro Research · April 2026");
}

// ---- Write file ----
pres.writeFile({ fileName: "Inverted_Yield_Curve.pptx" })
    .then((fn) => console.log("Written:", fn))
    .catch((e) => { console.error(e); process.exit(1); });
