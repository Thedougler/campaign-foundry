---
name: new-world
description: World creation. Gather the DM's vision in conversation per docs/agents/co-writing.md, then create a minimal linked World skeleton. Use when the DM wants to create, start or found a World. Campaign creation belongs to new-campaign.
---

# New World

A World exists independently of a Campaign. Create just enough to start one. That means a tone and Calendar and competing Factions, plus a small starting Region with its people and the powers and Lore behind the premise. Play adds the rest.

## Steps

1. **Orient.** Read `user-config.md`, `AGENTS.md`, `CONTEXT.md`, `docs/wiki-layout.md` and ADRs 0003, 0004 and 0010. Resolve the repository root and target Wiki before any Wiki operation. A filesystem target the caller assigns takes precedence over the active World in preferences. A new World has no Campaign: existing Campaign orientation belongs only to a source World you consult, not to the new World.

   **Done when** the target Wiki, page-placement rules and Canon precedence are known.

2. **Talk before building.** Start with the DM's supplied vision and ask only about missing intent. Talk with the DM per `docs/agents/co-writing.md`. Gather:
   - the World's name, premise, feel and inspirations;
   - tone, themes and anything the table keeps out of play;
   - how magic, technology, Deities and the dead work, and how common they are;
   - the starting Region and the trouble that makes it interesting;
   - the Calendar: months and lengths, weekdays, year numbering and epoch, or permission to propose these;
   - existing must-haves, such as a named villain, Settlement, war or mystery, and any material they want reused.

   Accept an explicit “you decide” for unresolved details. When the supplied brief already covers the intent, proceed without another interview. Summarise the settled vision as the basis for work, and go on building without waiting for approval of a draft. Choose filesystem names, template placement and other bookkeeping from the repo rather than asking the DM.

   **Done when** every intent point has the DM's answer or explicit leave to decide, and no Wiki construction has begun before that boundary.

3. **Source and bound the skeleton.** Follow `AGENTS.md`'s reuse order. Retrieve fitting Wiki material first and take needed rules from the 2024 SRD. Then search official, published and homebrew material before inventing what remains. Load `qmd` for Wiki discovery and use the harness's web search and fetch tools for external material. Read relied-on hits and relevant linked pages. A search snippet is evidence of where to read, and the page behind it is the source. Stop at the first fitting source and distinguish preserved facts from adaptations to this new World. Where a source World supplies material, read its index and available last ten log entries, plus its Campaign orientation when relevant.

   Make a working inventory of the pages below, their sources, owner paths and links. Reuse a retrieved Calendar, Faction, Deity or other fitting design rather than independently rebuilding it. Put external attribution in the page body where relevant. Frontmatter `sources` contains only repo-relative archived Raw paths, or `[]` when none was used. If a required source or retrieval capability is unavailable, identify the missing prerequisite and any material actually retrieved. Mark an unverified attribution or rule as unverified.

   **Done when** every planned element has retrieved reuse/adaptation evidence or a reason invention is needed, and the inventory covers only the skeleton and dependencies necessary to make its pages complete.

4. **Build at skeleton scale.** Read each current template before authoring. File all new World content beneath `<Wiki>/<World>/`, using `docs/wiki-layout.md` for names and flat page-kind folders:
   - **Overview:** `<World>/<World>.md` from `wiki/templates/World.md`. File the settled tone, table promise, magic and technology, premise and Calendar here. Give the Calendar usable months with day counts, weekdays, year numbering and epoch. Link the powers and Lore rather than retelling their pages.
   - **Factions:** 3 to 5 pages in `Factions/`, using `faction-design`. Give them concrete wants that collide, methods, pressure and next moves. With no Campaign, agendas go in each Faction's Depth under `### Agenda`, and Campaign Threads wait for `new-campaign`.
   - **Locations:** one starting Region and two or three Settlements or Sites in `Locations/`, using `location-design`. Set containment through quoted `parent` wikilinks, not nested folders, and make the Region reachable from the overview. Keep visits and local pressures useful without stocking an unrequested dungeon or distant continent.
   - **NPCs:** a few in `NPCs/`, using `npc-design`: the Factions' leaders and a face or two needed by the starting Locations. Share appropriate contacts across pages rather than giving every mention a new person. Use the selected NPC scale and fitting shared sourced Creatures where statistics are needed.
   - **Deities and Lore:** a few Deity pages from `wiki/templates/Deity.md` and two or three Lore pages using `lore-design`, limited to the powers and history the premise needs. Link worshippers, shrines, accounts and discoverable evidence to the existing skeleton cast and Locations.

   Give each design skill the settled vision and the retrieved evidence. Add its assigned target, the skeleton-scale page allowance and the enclosing `create` operation. Receive complete pages and all touched paths. This skill writes the final index, runs the page gate over every touched path and appends the one log entry, including supporting pages. Child work returns its artifacts instead of appending separate creation logs. Only create supporting owner pages when the skeleton actually needs them. Reuse shared rules figures rather than designing a catalogue.

   Fill every required template property, section and callout, remove authoring comments and retain optional headings only where they have content. Use `theatre-of-the-mind` for the overview and Deity Narration, and leave each design skill's Narration slots to that skill. Before indexing, make every new content page reachable by a real incoming link from another content page, since index and log links alone leave it unreachable. Keep required sections concise and filled.

   Create page-kind folders only as their first page is written. Leave Campaign folders, PCs, Threads, Quests, Sessions, `campaign-config.md` and `hot.md` for `new-campaign` or later play. Other World folders and attachments also wait until content needs them.

   **Done when** the complete linked skeleton exists at the assigned target, every required dependency is authored, the gathered intent is filed on its owner pages, and there are no speculative pages or empty future folders.

5. **Index, gate and record.** Read `package.json` and the current index, check and log help before using the CLI. The current package command is Bun; from the repository root the production forms are:

   ```sh
   bun run cf -- index
   bun run cf -- check --fix "<Wiki>/<World>"
   bun run cf -- check "<Wiki>/<World>"
   ```

   For an explicitly assigned filesystem target, pass its `--vault`, `--root` and `--templates` to check, and its `--vault`/`--root` to index and log. Preserve those paths throughout child handoffs.

   Run the page gate with no layer filter, given the new World's folder, which contains every page this run wrote. The whole Wiki is still checked behind the path, and the gate reports the World's findings alone. Resolve every finding, warnings included, without changing the DM's intended facts, regenerate indexes when pages change, and repeat until the page gate reports `ok: 0 findings`. Generate indexes with `cf index` and leave their text to it.

   After the gate passes, append one creation entry in the new World's log, repeating `--page` for every touched content page and using actual vault-relative paths:

   ```sh
   bun run cf -- log --world "<World>" --op create --title "New World: <World>" --page "<World>/<World>.md"
   ```

   Observe the entry written, then run the page gate once more so the finished artifacts, including the log, are covered. Report missing tooling as a blocker by name, and count the gate or log as unfinished.

   **Done when** the generated root index lists the World, its World index lists the skeleton, the one log entry for this creation lists every touched content page, and the final page gate over the World's folder reports `ok: 0 findings` at the assigned target.

6. **Return to the DM.** Give the pitch in two lines, link the created pages, note the important Canon decisions and reused material, and say what play will fill in later. Report only observed index, gate and log results. If a prerequisite prevented completion, separate the delivered pages from the exact unfinished action and missing prerequisite.

   **Done when** the reply leads the DM to the actual skeleton and accurately distinguishes verified completion from any remaining blocker.
