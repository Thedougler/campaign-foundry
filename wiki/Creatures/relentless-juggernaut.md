---
title: Relentless Juggernaut
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Large
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Relentless Juggernaut
size: Large
type: fiend
alignment: Neutral Evil
ac: 16
hp: 168
hit_dice: 16d10 + 80
modifier: 1
speed: 30 ft.
stats: [ 22, 12, 20, 8, 15, 16 ]
saves:
  - dex: 5
  - wis: 6
  - cha: 7
condition_immunities: charmed, exhaustion, frightened
senses: Darkvision 120 ft., passive Perception 12
languages: understands all but can't speak
cr: "12"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the juggernaut fails a saving throw, it can choose to succeed instead.
  - name: Regeneration
    desc: The juggernaut regains 10 Hit Points at the start of each of its turns. If the juggernaut takes Radiant damage or damage from a Critical Hit, this trait doesn't function on the juggernaut's next turn. The juggernaut dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
  - name: Siege Monster
    desc: The juggernaut deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The juggernaut makes two attacks, using Executioner's Blade or Crushing Stone in any combination.
  - name: Executioner's Blade
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 19 (3d8 + 6) Slashing damage, and the target's Speed is reduced by 10 feet until the end of the juggernaut's next turn."
  - name: Crushing Stone
    desc: "*Ranged Attack Roll:* +10, range 60 ft. *Hit:* 13 (2d6 + 6) Bludgeoning damage, and the target has the Incapacitated condition until the start of the juggernaut's next turn."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the relentless juggernaut can expend a use to take one of the following actions. The relentless juggernaut regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Implacable Advance
    desc: The juggernaut moves up to half its Speed, ignoring Difficult Terrain. Each creature in its path is subjected to the following effect. *Strength Saving Throw:* DC 18. *Failure:* 7 (2d6) Bludgeoning damage, and the target has the Prone condition. *Failure or Success:* The juggernaut can't take this action again until the start of its next turn.
  - name: Sweeping Blade
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 15-foot Cone. *Failure:* 11 (1d10 + 6) Slashing damage, and the target is pulled up to 10 feet straight toward the juggernaut."
```
