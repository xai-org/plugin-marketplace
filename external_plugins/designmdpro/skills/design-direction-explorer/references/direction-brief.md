# From mood words to library searches

`search_websites` matches literal keywords against name, domain, description and category. It doesn't understand "calm" or "premium" on its own. The library's **tags** carry the design vocabulary, so translate each direction into tags first.

## Procedure

1. Call `list_tags` with `limit: 200`. The tags mix design traits ("Dark Mode", "Monochrome", "Editorial", "Mesh Gradient"), typefaces ("Geist") and product traits ("Keyboard-First", "Fintech").
2. Call `list_categories` to get the product categories, with counts.
3. For each direction, choose **2–4 tags** whose meaning matches its mood keywords. Use the table below to know which tags to look for, but use only tags that `list_tags` actually returned. Use `list_tags` with `query` to check a stem (for example `query: "dark"`).
4. Optionally add the user's product category, so the references come from the same field. Leave it out when the direction is meant to borrow from another field.
5. Call `search_websites` with `{ tags, category?, limit: 5 }`. Tags match with OR, so more tags mean more results, not fewer.
6. If you get no results: drop the category, then swap tags, then try one `query` keyword taken from the mood (for example `"editorial"`).

## Mood → tag stems to look for

| Mood words                        | Look for tags containing                                     |
| --------------------------------- | ------------------------------------------------------------ |
| calm, quiet, focused, minimal     | minimal, monochrome, clean, whitespace, neutral, muted       |
| premium, luxury, refined          | serif, editorial, black, gold, brass, deep, elegant          |
| technical, developer, precise     | dark mode, dark ui, mono, grid, keyboard, terminal, geist    |
| bold, energetic, loud             | vibrant, neon, gradient, high contrast, saturated, brutalist |
| friendly, warm, approachable      | warm, rounded, pastel, illustration, playful, soft           |
| trustworthy, corporate, financial | navy, blue, fintech, enterprise, structured, conservative    |
| futuristic, immersive             | glass, frosted, luminous, glow, 3d, mesh gradient, dark      |
| natural, organic, sustainable     | earthy, green, beige, organic, paper, natural                |
| editorial, content-first          | editorial, serif, magazine, typography, reading              |
| scientific, data-heavy            | scientific, data, charts, dense, dashboard, grid             |

Tags are free-form and the vocabulary grows over time. Always check against `list_tags`.

## Picking references

- Choose sites whose `previewColors` actually show the direction. Tags describe a site's overall feel, but the palette is what goes on the card.
- Choose references with different palettes across the three directions, so the user sees real alternatives.
- Prefer non-Pro sites (`locked: false`) when two candidates are equally good. Every token of a non-Pro site is available.
- Two references per direction are enough: one for color, and optionally another one for typography.
