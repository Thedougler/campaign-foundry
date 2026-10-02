---
name: wiki-lint
description: Lint — mechanical Wiki repair after Ingest, after Prep, after page create, or after page move; also when the DM asks to lint.
---

# Lint

Repair Wiki mechanics autonomously: template shape, placement, links and index. Preserve page content and what every sentence asserts. No page creation, splitting, deletion, merging, or claim rewrites; never ask the DM. Resolve uncertainty by querying the Wiki, and report findings that require non-mechanical work.

## Steps

1. **Bind scope.** Resolve the active World/Campaign from `user-config.md` or the assigned write root and start-here paths. Read `docs/wiki-layout.md` for placement and the affected page-kind templates for shape. Protected work uses only its assigned write root and supplied capabilities; `evals/README.md` owns access. **Done when** the World, Wiki, templates and writable root are identified and every command below is bound to them.
2. **Fix.** Run the bound `lint --fix` command below. Record its changed paths, including generated indexes, and its remaining findings. **Done when** the command's result is observed and every automatic repair and unresolved finding is accounted for.
3. **Finish mechanics.** Repair remaining headings, layout, links and placement against the existing templates and layout rules, moving existing content intact. Resolve unclear targets or placement through `qmd`/`query`: retrieve the matching Wiki pages and use their evidence, not search snippets. Keep unresolved semantic choices unchanged. Regenerate indexes through lint rather than editing generated catalogs by hand. Rerun the bound lint command after repairs. **Done when** all four lint layers are clean or each remaining finding has a recorded reason it cannot be resolved mechanically; every changed page is on the touched-page list.
4. **Log.** Run the bound log command with `--op lint`, a title describing the actual repairs, and one `--page` argument for every page touched by automatic or manual repair, including indexes and moved pages at their final paths. **Done when** the lint entry exists and names every touched page.
5. **Check.** Run the full bound check command, without page or layer filters. If it exposes further mechanical repairs, complete the repair/log/check cycle; keep non-mechanical findings unchanged and report their paths and reasons. Keep successful housekeeping out of the DM reply. **Done when** the full gate is observed green, or every remaining finding or unavailable prerequisite is explicitly reported, and the lint log accounts for all repairs. The reply asks nothing.

## Command binding

### Production

Run from the Campaign Foundry project owning the live Wiki:

```bash
pnpm cf lint --world "<World>" --fix
pnpm cf log --world "<World>" --op lint --title "<what changed>" --page "<Page>"
pnpm check
```

Repeat `--page "<Page>"` for the complete touched-page list.

### Protected work

Use the supplied confined capabilities implementing these commands, matching Ingest's root/vault binding. `<root>` is the assigned temporary write root, `<wiki>` is its Wiki, and `<repo>` identifies the read-only CLI implementation, not a writable Campaign root. Use the assigned template path (normally `<wiki>/templates`).

```bash
node <repo>/src/cli.ts lint --world "<World>" --fix --vault "<wiki>" --root "<root>" --templates "<templates>"
node <repo>/src/cli.ts log --world "<World>" --op lint --title "<what changed>" --page "<Page>" --vault "<wiki>" --root "<root>"
node <repo>/src/cli.ts check --vault "<wiki>" --root "<root>" --templates "<templates>"
```

Repeat `--page` as in production. The full gate covers the assigned Wiki; a production command or live-vault fallback is outside the protected boundary.
