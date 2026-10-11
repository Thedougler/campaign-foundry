# Four context substrates and a reported budget for the always-loaded chain

GitHub issue [#54](https://github.com/Thedougler/campaign-foundry/issues/54). Research: [LLM-wiki Design Research](https://app.notion.com/p/3f10216635ec81fe8cdef8b525f3684a) and [Context Engineering for LLM-Wiki Design in an Agentic Skill Graph](https://app.notion.com/p/3f50216635ec81068e72c3e7b64321eb) (Second Brain), read into the ledger at `docs/research/agent-engineering.md`. No earlier ADR covered context engineering.

Everything an agent of this repo uses divides into four substrates. Mixing them is how wikis rot: knowledge swells the prompt, and the state of one session leaks into the next. The chain omp loads on every turn is five files joined by `@` import lines, from `.omp/AGENTS.md` through `AGENTS.md`, `user-config.md`, `wiki/shattered-sea/campaign-config.md` and `CONTEXT.md`. No check reported its size. Model quality falls as always-loaded instructions grow, and a large context window is not a database: attention spent on instructions is attention taken from the Campaign's prose. This ADR gives the four substrates their homes and makes the chain's size visible.

Decision:

- **Knowledge** is the Canon: `wiki/` and its Notion Backup ([ADR 0023](0023-notion-backs-up-main.md)). It is read when a task needs it, never loaded whole.
- **Procedure** is the skills in `.omp/skills/` and `.agents/skills/`, each behind its description and read when a run invokes it.
- **Episodic state** is the run's working memory: `hot.md`, `log.md`, `story-so-far.md`, the sharpshooter Project decision memory and the `local://collab/` files.
- **The broker** routes a need to its substrate: the `AGENTS.md` § Orient read order for orientation, the Backup first and QMD second for retrieval (`.omp/AGENTS.md` § Wiki access).
- **A reported count.** `bun run lint agents` reports the chain's word count, whitespace-split over its files, as information for the agent's judgement. It is never a pass or fail gate. **Less is more** (`AGENTS.md`) and the rule below carry the discipline. On 2026-10-10 the DM removed the earlier hardcoded ceiling: it went stale and turned every addition into word-shaving.
- **New always-loaded text needs a home.** Instructions every run needs join one of the four substrates at the home named above. Everything else lives behind a pointer, as the ledger's progressive-disclosure entries record.

The lint reports a broken `@` import as a finding, so a missing file cannot quietly shrink the reported chain.
