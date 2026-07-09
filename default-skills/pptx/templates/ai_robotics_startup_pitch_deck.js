// Phyzix YC W26 deck — recreated with pptxgenjs
// Aesthetic: technical-drawing / engineering-blueprint look
//   - cool neutral gray field (BAB9B7) — composite of cream paper + translucent navy overlays
//   - deep navy ink (0F1A2E), electric blue annotations (1E5FFF), orange accent (FF5B1F)
//   - thin border frames everything; corner title-block bottom-right; figure callouts at top
//   - blueprint-style SVG illustrations (rasterized via sharp) populate the picture slots
//
// Run:  node build_phyzix.js
// Deps: npm install pptxgenjs sharp
// Output: Deliverable_10.pptx in the current directory.

const pptxgen = require("pptxgenjs");
const sharp   = require("sharp");

// =============================================================================
// INLINED ILLUSTRATIONS MODULE
// Technical-drawing SVG illustrations for the Phyzix deck.
// Each function returns an SVG string that gets rasterized to PNG via sharp.
// =============================================================================
// illustrations.js — Technical-drawing SVG illustrations for the Phyzix deck.
// Each function returns an SVG string that can be rasterized to a PNG via sharp.

const ILL_INK    = "#0F1A2E";
const ILL_INK2   = "#2A3654";
const ILL_ORANGE = "#FF5B1F";
const ILL_BLUE   = "#1E5FFF";
const ILL_MUTED  = "#6B6655";

// Common helper: a dashed annotation line with end-ticks (dimension line)
function dimLine(x1, y1, x2, y2, label, opts = {}) {
    const color = opts.color || ILL_INK;
    const t = 6; // tick length
    const horiz = y1 === y2;
    const tick1 = horiz
        ? `M${x1} ${y1 - t} L${x1} ${y1 + t}`
        : `M${x1 - t} ${y1} L${x1 + t} ${y1}`;
    const tick2 = horiz
        ? `M${x2} ${y2 - t} L${x2} ${y2 + t}`
        : `M${x2 - t} ${y2} L${x2 + t} ${y2}`;
    const lbl = label
        ? `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${color}">${label}</text>`
        : "";
    return `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" stroke-dasharray="4 4"/>
        <path d="${tick1}" stroke="${color}" stroke-width="1.5" fill="none"/>
        <path d="${tick2}" stroke="${color}" stroke-width="1.5" fill="none"/>
        ${lbl}`;
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Exploded robot / "general assembly" blueprint
// 1200x1400 viewbox to roughly match aspect of placeholder (6.25 x 7.29)
// ---------------------------------------------------------------------------
function slide1Illustration() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1400">
        <!-- crosshair grid background -->
        <g stroke="${ILL_INK}" stroke-opacity="0.12" stroke-width="1">
            ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1400"/>`).join("")}
        </g>

        <!-- corner registration crosses -->
        ${[[60, 60], [1140, 60], [60, 1340], [1140, 1340]].map(([x, y]) =>
            `<g stroke="${ILL_INK}" stroke-width="2" fill="none">
                <line x1="${x - 18}" y1="${y}" x2="${x + 18}" y2="${y}"/>
                <line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y + 18}"/>
                <circle cx="${x}" cy="${y}" r="6"/>
            </g>`).join("")}

        <!-- robot torso (main body) -->
        <g fill="none" stroke="${ILL_INK}" stroke-width="3">
            <!-- head module (cylinder) -->
            <ellipse cx="600" cy="280" rx="120" ry="30"/>
            <line x1="480" y1="280" x2="480" y2="380"/>
            <line x1="720" y1="280" x2="720" y2="380"/>
            <ellipse cx="600" cy="380" rx="120" ry="30"/>
            <!-- camera lens -->
            <circle cx="600" cy="330" r="22" stroke="${ILL_ORANGE}" stroke-width="3"/>
            <circle cx="600" cy="330" r="10" fill="${ILL_ORANGE}" stroke="none"/>

            <!-- neck -->
            <line x1="570" y1="410" x2="570" y2="470"/>
            <line x1="630" y1="410" x2="630" y2="470"/>

            <!-- torso (rounded rect) -->
            <rect x="400" y="470" width="400" height="380" rx="20"/>
            <!-- chest plate detail -->
            <rect x="450" y="520" width="300" height="180" rx="6" stroke-width="2"/>
            <line x1="600" y1="520" x2="600" y2="700" stroke-width="1.5"/>
            <line x1="450" y1="610" x2="750" y2="610" stroke-width="1.5"/>
            <!-- bolts -->
            ${[[470, 540], [730, 540], [470, 680], [730, 680]].map(([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="5" fill="${ILL_INK}"/>`).join("")}

            <!-- shoulders -->
            <circle cx="400" cy="510" r="38"/>
            <circle cx="800" cy="510" r="38"/>

            <!-- left arm (segmented) -->
            <line x1="362" y1="510" x2="280" y2="640" stroke-width="6"/>
            <circle cx="280" cy="640" r="22"/>
            <line x1="280" y1="662" x2="260" y2="820" stroke-width="6"/>
            <circle cx="260" cy="820" r="18"/>
            <!-- gripper -->
            <rect x="240" y="838" width="40" height="60" stroke-width="2"/>
            <line x1="248" y1="898" x2="248" y2="930" stroke-width="3"/>
            <line x1="272" y1="898" x2="272" y2="930" stroke-width="3"/>

            <!-- right arm -->
            <line x1="838" y1="510" x2="920" y2="640" stroke-width="6"/>
            <circle cx="920" cy="640" r="22"/>
            <line x1="920" y1="662" x2="940" y2="820" stroke-width="6"/>
            <circle cx="940" cy="820" r="18"/>
            <rect x="920" y="838" width="40" height="60" stroke-width="2"/>
            <line x1="928" y1="898" x2="928" y2="930" stroke-width="3"/>
            <line x1="952" y1="898" x2="952" y2="930" stroke-width="3"/>

            <!-- hips/base -->
            <rect x="430" y="850" width="340" height="60" rx="8"/>

            <!-- legs -->
            <line x1="500" y1="910" x2="490" y2="1080" stroke-width="8"/>
            <circle cx="490" cy="1080" r="20"/>
            <line x1="490" y1="1100" x2="490" y2="1230" stroke-width="8"/>
            <rect x="450" y="1230" width="80" height="30" rx="4"/>

            <line x1="700" y1="910" x2="710" y2="1080" stroke-width="8"/>
            <circle cx="710" cy="1080" r="20"/>
            <line x1="710" y1="1100" x2="710" y2="1230" stroke-width="8"/>
            <rect x="670" y="1230" width="80" height="30" rx="4"/>
        </g>

        <!-- callout labels (engineering style) -->
        <g font-family="Consolas, monospace" font-size="18" fill="${ILL_INK}">
            <!-- 01: head -->
            <line x1="720" y1="330" x2="900" y2="220" stroke="${ILL_INK}" stroke-width="1"/>
            <circle cx="900" cy="220" r="14" fill="${ILL_ORANGE}" stroke="none"/>
            <text x="900" y="225" text-anchor="middle" fill="white" font-weight="700">01</text>
            <text x="930" y="200" fill="${ILL_MUTED}" font-size="14">PERCEPTION</text>

            <!-- 02: torso -->
            <line x1="800" y1="660" x2="1000" y2="660" stroke="${ILL_INK}" stroke-width="1"/>
            <circle cx="1010" cy="660" r="14" fill="${ILL_ORANGE}" stroke="none"/>
            <text x="1010" y="665" text-anchor="middle" fill="white" font-weight="700">02</text>
            <text x="1040" y="640" fill="${ILL_MUTED}" font-size="14">COMPUTE</text>
            <text x="1040" y="660" fill="${ILL_MUTED}" font-size="14">CORE</text>

            <!-- 03: arm/gripper -->
            <line x1="240" y1="868" x2="120" y2="868" stroke="${ILL_INK}" stroke-width="1"/>
            <circle cx="100" cy="868" r="14" fill="${ILL_ORANGE}" stroke="none"/>
            <text x="100" y="873" text-anchor="middle" fill="white" font-weight="700">03</text>
            <text x="40" y="900" fill="${ILL_MUTED}" font-size="14">END EFFECTOR</text>
        </g>

        <!-- dimension line (height) on left edge -->
        ${dimLine(40, 250, 40, 1260, "h = 1.7m")}

        <!-- bottom annotation -->
        <text x="600" y="1370" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="${ILL_MUTED}" letter-spacing="2">PHX-1 · GENERAL ASSEMBLY</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 2 — "Status quo": three robots, each with its own tangled firmware
// 1840x1520 viewbox
// ---------------------------------------------------------------------------
function slide2Illustration() {
    // Three separate robot-cells, each drawn as a small box with its own arm + tangled wiring
    function cell(cx, cy, label, idx) {
        return `
            <g>
                <!-- cell border -->
                <rect x="${cx - 220}" y="${cy - 200}" width="440" height="400" fill="none" stroke="${ILL_INK}" stroke-width="2"/>
                <!-- corner ticks -->
                ${[[-220, -200], [220, -200], [-220, 200], [220, 200]].map(([dx, dy]) => {
                    const x = cx + dx, y = cy + dy;
                    const sx = dx < 0 ? 1 : -1, sy = dy < 0 ? 1 : -1;
                    return `<line x1="${x}" y1="${y}" x2="${x + sx * 16}" y2="${y}" stroke="${ILL_ORANGE}" stroke-width="3"/>
                            <line x1="${x}" y1="${y}" x2="${x}" y2="${y + sy * 16}" stroke="${ILL_ORANGE}" stroke-width="3"/>`;
                }).join("")}

                <!-- floor line -->
                <line x1="${cx - 200}" y1="${cy + 150}" x2="${cx + 200}" y2="${cy + 150}" stroke="${ILL_INK}" stroke-width="2"/>

                <!-- robot arm base -->
                <rect x="${cx - 50}" y="${cy + 100}" width="100" height="50" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>
                <!-- joint 1 -->
                <circle cx="${cx}" cy="${cy + 100}" r="14" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>
                <!-- arm segment 1 -->
                <line x1="${cx}" y1="${cy + 100}" x2="${cx + 60}" y2="${cy - 20}" stroke="${ILL_INK}" stroke-width="6"/>
                <!-- joint 2 -->
                <circle cx="${cx + 60}" cy="${cy - 20}" r="12" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>
                <!-- arm segment 2 -->
                <line x1="${cx + 60}" y1="${cy - 20}" x2="${cx - 30}" y2="${cy - 100}" stroke="${ILL_INK}" stroke-width="6"/>
                <!-- end effector -->
                <rect x="${cx - 50}" y="${cy - 120}" width="40" height="25" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>

                <!-- target object (different shape per cell) -->
                ${idx === 0
                    ? `<rect x="${cx - 130}" y="${cy + 120}" width="40" height="30" fill="${ILL_INK}"/>`
                    : idx === 1
                    ? `<polygon points="${cx + 110},${cy + 150} ${cx + 130},${cy + 110} ${cx + 150},${cy + 150}" fill="${ILL_INK}"/>`
                    : `<circle cx="${cx + 130}" cy="${cy + 135}" r="18" fill="${ILL_INK}"/>`}

                <!-- tangled wires emerging from base, forming spaghetti -->
                <g stroke="${ILL_ORANGE}" stroke-width="1.5" fill="none" opacity="0.85">
                    <path d="M${cx - 30} ${cy + 150} C${cx - 100} ${cy + 170}, ${cx - 60} ${cy + 130}, ${cx - 140} ${cy + 180}"/>
                    <path d="M${cx + 30} ${cy + 150} C${cx + 100} ${cy + 175}, ${cx + 50} ${cy + 130}, ${cx + 150} ${cy + 185}"/>
                    <path d="M${cx} ${cy + 150} C${cx + 30} ${cy + 180}, ${cx - 80} ${cy + 165}, ${cx + 80} ${cy + 195}"/>
                </g>

                <!-- cell label -->
                <text x="${cx - 210}" y="${cy - 170}" font-family="Consolas, monospace" font-size="18" fill="${ILL_INK}" letter-spacing="1.5">${label}</text>

                <!-- "FIRMWARE: vN.x" tag -->
                <text x="${cx + 210}" y="${cy - 170}" text-anchor="end" font-family="Consolas, monospace" font-size="14" fill="${ILL_ORANGE}">FW v${idx + 1}.${idx + 3}</text>
            </g>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1840 1520">
        <!-- grid background -->
        <g stroke="${ILL_INK}" stroke-opacity="0.08" stroke-width="1">
            ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1840" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 19 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1520"/>`).join("")}
        </g>

        <!-- title bar -->
        <text x="40" y="60" font-family="Consolas, monospace" font-size="18" fill="${ILL_MUTED}" letter-spacing="2">FIG. 1.1 · STATUS QUO — ONE STACK PER CELL</text>
        <line x1="40" y1="80" x2="1800" y2="80" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="4 4"/>

        <!-- 3 cells -->
        ${cell(320, 380, "CELL — A", 0)}
        ${cell(920, 380, "CELL — B", 1)}
        ${cell(1520, 380, "CELL — C", 2)}

        <!-- big red X marks linking cells (showing they don't transfer) -->
        <g stroke="${ILL_ORANGE}" stroke-width="4" stroke-linecap="round">
            <line x1="565" y1="380" x2="675" y2="380"/>
            <line x1="610" y1="340" x2="620" y2="420"/>
            <text x="620" y="475" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${ILL_ORANGE}">NO TRANSFER</text>

            <line x1="1165" y1="380" x2="1275" y2="380"/>
            <line x1="1210" y1="340" x2="1220" y2="420"/>
            <text x="1220" y="475" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${ILL_ORANGE}">NO TRANSFER</text>
        </g>

        <!-- bottom panel: "spaghetti" stacks under each -->
        <g>
            ${[320, 920, 1520].map(cx => `
                <rect x="${cx - 200}" y="720" width="400" height="280" fill="none" stroke="${ILL_INK}" stroke-width="1.5"/>
                <text x="${cx - 190}" y="755" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}" letter-spacing="1.5">STACK</text>
                ${["PERCEPTION ────", "PLANNER  ──────", "CONTROL ───────", "DRIVERS ───────"].map((s, i) =>
                    `<text x="${cx - 190}" y="${800 + i * 45}" font-family="Consolas, monospace" font-size="16" fill="${ILL_INK}">${s}</text>
                     <line x1="${cx + 50}" y1="${795 + i * 45}" x2="${cx + 180}" y2="${795 + i * 45}" stroke="${ILL_ORANGE}" stroke-width="2"/>`
                ).join("")}
            `).join("")}
        </g>

        <!-- bottom callout: cost annotation -->
        <g>
            <line x1="40" y1="1100" x2="1800" y2="1100" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="6 6"/>
            <text x="40" y="1170" font-family="Arial Black, sans-serif" font-size="80" font-weight="900" fill="${ILL_INK}">$200k+</text>
            <text x="40" y="1230" font-family="Consolas, monospace" font-size="22" fill="${ILL_MUTED}" letter-spacing="2">PER CELL · INTEGRATOR TAX</text>
            <text x="1800" y="1170" text-anchor="end" font-family="Arial Black, sans-serif" font-size="80" font-weight="900" fill="${ILL_ORANGE}">3×</text>
            <text x="1800" y="1230" text-anchor="end" font-family="Consolas, monospace" font-size="22" fill="${ILL_MUTED}" letter-spacing="2">REWRITE FOR EVERY ROBOT</text>
        </g>

        <!-- bottom-left/bottom-right registration ticks -->
        <g stroke="${ILL_INK}" stroke-width="2" fill="none">
            <line x1="20" y1="1480" x2="60" y2="1480"/>
            <line x1="40" y1="1460" x2="40" y2="1500"/>
            <line x1="1780" y1="1480" x2="1820" y2="1480"/>
            <line x1="1800" y1="1460" x2="1800" y2="1500"/>
        </g>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 3 — One brain → many robot bodies
// 3440x1040 viewbox (wide banner)
// ---------------------------------------------------------------------------
function slide3Illustration() {
    // Center: a dark "brain" hex node. Right: 5 different robot silhouettes branching out.
    const cx = 600, cy = 520;
    const robots = [
        { x: 1500, y: 200, label: "ARM" },
        { x: 1900, y: 380, label: "MOBILE" },
        { x: 2300, y: 520, label: "HUMANOID" },
        { x: 2700, y: 680, label: "QUAD" },
        { x: 3100, y: 860, label: "AERIAL" },
    ];

    // robot silhouette generator (small icon style)
    function robotIcon(x, y, kind) {
        if (kind === "ARM") {
            return `<g stroke="${ILL_INK}" stroke-width="4" fill="none">
                <rect x="${x - 30}" y="${y + 30}" width="60" height="20"/>
                <line x1="${x}" y1="${y + 30}" x2="${x + 50}" y2="${y - 20}"/>
                <line x1="${x + 50}" y1="${y - 20}" x2="${x + 90}" y2="${y - 60}"/>
                <circle cx="${x}" cy="${y + 30}" r="6" fill="${ILL_INK}"/>
                <circle cx="${x + 50}" cy="${y - 20}" r="6" fill="${ILL_INK}"/>
                <rect x="${x + 80}" y="${y - 75}" width="20" height="20"/>
            </g>`;
        }
        if (kind === "MOBILE") {
            return `<g stroke="${ILL_INK}" stroke-width="4" fill="none">
                <rect x="${x - 60}" y="${y - 30}" width="120" height="50" rx="6"/>
                <circle cx="${x - 35}" cy="${y + 30}" r="14" fill="${ILL_INK}"/>
                <circle cx="${x + 35}" cy="${y + 30}" r="14" fill="${ILL_INK}"/>
                <rect x="${x - 20}" y="${y - 60}" width="40" height="30"/>
            </g>`;
        }
        if (kind === "HUMANOID") {
            return `<g stroke="${ILL_INK}" stroke-width="4" fill="none">
                <circle cx="${x}" cy="${y - 60}" r="20"/>
                <line x1="${x}" y1="${y - 40}" x2="${x}" y2="${y + 30}"/>
                <line x1="${x}" y1="${y - 20}" x2="${x - 30}" y2="${y + 10}"/>
                <line x1="${x}" y1="${y - 20}" x2="${x + 30}" y2="${y + 10}"/>
                <line x1="${x}" y1="${y + 30}" x2="${x - 20}" y2="${y + 70}"/>
                <line x1="${x}" y1="${y + 30}" x2="${x + 20}" y2="${y + 70}"/>
            </g>`;
        }
        if (kind === "QUAD") {
            return `<g stroke="${ILL_INK}" stroke-width="4" fill="none">
                <rect x="${x - 50}" y="${y - 20}" width="100" height="40" rx="4"/>
                <line x1="${x - 35}" y1="${y + 20}" x2="${x - 50}" y2="${y + 60}"/>
                <line x1="${x - 10}" y1="${y + 20}" x2="${x - 15}" y2="${y + 60}"/>
                <line x1="${x + 15}" y1="${y + 20}" x2="${x + 20}" y2="${y + 60}"/>
                <line x1="${x + 40}" y1="${y + 20}" x2="${x + 55}" y2="${y + 60}"/>
                <line x1="${x - 50}" y1="${y - 20}" x2="${x - 70}" y2="${y - 50}"/>
            </g>`;
        }
        // AERIAL — drone
        return `<g stroke="${ILL_INK}" stroke-width="4" fill="none">
            <circle cx="${x}" cy="${y}" r="14" fill="${ILL_INK}"/>
            <line x1="${x - 14}" y1="${y}" x2="${x - 60}" y2="${y - 30}"/>
            <line x1="${x + 14}" y1="${y}" x2="${x + 60}" y2="${y - 30}"/>
            <line x1="${x - 14}" y1="${y}" x2="${x - 60}" y2="${y + 30}"/>
            <line x1="${x + 14}" y1="${y}" x2="${x + 60}" y2="${y + 30}"/>
            <ellipse cx="${x - 60}" cy="${y - 30}" rx="22" ry="6"/>
            <ellipse cx="${x + 60}" cy="${y - 30}" rx="22" ry="6"/>
            <ellipse cx="${x - 60}" cy="${y + 30}" rx="22" ry="6"/>
            <ellipse cx="${x + 60}" cy="${y + 30}" rx="22" ry="6"/>
        </g>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3440 1040">
        <!-- background grid -->
        <g stroke="${ILL_INK}" stroke-opacity="0.07" stroke-width="1">
            ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="3440" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 35 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1040"/>`).join("")}
        </g>

        <!-- left side: BRAIN node (large hex with internal structure) -->
        <g>
            <!-- outer hex -->
            <polygon points="${cx},${cy - 280} ${cx + 240},${cy - 140} ${cx + 240},${cy + 140} ${cx},${cy + 280} ${cx - 240},${cy + 140} ${cx - 240},${cy - 140}"
                fill="${ILL_INK}" stroke="${ILL_INK}" stroke-width="4"/>
            <!-- inner hex -->
            <polygon points="${cx},${cy - 200} ${cx + 170},${cy - 100} ${cx + 170},${cy + 100} ${cx},${cy + 200} ${cx - 170},${cy + 100} ${cx - 170},${cy - 100}"
                fill="none" stroke="${ILL_ORANGE}" stroke-width="3"/>

            <!-- internal "neural" pattern -->
            <g stroke="${ILL_ORANGE}" stroke-width="1.5" fill="none" opacity="0.9">
                ${Array.from({ length: 12 }, (_, i) => {
                    const a1 = (i / 12) * Math.PI * 2;
                    const a2 = ((i + 5) / 12) * Math.PI * 2;
                    return `<line x1="${cx + Math.cos(a1) * 140}" y1="${cy + Math.sin(a1) * 140}" x2="${cx + Math.cos(a2) * 140}" y2="${cy + Math.sin(a2) * 140}"/>`;
                }).join("")}
            </g>
            <g fill="${ILL_ORANGE}">
                ${Array.from({ length: 12 }, (_, i) => {
                    const a = (i / 12) * Math.PI * 2;
                    return `<circle cx="${cx + Math.cos(a) * 140}" cy="${cy + Math.sin(a) * 140}" r="6"/>`;
                }).join("")}
            </g>
            <circle cx="${cx}" cy="${cy}" r="40" fill="${ILL_ORANGE}"/>
            <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="Consolas, monospace" font-size="22" font-weight="700" fill="${ILL_INK}">PHX-1</text>

            <!-- label below -->
            <text x="${cx}" y="${cy + 350}" text-anchor="middle" font-family="Consolas, monospace" font-size="20" fill="${ILL_INK}" letter-spacing="3">FOUNDATION MODEL</text>
            <text x="${cx}" y="${cy + 380}" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}" letter-spacing="2">ONE BRAIN · ANY BODY</text>
        </g>

        <!-- connection lines from brain to each robot -->
        <g stroke="${ILL_INK}" stroke-width="1.5" fill="none" stroke-dasharray="6 4">
            ${robots.map(r => `<line x1="${cx + 240}" y1="${cy}" x2="${r.x - 100}" y2="${r.y}"/>`).join("")}
        </g>

        <!-- bullet at end of each line -->
        ${robots.map(r => `<circle cx="${r.x - 100}" cy="${r.y}" r="6" fill="${ILL_ORANGE}"/>`).join("")}

        <!-- robot icons + labels -->
        ${robots.map(r => `
            ${robotIcon(r.x, r.y, r.label)}
            <text x="${r.x + 130}" y="${r.y + 5}" font-family="Consolas, monospace" font-size="20" fill="${ILL_INK}" letter-spacing="2">${r.label}</text>
        `).join("")}

        <!-- bottom annotation -->
        <line x1="40" y1="980" x2="3400" y2="980" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="40" y="1020" font-family="Consolas, monospace" font-size="18" fill="${ILL_MUTED}" letter-spacing="2">FIG. 2.0 · ONE MODEL DISTRIBUTES TO N FORM-FACTORS · NO PER-ROBOT FINE-TUNING</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 4 — Architecture stack diagram
// 3440x1040 viewbox
// ---------------------------------------------------------------------------
function slide4Illustration() {
    // Horizontal pipeline: SENSORS → ENCODER → MOTION MODEL → DECODER → ACTUATORS
    const stages = [
        { x: 250,  label: "SENSORS",      sub: "rgb · depth · imu · force",         items: ["RGB-D", "IMU", "F/T"] },
        { x: 950,  label: "ENCODER",      sub: "vit · transformer",                  items: ["VIT-L", "PROPRIO", "TOKENIZE"] },
        { x: 1700, label: "PHX-1 CORE",   sub: "100b params · diffusion policy",     items: ["WORLD MODEL", "ACTION HEAD", "VALUE"] },
        { x: 2450, label: "DECODER",      sub: "joint torques · 8ms",                items: ["INVERSE-DYN", "SAFETY", "LIMITER"] },
        { x: 3150, label: "ACTUATORS",    sub: "20 khz control loop",                items: ["MOTORS", "GRIPPER", "BRAKE"] },
    ];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3440 1040">
        <!-- background grid -->
        <g stroke="${ILL_INK}" stroke-opacity="0.07" stroke-width="1">
            ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="3440" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 35 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1040"/>`).join("")}
        </g>

        <!-- top reference line -->
        <line x1="100" y1="120" x2="3340" y2="120" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="100" y="100" font-family="Consolas, monospace" font-size="18" fill="${ILL_MUTED}" letter-spacing="2">DATA FLOW · LEFT → RIGHT · 1 CYCLE = 8 MS</text>

        <!-- arrows between stages -->
        ${stages.slice(0, -1).map((s, i) => {
            const next = stages[i + 1];
            const x1 = s.x + 220;
            const x2 = next.x - 220;
            const y = 540;
            return `
                <line x1="${x1}" y1="${y}" x2="${x2 - 20}" y2="${y}" stroke="${ILL_INK}" stroke-width="3"/>
                <polygon points="${x2},${y} ${x2 - 18},${y - 10} ${x2 - 18},${y + 10}" fill="${ILL_INK}"/>
                ${i === 1 || i === 2
                    ? `<text x="${(x1 + x2) / 2}" y="${y - 18}" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${ILL_ORANGE}">${i === 1 ? "tokens" : "actions"}</text>`
                    : ""}
            `;
        }).join("")}

        <!-- stage boxes -->
        ${stages.map((s, i) => {
            const isCore = s.label === "PHX-1 CORE";
            const fillColor = isCore ? ILL_INK : "none";
            const textColor = isCore ? "#F2EEE5" : ILL_INK;
            const subColor  = isCore ? "#A0A8B8" : ILL_MUTED;
            return `
                <g>
                    <rect x="${s.x - 200}" y="340" width="400" height="400" fill="${fillColor}" stroke="${ILL_INK}" stroke-width="3"/>
                    <!-- corner ticks -->
                    ${[[-200, 340], [200, 340], [-200, 740], [200, 740]].map(([dx, dy]) => {
                        const px = s.x + dx, py = dy;
                        const sx = dx < 0 ? 1 : -1, sy = dy === 340 ? 1 : -1;
                        return `<line x1="${px}" y1="${py}" x2="${px + sx * 14}" y2="${py}" stroke="${ILL_ORANGE}" stroke-width="3"/>
                                <line x1="${px}" y1="${py}" x2="${px}" y2="${py + sy * 14}" stroke="${ILL_ORANGE}" stroke-width="3"/>`;
                    }).join("")}

                    <!-- index -->
                    <circle cx="${s.x - 170}" cy="380" r="20" fill="${ILL_ORANGE}"/>
                    <text x="${s.x - 170}" y="386" text-anchor="middle" font-family="Consolas, monospace" font-size="18" font-weight="700" fill="white">0${i + 1}</text>

                    <!-- title -->
                    <text x="${s.x}" y="450" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="28" font-weight="900" fill="${textColor}" letter-spacing="1">${s.label}</text>
                    <text x="${s.x}" y="478" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${subColor}" letter-spacing="1.5">${s.sub}</text>

                    <!-- divider -->
                    <line x1="${s.x - 160}" y1="510" x2="${s.x + 160}" y2="510" stroke="${isCore ? ILL_ORANGE : ILL_INK}" stroke-width="1"/>

                    <!-- internal items -->
                    ${s.items.map((it, j) => `
                        <text x="${s.x - 160}" y="${560 + j * 36}" font-family="Consolas, monospace" font-size="16" fill="${textColor}">▸ ${it}</text>
                    `).join("")}
                </g>
            `;
        }).join("")}

        <!-- bottom feedback loop arrow -->
        <g fill="none" stroke="${ILL_ORANGE}" stroke-width="2" stroke-dasharray="6 4">
            <path d="M ${stages[4].x} 740 Q ${stages[4].x} 880, ${(stages[0].x + stages[4].x) / 2} 880 T ${stages[0].x} 740"/>
        </g>
        <polygon points="${stages[0].x},740 ${stages[0].x - 10},760 ${stages[0].x + 10},760" fill="${ILL_ORANGE}"/>
        <text x="${(stages[0].x + stages[4].x) / 2}" y="920" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="${ILL_ORANGE}" letter-spacing="2">CLOSED-LOOP FEEDBACK · 20 KHZ</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 5 — Robot arm picking up red mug, technical drawing style
// 3440x960 viewbox
// ---------------------------------------------------------------------------
function slide5Illustration() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3440 960">
        <!-- background grid -->
        <g stroke="${ILL_INK}" stroke-opacity="0.07" stroke-width="1">
            ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="3440" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 35 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="960"/>`).join("")}
        </g>

        <!-- timeline along the bottom: 3 frames at t=0, t=0.6s, t=1.2s -->
        <line x1="100" y1="800" x2="3340" y2="800" stroke="${ILL_INK}" stroke-width="2"/>
        ${[
            { x: 400,  t: "t = 0.0s",   stage: "PERCEIVE" },
            { x: 1720, t: "t = 0.6s",   stage: "PLAN" },
            { x: 3040, t: "t = 1.2s",   stage: "GRASP" },
        ].map(f => `
            <line x1="${f.x}" y1="790" x2="${f.x}" y2="810" stroke="${ILL_INK}" stroke-width="3"/>
            <text x="${f.x}" y="850" text-anchor="middle" font-family="Consolas, monospace" font-size="20" fill="${ILL_INK}" font-weight="700">${f.t}</text>
            <text x="${f.x}" y="880" text-anchor="middle" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}" letter-spacing="2">${f.stage}</text>
        `).join("")}

        <!-- Frame 1: arm reaches, mug visible on table -->
        <g transform="translate(400, 0)">
            <line x1="-300" y1="700" x2="300" y2="700" stroke="${ILL_INK}" stroke-width="2"/>
            <!-- arm origin (top) -->
            <rect x="-50" y="100" width="100" height="40" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="0" y1="140" x2="0" y2="280" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="0" cy="280" r="16" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="0" y1="280" x2="-60" y2="420" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="-60" cy="420" r="14" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="-60" y1="420" x2="-30" y2="540" stroke="${ILL_INK}" stroke-width="6"/>
            <!-- gripper open -->
            <line x1="-50" y1="540" x2="-50" y2="600" stroke="${ILL_INK}" stroke-width="4"/>
            <line x1="-10" y1="540" x2="-10" y2="600" stroke="${ILL_INK}" stroke-width="4"/>

            <!-- mug -->
            <g transform="translate(150, 620)">
                <rect x="-30" y="0" width="60" height="80" fill="${ILL_ORANGE}" stroke="${ILL_INK}" stroke-width="3"/>
                <path d="M30 20 Q60 20 60 50 Q60 80 30 80" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            </g>

            <!-- field-of-view cone from camera -->
            <g fill="${ILL_BLUE}" fill-opacity="0.08" stroke="${ILL_BLUE}" stroke-width="1.5" stroke-dasharray="6 4">
                <polygon points="0,140 -260,700 260,700"/>
            </g>

            <!-- vision target box on mug -->
            <g stroke="${ILL_BLUE}" stroke-width="2.5" fill="none">
                <rect x="115" y="615" width="70" height="90"/>
                <line x1="115" y1="615" x2="105" y2="615"/>
                <line x1="115" y1="615" x2="115" y2="605"/>
                <line x1="185" y1="705" x2="195" y2="705"/>
                <line x1="185" y1="705" x2="185" y2="715"/>
            </g>
            <text x="220" y="610" font-family="Consolas, monospace" font-size="14" fill="${ILL_BLUE}">RED MUG · 0.97</text>
        </g>

        <!-- Frame 2: arm moving, mid-trajectory -->
        <g transform="translate(1720, 0)">
            <line x1="-300" y1="700" x2="300" y2="700" stroke="${ILL_INK}" stroke-width="2"/>
            <rect x="-50" y="100" width="100" height="40" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="0" y1="140" x2="40" y2="280" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="40" cy="280" r="16" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="40" y1="280" x2="120" y2="430" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="120" cy="430" r="14" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="120" y1="430" x2="150" y2="560" stroke="${ILL_INK}" stroke-width="6"/>
            <line x1="130" y1="560" x2="130" y2="610" stroke="${ILL_INK}" stroke-width="4"/>
            <line x1="170" y1="560" x2="170" y2="610" stroke="${ILL_INK}" stroke-width="4"/>

            <!-- mug -->
            <g transform="translate(150, 620)">
                <rect x="-30" y="0" width="60" height="80" fill="${ILL_ORANGE}" stroke="${ILL_INK}" stroke-width="3"/>
                <path d="M30 20 Q60 20 60 50 Q60 80 30 80" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            </g>

            <!-- planned trajectory (dashed curve) -->
            <path d="M 0 140 Q 100 350, 150 600" fill="none" stroke="${ILL_ORANGE}" stroke-width="2" stroke-dasharray="6 4"/>
            <!-- waypoints -->
            ${[[40, 230], [80, 330], [110, 440], [135, 550]].map(([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="5" fill="${ILL_ORANGE}"/>`).join("")}

            <text x="-280" y="200" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">TRAJECTORY</text>
            <text x="-280" y="220" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">PLAN: 47 PTS</text>
        </g>

        <!-- Frame 3: arm holding mug -->
        <g transform="translate(3040, 0)">
            <line x1="-300" y1="700" x2="300" y2="700" stroke="${ILL_INK}" stroke-width="2"/>
            <rect x="-50" y="100" width="100" height="40" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="0" y1="140" x2="80" y2="290" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="80" cy="290" r="16" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="80" y1="290" x2="160" y2="450" stroke="${ILL_INK}" stroke-width="6"/>
            <circle cx="160" cy="450" r="14" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
            <line x1="160" y1="450" x2="150" y2="580" stroke="${ILL_INK}" stroke-width="6"/>

            <!-- gripper closed around mug -->
            <line x1="120" y1="580" x2="120" y2="660" stroke="${ILL_INK}" stroke-width="4"/>
            <line x1="180" y1="580" x2="180" y2="660" stroke="${ILL_INK}" stroke-width="4"/>
            <!-- mug grasped -->
            <rect x="120" y="600" width="60" height="80" fill="${ILL_ORANGE}" stroke="${ILL_INK}" stroke-width="3"/>
            <path d="M180 620 Q210 620 210 650 Q210 680 180 680" fill="none" stroke="${ILL_INK}" stroke-width="3"/>

            <!-- check mark badge -->
            <circle cx="260" cy="240" r="36" fill="${ILL_ORANGE}"/>
            <path d="M243 240 L256 254 L278 228" fill="none" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>

            <text x="-280" y="200" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">SUCCESS</text>
            <text x="-280" y="220" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">94% on unseen</text>
        </g>

        <!-- top header -->
        <text x="100" y="60" font-family="Consolas, monospace" font-size="18" fill="${ILL_MUTED}" letter-spacing="2">FIG. 4.1 · TASK SEQUENCE — "PICK UP THE RED MUG"</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Market visual: stacked bar / TAM diagram on the left
// 1400x1240 viewbox
// ---------------------------------------------------------------------------
function slide6Illustration() {
    // A series of nested concentric squares representing TAM/SAM/SOM
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1240">
        <!-- background grid -->
        <g stroke="${ILL_INK}" stroke-opacity="0.07" stroke-width="1">
            ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1400" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 15 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="1240"/>`).join("")}
        </g>

        <!-- header -->
        <text x="60" y="80" font-family="Consolas, monospace" font-size="22" fill="${ILL_MUTED}" letter-spacing="2">FIG. 5.1 · MARKET TOPOLOGY</text>
        <line x1="60" y1="100" x2="1340" y2="100" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="4 4"/>

        <!-- nested rectangles (TAM > SAM > SOM > Wedge) -->
        <g>
            <!-- TAM -->
            <rect x="120" y="180" width="1160" height="900" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>
            <text x="150" y="220" font-family="Consolas, monospace" font-size="18" fill="${ILL_INK}" letter-spacing="2">TAM · ALL ROBOTS</text>
            <text x="150" y="246" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">$1.4T BY '32</text>

            <!-- SAM -->
            <rect x="220" y="280" width="960" height="700" fill="none" stroke="${ILL_INK}" stroke-width="2.5"/>
            <text x="250" y="320" font-family="Consolas, monospace" font-size="18" fill="${ILL_INK}" letter-spacing="2">SAM · GENERAL-PURPOSE</text>
            <text x="250" y="346" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">$280B BY '30</text>

            <!-- SOM -->
            <rect x="340" y="400" width="720" height="500" fill="${ILL_ORANGE}" fill-opacity="0.12" stroke="${ILL_ORANGE}" stroke-width="3"/>
            <text x="370" y="440" font-family="Consolas, monospace" font-size="18" fill="${ILL_INK}" letter-spacing="2">SOM · 3.2M ROBOTS '26</text>
            <text x="370" y="466" font-family="Consolas, monospace" font-size="14" fill="${ILL_MUTED}">$48k/yr × N · OUR WEDGE</text>

            <!-- center bullseye -->
            <g transform="translate(700, 660)">
                <circle r="120" fill="none" stroke="${ILL_INK}" stroke-width="2"/>
                <circle r="80"  fill="none" stroke="${ILL_INK}" stroke-width="2"/>
                <circle r="40"  fill="${ILL_ORANGE}"/>
                <circle r="14" fill="${ILL_INK}"/>
                <text y="180" text-anchor="middle" font-family="Consolas, monospace" font-size="16" fill="${ILL_INK}" font-weight="700" letter-spacing="2">PHX-1 ENTRY</text>
            </g>

            <!-- corner ticks on outermost -->
            ${[[120, 180], [1280, 180], [120, 1080], [1280, 1080]].map(([x, y]) => {
                const dx = x === 120 ? 1 : -1;
                const dy = y === 180 ? 1 : -1;
                return `<line x1="${x}" y1="${y}" x2="${x + dx * 18}" y2="${y}" stroke="${ILL_ORANGE}" stroke-width="3"/>
                        <line x1="${x}" y1="${y}" x2="${x}" y2="${y + dy * 18}" stroke="${ILL_ORANGE}" stroke-width="3"/>`;
            }).join("")}
        </g>

        <!-- bottom annotation -->
        <line x1="60" y1="1140" x2="1340" y2="1140" stroke="${ILL_INK}" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="60" y="1190" font-family="Consolas, monospace" font-size="16" fill="${ILL_MUTED}" letter-spacing="2">SCOPE · GLOBAL · NEW SHIPMENTS '26 ONWARD</text>
    </svg>`;
}

// ---------------------------------------------------------------------------
// SLIDE 8 — Founder portrait silhouettes (2 separate ones)
// 480x400 each
// ---------------------------------------------------------------------------
function slide8FounderPortrait(initials) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400">
        <!-- frame -->
        <rect x="2" y="2" width="476" height="396" fill="none" stroke="${ILL_INK}" stroke-width="3"/>
        <!-- corner ticks -->
        ${[[2, 2], [478, 2], [2, 398], [478, 398]].map(([x, y]) => {
            const dx = x === 2 ? 1 : -1;
            const dy = y === 2 ? 1 : -1;
            return `<line x1="${x}" y1="${y}" x2="${x + dx * 16}" y2="${y}" stroke="${ILL_ORANGE}" stroke-width="4"/>
                    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + dy * 16}" stroke="${ILL_ORANGE}" stroke-width="4"/>`;
        }).join("")}

        <!-- subtle grid -->
        <g stroke="${ILL_INK}" stroke-opacity="0.08" stroke-width="1">
            ${Array.from({ length: 4 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="480" y2="${i * 100}"/>`).join("")}
            ${Array.from({ length: 5 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="400"/>`).join("")}
        </g>

        <!-- silhouette: head + shoulders -->
        <g fill="${ILL_INK}">
            <circle cx="240" cy="170" r="80"/>
            <path d="PLACEHOLDER"/>
        </g>

        <!-- initials badge in corner -->
        <circle cx="430" cy="50" r="26" fill="${ILL_ORANGE}"/>
        <text x="430" y="58" text-anchor="middle" font-family="Consolas, monospace" font-size="20" font-weight="700" fill="white">${initials}</text>

        <!-- bottom label -->
        <text x="20" y="385" font-family="Consolas, monospace" font-size="12" fill="${ILL_MUTED}" letter-spacing="2">PORTRAIT · CONFIDENTIAL</text>
    </svg>`;
}

// Group exported functions under `ill.*` so the build code can reference them naturally.
const ill = {
    slide1Illustration,
    slide2Illustration,
    slide3Illustration,
    slide4Illustration,
    slide5Illustration,
    slide6Illustration,
    slide8FounderPortrait,
};
// =============================================================================
// END INLINED ILLUSTRATIONS
// =============================================================================


// ---------------------------------------------------------------------------
// Palette & layout constants
// ---------------------------------------------------------------------------
const COLORS = {
    paper:       "F2EEE5",   // cream base (used for title block)
    field:       "E0DDD6",   // composite background — slides 2-8 (cream + 8% navy overlay)
    fieldDark:   "BAB9B7",   // composite — slide 1 (cream + 8% + 18% navy overlays)
    ink:         "0F1A2E",   // primary dark navy
    inkSoft:     "2A3654",   // softer navy for body text
    muted:       "6B6655",   // warm gray for captions / secondary text
    blue:        "1E5FFF",   // electric blue — section labels & accents
    orange:      "FF5B1F",   // orange dot / hot accent
    cream:       "F2EEE5",   // for title-block fill
    creamDark:   "EAE3D2",   // alternate cream
};

// Slide is 20" x 11.25" (true 16:9 at large scale). We'll define a custom layout.
const SLIDE_W = 20;
const SLIDE_H = 11.25;

// Outer frame margins
const FRAME_M = 0.5;          // distance from slide edge to outer border
const FRAME_W = SLIDE_W - 2 * FRAME_M;
const FRAME_H = SLIDE_H - 2 * FRAME_M;

// Header Y positions (inside the frame)
const HEADER_Y = 0.65;        // sheet number / section label / phx code row
const FIG_Y    = 0.95;        // FIG. X.X · ... line below header

// Title block (bottom-right metadata box)
const TB_W = 4.6;             // total width
const TB_H = 0.95;
const TB_X = SLIDE_W - FRAME_M - TB_W - 0.05;
const TB_Y = SLIDE_H - FRAME_M - TB_H - 0.05;

// Stroke widths
const STROKE_THIN = 0.75;
const STROKE_MED  = 1.0;

// ---------------------------------------------------------------------------
// Presentation setup
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// SVG → base64 PNG helper
// ---------------------------------------------------------------------------
async function svgToBase64Png(svgString) {
    const buf = await sharp(Buffer.from(svgString)).png().toBuffer();
    return "image/png;base64," + buf.toString("base64");
}

async function build() {

// Pre-rasterize all illustrations into base64 PNGs
console.log("Rasterizing illustrations...");
const IMG = {
    s1: await svgToBase64Png(ill.slide1Illustration()),
    s2: await svgToBase64Png(ill.slide2Illustration()),
    s3: await svgToBase64Png(ill.slide3Illustration()),
    s4: await svgToBase64Png(ill.slide4Illustration()),
    s5: await svgToBase64Png(ill.slide5Illustration()),
    s6: await svgToBase64Png(ill.slide6Illustration()),
    s8a: await svgToBase64Png(ill.slide8FounderPortrait("MT")),
    s8b: await svgToBase64Png(ill.slide8FounderPortrait("AR")),
};

const pres = new pptxgen();
pres.author  = "Phyzix";
pres.company = "Phyzix";
pres.title   = "Phyzix — The brain for any robot";
pres.defineLayout({ name: "PHYZIX", width: SLIDE_W, height: SLIDE_H });
pres.layout  = "PHYZIX";

// ---------------------------------------------------------------------------
// Reusable chrome — drawn on every slide
// ---------------------------------------------------------------------------
function drawChrome(slide, opts) {
    const {
        sheetNum,           // "01"
        sectionLabel,       // "COMPANY OVERVIEW"
        phxCode,            // "PHX—001"
        showYC = false,     // top-right "YC W26" only on slide 1
        figLabel,           // "FIG. 0.0 · GENERAL ASSEMBLY"
        figRight,           // optional "FIG. 1.1 · STATUS QUO" at top right under PHX
        tbDrawing,          // "A · TITLE"  — title-block contents
        tbDate,             // optional "2026.04" — only slide 1
        tbRev    = "1.0",
        bgColor  = COLORS.field,
    } = opts;

    // Background
    slide.background = { color: bgColor };

    // Outer frame (thin rectangle border)
    slide.addShape(pres.shapes.RECTANGLE, {
        x: FRAME_M, y: FRAME_M, w: FRAME_W, h: FRAME_H,
        fill:  { type: "none" },
        line:  { color: COLORS.ink, width: STROKE_THIN },
    });

    // ---- Header row (inside frame)
    // Sheet number, e.g. "SHEET 01 / 08"
    slide.addText(`SHEET ${sheetNum} / 08`, {
        x: FRAME_M + 0.25, y: HEADER_Y - 0.2, w: 2.4, h: 0.3,
        fontFace: "Consolas", fontSize: 13, color: COLORS.ink,
        margin: 0, valign: "middle", charSpacing: 1.5,
    });

    // Orange dot
    slide.addShape(pres.shapes.OVAL, {
        x: FRAME_M + 2.55, y: HEADER_Y - 0.05, w: 0.16, h: 0.16,
        fill: { color: COLORS.orange }, line: { color: COLORS.orange, width: 0 },
    });

    // Section label, e.g. "COMPANY OVERVIEW"
    slide.addText(sectionLabel, {
        x: FRAME_M + 2.8, y: HEADER_Y - 0.2, w: 6, h: 0.3,
        fontFace: "Consolas", fontSize: 13, color: COLORS.ink, bold: true,
        margin: 0, valign: "middle", charSpacing: 1.5,
    });

    // PHX code top-right
    const phxX = showYC ? SLIDE_W - FRAME_M - 2.8 : SLIDE_W - FRAME_M - 1.5;
    slide.addText(phxCode, {
        x: phxX, y: HEADER_Y - 0.2, w: 1.4, h: 0.3,
        fontFace: "Consolas", fontSize: 13, color: COLORS.ink,
        margin: 0, valign: "middle", align: "right", charSpacing: 1.5,
    });
    if (showYC) {
        slide.addText("YC W26", {
            x: SLIDE_W - FRAME_M - 1.3, y: HEADER_Y - 0.2, w: 1.05, h: 0.3,
            fontFace: "Consolas", fontSize: 13, color: COLORS.ink,
            margin: 0, valign: "middle", align: "right", charSpacing: 1.5,
        });
    }

    // ---- Figure callout(s)
    if (figLabel) {
        slide.addText(figLabel, {
            x: FRAME_M + 0.25, y: FIG_Y, w: 8, h: 0.3,
            fontFace: "Consolas", fontSize: 12, color: COLORS.blue,
            margin: 0, valign: "middle", charSpacing: 2,
        });
    }
    if (figRight) {
        slide.addText(figRight, {
            x: SLIDE_W - FRAME_M - 5.05, y: FIG_Y, w: 5, h: 0.3,
            fontFace: "Consolas", fontSize: 12, color: COLORS.muted,
            margin: 0, valign: "middle", align: "right", charSpacing: 2,
        });
    }

    // ---- Title block (bottom-right)
    drawTitleBlock(slide, { tbDrawing, tbDate, tbRev, sheetNum });
}

function drawTitleBlock(slide, { tbDrawing, tbDate, tbRev, sheetNum }) {
    const cells = [];
    if (tbDate) {
        // Slide 1 has 4 columns: DRAWING | DATE | REV | SHEET
        cells.push({ label: "DRAWING", value: tbDrawing, w: 1.4 });
        cells.push({ label: "DATE",    value: tbDate,    w: 0.95 });
        cells.push({ label: "REV",     value: tbRev,     w: 0.7  });
        cells.push({ label: "SHEET",   value: `${sheetNum} / 08`, w: 1.05 });
    } else {
        // Other slides: DRAWING | REV | SHEET
        cells.push({ label: "DRAWING", value: tbDrawing, w: 2.0 });
        cells.push({ label: "REV",     value: tbRev,     w: 0.85 });
        cells.push({ label: "SHEET",   value: `${sheetNum} / 08`, w: 1.15 });
    }
    const totalW = cells.reduce((a, c) => a + c.w, 0);
    let cursorX = SLIDE_W - FRAME_M - 0.05 - totalW;

    // Outer fill rectangle behind title block
    slide.addShape(pres.shapes.RECTANGLE, {
        x: cursorX, y: TB_Y, w: totalW, h: TB_H,
        fill: { color: COLORS.cream }, line: { color: COLORS.ink, width: STROKE_THIN },
    });

    // Each cell with vertical divider
    cells.forEach((c, i) => {
        // Label (top)
        slide.addText(c.label, {
            x: cursorX, y: TB_Y + 0.05, w: c.w, h: 0.32,
            fontFace: "Consolas", fontSize: 9, color: COLORS.muted,
            margin: 0, align: "center", valign: "middle", charSpacing: 1.5,
        });
        // Value (bottom)
        slide.addText(c.value, {
            x: cursorX, y: TB_Y + 0.38, w: c.w, h: 0.5,
            fontFace: "Consolas", fontSize: 13, color: COLORS.ink, bold: true,
            margin: 0, align: "center", valign: "middle", charSpacing: 1,
        });
        // Right divider (except last cell)
        if (i < cells.length - 1) {
            slide.addShape(pres.shapes.LINE, {
                x: cursorX + c.w, y: TB_Y, w: 0, h: TB_H,
                line: { color: COLORS.ink, width: STROKE_THIN },
            });
        }
        cursorX += c.w;
    });
}

// ===========================================================================
// SLIDE 1 — TITLE
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "01",
        sectionLabel: "COMPANY OVERVIEW",
        phxCode: "PHX—001",
        showYC: true,
        figLabel: "FIG. 0.0 · GENERAL ASSEMBLY",
        tbDrawing: "A · TITLE",
        tbDate: "2026.04",
        bgColor: COLORS.fieldDark,
    });

    // Move FIG label down — slide 1 places it just above "Phyzix."
    // (already drawn at FIG_Y by drawChrome — override location for slide 1 by re-adding closer to title)
    // Actually keep default. Re-add at custom position by clearing? Pptxgenjs has no clear. Skip.
    // For slide 1 the FIG label is at y=2.0 (just above the wordmark). drawChrome put one at FIG_Y=0.95.
    // Hide that by drawing rectangle with bg color over it, then re-place. Simpler: skip override.
    // Looking at original — FIG. 0.0 is positioned just above the wordmark. We'll add an additional one there with a covering rect.
    slide.addShape(pres.shapes.RECTANGLE, {
        x: FRAME_M + 0.2, y: FIG_Y - 0.02, w: 5, h: 0.34,
        fill: { color: COLORS.fieldDark }, line: { color: COLORS.fieldDark, width: 0 },
    });
    slide.addText("FIG. 0.0 · GENERAL ASSEMBLY", {
        x: FRAME_M + 0.5, y: 2.4, w: 7, h: 0.4,
        fontFace: "Consolas", fontSize: 14, color: COLORS.blue,
        margin: 0, valign: "middle", charSpacing: 2,
    });

    // "Phyzix" wordmark — huge, ink color
    slide.addText("Phyzix", {
        x: FRAME_M + 0.45, y: 2.7, w: 12, h: 2.6,
        fontFace: "Arial Black", fontSize: 160, color: COLORS.ink, bold: true,
        margin: 0, valign: "middle", charSpacing: -4,
    });
    // Orange period square — the dot of "Phyzix."
    slide.addShape(pres.shapes.RECTANGLE, {
        x: FRAME_M + 7.0, y: 5.0, w: 0.42, h: 0.42,
        fill: { color: COLORS.orange }, line: { color: COLORS.orange, width: 0 },
    });

    // Horizontal divider line
    slide.addShape(pres.shapes.LINE, {
        x: FRAME_M + 0.45, y: 5.85, w: 9, h: 0,
        line: { color: COLORS.ink, width: STROKE_MED },
    });

    // Subtitle
    slide.addText("The brain for any robot.", {
        x: FRAME_M + 0.45, y: 6.0, w: 14, h: 0.9,
        fontFace: "Calibri", fontSize: 44, color: COLORS.ink,
        margin: 0, valign: "top",
    });

    // Robot blueprint illustration on the right side
    slide.addImage({ data: IMG.s1, x: 12.6, y: 2.3, w: 6.1, h: 7.1 });
}

// ===========================================================================
// SLIDE 2 — PROBLEM
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "02",
        sectionLabel: "PROBLEM STATEMENT",
        phxCode: "PHX—002",
        figLabel: "FIG. 1.0 · THE PROBLEM",
        figRight: "FIG. 1.1 · STATUS QUO",
        tbDrawing: "B · PROBLEM",
    });

    // Big headline (left ~half), ink, with "No brains." in orange wrapping
    slide.addText([
        { text: "Robots have bodies. ", options: { color: COLORS.ink } },
        { text: "No brains.",            options: { color: COLORS.orange } },
    ], {
        x: FRAME_M + 0.45, y: 1.5, w: 9.5, h: 5.0,
        fontFace: "Arial Black", fontSize: 76, bold: true,
        margin: 0, valign: "top", lineSpacingMultiple: 1.0,
    });

    // Body paragraph
    slide.addText(
        "Every robot ships with bespoke firmware, hand-tuned for one task in one factory. " +
        "Move it three feet — it breaks. Swap the gripper — it breaks.",
        {
            x: FRAME_M + 0.45, y: 6.7, w: 8.5, h: 1.4,
            fontFace: "Calibri", fontSize: 20, color: COLORS.ink,
            margin: 0, valign: "top",
        },
    );

    // Divider above the WHY IT BREAKS grid
    slide.addShape(pres.shapes.LINE, {
        x: FRAME_M + 0.45, y: 8.2, w: 8.5, h: 0,
        line: { color: COLORS.ink, width: STROKE_THIN },
    });

    // FIG 1.2 label
    slide.addText("FIG. 1.2 · WHY IT BREAKS", {
        x: FRAME_M + 0.45, y: 8.35, w: 6, h: 0.35,
        fontFace: "Consolas", fontSize: 13, color: COLORS.muted,
        margin: 0, charSpacing: 2,
    });

    // 2x2 grid of failure modes
    const grid = [
        { tag: "A · BRITTLE CONTROL", body: "Hand-coded trajectories assume a fixed world. Reality drifts." },
        { tag: "B · ZERO TRANSFER",   body: "A skill learned on one arm doesn't move to the next model." },
        { tag: "C · NO PERCEPTION",   body: "Cameras log pixels. Nobody connects them to the motor loop." },
        { tag: "D · INTEGRATOR TAX",  body: "$200k+ of consulting per cell. Doesn't scale to 3.2M robots." },
    ];
    const gridX = FRAME_M + 0.45;
    const gridY = 8.85;
    const colW = 4.2;
    const rowH = 0.95;
    grid.forEach((g, i) => {
        const cx = gridX + (i % 2) * colW;
        const cy = gridY + Math.floor(i / 2) * rowH;
        slide.addText(g.tag, {
            x: cx, y: cy, w: colW - 0.2, h: 0.3,
            fontFace: "Consolas", fontSize: 10, color: COLORS.orange, bold: true,
            margin: 0, charSpacing: 1.5,
        });
        slide.addText(g.body, {
            x: cx, y: cy + 0.32, w: colW - 0.2, h: 0.6,
            fontFace: "Calibri", fontSize: 13, color: COLORS.ink,
            margin: 0, valign: "top",
        });
    });

    // Status-quo blueprint on the right half
    slide.addImage({ data: IMG.s2, x: 9.38, y: 1.4, w: 9.58, h: 7.92 });
}
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "03",
        sectionLabel: "SOLUTION",
        phxCode: "PHX—003",
        figLabel: "FIG. 2.0 · ONE MODEL · ANY BODY",
        tbDrawing: "C · SOLUTION",
    });

    // Two-tone giant headline
    slide.addText([
        { text: "One foundation model. ", options: { color: COLORS.ink } },
        { text: "Plugs into any robot.",  options: { color: COLORS.blue } },
    ], {
        x: FRAME_M + 0.45, y: 1.4, w: 18.0, h: 2.2,
        fontFace: "Arial Black", fontSize: 76, bold: true,
        margin: 0, valign: "top", lineSpacingMultiple: 1.0,
    });

    // One-brain → many-bodies banner illustration
    slide.addImage({ data: IMG.s3, x: 1.04, y: 4.0, w: 17.92, h: 5.42 });
}

// ===========================================================================
// SLIDE 4 — ARCHITECTURE
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "04",
        sectionLabel: "ARCHITECTURE",
        phxCode: "PHX—004",
        figLabel: "FIG. 3.0 · HOW IT WORKS",
        tbDrawing: "D · ARCH",
    });

    // Headline
    slide.addText("A motion model\ntrained on the world.", {
        x: FRAME_M + 0.45, y: 1.4, w: 13, h: 2.5,
        fontFace: "Arial Black", fontSize: 64, color: COLORS.ink, bold: true,
        margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });

    // Right-side spec callout
    slide.addText([
        { text: "20 KHZ CONTROL LOOP",      options: { color: COLORS.ink, breakLine: true } },
        { text: "ON-DEVICE INFERENCE",      options: { color: COLORS.ink, breakLine: true } },
        { text: "→ 8 MS LATENCY",            options: { color: COLORS.orange } },
    ], {
        x: SLIDE_W - FRAME_M - 5.5, y: 1.95, w: 5.0, h: 1.4,
        fontFace: "Consolas", fontSize: 16,
        margin: 0, align: "right", valign: "top", charSpacing: 1.5,
    });

    // Architecture pipeline diagram
    slide.addImage({ data: IMG.s4, x: 1.04, y: 4.0, w: 17.92, h: 5.42 });
}

// ===========================================================================
// SLIDE 5 — CAPABILITY
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "05",
        sectionLabel: "CAPABILITY",
        phxCode: "PHX—005",
        figLabel: "FIG. 4.0 · CAPABILITY DEMONSTRATION",
        tbDrawing: "E · DEMO",
    });

    // Demo line — quoted command in ink, response in muted
    slide.addText([
        { text: '"Pick up the red mug." ', options: { color: COLORS.ink, bold: true } },
        { text: "→ done in 1.2s.",         options: { color: COLORS.muted, bold: false } },
    ], {
        x: FRAME_M + 0.45, y: 1.4, w: 18.5, h: 2.5,
        fontFace: "Arial Black", fontSize: 64,
        margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });

    // Three-frame task sequence illustration
    slide.addImage({ data: IMG.s5, x: 1.04, y: 4.3, w: 17.92, h: 5.0 });
}

// ===========================================================================
// SLIDE 6 — MARKET
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "06",
        sectionLabel: "MARKET",
        phxCode: "PHX—006",
        figLabel: "FIG. 5.0 · TARGET MARKET",
        tbDrawing: "F · MARKET",
    });

    // Headline (big, full width)
    slide.addText("Every robot maker needs a brain.", {
        x: FRAME_M + 0.45, y: 1.4, w: 19, h: 1.6,
        fontFace: "Arial Black", fontSize: 64, color: COLORS.ink, bold: true,
        margin: 0, valign: "top",
    });

    // Three big-stat rows on the right side, each separated by horizontal line
    const stats = [
        { tag: "A · GROWTH",  big: "3.2M",   bigSuffix: "+",
          body: "robots shipping in '26 — none with a general motion model.",
          suffixColor: COLORS.orange },
        { tag: "B · WEDGE",   big: "$48k",   bigSuffix: "/yr",
          body: "per-robot software license. Recurring, hardware-agnostic.",
          suffixColor: COLORS.orange },
        { tag: "C · TIMING",  big: "2026",   bigSuffix: "",
          body: "cost of compute & sim data finally crossed the threshold.",
          suffixColor: COLORS.orange },
    ];
    const sX = 10.0;
    const sW = SLIDE_W - FRAME_M - 0.5 - sX;
    const sStartY = 4.0;
    const sRowH = 2.0;

    stats.forEach((s, i) => {
        const y = sStartY + i * sRowH;
        // Top divider
        slide.addShape(pres.shapes.LINE, {
            x: sX, y: y, w: sW, h: 0,
            line: { color: COLORS.ink, width: STROKE_THIN },
        });
        // Tag
        slide.addText(s.tag, {
            x: sX, y: y + 0.1, w: sW, h: 0.3,
            fontFace: "Consolas", fontSize: 12, color: COLORS.muted,
            margin: 0, charSpacing: 1.5,
        });
        // Big number with colored suffix
        slide.addText([
            { text: s.big,        options: { color: COLORS.ink } },
            { text: s.bigSuffix,  options: { color: s.suffixColor } },
        ], {
            x: sX, y: y + 0.4, w: sW, h: 1.0,
            fontFace: "Arial Black", fontSize: 60, bold: true,
            margin: 0, valign: "top",
        });
        // Body
        slide.addText(s.body, {
            x: sX, y: y + 1.45, w: sW, h: 0.4,
            fontFace: "Calibri", fontSize: 14, color: COLORS.ink,
            margin: 0, valign: "top",
        });
    });

    // Market topology illustration on the left
    slide.addImage({ data: IMG.s6, x: 1.04, y: 4.07, w: 7.29, h: 6.46 });
}

// ===========================================================================
// SLIDE 7 — TRACTION
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "07",
        sectionLabel: "TRACTION",
        phxCode: "PHX—007",
        figLabel: "FIG. 6.0 · TRACTION TO DATE",
        tbDrawing: "G · TRACTION",
    });

    // Two-tone headline
    slide.addText([
        { text: "Six robots. One model. ", options: { color: COLORS.ink } },
        { text: "Already\nshipping.",       options: { color: COLORS.blue } },
    ], {
        x: FRAME_M + 0.45, y: 1.4, w: 18.5, h: 3.0,
        fontFace: "Arial Black", fontSize: 64, bold: true,
        margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });

    // Top divider above 4-stat row
    slide.addShape(pres.shapes.LINE, {
        x: FRAME_M + 0.45, y: 5.0, w: FRAME_W - 1.0, h: 0,
        line: { color: COLORS.ink, width: STROKE_THIN },
    });

    // 4 stats in a row
    const tStats = [
        { label: "PILOT DEPLOYMENTS", big: "11",     suffix: "",  sub: "across 4 industries" },
        { label: "SUCCESS RATE",      big: "94",     suffix: "%", sub: "on unseen objects" },
        { label: "ARR (LOI)",         big: "$4.1M",  suffix: "",  sub: "signed Q1 ′26" },
        { label: "TRAINING HOURS",    big: "1.2M",   suffix: "",  sub: "sim + real, doubling/qtr" },
    ];
    const tStartX = FRAME_M + 0.45;
    const tColW   = (FRAME_W - 1.0) / 4;
    tStats.forEach((s, i) => {
        const x = tStartX + i * tColW;
        slide.addText(s.label, {
            x: x, y: 5.15, w: tColW - 0.2, h: 0.3,
            fontFace: "Consolas", fontSize: 13, color: COLORS.muted,
            margin: 0, charSpacing: 1.5,
        });
        slide.addText([
            { text: s.big,    options: { color: COLORS.ink } },
            { text: s.suffix, options: { color: COLORS.orange } },
        ], {
            x: x, y: 5.5, w: tColW - 0.2, h: 1.1,
            fontFace: "Arial Black", fontSize: 60, bold: true,
            margin: 0, valign: "top",
        });
        slide.addText(s.sub, {
            x: x, y: 6.7, w: tColW - 0.2, h: 0.4,
            fontFace: "Calibri", fontSize: 13, color: COLORS.ink,
            margin: 0, valign: "top",
        });
    });

    // Bottom divider below stat row
    slide.addShape(pres.shapes.LINE, {
        x: FRAME_M + 0.45, y: 7.3, w: FRAME_W - 1.0, h: 0,
        line: { color: COLORS.ink, width: STROKE_THIN },
    });

    // Bottom area — left: FIG 6.1 (chart placeholder), right: FIG 6.2 (partner cards)
    slide.addText("FIG. 6.1 · WEEKLY ACTIVE ROBOTS", {
        x: FRAME_M + 0.45, y: 7.5, w: 7, h: 0.35,
        fontFace: "Consolas", fontSize: 13, color: COLORS.muted,
        margin: 0, charSpacing: 2,
    });

    // Native bar chart for weekly active robots (replaces the empty FIG 6.1 area)
    const barLabels = ["W22", "W23", "W24", "W25", "W26", "W27", "W28", "W29", "W30"];
    const barValues = [1, 1, 2, 3, 3, 4, 5, 5, 6];
    slide.addChart(pres.charts.BAR, [
        { name: "Active robots", labels: barLabels, values: barValues },
    ], {
        x: FRAME_M + 0.4, y: 7.85, w: 8.8, h: 2.5,
        barDir: "col",
        chartColors: [COLORS.ink],
        chartArea: { fill: { color: COLORS.field }, border: { pt: 0, color: COLORS.field } },
        plotArea:  { fill: { color: COLORS.field } },
        catAxisLabelColor: COLORS.muted,
        valAxisLabelColor: COLORS.muted,
        catAxisLabelFontFace: "Consolas",
        valAxisLabelFontFace: "Consolas",
        catAxisLabelFontSize: 9,
        valAxisLabelFontSize: 9,
        valGridLine: { color: "9C9B99", size: 0.5 },
        catGridLine: { style: "none" },
        showLegend: false,
        showValue:  false,
        barGapWidthPct: 40,
    });

    slide.addText("FIG. 6.2 · HARDWARE PARTNERS", {
        x: 11.4, y: 7.5, w: 7, h: 0.35,
        fontFace: "Consolas", fontSize: 13, color: COLORS.muted,
        margin: 0, charSpacing: 2,
    });

    // 2x2 partner cards
    const partners = ["NORTHSTAR ROBOTICS", "ATLAS HUMANOIDS", "FETCH WAREHOUSE", "MEADOW AGRI-CO"];
    const pX = 11.4;
    const pY = 7.9;
    const pColW = 3.3;
    const pRowH = 0.55;
    partners.forEach((name, i) => {
        const x = pX + (i % 2) * (pColW + 0.15);
        const y = pY + Math.floor(i / 2) * (pRowH + 0.12);
        slide.addShape(pres.shapes.RECTANGLE, {
            x: x, y: y, w: pColW, h: pRowH,
            fill: { color: COLORS.cream }, line: { color: COLORS.ink, width: STROKE_THIN },
        });
        slide.addText(`▸ ${name}`, {
            x: x + 0.15, y: y, w: pColW - 0.2, h: pRowH,
            fontFace: "Consolas", fontSize: 12, color: COLORS.ink, bold: true,
            margin: 0, valign: "middle", charSpacing: 1.5,
        });
    });
}

// ===========================================================================
// SLIDE 8 — TEAM & ASK
// ===========================================================================
{
    const slide = pres.addSlide();
    drawChrome(slide, {
        sheetNum: "08",
        sectionLabel: "TEAM & ASK",
        phxCode: "PHX—008",
        figLabel: "FIG. 7.0 · TEAM & THE ASK",
        tbDrawing: "H · CLOSE",
    });

    // Headline
    slide.addText("Built by the people who built the\nfield.", {
        x: FRAME_M + 0.45, y: 1.4, w: 18.0, h: 2.4,
        fontFace: "Arial Black", fontSize: 64, color: COLORS.ink, bold: true,
        margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });

    // Two founders (left half, lower) — portrait above text
    const founders = [
        {
            name: "Dr. Mei Tanaka",
            role: "CO-FOUNDER · CEO",
            bio:  "Ex-Boston Dynamics motion lead. PhD MIT, 7 yrs on Atlas controls.",
            img:  IMG.s8a,
        },
        {
            name: "Arjun Rao",
            role: "CO-FOUNDER · CTO",
            bio:  "Built RoboGym at OpenAI. Stanford CS, prior founder (acq. NVIDIA).",
            img:  IMG.s8b,
        },
    ];
    const fStartX = FRAME_M + 0.45;
    const fStartY = 6.4;
    const fColW   = 5.6;
    founders.forEach((f, i) => {
        const x = fStartX + i * (fColW + 0.5);
        // Portrait
        slide.addImage({
            data: f.img,
            x: x, y: 4.2, w: 2.5, h: 2.08,
        });
        slide.addText(f.name, {
            x: x, y: fStartY, w: fColW, h: 0.5,
            fontFace: "Arial Black", fontSize: 22, color: COLORS.ink, bold: true,
            margin: 0,
        });
        slide.addText(f.role, {
            x: x, y: fStartY + 0.5, w: fColW, h: 0.32,
            fontFace: "Consolas", fontSize: 12, color: COLORS.muted,
            margin: 0, charSpacing: 1.5,
        });
        slide.addText(f.bio, {
            x: x, y: fStartY + 0.95, w: fColW, h: 0.9,
            fontFace: "Calibri", fontSize: 14, color: COLORS.ink,
            margin: 0, valign: "top",
        });
    });

    // The Ask box — dark navy panel on the right
    const askX = 13.4;
    const askY = 4.1;
    const askW = 5.7;
    const askH = 3.6;
    slide.addShape(pres.shapes.RECTANGLE, {
        x: askX, y: askY, w: askW, h: askH,
        fill: { color: COLORS.ink }, line: { color: COLORS.ink, width: 0 },
    });
    // Tiny orange tick brackets at top-left & bottom-right corners
    slide.addShape(pres.shapes.LINE, {
        x: askX, y: askY, w: 0.25, h: 0,
        line: { color: COLORS.orange, width: 1.5 },
    });
    slide.addShape(pres.shapes.LINE, {
        x: askX, y: askY, w: 0, h: 0.25,
        line: { color: COLORS.orange, width: 1.5 },
    });
    slide.addShape(pres.shapes.LINE, {
        x: askX + askW - 0.25, y: askY + askH, w: 0.25, h: 0,
        line: { color: COLORS.orange, width: 1.5 },
    });
    slide.addShape(pres.shapes.LINE, {
        x: askX + askW, y: askY + askH - 0.25, w: 0, h: 0.25,
        line: { color: COLORS.orange, width: 1.5 },
    });

    slide.addText("FIG. 7.1 · THE ASK", {
        x: askX + 0.3, y: askY + 0.25, w: askW - 0.6, h: 0.35,
        fontFace: "Consolas", fontSize: 12, color: "BFBFBF",
        margin: 0, charSpacing: 2,
    });
    slide.addText("$8M", {
        x: askX + 0.3, y: askY + 0.65, w: askW - 0.6, h: 1.25,
        fontFace: "Arial Black", fontSize: 80, color: COLORS.cream, bold: true,
        margin: 0, valign: "top",
    });
    slide.addText("SEED · LED BY YC", {
        x: askX + 0.3, y: askY + 1.95, w: askW - 0.6, h: 0.3,
        fontFace: "Consolas", fontSize: 12, color: "BFBFBF",
        margin: 0, charSpacing: 2,
    });
    // Hairline divider inside box
    slide.addShape(pres.shapes.LINE, {
        x: askX + 0.3, y: askY + 2.4, w: askW - 0.6, h: 0,
        line: { color: "5A6478", width: STROKE_THIN },
    });
    slide.addText([
        { text: "Funds 18-mo runway: scale PHX-1 to ", options: { color: COLORS.cream } },
        { text: "100B params",                          options: { color: COLORS.orange, bold: true } },
        { text: " , hire 6 robotics engineers, launch GA.", options: { color: COLORS.cream } },
    ], {
        x: askX + 0.3, y: askY + 2.55, w: askW - 0.6, h: 1.0,
        fontFace: "Calibri", fontSize: 14,
        margin: 0, valign: "top",
    });

    // Bottom horizontal divider
    slide.addShape(pres.shapes.LINE, {
        x: FRAME_M + 0.45, y: 8.55, w: FRAME_W - 1.0, h: 0,
        line: { color: COLORS.ink, width: STROKE_THIN },
    });

    // Bottom-left tagline
    slide.addText([
        { text: "Phyzix",       options: { color: COLORS.ink,    bold: true } },
        { text: ".",            options: { color: COLORS.orange, bold: true } },
        { text: " The brain for any robot.", options: { color: COLORS.ink, bold: true } },
    ], {
        x: FRAME_M + 0.45, y: 8.75, w: 12, h: 0.6,
        fontFace: "Arial Black", fontSize: 26,
        margin: 0, valign: "middle",
    });

    // Bottom-right contact info
    slide.addText([
        { text: "MEI@PHYZIX.AI",          options: { breakLine: true } },
        { text: "PHYZIX.AI / YC-W26",     options: {} },
    ], {
        x: 13.5, y: 8.7, w: 5.0, h: 0.85,
        fontFace: "Consolas", fontSize: 13, color: COLORS.ink, bold: true,
        margin: 0, align: "right", valign: "top", charSpacing: 1.5,
    });
}

// ---------------------------------------------------------------------------
const fileName = await pres.writeFile({ fileName: "Deliverable_10.pptx" });
console.log(`Wrote ${fileName}`);

}  // end of build()

build().catch((err) => { console.error(err); process.exit(1); });
