---
title: Gem Stalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gem Stalker
size: Large
type: monstrosity
alignment: typically Neutral
ac: 17
ac_class: natural armour
hp: 67
hit_dice: 9d10 + 18
modifier: 2
speed: 40 ft., climb 40 ft.
stats: [ 17, 15, 14, 15, 10, 6 ]
saves:
  - dex: 5
  - int: 5
skillsaves:
  - perception: 3
  - stealth: 5
damage_resistances: psychic
senses: darkvision 120 ft., passive Perception 13
languages: telepathy 60 ft. understands Draconic but can't speak
cr: "5"
traits:
  - name: Spider Climb
    desc: The gem stalker can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Unusual Nature
    desc: The gem stalker doesn't require food or drink.
actions:
  - name: Multiattack
    desc: The gem stalker makes four Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage."
bonus_actions:
  - name: Crystal Dart
    desc: "*Ranged Spell Attack:* +5 to hit, range 30 ft., one target. *Hit:* 7 (1d10 + 2) force damage, and one of the following effects occurs, determined by the kind of dragon that created the gem stalker:"
  - name: Amethyst
    desc: The gem stalker can teleport to an unoccupied space it can see within 30 feet of it.
  - name: Crystal
    desc: The gem stalker gains a number of temporary hit points equal to the damage dealt.
  - name: Emerald
    desc: The target must roll a d4 and subtract the number rolled from the next attack roll it makes before the start of the gem stalker's next turn.
  - name: Sapphire
    desc: The target must succeed on a DC 13 Strength saving throw or be pushed horizontally up to 10 feet away from the gem stalker and be knocked prone.
  - name: Topaz
    desc: The target must succeed on a DC 13 Constitution saving throw or be poisoned until the start of the gem stalker's next turn.
reactions:
  - name: Protective Link
    desc: When another creature the gem stalker can see within 30 feet of it is about to take damage, the gem stalker reduces that damage by 10 (3d6). The gem stalker then takes damage equal to that amount.
```
