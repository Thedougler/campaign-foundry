---
type: Creature
summary: "Storm Giant, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Storm Giant"
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
name: Storm Giant
size: Huge
type: giant
subtype: ""
alignment: chaotic good
ac: 16
ac_class: ""
hp: 230
hit_dice: 20d12 + 100
speed: 50 ft., fly 25 ft., hover true, swim 50 ft.
stats:
  - 29
  - 14
  - 20
  - 16
  - 20
  - 18
saves:
  - str: 14
  - con: 10
  - wis: 10
  - cha: 9
skillsaves:
  - arcana: 8
  - athletics: 14
  - history: 8
  - perception: 10
damage_vulnerabilities: ""
damage_resistances: cold
damage_immunities: lightning, thunder
condition_immunities: ""
senses: darkvision 120 ft., truesight 30 ft., passive Perception 20
languages: Common, Giant
cr: 13
traits:
  - name: Amphibious
    desc: The giant can breathe air and water.
actions:
  - name: Multiattack
    desc: The giant makes two attacks, using Storm Sword or Thunderbolt in any combination.
  - name: Storm Sword
    desc: "*Melee Attack Roll:* +14, reach 10 ft. *Hit:* 23 (4d6 + 9) Slashing damage plus 13 (3d8) Lightning damage."
  - name: Thunderbolt
    desc: "*Ranged Attack Roll:* +14, range 500 ft. *Hit:* 22 (2d12 + 9) Lightning damage, and the target has the Blinded and Deafened conditions until the start of the giant’s next turn."
  - name: Lightning Storm
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 10-foot-radius, 40-foot-high Cylinder originating from a point the giant can see within 500 feet. *Failure:* 55 (10d10) Lightning damage. *Success:* Half damage."
  - name: Spellcasting
    desc: "The giant casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 18):"
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
