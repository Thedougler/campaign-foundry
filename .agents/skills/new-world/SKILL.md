---
name: new-world
description: World creation. Gather the DM's vision in conversation per docs/agents/co-writing.md, then create a minimal linked World skeleton. Use when the DM wants to create, start or found a World. Campaign creation belongs to new-campaign.
---

# New World

A World exists independently of a Campaign. Create just enough to start one. That means a tone and Calendar and competing Factions, plus a small starting Region with its people and the powers and Lore behind the premise. Play adds the rest.

Every path below is vault-relative (from `wiki/`) unless it starts with `docs/`, `archive/` or `.agents/`. Store the new World in `<World>/`, with its overview at `<World>/<World>.md`.

## Steps

1. **Orient.** Read `user-config.md` and `docs/wiki-layout.md`, then ADRs `docs/adr/0003-ask-about-intent-never-bookkeeping.md`, `docs/adr/0004-campaigns-move-the-world-forward.md` and `docs/adr/0010-content-is-gated-deterministically.md`. Resolve the repository root and target Wiki before any Wiki operation. Use a filesystem target the caller assigns in preference to the active World in `user-config.md`. A new World has no Campaign; a source World the DM names is read for material only, through its own `index.md` and the last ten entries of its `log.md`. Canon precedence: what the DM says, then what the Wiki says. **Done when** the target Wiki, the new World's folder name and any source World are named.

2. **Talk before building.** Start with the DM's supplied vision and ask only about missing intent. When the brief already supplies the intent listed below, or explicitly leaves any missing intent to you with "you decide", skip the interview and go to step 3. Otherwise read `docs/agents/co-writing.md` and talk with the DM by it. Gather:
   - the World's name, premise, feel and inspirations;
   - tone, themes and anything the table keeps out of play;
   - how magic, technology, Deities and the dead work, and how common they are;
   - the starting Region and the trouble that makes it interesting;
   - the Calendar: months and lengths, weekdays, year numbering and epoch, or permission to propose these;
   - existing must-haves, such as a named villain, Settlement, war or mystery, and any material they want reused.

   Summarise the settled vision as the basis for work, and go on building without waiting for approval of a draft. Choose filesystem names, template placement and other bookkeeping yourself from this skill rather than asking the DM. **Done when** every intent point has the DM's answer or explicit leave to decide, and no Wiki construction has begun before that boundary.

3. **Source and plan the skeleton.** Follow the reuse order. Start with fitting Wiki material, then rules figures from the 2024 SRD through `dnd5e-srd-api`. Next consult official, published and homebrew material through web search before inventing what remains. Search the Wiki with QMD (`skill://qmd`) for what the vision reuses: the source World's cosmology, history, Calendar, powers and the places the DM names. Which pages bear on the vision is your judgement; read each page behind a hit in full, since a snippet only says where to read, and follow its links as far as they bear on the skeleton. Stop at the first fitting source, and record which facts you keep and which you adapt to the new World.

   Write a working inventory, one line per planned page. Record the page kind and final name. Add its path from step 4 and its source or the reason it is invented, followed by the pages it links. Settle every name in this inventory before writing any page. A person, place, group, Creature, Item or god named on any page gets a page in this inventory; a month, weekday, oath or other in-world word with no page kind goes on a line in `wiki/.cspell-words.txt`. Reuse a retrieved Calendar, Faction, Deity or other fitting design rather than independently rebuilding it. If a required source or retrieval capability is unavailable, record the missing prerequisite and the material actually retrieved, and mark an unverified attribution or rule as unverified. **Done when** every planned page has a final name, a path and retrieved reuse evidence or a reason invention is needed, and the inventory contains only the skeleton below and the dependencies that complete its pages.

4. **Build at skeleton scale.** Before writing each page kind, read its template in `wiki/templates/`. Fill every property and every `##` section and callout the template has, in template order; drop a `##` section whose guidance opens with `Optional.` when it has no content, and keep a `###` heading only where it has content. Remove every `%% %%` guidance comment. Set each page's `type` to its template's value and write a one-line `summary`. In `sources`, list only repo-relative archived Raw paths (`archive/<file>.md`), or `[]` when none was used. Put external attribution in the page body. Use flat folders by kind, and create a page-kind folder only when its first page is written.

   | Pages | Count | Path | Template | Follow |
   | --- | --- | --- | --- | --- |
   | Overview | 1 | `<World>/<World>.md` | `World.md` | this step |
   | Factions | 3 to 5 | `<World>/Factions/<Name>.md` | `Faction.md` | `faction-design` |
   | Region | 1 | `<World>/Locations/<Name>.md` | `Location - Region.md` | `location-design` |
   | Settlements or Sites | 2 or 3 | `<World>/Locations/<Name>.md` | `Location - Settlement.md`, `Location - Site.md` | `location-design` |
   | NPCs | one leader per Faction, plus one or two faces the starting Locations need | `<World>/NPCs/<Name>.md` | `NPC.md` | `npc-design` |
   | Creatures | only where statistics are needed | `<World>/Creatures/<Name>.md` | `Creature.md` | `creature-design` |
   | Deities | a few | `<World>/Deities/<Name>.md` | `Deity.md` | this step |
   | Lore | 2 or 3 | `<World>/Lore/<Name>.md` | `Lore.md` | `lore-design` |

   Use each design skill for its pages. When this run is a subagent, follow each skill yourself (`AGENTS.md` **Flat dispatch**). A top-level session may delegate owner pages to subagents. Each subagent returns complete pages and every touched path. Read each skill's `SKILL.md` and the references it names. Supply the settled vision and retrieved evidence, the target path, the skeleton-scale allowance and this run's `create` operation. Each skill's own gate and log steps fold into step 5, which runs once for the whole World. Page content by kind:

   - **Overview.** In `## At a glance`, write bullets for Tone, Magic and technology, and Era. Add Powers with links to every Faction and Deity page, and Table promise with what the Players get to do and what the table keeps out of play. In `## Calendar`, use the template's `| Month | Days | Season or note |` table. Follow it with the weekdays and year numbering, including its epoch, and the holidays people keep. In `## Depth`, fill `### Cosmology`, `### History in brief` (each era linked to its Lore page) and `### Hidden truths` (each truth with how the Party can learn it). Link the powers and Lore rather than retelling their pages.
   - **Factions.** Concrete wants that collide, methods, pressure and next moves. With no Campaign, the agenda goes under `### Agenda` in Depth, and the `### Threads` heading stays out until `new-campaign` writes Threads.
   - **Locations.** The Region's `parent` is blank and the overview links it. Each Settlement's or Site's `parent` is a quoted wikilink to its containing Location: `parent: "[[<Region>]]"`. Keep visits and local pressures useful without stocking an unrequested dungeon or distant continent.
   - **NPCs.** At the scale `npc-design` selects. Share appropriate contacts across pages rather than giving every mention a new person. Where an NPC needs statistics, its `creature` names a shared Creature page.
   - **Creatures.** Where statistics are needed, reuse a shared sourced 2024 SRD figure (a Guard, Noble, Priest, Veteran or the like). Reuse shared rules figures across pages and limit Creature creation to the required statistics. Region encounter rows and Faction rank and file link these pages.
   - **Deities and Lore.** Limited to the powers and history the premise needs. Link worshippers, shrines, accounts and discoverable evidence to the skeleton's cast and Locations.

   Narration: follow `theatre-of-the-mind` for the overview's `The World` callout and each Deity's `Invocation` callout. Its **Slots** table specifies the recipe for each. Each design skill writes its own pages' callouts. Links stay inside the new World: a wikilink to a source World's page resolves to that World, so retell what you reuse on a page of your own. Give each new page a real incoming link from another content page; a `parent` property counts, while index and log links do not. Run `bun run cf -- check "<page path>"` as each page is finished and repair every finding before the next.

   Leave Campaign folders, PCs, Threads, Quests, Sessions, `campaign-config.md` and `hot.md` for `new-campaign` or later play. Other World folders and `attachments/` also wait until content needs them. **Done when** every inventory page exists at its path, the gathered intent is filed on its owner pages, every page passes its own check, and there are no speculative pages or empty future folders.

5. **Index, gate and record.** From the repository root:

   ```sh
   bun run cf -- index
   bun run cf -- check --fix "<World>"
   bun run cf -- check "<World>"
   ```

   For an explicitly assigned filesystem target, add `--vault "<wiki>" --root "<root>"` to index, check and log, and `--templates "<wiki>/templates"` to check, and use those same paths throughout.

   Run the page gate with no layer filter, given the new World's folder, which contains every page this run wrote. The gate reports the World's findings alone. Resolve every finding, warnings included, without changing the DM's intended facts, regenerate the index when pages change, and repeat until the page gate reports `ok: 0 findings`. `cf index` writes every `index.md`. Leave their text to it.

   After the gate passes, append one creation entry to the new World's log, repeating `--page` for every touched content page by its vault-relative path:

   ```sh
   bun run cf -- log --world "<World>" --op create --title "New World: <World>" --page "<World>/<World>.md"
   ```

   Observe the entry written, then run the page gate once more so the finished artifacts, the log included, are covered. Report missing tooling as a blocker by name, and count the gate or log as unfinished. **Done when** the generated root index lists the World, its World index lists the skeleton, the one log entry for this creation lists every touched content page, and the final page gate over the World's folder reports `ok: 0 findings` at the assigned target.

6. **Return to the DM.** Give the pitch in two lines, link the created pages, note the important Canon decisions and reused material, and say what play will fill in later. Report only observed index, gate and log results. If a prerequisite prevented completion, separate the delivered pages from the exact unfinished action and missing prerequisite. **Done when** the reply leads the DM to the actual skeleton and accurately distinguishes verified completion from any remaining blocker.
