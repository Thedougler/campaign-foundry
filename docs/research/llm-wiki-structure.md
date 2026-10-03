# Wiki structure

Industry LLM-wiki (Karpathy gist; Hermes; OpenKB; claude-obsidian; OKF v0.2) compiled into this vault’s target. Differences from today’s tree are lag, not a fork.

**Obsidian is the IDE. The Agent writes. The Wiki is the codebase.**

## Layout

World folder holds the default (World) type folders. Campaign-specific types live in one `<Campaign>/` folder directly under the World — not `Campaigns/<Campaign>/`.

```
wiki/
  index.md
  DM Settings.md
  templates/
  <World>/
    <World>.md                 World overview
    index.md                   generated catalog
    log.md                     append-only Agent log
    Locations/  NPCs/  Creatures/  Factions/  Deities/  Items/  Spells/  Vehicles/  Lore/  House Rules/
    attachments/
    <Campaign>/                campaign-specific types only
      <Campaign>.md
      hot.md                   ~500 words, orientation, not evidence
      PCs/  Threads/  Quests/  House Rules/
      Sessions/Session <N>/    Prep, Scenes, Recap, Previously On, Handouts
raw/                           immutable intake; flat (outside the vault)
archive/                       ingested Raw; flat (outside the vault)
```

- **Page names** are in-world Title Case (`Captain Morrow`). Collision: `Ravenhold (Keep)`.
- **Nesting is a link** (`parent` on a Location). Folders stay flat by kind.
- **No source-summary pages.** Ingest merges units onto kind pages. Raw stays in `archive/`.
- **Wikilinks** are basenames: `[[Captain Morrow]]`. Unique in the vault.

Done when `docs/wiki-layout.md` and `src/check/placement-table.ts` describe this tree and every live page sits on it.

## Pages

YAML: `type`, `summary`, `sources` (archive paths), plus kind keys from the template. Templates in `templates/` remain the shape.

Anatomy, table-pressure order: at a glance → Narration → Play → Depth → Links.

A page is created when the thing is a unit of its kind (Ingest / design skills), not for a passing mention. Split only when a page is no longer scannable; do not invent stubs.

## Lint

**Lint** is the Agent’s autonomous mechanical repair: template headings and section order, wikilinks, placement, index. It finishes without asking. Unclear → query the Wiki.

```bash
pnpm cf check wiki/<World>            # report findings for this World
pnpm cf check wiki/<World> --fix      # apply mechanical fixes, then re-check
pnpm cf check                        # gate the whole Wiki
pnpm cf log --world <World> --op lint --title "<what changed>"
```

`--fix` may rewrite layout, headings, links, placement, and regenerate `index.md`. It does not create, split, delete, or merge pages, and it does not change what a sentence asserts.

Cadence: after every Ingest, Prep, page create, or move. Whole-Wiki when the DM asks or mechanical findings remain after `--fix`.

Done when a run leaves `pnpm cf check` green and a `lint` log entry names every page touched.

## omp

- Project skill `lint`: run `cf check --fix`, apply remaining mechanical edits, log, `bun run cf check`. Never ask the DM.
- `.omp/AGENTS.md`: pointer — Lint after Ingest, Prep, create, move.
- Keep ignoring user-library `llm-wiki` and `wiki-*` (old skills, not industry).

Done when that skill exists, the pointer fires those branches, and those ignores remain.

## Sources

- Karpathy, LLM Wiki: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Hermes llm-wiki skill (layout, lint checklist, index/log)
- claude-obsidian `WIKI.md` (Obsidian dual-use, lint read-only engine; we still auto-apply mechanical `--fix`)
- OpenKB schema + `lint.py` (structural vs semantic split)
- OKF v0.2: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md (`type` + `index.md`/`log.md`; we keep wikilinks and unique names)
- Prior note: `docs/research/llm-wiki-index-log-hot.md`
