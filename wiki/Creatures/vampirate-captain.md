---
title: Vampirate Captain
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampirate Captain
size: Medium
type: undead
alignment: typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 85
hit_dice: 10d8 + 40
modifier: 3
speed: 30 ft.
stats: [ 15, 16, 18, 12, 13, 16 ]
saves:
  - con: 7
  - wis: 4
  - cha: 6
damage_vulnerabilities: radiant
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, poisoned
gear:
  - heavy crossbow
senses: darkvision 120 ft., passive Perception 11
languages: the languages it knew in life
cr: "6"
traits:
  - name: Explode
    desc: When the captain is reduced to 0 hit points, it explodes in a cloud of ash. Any creature within 5 feet of it must succeed on a DC 15 Constitution saving throw or take 16 (3d10) necrotic damage.
  - name: Spider Climb
    desc: The captain can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Unusual Nature
    desc: The captain doesn't require air or drink.
actions:
  - name: Energy Drain
    desc: "*Melee or Ranged Spell Attack:* +6 to hit, reach 5 ft. or range 30 ft., one creature. *Hit:* 22 (4d10) necrotic damage. A Humanoid reduced to 0 hit points by this attack dies and instantly transforms into a free-willed shadow or vampirate (captain's choice) under the DM's control."
  - name: Heavy Crossbow
    desc: "*Ranged Weapon Attack:* +6 to hit, range 100/400 ft., one target. *Hit:* 19 (3d10 + 3) piercing damage."
  - name: Ship Invisibility (Recharges after a Short or Long Rest)
    desc: A ship upon which the captain stands, along with all creatures and objects aboard it, becomes invisible to creatures not aboard the ship. The captain must concentrate on this magical effect to maintain it (as if concentrating on a spell), and it lasts for up to 1 hour. The effect ends if the captain leaves the ship.
reactions:
  - name: Uncanny Dodge
    desc: The captain halves the damage that it takes from an attack that hits it. The captain must be able to see the attacker.
```
