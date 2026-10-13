---
title: Vampirate Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampirate Mage
size: Medium
type: undead
alignment: typically Lawful Evil
ac: 14
ac_class: natural armour
hp: 68
hit_dice: 8d8 + 32
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 18, 13, 14, 15 ]
saves:
  - wis: 5
  - cha: 5
damage_vulnerabilities: radiant
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, poisoned
senses: darkvision 120 ft., passive Perception 12
languages: the languages it knew in life
cr: "5"
traits:
  - name: Explode
    desc: When the mage is reduced to 0 hit points, it explodes in a cloud of ash. Any creature within 5 feet of it must succeed on a DC 14 Constitution saving throw or take 11 (2d10) necrotic damage.
  - name: Spider Climb
    desc: The mage can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Unusual Nature
    desc: The mage doesn't require air or drink.
actions:
  - name: Multiattack
    desc: The mage makes two Ray of Cold attacks.
  - name: Energy Drain
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 30 ft., one creature. *Hit:* 22 (4d10) necrotic damage. A Humanoid reduced to 0 hit points by this attack dies and instantly transforms into a free-willed shadow under the DM's control."
  - name: Ray of Cold
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 11 (2d8 + 2) cold damage."
  - name: Spellcasting
    desc: |-
      The mage casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *mage hand*, *message*

      **1/day:** *darkness*, *dimension door*, *fly*, *hypnotic pattern*
```
