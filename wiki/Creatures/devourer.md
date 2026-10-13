---
title: Devourer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Undead
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Devourer
size: Large
type: undead
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 189
hit_dice: 18d10 + 90
modifier: 1
speed: 30 ft.
stats: [ 20, 12, 20, 13, 10, 16 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 10
languages: Abyssal, telepathy 120 ft.
cr: "13"
traits:
  - name: Unusual Nature
    desc: A devourer doesn't require air, drink, or sleep.
actions:
  - name: Multiattack
    desc: The devourer makes two Claw attacks and can use either Imprison Soul or Soul Rend, if available.
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage plus 21 (6d6) necrotic damage."
  - name: Imprison Soul
    desc: The devourer chooses a living Humanoid with 0 hit points that it can see within 30 feet of it. That creature is teleported inside the devourer's ribcage and imprisoned there. While imprisoned in this way, the creature is restrained and has disadvantage on death saving throws. If the creature dies while imprisoned, the devourer regains 25 hit points and immediately recharges Soul Rend. Additionally, at the start of its next turn, the devourer regurgitates the slain creature as a bonus action, and the creature becomes an undead. If the victim had 2 or fewer Hit Dice, it becomes a zombie. If it had 3 to 5 Hit Dice, it becomes a ghoul. Otherwise, it becomes a wight. A devourer can imprison only one creature at a time.
  - name: Soul Rend (Recharge 6)
    desc: The devourer creates a vortex of life-draining energy in a 20-foot radius centred on itself. Each creature in that area must make a DC 18 Constitution saving throw, taking 44 (8d10) necrotic damage on a failed save, or half as much damage on a successful one.
```
