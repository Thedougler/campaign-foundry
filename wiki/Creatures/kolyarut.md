---
title: Kolyarut
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kolyarut
size: Medium
type: construct
subtype: inevitable
alignment: typically Lawful Neutral
ac: 18
ac_class: natural armour
hp: 297
hit_dice: 35d8 + 140
modifier: 1
speed: 50 ft., fly 35 ft. (hover)
stats: [ 25, 12, 19, 25, 22, 18 ]
saves:
  - int: 13
  - wis: 12
  - cha: 10
skillsaves:
  - history: 13
  - insight: 12
  - perception: 12
damage_resistances: thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned, unconscious
senses: darkvision 60 ft., passive Perception 22
languages: all
cr: "20"
traits:
  - name: Immutable Form
    desc: The kolyarut is immune to any spell or effect that would alter its form.
  - name: Legendary Resistance (4/Day)
    desc: If the kolyarut fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The kolyarut has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The kolyarut makes four Unerring Blade attacks.
  - name: Unerring Blade
    desc: |-
      *Melee Weapon Attack:* automatic hit, reach 5 ft., one target. *Hit:* 24 force damage plus one of the following effects (choose one or roll a d6):

      - **1–2 Disarm.** The target drops one item it is holding of the kolyarut's choice.  
      - **3–4 Imbalance.** The target can't take reactions until the start of the kolyarut's next turn.  
      - **5–6 Push.** If the target is Large or smaller, the target is pushed up to 15 feet away from the kolyarut.  
  - name: Edict of Blades (Recharge 5–6)
    desc: The kolyarut moves up to its speed without provoking opportunity attacks and can make one Unerring Blade attack against each creature it moves past. Whenever it hits a creature with an Unerring Blade attack during this movement, each spell of 5th level or lower on the creature ends, and the creature has the incapacitated condition until the end of the kolyarut's next turn.
  - name: Plane Shift (3/Day)
    desc: The kolyarut casts *plane shift*, requiring no material components and using Intelligence as the spellcasting ability. The kolyarut can cast the spell normally, or it can cast the spell on an unwilling creature it can see within 60 feet of itself. If it uses the latter option, the targeted creature must succeed on a DC 18 Charisma saving throw or be sent to a teleportation circle in the Hall of Concordance in Sigil.
reactions:
  - name: Parry
    desc: The kolyarut adds 6 to its AC against one attack roll that would hit it. To do so, the kolyarut must see the attacker and be wielding a melee weapon.
```
