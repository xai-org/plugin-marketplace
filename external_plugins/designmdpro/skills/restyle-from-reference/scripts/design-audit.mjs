#!/usr/bin/env node
// Design audit helper for the DesignMD Pro restyle skills. No dependencies.
//
//   node design-audit.mjs baseline <theme files…> [--out .design-baseline.json]
//     Drafts a baseline of the CURRENT design (colors, fonts, CSS variables,
//     radii, shadows) from the given theme/style files. Review it before use.
//
//   node design-audit.mjs scan [--baseline .design-baseline.json] [--root .] [--json]
//     After a redesign, lists file:line hits for baseline values and for
//     hard-coded styling that bypasses the theme. Exits 1 when hits remain.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, resolve } from "node:path";

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".nuxt",
  ".output",
  ".svelte-kit",
  ".turbo",
  ".vercel",
  ".cache",
  "dist",
  "build",
  "out",
  "coverage",
  "vendor",
]);
const TEXT_EXTS = new Set(
  (
    ".css .scss .sass .less .styl .pcss .js .jsx .ts .tsx .mjs .cjs .mts .cts " +
    ".vue .svelte .astro .html .htm .md .mdx .json .svg .yml .yaml .liquid " +
    ".erb .hbs .njk .php .py .rb .ex .heex .xml .webmanifest"
  ).split(" "),
);
const SKIP_FILES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lockb",
  ".design-baseline.json",
  "design-directions.html",
  "design-audit.mjs",
]);
const MAX_BYTES = 1024 * 1024;
const MAX_HITS_PER_CHECK = 200;

// ── Colors ────────────────────────────────────────────────────────────────

const COLOR_RE =
  /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\([^)]*\)/gi;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const hex2 = (n) =>
  Math.round(clamp(n, 0, 255))
    .toString(16)
    .padStart(2, "0");

function parseNumbers(body) {
  return body.replace(/\/|,/g, " ").trim().split(/\s+/).filter(Boolean);
}

function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

/** Canonical lowercase `#rrggbb` (plus `aa` when not opaque), or the trimmed input for unsupported spaces. */
export function normalizeColor(raw) {
  const value = raw.trim().toLowerCase();
  if (value.startsWith("#")) {
    let h = value.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length === 8 && h.endsWith("ff")) h = h.slice(0, 6);
    return `#${h}`;
  }
  const m = value.match(/^(rgba?|hsla?)\((.*)\)$/);
  if (!m) return value.replace(/\s+/g, " ");
  const parts = parseNumbers(m[2]);
  if (parts.length < 3) return value;
  const alphaRaw = parts[3];
  let alpha = 1;
  if (alphaRaw !== undefined) {
    alpha = alphaRaw.endsWith("%")
      ? parseFloat(alphaRaw) / 100
      : parseFloat(alphaRaw);
  }
  let rgb;
  if (m[1].startsWith("rgb")) {
    rgb = parts
      .slice(0, 3)
      .map((p) =>
        p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p),
      );
  } else {
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    rgb = hslToRgb(((h % 360) + 360) % 360, s, l);
  }
  if (rgb.some(Number.isNaN)) return value;
  const a = Number.isNaN(alpha) || alpha >= 1 ? "" : hex2(alpha * 255);
  return `#${rgb.map(hex2).join("")}${a}`;
}

// ── File walking ──────────────────────────────────────────────────────────

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.isSymbolicLink()) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (
      entry.isFile() &&
      TEXT_EXTS.has(extname(entry.name).toLowerCase()) &&
      !SKIP_FILES.has(entry.name) &&
      !entry.name.endsWith(".min.js") &&
      !entry.name.endsWith(".min.css") &&
      !entry.name.endsWith(".map")
    ) {
      yield full;
    }
  }
}

function readText(file) {
  try {
    if (statSync(file).size > MAX_BYTES) return null;
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

// ── baseline ──────────────────────────────────────────────────────────────

const GENERIC_FONTS = new Set(
  (
    "serif sans-serif monospace cursive fantasy system-ui ui-sans-serif " +
    "ui-serif ui-monospace ui-rounded emoji math fangsong inherit initial " +
    "unset revert -apple-system blinkmacsystemfont var"
  ).split(" "),
);

function fontNames(list) {
  return list
    .split(",")
    .map((f) =>
      f
        .trim()
        .replace(/^["']|["']$/g, "")
        .trim(),
    )
    .filter(
      (f) =>
        f &&
        !f.startsWith("var(") &&
        !f.startsWith("--") &&
        !GENERIC_FONTS.has(f.toLowerCase()),
    );
}

function baseline(files, out) {
  const colors = new Map(); // normalized → first spelling seen
  const fonts = new Set();
  const cssVariables = new Set();
  const radii = new Set();
  const shadows = new Set();
  const themeFiles = [];
  for (const file of files) {
    const text = readText(file);
    if (text === null) {
      console.error(`skip (unreadable or >1 MiB): ${file}`);
      continue;
    }
    themeFiles.push(relative(process.cwd(), resolve(file)));
    for (const m of text.matchAll(COLOR_RE)) {
      const key = normalizeColor(m[0]);
      if (!colors.has(key)) colors.set(key, m[0].trim());
    }
    for (const m of text.matchAll(/font-family\s*:\s*([^;}\n]+)/gi))
      fontNames(m[1]).forEach((f) => fonts.add(f));
    for (const m of text.matchAll(
      /fontFamily\s*:\s*(\[[^\]]*\]|["'][^"']+["'])/g,
    ))
      fontNames(m[1].replace(/[[\]]/g, "")).forEach((f) => fonts.add(f));
    for (const m of text.matchAll(
      /import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/g,
    ))
      m[1]
        .split(",")
        .map((s) =>
          s
            .split(/\s+as\s+/)[0]
            .trim()
            .replace(/_/g, " "),
        )
        .filter(Boolean)
        .forEach((f) => fonts.add(f));
    for (const m of text.matchAll(/(?<![\w-])(--[a-z0-9][\w-]*)\s*:/gi))
      cssVariables.add(m[1]);
    for (const m of text.matchAll(
      /(?:border-radius|--radius[\w-]*)\s*:\s*([^;}\n]+)/gi,
    ))
      radii.add(m[1].trim());
    for (const m of text.matchAll(
      /(?:box-shadow|--shadow[\w-]*)\s*:\s*([^;}\n]+)/gi,
    ))
      shadows.add(m[1].trim());
  }
  const result = {
    colors: [...colors.values()],
    fonts: [...fonts],
    cssVariables: [...cssVariables],
    radii: [...radii],
    shadows: [...shadows],
    themeFiles,
  };
  writeFileSync(out, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `Wrote ${out}: ${result.colors.length} colors, ${result.fonts.length} fonts, ` +
      `${result.cssVariables.length} CSS variables, ${result.radii.length} radii, ` +
      `${result.shadows.length} shadows. Review it, and drop values the new design keeps.`,
  );
}

// ── scan ──────────────────────────────────────────────────────────────────

const PALETTE =
  "slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const PALETTE_UTILITY_RE = new RegExp(
  `(?<![\\w-])(?:[a-z]+:)*(?:bg|text|border(?:-[trblxy])?|ring|ring-offset|fill|stroke|from|via|to|outline|divide|placeholder|accent|caret|decoration|shadow)-(?:${PALETTE})-(?:50|[1-9]00|950)(?:\\/\\d+)?(?![\\w-])`,
  "g",
);
const ARBITRARY_COLOR_RE =
  /(?<![\w-])[a-z-]+-\[(?:#[0-9a-f]{3,8}|(?:rgba?|hsla?|oklch)\([^\]]*\))\]/gi;
const INLINE_STYLE_RE =
  /style=(?:\{\{[^}]*?(?:#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\()|"[^"]*?(?:#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\())/gi;

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function scan({ baselinePath, root, json }) {
  let base = {};
  if (baselinePath) {
    try {
      base = JSON.parse(readFileSync(baselinePath, "utf8"));
    } catch (error) {
      console.error(`Cannot read baseline ${baselinePath}: ${error.message}`);
      process.exit(2);
    }
  }
  const oldColors = new Set((base.colors ?? []).map(normalizeColor));
  const checks = {
    "baseline-color": [],
    "baseline-font": [],
    "baseline-css-variable": [],
    "palette-utility": [],
    "arbitrary-color": [],
    "inline-style-color": [],
  };
  const fontRes = (base.fonts ?? [])
    .filter((f) => f.trim().length > 1)
    .map((f) => [
      f,
      // `JetBrains Mono` also matches the next/font identifier `JetBrains_Mono`.
      new RegExp(
        `(?<![\\w-])${escapeRe(f.trim()).replace(/ +/g, "[ _]")}(?![\\w-])`,
        "i",
      ),
    ]);
  const varRes = (base.cssVariables ?? [])
    .filter((v) => v.startsWith("--"))
    .map((v) => [v, new RegExp(`(?<![\\w-])${escapeRe(v)}(?![\\w-])`)]);

  const add = (check, file, line, match) =>
    checks[check].push({ file, line, match: match.slice(0, 120) });

  for (const file of walk(root)) {
    const text = readText(file);
    if (text === null) continue;
    const rel = relative(root, file);
    const lines = text.split(/\r?\n/);
    lines.forEach((content, i) => {
      const line = i + 1;
      if (content.length > 2000) return; // minified / generated
      if (oldColors.size) {
        for (const m of content.matchAll(COLOR_RE)) {
          if (oldColors.has(normalizeColor(m[0])))
            add("baseline-color", rel, line, m[0]);
        }
      }
      for (const [name, re] of fontRes)
        if (re.test(content)) add("baseline-font", rel, line, name);
      for (const [name, re] of varRes)
        if (re.test(content)) add("baseline-css-variable", rel, line, name);
      for (const m of content.matchAll(PALETTE_UTILITY_RE))
        add("palette-utility", rel, line, m[0]);
      for (const m of content.matchAll(ARBITRARY_COLOR_RE))
        add("arbitrary-color", rel, line, m[0]);
      for (const m of content.matchAll(INLINE_STYLE_RE))
        add("inline-style-color", rel, line, m[0]);
    });
  }

  const total = Object.values(checks).reduce((n, hits) => n + hits.length, 0);
  if (json) {
    console.log(JSON.stringify({ total, checks }, null, 2));
  } else {
    for (const [check, hits] of Object.entries(checks)) {
      console.log(`\n## ${check} (${hits.length})`);
      for (const hit of hits.slice(0, MAX_HITS_PER_CHECK))
        console.log(`${hit.file}:${hit.line}  ${hit.match}`);
      if (hits.length > MAX_HITS_PER_CHECK)
        console.log(`… ${hits.length - MAX_HITS_PER_CHECK} more (use --json)`);
    }
    console.log(
      `\n${total} hit(s). Classify each as fix / keep (with a reason) / ask — see references/legacy-audit.md.` +
        (baselinePath
          ? ""
          : " No --baseline given: only theme-bypass checks ran."),
    );
  }
  process.exitCode = total > 0 ? 1 : 0;
}

// ── CLI ───────────────────────────────────────────────────────────────────

function option(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const value = args[i + 1];
  args.splice(i, 2);
  return value;
}

const isMain =
  process.argv[1] &&
  basename(process.argv[1]) === basename(new URL(import.meta.url).pathname);

if (isMain) {
  const [command, ...rest] = process.argv.slice(2);
  const args = [...rest];
  if (command === "baseline") {
    const out = option(args, "--out") ?? ".design-baseline.json";
    if (args.length === 0) {
      console.error(
        "usage: design-audit.mjs baseline <theme files…> [--out file]",
      );
      process.exit(2);
    }
    baseline(args, out);
  } else if (command === "scan") {
    const baselinePath = option(args, "--baseline");
    const root = resolve(option(args, "--root") ?? ".");
    const json = args.includes("--json");
    scan({ baselinePath, root, json });
  } else {
    console.error(
      "usage:\n  design-audit.mjs baseline <theme files…> [--out .design-baseline.json]\n" +
        "  design-audit.mjs scan [--baseline .design-baseline.json] [--root .] [--json]",
    );
    process.exit(2);
  }
}
