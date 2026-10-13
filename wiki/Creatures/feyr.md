---
title: Feyr
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Feyr
size: Large
type: aberration
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 88
hit_dice: 16d10
modifier: 3
speed: 0 ft., fly 50 ft. (hover)
stats: [ 16, 16, 11, 14, 14, 11 ]
saves:
  - int: 5
  - wis: 5
skillsaves:
  - perception: 5
  - stealth: 9
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 15
cr: "5"
traits:
  - name: Unusual Nature
    desc: The feyr doesn't require air.
actions:
  - name: Multiattack
    desc: The feyr makes one Frightful Bite attack and one Tentacle attack.
  - name: Frightful Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 8 (1d10 + 3) piercing damage, and each creature within 10 feet of the feyr that can see it must succeed on a DC 13 Wisdom saving throw or be frightened of the feyr until the end of the feyr's next turn."
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one creature. *Hit:* 17 (4d6 + 3) psychic damage, and the target is grappled (escape DC 13). Until this grapple ends, the feyr can't use this tentacle against other targets. The feyr has two tentacles, each of which can grapple one creature."
  - name: Invisibility
    desc: The feyr becomes invisible until it attacks, uses Nightmare Fuel, or uses a bonus action to become visible.
  - name: Nightmare Fuel (1/Day)
    desc: The feyr targets one unconscious creature it can see within 10 feet of itself. The target must succeed on a DC 13 Wisdom saving throw or take 27 (5d10) psychic damage, and the feyr gains temporary hit points equal to the damage dealt.
```
