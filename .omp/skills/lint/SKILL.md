---
name: lint
description: Lint — repair a slice of Wiki pages until `bun run cf -- check` over them reports zero findings, after Ingest, after Prep, after page create, or after page move; also when the DM asks to lint.
---

# Lint

Lint ends on a **clean gate** over its **slice**, the pages it was given or picked. A clean gate means this run fixed every `bun run cf -- check` finding on those pages. Errors and warnings both count, in played Session records and heard Narration too. A warning is a defect awaiting its fix. The DM sets the facts and the gate sets the form. Each repair keeps what every sentence asserts. Lint repairs existing pages in place, adding a page only as the stub step 3 calls for when a page is missing. It splits, deletes and merges none. Resolve every uncertainty from the Wiki through `qmd`/`query`, reading the retrieved pages, and decide. The DM gets a result, never a question.

**Every page is its own page.** Like a good book, the Wiki prints each paragraph once. A sentence repeated across pages is **boilerplate**. Replace it with facts found only on that page. Each callout then describes its own subject in its own words.

## Steps

1. **Bind scope.** Resolve the active World/Campaign from `user-config.md` and the request. State the slice. Take the pages the brief hands you, else four to six pages the full gate flags, keeping pages that link one another together. Brief pages are an Ingest's or Prep's touched pages, or a created or moved page with the pages linking it, or the pages the DM lists. A top-level run the DM asks to lint the whole Wiki follows [Whole Wiki](#whole-wiki) instead. Read `docs/wiki-layout.md` for placement and the affected page-kind templates for shape. **Done when** every command below is bound to the World path and the slice's page paths.
2. **Auto-fix.** Run the bound `bun run cf -- check --fix` over the slice paths. Read its full output (the raw artifact, past any truncation) and build a **work list**: every remaining finding, grouped by page. **Done when** every finding in the output is on the work list.
3. **Fix mechanics.** Repair every work-list finding outside the `narration`, `style` and `boilerplate` layers (template, placement, links, orphans, statblock, markdown, spelling, grammar, log, hot, index) against the templates and layout rules, moving existing content intact. Work one page at a time: finish its repairs, then run the bound check on that page alone before you open the next. Repair by [Names](#names) every finding in any layer whose flagged text is an in-world name or a rules term. Spelling is British English: a flagged common word takes its British form ("sabre", "rowing boat"). Indexes are generated: regenerate them with `bun run cf -- index`. An `unresolved` link whose page does not exist, and a name `invented-names` flags that Canon already uses elsewhere (found through `qmd`), each take that page as a **stub**. Create the stub from its template and fill each section with what the Wiki already says about the name, on other pages or in the log. Leave the rest of the template's shape empty or minimal. Stats, history and traits come only from the Wiki. The stub's callout and links stay, and it passes the bound page check like any other page. **Done when** every finding the bound check still reports, stubs included, sits in `narration`, `style` or `boilerplate` and flags ordinary wording, with names all settled.
4. **Fix prose.** Fix every `narration`, `style` and `boilerplate` finding by [prose.md](prose.md). With up to five work-list pages, or as a subagent, follow it yourself. At the top level with more, dispatch `task` subagents in disjoint batches of eight pages. Each subagent then loads its skills once. Pages that link one another share a batch, since echo compares across links. Brief each subagent with its page paths and their work-list findings verbatim. Tell it to load `theatre-of-the-mind` and `skill://lint/prose.md`, follow prose.md and return its touched pages with their before/after pairs. Subagents run page checks only. This run keeps `bun run cf -- check --fix`, the log and the slice's page gate. **Done when** the bound check over the work-list pages prints `ok: 0 findings`.
5. **Review.** Read every pair, your own included, against prose.md's pair tests: drift (a fact added, dropped, merged, inverted or re-attributed), a Canon name traded for a description, an inverted phrase ("scales of silver"), a line that reads worse aloud. Send each failing pair back to the subagent that wrote it by message (`agent://<id>`), citing the sentence and its failure. It keeps its context, redrafts and returns new pairs, and you review those too. **Done when** every pair passes and the bound check over the work-list pages still prints `ok: 0 findings`.
6. **Log.** Run the bound log command with `--op lint`, a title that sums up the repairs, and one `--page` per touched page. Include every page a subagent returned, created stubs, indexes and moved pages at their final paths. **Done when** the entry lists every touched page.
7. **Check.** Run the bound page gate, `bun run cf -- check` over the slice and every page this run touched. Any finding returns it to step 3, or to steps 4 and 5, then step 6 for the newly touched pages. **Done when** the page gate reports `ok: 0 findings` (the clean gate) and the log accounts for every repair. The reply states what was repaired in one or two lines. It lists every stub and which of its sections are stubbed, and each suspected false match with its rule and sentence, for the DM to confirm.

## Names

A flagged word that is an in-world name or a rules term (`spelling` or `grammar` calls it unknown, or a `style` rule matches the name's own words) keeps its Canon spelling. The gate learns it. Search the Wiki for it (`qmd`, a title glob), then take the first rung that fits, in order:

1. **Misspelt Canon.** A Canon name spelt another way (the finding's "Did you mean", or `qmd` finds the page): write the Canon spelling.
2. **Owned.** A page has the name as its title or in `aliases`. Write that exact form, case included. Or add the text's own form to that page's `aliases`, whether a short form, a nickname or an epithet.
3. **Unowned.** A name some template fits (a person, place, group, creature, item, god) that no page owns is a missing page, however briefly the text mentions it, and however long it stood on the page before you. Lint gives it a stub as step 3 does. Ingest gives it a page through its Fill. When your brief keeps that page outside your scope, request the page in your return, with the page and line that name it, and leave the finding standing for the run that makes the stub. Rung 4 is for words outside every template.
4. **Coinage.** An in-world word outside the templates (a month, a weekday, a word of an in-world tongue, an oath): one line in `.cspell-words.txt` at the vault root (`wiki/`, or the bound `--vault`).
5. **Rules term.** A D&D rules or published-setting term: one line in `.cspell/dnd-terms.txt` at the repo root, in its group.

Page names and aliases count in every layer. Both cspell and Harper read them as words, and Harper never flags inside a linked name. The `style` layer swaps each for its kind's noun before Vale reads the page. `invented-names` counts them as Canon. Only cspell and Harper read the word lists. Settle a `style` finding on a name on rungs 1 to 3. Rerun the page check and carry on with the work list. **Done when** the check no longer flags the word and it is known in exactly one place: a page title or alias, `.cspell-words.txt` or `.cspell/dnd-terms.txt`.

## Whole Wiki

The full gate, `bun run cf -- check` with no paths, is the top-level agent's: it runs when the DM asks to lint the Wiki, or when a top-level operation closes on it. Read its whole output, group the flagged pages into slices of four to six, pages that link one another together, and dispatch one fresh `lint` subagent per slice through `task`, briefed with this skill and its slice paths. The per-provider caps queue the batch. Each slice ends on its own clean gate, and the Wiki comes clean across as many slices and sessions as its findings need. **Done when** every dispatched slice has returned its clean gate, and the reply states how many flagged pages the full gate still reports.

## Commands

Run from the Campaign Foundry project that contains the live Wiki:

```bash
bun run cf -- check --fix "<page path>" "<page path>"
bun run cf -- check "<page path>" "<page path>"
bun run cf -- index
bun run cf -- log --world "<World>" --op lint --title "<what changed>" --page "<Page>"
```

Repeat `--page "<Page>"` for the complete touched-page list.
