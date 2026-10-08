# Campaign Foundry

A DM's D&D campaign Wiki, kept by coding agents working in this repo. Start with `AGENTS.md`.

## Setup

1. Install Bun 1.3.14, then run `bun install --frozen-lockfile`. `bun.lock` is the committed dependency graph; keep `node_modules/` untracked.
2. `bun run setup` syncs the pinned Vale style packages. Vale 3.23 or newer must be on your PATH.
3. `bun run cf -- check` gates the Wiki and `bun run cf -- check --fix` applies mechanical fixes; `bun run cf -- --help` lists the other commands.

Add or update dependencies with `bun add` or `bun update`; commit `package.json` and `bun.lock` together. Use frozen installs in automation so dependency drift fails rather than silently rewriting the lockfile.

## Development environment

The repo carries two first-class toolchains: TypeScript under Bun and Node (`src/`, `test/`, `scripts/`), and Python under uv in `python/`, where features ported from Python land as the `campaign_foundry` package. Python lives in `python/` rather than beside the root `src/` so the two languages never share a source tree, and `python/` is a standard uv project with its own `pyproject.toml`, `uv.lock`, src layout and `tests/`.

Setup: after `bun install --frozen-lockfile`, run `bun run py:install` (`uv sync --directory python`). It creates `python/.venv`, installs `campaign_foundry` editable, and installs its dev tools (pytest, ruff).

Commands run from the repo root through `package.json` scripts:

- `bun run py:test` — pytest, which skips tests marked `slow`; `bun run py:lint` — `ruff check`; `bun run py:fmt` — `ruff format`, with `bun run py:fmt:check` verifying formatting.
- `bun run py:test:slow` — the `slow` tests, which load the real PANNs model (below) and download its checkpoint on first run.
- `bun run check:all` — every gate in one pass: agent-text style, typecheck, vitest, then Python lint, format check and tests.

Python features reach agents through `cf`, the single entry surface: `bun run cf -- transcript highlights <recording or parts…> --transcript <export> [--json] [--clip-dir <dir>]` ranks a Session recording's laughs (PANNs `Cnn14_DecisionLevelMax` sound-event detection, ported from `shattered-sea-wiki`) and aligns each with the lines of its timestamped TranscribeX export, markdown or CSV, which the command tells apart by reading the file. `src/commands/transcript.ts` hands the arguments to `uv run --project python --extra highlights python -m campaign_foundry.highlights`. The `highlights` extra (torch, panns-inference) installs on the first scan, which also downloads the model checkpoint (about 330 MB) to `~/panns_data/` with `wget`; `ffmpeg` decodes the audio and cuts clips. `--help` lists every option and needs neither.

Add dependencies where they belong: a JS package with `bun add <pkg>`, a Python package with `uv add --directory python <pkg>` (dev tools with `--dev`). Commit `python/pyproject.toml` and `python/uv.lock` together, as you do `package.json` and `bun.lock`. Toolchain versions are pinned by `.node-version` and `packageManager` for Node and Bun, and by `python/.python-version` and `requires-python` for Python 3.14.

## Location authoring

Use `location-design` to create or deepen a Region, Settlement or Site. It reads the current Location template and Canon before designing travel choices, services or local interactions. Locations stay flat in `<World>/Locations/`; `parent` links express containment, including a Site within a Site.

Use `dungeon-design` when a Site needs area-by-area exploration, keyed routes, pressure and rest procedures. It stocks a Site rather than defining a Dungeon page kind; `location-design` invokes it for dungeon-like Sites.

Both skills have Campaign-grounded definitions in their `evals/cases.yaml`. When execution is requested, use `run-evals` for read-only runs, page checks and independent grading.

## Home-Session dogfooding

All skill evals use real Shattered Sea content: each Runner is a read-only `test-subject` dispatch that reads the live Wiki, Raw and Archive and returns its pages and DM reply as its result, which the orchestrator saves to a temporary directory, so the originals stay unchanged. `evals/README.md` defines the per-case recipe, source provenance and the weekly DM/Player feedback loop. Narration benchmarks run only when requested.
