---
title: Death Giant Shrouded One
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Giant Shrouded One
size: Huge
type: giant
subtype: wizard
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 195
hit_dice: 17d12 + 85
modifier: 2
speed: 40 ft.
stats: [ 27, 14, 20, 23, 16, 16 ]
saves:
  - con: 10
  - int: 11
  - wis: 8
  - cha: 8
skillsaves:
  - arcana: 11
  - perception: 8
  - stealth: 7
damage_immunities: necrotic
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 18
languages: Common, Giant
cr: "15"
traits:
  - name: Death Rune
    desc: |-
      The giant has a death rune inscribed on a giant's skull in its possession. While holding or wearing the skull bearing the rune, the giant can use its Reaping Scythe action and Shroud of Souls bonus action.

      The skull bearing the death rune has AC 18; 35 hit points; and immunity to necrotic, poison, and psychic damage. The skull regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a death rune on another skull in its possession when it finishes a short or long rest.
actions:
  - name: Multiattack
    desc: The giant makes three Soul Burst attacks. Alternatively, if the giant has its death rune, it can make three Reaping Scythe attacks.
  - name: Soul Burst
    desc: "*Melee or Ranged Spell Attack:* +11 to hit, reach 10 ft. or range 120 ft., one target. *Hit:* 28 (4d10 + 6) necrotic damage. If the target has the frightened condition, the giant gains temporary hit points equal to the damage dealt."
  - name: Reaping Scythe (Requires Death Rune)
    desc: "*Melee Spell Attack:* +11 to hit, reach 15 ft., one creature. *Hit:* 38 (7d10) necrotic damage, and the target can't regain hit points until the end of its next turn. The target dies if it is reduced to 0 hit points by this attack."
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, using Intelligence as the spellcasting ability:

      **At will:** *detect magic*, *mage armour*

      **3/day each:** *speak with dead*, *Tenser's floating disk*
bonus_actions:
  - name: Frightening Teleport (Recharge 4–6)
    desc: The giant magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Each creature within 10 feet of the location the giant left must succeed on a DC 19 Wisdom saving throw or have the frightened condition until the end of that creature's next turn.
  - name: Shroud of Souls (Requires Death Rune)
    desc: The giant shrouds itself in a torrent of souls. While the giant is shrouded, each creature that starts its turn within 5 feet of the giant must succeed on a DC 19 Wisdom saving throw or have disadvantage on saving throws until the end of that creature's next turn. The shroud disappears after 1 minute, when the giant dies, when the giant uses this bonus action again, or when the giant's death rune is destroyed.
```
