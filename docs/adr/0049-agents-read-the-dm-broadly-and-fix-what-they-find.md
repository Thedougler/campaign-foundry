# Agents read the DM broadly and fix what they find

Amends [ADR 0042](0042-friction-reports-record-the-skill-writer-fixes.md), [ADR 0045](0045-linters-make-every-lint-repair.md) and [ADR 0047](0047-agents-lint-their-own-work.md).

Root `AGENTS.md` **Fix on sight** told agents that any friction is an error. The text around it then narrowed it. An OpenAI-family run reported **Fix on sight** work outside its brief instead of making it. A subagent repaired only what its slice owned and reported the rest. A gate finding still flagged after two repairs left the loop unrepaired, and the report quoted it for the DM. A `linter` returned every repair on another file as a handoff. An Ingest page writer left a sibling's page and a missing stub for the orchestrator. Agents read the rule as covering agent tooling and left wrong Canon standing.

On 2026-10-13 the DM rejected every one of those readings: "IT MEANS FUCKING EVERYTHING. IF YOU CAN IDENTIFY THE PROBLEM YOU FIX IT. END OF STORY. FOR EVERYTHING. NO EXCEPTIONS". He named the pattern behind them: "I AM FUCKING SICK OF SETTING A RULE AND THEN DISCOVERING OVER THE NEXT COUPLE WEEKS ALL THE IRRITATINGLY PEDANTIC AND ANNOYING CARVE OUT AND EXCEPTIONS AGENTS HAVE MISINTERPRETED. ITS ALWAYS THE LEAST USEFUL NARROWEST POSSIBLE INTERPRETATION I NEVER MEAN. WHEN I SAY ALL I MEAN ALL. WHEN I SAY EVERYTHING I MEAN EVERYTHING. WHEN I SAY FIX IT MEAN FUCKING FIX IT."

Decision:

- **Read the DM broadly.** Every DM rule and instruction takes its widest plain meaning. When a narrow and a broad reading both fit, the agent takes the broad one, and no agent adds a carve-out, exception or scope limit the DM didn't state. This rule absorbs **Rules without exceptions** and opens root `AGENTS.md` **Working rules**.
- **The finder fixes.** An agent fixes each problem it identifies in the same run, whatever the file and whoever's brief or slice it falls in. Canon, Prep, gate findings, stale text, code and docs all count. A file kind the agent's role leaves to another agent gets its fix through that agent's dispatch. The one problem returned unfixed is one that needs someone else's credentials or a real-world action by the DM.
- **A stubborn finding has a cause.** When a gate finding is still flagged after two repairs, the run looks for its cause (`skill://lint` step 7). That cause is skill or template wording that asks for the flagged text, or a rule that misreads the sentence. When each recast lost meaning or voice, the run recasts from the ledger anew. Any rule change still waits on the DM's confirmation (root `AGENTS.md` **Zero findings**).
- **Repairs extend to other files.** A `linter` makes the stubs, aliases, inbound links and index runs its repairs need. An Ingest page writer edits a sibling's page on a fresh read and makes the stub for an unowned name.
- **Reports record, fixes still happen.** A friction report records every event, fixed or not. The agent that met it fixes what it identified, and the `skill-writer` still diagnoses the deeper cause behind the lines (ADR 0042).

Consequences:

- Root `AGENTS.md` gains **Read the DM broadly** and rewrites **Fix on sight** and **Zero findings**.
- `skill://lint` and its `prose.md` send a finding still flagged after two repairs to its cause.
- `.omp/AGENTS.md` **Split by domain** and the `linter` and `skill-writer` agent definitions route each fix to the agent that makes it.
- The `ingest` `SKILL.md`, `writer.md` and `transcript.md` let page writers edit a sibling's page and make stubs.
- `skill://friction-report`, `skill://collab-with-me`, `docs/agents/delegation.md` § Linter, `skill://dogfood` `references/evals.md` and `skill://npc-design` lose their carve-outs.
- ADR 0045's handoff to the dispatcher is void, and so are its "failed twice" quote for the DM and ADR 0047's.
