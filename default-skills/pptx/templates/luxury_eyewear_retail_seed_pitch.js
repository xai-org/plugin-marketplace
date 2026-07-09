// EYEMIE Concept Pitch — recreates glasses_store__1_.pptx using pptxgenjs
// Fixes applied:
//   1) Slide 7: bottom of house-collection panels was overlapping the footer text.
//      Panels shortened so their bottom edge sits above the footer baseline.
//   2) Slide 3: removed extra space before the comma in
//      "A house of frames , a clinic of eyes." → "A house of frames, a clinic of eyes."

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();

// Custom 20" x 11.25" layout (matches original 18288000 x 10287000 EMU)
pres.defineLayout({ name: "EYEMIE_WIDE", width: 20, height: 11.25 });
pres.layout = "EYEMIE_WIDE";
pres.author = "EYEMIE";
pres.title  = "EYEMIE — Concept Pitch";

// ─── Palette ───────────────────────────────────────────────────────────────
const CREAM     = "F2ECE0";
const CREAM_LT  = "FFF0E1";
const SAND      = "E4D8C3";
const DIV       = "D9CDB8";  // thin divider line
const MOSS      = "6B5E50";  // muted label text
const INK       = "1A140F";  // headline near-black
const CHARCOAL  = "2B2018";  // dark panels / dark body
const NIGHT     = "0A0705";
const TERRACOTTA= "B5613E";  // accent (italic)
const CLAY      = "C46A47";
const WARM_WHT  = "F6F0E4";
const DEEP_BRN  = "3A2A1F";
const BLACK_BG  = "1A140F";

// ─── Fonts ─────────────────────────────────────────────────────────────────
const FONT_HEAD = "Arial";
const FONT_BODY = "Calibri";

// Helper: common text-box options — zero margin so coords align with shapes
const tx = (opts) => Object.assign({ margin: 0, fontFace: FONT_HEAD }, opts);

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — COVER
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  // Top header
  s.addText("EYEMIE · EYEWEAR & OPTICAL · EST. 2026", tx({
    x: 1.042, y: 0.729, w: 6.222, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: MOSS
  }));
  s.addText("PHOENIX, AZ", tx({
    x: 17.146, y: 0.729, w: 1.896, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: MOSS
  }));

  // Kicker
  s.addText("CONCEPT PITCH · SERIES SEED", tx({
    x: 1.042, y: 2.962, w: 9.458, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));

  // Giant headline
  s.addText([
    { text: "A store for the ", options: { color: INK } },
    { text: "desert's ",        options: { color: TERRACOTTA, italic: true } },
    { text: "light.",           options: { color: INK } }
  ], tx({
    x: 1.042, y: 3.488, w: 9.458, h: 2.733,
    fontSize: 76, charSpacing: -3, fontFace: FONT_HEAD
  }));

  // Supporting paragraph
  s.addText(
    "EYEMIE is a luxury eyewear house and in-clinic optical boutique on the Camelback Corridor — " +
    "curating premium frames from the world, and designing a house collection shaped by Phoenix.",
    tx({
      x: 1.042, y: 6.554, w: 7.296, h: 1.854,
      fontSize: 18, color: MOSS, fontFace: FONT_BODY
    })
  );

  // Right-side editorial "photo" plate (dark rectangle standing in for image)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.974, y: 1.214, w: 7.984, h: 8.922,
    fill: { color: CHARCOAL }, line: { color: CHARCOAL, width: 0 }
  });
  // Cream strip along bottom of plate holding the caption
  s.addShape(pres.shapes.RECTANGLE, {
    x: 11.13, y: 9.495, w: 7.093, h: 0.484,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 }
  });
  s.addText("EDITORIAL · MODEL IN ACETATE FRAMES · CAMELBACK AT 4PM", tx({
    x: 11.297, y: 9.641, w: 6.973, h: 0.234,
    fontSize: 9, charSpacing: 2.16, color: CHARCOAL
  }));

  // Bottom footers
  s.addText("INVESTOR CONFIDENTIAL", tx({
    x: 1.042, y: 10.365, w: 3.346, h: 0.26,
    fontSize: 10, charSpacing: 2.97, color: MOSS
  }));
  s.addText("APRIL 2026 · 01 / 08", tx({
    x: 16.389, y: 10.365, w: 2.653, h: 0.26,
    fontSize: 10, charSpacing: 2.97, color: MOSS, align: "right"
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// Shared helpers for content slides
// ═══════════════════════════════════════════════════════════════════════════
function addBrandHeader(s, sectionLabel, labelColor) {
  s.addText("EYEMIE", tx({
    x: 1.042, y: 0.729, w: 1.5, h: 0.396,
    fontSize: 16, italic: true, charSpacing: 0.42, color: labelColor || INK
  }));
  s.addText(sectionLabel, tx({
    x: 15.0, y: 0.789, w: 4.041, h: 0.276,
    fontSize: 11, charSpacing: 2.7, color: labelColor || MOSS, align: "right"
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — OPPORTUNITY (stat row)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addBrandHeader(s, "02 · OPPORTUNITY", MOSS);

  s.addText("THE OPENING", tx({
    x: 1.042, y: 1.708, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText("Phoenix is ready for an optical boutique it doesn't yet have.", tx({
    x: 1.042, y: 2.234, w: 16.094, h: 1.879,
    fontSize: 46, charSpacing: -1, color: INK
  }));

  // 4 stat columns
  const stats = [
    { x: 1.042,  stat: "4.9M",  label: "METRO POPULATION",            body: "Fifth-largest metro in the U.S. and the fastest-growing in the top ten." },
    { x: 5.646,  stat: "310+",  label: "SUN DAYS / YEAR",             body: "A climate where sunglasses are not an accessory — they are daily infrastructure." },
    { x: 10.25,  stat: "0",     label: "TRUE LUXURY OPTICIANS",       body: "No standalone premium eyewear house exists between Beverly Hills and Dallas." },
    { x: 14.854, stat: "$38k",  label: "BILTMORE HH INCOME (MEDIAN)", body: "A trade area indexing 2.4× the national average for luxury retail spend." },
  ];
  stats.forEach(st => {
    s.addText(st.stat, tx({
      x: st.x, y: 5.009, w: 4.227, h: 1.354,
      fontSize: 76, charSpacing: -3, color: INK
    }));
    // thin divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: 6.551, w: 4.104, h: 0.012,
      fill: { color: DIV }, line: { color: DIV, width: 0 }
    });
    s.addText(st.label, tx({
      x: st.x, y: 6.749, w: 4.227, h: 0.26,
      fontSize: 10, charSpacing: 0.27, color: MOSS
    }));
    s.addText(st.body, tx({
      x: st.x, y: 7.113, w: 4.227, h: 1.3,
      fontSize: 15, color: CHARCOAL, fontFace: FONT_BODY
    }));
  });

  s.addText("SOURCES · U.S. CENSUS 2024 · NOAA · ESRI TAPESTRY · PLACER.AI RETAIL FEED", tx({
    x: 1.042, y: 10.391, w: 18.454, h: 0.234,
    fontSize: 9, charSpacing: 2.16, color: MOSS
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — CONCEPT (dark slide)
// Fix: "A house of frames , a clinic of eyes." had an extra space before comma.
// Now reads: "A house of frames, a clinic of eyes."
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CHARCOAL };

  addBrandHeader(s, "03 · CONCEPT", CREAM);

  s.addText("THE CONCEPT IN ONE LINE", tx({
    x: 1.042, y: 3.207, w: 9.262, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));

  // FIX: spacing around comma normalized
  s.addText([
    { text: "A ",                options: { color: CREAM } },
    { text: "house of frames",   options: { color: TERRACOTTA, italic: true } },
    { text: ", a ",              options: { color: CREAM } },
    { text: "clinic of eyes",    options: { color: TERRACOTTA, italic: true } },
    { text: ".",                 options: { color: CREAM } },
  ], tx({
    x: 1.042, y: 3.692, w: 9.262, h: 2.375,
    fontSize: 62, charSpacing: -2
  }));

  s.addText(
    "EYEMIE sells the world's most considered eyewear in a room designed like a gallery, " +
    "with a licensed optician behind a glass wall — one appointment for the exam, the fitting, and the frame.",
    tx({
      x: 1.042, y: 6.442, w: 8.369, h: 1.908,
      fontSize: 18, color: CREAM, fontFace: FONT_BODY
    })
  );

  // Right-side "silhouette study" — two simple oval lenses + bridge
  const cy = 5.3;
  s.addShape(pres.shapes.OVAL, {
    x: 11.5, y: cy - 0.85, w: 3.1, h: 1.7,
    fill: { color: NIGHT }, line: { color: TERRACOTTA, width: 1.25 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 15.1, y: cy - 0.85, w: 3.1, h: 1.7,
    fill: { color: NIGHT }, line: { color: TERRACOTTA, width: 1.25 }
  });
  // bridge
  s.addShape(pres.shapes.LINE, {
    x: 14.6, y: cy, w: 0.5, h: 0,
    line: { color: TERRACOTTA, width: 1.25 }
  });

  s.addText("SILHOUETTE STUDY · HOUSE FRAME 01", tx({
    x: 14.492, y: 9.781, w: 4.601, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: CREAM
  }));
  s.addText("TWO REVENUES · ONE ROOM · ONE WAITLIST", tx({
    x: 1.042, y: 10.391, w: 5.291, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: CREAM
  }));
  s.addText("03 / 08", tx({
    x: 18.192, y: 10.391, w: 0.85, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: CREAM
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — LOCATION
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addBrandHeader(s, "04 · LOCATION", MOSS);

  s.addText("WHERE THIS LIVES", tx({
    x: 1.042, y: 1.5, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText([
    { text: "The Biltmore corridor — where Phoenix buys ", options: { color: INK } },
    { text: "quietly",                                     options: { color: TERRACOTTA, italic: true } },
    { text: ".",                                           options: { color: INK } },
  ], tx({
    x: 1.042, y: 1.943, w: 17.167, h: 1.905,
    fontSize: 46, charSpacing: -1
  }));

  // Left panel — "site study" stand-in
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 4.306, w: 9.227, h: 6.298,
    fill: { color: CHARCOAL }, line: { color: CHARCOAL, width: 0 }
  });
  // simple map-style crosshair on the dark panel
  s.addShape(pres.shapes.LINE, {
    x: 1.042, y: 7.455, w: 9.227, h: 0,
    line: { color: "4A3A2F", width: 0.75 }
  });
  s.addShape(pres.shapes.LINE, {
    x: 5.656, y: 4.306, w: 0, h: 6.298,
    line: { color: "4A3A2F", width: 0.75 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 5.506, y: 7.305, w: 0.3, h: 0.3,
    fill: { color: TERRACOTTA }, line: { color: TERRACOTTA, width: 0 }
  });

  // caption tab on the map
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.198, y: 9.964, w: 5.932, h: 0.484,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 }
  });
  s.addText("SITE STUDY · BILTMORE FASHION PARK ADJACENCY", tx({
    x: 1.365, y: 10.109, w: 5.777, h: 0.234,
    fontSize: 9, charSpacing: 2.16, color: CHARCOAL
  }));

  // Right column — fact table
  s.addText("ADDRESS (TARGET)", tx({
    x: 10.935, y: 4.306, w: 8.264, h: 0.26,
    fontSize: 10, charSpacing: 0.27, color: MOSS
  }));
  s.addText([
    { text: "2502 E Camelback Rd ",             options: { color: INK } },
    { text: "Biltmore Fashion Park, AZ 85016",  options: { color: MOSS } },
  ], tx({
    x: 10.935, y: 4.587, w: 8.264, h: 0.958,
    fontSize: 22, charSpacing: -0.3
  }));
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.935, y: 5.712, w: 8.023, h: 0.012,
    fill: { color: DIV }, line: { color: DIV, width: 0 }
  });

  // 2 x 2 grid of facts
  const facts = [
    { x: 10.935, y1: 5.931, y2: 6.15, label: "FOOTPRINT",        val: "1,850 ft²", size: 24 },
    { x: 15.072, y1: 5.931, y2: 6.15, label: "RENT (NNN)",       val: "$78 / ft²", size: 24 },
    { x: 10.935, y1: 6.931, y2: 7.15, label: "DAILY FOOT TRAFFIC", val: "9,400",   size: 24 },
    { x: 15.072, y1: 6.931, y2: 7.15, label: "CO-TENANTS",       val: "Saks · Ralph Lauren · Hermès adjacent", size: 16 },
  ];
  facts.forEach(f => {
    s.addText(f.label, tx({
      x: f.x, y: f.y1, w: 4.003, h: 0.26,
      fontSize: 10, charSpacing: 0.27, color: MOSS
    }));
    s.addText(f.val, tx({
      x: f.x, y: f.y2, w: 4.003, h: 0.729,
      fontSize: f.size, charSpacing: -0.25, color: INK
    }));
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.935, y: 8.046, w: 8.023, h: 0.012,
    fill: { color: DIV }, line: { color: DIV, width: 0 }
  });
  s.addText(
    "A five-minute drive reaches Arcadia, Paradise Valley, and the Camelback resort hotels — " +
    "three of the highest-density luxury zip codes in the Southwest.",
    tx({
      x: 10.935, y: 8.264, w: 8.264, h: 1.5,
      fontSize: 13, color: MOSS, fontFace: FONT_BODY
    })
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — EXPERIENCE
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: SAND };

  addBrandHeader(s, "05 · EXPERIENCE", MOSS);

  s.addText("THE ROOM", tx({
    x: 1.042, y: 1.5, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText("The room is the reason people come back.", tx({
    x: 1.042, y: 1.943, w: 17.167, h: 1.879,
    fontSize: 46, charSpacing: -1, color: INK
  }));

  // Left image panel (warm cream)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 4.28, w: 6.763, h: 6.324,
    fill: { color: CREAM_LT }, line: { color: CREAM_LT, width: 0 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.198, y: 9.771, w: 6.45, h: 0.677,
    fill: { color: NIGHT }, line: { color: NIGHT, width: 0 }
  });
  s.addText("TRAVERTINE ISLAND · BRASS RAILS · FRAMES DISPLAYED LIKE OBJECTS", tx({
    x: 1.365, y: 9.917, w: 6.31, h: 0.427,
    fontSize: 9, charSpacing: 2.16, color: CREAM
  }));

  // Middle image panel (dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.179, y: 4.28, w: 5.202, h: 6.324,
    fill: { color: CHARCOAL }, line: { color: CHARCOAL, width: 0 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.336, y: 9.771, w: 4.889, h: 0.677,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 }
  });
  s.addText("GLASS-WALLED EXAM ROOM · VISIBLE FROM THE FLOOR", tx({
    x: 8.502, y: 9.917, w: 4.703, h: 0.427,
    fontSize: 9, charSpacing: 2.16, color: CHARCOAL
  }));

  // Right info column (3 items)
  const items = [
    { y1: 5.401, y2: 5.635, lbl: "01 · MATERIAL", val: "Travertine, oiled walnut, unlacquered brass." },
    { y1: 6.883, y2: 7.118, lbl: "02 · LIGHT",    val: "North-facing skylight, tuned to 4,000K." },
    { y1: 8.366, y2: 8.6,   lbl: "03 · RITUAL",   val: "Espresso, cold mint towel, 45-minute appointment." },
  ];
  items.forEach((it, i) => {
    s.addText(it.lbl, tx({
      x: 13.756, y: it.y1, w: 5.358, h: 0.234,
      fontSize: 9, charSpacing: 0.24, color: MOSS
    }));
    s.addText(it.val, tx({
      x: 13.756, y: it.y2, w: 5.358, h: 0.904,
      fontSize: 20, charSpacing: -0.25, color: INK
    }));
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 13.756, y: i === 0 ? 6.685 : 8.168, w: 5.202, h: 0.012,
        fill: { color: DIV }, line: { color: DIV, width: 0 }
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — CLINIC (service table)
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addBrandHeader(s, "06 · CLINIC", MOSS);

  s.addText("MEDICAL CREDIBILITY", tx({
    x: 1.042, y: 1.5, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText([
    { text: "An optician on-site — not on appointment ", options: { color: INK } },
    { text: "elsewhere",                                 options: { color: TERRACOTTA, italic: true } },
    { text: ".",                                         options: { color: INK } },
  ], tx({
    x: 1.042, y: 1.943, w: 18.24, h: 1.905,
    fontSize: 46, charSpacing: -1
  }));

  // Left body
  s.addText(
    "Most luxury eyewear stores sell you a frame and mail the prescription out. EYEMIE is built around " +
    "a licensed Doctor of Optometry and an ABO-certified optician working a single room away from the retail floor.",
    tx({
      x: 1.042, y: 4.306, w: 7.296, h: 2.375,
      fontSize: 18, color: CHARCOAL, fontFace: FONT_BODY
    })
  );
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 6.973, w: 7.803, h: 0.012,
    fill: { color: DIV }, line: { color: DIV, width: 0 }
  });
  s.addText(
    "The exam is a service we sell. The frame is a purchase we earn during it. The second visit — " +
    "lenses, fitting, aftercare — is where 63% of our projected repeat revenue lives.",
    tx({
      x: 1.042, y: 7.316, w: 7.296, h: 1.6,
      fontSize: 14, color: MOSS, fontFace: FONT_BODY
    })
  );

  // Right-side service table
  const cols = [
    { x: 9.595,  w: 4.9,   lblX: 9.595,  lblW: 5.047, label: "SERVICE",     align: "left"  },
    { x: 14.495, w: 2.888, lblX: 14.408, lblW: 2.975, label: "AVG. TICKET", align: "left"  },
    { x: 17.383, w: 1.575, lblX: 17.3,   lblW: 1.659, label: "MARGIN",      align: "left"  },
  ];
  // header labels
  cols.forEach(c => {
    s.addText(c.label, tx({
      x: c.lblX, y: 4.452, w: c.lblW, h: 0.365,
      fontSize: 13, charSpacing: 3.24, color: MOSS
    }));
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.921, w: c.w, h: 0.012,
      fill: { color: DIV }, line: { color: DIV, width: 0 }
    });
  });

  const rows = [
    { service: "Comprehensive eye exam",            ticket: "$225",   margin: "72%" },
    { service: "Premium Rx lenses (Zeiss, Essilor)",ticket: "$640",   margin: "58%" },
    { service: "Contact lens fitting & supply",     ticket: "$480",   margin: "41%" },
    { service: "Frame adjustment & aftercare",      ticket: "incl.",  margin: "—"   },
    { service: "Myopia management & pediatric",     ticket: "$1,100", margin: "52%" },
  ];
  const rowYs = [5.077, 5.764, 6.452, 7.139, 7.827];
  const dividerYs = [5.608, 6.296, 6.983, 7.671, 8.358];

  rows.forEach((r, i) => {
    s.addText(r.service, tx({
      x: 9.595, y: rowYs[i], w: 5.047, h: 0.427,
      fontSize: 13, color: INK, fontFace: FONT_BODY
    }));
    s.addText(r.ticket, tx({
      x: 14.408, y: rowYs[i], w: 2.975, h: 0.427,
      fontSize: 18, color: INK, charSpacing: 0
    }));
    s.addText(r.margin, tx({
      x: 17.3, y: rowYs[i], w: 1.659, h: 0.427,
      fontSize: 13, color: INK, fontFace: FONT_BODY
    }));
    cols.forEach(c => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: c.x, y: dividerYs[i], w: c.w, h: 0.012,
        fill: { color: DIV }, line: { color: DIV, width: 0 }
      });
    });
  });

  s.addText("CLINIC CONTRIBUTES 34% OF MODELED YEAR-ONE REVENUE", tx({
    x: 9.595, y: 8.582, w: 9.645, h: 0.234,
    fontSize: 9, charSpacing: 2.16, color: MOSS
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — HOUSE BRAND (dark)
// FIX: panels previously ran to y≈10.932, covering the footer at y=10.391.
// Panels now end at y=10.15 so the footer text clears them. Frame labels
// moved up inside the panel bottoms.
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BLACK_BG };

  addBrandHeader(s, "07 · HOUSE BRAND", CREAM);

  s.addText("THE HOUSE COLLECTION", tx({
    x: 1.042, y: 1.5, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText([
    { text: "A house brand shaped by the ", options: { color: CREAM } },
    { text: "Sonoran ",                     options: { color: TERRACOTTA, italic: true } },
    { text: "sun.",                         options: { color: CREAM } },
  ], tx({
    x: 1.042, y: 1.943, w: 18.24, h: 1.905,
    fontSize: 46, charSpacing: -1
  }));

  // Left body + price/margin note
  s.addText(
    "A six-frame capsule designed in-house and manufactured in Cadore, Italy. Acetate from Mazzucchelli, " +
    "hinges from Comotec, lenses tuned for high-altitude desert light.",
    tx({
      x: 1.042, y: 5.563, w: 4.709, h: 2.083,
      fontSize: 15, color: CREAM, fontFace: FONT_BODY
    })
  );
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.042, y: 7.854, w: 4.572, h: 0.012,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 }
  });
  s.addText(
    "House price point: $340 – $520. Target gross margin: 71%.",
    tx({
      x: 1.042, y: 8.115, w: 4.709, h: 0.706,
      fontSize: 13, color: CREAM, fontFace: FONT_BODY
    })
  );

  // ─── Three frame panels ─────────────────────────────────────────────────
  // Original geometry: y=4.264, h=6.668 (bottom 10.932) → collided with footer.
  // Fixed geometry below: y=4.264, h=5.886 (bottom 10.15, clear of footer at 10.391).
  const PANEL_Y   = 4.264;
  const PANEL_H   = 5.886;
  const PANEL_BOT = PANEL_Y + PANEL_H;        // 10.15
  const LABEL_Y1  = PANEL_BOT - 0.85;         // frame name (inside panel, above caption)
  const LABEL_Y2  = LABEL_Y1 + 0.3;           // caption under it

  const panels = [
    { x: 5.905,  fill: CLAY,      text: CREAM,    name: "MIRAGE",  sub: "OVERSIZE SQUARE · TORTOISE" },
    { x: 10.354, fill: WARM_WHT,  text: CHARCOAL, name: "SAGUARO", sub: "PILOT · BRUSHED TITANIUM"   },
    { x: 14.802, fill: DEEP_BRN,  text: CREAM,    name: "DUSK",    sub: "ROUND OPTICAL · SMOKE ACETATE" },
  ];

  panels.forEach(p => {
    // The panel
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: PANEL_Y, w: 4.156, h: PANEL_H,
      fill: { color: p.fill }, line: { color: p.fill, width: 0 }
    });

    // A simple frame silhouette centered in the panel
    const centerX = p.x + 4.156 / 2;
    const centerY = PANEL_Y + PANEL_H / 2 - 0.3;
    const lensW = 1.15, lensH = 0.8, gap = 0.18;
    const lensColor = p.fill === WARM_WHT ? "8B7B6A" : "1A140F";
    s.addShape(pres.shapes.OVAL, {
      x: centerX - lensW - gap / 2, y: centerY - lensH / 2,
      w: lensW, h: lensH,
      fill: { color: lensColor, transparency: 20 },
      line: { color: p.text, width: 1.25 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: centerX + gap / 2, y: centerY - lensH / 2,
      w: lensW, h: lensH,
      fill: { color: lensColor, transparency: 20 },
      line: { color: p.text, width: 1.25 }
    });
    s.addShape(pres.shapes.LINE, {
      x: centerX - gap / 2, y: centerY, w: gap, h: 0,
      line: { color: p.text, width: 1.25 }
    });

    // Frame name + subtitle inside the lower portion of the panel
    s.addText(p.name, tx({
      x: p.x + 0.219, y: LABEL_Y1, w: 3.831, h: 0.245,
      fontSize: 11, charSpacing: 2.25, color: p.text, bold: true, align: "center"
    }));
    s.addText(p.sub, tx({
      x: p.x + 0.219, y: LABEL_Y2, w: 3.831, h: 0.219,
      fontSize: 9, charSpacing: 2.25, color: p.text, align: "center"
    }));
  });

  // Footer now clears the panels
  s.addText("HOUSE COLLECTION · EDITION 01 · SIX FRAMES · SHIPS Q4 2026", tx({
    x: 1.042, y: 10.391, w: 7.599, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: CREAM
  }));
  s.addText("07 / 08", tx({
    x: 18.192, y: 10.391, w: 0.85, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: CREAM
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — THE ASK
// ═══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };

  addBrandHeader(s, "08 · ASK", MOSS);

  s.addText("THE ASK", tx({
    x: 1.042, y: 1.5, w: 18.454, h: 0.276,
    fontSize: 11, charSpacing: 3.3, color: TERRACOTTA
  }));
  s.addText([
    { text: "$2.4M to open in Q4 2026 — breakeven by month ", options: { color: INK } },
    { text: "eighteen",                                       options: { color: TERRACOTTA, italic: true } },
    { text: ".",                                              options: { color: INK } },
  ], tx({
    x: 1.042, y: 1.943, w: 18.24, h: 1.905,
    fontSize: 46, charSpacing: -1
  }));

  // ─── Left column: USE OF FUNDS ──────────────────────────────────────────
  s.addText("USE OF FUNDS · $2.4M", tx({
    x: 1.042, y: 4.264, w: 5.931, h: 0.26,
    fontSize: 10, charSpacing: 0.27, color: MOSS
  }));
  const funds = [
    { label: "Buildout & design",            amt: "$820k", y: 4.817, divY: 5.343 },
    { label: "Opening inventory (premium)",  amt: "$560k", y: 5.499, divY: 6.03  },
    { label: "House brand · tooling & run 01", amt: "$310k", y: 6.186, divY: 6.718 },
    { label: "Clinical equipment",           amt: "$240k", y: 6.874, divY: 7.405 },
    { label: "Team · 18-mo runway",          amt: "$380k", y: 7.561, divY: 8.093 },
    { label: "Working capital & marketing",  amt: "$90k",  y: 8.249, divY: 8.78  },
  ];
  funds.forEach(f => {
    s.addText(f.label, tx({
      x: 1.042, y: f.y, w: 4.63, h: 0.427,
      fontSize: 13, color: INK, fontFace: FONT_BODY
    }));
    s.addText(f.amt, tx({
      x: 5.454, y: f.y, w: 1.346, h: 0.427,
      fontSize: 18, color: INK, align: "right"
    }));
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.042, y: f.divY, w: 4.495, h: 0.012,
      fill: { color: DIV }, line: { color: DIV, width: 0 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.537, y: f.divY, w: 1.263, h: 0.012,
      fill: { color: DIV }, line: { color: DIV, width: 0 }
    });
  });

  // ─── Middle column: PROJECTIONS FY1-FY3 ─────────────────────────────────
  s.addText("PROJECTIONS · FY1 – FY3", tx({
    x: 7.383, y: 4.264, w: 5.931, h: 0.26,
    fontSize: 10, charSpacing: 0.27, color: MOSS
  }));
  // header row
  const fyCols = [
    { x: 7.383, w: 2.179, lblX: 7.383, lblW: 2.262, label: "", align: "left" },
    { x: 9.562, w: 1.356, lblX: 9.478, lblW: 1.439, label: "FY1", align: "left" },
    { x: 10.918,w: 1.111, lblX: 10.834,lblW: 1.195, label: "FY2", align: "left" },
    { x: 12.029,w: 1.112, lblX: 11.946,lblW: 1.195, label: "FY3", align: "left" },
  ];
  fyCols.forEach(c => {
    if (c.label) {
      s.addText(c.label, tx({
        x: c.lblX, y: 4.817, w: c.lblW, h: 0.365,
        fontSize: 13, charSpacing: 3.24, color: MOSS
      }));
    }
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 5.285, w: c.w, h: 0.012,
      fill: { color: DIV }, line: { color: DIV, width: 0 }
    });
  });

  const fyRows = [
    { label: "Revenue",        v1: "$2.1M",  v2: "$3.4M", v3: "$4.6M", y: 5.442, divY: 5.973, big: true  },
    { label: "Gross margin",   v1: "54%",    v2: "61%",   v3: "64%",   y: 6.129, divY: 6.567, big: false },
    { label: "EBITDA",         v1: "($180k)",v2: "$410k", v3: "$880k", y: 6.723, divY: 7.254, big: true  },
    { label: "House brand mix",v1: "12%",    v2: "24%",   v3: "33%",   y: 7.41,  divY: 7.848, big: false },
  ];
  fyRows.forEach(r => {
    s.addText(r.label, tx({
      x: 7.383, y: r.y, w: 2.262, h: 0.427,
      fontSize: 13, color: INK, fontFace: FONT_BODY
    }));
    const big = r.big;
    s.addText(r.v1, tx({ x: 9.478,  y: r.y, w: 1.439, h: 0.427, fontSize: big ? 18 : 13, color: INK, fontFace: big ? FONT_HEAD : FONT_BODY }));
    s.addText(r.v2, tx({ x: 10.834, y: r.y, w: 1.195, h: 0.427, fontSize: big ? 18 : 13, color: INK, fontFace: big ? FONT_HEAD : FONT_BODY }));
    s.addText(r.v3, tx({ x: 11.946, y: r.y, w: 1.195, h: 0.427, fontSize: big ? 18 : 13, color: INK, fontFace: big ? FONT_HEAD : FONT_BODY }));

    [[7.383,2.179],[9.562,1.356],[10.918,1.111],[12.029,1.112]].forEach(([x,w]) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: r.divY, w, h: 0.012,
        fill: { color: DIV }, line: { color: DIV, width: 0 }
      });
    });
  });

  // ─── Right column: THE DEAL ─────────────────────────────────────────────
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.724, y: 4.264, w: 5.234, h: 6.001,
    fill: { color: CHARCOAL }, line: { color: CHARCOAL, width: 0 }
  });
  s.addText("THE DEAL", tx({
    x: 14.099, y: 4.639, w: 4.619, h: 0.234,
    fontSize: 9, charSpacing: 0.24, color: CREAM
  }));
  s.addText("$2.4M", tx({
    x: 14.099, y: 4.978, w: 4.619, h: 0.8,
    fontSize: 38, charSpacing: -0.5, color: CREAM
  }));
  s.addText("Seed · SAFE · $12M cap", tx({
    x: 14.099, y: 5.811, w: 4.619, h: 0.374,
    fontSize: 13, color: CREAM, fontFace: FONT_BODY
  }));
  s.addShape(pres.shapes.RECTANGLE, {
    x: 14.099, y: 8.738, w: 4.484, h: 0.012,
    fill: { color: CREAM }, line: { color: CREAM, width: 0 }
  });
  s.addText(
    "Opens Q4 2026. A second location — Scottsdale or Austin — modeled for FY3 if unit economics hold.",
    tx({
      x: 14.099, y: 8.894, w: 4.619, h: 1.2,
      fontSize: 13, color: CREAM, fontFace: FONT_BODY
    })
  );

  // Footer
  s.addText("CONTACT · FOUNDER@EYEMIE.CO", tx({
    x: 1.042, y: 10.391, w: 3.963, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: MOSS
  }));
  s.addText("08 / 08 · THANK YOU", tx({
    x: 16.638, y: 10.391, w: 2.404, h: 0.234,
    fontSize: 9, charSpacing: 2.64, color: MOSS, align: "right"
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "eyemie_pitch.pptx" })
    .then(fn => console.log("Wrote:", fn));
