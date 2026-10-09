---
type: Creature
summary: "Seeded stat block: Unknown Ability."
sources: []
revealed: ""
title: "Unknown Ability"
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
name: Apprentice Mage
size: Medium
type: humanoid
subtype: ""
alignment: neutral
ac: 15
ac_class: mage armor
hp: 49
hit_dice: 9d8 + 9
speed: 30 ft.
stats: [10, 14, 12, 20, 15, 11]
saves:
  - int: 9
  - luck: 6
skillsaves:
  - arcana: 13
  - perception: 6
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 16
languages: Common
cr: 12
traits: []
actions:
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 150 ft. *Hit:* 27 (4d10 + 5) Force damage."
  - name: Fire Wave
    desc: "*Dexterity Saving Throw:* DC 17, each creature in a 15-foot Cone. *Failure:* 22 (5d8) Fire damage. *Success:* Half damage."
  - name: Spellcasting
    desc: "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17, +9 to hit with spell attacks):"
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
