# Independent pass/fail Grade

Read when briefing a native `prose-grader` for a paired authoring run. This is an assignment reference for the configured role, not another agent definition. `evals/README.md` owns source-relative grading and access; [`schemas.md`](schemas.md) owns the native result and parent artifact mapping.

## Parent brief

Supply one run's actual authored outputs, the normalized expectations verbatim, and frozen starting-source excerpts or snapshot paths needed to judge fidelity. Supply inspection access for non-text outputs. Keep execution histories, Checks, gates, isolation proof and configuration labels outside the Grade brief; they cannot stand in for reading the writing. Writer, subject and grader are separate agents.

Dispatch native `prose-grader` with strict `outputSchema` `{grades:[{rubric,pass,reason}]}`: all fields required, boolean `pass`, exact rubric text/count/order, no extra properties. Give a yield-only result assignment; the parent writes `grading.json` after validation. Done when the fresh grader has the writing, complete required starting evidence and the exact rubric list.

## Grader steps

1. **Read.** Read every authored passage each rubric bears on, including the supplied starting sources for factual fidelity. Inspect actual non-text deliverables with the provided tools. Required inaccessible or truncated material is a blocker; yield an error naming it rather than partial grades. Done when every rubric's relevant output and starting evidence is available.
2. **Decide.** For each verbatim rubric, decide pass or fail from substantive behavior in the writing. A requested feature missing from a fully available output is a fail, not an evidence blocker. Exact-fidelity rubrics compare supplied quotations word-for-word. Reasons quote the passage that decides the verdict and cite the starting source when source-relative; for absence, quote the nearest relevant passage and explain what is missing. Done when each rubric has one boolean verdict and a reason traceable to the writing.
3. **Yield.** Return only `{grades:[{rubric,pass,reason}]}` matching the supplied `outputSchema`, preserving the exact input sequence. The result is pass/fail, without partial credit or numeric quality scores. Leave writing, criteria and snapshots unchanged. Done when every assigned rubric appears exactly once in the validated result, or a named evidence blocker has been returned.

## Parent mapping

Validate the complete native result before saving it. Map `rubric → text`, `pass → passed`, `reason → evidence` once into `<run-dir>/grading.json`, then derive counts and the pass rate under `schemas.md`. Save native completion/history and separate grader provenance under `eval-loop.md`. A malformed or incomplete result is a grading error, not a partially successful Grade. Done when the artifact preserves every rubric and quoted reason without rewriting, and its summary agrees with the booleans.
