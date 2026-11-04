# Campaign Foundry

Campaign Foundry is an LLM Wiki for a live D&D table. Its product is professional-grade Campaign content that makes the DM's Sessions engaging, memorable and fun. Evals codify the DM's intent; revise their criteria when that intent changes. Code automates deterministic work so agents spend their reasoning on judgement and creative work.

## Schema

- **Raw**: `raw/` holds files awaiting Ingest; `archive/` keeps ingested files.
- **Wiki**: `wiki/` is the compounding Canon, with the DM having final say. Page-kind templates define properties and sections; read `docs/wiki-layout.md` before creating or moving pages.
- **Backup**: the Notion copy of main's Wiki and skills; access is in `.omp/AGENTS.md` § Wiki access.
- **Schema**: `CONTEXT.md` supplies domain terms; `docs/adr/` records product decisions. Read the decisions touching an area before changing it.
- **Operations**: use `ingest` (`pull-pcs` for PCs), `query` and `lint` for their respective work.

## Sourcing

Campaign content follows the 2024 D&D 5e rules. Reuse the first source fitting the DM's intent: Wiki Canon, web material, the SRD through `dnd5e-srd-api`, then novel content inspired by what you found. Foundry is never a source; retell sources in fresh words.

An optional `inspired_by` names an inspiration the DM explicitly stated. Before building on that page, research the named work through the Wiki, QMD, `.cache/inspired-by/<page-slug>.md` or web sources, save useful research to that gitignored note, and carry its themes into fresh prose.

## Content stance

The DM sets the content rating and themes, bounded by the Campaign's Lines and Veils in `campaign-config.md`. Match that rating in drafts and briefs: R-rated fiction stays R-rated, dark themes keep their strength, and villains do evil on the page so good can triumph over them.

## In-world voice

Characters and Narration use the World's own words. Rules terms belong in statblocks; prose shows what people perceive. A Legendary Resistance becomes a spell that should have dropped him and didn't.

## Orient

Read `user-config.md`, then the Campaign's `campaign-config.md`, `hot.md` (orientation, not evidence), `index.md`, recent `log.md` entries and task pages. Search Notion for the DM's context and the Wiki Backup through `.omp/AGENTS.md` § Wiki access. Creative work uses `docs/creative-process.md`.

## Working rules

- **Gate scope.** Bring every page handed to or touched by the run to `ok: 0 findings` with `bun run cfcli -- check <pages>`, repairing warnings and errors in the page's meaning and voice; agent-facing changes use `bun run lint`, and a whole-Wiki check belongs to a request to lint the Wiki.
- **Skills, templates and lint move together.** Update the related authoring skills, templates, checks and Push readers together when their shared page contract changes.
- **Flesh out thin pages.** Give thin or generic pages met during the work a `flesh-out` pass, weaving from related Canon before inventing what remains open.

@user-config.md

@CONTEXT.md
