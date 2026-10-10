# User config

The DM's machine-local preferences. Agents read this file at the start of a run, and the `@` imports under `## Campaign configs` load each Campaign's `campaign-config.md` with it, before World pages. Scripts do not: they read `.env`.

Change values here, and keep the shared rules in `AGENTS.md` as they are when a preference differs.

## Campaign

- **Active Campaign:** Shattered Sea (`wiki/shattered-sea/`, its World The Shattered Sea)

## Campaign configs

Each Campaign's config loads through its import below, and `new-campaign` adds one per Campaign.

### Shattered Sea

@wiki/shattered-sea/campaign-config.md

## Encounters

- **Combat level offset:** +1. This Party fights at least a level above the 2024 XP calculator. `cf encounter-budget` applies it by default; pass recorded sheet levels, do not pre-add the offset.

## Language

- **Spelling:** the DM writes Canadian or British English, and every agent writes British English in Wiki pages, skills, docs, commit messages and replies (colour, armour, harbour, defence, travelled, grey). The `spelling` gate is `en-GB` (`cspell.json`), so a US form on a Wiki page is a finding. A Canadian *-ize* spelling in the DM's own words is intended, so keep it when quoting the DM.

## Table

- **Real names.** The names people at the table are called by in a Transcript, each with the name that replaces it in everything an agent writes from that Transcript. A Player's name or nickname becomes that Player's character's name, and the DM's becomes "the DM". Agents read this list only to make the swap, so no real name spoken at the table appears in a chunk file, a Ledger or a Wiki page.
  - Nick → the DM
  - Frederick → Delmar
  - Courtney → Crissdalynn
  - Kaden, Caden → Perrin
  - Chad → Jean-Claude
  - Caitlin, Kaitlyn, Lazamataz → Catarina (guest Player, Session 9)

## Evals

- **Human-audit pages:** `<tmp>/audit/<skill>/<case-id>.md` in a `mktemp -d` directory beneath OS `$TMPDIR`. The orchestrator overwrites the current sample and criteria there for human review during that run. `evals/README.md` defines the procedure, and durable export requires an explicit DM request.
- **Packed cases:** one default case per content type in the skill's `evals/cases.yaml`. Add a case only for a circumstance that the default one can't show.

## Harness

- **Native agents:** `.omp/agents/`
- **Skills (source of truth):** `.omp/skills/` when the skill is defined there, otherwise `.agents/skills/<name>/`
- **Wiki access:** the Wiki is an Obsidian vault. Its vault root is `wiki/` (`.obsidian/` lives there): the folder `cf --vault` defaults to, `vault.dir` in `src/`, and what "the vault root" means in `cf` output. The repo root holds `raw/`, `archive/` and `.cspell/`, and `docs/wiki-layout.md` maps both. Read from the Notion Backup, and edit through `vault://_/` (the active vault) or `wiki/` paths, as `.omp/AGENTS.md` § Wiki access sets out.
