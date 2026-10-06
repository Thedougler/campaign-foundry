# Transcript

A Transcript is never read whole by the ingest run. Flash `transcript-reader` subagents read it in chunks into a line-cited **Session Ledger**, which this run checks and keeps in `archive/` beside the Transcript, and the Wiki is written from the Ledger. A speaker label is a hint, judged block by block. The **Transcript Summary** is an index of candidate events, never evidence. Misheard words go to the **TranscribeX Dictionary**.

## Steps

### T1 Pair and place

- The Transcript is the assigned file.
- Its Transcript Summary is the `raw/` or `archive/` file that contains both `## SUMMARY` and `## KEY DISCUSSION POINTS` and whose name is the Transcript's stem plus ` - Summary`. Failing that, it is the summary path named in the brief. Failing that, there is none.
- The Session number `N` is decided in this order:
  1. the DM's words in the brief;
  2. a number in the Transcript's filename (`session[-_ ]?0*(\d+)` or `episode[-_ ]?0*(\d+)`, case-insensitive);
  3. the earliest `Sessions/Session <M>/` folder holding a Prep whose Recap is missing or does not cite a Transcript in `sources`.
- Attendance is every PC of the Campaign unless the DM's words in the brief name an absent PC or Player. The DM states absences, and you take them from the DM's words alone.
- A recording the DM calls a one-shot, or a story apart from the Campaign, is ingested as that story's Lore, not as Session `N`. It still takes T2 to T8, with the story's name standing for `N`, and step 8 doesn't write Session records for it.

Done when you hold the Transcript, its Summary or `none`, `N` with the rule that decided it (for the report), and the attendance with the DM's words behind any absence.

### T2 Profile

Run `work=$(mktemp -d)`, then `bun run cf -- transcript chunks <transcript> --json > $work/profile.json`. Exit 2 means the file is not a TranscribeX Transcript: ingest it by the ordinary steps instead, from SKILL.md step 3. Done when `profile.json` holds the labels and chunks, or exit 2 has sent the file back to the ordinary steps.

### T3 Brief

Write `$work/brief.md`, at most about 3,000 words, with these sections:

- **Session:** the number N, the Campaign and the World.
- **Attendance:** present and absent PCs, with the DM's words quoted.
- **Labels:** found in `profile.json`, each marked `DM`, `PC <name>` or `unknown`.
- **PCs:** one line each from the PC page with name, pronouns, species, class and subclass, 4 to 8 signature features, and the spells and items that identify their actions. Add the Player's first name from the `**Player.**` bullet, for matching address only and never to be written anywhere.
- **With the party:** NPCs and companions in the Party's company, from `hot.md` and the last Recap.
- **Where we left off:** the previous Session's Recap `## At a glance` bullets and the last paragraph of `## What happened`.
- **Prep:** each Scene Chart row (title, kind), its Scene page's `## At a glance` turn line, and the NPCs and Creatures that Scene page links.
- **Vocabulary:** the union of `bun run cf -- context <page>` output over the Prep and each Scene page and over the previous Recap and `hot.md`, written as `name — type` lines. Add every `Target` in `transcribex-dictionary.csv` (when present). Add its enabled `Source → Target` rows as "known mishearings".

Done when every section is filled from the source this list gives it and the brief is within about 3,000 words.

### T4 Read

Dispatch one `transcript-reader` per chunk in `profile.json`, all in one `task` batch, `effort: lo`. Each task text is exactly the Chunk mode line from `.omp/agents/transcript-reader.md`:

```
Chunk mode. Brief: <work>/brief.md. Transcript: <path>. Lines <A>-<B>. Write: <work>/chunk-<NN>.md.
```

`<NN>` is the chunk's `n`, zero-padded to 2. When `task` cannot dispatch the native `transcript-reader` from inside a subagent, dispatch the same batch with `agent` omitted and `model: "zai/glm-5.3-flash"`, each task holding the reader's body (the output of `awk 'f>1; /^---$/ {f++}' .omp/agents/transcript-reader.md`, the file minus its frontmatter) followed by its task line. A chunk file that is missing or does not follow the format gets one redispatch. If it fails again, read that range yourself by the reader's rules and write its chunk file. Done when every chunk has a file in the reader's Chunk file format.

### T5 Merge

Read the chunk files in order and build the Ledger:

- Join a scene split across two chunks when the earlier chunk's `Open at` continues into the next chunk's first scene.
- Drop duplicate events (same lines).
- Merge the Names tables. One Canon per heard form. Disagreements become `NAME` flags.
- Build **Prep coverage**: one row per Prep Scene, with status `played`, `partial`, `not reached` or `unplanned`, and its lines.
- For each `not reached` Scene, `grep -n` the Transcript for its unique NPC and Creature names. A hit inside play becomes a `WHAT` flag.

Flags this step adds take ids `M-<k>`. Done when every chunk's events sit once in order, every heard form has one Canon or a `NAME` flag, and every Prep Scene has its coverage row.

### T6 Verify

- **Summary check** (skip it when there is no Summary): each statement under `## SUMMARY`, `## KEY DISCUSSION POINTS` and `## DECISIONS MADE` is a candidate. Mark it:
  - `supported` with the Ledger lines;
  - `contradicted` with the lines;
  - `not play` with the lines, when the lines it rests on are table talk, plans or another game's lore by the reader's Play rules;
  - otherwise `grep -n` its names in the Transcript and add a `WHAT` flag with the hits, id `S-<k>`. With no hits, mark it `unsupported`.

  `## OPEN QUESTIONS / RISKS` and `## ACTION ITEMS` are plans and questions, never events. A Summary statement never enters the Wiki on its own authority.
- Batch every flag (the chunks', T5's and the Summary's) into `$work/verify-<K>-in.md` files of at most 15 questions, one flag line each in the reader's Flags format. Dispatch one Verify-mode `transcript-reader` per file in one batch, by T4's route. Each task text is `Verify mode. Brief: <work>/brief.md. Transcript: <path>. Questions: <work>/verify-<K>-in.md. Write: <work>/verify-<K>.md.` Apply each answer to what its flag questioned:
  - `WHO` sets the event's who.
  - `NAME` sets the heard form's Canon.
  - `WHAT` adds or drops the event, or sets the Summary statement's mark.
- A flag still `unresolved` keeps its claim out of the Wiki and is quoted in the report.

Done when every Summary statement has its mark and every flag is resolved and applied or listed as unresolved.

### T7 Ledger

Write `archive/<transcript stem>.ledger.md`:

- `# Session <N> Ledger`
- a header list giving the Transcript path and its lines/blocks/words; Summary path or `none`; Attendance; chunk count; verify count
- `## Scenes`: the merged scenes in order and in the chunk event format, with all line refs kept
- `## Prep coverage`: a table
- `## Summary check`: a table, or `No Summary.`
- `## Names`
- `## New names`: each with its resolution
- `## Unresolved flags`
- `## Ends`: where the recording stops

`archive/` is gitignored, and QMD's `archive` collection indexes the Ledger. Done when the Ledger has every section in this order and every event keeps its line refs.

### T8 Dictionary

- Pipe the Ledger's `asr` Names rows as `heard<TAB>canon` to `bun run cf -- transcript dictionary -`.
- Keep its output for the report.
- `table` rows, and any heard form that a page already lists in `aliases`, never go to the dictionary. A heard form that `bun run cf -- context -` matches when piped in is already a page's name or alias.
- A misheard form never becomes an `aliases` entry or a cspell word. A `table` nickname spoken in-fiction may become an alias only through the Names ladder.

Done when every `asr` row has its `added`, `added-disabled`, `duplicate`, `conflict` or `same` line saved for the report.

## Back to SKILL.md

Then return to SKILL.md step 4. From there on, the Ledger stands for the file wherever a step reads the file's words:

- Step 4 runs `cf context` on the Ledger.
- Step 5 claims:
  - PLAY, RULING and STATE events are played.
  - SAID is the speaker's claim.
  - MOMENT feeds only the Previously On.
- `sources` lists the Transcript's archive path, never the Ledger or the Summary.
