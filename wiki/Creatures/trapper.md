---
title: Trapper
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Trapper
size: Large
type: monstrosity
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 68
hit_dice: 8d10 + 24
modifier: 0
speed: 20 ft., climb 20 ft.
stats: [ 17, 10, 17, 2, 13, 4 ]
skillsaves:
  - stealth: 2
senses: blindsight 30 ft., darkvision 60 ft., passive Perception 11
cr: "3"
traits:
  - name: False Appearance
    desc: If the trapper is motionless on a floor, wall, or ceiling at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the trapper move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the trapper isn't part of the floor, wall, or ceiling.
  - name: Spider Climb
    desc: The trapper can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Smother
    desc: One Large or smaller creature within 10 feet of the trapper must succeed on a DC 13 Dexterity saving throw or be grappled (escape DC 14). Until the grapple ends, the target takes 13 (3d6 + 3) bludgeoning damage plus 3 (1d6) acid damage at the start of each of its turns. While grappled in this way, the target is restrained, blinded, and deprived of air. The trapper can smother only one creature at a time.
```
