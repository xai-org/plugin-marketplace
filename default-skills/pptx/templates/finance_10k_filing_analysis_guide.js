const pptxgen = require("pptxgenjs");

// Bryant University brand palette
const BLACK = "000000", CHARCOAL = "1A1A1A", DARK = "2B2B2B";
const GOLD = "B4975B", LIGHT_GOLD = "C9BB8C", GOLD_PALE = "F3EDDD";
const GRAY = "818286", LIGHT_GRAY = "E5E5E6";
const OFF_WHITE = "FAFAF8", WHITE = "FFFFFF";

const HEADER = "Arial Black", BODY = "Calibri";
const W = 13.3, H = 7.5, M = 0.6, CW = W - 2 * M, FH = 0.4;

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Bryant University";
  pres.title = "How to Read a 10-K";

  // ── Helpers ──────────────────────────────────────────────
  function footer(s, n) {
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - FH, w: W, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - FH + 0.05, w: W, h: FH - 0.05, fill: { color: BLACK }, line: { color: BLACK } });
    s.addText([
      { text: "BRYANT", options: { bold: true, color: GOLD, fontFace: HEADER, charSpacing: 2 } },
      { text: "  UNIVERSITY", options: { color: WHITE, fontFace: BODY, charSpacing: 1 } }
    ], { x: M, y: H - FH + 0.05, w: 5, h: FH - 0.05, fontSize: 10, valign: "middle", margin: 0 });
    s.addText("How to Read a 10-K  |  Graduate Finance Seminar", {
      x: W / 2 - 3, y: H - FH + 0.05, w: 6, h: FH - 0.05,
      fontSize: 10, fontFace: BODY, color: LIGHT_GOLD, align: "center", valign: "middle", margin: 0
    });
    s.addText(`${String(n).padStart(2, "0")}  /  10`, {
      x: W - M - 2, y: H - FH + 0.05, w: 2, h: FH - 0.05,
      fontSize: 10, fontFace: BODY, color: GOLD, bold: true, align: "right", valign: "middle", margin: 0
    });
  }

  function title(s, eye, txt) {
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: 0.55, w: 0.1, h: 0.95, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText(eye, { x: M + 0.22, y: 0.55, w: CW, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 3, margin: 0 });
    s.addText(txt, { x: M + 0.22, y: 0.82, w: CW, h: 0.7, fontSize: 30, fontFace: HEADER, color: BLACK, bold: true, margin: 0, valign: "top" });
    s.addShape(pres.shapes.LINE, { x: M, y: 1.65, w: CW, h: 0, line: { color: LIGHT_GRAY, width: 1 } });
  }

  // ── SLIDE 1: TITLE ──────────────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: CHARCOAL };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.6, h: H, fill: { color: GOLD }, line: { color: GOLD } });
    s.addShape(pres.shapes.RECTANGLE, { x: W - 3.5, y: 0, w: 3.5, h: 0.15, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText([
      { text: "BRYANT", options: { bold: true, color: GOLD, fontFace: HEADER, charSpacing: 3 } },
      { text: "  UNIVERSITY", options: { color: GOLD, fontFace: BODY, charSpacing: 2 } }
    ], { x: 1.0, y: 0.7, w: 4, h: 0.35, fontSize: 14, margin: 0 });
    s.addText("GRADUATE FINANCE SEMINAR  |  SEC DISCLOSURE", { x: 1.0, y: 2.3, w: 11.5, h: 0.35, fontSize: 13, fontFace: BODY, color: GOLD, bold: true, charSpacing: 4, margin: 0 });
    s.addText("HOW TO READ", { x: 1.0, y: 2.75, w: 11.5, h: 1.0, fontSize: 58, fontFace: HEADER, color: WHITE, bold: true, margin: 0, charSpacing: 1 });
    s.addText("A 10-K FILING", { x: 1.0, y: 3.7, w: 11.5, h: 1.0, fontSize: 58, fontFace: HEADER, color: WHITE, bold: true, margin: 0, charSpacing: 1 });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 4.85, w: 1.2, h: 0.06, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("A Practical Guide to the Annual Report on Form 10-K", { x: 1.0, y: 5.0, w: 11.5, h: 0.5, fontSize: 20, fontFace: BODY, color: LIGHT_GOLD, italic: true, margin: 0 });
    s.addText([
      { text: "MASTER'S LEVEL SEMINAR", options: { bold: true, color: WHITE, breakLine: true, charSpacing: 2 } },
      { text: "Department of Finance  |  Bryant University", options: { color: LIGHT_GOLD, breakLine: true } },
      { text: "Source: U.S. Securities and Exchange Commission, Office of Investor Education and Advocacy", options: { color: GRAY, italic: true } }
    ], { x: 1.0, y: 6.1, w: 11.5, h: 1.1, fontSize: 12, fontFace: BODY, paraSpaceAfter: 4, margin: 0 });
  }

  // ── SLIDE 2: WHAT IS A 10-K ─────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "01  |  OVERVIEW", "What Is a Form 10-K?");
    const lX = M, lY = 1.95, lW = 6.0, lH = 4.8;
    // Left card
    s.addShape(pres.shapes.RECTANGLE, { x: lX, y: lY, w: lW, h: lH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x: lX, y: lY, w: lW, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("THE ANNUAL DISCLOSURE", { x: lX + 0.35, y: lY + 0.35, w: 5.3, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
    s.addText("The Form 10-K", { x: lX + 0.35, y: lY + 0.6, w: 5.3, h: 0.45, fontSize: 20, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
    s.addText("The 10-K is the comprehensive annual report that most U.S. public companies must file with the SEC. It offers a detailed picture of a company\u2019s business, the risks it faces, and the operating and financial results for the fiscal year \u2014 giving investors a full window into the firm.", {
      x: lX + 0.35, y: lY + 1.2, w: lW - 0.7, h: 1.75, fontSize: 15, fontFace: BODY, color: DARK, margin: 0
    });
    s.addShape(pres.shapes.LINE, { x: lX + 0.35, y: lY + 3.05, w: lW - 0.7, h: 0, line: { color: LIGHT_GRAY, width: 1 } });
    const kv = [["REQUIRED BY", "SEC rules under the Exchange Act of 1934"], ["CERTIFIED BY", "CEO and CFO under the Sarbanes-Oxley Act"], ["AVAILABLE AT", "SEC\u2019s EDGAR database \u2014 free and public"]];
    kv.forEach((r, i) => {
      const y = lY + 3.2 + i * 0.48;
      s.addText(r[0], { x: lX + 0.35, y, w: 1.8, h: 0.35, fontSize: 10, fontFace: BODY, color: GOLD, bold: true, charSpacing: 1.5, margin: 0, valign: "middle" });
      s.addText(r[1], { x: lX + 2.1, y, w: lW - 2.45, h: 0.35, fontSize: 13, fontFace: BODY, color: DARK, margin: 0, valign: "middle" });
    });
    // Right: table
    const rX = M + lW + 0.3, rW = CW - lW - 0.3;
    s.addText("10-K vs. Annual Report to Shareholders", { x: rX, y: 1.95, w: rW, h: 0.4, fontSize: 16, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
    const tTop = 2.5, rH = 0.55, c1 = 1.6, c2 = (rW - c1) / 2;
    s.addShape(pres.shapes.RECTANGLE, { x: rX, y: tTop, w: rW, h: rH, fill: { color: BLACK }, line: { color: BLACK } });
    s.addText("FORM 10-K", { x: rX + c1, y: tTop, w: c2, h: rH, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
    s.addText("ANNUAL REPORT", { x: rX + c1 + c2, y: tTop, w: c2, h: rH, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, align: "center", valign: "middle", charSpacing: 2, margin: 0 });
    const tRows = [["Filed with", "SEC (required)", "Sent to shareholders"], ["Depth of detail", "More detailed", "Often summarized"], ["Format", "Standardized", "Often glossy, visual"], ["Legal liability", "High (SOX certified)", "Varies"]];
    tRows.forEach((r, i) => {
      const y = tTop + rH * (i + 1), fill = i % 2 === 0 ? WHITE : GOLD_PALE;
      s.addShape(pres.shapes.RECTANGLE, { x: rX, y, w: rW, h: rH, fill: { color: fill }, line: { color: LIGHT_GRAY, width: 0.5 } });
      s.addText(r[0], { x: rX + 0.15, y, w: c1 - 0.15, h: rH, fontSize: 12, fontFace: BODY, color: BLACK, bold: true, valign: "middle", margin: 0 });
      s.addText(r[1], { x: rX + c1, y, w: c2, h: rH, fontSize: 12, fontFace: BODY, color: DARK, align: "center", valign: "middle", margin: 0 });
      s.addText(r[2], { x: rX + c1 + c2, y, w: c2, h: rH, fontSize: 12, fontFace: BODY, color: DARK, align: "center", valign: "middle", margin: 0 });
    });
    const qY = tTop + rH * 5 + 0.25;
    s.addShape(pres.shapes.RECTANGLE, { x: rX, y: qY, w: rW, h: 0.9, fill: { color: GOLD_PALE }, line: { color: LIGHT_GOLD, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: rX, y: qY, w: 0.1, h: 0.9, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("KEY INSIGHT", { x: rX + 0.25, y: qY, w: 1.35, h: 0.9, fontSize: 12, fontFace: BODY, color: BLACK, bold: true, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("The 10-K typically includes more detailed information than the annual report to shareholders.", {
      x: rX + 1.7, y: qY, w: rW - 1.85, h: 0.9, fontSize: 12, fontFace: BODY, color: DARK, italic: true, valign: "middle", margin: 0
    });
    footer(s, 2);
  }

  // ── SLIDE 3: WHO WRITES / REVIEWS ───────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "02  |  ROLES & ACCOUNTABILITY", "Who Writes It, Who Reviews It");
    const cY = 1.95, cH = 4.0, cW = (CW - 0.4) / 2;
    const cards = [
      { x: M, lbl: "THE COMPANY", sub: "Writes and files the 10-K",
        body: "Laws prohibit materially false or misleading statements and require disclosing all material information. Under the Sarbanes-Oxley Act, the CEO and CFO must personally certify the filing is both accurate and complete.",
        bullets: ["Drafts all disclosures", "Selects accounting policies", "Signs SOX 302 & 906 certifications"] },
      { x: M + cW + 0.4, lbl: "THE SEC", sub: "Sets rules and reviews filings",
        body: "The SEC neither writes the 10-K nor vouches for its accuracy. It sets the disclosure requirements and the standardized order of topics. SEC staff review filings for compliance and may issue comments when disclosures appear deficient or unclear.",
        bullets: ["Defines required disclosures", "Reviews filings for compliance", "Issues interpretive guidance"] }
    ];
    cards.forEach(c => {
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: cY, w: cW, h: cH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 } });
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: cY, w: cW, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(c.lbl, { x: c.x + 0.4, y: cY + 0.3, w: cW - 0.8, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2.5, margin: 0 });
      s.addText(c.sub, { x: c.x + 0.4, y: cY + 0.55, w: cW - 0.8, h: 0.4, fontSize: 18, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
      s.addText(c.body, { x: c.x + 0.4, y: cY + 1.1, w: cW - 0.8, h: 1.5, fontSize: 14, fontFace: BODY, color: DARK, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: c.x + 0.4, y: cY + 2.6, w: cW - 0.8, h: 0, line: { color: LIGHT_GRAY, width: 0.75 } });
      s.addText("RESPONSIBILITIES", { x: c.x + 0.4, y: cY + 2.7, w: cW - 0.8, h: 0.25, fontSize: 9, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(c.bullets.map((b, i) => ({ text: b, options: { bullet: { code: "25A0" }, color: DARK, breakLine: i < 2 } })), {
        x: c.x + 0.4, y: cY + 2.95, w: cW - 0.8, h: 1.0, fontSize: 13, fontFace: BODY, paraSpaceAfter: 3, margin: 0
      });
    });
    const coY = cY + cH + 0.3;
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: coY, w: CW, h: 0.7, fill: { color: GOLD_PALE }, line: { color: LIGHT_GOLD, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: coY, w: 0.1, h: 0.7, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText([
      { text: "SOX REQUIREMENT   ", options: { bold: true, color: BLACK, charSpacing: 2 } },
      { text: "The SEC must review every public company\u2019s financial statements at least once every three years.", options: { color: DARK, italic: true } }
    ], { x: M + 0.25, y: coY, w: CW - 0.4, h: 0.7, fontSize: 13, fontFace: BODY, valign: "middle", margin: 0 });
    footer(s, 3);
  }

  // ── SLIDE 4: FOUR PARTS ─────────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "03  |  ARCHITECTURE", "The Four Parts of a 10-K");
    s.addText("SEC rules require that 10-Ks follow a set order of topics \u2014 organized into four Parts and fifteen Items.", { x: M, y: 1.8, w: CW, h: 0.35, fontSize: 14, fontFace: BODY, color: GRAY, italic: true, margin: 0 });
    const cardY = 2.35, cardH = 4.5, gap = 0.2, cardW = (CW - gap * 3) / 4;
    const parts = [
      { label: "PART I", t: "The Business", items: "ITEMS 1 \u2013 4", desc: "Business description, risk factors, unresolved SEC staff comments, properties, and legal proceedings. Start here to understand how the company operates and the risks it faces.", focus: "What it does" },
      { label: "PART II", t: "Financials", items: "ITEMS 5 \u2013 9B", desc: "Market data, selected financials, MD&A, market risk, audited financial statements, and disclosure controls. The numbers and management\u2019s narrative about them.", focus: "How it performed" },
      { label: "PART III", t: "Governance", items: "ITEMS 10 \u2013 14", desc: "Directors and executive officers, executive compensation, beneficial ownership, related-party transactions, and auditor fees. Often in the annual proxy.", focus: "Who leads it" },
      { label: "PART IV", t: "Exhibits", items: "ITEM 15", desc: "List of all exhibits and financial statement schedules required to be filed with the 10-K \u2014 including the company\u2019s bylaws, material contracts, and list of subsidiaries.", focus: "Key documents" }
    ];
    parts.forEach((p, i) => {
      const x = M + i * (cardW + gap);
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: cardH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: 1.35, fill: { color: BLACK }, line: { color: BLACK } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: cardW, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(p.label, { x: x + 0.2, y: cardY + 0.25, w: cardW - 0.4, h: 0.35, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, charSpacing: 3, margin: 0 });
      s.addText(p.t, { x: x + 0.2, y: cardY + 0.58, w: cardW - 0.4, h: 0.7, fontSize: 24, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
      s.addText(p.items, { x: x + 0.2, y: cardY + 1.5, w: cardW - 0.4, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(p.desc, { x: x + 0.2, y: cardY + 1.85, w: cardW - 0.4, h: cardH - 1.85 - 0.85, fontSize: 14, fontFace: BODY, color: DARK, margin: 0, valign: "top" });
      const fH2 = 0.85;
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY + cardH - fH2, w: cardW, h: fH2, fill: { color: GOLD_PALE }, line: { color: LIGHT_GOLD } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cardY + cardH - fH2, w: cardW, h: 0.04, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText("KEY FOCUS", { x: x + 0.2, y: cardY + cardH - fH2 + 0.12, w: cardW - 0.4, h: 0.25, fontSize: 9, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(p.focus, { x: x + 0.2, y: cardY + cardH - fH2 + 0.35, w: cardW - 0.4, h: 0.45, fontSize: 14, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
    });
    footer(s, 4);
  }

  // ── SLIDE 5: PART I ─────────────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "04  |  PART I", "The Business & Its Risks");
    const rTop = 1.85, rH2 = 0.87, rGap = 0.08;
    const items = [
      { item: "ITEM 1", head: "Business", body: "Describes the company\u2019s main products, services, subsidiaries, markets, competition, regulation, and labor. Start here to understand how the company operates." },
      { item: "ITEM 1A", head: "Risk Factors", body: "The most significant risks \u2014 usually listed in order of importance. Focuses on the risks themselves, not how management addresses them." },
      { item: "ITEM 1B", head: "Unresolved Comments", body: "Unresolved comments received from SEC staff on previously filed reports. A useful flag for ongoing disclosure concerns." },
      { item: "ITEM 2", head: "Properties", body: "Information about the company\u2019s significant physical properties \u2014 principal plants, mines, and other materially important facilities." },
      { item: "ITEM 3", head: "Legal Proceedings", body: "Significant pending lawsuits or other legal proceedings, beyond ordinary routine litigation incidental to the business." }
    ];
    items.forEach((r, i) => {
      const y = rTop + i * (rH2 + rGap);
      s.addShape(pres.shapes.RECTANGLE, { x: M, y, w: CW, h: rH2, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 90, opacity: 0.06 } });
      s.addShape(pres.shapes.RECTANGLE, { x: M, y, w: 0.1, h: rH2, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(r.item, { x: M + 0.3, y: y + 0.13, w: 2.2, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(r.head, { x: M + 0.3, y: y + 0.36, w: 3.5, h: 0.5, fontSize: 17, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: M + 4.0, y: y + 0.2, w: 0, h: rH2 - 0.4, line: { color: LIGHT_GRAY, width: 1 } });
      s.addText(r.body, { x: M + 4.15, y: y + 0.15, w: CW - 4.35, h: rH2 - 0.3, fontSize: 13, fontFace: BODY, color: DARK, valign: "middle", margin: 0 });
    });
    footer(s, 5);
  }

  // ── SLIDE 6: PART II / MD&A ─────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "05  |  PART II", "The Financial Story");
    const topY = 1.9, btm = H - FH - 0.3, pH = btm - topY, lW = 5.6;
    // Left MD&A panel
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: topY, w: lW, h: pH, fill: { color: BLACK }, line: { color: BLACK } });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: topY, w: lW, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("ITEM 7  |  SPOTLIGHT", { x: M + 0.35, y: topY + 0.35, w: lW - 0.7, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 3, margin: 0 });
    s.addText("MD&A", { x: M + 0.35, y: topY + 0.6, w: lW - 0.7, h: 0.45, fontSize: 20, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
    s.addText("Management\u2019s Discussion & Analysis", { x: M + 0.35, y: topY + 1.15, w: lW - 0.7, h: 0.5, fontSize: 20, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: M + 0.35, y: topY + 1.9, w: 0.6, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("WHAT TO LOOK FOR", { x: M + 0.35, y: topY + 2.05, w: lW - 0.7, h: 0.3, fontSize: 13, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
    const mdaB = [
      { h: "Operations & results", b: "How the business performed vs. prior periods" },
      { h: "Liquidity & capital", b: "Cash position, credit lines, financing needs" },
      { h: "Trends & uncertainties", b: "Forces that could affect future results" },
      { h: "Material changes", b: "Drivers of year-over-year differences" },
      { h: "Accounting judgments", b: "Estimates that impact reported numbers" }
    ];
    mdaB.forEach((m, i) => {
      const y = topY + 2.4 + i * 0.48;
      s.addShape(pres.shapes.RECTANGLE, { x: M + 0.4, y: y + 0.15, w: 0.12, h: 0.12, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText([{ text: m.h, options: { bold: true, color: WHITE, breakLine: true } }, { text: m.b, options: { color: LIGHT_GOLD } }], {
        x: M + 0.65, y, w: lW - 1.0, h: 0.45, fontSize: 12, fontFace: BODY, margin: 0, paraSpaceAfter: 0
      });
    });
    // Right items
    const rX = M + lW + 0.3, rW = CW - lW - 0.3;
    const rItems = [
      { item: "ITEM 5", t: "Market for Equity", b: "Market data, holders, dividends, and share repurchases." },
      { item: "ITEM 6", t: "Selected Financial Data", b: "Five-year financial highlights for trend analysis." },
      { item: "ITEM 7A", t: "Market Risk", b: "Interest-rate, FX, commodity, and equity-price exposures." },
      { item: "ITEM 8", t: "Financial Statements", b: "Audited income statement, balance sheet, cash flows, and equity \u2014 under GAAP." },
      { item: "ITEMS 9 / 9A / 9B", t: "Controls & Changes", b: "Auditor disagreements and internal control over financial reporting." }
    ];
    const riH = (pH - 0.4) / 5;
    rItems.forEach((r, i) => {
      const y = topY + i * (riH + 0.1);
      s.addShape(pres.shapes.RECTANGLE, { x: rX, y, w: rW, h: riH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 90, opacity: 0.06 } });
      s.addShape(pres.shapes.RECTANGLE, { x: rX, y, w: 0.08, h: riH, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(r.item, { x: rX + 0.22, y: y + 0.1, w: 3, h: 0.28, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(r.t, { x: rX + 0.22, y: y + 0.32, w: rW - 0.4, h: 0.32, fontSize: 15, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
      s.addText(r.b, { x: rX + 0.22, y: y + 0.62, w: rW - 0.4, h: riH - 0.7, fontSize: 12, fontFace: BODY, color: DARK, margin: 0 });
    });
    footer(s, 6);
  }

  // ── SLIDE 7: PARTS III & IV ─────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "06  |  PARTS III & IV", "Governance & Exhibits");
    s.addText("PART III  |  DIRECTORS, COMPENSATION, AND OWNERSHIP", { x: M, y: 1.85, w: CW, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 3, margin: 0 });
    const gY = 2.25, gH = 2.75, gg = 0.15, gW = (CW - gg * 4) / 5;
    const gov = [
      { n: "10", t: "Directors & Governance", b: "Background and experience of the company\u2019s directors and executive officers, along with the code of ethics and board committees." },
      { n: "11", t: "Executive Compensation", b: "Detailed pay disclosure for named executive officers, including salary, bonus, equity awards, and compensation policies." },
      { n: "12", t: "Security Ownership", b: "Shares owned by directors, officers, and significant shareholders, plus shares covered by equity compensation plans." },
      { n: "13", t: "Related Transactions", b: "Relationships and transactions between the company and its directors, officers, and families, plus director independence." },
      { n: "14", t: "Accountant Fees", b: "Fees paid to the company\u2019s independent accounting firm by service category \u2014 audit, audit-related, tax, and all other services." }
    ];
    gov.forEach((g, i) => {
      const x = M + i * (gW + gg);
      s.addShape(pres.shapes.RECTANGLE, { x, y: gY, w: gW, h: gH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.08 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: gY, w: gW, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(`ITEM ${g.n}`, { x, y: gY + 0.2, w: gW, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, align: "center", charSpacing: 2, margin: 0 });
      s.addText(g.t, { x: x + 0.1, y: gY + 0.5, w: gW - 0.2, h: 0.6, fontSize: 14, fontFace: HEADER, color: BLACK, bold: true, align: "center", margin: 0 });
      s.addText(g.b, { x: x + 0.15, y: gY + 1.15, w: gW - 0.3, h: 1.5, fontSize: 12, fontFace: BODY, color: DARK, align: "center", margin: 0 });
    });
    const nY = gY + gH + 0.25;
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: nY, w: CW, h: 0.65, fill: { color: GOLD_PALE }, line: { color: LIGHT_GOLD, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: nY, w: 0.1, h: 0.65, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText([
      { text: "PRACTICAL NOTE   ", options: { bold: true, color: BLACK, charSpacing: 2 } },
      { text: "Most companies satisfy Part III by incorporating their proxy statement by reference \u2014 so you may need to pull the proxy separately.", options: { color: DARK, italic: true } }
    ], { x: M + 0.25, y: nY, w: CW - 0.4, h: 0.65, fontSize: 12, fontFace: BODY, valign: "middle", margin: 0 });
    const p4Y = nY + 0.85;
    s.addText("PART IV  |  EXHIBITS AND SCHEDULES", { x: M, y: p4Y, w: CW, h: 0.3, fontSize: 11, fontFace: BODY, color: GOLD, bold: true, charSpacing: 3, margin: 0 });
    s.addText([
      { text: "ITEM 15   ", options: { bold: true, color: BLACK } },
      { text: "lists financial statement schedules and required exhibits \u2014 including bylaws, material contracts, and a list of the company\u2019s subsidiaries.", options: { color: DARK } }
    ], { x: M, y: p4Y + 0.3, w: CW, h: 0.4, fontSize: 13, fontFace: BODY, margin: 0 });
    footer(s, 7);
  }

  // ── SLIDE 8: AUDIT OPINIONS & RED FLAGS ─────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "07  |  CRITICAL READING", "Audit Opinions & Red Flags");
    const topY = 1.9, btm = H - FH - 0.3, pH = btm - topY, hW = (CW - 0.3) / 2;
    // Left panel
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: topY, w: hW, h: pH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 } });
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: topY, w: hW, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("THE AUDITOR\u2019S REPORT", { x: M + 0.35, y: topY + 0.3, w: hW - 0.7, h: 0.3, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
    s.addText("Three Opinion Types", { x: M + 0.35, y: topY + 0.55, w: hW - 0.7, h: 0.4, fontSize: 18, fontFace: HEADER, color: BLACK, bold: true, margin: 0 });
    s.addText("An independent accountant audits the financial statements and issues an opinion. For large companies, the auditor also reports on internal controls.", {
      x: M + 0.35, y: topY + 1.15, w: hW - 0.7, h: 0.7, fontSize: 13, fontFace: BODY, color: DARK, italic: true, margin: 0
    });
    const ops = [
      { l: "UNQUALIFIED", tag: "Clean opinion", d: "Financial statements fairly present the company\u2019s position under GAAP. This is the standard outcome to expect." },
      { l: "QUALIFIED", tag: "Caution", d: "The auditor identified a specific issue that prevented a clean opinion. Investigate the explanation carefully." },
      { l: "DISCLAIMER", tag: "Warning sign", d: "The auditor was unable to form an opinion on the financial statements. A significant warning sign for investors." }
    ];
    const oTop = topY + 1.95, oPad = 0.35, oH2 = (pH - (oTop - topY) - oPad - 0.16) / 3;
    ops.forEach((o, i) => {
      const y = oTop + i * (oH2 + 0.08);
      s.addShape(pres.shapes.RECTANGLE, { x: M + 0.35, y, w: hW - 0.7, h: oH2, fill: { color: GOLD_PALE }, line: { color: LIGHT_GOLD, width: 0.75 } });
      s.addShape(pres.shapes.RECTANGLE, { x: M + 0.35, y, w: 0.08, h: oH2, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(o.l, { x: M + 0.55, y: y + 0.08, w: 2.5, h: 0.3, fontSize: 13, fontFace: BODY, color: BLACK, bold: true, charSpacing: 2, margin: 0 });
      s.addText(o.tag, { x: M + 0.55, y: y + 0.08, w: hW - 0.95, h: 0.3, fontSize: 10, fontFace: BODY, color: GRAY, italic: true, align: "right", margin: 0 });
      s.addText(o.d, { x: M + 0.55, y: y + 0.36, w: hW - 0.95, h: oH2 - 0.4, fontSize: 12, fontFace: BODY, color: DARK, margin: 0 });
    });
    // Right panel
    const rX = M + hW + 0.3;
    s.addShape(pres.shapes.RECTANGLE, { x: rX, y: topY, w: hW, h: pH, fill: { color: BLACK }, line: { color: BLACK } });
    s.addShape(pres.shapes.RECTANGLE, { x: rX, y: topY, w: hW, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("RED FLAGS TO WATCH", { x: rX + 0.35, y: topY + 0.3, w: hW - 0.7, h: 0.3, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, charSpacing: 2, margin: 0 });
    s.addText("Four Warning Signs", { x: rX + 0.35, y: topY + 0.55, w: hW - 0.7, h: 0.4, fontSize: 18, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
    const flags = [
      { h: "Changes in accountants", b: "Item 9 \u2014 disagreements with auditors are viewed as a warning sign." },
      { h: "Material control weaknesses", b: "Item 9A \u2014 signals risk to the reliability of reported numbers." },
      { h: "Unresolved SEC staff comments", b: "Item 1B \u2014 unresolved questions about prior disclosures." },
      { h: "Heavy use of non-GAAP measures", b: "Permitted, but always reconcile to the nearest GAAP figure." }
    ];
    const fTop = topY + 1.45, fPad = 0.35, fH2 = (pH - (fTop - topY) - fPad - 0.15) / 4;
    flags.forEach((f, i) => {
      const y = fTop + i * (fH2 + 0.05);
      s.addShape(pres.shapes.RECTANGLE, { x: rX + 0.35, y: y + 0.12, w: 0.1, h: 0.1, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(f.h, { x: rX + 0.55, y, w: hW - 0.9, h: 0.32, fontSize: 14, fontFace: BODY, color: WHITE, bold: true, margin: 0 });
      s.addText(f.b, { x: rX + 0.55, y: y + 0.3, w: hW - 0.9, h: fH2 - 0.3, fontSize: 12, fontFace: BODY, color: LIGHT_GOLD, margin: 0 });
    });
    footer(s, 8);
  }

  // ── SLIDE 9: READING STRATEGY ───────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: OFF_WHITE };
    title(s, "08  |  PRACTICE", "A Reading Strategy for Analysts");
    s.addText("You rarely need to read every page. Work through the 10-K in this order to build understanding efficiently.", { x: M, y: 1.8, w: CW, h: 0.35, fontSize: 14, fontFace: BODY, color: GRAY, italic: true, margin: 0 });
    const steps = [
      { n: "01", t: "Business", item: "ITEM 1", b: "Start here to understand what the company sells, the markets it serves, and how it generates its revenue." },
      { n: "02", t: "Risk Factors", item: "ITEM 1A", b: "Identify the most significant exposures facing the business, typically listed by management in order of relative importance." },
      { n: "03", t: "MD&A", item: "ITEM 7", b: "Management\u2019s narrative on results, trends, liquidity, and the critical accounting judgments that shape the reported numbers." },
      { n: "04", t: "Financial Statements", item: "ITEM 8", b: "The income statement, balance sheet, cash flows, and equity \u2014 plus the footnotes and the independent auditor\u2019s report." },
      { n: "05", t: "Controls & Changes", item: "ITEMS 9 / 9A", b: "Check for any auditor changes, material weaknesses, or other deficiencies in disclosure controls and financial reporting." },
      { n: "06", t: "Governance", item: "PART III / PROXY", b: "Executive compensation, ownership, related-party transactions, and the composition and independence of the board." }
    ];
    const sTop = 2.3, sBtm = H - FH - 0.3, sH = sBtm - sTop, sGap = 0.2, cols = 3, rows = 2;
    const sW = (CW - sGap * 2) / cols, sHH = (sH - sGap) / rows;
    steps.forEach((st, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const x = M + col * (sW + sGap), y = sTop + row * (sHH + sGap);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: sW, h: sHH, fill: { color: WHITE }, line: { color: LIGHT_GRAY, width: 1 }, shadow: { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.08 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: sW, h: 1.0, fill: { color: BLACK }, line: { color: BLACK } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: sW, h: 0.08, fill: { color: GOLD }, line: { color: GOLD } });
      s.addText(st.n, { x: x + 0.25, y: y + 0.15, w: 1.3, h: 0.8, fontSize: 40, fontFace: HEADER, color: GOLD, bold: true, margin: 0, valign: "middle" });
      s.addText(st.t, { x: x + 1.55, y: y + 0.2, w: sW - 1.7, h: 0.4, fontSize: 18, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
      s.addText(st.item, { x: x + 1.55, y: y + 0.6, w: sW - 1.7, h: 0.3, fontSize: 11, fontFace: BODY, color: LIGHT_GOLD, bold: true, charSpacing: 2, margin: 0 });
      s.addText(st.b, { x: x + 0.25, y: y + 1.15, w: sW - 0.5, h: sHH - 1.3, fontSize: 13, fontFace: BODY, color: DARK, margin: 0, valign: "top" });
    });
    footer(s, 9);
  }

  // ── SLIDE 10: KEY TAKEAWAYS ─────────────────────────────
  {
    const s = pres.addSlide(); s.background = { color: CHARCOAL };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.6, h: H, fill: { color: GOLD }, line: { color: GOLD } });
    s.addShape(pres.shapes.RECTANGLE, { x: W - 3.5, y: 0, w: 3.5, h: 0.15, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText("09  |  SYNTHESIS", { x: 1.0, y: 0.7, w: 11.5, h: 0.35, fontSize: 12, fontFace: BODY, color: GOLD, bold: true, charSpacing: 4, margin: 0 });
    s.addText("KEY TAKEAWAYS", { x: 1.0, y: 1.05, w: 12, h: 0.9, fontSize: 44, fontFace: HEADER, color: WHITE, bold: true, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 1.95, w: 1.2, h: 0.06, fill: { color: GOLD }, line: { color: GOLD } });
    const tks = [
      { h: "A Standardized Window", b: "Every 10-K follows the same four-part structure \u2014 making cross-company comparison possible." },
      { h: "The MD&A Matters", b: "Item 7 is where management explains results, risks, and the judgments behind the reported numbers." },
      { h: "Read It Critically", b: "Watch for qualified opinions, material weaknesses, auditor changes, and unresolved SEC staff comments." },
      { h: "EDGAR Is Free", b: "Every 10-K is publicly available on SEC.gov/EDGAR \u2014 a vital primary source for research and investing." }
    ];
    const gTop = 2.35, gBtm = H - 0.95, gH2 = gBtm - gTop, cellH = (gH2 - 0.3) / 2, cellW = (W - 2.0 - 0.4) / 2;
    tks.forEach((t, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 1.0 + col * (cellW + 0.4), y = gTop + row * (cellH + 0.3);
      s.addText(String(i + 1), { x, y: y - 0.1, w: 0.85, h: 0.95, fontSize: 60, fontFace: HEADER, color: GOLD, bold: true, align: "left", valign: "middle", margin: 0 });
      s.addText(t.h, { x: x + 0.95, y: y + 0.12, w: cellW - 0.95, h: 0.5, fontSize: 22, fontFace: HEADER, color: GOLD, bold: true, margin: 0 });
      s.addText(t.b, { x: x + 0.95, y: y + 0.55, w: cellW - 0.95, h: cellH - 0.6, fontSize: 14, fontFace: BODY, color: WHITE, margin: 0 });
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.6, w: W, h: 0.05, fill: { color: GOLD }, line: { color: GOLD } });
    s.addText([
      { text: "BRYANT", options: { bold: true, color: GOLD, fontFace: HEADER, charSpacing: 2 } },
      { text: "  UNIVERSITY", options: { color: WHITE, fontFace: BODY, charSpacing: 1 } },
      { text: "    |    Graduate Finance Seminar", options: { color: LIGHT_GOLD, fontFace: BODY, italic: true } }
    ], { x: 1.0, y: H - 0.5, w: 10, h: 0.3, fontSize: 11, margin: 0 });
    s.addText("Source: SEC Office of Investor Education and Advocacy", { x: W - 6, y: H - 0.5, w: 5, h: 0.3, fontSize: 10, fontFace: BODY, color: GRAY, italic: true, align: "right", margin: 0 });
  }

  await pres.writeFile({ fileName: "/home/assets/How_to_Read_a_10-K.pptx" });
  console.log("Done.");
})();
