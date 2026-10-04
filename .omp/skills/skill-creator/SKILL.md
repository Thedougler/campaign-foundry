---
name: skill-creator
description: Skill authoring — create or revise a skill, iterate through paired baseline evaluation and human feedback, or evaluate its description's trigger accuracy.
---

# Skill creator

Capture intent, author through `skill-writer`, measure paired baselines, and revise from grades and DM feedback. Read `.omp/AGENTS.md` before dispatching for shared native-task policy.

Boundary: `evals/README.md` is the sole eval procedure and owns its branches — Eval of committed cases is `run-evals`' surface, the cross-family Narration Benchmark is `dnd-benchmark`'s, and Grades of writing are the `prose-grader` reading the prose. Route each request to the skill that owns it. After the skill exists and has a Design'd suite, further quality work is the README's Hillclimb.

## Shared helpers

Skill validation, optional `.skill` packaging and static human-review rendering use the repo's TypeScript `bun run cf -- eval` commands. From the repo, `bun run cf -- <arguments>` invokes `cf`; each subcommand's `--help` supplies examples and successful commands return JSON. Read [`references/schemas.md`](references/schemas.md) before writing authoring artifacts. Every paired run and Grade is a native `task` dispatch per `evals/README.md` § [Run a case](../../../evals/README.md#run-a-case); only description trigger checks are `omp -p` processes.

## Process

### 1. Capture intent

Pin down what the skill should do, which user phrases and contexts trigger it (one branch per distinct case), its inputs and outputs, and the acceptance criteria the DM will judge by. When the DM points at a workflow already in the conversation, extract these from the history first — tools used, sequence, corrections, formats — and ask only for the gaps.

Resolve the target from the DM's explicit path or active catalog's actual path; an unqualified name follows the catalog rather than directory order. A new skill goes to `.omp/skills/<name>/` unless the DM names another home. This skill's production home is `.omp/skills/skill-creator/` only. Create the workspace with `cd "$(mktemp -d)" && pwd -P` and write `brief.md` there; the printed canonical path is `<workspace>` for snapshots, iterations and description evals, written out literally in every later command.

**Done when** `brief.md` names the target path, the trigger branches, inputs/outputs, and acceptance criteria.

### 2. Snapshot before revision

Before the first edit to an existing skill: `cp -R <skill-path> <workspace>/skill-snapshot/`. Revision baselines read this snapshot in step 4 while with-skill runs read the live candidate. New skills skip.

**Done when** `diff -r <skill-path> <workspace>/skill-snapshot` is empty (new skill: `brief.md` records snapshot skipped).

### 3. Author or revise through `skill-writer`

Dispatch `skill-writer` with `brief.md`'s intent, trigger branches, inputs/outputs and acceptance criteria, plus the target path and the files involved; it follows `writing-for-agents` and its `SKILL-MECHANICS.md`. Include a content skill's assigned case file when its criteria need revision; non-content skills need cases only when the DM asks. On return, run `bun run cf -- eval validate <skill-dir>` and check that the description names the trigger branches, declared resources exist, and every pointer states when to read its target. Return concrete gaps to the writer and integrate only what passes.

**Done when** the candidate matches the brief, its pointers reach existing resources, and `bun run cf -- eval validate` passes.

### 4. Paired evals

Read `evals/README.md` § Run a case, then [`references/eval-loop.md`](references/eval-loop.md). From the skill's `evals/cases.yaml`, select the default case plus any unique-circumstance case that reported home-Session feedback names, recording the case ids in `brief.md`; historical intent files are not live eval inputs. Follow the reference through its paired runs, grading, aggregation and DM review. If no eligible case or paired run is requested, record that branch as skipped; instruction revision does not automatically run description evals or benchmarks.

**Done when** the requested pair set meets the reference's evidence, grading, aggregation and DM-review criteria and `feedback.json` is imported, or the skipped branch has its reason recorded.

### 5. Revise and repeat

Feed `feedback.json` and the grades — plus comparison and analysis results, when run — to `skill-writer` as evidence of general process defects; validate as in step 3. Rerun the whole requested pair set into `iteration-<N+1>/`, using the same case ids and revision snapshot, with `bun run cf -- eval review --previous-workspace` pointing at `iteration-<N>/`.

**Done when** a fresh iteration meets step 4's criterion, or the DM calls it done — all-empty feedback and flat results both count as done.

### 6. Description testing

Offer once the skill body is stable; run only if the DM accepts, and read [`references/description-evals.md`](references/description-evals.md) first. The shape: 20 realistic positive and near-miss queries, DM-reviewed in the browser; a 12/8 train/held-out split; three fresh `omp -p` observations per query; trigger rates counted from `read` calls on the candidate in the saved events.

**Done when** every reported trigger rate derives from scored events files and the live `SKILL.md` holds only the selected description.

### 7. Optional bundle and delivery

When the DM requests a portable bundle, run `bun run cf -- eval package <skill-dir> --output <bundle.skill>` and return the JSON-reported path. For a read-only installed skill, snapshot first and give `skill-writer` a writable copy outside active skill trees, preserving its name. Deliver the requested changes and observed results; label skipped measurements and unavailable evidence.

**Done when** every requested deliverable is locatable, including the `.skill` file when requested, and the report distinguishes measured results from unexecuted branches.

The workspace is scratch under OS temp, and briefs, snapshots, iterations and description-eval evidence live only there. Copy out what the DM asks to keep before reporting.
