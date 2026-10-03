# Skill-eval Runners read the live Wiki and save pages to an output directory

> Scoped `write`/`delete_page` capabilities, grants, Session roots and source hashes are superseded by [ADR 0016](0016-evals-run-without-a-custom-harness.md). Live-Wiki reading, the Outcome overlay and Checks still hold.

ADR 0013 gave every trial an independent copy of the Shattered Sea Wiki, Raw and Archive in an OS-temp Session, with frozen baselines, manifests, clone and verify commands, seeded callouts and confined write, move, index, log and check capabilities. GitHub issue [#34](https://github.com/Thedougler/campaign-foundry/issues/34) asked for Runners that see a DM ask the way production does. The copied World cost more than it bought: Runners searched one tree and wrote another, QMD paths needed mapping, and the harness carried hundreds of lines of copy and isolation code.

Runners (`test-subject`) now read the actual live Wiki, Raw, Archive, templates and their assigned skill as they currently are, read-only, with the same production start tour and QMD search a live session uses. Each run gets its own output directory, `<sessionRoot>/outputs/<runId>`. The Runner saves every new or changed page there with a scoped `write` at its Wiki-relative path, records removals with a scoped `delete_page` (kept in `.deleted.json`), and writes the DM reply to `reply.md`. Its completion text is ignored. Writes to the live Wiki are impossible because both capabilities reach only the run's output directory.

An earlier form of this decision had Runners return pages as fenced blocks inside the reply. Files on disk replace those blocks: Runners can reread and revise their drafts, and the harness no longer parses reply text.

`eval:check` runs the case's Checks on the Outcome: live page text with the output pages overlaid and recorded deletions shadowing live pages. `prose-grader` reads the output directory with the live case sources its rubrics need. Runs do not invoke the `bun run cf -- check` gate; the gate stays deterministic for production work (ADR 0010).

Answer isolation stays access control. Runner capabilities deny every `evals/` tree, answer, grader, grade, rubric and snapshot path, other runs and the private Session storage; reads see the live sources plus the run's own output directory. A short OS-temp Session root holds the evaluator artifacts (grant, brief, Grades, source hashes, human-audit samples) and the run outputs, and closing it removes both. The run records hashes of its source pages before dispatch and rechecks them after; a change invalidates the run rather than failing the skill.

Seeded defects are gone: cases ask about pages as they stand. The ADR 0013 grounding rule holds — every case uses real Shattered Sea content — and its copied-World, baseline, clone and seed mechanics are superseded.
