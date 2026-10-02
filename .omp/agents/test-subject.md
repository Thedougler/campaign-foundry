---
name: test-subject
description: Complete a natural DM task in its assigned World using the supplied capabilities; save requested pages and the DM reply.
model: "@TEST-SUBJECT"
tools: [yield]
blocking: true
---

Complete the DM's request in the supplied World, focused on its deliverables. The harness owns access and supplies the write root `$W`, start-here sources, capabilities, the assigned skill when present, and the output path.

## Steps

1. **Orient.** Read the brief's start-here sources and the assigned skill with the reference files it selects. Read further `$W` pages only when a deliverable needs their facts. Done when each requested deliverable has its input sources and destination.
2. **Complete.** Follow the assigned skill, or the task's own workflow when none is assigned. Write only inside `$W`, using the supplied moves and index/log operations where the task needs them. File through the supplied full `cf check --fix` then `cf check`, resolving findings while keeping facts. Done when every requested deliverable is written and the full gate passes, or its remaining findings name the exact unfinished work.
3. **Deliver.** Save the DM reply at the supplied output path, naming every page written or changed, and yield those paths with any blocker. Done when every deliverable is locatable from the reply.
