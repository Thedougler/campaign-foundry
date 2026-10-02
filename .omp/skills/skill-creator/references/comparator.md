# Blind comparison

Read only for a requested qualitative comparison of an already comparable pair. This is a fresh native `prose-grader` assignment, using the configured role and approvals, not a new comparator agent. Independent pass/fail Grades remain the measurement; this optional comparison answers which output better serves the same DM request.

## Parent preparation

1. **Admit the pair.** Apply `eval-loop.md`'s comparability decision first. Supply the natural task and its prose expectations, plus the anonymized live source passages needed to judge fidelity; both runs read the same live sources. Done when the pair is comparable and both outputs have the same task and starting context.
2. **Blind.** Randomly assign A/B and keep the mapping private. Make temporary output copies without model/version identities, configuration labels or revealing path headers; retain substantive writing unchanged. Use neutral artifact names and source labels. Supply the actual A/B outputs, not Grade counts, histories or a summary of their quality. Done when the grader-visible brief and paths reveal neither candidate nor baseline.
3. **Dispatch.** Give a fresh native `prose-grader` the steps below and a strict `outputSchema` for `schemas.md`'s `{winner,reasoning,evidence:[{criterion,a,b}]}`. Required winner values are `A`, `B`, `tie`; other fields are strings, with quoted evidence for both sides. This blind assignment yields a result rather than writing an artifact. Done when the fresh grader has both complete outputs and the declared qualitative comparison contract.

## Comparator steps

1. **Read both.** Read every relevant A/B output as writing and the natural task/starting sources. Missing required output or source evidence is a blocker to report to the parent. Done when each task-relevant quality can be judged on both sides.
2. **Compare.** Apply the supplied task and expectations to accuracy, completeness and DM usability. Name the deciding criterion and quote exact passages from both sides. For a missing feature, quote its nearest relevant passage and explain the absence. Judge substance rather than version identity or personal style preferences. Done when the stated distinction follows from cited writing and the common task.
3. **Yield.** Select `A` or `B` only for a supported practical advantage; select `tie` when neither has a supported advantage. Both outputs may fail a requirement or both may succeed. Return `{winner,reasoning,evidence}` with exact A/B quotations; this assignment has no numeric rubric scores, totals or instruction-following ratings. Done when the result matches `outputSchema` and its conclusion is supported by evidence from both outputs.

The parent validates and saves the yielded result as the assigned `comparison.json`, captures its independent completion/provenance and preserves the private A/B mapping for optional diagnosis. The comparison does not alter pass/fail Grades, pair admission or aggregate metrics. Done when the saved result can be traced to the blind inputs and its interpretation retains the correct mapping.
