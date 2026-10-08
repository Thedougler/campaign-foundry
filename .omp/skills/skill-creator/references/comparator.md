# Blind comparison

Read only for a requested qualitative comparison of an already comparable pair. This is a `prose-grader` assignment, a native `task` dispatch with this assignment as the task, not a new comparator agent. Independent pass/fail Grades remain the measurement; this optional comparison answers which output better serves the same DM request.

## Parent preparation

1. **Admit the pair.** Apply `eval-loop.md`'s comparability decision first. Supply the natural task and its prose expectations, plus the anonymized live source passages needed to judge fidelity; both runs read the same live sources. Done when the pair is comparable and both outputs have the same task and starting context.
2. **Blind.** Randomly assign A/B and keep the mapping private. Make temporary output copies without model/version identities, configuration labels or revealing path headers; retain substantive writing unchanged. Use neutral artifact names and source labels. Supply the actual A/B outputs, not Grade counts, histories or a summary of their quality. Done when the grader-visible brief and paths reveal neither candidate nor baseline.
3. **Launch.** Dispatch `prose-grader` natively. The task carries the steps below, the A/B output paths and the task under comparison; `outputSchema` is `schemas.md`'s `{winner, reasoning, evidence: [{criterion, a, b}]}` with `winner` one of `A`, `B`, `tie` and every other field a string, quoting evidence for both sides. Done when the grader has both complete outputs and the declared result shape.

## Comparator steps

1. **Read both.** Read every relevant A/B output as writing and the natural task/starting sources. Missing required output or source evidence is a blocker to report to the parent. Done when each task-relevant quality can be judged on both sides.
2. **Compare.** Apply the supplied task and expectations to accuracy, completeness and DM usability. Name the deciding criterion and quote exact passages from both sides. For a missing feature, quote its nearest relevant passage and explain the absence. Judge substance rather than version identity or personal style preferences. Done when the stated distinction follows from cited writing and the common task.
3. **Yield.** Select `A` or `B` only for a supported practical advantage; select `tie` when neither has a supported advantage. Both outputs may fail a requirement or both may succeed. Return `{winner,reasoning,evidence}` with exact A/B quotations; this assignment has no numeric rubric scores, totals or instruction-following ratings. Done when the result matches the declared shape and its conclusion is supported by evidence from both outputs.

The parent validates the result, saves it with `cp agent://<id> <iteration-dir>/comparison.json`, and keeps the private A/B mapping in `brief.md` for optional diagnosis. The comparison does not alter pass/fail Grades, pair admission or the helps/hurts lines. Done when the saved result can be traced to the blind inputs and its interpretation retains the correct mapping.
