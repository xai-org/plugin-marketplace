const pptxgen = require("pptxgenjs");

async function main() {
  const BLK = "1A1A1A", WHT = "FFFFFF", RED = "E63228", GRY = "6B7280", LTGRY = "9CA3AF", TXT = "1F2937", BDR = "E5E7EB", ALT = "F9FAFB";

  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Abridge";
  pres.title = "Abridge + Houston Methodist";

  function addFooter(slide) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: RED } });
    slide.addText("Best in KLAS 2025 & 2026  •  Epic's First Pal Partner  •  #1 Most Innovative, Fast Company  •  Forbes AI 50", { x: 0.5, y: 5.25, w: 9, h: 0.375, fontSize: 9, fontFace: "Trebuchet MS", color: WHT, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  function whiteSlide(slide, title) {
    slide.background = { color: WHT };
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: RED } });
    slide.addText(title, { x: 0.8, y: 0.3, w: 8.4, h: 0.5, fontSize: 22, fontFace: "Trebuchet MS", color: BLK, bold: true, margin: 0 });
    slide.addText("ABRIDGE", { x: 8.2, y: 0.1, w: 1.4, h: 0.25, fontSize: 7, fontFace: "Trebuchet MS", color: BLK, bold: true, charSpacing: 3, margin: 0, align: "right" });
  }

  // ===== SLIDE 1 =====
  let s1 = pres.addSlide();
  s1.background = { color: WHT };
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: RED } });

  s1.addText("ABRIDGE", { x: 0, y: 1.6, w: 10, h: 0.4, fontSize: 14, fontFace: "Trebuchet MS", color: RED, bold: true, charSpacing: 8, margin: 0, align: "center" });
  s1.addText("Enterprise Ambient AI\nPartnership Proposal", { x: 0, y: 2.0, w: 10, h: 1.0, fontSize: 30, fontFace: "Trebuchet MS", color: BLK, bold: true, lineSpacingMultiple: 1.1, margin: 0, align: "center" });
  s1.addText("Houston Methodist Health System", { x: 0, y: 3.1, w: 10, h: 0.45, fontSize: 18, fontFace: "Calibri", color: GRY, margin: 0, align: "center" });
  s1.addText("April 2026", { x: 0, y: 3.6, w: 10, h: 0.35, fontSize: 12, fontFace: "Calibri", color: LTGRY, margin: 0, align: "center" });
  addFooter(s1);

  // ===== SLIDE 2 =====
  let s2 = pres.addSlide();
  whiteSlide(s2, "Executive Summary");
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.65, fill: { color: BLK } });
  s2.addText("Abridge proposes an enterprise-wide ambient AI partnership to transform clinical documentation, reduce burnout, and optimize revenue capture across Houston Methodist's 8 hospitals, 150+ outpatient locations, and 6,000+ clinicians.", { x: 0.8, y: 0.9, w: 8.4, h: 0.65, fontSize: 11.5, fontFace: "Calibri", color: WHT, margin: 0, valign: "middle" });
  const execStats = [{ big: "#1", sub: "Best in KLAS\n2025 & 2026" }, { big: "250+", sub: "Health Systems\nLive" }, { big: "80M+", sub: "Conversations\nPer Year" }, { big: "55+", sub: "Specialties\nSupported" }];
  execStats.forEach((e, i) => {
    const cx = 0.5 + i * 2.35;
    s2.addText(e.big, { x: cx, y: 2.0, w: 2.15, h: 0.6, fontSize: 36, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", valign: "middle", margin: 0 });
    s2.addText(e.sub, { x: cx, y: 2.65, w: 2.15, h: 0.5, fontSize: 10, fontFace: "Calibri", color: GRY, align: "center", valign: "top", margin: 0 });
  });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.35, w: 8.4, h: 0.01, fill: { color: BDR } });
  const props = [{ t: "Industry Leader", d: "Trusted by Mayo, Johns Hopkins, Duke, Kaiser, and Northwell" }, { t: "Deepest Epic Integration", d: "Epic's first Pal partner with native EHR workflows" }, { t: "Proven Outcomes", d: "JAMA: 13.9% burnout reduction in 30 days" }, { t: "Revenue Impact", d: "Smart billing, prior auth automation, coding accuracy" }];
  props.forEach((p, i) => {
    const cx = 0.5 + i * 2.35;
    s2.addText(p.t, { x: cx, y: 3.55, w: 2.15, h: 0.3, fontSize: 11, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
    s2.addText(p.d, { x: cx, y: 3.9, w: 2.15, h: 0.6, fontSize: 9.5, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });
  });
  for (let i = 1; i < 4; i++) s2.addShape(pres.shapes.RECTANGLE, { x: 0.5 + i * 2.35 - 0.1, y: 2.0, w: 0.01, h: 2.4, fill: { color: BDR } });
  addFooter(s2);

  // ===== SLIDE 3: THE DOCUMENTATION CHALLENGE — dramatic stat showcase =====
  let s3 = pres.addSlide();
  whiteSlide(s3, "The Documentation Challenge");

  // One massive hero stat dominates the slide
  s3.addText("51.9%", { x: 0, y: 1.0, w: 10, h: 1.2, fontSize: 88, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", valign: "middle", margin: 0 });
  s3.addText("of physicians report burnout — and documentation is the #1 cause.", { x: 1.5, y: 2.2, w: 7.0, h: 0.4, fontSize: 14, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });

  // Supporting stats as a horizontal strip — shifted down ~5%
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.15, w: 10, h: 1.05, fill: { color: BLK } });
  const supportStats = [
    { n: "4,000+", l: "clicks per ED shift" },
    { n: "2–4 hrs", l: "daily pajama time" },
    { n: "$500K+", l: "to replace one MD" },
    { n: "6,000+", l: "HM clinicians affected" }
  ];
  supportStats.forEach((s, i) => {
    const cx = 0.5 + i * 2.35;
    s3.addText(s.n, { x: cx, y: 3.25, w: 2.15, h: 0.5, fontSize: 26, fontFace: "Trebuchet MS", color: WHT, bold: true, align: "center", valign: "middle", margin: 0 });
    s3.addText(s.l, { x: cx, y: 3.75, w: 2.15, h: 0.3, fontSize: 10, fontFace: "Calibri", color: LTGRY, align: "center", margin: 0 });
    if (i < 3) s3.addShape(pres.shapes.RECTANGLE, { x: cx + 2.25, y: 3.4, w: 0.01, h: 0.55, fill: { color: "3F3F3F" } });
  });

  // Quote bar
  s3.addText("\"The most exciting technology rolled out in 15 years.\"  — Dr. Jordan Dale, CMIO", { x: 0.8, y: 4.3, w: 8.4, h: 0.5, fontSize: 12, fontFace: "Calibri", color: TXT, italic: true, align: "center", valign: "middle", margin: 0 });
  addFooter(s3);

  // ===== SLIDE 4: WHY NOW — white bg, no circles, clean alignment =====
  let s4 = pres.addSlide();
  whiteSlide(s4, "Why Now: The Ambient AI Inflection Point");

  // Three columns — stats + text, all aligned uniformly
  const colData = [
    { head: "The Crisis", stat: "56%", sub: "of ED physicians report burnout", body: "Documentation is the #1 driver of dissatisfaction. Turnover costs $500K–$1M per physician. Staffing shortages worsen annually." },
    { head: "The Imperative", stat: "250+", sub: "health systems already live with Abridge", body: "Your peer systems are enterprise-wide. Epic is launching native tools — early movers shape the roadmap. Ambient AI is the fastest-growing health IT category." },
    { head: "The Evidence", stat: "13.9%", sub: "burnout reduction in just 30 days", body: "JAMA-published across 6 health systems. Real-time note generation is proven. Revenue-cycle AI is production-ready. 28+ languages serve Houston's diverse community." }
  ];
  colData.forEach((c, i) => {
    const cx = 0.5 + i * 3.15;

    // === VISUAL ELEMENT above the heading (y: 1.0 to 2.0) ===
    if (i === 0) {
      // DOT MATRIX: 10x10 grid of 100 physicians, 56 lit red
      const dotSize = 0.12;
      const dotGap = 0.16;
      const gridX = cx + (2.95 - 10 * dotGap) / 2;
      const gridY = 1.05;
      for (let r = 0; r < 10; r++) {
        for (let col = 0; col < 10; col++) {
          const idx = r * 10 + col;
          const color = idx < 56 ? RED : BDR;
          s4.addShape(pres.shapes.OVAL, { x: gridX + col * dotGap, y: gridY + r * dotGap, w: dotSize, h: dotSize, fill: { color } });
        }
      }
    } else if (i === 1) {
      // NETWORK: center node with radiating smaller nodes
      const netCx = cx + 1.475, netCy = 1.75;
      // Center node
      s4.addShape(pres.shapes.OVAL, { x: netCx - 0.15, y: netCy - 0.15, w: 0.3, h: 0.3, fill: { color: RED } });
      // Outer nodes in a circle
      const outerNodes = 8;
      const radius = 0.6;
      for (let n = 0; n < outerNodes; n++) {
        const angle = (n / outerNodes) * 2 * Math.PI - Math.PI / 2;
        const nx = netCx + radius * Math.cos(angle);
        const ny = netCy + radius * Math.sin(angle);
        // Connecting line
        s4.addShape(pres.shapes.RECTANGLE, {
          x: Math.min(netCx, nx), y: Math.min(netCy, ny),
          w: Math.abs(nx - netCx) + 0.02, h: Math.abs(ny - netCy) + 0.02,
          fill: { color: BDR }
        });
        // Node
        s4.addShape(pres.shapes.OVAL, { x: nx - 0.07, y: ny - 0.07, w: 0.14, h: 0.14, fill: { color: BLK } });
      }
      // Redraw center on top
      s4.addShape(pres.shapes.OVAL, { x: netCx - 0.15, y: netCy - 0.15, w: 0.3, h: 0.3, fill: { color: RED } });
    } else {
      // TREND LINE with area fill showing 13.9% improvement
      const chartX = cx + 0.3, chartY = 1.1, chartW = 2.35, chartH = 1.4;
      // Area fill (triangle-like shape showing improvement)
      // Before line (high burnout) at top, After line (lower) showing the gap
      const beforeY = chartY + 0.3;
      const afterY = chartY + chartH - 0.2;
      // Filled area between before and improvement
      s4.addShape(pres.shapes.RECTANGLE, { x: chartX, y: beforeY, w: chartW, h: 0.15, fill: { color: "FEE2E2" } });
      // "Before" line
      s4.addShape(pres.shapes.RECTANGLE, { x: chartX, y: beforeY, w: chartW, h: 0.03, fill: { color: RED } });
      // Improvement area
      s4.addShape(pres.shapes.RECTANGLE, { x: chartX, y: beforeY + 0.15, w: chartW, h: afterY - beforeY - 0.15, fill: { color: "DCFCE7" } });
      // "After" line
      s4.addShape(pres.shapes.RECTANGLE, { x: chartX, y: afterY, w: chartW, h: 0.03, fill: { color: "16A34A" } });
      // Labels
      s4.addText("51.9%", { x: chartX + chartW + 0.05, y: beforeY - 0.1, w: 0.6, h: 0.25, fontSize: 8, fontFace: "Trebuchet MS", color: RED, bold: true, margin: 0 });
      s4.addText("38.8%", { x: chartX + chartW + 0.05, y: afterY - 0.1, w: 0.6, h: 0.25, fontSize: 8, fontFace: "Trebuchet MS", color: "16A34A", bold: true, margin: 0 });
      s4.addText("13.9%", { x: chartX + chartW/2 - 0.4, y: (beforeY + afterY) / 2 - 0.1, w: 0.8, h: 0.25, fontSize: 10, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
      // Arrow showing reduction
      s4.addText("↓", { x: chartX + chartW/2 - 0.15, y: (beforeY + afterY) / 2 + 0.1, w: 0.3, h: 0.25, fontSize: 14, fontFace: "Trebuchet MS", color: "16A34A", bold: true, align: "center", margin: 0 });
    }

    // Thin red top accent
    s4.addShape(pres.shapes.RECTANGLE, { x: cx + 0.3, y: 2.75, w: 2.4, h: 0.03, fill: { color: RED } });
    s4.addText(c.head, { x: cx, y: 2.9, w: 2.95, h: 0.3, fontSize: 15, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
    s4.addText(c.stat, { x: cx, y: 3.2, w: 2.95, h: 0.5, fontSize: 40, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", margin: 0 });
    s4.addText(c.sub, { x: cx, y: 3.7, w: 2.95, h: 0.3, fontSize: 11, fontFace: "Calibri", color: GRY, align: "center", valign: "top", margin: 0 });
    s4.addText(c.body, { x: cx + 0.1, y: 4.05, w: 2.75, h: 0.9, fontSize: 10, fontFace: "Calibri", color: TXT, align: "center", valign: "top", margin: 0 });
    // Vertical dividers
    if (i < 2) s4.addShape(pres.shapes.RECTANGLE, { x: cx + 3.05, y: 1.0, w: 0.01, h: 3.9, fill: { color: BDR } });
  });
  addFooter(s4);

  // ===== SLIDE 5: HOW ABRIDGE WORKS — white bg, thick connecting bars =====
  let s5 = pres.addSlide();
  whiteSlide(s5, "How Abridge Works");

  // Horizontal flow bar — BLACK
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.35, w: 9.0, h: 0.06, fill: { color: BLK } });

  const flow = [
    { t: "CAPTURE", d: "Clinician-patient conversation captured in real time via Epic Haiku & Canto" },
    { t: "REASON", d: "Contextual Reasoning Engine integrates prior encounters & system guidelines" },
    { t: "GENERATE", d: "Structured, billable notes appear in Epic during the encounter — not after" },
    { t: "VERIFY", d: "PLACEHOLDER" }
  ];
  // Pre-compute exact bar positions to guarantee identical thickness
  const barW = 0.04;
  const barPositions = [1.48, 3.83, 6.18, 8.53]; // hardcoded x for each bar
  flow.forEach((f, i) => {
    const cx = 0.5 + i * 2.35;
    const bx = barPositions[i];
    // Full-length vertical bar from title down to horizontal bar
    s5.addShape(pres.shapes.RECTANGLE, { x: bx, y: 1.85, w: barW, h: 0.5, fill: { color: RED } });
    // Title above
    s5.addText(f.t, { x: cx, y: 1.15, w: 2.0, h: 0.5, fontSize: 20, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", valign: "bottom", margin: 0 });
    // Description below horizontal bar
    s5.addText(f.d, { x: cx, y: 2.55, w: 2.0, h: 0.8, fontSize: 11.5, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });
  });

  // Bottom differentiator stats
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.05, w: 9.0, h: 0.01, fill: { color: BDR } });
  const diffRow = [{ s: "The Only", l: "Linked Evidence platform" }, { s: "55+", l: "Specialties supported" }, { s: "28+", l: "Languages supported" }, { s: "Real-Time", l: "Note generation" }, { s: "#1", l: "Best in KLAS" }];
  diffRow.forEach((d, i) => {
    const dx = 0.3 + i * 1.9;
    s5.addText(d.s, { x: dx, y: 4.15, w: 1.7, h: 0.35, fontSize: 18, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", margin: 0 });
    s5.addText(d.l, { x: dx, y: 4.5, w: 1.7, h: 0.3, fontSize: 10.5, fontFace: "Calibri", color: GRY, align: "center", margin: 0 });
  });
  addFooter(s5);

  // ===== SLIDE 6: PLATFORM OFFERINGS — white bg =====
  let s6 = pres.addSlide();
  whiteSlide(s6, "Full Platform Offerings");

  // 3x2 grid with visual elements above each offering
  const off = [
    { t: "AMBIENT\nDOCUMENTATION", kw: "Outpatient  •  Inpatient  •  ED  •  Nursing", d: "Real-time billable notes across every care setting" },
    { t: "CONTEXTUAL\nREASONING", kw: "Prior Encounters  •  Guidelines  •  Preferences", d: "Deeply contextualized notes from proprietary AI" },
    { t: "REVENUE CYCLE\n& PRIOR AUTH", kw: "Billing Codes  •  Availity  •  Revenue Capture", d: "Captures value lost to under-documentation" },
    { t: "EPIC-NATIVE\nINTEGRATION", kw: "Haiku  •  Canto  •  Hyperdrive  •  1st Pal Partner", d: "The deepest native EHR integration available" },
    { t: "28+\nLANGUAGES", kw: "Spanish  •  Arabic  •  Mandarin  •  Vietnamese", d: "Bilingual support for diverse communities" },
    { t: "ENTERPRISE\nMANAGEMENT", kw: "SSO  •  HIPAA  •  U.S. Data Centers  •  Analytics", d: "Full compliance and deployment management" }
  ];
  off.forEach((o, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = 0.3 + col * 3.2, cy = 0.9 + row * 2.15; // row 2 up by 0.15 (was 2.3)
    const contentW = 2.9;
    const vizCenterX = cx + contentW / 2 + 0.15; // shift SVGs right 0.15"
    const vizY = cy + 0.05;

    // === VISUAL ELEMENT for each offering ===
    if (i === 0) {
      // WAVEFORM
      const waveWidths = [0.3, 0.5, 0.8, 0.4, 0.7, 0.9, 0.5, 0.6, 0.3, 0.7, 0.4, 0.8, 0.35, 0.6, 0.45];
      waveWidths.forEach((w, j) => {
        const bx = cx + 0.45 + j * 0.16; // shifted right 0.15
        const bh = w * 0.5;
        s6.addShape(pres.shapes.RECTANGLE, { x: bx, y: vizY + 0.45 - bh/2, w: 0.1, h: bh, fill: { color: j % 3 === 0 ? RED : BLK } });
      });
    } else if (i === 1) {
      // THINKING BUBBLE — simple black cloud
      const tc = vizCenterX, ty = vizY + 0.3;
      // Cloud body — overlapping ovals
      s6.addShape(pres.shapes.OVAL, { x: tc - 0.35, y: ty - 0.05, w: 0.45, h: 0.4, fill: { color: BLK } });
      s6.addShape(pres.shapes.OVAL, { x: tc + 0.0, y: ty - 0.05, w: 0.4, h: 0.4, fill: { color: BLK } });
      s6.addShape(pres.shapes.OVAL, { x: tc - 0.15, y: ty - 0.2, w: 0.4, h: 0.35, fill: { color: BLK } });
      s6.addShape(pres.shapes.OVAL, { x: tc - 0.45, y: ty + 0.05, w: 0.3, h: 0.25, fill: { color: BLK } });
      s6.addShape(pres.shapes.OVAL, { x: tc + 0.2, y: ty + 0.05, w: 0.3, h: 0.25, fill: { color: BLK } });
      // Trailing thought dots
      s6.addShape(pres.shapes.OVAL, { x: tc - 0.35, y: ty + 0.4, w: 0.12, h: 0.12, fill: { color: BLK } });
      s6.addShape(pres.shapes.OVAL, { x: tc - 0.45, y: ty + 0.52, w: 0.08, h: 0.08, fill: { color: BLK } });
    } else if (i === 2) {
      // REVENUE BARS — shifted right
      const barHeights = [0.2, 0.3, 0.25, 0.4, 0.35, 0.5, 0.6, 0.55, 0.7];
      barHeights.forEach((h, j) => {
        const bx = cx + 0.5 + j * 0.25; // shifted right
        s6.addShape(pres.shapes.RECTANGLE, { x: bx, y: vizY + 0.85 - h, w: 0.18, h: h, fill: { color: j >= 6 ? RED : BLK } });
      });
    } else if (i === 3) {
      // COMPUTER/MONITOR — representing Epic EHR integration
      const mc = vizCenterX, my = vizY + 0.15;
      // Monitor screen
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.45, y: my, w: 0.9, h: 0.55, fill: { color: BLK } });
      // Screen inner (display area)
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.38, y: my + 0.05, w: 0.76, h: 0.4, fill: { color: WHT } });
      // Content lines on screen
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.3, y: my + 0.12, w: 0.35, h: 0.03, fill: { color: BLK } });
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.3, y: my + 0.2, w: 0.5, h: 0.03, fill: { color: BDR } });
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.3, y: my + 0.28, w: 0.4, h: 0.03, fill: { color: BDR } });
      // Red checkmark/indicator on screen
      s6.addShape(pres.shapes.OVAL, { x: mc + 0.15, y: my + 0.1, w: 0.15, h: 0.15, fill: { color: RED } });
      // Monitor stand
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.06, y: my + 0.55, w: 0.12, h: 0.12, fill: { color: BLK } });
      // Monitor base
      s6.addShape(pres.shapes.RECTANGLE, { x: mc - 0.2, y: my + 0.65, w: 0.4, h: 0.05, fill: { color: BLK } });
    } else if (i === 4) {
      // CHAT BUBBLES — multiple speech bubbles representing multilingual conversations
      const bc = vizCenterX, by = vizY + 0.4;
      // Large bubble (left)
      s6.addShape(pres.shapes.RECTANGLE, { x: bc - 0.55, y: by - 0.25, w: 0.6, h: 0.35, fill: { color: BLK }, rectRadius: 0.08 });
      // Lines inside large bubble
      s6.addShape(pres.shapes.RECTANGLE, { x: bc - 0.45, y: by - 0.13, w: 0.4, h: 0.03, fill: { color: WHT } });
      s6.addShape(pres.shapes.RECTANGLE, { x: bc - 0.45, y: by - 0.05, w: 0.25, h: 0.03, fill: { color: WHT } });
      // Medium bubble (right, overlapping)
      s6.addShape(pres.shapes.RECTANGLE, { x: bc + 0.0, y: by - 0.1, w: 0.5, h: 0.3, fill: { color: RED }, rectRadius: 0.08 });
      // Lines inside medium bubble
      s6.addShape(pres.shapes.RECTANGLE, { x: bc + 0.1, y: by + 0.0, w: 0.3, h: 0.03, fill: { color: WHT } });
      s6.addShape(pres.shapes.RECTANGLE, { x: bc + 0.1, y: by + 0.08, w: 0.2, h: 0.03, fill: { color: WHT } });
      // Small bubble (bottom)
      s6.addShape(pres.shapes.RECTANGLE, { x: bc - 0.3, y: by + 0.2, w: 0.45, h: 0.25, fill: { color: BLK }, rectRadius: 0.06 });
      s6.addShape(pres.shapes.RECTANGLE, { x: bc - 0.2, y: by + 0.3, w: 0.25, h: 0.03, fill: { color: WHT } });
    } else {
      // SHIELD — shifted right
      const sc = vizCenterX, sy = vizY + 0.15;
      s6.addShape(pres.shapes.RECTANGLE, { x: sc - 0.4, y: sy, w: 0.8, h: 0.65, fill: { color: BLK } });
      s6.addShape(pres.shapes.RECTANGLE, { x: sc - 0.3, y: sy + 0.08, w: 0.6, h: 0.5, fill: { color: WHT } });
      s6.addShape(pres.shapes.RECTANGLE, { x: sc - 0.15, y: sy + 0.18, w: 0.3, h: 0.03, fill: { color: RED } });
      s6.addShape(pres.shapes.RECTANGLE, { x: sc - 0.15, y: sy + 0.28, w: 0.3, h: 0.03, fill: { color: RED } });
      s6.addShape(pres.shapes.RECTANGLE, { x: sc - 0.15, y: sy + 0.38, w: 0.3, h: 0.03, fill: { color: RED } });
    }

    // Title — centered below visual
    s6.addText(o.t, { x: cx + 0.15, y: cy + 0.95, w: contentW, h: 0.5, fontSize: 14, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
    // Keywords in black box
    s6.addShape(pres.shapes.RECTANGLE, { x: cx + 0.2, y: cy + 1.5, w: contentW - 0.1, h: 0.28, fill: { color: BLK } });
    s6.addText(o.kw, { x: cx + 0.2, y: cy + 1.5, w: contentW - 0.1, h: 0.28, fontSize: 8, fontFace: "Calibri", color: WHT, bold: true, align: "center", valign: "middle", margin: 0 });
    // Description
    s6.addText(o.d, { x: cx + 0.15, y: cy + 1.85, w: contentW, h: 0.3, fontSize: 10, fontFace: "Calibri", color: GRY, align: "center", margin: 0 });
  });
  addFooter(s6);

  // ===== SLIDE 7: COMPETITIVE SUPERIORITY =====
  let s7 = pres.addSlide();
  whiteSlide(s7, "Competitive Superiority");
  s7.addText("Abridge vs. DAX Copilot / Epic Native (Art for Clinicians) / Ambience Healthcare", { x: 0.8, y: 0.85, w: 8.4, h: 0.25, fontSize: 13, fontFace: "Calibri", italic: true, color: GRY, margin: 0 });
  const hdrs = ["Capability", "Abridge", "DAX Copilot", "Epic Art", "Ambience"];
  const cRows = [["KLAS #1 Ambient AI (2025 & 2026)", "Yes", "No", "No", "No"], ["Linked Evidence Traceability", "Yes", "No", "No", "No"], ["Real-Time Note (During Visit)", "Yes", "Delayed", "Limited", "Yes"], ["Epic First Pal Partner", "Yes", "No", "N/A", "Toolbox"], ["50+ Specialties", "55+", "40+", "Early", "45+"], ["28+ Languages", "28+", "12+", "Limited", "20+"], ["Inpatient + ED + Nursing", "Yes", "Limited", "Early", "Yes"], ["Revenue Cycle / Prior Auth", "Yes", "No", "Penny", "Limited"], ["Contextual Reasoning Engine", "Yes", "No", "No", "No"], ["Peer-Reviewed JAMA Evidence", "Yes (2025)", "Yes (2025)", "No", "No"], ["Purpose-Built for Healthcare", "Yes", "No (GPT-4)", "Partial", "Yes"]];
  const cW = [2.7, 1.5, 1.5, 1.3, 1.5], tX = 0.6, tY = 1.15, rH = 0.32, hH = 0.36;
  let hX = tX;
  hdrs.forEach((h, i) => { s7.addShape(pres.shapes.RECTANGLE, { x: hX, y: tY, w: cW[i], h: hH, fill: { color: BLK } }); s7.addText(h, { x: hX, y: tY, w: cW[i], h: hH, fontSize: 12, fontFace: "Trebuchet MS", color: WHT, bold: true, align: "center", valign: "middle", margin: 0 }); hX += cW[i]; });
  cRows.forEach((row, ri) => {
    let rx = tX; const ry = tY + hH + ri * rH; const bg = ri % 2 === 0 ? ALT : WHT;
    row.forEach((cell, ci) => {
      const isGood = ["Yes", "Yes (2025)", "55+", "28+"].includes(cell);
      s7.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: cW[ci], h: rH, fill: { color: bg }, line: { color: BDR, width: 0.3 } });
      let cc = TXT, cb = false, dc = cell;
      if (ci >= 1 && isGood) { dc = "✓  " + cell; cc = "16A34A"; cb = true; }
      else if (["No", "Limited", "Delayed", "Early", "No (GPT-4)", "Partial"].includes(cell)) cc = "DC2626";
      s7.addText(dc, { x: rx, y: ry, w: cW[ci], h: rH, fontSize: 11.5, fontFace: "Calibri", color: cc, bold: cb, align: "center", valign: "middle", margin: 0 });
      rx += cW[ci];
    });
  });
  addFooter(s7);

  // ===== SLIDE 8: REAL-WORLD RESULTS =====
  let s8 = pres.addSlide();
  whiteSlide(s8, "Real-World Results from Peer Health Systems");
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 9.0, h: 0.6, fill: { color: BLK } });
  s8.addText("JAMA Network Open, Oct 2025 — Burnout decreased from 51.9% to 38.8% across 6 health systems after just 30 days.", { x: 0.7, y: 0.95, w: 8.6, h: 0.6, fontSize: 10.5, fontFace: "Calibri", color: WHT, bold: true, margin: 0, valign: "middle" });
  const systems = [
    { name: "WVU MEDICINE", stats: [{ n: "78%", l: "undivided patient attention" }, { n: "61%", l: "cognitive load reduction" }, { n: "77%", l: "work satisfaction increase" }], sub: "2,800 clinicians  •  25 hospitals" },
    { name: "MAYO CLINIC", stats: [{ n: "18.6%", l: "time-in-notes reduction" }, { n: "50%", l: "adoption in 8 weeks" }, { n: "3x", l: "AI note content growth" }], sub: "332 physicians  •  JAMA 2025" },
    { name: "MASS GENERAL BRIGHAM", stats: [{ n: "21.2%", l: "burnout reduction at 84 days" }, { n: "3,000+", l: "providers using ambient AI" }, { n: "30.7%", l: "doc well-being increase" }], sub: "1,430 clinicians  •  JAMA 2025" }
  ];
  systems.forEach((sys, i) => {
    const cx = 0.5 + i * 3.15;
    s8.addText(sys.name, { x: cx, y: 1.75, w: 2.95, h: 0.3, fontSize: 10, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", charSpacing: 2, margin: 0 });
    s8.addShape(pres.shapes.RECTANGLE, { x: cx + 0.5, y: 2.08, w: 1.95, h: 0.01, fill: { color: RED } });
    sys.stats.forEach((st, j) => {
      const sy = 2.2 + j * 0.8;
      s8.addText(st.n, { x: cx, y: sy, w: 2.95, h: 0.4, fontSize: 28, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
      s8.addText(st.l, { x: cx, y: sy + 0.4, w: 2.95, h: 0.25, fontSize: 10, fontFace: "Calibri", color: GRY, align: "center", margin: 0 });
    });
    s8.addText(sys.sub, { x: cx, y: 4.7, w: 2.95, h: 0.2, fontSize: 8, fontFace: "Calibri", color: LTGRY, italic: true, align: "center", margin: 0 });
    if (i < 2) s8.addShape(pres.shapes.RECTANGLE, { x: cx + 3.05, y: 1.75, w: 0.01, h: 3.1, fill: { color: BDR } });
  });
  addFooter(s8);

  // ===== SLIDE 9: PARTNERSHIP ROADMAP — zigzag timeline =====
  let s9 = pres.addSlide();
  whiteSlide(s9, "Partnership Roadmap");
  s9.addText("A phased approach to enterprise-wide deployment across Houston Methodist.", { x: 0.8, y: 0.85, w: 8.4, h: 0.3, fontSize: 13, fontFace: "Calibri", italic: true, color: GRY, margin: 0 });

  // Horizontal timeline line
  const tlY = 3.3;
  s9.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: tlY, w: 8.8, h: 0.05, fill: { color: BLK } });

  const phases = [
    { q: "Q2 2026", t: "Outpatient Expansion", d: "Scale to all 6,000+ clinicians across 150+ ambulatory sites and deepen ED coverage", above: true },
    { q: "Q3 2026", t: "Inpatient Deployment", d: "PLACEHOLDER", above: false },
    { q: "Q4 2026", t: "Revenue Cycle Optimization", d: "Prior auth automation, discharge summaries, and smart billing code alignment", above: true },
    { q: "Q1 2027", t: "Analytics & Innovation", d: "Outcomes reporting, advanced analytics, and joint innovation council", above: false }
  ];
  const connBarW = 0.03;
  const connBarH = 0.2;
  phases.forEach((p, i) => {
    const cx = 0.8 + i * 2.3;
    const textW = 1.9;
    const textCenter = cx + textW / 2;
    const dSize = 0.18;
    const dOuterOffset = dSize * 0.72 + 0.03;
    // Diamond centered on text center
    s9.addShape(pres.shapes.RECTANGLE, { x: textCenter - dSize/2, y: tlY - dSize/2 + 0.025, w: dSize, h: dSize, fill: { color: RED }, rectRadius: 0.02, rotate: 45 });

    if (p.above) {
      s9.addText(p.q, { x: cx, y: tlY - 1.65, w: textW, h: 0.3, fontSize: 13, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", margin: 0 });
      s9.addText(p.t, { x: cx, y: tlY - 1.35, w: textW, h: 0.35, fontSize: 12, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
      s9.addText(p.d, { x: cx, y: tlY - 0.95, w: textW, h: 0.7, fontSize: 10, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });
      const barTop = tlY + 0.025 - dOuterOffset;
      s9.addShape(pres.shapes.RECTANGLE, { x: textCenter - connBarW/2, y: barTop - connBarH, w: connBarW, h: connBarH, fill: { color: BDR } });
    } else {
      const barBottom = tlY + 0.025 + dOuterOffset;
      s9.addShape(pres.shapes.RECTANGLE, { x: textCenter - connBarW/2, y: barBottom, w: connBarW, h: connBarH, fill: { color: BDR } });
      s9.addText(p.q, { x: cx, y: tlY + 0.4, w: textW, h: 0.3, fontSize: 13, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", margin: 0 });
      s9.addText(p.t, { x: cx, y: tlY + 0.7, w: textW, h: 0.35, fontSize: 12, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
      s9.addText(p.d, { x: cx, y: tlY + 1.05, w: textW, h: 0.7, fontSize: 10, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });
    }
  });
  addFooter(s9);

  // ===== SLIDE 10: ROI & KPIs =====
  let s10 = pres.addSlide();
  whiteSlide(s10, "Projected ROI & Key Performance Indicators");
  const kpis = [{ v: "2–4 hrs", l: "Saved per clinician\nper day" }, { v: "15%+", l: "Patient throughput\nincrease" }, { v: "~14%", l: "Burnout reduction\n(JAMA)" }, { v: "$5+", l: "Revenue capture\nper visit" }];
  kpis.forEach((k, i) => {
    const cx = 0.5 + i * 2.35;
    s10.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.0, w: 2.15, h: 1.2, fill: { color: WHT }, line: { color: BDR, width: 0.3 } });
    s10.addText(k.v, { x: cx, y: 1.05, w: 2.15, h: 0.5, fontSize: 24, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", valign: "middle", margin: 0 });
    s10.addText(k.l, { x: cx, y: 1.6, w: 2.15, h: 0.5, fontSize: 11, fontFace: "Calibri", color: TXT, align: "center", valign: "top", margin: 0 });
  });
  // Financial Impact Model — full width, visually prominent
  s10.addText("Financial Impact Model", { x: 0.5, y: 2.45, w: 9.0, h: 0.35, fontSize: 16, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
  s10.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 2.85, w: 5.0, h: 0.02, fill: { color: RED } });

  // ROI items as horizontal spread with big numbers
  const roi = [
    { label: "Physician\nRetention", val: "$3M–$5M" },
    { label: "Additional\nAccess Revenue", val: "$4M–$8M" },
    { label: "Coding\nAccuracy", val: "$2M–$4M" },
    { label: "Prior Auth\nEfficiency", val: "$1M–$2M" },
    { label: "Reduced\nLocum Costs", val: "$1M–$3M" }
  ];
  roi.forEach((r, i) => {
    const rx = 0.3 + i * 1.9;
    s10.addText(r.val, { x: rx, y: 3.05, w: 1.7, h: 0.4, fontSize: 18, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", margin: 0 });
    s10.addText(r.label, { x: rx, y: 3.5, w: 1.7, h: 0.45, fontSize: 9.5, fontFace: "Calibri", color: GRY, align: "center", margin: 0 });
    if (i < 4) s10.addShape(pres.shapes.RECTANGLE, { x: rx + 1.8, y: 3.1, w: 0.01, h: 0.7, fill: { color: BDR } });
  });

  // Total — clean centered layout, not a heavy banner
  s10.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 4.15, w: 6.0, h: 0.01, fill: { color: BLK } });
  s10.addText("Total Estimated Annual Value", { x: 0, y: 4.3, w: 10, h: 0.3, fontSize: 12, fontFace: "Calibri", color: GRY, align: "center", margin: 0 });
  s10.addText("$11M – $22M+", { x: 0, y: 4.6, w: 10, h: 0.45, fontSize: 32, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", valign: "middle", margin: 0 });
  addFooter(s10);

  // ===== SLIDE 11: NEXT STEPS TIMELINE — bold visual =====
  let s11 = pres.addSlide();
  whiteSlide(s11, "Proposed Next Steps");

  // Full-width bold timeline
  const nsY = 2.5;
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: nsY, w: 9.0, h: 0.06, fill: { color: BLK } });

  const nextSteps = [
    { time: "WEEK 1–2", t: "Executive\nAlignment", d: "Confirm enterprise partnership scope and strategic priorities" },
    { time: "WEEK 3–4", t: "Technical\nValidation", d: "PLACEHOLDER" },
    { time: "WEEK 5–8", t: "Clinical\nChampions", d: "Identify specialty leads to co-design deployment across all 8 hospitals" },
    { time: "Q3 2026", t: "Enterprise\nGo-Live", d: "Begin phased deployment — outpatient, inpatient, ED, nursing" }
  ];
  nextSteps.forEach((ns, i) => {
    const cx = 0.7 + i * 2.25;
    const textW = 1.8;
    const textCenter = cx + textW / 2;
    const dSize = 0.2;
    // Diamond dead-centered on text center
    s11.addShape(pres.shapes.RECTANGLE, { x: textCenter - dSize/2, y: nsY - dSize/2 + 0.03, w: dSize, h: dSize, fill: { color: RED }, rectRadius: 0.02, rotate: 45 });
    // Time above — same width and x as text
    s11.addText(ns.time, { x: cx, y: nsY - 0.9, w: textW, h: 0.25, fontSize: 11, fontFace: "Trebuchet MS", color: RED, bold: true, align: "center", charSpacing: 2, margin: 0 });
    // Title — same width and x
    s11.addText(ns.t, { x: cx, y: nsY - 0.65, w: textW, h: 0.5, fontSize: 16, fontFace: "Trebuchet MS", color: BLK, bold: true, align: "center", valign: "bottom", margin: 0 });
    // Description below — same width and x
    s11.addText(ns.d, { x: cx, y: nsY + 0.3, w: textW, h: 0.8, fontSize: 10.5, fontFace: "Calibri", color: TXT, align: "center", margin: 0 });
  });

  s11.addText("abridge.com  |  partnership@abridge.com", { x: 0, y: 4.85, w: 10, h: 0.3, fontSize: 11, fontFace: "Calibri", color: BLK, bold: true, align: "center", margin: 0 });
  addFooter(s11);

  await pres.writeFile({ fileName: "/home/assets/Abridge_Houston_Methodist.pptx" });
  console.log("Done!");
}
main().catch(console.error);
