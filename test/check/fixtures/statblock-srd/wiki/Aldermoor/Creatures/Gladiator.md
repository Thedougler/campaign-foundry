---
type: Creature
summary: "Gladiator, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Gladiator"
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
name: Gladiator
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 16
ac_class: shield, studded leather armor
hp: 112
hit_dice: 15d8 + 45
speed: 30 ft.
stats:
  - 18
  - 15
  - 16
  - 10
  - 12
  - 15
saves:
  - str: 7
  - dex: 5
  - con: 6
  - wis: 4
skillsaves:
  - athletics: 10
  - performance: 5
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 11
languages: Common
cr: 5
traits: []
actions:
  - name: Multiattack
    desc: The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash.
  - name: Spear
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. *Hit:* 11 (2d6 + 4) Piercing damage."
  - name: Shield Bash
    desc: "*Strength Saving Throw:* DC 15, one creature within 5 feet that the gladiator can see. *Failure:* 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
bonus_actions: []
reactions:
  - name: Parry
    desc: "Trigger: The gladiator is hit by a melee attack roll while holding a weapon. Response: The gladiator adds 3 to its AC against that attack, possibly causing it to miss."
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
