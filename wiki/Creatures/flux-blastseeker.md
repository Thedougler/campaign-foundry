---
title: Flux Blastseeker
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
name: Flux Blastseeker
size: Medium
type: humanoid
subtype: any race
alignment: Chaotic Neutral
ac: 12
ac_class: 15 with *mage armour*
hp: 55
hit_dice: 10d8 + 10
modifier: 2
speed: 30 ft.
stats: [ 10, 15, 12, 20, 9, 14 ]
saves:
  - dex: 5
  - int: 8
skillsaves:
  - arcana: 8
  - perception: 2
gear:
  - quarterstaff
senses: passive Perception 12
languages: Common plus any one language
cr: "5"
traits:
  - name: Innate Spellcasting
    desc: |-
      The blastseeker's innate spellcasting ability is Intelligence (spell save DC 16, +8 to hit with spell attacks). The blastseeker can innately cast the following spells, requiring no components other than its Izzet gear, which doesn't function for others:

      **3/day each:** *mage armour* (self only), *scorching ray*

      **1/day each:** *banishment*, *cone of cold*, *dimension door*, *fireball*, *ice storm*
  - name: Fluxbending Overcast (Recharge 5–6)
    desc: "The blastseeker can create an additional effect immediately after casting a spell. Roll a d6 to determine the effect: 1–3. The blastseeker teleports, swapping places with a creature it can see within 30 feet of it. 4–6. The blastseeker and each creature within 10 feet of it must succeed on a DC 16 Constitution saving throw or take 11 (2d10) thunder damage."
actions:
  - name: Quarterstaff
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 3 (1d6) bludgeoning damage, or 4 (1d8) bludgeoning damage if used with two hands."
```
