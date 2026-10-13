---
title: Vampirate
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampirate
size: Medium
type: undead
alignment: typically Lawful Evil
ac: 14
ac_class: natural armour
hp: 42
hit_dice: 5d8 + 20
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 18, 10, 11, 12 ]
damage_vulnerabilities: radiant
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, poisoned
gear:
  - light crossbow
senses: darkvision 120 ft., passive Perception 10
languages: the languages it knew in life
cr: "2"
traits:
  - name: Explode
    desc: When the vampirate is reduced to 0 hit points, it explodes in a cloud of ash. Any creature within 5 feet of it must succeed on a DC 14 Constitution saving throw or take 5 (1d10) necrotic damage.
  - name: Spider Climb
    desc: The vampirate can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Unusual Nature
    desc: The vampirate doesn't require air or drink.
actions:
  - name: Energy Drain
    desc: "*Melee or Ranged Spell Attack:* +4 to hit, reach 5 ft. or range 30 ft., one creature. *Hit:* 11 (2d10) necrotic damage. A Humanoid reduced to 0 hit points by this attack dies and instantly transforms into a free-willed shadow under the DM's control."
  - name: Light Crossbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 80/320 ft., one target. *Hit:* 11 (2d8 + 2) piercing damage."
```
