---
title: Duergar Kavalrachni
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Duergar Kavalrachni
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 16
ac_class: scale mail, shield
hp: 26
hit_dice: 4d8 + 8
modifier: 0
speed: 25 ft.
stats: [ 14, 11, 14, 11, 10, 9 ]
damage_resistances: poison
gear:
  - heavy crossbow
  - war pick
senses: darkvision 120 ft., passive Perception 10
languages: Dwarvish, Undercommon
cr: "2"
traits:
  - name: Cavalry Training
    desc: When the duergar hits a target with a melee attack while mounted, the mount can use its reaction to make one melee attack against the same target.
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The duergar makes two War Pick attacks.
  - name: War Pick
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage plus 5 (2d4) poison damage."
  - name: Heavy Crossbow
    desc: "*Ranged Weapon Attack:* +2 to hit, range 100/400 ft., one target. *Hit:* 5 (1d10) piercing damage."
  - name: Shared Invisibility (Recharges after a Short or Long Rest)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it. While the invisible duergar is mounted, the mount is invisible as well. The invisibility ends early on the mount immediately after it attacks.
```
