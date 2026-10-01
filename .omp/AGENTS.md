# Campaign Foundry in oh-my-pi

@../AGENTS.md

## Native delegation

Use oh-my-pi's native `task` subagents for authors, runners, graders and reviewers. The `omp` skill primarily serves agents in other harnesses; do not launch another omp process for work the current harness can delegate.

Select an agent by its responsibility. Model selection belongs in native agent frontmatter or configured model roles, not invented `task` arguments. The dedicated `skill-writer` subagent owns skill text; every skill modification — creation, revision and eval-driven fixes — routes through it, and the orchestrator never edits skill files itself. The orchestrator owns briefs, acceptance criteria and integration.

Skill evals use three native agents: `skill-writer` → `@SKILL-WRITER` for skill edits, `test-subject` → `@TEST-SUBJECT` for each case or baseline, and `prose-grader` → `@PROSE-GRADER` for independent rubric grading. Harness role assignments and fallback chains select their models; `evals/models.yaml` governs other harnesses and explicitly model-pinned runs such as the cross-family Prose Benchmark. Preserve each native completion's model selector, identity and thinking level; pair only matching identities and thinking levels. Blocking runners and graders retain exact completion metrics in `details.results`; batch dispatch still runs independent items concurrently.

Batch independent slices, give writers disjoint files, and pass the brief and artifact paths explicitly. Each eval case gets its own scratch Wiki; writer, test subject and grader are separate agents. Use `agent://` to steer a worker, completion notifications to collect results, and `wait` only when nothing else is actionable.

Use an external CLI only when native delegation cannot provide the required model, isolation or execution capability. State the missing capability and use the documented command. Do not silently change an eval model or build a custom launcher.

## Skill tooling

Three omp-native skills split the evaluation surface, each owning its workflow:

- **Skill authoring** — read `skill://skill-creator` before creating or revising a skill, planning paired baselines or feedback iterations, or testing its description.
- **Campaign evals** — read `skill://run-evals` before planning or executing committed `evals/cases.yaml` cases in scratch Worlds with deterministic checks and rubric grading.
- **Prose Benchmark** — read `skill://dnd-benchmark` before planning, running or resuming cross-family Matrix Narration ranking or refreshing its leaderboard.

Their workflows dispatch native `task` subagents exclusively — no omp or Claude CLI invocation, even when a provider is unavailable (that is an execution error to report). The `.agents/` equivalents serve other harnesses; shared eval-data policy lives in `evals/README.md`.

## Jev judgment

- Use scoped `find` for unknown behavior locations; `grep` for known literals and LSP for references/definitions.
- For bounded classification, yes/no, ranking, or rubric scoring, read `xd://eval/judge` once and use `judge` instead of a chat completion or subagent. Batch independent questions over the same evidence into one call; use `judge_batch` for multiple states and consume bounded result slices.
- Send only the evidence needed by the rubric, not the full transcript or whole repository. Define observable criteria; do not use Jev as a substitute for execution, source inspection, or independent skill-eval grading.
- A failed judge item is a tool failure, not a verdict: inspect `item.error` before concluding. Independent skill-eval grading belongs to `prose-grader`, not Jev.

## Configuration

Native agent definitions live in `.omp/agents/`. Use descriptive agent names and narrow responsibilities; do not override bundled agents for a single job. Inspect the effective settings and agent definitions before changing configuration, preserve unrelated overrides, and never weaken approvals or disable providers to make a task run.

This file imports the shared root instructions because native context shadows a root `AGENTS.md` at the same directory depth. Keep shared project facts in that root file and only oh-my-pi behavior here.
