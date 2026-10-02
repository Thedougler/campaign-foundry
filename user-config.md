# User config

The DM's machine-local preferences. Agents read this file at the start of a run, then the active Campaign's `campaign-config.md`, before World pages. Scripts do not: they read `.env`.

Change values here; do not fork shared rules in `AGENTS.md` to match a preference.

## Campaign

- **Active World:** The Shattered Sea
- **Active Campaign:** Shattered Sea

## Evals

- **Human-audit pages:** `<sessionRoot>/audit/<skill>/<case-id>.md` beneath OS `$TMPDIR` / `os.tmpdir()` — the orchestrator overwrites the current sample and criteria for human review during that Session. Access and cleanup follow `evals/README.md`; durable export requires an explicit DM request.
- **Packed cases:** keep distinct slots in as few cases in the skill's `evals/cases.yaml` as will still expose the defect.

## Harness

- **Native agents:** `.omp/agents/`
- **Skills (source of truth):** `.omp/skills/` when the skill lives there; otherwise `.agents/skills/<name>/`
- **Wiki access:** filesystem + QMD. Obsidian CLI is disabled; enabling it is not an eval prerequisite.
