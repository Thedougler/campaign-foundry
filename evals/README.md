# Shattered Sea skill evals

This document defines the procedure for skill evals. It covers suite design and case runs, skill measurement and improvement, authoring and benchmarking, and the safety and grounding of that work. Read it before running or grading a case. Also read it before changing a skill a suite measures, authoring paired measurements or processing home-Session feedback. Each branch references its section or invocation skill. Those skills contain the branch's steps. This document defines the policy and per-case recipe.

- **Design** a suite using [Design](#design), before a suite measures a content skill and whenever a criterion proves broken.
- **Eval** a skill: `skill://run-evals`: [Run a case](#run-a-case) for each selected case, then a report. Measurement only.
- **Hillclimb** a content skill using [Hillclimb](#hillclimb), once Design allows.
- **Author** a skill: `skill://skill-creator`, paired with-skill/baseline runs. After the skill exists and has a Design'd suite, further quality work is Hillclimb.
- **Benchmark** Narration: `skill://dnd-benchmark` on DM request. See [Narration benchmark inputs](#narration-benchmark-inputs) for its sources. Its Grades from 1 to 5 rank models. Hillclimb keeps and reverts on Eval criteria alone.
- **Playtest** feedback follows [Weekly feedback](#weekly-feedback).
- **Use skills or a process on real work**: `skill://dogfood`, DM-activated. Subagents do real work with them and `skill-writer` revises the text between iterations. This does not use cases or Grades.

Runners and graders are native `task` dispatches of read-only agents; description trigger checks and Benchmark runs are read-only `omp -p` processes launched from Bash ([Safety](#safety), ADR 0016).

## Terms

Each term is defined here once. Skills and instruction files use these terms.

- **Sample** is a DM ask taken from production: a home-Session report, a GitHub issue or a recovered DM ask.
- **Default case** is the one case for a content skill's content type in its `evals/cases.yaml`. It is a Sample asking for a complete piece of that type. Its rubrics together define professional-quality content of that type, including Narration (ADR 0017). It passes only when every criterion holds.
- **Runner** is the `test-subject` dispatch that performs a case's DM ask from the skill, the template, `campaign-config.md` and the case's listed sources alone, and returns its pages and DM reply as its result.
- **Outcome** is `createOutcome(vault, outputRoot)` in `evals/check.ts`. It overlays the run's `$out/outputs` pages on the live Wiki pages and hides live pages whose deletion the run recorded. It also includes `reply.md`, the DM reply. Checks and Grades judge the Outcome, not the tool-call path.
- **Check** is `bun evals/check.ts` (pages, sections, canon/absent regex) on a constrained Outcome: a page the run itself returned (a live page the Runner left untouched fails `pages`), `type: Handout`, text the Runner must leave untouched. The same invocation then runs the gate's `style` and `narration` layers read-only over the Outcome (`runGate` in `evals/check.ts`). Findings are scoped to the run's output pages. A gate error fails the case like a Check failure, while a gate warning is reported (`WARN`) and passes, following the gate's own severities (ADR 0015). The cheapest grader. A rubric that restates a Check is a defective rubric. Move it to `checks`.
- **Grade** means `prose-grader` reads the writing and quotes it. Each rubric is a checkable claim about meaning and intent: does the table get the situation? This is creative writing, so no rubric requires verbatim wording, and copying a source's prose is a weakness rather than fidelity. "Intact" or "kept" means sections, facts and callout titles, not whitespace or formatting. Skill-eval Grades are pass/fail. Benchmark Grades are from 1 to 5. The grading model is never the model under test. Grades score skills. The File gate is deterministic (ADR 0010).
- **Jev** (`judge` / `judge_batch` in `eval`) means bounded labels over a small state. It is not a Grade of Narration.
- **Baseline run** is a Runner run of a case without the skill line ([Run a case](#run-a-case) step 1).
- **Eval** means [Run a case](#run-a-case) over selected cases: one Runner per case against the read-only live Wiki and a report for every selected id. An Eval leaves skill text unchanged. It answers two questions, using one or two Runner runs for each. To determine whether the skill passes each criterion, use one with-skill run per case. To determine whether the skill helps or hurts, compare that run with a baseline run criterion by criterion. Each verdict is pass/fail per criterion from one run.
- **Attributable** files are the files a Hillclimb patch touches: the skill's `SKILL.md` and its pointers. Harness files (`evals/check.ts`, `evals/outputs.ts`, `evals/subject.config.yml`) and case files change only outside the climb.
- **Hillclimb** means rounds of one attributable patch each, kept when failures went down and nothing new broke.
- **Benchmark** is requested cross-family Matrix ranking of Narration on committed excerpts (ADR 0012), separate from skill pass/fail.
- **Playtest** is the weekly home Session: production monitoring that feeds Sample and never replaces Eval.

## Design

Apply to a content skill's committed `evals/cases.yaml` before a Hillclimb. Record a one-line verdict per case at the head of the skill's climb log, `.agents/skills/<skill>/evals/climb.md`.

Every case is a tightly scoped, realistic DM ask. Its prompt states its target page and the concrete situation, never "whatever X leaves us with", and its `source_pages` list every page the ask needs, the target page and each page the prompt mentions included. The Runner reads only those, so a fact the ask needs and they lack is a case defect: repair it here.

1. **Default case.** The suite contains one default case. It is a natural DM ask for a complete piece of the content type with current Shattered Sea `source_pages` / `raw_sources` (see Grounding). Its rubrics state professional quality for the type: table-ready, correct under the 2024 rules and balanced where it has mechanics, consistent with Canon, specific rather than generic, and Narration slots that meet `theatre-of-the-mind`. Done when the case exercises every part of the type's template and its rubrics cover each quality.
2. **Extra cases.** Add a case only for a unique circumstance the default case cannot expose, such as chat-only delivery, a Handout or revising a whole Session's Narration. Put a one-line `#` comment above it stating the circumstance. A suite may also contain one adversarial case. Mark it as adversarial in its `#` comment. Its prompt pushes the skill toward a known defect: quietly rewriting established Canon, lore-dump delivery, a predetermined ending or a single-Clue dependency. The rubrics pass when the skill refuses or redesigns the request, or offers its own alternative in the skill's terms. Trigger accuracy belongs to description evals in `skill-creator`, DM-gated. Done when every extra case has its comment and no case repeats what the default case covers.
3. **Grader.** Constrained facts are Checks, and open craft is Grades whose claims two DMs would decide alike from the same starting Wiki. We grade intent, not exact wording. Checks pin structure (a page, `type:`, a callout title) and text the Runner must leave untouched, and never the wording of what the Runner writes. Rubrics name facts and craft, so a Runner-chosen filename, a reworded line or a paraphrased source fact passes. A criterion that fails content meeting it is broken: repair it here. Done when every criterion sits on the right side of the Check/Grade split.
4. **Discriminating.** Run each case once as a baseline run. If a case passes on that run, it cannot show that the skill helps. Harden it by adding a criterion for a quality the type demands and an unskilled run misses, or by pointing the prompt at a source an unskilled run mishandles. Rerun its baseline after hardening it, or retire the case instead. Done when every remaining case fails at least one criterion on its baseline run and the log lists each hardened or retired case.

**Done when** steps 1 to 4 hold for every case. Non-content skills (`audit`, `ingest`, `query`, `lint`, `plan-session`, `pull-pcs`) keep their cases and take steps 3 to 4 when the DM asks to measure them. Otherwise the log records the skip.

## Safety

Eval processes read the live Wiki and cannot change it:

- **Runners and graders** are native `task` dispatches of `test-subject` and `prose-grader`, whose frontmatter `tools:` is read-only except the Runner's `bash`: `read`, `grep`, `glob` for the grader, `read` and `bash` for the Runner. The Runner's `bash` runs diagnostic CLI such as `cf encounter-budget` and `cf style`, and writes the Runner's page drafts into one `mktemp -d` directory beneath `$TMPDIR`. `cf style` is the eval gate for drafts outside the Wiki, and `cf check` covers Wiki pages in the Wiki run that files them. A dispatch also gets `yield`, `context_notes`, `new_context` and a `write` that reaches only `xd://` devices, which cannot write files, and it receives neither DM decision memory nor `manage_skill`.
- **CLI processes** (description trigger checks (`skill://skill-creator`) and Benchmark runners and Judge (`skill://dnd-benchmark`)) run `omp -p` from Bash. `--tools read,grep,glob…` brings the same `xd://`-only `write`, and `--no-tools` brings none. `--config evals/subject.config.yml` turns DM decision memory and autolearn off. Runs do not see or feed DM memory. These processes run without `manage_skill`.
- QMD search, for eval authoring ([Grounding](#grounding)), runs through the `xd://` devices: `write` JSON to `xd://mcp__qmd_query` and `xd://mcp__qmd_get` (`read xd://mcp__qmd_query` for the schema), over the existing live index. Runners do not search. Eval work never copies or rebuilds an index.

Answer isolation means the Runner leaves `evals/`, case files and rubrics unread. This instruction is in `.omp/agents/test-subject.md`, backed by dispatches whose `context` and `task` contain no criteria. Each Eval still ends with the cleanliness check in [Concurrency and cleanliness](#concurrency-and-cleanliness).

## Run a case

The one recipe for every Eval and paired authoring run. Steps 1 and 4 are native `task` dispatches; steps 2, 3 and 5 run in Bash from the repo root. Each step runs for every selected case at once, inside the run root and cleanliness check of [Concurrency and cleanliness](#concurrency-and-cleanliness); `$out` is a case's directory, `<run>/<case-id>`.

1. **Runner.** One `task` call contains every selected case:

   - `context`: `Eval Runner: follow your agent definition.` Criteria, rubrics and case files stay out of `context` and every `task`.
   - Each item: `agent: "test-subject"`, `effort: "med"`, `name` the case id in CamelCase (`gold-caste-handout` → `GoldCasteHandout`), and `task` the line `Read <skill-dir>/SKILL.md and follow it.`, a blank line, the case `prompt` verbatim as the DM request, a blank line, then `Sources:` followed by one line per `source_pages` entry as `wiki/<path>` and one per `raw_sources` path.

   `<skill-dir>` is the skill's real directory: `.omp/skills/<skill>` when it lives there, otherwise `.agents/skills/<skill>`. A baseline omits the skill line and its blank line. An old-skill run points it at a `cp -r` snapshot of the skill directory in a `mktemp -d` directory. `.omp/agents/test-subject.md` defines the read recipe and the reply format. The `Sources:` lines are the Runner's whole research, and each `Gap:` line in its reply reports a hole in the skill, template or case for Design or Hillclimb. Done when every Runner has finished or failed and you have each one's agent id from the task result: its `name`, or the suffixed id the result reports when that name was taken.

2. **Save and split** the reply into the output overlay, with `<id>` the Runner's agent id:

   ```bash
   out=<run>/<case-id>; mkdir -p "$out/outputs"; cat agent://<id> | jq -rRs '(fromjson? // .) | if type == "object" and (.blocks | type) == "array" then ([(.summary // "") | tostring] + [.blocks[] | "````markdown file=\"\(.file)\"\n\(.content | rtrimstr("\n"))\n````"] + [(.removed // [])[] | strings | "````delete file=\"\(.)\"\n````"]) | join("\n\n") elif type == "object" then ((.data | strings) // ([.[] | strings] | max_by(length)) // tostring) else . end' > "$out/reply.txt"   # agent:// serves the yielded reply JSON-encoded; a Runner that yields an object with blocks[] gets them rendered as file blocks, and one with a string .data gets that string
   awk -v d="$out/outputs" '
   function fname(s) { s = substr(s, index(s, "file=\"") + 6); return substr(s, 1, length(s) - 1) }
   BEGIN { r = d "/reply.md"; printf "" > r }
   !f && /^````+markdown file=".+"$/ { fence = $0; sub(/markdown.*/, "", fence); f = d "/" fname($0); system("mkdir -p \"$(dirname \"" f "\")\""); printf "" > f; next }
   !f && /^````+delete file=".+"$/ { fence = $0; sub(/delete.*/, "", fence); del = del sep "\"" fname($0) "\""; sep = ","; f = "/dev/null"; next }
   f && $0 == fence { f = ""; next }
   { print > (f ? f : r) }
   END { if (del) print "[" del "]" > (d "/.deleted.json") }' "$out/reply.txt"
   drafts=$(sed -n 's/^Drafts: //p' "$out/reply.txt" | tail -n 1)   # a reply that carried no page block falls back to the Runner's gated drafts
   if [ -z "$(find "$out/outputs" -type f -name '*.md' ! -path "$out/outputs/reply.md" -print -quit)" ] && [ -d "$drafts" ]; then cp -R "$drafts/." "$out/outputs/"; fi
   ```

   Done when `$out/outputs` contains each returned page at its Wiki-relative path, `reply.md`, and `.deleted.json` when the Runner removed pages. The pages come from the reply's blocks, or from the directory its `Drafts:` line gives when the reply had no page block. A Runner that failed, or left neither page blocks nor a `Drafts:` directory with pages, is an execution error.

3. **Checks.**

   ```bash
   bun evals/check.ts <skill> <case-id> wiki --output "$out/outputs" > "$out/checks.txt" 2>&1; echo "exit $?" >> "$out/checks.txt"
   ```

   Add `--cases .omp/skills/<skill>/evals/cases.yaml` for a skill under `.omp/skills/`. The gate runs here too: `gate` lines report findings on the run's output pages, `FAIL` (error) fails the case, `WARN` (warning) passes but travels in `checks.txt`. Exit 0 means ok, 1 a Check or gate-error failure, 2 a usage or execution error. Done when `checks.txt` ends with the exit code.

4. **Grade**, for each case with `rubrics`. One `task` call contains every such case:

   - `context`: `Eval grader: follow your agent definition's Grade.`
   - Each item: `agent: "prose-grader"`, `name` the Runner's name plus `Grade` (`GoldCasteHandoutGrade`), `task` the grade brief, and this `outputSchema`:

     ```json
     {"type":"object","required":["grades"],"properties":{"grades":{"type":"array","items":{"type":"object","required":["rubric","pass","reason"],"properties":{"rubric":{"type":"string"},"pass":{"type":"boolean"},"reason":{"type":"string"}}}}}}
     ```

   The grade brief lists the case `rubrics` verbatim and numbered; `Outputs: <run>/<case-id>/outputs (pages, reply.md, .deleted.json)` with the literal path; and `Sources:` each `source_pages` entry as `wiki/<path>`, plus each `raw_sources` path. Grading is blind: no brief says baseline, with-skill or old-skill, and a baseline gets its own run root so no path names it either. Once the batch settles, save each result in one Bash call with its grader's agent id: `cp agent://<id> <run>/<case-id>/grades.json`. Done when every graded case's `grades.json` holds its grades JSON, or the grading error is named.

5. **Human-audit page**, one per case, for the DM's review. Create the audit root once per session with `cd "$(mktemp -d)" && pwd -P` beneath OS `$TMPDIR` and reuse it for every later run. Write `<audit>/<skill>/<case-id>.md` holding the case's current sample: the Runner task, `reply.md`, each output page, `checks.txt`, then each criterion beside its grade and reason. Each run overwrites the case's page. Done when every selected case has its page from this run. The pages stay in the temp directory unless the DM asks to export them.

### Pass rule

A case passes when Checks exit 0 and `grades.json` parses with one entry per rubric, every `pass` true (a case without rubrics needs Checks alone). Classify every other case for the report:

- **Quality failure** means Checks exit 1, or a grade with `pass: false`.
- **Execution error** means the Runner failed or timed out, the Runner did not return a result, or Checks exit 2.
- **Grading error**: the grader failed, or `grades.json` is invalid. Invalid means it is not the specified JSON, is missing a rubric or contains `{"error":…}`.

Errors are named prerequisites: neither quality failures nor passes. The suite score is the fraction of selected cases that pass. Report model identity, thinking and metrics only where observed. Compare a pair only when identity and thinking match.

### Concurrency and cleanliness

Batch each step across the selected cases with one `task` call for all Runners and one for all graders. Each provider's cap queues them. Run steps 2 and 3 for every case in one Bash call for the whole batch. Because shell variables end with each Bash call, spell `<run>` out as the literal path in every call. Before step 1, open the run root and record the Wiki state:

```bash
run=$(cd "$(mktemp -d)" && pwd -P); git status --porcelain wiki raw archive > "$run/wiki-before.txt"; echo "$run"   # pwd -P: readRunnerOutput needs a canonical path (macOS /var → /private/var)
```

After step 4, compare:

```bash
git status --porcelain wiki raw archive | cmp -s <run>/wiki-before.txt - && echo clean || echo "WIKI CHANGED"
```

`WIKI CHANGED` is an isolation failure: report it and leave the files for the DM. The run root is temporary; reports go in chat or a file the DM names, and nothing persists unless the DM asks.

## Hillclimb

Start when Design holds for the suite and the live Wiki pages of that content type already pass `cf check` with 0 errors. Do not climb while templates or skill text instruct agents to use wording the gate flags. Clean the Wiki first. Leave skills unchanged until that content is clean.

Every Eval is `skill://run-evals` with one with-skill run per case. Prove a patch only on the patched skill's own cases, as few as one. Include each case with a criterion the patch targets, plus each other case of that skill whose criteria the patch could break. A shared skill with no cases of its own, such as `theatre-of-the-mind`, is proven on the content skill's case whose failing criterion prompted the patch. A case that passed earlier this session may be skipped until a patch changes the skill enough to break it. Then rerun it.

1. **Start.** Eval the cases. Done when the log lists every criterion's pass/fail.
2. **Patch.** Snapshot the attributable files, then dispatch `skill-writer` with them and the failed criteria written as process defects (the behaviour that went wrong, in the writer's terms rather than case text). Done when the round has one patch.
3. **Rerun.** Eval the same cases once more. Done when every criterion has this round's verdict.
4. **Keep or revert.** Keep when failures went down and nothing new broke: at least one failing criterion now passes and no criterion that passed before now fails. Otherwise restore the snapshot. The rerun's verdicts decide. A flip stands without a confirming run. Done when the log records the round's patch summary, flipped criteria and decision.
5. **Stop** when every criterion passes or after three reverted rounds; otherwise return to Patch. Done when the log ends with final criteria against the start and every case id accounted for.

The climb log, `.agents/skills/<skill>/evals/climb.md`, is the climb's durable export: the orchestrator commits it with the case edits and the skill as of the last kept patch (pre-climb when none was kept). Runner outputs, Grades and human-audit pages stay in their temporary directories.

## Grounding

The DM's weekly home Sessions playtest the Wiki and the skills that produce it. **The Shattered Sea** World and its **Shattered Sea** Campaign are the input source for every active skill eval: committed cases, paired authoring evals and Narration benchmark prompts. The Agent works between Sessions. The DM and Players supply table evidence.

When authoring or changing eval inputs, search with QMD and retrieve the hits, then read the Campaign's `hot.md`, World `index.md`, available last ten `log.md` entries and source pages. Read current templates for output shape. Canon comes from the Wiki. Raw and Archive establish provenance. Distinguish played events from Prep, missing information from established facts, and requested new output from existing Canon. In a run the Runner reads the skill, the template, `campaign-config.md` and the case's listed sources, then writes, without searching (`.omp/agents/test-subject.md`). For evals only, this replaces the earlier practice of Runners searching the Wiki as production does. Production agents still search. Cases ask about pages as they currently stand; Grades judge changing facts and quotations against the live sources, not cached factual literals.

Each committed case records:

- `source_pages`: existing Wiki-relative Shattered Sea pages with its facts and context, including the target page and every page the prompt mentions. The grader reads them as the truth. The Runner reads them as its whole research ([Design](#design)).
- `raw_sources`, when the ask concerns Raw or Archive material: existing repo-relative live `raw/` or `archive/` inputs.
- `prompt`, deterministic `checks` and independent `rubrics`: a natural DM ask and private criteria for observable behavior grounded in those inputs.

Migrate still-useful criteria to real sources as you go. A reported issue adds a criterion. It does not add a case unless it is a unique circumstance. Synthetic Worlds, invented Transcripts and hand-written replacement source pages are not skill-eval inputs. Software unit-test fixtures remain separate. Historical eval artifacts remain unchanged, and historical `docs/intent/**/evals/evals.json` is intent, not an executable input source.

Use recovered production asks where available, preserving the DM's intent and table facts rather than adding answer hints or evaluator instructions. The Runner task contains the skill line, the ask and its `Sources:` lines, and `.omp/agents/test-subject.md` supplies the read recipe. Keep useful grounded adaptations labelled as adaptations: source provenance is not proof that a creation request was recovered.

House Rule coverage ingests the recovered Archive Mortis (`archive/mortis.md`, `archive/mortis-dm-guide.md`). An Ingest case specifies its live `archive/` input in the ask, and the Runner returns the resulting pages. If a case's ask is a grounded adaptation rather than a recovered DM ask, state that in its `#` comment. Successor-Campaign and `pull-pcs` `public-sheets` use the four public D&D Beyond URLs on the existing PC pages. Original PC-creation asks remain unrecovered.

## Weekly feedback

Playtest drives these beats; table feeling is a Sample for Design, never a merge gate.

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies. Record the Session number and affected Wiki pages. State what failed or worked at the table and the expected behavior, with a concrete quotation or example. Keep this development evidence on a GitHub issue. Ingest actual Session events into Canon through the normal Ingest workflow. Done when the report and source paths are reachable without relying on chat memory.
2. **Add the criterion.** Express a reported defect as a Check or rubric on consumer-visible behaviour, on the skill's default case, or on a unique-circumstance case when the default case cannot expose it (Design step 2). Link the issue in a `#` comment beside the criterion. A requested task is not evidence that its alleged failure occurred. Done when the criterion can be decided from the saved outputs and the live sources the case names.
3. **Eval, then climb.** Eval the case with `skill://run-evals` and attach the report to the issue. Skill text changes through a Hillclimb once Design holds for the suite. Done when the issue contains the case's report and, when a climb ran, its kept or reverted outcome from `.agents/skills/<skill>/evals/climb.md`.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow. Eval outputs are not added to the Wiki on their own. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed issues for completed changes with their evidence. Reopen or file a new issue when play exposes another defect.

## Narration benchmark inputs

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts explicitly from current sources. Exclude existing Narration answers. Preserve uncertain dates and unresolved outcomes. Commit changed prompts and regenerate briefs with `cf bench briefs`. The prompt-set hash identifies the new inputs. Old sample directories and grades remain historical evidence, not results for the new prompt version.
