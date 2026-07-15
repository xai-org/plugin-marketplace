// Rowhouse & Oak — Residential Services 2026
// Rebuilds the original deck using pptxgenjs.
//
// Usage:
//   npm install pptxgenjs
//   node build-deck.js
//
// Expects ./images/image1.jpeg, image2.jpeg, image3.jpeg alongside this file.

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.defineLayout({ name: "RHO_16_9", width: 20, height: 11.25 });
pres.layout = "RHO_16_9";
pres.title = "Rowhouse & Oak — Residential Services 2026";

// ---------- Palette ----------
const C = {
    cream:       "F4EFE2",
    creamLight:  "FBF7EC",
    creamPaper:  "E6DCC3",
    forest:      "0F1A14",
    forestDeep:  "0D2018",
    forestMid:   "1F3B2D",   // main brand dark green (cover, card, contact panel)
    forestGrey:  "2A3A30",
    muted:       "3E5B43",
    greyText:    "4A5A50",
    greyLight:   "6B7A70",
    gold:        "CDB577",
    goldDeep:    "B08A3E",
    goldSoft:    "D9D0B6",
    rule:        "C9C0A8",
    white:       "FFFFFF",
};

const F = {
    header: "Georgia",
    body:   "Helvetica",
};

const IMG = {
    slide1:  path.join(__dirname, "images", "image1.jpeg"),
    slide6:  path.join(__dirname, "images", "image2.jpeg"),
    slide12: path.join(__dirname, "images", "image3.jpeg"),
};

// ---------- Common helpers ----------
const eyebrowOpts = {
    fontFace: F.body, fontSize: 10, color: C.greyText, charSpacing: 4,
};

function addHeader(slide, rightLabel) {
    slide.addShape("ellipse", {
        x: 1.04, y: 0.82, w: 0.14, h: 0.14,
        fill: { color: C.forest }, line: { color: C.forest },
    });
    slide.addText("ROWHOUSE & OAK", {
        x: 1.3, y: 0.68, w: 4.0, h: 0.33,
        ...eyebrowOpts,
    });
    if (rightLabel) {
        slide.addText(rightLabel, {
            x: 14.5, y: 0.68, w: 4.5, h: 0.33,
            ...eyebrowOpts, align: "right",
        });
    }
}

function bgCream(slide) {
    slide.background = { color: C.cream };
}

function bigTitle(s, text, y = 2.2, h = 2.4, w = 17.0, size = 64) {
    s.addText(text, {
        x: 1.04, y, w, h,
        fontFace: F.header, fontSize: size, color: C.forest,
        valign: "top", margin: 0,
    });
}

function subTitle(s, text, y, h = 1.4, w = 14.0, size = 22) {
    s.addText(text, {
        x: 1.04, y, w, h,
        fontFace: F.header, fontSize: size, color: C.greyText, italic: true,
        valign: "top",
    });
}

// ============================================================
// SLIDE 1 — Cover (full forest green + cream-framed photo on right)
// ============================================================
{
    const s = pres.addSlide();
    s.background = { color: C.forestMid };

    // Cream frame behind the image
    s.addShape("rect", {
        x: 10.6, y: 0.85, w: 8.58, h: 9.55,
        fill: { color: C.cream }, line: { color: C.cream },
    });
    s.addImage({ path: IMG.slide1, x: 10.82, y: 1.04, w: 8.13, h: 9.17 });

    // Top eyebrow
    s.addShape("ellipse", {
        x: 1.04, y: 1.18, w: 0.14, h: 0.14,
        fill: { color: C.gold }, line: { color: C.gold },
    });
    s.addText("ROWHOUSE & OAK · EST. 2016 · WASHINGTON, D.C.", {
        x: 1.3, y: 1.04, w: 9.0, h: 0.4,
        fontFace: F.body, fontSize: 11, color: C.goldSoft, charSpacing: 4,
    });

    // Big title — all cream, only the ampersand is gold
    s.addText([
        { text: "Rowhouse\n", options: { color: C.cream } },
        { text: "& ",         options: { color: C.gold } },
        { text: "Oak",        options: { color: C.cream } },
    ], {
        x: 1.04, y: 2.1, w: 9.22, h: 4.6,
        fontFace: F.header, fontSize: 115, valign: "top", margin: 0,
    });

    // Description
    s.addText(
        "A boutique landscaping company caring for the small yards, alleys, and gardens of urban Washington.",
        {
            x: 1.04, y: 7.1, w: 8.4, h: 2.0,
            fontFace: F.header, fontSize: 22, color: C.creamLight, italic: true,
            valign: "top",
        }
    );

    // Bottom labels
    s.addShape("line", {
        x: 1.04, y: 9.85, w: 9.22, h: 0,
        line: { color: C.muted, width: 0.5 },
    });
    s.addText("RESIDENTIAL SERVICES 2026", {
        x: 1.04, y: 10.0, w: 4.14, h: 0.5,
        fontFace: F.body, fontSize: 10, color: C.gold, charSpacing: 4,
    });
    s.addText("PREPARED FOR OUR NEIGHBORS", {
        x: 5.47, y: 10.0, w: 4.65, h: 0.5,
        fontFace: F.body, fontSize: 10, color: C.creamLight, charSpacing: 4,
    });

    // Page number in top-right of the photo (matches original)
    s.addText("NO. 01 / 12", {
        x: 16.3, y: 1.3, w: 2.4, h: 0.35,
        fontFace: F.body, fontSize: 10, color: C.forest, charSpacing: 4, align: "right",
    });
}

// ============================================================
// SLIDE 2 — The Problem (2x2 grid of points)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "I. THE PROBLEM");

    bigTitle(s, "The urban yard is its own animal.", 1.8, 2.6, 17.0, 68);
    subTitle(s,
        "Twenty-foot frontages. Alley access only. Gas mowers banned.\nMost lawn companies are built for the suburbs — not for Capitol Hill.",
        4.7, 1.8, 13.5, 24
    );

    const items = [
        ["i.",   "Tight lots, narrow gates",       "Ride-on mowers can't fit. Most crews won't bother."],
        ["ii.",  "The 2022 gas-powered ban",       "DC outlawed gas leaf blowers. Most companies still use them."],
        ["iii.", "Historic trees, fragile roots",  "Oaks, magnolias, and dogwoods that need a lighter touch."],
        ["iv.",  "Neighbors ten feet away",        "No one wants a two-stroke engine at 7am on a Saturday."],
    ];
    const gridX = 1.04, gridY = 7.3;
    const colW = 8.9, rowH = 1.75;
    const gapX = 0.15;

    items.forEach(([num, head, body], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const cx = gridX + col * (colW + gapX);
        const cy = gridY + row * rowH;
        s.addShape("line", {
            x: cx, y: cy, w: colW, h: 0,
            line: { color: C.rule, width: 0.75 },
        });
        s.addText(num, {
            x: cx, y: cy + 0.1, w: colW, h: 0.35,
            fontFace: F.header, fontSize: 13, color: C.gold, italic: true,
        });
        s.addText(head, {
            x: cx, y: cy + 0.45, w: colW, h: 0.5,
            fontFace: F.header, fontSize: 22, color: C.forest,
        });
        s.addText(body, {
            x: cx, y: cy + 1.0, w: colW, h: 0.6,
            fontFace: F.body, fontSize: 13, color: C.greyText, valign: "top",
        });
    });
}

// ============================================================
// SLIDE 3 — Our Approach (3 columns, bigger)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "II. OUR APPROACH");

    bigTitle(s, "Built for the block you live on.", 1.8, 2.6, 17.0, 68);
    subTitle(s,
        "An all-electric crew, a fixed seasonal calendar, and one gardener\nwho actually remembers your name.",
        4.7, 1.6, 14.0, 24
    );

    const items = [
        ["i. Quiet",          "Battery-electric, end to end",    "Mowers, blowers, trimmers, saws — every tool runs on lithium. No two-stroke, no exceptions."],
        ["ii. Attentive",     "One crew, one yard",              "You'll see the same two people every visit. They know your gate latch, your dog, your tomato cage."],
        ["iii. Whole-garden", "Lawn, mulch, leaves, all seasons","One number. One invoice. Twelve months of care — from spring cleanup to the last fallen leaf."],
    ];
    const startX = 1.04;
    const colW = 5.86;
    const gap = 0.33;
    const ruleY = 7.0;
    items.forEach(([num, head, body], i) => {
        const cx = startX + i * (colW + gap);
        s.addShape("line", {
            x: cx, y: ruleY, w: colW, h: 0,
            line: { color: C.rule, width: 0.75 },
        });
        s.addText(num, {
            x: cx, y: ruleY + 0.12, w: colW, h: 0.4,
            fontFace: F.header, fontSize: 14, color: C.gold, italic: true,
        });
        s.addText(head, {
            x: cx, y: ruleY + 0.55, w: colW, h: 1.3,
            fontFace: F.header, fontSize: 28, color: C.forest, valign: "top",
        });
        s.addText(body, {
            x: cx, y: ruleY + 2.0, w: colW, h: 2.0,
            fontFace: F.body, fontSize: 14, color: C.greyText, valign: "top",
        });
    });
}

// ============================================================
// SLIDE 4 — Compliance (with decibel bars)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "III. COMPLIANCE");

    // LEFT: title + body
    s.addText("Quiet by law.\nQuiet by design.", {
        x: 1.04, y: 1.9, w: 9.0, h: 3.2,
        fontFace: F.header, fontSize: 60, color: C.forest, valign: "top", margin: 0,
    });
    s.addText(
        "DC's 2022 ordinance banned gas-powered leaf blowers citywide. We built our company around that rule — years before it passed.",
        {
            x: 1.04, y: 5.7, w: 8.5, h: 1.8,
            fontFace: F.header, fontSize: 20, italic: true, color: C.greyText, valign: "top",
        }
    );
    s.addText(
        "A typical gas blower runs at 95–105 decibels — loud enough to be heard three blocks away. Our equipment averages 65 dB, closer to normal conversation.",
        {
            x: 1.04, y: 8.2, w: 8.5, h: 2.0,
            fontFace: F.body, fontSize: 12, color: C.greyText, valign: "top",
        }
    );

    // RIGHT: decibel list with bars
    const panelX = 11.4;
    const panelW = 7.6;

    s.addText("DECIBEL COMPARISON", {
        x: panelX, y: 1.9, w: panelW, h: 0.4,
        fontFace: F.body, fontSize: 10, color: C.goldDeep, charSpacing: 4,
    });

    const rows = [
        ["Gas leaf blower",     "BANNED IN DC SINCE 2022",      "105 dB", 105, C.forest,    C.forestMid],
        ["Gas lawn mower",      "STILL COMMON IN THE SUBURBS",  "90 dB",  90,  C.forest,    C.forestMid],
        ["Rowhouse & Oak",      "BATTERY-ELECTRIC, END TO END", "65 dB",  65,  C.goldDeep,  C.goldDeep],
        ["Normal conversation", "FOR REFERENCE",                "60 dB",  60,  C.greyLight, C.greyLight],
    ];
    const rowH = 1.85;
    const rowStartY = 2.6;
    const maxDb = 110;

    rows.forEach(([name, sub, dB, val, numColor, barColor], i) => {
        const ry = rowStartY + i * rowH;
        if (i > 0) {
            s.addShape("line", {
                x: panelX, y: ry - 0.1, w: panelW, h: 0,
                line: { color: C.rule, width: 0.5 },
            });
        }
        s.addText(name, {
            x: panelX, y: ry, w: panelW - 2.0, h: 0.5,
            fontFace: F.header, fontSize: 20, color: C.forest,
        });
        s.addText(sub, {
            x: panelX, y: ry + 0.55, w: panelW - 2.0, h: 0.3,
            fontFace: F.body, fontSize: 9, color: C.greyLight, charSpacing: 3,
        });
        s.addText(dB, {
            x: panelX + panelW - 2.0, y: ry, w: 2.0, h: 0.7,
            fontFace: F.header, fontSize: 26, color: numColor, align: "right", valign: "top",
        });
        // Bar visualization
        const barY = ry + 1.05;
        const barH = 0.08;
        s.addShape("rect", {
            x: panelX, y: barY, w: panelW, h: barH,
            fill: { color: C.rule }, line: { color: C.rule },
        });
        const fillW = (val / maxDb) * panelW;
        s.addShape("rect", {
            x: panelX, y: barY, w: fillW, h: barH,
            fill: { color: barColor }, line: { color: barColor },
        });
    });
}

// ============================================================
// SLIDE 5 — Services (bordered boxes)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "IV. SERVICES");
    bigTitle(s, "Full-service care, one gardener.", 1.8, 2.6, 17.0, 62);
    subTitle(s,
        "Three pillars of work — handled by the same team, on the same schedule, all year.",
        4.7, 1.2, 16.0, 22
    );

    const items = [
        ["i.",  "Lawn Care",
            "Weekly or biweekly mowing, edging, trimming, and trim-line cleanup. Aeration and overseeding in the fall.",
            ["MOW & EDGE", "AERATE & OVERSEED", "ORGANIC FERTILIZATION"]],
        ["ii.", "Mulching & Beds",
            "Hardwood mulch delivered and installed by hand. Bed edging, weed pulling, and seasonal plantings.",
            ["HARDWOOD MULCH, 2\u2033 DEEP", "BED RESHAPE & EDGE", "SPRING & FALL PLANTINGS"]],
        ["iii.","Leaf Removal",
            "Weekly fall visits from October through December. Leaves bagged and hauled — never blown to the curb.",
            ["WEEKLY FALL VISITS", "GUTTER-LINE CLEARING", "BAGGED & HAULED OFF-SITE"]],
    ];
    const startX = 1.04;
    const colW = 5.86;
    const gap = 0.33;
    const cardY = 6.6;
    const cardH = 4.1;
    items.forEach(([num, head, body, tags], i) => {
        const cx = startX + i * (colW + gap);
        s.addShape("rect", {
            x: cx, y: cardY, w: colW, h: cardH,
            fill: { color: C.creamLight }, line: { color: C.rule, width: 0.75 },
        });
        s.addText(num, {
            x: cx + 0.4, y: cardY + 0.35, w: colW - 0.8, h: 0.4,
            fontFace: F.header, fontSize: 16, color: C.gold, italic: true,
        });
        s.addText(head, {
            x: cx + 0.4, y: cardY + 0.8, w: colW - 0.8, h: 0.7,
            fontFace: F.header, fontSize: 28, color: C.forest,
        });
        s.addText(body, {
            x: cx + 0.4, y: cardY + 1.7, w: colW - 0.8, h: 1.3,
            fontFace: F.body, fontSize: 12.5, color: C.greyText, valign: "top",
        });
        s.addText(tags.join("\n"), {
            x: cx + 0.4, y: cardY + 3.05, w: colW - 0.8, h: 1.0,
            fontFace: F.body, fontSize: 10, color: C.forest, charSpacing: 3,
            valign: "top", paraSpaceAfter: 4,
        });
    });
}

// ============================================================
// SLIDE 6 — Calendar (image left, table right)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    s.addImage({ path: IMG.slide6, x: 0, y: 0, w: 10.0, h: 11.25 });

    s.addText("V. THE CALENDAR", {
        x: 14.5, y: 0.68, w: 4.5, h: 0.33,
        ...eyebrowOpts, align: "right",
    });

    s.addText("One plan.\nFour seasons.", {
        x: 10.6, y: 1.9, w: 8.5, h: 3.2,
        fontFace: F.header, fontSize: 52, color: C.forest, valign: "top", margin: 0,
    });

    const seasons = [
        ["Mar–May", "SPRING", "Wake-up & mulch",  "Bed cleanup, fresh mulch, first mows, pre-emergent."],
        ["Jun–Aug", "SUMMER", "Weekly rhythm",    "Mow, edge, detail. Deep weed pulls every third visit."],
        ["Sep–Nov", "AUTUMN", "Aerate & leaves",  "Overseed, fertilize, then weekly leaf removal as they fall."],
        ["Dec–Feb", "WINTER", "Rest & prune",     "Dormant pruning, final cleanup, plans drawn for spring."],
    ];
    const baseY = 5.4;
    const rowH = 1.28;
    seasons.forEach(([mo, season, head, body], i) => {
        const ry = baseY + i * rowH;
        s.addShape("line", {
            x: 10.6, y: ry, w: 8.5, h: 0,
            line: { color: C.rule, width: 0.75 },
        });
        s.addText(mo, {
            x: 10.6, y: ry + 0.2, w: 2.0, h: 0.6,
            fontFace: F.header, fontSize: 24, color: C.forest,
        });
        s.addText(season, {
            x: 10.6, y: ry + 0.85, w: 2.0, h: 0.3,
            fontFace: F.body, fontSize: 9, color: C.gold, charSpacing: 3,
        });
        s.addText(head, {
            x: 12.85, y: ry + 0.2, w: 3.0, h: 0.6,
            fontFace: F.header, fontSize: 19, color: C.forest, bold: true,
        });
        s.addText(body, {
            x: 16.0, y: ry + 0.25, w: 3.05, h: 1.0,
            fontFace: F.body, fontSize: 11, color: C.greyText, valign: "top",
        });
    });
}

// ============================================================
// SLIDE 7 — A Visit (4 step columns, italic serif step labels)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "VI. A VISIT");
    bigTitle(s, "What a visit looks like.", 1.8, 2.4, 17.0, 62);
    subTitle(s,
        "Thirty-five to fifty minutes on a typical row-house yard. You don't need to be home.",
        4.5, 1.0, 14.0, 22
    );

    const steps = [
        ["STEP ONE",   "Arrive & greet", "A text five minutes out. Side gate opened, dog safely inside. No surprises, no knocking."],
        ["STEP TWO",   "Mow & edge",     "Battery mower on a sharp blade. Hard edges along walks and beds. Trim-line cleaned."],
        ["STEP THREE", "Detail & beds",  "Hand-pull weeds. Touch up mulch. Prune anything climbing the fence. Sweep the alley."],
        ["STEP FOUR",  "Close & report", "Photos emailed the same day. Anything we noticed — grub damage, a loose downspout — we flag."],
    ];
    const startX = 1.04;
    const colW = 4.4;
    const gap = 0.23;
    const ruleY = 7.0;
    steps.forEach(([label, head, body], i) => {
        const cx = startX + i * (colW + gap);
        s.addShape("line", {
            x: cx, y: ruleY, w: colW, h: 0,
            line: { color: C.rule, width: 0.75 },
        });
        s.addText(label, {
            x: cx, y: ruleY + 0.18, w: colW, h: 0.35,
            fontFace: F.header, fontSize: 12, color: C.forest, italic: true,
            charSpacing: 2,
        });
        s.addText(head, {
            x: cx, y: ruleY + 0.75, w: colW, h: 0.8,
            fontFace: F.header, fontSize: 26, color: C.forest, valign: "top",
        });
        s.addText(body, {
            x: cx, y: ruleY + 1.9, w: colW, h: 2.4,
            fontFace: F.body, fontSize: 13, color: C.greyText, valign: "top",
        });
    });
}

// ============================================================
// SLIDE 8 — Track record (stats + pill badges)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "VII. TRACK RECORD");
    bigTitle(s, "Ten years, one city.", 1.8, 2.2, 17.0, 62);
    subTitle(s,
        "We've only ever worked one zip-code type: yours. Every yard we care for is\nwithin six miles of our shop in Brookland.",
        4.4, 1.6, 14.0, 22
    );

    // Divider above the stats
    s.addShape("line", {
        x: 1.04, y: 6.6, w: 17.92, h: 0,
        line: { color: C.rule, width: 0.75 },
    });

    const stats = [
        ["10",  "yrs", "IN BUSINESS",          "Founded 2016. Same owner, same crew leads, every season since."],
        ["4.9", "★",   "GOOGLE RATING",        "Averaged across 210+ reviews. Angi Super Service award, five years running."],
        ["380", "+",   "DC HOUSEHOLDS SERVED", "From Capitol Hill to Petworth, Shaw, Brookland, H Street, and Hill East."],
    ];
    const startX = 1.04;
    const colW = 5.86;
    const gap = 0.33;
    const baseY = 7.0;
    stats.forEach(([num, suffix, label, body], i) => {
        const cx = startX + i * (colW + gap);
        s.addText([
            { text: num,    options: { fontFace: F.header, fontSize: 88, color: C.forest } },
            { text: suffix, options: { fontFace: F.header, fontSize: 30, color: C.gold } },
        ], {
            x: cx, y: baseY, w: colW, h: 1.4, valign: "top", margin: 0,
        });
        s.addText(label, {
            x: cx, y: baseY + 1.4, w: colW, h: 0.35,
            fontFace: F.body, fontSize: 10, color: C.forest, charSpacing: 4,
        });
        s.addText(body, {
            x: cx, y: baseY + 1.85, w: colW, h: 1.1,
            fontFace: F.body, fontSize: 12, color: C.greyText, valign: "top",
        });
    });

    // Pill badges at bottom
    const badges = [
        "★ Google 4.9",
        "✓ Angi Super Service 2021–2025",
        "§ DC Licensed & Insured",
        "↗ Nextdoor Neighborhood Favorite",
    ];
    const pillY = 10.3;
    const pillH = 0.55;
    const pillGap = 0.15;
    const totalW = 17.92;
    const pillW = (totalW - pillGap * 3) / 4;
    badges.forEach((b, i) => {
        const px = 1.04 + i * (pillW + pillGap);
        s.addShape("roundRect", {
            x: px, y: pillY, w: pillW, h: pillH,
            fill: { color: C.creamLight }, line: { color: C.rule, width: 0.5 },
            rectRadius: 0.08,
        });
        s.addText(b, {
            x: px, y: pillY, w: pillW, h: pillH,
            fontFace: F.body, fontSize: 10, color: C.greyText, charSpacing: 3,
            align: "center", valign: "middle",
        });
    });
}

// ============================================================
// SLIDE 9 — Reviews (2x2, taller cards)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "VIII. REVIEWS");
    bigTitle(s, "What neighbors say.", 1.8, 2.2, 17.0, 62);
    subTitle(s,
        "A few of the four hundred we could have picked.",
        4.2, 0.7, 14.0, 22
    );

    const reviews = [
        ["\u201CThey show up when they say they will, the yard looks like a garden, and I never hear them coming. Three things my last company couldn't manage between them.\u201D",
            "— M. ALVAREZ · CAPITOL HILL · GOOGLE"],
        ["\u201CWe went through four companies before Rowhouse & Oak. Five years later we've never looked back. Same two guys every week. They know the yard better than we do.\u201D",
            "— THE KESSLER FAMILY · SHAW · ANGI"],
        ["\u201CThe fall leaf service alone is worth the year's fee. They bag every last one — and I have three sweetgums.\u201D",
            "— R. CHANG · BROOKLAND · GOOGLE"],
        ["\u201CQuiet, respectful, and genuinely good at the craft. Our neighbors ask for their number almost every week.\u201D",
            "— D. & J. WHITFIELD · HILL EAST · NEXTDOOR"],
    ];
    const baseX = 1.04, baseY = 5.6;
    const cardW = 8.85, cardH = 2.5;
    const gapX = 0.22, gapY = 0.25;
    reviews.forEach(([quote, attrib], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const cx = baseX + col * (cardW + gapX);
        const cy = baseY + row * (cardH + gapY);
        s.addShape("rect", {
            x: cx, y: cy, w: cardW, h: cardH,
            fill: { color: C.creamLight }, line: { color: C.rule, width: 0.5 },
        });
        s.addText("★★★★★", {
            x: cx + 0.35, y: cy + 0.25, w: cardW - 0.7, h: 0.4,
            fontFace: F.body, fontSize: 14, color: C.goldDeep,
        });
        s.addText(quote, {
            x: cx + 0.35, y: cy + 0.7, w: cardW - 0.7, h: 1.3,
            fontFace: F.header, fontSize: 15, italic: true, color: C.forest, valign: "top",
        });
        s.addText(attrib, {
            x: cx + 0.35, y: cy + cardH - 0.45, w: cardW - 0.7, h: 0.3,
            fontFace: F.body, fontSize: 9, color: C.greyLight, charSpacing: 3,
        });
    });
}

// ============================================================
// SLIDE 10 — Plans (three cards, taller)
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);
    addHeader(s, "IX. PLANS");
    bigTitle(s, "Three plans. No surprises.", 1.8, 2.2, 17.0, 62);
    subTitle(s,
        "Flat monthly pricing for a typical DC row-house yard (under 1,200 sq ft).\nLarger yards and corner lots are quoted on a walkthrough.",
        4.2, 1.6, 15.0, 22
    );

    const plans = [
        {
            tag: "ESSENTIAL", name: "The Sidewalk", price: "$180", per: "/ month",
            sub: "The basics, done weekly and done well. For small front yards.",
            features: ["Biweekly mow, edge, trim", "Seasonal mulch refresh", "Fall leaf removal", "Photo report each visit"],
            highlight: false,
        },
        {
            tag: "MOST POPULAR", name: "The Rowhouse", price: "$285", per: "/ month",
            sub: "Our full service. Front, back, and the alley strip. For most homes.",
            features: ["Weekly mow, edge, detail", "Spring + fall mulch, all beds", "Aeration & overseeding", "Weekly fall leaf removal", "Dormant winter pruning"],
            highlight: true,
        },
        {
            tag: "COMPREHENSIVE", name: "The Garden", price: "$420", per: "/ month",
            sub: "Everything in Rowhouse, plus planted beds and ornamental care.",
            features: ["Seasonal plantings, 2× / year", "Ornamental pruning", "Container refresh", "On-call visits included"],
            highlight: false,
        },
    ];

    const baseX = 1.04, baseY = 6.2;
    const cardW = 5.86, cardH = 4.75;
    const gapX = 0.33;
    plans.forEach((p, i) => {
        const cx = baseX + i * (cardW + gapX);
        const isHi = p.highlight;
        s.addShape("rect", {
            x: cx, y: baseY, w: cardW, h: cardH,
            fill: { color: isHi ? C.forestMid : C.creamLight },
            line: { color: isHi ? C.forestMid : C.rule, width: 0.75 },
        });
        s.addText(p.tag, {
            x: cx + 0.4, y: baseY + 0.35, w: cardW - 0.8, h: 0.35,
            fontFace: F.body, fontSize: 10, charSpacing: 4,
            color: isHi ? C.gold : C.goldDeep,
        });
        s.addText(p.name, {
            x: cx + 0.4, y: baseY + 0.75, w: cardW - 0.8, h: 0.7,
            fontFace: F.header, fontSize: 30,
            color: isHi ? C.cream : C.forest,
        });
        s.addText([
            { text: p.price, options: { fontFace: F.header, fontSize: 42, color: isHi ? C.gold : C.forest } },
            { text: " " + p.per, options: { fontFace: F.body, fontSize: 13, color: isHi ? C.creamLight : C.greyText } },
        ], {
            x: cx + 0.4, y: baseY + 1.5, w: cardW - 0.8, h: 0.9,
            valign: "top", margin: 0,
        });
        s.addText(p.sub, {
            x: cx + 0.4, y: baseY + 2.45, w: cardW - 0.8, h: 0.9,
            fontFace: F.body, fontSize: 11,
            color: isHi ? C.creamLight : C.greyText, valign: "top",
        });
        s.addShape("line", {
            x: cx + 0.4, y: baseY + 3.35, w: cardW - 0.8, h: 0,
            line: { color: isHi ? C.muted : C.rule, width: 0.5 },
        });
        s.addText(p.features.join("\n"), {
            x: cx + 0.4, y: baseY + 3.5, w: cardW - 0.8, h: 1.2,
            fontFace: F.body, fontSize: 11,
            color: isHi ? C.creamLight : C.greyText,
            valign: "top", paraSpaceAfter: 3,
        });
    });
}

// ============================================================
// SLIDE 11 — Pull quote
// ============================================================
{
    const s = pres.addSlide();
    bgCream(s);

    s.addText("\u201C", {
        x: 1.04, y: 1.5, w: 3.5, h: 3.5,
        fontFace: F.header, fontSize: 220, color: C.gold, valign: "top", margin: 0,
    });

    s.addText(
        "A well-kept yard is a quiet gift to the whole block. We take that seriously — and we keep it quiet.",
        {
            x: 1.04, y: 4.5, w: 17.9, h: 4.5,
            fontFace: F.header, fontSize: 56, italic: true, color: C.forest,
            valign: "top", margin: 0,
        }
    );

    s.addText("— DANIEL PARK, FOUNDER & HEAD GARDENER", {
        x: 1.04, y: 9.2, w: 12.0, h: 0.4,
        fontFace: F.body, fontSize: 11, color: C.greyText, charSpacing: 4,
    });
}

// ============================================================
// SLIDE 12 — Contact / Close
// ============================================================
{
    const s = pres.addSlide();
    s.addImage({ path: IMG.slide12, x: 9.0, y: 0, w: 11.0, h: 11.25 });
    s.addShape("rect", {
        x: 0, y: 0, w: 9.0, h: 11.25,
        fill: { color: C.forestMid }, line: { color: C.forestMid },
    });

    s.addText("BOOK A FREE WALKTHROUGH", {
        x: 1.04, y: 1.0, w: 7.5, h: 0.4,
        fontFace: F.body, fontSize: 11, color: C.gold, charSpacing: 4,
    });

    s.addText("Let's walk\nyour yard.", {
        x: 1.04, y: 1.8, w: 7.5, h: 3.5,
        fontFace: F.header, fontSize: 64, color: C.cream, valign: "top", margin: 0,
    });

    s.addText(
        "Fifteen minutes on your front steps. A written quote in your inbox by the next morning — no pressure, no upsell.",
        {
            x: 1.04, y: 5.2, w: 7.5, h: 1.6,
            fontFace: F.header, fontSize: 18, italic: true, color: C.creamLight, valign: "top",
        }
    );

    const ctas = [
        ["CALL OR TEXT",  "(202) 555-0184"],
        ["BOOK ONLINE",   "rowhouseoak.com / book"],
        ["SERVICE AREA",  "NW · NE · SE Washington, D.C."],
    ];
    const ctaStartY = 7.3;
    const ctaRowH = 0.9;
    ctas.forEach(([label, val], i) => {
        const ry = ctaStartY + i * ctaRowH;
        s.addShape("line", {
            x: 1.04, y: ry, w: 7.5, h: 0,
            line: { color: C.muted, width: 0.5 },
        });
        s.addText(label, {
            x: 1.04, y: ry + 0.2, w: 2.5, h: 0.4,
            fontFace: F.body, fontSize: 10, color: C.gold, charSpacing: 4,
        });
        s.addText(val, {
            x: 3.7, y: ry + 0.15, w: 4.8, h: 0.5,
            fontFace: F.header, fontSize: 18, color: C.cream,
        });
    });

    s.addText("ROWHOUSE & OAK · EST. 2016 · LICENSED & INSURED", {
        x: 1.04, y: 10.5, w: 7.5, h: 0.4,
        fontFace: F.body, fontSize: 9, color: C.goldSoft, charSpacing: 4,
    });
}

// ---------- Write ----------
pres.writeFile({ fileName: "Lawn_Care_Service_Rebuilt.pptx" })
    .then(fn => console.log("Wrote:", fn))
    .catch(err => { console.error(err); process.exit(1); });
