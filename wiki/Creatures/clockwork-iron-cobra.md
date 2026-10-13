---
title: Clockwork Iron Cobra
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Construct
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Clockwork Iron Cobra
size: Medium
type: construct
alignment: Unaligned
ac: 13
hp: 91
hit_dice: 14d8 + 28
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 14, 3, 10, 1 ]
skillsaves:
  - stealth: 7
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands one language of its creator but can't speak
cr: "4"
traits:
  - name: Magic Resistance
    desc: The clockwork has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The clockwork doesn't require air, food, drink, or sleep.
actions:
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Constitution saving throw or suffer one random effect (roll a d6):

      - **1–2 Confusion.** On its next turn, the target must use its action to make one weapon attack against a random creature it can see within 30 feet of it, using whatever weapon it has in hand and moving beforehand if necessary to get in range. If it's holding no weapon, it makes an unarmed strike. If no creature is visible within 30 feet, it takes the Dash action, moving toward the nearest creature.  
      - **3–4 Paralysis.** The target is paralysed until the end of its next turn.  
      - **5–6 Poison.** The target takes 13 (3d8) poison damage.
```
