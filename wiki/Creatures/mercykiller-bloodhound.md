---
title: Mercykiller Bloodhound
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mercykiller Bloodhound
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 18
ac_class: plate armour
hp: 104
hit_dice: 16d8 + 48
modifier: 1
speed: 40 ft.
stats: [ 17, 12, 16, 12, 15, 8 ]
skillsaves:
  - perception: 8
  - survival: 8
senses: passive Perception 18
languages: Common plus one more language
cr: "7"
traits:
  - name: Portal Sense
    desc: The bloodhound can sense the presence of portals within 30 feet of itself, including inactive portals, and instinctively knows the destination of each portal.
actions:
  - name: Multiattack
    desc: The bloodhound makes three Clawed Gauntlet attacks.
  - name: Clawed Gauntlet
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage plus 10 (3d6) necrotic damage."
bonus_actions:
  - name: Marked for Pursuit (3/Day)
    desc: The bloodhound attempts to place a magical mark on a creature it can see within 30 feet of itself. The target must succeed on a DC 13 Charisma saving throw or become cursed for 24 hours. A creature missing any of its hit points has disadvantage on this saving throw. While cursed in this way, the bloodhound can sense the direction and distance to the target as long as the two are on the same plane of existence. If the target isn't on the same plane, the bloodhound knows what plane the target is on.
```
