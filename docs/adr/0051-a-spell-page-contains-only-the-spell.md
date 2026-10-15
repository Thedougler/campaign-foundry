# A Spell page contains only the Spell

Amends [ADR 0039](0039-world-free-pages-live-at-the-vault-root.md) and [ADR 0040](0040-templates-are-minimal-by-default.md) for the Spell kind.

A Spell made for a Campaign used to be routed as a Campaign Spell, its effect, signature and price drawn from the World, with its tradition and teachers in the Spell page's `## Tradition` and `## Who knows it` sections, as Golden Presence and Ossketh in the Shattered Sea still have them. On 2026-10-14 the DM ruled that every Spell is campaign-agnostic, with Fireball, Wish and Wall of Force as the bar, and that a Spell page contains only the Spell: "Is it about the spell? It goes on the spell page. Is it about someone, something or someplace related to the spell? It goes on that thing's page."

Decision:

- **Setting-neutral entry.** A Spell's name, casting fields, rules text, Classes line and Casting Narration don't mention a World, Faction, caste or person, so any Campaign can use it unchanged. A material cost in the rules text uses a material any World has.
- **The page is the Spell.** A Spell page contains its entry, its optional Casting callout and optional `## Rulings` on its own rules. `## Tradition` and `## Who knows it` are retired.
- **Ties live on their subjects.** Who casts the Spell and why, where it is passed on and at what price, and who it is used on go on the page of that NPC, Faction, Deity, Creature, Item or Location, each linking the Spell.
- **Filing is unchanged.** A Spell made for one Campaign may still file in `<campaign-folder>/Spells/`.

Consequences: `wiki/templates/spell.md` drops the two sections, `spell-design` writes the tradition and the source of learning on the related pages, and `CONTEXT.md` **Spell** states the rule. Spell pages that still contain the retired sections migrate when touched, their facts moving to the related pages.
