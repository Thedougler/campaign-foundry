---
title: Greater Star Spawn Emissary
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Aberration
size: Huge
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Greater Star Spawn Emissary
size: Huge
type: aberration
alignment: Chaotic Evil
ac: 15
hp: 304
hit_dice: 21d12 + 168
modifier: 8
speed: 40 ft., fly 40 ft. (hover)
stats: [ 24, 13, 26, 27, 22, 25 ]
saves:
  - con: 15
  - int: 15
  - wis: 13
  - cha: 14
skillsaves:
  - arcana: 22
  - perception: 13
damage_resistances: acid, force, necrotic, psychic
condition_immunities: charmed, exhaustion, frightened
senses: Truesight 120 ft., passive Perception 23
languages: all; telepathy 120 ft.
cr: "21"
traits:
  - name: Aberrant Restoration
    desc: If destroyed, the emissary revives with all its Hit Points in 1 day in the space of a Gibbering Mouther that was within 300 feet of the emissary when the emissary was destroyed; that mouther is destroyed.
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the emissary fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The emissary makes two attacks, using Lashing Maw or Coagulated Nodule in any combination. It can replace one attack with Unearthly Bile if available.
  - name: Lashing Maw
    desc: "*Melee Attack Roll:* +14, reach 15 ft. *Hit:* 33 (4d12 + 7) Piercing damage plus 18 (4d8) Acid damage."
  - name: Coagulated Nodule
    desc: "*Ranged Attack Roll:* +15, range 120 ft. *Hit:* 44 (8d8 + 8) Acid damage."
  - name: Unearthly Bile (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 23, each creature in a 30-foot-radius Sphere centred on a point the emissary can see within 120 feet. *Failure:* 54 (12d8) Acid damage, and a Gibbering Mouther appears in an unoccupied space within 30 feet of the target. The mouthers take their turn immediately after the emissary on the same Initiative count. Each mouther fights until destroyed. *Success:* Half damage only."
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the greater star spawn emissary can expend a use to take one of the following actions. The greater star spawn emissary regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Forced Mutations
    desc: "*Charisma Saving Throw:* DC 23, up to two creatures the emissary can see within 30 feet. *Failure:* The target has the Paralysed condition until the end of its next turn. *Failure or Success:* The emissary can't take this action again until the start of its next turn."
  - name: Teleporting Lash
    desc: The emissary can teleport up to 30 feet to an unoccupied space it can see, and it makes one Lashing Maw attack.
```
