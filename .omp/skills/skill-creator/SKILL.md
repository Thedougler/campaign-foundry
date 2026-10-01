---
name: skill-creator
description: Skill authoring — create or revise a skill, iterate through paired baseline evaluation and human feedback, or evaluate its description's trigger accuracy.
---

# Skill creator

Capture intent, author through `skill-writer`, measure paired baselines, and revise from grades and DM feedback. Read `.omp/AGENTS.md` before dispatching for shared native-task policy.

Boundary: a skill's committed fixture cases (`evals/cases.yaml`, run in scratch Worlds and checked with `bun run eval:check`) are `run-evals`' surface; the cross-family Narration Prose Benchmark is `dnd-benchmark`'s. Route the DM there for those.

## Reused assets

The legacy tree `.agents/skills/skill-creator/` holds the machinery — reach it by these paths, copy nothing:

- `.agents/skills/skill-creator/scripts/quick_validate.py` — when validating the candidate in step 3: `python3 .agents/skills/skill-creator/scripts/quick_validate.py <skill-dir>`.
- `.agents/skills/skill-creator/scripts/package_skill.py` — when the DM requests a `.skill` bundle: `cd .agents/skills/skill-creator && python3 -m scripts.package_skill <skill-dir>`.

## Process

### 1. Capture intent

Pin down what the skill should do, which user phrases and contexts trigger it (one branch per distinct case), its inputs and outputs, and the acceptance criteria the DM will judge by. When the DM points at a workflow already in the conversation, extract these from the history first — tools used, sequence, corrections, formats — and ask only for the gaps.

Resolve the target from the DM's explicit path or the active catalog's actual path for the requested skill. Check existing homes in `.omp/skills/` and `.agents/skills/`; when both contain the name, the catalog path decides an unqualified request, not directory order. If the catalog does not disambiguate and the DM has not named a path, ask which existing skill they intend before editing. A new skill goes to `.omp/skills/<name>/` unless the DM names another home. Write everything to `<skill-name>-workspace/brief.md` (sibling of the skill directory; if that would land inside `.omp/skills/` or `.agents/skills/`, put the workspace at the repo root — a `skill-snapshot/` holding a SKILL.md doesn't belong in a skills tree).

**Done when** `brief.md` names the target path, the trigger branches, inputs/outputs, and acceptance criteria.

### 2. Snapshot before revision

Before the first edit to an existing skill: `cp -R <skill-path> <workspace>/skill-snapshot/`. Revision baselines read this snapshot in step 4 while with-skill runs read the live candidate. New skills skip.

**Done when** `diff -r <skill-path> <workspace>/skill-snapshot` is empty (new skill: `brief.md` records snapshot skipped).

### 3. Author or revise through `skill-writer`

Dispatch `skill-writer` with `brief.md`'s intent, trigger branches, inputs/outputs and acceptance criteria, plus the exact file list it may edit; it follows `writing-for-agents`. On return, validate: frontmatter `name` matches the directory, the `description` names the trigger branches, declared resources exist, and every pointer states when to read its target. Run quick_validate (assets above). Send gaps back to the writer once, with specifics; integrate only what passes.

**Done when** the candidate exists at the target path, its description names its trigger branches, and quick_validate passes.

### 4. Paired evals

Read `evals/README.md` before authoring or preparing eval data, then [`references/eval-loop.md`](references/eval-loop.md) for paired execution. Select the smallest regression set justified by reported weekly home Session feedback under that contract; retain `evals/evals.json`'s artifact schema and map each selected case to its grounded `cases.yaml` preparation input. Follow the reference through dispatch, evidence capture, independent grading, aggregation and static DM review. If no eligible regression or paired run is requested, record that branch as skipped; skill revision and data migration do not automatically benchmark current skills.

**Done when** the requested pair set meets the reference's evidence, grading, aggregation and DM-review criteria and `feedback.json` is imported, or the skipped branch has its reason recorded.

### 5. Revise and repeat

Feed `feedback.json` and the grades — plus comparison and analysis results, when run — to `skill-writer` as the revision brief; validate as in step 3; rerun the whole pair set into `iteration-<N+1>/` with the viewer's `--previous-workspace` pointing at `iteration-<N>/`.

**Done when** a fresh iteration meets step 4's criterion, or the DM calls it done — all-empty feedback and flat results both count as done.

### 6. Description testing

Offer once the skill body is stable; run only if the DM accepts, and read [`references/description-evals.md`](references/description-evals.md) first. The shape: 20 realistic positive and near-miss queries, DM-reviewed in the browser; a 12/8 train/held-out split; three fresh observations per query; trigger rates computed from observed candidate-skill reads only.

**Done when** every reported trigger rate derives from candidate reads counted in run histories.
