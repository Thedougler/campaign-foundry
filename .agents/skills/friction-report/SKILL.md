---
name: friction-report
description: Friction report — reflect on finished work and close the return with what it cost, one line per item in the repo's standard format. Use when your definition or orchestrator asks for a friction report, or when asked to reflect on completed work.
---

# Friction report

Look back over a finished run and report each event that cost it correctness, time or tokens, in lines an orchestrator can triage without opening your transcript. The work is final before this skill starts, and the report describes the run as it happened. Your own run is the whole evidence: the files you read and the results your tools returned. The report needs no further reads or commands.

Judge the run by **laziness**, a principle that traces to Clarence Bleicher's 1947 Senate testimony on Frank Gilbreth Sr.'s motion study: "put a lazy man on it, and after 10 days he will have an easy way to do it". Be lazy about everything outside the objective so the objective gets your full effort, and clear the trail so the next agent repeats none of your toil. Quality holds or rises while repeated effort falls. Ask these questions of the run:

- **Trail.** What complex, deterministic work did I do by hand without needing judgement, when a command, script or stated fact could do it for the next agent?
- **Friction.** What slowed me down or misled me that the next agent shouldn't meet?

## Steps

1. **Recall.** Walk the run from the first read to the last tool call and mark each event that cost correctness, time or tokens. Look for these:
   - a step, fact or pointer that was confusing, missing or wrong;
   - a tool or command that failed or returned wrong output, with each retry it took;
   - a file read twice, a read the work never used, or a search for something a step could have named;
   - a workaround or detour around something broken;
   - a **trail**: deterministic, repeatable work done by hand with no judgement in it, such as a multi-command recipe, a hand count or a path built by trial;
   - a gate or check loop that ran more rounds than a clearer rule or a better step order would need;
   - a hole the skill, template or sources left open, where you chose a reading.

   An event you recovered from still counts: the report records the cost, and the recovery goes in its fix. **Done when** each event in the run is either marked or plainly the work itself.
2. **Cheaper path.** For each marked event, state the change that gives the next run the same or better result for less repeated effort. It might reorder a step or give a command verbatim. It might state a missing fact or drop a read. For a trail, the change is the command, script or flag that automates it for the next agent. Trace the event to the file and section that caused it. When no repo file is at fault, as with your own slip, write `own run` there. Drop an event that was the necessary cost of the work. **Done when** each kept hole has the reading you took, and each other kept event has its cost, its place and its cheaper path.
3. **Report.** Write the report in the format below at the point your caller sets: the definition or brief that sent you here. With no point set, the report is the last lines of your return. Each hole you filled with a reading becomes a `Gap:` line. Every other kept event becomes a `Friction:` line, trails included. **Done when** every kept event is one line in the format and the report ends with a `Friction:` line.

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
