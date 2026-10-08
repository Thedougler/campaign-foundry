---
name: query
description: Answers the DM's questions about a World or Campaign from the Wiki, citing the pages, and files a keeper answer back onto the page it belongs on. Use when the DM asks who, what or where something is, what happened, what the Wiki says, or how pages connect.
---

# Query

The Wiki is the evidence. Every fact in an answer comes from a page read during this run, and the answer cites that page.

## Steps

1. **Orient** with the read order in `AGENTS.md`: `hot.md`, the Campaign folder's `index.md`, the `log.md` tail. `hot.md` points at pages, so cite the page behind it.
2. **Search** the Backup first where the Notion MCP is mounted: one `notion-search` scoped to the Backup root with the DM's question as the query (`.omp/AGENTS.md` § Wiki access). Map each hit to its `wiki/` path and add it to the hits. Then search QMD (read the `qmd` skill for mechanics). Set explicit `intent` to the DM's question, use a lexical search on names/key terms and a semantic search on the plain question. Add matching `index.md` entries to the hits. Done when the question's named subjects and meaning have both been searched in QMD.
3. **Read** the hits in `wiki/` through `qmd multi-get` or trusted MCP `multi_get`; snippets and Backup pages are leads, since the Backup trails the Wiki. Follow wikilinks one hop where the answer runs through a linked page (an NPC's Faction, a Location's parent, the Creature behind an NPC). Done when every part of the question has a page that answers it, or a gap confirmed by both name and meaning searches.
4. **Prior iteration.** Search the **agentic-co-dm** repo last, for each gap step 3 confirmed: it is this project's previous version, covering the same Campaign. Use MCP `query` with `collections: ["agentic-co-dm"]` (the CLI lacks it), a lexical search on names and a semantic search on the plain question, then `get` each hit by its `agentic-co-dm/…` path. When `status` doesn't list that collection, grep `wiki/` in a clone of https://github.com/Thedougler/agentic-co-dm at `prior/agentic-co-dm/`. Done when each gap has a prior-iteration page read or came back empty on both searches.
5. **Answer** in the format below.
6. **File back** a keeper (below). Any other answer ends the run at step 5.

## Answer

- Lead with the direct answer in one or two plain sentences the DM could use at the table, then only what the question asked for. A related fact the DM didn't ask about gets one line at most.
- Cite each fact inline: `[[Page]]`, or `[[Page#Section]]` when the page is long.
- **Records, not plans.** What happened comes from Recaps, Transcripts and the pages they updated. Prep and Scene pages say what was planned, so a planned outcome is cited as the plan.
- State each gap plainly: what the Wiki leaves unsaid. An answer that is mostly a gap is short. It gives the gap and the nearest recorded facts in a line or two, then the suggestions. Your own readings, inferences and ideas go under a final **Not in the Wiki** line, each marked as yours.
- **Prior iteration, not Canon.** What step 4 found goes on a **Prior iteration (not Canon)** line after the Wiki's facts, each fact cited by its `agentic-co-dm/…` path. The Wiki takes precedence in any disagreement.
- Where pages disagree, give both with their pages and the version Canon precedence favours: the DM's own words, then the most recent event.

## Filing back

A **keeper** is one of:

- a fact the answer assembled from several pages, which the DM will want again and which belongs on one page that lacks it (where an NPC is now, after three Recaps moved them; which Clues point at a hidden truth);
- a stale page the answer exposed: a later event (a Recap, the DM's word) changed something the page still states as current; or
- anything new the DM states while asking. The DM's word is Canon.

Most answers file nothing. A keeper is filed without asking (ADR 0003), and filing is **surgical**:

- **Stated facts only.** File what a Wiki page or the DM states. Your inferences and suggestions stay in the answer, and so does a prior-iteration fact until the DM confirms it.
- **Link, don't copy.** A fact already stated on its own page gets a link from here, never a second telling.
- **Stale means contradicted.** Rewrite only the statement a later event contradicts, summary included, and leave the rest of the page as it was.
- **Pages, not the spine.** `hot.md`, `index.md` and `log.md` are never filing targets, because Ingest and Prep rewrite `hot.md` and scripts write the other two.

1. Write the keeper onto the page of its kind, in the section where that page's template puts such a fact, in the page's own voice, linking the pages it came from. The question and answer stay in chat.
2. Run the page gate, `bun run cf -- check --fix` / `bun run cf -- check` given every page edited, repairing every finding until it reports `ok: 0 findings`. Then run `bun run cf -- log --campaign "<Campaign>" --op query --title "<the question>"` with a `--page` per page edited. Done when filing has observed that page gate at `ok: 0 findings` and its log entry.
3. Close the answer with one line listing each page edited. The index and log are housekeeping the DM never needs to hear about.
