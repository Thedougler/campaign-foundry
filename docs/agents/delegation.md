# Delegation mechanics

Dispatch project agents with native `task` or eval `agent()`/`workpool()`. Give each brief its target, sources, requested change and expected output.

## Agent roster

- `skill-writer` writes skills and agent-facing text; `documenter` maintains project documentation.
- `coder` implements code and its covering tests.
- `test-subject` runs eval cases; `smart-test-subject` runs cases marked `subject: smart`; `prose-grader` grades independently. Eval mechanics live in `skill://dogfood` references.
- `creative-writer` drafts prose; `persona` plays an NPC using only its supplied dossier and events.
- `transcript-reader` turns Transcript ranges into Session Ledger material.
- `lookup` researches read-only questions and returns evidence.
- `linter` repairs lint findings as described below.

## Models

Agent frontmatter and effective omp configuration select models. Use `skill://model-evidence` for choices requiring evidence. Graders use a vendor outside their subjects; the blind Benchmark Council uses its defined seats (ADR 0038). Keep each Benchmark runner and grader pair's model and thinking level aligned.

## Linter

Brief `linter` with the paths and check command. It repairs findings in the page's meaning and voice and returns the actual check result. Agents can repair their own findings directly; the linter provides a specialist for delegated repairs (ADR 0047). A wrong rule or template gets corrected at its source.

## Gate detail

The `wiki-check` hook returns page findings after Wiki edits. A page gate evaluates the named pages while reading the rest of the Wiki as context. Repair guidance lives in `skill://lint` and its prose reference.
