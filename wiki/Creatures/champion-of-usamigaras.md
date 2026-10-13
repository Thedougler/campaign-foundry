---
title: Champion of Usamigaras
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Champion of Usamigaras
size: Medium
type: humanoid
alignment: typically Chaotic Neutral
ac: 12
ac_class: 15 with *mage armour*
hp: 33
hit_dice: 6d8 + 6
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 12, 17, 14, 15 ]
saves:
  - int: 5
  - cha: 4
skillsaves:
  - arcana: 5
  - deception: 6
  - sleight of hand: 4
senses: passive Perception 12
languages: Common
cr: "2"
actions:
  - name: Multiattack
    desc: The champion makes two Arcane Burst attacks or makes one Arcane Burst attack and uses Spellcasting.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 8 (1d10 + 3) force damage."
  - name: Spellcasting
    desc: |-
      The champion casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Light*, *Mage Armour* (self only), *Mage Hand*, *Minor Illusion*

      **2/day each:** *Charm Person*, *Disguise Self*, *Silent Image*

      **1/day each:** Crown of Madness, *Shatter*
bonus_actions:
  - name: Aura of Deception (1/Day)
    desc: The champion emits an aura of ghostly illusions that fills a 10-foot-radius sphere centred on itself. While this aura is active, creatures have disadvantage on attack rolls against the champion and any of the champion's allies that are in the aura. The aura moves with the champion and lasts for 1 minute, until the champion has the incapacitated condition, or until the champion uses another bonus action to end the aura.
```
