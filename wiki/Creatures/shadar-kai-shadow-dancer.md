---
title: Shadar-kai Shadow Dancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat:
  - Forest
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadar-kai Shadow Dancer
size: Medium
type: humanoid
subtype: elf
alignment: Any alignment
ac: 15
ac_class: studded leather
hp: 71
hit_dice: 13d8 + 13
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 13, 11, 12, 12 ]
saves:
  - dex: 6
  - cha: 4
skillsaves:
  - stealth: 6
damage_resistances: necrotic
condition_immunities: charmed, exhaustion
senses: darkvision 60 ft., passive Perception 11
languages: Common, Elvish
cr: "7"
traits:
  - name: Fey Ancestry
    desc: The shadar-kai has advantage on saving throws against being charmed, and magic can't put it to sleep.
actions:
  - name: Multiattack
    desc: |-
      The shadar-kai makes three Spiked Chain attacks.

      It can use Shadow Jump after one of these attacks.
  - name: Spiked Chain
    desc: |-
      *Melee Weapon Attack:* +6 to hit, reach 10 ft., one target. *Hit:* 10 (2d6 + 3) piercing damage. The target must succeed on a DC 14 Dexterity saving throw or suffer one of the following effects (choose one or roll a d6):

      - **1–2 Decay.** The target takes 22 (4d10) necrotic damage.  
      - **3–4 Grapple.** The target is grappled (escape DC 14) if it is a Medium or smaller creature. Until the grapple ends, the target is restrained, and the shadar-kai can't grapple another target.  
      - **5–6 Topple.** The target is knocked prone.  
bonus_actions:
  - name: Shadow Jump
    desc: The shadar-kai teleports, along with any equipment is it wearing or carrying, up to 30 feet to an unoccupied space it can see. Both the space it teleports from and the space it teleports to must be in dim light or darkness.
```
