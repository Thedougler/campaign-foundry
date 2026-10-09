---
type: Creature
summary: "A large bat whose colonies roost in the Ashwall vent caves, where
  volcanic heat keeps the fissures warm year-round."
sources:
  - "archive/ssw-ashwall-islands.md"
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** A roost hazard of the warm vent caves: the caves give shelter from the cold sea air, and the roosts are why crews think twice.
- **Used by.** The [[Ashwall Islands]] vent caves.

> [!narration] First sight
> Warm air rolls out of the cave mouth into the cold. Inside, a low shifting sound fills the dark, like canvas moved by many small hands. Far up, the roof itself is fur and folded wings, packed close from wall to wall.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Giant Bat"
size: Large
type: beast
alignment: unaligned
ac: 13
hp: 22
hit_dice: "4d10"
speed: "10 ft., fly 60 ft."
stats: [15, 16, 11, 2, 12, 6]
senses: "blindsight 120 ft., passive Perception 11"
languages: "none"
cr: "1/4"
actions:
  - name: Bite
    desc: "Melee Attack Roll: +5, reach 5 ft., one target. Hit: 6 (1d6 + 3) Piercing damage."
```

## Play

### Outside a fight

The colonies hang in the warm fissures throughout the spire chain, large enough that a repair crew working below a roost at dusk learns not to do that again.

## Depth

### Ecology

Volcanic heat keeps the interior fissures warm enough for the bats year-round, through cold sea air. The same warm cave systems that shelter travellers are occupied dark.

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
