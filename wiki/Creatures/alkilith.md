---
title: Alkilith
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Alkilith
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 168
hit_dice: 16d8 + 96
modifier: 4
speed: 40 ft., climb 40 ft.
stats: [ 12, 19, 22, 6, 11, 7 ]
saves:
  - dex: 8
  - con: 10
skillsaves:
  - stealth: 8
damage_resistances: acid; cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 10
languages: understands Abyssal but can't speak
cr: "11"
traits:
  - name: Abyssal Rift
    desc: If the alkilith surrounds a door, window, or similar opening continuously for 6d6 days, the opening becomes a permanent portal to a random layer of the Abyss.
  - name: Amorphous
    desc: The alkilith can move through a space as narrow as 1 inch wide without squeezing.
  - name: False Appearance
    desc: If the alkilith is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the alkilith move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the alkilith isn't ordinary slime or fungus.
  - name: Foment Confusion
    desc: |-
      Any creature that isn't a demon that starts its turn within 30 feet of the alkilith must succeed on a DC 18 Wisdom saving throw, or it hears a faint buzzing in its head for a moment and has disadvantage on its next attack roll, saving throw, or ability check.

      If the saving throw against Foment Confusion fails by 5 or more, the creature is instead subjected to the *confusion* spell for 1 minute (no concentration required by the alkilith). While under the effect of that confusion, the creature is immune to Foment Confusion.
  - name: Magic Resistance
    desc: The alkilith has advantage on saving throws against spells and other magical effects.
  - name: Spider Climb
    desc: The alkilith can climb difficult surfaces, such as upside down on ceilings, without making an ability check.
  - name: Unusual Nature
    desc: The alkilith doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The alkilith makes three Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +8 to hit, reach 15 ft., one target. *Hit:* 18 (4d6 + 4) acid damage."
```
