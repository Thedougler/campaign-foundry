---
type: Creature
summary: "Priest, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Priest"
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
name: Priest
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 13
ac_class: chain shirt
hp: 38
hit_dice: 7d8 + 7
speed: 30 ft.
stats:
  - 16
  - 10
  - 12
  - 13
  - 16
  - 13
saves: []
skillsaves:
  - medicine: 7
  - perception: 5
  - religion: 5
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 15
languages: Common plus one other language
cr: 2
traits: []
actions:
  - name: Multiattack
    desc: The priest makes two attacks, using Mace or Radiant Flame in any combination.
  - name: Mace
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Bludgeoning damage plus 5 (2d4) Radiant damage."
  - name: Radiant Flame
    desc: "*Ranged Attack Roll:* +5, range 60 ft. *Hit:* 11 (2d10) Radiant damage."
  - name: Spellcasting
    desc: "The priest casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):"
bonus_actions:
  - name: Divine Aid
    desc: The priest casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.
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
