/**
 * Hang Seng Index — Investor Briefing
 * Replica generator using pptxgenjs.
 *
 * Run:  node hang_seng_deck.js
 * Out:  Hang_Seng_Index.pptx
 */

const pptxgen = require("pptxgenjs");

// ─── Palette & Type ──────────────────────────────────────────────────────────
const C = {
  bg:        "F4EFE6", // warm cream background
  ink:       "0E1B2C", // primary dark navy ink
  inkSoft:   "23324A", // softer navy
  muted:     "6B6F76", // muted gray for labels/captions
  rule:      "2A2A2A", // hairline rule near header
  ruleSoft:  "C9C2B6", // soft separator
  accent:    "C0392B", // muted brick-red accent
  accentSub: "E0CFC2", // dusty pinkish for hangSeng row highlight
  bull:      "5C8A6B", // green for bull
  panelBg:   "EAE3D5", // panel/box fill
  bar:       "0E1B2C", // bar charts (navy)
  barLight:  "DCD6CA", // bar background track
};

const FONT_HEADER = "Georgia";
const FONT_BODY   = "Calibri";

// Slide is 20.0" × 11.25"
const W = 20.0, H = 11.25;
const MARGIN_X = 1.05; // outer left/right margin
const HEADER_Y = 0.65;
const HEADER_RULE_Y = 1.00;
const FOOTER_RULE_Y = 10.50;
const FOOTER_TEXT_Y = 10.65;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function addBackground(slide) {
  slide.background = { color: C.bg };
}

function addLogoMark(slide, x, y) {
  // small framed "恒" mark in upper-left
  slide.addShape("rect", {
    x: x, y: y, w: 0.42, h: 0.42,
    fill: { color: C.bg },
    line: { color: C.ink, width: 0.75 },
  });
  slide.addText("恒", {
    x: x, y: y, w: 0.42, h: 0.42,
    fontFace: FONT_HEADER, fontSize: 16, color: C.ink,
    align: "center", valign: "middle", margin: 0,
  });
}

function addHeader(slide, leftLabel, rightLabel) {
  // Header rule (drawn FIRST so it sits underneath everything else cleanly)
  slide.addShape("line", {
    x: MARGIN_X, y: HEADER_RULE_Y + 0.18, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.rule, width: 0.75 },
  });
  addLogoMark(slide, MARGIN_X, HEADER_Y);
  slide.addText(leftLabel, {
    x: MARGIN_X + 0.65, y: HEADER_Y, w: 11, h: 0.42,
    fontFace: FONT_BODY, fontSize: 13, color: C.ink,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  slide.addText(rightLabel, {
    x: W - MARGIN_X - 11, y: HEADER_Y, w: 11, h: 0.42,
    fontFace: FONT_BODY, fontSize: 13, color: C.ink,
    charSpacing: 4, align: "right", valign: "middle", margin: 0,
  });
}

function addFooter(slide, leftLabel, rightLabel, pageNum) {
  // footer rule
  slide.addShape("line", {
    x: MARGIN_X, y: FOOTER_RULE_Y, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ruleSoft, width: 0.5 },
  });
  if (leftLabel) {
    slide.addText(leftLabel, {
      x: MARGIN_X, y: FOOTER_TEXT_Y, w: 11, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11, color: C.muted,
      charSpacing: 3, valign: "middle", margin: 0,
    });
  }
  if (rightLabel) {
    slide.addText(rightLabel, {
      x: W - MARGIN_X - 7.5, y: FOOTER_TEXT_Y, w: 7, h: 0.4,
      fontFace: FONT_BODY, fontSize: 11, color: C.muted,
      charSpacing: 3, align: "right", valign: "middle", margin: 0,
    });
  }
  if (pageNum !== undefined) {
    slide.addText(pageNum, {
      x: W - MARGIN_X - 0.6, y: FOOTER_TEXT_Y, w: 0.6, h: 0.4,
      fontFace: FONT_HEADER, fontSize: 12, italic: true, color: C.muted,
      align: "right", valign: "middle", margin: 0,
    });
  }
}

// ─── Build presentation ──────────────────────────────────────────────────────
const pres = new pptxgen();
pres.title = "The Hang Seng, repriced.";
pres.author = "Equity Research · Asia Pacific";
pres.defineLayout({ name: "HSI_WIDE", width: W, height: H });
pres.layout = "HSI_WIDE";

// ─── Slide 1: Title ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "EQUITY RESEARCH · ASIA PACIFIC", "APRIL 2026 · CONFIDENTIAL");

  // Section eyebrow
  s.addText("INVESTOR BRIEFING", {
    x: MARGIN_X, y: 2.45, w: 8, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 6, margin: 0,
  });

  // Big title (rich text: navy + red italic)
  s.addText(
    [
      { text: "The Hang Seng, ", options: { color: C.ink, italic: false } },
      { text: "repriced.",       options: { color: C.accent, italic: true } },
    ],
    {
      x: MARGIN_X, y: 3.0, w: 18, h: 1.9,
      fontFace: FONT_HEADER, fontSize: 88, bold: false,
      valign: "top", margin: 0,
    }
  );

  // Lead description
  s.addText(
    "A market-cap-weighted view of Hong Kong's flagship index — its largest constituents, " +
    "its valuation against global peers, and the policy backdrop shaping capital flows into China.",
    {
      x: MARGIN_X, y: 6.1, w: 11.0, h: 1.6,
      fontFace: FONT_BODY, fontSize: 18, color: C.inkSoft,
      valign: "top", margin: 0, paraSpaceAfter: 0,
    }
  );

  // Big "01" in soft cream (background number)
  s.addText("01", {
    x: W - MARGIN_X - 4.2, y: 6.6, w: 4.2, h: 2.6,
    fontFace: FONT_HEADER, fontSize: 180, italic: true, color: C.accentSub,
    align: "right", valign: "middle", margin: 0,
  });

  addFooter(s, "HANG SENG INDEX · HSI", "PREPARED FOR INSTITUTIONAL INVESTORS", "I");
}

// ─── Slide 2: Index at a Glance ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "02 · INDEX AT A GLANCE", "HSI · HONG KONG STOCK EXCHANGE");

  s.addText("Hong Kong's headline benchmark.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 44, color: C.ink, margin: 0,
  });

  s.addText(
    "Free-float-adjusted, market-cap-weighted; 88 constituents covering roughly 58% of HKEX " +
    "capitalisation. The index spans Hong Kong ordinaries, Red Chips, H-shares and other mainland-listed entities.",
    {
      x: MARGIN_X, y: 2.55, w: 14, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // KPI strip — 4 cells
  const kpiY = 4.05;
  const kpiH = 1.9;
  const kpiW = (W - 2 * MARGIN_X) / 4;
  // top rule
  s.addShape("line", {
    x: MARGIN_X, y: kpiY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.75 },
  });
  // bottom rule
  s.addShape("line", {
    x: MARGIN_X, y: kpiY + kpiH + 0.45, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.5 },
  });

  const kpis = [
    { big: "25,915",  unit: "",  label: "INDEX LEVEL",  sub: "Apr 2026, HKD" },
    { big: "12.4",    unit: "×", label: "TRAILING P/E", sub: "Mar 2026 · TTM" },
    { big: "88",      unit: "",  label: "CONSTITUENTS", sub: "~58% of HKEX cap" },
    { big: "1969",    unit: "",  label: "INCEPTION",    sub: "Base 100, Jul 1964" },
  ];
  kpis.forEach((k, i) => {
    const x = MARGIN_X + i * kpiW;
    // vertical separator (between cells)
    if (i > 0) {
      s.addShape("line", {
        x: x, y: kpiY + 0.25, w: 0, h: kpiH - 0.05,
        line: { color: C.ruleSoft, width: 0.5 },
      });
    }
    // big number with optional small "x"
    s.addText(
      [
        { text: k.big, options: { fontSize: 78 } },
        ...(k.unit ? [{ text: k.unit, options: { fontSize: 32, baseline: 0 } }] : []),
      ],
      {
        x: x + 0.35, y: kpiY + 0.15, w: kpiW - 0.4, h: 1.15,
        fontFace: FONT_HEADER, color: C.ink, valign: "top", margin: 0,
      }
    );
    // label
    s.addText(k.label, {
      x: x + 0.35, y: kpiY + 1.30, w: kpiW - 0.4, h: 0.34,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft,
      charSpacing: 4, margin: 0,
    });
    // sub
    s.addText(k.sub, {
      x: x + 0.35, y: kpiY + 1.66, w: kpiW - 0.4, h: 0.34,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted, margin: 0,
    });
  });

  // Two-column callouts
  const calloutY = 6.7;
  s.addText("RANGE MEMORY", {
    x: MARGIN_X, y: calloutY, w: 8, h: 0.4,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addText(
    "All-time high 33,223 (Jan 2018). The index has not retested that level in eight years.",
    {
      x: MARGIN_X, y: calloutY + 0.45, w: 8.5, h: 1.1,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft, margin: 0,
    }
  );

  s.addText("P/E HISTORY", {
    x: MARGIN_X + 9.5, y: calloutY, w: 8, h: 0.4,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addText(
    "Trailing P/E peaked at 18.1× (Jun 2021); trough 7.5× (Feb 2016).",
    {
      x: MARGIN_X + 9.5, y: calloutY + 0.45, w: 8.5, h: 1.1,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft, margin: 0,
    }
  );

  addFooter(s, "SOURCE: HANG SENG INDEXES CO., GURUFOCUS, CEIC", "HSI · INVESTOR BRIEFING", "02");
}

// ─── Slide 3: Composition & Sector Mix ──────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "03 · COMPOSITION & SECTOR MIX", "FREE-FLOAT WEIGHTED");

  s.addText("Financials and tech do most of the work.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });
  s.addText(
    "Two industries — Financials and Information Technology — together account for roughly two-thirds of the index. " +
    "Property and consumer cyclicals provide the cyclical tilt; energy and utilities are minor.",
    {
      x: MARGIN_X, y: 2.55, w: 14, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // Bar list (left)
  const sectors = [
    { name: "Financials",          pct: 36, hilite: true  },
    { name: "Information Tech",    pct: 28, hilite: true  },
    { name: "Consumer Disc.",      pct: 11, hilite: false },
    { name: "Properties & Constr.", pct: 7, hilite: false },
    { name: "Energy",               pct: 5, hilite: false },
    { name: "Telecom & Utilities",  pct: 6, hilite: false },
    { name: "Other",                pct: 7, hilite: false },
  ];
  const listLeft = MARGIN_X;
  const listTop = 4.0;
  const rowH = 0.78;
  const labelW = 3.0;
  const trackX = listLeft + labelW + 0.2;
  const trackW = 5.4;
  const pctX = trackX + trackW + 0.2;
  const pctW = 1.1;
  const rowEnd = pctX + pctW;
  // Max scale: 40%
  const maxPct = 40;

  sectors.forEach((row, i) => {
    const y = listTop + i * rowH;
    // sector label
    s.addText(row.name, {
      x: listLeft, y: y, w: labelW, h: rowH,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft,
      valign: "middle", margin: 0,
    });
    // background track
    s.addShape("rect", {
      x: trackX, y: y + rowH/2 - 0.13, w: trackW, h: 0.26,
      fill: { color: C.barLight }, line: { color: C.barLight, width: 0 },
    });
    // bar
    const barW = (row.pct / maxPct) * trackW;
    s.addShape("rect", {
      x: trackX, y: y + rowH/2 - 0.13, w: barW, h: 0.26,
      fill: { color: row.hilite ? C.accent : C.bar },
      line: { color: row.hilite ? C.accent : C.bar, width: 0 },
    });
    // pct on right
    s.addText("~" + row.pct + "%", {
      x: pctX, y: y, w: pctW, h: rowH,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft,
      align: "right", valign: "middle", margin: 0,
    });
    // separator under each row
    s.addShape("line", {
      x: listLeft, y: y + rowH, w: rowEnd - listLeft, h: 0,
      line: { color: C.ruleSoft, width: 0.4 },
    });
  });

  // Right panel — share-class mix box
  const panelX = 11.6, panelY = 3.85, panelW = W - MARGIN_X - 11.6, panelH = 4.55;
  s.addShape("rect", {
    x: panelX, y: panelY, w: panelW, h: panelH,
    fill: { color: C.bg }, line: { color: C.ink, width: 0.75 },
  });
  s.addText("SHARE-CLASS MIX", {
    x: panelX + 0.4, y: panelY + 0.25, w: panelW - 0.8, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  const classes = [
    ["HK Ordinary",                "~35%"],
    ["H-Shares (Mainland)",        "~28%"],
    ["Red Chips",                  "~17%"],
    ["Other HK-listed Mainland Co.", "~20%"],
  ];
  const classRowH = 0.7;
  classes.forEach((c, i) => {
    const ry = panelY + 0.85 + i * classRowH;
    s.addText(c[0], {
      x: panelX + 0.4, y: ry, w: panelW - 1.6, h: classRowH,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft,
      valign: "middle", margin: 0,
    });
    s.addText(c[1], {
      x: panelX + panelW - 1.4, y: ry, w: 1.0, h: classRowH,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft,
      align: "right", valign: "middle", margin: 0,
    });
    if (i < classes.length - 1) {
      s.addShape("line", {
        x: panelX + 0.4, y: ry + classRowH, w: panelW - 0.8, h: 0,
        line: { color: C.ruleSoft, width: 0.4 },
      });
    }
  });
  s.addText(
    "A 8% individual cap limits single-name dominance. Rebalanced quarterly.",
    {
      x: panelX + 0.4, y: panelY + panelH - 0.95, w: panelW - 0.8, h: 0.85,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted, italic: false, margin: 0,
    }
  );

  // Concentration note below right panel
  s.addText(
    [
      { text: "Concentration risk: ", options: { bold: true, color: C.ink } },
      { text: "the top ten names contribute the majority of daily index variance — meaning HSI behaviour is driven by a small handful of mega-caps.",
        options: { color: C.inkSoft } },
    ],
    {
      x: panelX, y: panelY + panelH + 0.25, w: panelW, h: 1.4,
      fontFace: FONT_BODY, fontSize: 14, margin: 0,
    }
  );

  addFooter(s, "SOURCE: HSI FACTSHEET, MAR 2026 · WEIGHTS APPROXIMATE", "HSI · INVESTOR BRIEFING", "03");
}

// ─── Slide 4: Top Three Constituents ─────────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "04 · TOP THREE CONSTITUENTS", "BY FREE-FLOAT MARKET CAP");

  s.addText("Three names anchor the index.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });
  s.addText(
    "Tencent, Alibaba and HSBC together represent roughly a quarter of the index by weight. " +
    "Two are gated by Beijing's regulatory regime; one is a global commercial bank with a Chinese earnings tilt.",
    {
      x: MARGIN_X, y: 2.55, w: 14, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  const cards = [
    { ticker: "0700.HK", num: "#01", name: "Tencent Holdings", sector: "Communication Services · Red Chip",
      weight: "~9.5%", subSector: "Internet · Gaming" },
    { ticker: "9988.HK", num: "#02", name: "Alibaba Group",    sector: "Consumer Discretionary · Other Mainland Co.",
      weight: "~8.0%", subSector: "E-commerce · Cloud" },
    { ticker: "0005.HK", num: "#03", name: "HSBC Holdings",    sector: "Financials · HK Ordinary",
      weight: "~7.5%", subSector: "Global Banking" },
  ];
  const cardY = 4.05, cardH = 4.05;
  const totalW = W - 2 * MARGIN_X;
  const gap = 0.35;
  const cardW = (totalW - 2 * gap) / 3;

  cards.forEach((c, i) => {
    const x = MARGIN_X + i * (cardW + gap);
    s.addShape("rect", {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.bg }, line: { color: C.ink, width: 0.75 },
    });
    // ticker (red)
    s.addText(c.ticker, {
      x: x + 0.4, y: cardY + 0.25, w: cardW - 1.6, h: 0.45,
      fontFace: FONT_BODY, fontSize: 17, color: C.accent, margin: 0,
    });
    // rank #01 (top right)
    s.addText(c.num, {
      x: x + cardW - 1.2, y: cardY + 0.25, w: 0.85, h: 0.45,
      fontFace: FONT_BODY, fontSize: 14, color: C.muted,
      align: "right", margin: 0,
    });
    // name
    s.addText(c.name, {
      x: x + 0.4, y: cardY + 0.85, w: cardW - 0.8, h: 0.7,
      fontFace: FONT_HEADER, fontSize: 28, color: C.ink, margin: 0,
    });
    // sector line
    s.addText(c.sector, {
      x: x + 0.4, y: cardY + 1.65, w: cardW - 0.8, h: 0.65,
      fontFace: FONT_BODY, fontSize: 14, color: C.muted, margin: 0,
    });
    // separator
    s.addShape("line", {
      x: x + 0.4, y: cardY + 2.35, w: cardW - 0.8, h: 0,
      line: { color: C.ruleSoft, width: 0.5 },
    });
    // labels row
    s.addText("Index weight", {
      x: x + 0.4, y: cardY + 2.55, w: (cardW - 0.8) / 2, h: 0.35,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted, margin: 0,
    });
    s.addText("Sector", {
      x: x + cardW / 2, y: cardY + 2.55, w: (cardW - 0.8) / 2, h: 0.35,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted, align: "right", margin: 0,
    });
    // values row
    s.addText(c.weight, {
      x: x + 0.4, y: cardY + 2.95, w: (cardW - 0.8) / 2, h: 0.85,
      fontFace: FONT_HEADER, fontSize: 36, color: C.ink, margin: 0,
    });
    s.addText(c.subSector, {
      x: x + cardW / 2, y: cardY + 3.15, w: (cardW - 0.8) / 2, h: 0.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.inkSoft,
      align: "right", margin: 0,
    });
  });

  // Combined contribution bar
  const combY = 8.55;
  s.addShape("line", {
    x: MARGIN_X, y: combY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.5 },
  });
  s.addText("Combined index contribution", {
    x: MARGIN_X, y: combY + 0.2, w: 10, h: 0.6,
    fontFace: FONT_BODY, fontSize: 15, color: C.inkSoft,
    valign: "middle", margin: 0,
  });
  s.addText("≈ 25%", {
    x: W - MARGIN_X - 4, y: combY + 0.1, w: 4, h: 0.85,
    fontFace: FONT_HEADER, fontSize: 36, color: C.ink,
    align: "right", valign: "middle", margin: 0,
  });
  s.addShape("line", {
    x: MARGIN_X, y: combY + 0.95, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.4 },
  });

  addFooter(s, "SOURCE: HSI MAR 2026 FACTSHEET, EXCHANGE FILINGS · WEIGHTS APPROXIMATE", "HSI · INVESTOR BRIEFING", "04");
}

// ─── Slide 5: Constituent Metrics (table) ────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "05 · CONSTITUENT METRICS", "FY ESTIMATES · INDICATIVE");

  s.addText("Key metrics on the top three.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });

  // Custom table layout (so we can stack ticker line under company name)
  const tblY = 2.85;
  const tblX = MARGIN_X;
  const tblW = W - 2 * MARGIN_X;
  const colCompanyW = 4.4;
  const remW = tblW - colCompanyW;
  const numCols = 6;
  const colW = remW / numCols;

  const headers = ["MKT CAP", "FWD P/E", "REV. GROWTH", "OP. MARGIN", "NET CASH", "DIV. YIELD"];
  // header row
  s.addText("COMPANY", {
    x: tblX, y: tblY, w: colCompanyW, h: 0.5,
    fontFace: FONT_BODY, fontSize: 13, color: C.inkSoft,
    charSpacing: 4, valign: "middle", margin: 0,
  });
  headers.forEach((h, i) => {
    s.addText(h, {
      x: tblX + colCompanyW + i * colW, y: tblY, w: colW, h: 0.5,
      fontFace: FONT_BODY, fontSize: 13, color: C.inkSoft,
      charSpacing: 4, align: "center", valign: "middle", margin: 0,
    });
  });
  // header rule
  s.addShape("line", {
    x: tblX, y: tblY + 0.55, w: tblW, h: 0,
    line: { color: C.ink, width: 0.6 },
  });

  // rows
  const rows = [
    {
      name: "Tencent Holdings", sub: "0700.HK · Internet, gaming, fintech",
      vals: ["≈ HK$4.6T", "17×", { text: "+9%",  color: C.bull }, "~33%", "Positive", "~1.0%"],
    },
    {
      name: "Alibaba Group", sub: "9988.HK · E-commerce, cloud, AIDC",
      vals: ["≈ HK$2.1T", "11×", { text: "+6%",  color: C.bull }, "~15%", "Positive", "~1.4%"],
    },
    {
      name: "HSBC Holdings", sub: "0005.HK · Global banking, Asia-led",
      vals: ["≈ HK$1.7T", "8×", "flat", "RoTE ~14%", "CET1 ~15%", "~6.8%"],
    },
  ];
  const rowHeight = 1.0;
  rows.forEach((r, i) => {
    const y = tblY + 0.65 + i * rowHeight;
    // company stacked
    s.addText(r.name, {
      x: tblX, y: y + 0.05, w: colCompanyW, h: 0.5,
      fontFace: FONT_BODY, fontSize: 18, color: C.ink,
      valign: "top", margin: 0,
    });
    s.addText(r.sub, {
      x: tblX, y: y + 0.5, w: colCompanyW, h: 0.45,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted,
      valign: "top", margin: 0,
    });
    // values
    r.vals.forEach((v, j) => {
      const isObj = typeof v === "object";
      s.addText(isObj ? v.text : v, {
        x: tblX + colCompanyW + j * colW, y: y, w: colW, h: rowHeight - 0.05,
        fontFace: FONT_BODY, fontSize: 16, color: isObj ? v.color : C.ink,
        align: "center", valign: "middle", margin: 0,
      });
    });
    // separator
    s.addShape("line", {
      x: tblX, y: y + rowHeight - 0.03, w: tblW, h: 0,
      line: { color: C.ruleSoft, width: 0.4 },
    });
  });

  // Three commentary columns
  const noteY = 6.55;
  const noteW = (tblW - 0.6) / 3;
  const notes = [
    ["TENCENT", "Margin recovery as gaming approvals normalise; AI capex cycle remains the key swing factor for FCF."],
    ["ALIBABA", "Re-rating story tied to cloud monetisation and capital returns; e-commerce share losses to PDD persist."],
    ["HSBC",    "Capital return is the thesis: buybacks plus a dividend yield above developed-market peers."],
  ];
  notes.forEach((n, i) => {
    const x = tblX + i * (noteW + 0.3);
    s.addText(n[0], {
      x: x, y: noteY, w: noteW, h: 0.45,
      fontFace: FONT_BODY, fontSize: 14, color: C.accent,
      charSpacing: 5, margin: 0,
    });
    s.addText(n[1], {
      x: x, y: noteY + 0.55, w: noteW, h: 1.6,
      fontFace: FONT_BODY, fontSize: 15, color: C.inkSoft, margin: 0,
    });
  });

  addFooter(s, "SOURCE: COMPANY FILINGS, CONSENSUS ESTIMATES · INDICATIVE FIGURES, NOT INVESTMENT ADVICE", "HSI · INVESTOR BRIEFING", "05");
}

// ─── Slide 6: Valuation vs. Global Peers ─────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "06 · VALUATION VS. GLOBAL PEERS", "TRAILING P/E · EARLY 2026");

  s.addText("A discount that has refused to close.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });
  s.addText(
    "On trailing earnings the Hang Seng trades at a meaningful discount to every major developed market and to onshore China. " +
    "The gap reflects an enduring policy and geopolitical risk premium.",
    {
      x: MARGIN_X, y: 2.55, w: 16, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // Bars: comparison
  const bars = [
    { name: "S&P 500",         pe: 26,   pct: 26/30, hl: false },
    { name: "Nasdaq 100",      pe: 30,   pct: 30/30, hl: false },
    { name: "Nikkei 225",      pe: 19,   pct: 19/30, hl: false },
    { name: "STOXX Europe 600",pe: 16,   pct: 16/30, hl: false },
    { name: "CSI 300 (Mainland)", pe:14, pct: 14/30, hl: false },
    { name: "Hang Seng",       pe: 12.4, pct: 12.4/30, hl: true,
      valLabel: "12.4×" },
  ];
  const bL = MARGIN_X;
  const bTop = 4.05;
  const labelW = 3.3;
  const trackX = bL + labelW + 0.3;
  const trackW = 11.5;
  const valX = trackX + trackW + 0.3;
  const rH = 0.65;
  bars.forEach((b, i) => {
    const y = bTop + i * (rH + 0.1);
    if (b.hl) {
      // pinkish row band
      s.addShape("rect", {
        x: bL, y: y, w: W - 2 * MARGIN_X, h: rH,
        fill: { color: C.accentSub, transparency: 35 },
        line: { color: C.accentSub, width: 0 },
      });
    }
    s.addText(b.name, {
      x: bL + 0.1, y: y, w: labelW, h: rH,
      fontFace: FONT_BODY, fontSize: 16, color: b.hl ? C.accent : C.inkSoft,
      valign: "middle", margin: 0,
    });
    // background track
    s.addShape("rect", {
      x: trackX, y: y + rH/2 - 0.13, w: trackW, h: 0.26,
      fill: { color: C.barLight }, line: { color: C.barLight, width: 0 },
    });
    // bar
    s.addShape("rect", {
      x: trackX, y: y + rH/2 - 0.13, w: trackW * b.pct, h: 0.26,
      fill: { color: b.hl ? C.accent : C.bar },
      line: { color: b.hl ? C.accent : C.bar, width: 0 },
    });
    // value
    s.addText(b.valLabel || ("~" + b.pe + "×"), {
      x: valX, y: y, w: 1.5, h: rH,
      fontFace: FONT_BODY, fontSize: 16, color: b.hl ? C.accent : C.inkSoft,
      align: "left", valign: "middle", margin: 0,
    });
  });

  // Bottom split: discount text + reading box
  const botY = 8.55;
  s.addShape("line", {
    x: MARGIN_X, y: botY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.5 },
  });
  s.addText(
    [
      { text: "Discount to S&P 500 ≈ ", options: { color: C.ink } },
      { text: "52%.",                    options: { color: C.accent } },
    ],
    {
      x: MARGIN_X, y: botY + 0.2, w: 10, h: 0.55,
      fontFace: FONT_BODY, fontSize: 18, margin: 0,
    }
  );
  s.addText(
    "Even adjusting for sector mix and growth differentials, the residual gap to global benchmarks is at decade-wide levels.",
    {
      x: MARGIN_X, y: botY + 0.8, w: 9.5, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // Reading the discount panel
  const pX = 11.0, pY = botY + 0.15, pW = W - MARGIN_X - 11.0, pH = 1.65;
  s.addShape("rect", {
    x: pX, y: pY, w: pW, h: pH,
    fill: { color: C.panelBg }, line: { color: C.ink, width: 0.6 },
  });
  s.addText("READING THE DISCOUNT", {
    x: pX + 0.3, y: pY + 0.15, w: pW - 0.6, h: 0.4,
    fontFace: FONT_BODY, fontSize: 13, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addText(
    "Cheap is not the same as catalysed. The HSI has been cheap for three years. " +
    "What unlocks the discount is policy clarity — not multiple expansion in isolation.",
    {
      x: pX + 0.3, y: pY + 0.55, w: pW - 0.6, h: pH - 0.65,
      fontFace: FONT_BODY, fontSize: 13, color: C.inkSoft, margin: 0,
    }
  );

  addFooter(s, "SOURCE: INDEX PROVIDERS, FACTSET · TRAILING P/E, ILLUSTRATIVE", "HSI · INVESTOR BRIEFING", "06");
}

// ─── Slide 7: Performance (line chart) ───────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "07 · PERFORMANCE", "TOTAL RETURN, INDEXED");

  s.addText("A lost decade — and a fragile recovery.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });
  s.addText(
    "The all-time high of 33,224 was set in January 2018. Eight years later, the index sits roughly 22% below that peak. " +
    "2023 fell 13.8% before a 2024–25 rebound powered by stimulus and tech.",
    {
      x: MARGIN_X, y: 2.55, w: 16, h: 1.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // Native line chart
  const chartLabels = ["'16", "", "'18", "", "'20", "", "'22", "", "'24", "", "'26"];
  const chartValues = [20800, 24100, 33224, 28100, 25800, 28500, 32400, 21800, 24200, 25400, 25915];

  s.addChart(pres.charts.LINE,
    [{ name: "HSI", labels: chartLabels, values: chartValues }],
    {
      x: MARGIN_X, y: 3.85, w: W - 2 * MARGIN_X, h: 5.0,
      chartColors: [C.ink],
      lineSize: 2.5,
      lineSmooth: false,
      showLegend: false,
      catAxisLabelColor: C.muted,
      catAxisLabelFontSize: 11,
      catAxisLabelFontFace: FONT_BODY,
      valAxisLabelColor: C.muted,
      valAxisLabelFontSize: 11,
      valAxisLabelFontFace: FONT_BODY,
      valAxisMinVal: 15000,
      valAxisMaxVal: 35000,
      valAxisMajorUnit: 5000,
      valAxisLabelFormatCode: "#,##0",
      valGridLine: { color: C.ruleSoft, size: 0.5 },
      catGridLine: { style: "none" },
      lineDataSymbol: "circle",
      lineDataSymbolSize: 6,
      lineDataSymbolLineColor: C.ink,
      chartArea: { fill: { color: C.bg } },
      plotArea:  { fill: { color: C.bg } },
    }
  );

  // Italic annotations (text-only, near peak/trough/end of line)
  s.addText("ATH 33,224 · Jan 2018", {
    x: 5.6, y: 4.0, w: 4.5, h: 0.45,
    fontFace: FONT_HEADER, fontSize: 18, italic: true, color: C.accent, margin: 0,
  });
  s.addText("2023 trough · −13.8% YR", {
    x: 11.6, y: 7.55, w: 4.5, h: 0.45,
    fontFace: FONT_HEADER, fontSize: 18, italic: true, color: C.ink, margin: 0,
  });
  s.addText("25,915 · Apr 2026", {
    x: 13.5, y: 5.7, w: 4.0, h: 0.45,
    fontFace: FONT_HEADER, fontSize: 18, italic: true, color: C.ink,
    align: "right", margin: 0,
  });

  // Bottom KPI strip
  const kY = 9.45;
  const kpis2 = [
    { label: "YTD '26",          val: "+1.5%", color: C.ink },
    { label: "5-yr total return", val: "−18%",  color: C.accent },
    { label: "vs. ATH (Jan '18)", val: "−22%",  color: C.accent },
    { label: "Annualised vol (12m)", val: "~22%", color: C.ink },
  ];
  const kW = (W - 2 * MARGIN_X) / 4;
  kpis2.forEach((k, i) => {
    const x = MARGIN_X + i * kW;
    s.addText(k.label, {
      x: x, y: kY, w: kW, h: 0.4,
      fontFace: FONT_BODY, fontSize: 13, color: C.muted, margin: 0,
    });
    s.addText(k.val, {
      x: x, y: kY + 0.4, w: kW, h: 0.6,
      fontFace: FONT_HEADER, fontSize: 24, color: k.color, margin: 0,
    });
  });

  addFooter(s, "SOURCE: HSI CO., WIKIPEDIA HISTORICAL, YAHOO FINANCE · ILLUSTRATIVE PATH", "HSI · INVESTOR BRIEFING", "07");
}

// ─── Slide 8: Policy Backdrop ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "08 · POLICY BACKDROP", "COMMON PROSPERITY");

  // Left block
  const lX = MARGIN_X, lW = 9.0;
  s.addText("共同富裕 · COMMON PROSPERITY", {
    x: lX, y: 1.55, w: lW, h: 0.5,
    fontFace: FONT_BODY, fontSize: 16, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addText("Why Hong Kong-listed China names are under-owned.", {
    x: lX, y: 2.1, w: lW, h: 2.6,
    fontFace: FONT_HEADER, fontSize: 42, color: C.ink, margin: 0,
  });
  s.addText(
    "Re-articulated by Beijing in 2021, Common Prosperity is a strategic doctrine emphasising redistribution, " +
    "social fairness, and the constraint of \"disorderly capital expansion.\" For listed-equity investors, " +
    "it has reset the operating envelope for entire industries.",
    {
      x: lX, y: 4.85, w: lW, h: 1.6,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );
  s.addText(
    "The doctrine is not anti-business; it is anti-rentier. But it has materially raised the cost of equity for any platform " +
    "whose profit pool sits at the intersection of consumer surplus and household balance sheets — exactly where many of the HSI's " +
    "largest names operate.",
    {
      x: lX, y: 6.55, w: lW, h: 2.0,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    }
  );

  // Right block: bordered panel with policy timeline
  const rX = 10.7, rY = 1.55, rW = W - MARGIN_X - 10.7, rH = 7.65;
  s.addShape("rect", {
    x: rX, y: rY, w: rW, h: rH,
    fill: { color: C.bg }, line: { color: C.ink, width: 0.6 },
  });
  s.addText("POLICY ACTIONS, 2021 → 2025", {
    x: rX + 0.4, y: rY + 0.3, w: rW - 0.8, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addShape("line", {
    x: rX + 0.4, y: rY + 0.85, w: rW - 0.8, h: 0,
    line: { color: C.ruleSoft, width: 0.4 },
  });
  const events = [
    ["'21", "Anti-monopoly fines on platforms; Ant IPO suspension stands"],
    ["'21", "For-profit tutoring effectively dismantled overnight"],
    ["'21", "Gaming licence freeze; minor-playtime caps"],
    ["'22", "Property \"three red lines\" tightening; Evergrande default"],
    ["'23", "Data security & cross-border listing rules formalised"],
    ["'24", "Targeted stimulus; selective easing for tech & AI"],
    ["'25", "Capital-markets reform push, dividend & buyback guidance"],
  ];
  const evRowH = (rH - 1.1) / events.length;
  events.forEach((e, i) => {
    const ey = rY + 0.95 + i * evRowH;
    s.addText(e[0], {
      x: rX + 0.4, y: ey, w: 0.9, h: evRowH,
      fontFace: FONT_HEADER, fontSize: 16, italic: true, color: C.accent,
      valign: "middle", margin: 0,
    });
    s.addText(e[1], {
      x: rX + 1.4, y: ey, w: rW - 1.7, h: evRowH,
      fontFace: FONT_BODY, fontSize: 14, color: i === events.length - 1 ? C.ink : C.inkSoft,
      bold: i === events.length - 1,
      valign: "middle", margin: 0,
    });
    if (i < events.length - 1) {
      s.addShape("line", {
        x: rX + 0.4, y: ey + evRowH, w: rW - 0.8, h: 0,
        line: { color: C.ruleSoft, width: 0.3 },
      });
    }
  });

  addFooter(s, "SOURCE: XINHUA, CSRC, MOFCOM, SELL-SIDE SYNTHESES", "HSI · INVESTOR BRIEFING", "08");
}

// ─── Slide 9: Implications for China Markets ────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "09 · IMPLICATIONS FOR CHINA MARKETS", "CAPITAL FLOWS · COST OF EQUITY");

  s.addText("Under-investment is now structural, not cyclical.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 0.95,
    fontFace: FONT_HEADER, fontSize: 42, color: C.ink, margin: 0,
  });

  const cols = [
    { rom: "i.",   head: "Foreign allocation has reset lower.",
      body: "Global EM benchmarks have steadily reduced China exposure. Several US allocators now run dedicated \"EM ex-China\" mandates — a structural, not tactical, reweighting." },
    { rom: "ii.",  head: "Cost of equity sits ~200 bps higher.",
      body: "Investors price an enduring policy-risk premium. The same earnings stream is capitalised at a lower multiple than its developed-market analogue." },
    { rom: "iii.", head: "Capital return is the new compact.",
      body: "With reinvestment opportunities constrained, leading constituents have pivoted to dividends and buybacks. Yield, not growth, is doing the work." },
  ];
  const colsTop = 3.4;
  const colW = (W - 2 * MARGIN_X - 1.2) / 3;
  cols.forEach((c, i) => {
    const x = MARGIN_X + i * (colW + 0.6);
    s.addText(c.rom, {
      x: x, y: colsTop, w: colW, h: 1.4,
      fontFace: FONT_HEADER, fontSize: 64, italic: true, color: C.accent, margin: 0,
    });
    s.addText(c.head, {
      x: x, y: colsTop + 1.6, w: colW, h: 0.5,
      fontFace: FONT_BODY, fontSize: 18, color: C.ink, margin: 0,
    });
    s.addText(c.body, {
      x: x, y: colsTop + 2.15, w: colW, h: 2.4,
      fontFace: FONT_BODY, fontSize: 14, color: C.inkSoft, margin: 0,
    });
  });

  // Net effect dark band
  const ney = 7.7, neh = 1.85;
  s.addShape("rect", {
    x: MARGIN_X, y: ney, w: W - 2 * MARGIN_X, h: neh,
    fill: { color: C.ink }, line: { color: C.ink, width: 0 },
  });
  s.addText("NET EFFECT", {
    x: MARGIN_X + 0.5, y: ney + 0.2, w: 8, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accentSub,
    charSpacing: 5, margin: 0,
  });
  s.addText(
    "Hong Kong's market has become a value-and-yield trade on Chinese national champions — re-rating depends on policy signal, not earnings alone.",
    {
      x: MARGIN_X + 0.5, y: ney + 0.65, w: W - 2 * MARGIN_X - 1.0, h: 1.1,
      fontFace: FONT_BODY, fontSize: 22, color: "FFFFFF", margin: 0,
    }
  );

  addFooter(s, "SOURCE: EPFR FUND FLOWS, MSCI WEIGHTS, CSRC COMMENTARY", "HSI · INVESTOR BRIEFING", "09");
}

// ─── Slide 10: Investment Thesis ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  addBackground(s);
  addHeader(s, "10 · INVESTMENT THESIS", "CLOSING VIEW");

  s.addText("Cheap, catalysed by policy — held back by policy.", {
    x: MARGIN_X, y: 1.45, w: 18, h: 1.05,
    fontFace: FONT_HEADER, fontSize: 40, color: C.ink, margin: 0,
  });

  // Two columns: Bull / Bear
  const colTop = 2.85;
  const totalW = W - 2 * MARGIN_X;
  const colWidth = (totalW - 0.6) / 2;
  const lX = MARGIN_X;
  const rX = MARGIN_X + colWidth + 0.6;

  s.addText("THE BULL CASE", {
    x: lX, y: colTop, w: colWidth, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.bull,
    charSpacing: 5, margin: 0,
  });
  s.addShape("line", {
    x: lX, y: colTop + 0.5, w: colWidth, h: 0,
    line: { color: C.bull, width: 0.6 },
  });

  s.addText("THE BEAR CASE", {
    x: rX, y: colTop, w: colWidth, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addShape("line", {
    x: rX, y: colTop + 0.5, w: colWidth, h: 0,
    line: { color: C.accent, width: 0.6 },
  });

  const bull = [
    "Trailing P/E of 12.4× — half the S&P 500 multiple.",
    "HSBC-led financials offer ~7% dividend yields with strong CET1.",
    "Tencent & Alibaba running multi-year buyback programs.",
    "Targeted easing and AI capex provide a domestic growth lever.",
  ];
  const bear = [
    "Common Prosperity caps profit pools in platforms, fintech, property.",
    "EM ex-China mandates have permanently shrunk the buyer base.",
    "Property deleveraging continues to drag household consumption.",
    "US–China tech & tariff frictions keep the risk premium elevated.",
  ];
  const itemH = 0.85;
  const itemsTop = colTop + 0.85;

  bull.forEach((t, i) => {
    const y = itemsTop + i * itemH;
    s.addText("+", {
      x: lX, y: y, w: 0.4, h: itemH,
      fontFace: FONT_BODY, fontSize: 18, color: C.bull, valign: "top", margin: 0,
    });
    s.addText(t, {
      x: lX + 0.35, y: y, w: colWidth - 0.4, h: itemH,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft, valign: "top", margin: 0,
    });
    if (i < bull.length - 1) {
      s.addShape("line", {
        x: lX, y: y + itemH - 0.05, w: colWidth, h: 0,
        line: { color: C.ruleSoft, width: 0.3 },
      });
    }
  });
  bear.forEach((t, i) => {
    const y = itemsTop + i * itemH;
    s.addText("−", {
      x: rX, y: y, w: 0.4, h: itemH,
      fontFace: FONT_BODY, fontSize: 18, color: C.accent, valign: "top", margin: 0,
    });
    s.addText(t, {
      x: rX + 0.35, y: y, w: colWidth - 0.4, h: itemH,
      fontFace: FONT_BODY, fontSize: 16, color: C.inkSoft, valign: "top", margin: 0,
    });
    if (i < bear.length - 1) {
      s.addShape("line", {
        x: rX, y: y + itemH - 0.05, w: colWidth, h: 0,
        line: { color: C.ruleSoft, width: 0.3 },
      });
    }
  });

  // Bottom line
  const bY = itemsTop + 4 * itemH + 0.45;
  s.addShape("line", {
    x: MARGIN_X, y: bY, w: W - 2 * MARGIN_X, h: 0,
    line: { color: C.ink, width: 0.5 },
  });
  s.addText("BOTTOM LINE", {
    x: MARGIN_X, y: bY + 0.2, w: 8, h: 0.45,
    fontFace: FONT_BODY, fontSize: 14, color: C.accent,
    charSpacing: 5, margin: 0,
  });
  s.addText(
    "Position for income and selective re-rating, not beta. Size for a market where policy — not earnings — sets the multiple.",
    {
      x: MARGIN_X, y: bY + 0.7, w: 12, h: 1.4,
      fontFace: FONT_HEADER, fontSize: 22, color: C.ink, margin: 0,
    }
  );
  s.addText("END · 10 / 10", {
    x: W - MARGIN_X - 4, y: bY + 1.05, w: 4, h: 0.5,
    fontFace: FONT_BODY, fontSize: 14, color: C.muted,
    align: "right", margin: 0,
  });

  addFooter(s, "FOR INSTITUTIONAL DISCUSSION ONLY · NOT INVESTMENT ADVICE", "HSI · INVESTOR BRIEFING", "10");
}

// ─── Write file ──────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "Hang_Seng_Index.pptx" })
  .then((fname) => console.log("Wrote " + fname))
  .catch((err) => { console.error(err); process.exit(1); });
