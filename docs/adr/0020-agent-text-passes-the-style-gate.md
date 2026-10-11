# Agent text passes the style gate
Partly superseded by [0036](0036-skills-prompt-positively-the-linter-repairs.md) (skills describe the passing form in positive craft terms, and the finding gives the rule ID).

The page gate fails every em dash on a Wiki page under `ai-tells.EmDashUsage`, yet 32 agent-facing files modelled that dash, and skills restated the narration layer's token lists in their own words. Templates and skills modelled the language the gate then made Lint clean up, page after page. Writers copy the register of the instructions they read, so the instructions have to pass the same gate as the pages.

Decision:

- **Same gate.** Content-facing agent text passes `bun run cfcli -- style` at `ok: 0 findings`, under the same Zero findings rule in `AGENTS.md` as Wiki pages.
- **One list.** The `STYLE_PATHS` list in `scripts/lint/agents.ts` defines content-facing agent text: the creative and content skills, `collab-with-me`, `lint`, the `creative-writer` and `persona` agents, the co-writing and Scene docs, and `wiki/templates`. Research copies in `docs/research/`, the vendored `humanizer` and the measurement skills stay outside it.
- **Rule IDs over token lists.** Flagged words and phrases live only in the Vale YAML under `.vale/styles/`. Skills cite the rule ID (`Narration.NoEmDash`) and describe the passing form.
- **Quoted sources in fences.** A source prompt or rubric that must keep its wording goes in a fenced code block. The gate's prose view drops fenced blocks, and the quote keeps its exact words with no finding on it.

Run `bun run lint agents` after any edit to those paths: its style check runs `cfcli style` over the files on that list.
