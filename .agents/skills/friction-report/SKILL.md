---
name: friction-report
description: Friction report — record the friction a run met, one line per item in the repo's standard format. Subagents close every run's return with it; orchestrators write it the moment they meet friction themselves, then route it.
---

# Friction report

Report the friction you met: each event that impeded your work at a cost in correctness, time or tokens. Write it in lines an orchestrator can triage without opening the transcript. The report uses only what you already read and what your tools returned, so it needs no further reads or commands beyond the two that fill a subagent's `Model:` line. Subagents and orchestrators write one at different moments:

- **Subagent.** Once your work is final, report the friction the run met and close your return with it (steps 1 to 4).
- **Orchestrator.** Report each friction event you meet yourself the moment it happens (steps 1 to 3), such as a failed tool call or a confusing step. Then route the lines by `.omp/AGENTS.md` **Route friction** and carry on with your task.

You fix each problem you identify in the same run (root `AGENTS.md` **Fix on sight**). The report still records every event with its cost and its place, fixed or not. A friction line is often the symptom of a deeper problem. The `skill-writer` that `.omp/AGENTS.md` **Route friction** dispatches diagnoses the root issue behind the lines and fixes it at the source, and the report's job is to put each event in front of it.

## Steps

1. **Recall.** List the friction you met. A subagent lists each event that impeded the work as the run surfaced it, and an orchestrator lists the event in front of it. A run that went smoothly lists nothing. Such events include:
   - a step, fact or pointer that was confusing, missing or wrong;
   - a tool or command that failed or returned wrong output, with each retry it took;
   - a read or search spent finding something a step left unnamed;
   - a workaround or detour around something broken;
   - a **trail** (root `AGENTS.md` **Proactive laziness**): repeatable work you did by hand with no judgement in it, such as a multi-command recipe or a path built by trial;
   - a gate or check loop that kept failing round after round;
   - a hole the skill, template or sources left open, where you chose a reading.

   An event you recovered from still counts, and the necessary cost of the work does not. **Done when** each impediment you met is on the list.
2. **Place.** For each listed hole, note the reading you took. For each other listed event, note what happened, what it cost and where you met it, as the format's `cost` and `at` define them. **Done when** each hole has its reading and each other event its cost and place.
3. **Report.** Write the report in the format below. Each hole becomes a `Gap:` line, and every other listed event a `Friction:` line, trails included. The report goes where a subagent's definition or brief sets, otherwise as the closing lines of the deliverable it submits in step 4. An orchestrator's lines go to the friction-started `dogfood` run as findings for its triage. **Done when** every listed event is one line in the format and the report ends with a `Friction:` line.
4. **Submit** (subagent). Submitting is the last action of the run: call `yield` exactly once, with no `type` (a `type` marks an incremental section and leaves the run open). Open the report in your yield with the line `Orchestrator: read skill://friction-report and route these lines by it.`, so your caller triages them by this skill, then your `Model:` line. Where your definition or brief sets the yield format, such as an `outputSchema` or a field like `{"reply": …}`, the report goes where that format says, by default as the closing lines of the text field that holds the deliverable. A format with no room for it, such as a grades JSON or an in-character turn, stays as set and leaves the report out. With no format set, `data` is `{"result": "<Markdown>"}`, one string holding the deliverable, then the report lines, ending on the final `Friction:` line. Only the `yield` payload reaches your caller. The run ends on it. **Done when** the run has ended in one `yield` whose payload holds the deliverable and, wherever its format has room, the complete report with its `Model:` line.

## Format

```text
Model: <provider/model-id>[, fallback from <provider/model-id>]
Gap: <what the skill, template or sources left open> — <the reading you took>
Friction: <what happened> — cost: <what it cost> — at: <file> § <section>
Friction: none
```

- One item per line, each starting with `Model:`, `Gap:` or `Friction:`, as bare text outside any fence, list or table.
- **Model** opens every subagent report with the model the run actually ran on, because a quota fallback can move a run off its configured model without telling it. Take your agent id from your prompt's `Your id is` line and read `history://<id>:1-1`: its header gives your session journal's path. Then read `<journal path>?q=select(.type=="model_change")|.model&raw=true`, which lists the run's models in order. Write the last one, and when an earlier one differs, add `, fallback from <the first>`, as in `Model: xai-oauth/grok-4.5, fallback from openai-codex/gpt-6-luna`. With no agent id in your prompt, copy the `Model:` line of your system prompt's `<workstation>` block, which holds the current model.
- **Gap** lines come next. A Gap is a hole you filled with a reading and kept working, so the orchestrator can confirm or correct that reading.
- **Friction** lines follow, one per event step 2 placed. `cost` is a count or a concrete loss, such as `2 failed calls` or `1 section rebuilt`. `at` is where you met the event: a repo-relative path and the heading you were following, or the command for a tool failure (`bun run cfcli -- style`). Write `own run` there when no repo file was involved, as with your own slip.
- `Friction: none` is the last line when step 1 listed nothing beyond the holes, whether or not Gap lines precede it.
