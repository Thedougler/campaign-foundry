---
title: Solar Bastion Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Solar Bastion Knight
size: Medium
type: humanoid
subtype: paladin
alignment: typically Neutral Good
ac: 20
ac_class: plate armour, shield
hp: 150
hit_dice: 20d8 + 60
modifier: 0
speed: 30 ft.
stats: [ 18, 10, 17, 15, 16, 17 ]
saves:
  - wis: 7
  - cha: 7
skillsaves:
  - arcana: 6
  - history: 6
condition_immunities: blinded, charmed, frightened
senses: passive Perception 13
languages: Common plus any one language
cr: "9"
traits:
  - name: Aura of Protection
    desc: The knight and each ally within 10 feet of it have advantage on saving throws. This trait is suppressed while the knight has the incapacitated condition.
actions:
  - name: Multiattack
    desc: The knight makes three Sunspear attacks.
  - name: Sunspear
    desc: "*Melee or Ranged Spell Attack:* +8 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 14 (3d6 + 4) radiant damage, or 21 (5d6 + 4) radiant damage if the target is a Fiend or an Undead."
  - name: Solar Flare (Recharge 5–6)
    desc: The knight unleashes a blaze of brilliant energy that fills a 30-foot-radius sphere centred on the knight. Each creature of the knight's choice in that area must make a DC 15 Dexterity saving throw. On a failed save, a creature takes 22 (4d10) radiant damage and has the blinded condition until the end of its next turn. On a successful save, a creature takes half as much damage only. For the next minute, the affected area is filled with bright light that is sunlight.
  - name: Spellcasting
    desc: |-
      The knight casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 15):

      **1/day each:** *Greater Restoration*, *Sending*, *Word of Recall* (the prepared sanctuary is the Solar Bastion)
```
