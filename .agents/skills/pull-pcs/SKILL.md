---
name: pull-pcs
description: Refreshes the sheet side of PC pages (the Sheet statblock fence, spells, inventory) from their public D&D Beyond characters with `bun run cfcli -- pull`. Use when the DM asks to pull, sync or update the PCs, or when a PC's sheet is out of date after a level-up or shopping trip.
---

# Pull the PCs

The PC page is canon for its sheet side, and D&D Beyond is one way to fill it. `bun run cfcli -- pull` rewrites each PC's `Sheet`, `Spells` and `Inventory` sections from its `dndbeyond_url` and leaves the story side untouched (ADR 0009). The `Sheet` it writes follows `wiki/templates/PC.md` § Sheet. It opens on the Player and class bullets and then gives the PC's numbers as a Fantasy Statblocks `statblock` fence, with `### Features` below it. The pull logs itself as a `pull` and runs the page check on the pages it wrote.

## Steps

1. **Preview.** `bun run cfcli -- pull --dry-run` (add `--campaign <Campaign>` or `--pc <name>` to narrow it). It lists each PC it would change.
2. **Pull.** `bun run cfcli -- pull` with the same flags.
3. **Reconcile.** A pull rewrites the whole fence, so it can drop a value the Wiki records and D&D Beyond lacks. Read each changed page's diff with `git diff -- "<page>"`. Restore on the page each value the pull removed or changed that the page, a Recap or the DM had confirmed, such as an AC, a sense or a language. **Done when** each removed or changed value is either restored or absent from every confirmed source.
4. **Failures.** A PC whose character is private or whose link is wrong fails with the PC's name, while the others still pull. Its page keeps the sheet it has, which agents keep by hand. Tell the DM which characters to set to public on D&D Beyond. A PC with no `dndbeyond_url` is skipped: ask the DM for the character link and put it in the property. When such a PC's sheet needs a change the pull can't bring, such as a level-up the Player reports or a `## Sheet` still in the retired bullet shape, hand the page to `skill://statblock-design`, which writes its fence by `references/fence.md` § PC sheet.
5. **Gate.** When the pull reports findings, fix them in the pulled pages without changing what the sheet says, then close per `skill://lint` § Commands with the pulled pages. `cfcli pull` writes its own `pull` log entry.
6. **Report** to the DM, one line per PC. Give what changed from the pull's summary, or why the PC kept its hand-kept sheet. List each value step 3 restored and ask the DM to correct it on D&D Beyond. The next pull then agrees with the page.
