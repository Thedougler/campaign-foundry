---
title: Biomancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Biomancer
size: Medium
type: humanoid
subtype: any race
alignment: Neutral Good
ac: 17
ac_class: splint armour
hp: 110
hit_dice: 17d8 + 34
modifier: 2
speed: 30 ft.
stats: [ 10, 15, 14, 20, 14, 15 ]
saves:
  - int: 9
  - wis: 6
skillsaves:
  - arcana: 9
  - nature: 9
gear:
  - scimitar
senses: passive Perception 12
languages: Common plus any one language
cr: "10"
traits:
  - name: Spellcasting
    desc: |-
      The biomancer is a 16th-level Simic spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The biomancer has the following wizard spells prepared:

      **Cantrips (at will):** *acid splash*, *light*, *mending*, *poison spray*, *shocking grasp*

      **1st level (4 slots):** *detect magic*, *grease*, *shield*

      **2nd level (3 slots):** *alter self*, *darkvision*, *enlarge/reduce*, *hold person*

      **3rd level (3 slots):** *counterspell*, *dispel magic*, *haste*, *protection from energy*

      **4th level (3 slots):** *confusion*, *conjure minor elementals*, *polymorph*

      **5th level (2 slots):** *cone of cold*, *creation*, *hold monster*

      **6th level (1 slots):** *move earth*, *wall of ice*

      **7th level (1 slots):** *prismatic spray*

      **8th level (1 slots):** *control weather*
  - name: Bolstering Presence
    desc: The biomancer magically emanates life-giving energy within 30 feet of itself. Any ally of the biomancer that starts its turn there regains 5 (1d10) hit points.
  - name: Magic Resistance
    desc: The biomancer has advantage on saving throws against spells and other magical effects.
actions:
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
```
