---
title: Steel Predator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Construct
size: Large
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Steel Predator
size: Large
type: construct
alignment: Typically Lawful Neutral
ac: 20
ac_class: natural armour
hp: 207
hit_dice: 18d10 + 108
modifier: 3
speed: 40 ft.
stats: [ 24, 17, 22, 4, 14, 6 ]
skillsaves:
  - perception: 7
  - stealth: 8
  - survival: 7
damage_resistances: cold, lightning, necrotic, thunder
damage_immunities: poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, stunned
senses: blindsight 30 ft., darkvision 60 ft., passive Perception 17
languages: understands Modron and the language of its owner but can't speak
cr: "16"
traits:
  - name: Magic Resistance
    desc: The steel predator has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The steel predator doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The steel predator makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 18 (2d10 + 7) lightning damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 16 (2d8 + 7) force damage."
  - name: Stunning Roar (Recharge 5–6)
    desc: The steel predator emits a roar in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw. On a failed save, a creature takes 33 (6d10) thunder damage, drops everything it's holding, and is stunned for 1 minute. The stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. On a successful save, a creature takes half as much damage and isn't stunned.
  - name: Spellcasting
    desc: |-
      The steel predator casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:

      **3/day each:** *dimension door* (self only), *plane shift* (self only)
```
