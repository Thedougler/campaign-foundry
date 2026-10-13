---
title: Meenlock
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Small
habitat:
  - Forest
  - Swamp
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Meenlock
size: Small
type: fey
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 31
hit_dice: 7d6 + 7
modifier: 2
speed: 30 ft.
stats: [ 7, 15, 12, 11, 10, 8 ]
skillsaves:
  - perception: 4
  - stealth: 6
  - survival: 2
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 14
languages: telepathy 120 ft.
cr: "2"
traits:
  - name: Fear Aura
    desc: Any Beast or Humanoid that starts its turn within 10 feet of the meenlock must succeed on a DC 11 Wisdom saving throw or be frightened until the start of the creature's next turn.
  - name: Light Sensitivity
    desc: While in bright light, the meenlock has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (2d4 + 2) slashing damage, and the target must succeed on a DC 11 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
bonus_actions:
  - name: Shadow Teleport (Recharge 5–6)
    desc: The meenlock teleports to an unoccupied space within 30 feet of it, provided that both the space it's teleporting from and its destination are in dim light or darkness. The destination need not be within line of sight.
```
