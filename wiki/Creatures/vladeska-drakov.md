---
title: Vladeska Drakov
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vladeska Drakov
size: Medium
type: humanoid
subtype: human
alignment: Lawful Evil
ac: 18
hp: 170
hit_dice: 20d8 + 80
modifier: 6
speed: 30 ft.
stats: [ 19, 15, 18, 14, 13, 16 ]
saves:
  - con: 8
  - cha: 7
skillsaves:
  - athletics: 8
  - perception: 5
condition_immunities: frightened
gear:
  - pike
  - six spears
  - studded leather armour
senses: passive Perception 15
languages: Common, Giant, Orc
cr: "12"
traits:
  - name: Darklord Restoration
    desc: If Vladeska dies, she revives with all her Hit Points in 1d10 weeks somewhere in Falkovnia.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Vladeska fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Vladeska makes two Pike attacks. She can replace one attack with an Impaling Spear attack.
  - name: Impaling Spear
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 20/60 ft. *Hit:* 13 (2d8 + 4) Piercing damage, and the target is impaled on Vladeska's spear. While impaled, the creature has the Restrained condition and takes 3 (1d6) Piercing damage at the start of each of its turns. The target or a creature within 5 feet of it can take an action to remove it from the spear."
  - name: Pike
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 15 (2d10 + 4) Piercing damage."
  - name: Artillery Fire (1/Day)
    desc: "*Dexterity Saving Throw:* DC 15, each creature in a 20-foot-radius, 60-foot-high Cylinder centred on a point Vladeska can see within 300 feet. *Failure:* 13 (3d8) Bludgeoning damage plus 13 (3d8) Fire damage, and the target has the Prone condition. *Success:* Half damage only."
reactions:
  - name: Redirect Attack
    desc: "Trigger: A creature Vladeska can see makes an attack roll against her. _Response:_ Vladeska chooses a Small or Medium ally within 5 feet of herself. She and that ally swap places, and the ally becomes the target of the attack instead."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Vladeska can expend a use to take one of the following actions. Vladeska regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Advance
    desc: Vladeska moves up to half her Speed and makes one Pike attack.
  - name: Dreadful Impaling
    desc: Vladeska makes an Impaling Spear attack. If the attack hits and the target is a creature, each ally of the target within 30 feet is subjected to the following effect. *Wisdom Saving Throw:* DC 15. *Failure:* The target has the Frightened condition until the end of its next turn. *Failure or Success:* Vladeska can't take this action again until the start of her next turn.
  - name: Order Ballista
    desc: "*Dexterity Saving Throw:* DC 15, one creature Vladeska can see within 120 feet. *Failure:* 14 (4d6 + 3) Piercing damage, and the target's Speed is halved until the end of its next turn."
```
