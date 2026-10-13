---
title: Stone Cursed
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat:
  - Desert
  - Mountain
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Stone Cursed
size: Medium
type: construct
alignment: Typically Lawful Evil
ac: 17
ac_class: natural armour
hp: 19
hit_dice: 3d8 + 6
modifier: -3
speed: 10 ft.
stats: [ 16, 5, 14, 5, 8, 7 ]
damage_vulnerabilities: bludgeoning
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, petrified, poisoned
senses: passive Perception 9
languages: the languages it knew in life
cr: "1"
traits:
  - name: Cunning Opportunist
    desc: The stone cursed has advantage on the attack rolls of opportunity attacks.
  - name: False Appearance
    desc: If the stone cursed is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the stone cursed move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the stone cursed isn't a statue.
  - name: Unusual Nature
    desc: The stone cursed doesn't require air, food, drink, or sleep.
actions:
  - name: Petrifying Claws
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) slashing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw, or it begins to turn to stone and is restrained until the end of its next turn, when it must repeat the saving throw. The effect ends if the second save is successful; otherwise the target is petrified for 24 hours."
```
