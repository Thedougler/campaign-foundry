# New setting

Step 3 of [`new-campaign`](../SKILL.md) for a New or Forked setting: plan and build the World skeleton in the Campaign folder. Build just enough to start play. That means a tone and Calendar and competing Factions, plus a small starting Region with its people and the powers and Lore behind the premise. Play adds the rest. Paths are vault-relative, as in the skill.

## 1. Source and plan the skeleton

Follow the reuse order. Start with fitting Wiki material, then rules figures from the 2024 SRD through `dnd5e-srd-api`. Next consult official, published and homebrew material through web search before inventing what remains. Search the Wiki with QMD (`skill://qmd`) for what the vision reuses: the source World's cosmology, history, Calendar, powers and the places the DM names. A Fork's source World is the one its active Campaign plays in. Which pages bear on the vision is your judgement; read each page behind a hit in full, since a snippet only says where to read, and follow its links as far as they bear on the skeleton. Stop at the first fitting source, and record which facts you keep and which you adapt to the new setting.

Write a working inventory, one line per planned page. Record the page kind and final name. Add its path from the table in section 2 and its source or the reason it is invented, followed by the pages it links. Settle every name in this inventory before writing any page. A person, place, group, Creature, Item or god named on any page gets a page in this inventory; a month, weekday, oath or other in-world word with no page kind goes on a line in `wiki/.cspell-words.txt`. Reuse a retrieved Calendar, Faction, Deity or other fitting design rather than independently rebuilding it. If a required source or retrieval capability is unavailable, record the missing prerequisite and the material actually retrieved, and mark an unverified attribution or rule as unverified.

**Done when** every planned page has a final name, a path and retrieved reuse evidence or a reason invention is needed, and the inventory contains only the skeleton below and the dependencies that complete its pages.

## 2. Build at skeleton scale

Before writing each page kind, read its template in `wiki/templates/`. Fill every property and every `##` section and callout the template has, in template order; drop a `##` section whose guidance opens with `Optional.` when it has no content, and keep a `###` heading only where it has content. Remove every `%% %%` guidance comment. Set each page's `type` to its template's value and write a one-line `summary`. In `sources`, list only repo-relative archived Raw paths (`archive/<file>.md`), or `[]` when none was used. Put external attribution in the page body. Use flat folders by kind inside the Campaign folder, and create a page-kind folder only when its first page is written.

| Pages | Count | Path | Template | Follow |
| --- | --- | --- | --- | --- |
| World overview | 1 | `<campaign-folder>/<World>.md` | `World.md` | this section |
| Factions | 3 to 5 | `<campaign-folder>/Factions/<Name>.md` | `Faction.md` | `faction-design` |
| Region | 1 | `<campaign-folder>/Locations/<Name>.md` | `Location - Region.md` | `location-design` |
| Settlements or Sites | 2 or 3 | `<campaign-folder>/Locations/<Name>.md` | `Location - Settlement.md`, `Location - Site.md` | `location-design` |
| NPCs | one leader per Faction, plus one or two faces the starting Locations need | `<campaign-folder>/NPCs/<Name>.md` | `NPC.md` | `npc-design` |
| Creatures | only where statistics are needed | `<campaign-folder>/Creatures/<Name>.md` | `Creature.md` | `creature-design` |
| Deities | a few | `<campaign-folder>/Deities/<Name>.md` | `Deity.md` | this section |
| Lore | 2 or 3 | `<campaign-folder>/Lore/<Name>.md` | `Lore.md` | `lore-design` |

Use each design skill for its pages. When this run is a subagent, follow each skill yourself (`AGENTS.md` **Flat dispatch**). A top-level session may delegate owner pages to subagents. Each subagent returns complete pages and every touched path. Read each skill's `SKILL.md` and the references it names. Supply the settled vision and retrieved evidence, the target path, the skeleton-scale allowance and this run's `create` operation. Each skill's own gate and log steps fold into the skill's File step, which runs once for the whole Campaign folder. Page content by kind:

- **World overview.** In `## At a glance`, write bullets for Tone, Magic and technology, and Era. Add Powers with links to every Faction and Deity page, and Table promise with what the Players get to do and what the table keeps out of play. In `## Calendar`, use the template's `| Month | Days | Season or note |` table. Follow it with the weekdays and year numbering, including its epoch, and the holidays people keep. In `## Depth`, fill `### Cosmology`, `### History in brief` (each era linked to its Lore page) and `### Hidden truths` (each truth with how the Party can learn it). Link the powers and Lore rather than retelling their pages.
- **Factions.** Concrete wants that collide, methods, pressure and next moves. Each agenda becomes a Thread in the skill's Threads step, which links it under the Faction's `### Threads`. Leave `### Agenda` and `### Threads` out of the page until then.
- **Locations.** The Region's `parent` is blank and the World overview links it. Each Settlement's or Site's `parent` is a quoted wikilink to its containing Location: `parent: "[[<Region>]]"`. Keep visits and local pressures useful without stocking an unrequested dungeon or distant continent.
- **NPCs.** At the scale `npc-design` selects. Share appropriate contacts across pages rather than giving every mention a new person. Where an NPC needs statistics, its `creature` names a shared Creature page.
- **Creatures.** Where statistics are needed, reuse a shared sourced 2024 SRD figure (a Guard, Noble, Priest, Veteran or the like). Reuse shared rules figures across pages and limit Creature creation to the required statistics. Region encounter rows and Faction rank and file link these pages.
- **Deities and Lore.** Limited to the powers and history the premise needs. Link worshippers, shrines, accounts and discoverable evidence to the skeleton's cast and Locations.

Narration: follow `theatre-of-the-mind` for the World overview's `The World` callout and each Deity's `Invocation` callout. Its **Slots** table specifies the recipe for each. Each design skill writes its own pages' callouts. Links stay inside the new setting: a wikilink to a source World's page resolves to that World, so retell what you reuse on a page of your own. Give each new page a real incoming link from another content page; a `parent` property counts, while index and log links do not. Run `bun run cf -- check "<page path>"` as each page is finished and repair every finding before the next.

The skill's later steps write the Campaign overview, config, PCs, Threads and `hot.md`; Quests, Sessions, other kind folders and `attachments/` wait until play needs them.

**Done when** every inventory page exists at its path, the gathered World intent is filed on its owner pages, every page passes its own check, and there are no speculative pages or empty future folders.
