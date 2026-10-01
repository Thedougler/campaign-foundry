# Campaign Foundry

A DM's D&D campaign Wiki, kept by coding agents working in this repo. Start with `AGENTS.md`.

## Setup

1. Install Bun 1.3.14, then run `bun install --frozen-lockfile`. `bun.lock` is the committed dependency graph; keep `node_modules/` untracked.
2. `bun run setup` syncs the pinned Vale style packages. Vale 3.23 or newer must be on your PATH.
3. `bun run check` gates the Wiki; `bun run cf --help` lists the other commands.

Add or update dependencies with `bun add` or `bun update`; commit `package.json` and `bun.lock` together. Use frozen installs in automation so dependency drift fails rather than silently rewriting the lockfile.

## Location authoring

Use `location-design` to create or deepen a Region, Settlement or Site. It reads the current Location template and Canon before designing travel choices, services or local interactions. Locations stay flat in `<World>/Locations/`; `parent` links express containment, including a Site within a Site.

Use `dungeon-design` when a Site needs area-by-area exploration, keyed routes, pressure and rest procedures. It stocks a Site rather than defining a Dungeon page kind; `location-design` invokes it for dungeon-like Sites.

Both skills have Campaign-grounded definitions in their `evals/cases.yaml`. When execution is requested, use `run-evals` for scratch snapshots, page checks and independent grading.

## Home-Session dogfooding

All skill evals use real Shattered Sea content in independent scratch copies. `evals/README.md` defines source provenance, isolation and the weekly DM/Player feedback loop. `bun run eval:prepare --help` lists preparation and source-immutability verification commands. Live Wiki, Raw and Archive originals stay unchanged during evals; Narration benchmarks run only when requested.
