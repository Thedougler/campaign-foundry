# Shattered Sea skill evals

This document owns skill-eval access, lifetime and grounding. Read it before preparing, dispatching or grading a run, authoring paired measurements, or processing home-Session feedback.

1. **Eval** a skill — `skill://run-evals`. Run active `cases.yaml` tasks in independent temporary Worlds; the parent runs **Check**, then independent **Grade**.
2. **Benchmark** Narration — `skill://dnd-benchmark`. Rank Matrix families on anonymized samples with 1–5 Grades.
3. **Grade** writing — native `prose-grader`. Read the authored prose and quote it. Skill-eval Grades are pass/fail; Benchmark Grades are 1–5.

Native delegation preserves configured model roles and approvals. Runner dispatch uses enforced per-run capabilities, `isolated: true` and `apply: false`; prepared Campaign content stays outside the omp worktree. Require observed `hasRootChanges: false`. Worktree isolation is an additional boundary, not an access policy.

**Check** is `eval:check` (pages, sections, canon/absent regex) for constrained artifacts: a page exists, `type: Handout`, a quoted line that must survive. **Grade** is reading the Narration. A rubric that restates a Check is a defective rubric; move it to `checks`.

**Jev** (`judge` / `judge_batch` in `eval`) is bounded labels over a small state. It is not a Grade of Narration.

## Grounding

The DM's weekly home Sessions playtest the Wiki and the skills that produce it. **The Shattered Sea** World and its **Shattered Sea** Campaign are the input source for every active skill eval: committed cases, paired authoring evals and Narration benchmark prompts. The Agent works between Sessions; the DM and Players supply table evidence.

Before selecting inputs, search with QMD and retrieve the hits, then read the Campaign's `hot.md`, World `index.md`, available last ten `log.md` entries and source pages. Read current templates for output shape. Canon comes from the Wiki; Raw and Archive establish provenance. Distinguish played events from Prep, missing information from established facts, and requested new output from existing Canon. Judge changing facts and quotations against the current run's private starting inputs, not cached factual literals.

Each committed case records:

- `source_pages`: existing Wiki-relative Shattered Sea pages supplying its facts and context.
- `raw_sources`, when replaying Ingest: existing repo-relative `raw/` or `archive/` inputs.
- `prompt`, deterministic `checks` and independent `rubrics`: observable behavior grounded in those inputs.

Retain useful existing branch coverage while migrating it to real sources. New regressions cover a reported issue, not a case quota. Synthetic Worlds, invented Transcripts and hand-written replacement source pages are not skill-eval inputs. Software unit-test fixtures remain separate; historical eval artifacts stay unchanged.

## Isolation

### Session storage

The owning main Session opens temporary storage with `eval_session` operation `open`. Other harnesses use `bun run eval:prepare --session-start` and explicitly close it. Preparation and clones take `--session-root <S>`; standalone preparation returns its own `sessionRoot`. Use `bun run eval:prepare --help` for current CLI forms.

`<S>` is a marked `campaign-foundry-eval-*` directory beneath canonical OS `tmpdir()`, outside the repository:

| Path | Contents |
| --- | --- |
| `<S>/worlds/<id>/` (`$W`) | Independent writable `wiki/`, `raw/`, `archive/`, public descriptor and `.eval/output.md` |
| `<S>/control/<id>/` | Private schema-version-2 manifest, frozen baseline, criteria, grant, Grades and completion/history evidence |
| `<S>/authoring/<skill>/` | Brief, skill snapshots, `evals.json`-shaped input and iteration/description-eval artifacts |
| `<S>/audit/<skill>/<case-id>.md` | Temporary human-review sample and criteria |

Preparation copies complete current content with independent inodes, stages Ingest replay inputs under collision-free names, applies assigned preparation seeds and then freezes the baseline. Returned `root`, `wiki`, `raw`, `archive`, `baseline`, `manifest`, `sessionRoot` and `runnerInput` are parent-side preparation data. `$W/.eval/runner-input.json` is read-only (`0o444`): it exposes the natural DM ask, start-here paths, assigned replay inputs/Archive destinations and output paths only. Checks, rubrics, baseline, seed explanations and history stay private. Parents keep full manifests out of Runner briefs.

Prepare once per case; paired measurements clone that frozen preparation into independent Worlds. Build authoring's existing `evals.json` shape from selected active YAML case IDs and private criteria inside `<S>/authoring/<skill>/`, recording the mapping there. Historical `docs/intent/**/evals/evals.json` is intent, not an executable input source.

### Runner access

Start with the supplied preferences and project instructions, then `$W`'s Campaign `hot.md`, World `index.md`, last ten `log.md` entries and task sources. `$W` is the only Campaign write root. Use the assigned start-here paths and capabilities; additional read-only source lookups may use the granted live Wiki/Raw/Archive, templates and assigned skill/reference files. A baseline receives its assigned snapshot or no target skill; grants exclude the live candidate and aliases for baseline runs.

The parent calls `bindRunnerTools` in `evals/runner-tools.ts` using the installed parent JS tool registrar. `.omp/extensions/eval-access-control.ts` binds the resulting private grant to the native `test-subject` once, strips evaluator-only inherited context and the machine grant line, and permits only that grant's capability names plus `yield`. `.omp/agents/test-subject.md` declares `tools: [yield]`; the dispatch supplies the confined operations.

Capabilities enforce reads/searches and File operations, reject private evaluator data and other runs, and permit writes/deletion/Raw→Archive moves only inside `$W`. Moves use confined filesystem operations, not `git mv`. Live `vault://_/`, inherited parent QMD MCP, arbitrary shell/eval/task tools and alternate internal-URI routes are unavailable. Optional source-network capabilities are read-only. Unsupported external File operations are explicit capability errors, not successful fallbacks.

### QMD and grounding proof

Preparation returns `qmd: {mode: "live-read-only", index: <existing-real-project-index>}`. It reads the current real-project `.qmd` configuration/index as-is; `$W` has no `.qmd`. Eval work neither copies/builds an index nor runs `qmd update`, `qmd embed` or creates scratch collections.

Parent-side status, collection inspection and a query/retrieval demonstrate the installed source index and real `wiki`, `raw`, `archive` collections. Trusted CLI commands run from the real project with `env -u QMD_CONFIG_DIR qmd <command>` and omit `--index`. Protected Runner QMD capabilities bind that cwd/config themselves, accept typed lexical/semantic queries with explicit intent, and retrieve granted sources. Results distinguish live-source paths from mapped scratch edit paths. Runners use those capabilities rather than a CLI or MCP bypass.

Missing current sources/index resources or absent/ambiguous preparation targets are named PREPARATION errors. Source drift invalidates the comparison; prepare afresh from current sources instead of repairing Canon or refreshing the index for the eval.

### File and output

Complete File with the full unified `cf check` / `cf check --fix`; a page/layer filter is not completion evidence. The granted gate runs fixed `node <repo>/src/cli.ts check` with `--vault "$W/wiki" --root "$W" --templates "$W/wiki/templates"` and all 13 layers. Check caches and Vale intermediates stay beneath `$W/.cache/check`. Confined index/log capabilities bind the same root/vault. Operator tooling setup belongs to the parent; unavailable prerequisites remain failures.

Save the requested pages and DM reply at `$W/.eval/output.md`; this output is assigned by preparation. File completion does not require a Narration extraction command or writing `docs/intent/**`. Runner briefs carry the natural DM request verbatim and operational start-here/capability/File/output instructions; Checks, Grades, failure coaching and isolation proof belong to the parent.

### Verification and lifetime

The parent runs `eval:prepare --verify "$W"`, `eval:check` and the frozen-baseline diff; independent graders read the writing and source-relative excerpts needed for their rubrics. Grades, complete histories and capability evidence remain in private control/authoring storage. Preserve actual model identity/thinking, source hashes, skill version and available exact completion metrics; compare pairs only when source inputs and actual identity/thinking match.

Capture observed `isolated: true`, `hasRootChanges: false` and available patch/branch metadata. Missing enforcement or native isolation is an explicit prerequisite gap; preserve harness configuration and do not dispatch an unrestricted substitute. After execution and Grade, verify again. Source, baseline or access mismatches invalidate the run separately from quality failures.

Temporary Worlds and evidence expire with their creating Session. After all children, Grades and reporting settle, close the owning storage with `eval_session` operation `close`, or `bun run eval:prepare --session-close "<sessionRoot>"` for a standalone harness. Close the returned Session root, not just `$W`; never keep or commit scratch Worlds. Main-Session shutdown/replacement also cleans up after child jobs settle; compaction and child shutdown preserve the owner root. Cross-Session continuation requires an explicit DM-requested durable export.

Crash recovery uses the validated `eval:prepare --reap-stale` CLI. Review `--dry-run` selections before removal with `--yes`; legacy unmarked roots require `--include-legacy`. This retains live/uncertain owners and unsafe roots rather than sweeping arbitrary temporary directories.

## Weekly feedback

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies: Session number, affected Wiki pages, what failed or worked at the table, expected behavior and concrete quotation or example. Keep this development evidence on a GitHub issue; ingest actual Session events into Canon through the normal Ingest workflow. Done when the report and source paths are reachable without relying on chat memory.
2. **Pin the regression.** For a reported defect, select the smallest real-source case set that exposes it. Link the issue in the case evidence, record snapshot hashes at preparation, and express checks/rubrics as consumer-visible behavior. A requested task is not evidence that its alleged failure occurred. Done when each criterion can be decided from saved artifacts and the starting snapshot.
3. **Revise and verify.** Send the issue and evidence to `skill-writer`; use `run-evals` for committed regressions or `skill-creator` for requested paired measurements. Preserve actual model identities, independent grades, diffs and source verification. Report unexecuted cases as unexecuted. Done when the requested verification accounts for every criterion and originals are unchanged.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow, separately from scratch eval outputs. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed implementation issues with their evidence; reopen or file a new issue when play exposes another defect.

## Narration benchmark inputs

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts explicitly from current sources; exclude existing Narration answers. Preserve uncertain dates and unresolved outcomes. Commit changed prompts and regenerate briefs with `cf bench briefs`; the prompt-set hash identifies the new inputs. Old sample directories and grades remain historical evidence, not results for the new prompt version.
