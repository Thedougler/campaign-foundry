# Exemplar grounding

Before authoring or materially revising 5e mechanics, ground the design in official reference. This is a protocol, not a skill.

1. Resolve campaign rules and constraints first (`rules_sources.primary`, then fallback, then house rules and rulings).
2. Identify the target mechanical form and tier: CR/role, spell level, item rarity, feature cadence.
3. Query the `sources` collection for **2–4 relevant exemplars**, normally one near peer and one contrasting implementation.
4. Retrieve the complete `source-entry` pages. Do not claim from snippets.
5. Extract design patterns: action economy, numerical envelope, resource cadence, wording structure, counterplay, complexity budget.
6. Create original mechanics using those patterns. Do not copy surface text onto a campaign page.
7. Add exact exemplar links to `sources:` when they materially informed the design.
8. Compile and doctor normally.

Fork (`npm run source fork`) when adopting or modifying an exemplar. Chassis-first combatant last mile uses the same fork when a source-entry exists. Never edit the source-entry except to correct transcription. Homebrew with no book still skips a publication page.

World and lore queries must not treat source-entries as setting truth. Mechanical lookup searches `rules` and `sources`.
