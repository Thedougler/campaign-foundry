---
title: Boss Augustus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boss Augustus
size: Medium
type: monstrosity
alignment: Neutral
ac: 13
hp: 150
hit_dice: 20d8 + 60
modifier: 3
speed: 40 ft. in wolf or hybrid form
stats: [ 18, 16, 17, 14, 15, 12 ]
saves:
  - str: 8
  - dex: 7
skillsaves:
  - perception: 10
  - sleight of hand: 7
  - stealth: 7
senses: passive Perception 20
languages: Common, Thieves' cant (can't speak in wolf form)
cr: "9"
traits:
  - name: Regeneration
    desc: Augustus regains 10 hit points at the start of his turn. If he takes damage from a silver weapon, this trait doesn't function at the start of his next turn. Augustus dies only if he starts his turn with 0 hit points and doesn't regenerate.
  - name: Special Equipment
    desc: Augustus wields a +2 Longsword.
actions:
  - name: Multiattack
    desc: Augustus makes any combination of two Bite, Claw, or Magic Longsword attacks.
  - name: Bite (Wolf or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 26 (5d8 + 4) piercing damage. If the target is a Humanoid, it must succeed on a DC 15 Constitution saving throw or be cursed with lycanthropy. While cursed in this way, the target retains its alignment, languages, and equipment but otherwise uses the werewolf stat block, excluding actions that require equipment the target doesn't have. During any night when there's a full moon in the sky, the target becomes an NPC under the DM's control and remains so until the night ends. A *Remove Curse* spell or similar magic ends this curse."
  - name: Claw (Wolf or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 21 (5d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or have the prone condition."
  - name: Magic Longsword (Humanoid or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 28 (4d10 + 6) slashing damage."
bonus_actions:
  - name: Change Shape
    desc: Augustus polymorphs into a wolf-humanoid hybrid, a wolf, or his humanoid form. His statistics, other than his speed, are the same in each form. Any equipment he is wearing or carrying isn't transformed. He reverts to his humanoid form if he dies.
  - name: Cunning Action
    desc: Augustus takes the Dash, Disengage, or Hide action.
```
