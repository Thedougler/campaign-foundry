---
title: Undying Soldier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Undying Soldier
size: Medium
type: undead
alignment: Neutral Good
ac: 17
ac_class: breastplate, shield
hp: 26
hit_dice: 4d8 + 8
modifier: 1
speed: 30 ft.
stats: [ 16, 12, 14, 11, 13, 14 ]
skillsaves:
  - athletics: 5
  - history: 4
  - perception: 3
  - religion: 4
damage_vulnerabilities: necrotic
damage_resistances: radiant; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: poison
condition_immunities: exhaustion, poisoned
gear:
  - spear
senses: darkvision 60 ft., passive Perception 13
languages: Common, Elvish
cr: "2"
traits:
  - name: Illumination
    desc: The soldier magically sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The soldier can extinguish or restore this light as a bonus action.
  - name: Turn Resistance
    desc: The soldier has advantage on saving throws against any effect that turns undead.
actions:
  - name: Multiattack
    desc: The soldier makes two spear attacks.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage or 7 (1d8 + 3) piercing damage if used with two hands to make a melee attack, plus 9 (2d8) radiant damage if the target is a fiend or undead."
```
