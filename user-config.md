# User config

The DM's machine-local preferences. Agents read this file at the start of a run, then the active Campaign's `campaign-config.md`, before World pages. Scripts do not: they read `.env`.

Change values here; do not fork shared rules in `AGENTS.md` to match a preference.

## Campaign

- **Active World:** The Shattered Sea
- **Active Campaign:** Shattered Sea

## Encounters

- **Combat level offset:** +1. This Party fights at least a level above the 2024 XP calculator. `cf encounter-budget` applies it by default; pass recorded sheet levels, do not pre-add the offset.

## Language

- **Spelling:** the DM writes Canadian or British English, and every agent writes British English in Wiki pages, skills, docs, commit messages and replies (colour, armour, harbour, defence, travelled, grey). The `spelling` gate is `en-GB` (`cspell.json`), so a US form on a Wiki page is a finding. A Canadian *-ize* spelling in the DM's own words is intended, so keep it when quoting the DM.

## Table

- **Real names.** The names people at the table are called by in a Transcript, each with the name that replaces it in everything an agent writes from that Transcript. A Player's name or nickname becomes that Player's character's name, and the DM's becomes "the DM". Agents read this list only to make the swap, so no real name spoken at the table reaches a chunk file, a Ledger or a Wiki page.
  - Nick → the DM
  - Frederick → Delmar
  - Courtney → Crissdalynn
  - Kaden, Caden → Perrin
  - Chad → Jean-Claude
  - Caitlin, Kaitlyn, Lazamataz → Catarina (guest Player, Session 9)

## Evals

- **Human-audit pages:** `<tmp>/audit/<skill>/<case-id>.md` in a `mktemp -d` directory beneath OS `$TMPDIR` — the orchestrator overwrites the current sample and criteria for human review during that run. `evals/README.md` owns the procedure; durable export requires an explicit DM request.
- **Packed cases:** one default case per content type in the skill's `evals/cases.yaml`; extra cases only for unique circumstances the default case cannot expose.

## Harness

- **Native agents:** `.omp/agents/`
- **Skills (source of truth):** `.omp/skills/` when the skill lives there; otherwise `.agents/skills/<name>/`
- **Wiki access:** The Wiki is an Obsidian vault. Its vault root is `wiki/` (`.obsidian/` lives there): the folder `cf --vault` defaults to, `vault.dir` in `src/`, and what "the vault root" means in `cf` output. The repo root holds `raw/`, `archive/` and `.cspell/`; `docs/wiki-layout.md` maps both. Search with QMD. Read and edit through `vault://_/` (the active vault) or `wiki/` paths.
