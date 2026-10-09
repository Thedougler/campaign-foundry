---
type: Creature
summary: "Planetar, from the SRD 5.2 monsters."
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
name: Planetar
size: Large
type: celestial
subtype: ""
alignment: lawful good
ac: 19
ac_class: ""
hp: 262
hit_dice: 21d10 + 147
speed: 40 ft., fly 120 ft., hover true
stats:
  - 24
  - 20
  - 24
  - 19
  - 22
  - 25
saves:
  - str: 12
  - con: 12
  - wis: 11
  - cha: 12
skillsaves:
  - perception: 11
damage_vulnerabilities: ""
damage_resistances: radiant
damage_immunities: ""
condition_immunities: Charmed, Exhaustion, Frightened
senses: truesight 120 ft., passive Perception 21
languages: All; telepathy 120 ft.
cr: 16
traits:
  - name: Divine Awareness
    desc: The planetar knows if it hears a lie.
  - name: Exalted Restoration
    desc: If the planetar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.
  - name: Magic Resistance
    desc: The planetar has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The planetar makes three Radiant Sword attacks or uses Holy Burst twice.
  - name: Radiant Sword
    desc: "*Melee Attack Roll:* +12, reach 10 ft. *Hit:* 14 (2d6 + 7) Slashing damage plus 18 (4d8) Radiant damage."
  - name: Holy Burst
    desc: "*Dexterity Saving Throw:* DC 20, each enemy in a 20-foot-radius Sphere centered on a point the planetar can see within 120 feet. *Failure:* 24 (7d6) Radiant damage. *Success:* Half damage."
  - name: Spellcasting
    desc: "The planetar casts one of the following spells, requiring no Material components and using Charisma as spellcasting ability (spell save DC 20):"
bonus_actions:
  - name: Divine Aid
    desc: The planetar casts Cure Wounds, Invisibility, Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting.
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
