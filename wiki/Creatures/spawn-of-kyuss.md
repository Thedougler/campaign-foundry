---
title: Spawn of Kyuss
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat:
  - Desert
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spawn of Kyuss
size: Medium
type: undead
alignment: Typically Chaotic Evil
ac: 10
hp: 76
hit_dice: 9d8 + 36
modifier: 0
speed: 30 ft.
stats: [ 16, 11, 18, 5, 7, 3 ]
saves:
  - wis: 1
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 8
languages: understands the languages it knew in life but can't speak
cr: "5"
traits:
  - name: Regeneration
    desc: The spawn of Kyuss regains 10 hit points at the start of its turn if it has at least 1 hit point and isn't in sunlight or a body of running water. If the spawn takes acid, fire, or radiant damage, this trait doesn't function at the start of the spawn's next turn. The spawn is destroyed only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Worms
    desc: If the spawn of Kyuss is targeted by an effect that cures disease or removes a curse, all the worms infesting it wither away, and it loses its Burrowing Worm action.
  - name: Unusual Nature
    desc: The spawn of Kyuss requires no air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The spawn of Kyuss makes two Claw attacks, and it uses Burrowing Worm.
  - name: Claw
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage plus 7 (2d6) necrotic damage."
  - name: Burrowing Worm
    desc: A worm launches from the spawn of Kyuss at one Humanoid that the spawn can see within 10 feet of it. The worm latches onto the target's skin unless the target succeeds on a DC 11 Dexterity saving throw. The worm is a Tiny Undead with AC 6, 1 hit point, a 2 (-4) in every ability score, and a speed of 1 foot. While on the target's skin, the worm can be killed by normal means or scraped off using an action (the spawn can use Burrowing Worm to launch a scraped-off worm at a Humanoid it can see within 10 feet of the worm). Otherwise, the worm burrows under the target's skin at the end of the target's next turn, dealing 1 piercing damage to it. At the end of each of its turns thereafter, the target takes 7 (2d6) necrotic damage per worm infesting it (maximum of 10d6), and if it drops to 0 hit points, it dies and then rises 10 minutes later as a spawn of Kyuss. If a worm-infested target is targeted by an effect that cures disease or removes a curse, all the worms infesting it wither away.
```
