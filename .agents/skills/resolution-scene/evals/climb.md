# Hillclimb: resolution-scene

Issue #18. Frozen 2026-10-03.

## Design

| id | label | hard reason | Check/Grade |
| --- | --- | --- | --- |
| resolution-scene | Default case | Production Session 12 The Way Out redo for every Consume exit: Spinner kept or stolen, capture, Perrin refusing, people lost, turning back. | Checks: Scene page, Resolution template spine, `type`/`kind`, exact `Closing image` callout title. Grades: aftermath per exit, Canon losses, rewards, specific closure, speakable Closing images. |

1. **Default case.** One packed case; Payoffs/Reactions/Rewards/Threads covered.
2. **Extra cases.** None.
3. **Check/Grade split.** Checks pin the exact callout title `Closing image`. Grades accept titled branch variants (`Closing image: the Spinner kept`). Check failure is the template title, not a broken rubric. No rubric repaired.
4. **Variance.** Skipped: no identical re-Grade of the same Outcome.
5. **Calibration.** Agree all five Grades (pass). Branch images are still Closing images; the failed Check is the un-suffixed title.

## Baseline

Checks 9/10 (fail: `^> \[!narration\] Closing image\s*$` — titles are `Closing image: …`). Rubrics 5/5. Gate: 59 errors, 8 warnings on the Scene page (mostly `ai-tells.EmDashUsage`, `VerbTricolon`). Quality failure on eval Checks and the issue's `cf check` acceptance.

Runner `ResolutionScene-3` (`test-subject` / `@TEST-SUBJECT`). Grader `ResolutionSceneGrade` (`prose-grader` / `@PROSE-GRADER`).

## Rounds

None. Hillclimb paused until live Wiki pages of this content type pass `cf check` with 0 errors; skills stay as found.
