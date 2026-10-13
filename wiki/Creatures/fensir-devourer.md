---
title: Fensir Devourer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Celestial
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fensir Devourer
size: Huge
type: celestial
alignment: typically Chaotic Neutral
ac: 17
ac_class: natural armour
hp: 138
hit_dice: 12d12 + 60
modifier: 0
speed: 40 ft.
stats: [ 20, 10, 21, 10, 14, 11 ]
skillsaves:
  - perception: 8
  - survival: 8
senses: darkvision 60 ft., passive Perception 18
languages: Common, Giant
cr: "8"
traits:
  - name: Death Curse
    desc: |-
      When the fensir starts its turn with 0 hit points and doesn't regenerate, it releases a curse on those around it. Each creature within 30 feet of the fensir when it dies must succeed on a DC 13 Charisma saving throw or be cursed for the next 24 hours.

      While cursed in this way, an affected creature gains no benefit from finishing a short or long rest. At the end of every hour, the creature must succeed on a DC 13 Charisma saving throw or take 11 (2d10) psychic damage.
  - name: Regeneration
    desc: The fensir regains 10 hit points at the start of its turn if it isn't in sunlight. If the fensir takes acid or fire damage, this trait doesn't function at the start of the fensir's next turn. The fensir dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Sunlight Hypersensitivity
    desc: When the fensir starts its turn in sunlight, it must succeed on a DC 15 Constitution saving throw or have the petrified condition until the fensir is no longer in sunlight.
actions:
  - name: Multiattack
    desc: The fensir makes two attacks, using Rend, Boulder, or a combination of them.
  - name: Rend
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 21 (3d10 + 5) slashing damage."
  - name: Boulder
    desc: "*Ranged Weapon Attack:* +8 to hit, range 60/240 ft., one target. *Hit:* 18 (2d12 + 5) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 16 Strength saving throw or have the prone condition. After the fensir throws the boulder, roll a d6; on a roll of 4 or lower, the fensir has no more boulders to throw."
```
