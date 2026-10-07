# Shattered Sea skill evals

This document is the sole procedure for skill evals: designing suites, running cases, measuring and improving skills, authoring and benchmarking, with their safety and grounding. Read it before running or grading a case, changing a skill a suite measures, authoring paired measurements, or processing home-Session feedback. Each branch names its section or invocation skill; those skills carry the branch's steps, and the policy and the per-case recipe stay here.

- **Design** a suite — [Design](#design), before a suite measures a content skill and whenever a criterion proves broken.
- **Eval** a skill — `skill://run-evals`: [Run a case](#run-a-case) for each selected case, then a report. Measurement only.
- **Hillclimb** a content skill — [Hillclimb](#hillclimb), once Design allows.
- **Author** a skill — `skill://skill-creator`, paired with-skill/baseline runs. After the skill exists and has a Design'd suite, further quality work is Hillclimb.
- **Benchmark** Narration — `skill://dnd-benchmark` on DM request; [Narration benchmark inputs](#narration-benchmark-inputs) for its sources. Its 1–5 Grades rank models; Hillclimb keeps and reverts on Eval criteria alone.
- **Playtest** feedback — [Weekly feedback](#weekly-feedback).
- **Dogfood** skills or a process — `skill://dogfood`, DM-activated: subagents do real work with them and `skill-writer` revises the text between iterations; no cases or Grades.

Runners and graders are native `task` dispatches of read-only agents; description trigger checks and Benchmark runs are read-only `omp -p` processes launched from Bash ([Safety](#safety), ADR 0016).

## Terms

Each term is defined here once; skills and instruction files use it as named.

- **Sample** — a DM ask taken from production: a home-Session report, a GitHub issue or a recovered DM ask.
- **Default case** — the one case a content skill's `evals/cases.yaml` holds for its content type: a Sample asking for a complete piece of that type, whose rubrics together define professional-quality content of it, Narration included (ADR 0017). It passes only when every criterion holds.
- **Runner** — the `test-subject` dispatch that performs a case's DM ask and returns its pages and DM reply as its result.
- **Outcome** — `createOutcome(vault, outputRoot)` in `evals/check.ts`: the live Wiki pages with the run's `$out/outputs` pages overlaid and its recorded deletions shadowing live pages, plus `reply.md`, the DM reply. Checks and Grades judge the Outcome, not the tool-call path.
- **Check** — `bun evals/check.ts` (pages, sections, canon/absent regex) on a constrained Outcome: a page exists, `type: Handout`, text the Runner must leave untouched. The cheapest grader. A rubric that restates a Check is a defective rubric; move it to `checks`.
- **Grade** — `prose-grader` reads the writing and quotes it. Each rubric is a checkable claim about meaning and intent: does the table get the situation? This is creative writing, so no rubric requires verbatim wording, and copying a source's prose is a weakness rather than fidelity. "Intact" or "kept" means sections, facts and callout titles, not whitespace or formatting. Skill-eval Grades are pass/fail; Benchmark Grades are 1–5. The grading model is never the model under test. Grades score skills; the File gate stays deterministic (ADR 0010).
- **Jev** (`judge` / `judge_batch` in `eval`) — bounded labels over a small state. It is not a Grade of Narration.
- **Eval** — [Run a case](#run-a-case) over selected cases: one Runner per case against the read-only live Wiki and a report for every selected id. An Eval leaves skill text unchanged.
- **Attributable** — the surface a Hillclimb patch touches: the skill's `SKILL.md` and its pointers. Harness files (`evals/check.ts`, `evals/outputs.ts`, `evals/subject.config.yml`) and case files change only outside the climb.
- **Hillclimb** — rounds of one attributable patch each, kept only when it fixes a failing criterion and breaks none that passed.
- **Benchmark** — requested cross-family Matrix ranking of Narration on committed excerpts (ADR 0012), separate from skill pass/fail.
- **Playtest** — the weekly home Session: production monitoring that feeds Sample and never replaces Eval.

## Design

Apply to a content skill's committed `evals/cases.yaml` before a Hillclimb. Record a one-line verdict per case at the head of the skill's climb log, `evals/climbs/<skill>.md`.

1. **Default case.** The suite holds one default case: a natural DM ask for a complete piece of the content type with current Shattered Sea `source_pages` / `raw_sources` (see Grounding). Its rubrics state professional quality for the type — table-ready, correct under the 2024 rules and balanced where it has mechanics, consistent with Canon, specific rather than generic, and Narration slots that meet `theatre-of-the-mind`. Done when the case exercises every part of the type's template and its rubrics cover each quality.
2. **Extra cases.** Add a case only for a unique circumstance the default case cannot expose — chat-only delivery, a Handout, revising a whole Session's Narration — with a one-line `#` comment above it naming the circumstance. A suite may also hold one adversarial case, its `#` comment naming it adversarial, whose prompt pushes the skill toward a known defect — quietly rewriting established Canon, lore-dump delivery, a predetermined ending, a single-Clue dependency — and whose rubrics pass when the skill refuses, redesigns or offers its own alternative in the skill's terms. Trigger accuracy belongs to description evals in `skill-creator`, DM-gated. Done when every extra case has its comment and no case repeats what the default case covers.
3. **Grader.** Constrained facts are Checks, and open craft is Grades whose claims two DMs would decide alike from the same starting Wiki. We grade intent, not exact wording. Checks pin structure (a page, `type:`, a callout title) and text the Runner must leave untouched, and never the wording of what the Runner writes. Rubrics name facts and craft, so a Runner-chosen filename, a reworded line or a source fact in other words passes. A criterion that fails content meeting it is broken: repair it here. Done when every criterion sits on the right side of the Check/Grade split.
4. **Variance.** Do not re-run Grade on the same saved `$out/outputs`. Compare Grades only when two distinct Runner identities produced Outcomes for the same case. Timeouts, execution and grading errors are named prerequisites, not quality failures. Done when the log records the skip, or that cross-identity comparison.
5. **Calibration.** Write one scored trial — Runner task and reply, Outcome, Checks and Grades — to a human-audit page `<audit>/<skill>/<case-id>.md`, where `<audit>` is a fresh `mktemp -d` directory outside the repository; read it, and record agree/disagree per rubric. A disagreement repairs the rubric or the case. Done when every audited rubric has a verdict.

**Done when** steps 1–5 hold for every case. Non-content skills (`audit`, `ingest`, `query`, `lint`, `plan-session`, `pull-pcs`) keep their cases and take steps 3–5 when the DM asks to measure them; otherwise the log records the skip.

## Safety

Every eval process reads the live Wiki and cannot change it:

- **Runners and graders** are native `task` dispatches of `test-subject` and `prose-grader`, whose frontmatter `tools:` is read-only except Runner `bash` for diagnostic CLI such as `cf encounter-budget`: `read`, `grep`, `glob`, plus `web_search` and `bash` for the Runner. A dispatch also carries `yield`, `context_notes`, `new_context` and a `write` that reaches only `xd://` devices, which cannot write files, and it receives neither DM decision memory nor `manage_skill`.
- **CLI processes** — description trigger checks (`skill://skill-creator`) and Benchmark runners and Judge (`skill://dnd-benchmark`) — run `omp -p` from Bash. `--tools read,grep,glob…` brings the same `xd://`-only `write`, and `--no-tools` brings none. `--config evals/subject.config.yml` turns DM decision memory and autolearn off, so runs neither see nor feed DM memory and carry no `manage_skill`.
- QMD search runs through the `xd://` devices: `write` JSON to `xd://mcp__qmd_query` and `xd://mcp__qmd_get` (`read xd://mcp__qmd_query` for the schema), over the existing live index. Eval work never copies or rebuilds an index.

Answer isolation — the Runner leaves `evals/`, case files and rubrics unread — is an instruction in `.omp/agents/test-subject.md`, backed by dispatches whose `context` and `task` carry no criteria. Each Eval still ends with the cleanliness check in [Concurrency and cleanliness](#concurrency-and-cleanliness).

## Run a case

The one recipe for every Eval, paired authoring run and re-Grade. Steps 1 and 4 are native `task` dispatches; steps 2 and 3 run in Bash from the repo root. Each step runs for every selected case at once, inside the run root and cleanliness check of [Concurrency and cleanliness](#concurrency-and-cleanliness); `$out` is a case's directory, `<run>/<case-id>`.

1. **Runner.** One `task` call holds every selected case:

   - `context`: `Eval Runner: follow your agent definition.` Criteria, rubrics and case files stay out of `context` and every `task`.
   - Each item: `agent: "test-subject"`, `effort: "med"`, `name` the case id in CamelCase (`gold-caste-handout` → `GoldCasteHandout`), and `task` the line `Read <skill-dir>/SKILL.md and follow it.`, a blank line, then the case `prompt` verbatim as the DM request.

   `<skill-dir>` is the skill's real directory: `.omp/skills/<skill>` when it lives there, otherwise `.agents/skills/<skill>`. A baseline omits the skill line and its blank line; an old-skill run points it at a `cp -r` snapshot of the skill directory in a `mktemp -d` directory. `.omp/agents/test-subject.md` owns the production start tour and the reply format, and the Runner finds the case's sources by search as production does, so `source_pages` stay out of the task. Done when every Runner has finished or failed and you hold each one's agent id from the task result — its `name`, or the suffixed id the result reports when that name was taken.

2. **Save and split** the reply into the output overlay, with `<id>` the Runner's agent id:

   ```bash
   out=<run>/<case-id>; mkdir -p "$out/outputs"; cat agent://<id> | jq -rRs '(fromjson? // .) | if type == "object" then ([.[] | strings] | max_by(length)) // tostring else . end' > "$out/reply.txt"   # agent:// serves the yielded reply JSON-encoded, sometimes wrapped in an object
   awk -v d="$out/outputs" '
   BEGIN { r = d "/reply.md"; printf "" > r }
   /^````markdown file=".+"$/ { f = d "/" substr($0, 20, length($0) - 20); system("mkdir -p \"$(dirname \"" f "\")\""); printf "" > f; next }
   /^````delete file=".+"$/ { del = del sep "\"" substr($0, 18, length($0) - 18) "\""; sep = ","; f = "/dev/null"; next }
   /^````$/ && f { f = ""; next }
   { print > (f ? f : r) }
   END { if (del) print "[" del "]" > (d "/.deleted.json") }' "$out/reply.txt"
   ```

   Done when `$out/outputs` holds each returned page at its Wiki-relative path, `reply.md`, and `.deleted.json` when the Runner removed pages. A Runner that failed or left no result is an execution error.

3. **Checks.**

   ```bash
   bun evals/check.ts <skill> <case-id> wiki --output "$out/outputs" > "$out/checks.txt" 2>&1; echo "exit $?" >> "$out/checks.txt"
   ```

   Add `--cases .omp/skills/<skill>/evals/cases.yaml` for a skill under `.omp/skills/`. Exit 0 means ok, 1 a Check failure, 2 a usage or execution error. Done when `checks.txt` ends with the exit code.

4. **Grade**, for each case with `rubrics`. One `task` call holds every such case:

   - `context`: `Eval grader: follow your agent definition's Grade.`
   - Each item: `agent: "prose-grader"`, `name` the Runner's name plus `Grade` (`GoldCasteHandoutGrade`), `task` the grade brief, and this `outputSchema`:

     ```json
     {"type":"object","required":["grades"],"properties":{"grades":{"type":"array","items":{"type":"object","required":["rubric","pass","reason"],"properties":{"rubric":{"type":"string"},"pass":{"type":"boolean"},"reason":{"type":"string"}}}}}}
     ```

   The grade brief holds the case `rubrics` verbatim and numbered; `Outputs: <run>/<case-id>/outputs (pages, reply.md, .deleted.json)` with the literal path; and `Sources:` each `source_pages` entry as `wiki/<path>`, plus each `raw_sources` path. Once the batch settles, save each result in one Bash call with its grader's agent id: `cp agent://<id> <run>/<case-id>/grades.json`. Done when every graded case's `grades.json` holds its grades JSON, or the grading error is named.

### Pass rule

A case passes when Checks exit 0 and `grades.json` parses with one entry per rubric, every `pass` true (a case without rubrics needs Checks alone). Classify every other case for the report:

- **Quality failure** — Checks exit 1, or a grade with `pass: false`.
- **Execution error** — the Runner failed, timed out or left no result, or Checks exit 2.
- **Grading error** — the grader failed, or `grades.json` is not that JSON, misses a rubric, or holds `{"error":…}`.

Errors are named prerequisites: neither quality failures nor passes. The suite score is the fraction of selected cases that pass. Report model identity, thinking and metrics only where observed; compare a pair only when identity and thinking match.

### Concurrency and cleanliness

Batch each step across the selected cases: one `task` call for all Runners and one for all graders, so each provider's cap queues them, and one Bash call for steps 2 and 3 of every case. Shell variables end with each Bash call, so every call spells `<run>` out as the literal path. Before step 1, open the run root and record the Wiki state:

```bash
run=$(cd "$(mktemp -d)" && pwd -P); git status --porcelain wiki raw archive > "$run/wiki-before.txt"; echo "$run"   # pwd -P: readRunnerOutput needs a canonical path (macOS /var → /private/var)
```

After step 4, compare:

```bash
git status --porcelain wiki raw archive | cmp -s <run>/wiki-before.txt - && echo clean || echo "WIKI CHANGED"
```

`WIKI CHANGED` is an isolation failure: report it and leave the files for the DM. The run root is temporary; reports go in chat or a file the DM names, and nothing persists unless the DM asks.

## Hillclimb

Start when Design holds for the suite and the live Wiki pages of that content type already pass `cf check` with 0 errors. Do not climb while templates or skill text teach wording the gate flags; clean the Wiki first. Skills stay as found until that content is clean. Every Eval is `skill://run-evals` over the suite; a case that passed earlier this session may be skipped, until a patch changes the skill enough to break it — then rerun it.

1. **Baseline.** Eval the suite. Done when the log lists every criterion's pass/fail.
2. **Patch.** Snapshot the attributable files, then dispatch `skill-writer` with them and the failed criteria written as process defects — the behaviour that went wrong, in the writer's terms rather than case text. Done when the round has one patch.
3. **Rerun.** Eval the suite. Done when every criterion has this round's verdict.
4. **Keep or revert.** Keep when no criterion that passed before now fails and at least one failing criterion now passes; otherwise restore the snapshot. Done when the log records the round's patch summary, flipped criteria and decision.
5. **Stop** when every criterion passes or after three reverted rounds; otherwise return to Patch. Done when the log ends with final criteria against baseline and every case id accounted for.

The climb log, `evals/climbs/<skill>.md`, is the climb's durable export: the orchestrator commits it with the case edits and the skill as of the last kept patch (pre-climb when none was kept). Runner outputs, Grades and audit samples stay in their temporary directories.

## Grounding

The DM's weekly home Sessions playtest the Wiki and the skills that produce it. **The Shattered Sea** World and its **Shattered Sea** Campaign are the input source for every active skill eval: committed cases, paired authoring evals and Narration benchmark prompts. The Agent works between Sessions; the DM and Players supply table evidence.

When authoring or changing eval inputs, search with QMD and retrieve the hits, then read the Campaign's `hot.md`, World `index.md`, available last ten `log.md` entries and source pages. Read current templates for output shape. Canon comes from the Wiki; Raw and Archive establish provenance. Distinguish played events from Prep, missing information from established facts, and requested new output from existing Canon. In a run the Runner takes the same production start tour over the live Wiki, then searches for its sources itself (`.omp/agents/test-subject.md`). Cases ask about pages as they currently stand; Grades judge changing facts and quotations against the live sources, not cached factual literals.

Each committed case records:

- `source_pages`: existing Wiki-relative Shattered Sea pages supplying its facts and context; the grader reads them as the truth, and the Runner finds them by search.
- `raw_sources`, when the ask concerns Raw or Archive material: existing repo-relative live `raw/` or `archive/` inputs.
- `prompt`, deterministic `checks` and independent `rubrics`: a natural DM ask and private criteria for observable behavior grounded in those inputs.

Migrate still-useful criteria to real sources as you go. A reported issue adds a criterion; it does not add a case unless it is a unique circumstance. Synthetic Worlds, invented Transcripts and hand-written replacement source pages are not skill-eval inputs. Software unit-test fixtures remain separate; historical eval artifacts stay unchanged, and historical `docs/intent/**/evals/evals.json` is intent, not an executable input source.

Use recovered production asks where available, preserving the DM's intent and table facts rather than adding answer hints or evaluator instructions. The Runner task carries only the skill line and the ask; `.omp/agents/test-subject.md` supplies the start tour. Keep useful grounded adaptations labelled as adaptations: source provenance is not proof that a creation request was recovered.

House Rule coverage ingests the recovered Archive Mortis (`archive/mortis.md`, `archive/mortis-dm-guide.md`); an Ingest case names its live `archive/` input in the ask, and the Runner returns the resulting pages. A case whose ask is a grounded adaptation, not a recovered DM ask, says so in its `#` comment. Successor-Campaign and `pull-pcs` `public-sheets` use the four public D&D Beyond URLs on the existing PC pages. Original PC-creation asks remain unrecovered.

## Weekly feedback

Playtest drives these beats; table feeling is a Sample for Design, never a merge gate.

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies: Session number, affected Wiki pages, what failed or worked at the table, expected behavior and concrete quotation or example. Keep this development evidence on a GitHub issue; ingest actual Session events into Canon through the normal Ingest workflow. Done when the report and source paths are reachable without relying on chat memory.
2. **Add the criterion.** Express a reported defect as a Check or rubric on consumer-visible behaviour, on the skill's default case — or on a unique-circumstance case when the default case cannot expose it (Design step 2). Link the issue in a `#` comment beside the criterion. A requested task is not evidence that its alleged failure occurred. Done when the criterion can be decided from the saved outputs and the live sources the case names.
3. **Eval, then climb.** Eval the case with `skill://run-evals` and attach the report to the issue. Skill text changes through a Hillclimb once Design holds for the suite. Done when the issue holds the case's report and, when a climb ran, its kept or reverted outcome from `evals/climbs/<skill>.md`.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow; eval outputs never reach the Wiki on their own. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed implementation issues with their evidence; reopen or file a new issue when play exposes another defect.

## Narration benchmark inputs

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts explicitly from current sources; exclude existing Narration answers. Preserve uncertain dates and unresolved outcomes. Commit changed prompts and regenerate briefs with `cf bench briefs`; the prompt-set hash identifies the new inputs. Old sample directories and grades remain historical evidence, not results for the new prompt version.
