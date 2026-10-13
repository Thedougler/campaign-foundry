---
title: Flail Snail
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Elemental
size: Large
habitat:
  - Forest
  - Swamp
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flail Snail
size: Large
type: elemental
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 52
hit_dice: 5d10 + 25
modifier: -3
speed: 10 ft.
stats: [ 17, 5, 20, 3, 10, 5 ]
damage_immunities: fire, poison
condition_immunities: poisoned
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 10
cr: "3"
traits:
  - name: Antimagic Shell
    desc: |-
      The snail has advantage on saving throws against spells, and any creature making a spell attack against the snail has disadvantage on the attack roll.

      If the snail succeeds on its saving throw against a spell or a spell's attack roll misses it, the snail's shell converts some of the spell's energy into a burst of destructive force if the spell is of 1st level or higher; each creature within 30 feet of the snail must make a DC 15 Constitution saving throw, taking 3 (1d6) force damage per level of the spell on a failed save, or half as much damage on a successful one.
actions:
  - name: Multiattack
    desc: The snail makes five Flail Tentacle attacks.
  - name: Flail Tentacle
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 5 (1d4 + 3) bludgeoning damage."
  - name: Scintillating Shell (Recharges after a Short or Long Rest)
    desc: The snail's shell emits dazzling, coloured light until the end of the snail's next turn. During this time, the shell sheds bright light in a 30-foot radius and dim light for an additional 30 feet, and creatures that can see the snail have disadvantage on attack rolls against it. In addition, any creature within the bright light and able to see the snail when this power is activated must succeed on a DC 15 Wisdom saving throw or be stunned until the light ends.
  - name: Shell Defense
    desc: The flail snail withdraws into its shell. Until it emerges, it gains a +4 bonus to its AC and is restrained. It can emerge from its shell as a bonus action on its turn.
```
