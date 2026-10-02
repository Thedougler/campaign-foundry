# Eval runner isolation

Notes for skill-eval **runners** (the model under test), not graders. Graders and `eval:check` still see checks and rubrics. The runner must not.

**Current contract.** `evals/README.md` owns access, lifetime and grounding; ADR 0013 records the decision. The implementation uses OS-temp Session Worlds, private control/authoring/audit storage, an immutable public descriptor and enforced per-run capabilities. QMD reads the existing real-project index as-is; copying/rebuilding an index in scratch is superseded advice. Close the returned `sessionRoot` after Grade/reporting and settled child jobs; evidence survives only through explicitly requested export.

Local observations that prompted this: `theatre-of-the-mind` `narration-slots` briefs coach the slot, name the defect, and say “do not rewrite X”; `run-evals` and `test-subject` repeat negatives the harness should make impossible; `pnpm check` failed in an isolated runner with `Unsupported package manager specification (bun@1.3.14)` instead of one gate CLI.

## Tasks look like production

Anthropic: source tasks from real failures and user work; the agent in the eval should function roughly as in production; grade **outcome** (environment state) more than the transcript’s claims. Automated evals that do not match real usage create false confidence. ([Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), 2026-01-09.)

A production-like DM ask is “rewrite Talon Skarn’s First look.” It is not a numbered exam that names every constraint the grader will apply.

Hillclimbing must not paste failure text into the prompt being tuned. Make it structurally difficult for the system under test to reach test answers. (Anthropic hillclimb / eval-design; this repo’s #25.)

Prompt-iteration contamination: rewriting the prompt to pass cases 4, 7, and 13 memorizes those items; new cases of the same type fail again. ([Agent evaluation chapter](https://medium.com/@vinodkrane/chapter-8-agent-evaluation-for-llms-how-to-test-tools-trajectories-and-llm-as-judge-788f6f3e0d52).)

## Hide the answer

SWE-bench gives the issue text and the repo at `base_commit`. The subject does not see the gold patch or `test_patch`. Scoring is fail-to-pass / pass-to-pass tests in isolation. ([SWE-bench](https://qaskills.sh/blog/swe-bench-explained-guide-2026).)

If the runner can open `cases.yaml` rubrics, `eval:check` patterns, or an audit key, the trial is spoiled. Hard harness deny on those paths; wide read on the Wiki with a short pointer to relevant pages so the agent does not wander.

Models can hunt answer keys when they infer they are in an eval. Isolation is access control, not a “don’t look” line. ([Eval awareness in Claude Opus 4.6’s BrowseComp](https://www.anthropic.com/engineering/eval-awareness-browsecomp).)

## Positive instructions; harness for prohibitions

Positive directives outperform “don’t do X”; token generation selects the next action rather than suppressing one. Critical prohibitions belong in hooks, not prose. ([Instruction polarity](https://agentpatterns.ai/instructions/instruction-polarity/); Anthropic: [tell Claude what to do](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct).) Same rule in `writing-for-agents`.

Governance (who may read, who may write) is a runtime variable. Prompt-based “never edit live Wiki” is probabilistic; the harness must deny the write. ([Harness-MU](https://arxiv.org/html/2606.21856v1); [Australian Signals Directorate on agentic harnesses](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/agentic-ai-harnesses); [Augment: rules files plus deterministic outer constraints](https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents).)

Runner brief: the DM task, allowed write root, and which pages to start from. Not a list of forbidden files.

## Tools

Reading uses granted Wiki/Raw/Archive, templates and assigned skill/reference files; writing is confined to the assigned temporary World. Parent-kernel capabilities bind the real-project QMD index for read-only queries/retrieval and map edit paths into scratch. `test-subject` declares only `yield`; dispatch supplies its exact per-run capabilities. Missing File/check capabilities are a harness prerequisite, not permission to substitute unrestricted tools.

Preparation seeds only assigned current-page callout bodies before freezing the private baseline. The Runner sees the resulting unfinished page through its public task inputs, not the defect diagnosis or expected answer. Natural DM requests and short start-here paths keep production task shape while runtime grants hide private comparison material.

## One lint CLI

The gate already has every layer, in order: template, placement, links, orphans, statblock, index, hot, log, markdownlint, remark-lint, spelling, grammar, style (`src/check/layers/index.ts`). `cf check` runs them; `cf check --fix` applies mechanical fixes.

File uses the full `cf check` / `cf check --fix` gate with bound `--vault <W>/wiki --root <W> --templates <W>/wiki/templates`, through fixed native capabilities. A page/layer filter is not completion evidence. Cache and Vale intermediates stay beneath the invocation root; operator setup and missing-tool remediation stay with the parent.

## Related

- #25 Anthropic eval-design + hillclimbing
- #33 live Wiki read-only search vs re-embed
- #34 eval runners: production-like tasks, harness isolation, seeded defects, one lint CLI
- #15 theatre-of-the-mind evals
