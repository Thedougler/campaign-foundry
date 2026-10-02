# Shattered Sea skill evals

This document is the sole procedure for skill evals: designing suites, measuring and improving skills, authoring and benchmarking, with their access, lifetime and grounding. Read it before preparing, dispatching or grading a run, changing a skill a suite measures, authoring paired measurements, or processing home-Session feedback. Each branch names its section or invocation skill; those skills carry invocation mechanics, and the policy stays here.

- **Design** a suite — [Design](#design), before a suite measures a content skill and whenever Reflection returns task or Grade rows.
- **Eval** a skill — `skill://run-evals`: load `evals/run.ts`, call `runSkillEvals`, report. Measurement only.
- **Hillclimb** a content skill — [Hillclimb](#hillclimb), once Design allows.
- **Author** a skill — `skill://skill-creator`, paired with-skill/baseline runs. After the skill exists and has a Design'd suite, further quality work is Hillclimb.
- **Benchmark** Narration — `skill://dnd-benchmark` on DM request; [Narration benchmark inputs](#narration-benchmark-inputs) for its sources. Its 1–5 Grades rank models; Hillclimb keeps and reverts on Eval scores alone.
- **Playtest** feedback — [Weekly feedback](#weekly-feedback).

Native delegation preserves configured model roles and approvals. Runner dispatch uses enforced per-run capabilities that read the live sources and write only the run's output directory, `isolated: true` and `apply: false`, and requires the completion's exact trailing line `Isolation: no changes captured.` Worktree isolation is an additional boundary, not an access policy.

## Terms

Each term is defined here once; skills and instruction files use it as named.

- **Sample** — a case taken from production: a home-Session report, a GitHub issue or a recovered DM ask. A human writes its one-line hard reason before it enters the skill's `evals/cases.yaml`; today's model failing it is no reason (that is adversarial sampling).
- **Outcome** — `createOutcome(vault, outputRoot)`: the live Wiki pages with the run's output pages overlaid and its recorded deletions shadowing live pages, plus `reply.md`, the DM reply. Checks and Grades judge the Outcome, not the tool-call path.
- **Check** — `eval:check` (pages, sections, canon/absent regex) on a constrained Outcome: a page exists, `type: Handout`, a quoted line that must survive. The cheapest grader. A rubric that restates a Check is a defective rubric; move it to `checks`.
- **Grade** — the native `prose-grader` reads the writing and quotes it; each rubric is a checkable claim about meaning: does the table get the situation? Paraphrase of a source fact passes; wording binds only where the rubric says verbatim; "intact" or "kept" means sections, facts and callout titles, not whitespace or formatting. Skill-eval Grades are pass/fail; Benchmark Grades are 1–5. The grading model is never the model under test. Grades score skills; the File gate stays deterministic (ADR 0010).
- **Jev** (`judge` / `judge_batch` in `eval`) — bounded labels over a small state. It is not a Grade of Narration.
- **Eval** — `runSkillEvals` over selected cases: one Runner per case against the read-only live sources and a report for every selected id. An Eval leaves skill text unchanged.
- **Regression** — cases that should hold near 100%, packed into the fewest slots that still expose the defect (`user-config.md`). In a Hillclimb they hold the line and stay out of train.
- **Capability** — cases with **headroom**: a frontier model at high thinking scores well below 100% and no case fails every trial. This is the hill.
- **Noise** — the sample stddev of repeated suite scores from `calculateStats` in `evals/authoring.ts` (mean, sample stddev, min, max). A suite score is the fraction of selected cases whose report passes (`reportPassed`). The smallest keep is one case's share of the set; a climb needs Noise below it.
- **Train / test** — a fixed random split of Capability ids. The writer reads train failures; test ids never enter a writer brief.
- **Attributable** — the surface a Hillclimb patch touches: the skill's `SKILL.md` and its pointers. Harness code (`evals/run.ts`, `evals/runner-tools.ts`, `evals/outputs.ts`) and case files change only outside the climb.
- **Hillclimb** — rounds of one attributable patch each, kept only when train and test both rise above Noise and Regression holds.
- **Reflection** — a no-edit pass that sorts every remaining train failure by cause: skill gap, flawed task, flawed Grade or harness.
- **Benchmark** — requested cross-family Matrix ranking of Narration on committed excerpts (ADR 0012), separate from skill pass/fail.
- **Playtest** — the weekly home Session: production monitoring that feeds Sample and never replaces Eval.

## Design

Apply to every skill's committed `evals/cases.yaml` before it measures a content skill. Record a one-line verdict per case at the head of the skill's climb log, `evals/climbs/<skill>.md`.

1. **Production.** Each case is a Sample: a natural DM ask with current Shattered Sea `source_pages` / `raw_sources` (see Grounding). When the skill has a trigger, the suite holds should-fire and should-not-fire cases; description evals stay DM-gated in `skill-creator`. Done when every case has its hard reason and current sources.
2. **Grader.** Constrained facts are Checks; open craft is Grades whose claims two DMs would decide alike from the same starting Wiki. Checks pin only strings the ask or Canon fixes — a callout title, a quoted line that must survive; rubrics name facts and craft, so a Runner-chosen filename or a source fact in other words passes. A case that fails every trial is a broken task or grader: repair it here. Done when every criterion sits on the right side of the Check/Grade split.
3. **Headroom.** Label each case Capability or Regression. Eval the Capability set at a frontier pin with high thinking over repeated trials and record its mean and Noise. A set at ~95%+ makes the Hillclimb objective cost-at-parity. Done when every case has a label and the log holds the Capability mean, Noise and objective.
4. **Variance.** Retain one Eval's storage (`closeSession: false`) and dispatch a second `prose-grader` on the same saved output (the case report's `outputRoot`); the verdicts match. Timeouts, isolation and preparation errors are named prerequisites, not quality failures. Done when the log records the double-Grade result.
5. **Calibration.** Write one scored trial — Runner brief and reply, Outcome, Checks and Grades — to the human-audit path `<sessionRoot>/audit/<skill>/<case-id>.md` (`user-config.md`), read it, and record agree/disagree per rubric. A disagreement repairs the rubric or the case. Done when every audited rubric has a verdict.

**Done when** steps 1–5 hold for every selected case, or the log records a skip reason for a non-content skill the DM did not ask to measure.

## Committed runs

Use the two-step module-load + call in `skill://run-evals`, with the JS Eval call's deadline set to `0` while children run. Native `test-subject` and `prose-grader` remain separate roles, and the entry orchestrates both.

The entry discovers the committed cases and candidate skill, validates selections, records source hashes, binds Runner tools, dispatches and waits for native completion. It owns the Check, Grade, evidence and cleanup obligations below and returns the report. Routine execution is module load + call; the entry handles `bindRunnerTools`, dispatch, output reading and grader glue.

Cases live only at `.omp/skills/<skill>/evals/cases.yaml` or `.agents/skills/<skill>/evals/cases.yaml`. Use `caseIds` for targeted reruns; omit it for the complete final suite. Use an absolute `casesFile` only when explicitly selecting a different case file, `skillRoot` for a different candidate, `snapshotRoot` for a revision snapshot the Runner reads in place of the live skill, or `baseline: true` for a Runner with no assigned skill; the last two exclude each other. `network: {https, search}` grants the optional read-only web capabilities. Explicit invalid selections are preparation errors, not discovery fallbacks.

Account for every selected case in the report: Checks passed/total, rubrics passed/total, quality failures and separate preparation, execution, isolation or grading errors. Report actual identity and metrics only when captured; unavailable evidence stays unavailable, and unexecuted cases are not passes.

Storage retention and recovery follow **Verification and lifetime** below. Maintenance operations are reference, not extra steps in routine committed-case execution.

## Hillclimb

Start when Design holds for the suite, its Noise sits below the smallest keep, and Capability has headroom. When Capability already scores ~95%+, the objective is cost-at-parity instead: a cheaper pin or lower thinking at a held score, costed from observed completion metrics and omitted where unobserved. Every Eval below is `skill://run-evals` over the split ids, repeated the same planned number of times.

1. **Split.** Freeze a random train/test split of the Capability ids. Regression ids are the hold-the-line set. Done when the log lists train, test and Regression ids.
2. **Baseline.** Eval train, test and Regression; record each set's mean and Noise with `calculateStats`. When Noise reaches the smallest keep, return to Design to add repeats or cases. Done when the log holds baseline mean and Noise per set.
3. **Patch.** Snapshot the attributable files, then dispatch `skill-writer` with them and the train failures written as process defects — the behaviour that went wrong, in the writer's terms rather than case text. It returns one patch; Eval train, test and Regression. Done when the round has one patch and three scores.
4. **Keep or revert.** Keep when train mean and test mean each rise by more than Noise and the Regression mean holds; otherwise restore the snapshot. The `skill-creator` blinded comparator may advise on a revision; the scores decide. Done when the log records the round's patch summary, scores and decision.
5. **Reflect.** After 2–3 consecutive reverted rounds, or when no single patch could beat Noise, run a Reflection with no edit. Skill-gap rows return to Patch; task and Grade rows return to Design; harness rows become named prerequisites. Done when every remaining train failure sits in one bucket in the log.
6. **Stop.** Stop at the best-on-test skill and report test against baseline as `calculateStats` mean ± stddev. A gain inside Noise is no-merge, and the pre-climb skill stays. Done when the log ends with best-on-test vs baseline, the merge/no-merge decision and every selected id accounted for.

The climb log, `evals/climbs/<skill>.md`, is the climb's durable export: the orchestrator commits it with the case edits and the merged skill (best-on-test, or pre-climb on no-merge). Runner outputs, Grades and audit samples still expire with the Session under **Verification and lifetime**.

## Grounding

The DM's weekly home Sessions playtest the Wiki and the skills that produce it. **The Shattered Sea** World and its **Shattered Sea** Campaign are the input source for every active skill eval: committed cases, paired authoring evals and Narration benchmark prompts. The Agent works between Sessions; the DM and Players supply table evidence.

When authoring or changing eval inputs, search with QMD and retrieve the hits, then read the Campaign's `hot.md`, World `index.md`, available last ten `log.md` entries and source pages. Read current templates for output shape. Canon comes from the Wiki; Raw and Archive establish provenance. Distinguish played events from Prep, missing information from established facts, and requested new output from existing Canon. In committed runs the Runner takes the same production start tour over the live Wiki, then reads the case's start-here paths and searches (see Runner access). Cases ask about pages as they currently stand; Grades judge changing facts and quotations against the live sources the run hashed, not cached factual literals.

Each committed case records:

- `source_pages`: existing Wiki-relative Shattered Sea pages supplying its facts and context; they become the Runner's start-here paths.
- `raw_sources`, when the ask concerns Raw or Archive material: existing repo-relative live `raw/` or `archive/` inputs.
- `prompt`, deterministic `checks` and independent `rubrics`: a natural DM ask and private criteria for observable behavior grounded in those inputs.

Retain useful existing branch coverage while migrating it to real sources. New regressions cover a reported issue, not a case quota. Synthetic Worlds, invented Transcripts and hand-written replacement source pages are not skill-eval inputs. Software unit-test fixtures remain separate; historical eval artifacts stay unchanged.

Use recovered production asks where available, preserving the DM's intent and table facts rather than adding answer hints or evaluator instructions. The harness supplies the start tour, start-here paths and output directory. Keep useful grounded adaptations labelled as adaptations: source provenance is not proof that a creation request was recovered.

House Rule coverage ingests the recovered Archive Mortis (`archive/mortis.md`, `archive/mortis-dm-guide.md`); an Ingest case names its live `archive/` input in the ask, and the Runner saves the resulting pages. Spell (Tribute Wake), Handout, World genesis, Calveno harbour, Countless hunt, Saltwright inspection, Il Gioco festival, Quackers and the Bloodhawk token are grounded adaptations of existing Wiki or Archive, not recovered original creation asks. Successor-Campaign and `pull-pcs` `public-sheets` use the four public D&D Beyond URLs on the existing PC pages. Original PC-creation asks remain unrecovered.

## Isolation

### Session storage

`runSkillEvals` opens and owns a private Session root for its runs. For retained-storage review or a dispatch outside `runSkillEvals`, such as description evals, the owning main Session uses `eval_session` operation `open`. `bun run eval:prepare --help` lists the maintenance forms: `--session-start`, `--session-close` and `--reap-stale`.

`<S>` is a marked `campaign-foundry-eval-*` directory beneath canonical OS `tmpdir()`, outside the repository. It holds evaluator artifacts only:

| Path | Contents |
| --- | --- |
| `<S>/control/<run>/` | Runner grant, `runner-brief.md`, `source-hashes.json` and `grades.json` |
| `<S>/outputs/<run>/` | The Runner's deliverables (`outputRoot`): Wiki-path pages, `reply.md` and `.deleted.json`; `cf eval review` on a retained root pairs each with `control/<run>/` |
| `<S>/authoring/<skill>/` | skill-creator brief, skill snapshot, `evals.json`-shaped input and iteration/description-eval artifacts |
| `<S>/audit/<skill>/<case-id>.md` | Temporary human-review sample and criteria |

Build authoring's `evals.json` shape from selected YAML case IDs and private criteria inside `<S>/authoring/<skill>/`, recording the mapping there. Historical `docs/intent/**/evals/evals.json` is intent, not an executable input source.

### Runner access

The Runner reads the live Wiki, Raw, Archive, `wiki/templates` and its assigned skill as they currently stand, read-only, and writes only into its output directory. It starts as a production Wiki session does: with the brief's preferences in hand, it reads the Campaign's `campaign-config.md` and `hot.md`, the World's `index.md` and the last ten `log.md` entries, then the start-here paths and assigned skill with the references it selects, then searches the Wiki proactively as production agents do with the `query`/`qmd` skills: typed lex/vec `qmd_query` searches with explicit intent for the people, places, Threads and Sessions the request touches, `qmd_get` retrieval of the hits, and further pages as they bear on the deliverables. As in production, it creates each new page from its kind's template in `wiki/templates` and conforms each updated page to its template. A baseline reads its `snapshotRoot` copy of the skill or no skill; its grant rejects the live candidate and aliases.

For committed runs, `runSkillEvals` calls `bindRunnerTools` in `evals/runner-tools.ts` using the installed parent JS tool registrar; a dispatch outside `runSkillEvals` binds the same tools before dispatch. The grant binds `read`, `grep`, `glob`, `find`, `qmd_query`, `qmd_get`, `write` and `delete_page`, plus `https_get` and `web_search` when `network` requests them. `.omp/extensions/eval-access-control.ts` binds the private grant to the native `test-subject` once, strips evaluator-only inherited context and the machine grant line, and permits only that grant's capability names plus `yield`. `.omp/agents/test-subject.md` declares `tools: [yield]`; the dispatch supplies the rest.

Access is enforced, not requested. Capabilities hard-deny any `evals/` tree, answer, grader, grade, rubric and snapshot names, other runs and private Session storage, and reject symbolic and hard links. `read`, `grep`, `glob` and `find` see the live sources plus the run's own output directory; `write` and `delete_page` reach only that directory, and no move, index, log or check capability is bound, so the live Wiki is unwritable. Live `vault://_/`, inherited parent QMD MCP, shell/eval/task tools and alternate internal-URI routes are unavailable. Network capabilities are GET and search only.

### QMD and grounding proof

Runner QMD capabilities run from the real project against the existing live index (`qmd: {mode: "live-read-only", index: <repo>/.qmd/index.sqlite}`), search only the `wiki`, `raw` and `archive` collections, and return live source paths. Eval work neither copies/builds an index nor runs `qmd update` or `qmd embed`.

Grounding proof uses status, collection inspection and a query/retrieval against the installed index and real collections. Record only the proof actually captured. For trusted diagnostic CLI use, run from the real project with `env -u QMD_CONFIG_DIR qmd <command>` and omit `--index`. Missing current sources or index resources are named PREPARATION errors.

### Outputs and Outcome

Runner briefs carry the preferences, live repository, output directory, start tour, assigned skill, start-here paths and natural DM request verbatim; Checks, Grades, failure coaching and isolation proof belong to the parent. Each run has its own output directory, `<S>/outputs/<run>/`, exposed as `outputRoot` on the case report. The Runner saves each new or changed page there with `write` at its Wiki-relative `.md` path (an optional `wiki/` prefix is normalised) and the DM reply as `reply.md`. `delete_page` records a removal in `.deleted.json`; a later `write` to that path clears it. Completion text is ignored, and a run without `reply.md` is an EXECUTION error, as are unsafe or noncanonical paths.

`eval:check` runs the case's Checks on the Outcome; pass `--cases` for an `.omp/skills` suite:

```bash
bun run eval:check <skill> <case-id> <vault-dir> --output <dir> [--cases <file>]
```

Eval runs do not invoke the `cf check` gate; it stays the deterministic File gate for production work (ADR 0010).

### Verification and lifetime

For committed runs, `runSkillEvals` owns source hashing, completion evidence, `eval:check`, independent grading and cleanup; a dispatch outside it satisfies the same obligations. It records sha256 hashes of the case's `source_pages` and `raw_sources` before dispatch and rechecks them after the Runner settles and again before Grade; a change marks the run INVALIDATED, a harness result rather than a quality failure. Grader briefs point at the run's `outputRoot` — its pages, `reply.md` and `.deleted.json` — and the case's live source paths; graders read those and any further live pages their rubrics need, returning one boolean verdict per rubric, with the rubric text copied exactly and a reason quoting evidence. Checks and execution logs remain evaluator evidence rather than grader answers. Preserve skill version, actual model identity/thinking and exact completion metrics where observed; compare pairs only when sources held and identity/thinking match.

The completion's exact trailing line `Isolation: no changes captured.` is the evidence of no root changes; a completion without it is INVALIDATED. Deliverables come only from the output directory. Missing enforcement or native isolation is an explicit prerequisite gap; preserve harness configuration and dispatch no unrestricted substitute.

Runner outputs, Grades and evidence expire with their creating Session; closing the Session root removes `outputs/` with the rest. By default, `runSkillEvals` closes its Session root after its children and Grades settle, including on failure, before returning the report. Use `closeSession: false` only for same-Session artifact review or an explicitly requested durable export. With retained storage, close after children, Grades and review/export settle using `eval_session` operation `close`; `bun run eval:prepare --session-close "<sessionRoot>"` closes a root opened with `--session-start`. Main-Session shutdown/replacement also cleans up after child jobs settle; compaction and child shutdown preserve the owner root. Cross-Session continuation requires an explicit DM-requested durable export.

Crash recovery uses the validated `eval:prepare --reap-stale` CLI. Review `--dry-run` selections before removal with `--yes`; legacy unmarked roots require `--include-legacy`. This retains live/uncertain owners and unsafe roots rather than sweeping arbitrary temporary directories.

## Weekly feedback

Playtest drives these beats; table feeling is a Sample for Design, never a merge gate.

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies: Session number, affected Wiki pages, what failed or worked at the table, expected behavior and concrete quotation or example. Keep this development evidence on a GitHub issue; ingest actual Session events into Canon through the normal Ingest workflow. Done when the report and source paths are reachable without relying on chat memory.
2. **Pin the Regression.** For a reported defect, select the smallest real-source case set that exposes it, each case a Sample. Link the issue in the case evidence and express checks/rubrics as consumer-visible behavior. A requested task is not evidence that its alleged failure occurred. Done when each criterion can be decided from the saved outputs and the live sources the case names.
3. **Eval, then climb.** Eval the pinned Regression with `skill://run-evals` and attach the report to the issue. Skill text changes through a Hillclimb when its start condition holds; otherwise the defect returns to Design to grow the Capability set. Done when the issue holds a report for every pinned id and, when a climb ran, the merge/no-merge from `evals/climbs/<skill>.md`.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow; eval outputs never reach the Wiki on their own. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed implementation issues with their evidence; reopen or file a new issue when play exposes another defect.

## Narration benchmark inputs

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts explicitly from current sources; exclude existing Narration answers. Preserve uncertain dates and unresolved outcomes. Commit changed prompts and regenerate briefs with `cf bench briefs`; the prompt-set hash identifies the new inputs. Old sample directories and grades remain historical evidence, not results for the new prompt version.
