---
title: Vargouille Reflection
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Tiny
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vargouille Reflection
size: Tiny
type: fiend
alignment: typically Chaotic Evil
ac: 12
hp: 22
hit_dice: 5d4 + 10
modifier: 2
speed: 5 ft., fly 40 ft.
stats: [ 6, 15, 14, 6, 10, 2 ]
damage_resistances: cold, fire, lightning, psychic
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands Abyssal, Infernal, and any languages it knew before becoming a vargouille, but it can't speak
cr: "1"
traits:
  - name: Magic Resistance
    desc: The vargouille has advantage on saving throws against spells and other magical effects.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage plus 10 (3d6) psychic damage."
  - name: Abyssal Curse
    desc: The vargouille targets one Humanoid within 5 feet of itself that has the incapacitated condition. The target must succeed on a DC 12 Charisma saving throw or become cursed. The cursed target's Charisma decreases by 1 after each hour, as its head takes on fiendish aspects, and its Charisma can't increase. The curse doesn't advance while the target is in sunlight or the area of a *daylight* spell. When the cursed target's Charisma becomes 2, the target dies, and its head tears from its body and becomes a new vargouille reflection. Casting remove curse, greater restoration, or a similar spell on the target before the transformation is complete ends the curse and restores the target's Charisma.
  - name: Horrific Reflection (Recharge 5–6)
    desc: The vargouille's head mimics that of a Humanoid the vargouille can see within 120 feet of itself. The target must succeed on a DC 12 Wisdom saving throw or take 10 (3d6) psychic damage and have the frightened condition for 1 hour or until the vargouille loses concentration (as if concentrating on a spell). If the target's saving throw is successful or if the effect ends on it, the target is immune to the Horrific Reflection of all vargouille reflections for 1 hour.
```
