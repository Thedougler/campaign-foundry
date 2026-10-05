# Agent text passes the style gate

The page gate fails every em dash on a Wiki page under `ai-tells.EmDashUsage`, yet 32 agent-facing files modelled that dash, and skills restated the narration layer's token lists in their own words. Templates and skills taught the language the gate then made Lint clean up, page after page. Writers copy the register of the instructions they read, so the instructions have to hold the bar the pages are held to.

Decision:

- **Same gate.** Content-facing agent text passes `bun run cf -- style` at `ok: 0 findings`, under the same Zero findings rule in `AGENTS.md` as Wiki pages.
- **One list.** The paths in `package.json`'s `lint:agent-text` script define content-facing agent text: the creative and content skills, `collab-with-me`, `lint`, the `creative-writer` and `persona` agents, the co-writing and Scene docs, and `wiki/templates`. Research copies in `docs/research/`, the vendored `humanizer` and the measurement skills stay outside it.
- **Rule IDs over token lists.** Flagged words and phrases live only in the Vale YAML under `.vale/styles/`. Skills cite the rule ID (`Narration.NoEmDash`) and describe the passing form.
- **Quoted sources in fences.** A source prompt or rubric that must keep its wording sits in a fenced code block, which the gate's prose view drops, so the quote stays verbatim and the gate stays clean.

Run `bun run lint:agent-text` after any edit to those paths.
