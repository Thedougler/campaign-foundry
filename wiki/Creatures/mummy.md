---
title: Mummy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Small or Medium
habitat:
  - Desert
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mummy
size: Small or Medium
type: undead
alignment: Lawful Evil
ac: 11
hp: 58
hit_dice: 9d8 + 18
modifier: -1
speed: 20 ft.
stats: [ 16, 8, 15, 6, 12, 12 ]
saves:
  - wis: 3
damage_vulnerabilities: fire
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Darkvision 60 ft., passive Perception 11
languages: Common plus two other languages
cr: "3"
actions:
  - name: Multiattack
    desc: The mummy makes two Rotting Fist attacks and uses Dreadful Glare.
  - name: Rotting Fist
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (1d10 + 3) Bludgeoning damage plus 10 (3d6) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain Hit Points, its Hit Point maximum doesn't return to normal when finishing a Long Rest, and its Hit Point maximum decreases by 10 (3d6) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 Hit Points by this attack."
  - name: Dreadful Glare
    desc: "*Wisdom Saving Throw:* DC 11, one creature the mummy can see within 60 feet. *Failure:* The target has the Frightened condition until the end of the mummy's next turn. *Success:* The target is immune to this mummy's Dreadful Glare for 24 hours."
```
