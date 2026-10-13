---
name: story-arc
description: "Arc-level view of a Campaign and the hero's journeys of its Party and each PC: build or refresh its story-so-far page and journey Threads, then use them for pacing, plotlines and new plots. Use after a Session's Ingest, or when the DM asks where the story or a hero's journey stands, how it is paced, or where it could go next."
---

# Story arc

You keep one page per Campaign, `wiki/<campaign>/story-so-far.md`, and one journey Thread per PC, which tell any agent where the story stands, and you use them to help the DM plan beyond the next Session. The Campaign's story is what the Players did at the table. Retell it from the Session records and pitch what comes next as situations the Players can take anywhere.

## Steps

1. **Second Brain.** Search the DM's Second Brain before reading the Wiki. Write each call to `xd://mcp__notion_search` with no `page_url`. An unscoped search returns the DM's own notes beside the Backup:

   ```json
   {"query": "<Campaign> story arc, themes and decisions", "page_size": 8, "max_highlight_length": 200}
   ```

   ```json
   {"query": "<the DM's ask in keywords>", "page_size": 8, "max_highlight_length": 200}
   ```

   Skip the second call on a refresh after Ingest. Fetch each hit whose `path` lies outside `campaign-foundry backup` and whose highlight bears on this Campaign's story, themes or planning, writing `{"id": "<hit id>"}` to `xd://mcp__notion_fetch`. Note each DM decision with its page id. Where a note and the Wiki disagree, the Wiki stands (`.omp/AGENTS.md` § Wiki access). Done when each call has run and each outside hit is fetched or ruled off-topic by its highlight. A session without the device notes "Second Brain unreachable" and goes on.
2. **Read the Wiki.** Follow the read order in root `AGENTS.md`: `campaign-config.md` (its Themes rank the kinds of authority), `hot.md` and `index.md`. Then read the existing `story-so-far.md` and its **Through.** line, each Recap after that Session (every Recap on a first build), the `## State and angles` of every active Thread and the `## Terms and leads` of every open Quest. Read each PC's Goals and bonds, Plans and journey Thread, and [`references/heros-journeys.md`](references/heros-journeys.md). Read the last two Session Ledgers for what the Players fixated on, per `docs/agents/narrative-devices.md` § Planted details and connection. Done when every Recap since **Through.** and each of those pages is read.
3. **Hero's journeys.** Run this step inside Ingest after a played Session, on a first build, and when the DM asks about a hero's journey. Skip it for any other DM ask. For each PC (never a guest character), create or rewrite their journey Thread at `<campaign-folder>/Threads/journey-of-<pc-slug>.md` from `wiki/templates/thread.md`, titled `Journey of <PC name>`, with `status: active`, `revealed: "Backstory"` (its subject is the PC, whose page is always Backstory) and `sources` from the Recaps and Ledgers it cites. Read each Recap since **Through.** (every Recap on a first build) and the Ledgers behind it. Judge the PC's stage from what they did, and fill `## Hero's journey` per its template comment and the reference. Add or keep `- **Hero's journey.**`, linking the PC's journey Thread, as the first `## Plans` bullet on the PC page. Edit only that page's `## Plans`, and leave the sheet side as it stands. Check each page as you finish it (`skill://lint` § Commands, **Page check**). Done when every PC has one journey Thread, every stage row cites the Sessions that show it, no line states what a PC will do, and each page check reports `ok: 0 findings`.
4. **Write the page.** Skip this step for a DM ask when **Through.** already names the latest Recap. Re-read `story-so-far.md`, then rewrite it whole from `wiki/templates/story-so-far.md`. Write its required sections and each `Optional.` section and bullet whose condition holds, following each comment and the rules below: the Party's stage in the **Hero's journey.** bullet, each PC trajectory led by its stage and the next Lead PC in Pacing. Draw the `## Timeline`, once it is due, per `visuals`. Set `summary` to one line on where the current Arc stands, and `sources` to the `sources` of the latest Recap. A first build also adds a `- **Story so far.** [[story-so-far|…]]` line to the Campaign overview's `## Players and table`, below its `campaign-config` line. Close per `skill://lint` **Close** over this page and every page step 3 touched, logging `--op create` when run alone. Inside Ingest, return those paths. Done when the page check reports `ok: 0 findings` and **Through.** names the latest Recap.
5. **Answer the DM.** For a DM ask, reply from the page and the pages it links, talking per `docs/agents/co-writing.md`:
   - **Pacing:** identify each imbalance shown in the Pacing section and offer a concrete fix for it, pitched per `docs/agents/co-writing.md` § Canon and pitches. Then give the next Lead PC with its observed evidence.
   - **Plotlines:** say which pressures converge, and where and through which PC they meet two horizons out. Add where the PCs' possibilities come from those pressures. A plotline the DM takes goes to `skill://plan-session` as Session intent material.
   - **New plots:** pitch two to four new plots that differ in kind, per `docs/agents/co-writing.md` § Wide and narrow. Build each from a pressure and a theme, tied to the pull on one PC. A plot the DM takes into a scheme or arc goes to the Story handoff of `collab-with-me`.

   The reply files nothing. `collab-with-me` step 5 (Lock it in) files the ideas the DM locks. Done when each part of the ask has its answer, and every forward line is marked as an anchor, a possibility or player-owned.

## Rules

Each rule's sources are in `docs/research/creative-writing/story-arc.md`.

- **Played from Recaps.** Each past event on the page traces to a Recap you read. Draft Canon (`CONTEXT.md` **Revealed**) appears only in Open promises, as one clause marked DM-only that links its page.
- **Link, don't copy.** Each Thread, Quest and PC page records its own state. The page says what each does in the arc.
- **Situations, not plots.** Forward lines are pressures and what each does if nobody acts. Rework a pitch that resolves only through one player choice until several choices lead to it.
- **React with purpose.** From the consequences that follow fairly from what the Party did, pitch the ones that serve the arc and the themes.
- **Anchor, possibility, player-owned.** An anchor is only what the DM committed. Everything else is a possibility, or belongs to the Players.
- **PC gravity.** Every pressure and pitch pulls on a PC's Goals and bonds. One that would run the same without the Party is cut or tied to a PC.
- **Loaded guns.** Open promises remain on the page until the Players pick them up. Tie what the Players fixated on to a live Thread, per `docs/agents/narrative-devices.md` § Callbacks.
- **Detail by distance.** Write the next Session in full and the horizon after it as hooks. The ending gets only a silhouette. Pacing alternates upswings and downswings across Sessions.
- **Hero's journeys.** The Party and every PC walk a hero's journey across the whole Campaign, per `references/heros-journeys.md`. Read the stages from Session history after play, and prep only possibilities for the next Session.
