---
title: Ivana Boritsi
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ivana Boritsi
size: Medium
type: humanoid
subtype: human
alignment: Neutral Evil
ac: 17
hp: 104
hit_dice: 16d8 + 32
modifier: 9
speed: 30 ft.
stats: [ 10, 17, 14, 18, 15, 14 ]
saves:
  - dex: 6
  - con: 5
skillsaves:
  - deception: 8
  - nature: 7
  - perception: 5
damage_immunities: poison
condition_immunities: poisoned
senses: passive Perception 15
languages: Common
cr: "5"
traits:
  - name: Darklord Restoration
    desc: If Ivana dies, she revives with all her Hit Points in 1d10 weeks somewhere in Borca.
  - name: Legendary Resistance (2/Day, or 3/Day in Domain)
    desc: If Ivana fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Ivana makes two Toxic Touch attacks.
  - name: Toxic Touch
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Poison damage. A Humanoid reduced to 0 Hit Points by this damage rises 24 hours later as a Vine Blight under Ivana's control unless the Humanoid is restored to life or its body is destroyed."
  - name: Stifling Perfume (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 30-foot Emanation originating from Ivana. *Failure:* 13 (3d8) Poison damage, and the target has the Prone condition. *Success:* Half damage only."
bonus_actions:
  - name: Tree Stride
    desc: If within 5 feet of a Large or bigger inanimate plant, Ivana teleports to an unoccupied space within 5 feet of a second Large or bigger inanimate plant that is within 60 feet of the previous plant.
  - name: Charm (Recharge 5–6)
    desc: |
      Ivana casts *Charm Person*, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15), and the duration is 24 hours.
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, Ivana can expend a use to take one of the following actions. Ivana regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Retaliate
    desc: Ivana makes one Toxic Touch attack.
  - name: Toxin Wave
    desc: "*Dexterity Saving Throw:* DC 15, each creature in a 15-foot Cone. *Failure:* The target has the Poisoned condition until the end of its next turn. While Poisoned, the target subtracts 1d6 from its damage rolls. *Failure or Success:* Ivana can't take this action again until the start of her next turn."
```
