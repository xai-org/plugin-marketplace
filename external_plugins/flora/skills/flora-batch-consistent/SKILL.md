---
name: flora-batch-consistent
description: Apply one FLORA technique across many items so every result shares a single consistent style — a product list or spreadsheet into PDP shots, a folder of sketches into renders, a set of photos relit the same way. Use when the user supplies a list, file, directory, or set of images and wants the same treatment on each. Always total the cost and get confirmation before running. Do not use for a single item.
---

# Batch a FLORA technique across many items

Consistency here comes from running **one technique** over every item, not from
repeating a prompt and hoping. Pick the technique once; vary only the inputs.

**Input:** a list of items (rows, URLs, files on disk) and the treatment wanted.
**Output:** one output URL per item, a total cost, and a list of any failures.

## Steps

1. **Build the item list.** Read the spreadsheet, list, or directory into an
   explicit set. Show the user the parsed list and the count before going further —
   a misparsed column or an unintended `.DS_Store` is cheaper to catch now than
   after spending.

2. **Resolve one technique** with `flora_list_techniques` and `flora_get_technique`.
   One technique for the whole batch. If items need different treatments, that is
   two batches, and say so.

3. **Total the cost and stop.** Multiply `run_cost` by the item count and state it
   plainly: *"24 items x $0.117 = $2.81. Proceed?"* **Wait for a yes.** Do this
   even when the per-item cost looks trivial — the batch is where spend compounds.

4. **Run them,** a few at a time rather than all at once. Poll each with
   `flora_get_run`.

5. **Report.** One row per item: source, output URL, cost. Then the total.

## Rules

- **Keep going when one item fails.** Collect failures and report them at the end
  as a list. Never abort a paid batch partway and leave the user guessing what ran.
- **Never re-run a completed item** to "fix" a batch. Each retry bills again.
- **Get local files in once, up front.** For a directory of images, walk each
  through `flora_create_asset` with `source: "signed-url"`, the `curl` upload, and
  `flora_complete_asset` — see the `flora` skill — and collect the URLs before any
  run starts. Items that are already URLs pass straight through. Never
  base64-encode anything.
- **You cannot see any output.** Report URLs and let the user judge them.
- If the user asks for more items than the confirmed count, re-total and re-confirm.
