---
title: Bone Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bone Knight
size: Medium
type: humanoid
subtype: any race
alignment: Any Non-Good alignment
ac: 20
ac_class: bonecraft armour
hp: 84
hit_dice: 13d8 + 26
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 14, 12, 14, 16 ]
saves:
  - wis: 5
  - cha: 6
skillsaves:
  - athletics: 7
  - deception: 6
  - intimidation: 6
damage_resistances: necrotic, poison
gear:
  - greatsword
  - longbow
senses: passive Perception 12
languages: any one language (usually Common)
cr: "5"
traits:
  - name: Spellcasting
    desc: |-
      The knight is an 8th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 14, +6 to hit with spell attacks). It has the following paladin spells prepared:

      **1st level (4 slots):** *command*, compelled duel, *hellish rebuke*, wrathful smite

      **2nd level (3 slots):** *branding smite*, crown of madness, *darkness*, *find steed*, *magic weapon*
  - name: Commander of Bones
    desc: As a bonus action, the knight can target one skeleton or zombie it can see within 30 feet of it. The target must make a DC 14 Wisdom saving throw. On a failed save, the target must obey the knight's commands until the knight dies or until the knight releases it as a bonus action. The knight can command up to twelve undead at a time this way.
  - name: Master of the Pallid Banner
    desc: While within 60 feet of the knight, any undead ally of the knight has advantage on saving throws against any effect that turns undead.
actions:
  - name: Multiattack
    desc: The knight attacks twice with one of its weapons.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 5 (1d8 + 1) piercing damage."
```
