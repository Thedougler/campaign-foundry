# The `dogfood` skill is the default skill improvement

ADR 0017 made the Simple Hillclimb the way a content skill improves. Each round snapshots the skill and applies one patch, then reruns the suite to keep or revert the patch and logs the round in `climb.md`. A round pays for a full suite run and its grading, and a revert throws away the writer's whole patch along with its regression. The `dogfood` skill reaches the same fixes through real work. Subagents use the skill and report friction, and after the orchestrator triages it, one `skill-writer` fixes the round's issues. On 2026-10-11 the DM decided to make the efficient `dogfood` method the default rather than the Hillclimb, "for all skill improvements and changes going forward".

Decision:

- **`dogfood` is the default.** Every improvement or change to a skill or other agent-facing text runs through `skill://dogfood`.
- **Evals feed `dogfood`.** `skill://run-evals` stays measurement. A DM-started `dogfood` run may take a suite's committed cases as its units. Each failed criterion becomes a finding for triage and reaches the writer as a process defect. The run skips the snapshot and the climb log, and a criterion that passed before and now fails is a finding for the next round.
- **Hillclimb on request.** The Hillclimb in `evals/README.md` runs only when the DM asks for one. Existing `climb.md` logs stay as historical records.
- **Design verdicts in `cases.yaml`.** Each case's one-line Design verdict goes in the `#` comment above it.

This supersedes ADR 0017's Simple Hillclimb as the default. The rest of ADR 0017 stands.
