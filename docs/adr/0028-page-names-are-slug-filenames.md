# Page filenames are slugs; the title property names the page

The Wiki names pages by display title as filename: `wiki/shattered-sea/NPCs/Nona Black-Jaw.md`. That couples a page's identity to its casing, spacing and punctuation, so a page cannot carry parentheses or a slash in its name, disambiguation forces parenthetical filenames (`Auralis (Patron).md`, `Otar the Foul (Creature).md`), and every consumer that reads a name off a path inherits filename casing.

Decision:

- **A page's filename is its slug**: lowercase, hyphenated, no spaces (`nona-black-jaw.md`, `otar-the-foul-creature.md`, `auralis-patron.md`). A slug is stable and path-safe; it is not the page's name.
- **The `title` frontmatter property names the page**: `title: Nona Black-Jaw`. Wikilinks keep resolving by name through the title (and aliases), so `[[Nona Black-Jaw]]` is unchanged. Where a link must show a different text than the target's title, it stays `[[slug|Title]]`.
- **Code reads names from the page, never the filename.** Name resolution (`cf find`, link checks, orphan checks), `cf index`, log page lists, Backup page titles, stub generation and eval fixtures all read `title` (falling back to aliases). Filename parsing of names is removed, not adapted.
- **`cf rename` migrates and maintains.** It renames a page to a new slug, adds or updates its `title`, and rewrites every wikilink and embed that pointed at the old name across the vault, preserving each link's displayed text where it differs. The bulk migration of the Shattered Sea vault is one `cf rename` run per page.
- **The parenthetical convention for Creature twins and patrons is dropped from filenames, not from names.** Where an NPC and its Creature share a name, the Creature's `title` keeps its distinguishing bracket — `title: Otar the Foul (Creature)` on slug `otar-the-foul-creature` — so a title may hold parentheses while a filename never needs to.

Consequences: filenames stop being prose; a rename no longer rewrites every link that spells the name in its target; and the title a Player sees is owned by one property every template requires. The migration runs only after the reveal backfill and test rework, so no test pins a filename-based name.
