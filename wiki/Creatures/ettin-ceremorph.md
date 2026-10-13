---
title: Ettin Ceremorph
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ettin Ceremorph
size: Large
type: aberration
alignment: typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 104
hit_dice: 11d10 + 44
modifier: 2
speed: 40 ft.
stats: [ 18, 14, 18, 18, 15, 14 ]
saves:
  - int: 7
  - wis: 5
skillsaves:
  - perception: 8
damage_resistances: psychic
condition_immunities: charmed, frightened, stunned, unconscious
senses: darkvision 120 ft., passive Perception 18
languages: Deep Speech, Giant, telepathy 60 ft., Undercommon
cr: "8"
traits:
  - name: Magic Resistance
    desc: The ceremorph has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The ceremorph makes one Slam attack and one Tentacles attack. The ceremorph can replace one of the attacks with a Mind Bolt attack, if available.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 22 (4d8 + 4) bludgeoning damage."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one creature. *Hit:* 15 (2d10 + 4) psychic damage. If the target is Large or smaller, it has the grappled condition (escape DC 14) and must succeed on a DC 15 Intelligence saving throw or have the stunned condition until this grapple ends."
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one incapacitated Humanoid grappled by the ceremorph. *Hit:* 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the ceremorph kills the target by extracting and devouring its brain."
  - name: Mind Bolt (3/Day)
    desc: "*Ranged Spell Attack:* +7 to hit, range 120 ft., one creature. *Hit:* 17 (2d12 + 4) psychic damage, and the target must succeed on a DC 15 Intelligence saving throw or have the stunned condition until the end of its next turn."
```
