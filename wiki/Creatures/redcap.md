---
title: Redcap
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Small
habitat:
  - Forest
  - Hill
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Redcap
size: Small
type: fey
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 45
hit_dice: 6d6 + 24
modifier: 1
speed: 25 ft.
stats: [ 18, 13, 18, 10, 12, 9 ]
skillsaves:
  - athletics: 6
  - perception: 3
senses: darkvision 60 ft., passive Perception 13
languages: Common, Sylvan
cr: "3"
traits:
  - name: Iron Boots
    desc: The redcap has disadvantage on Dexterity (Stealth) checks.
  - name: Outsize Strength
    desc: While grappling, the redcap is considered to be Medium. Also, wielding a heavy weapon doesn't impose disadvantage on its attack rolls.
actions:
  - name: Multiattack
    desc: The redcap makes three Wicked Sickle attacks.
  - name: Wicked Sickle
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 9 (2d4 + 4) slashing damage."
  - name: Ironbound Pursuit
    desc: The redcap moves up to its speed to a creature it can see and kicks with its iron boots. The target must succeed on a DC 14 Dexterity saving throw or take 20 (3d10 + 4) bludgeoning damage and be knocked prone.
```
