---
title: Vargouille
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fiend
size: Tiny
habitat:
  - Desert
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vargouille
size: Tiny
type: fiend
alignment: Typically Chaotic Evil
ac: 12
hp: 18
hit_dice: 4d4 + 8
modifier: 2
speed: 5 ft., fly 40 ft.
stats: [ 6, 14, 14, 4, 7, 2 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 8
languages: understands Abyssal, Infernal, and any languages it knew before becoming a vargouille but can't speak
cr: "1"
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage plus 10 (3d6) poison damage."
  - name: Abyssal Curse
    desc: The vargouille targets one incapacitated Humanoid within 5 feet of it. The target must succeed on a DC 12 Charisma saving throw or become cursed. The cursed target loses 1 point of Charisma after each hour, as its head takes on fiendish aspects. The curse doesn't advance while the target is in sunlight or the area of a *daylight* spell; don't count that time. When the cursed target's Charisma becomes 2, it dies, and its head tears from its body and becomes a new vargouille. Casting *remove curse*, *greater restoration*, or a similar spell on the target before the transformation is complete can end the curse. Doing so undoes the changes made to the target by the curse.
  - name: Stunning Shriek (Recharge 5–6)
    desc: The vargouille shrieks. Each Humanoid and Beast within 30 feet of the vargouille and able to hear it must succeed on a DC 12 Wisdom saving throw or be frightened of the vargouille until the end of the vargouille's next turn. While frightened in this way, a target is stunned. If a target's saving throw is successful or the effect ends for it, the target is immune to the Stunning Shriek of all vargouilles for 1 hour.
```
