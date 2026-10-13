---
title: Cultist of Bhaal
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Small or Medium
habitat:
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cultist of Bhaal
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 16
hp: 144
hit_dice: 17d8 + 68
modifier: 7
speed: 30 ft.
stats: [ 13, 19, 18, 15, 17, 14 ]
saves:
  - dex: 7
  - int: 5
skillsaves:
  - perception: 6
  - stealth: 7
gear:
  - holy symbol
  - studded leather armour
senses: Darkvision 60 ft., passive Perception 16
languages: Common
cr: "7"
traits:
  - name: Blood-Soaked Resolve
    desc: While Bloodied, the cultist has Advantage on saving throws.
actions:
  - name: Multiattack
    desc: The cultist makes three Cursed Blade attacks. It can replace one of these attacks with a use of Spellcasting.
  - name: Cursed Blade
    desc: "*Melee or Ranged Attack Roll:* +7 (with Advantage if the target doesn't have all its Hit Points), reach 5 ft. or range 20/80 ft. *Hit:* 14 (3d6 + 4) Slashing damage. *Hit or Miss:* The blade magically returns to the cultist's hand immediately after a ranged attack."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

      **2/day:** *Mind Spike*

      **1/day each:** *Dimension Door*, *Mislead*
```
