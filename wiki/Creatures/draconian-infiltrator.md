---
title: Draconian Infiltrator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconian Infiltrator
size: Medium
type: monstrosity
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 39
hit_dice: 6d8 + 12
modifier: 3
speed: 40 ft., climb 30 ft.
stats: [ 11, 17, 14, 9, 13, 11 ]
saves:
  - dex: 5
skillsaves:
  - perception: 3
  - stealth: 7
damage_immunities: poison
condition_immunities: poisoned
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 13
languages: Common, Draconic
cr: "3"
traits:
  - name: Death Throes
    desc: When the draconian is reduced to 0 hit points, it turns into a puddle of acid and splashes acid on those around it. Each creature within 5 feet of the draconian must succeed on a DC 12 Dexterity saving throw or be covered in acid for 1 minute. A creature can use its action to scrape or wash the acid off itself or another creature. A creature covered in the acid takes 7 (2d6) acid damage at the start of each of its turns.
  - name: Glide
    desc: When the draconian falls and isn't incapacitated, it subtracts up to 100 feet from the fall when calculating the fall's damage, and it can move up to 2 feet horizontally for every 1 foot it descends.
actions:
  - name: Multiattack
    desc: The draconian makes two Dagger attacks. If both attacks hit the same creature, the target must succeed on a DC 12 Constitution saving throw or become poisoned until the end of the target's next turn. While poisoned in this way, the target is also paralysed.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage."
```
