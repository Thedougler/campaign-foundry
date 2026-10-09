---
type: Creature
summary: "Archmage, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Archmage"
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
name: Archmage
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 17
ac_class: ""
hp: 170
hit_dice: 31d8 + 31
speed: 30 ft.
stats:
  - 10
  - 14
  - 12
  - 20
  - 15
  - 16
saves:
  - int: 9
  - wis: 6
skillsaves:
  - arcana: 13
  - history: 9
  - perception: 6
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: psychic
condition_immunities: Charmed (with Mind Blank)
senses: passive Perception 16
languages: Common plus five other languages
cr: 12
traits:
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +9, reach 5 ft. or range 150 ft. *Hit:* 27 (4d10 + 5) Force damage."
  - name: Spellcasting
    desc: "The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17):"
bonus_actions:
  - name: Misty Step
    desc: The mage casts Misty Step, using the same spellcasting ability as Spellcasting.
reactions:
  - name: Protective Magic
    desc: The archmage casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting.
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
