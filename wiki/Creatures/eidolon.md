---
title: Eidolon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Undead
size: Medium
habitat:
  - Coastal
  - Desert
  - Forest
  - Grassland
  - Mountain
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Eidolon
size: Medium
type: undead
alignment: Any alignment
ac: 9
hp: 63
hit_dice: 18d8 - 18
modifier: -1
speed: 0 ft., fly 40 ft. (hover)
stats: [ 7, 8, 9, 14, 19, 16 ]
saves:
  - wis: 8
skillsaves:
  - perception: 8
damage_resistances: acid; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 60 ft., passive Perception 18
languages: the languages it knew in life
cr: "12"
traits:
  - name: Incorporeal Movement
    desc: The eidolon can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object other than a sacred statue.
  - name: Sacred Animation (Recharge 5–6)
    desc: When the eidolon moves into a space occupied by a sacred statue, the eidolon can disappear, causing the statue to become a creature under the eidolon's control. The eidolon uses the sacred statue's stat block in place of its own.
  - name: Turn Resistance
    desc: The eidolon has advantage on saving throws against any effect that turns Undead.
  - name: Unusual Nature
    desc: The eidolon doesn't require air, food, drink, or sleep.
actions:
  - name: Divine Dread
    desc: Each creature within 60 feet of the eidolon that can see it must succeed on a DC 15 Wisdom saving throw or be frightened of it for 1 minute. While frightened in this way, the creature must take the Dash action and move away from the eidolon by the safest available route at the start of each of its turns, unless there is nowhere for it to move, in which case the creature also becomes stunned until it can move again. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to any eidolon's Divine Dread for the next 24 hours.
```
