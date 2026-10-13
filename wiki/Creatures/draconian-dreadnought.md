---
title: Draconian Dreadnought
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconian Dreadnought
size: Large
type: monstrosity
alignment: Any alignment
ac: 16
ac_class: natural armour
hp: 57
hit_dice: 6d10 + 24
modifier: 0
speed: 30 ft., fly 60 ft.
stats: [ 18, 10, 18, 10, 10, 10 ]
saves:
  - str: 6
  - wis: 2
senses: darkvision 60 ft., passive Perception 10
languages: Common, Draconic
cr: "4"
traits:
  - name: Death Throes
    desc: When the draconian is reduced to 0 hit points, it bursts into flames and is reduced to ashes. Each creature in a 10-foot-radius sphere centred on the draconian must succeed on a DC 13 Dexterity saving throw or take 10 (3d6) fire damage.
actions:
  - name: Multiattack
    desc: The draconian makes two Serrated Sword attacks and one Tail attack.
  - name: Serrated Sword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 14 Strength saving throw or be knocked prone."
reactions:
  - name: Shape Theft
    desc: After the draconian kills a Medium or smaller Humanoid, the draconian can magically transform itself to look and feel like that creature while retaining its game statistics (other than its size). This transformation lasts until the draconian dies or uses an action to end it.
```
