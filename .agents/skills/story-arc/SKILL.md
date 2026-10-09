---
name: story-arc
description: "Arc-level view of a Campaign: build or refresh its story-so-far page, then use it for pacing, plotlines and new plots. Use after a Session's Ingest, or when the DM asks where the story stands, how it is paced, or where it could go next."
---

# Story arc

You keep one page per Campaign, `wiki/<campaign>/story-so-far.md`, that tells any agent where the story stands, and you use it to help the DM plan beyond the next Session. The Campaign's story is what the Players did at the table. Retell it from the Session records and pitch what comes next as situations the Players can take anywhere.

## Steps

1. **Second Brain.** Search the DM's Second Brain before reading the Wiki. Write each call to `xd://mcp__notion_search` with no `page_url`. An unscoped search returns the DM's own notes beside the Backup:

   ```json
   {"query": "<Campaign> story arc, themes and decisions", "page_size": 8, "max_highlight_length": 200}
   ```

   ```json
   {"query": "<the DM's ask in keywords>", "page_size": 8, "max_highlight_length": 200}
   ```

   Skip the second call on a refresh after Ingest. Fetch each hit whose `path` lies outside `campaign-foundry backup` and whose highlight bears on this Campaign's story, themes or planning, writing `{"id": "<hit id>"}` to `xd://mcp__notion_fetch`. Note each DM decision with its page id. Where a note and the Wiki disagree, the Wiki stands (`.omp/AGENTS.md` § Wiki access). Done when each call has run and each outside hit is fetched or ruled off-topic by its highlight. A session without the device notes "Second Brain unreachable" and goes on.
2. **Read the Wiki.** Follow the read order in root `AGENTS.md`: `campaign-config.md` (its Themes give the authority rungs), `hot.md` and `index.md`. Then read the existing `story-so-far.md` and its **Through.** line, each Recap after that Session (every Recap on a first build), and the `## At a glance` of every active Thread and open Quest. Read each PC's Goals and bonds and Plans. Read the last two Session Ledgers for what the Players fixated on, per `docs/agents/narrative-devices.md` § Planted details and connection. Done when every Recap since **Through.** and each of those pages is read.
3. **Write the page.** Skip this step for a DM ask when **Through.** already names the latest Recap. Re-read `story-so-far.md`, then rewrite it whole with the sections of `wiki/templates/story-so-far.md`, following each section's comment and the rules below. Set `summary` to one line on where the arc stands, and `sources` to the `sources` of the latest Recap. A first build also adds a `- **Story so far.** [[story-so-far|…]]` line to the Campaign overview's `## Play`, below its `campaign-config` line. Close per `skill://lint` **Close**, logging `--op create` when run alone. Inside Ingest, return the path. Done when the page check reports `ok: 0 findings` and **Through.** names the latest Recap.
4. **Answer the DM.** For a DM ask, reply from the page and the pages it links, talking per `docs/agents/co-writing.md`:
   - **Pacing:** state each imbalance the Pacing section shows, with one fix for each pitched as a Seed.
   - **Plotlines:** say which pressures converge, and where and through which PC they meet two horizons out. A plotline the DM takes goes to `skill://plan-session` as Session intent material.
   - **New plots:** offer Seeds per `docs/agents/co-writing.md` § Seeds. Build each from a pressure and a theme, tied to the pull on one PC. A Seed the DM takes into a scheme or arc enters the Story stage of `collab-with-me`.

   The reply files nothing. `collab-with-me` step 5 files the ideas the DM settles. Done when each part of the ask has its answer, and every forward line is marked as an anchor, a possibility or player-owned.

## Rules

Each rule's sources are in `docs/research/creative-writing/story-arc.md`.

- **Played from Recaps.** Each past event on the page traces to a Recap you read. Draft Canon (`CONTEXT.md` **Revealed**) appears only in Open promises, as one clause marked DM-only that links its page.
- **Link, don't copy.** Each Thread, Quest and PC page records its own state. The page says what each does in the arc.
- **Situations, not plots.** Forward lines are pressures and what each does if nobody acts. Rework a pitch that resolves only through one player choice until several choices lead to it.
- **React with purpose.** From the consequences that follow fairly from what the Party did, pitch the ones that serve the arc and the themes.
- **Anchor, possibility, player-owned.** An anchor is only what the DM committed. Everything else is a possibility, or belongs to the Players.
- **PC gravity.** Every pressure and pitch pulls on a PC's Goals and bonds. One that would run the same without the Party is cut or tied to a PC.
- **Loaded guns.** Open promises remain on the page until the Players pick them up. Tie what the Players fixated on to a live Thread, per `docs/agents/narrative-devices.md` § Callbacks.
- **Detail by distance.** Write the next Session in full and the horizon after it as hooks. The ending gets only a silhouette. Pacing swings between upward and downward beats across Sessions.
