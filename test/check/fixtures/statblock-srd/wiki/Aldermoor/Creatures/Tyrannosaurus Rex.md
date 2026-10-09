---
type: Creature
summary: "Tyrannosaurus Rex, from the SRD 5.2 monsters."
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
name: Tyrannosaurus Rex
size: Huge
type: beast
subtype: ""
alignment: unaligned
ac: 13
ac_class: ""
hp: 136
hit_dice: 13d12 + 52
speed: 50 ft.
stats:
  - 25
  - 10
  - 19
  - 2
  - 12
  - 9
saves:
  - str: 10
  - wis: 4
skillsaves:
  - perception: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 14
languages: None
cr: 8
traits: []
actions:
  - name: Multiattack
    desc: The tyrannosaurus makes one Bite attack and one Tail attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 33 (4d12 + 7) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition and can’t be targeted by the tyrannosaurus’s Tail."
  - name: Tail
    desc: "*Melee Attack Roll:* +10, reach 15 ft. *Hit:* 25 (4d8 + 7) Bludgeoning damage. If the target is a Huge or smaller creature, it has the Prone condition."
bonus_actions: []
reactions: []
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
