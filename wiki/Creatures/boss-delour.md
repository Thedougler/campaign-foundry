---
title: Boss Delour
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Monstrosity
size: Small
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boss Delour
size: Small
type: monstrosity
alignment: Lawful Evil
ac: 14
hp: 110
hit_dice: 20d6 + 40
modifier: 4
speed: 30 ft. in rat or hybrid form
stats: [ 12, 18, 15, 17, 14, 16 ]
saves:
  - dex: 8
  - int: 7
skillsaves:
  - deception: 11
  - perception: 10
  - sleight of hand: 8
  - stealth: 8
gear:
  - hand crossbow
  - shortsword
senses: darkvision 60 ft., passive Perception 20
languages: Common, Thieves' cant (can't speak in rat form)
cr: "9"
traits:
  - name: Evasion
    desc: If Delour is subjected to an effect that allows him to make a Dexterity saving throw to take only half damage, he instead takes no damage if he succeeds on the saving throw and only half damage if he fails, provided he doesn't have the incapacitated condition.
  - name: Nimbleness
    desc: Delour can move through the space of a Medium or larger creature.
  - name: Regeneration
    desc: Delour regains 10 hit points at the start of his turn. If he takes damage from a silver weapon, this trait doesn't function at the start of his next turn. Delour dies only if he starts his turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Delour makes any combination of three Bite, Shortsword, or Hand Crossbow attacks.
  - name: Bite (Rat or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 26 (5d8 + 4) piercing damage. If the target is a Humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with lycanthropy. While cursed in this way, the target retains its alignment, languages, and equipment but otherwise uses the wererat stat block, excluding actions that require equipment the target doesn't have. During any night when there's a full moon in the sky, the target becomes an NPC under the DM's control and remains so until the night ends. A *Remove Curse* spell or similar magic ends this curse."
  - name: Shortsword (Humanoid or Hybrid Form Only)
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage plus 10 (3d6) poison damage."
  - name: Hand Crossbow (Humanoid or Hybrid Form Only)
    desc: "*Ranged Weapon Attack:* +8 to hit, range 30/120 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage plus 10 (3d6) poison damage."
bonus_actions:
  - name: Change Shape
    desc: Delour polymorphs into a rat-humanoid hybrid, a Medium giant rat, or his humanoid form. His statistics, other than his size and speed, are the same in each form. Any equipment he is wearing or carrying isn't transformed. He reverts to his humanoid form if he dies.
  - name: Cunning Action
    desc: Delour takes the Dash, Disengage, or Hide action.
```
