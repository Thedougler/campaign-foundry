---
title: Braxat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Braxat
size: Huge
type: giant
alignment: typically Neutral
ac: 18
ac_class: natural armour, intellect fortress
hp: 162
hit_dice: 13d12 + 78
modifier: -1
speed: 40 ft.
stats: [ 26, 8, 22, 14, 13, 7 ]
damage_immunities: acid, psychic
condition_immunities: charmed, frightened
gear:
  - greatclub
senses: darkvision 60 ft., passive Perception 11
languages: Common, Giant
cr: "9"
traits:
  - name: Intellect Fortress
    desc: The braxat's AC includes its Intelligence modifier.
actions:
  - name: Multiattack
    desc: The braxat makes two Greatclub attacks.
  - name: Greatclub
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 21 (3d8 + 8) bludgeoning damage."
  - name: Acid Breath (Recharge 6)
    desc: The braxat exhales a 15-foot cone of acid. Each creature in the cone must make a DC 18 Constitution saving throw, taking 26 (4d12) acid damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting (Psionics)
    desc: |-
      The braxat casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 14):

      **1/day each:** *compulsion*, *fear*
reactions:
  - name: Psionic Shield (3/Day)
    desc: When the braxat would be hit by an attack roll or a *magic missile* spell that originates from a source the braxat can see, the braxat can create an invisible barrier of magical force around itself that lasts until the start of its next turn. This barrier gives the braxat a +5 bonus to AC, including against the triggering attack, and prevents *magic missile* spells from damaging it.
```
