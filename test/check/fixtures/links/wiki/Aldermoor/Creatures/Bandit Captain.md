---
type: Creature
summary: "One line."
sources: []
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** Text.

> [!narration] First sight
> Spoken text for the table.

## Statblock

```statblock
layout: Basic 5e Layout
name: ""
size: ""
type: ""
subtype: ""
alignment: ""
ac: 10
ac_class: ""
hp: 1
hit_dice: "1d8"
speed: "30 ft."
# Str Dex Con Int Wis Cha
stats: [10, 10, 10, 10, 10, 10]
# saves and skillsaves are lists of one-key maps, e.g. "- dex: 4" and "- perception: 4"
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "passive Perception 10"
languages: ""
cr: 0
# traits, actions, bonus_actions, reactions, legendary_actions: "- name: X" then "desc: ..."
# 2024 attack format: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage."
traits: []
actions: []
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

Text.

### Tactics

Text.

### Outside a fight

Text.

## Depth

Text.

### Ecology

Text.

### Hidden truths

Text.

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
