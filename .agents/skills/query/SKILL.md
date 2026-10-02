---
name: query
description: Answers the DM's questions about a World or Campaign from the Wiki, citing the pages, and files a keeper answer back onto the page it belongs on. Use when the DM asks who, what or where something is, what happened, what the Wiki says, or how pages connect.
---

# Query

The Wiki is the evidence. Every fact in an answer comes from a page read during this run and carries its citation.

## Steps

1. **Orient** with the read order in `AGENTS.md`: `hot.md`, the World's `index.md`, the `log.md` tail. `hot.md` points at pages; cite the page behind it.
2. **Search** with QMD (read the `qmd` skill for mechanics). Set explicit `intent` to the DM's question, use a lexical search on names/key terms and a semantic search on the plain question. Add matching `index.md` entries to the hits. Done when the question's named subjects and meaning have both been searched.
3. **Read** the hits through `qmd multi-get` or trusted MCP `multi_get`; snippets are leads. Follow wikilinks one hop where the answer runs through a linked page (an NPC's Faction, a Location's parent, the Creature behind an NPC). Done when every part of the question has a page that answers it, or a gap confirmed by both name and meaning searches.
4. **Answer** in the shape below.
5. **File back** a keeper (below). Any other answer ends the run at step 4.

## Answer

- Lead with the direct answer in one or two plain sentences the DM could use at the table, then only what the question asked for. A related fact the DM didn't ask about earns one line at most.
- Cite each fact inline: `[[Page]]`, or `[[Page#Section]]` when the page is long.
- **Records, not plans.** What happened comes from Recaps, Transcripts and the pages they updated. Prep and Scene pages say what was planned, so a planned outcome is cited as the plan.
- Name each gap plainly: what the Wiki leaves unsaid. An answer that is mostly a gap stays short: the gap, the nearest recorded facts in a line or two, then the suggestions. Your own readings, inferences and ideas go under a final **Not in the Wiki** line, each marked as yours.
- Where pages disagree, give both with their pages and the version Canon precedence favours: the DM's own words, then the most recent event.

## Filing back

A **keeper** is one of:

- a fact the answer assembled from several pages, which the DM will want again and which belongs on one page that lacks it (where an NPC is now, after three Recaps moved them; which Clues point at a hidden truth);
- a stale page the answer exposed: a later event (a Recap, the DM's word) changed something the page still states as current; or
- anything new the DM states while asking. The DM's word is Canon.

Most answers file nothing. A keeper is filed without asking (ADR 0003), and filing is **surgical**:

- **Stated facts only.** File what a page or the DM states. Your inferences and suggestions stay in the answer.
- **Link, don't copy.** A fact that already lives on its own page gets a link from here, never a second telling.
- **Stale means contradicted.** Rewrite only the statement a later event contradicts, summary included, and leave the rest of the page as it was.
- **Pages, not the spine.** `hot.md`, `index.md` and `log.md` are never filing targets: Ingest and Prep rewrite `hot.md`, and scripts write the other two.

1. Write the keeper onto the page of its kind, in the section where that page's template puts such a fact, in the page's own voice, linking the pages it came from. The question and answer stay in chat.
2. Run the full `cf check --fix` / `cf check`, resolving findings or reporting what remains. Then run `cf log --world <World> --op query --title "<the question>"` with a `--page` per page edited. Done when filing has observed full-gate results and its log entry; a page filter is not completion evidence.
3. Close the answer with one line naming each page edited. The index and log are housekeeping the DM never needs to hear about.
