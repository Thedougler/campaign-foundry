---
name: dogfood
description: Dogfood a skill — improve it by having subagents do real work with it in rounds, fixing tool defects in code and skill gaps through skill-writer while the work lands. No cases or graders; committed-case measurement is the Eval or Hillclimb in evals/README.md.
---

# Dogfood

Dogfooding improves a skill by using it. Subagents do real work the skill governs on **units** (one page, one finding cluster, one job), report the **friction** they hit, and you turn that friction into fixes between **rounds**. The work lands for real: the loop ends with the job done as well as the skill improved. It is neither an Eval nor a Hillclimb: no `cases.yaml`, and a `prose-grader` only when quality is in doubt. The DM's home Session stays the [Playtest](../../../evals/README.md#weekly-feedback).

Friction is anything that cost a subagent correctness or time: an unclear or missing step, a wrong or missing fact, a tool that misbehaved, a check cycle spent on avoidable work.

## Steps

1. **Pick units.** Choose live units the target skill governs (for `lint`: pages carrying `bun run cf -- check` findings). Round one gives each subagent one unit, a few subagents at once within the per-provider cap in `.omp/AGENTS.md`, each on a different case shape (for `lint`: a Creature echo, a played Session record, a Faction, an NPC). **Done when** every unit is assigned to exactly one subagent and no two subagents share a case shape.
2. **Dispatch the round.** One native `task` batch. Brief each item as the skill briefs its own subagents (same skill loads, inputs and return shape), or with the skill's own steps when it has no subagent brief. Shared steps the skill keeps for its orchestrator (logging, generated indexes, the full gate) stay with you. The configured model is the default; a cheaper one through the session-only `task.agentModelOverrides` is optional. Each subagent loads the target skill, does the real work on its units and returns its result, a before/after, the check cycles it used, and its friction with where the time went. **Done when** every dispatch has returned or failed and you hold each report.
3. **Assess.** Verify every unit yourself: run the skill's gate on the touched files and spot-check quality and facts against their sources. Record each unit's verdict, duration and check cycles. Sort every friction item:
   - **Tool defect** (a CLI, checker or script misbehaves): fix it in code with a test that fails before the fix. The skill text stays free of workarounds.
   - **Skill gap** (a step is unclear, missing or wrong): keep it with the report text that shows it.

   A unit that failed returns to the pool for the next round. **Done when** every unit has a verdict and duration, and every friction item is either a landed code fix or a skill gap with its evidence.
4. **Revise.** Dispatch `skill-writer` with the skill's files, each skill gap stated as a process defect with its evidence, and the code fixes already landed. Skip when the round surfaced no skill gap. **Done when** every skill gap from the round has a corresponding instruction change.
5. **Scale.** Run the next round from step 2 with the revised skill on fresh units. Once single units pass, scale toward the skill's production shape (for `lint`: batches of four to six pages per subagent). Compare duration, token cost and quality with earlier rounds; a revision that slows units or raises cost without a quality gain is friction too. **Done when** a round at production scale passes every unit and reports no new friction.
6. **Finish the job.** Run the remaining units with the final skill at production scale, then the skill's shared steps and its full gate. Report per round: units, durations, cost where observed, code fixes and skill revisions. **Done when** every unit the request covers has landed, the full gate is clean, and the report accounts for every round.
