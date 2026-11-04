---
name: lint
description: Lint — bring a slice of Wiki pages to zero findings under `bun run cfcli -- check`, after Ingest, after Prep, after page create, or after page move; also when the DM asks to lint.
---

# Lint

Lint ends on a **clean gate** over its **slice**, the pages it was given or picked: the page gate over those pages at `ok: 0 findings`, played Session records and heard Narration included. Every finding binds, warnings as much as errors. Canon sets the facts and the gate sets the form. Each repair keeps what every sentence asserts. Lint repairs existing pages in place and adds a page only as the stub step 4 calls for. It splits, deletes and merges none. Enriching a thin page is a separate `flesh-out` pass, which writes new facts into the page's sections for a Narration recast to use ([prose.md](prose.md) step 1). Resolve every uncertainty from the Wiki by searching QMD (`.omp/AGENTS.md` § Wiki access), reading the retrieved pages, and deciding.

**Every page is its own page.** Like a good book, the Wiki prints each paragraph once. A sentence repeated across pages is **boilerplate**: replace it with facts found only on that page. Each callout then describes its own subject in its own words. Converted published text is the one exception, by its provenance ([Whole Wiki](#whole-wiki) **Converter output**).

## Steps

1. **Bind scope.** Resolve the active Campaign from `user-config.md` and the request. The slice is the pages the brief hands you. Those are an operation's touched pages (an Ingest's or Prep's, or a created or moved page with the pages linking it) or else the pages the DM lists or one [Whole Wiki](#whole-wiki) slice. The slice also takes in the stubs and linked pages its findings direct. A top-level request to lint the whole Wiki follows [Whole Wiki](#whole-wiki) instead. Bind every command in [Commands](#commands) to the slice's page paths. Read `docs/wiki-layout.md` for placement and the template of each page kind in the slice: `wiki/templates/<type>.md`, or `wiki/templates/<type> - <kind>.md` when the page's frontmatter has a `kind`.
2. **Work list.** Run the bound `bun run cfcli -- check` over the slice paths. Read its full output (the raw artifact, past any truncation) and list every finding, grouped by page. A slice with no findings is clean as found: reply that it passed untouched and skip the log.
3. **Repair.** Repair every finding on each work-list page yourself by [Repairs](#repairs), [Names](#names) and [prose.md](prose.md), one page at a time, and keep each recast's before/after pair for step 5. Pages that link one another form a group, since echo compares across links, and so do the sharers of one `boilerplate` sentence, since their recasts must differ from one another. Repair a group's pages one after another. Each recast then starts from its neighbours' finished wording. An edit a repair needs on another page is step 4's.
4. **Other pages.** Make each edit a repair needs on another page: regenerate the index with `index` and set an alias. Add the inbound link for an orphan, and make a **stub** for an `unresolved` link whose page doesn't exist or a rung 3 name ([Names](#names)):
   - **Shape.** Create it from its template with every frontmatter key, every required `##` section and every callout, leaving out each `##` section whose guidance comment opens `Optional.`. Set `revealed` by `CONTEXT.md` **Revealed**, from the PC pages and Session records.
   - **Sources.** Fill each required heading and callout by the Sourcing order: the Wiki and `archive/` first (cite an archive file in `sources`), then the SRD and web sources the kind's design skill fetches. Every fact on a stub traces to one of them.
   - **Statblock.** A Creature's or NPC's statblock is a published one, taken whole by the Reuse or Reskin path of `statblock-design` step 3 and attributed in the page body as that step sets out. The Creature pages that run on an SRD statblock show the form.
   - **Unknowns.** Where the sources leave a required heading empty, write one sentence there saying what the records leave unestablished.
   - **Finish.** Run the bound check with `--fix` on the stub to strip the template's `%%` comments and empty `###` headings.

   Read the check of each page this step edited or created, and repair its findings by step 3.
5. **Review.** Test each pair against every [prose.md](prose.md) pair test, **Print grade** included. A pair that loses meaning or flattens the voice goes back through step 3, and each recast page's own check stays at `ok: 0 findings`.
6. **Log.** Run the bound log command with `--op lint`, a title that sums up the repairs, and one `--page` per touched page: every repaired page and created stub, and each index and moved page at its final path.
7. **Check.** Run the bound page gate over the slice, every page this run touched and the Campaign's `log.md`. Each page with a finding goes back to step 3, then step 6 for newly touched pages. When a recast cannot make a finding pass, its cause lies beyond the sentence; fix it at its source:
   - **Skill or template wording.** When a skill or template asks for the flagged wording, rewrite that text so it describes the passing form.
   - **Recast.** When each recast lost meaning or voice, recast from the ledger again with a new subject, verb and order ([prose.md](prose.md) step 2).
   - **Rule.** A rule changes only when it contradicts what the exemplar DMs do (ADR 0029), or when it misreads a sentence's literal meaning (a ship that is literally a ship). Only the DM switches a Vale rule off: put the rule, the sentence and its literal meaning to him (a subagent puts them in its return). Once he confirms, dispatch `coder` to extend the rule in `.vale/styles/Campaign/` and switch the upstream rule off in `.vale.ini`, then check again.

   The run ends on `ok: 0 findings`, apart from template wording [prose.md](prose.md) leaves standing and a finding whose rule change awaits the DM. Reply in a line or two with what was repaired, each cause fixed at its source, each stub with its stubbed sections, and each rule change awaiting the DM with its rule, sentence and literal meaning.

## Repairs

Each finding is repaired on its page by these rules, the `narration`, `style` and `boilerplate` findings by [prose.md](prose.md).

- **Mechanics.** A finding outside the `narration`, `style` and `boilerplate` layers (template, placement, links, orphans, statblock, mermaid, markdown, spelling, grammar, log, hot, index) is repaired against the templates and layout rules, moving existing content intact. `--fix` repairs the four layers [Commands](#commands) names, and `index` repairs an `index` finding. A finding in any layer whose flagged text is an in-world name or a rules term is settled by [Names](#names). Spelling is British English: a flagged common word takes its British form ("sabre", "rowing boat"). A `revealed` property that `--fix` added blank takes its value by `CONTEXT.md` **Revealed**, from the PC pages and Session records. An `unresolved` link whose page does not exist, and a name `invented-names` flags that Canon already uses elsewhere (found by a QMD search), each take a stub (step 4).
- **Retired shapes.** A `template` finding that opens `Deprecated` is a section-layout repair, never a prose recast: migrate the page by `docs/wiki-layout.md` **Retired shapes**. Move each fact into the section whose guidance asks for it, and remove the retired heading.
- **The DM's words.** On the DM's own or locked words, the repair is the smallest fix that keeps his words and meaning: punctuation, a sentence joined or split, formatting. The finding goes to him as a question only when no such fix exists.

## Names

A flagged word that is an in-world name or a rules term (`spelling` or `grammar` calls it unknown, or a `style` rule matches the name's own words) keeps its Canon spelling, and the gate learns it. Search the Wiki for it (a QMD `lex` query, a glob of its slug), then take the first rung that fits, in order:

1. **Misspelt Canon.** A Canon name spelt another way (the finding's "Did you mean", or a QMD search finds the page) whose referent is that page's subject: write the Canon spelling. Near names can belong to different subjects, so read the flagged text's context against the page first. A different referent goes on down the ladder.
2. **Owned.** A page has the name as its title or in `aliases`. Write that exact form, case included, or add each form the pages use to that page's `aliases`, one entry per form: a plural (`Grubnades`), another inflected form, a short form, a nickname or an epithet.
3. **Unowned.** A name some template fits (a person, place, group, creature, item, god) that no page owns is a missing page, however briefly the text mentions it and however long it stood on the page before you. The run that meets the name makes its stub as step 4 does, re-reading the path just before it writes, since a sibling run may have made the page already. Ingest gives it a page through its Fill. A name an Ingest pages file lists as a `Coinage:` has been judged outside every template, so it takes rung 4.
4. **Coinage or rare word.** An in-world word or name outside every template (a month, a weekday, a word of an in-world tongue, an oath, an item's command word, the name a character gives a part of themselves) takes one line in `.cspell-words.txt` at the vault root (`wiki/`, or the bound `--vault`). So does a real-world word no dictionary in the gate has, spelt as a reference work prints it (`bodhran`, an Irish frame drum).
5. **Rules term.** A D&D rules or published-setting term: one line in `.cspell/dnd-terms.txt` at the repo root, in its group.

Page names and aliases count in every layer. Both cspell and Harper read them as words, and Harper never flags inside a linked name. The `style` layer swaps each for its kind's noun before Vale reads the page, and `invented-names` counts them as Canon. Only cspell and Harper read the word lists, so settle a `style` finding on a name on rungs 1 to 3. Each name is known in exactly one place: a page title or alias, `.cspell-words.txt` or `.cspell/dnd-terms.txt`. Rerun the page check and carry on with the work list.

## Whole Wiki

A slice is its paths plus each page its findings direct an edit to: the stub for an `unresolved` link or a rung 3 name, and the page an `orphans` finding's hint says to link from. The run makes those edits itself, re-reading each such page just before editing it, since a sibling slice may have made or changed it, and fills a stub a sibling already made. Each such page joins the run's page gate and log.

The top-level run the DM asks to lint the Wiki runs the full gate, `bun run cfcli -- check` with no paths. Read its whole output and group the flagged pages into slices. Gather each `boilerplate/shared-line` cluster first: a flagged page with every sharer its findings cite, and the sharers of those sharers. Each cluster goes whole into one slice, since a pair split across concurrent slices leaves each slice a stale work list. Then cut the other flagged pages into small slices of pages that link one another. Dispatch one fresh `lint` subagent per slice through `task`, briefed with this skill and its slice paths alone. When the slices return, run the full gate again and slice what it still flags.

**Converter output.** Complete pages a deterministic converter wrote (`cfcli convert-items`, `cfcli convert-spells`, `cfcli convert-creatures` and later converters) that no run is otherwise editing carry every mechanical fact their 5e.tools source holds, and each lists its source corpus in `sources`. A line that matches a line of that corpus exactly is exempt from `style`, `grammar` and `boilerplate/shared-line`. A line the converter changed in any way (spelling, spacing, table layout, scaling labels, punctuation) gates normally. The `statblock` layer also exempts derived-number comparisons on proved numeric entry and scalar lines, while schema, missing-field and format checks still apply. For a multiline description, every non-blank content line must match, and its block header does not count. Every other line gates normally, so repetition between agent-written lines is still caught.

Their findings are evidence about the converter or the gate's rules, and they take one review in place of per-page repair. Run one bulk check over the batch and cluster its findings by rule, each with its count and two or three quoted examples. A `template`, `markdown` or other structural cluster is a converter defect: dispatch `coder` with the script fix, then rerun the batch. For a `style` or `grammar` cluster, judge whether the rule matches falsely there, applies only optionally or reports too severely, and propose the rule change to the DM by step 7 **Rule**. The change is a literal-meaning extension for a false match and a narrower scope or level for the other two. Edit a converted page only for a wrong or missing fact. A `cfcli convert-creatures` batch skips that bulk review ([ADR 0044](../../../docs/adr/0044-creatures-are-their-statblock.md)), and the run that later touches one of its pages repairs that page's findings.

## Commands

These are the Wiki completion commands. Lint runs them, and every skill that files Wiki pages closes through them by **Close** below. Run them from the repo root, with page paths starting `wiki/` (`wiki/shattered-sea/NPCs/Orvalle.md`):

```bash
bun run cfcli -- check "<page path>"
bun run cfcli -- index
bun run cfcli -- check --fix "<page path>" "<page path>"
bun run cfcli -- check "<page path>" "<page path>"
bun run cfcli -- log --op <op> --title "<what changed>" --page "<page path>" --page "<page path>"
```

- **Page check.** The one-path check is each page's own check as you finish it, usually returned by the edit hook. The hook's check runs with `--skip-boilerplate`. The page gate runs the `boilerplate` layer.
- **Index.** `index` regenerates every `index.md` from page `summary` lines. Run it after creating, moving or renaming a page or changing a `summary`. Each `index.md` and `log.md` changes only through these commands.
- **Fix.** `--fix` applies the mechanical fixes of four layers, then re-checks: `template` (leftover `%%` comments, empty `###` and optional `##` headings, missing frontmatter keys), `index` drift, a misplaced page under `placement`, and markdownlint's fixable rules. It fixes `index` drift only in the full gate, and `index` regenerates it otherwise. Every other finding is a hand repair that keeps the page's facts.
- **Page gate.** The many-path check over every page the run touched passes at `ok: 0 findings`. While repairing, `--layer <name>` narrows a check to one layer (repeat it for several), and `bun run cfcli -- check --help` lists the layers. A check with paths leaves out `index`, and it skips `hot`, `log` and `mermaid` when none of its pages is one they check. Every other layer runs, and the full gate runs them all.
- **Log.** `log` appends one entry for the operation to the Campaign's `log.md`. `--op` is the operation: `create`, `ingest`, `prep`, `push`, `audit`, `pull`, `query` or `lint`. `--title` is one line saying what changed. Give one `--page` per touched page, by path or page name, or pipe the list in with `--page -`. `--campaign` defaults to the Wiki's only Campaign; a Wiki of several needs the Campaign's name here (`"Shattered Sea"`, not the folder slug).
- **Another root.** For a Wiki outside this repo that a caller names, add `--root "<root>" --vault "<root>/wiki"` to every command and `--templates "<root>/wiki/templates"` to each check.

**Close.** A skill that files pages closes in this order. Run `index` when it created, moved, renamed or deleted a page or changed a `summary`. Run the page gate over every page it touched and repair each finding, fixing at its source by step 7 the cause of a finding a recast cannot clear, until the gate reports `ok: 0 findings`. Then log once, with the skill's `--op`. A skill run on its own logs `create` unless its steps name another op. A skill run inside another operation (Ingest, Prep, Push, Audit, Pull, Query, Lint) returns its touched paths and leaves the log to that operation.
