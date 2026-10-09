---
type: Creature
summary: "Knight, from the SRD 5.2 monsters."
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
name: Knight
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 18
ac_class: plate armor
hp: 52
hit_dice: 8d8 + 16
speed: 30 ft.
stats:
  - 16
  - 11
  - 14
  - 11
  - 11
  - 15
saves:
  - con: 4
  - wis: 2
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: Frightened
senses: passive Perception 10
languages: Common plus one other language
cr: 3
traits: []
actions:
  - name: Multiattack
    desc: The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.
  - name: Greatsword
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage."
  - name: Heavy Crossbow
    desc: "*Ranged Attack Roll:* +2, range 100/400 ft. *Hit:* 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage."
bonus_actions: []
reactions:
  - name: Parry
    desc: "Trigger: The knight is hit by a melee attack roll while holding a weapon. Response: The knight adds 2 to its AC against that attack, possibly causing it to miss."
legendary_description: ""
legendary_actions: []
```

## Play

Text.

## Depth

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    order:
      - file.name
```
