# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Native delegation

Use oh-my-pi's native `task` subagents for authors, runners, graders and reviewers. The `omp` skill primarily serves agents in other harnesses; do not launch another omp process for work the current harness can delegate.

Select an agent by its responsibility. Model selection belongs in native agent frontmatter or configured model roles, not invented `task` arguments. The dedicated `skill-author` owns skill text. The orchestrator owns briefs, acceptance criteria and integration.

Batch independent slices, give writers disjoint files, and pass the brief and artifact paths explicitly. Each eval case gets its own scratch Wiki; author, runner and grader are separate agents. Keep the configured eval-family rotation and model pins from the shared rules. Use `agent://` to steer a worker, completion notifications to collect results, and `wait` only when nothing else is actionable.

Use an external CLI only when native delegation cannot provide the required model, isolation or execution capability. State the missing capability and use the documented command. Do not silently change an eval model or build a custom launcher.

## Configuration

Native agent definitions live in `.omp/agents/`. Use descriptive agent names and narrow responsibilities; do not override bundled agents for a single job. Inspect the effective settings and agent definitions before changing configuration, preserve unrelated overrides, and never weaken approvals or disable providers to make a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep shared project facts in that root file and only oh-my-pi behavior here.
