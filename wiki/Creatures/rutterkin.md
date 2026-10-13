---
title: Rutterkin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rutterkin
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 12
hp: 37
hit_dice: 5d8 + 15
modifier: 2
speed: 20 ft.
stats: [ 14, 15, 17, 5, 12, 6 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 11
languages: understands Abyssal but can't speak
cr: "2"
traits:
  - name: Immobilizing Fear
    desc: When a creature that isn't a demon starts its turn within 30 feet of one or more rutterkins, that creature must make a DC 11 Wisdom saving throw. The creature has disadvantage on the save if it's within 30 feet of six or more rutterkins. On a failed save, the creature becomes frightened of the rutterkins for 1 minute. While frightened in this way, the creature is restrained. At the end of each of the frightened creature's turns, it can repeat the saving throw, ending the effect on itself on a success. On a successful save, the creature is immune to the Crippling Fear of all rutterkins for 24 hours.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 12 (3d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 13 Constitution saving throw against disease or become poisoned. At the end of each long rest, the poisoned target can repeat the saving throw, ending the effect on itself on a success. If the target is reduced to 0 hit points while poisoned in this way, it dies and instantly transforms into a living manes. The transformation can be undone only by a *wish* spell."
```
