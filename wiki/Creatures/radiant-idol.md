---
title: Radiant Idol
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Radiant Idol
size: Large
type: celestial
alignment: Lawful Evil
ac: 18
ac_class: natural armour
hp: 142
hit_dice: 15d10 + 60
modifier: 4
speed: 40 ft.
stats: [ 23, 18, 19, 17, 20, 21 ]
saves:
  - wis: 9
  - cha: 9
skillsaves:
  - deception: 9
  - insight: 9
  - perception: 9
  - persuasion: 9
damage_resistances: radiant; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened
gear:
  - flail
senses: darkvision 120 ft., passive Perception 19
languages: all, telepathy 120 ft.
cr: "11"
traits:
  - name: Innate Spellcasting
    desc: |-
      The radiant idol's spellcasting ability is Charisma (spell save DC 17). The radiant idol can innately cast the following spells, requiring no material components:

      **At will:** *charm person*, *cure wounds*, *disguise self*, *thaumaturgy*

      **1/day each:** *commune*, *dominate person*, *insect plague*, *mass suggestion*, *raise dead*
  - name: Aura of False Divinity
    desc: A creature that starts its turn within 30 feet of the radiant idol must make a DC 17 Wisdom saving throw, provided the radiant idol isn't incapacitated. On a failed save, the creature is charmed by the radiant idol. A creature charmed in this way can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it succeeds on the saving throw, a creature is immune to this radiant idol's Aura of False Divinity for 24 hours.
  - name: Magic Resistance
    desc: The radiant idol has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The radiant idol makes two melee attacks.
  - name: Flail
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) bludgeoning damage plus 18 (4d8) radiant damage."
  - name: Radiant Strike (1/Day)
    desc: The radiant idol chooses a point on the ground it can see within 60 feet of it. A 30-foot-radius, 40-foot-high cylinder of bright light appears there until the start of the radiant idol's next turn. Each creature in the cylinder when it appears or that ends its turn there must make a DC 17 Constitution saving throw, taking 36 (8d8) radiant damage on a failed save, or half as much damage on a successful one.
```
