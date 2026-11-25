# Legacy design audit

Run this after applying a new design. The goal is a codebase where nothing still renders the old design by accident.

## Baseline file

`.design-baseline.json` at the project root, written **before** the redesign:

```json
{
  "colors": ["#0f172a", "#6366f1", "rgb(99 102 241)", "hsl(239 84% 67%)"],
  "fonts": ["Inter", "JetBrains Mono"],
  "cssVariables": ["--brand", "--brand-foreground"],
  "radii": ["6px", "0.5rem"],
  "shadows": ["0 1px 2px rgb(0 0 0 / 0.05)"],
  "themeFiles": ["src/app/globals.css", "tailwind.config.ts"]
}
```

All keys are optional arrays of strings. Remove values from `colors` that the new design deliberately keeps, such as pure white or black shared by both designs. They would show up as false positives in the scan.

## 1. Automated scan (if Node is available)

```sh
node scripts/design-audit.mjs scan --baseline .design-baseline.json
```

The scan prints `file:line` hits, grouped by check, and skips `node_modules`, build output, lockfiles and binary files. It looks for:

- **Baseline colors**, normalized: `#FFF` = `#ffffff`, and `rgb()`/`hsl()` match their hex equivalent.
- **Baseline fonts** and **CSS variable names**.
- **Hard-coded palette utilities**, for example `bg-blue-500`, `text-gray-700`, `border-slate-200`, `ring-indigo-*`, `from-*`/`to-*` gradients. These bypass the theme.
- **Arbitrary color values**, for example `bg-[#1a1a1a]` and `text-[rgb(…)]`.
- **Inline color styles**, for example `style={{ color: "#…" }}` and `style="background:#…"`.

Without Node, run the same searches with your own search tools. Use the baseline values as fixed strings, and match hex colors case-insensitively in both their 3- and 6-digit forms.

## 2. Places scans usually miss

Check each of these by hand:

- [ ] **Theme files themselves**: old tokens defined but unused, and old `@font-face` or font imports still loaded.
- [ ] **Dark mode**: `.dark`, `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` blocks still carrying old values.
- [ ] **SVG**: `fill`/`stroke` literals in inline SVGs, icon components and `.svg` files that should follow the theme (prefer `currentColor`).
- [ ] **Charts and data viz**: series color arrays in chart configs (Recharts, Chart.js, ECharts, D3 scales).
- [ ] **Browser chrome**: `<meta name="theme-color">`, `manifest.json`/`manifest.ts` `theme_color`/`background_color`, and Safari `mask-icon` color.
- [ ] **Generated images**: OG/Twitter image templates (`opengraph-image.tsx`, `next/og`, Satori), favicons with old brand colors, and social cards.
- [ ] **Emails and PDFs**: email templates (React Email, MJML, HTML) often hard-code colors because they cannot use CSS variables.
- [ ] **Third-party themes**: auth widgets (Clerk, Auth0), payment elements (Stripe appearance API), maps, code highlighters (Shiki/Prism theme), editor themes, toast libraries.
- [ ] **Canvas, WebGL, Lottie and animations**: color literals in JS.
- [ ] **Docs, Storybook and tests**: snapshot tests and visual baselines that encode old colors. Update them, don't delete them.
- [ ] **Copy that names the old look**, for example "our purple button" in docs or alt text.

## 3. Classify every hit

For each finding, decide:

| Outcome                | When                                                                                                          | Action                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **Fix**                | Renders the old design and should follow the new one                                                          | Replace with the new token   |
| **Keep (intentional)** | Shared neutral, a third-party brand color (e.g. a "Sign in with Google" button), data semantics (red = error) | Leave it and give the reason |
| **Ask**                | You can't tell whether it is brand, content or design                                                         | List it for the user         |

Prefer replacing a literal with a **theme token** (CSS variable, Tailwind theme key) over replacing it with the new literal. Otherwise the next redesign hits the same problem.

## 4. Verify

- Run the scan again until only **Keep** and **Ask** items remain.
- Build or type-check the project if you can.
- If you can view the app, check the main page, a form, an empty state and dark mode.
