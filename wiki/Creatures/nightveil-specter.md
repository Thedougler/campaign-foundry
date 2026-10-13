---
title: Nightveil Specter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nightveil Spectre
size: Medium
type: undead
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 105
hit_dice: 14d8 + 42
modifier: 4
speed: 30 ft.
stats: [ 18, 19, 16, 6, 17, 11 ]
saves:
  - dex: 8
  - wis: 7
skillsaves:
  - insight: 7
  - perception: 7
  - stealth: 8
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 17
languages: understands Common but can't speak
cr: "10"
traits:
  - name: Mount
    desc: If the spectre isn't mounted, it can use a bonus action to magically teleport onto its gloamwing mount, provided the spectre and the gloamwing are on the same plane of existence. When it teleports, the spectre appears astride the gloamwing along with any equipment it is wearing or carrying. While mounted and not incapacitated, the spectre can't be surprised, and both it and its mount gain advantage on Dexterity saving throws.
actions:
  - name: Multiattack
    desc: The spectre makes two scythe attacks.
  - name: Scythe
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 13 (3d8) psychic damage."
  - name: Mind Twist (Recharge 5–6)
    desc: The spectre magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 15 Wisdom saving throw or take 22 (5d8) psychic damage and be stunned for 1 minute. The stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Reap Memory (3/Day)
    desc: The spectre touches one incapacitated creature and chooses 1 hour from among the past 24. Unless the creature succeeds on a DC 15 Intelligence saving throw, the creature loses all memory of that hour. The creature regains the memory only if the spectre dies within the next 24 hours.
```
