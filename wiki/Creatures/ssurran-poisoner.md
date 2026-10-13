---
title: Ssurran Poisoner
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ssurran Poisoner
size: Medium
type: monstrosity
subtype: lizardfolk
alignment: Any alignment
ac: 16
ac_class: natural armour, shield
hp: 22
hit_dice: 4d8 + 4
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 13, 12, 13, 12, 12, 7 ]
skillsaves:
  - perception: 3
  - stealth: 3
  - survival: 3
gear:
  - javelin
senses: passive Perception 13
languages: Draconic
cr: 1/2
traits:
  - name: Hold Breath
    desc: The ssurran can hold its breath for 15 minutes.
actions:
  - name: Multiattack
    desc: The ssurran makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) slashing damage."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +3 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 4 (1d6 + 1) piercing damage plus 4 (1d8) poison damage."
  - name: Poison Bomb
    desc: The ssurran throws a tangerine-sized bomb at a point up to 60 feet away, where it explodes, releasing a 10-foot-radius sphere of poisonous gas that disperses quickly. Each creature in the sphere must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. After the ssurran throws a bomb, roll a d6; on a roll of 4 or lower, the ssurran has no more bombs to throw.
```
