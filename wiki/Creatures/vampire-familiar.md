---
title: Vampire Familiar
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Familiar
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 15
hp: 65
hit_dice: 10d8 + 20
modifier: 5
speed: 30 ft., climb 30 ft.
stats: [ 17, 16, 15, 10, 10, 14 ]
saves:
  - dex: 5
  - wis: 2
skillsaves:
  - perception: 4
  - persuasion: 4
  - stealth: 7
damage_resistances: necrotic
condition_immunities: charmed (except from its vampire master)
gear:
  - ten daggers
senses: Darkvision 60 ft., passive Perception 14
languages: Common plus one other language
cr: "3"
traits:
  - name: Vampiric Connection
    desc: While the familiar and its vampire master are on the same plane of existence, the vampire can communicate with the familiar telepathically, and the vampire can perceive through the familiar's senses.
actions:
  - name: Multiattack
    desc: The familiar makes two Umbral Dagger attacks.
  - name: Umbral Dagger
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 20/60 ft. *Hit:* 5 (1d4 + 3) Piercing damage plus 7 (3d4) Necrotic damage. If the target is reduced to 0 Hit Points by this attack, the target becomes Stable but has the Poisoned condition for 1 hour. While it has the Poisoned condition, the target has the Paralysed condition."
bonus_actions:
  - name: Deathless Agility
    desc: The familiar takes the Dash or Disengage action.
```
