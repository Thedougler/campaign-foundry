# Transcript

A Transcript is ingested in stages, and the **orchestrator** runs them: the top-level session, the one the DM talks to. Only the orchestrator dispatches subagents. Each stage is one subagent turn. The subagent does its stage and returns its outputs with the dispatches it requests. You then dispatch those requests and the next stage. Run every stage whose inputs are ready at once, in one `task` batch. A subagent assigned a Transcript returns at once and asks you to run it here.

The **Session Ledger** is the contract between stages: the Ledger stages build it, and every later stage writes the Wiki from it. You read the stages' returns. The Transcript, the chunk files and the Ledger's body stay with the stages. The dispatches, the hand-offs, the touched list and the gate are yours.

| Stage | Who | Runs beside | Output |
| --- | --- | --- | --- |
| C0 Place | you | nothing | `N`, the archive copies, `profile.json`, the detector started |
| C1 Brief | Brief, Summary check | each other, the detector | `brief.md`, `summary-check.md` |
| C2 Read | one `transcript-reader` per chunk | the Summary check, the detector | `chunk-<NN>.md` |
| C3 Merge | Merge, one Names per three chunks, Highlights | each other, the Summary check | `merged.md`, `names-<k>.md`, `highlights.md`, question files |
| C4 Verify | one `transcript-reader` per question file | the C3 stages still running | `verify-<K>.md` |
| C5 Ledger | the Merge agent, resumed | nothing | the Ledger, dictionary rows |
| C6 Units | Units | nothing | pages files, stubs |
| C7 Write | page writers, Recap, Previously On | each other | Wiki pages, each checked |
| C8 Gate | you, with Audit and Close | each other | a clean touched-list check |

## Dispatch

Every dispatch is one `task` call written as below:

```
task({
  context: "Session <N> Transcript ingest. The DM says: \"<words>\".",
  tasks: [
    {name: "S<N>Chunk01", agent: "transcript-reader", effort: "lo", solutionSpace: "Fixed procedure.", task: "<task text>"},
    {name: "S<N>Merge", effort: "med", solutionSpace: "Fixed procedure; judgement is yours.", task: "<task text>"}
  ]
})
```

- The task text is exactly the line its stage gives, values filled in. A sentence whose value is empty is dropped.
- `agent: "transcript-reader"` goes on each reader. Every other stage leaves `agent` out.
- Leave `tools` and `model` out. Every subagent inherits the built-in tools, `tools` names only eval-kernel tools, and the native reader brings its own model.
- Name each item `S<N><Stage><k>`. Its transcript is then at `history://<name>`.

`<transcript>` is `archive/<file>`, the Transcript's archive path from C0 on, which every stage reads and every `sources` list cites. `<summary>` is the Summary's archive path. `<work>` is the work directory C0 makes. `<recording>` is the recording's path, or each of its parts in order.

## Steps

### C0 Place

1. **Pair.** The Transcript Summary is the `raw/` or `archive/` file that contains both `## SUMMARY` and `## KEY DISCUSSION POINTS` and whose name is the Transcript's stem plus ` - Summary`. Failing that, it is the summary the DM named. Failing that, there is none. The recording is the audio the DM named, else the audio files in `raw/` or `archive/` whose names start with the Transcript's stem (one file, or its parts). Failing both, there is none.
2. **Number.** Decide the Session number `N` by the first of these that gives one:
   1. the DM's words;
   2. a number in the Transcript's filename (`session[-_ ]?0*(\d+)` or `episode[-_ ]?0*(\d+)`, case-insensitive);
   3. the earliest `Sessions/Session <M>/` folder holding a Prep whose Recap is missing or cites no Transcript in `sources`.

   A recording the DM calls a one-shot, or a story apart from the Campaign, is ingested as that story's Lore, with the story's name standing for `N`.
3. **Profile.** Run `work=$(mktemp -d)`, then `bun run cf -- transcript chunks <its current path> --words 3000 --json > $work/profile.json`. Small chunks give each reader fewer lines and let more readers run at once. The profile's `format` and `timestamps` say what the export is, markdown or CSV, timed or not. Exit 2 means the file is not a TranscribeX Transcript: ingest it by SKILL.md's ordinary steps instead.
4. **Archive copies.** Copy the Transcript and its Summary into `archive/` with `cp`, so every `sources` path exists from the first page a writer checks, and `mv` a recording in `raw/` to `archive/`. A file already in `archive/` stays where it is. SKILL.md step 11 removes the `raw/` copies.
5. **Detect.** With a recording and `timestamps: true`, start the laugh detector in the background (`async`), so it scores the audio while C1 and C2 run: `bun run cf -- transcript highlights <recording> --transcript <transcript> --top 20 --json > <work>/highlights.json`. Its first run installs the model and downloads its weights. Add `--clip-dir <dir>` when the DM asks for clips, with the folder the DM names. Without a recording or timestamps, the Session has no Laugh Highlights: note why for the report.

Done when `profile.json` and the archive copies exist, the detector is running or its absence has its reason, and you hold `N` with the rule that decided it and the Summary's path or `none`.

### C1 Brief

Dispatch in one batch the Brief and, when there is a Summary, the Summary check:

```
Read skill://ingest/references/ledger.md, then write the brief for Session <N> in <work>. Transcript: <transcript>. The DM says: "<words>".
```

```
Read skill://ingest/references/ledger.md, then check the Summary <summary> against the Transcript <transcript>. Write: <work>/summary-check.md.
```

Done when the Brief has returned the brief's path. The Summary check runs on through C2 and C3.

### C2 Read

Dispatch one `transcript-reader` per chunk in `profile.json`, all in one batch, `effort: lo`:

```
Chunk mode. Brief: <work>/brief.md. Transcript: <transcript>. Lines <A>-<B>. Write: <work>/chunk-<NN>.md.
```

`<NN>` is the chunk's `n`, zero-padded to 2. A chunk file that is missing or breaks the reader's Chunk file format gets one redispatch. Done when every chunk has a file in that format, or has failed twice (the Merge then reads that range itself by the reader's rules).

### C3 Merge

Dispatch in one batch the Merge and one Names per run of three chunk files (chunks 1 to 3, 4 to 6, and so on), plus the Highlights once the detector has written `highlights.json` (dispatch it on its own when the detector finishes later):

```
Read skill://ingest/references/ledger.md, then merge the chunk files in <work> for Session <N>. Transcript: <transcript>.
```

```
Read skill://ingest/references/ledger.md, then resolve the names in <work>/chunk-<a>.md to <work>/chunk-<b>.md. Transcript: <transcript>. Write: <work>/names-<k>.md.
```

```
Read skill://ingest/references/ledger.md, then judge the laughs in <work>/highlights.json for Session <N>. Transcript: <transcript>. Write: <work>/highlights.md.
```

A detector that exits non-zero gives the Session no Laugh Highlights: keep its error for the report. Keep the Merge agent's id for C5. Done when the Merge, every Names and the Highlights (or the detector's error) have returned.

### C4 Verify

The C3 returns list Verify task lines, each with its question count. One reader answers at most 15 questions, and a dispatched question file has at least 4 unless the last C3 stage has returned. Dispatch a line as its return arrives when its file has four or more questions, one `transcript-reader` per line, `effort: lo`, without waiting for the other C3 stages. A file of three or fewer goes into the **pool** instead: append its question lines with `cat` to `<work>/verify-P<j>-in.md`, starting at `P1`. Dispatch the pool when it reaches four questions, or when the last C3 stage has returned, with the task line `Verify mode. Brief: <work>/brief.md. Transcript: <transcript>. Questions: <work>/verify-P<j>-in.md. Write: <work>/verify-P<j>.md.`, then start the next pool at `P<j+1>`. Done when every question sits in exactly one dispatched file and every Verify reader has returned.

### C5 Ledger

Once every C3 and C4 stage and the Summary check have returned, send the Merge agent by `agent://<id>`:

```
Finish the Ledger. Verify answers: <work>/verify-*.md paths. Names: <work>/names-*.md paths. Summary check: <work>/summary-check.md or none. Highlights: <work>/highlights.md or none.
```

Done when it has returned the Ledger path, the unresolved flags and the dictionary lines.

### C6 Units

Dispatch:

```
Read skill://ingest/references/units.md, then plan the units of the Session Ledger archive/<stem>.ledger.md for Session <N>. Work: <work>. Sources: <transcript>. The DM says: "<words>".
```

Done when it has returned its pages files, the new page titles and any dispatch it requests.

### C7 Write

Dispatch in one batch one page writer per pages file, the Recap writer and the Previously On writer, plus each `skill-writer` the Units stage requested. The Units stage seeded the Recap with a link to the Previously On, so both pages pass their checks from the start. A pages file holding pages of a kind whose design skill a requested `skill-writer` is making waits for that `skill-writer` to return, then goes out on its own.

```
Read skill://ingest/references/writer.md, then write the pages in <work>/pages-<k>.md from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>. The DM says: "<words>".
```

```
Read skill://ingest/references/writer.md, then write the Session <N> Recap from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>. Link these pages, which their own writers fill: <titles>.
```

```
Read skill://ingest/references/writer.md, then write the Session <N+1> Previously On from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>.
```

For a one-shot, dispatch only the page writers. Keep each writer's id for C8. Units gives each page to one pages file, so each page has one writer. A writer whose work needs a change on another writer's page returns the collision, and you pass it by message to that page's writer. Done when every writer has returned its pages, each checked clean, with its kept-out claims and its notes for the report.

### C8 Gate

The touched list is every path the writers returned. Write SKILL.md step 12's log entry for it now, since the audit reads its pages from that entry. Then dispatch in one batch the audit and the Close:

```
Read skill://audit, then audit the Ingest entry for <file>.
```

```
Read skill://ingest/references/writer.md, then close Session <N> from the Session Ledger archive/<stem>.ledger.md. Transcript: <transcript>. Touched: <touched-list paths>.
```

While they run, run SKILL.md step 10 over the touched list. Send each finding by `agent://<id>` to the writer whose pages file lists that page, quoting the finding. That writer still has the page in context: it repairs the finding and checks the page again before it replies. Findings on pages outside every pages file go to one `lint` dispatch for those pages, briefed as `skill://lint` sets out, together with each page request a stage returned for an unowned name, which that ladder's rung 3 gives its stub. When the audit and the Close return, add the paths they changed to the touched list and check those pages the same way. The audit logs its own fixes, and the Close's paths take one more step 12 entry. Done when step 10's criterion holds over the whole touched list.

Then do SKILL.md step 11, and step 13's index and full gate: its audit, Threads and `hot.md` are done. The step 14 report gathers every stage's return. Done when step 14's criterion holds.
