# Hillclimb: theatre-of-the-mind

Issue #25 first climb. Frozen 2026-10-02.

## Design

Hard reasons written before the Capability Eval.

| id | label | hard reason | Check/Grade |
| --- | --- | --- | --- |
| narration-slots | Regression | Production: “Improve upon the Session 12 narration blocks comprehensively” (#34). Packed multi-slot hold-the-line. | Checks: callouts exist, Draft gone, Skarn's spoken line survives. Grades: speakable openings, Previously On stop, Skarn cues without a PC action, Terror-Bird form. |
| fatespinner-chat | Regression | Production chat-only Fate Spinner rewrite (#34). | Check: Item page quartz line survives. Grades: speakable First look in the reply; page unchanged. |
| gold-caste-handout | Regression | Grounded Handout adaptation (README); hard reason remains valid (Design step 2). | Repaired (Design steps 4–5): Checks pin only the four Canon order strings in Two-Grave Orders, never the output path. Grades accept any new Session 12 Handout filename with `type: Handout` and four verbatim lines oldest first in Handout text, handed over in Orders in the Ash, not claimed as handed out. |
| wolfrabbit-opening | Capability | Production wolfrabbit-only cold-open shape (#34); wiki placed the hunt on Session 11. | Check: Opening exists, Draft gone. Grades: hunt in motion from this Scene; rest of page intact. |
| wolfrabbit-first-sight | Capability | Live First sight is generic silhouette-tell; production wanted the actual animal. | Check: callout exists, Draft gone. Grades: form and tells at rest; rest of page intact. |
| bloodhawk-first-sight | Capability | Same generic First sight template as Wolfrabbit on a different Creature. | Check: callout exists, Draft gone. Grades: form and tells at rest; rest of page intact. |
| landing-sign-opening | Capability | Production: smoke from other survivors is the main driver (#34); hard reason remains valid (Design step 2). | Repaired (Design steps 4–5): Check: Opening exists, Draft gone. Grades: cold stone ring, spent fruit (skins, rinds, half-eaten or equivalent wording), inland smoke as the lead, stop before route choice; rest of page intact. No exact fruit phrase required. |
| session12-previously-on | Capability | Previously On is a distinct recipe the packed Session 12 case hides. | Check: callout exists, Draft gone. Grades: past you, stop on Skarn; Recap unchanged. |
| way-out-closing | Capability | Production Session 12 narration includes the Closing image. | Check: callout exists, Draft gone. Grades: nine leave, three stay, no new threat; rest of page intact. |

Sources are current Shattered Sea pages listed in `evals/cases.yaml`.

Design repair (#29 Phase 2.2 / #25 Reflection): steps 2, 4 and 5 revisited for these two cases; hard reasons remain valid and Checks/Grades now match the repaired tasks. No new Eval was run; historical outcomes and scores below are unchanged.

### Split

- **Train:** wolfrabbit-opening, wolfrabbit-first-sight, landing-sign-opening, session12-previously-on
- **Test:** bloodhawk-first-sight, way-out-closing
- **Regression:** narration-slots, fatespinner-chat, gold-caste-handout

Repeats planned: 2.

### Headroom, variance, calibration

- **Variance:** first wolfrabbit-first-sight Grade used overridden `deepseek/deepseek-flash` (fail form); second Grade via `@PROSE-GRADER` (pass). Pair invalid. Pin removed from `task.agentModelOverrides`.
- **Calibration:** human **fail** on form for that contaminated Outcome (no ears/coat). Rubric kept. Clean re-Eval later **passed**.

## Baseline

Repeats planned: 2. Fly at `EVAL_QUEUE_DEFAULTS.evalConcurrency` (4). `test-subject` → `@TEST-SUBJECT`. `prose-grader` → `@PROSE-GRADER`. Do not add `agentModelOverrides` for those agents.

### Trial 1

| id | set | passed |
| --- | --- | --- |
| wolfrabbit-opening | train | true |
| wolfrabbit-first-sight | train | true |
| landing-sign-opening | train | false (Opening omitted half-eaten fruit) |
| session12-previously-on | train | true |
| bloodhawk-first-sight | test | false (`base` indent outside First sight) |
| way-out-closing | test | true |
| narration-slots | regression | false (Previously On invented mid-air fall / strap-sawing) |
| fatespinner-chat | regression | true |
| gold-caste-handout | regression | false (wrote `Gold Caste Orders.md`, not `Gold-Caste Order Chain.md`) |

### Trial 2

| id | set | passed |
| --- | --- | --- |
| wolfrabbit-opening | train | true |
| wolfrabbit-first-sight | train | true |
| landing-sign-opening | train | false (fruit still missing; also edited summary / At a glance) |
| session12-previously-on | train | true |
| bloodhawk-first-sight | test | true |
| way-out-closing | test | false (Check fail, Grades pass) |
| narration-slots | regression | false (Consume staging; Terror-Bird form still a hump) |
| fatespinner-chat | regression | true |
| gold-caste-handout | regression | false (same missing page path) |

Discarded DeepSeek-grader runs: earlier wolfrabbit-opening fail, wolfrabbit-first-sight fail, landing-sign-opening pass.

`calculateStats`: train mean 0.75 Noise 0; test mean 0.50 Noise 0; regression mean 0.3333 Noise 0. Smallest keep: train 0.25, test 0.50. Headroom yes. Climb starts.

## Rounds

### Round 1

Snapshot: `./snapshot/`.

Train process defect: Scene Opening rewrites drop sourced objects already in view; sometimes summary / At a glance change.

Patch: leading word **tableau**; File only the named callout body.

| id | why run | passed |
| --- | --- | --- |
| landing-sign-opening | train fail | true |
| wolfrabbit-opening | significant Opening change | false (still-life; taking gone) |
| narration-slots | regression fail | true |
| gold-caste-handout | regression fail | false (same missing path) |

Train 0.75 flat. Test 0.50 held. Regression 0.667 (narration-slots up).

**Revert.** Train did not rise. Skill restored from snapshot.

### Round 2

Patch: **inciting event** in Scene openings; File names summary / At a glance as sources that stay filed.

| id | why run | passed |
| --- | --- | --- |
| wolfrabbit-opening | Opening change | false (taking present; bound lands — past reaction point) |
| landing-sign-opening | train fail | false (whole fruit / skins, not half-eaten) |
| narration-slots | Opening change | false (Skarn Links indent; Terror-Bird form) |

Train would fall (both Openings fail). **Revert.** Skill restored from snapshot.

### Reflection

- landing-sign fruit wording: skill gap vs Grade literalness (skins vs “half-eaten”). Design if the rubric should accept spent fruit.
- wolfrabbit reaction-point: skill gap (event now present, stop still late).
- gold-caste path: flawed task — case requires `Gold-Caste Order Chain.md`, runs write `Gold Caste Orders.md`. Not a Hillclimb surface.

Two consecutive reverts. No further patch this climb.

## Stop

Best-on-test is the pre-climb skill. Test 0.50 ± 0. Train 0.75 ± 0. **no-merge.**

Every selected id accounted for in Baseline trials 1–2. Round evals only touched remaining fails plus Openings after significant patches.
