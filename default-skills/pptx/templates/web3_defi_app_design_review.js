// Replica of defi.pptx — Zipped App Design Review
// Build: node defi.js  →  defi_replica.pptx
//
// Canvas: 20" x 11.25" (matches source 18288000 x 10287000 EMU, 16:9 widescreen)

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.defineLayout({ name: "ZIPPED_WIDE", width: 20, height: 11.25 });
pres.layout = "ZIPPED_WIDE";
pres.author = "Zipped";
pres.title = "Zipped — App Design Review";

// ----- Palette -----
const BG       = "0A0A0F";
const SURFACE  = "12121A";
const SURFACE2 = "16161F";
const BORDER   = "24242E";
const BORDER2  = "2A2A36";
const MUTED    = "6B6B7B";
const MUTED2   = "8A8A9A";
const TEXT     = "F5F5F0";
const ACCENT   = "7C5CFF";
const ACCENT_D = "272359";       // muted dark navy-purple (big circle on slide 1)
const SUCCESS  = "00E5B0";

const SERIF = "Cambria";
const MONO  = "Consolas";

// ----- Helpers -----
// Header (top mono labels) + page counter — used on slides 2..9
function addHeader(slide, sectionNum, sectionName, pageNum) {
  slide.addText(`${sectionNum} / ${sectionName}`, {
    x: 0.7, y: 0.35, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 2, margin: 0,
  });
  slide.addText(`${pageNum} — 09`, {
    x: 11.3, y: 0.35, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 2, align: "right", margin: 0,
  });
}

// Section eyebrow with purple bullet dot (used on content slides)
function addEyebrow(slide, text, y = 1.35) {
  slide.addShape(pres.shapes.OVAL, {
    x: 0.72, y: y + 0.11, w: 0.11, h: 0.11,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  slide.addText(text, {
    x: 0.95, y: y, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 12, color: ACCENT, charSpacing: 2, bold: false, margin: 0,
  });
}

// Serif page title
function addTitle(slide, text, y = 2.1, w = 18, h = 0.9, fontSize = 40) {
  slide.addText(text, {
    x: 0.7, y, w, h,
    fontFace: SERIF, fontSize, color: TEXT, margin: 0,
  });
}

// ========================================================================
// SLIDE 1 — TITLE
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Top mono labels
  s.addText("ZIPPED // INTERNAL", {
    x: 0.7, y: 0.7, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 13, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("ETH MAINNET — V0.1", {
    x: 11.3, y: 0.7, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 13, color: MUTED, charSpacing: 3, align: "right", margin: 0,
  });

  // Big dark purple circle (right side)
  s.addShape(pres.shapes.OVAL, {
    x: 10.6, y: 1.2, w: 8.6, h: 8.6,
    fill: { color: ACCENT_D }, line: { color: ACCENT_D, width: 0 },
  });

  // Camera-reticle crop-marks logo (four L-shaped corners + small accent square)
  // Positioned at roughly x=1.0, y=5.35, 1.2" square
  const lx = 1.0, ly = 5.35, lsize = 1.0, stroke = 0.04, armLen = 0.25;
  // top-left
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  // top-right
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - armLen, y: ly, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - stroke, y: ly, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  // bottom-left
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + lsize - armLen, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + lsize - stroke, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  // bottom-right
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - armLen, y: ly + lsize - stroke, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - stroke, y: ly + lsize - armLen, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  // accent dot in center
  s.addShape(pres.shapes.RECTANGLE, {
    x: lx + lsize / 2 - 0.06, y: ly + lsize / 2 - 0.06, w: 0.12, h: 0.12,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });

  // "Zipped" big serif
  s.addText("Zipped", {
    x: 0.7, y: 6.85, w: 10, h: 1.7,
    fontFace: SERIF, fontSize: 110, color: TEXT, bold: false, margin: 0,
  });

  // Italic subtitle
  s.addText("A private lending protocol for Ethereum, shielded by zero-knowledge proofs.", {
    x: 0.7, y: 8.85, w: 9.5, h: 1.1,
    fontFace: SERIF, fontSize: 24, color: TEXT, italic: true, margin: 0,
  });

  // Bottom mono labels
  s.addText("APP DESIGN REVIEW", {
    x: 0.7, y: 10.35, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("ENG + DESIGN", {
    x: 11.3, y: 10.35, w: 8, h: 0.4,
    fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, align: "right", margin: 0,
  });
}

// ========================================================================
// SLIDE 2 — OVERVIEW (three columns)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "01", "OVERVIEW", "01");
  addEyebrow(s, "WHAT WE'RE BUILDING", 1.5);
  addTitle(s, "Lending and borrowing, without showing your hand.", 2.2, 18, 1.1, 44);

  const colY = 4.2;
  const cols = [
    {
      num: "01",
      title: "Private positions",
      body: "Deposits, collateral, and debt stay encrypted on-chain. Proofs confirm solvency without revealing balances.",
    },
    {
      num: "02",
      title: "Ethereum native",
      body: "Deployed to mainnet. Any ERC-20. RainbowKit for wallets users already have.",
    },
    {
      num: "03",
      title: "One-tap UX",
      body: "Proof generation happens client-side, in the background. Users see a familiar deposit/withdraw flow.",
    },
  ];
  const colW = 5.6, colGap = 0.4, startX = 0.7;
  cols.forEach((c, i) => {
    const x = startX + i * (colW + colGap);
    s.addText(c.num, {
      x, y: colY, w: colW, h: 0.7,
      fontFace: MONO, fontSize: 34, color: ACCENT, bold: false, margin: 0,
    });
    s.addText(c.title, {
      x, y: colY + 0.8, w: colW, h: 0.55,
      fontFace: SERIF, fontSize: 22, color: TEXT, margin: 0,
    });
    s.addText(c.body, {
      x, y: colY + 1.45, w: colW, h: 1.8,
      fontFace: SERIF, fontSize: 15, color: TEXT, margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 3 — CONNECT WALLET (left text + wallet modal on right)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "02", "ONBOARDING", "02");
  addEyebrow(s, "CONNECT WALLET", 1.5);
  addTitle(s, "Any wallet users already trust.", 2.2, 12, 0.9, 40);

  // Left side: STACK / FIRST-RUN DECISION
  s.addText("STACK", {
    x: 0.7, y: 4.8, w: 7, h: 0.4,
    fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("RainbowKit + wagmi for the modal, viem for transaction signing.", {
    x: 0.7, y: 5.25, w: 7, h: 1.1,
    fontFace: SERIF, fontSize: 22, color: TEXT, margin: 0,
  });
  // divider
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 6.55, w: 4, h: 0,
    line: { color: BORDER, width: 1 },
  });

  s.addText("FIRST-RUN DECISION", {
    x: 0.7, y: 6.9, w: 7, h: 0.4,
    fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, margin: 0,
  });
  s.addText("\"Connect wallet\" is the only gate — no email, no KYC, no pre-account setup.", {
    x: 0.7, y: 7.35, w: 7, h: 1.6,
    fontFace: SERIF, fontSize: 22, color: TEXT, italic: true, margin: 0,
  });

  // -------- Wallet Modal on the right --------
  const mx = 10.8, my = 3.8, mw = 4.6, mh = 6.4;
  // card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: mx, y: my, w: mw, h: mh, rectRadius: 0.14,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  // modal title + close
  s.addText("Connect a wallet", {
    x: mx + 0.3, y: my + 0.25, w: 3.2, h: 0.4,
    fontFace: "Calibri", fontSize: 16, color: TEXT, bold: true, margin: 0,
  });
  s.addText("×", {
    x: mx + mw - 0.55, y: my + 0.15, w: 0.4, h: 0.4,
    fontFace: "Calibri", fontSize: 20, color: MUTED, align: "right", margin: 0,
  });

  // POPULAR section
  s.addText("POPULAR", {
    x: mx + 0.3, y: my + 0.8, w: 2, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });

  // Wallet row helper
  function walletRow(idx, letter, letterColor, bgColor, name, desc, badge) {
    const rowY = my + 1.15 + idx * 0.72;
    const rowH = 0.6;
    // hover bg
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.2, y: rowY, w: mw - 0.4, h: rowH, rectRadius: 0.06,
      fill: { color: SURFACE2 }, line: { color: SURFACE2, width: 0 },
    });
    // icon square
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.35, y: rowY + 0.1, w: 0.4, h: 0.4, rectRadius: 0.06,
      fill: { color: bgColor }, line: { color: bgColor, width: 0 },
    });
    s.addText(letter, {
      x: mx + 0.35, y: rowY + 0.1, w: 0.4, h: 0.4,
      fontFace: "Calibri", fontSize: 13, color: letterColor, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // name
    s.addText(name, {
      x: mx + 0.9, y: rowY + 0.06, w: 2.4, h: 0.3,
      fontFace: "Calibri", fontSize: 13, color: TEXT, bold: true, margin: 0,
    });
    // desc
    s.addText(desc, {
      x: mx + 0.9, y: rowY + 0.32, w: 2.4, h: 0.28,
      fontFace: "Calibri", fontSize: 10, color: MUTED, margin: 0,
    });
    // optional badge
    if (badge) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: mx + mw - 1.1, y: rowY + 0.17, w: 0.85, h: 0.26, rectRadius: 0.04,
        fill: { color: SURFACE2 }, line: { color: ACCENT, width: 1 },
      });
      s.addText(badge, {
        x: mx + mw - 1.1, y: rowY + 0.17, w: 0.85, h: 0.26,
        fontFace: MONO, fontSize: 8, color: ACCENT, align: "center", valign: "middle", charSpacing: 1, margin: 0,
      });
    }
  }
  walletRow(0, "M", "FFFFFF", "F6851B", "MetaMask",      "Browser extension",  "INSTALLED");
  walletRow(1, "R", "FFFFFF", "E84142", "Rainbow",       "The fun, simple wallet");
  walletRow(2, "C", "FFFFFF", "2151F5", "Coinbase Wallet", "coinbase.com");
  walletRow(3, "W", "FFFFFF", "3B99FC", "WalletConnect", "Scan with any wallet");

  // MORE section
  s.addText("MORE", {
    x: mx + 0.3, y: my + 4.35, w: 2, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  // Ledger row (placed explicitly below MORE label)
  {
    const rowY = my + 4.72, rowH = 0.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.2, y: rowY, w: mw - 0.4, h: rowH, rectRadius: 0.06,
      fill: { color: SURFACE2 }, line: { color: SURFACE2, width: 0 },
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: mx + 0.35, y: rowY + 0.1, w: 0.4, h: 0.4, rectRadius: 0.06,
      fill: { color: "000000" }, line: { color: BORDER, width: 1 },
    });
    s.addText("L", {
      x: mx + 0.35, y: rowY + 0.1, w: 0.4, h: 0.4,
      fontFace: "Calibri", fontSize: 13, color: "FFFFFF", bold: true, align: "center", valign: "middle", margin: 0,
    });
    s.addText("Ledger", {
      x: mx + 0.9, y: rowY + 0.06, w: 2.4, h: 0.3,
      fontFace: "Calibri", fontSize: 13, color: TEXT, bold: true, margin: 0,
    });
    s.addText("Hardware wallet", {
      x: mx + 0.9, y: rowY + 0.32, w: 2.4, h: 0.28,
      fontFace: "Calibri", fontSize: 10, color: MUTED, margin: 0,
    });
  }

  // footer link
  s.addText([
    { text: "New to Ethereum? ", options: { color: MUTED } },
    { text: "Learn more", options: { color: ACCENT } },
  ], {
    x: mx, y: my + mh - 0.55, w: mw, h: 0.4,
    fontFace: "Calibri", fontSize: 11, align: "center", margin: 0,
  });
}

// ========================================================================
// SLIDE 4 — FIRST-RUN INTRO (three cards)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "03", "ONBOARDING", "03");
  addEyebrow(s, "FIRST-RUN INTRO", 1.5);
  addTitle(s, "Three screens before the dashboard.", 2.2, 18, 0.9, 40);

  const cards = [
    { step: "STEP 01 / 3", title: "What is Zipped?",          body: "Explain shielded lending in two sentences. One illustration, one CTA.",                 current: true },
    { step: "STEP 02 / 3", title: "Generate shielded keys",   body: "Derived from the wallet signature. No seed to manage. Stored in IndexedDB, encrypted at rest." },
    { step: "STEP 03 / 3", title: "Fund to continue",         body: "Route to the deposit flow. New users skip straight into their first deposit." },
  ];

  const cardY = 4.2, cardW = 5.9, cardH = 5.6, gap = 0.35;
  cards.forEach((c, i) => {
    const x = 0.7 + i * (cardW + gap);
    // card bg
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH, rectRadius: 0.1,
      fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
    });
    // step label
    s.addText(c.step, {
      x: x + 0.45, y: cardY + 0.45, w: cardW - 0.9, h: 0.4,
      fontFace: MONO, fontSize: 13, color: i === 0 ? ACCENT : MUTED, charSpacing: 2, margin: 0,
    });
    // title
    s.addText(c.title, {
      x: x + 0.45, y: cardY + 1.0, w: cardW - 0.9, h: 0.6,
      fontFace: SERIF, fontSize: 24, color: TEXT, margin: 0,
    });
    // body
    s.addText(c.body, {
      x: x + 0.45, y: cardY + 1.75, w: cardW - 0.9, h: 1.6,
      fontFace: SERIF, fontSize: 15, color: TEXT, margin: 0,
    });
    // footer marker for current card
    if (c.current) {
      s.addText("// CURRENT", {
        x: x + 0.45, y: cardY + cardH - 0.7, w: cardW - 0.9, h: 0.4,
        fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 2, margin: 0,
      });
    }
  });

  // Pagination dots (filled, open, open)
  const dotY = 10.2, cx = 10, dotR = 0.1, dotGap = 0.35;
  s.addShape(pres.shapes.OVAL, { x: cx - dotGap - dotR, y: dotY, w: 0.2, h: 0.2, fill: { color: ACCENT }, line: { color: ACCENT, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: cx - dotR, y: dotY, w: 0.2, h: 0.2, fill: { color: BG }, line: { color: MUTED, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: cx + dotGap - dotR, y: dotY, w: 0.2, h: 0.2, fill: { color: BG }, line: { color: MUTED, width: 1 } });
}

// ========================================================================
// SLIDE 5 — DEPOSIT FLOW (desktop mockup + mobile mockup)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "04", "DEPOSIT", "04");
  addEyebrow(s, "DEPOSIT FLOW", 1.5);
  addTitle(s, "Pick asset, pick amount, sign once.", 2.2, 18, 0.9, 40);

  // ---------- Desktop browser mockup ----------
  const dx = 1.9, dy = 3.85, dw = 12.0, dh = 7.1;
  // chrome frame
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx, y: dy, w: dw, h: dh, rectRadius: 0.12,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  // traffic lights
  s.addShape(pres.shapes.OVAL, { x: dx + 0.25, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: dx + 0.47, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: dx + 0.69, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  // url bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx + 1.05, y: dy + 0.15, w: dw - 1.25, h: 0.35, rectRadius: 0.05,
    fill: { color: BG }, line: { color: BORDER, width: 1 },
  });
  s.addText("app.zipped.finance/deposit", {
    x: dx + 1.2, y: dy + 0.15, w: dw - 1.5, h: 0.35,
    fontFace: MONO, fontSize: 10, color: MUTED, valign: "middle", margin: 0,
  });
  // sidebar separator
  const sbW = 2.4;
  s.addShape(pres.shapes.LINE, {
    x: dx + sbW, y: dy + 0.7, w: 0, h: dh - 0.7,
    line: { color: BORDER, width: 1 },
  });
  // ZIPPED brand
  s.addText("ZIPPED", {
    x: dx + 0.3, y: dy + 1.1, w: 2, h: 0.4,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 3, margin: 0,
  });
  // nav items
  const navItems = ["Dashboard", "Deposit", "Withdraw", "Activity", "Settings"];
  navItems.forEach((item, i) => {
    const ny = dy + 1.85 + i * 0.45;
    if (item === "Deposit") {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: dx + 0.2, y: ny - 0.05, w: sbW - 0.4, h: 0.38, rectRadius: 0.04,
        fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
      });
    }
    s.addText(item, {
      x: dx + 0.4, y: ny, w: sbW - 0.4, h: 0.3,
      fontFace: "Calibri", fontSize: 13, color: item === "Deposit" ? TEXT : MUTED2, margin: 0,
    });
  });

  // ----- Right pane content -----
  const rx = dx + sbW + 0.4;
  const rw = dw - sbW - 0.6;
  // Deposit heading
  s.addText("Deposit", {
    x: rx, y: dy + 0.95, w: 3, h: 0.5,
    fontFace: SERIF, fontSize: 22, color: TEXT, margin: 0,
  });
  // wallet chip (top-right)
  s.addShape(pres.shapes.OVAL, { x: dx + dw - 1.9, y: dy + 1.07, w: 0.16, h: 0.16, fill: { color: SUCCESS }, line: { color: SUCCESS, width: 0 } });
  s.addText("0x4f2a...9d3c", {
    x: dx + dw - 1.7, y: dy + 1.0, w: 1.6, h: 0.3,
    fontFace: MONO, fontSize: 11, color: MUTED, margin: 0,
  });

  // ASSET label
  s.addText("ASSET", {
    x: rx, y: dy + 1.75, w: 2, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  // asset pills
  const pills = ["ETH", "USDC", "DAI", "WBTC"];
  pills.forEach((p, i) => {
    const px = rx + i * 0.85;
    const active = p === "ETH";
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: dy + 2.15, w: 0.75, h: 0.42, rectRadius: 0.05,
      fill: { color: active ? SURFACE2 : SURFACE }, line: { color: active ? ACCENT : BORDER, width: 1 },
    });
    s.addText(p, {
      x: px, y: dy + 2.15, w: 0.75, h: 0.42,
      fontFace: MONO, fontSize: 11, color: TEXT, align: "center", valign: "middle", margin: 0,
    });
  });

  // AMOUNT label
  s.addText("AMOUNT", {
    x: rx, y: dy + 2.9, w: 2, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  // big amount
  s.addText([
    { text: "2.50", options: { fontSize: 42, color: TEXT } },
    { text: "  ETH", options: { fontSize: 22, color: MUTED } },
  ], {
    x: rx, y: dy + 3.3, w: 4, h: 0.85,
    fontFace: SERIF, margin: 0,
  });
  // ≈ $ value (right side of row)
  s.addText("≈ $8,427.50", {
    x: dx + dw - 2.2, y: dy + 3.55, w: 2, h: 0.4,
    fontFace: "Calibri", fontSize: 13, color: MUTED, align: "right", margin: 0,
  });
  // Balance + pills
  s.addText("Balance: 4.812 ETH", {
    x: rx, y: dy + 4.3, w: 3, h: 0.3,
    fontFace: MONO, fontSize: 11, color: MUTED, margin: 0,
  });
  ["25%", "50%", "MAX"].forEach((p, i) => {
    const px = dx + dw - 1.9 + i * 0.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: dy + 4.24, w: 0.5, h: 0.34, rectRadius: 0.04,
      fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
    });
    s.addText(p, {
      x: px, y: dy + 4.24, w: 0.5, h: 0.34,
      fontFace: MONO, fontSize: 9, color: MUTED2, align: "center", valign: "middle", margin: 0,
    });
  });

  // Summary panel
  const sumY = dy + 4.95, sumH = 1.1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: sumY, w: rw - 0.2, h: sumH, rectRadius: 0.06,
    fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
  });
  // three rows
  const rows = [
    ["Network fee (est.)",  "0.0021 ETH"],
    ["Proof generation",    "~4s, client-side"],
    ["Shielded balance after", "+2.50 ETH"],
  ];
  rows.forEach((r, i) => {
    s.addText(r[0], {
      x: rx + 0.2, y: sumY + 0.1 + i * 0.28, w: 4, h: 0.28,
      fontFace: "Calibri", fontSize: 11, color: MUTED2, margin: 0,
    });
    s.addText(r[1], {
      x: dx + dw - 3.4, y: sumY + 0.1 + i * 0.28, w: 3, h: 0.28,
      fontFace: MONO, fontSize: 11, color: TEXT, align: "right", margin: 0,
    });
  });

  // CTA button
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: dy + 6.35, w: rw - 0.2, h: 0.55, rectRadius: 0.08,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  s.addText("Generate proof & deposit", {
    x: rx, y: dy + 6.35, w: rw - 0.2, h: 0.55,
    fontFace: "Calibri", fontSize: 14, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // ---------- Phone mockup (right side) ----------
  const px = 14.4, py = 3.95, pw = 3.4, ph = 6.7;
  // phone frame
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px, y: py, w: pw, h: ph, rectRadius: 0.4,
    fill: { color: SURFACE }, line: { color: BORDER, width: 2 },
  });
  // speaker bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + pw / 2 - 0.5, y: py + 0.12, w: 1.0, h: 0.12, rectRadius: 0.06,
    fill: { color: BG }, line: { color: BG, width: 0 },
  });
  // back arrow + Deposit title
  s.addText("‹", {
    x: px + 0.25, y: py + 0.55, w: 0.3, h: 0.4,
    fontFace: "Calibri", fontSize: 22, color: MUTED, margin: 0,
  });
  s.addText("Deposit", {
    x: px, y: py + 0.55, w: pw, h: 0.4,
    fontFace: SERIF, fontSize: 18, color: TEXT, align: "center", margin: 0,
  });

  // ASSET panel
  const pPadX = 0.25;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + pPadX, y: py + 1.25, w: pw - 2 * pPadX, h: 1.05, rectRadius: 0.08,
    fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
  });
  s.addText("ASSET", {
    x: px + pPadX + 0.2, y: py + 1.35, w: 2, h: 0.25,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  // mini pills
  ["ETH", "USDC", "DAI"].forEach((p, i) => {
    const bx = px + pPadX + 0.2 + i * 0.92;
    const active = i === 0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx, y: py + 1.7, w: 0.82, h: 0.4, rectRadius: 0.05,
      fill: { color: active ? SURFACE : SURFACE2 }, line: { color: active ? ACCENT : BORDER, width: 1 },
    });
    s.addText(p, {
      x: bx, y: py + 1.7, w: 0.82, h: 0.4,
      fontFace: MONO, fontSize: 9, color: TEXT, align: "center", valign: "middle", margin: 0,
    });
  });

  // AMOUNT panel
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + pPadX, y: py + 2.5, w: pw - 2 * pPadX, h: 1.3, rectRadius: 0.08,
    fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
  });
  s.addText("AMOUNT", {
    x: px + pPadX + 0.2, y: py + 2.6, w: 2, h: 0.25,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText("2.50", {
    x: px + pPadX + 0.2, y: py + 2.9, w: 2, h: 0.6,
    fontFace: SERIF, fontSize: 30, color: TEXT, margin: 0,
  });
  s.addText("≈ $8,427.50", {
    x: px + pPadX + 0.2, y: py + 3.5, w: 2, h: 0.25,
    fontFace: "Calibri", fontSize: 9, color: MUTED, margin: 0,
  });

  // fee + proof rows
  s.addText("Fee", {
    x: px + pPadX + 0.2, y: py + 3.95, w: 1, h: 0.25,
    fontFace: "Calibri", fontSize: 9, color: MUTED2, margin: 0,
  });
  s.addText("0.0021 ETH", {
    x: px + pw - pPadX - 1.4, y: py + 3.95, w: 1.2, h: 0.25,
    fontFace: MONO, fontSize: 9, color: TEXT, align: "right", margin: 0,
  });
  s.addText("Proof", {
    x: px + pPadX + 0.2, y: py + 4.2, w: 1, h: 0.25,
    fontFace: "Calibri", fontSize: 9, color: MUTED2, margin: 0,
  });
  s.addText("~4s local", {
    x: px + pw - pPadX - 1.4, y: py + 4.2, w: 1.2, h: 0.25,
    fontFace: MONO, fontSize: 9, color: TEXT, align: "right", margin: 0,
  });

  // mobile CTA (at bottom outside screen)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: px + 0.2, y: py + ph + 0.15, w: pw - 0.4, h: 0.5, rectRadius: 0.08,
    fill: { color: SURFACE }, line: { color: ACCENT, width: 1 },
  });
  s.addText("Generate proof & deposit", {
    x: px + 0.2, y: py + ph + 0.15, w: pw - 0.4, h: 0.5,
    fontFace: "Calibri", fontSize: 11, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 6 — WITHDRAW FLOW (three panels)
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "05", "WITHDRAW", "05");
  addEyebrow(s, "WITHDRAW FLOW", 1.5);
  addTitle(s, "The proof is the product — made invisible.", 2.2, 18, 0.9, 40);

  // descriptive subtitle
  s.addText("Users compose a withdrawal like any transfer. Proof generation runs locally in a worker and reports progress. They never see a circuit.", {
    x: 0.7, y: 3.2, w: 15, h: 0.8,
    fontFace: SERIF, fontSize: 16, color: TEXT, margin: 0,
  });

  // Three panels + two arrows
  const pY = 4.5, pW = 5.7, pH = 5.5, pGap = 0.6;
  const startX = 0.9;

  function drawBrowserShell(x, y, w, h) {
    // frame
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: 0.1,
      fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
    });
    // traffic lights
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.34, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.50, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
    // url bar
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.75, y: y + 0.12, w: w - 0.9, h: 0.28, rectRadius: 0.04,
      fill: { color: BG }, line: { color: BORDER, width: 1 },
    });
    s.addText("app.zipped.finance/withdraw", {
      x: x + 0.85, y: y + 0.12, w: w - 1.1, h: 0.28,
      fontFace: MONO, fontSize: 8, color: MUTED, valign: "middle", margin: 0,
    });
    // sidebar
    const sbW = 1.15;
    s.addShape(pres.shapes.LINE, { x: x + sbW, y: y + 0.55, w: 0, h: h - 0.55, line: { color: BORDER, width: 1 } });
    s.addText("ZIPPED", {
      x: x + 0.2, y: y + 0.75, w: sbW - 0.2, h: 0.3,
      fontFace: MONO, fontSize: 8, color: MUTED, charSpacing: 2, margin: 0,
    });
    const items = ["Dashboard", "Deposit", "Withdraw", "Activity", "Settings"];
    items.forEach((it, i) => {
      const ny = y + 1.2 + i * 0.33;
      if (it === "Withdraw") {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x: x + 0.12, y: ny - 0.03, w: sbW - 0.2, h: 0.3, rectRadius: 0.03,
          fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
        });
      }
      s.addText(it, {
        x: x + 0.22, y: ny, w: sbW - 0.2, h: 0.25,
        fontFace: "Calibri", fontSize: 9, color: it === "Withdraw" ? TEXT : MUTED2, margin: 0,
      });
    });
    return { contentX: x + sbW + 0.2, contentY: y + 0.7, contentW: w - sbW - 0.4 };
  }

  // Panel 1: Compose
  {
    const x = startX, y = pY;
    const { contentX, contentY, contentW } = drawBrowserShell(x, y, pW, pH);
    s.addText("Withdraw", {
      x: contentX, y: contentY + 0.25, w: contentW, h: 0.45,
      fontFace: SERIF, fontSize: 16, color: TEXT, margin: 0,
    });
    // shielded balance card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: contentX, y: contentY + 0.9, w: contentW, h: 1.15, rectRadius: 0.06,
      fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
    });
    s.addText("FROM SHIELDED BALANCE", {
      x: contentX + 0.15, y: contentY + 1.0, w: contentW - 0.3, h: 0.25,
      fontFace: MONO, fontSize: 8, color: MUTED, charSpacing: 2, margin: 0,
    });
    s.addText("1,200.00 USDC", {
      x: contentX + 0.15, y: contentY + 1.25, w: contentW - 0.3, h: 0.45,
      fontFace: SERIF, fontSize: 20, color: TEXT, margin: 0,
    });
    s.addText("Available: 3,481.09 USDC", {
      x: contentX + 0.15, y: contentY + 1.7, w: contentW - 0.3, h: 0.28,
      fontFace: MONO, fontSize: 9, color: MUTED, margin: 0,
    });
    // recipient card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: contentX, y: contentY + 2.25, w: contentW, h: 0.95, rectRadius: 0.06,
      fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
    });
    s.addText("RECIPIENT", {
      x: contentX + 0.15, y: contentY + 2.35, w: contentW - 0.3, h: 0.25,
      fontFace: MONO, fontSize: 8, color: MUTED, charSpacing: 2, margin: 0,
    });
    s.addText("0x8a2f...e91b", {
      x: contentX + 0.15, y: contentY + 2.6, w: contentW - 0.3, h: 0.3,
      fontFace: MONO, fontSize: 12, color: TEXT, margin: 0,
    });
    s.addText("Connected wallet · change", {
      x: contentX + 0.15, y: contentY + 2.9, w: contentW - 0.3, h: 0.25,
      fontFace: "Calibri", fontSize: 9, color: MUTED, margin: 0,
    });

    // Buttons row
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: contentX, y: contentY + 4.0, w: 1.6, h: 0.45, rectRadius: 0.06,
      fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
    });
    s.addText("Cancel", {
      x: contentX, y: contentY + 4.0, w: 1.6, h: 0.45,
      fontFace: "Calibri", fontSize: 11, color: MUTED2, align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: contentX + contentW - 1.9, y: contentY + 4.0, w: 1.9, h: 0.45, rectRadius: 0.06,
      fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
    });
    s.addText("Withdraw", {
      x: contentX + contentW - 1.9, y: contentY + 4.0, w: 1.9, h: 0.45,
      fontFace: "Calibri", fontSize: 11, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
    });
  }

  // Arrow 1
  s.addText("→", {
    x: startX + pW, y: pY + pH / 2 - 0.25, w: pGap, h: 0.5,
    fontFace: "Calibri", fontSize: 22, color: MUTED, align: "center", valign: "middle", margin: 0,
  });

  // Panel 2: Prove
  {
    const x = startX + pW + pGap, y = pY;
    const { contentX, contentY, contentW } = drawBrowserShell(x, y, pW, pH);
    s.addText("Withdraw", {
      x: contentX, y: contentY + 0.25, w: contentW, h: 0.45,
      fontFace: SERIF, fontSize: 16, color: TEXT, margin: 0,
    });
    // ZK circle
    const cxC = contentX + contentW / 2 - 0.9, cyC = contentY + 1.3;
    // outer ring
    s.addShape(pres.shapes.OVAL, {
      x: cxC, y: cyC, w: 1.8, h: 1.8,
      fill: { color: SURFACE2 }, line: { color: ACCENT, width: 2 },
    });
    // inner ring (slightly inset for the "progressing" look)
    s.addShape(pres.shapes.OVAL, {
      x: cxC + 0.25, y: cyC + 0.25, w: 1.3, h: 1.3,
      fill: { color: SURFACE }, line: { color: ACCENT, width: 1, dashType: "dash" },
    });
    // ZK text
    s.addText("ZK", {
      x: cxC, y: cyC, w: 1.8, h: 1.8,
      fontFace: MONO, fontSize: 16, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // "Generating proof..." label
    s.addText("Generating proof...", {
      x: contentX, y: contentY + 3.35, w: contentW, h: 0.4,
      fontFace: SERIF, fontSize: 14, color: TEXT, align: "center", margin: 0,
    });
    // progress line
    s.addShape(pres.shapes.LINE, {
      x: contentX + 0.6, y: contentY + 3.85, w: contentW - 1.2, h: 0,
      line: { color: ACCENT, width: 2 },
    });
    // console-style progress list
    s.addText([
      { text: "witness.compile() ✓", options: { breakLine: true } },
      { text: "prover.init() ✓",     options: { breakLine: true } },
      { text: "prover.generate() … 62%" },
    ], {
      x: contentX, y: contentY + 4.0, w: contentW, h: 1.1,
      fontFace: MONO, fontSize: 10, color: MUTED2, align: "center", margin: 0,
    });
  }

  // Arrow 2
  s.addText("→", {
    x: startX + 2 * pW + pGap, y: pY + pH / 2 - 0.25, w: pGap, h: 0.5,
    fontFace: "Calibri", fontSize: 22, color: MUTED, align: "center", valign: "middle", margin: 0,
  });

  // Panel 3: Confirmed
  {
    const x = startX + 2 * (pW + pGap), y = pY;
    const { contentX, contentY, contentW } = drawBrowserShell(x, y, pW, pH);
    s.addText("Withdraw", {
      x: contentX, y: contentY + 0.25, w: contentW, h: 0.45,
      fontFace: SERIF, fontSize: 16, color: TEXT, margin: 0,
    });
    // success check (ring + check)
    const cxC = contentX + 0.15, cyC = contentY + 1.0;
    s.addShape(pres.shapes.OVAL, {
      x: cxC, y: cyC, w: 0.8, h: 0.8,
      fill: { color: SURFACE2 }, line: { color: SUCCESS, width: 2 },
    });
    s.addText("✓", {
      x: cxC, y: cyC, w: 0.8, h: 0.8,
      fontFace: "Calibri", fontSize: 22, color: SUCCESS, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText("Withdrawal confirmed", {
      x: contentX, y: contentY + 2.0, w: contentW, h: 0.45,
      fontFace: SERIF, fontSize: 18, color: TEXT, margin: 0,
    });
    // tx meta
    s.addText("tx 0x7a3c...42e1 · block 19,482,317", {
      x: contentX, y: contentY + 2.5, w: contentW, h: 0.3,
      fontFace: MONO, fontSize: 9, color: MUTED, margin: 0,
    });
    // sent card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: contentX, y: contentY + 3.1, w: contentW, h: 1.0, rectRadius: 0.06,
      fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
    });
    // left col: SENT
    s.addText("SENT", {
      x: contentX + 0.15, y: contentY + 3.2, w: 1.5, h: 0.25,
      fontFace: MONO, fontSize: 8, color: MUTED, charSpacing: 2, margin: 0,
    });
    s.addText("1,200.00 USDC", {
      x: contentX + 0.15, y: contentY + 3.45, w: contentW / 2 - 0.15, h: 0.45,
      fontFace: SERIF, fontSize: 14, color: TEXT, margin: 0,
    });
    // right col: TO
    s.addText("TO", {
      x: contentX + contentW / 2, y: contentY + 3.2, w: 1.5, h: 0.25,
      fontFace: MONO, fontSize: 8, color: MUTED, charSpacing: 2, margin: 0,
    });
    s.addText("0x8a2f...e91b", {
      x: contentX + contentW / 2, y: contentY + 3.5, w: contentW / 2 - 0.15, h: 0.35,
      fontFace: MONO, fontSize: 11, color: TEXT, margin: 0,
    });
  }

  // Step captions
  const capY = pY + pH + 0.25;
  const captions = ["01 COMPOSE", "02 PROVE (CLIENT-SIDE)", "03 CONFIRMED"];
  captions.forEach((c, i) => {
    s.addText(c, {
      x: startX + i * (pW + pGap), y: capY, w: pW, h: 0.4,
      fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, align: "center", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 7 — DASHBOARD
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "06", "DASHBOARD", "06");
  addEyebrow(s, "ACCOUNT DASHBOARD", 1.5);
  addTitle(s, "Everything users can't see on-chain, decrypted just for them.", 2.2, 17, 1.8, 40);

  // Browser shell
  const dx = 2.85, dy = 4.25, dw = 14.3, dh = 6.5;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx, y: dy, w: dw, h: dh, rectRadius: 0.12,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  // traffic lights
  s.addShape(pres.shapes.OVAL, { x: dx + 0.25, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: dx + 0.47, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: dx + 0.69, y: dy + 0.22, w: 0.16, h: 0.16, fill: { color: "3C3C48" }, line: { color: "3C3C48", width: 0 } });
  // url bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx + 1.05, y: dy + 0.15, w: dw - 1.25, h: 0.35, rectRadius: 0.05,
    fill: { color: BG }, line: { color: BORDER, width: 1 },
  });
  s.addText("app.zipped.finance/dashboard", {
    x: dx + 1.2, y: dy + 0.15, w: dw - 1.5, h: 0.35,
    fontFace: MONO, fontSize: 10, color: MUTED, valign: "middle", margin: 0,
  });
  // sidebar
  const sbW = 2.1;
  s.addShape(pres.shapes.LINE, {
    x: dx + sbW, y: dy + 0.7, w: 0, h: dh - 0.7,
    line: { color: BORDER, width: 1 },
  });
  s.addText("ZIPPED", {
    x: dx + 0.3, y: dy + 0.95, w: 2, h: 0.35,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 3, margin: 0,
  });
  const navItems = ["Dashboard", "Deposit", "Withdraw", "Activity", "Settings"];
  navItems.forEach((item, i) => {
    const ny = dy + 1.55 + i * 0.4;
    if (item === "Dashboard") {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: dx + 0.2, y: ny - 0.05, w: sbW - 0.4, h: 0.35, rectRadius: 0.04,
        fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
      });
    }
    s.addText(item, {
      x: dx + 0.4, y: ny, w: sbW - 0.4, h: 0.3,
      fontFace: "Calibri", fontSize: 12, color: item === "Dashboard" ? TEXT : MUTED2, margin: 0,
    });
  });
  // bottom of sidebar: network chip + address
  s.addShape(pres.shapes.OVAL, { x: dx + 0.3, y: dy + dh - 0.85, w: 0.13, h: 0.13, fill: { color: SUCCESS }, line: { color: SUCCESS, width: 0 } });
  s.addText("Mainnet", {
    x: dx + 0.5, y: dy + dh - 0.9, w: 1.6, h: 0.3,
    fontFace: "Calibri", fontSize: 10, color: MUTED2, margin: 0,
  });
  s.addText("0x4f2a...9d3c", {
    x: dx + 0.3, y: dy + dh - 0.55, w: 1.8, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, margin: 0,
  });

  // ----- Right pane -----
  const rx = dx + sbW + 0.4, rw = dw - sbW - 0.6;

  // SHIELDED NET WORTH label (with purple dot)
  s.addShape(pres.shapes.OVAL, { x: rx, y: dy + 1.03, w: 0.15, h: 0.15, fill: { color: BG }, line: { color: ACCENT, width: 1.5 } });
  s.addText("SHIELDED NET WORTH", {
    x: rx + 0.25, y: dy + 0.95, w: 4, h: 0.35,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  // big value
  s.addText("$42,318.04", {
    x: rx, y: dy + 1.35, w: 6, h: 0.9,
    fontFace: SERIF, fontSize: 42, color: TEXT, margin: 0,
  });
  // delta
  s.addText("+$1,284.10 (+3.1%) 24H", {
    x: rx, y: dy + 2.3, w: 4, h: 0.35,
    fontFace: MONO, fontSize: 11, color: SUCCESS, margin: 0,
  });

  // Buttons (top-right)
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx + dw - 3.7, y: dy + 1.55, w: 1.3, h: 0.45, rectRadius: 0.06,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  s.addText("Withdraw", {
    x: dx + dw - 3.7, y: dy + 1.55, w: 1.3, h: 0.45,
    fontFace: "Calibri", fontSize: 12, color: TEXT, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: dx + dw - 2.2, y: dy + 1.55, w: 1.4, h: 0.45, rectRadius: 0.06,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  s.addText("+ Deposit", {
    x: dx + dw - 2.2, y: dy + 1.55, w: 1.4, h: 0.45,
    fontFace: "Calibri", fontSize: 12, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // Line chart area (custom sparkline)
  const chartX = rx, chartY = dy + 2.9, chartW = rw - 0.3, chartH = 1.3;
  // Build a rising zigzag path using small connected line segments
  const pts = [
    [0.00, 0.85],
    [0.07, 0.78],
    [0.14, 0.82],
    [0.21, 0.70],
    [0.28, 0.74],
    [0.35, 0.60],
    [0.42, 0.66],
    [0.49, 0.52],
    [0.56, 0.58],
    [0.63, 0.42],
    [0.70, 0.48],
    [0.77, 0.32],
    [0.84, 0.38],
    [0.91, 0.22],
    [1.00, 0.15],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const ax = chartX + x1 * chartW;
    const ay = chartY + y1 * chartH;
    const bx = chartX + x2 * chartW;
    const by = chartY + y2 * chartH;
    s.addShape(pres.shapes.LINE, {
      x: ax, y: ay, w: bx - ax, h: by - ay,
      line: { color: ACCENT, width: 2 },
      flipV: false,
    });
  }

  // Bottom two cards
  const cY = dy + 4.45;
  const cH = 1.85;
  const cGapX = 0.3;
  const cW = (rw - 0.2 - cGapX) / 2;

  // Holdings card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: rx, y: cY, w: cW, h: cH, rectRadius: 0.08,
    fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
  });
  s.addText("SHIELDED HOLDINGS", {
    x: rx + 0.2, y: cY + 0.12, w: cW - 0.4, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  const holdings = [
    { letter: "E", color: ACCENT,  symbol: "ETH",  amount: "8.124",     value: "$27,318.00", pct: "64.6 %" },
    { letter: "U", color: "2775CA", symbol: "USDC", amount: "10,000.00", value: "$10,000.00", pct: "23.6 %" },
    { letter: "D", color: "F5AC37", symbol: "DAI",  amount: "5,000.04",  value: "$5,000.04",  pct: "11.8 %" },
  ];
  holdings.forEach((h, i) => {
    const hy = cY + 0.45 + i * 0.45;
    // icon
    s.addShape(pres.shapes.OVAL, {
      x: rx + 0.2, y: hy + 0.04, w: 0.3, h: 0.3,
      fill: { color: h.color }, line: { color: h.color, width: 0 },
    });
    s.addText(h.letter, {
      x: rx + 0.2, y: hy + 0.04, w: 0.3, h: 0.3,
      fontFace: "Calibri", fontSize: 10, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // symbol + amount
    s.addText(h.symbol, {
      x: rx + 0.65, y: hy, w: 1.2, h: 0.22,
      fontFace: "Calibri", fontSize: 11, color: TEXT, bold: true, margin: 0,
    });
    s.addText(h.amount, {
      x: rx + 0.65, y: hy + 0.2, w: 1.5, h: 0.22,
      fontFace: MONO, fontSize: 9, color: MUTED, margin: 0,
    });
    // value + pct
    s.addText(h.value, {
      x: rx + cW - 1.9, y: hy, w: 1.7, h: 0.22,
      fontFace: MONO, fontSize: 10, color: TEXT, align: "right", margin: 0,
    });
    s.addText(h.pct, {
      x: rx + cW - 1.9, y: hy + 0.2, w: 1.7, h: 0.22,
      fontFace: MONO, fontSize: 9, color: MUTED, align: "right", margin: 0,
    });
  });

  // Activity card
  const aX = rx + cW + cGapX;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: aX, y: cY, w: cW, h: cH, rectRadius: 0.08,
    fill: { color: SURFACE2 }, line: { color: BORDER, width: 1 },
  });
  s.addText("RECENT ACTIVITY", {
    x: aX + 0.2, y: cY + 0.12, w: cW - 0.4, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  const activity = [
    { arrow: "↓", type: "Deposit",  time: "2m ago", change: "+2.50 ETH",   color: SUCCESS },
    { arrow: "↑", type: "Withdraw", time: "1h ago", change: "−1,200 USDC", color: MUTED2 },
    { arrow: "↓", type: "Deposit",  time: "3d ago", change: "+5,000 DAI",  color: SUCCESS },
  ];
  activity.forEach((a, i) => {
    const ay = cY + 0.45 + i * 0.45;
    // arrow in bordered square
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: aX + 0.2, y: ay + 0.02, w: 0.35, h: 0.35, rectRadius: 0.04,
      fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
    });
    s.addText(a.arrow, {
      x: aX + 0.2, y: ay + 0.02, w: 0.35, h: 0.35,
      fontFace: "Calibri", fontSize: 12, color: MUTED2, align: "center", valign: "middle", margin: 0,
    });
    // type + time
    s.addText(a.type, {
      x: aX + 0.7, y: ay, w: 2, h: 0.22,
      fontFace: "Calibri", fontSize: 11, color: TEXT, bold: true, margin: 0,
    });
    s.addText(a.time, {
      x: aX + 0.7, y: ay + 0.2, w: 2, h: 0.22,
      fontFace: "Calibri", fontSize: 9, color: MUTED, margin: 0,
    });
    // change
    s.addText(a.change, {
      x: aX + cW - 2.1, y: ay + 0.08, w: 1.9, h: 0.25,
      fontFace: MONO, fontSize: 10, color: a.color, align: "right", margin: 0,
    });
  });
}

// ========================================================================
// SLIDE 8 — DESIGN SYSTEM
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "07", "SYSTEM", "07");
  addEyebrow(s, "DESIGN SYSTEM", 1.5);
  addTitle(s, "Tokens, type, and components.", 2.2, 18, 0.9, 40);

  // === TYPE column ===
  s.addText("TYPE", {
    x: 0.7, y: 3.8, w: 4, h: 0.35,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText("Cambria", {
    x: 0.7, y: 4.25, w: 5, h: 0.9,
    fontFace: SERIF, fontSize: 44, color: TEXT, margin: 0,
  });
  s.addText("SERIF · TITLES · BODY · $8,427.50", {
    x: 0.7, y: 5.05, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText("Consolas", {
    x: 0.7, y: 5.6, w: 5, h: 0.85,
    fontFace: MONO, fontSize: 40, color: TEXT, bold: true, margin: 0,
  });
  s.addText("MONO · DATA · 0x4F2A...9D3C", {
    x: 0.7, y: 6.4, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 10, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addText("Both ship with Windows, macOS fallbacks exist. Renders identically in PowerPoint — no webfonts.", {
    x: 0.7, y: 6.95, w: 5.3, h: 0.7,
    fontFace: "Calibri", fontSize: 11, color: MUTED2, margin: 0,
  });

  // === COLOR column ===
  s.addText("COLOR", {
    x: 7.2, y: 3.8, w: 4, h: 0.35,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 2, margin: 0,
  });
  const swatches = [
    { name: "bg",      hex: "#0A0A0F", fill: BG,      border: BORDER },
    { name: "surface", hex: "#12121A", fill: SURFACE, border: BORDER },
    { name: "border",  hex: "#24242E", fill: BORDER,  border: BORDER2 },
    { name: "text",    hex: "#F5F5F0", fill: TEXT,    border: TEXT },
    { name: "accent",  hex: "#7C5CFF", fill: ACCENT,  border: ACCENT },
    { name: "success", hex: "#00E5B0", fill: SUCCESS, border: SUCCESS },
  ];
  // 3-col x 2-row grid
  const swW = 1.55, swH = 1.3, swGapX = 0.25, swGapY = 0.45;
  const swStartX = 7.2, swStartY = 4.3;
  swatches.forEach((sw, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const sx = swStartX + col * (swW + swGapX);
    const sy = swStartY + row * (swH + 0.6 + swGapY);
    // swatch
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx, y: sy, w: swW, h: swH, rectRadius: 0.06,
      fill: { color: sw.fill }, line: { color: sw.border, width: 1 },
    });
    // name + hex below
    s.addText(sw.name, {
      x: sx, y: sy + swH + 0.05, w: swW, h: 0.3,
      fontFace: "Calibri", fontSize: 11, color: TEXT, bold: true, margin: 0,
    });
    s.addText(sw.hex, {
      x: sx, y: sy + swH + 0.3, w: swW, h: 0.3,
      fontFace: MONO, fontSize: 9, color: MUTED, margin: 0,
    });
  });

  // === COMPONENTS column ===
  const cx2 = 13.9;
  s.addText("COMPONENTS", {
    x: cx2, y: 3.8, w: 5, h: 0.35,
    fontFace: MONO, fontSize: 11, color: MUTED, charSpacing: 2, margin: 0,
  });
  // BUTTON
  s.addText("BUTTON", {
    x: cx2, y: 4.25, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx2, y: 4.55, w: 4.8, h: 0.55, rectRadius: 0.08,
    fill: { color: ACCENT }, line: { color: ACCENT, width: 0 },
  });
  s.addText("Generate proof & deposit", {
    x: cx2, y: 4.55, w: 4.8, h: 0.55,
    fontFace: "Calibri", fontSize: 13, color: TEXT, bold: true, align: "center", valign: "middle", margin: 0,
  });

  // AMOUNT FIELD
  s.addText("AMOUNT FIELD", {
    x: cx2, y: 5.35, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx2, y: 5.65, w: 4.8, h: 0.75, rectRadius: 0.08,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  s.addText([
    { text: "2.50", options: { fontSize: 22, color: TEXT, bold: false } },
    { text: "  ETH", options: { fontSize: 14, color: MUTED } },
  ], {
    x: cx2 + 0.2, y: 5.65, w: 4.5, h: 0.75, fontFace: SERIF, valign: "middle", margin: 0,
  });

  // STATUS CHIP
  s.addText("STATUS CHIP", {
    x: cx2, y: 6.6, w: 5, h: 0.3,
    fontFace: MONO, fontSize: 9, color: MUTED, charSpacing: 2, margin: 0,
  });
  // Connected chip
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx2, y: 6.9, w: 1.5, h: 0.45, rectRadius: 0.22,
    fill: { color: SURFACE }, line: { color: BORDER, width: 1 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: cx2 + 0.2, y: 7.05, w: 0.16, h: 0.16,
    fill: { color: SUCCESS }, line: { color: SUCCESS, width: 0 },
  });
  s.addText("Connected", {
    x: cx2 + 0.4, y: 6.9, w: 1.1, h: 0.45,
    fontFace: "Calibri", fontSize: 11, color: TEXT, valign: "middle", margin: 0,
  });
  // Shielded chip
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: cx2 + 1.65, y: 6.9, w: 1.3, h: 0.45, rectRadius: 0.22,
    fill: { color: SURFACE }, line: { color: ACCENT, width: 1 },
  });
  s.addText("Shielded", {
    x: cx2 + 1.65, y: 6.9, w: 1.3, h: 0.45,
    fontFace: "Calibri", fontSize: 11, color: ACCENT, align: "center", valign: "middle", margin: 0,
  });
}

// ========================================================================
// SLIDE 9 — NEXT STEPS
// ========================================================================
{
  const s = pres.addSlide();
  s.background = { color: BG };
  addHeader(s, "08", "NEXT", "08");
  addEyebrow(s, "NEXT STEPS", 1.5);
  addTitle(s, "Where we go from here.", 2.2, 18, 0.9, 40);

  const colY = 4.0;
  const cols = [
    {
      label: "THIS SPRINT",
      items: [
        "Ship RainbowKit integration behind a feature flag",
        "Lock deposit + withdraw component API",
        "Prove-in-worker perf benchmarks (target < 4s)",
      ],
    },
    {
      label: "NEXT SPRINT",
      items: [
        "Full dashboard with activity feed",
        "Settings: shielded key export + recovery",
        "Mobile responsive pass",
      ],
    },
    {
      label: "OPEN QUESTIONS",
      items: [
        "Gas abstraction for first deposit?",
        "How to explain \"shielded\" without scaring users?",
        "Multi-asset deposits in one proof: v0 or v1?",
      ],
    },
  ];
  const cW = 5.6, cGap = 0.4, cX0 = 0.7;
  cols.forEach((col, i) => {
    const x = cX0 + i * (cW + cGap);
    s.addText(col.label, {
      x, y: colY, w: cW, h: 0.4,
      fontFace: MONO, fontSize: 12, color: MUTED, charSpacing: 3, margin: 0,
    });
    // items as bullet dashes
    col.items.forEach((it, j) => {
      const iy = colY + 0.7 + j * 0.9;
      // leading dash
      s.addShape(pres.shapes.LINE, {
        x, y: iy + 0.25, w: 0.14, h: 0,
        line: { color: MUTED, width: 1.5 },
      });
      s.addText(it, {
        x: x + 0.25, y: iy, w: cW - 0.25, h: 1.0,
        fontFace: SERIF, fontSize: 18, color: TEXT, margin: 0,
      });
    });
  });

  // Bottom divider
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 10.0, w: 18.6, h: 0,
    line: { color: BORDER, width: 1 },
  });

  // Footer logo (small version of camera reticle) + "Zipped"
  const lx = 0.75, ly = 10.35, lsize = 0.45, stroke = 0.025, armLen = 0.1;
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - armLen, y: ly, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - stroke, y: ly, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + lsize - armLen, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx, y: ly + lsize - stroke, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - armLen, y: ly + lsize - stroke, w: armLen, h: stroke, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize - stroke, y: ly + lsize - armLen, w: stroke, h: armLen, fill: { color: TEXT }, line: { color: TEXT, width: 0 } });
  s.addShape(pres.shapes.RECTANGLE, { x: lx + lsize / 2 - 0.03, y: ly + lsize / 2 - 0.03, w: 0.06, h: 0.06, fill: { color: ACCENT }, line: { color: ACCENT, width: 0 } });

  s.addText("Zipped", {
    x: 1.4, y: 10.28, w: 3, h: 0.5,
    fontFace: "Calibri", fontSize: 16, color: TEXT, valign: "middle", margin: 0,
  });

  // Right-side: THANKS — DISCUSSION →
  s.addText("THANKS — DISCUSSION →", {
    x: 13.5, y: 10.28, w: 5.8, h: 0.5,
    fontFace: MONO, fontSize: 13, color: TEXT, charSpacing: 3, align: "right", valign: "middle", margin: 0,
  });
}

// ----- Write out -----
pres.writeFile({ fileName: "defi_replica.pptx" }).then((name) => {
  console.log("Wrote:", name);
});
