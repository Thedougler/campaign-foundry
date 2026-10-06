# Transcript

A Transcript is ingested in stages, and you, the run it was assigned to, are their **coordinator**. Each stage is a fresh subagent with a bounded brief. The **Session Ledger** is the contract between stages: the Ledger builder writes it, and every later stage writes the Wiki from it. You read the Ledger and the stages' returns, never the Transcript or the readers' chunk files. The hand-offs and the touched list are yours, and so are the gate and the Close.

| Stage | Who | Input | Output |
| --- | --- | --- | --- |
| C1 Ledger | Ledger builder | Transcript, Summary, the DM's words | the Ledger in `archive/`, `N`, dictionary rows |
| C2 Units | you | the Ledger | one pages file per writer |
| C3 Write | page writers, Recap writer, then Previously On writer | the Ledger and one pages file or record | Wiki pages, each checked as it is finished |
| C4 Gate | you, with the writers | the touched list | a clean touched-list check |
| C5 Close | you | everything returned | SKILL.md steps 11 to 14 |

In these steps `<transcript>` is the Transcript's path now, and `archive/<file>` is the path it takes at step 11, which every `sources` list cites. A dispatch sentence whose value is empty is dropped.

## Steps

### C1 Ledger

Dispatch one `task`, `effort: med`, with the task text:

```
Read skill://ingest/references/ledger.md, then build the Session Ledger of <transcript>. Summary: <summary path>. The DM says: "<words>".
```

A builder that yields exit 2 hands the file back to the ordinary steps from SKILL.md step 3. For a one-shot the builder yields a story's name in place of `N`, and C3 dispatches only page writers. Done when the builder has yielded the Ledger path, `N`, the Summary path or `none`, its work directory, the unresolved flags and the dictionary lines.

### C2 Units

Read the Ledger whole, then run SKILL.md step 4 on it in place of the file, owners found by its searches and settled by your reading. Its units come from the names in PLAY, RULING, STATE and SAID events and in the Names and New names tables, each under the Canon the builder settled. MOMENT events stay out of the units. Create any new page kind by [New template](../SKILL.md#new-template) now, before any writer starts.

Then share the pages out. Every owner page step 4 lists, existing, new or stub, and every neighbour that must link a new page, goes to exactly one **pages file**, `$work/pages-<k>.md`, grouped by folder:

- `Creatures`
- `NPCs`
- `Locations` and `Vehicles`
- `Items` and `Spells`
- `Factions`, `Deities`, `Lore`, `House Rules`, `Threads` and `Quests`

A pages file lists at most six pages. Split a larger group, keeping pages that link one another together. For each page the file gives its path (a new page's planned path and template), whether it is existing, new or stub, its units with their Ledger lines, and the new pages it must link. Played Session records stay out of every pages file. Done when every owner page and every linking neighbour sits in exactly one pages file.

### C3 Write

Dispatch one `task` batch, `effort: med`, with one page writer per pages file and the Recap writer:

```
Read skill://ingest/references/writer.md, then write the pages in <work>/pages-<k>.md from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>. Sources: archive/<file>. The DM says: "<words>".
```

```
Read skill://ingest/references/writer.md, then write the Session <N> Recap from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>. Sources: archive/<file>. New pages: <titles>.
```

When the Recap writer returns, dispatch the Previously On writer at once, while the page writers run on:

```
Read skill://theatre-of-the-mind, then write the Previously on callout of <path of Session <N+1> - Previously On.md> from the Session Ledger archive/<stem>.ledger.md and the Transcript <transcript>.
```

Keep each writer's id for C4. Done when every writer has returned its pages, each checked clean, with its kept-out claims and its notes for the report.

### C4 Gate

The touched list is every path the writers returned. Run SKILL.md step 10 over it as the run's confirmation. Send each finding by `agent://<id>` message to the writer whose pages file lists that page, quoting the finding. That writer still has the page in context: it repairs the finding and checks the page again before it replies. Repair any finding on a page outside every pages file yourself, as step 10 does. Done when step 10's criterion holds over the touched list.

### C5 Close

Carry the file through SKILL.md steps 11 to 14. For step 13's audit, dispatch one `task` with `Read skill://audit, then audit the Ingest entry for <file>: <touched-list paths>.` and do the rest of step 13 yourself. The step 14 report gathers the builder's yield and every writer's return. Done when step 14's criterion holds.
