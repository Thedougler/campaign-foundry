---
name: friction-report
description: Friction report — the `Model:`, `Gap:` and `Friction:` lines that close a subagent's return, naming the friction its run could not fix.
---

# Friction report

**Friction** is anything that cost the run correctness, time or tokens: a step, fact or pointer that was confusing, missing or wrong; a tool or command that failed or returned wrong output; a search for something a step left unnamed; a workaround around something broken; a gate loop that kept failing; a **trail**, deterministic work done by hand that a command could do.

Fix friction at its source the moment you meet it: correct the step, fact or pointer, script the trail, repair the broken file, then carry on with the task. Report only the friction you cannot fix from your run, because your tools or role stop you or the fix needs the DM. A fixed problem is finished and leaves no line.

## Format

Close your return with these bare lines, outside any fence, list or table:

```text
Model: <provider/model-id>[, fallback from <provider/model-id>]
Gap: <what the skill, template or sources left open> — <the reading you took>
Friction: <what happened> — at: <file> § <section>
```

- **Model** is the model the run actually ran on, since a quota fallback can move a run off its configured model and eval grading compares it with the grader's family. Read `history://<id>:1-1`, with your id from your prompt's `Your id is` line, for your session journal's path, then `<journal path>?q=select(.type=="model_change")|.model&raw=true` for the run's models in order. Write the last one, adding `, fallback from <the first>` when they differ. With no agent id in your prompt, copy the `Model:` line of your system prompt's `<workstation>` block.
- **Gap** is a hole the skill, template or sources left that you filled with a reading, so the caller can confirm or correct it.
- **Friction** is one unfixed event. `at` is the repo-relative path and the heading you were following, the command for a tool failure, or `own run`.
- With no unfixed friction, the last line is `Friction: none`.

Where your definition or brief sets the return format (an `outputSchema`, a `{"reply": …}` field), the report closes the field that holds the deliverable. A format with no room for it, such as a grades JSON or an in-character turn, stays as set and leaves the report out.

## Receiving a report

The caller fixes each line at its source, through a friction-started `dogfood` run, before it resumes its own work.
