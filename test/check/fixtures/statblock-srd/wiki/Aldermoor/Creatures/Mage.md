---
type: Creature
summary: "Mage, from the SRD 5.2 monsters."
sources: []
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
name: Mage
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 15
ac_class: ""
hp: 81
hit_dice: 18d8
speed: 30 ft.
stats:
  - 9
  - 14
  - 11
  - 17
  - 12
  - 11
saves:
  - int: 6
  - wis: 4
skillsaves:
  - arcana: 6
  - history: 6
  - perception: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 14
languages: Common plus three other languages
cr: 6
traits: []
actions:
  - name: Multiattack
    desc: The mage makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. *Hit:* 16 (3d8 + 3) Force damage."
  - name: Spellcasting
    desc: "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):"
bonus_actions:
  - name: Misty Step
    desc: The mage casts Misty Step, using the same spellcasting ability as Spellcasting.
reactions:
  - name: Protective Magic
    desc: The mage casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting.
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
