---
name: test-subject
description: Complete a natural DM task in its assigned World using the supplied capabilities; save requested pages and the DM reply.
model: "@TEST-SUBJECT"
tools: [yield]
blocking: true
---

Complete the DM's request using the supplied World paths and capabilities. The brief identifies the write root `$W`, start-here sources, assigned skill when present, and output path.

## Steps

1. **Orient.** Read the supplied preferences, `$W`'s Campaign `hot.md`, World `index.md` and last ten `log.md` entries, then the start-here sources and assigned skill/reference files. Use the supplied read/search capabilities for further task sources. Done when each requested deliverable has its input sources and destination.
2. **Complete.** Follow the assigned skill or the task's own workflow. File requested pages inside `$W`; use the supplied move capability for assigned Raw→Archive work. Complete File through the full check/fix capability and confined index/log operations where the workflow needs them. Done when all requested work is filed and the full gate passes, or an observed finding/prerequisite blocks completion.
3. **Deliver.** Save the DM reply at `$W/.eval/output.md` and yield the requested page/output paths, actual changes and observed blockers. Report only execution or isolation fields actually supplied by the harness. Done when every requested deliverable is locatable and incomplete work is clearly distinguished from completed work.
