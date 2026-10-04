---
name: spell-design
description: Makes or rebalances a Spell page for a spell that exists nowhere outside the Wiki (homebrew, or a signature spell of this World), with full 2024 rules text, a tradition that casts it, and a source the Party can learn it from. Use when the DM or a design needs a new spell, or when a homebrew Spell needs balancing.
---

# Spell design

The Wiki holds only Spells that the rules sources lack: a spell from the SRD or a book the DM owns is used as published. A good Spell does one thing clearly, offers its caster a real choice, belongs to someone in the World, and can be learned from a named source at a price.

## Steps

1. **Read the Canon.** With qmd, find the Spell's page if it exists, every page that links to it, and the traditions, casters, Factions and places it touches.
2. **Source it** in the order `AGENTS.md` sets. Search the SRD (`dnd5e-srd-api`) and published and homebrew spells on the web for one that already does it. A published spell that fits is used as it is and gets no page. Otherwise take the two or three closest as peers.
3. **The lever.** One sentence naming what the Spell does that no peer does, and the choice it gives its caster (where to put the wall, whom to spare, when to end it).
4. **Tie it to the World.** Its **tradition**: who casts it, where they learned it, and why it exists (a Faction, NPC or Creature page). Its **signature**: what casting it looks, sounds or smells like, rooted in that tradition. Its **price** beyond the slot, when it has one: a material the World makes rare, a mark it leaves, a debt. Run the swap test with a generic spell's name.
5. **Numbers.** The six casting fields in 2024 values (level and school, casting time, range, components with any costly material, duration with concentration, classes), and the effect sized against its peers and the damage table below. Damage at higher levels scales like its peers'.
6. **Rulings.** The three to five tricks Players will try with it, each with its answer; how a target or rival caster counters it; and which named NPC or Creature casts it against the Party.
7. **Discovery.** One named source (an NPC, Item, Site or Faction page) with a reason to hold it, the price of learning it (coin, a favour, a task, a risk), the Clue that tells the Party the source exists, and who notices when a PC first casts it.
8. **Narration.** Hand `theatre-of-the-mind` the Casting slot with the signature.
9. **File** to `wiki/templates/Spell.md` in `<World>/Spells/`: the casting fields At a glance; Effect (the full rules text) and Rulings under Play; Tradition and Who knows it (the source and its price) under Depth. Wikilink every page involved. New facts the Canon lacked are decided as Canon (ADR 0003) and listed in your reply. Run `bun run cf -- check --fix`, then `bun run cf -- check`, given the page path, until that page gate reports `ok: 0 findings`, and list it in the operation's `bun run cf -- log` entry (`--op create` when this skill runs on its own).

## Damage by level

Typical damage for a spell with a save for half; a spell that also imposes a condition or never misses deals less.

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

A cantrip with high damage, no save and long range gets a higher level or fewer strengths. A Spell that wins a Climax outright gets a cost, a contest or a choice.

## Done

- No published spell does its job, and the lever names its choice.
- The tradition links a page, and the signature and price pass the swap test.
- Every casting field holds a 2024 value, and the effect sits within its peers.
- Every likely trick has an answer, and a named source holds it at a price.
- The page gate over the Spell's page reports `ok: 0 findings`, and the reply lists every new fact decided as Canon.
