# Run eval cases

Read this when a `dogfood` round's units include committed eval cases. `evals/README.md` holds the case contract this recipe runs: its Terms, Design, Safety, pass rule and Grounding. The recipe measures, and the skill text stays as found until step 4 of `dogfood` patches it.

## Select

Read the skill's case file: `.omp/skills/<skill>/evals/cases.yaml` when the skill is stored under `.omp/skills/`, otherwise `.agents/skills/<skill>/evals/cases.yaml`. Select the case ids the round's units list, or every case in the file when they list none. Each case gets one with-skill run, or one baseline run when `references/optimise.md` asks for it. **Done when** every selected id exists in the file and you have each one's `prompt`, `source_pages`, `raw_sources`, `fixtures`, `rubrics` and `subject`.

## Run a case

Steps 1 and 4 are native `task` dispatches; steps 2, 3 and 5 run in Bash from the repo root. Each step runs for every selected case at once, inside the run root and cleanliness check of [Concurrency and cleanliness](#concurrency-and-cleanliness); `$out` is a case's directory, `<run>/<case-id>`.

1. **Runner.** One `task` call contains every selected case:

   - `context`: `Eval Runner: follow your agent definition.` Criteria, rubrics and case files stay out of `context` and every `task`.
   - Each item: `agent: "test-subject"`, or `agent: "smart-test-subject"` when the case has `subject: smart`; `effort: "med"`; `name` the case id in CamelCase (`gold-caste-handout` → `GoldCasteHandout`); and `task` the line `Read <skill-dir>/SKILL.md and follow it.`, a blank line, the case `prompt` verbatim as the DM request, a blank line, then `Sources:` followed by one line per `source_pages` entry as `wiki/<path>`, one per `raw_sources` path and one per `fixtures` path.

   `<skill-dir>` is the skill's real directory: `.omp/skills/<skill>` when it lives there, otherwise `.agents/skills/<skill>`. A baseline omits the skill line and its blank line. `.omp/agents/test-subject.md` defines the read recipe and the reply format. The `Sources:` lines are the Runner's whole research, and its reply closes on its friction report, whose `Gap:` and `Friction:` lines feed Design and `dogfood` triage. **Done when** every Runner has finished or failed and you have each one's agent id from the task result: its `name`, or the suffixed id the result reports when that name was taken.

2. **Save and split** the reply into the output overlay, with `<id>` the Runner's agent id:

   ```bash
   out=<run>/<case-id>; mkdir -p "$out/outputs"; jq -rRs '(fromjson? // .) | if type == "object" and (.blocks | type) == "array" then ([(.summary // "") | tostring] + [.blocks[] | "````markdown file=\"\(.file)\"\n\(.content | rtrimstr("\n"))\n````"] + [(.removed // [])[] | strings | "````delete file=\"\(.)\"\n````"]) | join("\n\n") elif type == "object" then ((.data | strings) // ([.[] | strings] | max_by(length)) // tostring) else . end' agent://<id> > "$out/reply.txt"
   awk -v d="$out/outputs" -v fr="$out/friction.txt" '
   function fname(s) { s = substr(s, index(s, "file=\"") + 6); return substr(s, 1, length(s) - 1) }
   BEGIN { r = d "/reply.md"; printf "" > r; printf "" > fr }
   !f && /^````+markdown file=".+"$/ { fence = $0; sub(/markdown.*/, "", fence); f = d "/" fname($0); system("mkdir -p \"$(dirname \"" f "\")\""); printf "" > f; next }
   !f && /^````+delete file=".+"$/ { fence = $0; sub(/delete.*/, "", fence); del = del sep "\"" fname($0) "\""; sep = ","; f = "/dev/null"; next }
   f && $0 == fence { f = ""; next }
   !f && /^(Orchestrator|Model|Gap|Friction): / { print > fr; next }
   { print > (f ? f : r) }
   END { if (del) print "[" del "]" > (d "/.deleted.json") }' "$out/reply.txt"
   ```

   Read `$out/reply.txt` with `read` and use `glob` on `$out/outputs/**/*.md`. When the reply has no page blocks, take the directory from its `Drafts:` line and copy its pages with `cp -R <drafts>/. <out>/outputs/`.

   **Done when** `$out/outputs` contains each returned page at its Wiki-relative path, `reply.md`, and `.deleted.json` when the Runner removed pages, and `$out/friction.txt` holds the reply's friction report. The report stays outside `outputs`, so graders never see the skill paths it cites. The pages come from the reply's blocks, or from the directory its `Drafts:` line gives when the reply had no page block. A Runner that failed, or left neither page blocks nor a `Drafts:` directory with pages, is an execution error.

3. **Checks.**

   ```bash
   bun evals/check.ts <skill> <case-id> wiki --output "$out/outputs" > "$out/checks.txt" 2>&1; echo "exit $?" >> "$out/checks.txt"
   ```

   Add `--cases .omp/skills/<skill>/evals/cases.yaml` for a skill under `.omp/skills/`. `checks.txt` holds the case's Checks and its `statblock` lines, the statblock findings on the run's output pages: `FAIL` (error) fails the case and `WARN` (warning) passes. Exit 0 means ok, 1 a Check or statblock failure, 2 a usage or execution error. **Done when** `checks.txt` ends with the exit code.

4. **Grade**, for each case with `rubrics` or `source_pages`. First compare the family of `@PROSE-GRADER` with the model on each Runner's `Model:` line in `$out/friction.txt`; when they match, set another grader for this call by `.omp/AGENTS.md` **Model choice**. One `task` call contains every such case:

   - `context`: `Eval grader: follow your agent definition's Grade.`
   - Each item: `agent: "prose-grader"`, `name` the Runner's name plus `Grade` (`GoldCasteHandoutGrade`), `task` the grade brief, and this `outputSchema`:

     ```json
     {"type":"object","required":["grades"],"properties":{"grades":{"type":"array","items":{"type":"object","required":["rubric","pass","reason"],"properties":{"rubric":{"type":"string"},"pass":{"type":"boolean"},"reason":{"type":"string"}}}}}}
     ```

   The grade brief lists the case `rubrics` verbatim and numbered, then, for a case with `source_pages`, the `evals/README.md` § Wiki agreement criterion verbatim as the last numbered item; `Outputs: <run>/<case-id>/outputs (pages, reply.md, .deleted.json)` with the literal path; and `Sources:` each `source_pages` entry as `wiki/<path>`, plus each `raw_sources` and `fixtures` path. Grading is blind: no brief says baseline or with-skill, and a baseline gets its own run root so no path names it either.

   Save each grader's output to its case directory as it returns, in Bash with the grader's agent id: `cp agent://<id> <run>/<case-id>/grades.json`. Steps 5 and 6 read grades from that file. **Done when** every graded case's `grades.json` holds its grades JSON, or the grading error is named.

5. **Human-audit page**, one per case, for the DM's review. Create the audit root once per session with `cd "$(mktemp -d)" && pwd -P` beneath OS `$TMPDIR` and reuse it for every later run. Write `<audit>/<skill>/<case-id>.md` holding the case's current sample: the Runner task, `reply.md`, each output page, `friction.txt`, `checks.txt`, then each criterion beside its grade and reason. Each run overwrites the case's page. **Done when** every selected case has its page from this run.

6. **Classify** each case by the `evals/README.md` pass rule: pass, quality failure, execution error or grading error, backed by its Checks summary line and grade entries. Its row in the `dogfood` round table gives criteria passed out of total (Checks plus graded criteria); list each failed Check and graded criterion with its reason, each error, and the case's `friction.txt` lines under the table. Report unexecuted ids by id, never as passes. **Done when** every selected id has one class.

## Concurrency and cleanliness

Batch each step across the selected cases with one `task` call for all Runners and one for all graders. Each provider's cap queues them. Run steps 2 and 3 for every case in one Bash call for the whole batch. Because shell variables end with each Bash call, spell `<run>` out as the literal path in every call. Before step 1, open the run root and record the Wiki state:

```bash
run=$(cd "$(mktemp -d)" && pwd -P); git status --porcelain wiki raw archive > "$run/wiki-before.txt"; echo "$run"   # pwd -P: readRunnerOutput needs a canonical path (macOS /var → /private/var)
```

After step 4, compare:

```bash
git status --porcelain wiki raw archive | cmp -s <run>/wiki-before.txt - && echo clean || echo "WIKI CHANGED"
```

`WIKI CHANGED` is an isolation failure: report it in the round and leave the files for the DM. The run root is temporary, and reports go in chat or on the tracking issue. Export a file from it only when the DM asks. Every skill file is byte-identical at Classify to its state at Select.

## Weekly feedback

Playtest drives these beats; table feeling is a Sample for Design, never a merge gate.

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies. Record the Session number and affected Wiki pages. State what failed or worked at the table and the expected behaviour, with a concrete quotation or example. Keep this development evidence on a GitHub issue. Ingest actual Session events into Canon through the normal Ingest workflow. **Done when** the report and source paths are reachable without relying on chat memory.
2. **Add the criterion.** Express a reported defect as a Check or rubric on consumer-visible behaviour, on the skill's default case, or on a unique-circumstance case when the default case cannot expose it (`evals/README.md` § Design step 2). Link the issue in a `#` comment beside the criterion. A requested task is not evidence that its alleged failure occurred. **Done when** the criterion can be decided from the saved outputs and the live sources the case names.
3. **Improve.** A DM-started `dogfood` run takes the case as its unit and its failed criteria as findings. Attach each round's table and findings to the issue. **Done when** the issue contains the run's round reports.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow. Eval outputs are not added to the Wiki on their own. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed issues for completed changes with their evidence. Reopen or file a new issue when play exposes another defect.
