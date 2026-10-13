---
title: Diviner Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Diviner Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 90
hit_dice: 20d8
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 11, 18, 12, 11 ]
saves:
  - int: 7
  - wis: 4
skillsaves:
  - arcana: 7
  - history: 7
senses: passive Perception 11
languages: any four languages
cr: "8"
actions:
  - name: Multiattack
    desc: The diviner makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +7 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 20 (3d10 + 4) radiant damage."
  - name: Overwhelming Revelation (Recharge 5–6)
    desc: The diviner magically creates a burst of illumination in a 10-foot-radius sphere centred on a point within 120 feet of it. Each creature in that area must make a DC 15 Wisdom saving throw. On a failed save, a creature takes 45 (10d8) psychic damage and is stunned until the end of the diviner's next turn. On a successful save, the creature takes half as much damage and isn't stunned.
  - name: Spellcasting
    desc: |-
      The diviner casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *mage hand*, *message*, *prestidigitation*

      **2/day each:** *arcane eye*, *detect magic*, *detect thoughts*, *fly*, *lightning bolt*, *locate object*, *mage armour*, *Rary's telepathic bond*

      **1/day each:** *true seeing*
reactions:
  - name: Portent (3/Day)
    desc: "When the diviner or a creature it can see makes an attack roll, a saving throw, or an ability check, the diviner rolls a d20 and chooses whether to use that roll in place of the d20 rolled for the attack roll, saving throw, or ability check. "
```
