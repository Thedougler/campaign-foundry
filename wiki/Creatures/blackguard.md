---
title: Blackguard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blackguard
size: Medium
type: humanoid
subtype: paladin
alignment: Typically Neutral Evil
ac: 18
ac_class: plate
hp: 119
hit_dice: 14d8 + 56
modifier: 0
speed: 30 ft.
stats: [ 18, 11, 18, 11, 14, 15 ]
saves:
  - wis: 5
  - cha: 5
skillsaves:
  - athletics: 7
  - deception: 5
  - intimidation: 5
gear:
  - glaive
  - shortbow
senses: passive Perception 12
languages: any one language (usually Common)
cr: "8"
actions:
  - name: Multiattack
    desc: The blackguard makes three attacks, using Glaive, Shortbow, or both.
  - name: Glaive
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) slashing damage plus 9 (2d8) necrotic damage."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +3 to hit, range 80/320 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."
  - name: Dreadful Aspect (Recharges after a Short or Long Rest)
    desc: Each enemy within 30 feet of the blackguard must succeed on a DC 13 Wisdom saving throw or be frightened of the blackguard for 1 minute. If a frightened target ends its turn more than 30 feet away from the blackguard, the target can repeat the saving throw, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The blackguard casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **2/day each:** *command*, *dispel magic*, *find steed*
bonus_actions:
  - name: Smite
    desc: "Immediately after the blackguard hits a target with an attack roll, the blackguard can force that target to make a DC 13 Constitution saving throw. On a failed save, the target suffers one of the following effects of the blackguard's choice:"
  - name: Blind
    desc: The target is blinded for 1 minute. The blinded target can repeat the save at the end of each of its turns, ending the effect on itself on a success.
  - name: Shove
    desc: The target is pushed up to 10 feet away and knocked prone.
```
