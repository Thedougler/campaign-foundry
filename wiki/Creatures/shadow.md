---
title: Shadow
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Undead
size: Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow
size: Medium
type: undead
alignment: Chaotic Evil
ac: 12
hp: 27
hit_dice: 5d8 + 5
modifier: 2
speed: 40 ft.
stats: [ 6, 14, 13, 6, 10, 8 ]
skillsaves:
  - stealth: 6
damage_vulnerabilities: radiant
damage_resistances: acid, cold, fire, lightning, thunder
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 10
cr: 1/2
traits:
  - name: Amorphous
    desc: The shadow can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Sunlight Weakness
    desc: While in sunlight, the shadow has Disadvantage on D20 Tests.
actions:
  - name: Draining Swipe
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Necrotic damage, and the target's Strength score decreases by 1d4. The target dies if this reduces that score to 0. If a Humanoid is slain by this attack, a Shadow rises from the corpse 1d4 hours later."
bonus_actions:
  - name: Shadow Stealth
    desc: While in Dim Light or Darkness, the shadow takes the Hide action.
```
