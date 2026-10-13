---
title: Maw Demon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Maw Demon
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 13
ac_class: natural armour
hp: 33
hit_dice: 6d8 + 6
modifier: -1
speed: 30 ft.
stats: [ 14, 8, 13, 5, 8, 5 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 60 ft., passive Perception 9
languages: understands Abyssal but can't speak
cr: "1"
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 11 (2d8 + 2) piercing damage."
  - name: Disgorge (Recharge 6)
    desc: The demon vomits in a 15-foot cube. Each creature in that area must succeed on a DC 11 Dexterity saving throw or take 11 (2d10) acid damage and fall prone in the spew.
```
