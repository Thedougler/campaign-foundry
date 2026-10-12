---
name: friction-report
description: Friction report — write what friction cost, one line per item in the repo's standard format. Subagents close every run's return with it; orchestrators write it the moment they meet friction themselves, then hand the fix off.
---

# Friction report

Report each event that cost correctness, time or tokens, in lines an orchestrator can triage without opening the transcript. The report describes what happened, and its evidence is what you already read and what your tools returned, so it needs no further reads or commands. Subagents and orchestrators write one at different moments:

- **Subagent.** Once your work is final, report the whole run and close your return with it (steps 1 to 4).
- **Orchestrator.** Report each friction event you meet yourself the moment it happens (steps 1 to 3), such as a failed tool call or a confusing step. Then hand the fix off at once through a friction-started `skill://dogfood` run (`.omp/AGENTS.md` **Route friction**) and carry on with your task.

Judge the run by **laziness**, a principle that traces to Clarence Bleicher's 1947 Senate testimony on Frank Gilbreth Sr.'s motion study: "put a lazy man on it, and after 10 days he will have an easy way to do it". Be lazy about everything outside the objective so the objective gets your full effort, and clear the trail so the next agent repeats none of your toil. Quality holds or rises while repeated effort falls. Ask these questions of the run:

- **Trail.** What complex, deterministic work did I do by hand without needing judgement, when a command, script or stated fact could do it for the next agent?
- **Friction.** What slowed me down or misled me that the next agent shouldn't meet?

## Steps

1. **Recall.** Walk the run from the first read to the last tool call; as orchestrator, walk the event you met. Mark each event that cost correctness, time or tokens. Look for these:
   - a step, fact or pointer that was confusing, missing or wrong;
   - a tool or command that failed or returned wrong output, with each retry it took;
   - a file read twice, a read the work never used, or a search for something a step could have named;
   - a workaround or detour around something broken;
   - a **trail**: deterministic, repeatable work done by hand with no judgement in it, such as a multi-command recipe, a hand count or a path built by trial;
   - a gate or check loop that ran more rounds than a clearer rule or a better step order would need;
   - a hole the skill, template or sources left open, where you chose a reading.

   An event you recovered from still counts: the report records the cost, and the recovery goes in its fix. **Done when** each event in the run is either marked or plainly the work itself.
2. **Cheaper path.** For each marked event, state the change that gives the next run the same or better result for less repeated effort. It might reorder a step or give a command verbatim. It might state a missing fact or drop a read. For a trail, the change is the command, script or flag that automates it for the next agent. Trace the event to the file and section that caused it. When no repo file is at fault, as with your own slip, write `own run` there. Drop an event that was the necessary cost of the work. **Done when** each kept hole has the reading you took, and each other kept event has its cost, its place and its cheaper path.
3. **Report.** Write the report in the format below. Each hole you filled with a reading becomes a `Gap:` line. Every other kept event becomes a `Friction:` line, trails included. The report goes where a subagent's definition or brief sets, otherwise as the closing lines of the deliverable it submits in step 4. An orchestrator's lines go to the friction-started `dogfood` run as findings for its triage. **Done when** every kept event is one line in the format and the report ends with a `Friction:` line.
4. **Submit** (subagent). Submitting is the last action of the run: call `yield` exactly once, with no `type` (a `type` marks an incremental section and leaves the run open). Open the report in your yield with the line `Orchestrator: read skill://friction-report and route these lines by it.`, so your caller triages them by this skill. Where your definition or brief sets the yield format, such as an `outputSchema` or a field like `{"reply": …}`, the report goes where that format says, by default as the closing lines of the text field that holds the deliverable. A format with no room for it, such as a grades JSON or an in-character turn, stays as set and leaves the report out. With no format set, `data` is `{"result": "<Markdown>"}`, one string holding the deliverable, then the report lines, ending on the final `Friction:` line. Only the `yield` payload reaches your caller. The run ends on it. **Done when** the run has ended in one `yield` whose payload holds the deliverable and, wherever its format has room, the complete report.

## Format

```text
Gap: <what the skill, template or sources left open> — <the reading you took>
Friction: <event> — cost: <what it cost> — at: <file> § <section> — fix: <the cheaper path>
Friction: none
```

- One item per line, each starting with `Gap:` or `Friction:`, as bare text outside any fence, list or table.
- **Gap** lines come first. A Gap is a hole you filled with a reading and kept working, so the orchestrator can confirm or correct that reading.
- **Friction** lines follow, one per kept event from step 2. `cost` is a count or a concrete loss, such as `2 failed calls` or `1 section rebuilt`. `at` is a repo-relative path and its heading, the command for a tool failure (`bun run cfcli -- style`), or `own run`.
- `Friction: none` is the last line when step 2 didn't keep a Friction event, whether or not Gap lines precede it.
