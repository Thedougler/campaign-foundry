---
name: query
description: Answers the DM's questions about a World or Campaign from the Wiki, citing the pages, and files a keeper answer back onto the page it belongs on. Use when the DM asks who, what or where something is, what happened, what the Wiki says, or how pages connect.
---

# Query

The Wiki is the evidence. Every fact in an answer comes from a page read during this run and carries its citation.

## Steps

1. **Orient** with the read order in `AGENTS.md`: `hot.md`, the World's `index.md`, the `log.md` tail. `hot.md` points at pages; cite the page behind it.
2. **Search** with qmd (the `qmd` skill), from the project root that holds the Wiki: `intent` set to the DM's question, a `lex` search on the names and key terms, and a `vec` search on the question in plain words. Add matching `index.md` entries to the hits.
3. **Read** the hits in full (`qmd multi-get`, or the MCP `multi_get`); snippets are leads. Follow wikilinks one hop where the answer runs through a linked page (an NPC's Faction, a Location's `parent`, the Creature behind an NPC). Done when every part of the question has a page that answers it, or a gap confirmed by both a name search and a meaning search.
4. **Answer** in the shape below.
5. **File back** a keeper (below). Any other answer ends the run at step 4.

## Answer

- Lead with the direct answer in one or two plain sentences the DM could use at the table.
- Cite each fact inline: `[[Page]]`, or `[[Page#Section]]` when the page is long.
- Name each gap plainly: what the Wiki leaves unsaid. Ideas of your own go under a final **Not in the Wiki** line, marked as suggestions.
- Where pages disagree, give both with their pages and the version Canon precedence favours: the DM's own words, then the most recent event.

## Filing back

A **keeper** is either:

- a fact the answer assembled from several pages, which the DM will want again and which belongs on one page that lacks it (where an NPC is now, after three Recaps moved them; which Clues point at a hidden truth); or
- anything new the DM states while asking. The DM's word is Canon.

File it without asking (ADR 0003):

1. Write it onto the page of its kind, in the section where that page's template puts such a fact, in the page's own voice, linking the pages it came from. The fact joins the page; the question and answer stay in chat.
2. Hand any contradiction the answer uncovered to the `audit` skill, over the pages involved.
3. Run `pnpm check <page>` until it passes, and append a `query` entry to the World's `log.md` in the format from `docs/wiki-layout.md`.
4. Close the answer with one line naming the page edited.
