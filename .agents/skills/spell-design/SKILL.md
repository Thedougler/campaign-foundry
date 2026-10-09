---
name: spell-design
description: Makes or rebalances a Spell page for a spell that exists nowhere outside the Wiki (homebrew, or a signature spell of this World), with full 2024 rules text, a tradition that casts it, and a source the Party can learn it from. Use when the DM or a design needs a new spell, or when a homebrew Spell needs balancing.
---

# Spell design

The Wiki stores a Spell page only for a spell the rules sources lack. A spell from the SRD or from one of the DM's books is used as published. A good Spell has one clear effect and leaves its caster a choice about where, whom or when. It belongs to a tradition in the World, and the Party can learn it from a named source at a price.

## Steps

1. **Read the Canon.** With qmd, find the Spell's page if it exists, every page that links to it, and the traditions, casters, Factions and places it touches. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**).
2. **Source it** in the order `AGENTS.md` sets. Search the SRD (`dnd5e-srd-api`) and published and homebrew spells on the web for one that already does it. A published spell that fits is used as it is, without a page of its own. Otherwise take the two or three closest as peers.
3. **The lever.** One sentence stating what the Spell does that no peer does, and the choice it gives its caster (where to put the wall, whom to spare, when to end it).
4. **Tie it to the World.** Link the **tradition** that casts it (a Faction, NPC or Creature page). State where its casters learned it and why it exists. Describe the **signature**, the sight, sound or smell of casting it, rooted in that tradition. When it has a **price** beyond the slot, make it a material the World makes rare, a mark the spell leaves or a debt. Run the swap test with a generic spell's name.
5. **Numbers.** Set the casting fields in 2024 values (level and school, casting time, range, components with any costly material, duration with concentration, classes), and size the effect against its peers and the damage table below. Damage at higher levels scales like its peers'.
6. **Rulings.** Answer the 3 to 5 tricks Players will try with it. State how a target or rival caster counters it and which named NPC or Creature casts it against the Party.
7. **Discovery.** One named source (an NPC, Item, Site or Faction page) with a reason to hold it, the price of learning it (coin, a favour, a task, a risk), the Clue that tells the Party the source exists, and who notices when a PC first casts it.
8. **Narration.** Hand `theatre-of-the-mind` the Casting slot with the signature.
9. **File** to `wiki/templates/Spell.md` in `<campaign-folder>/Spells/` (a page already filed keeps its folder). The casting fields go under At a glance, Effect (the full rules text) and Rulings under Play, and Tradition and Who knows it (the source and its price) under Depth. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Close per `skill://lint` § Commands with the page path.

## Damage by level

Typical damage for a spell with a save for half. A spell that also imposes a condition or never misses deals less.

| Level | One target | Several targets |
| --- | --- | --- |
| cantrip | 1d10 | 1d6 |
| 1 | 2d10 | 2d6 |
| 2 | 3d10 | 4d6 |
| 3 | 5d10 | 6d6 |
| 4 | 6d10 | 7d6 |
| 5 | 8d10 | 8d6 |
| 6 | 10d10 | 11d6 |
| 7 | 11d10 | 12d6 |
| 8 | 12d10 | 13d6 |
| 9 | 15d10 | 14d6 |

A cantrip with high damage and long range that also skips the saving throw moves to a higher level or gives up one of those strengths. A Spell able to end a Climax outright gets a cost, a contest or a choice.

## Done

- No published spell does its job, and the lever states its choice.
- The tradition links a page, and the signature and price pass the swap test.
- Each casting field has a 2024 value, and the effect's numbers fall within its peers' range.
- Rulings answer each likely trick, and a named source offers the Spell at a price.
- The page gate over the Spell's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
