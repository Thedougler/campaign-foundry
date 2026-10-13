---
title: Counterflux Blastseeker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Counterflux Blastseeker
size: Medium
type: humanoid
subtype: any race
alignment: Chaotic Neutral
ac: 13
ac_class: 16 with *mage armour*
hp: 39
hit_dice: 6d8 + 12
modifier: 3
speed: 30 ft.
stats: [ 13, 16, 15, 18, 11, 14 ]
saves:
  - con: 4
  - wis: 2
skillsaves:
  - arcana: 6
  - perception: 2
gear:
  - rapier
senses: passive Perception 12
languages: Common plus any one language
cr: "2"
traits:
  - name: Innate Spellcasting
    desc: |-
      The blastseeker's innate spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The blastseeker can innately cast the following spells, requiring no components other than its Izzet gear, which doesn't function for others:

      **3/day each:** *enlarge/reduce*, *mage armour* (self only), *scorching ray*

      **1/day each:** *counterspell*, *dispel magic*, *protection from energy*
  - name: Counterflux Overcast (Recharge 5–6)
    desc: |-
      The blastseeker can create an additional effect immediately after casting a spell. Roll a d6 to determine the effect:

      - **1–3..** The blastseeker creates a 15-foot-radius invisible sphere centred on itself that lasts until the end of its next turn. Creatures in the sphere have disadvantage on saving throws against spells and other magical effects.  
      - **4–6..** The blastseeker creates a 15-foot-radius invisible sphere centred on itself that lasts until the end of its next turn. Creatures in the sphere have advantage on saving throws against spells and other magical effects.  
actions:
  - name: Rapier
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage."
```
