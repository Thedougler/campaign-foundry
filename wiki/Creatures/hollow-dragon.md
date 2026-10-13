---
title: Hollow Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hollow Dragon
size: Huge
type: undead
alignment: Any alignment
ac: 19
ac_class: natural armour
hp: 241
hit_dice: 21d12 + 105
modifier: 1
speed: 40 ft., fly 80 ft.
stats: [ 23, 12, 21, 16, 13, 21 ]
saves:
  - con: 11
  - int: 9
  - wis: 7
  - cha: 11
skillsaves:
  - arcana: 9
  - history: 15
  - perception: 13
damage_resistances: necrotic
damage_immunities: poison, radiant
condition_immunities: charmed, deafened, exhaustion, frightened, paralysed, poisoned
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the hollow dragon fails a saving throw, it can choose to succeed instead.
  - name: Reconstruction
    desc: "When the hollow dragon is reduced to 0 hit points, its body breaks into nine pieces: two arms, two legs, two wings, a tail, a torso, and a head. Each piece is a Large object with AC 19, 27 hit points, and immunity to psychic and poison damage. After 1d6 days, if all pieces are still within 6 miles of each other, they all teleport to the location of the head piece and merge with it, whereupon the hollow dragon regains all its hit points and becomes active again."
actions:
  - name: Multiattack
    desc: The hollow dragon makes one Bite attack and two Claw attacks, and it can use Sapping Presence.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage plus 9 (2d8) radiant damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Sapping Presence
    desc: Each creature of the hollow dragon's choice within 60 feet of it must make a DC 19 Wisdom saving throw. On a failed save, the creature's speed is halved and it has disadvantage on attack rolls until the end of its next turn. On a successful save, the creature is immune to this hollow dragon's Sapping Presence for 24 hours.
  - name: Radiant Breath (Recharge 5–6)
    desc: The hollow dragon exhales radiant flames in a 60-foot cone. Each creature in that area must make a DC 19 Dexterity saving throw, taking 54 (12d8) radiant damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the hollow dragon can expend a use to take one of the following actions. The hollow dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The hollow dragon makes one Claw attack.
  - name: Ghostly Binding (Costs 2 Actions)
    desc: The hollow dragon creates ethereal bindings around a creature it can see within 60 feet of it. The target must succeed on a DC 19 Strength saving throw or be restrained until the end of the dragon's next turn.
  - name: Booming Scales (Costs 3 Actions)
    desc: A sudden loud ringing noise, painfully intense, erupts from the hollow dragon's frame. Each creature within 10 feet of the hollow dragon must make a DC 19 Constitution saving throw, taking 24 (7d6) thunder damage on a failed save, or half as much damage on a successful one.
```
