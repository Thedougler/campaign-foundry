# Friction reports record, and the skill-writer decides the fix

Amends [ADR 0034](0034-dogfood-is-the-default-skill-improvement.md).

Each `Friction:` line ended on a `fix:` field naming the cheaper path, and the report's first step walked the whole run to mark every costly event. Subagents audited their runs and prescribed fixes, and triage sent tool defects and trails straight to a code worker. On 2026-10-12 the DM redirected the flow. The agent that met the friction has too much context on the issue to judge the fix, and the orchestrator too little to judge its effect. A friction line is often the symptom of a deeper problem.

Decision:

- **Reports record what the run met.** A subagent reports the friction that impeded its work, with each event's cost and place, and a Gap with the reading it took. It states no fix.
- **The skill-writer alone decides the fix.** Every triaged issue reaches `skill-writer`, tool defects and trails included. It diagnoses the root issue and fixes it at the source. A fix in code comes back as a `coder` dispatch request, which the orchestrator dispatches.
- **The orchestrator equips the writer.** It triages the issues and gathers the DM's words and the evidence or docs each diagnosis needs before dispatch. An issue that recurs across units or rounds is stubborn, and the writer gets it with every occurrence to rework the whole passage or process behind it.

Consequences: `skill://friction-report` holds the format and the division of labour. `skill://dogfood` steps 3 to 5 route every issue to `skill-writer` and escalate stubborn ones, and `.omp/AGENTS.md` **Route friction** dispatches each `coder` request the writer returns. ADR 0034's **Specialists fix in parallel** no longer holds.
