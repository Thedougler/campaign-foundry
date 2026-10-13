---
title: Sea Spawn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
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
name: Sea Spawn
size: Medium
type: monstrosity
alignment: Typically Neutral Evil
ac: 11
ac_class: natural armour
hp: 32
hit_dice: 5d8 + 10
modifier: -1
speed: 20 ft., swim 30 ft.
stats: [ 15, 8, 15, 6, 10, 8 ]
senses: darkvision 120 ft., passive Perception 10
languages: understands Aquan and Common but can't speak
cr: "1"
traits:
  - name: Limited Amphibiousness
    desc: The sea spawn can breathe air and water, but it needs to be submerged in the sea at least once a day for 1 minute to avoid suffocating.
actions:
  - name: Multiattack
    desc: The sea spawn makes two Unarmed Strike attacks and one Piscine Anatomy attack.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) bludgeoning damage."
  - name: Piscine Anatomy
    desc: |-
      The sea spawn uses one of the following options (choose one or roll a d6):

      - **1–2 Bite.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage.  
      - **3–4 Poison Quills.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 3 (1d6) poison damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **5–6 Tentacle.** *Melee Weapon Attack:* +4 to hit, reach 10 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage, and the target is grappled (escape DC 12) if it is a Medium or smaller creature. Until this grapple ends, the sea spawn can't use this tentacle on another target.
```
