---
type: Creature
summary: "An ambush predator holding the Ashwalls' warm fissures, where the handholds run back into occupied dark."
sources:
 - "archive/ssw-ashwall-islands.md"
---

## At a glance

- **Role at the table.** An occupied-dark ambush in climbing ground: the same crack systems that look like good handholds run back several feet into where it lives.
- **Tell.** A warm handhold with more dark behind it than a hold should have.
- **Used by.** The [[Ashwall Islands]] upper rock faces.

> [!narration] First sight
> One of the upper cracks takes a hand the way every good hold on this face does, and the stone at the back of it moves. Plated black on black, a claw the size of a forearm sits where the holds are, and the tail clears the fissure lip with the sting already forward.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Giant Scorpion"
size: Large
type: beast
alignment: unaligned
ac: 15
hp: 52
hit_dice: "7d10 + 14"
speed: "40 ft."
stats: [16, 13, 15, 1, 9, 3]
senses: "blindsight 60 ft., passive Perception 9"
languages: "none"
cr: "3"
actions:
  - name: Multiattack
    desc: "The scorpion makes two Claw attacks and one Sting attack."
  - name: Claw
    desc: "Melee Attack Roll: +5, reach 5 ft., one target. Hit: 6 (1d6 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws."
  - name: Sting
    desc: "Melee Attack Roll: +5, reach 5 ft., one target. Hit: 7 (1d8 + 3) Piercing damage plus 11 (2d10) Poison damage."
```

## Play

### Tactics

It waits without a sound. The first contact is both claws, and the sting follows before its target is free. Duvane took the claw across the forearm and the sting through the boot without seeing the body at all.

## Depth

### Ecology

Volcanic heat keeps the crevices warm through the cold sea air. The occupied fissures are the reason Ashwall repair work sends two hands up the stone face, one to work and one to keep watch on the rock.

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
