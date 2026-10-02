---
name: new-world
description: World creation — gather the DM's vision in a friendly conversation, then create a minimal linked World skeleton. Use when the DM wants to create, start or found a World; Campaign creation belongs to new-campaign.
---

# New World

A World exists independently of a Campaign. Create just enough to start one: a tone and Calendar, competing Factions, a small starting Region and its people, and the powers and Lore behind the premise. Let play earn the rest.

## Steps

1. **Orient.** Read `user-config.md`, `AGENTS.md`, `CONTEXT.md`, `docs/wiki-layout.md` and ADRs 0003, 0004 and 0010. Resolve the repository root and target Wiki before any Wiki operation; a caller-assigned filesystem target takes precedence over the active World in preferences. A new World has no Campaign: existing Campaign orientation belongs only to a source World you consult, not to the new World.

   **Done when** the target Wiki, page-placement rules and Canon precedence are known.

2. **Talk before building.** Start with the DM's supplied vision and ask only about missing intent. Keep the exchange warm and collaborative rather than presenting a questionnaire. Offer possibilities grounded in what they said, with options when those help them choose. Gather:
   - the World's name, premise, feel and inspirations;
   - tone, themes and anything the table keeps out of play;
   - how magic, technology, Deities and the dead work, and how common they are;
   - the starting Region and the trouble that makes it interesting;
   - the Calendar: months and lengths, weekdays, year numbering and epoch, or permission to propose these;
   - existing must-haves, such as a named villain, Settlement, war or mystery, and any material they want reused.

   Accept an explicit “you decide” for unresolved details. When the supplied brief already covers the intent, proceed without another interview. Summarise the settled vision as the basis for work; this is not a draft-approval gate. Choose filesystem names, template placement and other bookkeeping from the repo rather than asking the DM.

   **Done when** every intent point has the DM's answer or explicit leave to decide, and no Wiki construction has begun before that boundary.

3. **Source and bound the skeleton.** Follow `AGENTS.md`'s reuse order: retrieve fitting Wiki material first, use the 2024 SRD for needed rules, then search official, published and homebrew material before inventing what remains. Load `qmd` for Wiki discovery and use the harness's web search and fetch tools for external material. Read relied-on hits and relevant linked pages; a search snippet is not a source. Stop at the first fitting source and distinguish preserved facts from adaptations to this new World. Where a source World supplies material, read its index and available last ten log entries, plus its Campaign orientation when relevant.

   Make a working inventory of the pages below, their sources, owner paths and links. Reuse a retrieved Calendar, Faction, Deity or other fitting design rather than independently rebuilding it. Put external attribution in the page body where relevant; frontmatter `sources` contains only repo-relative archived Raw paths, or `[]` when none was used. If a required source or retrieval capability is unavailable, identify the missing prerequisite and any material actually retrieved; do not present an unverified attribution or rule as sourced.

   **Done when** every planned element has retrieved reuse/adaptation evidence or a reason invention is needed, and the inventory covers only the skeleton and dependencies necessary to make its pages complete.

4. **Build at skeleton scale.** Read each current template before authoring. File all new World content beneath `<Wiki>/<World>/`, using `docs/wiki-layout.md` for names and flat page-kind folders:
   - **Overview:** `<World>/<World>.md` from `wiki/templates/World.md`. File the settled tone, table promise, magic and technology, premise and Calendar here. Give the Calendar usable months with day counts, weekdays, year numbering and epoch; link the powers and Lore rather than retelling their pages.
   - **Factions:** 3–5 pages in `Factions/`, using `faction-design`. Give them concrete wants that collide, methods, pressure and next moves. With no Campaign, agendas stay in each Faction's Depth under `### Agenda`; Campaign Threads wait for `new-campaign`.
   - **Locations:** one starting Region and two or three Settlements or Sites in `Locations/`, using `location-design`. Set containment through quoted `parent` wikilinks, not nested folders, and make the Region reachable from the overview. Keep visits and local pressures useful without stocking an unrequested dungeon or distant continent.
   - **NPCs:** a handful in `NPCs/`, using `npc-design`: the Factions' leaders and a face or two needed by the starting Locations. Share appropriate contacts across pages rather than giving every mention a new person. Use the selected NPC scale and fitting shared sourced Creatures where statistics are needed.
   - **Deities and Lore:** a few Deity pages from `wiki/templates/Deity.md` and two or three Lore pages using `lore-design`, limited to the powers and history the premise needs. Link worshippers, shrines, accounts and discoverable evidence to the existing skeleton cast and Locations.

   Give each design skill the settled vision, retrieved evidence, assigned target, skeleton-scale page allowance and enclosing `create` operation. Receive complete pages and all touched paths; this skill owns the final index, full gate and single log entry, including supporting pages. Child work returns its artifacts instead of appending separate creation logs. Only create supporting owner pages when the skeleton actually needs them; reuse shared rules figures rather than designing a catalogue.

   Fill every required template property, section and callout, remove authoring comments and retain optional headings only where they have content. Use `theatre-of-the-mind` for the overview and Deity Narration; the design skills own their Narration slots. Make every new content page reachable by a real incoming link from another content page before indexing. Index and log links alone do not fulfil this requirement. Keep required sections concise, not empty.

   Create page-kind folders only as their first page is written. Leave Campaign folders, PCs, Threads, Quests, Sessions, `campaign-config.md` and `hot.md` for `new-campaign` or later play. Other World folders and attachments also wait until content needs them.

   **Done when** the complete linked skeleton exists at the assigned target, every required dependency is authored, the gathered intent is filed on its owner pages, and there are no speculative pages or empty future folders.

5. **Index, gate and record.** Read `package.json` and the current index, check and log help before using the CLI. The current package command is Bun; from the repository root the production forms are:

   ```sh
   bun run cf index
   bun run cf check --fix
   bun run cf check
   ```

   For an explicitly assigned filesystem target, pass its `--vault`, `--root` and `--templates` to check, and its `--vault`/`--root` to index and log. Preserve those paths throughout child handoffs.

   Run the full gate without path or layer filters: path arguments only filter reported findings, not the Wiki being checked. Resolve findings without changing the DM's intended facts, regenerate indexes when pages change and repeat until the full check exits 0. Indexes are generated, not hand-authored.

   After the gate passes, append one creation entry in the new World's log, repeating `--page` for every touched content page and using actual vault-relative paths:

   ```sh
   bun run cf log --world "<World>" --op create --title "New World: <World>" --page "<World>/<World>.md"
   ```

   Observe the entry written, then run the full check once more so the finished artifacts, including the log, are covered. Missing tooling remains a named blocker, not a successful gate or log.

   **Done when** the generated root index lists the World, its World index lists the skeleton, one creation log entry records every touched content page, and the final full gate exits 0 at the assigned target.

6. **Return to the DM.** Give the pitch in two lines, link the created pages, note the important Canon decisions and reused material, and say what play will fill in later. Report only observed index, gate and log results. If a prerequisite prevented completion, separate the delivered pages from the exact unfinished action and missing prerequisite.

   **Done when** the reply leads the DM to the actual skeleton and accurately distinguishes verified completion from any remaining blocker.
