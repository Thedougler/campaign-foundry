# Ledger stages

You do one stage of building the **Session Ledger** for one Transcript: the line-cited record of what happened in its Session, which every later stage of the ingest writes the Wiki from. The top-level orchestrator runs the stages by [transcript.md](transcript.md), and your task text names your branch, one of [Brief](#brief), [Summary check](#summary-check), [Merge](#merge), [Names](#names) and [Finish](#finish). Flash `transcript-reader` agents read the Transcript in chunks and answer verify questions. A speaker label is a hint, judged block by block. The **Transcript Summary** is an index of candidate events, never evidence. Misheard words go to the **TranscribeX Dictionary**. You read the Transcript itself only at the lines a step names.

The Speaker rules, Play rules and Names kinds in `.omp/agents/transcript-reader.md` bind every branch here: read them before your first step. Your branch is your whole task. Where it needs reader agents, it writes their question files and returns their task lines, and the orchestrator dispatches them. `<work>` is the work directory your task text gives.

## Brief

Task text: `Read skill://ingest/references/ledger.md, then write the brief for Session <N> in <work>. Transcript: <transcript>. The DM says: "<words>".`

Write `<work>/brief.md`, at most about 3,000 words. The Wiki may stand later than Session N (a backfill) or earlier. Either way, the brief describes the table as Session N began. `hot.md` describes the Wiki's present and feeds only the Vocabulary. Read the source pages in one round of parallel reads. They are the PC pages and the NPC page of each guest label, Session N−1's Recap and Session N's Prep with its Scene pages, plus `hot.md`, `transcribex-dictionary.csv` and `<work>/profile.json`. Read the pages those name for the Vocabulary in a second round. The sections:

- **Session:** the number N, the Campaign and the World.
- **Absent:** only when the DM's words state an absent PC or Player: each absent PC, with the DM's words quoted. Leave the section out otherwise.
- **Labels:** found in `profile.json`, each marked `DM`, `PC <name>`, `guest <name>` or `unknown`. A label that is the name of a character with an NPC page and no PC page is a guest Player playing that NPC as a **Guest character** (`CONTEXT.md`). Mark it `guest <NPC page title>`.
- **Real names:** a whole copy of the **Real names** list in `user-config.md` `## Table`, which pairs each real name or nickname with the name that replaces it.
- **PCs:** one line each, copied from that PC's page: name, pronouns, species, class and subclass, 4 to 8 signature features, and the spells and items that identify their actions. An item goes on a PC's line only when that PC's page lists it. Give each Guest character a line too, copied from its NPC page in the same way. End each line with the page path it came from.
- **With the party:** NPCs and companions in the Party's company at the end of Session N−1, from Session N−1's Recap.
- **Where we left off:** Session N−1's Recap `## At a glance` bullets and the last paragraph of `## What happened`. With no Recap for Session N−1, use the latest Recap before Session N, else Session N's Prep opening.
- **Prep:** each Scene Chart row (title, kind), its Scene page's `## At a glance` turn line, and the NPCs and Creatures that Scene page links.
- **Vocabulary:** one `name — type — path — aliases` line for every in-world name that `hot.md` or the pages this brief draws from write, linked or plain. Write each under its page's title, as you judge it on reading (`terror-birds` in `hot.md` is the Terror-Bird). Add every `Target` in `transcribex-dictionary.csv` (when present), and add its enabled `Source → Target` rows as "known mishearings".

Return the brief's path. Done when every section is filled from the source this list gives it, every fact on each PC and Guest character line appears on the page that line cites, and the brief is within about 3,000 words.

## Summary check

Task text: `Read skill://ingest/references/ledger.md, then check the Summary <summary> against the Transcript <transcript>. Write: <work>/summary-check.md.`

Each statement under `## SUMMARY`, `## KEY DISCUSSION POINTS` and `## DECISIONS MADE` is a candidate event. `## OPEN QUESTIONS / RISKS` and `## ACTION ITEMS` are plans and questions, never events, so they take no row. For each candidate, find where play would show it. Search the Transcript with `grep -n` for its names and for their known mishearings in `transcribex-dictionary.csv` and words that sound like them. Read each hit with 20 lines on each side by the reader's Play rules. Mark it:

- `supported`, with the lines that show it;
- `contradicted`, with the lines and what they say instead;
- `not play`, with the lines, when they hold table talk, plans, another game's lore or the DM's recap of an earlier Session;
- `unsupported`, with the searches run, when no passage shows it.

Write `<work>/summary-check.md` as one table, `| # | Statement | Mark | Lines | Note |`, each statement quoted from the Summary with any real name on `user-config.md`'s **Real names** list replaced. A Summary statement never enters the Wiki on its own authority. Return the file's path and the count of each mark. Done when every candidate statement has one mark, and every mark but `unsupported` cites lines you read.

## Merge

Task text: `Read skill://ingest/references/ledger.md, then merge the chunk files in <work> for Session <N>. Transcript: <transcript>.`

Read `<work>/brief.md`, then every `<work>/chunk-<NN>.md` in order. Write `<work>/merged.md` with the scenes in the chunk event format first, **Prep coverage** next and your flags last. The readers copied each line ref from their read output. Keep the refs as written, and read the Transcript only where two chunks cite different lines for one event, and for the not-reached check below.

- Join a scene split across two chunks when the earlier chunk's `Open at` continues into the next chunk's first scene.
- Drop duplicate events (same lines).
- Check each PLAY and STATE event that mentions a feature, spell or item against the actor's line in the brief. When the brief gives it to another PC (Deflect Attacks credited to Perrin when Crissdalynn's line lists it), the event becomes a `WHO` flag that gives the PC whose line lists it.
- Keep each Guest character's events as a PC's.
- Build **Prep coverage**: one row per Prep Scene, with status `played`, `partial`, `not reached` or `unplanned`, and the lines of the scenes that played it. A reader's `Prep:` hint is a guess to confirm against that scene's events. A scene whose events show neither the Prep Scene's place nor its people is `unplanned` and gets its own row. A Prep Scene that play never reached is `not reached`, an ordinary outcome: the DM skips planned Scenes, and the Players take unplanned paths.
- For each `not reached` Scene, confirm that play left it out. Read the merged scenes for its place, people and turn under any name. Use `grep -n` on the Transcript for its NPCs' and Creatures' names and their known mishearings only as a list of places to read, and read each hit in context. A passage you judge to be play of that Scene becomes a `WHAT` flag.

Flags this branch adds take ids `M-<k>`, each quoting the lines' own words. Write every chunk `WHO` and `WHAT` flag and every `M-` flag into `<work>/verify-M<K>-in.md` files of at most 15 questions, one flag line each in the reader's Flags format. The chunks' `NAME` flags go to the Names branch. Return the path of `merged.md` and one task line per question file, `Verify mode. Brief: <work>/brief.md. Transcript: <transcript>. Questions: <work>/verify-M<K>-in.md. Write: <work>/verify-M<K>.md.`. The orchestrator later sends you the [Finish](#finish) instruction, and you carry on from this context.

Done when every chunk's events sit once in order in `merged.md`, each feature, spell and item an event mentions matches its actor's line or has a `WHO` flag, every Prep Scene has its coverage row, and every `WHO` and `WHAT` flag sits in a question file.

## Names

Task text: `Read skill://ingest/references/ledger.md, then resolve the names in <work>/chunk-<a>.md to <work>/chunk-<b>.md. Transcript: <transcript>. Write: <work>/names-<k>.md.`

Read `<work>/brief.md`, then your chunk files' `## Names` and `## New names` tables and `NAME` flags. The brief's Vocabulary lists the names around Session N, so a heard form missing from it can still have a page anywhere in the Wiki. Resolve every heard form in them:

1. **Vocabulary.** A heard form whose Canon is a Vocabulary title or alias takes that line's path.
2. **Files.** For each heard form left, glob `wiki/**/*<word>*.md` for each word of it and of the spellings that sound like it, and search `wiki/` with `grep` for `aliases` lines holding them. This finds a page by title or alias that a QMD search can miss.
3. **QMD.** Search QMD's `wiki` collection by `skill://qmd`, with a `lex` sub-query on the heard words and their sound-alike spellings and a `vec` or `hyde` sub-query on what play shows of the thing ("large ostrich-like bird watching from the treeline").
4. **Judge.** Read each candidate page's title, `aliases`, `summary` and `## At a glance`, and judge sound and description together. The Canon is the page whose name sounds like the heard form and whose subject fits what play shows. "Pharaoh bird" is the Terror-Bird. A port "GalReno" where Alys Kuiper went ashore is Calveno, where her page has her land.

Write `<work>/names-<k>.md` as one table, `| Heard | Canon | Page | Lines | Kind | Settled by |`. **Page** is the owner page's path, or `none` with the queries that found none. **Kind** follows the reader's Names kinds. A wrong hearing is `asr` and a nickname the table says is `table`. A correct short form, first name or title of a Canon name ("Felix" for Felix Aho) takes no row. When two candidates fit equally, write a `NAME` flag with both, id `N<k>-<j>`, quoting the line's words, into `<work>/verify-N<k>-in.md`. Return the names file's path and, when it has flags, the task line `Verify mode. Brief: <work>/brief.md. Transcript: <transcript>. Questions: <work>/verify-N<k>-in.md. Write: <work>/verify-N<k>.md.`. Done when every heard form in your chunk files has a page, `none` after all four steps, or a `NAME` flag.

## Finish

The orchestrator's message: `Finish the Ledger. Verify answers: <paths>. Names: <paths>. Summary check: <path or none>.`

1. **Answers.** Apply each Verify answer to what its flag questioned, at the flag's own lines. `WHO` sets the event's who, `NAME` sets the heard form's Canon and page, and `WHAT` adds or drops the event. An answer whose lines fall outside its flag's range counts as `unresolved`, and so does a question the answers file leaves out. A flag still `unresolved` keeps its claim out of the Wiki. Done when every flag is applied at lines inside its range or listed as unresolved.
2. **Names.** Merge the names files into one table. A heard form with two Canons at different lines (an ASR garble of Catarina at one line, a name the table coins for a new character at another) keeps a row for each, both marked `split`. Done when every heard form has one row per Canon.
3. **Ledger.** Write `archive/<transcript stem>.ledger.md`:
   - `# Session <N> Ledger`
   - a header list giving the Transcript path and its lines/blocks/words; Summary path or `none`; the brief's `Absent:` line when it has one; each Guest character; chunk count; verify count
   - `## Scenes`: the merged scenes in order and in the chunk event format, with all line refs kept
   - `## Prep coverage`: a table
   - `## Summary check`: the Summary check's table, or `No Summary.`
   - `## Names`: `| Heard | Canon | Page | Lines | Kind |`
   - `## New names`: each with its resolution and page
   - `## Unresolved flags`
   - `## Ends`: where the recording stops

   `archive/` is gitignored, and QMD's `archive` collection indexes the Ledger. Done when the Ledger has every section in this order, every event keeps its line refs, and `grep -niw` for each real name on the brief's **Real names** list matches nothing in the Ledger.
4. **Dictionary.** Pipe the Ledger's `asr` Names rows as `heard<TAB>canon` to `bun run cf -- transcript dictionary -`, and keep its output for the report. `table` rows, `split` rows and any heard form that a page lists in `aliases` stay out of the dictionary. A misheard form never becomes an `aliases` entry or a cspell word. A `table` nickname spoken in-fiction may become an alias only through the Names ladder. Done when every `asr` row has its `added`, `added-disabled`, `duplicate`, `conflict` or `same` line saved for the report.
5. **Return** the Ledger path, each unresolved flag quoted with its lines, and the dictionary output lines. Done when the return gives each of these.
