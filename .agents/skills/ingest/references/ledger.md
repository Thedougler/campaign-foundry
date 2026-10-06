# Ledger stages

You do one stage of building the **Session Ledger** for one Transcript: the line-cited record of what happened in its Session, which every later stage of the ingest writes the Wiki from. The top-level orchestrator runs the stages by [transcript.md](transcript.md), and your task text names your branch, one of [Brief](#brief), [Summary check](#summary-check), [Merge](#merge), [Names](#names), [Highlights](#highlights) and [Finish](#finish). Flash `transcript-reader` agents read the Transcript in chunks and answer verify questions. A speaker label is a hint, judged block by block. The **Transcript Summary** is an index of candidate events, never evidence. Misheard words go to the **TranscribeX Dictionary**. You read the Transcript itself only at the lines a step names.

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

Read `<work>/brief.md`, then every `<work>/chunk-<NN>.md` in order. Write `<work>/merged.md` with the scenes in the chunk event format first, **Prep coverage** next and your flags last. The readers copied each line ref from their read output. Keep the refs as written, and read the Transcript only where two chunks cite different lines for one event, where `transcript cites` below proposes a move, and for the not-reached check below.

- Join a scene split across two chunks when the earlier chunk's `Open at` continues into the next chunk's first scene.
- Drop duplicate events (same lines).
- Check each PLAY and STATE event that mentions a feature, spell or item against the actor's line in the brief. When the brief gives it to another PC (Deflect Attacks credited to Perrin when Crissdalynn's line lists it), the event becomes a `WHO` flag that gives the PC whose line lists it.
- Keep each Guest character's events as a PC's.
- Read the last scene by the reader's Play rules. When its events are the table winding down, drop it, and let the last chunk's `Open at` name the last in-world event.
- Build **Prep coverage**: one row per Prep Scene, with status `played`, `partial`, `not reached` or `unplanned`, and the lines of the scenes that played it. A reader's `Prep:` hint is a guess to confirm against that scene's events. A scene whose events show neither the Prep Scene's place nor its people is `unplanned` and gets its own row. A Prep Scene that play never reached is `not reached`, an ordinary outcome: the DM skips planned Scenes, and the Players take unplanned paths.
- For each `not reached` Scene, confirm that play left it out. Read the merged scenes for its place, people and turn under any name. Use `grep -n` on the Transcript for its NPCs' and Creatures' names and their known mishearings only as a list of places to read, and read each hit in context. A passage you judge to be play of that Scene becomes a `WHAT` flag.

Then check every line ref: run `bun run cf -- transcript cites <transcript> <work>/merged.md`. It tests each quote and heard name against the blocks its line ref cites and proposes, for each that is not there, the nearest blocks where it is (`moved`) or none (`missing`). It proposes and you decide: read the cited lines and each proposed line, then re-anchor the event to the block containing its words, or, for a quote found nowhere, quote the cited block word for word or flag the event `WHAT`. Run it again until its `checked` row shows every ref matching, apart from the refs you read and kept with a reason you give in your return.

Flags this branch adds take ids `M-<k>`, each quoting the lines' own words. Write every chunk `WHO` and `WHAT` flag and every `M-` flag into `<work>/verify-M<K>-in.md` files of at most 15 questions, one flag line each in the reader's Flags format. The chunks' `NAME` flags go to the Names branch. Return the path of `merged.md`, the last `checked` row, and one task line per question file, `Verify mode. Brief: <work>/brief.md. Transcript: <transcript>. Questions: <work>/verify-M<K>-in.md. Write: <work>/verify-M<K>.md.`. The orchestrator later sends you the [Finish](#finish) instruction, and you carry on from this context.

Done when every chunk's events sit once in order in `merged.md`, each feature, spell and item an event mentions matches its actor's line or has a `WHO` flag, every Prep Scene has its coverage row, every `WHO` and `WHAT` flag sits in a question file, and every quote and heard name in `merged.md` sits at a line `transcript cites` confirms or that you read and kept with a reason.

## Names

Task text: `Read skill://ingest/references/ledger.md, then resolve the names in <work>/chunk-<a>.md to <work>/chunk-<b>.md. Transcript: <transcript>. Write: <work>/names-<k>.md.`

Read `<work>/brief.md`, then your chunk files' `## Names` and `## New names` tables and `NAME` flags. The brief's Vocabulary lists the names around Session N, so a heard form missing from it can still have a page anywhere in the Wiki. Resolve every heard form in them:

1. **Vocabulary.** A heard form whose Canon is a Vocabulary title or alias takes that line's path.
2. **Files.** For each heard form left, glob `wiki/**/*<word>*.md` for each word of it and of the spellings that sound like it, and search `wiki/` with `grep` for `aliases` lines holding them. This finds a page by title or alias that a QMD search can miss.
3. **QMD.** Search QMD's `wiki` collection by `skill://qmd`, with a `lex` sub-query on the heard words and their sound-alike spellings and a `vec` or `hyde` sub-query on what play shows of the thing ("large ostrich-like bird watching from the treeline").
4. **Judge.** Read each candidate page's title, `aliases`, `summary` and `## At a glance`, and judge sound and description together. The Canon is the page whose name sounds like the heard form and whose subject fits what play shows. "Pharaoh bird" is the Terror-Bird. A port "GalReno" where Alys Kuiper went ashore is Calveno, where her page has her land.

Write `<work>/names-<k>.md` as one table under a `## Names` heading, `| Heard | Canon | Page | Lines | Kind | Settled by |`. **Page** is the owner page's path, or `none` with the queries that found none. **Kind** follows the reader's Names kinds. A wrong hearing is `asr` and a nickname the table says is `table`. A correct short form, first name or title of a Canon name ("Felix" for Felix Aho) takes no row. When two candidates fit equally, write a `NAME` flag with both, id `N<k>-<j>`, quoting the line's words, into `<work>/verify-N<k>-in.md`. Then run `bun run cf -- transcript cites <transcript> <work>/names-<k>.md`, read each heard form it proposes moving at its cited and proposed lines, and set **Lines** to where the form is spoken. Return the names file's path and, when it has flags, the task line `Verify mode. Brief: <work>/brief.md. Transcript: <transcript>. Questions: <work>/verify-N<k>-in.md. Write: <work>/verify-N<k>.md.`. Done when every heard form in your chunk files has a page, `none` after all four steps, or a `NAME` flag, and `transcript cites` finds each one at its **Lines** or you read the lines and kept them with a reason.

## Highlights

Task text: `Read skill://ingest/references/ledger.md, then judge the laughs in <work>/highlights.json for Session <N>. Transcript: <transcript>. Write: <work>/highlights.md.`

**Laugh Highlights** are the Session's biggest table laughs, measured from its recording. The detector, `bun run cf -- transcript highlights`, ranks laughter bursts by loudness and length and aligns each with the Transcript lines around it. It hears that people laughed, never why: the loudest laughs are often table talk. The laugh comes after the moment that caused it, in the lines before the laugh. Each highlight in the JSON gives its `rank`, `start`, `laugh_end`, the `laugh_line` it starts on and the `context` segments with their `lines`.

1. **Brief.** Read `<work>/brief.md` and the JSON. Done when you hold the brief's real-name list and each highlight's rank, laugh line and context lines.
2. **Judge** the highlights in rank order. For each, read its context lines in the Transcript. Then read back from its laugh line to the start of the bit, which is often minutes earlier. Read forward to its `laugh_end` as well. Judge it by the reader's Speaker rules and Play rules. A laugh is **play** when the line before it belongs to the fiction, such as a PC's deed or in-character speech, even with table talk mixed in. It is **table talk** when the bit has no in-world action anywhere. Highlights on one bit make one moment, kept under the better rank. Stop at seven play moments or at the last highlight. Done when every highlight up to the seventh play moment has a verdict resting on lines you read.
3. **Write** `<work>/highlights.md`. Its `## Moments` section has one line per play moment in the chunk event format, `- L<setup>–<laugh line> · MOMENT · laughter (laugh #<rank>, <start>) at <the concrete in-world action>: "<the line before the laugh, verbatim>"`, the quote's real names replaced by the brief's list. Its `## Table talk` section has one line per other highlight: `- laugh #<rank> · L<lines> · <what the table was laughing at, in a few words>`. Then run `bun run cf -- transcript cites <transcript> <work>/highlights.md` and re-anchor each quote it proposes moving. Done when every judged highlight has one line, and every quote sits at a line `transcript cites` confirms.
4. **Return** the file's path and the kept ranks. Done when the return gives both.

## Finish

The orchestrator's message: `Finish the Ledger. Verify answers: <paths>. Names: <paths>. Summary check: <path or none>. Highlights: <path or none>.`

1. **Answers.** Apply each Verify answer to what its flag questioned, at the flag's own lines. `WHO` sets the event's who, `NAME` sets the heard form's Canon and page, and `WHAT` adds or drops the event. An answer whose lines fall outside its flag's range counts as `unresolved`, and so does a question the answers file leaves out. A flag still `unresolved` keeps its claim out of the Wiki. Done when every flag is applied at lines inside its range or listed as unresolved.
2. **Not play.** Read each Summary check row marked `not play` against the scenes that cite any of its lines. Read those lines by the reader's Play rules. A scene of table talk leaves the scenes, its events with it, and an event resting on table talk leaves its scene. Done when every `not play` row's lines sit in no scene, or sit in one whose events you read and judged play, with the reason in your return.
3. **Laughs.** Put each MOMENT from the Highlights file into the scene whose lines contain it, in line order, where it takes the place of a reader's MOMENT on the same lines. Done when every kept laugh sits in one scene, or, where step 2 removed its lines as table talk, is named in your return with both readings.
4. **Names.** Merge the names files into one table. A heard form with two Canons at different lines (an ASR garble of Catarina at one line, a name the table coins for a new character at another) keeps a row for each, both marked `split`. Done when every heard form has one row per Canon.
5. **Ledger.** Write `archive/<transcript stem>.ledger.md`:
   - `# Session <N> Ledger`
   - a header list giving the Transcript path and its lines/blocks/words; Summary path or `none`; the brief's `Absent:` line when it has one; each Guest character; chunk count; verify count
   - `## Scenes`: the merged scenes in order and in the chunk event format, with all line refs kept
   - `## Prep coverage`: a table
   - `## Summary check`: the Summary check's table, or `No Summary.`
   - `## Names`: `| Heard | Canon | Page | Lines | Kind |`
   - `## New names`: each with its resolution and page
   - `## Unresolved flags`
   - `## Ends`: the last in-world event with its lines, then the line where the recording stops

   `archive/` is gitignored, and QMD's `archive` collection indexes the Ledger. Then run `bun run cf -- transcript cites <transcript> archive/<transcript stem>.ledger.md` and settle each row it proposes as the Merge does. Done when the Ledger has every section in this order, every event keeps its line refs, `## Ends` names an event from the last scene, `transcript cites` confirms every quote and heard name or you read the lines and kept them with a reason, and `grep -niw` for each real name on the brief's **Real names** list matches nothing in the Ledger.
6. **Dictionary.** Pipe the Ledger's `asr` Names rows as `heard<TAB>canon` to `bun run cf -- transcript dictionary -`, and keep its output for the report. `table` rows, `split` rows and any heard form that a page lists in `aliases` stay out of the dictionary. A misheard form never becomes an `aliases` entry or a cspell word. A `table` nickname spoken in-fiction may become an alias only through the Names ladder. Done when every `asr` row has its `added`, `added-disabled`, `duplicate`, `conflict` or `same` line saved for the report.
7. **Return** the Ledger path and each unresolved flag quoted with its lines. Add the last `checked` row with each ref you kept and why. Add the kept laughs with their ranks and lines, and the dictionary output lines. Done when the return gives each of these.
