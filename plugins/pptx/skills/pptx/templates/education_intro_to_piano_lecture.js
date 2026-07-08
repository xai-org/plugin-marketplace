// Introduction to Piano - pptxgenjs replica
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pres.title = "Introduction to Piano";

// Palette
const CREAM = "F0EBE0";
const DARK = "1A1A1A";
const RED = "8B1F2B";
const MUTED = "9BA193";       // sage-gray for meta text
const BODY = "2B2B2B";
const LINE = "C9C3B5";
const DARK_BG = "0F0E0C";
const GOLD = "C9A86A";
const CREAM_LIGHT = "EDE6D9";

const FH = "Calibri";   // header
const FB = "Calibri";   // body

// Common helpers ----------------------------------------------
function addTopMeta(slide, chapterText, pageText) {
    if (chapterText) {
        slide.addText(chapterText, {
            x: 0.6, y: 0.42, w: 5, h: 0.3,
            fontFace: FB, fontSize: 11, bold: false,
            color: RED, charSpacing: 4
        });
    }
    if (pageText) {
        slide.addText(pageText, {
            x: 8.3, y: 0.42, w: 4.4, h: 0.3,
            fontFace: FB, fontSize: 11,
            color: MUTED, charSpacing: 4, align: "right"
        });
    }
}
function addFooter(slide, color) {
    slide.addText("INTRODUCTION TO PIANO", {
        x: 0.6, y: 7.05, w: 6, h: 0.3,
        fontFace: FB, fontSize: 10,
        color: color || MUTED, charSpacing: 4
    });
}

// =============== SLIDE 1 — Title ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };

    s.addText("MUS 101 · LECTURE ONE", {
        x: 0.6, y: 0.42, w: 5, h: 0.3,
        fontFace: FB, fontSize: 11, color: DARK, charSpacing: 4
    });
    s.addText("SPRING 2026", {
        x: 8.3, y: 0.42, w: 4.4, h: 0.3,
        fontFace: FB, fontSize: 11, color: MUTED, charSpacing: 4, align: "right"
    });

    s.addText("A BEGINNER'S COURSE", {
        x: 0.6, y: 1.35, w: 6, h: 0.35,
        fontFace: FB, fontSize: 12, color: RED, charSpacing: 4, bold: false
    });

    s.addText([
        { text: "Introduction to ", options: { color: DARK } },
        { text: "\n", options: {} },
        { text: "Piano", options: { color: DARK } },
        { text: ".", options: { color: RED } }
    ], {
        x: 0.55, y: 1.7, w: 12, h: 2.9,
        fontFace: FH, fontSize: 96, bold: false,
        valign: "top", margin: 0
    });

    s.addText("Eighty-eight keys. One very good place to start.", {
        x: 0.6, y: 4.9, w: 9, h: 0.5,
        fontFace: FB, fontSize: 18, italic: true, color: BODY
    });

    // Mini keyboard (4 octave-like segments)
    const kbX = 0.6, kbY = 5.7, kbH = 1.35;
    const whiteW = 0.32;
    const segments = 4;
    const whitesPerSeg = 7;
    const gapBetweenSeg = 0.08;
    for (let seg = 0; seg < segments; seg++) {
        const segX = kbX + seg * (whitesPerSeg * whiteW + gapBetweenSeg);
        // white keys
        for (let i = 0; i < whitesPerSeg; i++) {
            s.addShape("rect", {
                x: segX + i * whiteW, y: kbY, w: whiteW, h: kbH,
                fill: { color: "FFFFFF" },
                line: { color: DARK, width: 1 }
            });
        }
        // black keys positions (after white 0,1,3,4,5) — standard 2+3 pattern
        const blackPositions = [0, 1, 3, 4, 5]; // relative white indices; black sits between i and i+1
        const blackW = whiteW * 0.6;
        const blackH = kbH * 0.62;
        for (const bi of blackPositions) {
            s.addShape("rect", {
                x: segX + (bi + 1) * whiteW - blackW / 2,
                y: kbY, w: blackW, h: blackH,
                fill: { color: DARK },
                line: { color: DARK, width: 0.5 }
            });
        }
    }

    s.addText("PROF. E. HART", {
        x: 9.5, y: 6.55, w: 3.3, h: 0.3,
        fontFace: FB, fontSize: 11, color: MUTED, charSpacing: 4, align: "right"
    });
    s.addText("DEPT. OF MUSIC", {
        x: 9.5, y: 6.85, w: 3.3, h: 0.3,
        fontFace: FB, fontSize: 11, color: RED, charSpacing: 4, align: "right"
    });
}

// =============== SLIDE 2 — Why the piano? ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER ONE", "01 / 08");

    s.addText([
        { text: "Why the piano", options: { color: DARK } },
        { text: "?", options: { color: RED } }
    ], {
        x: 0.55, y: 0.9, w: 12, h: 1.3,
        fontFace: FH, fontSize: 54, color: DARK, margin: 0
    });

    // horizontal divider
    s.addShape("line", {
        x: 0.6, y: 2.75, w: 12.1, h: 0,
        line: { color: DARK, width: 0.75 }
    });

    // 3 columns with vertical dividers
    const colY = 3.1;
    const colW = 3.8;
    const colXs = [0.6, 4.65, 8.7];
    const items = [
        ["i.", "Everything is visible.", "Every note lives in one place on a single, logical row — a map you can see before you hear."],
        ["ii.", "Melody and harmony.", "One instrument, two hands, two jobs at once. The piano is a band you can carry alone."],
        ["iii.", "A language that transfers.", "What you learn here — reading, rhythm, voicing — follows you to every other instrument."]
    ];
    for (let i = 0; i < 3; i++) {
        const cx = colXs[i];
        s.addText(items[i][0], {
            x: cx, y: colY, w: colW, h: 0.7,
            fontFace: FH, fontSize: 36, italic: true, color: RED, margin: 0
        });
        s.addText(items[i][1], {
            x: cx, y: colY + 0.85, w: colW, h: 0.9,
            fontFace: FH, fontSize: 22, color: DARK, margin: 0
        });
        s.addText(items[i][2], {
            x: cx, y: colY + 2.0, w: colW, h: 1.4,
            fontFace: FB, fontSize: 12, color: BODY, margin: 0
        });
    }
    // vertical dividers between columns
    s.addShape("line", { x: 4.5, y: colY - 0.1, w: 0, h: 3.9, line: { color: LINE, width: 0.5 } });
    s.addShape("line", { x: 8.55, y: colY - 0.1, w: 0, h: 3.9, line: { color: LINE, width: 0.5 } });

    addFooter(s);
}

// =============== SLIDE 3 — Meet the instrument ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER TWO", "02 / 08");

    s.addText("Meet the instrument.", {
        x: 0.55, y: 0.9, w: 12, h: 1.3,
        fontFace: FH, fontSize: 54, color: DARK, margin: 0
    });

    // Left: big 88
    s.addText("88", {
        x: 0.55, y: 3.3, w: 3, h: 1.1,
        fontFace: FH, fontSize: 80, bold: true, color: DARK, margin: 0
    });
    s.addText("KEYS, END TO END", {
        x: 0.6, y: 4.45, w: 5, h: 0.3,
        fontFace: FB, fontSize: 11, color: MUTED, charSpacing: 4
    });
    s.addText("Fifty-two white, thirty-six black. Seven full octaves plus a few neighbors on each side.", {
        x: 0.6, y: 4.85, w: 4.7, h: 0.9,
        fontFace: FB, fontSize: 13, color: BODY
    });

    // two small stats
    s.addText("52", {
        x: 0.6, y: 5.9, w: 1.2, h: 0.6,
        fontFace: FH, fontSize: 32, bold: true, color: DARK, margin: 0
    });
    s.addText("WHITE", {
        x: 0.6, y: 6.5, w: 1.2, h: 0.3,
        fontFace: FB, fontSize: 10, color: MUTED, charSpacing: 4
    });
    s.addText("36", {
        x: 1.95, y: 5.9, w: 1.2, h: 0.6,
        fontFace: FH, fontSize: 32, bold: true, color: DARK, margin: 0
    });
    s.addText("BLACK", {
        x: 1.95, y: 6.5, w: 1.2, h: 0.3,
        fontFace: FB, fontSize: 10, color: MUTED, charSpacing: 4
    });

    // Right: keyboard illustration with dark frame
    const frameX = 6.0, frameY = 3.0, frameW = 6.9, frameH = 2.8;
    s.addShape("roundRect", {
        x: frameX, y: frameY, w: frameW, h: frameH,
        fill: { color: DARK }, line: { color: DARK, width: 1 },
        rectRadius: 0.08
    });
    // inner area
    const innerPad = 0.18;
    const innerX = frameX + innerPad, innerY = frameY + innerPad;
    const innerW = frameW - 2 * innerPad, innerH = frameH - 2 * innerPad;
    s.addShape("rect", {
        x: innerX, y: innerY, w: innerW, h: innerH,
        fill: { color: "3B3632" }, line: { color: "3B3632", width: 0 }
    });
    // white keys inside
    const nOct = 3;
    const keysRow = 7 * nOct;
    const kX = innerX + 0.15, kY = innerY + 0.2;
    const kW = (innerW - 0.3) / keysRow;
    const kH = innerH - 0.4;
    for (let i = 0; i < keysRow; i++) {
        s.addShape("rect", {
            x: kX + i * kW, y: kY, w: kW, h: kH,
            fill: { color: "FFFFFF" }, line: { color: "222222", width: 0.5 }
        });
    }
    // black keys pattern 2+3 per octave
    const bW = kW * 0.62, bH = kH * 0.6;
    for (let o = 0; o < nOct; o++) {
        const offs = [0, 1, 3, 4, 5];
        for (const bi of offs) {
            const idx = o * 7 + bi;
            s.addShape("rect", {
                x: kX + (idx + 1) * kW - bW / 2, y: kY, w: bW, h: bH,
                fill: { color: DARK }, line: { color: DARK, width: 0.5 }
            });
        }
    }

    addFooter(s);
}

// =============== SLIDE 4 — Keyboard mapped ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER THREE", "03 / 08");

    s.addText("The keyboard,\nmapped.", {
        x: 0.55, y: 0.9, w: 7, h: 2.0,
        fontFace: FH, fontSize: 48, color: DARK, margin: 0
    });

    s.addText([
        { text: "Find the pair of two black keys. The white note to their left is always ", options: { color: BODY } },
        { text: "C", options: { color: RED, bold: true } },
        { text: ".", options: { color: BODY } }
    ], {
        x: 8.3, y: 1.15, w: 4.4, h: 1.4,
        fontFace: FH, fontSize: 16, italic: true, color: BODY,
        align: "right"
    });

    // Big keyboard with labeled keys — 15 white keys (C to C to ... covering pattern)
    // Text: C D E F G A B C D E F G A B C  (15 labels)
    const labels = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C"];
    const nWhite = labels.length;
    const kbX = 1.7, kbY = 3.3, kbW = 10.0, kbH = 3.1;
    const wKeyW = kbW / nWhite;

    // outer border
    s.addShape("rect", {
        x: kbX, y: kbY, w: kbW, h: kbH,
        fill: { color: CREAM }, line: { color: DARK, width: 1 }
    });
    // white keys with labels
    for (let i = 0; i < nWhite; i++) {
        s.addShape("rect", {
            x: kbX + i * wKeyW, y: kbY, w: wKeyW, h: kbH,
            fill: { color: "FFFFFF" }, line: { color: DARK, width: 1 }
        });
        const isC = labels[i] === "C";
        s.addText(labels[i], {
            x: kbX + i * wKeyW, y: kbY + kbH - 0.55, w: wKeyW, h: 0.45,
            fontFace: FH, fontSize: 18, bold: isC, color: isC ? RED : DARK,
            align: "center", margin: 0
        });
    }
    // black keys — skip between E-F (idx 2-3) and B-C (idx 6-7, 13-14)
    // In 15 white keys from C: black keys sit after index 0,1,3,4,5, 7,8,10,11,12 (within octaves)
    const noBlackAfter = new Set([2, 6, 9, 13]); // indices where no black key follows
    const bW = wKeyW * 0.6, bH = kbH * 0.62;
    for (let i = 0; i < nWhite - 1; i++) {
        if (noBlackAfter.has(i)) continue;
        s.addShape("rect", {
            x: kbX + (i + 1) * wKeyW - bW / 2, y: kbY, w: bW, h: bH,
            fill: { color: DARK }, line: { color: DARK, width: 0.5 }
        });
    }

    // Bottom meta row
    const metaY = 6.65;
    s.addText([
        { text: "PATTERN · ", options: { color: MUTED } },
        { text: "2 + 3", options: { color: RED, bold: true } }
    ], {
        x: 2.8, y: metaY, w: 3, h: 0.3, fontFace: FB, fontSize: 11, charSpacing: 4, align: "center"
    });
    s.addText([
        { text: "ANCHOR · ", options: { color: MUTED } },
        { text: "MIDDLE C", options: { color: RED, bold: true } }
    ], {
        x: 5.5, y: metaY, w: 3, h: 0.3, fontFace: FB, fontSize: 11, charSpacing: 4, align: "center"
    });
    s.addText([
        { text: "REPEATS · ", options: { color: MUTED } },
        { text: "EVERY OCTAVE", options: { color: RED, bold: true } }
    ], {
        x: 8.3, y: metaY, w: 3.5, h: 0.3, fontFace: FB, fontSize: 11, charSpacing: 4, align: "center"
    });

    addFooter(s);
}

// =============== SLIDE 5 — Posture / Hand / Fingering ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER FOUR", "04 / 08");

    s.addText("Sit tall. Round the hand. Number the fingers.", {
        x: 0.55, y: 0.9, w: 12.5, h: 1.8,
        fontFace: FH, fontSize: 44, color: DARK, margin: 0
    });

    // 3 illustration panels
    const boxY = 2.85, boxH = 1.55;
    const boxXs = [0.6, 4.65, 8.7];
    const boxW = 3.95;
    for (let i = 0; i < 3; i++) {
        s.addShape("rect", {
            x: boxXs[i], y: boxY, w: boxW, h: boxH,
            fill: { color: CREAM_LIGHT }, line: { color: CREAM_LIGHT, width: 0 }
        });
    }

    // Panel 1: Stick figure posture
    const p1cx = boxXs[0] + boxW / 2;
    const p1cy = boxY + boxH / 2;
    // head circle
    s.addShape("ellipse", {
        x: p1cx - 0.15, y: boxY + 0.25, w: 0.3, h: 0.3,
        fill: { color: CREAM_LIGHT }, line: { color: DARK, width: 1.5 }
    });
    // body line
    s.addShape("line", {
        x: p1cx, y: boxY + 0.55, w: 0, h: 0.75,
        line: { color: DARK, width: 1.5 }
    });
    // arm (red)
    s.addShape("line", {
        x: p1cx, y: boxY + 0.8, w: 0.45, h: 0.2,
        line: { color: RED, width: 1.5 }
    });
    // bench base
    s.addShape("line", {
        x: p1cx - 0.5, y: boxY + 1.3, w: 1.0, h: 0,
        line: { color: DARK, width: 1.5 }
    });
    s.addShape("line", {
        x: p1cx - 0.35, y: boxY + 1.3, w: 0, h: 0.2,
        line: { color: DARK, width: 1.5 }
    });
    s.addShape("line", {
        x: p1cx + 0.35, y: boxY + 1.3, w: 0, h: 0.2,
        line: { color: DARK, width: 1.5 }
    });

    // Panel 2: Dome (invisible orange)
    const p2cx = boxXs[1] + boxW / 2;
    const p2dy = boxY + 1.1;
    // arc — approximated with an oval cut (use thin ellipse outline, then cover bottom)
    s.addShape("arc", {
        x: p2cx - 0.7, y: p2dy - 0.55, w: 1.4, h: 0.9,
        line: { color: DARK, width: 1.5 }, fill: { color: CREAM_LIGHT },
        rotate: 0
    });
    // baseline
    s.addShape("line", {
        x: p2cx - 0.75, y: p2dy, w: 1.5, h: 0,
        line: { color: DARK, width: 1.2 }
    });
    // fingertip dots along dome (5 dots)
    const dotYs = [
        [p2cx - 0.55, p2dy - 0.08],
        [p2cx - 0.28, p2dy - 0.45],
        [p2cx, p2dy - 0.58],
        [p2cx + 0.28, p2dy - 0.45],
        [p2cx + 0.55, p2dy - 0.08]
    ];
    for (let i = 0; i < dotYs.length; i++) {
        const [dx, dy] = dotYs[i];
        s.addShape("ellipse", {
            x: dx - 0.05, y: dy - 0.05, w: 0.1, h: 0.1,
            fill: { color: i === 2 ? RED : DARK }, line: { color: DARK, width: 0 }
        });
    }

    // Panel 3: Five fingers as bars with numbers
    const p3x0 = boxXs[2] + 0.55;
    const p3yBase = boxY + boxH - 0.25;
    const fingerW = 0.42;
    const fingerGap = 0.15;
    const heights = [0.7, 0.95, 1.1, 1.0, 0.8];
    for (let i = 0; i < 5; i++) {
        const fx = p3x0 + i * (fingerW + fingerGap);
        const fh = heights[i];
        s.addShape("roundRect", {
            x: fx, y: p3yBase - fh, w: fingerW, h: fh,
            fill: { color: DARK }, line: { color: DARK, width: 0 },
            rectRadius: fingerW / 2
        });
        // number bubble at top
        s.addShape("ellipse", {
            x: fx + fingerW / 2 - 0.14, y: p3yBase - fh - 0.02, w: 0.28, h: 0.28,
            fill: { color: "FFFFFF" }, line: { color: DARK, width: 0.5 }
        });
        s.addText(String(i + 1), {
            x: fx + fingerW / 2 - 0.2, y: p3yBase - fh - 0.04, w: 0.4, h: 0.3,
            fontFace: FH, fontSize: 11, bold: true, color: DARK,
            align: "center", margin: 0
        });
    }

    // Captions under each panel
    const capY = boxY + boxH + 0.2;
    const captions = [
        ["01 · POSTURE", "Feet flat, back tall.", "Bench at a height where your forearms fall level with the keys. Elbows a touch forward of the wrist."],
        ["02 · HAND SHAPE", "Hold an invisible orange.", "Fingers gently curved, knuckles soft but not collapsed. Strike with the pad, not the tip."],
        ["03 · FINGERING", "Thumb is one. Pinky is five.", "Both hands use the same numbering. Sheet music will tell you which finger plays which note."]
    ];
    for (let i = 0; i < 3; i++) {
        s.addText([
            { text: captions[i][0].split(" · ")[0] + " · ", options: { color: RED } },
            { text: captions[i][0].split(" · ")[1], options: { color: RED } }
        ], {
            x: boxXs[i], y: capY, w: boxW, h: 0.3,
            fontFace: FB, fontSize: 11, charSpacing: 4
        });
        s.addText(captions[i][1], {
            x: boxXs[i], y: capY + 0.4, w: boxW, h: 0.9,
            fontFace: FH, fontSize: 22, color: DARK, margin: 0
        });
        s.addText(captions[i][2], {
            x: boxXs[i], y: capY + 1.5, w: boxW, h: 0.9,
            fontFace: FB, fontSize: 12, color: BODY, margin: 0
        });
    }

    addFooter(s);
}

// =============== SLIDE 6 — Reading music ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER FIVE", "05 / 08");

    s.addText("Reading music, the basics.", {
        x: 0.55, y: 0.9, w: 12, h: 1.3,
        fontFace: FH, fontSize: 48, color: DARK, margin: 0
    });

    // Staff — 5 horizontal lines
    const stX = 1.3, stY = 2.7, stW = 10.8;
    const lineGap = 0.28;
    for (let i = 0; i < 5; i++) {
        s.addShape("line", {
            x: stX, y: stY + i * lineGap, w: stW, h: 0,
            line: { color: DARK, width: 0.75 }
        });
    }
    // Treble clef (symbol)
    s.addText("𝄞", {
        x: stX - 0.3, y: stY - 0.25, w: 0.6, h: 1.3,
        fontFace: FH, fontSize: 60, color: DARK, align: "center", margin: 0
    });

    // 7 notes: E G B D F A C — ascending across the staff
    // Staff positions (yOff, 0=bottom line, 8=above staff): E=0, G=1, B=2 (middle line), D=3, F=4(top line), A=5 (space above), C=6
    const notes = [
        { label: "E", pos: 0 },
        { label: "G", pos: 1 },
        { label: "B", pos: 2, highlight: true },
        { label: "D", pos: 3 },
        { label: "F", pos: 4 },
        { label: "A", pos: 5 },
        { label: "C", pos: 6 }
    ];
    // more evenly spaced across staff
    const noteXs = [];
    const nStart = stX + 0.6, nEnd = stX + stW - 0.3;
    for (let i = 0; i < notes.length; i++) {
        noteXs.push(nStart + (nEnd - nStart) * i / (notes.length - 1));
    }
    const noteW = 0.3, noteH = 0.2;
    // y: line i (0=bottom) sits at stY + (4 - i) * lineGap.
    // For lines (pos even): y = stY + (4 - pos/2) * lineGap
    // For spaces (pos odd): y = stY + (4 - (pos+1)/2) * lineGap + lineGap/2
    // Simpler: y = stY + 4*lineGap - pos * (lineGap/2)
    for (let i = 0; i < notes.length; i++) {
        const n = notes[i];
        const cy = stY + 4 * lineGap - n.pos * (lineGap / 2) - noteH / 2;
        s.addShape("ellipse", {
            x: noteXs[i] - noteW / 2, y: cy, w: noteW, h: noteH,
            fill: { color: n.highlight ? RED : DARK },
            line: { color: n.highlight ? RED : DARK, width: 0 },
            rotate: -20
        });
        s.addText(n.label, {
            x: noteXs[i] - 0.25, y: stY + 5 * lineGap + 0.1, w: 0.5, h: 0.3,
            fontFace: FH, fontSize: 14, color: n.highlight ? RED : MUTED,
            bold: n.highlight, align: "center", margin: 0
        });
    }

    // 3 columns under staff
    const cY = 4.85;
    const cXs = [0.6, 4.65, 8.7];
    const cW = 3.95;
    const cols = [
        ["THE STAFF", "Five lines, four spaces.", "Higher on the page means higher in pitch. Lower on the page, lower in pitch."],
        ["TREBLE CLEF", "Right hand, upper notes.", "Lines spell E-G-B-D-F. Spaces spell F-A-C-E. The bass clef covers the left hand."],
        ["RHYTHM", "Whole, half, quarter, eighth.", "Note shape tells you how long to hold. A quarter note is one steady beat — the pulse of a song."]
    ];
    for (let i = 0; i < 3; i++) {
        s.addText(cols[i][0], {
            x: cXs[i], y: cY, w: cW, h: 0.3,
            fontFace: FB, fontSize: 11, color: RED, charSpacing: 4
        });
        s.addText(cols[i][1], {
            x: cXs[i], y: cY + 0.4, w: cW, h: 0.6,
            fontFace: FH, fontSize: 22, color: DARK, margin: 0
        });
        s.addText(cols[i][2], {
            x: cXs[i], y: cY + 1.35, w: cW, h: 1.2,
            fontFace: FB, fontSize: 12, color: BODY, margin: 0
        });
    }

    addFooter(s);
}

// =============== SLIDE 7 — First song (dark) ===============
{
    const s = pres.addSlide();
    s.background = { color: DARK_BG };

    // top meta
    s.addText("CHAPTER SIX", {
        x: 0.6, y: 0.42, w: 5, h: 0.3,
        fontFace: FB, fontSize: 11, color: GOLD, charSpacing: 4
    });
    s.addText("06 / 08", {
        x: 8.3, y: 0.42, w: 4.4, h: 0.3,
        fontFace: FB, fontSize: 11, color: "6D6A63", charSpacing: 4, align: "right"
    });

    s.addText("Your first song.", {
        x: 0.55, y: 0.9, w: 12, h: 1.3,
        fontFace: FH, fontSize: 54, italic: true, color: "EDE6D9", margin: 0
    });

    // Note circles — two rows
    // Row 1: C C G G A A G  (A highlighted gold for the two A's)
    // Row 2: F F E E D D C  (last C highlighted gold)
    const row1 = [
        { l: "C" }, { l: "C" }, { l: "G" }, { l: "G" },
        { l: "A", gold: true }, { l: "A", gold: true }, { l: "G" }
    ];
    const row2 = [
        { l: "F", ring: true }, { l: "F", ring: true }, { l: "E", ring: true }, { l: "E", ring: true },
        { l: "D", ring: true }, { l: "D", ring: true }, { l: "C", gold: true }
    ];
    const cD = 0.62;
    const gap = 0.15;
    const startX = 0.6;
    const r1Y = 3.25, r2Y = r1Y + cD + 0.35;
    function drawNote(x, y, n) {
        const fill = n.ring ? DARK_BG : (n.gold ? GOLD : "EDE6D9");
        const lineCol = n.ring ? "EDE6D9" : fill;
        s.addShape("ellipse", {
            x: x, y: y, w: cD, h: cD,
            fill: { color: fill },
            line: { color: lineCol, width: n.ring ? 1.5 : 0 }
        });
        s.addText(n.l, {
            x: x, y: y, w: cD, h: cD,
            fontFace: FH, fontSize: 16, bold: true,
            color: n.ring ? "EDE6D9" : DARK_BG,
            align: "center", valign: "middle", margin: 0
        });
    }
    for (let i = 0; i < row1.length; i++) {
        drawNote(startX + i * (cD + gap), r1Y, row1[i]);
    }
    for (let i = 0; i < row2.length; i++) {
        drawNote(startX + i * (cD + gap), r2Y, row2[i]);
    }

    s.addText("TWO PHRASES · RIGHT HAND · FINGERS 1 – 5", {
        x: 0.6, y: r2Y + cD + 0.35, w: 7, h: 0.3,
        fontFace: FB, fontSize: 11, color: "8A857B", charSpacing: 4
    });

    // Right panel
    // vertical divider
    s.addShape("line", {
        x: 6.95, y: 3.0, w: 0, h: 3.8,
        line: { color: "3C3A35", width: 0.75 }
    });

    s.addText("A tune you already know, built from seven white keys and a steady quarter-note pulse.", {
        x: 7.2, y: 2.8, w: 5.5, h: 1.2,
        fontFace: FH, fontSize: 18, italic: true, color: "EDE6D9", margin: 0
    });

    // Spec rows
    const rows = [
        ["Hand", "RIGHT"],
        ["Key", "C MAJOR"],
        ["Tempo", "\u2669 = 80"],
        ["Goal", "MEMORIZE"]
    ];
    const rowY0 = 4.5, rowH = 0.55;
    for (let i = 0; i < rows.length; i++) {
        const ry = rowY0 + i * rowH;
        s.addShape("line", {
            x: 7.2, y: ry, w: 5.5, h: 0,
            line: { color: "3C3A35", width: 0.5 }
        });
        s.addText(rows[i][0], {
            x: 7.2, y: ry + 0.08, w: 2, h: 0.4,
            fontFace: FB, fontSize: 12, color: "EDE6D9", margin: 0
        });
        if (rows[i][0] === "Tempo") {
            s.addText([
                { text: "\u2669", options: { fontFace: "Arial", color: GOLD } },
                { text: " = 80", options: { fontFace: FB, color: GOLD } }
            ], {
                x: 9.5, y: ry + 0.08, w: 3.2, h: 0.4,
                fontSize: 12, charSpacing: 3, align: "right", margin: 0
            });
        } else {
            s.addText(rows[i][1], {
                x: 9.5, y: ry + 0.08, w: 3.2, h: 0.4,
                fontFace: FB, fontSize: 12, color: GOLD, charSpacing: 3,
                align: "right", margin: 0
            });
        }
    }
    // closing line under last row
    s.addShape("line", {
        x: 7.2, y: rowY0 + rows.length * rowH, w: 5.5, h: 0,
        line: { color: "3C3A35", width: 0.5 }
    });

    s.addText("INTRODUCTION TO PIANO", {
        x: 0.6, y: 7.05, w: 6, h: 0.3,
        fontFace: FB, fontSize: 10, color: "6D6A63", charSpacing: 4
    });
}

// =============== SLIDE 8 — Four-week plan ===============
{
    const s = pres.addSlide();
    s.background = { color: CREAM };
    addTopMeta(s, "CHAPTER SEVEN", "07 / 08");

    s.addText("A four-week plan.", {
        x: 0.55, y: 0.9, w: 12, h: 1.3,
        fontFace: FH, fontSize: 54, color: DARK, margin: 0
    });

    // horizontal divider
    s.addShape("line", {
        x: 0.6, y: 2.75, w: 12.1, h: 0,
        line: { color: DARK, width: 0.75 }
    });

    const weeks = [
        ["WEEK 01", "i.", "Find the keys.", "Name every white key by sight. Locate middle C without looking twice."],
        ["WEEK 02", "ii.", "Five-finger warm-up.", "C-D-E-F-G, both hands, ten minutes a day. Slow, even, quiet."],
        ["WEEK 03", "iii.", "Read one line.", "Play a single melody off the page. Say each note as you strike it."],
        ["WEEK 04", "iv.", "Play for someone.", "Perform your first song, start to finish, for one living human. Bow."]
    ];
    const wY = 3.0;
    const wXs = [0.6, 3.7, 6.8, 9.9];
    const wW = 2.85;

    for (let i = 0; i < 4; i++) {
        s.addText(weeks[i][0], {
            x: wXs[i], y: wY, w: wW, h: 0.3,
            fontFace: FB, fontSize: 11, color: RED, charSpacing: 4
        });
        s.addText(weeks[i][1], {
            x: wXs[i], y: wY + 0.5, w: wW, h: 0.9,
            fontFace: FH, fontSize: 44, italic: true, color: DARK, margin: 0
        });
        s.addText(weeks[i][2], {
            x: wXs[i], y: wY + 1.7, w: wW, h: 0.7,
            fontFace: FH, fontSize: 20, color: DARK, margin: 0
        });
        s.addText(weeks[i][3], {
            x: wXs[i], y: wY + 2.5, w: wW, h: 0.8,
            fontFace: FB, fontSize: 12, color: BODY, margin: 0
        });
    }

    // vertical dividers
    for (const dx of [3.55, 6.65, 9.75]) {
        s.addShape("line", {
            x: dx, y: wY - 0.1, w: 0, h: 3.8,
            line: { color: LINE, width: 0.5 }
        });
    }

    // bottom divider
    s.addShape("line", {
        x: 0.6, y: 6.35, w: 12.1, h: 0,
        line: { color: LINE, width: 0.5 }
    });

    s.addText("Fifteen minutes a day beats three hours on Sunday.", {
        x: 0.6, y: 6.5, w: 8, h: 0.45,
        fontFace: FH, fontSize: 18, italic: true, color: DARK, margin: 0
    });
    s.addText("— BEGIN TODAY", {
        x: 9.0, y: 6.5, w: 3.7, h: 0.45,
        fontFace: FB, fontSize: 12, color: RED, charSpacing: 4, align: "right"
    });

    addFooter(s);
}

// Write ----------------------------------------------
pres.writeFile({ fileName: "/home/assets/Introduction_to_Piano.pptx" })
    .then(f => console.log("WROTE:", f));
