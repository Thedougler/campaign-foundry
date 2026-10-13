---
title: Bulezau
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bulezau
size: Medium
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 52
hit_dice: 7d8 + 21
modifier: 2
speed: 40 ft.
stats: [ 15, 14, 17, 8, 9, 6 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 9
languages: Abyssal, telepathy 60 ft.
cr: "3"
traits:
  - name: Rotting Presence
    desc: When any creature that isn't a demon starts its turn within 30 feet of the bulezau, that creature must succeed on a DC 13 Constitution saving throw or take 3 (1d6) necrotic damage.
  - name: Standing Leap
    desc: The bulezau's long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.
  - name: Sure-Footed
    desc: The bulezau has advantage on Strength and Dexterity saving throws made against effects that would knock it prone.
actions:
  - name: Barbed Tail
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 8 (1d12 + 2) piercing damage plus 4 (1d8) necrotic damage. If the target is a creature, it must succeed on a DC 13 Constitution saving throw against disease or become poisoned until the disease ends. While poisoned in this way, the target sports festering boils, coughs up flies, and sheds rotting skin, and the target must repeat the saving throw after every 24 hours that elapse. On a successful save, the disease ends. On a failed save, the target's hit point maximum is reduced by 4 (1d8). The target dies if its hit point maximum is reduced to 0."
```
