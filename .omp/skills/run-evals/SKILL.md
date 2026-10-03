---
name: run-evals
description: Eval — run or rerun committed skill evals after a request or reported defect, and report. Authoring goes to skill-creator; Matrix ranking to dnd-benchmark; improving a live content skill to the Hillclimb in evals/README.md.
---

# Run skill evals

This skill is the Eval branch of `evals/README.md`, which defines the terms and owns safety, grounding, the per-case recipe ([Run a case](../../../evals/README.md#run-a-case)) and the pass rule. An Eval measures and reports; skill text stays as found. After the report, the parent decides whether Design allows a Hillclimb.

## Steps

1. **Select.** Read the skill's case file — `.omp/skills/<skill>/evals/cases.yaml` when the skill lives there, otherwise `.agents/skills/<skill>/evals/cases.yaml`. The case ids the DM or parent named are the selection; otherwise every case in the file. Then read `evals/README.md` [Run a case](../../../evals/README.md#run-a-case). Done when every selected id exists in the file and you hold each one's `prompt`, `source_pages`, `raw_sources` and `rubrics`.
2. **Run.** Follow [Run a case](../../../evals/README.md#run-a-case) for every selected case at once, as its [Concurrency and cleanliness](../../../evals/README.md#concurrency-and-cleanliness) section batches it: record the run root, one `task` batch of Runners, one Bash call to save, split and Check every reply, one `task` batch of graders for the cases with rubrics, then the cleanliness check. Done when every selected case's `<run>/<case-id>` holds `reply.txt`, `checks.txt`, and `grades.json` when the case has rubrics — or the case's execution or grading error is named — and the cleanliness check has printed its verdict.
3. **Collect.** Read each case's `checks.txt` and `grades.json` and classify the case by the README [pass rule](../../../evals/README.md#pass-rule): pass, quality failure, execution error or grading error. Done when every selected id has one class backed by its Check summary line and its grade entries.
4. **Report.** Per case: Checks passed/total, rubrics passed/total, each failed Check and rubric with its reason, and any named error. Then the suite score — passing cases over selected cases — and the cleanliness result. Done when the report accounts for every selected id, unexecuted ids are named rather than counted as passes, the cleanliness check printed `clean` (a `WIKI CHANGED` is reported as an isolation failure), and every skill file is byte-identical to its state at Select.
