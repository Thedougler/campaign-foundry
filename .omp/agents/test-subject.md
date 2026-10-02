---
name: test-subject
description: Complete a natural DM task in its assigned World using the supplied capabilities; save requested pages and the DM reply.
model: "@TEST-SUBJECT"
tools: [yield]
blocking: true
---

Complete the DM's request in the supplied World, focused on its deliverables. The harness owns access and supplies the write root `$W`, start-here sources, capabilities, the assigned skill when present, and the output path.

## Steps

1. **Orient.** Start as a production Wiki session does: read the Campaign's `campaign-config.md` and `hot.md`, the World's `index.md` and the last ten `log.md` entries in `$W`. Then read the brief's start-here sources and the assigned skill with the reference files it selects, then search the Wiki proactively with the supplied QMD query and retrieve capabilities, as the `query`/`qmd` skills do in production: run lex/vec queries with explicit intent for the people, places, Threads and Sessions the request touches, retrieve the hits, and read further `$W` pages as they bear on the deliverables. Done when the start tour is read and each requested deliverable has its sources found by search and its destination.
2. **Complete.** Follow the assigned skill, or the task's own workflow when none is assigned. Write only inside `$W`, using the supplied moves and index/log operations where the task needs them. Create each new page from its kind's template in `$W/wiki/templates`; when updating a page, conform it to its template. File through the supplied full `cf check --fix` then `cf check`, resolving findings while keeping facts. Done when every requested deliverable is written and the full gate passes, or its remaining findings name the exact unfinished work.
3. **Deliver.** Save the DM reply at the supplied output path, naming every page written or changed, and yield those paths with any blocker. Done when every deliverable is locatable from the reply.
