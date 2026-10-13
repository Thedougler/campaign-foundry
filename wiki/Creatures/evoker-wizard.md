---
title: Evoker Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Evoker Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 121
hit_dice: 22d8 + 22
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 12, 17, 12, 11 ]
saves:
  - int: 7
  - wis: 5
skillsaves:
  - arcana: 7
  - history: 7
senses: passive Perception 11
languages: any four languages
cr: "9"
actions:
  - name: Multiattack
    desc: The evoker makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +7 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 25 (4d10 + 3) force damage."
  - name: Sculpted Explosion (Recharge 4–6)
    desc: "The evoker unleashes a magical explosion of a particular damage type: cold, fire, lightning, or thunder. The magic erupts in a 20-foot-radius sphere centred on a point within 150 feet of the evoker. Each creature in that area must make a DC 15 Dexterity saving throw. The evoker can select up to three creatures it can see in the area to ignore the spell, as the evoker sculpts the spell's energy around them. On a failed save, a creature takes 40 (9d8) damage of the chosen type and is knocked prone. On a successful save, a creature takes half as much damage and isn't knocked prone."
  - name: Spellcasting
    desc: |-
      The evoker casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *light*, *mage hand*, *message*, *prestidigitation*

      **2/day each:** *ice storm*, *lightning bolt*, *mage armour*

      **1/day each:** *wall of ice*
```
