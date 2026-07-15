// generate_deck.js
// Recreates "Northern Goa, after dark" field-report deck using pptxgenjs.
// Source slide dimensions (EMU): 18288000 x 10287000 → 20.0" x 11.25" (custom 16:9 widescreen).
// Palette: bg 0B0C0E, off-white E9E4D9, muted A9A396 / 7A7569, primary FF4B1F,
//          accent teal 3BD3C5, accent pink E63F87, rule 2A2A30.

const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

// ---------- config ----------
const SLIDE_W = 20.0;
const SLIDE_H = 11.25;

const COLORS = {
  bg:          "0B0C0E",
  bgTitle:     "000000",
  bgSlide8:    "06070A",
  card:        "101116",
  cardAlt:     "0D0E12",
  cardAlt2:    "0B0D11",
  off:         "E9E4D9",
  muted:       "A9A396",
  mutedDark:   "7A7569",
  rule:        "2A2A30",
  primary:     "FF4B1F",
  teal:        "3BD3C5",
  pink:        "E63F87",
};

const FONT_SERIF = "Georgia"; // used for the large italic accents and title display
const FONT_SANS  = "Arial";   // body/eyebrows/caption
// (The source file uses "Arial" and "-apple-system"; we map the display/italic runs to Georgia
//  to preserve the "serif italic accent inside a sans headline" feel.)

// ---------- helpers ----------
function eyebrow(slide, left, right) {
  // top-of-slide eyebrow row: section number/title on left, section eyebrow on right
  slide.addText(left, {
    x: 1.042, y: 0.458, w: 8.0, h: 0.28,
    fontFace: FONT_SANS, fontSize: 12, color: COLORS.muted,
    charSpacing: 3.6, margin: 0, align: "left", valign: "top",
  });
  slide.addText(right, {
    x: 11.0, y: 0.458, w: 8.042, h: 0.28,
    fontFace: FONT_SANS, fontSize: 12, color: COLORS.mutedDark,
    charSpacing: 3.6, margin: 0, align: "right", valign: "top",
  });
}

function footer(slide, pageNum) {
  slide.addText("NORTHERN GOA · ELECTRONIC MUSIC", {
    x: 1.042, y: 10.625, w: 6, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
    charSpacing: 2.4, margin: 0, align: "left", valign: "top",
  });
  slide.addText(`${String(pageNum).padStart(2, "0")} / 10`, {
    x: 16.5, y: 10.625, w: 2.541, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
    charSpacing: 2.4, margin: 0, align: "right", valign: "top",
  });
}

// Horizontal rule
function hr(slide, x, y, w, color = COLORS.rule, thickness = 0.01) {
  slide.addShape("rect", {
    x, y, w, h: thickness,
    fill: { color }, line: { type: "none" },
  });
}

// Vertical rule
function vr(slide, x, y, h, color = COLORS.rule, thickness = 0.01) {
  slide.addShape("rect", {
    x, y, w: thickness, h,
    fill: { color }, line: { type: "none" },
  });
}

// Display headline — "word, [italic word]."
// runs = [{ text, italic?, color? }, ...]
function displayHeadline(slide, y, runs, sz = 78) {
  const rich = runs.map((r, i) => ({
    text: r.text,
    options: {
      fontFace: r.italic ? FONT_SERIF : FONT_SANS,
      fontSize: sz,
      color: r.color || COLORS.off,
      italic: !!r.italic,
      charSpacing: -0.3,
    },
  }));
  slide.addText(rich, {
    x: 1.042, y, w: 18.454, h: 1.4,
    margin: 0, valign: "top", align: "left",
  });
}

// ---------- presentation ----------
const pres = new pptxgen();
pres.author = "Field Report";
pres.title  = "Northern Goa, after dark";
pres.defineLayout({ name: "CUSTOM_20x11_25", width: SLIDE_W, height: SLIDE_H });
pres.layout = "CUSTOM_20x11_25";

// ============================================================
// SLIDE 1 — COVER
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bgTitle };

  // Orange wash overlay (35% alpha) — warms the whole frame
  s.addShape("rect", {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: COLORS.primary, transparency: 65 },
    line: { type: "none" },
  });
  // Soft white film on top
  s.addShape("rect", {
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    fill: { color: "FFFFFF", transparency: 98 },
    line: { type: "none" },
  });

  // Eyebrow row — "A FIELD REPORT ●" left, season right
  s.addText(
    [
      { text: "A FIELD REPORT ", options: { color: COLORS.muted, charSpacing: 3.6 } },
      { text: "●",              options: { color: COLORS.primary, charSpacing: 3.6 } },
    ],
    {
      x: 1.042, y: 0.792, w: 6, h: 0.35,
      fontFace: FONT_SANS, fontSize: 18, margin: 0,
      align: "left", valign: "top",
    }
  );
  s.addText("2025 / 2026 SEASON", {
    x: 13.0, y: 0.792, w: 5.95, h: 0.35,
    fontFace: FONT_SANS, fontSize: 18, color: COLORS.muted,
    charSpacing: 3.6, margin: 0, align: "right", valign: "top",
  });

  // Sub-eyebrow: GOA, INDIA / coords
  s.addText("GOA, INDIA / 15.6°N 73.7°E", {
    x: 1.042, y: 1.24, w: 10, h: 0.32,
    fontFace: FONT_SANS, fontSize: 18, color: COLORS.mutedDark,
    charSpacing: 1.44, margin: 0, align: "left", valign: "top",
  });

  // Big display title — "Northern Goa, after dark."
  s.addText(
    [
      { text: "Northern Goa",  options: { fontFace: FONT_SANS,  italic: false, color: COLORS.off } },
      { text: ", ",            options: { fontFace: FONT_SERIF, italic: true,  color: COLORS.primary } },
      { text: "after dark.",   options: { fontFace: FONT_SANS,  italic: false, color: COLORS.off } },
    ],
    {
      x: 1.042, y: 2.2, w: 18.454, h: 5.2,
      fontSize: 170, charSpacing: -0.6,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Deck statement — italic muted paragraph
  s.addText(
    "The electronic music scene between Anjuna and Ashwem — a working brief for promoters.",
    {
      x: 1.042, y: 8.0, w: 12.875, h: 1.5,
      fontFace: FONT_SERIF, fontSize: 28, italic: true, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  // Secondary caption
  s.addText(
    "A sober look at the venues, the characters, and the frictions shaping one of Asia's oldest — and most contested — dance-music economies.",
    {
      x: 1.042, y: 9.8, w: 9, h: 1.3,
      fontFace: FONT_SANS, fontSize: 16, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  // "PREPARED FOR / INDUSTRY & PROMOTERS" right block
  s.addText("PREPARED FOR", {
    x: 14.0, y: 9.85, w: 5.05, h: 0.3,
    fontFace: FONT_SANS, fontSize: 14, color: COLORS.mutedDark,
    charSpacing: 3.6, margin: 0, align: "right", valign: "top",
  });
  s.addText("INDUSTRY & PROMOTERS", {
    x: 14.0, y: 10.2, w: 5.05, h: 0.35,
    fontFace: FONT_SANS, fontSize: 16, color: COLORS.off,
    charSpacing: 3.6, margin: 0, align: "right", valign: "top",
  });
}

// ============================================================
// SLIDE 2 — THE TERRITORY (map on the right)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };

  eyebrow(s, "02 / THE TERRITORY", "GEOGRAPHY");

  // Headline: "A twenty-kilometre coast."
  displayHeadline(s, 1.146, [
    { text: "A " },
    { text: "twenty-kilometre ", italic: true },
    { text: "coast." },
  ]);

  // Left column body
  s.addText(
    "The scene lives on a narrow strip of beaches, plateaus and paddy fields north of the Mandovi river — walkable in a night, irreconcilable by day.",
    {
      x: 1.042, y: 3.042, w: 7.82, h: 1.7,
      fontFace: FONT_SANS, fontSize: 20, color: COLORS.muted,
      margin: 0, align: "left", valign: "top", paraSpaceAfter: 6,
    }
  );

  s.addText(
    [
      { text: "Four villages carry most of the weight: ", options: { color: COLORS.muted } },
      { text: "Anjuna ",                                   options: { color: COLORS.off } },
      { text: "(the origin), ",                            options: { color: COLORS.muted } },
      { text: "Vagator ",                                  options: { color: COLORS.off } },
      { text: "(the cliffs), ",                            options: { color: COLORS.muted } },
      { text: "Morjim ",                                   options: { color: COLORS.off } },
      { text: "(the lounge belt), and ",                   options: { color: COLORS.muted } },
      { text: "Ashwem ",                                   options: { color: COLORS.off } },
      { text: "(the after-party).",                        options: { color: COLORS.muted } },
    ],
    {
      x: 1.042, y: 5.2, w: 7.82, h: 2.2,
      fontFace: FONT_SANS, fontSize: 20, margin: 0, align: "left", valign: "top",
    }
  );

  hr(s, 1.042, 7.95, 7.593);

  s.addText(
    "The map below is schematic — not to scale. It's the mental geography a resident promoter actually uses.",
    {
      x: 1.042, y: 8.2, w: 7.82, h: 1.1,
      fontFace: FONT_SANS, fontSize: 16, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  // ----- schematic map on the right -----
  // Background panel
  s.addShape("rect", {
    x: 9.478, y: 2.72, w: 9.47, h: 7.36,
    fill: { color: COLORS.cardAlt }, line: { type: "none" },
  });

  // If the original map image is available next to this script, use it —
  // otherwise fall back to a hand-drawn schematic of coast + pins.
  const mapPng = path.join(__dirname, "map.png");
  const hasMapImage = fs.existsSync(mapPng);

  if (hasMapImage) {
    s.addImage({
      path: mapPng,
      x: 9.478, y: 2.72, w: 9.47, h: 7.36,
      sizing: { type: "cover", w: 9.47, h: 7.36 },
    });
  } else {
    // ---------- fallback: schematic coast + pins ----------
    // Diagonal hatch on the right half (just a few thin lines for flavour)
    for (let i = 0; i < 12; i++) {
      const xStart = 13.6 + i * 0.55;
      s.addShape("line", {
        x: xStart, y: 2.72, w: 0.9, h: 1.3,
        line: { color: "1C1D22", width: 0.5 },
      });
    }

    // Dashed coast path (three stacked dashed vertical rectangles)
    const coastX = 13.45;
    for (let i = 0; i < 10; i++) {
      s.addShape("rect", {
        x: coastX, y: 3.3 + i * 0.55, w: 0.03, h: 0.28,
        fill: { color: COLORS.primary, transparency: 55 }, line: { type: "none" },
      });
    }

    // "ARABIAN SEA" caption
    s.addText("ARABIAN SEA", {
      x: 10.0, y: 3.3, w: 3.2, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11, color: COLORS.mutedDark,
      charSpacing: 3.0, margin: 0, align: "left", valign: "top",
    });

    // Compass "N"
    s.addText("N", {
      x: 18.2, y: 3.0, w: 0.6, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11, color: COLORS.mutedDark,
      margin: 0, align: "center", valign: "top",
    });
    s.addShape("ellipse", {
      x: 18.15, y: 3.35, w: 0.6, h: 0.6,
      fill: { type: "none" }, line: { color: COLORS.mutedDark, width: 0.75 },
    });

    // Four pins (top → bottom: Ashwem, Morjim, Vagator, Anjuna)
    const pins = [
      { y: 3.9, color: COLORS.teal,    name: "Ashwem",  label: "AFTER-PARTIES" },
      { y: 5.5, color: COLORS.teal,    name: "Morjim",  label: "LOUNGE BELT" },
      { y: 7.1, color: COLORS.primary, name: "Vagator", label: "CLIFFTOP CLUBS" },
      { y: 8.6, color: COLORS.primary, name: "Anjuna",  label: "ORIGIN · 1970s" },
    ];
    pins.forEach(p => {
      s.addShape("ellipse", {
        x: coastX - 0.23, y: p.y - 0.23, w: 0.46, h: 0.46,
        fill: { type: "none" },
        line: { color: p.color, width: 1.5 },
      });
      s.addShape("ellipse", {
        x: coastX - 0.12, y: p.y - 0.12, w: 0.24, h: 0.24,
        fill: { color: p.color }, line: { type: "none" },
      });
      s.addText(p.name, {
        x: coastX + 0.45, y: p.y - 0.32, w: 4, h: 0.45,
        fontFace: FONT_SERIF, fontSize: 24, color: COLORS.off,
        margin: 0, align: "left", valign: "top",
      });
      s.addText(p.label, {
        x: coastX + 0.47, y: p.y + 0.08, w: 4, h: 0.3,
        fontFace: FONT_SANS, fontSize: 11, color: COLORS.mutedDark,
        charSpacing: 3.0, margin: 0, align: "left", valign: "top",
      });
    });

    // "MANDOVI" bottom label
    s.addShape("rect", {
      x: 12.5, y: 9.5, w: 3.2, h: 0.55,
      fill: { color: "06070A" }, line: { type: "none" },
    });
    s.addText("MANDOVI", {
      x: 12.5, y: 9.6, w: 3.2, h: 0.4,
      fontFace: FONT_SANS, fontSize: 12, color: COLORS.mutedDark,
      charSpacing: 3.6, margin: 0, align: "center", valign: "top",
    });
  }

  // Caption under map
  s.addText("CLUBS / DANCE FLOORS", {
    x: 9.728, y: 9.85, w: 3, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
    charSpacing: 2.4, margin: 0, align: "left", valign: "top",
  });
  s.addText("BEACH & LOUNGE VENUES", {
    x: 12.311, y: 9.85, w: 3.2, h: 0.28,
    fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
    charSpacing: 2.4, margin: 0, align: "left", valign: "top",
  });

  footer(s, 2);
}

// ============================================================
// SLIDE 3 — THE SOUND (three columns)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "03 / THE SOUND", "FRAMING");

  displayHeadline(s, 1.146, [
    { text: "A scene, not a " },
    { text: "genre", italic: true },
    { text: "." },
  ]);

  s.addText(
    "The cliché is that Northern Goa means trance. The reality on a given weekend is three or four parallel economies of sound, barely speaking to each other — each with its own dress code, door policy, and demographic.",
    {
      x: 1.042, y: 3.292, w: 16.094, h: 3.0,
      fontFace: FONT_SANS, fontSize: 22, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  const cols = [
    {
      x: 1.042,
      eyebrow: "01 · THE PSYCHEDELIC AXIS",
      head:    "Psy-trance, forest, progressive.",
      body:    "Outdoor parties on plateaus and private land; long sets, heavy visuals, a traveller-heavy crowd that treats Goa as a pilgrimage rather than a holiday.",
      accent:  COLORS.primary,
    },
    {
      x: 7.181,
      eyebrow: "02 · THE HOUSE CONTINUUM",
      head:    "Melodic, organic, afro-house.",
      body:    "Beach clubs and cliff venues booking the international circuit; sunset-to-midnight programming built around food, table service and Instagram.",
      accent:  COLORS.teal,
    },
    {
      x: 13.319,
      eyebrow: "03 · THE UNDERGROUND",
      head:    "Techno, bass, minimal.",
      body:    "Smaller rooms, shorter runways, local collectives hosting European residents. The fastest-growing slice — and the most sensitive to regulation.",
      accent:  COLORS.pink,
    },
  ];

  cols.forEach((c) => {
    // Accent mark above the rule
    s.addShape("rect", {
      x: c.x, y: 7.124, w: 0.45, h: 0.04,
      fill: { color: c.accent }, line: { type: "none" },
    });
    hr(s, c.x + 0.48, 7.14, 5.159);

    s.addText(c.eyebrow, {
      x: c.x, y: 7.4, w: 5.808, h: 0.35,
      fontFace: FONT_SANS, fontSize: 11.5, color: COLORS.mutedDark,
      charSpacing: 2.8, margin: 0, align: "left", valign: "top",
    });
    s.addText(c.head, {
      x: c.x, y: 7.85, w: 5.808, h: 0.55,
      fontFace: FONT_SERIF, fontSize: 22, italic: true, color: COLORS.off,
      margin: 0, align: "left", valign: "top",
    });
    s.addText(c.body, {
      x: c.x, y: 8.55, w: 5.808, h: 2.0,
      fontFace: FONT_SANS, fontSize: 15, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    });
  });

  footer(s, 3);
}

// ============================================================
// SLIDE 4 — THE VENUES (four colour-swatch cards)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "04 / THE VENUES", "SOUTH → NORTH");

  displayHeadline(s, 1.146, [
    { text: "Four villages, four " },
    { text: "door policies", italic: true },
    { text: "." },
  ]);

  const venues = [
    { x: 1.042,  color: COLORS.primary, alpha: 70, name: "ANJUNA",
      tag: "The flea-market mother church.",
      body: "Legacy clifftop clubs and weekly markets. Older crowd, heritage rooms, the loudest ghost of the 90s trance era.",
      cap: "CAP. 600–2,000 · OUTDOOR" },
    { x: 5.594,  color: COLORS.pink,    alpha: 70, name: "VAGATOR",
      tag: "The festival terraces.",
      body: "The stretch where international promoters plant flags for December and New Year. Capacity-heavy; strict door; cover charges.",
      cap: "CAP. 2,000–8,000 · TERRACE" },
    { x: 10.146, color: COLORS.teal,    alpha: 72, name: "MORJIM",
      tag: "The lounge belt.",
      body: "Daytime programming, DJ booths behind dinner service. Russian-Indian ownership; a grown-up audience with less tolerance for chaos.",
      cap: "CAP. 150–500 · BEACHFRONT" },
    { x: 14.698, color: COLORS.primary, alpha: 65, name: "ASHWEM",
      tag: "The after-party end.",
      body: "Shack culture, looser rules, the place the industry goes at 4am. Unzoned, improvised, the most vulnerable to a single bad night.",
      cap: "CAP. 80–300 · SHACK" },
  ];

  venues.forEach(v => {
    // colour swatch
    s.addShape("rect", {
      x: v.x, y: 2.709, w: 4.26, h: 4.26,
      fill: { color: v.color, transparency: v.alpha },
      line: { type: "none" },
    });
    // name
    s.addText(v.name, {
      x: v.x, y: 7.157, w: 4.388, h: 0.4,
      fontFace: FONT_SANS, fontSize: 14, bold: true, color: COLORS.off,
      charSpacing: 3.0, margin: 0, align: "left", valign: "top",
    });
    // tagline (serif italic)
    s.addText(v.tag, {
      x: v.x, y: 7.62, w: 4.388, h: 0.75,
      fontFace: FONT_SERIF, fontSize: 20, italic: true, color: COLORS.off,
      margin: 0, align: "left", valign: "top",
    });
    // body
    s.addText(v.body, {
      x: v.x, y: 8.55, w: 4.388, h: 1.6,
      fontFace: FONT_SANS, fontSize: 14, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    });
    // rule + caption
    hr(s, v.x, 10.25, 4.26);
    s.addText(v.cap, {
      x: v.x, y: 10.37, w: 4.388, h: 0.3,
      fontFace: FONT_SANS, fontSize: 10, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "left", valign: "top",
    });
  });

  footer(s, 4);
}

// ============================================================
// SLIDE 5 — THE CALENDAR (bar chart of monthly activity)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "05 / THE CALENDAR", "SEASONALITY");

  displayHeadline(s, 1.146, [
    { text: "Seven " },
    { text: "useful", italic: true },
    { text: " months." },
  ]);

  s.addText(
    "The scene runs on a monsoon clock. From June to September the shacks are boarded up and the promoters disappear; the working year compresses into a short, punishing peak.",
    {
      x: 1.042, y: 3.167, w: 16.094, h: 2.2,
      fontFace: FONT_SANS, fontSize: 22, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  // ---- bar chart — months run Jan-Jun, Jul*/Aug* (monsoon niche), then Dec-Mar (peak) ----
  const months = [
    { lbl: "JAN", h: 0.877, c: COLORS.primary,  cap: "Season opens", capY: null },
    { lbl: "FEB", h: 1.581, c: COLORS.primary },
    { lbl: "MAR", h: 2.61,  c: COLORS.teal,     cap: "Peak · NYE (Jan peak)" },
    { lbl: "APR", h: 2.123, c: COLORS.primary },
    { lbl: "MAY", h: 1.635, c: COLORS.primary },
    { lbl: "JUN", h: 0.985, c: COLORS.primary,  cap: "Wind-down" },
    { lbl: "JUL*",h: 0.227, c: COLORS.rule,     alpha: 60 },
    { lbl: "AUG*",h: 0.281, c: COLORS.rule,     alpha: 60 },
    { lbl: "DEC", h: 0.335, c: COLORS.rule,     alpha: 60 },
    { lbl: "JAN", h: 0.281, c: COLORS.rule,     alpha: 60 },
    { lbl: "FEB", h: 0.227, c: COLORS.rule,     alpha: 60 },
    { lbl: "MAR", h: 0.173, c: COLORS.rule,     alpha: 60 },
  ];
  // Actual layout in original puts peak DEC-FEB on right; rearrange to match:
  //   JAN FEB MAR APR MAY JUN JUL* AUG* DEC JAN FEB MAR (per extracted XML labels)
  const actual = [
    { lbl: "JAN", h: 0.227,  c: COLORS.off,     alpha: 90 },
    { lbl: "FEB", h: 0.281,  c: COLORS.off,     alpha: 90 },
    { lbl: "MAR", h: 0.281,  c: COLORS.off,     alpha: 90 },
    { lbl: "APR", h: 0.335,  c: COLORS.off,     alpha: 90 },
    { lbl: "MAY", h: 0.227,  c: COLORS.off,     alpha: 90 },
    { lbl: "JUN", h: 0.173,  c: COLORS.off,     alpha: 90 },
    { lbl: "JUL*",h: 0.877,  c: COLORS.primary                   },
    { lbl: "AUG*",h: 1.581,  c: COLORS.primary,  subLabel: "Season opens", subY: 6.916 },
    { lbl: "DEC", h: 2.61,   c: COLORS.teal,     subLabel: "Peak · NYE",    subY: 5.183 },
    { lbl: "JAN", h: 2.123,  c: COLORS.primary },
    { lbl: "FEB", h: 1.635,  c: COLORS.primary },
    { lbl: "MAR", h: 0.985,  c: COLORS.primary,  subLabel: "Wind-down",     subY: 6.808 },
  ];

  const baseY = 8.178; // bottom of bars (from shape tops + heights in source)
  const startX = 1.042;
  const barW = 1.398;
  const gap = 0.104;

  actual.forEach((m, i) => {
    const x = startX + i * (barW + gap);
    const y = baseY - m.h;
    const opts = { x, y, w: barW, h: m.h, line: { type: "none" } };
    if (m.alpha) opts.fill = { color: COLORS.mutedDark, transparency: 70 };
    else         opts.fill = { color: m.c };
    s.addShape("rect", opts);

    // subtle top highlight line
    s.addShape("rect", {
      x, y, w: barW, h: 0.02,
      fill: { color: m.alpha ? COLORS.rule : m.c }, line: { type: "none" },
    });
  });

  // Month labels
  actual.forEach((m, i) => {
    const x = startX + i * (barW + gap) - 0.042;
    s.addText(m.lbl, {
      x, y: 8.47, w: barW + 0.084, h: 0.34,
      fontFace: FONT_SANS, fontSize: 12, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "center", valign: "top",
    });
  });

  // Annotations above specific bars
  const annotations = [
    { x: 10.237, y: 6.916, text: "Season opens" },
    { x: 13.333, y: 5.183, text: "Peak · NYE" },
    { x: 17.86,  y: 6.808, text: "Wind-down" },
  ];
  annotations.forEach(a => {
    s.addText(a.text, {
      x: a.x - 0.8, y: a.y, w: 2.7, h: 0.3,
      fontFace: FONT_SERIF, fontSize: 14, italic: true, color: COLORS.off,
      margin: 0, align: "left", valign: "top",
    });
  });

  // Bottom rule
  hr(s, 1.042, 8.954, 17.917);

  // Large tagline + caption
  s.addText(
    [
      { text: "Dec → Feb does ",                 options: { color: COLORS.muted } },
      { text: "70% of the year's gate",          options: { color: COLORS.off, italic: true, fontFace: FONT_SERIF } },
      { text: ".",                               options: { color: COLORS.muted } },
    ],
    {
      x: 1.042, y: 9.55, w: 12, h: 0.7,
      fontFace: FONT_SANS, fontSize: 22, margin: 0, align: "left", valign: "top",
    }
  );

  s.addText(
    "Calendar reads Jan → Mar → Dec; *Jul/Aug are a small niche of monsoon parties. Directional figures.",
    {
      x: 13.958, y: 9.55, w: 5.15, h: 1.1,
      fontFace: FONT_SANS, fontSize: 12, color: COLORS.mutedDark,
      margin: 0, align: "left", valign: "top",
    }
  );

  footer(s, 5);
}

// ============================================================
// SLIDE 6 — THE CHARACTERS (6 rows, table-like)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "06 / THE CHARACTERS", "ARCHETYPES");

  displayHeadline(s, 1.146, [
    { text: "Six people who " },
    { text: "book the room", italic: true },
    { text: "." },
  ]);

  const rows = [
    { n: "01", name: "Lifer",
      body: "A 20-year resident DJ, often European, who moved in during the trance decade and now owns a booth, a shack and a booking agency.",
      tag:  "RESIDENT · GATEKEEPER" },
    { n: "02", name: "Returnee",
      body: "An Indian producer who left for Berlin or London and flies back for the season. Carries the club networks the locals can't reach.",
      tag:  "PRODUCER · IMPORT" },
    { n: "03", name: "Host",
      body: "Owns the venue, books the food, and — more often than not — actually decides who plays. Increasingly a second-generation Goan.",
      tag:  "OWNER · PROGRAMMER" },
    { n: "04", name: "Collective",
      body: "A three- to six-person crew running a monthly night, a record label and a merch line. The scene's actual talent pipeline.",
      tag:  "PROMOTER · LABEL" },
    { n: "05", name: "Guest",
      body: "A touring international — in for three nights, out again. Headlines the poster but shapes the year less than the others on this list.",
      tag:  "TOURING · HEADLINER" },
    { n: "06", name: "Fixer",
      body: "Handles permits, police, sound limiters and the landlord. Invisible on the flyer; the reason the party happens at all.",
      tag:  "OPERATIONS · PERMITS" },
  ];

  // Top rule
  hr(s, 1.042, 2.709, 17.917);

  const rowStart = 2.96;
  const rowH = 1.185;

  rows.forEach((r, i) => {
    const y = rowStart + i * rowH;
    // Number
    s.addText(r.n, {
      x: 1.042, y: y + 0.08, w: 0.917, h: 0.45,
      fontFace: FONT_SANS, fontSize: 18, color: COLORS.primary,
      charSpacing: 2.0, margin: 0, align: "left", valign: "top",
    });
    // Name (serif italic accent)
    s.addText(
      [
        { text: "The ",    options: { color: COLORS.muted,  fontFace: FONT_SANS,  italic: false } },
        { text: r.name,    options: { color: COLORS.off,    fontFace: FONT_SERIF, italic: true  } },
      ],
      {
        x: 2.292, y: y - 0.05, w: 4.848, h: 0.65,
        fontSize: 26, margin: 0, align: "left", valign: "top",
      }
    );
    // Body
    s.addText(r.body, {
      x: 7.416, y: y + 0.02, w: 7.052, h: 1.1,
      fontFace: FONT_SANS, fontSize: 14, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    });
    // Tag (right)
    s.addText(r.tag, {
      x: 14.679, y: y + 0.1, w: 4.408, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "left", valign: "top",
    });
    // Row rule (bottom of row, except last will use footer rule)
    hr(s, 1.042, y + rowH - 0.08, 17.917);
  });

  // Bottom caption
  s.addText(
    "ARCHETYPES — COMPOSITE FIGURES DRAWN FROM OPERATOR INTERVIEWS; NOT SPECIFIC INDIVIDUALS.",
    {
      x: 1.042, y: 9.978, w: 18.454, h: 0.3,
      fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "left", valign: "top",
    }
  );

  footer(s, 6);
}

// ============================================================
// SLIDE 7 — THE LABELS (three category cards)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "07 / THE LABELS", "INFRASTRUCTURE");

  displayHeadline(s, 1.146, [
    { text: "Imprints and sound " },
    { text: "systems", italic: true },
    { text: "." },
  ]);

  s.addText(
    "Three rough categories of local-facing label activity a promoter should know before programming a season. Named by function, not by brand.",
    {
      x: 1.042, y: 3.167, w: 16.094, h: 1.5,
      fontFace: FONT_SANS, fontSize: 20, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  const cards = [
    { x: 1.042,  symbol: "◯", eyebrow: "CATEGORY A", name: "The heritage imprint.",
      body: "Vinyl-era psytrance labels that still release annually and curate legacy stages. Small catalogue velocity, deep audience loyalty.",
      meta: [{ k: "FOUNDED · 1990S" }, { k: "OUTPUT · 2–4 / YR" }],
      accent: COLORS.mutedDark },
    { x: 7.111,  symbol: "◑", eyebrow: "CATEGORY B", name: "The diaspora label.",
      body: "Run out of Berlin, Lisbon or Mumbai; uses the Goa season as a live showcase and A&R trip. Catalogue-first, scene-adjacent.",
      meta: [{ k: "FOUNDED · 2010S" }, { k: "OUTPUT · 8–14 / YR" }],
      accent: COLORS.teal },
    { x: 13.181, symbol: "●", eyebrow: "CATEGORY C", name: "The collective press.",
      body: "Post-pandemic crews putting out digital EPs tied to a monthly residency. The scene's most visible new-artist pipeline.",
      meta: [{ k: "FOUNDED · 2020S" }, { k: "OUTPUT · 12+ / YR" }],
      accent: COLORS.primary },
  ];

  cards.forEach(c => {
    // Card
    s.addShape("rect", {
      x: c.x, y: 4.869, w: 5.778, h: 5.131,
      fill: { color: COLORS.card }, line: { type: "none" },
    });
    // Top-left accent dot (colored, inside a ring)
    s.addShape("ellipse", {
      x: c.x + 0.343, y: 5.255, w: 0.688, h: 0.688,
      fill: { type: "none" },
      line: { color: c.accent, width: 1.2 },
    });
    // Inner glyph
    s.addText(c.symbol, {
      x: c.x + 0.312, y: 5.255, w: 0.75, h: 0.7,
      fontFace: FONT_SANS, fontSize: 24, color: c.accent,
      margin: 0, align: "center", valign: "middle",
    });
    // Eyebrow
    s.addText(c.eyebrow, {
      x: c.x + 0.343, y: 6.13, w: 5.243, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11.5, color: COLORS.mutedDark,
      charSpacing: 2.8, margin: 0, align: "left", valign: "top",
    });
    // Name (serif italic)
    s.addText(c.name, {
      x: c.x + 0.343, y: 6.52, w: 5.243, h: 0.6,
      fontFace: FONT_SERIF, fontSize: 22, italic: true, color: COLORS.off,
      margin: 0, align: "left", valign: "top",
    });
    // Body
    s.addText(c.body, {
      x: c.x + 0.343, y: 7.25, w: 5.243, h: 1.6,
      fontFace: FONT_SANS, fontSize: 14, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    });
    // Divider
    hr(s, c.x + 0.343, 9.255, 5.09);
    // Meta (2 cols)
    s.addText(c.meta[0].k, {
      x: c.x + 0.343, y: 9.45, w: 2.5, h: 0.3,
      fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "left", valign: "top",
    });
    s.addText(c.meta[1].k, {
      x: c.x + 3.9, y: 9.45, w: 2.5, h: 0.3,
      fontFace: FONT_SANS, fontSize: 10.5, color: COLORS.mutedDark,
      charSpacing: 2.4, margin: 0, align: "left", valign: "top",
    });
  });

  footer(s, 7);
}

// ============================================================
// SLIDE 8 — SOUND & SILENCE (quote + timeline)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bgSlide8 };
  eyebrow(s, "08 / SOUND & SILENCE", "REGULATION");

  // ----- LEFT: big pull quote -----
  // opening quote mark (large serif)
  s.addText("\u201C", {
    x: 1.042, y: 2.1, w: 2, h: 2,
    fontFace: FONT_SERIF, fontSize: 120, color: COLORS.primary,
    margin: 0, align: "left", valign: "top",
  });

  s.addText(
    [
      { text: "The party doesn't end at ten. The ", options: { color: COLORS.off } },
      { text: "amplifier",                           options: { color: COLORS.primary, italic: true, fontFace: FONT_SERIF } },
      { text: " does — everything after that is ",   options: { color: COLORS.off } },
      { text: "negotiation",                         options: { color: COLORS.off, italic: true, fontFace: FONT_SERIF } },
      { text: ".",                                   options: { color: COLORS.off } },
    ],
    {
      x: 1.042, y: 4.3, w: 9.598, h: 4.0,
      fontFace: FONT_SERIF, fontSize: 40, margin: 0, align: "left", valign: "top",
      paraSpaceAfter: 4,
    }
  );

  s.addText(
    [
      { text: "A MORJIM VENUE OWNER · ", options: { color: COLORS.mutedDark, charSpacing: 2.8 } },
      { text: "INTERVIEW, NOV 2025",     options: { color: COLORS.off,       charSpacing: 2.8 } },
    ],
    {
      x: 1.042, y: 8.56, w: 9.598, h: 0.35,
      fontFace: FONT_SANS, fontSize: 11, margin: 0, align: "left", valign: "top",
    }
  );

  // ----- RIGHT: card with timeline -----
  s.addShape("rect", {
    x: 11.193, y: 1.146, w: 7.765, h: 8.854,
    fill: { color: COLORS.cardAlt2 }, line: { type: "none" },
  });

  s.addText("The 10pm cut-off.", {
    x: 11.537, y: 1.49, w: 7.29, h: 0.7,
    fontFace: FONT_SERIF, fontSize: 32, italic: true, color: COLORS.off,
    margin: 0, align: "left", valign: "top",
  });

  s.addText(
    "Goa's amplified-sound rule, revived repeatedly since 2019: outdoor PAs off at 22:00. Enforced unevenly. Rebooked around, not repealed.",
    {
      x: 11.537, y: 2.4, w: 7.29, h: 2.0,
      fontFace: FONT_SANS, fontSize: 16, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  // 22:00 big marker (above the timeline)
  s.addText("22:00", {
    x: 15.4, y: 5.2, w: 1.5, h: 0.45,
    fontFace: FONT_SANS, fontSize: 18, bold: true, color: COLORS.off,
    charSpacing: 2.0, margin: 0, align: "center", valign: "top",
  });
  // vertical cut marker
  s.addShape("rect", {
    x: 15.642, y: 5.88, w: 0.04, h: 0.88,
    fill: { color: COLORS.primary }, line: { type: "none" },
  });

  // Timeline base rule (muted)
  hr(s, 11.537, 6.3, 7.078, COLORS.rule, 0.025);
  // Left segment (amplified window, teal)
  s.addShape("rect", {
    x: 11.537, y: 6.285, w: 4.105, h: 0.055,
    fill: { color: COLORS.teal }, line: { type: "none" },
  });
  // Right segment (silent, primary)
  s.addShape("rect", {
    x: 15.642, y: 6.285, w: 2.973, h: 0.055,
    fill: { color: COLORS.primary }, line: { type: "none" },
  });

  // hour labels
  const hours = ["16:00", "19:00", "22:00", "01:00", "04:00"];
  const hourXs = [11.537, 13.197, 14.857, 16.517, 18.177];
  hours.forEach((h, i) => {
    s.addText(h, {
      x: hourXs[i] - 0.1, y: 6.46, w: 0.8, h: 0.3,
      fontFace: FONT_SANS, fontSize: 11, color: COLORS.mutedDark,
      charSpacing: 1.6, margin: 0, align: "left", valign: "top",
    });
  });

  // Legend at bottom
  s.addShape("rect", {
    x: 11.537, y: 9.45, w: 0.3, h: 0.04,
    fill: { color: COLORS.teal }, line: { type: "none" },
  });
  s.addText("AMPLIFIED WINDOW", {
    x: 11.93, y: 9.34, w: 2.5, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: COLORS.off,
    charSpacing: 2.8, margin: 0, align: "left", valign: "top",
  });
  s.addShape("rect", {
    x: 13.73, y: 9.45, w: 0.3, h: 0.04,
    fill: { color: COLORS.primary }, line: { type: "none" },
  });
  s.addText("SILENT / INDOOR ONLY", {
    x: 14.12, y: 9.34, w: 2.7, h: 0.3,
    fontFace: FONT_SANS, fontSize: 11, color: COLORS.off,
    charSpacing: 2.8, margin: 0, align: "left", valign: "top",
  });

  footer(s, 8);
}

// ============================================================
// SLIDE 9 — LOCALS & OUTSIDERS (two-column)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "09 / LOCALS & OUTSIDERS", "TENSION");

  displayHeadline(s, 1.146, [
    { text: "Two " },
    { text: "economies", italic: true },
    { text: ", one village." },
  ]);

  // Left column header
  hr(s, 1.042, 2.709, 8.667);
  s.addText("SIDE A · THE VILLAGE", {
    x: 1.042, y: 3.011, w: 8.927, h: 0.4,
    fontFace: FONT_SANS, fontSize: 13, color: COLORS.primary,
    charSpacing: 2.8, margin: 0, align: "left", valign: "top",
  });
  s.addText("The residents who were here first.", {
    x: 1.042, y: 3.5, w: 8.927, h: 0.8,
    fontFace: FONT_SERIF, fontSize: 26, italic: true, color: COLORS.off,
    margin: 0, align: "left", valign: "top",
  });

  const sideA = [
    { head: "Sleep and schools.",      body: " Amplified bass carries a kilometre over paddy fields; the school day starts at seven." },
    { head: "Land and rent.",          body: " Seasonal landlords prefer short-let foreign tenants; long-let Goan families are priced out of their own ward." },
    { head: "Panchayat politics.",     body: " Each village council is its own regulator — permits, noise complaints, parking — and every promoter negotiates separately." },
  ];
  sideA.forEach((r, i) => {
    s.addText(
      [
        { text: r.head, options: { color: COLORS.off,   fontFace: FONT_SERIF, italic: true } },
        { text: r.body, options: { color: COLORS.muted, fontFace: FONT_SANS } },
      ],
      {
        x: 1.625, y: 4.55 + i * 1.0, w: 8.326, h: 1.0,
        fontSize: 15, margin: 0, align: "left", valign: "top",
      }
    );
  });

  // Right column header
  hr(s, 10.292, 2.709, 8.667);
  s.addText("SIDE B · THE SCENE", {
    x: 10.292, y: 3.011, w: 8.927, h: 0.4,
    fontFace: FONT_SANS, fontSize: 13, color: COLORS.teal,
    charSpacing: 2.8, margin: 0, align: "left", valign: "top",
  });
  s.addText("The industry that pays the season.", {
    x: 10.292, y: 3.5, w: 8.927, h: 0.8,
    fontFace: FONT_SERIF, fontSize: 26, italic: true, color: COLORS.off,
    margin: 0, align: "left", valign: "top",
  });

  const sideB = [
    { head: "Jobs.",             body: " A peak December weekend employs a few thousand people across bar, security, production and transport." },
    { head: "Tourism pull.",     body: " The scene is the single biggest reason a 25-to-40 international visitor books a flight in December or January." },
    { head: "Cultural capital.", body: " Goa's global reputation as a music destination long outpaced the infrastructure — and is the only reason the infrastructure exists at all." },
  ];
  sideB.forEach((r, i) => {
    s.addText(
      [
        { text: r.head, options: { color: COLORS.off,   fontFace: FONT_SERIF, italic: true } },
        { text: r.body, options: { color: COLORS.muted, fontFace: FONT_SANS } },
      ],
      {
        x: 10.875, y: 4.55 + i * 1.0, w: 8.326, h: 1.0,
        fontSize: 15, margin: 0, align: "left", valign: "top",
      }
    );
  });

  footer(s, 9);
}

// ============================================================
// SLIDE 10 — THE ROAD AHEAD (three numbered takeaways)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  eyebrow(s, "10 / THE ROAD AHEAD", "OUTLOOK · 2026");

  displayHeadline(s, 1.146, [
    { text: "What a promoter should " },
    { text: "plan for", italic: true },
    { text: "." },
  ]);

  s.addText(
    "Three working assumptions for the coming season. None of them are predictions — they are the positions most likely to survive the next round of regulation, weather and taste.",
    {
      x: 1.042, y: 3.251, w: 16.094, h: 2.5,
      fontFace: FONT_SANS, fontSize: 22, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    }
  );

  const items = [
    { x: 1.042,  n: "01", head: "Smaller rooms, harder curation.",
      body: "Capacity-led megastages are increasingly at the mercy of a single panchayat vote. Under-500 rooms with strong editorial programming are the hedged bet." },
    { x: 7.399,  n: "02", head: "Indoor infrastructure matters.",
      body: "Any venue that can legally operate past 22:00 is re-priced this season. Sound-sealed rooms — rare and expensive — will carry a premium for years." },
    { x: 13.372, n: "03", head: "Local credit is the asset.",
      body: "Partner with Goan owners and collectives rather than landing from outside. The scene's next decade belongs to the crews that the village council will actually answer the phone for." },
  ];

  // Dividers between columns
  vr(s, 7.014, 5.9, 4.1);
  vr(s, 12.986, 5.9, 4.1);

  items.forEach(it => {
    s.addText(it.n, {
      x: it.x, y: 6.317, w: 5.3, h: 1.1,
      fontFace: FONT_SANS, fontSize: 54, color: COLORS.primary,
      charSpacing: 2.0, margin: 0, align: "left", valign: "top",
    });
    s.addText(it.head, {
      x: it.x, y: 7.379, w: 5.3, h: 1.0,
      fontFace: FONT_SERIF, fontSize: 24, italic: true, color: COLORS.off,
      margin: 0, align: "left", valign: "top",
    });
    s.addText(it.body, {
      x: it.x, y: 8.466, w: 5.3, h: 2.0,
      fontFace: FONT_SANS, fontSize: 14, color: COLORS.muted,
      margin: 0, align: "left", valign: "top",
    });
  });

  footer(s, 10);
}

// ---------- write ----------
const OUT = process.env.OUT_PATH || path.join(process.cwd(), "goa_electronic_music.pptx");
pres.writeFile({ fileName: OUT }).then(f => console.log("Wrote:", f));
