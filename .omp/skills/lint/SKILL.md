---
name: lint
description: Lint — repair the Wiki until `cf check` reports zero findings, after Ingest, after Prep, after page create, or after page move; also when the DM asks to lint.
---

# Lint

Lint ends on a **clean gate**: every `cf check` finding fixed in this run, errors and warnings alike, on every page, played Session records and heard Narration included. A warning is a defect awaiting its fix. The DM owns the facts and the gate owns the form: each repair keeps what every sentence asserts. Lint repairs existing pages in place, adding a page only as the stub step 3 names for a missing page; it splits, deletes and merges none. Resolve every uncertainty from the Wiki through `qmd`/`query`, reading the retrieved pages, and decide; the DM gets a result, never a question.

**Every page is its own page.** A good book prints each paragraph once. A sentence repeated across pages is **boilerplate**: replace it with what only that page holds, so each callout describes its own subject in its own words.

## Steps

1. **Bind scope.** Resolve the active World/Campaign from `user-config.md` and the request. Read `docs/wiki-layout.md` for placement and the affected page-kind templates for shape. **Done when** every command below is bound to the World path.
2. **Auto-fix.** Run the bound `cf check --fix`. Read its full output (the raw artifact, past any truncation) and build a **work list**: every remaining finding, grouped by page. **Done when** every finding in the output is on the work list.
3. **Fix mechanics.** Repair every work-list finding outside the `narration`, `style` and `boilerplate` layers (template, placement, links, orphans, statblock, markdown, spelling, grammar, log, hot, index) against the templates and layout rules, moving existing content intact. Spelling is British English: a flagged common word takes its British form ("sabre", "rowing boat"); an in-world word with no page goes in the vault's `.cspell-words.txt`, a rules term in `.cspell/dnd-terms.txt`. Indexes are generated: regenerate them through `cf check --fix`. An `unresolved` link whose page does not exist, and a name `invented-names` flags that Canon already uses elsewhere (found through `qmd`), each take that page as a **stub**: create it from its template, fill each section with what the Wiki already says about the name (other pages, the log), leave the rest of the template's shape empty or minimal, and invent no stats, history or traits; its callout and links stay, and it passes the bound page check like any other page. **Done when** the bound check reports no finding outside `narration`, `style` and `boilerplate`, stubs included.
4. **Fix prose.** Fix every `narration`, `style` and `boilerplate` finding by [prose.md](prose.md). With up to five work-list pages, follow it yourself. With more, fan out through `task` in disjoint batches of eight pages, so each subagent loads its skills once; pages that link one another share a batch, since echo compares across links. Brief each subagent with its page paths and their work-list findings verbatim, and tell it to load `theatre-of-the-mind` and `skill://lint/prose.md`, follow prose.md and return its touched pages with their before/after pairs. Subagents run page checks only; this run keeps `cf check --fix`, the log and the full gate. **Done when** the bound check over the work-list pages reports no finding.
5. **Review.** Read every pair, your own included, against prose.md's bar: drift (a fact added, dropped, merged, inverted or re-attributed), a Canon name traded for a description, an inverted phrase ("scales of silver"), a line that reads worse aloud. Send each failing pair back to the subagent that wrote it by message (`agent://<id>`), naming the sentence and its failure; it keeps its context, redrafts and returns new pairs, which you review in turn. **Done when** every pair meets the bar and the bound check over the work-list pages still reports no finding.
6. **Log.** Run the bound log command with `--op lint`, a title naming the repairs, and one `--page` per touched page, including every page a subagent returned, created stubs, indexes and moved pages at their final paths. **Done when** the entry names every touched page.
7. **Check.** Run the full bound `cf check` without filters. Any finding returns it to step 3 or 4–5, then step 6 for the newly touched pages. **Done when** the full gate reports `0 findings` (the clean gate) and the log accounts for every repair. The reply states what was repaired in one or two lines, naming every stub and which of its sections are stubbed.

## Commands

Run from the Campaign Foundry project owning the live Wiki:

```bash
bun run cf check --fix "wiki/<World>"
bun run cf check "<page path>" "<page path>"
bun run cf log --world "<World>" --op lint --title "<what changed>" --page "<Page>"
bun run cf check
```

Repeat `--page "<Page>"` for the complete touched-page list.
