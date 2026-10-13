---
title: Deep Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deep Scion
size: Medium
type: monstrosity
alignment: Typically Chaotic Evil
ac: 11
hp: 67
hit_dice: 9d8 + 27
modifier: 1
speed: 30 ft. (20 ft. and swim 40 ft. in hybrid form)
stats: [ 18, 13, 16, 10, 12, 14 ]
saves:
  - wis: 3
  - cha: 4
skillsaves:
  - deception: 6
  - insight: 3
  - sleight of hand: 3
  - stealth: 3
gear:
  - battleaxe
senses: darkvision 120 ft., passive Perception 11
languages: Aquan, Common, thieves' cant
cr: "3"
traits:
  - name: Amphibious (Hybrid Form Only)
    desc: The deep scion can breathe air and water.
actions:
  - name: Multiattack
    desc: The deep scion makes two Battleaxe attacks, or it makes one Bite attack and two Claw attacks.
  - name: Battleaxe
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Bite (Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one creature. *Hit:* 6 (1d4 + 4) piercing damage."
  - name: Claw (Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage."
  - name: Psychic Screech (Hybrid Form Only; Recharges after a Short or Long Rest)
    desc: The deep scion emits a terrible scream audible within 300 feet. Creatures within 30 feet of the deep scion must succeed on a DC 13 Wisdom saving throw or be stunned until the end of the deep scion's next turn. In water, the psychic screech also telepathically transmits the deep scion's memories of the last 24 hours to its master, regardless of distance, so long as it and its master are in the same body of water.
bonus_actions:
  - name: Change Shape
    desc: The deep scion transforms into a hybrid form (humanoid-piscine) or back into its true form, which is humanlike. Its statistics, other than its speed, are the same in each form. Any equipment it is wearing or carrying isn't transformed. The deep scion reverts to its true form if it dies.
```
