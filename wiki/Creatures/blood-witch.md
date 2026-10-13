---
title: Blood Witch
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blood Witch
size: Medium
type: humanoid
subtype: any race
alignment: Chaotic Evil
ac: 12
ac_class: 15 with *mage armour*
hp: 78
hit_dice: 12d8 + 24
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 15, 13, 9, 19 ]
saves:
  - wis: 2
  - cha: 7
skillsaves:
  - arcana: 4
  - intimidation: 7
  - perception: 2
  - stealth: 5
damage_resistances: psychic
gear:
  - longsword
  - shortsword
senses: darkvision 120 ft., passive Perception 12
languages: Abyssal plus any one language (usually Common)
cr: "7"
traits:
  - name: Innate Spellcasting
    desc: |-
      The witch's innate spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). The witch can innately cast the following spells, requiring no material components:

      **At will:** *alter self*, *detect magic*, *eldritch blast* (at 11th level), *false life*, *levitate* (self only), *mage armour* (self only)

      **3/day each:** *hellish rebuke*, *hex*, *scorching ray* (at 3rd level)

      **1/day each:** *circle of death*, *enthral*, *suggestion*
  - name: Blood Witch Dance
    desc: The witch can use a bonus action to control the movement of one creature cursed by its *hex* spell that it can see within 30 feet of it. The creature must succeed on a DC 15 Charisma saving throw or use its reaction to move up to 30 feet in a direction of the witch's choice.
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the witch's darkvision.
actions:
  - name: Multiattack
    desc: "The witch makes two attacks: one with its longsword and one with its shortsword."
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage."
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
```
