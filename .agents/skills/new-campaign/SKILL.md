---
name: new-campaign
description: Campaign creation — use when the DM starts a Campaign in an existing World or brings a new group of Players to it. Gather their plans first, then build the overview, public D&D Beyond PCs, Faction-driven Threads, campaign-config and hot.md.
---

# New Campaign

A Campaign is one group of Players moving through a World. Create its starting state. `collab-with-me` and Prep build what play needs next.

## Steps

1. **Ground.** Read `user-config.md`, `CONTEXT.md`, `docs/wiki-layout.md` and ADRs 0003, 0004 and 0009. For an existing Campaign, read its `campaign-config.md` before its pages, then `hot.md`, the World's `index.md` and the last ten available `log.md` entries. Use `qmd` to find and retrieve the chosen World's overview, Calendar, relevant Locations, Factions and House Rules.

   A World has one active Campaign at a time, while earlier Campaigns remain records of what changed it. If another Campaign is active, establish the DM's intent: a successor after that Campaign ends, or a parallel group in a separate World (ADR 0004). Use an answer already supplied; otherwise ask about that intent during Talk. Preserve the earlier Campaign's folder, PCs, Threads, hot.md and played Sessions. A new request alone does not establish that it ended. Done when the source World, existing Campaign state and target Wiki are known.

2. **Talk.** Gather the DM's details before creating pages, talking with the DM per `docs/agents/co-writing.md`. Cover:
   - the World and Campaign name, premise, central tension, tone and themes. Capture tone as one sentence the DM could say aloud about their table, plus its two consequences in the DM's words. The first is how it builds an NPC, as a short formula such as image and competence with one revealing need and one fixation. The second is what it adds to a scene beyond the external threat, such as the small human conflict riding the stakes;
   - the starting Location and in-world date in that World's Calendar;
   - how the Party comes together;
   - every Player and intended PC, their public D&D Beyond character URL, known backstory, goals, bonds, fears and the DM's plans for them. When a PC's story side is thin and the DM requests help, offer optional prompts that draw out the PC pulls `plan-session` strains: two that oppose each other and the want they never cleanly arrive at. Useful prompts ask what the PC is trying to become and what they are afraid of losing. Others ask who they love or loved, what personal failure would look like and what red button makes them throw caution to the wind. Answers are ordinary `Story` and `Goals and bonds` content, and the DM may skip any prompt;
   - cadence, Session length, table agreements and any Campaign House Rules.

   Inherit established World facts and `DM Settings` defaults unless the DM changes them. Treat unspecified PC story facts as unknown. Creative delegation from the DM still leaves a PC's public character URL to the DM, so ask for actual links where needed. Done when each detail is answered, explicitly delegated, inherited or identified as a missing prerequisite, and the one-active-Campaign intent is settled. Then proceed directly to writing.

3. **Overview and config.** Read the current `Campaign.md` and `campaign-config.md` templates in `wiki/templates/`. Create the Campaign directly under the World: `<wiki>/<World>/<Campaign>/<Campaign>.md` and `<wiki>/<World>/<Campaign>/campaign-config.md`. Follow the current naming rules. The overview filename matches its Campaign folder. Create folders only when placing their first page.

   The overview gives the pitch, Players, linked Party, starting situation, cadence and agreements, with a spoken opening through `theatre-of-the-mind`. Leave `session_length_hours` blank to inherit `DM Settings`, and set it only for an override. The config's Tone section holds the captured tone sentence with its NPC and scene consequences, Themes holds the gathered themes, and the config is linked from the overview with a resolving, path-qualified wikilink where names collide. Read the new config before authoring the remaining Campaign pages. Done when both pages satisfy their templates, contain the gathered intent and establish the Campaign's starting situation.

4. **PCs and sheets.** Read `wiki/templates/PC.md`. Create one page per intended PC in the Campaign's `PCs/`, record `dndbeyond_url` and link each PC from the overview's Party. Put the DM's story, including any PC pulls the prompts drew out, in `Story`, `Goals and bonds` and `Plans`. Retain supplied story passages and facts. Use `theatre-of-the-mind` for the required Portrait, grounded in known appearance. Keep the Player-to-PC mapping in the overview because the pull replaces the sheet side.

   Follow `pull-pcs` for the public-character operation, using the current CLI contract below. Run an actual pull for this Campaign, not just a preview. The selector is the Campaign folder name. Narrow with repeated `--pc` names if necessary to avoid selecting PCs in another World with the same Campaign folder name.

   Account for every intended PC from the command's per-PC output and resulting page: `updated` or `unchanged` establishes a fetched sheet; `skipped`, `failed`, a dry run or an unavailable operation does not. Compare `Story`, `Goals and bonds` and `Plans` before and after: the pull leaves all three unchanged. Sheet, Spells and Inventory come from D&D Beyond, not invented statistics. Repair mechanical gate findings without altering the fetched facts, and use `audit` over changed PCs and their linked neighbours after this Ingest.

   For a missing link, private character or unavailable network/pull capability, state the affected PC, the observed prerequisite and the exact action needed to resume. Continue the reachable Campaign work, keep unavailable sheet data explicitly unknown and preserve successful pulls. Done when every intended PC has a real pull outcome or an explicit prerequisite gap, and the story-side comparison is accounted for.

5. **Threads.** First record the DM's commitments that later planning must keep as anchors in the overview's `Direction`. Write every other attractive future there as a possibility, phrased conditionally. Read `wiki/templates/Thread.md`. Create three to five initial `status: active` Threads in the Campaign's `Threads/`, grounded in the retrieved World Factions' current agendas and connected to the premise and known PC goals. Each Faction-driven Thread links the Faction behind it and relevant existing cast. It states where the pressure stands and its next development if nobody acts, plus how the Party encounters it, available levers and what resolves it. Keep possible endings conditional: creation establishes pressures and DM anchors, while every outcome that depends on the Players stays a possibility. Done when `Direction` separates any anchors from possibilities, and every Thread has a source agenda or supplied PC goal, a concrete next development the Party can meet and resolving links.

6. **Starting hot.** Initialise this new Campaign's `hot.md` from `wiki/templates/hot.md`, about 500 words and at most 550. Record the starting in-world date, linked Location and Party, every active Thread with its current pressure and next move, and what the first Session can pick up. State that no Session has been played in this Campaign; inherit the changed World, not the previous Campaign's last Session as this Party's experience. Link the Threads here so they are reachable. Leave Sessions, Quests and other unused folders uncreated. Later Ingest and Prep update hot.md. Done when hot.md agrees with the overview, PCs and Threads and gives `plan-session` a usable starting state.

7. **File.** Use the current `cf` commands below. Generate the index, then run the page gate with all layers, given the Campaign's folder and every other page this run touched. Apply mechanical fixes, preserving facts and the pull-owned sheet sections. Re-run the page gate until it reports `ok: 0 findings`. After it passes, append one `create` entry titled `New Campaign: <Campaign>` with a `--page` for every page created or changed. The pull records its own `pull` entry when it changes PCs. Observe the final page-gate result after logging. Done when the generated index lists the Campaign and its pages, the creation entry lists the touched pages and the final page gate passes. Report an unavailable gate or remaining findings as an explicit completion gap.

8. **Report.** Give the DM the pitch, linked Party and initial Threads, each PC's observed pull outcome, and the index/log/gate result. State any remaining prerequisite precisely, distinguishing it from completed page creation. Offer `/skill:collab-with-me` as the next step. Call the Campaign ready only once every required pull and gate is proved. Done when the report matches the saved pages and observed operations.

## CLI contract

Read `package.json` and the relevant subcommand's `--help` when executing. The current runner is `bun run cf`. Bind every command to the same repository root, Wiki and template directory; pass `--vault`, `--root` and `--templates` when the caller assigns an explicit filesystem target.

```bash
bun run cf -- pull --campaign "<Campaign folder>" --vault "<wiki>" --root "<root>" --templates "<templates>"
bun run cf -- index --vault "<wiki>" --root "<root>"
bun run cf -- check --fix --vault "<wiki>" --root "<root>" --templates "<templates>" "<Campaign folder>" "<page path>"
bun run cf -- check --vault "<wiki>" --root "<root>" --templates "<templates>" "<Campaign folder>" "<page path>"
bun run cf -- log --world "<World overview name>" --op create --title "New Campaign: <Campaign>" --page "<page>" --vault "<wiki>" --root "<root>"
```

Repeat `--page` for all touched pages, using names or vault-relative paths to disambiguate. Generated index.md files belong to `bun run cf -- index`. Append to log.md only through `bun run cf -- log`. Command output, rather than an intended invocation, establishes execution.
