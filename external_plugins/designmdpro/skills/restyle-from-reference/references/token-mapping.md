# Mapping DESIGN.md tokens onto a project

`get_design_md` with `format: "json"` returns five token groups:

| Group        | Shape                                                                 | Example key                        |
| ------------ | --------------------------------------------------------------------- | ---------------------------------- |
| `colors`     | `{ name: { type: "color", hex } }`                                    | `primary`, `surface`, `on-primary` |
| `typography` | `{ name: { fontFamily, fontSize, fontWeight, lineHeight, … } }`       | `heading-display`, `body-text`     |
| `rounded`    | `{ name: { value, unit } }`                                           | `sm`, `md`, `lg`                   |
| `spacing`    | `{ name: { value, unit } }`                                           | `base`, `gutter`, `section`        |
| `components` | `{ name: { properties: { backgroundColor, textColor, radius, … } } }` | `btn-primary`, `card`              |

Token names are chosen by each site, so map them **by role**, not by name. Read the `Colors` prose section to learn which color each name is for.

## Color roles

| Role                 | Typical DESIGN.md names                          | shadcn/ui variable              | Tailwind v4 `@theme`         | MUI `palette`          |
| -------------------- | ------------------------------------------------ | ------------------------------- | ---------------------------- | ---------------------- |
| Page background      | `surface`, `background`, `canvas`, `base`        | `--background`                  | `--color-background`         | `background.default`   |
| Body text            | `on-surface`, `text`, `foreground`, `ink`        | `--foreground`                  | `--color-foreground`         | `text.primary`         |
| Raised surface       | `surface-raised`, `card`, `elevated`, `panel`    | `--card`, `--popover`           | `--color-card`               | `background.paper`     |
| Muted surface / text | `muted`, `subtle`, `surface-2`, `text-secondary` | `--muted`, `--muted-foreground` | `--color-muted`              | `text.secondary`       |
| Primary action       | `primary`, `brand`, `accent` (when only one)     | `--primary`                     | `--color-primary`            | `primary.main`         |
| On primary           | `on-primary`, `primary-foreground`               | `--primary-foreground`          | `--color-primary-foreground` | `primary.contrastText` |
| Secondary highlight  | `accent`, `secondary`, `highlight`               | `--accent`, `--secondary`       | `--color-accent`             | `secondary.main`       |
| Border / divider     | `outline`, `border`, `divider`, `stroke`         | `--border`, `--input`           | `--color-border`             | `divider`              |
| Focus ring           | `focus`, `ring`, or the primary                  | `--ring`                        | `--color-ring`               | —                      |
| Danger / success     | `error`, `danger`, `success`, `warning`          | `--destructive`                 | `--color-destructive`        | `error.main`, …        |

If the reference site doesn't define a role the project needs (for example `--destructive`), keep the project's current value, or derive one that is consistent with the new palette, and say which one you did.

## Typography

- **Families**: map the heading and body families to the project's font variables (`--font-sans`, `--font-heading`, `--font-mono`, or `fontFamily` in the theme). Load them the way the project already loads fonts (`next/font`, `@fontsource`, `<link>`).
- **Scale**: map named styles (`heading-display`, `heading-1`, `body-text`, `label`, `code`) to the project's text styles or utility classes. Keep the project's semantic names, so markup doesn't need to change.
- **Proprietary fonts**: if the family is a commercial or brand-exclusive face, use a close free alternative from `references/font-alternatives.md`. Say that you substituted. If the font isn't listed there, choose a free family with similar proportions and tell the user it is your own pick.

## Shape and spacing

- `rounded` → `--radius` (shadcn derives `sm`/`md`/`lg` from it), `--radius-*` in Tailwind v4 `@theme`, `borderRadius` in v3 config, `shape.borderRadius` in MUI.
- `spacing` → keep the project's spacing scale unless the reference base unit differs a lot. Apply section and gutter values to layout containers, not to every margin.
- Shadows and elevation from the prose → `--shadow-*` tokens.

## Components

`components` entries reference other tokens (`'{colors.primary}'`). Apply them to the project's primitives (`Button`, `Input`, `Card`, `Badge`, nav) by updating their variant styles to use theme tokens. Don't paste literals.

## Stack quick reference

- **Tailwind v4**: edit the `@theme` (or `@theme inline`) block in the main CSS file. Utilities such as `bg-primary` update automatically.
- **Tailwind v3**: edit `theme.extend.colors` / `fontFamily` / `borderRadius` in `tailwind.config.*`, ideally pointing to CSS variables.
- **shadcn/ui**: edit `:root` and `.dark` variables in the global CSS. Match the existing color format (`oklch()`, `hsl()` channels or hex).
- **Plain CSS / CSS Modules**: edit the `:root` custom properties, then search for literals that bypass them.
- **MUI**: `createTheme({ palette, typography, shape })`.
- **Chakra**: `extendTheme` / `createSystem` tokens and semantic tokens.
- **styled-components / Emotion**: the `ThemeProvider` theme object.
