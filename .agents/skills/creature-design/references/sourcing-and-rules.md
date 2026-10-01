# Sourcing and rules

## Source ladder

Use the first source that actually answers the request:

1. The target Wiki: an existing Creature that fits the role and fiction.
2. The 2024 SRD through `dnd5e-srd-api`.
3. Official material outside the SRD, then suitable homebrew material retrieved from the web.
4. A new design, inspired by the closest retrieved peers, only when the earlier sources do not fit.

For every tier reached, record the candidates actually retrieved, the fit test, and the decision. An empty result, rate limit, failed request, or unavailable provider is an incomplete retrieval, not evidence that no candidate exists. Do not silently promote an unresearched candidate to "no fit".

Choose one path:

- **Reuse:** copy a fitting rules figure unchanged.
- **Reskin:** change fiction only; preserve every published number and rule.
- **Variant:** change a small, named set of features and explain each change.
- **New design:** build from retrieved peers and state why reuse, reskin, and variant cannot reach the requested role or decision loop.
- **Retune:** change named values or features because the Party evidence requires it; state the before/after reason and every linked consumer.

Published numbers stay unchanged unless the chosen variant, new design, or retune explicitly earns the change. Never disguise a balance change as a reskin.

## Source record

Keep the working source ledger separate from the page. It names each candidate, source tier, retrieval status, fit, and chosen path. Put external attribution and the candidate/change explanation in the Creature body where the DM can find it. The page's `sources` frontmatter contains only archived Raw paths, such as `archive/creature-source.md`; never put URLs, provider names, or live web addresses there.

ADR 0005 requires the complete rules text in the Wiki. A reused or adapted Creature still gets the complete statblock, not a name-only citation. Paraphrase rules when writing a new expression; preserve a reused block's published rules and numbers.

## 2024 rules ledger

Before filing, reconcile every rule-bearing field against a retrieved 2024 source or an explicit World House Rule:

- ability scores, modifiers, proficiency bonus, AC, HP and Hit Dice;
- attack bonuses, ranges, reach, targets and damage averages;
- save ability, DC, area, failure and success results, and condition endings;
- action timing, recharge, uses, concentration, movement, reactions and any legendary or lair timing;
- damage and condition interactions, resistances, immunities, senses and languages.

Use the exact statblock field shape in `wiki/templates/Creature.md` and 2024 wording. Write derived values explicitly so the gate can recompute them. Do not import 2014 spell-slot restrictions: under 2024 rules, a creature can spend only one spell slot on its turn; a Bonus Action spell does not by itself forbid a leveled spell in the same turn, subject to that one-slot limit and the creature's actual actions.

Every mechanical claim has one of three homes: the retrieved rule, the World House Rule, or a clearly labelled design assumption. Do not invent a 2024 defensive/offensive CR formula.
