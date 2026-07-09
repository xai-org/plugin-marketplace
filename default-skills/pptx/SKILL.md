---
name: pptx
description: Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includes creating slide decks, pitch decks, or presentations; reading, parsing, or extracting text from any .pptx file (even if the extracted content will be used elsewhere, like in an email or summary); editing, modifying, or updating existing presentations; combining or splitting slide files; working with templates, layouts, speaker notes, or comments. Trigger whenever the user mentions 'deck', 'slides', 'presentation', or references a .pptx filename, regardless of what they plan to do with the content afterward. If a .pptx file needs to be opened, created, or touched, use this skill.
---

# PPTX Skill

## Workflow Selection

| Situation | Action |
|-----------|--------|
| User attaches or references a `.pptx` file | Read [editing.md](editing.md) — edit the template directly |
| No `.pptx` provided — create from scratch | Read [creating.md](creating.md) — use PptxGenJS templates |
| Read/analyze an existing presentation | See Reading Content below |

**When in doubt:** If ANY `.pptx` file is attached or mentioned, use the
editing workflow. The creating workflow is ONLY for when no existing
presentation exists at all.

---

## Reading Content

```bash
# Text extraction
python -m markitdown presentation.pptx

# Visual overview
python scripts/thumbnail.py presentation.pptx

# Raw XML
python scripts/office/unpack.py presentation.pptx unpacked/

# Structured inspection (placeholders, text, images, media — USE THIS)
python scripts/inspect_slide.py unpacked/ --theme --media
```


---

## QA (Required)

**Assume there are problems. Your job is to find them.**

Your first render is almost never correct. Approach QA as a bug hunt, not a confirmation step. If you found zero issues on first inspection, you weren't looking hard enough.

### Overlap Check & Auto-Fix (Before Packing)

**Run this on the unpacked XML before packing** — it catches overlapping text boxes instantly without needing a render, and `--fix` auto-applies text auto-shrink:

```bash
# Check and auto-fix (enables normAutofit on overlapping text shapes)
python scripts/check_overlaps.py unpacked/ --fix

# Check only (no modifications)
python scripts/check_overlaps.py unpacked/
```

The `--fix` flag adds `<a:normAutofit/>` to every text shape involved in an overlap or off-slide overflow. This makes PowerPoint auto-shrink text to fit the box. If issues remain after `--fix`, shorten text or resize shapes manually.

### Content QA

```bash
python -m markitdown output.pptx
```

Check for missing content, typos, wrong order.

**When using templates, check for leftover placeholder text:**

```bash
python -m markitdown output.pptx | grep -iE "xxxx|lorem|ipsum|this.*(page|slide).*layout"
```

If grep returns results, fix them before declaring success.

### Automated Checks

Run these before visual inspection to catch common issues automatically:

```bash
python scripts/detect_fonts.py output.pptx
python scripts/office/unpack.py output.pptx unpacked/
python scripts/check_overlaps.py unpacked/ --fix
python scripts/clean.py unpacked/
python scripts/office/pack.py unpacked/ final_output.pptx --original output.pptx
```

Fix any issues these report before proceeding to visual QA.

### Visual QA

You've been staring at the code and will see what you expect, not what's there. 

Convert slides to images, then look for:

- Overlapping elements (text through shapes, lines through words, stacked elements)
- Text overflow or cut off at edges/box boundaries
- Decorative lines positioned for single-line text but title wrapped to two lines
- Source citations or footers colliding with content above
- Elements too close (< 0.3" gaps) or cards/sections nearly touching
- Uneven gaps (large empty area in one place, cramped in another)
- Insufficient margin from slide edges (< 0.5")
- Columns or similar elements not aligned consistently
- Low-contrast text (e.g., light gray text on cream-colored background)
- Low-contrast icons (e.g., dark icons on dark backgrounds without a contrasting circle)
- Text boxes too narrow causing excessive wrapping
- Leftover placeholder content
- **Style consistency** — does every slide feel like it belongs to the same deck?

For each slide, list issues or areas of concern, even if minor.

Read and analyze these images:
1. /path/to/slide-01.jpg (Expected: [brief description])
2. /path/to/slide-02.jpg (Expected: [brief description])

### Verification Loop

1. Generate slides → Convert to images → Inspect
2. Run `detect_fonts.py` and `check_overlaps.py`
3. **List issues found** (if none found, look again more critically)
4. Fix issues
5. **Re-verify affected slides** — one fix often creates another problem
6. Repeat until a full pass reveals no new issues

**Do not declare success until you've completed at least one fix-and-verify cycle.**

---

## Converting to Images

Convert presentations to individual slide images for visual inspection:

```bash
# Preferred — auto-calculates DPI from slide dimensions, with ODP fallback
python scripts/render_slides.py output.pptx

# Or with custom target resolution
python scripts/render_slides.py output.pptx --output_dir slides/ --width 1920 --height 1080
```

This creates `slide-1.png`, `slide-2.png`, etc. in a folder named after the input file.

**Fallback** (if render_slides.py dependencies aren't available):

```bash
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

---

## Images

### Image Aspect Ratio Rule

**Always preserve the original aspect ratio of images.** When resizing, compute the target height from the source image's natural aspect ratio (or vice versa) — never set width and height independently, as this stretches or squashes the image.


### Image Sources

```javascript
// From file path
slide.addImage({ path: "images/chart.png", x: 1, y: 1, w: 5, h: 3 });

// From URL
slide.addImage({ path: "https://example.com/image.jpg", x: 1, y: 1, w: 5, h: 3 });

// From base64 (faster, no file I/O)
slide.addImage({ data: "image/png;base64,iVBORw0KGgo...", x: 1, y: 1, w: 5, h: 3 });
```

### Image Options

```javascript
slide.addImage({
  path: "image.png",
  x: 1, y: 1, w: 5, h: 3,
  rotate: 45,              // 0-359 degrees
  rounding: true,          // Circular crop
  transparency: 50,        // 0-100
  flipH: true,             // Horizontal flip
  flipV: false,            // Vertical flip
  altText: "Description",  // Accessibility
  hyperlink: { url: "https://example.com" }
});
```

### Image Sizing Modes

```javascript
// Contain - fit inside, preserve ratio
{ sizing: { type: 'contain', w: 4, h: 3 } }

// Cover - fill area, preserve ratio (may crop)
{ sizing: { type: 'cover', w: 4, h: 3 } }

// Crop - cut specific portion
{ sizing: { type: 'crop', x: 0.5, y: 0.5, w: 2, h: 2 } }
```

### Calculate Dimensions (preserve aspect ratio)

```javascript
const origWidth = 1978, origHeight = 923, maxHeight = 3.0;
const calcWidth = maxHeight * (origWidth / origHeight);
const centerX = (10 - calcWidth) / 2;

slide.addImage({ path: "image.png", x: centerX, y: 1.2, w: calcWidth, h: maxHeight });
```

---

## Dependencies

**All-in-one install:**

```bash
pip install "markitdown[pptx]" Pillow pdf2image python-pptx numpy defusedxml
npm install -g pptxgenjs
```

**System packages** (pre-installed in the Docker image):
- LibreOffice (`soffice`) — PDF conversion (auto-configured via `scripts/office/soffice.py`)
- Poppler (`pdftoppm`) — PDF to images
- fontconfig (`fc-list`) — font detection
