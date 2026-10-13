---
title: Tlincalli
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Desert
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tlincalli
size: Large
type: monstrosity
alignment: Typically Neutral
ac: 15
ac_class: natural armour
hp: 85
hit_dice: 10d10 + 30
modifier: 1
speed: 40 ft.
stats: [ 16, 13, 16, 8, 12, 8 ]
skillsaves:
  - perception: 4
  - stealth: 4
  - survival: 4
gear:
  - longsword
senses: darkvision 60 ft., passive Perception 14
languages: Tlincalli
cr: "5"
actions:
  - name: Multiattack
    desc: The tlincalli makes one Longsword or Spiked Chain attack and one Sting attack.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
  - name: Spiked Chain
    desc: "*Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage, and the target is grappled (escape DC 11) if it is a Large or smaller creature. Until this grapple ends, the target is restrained, and the tlincalli can't use the spiked chain against another target."
  - name: Sting
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 6 (1d6 + 3) piercing damage plus 14 (4d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned for 1 minute. If it fails the saving throw by 5 or more, the target is also paralysed while poisoned. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
```
