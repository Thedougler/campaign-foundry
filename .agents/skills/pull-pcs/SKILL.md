---
name: pull-pcs
description: Refreshes the sheet side of PC pages (level, statistics, spells, inventory) from their public D&D Beyond characters with `bun run cf -- pull`. Use when the DM asks to pull, sync or update the PCs, or when a PC's sheet is out of date after a level-up or shopping trip.
---

# Pull the PCs

`bun run cf -- pull` rewrites each PC's `Sheet`, `Spells` and `Inventory` sections from its `dndbeyond_url` and leaves the story side untouched (ADR 0009). It logs itself as a `pull` and runs the page check on the pages it wrote.

## Steps

1. **Preview.** `bun run cf -- pull --dry-run` (add `--campaign <Campaign>` or `--pc <name>` to narrow it). It lists each PC it would change.
2. **Pull.** `bun run cf -- pull` with the same flags.
3. **Failures.** A PC whose character is private or whose link is wrong fails with the PC's name, while the others still pull. Tell the DM which characters to set to public on D&D Beyond. There is nothing to fix in the Wiki. A PC with no `dndbeyond_url` is skipped: ask the DM for the character link and put it in the property.
4. **Gate.** When the pull reports findings, fix them in the pulled pages without changing what the sheet says, then close per `skill://lint` § Commands with the pulled pages. `cf pull` writes its own `pull` log entry.
5. **Report** to the DM, one line per PC: what changed, from the pull's summary.
