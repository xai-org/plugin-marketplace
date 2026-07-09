# Editing Presentations

## When Given a Template — EDIT IT, NEVER Recreate

**If a template .pptx is attached, you MUST edit it directly using unpack/edit/pack. NEVER use pptxgenjs to create from scratch.** See [creating.md](creating.md) for the de novo workflow.

### Critical Rules

1. **ALWAYS edit the template file, even when the content doesn't match.** A quiz template used for a portfolio review? A Christmas template used for a skincare campaign? **It doesn't matter.** Unpack the template, replace the text, keep everything else. The visual style IS the template — backgrounds, shapes, media, colors, fonts — and you can only preserve that by editing in place.

2. **NEVER create from scratch with pptxgenjs when a template exists.** You cannot recreate a template's visual fidelity programmatically. Gradients, embedded images, custom shapes, theme colors, layout relationships — these are all lost when you start from an empty `new pptxgen()`. The result will always look worse than editing the original.

3. **NEVER use `sed`, `awk`, `perl`, or raw regex shell commands on XML files.** These tools break on XML escaping, shell quoting (e.g. apostrophes in content like "TWICE's"), and multi-line XML tags. Instead, use the provided Python scripts which handle all of this correctly:
   - `replace_text.py` — replace text in placeholder shapes (`--ph ctrTitle`, `--match "text"`)
   - `replace_nth_text.py` — replace specific substrings or duplicate text (`--find "OLD" --text "NEW"`)
   - For anything these scripts can't handle, use the Edit tool on the XML directly.

4. **Do NOT adapt the template's colors or fonts to "match" the topic.** If the template uses red (#DD3D4E) and the topic is "green energy", keep the red. The task is to follow the template's visual style exactly, not to pick colors that feel appropriate for the subject matter.

5. **Reuse, don't recreate.** Templates contain carefully designed assets — gradient backgrounds, decorative shapes, icons, logos. Use `inspect_slide.py --media` to see them. Copy and reference original media files directly — never approximate gradients with shapes or redraw icons.

6. **Content mismatch is expected.** The template might be a quiz, a Christmas card, or a restaurant menu. Your job is to replace ALL text with the new topic while preserving every visual element: backgrounds, shapes, images, colors, fonts, positions, sizes.

7. **Replace EVERY piece of template text, not just the obvious ones.** After replacing titles and body text, use `replace_nth_text.py --list` on each slide to find leftover text in footers, captions, subtitle shapes, grouped shapes, and text boxes. If it came from the template and isn't your content, replace it.

### Style Matching Rule

**When editing an existing presentation, always match its existing style** — colors, fonts, layout patterns, background treatment, and visual language. Do not impose a new theme unless the user explicitly asks to restyle or change the look. Analyze the existing slides first (thumbnails, color values, font choices) and replicate them faithfully.

### Font Preservation Rule

**Always preserve the original font declarations in the XML**, even if the font isn't installed in the current environment. The PPTX will render correctly when opened on the end user's machine (which likely has the font). Changing a `typeface="Calibri"` to `typeface="Liberation Sans"` just because Calibri isn't installed locally would break the presentation for the recipient.

- When **editing** slides: copy `<a:rPr>` font attributes from existing text runs. Never substitute fonts.
- When **adding** new text to an existing deck: use the same `typeface` as surrounding text on that slide.
- `detect_fonts.py` warnings about missing fonts are **informational for rendering QA** — they tell you the preview may look different, not that you should change the font.

### Workflow Summary

**unpack → overview → pick slides → delete extras → replace ALL text → verify no leftovers → fix overlaps → clean → pack**

```bash
python scripts/office/unpack.py template.pptx unpacked/
python scripts/inspect_slide.py unpacked/ --summary --theme --media   # compact overview
python scripts/inspect_slide.py unpacked/ppt/slides/slide1.xml       # detail for slides you keep
# Delete unwanted slides (by number or --keep the ones you want)
python scripts/delete_slide.py unpacked/ --keep 1 4 8
# Replace text in EVERY kept slide (see below for details)
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --text "New Title"
# If duplicate text (e.g., multiple "Chapter Title" bullets), use replace_nth_text.py:
python scripts/replace_nth_text.py unpacked/ppt/slides/slide4.xml --find "Chapter Title" --nth 1 --text "2025 VISION"

# ── VERIFY: no template text remains ──
python scripts/replace_nth_text.py unpacked/ppt/slides/slide1.xml --list
python scripts/replace_nth_text.py unpacked/ppt/slides/slide2.xml --list
# ... repeat for every kept slide. If ANY original template text remains, replace it now.

# ── FIX OVERLAPS: auto-apply text shrink to overlapping shapes ──
python scripts/check_overlaps.py unpacked/ --fix
python scripts/clean.py unpacked/
python scripts/office/pack.py unpacked/ output.pptx --original template.pptx
```

**Common failure: leftover template text.** After replacing text, always run `--list` on every slide and scan the output. Template text like "Hello there", "Name Title or Position", "Elaborate on the featured statistic", "SlidesCarnival", or any text you didn't write must be replaced or removed.

---

## Template-Based Workflow (Detailed)

When using an existing presentation as a template:

1. **Unpack**: `python scripts/office/unpack.py template.pptx unpacked/`

2. **Get overview** — use `--summary` to avoid output truncation on large templates:
   ```bash
   # Compact overview (one line per slide with background colors, theme fonts)
   python scripts/inspect_slide.py unpacked/ --summary --theme --media

   # Visual overview — see what slides actually look like
   python scripts/thumbnail.py template.pptx

   # Visual media grid — see all images/icons/logos at a glance
   python scripts/media_grid.py unpacked/

   # Then inspect specific slides you plan to keep (detailed per-run formatting)
   python scripts/inspect_slide.py unpacked/ppt/slides/slide1.xml
   ```

   **Do NOT manually run `soffice` + `pdftoppm`** — use `thumbnail.py` and `media_grid.py` instead. They handle conversion, grid layout, and labeling automatically.

3. **Plan slide mapping** — decide which template slides to KEEP and what content goes on each.

   The template may have completely different content (quiz, menu, holiday card). **This is expected.** Your job: pick the best-looking slides from the template, delete the rest, and replace text.

   **Procedure:**
   1. Look at the `--summary` output to see what each slide contains
   2. For each section of YOUR content, pick a template slide with a suitable layout (title slide, content with cards, table, chart area, conclusion)
   3. Write down the mapping: "slide1 → my title, slide3 → agenda, slide9 → data table, slide12 → scoreboard, slide20 → conclusion"
   4. Delete everything else

   **Layout variety tips** — don't default to basic title + bullet slides:
   - Multi-column layouts for comparisons
   - Card/grid layouts for ratings or features
   - Table slides for data comparisons
   - Full-bleed image slides for section dividers
   - Scoreboards or stat callouts for key numbers

4. **Build presentation** (do this yourself, not with subagents):
   ```bash
   # Delete unwanted slides (by number or keep only the ones you want)
   python scripts/delete_slide.py unpacked/ 3 5 6 7 9 10
   # Or equivalently: keep only slides 1, 2, 4, 8
   python scripts/delete_slide.py unpacked/ --keep 1 2 4 8

   # Duplicate a slide you want to reuse (auto-inserts into presentation order)
   python scripts/add_slide.py unpacked/ slide2.xml                  # append at end
   python scripts/add_slide.py unpacked/ slide2.xml --after slide4.xml  # insert after slide4
   ```
   - **Complete all structural changes before step 5**

5. **Replace placeholder text** — use `replace_text.py` instead of manual XML editing:
   ```bash
   # Simple text replacement (inherits formatting from template)
   python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --text "New Title"

   # Multi-line text (creates line breaks)
   python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph subTitle --text "Line 1\nLine 2"

   # Custom formatting per run (when you need different fonts/colors/sizes)
   python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --runs '[
     {"text": "Gift the Glow", "size": 4800, "color": "accent1", "font": "Satisfy"},
     {"br": true},
     {"text": "LuminaBotani • Holiday 2025", "size": 2000, "color": "accent4"}
   ]'

   # Match by text content instead of placeholder type
   python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --match "Christmas" --text "Holiday Special"
   ```
   **Use subagents here if available** — slides are separate XML files, so subagents can replace text in parallel.

   For shapes not covered by `replace_text.py` (images, charts, complex grouped elements), use `replace_nth_text.py` for targeted `<a:t>` element edits, or the Edit tool on the XML directly — see Editing Content below.

   > ⚠️ **NEVER use `sed`, `awk`, or shell regex commands on XML files.** They break on XML escaping, shell quoting (apostrophes, special chars), and multi-line tags. Always use the Python scripts or the Edit tool instead.

6. **Clean**: `python scripts/clean.py unpacked/`

7. **Pack**: `python scripts/office/pack.py unpacked/ output.pptx --original template.pptx`

---

## Scripts

| Script | Purpose |
|--------|---------|
| `inspect_slide.py` | **Inspect placeholders, text, images, and media** — use first |
| `check_overlaps.py` | **Lint for overlapping shapes** — run after editing, before packing |
| `replace_text.py` | **Replace placeholder text preserving formatting** — use for edits |
| `replace_nth_text.py` | **Replace substrings or duplicate text in individual `<a:t>` elements** |
| `resize_shape.py` | **Resize or reposition shapes** — fix text overflow without editing XML |
| `delete_slide.py` | **Delete slides** — remove from presentation order + cleanup |
| `add_slide.py` | **Duplicate slide or create from layout** — auto-inserts into order |
| `unpack.py` | Extract and pretty-print PPTX |
| `clean.py` | Remove orphaned files |
| `media_grid.py` | **Visual thumbnail grid of all media assets** |
| `pack.py` | Repack with validation |
| `thumbnail.py` | Create visual grid of slides |

### inspect_slide.py

```bash
# Full inspection: slides + theme colors + media inventory
python scripts/inspect_slide.py unpacked/ --theme --media

# Inspect a single slide
python scripts/inspect_slide.py unpacked/ppt/slides/slide1.xml
```

Shows text shapes (with placeholder type, formatting, autofit mode, dimensions), image shapes (with resolved media file paths), theme colors, and a full media inventory. Use this **before** editing.

Example output:
```
=== Theme Colors ===
  Scheme: Christmas
    dk1          = system:000000
    lt1          = system:FFFFFF
    accent1      = #F33D41

=== slide1.xml ===

[0] Picture 3  4.0"×3.0"
  image: ppt/media/image1.png (rId2)

[1] Title 1 (ctrTitle)  8.2"×1.4" autofit=fixed
  text: "This is your Christmas presentation"
  'T'                                  → Satisfy 44pt accent1
  'Christmas'                          → Satisfy 48pt accent1

=== Media Inventory ===
  ppt/media/image1.png                      234 KB  png   ← slide1.xml
  ppt/media/image2.svg                       12 KB  svg   ← slide2.xml, slide3.xml
  ppt/media/logo.emf                         89 KB  emf   ← slideLayout1.xml

  Total: 3 files, 335 KB
```

The media inventory shows which slides/layouts reference each file — critical for knowing which assets to preserve during template editing.

### media_grid.py

```bash
# Visual grid of all media assets (images, icons, logos, backgrounds)
python scripts/media_grid.py unpacked/

# Custom columns
python scripts/media_grid.py unpacked/ assets --cols 6
```

Creates `media_grid.jpg` — a thumbnail grid showing every file in `ppt/media/` with labels (filename, size, referencing slides). Non-image formats (EMF, WMF, SVG) appear as colored placeholders with format labels.

**Use this to visually identify** which images are logos, which are decorative backgrounds, and which are content — critical for knowing what to preserve during template editing.

### replace_text.py

```bash
# Simple replacement (inherits font, size, color from template)
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --text "New Title"

# Multi-line
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --text "Line 1\nLine 2"

# Custom formatting per run (JSON)
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --runs '[
  {"text": "Gift the Glow", "size": 4800, "color": "accent1", "font": "Satisfy"},
  {"br": true},
  {"text": "LuminaBotani • Holiday 2025", "size": 2000, "color": "accent4"}
]'

# Match by text content (case-insensitive)
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --match "Christmas" --text "Holiday"

# Dry run (preview without modifying)
python scripts/replace_text.py unpacked/ppt/slides/slide1.xml --ph ctrTitle --text "New" --dry-run
```

Replaces text in a placeholder while preserving paragraph properties (alignment, spacing) and inheriting formatting from the template's existing runs. Modifies the file in-place.

**JSON run properties** (all optional — omitted properties inherit from template):

| Property | Type | Example | Notes |
|----------|------|---------|-------|
| `text` | string | `"Gift the Glow"` | The text content |
| `br` | boolean | `true` | Line break (mutually exclusive with text) |
| `size` | integer | `4800` | Hundredths of a point (4800 = 48pt) |
| `color` | string | `"accent1"` or `"#FF0000"` | Scheme name or hex |
| `font` | string | `"Satisfy"` | Typeface name |
| `bold` | boolean | `true` | Bold weight |
| `italic` | boolean | `true` | Italic style |

**Tip:** Always add `--autofit` when your replacement text is longer than the original to prevent overflow:

### resize_shape.py

```bash
# List all shapes with current positions and dimensions
python scripts/resize_shape.py unpacked/ppt/slides/slide1.xml --list

# Set absolute height (inches) — text box too short for new content
python scripts/resize_shape.py slide.xml --ph body --height 3.5

# Set absolute width and height
python scripts/resize_shape.py slide.xml --ph ctrTitle --width 9.0 --height 2.0

# Grow taller by 0.5" relative to current size
python scripts/resize_shape.py slide.xml --ph body --dh 0.5

# Move a shape down by 0.3" to make room above
python scripts/resize_shape.py slide.xml --ph body --dy 0.3

# Match by shape name or text content
python scripts/resize_shape.py slide.xml --name "Title 1" --height 2.0
python scripts/resize_shape.py slide.xml --match "Lorem" --height 4.0

# Dry run (preview without modifying)
python scripts/resize_shape.py slide.xml --ph body --dh 0.5 --dry-run
```

Adjusts shape dimensions and/or position in the slide XML without touching text or formatting. All values are in **inches**. Use `--width`/`--height` for absolute sizes, `--dw`/`--dh` for relative adjustments, and `--x`/`--y`/`--dx`/`--dy` for position.

**Common patterns:**

| Problem | Fix |
|---------|-----|
| Text overflows bottom of box | `--dh 0.5` (grow taller) or `--height 4.0` (set exact) |
| Text wraps too much (box too narrow) | `--dw 1.0` (grow wider) |
| Two shapes overlap after resize | `--dy 0.5` on the lower shape (push it down) |
| Need to see current dimensions | `--list` |

### unpack.py

```bash
python scripts/office/unpack.py input.pptx unpacked/
```

Extracts PPTX, pretty-prints XML, escapes smart quotes.

### delete_slide.py

```bash
# Delete specific slides (by filename or number)
python scripts/delete_slide.py unpacked/ slide3.xml slide5.xml slide7.xml
python scripts/delete_slide.py unpacked/ 3 5 7

# Keep only specific slides (delete everything else) — usually easier
python scripts/delete_slide.py unpacked/ --keep 1 4 8

# List all slides in presentation order
python scripts/delete_slide.py unpacked/ --list

# Dry run (preview without modifying)
python scripts/delete_slide.py unpacked/ --keep 1 4 8 --dry-run
```

Removes slides from `<p:sldIdLst>` in `presentation.xml` and automatically runs cleanup to remove orphaned slide files, media, and relationships. Prevents deleting ALL slides (at least one must remain).

**Use `--keep` mode** when the template has many slides and you only want a few — it's easier to list what you want than what you don't.

### add_slide.py

```bash
# Duplicate slide2, append at end
python scripts/add_slide.py unpacked/ slide2.xml

# Duplicate slide2, insert after slide1
python scripts/add_slide.py unpacked/ slide2.xml --after slide1.xml
python scripts/add_slide.py unpacked/ slide2.xml --after 1

# Create from a layout template
python scripts/add_slide.py unpacked/ slideLayout2.xml
```

Duplicates an existing slide (or creates from a layout), then automatically inserts it into the slide order in `presentation.xml`. Use `--after` to control position.

### clean.py

```bash
python scripts/clean.py unpacked/
```

Removes slides not in `<p:sldIdLst>`, unreferenced media, orphaned rels.

### pack.py

```bash
python scripts/office/pack.py unpacked/ output.pptx --original input.pptx
```

Validates, repairs, condenses XML, re-encodes smart quotes.

### thumbnail.py

```bash
python scripts/thumbnail.py input.pptx [output_prefix] [--cols N]
```

Creates `thumbnails.jpg` with slide filenames as labels. Default 3 columns, max 12 per grid.

**Use for template analysis only** (choosing layouts). For visual QA, use `soffice` + `pdftoppm` to create full-resolution individual slide images—see SKILL.md.

---

## Slide Operations

Slide order is in `ppt/presentation.xml` → `<p:sldIdLst>`.

**Delete**: Use `delete_slide.py` — removes from `<p:sldIdLst>` and cleans up orphans automatically:
```bash
python scripts/delete_slide.py unpacked/ --keep 1 4 8   # keep only these
python scripts/delete_slide.py unpacked/ 3 5 7           # delete these
```

**Add/Duplicate**: Use `add_slide.py` — creates the file and auto-inserts into `<p:sldIdLst>`:
```bash
python scripts/add_slide.py unpacked/ slide2.xml --after slide1.xml
```
Never manually copy slide files — the script handles notes references, Content_Types.xml, and relationship IDs.

**Reorder**: Rearrange `<p:sldId>` elements in `presentation.xml` using the Edit tool.

---

## Editing Content

**Subagents:** If available, use them here (after completing step 4). Each slide is a separate XML file, so subagents can edit in parallel. In your prompt to subagents, include:
- The slide file path(s) to edit
- **"Use the Edit tool for all changes"**
- The formatting rules and common pitfalls below

For each slide:
1. Read the slide's XML
2. Identify ALL placeholder content—text, images, charts, icons, captions
3. Replace each placeholder with final content

**Use `replace_text.py`, `replace_nth_text.py`, or the Edit tool — NEVER `sed`/`awk`/shell regex.** The Python scripts handle XML escaping, formatting preservation, and shell quoting automatically. `sed` will silently corrupt XML or fail on content with apostrophes, angle brackets, or special characters.

### Formatting Rules

- **Bold all headers, subheadings, and inline labels**: Use `b="1"` on `<a:rPr>`. This includes:
  - Slide titles
  - Section headers within a slide
  - Inline labels like (e.g.: "Status:", "Description:") at the start of a line
- **Never use unicode bullets (•)**: Use proper list formatting with `<a:buChar>` or `<a:buAutoNum>`
- **Bullet consistency**: Let bullets inherit from the layout. Only specify `<a:buChar>` or `<a:buNone>`.

---

## Common Pitfalls

### Template Adaptation

When source content has fewer items than the template:
- **Remove excess elements entirely** (images, shapes, text boxes), don't just clear text
- Check for orphaned visuals after clearing text content
- Run visual QA to catch mismatched counts

When replacing text with different length content:
- **Shorter replacements**: Usually safe
- **Longer replacements**: May overflow or wrap, causing overlap with neighboring elements

### Preventing Text Overflow

Text overflow is the #1 cause of `no_render_artifacts` and `layout_match` failures. PPTX shapes have fixed absolute positions — they don't reflow like HTML.

**Check dimensions first** with `inspect_slide.py`:
```
[0] Title 1 (ctrTitle)  8.2"×1.4" autofit=fixed
```
The `8.2"×1.4"` tells you how much space you have. `autofit=fixed` means text will clip/overflow if too long.

**Prevention strategies (in order of preference):**

1. **Use `--autofit`** when replacing text — adds `<a:normAutofit/>` to the text box, which makes PowerPoint auto-shrink the font to fit:
   ```bash
   python scripts/replace_text.py slide.xml --ph ctrTitle --text "A Very Long Title" --autofit
   ```

2. **Resize the text box** with `resize_shape.py` — make it taller or wider to fit longer content:
   ```bash
   # Grow body box taller by 0.5"
   python scripts/resize_shape.py slide.xml --ph body --dh 0.5

   # Set exact height for a text box that needs more room
   python scripts/resize_shape.py slide.xml --ph body --height 4.0

   # If resizing causes overlap, move the shape below it down
   python scripts/resize_shape.py slide.xml --name "Footer Text" --dy 0.5
   ```

3. **Reduce font size explicitly** in `--runs` when replacement is significantly longer than original:
   ```bash
   python scripts/replace_text.py slide.xml --ph body --runs '[
     {"text": "Long paragraph...", "size": 1600}
   ]'
   ```

4. **Adapt content to fit** — shorten text, use abbreviations, split across multiple slides. The model should respect the template's design constraints.

5. **Reduce line spacing** — tighten `<a:lnSpc>` in `<a:pPr>` to fit more lines:
   ```xml
   <a:pPr><a:lnSpc><a:spcPts val="1600"/></a:lnSpc></a:pPr>
   ```

6. **Set autofit manually in XML** — add `<a:normAutofit/>` inside `<a:bodyPr>`:
   ```xml
   <!-- Before: text clips at box boundary -->
   <a:bodyPr wrap="square" rtlCol="0"/>

   <!-- After: text auto-shrinks to fit -->
   <a:bodyPr wrap="square" rtlCol="0"><a:normAutofit/></a:bodyPr>
   ```

**Autofit modes in PPTX:**

| XML Element | Behavior | When to Use |
|-------------|----------|-------------|
| `<a:normAutofit/>` | Auto-shrink font to fit box | **Default choice** — preserves layout |
| `<a:spAutoFit/>` | Auto-grow box to fit text | Risky — may overlap neighbors |
| `<a:noAutofit/>` | Fixed — text clips at boundary | Only for decorative text |
| *(none)* | Varies by shape type | Check with `inspect_slide.py` |

- Test with visual QA after text changes
- Consider truncating or splitting content to fit the template's design constraints

**Template slots ≠ Source items**: If template has 4 team members but source has 3 users, delete the 4th member's entire group (image + text boxes), not just the text.

### Multi-Item Content

If source has multiple items (numbered lists, multiple sections), create separate `<a:p>` elements for each — **never concatenate into one string**.

**❌ WRONG** — all items in one paragraph:
```xml
<a:p>
  <a:r><a:rPr .../><a:t>Step 1: Do the first thing. Step 2: Do the second thing.</a:t></a:r>
</a:p>
```

**✅ CORRECT** — separate paragraphs with bold headers:
```xml
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" b="1" .../><a:t>Step 1</a:t></a:r>
</a:p>
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" .../><a:t>Do the first thing.</a:t></a:r>
</a:p>
<a:p>
  <a:pPr algn="l"><a:lnSpc><a:spcPts val="3919"/></a:lnSpc></a:pPr>
  <a:r><a:rPr lang="en-US" sz="2799" b="1" .../><a:t>Step 2</a:t></a:r>
</a:p>
<!-- continue pattern -->
```

Copy `<a:pPr>` from the original paragraph to preserve line spacing. Use `b="1"` on headers.

### Replacing Specific Text (Substrings, Duplicates, Form Fields)

**Use `replace_nth_text.py`** when `replace_text.py` doesn't fit — it operates on individual `<a:t>` elements and does **substring replacement** by default.

**⚠ Shell quoting**: If replacement text contains `$`, use **single quotes** to prevent bash expansion. `"$4,500"` becomes `",500"` (bash eats `$4`). Use `'$4,500'` instead.

#### Substring fields (e.g., "Debut Year: YYYY")

When a shape has multiple fields like `Debut Year: YYYY | Fan Club: [Name]`, `replace_text.py --match` would replace the ENTIRE shape text. Use `replace_nth_text.py` to swap individual placeholders:

```bash
# Only the matched portion is replaced — surrounding text is preserved:
#   <a:t>Debut Year: YYYY</a:t>  →  <a:t>Debut Year: 2015</a:t>
python scripts/replace_nth_text.py slide2.xml --find "YYYY" --all --text "2015"
python scripts/replace_nth_text.py slide2.xml --find "[Fan Club Name]" --all --text "ONCE"
python scripts/replace_nth_text.py slide2.xml --find "[Company Name]" --all --text "JYP Entertainment"
```

#### Duplicate text (e.g., multiple "Chapter Title" bullets)

When `edit_file` says "Found N matches," **don't build unique `old_string` with XML context** — that wastes tokens and is fragile:

```bash
# Step 1: See all text elements with indices
python scripts/replace_nth_text.py slide4.xml --list --find "Chapter Title"
#  Idx   Line  Text
#  ---   ----  ----
#    3    132  Chapter Title
#    4    176  Chapter Title

# Step 2: Replace each occurrence individually (1-based)
python scripts/replace_nth_text.py slide4.xml --find "Chapter Title" --nth 1 --text "2025 CREATIVE VISION" --full
python scripts/replace_nth_text.py slide4.xml --find "Chapter Title" --nth 1 --text "CIRCULARITY METRICS" --full
# Note: after replacing the 1st, the former 2nd becomes the new 1st

# Or target by absolute index (0-based, from --list output)
python scripts/replace_nth_text.py slide4.xml --index 3 --text "2025 CREATIVE VISION"
python scripts/replace_nth_text.py slide4.xml --index 4 --text "CIRCULARITY METRICS"
```

#### When to use which tool

| Scenario | Tool |
|----------|------|
| Replace text in a placeholder shape (ctrTitle, subTitle, body) | `replace_text.py --ph` |
| Replace text matched by content, targeting the whole shape | `replace_text.py --match` |
| Swap a substring field like "YYYY" → "2015" preserving context | `replace_nth_text.py --find --text` |
| Duplicate text in same shape (multiple bullets with same text) | `replace_nth_text.py --find --nth --full` |
| Need to target a specific `<a:t>` element precisely | `replace_nth_text.py --index` |
| Bulk replace all occurrences of a string | `replace_nth_text.py --find --all` |
| ~~Replace text with sed/awk~~ | **NEVER** — use the tools above instead |

### Smart Quotes

Handled automatically by unpack/pack. But the Edit tool converts smart quotes to ASCII.

**When adding new text with quotes, use XML entities:**

```xml
<a:t>the &#x201C;Agreement&#x201D;</a:t>
```

| Character | Name | Unicode | XML Entity |
|-----------|------|---------|------------|
| `“` | Left double quote | U+201C | `&#x201C;` |
| `”` | Right double quote | U+201D | `&#x201D;` |
| `‘` | Left single quote | U+2018 | `&#x2018;` |
| `’` | Right single quote | U+2019 | `&#x2019;` |

### Other

- **Whitespace**: Use `xml:space="preserve"` on `<a:t>` with leading/trailing spaces
- **XML parsing**: Use `defusedxml.minidom`, not `xml.etree.ElementTree` (corrupts namespaces)
