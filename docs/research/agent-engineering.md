# Agent-engineering ledger

Built 2026-10-10 from the Second Brain pages listed under Sources, read against the repo that day. Each finding is sorted into Keep (Campaign Foundry already does it), Adopt (a real gap) or Skip. Each Adopt entry ends with its GitHub issue number.

## Sources

- [Context Engineering for LLM-Wiki Design in an Agentic Skill Graph](https://app.notion.com/p/3f50216635ec81068e72c3e7b64321eb)
- [Graph state machine fundamentals](https://app.notion.com/p/3f10216635ec8142bf6bce1a5357d6fd)
- [Self-Prompting Claude Code Agents (OPAR loops)](https://app.notion.com/p/3f10216635ec8113839ac0294b22d441)
- [Agentic engineering principles](https://app.notion.com/p/3f10216635ec810aa7afc45ad98ea55b)
- [AI Agent Self-Improvement](https://app.notion.com/p/3f10216635ec81b5b459d0770cc32152)
- [Self-prompting agent-directed CLI](https://app.notion.com/p/3f20216635ec81808347d671a228cc98)
- [Deterministic linting for agent-facing text](https://app.notion.com/p/3f20216635ec8155a94cfb92d313fcc2)
- [LLM-wiki Design Research](https://app.notion.com/p/3f10216635ec81fe8cdef8b525f3684a)
- [AI Fiction Prompting Guide](https://app.notion.com/p/3f20216635ec8128b6bee747c5e6186d)
- [AI Roleplay Design Patterns](https://app.notion.com/p/3f10216635ec8167bc46c38d2fe1137d)
- [Narrative Devices for D&D](https://app.notion.com/p/3f30216635ec817b9011cd046981df40)

## Keep (CF already does it)

- **Separate substrates** (Context Engineering). Knowledge is `wiki/` plus the Notion Backup. Procedure is the 50 skills in `.omp/skills/` and `.agents/skills/`. Episodic state is `hot.md`, `log.md`, `story-so-far.md`, the sharpshooter Project decision memory and the `local://collab/` files. The broker is the Orient read order (`AGENTS.md` § Orient) with Backup-first search and QMD (`.omp/AGENTS.md` § Wiki access). Verdict: already in place.
- **Progressive disclosure** (LLM-wiki Design Research, instruction budget; Self-Prompting Claude Code Agents, skills over global prompts). Fifteen skills keep their depth in `references/` and load it at the step that needs it. Each skill's description is its trigger. Verdict: already in place.
- **Filesystem as state across compaction** (LLM-wiki Design Research). `context_notes` and `new_context` (`.omp/AGENTS.md` § Tools, Long work), the ingest `<work>` directory, `evals/<skill>/climb.md` exports and the root rule "The repo is the memory" keep work on disk between context windows. Verdict: already in place.
- **Provenance and temporal validity** (Context Engineering, representation layers 1, 3 and 7). Each Wiki page has `sources` and `revealed` properties, Canon has two tiers (ADR 0026), each Backup page states its repo path and sync commit, and `log.md` is append-only. Verdict: already in place.
- **Deterministic gates, LLM output only as a candidate** (Deterministic linting; Self-prompting CLI, enforcement plane). ADR 0010, the 15 `cf check` layers (`src/check/layers/index.ts`), the root rule Programmable judgment and ADR 0020 (agent text passes the style gate through `bun run lint:agent-text`). Verdict: already in place.
- **Evidence-driven guidance stack** (Self-prompting CLI, guidance stack levels 1 to 6). The `wiki-check` post hook appends findings to each Wiki edit (`.omp/hooks/post/wiki-check.ts`). Six TTSR rules steer at generation time (`.omp/rules/`, with `content-stance.md` judged). The ingest C8 stage routes each finding to the writer that owns the page (`.agents/skills/ingest/references/transcript.md:149`). Verdict: already in place.
- **Source-repair loop that stays lazy until something breaks** (AI Agent Self-Improvement and Agentic engineering principles). The root rules Fix obvious breakage now, Behaviour beats labels and Install before building, plus step 4 of the `dogfood` skill, which sorts friction into a text gap, a tool defect or a false finding (`.omp/skills/dogfood/SKILL.md`). Verdict: already in place.
- **Failures become regression criteria, replay and keep the better result** (AI Agent Self-Improvement, Evaluation and learning). `evals/README.md` § Weekly feedback turns an issue into a criterion. In Hillclimb a round is kept only when no pass flips to a fail. The climb stops once all criteria pass or after three reverted rounds (§ Hillclimb step 5). The `theatre-of-the-mind` `climb.md` tracks a regression split. Verdict: already in place.
- **Weak-model subjects expose unclear instructions** (Agentic engineering principles, complexity sensitivity). The last paragraphs of `.omp/AGENTS.md` § Native delegation run test subjects on the weakest capable model. Verdict: already in place.
- **Bounded worker contracts** (Self-prompting CLI, compact task contracts). Flat dispatch (`task.maxRecursionDepth: 1` in `.omp/config.yml`), dispatch requests returned to the top level, and per-stage `Done when` lines in ingest `references/transcript.md`. Verdict: already in place.
- **Diagnostic editing pass limited to named categories** (AI Fiction Prompting Guide, Editing pass). The bounded Hunt in `theatre-of-the-mind` `references/critique.md` covers it. Verdict: already in place.
- **Narrative devices** (Narrative Devices for D&D). `docs/agents/narrative-devices.md` holds them, cited from `development-scene` step 7 and `plan-session` Callbacks. Verdict: already applied.
- **One agent per character, never one flattened prompt** (AI Roleplay Design Patterns). `simulate-npcs` runs one Persona per NPC under a Director. Verdict: already in place.

## Adopt (gap, one issue each)

- **Skill-graph link check** (Context Engineering § Skill graph and Deterministic linting § Rule families). The skill graph needs typed, verified edges. A broken reference belongs to the structural lint rules. Evidence: `skill://` never appears in `src/`. `cf eval validate` (`src/commands/eval-authoring.ts:9-31`, `evals/authoring.ts:37-78`) checks one skill's frontmatter and relative links only. The root rule "Skills, templates and lint move together" (`AGENTS.md`) requires a list of related files that no tool produces. Verdict: derive the graph from existing `skill://` references and bare backticked skill names, with no new frontmatter fields. (#52)
- **Explicit termination for repair loops** (Graph state machine fundamentals § Loop termination). A loop needs a stopping condition and a fallback once attempts run out. Evidence: in ingest C8 (`.agents/skills/ingest/references/transcript.md:149`) a writer repairs a finding and checks the page again with no cap. C2 (`:79`) is the only stage with a retry cap ("failed twice"). Verdict: two failed repairs of the same finding on the same page escalate it to the DM in the stage's report and end the loop, and the repair loop in `skill://lint` follows the same rule. (#53)
- **Always-loaded instruction budget** (LLM-wiki Design Research § Instruction budget and Context Engineering § Core conceptual distinction). Models degrade as the always-loaded instruction count grows, and a large context window is no database. Evidence: the always-loaded chain from `.omp/AGENTS.md` through `AGENTS.md`, `user-config.md`, `wiki/shattered-sea/campaign-config.md` and `CONTEXT.md` runs to about 689 lines (`CONTEXT.md` alone is 353), and no ADR covers context engineering. Verdict: write ADR 0030 on the four substrates and a ratchet. The chain's word count may not rise above the count measured when the ADR is merged. A test under `bun run check:all` enforces the ceiling. (#54)
- **Fiction brief shape for prose drafts** (AI Fiction Prompting Guide § Scene brief, § Opus 5.5). The best drafts start from a short summary of the story so far, a precise scene brief and a real sample of the target style. The brief states what happens in the scene in positive terms rather than as a list of prohibitions. In the repo, the Beat draft brief at `.omp/skills/collab-with-me/references/story.md:92-99` gives the writer a premise with its relevant context, then the summaries and the characters present. It has no character wants, conflict, subtext, sensory anchors, style anchor, ending state or length target. Nothing under `docs/agents/`, `.omp/agents/` or `collab-with-me` names a style anchor or a scene brief. Verdict: add those fields to the brief. The style anchor is an excerpt of the DM's own prose or the `user-config.md` § Prose voice lines. Leave the research-sourced labels unchanged. (#55)

## Skip

- **Runtime context-broker service, claim-level store with `valid_from`/`valid_to`, vector or graph database** (Context Engineering § Tooling). The Backup, QMD and the `revealed` tiers already do the job at this scale.
- **Typed edge fields in SKILL.md frontmatter** (Context Engineering, node fields). omp reads only `name` and `description`, and the skill-graph check derives edges from text that already exists, which follows the root rule to remove or loosen before adding.
- **Skills that edit their own graph, or ungated self-modification** (Context Engineering § Open problems, SkillsBench negative results). Skill text changes only through Hillclimb and `skill-writer`.
- **Cheap model verifying every turn's transcript** (Self-Prompting Claude Code Agents § Details). The independent audit (`skill://audit`) and `prose-grader` already cover it at task boundaries.
- **OPA/Rego policy, OpenTelemetry export, SQLite checkpoints** (Self-prompting CLI § Practical stack). These belong to a supervisor product, and omp approvals and git cover this repo.
- **Finding fingerprints and cooldowns in `wiki-check`** (Self-prompting CLI § Validator envelope). Under the root Zero findings rule, every finding binds on every check.
- **Porting SillyTavern to Pydantic-AI, group-chat speaker selection** (AI Roleplay Design Patterns). These serve the DM's separate roleplay app, and inside this repo `simulate-npcs` with its Director covers speaker order.
