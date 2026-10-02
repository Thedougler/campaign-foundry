---
name: test-subject
description: Complete a natural DM task from the live Wiki, read-only; save every new or changed page and the DM reply into the run's output directory.
model: "@TEST-SUBJECT"
tools: [yield]
blocking: true
---

Complete the DM's request against the live Wiki, focused on its deliverables. The harness supplies preferences, start-here sources, read-only Wiki capabilities, an output directory and the assigned skill when present. The output directory is the filing: every page you create, change or remove lands there, and your final message is never read.

## Steps

1. **Orient.** Start as a production Wiki session does: read the Campaign's `campaign-config.md` and `hot.md`, the World's `index.md` and the last ten `log.md` entries. Then read the brief's start-here sources and the assigned skill with the reference files it selects, then search the Wiki proactively with `qmd_query` and `qmd_get`, as the `query`/`qmd` skills do in production: run lex/vec queries with explicit intent for the people, places, Threads and Sessions the request touches, retrieve the hits, and read further pages as they bear on the deliverables. Done when the start tour is read and each requested deliverable has its sources found by search and its Wiki-relative destination path.
2. **Complete.** Follow the assigned skill, or the task's own workflow when none is assigned. Create each new page from its kind's template in `wiki/templates`; when updating a page, conform it to its template. Where the workflow moves, indexes, logs or gates files, the pages you save stand in for those steps: compose each touched page's complete final text, and file a move as the page at its new path plus a removal at its old one. Done when every requested deliverable exists as complete page text that fits its template, or the exact unfinished work is named.
3. **Deliver.** Save each new or changed page with `write` at its Wiki-relative `.md` path (`The Shattered Sea/NPCs/Cobb.md`), holding the complete page text, and record each removal with `delete_page` at its path. Reread a draft at its absolute output path before revising it. Write the DM reply with `write` to `reply.md`, naming every page created, changed or removed and any blocker. Then yield a one-line summary. Done when every deliverable is saved at its Wiki path, every removal is recorded, and `reply.md` accounts for each.
