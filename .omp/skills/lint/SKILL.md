---
name: lint
description: Lint — mechanical Wiki repair after Ingest, after Prep, after page create, or after page move; also when the DM asks to lint.
---

# Lint

Repair Wiki mechanics autonomously: template shape, placement, links and index. Preserve page content and what every sentence asserts. No page creation, splitting, deletion, merging, or claim rewrites; never ask the DM. Resolve uncertainty by querying the Wiki, and report findings that require non-mechanical work, including Narration and other style warnings, which belong to the skill that wrote the prose.

## Steps

1. **Bind scope.** Resolve the active World/Campaign from `user-config.md` and the request. Read `docs/wiki-layout.md` for placement and the affected page-kind templates for shape. **Done when** the World, Wiki and templates are identified and every command below is bound to them.
2. **Fix.** Run the bound `cf check --fix` on the World path below. Record its changed paths, including generated indexes, and its remaining findings. **Done when** the command's result is observed and every automatic repair and unresolved finding is accounted for.
3. **Finish mechanics.** Repair remaining headings, layout, links and placement against the existing templates and layout rules, moving existing content intact. Resolve unclear targets or placement through `qmd`/`query`: retrieve the matching Wiki pages and use their evidence, not search snippets. Keep unresolved semantic choices unchanged. Regenerate indexes through `cf check --fix` rather than editing generated catalogs by hand. Rerun the bound World-path fix after repairs. **Done when** the template, placement, links and index findings are clean or each remaining one has a recorded reason it cannot be resolved mechanically; every changed page is on the touched-page list.
4. **Log.** Run the bound log command with `--op lint`, a title describing the actual repairs, and one `--page` argument for every page touched by automatic or manual repair, including indexes and moved pages at their final paths. **Done when** the lint entry exists and names every touched page.
5. **Check.** Run the full bound `cf check`, without page or layer filters. If it exposes further mechanical repairs, complete the repair/log/check cycle. Keep non-mechanical findings unchanged, Narration and style warnings included, and report their paths and reasons. Keep successful housekeeping out of the DM reply. **Done when** the full gate is observed green, or every remaining finding or unavailable prerequisite is explicitly reported, and the lint log accounts for all repairs. The reply asks nothing.

## Commands

Run from the Campaign Foundry project owning the live Wiki:

```bash
bun run cf check --fix "wiki/<World>"
bun run cf log --world "<World>" --op lint --title "<what changed>" --page "<Page>"
bun run cf check
```

Repeat `--page "<Page>"` for the complete touched-page list.
