# Skills prompt positively, and the linter repairs

Earlier on 2026-10-11, root `AGENTS.md` gained a **Draft to pass** rule. It sent every writer of gated prose to read `skill://lint/prose.md` § Gate rules before drafting and to compose each sentence in its forms. `npc-design` and `ingest` pointed writers at the same list before their first page, `test-subject` read it before its first draft, and `theatre-of-the-mind` tagged its craft with the gate's rule IDs. The same day the DM rejected the approach as pointless and biasing, and set the default design for every creative skill:

```text
The skills describe what agents should do; the linter catches what they should not do. Skills handle positive prompting without biasing toward the wrong behaviours, while the linter catches bad behaviour that slips through. This is the default design for all creative skills going forward: we cannot bloat the skills to constrain creativity; we give them freedom to write naturally and intelligently, and only after the text is actually written do they engage any checks to fix mistakes.
```

He had said the same on 2026-09-24: "Agents need information about what should be done, not what shouldn't."

The research the DM commissioned that day backs the rule:

- **Naming a failure primes it.** [Semantic Gravity Wells](https://arxiv.org/abs/2601.08070) (2026) traced 87.5% of negative-instruction violations to priming, where the instruction's mention of the banned token raises its probability, and confirmed the mechanism with activation patching. Anthropic's [prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) and OpenAI's prompt guide both say to state what to do in place of what to avoid.
- **Constraint stacks flatten prose.** [The Price of Format](https://arxiv.org/abs/2505.18949) (EMNLP 2025) found that imposed structure collapses output diversity even at high temperature. Alignment already narrows lexical and conceptual range ([Mohammadi 2024](https://arxiv.org/abs/2406.05587), [Kirk et al. 2024](https://arxiv.org/abs/2310.06452), [Murthy et al. 2025](https://arxiv.org/abs/2411.04427)), and [IFScale](https://arxiv.org/abs/2507.11538) shows compliance falling as instructions pile up.
- **Revision loops bleach voice.** [Recursive self-refinement](https://arxiv.org/abs/2607.22653) (2026) converges on the model's own fixed-point register within a few rounds. So repair stays a bounded pass driven by concrete findings.
- **Critique after the draft is the suppression that works.** [Suppressing Pink Elephants](https://arxiv.org/abs/2402.07896) (2024) found prompted negative instructions fail where critique and revision after generation succeed. [Antislop](https://arxiv.org/abs/2510.15061) (2025) found prompt-side bans unusable at 2,000 patterns and post-generation filtering effective past 8,000. [Huang et al.](https://arxiv.org/abs/2310.01798) (ICLR 2024) found self-correction helps only when the check is external and explicit, as a linter's findings are.

Decision:

- **Skills and templates write positive craft.** They describe the content to write and the qualities it has. Rule IDs, banned forms and catalogues of error modes stay out of the text a writer reads before drafting.
- **Checks run on written text.** The page gate, a skill's own Gate or final check, and the critique pass all read the finished draft. Each finding gives its rule and passing form, and the writer repairs it then. `skill://lint/prose.md` is the repair reference, read when findings need it.
- **Prohibitions are linter rules.** A constraint kept as a check is defined in a Vale rule, a gate layer or a TTSR rule, which reports the error once it is written. A finding's hint points back to the positive craft entry with its passing form.

Root `AGENTS.md` **Write, then repair** holds the working rule. This partly supersedes [ADR 0020](0020-agent-text-passes-the-style-gate.md), whose skills cited rule IDs.
