# The Campaign folder contains its World

The Wiki kept each World in a folder of its own and nested each Campaign folder inside it (`wiki/The Shattered Sea/Shattered Sea/`). That nesting repeated a distinction the page types already record, and every path had to state it. The old path also contained spaces, and a path with spaces cannot appear in an `@` import, so `user-config.md` could not load a Campaign's `campaign-config.md` directly.

Decision:

- **One folder per Campaign.** The Campaign's folder (`wiki/shattered-sea/`) keeps its World's pages beside its Campaign pages, both overviews included. The World's `type: World` overview page joins it, with no folder of its own, and page names do not change, so `[[wikilinks]]` keep working.
- **Shared kind folders appear only when used.** `wiki/NPCs/`, `wiki/Items/` and the other top-level kind folders are created when a second Campaign reuses a page. Placement tries the Campaign folder first, then the shared folder.
- **The Campaign's name resolves its folder.** A Campaign folder is a lowercase-hyphenated slug (`shattered-sea`), and the Campaign's name is its overview page's name (`Shattered Sea`). Every `cf` command takes `--campaign "<Campaign>"` and finds the folder itself.
- **`new-world` merges into `new-campaign`.** One skill founds a Campaign folder with its World overview and setting pages, or adopts an existing setting by linking its pages or by lifting shared ones to the top-level kind folders.

Consequences: `index.md`, `log.md` and `hot.md` sit in the Campaign folder, and `cf log --world` becomes `cf log --campaign "<Campaign>"`. `user-config.md` loads each Campaign's `campaign-config.md` through one import line (`@wiki/<campaign-folder>/campaign-config.md`) under `## Campaign configs`. [ADR 0004](0004-campaigns-move-the-world-forward.md) still governs parallel groups: a fork plays in its own Campaign folder with its own setting pages.
