---
type: Creature
summary: "A Minor Slaad creature (CR 1/2) used as a bruiser in The Shattered Sea."
sources:
 - "archive/minor-slaad.md"
---

## At a glance

- **Role at the table.** Bruiser.
- **Threat.** CR 1/2. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Whip Shark]] patrols the same territory.

> [!narration] First sight
> A hunched slaad pulls itself over the stone on knuckled claws, its hide raw and red where the skin has split. It drags a wet ribbon of sloughed flesh behind each step, and its head swings toward the closest sound. As it comes on, its hands end in hooked claws and its lips part over pointed teeth.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Minor Slaad"
size: Medium
type: aberration
alignment: "chaotic neutral"
ac: 13
hp: 26
hit_dice: "4d8 + 8"
speed: "30 ft., climb 20 ft."
stats: [14, 13, 14, 5, 8, 6]
damage_resistances: "acid, cold, fire, lightning, thunder"
senses: "darkvision 60 ft., passive Perception 9"
languages: "understands Slaad but can't speak"
cr: "1/2"
traits:
  - name: Magic Resistance
    desc: "The slaad has advantage on saving throws against spells and other magical effects."
actions:
  - name: Multiattack
    desc: "The slaad makes two attacks: one Bite and one Claw."
  - name: Bite
    desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
  - name: Claw
    desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
```

## Play

### Tactics

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

Five Minor Slaads spawned in the Mercatura crater and were killed by [[Master Kyzil]].

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Linked from
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
