# One professional-quality case per content type

The DM cares about one question for a content skill: does it produce professional-quality D&D content of its type? Until now, suites split that question into narrow cases. Separate Narration cases re-tested each Creature First sight or Scene Opening, and the Hillclimb ran a statistical protocol on top (Capability/Regression labels, train/test splits, Noise, Reflection) that cost more runs than it saved.

Decision:

- **Default case.** Each content skill's `evals/cases.yaml` holds one default case. It is a natural DM ask for a complete piece of that content type, grounded in the Shattered Sea. Its rubrics together state what professional-quality content of that type means: table-ready, correct under the 2024 rules and balanced where it has mechanics, consistent with Canon, specific rather than generic, and with Narration slots that meet `theatre-of-the-mind`. The case passes only when every criterion holds.
- **Narration is graded where it is used.** Content skills hand their Narration slots to `theatre-of-the-mind`, so the Creature, NPC, Location, Item, Spell, Vehicle, Faction, Lore, Dungeon and Scene cases grade that Narration. `theatre-of-the-mind` keeps cases only for circumstances no content case covers.
- **Extra cases need a unique circumstance.** A skill gets a second case only when its default case cannot expose the situation, such as chat-only delivery, a Handout, or revising a whole Session's Narration. A one-line comment above each extra case names its circumstance.
- **Simple Hillclimb.** Run the suite, give the failed criteria to `skill-writer` as process defects, apply one patch, and run the suite again. Keep the patch when no criterion that passed before now fails and at least one failing criterion now passes. Otherwise revert it. Stop when every criterion passes, or after three reverted rounds.

Non-content skills (`audit`, `ingest`, `query`, `lint`, `plan-session`, `pull-pcs`, `new-world`, `new-campaign`) keep their suites as they are.
