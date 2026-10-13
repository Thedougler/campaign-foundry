---
title: Golgari Shaman
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Golgari Shaman
size: Medium
type: humanoid
subtype: elf
alignment: Neutral Evil
ac: 14
ac_class: hide armour
hp: 88
hit_dice: 16d8 + 16
modifier: 2
speed: 30 ft.
stats: [ 11, 15, 12, 12, 17, 16 ]
saves:
  - con: 4
  - wis: 6
skillsaves:
  - arcana: 4
  - insight: 6
  - nature: 4
  - religion: 4
gear:
  - quarterstaff
senses: darkvision 60 ft., passive Perception 13
languages: Common, Elvish
cr: "5"
traits:
  - name: Spellcasting
    desc: |-
      The shaman is an 8th-level Golgari spellcaster. Its spellcasting ability is Wisdom (spell save DC 14, +6 to hit with spell attacks). The shaman has the following druid spells prepared:

      **Cantrips (at will):** *poison spray*, *shillelagh*, thorn whip

      **1st level (4 slots):** *cure wounds*, *entangle*, *ray of sickness*

      **2nd level (3 slots):** *pass without trace*, *ray of enfeeblement*, *spike growth*

      **3rd level (3 slots):** *animate dead*, *dispel magic*, *plant growth*

      **4th level (2 slots):** *blight*, *giant insect*
  - name: Fey Ancestry
    desc: The shaman has advantage on saving throws against being charmed, and magic can't put it to sleep.
actions:
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage, or 6 (1d8 + 2) bludgeoning damage if used with two hands."
  - name: Fungal Rot
    desc: "*Melee Spell Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 9 (2d8) necrotic damage, and the target must make a DC 14 Constitution saving throw, taking 18 (4d8) poison damage on a failed save, or half as much damage on a successful one."
reactions:
  - name: Feed on Death
    desc: When a creature within 30 feet of the shaman drops to 0 hit points, the shaman gains 5 (1d10) temporary hit points.
```
