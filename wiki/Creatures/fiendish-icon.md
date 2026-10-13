---
title: Fiendish Icon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Small
habitat:
  - Urban
sourcebooks:
  - Astarion's Book of Hungers
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fiendish Icon
size: Small
type: construct
alignment: Lawful Evil
ac: 13
hp: 22
hit_dice: 5d6 + 5
modifier: 1
speed: 30 ft.
stats: [ 15, 12, 13, 6, 11, 6 ]
skillsaves:
  - stealth: 5
damage_immunities: fire, poison
condition_immunities: charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned
senses: Darkvision 60, passive Perception 10
languages: understands Common and Infernal but can't speak
cr: "1"
traits:
  - name: Magic Resistance
    desc: The icon has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The icon makes two Slam attacks and uses Fiery Eruption.
  - name: Slam
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Bludgeoning damage."
  - name: Fiery Eruption
    desc: "*Dexterity Saving Throw:* DC 11, each creature in a 5-foot Emanation originating from the icon. *Failure:* 7 (2d6) Fire damage."
```
