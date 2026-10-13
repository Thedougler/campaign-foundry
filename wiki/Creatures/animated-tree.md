---
title: Animated Tree
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Plant
size: Huge
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Animated Tree
size: Huge
type: plant
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 138
hit_dice: 12d12 + 60
modifier: -1
speed: 30 ft.
stats: [ 23, 8, 21, 12, 16, 12 ]
damage_vulnerabilities: fire
damage_resistances: bludgeoning, piercing, necrotic, radiant
senses: passive Perception 13
languages: understands Common, Druidic, Elvish, and Sylvan but cannot speak
cr: "9"
traits:
  - name: False Appearance
    desc: While the tree remains motionless, it is indistinguishable from a normal tree.
  - name: Siege Monster
    desc: The tree deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The tree makes two slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/180 ft., one target. *Hit:* 28 (4d10 + 6) bludgeoning damage."
  - name: Animate Trees (1/Day)
    desc: The tree magically animates one or two trees it can see within 60 feet of it. These trees have the same statistics as a tree, except they have Intelligence and Charisma scores of 1, they can't speak, and they have only the Slam action option. An animated tree acts as an ally of the tree. The tree remains animate for 1 day or until it dies; until the tree dies or is more than 120 feet from the tree; or until the tree takes a bonus action to turn it back into an inanimate tree. The tree then takes root if possible.
```
