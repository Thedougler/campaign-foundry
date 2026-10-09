---
type: Creature
summary: "A huge shark that follows damaged hulls near the Ashwall lee, where
  wreckage feeds the food chain."
sources:
  - "archive/ssw-galewall.md"
revealed: ""
title: "Giant Shark"
---

## At a glance

- **Role at the table.** It arrives on the damaged hull on purpose, and it can wait for the hull to get worse.
- **Used by.** The cold water near the [[ashwall-islands|Ashwall Islands]] lee.

> [!narration] First sight
> A smooth wake keeps pace off the quarter, wide and unhurried, closing when the hull works over its old damage. Flat water stays above it. The shadow in the dark water is longer than the ship's gig, and it holds its distance while the crew is loud and the hull is whole.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Giant Shark"
size: Huge
type: beast
alignment: unaligned
ac: 13
hp: 92
hit_dice: "8d12 + 40"
speed: "5 ft., swim 60 ft."
stats: [23, 11, 21, 1, 10, 5]
skillsaves:
  - perception: 3
senses: "blindsight 60 ft., passive Perception 13"
languages: "none"
cr: "5"
traits:
  - name: Water Breathing
    desc: "The shark can breathe only underwater."
actions:
  - name: Multiattack
    desc: "The shark makes two Bite attacks."
  - name: Bite
    desc: "Melee Attack Roll: +9, reach 5 ft., one target. Advantage on the roll if the target does not have all its Hit Points. Hit: 22 (3d10 + 6) Piercing damage."
```

## Play

### Outside a fight

They follow damaged hulls near the lee. The crews know the pattern, and a wake that keeps pace with a hurt ship tells the hull's condition plainer than the carpenter's report.

## Depth

### Ecology

Storms kill more ships than monsters in the [[galewall|Galewall]], and wreckage feeds a food chain that starts where the storm ends. The sharks stand near the top of it, working the water where the survivors gather.

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
