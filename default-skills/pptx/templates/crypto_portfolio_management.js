const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBitcoin, FaEthereum, FaChartLine, FaShieldAlt, FaLayerGroup,
  FaLink, FaCoins, FaArrowUp, FaArrowDown, FaCheckCircle, FaBullseye,
  FaNetworkWired, FaCubes, FaWallet, FaExchangeAlt, FaGlobe
} = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ─── COLORS (Midnight Executive + Crypto accent) ───
const C = {
  navy:      "0F1B2D",
  darkNavy:  "0A1220",
  slate:     "1A2A42",
  steel:     "2D4466",
  ice:       "CADCFC",
  lightIce:  "E8F0FE",
  white:     "FFFFFF",
  accent:    "00C9A7",  // mint/teal
  accent2:   "3B82F6",  // blue
  accent3:   "F59E0B",  // amber
  orange:    "F97316",
  red:       "EF4444",
  green:     "10B981",
  gray:      "94A3B8",
  lightGray: "F1F5F9",
  darkText:  "1E293B",
  bodyText:  "475569",
};

const FONT_H = "Georgia";
const FONT_B = "Calibri";

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.18 });

// ─── TOKENS DATA ───
const tokens = [
  {
    name: "Bitcoin (BTC)", theme: "Store of Value / Digital Gold",
    icon: FaBitcoin, color: "F7931A",
    desc: "The original cryptocurrency and largest by market cap. Functions as a decentralized, censorship-resistant store of value with a fixed supply of 21M coins. Institutional adoption accelerated with spot ETF approvals in Jan 2024.",
    why: "Portfolio anchor; macro hedge against fiat debasement; deepest liquidity; strongest brand recognition; spot ETFs opened ~$60B+ institutional inflows.",
    prices: { "Jan 21": 29000, "Jan 22": 47000, "Jan 23": 16500, "Jan 24": 42000, "Jan 25": 94000, "Apr 26": 71400 },
    ath: "$109K (Jan 2025)", mcap: "$1.33T"
  },
  {
    name: "Ethereum (ETH)", theme: "Smart Contract Platform / DeFi Base Layer",
    icon: FaEthereum, color: "627EEA",
    desc: "The leading programmable blockchain. Hosts the majority of DeFi, NFT, and layer-2 ecosystems. Transitioned to Proof-of-Stake (The Merge, Sep 2022), reducing energy use ~99.95%. Dencun upgrade (Mar 2024) slashed L2 costs.",
    why: "De facto settlement layer for DeFi; ~$50B+ TVL; deflationary supply post-Merge; broadest developer ecosystem; spot ETFs approved May 2024.",
    prices: { "Jan 21": 730, "Jan 22": 3700, "Jan 23": 1200, "Jan 24": 2300, "Jan 25": 3400, "Apr 26": 2254 },
    ath: "$4,878 (Aug 2025)", mcap: "$233B"
  },
  {
    name: "Solana (SOL)", theme: "High-Performance L1 / Consumer Crypto",
    icon: FaGlobe, color: "9945FF",
    desc: "Ultra-fast Layer-1 chain processing 65K+ TPS at sub-cent fees. Dominant chain for memecoin trading (Pump.fun), consumer apps, and DePIN. Firedancer validator client targets institutional-grade reliability.",
    why: "Fastest-growing L1 ecosystem; #2 in developer activity; spot ETF approved Oct 2025 with staking yield; DEX volume surpassed Ethereum for 10 consecutive months in 2024.",
    prices: { "Jan 21": 1.5, "Jan 22": 170, "Jan 23": 10, "Jan 24": 100, "Jan 25": 189, "Apr 26": 82 },
    ath: "$294 (Jan 2025)", mcap: "$40B"
  },
  {
    name: "Chainlink (LINK)", theme: "Oracle Infrastructure / Data Layer",
    icon: FaLink, color: "375BD2",
    desc: "The dominant decentralized oracle network, connecting smart contracts to real-world data. Secures $95B+ in value across 1,000+ protocol integrations. Expanding into CCIP (cross-chain messaging) and tokenized RWAs.",
    why: "Critical infrastructure for all DeFi; no credible competitor at scale; CCIP positions it as the TCP/IP of cross-chain; partnerships with SWIFT, Google Cloud, major banks.",
    prices: { "Jan 21": 12, "Jan 22": 25, "Jan 23": 6, "Jan 24": 15, "Jan 25": 22, "Apr 26": 9 },
    ath: "$52.70 (May 2021)", mcap: "$6.2B"
  },
  {
    name: "Aave (AAVE)", theme: "DeFi Lending / Yield Protocol",
    icon: FaCoins, color: "B6509E",
    desc: "The largest decentralized lending protocol. Users deposit crypto to earn yield or borrow against holdings. $141.8M net revenue in 2025 (+57% YoY). TVL peaked at $75B. Launched GHO stablecoin and Aave V4 (Mar 2026).",
    why: "Dominant DeFi lending market share; revenue compounding at ~57%/yr; Grayscale filed for spot AAVE ETF (Feb 2026); Ethereum Foundation deposited $82M into Aave—strongest institutional signal.",
    prices: { "Jan 21": 88, "Jan 22": 255, "Jan 23": 55, "Jan 24": 100, "Jan 25": 280, "Apr 26": 93 },
    ath: "$663 (May 2021)", mcap: "$1.4B"
  },
  {
    name: "Polkadot (DOT)", theme: "Interoperability / Layer-0 Multi-Chain",
    icon: FaNetworkWired, color: "E6007A",
    desc: "A Layer-0 protocol enabling multiple blockchains (parachains) to communicate and share security via its Relay Chain. Founded by Ethereum co-founder Gavin Wood. Agile Coretime upgrade replaced rigid parachain auctions.",
    why: "Only major L0 interoperability play; first spot DOT ETF launched (21Shares TDOT on Nasdaq); supply cap introduced Mar 2026 with emission cuts; deep governance innovation.",
    prices: { "Jan 21": 9, "Jan 22": 28, "Jan 23": 5, "Jan 24": 8, "Jan 25": 7, "Apr 26": 1.25 },
    ath: "$55 (Nov 2021)", mcap: "$2.1B"
  }
];

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Crypto Portfolio Strategy";
  pres.title = "Diversified Crypto Portfolio Tracker | Jan 2021 – Apr 2026";

  // Preload icons
  const icons = {};
  for (const t of tokens) {
    icons[t.name] = await iconToBase64Png(t.icon, "#" + t.color, 256);
  }
  const iconCheck = await iconToBase64Png(FaCheckCircle, "#" + C.accent, 256);
  const iconBullseye = await iconToBase64Png(FaBullseye, "#" + C.white, 256);
  const iconChart = await iconToBase64Png(FaChartLine, "#" + C.accent, 256);
  const iconShield = await iconToBase64Png(FaShieldAlt, "#" + C.accent, 256);
  const iconLayer = await iconToBase64Png(FaLayerGroup, "#" + C.accent, 256);
  const iconWallet = await iconToBase64Png(FaWallet, "#" + C.accent, 256);

  // ════════════════════════════════════════════
  // SLIDE 1: TITLE
  // ════════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.darkNavy };
  // Accent bar top
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  // Subtle grid pattern via thin lines
  for (let i = 0; i < 10; i++) {
    s1.addShape(pres.shapes.LINE, { x: i, y: 0, w: 0, h: 5.625, line: { color: C.slate, width: 0.3 } });
  }
  s1.addText("DIVERSIFIED CRYPTO\nPORTFOLIO TRACKER", {
    x: 0.8, y: 1.2, w: 8.4, h: 2.2,
    fontSize: 40, fontFace: FONT_H, color: C.white, bold: true,
    lineSpacingMultiple: 1.15, align: "left", margin: 0
  });
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.5, w: 1.5, h: 0.04, fill: { color: C.accent } });
  s1.addText("January 2021 – April 2026  |  6 Tokens Across 6 Themes", {
    x: 0.8, y: 3.7, w: 8.4, h: 0.5,
    fontSize: 16, fontFace: FONT_B, color: C.ice, italic: true, margin: 0
  });
  s1.addText("CONFIDENTIAL  •  FOR DISCUSSION PURPOSES ONLY", {
    x: 0.8, y: 4.9, w: 6, h: 0.4,
    fontSize: 9, fontFace: FONT_B, color: C.steel, charSpacing: 3, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDE 2: EXECUTIVE SUMMARY
  // ════════════════════════════════════════════
  let s2 = pres.addSlide();
  s2.background = { color: C.white };
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  s2.addText("EXECUTIVE SUMMARY", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
  });
  s2.addText("A thesis-driven portfolio spanning six distinct crypto themes to capture asymmetric upside while managing concentration risk.", {
    x: 0.5, y: 0.95, w: 9, h: 0.55,
    fontSize: 13, fontFace: FONT_B, color: C.bodyText, margin: 0
  });

  // 3 key insight cards
  const insights = [
    { title: "MARKET CONTEXT", body: "Crypto total market cap peaked at ~$3.7T in late 2024/early 2025 before a correction phase. BTC spot ETFs alone attracted $60B+ in cumulative inflows. Institutional participation is now structural, not cyclical.", icon: iconChart },
    { title: "PORTFOLIO DESIGN", body: "Six tokens selected across: Store of Value, Smart Contracts, High-Perf L1, Oracle Infra, DeFi Lending, and Interoperability. Each represents a differentiated thesis on crypto's value chain.", icon: iconLayer },
    { title: "KEY RISK FACTORS", body: "Macro rate environment, regulatory shifts, smart contract vulnerabilities, and high correlation during risk-off events remain primary concerns. Position sizing and rebalancing discipline are critical.", icon: iconShield },
  ];
  insights.forEach((ins, i) => {
    const y = 1.75 + i * 1.2;
    s2.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 9, h: 1.05,
      fill: { color: C.lightGray },
      shadow: { type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.06 }
    });
    s2.addImage({ data: ins.icon, x: 0.7, y: y + 0.2, w: 0.45, h: 0.45 });
    s2.addText(ins.title, {
      x: 1.35, y: y + 0.08, w: 7.9, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.navy, bold: true, charSpacing: 2, margin: 0
    });
    s2.addText(ins.body, {
      x: 1.35, y: y + 0.38, w: 7.9, h: 0.6,
      fontSize: 10.5, fontFace: FONT_B, color: C.bodyText, margin: 0
    });
  });
  s2.addText("Source: CoinMarketCap, CoinGecko, Bitwise, public filings | Data as of April 2026", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 8, fontFace: FONT_B, color: C.gray, italic: true, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDE 3: PORTFOLIO COMPOSITION
  // ════════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.white };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  s3.addText("PORTFOLIO COMPOSITION", {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
  });
  s3.addText("Six tokens diversified across distinct crypto value-chain themes", {
    x: 0.5, y: 0.85, w: 9, h: 0.4,
    fontSize: 12, fontFace: FONT_B, color: C.bodyText, margin: 0
  });

  // 2x3 grid of token cards
  const allocs = [
    { name: "BTC", pct: "30%", theme: "Store of Value", color: "F7931A" },
    { name: "ETH", pct: "25%", theme: "Smart Contracts", color: "627EEA" },
    { name: "SOL", pct: "15%", theme: "High-Perf L1", color: "9945FF" },
    { name: "LINK", pct: "12%", theme: "Oracle Infra", color: "375BD2" },
    { name: "AAVE", pct: "10%", theme: "DeFi Lending", color: "B6509E" },
    { name: "DOT", pct: "8%", theme: "Interoperability", color: "E6007A" }
  ];
  allocs.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.5 + row * 1.85;
    // Card bg
    s3.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.85, h: 1.6,
      fill: { color: C.lightGray },
      shadow: { type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.06 }
    });
    // Accent left bar
    s3.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.6, fill: { color: a.color } });
    // Token icon
    const tokenData = tokens.find(t => t.name.includes(a.name));
    if (tokenData && icons[tokenData.name]) {
      s3.addImage({ data: icons[tokenData.name], x: x + 0.2, y: y + 0.2, w: 0.4, h: 0.4 });
    }
    // Allocation %
    s3.addText(a.pct, {
      x: x + 0.7, y: y + 0.1, w: 1.8, h: 0.55,
      fontSize: 28, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
    });
    // Token name
    s3.addText(a.name, {
      x: x + 0.7, y: y + 0.55, w: 1.8, h: 0.35,
      fontSize: 14, fontFace: FONT_B, color: C.darkText, bold: true, margin: 0
    });
    // Theme
    s3.addText(a.theme, {
      x: x + 0.2, y: y + 1.05, w: 2.4, h: 0.4,
      fontSize: 10, fontFace: FONT_B, color: C.bodyText, margin: 0
    });
  });

  s3.addText("Source: Suggested model portfolio allocation based on theme diversification and liquidity", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 8, fontFace: FONT_B, color: C.gray, italic: true, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDE 4: PRICE PERFORMANCE CHART
  // ════════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.white };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  s4.addText("PRICE PERFORMANCE: JAN 2021 – APR 2026", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
  });
  s4.addText("Approximate prices at key annual snapshots (USD)", {
    x: 0.5, y: 0.78, w: 9, h: 0.35,
    fontSize: 12, fontFace: FONT_B, color: C.bodyText, margin: 0
  });

  // Table of prices
  const periods = ["Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Apr 26"];
  const headerRow = [
    { text: "Token", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: FONT_B, align: "left" } },
    ...periods.map(p => ({ text: p, options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: FONT_B, align: "center" } })),
    { text: "ATH", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: FONT_B, align: "center" } },
    { text: "MCap", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, fontFace: FONT_B, align: "center" } }
  ];

  const dataRows = tokens.map((t, i) => {
    const bg = i % 2 === 0 ? C.lightGray : C.white;
    const priceVals = periods.map(p => t.prices[p]);
    return [
      { text: t.name.split(" (")[0], options: { fill: { color: bg }, color: C.darkText, bold: true, fontSize: 10, fontFace: FONT_B, align: "left" } },
      ...priceVals.map(v => ({
        text: v >= 1000 ? "$" + v.toLocaleString() : v >= 1 ? "$" + v.toFixed(0) : "$" + v.toFixed(2),
        options: { fill: { color: bg }, color: C.darkText, fontSize: 10, fontFace: FONT_B, align: "center" }
      })),
      { text: t.ath, options: { fill: { color: bg }, color: C.green, fontSize: 9, fontFace: FONT_B, align: "center", bold: true } },
      { text: t.mcap, options: { fill: { color: bg }, color: C.darkText, fontSize: 9, fontFace: FONT_B, align: "center" } }
    ];
  });

  s4.addTable([headerRow, ...dataRows], {
    x: 0.35, y: 1.3, w: 9.3,
    colW: [1.3, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.1, 0.9],
    border: { pt: 0.5, color: "E2E8F0" },
    rowH: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
    margin: [3, 5, 3, 5]
  });

  s4.addText("Source: CoinMarketCap, CoinGecko | Prices approximate month-open values", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 8, fontFace: FONT_B, color: C.gray, italic: true, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDES 5-10: INDIVIDUAL TOKEN DEEP DIVES
  // ════════════════════════════════════════════
  for (const t of tokens) {
    let s = pres.addSlide();
    s.background = { color: C.white };
    // Left color bar matching token
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: t.color } });

    // Header area
    s.addImage({ data: icons[t.name], x: 0.5, y: 0.25, w: 0.5, h: 0.5 });
    s.addText(t.name.toUpperCase(), {
      x: 1.15, y: 0.25, w: 6, h: 0.5,
      fontSize: 24, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
    });
    // Theme tag
    s.addShape(pres.shapes.RECTANGLE, {
      x: 1.15, y: 0.8, w: 3, h: 0.3,
      fill: { color: t.color, transparency: 85 }
    });
    s.addText(t.theme.toUpperCase(), {
      x: 1.25, y: 0.8, w: 2.9, h: 0.3,
      fontSize: 9, fontFace: FONT_B, color: t.color, bold: true, charSpacing: 2, margin: 0
    });

    // Current price + MCap
    s.addText([
      { text: "Current: ", options: { fontSize: 11, fontFace: FONT_B, color: C.bodyText } },
      { text: Object.values(t.prices).slice(-1)[0] >= 1000 ? "$" + Object.values(t.prices).slice(-1)[0].toLocaleString() : "$" + Object.values(t.prices).slice(-1)[0], options: { fontSize: 14, fontFace: FONT_B, color: C.navy, bold: true } },
      { text: "   |   ATH: ", options: { fontSize: 11, fontFace: FONT_B, color: C.bodyText } },
      { text: t.ath, options: { fontSize: 11, fontFace: FONT_B, color: C.green, bold: true } },
      { text: "   |   MCap: ", options: { fontSize: 11, fontFace: FONT_B, color: C.bodyText } },
      { text: t.mcap, options: { fontSize: 11, fontFace: FONT_B, color: C.navy, bold: true } },
    ], { x: 0.5, y: 1.2, w: 9.0, h: 0.35, margin: 0 });

    // Overview section
    s.addText("OVERVIEW", {
      x: 0.5, y: 1.7, w: 4.2, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.navy, bold: true, charSpacing: 2, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.98, w: 4.2, h: 0.02, fill: { color: "E2E8F0" } });
    s.addText(t.desc, {
      x: 0.5, y: 2.08, w: 4.2, h: 1.3,
      fontSize: 10.5, fontFace: FONT_B, color: C.bodyText, margin: 0, lineSpacingMultiple: 1.3
    });

    // Investment thesis section
    s.addText("INVESTMENT THESIS", {
      x: 5.2, y: 1.7, w: 4.3, h: 0.3,
      fontSize: 11, fontFace: FONT_B, color: C.navy, bold: true, charSpacing: 2, margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.98, w: 4.3, h: 0.02, fill: { color: "E2E8F0" } });
    s.addImage({ data: iconCheck, x: 5.2, y: 2.15, w: 0.25, h: 0.25 });
    s.addText(t.why, {
      x: 5.55, y: 2.08, w: 3.95, h: 1.3,
      fontSize: 10.5, fontFace: FONT_B, color: C.bodyText, margin: 0, lineSpacingMultiple: 1.3
    });

    // Bar chart as image (renders in all viewers)
    const shortName = t.name.match(/\((\w+)\)/)[1];
    s.addImage({ path: `/home/assets/charts/${shortName}_bar.png`, x: 0.5, y: 3.5, w: 9, h: 1.8 });

    s.addText("Source: CoinMarketCap, CoinGecko | Approximate month-open prices", {
      x: 0.5, y: 5.2, w: 9, h: 0.3,
      fontSize: 8, fontFace: FONT_B, color: C.gray, italic: true, margin: 0
    });
  }

  // ════════════════════════════════════════════
  // SLIDE 11: KEY MARKET EVENTS TIMELINE
  // ════════════════════════════════════════════
  let s11 = pres.addSlide();
  s11.background = { color: C.white };
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  s11.addText("KEY MARKET EVENTS TIMELINE", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
  });
  s11.addText("Major catalysts and drawdowns shaping the 2021–2026 crypto cycle", {
    x: 0.5, y: 0.78, w: 9, h: 0.35,
    fontSize: 12, fontFace: FONT_B, color: C.bodyText, margin: 0
  });

  const events = [
    { year: "2021", label: "Bull Peak", detail: "BTC $69K, SOL $260, AAVE $663. Tesla buys $1.5B BTC. El Salvador legal tender.", color: C.green },
    { year: "2022", label: "Crypto Winter", detail: "Terra/LUNA collapse, Celsius, 3AC, FTX bankruptcy. BTC -77% to $16K. SOL -97% to $8.", color: C.red },
    { year: "2023", label: "Recovery", detail: "BTC +157%. Visa settles USDC on Solana. BlackRock files BTC ETF. Aave TVL rebuilds.", color: C.accent2 },
    { year: "2024", label: "ETF Era Begins", detail: "11 spot BTC ETFs approved Jan 10. BTC halving Apr 20. BTC crosses $100K in Dec. ETH ETF May.", color: C.accent },
    { year: "2025", label: "New ATHs", detail: "BTC $109K, SOL $294, ETH $4.9K. Solana ETF w/ staking. Tariff & macro correction in Q2-Q4.", color: C.orange },
    { year: "2026", label: "Consolidation", detail: "Aave V4 launches. DOT supply cap. Grayscale AAVE ETF filed. Broad market correction continues.", color: C.steel },
  ];

  // Horizontal timeline
  const lineY = 2.3;
  s11.addShape(pres.shapes.LINE, { x: 0.7, y: lineY, w: 8.6, h: 0, line: { color: C.navy, width: 2 } });
  events.forEach((e, i) => {
    const x = 0.7 + i * 1.55;
    // Circle dot
    s11.addShape(pres.shapes.OVAL, { x: x + 0.15, y: lineY - 0.12, w: 0.24, h: 0.24, fill: { color: e.color } });
    // Year label
    s11.addText(e.year, {
      x: x - 0.15, y: lineY - 0.55, w: 0.85, h: 0.35,
      fontSize: 14, fontFace: FONT_H, color: C.navy, bold: true, align: "center", margin: 0
    });
    // Event label
    s11.addText(e.label, {
      x: x - 0.25, y: lineY + 0.3, w: 1.1, h: 0.35,
      fontSize: 10, fontFace: FONT_B, color: e.color, bold: true, align: "center", margin: 0
    });
    // Detail
    s11.addText(e.detail, {
      x: x - 0.35, y: lineY + 0.65, w: 1.3, h: 1.8,
      fontSize: 8.5, fontFace: FONT_B, color: C.bodyText, align: "center", margin: 0, lineSpacingMultiple: 1.25
    });
  });

  s11.addText("Source: Public market data, regulatory filings, protocol announcements", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    fontSize: 8, fontFace: FONT_B, color: C.gray, italic: true, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDE 12: RISK FRAMEWORK
  // ════════════════════════════════════════════
  let s12 = pres.addSlide();
  s12.background = { color: C.white };
  s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent } });
  s12.addText("RISK FRAMEWORK & CONSIDERATIONS", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, fontFace: FONT_H, color: C.navy, bold: true, margin: 0
  });

  const risks = [
    { cat: "MACRO", items: "Interest rate sensitivity; correlation with equities during risk-off; USD strength impact on crypto flows; recession scenarios." },
    { cat: "REGULATORY", items: "SEC enforcement actions; staking yield classification; cross-border compliance divergence; stablecoin legislation." },
    { cat: "TECHNICAL", items: "Smart contract exploits; oracle manipulation; bridge hacks; network outages (Solana history); MEV extraction." },
    { cat: "CONCENTRATION", items: "BTC dominance at ~60%; high intra-crypto correlation in downturns; liquidity fragmentation across L1/L2s." },
  ];
  risks.forEach((r, i) => {
    const y = 1.1 + i * 1.05;
    s12.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 9, h: 0.9,
      fill: { color: i % 2 === 0 ? C.lightGray : C.white },
    });
    s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.9, fill: { color: C.red } });
    s12.addText(r.cat, {
      x: 0.75, y: y + 0.05, w: 1.5, h: 0.35,
      fontSize: 12, fontFace: FONT_B, color: C.navy, bold: true, margin: 0
    });
    s12.addText(r.items, {
      x: 0.75, y: y + 0.38, w: 8.5, h: 0.48,
      fontSize: 10, fontFace: FONT_B, color: C.bodyText, margin: 0
    });
  });

  // Disclaimer box
  s12.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.0, w: 9, h: 0.5,
    fill: { color: C.lightGray }
  });
  s12.addText("DISCLAIMER: This document is for informational purposes only and does not constitute investment advice. Cryptocurrency investments are highly volatile and speculative. Past performance does not guarantee future results.", {
    x: 0.65, y: 5.05, w: 8.7, h: 0.42,
    fontSize: 8, fontFace: FONT_B, color: C.bodyText, italic: true, margin: 0
  });

  // ════════════════════════════════════════════
  // SLIDE 13: CLOSING
  // ════════════════════════════════════════════
  let s13 = pres.addSlide();
  s13.background = { color: C.darkNavy };
  s13.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent } });
  for (let i = 0; i < 10; i++) {
    s13.addShape(pres.shapes.LINE, { x: i, y: 0, w: 0, h: 5.625, line: { color: C.slate, width: 0.3 } });
  }
  s13.addImage({ data: iconBullseye, x: 4.5, y: 1.2, w: 1, h: 1 });
  s13.addText("KEY TAKEAWAY", {
    x: 1, y: 2.4, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_B, color: C.accent, bold: true, charSpacing: 4, align: "center", margin: 0
  });
  s13.addText("A diversified, thesis-driven crypto portfolio\ncaptures asymmetric upside across the value chain\nwhile disciplined sizing manages downside risk.", {
    x: 1, y: 2.9, w: 8, h: 1.3,
    fontSize: 22, fontFace: FONT_H, color: C.white, align: "center", lineSpacingMultiple: 1.3, margin: 0
  });
  s13.addText("CONFIDENTIAL  •  FOR DISCUSSION PURPOSES ONLY", {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 9, fontFace: FONT_B, color: C.steel, charSpacing: 3, align: "center", margin: 0
  });

  await pres.writeFile({ fileName: "/home/assets/crypto_portfolio.pptx" });
  console.log("Presentation saved!");
}

build().catch(e => console.error(e));
