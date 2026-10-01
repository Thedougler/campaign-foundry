# Shattered Sea skill evals

## Grounding

The DM's weekly home Sessions playtest the Wiki and the skills that produce it. **The Shattered Sea** World and its **Shattered Sea** Campaign are the input source for every active skill eval: committed cases, paired authoring evals and Narration benchmark prompts. The Agent works between Sessions; the DM and Players supply table evidence.

Before selecting inputs, search with QMD, then read the Campaign's `hot.md`, World `index.md`, available last ten `log.md` entries and the source pages. Read current templates for output shape. Canon comes from the Wiki; Raw and Archive establish provenance. Distinguish played events from Prep, missing information from established facts, and requested new output from existing Canon.

Each committed case records:

- `source_pages`: existing Wiki-relative Shattered Sea pages supplying its facts and context.
- `raw_sources`, when replaying Ingest: existing repo-relative `raw/` or `archive/` inputs.
- `prompt`, deterministic `checks` and independent `rubrics`: observable behavior grounded in those inputs.

Retain useful existing branch coverage while migrating it to real sources. New regressions cover a reported issue, not a case quota. Synthetic Worlds, invented Transcripts and hand-written replacement source pages are not skill-eval inputs. Software unit-test fixtures remain separate; historical eval artifacts stay unchanged.

## Isolation

Paired authoring evals keep their existing `evals.json` schema. Map each JSON eval ID to a grounded `cases.yaml` case in its saved brief, prepare that case, and clone it with `--from <prepared-root>` for both configurations. The brief records the cases-file path, case ID and manifest path; JSON input files resolve inside the assigned clone. Reuse the grounded case's task and criteria rather than maintaining competing copies.

Use `bun run eval:prepare --help` for preparation, cloning and verification commands. Preparation snapshots real content into a generated scratch root, records source hashes and the case inputs in `.eval/manifest.json`, and freezes Wiki, Raw, Archive and local QMD configuration in `.eval/baseline/`. Its returned `baseline` path points to the starting Wiki for diffs. It copies content rather than linking to live files. Ingest replay stages byte-identical files under collision-free scratch names; the manifest's `replaySources` maps each original to its scratch Raw and future Archive paths.

Before dispatch, require the manifest and every case source to resolve, and keep all content, artifacts and external-service mutations inside the assigned scratch workspace. Supply absolute scratch paths for Wiki, Raw and Archive; use the real repo only for executable tooling with explicit scratch flags. For paired comparisons, clone one frozen preparation into independent run workspaces so both configurations receive identical inputs.

Paired-review tooling keeps its existing iteration layout. Runners save content and deliverables in their assigned clone; the orchestrator may copy evidence and outputs into the experiment's review directory, outside the live Wiki, Raw and Archive. Saved briefs identify the scratch root and manifest. These review copies are artifacts, not new Campaign inputs.

**Live originals are read-only.** Runners use assigned filesystem paths rather than `vault://_/` or inherited QMD MCP tools. Run QMD from the scratch root with `env -u QMD_CONFIG_DIR qmd <command>` so it discovers local `.qmd/`. Before indexing, inspect configuration and observe `status`, `collection list` and `collection show <name>`: require the database at `<scratch>/.qmd/index.sqlite`, every collection path to resolve inside that scratch root and no update hooks. Then update/embed the scratch index and retain evidence. Shared downloaded models are not proof of index isolation.

On the installed QMD, explicit `--index index` selects the named global index even from a scratch root; cwd-local discovery requires omitting that flag. If the observed database differs, stop before update/embed and inspect `qmd --help` and `qmd skill show` for the installed version.

After execution and grading, run preparation's `--verify` command. A source-hash or isolation mismatch invalidates the run; preserve the failure and stop. Check source immutability separately from outcome quality: successful preparation is not a skill pass.

### omp isolation

For oh-my-pi eval runners and graders, request omp isolation with `isolated: true` on the built-in `task` interface when available. Prepare the real-source snapshot before dispatch and pass absolute content/output paths outside the isolated workspace. omp isolation adds a workspace boundary; it does not replace Campaign snapshots or make inherited live vault/QMD tools safe.

Keep the isolated workspace unchanged: configured isolation may apply successful root changes back to the parent. Preserve completion isolation/patch metadata and require evidence of isolation with no root changes; unexpected root changes invalidate the run. Pin the assigned skill version explicitly. If omp isolation is unavailable, record the limitation and retain the full scratch-path and source-verification gates. Read `omp://tools/task.md` only when resolving omp isolation setup, capture or merge behavior; preserve existing harness configuration.

## Weekly feedback

1. **Record evidence.** After a home Session, preserve the DM's report and any Player feedback the DM supplies: Session number, affected Wiki pages, what failed or worked at the table, expected behavior and concrete quotation or example. Keep this development evidence on a GitHub issue; ingest actual Session events into Canon through the normal Ingest workflow. Done when the report and source paths are reachable without relying on chat memory.
2. **Pin the regression.** For a reported defect, select the smallest real-source case set that exposes it. Link the issue in the case evidence, record snapshot hashes at preparation, and express checks/rubrics as consumer-visible behavior. A requested task is not evidence that its alleged failure occurred. Done when each criterion can be decided from saved artifacts and the starting snapshot.
3. **Revise and verify.** Send the issue and evidence to `skill-writer`; use `run-evals` for committed regressions or `skill-creator` for requested paired measurements. Preserve actual model identities, independent grades, diffs and source verification. Report unexecuted cases as unexecuted. Done when the requested verification accounts for every criterion and originals are unchanged.
4. **Return to play.** Apply approved content changes through the normal live Campaign workflow, separately from scratch eval outputs. The DM uses the resulting Wiki at the next home Session and records the next observation on the issue. Close verified, committed implementation issues with their evidence; reopen or file a new issue when play exposes another defect.

## Narration benchmark inputs

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts explicitly from current sources; exclude existing Narration answers. Preserve uncertain dates and unresolved outcomes. Commit changed prompts and regenerate briefs with `cf bench briefs`; the prompt-set hash identifies the new inputs. Old sample directories and grades remain historical evidence, not results for the new prompt version.
