# Eval Runners return unrepaired pages

Until 2026-10-11 the eval Runner (`test-subject`) ran `bun run cfcli -- style` on each draft and rewrote it until the check printed `ok: 0 findings`. Creature pages also went through a statblock check in a scratch vault. The Runner repaired its own flaws before anyone saw them, so the eval measured the repair loop more than the skill. On 2026-10-11 the DM decided that during test-subject eval runs, linting of completed work is deferred. The Runner has no self-repair loop. The prose grader and the skill writer see the raw flaws, review more adversarially and fix the causes across the repo. Runs get faster, and the flaws that skill text produces become visible. The DM added the focus for criteria. Style gets repaired in production, so cases and rubrics test the creative qualities of professional-grade content, which the linter cannot measure.

Later the same day the DM removed prose lint from evals altogether. Measuring the `style` and `narration` layers in a case skewed it toward lint compliance and flattened the creative signal the rubrics exist to read. The lint errors agents make naturally show up in production work, where they belong.

Decision:

- **The Runner writes and returns.** It doesn't run the gate, and it returns each page as composed. A flaw it notices goes in its friction report, traced to the passage that led to it (`.omp/agents/test-subject.md`).
- **Checks measure statblocks only.** `evals/check.ts` runs the gate's `statblock` layer over the Outcome as a correctness check, so the arithmetic the Runner used to check stays measured. A statblock error fails the case and a warning is reported, by the gate's own severities (ADR 0015). The prose lint layers (`style`, `narration`) are never measured in evals.
- **Rubrics judge creative quality.** Checks own every constraint code can decide. Rubrics own the craft no linter can judge, and a rubric that grades lint compliance goes.
- **Lint is observed in production.** `skill://dogfood` live units write to the Wiki as production does. `bun run cfcli -- lint-tally` counts each page's first `wiki-check` result from their session files, and a rule that recurs across units or rounds is fixed at cause in the skill text as positive craft (ADR 0036). An isolated hit is left to the page gate.

`evals/README.md` holds the operative rules. This amends ADR 0014's gate layers and keeps ADR 0036's repair step for production writers.
