---
name: new-campaign
description: Campaign creation — use when the DM starts a Campaign in an existing World or brings a new group of Players to it. Gather their plans first, then build the overview, public D&D Beyond PCs, Faction-driven Threads, campaign-config and hot.md.
---

# New Campaign

A Campaign is one group of Players moving through a World. Create its starting state. `collab-with-me` and Prep build what play needs next.

Every path below is vault-relative (from `wiki/`) unless it starts with `docs/` or `archive/`. Store the new Campaign in `<World>/<Campaign>/`, and keep page names unique across the whole vault.

## Steps

1. **Ground.** Read `user-config.md` and `docs/wiki-layout.md`, then ADRs `docs/adr/0003-ask-about-intent-never-bookkeeping.md`, `docs/adr/0004-campaigns-move-the-world-forward.md` and `docs/adr/0009-pcs-pulled-from-public-dndbeyond-characters.md`. When the World already has a Campaign, read its `campaign-config.md`, then its `hot.md` (orientation, not evidence), the World's `index.md` and the last ten entries of the World's `log.md`. Read `wiki/DM Settings.md` for the defaults a Campaign inherits.

   Search with QMD (`skill://qmd`) for the new Campaign's context. Retrieve the World overview and its Calendar, plus the Locations where play starts. Look for the Factions whose agendas will drive Threads and House Rules in force. For a successor, also look for the earlier Campaign's overview, its last Recap, its PCs, and the Threads and Quests whose pressures carry over. Which pages bear on the request is your judgement; read each page behind a hit in full, since a snippet only says where to read.

   A World has one active Campaign at a time, while earlier Campaigns remain records of what changed it. If another Campaign is active, establish the DM's intent: a successor after that Campaign ends, or a parallel group in a separate World (ADR 0004). Use an answer already supplied; otherwise ask about that intent during Talk. A new request alone does not establish that the earlier Campaign ended. Preserve the earlier Campaign's folder, PCs, Threads, House Rules, `hot.md` and played Sessions as they stand.

   Use the starting state the DM specifies. For Canon, use what the DM says first, then what the Wiki says. When the DM doesn't specify a starting state, use the end of the earlier Campaign's last Session with a Recap. When the Wiki records a Session as played that the DM calls unplayed, leave those pages unchanged, start from the last Session the DM counts as played, and record the conflict for your report. **Done when** the source World, the existing Campaign state, the starting state and the target Wiki are known.

2. **Talk.** Gather the DM's details before creating pages, talking with the DM per `docs/agents/co-writing.md`; when the DM already supplied an answer in the request, use it without asking again. Cover:
   - the World and Campaign name, premise, central tension, tone and themes. Capture tone as one sentence the DM could say aloud about their table, plus its two consequences in the DM's words. The first is how it builds an NPC, as a short formula such as image and competence with one revealing need and one fixation. The second is what it adds to a scene beyond the external threat, such as the small human conflict riding the stakes;
   - the starting Location and in-world date in that World's Calendar;
   - how the Party comes together;
   - every Player and intended PC, their public D&D Beyond character URL, known backstory, goals, bonds, fears and the DM's plans for them. When a PC's story side is thin and the DM requests help, offer optional prompts that draw out the PC pulls `plan-session` strains: two that oppose each other and the want they never cleanly arrive at. Useful prompts ask what the PC is trying to become and what they are afraid of losing. Others ask who they love or loved, what personal failure would look like and what red button makes them throw caution to the wind. Answers are ordinary `Story` and `Goals and bonds` content, and the DM may skip any prompt;
   - cadence, Session length, table agreements and any Campaign House Rules.

   Inherit established World facts, the earlier Campaign's tone and table boundaries when the DM keeps them, and `DM Settings` defaults unless the DM changes them. Treat unspecified PC story facts as unknown. Creative delegation from the DM still leaves a PC's public character URL to the DM, so ask for actual links where needed. **Done when** each detail is answered, explicitly delegated, inherited or identified as a missing prerequisite, and the one-active-Campaign intent is settled. Then proceed directly to writing.

3. **Overview and config.** Read `wiki/templates/Campaign.md` and `wiki/templates/campaign-config.md`. Write `<World>/<Campaign>/<Campaign>.md` and `<World>/<Campaign>/campaign-config.md` from them. Keep every property and section in template order and remove the `%% %%` guidance. Create a folder only when placing its first page. For each page this skill writes, list in `sources` the repo-relative archived Raw paths (`archive/<file>.md`) its facts come from, or `[]`.

   - **Overview.** In `## At a glance`, write Players using the Player names supplied by the DM's request or the earlier Campaign's overview, paired with their PCs. Add Premise, Party (links to the PC pages), Cadence and Now (where the Party stands at the starting state). The `The Campaign` callout is the spoken opening. Follow `theatre-of-the-mind` for it, using its **Slots** row for World or Campaign pitch. In `## Play`, write bullets for Session length and Table agreements. Add House Rules with a link to each House Rule page in force. Keep a rule from an earlier Campaign on its existing page and link it from here. Then add a bullet linking the config as `[[<Campaign>/campaign-config|Tone, themes, Lines and Veils]]`, path-qualified because every Campaign has a `campaign-config`. Leave `session_length_hours` blank to inherit `DM Settings`, and set it only for an override. `## Depth`: `### Premise`, `### Themes`, and `### Direction` as step 5 sets out.
   - **Config.** `## Tone` holds the captured tone sentence with its NPC and scene consequences, `## Themes` the gathered themes, and `## Lines and Veils` the table's limits. A config kept from an earlier Campaign is retold in fresh sentences, since the gate's `boilerplate` layer flags a sentence copied verbatim from another page.

   Run `bun run cf -- check "<page path>"` on each and repair every finding. Read the finished config before authoring the remaining Campaign pages. **Done when** both pages satisfy their templates, contain the gathered intent, establish the Campaign's starting situation, and pass their page checks.

4. **PCs and sheets.** Read `wiki/templates/PC.md` and `skill://pull-pcs`. Create one page per intended PC in `<World>/<Campaign>/PCs/`, set `dndbeyond_url` to the public character URL, and link each PC from the overview's Party. Use the PC's name for the page; when an earlier Campaign already has a page of that name, add the Campaign as a parenthetical, `<PC name> (<Campaign>).md`, and link it as `[[<PC name> (<Campaign>)|<PC name>]]`.

   The story side is yours. Put the DM's story, including any PC pulls the prompts drew out, in `Story`, `Goals and bonds` and `Plans`, retaining supplied story passages and facts. For a returning PC, write the story side fresh for this Campaign and link the earlier Campaign's PC page for the full Backstory, since the gate flags sentences copied verbatim between pages. Follow `theatre-of-the-mind` for the required `Portrait` callout, using its **Slots** row for Portrait and grounding it in known appearance. Keep the Player-to-PC mapping in the overview because the pull replaces the sheet side.

   The sheet side (`Sheet`, `Spells`, `Inventory`) comes only from D&D Beyond through `bun run cf -- pull`, a live call to the public D&D Beyond service. Run an actual pull, not just a preview:

   ```bash
   bun run cf -- pull --campaign "<Campaign>"
   ```

   The selector is the Campaign folder name. Add a repeated `--pc "<PC page name>"` when another World has a Campaign folder of the same name. Account for every intended PC from the command's per-PC output and resulting page: `updated` or `unchanged` establishes a fetched sheet; `skipped`, `failed`, a dry run or an unavailable operation does not. Compare `Story`, `Goals and bonds` and `Plans` before and after: the pull leaves all three unchanged. Repair gate findings on the pulled pages without altering the fetched facts. A `boilerplate` finding between two pulled sheet sides of the same character stays as the pull wrote it. Report each one verbatim. Then follow `audit` over the changed PCs and their linked neighbours.

   When D&D Beyond is unreachable, a link is missing, a character is private, or the pull command cannot run, leave that PC's sheet side empty of statistics. State the affected PC, the observed error and the exact action needed to resume. Ask the DM to set a private character to public or supply a missing link. For an unavailable service or command, state that the pull command above must be rerun. Continue the reachable Campaign work and preserve successful pulls. **Done when** every intended PC has a real pull outcome or an explicit prerequisite gap, and the story-side comparison is accounted for.

5. **Threads.** First record the DM's commitments that later planning must keep as anchors in the overview's `### Direction`. Write every other attractive future there as a possibility, phrased conditionally. Read `wiki/templates/Thread.md`. Create three to five Threads with `status: active` at `<World>/<Campaign>/Threads/<Thread name>.md`, grounded in the retrieved World Factions' current agendas and connected to the premise and known PC goals. A successor's Threads are new pages; the earlier Campaign's Threads stay as its record, and a new Thread links the one it grows from. Each Faction-driven Thread links the Faction behind it and relevant existing cast. It states where the pressure stands and its next development if nobody acts, plus how the Party encounters it, available levers and what resolves it. Keep possible endings conditional: creation establishes pressures and DM anchors, while every outcome that depends on the Players stays a possibility. Run `bun run cf -- check "<page path>"` on each and repair every finding. **Done when** `Direction` separates any anchors from possibilities, and every Thread has a source agenda or supplied PC goal, a concrete next development the Party can meet and resolving links.

6. **Starting hot.** Write `<World>/<Campaign>/hot.md` from `wiki/templates/hot.md`, about 500 words and at most 550. Set `date` to the starting in-world date. Fill `## At a glance` (In-world date, Party at with the linked Location, Active Threads, Last Session, Next), `## Active Threads` (one line per Thread, linked, with its current pressure and next move), `## Last Session` (state that no Session has been played in this Campaign; for a successor, the changed World it inherits, each change linked to its page) and `## Next` (what the first Session can pick up). The Party's experience starts here: inherit the changed World, not the previous Campaign's last Session as this Party's experience. Leave Sessions, Quests and other unused folders uncreated. Later Ingest and Prep update hot.md. **Done when** hot.md agrees with the overview, PCs and Threads and gives `plan-session` a usable starting state.

7. **File.** Run the commands in **CLI contract** below. Generate the index, then run the page gate with all layers, given the Campaign's folder and every other page this run touched. Apply mechanical fixes, preserving facts and the pull-owned sheet sections. Re-run the page gate until it reports `ok: 0 findings`. After it passes, append one `create` entry titled `New Campaign: <Campaign>` with a `--page` for every page created or changed. The pull records its own `pull` entry when it changes PCs. Observe the final page-gate result after logging. **Done when** the generated index lists the Campaign and its pages, the creation entry lists the touched pages and the final page gate passes. Report an unavailable gate or remaining findings as an explicit completion gap.

8. **Report.** Give the DM the pitch, linked Party and initial Threads, each PC's observed pull outcome, and the index/log/gate result. State any remaining prerequisite precisely, distinguishing it from completed page creation, and any Canon conflict from step 1. When the new Campaign replaces the active one, tell the DM to set **Active Campaign** in `user-config.md`. Offer `/skill:collab-with-me` as the next step. Call the Campaign ready only once every required pull and gate is proved. **Done when** the report matches the saved pages and observed operations.

## CLI contract

Run from the repository root. Bind every command to the same repository root, Wiki and template directory; pass `--vault`, `--root` and `--templates` when the caller assigns an explicit filesystem target, and drop them otherwise.

```bash
bun run cf -- pull --campaign "<Campaign folder>" --vault "<wiki>" --root "<root>" --templates "<templates>"
bun run cf -- index --vault "<wiki>" --root "<root>"
bun run cf -- check --fix --vault "<wiki>" --root "<root>" --templates "<templates>" "<World>/<Campaign>" "<page path>"
bun run cf -- check --vault "<wiki>" --root "<root>" --templates "<templates>" "<World>/<Campaign>" "<page path>"
bun run cf -- log --world "<World>" --op create --title "New Campaign: <Campaign>" --page "<page>" --vault "<wiki>" --root "<root>"
```

Repeat `--page` for all touched pages by vault-relative path. `cf index` writes every generated `index.md`, and `log.md` grows only through `cf log`. Command output, rather than an intended invocation, establishes execution.
