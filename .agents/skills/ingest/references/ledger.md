# Ledger builder

You build the **Session Ledger** for one Transcript: the line-cited record of what happened in its Session, which every later stage of the ingest writes the Wiki from. Flash `transcript-reader` subagents read the Transcript in chunks, you merge, check and verify what they write, and you keep the Ledger in `archive/` beside the Transcript. A speaker label is a hint, judged block by block. The **Transcript Summary** is an index of candidate events, never evidence. Misheard words go to the **TranscribeX Dictionary**. You read the Transcript itself only at the lines a step names.

Your brief gives the Transcript, its Summary when there is one, and the DM's words. Work through T1 to T10 in order, then yield.

## Steps

### T1 Pair and place

- The Transcript is the assigned file.
- Its Transcript Summary is the `raw/` or `archive/` file that contains both `## SUMMARY` and `## KEY DISCUSSION POINTS` and whose name is the Transcript's stem plus ` - Summary`. Failing that, it is the summary path named in the brief. Failing that, there is none.
- The Session number `N` is decided in this order:
  1. the DM's words in the brief;
  2. a number in the Transcript's filename (`session[-_ ]?0*(\d+)` or `episode[-_ ]?0*(\d+)`, case-insensitive);
  3. the earliest `Sessions/Session <M>/` folder holding a Prep whose Recap is missing or does not cite a Transcript in `sources`.
- Every PC of the Campaign was at the table. The DM states any absence before ingest, so an absent PC or Player comes only from the DM's words in the brief.
- A recording the DM calls a one-shot, or a story apart from the Campaign, is ingested as that story's Lore, not as Session `N`. It still takes T2 to T10, with the story's name standing for `N`.

Done when you hold the Transcript, its Summary or `none`, `N` with the rule that decided it, and the DM's words.

### T2 Profile

Run `work=$(mktemp -d)`, then `bun run cf -- transcript chunks <transcript> --json > $work/profile.json`. Exit 2 means the file is not a TranscribeX Transcript: yield that. The ingest run then takes it by the ordinary steps. Done when `profile.json` holds the labels and chunks, or you have yielded exit 2.

### T3 Brief

Write `$work/brief.md`, at most about 3,000 words. The Wiki may stand later than Session N (a backfill) or earlier. Either way, the brief describes the table as Session N began. `hot.md` describes the Wiki's present and feeds only the Vocabulary. The sections:

- **Session:** the number N, the Campaign and the World.
- **Absent:** only when the DM's words state an absent PC or Player: each absent PC, with the DM's words quoted. Leave the section out otherwise.
- **Labels:** found in `profile.json`, each marked `DM`, `PC <name>` or `unknown`.
- **PCs:** one line each, copied from that PC's page: name, pronouns, species, class and subclass, 4 to 8 signature features, and the spells and items that identify their actions. An item goes on a PC's line only when that PC's page lists it. Add the Player's first name from the `**Player.**` bullet, for matching address only and never to be written anywhere else. End each line with the page path it came from.
- **With the party:** NPCs and companions in the Party's company at the end of Session N−1, from Session N−1's Recap.
- **Where we left off:** Session N−1's Recap `## At a glance` bullets and the last paragraph of `## What happened`. With no Recap for Session N−1, use the latest Recap before Session N, else Session N's Prep opening.
- **Prep:** each Scene Chart row (title, kind), its Scene page's `## At a glance` turn line, and the NPCs and Creatures that Scene page links.
- **Vocabulary:** one `name — type` line with its page's `aliases` for every in-world name that `hot.md` or the pages this brief draws from write, linked or plain. Write each under its page's title, as you judge it on reading (`terror-birds` in `hot.md` is the Terror-Bird). Add every `Target` in `transcribex-dictionary.csv` (when present). Add its enabled `Source → Target` rows as "known mishearings".

Done when every section is filled from the source this list gives it, every fact on each PC line appears on the page that line cites, and the brief is within about 3,000 words.

### T4 Read

Dispatch one `transcript-reader` per chunk in `profile.json`, all in one `task` batch, `effort: lo`. Each task text is exactly the Chunk mode line from `.omp/agents/transcript-reader.md`:

```
Chunk mode. Brief: <work>/brief.md. Transcript: <path>. Lines <A>-<B>. Write: <work>/chunk-<NN>.md.
```

`<NN>` is the chunk's `n`, zero-padded to 2. When `task` cannot dispatch the native `transcript-reader`, dispatch the same batch with `agent` omitted and `model: "zai/glm-5.3-flash"`, each task holding the reader's body (the output of `awk 'f>1; /^---$/ {f++}' .omp/agents/transcript-reader.md`, the file minus its frontmatter) followed by its task line. A chunk file that is missing or does not follow the format gets one redispatch. If it fails again, read that range yourself by the reader's rules and write its chunk file. Done when every chunk has a file in the reader's Chunk file format.

### T5 Merge

Read the chunk files in order and build the Ledger:

- Join a scene split across two chunks when the earlier chunk's `Open at` continues into the next chunk's first scene.
- Drop duplicate events (same lines).
- Merge the Names tables. One Canon per heard form. Disagreements become `NAME` flags.
- Check each PLAY and STATE event that mentions a feature, spell or item against the actor's PC line in the brief. When the brief gives it to another PC (Deflect Attacks credited to Perrin when Crissdalynn's line lists it), the event becomes a `WHO` flag that gives the PC whose line lists it.
- People at the table appear only as their PC's name or "the DM". Drop every heard form, row or note that holds a Player's name or nickname, and write `Player nickname, omitted` where a row needs a placeholder. The note names nobody.
- Build **Prep coverage**: one row per Prep Scene, with status `played`, `partial`, `not reached` or `unplanned`, and the lines of the scenes that played it. A reader's `Prep:` hint is a guess to confirm against that scene's events. A scene whose events show neither the Prep Scene's place nor its people is `unplanned` and gets its own row. A Prep Scene that play never reached is `not reached`, an ordinary outcome: the DM skips planned Scenes, and the Players take unplanned paths.
- For each `not reached` Scene, confirm that play left it out. Read the Ledger's scenes for its place, people and turn under any name. Use `grep -n` on the Transcript for its NPCs' and Creatures' names and their known mishearings only as a list of places to read, and read each hit in context. A passage you judge to be play of that Scene becomes a `WHAT` flag.

Flags this step adds take ids `M-<k>`. Done when every chunk's events sit once in order, every heard form has one Canon or a `NAME` flag, each feature, spell and item an event mentions matches its actor's PC line or carries a `WHO` flag, and every Prep Scene has its coverage row.

### T6 Names

The brief's Vocabulary lists the names around Session N, so a heard form missing from it can still have a page anywhere in the Wiki. Resolve every New names row, and every Names row whose Canon is no page title or alias, against the whole Wiki:

1. Search QMD's `wiki` collection by `skill://qmd`. Send a `lex` sub-query on the heard words and on spellings that sound like them, and a `vec` or `hyde` sub-query on what play shows of the thing ("large ostrich-like bird watching from the treeline").
2. Read each candidate page the hits name: its title, `aliases`, `summary` and `## At a glance`.
3. Judge sound and description together. The Canon is the page whose name sounds like the heard form and whose subject fits what play shows ("pharaoh bird" is the Terror-Bird). Record a settled mishearing as an `asr` Names row, and a word the table really says for it as a `table` row. When two candidates fit equally, write a `NAME` flag with both.

Done when every heard form has a page title as its Canon, a `NAME` flag, or `no Canon page` with the queries that found none.

### T7 Verify

- **Summary check** (skip it when there is no Summary): each statement under `## SUMMARY`, `## KEY DISCUSSION POINTS` and `## DECISIONS MADE` is a candidate. Mark it:
  - `supported` with the Ledger lines;
  - `contradicted` with the lines;
  - `not play` with the lines, when the lines it rests on are table talk, plans or another game's lore by the reader's Play rules;
  - otherwise find where play would show it. Read the Ledger scenes nearest its subject, and use `grep -n` on its names and their known mishearings in the Transcript only as a list of places to read. Add a `WHAT` flag, id `S-<k>`, with the lines your reading found as its range, for the Verify readers. Mark it `unsupported` when neither the Ledger nor the passages you read show the event, or when the Verify answer finds it absent.

  `## OPEN QUESTIONS / RISKS` and `## ACTION ITEMS` are plans and questions, never events. A Summary statement never enters the Wiki on its own authority.
- Batch every flag (the chunks', T5's, T6's and the Summary's) into `$work/verify-<K>-in.md` files of at most 15 questions, one flag line each in the reader's Flags format. Dispatch one Verify-mode `transcript-reader` per file in one batch, by T4's route. Each task text is `Verify mode. Brief: <work>/brief.md. Transcript: <path>. Questions: <work>/verify-<K>-in.md. Write: <work>/verify-<K>.md.` Apply each answer to what its flag questioned, at the flag's own lines:
  - `WHO` sets the event's who.
  - `NAME` sets the heard form's Canon.
  - `WHAT` adds or drops the event, or sets the Summary statement's mark.
- An answer whose lines fall outside its flag's range counts as `unresolved`.
- A flag still `unresolved` keeps its claim out of the Wiki and is quoted in the report.

Done when every Summary statement has its mark and every flag is resolved and applied at lines inside its range, or listed as unresolved.

### T8 Ledger

Write `archive/<transcript stem>.ledger.md`:

- `# Session <N> Ledger`
- a header list giving the Transcript path and its lines/blocks/words; Summary path or `none`; the brief's `Absent:` line when it has one; chunk count; verify count
- `## Scenes`: the merged scenes in order and in the chunk event format, with all line refs kept
- `## Prep coverage`: a table
- `## Summary check`: a table, or `No Summary.`
- `## Names`
- `## New names`: each with its resolution
- `## Unresolved flags`
- `## Ends`: where the recording stops

`archive/` is gitignored, and QMD's `archive` collection indexes the Ledger. Done when the Ledger has every section in this order, every event keeps its line refs, and `grep -niw` for each Player first name in the brief matches nothing in the Ledger.

### T9 Dictionary

- Pipe the Ledger's `asr` Names rows as `heard<TAB>canon` to `bun run cf -- transcript dictionary -`.
- Keep its output for the report.
- `table` rows, and any heard form that T6 found in a page's `aliases`, never go to the dictionary.
- A misheard form never becomes an `aliases` entry or a cspell word. A `table` nickname spoken in-fiction may become an alias only through the Names ladder.

Done when every `asr` row has its `added`, `added-disabled`, `duplicate`, `conflict` or `same` line saved for the report.

### T10 Yield

Yield the Ledger path, `N` with its rule (for a one-shot, the story's name in its place), the Summary path or `none`, `$work`, each unresolved flag quoted with its lines, and the T9 output lines. Done when the yield contains each of these.
