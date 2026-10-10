# Four context substrates and a word ceiling on the always-loaded chain

GitHub issue [#54](https://github.com/Thedougler/campaign-foundry/issues/54). Research: [LLM-wiki Design Research](https://app.notion.com/p/3f10216635ec81fe8cdef8b525f3684a) and [Context Engineering for LLM-Wiki Design in an Agentic Skill Graph](https://app.notion.com/p/3f50216635ec81068e72c3e7b64321eb) (Second Brain), read into the ledger at `docs/research/agent-engineering.md`. No earlier ADR covered context engineering.

Everything an agent of this repo uses divides into four substrates. Mixing them is how wikis rot: knowledge swells the prompt, and the state of one session leaks into the next. The chain omp loads on every turn is five files joined by `@` import lines, from `.omp/AGENTS.md` through `AGENTS.md`, `user-config.md`, `wiki/shattered-sea/campaign-config.md` and `CONTEXT.md`. It ran to 10,002 words with nothing recording it. Model quality falls as always-loaded instructions grow, and a large context window is not a database: attention spent on instructions is attention taken from the Campaign's prose. This ADR gives the four substrates their homes and the chain a ceiling.

Decision:

- **Knowledge** is the Canon: `wiki/` and its Notion Backup ([ADR 0023](0023-notion-backs-up-main.md)). It is read when a task needs it, never loaded whole.
- **Procedure** is the skills in `.omp/skills/` and `.agents/skills/`, each behind its description and read when a run invokes it.
- **Episodic state** is the run's working memory: `hot.md`, `log.md`, `story-so-far.md`, the sharpshooter Project decision memory and the `local://collab/` files.
- **The broker** routes a need to its substrate: the `AGENTS.md` § Orient read order for orientation, the Backup first and QMD second for retrieval (`.omp/AGENTS.md` § Wiki access).
- **The ratchet.** The chain's word count, whitespace-split over its files, may not rise above the ceiling recorded in `test/instruction-budget.test.ts` (10,002 words on landing, enforced by `bun run test` under `bun run check:all`). A change that shrinks the chain lowers the ceiling in the same change. Raising it is a DM decision, recorded as a new line in this file.
- **New always-loaded text needs a home.** Instructions every run needs join one of the four substrates at the home named above or replace equal weight in the chain. Everything else lives behind a pointer, as the ledger's progressive-disclosure entries record.

The test asserts the chain's five files before counting words, and a broken `@` import fails it, so a missing file cannot quietly shrink the counted chain.
