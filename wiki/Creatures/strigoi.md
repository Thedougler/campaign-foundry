---
title: Strigoi
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Hill
  - Mountain
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Strigoi
size: Medium
type: monstrosity
alignment: Chaotic Evil
ac: 16
hp: 52
hit_dice: 7d8 + 21
modifier: 2
speed: 30 ft., fly 40 ft.
stats: [ 17, 14, 16, 11, 17, 10 ]
saves:
  - str: 5
  - dex: 4
skillsaves:
  - perception: 5
  - stealth: 4
damage_resistances: necrotic
condition_immunities: charmed, frightened
senses: Darkvision 60 ft., passive Perception 15
languages: Common
cr: "4"
traits:
  - name: Stirge Telepathy
    desc: The strigoi can magically control stirges within 120 feet of itself using a special telepathy.
actions:
  - name: Multiattack
    desc: The strigoi makes two Claw attacks and one Proboscis attack.
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage."
  - name: Proboscis
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 5 (1d4 + 3) Piercing damage plus 7 (2d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the strigoi regains Hit Points equal to that amount. A creature reduced to 0 Hit Points by this attack dies, leaving behind nothing except its skin and equipment."
bonus_actions:
  - name: Protective Swarm (Recharge 6)
    desc: The strigoi summons a swarm of bloodthirsty mosquitoes in a 10-foot Emanation originating from itself, which lasts for 1 minute or until the strigoi's Concentration on it ends. Whenever the swarm enters a creature's space or a creature enters the swarm or ends its turn there, that creature is subjected to the following effect (a creature makes this save only once per turn, and strigoi and stirges are unaffected). *Constitution Saving Throw:* DC 13. *Failure:* 3 (1d6) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.
```
