---
title: Grung Wildling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Small
habitat:
  - Forest
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grung Wildling
size: Small
type: humanoid
alignment: Any alignment
ac: 16
ac_class: natural armour
hp: 27
hit_dice: 5d6 + 10
modifier: 3
speed: 25 ft., climb 25 ft.
stats: [ 7, 16, 15, 10, 15, 11 ]
saves:
  - dex: 5
skillsaves:
  - athletics: 2
  - perception: 4
  - stealth: 5
  - survival: 4
damage_immunities: poison
condition_immunities: poisoned
gear:
  - dagger
  - shortbow
senses: passive Perception 14
languages: Grung
cr: "1"
traits:
  - name: Amphibious
    desc: The grung can breathe air and water.
  - name: Poisonous Skin
    desc: Any creature that grapples the grung or otherwise comes into direct contact with the grung's skin must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A poisoned creature no longer in direct contact with the grung can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Standing Leap
    desc: The grung's long jump is up to 25 feet and its high jump is up to 15 feet, with or without a running start.
  - name: Water Dependency
    desc: If the grung isn't immersed in water for at least 1 hour during a day, it suffers 1 level of exhaustion at the end of that day. The grung can recover from this exhaustion only through magic or by immersing itself in water for at least 1 hour.
actions:
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 5 (2d4) poison damage."
  - name: Shortbow
    desc: "*Ranged Weapon Attack:* +5 to hit, range 80/320 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 5 (2d4) poison damage."
  - name: Spellcasting
    desc: |-
      The grung casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *druidcraft*

      **3/day each:** *cure wounds*, *spike growth*

      **2/day:** *plant growth*
```
