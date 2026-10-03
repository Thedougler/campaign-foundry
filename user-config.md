# User config

The DM's machine-local preferences. Agents read this file at the start of a run, then the active Campaign's `campaign-config.md`, before World pages. Scripts do not: they read `.env`.

Change values here; do not fork shared rules in `AGENTS.md` to match a preference.

## Campaign

- **Active World:** The Shattered Sea
- **Active Campaign:** Shattered Sea

## Evals

- **Human-audit pages:** `<tmp>/audit/<skill>/<case-id>.md` in a `mktemp -d` directory beneath OS `$TMPDIR` — the orchestrator overwrites the current sample and criteria for human review during that run. `evals/README.md` owns the procedure; durable export requires an explicit DM request.
- **Packed cases:** one default case per content type in the skill's `evals/cases.yaml`; extra cases only for unique circumstances the default case cannot expose.

## Harness

- **Native agents:** `.omp/agents/`
- **Skills (source of truth):** `.omp/skills/` when the skill lives there; otherwise `.agents/skills/<name>/`
- **Wiki access:** filesystem + QMD. Obsidian CLI is disabled; enabling it is not an eval prerequisite.
