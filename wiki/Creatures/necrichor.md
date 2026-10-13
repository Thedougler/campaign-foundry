---
title: Necrichor
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Undead
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Necrichor
size: Medium
type: undead
alignment: Lawful Evil
ac: 14
hp: 85
hit_dice: 10d8 + 40
modifier: 3
speed: 20 ft., climb 20 ft.
stats: [ 8, 16, 18, 17, 13, 10 ]
saves:
  - con: 7
  - int: 6
  - wis: 4
damage_resistances: acid, necrotic
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, paralysed, poisoned, prone, restrained
senses: Blindsight 120 ft., passive Perception 11
languages: telepathy 120 ft. Common plus two other languages
cr: "7"
traits:
  - name: Amorphous
    desc: The necrichor can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Legendary Resistance (2/Day)
    desc: If the necrichor fails a saving throw, it can choose to succeed instead.
  - name: Reborn by Blood
    desc: If destroyed, the necrichor revives with all its Hit Points in 1d10 days in the nearest unoccupied space next to a creature of its choice that it has previously possessed with its Blood Puppeteering action. This trait doesn't function if the destroyed necrichor's remains are in a vessel affected by the *Hallow* spell or if all the necrichor's previous Blood Puppeteering targets are dead.
  - name: Spider Climb
    desc: The necrichor can climb difficult surfaces, including along ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The necrichor makes two Necrotic Burst attacks.
  - name: Necrotic Burst
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. *Hit:* 12 (2d8 + 3) Force damage plus 11 (2d10) Necrotic damage, and the target has the Poisoned condition until the start of the necrichor's next turn. While Poisoned, the target can't regain Hit Points."
  - name: Blood Puppeteering (Recharge 6)
    desc: |-
      *Constitution Saving Throw:* DC 15, one Bloodied creature within 5 feet. Constructs and Undead automatically succeed on this save. *Failure:* The target is possessed by the necrichor; the necrichor disappears, and the target has the Incapacitated condition and loses control of its body. The necrichor now controls the target's body, but the target retains awareness. The necrichor can't be targeted by any attack, spell, or other effect except ones that specifically target Undead. The necrichor's game statistics are the same, except it uses the possessed target's Speed and Strength, Dexterity, and Constitution scores.

      The possession lasts until the target drops to 0 Hit Points or the necrichor leaves it as a Bonus Action. When the possession ends, the necrichor appears in an unoccupied space within 5 feet of the target, and the target is immune to this necrichor's Blood Puppeteering for 24 hours. *Success:* The target is immune to this necrichor's Blood Puppeteering for 24 hours.
```
