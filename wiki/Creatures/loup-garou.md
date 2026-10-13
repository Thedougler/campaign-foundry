---
title: Loup Garou
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Monstrosity
size: Small or Medium
habitat:
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Loup Garou
size: Small or Medium
type: monstrosity
subtype: lycanthrope
alignment: Chaotic Evil
ac: 17
hp: 187
hit_dice: 22d8 + 88
modifier: 9
speed: 30 ft., 40 ft. (hybrid form only), 50 ft. (dire wolf form only)
stats: [ 24, 18, 21, 14, 16, 16 ]
saves:
  - dex: 9
  - con: 10
skillsaves:
  - perception: 8
  - stealth: 9
condition_immunities: charmed, frightened
gear:
  - longsword
senses: Darkvision 120 ft., passive Perception 18
languages: Common (can't speak in dire wolf form)
cr: "13"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the loup garou fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The loup garou makes two attacks, using Longsword or Rend in any combination. It can replace one attack with a Bite attack.
  - name: Bite (Dire Wolf or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 16 (2d8 + 7) Piercing damage plus 14 (4d6) Necrotic damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 18. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewolf under the DM's control and has 10 Hit Points. The curse can't be removed until this loup garou dies. *Success:* The target is immune to this loup garou's curse for 24 hours."
  - name: Longsword (Humanoid or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 18 (2d10 + 7) Slashing damage plus 3 (1d6) Necrotic damage."
  - name: Rend (Dire Wolf or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 16 (2d8 + 7) Slashing damage. If the target is a Medium or smaller creature, it has the Prone condition."
bonus_actions:
  - name: Shape-Shift
    desc: The loup garou shape-shifts into a Large dire wolf-humanoid hybrid or a Large dire wolf, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the loup garou can expend a use to take one of the following actions. The loup garou regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Mauling Charge
    desc: The loup garou moves up to half its Speed without provoking Opportunity Attacks and makes one Longsword or Rend attack.
  - name: Surprise Bite
    desc: The loup garou uses Shape-Shift, turning into its hybrid or dire wolf form, then makes one Bite attack. The loup garou can't take this action again until the start of its next turn.
```
