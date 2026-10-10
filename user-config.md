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

## Prose voice

How the DM's Narration sounds, from the diction, rhythm, register and humour of his own casual writing (Second Brain page "D&D DM style & narration preferences", § Nick's natural voice). Brennan Lee Mulligan and Matt Mercer set the craft and the sound of a spoken block: its camera, breath and register (ADR 0029). These lines season it with his diction, humour, warmth and handoffs to the players, so it still sounds like him without drifting toward his texting register. His own words such as "yah" and the build of his jokes win over the exemplars. So does the way he builds a player's moment up. Register and length stay with the exemplars.

- **2026-10-10.** Everyday words, always, with contractions and swearing as emphasis within the Campaign's Lines and Veils ("oh fuck yes"). He writes "yah", never "yeah". Purple or literary prose is wrong. Each line should sound spoken across the table, clean and never workshopped.
- **2026-10-10.** His short punchy lines and fragments are the sound inside a block, the beat and the landing, never a reason for a shorter block. Narration keeps the lengths and bands of `theatre-of-the-mind` and runs longer than his chat. Movement and excitement get his long breathless comma-run, one thought tumbling into the next.
- **2026-10-10.** Comparisons come from the World in his everyday "basically X, except Y" shape.
- **2026-10-10.** His humour runs on puns and absurd escalation, with warm crude teasing. Each joke still gives the table information.
- **2026-10-10.** Warm and conspiratorial with the table. A handoff talks to the player behind the PC by the PC's name and builds their moment up.
- **2026-10-10.** He performs voices. Give each NPC's line a sound or rhythm he can do, and put any accent or pitch note on the DM's side.
- **2026-10-10.** A World or Campaign pitch takes his lore-draft register. It is more formal than his table talk, and just as concrete and plain.

## Evals

- **Human-audit pages:** `<tmp>/audit/<skill>/<case-id>.md` in a `mktemp -d` directory beneath OS `$TMPDIR`. The orchestrator overwrites the current sample and criteria there for human review during that run. `evals/README.md` defines the procedure, and durable export requires an explicit DM request.
- **Packed cases:** one default case per content type in the skill's `evals/cases.yaml`. Add a case only for a circumstance that the default one can't show.

## Harness

- **Native agents:** `.omp/agents/`
- **Skills (source of truth):** `.omp/skills/` when the skill is defined there, otherwise `.agents/skills/<name>/`
- **Wiki access:** the Wiki is an Obsidian vault. Its vault root is `wiki/` (`.obsidian/` lives there): the folder `cf --vault` defaults to, `vault.dir` in `src/`, and what "the vault root" means in `cf` output. The repo root holds `raw/`, `archive/` and `.cspell/`, and `docs/wiki-layout.md` maps both. Read from the Notion Backup, and edit through `vault://_/` (the active vault) or `wiki/` paths, as `.omp/AGENTS.md` § Wiki access sets out.
