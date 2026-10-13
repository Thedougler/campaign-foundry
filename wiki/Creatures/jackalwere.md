---
title: Jackalwere
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fiend
size: Small
habitat:
  - Desert
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Jackalwere
size: Small
type: fiend
alignment: Chaotic Evil
ac: 12
hp: 18
hit_dice: 4d6 + 4
modifier: 2
speed: 40 ft.
stats: [ 11, 15, 12, 13, 11, 10 ]
skillsaves:
  - deception: 4
  - perception: 4
  - stealth: 4
senses: Darkvision 90 ft., passive Perception 14
languages: Common
cr: 1/2
traits:
  - name: Pack Tactics
    desc: The jackalwere has Advantage on an attack roll against a creature if at least one of the jackalwere's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The jackalwere makes two Rend or Slam attacks.
  - name: Rend (Jackal or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage."
  - name: Slam (Human or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Bludgeoning damage."
  - name: Sleep Gaze (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 10, one creature the jackalwere can see within 30 feet (Constructs and Undead succeed automatically). *Failure:* The target has the Unconscious condition for 10 minutes or until it takes damage or a creature within 5 feet of it takes an action to wake it. *Success:* The target is immune to this jackalwere's Sleep Gaze for 24 hours."
bonus_actions:
  - name: Shape-Shift
    desc: The jackalwere shape-shifts into a Medium human or a Medium jackal-humanoid hybrid, or it returns to its true form (that of a Small jackal). Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
