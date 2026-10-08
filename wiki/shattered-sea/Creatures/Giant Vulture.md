---
type: Creature
summary: "A cliff scavenger of the Ashwalls whose numbers spike after a wreck, a rough tally of what the storm took."
sources:
 - "archive/ssw-ashwall-islands.md"
---

## At a glance

- **Role at the table.** Its count is intelligence. Numbers above the baseline after a crossing mean something came through the storm in pieces.
- **Tell.** More birds over the clifftops than the day before.
- **Used by.** The [[Ashwall Islands]] cliffs and high updraughts.

> [!narration] First sight
> A slow circle of dark wings turns above the cliffs where the updraught runs, and new arrivals keep joining it from the open water. None of them descend. The count is wrong for a quiet day, and the birds know something the water has not told you yet.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Giant Vulture"
size: Large
type: monstrosity
alignment: neutral evil
ac: 10
ac_class: unarmored
hp: 25
hit_dice: "3d10 + 9"
speed: "10 ft., fly 60 ft."
stats: [15, 10, 16, 6, 12, 7]
saves: []
skillsaves:
  - perception: 3
senses: "darkvision 60 ft., passive Perception 13"
languages: "understands Common but can't speak"
cr: 1
traits:
  - name: Pack Tactics
    desc: "The vulture has Advantage on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition."
actions:
  - name: Gouge
    desc: "Melee Attack Roll: +4, reach 5 ft. Hit: 9 (2d6 + 2) Piercing damage, and the target has the Poisoned condition until the end of its next turn."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Outside a fight

They work the clifftops and the high updraughts in numbers that spike after a wreck. Pilots read the count rather than the birds. A high one sends questions to the lee before anyone sails west.

## Depth

### Ecology

Wreckage feeds the cliffs as it feeds the water below. The vultures arrive with the tide that brings the debris, and they leave when it is gone.

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
