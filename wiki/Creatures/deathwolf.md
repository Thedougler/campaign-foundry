---
title: Deathwolf
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deathwolf
size: Medium
type: undead
alignment: typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 153
hit_dice: 18d8 + 72
modifier: 3
speed: 40 ft.
stats: [ 20, 16, 18, 10, 17, 19 ]
saves:
  - str: 10
  - dex: 8
  - cha: 9
skillsaves:
  - perception: 13
  - stealth: 8
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 60 ft., passive Perception 23
languages: Common
cr: "15"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the deathwolf fails a saving throw, it can choose to succeed instead.
  - name: Moon's Grace
    desc: When the deathwolf falls, it descends at a rate of 60 feet per round and takes no falling damage.
actions:
  - name: Multiattack
    desc: The deathwolf makes one Bite attack and two Claw attacks. It can replace one of these attacks with Phantom Deathwolf if available.
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 14 (2d8 + 5) piercing damage plus 9 (2d8) necrotic damage. The target must succeed on a DC 16 Wisdom saving throw or have disadvantage on saving throws against the frightened condition. This curse lasts until removed by the *Remove Curse* spell or other magic."
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage plus 4 (1d8) necrotic damage."
  - name: Phantom Deathwolf (Recharge 5–6)
    desc: |-
      The deathwolf creates a terrifying phantom of itself in the mind of a creature the deathwolf can see within 60 feet of itself. The target must succeed on a DC 17 Intelligence saving throw or have the frightened condition for 1 minute.

      While the target is frightened, the phantom deals 21 (6d6) psychic damage to the target at the start of each of the target's turns. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
reactions:
  - name: Imposing Slash
    desc: When a creature within 5 feet of the deathwolf makes an attack roll against it, the deathwolf forces the creature to succeed on a DC 17 Wisdom saving throw or have disadvantage on that roll. After the attack hits or misses, the deathwolf makes one Claw attack against the creature.
  - name: Phase Step
    desc: Immediately after taking damage, the deathwolf teleports up to 30 feet to an unoccupied space it can see that is in dim light or darkness.
```
