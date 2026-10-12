# Agent text passes the style gate
Partly superseded by [0036](0036-skills-prompt-positively-the-linter-repairs.md) (skills describe the passing form in positive craft terms, and the finding gives the rule ID).

The page gate fails every em dash on a Wiki page under `ai-tells.EmDashUsage`, yet 32 agent-facing files modelled that dash, and skills restated the narration layer's token lists in their own words. Templates and skills modelled the language the gate then made Lint clean up, page after page. Writers copy the register of the instructions they read, so the instructions have to pass the same gate as the pages.

Decision:

- **Same gate.** Content-facing agent text passes `bun run cfcli -- style` at `ok: 0 findings`, under the same Zero findings rule in `AGENTS.md` as Wiki pages.
- **One gate.** `bun run lint agents` runs `cfcli style` on every file it checks: each explicit path and each changed agent-facing file, unfiltered. The `STYLE_PATHS` list in `scripts/lint/agents.ts` selects only the whole-domain `--all` pass, and the short list makes that run fast: the creative and content skills, `collab-with-me`, `lint`, the `creative-writer` and `persona` agents, the co-writing and Scene docs, and `wiki/templates`. Research copies in `docs/research/`, the vendored `humanizer` and the measurement skills stay outside that list.
- **Rule IDs over token lists.** Flagged words and phrases live only in the Vale YAML under `.vale/styles/`. Skills cite the rule ID (`Narration.NoEmDash`) and describe the passing form.
- **Quoted sources in fences.** A source prompt or rubric that must keep its wording goes in a fenced code block. The gate's prose view drops fenced blocks, and the quote keeps its exact words with no finding on it.

Run `bun run lint agents <files>` after editing agent-facing text: its style check runs `cfcli style` over those files.
