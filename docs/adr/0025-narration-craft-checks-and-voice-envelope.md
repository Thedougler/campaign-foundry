# Narration craft checks and the voice envelope
Partly superseded by [0029](0029-exemplar-dms-set-the-narration-bar.md) (rule set, corpus).

Extends [ADR 0015](0015-one-gate-with-warning-and-error-severities.md).

`[!narration]` callouts are the prose the DM reads aloud, and the gate already holds them to the `Narration.*` rules and the `narration` layer. The gate had no rule for general craft faults such as passive constructions and clichés. It had none for sentence rhythm either, which no existing tool measures against how a GM actually talks at the table. Harper stays the grammar layer and `.vale.ini` stays as it is.

Decision:

- **Craft checks on Narration only.** The proselint and write-good Vale packages run through `.vale-narration.ini` over `[!narration]` callouts alone, with every line outside a callout blanked and double-quoted speech exempt as NPC voice. Their findings are `style`-layer warnings under each package's rule ID (`write-good.*`, `proselint.*`). The rest of a page's prose keeps `.vale.ini` and its existing styles.
- **Voice envelope.** `narration/voice-envelope` compares a callout of four or more narration sentences with the p5 to p95 range of mean words per sentence and of length spread (standard deviation over mean) across GM passages from criticalrole.fandom.com transcripts. `bun run voice:envelope` rebuilds the range into `src/narration/envelope.json`, which holds only transcript titles and numbers, from a seeded sample that needs at least 500 passages from at least three GMs. The corpus script and the gate measure with one function, `sentenceShape` in `src/narration/analyze.ts`.
- **Local examples.** The same run writes the passage library agents read for rhythm and delivery to `reference/gm-voice/`, which is gitignored and never quoted into the Wiki or used in test fixtures.
- **Warnings first.** Per ADR 0015, both start as warnings and are promoted to error only when the live Wiki has zero findings for the rule.
