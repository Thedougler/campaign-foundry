---
title: Darkling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fey
size: Small
habitat:
  - Forest
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Darkling
size: Small
type: fey
alignment: Typically Chaotic Neutral
ac: 14
ac_class: leather armour
hp: 13
hit_dice: 3d6 + 3
modifier: 3
speed: 30 ft.
stats: [ 9, 16, 12, 10, 12, 10 ]
skillsaves:
  - acrobatics: 5
  - deception: 2
  - perception: 5
  - stealth: 7
gear:
  - dagger
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 15
languages: Elvish, Sylvan
cr: 1/2
traits:
  - name: Death Flash
    desc: When the darkling dies, nonmagical light flashes out from it in a 10-foot radius as its body and possessions, other than metal or magic objects, burn to ash. Any creature in that area must succeed on a DC 10 Constitution saving throw or be blinded until the end of its next turn.
  - name: Light Sensitivity
    desc: While in bright light, the darkling has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) necrotic damage."
```
