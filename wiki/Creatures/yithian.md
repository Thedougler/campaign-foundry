---
title: Yithian
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Aberration
size: Large
habitat:
  - Desert
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yithian
size: Large
type: aberration
alignment: Chaotic Neutral
ac: 14
hp: 180
hit_dice: 19d10 + 76
modifier: 5
speed: 30 ft.
stats: [ 18, 10, 18, 21, 18, 19 ]
saves:
  - con: 9
  - int: 10
damage_immunities: psychic
condition_immunities: charmed, frightened, poisoned
senses: Truesight 60 ft., passive Perception 14
languages: Deep Speech; telepathy 120 ft.
cr: "15"
traits:
  - name: Magic Resistance
    desc: The yithian has Advantage on saving throws against spells and other magical effects.
  - name: Shielded Mind
    desc: The yithian's thoughts can't be read by any means, and other creatures can communicate with it telepathically only if it allows them.
actions:
  - name: Multiattack
    desc: The yithian makes three Pincer attacks. It can replace one attack with a use of Sup.
  - name: Pincer
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 18 (4d6 + 4) Piercing damage and the creature has the Grappled condition (escape DC 14)."
  - name: Sup
    desc: "*Intelligence Saving Throw:* DC 18, one creature within 10 feet that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 15 (3d6 + 5) Psychic damage. The target's Hit Points maximum decreases by an amount equal to the damage taken, and the yithian regains Hit Points equal to that amount."
bonus_actions:
  - name: Mind Swap (Recharge 6)
    desc: |-
      *Intelligence Saving Throw:* DC 18, one Humanoid the yithian can see within 5 feet. *Failure:* The target is possessed by the yithian; the yithian disappears, and the target has the Incapacitated condition and loses control of its body. The yithian now controls the body; the target has no awareness of the yithian's actions. The yithian can't be targeted by any attack, spell, or other effect. The yithian's game statistics are the same, except it uses the possessed target's Speed and Strength, Dexterity, and Constitution modifiers. It knows everything the target knew.

      The possession lasts until the body drops to 0 Hit Points or the yithian leaves as a Bonus Action. When the possession ends, the yithian returns to its body, which appears within 5 feet of the target. The target is Stunned for 1 minute by alien memories, and it is immune to this yithian's Mind Swap for 24 hours. *Success:* The target is immune to Mind Swap for 24 hours.
  - name: Eldritch Magic (2/Day)
    desc: |
      The yithian casts *Clairvoyance*, *Modify Memory*, *Phantasmal Killer*, or Transport via Plants, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18).
```
