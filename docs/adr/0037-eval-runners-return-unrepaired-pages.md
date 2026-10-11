# Eval Runners return unrepaired pages

Until 2026-10-11 the eval Runner (`test-subject`) ran `bun run cfcli -- style` on each draft and rewrote it until the check printed `ok: 0 findings`. Creature pages also went through a statblock check in a scratch vault. The Runner repaired its own flaws before anyone saw them, so the eval measured the repair loop more than the skill. On 2026-10-11 the DM decided that during test-subject eval runs, linting of completed work is deferred. The Runner has no self-repair loop. The prose grader and the skill writer see the raw flaws, review more adversarially and fix the causes across the repo. Runs get faster, and the flaws that skill text produces become visible. The DM added the focus for criteria. Style gets repaired in production, so cases and rubrics test the creative qualities of professional-grade content, which the linter cannot measure.

Decision:

- **The Runner writes and returns.** It doesn't run the gate, and it returns each page as composed. A flaw it notices goes in its friction report, traced to the passage that led to it (`.omp/agents/test-subject.md`).
- **Checks measure the gate.** `evals/check.ts` runs the gate's `style`, `narration` and `statblock` layers over the Outcome. A gate error fails the case and a warning is reported, by the gate's own severities (ADR 0015). The `statblock` layer joins so the arithmetic the Runner used to check stays measured.
- **Rubrics judge creative quality.** Checks own every constraint code can decide, gate findings included. Rubrics own the craft no linter can judge, and a rubric that grades gate compliance moves to Checks or goes.
- **Findings are fixed at cause.** `skill://dogfood` triage traces each `gate` line to the skill or template passage that produced it and fixes it there as positive craft (ADR 0036), or to a rule that flags text it should pass. A line with neither cause is the Runner's own slip, which the page gate catches in production for the writer to repair.

`evals/README.md` holds the operative rules. This amends ADR 0014's gate layers and keeps ADR 0036's repair step for production writers.
