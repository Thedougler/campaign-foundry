---
name: dogfood
description: Dogfood — improve a repo skill or process by putting it to real work and fixing the friction it causes. Use when the DM asks to improve a skill or process, and when a subagent's return reports friction or an issue (a confusing step, a wrong fact, a failing tool) during any run. New skills and paired evals go to skill-creator; Eval and Hillclimb measurement to evals/README.md.
---

# Improve agent text through real work

This loop improves agent-facing text and the tools behind it by putting them to use. Subagents do real work and report the **friction** they hit, and you fix what holds up while the job carries on. The job itself is the test. Each round sends its fixes out in one batch, and you read only what a finding needs. It is the only place a skill gains eval cases (root `AGENTS.md` **Skill verification**), through step 4's brief.

**Friction** is anything that cost a subagent correctness or time, such as a confusing, missing or wrong step, a wrong or missing fact, a tool that failed or returned wrong output, or a check cycle spent on avoidable work.

The DM's word mid-run sets the course from your next action. A change to the target, units, scope or a fix applies at once. Steer a running worker with a new instruction through `agent://` (`.omp/AGENTS.md` **Native delegation**) and carry the change into the next brief.

## Starts

A run starts one of two ways. A DM-started run may add eval cases, and a friction-started run may not:

- **DM-started.** The DM asks to improve a skill or process, by name or by invoking `dogfood`. That ask starts a run for every skill in the target's file set, and step 4 may add cases to those skills.
- **Friction-started.** The run opens during other work you orchestrate, when a subagent's return reports friction or the work itself shows rework or misdirection. The DM started the job and not an improvement. The run fixes the friction and leaves every `evals/cases.yaml` as it is.

## Steps

1. **Scope.** State the **target** and its **file set**, the agent-facing files the work routes through. For a skill, that is its `SKILL.md`, the files it points to and the agents it dispatches. For a process, such as ingesting a raw file or prepping a Session, it is the entry point and every skill, `.omp/agents/` definition, `AGENTS.md` rule, template and runbook it routes through. A friction-started run's target is the file the friction traces to, and its job is the work already running. A DM-started run takes the DM's job, or picks a few small live units the target governs (for `lint`: pages carrying `bun run cfcli -- check` findings), each a different kind of case and no two touching the same files. **Done when** the target, file set and job each take one line and every unit has one subagent.
2. **Run.** A friction-started run's work is already under way, so go to step 3 once the batch that reported the friction has returned. A DM-started run dispatches one native `task` batch on the test-subject model that `.omp/AGENTS.md` **Native delegation** sets. Name each subagent after its unit (`S9Merge`), and its transcript is then at `history://<name>`. Brief each one exactly as the target briefs it in production, and add one line asking it to close its return with a friction report: per item, the event plus the file and section where it happened. Steps the target keeps for its orchestrator (logging, generated indexes, the top-level gate) stay with you. A target whose stages the top-level session runs, such as Transcript ingest (`ingest` `references/transcript.md`), is a unit you run yourself as that orchestrator. **Done when** every subagent in the batch has returned or failed.
3. **Triage.** Triage every finding before it reaches the writer. This is the DM's direction, and it overrides any injected memory to forward findings undiagnosed. For each friction item, open the file and section it cites. Read the subagent's `history://` transcript only at the rounds a report leaves in doubt, and rerun a failing command to reproduce it. Add the friction you saw yourself in the returns and the work. Then classify the item:
   - **Text gap** (a step, fact or pointer is unclear, missing or wrong): an issue for `skill-writer`, stated as a process defect with its root-cause file and evidence. The root cause may be outside the file set.
   - **Tool defect** (a CLI, checker or script fails or returns wrong output): fix it in code with a test at its public interface that fails before the fix, or report it to the DM when it lies outside the repo. Keep workarounds out of agent-facing text.
   - **False finding** (the subagent misread, or the text already covers it): dropped, with a one-line reason.

   **Done when** every item has a verdict and every issue states its root-cause file and evidence.
4. **Fix.** Dispatch `skill-writer` once for the round's text issues, passing them with their evidence, the batch's finished `history://` transcripts, the code fixes already made and the files involved. On a DM-started run, the brief also requests an eval case in `<skill-dir>/evals/cases.yaml` for each consumer-visible defect in a file-set skill. Revive that same writer for later rounds of the run, per **Native delegation**. When the round has only tool defects and false findings, skip the dispatch. **Done when** every text issue maps to an edit in the writer's yield and `bun run cfcli -- eval validate <skill-dir>` passes for each touched skill.
5. **Continue.** Report the round in a few lines: each finding with its verdict and each fix by file. A friction-started run then resumes the job on the revised text. A DM-started run returns to step 2 with fresh subagents on fresh units, scaling toward the target's production shape once small units run clean (for `lint`: four to six pages per subagent). It ends when a round's findings are all false or the DM calls it. It then finishes the target's shared steps and runs the page gate over the landed work's pages. **Done when** a friction-started run's job has resumed on the revised text, or a DM-started run has ended and the page gate over every landed unit's pages reports `ok: 0 findings`.
