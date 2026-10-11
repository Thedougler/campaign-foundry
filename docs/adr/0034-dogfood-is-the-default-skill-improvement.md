# The `dogfood` skill is the default skill improvement

ADR 0017 made the Simple Hill Climb the way a content skill improves. Each round snapshots the skill and applies one patch, then reruns the suite to keep or revert the patch and logs the round in a climb log. A round pays for a full suite run and its grading, and a revert throws away the writer's whole patch along with its regression. The `dogfood` skill reaches the same fixes through real work. Subagents use the skill and report friction, and after the orchestrator triages it, one `skill-writer` fixes the round's issues. On 2026-10-11 the DM decided to make the efficient `dogfood` method the default rather than the hill climb, "for all skill improvements and changes going forward".

Later on 2026-10-11 the DM consolidated every skill improvement into one token-cheap loop. An Opus orchestrator dispatches the cheapest capable test subjects, reads their session histories, and independent specialist subagents repair every issue found. This follows Anthropic's own practice of watching real use and feeding successes and errors back into the skill and its code. Structured hill climbing comes from Cline and academic work, not from Anthropic.

Decision:

- **`dogfood` owns all improvement.** Every improvement or change to an existing skill or other agent-facing text runs through `skill://dogfood`, including running and measuring committed eval cases (`references/evals.md`) and an optional Optimise phase the DM accepts (`references/optimise.md`). The separate eval-running skill is retired.
- **`skill-creator` owns birth only.** It captures intent and has `skill-writer` draft a minimal skill, with one default case for a content skill. It then offers one trigger check and hands the new skill to a DM-started `dogfood` run.
- **Hill climbing and paired-baseline authoring are retired.** Each failed criterion becomes a finding for triage and reaches the writer as a process defect. A criterion that passed before and now fails is a finding for the next round. The climb logs are deleted, and round reports go in chat or on the tracking issue.
- **Specialists fix in parallel.** `skill-writer` takes every text gap and criterion. One code worker takes tool defects and the trails that friction reports record (deterministic work an agent did by hand), automating each with a test at its public interface.
- **Escalation is per case.** When the same criterion fails on `test-subject` in two consecutive rounds with a writer fix landed between them, the case reruns once on `smart-test-subject`. A pass marks the case `subject: smart`, and a fail returns the criterion to triage.
- **Design verdicts in `cases.yaml`.** Each case's one-line Design verdict goes in the `#` comment above it.

This supersedes ADR 0017's Simple Hill Climb. The rest of ADR 0017 stands.
