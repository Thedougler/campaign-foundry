---
title: Werewyvern
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Dragon
size: Medium
habitat:
  - Hill
  - Mountain
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Werewyvern
size: Medium
type: dragon
subtype: lycanthrope
alignment: Chaotic Evil
ac: 16
hp: 152
hit_dice: 16d8 + 80
modifier: 5
speed: 30 ft., fly 40 ft. (wyvern or hybrid form only)
stats: [ 19, 15, 20, 10, 12, 12 ]
saves:
  - dex: 5
  - wis: 4
skillsaves:
  - perception: 4
  - stealth: 5
gear:
  - six javelins
senses: Darkvision 120 ft., passive Perception 14
languages: Common, Draconic (can't speak in wyvern form)
cr: "8"
traits:
  - name: Flyby (Wyvern or Hybrid Form Only)
    desc: The werewyvern doesn't provoke an Opportunity Attack action when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The werewyvern makes three attacks, using Javelin or Rend in any combination. It can replace one of these attacks with one Stinger attack.
  - name: Javelin (Humanoid or Hybrid Form Only)
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30/120 ft. *Hit:* 18 (4d6 + 4) Piercing damage."
  - name: Rend
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 18 (4d6 + 4) Slashing damage."
  - name: Stinger (Wyvern or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Piercing damage plus 16 (3d10) Poison damage, and the target has the Poisoned condition until the start of the werewyvern's next turn. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 16. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewyvern under the DM's control and has 20 Hit Points. *Success:* The target is immune to this werewyvern's curse for 24 hours."
bonus_actions:
  - name: Shape-Shift
    desc: The werewyvern shape-shifts into a Medium wyvern-humanoid hybrid or a Large wyvern, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
